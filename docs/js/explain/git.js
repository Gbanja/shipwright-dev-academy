/* git: "Explained step by step" walkthroughs. */

explain('g1',`
<h4>The problem Git solves</h4>
<p>Imagine you are building a website. On Monday it works. On Tuesday you change a few files and suddenly the page is broken. What did you change? Which file? What did it look like on Monday? Without help, you are left guessing.</p>
<p>Most people's first answer is to copy the folder before every big change: <code>site-v1</code>, <code>site-v2</code>, <code>site-final</code>, <code>site-final-REALLY</code>. That works for a week. Then you have twenty folders, no idea what is different between them, and no way to combine your work with a friend's.</p>
<p><b>Version control</b> is software that solves this properly. It keeps a complete, labelled history of your project inside the project itself. You can see exactly what changed, when, who changed it and why, and you can go back to any earlier version in seconds. <b>Git</b> is the version control system almost every software team uses today.</p>
<figure class="fig"><svg viewBox="0 0 420 270" role="img" aria-label="Copied folders compared with one folder holding a history of commits">
<text class="t-b" x="20" y="24">Without Git</text>
<rect class="bx" x="20" y="36" width="120" height="40" rx="6"/><text class="t-m" x="80" y="61" text-anchor="middle">site-v1</text>
<rect class="bx" x="150" y="36" width="120" height="40" rx="6"/><text class="t-m" x="210" y="61" text-anchor="middle">site-v2</text>
<rect class="bx-bad" x="280" y="36" width="120" height="40" rx="6"/><text class="t-m" x="340" y="61" text-anchor="middle">site-final</text>
<text class="t-s" x="210" y="100" text-anchor="middle">Which one is right? What changed?</text>
<text class="t-b" x="20" y="132">With Git</text>
<rect class="bx" x="20" y="144" width="380" height="110" rx="8"/>
<text class="t-m" x="36" y="168">project/</text>
<line class="ln-a" x1="70" y1="196" x2="350" y2="196"/>
<circle class="dot" cx="80" cy="196" r="10"/><circle class="dot" cx="210" cy="196" r="10"/><circle class="dot" cx="340" cy="196" r="10"/>
<g text-anchor="middle"><text class="t-s" x="80" y="224">Add page</text><text class="t-s" x="210" y="224">Add styles</text><text class="t-s" x="340" y="224">Fix heading</text>
<text class="t-s" x="80" y="242">Monday</text><text class="t-s" x="210" y="242">Tuesday</text><text class="t-s" x="340" y="242">Wednesday</text></g>
</svg><figcaption>Top: the copy-the-folder approach, where you end up with many folders and no idea how they differ. Bottom: with Git there is one folder, and inside it a timeline of saved snapshots, each with a message saying what it did.</figcaption></figure>
<div class="analogy"><b>Think of it like</b>The save points in a video game. Before a hard level you save. If things go badly, you load the save and try again. Git lets you make as many save points as you like, give each one a name, and jump back to any of them.</div>

<h4>Commits: the snapshots</h4>
<p>Each save point in Git is called a <b>commit</b>. A commit is a snapshot of every tracked file in your project at one moment, plus a little information about it:</p>
<ul>
<li>a <b>message</b> you write, saying what the change does, such as "Add contact page";</li>
<li>the <b>author</b>: your name and email address;</li>
<li>the <b>date and time</b>;</li>
<li>a unique <b>id</b>, a long string of letters and numbers that Git calculates for you.</li>
</ul>
<p>A snapshot is not a copy of the whole folder every time. Git is clever: if a file did not change, the new commit simply points at the version it already stored. That is why Git stays fast and small even with thousands of commits.</p>

<h4>Repository: the project Git is watching</h4>
<p>A <b>repository</b>, or <b>repo</b> for short, is a project folder that Git is tracking. It looks like an ordinary folder, but it contains one extra, hidden folder called <code>.git</code>. The dot at the start of the name is what makes it hidden on Linux and macOS; normal <code>ls</code> skips names starting with a dot, and <code>ls -a</code> shows them.</p>
<p>Everything Git knows lives inside <code>.git</code>: every commit, every message, every old version of every file. Your own files sit next to it, exactly where you put them. If you deleted the <code>.git</code> folder, your current files would survive but the whole history would be gone, so leave it alone.</p>
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="A folder before and after git init">
<g text-anchor="middle"><text class="t-b" x="85" y="24">Before</text><text class="t-b" x="332" y="24">After</text></g>
<rect class="bx" x="10" y="40" width="150" height="120" rx="8"/>
<text class="t-m" x="85" y="66" text-anchor="middle">project/</text>
<text class="t-s" x="85" y="104" text-anchor="middle">your files</text>
<line class="ln-a" x1="166" y1="104" x2="240" y2="104"/><polygon class="ah-a" points="238,98 238,110 248,104"/>
<text class="t-m t-a" x="207" y="92" text-anchor="middle">git init</text>
<rect class="bx" x="255" y="40" width="155" height="120" rx="8"/>
<text class="t-m" x="332" y="66" text-anchor="middle">project/</text>
<text class="t-s" x="332" y="88" text-anchor="middle">your files</text>
<rect class="bx-a" x="268" y="100" width="129" height="48" rx="6"/>
<text class="t-m" x="332" y="121" text-anchor="middle">.git/</text>
<text class="t-s" x="332" y="139" text-anchor="middle">the history</text>
</svg><figcaption>Running git init does not touch your files. It adds one hidden folder called .git, and that folder is where Git keeps the entire history of the project.</figcaption></figure>

<h4>Git and GitHub are different things</h4>
<p>Beginners mix these up constantly, so let's be precise.</p>
<ul>
<li><b>Git</b> is a program that runs on your own computer. It works completely offline. It records commits in the <code>.git</code> folder.</li>
<li><b>GitHub</b> is a website, owned by Microsoft, that stores copies of Git repositories online. Teams use it to share code, review each other's work in <b>pull requests</b> and run automatic jobs with <b>GitHub Actions</b>. GitLab and Bitbucket are similar websites.</li>
</ul>
<p>You will use Git all the time and GitHub when you want to share. Sending your commits up to GitHub is called <b>pushing</b>, and fetching other people's commits down is called <b>pulling</b>. Both come in later lessons.</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Git on your computer, GitHub online, connected by push and pull">
<rect class="bx" x="10" y="20" width="170" height="150" rx="8"/><text class="t-b" x="95" y="46" text-anchor="middle">Your computer</text>
<rect class="bx-a" x="25" y="62" width="140" height="40" rx="6"/><text class="t-m" x="95" y="87" text-anchor="middle">project/</text>
<rect class="bx-ok" x="25" y="114" width="140" height="40" rx="6"/><text class="t" x="95" y="139" text-anchor="middle">Git history</text>
<rect class="bx-info" x="240" y="20" width="170" height="150" rx="8"/><text class="t-b" x="325" y="46" text-anchor="middle">GitHub</text>
<rect class="bx-ok" x="255" y="62" width="140" height="40" rx="6"/><text class="t" x="325" y="87" text-anchor="middle">copy of repo</text>
<rect class="bx" x="255" y="114" width="140" height="40" rx="6"/><text class="t" x="325" y="139" text-anchor="middle">PRs, reviews</text>
<line class="ln-a" x1="182" y1="92" x2="230" y2="92"/><polygon class="ah-a" points="228,86 228,98 238,92"/><text class="t-s" x="210" y="82" text-anchor="middle">push</text>
<line class="ln-ok" x1="190" y1="136" x2="238" y2="136"/><polygon class="ah-ok" points="192,130 192,142 182,136"/><text class="t-s" x="210" y="126" text-anchor="middle">pull</text>
<text class="t-s" x="210" y="196" text-anchor="middle">Git works offline. GitHub is for sharing.</text>
</svg><figcaption>Git lives on your computer and keeps the history. GitHub is a website that holds a copy of the repository so other people can reach it. Push sends your commits up; pull brings other people's commits down.</figcaption></figure>

<h4>How a Git command is built</h4>
<p>You talk to Git by typing commands in a terminal. Every Git command has the same shape: the word <code>git</code>, then a <b>subcommand</b> saying what you want, then sometimes extra <b>options</b> (which start with dashes) and <b>values</b>.</p>
<pre class="snip">git --version                          # option only: which Git is installed?
git init                               # subcommand: start a repository here
git config --global user.name "Ada"    # subcommand, option, setting name, value</pre>
<p>Running <code>git --version</code> first is a good habit. It proves Git is installed and prints something like <code>git version 2.47.0</code>. If you see "command not found" on a real computer, Git is not installed yet.</p>

<h4>Telling Git who you are: <code>git config</code></h4>
<p>Every commit records an author. Git does not know your name, so you must tell it once on each computer. The settings are called your <b>config</b> (short for configuration).</p>
<pre class="snip">git config --global user.name "Ada Lovelace"
git config --global user.email "ada@example.com"</pre>
<p>Step by step:</p>
<ol>
<li><code>config</code> is the subcommand for reading and changing settings.</li>
<li><code>--global</code> means "for every repository on this computer", not just the current one. Git saves it in a file in your home folder called <code>.gitconfig</code>.</li>
<li><code>user.name</code> and <code>user.email</code> are the names of the two settings.</li>
<li>The last part is the value. Put a name with a space inside quotes, otherwise Git sees two separate words.</li>
</ol>
<p>From now on, every commit you make is stamped with that name and email. On GitHub, the email is how your commits get linked to your profile, so use the same address as your GitHub account.</p>
<div class="mistake"><b>Common mistake</b>Leaving out the quotes: <code>git config --global user.name Ada Lovelace</code>. Git reads only <code>Ada</code> as the value and complains about the extra word, or saves the wrong thing. Quote any value that contains a space.</div>

<h4>Starting a repository: <code>git init</code></h4>
<p><code>init</code> is short for initialise. Run it inside the folder you want Git to track, and it creates the hidden <code>.git</code> folder:</p>
<pre class="snip">$ git init
Initialized empty Git repository in /home/you/project/.git/</pre>
<p>"Empty" means no commits yet, not that your files were deleted. You only run <code>git init</code> once per project. Running it again is harmless; Git just says "Reinitialized existing Git repository".</p>
<p>A fresh repository starts on a <b>branch</b>, which for now you can think of as the name of your main timeline. In this sandbox it is called <code>main</code>. On your own computer, older setups may call it <code>master</code>; running <code>git config --global init.defaultBranch main</code> once makes new repositories use <code>main</code>.</p>

<h4>Your best friend: <code>git status</code></h4>
<p><code>git status</code> answers the question "where do things stand right now?" It never changes anything, so you can run it as often as you like. Right after <code>git init</code> it says:</p>
<pre class="snip">$ git status
On branch main          # which timeline you are on

No commits yet          # the history is empty so far

nothing to commit (create/copy files and use "git add" to track)</pre>
<p>Notice the last line. Git is telling you what to do next. It does this a lot, and reading its suggestions is one of the fastest ways to learn. Professionals run <code>git status</code> constantly, before and after almost every other command.</p>
<p>If you run a Git command outside a repository, you will see <code>fatal: not a git repository</code>. "Fatal" sounds dramatic, but it only means "I stopped". Here it means there is no <code>.git</code> folder in this folder or any folder above it, so either run <code>git init</code> or move into your project folder.</p>
<div class="tip"><b>Tip</b>When you are lost, confused or nervous, type <code>git status</code>. It is always safe, and it usually tells you what to type next.</div>
<div class="try"><b>Try it in your head</b>You set your name with <code>--global</code> on your laptop, then start a second project on the same laptop. Do you need to set your name again? No: <code>--global</code> applies to every repository on that computer. On a new computer, though, you would set it once more.</div>

<h4>Recap</h4>
<ul>
<li>Git is a version control system: it records snapshots called commits, each with a message, author, date and id.</li>
<li>A repository is a folder Git tracks; the history lives in its hidden <code>.git</code> folder.</li>
<li>Git runs on your computer and works offline. GitHub is a website that hosts copies of repositories for sharing.</li>
<li><code>git config --global user.name</code> and <code>user.email</code> set the author stamped on every commit, once per computer.</li>
<li><code>git init</code> turns a folder into a repository, and <code>git status</code> tells you where you stand and what to do next.</li>
</ul>
`);

