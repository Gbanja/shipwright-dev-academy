/* Track 4: Frontend libraries */
(()=>{
async function atWidth(ctx,w,fn){const fe=ctx.win.frameElement;const prev=fe.style.width;fe.style.width=w+'px';await sleep(150);try{return await fn()}finally{fe.style.width=prev;await sleep(40)}}
const cols=(ctx,el)=>el?ctx.css(el,'gridTemplateColumns').split(' ').filter(Boolean).length:0;
const waitFor=async(fn,ms)=>{const t0=Date.now();while(Date.now()-t0<(ms||1500)){try{if(await fn())return true}catch(e){}await sleep(60)}return false};
const btnText=(ctx,re)=>ctx.$$('button').find(b=>re.test(b.textContent));
const FETCH_MOCK=`(function(){var DATA={"/api/users":[{"id":1,"name":"Ada Lovelace"},{"id":2,"name":"Grace Hopper"},{"id":3,"name":"Alan Turing"}],"/api/products":[{"id":1,"name":"Keyboard","price":49},{"id":2,"name":"Mouse","price":19},{"id":3,"name":"Monitor","price":189}]};window.fetch=function(u){u=String(u);var k=Object.keys(DATA).find(function(p){return u.indexOf(p)===0});if(!k)return Promise.reject(new TypeError("Failed to fetch "+u+" (this sandbox serves /api/users and /api/products)"));return new Promise(function(r){setTimeout(function(){r(new Response(JSON.stringify(DATA[k]),{headers:{"content-type":"application/json"}}))},80)})}})();`;

const F1_START=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>My portfolio</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 0; }
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; }
</style>
</head>
<body>
  <div class="top">
    <div class="menu"><a href="#work">Work</a> <a href="#about">About</a> <a href="#contact">Contact</a></div>
  </div>
  <div class="content">
    <h1>Hi, I'm Ada</h1>
    <div class="cards">
      <div class="card"><h2>Shop</h2><p>An online store</p></div>
      <div class="card"><h2>Blog</h2><p>My writing</p></div>
      <div class="card"><h2>Chat</h2><p>A realtime app</p></div>
    </div>
  </div>
  <div class="bottom">© 2026 Ada</div>
</body>
</html>`;
const F1_SOL=`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>My portfolio</title>
<style>
  body { font-family: system-ui, sans-serif; margin: 0; }
  header { padding: 16px 24px; border-bottom: 1px solid #ddd; }
  nav ul { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
  main { padding: 24px; }
  .cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; }
  @media (max-width: 600px) {
    .cards { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="#work">Work</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Hi, I'm Ada</h1>
    <section class="cards">
      <article class="card"><h2>Shop</h2><p>An online store</p></article>
      <article class="card"><h2>Blog</h2><p>My writing</p></article>
      <article class="card"><h2>Chat</h2><p>A realtime app</p></article>
    </section>
  </main>
  <footer><p>© 2026 Ada</p></footer>
</body>
</html>`;
const F2_START=`<input id="task" placeholder="New task">
<button id="add">Add</button>
<ul id="list"></ul>

<h2>Team</h2>
<ul id="users"></ul>

<script>
// 1. When #add is clicked, add the input's text as a new <li> in #list
// 2. Ignore empty input
// 3. Give every <li> a Delete button that removes it
// 4. Load /api/users with fetch() and list the names in #users
</script>`;
const F2_SOL=`<input id="task" placeholder="New task">
<button id="add">Add</button>
<ul id="list"></ul>

<h2>Team</h2>
<ul id="users"></ul>

<script>
const input = document.querySelector('#task');
const list = document.querySelector('#list');

function addTask() {
  const text = input.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.textContent = text + ' ';
  const del = document.createElement('button');
  del.textContent = 'Delete';
  del.addEventListener('click', () => li.remove());
  li.append(del);
  list.append(li);
  input.value = '';
}

document.querySelector('#add').addEventListener('click', addTask);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

async function loadUsers() {
  const res = await fetch('/api/users');
  const users = await res.json();
  const ul = document.querySelector('#users');
  for (const user of users) {
    const li = document.createElement('li');
    li.textContent = user.name;
    ul.append(li);
  }
}
loadUsers();
</script>`;
const F3_START=`import { useState, useEffect } from 'react';

function Counter() {
  // TODO: keep a count in state, show it, and increase it on click
  return <button>Clicked 0 times</button>;
}

export default function App() {
  return (
    <main>
      <h1>React playground</h1>
      <Counter />
    </main>
  );
}`;
const F3_SOL=`import { useState, useEffect } from 'react';

function Counter({ step = 1 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = 'Clicked ' + count + ' times';
  }, [count]);

  return <button onClick={() => setCount(count + step)}>Clicked {count} times</button>;
}

function TodoList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

const todos = [
  { id: 1, text: 'Learn JSX' },
  { id: 2, text: 'Learn props' },
  { id: 3, text: 'Learn state' },
];

export default function App() {
  return (
    <main>
      <h1>React playground</h1>
      <Counter />
      <TodoList items={todos} />
    </main>
  );
}`;
const F4_START=`// Tailwind is loaded in this preview. Style with utility classes.
function Button({ children }) {
  return <button>{children}</button>;
}

export default function App() {
  return (
    <main>
      <h1>Projects</h1>
      <div>
        <div>Shop</div>
        <div>Blog</div>
        <div>Chat</div>
      </div>
      <Button>Save</Button>
    </main>
  );
}`;
const F4_SOL=`const variants = {
  primary: 'bg-violet-600 text-white hover:bg-violet-700',
  outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50',
};

function Button({ variant = 'primary', children, ...props }) {
  return (
    <button
      className={'rounded-md px-4 py-2 text-sm font-semibold ' + variants[variant]}
      {...props}
    >
      {children}
    </button>
  );
}

function Card({ title }) {
  return <div className="rounded-lg border p-4 shadow-sm">{title}</div>;
}

export default function App() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Shop" />
        <Card title="Blog" />
        <Card title="Chat" />
      </div>
      <div className="flex gap-2">
        <Button>Save</Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </main>
  );
}`;
const F5_SOL=`import { create } from 'zustand';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// Client state: a tiny global store
const useCart = create((set) => ({
  items: 0,
  add: () => set((state) => ({ items: state.items + 1 })),
}));

