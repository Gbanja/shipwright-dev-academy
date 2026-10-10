/* Track 1: Git & GitHub */
const GIT_LESSONS=[
/* ---------------- BEGINNER ---------------- */
{id:'g1',lvl:'Beginner',title:'Meet Git',
concept:`<p><b>Git</b> is a version control system. It records snapshots of your project called <b>commits</b>, so you can see what changed, when, and why, and go back to any earlier version.</p>
<p><b>GitHub</b> is a website that hosts Git repositories online. Teams use it to share code, review each other's changes (pull requests) and automate work (GitHub Actions). Git runs on your computer; GitHub is where you put your repository so others can reach it.</p>
<h4>Key words</h4><ul><li><b>Repository (repo):</b> a project folder that Git is tracking. The history lives in a hidden <code>.git</code> folder.</li><li><b>Commit:</b> one saved snapshot, with a message and an author.</li><li><b>Config:</b> your name and email, stamped onto every commit you make.</li></ul>
<div class="tip"><b>Live-coding tip</b>Run <code>git status</code> often. It tells you where you are and usually what to type next.</div>`,
tasks:[
 {t:'Check which Git version is installed.',h:'git --version',c:()=>H(/^git (--version|version)$/)},
 {t:'Set your name for commits.',h:'git config --global user.name "Your Name"',c:()=>!!S.config['user.name']},
 {t:'Set your email for commits.',h:'git config --global user.email "you@example.com"',c:()=>!!S.config['user.email']},
 {t:'Turn this folder into a Git repository.',h:'git init',c:()=>S.inited},
 {t:'Ask Git where things stand.',h:'git status',c:()=>S.inited&&H(/^git status/)},
]},
{id:'g2',lvl:'Beginner',title:'Your first commit',
setup:r=>{r('git init')},
concept:`<p>Git has three areas. Learning to see them is the most important idea in this track.</p>
<div class="flow"><span>Working directory</span><em>git add →</em><span>Staging area</span><em>git commit →</em><span>Repository (history)</span></div>
<ul><li><b>Working directory:</b> the files you're editing right now.</li><li><b>Staging area:</b> the changes you've picked for the next commit. This lets you commit only part of your work.</li><li><b>Repository:</b> the permanent history of commits.</li></ul>
<p>Watch the <b>Files</b> panel while you work. It shows each file moving from <i>untracked</i> to <i>staged</i> to <i>committed</i>.</p>
<div class="tip"><b>Good commit messages</b>Write them in the imperative mood, like a command: "Add homepage heading", not "added stuff". Your teammates and future self will read these.</div>`,
tasks:[
 {t:'Create a file called index.html with a heading in it.',h:'echo "<h1>Hello world</h1>" > index.html',c:()=>'index.html' in S.files},
 {t:'Run git status and find index.html under "Untracked files".',h:'git status',c:()=>'index.html' in S.files&&H(/^git status/)},
 {t:'Stage index.html.',h:'git add index.html',c:()=>'index.html' in S.index},
 {t:'Commit it with a clear message.',h:'git commit -m "Add homepage heading"',c:()=>nCommits()>=1},
 {t:'View your history.',h:'git log',c:()=>nCommits()>=1&&H(/^git log/)},
]},
{id:'g3',lvl:'Beginner',title:'Building history',
setup:r=>{r('git init');r('echo "<h1>Hello world</h1>" > index.html');r('git add .');r('git commit -m "Add homepage heading"')},
concept:`<p>Every commit has an <b>id</b> (a hash like <code>a3f9c21</code>), an author, a message, and a pointer to its <b>parent</b> commit. Together they form a chain: your project's history.</p>
<h4>Seeing changes</h4><ul><li><code>git diff</code> shows changes you have <i>not staged yet</i>.</li><li><code>git diff --staged</code> shows what <i>will go into</i> the next commit.</li><li><code>git log --oneline</code> shows a compact history, one line per commit.</li><li><code>git add .</code> stages every change in the folder at once.</li></ul>
<div class="tip"><b>Habit</b>Make small commits often. One commit should do one thing. That makes bugs easier to find and changes easier to undo.</div>`,
tasks:[
 {t:'Change index.html (overwrite it with new content).',h:'echo "<h1>Hi, I build websites</h1>" > index.html',c:()=>S.files['index.html']&&S.files['index.html']!=='<h1>Hello world</h1>'||nCommits()>=2},
 {t:'Look at your unstaged change with git diff.',h:'git diff',c:()=>H(/^git diff$/)},
 {t:'Stage and commit that change.',h:'git add index.html && git commit -m "Update homepage heading"',c:()=>nCommits()>=2},
 {t:'Add a new file style.css and commit it.',h:'echo "body { font-family: sans-serif }" > style.css\ngit add style.css\ngit commit -m "Add base styles"',c:()=>nCommits()>=3&&'style.css' in treeOf(headId())},
 {t:'Show your history in compact form.',h:'git log --oneline',c:()=>H(/^git log --oneline/)&&nCommits()>=3},
]},
{id:'g4',lvl:'Beginner',title:'Undo without fear',
setup:r=>{r('git init');r('echo "<h1>Portfolio</h1>" > index.html');r('git add .');r('git commit -m "Add homepage"');r('echo "body { margin: 0 }" > style.css');r('git add .');r('git commit -m "Add styles"')},
concept:`<p>Mistakes are normal. Git gives you a tool for each kind of undo:</p>
<div class="tbl-wrap"><table><tr><th>Situation</th><th>Command</th></tr>
<tr><td>Throw away edits to a file (not staged)</td><td><code>git restore file</code></td></tr>
<tr><td>Unstage a file but keep the edits</td><td><code>git restore --staged file</code></td></tr>
<tr><td>Fix the last commit's message</td><td><code>git commit --amend -m "new msg"</code></td></tr>
<tr><td>Undo the last commit, keep the changes staged</td><td><code>git reset --soft HEAD~1</code></td></tr>
<tr><td>Undo the last commit and discard its changes</td><td><code>git reset --hard HEAD~1</code></td></tr></table></div>
<p><code>HEAD</code> means "the commit you're on now". <code>HEAD~1</code> means "one commit before it".</p>
<div class="tip"><b>Rule</b>Only amend or reset commits you haven't pushed yet. For commits other people already have, use <code>git revert</code> (covered later).</div>`,
tasks:[
 {t:'Break index.html on purpose (overwrite it with "oops").',h:'echo "oops" > index.html',c:()=>H(/^echo .*> ?index\.html/)},
 {t:'Bring it back from the last commit.',h:'git restore index.html',c:()=>H(/^git (restore|checkout --) index\.html/)&&S.files['index.html']===treeOf(headId())['index.html']},
 {t:'Create notes.txt, stage it by accident, then unstage it.',h:'echo "todo" > notes.txt\ngit add notes.txt\ngit restore --staged notes.txt',c:()=>H(/^git (restore --staged|reset) notes\.txt/)&&!('notes.txt' in S.index)},
 {t:'Rename the last commit\'s message with --amend.',h:'git commit --amend -m "Add base styles"',c:()=>H(/^git commit --amend/)},
 {t:'Undo the last commit but keep its changes staged.',h:'git reset --soft HEAD~1',c:()=>H(/^git reset --soft/)},
]},
/* ---------------- INTERMEDIATE ---------------- */
{id:'g5',lvl:'Intermediate',title:'Branches',
setup:r=>{r('git init');r('echo "<h1>Portfolio</h1>" > index.html');r('git add .');r('git commit -m "Add homepage"')},
concept:`<p>A <b>branch</b> is a movable label that points at a commit. When you commit on a branch, the label moves forward. Branches let you build a feature without touching the working code on <code>main</code>.</p>
<p><b>HEAD</b> marks which branch you're on now. Watch it move in the commit graph.</p>
<div class="tbl-wrap"><table><tr><th>Command</th><th>What it does</th></tr>
<tr><td><code>git branch</code></td><td>List branches (* marks the current one)</td></tr>
<tr><td><code>git switch -c name</code></td><td>Create a branch and switch to it</td></tr>
<tr><td><code>git switch name</code></td><td>Switch to an existing branch</td></tr>
<tr><td><code>git checkout -b name</code></td><td>Older way to create and switch (still common)</td></tr></table></div>
<div class="tip"><b>Team convention</b>Name branches by purpose: <code>feature/navbar</code>, <code>fix/login-crash</code>, <code>chore/update-deps</code>.</div>`,
tasks:[
 {t:'List the branches you have.',h:'git branch',c:()=>H(/^git branch$/)},
 {t:'Create and switch to a branch called feature/navbar.',h:'git switch -c feature/navbar',c:()=>'feature/navbar' in S.branches},
 {t:'On feature/navbar, add nav.html and commit it.',h:'echo "<nav>Home | Work | Contact</nav>" > nav.html\ngit add nav.html\ngit commit -m "Add navbar"',c:()=>'nav.html' in treeOf(S.branches['feature/navbar'])},
 {t:'Switch back to main.',h:'git switch main',c:()=>cur()==='main'&&'nav.html' in treeOf(S.branches['feature/navbar'])},
 {t:'Run ls and notice nav.html is gone. It exists only on the feature branch.',h:'ls',c:()=>cur()==='main'&&H(/^ls/)&&'nav.html' in treeOf(S.branches['feature/navbar'])},
]},
{id:'g6',lvl:'Intermediate',title:'Merging',
setup:r=>{r('git init');r('echo "<h1>Portfolio</h1>" > index.html');r('git add .');r('git commit -m "Add homepage"');r('git switch -c feature/navbar');r('echo "<nav>Home | Work</nav>" > nav.html');r('git add .');r('git commit -m "Add navbar"');r('git switch main');r('git switch -c feature/footer');r('echo "<footer>© 2026</footer>" > footer.html');r('git add .');r('git commit -m "Add footer"');r('git switch main')},
concept:`<p><b>Merging</b> brings the work from one branch into another. Switch to the branch that should <i>receive</i> the work, then run <code>git merge other-branch</code>.</p>
<ul><li><b>Fast-forward:</b> if <code>main</code> hasn't moved since the branch started, Git just slides the <code>main</code> label forward. No new commit.</li><li><b>Three-way merge:</b> if both branches have new commits, Git creates a <b>merge commit</b> with two parents.</li></ul>
<p>Two feature branches are waiting in this sandbox. Look at the graph before you start.</p>
<div class="tip"><b>Clean up</b>Delete branches once they're merged: <code>git branch -d name</code>. Git refuses if the branch has unmerged work, which protects you.</div>`,
tasks:[
 {t:'Make sure you\'re on main, then merge feature/navbar. Expect a fast-forward.',h:'git merge feature/navbar',c:()=>S.branches.main&&isAnc(S.commits[S.branches.main]&&findMsg('Add navbar'),S.branches.main)},
 {t:'Merge feature/footer. Expect a merge commit with two parents.',h:'git merge feature/footer',c:()=>Object.values(S.commits).some(c=>c.parents.length===2&&isAnc(c.id,S.branches.main))},
 {t:'Delete the merged feature/navbar branch.',h:'git branch -d feature/navbar',c:()=>!('feature/navbar' in S.branches)},
 {t:'See the result with git log --oneline.',h:'git log --oneline',c:()=>H(/^git log/)&&!('feature/navbar' in S.branches)},
]},
{id:'g7',lvl:'Intermediate',title:'Merge conflicts',
setup:r=>{r('git init');r('echo "<title>My Site</title>" > index.html');r('git add .');r('git commit -m "Add page title"');r('git switch -c feature/title');r('echo "<title>Jane Doe | Developer</title>" > index.html');r('git commit -am "Use my name in title"');r('git switch main');r('echo "<title>Portfolio | Home</title>" > index.html');r('git commit -am "Rename title"')},
concept:`<p>A <b>conflict</b> happens when two branches change the <i>same part of the same file</i> differently. Git can't guess which one is right, so it stops and asks you.</p>
<p>Git writes both versions into the file between markers:</p>
<pre class="snip" style="margin-bottom:12px">&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
your branch's version
=======
the incoming branch's version
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/title</pre>
<h4>How to resolve</h4><ul><li>Edit the file to the final content you want, and remove all the markers.</li><li><code>git add</code> the file to mark it resolved.</li><li><code>git commit</code> to finish the merge. You can leave out <code>-m</code> during a merge.</li></ul>
<p>Changed your mind? <code>git merge --abort</code> returns to how things were before.</p>
<div class="tip"><b>Live-coding tip</b>Conflicts are routine, not emergencies. Read <code>git status</code>; it lists each conflicted file under "Unmerged paths".</div>`,
tasks:[
 {t:'From main, merge feature/title and hit the conflict.',h:'git merge feature/title',c:()=>H(/^git merge feature\/title/)},
 {t:'Look at the conflicted file.',h:'cat index.html',c:()=>H(/^cat index\.html/)},
 {t:'Overwrite index.html with your final version (no markers).',h:'echo "<title>Jane Doe | Portfolio</title>" > index.html',c:()=>(S.merge||mergeDone())&&S.files['index.html']&&!/<<<<<<<|>>>>>>>/.test(S.files['index.html'])},
 {t:'Stage the file and commit to finish the merge.',h:'git add index.html\ngit commit -m "Merge feature/title"',c:()=>mergeDone()},
]},
{id:'g8',lvl:'Intermediate',title:'GitHub & remotes',
setup:r=>{r('git init');r('echo "<h1>Portfolio</h1>" > index.html');r('git add .');r('git commit -m "Add homepage"')},
concept:`<p>A <b>remote</b> is a copy of your repository somewhere else, usually GitHub. By convention the main one is called <b>origin</b>.</p>
<div class="tbl-wrap"><table><tr><th>Command</th><th>What it does</th></tr>
<tr><td><code>git remote add origin URL</code></td><td>Connect your repo to GitHub</td></tr>
<tr><td><code>git push -u origin main</code></td><td>Upload main and remember origin/main as its upstream</td></tr>
<tr><td><code>git push</code></td><td>Upload new commits (after -u has been set once)</td></tr>
<tr><td><code>git fetch</code></td><td>Download new commits without changing your files</td></tr>
<tr><td><code>git pull</code></td><td><code>fetch</code> + <code>merge</code> in one step</td></tr></table></div>
<p>The <b>GitHub</b> panel shows what the remote has. <code>origin/main</code> in the graph is your local record of it, updated by fetch, pull and push.</p>
<div class="tip"><b>Rejected push?</b>"Updates were rejected" means someone pushed commits you don't have yet. Run <code>git pull</code>, then push again. Never jump straight to <code>--force</code>.</div>`,
tasks:[
 {t:'Connect the repo to GitHub as origin.',h:'git remote add origin https://github.com/you/portfolio.git',c:()=>!!S.remote},
 {t:'Push main and set its upstream.',h:'git push -u origin main',c:()=>S.remote&&S.upstream.main&&!!S.remote.branches.main,done:()=>{mate('README.md','# Portfolio\\nBuilt with the team','Add README');sys('[teammate] Ada just pushed a commit to GitHub. Look at the GitHub panel.')}},
 {t:'Make a local commit (edit index.html), then run git push. It will be rejected.',h:'echo "<h1>My Portfolio</h1>" > index.html\ngit commit -am "Update heading"\ngit push',c:()=>S.flags.rejected},
 {t:'Pull your teammate\'s work.',h:'git pull',c:()=>S.mateId&&S.branches.main&&isAnc(S.mateId,S.branches.main)},
 {t:'Push again. This time it succeeds.',h:'git push',c:()=>S.remote&&S.remote.branches.main===S.branches.main&&S.mateId&&isAnc(S.mateId,S.branches.main)},
]},
/* ---------------- ADVANCED ---------------- */
{id:'g9',lvl:'Advanced',title:'Pull requests',
setup:r=>{r('git init');r('echo "<h1>Portfolio</h1>" > index.html');r('git add .');r('git commit -m "Add homepage"');r('git remote add origin https://github.com/you/portfolio.git');r('git push -u origin main')},
concept:`<p>Professional teams rarely push straight to <code>main</code>. They use <b>GitHub Flow</b>:</p>
<div class="flow"><span>branch</span><em>→</em><span>commit</span><em>→</em><span>push</span><em>→</em><span>pull request</span><em>→</em><span>review</span><em>→</em><span>merge</span><em>→</em><span>pull main</span></div>
<p>A <b>pull request (PR)</b> asks to merge your branch into <code>main</code>. Teammates review the code, automated tests run, and then it gets merged on GitHub.</p>
<p>This sandbox uses <code>gh</code>, GitHub's official command-line tool. On github.com the same steps are buttons ("Compare &amp; pull request", "Merge pull request").</p>
<div class="tip"><b>After merging</b>The merge happened on GitHub, not on your computer. Switch to main and <code>git pull</code> to get it locally.</div>`,
tasks:[
 {t:'Create and switch to feature/contact.',h:'git switch -c feature/contact',c:()=>'feature/contact' in S.branches||prMerged()},
 {t:'Add contact.html and commit it.',h:'echo "<h2>Contact me</h2>" > contact.html\ngit add .\ngit commit -m "Add contact page"',c:()=>('feature/contact' in S.branches&&'contact.html' in treeOf(S.branches['feature/contact']))||prMerged()},
 {t:'Push the branch to GitHub.',h:'git push -u origin feature/contact',c:()=>S.remote&&!!S.remote.branches['feature/contact']},
 {t:'Open a pull request.',h:'gh pr create --title "Add contact page"',c:()=>S.prs.length>0},
 {t:'Merge the pull request on GitHub.',h:'gh pr merge 1',c:()=>prMerged()},
 {t:'Switch to main and pull the merged work.',h:'git switch main\ngit pull',c:()=>prMerged()&&cur()==='main'&&'contact.html' in treeOf(S.branches.main)},
 {t:'Delete your local feature branch.',h:'git branch -d feature/contact',c:()=>prMerged()&&!('feature/contact' in S.branches)},
]},
{id:'g10',lvl:'Advanced',title:'Stash, revert & reset',
setup:r=>{r('git init');r('echo "v1" > app.js');r('git add .');r('git commit -m "Create app"');r('echo "v2" > app.js');r('git commit -am "Add login"');r('echo "v3" > app.js');r('git commit -am "Add dashboard"')},
concept:`<p><b>Stash</b> puts uncommitted work on a shelf so you can switch tasks with a clean working tree. Bring it back later.</p>
<ul><li><code>git stash</code>: shelve your changes</li><li><code>git stash list</code>: see what's shelved</li><li><code>git stash pop</code>: bring the latest back</li></ul>
<h4>Revert vs reset</h4>
<div class="tbl-wrap"><table><tr><th></th><th>git revert</th><th>git reset</th></tr>
<tr><td>How</td><td>Adds a <i>new</i> commit that undoes an old one</td><td>Moves the branch back; later commits leave the history</td></tr>
<tr><td>Safe on shared branches?</td><td>Yes</td><td>No. It rewrites history.</td></tr>
<tr><td>Use for</td><td>Undoing something already pushed</td><td>Cleaning up local commits</td></tr></table></div>`,
tasks:[
 {t:'Start a change to app.js, then stash it.',h:'echo "v4 work in progress" > app.js\ngit stash',c:()=>H(/^git stash( push)?$/)},
 {t:'Check git status (clean), then bring the work back.',h:'git status\ngit stash pop',c:()=>H(/^git stash pop/)},
 {t:'Commit that change.',h:'git commit -am "Add settings page"',c:()=>nCommits()>=4},
 {t:'Undo that commit safely with revert.',h:'git revert HEAD',c:()=>Object.values(S.commits).some(c=>c.msg.startsWith('Revert'))},
 {t:'Now drop the revert commit locally with a hard reset.',h:'git reset --hard HEAD~1',c:()=>H(/^git reset --hard/)},
 {t:'Check the history.',h:'git log --oneline',c:()=>H(/^git reset --hard/)&&H(/^git log/)},
]},
{id:'g11',lvl:'Advanced',title:'Rebase & cherry-pick',
setup:r=>{r('git init');r('echo "v1" > app.js');r('git add .');r('git commit -m "Init app"');r('git switch -c feature/api');r('echo "fetch(\'/api\')" > api.js');r('git add .');r('git commit -m "Add API client"');r('echo "retry()" >> api.js');r('git commit -am "Add retries"');r('git switch main');r('echo "# App" > README.md');r('git add .');r('git commit -m "Add README"');r('git switch -c hotfix');r('echo "escapeHtml()" > security.js');r('git add .');r('git commit -m "Patch XSS bug"');r('git switch feature/api')},
concept:`<p><b>Rebase</b> replays your branch's commits on top of another branch, as if you'd started from there. The result is a straight, readable history with no merge commit.</p>
<p>Before: your feature branched off an old <code>main</code>. After <code>git rebase main</code>: your commits sit on top of the latest <code>main</code>, with <i>new ids</i> because they're new commits.</p>
<p><b>Cherry-pick</b> copies one specific commit onto your current branch: <code>git cherry-pick &lt;id or branch&gt;</code>.</p>
<div class="tip"><b>Golden rule</b>Never rebase commits that other people already have. Rebase rewrites ids, which breaks their history. Rebase your own local work; merge shared branches.</div>`,
tasks:[
 {t:'You\'re on feature/api. Look at the graph, then rebase onto main.',h:'git rebase main',c:()=>S.branches['feature/api']&&isAnc(S.branches.main0||S.branches.main,S.branches['feature/api'])&&H(/^git rebase/)},
 {t:'Switch to main.',h:'git switch main',c:()=>cur()==='main'&&H(/^git rebase/)},
 {t:'Bring the rebased feature into main. It should fast-forward.',h:'git merge feature/api',c:()=>S.branches.main&&'api.js' in treeOf(S.branches.main)&&!Object.values(S.commits).some(c=>c.parents.length===2)},
 {t:'Copy only the security fix from hotfix onto main.',h:'git log hotfix --oneline\ngit cherry-pick hotfix',c:()=>S.branches.main&&'security.js' in treeOf(S.branches.main)&&!isAnc(S.branches.hotfix,S.branches.main)},
]},
{id:'g12',lvl:'Advanced',title:'.gitignore & tags',
setup:r=>{r('git init');r('echo "console.log(1)" > app.js');r('git add .');r('git commit -m "Create app"')},
concept:`<p>Some files must never be committed: secrets (<code>.env</code>), logs, build output, <code>node_modules</code>. List them in a <b>.gitignore</b> file and Git stops showing them.</p>
<div class="tbl-wrap"><table><tr><th>Pattern</th><th>Ignores</th></tr><tr><td><code>.env</code></td><td>that exact file</td></tr><tr><td><code>*.log</code></td><td>every file ending in .log</td></tr><tr><td><code>node_modules/</code></td><td>a whole folder</td></tr></table></div>
<p>Use <code>echo ".env" >> .gitignore</code> to add lines one at a time (<code>&gt;&gt;</code> appends, <code>&gt;</code> overwrites).</p>
<h4>Tags</h4><p>A <b>tag</b> is a permanent label for a release, such as <code>v1.0.0</code>. Semantic versioning: MAJOR.MINOR.PATCH. Bump MAJOR for breaking changes, MINOR for new features, PATCH for fixes.</p>
<div class="tip"><b>Leaked a secret?</b>If a key was ever pushed, revoke it at the provider first. Deleting it from history comes second. Bots scan GitHub for keys within minutes.</div>`,
tasks:[
 {t:'Create a secret file .env and a debug.log.',h:'echo "API_KEY=sk_live_123" > .env\necho "error at line 4" > debug.log',c:()=>'.env' in S.files&&'debug.log' in S.files},
 {t:'Write a .gitignore that ignores .env and all .log files.',h:'echo ".env" > .gitignore\necho "*.log" >> .gitignore',c:()=>'.env' in S.files&&ignored('.env')&&ignored('debug.log')},
 {t:'Run git status and confirm only .gitignore shows up.',h:'git status',c:()=>ignored('.env')&&H(/^git status/)},
 {t:'Commit the .gitignore.',h:'git add .\ngit commit -m "Add gitignore"',c:()=>'.gitignore' in treeOf(headId())&&!('.env' in treeOf(headId()))},
 {t:'Tag this commit as v1.0.0 and list tags.',h:'git tag v1.0.0\ngit tag',c:()=>!!S.tags['v1.0.0']&&H(/^git tag$/)},
]},
/* ---------------- PRO ---------------- */
{id:'g13',lvl:'Pro',title:'Drill: hotfix scramble',drill:true,
setup:r=>{r('git init');r('echo "login v1" > login.js');r('echo "dashboard" > dashboard.js');r('git add .');r('git commit -m "Initial app"');r('git remote add origin https://github.com/team/shop.git');r('git push -u origin main');r('git switch -c feature/dashboard');r('echo "charts" >> dashboard.js');r('git commit -am "Start charts"');r('git push -u origin feature/dashboard');r('echo "filters wip" >> dashboard.js');mate('config.js','API=v2','Update API config')},
concept:`<p><b>Scenario.</b> You're halfway through the dashboard feature with uncommitted work. Production login is broken and you've been asked to ship a fix now. A teammate also pushed to <code>main</code> this morning.</p>
<p>No hints are shown by default. The timer starts with your first command. Beat your best time on repeat runs, because speed and calm under pressure are what live coding tests.</p>
<div class="tip"><b>Pro habit</b>Before you switch context, run <code>git status</code>, then stash or commit. Never carry half-done work onto a hotfix branch.</div>`,
tasks:[
 {t:'Shelve your unfinished dashboard work.',h:'git stash',c:()=>S.stash.length>0||H(/^git stash pop/)},
 {t:'Get onto an up-to-date main, including your teammate\'s commit.',h:'git switch main\ngit pull',c:()=>S.mateId&&S.branches.main&&isAnc(S.mateId,S.branches.main)},
 {t:'Create a branch whose name starts with hotfix/.',h:'git switch -c hotfix/login',c:()=>Object.keys(S.branches).some(b=>b.startsWith('hotfix/'))||S.prs.some(p=>p.head.startsWith('hotfix/'))},
 {t:'Fix login.js and commit the fix.',h:'echo "login v2 (fixed)" > login.js\ngit commit -am "Fix login crash"',c:()=>Object.entries(S.branches).some(([b,id])=>b.startsWith('hotfix/')&&treeOf(id)['login.js']!=='login v1')||S.prs.some(p=>p.head.startsWith('hotfix/'))},
 {t:'Push it, open a PR and merge it on GitHub.',h:'git push -u origin hotfix/login\ngh pr create --title "Fix login crash"\ngh pr merge 1',c:()=>S.prs.some(p=>p.head.startsWith('hotfix/')&&p.state==='merged')},
 {t:'Update your local main with the merged fix.',h:'git switch main\ngit pull',c:()=>S.branches.main&&S.remote&&S.branches.main===S.remote.branches.main&&S.prs.some(p=>p.state==='merged')},
 {t:'Return to feature/dashboard, rebase it onto main, and restore your stashed work.',h:'git switch feature/dashboard\ngit rebase main\ngit stash pop',c:()=>cur()==='feature/dashboard'&&isAnc(S.branches.main,S.branches['feature/dashboard'])&&S.stash.length===0&&/filters wip/.test(S.files['dashboard.js']||'')},
]},
];