explain('g2',`
<h4>Why Git does not save everything automatically</h4>
<p>A word processor saves whatever is on the screen. Git is more deliberate. It asks you to <b>choose</b> what goes into each snapshot, then to <b>describe</b> it. That sounds like extra work, but it is the reason Git histories are useful.</p>
<p>Picture a real afternoon. You fixed a typo on the homepage, and you also started a half-finished contact page. You want to save the typo fix now, with a clear message, but not the broken contact page. Git makes that possible because saving happens in two steps: first you pick, then you commit.</p>
<div class="analogy"><b>Think of it like</b>Packing a parcel. Your desk is covered in things (your files). You put the items you want to send into a box (staging). When the box holds exactly the right things, you seal it and write a label (committing). Only sealed, labelled boxes go on the shelf of history.</div>

<h4>The three areas</h4>
<p>This is the most important picture in the whole Git track. Every change you make lives in one of three places.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="Working directory, staging area and repository, connected by git add and git commit">
<g text-anchor="middle">
<text class="t-m t-a" x="137" y="50">git add</text><text class="t-m t-a" x="282" y="50">git commit</text>
<rect class="bx" x="10" y="70" width="110" height="90" rx="8"/><text class="t-b" x="65" y="105">Working</text><text class="t-b" x="65" y="125">directory</text>
<rect class="bx-warn" x="155" y="70" width="110" height="90" rx="8"/><text class="t-b" x="210" y="105">Staging</text><text class="t-b" x="210" y="125">area</text>
<rect class="bx-ok" x="300" y="70" width="110" height="90" rx="8"/><text class="t-b" x="355" y="105">Repository</text><text class="t-b" x="355" y="125">(history)</text>
<text class="t-s" x="65" y="182">your edits</text><text class="t-s" x="210" y="182">next commit</text><text class="t-s" x="355" y="182">saved forever</text>
<text class="t-m" x="65" y="212">ls, cat</text><text class="t-m" x="210" y="212">git status</text><text class="t-m" x="355" y="212">git log</text>
</g>
<line class="ln-a" x1="121" y1="115" x2="146" y2="115"/><polygon class="ah-a" points="145,109 145,121 154,115"/>
<line class="ln-a" x1="266" y1="115" x2="291" y2="115"/><polygon class="ah-a" points="290,109 290,121 299,115"/>
<line class="ln-a" x1="137" y1="58" x2="137" y2="108"/><line class="ln-a" x1="282" y1="58" x2="282" y2="108"/>
</svg><figcaption>Changes start in the working directory, where you edit files. git add copies them into the staging area, the box for the next commit. git commit seals the staging area into a permanent snapshot in the repository. The bottom row shows the command you use to look at each area.</figcaption></figure>
<ul>
<li>The <b>working directory</b> is simply the files in your project folder, the ones you open and edit. Git watches them but does not save them on its own.</li>
<li>The <b>staging area</b> (also called the <b>index</b>) is a holding area for the next commit. Whatever is staged will go into the next snapshot, and nothing else.</li>
<li>The <b>repository</b> is the permanent history of commits, stored in <code>.git</code>.</li>
</ul>
<p>The sandbox's <b>Files</b> panel shows this live: each file is marked <i>untracked</i>, <i>staged</i> or <i>committed</i> as it moves along.</p>

<h4>Step 1: create a file</h4>
<p>The first task creates <code>index.html</code> using the terminal:</p>
<pre class="snip">echo "&lt;h1&gt;Hello world&lt;/h1&gt;" &gt; index.html</pre>
<p><code>echo</code> prints the text in quotes. The <code>&gt;</code> symbol takes that output and writes it into a file instead of the screen, creating the file if needed. So this one line makes a file called <code>index.html</code> that contains a web page heading.</p>
<p>Now run <code>git status</code>. Git notices the new file but has never saved it, so it calls it <b>untracked</b>:</p>
<pre class="snip">On branch main

No commits yet

Untracked files:
  (use "git add &lt;file&gt;..." to include in what will be committed)
        index.html</pre>
<p>"Untracked" means "a file Git sees but is not looking after yet". If you deleted it now, Git could not bring it back.</p>

<h4>Step 2: stage it with <code>git add</code></h4>
<p><code>git add index.html</code> copies the current content of the file into the staging area. It prints nothing when it works, which is normal for many commands: silence means success. Run <code>git status</code> again and the file has moved to a new heading:</p>
<pre class="snip">Changes to be committed:
  (use "git rm --cached &lt;file&gt;..." to unstage)
        new file:   index.html</pre>
<p>"Changes to be committed" is Git's name for the staging area. You can add several files one by one, or name several at once: <code>git add index.html style.css</code>.</p>
<p>One subtle point: <code>git add</code> stages the file <i>as it is at that moment</i>. If you edit the file again afterwards, the new edit is not staged until you run <code>git add</code> again.</p>

<h4>Step 3: save it with <code>git commit</code></h4>
<p>Now seal the box:</p>
<pre class="snip">$ git commit -m "Add homepage heading"
[main (root-commit) a3f9c21] Add homepage heading
 1 file changed, 1 insertion(+)
 create mode 100644 index.html</pre>
<p>Reading that output line by line:</p>
<ol>
<li><code>-m</code> stands for message. The text in quotes is your description.</li>
<li><code>main</code> is the branch the commit went onto. <code>root-commit</code> means it is the very first commit, with nothing before it.</li>
<li><code>a3f9c21</code> is the start of the new commit's id. Yours will be different.</li>
<li>"1 file changed, 1 insertion" summarises what the snapshot added: one file, one new line.</li>
</ol>
<p>After committing, the staging area matches the commit, and <code>git status</code> says <code>nothing to commit, working tree clean</code>. "Clean" means your files are exactly the same as the last commit. That is a safe, calm place to be.</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="Where index.html is after each command">
<g text-anchor="middle"><text class="t-s" x="270" y="24">work</text><text class="t-s" x="330" y="24">stage</text><text class="t-s" x="390" y="24">repo</text></g>
<line class="ln-d" x1="10" y1="36" x2="410" y2="36"/>
<text class="t-m" x="10" y="70">echo ... &gt; index</text><text class="t-s t-bad" x="10" y="90">untracked</text>
<circle class="dot" cx="270" cy="72" r="10"/><circle class="bx" cx="330" cy="72" r="10"/><circle class="bx" cx="390" cy="72" r="10"/>
<line class="ln-d" x1="10" y1="106" x2="410" y2="106"/>
<text class="t-m" x="10" y="140">git add index</text><text class="t-s t-warn" x="10" y="160">staged</text>
<circle class="dot" cx="270" cy="142" r="10"/><circle class="dot" cx="330" cy="142" r="10"/><circle class="bx" cx="390" cy="142" r="10"/>
<line class="ln-d" x1="10" y1="176" x2="410" y2="176"/>
<text class="t-m" x="10" y="210">git commit -m</text><text class="t-s t-ok" x="10" y="230">committed, clean</text>
<circle class="dot-ok" cx="270" cy="212" r="10"/><circle class="dot-ok" cx="330" cy="212" r="10"/><circle class="dot-ok" cx="390" cy="212" r="10"/>
</svg><figcaption>Following index.html through the lesson. After echo it exists only in your working directory and Git calls it untracked. After git add it is also in the staging area. After git commit it is in all three places and identical everywhere, so the working tree is clean.</figcaption></figure>

<h4>Step 4: look at the history with <code>git log</code></h4>
<p><code>git log</code> lists commits, newest first:</p>
<pre class="snip">commit a3f9c21e8b0d4f... (HEAD -&gt; main)
Author: Ada Lovelace &lt;ada@example.com&gt;
Date:   Mon Oct 12 10:14:03 2026 +0100

    Add homepage heading</pre>
<p>You can see the full id, the name and email you set with <code>git config</code>, the time, and your message. <code>HEAD -&gt; main</code> means "you are here, on the main branch". You will meet HEAD properly in the next lessons. On a real computer, a long log opens in a scrolling viewer; press <code>q</code> to get back to the prompt.</p>

<h4>Writing good commit messages</h4>
<p>Your history is only as useful as its messages. Months from now, you or a teammate will scan the log to find when something changed. "stuff" and "fixed it" tell them nothing.</p>
<p>The convention is the <b>imperative mood</b>: write the message as a command, as if finishing the sentence "If applied, this commit will...".</p>
<div class="tbl-wrap"><table><tr><th>Weak</th><th>Strong</th></tr>
<tr><td>added stuff</td><td>Add homepage heading</td></tr>
<tr><td>fixed bug</td><td>Fix crash when email is empty</td></tr>
<tr><td>changes</td><td>Update footer copyright year</td></tr></table></div>
<p>Keep the first line short (around 50 characters), start with a capital letter and leave off the full stop.</p>

<h4>Errors you might meet</h4>
<ul>
<li><b><code>nothing added to commit but untracked files present</code></b>: you ran <code>git commit</code> without staging anything. Run <code>git add</code> first.</li>
<li><b><code>pathspec 'indx.html' did not match any files</code></b>: a typo in the file name. "Pathspec" is Git's word for "the file path you gave me". Check with <code>ls</code>.</li>
<li><b>An editor opens, or the commit aborts</b>: you left out <code>-m</code>. On a real computer Git opens a text editor for the message. In this sandbox there is no editor, so always use <code>-m "message"</code>.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Thinking <code>git add</code> saves your work. It only puts it in the box. Nothing is in the history until you <code>git commit</code>, and nothing reaches GitHub until you push, which comes later.</div>
<div class="try"><b>Try it in your head</b>You create <code>about.html</code> and <code>draft.html</code>, then run <code>git add about.html</code> and <code>git commit -m "Add about page"</code>. What does <code>git status</code> show now? <code>draft.html</code> is still listed under "Untracked files", because it was never staged. Only <code>about.html</code> went into the commit.</div>

<h4>Recap</h4>
<ul>
<li>Git has three areas: the working directory (your files), the staging area (the next commit) and the repository (history).</li>
<li>A new file starts as untracked. <code>git add file</code> stages it; <code>git commit -m "message"</code> saves the staged snapshot.</li>
<li><code>git status</code> shows which area each change is in; "working tree clean" means everything is committed.</li>
<li><code>git log</code> shows commits newest first, with id, author, date and message.</li>
<li>Write messages in the imperative: "Add homepage heading", not "added stuff".</li>
</ul>
`);

explain('g3',`
<h4>Why history is more than a list of saves</h4>
<p>You made your first commit. Real projects have hundreds or thousands. To use that history you need to answer questions like "what exactly did I change since lunch?" and "which commit added this line?". This lesson gives you the tools: how commits link together, and how to see the difference between versions.</p>

<h4>What a commit really contains</h4>
<p>Every commit stores four things you already know: a snapshot of the files, an author, a date and a message. It stores one more thing that turns separate saves into a history: a pointer to its <b>parent</b>.</p>
<p>The parent is simply the commit that came just before it. Your first commit has no parent. The second commit points back to the first, the third points back to the second, and so on. Following the parents from the newest commit backwards gives you the entire story of the project.</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Three commits, each pointing back to its parent, with main and HEAD on the newest">
<rect class="bx-dark" x="200" y="16" width="70" height="28" rx="6"/><text class="t-term" x="235" y="35" text-anchor="middle">HEAD</text>
<line class="ln" x1="270" y1="30" x2="312" y2="30"/><polygon class="ah" points="310,24 310,36 318,30"/>
<rect class="bx-ok" x="320" y="16" width="70" height="28" rx="6"/><text class="t-b" x="355" y="35" text-anchor="middle">main</text>
<line class="ln" x1="355" y1="44" x2="355" y2="72"/><polygon class="ah" points="349,70 361,70 355,78"/>
<g text-anchor="middle">
<rect class="bx" x="10" y="80" width="110" height="60" rx="8"/><text class="t-m" x="65" y="105">a3f9c21</text><text class="t-s" x="65" y="126">Add heading</text>
<rect class="bx" x="155" y="80" width="110" height="60" rx="8"/><text class="t-m" x="210" y="105">b7e2d40</text><text class="t-s" x="210" y="126">New heading</text>
<rect class="bx-a" x="300" y="80" width="110" height="60" rx="8"/><text class="t-m" x="355" y="105">c91f0a8</text><text class="t-s" x="355" y="126">Add styles</text>
<text class="t-s" x="65" y="162">oldest</text><text class="t-s" x="355" y="162">newest</text>
<text class="t-s" x="210" y="194">Each arrow points back to the parent.</text>
</g>
<line class="ln-a" x1="155" y1="110" x2="130" y2="110"/><polygon class="ah-a" points="132,104 132,116 122,110"/>
<line class="ln-a" x1="300" y1="110" x2="275" y2="110"/><polygon class="ah-a" points="277,104 277,116 267,110"/>
</svg><figcaption>Three commits in a chain. Each commit points back to the one before it, its parent. The label main sits on the newest commit, and HEAD points at main, which is Git's way of saying "you are here".</figcaption></figure>

<h4>Commit ids: fingerprints</h4>
<p>Each commit has an <b>id</b>, also called a <b>hash</b>. It is a 40-character string of numbers and the letters a to f, such as <code>c91f0a8d3e...</code>. Git calculates it from everything in the commit: the files, the message, the author, the time and the parent's id. Change any of those and you get a completely different id. That makes the id a fingerprint: two commits with the same id are guaranteed to be identical.</p>
<p>Forty characters is a lot to type, so Git usually shows only the first seven, like <code>c91f0a8</code>. You can use that short form in commands too, as long as no other commit starts the same way.</p>
<div class="analogy"><b>Think of it like</b>A diary where every page is numbered with a unique code, and every page says "continued from page such-and-such". You can open the diary at any page and follow it back to the beginning.</div>

<h4>Changing a file that is already tracked</h4>
<p>The sandbox starts with one commit containing <code>index.html</code>. The first task overwrites it:</p>
<pre class="snip">echo "&lt;h1&gt;Hi, I build websites&lt;/h1&gt;" &gt; index.html</pre>
<p>Because Git already knows this file, <code>git status</code> no longer calls it untracked. It calls it <b>modified</b>, under the heading "Changes not staged for commit". That heading means: the file differs from the last commit, and you have not run <code>git add</code> on the change yet.</p>

<h4>Seeing changes with <code>git diff</code></h4>
<p><code>git status</code> tells you <i>which</i> files changed. <code>git diff</code> shows you <i>what</i> changed inside them, line by line:</p>
<pre class="snip">diff --git a/index.html b/index.html
--- a/index.html
+++ b/index.html
@@ -1 +1 @@
-&lt;h1&gt;Hello world&lt;/h1&gt;
+&lt;h1&gt;Hi, I build websites&lt;/h1&gt;</pre>
<p>How to read it:</p>
<ul>
<li><code>a/</code> is the old version and <code>b/</code> is the new version of the same file.</li>
<li>The line starting with <code>@@</code> says where in the file the change is. <code>-1 +1</code> means line 1 in the old version and line 1 in the new.</li>
<li>A line starting with <code>-</code> (usually shown in red) was removed.</li>
<li>A line starting with <code>+</code> (usually green) was added.</li>
</ul>
<p>Git has no idea of "edited a line". A changed line always appears as the old line removed and the new line added.</p>

<h4><code>git diff</code> versus <code>git diff --staged</code></h4>
<p>Here is the part that confuses people. Plain <code>git diff</code> does not compare your files with the last commit. It compares your working directory with the <b>staging area</b>. So the moment you <code>git add</code> a change, it disappears from <code>git diff</code>. It has not vanished; it has moved into the box.</p>
<p>To see what is in the box, the changes that <i>will</i> go into your next commit, use <code>git diff --staged</code>.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="git diff compares working directory and staging; git diff --staged compares staging and the last commit">
<g text-anchor="middle">
<text class="t-m t-a" x="137" y="40">git diff</text>
<rect class="bx" x="10" y="80" width="110" height="50" rx="8"/><text class="t-b" x="65" y="110">Working</text>
<rect class="bx-warn" x="155" y="80" width="110" height="50" rx="8"/><text class="t-b" x="210" y="110">Staging</text>
<rect class="bx-ok" x="300" y="80" width="110" height="50" rx="8"/><text class="t-b" x="355" y="110">Last commit</text>
<text class="t-m t-ok" x="282" y="186">git diff --staged</text>
</g>
<path class="ln-a" d="M65 78v-24h145v24"/><path class="ln-ok" d="M210 132v24h145v-24"/>
</svg><figcaption>The top bracket shows that plain git diff compares your working files with the staging area: edits you have not added yet. The bottom bracket shows that git diff --staged compares the staging area with the last commit: what your next commit will contain.</figcaption></figure>
<p>A good routine before every commit: <code>git status</code> to see which files, <code>git diff</code> to check unstaged edits, <code>git add</code>, then <code>git diff --staged</code> for a last look at exactly what you are about to save.</p>

<h4>Committing again, and two shortcuts</h4>
<p>The third task stages and commits in one line:</p>
<pre class="snip">git add index.html &amp;&amp; git commit -m "Update homepage heading"</pre>
<p><code>&amp;&amp;</code> is a shell feature, not a Git one. It means "run the second command only if the first succeeded". It saves typing, but two separate lines work exactly the same.</p>
<p>When you have changed several files, <code>git add .</code> stages every change in the current folder and everything below it. The dot means "this folder". It is handy, but look at <code>git status</code> first so you do not stage something by accident, such as a file full of passwords.</p>

<h4>Compact history with <code>git log --oneline</code></h4>
<p>Full <code>git log</code> output takes five lines per commit. With <code>--oneline</code>, each commit fits on one line: short id, then message.</p>
<pre class="snip">$ git log --oneline
c91f0a8 (HEAD -&gt; main) Add base styles
b7e2d40 Update homepage heading
a3f9c21 Add homepage heading</pre>
<p>Newest is at the top, just like the diagram read from right to left. If your messages are good, this short list tells the story of the project at a glance.</p>

<h4>Small commits, one purpose each</h4>
<p>Should you commit after every line, or once a day? Neither. Aim for <b>one commit per idea</b>: "Update homepage heading" is one idea; "Add base styles" is another. Small, focused commits pay off later:</p>
<ul>
<li>When a bug appears, you can find the exact small commit that caused it.</li>
<li>You can undo one change without undoing three unrelated ones.</li>
<li>Reviewers can understand each change quickly.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Running <code>git diff</code>, seeing nothing, and deciding there are no changes. If you already ran <code>git add</code>, the changes are staged and only <code>git diff --staged</code> shows them. When in doubt, <code>git status</code> tells you which area they are in.</div>
<div class="try"><b>Try it in your head</b>You edit <code>style.css</code>, run <code>git add style.css</code>, then edit it again. What does each diff show? <code>git diff</code> shows only the second edit (working versus staged). <code>git diff --staged</code> shows only the first edit (staged versus last commit). Run <code>git add</code> again to stage both.</div>

<h4>Recap</h4>
<ul>
<li>Each commit has an id (a hash fingerprint), an author, a message and a pointer to its parent; parents chain into the history.</li>
<li><code>git diff</code> shows unstaged edits: working directory versus staging area.</li>
<li><code>git diff --staged</code> shows what the next commit will contain: staging area versus last commit.</li>
<li><code>git add .</code> stages every change in the folder, so check <code>git status</code> first.</li>
<li><code>git log --oneline</code> gives one line per commit, newest first. Commit small and often, one idea per commit.</li>
</ul>
`);

