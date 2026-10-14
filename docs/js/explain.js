/* "Explained step by step": a from-zero walkthrough of every lesson's ideas, with diagrams.
   Shown between "In plain English" and the lesson's quick reference. Content lives in
   js/explain/<track>.js, one explain(lessonId, html) call per lesson. */
const DEEP={};
function explain(id,html){DEEP[id]=html}
function deepHtml(l){const h=DEEP[l.id];if(!h)return '';let shut=false;try{shut=localStorage.getItem('shipwright-deep')==='closed'}catch(e){}
 return '<details class="deep"'+(shut?'':' open')+'><summary>Explained step by step <span class="deep-sub">the full walkthrough · read this first</span></summary><div class="deep-body">'+h+'</div></details>'}
/* Remember whether the learner keeps the walkthrough open or closed. */
document.addEventListener('toggle',e=>{if(e.target.matches&&e.target.matches('details.deep'))try{localStorage.setItem('shipwright-deep',e.target.open?'open':'closed')}catch(x){}},true);
/* Tap a diagram to see it full screen; tap again (or press Escape) to close. */
document.addEventListener('click',e=>{const z=document.querySelector('.figzoom');if(z){z.remove();return}
 const f=e.target.closest&&e.target.closest('.deep .fig');if(!f)return;const o=document.createElement('div');o.className='figzoom';o.setAttribute('role','dialog');o.setAttribute('aria-label','Enlarged diagram');o.appendChild(f.cloneNode(true));document.body.appendChild(o)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const z=document.querySelector('.figzoom');if(z)z.remove()}});
