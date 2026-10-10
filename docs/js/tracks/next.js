/* Track 5: Next.js + TypeScript */
(()=>{
const waitFor=async(fn,ms)=>{const t0=Date.now();while(Date.now()-t0<(ms||1500)){try{if(await fn())return true}catch(e){}await sleep(60)}return false};
const LAYOUT=`export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;
const N1_START=`interface Item {
  name: string;
  price: number;
  qty: number;
}

// 1. This array has a type error. Fix it.
const cart: Item[] = [
  { name: 'Keyboard', price: 49, qty: 1 },
  { name: 'Mouse', price: '19', qty: 2 },
];

// 2. Type this function and return the cart total (price × qty, summed)
function total(items) {
  return 0;
}

// 3. Write a generic function: first<T>(list: T[]): T | undefined

// 4. Narrow the union: return "Value: 5" or "Error: boom"
type Result = { ok: true; value: number } | { ok: false; error: string };

function describe(r: Result): string {
  return '';
}

console.log(total(cart));
`;
const N1_SOL=`interface Item {
  name: string;
  price: number;
  qty: number;
}

const cart: Item[] = [
  { name: 'Keyboard', price: 49, qty: 1 },
  { name: 'Mouse', price: 19, qty: 2 },
];

function total(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function first<T>(list: T[]): T | undefined {
  return list[0];
}

type Result = { ok: true; value: number } | { ok: false; error: string };

function describe(r: Result): string {
  if (r.ok) {
    return 'Value: ' + r.value;
  }
  return 'Error: ' + r.error;
}

console.log(total(cart));
console.log(first(['a', 'b']));
console.log(describe({ ok: false, error: 'boom' }));
`;
const N2_START=`import { useState } from 'react';

// TODO: type the props with an interface
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

export default function App() {
  const [clicks, setClicks] = useState(0);
  return (
    <main>
      <h1>Clicks: {clicks}</h1>
      <Button label="Add one" onClick={() => setClicks(clicks + 1)} />
    </main>
  );
}
`;
const N2_SOL=`import { useState } from 'react';

type Variant = 'primary' | 'ghost';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: Variant;
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  const look = variant === 'primary'
    ? { background: '#6A58CF', color: 'white' }
    : { background: 'transparent', color: '#6A58CF' };
  return (
    <button style={{ ...look, border: '1px solid #6A58CF', borderRadius: 6, padding: '6px 12px' }} onClick={onClick}>
      {label}
    </button>
  );
}

interface ListProps<T> {
  items: T[];
  render: (item: T) => React.ReactNode;
}

function List<T>({ items, render }: ListProps<T>) {
  return <ul>{items.map((item, i) => <li key={i}>{render(item)}</li>)}</ul>;
}

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Grace' },
];

export default function App() {
  const [clicks, setClicks] = useState<number>(0);
  return (
    <main>
      <h1>Clicks: {clicks}</h1>
      <Button label="Add one" onClick={() => setClicks(clicks + 1)} />
      <Button label="Reset" variant="ghost" onClick={() => setClicks(0)} />
      <List items={users} render={(u) => <b>{u.name}</b>} />
    </main>
  );
}
`;
const N3_FILES={'app/layout.tsx':LAYOUT,'app/page.tsx':`export default function Home() {
  return <h1>Home</h1>;
}
`};
const N3_SOL={'app/layout.tsx':`import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog/hello-world">Blog</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
`,'app/about/page.tsx':`export default function About() {
  return <h1>About me</h1>;
}
`,'app/blog/[slug]/page.tsx':`export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <article>
      <h1>Post: {params.slug}</h1>
    </article>
  );
}
`,'app/not-found.tsx':`export default function NotFound() {
  return <h1>Page not found</h1>;
}
`};
const N4_FILES={'app/layout.tsx':LAYOUT,'lib/data.ts':`export interface Project {
  id: number;
  name: string;
}

// Pretend this queries a database. It runs on the server.
export async function getProjects(): Promise<Project[]> {
  await new Promise((r) => setTimeout(r, 50));
  return [
    { id: 1, name: 'Online shop' },
    { id: 2, name: 'Chat app' },
    { id: 3, name: 'Portfolio' },
  ];
}
`,'app/page.tsx':`import { useState } from 'react';

export default function Home() {
  const [likes, setLikes] = useState(0);
  return (
    <main>
      <h1>My projects</h1>
      <button onClick={() => setLikes(likes + 1)}>♥ {likes}</button>
    </main>
  );
}
`};
const N4_SOL={'components/LikeButton.tsx':`'use client';

import { useState } from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>♥ {likes}</button>;
}
`,'app/page.tsx':`import LikeButton from '@/components/LikeButton';
import { getProjects } from '@/lib/data';

export default async function Home() {
  const projects = await getProjects();
  return (
    <main>
      <h1>My projects</h1>
      <ul>
        {projects.map((p) => <li key={p.id}>{p.name}</li>)}
      </ul>
      <LikeButton />
    </main>
  );
}
`};
const N5_FILES={'app/layout.tsx':LAYOUT,'lib/store.ts':`export interface Message {
  id: number;
  text: string;
}

// An in-memory "database" for this lesson
export const messages: Message[] = [{ id: 1, text: 'First!' }];

