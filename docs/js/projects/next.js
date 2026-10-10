/* Projects: Next.js + TypeScript */
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
const JSONH={'content-type':'application/json'};
/* ---------- guided: task board ---------- */
const TASKS_START=`// TODO: describe a task with a TypeScript interface,
// then export typed helpers the pages and API can share.

export const tasks = [
  { id: 1, title: 'Write the README', done: true },
  { id: 2, title: 'Set up CI', done: false },
];
`;
const TASKS_LIB=`export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export const tasks: Task[] = [
  { id: 1, title: 'Write the README', done: true },
  { id: 2, title: 'Set up CI', done: false },
];

export function getTask(id: number): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function addTask(title: string): Task {
  const task: Task = { id: tasks.length + 1, title, done: false };
  tasks.push(task);
  return task;
}
`;
const HOME1=`import Link from 'next/link';
import { tasks } from '@/lib/tasks';

export default function Home() {
  return (
    <main>
      <h1>Task board</h1>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <Link href={\`/tasks/\${t.id}\`}>{t.title}</Link> {t.done ? '✓' : ''}
          </li>
        ))}
      </ul>
    </main>
  );
}
`;
const DETAIL=`import { notFound } from 'next/navigation';
import { getTask } from '@/lib/tasks';

export default function TaskPage({ params }: { params: { id: string } }) {
  const task = getTask(Number(params.id));
  if (!task) notFound();
  return (
    <main>
      <h1>{task.title}</h1>
      <p>Status: {task.done ? 'done' : 'open'}</p>
    </main>
  );
}
`;
const NF=`export default function NotFound() {
  return <h1>Task not found</h1>;
}
`;
const HOME2=`import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { tasks, addTask } from '@/lib/tasks';

async function createTask(formData: FormData) {
  'use server';
  const title = String(formData.get('title') || '').trim();
  if (!title) return;
  addTask(title);
  revalidatePath('/');
}

export default function Home() {
  return (
    <main>
      <h1>Task board</h1>
      <form action={createTask}>
        <input name="title" placeholder="New task" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <Link href={\`/tasks/\${t.id}\`}>{t.title}</Link> {t.done ? '✓' : ''}
          </li>
        ))}
      </ul>
    </main>
  );
}
`;
const ROUTE=`import { NextResponse } from 'next/server';
import { tasks, addTask } from '@/lib/tasks';

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const body = await request.json();
  if (typeof body.title !== 'string' || !body.title.trim()) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }
  return NextResponse.json(addTask(body.title.trim()), { status: 201 });
}
`;
const G={'app/layout.tsx':LAYOUT,'lib/tasks.ts':TASKS_START,'app/page.tsx':`export default function Home() {
  return <h1>Task board</h1>;
}
`};
const S1={'lib/tasks.ts':TASKS_LIB,'app/page.tsx':HOME1};
const S2=Object.assign({},S1,{'app/tasks/[id]/page.tsx':DETAIL,'app/not-found.tsx':NF});
const S3=Object.assign({},S2,{'app/page.tsx':HOME2});
const S4=Object.assign({},S3,{'app/api/tasks/route.ts':ROUTE});

