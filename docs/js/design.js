/* System design simulator: a capacity model you build and stress-test */
const DESIGN={
 PARTS:[
  {k:'cdn',label:'CDN',type:'toggle',cost:30,hint:'Serves static files (images, JS, CSS) from servers near users.'},
  {k:'lb',label:'Load balancer',type:'toggle',cost:20,hint:'Spreads requests across app servers. Needed to use more than one.'},
  {k:'app',label:'App servers',type:'count',min:1,max:12,cost:40,hint:'Each handles about 400 requests/second.'},
  {k:'cache',label:'Cache (Redis)',type:'toggle',cost:60,hint:'Answers repeated reads from memory in ~2 ms.'},
  {k:'replicas',label:'DB read replicas',type:'count',min:0,max:5,cost:120,hint:'Copies of the database that take read traffic.'},
  {k:'shards',label:'DB shards',type:'count',min:1,max:8,cost:120,hint:'Splits data across databases so writes scale.'},
  {k:'queue',label:'Message queue',type:'toggle',cost:15,hint:'Moves slow work (emails, video) off the request path.'},
  {k:'workers',label:'Background workers',type:'count',min:0,max:10,cost:40,hint:'Each processes ~50 queued jobs/second.'},
  {k:'storage',label:'Object storage (S3)',type:'toggle',cost:25,hint:'Holds uploaded files so app servers stay stateless.'},
 ],
 defaults(){return{cdn:false,lb:false,app:1,cache:false,replicas:0,shards:1,queue:false,workers:0,storage:false}},
 simulate(c,s){
  const rps=s.rps,staticShare=s.staticShare||0,readRatio=s.readRatio==null?0.9:s.readRatio,hit=s.cacheHit||0.8;
  const notes=[];const tiers={};
  const staticRps=rps*staticShare;const dyn=rps-(c.cdn?staticRps:0);
  const appServers=c.lb?c.app:1;if(c.app>1&&!c.lb)notes.push('You have '+c.app+' app servers but no load balancer, so all traffic hits one server.');
  const appCap=appServers*400;const appU=dyn/appCap;tiers.app={u:appU,label:appServers+' × app'};
  const dynApi=rps*(1-staticShare);const reads=dynApi*readRatio,writes=dynApi*(1-readRatio);
  const dbReads=c.cache?reads*(1-hit):reads;
  const shards=Math.max(1,c.shards);const readCap=(3000*(1+c.replicas))*shards;const writeCap=1000*shards;
  const dbU=Math.max(dbReads/readCap,writes/writeCap);tiers.db={u:dbU,label:'database'};
  const readU=dbReads/readCap,writeU=writes/writeCap;
  let slowMs=0;if(s.slowTask){if(c.queue&&c.workers>0){const jobs=dynApi*s.slowTask.share;const wu=jobs/(c.workers*50);tiers.workers={u:wu,label:c.workers+' × worker'};if(wu>=1)notes.push('Workers can\'t keep up: the queue backlog grows by '+Math.round(jobs-c.workers*50)+' jobs every second.')}else{slowMs=s.slowTask.ms*s.slowTask.share*4;if(c.queue&&!c.workers)notes.push('The queue has no workers, so jobs pile up and never run.')}}
  if(s.uploads&&!c.storage)notes.push('Uploads are saved on the app servers\' disks. With more than one server, users get files that "disappear" depending on which server they hit. Use object storage.');
  const q=u=>u>=1?Infinity:1/(1-Math.min(u,0.99));
  const appLat=12*q(appU),dbLat=(c.cache?2+(1-hit)*8:8)*q(dbU),cdnLat=c.cdn?0:staticShare*40;
  let p95=Math.round((appLat+dbLat)*2.2+slowMs+cdnLat);
  let err=0;if(appU>=1)err=Math.max(err,1-1/appU);if(dbU>=1)err=Math.max(err,1-1/dbU);
  if(appU>=1)notes.push('App servers are overloaded ('+Math.round(appU*100)+'%): requests time out.');else if(appU>0.8)notes.push('App servers are running hot ('+Math.round(appU*100)+'%). Latency climbs sharply above ~80%.');
  if(writeU>=1)notes.push('The database can\'t keep up with writes ('+Math.round(writeU*100)+'%). Replicas don\'t help writes; sharding does.');else if(readU>=1)notes.push('The database is drowning in reads ('+Math.round(readU*100)+'%). Add a cache or read replicas.');else if(dbU>0.8)notes.push('The database is near its limit ('+Math.round(dbU*100)+'%).');
  if(s.spof&&!c.lb&&c.app<2)notes.push('A single app server is a single point of failure: if it crashes, the whole site is down.');
  const cost=this.PARTS.reduce((t,p)=>t+(p.type==='toggle'?(c[p.k]?p.cost:0):p.k==='shards'?(Math.max(1,c.shards)-1)*p.cost+120:c[p.k]*p.cost),0);
  if(!isFinite(p95))p95=9999;
  return{rps,p95,err:Math.round(err*1000)/10,appU,dbU,readU,writeU,cost,notes,tiers,appServers,staticRps,reads,writes,dbReads}},
};
BENCH.design={
 mount(el,l){this.l=l;this.c=Object.assign(DESIGN.defaults(),l.start||{});this.s=Object.assign({},l.scenario);
  el.innerHTML='<div class="card panel"><h3>Traffic scenario <span class="eyebrow" id="dScen"></span></h3><div class="scen" id="dScenTxt"></div></div><div class="card panel"><h3>Your architecture <span class="eyebrow">click to change</span></h3><div class="dgrid" id="dCtl"></div></div><div class="card panel"><h3>Diagram</h3><div class="graph-box"><svg id="dSvg" viewBox="0 0 720 260" width="100%" role="img" aria-label="Architecture diagram"></svg></div></div><div class="card panel"><h3>Load test results</h3><div class="dmetrics" id="dMet"></div><ul class="dnotes" id="dNotes"></ul></div>';
  this.render()},
 set(k,v){this.c[k]=v;record({c:'set '+k+' = '+v,ok:true});this.render();checkTasks(this.ctx())},
 ctx(){const m=DESIGN.simulate(this.c,this.s);return{cfg:Object.assign({},this.c),m,scenario:this.s}},
 render(){const c=this.c,s=this.s,l=this.l;const m=DESIGN.simulate(c,s);
  $('#dScen').textContent=s.name||'';$('#dScenTxt').innerHTML='<b>'+s.rps.toLocaleString()+'</b> requests/second · '+Math.round((s.readRatio==null?0.9:s.readRatio)*100)+'% reads'+(s.staticShare?' · '+Math.round(s.staticShare*100)+'% static files':'')+(s.slowTask?' · '+Math.round(s.slowTask.share*100)+'% of requests trigger a '+s.slowTask.ms+' ms task ('+esc(s.slowTask.what||'email')+')':'')+(s.uploads?' · users upload files':'')+'<div class="muted small">Target: '+esc(l.goal||'')+'</div>';
  const avail=l.parts||DESIGN.PARTS.map(p=>p.k);
  $('#dCtl').innerHTML=DESIGN.PARTS.filter(p=>avail.includes(p.k)).map(p=>'<div class="dpart"><div><b>'+esc(p.label)+'</b><div class="muted small">'+esc(p.hint)+' $'+p.cost+'/mo'+(p.type==='count'?' each':'')+'</div></div>'+(p.type==='toggle'?'<button class="btn'+(c[p.k]?' primary':'')+'" data-dk="'+p.k+'" data-dv="'+(!c[p.k])+'" aria-pressed="'+!!c[p.k]+'">'+(c[p.k]?'On':'Off')+'</button>':'<div class="stepper"><button class="btn" data-dk="'+p.k+'" data-dv="'+Math.max(p.min,c[p.k]-1)+'" aria-label="Fewer">−</button><span class="mono">'+c[p.k]+'</span><button class="btn" data-dk="'+p.k+'" data-dv="'+Math.min(p.max,c[p.k]+1)+'" aria-label="More">+</button></div>')+'</div>').join('');
  $('#dCtl').querySelectorAll('[data-dk]').forEach(b=>b.onclick=()=>{const v=b.dataset.dv;this.set(b.dataset.dk,v==='true'?true:v==='false'?false:+v)});
  const col=u=>u>=1?'var(--bad)':u>0.8?'var(--warn)':'var(--ok)';
  const box=(x,y,w,h,t,sub,u,on)=>'<g opacity="'+(on?1:0.28)+'"><rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="6" fill="var(--surface)" stroke="'+(u==null?'var(--line)':col(u))+'" stroke-width="'+(u==null?1.5:2.5)+'"/><text x="'+(x+w/2)+'" y="'+(y+h/2-2)+'" text-anchor="middle" font-size="12" font-weight="600" fill="var(--ink)">'+esc(t)+'</text>'+(sub?'<text x="'+(x+w/2)+'" y="'+(y+h/2+13)+'" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">'+esc(sub)+'</text>':'')+'</g>';
  const arrow=(x1,y1,x2,y2,on)=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="var(--ink-2)" stroke-width="1.5" marker-end="url(#ah)" opacity="'+(on?0.9:0.2)+'"/>';
  let g='<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="var(--ink-2)"/></marker></defs>';
  g+=box(10,100,80,50,'Users',s.rps.toLocaleString()+'/s',null,true);
  g+=box(115,30,80,44,'CDN',c.cdn?'static files':'',null,c.cdn);
  g+=box(115,100,80,50,'Load bal.','',null,c.lb);
  const n=Math.min(c.app,6);for(let i=0;i<n;i++)g+=box(225,40+i*(170/Math.max(n,1)),90,Math.min(40,150/n),i===0&&c.app>6?'App × '+c.app:'App '+(i+1),i===0?Math.round(m.appU*100)+'% busy':'',m.appU,i<m.appServers);
  g+=box(350,40,86,44,'Cache',c.cache?Math.round((s.cacheHit||0.8)*100)+'% hits':'',null,c.cache);
  g+=box(470,96,110,58,c.shards>1?'DB × '+c.shards+' shards':'Database',Math.round(m.dbU*100)+'% busy',m.dbU,true);
  for(let i=0;i<Math.min(c.replicas,3);i++)g+=box(610,60+i*50,96,40,'Replica '+(i+1),'reads',m.readU,true);
  g+=box(350,190,86,44,'Queue','',null,c.queue);g+=box(470,190,110,44,'Workers × '+c.workers,m.tiers.workers?Math.round(m.tiers.workers.u*100)+'% busy':'',m.tiers.workers?m.tiers.workers.u:null,c.queue&&c.workers>0);
  g+=box(610,200,96,40,'S3 storage','',null,c.storage);
  g+=arrow(90,115,115,55,c.cdn)+arrow(90,125,115,125,c.lb)+arrow(195,125,225,125,true)+arrow(315,90,350,62,c.cache)+arrow(315,125,470,125,true)+arrow(580,125,610,80,c.replicas>0)+arrow(315,150,350,210,c.queue)+arrow(436,212,470,212,c.queue&&c.workers>0);
  if(!c.lb)g+=arrow(90,125,225,125,true);
  $('#dSvg').innerHTML=g;
  const ok=v=>v?'ok':'bad';
  $('#dMet').innerHTML=[['p95 latency',m.p95>=9999?'timeouts':m.p95+' ms',m.p95<(l.maxP95||300)],['Error rate',m.err+'%',m.err===0],['App load',Math.round(m.appU*100)+'%',m.appU<0.8],['DB load',Math.round(m.dbU*100)+'%',m.dbU<0.8],['Monthly cost','$'+m.cost.toLocaleString(),!l.budget||m.cost<=l.budget]].map(([k,v,good])=>'<div class="dm '+ok(good)+'"><span>'+k+'</span><b>'+v+'</b></div>').join('');
  $('#dNotes').innerHTML=(m.notes.length?m.notes:['No bottlenecks at this traffic level.']).map(t=>'<li>'+esc(t)+'</li>').join('');
 },
 async solve(t){if(t.sol){for(const [k,v] of Object.entries(t.sol))this.c[k]=v;record({c:'set '+Object.entries(t.sol).map(([k,v])=>k+'='+v).join(', '),ok:true});this.render()}await checkTasks(this.ctx())}
};
