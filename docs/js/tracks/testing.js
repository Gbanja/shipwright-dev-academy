/* Track 9: Testing */
(()=>{
const passing=(ctx,re)=>(ctx.tests||[]).filter(t=>t.ok&&(!re||re.test(t.name)));
const allPass=ctx=>ctx.tests&&ctx.tests.length>0&&ctx.tests.every(t=>t.ok);
async function mutantFails(ctx,from,to){if(!ctx.code||!ctx.code.includes(from))return false;const r=await runInWorker(prepJS(ctx.code.replace(from,to)),{},'',4000);return !!(r.tests&&r.tests.some(t=>!t.ok))}
const T1_START=`function add(a, b) {
  return a + b;
}

// A test is code that checks other code.
test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
`;
const CART=`export function subtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function applyCoupon(total, code) {
  if (code === 'SAVE10') return Math.round(total * 0.9 * 100) / 100;
  if (code === 'FREESHIP') return total;
  throw new Error('Invalid coupon: ' + code);
}

export function shipping(total) {
  return total >= 50 ? 0 : 4.99;
}
`;
const CART_TEST_START=`import { subtotal, applyCoupon, shipping } from './cart.js';

describe('subtotal', () => {
  // TODO
});
`;
const CART_TEST_SOL=`import { subtotal, applyCoupon, shipping } from './cart.js';

describe('subtotal', () => {
  it('adds price × qty for each item', () => {
    const items = [{ price: 10, qty: 2 }, { price: 5, qty: 1 }];
    expect(subtotal(items)).toBe(25);
  });
  it('is 0 for an empty cart', () => {
    expect(subtotal([])).toBe(0);
  });
});

describe('applyCoupon', () => {
  it('SAVE10 takes 10% off', () => {
    expect(applyCoupon(80, 'SAVE10')).toBe(72);
  });
  it('rejects unknown coupons', () => {
    expect(() => applyCoupon(80, 'BOGUS')).toThrow('Invalid coupon');
  });
});

describe('shipping', () => {
  it('is free from $50', () => {
    expect(shipping(50)).toBe(0);
  });
  it('costs 4.99 just below $50', () => {
    expect(shipping(49.99)).toBe(4.99);
  });
});
`;
const T3_CODE=`export async function signUp(email, { db, mailer }) {
  if (!email.includes('@')) throw new Error('Invalid email');
  const user = await db.createUser({ email });
  await mailer.send(email, 'Welcome!');
  return user;
}

export async function getWeather(city, fetchFn) {
  const res = await fetchFn('https://api.example.com/weather?city=' + city);
  if (!res.ok) return null;
  const data = await res.json();
  return data.temp_c + '°C';
}
`;
const T3_TEST_SOL=`import { signUp, getWeather } from './signup.js';

describe('signUp', () => {
  let db, mailer;

  beforeEach(() => {
    db = { createUser: vi.fn().mockResolvedValue({ id: 1, email: 'ada@example.com' }) };
    mailer = { send: vi.fn().mockResolvedValue(true) };
  });

  it('creates the user and sends a welcome email', async () => {
    const user = await signUp('ada@example.com', { db, mailer });
    expect(user.id).toBe(1);
    expect(mailer.send).toHaveBeenCalledWith('ada@example.com', 'Welcome!');
  });

  it('rejects invalid emails without touching the database', async () => {
    await expect(signUp('nope', { db, mailer })).rejects.toThrow('Invalid email');
    expect(db.createUser).not.toHaveBeenCalled();
  });
});

describe('getWeather', () => {
  it('formats the temperature', async () => {
    const fakeFetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ temp_c: 31 }) });
    expect(await getWeather('Lagos', fakeFetch)).toBe('31°C');
    expect(fakeFetch).toHaveBeenCalledTimes(1);
  });

  it('returns null when the API fails', async () => {
    const fakeFetch = vi.fn().mockResolvedValue({ ok: false });
    expect(await getWeather('Nowhere', fakeFetch)).toBe(null);
  });
});
`;
const T4_START=`// db is a real SQLite database with a users(id, email UNIQUE, name) table.
// db.run(sql, params) changes data; db.query(sql, params) returns rows.

function createUser(db, { email, name }) {
  db.run('INSERT INTO users (email, name) VALUES (?, ?)', [email, name]);
  return db.query('SELECT * FROM users WHERE email = ?', [email])[0];
}

function findByEmail(db, email) {
  return db.query('SELECT * FROM users WHERE email = ?', [email])[0] || null;
}

function listUsers(db) {
  return db.query('SELECT * FROM users ORDER BY name');
}

// TODO: integration tests that use the real db
`;
const T4_SOL=T4_START.replace('// TODO: integration tests that use the real db\n',`beforeEach(() => {
  db.run('DELETE FROM users');   // every test starts from a known state
});

test('creates and finds a user', () => {
  createUser(db, { email: 'ada@example.com', name: 'Ada' });
  expect(findByEmail(db, 'ada@example.com').name).toBe('Ada');
  expect(findByEmail(db, 'nobody@example.com')).toBe(null);
});

test('rejects duplicate emails', () => {
  createUser(db, { email: 'ada@example.com', name: 'Ada' });
  expect(() => createUser(db, { email: 'ada@example.com', name: 'Ada 2' })).toThrow('UNIQUE');
});

test('lists users sorted by name', () => {
  createUser(db, { email: 'grace@example.com', name: 'Grace' });
  createUser(db, { email: 'alan@example.com', name: 'Alan' });
  expect(listUsers(db).map((u) => u.name)).toEqual(['Alan', 'Grace']);
});
`);
const LOGIN_APP=`<!doctype html><html><head><meta charset="utf-8"><title>Acme</title><style>body{font-family:system-ui,sans-serif;margin:20px}label{display:block;margin-top:8px}input{display:block;margin:4px 0}</style></head><body><main id="app"></main>
<script>window.__path='__PATH__';
function render(){var app=document.getElementById('app');
 if(window.__path==='/dashboard'){app.innerHTML='<h1>Dashboard</h1><p>Welcome back, Ada</p><button id="logout">Log out</button>';document.getElementById('logout').onclick=function(){window.__path='/';render()};return}
 app.innerHTML='<h1>Sign in</h1><form id="f"><label for="email">Email</label><input id="email" type="email"><label for="pw">Password</label><input id="pw" type="password"><button type="submit">Log in</button><p role="alert" id="err" hidden></p></form>';
 document.getElementById('f').onsubmit=function(e){e.preventDefault();var em=document.getElementById('email').value,pw=document.getElementById('pw').value;
  if(em==='ada@example.com'&&pw==='hunter22'){setTimeout(function(){window.__path='/dashboard';render()},150)}else{var er=document.getElementById('err');er.textContent='Invalid email or password';er.hidden=false}};}
render();<\/script></body></html>`;
const T5_START=`import { test, expect } from '@playwright/test';

// The app under test is in the preview. Valid login: ada@example.com / hunter22

test('shows the sign-in page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});
`;
const T5_SOL=`import { test, expect } from '@playwright/test';

async function logIn(page, password) {
  await page.goto('/');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
}

test('logs in with valid credentials', async ({ page }) => {
  await logIn(page, 'hunter22');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('shows an error for a wrong password', async ({ page }) => {
  await logIn(page, 'wrong-password');
  await expect(page.getByRole('alert')).toHaveText('Invalid email or password');
});

test('can log out', async ({ page }) => {
  await logIn(page, 'hunter22');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});
`;
const T6_START=`function slugify(title) {
  return '';
}

// Step 1 (red): write tests for slugify FIRST and watch them fail.
`;
const T6_RED=`function slugify(title) {
  return '';
}

test('lowercases and joins words with dashes', () => {
  expect(slugify('Hello World')).toBe('hello-world');
});

test('handles a single word', () => {
  expect(slugify('Docker')).toBe('docker');
});
`;
const T6_GREEN=`function slugify(title) {
  return title.toLowerCase().split(' ').join('-');
}

test('lowercases and joins words with dashes', () => {
  expect(slugify('Hello World')).toBe('hello-world');
});

test('handles a single word', () => {
  expect(slugify('Docker')).toBe('docker');
});
`;
const T6_RED2=T6_GREEN+`
test('strips punctuation and extra spaces', () => {
  expect(slugify('  Hello,   World!  ')).toBe('hello-world');
});

test('collapses repeated dashes', () => {
  expect(slugify('Git -- the basics')).toBe('git-the-basics');
});
`;
const T6_FINAL=`function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, '')   // drop punctuation
    .replace(/[\\s-]+/g, '-')        // spaces and dashes → one dash
    .replace(/^-|-$/g, '');          // no leading/trailing dash
}

test('lowercases and joins words with dashes', () => {
  expect(slugify('Hello World')).toBe('hello-world');
});

test('handles a single word', () => {
  expect(slugify('Docker')).toBe('docker');
});

test('strips punctuation and extra spaces', () => {
  expect(slugify('  Hello,   World!  ')).toBe('hello-world');
});

test('collapses repeated dashes', () => {
  expect(slugify('Git -- the basics')).toBe('git-the-basics');
});
`;
defineTrack({id:'testing',name:'Testing',weeks:'2 weeks',
lessons:[
{id:'t1',lvl:'Foundations',title:'Why we test & the testing pyramid',kind:'code',lang:'js',starter:T1_START,
 sum:'Automated tests are code that checks your code, so you can change things without fear. The testing pyramid: many fast unit tests (one function), fewer integration tests (pieces working together, like code plus a real database), and a few end-to-end tests (the whole app in a browser). A good test checks behaviour, fails for the right reason, and runs fast.',
 keys:['test("name", () => { ... })','expect(x).toBe(y)','unit → integration → end-to-end','red means it caught something','test behaviour, not implementation'],
 concept:`<p>Every time you change code you risk breaking something that used to work. Tests check that for you in seconds, every time.</p>
<div class="tbl-wrap"><table><tr><th>Level</th><th>Tests…</th><th>Speed</th><th>How many</th></tr>
<tr><td><b>Unit</b></td><td>One function or component in isolation</td><td>Milliseconds</td><td>Lots</td></tr>
<tr><td><b>Integration</b></td><td>Pieces together (code + real database, API + service)</td><td>Fast-ish</td><td>Some</td></tr>
<tr><td><b>End-to-end</b></td><td>The whole app through a browser, like a user</td><td>Slow</td><td>A few critical flows</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);       // arrange, act, assert
});</pre>
<p>This editor runs a Vitest/Jest-compatible test runner. The same syntax works in your real projects.</p>`,
 tasks:[
  {t:'Run the test and see it pass.',c:ctx=>allPass(ctx)},
  {t:'Break add() on purpose (make it subtract) and watch the test fail.',sol:T1_START.replace('return a + b;','return a - b;'),showSol:false,hint:'return a - b;',c:ctx=>(ctx.tests||[]).some(t=>!t.ok)},
  {t:'Fix add() and add a second test for negative numbers.',sol:T1_START+"\ntest('handles negative numbers', () => {\n  expect(add(-2, -3)).toBe(-5);\n});\n",showSol:false,hint:"test('handles negative numbers', () => { expect(add(-2, -3)).toBe(-5); });",c:ctx=>allPass(ctx)&&ctx.tests.length>=2&&/-\d/.test(ctx.code)},
  {t:'Which tests should you have the MOST of?',o:['End-to-end tests','Unit tests','Manual tests','None; tests slow you down'],a:1,e:'Unit tests are fast and precise, so you can run thousands on every change.'},
  {t:'What should a good test check?',o:['The names of private variables','Observable behaviour: given this input, expect this output or effect','That the code is long','Implementation details that might change'],a:1,e:'Tests that check behaviour survive refactoring; tests that check internals break for no reason.'},
 ]},
{id:'t2',lvl:'Unit tests',title:'Unit tests that actually catch bugs',kind:'code',lang:'js',files:{'cart.js':CART,'cart.test.js':CART_TEST_START},open:'cart.test.js',
 sum:'Unit tests check one function at a time. Cover the normal case, edge cases (an empty cart, zero) and error cases (expect(() => fn()).toThrow()). Test boundaries on both sides (49.99 and 50 for a ">= 50" rule). A test suite is only valuable if it fails when the code is wrong; mutation testing checks exactly that by introducing small bugs.',
 keys:['describe / it','happy path + edge cases','expect(() => fn()).toThrow("msg")','boundary values','Arrange-Act-Assert','mutation testing'],
 concept:`<p>Writing tests that pass is easy. Writing tests that <b>catch bugs</b> is the skill.</p>
<ul><li><b>Happy path</b>: the normal case works.</li><li><b>Edge cases</b>: empty inputs, zero, one item, huge numbers.</li><li><b>Error cases</b>: invalid input throws a clear error.</li><li><b>Boundaries</b>: for <code>total &gt;= 50</code>, test 49.99 <i>and</i> 50. Off-by-one bugs live there.</li></ul>
<pre class="snip" style="margin-bottom:12px">it('rejects unknown coupons', () => {
  expect(() => applyCoupon(80, 'BOGUS')).toThrow('Invalid coupon');
});</pre>
<div class="tip"><b>Mutation check</b>For the last task, the checker secretly changes <code>&gt;=</code> to <code>&gt;</code> in shipping() and runs your tests again. If none fail, your tests missed a bug.</div>`,
 tasks:[
  {t:'Test subtotal: a normal cart and an empty cart.',sol:{'cart.test.js':CART_TEST_SOL},showSol:false,hint:"it('is 0 for an empty cart', () => { expect(subtotal([])).toBe(0); });",c:ctx=>passing(ctx,/subtotal/).length>=2&&/subtotal\(\[\]\)/.test(ctx.code)},
  {t:'Test applyCoupon: SAVE10 takes 10% off, and unknown codes throw.',hint:"expect(() => applyCoupon(80, 'BOGUS')).toThrow('Invalid coupon');",c:ctx=>passing(ctx,/applyCoupon/).length>=2&&/toThrow/.test(ctx.code)},
  {t:'Test shipping on both sides of the $50 boundary.',hint:'expect(shipping(50)).toBe(0); expect(shipping(49.99)).toBe(4.99);',c:ctx=>passing(ctx,/shipping/).length>=2&&/shipping\(50\)/.test(ctx.code)&&/shipping\(49\.99\)/.test(ctx.code)},
  {t:'Mutation check: your tests must fail when ">=" becomes ">" in shipping().',c:async ctx=>allPass(ctx)&&await mutantFails(ctx,'total >= 50','total > 50')},
  {t:'Arrange-Act-Assert means…',o:['Three separate test files','Set up the inputs, call the code, then check the result','Write the assertion first','Run tests three times'],a:1,e:'Keeping each test in that shape makes it easy to read.'},
 ]},
{id:'t3',lvl:'Unit tests',title:'Mocks, stubs & fixtures',kind:'code',lang:'js',files:{'signup.js':T3_CODE,'signup.test.js':"import { signUp, getWeather } from './signup.js';\n\n// TODO: test signUp with fake db and mailer objects (vi.fn)\n"},open:'signup.test.js',
 sum:'Replace slow or external dependencies (email, payments, HTTP) with test doubles. vi.fn() creates a mock function that records its calls; .mockResolvedValue() makes it return a promise. Assert interactions with toHaveBeenCalledWith and not.toHaveBeenCalled(). Use beforeEach to build fresh fixtures so tests never share state. Passing dependencies in as parameters (dependency injection) is what makes code easy to test.',
 keys:['vi.fn()','.mockResolvedValue(x)','toHaveBeenCalledWith(...)','not.toHaveBeenCalled()','await expect(p).rejects.toThrow()','beforeEach fixtures','dependency injection'],
 concept:`<p>You don't want unit tests sending real emails or calling a real weather API. Replace those dependencies with <b>test doubles</b>:</p>
<pre class="snip" style="margin-bottom:12px">const mailer = { send: vi.fn().mockResolvedValue(true) };   // a mock
await signUp('ada@example.com', { db, mailer });
expect(mailer.send).toHaveBeenCalledWith('ada@example.com', 'Welcome!');</pre>
<p>Notice <code>signUp(email, { db, mailer })</code> receives its dependencies as arguments. That's <b>dependency injection</b>, and it's why this code is easy to test.</p>
<div class="tip"><b>Don't over-mock</b>Mock things you don't control (email, payments, third-party APIs). For your own database queries, a real test database (next lesson) gives far more confidence.</div>`,
 tasks:[
  {t:'Test that signUp creates the user and sends a welcome email (mock db and mailer with vi.fn).',sol:{'signup.test.js':T3_TEST_SOL},showSol:false,hint:"mailer = { send: vi.fn().mockResolvedValue(true) }; … expect(mailer.send).toHaveBeenCalledWith('ada@example.com', 'Welcome!');",c:ctx=>passing(ctx,/sign|welcome|creat/i).length>=1&&/toHaveBeenCalledWith/.test(ctx.code)&&/vi\.fn\(/.test(ctx.code)},
  {t:'Test that an invalid email is rejected and the database is never called.',hint:"await expect(signUp('nope', { db, mailer })).rejects.toThrow('Invalid email'); expect(db.createUser).not.toHaveBeenCalled();",c:ctx=>passing(ctx,/invalid|reject/i).length>=1&&/not\.toHaveBeenCalled\(\)/.test(ctx.code)},
  {t:'Test getWeather with a fake fetch: a success and an API failure.',hint:'const fakeFetch = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ temp_c: 31 }) });',c:ctx=>passing(ctx,/getWeather|temperature|fail|null/i).length>=2},
  {t:'Build fresh mocks for every test with beforeEach. All tests pass.',hint:'let db, mailer; beforeEach(() => { db = {...}; mailer = {...}; });',c:ctx=>allPass(ctx)&&ctx.tests.length>=4&&/beforeEach\(/.test(ctx.code)},
  {t:'Which dependency is the best candidate for a mock in unit tests?',o:['A pure function like add()','A payment provider API that charges real money','An array','Math.max'],a:1,e:'Mock what\'s slow, costly, non-deterministic or outside your control.'},
 ]},
{id:'t4',lvl:'Integration',title:'Integration tests with a real database',kind:'code',lang:'jsm',sqlite:true,tests:true,seed:'CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, name TEXT NOT NULL);',starter:T4_START,
 sum:'Integration tests check that pieces work together, for example your queries against a real database, catching wrong SQL, missing constraints and bad assumptions that mocks would hide. Reset state before each test (beforeEach: delete rows or wrap tests in a transaction) so tests are independent and can run in any order. In CI, run them against a throwaway database container.',
 keys:['real test database','beforeEach: reset state','independent tests','test constraints (UNIQUE)','Testcontainers / Docker in CI'],
 concept:`<p>Mocks can lie: a mocked <code>db.createUser</code> never complains about a typo in your SQL or a missing UNIQUE constraint. <b>Integration tests</b> run your code against the real thing.</p>
<pre class="snip" style="margin-bottom:12px">beforeEach(() => {
  db.run('DELETE FROM users');      // known starting state for every test
});

test('rejects duplicate emails', () => {
  createUser(db, { email: 'ada@example.com', name: 'Ada' });
  expect(() => createUser(db, { email: 'ada@example.com', name: 'Ada 2' })).toThrow('UNIQUE');
});</pre>
<p>Here <code>db</code> is a real SQLite database. In production projects you'd run Postgres in Docker (or Testcontainers) during CI.</p>
<div class="tip"><b>Independence</b>Tests that depend on each other's leftovers pass alone and fail together, or the other way round. Always reset.</div>`,
 tasks:[
  {t:'Test that a created user can be found by email (and unknown emails return null).',sol:T4_SOL,showSol:false,hint:"test('creates and finds a user', () => { createUser(db, {...}); expect(findByEmail(db, 'ada@example.com').name).toBe('Ada'); });",c:ctx=>passing(ctx,/find|creat/i).length>=1},
  {t:'Test that the database rejects duplicate emails.',hint:"expect(() => createUser(db, { email: 'ada@example.com', name: 'Ada 2' })).toThrow('UNIQUE');",c:ctx=>passing(ctx,/dup|unique/i).length>=1&&/toThrow/.test(ctx.code)},
  {t:'Test that listUsers sorts by name.',hint:"expect(listUsers(db).map((u) => u.name)).toEqual(['Alan', 'Grace']);",c:ctx=>passing(ctx,/list|sort/i).length>=1&&/toEqual/.test(ctx.code)},
  {t:'Reset the table in beforeEach so every test is independent. All tests pass.',hint:"beforeEach(() => { db.run('DELETE FROM users'); });",c:ctx=>allPass(ctx)&&ctx.tests.length>=3&&/beforeEach\(/.test(ctx.code)&&/DELETE FROM users/i.test(ctx.code)},
  {t:'A test passes alone but fails when run with the others. Most likely cause?',o:['The computer is slow','Tests share state (leftover rows) instead of resetting','JavaScript is random','Too many assertions'],a:1,e:'Shared state is the top cause of flaky, order-dependent tests.'},
 ]},
{id:'t5',lvl:'End-to-end',title:'End-to-end tests with Playwright',kind:'code',lang:'e2e',app:LOGIN_APP,starter:T5_START,filename:'login.spec.js',
 sum:'End-to-end tests drive the real app like a user: page.goto, find elements with user-facing locators (getByRole, getByLabel, getByText), act (fill, click), and assert with auto-waiting expectations (await expect(locator).toBeVisible(), toHaveText). Keep them few and focused on critical journeys like sign-up, login and checkout. Avoid fixed sleeps; auto-waiting assertions make tests stable.',
 keys:['test("...", async ({ page }) => { ... })','page.goto("/")','page.getByLabel("Email").fill(...)','page.getByRole("button", { name }).click()','await expect(locator).toBeVisible()','toHaveText','no fixed sleeps'],
 concept:`<p><b>Playwright</b> controls a real browser. Your test reads like a script of what a user does:</p>
<pre class="snip" style="margin-bottom:12px">test('logs in with valid credentials', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Email').fill('ada@example.com');
  await page.getByLabel('Password').fill('hunter22');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});</pre>
<ul><li><b>Locators</b> find elements the way users do: by role and accessible name, or by label.</li><li><b>Assertions auto-wait</b>: <code>toBeVisible()</code> retries until the element appears or a timeout passes. Never use fixed <code>waitForTimeout</code> sleeps.</li></ul>
<p>This sandbox runs a Playwright-compatible API against the login app in the preview. Logging in takes a moment, so your assertions must wait.</p>`,
 tasks:[
  {t:'Write a test that logs in with ada@example.com / hunter22 and sees the Dashboard heading.',sol:T5_SOL,showSol:false,hint:"await page.getByLabel('Email').fill('ada@example.com'); … await page.getByRole('button', { name: 'Log in' }).click(); await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();",c:ctx=>passing(ctx,/log.?in|valid/i).length>=1&&/getByRole\(/.test(ctx.code)},
  {t:'Write a test that a wrong password shows the alert "Invalid email or password".',hint:"await expect(page.getByRole('alert')).toHaveText('Invalid email or password');",c:ctx=>passing(ctx,/wrong|error|invalid/i).length>=1&&/toHaveText/.test(ctx.code)},
  {t:'Write a log-out test. All tests pass.',hint:"after logging in: await page.getByRole('button', { name: 'Log out' }).click(); then expect the Sign in heading",c:ctx=>allPass(ctx)&&ctx.tests.length>=3},
  {t:'Your E2E test sometimes fails because the page is slow. Best fix?',o:['Add await page.waitForTimeout(5000) everywhere','Use auto-waiting assertions like await expect(locator).toBeVisible()','Delete the test','Retry until it passes'],a:1,e:'Fixed sleeps are slow and still flaky. Assertions that wait for a condition are both fast and reliable.'},
 ]},
{id:'t6',lvl:'Practice',title:'Test-driven development (TDD)',kind:'code',lang:'js',starter:T6_START,
 sum:'TDD is a loop: write a small failing test (red), write the simplest code that passes (green), then clean up while the tests stay green (refactor). When requirements change, start with a new failing test. TDD gives you a test for every behaviour, a clear definition of done, and the confidence to refactor.',
 keys:['red → green → refactor','write the test first','simplest code that passes','new requirement = new failing test','refactor with tests green'],
 concept:`<div class="flow"><span>🔴 Red: a failing test</span><em>→</em><span>🟢 Green: simplest code that passes</span><em>→</em><span>🔵 Refactor: clean up, still green</span><em>↺</em></div>
<p>You'll build <code>slugify()</code> (turning <i>"Hello, World!"</i> into <i>hello-world</i> for URLs) strictly test-first:</p>
<ol><li>Write tests for the basic case. They fail, because the function returns <code>''</code>.</li><li>Make them pass with the simplest code.</li><li>A new requirement arrives (punctuation, extra spaces). Write failing tests for it <i>first</i>.</li><li>Implement it, and refactor until it's clean.</li></ol>
<div class="tip"><b>Why it works</b>Writing the test first forces you to decide what "done" means before you write any code.</div>`,
 tasks:[
  {t:'Red: write two tests for slugify and watch them fail.',sol:T6_RED,showSol:false,hint:"test('lowercases and joins words with dashes', () => { expect(slugify('Hello World')).toBe('hello-world'); });",c:ctx=>(ctx.tests||[]).length>=2&&ctx.tests.every(t=>!t.ok)&&/return ''/.test(ctx.code)},
  {t:'Green: make them pass with the simplest code.',sol:T6_GREEN,showSol:false,hint:"return title.toLowerCase().split(' ').join('-');",c:ctx=>allPass(ctx)&&ctx.tests.length>=2},
  {t:'New requirement. Red again: write failing tests for punctuation, extra spaces and repeated dashes.',sol:T6_RED2,showSol:false,hint:"expect(slugify('  Hello,   World!  ')).toBe('hello-world');",c:ctx=>(ctx.tests||[]).length>=4&&ctx.tests.some(t=>!t.ok)&&ctx.tests.some(t=>t.ok)},
  {t:'Green and refactor: implement it cleanly so all four tests pass.',sol:T6_FINAL,showSol:false,hint:"title.toLowerCase().trim().replace(/[^a-z0-9\\s-]/g, '').replace(/[\\s-]+/g, '-')",c:ctx=>allPass(ctx)&&ctx.tests.length>=4},
  {t:'What is the main benefit of writing the test first?',o:['Fewer lines of code','You define "done" up front and end up with a test for every behaviour','It is required by JavaScript','Tests run faster'],a:1,e:'The tests become a precise spec, and a safety net for every later change.'},
 ]},
],
quizzes:{testing:[
 {q:'The testing pyramid recommends…',o:['Mostly end-to-end tests','Many unit tests, fewer integration tests, few E2E tests','Only manual testing','Equal numbers of each'],a:1,e:'Fast tests at the base, slow ones at the top.'},
 {q:'Your shipping rule is "free from $50". Which pair of tests is best?',o:['$10 and $100','$49.99 and $50','$0 and $1000','$50 twice'],a:1,e:'Test right at the boundary.'},
 {q:'What does vi.fn() give you?',o:['A real function','A mock function that records calls and can return what you choose','A random number','A test runner'],a:1,e:'Then assert with toHaveBeenCalledWith.'},
 {q:'Why reset the database in beforeEach?',o:['Speed','So tests are independent and order doesn\'t matter','It\'s required by SQL','To save disk space'],a:1,e:'Leftover state causes flaky tests.'},
 {q:'Best Playwright locator for a "Save" button?',o:["page.locator('.btn-primary-2')","page.getByRole('button', { name: 'Save' })","page.locator('div > div > button')","page.getByTestId('x')"],a:1,e:'Role + accessible name matches how users find it and survives CSS changes.'},
 {q:'In TDD, what do you write first?',o:['The implementation','A failing test','Documentation','The UI'],a:1,e:'Red, then green, then refactor.'},
]},
real:[
 {id:'test-r1',t:'Add Vitest to a project',p:'Install Vitest in one of your JS/TS projects and write five unit tests.',s:'npm install -D vitest\nnpx vitest'},
 {id:'test-r2',t:'Write integration tests against a test database',p:'Run Postgres in Docker for tests and write tests for your data layer.',s:'docker run -d --name test-db -e POSTGRES_PASSWORD=test -p 5433:5432 postgres:16'},
 {id:'test-r3',t:'Set up Playwright',p:'Add Playwright and write a login end-to-end test for one of your apps. Try the codegen recorder.',s:'npm init playwright@latest\nnpx playwright codegen http://localhost:3000\nnpx playwright test --ui'},
 {id:'test-r4',t:'Run tests in CI',p:'Add npm test (and Playwright) to your GitHub Actions workflow so every PR is checked.',s:'# .github/workflows/ci.yml\n- run: npm ci\n- run: npm test\n- run: npx playwright install --with-deps && npx playwright test'},
]});
})();
