/* Shipwright Dev Academy: core engine (tracks, progress, lessons, views) */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
const deep=o=>JSON.parse(JSON.stringify(o));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

/* ---------- script loader for heavy runners ---------- */
const LIBS={
 ts:['https://cdnjs.cloudflare.com/ajax/libs/typescript/5.4.5/typescript.min.js'],
 babel:['https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.24.7/babel.min.js'],
 sql:['https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-asm.js'],
 brython:['https://cdnjs.cloudflare.com/ajax/libs/brython/3.12.4/brython.min.js','https://cdnjs.cloudflare.com/ajax/libs/brython/3.12.4/brython_stdlib.js'],
};
const IFRAME_LIBS={
 react:['https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.development.js','https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.development.js'],
 proptypes:['https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.8.1/prop-types.min.js'],
 zustand:['https://cdn.jsdelivr.net/npm/zustand@4.5.5/umd/vanilla.production.js'],
 rtk:['https://cdn.jsdelivr.net/npm/@reduxjs/toolkit@1.9.7/dist/redux-toolkit.umd.min.js','https://cdn.jsdelivr.net/npm/react-redux@8.1.3/dist/react-redux.min.js'],
 query:['https://cdn.jsdelivr.net/npm/@tanstack/react-query@4.36.1/build/umd/index.production.js'],
 rhf:['https://cdn.jsdelivr.net/npm/react-hook-form@7.53.0/dist/index.umd.js'],
 zod:['https://cdn.jsdelivr.net/npm/zod@3.23.8/lib/index.umd.js'],
 motion:['https://cdn.jsdelivr.net/npm/framer-motion@11.3.31/dist/framer-motion.js'],
 recharts:['https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.8.1/prop-types.min.js','https://cdn.jsdelivr.net/npm/recharts@2.12.7/umd/Recharts.min.js'],
 vue:['https://cdn.jsdelivr.net/npm/vue@3.4.38/dist/vue.global.prod.js'],
 rtl:['https://cdn.jsdelivr.net/npm/@testing-library/dom@9.3.4/dist/@testing-library/dom.umd.js'],
 tailwind:['https://cdn.tailwindcss.com/3.4.17'],
 sql:['https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-asm.js'],
};
const _loaded={};
function loadScript(src){if(_loaded[src])return _loaded[src];_loaded[src]=new Promise((res,rej)=>{const s=document.createElement('script');s.src=src;s.onload=res;s.onerror=()=>{delete _loaded[src];rej(new Error('Could not load '+src))};document.head.appendChild(s)});return _loaded[src]}
async function need(name){for(const u of LIBS[name])await loadScript(u)}

/* ---------- track registry ---------- */
const ACAD={tracks:{},lessonById:{},projects:{},projById:{}};
const TRACK_ORDER=['linux','git','frontend','python','php','sql','testing','next','docker','deploy','security','dsa','sysdesign','cloud','ai'];
/* Tracks you choose between: finishing either one opens the tracks after them. */
const CHOICES=[['python','php']];
const PHASES=[
 {name:'Phase 1 · Foundations',sub:'The terminal, version control and your first web pages. Everything later builds on these.',ids:['linux','git','frontend']},
 {name:'Phase 2 · Building apps',sub:'One backend language (choose Python or PHP), databases, testing, then a full-stack framework.',ids:['python','php','sql','testing','next']},
 {name:'Phase 3 · Shipping',sub:'Package, deploy and secure what you build.',ids:['docker','deploy','security']},
 {name:'Phase 4 · Engineering depth',sub:'The skills that turn a coder into a software engineer.',ids:['dsa','sysdesign','cloud','ai']},
];
function defineTrack(t){t.lessons.forEach((l,i)=>{l.track=t.id;l.idx=i;ACAD.lessonById[l.id]=l});ACAD.tracks[t.id]=t}
const tracks=()=>TRACK_ORDER.map(id=>ACAD.tracks[id]).filter(Boolean);
const allLessons=()=>tracks().flatMap(t=>t.lessons);
const coreLessons=t=>t.lessons.filter(l=>!l.elective);
const trackDone=t=>coreLessons(t).every(l=>P.lessons[l.id]);
const trackPct=t=>{const c=coreLessons(t);return Math.round(100*c.filter(l=>P.lessons[l.id]).length/c.length)};
const choiceOf=id=>CHOICES.find(c=>c.includes(id));
/* A step is one track, or a choice between tracks that is done when any of them is. */
function stepDone(id){const c=choiceOf(id);return c?c.some(x=>ACAD.tracks[x]&&trackDone(ACAD.tracks[x])):trackDone(ACAD.tracks[id])}
function stepName(id){const c=choiceOf(id);return c?c.map(x=>ACAD.tracks[x].name).join(' or '):ACAD.tracks[id].name}
function blockerOf(t){const ts=tracks();const i=ts.indexOf(t);const c=choiceOf(t.id);for(let j=0;j<i;j++){const id=ts[j].id;if(c&&c.includes(id))continue;if(!stepDone(id))return id}return null}
function unlocked(t){if(P.legacy&&P.legacy.includes(t.id))return true;return !blockerOf(t)}
function prevTrack(t){const b=blockerOf(t);if(b)return{id:b,name:stepName(b)};const ts=tracks();return ts[ts.indexOf(t)-1]||{name:''}}
/* The next track worth starting after t (skips the other side of a choice you've already made). */
function nextTrackAfter(t){const ts=tracks();for(let i=ts.indexOf(t)+1;i<ts.length;i++){const c=choiceOf(ts[i].id);if(c&&c.includes(t.id))continue;if(c&&stepDone(ts[i].id)&&!trackDone(ts[i]))continue;return ts[i]}return null}
/* Lessons on your path: core lessons, counting only the track you picked from each choice. */
function pathLessons(){const out=[];for(const t of tracks()){const c=choiceOf(t.id);if(c){const picked=c.find(x=>ACAD.tracks[x]&&ACAD.tracks[x].lessons.some(l=>P.lessons[l.id]))||c[0];if(t.id!==picked)continue}out.push(...coreLessons(t))}return out}

