/* Linux: "Explained step by step" walkthroughs. */

explain('l1',`
<p>Almost every server, Docker container and test robot in the world runs Linux, and none of them has a mouse. You move around them by typing. Learn to find your way with a handful of short words and you can work on any computer on the planet.</p>

${V.card(1,'One big tree','every file has one address',`
<figure class="fig"><svg viewBox="0 0 420 212" role="img" aria-label="The Linux folder tree: root at the top, then etc, home and var; home holds you; you holds Documents, projects and notes.txt">
<rect class="bx-dark" x="180" y="8" width="60" height="34" rx="6"/><text class="t-term" x="210" y="33" text-anchor="middle" style="font-size:22px">/</text>
<path class="ln" d="M210 42V52H60V62M210 52V62M210 52H360V62"/>
<rect class="bx-a" x="20" y="62" width="80" height="34" rx="6"/><text class="t-m" x="60" y="85" text-anchor="middle" style="font-size:17px">etc</text>
<rect class="bx-a" x="165" y="62" width="90" height="34" rx="6"/><text class="t-m" x="210" y="85" text-anchor="middle" style="font-size:17px">home</text>
<rect class="bx-a" x="320" y="62" width="80" height="34" rx="6"/><text class="t-m" x="360" y="85" text-anchor="middle" style="font-size:17px">var</text>
<path class="ln" d="M210 96V114"/>
<rect class="bx-ok" x="170" y="114" width="80" height="34" rx="6"/><text class="t-m" x="210" y="137" text-anchor="middle" style="font-size:17px">you</text>
<text class="t t-ok" x="262" y="137" style="font-size:15px">~ is /home/you</text>
<path class="ln" d="M210 148V158H85V168M210 158V168M210 158H335V168"/>
<rect class="bx-a" x="25" y="168" width="120" height="34" rx="6"/><text class="t-m" x="85" y="191" text-anchor="middle" style="font-size:16px">Documents</text>
<rect class="bx-a" x="155" y="168" width="110" height="34" rx="6"/><text class="t-m" x="210" y="191" text-anchor="middle" style="font-size:16px">projects</text>
<rect class="bx-info" x="280" y="168" width="110" height="34" rx="6"/><text class="t-m" x="335" y="191" text-anchor="middle" style="font-size:16px">notes.txt</text>
</svg><figcaption>Linux keeps everything in one upside-down tree. The top is called the root and is written <code>/</code>. Your own space is <code>/home/you</code>, nicknamed <code>~</code> (tilde). Orange boxes are folders, the blue one is a file.</figcaption></figure>
${V.like(`<p>A huge office building. <code>/</code> is the front door. Every floor, corridor and room hangs off it, and a <b>path</b> is the directions from the front door to one room: "go to home, then you, then projects".</p>`)}
${V.why(`<p>Windows gives each drive a letter, like <code>C:</code> and <code>D:</code>. Unix, the 1970s system Linux copies, chose one single tree instead. Even a USB stick appears as a folder inside it. One tree means every file has exactly one full address.</p>`)}
${V.anat([[1,'/'],[2,'home'],[3,'/'],[2,'you'],[3,'/'],[2,'projects'],[3,'/'],[4,'site']],[
 '<b>Leading slash.</b> "Start at the front door." A path that begins with <code>/</code> is <b>absolute</b>: it means the same place wherever you are.',
 '<b>Folders on the way.</b> Walked through in order, top to bottom. A folder is also called a <b>directory</b>.',
 '<b>Separator.</b> A forward slash between names. Never a backslash on Linux.',
 '<b>Destination.</b> The folder or file you want to reach.'])}
<p><b>Watch yourself move.</b> The terminal is on top. The strip below shows where you are standing.</p>
${V.steps([
 ['You open a terminal. <b>pwd</b> (print working directory) answers "where am I?". You always start at home.',`<svg viewBox="0 0 420 190" role="img" aria-label="pwd prints /home/you; you are in you">
<rect class="bx-dark" x="4" y="6" width="412" height="82" rx="8"/>
<text class="t-term" x="16" y="34" style="font-size:16px">$ pwd</text>
<text class="t-term t-a" x="16" y="70" style="font-size:16px">/home/you</text>
<rect class="bx" x="4" y="104" width="40" height="40" rx="6"/><text class="t-m" x="24" y="130" text-anchor="middle">/</text>
<rect class="bx" x="62" y="104" width="70" height="40" rx="6"/><text class="t-m" x="97" y="130" text-anchor="middle">home</text>
<rect class="bx-hl" x="150" y="104" width="60" height="40" rx="6"/><text class="t-m" x="180" y="130" text-anchor="middle">you</text>
<rect class="bx" x="228" y="104" width="100" height="40" rx="6"/><text class="t-m" x="278" y="130" text-anchor="middle">projects</text>
<rect class="bx" x="346" y="104" width="70" height="40" rx="6"/><text class="t-m" x="381" y="130" text-anchor="middle">site</text>
<path class="ln" d="M44 124H62M132 124H150M210 124H228M328 124H346"/>
${V.ic('person',165,150,30,'ic-a')}
</svg>`],
 ['<b>cd projects</b> (change directory). No slash at the start, so it is <b>relative</b>: "from where I stand, go into projects".',`<svg viewBox="0 0 420 190" role="img" aria-label="cd projects; pwd prints /home/you/projects">
<rect class="bx-dark" x="4" y="6" width="412" height="82" rx="8"/>
<text class="t-term" x="16" y="30" style="font-size:16px">$ cd projects</text>
<text class="t-term" x="16" y="54" style="font-size:16px">$ pwd</text>
<text class="t-term t-a" x="16" y="78" style="font-size:16px">/home/you/projects</text>
<rect class="bx" x="4" y="104" width="40" height="40" rx="6"/><text class="t-m" x="24" y="130" text-anchor="middle">/</text>
<rect class="bx" x="62" y="104" width="70" height="40" rx="6"/><text class="t-m" x="97" y="130" text-anchor="middle">home</text>
<rect class="bx" x="150" y="104" width="60" height="40" rx="6"/><text class="t-m" x="180" y="130" text-anchor="middle">you</text>
<rect class="bx-hl" x="228" y="104" width="100" height="40" rx="6"/><text class="t-m" x="278" y="130" text-anchor="middle">projects</text>
<rect class="bx" x="346" y="104" width="70" height="40" rx="6"/><text class="t-m" x="381" y="130" text-anchor="middle">site</text>
<path class="ln" d="M44 124H62M132 124H150M210 124H228M328 124H346"/>
${V.ic('person',263,150,30,'ic-a')}
</svg>`],
 ['<b>cd ..</b> goes up one level. Two dots always mean "the folder above this one".',`<svg viewBox="0 0 420 190" role="img" aria-label="cd .. ; pwd prints /home/you">
<rect class="bx-dark" x="4" y="6" width="412" height="82" rx="8"/>
<text class="t-term" x="16" y="30" style="font-size:16px">$ cd ..</text>
<text class="t-term" x="16" y="54" style="font-size:16px">$ pwd</text>
<text class="t-term t-a" x="16" y="78" style="font-size:16px">/home/you</text>
<rect class="bx" x="4" y="104" width="40" height="40" rx="6"/><text class="t-m" x="24" y="130" text-anchor="middle">/</text>
<rect class="bx" x="62" y="104" width="70" height="40" rx="6"/><text class="t-m" x="97" y="130" text-anchor="middle">home</text>
<rect class="bx-hl" x="150" y="104" width="60" height="40" rx="6"/><text class="t-m" x="180" y="130" text-anchor="middle">you</text>
<rect class="bx" x="228" y="104" width="100" height="40" rx="6"/><text class="t-m" x="278" y="130" text-anchor="middle">projects</text>
<rect class="bx" x="346" y="104" width="70" height="40" rx="6"/><text class="t-m" x="381" y="130" text-anchor="middle">site</text>
<path class="ln" d="M44 124H62M132 124H150M210 124H228M328 124H346"/>
${V.ic('person',165,150,30,'ic-a')}
</svg>`],
 ['An <b>absolute</b> path starts at <b>/</b>, so it works from anywhere. You jump straight to site in one go.',`<svg viewBox="0 0 420 190" role="img" aria-label="cd /home/you/projects/site; pwd prints that path">
<rect class="bx-dark" x="4" y="6" width="412" height="82" rx="8"/>
<text class="t-term" x="16" y="30" style="font-size:16px">$ cd /home/you/projects/site</text>
<text class="t-term" x="16" y="54" style="font-size:16px">$ pwd</text>
<text class="t-term t-a" x="16" y="78" style="font-size:16px">/home/you/projects/site</text>
<rect class="bx-ok" x="4" y="104" width="40" height="40" rx="6"/><text class="t-m" x="24" y="130" text-anchor="middle">/</text>
<rect class="bx-ok" x="62" y="104" width="70" height="40" rx="6"/><text class="t-m" x="97" y="130" text-anchor="middle">home</text>
<rect class="bx-ok" x="150" y="104" width="60" height="40" rx="6"/><text class="t-m" x="180" y="130" text-anchor="middle">you</text>
<rect class="bx-ok" x="228" y="104" width="100" height="40" rx="6"/><text class="t-m" x="278" y="130" text-anchor="middle">projects</text>
<rect class="bx-hl" x="346" y="104" width="70" height="40" rx="6"/><text class="t-m" x="381" y="130" text-anchor="middle">site</text>
<path class="ln-ok" d="M44 124H62M132 124H150M210 124H228M328 124H346"/>
${V.ic('person',366,150,30,'ic-a')}
</svg>`],
 ['<b>cd -</b> jumps back to wherever you were last, and prints it. Lost? Plain <b>cd</b> or <b>cd ~</b> always takes you home.',`<svg viewBox="0 0 420 190" role="img" aria-label="cd - prints /home/you and returns you there">
<rect class="bx-dark" x="4" y="6" width="412" height="82" rx="8"/>
<text class="t-term" x="16" y="34" style="font-size:16px">$ cd -</text>
<text class="t-term t-a" x="16" y="70" style="font-size:16px">/home/you</text>
<rect class="bx" x="4" y="104" width="40" height="40" rx="6"/><text class="t-m" x="24" y="130" text-anchor="middle">/</text>
<rect class="bx" x="62" y="104" width="70" height="40" rx="6"/><text class="t-m" x="97" y="130" text-anchor="middle">home</text>
<rect class="bx-hl" x="150" y="104" width="60" height="40" rx="6"/><text class="t-m" x="180" y="130" text-anchor="middle">you</text>
<rect class="bx" x="228" y="104" width="100" height="40" rx="6"/><text class="t-m" x="278" y="130" text-anchor="middle">projects</text>
<rect class="bx" x="346" y="104" width="70" height="40" rx="6"/><text class="t-m" x="381" y="130" text-anchor="middle">site</text>
<path class="ln" d="M44 124H62M132 124H150M210 124H228M328 124H346"/>
${V.ic('person',165,150,30,'ic-a')}
</svg>`]])}
${V.rules(V.rh('Rules: get these wrong and the command fails'),
 V.ok('cd /etc','Starts with / : absolute, works from anywhere'),V.ok('cd projects','No / : relative, starts where you are'),
 V.no('cd Projects','Names are case-sensitive: Projects and projects are different'),V.no('cd my folder','A space splits it into two words. Use "my folder"'),
 V.no('cd \\home\\you','Backslashes are Windows. Linux uses /'),
 V.rh('Conventions: what professionals do'),
 V.ok('my-site, notes.txt','Lower case, hyphens, no spaces in names'),V.ok('pwd','When in doubt, check where you are before you act'))}
${V.hook(`Slash first: from the front door. No slash: from where you stand. <code>..</code> is up, <code>~</code> is home, <code>-</code> is back.`)}
`)}

${V.card(2,'Look around','pwd and ls switch the lights on',`
<figure class="fig"><svg viewBox="0 0 420 196" role="img" aria-label="ls -la output in the home folder, with dot, dot dot and the hidden file .bashrc labelled">
<rect class="bx-dark" x="4" y="6" width="270" height="184" rx="8"/>
<text class="t-term" x="16" y="32" style="font-size:16px">$ ls -la</text>
<text class="t-term" x="16" y="62" style="font-size:16px"><tspan class="t-a">d</tspan>rwxr-xr-x  .</text>
<text class="t-term" x="16" y="88" style="font-size:16px"><tspan class="t-a">d</tspan>rwxr-xr-x  ..</text>
<text class="t-term" x="16" y="114" style="font-size:16px">-rw-r--r--  .bashrc</text>
<text class="t-term" x="16" y="140" style="font-size:16px"><tspan class="t-a">d</tspan>rwxr-xr-x  Documents</text>
<text class="t-term" x="16" y="166" style="font-size:16px">-rw-r--r--  notes.txt</text>
<path class="ln-d" d="M232 57H286M232 83H286M240 109H286"/>
<text class="t" x="292" y="62">this folder</text>
<text class="t" x="292" y="88">the one above</text>
<text class="t t-a" x="292" y="114">hidden file</text>
<text class="t" x="292" y="140"><tspan class="t-a" style="font-weight:700">d</tspan> = directory</text>
<text class="t" x="292" y="166">- = file</text>
</svg><figcaption>A shortened <code>ls -la</code>. Names that start with a dot are hidden from a plain <code>ls</code>. The first letter of each line says what it is. The other nine letters are permissions, which is the next lesson.</figcaption></figure>
${V.like(`<p>Walking into a dark room. <code>pwd</code> tells you which room you are in; <code>ls</code> switches the light on. <code>-a</code> also opens the drawers where the hidden things are kept.</p>`)}
${V.why(`<p>A terminal shows nothing until you ask, so "where am I?" and "what is here?" are the two questions you ask most. Hidden <b>dotfiles</b> such as <code>.bashrc</code> hold settings. They are hidden so they don't clutter your view, not because they are secret.</p>`)}
${V.anat([[1,'ls'],' ',[2,'-l'],[3,'a'],' ',[4,'~/projects']],[
 '<b>Command.</b> <code>ls</code> lists what is in a folder.',
 '<b>-l (long).</b> One item per line with details: type, permissions, owner, size, date.',
 '<b>a (all).</b> Include hidden dotfiles. Short flags can be squashed together: <code>-la</code> is <code>-l -a</code>.',
 '<b>Where (optional).</b> Leave it out and ls lists the folder you are in.'])}
${V.rules(V.ok('ls -la','Space between the command and its flags'),V.no('ls-la','No space: Linux looks for a command called "ls-la"'),
 V.no('LS','Commands are lower case'),V.ok('tree','Draws the folders below you as a tree (may need installing on a real machine)'))}
${V.hook(`<code>pwd</code>: where am I? <code>ls -la</code>: what is here, even the hidden things?`)}
`)}

${V.card(3,'Make, copy, move, delete','five verbs that shape the tree',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Five commands as pictures: mkdir makes a folder, touch makes a file, cp copies, mv moves or renames, rm deletes">
${V.ic('folder',18,10,48,'ic-a')}${V.ic('file',100,10,48,'ic-info')}${V.ic('file',178,10,40,'ic-ok')}${V.ic('file',194,24,40,'ic-ok')}${V.ic('arrow',266,14,44,'ic-a')}${V.ic('cross',348,10,48,'ic-bad')}
<text class="t-m" x="42" y="98" text-anchor="middle" style="font-size:17px">mkdir</text>
<text class="t-m" x="124" y="98" text-anchor="middle" style="font-size:17px">touch</text>
<text class="t-m" x="208" y="98" text-anchor="middle" style="font-size:17px">cp</text>
<text class="t-m" x="290" y="98" text-anchor="middle" style="font-size:17px">mv</text>
<text class="t-m" x="372" y="98" text-anchor="middle" style="font-size:17px">rm</text>
<text class="t" x="42" y="126" text-anchor="middle">new folder</text>
<text class="t" x="124" y="126" text-anchor="middle">new file</text>
<text class="t" x="208" y="126" text-anchor="middle">copy</text>
<text class="t" x="290" y="126" text-anchor="middle">move or</text>
<text class="t" x="290" y="144" text-anchor="middle">rename</text>
<text class="t t-bad" x="372" y="126" text-anchor="middle">delete</text>
<text class="t t-bad" x="372" y="144" text-anchor="middle">forever</text>
</svg><figcaption>The five verbs. Each is short for an English word: make directory, touch (create an empty file), copy, move, remove.</figcaption></figure>
${V.like(`<p><code>cp</code> is a photocopier: you end up with two. <code>mv</code> is picking a box up and putting it somewhere else; giving it a new label is just a move to a new name. <code>rm</code> is a shredder, and there is no recycle bin to rescue you.</p>`)}
${V.anat([[1,'mkdir'],' ',[2,'-p'],' ',[3,'projects/site/css']],[
 '<b>Command.</b> Make a directory.',
 '<b>-p (parents).</b> Also create any missing folders on the way. Without it, mkdir fails if <code>projects</code> doesn\'t exist yet.',
 '<b>Path.</b> Relative here, so it is built inside the folder you are in.'])}
${V.steps([
 ['<b>mkdir -p</b> builds three folders in one go, one inside the next.',`<svg viewBox="0 0 420 236" role="img" aria-label="mkdir -p creates projects, site and css">
<rect class="bx-dark" x="4" y="6" width="412" height="40" rx="8"/><text class="t-term" x="16" y="32" style="font-size:16px">$ mkdir -p projects/site/css</text>
<rect class="bx" x="6" y="62" width="128" height="70" rx="8"/><text class="t-m" x="16" y="84">~</text><text class="t-m" x="22" y="114">notes.txt</text>
<text class="t-m t-ok" x="160" y="82" style="font-size:16px">projects/</text>
<text class="t-m t-ok" x="184" y="110" style="font-size:16px">site/</text>
<text class="t-m t-ok" x="208" y="138" style="font-size:16px">css/</text>
</svg>`],
 ['Inside site, <b>touch</b> creates two empty files. Note <b>css/style.css</b>: a relative path into the css folder.',`<svg viewBox="0 0 420 236" role="img" aria-label="touch creates index.html and css/style.css">
<rect class="bx-dark" x="4" y="6" width="412" height="40" rx="8"/><text class="t-term" x="16" y="32" style="font-size:16px">$ touch index.html css/style.css</text>
<rect class="bx" x="6" y="62" width="128" height="70" rx="8"/><text class="t-m" x="16" y="84">~</text><text class="t-m" x="22" y="114">notes.txt</text>
<text class="t-m" x="160" y="82" style="font-size:16px">projects/</text>
<text class="t-m" x="184" y="110" style="font-size:16px">site/</text>
<text class="t-m" x="208" y="138" style="font-size:16px">css/</text>
<text class="t-m t-ok" x="232" y="166" style="font-size:16px">style.css</text>
<text class="t-m t-ok" x="208" y="194" style="font-size:16px">index.html</text>
</svg>`],
 ['<b>cp ~/notes.txt .</b> copies the notes here. The lone dot means "this folder". The original stays at home.',`<svg viewBox="0 0 420 236" role="img" aria-label="cp makes a copy of notes.txt inside site">
<rect class="bx-dark" x="4" y="6" width="412" height="40" rx="8"/><text class="t-term" x="16" y="32" style="font-size:16px">$ cp ~/notes.txt .</text>
<rect class="bx-hl" x="6" y="62" width="128" height="70" rx="8"/><text class="t-m" x="16" y="84">~</text><text class="t-m" x="22" y="114">notes.txt</text>
<text class="t-m" x="160" y="82" style="font-size:16px">projects/</text>
<text class="t-m" x="184" y="110" style="font-size:16px">site/</text>
<text class="t-m" x="208" y="138" style="font-size:16px">css/</text>
<text class="t-m" x="232" y="166" style="font-size:16px">style.css</text>
<text class="t-m" x="208" y="194" style="font-size:16px">index.html</text>
<text class="t-m t-ok" x="208" y="222" style="font-size:16px">notes.txt</text>
<path class="ln-ok" d="M70 132C80 200 130 218 192 217"/><polygon class="ah-ok" points="190,210 202,217 190,224"/>
</svg>`],
 ['<b>mv notes.txt README.md</b> renames it. Same file, new label. Check the shape any time with <b>tree</b>.',`<svg viewBox="0 0 420 236" role="img" aria-label="mv renames notes.txt to README.md">
<rect class="bx-dark" x="4" y="6" width="412" height="40" rx="8"/><text class="t-term" x="16" y="32" style="font-size:16px">$ mv notes.txt README.md</text>
<rect class="bx" x="6" y="62" width="128" height="70" rx="8"/><text class="t-m" x="16" y="84">~</text><text class="t-m" x="22" y="114">notes.txt</text>
<text class="t-m" x="160" y="82" style="font-size:16px">projects/</text>
<text class="t-m" x="184" y="110" style="font-size:16px">site/</text>
<text class="t-m" x="208" y="138" style="font-size:16px">css/</text>
<text class="t-m" x="232" y="166" style="font-size:16px">style.css</text>
<text class="t-m" x="208" y="194" style="font-size:16px">index.html</text>
<text class="t-m t-a" x="208" y="222" style="font-size:16px">README.md</text>
</svg>`]])}
${V.rules(V.rh('Rules: these bite'),
 V.no('rm notes.txt','Gone at once. No bin, no undo. Read the line twice before Enter'),V.ok('rm -r old-dir','Folders need -r (recursive) to delete them and everything inside'),
 V.ok('cp -r src backup','Copying a folder also needs -r'),V.no('mv a.txt b.txt','If b.txt already exists, it is silently replaced. Add -i to be asked first'),
 V.rh('Conventions'),
 V.ok('mkdir -p','Safe to repeat: no error if the folders already exist'),V.ok('ls before rm','Look at what you are about to delete'))}
${V.build(`<ol><li>Check where you are with <code>pwd</code> and list everything, hidden files included.</li><li>Build a nested folder path in one command with <code>-p</code>, then <code>cd</code> into the middle folder.</li><li>Create two empty files with <code>touch</code>, one of them inside the sub-folder.</li><li>Copy a file from home with <code>~</code> and <code>.</code>, then rename the copy with <code>mv</code>.</li><li>Run <code>tree</code> to check, then go home.</li></ol>`)}
${V.hook(`Make, touch, copy, move, remove. And <code>rm</code> never asks twice.`)}
`)}