explain('g4',`
<h4>Why Git makes mistakes cheap</h4>
<p>Everyone breaks things. You overwrite a file by accident, stage the wrong thing, spell a commit message badly, or commit too early. Without version control, each of those can cost hours. With Git, each one has a precise undo, and choosing the right one is just a matter of asking: <b>where does the mistake live?</b></p>
<p>Remember the three areas from the last lessons: the working directory (your files), the staging area (the box for the next commit) and the repository (the history of commits). Every undo command moves things backwards between those areas. Once you see that, the commands stop being a list to memorise.</p>
<div class="analogy"><b>Think of it like</b>A word processor with several different undo buttons: one throws away today's typing, one takes a page back out of the envelope before posting, and one lets you rewrite the label on a parcel you have just sealed.</div>

<h4>HEAD: "where you are now"</h4>
<p>Several undo commands mention <code>HEAD</code>, so let's define it. <b>HEAD</b> is Git's name for the commit you are currently on. Usually that is the newest commit on your branch. When you make a new commit, HEAD moves forward to it.</p>
<p>You can count backwards from HEAD with a tilde, the wavy <code>~</code> symbol:</p>
<ul>
<li><code>HEAD</code> is the current commit.</li>
<li><code>HEAD~1</code> is one commit before it: its parent.</li>
<li><code>HEAD~2</code> is two commits back, and so on.</li>
</ul>
<p>In this lesson's sandbox the history is <code>Add homepage</code> then <code>Add styles</code>. So <code>HEAD</code> is "Add styles" and <code>HEAD~1</code> is "Add homepage".</p>

<h4>Undo 1: throw away edits with <code>git restore</code></h4>
<p>The first task breaks <code>index.html</code> on purpose: <code>echo "oops" &gt; index.html</code> replaces the whole page with the word "oops". You have not staged it. To get the good version back:</p>
<pre class="snip">git restore index.html</pre>
<p>This copies the file from the staging area over your working copy. Since you had not staged anything, the staging area still holds the committed version, so you get back exactly what was in the last commit.</p>
<p>Be aware: this is one of the few Git commands that <b>destroys work</b>. The "oops" edit is gone for good, because it was never saved in any commit. That is exactly what you want here, but always check <code>git diff</code> first if you are not sure what you are throwing away.</p>

<h4>Undo 2: unstage with <code>git restore --staged</code></h4>
<p>The next task creates <code>notes.txt</code> and stages it by mistake. You want it out of the box, but you do not want to lose the file.</p>
<pre class="snip">git restore --staged notes.txt</pre>
<p><code>--staged</code> changes the target: instead of fixing your working file, it resets the <b>staging area</b> entry back to how it is in the last commit. For a brand-new file, that simply means "not staged". Your <code>notes.txt</code> stays on disk, untouched, and shows up as untracked again. You will see this command suggested by <code>git status</code> itself: <i>use "git restore --staged &lt;file&gt;..." to unstage</i>.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="git restore copies staged into working; git restore --staged copies last commit into staging">
<g text-anchor="middle">
<rect class="bx" x="10" y="30" width="110" height="60" rx="8"/><text class="t-b" x="65" y="65">Working</text>
<rect class="bx-warn" x="155" y="30" width="110" height="60" rx="8"/><text class="t-b" x="210" y="65">Staging</text>
<rect class="bx-ok" x="300" y="30" width="110" height="60" rx="8"/><text class="t-b" x="355" y="65">Last commit</text>
<text class="t-m t-a" x="130" y="140">git restore file</text>
<text class="t-m t-ok" x="290" y="186">git restore --staged</text>
</g>
<path class="ln-a" d="M195 92V116H70V102"/><polygon class="ah-a" points="64,102 76,102 70,93"/>
<path class="ln-ok" d="M355 92V160H225V102"/><polygon class="ah-ok" points="219,102 231,102 225,93"/>
</svg><figcaption>The two restore commands copy backwards. git restore file copies the staged version over your working file, throwing away unstaged edits. git restore --staged file copies the last commit's version into the staging area, which unstages the file but leaves your working copy alone.</figcaption></figure>

<h4>Undo 3: fix the last commit with <code>--amend</code></h4>
<p>You committed, then noticed the message is wrong, or you forgot to include a file. <code>git commit --amend</code> replaces the last commit with a corrected one:</p>
<pre class="snip">git commit --amend -m "Add base styles"</pre>
<p>Whatever is currently staged goes in, together with what the old commit had, and the new message replaces the old one. If you forgot a file, <code>git add</code> it first, then amend.</p>
<p>Here is the important detail: Git never edits a commit. The id is a fingerprint of the commit's contents, so a different message means a <b>different commit with a new id</b>. Amend builds a brand-new commit and moves the branch to it. The old one is dropped from the branch.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="Amend replaces the last commit with a new one that has a new id">
<g text-anchor="middle">
<rect class="bx" x="10" y="100" width="120" height="56" rx="8"/><text class="t-m" x="70" y="124">5e0b1a2</text><text class="t-s" x="70" y="144">Add homepage</text>
<rect class="ln-d" x="175" y="20" width="130" height="56" rx="8" fill="none"/><text class="t-m t-bad" x="240" y="44">c91f0a8</text><text class="t-s" x="240" y="64">Add styles</text>
<rect class="bx-a" x="175" y="150" width="130" height="56" rx="8"/><text class="t-m" x="240" y="174">e4d2b17</text><text class="t-s" x="240" y="194">Add base styles</text>
<rect class="bx-ok" x="335" y="164" width="70" height="28" rx="6"/><text class="t-b" x="370" y="183">main</text>
<text class="t-s" x="370" y="44">old, dropped</text>
</g>
<path class="ln-d" d="M175 48H100V98"/>
<path class="ln-a" d="M175 178H100V160"/><polygon class="ah-a" points="94,164 106,164 100,157"/>
<line class="ln" x1="335" y1="178" x2="313" y2="178"/><polygon class="ah" points="315,172 315,184 306,178"/>
</svg><figcaption>Amending does not edit the old commit. Git makes a new commit with a new id and the corrected message, on the same parent, and moves main to it. The old commit, shown dashed, is no longer part of the branch.</figcaption></figure>

<h4>Undo 4: take back whole commits with <code>git reset</code></h4>
<p><code>git reset</code> moves your branch backwards to an earlier commit. Commits after that point are no longer on the branch. The option you give decides what happens to the <b>changes</b> those commits contained:</p>
<ul>
<li><code>git reset --soft HEAD~1</code>: move back one commit, and keep its changes <b>staged</b>. It is as if you had run <code>git add</code> but not yet <code>git commit</code>. Perfect for "I committed too early, let me add one more thing and commit again".</li>
<li><code>git reset HEAD~1</code> with no option (called <b>mixed</b>): move back, and keep the changes in your files but <b>unstaged</b>.</li>
<li><code>git reset --hard HEAD~1</code>: move back and <b>delete</b> the changes from the staging area and your files. Your folder looks exactly like the earlier commit.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 270" role="img" aria-label="reset --soft and --hard both move main back one commit; soft keeps the changes staged, hard deletes them">
<g text-anchor="middle">
<text class="t-m" x="40" y="66">before</text><text class="t-m" x="40" y="151">--soft</text><text class="t-m" x="40" y="236">--hard</text>
<rect class="bx-ok" x="185" y="18" width="50" height="26" rx="6"/><text class="t-b" x="210" y="36">main</text>
<rect class="bx-ok" x="105" y="103" width="50" height="26" rx="6"/><text class="t-b" x="130" y="121">main</text>
<rect class="bx-ok" x="105" y="188" width="50" height="26" rx="6"/><text class="t-b" x="130" y="206">main</text>
<circle class="bx-a" cx="130" cy="62" r="15"/><text class="t-b" x="130" y="67">A</text>
<circle class="bx-a" cx="210" cy="62" r="15"/><text class="t-b" x="210" y="67">B</text>
<circle class="bx-a" cx="130" cy="147" r="15"/><text class="t-b" x="130" y="152">A</text>
<circle class="ln-d" cx="210" cy="147" r="15" fill="none"/><text class="t-s" x="210" y="152">B</text>
<circle class="bx-a" cx="130" cy="232" r="15"/><text class="t-b" x="130" y="237">A</text>
<circle class="ln-d" cx="210" cy="232" r="15" fill="none"/><text class="t-s" x="210" y="237">B</text>
<text class="t-s" x="335" y="66">B is newest</text>
<text class="t-s t-warn" x="335" y="142">B's changes</text><text class="t-s t-warn" x="335" y="160">kept, staged</text>
<text class="t-s t-bad" x="335" y="227">B's changes</text><text class="t-s t-bad" x="335" y="245">deleted</text>
</g>
<line class="ln" x1="194" y1="62" x2="152" y2="62"/><polygon class="ah" points="154,56 154,68 146,62"/>
<line class="ln" x1="210" y1="44" x2="210" y2="46"/>
<line class="ln-d" x1="10" y1="90" x2="410" y2="90"/><line class="ln-d" x1="10" y1="175" x2="410" y2="175"/>
</svg><figcaption>Commit A is "Add homepage" and B is "Add styles". Both resets move main back from B to A, so B leaves the branch. With --soft, B's changes wait in the staging area, ready to commit again. With --hard, they are wiped from your files too.</figcaption></figure>
<div class="mistake"><b>Common mistake</b>Reaching for <code>git reset --hard</code> when you meant <code>--soft</code>. Hard reset throws away uncommitted work with no "are you sure?" prompt. Use <code>--soft</code> or plain <code>git reset</code> unless you truly want the changes gone. (A later lesson shows how <code>git reflog</code> can rescue lost commits, but uncommitted edits cannot be rescued.)</div>

<h4>The golden rule: only rewrite what you have not shared</h4>
<p>Amend and reset both <b>rewrite history</b>: commits vanish from the branch and new ones with new ids appear. On your own computer that is fine. But once you have pushed commits to GitHub, teammates may have copies of them. If you rewrite those commits, your history and theirs no longer match, and sorting that out is painful.</p>
<p>So: amend and reset freely <i>before</i> you push. For commits other people already have, use <code>git revert</code>, which you will meet in an advanced lesson. It undoes a commit by adding a new one, without rewriting anything.</p>

<h4>Choosing the right undo</h4>
<div class="tbl-wrap"><table><tr><th>Where is the mistake?</th><th>Command</th><th>Your edits</th></tr>
<tr><td>Unstaged edits to a file</td><td><code>git restore file</code></td><td>Discarded</td></tr>
<tr><td>Staged something by accident</td><td><code>git restore --staged file</code></td><td>Kept in the file</td></tr>
<tr><td>Last commit's message or content</td><td><code>git commit --amend</code></td><td>Kept, new commit</td></tr>
<tr><td>Last commit was too early</td><td><code>git reset --soft HEAD~1</code></td><td>Kept, staged</td></tr>
<tr><td>Last commit should not exist</td><td><code>git reset --hard HEAD~1</code></td><td>Discarded</td></tr></table></div>
<div class="try"><b>Try it in your head</b>You commit "Add styles", then realise you forgot to include <code>style.css</code>. Which is simpler: reset or amend? Amend: run <code>git add style.css</code>, then <code>git commit --amend -m "Add styles"</code>. The fixed commit replaces the old one in a single step.</div>

<h4>Recap</h4>
<ul>
<li><code>HEAD</code> is the commit you are on; <code>HEAD~1</code> is its parent.</li>
<li><code>git restore file</code> discards unstaged edits; <code>git restore --staged file</code> unstages but keeps the edits.</li>
<li><code>git commit --amend</code> replaces the last commit with a new one (new id), including anything newly staged.</li>
<li><code>git reset --soft HEAD~1</code> undoes a commit and keeps its changes staged; <code>--hard</code> deletes them.</li>
<li>Only amend or reset commits you have not pushed. Shared commits are undone with <code>git revert</code>.</li>
</ul>
`);

