/* Shipwright Dev Academy: capstone projects (one guided + one solo per track, with a review report) */
let projBusy=false,projLog=[],projStart=0,projShowRef=false,projAi=null;
const PROJ_XP={guided:250,solo:400};
function defineProjects(tid,o){
 const t=ACAD.tracks[tid];
 for(const [mode,p] of [['guided',o.guided],['solo',o.solo]]){if(!p)continue;p.id='pj-'+tid+'-'+(mode==='guided'?'g':'s');p.proj=mode;p.track=tid;p.idx=t?t.lessons.length:0;p.kind=p.kind||'none';
  if(mode==='guided')p.tasks.forEach(s=>{if(s.h==null&&s.cmd)s.h=s.cmd});ACAD.projById[p.id]=p}
 ACAD.projects[tid]={guided:o.guided,solo:o.solo};
}
const projState=id=>P.projects&&P.projects[id]||{};
function projUnlocked(p){const t=ACAD.tracks[p.track];if(!t||!unlocked(t)||!trackDone(t))return false;return p.proj==='guided'||!!projState(ACAD.projects[p.track].guided.id).done}
function projLockMsg(p){const t=ACAD.tracks[p.track];if(!unlocked(t))return 'Finish '+prevTrack(t).name+', then every '+t.name+' lesson, to open this project.';if(!trackDone(t))return 'Finish every '+t.name+' lesson to open this project. You have '+t.lessons.filter(l=>!P.lessons[l.id]).length+' left.';return 'Finish the guided project for '+t.name+' first. The solo project builds on it.'}
function projLockBox(p){return '<div class="card lockbox"><div class="eyebrow">Preview mode</div><h3>The sandbox opens when you reach this project</h3><p>'+esc(projLockMsg(p))+'</p><p class="note-meta">Sandbox: '+esc(BENCH_LABEL[p.kind]||p.kind)+'</p></div>'}
function projReset(){projLog=[];projStart=Date.now();projShowRef=false;projAi=null;projLastReport=null}
function projRecord(e){if(projLog.length<600)projLog.push(Object.assign({at:Date.now()},e))}

/* ---------- side list, roadmap and tab ---------- */
function projSideHtml(t){const pj=ACAD.projects[t.id];if(!pj)return '';
 return '<div class="lvl">Projects</div>'+[pj.guided,pj.solo].map(p=>'<button class="lbtn'+(projState(p.id).done?' done':'')+(projUnlocked(p)?'':' lockedl')+'" data-lesson="'+p.id+'" aria-current="'+(L&&L.id===p.id)+'"><span class="dot"></span>'+(p.proj==='guided'?'Guided: ':'Solo: ')+esc(p.title)+'</button>').join('')}
function projBadge(p){const s=projState(p.id);if(s.done)return '<span class="pill ok">Done</span>';if(s.attempts&&s.attempts.length)return '<span class="pill">Best '+(s.best||0)+'%</span>';return projUnlocked(p)?'<span class="pill hot">Open now</span>':'<span class="pill">Locked</span>'}
function projRoadHtml(t){const pj=ACAD.projects[t.id];if(!pj)return '';return '<div class="proj-road"><span class="eyebrow">Projects</span><button class="linkbtn" data-lesson="'+pj.guided.id+'">Guided</button>'+projBadge(pj.guided)+'<button class="linkbtn" data-lesson="'+pj.solo.id+'">Solo</button>'+projBadge(pj.solo)+'</div>'}
function renderProjects(){const el=$('#projList');if(!el)return;
 const card=p=>{const s=projState(p.id);const at=(s.attempts||[])[0];return '<div class="card pcard'+(projUnlocked(p)&&!s.done?' active':'')+'"><div class="pcard-top"><span class="pill '+(p.proj==='guided'?'pg':'ps')+'">'+(p.proj==='guided'?'Guided':'Solo')+'</span>'+projBadge(p)+'</div><h4>'+esc(p.title)+'</h4><p>'+esc(p.pitch||'')+'</p>'+(at?'<div class="note-meta">Last review '+esc(noteDate(at.at))+': '+at.met+' of '+at.total+' requirements · '+(s.attempts.length)+' review'+(s.attempts.length===1?'':'s')+'</div>':'')+'<div class="pcard-act"><button class="btn'+(projUnlocked(p)?' primary':'')+'" data-lesson="'+p.id+'">'+(projUnlocked(p)?(s.done?'Redo':at?'Continue':'Start'):'Preview')+'</button>'+(projUnlocked(p)?'':'<span class="note-meta">'+esc(projLockMsg(p))+'</span>')+'</div></div>'};
 el.innerHTML=PHASES.map(ph=>'<div class="phase"><h2>'+esc(ph.name)+'</h2><p>'+esc(ph.sub)+'</p>'+ph.ids.filter(id=>ACAD.projects[id]).map(id=>{const t=ACAD.tracks[id],pj=ACAD.projects[id];return '<div class="prow"><h3 class="rw-title">'+esc(t.name)+'</h3><div class="pgrid">'+card(pj.guided)+card(pj.solo)+'</div></div>'}).join('')+'</div>').join('');
 const all=Object.values(ACAD.projById),dn=all.filter(p=>projState(p.id).done).length;const m=$('#projMeter');if(m){m.style.width=(all.length?Math.round(100*dn/all.length):0)+'%';$('#projText').textContent=dn+' of '+all.length+' projects done'}}