<div class="try"><b>Try it in your head</b>1. You are in <code>/home/you/projects</code>. Where does <code>cd ..</code> take you? <i>/home/you.</i> 2. Is <code>projects/site</code> absolute or relative? <i>Relative: it doesn't start with /.</i> 3. Which command shows <code>.bashrc</code>: <code>ls</code> or <code>ls -a</code>? <i>ls -a.</i></div>
`);

explain('l2',`
<p>Every file on a Linux computer carries a tiny lock that says who may open it, change it or run it. Get it wrong and your script won't start, or worse, your passwords are readable by everyone. Get it right and you can read any <code>ls -l</code> line, and any number like 755, at a glance.</p>

${V.card(1,'Owner, group, others','three sets of keys',`
<figure class="fig"><svg viewBox="0 0 420 214" role="img" aria-label="deploy.sh gives three sets of keys: the owner gets r w x, the group gets r and x, everyone else gets r and x">
${V.ic('person',44,4,52,'ic-a')}${V.ic('people',184,4,52,'ic-info')}${V.ic('globe',324,4,52,'ic-ok')}
<text class="t-b" x="70" y="84" text-anchor="middle" style="font-size:16px">Owner (u)</text>
<text class="t-b" x="210" y="84" text-anchor="middle" style="font-size:16px">Group (g)</text>
<text class="t-b" x="350" y="84" text-anchor="middle" style="font-size:16px">Others (o)</text>
<rect class="bx-a" x="13" y="100" width="34" height="40" rx="6"/><text class="t-m" x="30" y="127" text-anchor="middle" style="font-size:20px;font-weight:700">r</text><rect class="bx-a" x="53" y="100" width="34" height="40" rx="6"/><text class="t-m" x="70" y="127" text-anchor="middle" style="font-size:20px;font-weight:700">w</text><rect class="bx-a" x="93" y="100" width="34" height="40" rx="6"/><text class="t-m" x="110" y="127" text-anchor="middle" style="font-size:20px;font-weight:700">x</text><rect class="bx-info" x="153" y="100" width="34" height="40" rx="6"/><text class="t-m" x="170" y="127" text-anchor="middle" style="font-size:20px;font-weight:700">r</text><rect class="ln-d" x="193" y="100" width="34" height="40" rx="6"/><text class="t-m" x="210" y="127" text-anchor="middle" style="font-size:20px">-</text><rect class="bx-info" x="233" y="100" width="34" height="40" rx="6"/><text class="t-m" x="250" y="127" text-anchor="middle" style="font-size:20px;font-weight:700">x</text><rect class="bx-ok" x="293" y="100" width="34" height="40" rx="6"/><text class="t-m" x="310" y="127" text-anchor="middle" style="font-size:20px;font-weight:700">r</text><rect class="ln-d" x="333" y="100" width="34" height="40" rx="6"/><text class="t-m" x="350" y="127" text-anchor="middle" style="font-size:20px">-</text><rect class="bx-ok" x="373" y="100" width="34" height="40" rx="6"/><text class="t-m" x="390" y="127" text-anchor="middle" style="font-size:20px;font-weight:700">x</text>
<path class="ln-d" d="M140 70V150M280 70V150"/>
<text class="t-m" x="210" y="196" text-anchor="middle" style="font-size:24px">-<tspan class="t-a">rwx</tspan><tspan class="t-info">r-x</tspan><tspan class="t-ok">r-x</tspan></text>
</svg><figcaption>Every file hands out three sets of keys. The owner is one person. The group is a named team of users. Others is everybody else. <code>r</code>, <code>w</code> and <code>x</code> are the keys; a dash means that key is missing. Read left to right, the nine letters are exactly what <code>ls -l</code> prints.</figcaption></figure>
${V.like(`<p>Think of a house. The <b>owner</b> has a full set of keys. The <b>family</b> (the group) gets some keys. A <b>stranger</b> walking past (others) gets maybe one key, or none. Every file keeps a little card that says exactly which keys each of the three gets.</p>`)}
${V.why(`<p>Unix, the system Linux grew from, was built in the 1970s for one big computer shared by dozens of people at once. Without locks, anyone could read your work or delete the system by accident. So every file got an <b>owner</b> (one user), a <b>group</b> (a named team of users) and nine on/off switches. Type <code>whoami</code> to see your user name and <code>groups</code> to see the teams you belong to.</p>`)}
${V.anat([[1,'-'],[2,'rwx'],[3,'r-x'],[4,'r-x'],' 1 ',[5,'you you'],'  48 Oct  9 10:30 ',[6,'deploy.sh']],[
 '<b>Type.</b> <code>-</code> is a normal file, <code>d</code> is a directory (folder).',
 '<b>Owner keys.</b> What the owner may do: here read, write and execute.',
 '<b>Group keys.</b> What members of the file\'s group may do: read and execute, no write.',
 '<b>Others keys.</b> What everybody else may do.',
 '<b>Owner, then group.</b> The file belongs to the user <code>you</code> and the group <code>you</code>. Many Linux systems give each user a private group with the same name.',
 '<b>File name.</b> The 1, the size (48 bytes) and the date are not about permissions.'])}
<p><b>How Linux decides.</b> Every time someone opens, saves or runs a file, Linux walks through three gates in a fixed order. Watch it.</p>
${V.steps([
 ['Meet <b>report.txt</b>. Owner <b>ada</b> may read and write. Members of the group <b>devs</b> may only read. Everyone else gets nothing. Now three people knock.',`<svg viewBox="0 0 420 242" role="img" aria-label="report.txt: owner ada rw-, group devs r--, others none"><text class="t-m" x="210" y="26" text-anchor="middle" style="font-size:18px">-<tspan class="t-a">rw-</tspan><tspan class="t-info">r--</tspan><tspan class="t-ok">---</tspan> ada devs report.txt</text><rect class="bx" x="6" y="42" width="130" height="72" rx="8"/><text class="t-b" x="16" y="66" style="font-size:14px">1 Owner: ada</text><text class="t-m t-a" x="71" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">rw-</text><rect class="bx" x="145" y="42" width="130" height="72" rx="8"/><text class="t-b" x="155" y="66" style="font-size:14px">2 Group: devs</text><text class="t-m t-info" x="210" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">r--</text><rect class="bx" x="284" y="42" width="130" height="72" rx="8"/><text class="t-b" x="294" y="66" style="font-size:14px">3 Others</text><text class="t-m t-ok" x="349" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">---</text><text class="t" x="10" y="152" style="font-size:16px">Checked in order: gate 1, then 2, then 3.</text></svg>`],
 ['<b>ada</b> wants to write. Gate 1: is she the owner? Yes. So Linux uses the owner keys, <b>rw-</b>. The w key is there: allowed.',`<svg viewBox="0 0 420 242" role="img" aria-label="ada is the owner, owner keys include w, allowed"><text class="t-m" x="210" y="26" text-anchor="middle" style="font-size:18px">-<tspan class="t-a">rw-</tspan><tspan class="t-info">r--</tspan><tspan class="t-ok">---</tspan> ada devs report.txt</text><rect class="bx-hl" x="6" y="42" width="130" height="72" rx="8"/><text class="t-b" x="16" y="66" style="font-size:14px">1 Owner: ada</text><text class="t-m t-a" x="71" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">rw-</text><text class="t-b t-ok" x="128" y="100" text-anchor="end" style="font-size:16px">yes</text><rect class="bx" x="145" y="42" width="130" height="72" rx="8"/><text class="t-b t-dim" x="155" y="66" style="font-size:14px">2 Group: devs</text><text class="t-m t-info t-dim" x="210" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">r--</text><rect class="bx" x="284" y="42" width="130" height="72" rx="8"/><text class="t-b t-dim" x="294" y="66" style="font-size:14px">3 Others</text><text class="t-m t-ok t-dim" x="349" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">---</text>${V.ic('person',8,124,44,'ic-a')}<text class="t-b" x="62" y="152" style="font-size:17px">ada <tspan class="t-a">wants to WRITE</tspan></text><text class="t" x="10" y="190" style="font-size:15px">Is ada the owner? Yes. Use rw-. Is w there? Yes.</text><rect class="bx-ok" x="6" y="202" width="408" height="34" rx="8"/><text class="t-b" x="210" y="225" text-anchor="middle" style="font-size:16px">Allowed</text></svg>`],
 ['<b>bob</b> is in the devs group and wants to read. Gate 1: owner? No. Gate 2: in devs? Yes, so the group keys <b>r--</b> apply. r is there: allowed.',`<svg viewBox="0 0 420 242" role="img" aria-label="bob is in devs, group keys include r, allowed"><text class="t-m" x="210" y="26" text-anchor="middle" style="font-size:18px">-<tspan class="t-a">rw-</tspan><tspan class="t-info">r--</tspan><tspan class="t-ok">---</tspan> ada devs report.txt</text><rect class="bx" x="6" y="42" width="130" height="72" rx="8"/><text class="t-b t-dim" x="16" y="66" style="font-size:14px">1 Owner: ada</text><text class="t-m t-a t-dim" x="71" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">rw-</text><text class="t-b t-bad" x="128" y="100" text-anchor="end" style="font-size:16px">no</text><rect class="bx-hl" x="145" y="42" width="130" height="72" rx="8"/><text class="t-b" x="155" y="66" style="font-size:14px">2 Group: devs</text><text class="t-m t-info" x="210" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">r--</text><text class="t-b t-ok" x="267" y="100" text-anchor="end" style="font-size:16px">yes</text><rect class="bx" x="284" y="42" width="130" height="72" rx="8"/><text class="t-b t-dim" x="294" y="66" style="font-size:14px">3 Others</text><text class="t-m t-ok t-dim" x="349" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">---</text>${V.ic('people',8,124,44,'ic-a')}<text class="t-b" x="62" y="152" style="font-size:17px">bob <tspan class="t-a">wants to READ</tspan></text><text class="t" x="10" y="190" style="font-size:15px">Owner? No. In devs? Yes. Use r--. Is r there? Yes.</text><rect class="bx-ok" x="6" y="202" width="408" height="34" rx="8"/><text class="t-b" x="210" y="225" text-anchor="middle" style="font-size:16px">Allowed</text></svg>`],
 ['Now <b>bob</b> wants to write. He still matches gate 2, and r-- has no w. Denied. Linux stops at the <b>first</b> gate that matches; it never moves on to try another.',`<svg viewBox="0 0 420 242" role="img" aria-label="bob matches the group, r-- has no w, permission denied"><text class="t-m" x="210" y="26" text-anchor="middle" style="font-size:18px">-<tspan class="t-a">rw-</tspan><tspan class="t-info">r--</tspan><tspan class="t-ok">---</tspan> ada devs report.txt</text><rect class="bx" x="6" y="42" width="130" height="72" rx="8"/><text class="t-b t-dim" x="16" y="66" style="font-size:14px">1 Owner: ada</text><text class="t-m t-a t-dim" x="71" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">rw-</text><text class="t-b t-bad" x="128" y="100" text-anchor="end" style="font-size:16px">no</text><rect class="bx-hl" x="145" y="42" width="130" height="72" rx="8"/><text class="t-b" x="155" y="66" style="font-size:14px">2 Group: devs</text><text class="t-m t-info" x="210" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">r--</text><text class="t-b t-ok" x="267" y="100" text-anchor="end" style="font-size:16px">yes</text><rect class="bx" x="284" y="42" width="130" height="72" rx="8"/><text class="t-b t-dim" x="294" y="66" style="font-size:14px">3 Others</text><text class="t-m t-ok t-dim" x="349" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">---</text>${V.ic('people',8,124,44,'ic-a')}<text class="t-b" x="62" y="152" style="font-size:17px">bob <tspan class="t-a">wants to WRITE</tspan></text><text class="t" x="10" y="190" style="font-size:15px">Owner? No. In devs? Yes. Use r--. Is w there? No.</text><rect class="bx-bad" x="6" y="202" width="408" height="34" rx="8"/><text class="t-b" x="210" y="225" text-anchor="middle" style="font-size:16px">Permission denied</text></svg>`],
 ['<b>carol</b> is not the owner and not in devs, so she falls through to gate 3, where there are no keys at all. (Only root, coming up in card 4, can walk past every gate.)',`<svg viewBox="0 0 420 242" role="img" aria-label="carol is neither owner nor group, others has no keys, permission denied"><text class="t-m" x="210" y="26" text-anchor="middle" style="font-size:18px">-<tspan class="t-a">rw-</tspan><tspan class="t-info">r--</tspan><tspan class="t-ok">---</tspan> ada devs report.txt</text><rect class="bx" x="6" y="42" width="130" height="72" rx="8"/><text class="t-b t-dim" x="16" y="66" style="font-size:14px">1 Owner: ada</text><text class="t-m t-a t-dim" x="71" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">rw-</text><text class="t-b t-bad" x="128" y="100" text-anchor="end" style="font-size:16px">no</text><rect class="bx" x="145" y="42" width="130" height="72" rx="8"/><text class="t-b t-dim" x="155" y="66" style="font-size:14px">2 Group: devs</text><text class="t-m t-info t-dim" x="210" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">r--</text><text class="t-b t-bad" x="267" y="100" text-anchor="end" style="font-size:16px">no</text><rect class="bx-hl" x="284" y="42" width="130" height="72" rx="8"/><text class="t-b" x="294" y="66" style="font-size:14px">3 Others</text><text class="t-m t-ok" x="349" y="100" text-anchor="middle" style="font-size:22px;font-weight:700">---</text><text class="t-b t-ok" x="406" y="100" text-anchor="end" style="font-size:16px">yes</text>${V.ic('globe',8,124,44,'ic-a')}<text class="t-b" x="62" y="152" style="font-size:17px">carol <tspan class="t-a">wants to READ</tspan></text><text class="t" x="10" y="190" style="font-size:15px">Owner? No. In devs? No. Use ---. Is r there? No.</text><rect class="bx-bad" x="6" y="202" width="408" height="34" rx="8"/><text class="t-b" x="210" y="225" text-anchor="middle" style="font-size:16px">Permission denied</text></svg>`]])}