explain('g5',`
<h4>Why branches exist</h4>
<p>So far your history has been one straight line. That is fine while you work alone on one thing. Real work is messier. You start building a navigation bar, and halfway through someone reports a bug on the live site. Your files are now half-finished. How do you fix the bug without shipping a broken navbar?</p>
<p><b>Branches</b> solve this. A branch is a separate line of work. You build the navbar on its own branch while <code>main</code>, the branch that holds the working version of the project, stays exactly as it was. When the feature is ready, you bring it back into <code>main</code> (that is merging, the next lesson).</p>
<div class="analogy"><b>Think of it like</b>Drafting in a separate notebook. Your final notebook stays neat. You try ideas in the draft notebook, and only copy them across once they work. If the draft goes badly, you throw it away and the final notebook never knew.</div>

<h4>A branch is just a label</h4>
<p>Here is the idea that makes branches click. A branch is <b>not</b> a copy of your files. It is a small, movable <b>label that points at one commit</b>. Inside <code>.git</code>, a branch is literally a tiny file containing a commit id. That is why creating a branch is instant, even in a huge project.</p>
<p>When you make a commit while on a branch, Git does two things: it creates the commit with the current commit as its parent, and it moves that branch's label forward onto the new commit. Other branch labels do not move.</p>

<h4>HEAD: which branch you are on</h4>
<p>In the last lesson HEAD meant "the commit you are on". More precisely, HEAD usually points at a <b>branch</b>, and the branch points at a commit. So HEAD answers "which branch am I on?", and through the branch, "which commit?". When you commit, the branch that HEAD points at is the one that moves. Switching branches means moving HEAD to a different label.</p>
<figure class="fig"><svg viewBox="0 0 420 330" role="img" aria-label="Three steps: create a branch, commit on it, switch back to main">
<g text-anchor="middle">
<text class="t-s" x="55" y="50">1. create</text><text class="t-s" x="55" y="68">and switch</text>
<text class="t-s" x="55" y="160">2. commit</text><text class="t-s" x="55" y="178">on feature</text>
<text class="t-s" x="55" y="270">3. switch</text><text class="t-s" x="55" y="288">to main</text>
</g>
<rect class="bx-info" x="120" y="8" width="140" height="28" rx="6"/><text class="t-b" x="190" y="27" text-anchor="middle">feature/navbar</text>
<rect class="bx-dark" x="300" y="8" width="64" height="28" rx="6"/><text class="t-term" x="332" y="27" text-anchor="middle">HEAD</text>
<line class="ln" x1="300" y1="22" x2="270" y2="22"/><polygon class="ah" points="272,16 272,28 263,22"/>
<line class="ln" x1="190" y1="36" x2="190" y2="40"/>
<circle class="bx-a" cx="190" cy="56" r="16"/><text class="t-s" x="190" y="61" text-anchor="middle">C1</text>
<rect class="bx-ok" x="160" y="76" width="60" height="26" rx="6"/><text class="t-b" x="190" y="94" text-anchor="middle">main</text>
<line class="ln-d" x1="10" y1="110" x2="410" y2="110"/>
<rect class="bx-dark" x="160" y="120" width="64" height="28" rx="6"/><text class="t-term" x="192" y="139" text-anchor="middle">HEAD</text>
<line class="ln" x1="224" y1="134" x2="242" y2="134"/><polygon class="ah" points="240,128 240,140 249,134"/>
<rect class="bx-info" x="250" y="120" width="140" height="28" rx="6"/><text class="t-b" x="320" y="139" text-anchor="middle">feature/navbar</text>
<circle class="bx-a" cx="190" cy="166" r="16"/><text class="t-s" x="190" y="171" text-anchor="middle">C1</text>
<circle class="bx-a" cx="320" cy="166" r="16"/><text class="t-s" x="320" y="171" text-anchor="middle">C2</text>
<line class="ln" x1="304" y1="166" x2="215" y2="166"/><polygon class="ah" points="217,160 217,172 208,166"/>
<rect class="bx-ok" x="160" y="186" width="60" height="26" rx="6"/><text class="t-b" x="190" y="204" text-anchor="middle">main</text>
<line class="ln-d" x1="10" y1="220" x2="410" y2="220"/>
<rect class="bx-info" x="250" y="230" width="140" height="28" rx="6"/><text class="t-b" x="320" y="249" text-anchor="middle">feature/navbar</text>
<circle class="bx-a" cx="190" cy="276" r="16"/><text class="t-s" x="190" y="281" text-anchor="middle">C1</text>
<circle class="bx-a" cx="320" cy="276" r="16"/><text class="t-s" x="320" y="281" text-anchor="middle">C2</text>
<line class="ln" x1="304" y1="276" x2="215" y2="276"/><polygon class="ah" points="217,270 217,282 208,276"/>
<rect class="bx-ok" x="160" y="296" width="60" height="26" rx="6"/><text class="t-b" x="190" y="314" text-anchor="middle">main</text>
<rect class="bx-dark" x="250" y="296" width="64" height="28" rx="6"/><text class="t-term" x="282" y="315" text-anchor="middle">HEAD</text>
<line class="ln" x1="250" y1="309" x2="230" y2="309"/><polygon class="ah" points="232,303 232,315 223,309"/>
</svg><figcaption>Step 1: git switch -c feature/navbar creates a new label on the same commit as main and moves HEAD to it. Step 2: a commit on the feature branch creates C2, and only the feature label moves forward; main stays on C1. Step 3: git switch main moves HEAD back to main, so your files go back to how they were at C1.</figcaption></figure>

<h4>Listing branches: <code>git branch</code></h4>
<pre class="snip">$ git branch
* main</pre>
<p>Right now there is one branch. The star marks the one you are on, the one HEAD points at.</p>

<h4>Creating and switching: <code>git switch</code></h4>
<pre class="snip">git switch -c feature/navbar   # create a branch AND move onto it
git switch main                # move onto an existing branch</pre>
<p><code>switch</code> moves HEAD to a branch. The <code>-c</code> option means "create it first". The new branch starts on the commit you are currently on, so at first <code>main</code> and <code>feature/navbar</code> point at the same commit, as in step 1 of the diagram.</p>
<p>You will also see an older command everywhere, in tutorials and on colleagues' screens: <code>git checkout -b feature/navbar</code> does the same as <code>git switch -c</code>, and <code>git checkout main</code> the same as <code>git switch main</code>. <code>checkout</code> does many unrelated jobs, which confused people, so Git added the clearer <code>switch</code> in 2019. Both work.</p>
<p>There is also <code>git branch name</code>, which creates a branch <i>without</i> switching to it. Beginners often run it, keep committing, and are surprised the commits went onto <code>main</code>. Run <code>git branch</code> afterwards and check where the star is.</p>

<h4>Your files change when you switch</h4>
<p>On <code>feature/navbar</code>, the lesson adds <code>nav.html</code> and commits it. Then you switch back to <code>main</code> and run <code>ls</code>. <code>nav.html</code> has disappeared from your folder.</p>
<p>Nothing is lost. When you switch, Git rewrites your working directory to match the commit the new branch points at. The commit on <code>main</code> never contained <code>nav.html</code>, so the file is removed from disk. Switch back to <code>feature/navbar</code> and it reappears, because it is safely stored in commit C2.</p>
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="The folder contents on main and on feature/navbar">
<g text-anchor="middle">
<text class="t-m" x="105" y="26">on main</text><text class="t-m" x="315" y="26">on feature/navbar</text>
<rect class="bx-ok" x="10" y="40" width="190" height="130" rx="8"/>
<rect class="bx-info" x="220" y="40" width="190" height="130" rx="8"/>
<text class="t-m" x="105" y="80">index.html</text>
<text class="t-s" x="105" y="122">no nav.html here</text>
<text class="t-m" x="315" y="80">index.html</text>
<rect class="bx-a" x="250" y="100" width="130" height="34" rx="6"/><text class="t-m" x="315" y="122">nav.html</text>
</g>
</svg><figcaption>The same project folder on two branches. On main it holds only index.html. On feature/navbar it also holds nav.html, because that branch's newest commit includes it. Switching branches swaps the folder's contents to match.</figcaption></figure>

<h4>When Git refuses to switch</h4>
<p>If you have uncommitted changes to a file that differs between the two branches, switching would overwrite your work, so Git stops:</p>
<pre class="snip">error: Your local changes to the following files would be overwritten by checkout:
        index.html
Please commit your changes or stash them before you switch branches.</pre>
<p>This is Git protecting you. Commit your changes on the current branch first (or shelve them with <code>git stash</code>, coming in an advanced lesson), then switch.</p>
<div class="mistake"><b>Common mistake</b>Forgetting which branch you are on and committing feature work straight onto <code>main</code>. Make it a habit to check the first line of <code>git status</code>, "On branch ...", or the star in <code>git branch</code>, before you commit.</div>

<h4>Naming branches</h4>
<p>Branch names are free text, but teams use a prefix that says what kind of work it is, then a slash, then a short description in lowercase with hyphens:</p>
<ul>
<li><code>feature/navbar</code>: new functionality.</li>
<li><code>fix/login-crash</code>: a bug fix.</li>
<li><code>chore/update-deps</code>: maintenance, like updating libraries.</li>
</ul>
<p>Names cannot contain spaces. A good name lets a teammate understand the branch without opening it.</p>
<div class="try"><b>Try it in your head</b>You are on <code>main</code> at commit C1. You run <code>git branch experiment</code> (no switch), then commit C2. Which label moves to C2? <code>main</code> does, because HEAD still points at <code>main</code>. <code>experiment</code> stays on C1.</div>

<h4>Recap</h4>
<ul>
<li>A branch is a movable label pointing at a commit; creating one is instant and copies nothing.</li>
<li>HEAD points at the branch you are on. Committing moves only that branch forward.</li>
<li><code>git branch</code> lists branches with a star on the current one; <code>git switch -c name</code> creates and switches; <code>git switch name</code> switches.</li>
<li><code>git checkout -b name</code> is the older equivalent of <code>git switch -c name</code>.</li>
<li>Switching rewrites your folder to match the branch, so commit your work before you switch.</li>
</ul>
`);

