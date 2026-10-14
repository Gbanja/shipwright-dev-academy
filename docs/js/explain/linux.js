/* Linux: "Explained step by step" walkthroughs. */

explain('l1',`
<h4>The terminal and the shell: a text conversation</h4>
<p>Most of the time you use a computer by clicking: you open folders in a window, drag files around and double-click to open them. Servers do not work like that. A server is a computer in a data centre with no screen, no mouse and no desktop. The websites, apps and databases you will build run on machines like that, and almost all of them run <b>Linux</b>, an operating system (the core software that runs a computer).</p>
<p>So engineers talk to computers in text instead. You type a short instruction, press Enter, and the computer types back an answer. Two pieces of software make this work:</p>
<ul>
<li>The <b>terminal</b> is the window: a box that shows text and lets you type.</li>
<li>The <b>shell</b> is the program inside that window that actually listens. It reads what you typed, runs it, and prints the result. The most common shell on Linux is called <b>bash</b>.</li>
</ul>
<p>Each instruction you type is called a <b>command</b>. When the shell is ready for the next one, it shows a <b>prompt</b>: a short line of text that ends in <code>$</code> and then a blinking cursor.</p>
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="A shell prompt split into user, computer, current folder, ready sign and command">
<rect class="bx-dark" x="10" y="10" width="400" height="46" rx="6"/>
<text class="t-term" x="24" y="40" style="font-size:17px">you@laptop:~/projects$ ls -la</text>
<path class="ln" d="M40 60v20"/><path class="ln" d="M98 60v55"/><path class="ln" d="M194 60v20"/><path class="ln" d="M252 60v55"/><path class="ln-a" d="M300 60v20"/>
<g text-anchor="middle">
<text class="t" x="40" y="98">user</text>
<text class="t" x="180" y="98">current folder</text>
<text class="t-b t-a" x="318" y="98">command</text>
<text class="t" x="98" y="133">computer</text>
<text class="t" x="252" y="133">ready</text>
</g>
</svg><figcaption>A typical prompt. It tells you who you are logged in as, which computer you are on and which folder you are in, then the dollar sign says the shell is ready. Everything after it is what you type.</figcaption></figure>
<p>A command often has extra parts. In <code>ls -la projects</code>, the word <code>ls</code> is the command itself, <code>-la</code> are <b>options</b> (also called <b>flags</b>: switches that change how it behaves, starting with a dash), and <code>projects</code> is an <b>argument</b> (the thing you want it to work on). Spaces separate the parts, so they matter.</p>
<div class="analogy"><b>Think of it like</b>Texting a very literal assistant. It does exactly what you write, instantly, and never guesses what you meant. A typo is not a small mistake to it: it is a different instruction.</div>

<h4>The filesystem is one big tree</h4>
<p>Every file on a Linux computer lives in a <b>folder</b>, which Linux people usually call a <b>directory</b>. The two words mean the same thing. Folders can contain files and more folders, which contain more folders, and so on.</p>
<p>If you draw that, you get an upside-down tree. At the very top is one folder that contains everything else. It is called the <b>root</b>, and its name is a single forward slash: <code>/</code>. Unlike Windows, there is no <code>C:</code> drive and no separate tree for each disk. Everything, even a USB stick, hangs somewhere under <code>/</code>.</p>
<figure class="fig"><svg viewBox="0 0 420 372" role="img" aria-label="The Linux folder tree from root down to the site folder">
<rect class="bx-a" x="185" y="10" width="50" height="34" rx="6"/><text class="t-m" x="210" y="32" text-anchor="middle">/</text>
<path class="ln" d="M210 44v15M55 59h300M55 59v15M155 59v15M255 59v15M355 59v15"/>
<rect class="bx" x="20" y="74" width="70" height="34" rx="6"/><text class="t-m" x="55" y="96" text-anchor="middle">bin</text>
<rect class="bx" x="120" y="74" width="70" height="34" rx="6"/><text class="t-m" x="155" y="96" text-anchor="middle">etc</text>
<rect class="bx-a" x="220" y="74" width="70" height="34" rx="6"/><text class="t-m" x="255" y="96" text-anchor="middle">home</text>
<rect class="bx" x="320" y="74" width="70" height="34" rx="6"/><text class="t-m" x="355" y="96" text-anchor="middle">var</text>
<path class="ln" d="M255 108v30"/>
<rect class="bx-a" x="220" y="138" width="70" height="34" rx="6"/><text class="t-m" x="255" y="160" text-anchor="middle">you</text>
<text class="t-s" x="210" y="160" text-anchor="end">your home, ~</text>
<path class="ln" d="M255 172v15M60 187h307M60 187v15M165 187v15M267 187v15M367 187v15"/>
<rect class="bx" x="10" y="202" width="100" height="34" rx="6"/><text class="t-m" x="60" y="224" text-anchor="middle">Documents</text>
<rect class="bx-a" x="120" y="202" width="90" height="34" rx="6"/><text class="t-m" x="165" y="224" text-anchor="middle">projects</text>
<rect class="bx-info" x="220" y="202" width="95" height="34" rx="14"/><text class="t-m" x="267" y="224" text-anchor="middle">notes.txt</text>
<rect class="bx-info" x="325" y="202" width="85" height="34" rx="14"/><text class="t-m" x="367" y="224" text-anchor="middle">.bashrc</text>
<path class="ln" d="M165 236v30"/>
<rect class="bx-a" x="120" y="266" width="90" height="34" rx="6"/><text class="t-m" x="165" y="288" text-anchor="middle">site</text>
<path class="ln" d="M165 300v30"/>
<rect class="bx-a" x="120" y="330" width="90" height="34" rx="6"/><text class="t-m" x="165" y="352" text-anchor="middle">css</text>
<rect class="bx" x="270" y="274" width="24" height="18" rx="4"/><text class="t-s" x="304" y="288">folder</text>
<rect class="bx-info" x="270" y="304" width="24" height="18" rx="8"/><text class="t-s" x="304" y="318">file</text>
<rect class="bx-a" x="270" y="334" width="24" height="18" rx="4"/><text class="t-s" x="304" y="348">one path</text>
</svg><figcaption>The folder tree, drawn upside down with the root, slash, at the top. Square boxes are folders and rounded ones are files. The highlighted chain is the path slash home, slash you, slash projects, slash site, slash css, which you will build in this lesson.</figcaption></figure>
<p>A few top-level folders you will meet again: <code>/bin</code> holds basic programs (yes, commands like <code>ls</code> are just program files), <code>/etc</code> holds settings, <code>/var</code> holds things that change, such as logs, and <code>/home</code> holds one folder per person.</p>
<p>Your personal folder is your <b>home folder</b>. Here it is <code>/home/you</code>. It is where your own files live and where a new terminal starts. Because you refer to it so often, the shell gives it a nickname: the tilde, <code>~</code>. Typing <code>~</code> is exactly the same as typing <code>/home/you</code>.</p>

<h4>Where am I, and what is here? <code>pwd</code> and <code>ls</code></h4>
<p>At every moment the shell is "standing" in one folder, called the <b>working directory</b> or current folder. Commands act on that folder unless you say otherwise, so the first habit to build is checking where you are.</p>
<ul>
<li><code>pwd</code> means "print working directory". It prints the full address of the folder you are standing in, like <code>/home/you</code>.</li>
<li><code>ls</code> means "list". It shows the names of the files and folders in the current folder.</li>
</ul>
<p><code>ls</code> has two flags you will use constantly. <code>-l</code> gives the <b>long</b> format: one line per item with extra details such as size, date and permissions (the next lesson decodes those). <code>-a</code> shows <b>all</b> items, including hidden ones. You can combine flags, so <code>ls -la</code> means both at once.</p>
<p>Why would anything be hidden? On Linux, any file whose name starts with a dot is hidden from a plain <code>ls</code>. These <b>dotfiles</b> are usually settings, like <code>.bashrc</code>, which configures your shell. They are hidden only to keep the listing tidy, not for security.</p>
<pre class="snip">$ ls
Documents  Downloads  notes.txt  projects
$ ls -a
.  ..  .bashrc  Documents  Downloads  notes.txt  projects</pre>
<p>Notice the two strange entries <code>.</code> and <code>..</code> at the start of the second listing. They are not real files. Every folder contains these two shortcuts, and they are the key to the next section.</p>

<h4>Paths: absolute and relative</h4>
<p>A <b>path</b> is the address of a file or folder: the names of the folders you pass through, separated by <code>/</code>. There are two kinds, and the difference is simply <b>where the address starts</b>.</p>
<p>An <b>absolute path</b> starts with <code>/</code>, so it starts at the root. <code>/home/you/projects/site</code> means: from the top, go into <code>home</code>, then <code>you</code>, then <code>projects</code>, then <code>site</code>. Like a full postal address, it means the same thing no matter where you are standing.</p>
<p>A <b>relative path</b> does not start with <code>/</code>. It starts from your current folder. If you are in <code>/home/you</code>, then <code>projects/site</code> means "from here, go into projects, then site", which lands in the same place. Like the directions "second door on the left", it only works from the right starting point.</p>
<p>Now the three shortcuts, which work inside any path:</p>
<div class="tbl-wrap"><table><tr><th>Symbol</th><th>Means</th><th>Example</th></tr>
<tr><td><code>~</code></td><td>Your home folder</td><td><code>~/notes.txt</code> is <code>/home/you/notes.txt</code></td></tr>
<tr><td><code>.</code></td><td>This folder, right here</td><td><code>./site</code> is the same as <code>site</code></td></tr>
<tr><td><code>..</code></td><td>The folder one level up (the parent)</td><td><code>../..</code> goes up two levels</td></tr></table></div>
<figure class="fig"><svg viewBox="0 0 420 280" role="img" aria-label="Relative paths from the site folder to the folders around it">
<rect class="bx" x="20" y="16" width="150" height="40" rx="6"/><text class="t-m" x="95" y="41" text-anchor="middle">/home/you</text>
<rect class="bx" x="20" y="86" width="150" height="40" rx="6"/><text class="t-m" x="95" y="111" text-anchor="middle">projects</text>
<rect class="bx-a" x="20" y="156" width="150" height="40" rx="6"/><text class="t-m" x="95" y="181" text-anchor="middle">site</text>
<rect class="bx" x="20" y="226" width="150" height="40" rx="6"/><text class="t-m" x="95" y="251" text-anchor="middle">css</text>
<path class="ln" d="M95 56v30M95 126v30M95 196v30"/>
<text class="t-m" x="196" y="41">../..</text><text class="t-s" x="262" y="41">or ~, up two</text>
<text class="t-m" x="196" y="111">..</text><text class="t-s" x="262" y="111">up one level</text>
<text class="t-m t-a" x="196" y="181">.</text><text class="t-s t-a" x="262" y="181">you are here</text>
<text class="t-m" x="196" y="251">css</text><text class="t-s" x="262" y="251">down into css</text>
</svg><figcaption>You are standing in the site folder. From there, dot means site itself, dot dot means projects, dot dot slash dot dot means your home folder, and plain css goes down into the css folder.</figcaption></figure>
<p>Let's work one through. You are in <code>/home/you/projects/site</code> and you want the file <code>notes.txt</code> in your home folder. Three paths all reach it:</p>
<ol>
<li>Absolute: <code>/home/you/notes.txt</code>. Start at the root and walk down.</li>
<li>With the home shortcut: <code>~/notes.txt</code>. The shell swaps <code>~</code> for <code>/home/you</code>.</li>
<li>Relative: <code>../../notes.txt</code>. From site, up to projects, up again to <code>/home/you</code>, then the file.</li>
</ol>
<div class="try"><b>Try it in your head</b>You are in <code>/home/you/projects</code>. Where does <code>../Documents</code> point? Up one level is <code>/home/you</code>, then into Documents, so <code>/home/you/Documents</code>. And is <code>~/projects</code> absolute or relative? It behaves like an absolute path, because the shell replaces <code>~</code> with <code>/home/you</code> before running the command.</div>

<h4>Moving around with <code>cd</code></h4>
<p><code>cd</code> means "change directory". It moves you to a different folder, using any kind of path. It prints nothing when it works, so follow it with <code>pwd</code> if you want to check.</p>
<pre class="snip">cd projects        # down into projects (relative)
cd /etc            # jump anywhere (absolute)
cd ..              # up one level, to the parent
cd ~               # back to your home folder
cd                 # on its own: also home
cd -               # back to the folder you were in before</pre>
<p><code>cd -</code> is handy when you jump between two distant folders: it toggles back and forth, and prints the folder it moved you to.</p>

<h4>Building things: <code>mkdir</code>, <code>touch</code> and <code>tree</code></h4>
<p><code>mkdir</code> means "make directory". <code>mkdir site</code> creates one folder called <code>site</code> inside the current folder.</p>
<p>What about <code>mkdir projects/site/css</code> when <code>site</code> does not exist yet? Plain <code>mkdir</code> refuses, because it only creates the last folder in the path and expects the ones before it to exist. The <code>-p</code> flag ("parents") tells it to create every missing folder along the way, and not to complain if some already exist. That is how the lesson builds three levels in one command.</p>
<p><code>touch index.html</code> creates an empty file. (Its original job is to update a file's "last modified" time; creating the file when it is missing is a side effect everyone uses.) You can give it several names at once, and they can be paths: <code>touch index.html css/style.css</code> creates one file here and one inside <code>css</code>.</p>
<p><code>tree</code> draws the folder below you as a tree, the same shape as the diagram above. It is a great way to check your work. It is not installed on every system; on Ubuntu, <code>sudo apt install tree</code> adds it.</p>
<pre class="snip">$ tree
.
├── css
│   └── style.css
└── index.html</pre>
<p>Notice the dot at the top: <code>tree</code> is showing "this folder" and everything inside it.</p>

<h4>Copying, moving, renaming and deleting</h4>
<p>These commands all follow the same pattern: <b>source first, destination second</b>.</p>
<ul>
<li><code>cp notes.txt backup.txt</code> <b>copies</b>: afterwards both files exist.</li>
<li><code>mv notes.txt README.md</code> <b>moves</b>: the old name is gone. Moving a file to a new name in the same folder is how you <b>rename</b> on Linux; there is no separate rename command.</li>
<li><code>mv notes.txt Documents/</code> moves it into another folder and keeps its name.</li>
</ul>
<p>When the destination is a folder, the file keeps its name and goes inside. That is why <code>cp ~/notes.txt .</code> works: copy the file from your home folder into <code>.</code>, this folder, still called <code>notes.txt</code>. After that, a <code>mv</code> can give the copy a new name, while the original in your home folder stays untouched.</p>
<p><code>rm file</code> removes a file. To remove a folder and everything in it, add <code>-r</code> ("recursive", meaning it goes into every folder inside). Similarly, <code>cp -r</code> copies a whole folder.</p>
<div class="mistake"><b>Common mistake</b>Expecting a recycle bin. <code>rm</code> deletes immediately and permanently, with no "are you sure?" and no undo. Before any <code>rm -r</code>, run <code>pwd</code> and <code>ls</code> to check exactly where you are and what you are about to delete. Typing <code>rm -ri</code> makes it ask before each file.</div>
<div class="mistake"><b>Common mistake</b>Mixing up spaces. <code>cd my folder</code> gives cd two arguments, "my" and "folder". Put names with spaces in quotes, <code>cd "my folder"</code>, or better, avoid spaces in file names altogether and use dashes: <code>my-folder</code>.</div>

<h4>Reading the errors you will hit</h4>
<p>Error messages look scary but follow a pattern: the command's name, then what it tried, then why it failed. Read them slowly.</p>
<ul>
<li><code>No such file or directory</code>: the path does not exist <b>from where you are</b>. Usually you are in a different folder than you think, or there is a typo. Run <code>pwd</code> and <code>ls</code>.</li>
<li><code>mkdir: cannot create directory 'projects/site/css': No such file or directory</code>: a parent folder is missing. Use <code>mkdir -p</code>.</li>
<li><code>Not a directory</code>: you tried to <code>cd</code> into a file.</li>
<li><code>rm: cannot remove 'site': Is a directory</code>: plain <code>rm</code> only removes files. Folders need <code>-r</code>, so pause and double-check first.</li>
<li><code>command not found</code>: the shell does not know that command, often a typo such as <code>sl</code> for <code>ls</code>, or a program that is not installed.</li>
</ul>
<div class="tip"><b>Tip</b>In a real terminal, press Tab to complete a file or folder name for you; it avoids most typos. Press the Up arrow to bring back your previous commands, which also works in this sandbox.</div>

<h4>Recap</h4>
<ul>
<li>The terminal is the window; the shell (usually bash) reads your commands. A command is a name, then options starting with a dash, then arguments.</li>
<li>All files live in one tree starting at the root, <code>/</code>. Your home folder is <code>/home/you</code>, nicknamed <code>~</code>.</li>
<li><code>pwd</code> shows where you are, <code>ls -la</code> lists everything including hidden dotfiles, and <code>cd</code> moves you: <code>..</code> is up, <code>~</code> or plain <code>cd</code> is home, <code>-</code> is back.</li>
<li>Absolute paths start with <code>/</code> and work from anywhere; relative paths start from where you are. <code>.</code> means this folder.</li>
<li><code>mkdir -p</code> builds nested folders, <code>touch</code> makes empty files, <code>cp</code> copies, <code>mv</code> moves or renames, and <code>rm</code> deletes for good.</li>
</ul>
`);

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