${V.rules(V.rh('Rules: how the check really works'),
 V.ok('owner, then group, then others','Checked in that order. The first gate you match is the only one used'),
 V.no('"others has r, so I can read"','Not if you are the owner and the owner set has no r. You never fall through'),
 V.ok('Permission denied','Means your matching set lacks the key you needed'))}
${V.hook(`Three sets of keys: <b>u</b>ser (the owner), <b>g</b>roup, <b>o</b>thers. Linux tries them in that order and stops at the first one that fits.`)}
`)}

${V.card(2,'r, w, x and the numbers','three switches worth 4, 2 and 1',`
<figure class="fig"><svg viewBox="0 0 420 206" role="img" aria-label="Three light switches worth 4, 2 and 1. Read and execute are on, write is off, so the digit is 5"><rect class="bx-ok" x="14" y="46" width="90" height="96" rx="12"/><rect class="bx-dark" x="44" y="58" width="30" height="32" rx="6"/><text class="t-m" x="59" y="30" text-anchor="middle" style="font-size:24px;font-weight:700">r</text><text class="t-b t-ok" x="59" y="168" text-anchor="middle" style="font-size:18px">ON = 4</text><text class="t" x="59" y="194" text-anchor="middle">read: 4</text><rect class="bx" x="122" y="46" width="90" height="96" rx="12"/><rect class="bx-dark" x="152" y="98" width="30" height="32" rx="6"/><text class="t-m" x="167" y="30" text-anchor="middle" style="font-size:24px;font-weight:700">w</text><text class="t-b" x="167" y="168" text-anchor="middle" style="font-size:18px">off = 0</text><text class="t" x="167" y="194" text-anchor="middle">write: 2</text><rect class="bx-ok" x="230" y="46" width="90" height="96" rx="12"/><rect class="bx-dark" x="260" y="58" width="30" height="32" rx="6"/><text class="t-m" x="275" y="30" text-anchor="middle" style="font-size:24px;font-weight:700">x</text><text class="t-b t-ok" x="275" y="168" text-anchor="middle" style="font-size:18px">ON = 1</text><text class="t" x="275" y="194" text-anchor="middle">execute: 1</text><text class="t-m" x="378" y="96" text-anchor="middle" style="font-size:18px">4+0+1</text><text class="t-m t-a" x="378" y="140" text-anchor="middle" style="font-size:40px;font-weight:700">5</text><text class="t" x="378" y="168" text-anchor="middle">r-x</text></svg><figcaption>One set of keys is a panel of three switches worth 4, 2 and 1. Add up the switches that are on and you get one digit. Here read and execute are on: 4 + 1 = 5, written <code>r-x</code>.</figcaption></figure>
${V.like(`<p>Each set of keys is a little panel of three light switches. The <b>read</b> switch is worth 4, <b>write</b> is worth 2, <b>execute</b> is worth 1. Add up the switches that are on and you get one digit from 0 to 7. Three panels (owner, group, others) give three digits, like 755.</p>`)}
${V.why(`<p>The computer stores each switch as one bit, a 1 or a 0. Three bits can count from 0 to 7, so each set fits in one digit, and the whole lock fits in three digits. That is far quicker to type than nine letters, which is why every tutorial and server guide uses numbers.</p>`)}
<div class="tbl-wrap"><table><tr><th>Key</th><th>On a file</th><th>On a folder</th></tr>
<tr><td><code>r</code> = 4</td><td>Open it and see what is inside</td><td>List the names in it (<code>ls</code>)</td></tr>
<tr><td><code>w</code> = 2</td><td>Change or empty it</td><td>Create, rename or delete files in it</td></tr>
<tr><td><code>x</code> = 1</td><td>Run it as a program</td><td>Go into it (<code>cd</code>)</td></tr></table></div>
<figure class="fig"><svg viewBox="0 0 420 148" role="img" aria-label="All eight digits: 0 none, 1 x, 2 w, 3 wx, 4 r, 5 rx, 6 rw, 7 rwx"><rect class="bx-bad" x="8" y="8" width="96" height="62" rx="8"/><text class="t-m" x="34" y="48" text-anchor="middle" style="font-size:26px;font-weight:700">0</text><text class="t-m" x="74" y="47" text-anchor="middle" style="font-size:18px">---</text><rect class="bx" x="110" y="8" width="96" height="62" rx="8"/><text class="t-m" x="136" y="48" text-anchor="middle" style="font-size:26px;font-weight:700">1</text><text class="t-m" x="176" y="47" text-anchor="middle" style="font-size:18px">--x</text><rect class="bx" x="212" y="8" width="96" height="62" rx="8"/><text class="t-m" x="238" y="48" text-anchor="middle" style="font-size:26px;font-weight:700">2</text><text class="t-m" x="278" y="47" text-anchor="middle" style="font-size:18px">-w-</text><rect class="bx" x="314" y="8" width="96" height="62" rx="8"/><text class="t-m" x="340" y="48" text-anchor="middle" style="font-size:26px;font-weight:700">3</text><text class="t-m" x="380" y="47" text-anchor="middle" style="font-size:18px">-wx</text><rect class="bx-ok" x="8" y="78" width="96" height="62" rx="8"/><text class="t-m" x="34" y="118" text-anchor="middle" style="font-size:26px;font-weight:700">4</text><text class="t-m" x="74" y="117" text-anchor="middle" style="font-size:18px">r--</text><rect class="bx-ok" x="110" y="78" width="96" height="62" rx="8"/><text class="t-m" x="136" y="118" text-anchor="middle" style="font-size:26px;font-weight:700">5</text><text class="t-m" x="176" y="117" text-anchor="middle" style="font-size:18px">r-x</text><rect class="bx-ok" x="212" y="78" width="96" height="62" rx="8"/><text class="t-m" x="238" y="118" text-anchor="middle" style="font-size:26px;font-weight:700">6</text><text class="t-m" x="278" y="117" text-anchor="middle" style="font-size:18px">rw-</text><rect class="bx-ok" x="314" y="78" width="96" height="62" rx="8"/><text class="t-m" x="340" y="118" text-anchor="middle" style="font-size:26px;font-weight:700">7</text><text class="t-m" x="380" y="117" text-anchor="middle" style="font-size:18px">rwx</text></svg><figcaption>Every possible digit. Only eight exist, because three switches can only make the totals 0 to 7. The green ones are the ones you will meet most: 7, 6, 5, 4 and 0.</figcaption></figure>
${V.anat([[1,'chmod'],' ',[2,'7'],[3,'5'],[4,'5'],' ',[5,'deploy.sh']],[
 '<b>chmod.</b> "Change mode": rewrite the lock on a file.',
 '<b>Owner digit.</b> 7 = 4 + 2 + 1, so rwx.',
 '<b>Group digit.</b> 5 = 4 + 1, so r-x.',
 '<b>Others digit.</b> 5 again, r-x. The order of the digits never changes: owner, group, others.',
 '<b>File.</b> The file whose lock you are changing.'])}