explain('g6',`
<h4>Why merging exists</h4>
<p>Branches let you work on a feature without disturbing <code>main</code>. But a feature sitting on its own branch is not much use to anyone. At some point the finished work has to come back into <code>main</code>, so it becomes part of the real project. That step is called <b>merging</b>.</p>
<p>Git does most of the work for you. It looks at what changed on each branch and combines the changes. The only thing you must get right is the direction.</p>

<h4>The direction: stand where the work should land</h4>
<p><code>git merge other-branch</code> means "bring <i>other-branch</i> into the branch I am on now". So you always switch to the branch that should <b>receive</b> the work first, then name the branch that <b>gives</b> it:</p>
<pre class="snip">git switch main              # stand on the receiving branch
git merge feature/navbar     # pull the feature's commits into it</pre>
<p>The branch you name is not changed or deleted. Only the branch you are on moves.</p>
<div class="analogy"><b>Think of it like</b>Copying the good ideas from your draft notebook into the final one. You open the <i>final</i> notebook, and copy <i>from</i> the draft. The draft itself stays as it was.</div>

<h4>The starting picture</h4>
<p>This sandbox has two finished features waiting. Both branches started from the same commit, "Add homepage". One adds a navbar, the other a footer. Run <code>git log --oneline --all</code> or look at the graph panel and you should see this shape:</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="main on the first commit, with feature/navbar and feature/footer each one commit ahead">
<line class="ln" x1="104" y1="104" x2="236" y2="56"/><line class="ln" x1="104" y1="116" x2="236" y2="164"/>
<circle class="bx-a" cx="90" cy="110" r="16"/><text class="t-s" x="90" y="115" text-anchor="middle">C1</text>
<circle class="bx-a" cx="250" cy="50" r="16"/><text class="t-s" x="250" y="55" text-anchor="middle">C2</text>
<circle class="bx-a" cx="250" cy="170" r="16"/><text class="t-s" x="250" y="175" text-anchor="middle">C3</text>
<rect class="bx-info" x="276" y="36" width="134" height="28" rx="6"/><text class="t-b" x="343" y="55" text-anchor="middle">feature/navbar</text>
<rect class="bx-info" x="276" y="156" width="134" height="28" rx="6"/><text class="t-b" x="343" y="175" text-anchor="middle">feature/footer</text>
<rect class="bx-ok" x="60" y="136" width="60" height="26" rx="6"/><text class="t-b" x="90" y="154" text-anchor="middle">main</text>
<rect class="bx-dark" x="58" y="182" width="64" height="28" rx="6"/><text class="t-term" x="90" y="201" text-anchor="middle">HEAD</text>
<line class="ln" x1="90" y1="182" x2="90" y2="170"/><polygon class="ah" points="84,172 96,172 90,164"/>
<text class="t-s" x="343" y="82" text-anchor="middle">Add navbar</text><text class="t-s" x="343" y="202" text-anchor="middle">Add footer</text>
</svg><figcaption>The starting point. C1, "Add homepage", is where main is, and you are on main. Two branches split off from C1: feature/navbar with one new commit, C2, and feature/footer with one new commit, C3.</figcaption></figure>

<h4>Merge type 1: fast-forward</h4>
<p>Look at <code>main</code> and <code>feature/navbar</code>. Since the navbar branch started, <code>main</code> has not moved. Every commit on <code>main</code> is already inside the navbar branch's history. So there is nothing to combine: Git can simply slide the <code>main</code> label forward to C2.</p>
<p>That is a <b>fast-forward</b> merge. No new commit is made. Git tells you so:</p>
<pre class="snip">$ git merge feature/navbar
Updating 5e0b1a2..b7e2d40
Fast-forward
 nav.html | 1 +
 1 file changed, 1 insertion(+)</pre>
<p><code>Updating A..B</code> means the branch moved from commit A to commit B. <code>nav.html</code> now appears in your folder, because your working directory updates to match the new commit.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="After the fast-forward, main has slid forward onto C2">
<line class="ln" x1="104" y1="104" x2="236" y2="56"/><line class="ln" x1="104" y1="116" x2="236" y2="164"/>
<circle class="bx-a" cx="90" cy="110" r="16"/><text class="t-s" x="90" y="115" text-anchor="middle">C1</text>
<circle class="bx-ok" cx="250" cy="50" r="16"/><text class="t-s" x="250" y="55" text-anchor="middle">C2</text>
<circle class="bx-a" cx="250" cy="170" r="16"/><text class="t-s" x="250" y="175" text-anchor="middle">C3</text>
<rect class="bx-info" x="276" y="36" width="134" height="28" rx="6"/><text class="t-b" x="343" y="55" text-anchor="middle">feature/navbar</text>
<rect class="bx-info" x="276" y="156" width="134" height="28" rx="6"/><text class="t-b" x="343" y="175" text-anchor="middle">feature/footer</text>
<rect class="bx-ok" x="220" y="2" width="60" height="26" rx="6"/><text class="t-b" x="250" y="20" text-anchor="middle">main</text>
<rect class="bx-dark" x="304" y="1" width="64" height="28" rx="6"/><text class="t-term" x="336" y="20" text-anchor="middle">HEAD</text>
<line class="ln" x1="304" y1="15" x2="290" y2="15"/><polygon class="ah" points="292,9 292,21 283,15"/>
<path class="ln-d" d="M90 136V150"/><text class="t-s" x="90" y="168" text-anchor="middle">main was here</text>
<path class="ln-ok" d="M96 92Q120 18 208 15"/><polygon class="ah-ok" points="208,9 208,21 218,15"/>
</svg><figcaption>After git merge feature/navbar. Because main had no new commits of its own, Git just slid the main label forward from C1 to C2, the same commit feature/navbar points at. No new commit was created.</figcaption></figure>

<h4>Merge type 2: three-way merge</h4>
<p>Now merge the footer: <code>git merge feature/footer</code>. This time the situation is different. <code>main</code> has moved on to C2, which the footer branch does not have. And the footer branch has C3, which <code>main</code> does not have. The two histories have <b>diverged</b>: each side has work the other lacks. Sliding a label cannot fix that.</p>
<p>So Git does a <b>three-way merge</b>. "Three-way" refers to the three commits it compares:</p>
<ol>
<li>the <b>common ancestor</b>, the last commit both branches share (C1);</li>
<li>the tip of your branch (C2, with the navbar);</li>
<li>the tip of the incoming branch (C3, with the footer).</li>
</ol>
<p>Git works out what each side changed compared with the ancestor, and applies both sets of changes. The navbar side added <code>nav.html</code>; the footer side added <code>footer.html</code>. Those do not overlap, so Git combines them happily. It then records the result as a new <b>merge commit</b>. A merge commit is special: it has <b>two parents</b>, one from each branch.</p>
<pre class="snip">$ git merge feature/footer
Merge made by the 'ort' strategy.
 footer.html | 1 +
 1 file changed, 1 insertion(+)</pre>
<p>"ort" is simply the name of Git's standard merging method. On a real computer, Git first opens a text editor with a ready-made message, <code>Merge branch 'feature/footer'</code>. Saving and closing accepts it; adding <code>--no-edit</code> to the command skips the editor.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="A merge commit M with two parents, C2 and C3">
<line class="ln" x1="74" y1="104" x2="166" y2="56"/><line class="ln" x1="74" y1="116" x2="166" y2="164"/>
<line class="ln-ok" x1="194" y1="56" x2="296" y2="104"/><line class="ln-ok" x1="194" y1="164" x2="296" y2="116"/>
<circle class="bx-a" cx="60" cy="110" r="16"/><text class="t-s" x="60" y="115" text-anchor="middle">C1</text>
<circle class="bx-a" cx="180" cy="50" r="16"/><text class="t-s" x="180" y="55" text-anchor="middle">C2</text>
<circle class="bx-a" cx="180" cy="170" r="16"/><text class="t-s" x="180" y="175" text-anchor="middle">C3</text>
<circle class="bx-ok" cx="310" cy="110" r="18"/><text class="t-b" x="310" y="115" text-anchor="middle">M</text>
<text class="t-s" x="180" y="22" text-anchor="middle">feature/navbar</text><text class="t-s" x="180" y="210" text-anchor="middle">feature/footer</text>
<text class="t-s" x="60" y="150" text-anchor="middle">ancestor</text>
<text class="t-s" x="310" y="152" text-anchor="middle">two parents</text>
<rect class="bx-ok" x="345" y="97" width="60" height="26" rx="6"/><text class="t-b" x="375" y="115" text-anchor="middle">main</text>
</svg><figcaption>After git merge feature/footer. Git compared both tips, C2 and C3, with their common ancestor C1, combined the changes and made a new merge commit, M. M has two parents, C2 and C3, and main now points at it, so main contains the homepage, navbar and footer.</figcaption></figure>

<h4>What if both sides changed the same lines?</h4>
<p>Here the two branches touched different files, so the merge was automatic. Git is also happy when both sides changed the same file in different places. Only when both sides changed the <i>same lines</i> differently does Git stop and ask you to decide. That is a <b>merge conflict</b>, and it gets its own lesson next.</p>

<h4>Cleaning up: <code>git branch -d</code></h4>
<p>Once a branch is merged, its label has done its job. The commits are safely part of <code>main</code>'s history, so delete the label to keep your branch list tidy:</p>
<pre class="snip">$ git branch -d feature/navbar
Deleted branch feature/navbar (was b7e2d40).</pre>
<p>Deleting a branch deletes only the label, never the commits that are already in <code>main</code>. Git also protects you. If the branch holds commits that are not merged anywhere, <code>-d</code> refuses:</p>
<pre class="snip">error: The branch 'experiment' is not fully merged.</pre>
<p>That message means "deleting this label would make some commits unreachable". If you are sure you want to throw that work away, the capital <code>-D</code> forces it. You also cannot delete the branch you are standing on; switch away first.</p>
<div class="mistake"><b>Common mistake</b>Merging in the wrong direction. Standing on <code>feature/navbar</code> and running <code>git merge main</code> pulls main's work into the feature, not the other way round. Check "On branch ..." in <code>git status</code> before you merge.</div>

<h4>Reading the result</h4>
<p><code>git log --oneline</code> now shows the merge commit at the top, followed by the commits from both branches. Adding <code>--graph</code> draws the shape with lines in the terminal, which is a great way to check what happened.</p>
<div class="try"><b>Try it in your head</b>You create <code>feature/a</code> from main, commit twice on it, and nobody touches main. Then you merge it into main. Fast-forward or merge commit? Fast-forward: main has no new commits, so Git just slides the label forward. No new commit is made.</div>

<h4>Recap</h4>
<ul>
<li>Switch to the branch that receives the work, then <code>git merge other-branch</code>.</li>
<li>Fast-forward: the receiving branch has not moved, so Git slides its label forward. No new commit.</li>
<li>Three-way merge: both branches have new commits, so Git combines them with the common ancestor and makes a merge commit with two parents.</li>
<li>Only the same lines changed differently on both sides cause a conflict.</li>
<li><code>git branch -d name</code> deletes a merged branch label; Git refuses if the work is not merged.</li>
</ul>
`);

explain('g7',`
<h4>Why conflicts happen</h4>
<p>In the last lesson Git merged two branches by itself because they changed different things. Now imagine two people edit the <b>same sentence</b> in different ways. One writes "Portfolio | Home", the other writes "Jane Doe | Developer". Which one is right? Git has no idea. It is a tool, not an editor, and it will never guess with your code.</p>
<p>So Git stops halfway through the merge, marks the clash clearly in the file, and asks you to decide. That pause is a <b>merge conflict</b>. It is not an error and nothing is broken. It is Git saying: "I need a human for this part."</p>
<div class="analogy"><b>Think of it like</b>Two people editing the same paragraph of a shared document while offline. When they reconnect, the program cannot pick a winner, so it shows both versions side by side and asks one of them to write the final paragraph.</div>

<h4>This lesson's setup</h4>
<p>The sandbox has a page title in <code>index.html</code>, originally <code>&lt;title&gt;My Site&lt;/title&gt;</code>. Then the history split:</p>
<ul>
<li>On <code>feature/title</code>, someone changed it to <code>Jane Doe | Developer</code>.</li>
<li>On <code>main</code>, someone changed the same line to <code>Portfolio | Home</code>.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="Both branches changed the same line of the original, so the merge cannot decide">
<g text-anchor="middle">
<rect class="bx" x="10" y="92" width="120" height="56" rx="8"/><text class="t-b" x="70" y="114">original</text><text class="t-s" x="70" y="134">My Site</text>
<rect class="bx-ok" x="160" y="20" width="180" height="56" rx="8"/><text class="t-b" x="250" y="42">main</text><text class="t-s" x="250" y="62">Portfolio | Home</text>
<rect class="bx-info" x="160" y="164" width="180" height="56" rx="8"/><text class="t-b" x="250" y="186">feature/title</text><text class="t-s" x="250" y="206">Jane Doe | Developer</text>
<rect class="bx-bad" x="360" y="92" width="50" height="56" rx="8"/><text class="t-b t-bad" x="385" y="127" style="font-size:24px">?</text>
</g>
<line class="ln" x1="130" y1="110" x2="160" y2="56"/><line class="ln" x1="130" y1="130" x2="160" y2="184"/>
<line class="ln-d" x1="340" y1="56" x2="370" y2="92"/><line class="ln-d" x1="340" y1="184" x2="370" y2="148"/>
</svg><figcaption>The original title said "My Site". Main changed that line to "Portfolio | Home" and feature/title changed the same line to "Jane Doe | Developer". When you merge, Git cannot know which to keep, so it stops and asks you.</figcaption></figure>
<p>Git compares each side with the original, just like any three-way merge. If only one side had changed the line, Git would take that change. Because <b>both</b> sides changed it, differently, it is a conflict.</p>

<h4>Step 1: start the merge and read the message</h4>
<pre class="snip">$ git merge feature/title
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.</pre>
<p>Read it slowly. Git tried ("Auto-merging"), found a clash in the content of <code>index.html</code>, and is now waiting for you. You are <b>in the middle of a merge</b>: the merge commit has not been made yet. <code>git status</code> confirms it:</p>
<pre class="snip">You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
        both modified:   index.html</pre>
<p>"Unmerged paths" is the list of files you need to fix. "Both modified" means both branches changed it. In a big merge, files Git could combine on its own are already staged, and only the conflicted ones are listed here.</p>

<h4>Step 2: read the conflict markers</h4>
<p>Open the file, with <code>cat index.html</code> in the sandbox. Git has written <b>both</b> versions into it, fenced off with markers:</p>
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="Conflict markers: your version above the equals line, the incoming version below">
<rect class="bx-dark" x="6" y="12" width="340" height="150" rx="8"/>
<text class="t-term" x="16" y="40">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</text>
<text class="t-term" x="16" y="66">&lt;title&gt;Portfolio | Home&lt;/title&gt;</text>
<text class="t-term" x="16" y="92">=======</text>
<text class="t-term" x="16" y="118">&lt;title&gt;Jane Doe | Developer&lt;/title&gt;</text>
<text class="t-term" x="16" y="144">&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/title</text>
<path class="ln-ok" d="M352 26h6v46h-6"/><path class="ln-a" d="M352 104h6v46h-6"/>
<g text-anchor="middle"><text class="t-s t-ok" x="388" y="46">yours</text><text class="t-s" x="388" y="64">main</text>
<text class="t-s t-a" x="388" y="124">theirs</text><text class="t-s" x="388" y="142">feature</text></g>
</svg><figcaption>Everything between the seven less-than signs and the row of equals signs is your current branch's version, labelled HEAD, which is main here. Everything between the equals signs and the seven greater-than signs is the incoming version from feature/title.</figcaption></figure>
<ul>
<li><code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> starts the conflict. HEAD is where you are standing, so the lines below it are <b>your</b> branch's version (main).</li>
<li><code>=======</code> is the dividing line.</li>
<li><code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/title</code> ends the conflict. The lines above it are the <b>incoming</b> branch's version.</li>
</ul>
<p>Any lines outside the markers were merged without trouble. A file can contain several separate conflict blocks; fix each one.</p>

<h4>Step 3: write the final version</h4>
<p>Now you make the decision. You have three choices for each block: keep yours, keep theirs, or write something new that combines both. Whatever you choose, the file must end up as normal, working content with <b>every marker line removed</b>.</p>
<p>In a code editor you would delete the lines you do not want. Editors like VS Code even show buttons: "Accept Current", "Accept Incoming", "Accept Both". In the sandbox, the simplest way is to overwrite the whole file with the final content, using the <code>echo ... &gt; file</code> technique you already know. For example, you might combine both ideas into <code>Jane Doe | Portfolio</code>.</p>

<h4>Step 4: mark it resolved and finish</h4>
<p>Fixing the text is not enough; you have to tell Git you are done with that file. That is what <code>git add</code> means during a merge: "this file is resolved".</p>
<pre class="snip">git add index.html   # mark as resolved
git status           # "All conflicts fixed but you are still merging."
git commit           # creates the merge commit</pre>
<p>During a merge you can leave out <code>-m</code>. Git already knows the merge commit's message, <code>Merge branch 'feature/title'</code>; on a real computer it opens an editor so you can accept it. Adding <code>-m "..."</code> works too. Once you commit, the merge commit is created with two parents, exactly like the three-way merges in the last lesson.</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="Resolution steps: merge, edit, add, commit, with abort as an exit">
<g text-anchor="middle">
<rect class="bx-bad" x="40" y="10" width="250" height="38" rx="8"/><text class="t-m" x="165" y="35">git merge → CONFLICT</text>
<rect class="bx" x="40" y="70" width="250" height="38" rx="8"/><text class="t" x="165" y="95">Edit file, remove markers</text>
<rect class="bx-warn" x="40" y="130" width="250" height="38" rx="8"/><text class="t-m" x="165" y="155">git add index.html</text>
<rect class="bx-ok" x="40" y="190" width="250" height="38" rx="8"/><text class="t-m" x="165" y="215">git commit</text>
<rect class="bx-info" x="318" y="44" width="96" height="58" rx="8"/><text class="t-s" x="366" y="68">git merge</text><text class="t-s" x="366" y="88">--abort</text>
</g>
<line class="ln" x1="165" y1="48" x2="165" y2="62"/><polygon class="ah" points="159,61 171,61 165,69"/>
<line class="ln" x1="165" y1="108" x2="165" y2="122"/><polygon class="ah" points="159,121 171,121 165,129"/>
<line class="ln" x1="165" y1="168" x2="165" y2="182"/><polygon class="ah" points="159,181 171,181 165,189"/>
<line class="ln-d" x1="290" y1="40" x2="318" y2="62"/>
</svg><figcaption>The four steps of resolving a conflict, top to bottom: the merge stops with a conflict, you edit the file and remove every marker, git add marks the file resolved, and git commit creates the merge commit. At any point before committing, git merge --abort, on the right, cancels the whole merge.</figcaption></figure>

<h4>The escape hatch: <code>git merge --abort</code></h4>
<p>Feeling lost in the middle of a conflict? <code>git merge --abort</code> cancels the merge and puts everything back exactly as it was before you typed <code>git merge</code>. Nothing is lost. You can think, talk to your teammate, and try again later.</p>

<h4>Errors you might meet</h4>
<ul>
<li><b><code>Committing is not possible because you have unmerged files</code></b>: you ran <code>git commit</code> before <code>git add</code>. Stage the fixed file first.</li>
<li><b>A warning that the file still contains conflict markers</b>: you staged it without removing every <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code> or <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> line. Edit it again.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Leaving a marker line in the file and committing. Real Git does not always stop you, and the markers end up in your website or break your code. Before <code>git add</code>, read the whole file once more and search for <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>.</div>
<div class="tip"><b>Tip</b>Conflicts are routine on any team, not emergencies. Small, frequent merges keep them small. A branch that lives for weeks without merging collects big, painful conflicts.</div>
<div class="try"><b>Try it in your head</b>On main, line 3 of <code>about.html</code> changes. On a feature branch, line 10 of the same file changes. Will merging conflict? No: different lines, so Git combines both edits automatically. Conflicts need the same lines changed differently on both sides.</div>

<h4>Recap</h4>
<ul>
<li>A conflict happens when both branches change the same lines differently; Git pauses the merge and asks you.</li>
<li>Between <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> and <code>=======</code> is your branch's version; between <code>=======</code> and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> is the incoming one.</li>
<li>Edit the file to the final content and remove every marker line.</li>
<li><code>git add</code> marks the file resolved; <code>git commit</code> finishes the merge (no <code>-m</code> needed).</li>
<li><code>git merge --abort</code> cancels and returns to how things were before.</li>
</ul>
`);

