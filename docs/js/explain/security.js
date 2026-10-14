/* security: "Explained step by step" walkthroughs. */

explain('x1',`
<h4>Why a "most wanted" list exists</h4>
<p>Every web app you build will be poked at by strangers. Some are curious, many are automated programs called <b>bots</b> that scan the whole internet day and night, and a few are skilled attackers looking for money or data. You cannot guess every trick they might try. The good news is that you don't have to: the same handful of mistakes cause most real break-ins, year after year.</p>
<p>A <b>vulnerability</b> is a weakness in an app that someone can abuse. An <b>attacker</b> is whoever abuses it. To <b>exploit</b> a vulnerability means to actually use it, for example to read data you should not see. A <b>breach</b> is what happens when an exploit succeeds and data leaks out.</p>
<p><b>OWASP</b>, the Open Worldwide Application Security Project, is a non-profit community of security people. Every few years it studies data from thousands of real apps and publishes the <b>OWASP Top 10</b>: the ten kinds of risk that matter most. It is the closest thing the industry has to a shared checklist, and interviewers, auditors and security tools all speak its language.</p>
<div class="analogy"><b>Think of it like</b>A police "most wanted" poster for burglaries. It doesn't list every possible crime, but if you lock the doors and windows it mentions, you have stopped most break-ins already.</div>

<h4>How an app is put together, and where things go wrong</h4>
<p>Before naming the risks, picture the parts of a typical web app. Your <b>browser</b> shows pages and sends requests. Your <b>server</b> runs your code, decides what to do and talks to a <b>database</b> where the data lives. Your code leans on <b>libraries</b>, which are packages of code written by other people. Around all of it sit <b>settings</b> (passwords, debug switches, cloud storage permissions) and <b>logs</b>, the written record of what happened.</p>
<p>Each Top 10 risk lives in one of these places. Seeing the map first makes the list much easier to remember.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="Parts of a web app matched to the risks that live in them">
<g text-anchor="middle">
<rect class="bx" x="10" y="10" width="130" height="38" rx="6"/><text class="t-b" x="75" y="34">Browser</text>
<rect class="bx" x="10" y="58" width="130" height="38" rx="6"/><text class="t-b" x="75" y="82">Your code</text>
<rect class="bx" x="10" y="106" width="130" height="38" rx="6"/><text class="t-b" x="75" y="130">Data</text>
<rect class="bx" x="10" y="154" width="130" height="38" rx="6"/><text class="t-b" x="75" y="178">Settings</text>
<rect class="bx" x="10" y="202" width="130" height="38" rx="6"/><text class="t-b" x="75" y="226">Libraries, logs</text>
</g>
<g>
<path class="ln" d="M140 29h22"/><polygon class="ah" points="160,23 160,35 168,29"/>
<path class="ln" d="M140 77h22"/><polygon class="ah" points="160,71 160,83 168,77"/>
<path class="ln" d="M140 125h22"/><polygon class="ah" points="160,119 160,131 168,125"/>
<path class="ln" d="M140 173h22"/><polygon class="ah" points="160,167 160,179 168,173"/>
<path class="ln" d="M140 221h22"/><polygon class="ah" points="160,215 160,227 168,221"/>
</g>
<g text-anchor="middle">
<rect class="bx-warn" x="170" y="10" width="240" height="38" rx="6"/><text class="t" x="290" y="34">XSS, weak logins</text>
<rect class="bx-bad" x="170" y="58" width="240" height="38" rx="6"/><text class="t" x="290" y="82">Access control, injection</text>
<rect class="bx-warn" x="170" y="106" width="240" height="38" rx="6"/><text class="t" x="290" y="130">Weak crypto, plain text</text>
<rect class="bx-warn" x="170" y="154" width="240" height="38" rx="6"/><text class="t" x="290" y="178">Misconfiguration</text>
<rect class="bx-warn" x="170" y="202" width="240" height="38" rx="6"/><text class="t" x="290" y="226">Old parts, nobody watching</text>
</g>
</svg><figcaption>Each part of a web app has its own typical weakness. The browser suffers cross-site scripting and weak logins, your code suffers broken access control and injection, stored data suffers weak cryptography, settings suffer misconfiguration, and libraries and logs suffer outdated components and missing monitoring.</figcaption></figure>

<h4>The six risks this lesson focuses on</h4>
<p>The lesson's quick reference shows all ten entries. Six of them come up again and again, so let's take them one at a time.</p>
<p><b>1. Broken access control.</b> "Access control" means the rules about who may see or change what. It is broken when the server forgets to check those rules. The classic example: you are viewing <code>/invoices/1042</code>, you change the number in the address bar to <code>1043</code>, and you see a stranger's invoice. The server checked that you were logged in, but never checked that invoice 1043 is <i>yours</i>. This specific bug is called <b>IDOR</b>, insecure direct object reference. It has been number one on the list since 2021, and you will fix one yourself in a later lesson.</p>
<p><b>2. Injection.</b> Your app often builds instructions for another program: a SQL query for the database, a shell command, or HTML for the browser. Injection happens when text typed by a user gets glued into those instructions and is treated as <i>part of the instructions</i> instead of as plain data. If the login form glues the email straight into a SQL string, a clever "email" can rewrite the query. Cross-site scripting, or <b>XSS</b>, is injection into HTML: a "comment" that is really a script. Both get their own lesson next.</p>
<p><b>3. Cryptographic failures.</b> Cryptography is the maths that keeps data secret or proves it hasn't changed. This risk covers data that should be protected but isn't: a site still on plain <code>http://</code> so anyone on the café Wi-Fi can read the traffic, or passwords stored as plain text or with a fast, outdated hash such as MD5. A <b>hash</b> is a one-way scramble of data; you will learn how password hashing should work in the sessions lesson.</p>
<p><b>4. Security misconfiguration.</b> The code is fine but a setting is not. Examples: an admin panel still using the factory password <code>admin/admin</code>, a production site that shows full error details (called <b>stack traces</b>) to visitors, or a cloud storage bucket left readable by the whole internet. These are easy for attackers to find because bots check for them automatically.</p>
<p><b>5. Vulnerable and outdated components.</b> Most of the code in a modern app was written by someone else and installed as packages. When a security hole is found in a package, it gets a public ID called a <b>CVE</b> (Common Vulnerabilities and Exposures), and a fixed version is released. If you never update, you are running code with a hole the whole world knows about. Tools like <code>npm audit</code>, Dependabot and Renovate warn you and help you update.</p>
<p><b>6. Logging and monitoring failures.</b> Attacks rarely succeed on the first try. Someone guessing passwords makes thousands of failed attempts first. If you don't record failed logins and nobody is alerted when they spike, the attack can run for weeks unnoticed. Good logging turns a silent breach into an alarm.</p>

<h4>The other four, briefly</h4>
<ul>
<li><b>Insecure design</b>: the plan itself is unsafe, for example a password-reset flow with no limit on guesses. No amount of careful coding fixes a bad design.</li>
<li><b>Identification and authentication failures</b>: weak login systems, such as allowing "123456" as a password, no multi-factor authentication (a second proof like a code on your phone), or sessions that never expire.</li>
<li><b>Software and data integrity failures</b>: trusting updates or data without checking they are genuine. "Supply-chain attacks", where an attacker poisons a package or build step that many apps use, live here.</li>
<li><b>Server-side request forgery (SSRF)</b>: tricking your server into fetching a URL the attacker chooses, often an internal address that outsiders should never reach.</li>
</ul>
<div class="tip"><b>Tip</b>The numbering changes between editions. OWASP published a newer edition in 2025 that reorders some entries and renames a few (for example, outdated components grew into "software supply chain failures", and SSRF was folded into broken access control). The ideas you learn here carry straight over, so focus on recognising the pattern, not memorising the number.</div>

<h4>A worked example: classifying real incidents</h4>
<p>The tasks in this lesson describe an incident and ask which category it belongs to. The trick is to ask "what exactly went wrong?" and follow the clues. This flow covers the six main risks:</p>
<figure class="fig"><svg viewBox="0 0 420 266" role="img" aria-label="Decision flow for classifying a security bug">
<g text-anchor="middle">
<rect class="bx" x="10" y="8" width="230" height="36" rx="6"/><text class="t" x="125" y="31">Input ran as code?</text>
<rect class="bx" x="10" y="60" width="230" height="36" rx="6"/><text class="t" x="125" y="83">Saw others' data?</text>
<rect class="bx" x="10" y="112" width="230" height="36" rx="6"/><text class="t" x="125" y="135">Data poorly protected?</text>
<rect class="bx" x="10" y="164" width="230" height="36" rx="6"/><text class="t" x="125" y="187">Unsafe setting left on?</text>
<rect class="bx" x="10" y="216" width="230" height="36" rx="6"/><text class="t" x="125" y="239">Old library with a hole?</text>
<rect class="bx-bad" x="270" y="8" width="140" height="36" rx="6"/><text class="t-b" x="340" y="31">Injection</text>
<rect class="bx-bad" x="270" y="60" width="140" height="36" rx="6"/><text class="t-b" x="340" y="83">Access control</text>
<rect class="bx-bad" x="270" y="112" width="140" height="36" rx="6"/><text class="t-b" x="340" y="135">Crypto failure</text>
<rect class="bx-bad" x="270" y="164" width="140" height="36" rx="6"/><text class="t-b" x="340" y="187">Misconfigured</text>
<rect class="bx-bad" x="270" y="216" width="140" height="36" rx="6"/><text class="t-b" x="340" y="239">Old component</text>
</g>
<g>
<path class="ln-a" d="M240 26h20"/><polygon class="ah-a" points="260,20 260,32 268,26"/>
<path class="ln-a" d="M240 78h20"/><polygon class="ah-a" points="260,72 260,84 268,78"/>
<path class="ln-a" d="M240 130h20"/><polygon class="ah-a" points="260,124 260,136 268,130"/>
<path class="ln-a" d="M240 182h20"/><polygon class="ah-a" points="260,176 260,188 268,182"/>
<path class="ln-a" d="M240 234h20"/><polygon class="ah-a" points="260,228 260,240 268,234"/>
<path class="ln" d="M125 44v8"/><polygon class="ah" points="119,52 131,52 125,60"/>
<path class="ln" d="M125 96v8"/><polygon class="ah" points="119,104 131,104 125,112"/>
<path class="ln" d="M125 148v8"/><polygon class="ah" points="119,156 131,156 125,164"/>
<path class="ln" d="M125 200v8"/><polygon class="ah" points="119,208 131,208 125,216"/>
</g>
<text class="t-s" x="137" y="56">no</text><text class="t-s" x="137" y="108">no</text><text class="t-s" x="137" y="160">no</text><text class="t-s" x="137" y="212">no</text>
</svg><figcaption>Ask the questions from the top. Input that ran as code is injection. Seeing someone else's data is broken access control. Weakly protected data is a cryptographic failure. An unsafe default or debug setting is misconfiguration. A library with a known hole is a vulnerable component.</figcaption></figure>
<p>Let's walk through two of the lesson's incidents with that flow:</p>
<ol>
<li><i>"Passwords are stored as unsalted MD5 hashes."</i> No input ran as code, and nobody reached another user's page. But the passwords, which are secret data, are protected with a weak method. That is a <b>cryptographic failure</b>.</li>
<li><i>"Attackers tried 50,000 passwords last month and nobody noticed."</i> The key word is <i>noticed</i>. The weakness isn't how passwords are stored, it is that no alarm went off. That is a <b>logging and monitoring failure</b>. Rate limiting, which caps how many attempts one person can make per minute, would also help.</li>
</ol>
<div class="mistake"><b>Common mistake</b>Thinking "my app is too small to be attacked". Bots don't choose targets by size; they scan every address they can find for known weaknesses like default passwords and outdated packages. A brand-new hobby site can get its first automated attack within hours of going live.</div>
<div class="mistake"><b>Common mistake</b>Mixing up injection and access control. Ask: did the attacker <i>change what the code does</i> (injection), or did they just <i>ask for something they shouldn't get</i> and the server handed it over (access control)? Changing an id in a URL changes nothing about the code, so it is access control.</div>

<h4>Defence in depth</h4>
<p>No single fix stops everything, so professionals stack several layers. This idea is called <b>defence in depth</b>. If one layer fails, the next one limits the damage. For example: parameterised queries stop SQL injection, a database user with limited permissions limits what an attacker could do if one slipped through, and logging means you find out quickly. You will see this layering in every lesson of this track.</p>
<div class="tip"><b>Tip</b>Only ever test the security of systems you own, or that you have written permission to test. The sandboxes in this track, and practice apps like OWASP Juice Shop, exist so you can learn attacks legally.</div>
<div class="try"><b>Try it in your head</b>A shop's production site shows a full error page with file paths and library versions when you type a weird URL. Which category? Nothing ran as code and no other user's data appeared, but a setting meant for development (detailed errors) was left on in production. That is <b>security misconfiguration</b>.</div>

<h4>Recap</h4>
<ul>
<li>The OWASP Top 10 lists the kinds of risk behind most real breaches; learn to recognise the pattern rather than the number.</li>
<li>Broken access control: the server doesn't check whether this user may see or change this thing. IDOR is the classic case.</li>
<li>Injection: user input becomes part of SQL, a shell command or HTML. Cryptographic failures: secrets stored or sent without strong protection.</li>
<li>Misconfiguration is unsafe settings; vulnerable components are outdated packages with known holes; logging failures mean nobody notices an attack.</li>
<li>Stack defences in layers, and only test systems you have permission to test.</li>
</ul>
`);