explain('l3',`
<h4>Why on-call engineers look before they touch</h4>
<p>Sooner or later every engineer gets the message "the site is down" or "the server is slow". The tempting move is to restart things and hope. Professionals do the opposite: they look first. Linux keeps a precise record of what is running and why things failed, and a few commands let you read it.</p>
<p>This lesson gives you two problems at once, exactly like a real bad day: something is eating all the CPU (the computer's processing power), and the web server, <b>nginx</b>, has crashed. You will find the culprit, stop it, read the logs, fix the cause and prove the fix worked.</p>

<h4>Programs and processes</h4>
<p>A <b>program</b> is a file on disk, like <code>/usr/bin/node</code>. It does nothing while it sits there. When you start it, Linux loads it into memory and runs it, and that running copy is a <b>process</b>. You can start the same program several times and get several separate processes.</p>
<p>Linux gives every process a number called its <b>PID</b> (process ID). PIDs are how you point at one specific process, the way a ticket number points at one customer in a queue.</p>
<p>Two commands show you the processes:</p>
<ul>
<li><code>top</code> is a live dashboard that refreshes every few seconds, with the busiest processes at the top. Press <code>q</code> to quit. (Many people install <code>htop</code>, a friendlier version.)</li>
<li><code>ps aux</code> prints a one-off snapshot of every process. The letters are three options squashed together: <code>a</code> for all users' processes, <code>u</code> for a user-friendly layout, and <code>x</code> to include background processes that have no terminal.</li>
</ul>
<pre class="snip">USER   PID  %CPU %MEM COMMAND
root     1   0.0  0.1 /sbin/init
you   3117  99.2 45.1 node leak.js</pre>
<p>Read it column by column: who started it (<code>USER</code>), its number (<code>PID</code>), the share of CPU and memory it is using, and the command that started it. A process at 99% CPU and 45% memory is your suspect. The real output has a few more columns, but these are the ones that matter today.</p>

<h4>Stopping a process: polite and forced</h4>
<p>You stop a process by sending it a <b>signal</b>: a tiny message from the operating system to the process. The command for this is called <code>kill</code>, which is a slightly misleading name, because it can send many kinds of signal. Two matter most:</p>
<ul>
<li><code>kill 3117</code> sends <b>SIGTERM</b> (signal number 15), the default. It means "please stop". A well-behaved program finishes what it is doing, saves its work, closes its files and exits.</li>
<li><code>kill -9 3117</code> sends <b>SIGKILL</b> (signal number 9). The program never even sees this one. The Linux kernel (the core of the operating system) simply removes the process on the spot, with no chance to clean up.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="kill sends SIGTERM, which the program may obey or ignore; kill -9 sends SIGKILL, which always works">
<rect class="bx" x="10" y="14" width="130" height="40" rx="8"/><text class="t-m" x="75" y="39" text-anchor="middle">kill 3117</text>
<path class="ln" d="M140 34h70"/><polygon class="ah" points="208,28 208,40 216,34"/>
<text class="t-s" x="178" y="26" text-anchor="middle">SIGTERM</text>
<rect class="bx-info" x="218" y="14" width="192" height="40" rx="8"/><text class="t" x="314" y="39" text-anchor="middle">"please stop"</text>
<path class="ln" d="M270 54v26"/><polygon class="ah" points="264,78 276,78 270,86"/>
<path class="ln" d="M370 54v26"/><polygon class="ah" points="364,78 376,78 370,86"/>
<rect class="bx-ok" x="210" y="88" width="120" height="50" rx="8"/><text class="t-b t-ok" x="270" y="110" text-anchor="middle">cleans up</text><text class="t-s" x="270" y="128" text-anchor="middle">then exits</text>
<rect class="bx-warn" x="336" y="88" width="76" height="50" rx="8"/><text class="t-b t-warn" x="374" y="118" text-anchor="middle">ignores</text>
<path class="ln-a" d="M374 138v34"/><polygon class="ah-a" points="368,170 380,170 374,178"/>
<rect class="bx" x="10" y="180" width="130" height="40" rx="8"/><text class="t-m" x="75" y="205" text-anchor="middle">kill -9 3117</text>
<path class="ln-a" d="M140 200h70"/><polygon class="ah-a" points="208,194 208,206 216,200"/>
<text class="t-s" x="178" y="192" text-anchor="middle">SIGKILL</text>
<rect class="bx-bad" x="218" y="180" width="192" height="40" rx="8"/><text class="t-b t-bad" x="314" y="205" text-anchor="middle">removed instantly</text>
<text class="t-s" x="314" y="242" text-anchor="middle">no cleanup, cannot be ignored</text>
</svg><figcaption>A normal kill asks the process to stop. Most programs clean up and exit, but a stuck or badly written one can ignore the request. Then kill dash nine has the kernel remove it immediately, with no chance to save anything.</figcaption></figure>
<p>So the order is always: try <code>kill PID</code>, wait a moment, check again with <code>top</code> or <code>ps aux</code>, and only if it is still there, use <code>kill -9 PID</code>. The process in this lesson is stubborn on purpose, so you will need both.</p>
<p>One more you already know without realising: pressing Ctrl+C in a terminal sends <b>SIGINT</b> ("interrupt") to the program running in that terminal, which usually stops it too.</p>
<div class="mistake"><b>Common mistake</b>Reaching for <code>kill -9</code> first. A database or a program halfway through writing a file can be left with half-written, corrupted data, because SIGKILL gives it no time to finish. Always ask politely first.</div>

<h4>Services and systemd</h4>
<p>Some programs are meant to run all the time in the background, waiting for work: a web server waiting for visitors, a database waiting for queries, SSH waiting for logins. These are called <b>services</b> (or <b>daemons</b>, an old Unix word for background helpers).</p>
<p>Someone has to start them when the machine boots, restart them if they crash, and keep track of them. On almost every modern Linux system that someone is <b>systemd</b>, the very first process to start (it has PID 1). You talk to systemd with <code>systemctl</code>:</p>
<div class="tbl-wrap"><table><tr><th>Command</th><th>What it does</th></tr>
<tr><td><code>systemctl status nginx</code></td><td>Is it running? Since when? Shows the last few log lines too.</td></tr>
<tr><td><code>sudo systemctl start nginx</code></td><td>Start it now.</td></tr>
<tr><td><code>sudo systemctl stop nginx</code></td><td>Stop it now.</td></tr>
<tr><td><code>sudo systemctl restart nginx</code></td><td>Stop it and start it again, loading new settings.</td></tr>
<tr><td><code>sudo systemctl enable nginx</code></td><td>Start it automatically every time the machine boots.</td></tr></table></div>
<p>Notice the <code>sudo</code>: looking is allowed for everyone, but changing a system service needs root, as you learned in the previous lesson. Also note that <b>start</b> and <b>enable</b> are different. Start means "now"; enable means "at every boot from now on". A service can be enabled but currently failed, which is exactly the state nginx is in here.</p>
<pre class="snip">● nginx.service - A high performance web server
     Loaded: loaded (...; enabled; ...)
     Active: failed (Result: exit-code)</pre>
<p>The line to read first is <code>Active</code>. <code>active (running)</code> is healthy. <code>failed</code> means it tried to start and crashed, and <code>exit-code</code> means the program itself quit with an error.</p>

<h4>Logs: the diary that explains the failure</h4>
<p>A <b>log</b> is a running record of messages a program writes about what it is doing: started, received a request, hit an error. systemd collects the messages of every service in one place called the <b>journal</b>, and <code>journalctl</code> reads it. The <code>-u</code> option means "only this unit", where a <b>unit</b> is systemd's word for a service.</p>
<pre class="snip">journalctl -u nginx          # all of nginx's messages
journalctl -u nginx -n 20    # just the last 20 lines
journalctl -u nginx -f       # follow: keep printing new lines</pre>
<p>On a real server you may need <code>sudo</code> to read the journal. In this lesson, nginx's log contains this line:</p>
<pre class="snip">nginx: [emerg] invalid number of arguments in "listen"
directive in /etc/nginx/sites-enabled/default:2</pre>
<p>Take it apart piece by piece:</p>
<ol>
<li><code>[emerg]</code> is the severity: an emergency, so nginx refused to start at all.</li>
<li><code>invalid number of arguments in "listen" directive</code> is the problem. A <b>directive</b> is one setting in nginx's configuration, and <code>listen</code> is the one that says which port to wait on.</li>
<li><code>/etc/nginx/sites-enabled/default:2</code> is the exact file, and <code>:2</code> means line 2.</li>
</ol>
<p>Why "number of arguments"? nginx settings must end with a semicolon. Line 2 says <code>listen 80</code> with no semicolon, so nginx keeps reading onto the next line and sees <code>listen 80 root /var/www/html;</code>, which is far too many values for <code>listen</code>. The message describes the symptom; the cause is one missing character.</p>
<p>One more detail: the file in <code>sites-enabled</code> is a <b>symbolic link</b>, a shortcut that points to the real file in <code>/etc/nginx/sites-available/default</code>. Editing either name changes the same file.</p>

<h4>Fix, test, restart, verify</h4>
<p>Now you know the cause, the fix is a short, careful routine. Every step answers a question before you move on.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Six steps: status, logs, fix, test, restart, check">
<rect class="bx-info" x="10" y="14" width="120" height="58" rx="8"/><text class="t-b" x="70" y="38" text-anchor="middle">1 status</text><text class="t-s" x="70" y="58" text-anchor="middle">is it running?</text>
<rect class="bx-info" x="150" y="14" width="120" height="58" rx="8"/><text class="t-b" x="210" y="38" text-anchor="middle">2 logs</text><text class="t-s" x="210" y="58" text-anchor="middle">why did it fail?</text>
<rect class="bx-a" x="290" y="14" width="120" height="58" rx="8"/><text class="t-b" x="350" y="38" text-anchor="middle">3 fix</text><text class="t-s" x="350" y="58" text-anchor="middle">edit the config</text>
<path class="ln" d="M130 43h12"/><polygon class="ah" points="141,37 141,49 149,43"/>
<path class="ln" d="M270 43h12"/><polygon class="ah" points="281,37 281,49 289,43"/>
<path class="ln" d="M350 72v34"/><polygon class="ah" points="344,104 356,104 350,112"/>
<rect class="bx-warn" x="290" y="114" width="120" height="58" rx="8"/><text class="t-b" x="350" y="138" text-anchor="middle">4 test</text><text class="t-s" x="350" y="158" text-anchor="middle">nginx -t</text>
<rect class="bx-ok" x="150" y="114" width="120" height="58" rx="8"/><text class="t-b" x="210" y="138" text-anchor="middle">5 restart</text><text class="t-s" x="210" y="158" text-anchor="middle">apply the fix</text>
<rect class="bx-ok" x="10" y="114" width="120" height="58" rx="8"/><text class="t-b" x="70" y="138" text-anchor="middle">6 check</text><text class="t-s" x="70" y="158" text-anchor="middle">curl localhost</text>
<path class="ln" d="M290 143h-12"/><polygon class="ah" points="279,137 279,149 271,143"/>
<path class="ln" d="M150 143h-12"/><polygon class="ah" points="139,137 139,149 131,143"/>
<text class="t-s" x="210" y="194" text-anchor="middle">if the test fails, go back to step 3</text>
</svg><figcaption>The on-call routine. Check the status, read the logs, fix the config, test it, and only then restart and check that the site really answers. If the test step fails, you go back and fix again before restarting anything.</figcaption></figure>
<ol>
<li><b>Edit.</b> The file lives under <code>/etc</code>, which belongs to root, so open it with <code>sudo nano /etc/nginx/sites-available/default</code>. <code>nano</code> is a simple text editor that runs inside the terminal. In a real terminal you save with Ctrl+O then Enter, and exit with Ctrl+X.</li>
<li><b>Test.</b> <code>sudo nginx -t</code> checks the configuration without touching the running server. On success it prints <code>syntax is ok</code> and <code>test is successful</code>. If you made a new typo, it names the file and line, just like the log did.</li>
<li><b>Restart.</b> <code>sudo systemctl restart nginx</code>. Then <code>systemctl status nginx</code> should say <code>active (running)</code>.</li>
<li><b>Verify.</b> <code>curl localhost</code>. <code>curl</code> fetches a web address and prints what comes back, and <code>localhost</code> is the name every computer uses for itself. If you see the page's HTML, real visitors will too.</li>
</ol>
<div class="mistake"><b>Common mistake</b>Restarting a service with an untested config. If the new file is broken, the restart takes down a server that was still working. <code>nginx -t</code> takes one second and catches it first.</div>
<div class="try"><b>Try it in your head</b>A service shows <code>Active: failed</code> and the journal says <code>unexpected "}" in /etc/nginx/sites-enabled/default:5</code>. What do you do? Open that file, look around line 5 (often the real mistake is just before it, such as a missing semicolon), fix it, run <code>sudo nginx -t</code>, and restart only when the test passes.</div>

<h4>Recap</h4>
<ul>
<li>A process is a running program with a PID. <code>top</code> shows a live view; <code>ps aux</code> takes a snapshot.</li>
<li><code>kill PID</code> sends SIGTERM, a polite request. <code>kill -9 PID</code> sends SIGKILL, which cannot be ignored but gives no cleanup, so use it last.</li>
<li>systemd runs services. <code>systemctl status</code> looks; <code>start</code>, <code>stop</code>, <code>restart</code> and <code>enable</code> change things and need sudo.</li>
<li><code>journalctl -u nginx</code> shows a service's logs, which usually name the exact file and line that broke.</li>
<li>Fix, test with <code>nginx -t</code>, restart, then verify with <code>curl</code>.</li>
</ul>
`);