/* ---------- progress ---------- */
const DEF={v:2,lessons:{},quiz:{},checks:{},xp:0,days:[],best:{},last:'g1',notes:{},lastTrack:'git',projects:{}};
let P=deep(DEF);
const store={mode:'local',ref:null,chain:Promise.resolve(),timer:null,
 loadLocal(){try{const raw=localStorage.getItem('shipwright-progress');if(raw)return JSON.parse(raw)}catch(e){}return null},
 async init(){
  const local=this.loadLocal();if(local)P=Object.assign(deep(DEF),local);
  if(migrateProgress())this.save();
  renderAll();
  try{
   if(!window.claude||!window.claude.use)return;
   const [db,user]=await Promise.all([claude.use('db'),claude.use('user')]);
   if(!db||!user)return;const id=await user.id();if(!id)return;
   this.ref=db.doc('data/users/'+id+'/progress');
   const snap=await this.ref.get();
   if(snap.exists)P=Object.assign(deep(DEF),deep(snap.data()));else if(local)await this.ref.set(deep(P));
   this.mode='cloud';if(migrateProgress())this.save();renderAll();
  }catch(e){this.ref=null;this.mode='local'}
  renderChip();
 },
 save(){
  try{localStorage.setItem('shipwright-progress',JSON.stringify(P))}catch(e){}
  if(this.mode!=='cloud'||!this.ref)return;
  clearTimeout(this.timer);
  this.timer=setTimeout(()=>{const body=deep(P);this.chain=this.chain.then(()=>this.ref.set(body)).catch(()=>{this.mode='local';renderChip()})},600);
 }
};
function today(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function touch(){const t=today();if(!P.days.includes(t)){P.days.push(t);if(P.days.length>400)P.days.shift()}}
function award(x,msg){P.xp+=x;touch();store.save();renderStats();if(msg)toast(msg+'  +'+x+' XP')}
function streak(){const set=new Set(P.days);const d=new Date();let n=0;const f=x=>x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');if(!set.has(f(d)))d.setDate(d.getDate()-1);while(set.has(f(d))){n++;d.setDate(d.getDate()-1)}return n}
const RANKS=[[0,'Novice'],[300,'Apprentice'],[800,'Committer'],[1400,'Maintainer'],[2500,'Builder'],[4500,'Engineer'],[7000,'Senior'],[10000,'Principal']];
function rank(){let r=RANKS[0][1];for(const [x,n] of RANKS)if(P.xp>=x)r=n;return r}
function pathPct(){const ls=pathLessons();return ls.length?Math.round(100*ls.filter(l=>P.lessons[l.id]).length/ls.length):0}
function fmt(s){return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}

/* ---------- capability helpers ---------- */
let downloads=null,sampleFn=null,evalOK=true;
try{new Function('return 1')()}catch(e){evalOK=false}
async function saveFile(name,data){if(!downloads){toast('Saving files is not available here. Use Copy instead.');return}try{await downloads.save({filename:name,data});toast('Saved '+name)}catch(e){if(e&&e.code==='declined')return;if(e&&e.code==='rate_limited'){toast('A save prompt is already open');return}toast('Saving is not available here. Use Copy instead.')}}
function copyText(txt,btn){const lbl=btn.dataset.label||btn.textContent;btn.dataset.label=lbl;const done=()=>{btn.textContent='Copied';setTimeout(()=>btn.textContent=lbl,1500)};try{navigator.clipboard.writeText(txt).then(done).catch(()=>toast('Copy was blocked here. Try Save instead.'))}catch(e){toast('Copy was blocked here. Try Save instead.')}}
let toastT;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,2800)}

/* ---------- terminal widget (shared by git + ops benches) ---------- */
let CUR_TERM=null;
function printRich(out,text,cls){for(const line of String(text).split('\n')){const div=document.createElement('div');div.className='ln'+(cls?' '+cls:'');let c='';for(const part of line.split(/(\{[grycm\/]\})/)){const m=part.match(/^\{([grycm\/])\}$/);if(m){c=m[1]==='/'?'':'c-'+m[1];continue}if(!part)continue;const sp=document.createElement('span');if(c)sp.className=c;sp.textContent=part;div.appendChild(sp)}out.appendChild(div)}out.scrollTop=out.scrollHeight}
function sys(t){if(CUR_TERM)CUR_TERM.sys(t)}
function makeTerminal(el,opts){
 el.innerHTML='<div class="term"><div class="term-bar"><i></i><i></i><i></i><span>'+esc(opts.title||'bash')+'</span></div><div class="term-out" aria-live="polite"></div><div class="term-in"><label class="ps" for="cmd-'+opts.id+'"></label><input id="cmd-'+opts.id+'" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type a command, then Enter"></div></div>';
 const out=el.querySelector('.term-out'),inp=el.querySelector('input'),ps=el.querySelector('.ps');let hist=[],hp=0,busy=false;
 const api={out,input:inp,
  print:(t,c)=>printRich(out,t,c),sys:t=>printRich(out,'{c}'+t+'{/}'),clear:()=>{out.innerHTML=''},
  refresh:()=>{ps.textContent=opts.prompt()},
  async submit(line){if(busy)return;const blankOk=opts.allowEmpty&&opts.allowEmpty();if(!line.trim()&&!blankOk)return;if(line.trim())hist.push(line);hp=hist.length;
   const d=document.createElement('div');d.className='ln';const a=document.createElement('span');a.className='ps';a.textContent=(opts.echoPrompt?opts.echoPrompt():opts.prompt())+' ';const b=document.createElement('span');b.textContent=opts.mask&&opts.mask()?'••••••':line;d.append(a,b);out.appendChild(d);
   busy=true;let outs=[];try{outs=await opts.exec(line)}catch(e){outs=[{o:'sandbox error: '+e.message,e:true}]}busy=false;
   for(const r of outs||[]){if(r.clear){out.innerHTML='';continue}if(r.o)printRich(out,r.o,r.e?'err':'')}
   out.scrollTop=out.scrollHeight;api.refresh();if(opts.after)await opts.after(line,outs||[]);inp.focus({preventScroll:true})}
 };
 inp.addEventListener('keydown',e=>{if(e.key==='Enter'){const v=inp.value;inp.value='';api.submit(v)}else if(e.key==='ArrowUp'){if(hp>0){hp--;inp.value=hist[hp];e.preventDefault()}}else if(e.key==='ArrowDown'){if(hp<hist.length-1){hp++;inp.value=hist[hp]}else{hp=hist.length;inp.value=''}e.preventDefault()}else if(e.key==='l'&&e.ctrlKey){out.innerHTML='';e.preventDefault()}});
 el.querySelector('.term').addEventListener('click',()=>{if(!getSelection().toString())inp.focus({preventScroll:true})});
 api.refresh();CUR_TERM=api;return api;
}

