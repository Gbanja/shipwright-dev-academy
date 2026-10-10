/* Git simulator */

let S;
const clone=o=>JSON.parse(JSON.stringify(o));
function fresh(){return{inited:false,files:{},index:{},commits:{},branches:{},border:[],head:{type:'branch',name:'main'},remote:null,tracking:{},upstream:{},stash:[],tags:{},merge:null,prs:[],t:0,config:{},hist:[],flags:{},mateId:null}}
function hid(){let s='';for(let i=0;i<7;i++)s+='0123456789abcdef'[Math.floor(Math.random()*16)];return S.commits[s]?hid():s}
function headId(){return S.head.type==='branch'?S.branches[S.head.name]:S.head.id}
function cur(){return S.head.type==='branch'?S.head.name:null}
function treeOf(id){return id&&S.commits[id]?S.commits[id].tree:{}}
function nCommits(){return Object.keys(S.commits).length}
function H(re){return S.hist.some(h=>re.test(h))}
function findMsg(m){const c=Object.values(S.commits).find(c=>c.msg===m);return c?c.id:null}
function mergeDone(){return !S.merge&&Object.values(S.commits).some(c=>c.parents.length===2)&&H(/^git commit/)}
function prMerged(){return S.prs.some(p=>p.state==='merged')}
function ignored(f){const gi=S.files['.gitignore'];if(gi==null||f==='.gitignore')return false;return gi.split('\n').some(p=>{p=p.trim().replace(/\/$/,'');if(!p)return false;if(p.startsWith('*.'))return f.endsWith(p.slice(1));return p===f})}
function diffTrees(a,b){const out=[];const keys=[...new Set([...Object.keys(a),...Object.keys(b)])].sort();for(const k of keys){if(!(k in a))out.push(['new file',k]);else if(!(k in b))out.push(['deleted',k]);else if(a[k]!==b[k])out.push(['modified',k]);}return out}
function statusInfo(){const ht=treeOf(headId());const conf=S.merge?S.merge.conflicts:[];const staged=diffTrees(ht,S.index).filter(x=>!conf.includes(x[1]));const unstaged=[];const untracked=[];for(const k of Object.keys(S.index).sort()){if(conf.includes(k))continue;if(!(k in S.files))unstaged.push(['deleted',k]);else if(S.files[k]!==S.index[k])unstaged.push(['modified',k]);}for(const k of Object.keys(S.files).sort()){if(!(k in S.index)&&!ignored(k)&&!conf.includes(k))untracked.push(k);}return{staged,unstaged,untracked,conf}}
function dirty(){const s=statusInfo();return s.staged.length||s.unstaged.length||s.conf.length}
function ancestors(id){const set=new Set();const st=[id];while(st.length){const x=st.pop();if(!x||set.has(x)||!S.commits[x])continue;set.add(x);st.push(...S.commits[x].parents);}return set}
function isAnc(a,b){if(!a||!b)return false;return ancestors(b).has(a)}
function lca(a,b){const A=ancestors(a);const q=[b];const seen=new Set();while(q.length){const x=q.shift();if(!x||seen.has(x))continue;seen.add(x);if(A.has(x))return x;q.push(...S.commits[x].parents);}return null}
function resolve(r){if(!r)return null;const m=r.match(/^(.+?)(~(\d+)|\^+)?$/);if(!m)return null;const base=m[1];const n=m[3]?+m[3]:(m[2]?m[2].length:0);
 let id=base==='HEAD'?headId():(S.branches[base]||(base.startsWith('origin/')?S.tracking[base.slice(7)]:null)||S.tags[base]||(base.length>=4?Object.keys(S.commits).find(c=>c.startsWith(base)):null));
 if(!id)return null;for(let i=0;i<n;i++){id=S.commits[id].parents[0];if(!id)return null;}return id}
function makeCommit(msg,parents,tree,author){const id=hid();S.commits[id]={id,msg,parents:parents.filter(Boolean),tree:clone(tree),t:++S.t,author:author||(S.config['user.name']||'you')};return id}
function moveHead(id){if(S.head.type==='branch'){if(!(S.head.name in S.branches))S.border.push(S.head.name);S.branches[S.head.name]=id;}else S.head.id=id}
function checkoutTree(tree){const keep={};for(const k in S.files)if(!(k in S.index))keep[k]=S.files[k];S.files=Object.assign(keep,clone(tree));S.index=clone(tree)}
function threeWay(base,ours,theirs,label){const keys=new Set([...Object.keys(base),...Object.keys(ours),...Object.keys(theirs)]);const tree={};const conflicts=[];for(const k of keys){const b=base[k],o=ours[k],t=theirs[k];let r;if(o===t)r=o;else if(o===b)r=t;else if(t===b)r=o;else{conflicts.push(k);r='<<<<<<< HEAD\n'+(o??'')+'\n=======\n'+(t??'')+'\n>>>>>>> '+label;}if(r!==undefined)tree[k]=r;}return{tree,conflicts}}
function mate(file,content,msg){if(!S.remote)return;const base=S.remote.branches.main;const tree=Object.assign(clone(treeOf(base)),{[file]:content.replace(/\\n/g,'\n')});const id=makeCommit(msg,[base],tree,'Ada (teammate)');S.remote.branches.main=id;S.mateId=id}
function short(id){return id?id.slice(0,7):''}
function deco(id){const r=[];const hb=cur();if(S.head.type==='detached'&&S.head.id===id)r.push('{c}HEAD{/}');if(hb&&S.branches[hb]===id)r.push('{c}HEAD -> {g}'+hb+'{/}');for(const [b,c] of Object.entries(S.branches))if(c===id&&b!==hb)r.push('{g}'+b+'{/}');for(const [b,c] of Object.entries(S.tracking))if(c===id)r.push('{r}origin/'+b+'{/}');for(const [t,c] of Object.entries(S.tags))if(c===id)r.push('{y}tag: '+t+'{/}');return r.length?' {y}({/}'+r.join('{y}, {/}')+'{y}){/}':''}
const ok=o=>({o:o||''}),er=(o,rec)=>({o,e:true,rec:!!rec});

function tokenize(s){const out=[];let cur='',q=null,has=false;for(const ch of s){if(q){if(ch===q)q=null;else cur+=ch;}else if(ch==='"'||ch==="'"){q=ch;has=true;}else if(/\s/.test(ch)){if(cur||has){out.push(cur);cur='';has=false;}}else if(ch==='>'&&!q){if(cur||has){out.push(cur);cur='';has=false;}if(out[out.length-1]==='>')out[out.length-1]='>>';else out.push('>');}else cur+=ch;}if(cur||has)out.push(cur);return out}

