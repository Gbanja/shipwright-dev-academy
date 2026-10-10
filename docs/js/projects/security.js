/* Projects: Web security */
(()=>{
const hash=pw=>{let h=0;for(const c of String(pw))h=(h*131+c.charCodeAt(0))>>>0;return 'h$'+h.toString(16)};
const SEED=`CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, role TEXT NOT NULL);
INSERT INTO users VALUES (1, 'ada@example.com', '${hash('correct horse')}', 'admin'), (2, 'grace@example.com', '${hash('navy-cobol-1959')}', 'member'), (3, 'alan@example.com', '${hash('enigma')}', 'member');
CREATE TABLE notes (id INTEGER PRIMARY KEY, owner_id INTEGER NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL, shared INTEGER NOT NULL DEFAULT 0);
INSERT INTO notes VALUES (1, 1, 'Launch plan', 'Ship on Friday', 0), (2, 2, 'Grocery list', 'Eggs, milk', 0), (3, 2, 'Team wiki', 'Welcome aboard!', 1);`;
const START=`// db.query(sql, params) runs SQL on a real database (users, notes).
// hash(password) is the app's password hashing function.
// Handlers return { status, body }. req.user is { id, role } or null.

function login(email, password) {
  const user = db.query("SELECT * FROM users WHERE email = '" + email + "'")[0];
  if (!user) return { status: 401, body: { error: 'No account with that email' } };
  if (user.password_hash !== hash(password)) return { status: 401, body: { error: 'Wrong password' } };
  return { status: 200, body: user };
}

function getNote(req) {
  const note = db.query('SELECT * FROM notes WHERE id = ' + req.params.id)[0];
  if (!note) return { status: 404, body: { error: 'Not found' } };
  return { status: 200, body: note };
}

function renderNote(note) {
  return '<article><h2>' + note.title + '</h2><p>' + note.body + '</p></article>';
}
`;
const LOGIN1=`function login(email, password) {
  const user = db.query('SELECT * FROM users WHERE email = ?', [email])[0];
  if (!user) return { status: 401, body: { error: 'No account with that email' } };
  if (user.password_hash !== hash(password)) return { status: 401, body: { error: 'Wrong password' } };
  return { status: 200, body: user };
}`;
const GET1=`function getNote(req) {
  const note = db.query('SELECT * FROM notes WHERE id = ?', [req.params.id])[0];
  if (!note) return { status: 404, body: { error: 'Not found' } };
  return { status: 200, body: note };
}`;
const LOGIN2=`function login(email, password) {
  const user = db.query('SELECT * FROM users WHERE email = ?', [email])[0];
  if (!user || user.password_hash !== hash(password)) {
    return { status: 401, body: { error: 'Invalid email or password' } };
  }
  return { status: 200, body: { id: user.id, email: user.email, role: user.role } };
}`;
const GET3=`function getNote(req) {
  if (!req.user) return { status: 401, body: { error: 'Log in first' } };
  const note = db.query('SELECT * FROM notes WHERE id = ?', [req.params.id])[0];
  if (!note) return { status: 404, body: { error: 'Not found' } };
  const allowed = note.owner_id === req.user.id || note.shared === 1 || req.user.role === 'admin';
  if (!allowed) return { status: 403, body: { error: 'Forbidden' } };
  return { status: 200, body: note };
}`;
const RENDER4=`function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderNote(note) {
  return '<article><h2>' + escapeHtml(note.title) + '</h2><p>' + escapeHtml(note.body) + '</p></article>';
}`;
const LOGIN5=`const failures = new Map();

function login(email, password) {
  if ((failures.get(email) || 0) >= 5) {
    return { status: 429, body: { error: 'Too many attempts. Try again later.' } };
  }
  const user = db.query('SELECT * FROM users WHERE email = ?', [email])[0];
  if (!user || user.password_hash !== hash(password)) {
    failures.set(email, (failures.get(email) || 0) + 1);
    return { status: 401, body: { error: 'Invalid email or password' } };
  }
  failures.delete(email);
  return { status: 200, body: { id: user.id, email: user.email, role: user.role } };
}`;
const HDR=`// db.query(sql, params) runs SQL on a real database (users, notes).
// hash(password) is the app's password hashing function.
// Handlers return { status, body }. req.user is { id, role } or null.

`;
const RENDER0=`function renderNote(note) {
  return '<article><h2>' + note.title + '</h2><p>' + note.body + '</p></article>';
}`;
const code=(l,g,r)=>HDR+l+'\n\n'+g+'\n\n'+r+'\n';

/* ---------- solo: file sharing ---------- */
const FS_START=`// A tiny file-sharing service. Handlers get req = { user, params, body } and return { status, body }.
// req.user is { id, role } or null. The "disk" below stands in for the server's filesystem.

const disk = {
  '/srv/uploads/report.pdf': { owner: 'u1', size: 120000, data: '%PDF-1.7 quarterly report' },
  '/srv/uploads/logo.png': { owner: 'u2', size: 48000, data: 'PNG logo bytes' },
  '/srv/app/.env': { owner: 'root', size: 64, data: 'DB_PASSWORD=hunter2' },
};
const links = {};

// Joins a base folder and a file name, resolving ".." like a real filesystem does.
function resolvePath(base, name) {
  const parts = (base + '/' + name).split('/');
  const out = [];
  for (const p of parts) {
    if (p === '..') out.pop();
    else if (p && p !== '.') out.push(p);
  }
  return '/' + out.join('/');
}

function download(req) {
  const path = resolvePath('/srv/uploads', req.params.name);
  const file = disk[path];
  if (!file) return { status: 404, body: { error: 'ENOENT: no such file ' + path } };
  return { status: 200, body: file.data };
}

function upload(req) {
  const { name, size, data } = req.body;
  disk[resolvePath('/srv/uploads', name)] = { owner: req.user.id, size, data };
  return { status: 201, body: { name } };
}

function deleteFile(req) {
  delete disk[resolvePath('/srv/uploads', req.params.name)];
  return { status: 204, body: null };
}

function createShareLink(req) {
  const token = String(Date.now());
  links[token] = req.params.name;
  return { status: 201, body: { token, url: '/s/' + token } };
}

function securityHeaders() {
  return {};
}
`;
const FS_REF=`// A tiny file-sharing service. Handlers get req = { user, params, body } and return { status, body }.
// req.user is { id, role } or null. The "disk" below stands in for the server's filesystem.

const disk = {
  '/srv/uploads/report.pdf': { owner: 'u1', size: 120000, data: '%PDF-1.7 quarterly report' },
  '/srv/uploads/logo.png': { owner: 'u2', size: 48000, data: 'PNG logo bytes' },
  '/srv/app/.env': { owner: 'root', size: 64, data: 'DB_PASSWORD=hunter2' },
};
const links = {};
const UPLOADS = '/srv/uploads';
const ALLOWED = ['.png', '.jpg', '.jpeg', '.pdf'];
const MAX_BYTES = 5 * 1024 * 1024;

function resolvePath(base, name) {
  const parts = (base + '/' + name).split('/');
  const out = [];
  for (const p of parts) {
    if (p === '..') out.pop();
    else if (p && p !== '.') out.push(p);
  }
  return '/' + out.join('/');
}

// Resolve, then make sure the result is still inside the uploads folder.
function safePath(name) {
  const path = resolvePath(UPLOADS, String(name || ''));
  return path.startsWith(UPLOADS + '/') ? path : null;
}

function download(req) {
  if (!req.user) return { status: 401, body: { error: 'Log in first' } };
  const path = safePath(req.params.name);
  if (!path) return { status: 400, body: { error: 'Invalid file name' } };
  const file = disk[path];
  if (!file) return { status: 404, body: { error: 'Not found' } };
  return { status: 200, body: file.data };
}

function upload(req) {
  if (!req.user) return { status: 401, body: { error: 'Log in first' } };
  const { name, size, data } = req.body;
  const path = safePath(name);
  if (!path) return { status: 400, body: { error: 'Invalid file name' } };
  const ext = name.slice(name.lastIndexOf('.')).toLowerCase();
  if (!ALLOWED.includes(ext)) return { status: 415, body: { error: 'File type not allowed' } };
  if (size > MAX_BYTES) return { status: 413, body: { error: 'File too large' } };
  disk[path] = { owner: req.user.id, size, data };
  return { status: 201, body: { name } };
}

function deleteFile(req) {
  if (!req.user) return { status: 401, body: { error: 'Log in first' } };
  const path = safePath(req.params.name);
  const file = path && disk[path];
  if (!file) return { status: 404, body: { error: 'Not found' } };
  if (file.owner !== req.user.id) return { status: 403, body: { error: 'Forbidden' } };
  delete disk[path];
  return { status: 204, body: null };
}

function randomToken() {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function createShareLink(req) {
  if (!req.user) return { status: 401, body: { error: 'Log in first' } };
  const path = safePath(req.params.name);
  const file = path && disk[path];
  if (!file) return { status: 404, body: { error: 'Not found' } };
  if (file.owner !== req.user.id) return { status: 403, body: { error: 'Forbidden' } };
  const token = randomToken();
  links[token] = req.params.name;
  return { status: 201, body: { token, url: '/s/' + token } };
}

function securityHeaders() {
  return {
    'Content-Security-Policy': "default-src 'self'",
    'X-Content-Type-Options': 'nosniff',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
    'Referrer-Policy': 'no-referrer',
  };
}
`;
const U1="{ id: 'u1', role: 'member' }",U2="{ id: 'u2', role: 'member' }";
const fnSrc=(code,name)=>{const i=code.search(new RegExp('function\\s+'+name+'\\s*\\('));return i<0?'':code.slice(i,i+900)};

defineProjects('security',{
guided:{title:'Security-review and fix a notes API',kind:'code',lang:'jsm',sqlite:true,seed:SEED,envExtra:()=>({hash}),starter:START,
 pitch:'Audit a small API like a pentester: fix SQL injection, stop leaking password hashes and user enumeration, add authorization, escape output and rate-limit logins.',
 brief:`<p>A startup asks you to review its notes API before launch. The code works, and it has five classic vulnerabilities. Fix them one at a time, in priority order. After each fix, press <b>Run</b>: the checker attacks your code the way a real attacker would.</p>
<p>The database is real SQLite: <code>users</code> (with password hashes and roles) and <code>notes</code> (with an owner and a <code>shared</code> flag).</p>
<div class="tip"><b>Goal</b>Every handler resists injection, reveals nothing it shouldn't, checks who is asking, and limits brute-force attempts.</div>`,
 tasks:[
 {t:'Fix SQL injection in login() and getNote() with parameterized queries.',why:'Gluing input into SQL lets an attacker <b>change the query</b>: <code>getNote</code> with id <code>"1 OR 1=1"</code> matches every row. With placeholders (<code>?</code>), the values travel separately from the SQL and can never become code. This one habit fixes the whole class of bug.',code:LOGIN1+'\n\n'+GET1,sol:code(LOGIN1,GET1,RENDER0),x:"getNote({ user: { id: 2, role: 'member' }, params: { id: '0 OR 1=1' } }).status === 404 && login(\"' OR '1'='1' --\", 'x').status === 401 && login('grace@example.com', 'navy-cobol-1959').status === 200",c:ctx=>!/["']\s*\+\s*(email|req\.params\.id)\b/.test(ctx.code)},
 {t:'Stop leaking: never return the password hash, and use one error message for any failed login.',why:'Returning the whole row hands out password hashes to anyone who logs in. Different messages for "no account" and "wrong password" let attackers <b>enumerate</b> which emails are registered. Return only the fields the client needs, and one generic error.',code:LOGIN2,sol:code(LOGIN2,GET1,RENDER0),x:"login('ada@example.com', 'correct horse').body.password_hash === undefined && login('ada@example.com', 'correct horse').body.email === 'ada@example.com' && login('nobody@example.com', 'x').body.error === login('alan@example.com', 'wrong').body.error"},
 {t:'Add authorization to getNote: 401 for no user, 403 for other people\'s private notes, admins see all.',why:'Authentication answers "who are you?" <b>Authorization</b> answers "are you allowed to see this?" Without it, anyone can walk through ids (<code>/notes/1</code>, <code>/notes/2</code> …) and read everything. That is <b>IDOR</b>, the most common access-control bug.',code:GET3,sol:code(LOGIN2,GET3,RENDER0),x:"getNote({ user: null, params: { id: '1' } }).status === 401 && getNote({ user: { id: 2, role: 'member' }, params: { id: '1' } }).status === 403 && getNote({ user: { id: 2, role: 'member' }, params: { id: '2' } }).status === 200 && getNote({ user: { id: 3, role: 'member' }, params: { id: '3' } }).status === 200 && getNote({ user: { id: 1, role: 'admin' }, params: { id: '2' } }).status === 200"},
 {t:'Escape user content in renderNote so a note can\'t run scripts (XSS).',why:'If a note\'s title is <code>&lt;script&gt;…</code>, building HTML with <code>+</code> runs it in every reader\'s browser, where it can steal their session. Escape <code>&amp; &lt; &gt; " \'</code> at the moment you put text into HTML.',code:RENDER4,sol:code(LOGIN2,GET3,RENDER4),x:"(h => h.includes('&lt;script&gt;') && !h.includes('<script>') && h.includes('a &amp; b'))(renderNote({ title: '<script>alert(1)</script>', body: 'a & b' }))"},
 {t:'Rate-limit logins: after 5 failures for an email, return 429.',why:'Without a limit, a bot can try thousands of passwords a minute. Counting failures and answering <b>429 Too Many Requests</b> slows brute force down to almost nothing. Real apps keep the counter in Redis with an expiry.',code:LOGIN5,sol:code(LOGIN5,GET3,RENDER4),x:"(() => { let r; for (let i = 0; i < 6; i++) r = login('alan@example.com', 'guess' + i); return r.status === 429 && login('alan@example.com', 'enigma').status === 429 && login('grace@example.com', 'navy-cobol-1959').status === 200; })()"},
 ]},
solo:{title:'Harden a file-sharing service',kind:'code',lang:'js',starter:FS_START,
 pitch:'Find and fix path traversal, unrestricted uploads, missing access control, guessable share links, leaky errors and missing security headers.',
 brief:`<p>Your company's file-sharing service is about to get a penetration test, and you want it to come back clean. The handlers are in the editor. Each one takes a request object and returns <code>{ status, body }</code>. The <code>disk</code> object stands in for the real filesystem, including the app's <code>.env</code> secrets file.</p>
<p><b>Security requirements</b></p><ul><li>No request can read anything outside <code>/srv/uploads</code>. Respond with a 4xx instead.</li><li>Uploads allow only <code>.png</code>, <code>.jpg</code>, <code>.jpeg</code> and <code>.pdf</code> (any capitalization), returning <b>415</b> otherwise, and at most 5 MB, returning <b>413</b> otherwise.</li><li>Anonymous users get <b>401</b> everywhere. Only a file's owner may delete it or create a share link for it (<b>403</b> for others).</li><li>Share-link tokens must be unguessable: at least 128 bits from a cryptographically secure random source.</li><li>Error responses must not reveal server paths or internals. A missing file returns exactly <code>{ "error": "Not found" }</code>.</li><li><code>securityHeaders()</code> returns a Content-Security-Policy with <code>default-src 'self'</code>, <code>X-Content-Type-Options: nosniff</code>, a <code>Strict-Transport-Security</code> max-age, and a <code>Referrer-Policy</code>.</li></ul>`,
 tasks:[
 {t:'Path traversal is blocked: "../app/.env" can\'t be downloaded, normal files still can.',x:"(r => r.status >= 400 && r.status < 500 && !JSON.stringify(r.body).includes('DB_PASSWORD'))(download({ user: "+U1+", params: { name: '../app/.env' } })) && (r => r.status >= 400 && !JSON.stringify(r.body).includes('DB_PASSWORD'))(download({ user: "+U1+", params: { name: 'a/../../app/.env' } })) && download({ user: "+U1+", params: { name: 'report.pdf' } }).status === 200",
  miss:'"../app/.env" still resolves outside /srv/uploads and returns the database password, or normal downloads broke. Checking for ".." isn\'t enough on its own ("a/../../" sneaks past naive checks). Resolve the full path first, then check that it still starts with "/srv/uploads/".'},
 {t:'Uploads allow only png/jpg/jpeg/pdf (415 otherwise) and at most 5 MB (413).',x:"upload({ user: "+U1+", body: { name: 'evil.html', size: 100, data: '<script>' } }).status === 415 && upload({ user: "+U1+", body: { name: 'invoice.pdf.exe', size: 100 } }).status === 415 && upload({ user: "+U1+", body: { name: 'big.pdf', size: 6 * 1024 * 1024 } }).status === 413 && upload({ user: "+U1+", body: { name: 'Photo.JPG', size: 2048 } }).status === 201 && upload({ user: "+U1+", body: { name: 'cv.pdf', size: 5 * 1024 * 1024 } }).status === 201",
  miss:'Something got through, or a valid file was rejected. Check the extension after the LAST dot ("invoice.pdf.exe" ends in .exe), lowercase it ("Photo.JPG" is allowed), and use an allowlist, not a blocklist. 5 MB exactly is allowed; more than that returns 413.'},
 {t:'Anonymous requests get 401; only the owner can delete a file (403 for others).',x:"download({ user: null, params: { name: 'report.pdf' } }).status === 401 && upload({ user: null, body: { name: 'a.png', size: 1 } }).status === 401 && deleteFile({ user: null, params: { name: 'logo.png' } }).status === 401 && deleteFile({ user: "+U1+", params: { name: 'logo.png' } }).status === 403 && download({ user: "+U2+", params: { name: 'logo.png' } }).status === 200 && upload({ user: "+U1+", body: { name: 'tmp.png', size: 10 } }).status === 201 && deleteFile({ user: "+U1+", params: { name: 'tmp.png' } }).status === 204",
  miss:'Access control is incomplete. Every handler must answer 401 when req.user is null, and deleteFile must compare the file\'s owner with req.user.id (403 if different) before deleting anything. The UI hiding the button is not a check.'},
 {t:'Share-link tokens are cryptographically random and at least 128 bits, and only the owner can create them.',x:"(() => { const seen = new Set(); for (let i = 0; i < 25; i++) { const r = createShareLink({ user: "+U1+", params: { name: 'report.pdf' } }); if (r.status !== 201) return false; seen.add(r.body.token); } return seen.size === 25 && [...seen].every((t) => /^[0-9a-f]{32,}$/i.test(t) || /^[0-9a-f-]{36}$/i.test(t) || /^[A-Za-z0-9_-]{22,}$/.test(t)); })() && createShareLink({ user: "+U2+", params: { name: 'report.pdf' } }).status === 403",c:ctx=>{const s=fnSrc(ctx.code,'createShareLink')+fnSrc(ctx.code,'randomToken');return /crypto\.(getRandomValues|randomUUID)/.test(ctx.code)&&!/Math\.random|Date\.now/.test(s)},
  miss:ctx=>/Date\.now|Math\.random/.test(ctx.code)?'Tokens still come from Date.now() or Math.random(). Timestamps are guessable to the millisecond, and Math.random isn\'t cryptographically secure. Use crypto.getRandomValues(new Uint8Array(16)) and hex-encode it, or crypto.randomUUID().':'Either the tokens are too short, the same token repeats, or non-owners can still create share links. Check ownership first, then generate 16 random bytes.'},
 {t:'A missing file returns exactly {"error": "Not found"}, with no paths in the message.',x:"JSON.stringify(download({ user: "+U1+", params: { name: 'nope.pdf' } }).body) === '{\"error\":\"Not found\"}'",
  miss:'The 404 response still includes something like "ENOENT … /srv/uploads/…", which tells attackers your folder layout and stack. Log details on the server, and send the client a generic message.'},
 {t:'securityHeaders() sets CSP default-src \'self\', nosniff, HSTS and a Referrer-Policy.',x:"(h => /default-src 'self'/.test(h['Content-Security-Policy'] || '') && h['X-Content-Type-Options'] === 'nosniff' && /max-age=\\d{6,}/.test(h['Strict-Transport-Security'] || '') && !!h['Referrer-Policy'])(securityHeaders())",
  miss:'One of the headers is missing or wrong. Use the exact header names: Content-Security-Policy ("default-src \'self\'"), X-Content-Type-Options ("nosniff"), Strict-Transport-Security ("max-age=" with at least 6 digits, for example 63072000 for two years) and Referrer-Policy (for example "no-referrer").'},
 ],
 warn:[
  {c:ctx=>/includes\(\s*['"]\.\.['"]\s*\)/.test(ctx.code)&&!/startsWith\(/.test(ctx.code),m:'You block traversal by searching for "..". Encoded and nested variants slip past string checks. The robust pattern is resolve, then check the prefix.'},
  {c:ctx=>/\.(exe|html|php|svg)['"]/.test(fnSrc(ctx.code,'upload'))&&!/\.png['"]/.test(ctx.code),m:'Your upload check looks like a blocklist of bad extensions. Attackers find the one you forgot. Allow known-good types instead.'},
  {c:ctx=>/console\.log\([^)]*(password|token|secret)/i.test(ctx.code),m:'You log secrets or tokens. Logs are read by many people and systems. Never write credentials to them.'},
 ],
 ref:FS_REF},
});
})();