/* ---------- lesson engine ---------- */
const BENCH={};
let attempts=0,L=null,done=[],taskLog=[],pending=[],hints={},locked=false,drillStart=null,drillTick=null,choiceWrong={},checking=false,curTrackId='git';
function record(e){if(L&&L.proj&&!locked)projRecord(e);if(L&&!locked&&!L.proj&&++attempts===1)setTimeout(()=>{if(L&&!L.proj)renderTasks()},0);if(!L||locked||done.every(Boolean))return;if(e.code!=null)pending=pending.filter(x=>x.code==null||x.file!==e.file);if(pending.length<200)pending.push(e);
 if(L.drill&&!drillStart){drillStart=Date.now();drillTick=setInterval(renderTimer,1000)}}
async function checkTasks(ctx){
 if(!L||locked||projBusy)return;const lesson=L;let changed=false,first=true;
 for(let i=0;i<lesson.tasks.length;i++){const t=lesson.tasks[i];if(done[i]||t.o)continue;if(ctx&&ctx.liveOnly&&!t.live)continue;let v=false;
  try{if(t.x!=null&&!t.c)v=!!(ctx&&ctx.res&&ctx.res[i]&&ctx.res[i].ok);else{v=t.c?await t.c(ctx||{}):false;if(v&&t.x!=null)v=!!(ctx&&ctx.res&&ctx.res[i]&&ctx.res[i].ok)}}catch(e){v=false}
  if(lesson!==L)return;
  if(v){done[i]=true;taskLog[i]=first?pending:[];first=false;changed=true;if(t.done)try{t.done()}catch(e){}}}
 if(changed){pending=[];if(lesson.proj==='solo')return;renderTasks();if(done.every(Boolean))completeLesson()}
}
function answerChoice(i,j){const t=L.tasks[i];if(done[i]||locked)return;if(j===t.a){done[i]=true;taskLog[i]=[{answer:t.o[j]}];delete choiceWrong[i];renderTasks();if(done.every(Boolean))completeLesson()}else{choiceWrong[i]=j;renderTasks()}}
function buildNote(secs){const prev=P.notes[L.id]||[];const tasks=L.tasks.map((t,i)=>({t:t.t||t.q,log:taskLog[i]||[]}));const cmds=tasks.flatMap(t=>t.log.filter(x=>x.c!=null));
 return{v:(prev[0]?prev[0].v:0)+1,at:new Date().toISOString(),title:L.title,lvl:L.lvl||'',n:L.idx+1,track:L.track,summary:L.sum||'',keys:L.keys||[],tasks,total:cmds.length,errors:cmds.filter(c=>!c.ok).length,secs:secs||null}}
function completeLesson(){
 if(L.proj){completeProject();return}
 const first=!P.lessons[L.id];P.lessons[L.id]={at:today()};let secs=null;
 if(L.drill&&drillStart){secs=Math.round((Date.now()-drillStart)/1000);clearInterval(drillTick);if(!P.best[L.id]||secs<P.best[L.id])P.best[L.id]=secs}
 reviewAddLesson(L.id);
 P.notes=P.notes||{};P.notes[L.id]=[buildNote(secs),...(P.notes[L.id]||[])].slice(0,5);noteVer[L.id]=0;
 const t=ACAD.tracks[L.track];const finishedTrack=first&&trackDone(t);
 if(first)award(L.drill?200:100,'Lesson complete: '+L.title);else{touch();store.save();toast('Lesson replayed. Nice reps!')}
 if(finishedTrack){award(300,'Track complete: '+t.name)}
 renderTasks();renderSide();renderStats();renderRoad();renderNotes();renderQuiz();renderReal();
}
function openLesson(id){
 const l=ACAD.lessonById[id]||ACAD.projById[id]||tracks()[0].lessons[0];L=l;const t=ACAD.tracks[l.track];locked=l.proj?!projUnlocked(l):!unlocked(t);curTrackId=t.id;
 if(!locked&&!l.proj){P.last=l.id;P.lastTrack=t.id;store.save()}
 projReset();
 done=l.tasks.map(()=>false);taskLog=[];pending=[];hints={};attempts=0;choiceWrong={};drillStart=null;clearInterval(drillTick);CUR_TERM=null;
 renderSide();renderSheet();
 const bench=$('#bench');bench.innerHTML='';const kind=l.kind||'none';const b=BENCH[kind];
 $('#lessonGrid').classList.toggle('solo',kind==='none');
 if(locked&&l.proj){bench.innerHTML=projLockBox(l);return}
 if(locked&&kind!=='none'){const pv=prevTrack(t);bench.innerHTML='<div class="card lockbox"><div class="eyebrow">Preview mode</div><h3>The sandbox opens when you reach this track</h3><p>Finish <b>'+esc(pv.name)+'</b> to unlock '+esc(t.name)+'. You can read every lesson and task now, so you know what\'s coming.</p><p class="note-meta">Sandbox: '+esc(BENCH_LABEL[kind]||kind)+'</p></div>';return}
 if(b){try{b.mount(bench,l)}catch(e){bench.innerHTML='<div class="card lockbox"><h3>Sandbox failed to start</h3><p>'+esc(e.message)+'</p></div>'}}
}
const BENCH_LABEL={git:'Git terminal with live commit graph',ops:'Simulated terminal and machine',code:'Code editor that runs your code',design:'Architecture simulator',none:'Questions only'};
function renderTimer(){const el=$('#timer');if(!el)return;el.textContent=fmt(drillStart?Math.round((Date.now()-drillStart)/1000):0)}