<p><b>Watch 755 being decoded.</b> Each digit is unpacked into its three switches.</p>
${V.steps([
 ['Three digits, three sets of keys, always in the same order: <b>owner, group, others</b>. First digit: <b>7</b>. Which switches add up to 7? All three: 4 + 2 + 1. So the owner gets <b>rwx</b>.',`<svg viewBox="0 0 420 228" role="img" aria-label="7 is 4 plus 2 plus 1, rwx for the owner"><rect class="bx-hl" x="36" y="8" width="68" height="54" rx="8"/><text class="t-m" x="70" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">7</text><rect class="bx-ok" x="8" y="74" width="38" height="36" rx="6"/><text class="t-m" x="27" y="98" text-anchor="middle" style="font-size:18px">4</text><text class="t-m t-ok" x="27" y="132" text-anchor="middle" style="font-size:17px">r</text><rect class="bx-ok" x="52" y="74" width="38" height="36" rx="6"/><text class="t-m" x="71" y="98" text-anchor="middle" style="font-size:18px">2</text><text class="t-m t-ok" x="71" y="132" text-anchor="middle" style="font-size:17px">w</text><rect class="bx-ok" x="96" y="74" width="38" height="36" rx="6"/><text class="t-m" x="115" y="98" text-anchor="middle" style="font-size:18px">1</text><text class="t-m t-ok" x="115" y="132" text-anchor="middle" style="font-size:17px">x</text><text class="t-m" x="70" y="160" text-anchor="middle" style="font-size:16px">4+2+1 = 7</text><text class="t-m t-a" x="70" y="192" text-anchor="middle" style="font-size:24px;font-weight:700">rwx</text><text class="t-b" x="70" y="218" text-anchor="middle" style="font-size:16px">owner</text><text class="t-m t-dim" x="210" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">5</text><rect class="bx" x="148" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="167" y="98" text-anchor="middle" style="font-size:18px">4</text><text class="t-m t-dim" x="167" y="132" text-anchor="middle" style="font-size:17px">r</text><rect class="bx" x="192" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="211" y="98" text-anchor="middle" style="font-size:18px">2</text><text class="t-m t-dim" x="211" y="132" text-anchor="middle" style="font-size:17px">w</text><rect class="bx" x="236" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="255" y="98" text-anchor="middle" style="font-size:18px">1</text><text class="t-m t-dim" x="255" y="132" text-anchor="middle" style="font-size:17px">x</text><text class="t-b t-dim" x="210" y="218" text-anchor="middle" style="font-size:16px">group</text><text class="t-m t-dim" x="350" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">5</text><rect class="bx" x="288" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="307" y="98" text-anchor="middle" style="font-size:18px">4</text><text class="t-m t-dim" x="307" y="132" text-anchor="middle" style="font-size:17px">r</text><rect class="bx" x="332" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="351" y="98" text-anchor="middle" style="font-size:18px">2</text><text class="t-m t-dim" x="351" y="132" text-anchor="middle" style="font-size:17px">w</text><rect class="bx" x="376" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="395" y="98" text-anchor="middle" style="font-size:18px">1</text><text class="t-m t-dim" x="395" y="132" text-anchor="middle" style="font-size:17px">x</text><text class="t-b t-dim" x="350" y="218" text-anchor="middle" style="font-size:16px">others</text></svg>`],
 ['Second digit: <b>5</b>. 4 + 1 = 5, so read and execute are on and write is off. The group gets <b>r-x</b>.',`<svg viewBox="0 0 420 228" role="img" aria-label="5 is 4 plus 1, r-x for the group"><text class="t-m" x="70" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">7</text><rect class="bx-ok" x="8" y="74" width="38" height="36" rx="6"/><text class="t-m" x="27" y="98" text-anchor="middle" style="font-size:18px">4</text><text class="t-m t-ok" x="27" y="132" text-anchor="middle" style="font-size:17px">r</text><rect class="bx-ok" x="52" y="74" width="38" height="36" rx="6"/><text class="t-m" x="71" y="98" text-anchor="middle" style="font-size:18px">2</text><text class="t-m t-ok" x="71" y="132" text-anchor="middle" style="font-size:17px">w</text><rect class="bx-ok" x="96" y="74" width="38" height="36" rx="6"/><text class="t-m" x="115" y="98" text-anchor="middle" style="font-size:18px">1</text><text class="t-m t-ok" x="115" y="132" text-anchor="middle" style="font-size:17px">x</text><text class="t-m" x="70" y="160" text-anchor="middle" style="font-size:16px">4+2+1 = 7</text><text class="t-m t-a" x="70" y="192" text-anchor="middle" style="font-size:24px;font-weight:700">rwx</text><text class="t-b" x="70" y="218" text-anchor="middle" style="font-size:16px">owner</text><rect class="bx-hl" x="176" y="8" width="68" height="54" rx="8"/><text class="t-m" x="210" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">5</text><rect class="bx-ok" x="148" y="74" width="38" height="36" rx="6"/><text class="t-m" x="167" y="98" text-anchor="middle" style="font-size:18px">4</text><text class="t-m t-ok" x="167" y="132" text-anchor="middle" style="font-size:17px">r</text><rect class="bx" x="192" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="211" y="98" text-anchor="middle" style="font-size:18px">2</text><text class="t-m t-dim" x="211" y="132" text-anchor="middle" style="font-size:17px">w</text><rect class="bx-ok" x="236" y="74" width="38" height="36" rx="6"/><text class="t-m" x="255" y="98" text-anchor="middle" style="font-size:18px">1</text><text class="t-m t-ok" x="255" y="132" text-anchor="middle" style="font-size:17px">x</text><text class="t-m" x="210" y="160" text-anchor="middle" style="font-size:16px">4+0+1 = 5</text><text class="t-m t-a" x="210" y="192" text-anchor="middle" style="font-size:24px;font-weight:700">r-x</text><text class="t-b" x="210" y="218" text-anchor="middle" style="font-size:16px">group</text><text class="t-m t-dim" x="350" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">5</text><rect class="bx" x="288" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="307" y="98" text-anchor="middle" style="font-size:18px">4</text><text class="t-m t-dim" x="307" y="132" text-anchor="middle" style="font-size:17px">r</text><rect class="bx" x="332" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="351" y="98" text-anchor="middle" style="font-size:18px">2</text><text class="t-m t-dim" x="351" y="132" text-anchor="middle" style="font-size:17px">w</text><rect class="bx" x="376" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="395" y="98" text-anchor="middle" style="font-size:18px">1</text><text class="t-m t-dim" x="395" y="132" text-anchor="middle" style="font-size:17px">x</text><text class="t-b t-dim" x="350" y="218" text-anchor="middle" style="font-size:16px">others</text></svg>`],
 ['Third digit: <b>5</b> again, so others also get <b>r-x</b>.',`<svg viewBox="0 0 420 228" role="img" aria-label="5 is 4 plus 1, r-x for others"><text class="t-m" x="70" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">7</text><rect class="bx-ok" x="8" y="74" width="38" height="36" rx="6"/><text class="t-m" x="27" y="98" text-anchor="middle" style="font-size:18px">4</text><text class="t-m t-ok" x="27" y="132" text-anchor="middle" style="font-size:17px">r</text><rect class="bx-ok" x="52" y="74" width="38" height="36" rx="6"/><text class="t-m" x="71" y="98" text-anchor="middle" style="font-size:18px">2</text><text class="t-m t-ok" x="71" y="132" text-anchor="middle" style="font-size:17px">w</text><rect class="bx-ok" x="96" y="74" width="38" height="36" rx="6"/><text class="t-m" x="115" y="98" text-anchor="middle" style="font-size:18px">1</text><text class="t-m t-ok" x="115" y="132" text-anchor="middle" style="font-size:17px">x</text><text class="t-m" x="70" y="160" text-anchor="middle" style="font-size:16px">4+2+1 = 7</text><text class="t-m t-a" x="70" y="192" text-anchor="middle" style="font-size:24px;font-weight:700">rwx</text><text class="t-b" x="70" y="218" text-anchor="middle" style="font-size:16px">owner</text><text class="t-m" x="210" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">5</text><rect class="bx-ok" x="148" y="74" width="38" height="36" rx="6"/><text class="t-m" x="167" y="98" text-anchor="middle" style="font-size:18px">4</text><text class="t-m t-ok" x="167" y="132" text-anchor="middle" style="font-size:17px">r</text><rect class="bx" x="192" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="211" y="98" text-anchor="middle" style="font-size:18px">2</text><text class="t-m t-dim" x="211" y="132" text-anchor="middle" style="font-size:17px">w</text><rect class="bx-ok" x="236" y="74" width="38" height="36" rx="6"/><text class="t-m" x="255" y="98" text-anchor="middle" style="font-size:18px">1</text><text class="t-m t-ok" x="255" y="132" text-anchor="middle" style="font-size:17px">x</text><text class="t-m" x="210" y="160" text-anchor="middle" style="font-size:16px">4+0+1 = 5</text><text class="t-m t-a" x="210" y="192" text-anchor="middle" style="font-size:24px;font-weight:700">r-x</text><text class="t-b" x="210" y="218" text-anchor="middle" style="font-size:16px">group</text><rect class="bx-hl" x="316" y="8" width="68" height="54" rx="8"/><text class="t-m" x="350" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">5</text><rect class="bx-ok" x="288" y="74" width="38" height="36" rx="6"/><text class="t-m" x="307" y="98" text-anchor="middle" style="font-size:18px">4</text><text class="t-m t-ok" x="307" y="132" text-anchor="middle" style="font-size:17px">r</text><rect class="bx" x="332" y="74" width="38" height="36" rx="6"/><text class="t-m t-dim" x="351" y="98" text-anchor="middle" style="font-size:18px">2</text><text class="t-m t-dim" x="351" y="132" text-anchor="middle" style="font-size:17px">w</text><rect class="bx-ok" x="376" y="74" width="38" height="36" rx="6"/><text class="t-m" x="395" y="98" text-anchor="middle" style="font-size:18px">1</text><text class="t-m t-ok" x="395" y="132" text-anchor="middle" style="font-size:17px">x</text><text class="t-m" x="350" y="160" text-anchor="middle" style="font-size:16px">4+0+1 = 5</text><text class="t-m t-a" x="350" y="192" text-anchor="middle" style="font-size:24px;font-weight:700">r-x</text><text class="t-b" x="350" y="218" text-anchor="middle" style="font-size:16px">others</text></svg>`],
 ['Put the three together and <b>755</b> is <b>rwxr-xr-x</b>: the classic setting for scripts and folders.',`<svg viewBox="0 0 420 228" role="img" aria-label="755 becomes rwxr-xr-x"><text class="t-m" x="70" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">7</text><text class="t-m t-a" x="70" y="96" text-anchor="middle" style="font-size:24px;font-weight:700">rwx</text><text class="t-b" x="70" y="124" text-anchor="middle" style="font-size:16px">owner</text><text class="t-m" x="210" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">5</text><text class="t-m t-a" x="210" y="96" text-anchor="middle" style="font-size:24px;font-weight:700">r-x</text><text class="t-b" x="210" y="124" text-anchor="middle" style="font-size:16px">group</text><text class="t-m" x="350" y="50" text-anchor="middle" style="font-size:38px;font-weight:700">5</text><text class="t-m t-a" x="350" y="96" text-anchor="middle" style="font-size:24px;font-weight:700">r-x</text><text class="t-b" x="350" y="124" text-anchor="middle" style="font-size:16px">others</text><rect class="bx-ok" x="6" y="142" width="408" height="78" rx="10"/><text class="t-m" x="210" y="176" text-anchor="middle" style="font-size:26px;font-weight:700">-rwxr-xr-x</text><text class="t" x="210" y="206" text-anchor="middle" style="font-size:16px">You change and run it. Everyone else reads and runs.</text></svg>`]])}
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="755 for scripts and folders, 644 for normal files, 600 for secrets"><rect class="bx-ok" x="6" y="6" width="408" height="58" rx="8"/><text class="t-m" x="22" y="44" style="font-size:26px;font-weight:700">755</text><text class="t-m t-a" x="96" y="43" style="font-size:19px">rwxr-xr-x</text><text class="t-b" x="226" y="31" style="font-size:15px">Scripts and folders</text><text class="t" x="226" y="53" style="font-size:14px">all can read and run it</text><rect class="bx-info" x="6" y="72" width="408" height="58" rx="8"/><text class="t-m" x="22" y="110" style="font-size:26px;font-weight:700">644</text><text class="t-m t-a" x="96" y="109" style="font-size:19px">rw-r--r--</text><text class="t-b" x="226" y="97" style="font-size:15px">Normal files</text><text class="t" x="226" y="119" style="font-size:14px">all read, only you write</text><rect class="bx-warn" x="6" y="138" width="408" height="58" rx="8"/><text class="t-m" x="22" y="176" style="font-size:26px;font-weight:700">600</text><text class="t-m t-a" x="96" y="175" style="font-size:19px">rw-------</text><text class="t-b" x="226" y="163" style="font-size:15px">Secrets, SSH keys</text><text class="t" x="226" y="185" style="font-size:14px">only you, nobody else</text></svg><figcaption>The three numbers you will type for years. Read each one digit by digit: 6 is 4 + 2 (read and write), 4 is read only, 0 is nothing.</figcaption></figure>
${V.rules(V.rh('Rules: get these wrong and things break or leak'),
 V.no('chmod 777 file','Everyone on the machine can change it. Never the fix for "Permission denied"'),
 V.ok('chmod 600 ~/.ssh/id_ed25519','SSH refuses private keys that anyone else can read'),
 V.no('chmod 644 folder/','Without x nobody can cd into the folder. Folders want 755'),
 V.ok('chmod 755 deploy.sh','Scripts need x to run'),
 V.rh('Conventions: the professional defaults'),
 V.ok('644','Ordinary files: web pages, code, images'),V.ok('755','Scripts and folders'),V.ok('600','Secrets: .env files, keys, passwords'))}
