/* Projects: Frontend libraries */
(()=>{
async function atWidth(ctx,w,fn){const fe=ctx.win.frameElement;const prev=fe.style.width;fe.style.width=w+'px';await sleep(150);try{return await fn()}finally{fe.style.width=prev;await sleep(40)}}
const cols=(ctx,el)=>el?ctx.css(el,'gridTemplateColumns').split(' ').filter(Boolean).length:0;
const waitFor=async(fn,ms)=>{const t0=Date.now();while(Date.now()-t0<(ms||1500)){try{if(await fn())return true}catch(e){}await sleep(60)}return false};
const btnText=(ctx,re)=>ctx.$$('button').find(b=>re.test(b.textContent));
const mock=data=>`(function(){var DATA=${JSON.stringify(data)};window.fetch=function(u){u=String(u);var k=Object.keys(DATA).find(function(p){return u.indexOf(p)===0});if(!k)return Promise.reject(new TypeError("Failed to fetch "+u));return new Promise(function(r){setTimeout(function(){r(new Response(JSON.stringify(DATA[k]),{headers:{"content-type":"application/json"}}))},250)})}})();`;
const PRODUCTS=[{id:1,name:'Keyboard',price:49},{id:2,name:'Mouse',price:19},{id:3,name:'Monitor',price:189},{id:4,name:'Webcam',price:59}];

const CARD=`function ProductCard({ product, onAdd }) {
  return (
    <article className="card">
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
      <button onClick={() => onAdd(product)}>Add to cart</button>
    </article>
  );
}
`;
const G1=`import { useState, useEffect } from 'react';

${CARD}
export default function App() {
  const add = () => {};
  return (
    <main>
      <h1>Gadget Shop</h1>
      <ProductCard product={{ id: 1, name: 'Keyboard', price: 49 }} onAdd={add} />
      <ProductCard product={{ id: 2, name: 'Mouse', price: 19 }} onAdd={add} />
      <ProductCard product={{ id: 3, name: 'Monitor', price: 189 }} onAdd={add} />
    </main>
  );
}
`;
const app=(parts)=>`import { useState, useEffect } from 'react';

${CARD}
export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);${parts.search?"\n  const [query, setQuery] = useState('');":''}${parts.cart?'\n  const [cart, setCart] = useState([]);':''}

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);
${parts.search?"\n  const visible = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));\n":"\n  const visible = products;\n"}
  return (
    <main>
      <h1>Gadget Shop</h1>${parts.cart?'\n      <p id="cart">Cart: {cart.length}</p>':''}${parts.search?'\n      <input placeholder="Search products" value={query} onChange={(e) => setQuery(e.target.value)} />':''}
      {loading ? <p>Loading…</p> : visible.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={${parts.cart?'(item) => setCart([...cart, item])':'() => {}'}} />
      ))}
    </main>
  );
}
`;

const SOLO_START=`<div class="top"><b>Launchpad</b> <a href="#">Docs</a> <a href="#">Pricing</a></div>
<div class="content">
  <h1>Ship your side project faster</h1>
  <div class="features">
    <div class="feature">Deploy previews</div>
    <div class="feature">Edge caching</div>
    <div class="feature">Team roles</div>
  </div>

  <!-- TODO: the signup form goes here -->

  <button id="load-plans">Load plans</button>
  <ul id="plans"></ul>
</div>
<div class="bottom">© Launchpad</div>

<style>
  body { font-family: system-ui, sans-serif; margin: 0; padding: 16px; }
</style>

<script>
  // TODO
</script>
`;
const SOLO_REF=`<header><b>Launchpad</b> <nav><a href="#">Docs</a> <a href="#">Pricing</a></nav></header>
<main>
  <h1>Ship your side project faster</h1>
  <section class="features">
    <div class="feature">Deploy previews</div>
    <div class="feature">Edge caching</div>
    <div class="feature">Team roles</div>
  </section>

  <form id="signup" novalidate>
    <label for="name">Name</label>
    <input id="name" name="name">
    <label for="email">Email</label>
    <input id="email" name="email" type="email">
    <label for="password">Password</label>
    <input id="password" name="password" type="password">
    <p id="error" role="alert"></p>
    <button type="submit">Create account</button>
  </form>
  <p id="welcome"></p>

  <button id="load-plans">Load plans</button>
  <ul id="plans"></ul>
</main>
<footer>© Launchpad</footer>

<style>
  body { font-family: system-ui, sans-serif; margin: 0; padding: 16px; }
  .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  @media (max-width: 600px) { .features { grid-template-columns: 1fr; } }
  form { display: grid; gap: 6px; max-width: 320px; margin: 24px 0; }
</style>

<script>
  const form = document.querySelector('#signup');
  const error = document.querySelector('#error');
  const welcome = document.querySelector('#welcome');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    welcome.textContent = '';
    if (!name) return (error.textContent = 'Enter your name');
    if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) return (error.textContent = 'Enter a valid email');
    if (password.length < 8) return (error.textContent = 'Password must be at least 8 characters');
    error.textContent = '';
    welcome.textContent = 'Welcome, ' + name + '!';
    form.reset();
  });

  document.querySelector('#load-plans').addEventListener('click', async () => {
    const list = document.querySelector('#plans');
    try {
      const res = await fetch('/api/plans');
      const plans = await res.json();
      list.replaceChildren(...plans.map((p) => {
        const li = document.createElement('li');
        li.textContent = p.name + ': $' + p.price + '/month';
        return li;
      }));
    } catch (err) {
      list.textContent = 'Could not load plans';
    }
  });
</script>
`;
async function submitForm(ctx,name,email,pw){const f=ctx.$('#signup');if(!f)return false;await ctx.type('#name',name);await ctx.type('#email',email);await ctx.type('#password',pw);const before=ctx.doc;try{f.requestSubmit()}catch(e){f.dispatchEvent(new ctx.win.Event('submit',{cancelable:true,bubbles:true}))}await sleep(150);return ctx.win.document===before}
const alertText=ctx=>ctx.$$('[role="alert"]').map(e=>e.textContent).join(' ');

defineProjects('frontend',{
guided:{title:'Build a product catalog in React',kind:'code',lang:'react',inject:mock({'/api/products':PRODUCTS}),starter:`import { useState, useEffect } from 'react';

export default function App() {
  return (
    <main>
      <h1>Gadget Shop</h1>
    </main>
  );
}
`,
 pitch:'Go from one component to a working catalog: props, data fetching with useEffect, a loading state, live search, and a cart in lifted state.',
 brief:`<p>You'll build the product page of a small shop, one React idea at a time. Each step shows the code to add and why it's written that way. Type it into the editor, press <b>Run</b>, and the step checks itself.</p>
<p>The sandbox has a fake API: <code>fetch('/api/products')</code> returns four products after a short delay, like a real network.</p>
<div class="tip"><b>Goal</b>A searchable product list loaded from the API, with a cart count that updates when you click "Add to cart".</div>`,
 tasks:[
 {t:'Make a ProductCard component and render three cards with props.',why:'A component is a function that takes <b>props</b> and returns UI. Destructuring <code>{ product, onAdd }</code> in the parameter list documents exactly what the component needs.',code:CARD+'\n// in App:\n<ProductCard product={{ id: 1, name: \'Keyboard\', price: 49 }} onAdd={add} />',sol:G1,c:ctx=>ctx.$$('.card').length>=3&&/function\s+ProductCard\s*\(\s*\{/.test(ctx.code)&&/<ProductCard\b/.test(ctx.code)},
 {t:'Load the products from /api/products with useEffect and render one card per product.',why:'Fetching is a side effect, so it goes in <code>useEffect</code>. The empty array <code>[]</code> means "run once, after the first render". Each card in a list needs a stable <code>key</code> so React can tell items apart between renders.',code:"const [products, setProducts] = useState([]);\nconst [loading, setLoading] = useState(true);\n\nuseEffect(() => {\n  fetch('/api/products')\n    .then((res) => res.json())\n    .then((data) => {\n      setProducts(data);\n      setLoading(false);\n    });\n}, []);\n\n// in the JSX:\n{products.map((p) => <ProductCard key={p.id} product={p} onAdd={() => {}} />)}",sol:app({}),c:async ctx=>/useEffect\(/.test(ctx.code)&&/key=\{/.test(ctx.code)&&await waitFor(()=>ctx.$$('.card').length===4&&/Webcam/.test(ctx.text()),2000)},
 {t:'Show "Loading…" until the data arrives.',why:'Real networks are slow. Without a loading state, users see an empty page and assume it\'s broken. A ternary in JSX picks what to show.',code:"{loading ? <p>Loading…</p> : products.map((p) => (\n  <ProductCard key={p.id} product={p} onAdd={() => {}} />\n))}",sol:app({}),c:async ctx=>/Loading/.test(ctx.code)&&/\?\s*</.test(ctx.code)&&await waitFor(()=>ctx.$$('.card').length===4,2000)},
 {t:'Add a search box that filters the cards by name as you type.',why:'A <b>controlled input</b> keeps its value in state (<code>value</code> + <code>onChange</code>). The filtered list is <b>derived</b> from state on every render. Don\'t store it in a second state variable, or the two copies drift apart.',code:"const [query, setQuery] = useState('');\nconst visible = products.filter((p) =>\n  p.name.toLowerCase().includes(query.toLowerCase())\n);\n\n<input placeholder=\"Search products\" value={query} onChange={(e) => setQuery(e.target.value)} />\n// render visible.map(...) instead of products.map(...)",sol:app({search:true}),c:async ctx=>{if(!await waitFor(()=>ctx.$$('.card').length===4,2000))return false;const i=ctx.$('input');if(!i)return false;await ctx.type(i,'key');const one=await waitFor(()=>ctx.$$('.card').length===1&&/Keyboard/.test(ctx.text()),800);await ctx.type(i,'');return one&&await waitFor(()=>ctx.$$('.card').length===4,800)}},
 {t:'Add a cart: "Add to cart" buttons update a "Cart: N" count in the header.',why:'The cart is needed by the header and by every card, so it lives in their common parent, <code>App</code>. This is called <b>lifting state up</b>. Cards get a callback prop. Make a new array (<code>[...cart, item]</code>) instead of pushing into the old one, so React notices the change.',code:"const [cart, setCart] = useState([]);\n\n<p id=\"cart\">Cart: {cart.length}</p>\n<ProductCard key={p.id} product={p} onAdd={(item) => setCart([...cart, item])} />",sol:app({search:true,cart:true}),c:async ctx=>{if(!await waitFor(()=>ctx.$$('.card').length>=1,2000))return false;const i=ctx.$('input');if(i)await ctx.type(i,'');await waitFor(()=>ctx.$$('.card').length===4,800);const b=btnText(ctx,/add to cart/i);const cart=ctx.$('#cart');if(!b||!cart)return false;const n0=+((cart.textContent.match(/\d+/)||[0])[0]);b.click();await sleep(60);const b2=btnText(ctx,/add to cart/i);b2&&b2.click();return waitFor(()=>new RegExp('Cart: '+(n0+2)).test(ctx.$('#cart').textContent),800)}},
 ]},
solo:{title:'Ship an accessible, responsive signup page',kind:'code',lang:'web',inject:mock({'/api/plans':[{name:'Hobby',price:0},{name:'Pro',price:12},{name:'Team',price:49}]}),starter:SOLO_START,
 pitch:'Turn a div soup page into a semantic, responsive landing page with a validated signup form and plans loaded from an API, in plain HTML, CSS and JavaScript.',
 brief:`<p>A startup's landing page was thrown together from <code>div</code>s. Your job is to make it production-ready using plain HTML, CSS and JavaScript (no frameworks). QA's automated tests rely on the ids below, so use them exactly.</p>
<p><b>Spec</b></p><ul><li>Use landmark elements: <code>header</code>, <code>main</code> and <code>footer</code>.</li><li>Add a signup form with id <code>signup</code> and inputs with ids <code>name</code>, <code>email</code> and <code>password</code>. Every input needs a visible <code>&lt;label for&gt;</code>.</li><li>When the form is submitted with a problem (empty name, invalid email, or a password under 8 characters), show a message in an element with <code>role="alert"</code> that says what's wrong. The page must not reload.</li><li>A valid submission shows <code>Welcome, &lt;name&gt;!</code> in an element with id <code>welcome</code>.</li><li><code>.features</code> is a 3-column grid on wide screens and a single column at 600px wide or less.</li><li>Clicking <code>#load-plans</code> fetches <code>/api/plans</code> and lists each plan's name and price as an <code>li</code> in <code>#plans</code>.</li></ul>`,
 tasks:[
 {t:'The page uses header, main and footer landmarks.',c:ctx=>!!(ctx.$('header')&&ctx.$('main')&&ctx.$('footer')),
  miss:ctx=>'Missing: '+['header','main','footer'].filter(x=>!ctx.$(x)).join(', ')+'. Screen-reader users jump between landmarks to navigate. A div with class "top" means nothing to them.'},
 {t:'#signup has #name, #email and #password inputs, each with a matching <label for>.',c:ctx=>{const f=ctx.$('#signup');if(!f)return false;return ['name','email','password'].every(id=>{const i=ctx.$('#'+id);return i&&f.contains(i)&&!!ctx.$('label[for="'+id+'"]')})},
  miss:ctx=>{if(!ctx.$('#signup'))return 'There is no element with id="signup". Add a <form id="signup">.';const bad=['name','email','password'].filter(id=>!ctx.$('#'+id));if(bad.length)return 'Missing inputs: #'+bad.join(', #')+'.';const nol=['name','email','password'].filter(id=>!ctx.$('label[for="'+id+'"]'));return 'These inputs have no <label for="…">: '+nol.join(', ')+'. A placeholder is not a label: it disappears as you type and many screen readers skip it.'}},
 {t:'Bad input shows a role="alert" message for an invalid email and for a short password, without reloading.',c:async ctx=>{if(!ctx.$('#signup'))return false;let stay=await submitForm(ctx,'Ada','not-an-email','longenough1');if(!stay)return false;const a1=alertText(ctx);stay=await submitForm(ctx,'Ada','ada@example.com','short');if(!stay)return false;const a2=alertText(ctx);return /email/i.test(a1)&&/8|password|short/i.test(a2)&&!/Welcome/.test(ctx.$('#welcome')?ctx.$('#welcome').textContent:'')},
  miss:async ctx=>{if(!ctx.$('#signup'))return 'Build the form first.';const stay=await submitForm(ctx,'Ada','not-an-email','longenough1');if(!stay)return 'Submitting the form reloaded the page, so your validation never got to run. Call event.preventDefault() at the top of your submit handler.';if(!ctx.$$('[role="alert"]').length)return 'No element has role="alert". Without it, screen readers don\'t announce the error. Put the message in something like <p role="alert" id="error"></p>.';if(!/email/i.test(alertText(ctx)))return 'An invalid email ("not-an-email") didn\'t produce an alert that mentions the email. Your message was: "'+alertText(ctx).trim()+'".';return 'A short password ("short") didn\'t produce an alert about the password length.'}},
 {t:'A valid submission shows "Welcome, <name>!" in #welcome.',c:async ctx=>{if(!ctx.$('#signup'))return false;const stay=await submitForm(ctx,'Grace','grace@example.com','longenough123');return stay&&waitFor(()=>/Welcome, Grace!/.test((ctx.$('#welcome')||{}).textContent||''),600)},
  miss:async ctx=>{if(!ctx.$('#welcome'))return 'There is no element with id="welcome".';const stay=await submitForm(ctx,'Grace','grace@example.com','longenough123');if(!stay)return 'The page reloaded on a valid submit. Call event.preventDefault().';return 'For Grace / grace@example.com / longenough123, #welcome showed "'+((ctx.$('#welcome')||{}).textContent||'').trim()+'" instead of "Welcome, Grace!". Check that valid input passes all your checks.'}},
 {t:'.features is 3 columns on wide screens and 1 column at 600px or less.',c:async ctx=>{const g=ctx.$('.features');if(!g||ctx.css(g,'display')!=='grid')return false;return await atWidth(ctx,900,()=>cols(ctx,ctx.$('.features'))===3)&&await atWidth(ctx,420,()=>cols(ctx,ctx.$('.features'))===1)},
  miss:async ctx=>{const g=ctx.$('.features');if(!g)return 'There is no .features element.';if(ctx.css(g,'display')!=='grid')return '.features is display: '+ctx.css(g,'display')+'. Use display: grid with grid-template-columns: repeat(3, 1fr).';const w=await atWidth(ctx,900,()=>cols(ctx,ctx.$('.features')));if(w!==3)return 'At 900px wide, .features has '+w+' column(s), not 3.';return 'On a 420px-wide phone, .features still has several columns. Add @media (max-width: 600px) { .features { grid-template-columns: 1fr; } }.'}},
 {t:'#load-plans fetches /api/plans and lists the 3 plans with prices in #plans.',c:async ctx=>{const b=ctx.$('#load-plans');if(!b)return false;b.click();return waitFor(()=>{const li=ctx.$$('#plans li');return li.length===3&&/Pro/.test(ctx.$('#plans').textContent)&&/12/.test(ctx.$('#plans').textContent)},1500)},
  miss:async ctx=>{if(!ctx.$('#load-plans'))return 'The #load-plans button is gone.';const n=ctx.$$('#plans li').length;if(!/fetch\(/.test(ctx.code))return 'Your code never calls fetch(\'/api/plans\').';if(n>3)return 'Clicking twice added the plans twice ('+n+' items). Clear the list before adding (replaceChildren() or list.innerHTML = \'\').';return 'After clicking, #plans had '+n+' <li> items, not 3 with names and prices. Remember: fetch returns a promise, then res.json() returns another one. Await both.'}},
 ],
 warn:[
  {c:ctx=>/innerHTML\s*\+?=\s*[^;\n]*(name|value|email)/i.test(ctx.code),m:'You put user input into innerHTML. If someone types <img src=x onerror=alert(1)> as their name, it runs as code (XSS). Use textContent for anything a user typed.'},
  {c:ctx=>/\bon(click|submit)\s*=\s*"/i.test(ctx.code),m:'You used inline onclick/onsubmit attributes. Keep behaviour in JavaScript with addEventListener: it\'s easier to maintain and works with a strict Content-Security-Policy.'},
  {c:ctx=>/\bvar\s+\w/.test(ctx.code),m:'You used var. Prefer const (or let when you reassign): they are block-scoped and avoid hoisting surprises.'},
  {c:ctx=>!!ctx.$('#email')&&ctx.$('#email').type!=='email',m:'The email input isn\'t type="email". The right type gives mobile users the @ keyboard and enables browser autofill.'},
 ],
 ref:SOLO_REF},
});
})();