/* ---------- solo: recipes ---------- */
const RECIPES=`export interface Recipe {
  slug: string;
  title: string;
  tags: string[];
  ingredients: string[];
}

export const recipes: Recipe[] = [
  { slug: 'carbonara', title: 'Spaghetti carbonara', tags: ['pasta'], ingredients: ['spaghetti', 'eggs', 'pecorino', 'guanciale'] },
  { slug: 'jollof', title: 'Jollof rice', tags: ['rice', 'vegan'], ingredients: ['rice', 'tomatoes', 'peppers', 'onions'] },
  { slug: 'pesto-pasta', title: 'Pesto pasta', tags: ['pasta', 'vegetarian'], ingredients: ['pasta', 'basil', 'pine nuts', 'parmesan'] },
  { slug: 'dal', title: 'Red lentil dal', tags: ['vegan'], ingredients: ['red lentils', 'onion', 'garlic', 'turmeric'] },
];
`;
const R_START={'app/layout.tsx':LAYOUT,'lib/recipes.ts':RECIPES,'app/page.tsx':`import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Recipe box</h1>
      <Link href="/recipes">Browse recipes</Link>
    </main>
  );
}
`};
const R_REF={'lib/recipes.ts':RECIPES+`
export function findRecipe(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function searchRecipes(q: string): Recipe[] {
  const s = q.toLowerCase();
  return recipes.filter((r) => r.title.toLowerCase().includes(s) || r.tags.includes(s));
}

export function slugify(title: string): string {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
`,'app/recipes/page.tsx':`import Link from 'next/link';
import { recipes, searchRecipes } from '@/lib/recipes';

export default function RecipesPage({ searchParams }: { searchParams: { q?: string } }) {
  const list = searchParams.q ? searchRecipes(searchParams.q) : recipes;
  return (
    <main>
      <h1>Recipes</h1>
      <ul>
        {list.map((r) => (
          <li key={r.slug}><Link href={\`/recipes/\${r.slug}\`}>{r.title}</Link></li>
        ))}
      </ul>
    </main>
  );
}
`,'app/recipes/[slug]/page.tsx':`import { notFound } from 'next/navigation';
import { findRecipe } from '@/lib/recipes';
import FavoriteButton from '@/components/FavoriteButton';

export default function RecipePage({ params }: { params: { slug: string } }) {
  const recipe = findRecipe(params.slug);
  if (!recipe) notFound();
  return (
    <main>
      <h1>{recipe.title}</h1>
      <FavoriteButton />
      <ul>
        {recipe.ingredients.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </main>
  );
}
`,'app/not-found.tsx':`export default function NotFound() {
  return <h1>Recipe not found</h1>;
}
`,'components/FavoriteButton.tsx':`'use client';
import { useState } from 'react';

export default function FavoriteButton() {
  const [saved, setSaved] = useState(false);
  return <button onClick={() => setSaved(!saved)}>{saved ? '★ Saved' : '☆ Save'}</button>;
}
`,'app/api/recipes/route.ts':`import { NextResponse } from 'next/server';
import { recipes, slugify, Recipe } from '@/lib/recipes';

export async function GET(request: Request) {
  const tag = new URL(request.url).searchParams.get('tag');
  return NextResponse.json(tag ? recipes.filter((r) => r.tags.includes(tag)) : recipes);
}

export async function POST(request: Request) {
  const body = await request.json();
  const ok = typeof body.title === 'string' && body.title.trim() && Array.isArray(body.ingredients) && body.ingredients.length > 0;
  if (!ok) {
    return NextResponse.json({ error: 'title and at least one ingredient are required' }, { status: 400 });
  }
  const recipe: Recipe = { slug: slugify(body.title), title: body.title.trim(), tags: body.tags || [], ingredients: body.ingredients };
  recipes.push(recipe);
  return NextResponse.json(recipe, { status: 201 });
}
`};
const bErr=ctx=>ctx.buildErrs&&ctx.buildErrs.length?'Your app has a build error in '+ctx.buildErrs[0].file+': '+ctx.buildErrs[0].msg.split('\n')[0]+'. Fix that first: nothing renders until it builds.':'';

