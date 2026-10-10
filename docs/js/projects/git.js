/* Projects: Git & GitHub */
(()=>{
const tip=()=>S.remote&&S.remote.branches.main;
const mineOnMain=()=>{const out=[];let id=tip();while(id&&id!==S.baseId&&S.commits[id]){const c=S.commits[id];if(c.parents.length<2&&c.author!=='GitHub'&&!/teammate/.test(c.author))out.push(c);id=c.parents[0]}return out};
const userCommits=()=>Object.values(S.commits).filter(c=>c.t>S.baseT&&c.author!=='GitHub'&&!/teammate/.test(c.author));
const vague=m=>m.trim().length<10||/^(wip|fix|fixed|fixes|update|updates|updated|stuff|changes|change|asdf|test|commit|done|edit|edits|misc)\.?$/i.test(m.trim());
const anyCommitHas=f=>Object.values(S.commits).some(c=>f in c.tree);
const mergedPr=re=>S.prs.find(p=>p.state==='merged'&&re.test(p.head));
const prTrail=(re,what)=>{const br=Object.keys(S.branches).find(b=>re.test(b))||(S.remote&&Object.keys(S.remote.branches).find(b=>re.test(b)));
 if(!br)return 'No branch matching '+what+' exists. Create one with git switch -c '+what.replace('*','your-change')+' before you start the change.';
 if(!S.remote||!S.remote.branches[br])return 'You created '+br+' but never pushed it, so GitHub cannot open a pull request for it. Run git push -u origin '+br+'.';
 const pr=S.prs.find(p=>p.head===br);if(!pr)return br+' is on GitHub, but there is no pull request for it. Run gh pr create --title "…" while on that branch.';
 if(pr.state!=='merged')return 'Pull request #'+pr.n+' for '+br+' is still open. Merge it with gh pr merge '+pr.n+'.';
 return null};

defineProjects('git',{
guided:{title:'Ship your portfolio with GitHub Flow',kind:'git',
 pitch:'Create a repository from scratch, keep a secret out of it, push to GitHub, and ship a feature through a pull request and a release tag.',
 brief:`<p>You're starting your developer portfolio and want to run it the way professional teams do: every change goes through a branch and a pull request, secrets never reach GitHub, and releases are tagged.</p>
<p>Follow the steps. Each one gives you the commands and the reason behind them. Type the commands yourself rather than pasting: your fingers learn them faster that way. Watch the commit graph and the GitHub panel change as you go.</p>
<div class="tip"><b>Goal</b>A repository on GitHub with a merged pull request, a clean local <code>main</code> that matches it, and a <code>v1.0.0</code> tag.</div>`,
 tasks:[
 {t:'Set your identity and create the repository.',why:'Git stamps your name and email on every commit. Your teammates (and GitHub) use them to see who changed what. <code>git init</code> creates the hidden <code>.git</code> folder that holds the history.',h:'git config --global user.name "Your Name"\ngit config --global user.email "you@example.com"\ngit init',c:()=>S.inited&&!!S.config['user.name']&&!!S.config['user.email']},
 {t:'Create a homepage and a README, then make your first commit.',why:'Run <code>git status</code> before <code>git add</code> to see what Git sees. A first commit with a clear, imperative message ("Add …") starts your history on the right foot.',h:'echo "<h1>Hi, I build websites</h1>" > index.html\necho "# My portfolio" > README.md\ngit status\ngit add .\ngit commit -m "Add homepage and README"',c:()=>{const t=treeOf(headId());return 'index.html' in t&&'README.md' in t}},
 {t:'Keep secrets out: create a .env, ignore it, and commit the .gitignore.',why:'API keys pushed to a public repo are found by bots within minutes. Ignore <code>.env</code> <b>before</b> you ever add it. Notice that <code>git status</code> stops listing it once it is ignored.',h:'echo "API_KEY=abc123" > .env\necho ".env" > .gitignore\ngit status\ngit add .gitignore\ngit commit -m "Ignore local environment file"',c:()=>/(^|\n)\.env(\n|$)/.test(treeOf(headId())['.gitignore']||'')&&!anyCommitHas('.env')},
 {t:'Connect GitHub and push main.',why:'<code>origin</code> is the conventional name for your GitHub copy. <code>-u</code> links your local <code>main</code> to <code>origin/main</code> once, so later you can just type <code>git push</code> and <code>git pull</code>.',h:'git remote add origin https://github.com/you/portfolio.git\ngit push -u origin main',c:()=>!!tip()&&!!S.upstream.main},
 {t:'Start a feature branch and build a contact page on it.',why:'Branches keep unfinished work off <code>main</code>, so <code>main</code> is always deployable. Name branches by intent: <code>feature/</code>, <code>fix/</code>, <code>chore/</code>.',h:'git switch -c feature/contact\necho "<h1>Contact me</h1>" > contact.html\ngit add contact.html\ngit commit -m "Add contact page"',c:()=>!!S.branches['feature/contact']&&'contact.html' in treeOf(S.branches['feature/contact'])},
 {t:'Push the branch and open a pull request.',why:'A pull request is where teammates review your change before it reaches <code>main</code>. GitHub can only open one for a branch it has, so push first.',h:'git push -u origin feature/contact\ngh pr create --title "Add contact page"',c:()=>S.prs.some(p=>p.head==='feature/contact')},
 {t:'Merge the pull request on GitHub.',why:'In real life a reviewer approves first. Merging creates a merge commit on GitHub\'s <code>main</code>. Your laptop doesn\'t have it yet. Look at the remote panel.',h:'gh pr merge 1',c:()=>S.prs.some(p=>p.head==='feature/contact'&&p.state==='merged')},
 {t:'Bring the merge down to your laptop and delete the finished branch.',why:'After a merge, always switch to <code>main</code> and pull. Deleting merged branches keeps <code>git branch</code> readable. <code>-d</code> refuses to delete unmerged work, which makes it a safe habit.',h:'git switch main\ngit pull\ngit branch -d feature/contact\ngit log --oneline',c:()=>cur()==='main'&&!!tip()&&S.branches.main===tip()&&!S.branches['feature/contact']},
 {t:'Tag your first release.',why:'Tags mark exact versions (<code>vMAJOR.MINOR.PATCH</code>). When something breaks later, you can compare against or roll back to <code>v1.0.0</code>.',h:'git tag v1.0.0\ngit tag\ngit log --oneline',c:()=>!!S.tags['v1.0.0']&&'contact.html' in treeOf(S.tags['v1.0.0'])},
 ]},
solo:{title:'Fix a bug and ship a feature on a team repo',kind:'git',
 pitch:'Join a team repository, ship a typo fix and a new page through pull requests, keep a secret out of Git, and leave everything in sync.',
 setup:r=>{r('git init');r('echo "<h1>Acme Studio</h1>" > index.html');r('echo "<h1>Prcing</h1><p>Starter plan: $9/month</p>" > pricing.html');r('echo "node_modules" > .gitignore');r('echo "# Acme Studio site" > README.md');r('git add .');r('git commit -m "Add homepage, pricing page and README"');r('git remote add origin https://github.com/acme/site.git');r('git push -u origin main');mate('README.md','# Acme Studio site\\n\\nRun locally: open index.html in a browser.','Add local setup steps to README');r('echo "STRIPE_KEY=sk_live_51Hx9QeExample" > .env');S.baseId=S.branches.main;S.baseT=S.t},
 brief:`<p>You've joined Acme Studio. The repository is already cloned in your sandbox and connected to GitHub. Your teammate Ada pushed to <code>main</code> this morning, so your copy may be behind.</p>
<p><b>Your tickets:</b></p><ol><li><b>Bug:</b> the pricing page heading says "Prcing". Fix it.</li><li><b>Feature:</b> add an <code>about.html</code> page with an "About us" heading.</li><li><b>Security:</b> someone created a <code>.env</code> file with a live Stripe key in the project folder. It must never be committed.</li></ol>
<p><b>Team rules:</b> every change reaches <code>main</code> through a pull request; bug fixes go on a <code>fix/…</code> branch and features on a <code>feature/…</code> branch; commit messages say what the commit does. When you're done, your local <code>main</code> must match GitHub, finished branches are deleted, and the release is tagged <code>v1.1.0</code>.</p>`,
 tasks:[
 {t:'The pricing typo is fixed on a fix/… branch and merged through a pull request.',c:()=>{const pr=mergedPr(/^fix\//);return !!pr&&!!tip()&&/Pricing/.test(treeOf(tip())['pricing.html']||'')&&!/Prcing/.test(treeOf(tip())['pricing.html']||'')},
  miss:()=>{const t=prTrail(/^fix\//,'fix/*');if(t)return t;return 'The fix branch was merged, but pricing.html on GitHub\'s main still doesn\'t say "Pricing". Check what you wrote with cat pricing.html before committing.'}},
 {t:'about.html with an "About us" heading is added on a feature/… branch and merged through a pull request.',c:()=>!!mergedPr(/^feature\//)&&!!tip()&&/About us/i.test(treeOf(tip())['about.html']||''),
  miss:()=>{const t=prTrail(/^feature\//,'feature/*');if(t)return t;return 'A feature branch was merged, but GitHub\'s main has no about.html containing "About us". Make sure you committed the file on the feature branch before pushing.'}},
 {t:'The .env file is ignored and never appears in any commit.',c:()=>!anyCommitHas('.env')&&!!tip()&&/(^|\n)\.env(\n|$)/.test(treeOf(tip())['.gitignore']||''),
  miss:()=>anyCommitHas('.env')?'.env is inside a commit. Anyone who can read the repo can now read the Stripe key. In real life: revoke the key at Stripe first, then remove the file from Git with git rm --cached .env and ignore it. In this sandbox, reset the sandbox and add .env to .gitignore before any git add .':'.gitignore on GitHub\'s main does not list .env yet. Add a line containing exactly .env to .gitignore and get that change merged.'},
 {t:'Every commit you made has a descriptive message (10+ characters, not "fix" or "update").',c:()=>{const u=userCommits();return u.length>0&&u.every(c=>!vague(c.msg))},
  miss:()=>{const u=userCommits();if(!u.length)return 'You have not made any commits yet.';const bad=u.filter(c=>vague(c.msg)).map(c=>'"'+c.msg+'"');return 'These messages don\'t say what changed: '+bad.join(', ')+'. A good message completes the sentence "This commit will…", for example "Fix typo in pricing heading". You can reword the last unpushed commit with git commit --amend -m "…".'}},
 {t:'Your local main matches GitHub\'s main, including Ada\'s README change.',now:true,c:()=>!!tip()&&S.branches.main===tip()&&/Run locally/.test(treeOf(S.branches.main)['README.md']||''),
  miss:()=>!S.branches.main?'You have no local main branch.':cur()!=='main'?'You are on '+(cur()||'a detached HEAD')+', and main is behind GitHub. Run git switch main, then git pull.':'Local main is behind GitHub. After merging pull requests on GitHub, run git pull on main.'},
 {t:'Merged branches are deleted locally.',now:true,c:()=>{const merged=S.prs.filter(p=>p.state==='merged').map(p=>p.head);return merged.length>0&&merged.every(b=>!S.branches[b])},
  miss:()=>{const left=S.prs.filter(p=>p.state==='merged').map(p=>p.head).filter(b=>S.branches[b]);return left.length?'These branches are merged but still exist locally: '+left.join(', ')+'. Delete them with git branch -d <name> after pulling main.':'Nothing has been merged yet, so there is nothing to clean up.'}},
 {t:'v1.1.0 is tagged on a commit that has both the fix and the about page.',c:()=>{const id=S.tags['v1.1.0'];if(!id)return false;const t=treeOf(id);return /Pricing/.test(t['pricing.html']||'')&&!/Prcing/.test(t['pricing.html']||'')&&/About us/i.test(t['about.html']||'')},
  miss:()=>!S.tags['v1.1.0']?'There is no v1.1.0 tag. Once main has both changes, run git tag v1.1.0 on main.':'v1.1.0 points at a commit that is missing the fix or the about page. You probably tagged before pulling. Delete it with git tag -d v1.1.0, pull main, then tag again.'},
 ],
 warn:[
  {c:()=>mineOnMain().length>0,m:'You committed straight to main and pushed it. On a team, main only changes through pull requests, so a reviewer sees every change before it ships.'},
  {c:()=>H(/^git push\b.*(--force|\s-f\b)/),m:'You force-pushed. Force-pushing rewrites GitHub\'s history and can delete a teammate\'s work. If a push is rejected, git pull, fix any conflicts, then push normally.'},
  {c:()=>!!S.flags.rejected,m:'A push was rejected because GitHub had commits you didn\'t have. That\'s normal on a team. The fix is always git pull first, never --force.'},
  {c:()=>H(/^git add (\.|-A|--all)$/)&&anyCommitHas('.env'),m:'git add . staged everything, including your secrets. Ignore sensitive files first, and read git status before every commit.'},
 ],
 ref:`git status
git log --oneline --all
echo ".env" >> .gitignore

git switch -c fix/pricing-typo
echo "<h1>Pricing</h1><p>Starter plan: $9/month</p>" > pricing.html
git add pricing.html .gitignore
git commit -m "Fix typo in pricing heading and ignore .env"
git push -u origin fix/pricing-typo
gh pr create --title "Fix typo in pricing heading"
gh pr merge 1

git switch main
git pull
git switch -c feature/about
echo "<h1>About us</h1>" > about.html
git add about.html
git commit -m "Add about page"
git push -u origin feature/about
gh pr create --title "Add about page"
gh pr merge 2

git switch main
git pull
git branch -d fix/pricing-typo
git branch -d feature/about
git tag v1.1.0`},
});
})();