${V.build(`<ol><li>Say who needs what in words: "I read and write; nobody else gets anything."</li><li>Owner: read + write = 4 + 2 = <b>6</b>.</li><li>Group: nothing = <b>0</b>. Others: nothing = <b>0</b>.</li><li>Write the digits in order: <code>chmod 600 file</code>.</li><li>Check with <code>ls -l</code>: you should see <code>-rw-------</code>.</li></ol>`)}
${V.hook(`Read 4, write 2, run 1. Add them up per person, in the order owner, group, others. 7 is everything, 0 is nothing.`)}
`)}

${V.card(3,'chmod in action','fixing "Permission denied"',`
${V.anat([[1,'chmod'],' ',[2,'u'],[3,'+'],[4,'x'],' ',[5,'deploy.sh']],[
 '<b>chmod.</b> The same command, used with letters instead of digits.',
 '<b>Who.</b> <code>u</code> owner (user), <code>g</code> group, <code>o</code> others, <code>a</code> all. Leave it out and it means all (minus anything your system blocks by default).',
 '<b>How.</b> <code>+</code> switches on, <code>-</code> switches off, <code>=</code> sets exactly.',
 '<b>Which key.</b> <code>r</code>, <code>w</code> or <code>x</code>, or several: <code>g+rw</code>.',
 '<b>File.</b>'])}