explain('x2',`
<h4>Why SQL injection happens</h4>
<p>Your app talks to its database in <b>SQL</b>, a language of commands such as <code>SELECT</code> (read rows) with a <code>WHERE</code> clause that says which rows. To log someone in, the app asks the database: "find the user whose email is this and whose password hash is that".</p>
<p>The problem starts when the app <b>builds that SQL by gluing strings together</b>. In the lesson's starter code, <code>login()</code> does exactly this:</p>
<pre class="snip">const sql = "SELECT id, email, role FROM users WHERE email = '" + email +
            "' AND password_hash = '" + hash(password) + "'";</pre>
<p>Gluing strings is called <b>concatenation</b>, and the <code>+</code> does it. If the email is <code>ada@example.com</code>, the result is a perfectly normal query. But the database doesn't know which parts you wrote and which parts the user typed. It just receives one long piece of text and reads all of it as SQL code. So if the user types something that <i>looks like SQL</i>, it becomes SQL. That is <b>SQL injection</b>: the user's data gets injected into your code.</p>
<div class="analogy"><b>Think of it like</b>A cheque where you write the amount in words and someone else fills in the payee's name. If they write "Bob, and also pay Eve one thousand pounds" in the name box and the bank reads the whole line as instructions, you have a problem. The bank should treat the name box as a name, nothing more.</div>

<h4>Two pieces of SQL you need for the attack</h4>
<p>The famous attack string is <code>' OR '1'='1' --</code>. It uses three small ideas:</p>
<ul>
<li><b>A single quote</b> <code>'</code> ends a text value in SQL. Text values are written between single quotes, like <code>'ada@example.com'</code>. Typing a quote closes the value early, so whatever comes next is read as code.</li>
<li><b><code>OR '1'='1'</code></b> adds a condition that is always true, because the text <code>'1'</code> always equals <code>'1'</code>. A <code>WHERE</code> clause with "something OR true" is true for every row.</li>
<li><b>Two dashes</b> <code>--</code> start a comment in SQL. Everything after them on that line is ignored, including the password check your code added.</li>
</ul>

<h4>Watching the query change meaning</h4>
<p>Let's run the attack in slow motion. The attacker types <code>' OR '1'='1' --</code> as the email and anything as the password.</p>
<figure class="fig"><svg viewBox="0 0 420 236" role="img" aria-label="How the injected email rewrites the SQL query">
<text class="t-s" x="10" y="20">Your code expects a value here:</text>
<rect class="bx-info" x="10" y="28" width="400" height="34" rx="6"/>
<text class="t-m" x="22" y="51">WHERE email = '<tspan class="t-a">[input]</tspan>' AND ...</text>
<text class="t-s" x="10" y="88">The attacker types:</text>
<rect class="bx-warn" x="10" y="96" width="190" height="34" rx="6"/>
<text class="t-m" x="22" y="119">' OR '1'='1' --</text>
<text class="t-s" x="10" y="156">The database reads three separate parts:</text>
<g text-anchor="middle">
<rect class="bx" x="10" y="164" width="124" height="34" rx="6"/><text class="t-m" x="72" y="187">email = ''</text>
<rect class="bx-bad" x="148" y="164" width="124" height="34" rx="6"/><text class="t-m" x="210" y="187">OR '1'='1'</text>
<rect class="bx-ok" x="286" y="164" width="124" height="34" rx="6"/><text class="t-m" x="348" y="187">-- ' AND …</text>
<text class="t-s" x="72" y="222">matches no one</text>
<text class="t-s t-bad" x="210" y="222">always true</text>
<text class="t-s" x="348" y="222">ignored</text>
</g>
</svg><figcaption>The quote closes the email value early, so the database sees an empty email check, then "or one equals one", which is always true, then a comment that hides the password check. The user's text has changed the meaning of the query.</figcaption></figure>
<p>The full query the database receives is now:</p>
<pre class="snip">SELECT id, email, role FROM users
WHERE email = '' OR '1'='1' --' AND password_hash = 'h$…'
-- everything from the two dashes onwards is a comment</pre>
<p>Reading it step by step:</p>
<ol>
<li><code>email = ''</code> is false for every user, because nobody has an empty email.</li>
<li><code>OR '1'='1'</code> is true for every user. False or true is true, so <b>every row matches</b>.</li>
<li>The password check is inside a comment, so it never runs.</li>
<li><code>login()</code> returns <code>db.query(sql)[0]</code>, the first row. In the lesson's table that is Ada, the admin.</li>
</ol>
<p>That is the first task: craft the email, call <code>login</code> with it and log the result. You'll see the admin's row come back without any real password.</p>
<p>A real attacker can go much further than logging in: with other injected SQL they can read whole tables, such as every user's email and password hash, or even change and delete data.</p>

<h4>The fix: parameterised queries</h4>
<p>The root cause is that code and data travel <b>mixed together</b> in one string. The fix is to send them <b>separately</b>. You write the SQL with a <code>?</code> placeholder wherever a value goes, and you pass the values in a separate array:</p>
<pre class="snip">db.query(
  'SELECT id, email, role FROM users WHERE email = ? AND password_hash = ?',
  [email, hash(password)]   // values, in the same order as the ? marks
);</pre>
<p>This is called a <b>parameterised query</b> (or a prepared statement). The database first reads and understands the SQL with its placeholders, so the shape of the query is fixed before it sees any user input. Then it plugs the values in as plain data. A quote in the email is just a quote character inside a text value. It can never close anything.</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="SQL and values travel separately to the database">
<g text-anchor="middle">
<rect class="bx" x="10" y="64" width="80" height="80" rx="8"/><text class="t-b" x="50" y="109">App</text>
<text class="t-s t-info" x="210" y="22">code, fixed shape</text>
<rect class="bx-info" x="112" y="30" width="196" height="36" rx="6"/><text class="t-m" x="210" y="53">email = ?</text>
<text class="t-s t-warn" x="210" y="128">data, only ever a value</text>
<rect class="bx-warn" x="112" y="136" width="196" height="36" rx="6"/><text class="t-m" x="210" y="159">' OR '1'='1' --</text>
<rect class="bx-ok" x="330" y="64" width="80" height="80" rx="8"/><text class="t-b" x="370" y="109">DB</text>
</g>
<path class="ln" d="M90 90h8v-42h6"/><polygon class="ah" points="104,42 104,54 112,48"/>
<path class="ln" d="M90 118h8v36h6"/><polygon class="ah" points="104,148 104,160 112,154"/>
<path class="ln-ok" d="M308 48h10v40h4"/><polygon class="ah-ok" points="322,82 322,94 330,88"/>
<path class="ln-ok" d="M308 154h10v-34h4"/><polygon class="ah-ok" points="322,114 322,126 330,120"/>
<text class="t-s" x="210" y="198" text-anchor="middle">Nothing in the bottom lane can become code.</text>
</svg><figcaption>With a parameterised query, the SQL with its question-mark placeholder travels in one lane and the user's input travels in another. The database fixes the query's shape first, then treats the input as a plain text value, so the attack string is simply an email that matches nobody.</figcaption></figure>
<p>After the fix, the attack returns <code>null</code> because no user has the email <code>' OR '1'='1' --</code>, and Ada's real password still logs her in. That is what the second task checks.</p>

<h4>The same fix for <code>LIKE</code> searches</h4>
<p><code>searchUsers()</code> uses <code>LIKE</code>, which matches text against a pattern. In a <code>LIKE</code> pattern, <code>%</code> means "any characters here", so <code>'%grace%'</code> matches any email containing "grace". The starter code glues the term between the percent signs inside the SQL string, which is injectable in exactly the same way.</p>
<p>The fix is to build the <i>pattern</i> in JavaScript and pass the whole pattern as one value: the SQL says <code>LIKE ?</code>, and the value is the term with a percent sign added on each side. The percent signs still work as wildcards, because <code>LIKE</code> reads them from the value, but quotes and dashes in the term are now just characters to search for.</p>
<div class="mistake"><b>Common mistake</b>Putting the placeholder inside quotes, like <code>LIKE '%?%'</code>. Inside quotes, <code>?</code> is just a question-mark character, not a placeholder, so your value is never used. Placeholders always stand alone: <code>LIKE ?</code>.</div>

<h4>Why not just escape the quotes?</h4>
<p>"Escaping" means adding a marker so a quote is treated as a literal character, for example doubling it. It sounds simpler, but it has a long history of failure: different databases use different rules, character encodings create surprising bypasses, numbers aren't quoted at all, and you only need to forget once. Parameters remove the whole problem, because the value never passes through the SQL parser. Use them every time, even when you think the input is safe.</p>
<div class="mistake"><b>Common mistake</b>Parameterising the login query but not the search, the sort order or the admin report. One concatenated query anywhere is enough. Search your code for SQL strings that contain a <code>+</code> or a template-literal placeholder, and fix every one.</div>

<h4>Limiting the damage: least privilege</h4>
<p>Defence in depth applies here too. The database user your app connects as should only be allowed to do what the app needs, typically reading and writing certain tables. It should not be able to <code>DROP</code> (delete) tables or read unrelated databases. Then, if an injection ever slips through somewhere, the attacker inherits only those small powers. This idea, giving every account the least power it needs, is called <b>least privilege</b>.</p>

<h4>Reading the errors you will hit</h4>
<ul>
<li>A <b>syntax error</b> mentioning an unrecognised token or an unterminated string, after typing a lone quote into a form, is a red flag: it means your input reached the SQL parser. On a real site, that is the first sign of an injectable query.</li>
<li>If your fixed query returns nothing at all, check that the number of <code>?</code> marks matches the number of values, and that they are in the same order.</li>
<li>If the second task still fails, look for any leftover <code>+ email</code> in the SQL string. The checker looks for concatenation, not just the result.</li>
</ul>
<div class="try"><b>Try it in your head</b>The search box glues the term into <code>email LIKE '%TERM%'</code>. What would the term <code>%' OR 1=1 --</code> do? The quote ends the pattern, <code>OR 1=1</code> makes every row match, and the dashes hide the leftover quote, so it lists every user. With <code>LIKE ?</code>, the same term is just a strange string to search for, and nothing matches.</div>

<h4>Recap</h4>
<ul>
<li>Building SQL with string concatenation lets user input become SQL code. That is SQL injection.</li>
<li><code>' OR '1'='1' --</code> closes the value, adds an always-true condition and comments out the rest.</li>
<li>Parameterised queries send SQL and values separately: <code>?</code> in the SQL, values in an array, in order.</li>
<li>For <code>LIKE</code>, build the pattern with the percent signs in JavaScript and pass it as one parameter.</li>
<li>Prefer parameters to hand-escaping, and give the app's database user only the permissions it needs.</li>
</ul>
`);

