/* Linux: "Explained step by step" walkthroughs. */

explain('l2',`
<h4>Why files have permissions at all</h4>
<p>Linux was built for computers that many people share at the same time. A university server might have hundreds of students logged in at once, and a web server runs dozens of programs for different jobs. If everyone could read and change every file, one student could read another's exam answers, and a buggy program could delete the whole system.</p>
<p>So Linux attaches a small set of rules to <b>every single file and folder</b>. The rules answer one question: <i>who is allowed to do what with this file?</i> Every time you open, save or run something, Linux checks those rules first. If the rules say no, you get the message <code>Permission denied</code>.</p>
<div class="analogy"><b>Think of it like</b>A shared office building. Every room has a lock, and the lock says who may enter (read), who may move the furniture (write) and who may use the equipment (execute). The building manager, called <b>root</b>, has a master key to every room.</div>

<h4>Users and groups: who "you" are</h4>
<p>When you log in, you are a <b>user</b> with a name, like <code>you</code>. Type <code>whoami</code> and Linux tells you your user name.</p>
<p>Users can also belong to <b>groups</b>. A group is just a named list of users, like a team. For example, everyone on the web team might be in a group called <code>webdev</code>, so a file can be shared with the whole team at once without opening it up to everybody.</p>
<p>There is one special user called <b>root</b>. Root is the administrator, and the permission rules do not apply to root at all. That is powerful and dangerous, which is why you will learn to borrow root's power only for single commands, using <code>sudo</code>.</p>

<h4>Reading <code>ls -l</code>, one character at a time</h4>
<p>Run <code>ls -l</code> and each line starts with a 10-character code such as <code>-rwxr-xr-x</code>. It looks like noise at first, but it is a very tidy pattern: one character for the type, then three groups of three letters.</p>
<figure class="fig"><svg viewBox="0 0 520 200" role="img" aria-label="The permission string -rwxr-xr-x split into type, owner, group and others">
<rect class="bx" x="60" y="20" width="40" height="44" rx="4"/>
<rect class="bx-a" x="100" y="20" width="40" height="44"/><rect class="bx-a" x="140" y="20" width="40" height="44"/><rect class="bx-a" x="180" y="20" width="40" height="44"/>
<rect class="bx-ok" x="220" y="20" width="40" height="44"/><rect class="bx-ok" x="260" y="20" width="40" height="44"/><rect class="bx-ok" x="300" y="20" width="40" height="44"/>
<rect class="bx-info" x="340" y="20" width="40" height="44"/><rect class="bx-info" x="380" y="20" width="40" height="44"/><rect class="bx-info" x="420" y="20" width="40" height="44" rx="0"/>
<g class="t-m" text-anchor="middle" style="font-size:22px">
<text class="t-m" x="80" y="50" style="font-size:22px">-</text>
<text class="t-m" x="120" y="50" style="font-size:22px">r</text><text class="t-m" x="160" y="50" style="font-size:22px">w</text><text class="t-m" x="200" y="50" style="font-size:22px">x</text>
<text class="t-m" x="240" y="50" style="font-size:22px">r</text><text class="t-m" x="280" y="50" style="font-size:22px">-</text><text class="t-m" x="320" y="50" style="font-size:22px">x</text>
<text class="t-m" x="360" y="50" style="font-size:22px">r</text><text class="t-m" x="400" y="50" style="font-size:22px">-</text><text class="t-m" x="440" y="50" style="font-size:22px">x</text>
</g>
<path class="ln" d="M64 74v8h32v-8"/><path class="ln-a" d="M104 74v8h112v-8"/><path class="ln-ok" d="M224 74v8h112v-8"/><path class="ln" style="stroke:var(--l4)" d="M344 74v8h112v-8"/>
<g text-anchor="middle">
<text class="t-b" x="80" y="106">type</text>
<text class="t-b t-a" x="160" y="106">owner</text><text class="t-b t-ok" x="280" y="106">group</text><text class="t-b t-info" x="400" y="106">others</text>
<text class="t-s" x="80" y="126">file</text>
<text class="t-s" x="160" y="126">read, write, run</text><text class="t-s" x="280" y="126">read, run</text><text class="t-s" x="400" y="126">read, run</text>
</g>
<text class="t-s" x="260" y="170" text-anchor="middle">First character: - is a normal file, d is a directory (folder).</text>
<text class="t-s" x="260" y="190" text-anchor="middle">A dash in any other slot means "this permission is switched off".</text>
</svg><figcaption>The 10 characters of <code>-rwxr-xr-x</code>. Each coloured block of three answers the same question (read? write? execute?) for a different set of people.</figcaption></figure>
<p>Reading the example from left to right:</p>
<ol>
<li><code>-</code>: this is a normal file. A folder would show <code>d</code> here.</li>
<li><code>rwx</code>: the <b>owner</b> (usually whoever created the file) can read, write and execute it.</li>
<li><code>r-x</code>: members of the file's <b>group</b> can read and execute it, but the dash in the middle means they cannot change it.</li>
<li><code>r-x</code>: <b>others</b>, meaning every other user on the machine, can also read and execute but not change it.</li>
</ol>
<p>The rest of the <code>ls -l</code> line tells you the owner's name and the group's name, so <code>-rwxr-xr-x 1 you you 48 Oct 9 deploy.sh</code> means the owner is <code>you</code> and the group is also called <code>you</code> (Linux gives each user a personal group with the same name).</p>

<h4>What read, write and execute really mean</h4>
<p>The three letters mean slightly different things for files and for folders. This trips up almost everyone, so it is worth slowing down here.</p>
<div class="tbl-wrap"><table><tr><th>Letter</th><th>On a file</th><th>On a folder</th></tr>
<tr><td><code>r</code> read</td><td>Open it and look at what is inside (<code>cat file</code>).</td><td>List the names of what is inside (<code>ls folder</code>).</td></tr>
<tr><td><code>w</code> write</td><td>Change or empty its contents.</td><td>Create, rename or delete files inside it.</td></tr>
<tr><td><code>x</code> execute</td><td>Run it as a program or script.</td><td>Enter it with <code>cd</code> and reach the files inside it.</td></tr></table></div>
<p>Two surprising consequences follow from that table:</p>
<ul>
<li>Deleting a file depends on the <b>folder's</b> write permission, not the file's. The file is just an entry in the folder's list, and removing an entry is changing the folder.</li>
<li>A folder without <code>x</code> is like a locked door with a window: with <code>r</code> you can see the names inside, but you cannot open any of the files. That is why folders almost always have <code>x</code> wherever they have <code>r</code>.</li>
</ul>

<h4>How Linux decides which three letters apply to you</h4>
<p>Linux does not add up all three groups. It picks <b>exactly one</b> set of three letters for you, and it checks in a fixed order:</p>
<figure class="fig"><svg viewBox="0 0 520 250" role="img" aria-label="Decision flow: owner, then group, then others">
<rect class="bx" x="150" y="10" width="220" height="40" rx="8"/><text class="t-b" x="260" y="35" text-anchor="middle">You try to use a file</text>
<path class="ln" d="M260 50v18"/><polygon class="ah" points="254,66 266,66 260,74"/>
<rect class="bx-a" x="130" y="76" width="260" height="40" rx="8"/><text class="t" x="260" y="101" text-anchor="middle">Are you the file's owner?</text>
<path class="ln-a" d="M390 96h40"/><polygon class="ah-a" points="428,90 428,102 436,96"/>
<rect class="bx-a" x="438" y="78" width="76" height="36" rx="6"/><text class="t-s" x="476" y="101" text-anchor="middle">owner set</text>
<text class="t-s t-a" x="410" y="88" text-anchor="middle">yes</text>
<path class="ln" d="M260 116v18"/><polygon class="ah" points="254,132 266,132 260,140"/><text class="t-s" x="272" y="132">no</text>
<rect class="bx-ok" x="130" y="142" width="260" height="40" rx="8"/><text class="t" x="260" y="167" text-anchor="middle">Are you in the file's group?</text>
<path class="ln-ok" d="M390 162h40"/><polygon class="ah-ok" points="428,156 428,168 436,162"/>
<rect class="bx-ok" x="438" y="144" width="76" height="36" rx="6"/><text class="t-s" x="476" y="167" text-anchor="middle">group set</text>
<text class="t-s t-ok" x="410" y="154" text-anchor="middle">yes</text>
<path class="ln" d="M260 182v18"/><polygon class="ah" points="254,198 266,198 260,206"/><text class="t-s" x="272" y="198">no</text>
<rect class="bx-info" x="130" y="208" width="260" height="36" rx="8"/><text class="t" x="260" y="231" text-anchor="middle">Use the "others" set</text>
</svg><figcaption>Linux stops at the first question you answer "yes" to. As the owner, you get the owner's letters even if "others" has more.</figcaption></figure>
<p>That last point matters: if a file is <code>---r--r--</code>, everyone else can read it but the owner cannot, because the owner only ever gets the first three letters. (Root skips this whole check.)</p>

<h4>Changing permissions with letters: <code>chmod u+x</code></h4>
<p><code>chmod</code> means "change mode", and "mode" is Linux's word for the permission settings. The easiest way to use it is with letters, built from three parts: <b>who</b>, <b>add or remove</b>, and <b>which permission</b>.</p>
<div class="tbl-wrap"><table><tr><th>Who</th><th>Action</th><th>Permission</th></tr>
<tr><td><code>u</code> user (owner)<br><code>g</code> group<br><code>o</code> others<br><code>a</code> all three</td><td><code>+</code> add<br><code>-</code> remove<br><code>=</code> set exactly</td><td><code>r</code> read<br><code>w</code> write<br><code>x</code> execute</td></tr></table></div>
<pre class="snip">chmod u+x deploy.sh     # owner may now run it
chmod g-w report.txt    # group can no longer change it
chmod o-r notes.txt     # others can no longer read it
chmod +x deploy.sh      # no "who" means everyone: add x for all</pre>
<p>In this lesson, <code>deploy.sh</code> starts without execute permission. Running <code>./deploy.sh</code> fails with <code>Permission denied</code>, and <code>chmod +x deploy.sh</code> fixes it. That error-then-fix is one of the most common things you will do on a real server.</p>

<h4>Changing permissions with numbers: <code>chmod 755</code></h4>
<p>You will see numbers like <code>755</code> and <code>600</code> everywhere, in tutorials, error messages and job interviews. They are a shorthand for all nine letters at once, and the trick behind them is simple once you see it.</p>
<p>Think of each permission as a light switch that is either on or off. Each switch has a fixed value: <b>read is worth 4, write is worth 2, execute is worth 1</b>. To describe one set of three, add up the values of the switches that are on.</p>
<figure class="fig"><svg viewBox="0 0 520 250" role="img" aria-label="Read is worth 4, write 2, execute 1; add the switches that are on">
<g text-anchor="middle">
<text class="t-b" x="150" y="28">r</text><text class="t-b" x="230" y="28">w</text><text class="t-b" x="310" y="28">x</text><text class="t-b" x="420" y="28">total</text>
<text class="t-s" x="150" y="46">worth 4</text><text class="t-s" x="230" y="46">worth 2</text><text class="t-s" x="310" y="46">worth 1</text>
</g>
<line class="ln-d" x1="30" y1="58" x2="490" y2="58"/>
<g text-anchor="start"><text class="t-m" x="40" y="91">rwx</text><text class="t-m" x="40" y="136">r-x</text><text class="t-m" x="40" y="181">rw-</text><text class="t-m" x="40" y="226">r--</text></g>
<circle class="dot" cx="150" cy="86" r="11"/><circle class="dot" cx="230" cy="86" r="11"/><circle class="dot" cx="310" cy="86" r="11"/>
<circle class="dot" cx="150" cy="131" r="11"/><circle class="bx" cx="230" cy="131" r="11"/><circle class="dot" cx="310" cy="131" r="11"/>
<circle class="dot" cx="150" cy="176" r="11"/><circle class="dot" cx="230" cy="176" r="11"/><circle class="bx" cx="310" cy="176" r="11"/>
<circle class="dot" cx="150" cy="221" r="11"/><circle class="bx" cx="230" cy="221" r="11"/><circle class="bx" cx="310" cy="221" r="11"/>
<g text-anchor="middle"><text class="t" x="420" y="91">4+2+1 = <tspan class="t-b t-a">7</tspan></text><text class="t" x="420" y="136">4+0+1 = <tspan class="t-b t-a">5</tspan></text><text class="t" x="420" y="181">4+2+0 = <tspan class="t-b t-a">6</tspan></text><text class="t" x="420" y="226">4+0+0 = <tspan class="t-b t-a">4</tspan></text></g>
</svg><figcaption>A filled circle is a switch that is on. Because the values are 4, 2 and 1, every combination adds up to a different number from 0 to 7, so a single digit can never be ambiguous.</figcaption></figure>
<p>A full mode is three of those digits side by side: <b>owner, group, others</b>, always in that order. Let's decode the common ones step by step:</p>
<ul>
<li><code>755</code>: owner 7 = 4+2+1 = <code>rwx</code>; group 5 = 4+1 = <code>r-x</code>; others 5 = <code>r-x</code>. Result <code>rwxr-xr-x</code>. Use it for scripts and folders: everyone can use them, only you can change them.</li>
<li><code>644</code>: owner 6 = 4+2 = <code>rw-</code>; group 4 = <code>r--</code>; others 4 = <code>r--</code>. Result <code>rw-r--r--</code>. The normal setting for ordinary files like web pages.</li>
<li><code>600</code>: owner 6 = <code>rw-</code>; group 0 and others 0 = <code>---</code>. Result <code>rw-------</code>. Only you can touch it. Use it for passwords, <code>.env</code> files and SSH private keys.</li>
<li><code>700</code>: <code>rwx------</code>. A private folder or script only you can use.</li>
</ul>
<p>Going the other way works too. To turn <code>rw-r-----</code> into a number, score each block: <code>rw-</code> = 4+2 = 6, <code>r--</code> = 4, <code>---</code> = 0, so the answer is <code>640</code>.</p>
<div class="try"><b>Try it in your head</b>What number is <code>rwxr-----</code>? Owner rwx = 7, group r-- = 4, others --- = 0, so <code>740</code>. And what does <code>chmod 711</code> give others? 1 = execute only: they can run it but not read it.</div>
<p>Letters or numbers? Use letters (<code>chmod +x</code>) to change one thing and leave the rest alone. Use numbers (<code>chmod 600</code>) to set the whole thing exactly, which is what you want for secrets.</p>

<h4>Changing the owner: <code>chown</code></h4>
<p>Sometimes the problem is not the letters but the owner. <code>chown alice report.txt</code> makes <code>alice</code> the owner, and <code>chown alice:webdev report.txt</code> sets the owner and the group in one go. Only root can give a file away, so in practice you write <code>sudo chown ...</code>.</p>

<h4>Root, <code>sudo</code> and least privilege</h4>
<p>Some jobs change the whole machine: installing software, editing system settings, restarting services. Those files belong to root, so a normal user gets <code>Permission denied</code>. That is the system protecting itself, not a bug.</p>
<p><code>sudo</code> ("superuser do") runs <b>one command</b> as root, after checking that you are allowed to and usually asking for your password. In this lesson <code>apt update</code> fails, and <code>sudo apt update</code> works, because updating the package list writes to system folders.</p>
<p>The habit professionals follow is called <b>least privilege</b>: give each person and program the smallest power it needs, and no more. In practice:</p>
<ul>
<li>Work as your normal user. Reach for <code>sudo</code> only for the one command that needs it.</li>
<li>Give secrets <code>600</code> so no other user, and no other program running as another user, can read them.</li>
<li>Never "fix" a permission problem by opening everything up.</li>
</ul>
<div class="mistake"><b>Common mistake</b><code>chmod 777</code> means read, write and execute for everyone on the machine. It makes an error go away, which is why it gets copied from forum answers, but it also means any program or user can change your file, including an attacker who breaks into any other service. Find out who actually needs access and give exactly that.</div>
<div class="mistake"><b>Common mistake</b>Putting <code>sudo</code> in front of everything. Files you create with sudo belong to root, so later your normal user cannot edit them and you get new "Permission denied" errors. If you only needed sudo by accident, <code>sudo chown you file</code> gives the file back.</div>

<h4>Reading a "Permission denied" error</h4>
<p>When you hit the error, ask three questions in order:</p>
<ol>
<li><b>Who am I?</b> Run <code>whoami</code>.</li>
<li><b>Who owns it, and what are its letters?</b> Run <code>ls -l file</code>, and <code>ls -ld folder</code> for the folder it lives in.</li>
<li><b>Which permission is missing?</b> Running needs <code>x</code> on the file. Saving needs <code>w</code> on the file. Creating or deleting needs <code>w</code> on the folder. System changes need <code>sudo</code>.</li>
</ol>
<h4>Recap</h4>
<ul>
<li>Every file has an owner, a group and nine permission letters: owner, group, others, each with read, write and execute.</li>
<li>Linux uses exactly one of the three sets: owner first, then group, then others. Root ignores the rules.</li>
<li><code>chmod +x</code> makes something runnable. Numbers add r = 4, w = 2 and x = 1 per set, so <code>755</code> is <code>rwxr-xr-x</code> and <code>600</code> is <code>rw-------</code>.</li>
<li>Use <code>sudo</code> for one command at a time, protect secrets with <code>600</code>, and never use <code>777</code>.</li>
</ul>
`);