${V.like(`<p>Digits are like replacing the whole lock; letters are like adding or removing one key. <code>chmod 600</code> rebuilds all nine switches. <code>chmod +x</code> flips one switch and leaves the rest alone.</p>`)}
${V.steps([
 ['You try to run the script. Bash refuses. <b>ls -l</b> shows why: there is no <b>x</b> anywhere, not even for you.',`<svg viewBox="0 0 420 176" role="img" aria-label="Permission denied, no x anywhere"><rect class="bx-dark" x="4" y="6" width="412" height="164" rx="8"/><text class="t-term" x="16" y="36" style="font-size:15px">$ ./deploy.sh</text><text class="t-term t-bad" x="16" y="66" style="font-size:15px">bash: ./deploy.sh: Permission denied</text><text class="t-term" x="16" y="96" style="font-size:15px">$ ls -l deploy.sh</text><text class="t-term" x="16" y="126" style="font-size:15px">-<tspan class="t-a">rw-</tspan><tspan class="t-info">r--</tspan><tspan class="t-ok">r--</tspan> you you 48 deploy.sh</text></svg>`],
 ['<b>chmod +x</b> flips the x switch on. With no letter in front, it is added for all three sets, so 644 becomes 755.',`<svg viewBox="0 0 420 176" role="img" aria-label="chmod +x adds x for all three sets"><rect class="bx-dark" x="4" y="6" width="412" height="164" rx="8"/><text class="t-term" x="16" y="36" style="font-size:15px">$ chmod +x deploy.sh</text><text class="t-term" x="16" y="66" style="font-size:15px">$ ls -l deploy.sh</text><text class="t-term" x="16" y="96" style="font-size:15px">-<tspan class="t-a">rwx</tspan><tspan class="t-info">r-x</tspan><tspan class="t-ok">r-x</tspan> you you 48 deploy.sh</text></svg>`],
 ['Run it again. This time Linux finds the x key in your set and lets the script start.',`<svg viewBox="0 0 420 176" role="img" aria-label="The script runs"><rect class="bx-dark" x="4" y="6" width="412" height="164" rx="8"/><text class="t-term" x="16" y="36" style="font-size:15px">$ ./deploy.sh</text><text class="t-term t-ok" x="16" y="66" style="font-size:15px">Deploying the app...</text><text class="t-term t-ok" x="16" y="96" style="font-size:15px">Done!</text></svg>`],
 ['Now the secrets file. <b>chmod 600</b> sets all nine switches at once: 6 (rw-) for you, 0 for the group, 0 for others.',`<svg viewBox="0 0 420 176" role="img" aria-label="chmod 600 locks secrets.env to the owner"><rect class="bx-dark" x="4" y="6" width="412" height="164" rx="8"/><text class="t-term" x="16" y="36" style="font-size:15px">$ chmod 600 secrets.env</text><text class="t-term" x="16" y="66" style="font-size:15px">$ ls -l secrets.env</text><text class="t-term" x="16" y="96" style="font-size:15px">-<tspan class="t-a">rw-</tspan><tspan class="t-info">---</tspan><tspan class="t-ok">---</tspan> you you 23 secrets.env</text></svg>`]])}
