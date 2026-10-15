/* "Explained step by step": a from-zero walkthrough of every lesson's ideas, with diagrams.
   Shown between "In plain English" and the lesson's quick reference. Content lives in
   js/explain/<track>.js, one explain(lessonId, html) call per lesson. */
const DEEP={};
/* Wide reading: the lesson text takes the full width and the sandbox moves underneath. */
function wideOn(){try{return localStorage.getItem('shipwright-wide')==='1'}catch(e){return false}}
function applyWide(){const g=document.getElementById('lessonGrid');if(g)g.classList.toggle('reading',wideOn());document.querySelectorAll('[data-widen]').forEach(b=>b.textContent=wideOn()?'Narrow the reading area':'Widen the reading area')}
if(typeof document!=='undefined'){document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-widen]');if(!b)return;e.stopPropagation();try{localStorage.setItem('shipwright-wide',wideOn()?'0':'1')}catch(x){}applyWide()},true);
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyWide);else applyWide()}
function explain(id,html){DEEP[id]=html}
function deepHtml(l){const h=DEEP[l.id];if(!h)return '';let shut=false;try{shut=localStorage.getItem('shipwright-deep')==='closed'}catch(e){}
 return '<details class="deep"'+(shut?'':' open')+'><summary>Understand it <span class="deep-sub">pictures, analogies and rules · read this first</span></summary><div class="deep-body"><button type="button" class="widen" data-widen>'+(wideOn()?'Narrow the reading area':'Widen the reading area')+'</button>'+h+'</div></details>'}
/* Remember whether the learner keeps the walkthrough open or closed. */
document.addEventListener('toggle',e=>{if(e.target.matches&&e.target.matches('details.deep'))try{localStorage.setItem('shipwright-deep',e.target.open?'open':'closed')}catch(x){}},true);
/* Tap a diagram to see it full screen; tap again (or press Escape) to close. */
document.addEventListener('click',e=>{const z=document.querySelector('.figzoom');if(z){z.remove();return}
 const f=e.target.closest&&e.target.closest('.deep .fig');if(!f)return;const o=document.createElement('div');o.className='figzoom';o.setAttribute('role','dialog');o.setAttribute('aria-label','Enlarged diagram');o.appendChild(f.cloneNode(true));document.body.appendChild(o)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const z=document.querySelector('.figzoom');if(z)z.remove()}});

/* ---------- Icon library ----------
   Simple line icons (box, tag, server, database, lock...) that walkthrough diagrams place with
   <use href="#ic-NAME" x y width height class="ic ic-a"/>. Drawn with currentColor, so the
   .ic-* class picks the colour and they work in light and dark mode. */