function AddButton() {
  const add = useCart((s) => s.add);
  return <button onClick={add}>Add to cart</button>;
}

function CartBadge() {
  const items = useCart((s) => s.items);
  return <p id="badge">Cart: {items}</p>;
}

// Server state: fetched, cached and refreshed by TanStack Query
function Products() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then((r) => r.json()),
  });
  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong</p>;
  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>{p.name}: \${p.price}</li>
      ))}
    </ul>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartBadge />
      <AddButton />
      <Products />
    </QueryClientProvider>
  );
}`;
const F6_SOL=`import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Use at least 8 characters'),
});

// In a real project: import { zodResolver } from '@hookform/resolvers/zod'
// This is what that resolver does under the hood:
const zodResolver = (schema) => async (values) => {
  const result = schema.safeParse(values);
  if (result.success) return { values: result.data, errors: {} };
  const errors = {};
  for (const issue of result.error.issues) {
    errors[issue.path[0]] = { type: issue.code, message: issue.message };
  }
  return { values: {}, errors };
};

export default function App() {
  const [welcome, setWelcome] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((data) => setWelcome(data.email))}>
      <label>Email <input {...register('email')} /></label>
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <label>Password <input type="password" {...register('password')} /></label>
      {errors.password && <p role="alert">{errors.password.message}</p>}

      <button type="submit">Sign up</button>
      {welcome && <p id="ok">Welcome, {welcome}!</p>}
    </form>
  );
}`;
const F7_SOL=(extra)=>`import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', visitors: 120 },
  { month: 'Feb', visitors: 210 },
  { month: 'Mar', visitors: 180 },
  { month: 'Apr', visitors: 320 },${extra?"\n  { month: 'May', visitors: 410 },":''}
];

export default function App() {
  return (
    <main>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Analytics
      </motion.h1>
      <BarChart width={420} height={220} data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="visitors" fill="#6A58CF" />
      </BarChart>
    </main>
  );
}`;
const F8_START=`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// render, screen and fireEvent come from React Testing Library.
test('starts at zero', () => {
  render(<Counter />);
  expect(screen.getByRole('heading').textContent).toBe('Count: 0');
});

// TODO: test that clicking Increment twice shows "Count: 2"
// TODO: test that Reset goes back to "Count: 0"`;
const F8_SOL=`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

test('starts at zero', () => {
  render(<Counter />);
  expect(screen.getByRole('heading').textContent).toBe('Count: 0');
});

test('increments when clicked', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: 'Increment' });
  fireEvent.click(button);
  fireEvent.click(button);
  expect(screen.getByRole('heading').textContent).toBe('Count: 2');
});

test('resets to zero', () => {
  render(<Counter />);
  fireEvent.click(screen.getByRole('button', { name: 'Increment' }));
  fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
  expect(screen.getByText('Count: 0')).toBeTruthy();
});`;
const F9_START=`<div id="app">
  <h1>{{ title }}</h1>
</div>

<script>
const { createApp, ref } = Vue;

createApp({
  setup() {
    const title = ref('Frameworks');
    return { title };
  },
}).mount('#app');
</script>`;
const F9_SOL=`<div id="app">
  <h1>{{ title }}</h1>
  <button @click="count++">Clicked {{ count }} times</button>
  <ul>
    <li v-for="fw in frameworks" :key="fw.name">{{ fw.name }}: {{ fw.style }}</li>
  </ul>
  <input v-model="title" aria-label="Title">
</div>

<script>
const { createApp, ref } = Vue;

createApp({
  setup() {
    const title = ref('Frameworks');
    const count = ref(0);
    const frameworks = [
      { name: 'React', style: 'JSX + hooks' },
      { name: 'Vue', style: 'templates + reactivity' },
      { name: 'Svelte', style: 'compiled, no virtual DOM' },
    ];
    return { title, count, frameworks };
  },
}).mount('#app');
</script>`;