explain('l4',`
<h4>Why small tools beat one big tool</h4>
<p>A busy web server writes a line to its <b>access log</b> for every single request: who asked, when, for which page, and whether it worked. That is millions of lines a day, far too many to read or even open in a normal editor. Yet on-call engineers answer questions like "how many errors did we serve?" or "which address is hammering us?" in seconds.</p>
<p>They do it with the <b>Unix philosophy</b>: lots of small commands that each do one job well, plus a way to connect them. One tool finds lines, another counts them, another sorts them. None of them is clever alone, but chained together they answer almost any question about a text file.</p>
<p>You are in <code>~/logs</code> with three files: <code>access.log</code> from a web server, <code>app.log</code> from an application, and <code>.env</code>, a settings file. (The dot at the start makes it hidden, so use <code>ls -a</code> to see it.)</p>

<h4>Input, output and the pipe</h4>
<p>Most Linux commands work on <b>text, one line at a time</b>. They read lines in, do something, and write lines out. The lines they write are called <b>standard output</b>, and by default they go to your screen. The lines a command reads can come from a file you name, or from <b>standard input</b>: whatever is fed into it.</p>
<p>The <b>pipe</b>, the vertical bar <code>|</code>, connects the two. In <code>cmd1 | cmd2</code>, everything <code>cmd1</code> would have printed goes straight into <code>cmd2</code> as its input instead. Only the last command in the chain prints to your screen.</p>
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="grep reads app.log, the pipe feeds its output into wc -l, which prints a number">
<rect class="bx-info" x="10" y="20" width="90" height="44" rx="14"/><text class="t-m" x="55" y="47" text-anchor="middle">app.log</text>
<path class="ln" d="M100 42h18"/><polygon class="ah" points="117,36 117,48 125,42"/>
<rect class="bx" x="127" y="20" width="120" height="44" rx="8"/><text class="t-m" x="187" y="47" text-anchor="middle">grep ERROR</text>
<path class="ln-a" d="M247 42h30"/><polygon class="ah-a" points="276,36 276,48 284,42"/>
<text class="t-s t-a" x="265" y="14" text-anchor="middle">pipe</text>
<rect class="bx" x="286" y="20" width="80" height="44" rx="8"/><text class="t-m" x="326" y="47" text-anchor="middle">wc -l</text>
<path class="ln" d="M366 42h16"/><polygon class="ah" points="381,36 381,48 389,42"/>
<text class="t-b" x="404" y="48" text-anchor="middle">3</text>
<text class="t-s" x="187" y="90" text-anchor="middle">3 ERROR lines</text>
<text class="t-s" x="326" y="90" text-anchor="middle">counts them</text>
<text class="t-s" x="55" y="90" text-anchor="middle">8 lines</text>
<rect class="bx-dark" x="10" y="112" width="400" height="44" rx="6"/>
<text class="t-term" x="24" y="139">grep ERROR app.log | wc -l</text>
</svg><figcaption>A pipe as an assembly line. grep reads the 8 lines of app.log and passes on only the 3 that contain ERROR. The pipe feeds those 3 lines into wc dash l, which counts them and prints 3.</figcaption></figure>
<p>Two cousins of the pipe are worth knowing now, because they look similar:</p>
<ul>
<li><code>cmd &gt; file</code> sends the output into a file instead of the screen, replacing what was in it. <code>&gt;&gt;</code> adds to the end instead.</li>
<li><code>cmd1 &amp;&amp; cmd2</code> runs <code>cmd2</code> only if <code>cmd1</code> succeeded. Nothing flows between them.</li>
</ul>

<h4>Finding lines with <code>grep</code></h4>
<p><code>grep</code> prints every line that contains a pattern. <code>grep ERROR app.log</code> shows only the error lines. It is case-sensitive, so <code>error</code> would not match <code>ERROR</code>. Its most useful options:</p>
<div class="tbl-wrap"><table><tr><th>Option</th><th>Meaning</th></tr>
<tr><td><code>-c</code></td><td>Count the matching lines instead of printing them</td></tr>
<tr><td><code>-i</code></td><td>Ignore case: ERROR, Error and error all match</td></tr>
<tr><td><code>-v</code></td><td>Invert: print the lines that do <i>not</i> match</td></tr>
<tr><td><code>-n</code></td><td>Show the line number next to each match</td></tr>
<tr><td><code>-r</code></td><td>Search every file in a folder and its subfolders</td></tr></table></div>
<p>Now the access log. To count server errors you look for the status code <code>500</code>, but there is a trap: a plain <code>grep 500</code> also matches any line where "500" appears inside another number, such as a size of 1500 bytes. Searching for <code>' 500 '</code>, with a space on each side, only matches 500 standing alone as its own word in the line.</p>
<p>The quotes matter. You learned that spaces separate the parts of a command. Without quotes, the shell would throw away those spaces. Single quotes say "pass this exactly as written, spaces and all".</p>

<h4>Counting and ordering: <code>wc</code>, <code>sort</code>, <code>uniq</code>, <code>head</code></h4>
<ul>
<li><code>wc -l access.log</code> counts lines ("word count", but <code>-l</code> asks for lines). One request per line means it counts requests.</li>
<li><code>sort</code> puts lines in alphabetical order. <code>sort -n</code> sorts by number value, and <code>-r</code> reverses, so <code>sort -rn</code> puts the biggest number first.</li>
<li><code>uniq -c</code> collapses runs of identical lines into one and writes the count in front. It only merges lines that are <b>next to each other</b>, which is why it almost always comes after a <code>sort</code>.</li>
<li><code>head -3</code> keeps only the first 3 lines. (<code>tail</code> keeps the last ones.)</li>
</ul>
<p>Why <code>-n</code>? Plain <code>sort</code> compares text character by character, so it puts "10" before "9" (because "1" comes before "9"). With <code>-n</code> it compares the actual numbers.</p>

<h4>Picking columns with <code>awk</code></h4>
<p><code>awk</code> is a small programming language, but 90% of everyday use is one trick: it splits each line into <b>fields</b> wherever there are spaces, and numbers them <code>$1</code>, <code>$2</code>, <code>$3</code> and so on. <code>awk '{print $1}'</code> prints just the first field of every line.</p>
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="One access log line split by awk into ten numbered fields">
<g text-anchor="middle">
<rect class="bx-a" x="14" y="24" width="110" height="34" rx="6"/><text class="t-m" x="69" y="46">203.0.113.9</text><text class="t-s t-a" x="69" y="17">$1</text>
<rect class="bx" x="132" y="24" width="34" height="34" rx="6"/><text class="t-m" x="149" y="46">-</text><text class="t-s" x="149" y="17">$2</text>
<rect class="bx" x="174" y="24" width="34" height="34" rx="6"/><text class="t-m" x="191" y="46">-</text><text class="t-s" x="191" y="17">$3</text>
<rect class="bx" x="216" y="24" width="96" height="34" rx="6"/><text class="t-m" x="264" y="46">[09/Oct…</text><text class="t-s" x="264" y="17">$4</text>
<rect class="bx" x="320" y="24" width="80" height="34" rx="6"/><text class="t-m" x="360" y="46">+0000]</text><text class="t-s" x="360" y="17">$5</text>
<rect class="bx" x="14" y="92" width="60" height="34" rx="6"/><text class="t-m" x="44" y="114">"GET</text><text class="t-s" x="44" y="85">$6</text>
<rect class="bx" x="82" y="92" width="34" height="34" rx="6"/><text class="t-m" x="99" y="114">/</text><text class="t-s" x="99" y="85">$7</text>
<rect class="bx" x="124" y="92" width="104" height="34" rx="6"/><text class="t-m" x="176" y="114">HTTP/1.1"</text><text class="t-s" x="176" y="85">$8</text>
<rect class="bx-a" x="236" y="92" width="60" height="34" rx="6"/><text class="t-m" x="266" y="114">200</text><text class="t-s t-a" x="266" y="85">$9</text>
<rect class="bx" x="304" y="92" width="60" height="34" rx="6"/><text class="t-m" x="334" y="114">512</text><text class="t-s" x="334" y="85">$10</text>
<text class="t-s" x="210" y="156">IP address is $1, status code is $9</text>
</g>
</svg><figcaption>One line of the access log, split wherever there is a space. The visitor's address is field one and the status code is field nine. The date contains a space, so it lands in two fields, four and five.</figcaption></figure>
<p>The single quotes around <code>'{print $1}'</code> are essential. Without them, the shell would see <code>$1</code>, think it is one of its own variables, and replace it before awk ever saw it.</p>
<p>For files that use another separator, <code>-F</code> sets it. In <code>.env</code> the lines look like <code>PORT=3000</code>, so <code>awk -F= '{print $1}' .env</code> prints just the setting names.</p>

<h4>Worked example: the top 3 visitors</h4>
<p>Now combine everything to answer "which IP addresses made the most requests?". Build it one stage at a time, running the command after each addition so you see what each step does:</p>
<figure class="fig"><svg viewBox="0 0 420 290" role="img" aria-label="How data changes through awk, sort, uniq -c, sort -rn and head">
<text class="t-s" x="300" y="16" text-anchor="middle">what comes out</text>
<rect class="bx" x="10" y="26" width="170" height="40" rx="8"/><text class="t-m" x="95" y="51" text-anchor="middle">awk '{print $1}'</text>
<text class="t-m" x="300" y="51" text-anchor="middle">B A B C B</text>
<rect class="bx" x="10" y="84" width="170" height="40" rx="8"/><text class="t-m" x="95" y="109" text-anchor="middle">sort</text>
<text class="t-m" x="300" y="109" text-anchor="middle">A B B B C</text>
<rect class="bx" x="10" y="142" width="170" height="40" rx="8"/><text class="t-m" x="95" y="167" text-anchor="middle">uniq -c</text>
<text class="t-m" x="300" y="167" text-anchor="middle">1 A, 3 B, 1 C</text>
<rect class="bx" x="10" y="200" width="170" height="40" rx="8"/><text class="t-m" x="95" y="225" text-anchor="middle">sort -rn</text>
<text class="t-m" x="300" y="225" text-anchor="middle">3 B, 1 A, 1 C</text>
<rect class="bx-a" x="10" y="248" width="170" height="36" rx="8"/><text class="t-m" x="95" y="271" text-anchor="middle">head -1</text>
<text class="t-b t-a" x="300" y="271" text-anchor="middle">3 B</text>
<path class="ln-a" d="M95 66v18M95 124v18M95 182v18M95 240v8"/>
</svg><figcaption>Five stages joined by pipes. Letters stand in for IP addresses. awk pulls out the addresses, sort groups identical ones together, uniq dash c counts each group, sort dash r n puts the biggest count first, and head keeps the top. The lesson uses head dash 3 to keep three.</figcaption></figure>
<ol>
<li><code>awk '{print $1}' access.log</code>: one IP per request, in the order they arrived.</li>
<li><code>... | sort</code>: identical IPs are now next to each other.</li>
<li><code>... | uniq -c</code>: one line per IP, with its request count in front.</li>
<li><code>... | sort -rn</code>: biggest count first. The count is the first thing on each line, which is why a numeric sort works here.</li>
<li><code>... | head -3</code>: the top three.</li>
</ol>
<p>This exact pattern works for any column: swap <code>$1</code> for <code>$9</code> and you get a count of each status code, or <code>$7</code> for the most requested pages.</p>

<h4>Replacing text with <code>sed</code></h4>
<p><code>sed</code> ("stream editor") changes text as it flows past. Its most common command is <b>substitute</b>, written <code>s/old/new/</code>: the slashes separate the three parts.</p>
<pre class="snip">sed 's/DEBUG=true/DEBUG=false/' .env      # prints a changed copy
sed -i 's/DEBUG=true/DEBUG=false/' .env   # changes the file itself
sed -i 's/a/b/g' notes.txt                # g: every match on a line</pre>
<p>Without <code>-i</code>, sed only prints the result and leaves the file alone, which makes it a safe preview. <code>-i</code> means "in place": it rewrites the file. Without the <code>g</code> at the end, only the first match on each line is replaced. Afterwards, <code>cat .env</code> shows the file so you can confirm the change.</p>
<div class="tip"><b>Tip</b>Run the sed command once without <code>-i</code>, check the output looks right, then press the Up arrow, add <code>-i</code> and run it for real. On a Mac, the built-in sed needs <code>-i ''</code> instead of plain <code>-i</code>.</div>
<div class="mistake"><b>Common mistake</b>Redirecting a command back into the file it is reading, like <code>sort access.log &gt; access.log</code>. The shell empties the file <i>before</i> sort starts reading it, so you are left with an empty file. Write to a new file instead, or use a tool's own in-place option such as <code>sed -i</code>.</div>

<h4>Reading what goes wrong</h4>
<ul>
<li>A command that just sits there with no prompt is usually waiting for input, because you forgot the file name. Press Ctrl+C to stop it.</li>
<li><code>grep</code> printing nothing is not an error: there were simply no matches. Check the case, or try <code>-i</code>.</li>
<li><code>awk</code> printing blank lines means the field number is bigger than the number of fields on that line.</li>
<li><code>uniq -c</code> showing the same value several times means you forgot to <code>sort</code> first.</li>
</ul>
<div class="try"><b>Try it in your head</b>What does <code>grep -v INFO app.log | wc -l</code> print? <code>-v</code> keeps the lines that do not contain INFO, so the WARN and ERROR lines go through, and <code>wc -l</code> counts them. app.log has 8 lines and 3 are INFO, so it prints 5.</div>

<h4>Recap</h4>
<ul>
<li>The pipe <code>|</code> feeds one command's output into the next command's input. <code>&gt;</code> writes to a file and <code>&amp;&amp;</code> runs the next command only on success.</li>
<li><code>grep</code> finds lines: <code>-c</code> counts, <code>-i</code> ignores case, <code>-v</code> inverts, <code>-r</code> searches folders.</li>
<li><code>wc -l</code> counts lines; <code>sort | uniq -c | sort -rn | head</code> is the classic "top N" recipe.</li>
<li><code>awk '{print $1}'</code> picks a column; keep it in single quotes.</li>
<li><code>sed 's/old/new/'</code> previews a replacement and <code>sed -i</code> edits the file in place.</li>
</ul>
`);