/* ---------- sheet + steps ---------- */
function renderProjSheet(){const l=L,t=ACAD.tracks[l.track];
 $('#sheet').innerHTML=(locked?'<div class="preview-flag">Preview · '+esc(projLockMsg(l))+'</div>':'')+'<div class="eyebrow">'+esc(t.name)+' · '+(l.proj==='guided'?'Guided project':'Solo project')+'</div><h2>'+esc(l.title)+'</h2><div class="concept">'+l.brief+(l.proj==='solo'?'<div class="tip"><b>How this works</b>There are no hints here. Build it in the sandbox, then press <b>Submit for review</b>. You get a report on each requirement: what went wrong, the commands that failed, and habits to fix. Submit as often as you like. Leaving the page resets the sandbox, so finish in one sitting.</div>':'')+'</div><div class="tasks" id="tasks"></div>';
 renderProjTasks()}
function stepBody(s,i){let h='';if(s.why)h+='<p class="pwhy">'+s.why+'</p>';
 if(s.h)h+=L.kind==='design'?'<div class="pdo"><b>Do this:</b> '+esc(s.h).replace(/\n/g,' · ')+'</div>':'<pre class="snip"><button class="copy" data-pcopy="'+i+'">Copy</button>'+esc(s.h)+'</pre>';
 if(s.f)for(const [p,c] of Object.entries(s.f))h+='<div class="note-meta">Put this in <code>'+esc(p)+'</code>:</div><pre class="snip"><button class="copy" data-pcopy="'+i+'" data-pfile="'+esc(p)+'">Copy</button>'+esc(c)+'</pre>';
 if(s.code)h+='<pre class="snip"><button class="copy" data-pcopy="'+i+'" data-pcode="1">Copy</button>'+esc(s.code)+'</pre>';
 return h}
function renderProjTasks(){const l=L,el=$('#tasks');if(!el)return;const st=projState(l.id);
 let html='';
 if(l.proj==='guided'){const n=done.filter(Boolean).length;const curI=done.findIndex(d=>!d);
  html+='<h3>Steps <span class="pill'+(n===l.tasks.length?' ok':'')+'">'+n+' / '+l.tasks.length+'</span></h3><ol class="psteps">';
  l.tasks.forEach((s,i)=>{const cls=done[i]?'done':i===curI&&!locked?'cur':'later';html+='<li class="pstep '+cls+'"><span class="pnum">'+(done[i]?'':i+1)+'</span><div class="pbody"><div class="ptitle">'+esc(s.t)+'</div>'+(done[i]?'':stepBody(s,i))+'</div></li>'});
  html+='</ol>';
  if(!locked&&done.every(Boolean)){const solo=ACAD.projects[l.track].solo;html+='<div class="done-banner"><span>Guided project complete. Now build one on your own.</span><button class="btn primary" data-lesson="'+solo.id+'">Start the solo project</button></div>'}
  else if(!locked&&st.done)html+='<div class="done-banner soft"><span>You finished this project before. Running it again is good practice.</span></div>';
 }else{
  html+='<h3>Requirements <span class="pill">'+l.tasks.length+' to meet</span></h3><ol class="reqs">'+l.tasks.map(t=>'<li>'+esc(t.t)+'</li>').join('')+'</ol>';
  if(!locked)html+='<div class="proj-submit"><button class="btn primary" id="pjSubmit"'+(projBusy?' disabled':'')+'>'+(projBusy?'Reviewing…':'Submit for review')+'</button><span class="note-meta">'+(st.done?'Passed on '+esc(noteDate(st.done))+'. Submitting again is practice.':st.attempts&&st.attempts.length?'Best so far: '+(st.best||0)+'% over '+st.attempts.length+' review'+(st.attempts.length===1?'':'s')+'.':'Submit when you think you are done, or any time you want feedback.')+'</span></div><div id="pjReport">'+(projLastReport?reportHtml(projLastReport):'')+'</div>';
 }
 html+='<div class="lesson-actions">'+(locked||l.kind==='none'?'':'<button class="btn" id="resetLesson">Reset sandbox</button>')+'<button class="btn" data-tab-go="proj">All projects</button></div>';
 el.innerHTML=html}