const ICONS={
 box:'<path class="f" d="M8 18 24 10 40 18V36L24 44 8 36Z"/><path d="M8 18 24 26 40 18M24 26V44"/>',
 jar:'<path class="f" d="M14 12H34V15C38 17 39 21 39 25V40C39 42 37 44 35 44H13C11 44 9 42 9 40V25C9 21 10 17 14 15Z"/><rect x="12" y="5" width="24" height="7" rx="2"/>',
 tag:'<path class="f" d="M5 12H27L43 24 27 36H5Z"/><circle cx="13" cy="24" r="3"/>',
 person:'<circle class="f" cx="24" cy="15" r="7"/><path class="f" d="M10 42C10 31 17 27 24 27S38 31 38 42Z"/>',
 people:'<circle class="f" cx="17" cy="16" r="6"/><circle class="f" cx="33" cy="18" r="5"/><path class="f" d="M5 40C5 31 10 27 17 27S29 31 29 40Z"/><path d="M31 27C37 27 43 30 43 38"/>',
 laptop:'<rect class="f" x="10" y="9" width="28" height="20" rx="2"/><path d="M4 35H44L40 29H8Z"/>',
 phone:'<rect class="f" x="14" y="4" width="20" height="40" rx="4"/><path d="M21 38H27"/>',
 server:'<rect class="f" x="8" y="6" width="32" height="15" rx="2"/><rect class="f" x="8" y="27" width="32" height="15" rx="2"/><path d="M14 13.5H15M14 34.5H15M22 13.5H34M22 34.5H34"/>',
 db:'<path class="f" d="M10 10V38C10 41 16 43 24 43S38 41 38 38V10"/><ellipse class="f" cx="24" cy="10" rx="14" ry="5"/><path d="M10 24C10 27 16 29 24 29S38 27 38 24"/>',
 cloud:'<path class="f" d="M14 36H36C42 36 44 31 42 27S36 23 35 23C35 16 29 12 23 13S15 18 15 22C10 22 6 26 7 30S11 36 14 36Z"/>',
 lock:'<rect class="f" x="10" y="21" width="28" height="21" rx="3"/><path d="M16 21V15C16 10 20 7 24 7S32 10 32 15V21"/><circle cx="24" cy="31" r="2.5"/>',
 unlock:'<rect class="f" x="10" y="21" width="28" height="21" rx="3"/><path d="M16 21V15C16 10 20 7 24 7S32 10 32 14"/><circle cx="24" cy="31" r="2.5"/>',
 key:'<circle class="f" cx="15" cy="24" r="8"/><path d="M23 24H42M36 24V31M41 24V29"/>',
 folder:'<path class="f" d="M5 14V39H43V18H22L18 13H5Z"/>',
 file:'<path class="f" d="M12 5H29L38 14V43H12Z"/><path d="M29 5V14H38M17 23H33M17 29H33M17 35H27"/>',
 gear:'<circle class="f" cx="24" cy="24" r="8"/><path d="M24 5V11M24 37V43M5 24H11M37 24H43M10.6 10.6 14.8 14.8M33.2 33.2 37.4 37.4M37.4 10.6 33.2 14.8M14.8 33.2 10.6 37.4"/>',
 mail:'<rect class="f" x="6" y="12" width="36" height="24" rx="2"/><path d="M6 13 24 27 42 13"/>',
 warn:'<path class="f" d="M24 6 44 40H4Z"/><path d="M24 18V28"/><circle cx="24" cy="34" r="1.2"/>',
 check:'<circle class="f" cx="24" cy="24" r="18"/><path d="M15 24 21 30 33 18"/>',
 cross:'<circle class="f" cx="24" cy="24" r="18"/><path d="M17 17 31 31M31 17 17 31"/>',
 bulb:'<path class="f" d="M17 31C12 27 11 22 12 17 14 10 20 7 24 7S34 10 36 17C37 22 36 27 31 31V35H17Z"/><path d="M18 40H30M20 44H28"/>',
 clock:'<circle class="f" cx="24" cy="24" r="18"/><path d="M24 13V24L31 29"/>',
 book:'<path class="f" d="M24 12C19 8 11 8 6 10V38C11 36 19 36 24 40 29 36 37 36 42 38V10C37 8 29 8 24 12Z"/><path d="M24 12V40"/>',
 house:'<path class="f" d="M11 19V42H37V19L24 8Z"/><path d="M6 23 24 7 42 23M20 42V30H28V42"/>',
 door:'<rect class="f" x="13" y="5" width="22" height="38" rx="1"/><circle cx="29" cy="25" r="1.6"/>',
 globe:'<circle class="f" cx="24" cy="24" r="18"/><ellipse cx="24" cy="24" rx="8" ry="18"/><path d="M6 24H42M9 15H39M9 33H39"/>',
 list:'<rect class="f" x="8" y="6" width="32" height="36" rx="3"/><path d="M15 15H33M15 22H33M15 29H33M15 36H26"/>',
 robot:'<rect class="f" x="10" y="14" width="28" height="22" rx="4"/><circle cx="18" cy="24" r="2.5"/><circle cx="30" cy="24" r="2.5"/><path d="M24 14V9M20 31H28"/><circle cx="24" cy="7" r="2"/>',
 machine:'<rect class="f" x="9" y="5" width="30" height="38" rx="3"/><rect x="13" y="9" width="17" height="20" rx="1"/><path d="M34 12V16M34 20V24"/><rect x="13" y="34" width="17" height="5" rx="1"/>',
 sign:'<path d="M24 44V5"/><path class="f" d="M24 9H38L42 13 38 17H24Z"/><path class="f" d="M24 22H10L6 26 10 30H24Z"/>',
 repeat:'<path d="M37 19A14 14 0 1 0 38 30"/><path d="M38 9V19H28"/>',
 shield:'<path class="f" d="M24 5 40 11V23C40 33 33 40 24 44 15 40 8 33 8 23V11Z"/>',
 terminal:'<rect class="f" x="5" y="8" width="38" height="32" rx="3"/><path d="M12 18 18 24 12 30M22 31H32"/>',
 card:'<rect class="f" x="5" y="10" width="38" height="28" rx="3"/><circle cx="16" cy="21" r="4"/><path d="M9 33C9 29 12 27 16 27S23 29 23 33M28 18H38M28 24H38M28 30H34"/>',
 bug:'<ellipse class="f" cx="24" cy="27" rx="10" ry="13"/><path d="M24 14V40M14 22 6 18M14 30H5M15 37 8 42M34 22 42 18M34 30H43M33 37 40 42M19 15 15 8M29 15 33 8"/>',
 search:'<circle class="f" cx="20" cy="20" r="12"/><path d="M29 29 42 42"/>',
 chat:'<path class="f" d="M6 10H42V32H20L11 40V32H6Z"/>',
 truck:'<rect class="f" x="4" y="13" width="24" height="20"/><path class="f" d="M28 19H37L43 26V33H28Z"/><circle cx="12" cy="36" r="4"/><circle cx="35" cy="36" r="4"/>',
 container:'<rect class="f" x="4" y="13" width="40" height="24" rx="1"/><path d="M12 13V37M20 13V37M28 13V37M36 13V37"/>',
 branch:'<circle class="f" cx="14" cy="10" r="4"/><circle class="f" cx="14" cy="38" r="4"/><circle class="f" cx="34" cy="18" r="4"/><path d="M14 14V34M34 22C34 30 22 28 15 35"/>',
 chip:'<rect class="f" x="12" y="12" width="24" height="24" rx="2"/><path d="M18 6V12M24 6V12M30 6V12M18 36V42M24 36V42M30 36V42M6 18H12M6 24H12M6 30H12M36 18H42M36 24H42M36 30H42"/>',
 brain:'<path class="f" d="M24 9C21 6 15 6 13 10 8 10 6 15 8 19 4 22 5 29 9 31 8 36 13 40 17 38 19 42 24 42 24 38V9ZM24 9C27 6 33 6 35 10 40 10 42 15 40 19 44 22 43 29 39 31 40 36 35 40 31 38 29 42 24 42"/>',
 arrow:'<path d="M6 24H40M30 14 40 24 30 34"/>'
};
(function(){if(typeof document==='undefined')return;const s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('aria-hidden','true');s.setAttribute('style','position:absolute;width:0;height:0;overflow:hidden');
 s.innerHTML=Object.entries(ICONS).map(([k,v])=>'<symbol id="ic-'+k+'" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">'+v.replace(/class="f"/g,'fill="currentColor" fill-opacity=".14"')+'</g></symbol>').join('');
 const put=()=>document.body.prepend(s);if(document.body)put();else document.addEventListener('DOMContentLoaded',put)})();