export function addMessage(text: string): Message {
  const msg = { id: messages.length + 1, text };
  messages.push(msg);
  return msg;
}
`,'app/page.tsx':`import { messages } from '@/lib/store';

export default function Guestbook() {
  return (
    <main>
      <h1>Guestbook</h1>
      {/* TODO: a form whose action is a server action */}
      <ul>
        {messages.map((m) => <li key={m.id}>{m.text}</li>)}
      </ul>
    </main>
  );
}
`};
const N5_SOL={'app/page.tsx':`import { revalidatePath } from 'next/cache';
import { messages, addMessage } from '@/lib/store';

async function postMessage(formData: FormData) {
  'use server';
  const text = String(formData.get('text') || '').trim();
  if (!text) return;
  addMessage(text);
  revalidatePath('/');
}

export default function Guestbook() {
  return (
    <main>
      <h1>Guestbook</h1>
      <form action={postMessage}>
        <input name="text" placeholder="Say hi" />
        <button type="submit">Post</button>
      </form>
      <ul>
        {messages.map((m) => <li key={m.id}>{m.text}</li>)}
      </ul>
    </main>
  );
}
`,'app/api/messages/route.ts':`import { NextResponse } from 'next/server';
import { messages, addMessage } from '@/lib/store';

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.text) {
    return NextResponse.json({ error: 'text is required' }, { status: 400 });
  }
  const msg = addMessage(body.text);
  return NextResponse.json(msg, { status: 201 });
}
`};
const SCHEMA=(extra)=>`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String${extra?'\n  published Boolean  @default(false)':''}
  createdAt DateTime @default(now())
}
`;
const N6_FILES={'app/layout.tsx':LAYOUT,'prisma/schema.prisma':SCHEMA(false),'lib/prisma.ts':`import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
`,'app/page.tsx':`export default async function Home() {
  // TODO: load posts with prisma.post.findMany()
  return <h1>Blog</h1>;
}
`};
const N6_PAGE=(filter)=>`import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

async function createPost(formData: FormData) {
  'use server';
  const title = String(formData.get('title') || '').trim();
  if (!title) return;
  await prisma.post.create({ data: { title } });
  revalidatePath('/');
}

export default async function Home() {
  const posts = await prisma.post.findMany({${filter?'\n    where: { published: true },':''}
    orderBy: { id: 'desc' },
  });
  return (
    <main>
      <h1>Blog</h1>
      <form action={createPost}>
        <input name="title" placeholder="Post title" />
        <button type="submit">Create</button>
      </form>
      <ul>
        {posts.map((p) => <li key={p.id}>{p.title}</li>)}
      </ul>
    </main>
  );
}
`;
const N7_FILES={'app/layout.tsx':LAYOUT,'lib/auth.ts':`// A demo user store. Real apps store a bcrypt/argon2 hash, never the password.
const users: Record<string, string> = {
  'ada@example.com': hash('correct horse battery staple'),
};

function hash(pw: string): string {
  let h = 0;
  for (const c of pw) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return 'demo$' + h.toString(16);
}

export function checkPassword(email: string, password: string): boolean {
  return users[email] === hash(password);
}
`,'app/page.tsx':`import Link from 'next/link';

export default function Home() {
  return <Link href="/dashboard">Go to dashboard</Link>;
}
`,'app/dashboard/page.tsx':`export default function Dashboard() {
  return <h1>Secret dashboard</h1>;
}
`};
const N7_SOL={'middleware.ts':`import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('session');
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] };
`,'app/login/page.tsx':`import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { checkPassword } from '@/lib/auth';

async function login(formData: FormData) {
  'use server';
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  if (!checkPassword(email, password)) {
    redirect('/login?error=1');
  }
  cookies().set('session', email, { httpOnly: true, secure: true, sameSite: 'lax' });
  redirect('/dashboard');
}

export default function LoginPage({ searchParams }) {
  return (
    <form action={login}>
      <h1>Log in</h1>
      {searchParams.error && <p role="alert">Wrong email or password</p>}
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Log in</button>
    </form>
  );
}
`,'app/dashboard/page.tsx':`import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function logout() {
  'use server';
  cookies().delete('session');
  redirect('/login');
}