explain('x3',`
<h4>Why XSS is so dangerous</h4>
<p>When a browser loads a web page, it trusts everything on that page. Any JavaScript in it runs with the full power of the site: it can read what the user sees, send requests as the user, and change the page. That is fine when all the JavaScript is yours.</p>
<p><b>Cross-site scripting</b>, written <b>XSS</b>, happens when an attacker gets <i>their</i> JavaScript onto <i>your</i> page. It is injection again, the same root cause as SQL injection, but the "code" is HTML and JavaScript and the program that runs it is the visitor's browser. Once their script runs, it can act as the victim: post messages, change their email address, or send their private data to the attacker's server.</p>
<div class="analogy"><b>Think of it like</b>A shop noticeboard where anyone can pin a card. Normally a card just shows text. XSS is a card that, when you read it, quietly picks your pocket. The noticeboard's job is to make sure every card can only ever be read, never act.</div>

<h4>How text becomes code: <code>innerHTML</code></h4>
<p>A web page is built from <b>HTML</b>, made of tags like <code>&lt;li&gt;</code> for a list item or <code>&lt;img&gt;</code> for an image. In JavaScript, every element on the page has two ways to set its contents:</p>
<ul>
<li><code>element.innerHTML = text</code> tells the browser "this text is HTML: read the tags and build elements from them".</li>
<li><code>element.textContent = text</code> tells the browser "this is just text: show the characters exactly as they are".</li>
</ul>
<p>The guestbook in this lesson uses <code>li.innerHTML = text</code>. So if someone posts a comment containing tags, the browser builds those tags. Here is the payload you will use:</p>
<pre class="snip">&lt;img src=x onerror="document.title='hacked'"&gt;</pre>
<p>Reading it piece by piece:</p>
<ol>
<li><code>&lt;img src=x&gt;</code> asks the browser to show an image from the address <code>x</code>, which doesn't exist.</li>
<li><code>onerror="..."</code> is an <b>event handler</b>: JavaScript the browser runs when something happens, here when the image fails to load.</li>
<li>The image fails immediately, so the browser runs <code>document.title='hacked'</code> and the tab title changes. A real attacker would run something far worse.</li>
</ol>
<p>Why an image and not a <code>&lt;script&gt;</code> tag? Browsers deliberately don't run script tags inserted with <code>innerHTML</code>. But event handlers like <code>onerror</code> on other tags do run, so attackers simply use those. Blocking the word "script" protects nothing.</p>

<h4>Stored, reflected and DOM-based XSS</h4>
<p>XSS comes in a few flavours, named after how the attacker's text reaches the victim:</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="Stored XSS and reflected XSS flows">
<text class="t-b" x="10" y="20">Stored XSS</text>
<g text-anchor="middle">
<rect class="bx-bad" x="10" y="30" width="86" height="38" rx="6"/><text class="t" x="53" y="54">Attacker</text>
<rect class="bx" x="114" y="30" width="86" height="38" rx="6"/><text class="t" x="157" y="54">Database</text>
<rect class="bx" x="218" y="30" width="86" height="38" rx="6"/><text class="t" x="261" y="54">Page</text>
<rect class="bx-warn" x="322" y="30" width="88" height="38" rx="6"/><text class="t" x="366" y="54">Victim</text>
<text class="t-s" x="53" y="88">1 posts it</text><text class="t-s" x="157" y="88">2 saves it</text><text class="t-s" x="261" y="88">3 shows it</text><text class="t-s" x="366" y="88">4 code runs</text>
</g>
<path class="ln-a" d="M96 49h10"/><polygon class="ah-a" points="106,43 106,55 114,49"/>
<path class="ln-a" d="M200 49h10"/><polygon class="ah-a" points="210,43 210,55 218,49"/>
<path class="ln-a" d="M304 49h10"/><polygon class="ah-a" points="314,43 314,55 322,49"/>
<line class="ln-d" x1="10" y1="110" x2="410" y2="110"/>
<text class="t-b" x="10" y="138">Reflected XSS</text>
<g text-anchor="middle">
<rect class="bx-bad" x="10" y="148" width="86" height="38" rx="6"/><text class="t" x="53" y="172">Attacker</text>
<rect class="bx" x="114" y="148" width="86" height="38" rx="6"/><text class="t" x="157" y="172">Link</text>
<rect class="bx" x="218" y="148" width="86" height="38" rx="6"/><text class="t" x="261" y="172">Server</text>
<rect class="bx-warn" x="322" y="148" width="88" height="38" rx="6"/><text class="t" x="366" y="172">Victim</text>
<text class="t-s" x="53" y="206">1 sends link</text><text class="t-s" x="157" y="206">2 victim clicks</text><text class="t-s" x="261" y="206">3 echoes it</text><text class="t-s" x="366" y="206">4 code runs</text>
</g>
<path class="ln-a" d="M96 167h10"/><polygon class="ah-a" points="106,161 106,173 114,167"/>
<path class="ln-a" d="M200 167h10"/><polygon class="ah-a" points="210,161 210,173 218,167"/>
<path class="ln-a" d="M304 167h10"/><polygon class="ah-a" points="314,161 314,173 322,167"/>
</svg><figcaption>Stored XSS: the attacker posts a malicious comment, the site saves it, and every visitor who views the page runs the code. Reflected XSS: the attacker sends a link with code in it, the victim clicks, and the server copies that text straight back into the page.</figcaption></figure>
<ul>
<li><b>Stored XSS</b>: the payload is saved, for example in the comments table, and served to everyone who views the page. One post can hit thousands of visitors, which makes it the most dangerous kind.</li>
<li><b>Reflected XSS</b>: the payload sits in a link, such as a search URL. The server copies the search term into the results page ("You searched for..."), so the victim's browser runs it. The attacker has to trick each victim into clicking.</li>
<li><b>DOM-based XSS</b>: the unsafe step happens entirely in browser JavaScript, like this lesson's guestbook, which puts the comment into the page with <code>innerHTML</code> without any server involved. The "DOM" is the browser's live tree of page elements.</li>
</ul>
<p>The fix is the same for all three: never let user text be read as HTML.</p>

<h4>The fix: treat user input as text</h4>
<p>For the second task, change one line so the comment goes in with <code>textContent</code> instead of <code>innerHTML</code>. Now the browser shows the payload as the literal characters, angle brackets and all, and nothing runs.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="The same payload through innerHTML and through textContent">
<rect class="bx-warn" x="60" y="10" width="300" height="36" rx="6"/>
<text class="t-m" x="210" y="33" text-anchor="middle">&lt;img src=x onerror=…&gt;</text>
<path class="ln" d="M150 46v24"/><polygon class="ah" points="144,68 156,68 150,76"/>
<path class="ln" d="M270 46v24"/><polygon class="ah" points="264,68 276,68 270,76"/>
<g text-anchor="middle">
<rect class="bx-bad" x="20" y="78" width="180" height="36" rx="6"/><text class="t-m" x="110" y="101">innerHTML</text>
<rect class="bx-ok" x="220" y="78" width="180" height="36" rx="6"/><text class="t-m" x="310" y="101">textContent</text>
<text class="t" x="110" y="142">builds an image</text>
<text class="t" x="110" y="166">onerror fires</text>
<text class="t-b t-bad" x="110" y="196">code runs</text>
<text class="t" x="310" y="142">shows characters</text>
<text class="t" x="310" y="166">nothing is built</text>
<text class="t-b t-ok" x="310" y="196">safe text</text>
</g>
</svg><figcaption>The same comment goes two ways. Through innerHTML, the browser builds a real image element, its error handler fires and the attacker's code runs. Through textContent, the browser only displays the characters, so the comment appears on screen as harmless text.</figcaption></figure>
<p>Modern frameworks do this for you. In React, writing <code>{comment}</code> inside JSX always inserts it as text, escaped automatically. Vue's double curly braces do the same. The danger is in the escape hatches: React's <code>dangerouslySetInnerHTML</code> and Vue's <code>v-html</code> deliberately switch that protection off. The name is a warning.</p>

<h4>Escaping, for when you must build HTML</h4>
<p>Sometimes you really do need to build an HTML string, for example in an email template. Then you <b>escape</b> the user's text first: replace each character that has a special meaning in HTML with an <b>entity</b>, a code the browser displays as that character but never treats as markup.</p>
<div class="tbl-wrap"><table><tr><th>Character</th><th>Entity</th><th>Why it is special</th></tr>
<tr><td><code>&amp;</code> ampersand</td><td><code>&amp;amp;</code></td><td>Starts every entity</td></tr>
<tr><td><code>&lt;</code> less than</td><td><code>&amp;lt;</code></td><td>Opens a tag</td></tr>
<tr><td><code>&gt;</code> greater than</td><td><code>&amp;gt;</code></td><td>Closes a tag</td></tr>
<tr><td><code>"</code> double quote</td><td><code>&amp;quot;</code></td><td>Ends a double-quoted attribute</td></tr>
<tr><td><code>'</code> single quote</td><td><code>&amp;#39;</code></td><td>Ends a single-quoted attribute</td></tr></table></div>
<p>Your <code>escapeHtml(s)</code> for the third task is a chain of five <code>.replace()</code> calls, each with a regular expression and the <code>g</code> flag so that <i>every</i> occurrence is replaced, not just the first. Order matters: replace <code>&amp;</code> <b>first</b>. If you replaced <code>&lt;</code> first, it would become <code>&amp;lt;</code>, and then the ampersand step would turn that into <code>&amp;amp;lt;</code>, which displays the wrong thing.</p>
<div class="mistake"><b>Common mistake</b>Writing your own "blocklist" that strips the word <code>script</code> or the text <code>onerror</code>. Attackers have hundreds of variations: other tags, other events, odd capitalisation, encoded characters. Escape everything, or use a well-tested sanitiser such as DOMPurify when you must accept some HTML, like a rich-text editor's output.</div>

<h4>Second layers: CSP and httpOnly cookies</h4>
<p>Even careful teams slip up, so add layers that limit the damage:</p>
<ul>
<li><b>Content-Security-Policy</b> (CSP) is an HTTP header your server sends with each page. It tells the browser which scripts are allowed. A policy like <code>script-src 'self'</code> allows only script files from your own site and blocks inline scripts and inline event handlers such as <code>onerror="..."</code>. If an injection slips through, the browser refuses to run it. CSP is a backup, never a replacement for escaping.</li>
<li><b>httpOnly cookies</b>: if your login session lives in a cookie marked <code>HttpOnly</code>, JavaScript cannot read it at all, so an XSS script can't steal the session and use it elsewhere. It can still act within the page while it runs, which is why escaping comes first. You'll meet cookie flags properly in the next lesson.</li>
</ul>
<div class="try"><b>Try it in your head</b>A profile page shows <code>&lt;p&gt;Hello, NAME&lt;/p&gt;</code>, built by gluing the user's display name into an HTML string. A user sets their name to <code>&lt;b&gt;Sam&lt;/b&gt;</code>. What appears? With no escaping, a bold "Sam": the tags worked, which proves the page is injectable. After escaping, the page shows the literal text with angle brackets, which is correct.</div>

<h4>Recap</h4>
<ul>
<li>XSS is injection into HTML: user text is read as markup, so an attacker's JavaScript runs in other people's browsers.</li>
<li><code>innerHTML</code> builds tags from text; <code>textContent</code> shows text. Use <code>textContent</code>, or a framework's normal <code>{value}</code> output, for user data.</li>
<li>Stored XSS is saved and served to everyone; reflected XSS comes from a link; DOM-based XSS happens in browser code. The fix is the same.</li>
<li>When building HTML strings, escape <code>&amp;</code> first, then <code>&lt;</code>, <code>&gt;</code>, double and single quotes.</li>
<li>Add a Content-Security-Policy and httpOnly cookies as second layers; avoid <code>dangerouslySetInnerHTML</code> with user data.</li>
</ul>
`);

