/* Shipwright Dev Academy: read lessons aloud with the browser's built-in text-to-speech.
   Works offline and through headphones. Text is spoken in small chunks (one paragraph or list item
   at a time), which keeps long lessons from being cut off and lets you skip back and forward. */
const VOICE=(()=>{
const synth=typeof window!=='undefined'&&window.speechSynthesis;
const ok=!!synth&&typeof SpeechSynthesisUtterance!=='undefined';
const DEF={rate:1,voice:'',auto:false,code:false,follow:true};
let cfg=Object.assign({},DEF);try{Object.assign(cfg,JSON.parse(localStorage.getItem('shipwright-voice')||'{}'))}catch(e){}
const saveCfg=()=>{try{localStorage.setItem('shipwright-voice',JSON.stringify(cfg))}catch(e){}};
let chunks=[],i=0,playing=false,token=0,keep=[],wake=null,title='';

/* ---------- turning the page into speech ---------- */
const SAY=[[/<\/(\w+)>/g,' closing $1 tag '],[/<(\w+)[^>]*>/g,' $1 tag '],[/(^|[\s(])\.(?=[a-z])/g,'$1dot '],[/(^|[\s(])#(?=[a-z])/gi,'$1hash '],[/\btag\s+tag\b/g,'tag'],[/·/g,'. '],[/([.!?])\s*\./g,'$1'],[/→/g,' to '],[/←/g,' from '],[/×/g,' times '],[/≤/g,' at most '],[/≥/g,' at least '],[/…/g,'. '],[/\be\.g\./g,'for example'],[/\bi\.e\./g,'that is'],[/\betc\./g,'and so on'],[/&&/g,' and '],[/\s+/g,' ']];
const clean=t=>SAY.reduce((s,[a,b])=>s.replace(a,b),String(t||'')).trim();
/* Code read aloud: say the symbols that matter, skip the noise. */
function speakCode(code){return clean(code.split('\n').map(l=>l.replace(/\/\/.*$|#.*$|--\s.*$/,'').trim()).filter(Boolean).slice(0,12).join('. ')
 .replace(/=>/g,' arrow ').replace(/===/g,' equals ').replace(/!==/g,' not equal ').replace(/==/g,' equals ').replace(/!=/g,' not equal ').replace(/<=/g,' less or equal ').replace(/>=/g,' greater or equal ')
 .replace(/[{}()[\];"'`]/g,' ').replace(/</g,' less than ').replace(/>/g,' greater than ').replace(/=/g,' equals ').replace(/\$/g,' dollar ').replace(/_/g,' '))}
function textOf(el){const c=el.cloneNode(true);c.querySelectorAll('button,.copy,.hint,textarea,input,select').forEach(x=>x.remove());c.querySelectorAll('br').forEach(x=>x.replaceWith(', '));return clean(c.textContent)}
function add(el,text){text=clean(text);if(!text)return;
 /* split long text at sentence boundaries so no single utterance is too long */
 const parts=text.match(/[\s\S]*?[.!?]+["')\]]*(?:\s+|$)|[\s\S]+$/g)||[text];let buf='';
 for(const p of parts){if((buf+p).length>230&&buf){chunks.push({el,text:buf.trim()});buf=''}buf+=p}if(buf.trim())chunks.push({el,text:buf.trim()})}
function addBlock(el){const tag=el.tagName;
 if(tag==='UL'||tag==='OL'){[...el.children].forEach(li=>add(li,textOf(li)));return}
 if(el.matches('pre')){add(el,cfg.code?'Code example: '+speakCode(el.textContent):'There is a code example on screen.');return}
 if(el.matches('.tbl-wrap,table')){const rows=[...el.querySelectorAll('tr')];const head=rows[0]?[...rows[0].children].map(c=>clean(c.textContent)):[];
  rows.slice(1).forEach(r=>{const cells=[...r.children].map(textOf);add(r,cells.map((c,k)=>k===0||!head[k]?c:head[k]+': '+c).join('. '))});return}
 if(el.matches('.flow')){add(el,[...el.querySelectorAll('span')].map(s=>clean(s.textContent)).join(', then '));return}
 if(el.matches('.cc')){[...el.children].forEach(addBlock);return}
 if(el.matches('.cc-head')){const n=el.querySelector('.cc-n'),h=el.querySelector('h4'),sb=el.querySelector('.cc-sub');add(el,'Idea '+(n?n.textContent:'')+'. '+clean(h?h.textContent:'')+(sb&&sb.textContent?'. '+clean(sb.textContent):'.'));return}
 if(el.matches('.strip')){const b=el.querySelector(':scope>div>b');const body=el.querySelector(':scope>div').cloneNode(true);const bb=body.querySelector(':scope>b');if(bb)bb.remove();const lists=[...body.querySelectorAll('li')];
  if(lists.length){const intro=body.cloneNode(true);intro.querySelectorAll('ol,ul').forEach(x=>x.remove());add(el,(b?clean(b.textContent)+'. ':'')+textOf(intro));lists.forEach((li,k)=>add(el,(k+1)+'. '+textOf(li)))}else add(el,(b?clean(b.textContent)+'. ':'')+textOf(body));return}
 if(el.matches('.anat')){const pre=el.querySelector('pre');add(el,cfg.code?'The code: '+speakCode(pre.textContent):'Look at the colour-coded code on screen.');el.querySelectorAll('ol li').forEach(li=>add(el,'Part '+li.dataset.n+'. '+textOf(li)));return}
 if(el.matches('.rules')){[...el.children].forEach(r=>{if(r.matches('.rules-h'))add(el,textOf(r));else{const c=r.querySelector('code'),sp=r.querySelector('span');add(el,(r.matches('.r-ok')?'Do: ':'Don\'t: ')+(c?clean(c.textContent):'')+'. '+(sp?clean(sp.textContent):''))}});return}
 if(el.matches('.vstep')){const fr=[...el.querySelectorAll(':scope>.st')];add(el,'An animation in '+fr.length+' steps.');fr.forEach((f,k)=>{const t=clean('Step '+(k+1)+'. '+(f.dataset.cap||'').replace(/<[^>]+>/g,''));if(t)chunks.push({el,text:t,frame:k})});return}
 if(el.matches('figure')){const c=el.querySelector('figcaption'),g=el.querySelector('svg');add(el,'Diagram. '+clean(c?c.textContent:(g&&g.getAttribute('aria-label'))||''));return}
 if(el.matches('.qref')){add(el,'Quick reference.');return}
 if(el.matches('.tip,.mistake,.analogy,.try')){const b=el.querySelector(':scope>b');add(el,(b?clean(b.textContent)+'. ':'Tip. ')+clean(el.textContent.slice(b?b.textContent.length:0)));return}
 if(el.matches('div')&&el.children.length&&[...el.children].some(c=>/^(P|UL|OL|PRE|H4|TABLE|DIV)$/.test(c.tagName))){[...el.children].forEach(addBlock);return}
 add(el,textOf(el))}
function build(){chunks=[];const sh=$('#sheet');if(!sh)return;
 const h=sh.querySelector('h2');title=h?clean(h.textContent):'';if(h)add(h,(L&&L.proj?(L.proj==='guided'?'Guided project. ':'Solo project. '):'Lesson. ')+title);
 const sub=sh.querySelector('.ladder-sub');if(sub)add(sub,textOf(sub));
 const pv=sh.querySelector('.preview-flag');if(pv)add(pv,textOf(pv));
 const plain=sh.querySelector('.plain');if(plain)add(plain,'In plain English. '+clean(plain.textContent.replace(/^In plain English/i,'')));
 const deep=sh.querySelector('.deep-body');if(deep&&deep.closest('details').open){add(deep,'Understand it.');[...deep.children].forEach(addBlock)}
 const con=sh.querySelector('.concept');if(con)[...con.children].forEach(addBlock);
 const steps=sh.querySelectorAll('.pstep');const reqs=sh.querySelectorAll('.reqs li');const tasks=sh.querySelectorAll('#tasks .task');
 if(steps.length){add(steps[0],'The steps.');steps.forEach((s,k)=>{const t=s.querySelector('.ptitle'),w=s.querySelector('.pwhy');add(s,'Step '+(k+1)+'. '+(t?clean(t.textContent):'')+(w?' '+clean(w.textContent):''))})}
 else if(reqs.length){add(reqs[0],'The requirements.');reqs.forEach((r,k)=>add(r,'Requirement '+(k+1)+'. '+clean(r.textContent)))}
 else if(tasks.length){add(tasks[0],'Your tasks.');tasks.forEach((t,k)=>{const d=t.querySelector('.ttext');const q=d?d.firstChild:null;const opts=t.querySelectorAll('.copt');
  add(t,'Task '+(k+1)+'. '+clean(q&&q.nodeType===3?q.textContent:(d?d.childNodes[0].textContent:''))+(opts.length?' Options: '+[...opts].map((o,n)=>String.fromCharCode(65+n)+', '+clean(o.textContent)).join('. '):''))})}
 if(chunks.length)chunks.push({el:null,text:'That\'s the end of the lesson. Over to you.'})}

/* ---------- playback ---------- */
function pickVoice(){if(!ok)return null;const vs=synth.getVoices();return vs.find(v=>v.name===cfg.voice)||vs.find(v=>/^en(-|_)?(GB|US)?/i.test(v.lang)&&v.default)||vs.find(v=>/^en/i.test(v.lang))||null}
function mark(){document.querySelectorAll('.speaking').forEach(x=>x.classList.remove('speaking'));const c=chunks[i];if(c&&c.el&&document.contains(c.el)){c.el.classList.add('speaking');if(c.frame!=null&&c.el.__go)c.el.__go(c.frame);if(cfg.follow)c.el.scrollIntoView({block:'center',behavior:'smooth'})}}
function speakFrom(n){if(!ok)return;const my=++token;synth.cancel();i=Math.max(0,Math.min(n,chunks.length-1));playing=true;lock(true);bar();
 const next=()=>{if(my!==token)return;if(i>=chunks.length){stop(true);return}mark();bar();const u=new SpeechSynthesisUtterance(chunks[i].text);const v=pickVoice();if(v){u.voice=v;u.lang=v.lang}else u.lang='en-US';u.rate=cfg.rate;
  u.onend=()=>{if(my!==token)return;i++;next()};u.onerror=e=>{if(my!==token||e.error==='interrupted'||e.error==='canceled')return;i++;next()};keep=[u];synth.speak(u)};
 next()}
function pause(){token++;playing=false;if(ok)synth.cancel();lock(false);bar()}
function stop(finished){token++;playing=false;if(ok)synth.cancel();lock(false);document.querySelectorAll('.speaking').forEach(x=>x.classList.remove('speaking'));i=0;bar(finished)}
async function lock(on){try{if(on&&!wake&&navigator.wakeLock){wake=await navigator.wakeLock.request('screen');wake.addEventListener('release',()=>{wake=null})}else if(!on&&wake){await wake.release();wake=null}}catch(e){}}
function media(){try{if(!('mediaSession' in navigator))return;navigator.mediaSession.metadata=new MediaMetadata({title:title||'Lesson',artist:'Shipwright Dev Academy'});
 navigator.mediaSession.setActionHandler('play',()=>speakFrom(i));navigator.mediaSession.setActionHandler('pause',pause);navigator.mediaSession.setActionHandler('nexttrack',()=>speakFrom(i+1));navigator.mediaSession.setActionHandler('previoustrack',()=>speakFrom(i-1))}catch(e){}}

/* ---------- the player bar ---------- */
function bar(finished){const b=$('#voiceBar');if(!b)return;if(!chunks.length||(!playing&&i===0&&!b.dataset.open)){b.hidden=true;return}b.hidden=false;
 const vs=ok?synth.getVoices().filter(v=>/^en/i.test(v.lang)):[];
 b.innerHTML='<div class="vb-row"><button class="btn" data-vc="prev" aria-label="Previous paragraph" title="Back one paragraph">⏮</button><button class="btn primary vb-play" data-vc="toggle" aria-label="'+(playing?'Pause':'Play')+'">'+(playing?'⏸ Pause':'▶ '+(i?'Resume':'Listen'))+'</button><button class="btn" data-vc="next" aria-label="Next paragraph" title="Forward one paragraph">⏭</button>'+
  '<div class="vb-info"><b>'+esc(title)+'</b><span>'+(finished?'Finished. Time for the tasks.':'Part '+(Math.min(i+1,chunks.length))+' of '+chunks.length)+'</span></div>'+
  '<label class="vb-sel">Speed <select data-vs="rate" aria-label="Reading speed">'+[0.8,0.9,1,1.1,1.25,1.5,1.75].map(r=>'<option value="'+r+'"'+(+cfg.rate===r?' selected':'')+'>'+r+'×</option>').join('')+'</select></label>'+
  (vs.length>1?'<label class="vb-sel vb-voice">Voice <select data-vs="voice" aria-label="Voice"><option value="">Default</option>'+vs.map(v=>'<option value="'+esc(v.name)+'"'+(v.name===cfg.voice?' selected':'')+'>'+esc(v.name.replace(/^(Microsoft|Google)\s+/,'').slice(0,28))+'</option>').join('')+'</select></label>':'')+
  '<button class="btn" data-vc="close" aria-label="Stop and close the player">✕</button></div>'+
  '<div class="vb-row vb-opts"><label><input type="checkbox" data-vs="auto"'+(cfg.auto?' checked':'')+'> Read each lesson automatically when I open it</label><label><input type="checkbox" data-vs="code"'+(cfg.code?' checked':'')+'> Read code examples aloud</label><label><input type="checkbox" data-vs="follow"'+(cfg.follow?' checked':'')+'> Scroll along</label></div>'}
function open(){if(!ok)return;build();i=0;const b=$('#voiceBar');if(b)b.dataset.open='1';media();speakFrom(0)}
function close(){stop();const b=$('#voiceBar');if(b){delete b.dataset.open;b.hidden=true}}

/* ---------- hooks used by the rest of the app ---------- */
function decorate(){const sh=$('#sheet');if(!sh||!ok||sh.querySelector('.listen'))return;const h=sh.querySelector('h2');if(!h)return;
 const btn=document.createElement('button');btn.className='btn listen';btn.dataset.vc='open';btn.innerHTML='🔊 Listen to this '+(L&&L.proj?'project':'lesson');btn.title='Read this aloud. Good for headphones on the go.';h.insertAdjacentElement('afterend',btn)}
function onOpen(){const wasOn=playing||!!($('#voiceBar')&&$('#voiceBar').dataset.open);stop();chunks=[];decorate();if(cfg.auto&&ok){const b=$('#voiceBar');if(b)b.dataset.open='1';setTimeout(()=>{build();media();speakFrom(0)},150)}else if(wasOn){const b=$('#voiceBar');if(b){delete b.dataset.open;b.hidden=true}}}
function sayOnce(text){if(!ok)return;stop();const b=$('#voiceBar');if(b){delete b.dataset.open;b.hidden=true}const u=new SpeechSynthesisUtterance(clean(text));const v=pickVoice();if(v){u.voice=v;u.lang=v.lang}u.rate=cfg.rate;keep=[u];synth.speak(u)}
function click(e){const t=e.target.closest('[data-vc],[data-vsay]');if(!t)return false;const a=t.dataset.vc;
 if(t.dataset.vsay!=null){sayOnce(t.dataset.vsay);return true}
 if(a==='open')open();else if(a==='toggle'){playing?pause():(chunks.length?speakFrom(i):open())}else if(a==='next')speakFrom(i+1);else if(a==='prev')speakFrom(i-1);else if(a==='close')close();return true}
function change(e){const k=e.target.dataset&&e.target.dataset.vs;if(!k)return false;const v=e.target.type==='checkbox'?e.target.checked:e.target.value;cfg[k]=k==='rate'?+v:v;saveCfg();
 if(k==='code'){const at=i;build();i=Math.min(at,chunks.length-1)}if(playing&&(k==='rate'||k==='voice'||k==='code'))speakFrom(i);else bar();return true}
if(ok&&synth.addEventListener)synth.addEventListener('voiceschanged',()=>bar());
return{ok,decorate,onOpen,stop:close,click,change,sayOnce,get state(){return{chunks,i,playing,cfg}},build}})();