/* ---------- Step-through animations ----------
   <div class="vstep"><div class="st" data-cap="what happens">…svg…</div>…</div>
   Shows one frame at a time with Back / Next / Play, so learners watch code run line by line. */
function initSteppers(root){(root||document).querySelectorAll('.vstep:not(.ready)').forEach(sp=>{sp.classList.add('ready');const fr=[...sp.querySelectorAll(':scope>.st')];if(!fr.length)return;let k=0,timer=null;
 const cap=document.createElement('div');cap.className='st-cap';const bar=document.createElement('div');bar.className='st-bar';
 bar.innerHTML='<button type="button" class="st-b" data-st="prev" aria-label="Previous step">&#9664;</button><span class="st-dots">'+fr.map((_,i)=>'<i data-st-go="'+i+'"></i>').join('')+'</span><span class="st-n"></span><button type="button" class="st-b st-play" data-st="play">&#9654; Play</button><button type="button" class="st-b st-next" data-st="next">Next &#9654;</button>';
 sp.append(cap,bar);
 const go=n=>{k=Math.max(0,Math.min(n,fr.length-1));fr.forEach((f,i)=>f.classList.toggle('on',i===k));bar.querySelectorAll('.st-dots i').forEach((d,i)=>d.classList.toggle('on',i<=k));cap.innerHTML='<b>Step '+(k+1)+' of '+fr.length+'</b> '+(fr[k].dataset.cap||'');bar.querySelector('.st-n').textContent=(k+1)+' / '+fr.length;bar.querySelector('[data-st="prev"]').disabled=k===0;bar.querySelector('[data-st="next"]').disabled=k===fr.length-1};
 const stop=()=>{clearInterval(timer);timer=null;bar.querySelector('.st-play').innerHTML='&#9654; Play'};
 sp.__go=n=>{stop();go(n)};sp.__frames=fr;
 bar.addEventListener('click',e=>{const b=e.target.closest('[data-st],[data-st-go]');if(!b)return;e.stopPropagation();
  if(b.dataset.stGo!=null){stop();go(+b.dataset.stGo);return}const a=b.dataset.st;
  if(a==='prev'){stop();go(k-1)}else if(a==='next'){stop();go(k+1)}else if(a==='play'){if(timer){stop();return}if(k===fr.length-1)go(0);b.innerHTML='&#10074;&#10074; Pause';timer=setInterval(()=>{if(k>=fr.length-1){stop();return}go(k+1)},2600)}});
 go(0)})}