explain('l5',`
<h4>Why write scripts at all</h4>
<p>By now you can do a lot by typing commands one at a time. But some jobs you do again and again: back up some files, clean old logs, deploy a site. Typing the same eight commands every day is slow, and sooner or later you will skip one or make a typo.</p>
<p>A <b>script</b> is simply those commands saved in a file, so the computer can run them for you, the same way every time. A <b>Bash script</b> is one written for the bash shell, so everything you already type at the prompt works in it. And once a job is a script, a scheduler called <b>cron</b> can run it automatically, at 2 o'clock in the morning, while you sleep.</p>
<p>In this lesson you build <code>backup.sh</code>, which copies every <code>.txt</code> file into a folder named after today's date, and skips the work if today's backup already exists.</p>

<h4>A script is a text file with a first line and a permission</h4>
<p>Two things turn a plain text file into a runnable script.</p>
<p><b>1. The shebang line.</b> The very first line must be <code>#!/bin/bash</code>. The two characters <code>#!</code> are called "shebang" (from "hash" and "bang"). They tell Linux which program should read the rest of the file: here, the bash program in <code>/bin</code>. Everywhere else in the script, a <code>#</code> starts a <b>comment</b>, a note for humans that bash ignores.</p>
<p><b>2. The execute permission.</b> As you saw in the permissions lesson, a file needs <code>x</code> before it can be run, so you use <code>chmod +x backup.sh</code> once.</p>
<p>Then you run it with <code>./backup.sh</code>. Why the <code>./</code>? When you type a bare name like <code>ls</code>, the shell only looks for it in a short list of system folders (that list is called the <b>PATH</b>). Your current folder is deliberately not on that list, so you give the script's path: <code>./</code> means "the file in this folder".</p>

<h4>Variables and <code>$(...)</code></h4>
<p>A <b>variable</b> is a name that holds a value, so you can write the value once and reuse it. You create one with <code>NAME=value</code> and read it back with a dollar sign: <code>$NAME</code>.</p>
<pre class="snip">GREETING="hello"        # no spaces around =
echo "$GREETING world"   # prints: hello world</pre>
<p>Bash is strict about the spaces here. <code>GREETING = "hello"</code> with spaces makes bash think you are running a command called <code>GREETING</code>, and you get <code>command not found</code>.</p>
<p>Next, <b>command substitution</b>: <code>$(command)</code> runs a command and drops its output into that spot. The date command can print the date in many formats, and <code>date +%F</code> prints it as year-month-day, such as <code>2026-10-09</code>. Combine the two and you get a folder name that changes every day:</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="DEST is built by running date and pasting its output into the text">
<rect class="bx-dark" x="10" y="12" width="400" height="40" rx="6"/>
<text class="t-term" x="210" y="38" text-anchor="middle">DEST="backup-$(date +%F)"</text>
<path class="ln" d="M210 52v20"/><polygon class="ah" points="204,70 216,70 210,78"/>
<rect class="bx-info" x="60" y="80" width="300" height="40" rx="8"/>
<text class="t" x="210" y="105" text-anchor="middle">1. run <tspan class="t-m">date +%F</tspan>, get <tspan class="t-m">2026-10-09</tspan></text>
<path class="ln" d="M210 120v20"/><polygon class="ah" points="204,138 216,138 210,146"/>
<rect class="bx-ok" x="60" y="148" width="300" height="40" rx="8"/>
<text class="t" x="210" y="173" text-anchor="middle">2. DEST = <tspan class="t-m t-ok">backup-2026-10-09</tspan></text>
</svg><figcaption>Bash first runs the command inside the dollar brackets, date plus percent F, which prints today's date. It pastes that text in place, so DEST holds backup, dash, then the date.</figcaption></figure>
<p>Always use variables inside double quotes: <code>"$DEST"</code>, not <code>$DEST</code>. Without quotes, bash splits the value at every space. A file called <code>my notes.txt</code> would become two arguments, <code>my</code> and <code>notes.txt</code>, and the command would fail or, worse, act on the wrong files. Double quotes keep the value in one piece and still let <code>$</code> work. (Single quotes, as you saw with awk, switch <code>$</code> off entirely.)</p>

<h4>Exit codes, <code>if</code> and <code>set -e</code></h4>
<p>Every command finishes with a number called its <b>exit code</b>. <code>0</code> means success; anything else means some kind of failure. You never see it unless you ask (<code>echo $?</code> prints the last one), but scripts use it all the time to make decisions.</p>
<p><code>if</code> runs a command and checks its exit code. The command is usually a <b>test</b>, written in square brackets:</p>
<pre class="snip">if [ -d "$DEST" ]; then        # -d: does this folder exist?
  echo "Already backed up today"
  exit 0                       # stop the script: success
fi                             # "if" backwards ends the block</pre>
<p>Useful tests: <code>-d</code> is "is a directory", <code>-f</code> is "is a regular file" and <code>-e</code> is "exists at all". The spaces just inside the brackets are required, because <code>[</code> is actually a command and its parts need spaces between them, like any command's. <code>exit 0</code> ends the whole script and reports success, because "already done" is not an error.</p>
<p>Now <code>set -e</code>. Normally, when a command in a script fails, bash prints the error and carries on with the next line. Imagine a script that copies files and then deletes the originals: if the copy fails and the script carries on, you lose the files. <code>set -e</code> near the top says "if any command fails, stop the script right there". That turns a silent disaster into a clear error message.</p>

<h4>Loops: <code>for f in *.txt</code></h4>
<p>A <b>loop</b> repeats the same steps for each item in a list. The list here comes from <code>*.txt</code>. The <code>*</code> is a <b>wildcard</b> meaning "any characters", and before the loop runs, the shell replaces <code>*.txt</code> with every matching file name in the folder: <code>a.txt b.txt c.txt</code>.</p>
<pre class="snip">for f in *.txt; do
  cp "$f" "$DEST/"
  echo "Backed up $f"
done</pre>
<p>Trace it by hand. On the first turn, <code>f</code> holds <code>a.txt</code>, so bash runs <code>cp "a.txt" "backup-2026-10-09/"</code> and prints <code>Backed up a.txt</code>. Then <code>f</code> becomes <code>b.txt</code> and the two lines run again, then <code>c.txt</code>. After the last item, the loop ends at <code>done</code>. The name <code>f</code> is your choice; <code>file</code> would work just as well.</p>

<h4>Worked example: the whole backup script</h4>
<p>Put the pieces together in order and you have the lesson's script: shebang, <code>set -e</code>, the <code>DEST</code> variable, the "already done?" check, <code>mkdir -p "$DEST"</code>, the loop, and a final <code>echo "Done"</code>. Here is the path bash takes through it:</p>
<figure class="fig"><svg viewBox="0 0 420 300" role="img" aria-label="Flow of backup.sh: build the name, check the folder, then either stop or copy every file">
<rect class="bx" x="40" y="10" width="200" height="38" rx="8"/><text class="t" x="140" y="34" text-anchor="middle">set DEST to today</text>
<path class="ln" d="M140 48v16"/><polygon class="ah" points="134,62 146,62 140,70"/>
<rect class="bx-warn" x="40" y="72" width="200" height="40" rx="8"/><text class="t" x="140" y="97" text-anchor="middle">folder exists?</text>
<path class="ln-a" d="M240 92h36"/><polygon class="ah-a" points="274,86 274,98 282,92"/>
<text class="t-s t-a" x="258" y="84" text-anchor="middle">yes</text>
<rect class="bx-a" x="284" y="66" width="126" height="52" rx="8"/><text class="t-s" x="347" y="88" text-anchor="middle">"Already backed</text><text class="t-s" x="347" y="106" text-anchor="middle">up", exit 0</text>
<path class="ln" d="M140 112v20"/><polygon class="ah" points="134,130 146,130 140,138"/>
<text class="t-s" x="152" y="128">no</text>
<rect class="bx" x="40" y="140" width="200" height="38" rx="8"/><text class="t-m" x="140" y="164" text-anchor="middle">mkdir -p "$DEST"</text>
<path class="ln" d="M140 178v16"/><polygon class="ah" points="134,192 146,192 140,200"/>
<rect class="bx-info" x="40" y="202" width="200" height="38" rx="8"/><text class="t" x="140" y="226" text-anchor="middle">copy next .txt</text>
<path class="ln-a" d="M240 211h26v18h-18" fill="none"/><polygon class="ah-a" points="249,223 249,235 241,229"/>
<text class="t-s t-a" x="276" y="225">once per file</text>
<path class="ln" d="M140 240v16"/><polygon class="ah" points="134,254 146,254 140,262"/>
<rect class="bx-ok" x="40" y="264" width="200" height="32" rx="8"/><text class="t" x="140" y="285" text-anchor="middle">echo "Done"</text>
</svg><figcaption>The script works out today's folder name, then checks whether that folder already exists. If it does, it prints a message and exits. If not, it creates the folder, copies each text file into it one by one, and prints Done.</figcaption></figure>
<p>That check is what makes the script safe to run twice. The first run creates the folder and copies three files. The second run finds the folder and stops politely. A job that gives the same result however many times you run it is called <b>idempotent</b>, and it is exactly the property you want for anything a scheduler might run more than once.</p>

<h4>Scheduling with cron</h4>
<p><b>cron</b> is a service that wakes up every minute, looks at everyone's schedules, and runs whatever is due. Your personal schedule is called your <b>crontab</b> ("cron table"):</p>
<ul>
<li><code>crontab -e</code> opens your crontab in an editor so you can add lines.</li>
<li><code>crontab -l</code> lists what is currently scheduled.</li>
</ul>
<p>Each line is five time fields followed by the command to run. A <code>*</code> means "every".</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="The five cron fields: minute, hour, day of month, month, day of week">
<g text-anchor="middle">
<rect class="bx-a" x="15" y="12" width="66" height="44" rx="6"/><text class="t-m" x="48" y="41" style="font-size:20px">0</text>
<rect class="bx-a" x="95" y="12" width="66" height="44" rx="6"/><text class="t-m" x="128" y="41" style="font-size:20px">2</text>
<rect class="bx" x="175" y="12" width="66" height="44" rx="6"/><text class="t-m" x="208" y="41" style="font-size:20px">*</text>
<rect class="bx" x="255" y="12" width="66" height="44" rx="6"/><text class="t-m" x="288" y="41" style="font-size:20px">*</text>
<rect class="bx" x="335" y="12" width="66" height="44" rx="6"/><text class="t-m" x="368" y="41" style="font-size:20px">*</text>
<text class="t-b" x="48" y="80">minute</text><text class="t-b" x="128" y="80">hour</text><text class="t-b" x="208" y="80">day</text><text class="t-b" x="288" y="80">month</text><text class="t-b" x="368" y="80">weekday</text>
<text class="t-s" x="48" y="100">0-59</text><text class="t-s" x="128" y="100">0-23</text><text class="t-s" x="208" y="100">1-31</text><text class="t-s" x="288" y="100">1-12</text><text class="t-s" x="368" y="100">0-6, Sun 0</text>
<text class="t-s t-a" x="48" y="124">at :00</text><text class="t-s t-a" x="128" y="124">at 2am</text><text class="t-s" x="208" y="124">every</text><text class="t-s" x="288" y="124">every</text><text class="t-s" x="368" y="124">every</text>
<line class="ln-d" x1="15" y1="142" x2="405" y2="142"/>
<text class="t" x="210" y="172">runs every day at 02:00</text>
</g>
</svg><figcaption>A cron line has five time fields, in the order minute, hour, day of the month, month and day of the week. Zero two star star star means minute zero of hour two, on every day of every month, whatever the weekday: every night at 2 a.m.</figcaption></figure>
<p>A few more patterns: <code>30 9 * * 1</code> is 09:30 every Monday. <code>*/15 * * * *</code> means every 15 minutes: the slash means "every so many". <code>0 0 1 * *</code> is midnight on the first of each month. Sites such as crontab.guru translate a line into plain English, which is a great way to check yourself.</p>
<div class="mistake"><b>Common mistake</b>Using relative paths in cron. cron does not start in the folder you were in when you wrote the line; it usually starts in your home folder, with a very short PATH. Always give the full path to the script, like <code>/home/you/docs/backup.sh</code>. Inside a script that cron will run, it is also wise to <code>cd</code> to the right folder first, because <code>*.txt</code> is matched against whatever the current folder is.</div>
<div class="tip"><b>Tip</b>cron has no screen to print to, so output from scheduled jobs is mailed to you or thrown away. Adding <code>&gt;&gt; /home/you/backup.log 2&gt;&amp;1</code> to the end of a cron line saves both normal output and error messages to a log file you can read later.</div>

<h4>Reading script errors</h4>
<ul>
<li><code>Permission denied</code> when running <code>./backup.sh</code>: you forgot <code>chmod +x</code>.</li>
<li><code>DEST: command not found</code>: spaces around the <code>=</code> in a variable.</li>
<li><code>[: missing \`]'</code>: a missing space before the closing bracket, as in <code>[ -d "$DEST"]</code>.</li>
<li><code>syntax error near unexpected token</code>: a missing <code>then</code>, <code>do</code>, <code>fi</code> or <code>done</code>, or a missing <code>;</code> before <code>then</code> or <code>do</code> when they are on the same line.</li>
</ul>
<div class="try"><b>Try it in your head</b>When does <code>0 18 * * 5</code> run? Minute 0, hour 18, any day of the month, any month, weekday 5. Counting from Sunday as 0, 5 is Friday, so it runs every Friday at 6 p.m.</div>

<h4>Recap</h4>
<ul>
<li>A script starts with <code>#!/bin/bash</code>, needs <code>chmod +x</code>, and runs with <code>./script.sh</code>.</li>
<li>Set variables with <code>NAME=value</code> (no spaces), use them as <code>"$NAME"</code>, and capture output with <code>$(command)</code>.</li>
<li><code>if [ -d "$DIR" ]; then ... fi</code> makes decisions; <code>for f in *.txt; do ... done</code> repeats steps for each file.</li>
<li><code>set -e</code> stops the script at the first failing command instead of carrying on broken.</li>
<li><code>crontab -e</code> schedules jobs with five fields: minute, hour, day of month, month, weekday. Use full paths.</li>
</ul>
`);