explain('g8',`
<h4>Why you need a remote</h4>
<p>Everything so far has lived in the <code>.git</code> folder on your own computer. That has two problems. If your laptop dies, the whole history dies with it. And nobody else can see or add to your work. Teams need one shared place where everyone's commits meet.</p>
<p>That shared place is a <b>remote</b>: another copy of the same repository, stored somewhere else, usually on GitHub. You send your commits to it and collect other people's commits from it. Your local repository and the remote are full equals; each holds its own copy of the history, and you keep them in step by hand.</p>
<div class="analogy"><b>Think of it like</b>A shared folder in the cloud that does not sync on its own. You decide when to upload (push) and when to download (pull). Until you do, the two copies can quietly drift apart.</div>

<h4>Connecting: <code>git remote add origin</code></h4>
<pre class="snip">git remote add origin https://github.com/you/portfolio.git</pre>
<p>This saves a nickname for a web address. <code>origin</code> is the nickname; the URL is where the repository lives on GitHub. From now on you can say <code>origin</code> instead of typing the URL. "origin" is only a convention, but it is so universal that you should use it for your main remote. <code>git remote -v</code> lists the remotes you have saved.</p>
<p>On a real computer, you first create an empty repository on github.com to get that URL. GitHub URLs come in two styles: HTTPS (<code>https://github.com/...</code>) and SSH (<code>git@github.com:...</code>). Both work. GitHub no longer accepts your account password for pushes, so you sign in with a browser login, a personal access token or an SSH key. The sandbox skips that step.</p>

<h4>Pushing for the first time: <code>git push -u origin main</code></h4>
<p><b>Pushing</b> uploads commits from your branch to the remote. Let's read the command word by word:</p>
<ol>
<li><code>push</code>: send commits.</li>
<li><code>origin</code>: to the remote with that nickname.</li>
<li><code>main</code>: the branch to send. GitHub will get a branch called <code>main</code> with the same commits.</li>
<li><code>-u</code>, short for <code>--set-upstream</code>: remember this pairing. Your local <code>main</code> now has an <b>upstream</b>, <code>origin/main</code>. Afterwards, plain <code>git push</code> and <code>git pull</code> know where to go without you naming it.</li>
</ol>
<p>You only need <code>-u</code> once per branch. After that, <code>git push</code> on its own is enough.</p>

<h4><code>origin/main</code>: your notebook about GitHub</h4>
<p>After the push, the graph panel shows a new label, <code>origin/main</code>. This is a <b>remote-tracking branch</b>. It is not the branch on GitHub itself. It is your local note of where GitHub's <code>main</code> was <i>the last time you checked</i>. Git updates that note only when you talk to the remote: on push, fetch or pull.</p>
<p>That is why <code>git status</code> can say "Your branch is up to date with 'origin/main'" even when a teammate pushed five minutes ago: your notebook is out of date, not your eyes.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Your computer holds main and origin/main; GitHub holds its own main">
<rect class="bx" x="10" y="20" width="170" height="160" rx="8"/><text class="t-b" x="95" y="44" text-anchor="middle">Your computer</text>
<rect class="bx-info" x="250" y="20" width="160" height="160" rx="8"/><text class="t-b" x="330" y="44" text-anchor="middle">GitHub: origin</text>
<rect class="bx-ok" x="110" y="62" width="50" height="24" rx="6"/><text class="t-b" x="135" y="79" text-anchor="middle">main</text>
<line class="ln" x1="121" y1="110" x2="70" y2="110"/>
<circle class="bx-a" cx="55" cy="110" r="14"/><text class="t-s" x="55" y="115" text-anchor="middle">C1</text>
<circle class="bx-a" cx="135" cy="110" r="14"/><text class="t-s" x="135" y="115" text-anchor="middle">C2</text>
<line class="ln-d" x1="55" y1="126" x2="55" y2="138"/><text class="t-s t-info" x="55" y="154" text-anchor="middle">origin/main</text>
<text class="t-s" x="55" y="171" text-anchor="middle">last seen</text>
<rect class="bx-ok" x="305" y="62" width="50" height="24" rx="6"/><text class="t-b" x="330" y="79" text-anchor="middle">main</text>
<circle class="bx-a" cx="330" cy="110" r="14"/><text class="t-s" x="330" y="115" text-anchor="middle">C1</text>
<line class="ln-a" x1="184" y1="96" x2="238" y2="96"/><polygon class="ah-a" points="236,90 236,102 246,96"/><text class="t-s" x="215" y="88" text-anchor="middle">push</text>
<line class="ln-ok" x1="192" y1="140" x2="246" y2="140"/><polygon class="ah-ok" points="194,134 194,146 184,140"/><text class="t-s" x="215" y="132" text-anchor="middle">fetch</text>
</svg><figcaption>You made commit C2 locally. GitHub still only has C1, and your origin/main label remembers that GitHub's main was on C1 when you last checked. git push sends C2 up and moves both GitHub's main and your origin/main to it. git fetch brings down anything new from GitHub.</figcaption></figure>

<h4>Downloading: <code>git fetch</code> and <code>git pull</code></h4>
<ul>
<li><code>git fetch</code> downloads new commits from the remote and updates <code>origin/main</code>. It does <b>not</b> touch your files or your own <code>main</code>. It is always safe: it just refreshes your notebook so you can look before you act.</li>
<li><code>git pull</code> is <code>git fetch</code> followed by <code>git merge origin/main</code>. It downloads, then merges the remote's work into your current branch, exactly like the merges from earlier lessons: a fast-forward if you have no new commits, a merge commit if you both do.</li>
</ul>

<h4>When your push is rejected</h4>
<p>In this lesson, right after your first push, a teammate called Ada pushes a commit that adds a README. You do not have it. Then you commit your own change and push:</p>
<pre class="snip">$ git push
 ! [rejected]        main -&gt; main (fetch first)
error: failed to push some refs to 'https://github.com/you/portfolio.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally.</pre>
<p>Why does GitHub refuse? A push is only allowed if it is a <b>fast-forward</b> for the remote: your commits must sit on top of everything GitHub already has. Yours do not. GitHub's <code>main</code> has Ada's commit, and your <code>main</code> has your commit instead. If GitHub accepted your push, its <code>main</code> label would jump to your commit and Ada's work would fall off the branch.</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Your main and GitHub's main each have a commit the other lacks">
<text class="t-b" x="10" y="65">your main</text><text class="t-b" x="10" y="145">GitHub main</text>
<line class="ln" x1="236" y1="60" x2="174" y2="60"/><line class="ln" x1="236" y1="140" x2="174" y2="140"/>
<circle class="bx-a" cx="160" cy="60" r="14"/><text class="t-s" x="160" y="65" text-anchor="middle">C1</text>
<circle class="bx-a" cx="250" cy="60" r="14"/><text class="t-s" x="250" y="65" text-anchor="middle">L</text>
<circle class="bx-a" cx="160" cy="140" r="14"/><text class="t-s" x="160" y="145" text-anchor="middle">C1</text>
<circle class="bx-ok" cx="250" cy="140" r="14"/><text class="t-s" x="250" y="145" text-anchor="middle">T</text>
<text class="t-s" x="275" y="65">your heading</text><text class="t-s" x="275" y="145">Ada's README</text>
<line class="ln-d" x1="10" y1="100" x2="410" y2="100"/>
<text class="t-b t-bad" x="210" y="190" text-anchor="middle">Push refused: it would drop T</text>
</svg><figcaption>Both copies start from C1. Your main added L, your heading change. GitHub's main added T, Ada's README. Neither contains the other, so pushing L would throw T away, and GitHub refuses.</figcaption></figure>

<h4>The fix: pull, then push</h4>
<pre class="snip">git pull    # fetch Ada's commit and merge it with yours
git push    # now your main contains everything GitHub has</pre>
<p>After <code>git pull</code>, your <code>main</code> has a merge commit whose two parents are your commit and Ada's. It contains both changes. Now your history sits on top of GitHub's, so the push is a fast-forward and succeeds. If you and Ada had changed the same lines, the pull would stop with a merge conflict, and you would resolve it exactly as in the previous lesson.</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="After pull and push, a merge commit with parents L and T is on both copies">
<line class="ln" x1="74" y1="98" x2="166" y2="56"/><line class="ln" x1="74" y1="110" x2="166" y2="152"/>
<line class="ln-ok" x1="194" y1="56" x2="286" y2="98"/><line class="ln-ok" x1="194" y1="152" x2="286" y2="110"/>
<circle class="bx-a" cx="60" cy="104" r="15"/><text class="t-s" x="60" y="109" text-anchor="middle">C1</text>
<circle class="bx-a" cx="180" cy="50" r="15"/><text class="t-s" x="180" y="55" text-anchor="middle">L</text>
<circle class="bx-ok" cx="180" cy="158" r="15"/><text class="t-s" x="180" y="163" text-anchor="middle">T</text>
<circle class="bx-ok" cx="300" cy="104" r="17"/><text class="t-b" x="300" y="109" text-anchor="middle">M</text>
<rect class="bx-ok" x="330" y="64" width="60" height="26" rx="6"/><text class="t-b" x="360" y="82" text-anchor="middle">main</text>
<rect class="bx-info" x="324" y="118" width="90" height="26" rx="6"/><text class="t-s" x="369" y="136" text-anchor="middle">origin/main</text>
<text class="t-s" x="180" y="24" text-anchor="middle">yours</text><text class="t-s" x="180" y="196" text-anchor="middle">Ada's</text>
</svg><figcaption>git pull made merge commit M, whose parents are your commit L and Ada's commit T. git push then sent M to GitHub, so main and origin/main both point at M and the two copies match again.</figcaption></figure>
<div class="tip"><b>Tip</b>On a real computer, newer versions of Git may stop a pull like this and ask how to combine diverged branches, with a hint mentioning <code>pull.rebase</code>. Running <code>git config --global pull.rebase false</code> once tells Git to merge, which is the behaviour this lesson uses. The other choice, rebasing, comes in an advanced lesson.</div>
<div class="mistake"><b>Common mistake</b>Answering a rejected push with <code>git push --force</code>. Force makes GitHub accept your history and throw away whatever does not fit, which here means deleting Ada's commit for the whole team. A rejected push almost always means: pull first. Never reach for <code>--force</code> on a shared branch.</div>

<h4>A daily rhythm</h4>
<p>Start your session with <code>git pull</code> so you build on the latest work. Commit as you go. Push when a piece of work is done, so others can see it and your work is backed up. Pull again before you push if it has been a while.</p>
<div class="try"><b>Try it in your head</b>You run <code>git fetch</code> and see that <code>origin/main</code> is two commits ahead of your <code>main</code>. Have your files changed? No. Fetch only updated your notebook. Your files change when you merge, for example with <code>git pull</code>, which here would be a simple fast-forward because you have no new commits of your own.</div>

<h4>Recap</h4>
<ul>
<li>A remote is another copy of the repository, usually on GitHub; <code>origin</code> is the conventional name, added with <code>git remote add origin URL</code>.</li>
<li><code>git push -u origin main</code> uploads main and sets its upstream; afterwards plain <code>git push</code> works.</li>
<li><code>origin/main</code> is your local record of GitHub's main, updated by push, fetch and pull.</li>
<li><code>git fetch</code> downloads without changing your files; <code>git pull</code> is fetch plus merge.</li>
<li>"Updates were rejected" means the remote has commits you lack: pull, then push. Do not force.</li>
</ul>
`);