const HELP=`{c}Shell{/}  ls [-a]  cat <file>  echo "text" > file  echo "text" >> file  touch <file>  rm <file>  clear  pwd
{c}Setup{/}  git --version  git config --global user.name "Name"  git init
{c}Basics{/}  git status  git add <file>|.  git commit -m "msg" [-a] [--amend]  git log [--oneline] [ref]  git diff [--staged]
{c}Undo{/}  git restore [--staged] <file>  git reset [--soft|--mixed|--hard] <ref>  git revert <ref>
{c}Branch{/}  git branch [name|-d name|-a|-m new]  git switch [-c] <name>  git checkout [-b] <name>  git merge <name> [--abort]
{c}Remote{/}  git remote add origin <url>  git remote -v  git push [-u origin <branch>]  git fetch  git pull
{c}More{/}  git stash [pop|list]  git rebase <branch>  git cherry-pick <ref>  git tag [name]  git rm <file>
{c}GitHub{/}  gh pr create --title "..."  gh pr list  gh pr merge <number>
{m}Chain commands with &&. Use the up and down arrows for history.{/}`;

function run(line,silent){
 const parts=line.split('&&').map(s=>s.trim()).filter(Boolean);const outs=[];
 for(const p of parts){let r;try{r=exec(p)}catch(e){r=er('sandbox error: '+e.message)}
  if(!r.e||r.rec)S.hist.push(p.replace(/\s+/g,' '));outs.push(r);if(r.e)break;}
 return outs;
}
function exec(line){
 const a=tokenize(line);if(!a.length)return ok('');const c=a[0];
 switch(c){
  case 'help':return ok(HELP);
  case 'clear':return{o:'',clear:true};
  case 'pwd':return ok('/home/you/project');
  case 'ls':{const all=a.includes('-a');const fs=Object.keys(S.files).sort().filter(f=>all||!f.startsWith('.'));if(all&&S.inited)fs.unshift('.git');return ok(fs.join('  '))}
  case 'cat':{if(!a[1])return er('cat: missing file name');if(!(a[1] in S.files))return er('cat: '+a[1]+': No such file or directory');return ok(S.files[a[1]])}
  case 'touch':{if(!a[1])return er('touch: missing file name');for(const f of a.slice(1))if(!(f in S.files))S.files[f]='';return ok('')}
  case 'rm':{const fs=a.slice(1).filter(x=>!x.startsWith('-'));if(!fs.length)return er('rm: missing file name');for(const f of fs){if(!(f in S.files))return er("rm: cannot remove '"+f+"': No such file");delete S.files[f];}return ok('')}
  case 'echo':{const i=a.findIndex(x=>x==='>'||x==='>>');if(i<0)return ok(a.slice(1).join(' '));const text=a.slice(1,i).join(' ');const f=a[i+1];if(!f)return er('bash: syntax error: expected a file name after '+a[i]);if(a[i]==='>>'&&S.files[f])S.files[f]=S.files[f]+'\n'+text;else S.files[f]=text;return ok('')}
  case 'git':return git(a.slice(1));
  case 'gh':return gh(a.slice(1));
  case 'cd':return ok('');
  case 'nano':case 'vim':case 'code':return er(c+": this sandbox has no editor. Write files with echo \"text\" > file");
  default:return er(c+': command not found. Type help to see what this sandbox supports.');
 }
}
function opt(args,name){const i=args.indexOf(name);if(i<0)return null;const v=args[i+1];args.splice(i,2);return v??''}
function git(args){
 const sub=args[0];const r=args.slice(1);
 if(!sub)return ok('usage: git <command>   (try: git status, or type help)');
 if(sub==='--version'||sub==='version')return ok('git version 2.47.0');
 if(sub==='help')return ok(HELP);
 if(sub==='config'){const x=r.filter(v=>v!=='--global'&&v!=='--local');if(x[0]==='--list'||x[0]==='-l')return ok(Object.entries(S.config).map(([k,v])=>k+'='+v).join('\n'));if(!x[0])return er('usage: git config [--global] <key> <value>');if(x.length===1)return S.config[x[0]]!=null?ok(S.config[x[0]]):er('');S.config[x[0]]=x.slice(1).join(' ');return ok('')}
 if(sub==='init'){if(S.inited)return ok('Reinitialized existing Git repository in /home/you/project/.git/');S.inited=true;return ok('Initialized empty Git repository in /home/you/project/.git/')}
 if(sub==='clone')return er('clone is not simulated here. You\'ll do it for real in the Real-world reps tab.');
 if(!S.inited)return er('fatal: not a git repository (or any of the parent directories): .git\nhint: run git init first');
 switch(sub){
 case 'status':return status();
 case 'add':{
  if(!r.length)return er("Nothing specified, nothing added.\nhint: Maybe you wanted to say 'git add .'?");
  const all=r.some(x=>x==='.'||x==='-A'||x==='--all');const targets=all?[...new Set([...Object.keys(S.files),...Object.keys(S.index)])]:r;let warn='';
  for(const f of targets){
   if(f in S.files){if(ignored(f)&&!(f in S.index)){if(!all)warn+='The following paths are ignored by one of your .gitignore files:\n'+f+'\n';continue}S.index[f]=S.files[f];if(/<<<<<<<|>>>>>>>/.test(S.files[f]))warn+='{y}warning: '+f+' still contains conflict markers{/}\n';}
   else if(f in S.index)delete S.index[f];
   else if(!all)return er("fatal: pathspec '"+f+"' did not match any files");
   if(S.merge)S.merge.conflicts=S.merge.conflicts.filter(x=>x!==f);
  }
  return ok(warn.trim());}
 case 'rm':{const fs=r.filter(x=>!x.startsWith('-'));const cached=r.includes('--cached');for(const f of fs){if(!(f in S.index))return er("fatal: pathspec '"+f+"' did not match any files");delete S.index[f];if(!cached)delete S.files[f];}return ok(fs.map(f=>"rm '"+f+"'").join('\n'))}
 case 'commit':return commit(r);
 case 'log':return log(r);
 case 'diff':{const staged=r.includes('--staged')||r.includes('--cached');const a=staged?treeOf(headId()):S.index;const b=staged?S.index:Object.fromEntries(Object.entries(S.files).filter(([k])=>k in S.index));const d=diffTrees(a,b);if(!d.length)return ok('');return ok(d.map(([k,f])=>'{m}diff --git a/'+f+' b/'+f+'{/}\n--- '+(k==='new file'?'/dev/null':'a/'+f)+'\n+++ '+(k==='deleted'?'/dev/null':'b/'+f)+(a[f]!=null?'\n'+a[f].split('\n').map(l=>'{r}-'+l+'{/}').join('\n'):'')+(b[f]!=null?'\n'+b[f].split('\n').map(l=>'{g}+'+l+'{/}').join('\n'):'')).join('\n'))}
 case 'restore':{const staged=r.includes('--staged')||r.includes('-S');const fs=r.filter(x=>!x.startsWith('-'));if(!fs.length)return er('fatal: you must specify path(s) to restore');const ht=treeOf(headId());for(const f of (fs[0]==='.'?Object.keys(staged?S.index:S.index):fs)){if(staged){if(f in ht)S.index[f]=ht[f];else delete S.index[f];}else{if(!(f in S.index))return er("error: pathspec '"+f+"' did not match any file(s) known to git");S.files[f]=S.index[f];}}return ok('')}
 case 'reset':return reset(r);
 case 'revert':return revert(r);
 case 'branch':return branch(r);
 case 'switch':return sw(r,false);
 case 'checkout':{if(r[0]==='--'||(r.length===1&&(r[0] in S.index)&&!S.branches[r[0]])){const f=r[0]==='--'?r[1]:r[0];if(!(f in S.index))return er("error: pathspec '"+f+"' did not match");S.files[f]=S.index[f];return ok("Updated 1 path from the index")}return sw(r.map(x=>x==='-b'?'-c':x),true)}
 case 'merge':{if(r[0]==='--abort'){if(!S.merge)return er('fatal: There is no merge to abort (MERGE_HEAD missing).');S.merge=null;checkoutTree(treeOf(headId()));return ok('')}if(!r[0])return er('fatal: No remote for the current branch / specify a branch to merge.');return doMerge(r[0],r[0])}
 case 'remote':{if(r[0]==='add'){if(!r[1]||!r[2])return er('usage: git remote add <name> <url>');if(r[1]!=='origin')return er('This sandbox supports one remote, named origin.');if(S.remote)return er('error: remote origin already exists.');S.remote={url:r[2],branches:{}};return ok('')}if(r[0]==='-v'){if(!S.remote)return ok('');return ok('origin\t'+S.remote.url+' (fetch)\norigin\t'+S.remote.url+' (push)')}if(r[0]==='remove'||r[0]==='rm'){S.remote=null;S.tracking={};return ok('')}return ok(S.remote?'origin':'')}
 case 'push':return push(r);
 case 'fetch':{if(!S.remote)return er("fatal: 'origin' does not appear to be a git repository");const lines=[];for(const [b,id] of Object.entries(S.remote.branches)){if(S.tracking[b]!==id)lines.push('   '+(S.tracking[b]?short(S.tracking[b])+'..'+short(id):'* [new branch]')+'  '+b+' -> origin/'+b);}S.tracking=clone(S.remote.branches);return ok(lines.length?'From '+S.remote.url+'\n'+lines.join('\n'):'')}
 case 'pull':return pull(r);
 case 'stash':return stash(r);
 case 'rebase':return rebase(r);
 case 'cherry-pick':return cherry(r);
 case 'tag':{if(!r.length)return ok(Object.keys(S.tags).sort().join('\n'));if(r[0]==='-d'){delete S.tags[r[1]];return ok("Deleted tag '"+r[1]+"'")}const nm=r.filter(x=>!x.startsWith('-'))[0];const id=resolve(r.filter(x=>!x.startsWith('-'))[1]||'HEAD');if(!id)return er('fatal: Failed to resolve HEAD as a valid ref.');if(S.tags[nm])return er("fatal: tag '"+nm+"' already exists");S.tags[nm]=id;return ok('')}
 case 'show':{const id=resolve(r[0]||'HEAD');if(!id)return er('fatal: bad revision');const c=S.commits[id];return ok('{y}commit '+id+'{/}'+deco(id)+'\nAuthor: '+c.author+'\n\n    '+c.msg+'\n\n'+diffTrees(treeOf(c.parents[0]),c.tree).map(([k,f])=>' '+k+': '+f).join('\n'))}
 case 'reflog':return ok(Object.values(S.commits).sort((a,b)=>b.t-a.t).slice(0,12).map((c,i)=>'{y}'+short(c.id)+'{/} HEAD@{'+i+'}: '+c.msg).join('\n'));
 default:return er("git: '"+sub+"' is not a git command in this sandbox. Type help.");
 }
}
function status(){
 const s=statusInfo();const L=[];const b=cur();
 L.push(b?'On branch '+b:'{r}HEAD detached at '+short(S.head.id)+'{/}');
 if(b&&S.upstream[b]&&S.tracking[b]&&S.branches[b]){const A=ancestors(S.branches[b]),T=ancestors(S.tracking[b]);const ahead=[...A].filter(x=>!T.has(x)).length,behind=[...T].filter(x=>!A.has(x)).length;
  if(ahead&&behind)L.push("Your branch and 'origin/"+b+"' have diverged,\nand have "+ahead+' and '+behind+' different commits each, respectively.\n  (use "git pull" to merge the remote branch into yours)');
  else if(ahead)L.push("Your branch is ahead of 'origin/"+b+"' by "+ahead+' commit'+(ahead>1?'s':'')+'.\n  (use "git push" to publish your local commits)');
  else if(behind)L.push("Your branch is behind 'origin/"+b+"' by "+behind+' commit'+(behind>1?'s':'')+'.\n  (use "git pull" to update your local branch)');
  else L.push("Your branch is up to date with 'origin/"+b+"'.");}
 if(!headId())L.push('\nNo commits yet');
 if(S.merge){L.push(s.conf.length?'\nYou have unmerged paths.\n  (fix conflicts and run "git commit")\n  (use "git merge --abort" to abort the merge)':'\nAll conflicts fixed but you are still merging.\n  (use "git commit" to conclude merge)');}
 if(s.staged.length)L.push('\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n'+s.staged.map(([k,f])=>'\t{g}'+(k+':').padEnd(12)+f+'{/}').join('\n'));
 if(s.conf.length)L.push('\nUnmerged paths:\n  (use "git add <file>..." to mark resolution)\n'+s.conf.map(f=>'\t{r}both modified:   '+f+'{/}').join('\n'));
 if(s.unstaged.length)L.push('\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n'+s.unstaged.map(([k,f])=>'\t{r}'+(k+':').padEnd(12)+f+'{/}').join('\n'));
 if(s.untracked.length)L.push('\nUntracked files:\n  (use "git add <file>..." to include in what will be committed)\n'+s.untracked.map(f=>'\t{r}'+f+'{/}').join('\n'));
 if(!s.staged.length&&!s.unstaged.length&&!s.untracked.length&&!s.conf.length&&!S.merge)L.push(headId()?'\nnothing to commit, working tree clean':'\nnothing to commit (create/copy files and use "git add" to track)');
 else if(!s.staged.length&&!S.merge&&(s.unstaged.length||s.untracked.length))L.push('\nno changes added to commit (use "git add")');
 return ok(L.join('\n'));
}
function commit(r){
 const args=[...r];const amend=args.includes('--amend');let all=false;
 let msg=null;for(let i=0;i<args.length;i++){const x=args[i];if(x==='-m'||x==='--message'){msg=args[i+1];i++;}else if(x==='-am'||x==='-ma'){all=true;msg=args[i+1];i++;}else if(x==='-a'||x==='--all')all=true;}
 if(all){for(const f of Object.keys(S.index)){if(f in S.files)S.index[f]=S.files[f];else delete S.index[f];}}
 if(S.merge){if(S.merge.conflicts.length)return er('error: Committing is not possible because you have unmerged files.\nhint: Fix them up in the work tree, and then use \'git add <file>\'\nfatal: Exiting because of an unresolved conflict.');
  const id=makeCommit(msg||"Merge branch '"+S.merge.label+"'",[headId(),S.merge.target],S.index);moveHead(id);S.merge=null;return ok('['+(cur()||'detached')+' '+short(id)+'] '+S.commits[id].msg)}
 if(amend){const h=headId();if(!h)return er('fatal: You have nothing to amend.');const old=S.commits[h];const id=makeCommit(msg||old.msg,old.parents,S.index);moveHead(id);return ok('['+cur()+' '+short(id)+'] '+S.commits[id].msg+'\n {m}(amended: the old commit '+short(h)+' was replaced){/}')}
 if(msg==null)return er('Aborting commit: this sandbox has no text editor.\nUse: git commit -m "Describe your change"');
 if(!msg.trim())return er('Aborting commit due to empty commit message.');
 const h=headId();if(!diffTrees(treeOf(h),S.index).length){const s=statusInfo();return er((cur()?'On branch '+cur()+'\n':'')+(s.unstaged.length||s.untracked.length?'nothing added to commit but untracked or modified files present (use "git add" to track)':'nothing to commit, working tree clean'))}
 const changes=diffTrees(treeOf(h),S.index);const id=makeCommit(msg,[h],S.index);moveHead(id);
 return ok('['+(cur()||'detached HEAD')+(h?'':' (root-commit)')+' '+short(id)+'] '+msg+'\n '+changes.length+' file'+(changes.length>1?'s':'')+' changed'+changes.filter(c=>c[0]==='new file').map(c=>'\n create mode 100644 '+c[1]).join(''));
}
function log(r){
 const one=r.includes('--oneline');const all=r.includes('--all');const ref=r.find(x=>!x.startsWith('-'));
 let start=ref?resolve(ref):headId();if(ref&&!start)return er("fatal: ambiguous argument '"+ref+"': unknown revision");
 if(!start)return er("fatal: your current branch '"+(cur()||'HEAD')+"' does not have any commits yet");
 let set=ancestors(start);if(all)for(const id of [...Object.values(S.branches),...Object.values(S.tracking),...Object.values(S.tags)])for(const x of ancestors(id))set.add(x);
 const list=[...set].map(id=>S.commits[id]).sort((a,b)=>b.t-a.t);
 if(one)return ok(list.map(c=>'{y}'+short(c.id)+'{/}'+deco(c.id)+' '+c.msg).join('\n'));
 return ok(list.map(c=>'{y}commit '+c.id+'{/}'+deco(c.id)+(c.parents.length>1?'\nMerge: '+c.parents.map(short).join(' '):'')+'\nAuthor: '+c.author+'\n\n    '+c.msg+'\n').join('\n'));
}
function reset(r){
 let mode='mixed';const args=r.filter(x=>{if(x==='--soft'||x==='--hard'||x==='--mixed'){mode=x.slice(2);return false}return true});
 const target=args[0]||'HEAD';
 if(!resolve(target)&&(target in S.index||target in treeOf(headId()))){const ht=treeOf(headId());if(target in ht)S.index[target]=ht[target];else delete S.index[target];return ok('Unstaged changes after reset:\nM\t'+target)}
 const id=resolve(target);if(!id)return er("fatal: ambiguous argument '"+target+"': unknown revision or path");
 moveHead(id);S.merge=null;
 if(mode==='mixed')S.index=clone(treeOf(id));
 if(mode==='hard'){const keep={};for(const k in S.files)if(!(k in S.index)&&!(k in treeOf(id)))keep[k]=S.files[k];S.index=clone(treeOf(id));S.files=Object.assign(keep,clone(treeOf(id)));return ok('HEAD is now at '+short(id)+' '+S.commits[id].msg)}
 return ok(mode==='soft'?'{m}Branch moved to '+short(id)+'. Your changes are still staged.{/}':'{m}Branch moved to '+short(id)+'. Your changes are kept but unstaged.{/}');
}
function revert(r){
 const id=resolve(r[0]||'');if(!id)return er('usage: git revert <commit>');if(dirty())return er('error: your local changes would be overwritten by revert.\nhint: commit your changes or stash them to proceed.');
 const c=S.commits[id];if(c.parents.length>1)return er('error: commit '+short(id)+' is a merge. This sandbox does not revert merges.');
 const p=treeOf(c.parents[0]);const tree=clone(treeOf(headId()));
 for(const [,f] of diffTrees(p,c.tree)){if(tree[f]!==c.tree[f])return er('error: could not revert '+short(id)+': later commits changed '+f+'. (Conflicting reverts are not simulated.)');if(f in p)tree[f]=p[f];else delete tree[f];}
 const nid=makeCommit('Revert "'+c.msg+'"',[headId()],tree);moveHead(nid);checkoutTree(tree);return ok('['+(cur()||'detached')+' '+short(nid)+'] Revert "'+c.msg+'"');
}
function branch(r){
 if(!r.length||r[0]==='-a'||r[0]==='--all'||r[0]==='-v'){const names=Object.keys(S.branches).sort();let out=names.map(b=>(b===cur()?'* {g}'+b+'{/}':'  '+b)+(r[0]==='-v'?' '+short(S.branches[b])+' '+S.commits[S.branches[b]].msg:''));if(S.head.type==='detached')out.unshift('* {r}(HEAD detached at '+short(S.head.id)+'){/}');if(r[0]==='-a'||r[0]==='--all')out=out.concat(Object.keys(S.tracking).map(b=>'  {r}remotes/origin/'+b+'{/}'));if(!names.length&&!headId())return ok('{m}(no branches yet: make your first commit){/}');return ok(out.join('\n'))}
 if(r[0]==='-d'||r[0]==='-D'){const b=r[1];if(!(b in S.branches))return er("error: branch '"+b+"' not found.");if(b===cur())return er("error: Cannot delete branch '"+b+"' checked out. Switch to another branch first.");if(r[0]==='-d'&&!isAnc(S.branches[b],headId()))return er("error: The branch '"+b+"' is not fully merged.\nhint: If you are sure you want to delete it, run 'git branch -D "+b+"'");const id=S.branches[b];delete S.branches[b];S.border=S.border.filter(x=>x!==b);return ok('Deleted branch '+b+' (was '+short(id)+').')}
 if(r[0]==='-m'||r[0]==='-M'){const nw=r[2]||r[1];const old=r[2]?r[1]:cur();if(!old)return er('fatal: not on a branch');if(S.branches[old]){S.branches[nw]=S.branches[old];delete S.branches[old];S.border=S.border.map(x=>x===old?nw:x);}if(cur()===old)S.head.name=nw;return ok('')}
 const name=r[0];if(!headId())return er("fatal: Not a valid object name: '"+(cur()||'HEAD')+"'.\nhint: make a commit first. A branch has to point at a commit.");if(S.branches[name])return er("fatal: a branch named '"+name+"' already exists");
 const id=resolve(r[1]||'HEAD');S.branches[name]=id;S.border.push(name);return ok('');
}
function sw(r,isCheckout){
 const create=r.includes('-c')||r.includes('-C');const name=r.filter(x=>!x.startsWith('-'))[0];
 if(!name)return er('fatal: missing branch name');
 if(create){if(S.branches[name])return er("fatal: a branch named '"+name+"' already exists");const base=headId();if(!base){if(!S.inited)return er('fatal: not a git repository');S.head={type:'branch',name};return ok("Switched to a new branch '"+name+"'")}S.branches[name]=resolve(r.filter(x=>!x.startsWith('-'))[1]||'HEAD');S.border.push(name);S.head={type:'branch',name};return ok("Switched to a new branch '"+name+"'")}
 let target=S.branches[name];let detached=false;
 if(!target&&S.tracking[name]){S.branches[name]=S.tracking[name];S.border.push(name);S.upstream[name]=true;target=S.branches[name];}
 if(!target){const id=resolve(name);if(id&&(isCheckout||r.includes('--detach'))){target=id;detached=true;}else if(!headId()&&name===cur())return ok("Already on '"+name+"'");else return er("fatal: invalid reference: "+name+(isCheckout?'':"\nhint: to create it, use git switch -c "+name));}
 if(!detached&&name===cur())return ok("Already on '"+name+"'");
 if(dirty()&&diffTrees(treeOf(headId()),treeOf(target)).length&&statusInfo().unstaged.concat(statusInfo().staged).some(([,f])=>treeOf(headId())[f]!==treeOf(target)[f]))return er('error: Your local changes to the following files would be overwritten by checkout:\n\t'+statusInfo().unstaged.concat(statusInfo().staged).map(x=>x[1]).join('\n\t')+'\nPlease commit your changes or stash them before you switch branches.');
 const carry={};const s=statusInfo();for(const [,f] of s.unstaged.concat(s.staged))carry[f]={w:S.files[f],i:S.index[f]};
 checkoutTree(treeOf(target));for(const f in carry){if(carry[f].w==null)delete S.files[f];else S.files[f]=carry[f].w;if(carry[f].i==null)delete S.index[f];else S.index[f]=carry[f].i;}
 if(detached){S.head={type:'detached',id:target};return ok("Note: switching to '"+short(target)+"'.\nYou are in 'detached HEAD' state. Look around, but create a branch before committing:\n  git switch -c <new-branch-name>")}
 S.head={type:'branch',name};let extra='';if(S.upstream[name]&&S.tracking[name]&&S.tracking[name]!==target){if(isAnc(target,S.tracking[name]))extra="\nYour branch is behind 'origin/"+name+"'. (use \"git pull\" to update)";}else if(S.upstream[name])extra="\nYour branch is up to date with 'origin/"+name+"'.";
 return ok("Switched to branch '"+name+"'"+extra);
}
function doMerge(arg,label){
 const tid=resolve(arg);if(!tid)return er('merge: '+arg+' - not something we can merge');const h=headId();
 if(S.merge)return er('error: You have not concluded your merge. Fix conflicts, git add, then git commit (or git merge --abort).');
 if(dirty())return er('error: Your local changes would be overwritten by merge.\nPlease commit your changes or stash them before you merge.');
 if(!h){moveHead(tid);checkoutTree(treeOf(tid));return ok('Fast-forward')}
 if(isAnc(tid,h))return ok('Already up to date.');
 if(isAnc(h,tid)){moveHead(tid);checkoutTree(treeOf(tid));const ch=diffTrees(treeOf(h),treeOf(tid));return ok('Updating '+short(h)+'..'+short(tid)+'\n{g}Fast-forward{/}\n'+ch.map(([k,f])=>' '+f+(k==='new file'?' (new)':'')).join('\n'))}
 const base=lca(h,tid);const res=threeWay(treeOf(base),treeOf(h),treeOf(tid),label);
 if(!res.conflicts.length){const id=makeCommit("Merge branch '"+label+"'"+(cur()&&cur()!=='main'?' into '+cur():''),[h,tid],res.tree);moveHead(id);checkoutTree(res.tree);return ok("Merge made by the 'ort' strategy.\n{m}A merge commit with two parents was created: "+short(id)+'{/}')}
 const idx=clone(res.tree);for(const f of res.conflicts){if(f in treeOf(h))idx[f]=treeOf(h)[f];else delete idx[f];}
 const keep={};for(const k in S.files)if(!(k in S.index))keep[k]=S.files[k];S.files=Object.assign(keep,clone(res.tree));S.index=idx;
 S.merge={target:tid,label,conflicts:res.conflicts};
 return er(res.conflicts.map(f=>'Auto-merging '+f+'\nCONFLICT (content): Merge conflict in '+f).join('\n')+'\nAutomatic merge failed; fix conflicts and then commit the result.',true);
}
function push(r){
 if(!S.remote)return er("fatal: 'origin' does not appear to be a git repository\nhint: connect one first: git remote add origin <url>");
 let u=false;const a=r.filter(x=>{if(x==='-u'||x==='--set-upstream'){u=true;return false}return !x.startsWith('--force')});const force=r.some(x=>x.startsWith('--force')||x==='-f');
 let br;if(!a.length){br=cur();if(!br)return er('fatal: You are not currently on a branch.');if(!S.upstream[br])return er('fatal: The current branch '+br+' has no upstream branch.\nTo push the current branch and set the remote as upstream, use\n\n    git push -u origin '+br);}
 else{if(a[0]!=='origin')return er("fatal: '"+a[0]+"' does not appear to be a git repository");br=a[1]||cur();}
 const lid=S.branches[br];if(!lid)return er('error: src refspec '+br+' does not match any\nhint: make a commit first.');
 const rid=S.remote.branches[br];
 if(rid&&!isAnc(rid,lid)&&!force){S.flags.rejected=true;return er('To '+S.remote.url+'\n ! [rejected]        '+br+' -> '+br+' (fetch first)\nerror: failed to push some refs to \''+S.remote.url+'\'\nhint: Updates were rejected because the remote contains work that you do not\nhint: have locally. Integrate the remote changes (e.g. \'git pull\') before pushing again.')}
 if(rid===lid){if(u)S.upstream[br]=true;return ok('Everything up-to-date')}
 S.remote.branches[br]=lid;S.tracking[br]=lid;if(u)S.upstream[br]=true;
 return ok('To '+S.remote.url+'\n   '+(rid?short(rid)+'..'+short(lid)+(force?' (forced update)':''):'{g}* [new branch]{/}')+'      '+br+' -> '+br+(u?"\nbranch '"+br+"' set up to track 'origin/"+br+"'.":''));
}
function pull(r){
 if(!S.remote)return er("fatal: 'origin' does not appear to be a git repository");
 const a=r.filter(x=>!x.startsWith('-'));let br=a[1]||cur();if(!br)return er('fatal: You are not currently on a branch.');
 if(!a.length&&!S.upstream[br])return er('There is no tracking information for the current branch.\nPlease specify which branch you want to merge with:\n    git pull origin '+br+'\nOr set it once with: git push -u origin '+br);
 if(!S.remote.branches[br])return er("fatal: couldn't find remote ref "+br);
 const f=git(['fetch']);const m=doMerge('origin/'+br,'origin/'+br);
 return{o:(f.o?f.o+'\n':'')+m.o,e:m.e,rec:m.rec};
}
function stash(r){
 const sub=r[0]||'push';
 if(sub==='push'||sub==='save'||sub==='-m'){if(!dirty())return ok('No local changes to save');const tracked={};for(const k of new Set([...Object.keys(S.index),...Object.keys(treeOf(headId()))]))if(k in S.files)tracked[k]=S.files[k];const h=headId();S.stash.unshift({index:clone(S.index),files:tracked,on:cur(),base:h,msg:S.commits[h]?S.commits[h].msg:''});checkoutTree(treeOf(h));return ok('Saved working directory and index state WIP on '+(cur()||'HEAD')+': '+short(h)+' '+S.stash[0].msg)}
 if(sub==='list')return ok(S.stash.map((s,i)=>'stash@{'+i+'}: WIP on '+s.on+': '+short(s.base)+' '+s.msg).join('\n'));
 if(sub==='pop'||sub==='apply'){if(!S.stash.length)return er('No stash entries found.');const e=S.stash[0];const ht=treeOf(headId());
  for(const [f,v] of Object.entries(e.files)){const base=treeOf(e.base)[f];if(S.files[f]!==ht[f])return er('error: Your local changes to '+f+' would be overwritten. Commit or stash them first.');if(ht[f]!==base&&v!==base)return er('CONFLICT (content): '+f+' changed both in the stash and on this branch. (Not simulated: stash pop on a branch where '+f+' was not changed.)');}
  for(const [f,v] of Object.entries(e.files)){if(v!==treeOf(e.base)[f])S.files[f]=v;}
  if(sub==='pop')S.stash.shift();return ok('{m}Restored your stashed changes.{/}'+(sub==='pop'?'\nDropped refs/stash@{0}':''))}
 if(sub==='drop'){S.stash.shift();return ok('Dropped refs/stash@{0}')}
 return er('usage: git stash [push | pop | list | apply | drop]');
}
function replay(list,onto){let curId=onto;for(const cid of list){const cm=S.commits[cid];if(cm.parents.length>1)continue;const p=treeOf(cm.parents[0]);const t=clone(treeOf(curId));for(const [,f] of diffTrees(p,cm.tree)){if(t[f]!==p[f]&&t[f]!==cm.tree[f])return{err:'CONFLICT (content): Merge conflict in '+f+' while applying "'+cm.msg+'".\n{m}This sandbox stops here; use git merge for overlapping changes.{/}'};if(f in cm.tree)t[f]=cm.tree[f];else delete t[f];}curId=makeCommit(cm.msg,[curId],t,cm.author);}return{id:curId}}
function rebase(r){
 const arg=r.filter(x=>!x.startsWith('-'))[0];const tid=resolve(arg||'');if(!tid)return er('fatal: invalid upstream '+(arg||''));if(!cur())return er('fatal: rebase needs a branch. Switch to one first.');
 if(dirty())return er('error: cannot rebase: You have unstaged changes.\nerror: Please commit or stash them.');
 const h=headId();if(isAnc(tid,h))return ok('Current branch '+cur()+' is up to date.');
 if(isAnc(h,tid)){moveHead(tid);checkoutTree(treeOf(tid));return ok('Successfully rebased and updated refs/heads/'+cur()+'. (fast-forward)')}
 const T=ancestors(tid);const list=[...ancestors(h)].filter(x=>!T.has(x)).map(x=>S.commits[x]).sort((a,b)=>a.t-b.t).map(c=>c.id);
 const res=replay(list,tid);if(res.err)return er(res.err);moveHead(res.id);checkoutTree(treeOf(res.id));
 return ok('{m}Replayed '+list.length+' commit'+(list.length>1?'s':'')+' on top of '+arg+' with new ids.{/}\nSuccessfully rebased and updated refs/heads/'+cur()+'.');
}
function cherry(r){const id=resolve(r[0]||'');if(!id)return er('fatal: bad revision \''+(r[0]||'')+'\'');if(dirty())return er('error: your local changes would be overwritten by cherry-pick.');const res=replay([id],headId());if(res.err)return er(res.err);moveHead(res.id);checkoutTree(treeOf(res.id));return ok('['+(cur()||'detached')+' '+short(res.id)+'] '+S.commits[res.id].msg+'\n{m}Copied '+short(id)+' as a new commit.{/}')}
function gh(args){
 if(args[0]==='--version')return ok('gh version 2.62.0');
 if(args[0]!=='pr')return er('This sandbox supports: gh pr create | gh pr list | gh pr merge <n>');
 if(!S.remote)return er('no git remotes found. Push to GitHub first: git remote add origin <url>');
 const sub=args[1];const r=args.slice(2);
 if(sub==='create'){const b=cur();const title=opt(r,'--title')??opt(r,'-t');const base=opt(r,'--base')||opt(r,'-B')||'main';
  if(!b||b===base)return er('could not create pull request: switch to your feature branch first (you are on '+(b||'detached HEAD')+')');
  if(!S.remote.branches[b])return er('aborted: you must first push the current branch to a remote:\n  git push -u origin '+b);
  if(title==null||!title)return er('error: a title is required. Use: gh pr create --title "Describe the change"');
  if(S.prs.some(p=>p.head===b&&p.state==='open'))return er('a pull request for branch "'+b+'" already exists');
  const n=S.prs.length+1;S.prs.push({n,head:b,base,title,state:'open'});return ok('Creating pull request for {g}'+b+'{/} into {g}'+base+'{/} in '+S.remote.url.replace(/^https:\/\/github.com\//,'').replace(/\.git$/,'')+'\n\n'+S.remote.url.replace(/\.git$/,'')+'/pull/'+n)}
 if(sub==='list'){const open=S.prs.filter(p=>p.state==='open');return ok(open.length?open.map(p=>'#'+p.n+'  '+p.title+'  '+p.head+' → '+p.base).join('\n'):'no open pull requests')}
 if(sub==='merge'){const n=+(r.find(x=>/^\d+$/.test(x))||S.prs.filter(p=>p.state==='open').map(p=>p.n).pop());const pr=S.prs.find(p=>p.n===n);if(!pr)return er('no pull request found: #'+(n||'?'));if(pr.state!=='open')return er('Pull request #'+n+' is already '+pr.state);
  const hb=S.remote.branches[pr.head],bb=S.remote.branches[pr.base];if(!hb||!bb)return er('base or head branch missing on GitHub');
  if(isAnc(hb,bb))return er('nothing to merge: '+pr.base+' already contains '+pr.head);
  const res=threeWay(treeOf(lca(bb,hb)),treeOf(bb),treeOf(hb),pr.head);if(res.conflicts.length)return er('Pull request #'+n+' has conflicts in '+res.conflicts.join(', ')+'. Merge '+pr.base+' into your branch locally, fix them, and push.');
  const id=makeCommit('Merge pull request #'+n+' from '+pr.head,[bb,hb],res.tree,'GitHub');S.remote.branches[pr.base]=id;pr.state='merged';
  return ok('{g}✓ Merged pull request #'+n+'{/} ('+pr.title+')\n{m}The merge happened on GitHub. Your local '+pr.base+' does not have it yet: switch to it and pull.{/}')}
 return er('usage: gh pr create | list | merge');
}


/* ---------- Git bench (terminal + graph + files + remote) ---------- */
function gitPrompt(){const b=S.inited?(cur()||short(S.head.id)):'';return 'you@academy ~/project'+(b?' ('+b+')':'')+' $'}
BENCH.git={
 mount(el,l){
  el.innerHTML='<div id="gTerm"></div><div class="card panel"><h3>Commit graph <span class="pill" id="headPill">HEAD</span></h3><div class="graph-box"><div class="empty" id="graphEmpty">No commits yet. Your history will be drawn here as you commit.</div><svg id="graph" width="0" height="0"></svg></div></div><div class="duo"><div class="card panel"><h3>Files <span class="eyebrow">working tree</span></h3><ul class="files" id="gFiles"></ul></div><div class="card panel remote"><h3>GitHub (origin) <span class="eyebrow">remote</span></h3><div id="gRemote"></div></div></div>';
  S=fresh();if(l.setup)l.setup(c=>run(c,true));S.hist=[];S.flags={};
  this.term=makeTerminal($('#gTerm'),{id:'git',title:'bash: ~/project (sandbox)',prompt:gitPrompt,
   exec:async line=>run(line),
   after:async(line,outs)=>{record({c:line.trim(),ok:!outs.some(r=>r.e&&!r.rec)});await checkTasks({});gitPanels()}});
  this.term.sys('Sandbox ready for "'+l.title+'". Type help to see supported commands.');
  if(l.setup)this.term.print('{m}This lesson starts with a prepared repository. Run git status or git log --oneline to look around.{/}');
  gitPanels();
 },
 async solve(t){for(const line of (t.h||'').split('\n'))if(line.trim()&&!line.trim().startsWith('#'))await this.term.submit(line)}
};
function gitPanels(){
 const hb=cur();$('#headPill').textContent=S.inited?(hb?'HEAD → '+hb:'HEAD detached'):'no repo yet';
 const s=S.inited?statusInfo():null;const fl=$('#gFiles');const names=Object.keys(S.files).sort();
 if(!names.length)fl.innerHTML='<li><span class="muted">empty folder</span></li>';
 else fl.innerHTML=names.map(f=>{let st='<span class="st c">committed</span>';if(!S.inited)st='<span class="st c">not tracked</span>';else if(ignored(f)&&!(f in S.index))st='<span class="st c">ignored</span>';else if(s.conf.includes(f))st='<span class="st u">conflict</span>';else if(s.untracked.includes(f))st='<span class="st u">untracked</span>';else if(s.unstaged.some(x=>x[1]===f))st='<span class="st m">modified</span>';else if(s.staged.some(x=>x[1]===f))st='<span class="st s">staged</span>';return '<li><span>'+esc(f)+'</span>'+st+'</li>'}).join('')+(s?s.staged.filter(x=>x[0]==='deleted').map(x=>'<li><span>'+esc(x[1])+'</span><span class="st s">staged delete</span></li>').join(''):'');
 const rm=$('#gRemote');
 if(!S.remote)rm.innerHTML='<div class="empty" style="padding:0">Not connected. Use <code>git remote add origin &lt;url&gt;</code>.</div>';
 else{const bs=Object.entries(S.remote.branches);rm.innerHTML='<div class="url">'+esc(S.remote.url)+'</div><div class="eyebrow">Branches on GitHub</div><ul>'+(bs.length?bs.map(([b,id])=>'<li>'+esc(b)+' → '+short(id)+' <span class="muted">'+esc(S.commits[id].msg)+'</span>'+(S.tracking[b]!==id?' <span class="pill hot">new</span>':'')+'</li>').join(''):'<li class="muted" style="list-style:none;margin-left:-16px">nothing pushed yet</li>')+'</ul>'+(S.prs.length?'<div class="eyebrow">Pull requests</div><ul>'+S.prs.map(p=>'<li>#'+p.n+' '+esc(p.title)+' <span class="pill'+(p.state==='merged'?' ok':'')+'">'+p.state+'</span></li>').join('')+'</ul>':'')}
 gitGraph();
}
const LANES=['--l0','--l1','--l2','--l3','--l4','--l5'];
function gitGraph(){
 const svg=$('#graph'),empty=$('#graphEmpty');
 const tips=[...Object.values(S.branches),...Object.values(S.tracking),...Object.values(S.tags),headId(),S.merge&&S.merge.target].filter(Boolean);
 const vis=new Set();for(const t of tips)for(const x of ancestors(t))vis.add(x);
 if(!vis.size){svg.setAttribute('width',0);svg.setAttribute('height',0);svg.innerHTML='';empty.hidden=false;return}
 empty.hidden=true;const lane={};const order=['main',...S.border.filter(b=>b!=='main')].filter(b=>b in S.branches);
 const keys=[...order.map(b=>S.branches[b]),...Object.values(S.tracking),...Object.values(S.tags),headId(),S.merge&&S.merge.target].filter(Boolean);
 let li=0;for(const k of keys){let c=k,used=false;while(c&&vis.has(c)&&lane[c]==null){lane[c]=li;used=true;c=S.commits[c].parents[0]}if(used)li++}
 for(const id of vis)if(lane[id]==null)lane[id]=li;
 const lanesUsed=[...new Set(Object.values(lane))].sort((a,b)=>a-b);const remap={};lanesUsed.forEach((l,i)=>remap[l]=i);
 const list=[...vis].map(id=>S.commits[id]).sort((a,b)=>b.t-a.t);const row={};list.forEach((c,i)=>row[c.id]=i);
 const X=l=>18+remap[l]*22,Y=i=>18+i*30,textX=18+lanesUsed.length*22+8;const color=id=>'var('+LANES[remap[lane[id]]%LANES.length]+')';
 let edges='',nodes='',labels='';const h=headId();
 for(const c of list){const x=X(lane[c.id]),y=Y(row[c.id]);
  for(const p of c.parents){if(!vis.has(p))continue;const px=X(lane[p]),py=Y(row[p]);const col=c.parents.length>1&&p!==c.parents[0]?color(p):color(c.id);
   edges+=px===x?'<line x1="'+x+'" y1="'+y+'" x2="'+px+'" y2="'+py+'" stroke="'+col+'" stroke-width="2.5"/>':'<path d="M'+x+' '+y+' C '+x+' '+(y+18)+', '+px+' '+(py-18)+', '+px+' '+py+'" fill="none" stroke="'+col+'" stroke-width="2.5"/>'}
  nodes+='<g><title>'+esc(short(c.id)+' '+c.msg+' ('+c.author+')')+'</title>'+(c.id===h?'<circle cx="'+x+'" cy="'+y+'" r="10" fill="none" stroke="var(--ink)" stroke-width="2"/>':'')+'<circle cx="'+x+'" cy="'+y+'" r="6.5" fill="'+color(c.id)+'" stroke="var(--surface-2)" stroke-width="2"/></g>';
  let tx=textX;labels+='<text x="'+tx+'" y="'+(y+4)+'" font-family="JetBrains Mono, monospace" font-size="11.5" fill="var(--ink-2)">'+short(c.id)+'</text>';tx+=62;
  const refs=[];if(S.head.type==='detached'&&S.head.id===c.id)refs.push(['HEAD','var(--ink)']);for(const [b,id] of Object.entries(S.branches))if(id===c.id)refs.push([(b===cur()?'HEAD → ':'')+b,color(c.id)]);for(const [b,id] of Object.entries(S.tracking))if(id===c.id)refs.push(['origin/'+b,'var(--bad)']);for(const [t,id] of Object.entries(S.tags))if(id===c.id)refs.push(['tag: '+t,'var(--warn)']);
  for(const [txt,col] of refs){const w=txt.length*6.9+12;labels+='<rect x="'+tx+'" y="'+(y-9)+'" width="'+w+'" height="18" rx="9" fill="var(--surface)" stroke="'+col+'" stroke-width="1.5"/><text x="'+(tx+6)+'" y="'+(y+4)+'" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" fill="var(--ink)">'+esc(txt)+'</text>';tx+=w+6}
  labels+='<text x="'+(tx+2)+'" y="'+(y+4)+'" font-family="IBM Plex Sans, sans-serif" font-size="12.5" fill="var(--ink)">'+esc(c.msg)+(c.author&&c.author!=='you'&&c.author!==S.config['user.name']?' · '+esc(c.author):'')+'</text>'}
 const W=Math.max(textX+560,320),Hh=Y(list.length-1)+20;svg.setAttribute('width',W);svg.setAttribute('height',Hh);svg.setAttribute('viewBox','0 0 '+W+' '+Hh);svg.innerHTML=edges+nodes+labels;
}