/* ---------- learn view rendering ---------- */
function renderSide(){
 const sel=$('#trackSel');if(!sel)return;
 sel.innerHTML=PHASES.map(ph=>'<optgroup label="'+esc(ph.name)+'">'+ph.ids.map(id=>{const t=ACAD.tracks[id];if(!t)return'';return '<option value="'+id+'"'+(id===curTrackId?' selected':'')+'>'+(unlocked(t)?'':'🔒 ')+esc(t.name)+' · '+trackPct(t)+'%</option>'}).join('')+'</optgroup>').join('');
 const t=ACAD.tracks[curTrackId];$('#trackMeter').style.width=trackPct(t)+'%';
 $('#trackState').innerHTML=esc(unlocked(t)?(trackDone(t)?'Track complete':trackPct(t)+'% complete'):'Preview: finish '+prevTrack(t).name+' to unlock')+(unlocked(t)&&!t.lessons.some(l=>P.lessons[l.id])?'<div class="lvl-info">New to this? Start with the first Beginner lesson. Already experienced? Read the level goals below and jump to the first lesson you can\'t already do.</div>':'');
 let html='',lvl=null;for(const l of t.lessons){if((l.lvl||'')!==lvl){lvl=l.lvl||'';if(lvl)html+='<div class="lvl">'+esc(lvl)+'</div>'+(LEVEL_INFO[t.id]&&LEVEL_INFO[t.id][lvl]?'<div class="lvl-info">'+esc(LEVEL_INFO[t.id][lvl])+'</div>':'')}html+='<button class="lbtn'+(P.lessons[l.id]?' done':'')+(unlocked(t)?'':' lockedl')+'" data-lesson="'+l.id+'" aria-current="'+(L&&L.id===l.id)+'"><span class="dot"></span>'+esc(l.title)+(l.elective?' <span class="optl">optional</span>':'')+'</button>'}
 html+=projSideHtml(t);
 $('#lessonList').innerHTML=html;
}
function renderSheet(){
 if(L.proj){renderProjSheet();return}
 const l=L,t=ACAD.tracks[l.track];
 $('#sheet').innerHTML=(locked?'<div class="preview-flag">Preview · unlocks after '+esc(prevTrack(t).name)+'</div>':'')+'<div class="eyebrow">'+esc(t.name)+(l.lvl?' · '+esc(l.lvl):'')+' · Lesson '+(l.idx+1)+' of '+t.lessons.length+(l.elective?' · Optional':'')+'</div><h2>'+esc(l.title)+'</h2>'+levelLadderHtml(l)+beforeYouStartHtml(l)+'<div class="concept">'+l.concept+'</div><div class="tasks" id="tasks"></div>';
 renderTasks();
}
function renderTasks(){
 if(L&&L.proj){renderProjTasks();return}
 const l=L,el=$('#tasks');if(!el)return;const n=done.filter(Boolean).length;
 let html='<h3>'+(locked?'Tasks in this lesson':'Your tasks')+' <span class="pill'+(n===l.tasks.length?' ok':'')+'">'+n+' / '+l.tasks.length+'</span>'+(l.drill&&!locked?' <span class="timer" id="timer">0:00</span>'+(P.best[l.id]?' <span class="pill">best '+fmt(P.best[l.id])+'</span>':''):'')+'</h3>';
 l.tasks.forEach((t,i)=>{
  if(t.o){html+='<div class="task'+(done[i]?' done':'')+'"><span class="box"></span><div class="ttext"><div>'+esc(t.t||t.q)+'</div><div class="copts">'+t.o.map((o,j)=>'<button class="copt'+(done[i]&&j===t.a?' right':'')+(choiceWrong[i]===j?' wrong':'')+'" data-choice="'+i+'" data-o="'+j+'"'+(done[i]||locked?' disabled':'')+'>'+esc(o)+'</button>').join('')+'</div>'+(done[i]&&t.e?'<div class="explain">'+esc(t.e)+'</div>':'')+(choiceWrong[i]!=null&&!done[i]?'<div class="explain bad">Not quite. Read the concept again and try another answer.</div>':'')+'</div></div>';return}
  const hint=t.hint||t.h||'';const fileHint=t.f?Object.entries(t.f).map(([p,c])=>'# '+p+'\n'+c).join('\n\n'):'';const solHint=t.sol&&typeof t.sol==='string'&&t.showSol!==false?t.sol:'';
  const full=[hint,fileHint,solHint&&!hint?solHint:''].filter(Boolean).join('\n\n');
  html+='<div class="task'+(done[i]?' done':'')+'"><span class="box"></span><div class="ttext">'+esc(t.t)+(done[i]||!full?'':attempts||locked?' <button class="hintbtn" data-hint="'+i+'">'+(hints[i]?'Hide hint':'Show hint')+'</button>':' <button class="hintbtn" disabled title="Struggling a little before you look makes it stick. Run or type something first.">Hint after your first try</button>')+(hints[i]&&!done[i]&&full?'<code class="hint">'+esc(full)+'</code>':'')+'</div></div>'});
 const tr=ACAD.tracks[l.track];const pj=ACAD.projects[tr.id];const next=tr.lessons[l.idx+1]||(pj&&trackDone(tr)&&!(P.projects[pj.guided.id]||{}).done?pj.guided:null)||(nextTrackAfter(tr)||{lessons:[]}).lessons[0];
 if(!locked&&done.every(Boolean))html+='<div class="done-banner"><span>Lesson complete. Your study note is saved.</span><button class="btn" data-note-go="'+l.id+'">View note</button>'+(next?'<button class="btn primary" data-lesson="'+next.id+'">Next: '+(next.proj?'guided project':esc(next.title))+'</button>':'')+'</div>'+ownWordsHtml(l);
 else if(!locked&&P.lessons[l.id])html+='<div class="done-banner soft"><span>You finished this lesson before. Replaying it is great practice.</span></div>'+ownWordsHtml(l);
 html+='<div class="lesson-actions">'+(locked||!l.kind||l.kind==='none'?'':'<button class="btn" id="resetLesson">Reset sandbox</button>')+(next?'<button class="btn" data-lesson="'+next.id+'">'+(locked?'Next lesson':'Skip to next')+'</button>':'')+'</div>';
 el.innerHTML=html;if(l.drill&&!locked)renderTimer();
}