/* ---------- completion (guided) ---------- */
function completeProject(){const l=L;P.projects=P.projects||{};const s=P.projects[l.id]=P.projects[l.id]||{attempts:[]};const first=!s.done;
 if(first){s.done=today();s.best=100;award(PROJ_XP[l.proj],(l.proj==='guided'?'Guided project complete: ':'Solo project passed: ')+l.title)}else{touch();store.save()}
 renderTasks();renderSide();renderRoad();renderProjects();renderStats()}

/* ---------- solo review ---------- */
let projLastReport=null;
async function evalReq(t,i,ctx){try{if(t.x!=null&&!t.c)return !!(ctx.res&&ctx.res[i]&&ctx.res[i].ok);let v=t.c?await t.c(ctx):false;if(v&&t.x!=null)v=!!(ctx.res&&ctx.res[i]&&ctx.res[i].ok);return !!v}catch(e){return false}}
async function reviewCtx(l){const b=BENCH[l.kind];if(l.kind==='code'&&b&&b.run)return await b.run()||{};if(l.kind==='design'&&b&&b.ctx)return b.ctx();return {}}
async function submitProject(){if(projBusy||locked||!L||L.proj!=='solo')return;const l=L;projBusy=true;renderProjTasks();let ctx={};
 try{ctx=await reviewCtx(l)}catch(e){ctx={}}
 const met=[],miss=[];for(let i=0;i<l.tasks.length;i++){const t=l.tasks[i];let v=await evalReq(t,i,ctx);if(!v&&done[i]&&!t.now)v=true;met.push(v);let m='';if(!v){try{m=typeof t.miss==='function'?(await t.miss(ctx))||'':t.miss||''}catch(e){m=''}}miss.push(m)}
 const warns=[];for(const w of l.warn||[]){try{if(await w.c(ctx))warns.push(w.m)}catch(e){}}
 const cmds=projLog.filter(x=>x.c!=null);const errs=cmds.filter(x=>!x.ok).map(x=>x.c);
 const runIssue=ctx&&(ctx.err||(ctx.errs&&ctx.errs[0])||(ctx.buildErrs&&ctx.buildErrs[0]&&ctx.buildErrs[0].msg)||(ctx.diag&&ctx.diag.length?ctx.diag.length+' type error'+(ctx.diag.length>1?'s':'')+': '+ctx.diag[0].msg:''))||'';
 const failing=(ctx&&ctx.tests||[]).filter(t=>!t.ok).map(t=>t.name);
 const n=met.filter(Boolean).length,score=Math.round(100*n/l.tasks.length);
 const rep={at:new Date().toISOString(),score,met:n,total:l.tasks.length,ok:met,miss,warns,errs:errs.slice(-12),nErr:errs.length,nCmd:cmds.length,runs:projLog.filter(x=>x.code!=null).length,run:String(runIssue).slice(0,400),failing:failing.slice(0,8),secs:Math.round((Date.now()-projStart)/1000)};
 P.projects=P.projects||{};const s=P.projects[l.id]=P.projects[l.id]||{attempts:[]};s.attempts=[rep,...(s.attempts||[])].slice(0,5);s.best=Math.max(s.best||0,score);rep.n=(s.count=(s.count||0)+1);
 projBusy=false;projLastReport=rep;projAi=null;
 if(L!==l)return;
 if(n===l.tasks.length)completeProject();else{touch();store.save();renderTasks();renderProjects();renderRoad()}
 const r=$('#pjReport');if(r)r.scrollIntoView({block:'start',behavior:'smooth'})}