explain('x4',`
<h4>Why a website needs to "remember" you</h4>
<p>The web runs on <b>HTTP</b>, and HTTP is <b>stateless</b>: every request your browser sends is handled on its own, as if the server had never seen you before. When you log in on one page and click to the next, that next request carries no memory of the login unless something in it proves who you are.</p>
<p>So after a successful login the server hands your browser a kind of <b>visitor badge</b>, and the browser shows it on every later request. There are two popular kinds of badge: a <b>session ID</b> and a <b>JWT</b>. This lesson explains both, how a server can tell a real badge from a forged one, and how the password check at the very start should work.</p>
<p>Two words first. <b>Authentication</b> means proving who you are, for example with a password. A <b>token</b> is any piece of data that stands in for that proof afterwards, so you don't have to type your password on every click.</p>

<h4>Badge type one: a session ID in a cookie</h4>
<p>With sessions, the server creates a long random string, the <b>session ID</b>, and stores a record on its side: "session a1b2... belongs to user 42". It sends the ID to the browser in a <b>cookie</b>, a small named value the browser stores and automatically attaches to every request to that site. On each request, the server looks the ID up in its <b>session store</b> (memory, a database or Redis) to find out who you are.</p>
<p>The ID itself means nothing; it is just a random key, like a cloakroom ticket. All the real information stays on the server. Logging out is easy: delete the record and the ticket is worthless.</p>

<h4>Badge type two: a JSON Web Token</h4>
<p>A <b>JWT</b>, said "jot", takes the opposite approach. Instead of a meaningless key, the token <i>contains</i> the facts, such as "user 42, role user, expires at this time", plus a <b>signature</b> that proves the server issued it and nobody has changed it. The server doesn't need to look anything up; it just checks the signature.</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="Session cookie flow compared with JWT flow">
<text class="t-b" x="10" y="18">Session cookie</text>
<g text-anchor="middle">
<rect class="bx" x="10" y="28" width="110" height="52" rx="6"/><text class="t-b" x="65" y="50">Browser</text><text class="t-m" x="65" y="70">sid=a1b2</text>
<rect class="bx" x="150" y="28" width="110" height="52" rx="6"/><text class="t-b" x="205" y="50">Server</text><text class="t-s" x="205" y="70">looks it up</text>
<rect class="bx-info" x="290" y="28" width="120" height="52" rx="6"/><text class="t-b" x="350" y="50">Store</text><text class="t-s" x="350" y="70">a1b2 = user 42</text>
</g>
<path class="ln" d="M120 54h22"/><polygon class="ah" points="142,48 142,60 150,54"/>
<path class="ln" d="M260 54h22"/><polygon class="ah" points="282,48 282,60 290,54"/>
<line class="ln-d" x1="10" y1="104" x2="410" y2="104"/>
<text class="t-b" x="10" y="130">JWT</text>
<g text-anchor="middle">
<rect class="bx" x="10" y="140" width="110" height="52" rx="6"/><text class="t-b" x="65" y="162">Browser</text><text class="t-s" x="65" y="182">token with data</text>
<rect class="bx-ok" x="146" y="140" width="122" height="52" rx="6"/><text class="t-b" x="205" y="162">Server</text><text class="t-s" x="205" y="182">checks signature</text>
<rect class="bx" x="290" y="140" width="120" height="52" rx="6" style="stroke-dasharray:5 4"/><text class="t-s" x="350" y="162">no lookup</text><text class="t-s" x="350" y="182">data is inside</text>
</g>
<path class="ln" d="M120 166h18"/><polygon class="ah" points="138,160 138,172 146,166"/>
<text class="t-s" x="210" y="224" text-anchor="middle">Session: easy to revoke. JWT: no shared store needed.</text>
</svg><figcaption>With a session, the browser sends a meaningless ID and the server looks it up in its session store to find the user. With a JWT, the browser sends a token that already contains the user's details, and the server only has to check the signature.</figcaption></figure>
<p>Each has a trade-off. Sessions are simple and can be cancelled instantly, but every server needs access to the store. JWTs need no store, which suits systems with many servers, but a JWT stays valid until it expires even if you "log out", so you give them a short lifetime.</p>

<h4>Inside a JWT: three parts and a dot between each</h4>
<p>A JWT looks like gibberish, but it has a simple shape: <code>header.payload.signature</code>.</p>
<ul>
<li>The <b>header</b> is a little JSON object saying which signing method was used, here <code>HS256</code>.</li>
<li>The <b>payload</b> is a JSON object with the <b>claims</b>, the facts about the user. In this lesson: <code>sub</code> (the "subject", the user's id, <code>"42"</code>), <code>role</code> and <code>exp</code> (the expiry time).</li>
<li>The <b>signature</b> is the proof that the first two parts are genuine.</li>
</ul>
<p>The header and payload are written in <b>base64url</b>. Base64 is a way of writing any data using only letters, digits and a couple of symbols, so it can travel safely in URLs and headers. The "url" variant swaps <code>+</code> for <code>-</code> and <code>/</code> for <code>_</code>, and drops the <code>=</code> padding at the end. Crucially, this is <b>encoding, not encryption</b>: anyone can turn it back into JSON in one step. A JWT's payload is readable by anyone who holds the token.</p>
<p>That gives you the first task. To decode the payload: split the token on the dots and take the middle part; swap <code>-</code> back to <code>+</code> and <code>_</code> back to <code>/</code> so it is ordinary base64; decode it with the browser's <code>atob()</code> ("ASCII to binary"), which gives you a JSON string; then <code>JSON.parse</code> it into an object.</p>
<div class="mistake"><b>Common mistake</b>Putting secrets in the payload, like a password, card number or private note, because it "looks encrypted". It isn't. Put only identifiers and permissions in a JWT.</div>

<h4>Expiry: the <code>exp</code> claim</h4>
<p><code>exp</code> is a <b>Unix timestamp</b>: the number of <i>seconds</i> since midnight on 1 January 1970, UTC. Computers use it because comparing two numbers is easy. The lesson gives you <code>NOW</code> in the same units. A token is expired when its <code>exp</code> is not in the future, meaning <code>exp</code> is less than or equal to now. That is all <code>isExpired</code> needs. (Watch the units in real code: JavaScript's <code>Date.now()</code> gives <i>milliseconds</i>, so divide by 1,000.)</p>

<h4>The signature: how forgery is caught</h4>
<p>The signature is made with <b>HMAC-SHA256</b>. <b>SHA-256</b> is a hash function: it turns any input into a 32-byte fingerprint, and changing even one character of the input changes the fingerprint completely. <b>HMAC</b> mixes a secret key into that process. The result: only someone who knows the <code>SECRET</code> can produce the right signature for a given header and payload.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="JWT parts and how the server verifies the signature">
<g text-anchor="middle">
<rect class="bx-info" x="10" y="10" width="120" height="40" rx="6"/><text class="t-b" x="70" y="35">header</text>
<text class="t-b" x="140" y="35">.</text>
<rect class="bx-a" x="150" y="10" width="120" height="40" rx="6"/><text class="t-b" x="210" y="35">payload</text>
<text class="t-b" x="280" y="35">.</text>
<rect class="bx-ok" x="290" y="10" width="120" height="40" rx="6"/><text class="t-b" x="350" y="35">signature</text>
<text class="t-s" x="70" y="70">alg: HS256</text><text class="t-s" x="210" y="70">sub, role, exp</text><text class="t-s" x="350" y="70">the proof</text>
<rect class="bx" x="10" y="96" width="300" height="36" rx="6"/><text class="t-m" x="160" y="119">HMAC(header.payload, SECRET)</text>
<rect class="bx" x="10" y="170" width="200" height="36" rx="6"/><text class="t" x="110" y="193">Matches signature?</text>
<rect class="bx-ok" x="260" y="148" width="150" height="34" rx="6"/><text class="t" x="335" y="170">yes: check exp</text>
<rect class="bx-bad" x="260" y="198" width="150" height="34" rx="6"/><text class="t" x="335" y="220">no: reject</text>
</g>
<path class="ln" d="M110 132v30"/><polygon class="ah" points="104,162 116,162 110,170"/>
<path class="ln-ok" d="M210 182h20v-17h22"/><polygon class="ah-ok" points="252,159 252,171 260,165"/>
<path class="ln" d="M210 194h20v21h22"/><polygon class="ah" points="252,209 252,221 260,215"/>
</svg><figcaption>A JWT is a header, a payload and a signature joined by dots. To verify it, the server recomputes the HMAC of the header and payload using its own secret. If the result matches the signature in the token, the token is genuine and the server then checks the expiry. If not, it rejects the token.</figcaption></figure>
<p>Here is why tampering fails. The <code>TAMPERED</code> token in this lesson has had its payload swapped for one that says <code>"role":"admin"</code>, but it keeps the old signature. When the server recomputes the HMAC of the new header-and-payload, it gets a completely different value, so the comparison fails. The attacker can't make a matching signature without the secret. The same happens with the right token but the <b>wrong secret</b>.</p>
<p>So <code>verifyJwt</code> does this, in order:</p>
<ol>
<li>Split the token into its three parts.</li>
<li>Turn the secret into a key with <code>crypto.subtle.importKey</code>, telling it you want HMAC with SHA-256.</li>
<li>Sign the text <code>header + '.' + body</code> with <code>crypto.subtle.sign</code>. You get raw bytes back.</li>
<li>Base64url-encode those bytes the same way the token did, and compare with the signature part. Different? Return <code>null</code>.</li>
<li>Only now decode the payload, and return <code>null</code> if it is expired. Otherwise return the payload.</li>
</ol>
<p><code>crypto.subtle</code> is the browser's built-in <b>Web Crypto API</b>. Its functions are <b>asynchronous</b>: they return a Promise, so you must <code>await</code> each one.</p>
<div class="mistake"><b>Common mistake</b>Forgetting <code>await</code> before <code>crypto.subtle.sign</code>. You then base64-encode a Promise instead of the signature bytes, nothing ever matches, and every token, even the valid one, is rejected. If all your results are <code>null</code>, look for a missing <code>await</code>.</div>
<div class="tip"><b>Tip</b>In real projects, use a well-tested library such as <code>jose</code> rather than hand-written checks. Always tell it which algorithm you expect, and never trust the <code>alg</code> written in the token's own header; old libraries were fooled by tokens claiming <code>"alg": "none"</code>.</div>

<h4>Where the browser should keep the token</h4>
<p>If you store a token in <code>localStorage</code>, any JavaScript on the page can read it, including an attacker's XSS script from the previous lesson. A cookie with the right flags is safer:</p>
<ul>
<li><code>HttpOnly</code>: JavaScript cannot read the cookie at all; only the browser sends it.</li>
<li><code>Secure</code>: the cookie is only sent over HTTPS, never plain HTTP.</li>
<li><code>SameSite=Lax</code> or <code>Strict</code>: the cookie is not sent on most requests started by other websites, which blocks a trick called cross-site request forgery.</li>
</ul>

<h4>Passwords: hash them, salt them, make it slow</h4>
<p>None of this matters if passwords leak. Never store a password itself. Store a <b>hash</b>: a one-way scramble that can't be turned back into the password. At login you hash what the user typed and compare it with the stored hash.</p>
<p>But a plain fast hash such as MD5 or SHA-256 isn't enough. Graphics cards can compute billions of them per second, so attackers who steal the database just hash every common password and look for matches. Two defences fix this:</p>
<ul>
<li>A <b>salt</b> is a random value generated for each user and stored next to their hash. It is mixed into the password before hashing, so two people with the same password get different hashes, and precomputed tables of common-password hashes become useless.</li>
<li>A <b>slow</b> password-hashing algorithm, <b>bcrypt</b>, <b>scrypt</b> or <b>argon2</b> (argon2id is today's usual first choice), is deliberately expensive. A fraction of a second per login is unnoticeable for a user but makes guessing billions of passwords impractical.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Same password with different salts gives different hashes">
<g text-anchor="middle">
<rect class="bx" x="10" y="20" width="84" height="38" rx="6"/><text class="t-m" x="52" y="44">enigma</text>
<text class="t-b" x="106" y="44">+</text>
<rect class="bx-info" x="118" y="20" width="76" height="38" rx="6"/><text class="t-m" x="156" y="44">Qx7f</text>
<rect class="bx-a" x="214" y="20" width="96" height="38" rx="6"/><text class="t" x="262" y="44">slow hash</text>
<rect class="bx-ok" x="330" y="20" width="80" height="38" rx="6"/><text class="t-m" x="370" y="44">9f2c…</text>
<rect class="bx" x="10" y="90" width="84" height="38" rx="6"/><text class="t-m" x="52" y="114">enigma</text>
<text class="t-b" x="106" y="114">+</text>
<rect class="bx-info" x="118" y="90" width="76" height="38" rx="6"/><text class="t-m" x="156" y="114">k2Lm</text>
<rect class="bx-a" x="214" y="90" width="96" height="38" rx="6"/><text class="t" x="262" y="114">slow hash</text>
<rect class="bx-ok" x="330" y="90" width="80" height="38" rx="6"/><text class="t-m" x="370" y="114">41de…</text>
<text class="t-s" x="52" y="150">password</text><text class="t-s" x="156" y="150">random salt</text><text class="t-s" x="262" y="150">argon2, bcrypt</text><text class="t-s" x="370" y="150">stored</text>
<text class="t-s" x="210" y="186">Same password, different stored values.</text>
</g>
<path class="ln" d="M194 39h12"/><polygon class="ah" points="206,33 206,45 214,39"/>
<path class="ln" d="M310 39h12"/><polygon class="ah" points="322,33 322,45 330,39"/>
<path class="ln" d="M194 109h12"/><polygon class="ah" points="206,103 206,115 214,109"/>
<path class="ln" d="M310 109h12"/><polygon class="ah" points="322,103 322,115 330,109"/>
</svg><figcaption>Two users both choose the password enigma. Each gets a different random salt, and the password plus salt goes through a slow hashing algorithm. The stored results are completely different, so an attacker can't tell they share a password or look either one up in a precomputed table.</figcaption></figure>
<p>You never write this maths yourself. A library such as <code>bcrypt</code> or <code>argon2</code> for Node creates the salt, stores it inside the result string, and gives you a "verify" function for logins.</p>

<h4>Reading the errors you will hit</h4>
<ul>
<li><code>InvalidCharacterError</code> from <code>atob</code>: you passed it base64url without swapping <code>-</code> and <code>_</code> back, or you passed the whole token instead of the middle part.</li>
<li><code>SyntaxError: Unexpected token</code> from <code>JSON.parse</code>: you decoded the wrong part, or the base64 step went wrong.</li>
<li><code>verifyJwt</code> accepts the tampered token: you probably checked expiry or decoded the payload without comparing the signature first.</li>
</ul>
<div class="try"><b>Try it in your head</b>An attacker copies a valid token, decodes the payload, changes <code>"sub":"42"</code> to <code>"sub":"1"</code>, re-encodes it and sends it. What happens? The server recomputes the HMAC over the changed payload, gets a different value from the signature in the token, and rejects it. Reading the payload was easy; changing it undetected is not.</div>

<h4>Recap</h4>
<ul>
<li>HTTP is stateless, so after login the browser carries a badge: a session ID looked up on the server, or a self-contained JWT.</li>
<li>A JWT is <code>header.payload.signature</code> in base64url. Anyone can read the payload: it is signed, not encrypted.</li>
<li>Verify by recomputing HMAC-SHA256 over <code>header.payload</code> with the secret; reject mismatches, then reject expired tokens (<code>exp</code> in seconds).</li>
<li>Keep tokens in <code>HttpOnly</code>, <code>Secure</code>, <code>SameSite</code> cookies, not <code>localStorage</code>.</li>
<li>Store passwords as salted hashes from a slow algorithm: argon2, bcrypt or scrypt. Never plain text, MD5 or a bare SHA-256.</li>
</ul>
`);