/* ---------- other views ---------- */
function renderStats(){$('#sXp').textContent=P.xp;$('#sStreak').textContent=streak();$('#sRank').textContent=rank();$('#sPath').textContent=pathPct()+'%'}
function renderChip(){const c=$('#saveChip');c.className='save-chip'+(store.mode==='cloud'?' cloud':'');c.innerHTML='<i></i>'+(store.mode==='cloud'?'Progress saved to your account':'Saving in this browser')}
function currentTrack(){return tracks().find(t=>unlocked(t)&&!trackDone(t)&&!(choiceOf(t.id)&&stepDone(t.id)))||tracks()[tracks().length-1]}
function renderRoad(){
 const card=t=>{const i=tracks().indexOf(t);const un=unlocked(t),fin=trackDone(t),p=trackPct(t),pv=prevTrack(t);
  return '<div class="card track'+(un&&!fin?' active':'')+'"><header><h3>'+esc(t.name)+'</h3><span class="num">Track '+(i+1)+'</span></header><div class="pills"><span class="pill">'+esc(t.weeks)+'</span><span class="pill">'+t.lessons.length+' lessons</span>'+(choiceOf(t.id)?'<span class="pill pc">Choose one: '+esc(stepName(t.id))+'</span>':'')+(fin?'<span class="pill ok">Complete</span>':un?'<span class="pill hot">Open now</span>':'<span class="pill">Preview</span>')+'</div><ol>'+t.lessons.map((l,j)=>(l.lvl&&(j===0||t.lessons[j-1].lvl!==l.lvl)?'<li class="lvl-mark" aria-hidden="true">'+esc(l.lvl)+'</li>':'')+'<li value="'+(j+1)+'"'+(P.lessons[l.id]?' class="li-done"':'')+'>'+esc(l.title)+(l.elective?' <span class="optl">optional</span>':'')+'</li>').join('')+'</ol><footer><div style="flex:1;min-width:100px"><div class="meter"><i style="width:'+p+'%"></i></div></div><span class="mono">'+p+'%</span><button class="btn'+(un?' primary':'')+'" data-track-open="'+t.id+'">'+(un?(fin?'Review':'Open'):'Preview')+'</button></footer>'+projRoadHtml(t)+(un?'':'<div class="note-meta">Unlocks after '+esc(pv.name)+'</div>')+'</div>'};
 $('#tracks').innerHTML=PHASES.map(ph=>'<div class="phase"><h2>'+esc(ph.name)+'</h2><p>'+esc(ph.sub)+'</p><div class="tracks">'+ph.ids.filter(id=>ACAD.tracks[id]).map(id=>card(ACAD.tracks[id])).join('')+'</div></div>').join('');
 const ls=pathLessons(),dn=ls.filter(l=>P.lessons[l.id]).length,ct=currentTrack();
 $('#pathMeter').style.width=pathPct()+'%';$('#pathText').textContent=dn+' of '+ls.length+' core lessons done on your path · '+pathPct()+'%. Optional lessons and the backend language you didn\'t pick are extra.';
 const nx=coreLessons(ct).find(l=>!P.lessons[l.id]);$('#nextLessonPill').textContent=nx?'Up next: '+ct.name+' · '+nx.title:'Every track complete. You did it.';
}
function quizSets(){const out=[];for(const t of tracks())for(const [k,qs] of Object.entries(t.quizzes||{}))out.push({key:k,track:t,label:t.id==='git'?k:'Track quiz',qs});return out}
let quizKey='Beginner';
function renderQuiz(){
 const sets=quizSets();let cur=sets.find(s=>s.key===quizKey)||sets[0];quizKey=cur.key;
 let nav='';let tid=null;for(const s of sets){if(s.track.id!==tid){tid=s.track.id;nav+='<div class="lvl">'+esc(s.track.name)+'</div>'}const a=P.quiz[s.key]||{};const right=s.qs.filter((q,i)=>a[i]===q.a).length;nav+='<button class="lbtn'+(right===s.qs.length?' done':'')+(unlocked(s.track)?'':' lockedl')+'" data-quiz="'+esc(s.key)+'" aria-current="'+(s.key===quizKey)+'"><span class="dot"></span>'+esc(s.label)+' <span class="pill" style="margin-left:auto">'+right+'/'+s.qs.length+'</span></button>'}
 $('#quizNav').innerHTML=nav;
 const lk=!unlocked(cur.track);const a=P.quiz[quizKey]||{};
 $('#quizBody').innerHTML='<div class="qhead"><div><div class="eyebrow">'+esc(cur.track.name)+'</div><h2>'+esc(cur.label)+(cur.label==='Track quiz'?'':' quiz')+'</h2></div>'+(lk?'<span class="pill">Preview: unlocks after '+esc(prevTrack(cur.track).name)+'</span>':'<button class="btn" id="quizReset">Retake</button>')+'</div>'+cur.qs.map((q,i)=>{const ans=a[i];return '<div class="card q"><h3>'+(i+1)+'. '+esc(q.q)+'</h3><div class="opts">'+q.o.map((o,j)=>'<button class="opt'+(ans!=null?(j===q.a?' right':(j===ans?' wrong':'')):'')+'" data-q="'+i+'" data-o="'+j+'"'+(ans!=null||lk?' disabled':'')+'>'+esc(o)+'</button>').join('')+'</div>'+(ans!=null?'<div class="explain">'+(ans===q.a?'<b class="okc">Correct.</b> ':'<b class="badc">Not quite.</b> ')+esc(q.e)+'</div>':'')+'</div>'}).join('');
}
function renderReal(){
 $('#rw').innerHTML=tracks().map(t=>{const lk=!unlocked(t);return '<div class="rw-group"><h3 class="rw-title">'+esc(t.name)+(lk?' <span class="pill">Preview</span>':'')+'</h3>'+(t.real||[]).map(r=>'<div class="card rw-item"><input type="checkbox" id="rw-'+r.id+'" data-rw="'+r.id+'"'+(P.checks[r.id]?' checked':'')+(lk?' disabled':'')+'><div style="min-width:0"><h4><label for="rw-'+r.id+'">'+esc(r.t)+'</label></h4><p>'+esc(r.p)+'</p><pre class="snip"><button class="copy" data-copy="'+r.id+'">Copy</button>'+esc(r.s)+'</pre></div></div>').join('')+'</div>'}).join('');
}