${V.rules(V.ok('./deploy.sh','Run a script in this folder with ./ in front'),V.no('deploy.sh','Without ./ the shell only looks in the standard program folders'),
 V.ok('chmod +x then ./run','The x key is needed before a script will start'),V.no('sudo ./deploy.sh','sudo does not fix a missing x. It just runs things as root'))}
${V.hook(`Digits replace the whole lock. Letters add or remove one key.`)}
`)}

${V.card(4,'root and sudo','borrowing the master key',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="You hold your own keys. sudo lends you root's master key for one command, then takes it back">
${V.ic('person',22,20,60,'ic-a')}<text class="t-b" x="52" y="104" text-anchor="middle" style="font-size:16px">you</text><text class="t" x="52" y="126" text-anchor="middle">your own keys</text>
<rect class="bx-warn" x="132" y="34" width="156" height="58" rx="10"/><text class="t-m" x="210" y="70" text-anchor="middle" style="font-size:22px;font-weight:700">sudo</text>
<path class="ln-a" d="M90 62H124"/><polygon class="ah-a" points="122,55 122,69 132,62"/>
<path class="ln-a" d="M288 62H322"/><polygon class="ah-a" points="320,55 320,69 330,62"/>
${V.ic('key',336,14,64,'ic-warn')}<text class="t-b" x="368" y="104" text-anchor="middle" style="font-size:16px">root</text><text class="t" x="368" y="126" text-anchor="middle">master key</text>
<text class="t" x="210" y="160" text-anchor="middle" style="font-size:15px">one command, your password, written in the log</text>
</svg><figcaption>root is the all-powerful admin account, and the permission gates do not stop it. sudo ("superuser do") lends you root's power for a single command, after you prove it is really you.</figcaption></figure>
${V.like(`<p>A hotel. Guests have a card for their own room. The manager has a master key for every door. <code>sudo</code> is asking the manager to open one door for you: you show your ID (your password), they open it, and a note goes in the log.</p>`)}
${V.why(`<p>Logging in as root all day is dangerous: one typo can wipe the system, and any program you run has total power. sudo lets you stay an ordinary user and borrow root's power only for the one command that needs it. This idea is called <b>least privilege</b>: hold only the keys the job needs.</p>`)}
${V.anat([[1,'sudo'],' ',[2,'apt update']],['<b>sudo.</b> "Run the next command as root." Asks for your own password, then remembers it for a few minutes.','<b>The command.</b> Anything that changes the system: installing software, editing files in <code>/etc</code>, restarting services.'])}
${V.steps([
 ['<b>whoami</b> prints who Linux thinks you are. Right now: an ordinary user.',`<svg viewBox="0 0 420 150" role="img" aria-label="whoami prints you"><rect class="bx-dark" x="4" y="6" width="412" height="138" rx="8"/><text class="t-term" x="16" y="36" style="font-size:15px">$ whoami</text><text class="t-term t-a" x="16" y="66" style="font-size:15px">you</text></svg>`],
 ['Updating the list of software packages writes into system folders that belong to root. As plain you, apt is refused.',`<svg viewBox="0 0 420 150" role="img" aria-label="apt update fails with permission denied"><rect class="bx-dark" x="4" y="6" width="412" height="138" rx="8"/><text class="t-term" x="16" y="36" style="font-size:15px">$ apt update</text><text class="t-term t-bad" x="16" y="66" style="font-size:15px">E: Could not open lock file</text><text class="t-term t-bad" x="16" y="96" style="font-size:15px">   /var/lib/apt/lists/lock</text><text class="t-term t-bad" x="16" y="126" style="font-size:15px">   (13: Permission denied)</text></svg>`],
 ['Put <b>sudo</b> in front. It asks for <b>your</b> password (not root\'s), then runs just that one command as root.',`<svg viewBox="0 0 420 150" role="img" aria-label="sudo apt update asks for your password and works"><rect class="bx-dark" x="4" y="6" width="412" height="138" rx="8"/><text class="t-term" x="16" y="36" style="font-size:15px">$ sudo apt update</text><text class="t-term t-warn" x="16" y="66" style="font-size:15px">[sudo] password for you:</text><text class="t-term t-ok" x="16" y="96" style="font-size:15px">Reading package lists... Done</text></svg>`],
 ['Proof: <b>sudo whoami</b> prints <b>root</b>. The very next command, without sudo, is plain you again.',`<svg viewBox="0 0 420 150" role="img" aria-label="sudo whoami prints root, whoami prints you"><rect class="bx-dark" x="4" y="6" width="412" height="138" rx="8"/><text class="t-term" x="16" y="36" style="font-size:15px">$ sudo whoami</text><text class="t-term t-warn" x="16" y="66" style="font-size:15px">root</text><text class="t-term" x="16" y="96" style="font-size:15px">$ whoami</text><text class="t-term t-a" x="16" y="126" style="font-size:15px">you</text></svg>`]])}
${V.rules(V.ok('sudo apt update','System jobs: installing, updating, editing /etc'),V.no('sudo nano notes.txt','Your own files never need it, and the file may end up owned by root'),
 V.no('sudo chmod -R 777 /','Unlocks the whole computer for everyone. A classic way to break a server'),V.ok('sudo !!','Repeats your last command with sudo in front'))}
${V.hook(`Be yourself by default. Borrow root for one command. Hand the key straight back.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Decode <code>640</code>. <i>rw-r-----: owner reads and writes, group reads, others nothing.</i> 2. bob owns a file set to <code>---r--r--</code>. Can bob read it? <i>No. He matches the owner gate first, and the owner set is empty.</i> 3. Which number for a private SSH key? <i>600.</i></div>
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

