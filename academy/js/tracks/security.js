/* Track 11: Web security */
(()=>{
const O=()=>OPS.st,H=re=>OPS.Hx(re),F=p=>OPS.file(p)||'';
const hash=pw=>{let h=0;for(const c of String(pw))h=(h*131+c.charCodeAt(0))>>>0;return 'h$'+h.toString(16)};
const USERS_SEED=`CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, role TEXT NOT NULL);
INSERT INTO users VALUES (1, 'ada@example.com', '${hash('correct horse')}', 'admin'), (2, 'grace@example.com', '${hash('navy-cobol-1959')}', 'member'), (3, 'alan@example.com', '${hash('enigma')}', 'member');`;
const X2_START=`// db.query(sql, params) runs SQL against a real users table.
// hash(password) is the app's password-hashing function.

function login(email, password) {
  const sql = "SELECT id, email, role FROM users WHERE email = '" + email +
              "' AND password_hash = '" + hash(password) + "'";
  return db.query(sql)[0] || null;
}

function searchUsers(term) {
  return db.query("SELECT id, email FROM users WHERE email LIKE '%" + term + "%'");
}

// 1. Attack: log in as an admin WITHOUT knowing any password.
console.log(login("ada@example.com", "wrong guess"));
`;
const X2_ATTACK=X2_START+`console.log(login("' OR '1'='1' --", "anything"));
`;
const X2_SOL=`// db.query(sql, params) runs SQL against a real users table.
// hash(password) is the app's password-hashing function.

function login(email, password) {
  const rows = db.query(
    'SELECT id, email, role FROM users WHERE email = ? AND password_hash = ?',
    [email, hash(password)]
  );
  return rows[0] || null;
}

function searchUsers(term) {
  return db.query('SELECT id, email FROM users WHERE email LIKE ?', ['%' + term + '%']);
}

console.log(login("' OR '1'='1' --", "anything"));       // null now
console.log(login("ada@example.com", "correct horse"));   // the real login still works
console.log(searchUsers("grace"));
`;
const X3_START=`<h1>Guestbook</h1>
<form id="f">
  <input id="msg" placeholder="Leave a comment" style="width:70%">
  <button>Post</button>
</form>
<ul id="comments"></ul>

<script>
document.getElementById('f').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = document.getElementById('msg').value;
  const li = document.createElement('li');
  li.innerHTML = text;   // ⚠ renders whatever the user typed as HTML
  document.getElementById('comments').append(li);
  document.getElementById('msg').value = '';
});
</script>`;
const PAYLOAD=`<img src=x onerror="document.title='hacked'">`;
const X3_SOL=`<h1>Guestbook</h1>
<form id="f">
  <input id="msg" placeholder="Leave a comment" style="width:70%">
  <button>Post</button>
</form>
<ul id="comments"></ul>

<script>
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

document.getElementById('f').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = document.getElementById('msg').value;
  const li = document.createElement('li');
  li.textContent = text;   // safe: always treated as plain text
  document.getElementById('comments').append(li);
  document.getElementById('msg').value = '';
});
</script>`;
const JWT_PRELUDE=`const __enc = new TextEncoder();
const __b64url = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
const __b64urlStr = (s) => __b64url(__enc.encode(s));
async function __sign(payload, secret) {
  const header = __b64urlStr(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = __b64urlStr(JSON.stringify(payload));
  const key = await crypto.subtle.importKey('raw', __enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, __enc.encode(header + '.' + body));
  return header + '.' + body + '.' + __b64url(sig);
}
const SECRET = 'correct-horse-battery-staple';
const NOW = 1791600000;
const VALID = await __sign({ sub: '42', role: 'user', exp: NOW + 3600 }, SECRET);
const EXPIRED = await __sign({ sub: '42', role: 'user', exp: NOW - 60 }, SECRET);
const TAMPERED = (() => { const p = VALID.split('.'); return p[0] + '.' + __b64urlStr(JSON.stringify({ sub: '42', role: 'admin', exp: NOW + 3600 })) + '.' + p[2]; })();`;
const X4_START=`// A JWT is three base64url parts: header.payload.signature
// Ready for you: VALID, EXPIRED and TAMPERED tokens, the server's SECRET, and NOW (seconds).
console.log(VALID);

// 1. decodeJwt(token): return the payload object (decode the middle part)
function decodeJwt(token) {
}

// 2. isExpired(payload, now): true if payload.exp is not in the future
function isExpired(payload, now) {
}

// 3. verifyJwt(token, secret, now): recompute the HMAC-SHA256 signature of "header.payload".
//    Return the payload if it matches and isn't expired, otherwise null.
async function verifyJwt(token, secret, now) {
}
`;
const X4_SOL=`function decodeJwt(token) {
  const part = token.split('.')[1];
  const json = atob(part.replace(/-/g, '+').replace(/_/g, '/'));
  return JSON.parse(json);
}

function isExpired(payload, now) {
  return payload.exp <= now;
}

async function verifyJwt(token, secret, now) {
  const [header, body, signature] = token.split('.');
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(header + '.' + body));
  const expected = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
  if (expected !== signature) return null;
  const payload = decodeJwt(token);
  if (isExpired(payload, now)) return null;
  return payload;
}

console.log(decodeJwt(VALID));
console.log(await verifyJwt(TAMPERED, SECRET, NOW));
`;
const X5_START=`const invoices = [
  { id: 1, ownerId: 'u1', amount: 120 },
  { id: 2, ownerId: 'u2', amount: 75 },
  { id: 3, ownerId: 'u1', amount: 300 },
];

// req = { user: { id, role } | null, params: { id } }
// Return { status, body }
function getInvoice(req) {
  const invoice = invoices.find((i) => i.id === Number(req.params.id));
  if (!invoice) return { status: 404, body: { error: 'Not found' } };
  return { status: 200, body: invoice };
}

function listInvoices(req) {
  return { status: 200, body: invoices };
}

// 1. Prove the bug: user u2 can read invoice 1, which belongs to u1.
`;
const X5_SOL=`const invoices = [
  { id: 1, ownerId: 'u1', amount: 120 },
  { id: 2, ownerId: 'u2', amount: 75 },
  { id: 3, ownerId: 'u1', amount: 300 },
];

function getInvoice(req) {
  if (!req.user) return { status: 401, body: { error: 'Log in first' } };
  const invoice = invoices.find((i) => i.id === Number(req.params.id));
  if (!invoice) return { status: 404, body: { error: 'Not found' } };
  const isOwner = invoice.ownerId === req.user.id;
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) return { status: 403, body: { error: 'Forbidden' } };
  return { status: 200, body: invoice };
}

function listInvoices(req) {
  if (!req.user) return { status: 401, body: { error: 'Log in first' } };
  const visible = req.user.role === 'admin'
    ? invoices
    : invoices.filter((i) => i.ownerId === req.user.id);
  return { status: 200, body: visible };
}

console.log(getInvoice({ user: { id: 'u2', role: 'member' }, params: { id: '1' } }));
`;
defineTrack({id:'security',name:'Web security',weeks:'2 weeks',
lessons:[
{id:'x1',lvl:'Foundations',title:'The OWASP Top 10',kind:'none',
 sum:'The OWASP Top 10 lists the most critical web application security risks, including broken access control, cryptographic failures, injection, insecure design, security misconfiguration, vulnerable or outdated components, authentication failures, software and data integrity failures, logging and monitoring failures, and server-side request forgery (SSRF). Learn to recognize each in real code and real incidents.',
 keys:['Broken access control','Injection','Cryptographic failures','Security misconfiguration','Vulnerable components','Logging & monitoring failures'],
 concept:`<p><b>OWASP</b> (the Open Worldwide Application Security Project) publishes the <b>Top 10</b>: the risks behind most real-world breaches. The 2021 edition is shown here; OWASP revises the list every few years, and the core ideas stay the same.</p>
<div class="tbl-wrap"><table><tr><th>#</th><th>Risk</th><th>In plain words</th></tr>
<tr><td>A01</td><td>Broken Access Control</td><td>Users can see or change things that aren't theirs</td></tr>
<tr><td>A02</td><td>Cryptographic Failures</td><td>Weak or no encryption or hashing (plain-text passwords, HTTP)</td></tr>
<tr><td>A03</td><td>Injection</td><td>Untrusted input runs as SQL, shell or HTML/JS (XSS)</td></tr>
<tr><td>A04</td><td>Insecure Design</td><td>The design itself is unsafe (no rate limits, no abuse cases)</td></tr>
<tr><td>A05</td><td>Security Misconfiguration</td><td>Default passwords, debug mode on, open storage buckets</td></tr>
<tr><td>A06</td><td>Vulnerable &amp; Outdated Components</td><td>Old libraries with known holes</td></tr>
<tr><td>A07</td><td>Identification &amp; Authentication Failures</td><td>Weak logins, no MFA, sessions that never expire</td></tr>
<tr><td>A08</td><td>Software &amp; Data Integrity Failures</td><td>Unverified updates, supply-chain attacks</td></tr>
<tr><td>A09</td><td>Logging &amp; Monitoring Failures</td><td>Attacks happen and nobody notices</td></tr>
<tr><td>A10</td><td>Server-Side Request Forgery</td><td>Tricking your server into fetching internal URLs</td></tr></table></div>
<p>The next lessons let you <b>attack and then fix</b> the most common ones, in sandboxes built for that. Only test systems you own or have written permission to test.</p>`,
 tasks:[
  {t:'Changing /invoices/1042 to /invoices/1043 in the URL shows someone else\'s invoice.',o:['Injection','Broken access control','Cryptographic failure','Misconfiguration'],a:1,e:'The server never checked that the invoice belongs to the logged-in user. This is also called IDOR (insecure direct object reference).'},
  {t:'The login query is built by gluing the email into a SQL string.',o:['Injection','Insecure design','SSRF','Logging failure'],a:0,e:'User input became part of the SQL code.'},
  {t:'Passwords are stored as unsalted MD5 hashes.',o:['Misconfiguration','Cryptographic failures','Vulnerable components','Access control'],a:1,e:'MD5 is fast and broken for passwords. Use bcrypt, scrypt or argon2.'},
  {t:'The admin panel still uses admin/admin and the production site shows stack traces.',o:['Security misconfiguration','Injection','Integrity failure','SSRF'],a:0,e:'Defaults and debug output in production give attackers a head start.'},
  {t:'The app runs a library version with a public CVE.',o:['Insecure design','Vulnerable and outdated components','Authentication failure','Logging failure'],a:1,e:'Keep dependencies updated; npm audit, Dependabot and Renovate help.'},
  {t:'Attackers tried 50,000 passwords last month and nobody noticed.',o:['Logging and monitoring failures','Injection','Cryptographic failures','SSRF'],a:0,e:'Log failed logins, alert on spikes, and add rate limiting.'},
 ]},
{id:'x2',lvl:'Injection',title:'SQL injection: attack & defend',kind:'code',lang:'jsm',sqlite:true,seed:USERS_SEED,envExtra:()=>({hash}),starter:X2_START,
 sum:'SQL injection happens when user input is concatenated into a query, so input like \' OR \'1\'=\'1\' -- rewrites the SQL itself and can log an attacker in as anyone or dump tables. The fix is parameterized queries: put ? placeholders in the SQL and pass the values separately, including LIKE patterns. Never build SQL with string concatenation, and give the app\'s database user only the permissions it needs.',
 keys:["' OR '1'='1' --",'string concatenation = injection','db.query("... WHERE email = ?", [email])','LIKE ? with "%" + term + "%"','least-privilege DB user'],
 concept:`<p>Look at the query <code>login()</code> builds when the email is <code>' OR '1'='1' --</code>:</p>
<pre class="snip" style="margin-bottom:12px">SELECT id, email, role FROM users
WHERE email = '' OR '1'='1' --' AND password_hash = '…'
                 ^^^^^^^^^^ always true   ^^ the rest is a comment</pre>
<p>The input <i>changed the SQL</i>. The query returns the first user, often the admin.</p>
<h4>The fix: parameters</h4>
<pre class="snip" style="margin-bottom:12px">db.query('SELECT … WHERE email = ? AND password_hash = ?', [email, hash(password)]);</pre>
<p>With placeholders, the database receives the SQL and the values separately, so input can never become code. Escaping by hand is error-prone; parameters are the rule.</p>
<div class="tip"><b>Ethics</b>You're attacking a sandbox built for this. Only test real systems you own or have written permission to test.</div>`,
 tasks:[
  {t:'Attack: log in as the admin without a password by crafting the email.',sol:X2_ATTACK,showSol:false,hint:`console.log(login("' OR '1'='1' --", "anything"));`,c:ctx=>(ctx.logs||[]).some(l=>/admin/.test(l))&&/--/.test(ctx.code)},
  {t:'Fix login() with a parameterized query. The attack returns null; the real password still works.',sol:X2_SOL,showSol:false,hint:"db.query('SELECT id, email, role FROM users WHERE email = ? AND password_hash = ?', [email, hash(password)])",x:`login("' OR '1'='1' --", "x") === null && login("ada@example.com' --", "x") === null && (login("ada@example.com", "correct horse") || {}).role === "admin"`,c:ctx=>!/["']\s*\+\s*email/.test(ctx.code)},
  {t:'Fix searchUsers() too: the LIKE pattern goes in as a parameter.',hint:"db.query('SELECT id, email FROM users WHERE email LIKE ?', ['%' + term + '%'])",x:`searchUsers("grace").length === 1 && searchUsers("%' OR 1=1 --").length === 0`,c:ctx=>!/LIKE\s+'%["']\s*\+\s*term/.test(ctx.code)},
  {t:'Why are parameters better than escaping quotes yourself?',o:['They\'re shorter','Values are sent separately from the SQL, so there is no escaping to get wrong','Escaping is illegal','Parameters encrypt data'],a:1,e:'Manual escaping has decades of edge-case bypasses. Placeholders remove the whole problem.'},
  {t:'The app\'s database user can DROP tables. Why does that matter for injection?',o:['It doesn\'t','If an injection slips through, a least-privilege user limits the damage','DROP makes queries faster','Only admins can be injected'],a:1,e:'Defense in depth: give the app only the permissions it actually needs.'},
 ]},
{id:'x3',lvl:'Injection',title:'Cross-site scripting (XSS)',kind:'code',lang:'web',starter:X3_START,
 sum:'XSS happens when untrusted text is inserted into a page as HTML, so an attacker\'s markup runs as JavaScript in other users\' browsers and can steal sessions or act as them. Treat user input as text: use textContent (or a framework\'s escaped {} output), escape &, <, >, " and \' when you must build HTML, avoid innerHTML and dangerouslySetInnerHTML with user data, and add a Content Security Policy as a second layer.',
 keys:['innerHTML with user data = XSS','textContent is safe','React {} escapes by default','dangerouslySetInnerHTML','escape & < > " \'','Content-Security-Policy','httpOnly cookies limit damage'],
 concept:`<p>The guestbook renders comments with <code>innerHTML</code>. That means a "comment" can contain HTML, including HTML that runs code:</p>
<pre class="snip" style="margin-bottom:12px">${PAYLOAD.replace(/</g,'&lt;')}</pre>
<p>The image fails to load, <code>onerror</code> fires, and the attacker's JavaScript runs in every visitor's browser. Real attacks steal tokens or perform actions as the victim.</p>
<h4>Defenses</h4>
<ul><li><b>Output as text</b>: <code>textContent</code>, or React/Vue's <code>{value}</code>, which escape automatically.</li><li><b>Escape</b> when you truly must build HTML strings: <code>&amp; &lt; &gt; &quot; &#39;</code>.</li><li><b>Never</b> pass user data to <code>innerHTML</code>, <code>document.write</code> or <code>dangerouslySetInnerHTML</code> unless it has been sanitized (for example with DOMPurify).</li><li><b>Content-Security-Policy</b> headers block inline scripts as a backup layer.</li></ul>`,
 tasks:[
  {t:'Attack: run the page, paste the payload below into the box, and post it. Watch the tab title change to "hacked".',hint:PAYLOAD,live:true,act:async ctx=>{await ctx.type('#msg',PAYLOAD);ctx.$('#f').requestSubmit();await sleep(300)},c:ctx=>!!ctx.doc&&ctx.doc.title==='hacked'},
  {t:'Fix it: render comments with textContent. The same payload now shows up as plain text.',sol:X3_SOL,showSol:false,hint:'li.textContent = text;',c:async ctx=>{const before=ctx.doc.title;await ctx.type('#msg',PAYLOAD);ctx.$('#f').requestSubmit();await sleep(300);const li=ctx.$$('#comments li').pop();return ctx.doc.title!=='hacked'&&li&&li.textContent.includes('onerror')&&!ctx.$('#comments img')&&!/\.innerHTML\s*=\s*text/.test(ctx.code)}},
  {t:'Write escapeHtml(s) that escapes & < > " and \' for when you must build HTML strings.',hint:"return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;');",c:ctx=>{const f=ctx.win&&ctx.win.escapeHtml;if(typeof f!=='function')return false;return f('<img src=x>')==='&lt;img src=x&gt;'&&f('"a" & \'b\'')==='&quot;a&quot; &amp; &#39;b&#39;'}},
  {t:'In React, which line is dangerous with user input?',o:['<p>{comment}</p>','<p dangerouslySetInnerHTML={{ __html: comment }} />','<p title={comment}>','<input value={comment} />'],a:1,e:'React escapes {} output. dangerouslySetInnerHTML opts out of that protection.'},
  {t:'What does a Content-Security-Policy header add?',o:['It replaces escaping','A second layer: the browser refuses to run scripts the policy doesn\'t allow, even if an injection slips through','It encrypts the page','It blocks SQL injection'],a:1,e:'Escape first; CSP limits the damage when a mistake happens.'},
 ]},
{id:'x4',lvl:'Authentication',title:'Sessions, JWTs & passwords',kind:'code',lang:'js',prelude:JWT_PRELUDE,starter:X4_START,
 sum:'A JWT is header.payload.signature in base64url. Anyone can decode the payload, so it is signed, not encrypted: never put secrets in it. The server verifies it by recomputing the HMAC signature with its secret key and rejecting mismatches (tampering) and expired tokens (exp). Store session tokens in httpOnly, secure cookies, and hash passwords with a slow algorithm (bcrypt, scrypt, argon2), never plain text or MD5.',
 keys:['header.payload.signature','base64url ≠ encryption','HMAC-SHA256 signature','check exp','reject tampered tokens','httpOnly secure cookies','bcrypt / argon2 for passwords'],
 concept:`<p>After you log in, the server needs to remember you. Two common approaches:</p>
<ul><li><b>Session ID</b> in a cookie, with session data stored on the server.</li><li><b>JWT (JSON Web Token)</b>: the data itself, signed so it can't be changed.</li></ul>
<pre class="snip" style="margin-bottom:12px">eyJhbGciOiJIUzI1NiJ9 . eyJzdWIiOiI0MiIsInJvbGUiOiJ1c2VyIn0 . 3f9Kx…
      header (base64url)        payload (base64url)              signature = HMAC(header.payload, SECRET)</pre>
<p>The payload is just base64, so anyone can read it. What protects it is the <b>signature</b>: change one character of the payload (say <code>"role":"admin"</code>) and the signature no longer matches.</p>
<div class="tip"><b>Passwords</b>Never store passwords themselves. Store a slow, salted hash (bcrypt, scrypt or argon2) and compare hashes at login. Fast hashes like MD5 or SHA-256 alone can be brute-forced quickly.</div>
<p>This lesson uses the browser's real Web Crypto API (<code>crypto.subtle</code>).</p>`,
 tasks:[
  {t:'decodeJwt(VALID) returns the payload, e.g. sub "42", role "user".',sol:X4_SOL,showSol:false,hint:"const json = atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')); return JSON.parse(json);",x:"decodeJwt(VALID).sub === '42' && decodeJwt(VALID).role === 'user'"},
  {t:'isExpired() spots the expired token.',hint:'return payload.exp <= now;',x:'isExpired(decodeJwt(EXPIRED), NOW) === true && isExpired(decodeJwt(VALID), NOW) === false'},
  {t:'verifyJwt() accepts VALID and rejects TAMPERED, EXPIRED and the wrong secret.',hint:"Recompute: crypto.subtle.sign('HMAC', key, encode(header + '.' + body)), base64url it, compare with the signature part.",x:"(await verifyJwt(VALID, SECRET, NOW) || {}).sub === '42' && (await verifyJwt(TAMPERED, SECRET, NOW)) === null && (await verifyJwt(EXPIRED, SECRET, NOW)) === null && (await verifyJwt(VALID, 'wrong-secret', NOW)) === null"},
  {t:'Is it safe to put a user\'s password or card number in a JWT payload?',o:['Yes, JWTs are encrypted','No: the payload is only base64-encoded, so anyone holding the token can read it','Only if it\'s short','Only with HS256'],a:1,e:'Signed, not encrypted. Put only identifiers and claims in it.'},
  {t:'Best place to keep a session token in the browser?',o:['localStorage','An httpOnly, secure, sameSite cookie','A global JavaScript variable','In the URL'],a:1,e:'JavaScript can\'t read httpOnly cookies, so XSS can\'t steal them.'},
  {t:'How should passwords be stored?',o:['Plain text','MD5','A slow, salted hash like bcrypt or argon2','Base64'],a:2,e:'Slow hashing makes stolen hashes expensive to crack.'},
 ]},
{id:'x5',lvl:'Access control',title:'Authorization & IDOR',kind:'code',lang:'js',starter:X5_START,
 sum:'Authentication asks who you are; authorization asks what you\'re allowed to do. Check permissions on the server for every request, because hiding a button in the UI protects nothing. Return 401 when not logged in, 403 (or 404, to avoid revealing that something exists) when logged in but not allowed, and filter list endpoints to what the user may see. IDOR, reading another user\'s record by changing an id, is one of the most common real-world bugs.',
 keys:['authentication vs authorization','check ownership on every request','401 not logged in','403 not allowed','filter lists by user','roles (admin)','IDOR'],
 concept:`<p>The API returns any invoice by id. Nothing checks <i>whose</i> invoice it is. That's <b>IDOR</b> (insecure direct object reference), the most common form of broken access control.</p>
<div class="tbl-wrap"><table><tr><th>Situation</th><th>Response</th></tr><tr><td>Not logged in</td><td><b>401</b> Unauthorized</td></tr><tr><td>Logged in, not your resource</td><td><b>403</b> Forbidden (or 404 so you don't reveal it exists)</td></tr><tr><td>Doesn't exist</td><td><b>404</b> Not Found</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">const isOwner = invoice.ownerId === req.user.id;
const isAdmin = req.user.role === 'admin';
if (!isOwner && !isAdmin) return { status: 403, … };</pre>
<div class="tip"><b>UI is not security</b>Even if your frontend only shows the user's own invoices, attackers call the API directly with any id. Every check must happen on the server.</div>`,
 tasks:[
  {t:'Prove the bug: log what getInvoice returns when user u2 asks for invoice 1.',sol:X5_START+"console.log(getInvoice({ user: { id: 'u2', role: 'member' }, params: { id: '1' } }));\n",showSol:false,hint:"console.log(getInvoice({ user: { id: 'u2', role: 'member' }, params: { id: '1' } }));",c:ctx=>(ctx.logs||[]).some(l=>/amount: 120/.test(l)&&/status: 200/.test(l))},
  {t:'Fix getInvoice: owners get 200, other users get 403.',sol:X5_SOL,showSol:false,hint:"if (invoice.ownerId !== req.user.id) return { status: 403, body: { error: 'Forbidden' } };",x:"getInvoice({ user: { id: 'u2', role: 'member' }, params: { id: '1' } }).status === 403 && getInvoice({ user: { id: 'u1', role: 'member' }, params: { id: '1' } }).status === 200"},
  {t:'Admins can read any invoice; missing invoices still return 404.',hint:"const isAdmin = req.user.role === 'admin';",x:"getInvoice({ user: { id: 'boss', role: 'admin' }, params: { id: '2' } }).status === 200 && getInvoice({ user: { id: 'u1', role: 'member' }, params: { id: '99' } }).status === 404"},
  {t:'No user means 401, for both endpoints.',hint:"if (!req.user) return { status: 401, body: { error: 'Log in first' } };",x:"getInvoice({ user: null, params: { id: '1' } }).status === 401 && listInvoices({ user: null }).status === 401"},
  {t:'listInvoices returns only the user\'s own invoices (admins see all).',hint:"invoices.filter((i) => i.ownerId === req.user.id)",x:"JSON.stringify(listInvoices({ user: { id: 'u1', role: 'member' } }).body.map((i) => i.id)) === '[1,3]' && listInvoices({ user: { id: 'x', role: 'admin' } }).body.length === 3"},
  {t:'The UI only links to your own invoices. Do you still need the server checks?',o:['No, the UI handles it','Yes: anyone can call the API directly with any id','Only for admins','Only in production'],a:1,e:'Attackers use curl, not your buttons.'},
 ]},
{id:'x6',lvl:'Hygiene',title:'Secrets, dependencies & security headers',kind:'ops',
 setup:o=>{o.mkdirp('/home/you/shop/src');o.H().cwd='/home/you/shop';o.write('src/config.js',"export const config = {\n  port: 3000,\n  stripeKey: 'sk_live_51HxAbCdEfGhIjKlMnOp',\n};\n");o.write('package.json',JSON.stringify({name:'shop',version:'1.0.0',dependencies:{express:'^4.21.0',lodash:'4.17.15'}},null,2)+'\n');o.write('.gitignore','node_modules\n');o.mkdirp('/home/you/shop/node_modules');o.st.flags.vulnDeps=true},
 intro:'You are reviewing ~/shop before launch. Hunt for a leaked secret and vulnerable dependencies.',
 sum:'Never hardcode secrets: search for them (grep -rn), move them to environment variables (process.env.STRIPE_KEY) loaded from an ignored .env file, and if a secret was ever committed, rotate it immediately. Audit dependencies regularly (npm audit, Dependabot) and update vulnerable ones. Send security headers such as Strict-Transport-Security, Content-Security-Policy, X-Content-Type-Options and frame-ancestors / X-Frame-Options.',
 keys:['grep -rn "sk_live" .','process.env.STRIPE_KEY','.env in .gitignore','rotate leaked keys','npm audit / npm audit fix','HSTS, CSP, X-Frame-Options','CORS'],
 concept:`<h4>Secrets</h4><p>API keys in source code end up in Git history, logs, screenshots and laptops. Load them from the environment instead:</p>
<pre class="snip" style="margin-bottom:12px">stripeKey: process.env.STRIPE_KEY,      // set in .env locally, in the platform in production</pre>
<p>If a real key was ever committed, assume it's compromised: <b>rotate it</b> (revoke it and issue a new one), then clean up.</p>
<h4>Dependencies</h4><p>Most of your app's code is other people's packages. <code>npm audit</code> checks them against known vulnerabilities; Dependabot or Renovate opens update PRs automatically.</p>
<h4>Security headers</h4>
<div class="tbl-wrap"><table><tr><th>Header</th><th>Protects against</th></tr><tr><td><code>Strict-Transport-Security</code></td><td>Downgrade to insecure HTTP</td></tr><tr><td><code>Content-Security-Policy</code></td><td>XSS impact, unwanted scripts</td></tr><tr><td><code>X-Frame-Options</code> / CSP <code>frame-ancestors</code></td><td>Clickjacking (your site in a hidden iframe)</td></tr><tr><td><code>X-Content-Type-Options: nosniff</code></td><td>Browsers guessing file types</td></tr></table></div>`,
 tasks:[
  {t:'Search the project for a hardcoded live Stripe key.',h:'grep -rn "sk_live" .',c:()=>H(/^grep -r\w* .*sk_live/)},
  {t:'Move the key into .env and read it from process.env in config.js.',h:'nano src/config.js\necho "STRIPE_KEY=sk_live_51HxAbCdEfGhIjKlMnOp" > .env',f:{'src/config.js':"export const config = {\n  port: 3000,\n  stripeKey: process.env.STRIPE_KEY,\n};\n"},c:()=>/process\.env\.STRIPE_KEY/.test(F('/home/you/shop/src/config.js'))&&!/sk_live/.test(F('/home/you/shop/src/config.js'))&&/STRIPE_KEY=/.test(F('/home/you/shop/.env'))},
  {t:'Make sure Git ignores .env.',h:'echo ".env" >> .gitignore\ncat .gitignore',c:()=>/^\.env$/m.test(F('/home/you/shop/.gitignore'))},
  {t:'That key was already pushed to GitHub last week. What now?',o:['Delete the commit and move on','Rotate the key at Stripe immediately (revoke it, issue a new one), then clean up the history','Make the repo private','Nothing, since it\'s in .env now'],a:1,e:'Bots scan GitHub for keys within minutes. Rotation is the only real fix.'},
  {t:'Audit the dependencies, then fix the vulnerable one.',h:'npm audit\nnpm audit fix\nnpm audit',c:()=>O().flags.audited&&!O().flags.vulnDeps},
  {t:'Which header stops other sites from loading yours in a hidden iframe (clickjacking)?',o:['Strict-Transport-Security','X-Frame-Options: DENY (or CSP frame-ancestors)','X-Content-Type-Options','Cache-Control'],a:1,e:'frame-ancestors in CSP is the modern form; X-Frame-Options still works widely.'},
  {t:'What does CORS control?',o:['Which servers your server can call','Which other origins\' JavaScript may read responses from your API in a browser','Database permissions','Cookie size'],a:1,e:'CORS is a browser rule. It doesn\'t protect your API from curl or servers; authentication does.'},
 ]},
],
quizzes:{security:[
 {q:'A user changes ?id=5 to ?id=6 and sees another user\'s order. Category?',o:['Injection','Broken access control (IDOR)','XSS','Misconfiguration'],a:1,e:'The server must check ownership.'},
 {q:'Best defense against SQL injection?',o:['Escaping quotes','Parameterized queries','A WAF only','Hiding error messages'],a:1,e:'Placeholders keep data separate from SQL.'},
 {q:'Safest way to show a user\'s comment on a page?',o:['element.innerHTML = comment','element.textContent = comment','document.write(comment)','eval(comment)'],a:1,e:'textContent never parses HTML.'},
 {q:'A JWT payload is…',o:['Encrypted','Base64url-encoded and readable by anyone; the signature only proves it wasn\'t changed','Hashed','Secret'],a:1,e:'Don\'t put secrets in it.'},
 {q:'You committed an API key to a public repo. First step?',o:['Force-push to remove it','Rotate (revoke) the key','Make the repo private','Add .gitignore'],a:1,e:'Assume it was copied the moment it was public.'},
 {q:'Which is a good way to store passwords?',o:['SHA-1','AES encryption','bcrypt or argon2','Plain text over HTTPS'],a:2,e:'Slow, salted password hashing.'},
]},
real:[
 {id:'sec-r1',t:'Practise on OWASP Juice Shop',p:'Run the deliberately vulnerable Juice Shop locally and solve five challenges. It\'s legal and made for learning.',s:'docker run -d -p 3000:3000 bkimminich/juice-shop\n# open http://localhost:3000'},
 {id:'sec-r2',t:'Turn on Dependabot and secret scanning',p:'In a GitHub repo: Settings → Code security → enable Dependabot alerts, security updates and secret scanning.',s:'# also locally:\nnpm audit'},
 {id:'sec-r3',t:'Check your site\'s security headers',p:'Scan a site you own with securityheaders.com and the Mozilla Observatory, then add the missing headers.',s:'curl -I https://yoursite.com'},
 {id:'sec-r4',t:'Enable MFA everywhere',p:'Turn on two-factor authentication for GitHub, your cloud provider, your domain registrar and your email.',s:'# GitHub: Settings → Password and authentication → Enable 2FA'},
]});
})();