defineTrack({id:'frontend',name:'Frontend libraries',weeks:'4–5 weeks',
lessons:[
{id:'f1',lvl:'Foundations',title:'HTML, CSS & responsive layout',kind:'code',lang:'web',starter:F1_START,
 sum:'Use semantic elements (header, nav, main, section, article, footer) so browsers, screen readers and search engines understand the page. Flexbox lays things out in one direction (a row of links); CSS Grid lays out two dimensions (a grid of cards). Media queries change the layout for small screens; design mobile-first.',
 keys:['<header> <nav> <main> <footer>','display: flex; gap','display: grid; grid-template-columns: repeat(3, 1fr)','@media (max-width: 600px)'],
 concept:`<p>Every frontend library ends up producing HTML and CSS, so these fundamentals matter more than any framework.</p>
<h4>Semantic HTML</h4><p>Use elements that describe meaning: <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;footer&gt;</code>. Screen readers use them to navigate, and search engines use them to understand your page. A page made only of <code>&lt;div&gt;</code>s has no structure for them to use.</p>
<div class="tbl-wrap"><table><tr><th>Layout tool</th><th>Best for</th><th>Key CSS</th></tr>
<tr><td><b>Flexbox</b></td><td>One direction: a row of nav links, a toolbar</td><td><code>display:flex; gap:16px; align-items:center</code></td></tr>
<tr><td><b>Grid</b></td><td>Two dimensions: card grids, page layouts</td><td><code>display:grid; grid-template-columns:repeat(3,1fr)</code></td></tr></table></div>
<h4>Responsive design</h4><p>A <b>media query</b> applies CSS only under some condition, like a narrow screen: <code>@media (max-width: 600px) { .cards { grid-template-columns: 1fr } }</code>.</p>
<div class="tip"><b>Task</b>The starter page is all divs. Turn it into semantic HTML, then lay it out with flexbox and grid. The checker also tests the page at phone width.</div>`,
 tasks:[
  {t:'Use semantic elements: header, nav, main and footer.',sol:F1_SOL,showSol:false,hint:'Replace .top with <header>, .menu with <nav> (links in a <ul>), .content with <main>, .bottom with <footer>.',c:ctx=>!!(ctx.$('header')&&ctx.$('nav')&&ctx.$('main')&&ctx.$('footer'))},
  {t:'Lay out the nav links in a row with flexbox and a gap.',hint:'nav ul { display: flex; gap: 16px; list-style: none; }',c:ctx=>{const el=ctx.$('nav ul')||ctx.$('nav');return el&&ctx.css(el,'display')==='flex'&&ctx.$$('nav a').length>=3}},
  {t:'Show the cards in a 3-column grid on wide screens.',hint:'.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }',c:async ctx=>atWidth(ctx,900,()=>{const g=ctx.$('.cards');return g&&ctx.css(g,'display')==='grid'&&cols(ctx,g)===3})},
  {t:'Stack the cards in one column on screens 600px wide or less.',hint:'@media (max-width: 600px) { .cards { grid-template-columns: 1fr; } }',c:async ctx=>{const g=ctx.$('.cards');if(!g||ctx.css(g,'display')!=='grid')return false;return atWidth(ctx,420,()=>cols(ctx,ctx.$('.cards'))===1)}},
  {t:'Why prefer <nav> and <main> over plain <div>s?',o:['They render faster','They give the page meaning that assistive technology and search engines use','Divs are deprecated','They add default styling'],a:1,e:'Screen-reader users can jump straight to the navigation or main content. Search engines also read the structure.'},
 ]},
{id:'f2',lvl:'Foundations',title:'JavaScript in the browser: DOM, events & fetch',kind:'code',lang:'web',starter:F2_START,inject:FETCH_MOCK,
 sum:'The DOM is the live tree of elements your JavaScript can read and change. querySelector finds elements, createElement and append build new ones, addEventListener reacts to clicks and keys, and textContent sets text safely. fetch() returns a Promise; await it, then await res.json() to get data.',
 keys:['document.querySelector','createElement / append','addEventListener("click")','element.textContent','await fetch(url)','await res.json()'],
 concept:`<p>Frameworks like React do this work for you, but you should know what they do underneath: find elements, react to events, change the page, load data.</p>
<pre class="snip" style="margin-bottom:12px">const button = document.querySelector('#add');   // find
button.addEventListener('click', () => {          // react
  const li = document.createElement('li');        // build
  li.textContent = 'New item';                    // set text (safe)
  document.querySelector('#list').append(li);     // add to page
});

const res = await fetch('/api/users');            // load data
const users = await res.json();</pre>
<div class="tip"><b>textContent vs innerHTML</b><code>textContent</code> treats input as plain text. <code>innerHTML</code> parses HTML, which lets attackers inject scripts if the text came from a user. You'll exploit exactly that in the Security track.</div>
<p>This preview has a fake API at <code>/api/users</code>.</p>`,
 tasks:[
  {t:'Clicking Add puts the typed text in a new list item.',sol:F2_SOL,showSol:false,hint:'Listen for "click" on #add, create an <li>, set its textContent to input.value, append it to #list.',c:async ctx=>{await ctx.type('#task','Buy milk');await ctx.click('#add');return ctx.$$('#list li').some(li=>li.textContent.includes('Buy milk'))}},
  {t:'Ignore empty input, and clear the box after adding.',hint:'const text = input.value.trim(); if (!text) return; ... input.value = "";',c:async ctx=>{await ctx.type('#task','Task A');await ctx.click('#add');const n=ctx.$$('#list li').length;const cleared=ctx.$('#task').value==='';await ctx.type('#task','   ');await ctx.click('#add');return n>0&&cleared&&ctx.$$('#list li').length===n}},
  {t:'Each item gets a Delete button that removes it.',hint:'const del = document.createElement("button"); del.addEventListener("click", () => li.remove());',c:async ctx=>{await ctx.type('#task','Temp item');await ctx.click('#add');const li=ctx.$$('#list li').find(x=>x.textContent.includes('Temp item'));const b=li&&li.querySelector('button');if(!b)return false;b.click();await sleep(60);return !ctx.$$('#list li').some(x=>x.textContent.includes('Temp item'))}},
  {t:'Load /api/users with fetch and list the names in #users.',hint:'const res = await fetch("/api/users"); const users = await res.json(); then add an <li> per user.',c:async ctx=>waitFor(()=>ctx.$$('#users li').length===3&&/Grace Hopper/.test(ctx.$('#users').textContent),1500)},
 ]},
{id:'f3',lvl:'React',title:'React in depth: components, props, state & effects',kind:'code',lang:'react',starter:F3_START,
 sum:'A React component is a function that returns JSX. Props pass data down from a parent; state (useState) is data a component owns, and calling the setter re-renders it. Render lists with array.map and give each item a stable key. useEffect runs side effects after render, re-running when its dependency array changes.',
 keys:['function Component({ prop })','const [x, setX] = useState(0)','onClick={() => setX(x + 1)}','items.map(i => <li key={i.id}>)','useEffect(() => {...}, [deps])'],
 concept:`<p>React apps are trees of <b>components</b>: functions that take <b>props</b> and return <b>JSX</b>, which looks like HTML inside JavaScript.</p>
<div class="tbl-wrap"><table><tr><th>Concept</th><th>What it is</th><th>Example</th></tr>
<tr><td><b>Props</b></td><td>Inputs from the parent (read-only)</td><td><code>&lt;TodoList items={todos} /&gt;</code></td></tr>
<tr><td><b>State</b></td><td>Data the component owns; changing it re-renders</td><td><code>const [count, setCount] = useState(0)</code></td></tr>
<tr><td><b>Lists</b></td><td>Render arrays with <code>map</code> and a unique <code>key</code></td><td><code>items.map(i =&gt; &lt;li key={i.id}&gt;…)</code></td></tr>
<tr><td><b>Effects</b></td><td>Side effects after render (title, timers, subscriptions)</td><td><code>useEffect(() =&gt; {…}, [count])</code></td></tr></table></div>
<div class="tip"><b>Mental model</b>UI = f(state). You never edit the DOM yourself; you change state, and React re-renders the parts that changed.</div>`,
 tasks:[
  {t:'Make the Counter button count clicks with useState.',sol:F3_SOL,showSol:false,hint:'const [count, setCount] = useState(0); <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>',c:async ctx=>{const b=btnText(ctx,/Clicked/);if(!b)return false;b.click();await sleep(80);return /Clicked 1 times/.test(b.textContent)}},
  {t:'Update document.title with the count using useEffect.',hint:'useEffect(() => { document.title = "Clicked " + count + " times"; }, [count]);',c:async ctx=>{const b=btnText(ctx,/Clicked/);if(!b)return false;b.click();await sleep(80);return /Clicked \d+ times/.test(ctx.doc.title)&&/useEffect\(/.test(ctx.code)}},
  {t:'Create a TodoList component that renders an items prop with map and keys.',hint:'function TodoList({ items }) { return <ul>{items.map(i => <li key={i.id}>{i.text}</li>)}</ul>; }',c:ctx=>ctx.$$('li').length>=3&&/\.map\(/.test(ctx.code)&&/key=\{/.test(ctx.code)&&/<TodoList\s+items=/.test(ctx.code)},
  {t:'What makes a React component re-render?',o:['Editing the DOM directly','A change to its state or props (or its parent re-rendering)','Calling console.log','Changing a regular variable'],a:1,e:'React re-renders on state and prop changes. Changing a normal let variable does nothing visible, because React doesn\'t know about it.'},
  {t:'Why does each list item need a key?',o:['For CSS styling','So React can track which item is which between renders and update efficiently','Keys make items clickable','It is only for TypeScript'],a:1,e:'Without stable keys, React may reuse the wrong DOM nodes when items are added, removed or reordered.'},
 ]},
{id:'f4',lvl:'Styling',title:'Styling: Tailwind CSS & shadcn/ui patterns',kind:'code',lang:'react',libs:['tailwind'],starter:F4_START,
 sum:'Tailwind CSS styles with small utility classes (p-4, rounded-lg, grid, md:grid-cols-3) right in your markup; md: prefixes apply from the medium breakpoint up. shadcn/ui is a collection of accessible components you copy into your codebase and own, built on Radix UI and Tailwind, typically with variant props for different looks.',
 keys:['className="p-4 rounded-lg"','grid grid-cols-1 md:grid-cols-3','variant props','shadcn/ui = copy-in components'],
 concept:`<p><b>Tailwind CSS</b> gives you thousands of tiny utility classes. Instead of writing CSS files, you compose styles in your markup:</p>
<pre class="snip" style="margin-bottom:12px">&lt;div className="rounded-lg border p-4 shadow-sm"&gt;…&lt;/div&gt;
&lt;div className="grid grid-cols-1 md:grid-cols-3 gap-4"&gt;…&lt;/div&gt;</pre>
<ul><li><code>p-4</code> = padding 1rem (16px). The spacing scale goes in steps of 4px.</li><li><code>md:grid-cols-3</code> = 3 columns from the <b>md</b> breakpoint (768px) upward. Tailwind is mobile-first.</li></ul>
<h4>shadcn/ui</h4><p>shadcn/ui is not a package you install as a dependency. It's a set of well-built, accessible components (Button, Dialog, Form…) that you <b>copy into your project</b> and then own and customize. They're built on Radix UI primitives and Tailwind, with <b>variant props</b> like <code>&lt;Button variant="outline"&gt;</code>.</p>
<div class="tip"><b>Task</b>Build a small variant-based Button the way shadcn's does, and a responsive card grid.</div>`,
 tasks:[
  {t:'Give the cards rounded corners, a border and p-4 padding with Tailwind classes.',sol:F4_SOL,showSol:false,hint:'<div className="rounded-lg border p-4">Shop</div>',c:async ctx=>{await sleep(300);return ctx.$$('[class]').some(el=>/\bp-4\b/.test(el.className)&&ctx.css(el,'paddingTop')==='16px')}},
  {t:'Make the cards a grid: 1 column on phones, 3 from the md breakpoint.',hint:'<div className="grid grid-cols-1 md:grid-cols-3 gap-4">',c:async ctx=>{const g=ctx.$$('[class]').find(el=>/md:grid-cols-3/.test(el.className));if(!g)return false;const wide=await atWidth(ctx,900,()=>cols(ctx,g)===3);const narrow=await atWidth(ctx,420,()=>cols(ctx,g)===1);return wide&&narrow}},
  {t:'Give Button a variant prop with two looks (primary and outline), and render both.',hint:'const variants = { primary: "bg-violet-600 text-white", outline: "border bg-white" }; <Button variant="outline">',c:async ctx=>{await sleep(200);const bs=ctx.$$('button');return /variant/.test(ctx.code)&&bs.length>=2&&ctx.css(bs[0],'backgroundColor')!==ctx.css(bs[1],'backgroundColor')}},
  {t:'What is shadcn/ui?',o:['A CSS framework like Bootstrap','A set of accessible components you copy into your codebase and own, built on Radix and Tailwind','A state management library','A React replacement'],a:1,e:'Because the code lives in your project, you can change anything. There\'s no library to fight with.'},
 ]},
{id:'f5',lvl:'State & data',title:'State & data: Zustand, Redux Toolkit & TanStack Query',kind:'code',lang:'react',libs:['zustand','query'],inject:FETCH_MOCK,starter:`import { create } from 'zustand';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

// TODO 1: a Zustand store with items: 0 and an add() action
// TODO 2: <CartBadge> shows the count, <AddButton> increases it
// TODO 3: <Products> loads /api/products with useQuery

export default function App() {
  return <p>Start here</p>;
}`,
 sum:'Keep state as local as possible. When several distant components share client state (a cart, a theme), use a small store like Zustand, or Redux Toolkit for large apps with strict patterns. Data that lives on a server is different: TanStack Query fetches, caches, deduplicates and refreshes it, and gives you isLoading and error states.',
 keys:['create((set) => ({...}))','useStore((s) => s.value)','useQuery({ queryKey, queryFn })','isLoading / error','client state vs server state'],
 concept:`<p>Two very different kinds of state:</p>
<div class="tbl-wrap"><table><tr><th></th><th>Client state</th><th>Server state</th></tr>
<tr><td>Examples</td><td>Cart count, open modal, theme</td><td>Products, users, orders from an API</td></tr>
<tr><td>Owned by</td><td>The browser</td><td>The server (you hold a cached copy)</td></tr>
<tr><td>Tools</td><td><code>useState</code> → Zustand / Redux Toolkit</td><td>TanStack Query (or SWR)</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">const useCart = create((set) => ({
  items: 0,
  add: () => set((s) => ({ items: s.items + 1 })),
}));
const items = useCart((s) => s.items);   // any component, no prop drilling

const { data, isLoading } = useQuery({
  queryKey: ['products'],
  queryFn: () => fetch('/api/products').then(r => r.json()),
});</pre>
<p><b>Redux Toolkit</b> does the same job as Zustand with more structure (slices, actions, devtools). It's common in large company codebases, so learn to read it, but reach for the simplest tool first.</p>`,
 tasks:[
  {t:'Create a Zustand cart store shared by a CartBadge and an AddButton.',sol:F5_SOL,showSol:false,hint:'const useCart = create((set) => ({ items: 0, add: () => set((s) => ({ items: s.items + 1 })) }));',c:async ctx=>{const b=btnText(ctx,/add to cart/i);const badge=ctx.$('#badge');if(!b||!badge)return false;b.click();await sleep(100);return /1/.test(ctx.$('#badge').textContent)&&/from ['"]zustand['"]/.test(ctx.code)}},
  {t:'Load /api/products with useQuery and list them, with a loading state.',hint:'const { data, isLoading } = useQuery({ queryKey: ["products"], queryFn: () => fetch("/api/products").then(r => r.json()) });',c:async ctx=>/useQuery\(/.test(ctx.code)&&await waitFor(()=>ctx.$$('li').length===3&&/Keyboard/.test(ctx.text()),2000)},
  {t:'A list of products from your API is…',o:['Client state, so put it in Zustand','Server state, so let TanStack Query cache and refresh it','Neither; use a global variable','Props only'],a:1,e:'Server state can go stale, needs loading and error handling, and should be cached. That\'s exactly what TanStack Query handles.'},
  {t:'When would you choose Redux Toolkit over Zustand?',o:['Always','A large team that wants strict, predictable patterns and devtools for complex shared state','For fetching data','For styling'],a:1,e:'Both work. Redux Toolkit adds structure that helps large teams; Zustand is lighter for most apps.'},
 ]},
{id:'f6',lvl:'State & data',title:'Forms & validation: React Hook Form + Zod',kind:'code',lang:'react',libs:['rhf','zod'],starter:`import { useForm } from 'react-hook-form';
import { z } from 'zod';

// TODO: a sign-up form with email + password, validated by a Zod schema

export default function App() {
  return <form><button>Sign up</button></form>;
}`,
 sum:'React Hook Form manages form state with uncommitted inputs (register), so typing doesn\'t re-render the whole form. Zod describes the expected shape once (z.object({ email: z.string().email() })) and validates it; a resolver connects the two so errors appear per field. Always validate again on the server: client-side validation is for user experience, not security.',
 keys:['useForm({ resolver })','register("email")','handleSubmit(onValid)','formState.errors','z.object / z.string().email().min()','validate on the server too'],
 concept:`<p>Forms are where most bugs and bad UX hide. The modern pair:</p>
<ul><li><b>React Hook Form</b> tracks inputs with <code>register('name')</code>, collects values, and runs validation on submit.</li><li><b>Zod</b> defines a schema once and validates data against it. The same schema can validate on the server.</li></ul>
<pre class="snip" style="margin-bottom:12px">const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Use at least 8 characters'),
});
const { register, handleSubmit, formState: { errors } } =
  useForm({ resolver: zodResolver(schema) });</pre>
<p>Normally you import <code>zodResolver</code> from <code>@hookform/resolvers/zod</code>. In this sandbox you'll write the few lines it contains yourself, which shows how resolvers work.</p>
<div class="tip"><b>Accessibility</b>Wrap inputs in <code>&lt;label&gt;</code> and give error messages <code>role="alert"</code> so screen readers announce them.</div>`,
 tasks:[
  {t:'Show "Enter a valid email" when the email is invalid.',sol:F6_SOL,showSol:false,hint:'email: z.string().email("Enter a valid email") and {errors.email && <p role="alert">{errors.email.message}</p>}',c:async ctx=>{const ins=ctx.$$('input');if(ins.length<2)return false;await ctx.type(ins[0],'not-an-email');await ctx.type(ins[1],'short');const b=ctx.$('button');b.click();return waitFor(()=>/valid email/i.test(ctx.text()),1500)}},
  {t:'Show "Use at least 8 characters" for a short password.',hint:'password: z.string().min(8, "Use at least 8 characters")',c:async ctx=>{const ins=ctx.$$('input');if(ins.length<2)return false;await ctx.type(ins[0],'ada@example.com');await ctx.type(ins[1],'short');ctx.$('button').click();return waitFor(()=>/at least 8/i.test(ctx.text()),1500)}},
  {t:'A valid form shows "Welcome, <email>!".',hint:'handleSubmit((data) => setWelcome(data.email))',c:async ctx=>{const ins=ctx.$$('input');if(ins.length<2)return false;await ctx.type(ins[0],'grace@example.com');await ctx.type(ins[1],'longenough123');ctx.$('button').click();return waitFor(()=>/Welcome, grace@example\.com/.test(ctx.text()),1500)}},
  {t:'Your form validates in the browser. Do you still validate on the server?',o:['No, the browser already checked','Yes, because anyone can bypass the browser and call your API directly','Only for passwords','Only in production'],a:1,e:'Client-side validation is for user experience. The server must never trust incoming data. Reuse the same Zod schema there.'},
 ]},
{id:'f7',lvl:'Polish',title:'Animation & charts: Framer Motion & Recharts',kind:'code',lang:'react',libs:['motion','recharts'],starter:`import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', visitors: 120 },
  { month: 'Feb', visitors: 210 },
];

export default function App() {
  return <h1>Analytics</h1>;
}`,
 sum:'Framer Motion animates React elements declaratively: swap a tag for motion.div and give it initial, animate and transition props. Recharts builds charts from components (BarChart, Bar, XAxis, Tooltip) and a data array. Keep animation short and purposeful, and respect users who prefer reduced motion.',
 keys:['<motion.h1 initial animate transition>','<BarChart data>','<Bar dataKey>','<XAxis dataKey>','prefers-reduced-motion'],
 concept:`<p><b>Framer Motion</b> (now also published as <code>motion</code>) makes animation declarative: describe the start and end states and it animates between them.</p>
<pre class="snip" style="margin-bottom:12px">&lt;motion.h1 initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}&gt;Analytics&lt;/motion.h1&gt;</pre>
<p><b>Recharts</b> composes charts from React components fed by a data array:</p>
<pre class="snip" style="margin-bottom:12px">&lt;BarChart width={420} height={220} data={data}&gt;
  &lt;XAxis dataKey="month" /&gt; &lt;YAxis /&gt; &lt;Tooltip /&gt;
  &lt;Bar dataKey="visitors" /&gt;
&lt;/BarChart&gt;</pre>
<div class="tip"><b>Motion with care</b>Some people get dizzy from motion. Framer Motion's <code>useReducedMotion()</code> and the CSS <code>prefers-reduced-motion</code> media query let you tone it down.</div>`,
 tasks:[
  {t:'Fade and slide the heading in with motion.h1.',sol:F7_SOL(false),showSol:false,hint:'<motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>Analytics</motion.h1>',c:async ctx=>/motion\.(h1|div)/.test(ctx.code)&&/initial=/.test(ctx.code)&&/animate=/.test(ctx.code)&&await waitFor(()=>{const h=ctx.$('h1');return h&&(+ctx.css(h,'opacity')>0.95||/opacity/.test(h.getAttribute('style')||''))},2500)},
  {t:'Add Mar (180 visitors) and Apr (320 visitors) to the data, then render it as a Recharts bar chart (4 bars).',hint:'<BarChart width={420} height={220} data={data}><XAxis dataKey="month" /><YAxis /><Bar dataKey="visitors" /></BarChart>',c:async ctx=>waitFor(()=>ctx.$$('.recharts-bar-rectangle').length===4,2500)},
  {t:'Add May (410 visitors) to the data and see the chart update to 5 bars.',sol:F7_SOL(true),showSol:false,hint:"{ month: 'May', visitors: 410 }",c:async ctx=>waitFor(()=>ctx.$$('.recharts-bar-rectangle').length===5,2500)},
  {t:'A user has "reduce motion" turned on in their OS. You should…',o:['Ignore it','Tone down or skip non-essential animation','Make animations slower','Show a warning'],a:1,e:'Respecting prefers-reduced-motion is an accessibility requirement, not decoration.'},
 ]},
{id:'f8',lvl:'Quality',title:'Testing UI with React Testing Library',kind:'code',lang:'react',rtl:true,starter:F8_START,
 sum:'React Testing Library tests components the way users use them: render the component, find elements by role, label or text (screen.getByRole("button", { name: "Save" })), fire events, and assert on what appears. Avoid testing implementation details like state variable names. Queries by role double as an accessibility check.',
 keys:['render(<Component />)','screen.getByRole("button", { name })','screen.getByText','fireEvent.click','expect(...)'],
 concept:`<p>React Testing Library's guiding rule: <i>the more your tests resemble the way your software is used, the more confidence they give you.</i></p>
<pre class="snip" style="margin-bottom:12px">test('increments when clicked', () => {
  render(&lt;Counter /&gt;);
  fireEvent.click(screen.getByRole('button', { name: 'Increment' }));
  expect(screen.getByRole('heading').textContent).toBe('Count: 1');
});</pre>
<div class="tbl-wrap"><table><tr><th>Query</th><th>Use when</th></tr><tr><td><code>getByRole</code></td><td>First choice: buttons, headings, links, textboxes</td></tr><tr><td><code>getByLabelText</code></td><td>Form fields</td></tr><tr><td><code>getByText</code></td><td>Plain text content</td></tr><tr><td><code>getByTestId</code></td><td>Last resort</td></tr></table></div>
<p>In real projects you'd also add <code>@testing-library/jest-dom</code> for matchers like <code>toBeInTheDocument()</code>. Here, use <code>toBe</code>, <code>toBeTruthy</code> and friends.</p>`,
 tasks:[
  {t:'Write a test that clicks Increment twice and expects "Count: 2".',sol:F8_SOL,showSol:false,hint:"fireEvent.click(screen.getByRole('button', { name: 'Increment' })); twice, then expect the heading text to be 'Count: 2'",c:ctx=>ctx.tests&&ctx.tests.some(t=>t.ok&&/increment/i.test(t.name))&&/fireEvent\.click/.test(ctx.code)},
  {t:'Write a test for Reset.',hint:"Click Increment, then Reset, then expect 'Count: 0'.",c:ctx=>ctx.tests&&ctx.tests.some(t=>t.ok&&/reset/i.test(t.name))},
  {t:'All tests pass, with at least three of them.',c:ctx=>ctx.tests&&ctx.tests.length>=3&&ctx.tests.every(t=>t.ok)},
  {t:'Why query by role instead of by CSS class?',o:['Roles are faster','It tests what users and assistive tech actually see, and survives refactors of class names','Classes don\'t work in tests','It\'s required by React'],a:1,e:'If getByRole can\'t find your button, a screen-reader user probably can\'t either.'},
 ]},
{id:'f9',lvl:'Beyond React',title:'Vue & Svelte: comparing frameworks',kind:'code',lang:'vue',libs:['vue'],starter:F9_START,
 sum:'Vue uses HTML templates with directives (v-for, v-if, v-model, @click) and fine-grained reactivity (ref) instead of JSX and re-rendering. Svelte is a compiler: components become plain JavaScript that updates the DOM directly, with no virtual DOM shipped. Pick frameworks by team, ecosystem and hiring market, not hype: concepts like components, props and state carry over.',
 keys:['{{ value }}','@click','v-for','v-model','ref()','Svelte compiles away'],
 concept:`<p>Once you know React well, other frameworks are new syntax over the same ideas: components, props, state, events.</p>
<div class="tbl-wrap"><table><tr><th></th><th>React</th><th>Vue</th><th>Svelte</th></tr>
<tr><td>Templates</td><td>JSX in JavaScript</td><td>HTML templates + directives</td><td>HTML-like .svelte files</td></tr>
<tr><td>State</td><td><code>useState</code>, re-render</td><td><code>ref()</code>, fine-grained reactivity</td><td><code>let</code> variables / runes, compiled</td></tr>
<tr><td>Runtime</td><td>Virtual DOM</td><td>Virtual DOM + reactivity</td><td>Compiler, no virtual DOM</td></tr>
<tr><td>Full-stack</td><td>Next.js</td><td>Nuxt</td><td>SvelteKit</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">&lt;button @click="count++"&gt;Clicked {{ count }} times&lt;/button&gt;
&lt;li v-for="fw in frameworks" :key="fw.name"&gt;{{ fw.name }}&lt;/li&gt;
&lt;input v-model="title"&gt;</pre>`,
 tasks:[
  {t:'Add a counter button with @click.',sol:F9_SOL,showSol:false,hint:'<button @click="count++">Clicked {{ count }} times</button> and const count = ref(0)',c:async ctx=>{const b=btnText(ctx,/Clicked/);if(!b)return false;b.click();await sleep(80);return /Clicked 1 times/.test(b.textContent)}},
  {t:'Render a list of three frameworks with v-for.',hint:'<li v-for="fw in frameworks" :key="fw.name">{{ fw.name }}</li>',c:ctx=>ctx.$$('li').length===3&&/v-for/.test(ctx.code)},
  {t:'Bind an input to the title with v-model.',hint:'<input v-model="title">',c:async ctx=>{const i=ctx.$('input');if(!i)return false;await ctx.type(i,'My stack');return /My stack/.test(ctx.$('h1').textContent)}},
  {t:'What makes Svelte different?',o:['It only works on the server','It\'s a compiler: components become plain JavaScript that updates the DOM directly, with no virtual DOM','It uses Java','It has no components'],a:1,e:'Svelte does its work at build time, so less framework code ships to the browser.'},
  {t:'How should you pick a framework for a job or project?',o:['Whichever is newest','By team experience, ecosystem, hiring market and project needs','Always Svelte','By GitHub stars'],a:1,e:'React dominates job listings; Vue is big in some regions and companies. The fundamentals transfer.'},
 ]},
],
quizzes:{frontend:[
 {q:'Which layout tool fits a 2-dimensional card grid best?',o:['Flexbox','CSS Grid','Floats','Tables'],a:1,e:'Grid handles rows and columns together; flexbox is one-dimensional.'},
 {q:'Why use textContent instead of innerHTML for user input?',o:['It\'s faster','innerHTML parses HTML, which allows script injection (XSS)','innerHTML is deprecated','textContent supports emojis'],a:1,e:'Never put untrusted strings into innerHTML.'},
 {q:'In React, what happens when you call a state setter?',o:['Nothing until reload','React schedules a re-render of that component with the new state','The DOM updates directly','The page reloads'],a:1,e:'State changes trigger re-renders; React updates only what changed.'},
 {q:'useEffect(fn, []) runs…',o:['On every render','Once, after the first render','Never','Before the first render'],a:1,e:'An empty dependency array means "run once after mount" (and clean up on unmount).'},
 {q:'Data from your API (like a product list) is best managed with…',o:['Zustand','TanStack Query','localStorage','A global variable'],a:1,e:'That\'s server state: caching, loading and refetching are the hard parts, and TanStack Query handles them.'},
 {q:'In React Testing Library, the preferred query is usually…',o:['getByTestId','getByRole','querySelector','getByClassName'],a:1,e:'Roles reflect how users and assistive technology find elements.'},
]},
real:[
 {id:'fe-r1',t:'Build a responsive landing page from scratch',p:'No framework: semantic HTML, flexbox and grid, a mobile layout, and a Lighthouse accessibility score above 90.',s:'# open DevTools → Lighthouse → Analyze page load'},
 {id:'fe-r2',t:'Start a React + Vite + Tailwind project',p:'Scaffold a real project and build a small app with at least five components.',s:'npm create vite@latest my-app -- --template react-ts\ncd my-app && npm install\nnpm install -D tailwindcss @tailwindcss/vite\nnpm run dev'},
 {id:'fe-r3',t:'Add shadcn/ui and a validated form',p:'Install shadcn/ui, add the Button, Input and Form components, and build a sign-up form with React Hook Form + Zod.',s:'npx shadcn@latest init\nnpx shadcn@latest add button input form'},
 {id:'fe-r4',t:'Write component tests with Vitest + Testing Library',p:'Add tests for two components and run them in watch mode.',s:'npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom\nnpx vitest'},
]});
})();