explain('l6',`
<h4>Why SSH exists</h4>
<p>The servers that run websites sit in data centres, often in another country. You will never touch their keyboard. Instead you open a terminal on your laptop and send commands across the internet, and the server sends the results back. That only works safely if nobody in between can read or change what you send, including your password.</p>
<p><b>SSH</b>, short for Secure Shell, does exactly that. It gives you a shell on a remote computer, and it <b>encrypts</b> everything: it scrambles the traffic so that only your laptop and the server can unscramble it. Almost every Linux server in the world is managed this way.</p>
<p>To connect you need two things: a <b>user</b> on the server, and the server's <b>address</b>. Here the address is an <b>IP address</b>, <code>203.0.113.20</code>, the numeric address computers use to find each other on a network. You write them together as <code>user@host</code>: <code>deploy@203.0.113.20</code> means "the user deploy on that machine".</p>

<h4>Why keys beat passwords</h4>
<p>You could log in with a password, but any server on the internet is attacked around the clock by automated programs trying common passwords, thousands of times an hour. A short or reused password will eventually fall.</p>
<p>SSH keys solve this. A <b>key pair</b> is two files that are created together and belong together:</p>
<ul>
<li>The <b>private key</b> stays on your laptop and is never shared. It can produce a <b>signature</b>: a block of data that only this exact key could have made.</li>
<li>The <b>public key</b> can be given to anyone. It cannot make signatures; it can only check whether a signature came from its private partner.</li>
</ul>
<p>So you put your public key on the server. When you log in, your laptop proves it holds the private key by signing, and the server checks the signature with the public key. The private key itself never leaves your laptop, so there is nothing to steal on the way, and there is no password for bots to guess. Working out a private key from its public key is not practically possible with today's computers.</p>
<div class="analogy"><b>Think of it like</b>A wax seal. Only you own the seal (the private key), but anyone with a picture of its pattern (the public key) can check that a letter was really sealed by you. Handing out the picture does not let anyone make the seal.</div>

<h4>Creating a key pair: <code>ssh-keygen</code></h4>
<pre class="snip">ssh-keygen -t ed25519 -C "you@example.com"</pre>
<p><code>-t ed25519</code> picks the <b>type</b> of key. Ed25519 is the modern default: fast, very secure and short. You will still see older <code>rsa</code> keys around. <code>-C</code> adds a <b>comment</b>, a label stored in the public key so you can later tell which key belongs to which laptop. An email address is the usual choice, but any text works.</p>
<p>The command then asks two questions. Pressing Enter accepts the defaults:</p>
<ol>
<li><b>Where to save it.</b> The default is <code>~/.ssh/id_ed25519</code>. The <code>.ssh</code> folder in your home is where SSH keeps everything.</li>
<li><b>A passphrase.</b> This is an optional password that encrypts the private key file itself, so a stolen laptop does not mean a stolen key. In the sandbox, leave it empty. On your real laptop, setting one is a good idea.</li>
</ol>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="The private key stays on the laptop; ssh-copy-id puts the public key into authorized_keys on the server">
<rect class="bx" x="10" y="10" width="180" height="180" rx="10"/><text class="t-b" x="100" y="36" text-anchor="middle">your laptop</text>
<rect class="bx-bad" x="22" y="52" width="156" height="54" rx="8"/><text class="t-m" x="100" y="75" text-anchor="middle">id_ed25519</text><text class="t-s t-bad" x="100" y="95" text-anchor="middle">private, never share</text>
<rect class="bx-ok" x="22" y="120" width="156" height="54" rx="8"/><text class="t-m" x="100" y="143" text-anchor="middle">id_ed25519.pub</text><text class="t-s t-ok" x="100" y="163" text-anchor="middle">public, share it</text>
<rect class="bx" x="230" y="10" width="180" height="180" rx="10"/><text class="t-b" x="320" y="36" text-anchor="middle">server web1</text>
<rect class="bx-ok" x="236" y="104" width="168" height="70" rx="8"/><text class="t-m" x="320" y="128" text-anchor="middle">authorized_keys</text><text class="t-s" x="320" y="148" text-anchor="middle">one public key</text><text class="t-s" x="320" y="164" text-anchor="middle">per line</text>
<text class="t-s" x="320" y="66" text-anchor="middle">/home/deploy/.ssh/</text>
<path class="ln-ok" d="M178 147h56"/><polygon class="ah-ok" points="232,141 232,153 240,147"/>
<text class="t-s" x="210" y="214" text-anchor="middle">ssh-copy-id copies only the public key</text>
</svg><figcaption>The private key never leaves your laptop. ssh-copy-id copies only the public key, and adds it as a new line in the authorized keys file inside the deploy user's dot-ssh folder on the server.</figcaption></figure>

<h4>Installing your public key: <code>ssh-copy-id</code></h4>
<p>The server decides who may log in with a key by reading one file: <code>~/.ssh/authorized_keys</code> in the home folder of the user you log in as. Each line in it is one public key that is allowed in.</p>
<p><code>ssh-copy-id deploy@203.0.113.20</code> adds your public key to that file for you. It has to log in to do so, which is why it asks for the deploy user's password <b>one last time</b>. (In the sandbox, any password works.) It adds your key as a new line and leaves the existing ones alone, which matters here: the server already trusts a <code>work@laptop</code> key, and that line stays.</p>
<p>The very first time you connect to any server, SSH also shows the server's <b>fingerprint</b> (a short summary of the server's own key) and asks <code>Are you sure you want to continue connecting (yes/no/[fingerprint])?</code>. This protects you in the other direction: it lets you check that you are talking to the real server, not an impostor. Type <code>yes</code>, and SSH remembers the server in <code>~/.ssh/known_hosts</code>, so it only asks once.</p>

<h4>Logging in, and what happens underneath</h4>
<p>Now <code>ssh deploy@203.0.113.20</code> logs you in with no password prompt. Your prompt changes to something like <code>deploy@web1:~$</code>: every command you type now runs on the server, not your laptop. Type <code>exit</code> to close the connection and return to your own prompt.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="Key login: the laptop sends a signature, the server checks it against authorized_keys">
<rect class="bx" x="20" y="10" width="110" height="34" rx="8"/><text class="t-b" x="75" y="32" text-anchor="middle">laptop</text>
<rect class="bx" x="290" y="10" width="110" height="34" rx="8"/><text class="t-b" x="345" y="32" text-anchor="middle">server</text>
<path class="ln-d" d="M75 44v196M345 44v196"/>
<path class="ln" d="M75 74h262"/><polygon class="ah" points="335,68 335,80 343,74"/>
<text class="t-s" x="210" y="66" text-anchor="middle">1. log me in as deploy</text>
<path class="ln-a" d="M75 124h262"/><polygon class="ah-a" points="335,118 335,130 343,124"/>
<text class="t-s t-a" x="210" y="116" text-anchor="middle">2. a signature from the private key</text>
<rect class="bx-info" x="225" y="160" width="185" height="44" rx="8"/><text class="t-s" x="317" y="179" text-anchor="middle">3. check it with the key</text><text class="t-s" x="317" y="196" text-anchor="middle">in authorized_keys</text>
<path class="ln-ok" d="M337 226h-254"/><polygon class="ah-ok" points="85,220 85,232 77,226"/>
<text class="t-s t-ok" x="160" y="218" text-anchor="middle">4. welcome</text>
</svg><figcaption>Logging in with a key. Your laptop asks to log in as deploy and sends a signature made with your private key. The server checks that signature against the public keys in authorized keys, and lets you in if one matches. The private key itself is never sent.</figcaption></figure>

<h4>Copying files: <code>scp</code></h4>
<p><code>scp</code> ("secure copy") is <code>cp</code> over SSH. It uses the same login, so your key works for it too. The pattern is the same as cp, source then destination, but a remote location is written as <code>user@host:path</code>.</p>
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="The parts of an scp command: local file, user, host, colon, remote path">
<rect class="bx-dark" x="10" y="12" width="400" height="44" rx="6"/>
<text class="t-term" x="22" y="40" style="font-size:16px">scp site.tar.gz deploy@203.0.113.20:~</text>
<path class="ln" d="M108 58v20M254 58v52M345 58v20"/><path class="ln" d="M355 58v52"/>
<g text-anchor="middle">
<text class="t" x="108" y="96">local file</text>
<text class="t" x="235" y="130">user@server</text>
<text class="t-b t-a" x="330" y="96">colon</text>
<text class="t" x="410" y="130" text-anchor="end">remote ~</text>
</g>
</svg><figcaption>The parts of the scp command. First the file on your laptop, then the user and server, then a colon, then the path on the server. Tilde here means the deploy user's home folder on the server.</figcaption></figure>
<p>The colon is what tells scp "this side is on another machine". Swap the two sides to download instead: <code>scp deploy@203.0.113.20:~/report.txt .</code> copies a file from the server into your current folder. Add <code>-r</code> to copy a whole folder, just like <code>cp -r</code>.</p>
<div class="mistake"><b>Common mistake</b>Forgetting the colon. <code>scp site.tar.gz deploy@203.0.113.20</code> is a perfectly valid local copy: it creates a file on your laptop literally named <code>deploy@203.0.113.20</code>, and nothing reaches the server.</div>

<h4>More than one key, and why SSH checks permissions</h4>
<p>By default, SSH tries the standard key files such as <code>~/.ssh/id_ed25519</code>. If you have another key, for example a <code>work_key</code> from your employer, you point at it with <code>-i</code> ("identity file"): <code>ssh -i ~/.ssh/work_key deploy@203.0.113.20</code>.</p>
<p>SSH is strict about private key files. If other users on your laptop could read the file, SSH treats the key as possibly leaked and refuses to use it:</p>
<pre class="snip">WARNING: UNPROTECTED PRIVATE KEY FILE!
Permissions 0644 for '/home/you/.ssh/work_key' are too open.
...
This private key will be ignored.</pre>
<p>You already know how to read this. <code>644</code> is <code>rw-r--r--</code>: group and others can read it. The fix is the permission you learned for secrets: <code>chmod 600 ~/.ssh/work_key</code>, so only you can read or write it. Then the same <code>ssh -i</code> command works. (<code>ssh-keygen</code> sets <code>600</code> for you automatically; the problem appears with keys that were copied or downloaded.)</p>

<h4>Hardening, and the errors you will meet</h4>
<p>Once key login works, real servers usually switch password login off entirely, by setting <code>PasswordAuthentication no</code> in the SSH server's settings file, <code>/etc/ssh/sshd_config</code>. Bots can then guess forever with no chance of success. Many teams also install <b>fail2ban</b>, which blocks addresses that keep failing to log in. Always confirm your key works in a second terminal before turning passwords off, so you cannot lock yourself out.</p>
<ul>
<li><code>Permission denied (publickey)</code>: the server did not accept any key you offered. Check the user name, check the key is in that user's <code>authorized_keys</code>, or point at the right key with <code>-i</code>.</li>
<li><code>Connection refused</code> or <code>Connection timed out</code>: you never reached SSH at all. Check the address, and whether a firewall blocks port 22 (the network "door" SSH uses).</li>
<li><code>REMOTE HOST IDENTIFICATION HAS CHANGED</code>: the server's fingerprint no longer matches <code>known_hosts</code>. Usually the server was rebuilt, but stop and ask, because it can mean an impostor.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Pasting the wrong file. GitHub, cloud dashboards and teammates only ever need the <code>.pub</code> file. If you ever share or commit a private key by accident, treat it as stolen: delete that key pair, make a new one, and remove the old public key from every server.</div>
<div class="try"><b>Try it in your head</b>A colleague needs to let you log in to their server. Which file do you send, and where do they put it? You send <code>~/.ssh/id_ed25519.pub</code>, and they add it as one line in <code>~/.ssh/authorized_keys</code> in the home folder of the user you will log in as.</div>

<h4>Recap</h4>
<ul>
<li>SSH gives you an encrypted shell on a remote machine: <code>ssh user@host</code>, then <code>exit</code> to leave.</li>
<li><code>ssh-keygen -t ed25519</code> makes a key pair: the private key stays on your laptop; the <code>.pub</code> file is safe to share.</li>
<li><code>ssh-copy-id user@host</code> adds your public key to the server's <code>~/.ssh/authorized_keys</code>; after that, no password.</li>
<li><code>scp file user@host:path</code> copies over SSH; the colon marks the remote side.</li>
<li>Private keys must be <code>chmod 600</code>, or SSH ignores them. Use <code>-i</code> to choose a specific key.</li>
</ul>
`);