function fmtSecs(s){return s>=3600?Math.floor(s/3600)+'h '+Math.round(s%3600/60)+'m':Math.max(1,Math.round(s/60))+' min'}
function reportHtml(r){const l=L;const pass=r.met===r.total;
 let h='<div class="card review'+(pass?' pass':'')+'"><header class="review-top"><div><div class="eyebrow">Review #'+(r.n||1)+' · '+esc(noteDate(r.at))+' · '+fmtSecs(r.secs)+'</div><h3>'+(pass?'Passed. Every requirement is met.':r.met+' of '+r.total+' requirements met')+'</h3></div><div class="score '+(pass?'ok':r.score>=50?'mid':'low')+'">'+r.score+'%</div></header>';
 h+='<h4>Requirements</h4><ul class="rlist">'+l.tasks.map((t,i)=>'<li class="'+(r.ok[i]?'ok':'bad')+'"><span class="rmark">'+(r.ok[i]?'✓':'✗')+'</span><div><div>'+esc(t.t)+'</div>'+(r.ok[i]?'':'<div class="rmiss"><b>What went wrong:</b> '+esc(r.miss[i]||'This requirement is not met yet. Re-read it and check the sandbox state.')+'</div>')+'</div></li>').join('')+'</ul>';
 if(r.warns&&r.warns.length)h+='<h4>Habits to fix</h4><ul class="rwarn">'+r.warns.map(w=>'<li>'+esc(w)+'</li>').join('')+'</ul>';
 if(r.run||(r.failing&&r.failing.length))h+='<h4>Your last run</h4>'+(r.run?'<pre class="snip c-r">'+esc(r.run)+'</pre>':'')+(r.failing&&r.failing.length?'<div class="note-meta">Failing tests: '+r.failing.map(esc).join(' · ')+'</div>':'');
 if(r.nCmd)h+='<h4>Commands that errored</h4>'+(r.errs.length?'<p class="note-meta">'+r.nErr+' of your '+r.nCmd+' commands errored. Errors are normal; what matters is reading them. Look at each one and ask what the message told you.</p><pre class="snip">'+r.errs.map(c=>'<span class="c-r">'+esc(c)+'</span>').join('\n')+'</pre>':'<p class="note-meta">None of your '+r.nCmd+' commands errored. Clean work.</p>');
 h+='<h4>'+(pass?'What next':'Before you resubmit')+'</h4><p class="note-meta">'+(pass?'Compare your work with the reference solution, then do the matching Real-world rep on your own machine.':'Fix the items marked ✗ in the same sandbox, then submit again. Your earlier work is still there.')+'</p>';
 h+='<div class="bk-row"><button class="btn" id="pjCopy">Copy review request for Claude</button>'+(sampleFn?'<button class="btn primary" id="pjAsk"'+(projAi==='…'?' disabled':'')+'>Ask Claude to review my work</button>':'')+(l.ref?'<button class="btn" id="pjRef">'+(projShowRef?'Hide':'Show')+' reference solution</button>':'')+'</div>';
 if(!sampleFn)h+='<p class="note-meta">For a written review of your choices, copy the review request and paste it into a chat with Claude. It includes the brief, these results and everything you typed.</p>';
 if(projAi)h+='<div class="ai-review">'+(projAi==='…'?'<span class="muted">Claude is reading your work…</span>':mdLite(projAi))+'</div>';
 if(projShowRef&&l.ref)h+='<div class="note-meta">One good solution. Yours can differ and still be right.</div><pre class="snip">'+esc(refText(l.ref))+'</pre>';
 return h+'</div>'}