explain('x5',`
<h4>Who you are versus what you may do</h4>
<p>Two words sound alike and get mixed up all the time, so let's pin them down:</p>
<ul>
<li><b>Authentication</b> answers "<i>who are you?</i>". Logging in with a password, or presenting a valid session or token, authenticates you. You did this in the previous lesson.</li>
<li><b>Authorization</b> answers "<i>what are you allowed to do?</i>". Being logged in as Grace doesn't mean you may read Ada's invoices.</li>
</ul>
<p>Most apps get authentication right, because there is a login page and everyone tests it. Authorization is easy to forget, because nothing visibly breaks when it is missing. Everything works perfectly; it just works for the wrong people too. That is why <b>broken access control</b> sits at the top of the OWASP list.</p>
<div class="analogy"><b>Think of it like</b>A hotel. The front desk checks your passport when you arrive: that is authentication. Your key card only opens your own room: that is authorization. A hotel that checks passports but gives everyone a key card that opens every room has the bug this lesson is about.</div>

<h4>IDOR: changing a number in the URL</h4>
<p>Look at the lesson's starter code. <code>getInvoice(req)</code> receives a request object with two parts: <code>req.user</code>, the logged-in user (or <code>null</code> if nobody is logged in), and <code>req.params.id</code>, the invoice number taken from the URL, as in <code>/invoices/1</code>. It finds the invoice with that id and returns it with status 200.</p>
<p>Notice what it never asks: <i>does this invoice belong to this user?</i> So user <code>u2</code>, who owns invoice 2, can simply ask for invoice 1 and get it. This is an <b>insecure direct object reference</b>, or <b>IDOR</b>: the app uses an id straight from the request to fetch an object, with no ownership check.</p>
<figure class="fig"><svg viewBox="0 0 420 236" role="img" aria-label="Changing the invoice id in the URL with and without an ownership check">
<text class="t-s" x="10" y="16">u2 asks for their own invoice</text>
<g text-anchor="middle">
<rect class="bx" x="10" y="24" width="170" height="36" rx="6"/><text class="t-m" x="95" y="47">GET /invoices/2</text>
<rect class="bx" x="206" y="24" width="120" height="36" rx="6"/><text class="t" x="266" y="47">owner: u2</text>
<rect class="bx-ok" x="350" y="24" width="60" height="36" rx="6"/><text class="t-b" x="380" y="47">200</text>
</g>
<text class="t-s" x="10" y="92">u2 changes the id, no check</text>
<g text-anchor="middle">
<rect class="bx-warn" x="10" y="100" width="170" height="36" rx="6"/><text class="t-m" x="95" y="123">GET /invoices/1</text>
<rect class="bx" x="206" y="100" width="120" height="36" rx="6"/><text class="t" x="266" y="123">owner: u1</text>
<rect class="bx-bad" x="350" y="100" width="60" height="36" rx="6"/><text class="t-b" x="380" y="123">200</text>
</g>
<text class="t-s" x="10" y="168">same request, with an ownership check</text>
<g text-anchor="middle">
<rect class="bx-warn" x="10" y="176" width="170" height="36" rx="6"/><text class="t-m" x="95" y="199">GET /invoices/1</text>
<rect class="bx" x="206" y="176" width="120" height="36" rx="6"/><text class="t" x="266" y="199">u1 is not u2</text>
<rect class="bx-ok" x="350" y="176" width="60" height="36" rx="6"/><text class="t-b" x="380" y="199">403</text>
</g>
<path class="ln" d="M180 42h18"/><polygon class="ah" points="198,36 198,48 206,42"/><path class="ln" d="M326 42h16"/><polygon class="ah" points="342,36 342,48 350,42"/>
<path class="ln" d="M180 118h18"/><polygon class="ah" points="198,112 198,124 206,118"/><path class="ln" d="M326 118h16"/><polygon class="ah" points="342,112 342,124 350,118"/>
<path class="ln" d="M180 194h18"/><polygon class="ah" points="198,188 198,200 206,194"/><path class="ln" d="M326 194h16"/><polygon class="ah" points="342,188 342,200 350,194"/>
</svg><figcaption>User u2 asks for invoice 2, which is theirs, and gets status 200. Then they change the id to 1. Without a check, the server finds invoice 1, owned by u1, and hands it over with status 200: a data leak. With an ownership check, the same request gets 403 Forbidden.</figcaption></figure>
<p>The first task is to prove the bug. Call <code>getInvoice</code> with a fake request in which the user is <code>u2</code> and the id is <code>'1'</code>, and log the result. You'll see status 200 and amount 120, someone else's money.</p>
<p>Note that <code>req.params.id</code> is the <b>string</b> <code>'1'</code>, because everything in a URL is text. The code uses <code>Number(req.params.id)</code> to turn it into the number 1 before comparing with the invoice ids. Keep that conversion when you edit.</p>

<h4>The status codes you will return</h4>
<p>An HTTP response carries a three-digit <b>status code</b> that tells the client what happened. Four matter here:</p>
<div class="tbl-wrap"><table><tr><th>Code</th><th>Name</th><th>Use it when</th></tr>
<tr><td>200</td><td>OK</td><td>Allowed, here is the data.</td></tr>
<tr><td>401</td><td>Unauthorized</td><td>Nobody is logged in. Despite its name, it really means "not authenticated".</td></tr>
<tr><td>403</td><td>Forbidden</td><td>Logged in, but not allowed to see this.</td></tr>
<tr><td>404</td><td>Not Found</td><td>No such thing exists.</td></tr></table></div>
<p>Some apps return 404 instead of 403 for other people's records, so an attacker can't even learn which ids exist. Both are acceptable; this lesson's tasks expect 403.</p>

<h4>Building the checks in the right order</h4>
<p>The checks run as a short series of questions. Each one either stops the request with an error or lets it continue to the next:</p>
<figure class="fig"><svg viewBox="0 0 420 270" role="img" aria-label="Authorization decision flow from 401 to 404 to 403 to 200">
<g text-anchor="middle">
<rect class="bx" x="70" y="8" width="200" height="34" rx="6"/><text class="t-b" x="170" y="30">Request arrives</text>
<rect class="bx-info" x="70" y="62" width="200" height="34" rx="6"/><text class="t" x="170" y="84">Logged in?</text>
<rect class="bx-info" x="70" y="116" width="200" height="34" rx="6"/><text class="t" x="170" y="138">Invoice exists?</text>
<rect class="bx-info" x="70" y="170" width="200" height="34" rx="6"/><text class="t" x="170" y="192">Owner or admin?</text>
<rect class="bx-ok" x="70" y="226" width="200" height="34" rx="6"/><text class="t-b" x="170" y="248">200, send it</text>
<rect class="bx-bad" x="320" y="62" width="90" height="34" rx="6"/><text class="t-b" x="365" y="84">401</text>
<rect class="bx-bad" x="320" y="116" width="90" height="34" rx="6"/><text class="t-b" x="365" y="138">404</text>
<rect class="bx-bad" x="320" y="170" width="90" height="34" rx="6"/><text class="t-b" x="365" y="192">403</text>
</g>
<path class="ln" d="M170 42v12"/><polygon class="ah" points="164,54 176,54 170,62"/>
<path class="ln" d="M170 96v12"/><polygon class="ah" points="164,108 176,108 170,116"/>
<path class="ln" d="M170 150v12"/><polygon class="ah" points="164,162 176,162 170,170"/>
<path class="ln-ok" d="M170 204v14"/><polygon class="ah-ok" points="164,218 176,218 170,226"/>
<path class="ln" d="M270 79h42"/><polygon class="ah" points="312,73 312,85 320,79"/>
<path class="ln" d="M270 133h42"/><polygon class="ah" points="312,127 312,139 320,133"/>
<path class="ln" d="M270 187h42"/><polygon class="ah" points="312,181 312,193 320,187"/>
<text class="t-s" x="295" y="72" text-anchor="middle">no</text><text class="t-s" x="295" y="126" text-anchor="middle">no</text><text class="t-s" x="295" y="180" text-anchor="middle">no</text>
<text class="t-s" x="182" y="214">yes</text>
</svg><figcaption>Check in order. No user: 401. No such invoice: 404. A user who is neither the owner nor an admin: 403. Only a request that passes every check gets 200 and the data.</figcaption></figure>
<ol>
<li><b>Logged in?</b> If <code>req.user</code> is <code>null</code>, return 401 straight away. This must come first, because the later checks read <code>req.user.id</code>, and reading a property of <code>null</code> crashes with a <code>TypeError</code>.</li>
<li><b>Exists?</b> Find the invoice. If there is none, return 404.</li>
<li><b>Allowed?</b> Work out two true-or-false values: is the invoice's <code>ownerId</code> equal to <code>req.user.id</code>, and is the user's <code>role</code> equal to <code>'admin'</code>? If neither is true, return 403.</li>
<li>Otherwise return 200 with the invoice.</li>
</ol>
<p>Giving the two checks names like <code>isOwner</code> and <code>isAdmin</code> makes the rule read almost like English: "if not owner and not admin, forbidden". A <b>role</b> is simply a label on the user that grants a set of powers; checking the role is called role-based access control.</p>

<h4>Lists leak too</h4>
<p><code>listInvoices</code> has the same bug in a bigger form: it returns <i>everyone's</i> invoices. The fix is to <b>filter</b>: an admin sees all of them, everyone else sees only those whose <code>ownerId</code> matches their own id. JavaScript's array method <code>.filter()</code> keeps the items for which your test returns true. And of course, no user means 401 here as well.</p>
<p>Real apps apply the same idea in the database query itself, with a <code>WHERE owner_id = ?</code> clause, so other people's rows are never even loaded.</p>
<div class="mistake"><b>Common mistake</b>"The UI only shows links to your own invoices, so it's fine." Hiding a button protects nothing. Anyone can send requests directly with tools like <code>curl</code> or the browser's developer tools, using any id they like. Every permission check must run on the server, on every request.</div>
<div class="mistake"><b>Common mistake</b>Relying on hard-to-guess ids, such as long random UUIDs, instead of checks. Random ids make guessing harder, but ids leak through shared links, logs and emails. They are a nice extra layer, never the fix. Also remember that reading is not the only action: the same ownership check belongs on update and delete endpoints.</div>

<h4>Reading the results you will see</h4>
<ul>
<li><code>TypeError: Cannot read properties of null (reading 'id')</code>: you checked ownership before checking that a user is logged in.</li>
<li>The owner gets 403 on their own invoice: you are probably comparing the wrong fields, or comparing a number with a string. Here both <code>ownerId</code> and <code>req.user.id</code> are strings like <code>'u1'</code>.</li>
<li>The admin gets 403: your condition requires being the owner <i>and</i> an admin. The rule is "owner <i>or</i> admin".</li>
</ul>
<div class="try"><b>Try it in your head</b>A user with id <code>'u1'</code> and role <code>'member'</code> asks for invoice 2, which belongs to <code>'u2'</code>. Walk the flow: logged in, yes; exists, yes; owner, no; admin, no. Result: 403. Now an admin asks for invoice 99: logged in, yes; exists, no. Result: 404, before the role is even checked.</div>

<h4>Recap</h4>
<ul>
<li>Authentication is who you are; authorization is what you may do. Being logged in is not permission.</li>
<li>IDOR: the server fetches an object by the id in the request without checking it belongs to the user.</li>
<li>Check in order: no user gives 401, missing object gives 404, not owner or admin gives 403, otherwise 200.</li>
<li>Filter list endpoints to what the user may see; admins are the exception.</li>
<li>All checks happen on the server for every request; hiding links in the UI is not security.</li>
</ul>
`);