export default function Dashboard() {
  const session = cookies().get('session');
  return (
    <main>
      <h1>Welcome, {session?.value}</h1>
      <form action={logout}>
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
`};
const N8_FILES={'lib/price.ts':`export function formatPrice(cents: number): string {
  // TODO: 1250 → "$12.50"
  return '';
}

export function applyDiscount(cents: number, percent: number): number {
  return cents;
}
`,'lib/price.test.ts':`import { formatPrice, applyDiscount } from './price';

describe('formatPrice', () => {
  it('formats whole dollars', () => {
    expect(formatPrice(1200)).toBe('$12.00');
  });
  it('formats cents', () => {
    expect(formatPrice(1250)).toBe('$12.50');
  });
});
`};
const N8_PRICE=(impl)=>`export function formatPrice(cents: number): string {
  return '$' + (cents / 100).toFixed(2);
}

export function applyDiscount(cents: number, percent: number): number {
${impl?"  if (percent < 0 || percent > 100) {\n    throw new Error('percent must be between 0 and 100');\n  }\n  return Math.round(cents * (1 - percent / 100));":'  return cents;'}
}
`;
const N8_TEST=(edge)=>`import { formatPrice, applyDiscount } from './price';

describe('formatPrice', () => {
  it('formats whole dollars', () => {
    expect(formatPrice(1200)).toBe('$12.00');
  });
  it('formats cents', () => {
    expect(formatPrice(1250)).toBe('$12.50');
  });
});

describe('applyDiscount', () => {
  it('takes 25% off', () => {
    expect(applyDiscount(1000, 25)).toBe(750);
  });
  it('rounds to whole cents', () => {
    expect(applyDiscount(999, 10)).toBe(899);
  });${edge?"\n  it('rejects discounts over 100%', () => {\n    expect(() => applyDiscount(1000, 150)).toThrow('between 0 and 100');\n  });":''}
});
`;

defineTrack({id:'next',name:'Next.js + TypeScript stack',weeks:'4–6 weeks',
lessons:[
{id:'n1',lvl:'TypeScript',title:'TypeScript: types, generics & narrowing',kind:'code',lang:'ts',starter:N1_START,
 sum:'TypeScript adds static types to JavaScript and catches mistakes before the code runs. Describe shapes with interface or type, annotate parameters and return types, write generics (function first<T>(list: T[]): T | undefined) to keep type information, and narrow union types by checking a discriminant field (if (r.ok)).',
 keys:['interface Item { ... }','function f(x: Item[]): number','generic <T>','T | undefined','discriminated unions','narrowing with if'],
 concept:`<p><b>TypeScript</b> is JavaScript with types. The compiler checks your code as you write it and catches whole classes of bugs, like passing a string where a number is expected, before anything runs.</p>
<pre class="snip" style="margin-bottom:12px">interface Item { name: string; price: number; qty: number }

function total(items: Item[]): number { … }          // params + return type

function first&lt;T&gt;(list: T[]): T | undefined { … }   // generic: keeps the type

type Result = { ok: true; value: number }
            | { ok: false; error: string };          // a union
if (r.ok) { r.value } else { r.error }              // narrowing</pre>
<p>This editor runs the <b>real TypeScript compiler</b> in strict mode. Type errors appear in the output with line numbers, then the code runs.</p>
<div class="tip"><b>Rule of thumb</b>Type the edges (function parameters, API responses, props) and let TypeScript infer the rest.</div>`,
 tasks:[
  {t:'Fix the type error in the cart (a price is a string).',sol:N1_SOL,showSol:false,hint:"price: 19 (a number, not '19')",x:"typeof cart[1].price === 'number'",c:ctx=>!(ctx.diag||[]).some(d=>/'string' is not assignable to type 'number'/.test(d.msg))},
  {t:'Type total(items: Item[]): number and make it return 87.',hint:'return items.reduce((sum, item) => sum + item.price * item.qty, 0);',x:'total(cart) === 87',c:ctx=>/function\s+total\s*\(\s*items\s*:\s*Item\[\]\s*\)\s*:\s*number/.test(ctx.code)},
  {t:'Write a generic first<T>(list: T[]): T | undefined.',hint:'function first<T>(list: T[]): T | undefined { return list[0]; }',x:"first([3, 4]) === 3 && first([]) === undefined && first(['x']) === 'x'",c:ctx=>/function\s+first\s*<\s*T\s*>/.test(ctx.code)},
  {t:'Make describe() return "Value: 5" for ok results and "Error: boom" for errors.',hint:'if (r.ok) return "Value: " + r.value; return "Error: " + r.error;',x:"describe({ ok: true, value: 5 }) === 'Value: 5' && describe({ ok: false, error: 'boom' }) === 'Error: boom'"},
  {t:'Finish with zero type errors.',c:ctx=>ctx.diag&&ctx.diag.length===0&&!ctx.err},
 ]},
{id:'n2',lvl:'TypeScript',title:'TypeScript with React',kind:'code',lang:'react',starter:N2_START,filename:'App.tsx',
 sum:'In React with TypeScript, describe props with an interface and annotate the component\'s parameter. Unions of string literals ("primary" | "ghost") make variant props self-documenting, generic components (function List<T>) keep item types, and useState<number>() sets the state type when it can\'t be inferred. Types are checked by tsc and your editor, then removed at build time.',
 keys:['interface ButtonProps','({ label }: ButtonProps)','variant?: "primary" | "ghost"','function List<T>(props: ListProps<T>)','useState<number>(0)','React.ReactNode'],
 concept:`<p>Typed components are where TypeScript pays off most: your editor autocompletes props and flags missing or wrong ones immediately.</p>
<pre class="snip" style="margin-bottom:12px">interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'ghost';     // optional + only these two values
}
function Button({ label, onClick, variant = 'primary' }: ButtonProps) { … }

function List&lt;T&gt;({ items, render }: { items: T[]; render: (item: T) =&gt; React.ReactNode }) { … }</pre>
<div class="tip"><b>How this preview works</b>This preview compiles TSX with Babel, which <i>strips</i> types without checking them, just like Next.js's fast dev builds. Type checking comes from <code>tsc</code> and your editor; you used the real checker in the previous lesson.</div>`,
 tasks:[
  {t:'Type Button\'s props with an interface named ButtonProps.',sol:N2_SOL,showSol:false,hint:'interface ButtonProps { label: string; onClick: () => void; }',c:async ctx=>{if(!/interface\s+ButtonProps/.test(ctx.code)||!/\}\s*:\s*ButtonProps\s*\)/.test(ctx.code))return false;const b=ctx.$$('button').find(x=>/Add one/.test(x.textContent));if(!b)return false;b.click();await sleep(80);return /Clicks: 1/.test(ctx.$('h1').textContent)}},
  {t:'Add an optional variant prop typed as "primary" | "ghost", and render a ghost Reset button.',hint:"variant?: 'primary' | 'ghost'  …  <Button label=\"Reset\" variant=\"ghost\" … />",c:ctx=>/variant\?\s*:\s*(Variant|['"]primary['"]\s*\|\s*['"]ghost['"])/.test(ctx.code)&&ctx.$$('button').length>=2&&ctx.css(ctx.$$('button')[0],'backgroundColor')!==ctx.css(ctx.$$('button')[1],'backgroundColor')},
  {t:'Write a generic List<T> component and use it to render the users.',hint:'function List<T>({ items, render }: ListProps<T>) { return <ul>{items.map((item, i) => <li key={i}>{render(item)}</li>)}</ul>; }',c:ctx=>/function\s+List\s*<\s*T\s*>/.test(ctx.code)&&ctx.$$('li').length===2},
  {t:'This preview strips types without checking them. Where are type errors caught?',o:['At runtime in the browser','By tsc and your editor before or during the build','They are never caught','By React'],a:1,e:'TypeScript types don\'t exist at runtime. Run tsc --noEmit (or next build, which type-checks) in CI.'},
 ]},
{id:'n3',lvl:'Next.js',title:'App Router: routing & layouts',kind:'code',lang:'next',files:N3_FILES,allowNew:true,open:'app/page.tsx',
 sum:'In the Next.js App Router, folders under app/ are URL segments and a page.tsx file makes a segment a route. layout.tsx wraps every page below it and keeps shared UI like navigation. [slug] folders are dynamic segments passed in params. Link from next/link navigates without a full reload, and not-found.tsx customizes the 404 page.',
 keys:['app/about/page.tsx → /about','app/layout.tsx','<Link href="/about">','app/blog/[slug]/page.tsx','params.slug','app/not-found.tsx'],
 concept:`<p>Next.js uses the file system as the router. Each folder in <code>app/</code> is a URL segment; a <code>page.tsx</code> inside makes it reachable:</p>
<div class="tbl-wrap"><table><tr><th>File</th><th>URL</th></tr>
<tr><td><code>app/page.tsx</code></td><td><code>/</code></td></tr>
<tr><td><code>app/about/page.tsx</code></td><td><code>/about</code></td></tr>
<tr><td><code>app/blog/[slug]/page.tsx</code></td><td><code>/blog/anything</code> → <code>params.slug</code></td></tr>
<tr><td><code>app/layout.tsx</code></td><td>Wraps every page (nav, footer)</td></tr>
<tr><td><code>app/not-found.tsx</code></td><td>Custom 404</td></tr></table></div>
<p>Use the <b>+ file</b> button to create files, and the URL bar above the preview to visit routes.</p>
<div class="tip"><b>Version note</b>This mini-Next follows Next 14, where <code>params</code> is a plain object. In Next 15, <code>params</code> is a Promise: <code>const { slug } = await params</code>.</div>`,
 tasks:[
  {t:'Create app/about/page.tsx that shows "About me" at /about.',sol:N3_SOL,showSol:false,hint:'New file app/about/page.tsx:\nexport default function About() { return <h1>About me</h1>; }',c:async ctx=>{if(ctx.buildErrs&&ctx.buildErrs.length)return false;await ctx.go('/about');return /About me/.test(ctx.text())}},
  {t:'Add a nav with Links to / and /about in the root layout.',hint:"import Link from 'next/link'; then <nav><Link href=\"/\">Home</Link> <Link href=\"/about\">About</Link></nav> above {children}",c:async ctx=>{await ctx.go('/about');const ok1=!!ctx.$('a[href="/"]')&&!!ctx.$('a[href="/about"]');await ctx.go('/');return ok1&&!!ctx.$('nav')&&/from ['"]next\/link['"]/.test(ctx.code)}},
  {t:'Create a dynamic route app/blog/[slug]/page.tsx that shows the slug.',hint:'export default function BlogPost({ params }: { params: { slug: string } }) { return <h1>Post: {params.slug}</h1>; }',c:async ctx=>{await ctx.go('/blog/hello-world');return /hello-world/.test(ctx.text())}},
  {t:'Add app/not-found.tsx that says "Page not found".',hint:'export default function NotFound() { return <h1>Page not found</h1>; }',c:async ctx=>{await ctx.go('/nope');return /Page not found/.test(ctx.text())}},
 ]},
{id:'n4',lvl:'Next.js',title:'Server & client components',kind:'code',lang:'next',files:N4_FILES,allowNew:true,open:'app/page.tsx',
 sum:'In the App Router, components are Server Components by default: they render on the server, can be async, can read databases and secrets directly, and ship no JavaScript to the browser. Anything interactive (useState, useEffect, onClick) must live in a Client Component marked "use client" at the top of its file. Keep client components small, as leaves of the tree.',
 keys:['Server Components by default','export default async function Page()','await getData() on the server','"use client"','interactivity = client component','keep client components small'],
 concept:`<p>The biggest idea in modern Next.js: <b>components run on the server by default</b>.</p>
<div class="tbl-wrap"><table><tr><th></th><th>Server Component (default)</th><th>Client Component (<code>'use client'</code>)</th></tr>
<tr><td>Runs</td><td>On the server only</td><td>On the server for the first HTML, then in the browser</td></tr>
<tr><td>Can</td><td>Be <code>async</code>, query the database, read secrets</td><td>Use state, effects, event handlers, browser APIs</td></tr>
<tr><td>Ships JS to the browser?</td><td>No</td><td>Yes</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">// app/page.tsx (server)
export default async function Home() {
  const projects = await getProjects();      // direct data access
  return &lt;&gt;… &lt;LikeButton /&gt;&lt;/&gt;;              // a client island
}

// components/LikeButton.tsx
'use client';
export default function LikeButton() { const [n, setN] = useState(0); … }</pre>
<div class="tip"><b>Task</b>The starter page uses <code>useState</code> in a server component. Run it and read the error, then fix it the right way: keep the page on the server and move only the button to a client component.</div>`,
 tasks:[
  {t:'Run the starter and read the build error.',hint:'Press Run and read the red Build Error in the preview.',c:ctx=>(ctx.buildErrs||[]).some(e=>/use client/i.test(e.msg))},
  {t:'Move the like button into components/LikeButton.tsx marked "use client", and use it from the page.',sol:N4_SOL,showSol:false,hint:"components/LikeButton.tsx starts with 'use client'; the page imports LikeButton from '@/components/LikeButton'",c:async ctx=>{if(ctx.buildErrs&&ctx.buildErrs.length)return false;const f=ctx.files['components/LikeButton.tsx']||'';if(!/^\s*['"]use client['"]/.test(f))return false;const b=ctx.$$('button').find(x=>/♥/.test(x.textContent));if(!b)return false;b.click();await sleep(80);return /♥ 1/.test(b.textContent)}},
  {t:'Make the page an async Server Component that awaits getProjects() and lists them.',hint:'export default async function Home() { const projects = await getProjects(); … }',c:async ctx=>/export default async function/.test(ctx.files['app/page.tsx']||'')&&await waitFor(()=>ctx.$$('li').length===3,1500)},
  {t:'Where does the code in an (unmarked) app/page.tsx run?',o:['Only in the browser','On the server: it can be async and access the database, and sends no JS for itself','Both, always','Inside a Web Worker'],a:1,e:'Server by default. Mark a file "use client" only when it needs interactivity.'},
 ]},
{id:'n5',lvl:'Next.js',title:'Server actions, API routes & caching',kind:'code',lang:'next',files:N5_FILES,allowNew:true,term:true,open:'app/page.tsx',
 sum:'Server Actions are async functions marked "use server" that you pass to <form action={...}>: the form posts to the server, the function runs there, and revalidatePath refreshes the page data. Route handlers (app/api/.../route.ts exporting GET or POST) build JSON APIs with NextResponse.json. next build marks routes as static (○, prerendered) or dynamic (ƒ, rendered per request).',
 keys:['"use server"','<form action={serverAction}>','formData.get("text")','revalidatePath("/")','app/api/x/route.ts','export async function GET()','NextResponse.json(data, { status })'],
 concept:`<p>Two ways to change data on the server in Next.js:</p>
<h4>1. Server Actions, for your own forms</h4>
<pre class="snip" style="margin-bottom:12px">async function postMessage(formData: FormData) {
  'use server';
  addMessage(String(formData.get('text')));
  revalidatePath('/');            // refresh the page's data
}
&lt;form action={postMessage}&gt;&lt;input name="text" /&gt;&lt;button&gt;Post&lt;/button&gt;&lt;/form&gt;</pre>
<p>No fetch calls, no API to write: the form posts straight to the function, and it works even before the JavaScript loads.</p>
<h4>2. Route handlers, for JSON APIs (mobile apps, webhooks, other clients)</h4>
<pre class="snip" style="margin-bottom:12px">// app/api/messages/route.ts
export async function GET() { return NextResponse.json(messages); }
export async function POST(req: Request) { … return NextResponse.json(msg, { status: 201 }); }</pre>
<h4>Caching</h4><p><code>next build</code> prerenders pages it can (○ static) and renders others per request (ƒ dynamic), for example when they read cookies or search params. Use the terminal below the preview.</p>`,
 tasks:[
  {t:'Add a form with a server action that adds a message and revalidates the page.',sol:N5_SOL,showSol:false,hint:"async function postMessage(formData: FormData) { 'use server'; addMessage(String(formData.get('text'))); revalidatePath('/'); }",c:async ctx=>{const i=ctx.$('input[name="text"]');if(!i)return false;await ctx.type(i,'Hello from the test');const b=ctx.$('button');b.click();return waitFor(()=>/Hello from the test/.test(ctx.text()),1500)}},
  {t:'Create app/api/messages/route.ts with a GET handler that returns all messages as JSON.',hint:'export async function GET() { return NextResponse.json(messages); }',c:async ctx=>{if(!ctx.api)return false;const r=await ctx.api('/api/messages');return r.status===200&&Array.isArray(r.json)}},
  {t:'Add a POST handler: 400 without text, 201 with the new message.',hint:"if (!body.text) return NextResponse.json({ error: 'text is required' }, { status: 400 });",c:async ctx=>{if(!ctx.api)return false;const bad=await ctx.api('/api/messages',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({})});const good=await ctx.api('/api/messages',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({text:'via API'})});return bad.status===400&&good.status===201&&good.json&&good.json.text==='via API'}},
  {t:'Run a production build in the terminal and read the route table.',term:'npm run build',c:ctx=>(ctx.termHist||[]).some(x=>/^npm run build/.test(x))},
  {t:'Which page is rendered dynamically (ƒ) instead of prerendered?',o:['A marketing page with fixed text','A dashboard that reads the user\'s session cookie','The 404 page','An About page'],a:1,e:'Anything that depends on the request (cookies, headers, search params) must render per request.'},
 ]},
{id:'n6',lvl:'Data',title:'Prisma + Postgres',kind:'code',lang:'next',files:N6_FILES,allowNew:true,term:true,open:'prisma/schema.prisma',
 sum:'Prisma maps database tables to TypeScript. You describe models in prisma/schema.prisma, run npx prisma migrate dev --name something to create a versioned SQL migration and apply it, then query with a typed client: prisma.post.findMany({ where, orderBy }), prisma.post.create({ data }). Every schema change is a new migration committed to Git.',
 keys:['model Post { ... }','npx prisma migrate dev --name init','prisma.post.findMany({ where, orderBy })','prisma.post.create({ data })','@default(false)','migrations live in Git'],
 concept:`<p><b>Prisma</b> is the most popular ORM for TypeScript. You describe your data once:</p>
<pre class="snip" style="margin-bottom:12px">model Post {
  id        Int      @id @default(autoincrement())
  title     String
  createdAt DateTime @default(now())
}</pre>
<p><code>npx prisma migrate dev --name init</code> turns that into SQL (<code>CREATE TABLE "Post" …</code>), saves it as a <b>migration file</b>, and applies it. Then the generated client gives you typed queries:</p>
<pre class="snip" style="margin-bottom:12px">const posts = await prisma.post.findMany({ where: { published: true }, orderBy: { id: 'desc' } });
await prisma.post.create({ data: { title: 'Hello' } });</pre>
<p>In this sandbox the database is SQLite running in your browser; the Prisma workflow is the same as with Postgres. Watch the new migration file appear in the file tabs.</p>
<div class="tip"><b>Rule</b>Never edit the production database by hand. Every change is a migration in Git, applied the same way everywhere.</div>`,
 tasks:[
  {t:'Create the database tables with your first migration.',term:'npx prisma migrate dev --name init',c:ctx=>!!PRISMA.migrated&&(ctx.termHist||[]).some(x=>/prisma migrate dev/.test(x))},
  {t:'List posts with prisma.post.findMany and add a form whose server action calls prisma.post.create.',sol:{'app/page.tsx':N6_PAGE(false)},showSol:false,hint:'const posts = await prisma.post.findMany({ orderBy: { id: "desc" } });  and in the action: await prisma.post.create({ data: { title } });',c:async ctx=>{const i=ctx.$('input[name="title"]');if(!i)return false;await ctx.type(i,'My first post');ctx.$('button').click();return waitFor(()=>/My first post/.test(ctx.text()),1500)}},
  {t:'Add published Boolean @default(false) to the model and run a second migration.',sol:{'prisma/schema.prisma':SCHEMA(true)},showSol:false,hint:'published Boolean @default(false)  then: npx prisma migrate dev --name add-published',term:'npx prisma migrate dev --name add-published',c:()=>PRISMA.migrations>=2&&PRISMA.models.Post&&PRISMA.models.Post.fields.some(f=>f.name==='published')},
  {t:'Show only published posts. A newly created (draft) post should not appear.',sol:{'app/page.tsx':N6_PAGE(true)},showSol:false,hint:'prisma.post.findMany({ where: { published: true }, orderBy: { id: "desc" } })',c:async ctx=>{if(!/where:\s*\{\s*published:\s*true/.test(ctx.files['app/page.tsx']||''))return false;const i=ctx.$('input[name="title"]');if(!i)return false;await ctx.type(i,'Secret draft');ctx.$('button').click();await sleep(400);return !/Secret draft/.test(ctx.text())&&!(ctx.errs||[]).length}},
  {t:'Why use migrations instead of changing tables by hand?',o:['They are faster','Every schema change is versioned in Git and applied identically in dev, CI and production','Prisma requires it for SELECT queries','Postgres doesn\'t allow manual changes'],a:1,e:'Migrations make database changes reviewable, repeatable and reversible.'},
 ]},
{id:'n7',lvl:'Auth',title:'Authentication with middleware & cookies',kind:'code',lang:'next',files:N7_FILES,allowNew:true,open:'app/page.tsx',
 sum:'Authentication answers "who are you?". After checking the password against a stored hash, the server sets a session cookie marked httpOnly (JavaScript can\'t read it), secure (HTTPS only) and sameSite. Middleware runs before matching routes and redirects visitors without a session. In real projects use a proven library like Auth.js or Clerk rather than rolling your own.',
 keys:['middleware.ts','NextResponse.redirect(new URL("/login", req.url))','matcher: ["/dashboard/:path*"]','cookies().set("session", ..., { httpOnly: true })','redirect("/dashboard")','Auth.js / Clerk'],
 concept:`<p>Logging in, in four steps:</p>
<ol><li>The user submits email + password to the server (a server action).</li><li>The server compares the password with the <b>stored hash</b> (bcrypt/argon2), never plain text.</li><li>On success it sets a <b>session cookie</b>: <code>httpOnly</code> (invisible to JavaScript, so XSS can't steal it), <code>secure</code>, <code>sameSite: 'lax'</code>.</li><li><b>Middleware</b> checks that cookie before protected routes run and redirects anyone without it.</li></ol>
<pre class="snip" style="margin-bottom:12px">// middleware.ts
export function middleware(request) {
  if (!request.cookies.get('session'))
    return NextResponse.redirect(new URL('/login', request.url));
  return NextResponse.next();
}
export const config = { matcher: ['/dashboard/:path*'] };</pre>
<div class="tip"><b>In production</b>Use Auth.js (NextAuth), Clerk, Supabase Auth or Lucia. They handle sessions, OAuth, CSRF, rotation and expiry correctly. Build it once yourself here to understand what they do. The demo password is <code>correct horse battery staple</code>.</div>`,
 tasks:[
  {t:'Add middleware that redirects visitors without a session from /dashboard to /login.',sol:N7_SOL,showSol:false,hint:"middleware.ts: if (!request.cookies.get('session')) return NextResponse.redirect(new URL('/login', request.url));  with config.matcher ['/dashboard/:path*']",c:async ctx=>{if(!ctx.files['middleware.ts'])return false;await ctx.go('/dashboard');await sleep(150);return ctx.url()==='/login'||/^\/login/.test(ctx.url()||'')}},
  {t:'Build a login page whose server action sets an httpOnly session cookie and redirects to /dashboard.',hint:"cookies().set('session', email, { httpOnly: true, secure: true, sameSite: 'lax' }); redirect('/dashboard');",c:async ctx=>{await ctx.go('/login');const ins=ctx.$$('input');if(ins.length<2)return false;await ctx.type(ins[0],'ada@example.com');await ctx.type(ins[1],'correct horse battery staple');ctx.$('button').click();return await waitFor(()=>/^\/dashboard/.test(ctx.url()||'')&&/Welcome, ada@example\.com/.test(ctx.text()),2000)&&/httpOnly:\s*true/.test(ctx.files['app/login/page.tsx']||'')}},
  {t:'A wrong password shows "Wrong email or password".',hint:"if (!checkPassword(email, password)) redirect('/login?error=1');  and render the message when searchParams.error is set",c:async ctx=>{await ctx.go('/login');const ins=ctx.$$('input');if(ins.length<2)return false;await ctx.type(ins[0],'ada@example.com');await ctx.type(ins[1],'nope');ctx.$('button').click();return waitFor(()=>/Wrong email or password/.test(ctx.text()),1500)}},
  {t:'Log out deletes the cookie, and /dashboard redirects to /login again.',hint:"async function logout() { 'use server'; cookies().delete('session'); redirect('/login'); }",c:async ctx=>{await ctx.go('/login');const ins=ctx.$$('input');if(ins.length<2)return false;await ctx.type(ins[0],'ada@example.com');await ctx.type(ins[1],'correct horse battery staple');ctx.$('button').click();if(!await waitFor(()=>/^\/dashboard/.test(ctx.url()||''),1500))return false;const out=ctx.$$('button').find(b=>/log out/i.test(b.textContent));if(!out)return false;out.click();await sleep(300);await ctx.go('/dashboard');await sleep(150);return /^\/login/.test(ctx.url()||'')}},
  {t:'Why mark the session cookie httpOnly?',o:['It makes the cookie load faster','JavaScript on the page can\'t read it, so an XSS bug can\'t steal the session','It encrypts the cookie','It makes it work on HTTP'],a:1,e:'httpOnly is one of the cheapest, most effective defenses for session cookies.'},
 ]},
{id:'n8',lvl:'Quality',title:'Testing with Vitest: test-driven development',kind:'code',lang:'ts',files:N8_FILES,open:'lib/price.ts',
 sum:'Vitest runs unit tests for TypeScript code: describe groups tests, it/test defines one, expect(...).toBe(...) asserts. Test-driven development (TDD) means writing a failing test first (red), the simplest code that passes (green), then cleaning up (refactor). Cover edge cases like invalid input with toThrow. Playwright covers the full app in a real browser.',
 keys:['describe / it / expect','toBe / toEqual / toThrow','red → green → refactor','edge cases','npx vitest','Playwright for end-to-end'],
 concept:`<p><b>Vitest</b> is the test runner most Vite and Next.js projects use (Jest-compatible API, very fast).</p>
<pre class="snip" style="margin-bottom:12px">describe('applyDiscount', () => {
  it('takes 25% off', () => {
    expect(applyDiscount(1000, 25)).toBe(750);
  });
  it('rejects discounts over 100%', () => {
    expect(() => applyDiscount(1000, 150)).toThrow('between 0 and 100');
  });
});</pre>
<h4>Test-driven development</h4>
<div class="flow"><span>Red: write a failing test</span><em>→</em><span>Green: simplest code that passes</span><em>→</em><span>Refactor: clean up, tests stay green</span></div>
<p>Two files are open as tabs: the code and its tests. They run together; imports are joined into one file in this sandbox.</p>
<div class="tip"><b>The testing pyramid</b>Lots of fast unit tests (Vitest), fewer integration tests, and a handful of end-to-end tests (Playwright) for critical flows like sign-up and checkout. The Testing track goes deeper.</div>`,
 tasks:[
  {t:'Implement formatPrice so both formatPrice tests pass.',sol:{'lib/price.ts':N8_PRICE(false)},showSol:false,hint:"return '$' + (cents / 100).toFixed(2);",c:ctx=>ctx.tests&&ctx.tests.filter(t=>/formatPrice/.test(t.name)&&t.ok).length>=2},
  {t:'Red: write applyDiscount tests first and watch them fail.',sol:{'lib/price.test.ts':N8_TEST(false)},showSol:false,hint:"describe('applyDiscount', () => { it('takes 25% off', () => { expect(applyDiscount(1000, 25)).toBe(750); }); });",c:ctx=>ctx.tests&&ctx.tests.some(t=>/applyDiscount/.test(t.name)&&!t.ok)},
  {t:'Green: implement applyDiscount so every test passes.',sol:{'lib/price.ts':N8_PRICE(true)},showSol:false,hint:'return Math.round(cents * (1 - percent / 100));',c:ctx=>ctx.tests&&ctx.tests.length>=4&&ctx.tests.every(t=>t.ok)&&ctx.tests.some(t=>/applyDiscount/.test(t.name))},
  {t:'Edge case: add a test that discounts over 100% throw, and make it pass.',sol:{'lib/price.test.ts':N8_TEST(true)},showSol:false,hint:"expect(() => applyDiscount(1000, 150)).toThrow('between 0 and 100');",c:ctx=>ctx.tests&&ctx.tests.length>=5&&ctx.tests.every(t=>t.ok)&&/toThrow/.test(ctx.code)},
  {t:'Which test belongs in Playwright rather than Vitest?',o:['formatPrice(1250) returns "$12.50"','A user signs up, receives the welcome page and can log out','applyDiscount rounds correctly','A Zod schema rejects bad emails'],a:1,e:'End-to-end tests drive a real browser through full user journeys. Keep them few and focused on critical flows.'},
 ]},
],
quizzes:{next:[
 {q:'In the App Router, which file makes /pricing a page?',o:['pages/pricing.js','app/pricing/page.tsx','app/pricing.tsx','routes/pricing.tsx'],a:1,e:'Folders are segments; page.tsx makes the segment routable.'},
 {q:'A component uses useState. What must its file start with?',o:['"use server"','"use client"','export const dynamic','Nothing'],a:1,e:'Hooks and event handlers need a Client Component.'},
 {q:'Where is the safest place to query your database in Next.js?',o:['A Client Component with fetch','A Server Component, Server Action or route handler','localStorage','Middleware only'],a:1,e:'Server code can reach the database and secrets directly without exposing them.'},
 {q:'What does revalidatePath("/") do after a server action?',o:['Reloads the browser','Clears cached data for that path so the next render shows fresh data','Deletes the page','Runs migrations'],a:1,e:'It tells Next.js the data for that route changed.'},
 {q:'TypeScript: what does function first<T>(list: T[]): T | undefined give you?',o:['Nothing over any','It keeps the element type: first(["a"]) is typed string | undefined','It converts arrays','It runs faster'],a:1,e:'Generics preserve type information through functions.'},
 {q:'Why store the session in an httpOnly cookie?',o:['Speed','Page JavaScript can\'t read it, so XSS can\'t steal it','It\'s required by HTTP','It never expires'],a:1,e:'Combine with secure and sameSite for solid defaults.'},
]},
real:[
 {id:'next-r1',t:'Create a real Next.js app',p:'Scaffold with TypeScript, Tailwind and the App Router, then build three pages and a layout.',s:'npx create-next-app@latest my-app --ts --tailwind --app\ncd my-app && npm run dev'},
 {id:'next-r2',t:'Add Prisma with a real Postgres database',p:'Use a free hosted Postgres (Neon or Supabase) and run your first migration.',s:'npm install prisma @prisma/client\nnpx prisma init\n# set DATABASE_URL in .env, write your model, then:\nnpx prisma migrate dev --name init\nnpx prisma studio'},
 {id:'next-r3',t:'Add authentication with Auth.js or Clerk',p:'Protect a /dashboard route and show the signed-in user\'s name.',s:'npm install next-auth@beta\n# or: npm install @clerk/nextjs'},
 {id:'next-r4',t:'Capstone: ship a full-stack app',p:'A small product with auth, a database, forms with validation, tests, CI, and a production deploy on Vercel. Write a README with screenshots.',s:'# ideas: habit tracker, booking system, expense splitter, job board'},
]});
})();
