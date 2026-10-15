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
const side=(x0,C,T)=>{let s='';const P=C.map((c,k)=>[x0+30+c[2]*40,108+(c[3]||0)]);
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
${cm(250,110,'M','bx-ok')}<text class="t-b" x="330" y="96">merge commit</text><text class="t" x="330" y="140" style="font-size:14px">two parents</text>
</svg><figcaption>When both branches have new commits, Git makes a new merge commit that joins them. It is the only kind of commit with two parents.</figcaption></figure>
${V.like(`<p>Two streams meeting to form a river. Both bring water. The point where they join is a new place on the map, the merge commit.</p>`)}
${V.why(`<p>Git finds the last commit both branches share, called the <b>merge base</b>. It compares each side with it and combines both sets of changes. Three snapshots are involved (base, yours, theirs), which is where the name comes from.</p>`)}
${V.steps([
 ['main is at B (it already has the navbar). feature/footer split off earlier, from A, and has its own commit C.',`<svg viewBox="0 0 420 210" role="img" aria-label="main on B, feature/footer on C, both from A">
${ed(60,110,190,110)}${ed(60,110,190,170)}${cm(60,110,'A')}${cm(190,110,'B')}${cm(190,170,'C')}${br('main',190,110,true,true)}
<path class="ln-d" d="M208 170H222"/><rect class="bx-warn" x="222" y="157" width="144" height="26" rx="4"/><text class="t-m" x="294" y="175" text-anchor="middle">feature/footer</text>
</svg>`],
 ['<b>git merge feature/footer</b>. Git finds the merge base, <b>A</b>, the last commit both lines share, and combines both sets of changes.',`<svg viewBox="0 0 420 210" role="img" aria-label="Git finds merge base A">
${ed(60,110,190,110,'ln-a')}${ed(60,110,190,170,'ln-a')}${cm(60,110,'A','bx-hl')}${cm(190,110,'B')}${cm(190,170,'C')}${br('main',190,110,true,true)}
<path class="ln-d" d="M208 170H222"/><rect class="bx-warn" x="222" y="157" width="144" height="26" rx="4"/><text class="t-m" x="294" y="175" text-anchor="middle">feature/footer</text>
<text class="t-b t-a" x="60" y="158" text-anchor="middle" style="font-size:14px">base</text>
</svg>`],
 ['It makes a new <b>merge commit, M</b>, with two parents: B and C. main moves onto M. Your folder now has the navbar and the footer.',`<svg viewBox="0 0 420 210" role="img" aria-label="Merge commit M with parents B and C">
${ed(60,110,190,110)}${ed(60,110,190,170)}${ed(190,110,330,110,'ln-ok')}${ed(190,170,330,110,'ln-ok')}${cm(60,110,'A')}${cm(190,110,'B')}${cm(190,170,'C')}${cm(330,110,'M','bx-ok')}${br('main',330,110,true,true,'bx-hl')}
<path class="ln-d" d="M208 170H222"/><rect class="bx-warn" x="222" y="157" width="144" height="26" rx="4"/><text class="t-m" x="294" y="175" text-anchor="middle">feature/footer</text>
</svg>`],
 ['Tidy up: <b>git branch -d feature/footer</b> peels off the note. The commits stay in history, safely reachable from main.',`<svg viewBox="0 0 420 210" role="img" aria-label="feature/footer note removed; commits remain">
${ed(60,110,190,110)}${ed(60,110,190,170)}${ed(190,110,330,110)}${ed(190,170,330,110)}${cm(60,110,'A')}${cm(190,110,'B')}${cm(190,170,'C')}${cm(330,110,'M')}${br('main',330,110,true,true)}
<rect class="bx t-dim" x="222" y="157" width="144" height="26" rx="4"/><text class="t-m t-dim" x="294" y="175" text-anchor="middle">feature/footer</text><path class="ln-x" d="M222 183 366 157"/>
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

}
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
explain('g12',`
<h4>Some files must never be committed</h4>
<p>Not every file in your project folder belongs in Git. Some are actively dangerous to commit:</p>
<ul>
<li><b>Secrets</b>: passwords and API keys, usually kept in a file called <code>.env</code>. An <b>API key</b> is a secret string that lets a program use a paid service in your name. If it reaches a public GitHub repository, automated bots can find it within minutes and run up bills or steal data.</li>
<li><b>Logs</b>: files like <code>debug.log</code> that programs write while running. They change constantly and mean nothing to anyone else.</li>
<li><b>Generated files</b>: build output, or the <code>node_modules</code> folder of downloaded libraries, which can hold tens of thousands of files. Anyone can regenerate them, so storing them only bloats the history.</li>
</ul>
<p>Git cannot guess which files are which. It shows every untracked file in <code>git status</code>, and <code>git add .</code> would happily stage them all. You need a way to say "pretend these do not exist". That is a <code>.gitignore</code> file.</p>
<div class="analogy"><b>Think of it like</b>A "do not pack" list taped to the parcel box. Whoever is packing checks the list and leaves those items on the desk, every single time.</div>

<h4>Writing a <code>.gitignore</code></h4>
<p><code>.gitignore</code> is a plain text file in the top folder of your repository. Each line is a <b>pattern</b> that describes files to ignore:</p>
<div class="tbl-wrap"><table><tr><th>Line</th><th>Ignores</th></tr>
<tr><td><code>.env</code></td><td>Any file named exactly <code>.env</code></td></tr>
<tr><td><code>*.log</code></td><td>Every file ending in <code>.log</code>. The star means "any characters".</td></tr>
<tr><td><code>node_modules/</code></td><td>A whole folder and everything inside it. The trailing slash means "folders only".</td></tr>
<tr><td><code>/build</code></td><td>A leading slash matches only at the top of the repository.</td></tr>
<tr><td><code># secrets</code></td><td>Nothing: lines starting with # are comments.</td></tr>
<tr><td><code>!keep.log</code></td><td>An exclamation mark makes an exception: do not ignore this one.</td></tr></table></div>
<p>The sandbox builds the file one line at a time with <code>echo</code>. This is where two shell symbols matter:</p>
<pre class="snip">echo ".env" &gt; .gitignore      # &gt;  creates or OVERWRITES the file
echo "*.log" &gt;&gt; .gitignore    # &gt;&gt; APPENDS a line to the end</pre>
<p>Use a single <code>&gt;</code> for the first line only. If you used it for the second line too, it would wipe out <code>.env</code> and leave just <code>*.log</code>. Check the result with <code>cat .gitignore</code>.</p>

<h4>What <code>git status</code> shows now</h4>
<p>With the ignore file in place, <code>.env</code> and <code>debug.log</code> are still on your disk, but Git stops mentioning them. The only new thing <code>git status</code> lists is <code>.gitignore</code> itself:</p>
<pre class="snip">Untracked files:
  (use "git add &lt;file&gt;..." to include in what will be committed)
        .gitignore</pre>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="How each file in the folder is treated once .gitignore exists">
<g text-anchor="middle">
<text class="t-s" x="70" y="18">in the folder</text><text class="t-s" x="325" y="18">git status says</text>
<rect class="bx" x="10" y="32" width="120" height="36" rx="6"/><text class="t-m" x="70" y="55">app.js</text>
<rect class="bx" x="10" y="82" width="120" height="36" rx="6"/><text class="t-m" x="70" y="105">.env</text>
<rect class="bx" x="10" y="132" width="120" height="36" rx="6"/><text class="t-m" x="70" y="155">debug.log</text>
<rect class="bx" x="10" y="182" width="120" height="36" rx="6"/><text class="t-m" x="70" y="205">.gitignore</text>
<rect class="bx-ok" x="240" y="32" width="170" height="36" rx="6"/><text class="t" x="325" y="55">committed, clean</text>
<rect class="bx-bad" x="240" y="82" width="170" height="36" rx="6"/><text class="t" x="325" y="105">hidden: .env</text>
<rect class="bx-bad" x="240" y="132" width="170" height="36" rx="6"/><text class="t" x="325" y="155">hidden: *.log</text>
<rect class="bx-warn" x="240" y="182" width="170" height="36" rx="6"/><text class="t" x="325" y="205">untracked, shown</text>
</g>
<line class="ln" x1="132" y1="50" x2="230" y2="50"/><polygon class="ah" points="229,44 229,56 238,50"/>
<line class="ln" x1="132" y1="100" x2="230" y2="100"/><polygon class="ah" points="229,94 229,106 238,100"/>
<line class="ln" x1="132" y1="150" x2="230" y2="150"/><polygon class="ah" points="229,144 229,156 238,150"/>
<line class="ln" x1="132" y1="200" x2="230" y2="200"/><polygon class="ah" points="229,194 229,206 238,200"/>
</svg><figcaption>Four files sit in the folder. app.js was already committed and has not changed, so it is clean. .env matches the .env pattern and debug.log matches the star dot log pattern, so both are hidden from Git. .gitignore itself is a new file, so it is shown as untracked.</figcaption></figure>
<p>Commit the <code>.gitignore</code> itself, with <code>git add .</code> and a commit. That way every teammate who clones the project gets the same rules. Now even <code>git add .</code> skips the ignored files.</p>

<h4>The catch: it only affects untracked files</h4>
<p><code>.gitignore</code> only stops Git from <i>starting</i> to track a file. If a file was already committed before you added the rule, Git keeps tracking it and keeps recording its changes. To stop tracking it while keeping it on your disk:</p>
<pre class="snip">git rm --cached config.json    # remove from Git's tracking only
git commit -m "Stop tracking config.json"</pre>
<p><code>--cached</code> means "remove it from the staging area and future commits, but leave my actual file alone". Without <code>--cached</code>, <code>git rm</code> deletes the file from your disk too.</p>
<div class="mistake"><b>Common mistake</b>Committing a secret, then adding it to <code>.gitignore</code> and thinking the problem is solved. The secret is still inside every old commit, and anyone who can see the repository can read it. If a key was ever pushed, <b>revoke it first</b> at the service that issued it and create a new one. Cleaning it out of the history comes second, and is a much bigger job.</div>

<h4>Tags: permanent labels for releases</h4>
<p>When you release a version of your project, you want to find exactly that code again later: "what did version 1.0.0 contain?" A <b>tag</b> is a label stuck on one commit that <b>never moves</b>.</p>
<p>That is the difference from a branch. A branch label moves forward every time you commit on it. A tag stays on its commit forever, so <code>v1.0.0</code> always means the same code.</p>
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="The tag v1.0.0 stays on its commit while main moves forward">
<line class="ln" x1="75" y1="80" x2="325" y2="80"/>
<g text-anchor="middle">
<circle class="bx-a" cx="60" cy="80" r="15"/><text class="t-s" x="60" y="85">A</text>
<circle class="bx-a" cx="160" cy="80" r="15"/><text class="t-s" x="160" y="85">B</text>
<circle class="bx-a" cx="250" cy="80" r="15"/><text class="t-s" x="250" y="85">C</text>
<circle class="bx-a" cx="340" cy="80" r="15"/><text class="t-s" x="340" y="85">D</text>
<rect class="bx-warn" x="115" y="112" width="90" height="28" rx="6"/><text class="t-m" x="160" y="131">v1.0.0</text>
<rect class="bx-ok" x="310" y="24" width="60" height="26" rx="6"/><text class="t-b" x="340" y="42">main</text>
<text class="t-s" x="160" y="166">tag: stays put</text><text class="t-s" x="340" y="128">branch: moves</text>
</g>
<line class="ln" x1="160" y1="112" x2="160" y2="100"/>
<path class="ln-d" d="M160 40H300"/><polygon class="ah" points="298,34 298,46 307,40"/><line class="ln" x1="340" y1="50" x2="340" y2="65"/>
</svg><figcaption>You tagged commit B as v1.0.0, then kept working. The main branch label moved on to D with every new commit, but the tag is still on B, so v1.0.0 always points at exactly the released code.</figcaption></figure>
<pre class="snip">git tag v1.0.0                              # tag the current commit
git tag                                     # list all tags
git tag -a v1.1.0 -m "Add contact page"     # annotated tag with a message
git push origin v1.0.0                      # tags are NOT pushed by default</pre>
<p>A plain <code>git tag v1.0.0</code> makes a <b>lightweight</b> tag: just a name. With <code>-a</code> and <code>-m</code> you make an <b>annotated</b> tag, which also stores who tagged it, when, and a message. Teams usually prefer annotated tags for real releases. Note the last line: a normal <code>git push</code> does not send tags, so push them by name. On GitHub, tags appear under Releases.</p>

<h4>Version numbers: semantic versioning</h4>
<p>Release names like <code>v2.4.1</code> follow a widely used convention called <b>semantic versioning</b>, or <b>semver</b>. The three numbers are MAJOR.MINOR.PATCH, and each one tells users how risky an upgrade is.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="Semantic version 2.4.1: major, minor and patch, with examples of each bump">
<g text-anchor="middle">
<text class="t-m t-a" x="110" y="56" style="font-size:40px">2</text><text class="t-m" x="160" y="56" style="font-size:40px">.</text>
<text class="t-m t-ok" x="210" y="56" style="font-size:40px">4</text><text class="t-m" x="260" y="56" style="font-size:40px">.</text>
<text class="t-m t-info" x="310" y="56" style="font-size:40px">1</text>
<text class="t-b t-a" x="110" y="86">MAJOR</text><text class="t-b t-ok" x="210" y="86">MINOR</text><text class="t-b t-info" x="310" y="86">PATCH</text>
<rect class="bx-a" x="10" y="108" width="400" height="30" rx="6"/><text class="t" x="210" y="128">breaking change: 2.4.1 to 3.0.0</text>
<rect class="bx-ok" x="10" y="146" width="400" height="30" rx="6"/><text class="t" x="210" y="166">new feature: 2.4.1 to 2.5.0</text>
<rect class="bx-info" x="10" y="184" width="400" height="30" rx="6"/><text class="t" x="210" y="204">bug fix: 2.4.1 to 2.4.2</text>
</g>
</svg><figcaption>Version 2.4.1 means major version 2, minor version 4, patch 1. A breaking change bumps the major number and resets the others, giving 3.0.0. A new feature that breaks nothing bumps the minor number, giving 2.5.0. A bug fix bumps only the patch number, giving 2.4.2.</figcaption></figure>
<ul>
<li><b>PATCH</b>: bug fixes only. Safe to upgrade.</li>
<li><b>MINOR</b>: new features that do not break anything that already worked. The patch number resets to 0.</li>
<li><b>MAJOR</b>: a <b>breaking change</b>, meaning code that used the old version may stop working. Minor and patch reset to 0.</li>
</ul>
<p>The little <code>v</code> in front is a common habit for tag names, not part of the version itself.</p>
<div class="try"><b>Try it in your head</b>Your app is at <code>v1.3.2</code>. You add a dark mode that changes nothing existing. What is the next version? A new feature with no breakage bumps MINOR and resets PATCH: <code>v1.4.0</code>.</div>

<h4>Recap</h4>
<ul>
<li><code>.gitignore</code> lists patterns for files Git should ignore: <code>.env</code>, <code>*.log</code>, <code>node_modules/</code>. Commit the file itself.</li>
<li><code>&gt;</code> overwrites a file and <code>&gt;&gt;</code> appends to it.</li>
<li><code>.gitignore</code> only affects untracked files; stop tracking a committed file with <code>git rm --cached</code>.</li>
<li>A leaked secret must be revoked first; removing it from history comes second.</li>
<li>A tag is a label that never moves: <code>git tag v1.0.0</code>, list with <code>git tag</code>, push with <code>git push origin v1.0.0</code>. Versions follow MAJOR.MINOR.PATCH.</li>
</ul>
`);
explain('g13',`
<h4>The situation</h4>
<p>This is a drill: no new commands, just everything from the track, in the right order, under time pressure. Here is the scenario. You are halfway through a dashboard feature on <code>feature/dashboard</code>. One commit, "Start charts", is pushed; more work, "filters wip", sits uncommitted in <code>dashboard.js</code>. Then the message arrives: <b>login is broken in production, ship a fix now</b>. And a teammate pushed a commit to <code>main</code> on GitHub this morning that you do not have yet.</p>
<p>A hotfix like this is a classic live-coding interview task. What is being tested is not speed of typing. It is whether you keep your unfinished work safe, start the fix from the right place, ship it through review, and get back to where you were without losing anything. This walkthrough gives you a strategy you can run calmly every time.</p>
<div class="analogy"><b>Think of it like</b>A chef in the middle of preparing a dish when an urgent order comes in. A good chef covers the half-made dish and puts it in the fridge, cleans the station, cooks the urgent order with fresh ingredients, sends it out, then takes the first dish back out and carries on.</div>

<h4>The plan in one picture</h4>
<figure class="fig"><svg viewBox="0 0 420 280" role="img" aria-label="Branch flow: stash, update main, hotfix branch, merge by PR, rebase the feature onto main">
<line class="ln-d" x1="58" y1="138" x2="122" y2="72"/>
<line class="ln" x1="65" y1="150" x2="125" y2="150"/><line class="ln" x1="155" y1="150" x2="285" y2="150"/>
<line class="ln" x1="150" y1="162" x2="210" y2="228"/><line class="ln" x1="230" y1="228" x2="290" y2="162"/>
<line class="ln-ok" x1="310" y1="138" x2="370" y2="72"/>
<line class="ln-d" x1="146" y1="60" x2="184" y2="60"/><line class="ln-d" x1="306" y1="60" x2="354" y2="60"/><polygon class="ah" points="352,54 352,66 362,60"/>
<g text-anchor="middle">
<circle class="bx-a" cx="50" cy="150" r="15"/><text class="t-s" x="50" y="155">C1</text>
<circle class="ln-d" cx="130" cy="60" r="15" fill="none"/><text class="t-s" x="130" y="65">C2</text>
<circle class="bx-ok" cx="140" cy="150" r="15"/><text class="t-s" x="140" y="155">T</text>
<circle class="bx-a" cx="220" cy="240" r="15"/><text class="t-s" x="220" y="245">H</text>
<circle class="bx-ok" cx="300" cy="150" r="16"/><text class="t-b" x="300" y="155">M</text>
<circle class="bx-ok" cx="380" cy="60" r="16"/><text class="t-s" x="380" y="65">C2'</text>
<text class="t-s" x="124" y="184" text-anchor="end">teammate</text>
<text class="t-s" x="130" y="30">old charts</text>
<rect class="bx-warn" x="186" y="44" width="120" height="32" rx="6"/><text class="t-s" x="246" y="65">stash: filters</text>
<rect class="bx-info" x="250" y="226" width="112" height="28" rx="6"/><text class="t-b" x="306" y="245">hotfix/login</text>
<rect class="bx-ok" x="330" y="137" width="60" height="26" rx="6"/><text class="t-b" x="360" y="155">main</text>
<text class="t-s" x="410" y="30" text-anchor="end">feature, rebased</text>
</g>
<text class="t-s" x="312" y="184">merged PR</text>
</svg><figcaption>The whole drill as a commit graph. Your old feature commit C2, dashed, started from C1, and your unfinished filters go onto the stash shelf. Main is updated with your teammate's commit T. The fix H is made on hotfix/login, branched from T, and merged on GitHub as merge commit M. Finally the feature is rebased onto M as C2 prime, and the stashed filters are popped back on top.</figcaption></figure>

<h4>Phase 1: look, then save your work</h4>
<p>Start with <code>git status</code>. It confirms you are on <code>feature/dashboard</code> and that <code>dashboard.js</code> is modified. Never switch away from uncommitted work without deciding what happens to it.</p>
<pre class="snip">git status     # where am I, what is unsaved?
git stash      # shelve "filters wip"; the working tree is now clean</pre>
<p>Why stash rather than commit? The filters are half-done. A "wip" commit would work too, but stash keeps the feature branch's history clean and is quicker. Either way, the rule is: <b>never carry half-done work onto a hotfix branch</b>, or it ships to production with the fix.</p>

<h4>Phase 2: start from the latest main</h4>
<pre class="snip">git switch main
git pull       # brings in your teammate's commit</pre>
<p>A fix must be built on what is actually in production, not on your stale copy. Your local <code>main</code> has no commits of its own, so this pull is a simple fast-forward onto your teammate's commit. If you skipped it, your hotfix branch would start from old code, and its pull request might conflict or quietly undo your teammate's change.</p>

<h4>Phase 3: make the fix on its own branch</h4>
<pre class="snip">git switch -c hotfix/login          # new branch from up-to-date main
# edit login.js so it works, then:
git commit -am "Fix login crash"</pre>
<p>The branch name starts with <code>hotfix/</code>, which tells the team at a glance that this is urgent. <code>-am</code> stages the modified, already-tracked <code>login.js</code> and commits it in one step. Keep the fix small: fix the crash, nothing else. Tidying up while you are in there makes the review slower and the change riskier.</p>

<h4>Phase 4: ship it through a pull request</h4>
<pre class="snip">git push -u origin hotfix/login
gh pr create --title "Fix login crash"
gh pr merge 1</pre>
<p>Even in an emergency, the fix goes through a PR, so it is reviewed, tested by the checks, and recorded. In the sandbox you merge it yourself; on a real team a colleague would approve it first. GitHub's <code>main</code> now contains the fix as merge commit M.</p>

<h4>Phase 5: bring the fix home</h4>
<pre class="snip">git switch main
git pull</pre>
<p>Remember from the pull requests lesson: the merge happened on GitHub, so your local <code>main</code> does not have it until you pull. After this, local <code>main</code> and <code>origin/main</code> point at the same commit. You could also delete the finished branch now with <code>git branch -d hotfix/login</code>.</p>

<h4>Phase 6: get back to your feature</h4>
<pre class="snip">git switch feature/dashboard
git rebase main     # replay "Start charts" on top of the fixed main
git stash pop       # put "filters wip" back</pre>
<p>Rebasing moves your feature so it starts from the newest <code>main</code>, which now includes the login fix and your teammate's change. Your feature is then tested against the real current code. The order matters: rebase refuses to run with uncommitted changes, so rebase while the tree is still clean, and pop the stash last.</p>
<p>One honest caveat. "Start charts" had already been pushed, and the golden rule says not to rebase shared commits. If you are the only person working on <code>feature/dashboard</code>, this is fine; your next push will need <code>git push --force-with-lease</code> because the commit has a new id. If others share the branch, use <code>git merge main</code> instead of rebasing. Being able to say this in an interview is worth as much as typing the commands.</p>
<figure class="fig"><svg viewBox="0 0 420 320" role="img" aria-label="The six phases with their commands">
<rect class="bx-warn" x="10" y="10" width="100" height="44" rx="8"/><text class="t-b" x="60" y="37" text-anchor="middle">1 Save</text>
<text class="t-m" x="124" y="37">git status, git stash</text>
<rect class="bx" x="10" y="62" width="100" height="44" rx="8"/><text class="t-b" x="60" y="89" text-anchor="middle">2 Sync</text>
<text class="t-m" x="124" y="89">git switch main, pull</text>
<rect class="bx-a" x="10" y="114" width="100" height="44" rx="8"/><text class="t-b" x="60" y="141" text-anchor="middle">3 Fix</text>
<text class="t-m" x="124" y="132">switch -c hotfix/login</text><text class="t-m" x="124" y="152">git commit -am</text>
<rect class="bx-info" x="10" y="166" width="100" height="44" rx="8"/><text class="t-b" x="60" y="193" text-anchor="middle">4 Ship</text>
<text class="t-m" x="124" y="184">git push -u origin</text><text class="t-m" x="124" y="204">gh pr create, merge</text>
<rect class="bx" x="10" y="218" width="100" height="44" rx="8"/><text class="t-b" x="60" y="245" text-anchor="middle">5 Sync</text>
<text class="t-m" x="124" y="245">git switch main, pull</text>
<rect class="bx-ok" x="10" y="270" width="100" height="44" rx="8"/><text class="t-b" x="60" y="297" text-anchor="middle">6 Resume</text>
<text class="t-m" x="124" y="288">switch, rebase main</text><text class="t-m" x="124" y="308">git stash pop</text>
</svg><figcaption>The six phases as a checklist. Save: check status and stash. Sync: switch to main and pull. Fix: create the hotfix branch and commit. Ship: push the branch, open the pull request and merge it. Sync again: switch to main and pull the merge. Resume: switch back to the feature, rebase onto main and pop the stash.</figcaption></figure>

<h4>When something goes wrong mid-drill</h4>
<ul>
<li><b>"Your local changes would be overwritten"</b> when switching: you forgot to stash. Run <code>git stash</code>, then switch.</li>
<li><b>Push rejected</b>: someone pushed to the same branch. <code>git pull</code>, then push. Never force a shared branch.</li>
<li><b>Conflict during rebase</b>: fix the file, <code>git add</code> it, <code>git rebase --continue</code>. Panicking? <code>git rebase --abort</code> puts the branch back.</li>
<li><b>Conflict on stash pop</b>: resolve the file as usual; the entry stays on the shelf until you <code>git stash drop</code> it.</li>
<li><b>Lost track of where you are</b>: <code>git status</code>, and <code>git log --oneline --graph --all</code> to see every branch at once.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Creating the hotfix branch straight from <code>feature/dashboard</code>, because that is where you happened to be. The hotfix then contains your unfinished charts, and merging the PR ships half a feature to production. Always switch to <code>main</code> and pull <i>before</i> <code>git switch -c hotfix/...</code>.</div>
<div class="mistake"><b>Common mistake</b>Popping the stash before rebasing. Rebase then refuses because your working tree is not clean. If it happens, stash again, rebase, and pop.</div>
<div class="try"><b>Try it in your head</b>You finished Phase 4, the PR is merged, and you jump straight to <code>git switch feature/dashboard</code> and <code>git rebase main</code>. Does your feature now contain the login fix? No. Your local <code>main</code> was never pulled after the merge, so you rebased onto the old main. Phase 5, pulling main, is what brings the fix to your computer.</div>

<h4>Recap</h4>
<ul>
<li>Save first: <code>git status</code>, then <code>git stash</code>, so unfinished work never reaches the hotfix.</li>
<li>Start fixes from an up-to-date main: <code>git switch main</code>, <code>git pull</code>, <code>git switch -c hotfix/name</code>.</li>
<li>Ship through a PR even in a hurry: push the branch, <code>gh pr create</code>, <code>gh pr merge</code>.</li>
<li>The merge is on GitHub: switch to main and pull to bring it home.</li>
<li>Resume: switch back, <code>git rebase main</code> while clean (or merge if the branch is shared), then <code>git stash pop</code>.</li>
</ul>
`);