explain('x6',`
<h4>Why "hygiene" matters</h4>
<p>The previous lessons covered bugs in your own code. This one covers three habits that protect everything around it: keeping <b>secrets</b> out of your code, keeping your <b>dependencies</b> (other people's code) up to date, and sending <b>security headers</b> that tell browsers to be careful. None of them is glamorous, but skipping them causes a huge share of real breaches, because bots check for exactly these mistakes automatically.</p>
<p>In this lesson you are reviewing a small online shop in <code>~/shop</code> before launch. You'll hunt down a leaked key, move it somewhere safe and fix a vulnerable package.</p>

<h4>What a secret is, and why it doesn't belong in code</h4>
<p>A <b>secret</b> is any value that grants access: an API key, a database password, a token for a payment provider. The shop's <code>src/config.js</code> contains <code>stripeKey: 'sk_live_51Hx...'</code>. Stripe is a payment company, and a key starting <code>sk_live_</code> is a live <b>secret key</b>: whoever has it can act on the shop's real Stripe account, including creating refunds.</p>
<p>Code gets copied everywhere: into Git history, onto every teammate's laptop, into CI logs, screenshots and support tickets. If the repository is ever public, even for a minute, bots that scan GitHub around the clock may find the key within minutes. So secrets must live <i>outside</i> the code and be handed to the program when it runs.</p>

<h4>Step 1: find the secret with <code>grep</code></h4>
<p><code>grep</code> searches files for text. Three options make it ideal for this hunt:</p>
<pre class="snip">grep -rn "sk_live" .
# -r  search recursively, through every folder inside
# -n  show the line number of each match
# .   start from the current folder</pre>
<p>Each match prints as <code>file:line:text</code>, so <code>./src/config.js:3:  stripeKey: 'sk_live_...'</code> tells you exactly where to look. On a real project you would search for several patterns, such as <code>sk_live</code>, <code>password</code> and <code>secret</code>, and tools like GitHub secret scanning or gitleaks do this automatically.</p>

<h4>Step 2: move it into an environment variable</h4>
<p>An <b>environment variable</b> is a named value that the operating system hands to a program when it starts. Every program gets its own set. In Node.js you read them through <code>process.env</code>, so <code>process.env.STRIPE_KEY</code> is the value of the variable called <code>STRIPE_KEY</code>.</p>
<p>The code now only contains the <i>name</i> of the secret, never the value:</p>
<pre class="snip">export const config = {
  port: 3000,
  stripeKey: process.env.STRIPE_KEY,   // value comes from outside the code
};</pre>
<p>Where does the value come from? On your own machine, from a file called <code>.env</code> in the project folder, with one <code>NAME=value</code> per line. Node can load it with <code>node --env-file=.env app.js</code> (Node 20.6 and later), or with the popular <code>dotenv</code> package. In production, your hosting platform has a settings page for environment variables, and the <code>.env</code> file never leaves your laptop.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="Where the secret lives and how it reaches the code">
<g text-anchor="middle">
<rect class="bx-warn" x="10" y="14" width="130" height="40" rx="6"/><text class="t" x="75" y="39">.env (laptop)</text>
<rect class="bx-warn" x="10" y="82" width="130" height="40" rx="6"/><text class="t" x="75" y="107">host settings</text>
<rect class="bx-info" x="170" y="48" width="130" height="40" rx="6"/><text class="t-m" x="235" y="73">process.env</text>
<rect class="bx" x="330" y="48" width="80" height="40" rx="6"/><text class="t" x="370" y="73">config.js</text>
</g>
<path class="ln" d="M140 34h14v26h8"/><polygon class="ah" points="162,54 162,66 170,60"/>
<path class="ln" d="M140 102h14v-26h8"/><polygon class="ah" points="162,70 162,82 170,76"/>
<path class="ln" d="M300 68h22"/><polygon class="ah" points="322,62 322,74 330,68"/>
<line class="ln-d" x1="10" y1="146" x2="410" y2="146"/>
<text class="t-b" x="10" y="172">What Git stores</text>
<g text-anchor="middle">
<rect class="bx-ok" x="10" y="182" width="190" height="38" rx="6"/><text class="t" x="105" y="206">code, .gitignore</text>
<rect class="bx-bad" x="220" y="182" width="190" height="38" rx="6"/><text class="t" x="315" y="206">never .env</text>
</g>
</svg><figcaption>The secret's value lives in a .env file on your laptop, or in your host's settings in production. Either way it arrives in the running program through process.env, and config.js only refers to it by name. Git stores the code and the .gitignore file, but never the .env file.</figcaption></figure>
<p>For the second task, edit <code>src/config.js</code> (for example with <code>nano</code>, a simple terminal text editor) and create <code>.env</code> containing the key. A quick way to create a one-line file is <code>echo "STRIPE_KEY=..." &gt; .env</code>. A single <code>&gt;</code> writes the text into the file, replacing anything already there.</p>

<h4>Step 3: make Git ignore <code>.env</code></h4>
<p><code>.gitignore</code> lists files Git should never track. The shop's version only ignores <code>node_modules</code>. Add a line containing <code>.env</code>. Use <code>&gt;&gt;</code> this time: a double arrow <b>appends</b> to the end of the file instead of replacing it, so the existing <code>node_modules</code> line survives. Then <code>cat .gitignore</code> to check both lines are there.</p>
<div class="tip"><b>Tip</b>Teams often commit a file called <code>.env.example</code> listing the variable names with blank or fake values. New developers copy it to <code>.env</code> and fill in their own keys, and nobody has to guess which variables the app needs.</div>

<h4>If a secret was ever committed: rotate it</h4>
<p>Moving the key out of the code fixes the future, not the past. Git keeps every old version of every file, so the key is still in the history, and if it was pushed, copies may already exist. The only real fix is to <b>rotate</b> it: go to the provider (here Stripe's dashboard), revoke the old key so it stops working, and create a new one for your <code>.env</code> and host settings. Cleaning the history with tools like <code>git filter-repo</code> comes afterwards and is optional tidying. Making the repository private or deleting the commit does not un-leak anything.</p>
<div class="mistake"><b>Common mistake</b>Thinking "I deleted the line and pushed again, so it's gone." The old commit still contains the key, and anyone who cloned or scraped the repository has it. Assume a pushed secret is compromised and rotate it immediately.</div>

<h4>Step 4: audit your dependencies</h4>
<p>Your <code>package.json</code> lists two <b>dependencies</b>, packages your app installs from npm: <code>express</code> and <code>lodash</code>. Each of those has dependencies of its own, so a typical app really runs hundreds of packages written by strangers. This web of other people's code is your <b>software supply chain</b>, and a hole anywhere in it is a hole in your app.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="Dependency tree with one vulnerable package flagged by the advisory database">
<g text-anchor="middle">
<rect class="bx" x="150" y="8" width="120" height="36" rx="6"/><text class="t-b" x="210" y="31">shop</text>
<rect class="bx" x="20" y="80" width="150" height="36" rx="6"/><text class="t" x="95" y="103">express 4.21</text>
<rect class="bx-bad" x="240" y="80" width="170" height="36" rx="6"/><text class="t" x="325" y="103">lodash 4.17.15</text>
<rect class="bx" x="10" y="160" width="100" height="32" rx="6"/><text class="t-s" x="60" y="181">body-parser</text>
<rect class="bx" x="120" y="160" width="80" height="32" rx="6"/><text class="t-s" x="160" y="181">cookie</text>
<rect class="bx-info" x="240" y="160" width="170" height="32" rx="6"/><text class="t-s" x="325" y="181">advisory database</text>
<text class="t-s" x="105" y="212">and many more</text>
</g>
<path class="ln" d="M190 44v18h-95v18"/><path class="ln" d="M230 44v18h95v18"/>
<path class="ln" d="M95 116v22h-35v22"/><path class="ln" d="M95 116v22h65v22"/>
<path class="ln-d" d="M325 160v-44"/>
<text class="t-s t-bad" x="333" y="142">known hole</text>
</svg><figcaption>The shop depends on express and lodash, and express depends on many more packages. npm audit compares every installed version against a public advisory database of known vulnerabilities, and flags lodash version 4.17.15 as having a known hole.</figcaption></figure>
<p><code>npm audit</code> checks every installed package version against a public database of security advisories. Run it and it reports that <code>lodash</code> below version 4.17.21 has critical vulnerabilities, with links to the advisories, and says "fix available via npm audit fix". <code>npm audit fix</code> then upgrades the package to a safe version where it can do so without breaking changes. Run <code>npm audit</code> again to confirm "found 0 vulnerabilities". The task expects that order: audit, fix, audit again.</p>
<p>On real projects, turn on <b>Dependabot</b> or <b>Renovate</b> so pull requests for security updates arrive automatically, and run your tests before merging them. Pinning an old version forever, as the shop did with <code>"lodash": "4.17.15"</code>, means never receiving fixes.</p>

<h4>Step 5: security headers</h4>
<p>Every HTTP response carries <b>headers</b>, named lines of metadata sent before the page itself. A few headers switch on protections that browsers already have built in:</p>
<div class="tbl-wrap"><table><tr><th>Header</th><th>What it tells the browser</th></tr>
<tr><td><code>Strict-Transport-Security</code></td><td>"Only ever talk to this site over HTTPS, for the next N seconds." Stops attackers downgrading you to plain HTTP. Often called HSTS.</td></tr>
<tr><td><code>Content-Security-Policy</code></td><td>Which sources of scripts, styles and images are allowed. Limits the damage of XSS.</td></tr>
<tr><td><code>X-Frame-Options: DENY</code> or CSP <code>frame-ancestors 'none'</code></td><td>"Don't let other sites show this page inside a frame." Stops <b>clickjacking</b>, where your page is hidden under a fake button on another site.</td></tr>
<tr><td><code>X-Content-Type-Options: nosniff</code></td><td>"Trust the declared file type; don't guess." Stops an uploaded text file being run as a script.</td></tr></table></div>
<p>In an Express app, the <code>helmet</code> package sets sensible versions of these in one line. You can see any site's headers with <code>curl -I https://example.com</code>.</p>
<p>One header family is often misunderstood: <b>CORS</b>, cross-origin resource sharing. An <b>origin</b> is the scheme, host and port of a site, like <code>https://shop.example</code>. By default, a browser won't let JavaScript on one origin read responses from another. CORS headers on your API relax that rule for origins you list. It is a <i>browser</i> rule only: it doesn't stop <code>curl</code> or another server from calling your API. Authentication and authorization do that.</p>
<div class="try"><b>Try it in your head</b>You run <code>echo ".env" &gt; .gitignore</code> by mistake, with a single arrow. What is in <code>.gitignore</code> now? Only <code>.env</code>: the single arrow replaced the file, so <code>node_modules</code> is no longer ignored and thousands of package files may get committed. Use <code>&gt;&gt;</code> to append.</div>

<h4>Recap</h4>
<ul>
<li>Find hardcoded secrets with <code>grep -rn</code>, then read them from <code>process.env</code> instead of writing them in code.</li>
<li>Keep values in an ignored <code>.env</code> locally and in your host's settings in production; add <code>.env</code> to <code>.gitignore</code> with <code>&gt;&gt;</code>.</li>
<li>A secret that was ever committed must be rotated: revoke it and issue a new one.</li>
<li>Run <code>npm audit</code>, fix with <code>npm audit fix</code>, and automate updates with Dependabot or Renovate.</li>
<li>Send HSTS, CSP, frame protection and <code>nosniff</code> headers; CORS is a browser rule, not API protection.</li>
</ul>
`);
