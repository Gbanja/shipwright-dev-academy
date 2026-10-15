/* security: "Explained step by step" walkthroughs. */

explain('x1',`
<p>Every website you build will be poked at by strangers, many of them automatic programs that scan the whole internet day and night. You cannot guess every trick, and you don't have to: the same few mistakes cause most real break-ins, year after year.</p>

${V.card(1,'The most wanted list','ten risks behind most breaches',`
<figure class="fig"><svg viewBox="0 0 420 196" role="img" aria-label="A wanted board with six of the OWASP Top 10 risks: access control, crypto, injection, misconfiguration, outdated parts, logging">
<rect class="bx" x="6" y="6" width="408" height="184" rx="10"/>
<text class="t-b" x="210" y="30" text-anchor="middle" style="font-size:17px">OWASP Top 10: most wanted</text>
<rect class="bx-bad" x="16" y="42" width="126" height="66" rx="8"/>${V.ic('unlock',24,58,34,'ic-bad')}<text class="t-b" x="64" y="70">A01</text><text class="t" x="64" y="94">Access</text>
<rect class="bx-warn" x="150" y="42" width="126" height="66" rx="8"/>${V.ic('key',158,58,34,'ic-warn')}<text class="t-b" x="198" y="70">A02</text><text class="t" x="198" y="94">Crypto</text>
<rect class="bx-bad" x="284" y="42" width="126" height="66" rx="8"/>${V.ic('bug',292,58,34,'ic-bad')}<text class="t-b" x="332" y="70">A03</text><text class="t" x="332" y="94">Injection</text>
<rect class="bx-warn" x="16" y="116" width="126" height="66" rx="8"/>${V.ic('gear',24,132,34,'ic-warn')}<text class="t-b" x="64" y="144">A05</text><text class="t" x="64" y="168">Misconfig</text>
<rect class="bx-warn" x="150" y="116" width="126" height="66" rx="8"/>${V.ic('box',158,132,34,'ic-warn')}<text class="t-b" x="198" y="144">A06</text><text class="t" x="198" y="168">Outdated</text>
<rect class="bx-warn" x="284" y="116" width="126" height="66" rx="8"/>${V.ic('clock',292,132,34,'ic-warn')}<text class="t-b" x="332" y="144">A09</text><text class="t" x="332" y="168">Logging</text>
</svg><figcaption>Six of the ten. A01 is broken access control: people reaching things that are not theirs. It sits at number one because it turns up in more apps than anything else.</figcaption></figure>
${V.like(`<p>A "most wanted" board at a police station. The police cannot stop every crime, so they pin up the ten criminals who do the most damage. Learn those ten faces and you will spot most trouble before it happens.</p>`)}
${V.why(`<p><b>OWASP</b> (the Open Worldwide Application Security Project) is a charity of security volunteers. Since 2003 they have gathered data from thousands of real apps and ranked the risks behind real breaches. They update the list every few years. This lesson shows the 2021 numbering; the 2025 edition reshuffles some places, but broken access control is still number one.</p>`)}
${V.anat([[1,'A03'],':',[2,'2021'],'-',[3,'Injection']],[
 '<b>Rank.</b> A for application, then the position on the list. Lower means more common or more harmful.',
 '<b>Edition.</b> The year of the list. Always say which year, because the numbers change.',
 '<b>Category.</b> A family of mistakes, not one single bug. Injection covers SQL, shell commands and XSS.'])}
${V.rules(V.rh('The ten, in plain words'),
 V.ok('A01 Access control','Users see or change things that are not theirs'),V.ok('A02 Crypto failures','Plain-text passwords, weak hashing, no HTTPS'),
 V.ok('A03 Injection','Typed input runs as SQL, shell or page script'),V.ok('A04 Insecure design','The plan itself is unsafe, e.g. no limit on login tries'),
 V.ok('A05 Misconfiguration','Default passwords, debug mode on, open storage'),V.ok('A06 Outdated parts','Libraries with known, published holes'),
 V.ok('A07 Auth failures','Weak logins, no 2FA, sessions that never end'),V.ok('A08 Integrity failures','Updates or packages nobody checked'),
 V.ok('A09 Logging failures','Attacks happen and nobody notices'),V.ok('A10 SSRF','Your server is tricked into fetching internal URLs'))}
${V.hook(`Ten faces on the wall. Number one: "Is this really yours?"`)}
`)}

${V.card(2,'Spot the risk','name it, then you can fix it',`
<p>Security people sort every problem into a category, because each category has a known fix. Step through some incidents and watch each one get its label.</p>
${V.steps([
 ['The admin page opens for anyone who types its address. Nothing checks who you are or what you may do. That is <b>broken access control</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="Incident: admin page opens for anyone. Category A01 broken access control">
<rect class="bx" x="6" y="8" width="408" height="76" rx="8"/>${V.ic('warn',16,22,40,'ic-warn')}
<text class="t" x="68" y="40">The /admin page opens for anyone</text><text class="t" x="68" y="64">who types the address.</text>
<path class="ln-a" d="M210 88V104"/><polygon class="ah-a" points="203,102 217,102 210,112"/>
<rect class="bx-a" x="40" y="114" width="340" height="50" rx="8"/>${V.ic('unlock',52,120,38,'ic-a')}
<text class="t-b" x="100" y="145" style="font-size:17px">A01 Broken access control</text>
</svg>`],
 ['A search box pastes your words straight into a database command. Typed text that becomes code is <b>injection</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="Incident: search text pasted into SQL. Category A03 injection">
<rect class="bx" x="6" y="8" width="408" height="76" rx="8"/>${V.ic('warn',16,22,40,'ic-warn')}
<text class="t" x="68" y="40">A search box pastes your words</text><text class="t" x="68" y="64">straight into an SQL command.</text>
<path class="ln-a" d="M210 88V104"/><polygon class="ah-a" points="203,102 217,102 210,112"/>
<rect class="bx-a" x="40" y="114" width="340" height="50" rx="8"/>${V.ic('bug',52,120,38,'ic-a')}
<text class="t-b" x="100" y="145" style="font-size:17px">A03 Injection</text>
</svg>`],
 ['Passwords are saved exactly as people typed them. One leak and every account is open. That is a <b>cryptographic failure</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="Incident: passwords saved as typed. Category A02 cryptographic failures">
<rect class="bx" x="6" y="8" width="408" height="76" rx="8"/>${V.ic('warn',16,22,40,'ic-warn')}
<text class="t" x="68" y="40">Passwords are saved in the</text><text class="t" x="68" y="64">database exactly as typed.</text>
<path class="ln-a" d="M210 88V104"/><polygon class="ah-a" points="203,102 217,102 210,112"/>
<rect class="bx-a" x="40" y="114" width="340" height="50" rx="8"/>${V.ic('key',52,120,38,'ic-a')}
<text class="t-b" x="100" y="145" style="font-size:17px">A02 Cryptographic failures</text>
</svg>`],
 ['A storage bucket full of customer files was left public. The code was fine; the <b>settings</b> were wrong. That is misconfiguration.',`<svg viewBox="0 0 420 170" role="img" aria-label="Incident: public storage bucket. Category A05 security misconfiguration">
<rect class="bx" x="6" y="8" width="408" height="76" rx="8"/>${V.ic('warn',16,22,40,'ic-warn')}
<text class="t" x="68" y="40">A storage bucket of customer</text><text class="t" x="68" y="64">files was left open to everyone.</text>
<path class="ln-a" d="M210 88V104"/><polygon class="ah-a" points="203,102 217,102 210,112"/>
<rect class="bx-a" x="40" y="114" width="340" height="50" rx="8"/>${V.ic('gear',52,120,38,'ic-a')}
<text class="t-b" x="100" y="145" style="font-size:17px">A05 Misconfiguration</text>
</svg>`],
 ['A library from years ago has a published hole, called a <b>CVE</b> (a numbered public warning). Nobody updated it. That is an <b>outdated component</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="Incident: old library with a known CVE. Category A06 vulnerable and outdated components">
<rect class="bx" x="6" y="8" width="408" height="76" rx="8"/>${V.ic('warn',16,22,40,'ic-warn')}
<text class="t" x="68" y="40">The app still uses a 2015 library</text><text class="t" x="68" y="64">with a known, published hole.</text>
<path class="ln-a" d="M210 88V104"/><polygon class="ah-a" points="203,102 217,102 210,112"/>
<rect class="bx-a" x="40" y="114" width="340" height="50" rx="8"/>${V.ic('box',52,120,38,'ic-a')}
<text class="t-b" x="100" y="145" style="font-size:17px">A06 Outdated components</text>
</svg>`],
 ['Someone tried thousands of passwords overnight and no alarm went off. Nobody was watching the logs. That is a <b>logging and monitoring failure</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="Incident: thousands of failed logins, no alert. Category A09 logging and monitoring failures">
<rect class="bx" x="6" y="8" width="408" height="76" rx="8"/>${V.ic('warn',16,22,40,'ic-warn')}
<text class="t" x="68" y="40">Thousands of wrong passwords</text><text class="t" x="68" y="64">overnight. No alarm went off.</text>
<path class="ln-a" d="M210 88V104"/><polygon class="ah-a" points="203,102 217,102 210,112"/>
<rect class="bx-a" x="40" y="114" width="340" height="50" rx="8"/>${V.ic('clock',52,120,38,'ic-a')}
<text class="t-b" x="100" y="145" style="font-size:17px">A09 Logging failures</text>
</svg>`]])}
${V.rules(V.rh('Quick tells for each label'),
 V.ok('"not theirs"','Someone reached data or pages they should not: access control'),V.ok('"became code"','Input was run as SQL, shell or script: injection'),
 V.ok('"stored badly"','Plain text, MD5, no HTTPS: crypto failure'),V.ok('"wrong settings"','Defaults, debug pages, open buckets: misconfiguration'),
 V.ok('"old version"','A CVE in a dependency: outdated components'),V.ok('"nobody noticed"','No logs or alerts: logging failure'))}
${V.hook(`Not theirs, became code, stored badly, wrong settings, old version, nobody noticed.`)}
`)}

${V.card(3,'Layers of defence','no single lock is enough',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A castle with a moat, a wall, a guard and a vault: four layers">
<rect class="bx-info" x="6" y="8" width="408" height="154" rx="14"/><text class="t-s" x="18" y="28">moat: HTTPS</text>
<rect class="bx" x="40" y="36" width="340" height="118" rx="10"/><text class="t-s" x="52" y="56">wall: login check</text>
<rect class="bx-a" x="80" y="64" width="260" height="82" rx="8"/><text class="t-s" x="92" y="84">guard: "is it yours?"</text>
<rect class="bx-ok" x="150" y="92" width="120" height="46" rx="6"/>${V.ic('lock',160,98,34,'ic-ok')}<text class="t-b" x="200" y="121">data</text>
</svg><figcaption>Defence in depth: several layers, so one mistake does not open everything.</figcaption></figure>
${V.like(`<p>A castle has a moat, a wall, guards and a locked vault. An attacker who swims the moat still meets the wall. Your app works the same way: if one check fails, the next one catches the attack.</p>`)}
${V.steps([
 ['A request arrives at your app. It travels over <b>HTTPS</b>, so nobody on the café Wi-Fi can read or change it.',`<svg viewBox="0 0 420 160" role="img" aria-label="Request passes the HTTPS layer">
<circle class="dot" cx="20" cy="24" r="9"/><path class="ln-a" d="M32 24H64"/>
<rect class="bx-ok" x="20" y="44" width="70" height="104" rx="8"/>${V.ic('lock',37,60,36,'ic-ok')}<text class="t-b" x="55" y="134" text-anchor="middle">HTTPS</text>
<rect class="bx" x="98" y="44" width="70" height="104" rx="8"/>${V.ic('person',115,60,36,'ic-info')}<text class="t-b" x="133" y="134" text-anchor="middle">Login</text>
<rect class="bx" x="176" y="44" width="70" height="104" rx="8"/>${V.ic('key',193,60,36,'ic-info')}<text class="t-b" x="211" y="134" text-anchor="middle">Owner</text>
<rect class="bx" x="254" y="44" width="70" height="104" rx="8"/>${V.ic('shield',271,60,36,'ic-info')}<text class="t-b" x="289" y="134" text-anchor="middle">Params</text>
<rect class="bx" x="332" y="44" width="70" height="104" rx="8"/>${V.ic('clock',349,60,36,'ic-info')}<text class="t-b" x="367" y="134" text-anchor="middle">Logs</text>
</svg>`],
 ['It belongs to a real, logged-in user, so it passes the <b>login</b> check. The owner check passes too: they are asking about their own account.',`<svg viewBox="0 0 420 160" role="img" aria-label="Request passes login and owner checks">
<circle class="dot" cx="250" cy="24" r="9"/><path class="ln-a" d="M20 24H238"/>
<rect class="bx-ok" x="20" y="44" width="70" height="104" rx="8"/>${V.ic('lock',37,60,36,'ic-ok')}<text class="t-b" x="55" y="134" text-anchor="middle">HTTPS</text>
<rect class="bx-ok" x="98" y="44" width="70" height="104" rx="8"/>${V.ic('person',115,60,36,'ic-ok')}<text class="t-b" x="133" y="134" text-anchor="middle">Login</text>
<rect class="bx-ok" x="176" y="44" width="70" height="104" rx="8"/>${V.ic('key',193,60,36,'ic-ok')}<text class="t-b" x="211" y="134" text-anchor="middle">Owner</text>
<rect class="bx" x="254" y="44" width="70" height="104" rx="8"/>${V.ic('shield',271,60,36,'ic-info')}<text class="t-b" x="289" y="134" text-anchor="middle">Params</text>
<rect class="bx" x="332" y="44" width="70" height="104" rx="8"/>${V.ic('clock',349,60,36,'ic-info')}<text class="t-b" x="367" y="134" text-anchor="middle">Logs</text>
</svg>`],
 ['But the search text contains SQL. The <b>parameterised query</b> treats it as plain text, so the trick does nothing. Blocked.',`<svg viewBox="0 0 420 160" role="img" aria-label="Parameters layer blocks the injection">
<circle class="dot" cx="250" cy="24" r="9"/><path class="ln-a" d="M20 24H238"/>${V.ic('cross',272,6,36,'ic-bad')}
<rect class="bx-ok" x="20" y="44" width="70" height="104" rx="8"/>${V.ic('lock',37,60,36,'ic-ok')}<text class="t-b" x="55" y="134" text-anchor="middle">HTTPS</text>
<rect class="bx-ok" x="98" y="44" width="70" height="104" rx="8"/>${V.ic('person',115,60,36,'ic-ok')}<text class="t-b" x="133" y="134" text-anchor="middle">Login</text>
<rect class="bx-ok" x="176" y="44" width="70" height="104" rx="8"/>${V.ic('key',193,60,36,'ic-ok')}<text class="t-b" x="211" y="134" text-anchor="middle">Owner</text>
<rect class="bx-hl" x="254" y="44" width="70" height="104" rx="8"/>${V.ic('shield',271,60,36,'ic-a')}<text class="t-b" x="289" y="134" text-anchor="middle">Params</text>
<rect class="bx" x="332" y="44" width="70" height="104" rx="8"/>${V.ic('clock',349,60,36,'ic-info')}<text class="t-b" x="367" y="134" text-anchor="middle">Logs</text>
</svg>`],
 ['Finally the <b>logs</b> record the strange request and raise an alert. A person can now look into it before the attacker tries something else.',`<svg viewBox="0 0 420 160" role="img" aria-label="Logs record the attempt and raise an alert">
<circle class="dot-m" cx="250" cy="24" r="9"/><path class="ln-d" d="M262 24H340"/>${V.ic('warn',348,4,38,'ic-warn')}
<rect class="bx-ok" x="20" y="44" width="70" height="104" rx="8"/>${V.ic('lock',37,60,36,'ic-ok')}<text class="t-b" x="55" y="134" text-anchor="middle">HTTPS</text>
<rect class="bx-ok" x="98" y="44" width="70" height="104" rx="8"/>${V.ic('person',115,60,36,'ic-ok')}<text class="t-b" x="133" y="134" text-anchor="middle">Login</text>
<rect class="bx-ok" x="176" y="44" width="70" height="104" rx="8"/>${V.ic('key',193,60,36,'ic-ok')}<text class="t-b" x="211" y="134" text-anchor="middle">Owner</text>
<rect class="bx-ok" x="254" y="44" width="70" height="104" rx="8"/>${V.ic('shield',271,60,36,'ic-ok')}<text class="t-b" x="289" y="134" text-anchor="middle">Params</text>
<rect class="bx-hl" x="332" y="44" width="70" height="104" rx="8"/>${V.ic('clock',349,60,36,'ic-warn')}<text class="t-b" x="367" y="134" text-anchor="middle">Logs</text>
</svg>`]])}
${V.rules(V.rh('Rules: the law and good sense'),
 V.ok('your own sandbox','Practise only on systems you own, or ones built for it like OWASP Juice Shop'),
 V.no('"just testing" a real site','Without written permission it is a crime (in the UK, the Computer Misuse Act)'),
 V.ok('assume input is hostile','Every form, URL and header can be typed by an attacker'),
 V.ok('check on the server','The browser is in the user\'s hands; it can be changed'))}
${V.hook(`Moat, wall, guard, vault, alarm. One layer fails, the next one holds.`)}
`)}

<div class="try"><b>Try it in your head</b>1. A shop shows another customer's address when you change a number in the URL. Which category? <i>A01 broken access control.</i> 2. A password database leaks and the passwords are readable. Which category? <i>Cryptographic failures.</i> 3. Is it fine to test your school's website for holes "to help"? <i>No, not without written permission.</i></div>
`);

explain('x2',`
<p>One of the oldest web attacks still works on careless code today. A few odd characters typed into a login box can let a stranger in as the admin. Once you see how, the fix is one simple habit.</p>

${V.card(1,'How injection happens','typed text becomes code',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A form letter: Give the parcel to blank. Someone fills the blank with Bob. Also open the safe.">
<rect class="bx" x="10" y="10" width="400" height="100" rx="10"/>${V.ic('file',22,24,42,'ic-info')}
<text class="t" x="76" y="44" style="font-size:17px">Give the parcel to</text>
<rect class="bx-warn" x="76" y="58" width="322" height="38" rx="6"/>
<text class="t-m" x="86" y="83">Bob. <tspan class="t-bad" style="font-weight:700">Also open the safe.</tspan></text>
<text class="t-s" x="210" y="138" text-anchor="middle">The blank was meant for a name.</text>
<text class="t-s" x="210" y="160" text-anchor="middle">The reader obeyed the whole line instead.</text>
</svg><figcaption>Injection: data meant for a blank is read as extra instructions.</figcaption></figure>
${V.like(`<p>A form letter with a blank: "Give the parcel to ____". Someone writes "Bob. Also open the safe." If the reader follows the whole line as instructions, the blank has become a command. The database is that reader.</p>`)}
${V.why(`<p>Apps talk to databases in <b>SQL</b>. Early web code built SQL by gluing the user's text into a string with <code>+</code>, which is called <b>concatenation</b>. The database receives one long string and cannot tell which part you wrote and which part a stranger typed. Injection was first described publicly in 1998, and it still shows up today.</p>`)}
${V.anat([[1,'"... WHERE email = \''],' ',[2,'+ email +'],' ',[3,'"\' AND ..."']],[
 '<b>Your SQL, part one.</b> It opens a quote and expects a plain email to follow.',
 '<b>The user\'s text, glued in.</b> Whatever they type lands inside your code, quotes and all.',
 '<b>Your SQL, part two.</b> It closes the quote and adds the password check. An attacker can make this part disappear.'])}
<p><b>Watch the query change meaning.</b> Three SQL ideas matter: a quote <code>'</code> ends a text value, <code>OR</code> means "either side true is enough", and <code>--</code> starts a comment that the database ignores.</p>
${V.steps([
 ['A normal login. The email sits safely between the two quotes and the database checks both the email and the password.',`<svg viewBox="0 0 420 200" role="img" aria-label="Normal login query with ada's email between quotes">
<rect class="bx-dark" x="6" y="8" width="408" height="96" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">SELECT id, email, role FROM users</text>
<text class="t-term" x="18" y="62" style="font-size:14px">WHERE email = '<tspan class="t-ok">ada@example.com</tspan>'</text>
<text class="t-term" x="18" y="88" style="font-size:14px">AND password_hash = 'h$…'</text>
<text class="t-s" x="10" y="132">Typed in the email box:</text>
<rect class="bx" x="10" y="140" width="400" height="40" rx="6"/><text class="t-m" x="22" y="166" style="font-size:16px">ada@example.com</text>
</svg>`],
 ['Now someone types <b>\' OR \'1\'=\'1\' --</b> as the email. The code glues it in exactly as typed.',`<svg viewBox="0 0 420 200" role="img" aria-label="Attacker input glued into the query">
<rect class="bx-dark" x="6" y="8" width="408" height="96" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">SELECT id, email, role FROM users</text>
<text class="t-term" x="18" y="62" style="font-size:14px">WHERE email = '<tspan class="t-warn">' OR '1'='1' --</tspan>'</text>
<text class="t-term" x="18" y="88" style="font-size:14px">AND password_hash = 'h$…'</text>
<text class="t-s" x="10" y="132">Typed in the email box:</text>
<rect class="bx-warn" x="10" y="140" width="400" height="40" rx="6"/><text class="t-m" x="22" y="166" style="font-size:16px">' OR '1'='1' --</text>
</svg>`],
 ['The first quote closes the email early: <b>email = \'\'</b> matches nobody. Then <b>OR \'1\'=\'1\'</b> is true for every row. Then <b>--</b> turns the rest, including the password check, into a comment.',`<svg viewBox="0 0 420 200" role="img" aria-label="The database reads always-true condition and a comment">
<rect class="bx-dark" x="6" y="8" width="408" height="96" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">SELECT id, email, role FROM users</text>
<text class="t-term" x="18" y="62" style="font-size:14px">WHERE email = '' <tspan class="t-bad" style="font-weight:700">OR '1'='1'</tspan> <tspan class="t-dim">--'</tspan></text>
<text class="t-term t-dim" x="18" y="88" style="font-size:14px">AND password_hash = 'h$…'</text>
<rect class="bx" x="10" y="122" width="126" height="64" rx="6"/><text class="t-m" x="73" y="148" text-anchor="middle">email=''</text><text class="t-s" x="73" y="172" text-anchor="middle">no one</text>
<rect class="bx-bad" x="146" y="122" width="126" height="64" rx="6"/><text class="t-m" x="209" y="148" text-anchor="middle">'1'='1'</text><text class="t-s" x="209" y="172" text-anchor="middle">always true</text>
<rect class="bx" x="282" y="122" width="128" height="64" rx="6"/><text class="t-m" x="346" y="148" text-anchor="middle">-- ...</text><text class="t-s" x="346" y="172" text-anchor="middle">ignored</text>
</svg>`],
 ['Every row matches. The code takes the first one, <b>[0]</b>, which is Ada, the admin. The attacker is in without any password.',`<svg viewBox="0 0 420 200" role="img" aria-label="All rows returned, first is the admin">
<rect class="bx-dark" x="6" y="8" width="408" height="96" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">SELECT id, email, role FROM users</text>
<text class="t-term" x="18" y="62" style="font-size:14px">WHERE email = '' <tspan class="t-bad" style="font-weight:700">OR '1'='1'</tspan> <tspan class="t-dim">--'</tspan></text>
<text class="t-term t-dim" x="18" y="88" style="font-size:14px">AND password_hash = 'h$…'</text>
${V.ic('db',12,122,56,'ic-info')}
<rect class="bx-bad" x="80" y="118" width="330" height="30" rx="5"/><text class="t-m" x="92" y="139">[0] ada@example.com  admin</text>
<rect class="bx" x="80" y="152" width="330" height="20" rx="4"/><text class="t-m t-dim" x="92" y="167" style="font-size:14px">[1] grace@example.com  member</text>
<text class="t-bad" x="80" y="194" style="font-size:14px">Logged in as admin. No password needed.</text>
</svg>`]])}
${V.rules(V.rh('Rules: the danger signs'),
 V.no('"... = \'" + email + "\'"','User text glued into SQL with +'),V.no('`... = \'\${email}\'`','A template string is still gluing'),
 V.no('escaping quotes by hand','Decades of clever bypasses; easy to get wrong'),V.ok('only test your sandbox','This lesson\'s database is built for it'))}
${V.hook(`If your SQL has a <code>+</code> next to user input, it has a door you did not mean to build.`)}
`)}

${V.card(2,'Parameterised queries','code and data travel separately',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Two envelopes go to the database: one holds the SQL with question marks, the other holds the values">
<rect class="bx-a" x="10" y="16" width="190" height="80" rx="8"/>${V.ic('mail',22,28,34,'ic-a')}<text class="t-b" x="64" y="50">The SQL</text>
<text class="t-m" x="22" y="84" style="font-size:14px">WHERE email = ?</text>
<rect class="bx-info" x="10" y="106" width="190" height="56" rx="8"/>${V.ic('mail',22,116,34,'ic-info')}<text class="t-b" x="64" y="140">The values</text>
<path class="ln-a" d="M206 56H300"/><polygon class="ah-a" points="298,49 298,63 310,56"/>
<path class="ln" d="M206 134H300"/><polygon class="ah" points="298,127 298,141 310,134"/>
${V.ic('db',322,50,80,'ic-info')}<text class="t-s" x="362" y="152" text-anchor="middle">database</text>
</svg><figcaption>The SQL goes first with <code>?</code> holes. The values go separately and only ever fill holes.</figcaption></figure>
${V.like(`<p>A paper form with boxes. Whatever you write inside the "Name" box is treated as a name, even if you write "and give me the keys". The box decides what the writing means, not the writing itself.</p>`)}
${V.why(`<p>Because the database receives the SQL and the values on separate tracks, it fixes the <b>shape</b> of the query before it ever sees user input. Nothing typed can close a quote or add an <code>OR</code>. This is called a <b>parameterised query</b> or prepared statement, and every serious database library supports it.</p>`)}
${V.anat([[1,'db.query('],[2,"'... WHERE email = ? AND password_hash = ?'"],', ',[3,'[email, hash(password)]'],[1,')']],[
 '<b>The call.</b> Your database library\'s query function.',
 '<b>The SQL.</b> A fixed string. Every place a value goes gets a <code>?</code> placeholder. No <code>+</code>, no quotes around the <code>?</code>.',
 '<b>The values.</b> An array, in the same order as the <code>?</code> marks. They are always data.'])}
${V.steps([
 ['Step 1: the SQL arrives alone, with <b>?</b> holes. The database reads it and fixes its shape.',`<svg viewBox="0 0 420 200" role="img" aria-label="SQL with placeholders sent first">
<text class="t-s" x="8" y="16">1. The SQL, with ? placeholders</text>
<rect class="bx-dark" x="6" y="24" width="408" height="86" rx="8"/>
<text class="t-term" x="18" y="50" style="font-size:14px">SELECT id, email, role FROM users</text>
<text class="t-term" x="18" y="74" style="font-size:14px">WHERE email = <tspan class="t-ok" style="font-weight:700">?</tspan></text>
<text class="t-term" x="18" y="98" style="font-size:14px">AND password_hash = <tspan class="t-ok" style="font-weight:700">?</tspan></text>
<text class="t-s" x="8" y="130">2. The values, sent separately</text>
<rect class="bx" x="6" y="138" width="408" height="36" rx="6"/><text class="t-s t-dim" x="18" y="161">waiting…</text>
<text class="t-s" x="8" y="194">Shape fixed: one email check, one password check.</text>
</svg>`],
 ['Step 2: the attack text arrives on the other track, as one plain value.',`<svg viewBox="0 0 420 200" role="img" aria-label="Attack text arrives as a value">
<text class="t-s" x="8" y="16">1. The SQL, with ? placeholders</text>
<rect class="bx-dark" x="6" y="24" width="408" height="86" rx="8"/>
<text class="t-term" x="18" y="50" style="font-size:14px">SELECT id, email, role FROM users</text>
<text class="t-term" x="18" y="74" style="font-size:14px">WHERE email = <tspan class="t-ok" style="font-weight:700">?</tspan></text>
<text class="t-term" x="18" y="98" style="font-size:14px">AND password_hash = <tspan class="t-ok" style="font-weight:700">?</tspan></text>
<text class="t-s" x="8" y="130">2. The values, sent separately</text>
<rect class="bx-info" x="6" y="138" width="408" height="36" rx="6"/><text class="t-m" x="18" y="162">["' OR '1'='1' --", "h$…"]</text>
<text class="t-s" x="8" y="194">Data only. It cannot change the shape.</text>
</svg>`],
 ['Step 3: the database asks one honest question: "Is there a user whose email is literally <b>\' OR \'1\'=\'1\' --</b>?" There is not.',`<svg viewBox="0 0 420 200" role="img" aria-label="Database looks for that literal email">
<text class="t-s" x="8" y="16">1. The SQL, with ? placeholders</text>
<rect class="bx-dark" x="6" y="24" width="408" height="86" rx="8"/>
<text class="t-term" x="18" y="50" style="font-size:14px">SELECT id, email, role FROM users</text>
<text class="t-term" x="18" y="74" style="font-size:14px">WHERE email = <tspan class="t-warn">"' OR '1'='1' --"</tspan></text>
<text class="t-term" x="18" y="98" style="font-size:14px">AND password_hash = <tspan class="t-warn">"h$…"</tspan></text>
<text class="t-s" x="8" y="130">2. The values, sent separately</text>
<rect class="bx-info" x="6" y="138" width="408" height="36" rx="6"/><text class="t-m" x="18" y="162">["' OR '1'='1' --", "h$…"]</text>
<text class="t-s" x="8" y="194">Compared as text. No user has that email.</text>
</svg>`],
 ['Step 4: no rows, so <b>login()</b> returns <b>null</b>. The attack fails, and Ada with her real password still gets in.',`<svg viewBox="0 0 420 200" role="img" aria-label="Result null, attack fails">
<text class="t-s" x="8" y="16">1. The SQL, with ? placeholders</text>
<rect class="bx-dark" x="6" y="24" width="408" height="86" rx="8"/>
<text class="t-term" x="18" y="50" style="font-size:14px">SELECT id, email, role FROM users</text>
<text class="t-term" x="18" y="74" style="font-size:14px">WHERE email = <tspan class="t-ok" style="font-weight:700">?</tspan></text>
<text class="t-term" x="18" y="98" style="font-size:14px">AND password_hash = <tspan class="t-ok" style="font-weight:700">?</tspan></text>
<rect class="bx-ok" x="6" y="128" width="408" height="58" rx="8"/>${V.ic('shield',16,136,40,'ic-ok')}
<text class="t-m" x="66" y="154" style="font-size:17px">result: null</text><text class="t-s" x="66" y="176">attack blocked, real logins still work</text>
</svg>`]])}
${V.rules(V.rh('Rules: break one and the hole is back'),
 V.ok("email = ?","Placeholder, no quotes around it"),V.no("email = '?'","Quoted ? is just the text \"?\""),
 V.ok("LIKE ?  with  ['%' + term + '%']","The % signs go in the value, not the SQL"),V.no("LIKE '%\" + term + \"%'","Still gluing user text into SQL"),
 V.rh('Conventions'),
 V.ok('every query, every time','Even "trusted" values: habits beat guesses'),V.ok('allowlist column names','A ? cannot stand in for a table or column name, so pick from a fixed list'))}
${V.build(`<ol><li>Find each <code>+</code> that glues input into SQL.</li><li>Replace each value with <code>?</code>.</li><li>Move the values into an array, in order.</li><li>For search, put <code>'%' + term + '%'</code> in the array, not the SQL.</li><li>Run the attack again: it should return <code>null</code> or an empty list.</li><li>Check a real login still works.</li></ol>`)}
${V.hook(`Code goes in the string, data goes in the array. Never the twain shall meet.`)}
`)}

${V.card(3,'Least privilege','give the app only the keys it needs',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="The app's key ring holds SELECT, INSERT and UPDATE keys. DROP and GRANT keys are removed">
${V.ic('robot',14,40,70,'ic-a')}<text class="t-s" x="49" y="134" text-anchor="middle">app_user</text>
<path class="ln" d="M90 76H120"/>
<rect class="bx-ok" x="124" y="22" width="134" height="32" rx="6"/>${V.ic('key',130,25,26,'ic-ok')}<text class="t-m" x="162" y="44">SELECT</text>
<rect class="bx-ok" x="124" y="62" width="134" height="32" rx="6"/>${V.ic('key',130,65,26,'ic-ok')}<text class="t-m" x="162" y="84">INSERT</text>
<rect class="bx-ok" x="124" y="102" width="134" height="32" rx="6"/>${V.ic('key',130,105,26,'ic-ok')}<text class="t-m" x="162" y="124">UPDATE</text>
<rect class="bx-bad" x="276" y="40" width="134" height="32" rx="6"/>${V.ic('cross',282,43,26,'ic-bad')}<text class="t-m" x="314" y="62">DROP</text>
<rect class="bx-bad" x="276" y="84" width="134" height="32" rx="6"/>${V.ic('cross',282,87,26,'ic-bad')}<text class="t-m" x="314" y="106">GRANT</text>
</svg><figcaption>If an injection ever slips through, it can only do what the app's database user is allowed to do.</figcaption></figure>
${V.like(`<p>A cleaner gets a key to the offices, not to the safe. If someone steals the cleaner's key, the safe is still shut.</p>`)}
${V.anat([[1,'GRANT'],' ',[2,'SELECT, INSERT, UPDATE'],' ',[3,'ON users'],' ',[4,'TO app_user'],';'],[
 '<b>GRANT</b> hands out permissions.','<b>Only what the app does.</b> No <code>DROP</code>, no <code>DELETE</code> unless it really deletes.','<b>Which table.</b>','<b>Which database user.</b> A separate login just for the app, never the admin.'])}
${V.hook(`Parameters close the door. Least privilege shrinks the room behind it.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What does <code>--</code> do in SQL? <i>Starts a comment, so the rest of the line is ignored.</i> 2. With <code>email = ?</code>, what happens to a quote typed by the user? <i>It is just a character in the value; it cannot end anything.</i> 3. Why not just escape quotes yourself? <i>It is easy to miss a case; parameters remove the problem completely.</i></div>
`);

explain('x3',`
<p>Every comment box, profile name and chat message on the web is text from a stranger that other people's browsers will display. Show it the wrong way and that text can run as a program inside every visitor's browser.</p>

${V.card(1,'What XSS is','someone else\'s script in your page',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A noticeboard note says: whoever reads this, hand over your wallet. A reader obeys.">
<rect class="bx-warn" x="10" y="10" width="250" height="150" rx="10"/>
<rect class="bx" x="30" y="30" width="96" height="56" rx="4"/><text class="t-s" x="78" y="62" text-anchor="middle">Lost cat</text>
<rect class="bx" x="140" y="30" width="104" height="56" rx="4"/><text class="t-s" x="192" y="62" text-anchor="middle">Bake sale</text>
<rect class="bx-bad" x="30" y="98" width="214" height="50" rx="4"/><text class="t-b t-bad" x="137" y="120" text-anchor="middle">Reader: hand over</text><text class="t-b t-bad" x="137" y="140" text-anchor="middle">your wallet!</text>
${V.ic('person',300,40,70,'ic-info')}<path class="ln-d" d="M296 110 252 124"/>
<text class="t-s" x="336" y="138" text-anchor="middle">the browser</text><text class="t-s" x="336" y="156" text-anchor="middle">obeys it</text>
</svg><figcaption>Cross-site scripting: an attacker's note is pinned to your page, and the browser follows it as instructions.</figcaption></figure>
${V.like(`<p>A school noticeboard where anyone can pin a note. Most notes are harmless. But imagine readers who obey every note: "Reader, hand your wallet to the person by the door." The browser is that reader. It runs any script that ends up in the page.</p>`)}
${V.why(`<p>A page's HTML can contain JavaScript. If your code puts a user's text into the page <b>as HTML</b>, the user can write HTML that runs code. It is called <b>cross-site scripting</b> (XSS) because a script from someone else runs on your site, with your visitors' logins. Real attacks steal session tokens or post as the victim.</p>`)}
${V.anat([[1,'li'],'.',[2,'innerHTML'],' ',[3,'='],' ',[4,'text'],';'],[
 '<b>The element</b> you are filling.','<b>innerHTML.</b> "Read this as HTML and build whatever it describes." That includes images with code attached.','<b>Assignment.</b>','<b>The user\'s text.</b> Untrusted. Here, the danger.'])}
${V.steps([
 ['Someone posts a "comment" that is really HTML: an image tag with an <b>onerror</b> handler, which is code that runs if the image fails.',`<svg viewBox="0 0 420 190" role="img" aria-label="Payload typed in the comment box">
<rect class="bx-warn" x="6" y="8" width="408" height="40" rx="6"/><text class="t-m" x="14" y="33" style="font-size:14px">&lt;img src=x onerror="document.title='hacked'"&gt;</text>
<text class="t-m t-dim" x="14" y="78">li.innerHTML = text;</text>
<rect class="bx-info" x="6" y="92" width="408" height="30" rx="6"/><text class="t" x="18" y="113">tab: Guestbook</text>
<rect class="bx" x="6" y="122" width="408" height="62" rx="6"/><text class="t" x="18" y="150">• Hi! Lovely site.</text>
</svg>`],
 ['<b>innerHTML</b> reads the text as HTML, so the browser builds a real <b>&lt;img&gt;</b> element in the list.',`<svg viewBox="0 0 420 190" role="img" aria-label="innerHTML creates a real img element">
<rect class="bx-warn" x="6" y="8" width="408" height="40" rx="6"/><text class="t-m" x="14" y="33" style="font-size:14px">&lt;img src=x onerror="document.title='hacked'"&gt;</text>
<text class="t-m t-a" x="14" y="78" style="font-weight:700">li.innerHTML = text;</text>
<rect class="bx-info" x="6" y="92" width="408" height="30" rx="6"/><text class="t" x="18" y="113">tab: Guestbook</text>
<rect class="bx" x="6" y="122" width="408" height="62" rx="6"/><text class="t" x="18" y="150">• Hi! Lovely site.</text>
<text class="t" x="18" y="174">•</text>${V.ic('file',32,156,24,'ic-warn')}<text class="t-s" x="64" y="174">a real image element</text>
</svg>`],
 ['The address <b>x</b> is not a real image, so loading fails and <b>onerror</b> fires. The browser runs the attacker\'s JavaScript.',`<svg viewBox="0 0 420 190" role="img" aria-label="Image fails to load, onerror runs">
<rect class="bx-warn" x="6" y="8" width="408" height="40" rx="6"/><text class="t-m" x="14" y="33" style="font-size:14px">&lt;img src=x onerror="document.title='hacked'"&gt;</text>
<text class="t-m t-dim" x="14" y="78">li.innerHTML = text;</text>
<rect class="bx-info" x="6" y="92" width="408" height="30" rx="6"/><text class="t" x="18" y="113">tab: Guestbook</text>
<rect class="bx" x="6" y="122" width="408" height="62" rx="6"/><text class="t" x="18" y="150">• Hi! Lovely site.</text>
<text class="t" x="18" y="174">•</text>${V.ic('cross',32,156,24,'ic-bad')}<text class="t-bad" x="64" y="174" style="font-size:14px">load failed, so onerror runs</text>
</svg>`],
 ['The script changes the tab title to <b>hacked</b>. Harmless here, but a real attacker\'s script runs for <b>every</b> visitor who opens the page.',`<svg viewBox="0 0 420 190" role="img" aria-label="Tab title now says hacked">
<rect class="bx-warn" x="6" y="8" width="408" height="40" rx="6"/><text class="t-m" x="14" y="33" style="font-size:14px">&lt;img src=x onerror="document.title='hacked'"&gt;</text>
<text class="t-m t-dim" x="14" y="78">li.innerHTML = text;</text>
<rect class="bx-bad" x="6" y="92" width="408" height="30" rx="6"/><text class="t-b t-bad" x="18" y="113">tab: hacked</text>
<rect class="bx" x="6" y="122" width="408" height="62" rx="6"/><text class="t" x="18" y="150">• Hi! Lovely site.</text>
${V.ic('warn',18,154,26,'ic-bad')}<text class="t-bad" x="52" y="174" style="font-size:14px">script ran in the visitor's browser</text>
</svg>`]])}
${V.hook(`innerHTML builds whatever the text describes. Untrusted text must never be a builder's plan.`)}
`)}

${V.card(2,'Escape it','show text as text',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Escaping: less-than becomes ampersand lt, greater-than becomes ampersand gt, and so on">
<g text-anchor="middle">
<rect class="bx-warn" x="10" y="12" width="70" height="48" rx="6"/><text class="t-m" x="45" y="44" style="font-size:22px">&lt;</text>
<rect class="bx-warn" x="92" y="12" width="70" height="48" rx="6"/><text class="t-m" x="127" y="44" style="font-size:22px">&gt;</text>
<rect class="bx-warn" x="174" y="12" width="70" height="48" rx="6"/><text class="t-m" x="209" y="44" style="font-size:22px">&amp;</text>
<rect class="bx-warn" x="256" y="12" width="70" height="48" rx="6"/><text class="t-m" x="291" y="44" style="font-size:22px">"</text>
<rect class="bx-warn" x="338" y="12" width="70" height="48" rx="6"/><text class="t-m" x="373" y="44" style="font-size:22px">'</text>
<path class="ln-a" d="M45 64V82M127 64V82M209 64V82M291 64V82M373 64V82"/>
<rect class="bx-ok" x="10" y="88" width="70" height="40" rx="6"/><text class="t-m" x="45" y="114">&amp;lt;</text>
<rect class="bx-ok" x="92" y="88" width="70" height="40" rx="6"/><text class="t-m" x="127" y="114">&amp;gt;</text>
<rect class="bx-ok" x="174" y="88" width="70" height="40" rx="6"/><text class="t-m" x="209" y="114">&amp;amp;</text>
<rect class="bx-ok" x="256" y="88" width="70" height="40" rx="6"/><text class="t-m" x="291" y="114" style="font-size:14px">&amp;quot;</text>
<rect class="bx-ok" x="338" y="88" width="70" height="40" rx="6"/><text class="t-m" x="373" y="114">&amp;#39;</text>
</g></svg><figcaption>Escaping swaps the five characters that have meaning in HTML for codes that just display the character.</figcaption></figure>
${V.like(`<p>Putting a note in a clear plastic sleeve before pinning it up. People can read every word, but nobody can mistake it for an official instruction from the school.</p>`)}
${V.why(`<p>Browsers need a way to show a real <code>&lt;</code> on screen without starting a tag. HTML <b>entities</b> such as <code>&amp;lt;</code> do that. Escaping user text turns every risky character into its entity, so the text is displayed, never built.</p>`)}
${V.anat([[1,'li'],'.',[2,'textContent'],' = ',[3,'text'],';'],[
 '<b>The element.</b>','<b>textContent.</b> "This is plain text. Do not read it as HTML." The browser handles the escaping for you.','<b>The user\'s text.</b> Shown exactly as typed, tags and all.'])}
${V.steps([
 ['The same attack text arrives. This time the code uses <b>textContent</b>.',`<svg viewBox="0 0 420 190" role="img" aria-label="Same payload, textContent used">
<rect class="bx-warn" x="6" y="8" width="408" height="40" rx="6"/><text class="t-m" x="14" y="33" style="font-size:14px">&lt;img src=x onerror="document.title='hacked'"&gt;</text>
<text class="t-m t-a" x="14" y="78" style="font-weight:700">li.textContent = text;</text>
<rect class="bx-info" x="6" y="92" width="408" height="30" rx="6"/><text class="t" x="18" y="113">tab: Guestbook</text>
<rect class="bx" x="6" y="122" width="408" height="62" rx="6"/><text class="t" x="18" y="150">• Hi! Lovely site.</text>
</svg>`],
 ['Behind the scenes, every <b>&lt;</b> and <b>&gt;</b> becomes <b>&amp;lt;</b> and <b>&amp;gt;</b>, and the quotes are made harmless. No tag can start.',`<svg viewBox="0 0 420 190" role="img" aria-label="Characters turned into entities">
<rect class="bx-ok" x="6" y="8" width="408" height="40" rx="6"/><text class="t-m" x="14" y="33" style="font-size:14px"><tspan class="t-ok" style="font-weight:700">&amp;lt;</tspan>img src=x onerror=... <tspan class="t-ok" style="font-weight:700">&amp;gt;</tspan></text>
<text class="t-m t-dim" x="14" y="78">li.textContent = text;</text>
<rect class="bx-info" x="6" y="92" width="408" height="30" rx="6"/><text class="t" x="18" y="113">tab: Guestbook</text>
<rect class="bx" x="6" y="122" width="408" height="62" rx="6"/><text class="t" x="18" y="150">• Hi! Lovely site.</text>
</svg>`],
 ['The page shows the comment as plain characters. No image, no onerror, no script. The tab still says <b>Guestbook</b>.',`<svg viewBox="0 0 420 190" role="img" aria-label="Comment shown as text, tab unchanged">
<rect class="bx-ok" x="6" y="8" width="408" height="40" rx="6"/><text class="t-m" x="14" y="33" style="font-size:14px"><tspan class="t-ok" style="font-weight:700">&amp;lt;</tspan>img src=x onerror=... <tspan class="t-ok" style="font-weight:700">&amp;gt;</tspan></text>
<text class="t-m t-dim" x="14" y="78">li.textContent = text;</text>
<rect class="bx-ok" x="6" y="92" width="408" height="30" rx="6"/><text class="t-b t-ok" x="18" y="113">tab: Guestbook</text>
<rect class="bx" x="6" y="122" width="408" height="62" rx="6"/><text class="t" x="18" y="150">• Hi! Lovely site.</text>
<text class="t-m" x="18" y="174" style="font-size:14px">• &lt;img src=x onerror="document.t…</text>
</svg>`]])}
${V.rules(V.rh('Rules: break one and XSS is back'),
 V.ok('el.textContent = text','Always text, never HTML'),V.no('el.innerHTML = text','Builds whatever the text describes'),
 V.ok('&lt;p&gt;{comment}&lt;/p&gt;','React and Vue escape {} output for you'),V.no('dangerouslySetInnerHTML','The name is the warning: it turns escaping off'),
 V.ok(".replace(/&amp;/g, '&amp;amp;') first","Escape &amp; before the others, or you double-escape"),V.ok('DOMPurify.sanitize(html)','If you truly must allow some HTML, clean it with a sanitiser'),
 V.no('document.write(text)','Same danger as innerHTML'))}
${V.build(`<ol><li>Find every <code>innerHTML</code> that receives user text.</li><li>Swap it for <code>textContent</code>.</li><li>Where you must build an HTML string, write <code>escapeHtml(s)</code> that replaces <code>&amp;</code> first, then <code>&lt; &gt; " '</code>.</li><li>Post the attack text again: it should appear as plain characters.</li></ol>`)}
${V.hook(`Text in, text out. Let the browser build only what you wrote.`)}
`)}

${V.card(3,'A second layer','CSP and httpOnly cookies',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A browser with a shield: scripts from your own site pass, an inline script and a script from another site are blocked">
<rect class="bx" x="150" y="10" width="260" height="140" rx="10"/>${V.ic('shield',160,54,56,'ic-a')}<text class="t-s" x="188" y="136" text-anchor="middle">CSP</text>
<text class="t-b" x="230" y="34">Your browser</text>
<rect class="bx-ok" x="10" y="16" width="130" height="34" rx="6"/><text class="t-m" x="20" y="39" style="font-size:14px">/app.js</text>
<rect class="bx-bad" x="10" y="62" width="130" height="34" rx="6"/><text class="t-m" x="20" y="85" style="font-size:14px">inline onerror</text>
<rect class="bx-bad" x="10" y="108" width="130" height="34" rx="6"/><text class="t-m" x="20" y="131" style="font-size:14px">evil.example</text>
<path class="ln-ok" d="M144 33H300"/><polygon class="ah-ok" points="298,26 298,40 310,33"/>${V.ic('check',318,18,30,'ic-ok')}
${V.ic('cross',226,64,30,'ic-bad')}${V.ic('cross',226,110,30,'ic-bad')}
</svg><figcaption>A Content Security Policy tells the browser which scripts are allowed. Anything else is refused, even if an injection slips in.</figcaption></figure>
${V.like(`<p>A guest list at the door. Even if someone sneaks a stranger into the queue, the bouncer only lets in names on the list.</p>`)}
${V.anat([[1,'Content-Security-Policy'],': ',[2,'script-src'],' ',[3,"'self'"]],[
 '<b>The header</b> your server sends with each page.','<b>Which kind of resource</b> the rule is about: scripts.','<b>Who is allowed.</b> <code>\'self\'</code> means your own site only. Inline scripts and <code>onerror=</code> attributes are blocked.'])}
${V.rules(V.ok('escape first, CSP second','CSP is a backup, not a replacement'),V.ok('HttpOnly session cookie','JavaScript cannot read it, so a script cannot steal it'))}
${V.hook(`Escape so it never runs. CSP so it still cannot run.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which is safe for a user comment: <code>innerHTML</code> or <code>textContent</code>? <i>textContent.</i> 2. In React, is <code>&lt;p&gt;{comment}&lt;/p&gt;</code> safe? <i>Yes, React escapes it.</i> 3. Why escape <code>&amp;</code> before <code>&lt;</code>? <i>Otherwise the &amp; inside &amp;lt; gets escaped again.</i></div>
`);

explain('x4',`
<p>Logging in happens once, but the website has to remember you on every click after that. How it remembers you, and how it stores your password, decides whether a small leak becomes a disaster.</p>

${V.card(1,'Sessions','a wristband after the ticket check',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="At a festival gate, a ticket is checked once and a wristband is given. The wristband gets you into each area">
${V.ic('person',10,30,70,'ic-info')}<text class="t-s" x="45" y="126" text-anchor="middle">you</text>
<rect class="bx-a" x="104" y="34" width="120" height="62" rx="8"/>${V.ic('card',112,42,44,'ic-a')}<text class="t-b" x="160" y="58">Ticket</text><text class="t-s" x="160" y="82">checked</text>
<path class="ln-a" d="M228 65H262"/><polygon class="ah-a" points="260,58 260,72 272,65"/>
<rect class="bx-ok" x="276" y="34" width="134" height="62" rx="31"/><text class="t-m" x="343" y="71" text-anchor="middle" style="font-size:17px">sid=7f3a</text>
<text class="t-s" x="210" y="130" text-anchor="middle">Password checked once. The wristband does the rest.</text>
</svg><figcaption>A session: you prove who you are once, then a random ID in a cookie identifies you on each request.</figcaption></figure>
${V.like(`<p>At a festival, staff check your ticket once at the gate and put a wristband on you. After that, every stage just looks at the wristband. The session ID cookie is that wristband.</p>`)}
${V.why(`<p>The web's protocol, HTTP, forgets everything between requests. Without a way to remember you, you would type your password on every page. Cookies were invented in 1994 so a site could hand the browser a small note to send back each time.</p>`)}
${V.anat([[1,'Set-Cookie:'],' ',[2,'sid=7f3a9c'],'; ',[3,'HttpOnly'],'; ',[4,'Secure'],'; ',[5,'SameSite=Lax']],[
 '<b>The header</b> the server sends to store a cookie.','<b>Name and value.</b> A long random session ID, not the user\'s details.','<b>HttpOnly.</b> Page JavaScript cannot read it, so an XSS script cannot steal it.','<b>Secure.</b> Only sent over HTTPS.','<b>SameSite.</b> Not sent on most requests started by other sites, which blocks many forged requests.'])}
${V.steps([
 ['You send your email and password once, over HTTPS.',`<svg viewBox="0 0 420 190" role="img" aria-label="Browser sends POST /login">
${V.ic('laptop',12,14,56,'ic-info')}<text class="t-s" x="40" y="88" text-anchor="middle">Browser</text>
${V.ic('server',352,14,56,'ic-info')}<text class="t-s" x="380" y="88" text-anchor="middle">Server</text>
<rect class="bx-a" x="84" y="14" width="252" height="52" rx="6"/><text class="t-m" x="96" y="36" style="font-size:14px">POST /login</text><text class="t-m" x="96" y="57" style="font-size:14px">email + password</text>
<path class="ln-a" d="M84 78H330"/><polygon class="ah-a" points="328,71 328,85 340,78"/>
<rect class="bx" x="6" y="104" width="196" height="80" rx="6"/><text class="t-s" x="16" y="124">cookie jar</text>
<rect class="bx" x="214" y="104" width="200" height="80" rx="6"/><text class="t-s" x="224" y="124">sessions table</text>
</svg>`],
 ['The server checks the password against its stored <b>hash</b>. It matches, so the server makes a new random session ID and remembers who it belongs to.',`<svg viewBox="0 0 420 190" role="img" aria-label="Server checks hash and stores session">
${V.ic('laptop',12,14,56,'ic-info')}<text class="t-s" x="40" y="88" text-anchor="middle">Browser</text>
${V.ic('server',352,14,56,'ic-ok')}<text class="t-s" x="380" y="88" text-anchor="middle">Server</text>
<rect class="bx-ok" x="84" y="14" width="252" height="52" rx="6"/><text class="t-m" x="96" y="36" style="font-size:14px">hash matches ✓</text><text class="t-m" x="96" y="57" style="font-size:14px">new session id</text>
<rect class="bx" x="6" y="104" width="196" height="80" rx="6"/><text class="t-s" x="16" y="124">cookie jar</text>
<rect class="bx" x="214" y="104" width="200" height="80" rx="6"/><text class="t-s" x="224" y="124">sessions table</text>
<rect class="bx-hl" x="224" y="134" width="180" height="36" rx="5"/><text class="t-m" x="234" y="158" style="font-size:14px">7f3a9c → user 42</text>
</svg>`],
 ['The reply carries <b>Set-Cookie</b>. Your browser stores the ID in its cookie jar.',`<svg viewBox="0 0 420 190" role="img" aria-label="Server replies with Set-Cookie">
${V.ic('laptop',12,14,56,'ic-ok')}<text class="t-s" x="40" y="88" text-anchor="middle">Browser</text>
${V.ic('server',352,14,56,'ic-info')}<text class="t-s" x="380" y="88" text-anchor="middle">Server</text>
<rect class="bx-a" x="84" y="14" width="252" height="52" rx="6"/><text class="t-m" x="96" y="36" style="font-size:14px">200 OK</text><text class="t-m" x="96" y="57" style="font-size:14px">Set-Cookie: sid=7f3a9c</text>
<path class="ln-a" d="M336 78H90"/><polygon class="ah-a" points="92,71 92,85 80,78"/>
<rect class="bx" x="6" y="104" width="196" height="80" rx="6"/><text class="t-s" x="16" y="124">cookie jar</text>
<rect class="bx-hl" x="16" y="134" width="176" height="36" rx="5"/><text class="t-m" x="26" y="158" style="font-size:14px">sid=7f3a9c</text>
<rect class="bx" x="214" y="104" width="200" height="80" rx="6"/><text class="t-s" x="224" y="124">sessions table</text>
<rect class="bx" x="224" y="134" width="180" height="36" rx="5"/><text class="t-m" x="234" y="158" style="font-size:14px">7f3a9c → user 42</text>
</svg>`],
 ['On every later request the browser sends the cookie automatically. The server looks up <b>7f3a9c</b> and knows it is user 42. No password needed.',`<svg viewBox="0 0 420 190" role="img" aria-label="Next request sends cookie, server looks it up">
${V.ic('laptop',12,14,56,'ic-info')}<text class="t-s" x="40" y="88" text-anchor="middle">Browser</text>
${V.ic('server',352,14,56,'ic-info')}<text class="t-s" x="380" y="88" text-anchor="middle">Server</text>
<rect class="bx-a" x="84" y="14" width="252" height="52" rx="6"/><text class="t-m" x="96" y="36" style="font-size:14px">GET /orders</text><text class="t-m" x="96" y="57" style="font-size:14px">Cookie: sid=7f3a9c</text>
<path class="ln-a" d="M84 78H330"/><polygon class="ah-a" points="328,71 328,85 340,78"/>
<rect class="bx" x="6" y="104" width="196" height="80" rx="6"/><text class="t-s" x="16" y="124">cookie jar</text>
<rect class="bx" x="16" y="134" width="176" height="36" rx="5"/><text class="t-m" x="26" y="158" style="font-size:14px">sid=7f3a9c</text>
<rect class="bx" x="214" y="104" width="200" height="80" rx="6"/><text class="t-s" x="224" y="124">sessions table</text>
<rect class="bx-hl" x="224" y="134" width="180" height="36" rx="5"/><text class="t-m" x="234" y="158" style="font-size:14px">7f3a9c → user 42</text>
</svg>`],
 ['Logging out deletes the row. The old cookie now points at nothing, so it is useless even if someone copied it.',`<svg viewBox="0 0 420 190" role="img" aria-label="Logout deletes the session">
${V.ic('laptop',12,14,56,'ic-info')}<text class="t-s" x="40" y="88" text-anchor="middle">Browser</text>
${V.ic('server',352,14,56,'ic-info')}<text class="t-s" x="380" y="88" text-anchor="middle">Server</text>
<rect class="bx-a" x="84" y="14" width="252" height="52" rx="6"/><text class="t-m" x="96" y="36" style="font-size:14px">POST /logout</text><text class="t-m" x="96" y="57" style="font-size:14px">delete session</text>
<path class="ln-a" d="M84 78H330"/><polygon class="ah-a" points="328,71 328,85 340,78"/>
<rect class="bx" x="6" y="104" width="196" height="80" rx="6"/><text class="t-s" x="16" y="124">cookie jar</text>
<rect class="bx" x="214" y="104" width="200" height="80" rx="6"/><text class="t-s" x="224" y="124">sessions table</text>
<rect class="bx-bad" x="224" y="134" width="180" height="36" rx="5"/><text class="t-m t-dim" x="234" y="158" style="font-size:14px">7f3a9c → user 42</text><path class="ln-x" d="M230 152H398"/>
</svg>`]])}
${V.hook(`Check the ticket once, wear the wristband after. HttpOnly, Secure, SameSite.`)}
`)}

${V.card(2,'JWTs','a readable note with a tamper seal',`
<figure class="fig"><svg viewBox="0 0 420 130" role="img" aria-label="A JWT has three parts separated by dots: header, payload and signature">
<rect class="bx-info" x="6" y="14" width="118" height="44" rx="6"/><text class="t-m" x="65" y="42" text-anchor="middle">eyJhbG…</text>
<text class="t-b" x="129" y="46" style="font-size:22px">.</text>
<rect class="bx-a" x="140" y="14" width="140" height="44" rx="6"/><text class="t-m" x="210" y="42" text-anchor="middle">eyJzdW…</text>
<text class="t-b" x="285" y="46" style="font-size:22px">.</text>
<rect class="bx-ok" x="296" y="14" width="118" height="44" rx="6"/><text class="t-m" x="355" y="42" text-anchor="middle">3f9Kx…</text>
<text class="t-s" x="65" y="82" text-anchor="middle">header</text><text class="t-s" x="210" y="82" text-anchor="middle">payload</text><text class="t-s" x="355" y="82" text-anchor="middle">signature</text>
<text class="t-s" x="65" y="102" text-anchor="middle">which algorithm</text><text class="t-s" x="210" y="102" text-anchor="middle">who and until when</text><text class="t-s" x="355" y="102" text-anchor="middle">the seal</text>
</svg><figcaption>A JSON Web Token: three base64url parts joined by dots.</figcaption></figure>
${V.like(`<p>A postcard with a hologram sticker over the writing. Anyone who picks it up can read it. But change one word and the hologram is visibly broken. A JWT is <b>signed</b>, not <b>hidden</b>.</p>`)}
${V.why(`<p>With sessions, the server must look up every ID in its table. A JWT carries the facts inside itself, plus a signature only the server can make. Any server holding the secret can check it without a lookup. The catch: you cannot easily cancel one before it expires.</p>`)}
${V.anat([[1,'header'],'.',[2,'payload'],'.',[3,'signature']],[
 '<b>Header.</b> JSON saying how it was signed, e.g. <code>{"alg":"HS256"}</code>, in base64url.',
 '<b>Payload.</b> The claims: <code>sub</code> (user id), <code>role</code>, <code>exp</code> (expiry time in seconds). Base64url is an <i>encoding</i>, so anyone can decode it.',
 '<b>Signature.</b> HMAC-SHA256 of <code>header.payload</code> using the server\'s secret key. Without the key nobody can make a matching one.'])}
${V.steps([
 ['The server receives a token and splits it at the two dots.',`<svg viewBox="0 0 420 200" role="img" aria-label="Token split into three parts">
<rect class="bx-info" x="6" y="10" width="118" height="40" rx="6"/><text class="t-m" x="65" y="36" text-anchor="middle">header</text>
<rect class="bx-a" x="140" y="10" width="140" height="40" rx="6"/><text class="t-m" x="210" y="36" text-anchor="middle">payload</text>
<rect class="bx-ok" x="296" y="10" width="118" height="40" rx="6"/><text class="t-m" x="355" y="36" text-anchor="middle">3f9Kx…</text>
<rect class="bx" x="6" y="64" width="408" height="62" rx="6"/><text class="t-s t-dim" x="18" y="100">decoded payload appears here</text>
<rect class="bx" x="6" y="138" width="408" height="54" rx="6"/><text class="t-s t-dim" x="18" y="170">verdict</text>
</svg>`],
 ['It decodes the middle part. Anyone could do this, which is why you <b>never</b> put passwords or card numbers in a payload.',`<svg viewBox="0 0 420 200" role="img" aria-label="Payload decoded and readable">
<rect class="bx-info" x="6" y="10" width="118" height="40" rx="6"/><text class="t-m" x="65" y="36" text-anchor="middle">header</text>
<rect class="bx-hl" x="140" y="10" width="140" height="40" rx="6"/><text class="t-m" x="210" y="36" text-anchor="middle">payload</text>
<rect class="bx-ok" x="296" y="10" width="118" height="40" rx="6"/><text class="t-m" x="355" y="36" text-anchor="middle">3f9Kx…</text>
<rect class="bx" x="6" y="64" width="408" height="62" rx="6"/><text class="t-m" x="18" y="88" style="font-size:14px">{"sub":"42","role":"user",</text><text class="t-m" x="18" y="112" style="font-size:14px"> "exp":1791603600}</text>
<rect class="bx" x="6" y="138" width="408" height="54" rx="6"/><text class="t-s" x="18" y="170">Readable by anyone: base64url is not encryption.</text>
</svg>`],
 ['It recomputes <b>HMAC(header.payload, SECRET)</b> and compares it with the signature part. They match, and <b>exp</b> is in the future. Accepted.',`<svg viewBox="0 0 420 200" role="img" aria-label="Recomputed signature matches">
<rect class="bx-info" x="6" y="10" width="118" height="40" rx="6"/><text class="t-m" x="65" y="36" text-anchor="middle">header</text>
<rect class="bx-a" x="140" y="10" width="140" height="40" rx="6"/><text class="t-m" x="210" y="36" text-anchor="middle">payload</text>
<rect class="bx-hl" x="296" y="10" width="118" height="40" rx="6"/><text class="t-m" x="355" y="36" text-anchor="middle">3f9Kx…</text>
<rect class="bx" x="6" y="64" width="408" height="62" rx="6"/><text class="t-m" x="18" y="88" style="font-size:14px">{"sub":"42","role":"user",</text><text class="t-m" x="18" y="112" style="font-size:14px"> "exp":1791603600}</text>
<rect class="bx-ok" x="6" y="138" width="408" height="54" rx="6"/>${V.ic('check',14,146,36,'ic-ok')}<text class="t-m" x="58" y="171" style="font-size:14px">recomputed 3f9Kx… = 3f9Kx…  valid</text>
</svg>`],
 ['Someone edits the payload to say <b>"role":"admin"</b>. The recomputed signature is now different. Rejected: <b>null</b>.',`<svg viewBox="0 0 420 200" role="img" aria-label="Tampered payload, signature mismatch">
<rect class="bx-info" x="6" y="10" width="118" height="40" rx="6"/><text class="t-m" x="65" y="36" text-anchor="middle">header</text>
<rect class="bx-bad" x="140" y="10" width="140" height="40" rx="6"/><text class="t-m" x="210" y="36" text-anchor="middle">edited</text>
<rect class="bx-ok" x="296" y="10" width="118" height="40" rx="6"/><text class="t-m" x="355" y="36" text-anchor="middle">3f9Kx…</text>
<rect class="bx" x="6" y="64" width="408" height="62" rx="6"/><text class="t-m" x="18" y="88" style="font-size:14px">{"sub":"42","role":<tspan class="t-bad" style="font-weight:700">"admin"</tspan>,</text><text class="t-m" x="18" y="112" style="font-size:14px"> "exp":1791603600}</text>
<rect class="bx-bad" x="6" y="138" width="408" height="54" rx="6"/>${V.ic('cross',14,146,36,'ic-bad')}<text class="t-m" x="58" y="171" style="font-size:14px">recomputed 9Qz1… ≠ 3f9Kx…  null</text>
</svg>`],
 ['A genuine but old token: the signature matches, but <b>exp</b> is not after now. Expired tokens are rejected too.',`<svg viewBox="0 0 420 200" role="img" aria-label="Expired token rejected">
<rect class="bx-info" x="6" y="10" width="118" height="40" rx="6"/><text class="t-m" x="65" y="36" text-anchor="middle">header</text>
<rect class="bx-a" x="140" y="10" width="140" height="40" rx="6"/><text class="t-m" x="210" y="36" text-anchor="middle">payload</text>
<rect class="bx-ok" x="296" y="10" width="118" height="40" rx="6"/><text class="t-m" x="355" y="36" text-anchor="middle">8Lw2…</text>
<rect class="bx" x="6" y="64" width="408" height="62" rx="6"/><text class="t-m" x="18" y="88" style="font-size:14px">{"sub":"42","role":"user",</text><text class="t-m" x="18" y="112" style="font-size:14px"> "exp":<tspan class="t-bad" style="font-weight:700">1791599940</tspan>}</text>
<rect class="bx-bad" x="6" y="138" width="408" height="54" rx="6"/>${V.ic('clock',14,146,36,'ic-bad')}<text class="t-m" x="58" y="171" style="font-size:14px">exp ≤ now (1791600000)  null</text>
</svg>`]])}
${V.rules(V.rh('Rules: break one and tokens can be forged or stolen'),
 V.ok('verify, then trust','Recompute the signature before reading any claim'),V.no('decode and trust','Decoding proves nothing; anyone can edit the payload'),
 V.ok('check exp','Old tokens must stop working'),V.no('password in payload','The payload is readable by anyone holding the token'),
 V.ok('HttpOnly cookie','Store tokens where page scripts cannot reach'),V.no('localStorage','Any XSS script can read it'))}
${V.hook(`Readable by all, forgeable by none. Verify the seal, then check the clock.`)}
`)}

${V.card(3,'Password hashing','store a fingerprint, not the password',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="A mincer: a steak goes in and mince comes out. You cannot turn mince back into steak">
<rect class="bx-warn" x="10" y="46" width="100" height="56" rx="20"/><text class="t-b" x="60" y="80" text-anchor="middle">enigma</text>
<path class="ln-a" d="M114 74H148"/><polygon class="ah-a" points="146,67 146,81 158,74"/>
<rect class="bx-a" x="162" y="24" width="100" height="100" rx="12"/>${V.ic('gear',182,34,60,'ic-a')}<text class="t-s" x="212" y="114" text-anchor="middle">bcrypt</text>
<path class="ln-a" d="M266 74H300"/><polygon class="ah-a" points="298,67 298,81 310,74"/>
<rect class="bx-ok" x="314" y="46" width="98" height="56" rx="6"/><text class="t-m" x="363" y="80" text-anchor="middle" style="font-size:14px">$2b$12$…</text>
<path class="ln-d" d="M363 108C363 140 60 140 60 108"/><text class="t-bad" x="212" y="146" text-anchor="middle" style="font-size:14px">no way back</text>
</svg><figcaption>A hash is one-way, like a mincer. Steak becomes mince, but mince never becomes steak again.</figcaption></figure>
${V.like(`<p>A mincer. You can turn steak into mince in a second, but you can never turn the mince back into the steak. To check a password, you mince the new attempt the same way and compare the mince.</p>`)}
${V.why(`<p>Databases leak. If passwords are stored as typed, one leak opens every account, and people reuse passwords on other sites. Early sites used fast hashes like MD5, but modern graphics cards try billions of MD5 guesses a second. Slow password hashes such as <b>bcrypt</b> (1999) and <b>argon2</b> (2015) were designed to make each guess expensive.</p>`)}
${V.anat([[1,'$2b$'],[2,'12$'],[3,'Xq3vR8sLp2Wn6yTb0cJe1u'],[4,'k9LmQ…']],[
 '<b>Algorithm.</b> <code>2b</code> means bcrypt.','<b>Cost.</b> 12 means 2<sup>12</sup> rounds of work. Raise it as computers get faster.','<b>Salt.</b> 22 random characters, different for every user, so two people with the same password get different hashes.','<b>The hash itself.</b> The "mince". 31 characters.'])}
${V.steps([
 ['Sign-up: the password <b>enigma</b> is joined with a fresh random <b>salt</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="Password plus random salt">
<rect class="bx-warn" x="6" y="20" width="120" height="44" rx="6"/><text class="t-m" x="66" y="48" text-anchor="middle">enigma</text>
<text class="t-b" x="140" y="48" style="font-size:20px">+</text>
<rect class="bx-info" x="160" y="20" width="120" height="44" rx="6"/><text class="t-m" x="220" y="48" text-anchor="middle">Xq3v…</text>
<text class="t-s" x="220" y="84" text-anchor="middle">random salt</text>
<rect class="bx" x="6" y="108" width="408" height="52" rx="6"/>${V.ic('db',14,114,40,'ic-info')}<text class="t-s t-dim" x="64" y="140">users table</text>
</svg>`],
 ['Both go through <b>bcrypt</b> with cost 12. It is slow on purpose: about a quarter of a second.',`<svg viewBox="0 0 420 170" role="img" aria-label="bcrypt produces a hash">
<rect class="bx-warn" x="6" y="20" width="120" height="44" rx="6"/><text class="t-m" x="66" y="48" text-anchor="middle">enigma</text>
<text class="t-b" x="140" y="48" style="font-size:20px">+</text>
<rect class="bx-info" x="160" y="20" width="120" height="44" rx="6"/><text class="t-m" x="220" y="48" text-anchor="middle">Xq3v…</text>
${V.ic('gear',300,16,52,'ic-a')}<text class="t-s" x="326" y="84" text-anchor="middle">slow hash</text>
<rect class="bx" x="6" y="108" width="408" height="52" rx="6"/>${V.ic('db',14,114,40,'ic-info')}<text class="t-s t-dim" x="64" y="140">users table</text>
</svg>`],
 ['Only the result is saved. The password itself is thrown away and never stored.',`<svg viewBox="0 0 420 170" role="img" aria-label="Only the hash is stored">
<rect class="bx-warn" x="6" y="20" width="120" height="44" rx="6"/><text class="t-m t-dim" x="66" y="48" text-anchor="middle">enigma</text><path class="ln-x" d="M14 50 118 34"/>
<text class="t-s" x="66" y="84" text-anchor="middle">never stored</text>
<rect class="bx-ok" x="6" y="108" width="408" height="52" rx="6"/>${V.ic('db',14,114,40,'ic-ok')}<text class="t-m" x="64" y="140" style="font-size:14px">alan | $2b$12$Xq3v…k9LmQ…</text>
</svg>`],
 ['Login: the typed password is hashed again, using the salt stored inside the hash. Same input, same result: <b>match</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="Login hash matches stored hash">
<rect class="bx-warn" x="6" y="20" width="120" height="44" rx="6"/><text class="t-m" x="66" y="48" text-anchor="middle">enigma</text>
<path class="ln-a" d="M130 42H164"/><polygon class="ah-a" points="162,35 162,49 174,42"/>
<rect class="bx-a" x="178" y="20" width="160" height="44" rx="6"/><text class="t-m" x="258" y="48" text-anchor="middle" style="font-size:14px">$2b$12$Xq3v…</text>
${V.ic('check',352,20,44,'ic-ok')}
<rect class="bx-ok" x="6" y="108" width="408" height="52" rx="6"/>${V.ic('db',14,114,40,'ic-ok')}<text class="t-m" x="64" y="140" style="font-size:14px">alan | $2b$12$Xq3v…k9LmQ…</text>
</svg>`],
 ['If the table leaks, an attacker must guess. MD5 allows many <b>billions</b> of guesses a second on one graphics card; bcrypt at cost 12 allows a few <b>thousand</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="Guess speed: MD5 billions per second, bcrypt thousands">
<text class="t-b" x="10" y="34">MD5</text><rect class="bx-bad" x="80" y="16" width="330" height="28" rx="4"/><text class="t-s" x="90" y="35">billions of guesses a second</text>
<text class="t-b" x="10" y="84">bcrypt</text><rect class="bx-ok" x="80" y="66" width="10" height="28" rx="3"/><text class="t-s" x="100" y="85">a few thousand a second</text>
<rect class="bx-ok" x="6" y="108" width="408" height="52" rx="6"/>${V.ic('db',14,114,40,'ic-ok')}<text class="t-m" x="64" y="140" style="font-size:14px">alan | $2b$12$Xq3v…k9LmQ…</text>
</svg>`]])}
${V.rules(V.rh('Rules: break one and a leak becomes a disaster'),
 V.ok('argon2id or bcrypt','Slow, salted, built for passwords'),V.no('MD5, SHA-1, SHA-256 alone','Fast hashes: built for speed, which helps attackers'),
 V.no('encrypting passwords','Encryption can be reversed with the key; hashing cannot'),V.no('your own hashing code','Use a well-known library, e.g. bcrypt or argon2 on npm'),
 V.ok('compare with the library','bcrypt.compare(attempt, storedHash)'))}
${V.hook(`Mince it slowly, salt it well, never keep the steak.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Can anyone read a JWT's payload? <i>Yes; it is only encoded. The signature just proves nobody changed it.</i> 2. Why does each user get a different salt? <i>So identical passwords give different hashes and cannot be cracked together.</i> 3. Which cookie flag stops page JavaScript reading the session ID? <i>HttpOnly.</i></div>
`);

explain('x5',`
<p>Logging in proves who you are. It says nothing about what you are allowed to see. Forget that difference and anyone can read anyone's data by changing one number in a web address.</p>

${V.card(1,'Who you are vs what you may do','the hotel key card',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Hotel: front desk checks your ID. Your key card opens room 12, not room 14">
<rect class="bx-info" x="10" y="20" width="140" height="120" rx="10"/>${V.ic('person',46,30,64,'ic-info')}<text class="t-b" x="80" y="114" text-anchor="middle">Front desk</text><text class="t-s" x="80" y="132" text-anchor="middle">"Who are you?"</text>
<path class="ln-a" d="M154 80H180"/><polygon class="ah-a" points="178,73 178,87 190,80"/>
${V.ic('card',192,56,48,'ic-a')}
<rect class="bx-ok" x="254" y="14" width="156" height="66" rx="8"/>${V.ic('door',262,20,52,'ic-ok')}<text class="t-b" x="324" y="44">Room 12</text><text class="t-s" x="324" y="66">yours: opens</text>
<rect class="bx-bad" x="254" y="90" width="156" height="66" rx="8"/>${V.ic('door',262,96,52,'ic-bad')}<text class="t-b" x="324" y="120">Room 14</text><text class="t-s" x="324" y="142">not yours</text>
</svg><figcaption>Authentication happens at the desk. Authorization happens at every door.</figcaption></figure>
${V.like(`<p>In a hotel, the front desk checks your passport once: that is <b>authentication</b>. Your key card then opens room 12 but not room 14: that is <b>authorization</b>. A hotel whose cards opened every door would be a disaster, even if the desk checked passports perfectly.</p>`)}
${V.why(`<p>Early web apps often checked "is someone logged in?" and stopped there. Broken access control is now number one on the OWASP Top 10, because that second question, "is this <b>theirs</b>?", is so easy to forget.</p>`)}
${V.rules(V.rh('Which answer to send'),
 V.ok('401 Unauthorized','Not logged in. (The name is old; it really means "unauthenticated".)'),V.ok('403 Forbidden','Logged in, but not allowed'),
 V.ok('404 Not Found','It does not exist, or you choose to hide that it exists'),V.no('200 for someone else\'s data','The IDOR bug'))}
${V.hook(`The desk asks "who are you?" Every door asks "is this yours?"`)}
`)}

${V.card(2,'IDOR','change the number, see someone else\'s data',`
<p><b>IDOR</b> stands for insecure direct object reference: the URL points straight at a record by its id, and the server never checks whose record it is.</p>
${V.anat([[1,'const isOwner'],' = ',[2,'invoice.ownerId'],' === ',[3,'req.user.id'],';'],[
 '<b>A clear name</b> for the yes/no answer.','<b>Who the record belongs to</b>, read from the database.','<b>Who is asking</b>, from the session. Never from the URL or the request body.'])}
${V.steps([
 ['User <b>u2</b> is logged in and opens their own invoice, number 2. The server returns it. All fine.',`<svg viewBox="0 0 420 190" role="img" aria-label="u2 gets own invoice 2">
${V.ic('person',8,8,46,'ic-info')}<text class="t-b" x="58" y="38">u2</text>
<rect class="bx" x="96" y="12" width="318" height="40" rx="20"/><text class="t-m" x="114" y="39" style="font-size:17px">GET /invoices/2</text>
<rect class="bx" x="6" y="66" width="408" height="48" rx="6"/>${V.ic('server',14,72,36,'ic-info')}<text class="t-m" x="60" y="96" style="font-size:14px">find invoice 2 (owner u2)</text>
<rect class="bx-ok" x="6" y="128" width="408" height="54" rx="6"/><text class="t-m" x="18" y="161">200 {id:2, owner:u2, £75}</text>
</svg>`],
 ['Curious, u2 changes the <b>2</b> in the address to <b>1</b>. Anyone can type any URL, or call the API with curl.',`<svg viewBox="0 0 420 190" role="img" aria-label="u2 changes the id to 1">
${V.ic('person',8,8,46,'ic-info')}<text class="t-b" x="58" y="38">u2</text>
<rect class="bx-warn" x="96" y="12" width="318" height="40" rx="20"/><text class="t-m" x="114" y="39" style="font-size:17px">GET /invoices/<tspan class="t-a" style="font-weight:700">1</tspan></text>
<rect class="bx" x="6" y="66" width="408" height="48" rx="6"/>${V.ic('server',14,72,36,'ic-info')}<text class="t-s t-dim" x="60" y="96">waiting…</text>
<rect class="bx" x="6" y="128" width="408" height="54" rx="6"/>
</svg>`],
 ['The buggy server finds invoice 1 and sends it back. It never asked whose it is. u2 now sees <b>u1\'s</b> £120 invoice.',`<svg viewBox="0 0 420 190" role="img" aria-label="Buggy server returns invoice 1 to u2">
${V.ic('person',8,8,46,'ic-info')}<text class="t-b" x="58" y="38">u2</text>
<rect class="bx-warn" x="96" y="12" width="318" height="40" rx="20"/><text class="t-m" x="114" y="39" style="font-size:17px">GET /invoices/<tspan class="t-a" style="font-weight:700">1</tspan></text>
<rect class="bx" x="6" y="66" width="408" height="48" rx="6"/>${V.ic('server',14,72,36,'ic-info')}<text class="t-m" x="60" y="96" style="font-size:14px">find invoice 1 … no owner check</text>
<rect class="bx-bad" x="6" y="128" width="408" height="54" rx="6"/><text class="t-m" x="18" y="161">200 {id:1, owner:<tspan class="t-bad" style="font-weight:700">u1</tspan>, £120}</text>
</svg>`],
 ['The fixed server compares the owner, <b>u1</b>, with the person asking, <b>u2</b>. They differ, so it answers <b>403 Forbidden</b>.',`<svg viewBox="0 0 420 190" role="img" aria-label="Fixed server returns 403">
${V.ic('person',8,8,46,'ic-info')}<text class="t-b" x="58" y="38">u2</text>
<rect class="bx-warn" x="96" y="12" width="318" height="40" rx="20"/><text class="t-m" x="114" y="39" style="font-size:17px">GET /invoices/<tspan class="t-a" style="font-weight:700">1</tspan></text>
<rect class="bx-hl" x="6" y="66" width="408" height="48" rx="6"/>${V.ic('server',14,72,36,'ic-ok')}<text class="t-m" x="60" y="96" style="font-size:14px">owner u1 === user u2 ? no</text>
<rect class="bx-ok" x="6" y="128" width="408" height="54" rx="6"/>${V.ic('shield',16,136,38,'ic-ok')}<text class="t-m" x="64" y="161">403 Forbidden</text>
</svg>`],
 ['And if nobody is logged in at all, the server stops at the first check with <b>401</b>, before it even looks up the invoice.',`<svg viewBox="0 0 420 190" role="img" aria-label="No user returns 401">
${V.ic('person',8,8,46,'ic-bad')}<text class="t-b" x="58" y="38">?</text>
<rect class="bx-warn" x="96" y="12" width="318" height="40" rx="20"/><text class="t-m" x="114" y="39" style="font-size:17px">GET /invoices/1</text>
<rect class="bx-hl" x="6" y="66" width="408" height="48" rx="6"/>${V.ic('server',14,72,36,'ic-ok')}<text class="t-m" x="60" y="96" style="font-size:14px">req.user ? none</text>
<rect class="bx-ok" x="6" y="128" width="408" height="54" rx="6"/>${V.ic('lock',16,136,38,'ic-ok')}<text class="t-m" x="64" y="161">401 Log in first</text>
</svg>`]])}
${V.rules(V.rh('Rules: break one and data leaks'),
 V.ok('check on the server','On every request that touches a record'),V.no('hide the button','The UI is not security: attackers call the API directly'),
 V.ok('req.user.id from the session','Who is asking comes from the login'),V.no('?userId=7 in the URL','The user can type any number'),
 V.rh('Conventions'),
 V.ok('deny by default','Return 403 unless a rule says yes'),V.ok('admins as an explicit rule','isOwner || isAdmin, written out'))}
${V.hook(`Logged in is not allowed in. Check the owner, every time.`)}
`)}

${V.card(3,'Lists and roles','filter before you send',`
<figure class="fig"><svg viewBox="0 0 420 120" role="img" aria-label="A sieve lets only the user's own invoices through">
<rect class="bx" x="10" y="14" width="80" height="40" rx="6"/><text class="t-m" x="50" y="40" text-anchor="middle">1 u1</text>
<rect class="bx" x="10" y="64" width="80" height="40" rx="6"/><text class="t-m" x="50" y="90" text-anchor="middle">2 u2</text>
<rect class="bx" x="100" y="14" width="80" height="40" rx="6"/><text class="t-m" x="140" y="40" text-anchor="middle">3 u1</text>
<path class="ln-a" d="M196 60H230"/><polygon class="ah-a" points="228,53 228,67 240,60"/>
<rect class="bx-a" x="244" y="30" width="60" height="60" rx="30"/>${V.ic('search',256,42,36,'ic-a')}
<path class="ln-ok" d="M308 60H330"/><polygon class="ah-ok" points="328,53 328,67 340,60"/>
<rect class="bx-ok" x="344" y="14" width="66" height="40" rx="6"/><text class="t-m" x="377" y="40" text-anchor="middle">1</text>
<rect class="bx-ok" x="344" y="64" width="66" height="40" rx="6"/><text class="t-m" x="377" y="90" text-anchor="middle">3</text>
</svg><figcaption>List endpoints leak too. Filter to the user's own rows on the server, before the response leaves.</figcaption></figure>
${V.steps([
 ['The buggy list returns <b>every</b> invoice to whoever asks.',`<svg viewBox="0 0 420 130" role="img" aria-label="All three invoices returned">
<text class="t-b" x="10" y="26">Asking: u1</text>
<rect class="bx-bad" x="10" y="44" width="126" height="64" rx="8"/><text class="t-m" x="73" y="72" text-anchor="middle">#1 u1</text><text class="t-s" x="73" y="96" text-anchor="middle">£120</text>
<rect class="bx-bad" x="147" y="44" width="126" height="64" rx="8"/><text class="t-m" x="210" y="72" text-anchor="middle">#2 u2</text><text class="t-s" x="210" y="96" text-anchor="middle">£75</text>
<rect class="bx-bad" x="284" y="44" width="126" height="64" rx="8"/><text class="t-m" x="347" y="72" text-anchor="middle">#3 u1</text><text class="t-s" x="347" y="96" text-anchor="middle">£300</text>
</svg>`],
 ['Fixed: a member gets only rows where <b>ownerId</b> is their id. u1 sees invoices 1 and 3.',`<svg viewBox="0 0 420 130" role="img" aria-label="u1 sees 1 and 3">
<text class="t-b" x="10" y="26">Asking: u1 (member)</text>
<rect class="bx-ok" x="10" y="44" width="126" height="64" rx="8"/><text class="t-m" x="73" y="72" text-anchor="middle">#1 u1</text><text class="t-s" x="73" y="96" text-anchor="middle">£120</text>
<rect class="bx" x="147" y="44" width="126" height="64" rx="8"/><text class="t-m t-dim" x="210" y="72" text-anchor="middle">#2 u2</text><text class="t-s t-dim" x="210" y="96" text-anchor="middle">hidden</text>
<rect class="bx-ok" x="284" y="44" width="126" height="64" rx="8"/><text class="t-m" x="347" y="72" text-anchor="middle">#3 u1</text><text class="t-s" x="347" y="96" text-anchor="middle">£300</text>
</svg>`],
 ['An <b>admin</b> role is a deliberate rule: admins see all three.',`<svg viewBox="0 0 420 130" role="img" aria-label="Admin sees all">
<text class="t-b" x="10" y="26">Asking: boss (admin)</text>
<rect class="bx-ok" x="10" y="44" width="126" height="64" rx="8"/><text class="t-m" x="73" y="72" text-anchor="middle">#1 u1</text><text class="t-s" x="73" y="96" text-anchor="middle">£120</text>
<rect class="bx-ok" x="147" y="44" width="126" height="64" rx="8"/><text class="t-m" x="210" y="72" text-anchor="middle">#2 u2</text><text class="t-s" x="210" y="96" text-anchor="middle">£75</text>
<rect class="bx-ok" x="284" y="44" width="126" height="64" rx="8"/><text class="t-m" x="347" y="72" text-anchor="middle">#3 u1</text><text class="t-s" x="347" y="96" text-anchor="middle">£300</text>
</svg>`]])}
${V.build(`<ol><li>First line of each handler: no <code>req.user</code>? Return 401.</li><li>Look up the record; missing? Return 404.</li><li>Work out <code>isOwner</code> and <code>isAdmin</code>.</li><li>Neither? Return 403.</li><li>For lists, <code>filter</code> by owner unless the user is an admin.</li></ol>`)}
${V.hook(`401: who are you? 403: not yours. 404: nothing here.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Logged in, but asking for someone else's invoice: which status? <i>403 (or 404 to hide that it exists).</i> 2. The app only shows links to your own invoices. Is that enough? <i>No; anyone can call the API with any id.</i> 3. Where should "who is asking" come from? <i>The session, never the URL.</i></div>
`);

explain('x6',`
<p>Some of the biggest breaches were not clever hacks. Someone pushed a password to GitHub, or forgot to update a library. This lesson is the boring, vital housekeeping that stops those.</p>

${V.card(1,'Secrets out of code','keys live in the environment',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A house key taped to the front door versus a key kept in a locked box only the owner opens">
<rect class="bx-bad" x="10" y="10" width="190" height="140" rx="10"/>${V.ic('door',30,24,80,'ic-bad')}${V.ic('key',112,48,40,'ic-bad')}
<text class="t-m" x="105" y="130" text-anchor="middle" style="font-size:14px">config.js</text>
<rect class="bx-ok" x="220" y="10" width="190" height="140" rx="10"/>${V.ic('lock',240,30,64,'ic-ok')}${V.ic('key',320,44,40,'ic-ok')}
<text class="t-m" x="315" y="130" text-anchor="middle" style="font-size:14px">.env (ignored)</text>
</svg><figcaption>A key in your code is a key taped to the front door. Everyone who sees the code sees the key.</figcaption></figure>
${V.like(`<p>Taping your house key to the front door is convenient and terrible. Code gets copied into Git history, screenshots, laptops and public repos. Keep the key in a locked box (an environment variable) that only the running app opens.</p>`)}
${V.why(`<p>Bots scan every public GitHub push for strings that look like API keys, and use them within minutes. An <b>environment variable</b> is a named value given to the program when it starts, outside the code. Locally it comes from a <code>.env</code> file that Git ignores; in production your hosting platform holds it.</p>`)}
${V.anat([[1,'stripeKey'],': ',[2,'process.env'],'.',[3,'STRIPE_KEY'],',' ],[
 '<b>The setting</b> your code needs.','<b>process.env</b> is Node\'s object of environment variables.','<b>The variable name.</b> By convention UPPER_SNAKE_CASE.'])}
${V.steps([
 ['Hunt first. <b>grep -rn</b> searches every file (<b>r</b>ecursive) and shows line <b>n</b>umbers. It finds a live key in the code.',`<svg viewBox="0 0 420 180" role="img" aria-label="grep finds sk_live in config.js">
<rect class="bx-dark" x="6" y="8" width="408" height="84" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$ grep -rn "sk_live" .</text>
<text class="t-term t-warn" x="18" y="62" style="font-size:14px">./src/config.js:3:</text>
<text class="t-term" x="18" y="82" style="font-size:14px">  stripeKey: 'sk_live_51Hx…',</text>
<rect class="bx-bad" x="6" y="106" width="130" height="66" rx="6"/>${V.ic('file',14,114,30,'ic-bad')}<text class="t-m" x="50" y="134" style="font-size:14px">config</text><text class="t-s" x="14" y="162">key inside</text>
<rect class="bx" x="145" y="106" width="130" height="66" rx="6"/>${V.ic('file',153,114,30,'ic-info')}<text class="t-m" x="189" y="134" style="font-size:14px">.env</text><text class="t-s t-dim" x="153" y="162">missing</text>
<rect class="bx" x="284" y="106" width="130" height="66" rx="6"/>${V.ic('file',292,114,30,'ic-info')}<text class="t-m" x="328" y="134" style="font-size:14px">.gitignore</text><text class="t-s" x="292" y="162">node_modules</text>
</svg>`],
 ['Move it. The key goes into <b>.env</b>, and the code reads <b>process.env.STRIPE_KEY</b> instead.',`<svg viewBox="0 0 420 180" role="img" aria-label="Key moved to .env, code reads process.env">
<rect class="bx-dark" x="6" y="8" width="408" height="84" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">// src/config.js</text>
<text class="t-term t-ok" x="18" y="62" style="font-size:14px">  stripeKey: process.env.STRIPE_KEY,</text>
<text class="t-term t-dim" x="18" y="82" style="font-size:14px">// .env: STRIPE_KEY=sk_live_51Hx…</text>
<rect class="bx-ok" x="6" y="106" width="130" height="66" rx="6"/>${V.ic('file',14,114,30,'ic-ok')}<text class="t-m" x="50" y="134" style="font-size:14px">config</text><text class="t-s" x="14" y="162">no secret</text>
<rect class="bx-hl" x="145" y="106" width="130" height="66" rx="6"/>${V.ic('file',153,114,30,'ic-a')}<text class="t-m" x="189" y="134" style="font-size:14px">.env</text><text class="t-s" x="153" y="162">holds the key</text>
<rect class="bx" x="284" y="106" width="130" height="66" rx="6"/>${V.ic('file',292,114,30,'ic-info')}<text class="t-m" x="328" y="134" style="font-size:14px">.gitignore</text><text class="t-s" x="292" y="162">node_modules</text>
</svg>`],
 ['Lock it. Add <b>.env</b> to <b>.gitignore</b>, so Git never commits it.',`<svg viewBox="0 0 420 180" role="img" aria-label=".env added to .gitignore">
<rect class="bx-dark" x="6" y="8" width="408" height="84" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$ echo ".env" &gt;&gt; .gitignore</text>
<text class="t-term" x="18" y="62" style="font-size:14px">$ cat .gitignore</text>
<text class="t-term t-ok" x="18" y="82" style="font-size:14px">node_modules  .env</text>
<rect class="bx-ok" x="6" y="106" width="130" height="66" rx="6"/>${V.ic('file',14,114,30,'ic-ok')}<text class="t-m" x="50" y="134" style="font-size:14px">config</text><text class="t-s" x="14" y="162">no secret</text>
<rect class="bx-ok" x="145" y="106" width="130" height="66" rx="6"/>${V.ic('lock',153,114,30,'ic-ok')}<text class="t-m" x="189" y="134" style="font-size:14px">.env</text><text class="t-s" x="153" y="162">never pushed</text>
<rect class="bx-hl" x="284" y="106" width="130" height="66" rx="6"/>${V.ic('file',292,114,30,'ic-a')}<text class="t-m" x="328" y="134" style="font-size:14px">.gitignore</text><text class="t-s" x="292" y="162">+ .env</text>
</svg>`],
 ['Already pushed? Then assume it was copied. <b>Rotate</b> it: revoke the old key at Stripe and put a new one in .env. Deleting the commit is not enough.',`<svg viewBox="0 0 420 180" role="img" aria-label="Old key revoked, new key issued">
<rect class="bx-bad" x="6" y="8" width="196" height="84" rx="8"/>${V.ic('key',16,22,40,'ic-bad')}${V.ic('cross',60,22,40,'ic-bad')}<text class="t-b" x="16" y="82">old key: revoked</text>
<rect class="bx-ok" x="218" y="8" width="196" height="84" rx="8"/>${V.ic('key',228,22,40,'ic-ok')}${V.ic('check',272,22,40,'ic-ok')}<text class="t-b" x="228" y="82">new key: in .env</text>
<rect class="bx-ok" x="6" y="106" width="130" height="66" rx="6"/>${V.ic('file',14,114,30,'ic-ok')}<text class="t-m" x="50" y="134" style="font-size:14px">config</text><text class="t-s" x="14" y="162">no secret</text>
<rect class="bx-ok" x="145" y="106" width="130" height="66" rx="6"/>${V.ic('lock',153,114,30,'ic-ok')}<text class="t-m" x="189" y="134" style="font-size:14px">.env</text><text class="t-s" x="153" y="162">new key</text>
<rect class="bx-ok" x="284" y="106" width="130" height="66" rx="6"/>${V.ic('file',292,114,30,'ic-ok')}<text class="t-m" x="328" y="134" style="font-size:14px">.gitignore</text><text class="t-s" x="292" y="162">+ .env</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('process.env.STRIPE_KEY','Read secrets from the environment'),V.no("'sk_live_…' in code","Ends up in Git history forever"),
 V.ok('.env in .gitignore','Before your first commit'),V.no('delete commit and move on','Rotate first; the key may already be copied'),
 V.no('NEXT_PUBLIC_STRIPE_KEY','Public prefixes are bundled into browser code'),V.ok('.env.example','Commit the names with blank values, so teammates know what to set'))}
${V.hook(`Hunt it, move it, ignore it, and if it ever escaped, rotate it.`)}
`)}

${V.card(2,'Dependencies','your app is mostly other people\'s code',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A tower: your code is a small box on top of many package boxes. One package near the bottom has a bug">
<rect class="bx-a" x="160" y="8" width="100" height="34" rx="5"/><text class="t-b" x="210" y="31" text-anchor="middle">your code</text>
<rect class="bx" x="110" y="48" width="96" height="34" rx="5"/><text class="t-m" x="158" y="71" text-anchor="middle" style="font-size:14px">express</text>
<rect class="bx" x="214" y="48" width="96" height="34" rx="5"/><text class="t-m" x="262" y="71" text-anchor="middle" style="font-size:14px">lodash</text>
<rect class="bx" x="60" y="88" width="96" height="34" rx="5"/><rect class="bx" x="162" y="88" width="96" height="34" rx="5"/><rect class="bx-bad" x="264" y="88" width="96" height="34" rx="5"/>${V.ic('bug',298,90,30,'ic-bad')}
<rect class="bx" x="10" y="128" width="96" height="34" rx="5"/><rect class="bx" x="112" y="128" width="96" height="34" rx="5"/><rect class="bx" x="214" y="128" width="96" height="34" rx="5"/><rect class="bx" x="316" y="128" width="96" height="34" rx="5"/>
</svg><figcaption>Two packages you chose pull in dozens more. A hole in any of them is a hole in your app.</figcaption></figure>
${V.like(`<p>A house built from parts bought from many suppliers. If one supplier recalls a faulty lock, you need to know it is in your house and swap it.</p>`)}
${V.why(`<p>Published holes get a public ID, a <b>CVE</b>. <code>npm audit</code> compares your installed versions with a database of these advisories. Dependabot and Renovate watch for you and open pull requests with updates.</p>`)}
${V.steps([
 ['<b>npm audit</b> checks every installed package against known advisories. lodash 4.17.15 has published holes.',`<svg viewBox="0 0 420 150" role="img" aria-label="npm audit reports lodash vulnerability">
<rect class="bx-dark" x="6" y="8" width="408" height="134" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$ npm audit</text>
<text class="t-term t-bad" x="18" y="64" style="font-size:14px">lodash  &lt;4.17.21</text>
<text class="t-term" x="18" y="88" style="font-size:14px">Severity: high</text>
<text class="t-term t-dim" x="18" y="112" style="font-size:14px">fix available via \`npm audit fix\`</text>
</svg>`],
 ['<b>npm audit fix</b> upgrades to the nearest safe version that your package.json allows.',`<svg viewBox="0 0 420 150" role="img" aria-label="npm audit fix updates lodash">
<rect class="bx-dark" x="6" y="8" width="408" height="134" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$ npm audit fix</text>
<text class="t-term" x="18" y="64" style="font-size:14px">lodash 4.17.15 <tspan class="t-ok">→ 4.17.21</tspan></text>
<text class="t-term t-dim" x="18" y="88" style="font-size:14px">changed 1 package</text>
</svg>`],
 ['Run the audit again to prove it. Then run your tests, because any update can change behaviour.',`<svg viewBox="0 0 420 150" role="img" aria-label="npm audit finds 0 vulnerabilities">
<rect class="bx-dark" x="6" y="8" width="408" height="134" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$ npm audit</text>
<text class="t-term t-ok" x="18" y="64" style="font-size:14px">found 0 vulnerabilities</text>
<text class="t-term t-dim" x="18" y="92" style="font-size:14px">$ npm test</text>
</svg>`]])}
${V.rules(V.ok('npm audit in CI','Fail the build on high-severity advisories'),V.ok('Dependabot / Renovate','Automatic update pull requests'),
 V.no('npm audit fix --force blindly','It can jump major versions and break your app'),V.ok('commit package-lock.json','Everyone installs the exact same versions'))}
${V.hook(`You ship what you install. Audit, fix, retest.`)}
`)}

${V.card(3,'Security headers','instructions stapled to every page',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="A response envelope carrying four header stamps: HSTS, CSP, frame-ancestors, nosniff">
<rect class="bx" x="6" y="6" width="408" height="178" rx="10"/>${V.ic('mail',16,14,34,'ic-a')}<text class="t-b" x="58" y="38">HTTP response headers</text>
<rect class="bx-info" x="16" y="52" width="388" height="28" rx="5"/><text class="t-m" x="26" y="72" style="font-size:14px">Strict-Transport-Security</text>
<rect class="bx-info" x="16" y="84" width="388" height="28" rx="5"/><text class="t-m" x="26" y="104" style="font-size:14px">Content-Security-Policy</text>
<rect class="bx-info" x="16" y="116" width="388" height="28" rx="5"/><text class="t-m" x="26" y="136" style="font-size:14px">frame-ancestors 'none' (in CSP)</text>
<rect class="bx-info" x="16" y="148" width="388" height="28" rx="5"/><text class="t-m" x="26" y="168" style="font-size:14px">X-Content-Type-Options: nosniff</text>
</svg><figcaption>Headers are short instructions your server sends with every response. The browser enforces them.</figcaption></figure>
${V.like(`<p>Care labels sewn into clothes: "wash at 30, do not tumble dry". The garment cannot follow them itself, but whoever handles it will. Headers are care labels for your pages, and the browser follows them.</p>`)}
${V.anat([[1,'Strict-Transport-Security'],': ',[2,'max-age=31536000'],'; ',[3,'includeSubDomains']],[
 '<b>HSTS.</b> "Only ever talk to me over HTTPS."','<b>How long to remember</b>, in seconds. 31,536,000 is one year.','<b>Also for</b> every subdomain, like <code>shop.example.com</code>.'])}
${V.rules(V.rh('Which header stops what'),
 V.ok('Strict-Transport-Security','Downgrades to plain HTTP'),V.ok('Content-Security-Policy','Limits which scripts may run (XSS damage)'),
 V.ok("frame-ancestors 'none'","Clickjacking: your page hidden in another site's frame. Older: X-Frame-Options: DENY"),V.ok('X-Content-Type-Options: nosniff','Browsers guessing a file is a script'),
 V.no('CORS as API security','CORS only tells browsers who may read responses. curl ignores it; you still need login checks'))}
${V.hook(`HSTS for the road, CSP for scripts, frame-ancestors for frames, nosniff for files.`)}
`)}

<div class="try"><b>Try it in your head</b>1. A live key was pushed last week. First step? <i>Rotate it: revoke and replace.</i> 2. What does <code>npm audit</code> compare? <i>Your installed versions against known advisories.</i> 3. Does CORS stop someone calling your API with curl? <i>No. Only authentication does.</i></div>
`);