const GIT_QUIZ={
 Beginner:[
  {q:'What does git add do?',o:['Uploads your files to GitHub','Moves changes into the staging area for the next commit','Creates a new commit','Creates a new branch'],a:1,e:'git add stages changes. Nothing is saved to history until you run git commit, and nothing goes to GitHub until you push.'},
  {q:'Which statement about Git and GitHub is true?',o:['They are the same thing','GitHub is required to use Git','Git is the version control tool; GitHub hosts Git repositories online','Git only works inside GitHub'],a:2,e:'Git works fully offline on your machine. GitHub (and GitLab, Bitbucket) host repositories so teams can collaborate.'},
  {q:'You edited a file but haven\'t staged it. Which command shows exactly what changed?',o:['git log','git diff','git show','git branch'],a:1,e:'git diff compares the working directory with the staging area. Use git diff --staged to see what will be committed.'},
  {q:'Which is the best commit message?',o:['stuff','fixed it','Add email validation to signup form','asdfgh'],a:2,e:'Imperative mood, specific, and it says what the commit does. You should be able to read it as "This commit will… add email validation".'},
  {q:'You broke a file and want to throw away your uncommitted edits to it. What do you run?',o:['git restore file','git revert file','git push --force','git rm file'],a:0,e:'git restore file replaces the working copy with the staged/committed version. git rm would delete the file.'},
 ],
 Intermediate:[
  {q:'What is a branch in Git?',o:['A full copy of the project folder','A movable pointer to a commit','A backup on GitHub','A type of merge'],a:1,e:'Branches are lightweight labels. That\'s why creating one is instant: Git just writes a new pointer.'},
  {q:'When does a fast-forward merge happen?',o:['When there are conflicts','When the target branch has no new commits since your branch split off','Only when you use --force','Every time you merge'],a:1,e:'If main hasn\'t moved, Git can just slide main forward to your branch\'s tip. No merge commit is needed.'},
  {q:'In a conflict, which version sits between <<<<<<< HEAD and =======?',o:['The incoming branch\'s version','The version on GitHub','Your current branch\'s version','The original common ancestor'],a:2,e:'HEAD is where you are, so the top part is your branch. The part after ======= comes from the branch you\'re merging in.'},
  {q:'git pull is equivalent to…',o:['git push + git merge','git fetch + git merge','git clone + git add','git commit + git push'],a:1,e:'pull downloads (fetch) and then integrates (merge, or rebase if configured with pull --rebase).'},
  {q:'Your push is rejected with "fetch first". What does it mean?',o:['Your internet is down','The remote has commits you don\'t have yet','Your branch name is wrong','You must use --force'],a:1,e:'Someone pushed before you. Pull, resolve anything that comes up, then push again.'},
 ],
 Advanced:[
  {q:'You need to undo a commit that is already pushed to the shared main branch. Safest option?',o:['git reset --hard HEAD~1 then force push','git revert <commit>','Delete the repository','git commit --amend'],a:1,e:'revert adds a new commit that undoes the old one, so nobody else\'s history breaks.'},
  {q:'What is the golden rule of rebasing?',o:['Always rebase main onto features','Never rebase commits that others have already pulled','Rebase only on Fridays','Rebase replaces merge entirely'],a:1,e:'Rebase creates new commit ids. If teammates built on the old ones, their history diverges painfully.'},
  {q:'What does git stash do?',o:['Deletes uncommitted changes forever','Temporarily shelves uncommitted changes so you get a clean working tree','Pushes changes to a hidden branch on GitHub','Squashes commits'],a:1,e:'Stash is a local shelf. git stash pop brings the changes back.'},
  {q:'What does git cherry-pick <commit> do?',o:['Deletes that commit','Copies that single commit onto your current branch','Merges the whole branch','Shows the commit\'s diff'],a:1,e:'Common for moving a hotfix onto a release branch without bringing in unrelated work.'},
  {q:'You add config.json to .gitignore, but it was already committed. What happens?',o:['Git deletes it from history','Git keeps tracking it; you must run git rm --cached config.json','Git shows an error','It gets ignored automatically'],a:1,e:'.gitignore only affects untracked files. Stop tracking with git rm --cached, then commit.'},
 ],
 Pro:[
  {q:'You accidentally pushed an API key to a public repo. What do you do first?',o:['Rewrite history to remove it','Revoke or rotate the key at the provider','Make the repo private','Add the file to .gitignore'],a:1,e:'Bots scrape public repos within minutes. Assume the key is compromised; revoke it first, then clean the history.'},
  {q:'You ran git reset --hard and "lost" commits. Which command helps you find them?',o:['git log --all','git reflog','git status','git fsck --lost'],a:1,e:'reflog records every place HEAD has pointed. Find the old id and git reset --hard <id> or git branch rescue <id>.'},
  {q:'Why prefer git push --force-with-lease over --force?',o:['It\'s faster','It refuses to overwrite remote commits you haven\'t seen','It creates a backup branch','It works without a remote'],a:1,e:'It\'s force push with a safety check: if someone pushed since your last fetch, it stops you.'},
  {q:'A bug appeared somewhere in the last 200 commits. The fastest way to find the commit that caused it?',o:['Read every diff','git bisect','git blame on every file','Revert commits one by one'],a:1,e:'bisect does a binary search: mark good and bad commits, and about 8 steps cover 200 commits.'},
  {q:'An interviewer asks "merge or rebase?" Which answer is strongest?',o:['Always rebase','Always merge','Merge keeps true history with a merge commit; rebase gives a linear history but rewrites ids. Rebase local work, merge shared branches.','They are identical'],a:2,e:'Show you know the trade-off and the team convention behind it. That\'s what interviewers listen for.'},
 ],
};