explain('g9',`
<h4>Why teams do not push straight to main</h4>
<p>In the last lesson you pushed commits directly onto <code>main</code> on GitHub. On a real team that is risky. <code>main</code> is usually the version that gets deployed to real users. One unreviewed typo can take a website down. So most teams protect <code>main</code> and agree on a routine: nobody changes it directly. Every change goes through a <b>pull request</b> first.</p>
<p>A <b>pull request</b>, or <b>PR</b>, is a request on GitHub that says: "here is my branch; please review it, and if it is good, merge it into <code>main</code>". The name comes from asking the project to <i>pull</i> your changes in. GitLab calls the same thing a <b>merge request</b>.</p>
<div class="analogy"><b>Think of it like</b>An editor checking an article before it is printed. You write the draft separately, hand it in, the editor leaves comments, you make fixes, and only then does it go into the newspaper.</div>

<h4>What happens inside a pull request</h4>
<p>A PR page on GitHub shows three things:</p>
<ul>
<li><b>The changes</b>: every commit on your branch and a diff of every file, so reviewers can read your work line by line.</li>
<li><b>The conversation</b>: teammates leave comments, ask questions and finally <b>approve</b> or <b>request changes</b>. If you push more commits to the same branch, the PR updates automatically.</li>
<li><b>Checks</b>: automated jobs, often GitHub Actions, that run your tests and other checks on every push. A red cross means something failed.</li>
</ul>
<p>When the reviewers are happy and the checks pass, someone clicks <b>Merge pull request</b>. GitHub performs the merge on its own copy of the repository.</p>

<h4>GitHub Flow, step by step</h4>
<p>The routine is called <b>GitHub Flow</b>. It is just the branch, commit, push and merge skills you already have, put in a fixed order:</p>
<figure class="fig"><svg viewBox="0 0 420 280" role="img" aria-label="GitHub Flow: branch, commit, push, open PR, review, merge, pull main, delete branch">
<g text-anchor="middle">
<rect class="bx" x="10" y="20" width="110" height="40" rx="8"/><text class="t" x="65" y="45">1 branch</text>
<rect class="bx" x="155" y="20" width="110" height="40" rx="8"/><text class="t" x="210" y="45">2 commit</text>
<rect class="bx" x="300" y="20" width="110" height="40" rx="8"/><text class="t" x="355" y="45">3 push</text>
<rect class="bx-info" x="300" y="105" width="110" height="40" rx="8"/><text class="t" x="355" y="130">4 open PR</text>
<rect class="bx-info" x="155" y="105" width="110" height="40" rx="8"/><text class="t" x="210" y="130">5 review</text>
<rect class="bx-info" x="10" y="105" width="110" height="40" rx="8"/><text class="t" x="65" y="130">6 merge</text>
<rect class="bx-ok" x="10" y="190" width="110" height="40" rx="8"/><text class="t" x="65" y="215">7 pull main</text>
<rect class="bx-ok" x="155" y="190" width="150" height="40" rx="8"/><text class="t" x="230" y="215">8 delete branch</text>
<text class="t-s" x="210" y="266">Grey and green: your computer. Blue: GitHub.</text>
</g>
<line class="ln" x1="120" y1="40" x2="146" y2="40"/><polygon class="ah" points="145,34 145,46 154,40"/>
<line class="ln" x1="265" y1="40" x2="291" y2="40"/><polygon class="ah" points="290,34 290,46 299,40"/>
<line class="ln" x1="355" y1="60" x2="355" y2="96"/><polygon class="ah" points="349,95 361,95 355,104"/>
<line class="ln" x1="300" y1="125" x2="274" y2="125"/><polygon class="ah" points="275,119 275,131 266,125"/>
<line class="ln" x1="155" y1="125" x2="129" y2="125"/><polygon class="ah" points="130,119 130,131 121,125"/>
<line class="ln" x1="65" y1="145" x2="65" y2="181"/><polygon class="ah" points="59,180 71,180 65,189"/>
<line class="ln" x1="120" y1="210" x2="146" y2="210"/><polygon class="ah" points="145,204 145,216 154,210"/>
</svg><figcaption>GitHub Flow. On your computer you create a branch, commit and push it. On GitHub you open a pull request, teammates review it, and it is merged. Back on your computer you pull main to get the merged work and delete the finished branch.</figcaption></figure>
<p>Let's walk through the lesson's version, adding a contact page.</p>

<h4>Steps 1 to 3: branch, commit, push the branch</h4>
<pre class="snip">git switch -c feature/contact             # 1. new branch for this one job
git add . &amp;&amp; git commit -m "Add contact page"   # 2. commit on it
git push -u origin feature/contact        # 3. upload the BRANCH</pre>
<p>The new part is step 3. In the last lesson you pushed <code>main</code>. Here you push your feature branch, so GitHub gets a branch called <code>feature/contact</code> alongside its <code>main</code>. The <code>-u</code> sets the upstream, as before, so later pushes from this branch are just <code>git push</code>. A PR needs the branch to exist on GitHub, because reviewers cannot see your laptop.</p>

<h4>Step 4: open the pull request</h4>
<p>On github.com, after a push you see a yellow banner with a <b>Compare &amp; pull request</b> button. This sandbox uses <code>gh</code> instead, GitHub's official command-line tool, which does the same from the terminal:</p>
<pre class="snip">gh pr create --title "Add contact page"</pre>
<p>A PR goes <i>from</i> a branch (your <code>feature/contact</code>) <i>into</i> a base branch (normally <code>main</code>). Give it a clear title and, on a real project, a description: what changed, why, and how to test it. On a real computer, <code>gh</code> asks for anything you did not pass as an option, such as the description, which <code>--body</code> provides. You need to sign in once with <code>gh auth login</code>.</p>
<p>Every PR gets a number. This is the first one in the repository, so it is <code>#1</code>.</p>

<h4>Steps 5 and 6: review and merge</h4>
<p>In a real team, now you wait for review. You answer comments, push fixes to the same branch, and the PR updates. When it is approved:</p>
<pre class="snip">gh pr merge 1</pre>
<p>This merges PR number 1 on GitHub. On a real computer <code>gh</code> asks which kind of merge you want: a normal merge commit, a <b>squash</b> (all your commits combined into one) or a <b>rebase</b>. Teams usually pick one style and stick to it; the website's merge button offers the same choices.</p>

<h4>Step 7: the merge happened on GitHub, not on your laptop</h4>
<p>This catches everyone out at first. After merging, GitHub's <code>main</code> contains your contact page. Your local <code>main</code> does not. Nothing has changed on your computer, because the merge was done on GitHub's copy.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="GitHub's main has the merged PR; your local main does not until you pull">
<g text-anchor="middle">
<text class="t-b" x="100" y="22">GitHub main</text><text class="t-b" x="320" y="22">your main</text>
<rect class="bx-ok" x="10" y="36" width="180" height="36" rx="6"/><text class="t-s" x="100" y="59">Merge pull request #1</text>
<rect class="bx-ok" x="10" y="80" width="180" height="36" rx="6"/><text class="t-s" x="100" y="103">Add contact page</text>
<rect class="bx" x="10" y="124" width="180" height="36" rx="6"/><text class="t-s" x="100" y="147">Add homepage</text>
<rect class="ln-d" x="230" y="36" width="180" height="36" rx="6" fill="none"/><text class="t-s" x="320" y="59">missing</text>
<rect class="ln-d" x="230" y="80" width="180" height="36" rx="6" fill="none"/><text class="t-s" x="320" y="103">missing</text>
<rect class="bx" x="230" y="124" width="180" height="36" rx="6"/><text class="t-s" x="320" y="147">Add homepage</text>
<text class="t-m t-ok" x="210" y="190">git switch main, git pull</text>
</g>
</svg><figcaption>Right after merging on GitHub, GitHub's main has two new commits: your contact page and the merge commit for pull request number 1. Your local main still ends at Add homepage. Switching to main and running git pull downloads the two missing commits.</figcaption></figure>
<pre class="snip">git switch main
git pull</pre>
<p>Now your local <code>main</code> matches GitHub, <code>contact.html</code> is in your folder, and you are ready to start the next branch from up-to-date code.</p>

<h4>Step 8: tidy up</h4>
<pre class="snip">git branch -d feature/contact</pre>
<p>Because you pulled the merged work, Git can see that every commit on <code>feature/contact</code> is now in <code>main</code>, so <code>-d</code> deletes it without complaint. GitHub's copy of the branch can be removed with the <b>Delete branch</b> button on the PR page.</p>
<div class="mistake"><b>Common mistake</b>Running <code>git branch -d</code> before pulling, and getting "not fully merged". Your local <code>main</code> does not have the merge yet, so Git thinks the work would be lost. Pull first. (If your team squash-merges, the squashed commit has a different id, so Git may still refuse. Once you have checked the PR really is merged, <code>-D</code> is safe in that case.)</div>
<div class="tip"><b>Tip</b>Keep pull requests small. A PR that changes 50 lines gets a careful review in minutes. A PR that changes 2,000 lines gets skimmed, and bugs slip through.</div>
<div class="try"><b>Try it in your head</b>Your PR has a review comment asking you to fix a typo. Do you need to open a new PR? No. Fix the typo on the same branch, commit, and <code>git push</code>. The existing PR updates with the new commit automatically.</div>

<h4>Recap</h4>
<ul>
<li>A pull request asks for your branch to be reviewed and merged into <code>main</code>; it shows the diff, a conversation and automated checks.</li>
<li>GitHub Flow: branch, commit, push the branch, open a PR, review, merge, pull main, delete the branch.</li>
<li><code>git push -u origin feature/name</code> puts your branch on GitHub; <code>gh pr create</code> and <code>gh pr merge</code> do from the terminal what the website buttons do.</li>
<li>The merge happens on GitHub, so your local <code>main</code> only gets it after <code>git switch main</code> and <code>git pull</code>.</li>
<li>Delete merged branches with <code>git branch -d</code>, after pulling.</li>
</ul>
`);

explain('g10',`
<h4>Three tools for three awkward moments</h4>
<p>By now you can commit, branch, merge and share. This lesson covers three situations that come up every week on a real team:</p>
<ul>
<li>You are halfway through something and need a clean folder <i>right now</i>, without committing half-done work. That is <b>stash</b>.</li>
<li>A commit that is already on GitHub turns out to be wrong, and teammates already have it. That is <b>revert</b>.</li>
<li>You made some local commits you want to throw away completely. That is <b>reset</b>, which you met briefly in the undo lesson.</li>
</ul>
<p>The sandbox starts with three commits that each change <code>app.js</code>: "Create app", "Add login" and "Add dashboard".</p>

<h4>Stash: a shelf for unfinished work</h4>
<p>Picture this. You are editing <code>app.js</code> when someone asks you to check something on another branch. Your edit is not ready to commit. Switching might be refused ("your local changes would be overwritten"), and even if it is allowed, your half-done edit would come along to the other branch.</p>
<p><code>git stash</code> takes all your uncommitted changes to tracked files, staged and unstaged, saves them on a private shelf inside <code>.git</code>, and resets your folder to match the last commit. Your working tree is clean. Later, <code>git stash pop</code> takes the changes off the shelf and puts them back.</p>
<div class="analogy"><b>Think of it like</b>A drawer in your desk. Someone needs the desk urgently, so you sweep your papers into the drawer. When they leave, you take the papers out and carry on exactly where you were.</div>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="git stash moves changes from the working directory to a shelf; git stash pop brings them back">
<g text-anchor="middle">
<rect class="bx" x="10" y="30" width="160" height="140" rx="8"/><text class="t-b" x="90" y="56">Working dir</text>
<rect class="bx-a" x="25" y="76" width="130" height="34" rx="6"/><text class="t-s" x="90" y="98">app.js: v4 wip</text>
<text class="t-s" x="90" y="136">after stash:</text><text class="t-s" x="90" y="154">clean</text>
<rect class="bx-warn" x="250" y="30" width="160" height="140" rx="8"/><text class="t-b" x="330" y="56">Stash shelf</text>
<rect class="bx" x="265" y="76" width="130" height="34" rx="6"/><text class="t-m" x="330" y="98">stash@{0}</text>
<rect class="bx" x="265" y="118" width="130" height="34" rx="6"/><text class="t-m" x="330" y="140">stash@{1}</text>
<text class="t-s" x="210" y="80">git stash</text><text class="t-s" x="210" y="130">stash pop</text>
</g>
<line class="ln-a" x1="174" y1="92" x2="238" y2="92"/><polygon class="ah-a" points="236,86 236,98 246,92"/>
<line class="ln-ok" x1="184" y1="142" x2="246" y2="142"/><polygon class="ah-ok" points="186,136 186,148 176,142"/>
</svg><figcaption>git stash moves your uncommitted edits off the desk onto a shelf, leaving the working directory clean. The newest shelf entry is called stash@{0}, the one before it stash@{1}, and so on. git stash pop moves the newest entry back into your files and removes it from the shelf.</figcaption></figure>
<pre class="snip">git stash         # shelve: working tree becomes clean
git stash list    # stash@{0}: WIP on main: 3c1e9a0 Add dashboard
git stash pop     # bring the newest entry back and remove it from the shelf</pre>
<p>A few details worth knowing:</p>
<ul>
<li>The shelf is a stack. The newest entry is <code>stash@{0}</code>, and <code>pop</code> always takes the top one first.</li>
<li>"WIP" means "work in progress". <code>git stash push -m "half-done filters"</code> gives an entry a clearer name.</li>
<li>By default, brand-new untracked files are <b>not</b> stashed. Add <code>-u</code> (<code>git stash -u</code>) to include them.</li>
<li>The stash is local only. It is never pushed to GitHub, so do not use it as long-term storage.</li>
<li>If the popped changes clash with the current files, you get a normal conflict to resolve, and the entry stays on the shelf until you drop it with <code>git stash drop</code>.</li>
</ul>

<h4>Committing tracked changes in one step: <code>-am</code></h4>
<p>After popping, the lesson commits with <code>git commit -am "Add settings page"</code>. The <code>-a</code> option means "stage every modified tracked file first", and <code>-m</code> is the message, so <code>-am</code> combines them. It skips <code>git add</code> for files Git already knows. It does not pick up brand-new files; those still need <code>git add</code>.</p>

<h4>Revert: undo by adding a commit</h4>
<p>Suppose "Add settings page" has been pushed, and it breaks something. In the undo lesson you learned that resetting pushed commits causes trouble, because teammates have them. The safe tool is <code>git revert</code>.</p>
<pre class="snip">git revert HEAD</pre>
<p><code>git revert</code> works out exactly what the chosen commit changed, and makes a <b>new commit that does the opposite</b>. If the commit added a line, the revert removes it; if it removed one, the revert puts it back. The new commit's message is <code>Revert "Add settings page"</code>, and its description notes which commit it reverses. On a real computer an editor opens so you can explain why; <code>--no-edit</code> accepts the default.</p>
<p>The original commit stays in the history. Nothing is rewritten. Teammates just pull one more ordinary commit. That is why revert is safe on shared branches. You can revert any commit by its id, not just <code>HEAD</code>: <code>git revert 3c1e9a0</code>.</p>

<h4>Reset: move the branch back</h4>
<p><code>git reset</code> does something completely different. It moves the branch label itself back to an earlier commit. Later commits are no longer part of the branch, as if they never happened. With <code>--hard</code>, your files are also reset to match, and any uncommitted changes are destroyed.</p>
<p>In the lesson, after reverting, you run <code>git reset --hard HEAD~1</code>. <code>HEAD~1</code> is the commit before the revert, so this simply drops the revert commit and puts "Add settings page" back on top.</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="Revert adds an undo commit; reset moves the branch back and drops a commit">
<text class="t-m" x="10" y="75">revert</text><text class="t-m" x="10" y="185">reset</text>
<line class="ln" x1="110" y1="70" x2="390" y2="70"/><line class="ln" x1="110" y1="180" x2="270" y2="180"/>
<line class="ln-d" x1="265" y1="180" x2="304" y2="180"/>
<g text-anchor="middle">
<circle class="bx-a" cx="110" cy="70" r="15"/><text class="t-s" x="110" y="75">v1</text>
<circle class="bx-a" cx="180" cy="70" r="15"/><text class="t-s" x="180" y="75">v2</text>
<circle class="bx-a" cx="250" cy="70" r="15"/><text class="t-s" x="250" y="75">v3</text>
<circle class="bx-a" cx="320" cy="70" r="15"/><text class="t-s" x="320" y="75">S</text>
<circle class="bx-ok" cx="390" cy="70" r="15"/><text class="t-s" x="390" y="75">R</text>
<rect class="bx-ok" x="360" y="20" width="60" height="26" rx="6"/><text class="t-b" x="390" y="38">main</text>
<text class="t-s" x="390" y="104">undoes S</text>
<text class="t-s t-ok" x="230" y="130">History grows: safe to share</text>
<circle class="bx-a" cx="110" cy="180" r="15"/><text class="t-s" x="110" y="185">v1</text>
<circle class="bx-a" cx="180" cy="180" r="15"/><text class="t-s" x="180" y="185">v2</text>
<circle class="bx-a" cx="250" cy="180" r="15"/><text class="t-s" x="250" y="185">v3</text>
<circle class="ln-d" cx="320" cy="180" r="15" fill="none"/><text class="t-s" x="320" y="185">S</text>
<rect class="bx-ok" x="220" y="142" width="60" height="22" rx="6"/><text class="t-b" x="250" y="158">main</text>
<text class="t-s t-bad" x="230" y="226">History rewritten: local only</text>
</g>
</svg><figcaption>Top: git revert keeps commit S, "Add settings page", and adds a new commit R that undoes it, so the history only grows. Bottom: git reset moves main back to v3, and commit S drops off the branch, which rewrites history.</figcaption></figure>

<h4>Revert or reset?</h4>
<div class="tbl-wrap"><table><tr><th></th><th><code>git revert</code></th><th><code>git reset</code></th></tr>
<tr><td>How it undoes</td><td>Adds a new commit that cancels an old one</td><td>Moves the branch back; later commits leave it</td></tr>
<tr><td>Rewrites history?</td><td>No</td><td>Yes</td></tr>
<tr><td>Safe on shared branches?</td><td>Yes</td><td>No</td></tr>
<tr><td>Use it for</td><td>Undoing something already pushed</td><td>Cleaning up your own unpushed commits</td></tr></table></div>
<p>A simple rule: if the commit has left your computer, revert it. If it has not, reset is fine.</p>

<h4>Errors and safety nets</h4>
<ul>
<li><b><code>your local changes would be overwritten by revert</code></b>: revert needs a clean working tree. Commit or stash first.</li>
<li><b>Lost commits after a hard reset</b>: a reset does not delete commits straight away; they are just no longer on a branch. <code>git reflog</code> lists every commit HEAD has recently pointed at, so you can find the id and run <code>git reset --hard &lt;id&gt;</code> to get it back. Uncommitted edits destroyed by <code>--hard</code> are not recoverable.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Fixing a bad pushed commit with <code>git reset --hard HEAD~1</code> and then <code>git push --force</code>. Your teammates still have the commit, their next pull gets confused, and anything they built on it is at risk. On shared branches, revert.</div>
<div class="mistake"><b>Common mistake</b>Stashing, getting distracted, and forgetting. Weeks later the work is still on the shelf, and nobody else can see it. Run <code>git stash list</code> now and then, and pop or commit what you find.</div>
<div class="try"><b>Try it in your head</b>Your history is A, B, C, all pushed. B introduced a bug. What does <code>git revert B</code> produce? A new commit D on top of C that removes B's changes. The history becomes A, B, C, D, and nobody's copy is rewritten.</div>

<h4>Recap</h4>
<ul>
<li><code>git stash</code> shelves uncommitted changes and cleans the working tree; <code>git stash list</code> shows the shelf; <code>git stash pop</code> brings the newest back.</li>
<li><code>git commit -am</code> stages modified tracked files and commits in one step.</li>
<li><code>git revert &lt;commit&gt;</code> adds a new commit that undoes an old one, without rewriting history: safe for pushed work.</li>
<li><code>git reset --hard HEAD~1</code> moves the branch back and discards changes: local, unpushed work only.</li>
<li><code>git reflog</code> can find commits that a reset removed from a branch.</li>
</ul>
`);