if(typeof MutationObserver!=='undefined'&&typeof document!=='undefined')new MutationObserver(()=>{if(document.querySelector('.vstep:not(.ready)'))initSteppers()}).observe(document.documentElement,{childList:true,subtree:true});

/* ---------- Authoring helpers used inside explain(...) templates ---------- */
const V={
 card:(n,title,sub,body)=>'<section class="cc"><div class="cc-head"><span class="cc-n">'+n+'</span><h4>'+title+'</h4><span class="cc-sub">'+(sub||'')+'</span></div><div class="cc-body">'+body+'</div></section>',
 strip:(kind,icon,label,html)=>'<div class="strip '+kind+'"><svg viewBox="0 0 48 48" aria-hidden="true"><use href="#ic-'+icon+'"/></svg><div><b>'+label+'</b>'+html+'</div></div>',
 like:h=>V.strip('like','bulb','Picture it',h),
 why:h=>V.strip('why','book','Why it exists',h),
 hook:h=>V.strip('hook','brain','Remember it',h),
 build:h=>V.strip('build','gear','Build it yourself',h),
 watch:h=>V.strip('watch','warn','Watch out',h),
 /* parts: strings (plain) or [n, text] (numbered, colour-coded); legend[i] explains part i+1 */
 anat:(parts,legend)=>'<div class="anat"><pre>'+parts.map(p=>Array.isArray(p)?'<span class="tk" data-n="'+p[0]+'">'+p[1]+'</span>':p).join('')+'</pre><ol>'+legend.map((t,i)=>'<li data-n="'+(i+1)+'"><span>'+t+'</span></li>').join('')+'</ol></div>',
 rules:(...groups)=>'<div class="rules">'+groups.join('')+'</div>',
 rh:t=>'<div class="rules-h">'+t+'</div>',
 ok:(code,why)=>'<div class="r-ok"><code>'+code+'</code><span>'+why+'</span></div>',
 no:(code,why)=>'<div class="r-no"><code>'+code+'</code><span>'+why+'</span></div>',
 ic:(name,x,y,s,cls)=>'<use href="#ic-'+name+'" x="'+x+'" y="'+y+'" width="'+s+'" height="'+s+'" class="ic '+(cls||'')+'"/>',
 steps:frames=>'<div class="vstep">'+frames.map(([cap,svg])=>'<div class="st" data-cap="'+String(cap).replace(/"/g,'&quot;')+'">'+svg+'</div>').join('')+'</div>'
};