function refText(r){if(typeof r==='string')return r;return r.map(s=>{const out=[];if(s.f)for(const [p,c] of Object.entries(s.f))out.push('# '+p+'\n'+c.replace(/\n$/,''));if(s.h)out.push(s.h);if(s.sol)out.push(typeof s.sol==='string'?s.sol:Object.entries(s.sol).map(([p,c])=>'// '+p+'\n'+c).join('\n\n'));if(s.term)out.push('$ '+[].concat(s.term).join('\n$ '));if(s.req)out.push([].concat(s.req).map(q=>q.m+' '+q.u+(q.body?' '+JSON.stringify(q.body):'')).join('\n'));return out.join('\n\n')}).join('\n\n')}
function mdLite(s){return esc(s).replace(/```[a-z]*\n([\s\S]*?)```/g,(m,c)=>'<pre class="snip">'+c+'</pre>').replace(/`([^`\n]+)`/g,'<code>$1</code>').replace(/\*\*([^*\n]+)\*\*/g,'<b>$1</b>').replace(/^#{1,4} (.+)$/gm,'<b>$1</b>').replace(/^[-*] (.+)$/gm,'• $1').replace(/\n/g,'<br>')}
function stripHtml(h){const d=document.createElement('div');d.innerHTML=h.replace(/<\/(p|li|h4|div)>/g,'\n').replace(/<li>/g,'- ');return d.textContent.replace(/\n{3,}/g,'\n\n').trim()}
function reviewPrompt(r){const l=L,t=ACAD.tracks[l.track];const out=['I am learning software engineering with Shipwright Dev Academy. I just submitted a solo project. Please review my work like a senior engineer mentoring a junior developer:','1. For each requirement I missed, explain the mistake and how to fix it.','2. Point out anything I did that works but is a bad habit or risky in real projects.','3. Name the one or two concepts I should practise next.','Be specific, refer to the exact commands or lines, and keep it encouraging.','','# Project: '+t.name+' · '+l.title,'','## Brief',stripHtml(l.brief),'','## Requirements and automatic check results'];
 l.tasks.forEach((x,i)=>out.push('- ['+(r.ok[i]?'x':' ')+'] '+x.t+(r.ok[i]?'':'\n  Checker said: '+(r.miss[i]||'not met'))));
 if(r.warns.length){out.push('','## Habits the checker flagged');r.warns.forEach(w=>out.push('- '+w))}
 if(r.run)out.push('','## Last run output (errors)','```',r.run,'```');
 const cmds=projLog.filter(x=>x.c!=null);if(cmds.length){out.push('','## Commands I ran, in order','```bash');cmds.slice(-150).forEach(c=>out.push(c.c+(c.ok?'':'   # errored')));out.push('```')}
 const files={};let whole=null;for(const x of projLog)if(x.code!=null){if(x.file)files[x.file]=x;else whole=x}
 for(const [f,x] of Object.entries(files))out.push('','## File: '+f,'```'+(x.lang||''),x.code.slice(0,6000),'```');
 if(whole)out.push('','## My final code','```'+(whole.lang||''),whole.code.slice(0,12000),'```');
 return out.join('\n')}
async function askClaude(){if(!sampleFn||!projLastReport||projAi==='…')return;projAi='…';$('#pjReport').innerHTML=reportHtml(projLastReport);
 try{const r=await sampleFn(reviewPrompt(projLastReport),{modelTier:'quick'});projAi=(r&&r.text)||'Claude did not return a review. Try again, or copy the review request instead.'}catch(e){projAi='Claude could not review this right now. Copy the review request and paste it into a chat instead.'}
 const el=$('#pjReport');if(el)el.innerHTML=reportHtml(projLastReport)}

/* ---------- events ---------- */
function projClick(e){const t=e.target.closest('#pjSubmit,#pjCopy,#pjAsk,#pjRef,[data-pcopy]');if(!t)return false;
 if(t.id==='pjSubmit'){submitProject();return true}
 if(t.id==='pjCopy'){if(projLastReport)copyText(reviewPrompt(projLastReport),t);return true}
 if(t.id==='pjAsk'){askClaude();return true}
 if(t.id==='pjRef'){projShowRef=!projShowRef;$('#pjReport').innerHTML=reportHtml(projLastReport);return true}
 if(t.dataset.pcopy!=null){const s=L.tasks[+t.dataset.pcopy];copyText(t.dataset.pfile?s.f[t.dataset.pfile]:t.dataset.pcode?s.code:s.h,t);return true}
 return false}
