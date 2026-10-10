/* Projects: Testing */
(()=>{
const passing=(ctx,re)=>(ctx.tests||[]).filter(t=>t.ok&&(!re||re.test(t.name)));
const allPass=ctx=>ctx.tests&&ctx.tests.length>0&&ctx.tests.every(t=>t.ok);
async function mutantFails(code,from,to){if(!code||!code.includes(from))return false;const r=await runInWorker(prepJS(code.replace(from,to)),{},'',4000);return !!(r.tests&&r.tests.some(t=>!t.ok))}

/* ---------- guided: password + register ---------- */
const PASSWORD=`export function strength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return ['very weak', 'weak', 'okay', 'strong', 'very strong'][score];
}
`;
const REGISTER=`import { strength } from './password.js';

export async function register(email, password, { users, mailer }) {
  if (!email.includes('@')) throw new Error('Invalid email');
  if (['very weak', 'weak'].includes(strength(password))) throw new Error('Password too weak');
  if (await users.findByEmail(email)) throw new Error('Email already registered');
  const user = await users.create({ email });
  await mailer.send(email, 'Welcome aboard!');
  return user;
}
`;
const HEAD=`import { strength } from './password.js';
import { register } from './register.js';
`;
const S1=`
describe('strength', () => {
  test('strength: a short lowercase password is very weak', () => {
    expect(strength('abc')).toBe('very weak');
  });

  test('strength: long, mixed, with digits and symbols is very strong', () => {
    expect(strength('Tr0ub4dor&3')).toBe('very strong');
  });
});
`;
const S2=`
const cases = [
  ['abcdefgh', 'weak'],
  ['Abcdefgh', 'okay'],
  ['Abcdefg1', 'strong'],
  ['abc!', 'weak'],
  ['A1!', 'strong'],
];

for (const [pw, expected] of cases) {
  test(\`strength: "\${pw}" is \${expected}\`, () => {
    expect(strength(pw)).toBe(expected);
  });
}
`;
const S3=`
test('strength: 7 characters do not earn the length point, 8 do', () => {
  expect(strength('abcdefg')).toBe('very weak');
  expect(strength('abcdefgh')).toBe('weak');
});
`;
const S4=`
let users, mailer;

beforeEach(() => {
  users = {
    findByEmail: vi.fn().mockResolvedValue(null),
    create: vi.fn().mockResolvedValue({ id: 1, email: 'ada@example.com' }),
  };
  mailer = { send: vi.fn().mockResolvedValue(true) };
});

test('register: creates the user and sends a welcome email', async () => {
  const user = await register('ada@example.com', 'Str0ng!pass', { users, mailer });
  expect(user.id).toBe(1);
  expect(users.create).toHaveBeenCalledWith({ email: 'ada@example.com' });
  expect(mailer.send).toHaveBeenCalledWith('ada@example.com', 'Welcome aboard!');
});
`;
const S5=`
test('register: rejects a duplicate email and never creates a user', async () => {
  users.findByEmail.mockResolvedValue({ id: 7 });
  await expect(register('ada@example.com', 'Str0ng!pass', { users, mailer })).rejects.toThrow('already registered');
  expect(users.create).not.toHaveBeenCalled();
  expect(mailer.send).not.toHaveBeenCalled();
});

test('register: rejects a weak password before touching the database', async () => {
  await expect(register('ada@example.com', 'password', { users, mailer })).rejects.toThrow('too weak');
  expect(users.findByEmail).not.toHaveBeenCalled();
});
`;
const F=t=>({'password.js':PASSWORD,'register.js':REGISTER,'auth.test.js':t});

/* ---------- solo: invoices ---------- */
const INV_BUGGY=`export function lineTotal(item) {
  return item.price * item.qty;
}

export function invoiceTotal(items, discountPercent = 0) {
  const subtotal = items.reduce((sum, item) => sum + lineTotal(item), 0);
  return subtotal - discountPercent;
}

export function dueDate(issued, days = 30) {
  const d = new Date(issued + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days - 1);
  return d.toISOString().slice(0, 10);
}

export function formatMoney(amount) {
  return '$' + amount.toFixed(2);
}
`;
const FIX={total:['  return subtotal - discountPercent;','  return Math.round(subtotal * (1 - discountPercent / 100) * 100) / 100;'],due:['d.getUTCDate() + days - 1','d.getUTCDate() + days'],money:["return '$' + amount.toFixed(2);","return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });"]};
const INV_FIXED=Object.values(FIX).reduce((s,[a,b])=>s.replace(a,()=>b),INV_BUGGY);
const withBug=k=>Object.entries(FIX).reduce((s,[n,[a,b]])=>n===k?s:s.replace(a,()=>b),INV_BUGGY);
const INV_TEST_START=`import { lineTotal, invoiceTotal, dueDate, formatMoney } from './invoice.js';

// Write tests from the spec in the brief. Some will fail: those are the bugs.
`;
const INV_TESTS=`import { lineTotal, invoiceTotal, dueDate, formatMoney } from './invoice.js';

const items = [
  { name: 'Design', price: 100, qty: 2 },
  { name: 'Hosting', price: 19.99, qty: 3 },
];

describe('lineTotal', () => {
  test('lineTotal multiplies price by quantity', () => {
    expect(lineTotal({ price: 19.99, qty: 3 })).toBeCloseTo(59.97);
  });
});

describe('invoiceTotal', () => {
  test('invoiceTotal with no discount is the sum of the lines', () => {
    expect(invoiceTotal(items)).toBe(259.97);
  });
  test('invoiceTotal applies the discount as a percentage', () => {
    expect(invoiceTotal([{ price: 100, qty: 2 }], 10)).toBe(180);
  });
  test('invoiceTotal rounds to cents', () => {
    expect(invoiceTotal([{ price: 19.99, qty: 3 }], 15)).toBe(50.97);
  });
});

describe('dueDate', () => {
  test('dueDate adds exactly the number of days', () => {
    expect(dueDate('2026-01-25', 30)).toBe('2026-02-24');
  });
  test('dueDate crosses the year boundary', () => {
    expect(dueDate('2026-12-31', 1)).toBe('2027-01-01');
  });
});

describe('formatMoney', () => {
  test('formatMoney adds a thousands separator and two decimals', () => {
    expect(formatMoney(1234.5)).toBe('$1,234.50');
  });
  test('formatMoney formats zero', () => {
    expect(formatMoney(0)).toBe('$0.00');
  });
});
`;
const testFile=()=>((BENCH.code.files||{})['invoice.test.js']||'');
const catches=async k=>{const t=testFile();if(!/\b(test|it)\s*\(/.test(t))return false;const r=await runInWorker(prepJS(withBug(k)+'\n'+t),{},'',4000);return !!(r.tests&&r.tests.some(x=>!x.ok))};

defineProjects('testing',{
guided:{title:'Test a sign-up flow: units, edges and mocks',kind:'code',lang:'js',files:F(HEAD),open:'auth.test.js',
 pitch:'Write unit tests, table-driven cases and boundary tests for a password checker, then test an async sign-up function with mocks for the database and mailer.',
 brief:`<p>Your team is about to refactor sign-up. Before anyone touches it, you'll write the tests that keep the refactor safe. <code>password.js</code> scores password strength and <code>register.js</code> signs users up using a database and a mailer passed in as arguments.</p>
<p>Read both files first. Write your tests in <code>auth.test.js</code> and press <b>Run</b>. Test results appear under Output.</p>
<div class="tip"><b>Goal</b>A suite that covers normal cases, boundaries and failure paths, kills a mutant, and runs without a real database or email server.</div>`,
 tasks:[
 {t:'Write two strength() tests: one very weak password and one very strong one.',why:'Each test has three parts: <b>arrange</b> (the input), <b>act</b> (call the function) and <b>assert</b> (<code>expect</code>). Start the name with the function, so a failure says what broke: "strength: a short lowercase password is very weak".',code:S1.trim(),sol:F(HEAD+S1),c:ctx=>passing(ctx,/strength/i).length>=2},
 {t:'Cover more cases with a table-driven test.',why:'When only the input and the expected output change, put the cases in an array and loop over it. Adding a case becomes a one-line change, and each case still reports as its own test.',code:S2.trim(),sol:F(HEAD+S1+S2),c:ctx=>passing(ctx,/strength/i).length>=6&&/for\s*\(\s*const\s*\[/.test(ctx.code)},
 {t:'Pin the boundary: 7 characters vs 8. Your tests must fail if >= 8 becomes > 8.',why:'Bugs cluster at boundaries. A <b>mutation check</b> changes the code on purpose (<code>&gt;=</code> to <code>&gt;</code>) and asks whether any test notices. If none fails, your tests aren\'t really testing that line.',code:S3.trim(),sol:F(HEAD+S1+S2+S3),c:async ctx=>allPass(ctx)&&await mutantFails(ctx.code,'pw.length >= 8','pw.length > 8')},
 {t:'Test register() with mocked users and mailer objects.',why:'A real database or email server makes tests slow and flaky. <code>vi.fn()</code> creates fakes that record their calls. <code>mockResolvedValue</code> makes them return a promise, like the real async functions. Then you assert <b>what was called with what</b>. A fresh set in <code>beforeEach</code> stops tests from leaking state into each other.',code:S4.trim(),sol:F(HEAD+S1+S2+S3+S4),c:ctx=>passing(ctx,/register/i).length>=1&&/vi\.fn\(/.test(ctx.code)&&/toHaveBeenCalledWith/.test(ctx.code)&&/beforeEach\(/.test(ctx.code)},
 {t:'Test the failure paths: a duplicate email and a weak password both reject, and nothing gets written.',why:'The happy path is the part that usually works. Checking that <code>create</code> and <code>send</code> were <b>not</b> called proves the function stops early and doesn\'t half-register a user. <code>await expect(promise).rejects.toThrow()</code> tests async errors.',code:S5.trim(),sol:F(HEAD+S1+S2+S3+S4+S5),c:ctx=>allPass(ctx)&&passing(ctx,/register/i).length>=3&&/rejects\.toThrow/.test(ctx.code)&&/not\.toHaveBeenCalled\(\)/.test(ctx.code)},
 ]},
solo:{title:'Find and fix the bugs in an invoicing module',kind:'code',lang:'js',files:{'invoice.js':INV_BUGGY,'invoice.test.js':INV_TEST_START},open:'invoice.test.js',
 pitch:'A finance module has three bugs and no tests. Write tests from the spec that expose them, fix the code, and prove your tests would catch each bug if it came back.',
 brief:`<p>Customers are complaining about wrong invoices. <code>invoice.js</code> has no tests. Here is the <b>spec</b> the module is supposed to follow:</p>
<ul><li><code>lineTotal(item)</code>: <code>price × qty</code>.</li><li><code>invoiceTotal(items, discountPercent = 0)</code>: the sum of the line totals, reduced by <code>discountPercent</code> <b>percent</b> and rounded to cents. Two lines totalling 200 with 10 gives <code>180</code>.</li><li><code>dueDate(issued, days = 30)</code>: the date exactly <code>days</code> days after <code>issued</code>, as <code>YYYY-MM-DD</code>. <code>dueDate('2026-01-25', 30)</code> is <code>'2026-02-24'</code>.</li><li><code>formatMoney(amount)</code>: a dollar sign, thousands separators and two decimals. <code>formatMoney(1234.5)</code> is <code>'$1,234.50'</code>.</li></ul>
<p>Work like a professional: write tests from the spec <b>first</b> in <code>invoice.test.js</code>, watch the failing ones point at the bugs, then fix <code>invoice.js</code>. The review re-introduces each bug, one at a time, to check that your tests would catch a regression.</p>`,
 tasks:[
 {t:'invoiceTotal applies the discount as a percentage, rounded to cents.',x:'invoiceTotal([{ price: 100, qty: 2 }], 10) === 180 && invoiceTotal([{ price: 19.99, qty: 3 }], 15) === 50.97 && invoiceTotal([{ price: 5, qty: 1 }]) === 5',
  miss:'invoiceTotal is still wrong. With 200 and a 10% discount it must return 180. A 10% discount means multiplying by (1 - 10 / 100), not subtracting 10. Then round to cents: Math.round(x * 100) / 100.'},
 {t:'dueDate adds exactly the given number of days.',x:"dueDate('2026-01-25', 30) === '2026-02-24' && dueDate('2026-12-31', 1) === '2027-01-01' && dueDate('2026-03-01') === '2026-03-31'",
  miss:'dueDate is still off. dueDate(\'2026-01-25\', 30) must be \'2026-02-24\'. Look for an off-by-one: adding days - 1 instead of days.'},
 {t:'formatMoney adds thousands separators and two decimals.',x:"formatMoney(1234.5) === '$1,234.50' && formatMoney(0) === '$0.00' && formatMoney(1000000) === '$1,000,000.00'",
  miss:'formatMoney(1234.5) must be \'$1,234.50\'. toFixed(2) doesn\'t add separators. Use toLocaleString(\'en-US\', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) or Intl.NumberFormat.'},
 {t:'Your tests catch the discount bug if it comes back.',c:()=>catches('total'),
  miss:'With the original discount bug put back, all your tests still passed, so this bug could come back unnoticed. Add a test that calls invoiceTotal with a non-zero discount and checks the exact result.'},
 {t:'Your tests catch the due-date bug if it comes back.',c:()=>catches('due'),
  miss:'With the off-by-one put back in dueDate, none of your tests failed. Assert an exact date for a known input, like dueDate(\'2026-01-25\', 30).'},
 {t:'Your tests catch the money-formatting bug if it comes back.',c:()=>catches('money'),
  miss:'With the old formatMoney put back, no test failed. Test an amount of 1,000 or more, where the separator matters.'},
 {t:'All tests pass: at least 6, covering all four functions.',c:ctx=>allPass(ctx)&&ctx.tests.length>=6&&['lineTotal','invoiceTotal','dueDate','formatMoney'].every(f=>new RegExp('\\b'+f+'\\s*\\(').test(testFile())),
  miss:ctx=>{const t=ctx.tests||[];if(!t.length)return 'No tests ran. Write test(\'…\', () => { expect(…).toBe(…) }) in invoice.test.js.';const fail=t.filter(x=>!x.ok);if(fail.length)return 'Still failing: '+fail.map(x=>x.name).join('; ')+'. If the test matches the spec, fix the code. If the test is wrong, fix the test.';const missing=['lineTotal','invoiceTotal','dueDate','formatMoney'].filter(f=>!new RegExp('\\b'+f+'\\s*\\(').test(testFile()));if(missing.length)return 'No tests call: '+missing.join(', ')+'.';return 'You have '+t.length+' tests. Write at least 6: normal cases and edge cases for every function.'}},
 ],
 warn:[
  {c:()=>/toBe\(\s*\d+\.\d{3,}/.test(testFile()),m:'You compare floating-point results with toBe and many decimals. For money, round to cents in the code. For other floats, use toBeCloseTo.'},
  {c:()=>/(test|it)\(\s*['"`](test|works|it works|test \d+)['"`]/i.test(testFile()),m:'Some test names (like "works" or "test 1") don\'t say what behaviour they protect. When one fails at 2 a.m., the name is all you see.'},
  {c:()=>/\.(only|skip)\(/.test(testFile()),m:'You left .only or .skip in the tests. In CI that silently disables the rest of the suite.'},
 ],
 ref:[{sol:{'invoice.js':INV_FIXED,'invoice.test.js':INV_TESTS}}]},
});
})();