defineProjects('next',{
guided:{title:'Build a typed task board with the App Router',kind:'code',lang:'next',files:G,allowNew:true,term:true,project:'task-board',open:'lib/tasks.ts',
 pitch:'Model data with TypeScript, then add pages, a dynamic route with notFound(), a server action form, a JSON API route and a production build.',
 brief:`<p>You'll build a small full-stack task board in Next.js: typed data shared by pages and an API, a page per task, a form that adds tasks on the server, and a JSON endpoint other apps can call.</p>
<p>Use <b>+ file</b> in the editor to create new files at the paths shown. Press <b>Run</b> after each step, and use the URL bar above the preview to visit routes.</p>
<div class="tip"><b>Goal</b>Pages and API routes that share one typed data module, and a production build that compiles cleanly.</div>`,
 tasks:[
 {t:'Type the data in lib/tasks.ts and list the tasks on the home page, each linking to /tasks/<id>.',why:'One <code>Task</code> interface, shared by every page and the API, means a renamed field breaks loudly at build time instead of quietly in production. Typed helpers like <code>getTask(id): Task | undefined</code> force callers to handle the "not found" case.',code:"// lib/tasks.ts\nexport interface Task { id: number; title: string; done: boolean; }\nexport const tasks: Task[] = [ … ];\nexport function getTask(id: number): Task | undefined { … }\nexport function addTask(title: string): Task { … }\n\n// app/page.tsx\n{tasks.map((t) => (\n  <li key={t.id}><Link href={`/tasks/${t.id}`}>{t.title}</Link></li>\n))}",sol:S1,c:async ctx=>{const lib=ctx.files['lib/tasks.ts']||'';if(!/interface\s+Task\b/.test(lib)||!/function\s+getTask\s*\(\s*id\s*:\s*number\s*\)\s*:\s*Task\s*\|\s*undefined/.test(lib)||!/function\s+addTask\s*\(\s*title\s*:\s*string\s*\)\s*:\s*Task/.test(lib))return false;await ctx.go('/');return waitFor(()=>ctx.$$('li').length>=2&&!!ctx.$('a[href="/tasks/1"]'),1500)}},
 {t:'Add the dynamic route app/tasks/[id]/page.tsx. Unknown ids show "Task not found".',why:'A folder named <code>[id]</code> matches any segment and passes it as <code>params.id</code>, always a <b>string</b>, so convert it with <code>Number()</code>. Calling <code>notFound()</code> renders <code>app/not-found.tsx</code> with a 404 status instead of crashing on <code>undefined.title</code>.',code:"// app/tasks/[id]/page.tsx\n"+DETAIL+"\n// app/not-found.tsx\n"+NF,sol:S2,c:async ctx=>{if(bErr(ctx))return false;await ctx.go('/tasks/1');const a=await waitFor(()=>/Write the README/.test(ctx.text()),1000);await ctx.go('/tasks/99');const b=await waitFor(()=>/Task not found/.test(ctx.text()),1000);await ctx.go('/');return a&&b}},
 {t:'Add a form on the home page whose server action adds a task.',why:'A function marked <code>\'use server\'</code> runs on the server even though the form is in the page, so no API call or <code>useState</code> is needed. <code>revalidatePath(\'/\')</code> tells Next.js to re-render the page with the new data.',code:"async function createTask(formData: FormData) {\n  'use server';\n  const title = String(formData.get('title') || '').trim();\n  if (!title) return;\n  addTask(title);\n  revalidatePath('/');\n}\n\n<form action={createTask}>\n  <input name=\"title\" placeholder=\"New task\" />\n  <button type=\"submit\">Add</button>\n</form>",sol:S3,c:async ctx=>{await ctx.go('/');const i=ctx.$('input[name="title"]');if(!i)return false;await ctx.type(i,'Deploy to Vercel');const b=ctx.$('form button, button[type="submit"]');if(!b)return false;b.click();return waitFor(()=>/Deploy to Vercel/.test(ctx.text()),1500)}},
 {t:'Create app/api/tasks/route.ts: GET lists tasks, POST validates and returns 201.',why:'Route handlers turn your app into an API for mobile apps or other services. <b>Never trust the request body</b>: check the shape and return <code>400</code> with a clear error. Return <code>201 Created</code> for new resources.',code:ROUTE,sol:S4,c:async ctx=>{if(!ctx.api)return false;const g=await ctx.api('/api/tasks');const bad=await ctx.api('/api/tasks',{method:'POST',headers:JSONH,body:JSON.stringify({title:'  '})});const ok=await ctx.api('/api/tasks',{method:'POST',headers:JSONH,body:JSON.stringify({title:'From the API'})});return g.status===200&&Array.isArray(g.json)&&bad.status===400&&ok.status===201&&ok.json&&ok.json.title==='From the API'}},
 {t:'Run a production build and read the route table.',why:'<code>npm run build</code> is what Vercel runs. The table shows which routes are static (○, prerendered) and which are dynamic (ƒ, rendered per request). Build locally before you push.',term:'npm run build',sol:S4,c:ctx=>(ctx.termHist||[]).some(x=>/^npm run build/.test(x))&&BENCH.code.built},
 ]},
solo:{title:'Ship a recipe site with search and an API',kind:'code',lang:'next',files:R_START,allowNew:true,term:true,project:'recipe-box',open:'lib/recipes.ts',
 pitch:'Given a typed data module, build list and detail pages, URL-based search, a client-side favourite button and a validated JSON API.',
 brief:`<p>You're building "Recipe box". The data and its <code>Recipe</code> type are in <code>lib/recipes.ts</code>. Build the rest.</p>
<p><b>Spec</b></p><ul><li><code>/recipes</code> lists every recipe title, each linking to <code>/recipes/&lt;slug&gt;</code>.</li><li><code>/recipes?q=pasta</code> shows only recipes whose title or tags match the query. The search lives in the URL, so it can be shared.</li><li><code>/recipes/&lt;slug&gt;</code> shows the title and an <code>li</code> per ingredient. An unknown slug shows "Recipe not found".</li><li>The detail page has a <b>☆ Save</b> button that toggles to <b>★ Saved</b>. Keep the page itself a Server Component.</li><li><code>GET /api/recipes</code> returns all recipes as JSON, and <code>?tag=vegan</code> filters by tag.</li><li><code>POST /api/recipes</code> returns 400 unless the body has a non-empty <code>title</code> and at least one ingredient; otherwise 201 with the created recipe and a generated <code>slug</code>.</li></ul>`,
 tasks:[
 {t:'/recipes lists all 4 recipes, each linking to /recipes/<slug>.',c:async ctx=>{if(bErr(ctx))return false;await ctx.go('/recipes');return waitFor(()=>!!ctx.$('a[href="/recipes/carbonara"]')&&!!ctx.$('a[href="/recipes/dal"]')&&/Jollof rice/.test(ctx.text()),1200)},
  miss:async ctx=>{const e=bErr(ctx);if(e)return e;if(!ctx.files['app/recipes/page.tsx'])return 'There is no app/recipes/page.tsx, so /recipes is a 404. Create the file with + file.';await ctx.go('/recipes');return ctx.$('a[href="/recipes/carbonara"]')?'Not every recipe is listed. Map over the whole recipes array.':'The list has no links to /recipes/carbonara. Use <Link href={`/recipes/${r.slug}`}>.'}},
 {t:'/recipes?q=pasta shows only the two pasta recipes.',c:async ctx=>{await ctx.go('/recipes?q=pasta');const ok=await waitFor(()=>/carbonara/i.test(ctx.text())&&/Pesto pasta/.test(ctx.text())&&!/Jollof/.test(ctx.text())&&!/lentil/i.test(ctx.text()),1200);return ok},
  miss:async ctx=>{const src=ctx.files['app/recipes/page.tsx']||'';if(!/searchParams/.test(src))return 'The page never reads searchParams, so ?q=pasta is ignored. Server Components receive { searchParams } as a prop: filter on searchParams.q.';return '?q=pasta should show Spaghetti carbonara and Pesto pasta only. Match against the title or the tags, case-insensitively.'}},
 {t:'/recipes/jollof shows the title and its 4 ingredients; /recipes/nope shows "Recipe not found".',c:async ctx=>{await ctx.go('/recipes/jollof');const a=await waitFor(()=>/Jollof rice/.test(ctx.text())&&ctx.$$('li').length>=4&&/peppers/.test(ctx.text()),1200);await ctx.go('/recipes/nope');const b=await waitFor(()=>/Recipe not found/.test(ctx.text()),1200);return a&&b},
  miss:async ctx=>{if(!Object.keys(ctx.files).some(f=>/^app\/recipes\/\[\w+\]\/page\.tsx$/.test(f)))return 'There is no dynamic route. Create app/recipes/[slug]/page.tsx.';await ctx.go('/recipes/nope');if(!/Recipe not found/.test(ctx.text()))return 'An unknown slug doesn\'t show "Recipe not found". Call notFound() from next/navigation when the lookup returns undefined, and create app/not-found.tsx.';return '/recipes/jollof should show "Jollof rice" and one <li> per ingredient.'}},
 {t:'The detail page has a ☆ Save button that toggles to ★ Saved, in a "use client" component.',c:async ctx=>{const page=Object.entries(ctx.files).find(([f])=>/^app\/recipes\/\[\w+\]\/page\.tsx$/.test(f));if(!page||/^\s*['"]use client['"]/.test(page[1]))return false;await ctx.go('/recipes/dal');if(!await waitFor(()=>ctx.$$('button').some(b=>/Save/.test(b.textContent)),1200))return false;const b=ctx.$$('button').find(b=>/Save/.test(b.textContent));b.click();return waitFor(()=>ctx.$$('button').some(x=>/Saved/.test(x.textContent)),800)},
  miss:ctx=>{const page=Object.entries(ctx.files).find(([f])=>/^app\/recipes\/\[\w+\]\/page\.tsx$/.test(f));if(page&&/^\s*['"]use client['"]/.test(page[1]))return 'You marked the whole detail page "use client". That ships the page and its data code to the browser. Keep the page a Server Component and move only the button into components/FavoriteButton.tsx with \'use client\' at the top.';return 'There is no button that toggles from "☆ Save" to "★ Saved". It needs useState, so it must live in a client component.'}},
 {t:'GET /api/recipes returns all recipes, and ?tag=vegan returns only the 2 vegan ones.',c:async ctx=>{if(!ctx.api)return false;const a=await ctx.api('/api/recipes');const v=await ctx.api('/api/recipes?tag=vegan');return a.status===200&&Array.isArray(a.json)&&a.json.length>=4&&v.status===200&&Array.isArray(v.json)&&v.json.length===2&&v.json.every(r=>r.tags.includes('vegan'))},
  miss:async ctx=>{if(!ctx.files['app/api/recipes/route.ts'])return 'There is no app/api/recipes/route.ts.';const v=ctx.api?await ctx.api('/api/recipes?tag=vegan'):null;if(v&&Array.isArray(v.json)&&v.json.length!==2)return '?tag=vegan returned '+v.json.length+' recipes. Read the tag with new URL(request.url).searchParams.get(\'tag\') and filter on r.tags.includes(tag).';return 'GET /api/recipes should return status 200 and a JSON array.'}},
 {t:'POST /api/recipes returns 400 for bad bodies and 201 with a slug for good ones.',c:async ctx=>{if(!ctx.api)return false;const p=b=>ctx.api('/api/recipes',{method:'POST',headers:JSONH,body:JSON.stringify(b)});const a=await p({});const b=await p({title:'Toast',ingredients:[]});const c=await p({title:'Banana Bread',ingredients:['bananas','flour']});return a.status===400&&b.status===400&&c.status===201&&c.json&&c.json.slug==='banana-bread'},
  miss:async ctx=>{if(!ctx.api)return 'Run the app first.';if(!ctx.files['app/api/recipes/route.ts'])return 'There is no app/api/recipes/route.ts.';const p=b=>ctx.api('/api/recipes',{method:'POST',headers:JSONH,body:JSON.stringify(b)});const a=await p({});if(a.status===405)return 'There is no POST export in the route file.';if(a.status!==400)return 'An empty body returned '+a.status+' instead of 400. Validate before you create anything.';const b=await p({title:'Toast',ingredients:[]});if(b.status!==400)return 'A recipe with zero ingredients was accepted ('+b.status+'). The spec says at least one ingredient.';const c=await p({title:'Banana Bread',ingredients:['bananas','flour']});if(c.status!==201)return 'A valid recipe returned '+c.status+'. Return NextResponse.json(recipe, { status: 201 }).';return 'The created recipe\'s slug was "'+(c.json&&c.json.slug)+'". "Banana Bread" should become "banana-bread".'}},
 ],
 warn:[
  {c:ctx=>Object.values(ctx.files).some(s=>/:\s*any\b|as\s+any\b/.test(s)),m:'You used the any type. any switches type checking off for that value. Use the Recipe interface, or unknown plus a check.'},
  {c:ctx=>Object.entries(ctx.files).some(([f,s])=>/^app\/.*page\.tsx$/.test(f)&&/fetch\(\s*['"`]\/api\//.test(s)),m:'A Server Component fetches your own /api route. On the server, call the data function (searchRecipes, findRecipe) directly. It saves a network hop.'},
  {c:ctx=>Object.entries(ctx.files).some(([f,s])=>/^app\/.*page\.tsx$/.test(f)&&/^\s*['"]use client['"]/.test(s)),m:'A whole page is marked "use client". Push the client boundary down to the smallest interactive piece.'},
 ],
 ref:[{sol:R_REF}]},
});
})();
