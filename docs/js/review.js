/* Shipwright Dev Academy: spaced review, mixed practice, "in your own words" notes and progress migration.
   Spaced repetition: every question you've met comes back after 1, 3, 7, 16, 35 and 90 days.
   A right answer moves it to the next interval; a wrong one sends it back to tomorrow. */
const REVIEW_DAYS=[1,3,7,16,35,90];
const REVIEW_CAP=15;
let RV=null;
function addDays(d,n){const x=new Date(d+'T12:00:00');x.setDate(x.getDate()+n);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')}
function rstate(){if(!P.review)P.review={items:{},log:{}};return P.review}

/* ---------- the question pool ---------- */
function reviewItem(id){const [kind,key,idx]=id.split(':');const i=+idx;
 if(kind==='L'){const l=ACAD.lessonById[key];const t=l&&l.tasks[i];if(!t||!t.o)return null;const tr=ACAD.tracks[l.track];return{id,q:t.t,o:t.o,a:t.a,e:t.e||'',src:tr.name+' · '+l.title,track:l.track}}
 if(kind==='Q'){const set=quizSets().find(s=>s.key===key);const q=set&&set.qs[i];if(!q)return null;return{id,q:q.q,o:q.o,a:q.a,e:q.e||'',src:set.track.name+' · '+set.label+(set.label==='Track quiz'?'':' quiz'),track:set.track.id}}
 return null}
function lessonItemIds(id){const l=ACAD.lessonById[id];return l?l.tasks.map((t,i)=>t.o?'L:'+id+':'+i:null).filter(Boolean):[]}
function scheduleNew(ids,spread){const r=rstate();const t=today();ids.forEach((id,k)=>{if(r.items[id])return;r.items[id]={b:0,d:addDays(t,spread?1+(k*7+id.length)%14:1)}})}
function reviewAddLesson(id){scheduleNew(lessonItemIds(id));renderReviewBadge()}
function reviewAddQuiz(key,i){scheduleNew(['Q:'+key+':'+i]);renderReviewBadge()}
function dueIds(){const r=rstate(),t=today();return Object.entries(r.items).filter(([id,s])=>s.d<=t&&reviewItem(id)).sort((a,b)=>a[1].d<b[1].d?-1:1).map(([id])=>id)}
function poolFor(trackIds){const out=[];for(const l of allLessons())if(P.lessons[l.id]&&trackIds.includes(l.track))out.push(...lessonItemIds(l.id));for(const s of quizSets())if(trackIds.includes(s.track.id))s.qs.forEach((q,i)=>{if(P.quiz[s.key]&&P.quiz[s.key][i]!=null)out.push('Q:'+s.key+':'+i)});return out}
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/* ---------- sessions ---------- */
function startReview(mode,phaseIdx){let ids;if(mode==='due'){ids=dueIds().slice(0,REVIEW_CAP);/* interleave tracks: shuffle within the due set */shuffle(ids)}else{ids=shuffle(poolFor(PHASES[phaseIdx].ids)).slice(0,10)}
 RV={mode,phase:phaseIdx,queue:ids,i:0,picked:null,right:0,wrong:[],retry:new Set()};renderReview()}
function answerReview(j){if(!RV||RV.picked!=null)return;const id=RV.queue[RV.i];const it=reviewItem(id);RV.picked=j;const ok=j===it.a;
 if(ok)RV.right++;else RV.wrong.push(it);
 if(RV.mode==='due'&&!RV.retry.has(id)){const r=rstate();const s=r.items[id]||{b:0};const b=ok?Math.min(s.b+1,REVIEW_DAYS.length-1):0;r.items[id]={b,d:addDays(today(),REVIEW_DAYS[ok?b:0])};r.log[today()]=(r.log[today()]||0)+1;
  if(ok)award(5);else{touch();store.save();RV.queue.push(id);RV.retry.add(id)}}
 renderReview()}
function nextReview(){if(!RV)return;RV.i++;RV.picked=null;renderReview()}

/* ---------- view ---------- */
function renderReviewBadge(){const b=$('#revCount');if(!b)return;const n=dueIds().length;b.textContent=n?String(Math.min(n,99)):'';b.hidden=!n}
function renderReview(){renderReviewBadge();const el=$('#reviewBody');if(!el)return;const r=rstate();
 if(RV&&RV.i<RV.queue.length){const it=reviewItem(RV.queue[RV.i]);if(!it){RV.i++;return renderReview()}
  const p=RV.picked;el.innerHTML='<div class="card rv-card"><div class="rv-top"><span class="eyebrow">'+esc(it.src)+'</span><span class="rv-tools">'+(VOICE.ok?'<button class="btn" data-vsay="'+esc(it.q+'. '+it.o.map((o,n)=>'Option '+String.fromCharCode(65+n)+': '+o).join('. ')+(p!=null?'. The answer is: '+it.o[it.a]+'. '+it.e:''))+'" title="Read this question aloud">🔊 Listen</button>':'')+'<span class="pill">'+(RV.i+1)+' / '+RV.queue.length+(RV.mode==='due'?'':' · practice')+'</span></span></div><h3>'+esc(it.q)+'</h3><div class="opts">'+it.o.map((o,j)=>'<button class="opt'+(p!=null?(j===it.a?' right':j===p?' wrong':''):'')+'" data-rv="'+j+'"'+(p!=null?' disabled':'')+'>'+esc(o)+'</button>').join('')+'</div>'+
   (p!=null?'<div class="explain">'+(p===it.a?'<b class="okc">Correct.</b> ':'<b class="badc">Not quite.</b> ')+esc(it.e)+(p!==it.a&&RV.mode==='due'?' <span class="note-meta">It will come back at the end of this session, and again tomorrow.</span>':'')+'</div><div class="bk-row"><button class="btn primary" id="rvNext">'+(RV.i+1<RV.queue.length?'Next question':'Finish')+'</button></div>':'<p class="note-meta">Try to recall the answer before you look at the options.</p>')+'</div>';return}
 let html='';
 if(RV&&RV.queue.length){const n=RV.queue.length-RV.retry.size;html+='<div class="card rv-done"><h3>'+(RV.mode==='due'?'Review done for today':'Practice round done')+'</h3><p>'+RV.right+' correct answers'+(RV.wrong.length?', '+RV.wrong.length+' to revisit':'')+'. '+(RV.mode==='due'?'Each question is now scheduled for the right day: the ones you knew come back later, the ones you missed come back sooner.':'Practice rounds don\'t change your schedule.')+'</p>'+(RV.wrong.length?'<div class="eyebrow">Worth another look</div><ul class="rwarn">'+[...new Map(RV.wrong.map(w=>[w.id,w])).values()].map(w=>'<li><b>'+esc(w.q)+'</b> '+esc(w.o[w.a])+'. <span class="muted">'+esc(w.src)+'</span></li>').join('')+'</ul>':'')+'<div class="bk-row"><button class="btn" id="rvClose">Back to review</button></div></div>';el.innerHTML=html;return}
 const due=dueIds(),items=Object.entries(r.items).filter(([id])=>reviewItem(id));const t=today();const week=items.filter(([,s])=>s.d>t&&s.d<=addDays(t,7)).length;const strong=items.filter(([,s])=>s.b>=3).length;
 html+='<div class="rv-stats"><div class="stat"><b>'+due.length+'</b><span>Due today</span></div><div class="stat"><b>'+(r.log[t]||0)+'</b><span>Reviewed today</span></div><div class="stat"><b>'+week+'</b><span>Coming this week</span></div><div class="stat"><b>'+strong+' / '+items.length+'</b><span>Well remembered</span></div></div>';
 html+='<div class="card rv-start">'+(due.length?'<h3>Today\'s review: '+Math.min(due.length,REVIEW_CAP)+' question'+(Math.min(due.length,REVIEW_CAP)===1?'':'s')+'</h3><p class="note-meta">About '+Math.max(1,Math.round(Math.min(due.length,REVIEW_CAP)*0.4))+' minutes. Questions from different tracks are mixed together on purpose.'+(due.length>REVIEW_CAP?' The other '+(due.length-REVIEW_CAP)+' wait for tomorrow.':'')+'</p><button class="btn primary" id="rvStart">Start review</button>':items.length?'<h3>All caught up</h3><p class="note-meta">Nothing is due today. Your next questions come back '+(()=>{const n=items.map(([,s])=>s.d).filter(d=>d>t).sort()[0];return n?'on '+noteDate(n):'soon'})()+'.</p>':'<h3>Your review deck is empty</h3><p class="note-meta">Finish a lesson or answer a quiz question, and its questions join your deck. They come back tomorrow, then at growing intervals.</p>')+'</div>';
 const phases=PHASES.map((ph,i)=>({ph,i,n:poolFor(ph.ids).length})).filter(x=>x.n);
 html+='<div class="card rv-mixed"><h3>Mixed practice</h3><p class="note-meta">10 questions mixed across every track in a phase. Mixing topics trains you to recognise which idea a problem needs, not just to recall the last lesson. Practice rounds don\'t change your schedule.</p>'+(phases.length?'<div class="bk-row">'+phases.map(x=>'<button class="btn" data-rv-phase="'+x.i+'">'+esc(x.ph.name.split(' · ')[1]||x.ph.name)+' <span class="muted">('+x.n+')</span></button>').join('')+'</div>':'<p class="note-meta">Unlocks once you\'ve finished some lessons.</p>')+'</div>';
 el.innerHTML=html}
function reviewClick(e){const t=e.target.closest('#rvStart,#rvNext,#rvClose,[data-rv],[data-rv-phase],#ownSave');if(!t)return false;
 if(t.id==='rvStart')startReview('due');else if(t.id==='rvNext')nextReview();else if(t.id==='rvClose'){RV=null;renderReview()}
 else if(t.dataset.rv!=null)answerReview(+t.dataset.rv);else if(t.dataset.rvPhase!=null)startReview('mix',+t.dataset.rvPhase);
 else if(t.id==='ownSave')saveOwnWords();return true}

/* ---------- explain it in your own words ---------- */
function ownWordsHtml(l){if(!l||l.proj||locked)return '';const o=(P.own||{})[l.id];
 return '<div class="own"><label class="eyebrow" for="ownTxt">Explain it in your own words</label><p class="note-meta">In 2 or 3 sentences, explain what you just learned as if teaching a friend. Explaining is one of the most effective ways to make knowledge stick, and it shows you what you haven\'t understood yet. It\'s saved in your notes.</p><textarea id="ownTxt" placeholder="This lesson was about…">'+esc(o?o.t:'')+'</textarea><div class="bk-row"><button class="btn" id="ownSave">'+(o?'Update my note':'Save to my notes')+'</button><span class="note-meta" id="ownMsg" role="status"></span></div></div>'}
function saveOwnWords(){const t=($('#ownTxt')||{}).value||'';if(!L)return;const txt=t.trim();const msg=$('#ownMsg');if(txt.split(/\s+/).filter(Boolean).length<8){if(msg)msg.textContent='Write at least a sentence or two.';return}
 P.own=P.own||{};const first=!P.own[L.id];P.own[L.id]={t:txt.slice(0,2000),at:new Date().toISOString()};if(first)award(10,'Explained in your own words');else store.save();if(msg)msg.textContent='Saved to your notes.';renderNotes()}

/* ---------- one-time progress migrations ---------- */
const OLD_ORDER=['git','docker','deploy','frontend','next','php','python','sql','testing','linux','security','dsa','sysdesign','cloud','ai'];
function migrateProgress(){let changed=creditNewLessons();
 /* The track order changed. Keep every track a learner could already open under the old order. */
 if(P.pathV!==2){const any=Object.keys(P.lessons).length>0;const keep=new Set();if(any){for(let i=0;i<OLD_ORDER.length;i++){const t=ACAD.tracks[OLD_ORDER[i]];if(!t)continue;const prev=ACAD.tracks[OLD_ORDER[i-1]];if(i===0||(prev&&prev.lessons.every(l=>P.lessons[l.id]))||t.lessons.some(l=>P.lessons[l.id]))keep.add(t.id)}}
  P.legacy=[...keep];P.pathV=2;changed=true}
 /* First run of spaced review: put everything already learned into the deck, spread over two weeks. */
 if(!P.review){const ids=[];for(const l of allLessons())if(P.lessons[l.id])ids.push(...lessonItemIds(l.id));for(const s of quizSets())s.qs.forEach((q,i)=>{if(P.quiz[s.key]&&P.quiz[s.key][i]!=null)ids.push('Q:'+s.key+':'+i)});rstate();scheduleNew(ids,true);changed=true}
 return changed}
