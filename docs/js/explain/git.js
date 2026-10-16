/* git: visual "Understand it" walkthroughs (concept cards, anatomy, rules, step-through animations). */
{
/* Small drawing helpers for commit graphs, the three areas and laptop/GitHub pictures.
   They live inside this block so nothing leaks into the other track files. */
const cm=(x,y,l,c)=>`<circle class="${c||'bx-a'}" cx="${x}" cy="${y}" r="18"/><text class="t-b" x="${x}" y="${y+6}" text-anchor="middle" style="font-size:16px">${l}</text>`;
const cs=(x,y,l,c)=>`<circle class="${c||'bx-a'}" cx="${x}" cy="${y}" r="14"/><text class="t-b" x="${x}" y="${y+5}" text-anchor="middle" style="font-size:14px">${l}</text>`;
const ed=(x1,y1,x2,y2,c)=>`<path class="${c||'ln'}" style="stroke-width:3" d="M${x1} ${y1}${y1===y2?'H'+x2:'C'+((x1+x2)/2)+' '+y1+' '+((x1+x2)/2)+' '+y2+' '+x2+' '+y2}"/>`;
/* branch sticky note above (up) or below a commit at (x,cy); head adds the HEAD "you are here" pill */
const br=(n,x,cy,up,head,c)=>{const w=n.length*9+18,y=up?cy-62:cy+36;let s=`<path class="ln-d" d="M${x} ${up?cy-36:cy+18}V${up?cy-18:cy+36}"/><rect class="${c||'bx-warn'}" x="${x-w/2}" y="${y}" width="${w}" height="26" rx="4"/><text class="t-m" x="${x}" y="${y+18}" text-anchor="middle">${n}</text>`;if(head){const hy=up?cy-98:cy+74;s+=`<path class="ln-a" d="M${x} ${up?cy-74:cy+62}V${up?cy-62:cy+74}"/><rect class="bx-a" x="${x-30}" y="${hy}" width="60" height="24" rx="12"/><text class="t-b t-a" x="${x}" y="${hy+17}" text-anchor="middle" style="font-size:14px">HEAD</text>`}return s};
/* terminal strip across the top: lines are strings or [text, extra class] */
const tm=(L,h)=>`<rect class="bx-dark" x="4" y="4" width="412" height="${h||L.length*24+14}" rx="8"/>`+L.map((l,k)=>{l=Array.isArray(l)?l:[l];return `<text class="t-term${l[1]?' '+l[1]:''}" x="16" y="${27+k*24}" style="font-size:14px">${l[0]}</text>`}).join('');
/* the three areas: o.w working files, o.s staged files, o.h commits; files are [name, box class]; o.hl highlights a panel (steppers only); o.a lights arrow 1 (add) or 2 (commit) */
const fl=(x,k,f)=>{f=Array.isArray(f)?f:[f];return `<rect class="${f[1]||'bx'}" x="${x+8}" y="${72+k*30}" width="116" height="25" rx="5"/><text class="t-m" x="${x+66}" y="${89+k*30}" text-anchor="middle" style="font-size:14px">${f[0]}</text>`};
const ar=o=>{const X=[4,144,284],N=['Working folder','Staging box','History'],I=[['folder','ic-info'],['box','ic-warn'],['book','ic-a']];let s='';
 X.forEach((x,i)=>{s+=`<rect class="${o.hl===i?'bx-hl':'bx'}" x="${x}" y="4" width="132" height="160" rx="10"/>${V.ic(I[i][0],x+50,8,32,I[i][1])}<text class="t-b" x="${x+66}" y="58" text-anchor="middle">${N[i]}</text>`});
 (o.w||[]).forEach((f,k)=>s+=fl(X[0],k,f));(o.s||[]).forEach((f,k)=>s+=fl(X[1],k,f));
 const h=o.h||[];h.forEach((c,k)=>{if(k)s+=ed(302+(k-1)*36,100,302+k*36,100)});h.forEach((c,k)=>{c=Array.isArray(c)?c:[c];s+=cs(302+k*36,100,c[0],c[1])});
 if(o.hn)s+=`<text class="t" x="350" y="146" text-anchor="middle" style="font-size:14px">${o.hn}</text>`;
 if(o.a!==undefined){const a1=o.a===1,a2=o.a===2;
  s+=`<path class="${a1?'ln-a':'ln-d'}" d="M70 180H196"/><polygon class="${a1?'ah-a':'ah'}" points="196,174 196,186 206,180"/><text class="t-m${a1?' t-a':''}" x="136" y="204" text-anchor="middle" style="font-size:14px">git add</text>`;
  s+=`<path class="${a2?'ln-a':'ln-d'}" d="M214 180H336"/><polygon class="${a2?'ah-a':'ah'}" points="336,174 336,186 346,180"/><text class="t-m${a2?' t-a':''}" x="280" y="204" text-anchor="middle" style="font-size:14px">git commit</text>`}
 return s+(o.x||'')};
/* laptop (left) and GitHub (right). o.l / o.r: commits [label, class, column, dy, parents?]; o.lt / o.rt: tags [name, commit index, up?]; o.dir 'push' | 'pull' | 'fetch' */
const side=(x0,C,T)=>{let s='';const P=C.map((c,k)=>[x0+56+c[2]*52,108+(c[3]||0)]);
 C.forEach((c,k)=>{const ps=c[4]||(k?[k-1]:[]);ps.forEach(p=>s+=ed(P[p][0],P[p][1],P[k][0],P[k][1]))});
 C.forEach((c,k)=>s+=cs(P[k][0],P[k][1],c[0],c[1]));
 (T||[]).forEach(t=>{const [x,y]=P[t[1]],w=t[0].length*8.4+14,ty=t[2]?y-48:y+24;s+=`<path class="ln-d" d="M${x} ${t[2]?y-24:y+14}V${t[2]?y-14:y+24}"/><rect class="${t[3]||'bx-warn'}" x="${x-w/2}" y="${ty}" width="${w}" height="24" rx="4"/><text class="t-m" x="${x}" y="${ty+17}" text-anchor="middle" style="font-size:14px">${t[0]}</text>`});return s};
const lg=o=>{let s=`<rect class="bx" x="4" y="4" width="200" height="160" rx="10"/>${V.ic('laptop',12,8,30,'ic-info')}<text class="t-b" x="48" y="30">Your laptop</text>
<rect class="${o.rc||'bx'}" x="216" y="4" width="200" height="160" rx="10"/>${V.ic('cloud',224,8,30,'ic-a')}<text class="t-b" x="260" y="30">GitHub (origin)</text>`;
 s+=side(4,o.l||[],o.lt)+side(216,o.r||[],o.rt);
 if(o.dir==='push')s+=`<path class="ln-a" d="M120 182H290"/><polygon class="ah-a" points="290,176 290,188 300,182"/><text class="t-m t-a" x="210" y="206" text-anchor="middle" style="font-size:14px">${o.cmd||'git push'}</text>`;
 if(o.dir==='pull'||o.dir==='fetch')s+=`<path class="ln-ok" d="M300 182H130"/><polygon class="ah-ok" points="130,176 130,188 120,182"/><text class="t-m t-ok" x="210" y="206" text-anchor="middle" style="font-size:14px">${o.cmd||'git '+o.dir}</text>`;
 if(o.bad)s+=`<text class="t-b t-bad" x="210" y="206" text-anchor="middle" style="font-size:14px">${o.bad}</text>`;
 return s+(o.x||'')};

explain('g1',`
<p>Every professional developer uses Git, every working day. It is the safety net that lets you try anything, break things and still get back to the version that worked.</p>

${V.card(1,'Version control','save points for your project',`
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Top: a mess of copied folders called site, site-v2, site-final and site-FINAL-2. Bottom: one folder with a timeline of three save points">
<text class="t-b t-bad" x="10" y="22">Without Git</text>
${V.ic('folder',10,30,40,'ic-bad')}<text class="t-m" x="30" y="88" text-anchor="middle" style="font-size:14px">site</text>
${V.ic('folder',96,30,40,'ic-bad')}<text class="t-m" x="116" y="88" text-anchor="middle" style="font-size:14px">site-v2</text>
${V.ic('folder',196,30,40,'ic-bad')}<text class="t-m" x="216" y="88" text-anchor="middle" style="font-size:14px">site-final</text>
${V.ic('folder',320,30,40,'ic-bad')}<text class="t-m" x="340" y="88" text-anchor="middle" style="font-size:14px">site-FINAL-2</text>
<text class="t-b t-ok" x="10" y="124">With Git</text>
${V.ic('folder',10,134,48,'ic-ok')}<text class="t-m" x="34" y="200" text-anchor="middle" style="font-size:14px">site</text>
${ed(110,160,370,160,'ln-ok')}
${cm(110,160,'1','bx-ok')}${cm(240,160,'2','bx-ok')}${cm(370,160,'3','bx-ok')}
<text class="t" x="110" y="200" text-anchor="middle" style="font-size:14px">Add page</text><text class="t" x="240" y="200" text-anchor="middle" style="font-size:14px">Add colours</text><text class="t" x="370" y="200" text-anchor="middle" style="font-size:14px">Fix title</text>
</svg><figcaption>Top: saving by copying folders. Soon nobody knows which one is right. Bottom: Git keeps one folder and a timeline of save points inside it, each with a note saying what changed.</figcaption></figure>
${V.like(`<p>Save points in a video game. Before a hard level you save. If it goes badly, you load the save and try again. Git gives you unlimited save points, each with a name, and you can jump back to any of them.</p>`)}
${V.why(`<p>In 2005 the Linux kernel team lost the free use of the tool they kept their code in. Linus Torvalds, who started Linux, wrote a replacement in about two weeks and called it <b>Git</b>. It had to be fast, work offline and survive thousands of people editing at once. Today almost every software team on Earth uses it.</p>`)}
${V.anat([[1,'git'],' ',[2,'--version']],[
 '<b>The program.</b> Every Git command starts with <code>git</code>.',
 '<b>An option.</b> Options start with dashes. This one asks Git to print its version number, which proves it is installed.'])}
${V.hook(`Git is the save button that never forgets: every save point has a name, a date and a reason.`)}
`)}

${V.card(2,'Git and GitHub','the camera and the shared album',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="Git runs on your laptop, offline. GitHub is a website in the cloud. Push sends commits up, pull brings them down">
<rect class="bx-info" x="6" y="10" width="160" height="150" rx="10"/>${V.ic('laptop',50,22,72,'ic-info')}
<text class="t-b" x="86" y="118" text-anchor="middle" style="font-size:17px">Git</text><text class="t" x="86" y="142" text-anchor="middle" style="font-size:14px">on your computer</text>
<rect class="bx-a" x="254" y="10" width="160" height="150" rx="10"/>${V.ic('cloud',298,22,72,'ic-a')}
<text class="t-b" x="334" y="118" text-anchor="middle" style="font-size:17px">GitHub</text><text class="t" x="334" y="142" text-anchor="middle" style="font-size:14px">a website</text>
<path class="ln-a" d="M172 62H240"/><polygon class="ah-a" points="238,56 238,68 248,62"/><text class="t-m t-a" x="210" y="50" text-anchor="middle" style="font-size:14px">push</text>
<path class="ln-ok" d="M248 104H180"/><polygon class="ah-ok" points="182,98 182,110 172,104"/><text class="t-m t-ok" x="210" y="128" text-anchor="middle" style="font-size:14px">pull</text>
</svg><figcaption>Git is a program on your own computer and works with no internet. GitHub is a website that keeps a copy of your project online so other people can reach it.</figcaption></figure>
${V.like(`<p>Git is your camera: it takes the snapshots, and it works anywhere, even offline. GitHub is a shared online photo album where you upload them so friends can see and add their own.</p>`)}
${V.why(`<p>Git on its own lives on one machine. GitHub launched in 2008 so teams could share repositories, review each other's changes in <b>pull requests</b> and run automatic checks with <b>GitHub Actions</b>. GitLab and Bitbucket are similar websites.</p>`)}
${V.rules(V.rh('Rules: do not mix them up'),
 V.ok('git commit','A Git command. Runs on your computer'),V.no('"I committed to GitHub"','Commits are made locally. You push them to GitHub later'),
 V.ok('Git works offline','You can commit on a plane'),V.ok('GitHub needs the internet','It is a website'))}
${V.hook(`Git takes the photos. GitHub is the album you share.`)}
`)}

${V.card(3,'Your name on every commit','git config, once per computer',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A commit card stamped with the author Ada Lovelace and her email address">
<rect class="bx" x="20" y="12" width="380" height="146" rx="10"/>${V.ic('person',36,30,56,'ic-p')}
<text class="t-s" x="110" y="42" style="font-size:14px">Author</text><text class="t-b" x="180" y="42" style="font-size:16px">Ada Lovelace</text>
<text class="t-s" x="110" y="72" style="font-size:14px">Email</text><text class="t-m" x="180" y="72">ada@example.com</text>
<text class="t-s" x="110" y="102" style="font-size:14px">Date</text><text class="t" x="180" y="102">Mon 12 Oct, 10:14</text>
<text class="t-s" x="110" y="132" style="font-size:14px">Message</text><text class="t" x="180" y="132">Add homepage heading</text>
</svg><figcaption>Every commit carries a stamp saying who made it. Git fills in the name and email from your settings, so you set them once.</figcaption></figure>
${V.like(`<p>Signing your name on a piece of homework before you hand it in. Git signs every commit for you, so the team always knows who did what.</p>`)}
${V.anat([[1,'git config'],' ',[2,'--global'],' ',[3,'user.name'],' ',[4,'"Ada Lovelace"']],[
 '<b>Command.</b> Read or change Git settings.',
 '<b>Scope.</b> <code>--global</code> means "for every project on this computer". Without it, the setting is for the current repository only.',
 '<b>Setting name.</b> <code>user.name</code> for your name, <code>user.email</code> for your email.',
 '<b>Value.</b> In quotes, because a name with a space would otherwise be read as two separate words.'])}
${V.rules(V.rh('Rules'),
 V.ok('"Ada Lovelace"','Quote anything with a space in it'),V.no('user.name Ada Lovelace','Without quotes the space splits the name and Git does not store it as you meant'),
 V.rh('Conventions'),
 V.ok('Same email as GitHub','GitHub uses it to link commits to your profile'),V.ok('git config --list','Shows every setting, so you can check your work'))}
${V.build(`<ol><li>Check Git is installed: <code>git --version</code>.</li><li>Set your name with <code>git config --global user.name</code> and your name in quotes.</li><li>Set your email the same way with <code>user.email</code>.</li></ol>`)}
${V.hook(`Name and email, set once, signed on every commit.`)}
`)}