explain('g11',`
<h4>Two more ways to move commits around</h4>
<p>Merging is not the only way to combine work. This lesson adds two tools professionals use every day:</p>
<ul>
<li><b>Rebase</b> moves a whole branch so it starts from a newer commit, giving a straight, tidy history.</li>
<li><b>Cherry-pick</b> copies one single commit from anywhere onto your current branch.</li>
</ul>
<p>Both work by <b>replaying</b> changes: Git looks at what a commit changed, and applies the same change somewhere else, making a new commit. Understanding that one idea explains everything else in this lesson, including why rebasing shared work is dangerous.</p>

<h4>The starting picture</h4>
<p>The sandbox has three branches. <code>feature/api</code> split off from "Init app" and has two commits, "Add API client" and "Add retries". Meanwhile <code>main</code> moved on with "Add README". A third branch, <code>hotfix</code>, holds a security fix. You are on <code>feature/api</code>.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="feature/api branches from an older main; main has moved on">
<line class="ln" x1="75" y1="150" x2="165" y2="150"/><line class="ln" x1="72" y1="139" x2="168" y2="71"/><line class="ln" x1="195" y1="60" x2="275" y2="60"/>
<g text-anchor="middle">
<circle class="bx-a" cx="60" cy="150" r="15"/><text class="t-s" x="60" y="155">C1</text>
<circle class="bx-a" cx="180" cy="150" r="15"/><text class="t-s" x="180" y="155">C4</text>
<circle class="bx-a" cx="180" cy="60" r="15"/><text class="t-s" x="180" y="65">C2</text>
<circle class="bx-a" cx="290" cy="60" r="15"/><text class="t-s" x="290" y="65">C3</text>
<text class="t-s" x="60" y="186">Init app</text><text class="t-s" x="180" y="186">Add README</text>
<text class="t-s" x="180" y="30">API client</text><text class="t-s" x="290" y="30">retries</text>
<rect class="bx-ok" x="205" y="137" width="60" height="26" rx="6"/><text class="t-b" x="235" y="155">main</text>
<rect class="bx-info" x="314" y="47" width="100" height="26" rx="6"/><text class="t-b" x="364" y="65">feature/api</text>
<rect class="bx-dark" x="332" y="90" width="64" height="26" rx="6"/><text class="t-term" x="364" y="108">HEAD</text>
</g>
<line class="ln" x1="364" y1="90" x2="364" y2="80"/><polygon class="ah" points="358,82 370,82 364,74"/>
</svg><figcaption>Before rebasing. main went from C1, Init app, to C4, Add README. feature/api split off from C1 earlier and has C2, API client, and C3, retries. You are on feature/api, so it does not yet have the README.</figcaption></figure>

<h4>Rebase: "as if I had started today"</h4>
<p>You could merge <code>main</code> into your feature, which would add a merge commit. Rebase takes a different approach. Running <code>git rebase main</code> while on <code>feature/api</code> does this:</p>
<ol>
<li>Find the commits on your branch that <code>main</code> does not have: C2 and C3.</li>
<li>Set them aside, and move your branch to the tip of <code>main</code>, C4.</li>
<li>Replay C2's change on top of C4, making a new commit, C2 prime. Then replay C3's change on top of that, making C3 prime.</li>
<li>Point <code>feature/api</code> at the last new commit.</li>
</ol>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="After rebase, new copies of the feature commits sit on top of main">
<line class="ln" x1="55" y1="150" x2="125" y2="150"/><line class="ln-ok" x1="155" y1="150" x2="235" y2="150"/><line class="ln-ok" x1="265" y1="150" x2="345" y2="150"/>
<line class="ln-d" x1="52" y1="139" x2="128" y2="71"/><line class="ln-d" x1="155" y1="60" x2="235" y2="60"/>
<g text-anchor="middle">
<circle class="bx-a" cx="40" cy="150" r="15"/><text class="t-s" x="40" y="155">C1</text>
<circle class="bx-a" cx="140" cy="150" r="15"/><text class="t-s" x="140" y="155">C4</text>
<circle class="ln-d" cx="140" cy="60" r="15" fill="none"/><text class="t-s" x="140" y="65">C2</text>
<circle class="ln-d" cx="250" cy="60" r="15" fill="none"/><text class="t-s" x="250" y="65">C3</text>
<text class="t-s" x="340" y="65">old copies</text>
<circle class="bx-ok" cx="250" cy="150" r="16"/><text class="t-s" x="250" y="155">C2'</text>
<circle class="bx-ok" cx="360" cy="150" r="16"/><text class="t-s" x="360" y="155">C3'</text>
<rect class="bx-ok" x="110" y="172" width="60" height="26" rx="6"/><text class="t-b" x="140" y="190">main</text>
<rect class="bx-info" x="310" y="102" width="100" height="26" rx="6"/><text class="t-b" x="360" y="120">feature/api</text>
<text class="t-s" x="250" y="190">new ids</text>
</g>
</svg><figcaption>After git rebase main. Git replayed the two feature commits on top of C4, creating new commits C2 prime and C3 prime with new ids. feature/api now points at C3 prime. The old C2 and C3, dashed, are no longer on any branch.</figcaption></figure>
<p>The changes are the same, but the commits are <b>new</b>. Their parent is different, and the id is a fingerprint that includes the parent, so every replayed commit gets a <b>new id</b>. You can check with <code>git log --oneline</code>: the messages are familiar, the ids are not.</p>
<div class="analogy"><b>Think of it like</b>Re-recording two songs on top of a newer backing track. The tunes are the same, but they are new recordings, and the old ones are no longer in the playlist.</div>

<h4>Why bother? A straight history</h4>
<p>Now switch to <code>main</code> and run <code>git merge feature/api</code>. Because the feature branch now starts from the tip of <code>main</code>, <code>main</code> has nothing the feature lacks, so the merge is a <b>fast-forward</b>: no merge commit. The project history is a single straight line, easy to read and easy to search.</p>
<div class="tbl-wrap"><table><tr><th></th><th>Merge</th><th>Rebase</th></tr>
<tr><td>History shape</td><td>True record, with merge commits</td><td>Straight line</td></tr>
<tr><td>Commit ids</td><td>Unchanged</td><td>New ids for replayed commits</td></tr>
<tr><td>Safe on shared branches?</td><td>Yes</td><td>No</td></tr>
<tr><td>Typical use</td><td>Combining shared branches</td><td>Tidying your own local work</td></tr></table></div>

<h4>The golden rule of rebasing</h4>
<p><b>Never rebase commits that other people already have.</b> Rebase throws away the old commits and creates new ones. If a teammate already pulled your old C2 and C3 and built on them, their history now refers to commits that no longer exist on your branch. When they next pull, Git sees two different versions of the same work, and the result is duplicated commits and confusing conflicts.</p>
<p>Rebasing your own unpushed commits is completely safe. If you rebase a branch that you pushed but nobody else uses, the next push must replace the old commits, which needs <code>git push --force-with-lease</code>. That flag forces the push, but refuses if someone else has pushed to the branch since you last fetched.</p>

<h4>When a rebase hits a conflict</h4>
<p>Replaying a commit can conflict, just like a merge. The rebase pauses on that commit. You fix the file exactly as in the conflicts lesson, then:</p>
<pre class="snip">git add file               # mark it resolved
git rebase --continue      # replay the remaining commits
git rebase --abort         # or: give up and return to how things were</pre>
<p>Note that it is <code>--continue</code>, not <code>git commit</code>. Because rebase replays one commit at a time, you may have to resolve conflicts more than once.</p>

<h4>Cherry-pick: copy one commit</h4>
<p>Sometimes you want one particular commit, not a whole branch. Here, <code>hotfix</code> contains "Patch XSS bug", an urgent security fix, and you want it on <code>main</code> right now without anything else from that branch.</p>
<pre class="snip">git log hotfix --oneline   # find the commit you want
git cherry-pick hotfix     # copy the commit at the tip of hotfix onto main</pre>
<p><code>git cherry-pick</code> takes a commit id or a branch name. A branch name means "the commit that branch points at". Git replays that one commit's change on top of your current branch, as a new commit with the same message and a new id. The <code>hotfix</code> branch itself is not merged; <code>main</code> just gains a copy of that one fix.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="cherry-pick copies the hotfix commit onto main as a new commit">
<line class="ln" x1="75" y1="150" x2="325" y2="150"/><line class="ln" x1="70" y1="138" x2="140" y2="72"/>
<path class="ln-d" d="M166 60H340V124"/><polygon class="ah-a" points="334,124 346,124 340,133"/>
<g text-anchor="middle">
<circle class="bx-a" cx="60" cy="150" r="15"/><text class="t-s" x="60" y="155">C4</text>
<circle class="bx-a" cx="150" cy="150" r="16"/><text class="t-s" x="150" y="155">C2'</text>
<circle class="bx-a" cx="240" cy="150" r="16"/><text class="t-s" x="240" y="155">C3'</text>
<circle class="bx-a" cx="150" cy="60" r="15"/><text class="t-s" x="150" y="65">C5</text>
<circle class="bx-ok" cx="340" cy="150" r="16"/><text class="t-s" x="340" y="155">C5'</text>
<text class="t-s t-a" x="260" y="50">cherry-pick</text>
<text class="t-s" x="150" y="28">hotfix: Patch XSS</text>
<text class="t-s" x="340" y="186">copy, new id</text>
<rect class="bx-ok" x="362" y="137" width="54" height="26" rx="6"/><text class="t-b" x="389" y="155">main</text>
</g>
</svg><figcaption>The hotfix branch holds C5, Patch XSS bug. git cherry-pick hotfix, run on main, replays just that commit's change on top of main as a new commit, C5 prime, with a new id. The hotfix branch is left as it was and is not merged.</figcaption></figure>
<p>Cherry-pick is handy for moving a fix onto a release branch, or rescuing one good commit from an abandoned branch. Do not use it to move lots of commits around: copies with different ids make history harder to follow.</p>
<div class="mistake"><b>Common mistake</b>Rebasing in the wrong direction. To update your feature, stand on the <b>feature</b> branch and run <code>git rebase main</code>. Standing on <code>main</code> and running <code>git rebase feature/api</code> would replay main's commits onto your feature and rewrite the shared branch.</div>
<div class="try"><b>Try it in your head</b>You rebase your local, unpushed branch onto main. Its two commits had ids <code>a1b2c3d</code> and <code>e4f5a6b</code>. Will they keep those ids? No. They are replayed onto a new parent, so both get new ids, even though their changes and messages are the same.</div>

<h4>Recap</h4>
<ul>
<li><code>git rebase main</code>, run on your feature branch, replays your commits on top of the latest main for a straight history.</li>
<li>Replayed commits are new commits with new ids; the originals drop off the branch.</li>
<li>Golden rule: never rebase commits others already have. Rebase local work; merge shared branches.</li>
<li>Rebase conflicts: fix, <code>git add</code>, <code>git rebase --continue</code>, or <code>git rebase --abort</code>.</li>
<li><code>git cherry-pick &lt;commit or branch&gt;</code> copies one commit onto your current branch as a new commit.</li>
</ul>
`);