/* ---------- notes ---------- */
let noteVer={};
function noteDate(iso){try{return new Date(iso).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'})}catch(e){return String(iso).slice(0,10)}}
function logMd(log){const L2=[];const cmds=log.filter(x=>x.c!=null);if(cmds.length){L2.push('```bash');for(const c of cmds)L2.push(c.c+(c.ok?'':'   # error: check the output and retry'));L2.push('```','')}
 for(const x of log){if(x.code!=null){L2.push((x.file?'`'+x.file+'`\n\n':'')+'```'+(x.lang||'')+'\n'+x.code+'\n```','')}else if(x.answer!=null)L2.push('Answer: **'+x.answer+'**','')}
 return L2}
function noteMd(n){const tr=ACAD.tracks[n.track||'git'];
 const L2=['# '+(tr?tr.name+' · ':'')+'Lesson '+n.n+': '+n.title+(n.lvl?' ('+n.lvl+')':''),'','Version '+n.v+' · completed '+noteDate(n.at)+' · '+n.total+' commands, '+n.errors+' error'+(n.errors===1?'':'s')+(n.secs?' · time '+fmt(n.secs):''),'','## Summary','',n.summary,'','## Key commands and ideas','',(n.keys||[]).map(k=>'`'+k+'`').join(' · '),'','## What I did',''];
 n.tasks.forEach((t,i)=>{const log=t.log||(t.cmds?t.cmds.map(c=>({c:c.c,ok:c.ok})):[]);L2.push('### '+(i+1)+'. '+t.t,'');const lm=logMd(log);if(lm.length)L2.push(...lm);else L2.push('_Completed by work from an earlier step._','')});
 const lid=allLessons().map(l=>l.id).find(id=>(P.notes[id]||[]).includes(n));if(lid&&P.own&&P.own[lid])L2.push('## In my own words','',P.own[lid].t,'');
 return L2.join('\n')}
function allMd(){return '# Shipwright Dev Academy: my study notes\n\n'+allLessons().filter(l=>(P.notes[l.id]&&P.notes[l.id].length)||(P.own&&P.own[l.id])).map(l=>P.notes[l.id]&&P.notes[l.id].length?noteMd(P.notes[l.id][0]):'# '+ACAD.tracks[l.track].name+' · '+l.title+'\n\n## In my own words\n\n'+P.own[l.id].t).join('\n\n---\n\n')}
function logHtml(log){let h='';const cmds=log.filter(x=>x.c!=null);if(cmds.length)h+='<pre class="snip">'+cmds.map(c=>c.ok?esc(c.c):'<span class="c-r">'+esc(c.c)+'</span>  <span class="c-m"># error</span>').join('\n')+'</pre>';
 for(const x of log){if(x.code!=null)h+=(x.file?'<div class="note-meta mono">'+esc(x.file)+'</div>':'')+'<pre class="snip">'+esc(x.code)+'</pre>';else if(x.answer!=null)h+='<div class="note-meta">Answer: <b>'+esc(x.answer)+'</b></div>'}
 return h||'<div class="note-meta">Completed by work from an earlier step.</div>'}
function renderNotes(){
 const el=$('#notes');if(!el)return;const has=allLessons().filter(l=>(P.notes[l.id]&&P.notes[l.id].length)||(P.own&&P.own[l.id]));
 $('#copyAll').hidden=!has.length;$('#saveAll').hidden=!has.length||!downloads;
 if(!has.length){el.innerHTML='<div class="card note-empty"><h3>No notes yet</h3><p>Finish your first lesson and its note appears here: the summary, the key commands, and everything you typed for each task.</p><button class="btn primary" data-tab-go="learn">Start learning</button></div>';return}
 let html='',tid=null;
 for(const l of has){if(l.track!==tid){tid=l.track;html+='<h3 class="rw-title">'+esc(ACAD.tracks[tid].name)+'</h3>'}
  const vs=P.notes[l.id];if(!vs||!vs.length){html+='<article class="card note" id="note-'+l.id+'"><div class="eyebrow">'+esc(l.lvl?l.lvl+' · ':'')+'Lesson '+(l.idx+1)+'</div><h3>'+esc(l.title)+'</h3><div class="note-own"><div class="eyebrow">In my own words</div><p>'+esc(P.own[l.id].t)+'</p></div></article>';continue}const vi=Math.min(noteVer[l.id]||0,vs.length-1);const n=vs[vi];
  html+='<article class="card note" id="note-'+l.id+'"><header class="note-top"><div style="min-width:0"><div class="eyebrow">'+esc(n.lvl?n.lvl+' · ':'')+'Lesson '+n.n+'</div><h3>'+esc(n.title)+'</h3><div class="note-meta">Completed '+esc(noteDate(n.at))+' · '+n.total+' commands · '+n.errors+' error'+(n.errors===1?'':'s')+(n.secs?' · time '+fmt(n.secs):'')+'</div></div><div class="note-actions">'+(vs.length>1?'<label class="sr" for="ver-'+l.id+'">Version</label><select id="ver-'+l.id+'" data-ver="'+l.id+'">'+vs.map((x,i)=>'<option value="'+i+'"'+(i===vi?' selected':'')+'>Version '+x.v+(i===0?' (latest)':'')+'</option>').join('')+'</select>':'<span class="pill">Version '+n.v+'</span>')+'<button class="btn" data-note-copy="'+l.id+'">Copy</button>'+(downloads?'<button class="btn" data-note-save="'+l.id+'">Save .md</button>':'')+'</div></header>'+
  '<p class="note-sum">'+esc(n.summary)+'</p><div class="note-keys">'+(n.keys||[]).map(k=>'<code class="key">'+esc(k)+'</code>').join('')+'</div><ol class="note-tasks">'+n.tasks.map(t=>'<li><div>'+esc(t.t)+'</div>'+logHtml(t.log||(t.cmds||[]).map(c=>({c:c.c,ok:c.ok})))+'</li>').join('')+'</ol>'+(P.own&&P.own[l.id]?'<div class="note-own"><div class="eyebrow">In my own words</div><p>'+esc(P.own[l.id].t)+'</p></div>':'')+'</article>'}
 el.innerHTML=html;
}

/* ---------- backup / restore ---------- */
function mergeProgress(inc){
 const out=deep(P);
 for(const [k,v] of Object.entries(inc.lessons||{}))if(!out.lessons[k])out.lessons[k]=v;
 for(const [k,v] of Object.entries(inc.checks||{}))if(!out.checks[k])out.checks[k]=v;
 for(const [k,v] of Object.entries(inc.best||{}))if(!out.best[k]||v<out.best[k])out.best[k]=v;
 for(const [k,v] of Object.entries(inc.quiz||{})){if(k==='xpGiven'){out.quiz.xpGiven=Object.assign({},v,out.quiz.xpGiven||{});continue}out.quiz[k]=Object.assign({},v,out.quiz[k]||{})}
 for(const [k,vs] of Object.entries(inc.notes||{})){const mine=out.notes[k]||[];const seen=new Set(mine.map(n=>n.at));out.notes[k]=[...mine,...vs.filter(n=>!seen.has(n.at))].sort((a,b)=>b.at<a.at?-1:1).slice(0,5)}
 out.projects=out.projects||{};for(const [k,v] of Object.entries(inc.projects||{})){const m=out.projects[k];if(!m){out.projects[k]=v;continue}if(!m.done&&v.done)m.done=v.done;m.best=Math.max(m.best||0,v.best||0);const seen=new Set((m.attempts||[]).map(a=>a.at));m.attempts=[...(m.attempts||[]),...(v.attempts||[]).filter(a=>!seen.has(a.at))].sort((a,b)=>b.at<a.at?-1:1).slice(0,5)}
 out.review=out.review||{items:{},log:{}};for(const [k,v] of Object.entries((inc.review||{}).items||{})){const m=out.review.items[k];if(!m||v.b>m.b)out.review.items[k]=v}
 out.own=Object.assign({},inc.own||{},out.own||{});for(const [k,v] of Object.entries(inc.own||{}))if(out.own[k].at<v.at)out.own[k]=v;
 out.legacy=[...new Set([...(out.legacy||[]),...(inc.legacy||[])])];
 out.days=[...new Set([...(out.days||[]),...(inc.days||[])])].sort().slice(-400);
 out.xp=Math.max(out.xp||0,inc.xp||0);return out;
}
function progressCode(){return JSON.stringify({app:'shipwright-academy',exported:new Date().toISOString(),progress:P})}
function importProgress(txt){let data;try{data=JSON.parse(txt.trim())}catch(e){return 'That text is not a valid progress backup. Paste the whole backup, starting with {'}
 const inc=data&&data.progress?data.progress:data;if(!inc||typeof inc!=='object'||!inc.lessons)return 'That backup has no lesson progress in it.';
 P=mergeProgress(inc);migrateProgress();store.save();renderAll();return null}

/* ---------- tabs + events ---------- */
function showTab(id){for(const b of $$('.tabs button'))b.setAttribute('aria-selected',b.dataset.tab===id);for(const v of ['road','learn','proj','review','quiz','real','notes'])$('#view-'+v).hidden=v!==id;if(id==='review')renderReview();if(id==='proj')renderProjects();
 if(id==='learn'&&!L){const t=currentTrack();const nx=t.lessons.find(l=>!P.lessons[l.id])||t.lessons[0];openLesson(P.last&&ACAD.lessonById[P.last]&&unlocked(ACAD.tracks[ACAD.lessonById[P.last].track])?P.last:nx.id)}}
function renderAll(){renderStats();renderRoad();renderQuiz();renderReal();renderNotes();renderProjects();renderReview();renderChip();if(L)renderSide()}
function bindEvents(){
 document.addEventListener('click',e=>{
  if(reviewClick(e)||projClick(e))return;
  const t=e.target.closest('[data-tab],[data-tab-go],[data-lesson],[data-hint],[data-quiz],[data-q],[data-copy],[data-note-go],[data-note-copy],[data-note-save],[data-choice],[data-track-open],#copyAll,#saveAll,#resetLesson,#goLearn,#quizReset,#bkCopy,#bkSave,#bkImport,#bkToggle');if(!t)return;
  const nv=id=>P.notes[id][Math.min(noteVer[id]||0,P.notes[id].length-1)];
  if(t.dataset.noteGo){showTab('notes');renderNotes();const n=$('#note-'+t.dataset.noteGo);if(n)n.scrollIntoView({block:'start'});return}
  if(t.dataset.noteCopy){copyText(noteMd(nv(t.dataset.noteCopy)),t);return}
  if(t.dataset.noteSave){const n=nv(t.dataset.noteSave);saveFile((n.track||'git')+'-lesson-'+String(n.n).padStart(2,'0')+'-'+n.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'-v'+n.v+'.md',noteMd(n));return}
  if(t.dataset.choice!=null){answerChoice(+t.dataset.choice,+t.dataset.o);return}
  if(t.dataset.trackOpen){const tr=ACAD.tracks[t.dataset.trackOpen];showTab('learn');openLesson((tr.lessons.find(l=>!P.lessons[l.id])||tr.lessons[0]).id);window.scrollTo({top:0});return}
  if(t.id==='copyAll'){copyText(allMd(),t);return}
  if(t.id==='saveAll'){saveFile('shipwright-notes.md',allMd());return}
  if(t.id==='bkToggle'){$('#bkPanel').hidden=!$('#bkPanel').hidden;return}
  if(t.id==='bkCopy'){copyText(progressCode(),t);return}
  if(t.id==='bkSave'){saveFile('shipwright-progress-'+today()+'.json',progressCode());return}
  if(t.id==='bkImport'){const err=importProgress($('#bkText').value);$('#bkMsg').textContent=err||'Progress restored and merged with what was already here.';$('#bkMsg').className='bk-msg '+(err?'badc':'okc');return}
  if(t.dataset.tab)showTab(t.dataset.tab);
  else if(t.dataset.tabGo)showTab(t.dataset.tabGo);
  else if(t.dataset.lesson){showTab('learn');openLesson(t.dataset.lesson);window.scrollTo({top:0})}
  else if(t.dataset.hint!=null){hints[t.dataset.hint]=!hints[t.dataset.hint];renderTasks()}
  else if(t.dataset.quiz){quizKey=t.dataset.quiz;renderQuiz()}
  else if(t.dataset.q!=null){const set=quizSets().find(s=>s.key===quizKey);if(!unlocked(set.track))return;const i=+t.dataset.q,j=+t.dataset.o;P.quiz[quizKey]=P.quiz[quizKey]||{};if(P.quiz[quizKey][i]!=null)return;P.quiz[quizKey][i]=j;reviewAddQuiz(quizKey,i);const q=set.qs[i];P.quiz.xpGiven=P.quiz.xpGiven||{};const key=quizKey+i;if(j===q.a&&!P.quiz.xpGiven[key]){P.quiz.xpGiven[key]=1;award(20)}else{touch();store.save()}renderQuiz()}
  else if(t.dataset.copy){const r=tracks().flatMap(x=>x.real||[]).find(x=>x.id===t.dataset.copy);copyText(r.s,t)}
  else if(t.id==='resetLesson')openLesson(L.id);
  else if(t.id==='goLearn'){showTab('learn');const ct=currentTrack();openLesson((ct.lessons.find(l=>!P.lessons[l.id])||ct.lessons[0]).id)}
  else if(t.id==='quizReset'){const keep=P.quiz.xpGiven;P.quiz[quizKey]={};P.quiz.xpGiven=keep;store.save();renderQuiz()}
 });
 document.addEventListener('change',e=>{
  if(e.target.id==='trackSel'){const tr=ACAD.tracks[e.target.value];openLesson((tr.lessons.find(l=>!P.lessons[l.id])||tr.lessons[0]).id);return}
  if(e.target.id==='bkFile'){const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{$('#bkText').value=rd.result};rd.readAsText(f);return}
  if(e.target.dataset&&e.target.dataset.ver){noteVer[e.target.dataset.ver]=+e.target.value;renderNotes();return}
  const id=e.target.dataset&&e.target.dataset.rw;if(!id)return;if(e.target.checked){P.checks[id]=today();award(30,'Real-world rep done')}else{delete P.checks[id];store.save()}
 });
}
function ACAD_BOOT(){
 bindEvents();store.init();
 if(!evalOK)$('#evalWarn').hidden=false;
 (async()=>{try{if(window.claude&&window.claude.use){const [d,s]=await Promise.all([claude.use('downloads'),claude.use('sample')]);downloads=d;sampleFn=s;renderNotes();const b=$('#bkSave');if(b)b.hidden=!downloads}}catch(e){}})();
}