const GIT_REAL=[
 {id:'r1',t:'Install Git and check it works',p:'Download from git-scm.com (Windows: "Git for Windows" includes Git Bash). Then open a terminal:',s:'git --version'},
 {id:'r2',t:'Set your identity',p:'Use the same email as your GitHub account so commits link to your profile.',s:'git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"\ngit config --global init.defaultBranch main'},
 {id:'r3',t:'Create a GitHub account and an SSH key',p:'SSH lets you push without typing a password. Paste the printed public key into GitHub → Settings → SSH and GPG keys.',s:'ssh-keygen -t ed25519 -C "you@example.com"\ncat ~/.ssh/id_ed25519.pub\nssh -T git@github.com'},
 {id:'r4',t:'Push a real project',p:'Create an empty repo on github.com (no README), then from your project folder:',s:'git init\ngit add .\ngit commit -m "Initial commit"\ngit remote add origin git@github.com:YOU/REPO.git\ngit push -u origin main'},
 {id:'r5',t:'Open and merge a PR on your own repo',p:'Practise GitHub Flow end to end, using the website buttons this time.',s:'git switch -c feature/readme\necho "# My Project" > README.md\ngit add . && git commit -m "Add README"\ngit push -u origin feature/readme\n# then on github.com: Compare & pull request → Merge'},
 {id:'r6',t:'Cause and resolve a real conflict',p:'Edit the same line on two branches locally, merge, and fix it in your editor. VS Code shows "Accept Current / Incoming / Both" buttons.',s:'git switch -c try-conflict\n# edit line 1 of README.md, commit\ngit switch main\n# edit the same line differently, commit\ngit merge try-conflict'},
 {id:'r7',t:'Protect main and add a GitHub Action',p:'Settings → Branches → add a rule requiring PRs for main. Then add a workflow that runs on every push. This previews the Deployment track.',s:'# .github/workflows/ci.yml\nname: CI\non: [push, pull_request]\njobs:\n  check:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo "Tests would run here"'},
 {id:'r8',t:'Make your first open-source contribution',p:'Find an issue labelled "good first issue", fork the repo, fix it on a branch and open a PR. Even a documentation fix counts.',s:'gh repo fork OWNER/REPO --clone\ncd REPO\ngit switch -c fix/typo-in-docs'},
 {id:'r9',t:'Recover a "lost" commit with reflog',p:'Make a commit, run git reset --hard HEAD~1, then get it back. Once you\'ve done this, you\'ll stop being scared of Git.',s:'git reflog\ngit reset --hard HEAD@{1}'},
];
const GIT_META={
 g1:{s:'Git records snapshots of your project called commits. GitHub hosts Git repositories online so teams can collaborate. Set your name and email once per machine; they are stamped on every commit. git init turns a folder into a repository, and git status tells you where you stand.',k:['git --version','git config --global user.name','git config --global user.email','git init','git status']},
 g2:{s:'Git has three areas: the working directory (your files), the staging area (what goes into the next commit) and the repository (history). git add moves changes into staging; git commit saves them. Write messages in the imperative: "Add homepage heading".',k:['git add <file>','git commit -m "msg"','git status','git log']},
 g3:{s:'Each commit has an id, an author, a message and a parent. git diff shows unstaged changes, git diff --staged shows what will be committed, and git log --oneline shows compact history. Commit small and often: one commit, one purpose.',k:['git diff','git diff --staged','git add .','git log --oneline']},
 g4:{s:'git restore <file> throws away unstaged edits. git restore --staged <file> unstages but keeps the edits. git commit --amend replaces the last commit. git reset --soft HEAD~1 undoes a commit and keeps its changes staged; --hard discards them. Only rewrite commits you have not pushed.',k:['git restore','git restore --staged','git commit --amend','git reset --soft HEAD~1','git reset --hard']},
 g5:{s:'A branch is a movable pointer to a commit, and HEAD marks where you are. git switch -c <name> creates a branch and moves to it; git switch <name> moves between branches. Files change on disk to match the branch you are on. Name branches feature/, fix/, chore/.',k:['git branch','git switch -c <name>','git switch <name>','git checkout -b <name>']},
 g6:{s:'Switch to the branch that receives the work, then git merge <branch>. If the receiving branch has not moved, Git fast-forwards; otherwise it creates a merge commit with two parents. Delete merged branches with git branch -d.',k:['git merge <branch>','git branch -d <branch>','git log --oneline']},
 g7:{s:'A conflict happens when two branches change the same lines differently. Git marks both versions between <<<<<<< HEAD, ======= and >>>>>>>. Edit the file to the final version, remove the markers, then git add and git commit. git merge --abort backs out.',k:['git merge <branch>','cat <file>','git add <file>','git commit','git merge --abort']},
 g8:{s:'origin is the name of your GitHub remote. Run git push -u origin main once to link the branch; after that, plain git push works. A rejected push means the remote has commits you lack: git pull (fetch + merge), then push again. Never reach for --force first.',k:['git remote add origin <url>','git push -u origin main','git push','git fetch','git pull']},
 g9:{s:'GitHub Flow: branch, commit, push the branch, open a pull request, review, merge, then pull main locally and delete the branch. The merge happens on GitHub, so your local main only gets it after git pull.',k:['git switch -c feature/<name>','git push -u origin <branch>','gh pr create --title','gh pr merge <n>','git pull','git branch -d']},
 g10:{s:'git stash shelves uncommitted work so you can switch tasks; git stash pop brings it back. git revert <commit> adds a new commit that undoes an old one, which is safe on shared branches. git reset moves the branch back and rewrites history, so use it only locally.',k:['git stash','git stash list','git stash pop','git revert HEAD','git reset --hard HEAD~1']},
 g11:{s:'git rebase <branch> replays your commits on top of another branch, giving them new ids and a straight history. git cherry-pick <commit> copies a single commit onto your branch. Golden rule: never rebase commits other people already have.',k:['git rebase main','git cherry-pick <ref>','git log <branch> --oneline','git merge']},
 g12:{s:'.gitignore keeps secrets, logs and build output out of Git (.env, *.log, node_modules/). It only affects untracked files; for a file that is already tracked, run git rm --cached. Tags mark releases using semantic versioning: vMAJOR.MINOR.PATCH.',k:['.gitignore','echo "pattern" >> .gitignore','git rm --cached <file>','git tag v1.0.0','git tag']},
 g13:{s:'Hotfix routine under pressure: git status, stash your work, switch to main, pull, create hotfix/<name>, commit the fix, push, open and merge the PR, pull main, return to your feature branch, rebase onto main, then stash pop.',k:['git stash','git switch main && git pull','git switch -c hotfix/<name>','gh pr create','gh pr merge','git rebase main','git stash pop']},
};
GIT_LESSONS.forEach(l=>{l.kind='git';const m=GIT_META[l.id];if(m){l.sum=m.s;l.keys=m.k}});
defineTrack({id:'git',name:'Git & GitHub',weeks:'1–2 weeks',lessons:GIT_LESSONS,quizzes:GIT_QUIZ,real:GIT_REAL});