${V.card(4,'Make a repository','git init and git status',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A folder called portfolio before git init, and after, when it contains a hidden .git folder holding the history">
<rect class="bx" x="6" y="10" width="150" height="150" rx="10"/>${V.ic('folder',47,24,68,'ic-info')}<text class="t-m" x="81" y="118" text-anchor="middle">portfolio/</text><text class="t" x="81" y="144" text-anchor="middle" style="font-size:14px">just a folder</text>
<path class="ln-a" d="M164 85H236"/><polygon class="ah-a" points="236,79 236,91 246,85"/><text class="t-m t-a" x="205" y="72" text-anchor="middle" style="font-size:14px">git init</text>
<rect class="bx-ok" x="254" y="10" width="160" height="150" rx="10"/>${V.ic('folder',300,20,68,'ic-ok')}<text class="t-m" x="334" y="108" text-anchor="middle">portfolio/</text>
<rect class="bx-a" x="276" y="118" width="116" height="30" rx="6"/><text class="t-m" x="334" y="139" text-anchor="middle">.git/</text>
</svg><figcaption>git init does not touch your files. It adds one hidden folder, .git, and that folder is where Git keeps the whole history.</figcaption></figure>
${V.like(`<p>Putting a diary inside a box of toys. The toys stay as they were, but from now on the diary records every change. The <code>.git</code> folder is that diary.</p>`)}
${V.anat([[1,'git'],' ',[2,'init']],[
 '<b>The program.</b>',
 '<b>Initialise.</b> Turns the folder you are standing in into a <b>repository</b> (repo): a folder Git is tracking.'])}
<p><b>Watch a repository being born.</b></p>
${V.steps([
 ['Check Git is installed. It prints a version number. Yours may be different, and that is fine.',`<svg viewBox="0 0 420 200" role="img" aria-label="git --version prints git version 2.51.0">
${tm(['$ git --version',['git version 2.51.0','t-ok']],110)}
${V.ic('folder',20,128,54,'ic-info')}<text class="t-m" x="90" y="164">portfolio/</text>
<text class="t" x="206" y="164" style="font-size:14px">not a repository yet</text>
</svg>`],
 ['Stamp your name and email. Git saves them in a settings file in your home folder, not in the project.',`<svg viewBox="0 0 420 200" role="img" aria-label="git config sets user.name and user.email">
${tm(['$ git config --global user.name "Ada"','$ git config --global user.email "ada@..."'],110)}
${V.ic('folder',20,128,54,'ic-info')}<text class="t-m" x="90" y="164">portfolio/</text>
<rect class="bx-hl" x="300" y="126" width="114" height="64" rx="8"/>${V.ic('person',306,136,40,'ic-p')}<text class="t-b" x="348" y="154">Ada</text><text class="t-m" x="348" y="178" style="font-size:14px">ada@...</text>
</svg>`],
 ['<b>git init</b> creates the hidden <b>.git</b> folder. The folder is now a repository, still with no commits.',`<svg viewBox="0 0 420 200" role="img" aria-label="git init creates .git inside portfolio">
${tm(['$ git init',['Initialized empty Git repository','t-ok']],110)}
${V.ic('folder',20,128,54,'ic-ok')}<text class="t-m" x="90" y="164">portfolio/</text>
<rect class="bx-hl" x="200" y="144" width="86" height="30" rx="6"/><text class="t-m" x="243" y="165" text-anchor="middle">.git/</text>
<rect class="bx-info" x="300" y="126" width="114" height="64" rx="8"/>${V.ic('person',306,136,40,'ic-p')}<text class="t-b" x="348" y="154">Ada</text><text class="t-m" x="348" y="178" style="font-size:14px">ada@...</text>
</svg>`],
 ['<b>git status</b> answers "where am I?" You are on the branch <b>main</b>, with no commits yet and nothing to save.',`<svg viewBox="0 0 420 200" role="img" aria-label="git status: On branch main, No commits yet">
${tm(['$ git status',['On branch main','t-ok'],['No commits yet','t-ok'],'nothing to commit'],110)}
${V.ic('folder',20,128,54,'ic-ok')}<text class="t-m" x="90" y="164">portfolio/</text>
<rect class="bx-a" x="200" y="144" width="86" height="30" rx="6"/><text class="t-m" x="243" y="165" text-anchor="middle">.git/</text>
<rect class="bx-info" x="300" y="126" width="114" height="64" rx="8"/>${V.ic('person',306,136,40,'ic-p')}<text class="t-b" x="348" y="154">Ada</text><text class="t-m" x="348" y="178" style="font-size:14px">ada@...</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('git init in your home folder','Then Git tracks everything you own. Go into the project folder first'),
 V.no('Deleting .git','Your files survive but the whole history is gone'),
 V.no('A repo inside a repo','Run git init once, at the top of the project'),
 V.rh('Conventions'),
 V.ok('git status','Run it constantly. It also suggests what to type next'),
 V.ok('main','The usual name of the first branch. Set it with git config --global init.defaultBranch main'))}
${V.hook(`<code>init</code> once to start the diary, <code>status</code> often to read where you are.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Can you make a commit with no internet? <i>Yes. Git runs on your computer; only GitHub needs the internet.</i> 2. Why does <code>"Ada Lovelace"</code> need quotes? <i>Without them the space splits it into two words.</i> 3. What appears in a folder after <code>git init</code>? <i>A hidden .git folder holding the history.</i></div>
`);

explain('g2',`
<p>This lesson holds the single most important picture in Git: three areas, and two commands that move your work between them. Get this picture into your head and every later Git command makes sense.</p>

${V.card(1,'The three areas','desk, parcel box, shelf',`
<figure class="fig"><svg viewBox="0 0 420 212" role="img" aria-label="Three areas: working folder with index.html, staging box, and history with commits. git add moves work to the staging box, git commit moves it to history">
${ar({w:[['index.html','bx-info'],['about.html','bx-info']],s:[['index.html','bx-warn']],h:['A','B'],hn:'saved for good',a:0})}
</svg><figcaption>Your edits start in the working folder. git add puts a copy in the staging box, the box for the next commit. git commit seals the box and adds it to the history.</figcaption></figure>
${V.like(`<p>Sending a parcel. Your <b>desk</b> is covered in stuff (the working folder). You put the items you want to send into a <b>box</b> (staging). When the box holds exactly the right things, you tape it shut and write a label (commit). Sealed boxes go on the <b>shelf</b> of history and are never opened again.</p>`)}
${V.why(`<p>A word processor saves whatever is on screen. Git asks you to choose. That lets you save the typo fix you finished while leaving your half-built contact page out of it. Each commit then does one clear thing.</p>`)}
${V.rules(V.rh('The names Git uses'),
 V.ok('working tree','Your files as they are right now'),V.ok('staging area (index)','"Changes to be committed" in git status'),
 V.ok('repository','The history of commits, stored in .git'),V.ok('untracked','A new file Git sees but has never saved'))}
${V.hook(`Desk, box, shelf: <code>add</code> packs the box, <code>commit</code> seals it.`)}
`)}

${V.card(2,'Your first commit','watch a file travel',`
${V.steps([
 ['You create <b>index.html</b>. It sits in your working folder only. git status calls it <b>untracked</b>: Git sees it but is not looking after it.',`<svg viewBox="0 0 420 212" role="img" aria-label="index.html in the working folder, untracked">
${ar({hl:0,w:[['index.html','bx-bad']],hn:'empty',a:0})}</svg>`],
 ['<b>git add index.html</b> puts a copy of the file, as it is right now, into the staging box. Silence on screen means it worked.',`<svg viewBox="0 0 420 212" role="img" aria-label="git add copies index.html into the staging box">
${ar({hl:1,w:[['index.html','bx-info']],s:[['index.html','bx-warn']],hn:'empty',a:1})}</svg>`],
 ['<b>git commit -m "Add homepage heading"</b> seals the box into snapshot <b>A</b>, stamped with your name, the time and your message.',`<svg viewBox="0 0 420 212" role="img" aria-label="git commit creates commit A in history">
${ar({hl:2,w:[['index.html','bx-info']],h:[['A','bx-ok']],hn:'A: Add heading',a:2})}</svg>`],
 ['All three areas now agree. git status says <b>working tree clean</b>: nothing new to save. A calm, safe place to be.',`<svg viewBox="0 0 420 212" role="img" aria-label="Clean: the file and commit A match">
${ar({w:[['index.html','bx-ok']],h:['A'],hn:'A: Add heading'})}
<text class="t-b t-ok" x="210" y="204" text-anchor="middle">working tree clean</text></svg>`]])}
${V.anat([[1,'git commit'],' ',[2,'-m'],' ',[3,'"Add homepage heading"']],[
 '<b>Command.</b> Seal everything in the staging box into one new commit.',
 '<b>Message flag.</b> <code>-m</code> means "the message follows". Leave it out and Git opens a text editor instead.',
 '<b>The message.</b> In quotes. Says what this commit does.'])}
${V.rules(V.rh('Rules'),
 V.no('git commit (nothing staged)','"nothing added to commit": run git add first'),V.no('git add indx.html','A typo gives "pathspec did not match". Check with ls'),
 V.rh('Conventions: messages'),
 V.ok('Add homepage heading','Imperative, like an order: "this commit will... add homepage heading"'),V.no('added stuff','Past tense and vague. Useless in six months'),
 V.ok('Short first line','About 50 characters, capital letter, no full stop'),V.no('fixed it','Fixed what? Say what changed'))}
`)}

${V.card(3,'Why the box matters','commit only part of your work',`
${V.steps([
 ['You changed two files: a finished fix in <b>index.html</b> and a half-built <b>contact.html</b>.',`<svg viewBox="0 0 420 212" role="img" aria-label="Two changed files in the working folder">
${ar({hl:0,w:[['index.html','bx-info'],['contact.html','bx-bad']],h:['A'],hn:'1 commit',a:0})}</svg>`],
 ['Stage only the finished one: <b>git add index.html</b>. contact.html stays on the desk.',`<svg viewBox="0 0 420 212" role="img" aria-label="Only index.html is staged">
${ar({hl:1,w:[['index.html','bx-info'],['contact.html','bx-bad']],s:[['index.html','bx-warn']],h:['A'],hn:'1 commit',a:1})}</svg>`],
 ['Commit. Snapshot <b>B</b> holds the fix and nothing else. The unfinished page waits for its own commit later.',`<svg viewBox="0 0 420 212" role="img" aria-label="Commit B contains only the index.html fix">
${ar({hl:2,w:[['index.html','bx-ok'],['contact.html','bx-bad']],h:['A',['B','bx-ok']],hn:'B: Fix typo',a:2})}</svg>`]])}
${V.like(`<p>Packing for a trip in two suitcases. You only close the first one when everything for it is inside, even if the second is still half empty on the bed.</p>`)}
${V.build(`<ol><li>Create <code>index.html</code> with a heading, using <code>echo</code> and <code>&gt;</code>.</li><li>Run <code>git status</code> and find it under "Untracked files".</li><li>Stage it with <code>git add</code> and the file name.</li><li>Commit with <code>-m</code> and an imperative message.</li><li>Read your history with <code>git log</code>. On a real computer, press <code>q</code> to leave the log.</li></ol>`)}
${V.hook(`Pick it, pack it, label it: <code>add</code>, <code>commit -m</code>, then <code>log</code> to admire it.`)}
`)}

<div class="try"><b>Try it in your head</b>1. You edit a file after running <code>git add</code>. Is the new edit staged? <i>No. git add copies the file as it was at that moment; add it again.</i> 2. Which area is "Changes to be committed"? <i>The staging area.</i> 3. Better message: "updated files" or "Add contact form"? <i>"Add contact form".</i></div>
`);

explain('g3',`
<p>One commit is a save point. Many commits make a <b>history</b>: a story of how your project grew, which you can read, search and rewind. This lesson shows how that chain is built and how to see exactly what changed.</p>

${V.card(1,'The commit chain','every snapshot points to the one before',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Three commits in a chain. Each has an id and a message, and points back to its parent">
${ed(70,70,310,70)}
${cm(70,70,'A')}${cm(190,70,'B')}${cm(310,70,'C','bx-ok')}
<polygon class="ah" points="98,64 98,76 88,70"/><polygon class="ah" points="218,64 218,76 208,70"/>
<text class="t" x="130" y="58" text-anchor="middle" style="font-size:14px">parent</text><text class="t" x="250" y="58" text-anchor="middle" style="font-size:14px">parent</text>
<text class="t-m" x="70" y="122" text-anchor="middle" style="font-size:14px">a3f9c21</text><text class="t-m" x="190" y="122" text-anchor="middle" style="font-size:14px">7d01e4b</text><text class="t-m" x="310" y="122" text-anchor="middle" style="font-size:14px">e41b7d2</text>
<text class="t" x="70" y="146" text-anchor="middle" style="font-size:14px">Add heading</text><text class="t" x="190" y="146" text-anchor="middle" style="font-size:14px">New heading</text><text class="t" x="310" y="146" text-anchor="middle" style="font-size:14px">Add styles</text>
<text class="t-b" x="210" y="186" text-anchor="middle">oldest  ←  time  →  newest</text>
</svg><figcaption>Each commit has an id, a message, an author and a pointer to its parent, the commit before it. Following the parents backwards walks you through the whole history.</figcaption></figure>
${V.like(`<p>A train of carriages. Each new carriage is coupled to the one in front. Start at the last carriage and you can walk forward through every one back to the engine, the very first commit.</p>`)}
${V.why(`<p>Git names each commit with a <b>hash</b>: a 40-character fingerprint calculated from everything inside it, including its parent. Change one letter anywhere and the fingerprint changes. That makes history tamper-proof. You usually see just the first 7 characters, like <code>a3f9c21</code>, which is enough to point at one commit.</p>`)}
<p><b>Watch the chain grow.</b> Notice the <b>main</b> label and <b>HEAD</b> (you are here) move forward with each commit.</p>
${V.steps([
 ['Your first commit, <b>A</b>. It has no parent. The <b>main</b> label sits on it, and <b>HEAD</b> says "you are here".',`<svg viewBox="0 0 420 200" role="img" aria-label="Commit A with main and HEAD">
${cm(70,124,'A','bx-ok')}${br('main',70,124,true,true)}
<text class="t" x="70" y="172" text-anchor="middle" style="font-size:14px">Add heading</text>
</svg>`],
 ['You edit index.html, add and commit. New commit <b>B</b> points back to A as its parent. The labels jump forward to B.',`<svg viewBox="0 0 420 200" role="img" aria-label="Commit B added after A; main and HEAD move to B">
${ed(70,124,190,124)}${cm(70,124,'A')}${cm(190,124,'B','bx-ok')}${br('main',190,124,true,true)}
<text class="t" x="70" y="172" text-anchor="middle" style="font-size:14px">Add heading</text><text class="t" x="190" y="172" text-anchor="middle" style="font-size:14px">New heading</text>
</svg>`],
 ['You add style.css and commit. <b>C</b> points to B. Three save points in a row: you can return to any of them.',`<svg viewBox="0 0 420 200" role="img" aria-label="Commit C added after B; main and HEAD on C">
${ed(70,124,310,124)}${cm(70,124,'A')}${cm(190,124,'B')}${cm(310,124,'C','bx-ok')}${br('main',310,124,true,true)}
<text class="t" x="70" y="172" text-anchor="middle" style="font-size:14px">Add heading</text><text class="t" x="190" y="172" text-anchor="middle" style="font-size:14px">New heading</text><text class="t" x="310" y="172" text-anchor="middle" style="font-size:14px">Add styles</text>
</svg>`],
 ['<b>git log --oneline</b> prints the chain newest first, one commit per line: short id, labels, message.',`<svg viewBox="0 0 420 200" role="img" aria-label="git log --oneline output with three lines">
${tm(['$ git log --oneline',['e41b7d2 (HEAD -&gt; main) Add styles','t-ok'],'7d01e4b New heading','a3f9c21 Add heading'],112)}
${ed(70,164,310,164)}${cm(70,164,'A')}${cm(190,164,'B')}${cm(310,164,'C','bx-ok')}
</svg>`]])}
${V.anat([[1,'e41b7d2'],' ',[2,'(HEAD -&gt; main)'],' ',[3,'Add styles']],[
 '<b>Short id.</b> The first 7 characters of the commit\'s hash.',
 '<b>Labels.</b> You are here (HEAD), on the branch main.',
 '<b>Message.</b> What this commit did.'])}
${V.hook(`Every commit holds hands with its parent. Follow the hands back and you reach the start.`)}
`)}

${V.card(2,'See what changed','git diff and git diff --staged',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="git diff output: a red line removed, a green line added">
${tm(['$ git diff','diff --git a/index.html b/index.html','@@ -1 +1 @@',['-&lt;h1&gt;Hello world&lt;/h1&gt;','t-bad'],['+&lt;h1&gt;Hi, I build websites&lt;/h1&gt;','t-ok']],136)}
<text class="t" x="16" y="162" style="font-size:14px">minus = line taken out, plus = line put in</text>
</svg><figcaption>A diff ("difference") lists the lines that changed. Lines starting with minus were removed, lines starting with plus were added. Changing a line shows up as one of each.</figcaption></figure>
${V.like(`<p>Spot-the-difference in a puzzle book. Git puts the old picture next to the new one and circles every change for you.</p>`)}
<p><b>Which diff shows what?</b> Each one compares two of the three areas.</p>
${V.steps([
 ['You change index.html. The change is on your desk only. <b>git diff</b> (desk vs box) shows it. <b>git diff --staged</b> (box vs history) shows nothing.',`<svg viewBox="0 0 420 212" role="img" aria-label="Edited file in working folder; git diff shows it">
${ar({hl:0,w:[['index.html','bx-warn']],h:['A'],hn:'last: A'})}
<text class="t-m" x="10" y="188" style="font-size:14px">git diff</text><text class="t-b t-ok" x="176" y="188" style="font-size:14px">shows 1 change</text>
<text class="t-m" x="10" y="208" style="font-size:14px">git diff --staged</text><text class="t t-dim" x="176" y="208" style="font-size:14px">nothing</text>
</svg>`],
 ['<b>git add index.html</b> moves the change into the box. Now <b>git diff</b> is empty and <b>git diff --staged</b> shows what the next commit will contain.',`<svg viewBox="0 0 420 212" role="img" aria-label="Change staged; git diff --staged shows it">
${ar({hl:1,w:[['index.html','bx-info']],s:[['index.html','bx-warn']],h:['A'],hn:'last: A'})}
<text class="t-m" x="10" y="188" style="font-size:14px">git diff</text><text class="t t-dim" x="176" y="188" style="font-size:14px">nothing</text>
<text class="t-m" x="10" y="208" style="font-size:14px">git diff --staged</text><text class="t-b t-ok" x="176" y="208" style="font-size:14px">shows 1 change</text>
</svg>`],
 ['<b>git commit</b> seals it as <b>B</b>. All three areas match, so both diffs are empty.',`<svg viewBox="0 0 420 212" role="img" aria-label="Committed as B; both diffs empty">
${ar({hl:2,w:[['index.html','bx-ok']],h:['A',['B','bx-ok']],hn:'last: B'})}
<text class="t-m" x="10" y="188" style="font-size:14px">git diff</text><text class="t t-dim" x="176" y="188" style="font-size:14px">nothing</text>
<text class="t-m" x="10" y="208" style="font-size:14px">git diff --staged</text><text class="t t-dim" x="176" y="208" style="font-size:14px">nothing</text>
</svg>`]])}
${V.anat([[1,'git diff'],' ',[2,'--staged']],[
 '<b>Show differences.</b> On its own: changes you have <i>not</i> staged yet.',
 '<b>Option.</b> Show what <i>is</i> staged, ready for the next commit. <code>--cached</code> means exactly the same.'])}
${V.hook(`Plain <code>diff</code> peeks at the desk. <code>diff --staged</code> peeks in the box.`)}
`)}

${V.card(3,'Small commits, often','one commit, one job',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="One giant commit called stuff compared with three small commits that each do one thing">
<text class="t-b t-bad" x="10" y="24">One giant commit</text>
<circle class="bx-bad" cx="60" cy="68" r="30"/><text class="t-b" x="60" y="74" text-anchor="middle">?</text>
<text class="t-m" x="110" y="74">"stuff"</text>
<text class="t-b t-ok" x="10" y="122">Small commits</text>
${ed(40,154,320,154,'ln-ok')}${cs(40,154,'1','bx-ok')}${cs(180,154,'2','bx-ok')}${cs(320,154,'3','bx-ok')}
<text class="t" x="62" y="159" style="font-size:14px">Fix title</text><text class="t" x="202" y="159" style="font-size:14px">Add logo</text><text class="t" x="342" y="159" style="font-size:14px">Add CSS</text>
</svg><figcaption>If "stuff" breaks the site, you must undo everything in it. With small commits you can find and undo just the one that went wrong.</figcaption></figure>
${V.like(`<p>Writing a story in chapters instead of one endless paragraph. Each chapter has a title, so you can find and rewrite one part without touching the rest.</p>`)}
${V.anat([[1,'git add'],' ',[2,'.']],[
 '<b>Stage.</b>',
 '<b>The dot</b> means "this folder and everything inside it": every changed and new file at once.'])}
${V.rules(V.rh('Rules'),
 V.no('git add . without looking','It grabs everything, including files you did not mean to save. Run git status first'),
 V.ok('git status, then git add .','Check the list, then stage it all'),
 V.rh('Conventions'),
 V.ok('One idea per commit','"Add base styles" is one job. "Styles, footer and a bug fix" is three'),
 V.ok('Commit when something works','A working step is a safe point to come back to'))}
${V.build(`<ol><li>Change <code>index.html</code> by overwriting it with a new heading.</li><li>Run <code>git diff</code> and find the minus and plus lines.</li><li>Stage it and commit with a clear message.</li><li>Create <code>style.css</code>, then add and commit it on its own.</li><li>Run <code>git log --oneline</code> and read your three-commit chain.</li></ol>`)}
${V.hook(`Small and often: one commit, one job, one clear message.`)}
`)}

<div class="try"><b>Try it in your head</b>1. You changed a file but have not staged it. Which command shows the change? <i>git diff.</i> 2. Which commit has no parent? <i>The very first one.</i> 3. You change one letter in an old commit. What happens to its id? <i>It changes, because the id is a fingerprint of the content.</i></div>
`);

explain('g4',`
<p>Everyone breaks things. The difference between a beginner and a professional is that the professional knows exactly how to undo it. Git has a different undo for each kind of mistake, and this lesson gives you the map.</p>

${V.card(1,'Undo an edit','git restore: rewind a file',`
${V.steps([
 ['Everything is clean. index.html on your desk matches the last commit <b>B</b>.',`<svg viewBox="0 0 420 212" role="img" aria-label="Clean working folder matching commit B">
${ar({w:[['index.html','bx-ok']],h:['A','B'],hn:'B: Add styles'})}
</svg>`],
 ['Oops. You run <b>echo "oops" &gt; index.html</b> and wipe out the page. The change is on your desk only.',`<svg viewBox="0 0 420 212" role="img" aria-label="index.html broken in working folder">
${ar({hl:0,w:[['oops!','bx-bad']],h:['A','B'],hn:'B: Add styles'})}
</svg>`],
 ['<b>git restore index.html</b> copies the file back from the last commit. Your broken edit is thrown away and the page is back.',`<svg viewBox="0 0 420 212" role="img" aria-label="git restore copies index.html back from history">
${ar({hl:0,w:[['index.html','bx-ok']],h:['A','B'],hn:'B: Add styles'})}
<path class="ln-ok" d="M346 182H82"/><polygon class="ah-ok" points="82,176 82,188 72,182"/><text class="t-m t-ok" x="210" y="206" text-anchor="middle" style="font-size:14px">git restore index.html</text>
</svg>`]])}
${V.like(`<p>A teacher's answer sheet. You scribbled all over your copy, so you photocopy a fresh one from the original. Your scribbles are gone for good.</p>`)}
${V.anat([[1,'git restore'],' ',[2,'index.html']],[
 '<b>Restore.</b> Put a file back the way it was in the last commit (or the box, if you staged it).',
 '<b>Which file.</b> Name it exactly.'])}
${V.rules(V.no('Restoring work you wanted','Unsaved edits that are thrown away cannot be got back'),V.ok('git diff first','Look at what you are about to lose'))}
`)}

${V.card(2,'Unstage a file','git restore --staged: take it out of the box',`
${V.steps([
 ['You create <b>notes.txt</b>, a private to-do list. It is on your desk.',`<svg viewBox="0 0 420 212" role="img" aria-label="notes.txt in working folder">
${ar({hl:0,w:[['notes.txt','bx-info']],h:['A','B'],a:0})}
</svg>`],
 ['You stage it by accident with <b>git add notes.txt</b>. Now it would go into the next commit.',`<svg viewBox="0 0 420 212" role="img" aria-label="notes.txt staged by mistake">
${ar({hl:1,w:[['notes.txt','bx-info']],s:[['notes.txt','bx-bad']],h:['A','B'],a:1})}
</svg>`],
 ['<b>git restore --staged notes.txt</b> takes it out of the box. The file itself is safe on your desk. Nothing is deleted.',`<svg viewBox="0 0 420 212" role="img" aria-label="notes.txt unstaged, still in working folder">
${ar({hl:0,w:[['notes.txt','bx-ok']],h:['A','B']})}
<path class="ln-ok" d="M206 182H82"/><polygon class="ah-ok" points="82,176 82,188 72,182"/><text class="t-m t-ok" x="140" y="206" text-anchor="middle" style="font-size:14px">git restore --staged</text>
</svg>`]])}
${V.like(`<p>Taking a jumper back out of the parcel before you tape it. The jumper goes back on your bed, not in the bin.</p>`)}
${V.hook(`<code>restore</code> rewinds the desk. <code>restore --staged</code> empties the box. Neither touches history.`)}
`)}

${V.card(3,'Undo a commit','amend, reset --soft and reset --hard',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="HEAD is the commit you are on. HEAD~1 is one before, HEAD~2 two before">
${ed(70,90,350,90)}${cm(70,90,'A')}${cm(210,90,'B')}${cm(350,90,'C','bx-ok')}
<text class="t-m t-a" x="350" y="40" text-anchor="middle" style="font-size:16px">HEAD</text><text class="t-m" x="210" y="40" text-anchor="middle" style="font-size:16px">HEAD~1</text><text class="t-m" x="70" y="40" text-anchor="middle" style="font-size:16px">HEAD~2</text>
<text class="t" x="210" y="140" text-anchor="middle" style="font-size:14px">~1 means "one step back along the parents"</text>
</svg><figcaption>HEAD is the commit you are on now. Add a tilde and a number to count back: HEAD~1 is its parent, HEAD~2 its grandparent.</figcaption></figure>
${V.like(`<p>HEAD is the red "You are here" dot on a shopping-centre map. <code>HEAD~1</code> means "one shop back the way I came".</p>`)}
${V.why(`<p>Sometimes the mistake is not in a file but in a whole commit: a bad message, a forgotten file, or a commit you wish you had not made yet. Git lets you move the branch label back, as long as nobody else has seen those commits.</p>`)}
${V.steps([
 ['Two commits. <b>B</b> has a typo in its message. HEAD (you are here) is on B, so <b>HEAD~1</b> is A.',`<svg viewBox="0 0 420 210" role="img" aria-label="A then B; main and HEAD on B">
${ed(70,130,190,130)}${cm(70,130,'A')}${cm(190,130,'B')}${br('main',190,130,true,true)}
<text class="t" x="70" y="176" text-anchor="middle" style="font-size:14px">homepage</text><text class="t" x="190" y="176" text-anchor="middle" style="font-size:14px">Add stles</text>
<rect class="bx" x="290" y="96" width="124" height="96" rx="10"/>${V.ic('box',334,102,30,'ic-warn')}<text class="t-b" x="352" y="150" text-anchor="middle" style="font-size:14px">Staging box</text><text class="t t-dim" x="352" y="176" text-anchor="middle" style="font-size:14px">empty</text>
</svg>`],
 ['<b>git commit --amend -m "Add base styles"</b> replaces B with a fixed copy, <b>B2</b>. It has a new id. The old B is dropped.',`<svg viewBox="0 0 420 210" role="img" aria-label="Amend replaces B with B2">
${ed(70,130,190,130)}${cm(70,130,'A')}${cm(190,130,'B2','bx-ok')}${br('main',190,130,true,true)}
<text class="t" x="70" y="176" text-anchor="middle" style="font-size:14px">homepage</text><text class="t" x="190" y="176" text-anchor="middle" style="font-size:14px">Add base styles</text>
<circle class="bx t-dim" cx="250" cy="60" r="14"/><text class="t-b t-dim" x="250" y="65" text-anchor="middle" style="font-size:14px">B</text><path class="ln-x" d="M238 72 262 48"/>
<rect class="bx" x="290" y="96" width="124" height="96" rx="10"/>${V.ic('box',334,102,30,'ic-warn')}<text class="t-b" x="352" y="150" text-anchor="middle" style="font-size:14px">Staging box</text><text class="t t-dim" x="352" y="176" text-anchor="middle" style="font-size:14px">empty</text>
</svg>`],
 ['<b>git reset --soft HEAD~1</b> moves main and HEAD back to A. The commit is undone, but its changes wait in the staging box, ready to commit again.',`<svg viewBox="0 0 420 210" role="img" aria-label="reset --soft: main back on A, changes in staging box">
${ed(70,130,172,130,'ln-d')}${cm(70,130,'A')}<circle class="bx t-dim" cx="190" cy="130" r="18"/><text class="t-b t-dim" x="190" y="136" text-anchor="middle" style="font-size:16px">B2</text>${br('main',70,130,true,true)}
<text class="t" x="70" y="176" text-anchor="middle" style="font-size:14px">homepage</text>
<rect class="bx-hl" x="290" y="96" width="124" height="96" rx="10"/>${V.ic('box',334,102,30,'ic-warn')}<text class="t-b" x="352" y="150" text-anchor="middle" style="font-size:14px">Staging box</text><text class="t-m t-ok" x="352" y="176" text-anchor="middle" style="font-size:14px">style.css</text>
</svg>`],
 ['The other choice, <b>git reset --hard HEAD~1</b>, also moves back to A but throws the changes away completely. Box and desk are wiped. Use it with care.',`<svg viewBox="0 0 420 210" role="img" aria-label="reset --hard: main back on A, changes gone">
${ed(70,130,172,130,'ln-d')}${cm(70,130,'A')}<circle class="bx t-dim" cx="190" cy="130" r="18"/><text class="t-b t-dim" x="190" y="136" text-anchor="middle" style="font-size:16px">B2</text>${br('main',70,130,true,true)}
<text class="t" x="70" y="176" text-anchor="middle" style="font-size:14px">homepage</text>
<rect class="bx-bad" x="290" y="96" width="124" height="96" rx="10"/>${V.ic('box',334,102,30,'ic-warn')}<text class="t-b" x="352" y="150" text-anchor="middle" style="font-size:14px">Staging box</text>${V.ic('cross',338,156,28,'ic-bad')}
</svg>`]])}
${V.anat([[1,'git reset'],' ',[2,'--soft'],' ',[3,'HEAD~1']],[
 '<b>Reset.</b> Move the current branch label to another commit.',
 '<b>Mode.</b> <code>--soft</code> keeps the changes staged. <code>--hard</code> deletes them. With no mode (called mixed) they go back to your desk, unstaged.',
 '<b>Where to.</b> One commit before where you are now.'])}
${V.rules(V.rh('Pick the right undo'),
 V.ok('git restore file','Throw away unstaged edits to a file'),V.ok('git restore --staged file','Unstage, keep the edits'),
 V.ok('git commit --amend -m "..."','Fix the last commit\'s message (or add a forgotten file)'),V.ok('git reset --soft HEAD~1','Undo the last commit, keep its changes staged'),
 V.rh('Rules'),
 V.no('Amend or reset after pushing','Both make new history. Teammates who have the old commits get in a mess'),
 V.no('git reset --hard on work you want','Uncommitted changes it deletes are gone'),
 V.ok('git revert for pushed commits','A safe undo for shared history. Coming in a later lesson'))}
${V.build(`<ol><li>Break <code>index.html</code> on purpose with <code>echo</code>, then bring it back with <code>git restore</code>.</li><li>Make <code>notes.txt</code>, stage it, then unstage it with <code>--staged</code>.</li><li>Fix the last commit's message with <code>--amend</code>.</li><li>Undo the last commit but keep its changes with a soft reset to <code>HEAD~1</code>.</li></ol>`)}
${V.hook(`Soft keeps the stuff, hard throws it out. And never rewrite what you have already pushed.`)}
`)}

<div class="try"><b>Try it in your head</b>1. You staged a file by mistake. Which command? <i>git restore --staged file.</i> 2. After <code>git reset --soft HEAD~1</code>, where are the changes? <i>In the staging box.</i> 3. Does <code>--amend</code> keep the same commit id? <i>No. It makes a new commit with a new id.</i></div>
`);

explain('g5',`
<p>Branches let you try a new idea without touching the version that works. Every team in the world builds features this way, so this is where Git starts to feel like a superpower.</p>

${V.card(1,'A branch is a sticky note','a label stuck on a commit',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Commits A and B on main; commit C on a side branch called feature/navbar. Each branch is a sticky note on its newest commit">
${ed(60,110,190,110)}${ed(60,110,300,150)}
${cm(60,110,'A')}${cm(190,110,'B')}${cm(300,150,'C','bx-ok')}
${br('main',190,110,true,true)}
<path class="ln-d" d="M300 132V112"/><rect class="bx-warn" x="228" y="86" width="144" height="26" rx="4"/><text class="t-m" x="300" y="104" text-anchor="middle">feature/navbar</text>
<text class="t" x="60" y="152" text-anchor="middle" style="font-size:14px">shared start</text>
<text class="t" x="300" y="194" text-anchor="middle" style="font-size:14px">only on the feature branch</text>
</svg><figcaption>Commits are the dots. A branch is just a sticky note with a name, stuck on the newest commit of that line of work. HEAD is a pin saying which note you are using now.</figcaption></figure>
${V.like(`<p>A bookmark in a notebook. <b>main</b> marks the page of the finished story. You start a new bookmark, <b>feature/navbar</b>, and write a few draft pages. Each time you write a page, your current bookmark moves forward with you. The finished story's bookmark does not move at all.</p>`)}
${V.why(`<p>Old version control tools copied the whole project to make a branch, which was slow, so people avoided it. In Git a branch is a tiny file holding one commit id. Making one is instant, so you can make a branch for every idea.</p>`)}
${V.anat([[1,'git switch'],' ',[2,'-c'],' ',[3,'feature/navbar']],[
 '<b>Switch.</b> Move to a branch: HEAD and your files change to match it.',
 '<b>Create.</b> <code>-c</code> makes the branch first, on the commit you are on now.',
 '<b>Name.</b> A kind (<code>feature/</code>) and a short description.'])}
<p><b>Watch the notes and HEAD move.</b> The folder on the right shows the files on your disk.</p>
${V.steps([
 ['One commit, <b>A</b>. The <b>main</b> note is on it, and HEAD says you are using main. Your folder holds index.html.',`<svg viewBox="0 0 420 210" role="img" aria-label="Commit A with main and HEAD; folder has index.html">
${cm(90,104,'A')}${br('main',90,104,false,true)}
<rect class="bx" x="316" y="30" width="100" height="150" rx="10"/>${V.ic('folder',348,36,34,'ic-info')}<text class="t-b" x="366" y="90" text-anchor="middle" style="font-size:14px">your disk</text>
<text class="t-m" x="366" y="120" text-anchor="middle" style="font-size:14px">index.html</text>
</svg>`],
 ['<b>git switch -c feature/navbar</b> sticks a new note on the same commit and moves HEAD to it. No files change yet.',`<svg viewBox="0 0 420 210" role="img" aria-label="New note feature/navbar on A; HEAD moves to it">
${cm(90,104,'A')}${br('main',90,104,false)}${br('feature/navbar',90,104,true,true,'bx-hl')}
<rect class="bx" x="316" y="30" width="100" height="150" rx="10"/>${V.ic('folder',348,36,34,'ic-info')}<text class="t-b" x="366" y="90" text-anchor="middle" style="font-size:14px">your disk</text>
<text class="t-m" x="366" y="120" text-anchor="middle" style="font-size:14px">index.html</text>
</svg>`],
 ['You add nav.html and commit. New commit <b>B</b> appears and the note you are using, feature/navbar, moves forward. main stays on A.',`<svg viewBox="0 0 420 210" role="img" aria-label="Commit B on feature/navbar; main still on A">
${ed(90,104,230,104)}${cm(90,104,'A')}${cm(230,104,'B','bx-ok')}${br('main',90,104,false)}${br('feature/navbar',230,104,true,true)}
<rect class="bx" x="316" y="30" width="100" height="150" rx="10"/>${V.ic('folder',348,36,34,'ic-info')}<text class="t-b" x="366" y="90" text-anchor="middle" style="font-size:14px">your disk</text>
<text class="t-m" x="366" y="120" text-anchor="middle" style="font-size:14px">index.html</text><text class="t-m t-ok" x="366" y="146" text-anchor="middle" style="font-size:14px">nav.html</text>
</svg>`],
 ['<b>git switch main</b> moves HEAD back to main, and Git rewrites your folder to match commit A. nav.html vanishes from disk. It is safe inside commit B.',`<svg viewBox="0 0 420 210" role="img" aria-label="HEAD back on main; nav.html gone from disk">
${ed(90,104,230,104)}${cm(90,104,'A')}${cm(230,104,'B')}${br('main',90,104,false,true,'bx-hl')}${br('feature/navbar',230,104,true)}
<rect class="bx" x="316" y="30" width="100" height="150" rx="10"/>${V.ic('folder',348,36,34,'ic-info')}<text class="t-b" x="366" y="90" text-anchor="middle" style="font-size:14px">your disk</text>
<text class="t-m" x="366" y="120" text-anchor="middle" style="font-size:14px">index.html</text><text class="t-m t-dim" x="366" y="146" text-anchor="middle" style="font-size:14px">nav.html</text><path class="ln-x" d="M326 141H406"/>
</svg>`]])}
${V.hook(`A branch is a sticky note. HEAD is the pin that says which note you are holding. Commit, and the note you hold moves.`)}
`)}

${V.card(2,'Listing and switching','git branch, git switch',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="git branch lists branches with a star next to the current one">
${tm(['$ git branch',['* feature/navbar','t-ok'],'  main'],86)}
<path class="ln-a" d="M150 52H200"/><polygon class="ah-a" points="150,46 150,58 140,52"/><text class="t-b t-a" x="208" y="57" style="font-size:14px">the star: you are here</text>
<text class="t" x="16" y="124" style="font-size:14px">The terminal prompt in the sandbox also shows the branch.</text>
</svg><figcaption>git branch with nothing after it lists your branches. The star marks the one HEAD is on.</figcaption></figure>
${V.like(`<p>TV channels. Switching branch is changing channel: the whole screen (your folder) changes to show that channel's programme. The other channels are still broadcasting. You just are not watching them.</p>`)}
${V.rules(V.rh('Rules'),
 V.no('git switch -c my navbar','No spaces in branch names'),V.ok('git switch -c feature/navbar','Slashes and hyphens are fine'),
 V.no('git switch feature/nav','Switching to a branch that does not exist fails. Use -c to create it'),
 V.ok('git checkout -b name','The older way to create and switch. You will see it in tutorials; it does the same job'),
 V.rh('Conventions: name by purpose'),
 V.ok('feature/navbar','New work'),V.ok('fix/login-crash','A bug fix'),V.ok('chore/update-deps','Housekeeping'),V.no('test2, my-branch','Says nothing about the work'))}
${V.build(`<ol><li>List your branches with <code>git branch</code>.</li><li>Create and move to <code>feature/navbar</code> with <code>git switch -c</code>.</li><li>Create <code>nav.html</code>, add it and commit.</li><li>Switch back to main and run <code>ls</code>. nav.html is gone from the folder, but not from Git.</li></ol>`)}
${V.hook(`<code>switch -c</code> makes a new note and moves to it. Plain <code>switch</code> just moves.`)}
`)}

<div class="try"><b>Try it in your head</b>1. You are on feature/navbar and commit. Which note moves? <i>feature/navbar. main stays put.</i> 2. Does making a branch copy your files? <i>No. It just adds a label pointing at a commit.</i> 3. Why does nav.html vanish when you switch to main? <i>Git rewrites the folder to match main's commit, which never had nav.html.</i></div>
`);

explain('g6',`
<p>Branches let you work apart. Merging brings the work back together. Every finished feature ends with a merge, so learn the two shapes it can take.</p>

${V.card(1,'Fast-forward','main just catches up',`
${V.like(`<p>Catching up on a TV series. Your friend is three episodes ahead and you have not watched anything different. You simply skip forward to where they are. Nothing new is made.</p>`)}
${V.steps([
 ['You are on <b>main</b> at A. feature/navbar is one commit ahead, at B, and main has not moved since the branch started.',`<svg viewBox="0 0 420 200" role="img" aria-label="main on A, feature/navbar on B ahead in a straight line">
${ed(80,110,240,110)}${cm(80,110,'A')}${cm(240,110,'B')}${br('main',80,110,true,true)}${br('feature/navbar',240,110,false)}
</svg>`],
 ['<b>git merge feature/navbar</b>. Git sees that B already contains everything in A, so there is nothing to combine.',`<svg viewBox="0 0 420 200" role="img" aria-label="Git checks that B contains A">
${ed(80,110,240,110,'ln-a')}${cm(80,110,'A')}${cm(240,110,'B','bx-ok')}${br('main',80,110,true,true)}${br('feature/navbar',240,110,false)}
<text class="t-b t-a" x="160" y="96" text-anchor="middle" style="font-size:14px">straight line?</text>
</svg>`],
 ['So it just slides the main note forward onto B. This is a <b>fast-forward</b>: no new commit is made.',`<svg viewBox="0 0 420 200" role="img" aria-label="main slides forward to B">
${ed(80,110,240,110)}${cm(80,110,'A')}${cm(240,110,'B','bx-ok')}${br('main',240,110,true,true,'bx-hl')}${br('feature/navbar',240,110,false)}
<text class="t-b t-ok" x="340" y="116" text-anchor="middle">Fast-forward</text>
</svg>`]])}
${V.anat([[1,'git merge'],' ',[2,'feature/navbar']],[
 '<b>Merge.</b> Bring another branch\'s commits into the branch you are on now.',
 '<b>The giver.</b> The branch whose work you want. You stand on the receiver.'])}
${V.hook(`Fast-forward: nothing to mix, so the note just slides.`)}
`)}

${V.card(2,'Three-way merge','two lines of work become one',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="Two streams joining into one river, like two branches joining in a merge commit">
${ed(40,60,250,110,'ln-ok')}${ed(40,160,250,110,'ln-ok')}${ed(250,110,400,110,'ln-ok')}
${V.ic('person',8,30,36,'ic-info')}${V.ic('person',8,130,36,'ic-p')}
<text class="t" x="120" y="54" style="font-size:14px">navbar work</text><text class="t" x="120" y="176" style="font-size:14px">footer work</text>
${cm(250,110,'M','bx-ok')}<text class="t-b" x="282" y="96">merge commit</text><text class="t" x="282" y="140" style="font-size:14px">two parents</text>
</svg><figcaption>When both branches have new commits, Git makes a new merge commit that joins them. It is the only kind of commit with two parents.</figcaption></figure>
${V.like(`<p>Two streams meeting to form a river. Both bring water. The point where they join is a new place on the map, the merge commit.</p>`)}
${V.why(`<p>Git finds the last commit both branches share, called the <b>merge base</b>. It compares each side with it and combines both sets of changes. Three snapshots are involved (base, yours, theirs), which is where the name comes from.</p>`)}
${V.steps([
 ['main is at B (it already has the navbar). feature/footer split off earlier, from A, and has its own commit C.',`<svg viewBox="0 0 420 236" role="img" aria-label="main on B, feature/footer on C, both from A">
${ed(60,110,190,110)}${ed(60,110,190,170)}${cm(60,110,'A')}${cm(190,110,'B')}${cm(190,170,'C')}${br('main',190,110,true,true)}
${br('feature/footer',190,170,false)}
</svg>`],
 ['<b>git merge feature/footer</b>. Git finds the merge base, <b>A</b>, the last commit both lines share, and combines both sets of changes.',`<svg viewBox="0 0 420 236" role="img" aria-label="Git finds merge base A">
${ed(60,110,190,110,'ln-a')}${ed(60,110,190,170,'ln-a')}${cm(60,110,'A','bx-hl')}${cm(190,110,'B')}${cm(190,170,'C')}${br('main',190,110,true,true)}
${br('feature/footer',190,170,false)}
<text class="t-b t-a" x="60" y="152" text-anchor="middle" style="font-size:14px">base</text>
</svg>`],
 ['It makes a new <b>merge commit, M</b>, with two parents: B and C. main moves onto M. Your folder now has the navbar and the footer.',`<svg viewBox="0 0 420 236" role="img" aria-label="Merge commit M with parents B and C">
${ed(60,110,190,110)}${ed(60,110,190,170)}${ed(190,110,330,110,'ln-ok')}${ed(190,170,330,110,'ln-ok')}${cm(60,110,'A')}${cm(190,110,'B')}${cm(190,170,'C')}${cm(330,110,'M','bx-ok')}${br('main',330,110,true,true,'bx-hl')}
${br('feature/footer',190,170,false)}
</svg>`],
 ['Tidy up: <b>git branch -d feature/footer</b> peels off the note. The commits stay in history, safely reachable from main.',`<svg viewBox="0 0 420 236" role="img" aria-label="feature/footer note removed; commits remain">
${ed(60,110,190,110)}${ed(60,110,190,170)}${ed(190,110,330,110)}${ed(190,170,330,110)}${cm(60,110,'A')}${cm(190,110,'B')}${cm(190,170,'C')}${cm(330,110,'M')}${br('main',330,110,true,true)}
<rect class="bx t-dim" x="118" y="206" width="144" height="26" rx="4"/><text class="t-m t-dim" x="190" y="224" text-anchor="middle">feature/footer</text><path class="ln-x" d="M118 232 262 206"/>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('git switch main, then merge','Stand on the branch that receives the work'),V.no('git merge main (on the feature)','Pulls main into your feature instead. Not what you meant'),
 V.ok('git branch -d name','Deletes a merged branch note. Refuses if the work is not merged yet, which protects you'),
 V.no('git branch -D name','Capital D forces it. Only when you really want to throw that work away'),
 V.rh('Conventions'),
 V.ok('Delete merged branches','Keeps git branch short and clear'),V.ok('git log --oneline --graph','Draws the shape of the merge in the terminal'))}
${V.build(`<ol><li>Check you are on main with <code>git branch</code>.</li><li>Merge <code>feature/navbar</code> and look for "Fast-forward".</li><li>Merge <code>feature/footer</code>. This one makes a merge commit.</li><li>Delete <code>feature/navbar</code> with <code>-d</code>, then read <code>git log --oneline</code>.</li></ol>`)}
${V.hook(`Straight line: slide the note. Fork in the road: tie the knot with a two-parent merge commit.`)}
`)}

<div class="try"><b>Try it in your head</b>1. main has not moved since you branched. What kind of merge? <i>A fast-forward, with no new commit.</i> 2. How many parents does a merge commit have? <i>Two.</i> 3. Does <code>git branch -d</code> delete commits? <i>No, only the label.</i></div>
`);

explain('g7',`
<p>Sooner or later Git will stop a merge and say <b>CONFLICT</b>. It sounds scary, but it is routine: Git is simply asking you to make one decision it cannot make for you.</p>

${V.card(1,'Why conflicts happen','same line, two different edits',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="Two people change the same title line differently; Git cannot choose">
${V.ic('person',8,20,44,'ic-info')}<rect class="bx-info" x="58" y="22" width="232" height="40" rx="8"/><text class="t-m" x="174" y="48" text-anchor="middle" style="font-size:14px">Portfolio | Home</text>
${V.ic('person',8,124,44,'ic-p')}<rect class="bx-info" x="58" y="126" width="232" height="40" rx="8"/><text class="t-m" x="174" y="152" text-anchor="middle" style="font-size:14px">Jane Doe | Developer</text>
${ed(292,42,344,94,'ln-a')}${ed(292,146,344,94,'ln-a')}
${V.ic('warn',344,68,52,'ic-warn')}<text class="t-b t-warn" x="370" y="146" text-anchor="middle" style="font-size:14px">which?</text>
</svg><figcaption>main changed the title to one thing, the feature branch changed the same line to something else. Git will not guess which is right.</figcaption></figure>
${V.like(`<p>Two friends editing the same sentence in a shared essay at the same time. Changes to different paragraphs are easy to combine. But when both rewrote the same sentence, someone has to read both and decide.</p>`)}
${V.why(`<p>Git merges different lines, and different files, automatically. It only stops when the same lines changed in different ways on both sides. Guessing could silently lose someone's work, so Git asks a human.</p>`)}
${V.steps([
 ['Both branches started from the same title, then each changed that one line. main says "Portfolio | Home"; feature/title says "Jane Doe | Developer".',`<svg viewBox="0 0 420 210" role="img" aria-label="main and feature/title both changed the title line">
${ed(60,120,190,80)}${ed(60,120,190,160)}${cm(60,120,'A')}${cm(190,80,'B')}${cm(190,160,'C')}
<rect class="bx-warn" x="214" y="67" width="54" height="26" rx="4"/><text class="t-m" x="241" y="85" text-anchor="middle">main</text>
<rect class="bx-warn" x="214" y="147" width="126" height="26" rx="4"/><text class="t-m" x="277" y="165" text-anchor="middle">feature/title</text>
<text class="t" x="214" y="56" style="font-size:14px">"Portfolio | Home"</text><text class="t" x="214" y="196" style="font-size:14px">"Jane Doe | Developer"</text>
</svg>`],
 ['On main you run <b>git merge feature/title</b>. Git combines what it can, hits the clashing line and pauses the merge halfway.',`<svg viewBox="0 0 420 210" role="img" aria-label="Merge stops with CONFLICT">
${tm(['$ git merge feature/title',['CONFLICT (content): Merge conflict','t-bad'],['in index.html','t-bad'],'Automatic merge failed; fix conflicts...'],110)}
${V.ic('warn',180,130,60,'ic-warn')}<text class="t-b t-warn" x="250" y="168">merge paused</text>
</svg>`],
 ['Git writes <b>both</b> versions into the file, fenced by markers. Your job: choose the final text and delete the markers.',`<svg viewBox="0 0 420 210" role="img" aria-label="index.html contains conflict markers around both versions">
${tm(['$ cat index.html',['&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD','t-warn'],'&lt;title&gt;Portfolio | Home&lt;/title&gt;',['=======','t-warn'],'&lt;title&gt;Jane Doe | Developer&lt;/title&gt;',['&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/title','t-warn']],160)}
<text class="t" x="16" y="196" style="font-size:14px">top half: yours (HEAD)   bottom half: theirs</text>
</svg>`]])}
${V.hook(`Different lines merge themselves. Same line, two answers: Git hands you the pen.`)}
`)}

${V.card(2,'Reading the markers','three fences around two versions',`
${V.anat([[1,'&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD'],'\n',[2,'&lt;title&gt;Portfolio | Home&lt;/title&gt;'],'\n',[3,'======='],'\n',[4,'&lt;title&gt;Jane Doe | Developer&lt;/title&gt;'],'\n',[5,'&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/title']],[
 '<b>Start fence.</b> What follows is the version on HEAD: the branch you are on.',
 '<b>Your version.</b>',
 '<b>Middle fence.</b> Separates the two sides.',
 '<b>Their version.</b> From the branch you are merging in.',
 '<b>End fence.</b> Names the incoming branch.'])}
${V.like(`<p>A teacher's note in the margin: "You wrote this... but your partner wrote that. Pick one, or write a better sentence, then rub out my note."</p>`)}
<p><b>Resolve it.</b> Watch the file go from conflicted to committed.</p>
${V.steps([
 ['After the clash, index.html is <b>conflicted</b>. git status lists it under "Unmerged paths" as "both modified".',`<svg viewBox="0 0 420 212" role="img" aria-label="index.html conflicted in working folder">
${ar({hl:0,w:[['index.html','bx-bad']],h:['B','C'],hn:'merge paused',a:0})}
</svg>`],
 ['You edit the file to the final version, for example <b>Jane Doe | Portfolio</b>, and delete all three marker lines.',`<svg viewBox="0 0 420 212" role="img" aria-label="index.html fixed, markers removed">
${ar({hl:0,w:[['index.html','bx-ok']],h:['B','C'],hn:'merge paused',a:0})}
</svg>`],
 ['<b>git add index.html</b> tells Git "this conflict is resolved". The fixed file goes into the box.',`<svg viewBox="0 0 420 212" role="img" aria-label="Resolved file staged">
${ar({hl:1,w:[['index.html','bx-ok']],s:[['index.html','bx-warn']],h:['B','C'],hn:'merge paused',a:1})}
</svg>`],
 ['<b>git commit</b> finishes the merge. Git already wrote a message ("Merge branch \'feature/title\'"), so <code>-m</code> is optional. Merge commit <b>M</b> is born.',`<svg viewBox="0 0 420 212" role="img" aria-label="Merge commit M created">
${ar({hl:2,w:[['index.html','bx-ok']],h:['B','C',['M','bx-ok']],hn:'merge done',a:2})}
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('Leaving a marker behind','A stray &lt;&lt;&lt;&lt;&lt;&lt;&lt; breaks the page. Search the file for them'),
 V.ok('git add, then git commit','add marks it resolved; commit finishes the merge'),
 V.ok('git merge --abort','Changed your mind? Go back to exactly before the merge'),
 V.ok('git status','Lists every conflicted file under "Unmerged paths"'),
 V.rh('Conventions'),
 V.ok('Keep both ideas if sensible','"Jane Doe | Portfolio" uses a bit of each side'),
 V.ok('Merge main into your branch often','Small, frequent merges mean small conflicts'))}
${V.build(`<ol><li>On main, merge <code>feature/title</code> and read the CONFLICT message.</li><li>Look inside with <code>cat index.html</code> and find the three fences.</li><li>Overwrite the file with one clean title line, no markers.</li><li>Stage the file, then commit to finish the merge.</li></ol>`)}
${V.hook(`See the fences, pick the words, delete the fences, then <code>add</code> and <code>commit</code>.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Two branches change different files. Conflict? <i>No. Git merges them automatically.</i> 2. Which side is between <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> and <code>=======</code>? <i>Yours: the branch you are on.</i> 3. How do you back out of a merge halfway? <i>git merge --abort.</i></div>
`);

explain('g8',`
<p>So far your history has lived only on your laptop. If the laptop dies, the work dies with it, and nobody else can help. This lesson connects your repository to GitHub so it is backed up and shareable.</p>

${V.card(1,'Remotes and origin','a saved contact for another copy',`
<figure class="fig"><svg viewBox="0 0 420 212" role="img" aria-label="Your laptop with commit A and an empty GitHub repository, joined by a remote called origin">
${lg({l:[['A','bx-a',0]],lt:[['main',0,true]],x:`<path class="ln-d" d="M150 108H330"/><rect class="bx-a" x="170" y="94" width="80" height="28" rx="14"/><text class="t-m t-a" x="210" y="113" text-anchor="middle" style="font-size:14px">origin</text><text class="t" x="316" y="140" text-anchor="middle" style="font-size:14px">empty repo</text>`})}
<text class="t-m" x="210" y="198" text-anchor="middle" style="font-size:14px">https://github.com/you/portfolio.git</text>
</svg><figcaption>A remote is another copy of your repository somewhere else, usually GitHub. You give it a short nickname so you never have to type the long web address again. By convention the main one is called origin.</figcaption></figure>
${V.like(`<p>Saving a friend in your phone's contacts. You save the long number once under a nickname, then you just tap "Mum". <b>origin</b> is the nickname; the URL is the number.</p>`)}
${V.anat([[1,'git remote add'],' ',[2,'origin'],' ',[3,'https://github.com/you/portfolio.git']],[
 '<b>Command.</b> Save a new remote. It only stores the address; nothing is uploaded yet.',
 '<b>Nickname.</b> <code>origin</code> by convention.',
 '<b>Address.</b> Copied from the green "Code" button on GitHub. SSH addresses look like <code>git@github.com:you/portfolio.git</code>.'])}
${V.rules(V.ok('git remote -v','Lists your remotes and their addresses'),V.no('git remote add origin (twice)','"remote origin already exists". Use git remote set-url to change it'),
 V.ok('Empty repo on GitHub','When creating it, do not tick "Add a README" if you already have commits locally'))}
`)}

${V.card(2,'Push','send your commits up',`
${V.steps([
 ['Your laptop has commit <b>A</b>. GitHub has nothing yet.',`<svg viewBox="0 0 420 212" role="img" aria-label="Laptop has A; GitHub empty">
${lg({l:[['A','bx-a',0]],lt:[['main',0,true]]})}
</svg>`],
 ['<b>git push -u origin main</b> uploads main to GitHub. Now GitHub has A too, with its own main note.',`<svg viewBox="0 0 420 212" role="img" aria-label="Push copies A to GitHub">
${lg({l:[['A','bx-a',0]],lt:[['main',0,true]],r:[['A','bx-ok',0]],rt:[['main',0,true]],rc:'bx-hl',dir:'push',cmd:'git push -u origin main'})}
</svg>`],
 ['The <b>-u</b> also linked your main to GitHub\'s. Your laptop keeps a note called <b>origin/main</b>: "the last time I looked, GitHub\'s main was here". From now on, plain <b>git push</b> works.',`<svg viewBox="0 0 420 212" role="img" aria-label="Laptop shows origin/main on A">
${lg({l:[['A','bx-a',0]],lt:[['main',0,true],['origin/main',0,false,'bx-info']],r:[['A','bx-a',0]],rt:[['main',0,true]]})}
</svg>`]])}
${V.anat([[1,'git push'],' ',[2,'-u'],' ',[3,'origin'],' ',[4,'main']],[
 '<b>Push.</b> Upload commits GitHub does not have yet.',
 '<b>Set upstream.</b> Remember this pairing, so next time <code>git push</code> and <code>git pull</code> need nothing after them.',
 '<b>Where to.</b> The remote\'s nickname.',
 '<b>Which branch.</b>'])}
${V.like(`<p>Uploading photos to a shared album. Only the new ones go up; the ones already there are not sent again.</p>`)}
`)}

${V.card(3,'Rejected? Pull first','someone got there before you',`
${V.steps([
 ['Your teammate Ada pushed commit <b>T</b> to GitHub. Meanwhile you made commit <b>B</b> on your laptop. Both grew from A.',`<svg viewBox="0 0 420 212" role="img" aria-label="Laptop A then B; GitHub A then T">
${lg({l:[['A','bx-a',0],['B','bx-info',1]],lt:[['main',1,true]],r:[['A','bx-a',0],['T','bx-warn',1]],rt:[['main',1,true]]})}
</svg>`],
 ['<b>git push</b> is <b>rejected</b>. If GitHub took your B, Ada\'s T would be lost. Git refuses: "Updates were rejected... fetch first".',`<svg viewBox="0 0 420 212" role="img" aria-label="Push rejected">
${lg({l:[['A','bx-a',0],['B','bx-info',1]],lt:[['main',1,true]],r:[['A','bx-a',0],['T','bx-warn',1]],rt:[['main',1,true]],rc:'bx-bad',bad:'git push: rejected',x:V.ic('cross',92,176,34,'ic-bad')})}
</svg>`],
 ['<b>git pull</b> downloads T (that half is <b>fetch</b>) and merges it with your B (that half is <b>merge</b>). You get merge commit <b>M</b> holding both.',`<svg viewBox="0 0 420 212" role="img" aria-label="Pull brings T down and merges it into M">
${lg({l:[['A','bx-a',0],['B','bx-info',1,-20],['T','bx-warn',1,20,[0]],['M','bx-ok',2,0,[1,2]]],lt:[['main',3,true]],r:[['A','bx-a',0],['T','bx-warn',1]],rt:[['main',1,true]],dir:'pull'})}
</svg>`],
 ['<b>git push</b> again. GitHub already has T, M builds on it, so nothing is lost. Accepted.',`<svg viewBox="0 0 420 212" role="img" aria-label="Push succeeds; GitHub has M">
${lg({l:[['A','bx-a',0],['B','bx-info',1,-20],['T','bx-warn',1,20,[0]],['M','bx-ok',2,0,[1,2]]],lt:[['main',3,true]],r:[['A','bx-a',0],['B','bx-info',1,-20],['T','bx-warn',1,20,[0]],['M','bx-ok',2,0,[1,2]]],rt:[['main',3,true]],rc:'bx-hl',dir:'push'})}
</svg>`]])}
${V.like(`<p>A shared class notebook. Before you write your page, you read the pages others added since you last looked. Otherwise you would write over them.</p>`)}
${V.rules(V.rh('Rules'),
 V.ok('git pull, then git push','The fix for "Updates were rejected"'),V.no('git push --force','Overwrites GitHub and deletes your teammate\'s work. Never your first move'),
 V.ok('git fetch','Download only. Updates origin/main but leaves your files alone'),V.ok('git pull = fetch + merge','Download and combine in one go'),
 V.rh('Conventions'),
 V.ok('Pull before you start work','Fewer surprises and smaller merges'),
 V.ok('git config --global pull.rebase false','On a real computer Git may ask how to combine diverged work. false means merge, as in this lesson'))}
${V.build(`<ol><li>Add GitHub as <code>origin</code> with <code>git remote add</code>.</li><li>Push main with <code>-u</code> so it remembers the link.</li><li>Commit a change and try <code>git push</code>. Read the rejection.</li><li>Run <code>git pull</code> to bring in Ada's commit.</li><li>Push again. This time it works.</li></ol>`)}
${V.hook(`Rejected? Pull, then push. Never force your way past a teammate.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What is <code>origin</code>? <i>The nickname of your main remote, usually GitHub.</i> 2. Difference between fetch and pull? <i>Fetch only downloads; pull downloads and merges.</i> 3. Why is a push rejected? <i>GitHub has commits you do not have yet.</i></div>
`);

explain('g9',`
<p>In real teams, nobody pushes straight to <code>main</code>. Every change goes through a <b>pull request</b> first, so another person can check it. This is the daily rhythm of professional software work, and it is what interviewers expect you to know.</p>

${V.card(1,'GitHub Flow','seven steps, every time',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="GitHub Flow: branch, commit, push, pull request, review, merge, pull main">
${V.ic('branch',10,10,44,'ic-a')}${V.ic('check',116,10,44,'ic-ok')}${V.ic('cloud',222,10,44,'ic-a')}${V.ic('chat',328,10,44,'ic-info')}
<text class="t-b" x="32" y="76" text-anchor="middle" style="font-size:14px">1 branch</text><text class="t-b" x="138" y="76" text-anchor="middle" style="font-size:14px">2 commit</text><text class="t-b" x="244" y="76" text-anchor="middle" style="font-size:14px">3 push</text><text class="t-b" x="350" y="76" text-anchor="middle" style="font-size:14px">4 open PR</text>
<path class="ln-a" d="M60 32H108M166 32H214M272 32H320"/>
${V.ic('people',328,106,44,'ic-p')}${V.ic('branch',222,106,44,'ic-ok')}${V.ic('laptop',116,106,44,'ic-info')}
<text class="t-b" x="350" y="172" text-anchor="middle" style="font-size:14px">5 review</text><text class="t-b" x="244" y="172" text-anchor="middle" style="font-size:14px">6 merge</text><text class="t-b" x="138" y="172" text-anchor="middle" style="font-size:14px">7 pull main</text>
<path class="ln-a" d="M350 84V100M320 128H272M214 128H166"/>
</svg><figcaption>Branch, commit, push the branch, open a pull request, get it reviewed, merge it on GitHub, then pull main to your laptop. Repeat for every change.</figcaption></figure>
${V.like(`<p>Handing in an essay. You write it on your own paper (a branch), hand it to the teacher (open a pull request), the teacher writes comments and you fix them (review), and only then does it go on the classroom wall (merged into main).</p>`)}
${V.why(`<p>main is the version real users get. One careless push can break it for everyone. A <b>pull request</b> (PR) is a request to merge your branch, with a page where teammates comment line by line and automatic tests run. GitHub added them in 2008, and they are now how almost all teams work.</p>`)}
${V.hook(`Branch, commit, push, PR, review, merge, pull. Never straight to main.`)}
`)}

${V.card(2,'One pull request, start to finish','watch both computers',`
${V.steps([
 ['<b>git switch -c feature/contact</b>, add contact.html and commit <b>C</b>. It exists only on your laptop.',`<svg viewBox="0 0 420 212" role="img" aria-label="Commit C on feature/contact, laptop only">
${lg({l:[['A','bx-a',0],['C','bx-ok',1]],lt:[['main',0,true],['feature/contact',1,false]],r:[['A','bx-a',0]],rt:[['main',0,true]]})}
</svg>`],
 ['<b>git push -u origin feature/contact</b> uploads the branch. GitHub now shows a "Compare &amp; pull request" button.',`<svg viewBox="0 0 420 212" role="img" aria-label="feature/contact pushed to GitHub">
${lg({l:[['A','bx-a',0],['C','bx-ok',1]],lt:[['main',0,true],['feature/contact',1,false]],r:[['A','bx-a',0],['C','bx-ok',1]],rt:[['main',0,true],['feature/contact',1,false]],rc:'bx-hl',dir:'push',cmd:'git push -u origin feature/contact'})}
</svg>`],
 ['<b>gh pr create</b> opens pull request #1: "please merge feature/contact into main". Teammates review it and tests run.',`<svg viewBox="0 0 420 212" role="img" aria-label="Pull request 1 opened on GitHub">
${lg({l:[['A','bx-a',0],['C','bx-ok',1]],lt:[['main',0,true],['feature/contact',1,false]],r:[['A','bx-a',0],['C','bx-ok',1]],rt:[['main',0,true],['feature/contact',1,false]],x:`<rect class="bx-info" x="300" y="64" width="108" height="30" rx="6"/><text class="t-b t-info" x="354" y="84" text-anchor="middle" style="font-size:14px">PR #1 open</text>`})}
<text class="t-m t-a" x="210" y="206" text-anchor="middle" style="font-size:14px">gh pr create --title "Add contact page"</text>
</svg>`],
 ['<b>gh pr merge 1</b> merges it <b>on GitHub</b>. GitHub\'s main now has the contact page. Your laptop does not know yet.',`<svg viewBox="0 0 420 212" role="img" aria-label="Merged on GitHub; laptop main unchanged">
${lg({l:[['A','bx-a',0],['C','bx-ok',1]],lt:[['main',0,true],['feature/contact',1,false]],r:[['A','bx-a',0],['C','bx-ok',1,24],['M','bx-ok',2,0,[0,1]]],rt:[['main',2,true]],rc:'bx-hl'})}
<text class="t-b t-ok" x="316" y="206" text-anchor="middle" style="font-size:14px">PR #1 merged</text>
</svg>`],
 ['<b>git switch main</b> then <b>git pull</b> brings the merge home. Finally <b>git branch -d feature/contact</b> peels off the finished note.',`<svg viewBox="0 0 420 212" role="img" aria-label="Laptop main pulled and updated">
${lg({l:[['A','bx-a',0],['C','bx-ok',1,24],['M','bx-ok',2,0,[0,1]]],lt:[['main',2,true]],r:[['A','bx-a',0],['C','bx-ok',1,24],['M','bx-ok',2,0,[0,1]]],rt:[['main',2,true]],dir:'pull',cmd:'git switch main; git pull'})}
</svg>`]])}
${V.anat([[1,'gh pr create'],' ',[2,'--title "Add contact page"'],' ',[3,'--body "Adds a contact form"']],[
 '<b>GitHub CLI.</b> <code>gh</code> is GitHub\'s official command-line tool. On the website the same step is the "Compare &amp; pull request" button.',
 '<b>Title.</b> Short, imperative, like a commit message.',
 '<b>Description.</b> What changed and why. Without it, gh asks you for one.'])}
${V.rules(V.rh('Rules'),
 V.no('git push origin main','Skips review. Many teams block it with branch protection'),V.ok('git push -u origin feature/contact','Push the branch, not main'),
 V.no('Forgetting git pull after merging','The merge happened on GitHub. Your laptop is out of date until you pull'),
 V.rh('Conventions'),
 V.ok('Small PRs','Easy to review in ten minutes; huge ones get rubber-stamped'),V.ok('gh pr merge 1 --merge','Choose the style: --merge, --squash or --rebase'),
 V.ok('Delete the branch after merging','Locally with git branch -d, and on GitHub with one click'))}
${V.build(`<ol><li>Create and switch to <code>feature/contact</code>.</li><li>Add <code>contact.html</code> and commit it.</li><li>Push the branch with <code>-u</code>.</li><li>Open the pull request with <code>gh pr create</code>, then merge it with <code>gh pr merge 1</code>.</li><li>Switch to main, pull, and delete your local branch.</li></ol>`)}
${V.hook(`The merge happens up on GitHub. Pull it down, or you never got it.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Where does a PR merge happen? <i>On GitHub, not on your laptop.</i> 2. What must you do after it is merged? <i>Switch to main and git pull.</i> 3. Which branch do you push in GitHub Flow? <i>Your feature branch, never main directly.</i></div>
`);

explain('g10',`
<p>Real work gets interrupted. A bug report arrives while your files are half-edited, or a commit that is already on GitHub turns out to be wrong. These three tools handle exactly those moments.</p>

${V.card(1,'Stash','a shelf for unfinished work',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Half-finished work moved off the desk onto a shelf labelled stash">
<rect class="bx-info" x="10" y="80" width="170" height="70" rx="8"/><text class="t-b" x="95" y="70" text-anchor="middle">Your desk</text><text class="t" x="95" y="122" text-anchor="middle" style="font-size:14px">clean</text>
<path class="ln" style="stroke-width:4" d="M240 66H410"/><text class="t-b" x="325" y="24" text-anchor="middle">Stash shelf</text>
<rect class="bx-warn" x="270" y="34" width="110" height="30" rx="5"/><text class="t-m" x="325" y="55" text-anchor="middle" style="font-size:14px">v4 wip</text>
${ed(180,100,262,50,'ln-a')}<polygon class="ah-a" points="256,44 268,48 258,56"/><text class="t-m t-a" x="230" y="112" style="font-size:14px">git stash</text>
${ed(262,72,180,130,'ln-ok')}<text class="t-m t-ok" x="250" y="148" style="font-size:14px">git stash pop</text>
</svg><figcaption>git stash lifts your uncommitted changes off the desk onto a shelf, leaving the folder clean. git stash pop puts them back.</figcaption></figure>
${V.like(`<p>You are halfway through a jigsaw on the kitchen table and dinner is ready. You slide the whole thing onto a tray and put it on a shelf. After dinner you bring the tray back, exactly as you left it.</p>`)}
${V.steps([
 ['You are halfway through a change to app.js. Then: "Can you look at something urgent?"',`<svg viewBox="0 0 420 180" role="img" aria-label="app.js edited on the desk">
<rect class="bx-hl" x="10" y="60" width="180" height="100" rx="10"/><text class="t-b" x="100" y="48" text-anchor="middle">Desk</text>
<rect class="bx-warn" x="30" y="94" width="140" height="30" rx="5"/><text class="t-m" x="100" y="115" text-anchor="middle" style="font-size:14px">app.js (wip)</text>
<rect class="bx" x="230" y="60" width="180" height="100" rx="10"/><text class="t-b" x="320" y="48" text-anchor="middle">Stash shelf</text>
</svg>`],
 ['<b>git stash</b> moves the unfinished change onto the shelf as <b>stash@{0}</b>. Your folder goes back to the last commit.',`<svg viewBox="0 0 420 180" role="img" aria-label="Change moved to stash">
<rect class="bx" x="10" y="60" width="180" height="100" rx="10"/><text class="t-b" x="100" y="48" text-anchor="middle">Desk</text><text class="t t-ok" x="100" y="115" text-anchor="middle" style="font-size:14px">clean</text>
<rect class="bx-hl" x="230" y="60" width="180" height="100" rx="10"/><text class="t-b" x="320" y="48" text-anchor="middle">Stash shelf</text>
<rect class="bx-warn" x="250" y="94" width="140" height="30" rx="5"/><text class="t-m" x="320" y="115" text-anchor="middle" style="font-size:14px">stash@{0}</text>
</svg>`],
 ['<b>git status</b> says clean, so you can switch branches and deal with the emergency. <b>git stash list</b> shows what is on the shelf.',`<svg viewBox="0 0 420 180" role="img" aria-label="Status clean, stash list shows one entry">
<text class="t-m" x="10" y="22" style="font-size:14px">$ git stash list</text><text class="t-m t-ok" x="10" y="42" style="font-size:14px">stash@{0}: WIP on main: Add dashboard</text>
<rect class="bx-hl" x="10" y="60" width="180" height="100" rx="10"/><text class="t t-ok" x="100" y="115" text-anchor="middle" style="font-size:14px">clean: switch away</text>
<rect class="bx" x="230" y="60" width="180" height="100" rx="10"/>
<rect class="bx-warn" x="250" y="94" width="140" height="30" rx="5"/><text class="t-m" x="320" y="115" text-anchor="middle" style="font-size:14px">stash@{0}</text>
</svg>`],
 ['<b>git stash pop</b> puts the change back on your desk and removes it from the shelf. Carry on where you left off.',`<svg viewBox="0 0 420 180" role="img" aria-label="Change popped back to desk">
<rect class="bx-hl" x="10" y="60" width="180" height="100" rx="10"/><text class="t-b" x="100" y="48" text-anchor="middle">Desk</text>
<rect class="bx-warn" x="30" y="94" width="140" height="30" rx="5"/><text class="t-m" x="100" y="115" text-anchor="middle" style="font-size:14px">app.js (wip)</text>
<rect class="bx" x="230" y="60" width="180" height="100" rx="10"/><text class="t-b" x="320" y="48" text-anchor="middle">Stash shelf</text><text class="t t-dim" x="320" y="115" text-anchor="middle" style="font-size:14px">empty</text>
</svg>`]])}
${V.rules(V.ok('git stash pop','Bring back the newest stash and remove it from the shelf'),V.ok('git stash apply','Bring it back but keep a copy on the shelf'),
 V.no('Stashing new files','Untracked files stay behind unless you use git stash -u'),V.ok('Pop clashes?','If pop hits a conflict, the stash is kept so nothing is lost'))}
`)}

${V.card(2,'Revert and reset','correct it in public, or rewind in private',`
${V.like(`<p><b>Revert</b> is a newspaper printing a correction in tomorrow's paper: yesterday's paper still exists, and everyone can see the fix. <b>Reset</b> is tearing pages out of your own diary: fine while nobody else has read it, a disaster if they have copies.</p>`)}
${V.steps([
 ['History: A, B, C, then D, "Add settings page". You decide D was a mistake.',`<svg viewBox="0 0 420 200" role="img" aria-label="Commits A, B, C, D with main on D">
${ed(50,120,290,120)}${cm(50,120,'A')}${cm(130,120,'B')}${cm(210,120,'C')}${cm(290,120,'D','bx-bad')}${br('main',290,120,true,true)}
<text class="t" x="290" y="168" text-anchor="middle" style="font-size:14px">settings</text>
</svg>`],
 ['<b>git revert HEAD</b> adds a <b>new</b> commit, R, that does the exact opposite of D. Nothing is deleted. History only grows, so it is safe on shared branches.',`<svg viewBox="0 0 420 200" role="img" aria-label="Revert adds commit R after D">
${ed(50,120,370,120)}${cm(50,120,'A')}${cm(130,120,'B')}${cm(210,120,'C')}${cm(290,120,'D','bx-bad')}${cm(370,120,'R','bx-ok')}${br('main',370,120,true,true)}
<text class="t" x="290" y="168" text-anchor="middle" style="font-size:14px">settings</text><text class="t" x="370" y="168" text-anchor="middle" style="font-size:14px">undo D</text>
</svg>`],
 ['<b>git reset --hard HEAD~1</b> instead moves main back one step and drops R from the branch. History is rewritten, so only do this to commits you have not pushed.',`<svg viewBox="0 0 420 200" role="img" aria-label="Reset moves main back to D; R dropped">
${ed(50,120,290,120)}${ed(290,120,352,120,'ln-d')}${cm(50,120,'A')}${cm(130,120,'B')}${cm(210,120,'C')}${cm(290,120,'D','bx-bad')}<circle class="bx t-dim" cx="370" cy="120" r="18"/><text class="t-b t-dim" x="370" y="126" text-anchor="middle">R</text>${br('main',290,120,true,true,'bx-hl')}
<text class="t" x="290" y="168" text-anchor="middle" style="font-size:14px">settings</text>
</svg>`]])}
${V.anat([[1,'git revert'],' ',[2,'HEAD']],[
 '<b>Revert.</b> Make a new commit that undoes the changes of the commit you name. Git writes the message for you: <code>Revert "Add settings page"</code>.',
 '<b>Which commit.</b> HEAD is the latest. You can also give an id, like <code>git revert 7d01e4b</code>.'])}
${V.rules(V.rh('Rules'),
 V.ok('git revert','For anything already pushed. Safe for everyone'),V.no('git reset on pushed commits','Rewrites history your teammates already have'),
 V.ok('git reset --hard HEAD~1','Fine for tidying local commits nobody has seen'),V.no('--hard with unsaved work','Uncommitted changes are deleted for good'))}
${V.build(`<ol><li>Change <code>app.js</code>, then stash it and check <code>git status</code> is clean.</li><li>Pop the stash and commit the change.</li><li>Undo that commit safely with <code>git revert HEAD</code>.</li><li>Drop the revert commit locally with a hard reset of one step, then read the log.</li></ol>`)}
${V.hook(`Stash to pause. Revert to correct in public. Reset only in private.`)}
`)}

<div class="try"><b>Try it in your head</b>1. You must switch branch but have half-done edits. What do you run? <i>git stash.</i> 2. A bad commit is already on GitHub. Revert or reset? <i>Revert.</i> 3. Does revert delete the bad commit? <i>No. It adds a new commit that undoes it.</i></div>
`);

explain('g11',`
<p>Merging keeps every fork in the road. Sometimes you would rather have a clean, straight story, or you only want one single commit from another branch. Rebase and cherry-pick are the tools for that.</p>

${V.card(1,'Rebase','replay your commits on the newest main',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="Before rebase the feature forks from an old commit. After rebase the same changes sit on top of the newest main in a straight line">
<text class="t-b" x="10" y="24">Before</text>
${ed(40,56,130,56)}${ed(40,56,130,104)}${ed(130,104,200,104)}${cs(40,56,'I')}${cs(130,56,'R')}${cs(130,104,'A1','bx-info')}${cs(200,104,'A2','bx-info')}
<text class="t" x="160" y="61" style="font-size:14px">main</text>
<text class="t-b" x="250" y="24">After</text>
${ed(250,80,400,80)}${cs(250,80,'I')}${cs(300,80,'R')}${cs(350,80,'A1&#39;','bx-ok')}${cs(400,80,'A2&#39;','bx-ok')}
<text class="t" x="210" y="160" text-anchor="middle" style="font-size:14px">same changes, new ids, one straight line</text>
</svg><figcaption>Your feature started from an old main (I). Rebase lifts your commits off and replays them on top of the newest main (R), as if you had started today. They get new ids, shown with a dash.</figcaption></figure>
${V.like(`<p>Queuing at lunch. You joined the queue early, then wandered off for a while. Rebasing is rejoining at the back of the current queue: same tray, same food, but now you are behind everyone who arrived meanwhile.</p>`)}
${V.why(`<p>Lots of small merge commits make the history look like a tangle of train tracks. Rebasing first keeps one straight line that is easy to read, and the final merge becomes a simple fast-forward.</p>`)}
${V.steps([
 ['You are on <b>feature/api</b> with commits A1 and A2. Since you branched, main moved on to <b>R</b> (Add README).',`<svg viewBox="0 0 420 250" role="img" aria-label="feature/api forks from I; main has R">
${ed(50,110,140,110)}${ed(50,110,140,180)}${ed(140,180,230,180)}${cm(50,110,'I')}${cm(140,110,'R')}${cm(140,180,'A1','bx-info')}${cm(230,180,'A2','bx-info')}${br('main',140,110,true)}${br('feature/api',230,180,false,false)}
<text class="t-b t-a" x="300" y="186" style="font-size:14px">HEAD</text>
</svg>`],
 ['<b>git rebase main</b>. Git lifts your two commits off and remembers the changes each one made.',`<svg viewBox="0 0 420 250" role="img" aria-label="A1 and A2 lifted off">
${ed(50,110,140,110)}${ed(50,110,140,180,'ln-d')}${ed(140,180,230,180,'ln-d')}${cm(50,110,'I')}${cm(140,110,'R')}<circle class="bx t-dim" cx="140" cy="180" r="18"/><text class="t-b t-dim" x="140" y="186" text-anchor="middle">A1</text><circle class="bx t-dim" cx="230" cy="180" r="18"/><text class="t-b t-dim" x="230" y="186" text-anchor="middle">A2</text>${br('main',140,110,true)}
<path class="ln-a" d="M260 170C300 150 300 130 260 112"/><polygon class="ah-a" points="254,104 268,108 260,118"/><text class="t-b t-a" x="300" y="146" style="font-size:14px">lift and replay</text>
</svg>`],
 ['It replays them one by one on top of R, making brand-new commits <b>A1&#39;</b> and <b>A2&#39;</b> with new ids. feature/api moves to A2&#39;. The old ones are left behind.',`<svg viewBox="0 0 420 250" role="img" aria-label="A1' and A2' on top of R">
${ed(50,110,320,110)}${cm(50,110,'I')}${cm(140,110,'R')}${cm(230,110,'A1&#39;','bx-ok')}${cm(320,110,'A2&#39;','bx-ok')}<circle class="bx t-dim" cx="140" cy="180" r="18"/><text class="t-b t-dim" x="140" y="186" text-anchor="middle">A1</text><circle class="bx t-dim" cx="230" cy="180" r="18"/><text class="t-b t-dim" x="230" y="186" text-anchor="middle">A2</text>${br('main',140,110,true)}${br('feature/api',320,110,true,true,'bx-hl')}
</svg>`],
 ['<b>git switch main</b>, then <b>git merge feature/api</b>. The line is straight, so main just fast-forwards. No merge commit at all.',`<svg viewBox="0 0 420 250" role="img" aria-label="main fast-forwards to A2'">
${ed(50,110,320,110)}${cm(50,110,'I')}${cm(140,110,'R')}${cm(230,110,'A1&#39;')}${cm(320,110,'A2&#39;','bx-ok')}${br('main',320,110,true,true,'bx-hl')}${br('feature/api',320,110,false)}
<text class="t-b t-ok" x="140" y="186" text-anchor="middle">Fast-forward</text>
</svg>`]])}
${V.anat([[1,'git rebase'],' ',[2,'main']],[
 '<b>Rebase.</b> Replay the commits of the branch you are on.',
 '<b>Onto what.</b> The branch to rebuild on top of.'])}
${V.rules(V.rh('The golden rule'),
 V.ok('Rebase your own local work','Nobody else has those commits, so new ids hurt nobody'),
 V.no('Rebasing commits others already have','New ids make their copies clash with yours. Merge shared branches instead'),
 V.rh('When it clashes'),
 V.ok('git add, then git rebase --continue','Fix the file like a merge conflict, stage it, carry on'),V.ok('git rebase --abort','Back to exactly how things were'))}
${V.hook(`Rebase: rejoin the back of the queue. Never cut a queue other people are already standing in.`)}
`)}

${V.card(2,'Cherry-pick','copy one commit, nothing else',`
${V.like(`<p>Picking one cherry off a tree instead of taking the whole branch. You get exactly that one change.</p>`)}
${V.steps([
 ['main has your rebased feature. On the <b>hotfix</b> branch there is one commit, <b>X</b>, "Patch XSS bug" (a security fix). You want only that.',`<svg viewBox="0 0 420 250" role="img" aria-label="main on A2'; hotfix has X off R">
${ed(50,110,320,110)}${ed(140,110,230,180)}${cm(50,110,'I')}${cm(140,110,'R')}${cm(230,110,'A1&#39;')}${cm(320,110,'A2&#39;')}${cm(230,180,'X','bx-warn')}${br('main',320,110,true,true)}${br('hotfix',230,180,false)}
</svg>`],
 ['<b>git log hotfix --oneline</b> shows the commit. <b>git cherry-pick hotfix</b> copies the change from the commit at the tip of hotfix onto main as a new commit, <b>X&#39;</b>.',`<svg viewBox="0 0 420 250" role="img" aria-label="X copied onto main as X'">
${ed(50,110,390,110)}${ed(140,110,230,180)}${cm(50,110,'I')}${cm(140,110,'R')}${cm(230,110,'A1&#39;')}${cm(320,110,'A2&#39;')}${cm(390,110,'X&#39;','bx-ok')}${cm(230,180,'X','bx-warn')}${br('main',390,110,true,true,'bx-hl')}${br('hotfix',230,180,false)}
<path class="ln-a" d="M250 172C320 160 360 150 380 132"/><polygon class="ah-a" points="372,128 386,126 382,140"/>
</svg>`]])}
${V.anat([[1,'git cherry-pick'],' ',[2,'hotfix']],[
 '<b>Cherry-pick.</b> Apply the change from one commit onto the branch you are on, as a new commit.',
 '<b>Which commit.</b> A commit id like <code>9c2e11a</code>, or a branch name, which means "the newest commit on that branch".'])}
${V.rules(V.ok('git cherry-pick 9c2e11a','Pick by id for precision'),V.ok('X stays on hotfix','The original is untouched; you made a copy'),
 V.no('Cherry-picking whole features','Many commits copied one by one is messy. Merge or rebase instead'))}
${V.build(`<ol><li>On <code>feature/api</code>, look at the graph, then rebase onto main.</li><li>Switch to main and merge the feature. Expect a fast-forward.</li><li>List the hotfix branch's commits with <code>git log</code>.</li><li>Cherry-pick the hotfix commit onto main.</li></ol>`)}
${V.hook(`Rebase moves your whole line. Cherry-pick copies one dot.`)}
`)}

<div class="try"><b>Try it in your head</b>1. After a rebase, do your commits keep their ids? <i>No. They are new commits with new ids.</i> 2. Should you rebase main that the whole team uses? <i>No. Only rebase your own unshared work.</i> 3. You need one bug fix from another branch. Which tool? <i>git cherry-pick.</i></div>
`);

explain('g12',`
<p>Some files must never reach GitHub: passwords, keys, logs, and huge folders of downloaded code. One leaked key can cost real money within minutes. This lesson shows how to keep them out, and how to mark your releases.</p>

${V.card(1,'.gitignore','a "do not pack" list',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="Files .env and debug.log bounce off the .gitignore shield; app.js passes through to Git">
${V.ic('file',10,14,40,'ic-ok')}<text class="t-m" x="58" y="40">app.js</text>
${V.ic('key',10,68,40,'ic-bad')}<text class="t-m" x="58" y="94">.env</text>
${V.ic('file',10,122,40,'ic-bad')}<text class="t-m" x="58" y="148">debug.log</text>
${V.ic('shield',196,58,64,'ic-a')}<text class="t-m t-a" x="228" y="146" text-anchor="middle" style="font-size:14px">.gitignore</text>
${ed(118,34,340,34,'ln-ok')}<polygon class="ah-ok" points="338,28 338,40 348,34"/>
${V.ic('book',354,14,44,'ic-a')}<text class="t-b" x="376" y="76" text-anchor="middle" style="font-size:14px">Git</text>
<path class="ln" style="stroke-width:2" d="M106 88H188"/><path class="ln" style="stroke-width:2" d="M154 142C176 140 186 118 194 104"/>
${V.ic('cross',270,80,32,'ic-bad')}<text class="t-b t-bad" x="310" y="102" style="font-size:14px">ignored</text>
</svg><figcaption>.gitignore is a plain text file listing names and patterns. Git pretends matching files do not exist: they never show in git status and git add . skips them.</figcaption></figure>
${V.like(`<p>A "do not pack" list stuck on the suitcase: no passport photocopies, no dirty laundry. Whoever packs, the list keeps those things out.</p>`)}
${V.why(`<p>Bots scan every public GitHub push for keys and passwords, often within minutes. Other files are just noise: logs change every run, and <code>node_modules</code> can hold thousands of files anyone can re-download. Listing them once in .gitignore protects the whole team.</p>`)}
${V.anat([[1,'.env'],'\n',[2,'*.log'],'\n',[3,'node_modules/']],[
 '<b>Exact name.</b> Ignore that one file.',
 '<b>Wildcard.</b> <code>*</code> means "anything", so every file ending in .log.',
 '<b>Folder.</b> A trailing slash ignores a whole folder.'])}
${V.steps([
 ['You created <b>.env</b> (a secret key) and <b>debug.log</b>. git status lists both as untracked, one <code>git add .</code> from disaster.',`<svg viewBox="0 0 420 212" role="img" aria-label=".env and debug.log untracked">
${ar({hl:0,w:[['.env','bx-bad'],['debug.log','bx-bad']],h:['A'],hn:'A: Create app'})}
</svg>`],
 ['<b>echo ".env" &gt; .gitignore</b> then <b>echo "*.log" &gt;&gt; .gitignore</b>. One <code>&gt;</code> creates the file; two <code>&gt;&gt;</code> add a line to the end.',`<svg viewBox="0 0 420 212" role="img" aria-label=".gitignore created; .env and debug.log now hidden">
${ar({hl:0,w:[['.gitignore','bx-info'],['.env','bx t-dim'],['debug.log','bx t-dim']],h:['A'],hn:'A: Create app'})}
</svg>`],
 ['<b>git status</b> now shows only .gitignore. <b>git add .</b> and commit: the list is saved, the secrets are not.',`<svg viewBox="0 0 420 212" role="img" aria-label="Only .gitignore committed">
${ar({hl:2,w:[['.gitignore','bx-ok'],['.env','bx t-dim'],['debug.log','bx t-dim']],h:['A',['B','bx-ok']],hn:'B: Add gitignore'})}
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('echo "*.log" &gt; .gitignore','A single &gt; overwrites the file and wipes the .env line'),V.ok('echo "*.log" &gt;&gt; .gitignore','Double &gt;&gt; appends a new line'),
 V.no('Ignoring a file already committed','.gitignore only affects untracked files. Run git rm --cached file to stop tracking it'),
 V.ok('Leaked a key? Revoke it first','Cancel it at the provider, then clean up. Deleting the file later does not un-leak it'),
 V.rh('Conventions'),
 V.ok('Commit .gitignore itself','So every teammate gets the same list'),V.ok('Create it before the first commit','Easier than removing secrets afterwards'))}
${V.hook(`List it before you add it. Once a secret is pushed, it is public.`)}
`)}

${V.card(2,'Tags and versions','a permanent name for a release',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A tag nailed to a commit stays put while the branch note moves on">
${ed(60,70,360,70)}${cm(60,70,'A')}${cm(160,70,'B')}${cm(260,70,'C')}${cm(360,70,'D')}
${V.ic('tag',136,94,48,'ic-ok')}<text class="t-m t-ok" x="160" y="156" text-anchor="middle">v1.0.0</text>
<path class="ln-d" d="M360 52V40"/><rect class="bx-warn" x="333" y="14" width="54" height="26" rx="4"/><text class="t-m" x="360" y="32" text-anchor="middle">main</text>
</svg><figcaption>A branch is a sticky note that moves with every commit. A tag is nailed down: v1.0.0 points at commit B forever, so everyone can find exactly what was released.</figcaption></figure>
${V.like(`<p>The height marks on a kitchen door frame. Each mark has a date and stays exactly where it was drawn, however much you grow afterwards.</p>`)}
${V.anat([[1,'v'],[2,'1'],'.',[3,'4'],'.',[4,'2']],[
 '<b>v for version.</b> A common habit in tag names.',
 '<b>MAJOR.</b> Bump it for breaking changes: old code using yours may stop working.',
 '<b>MINOR.</b> Bump it for new features that break nothing.',
 '<b>PATCH.</b> Bump it for bug fixes only.'])}
<p>This is <b>semantic versioning</b>. Watch the number change as the project grows.</p>
${V.steps([
 ['First release. <b>git tag v1.0.0</b> nails a tag on the current commit.',`<svg viewBox="0 0 420 170" role="img" aria-label="v1.0.0 on A">
${cm(60,60,'A','bx-ok')}<rect class="bx-ok" x="20" y="96" width="80" height="28" rx="6"/><text class="t-m" x="60" y="116" text-anchor="middle">v1.0.0</text>
</svg>`],
 ['You fix a typo. Nothing new, nothing broken: bump PATCH to <b>v1.0.1</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="v1.0.1 on B, a fix">
${ed(60,60,160,60)}${cm(60,60,'A')}${cm(160,60,'B','bx-ok')}<rect class="bx" x="20" y="96" width="80" height="28" rx="6"/><text class="t-m" x="60" y="116" text-anchor="middle">v1.0.0</text><rect class="bx-ok" x="120" y="96" width="80" height="28" rx="6"/><text class="t-m" x="160" y="116" text-anchor="middle">v1.0.1</text>
<text class="t" x="160" y="152" text-anchor="middle" style="font-size:14px">fix</text>
</svg>`],
 ['You add a dark mode. A new feature that breaks nothing: bump MINOR and reset PATCH, <b>v1.1.0</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="v1.1.0 on C, a feature">
${ed(60,60,260,60)}${cm(60,60,'A')}${cm(160,60,'B')}${cm(260,60,'C','bx-ok')}<rect class="bx" x="20" y="96" width="80" height="28" rx="6"/><text class="t-m" x="60" y="116" text-anchor="middle">v1.0.0</text><rect class="bx" x="120" y="96" width="80" height="28" rx="6"/><text class="t-m" x="160" y="116" text-anchor="middle">v1.0.1</text><rect class="bx-ok" x="220" y="96" width="80" height="28" rx="6"/><text class="t-m" x="260" y="116" text-anchor="middle">v1.1.0</text>
<text class="t" x="160" y="152" text-anchor="middle" style="font-size:14px">fix</text><text class="t" x="260" y="152" text-anchor="middle" style="font-size:14px">feature</text>
</svg>`],
 ['You rename a setting, so old setups break. Bump MAJOR and reset the rest: <b>v2.0.0</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="v2.0.0 on D, a breaking change">
${ed(60,60,360,60)}${cm(60,60,'A')}${cm(160,60,'B')}${cm(260,60,'C')}${cm(360,60,'D','bx-bad')}<rect class="bx" x="20" y="96" width="80" height="28" rx="6"/><text class="t-m" x="60" y="116" text-anchor="middle">v1.0.0</text><rect class="bx" x="120" y="96" width="80" height="28" rx="6"/><text class="t-m" x="160" y="116" text-anchor="middle">v1.0.1</text><rect class="bx" x="220" y="96" width="80" height="28" rx="6"/><text class="t-m" x="260" y="116" text-anchor="middle">v1.1.0</text><rect class="bx-bad" x="320" y="96" width="80" height="28" rx="6"/><text class="t-m" x="360" y="116" text-anchor="middle">v2.0.0</text>
<text class="t" x="160" y="152" text-anchor="middle" style="font-size:14px">fix</text><text class="t" x="260" y="152" text-anchor="middle" style="font-size:14px">feature</text><text class="t" x="360" y="152" text-anchor="middle" style="font-size:14px">breaking</text>
</svg>`]])}
${V.rules(V.ok('git tag','On its own, lists all tags'),V.ok('git tag -a v1.0.0 -m "First release"','An annotated tag stores who, when and a message. Best for real releases'),
 V.ok('git push origin v1.0.0','Tags are not pushed by default. Push them by name, or all with --tags'),V.no('Moving a released tag','People rely on v1.0.0 meaning one exact commit. Make a new version instead'))}
${V.build(`<ol><li>Create a secret <code>.env</code> and a <code>debug.log</code>.</li><li>Write a <code>.gitignore</code> with one <code>&gt;</code>, then add the log pattern with <code>&gt;&gt;</code>.</li><li>Run <code>git status</code>: only .gitignore should appear.</li><li>Stage and commit it.</li><li>Tag the commit <code>v1.0.0</code>, then list your tags.</li></ol>`)}
${V.hook(`Fix, feature, breaking: PATCH, MINOR, MAJOR. Branches move; tags stay nailed down.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which pattern ignores every log file? <i>*.log.</i> 2. You are on v2.3.1 and fix a bug. New version? <i>v2.3.2.</i> 3. You add a feature to v2.3.2. New version? <i>v2.4.0.</i></div>
`);

explain('g13',`
<p>This is a drill, the kind of pressure test live-coding interviews love. The commands are ones you already know. The skill is doing them in the right order, calmly, without losing a single line of work.</p>

${V.card(1,'The scene','three things at once',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="You have half-finished work, production login is broken, and a teammate pushed to main">
<rect class="bx-warn" x="6" y="10" width="130" height="170" rx="10"/>${V.ic('laptop',39,20,64,'ic-warn')}<text class="t-b" x="71" y="112" text-anchor="middle" style="font-size:14px">your laptop</text><text class="t" x="71" y="138" text-anchor="middle" style="font-size:14px">dashboard</text><text class="t" x="71" y="158" text-anchor="middle" style="font-size:14px">half done</text>
<rect class="bx-bad" x="145" y="10" width="130" height="170" rx="10"/>${V.ic('warn',178,20,64,'ic-bad')}<text class="t-b" x="210" y="112" text-anchor="middle" style="font-size:14px">production</text><text class="t" x="210" y="138" text-anchor="middle" style="font-size:14px">login is</text><text class="t" x="210" y="158" text-anchor="middle" style="font-size:14px">broken</text>
<rect class="bx-info" x="284" y="10" width="130" height="170" rx="10"/>${V.ic('person',317,20,64,'ic-info')}<text class="t-b" x="349" y="112" text-anchor="middle" style="font-size:14px">teammate</text><text class="t" x="349" y="138" text-anchor="middle" style="font-size:14px">pushed to</text><text class="t" x="349" y="158" text-anchor="middle" style="font-size:14px">main today</text>
</svg><figcaption>Uncommitted work on your feature branch, a fire in production, and your local main is out of date. The order of your moves matters.</figcaption></figure>
${V.like(`<p>A firefighter's routine. When the alarm rings they do not think; they follow the same steps every time: boots, jacket, helmet, truck. Practise the routine until your hands know it.</p>`)}
${V.why(`<p>Hotfixes go wrong in predictable ways: unfinished work gets dragged onto the fix, the fix is built on an old main, or the fix skips review. The routine below blocks all three.</p>`)}
`)}

${V.card(2,'The routine','stash, sync, branch, fix, ship, sync, resume',`
${V.steps([
 ['<b>git status</b> shows unfinished work. <b>git stash</b> shelves it, so your feature branch (commit S) is clean.',`<svg viewBox="0 0 420 260" role="img" aria-label="Work stashed; on feature/dashboard at S">
${ed(40,110,110,190)}${cm(40,110,'I')}${cm(110,190,'S')}${br('feature/dashboard',110,190,false,false,'bx-hl')}<text class="t-b t-a" x="200" y="247" style="font-size:14px">HEAD</text>
${br('main',40,110,true)}
<rect class="bx-warn" x="300" y="20" width="114" height="56" rx="8"/><text class="t-b" x="357" y="42" text-anchor="middle" style="font-size:14px">stash</text><text class="t-m" x="357" y="64" text-anchor="middle" style="font-size:14px">filters wip</text>
</svg>`],
 ['<b>git switch main</b> and <b>git pull</b>. Your teammate\'s commit <b>T</b> arrives, so the fix will be built on the real, current main.',`<svg viewBox="0 0 420 260" role="img" aria-label="main pulled: I then T">
${ed(40,110,110,110)}${ed(40,110,110,190)}${cm(40,110,'I')}${cm(110,110,'T','bx-ok')}${cm(110,190,'S')}${br('feature/dashboard',110,190,false)}
${br('main',110,110,true,true,'bx-hl')}
<rect class="bx-warn" x="300" y="20" width="114" height="56" rx="8"/><text class="t-b" x="357" y="42" text-anchor="middle" style="font-size:14px">stash</text><text class="t-m" x="357" y="64" text-anchor="middle" style="font-size:14px">filters wip</text>
</svg>`],
 ['<b>git switch -c hotfix/login</b>, fix login.js, <b>git commit -am "Fix login crash"</b>. Commit <b>F</b> holds only the fix.',`<svg viewBox="0 0 420 260" role="img" aria-label="hotfix/login with commit F">
${ed(40,110,180,110)}${ed(40,110,110,190)}${cm(40,110,'I')}${cm(110,110,'T')}${cm(180,110,'F','bx-ok')}${cm(110,190,'S')}${br('feature/dashboard',110,190,false)}
${br('hotfix/login',180,110,true,true,'bx-hl')}
<rect class="bx-warn" x="300" y="20" width="114" height="56" rx="8"/><text class="t-b" x="357" y="42" text-anchor="middle" style="font-size:14px">stash</text><text class="t-m" x="357" y="64" text-anchor="middle" style="font-size:14px">filters wip</text>
</svg>`],
 ['Ship it through review: <b>git push -u origin hotfix/login</b>, <b>gh pr create</b>, <b>gh pr merge</b>. GitHub merges it into main as <b>M</b>.',`<svg viewBox="0 0 420 260" role="img" aria-label="PR merged on GitHub as M">
${ed(40,110,250,110)}${ed(40,110,110,190)}${cm(40,110,'I')}${cm(110,110,'T')}${cm(180,110,'F')}${cm(250,110,'M','bx-ok')}${cm(110,190,'S')}${br('feature/dashboard',110,190,false)}
${br('hotfix/login',180,110,true,true)}
<rect class="bx-info" x="246" y="160" width="168" height="30" rx="6"/><text class="t-b t-info" x="330" y="180" text-anchor="middle" style="font-size:14px">on GitHub: PR merged</text>
<rect class="bx-warn" x="300" y="20" width="114" height="56" rx="8"/><text class="t-b" x="357" y="42" text-anchor="middle" style="font-size:14px">stash</text><text class="t-m" x="357" y="64" text-anchor="middle" style="font-size:14px">filters wip</text>
</svg>`],
 ['<b>git switch main</b>, <b>git pull</b>. Your local main now matches GitHub, fix included.',`<svg viewBox="0 0 420 260" role="img" aria-label="Local main pulled to M">
${ed(40,110,250,110)}${ed(40,110,110,190)}${cm(40,110,'I')}${cm(110,110,'T')}${cm(180,110,'F')}${cm(250,110,'M','bx-ok')}${cm(110,190,'S')}${br('feature/dashboard',110,190,false)}
${br('main',250,110,false,true,'bx-hl')}
<rect class="bx-warn" x="300" y="20" width="114" height="56" rx="8"/><text class="t-b" x="357" y="42" text-anchor="middle" style="font-size:14px">stash</text><text class="t-m" x="357" y="64" text-anchor="middle" style="font-size:14px">filters wip</text>
</svg>`],
 ['Back to work: <b>git switch feature/dashboard</b>, <b>git rebase main</b> (S is replayed as S&#39; on top of M), then <b>git stash pop</b>. Your unfinished filters return.',`<svg viewBox="0 0 420 260" role="img" aria-label="Feature rebased onto M; stash popped">
${ed(40,110,320,110)}${cm(40,110,'I')}${cm(110,110,'T')}${cm(180,110,'F')}${cm(250,110,'M')}${cm(320,110,'S&#39;','bx-ok')}<circle class="bx t-dim" cx="110" cy="190" r="18"/><text class="t-b t-dim" x="110" y="196" text-anchor="middle">S</text>
${br('main',250,110,false)}${br('feature/dashboard',320,110,true,true,'bx-hl')}
<rect class="bx" x="186" y="206" width="228" height="40" rx="8"/><text class="t-m t-ok" x="300" y="232" text-anchor="middle" style="font-size:14px">desk: filters wip</text>
</svg>`]])}
${V.anat([[1,'git switch'],' ',[2,'-c'],' ',[3,'hotfix/'],[4,'login']],[
 '<b>Switch.</b>',
 '<b>Create first.</b> From the commit you are on, which must be the freshly pulled main.',
 '<b>Kind.</b> <code>hotfix/</code> tells everyone this is an urgent production fix.',
 '<b>What.</b> A short description.'])}
`)}

${V.card(3,'Drill rules','what separates calm from chaos',`
${V.rules(V.rh('Rules'),
 V.ok('git status before every switch','Know what is on your desk before you move'),
 V.no('Carrying WIP onto a hotfix','Your half-built dashboard would ship with the fix'),
 V.no('Branching the fix from an old main','You would undo your teammate\'s work or hit conflicts. Pull first'),
 V.no('Pushing the fix straight to main','Even in a hurry it goes through a PR'),
 V.rh('Watch out'),
 V.ok('git push --force-with-lease','feature/dashboard was pushed before the rebase, so a normal push is rejected. This forces safely, only if nobody else pushed there'),
 V.ok('Shared branch? Merge instead','If teammates use feature/dashboard, run git merge main rather than rebase'))}
${V.build(`<ol><li>Status, then stash.</li><li>Switch to main and pull.</li><li>Create <code>hotfix/login</code>, fix, commit.</li><li>Push the branch, create the PR, merge it.</li><li>Switch to main and pull again.</li><li>Switch to your feature, rebase onto main, pop the stash.</li></ol>`)}
${V.hook(`Stash, sync, branch, fix, ship, sync, resume. Say it until your fingers know it.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What is the very first command? <i>git status, then git stash.</i> 2. Why pull main before branching the fix? <i>So the fix builds on the newest main, including your teammate's commit.</i> 3. After the PR merges, why pull again? <i>The merge happened on GitHub; your local main does not have it yet.</i></div>
`);
}
