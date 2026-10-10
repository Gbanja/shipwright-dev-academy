/* Track 10: Linux & the shell */
(()=>{
const O=()=>OPS.st,H=re=>OPS.Hx(re),F=p=>OPS.file(p)||'';
const L=()=>OPS.host('local');
const node=p=>L().fs[p];
function accessLog(){const ips=[['203.0.113.9',9],['198.51.100.4',7],['192.0.2.33',5],['203.0.113.77',3],['198.51.100.12',2]];const paths=['/','/about','/api/products','/login','/cart','/checkout'];const lines=[];let n=0;
 for(const [ip,count] of ips)for(let i=0;i<count;i++){const status=n%7===3?500:n%5===4?404:200;lines.push(ip+' - - [09/Oct/2026:10:'+String(10+n).padStart(2,'0')+':02 +0000] "GET '+paths[n%paths.length]+' HTTP/1.1" '+status+' '+(512+n*37));n++}
 return lines.join('\n')+'\n'}
const BACKUP=`#!/bin/bash
set -e

DEST="backup-$(date +%F)"

if [ -d "$DEST" ]; then
  echo "Already backed up today"
  exit 0
fi

mkdir -p "$DEST"
for f in *.txt; do
  cp "$f" "$DEST/"
  echo "Backed up $f"
done
echo "Done"
`;
defineTrack({id:'linux',name:'Linux & the shell',weeks:'1–2 weeks',
lessons:[
{id:'l1',lvl:'Basics',title:'Navigating the filesystem',kind:'ops',
 setup:o=>{['/home/you/Documents','/home/you/Downloads','/home/you/projects'].forEach(d=>o.mkdirp(d));o.write('/home/you/notes.txt','Ideas:\n- learn Linux\n- deploy my site\n');o.write('/home/you/.bashrc','export EDITOR=nano\nalias ll="ls -la"\n')},
 sum:'Everything in Linux lives in one tree starting at /. pwd shows where you are, ls lists (-l for details, -a to include hidden dotfiles), cd moves (cd .. up, cd ~ or plain cd home, cd - back). mkdir -p creates nested folders, touch creates empty files, cp copies, mv moves or renames, and rm deletes with no recycle bin. Absolute paths start at /; relative paths start where you are.',
 keys:['pwd','ls -la','cd .. / cd ~ / cd -','mkdir -p a/b/c','touch file','cp src dst','mv old new','tree','absolute vs relative paths'],
 concept:`<p>Servers, Docker containers and CI runners are almost all Linux, and you control them through the shell. These commands are muscle memory for every engineer.</p>
<div class="tbl-wrap"><table><tr><th>Command</th><th>Does</th></tr>
<tr><td><code>pwd</code></td><td>Print working directory: where am I?</td></tr>
<tr><td><code>ls -la</code></td><td>List everything, with details, including hidden <code>.files</code></td></tr>
<tr><td><code>cd projects</code> / <code>cd ..</code> / <code>cd ~</code></td><td>Go into / up one / home</td></tr>
<tr><td><code>mkdir -p site/css</code></td><td>Make folders, including parents</td></tr>
<tr><td><code>touch index.html</code></td><td>Create an empty file</td></tr>
<tr><td><code>cp a b</code> / <code>mv a b</code></td><td>Copy / move or rename</td></tr>
<tr><td><code>rm file</code> / <code>rm -r dir</code></td><td>Delete. There's no undo.</td></tr></table></div>
<p><b>Absolute</b> paths start at the root (<code>/home/you/projects</code>); <b>relative</b> paths start where you are (<code>projects/site</code>). <code>~</code> means your home folder.</p>
<div class="tip"><b>Speed tips</b>Press Tab to autocomplete in a real terminal, and the Up arrow to repeat commands (that works here too).</div>`,
 tasks:[
  {t:'Show where you are, then list everything including hidden files.',h:'pwd\nls -la',c:()=>H(/^pwd$/)&&H(/^ls -(la|al|a)\b/)},
  {t:'Create projects/site/css in one command, then move into projects/site.',h:'mkdir -p projects/site/css\ncd projects/site',c:()=>L().cwd==='/home/you/projects/site'&&!!node('/home/you/projects/site/css')},
  {t:'Create index.html and css/style.css, then view the tree.',h:'touch index.html css/style.css\ntree',c:()=>!!node('/home/you/projects/site/index.html')&&!!node('/home/you/projects/site/css/style.css')&&H(/^tree/)},
  {t:'Copy ~/notes.txt into this folder and rename the copy to README.md.',h:'cp ~/notes.txt .\nmv notes.txt README.md',c:()=>!!node('/home/you/projects/site/README.md')&&!!node('/home/you/notes.txt')&&!node('/home/you/projects/site/notes.txt')},
  {t:'Go back to your home folder.',h:'cd ~\npwd',c:()=>L().cwd==='/home/you'&&H(/^cd( ~)?$/)},
  {t:'Which path is absolute?',o:['projects/site','../site','/home/you/projects/site','./site'],a:2,e:'Absolute paths start with /, so they mean the same thing wherever you are.'},
 ]},
{id:'l2',lvl:'Basics',title:'Permissions, users & sudo',kind:'ops',
 setup:o=>{o.mkdirp('/home/you/app');o.H().cwd='/home/you/app';o.write('deploy.sh','#!/bin/bash\necho "Deploying the app..."\necho "Done!"\n');o.write('secrets.env','STRIPE_KEY=sk_test_123\n')},
 intro:'You are in ~/app with a deploy script and a secrets file. Run ls -l to see their permissions.',
 sum:'Every file has an owner, a group, and read/write/execute (rwx) permissions for user, group and others. ls -l shows them (-rwxr-xr-x). chmod +x makes a script executable; numeric modes add r=4, w=2, x=1 per group (755 = rwxr-xr-x, 600 = rw-------). sudo runs one command as root. Follow least privilege: protect secrets with 600 and use sudo only when needed.',
 keys:['ls -l','-rwxr-xr-x','chmod +x script.sh','chmod 600 secrets','chmod 755','sudo command','whoami'],
 concept:`<pre class="snip" style="margin-bottom:12px">-rwxr-xr-x  1 you you  48 Oct  9 10:30 deploy.sh
│└┬┘└┬┘└┬┘
│ │  │  └── others: r-x
│ │  └───── group:  r-x
│ └──────── user (owner): rwx
└────────── - file, d directory</pre>
<div class="tbl-wrap"><table><tr><th>Number</th><th>Means</th><th>Typical use</th></tr><tr><td><code>755</code></td><td>rwx r-x r-x</td><td>Scripts and folders</td></tr><tr><td><code>644</code></td><td>rw- r-- r--</td><td>Normal files</td></tr><tr><td><code>600</code></td><td>rw- --- ---</td><td>Secrets and SSH private keys</td></tr></table></div>
<p>r = 4, w = 2, x = 1: add them per group (7 = 4+2+1). <code>sudo</code> runs a single command as root, the all-powerful admin. Installing packages needs it; your everyday work shouldn't.</p>`,
 tasks:[
  {t:'View the files\' permissions.',h:'ls -l',c:()=>H(/^ls -l/)},
  {t:'Try to run ./deploy.sh and read the error.',h:'./deploy.sh',c:()=>H(/^\.\/deploy\.sh/)},
  {t:'Make it executable and run it.',h:'chmod +x deploy.sh\n./deploy.sh',c:()=>/[157]/.test(String(node('/home/you/app/deploy.sh').m)[0])&&/Deploying/.test(O().lastOut||'')},
  {t:'Lock down secrets.env so only you can read or write it.',h:'chmod 600 secrets.env\nls -l secrets.env',c:()=>node('/home/you/app/secrets.env').m==='600'},
  {t:'Update the package list. It needs root, so use sudo.',h:'apt update\nsudo apt update',c:()=>O().flags.aptUpdated},
  {t:'What does chmod 755 give "others"?',o:['Nothing','Read and execute','Read and write','Everything'],a:1,e:'7 for you (rwx), 5 for group (r-x), 5 for others (r-x).'},
 ]},
{id:'l3',lvl:'Operations',title:'Processes, services & logs',kind:'ops',
 setup:o=>{const h=o.H();h.procs.push({pid:3117,user:'you',cpu:99.2,mem:45.1,cmd:'node leak.js',stubborn:true});h.pkgs.nginx=true;h.services.nginx={active:false,failed:true,enabled:true,port:80,desc:'A high performance web server',logs:['Starting nginx.service - A high performance web server...','nginx: [emerg] invalid number of arguments in "listen" directive in /etc/nginx/sites-enabled/default:2',"nginx.service: Failed with result 'exit-code'."]};
  o.write('/etc/nginx/sites-available/default','server {\n    listen 80\n    root /var/www/html;\n    index index.html;\n}\n');o.write('/etc/nginx/sites-enabled/default','@link:/etc/nginx/sites-available/default');o.write('/var/www/html/index.html','<h1>It works!</h1>\n')},
 intro:'Your laptop fan is screaming and the local Nginx site is down. Investigate like an on-call engineer.',
 sum:'top and ps aux show running processes with their PID, CPU and memory. kill PID sends SIGTERM (a polite request to stop); kill -9 PID sends SIGKILL (immediate, for stuck processes). systemd manages services: systemctl status, start, stop, restart, enable. journalctl -u service shows a service\'s logs, which usually tell you exactly why it failed. Test configs before restarting (nginx -t).',
 keys:['top / ps aux','kill PID','kill -9 PID','systemctl status nginx','journalctl -u nginx','sudo nginx -t','sudo systemctl restart nginx'],
 concept:`<p>When something is slow or down, look before you change anything:</p>
<div class="tbl-wrap"><table><tr><th>Question</th><th>Command</th></tr>
<tr><td>What's using the CPU or memory?</td><td><code>top</code>, <code>ps aux</code></td></tr>
<tr><td>Stop a process</td><td><code>kill PID</code> (SIGTERM, polite) → <code>kill -9 PID</code> (SIGKILL, forced)</td></tr>
<tr><td>Is the service running?</td><td><code>systemctl status nginx</code></td></tr>
<tr><td>Why did it fail?</td><td><code>journalctl -u nginx</code></td></tr>
<tr><td>Is my config valid?</td><td><code>sudo nginx -t</code></td></tr>
<tr><td>Apply the fix</td><td><code>sudo systemctl restart nginx</code></td></tr></table></div>
<div class="tip"><b>Read the logs first</b>Nine times out of ten the log line names the exact file and line number. Restarting without reading only hides the problem.</div>`,
 tasks:[
  {t:'Find the process hogging the CPU.',h:'top',c:()=>H(/^(top|htop|ps aux|ps -ef)/)},
  {t:'Stop it. If it ignores a normal kill, force it.',h:'kill 3117\nkill -9 3117',c:()=>!L().procs.some(p=>p.pid===3117)},
  {t:'Check the status of the nginx service.',h:'systemctl status nginx',c:()=>H(/^systemctl status nginx/)},
  {t:'Read nginx\'s logs to find out why it failed.',h:'journalctl -u nginx',c:()=>O().flags.journal_nginx},
  {t:'Fix the config (a missing semicolon), test it, and restart nginx.',h:'sudo nano /etc/nginx/sites-available/default\nsudo nginx -t\nsudo systemctl restart nginx',f:{'/etc/nginx/sites-available/default':'server {\n    listen 80;\n    root /var/www/html;\n    index index.html;\n}\n'},c:()=>L().services.nginx.active},
  {t:'Confirm the site answers.',h:'curl localhost',c:()=>/It works!/.test((O().lastHttp||{}).body||'')},
  {t:'Why try kill (SIGTERM) before kill -9 (SIGKILL)?',o:['kill -9 is slower','SIGTERM lets the program save work and clean up; SIGKILL stops it instantly with no cleanup','They are identical','SIGKILL needs a password'],a:1,e:'Use -9 only when a process won\'t respond to a normal stop.'},
 ]},
{id:'l4',lvl:'Text power tools',title:'Pipes, grep, sed & awk',kind:'ops',
 setup:o=>{o.mkdirp('/home/you/logs');o.H().cwd='/home/you/logs';o.write('access.log',accessLog());o.write('app.log','2026-10-09 10:01:12 INFO  Server started on :3000\n2026-10-09 10:02:40 WARN  Slow query: 812ms\n2026-10-09 10:03:05 ERROR Payment provider timeout (order 1042)\n2026-10-09 10:03:59 INFO  User signed in: ada\n2026-10-09 10:05:17 ERROR Payment provider timeout (order 1043)\n2026-10-09 10:06:30 INFO  Cache warmed\n2026-10-09 10:08:44 ERROR Database connection refused\n2026-10-09 10:09:02 WARN  Retrying database connection\n');o.write('.env','PORT=3000\nDEBUG=true\nLOG_LEVEL=info\n')},
 intro:'You are in ~/logs with a web server access.log, an app.log and a .env. Answer questions with one-liners.',
 sum:'The pipe | sends one command\'s output into the next, so small tools combine into powerful one-liners. grep finds matching lines (-c counts, -i ignores case, -v inverts, -r searches folders). wc -l counts lines, sort and uniq -c count duplicates, head limits output. awk \'{print $1}\' picks columns, and sed \'s/old/new/\' replaces text (-i edits the file in place).',
 keys:['cmd | cmd','grep ERROR app.log','grep -c " 500 " access.log','wc -l','awk \'{print $1}\'','sort | uniq -c | sort -rn | head -3','sed -i \'s/a/b/\' file'],
 concept:`<p>The Unix philosophy: small tools that do one thing, connected with pipes.</p>
<pre class="snip" style="margin-bottom:12px">grep ERROR app.log                       # lines containing ERROR
grep -c ' 500 ' access.log               # how many 500 responses?
awk '{print $1}' access.log              # first column (the IP)
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -3
#   ↑ IPs          ↑ group   ↑ count    ↑ biggest first  ↑ top 3
sed -i 's/DEBUG=true/DEBUG=false/' .env  # edit in place</pre>
<div class="tip"><b>On call</b>"Which IP is hammering us?" and "How many errors in the last hour?" are answered exactly like this, on real servers, every day.</div>`,
 tasks:[
  {t:'Show only the ERROR lines from app.log.',h:'grep ERROR app.log',c:()=>H(/^grep\b.*ERROR.*app\.log/)},
  {t:'Count how many requests in access.log returned a 500.',h:"grep -c ' 500 ' access.log",c:()=>H(/^grep -c .*500.* access\.log/)},
  {t:'How many 500 responses did you find?',o:['2','4','7','12'],a:1,e:'grep -c counts matching lines without printing them.'},
  {t:'Find the top 3 IP addresses by number of requests.',h:"awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -3",c:()=>H(/awk .*print \$1.*\|\s*sort.*\|\s*uniq -c/)},
  {t:'Turn DEBUG off in .env with sed, editing the file in place.',h:"sed -i 's/DEBUG=true/DEBUG=false/' .env\ncat .env",c:()=>/DEBUG=false/.test(F('/home/you/logs/.env'))&&!/DEBUG=true/.test(F('/home/you/logs/.env'))},
  {t:'Count the lines in access.log.',h:'wc -l access.log',c:()=>H(/^wc -l access\.log/)},
  {t:'In cmd1 | cmd2, what does the pipe do?',o:['Runs both at the same time with no connection','Sends cmd1\'s output as cmd2\'s input','Saves output to a file','Runs cmd2 only if cmd1 fails'],a:1,e:'> writes to a file; && runs the next command only on success; | connects output to input.'},
 ]},
{id:'l5',lvl:'Automation',title:'Bash scripting & cron',kind:'ops',
 setup:o=>{o.mkdirp('/home/you/docs');o.H().cwd='/home/you/docs';o.write('a.txt','alpha\n');o.write('b.txt','bravo\n');o.write('c.txt','charlie\n')},
 intro:'You are in ~/docs with three .txt files. Write a backup script, then schedule it.',
 sum:'A Bash script is commands in a file, starting with #!/bin/bash and made executable with chmod +x. Use variables (DEST="backup-$(date +%F)"), quote them ("$DEST"), use if [ -d "$DIR" ]; then ... fi for checks, and for f in *.txt; do ... done for loops. set -e stops the script at the first error. Schedule scripts with cron (crontab -e): five fields are minute, hour, day of month, month and day of week.',
 keys:['#!/bin/bash','set -e','VAR="value" / "$VAR"','$(date +%F)','if [ -d "$DIR" ]; then ... fi','for f in *.txt; do ... done','crontab -e','0 2 * * * /path/script.sh'],
 concept:`<pre class="snip" style="margin-bottom:12px">#!/bin/bash
set -e                              # stop on the first error

DEST="backup-$(date +%F)"           # e.g. backup-2026-10-09

if [ -d "$DEST" ]; then             # -d: is it a directory?
  echo "Already backed up today"
  exit 0
fi

mkdir -p "$DEST"
for f in *.txt; do                  # loop over matching files
  cp "$f" "$DEST/"
  echo "Backed up $f"
done</pre>
<h4>cron</h4>
<pre class="snip" style="margin-bottom:12px"># ┌ minute  ┌ hour  ┌ day of month  ┌ month  ┌ day of week
  0         2       *               *        *     /home/you/docs/backup.sh   # every day at 02:00</pre>
<div class="tip"><b>Always quote variables</b><code>"$f"</code>, not <code>$f</code>. Unquoted variables break on filenames with spaces.</div>`,
 tasks:[
  {t:'Write backup.sh: copy every .txt into a dated backup folder, skipping if today\'s backup exists.',h:'nano backup.sh',f:{'backup.sh':BACKUP},c:()=>/for\s+\w+\s+in/.test(F('/home/you/docs/backup.sh'))&&/^#!\/bin\/bash/.test(F('/home/you/docs/backup.sh'))},
  {t:'Make it executable and run it.',h:'chmod +x backup.sh\n./backup.sh\nls backup-*',c:()=>!!node('/home/you/docs/backup-2026-10-09/a.txt')&&!!node('/home/you/docs/backup-2026-10-09/c.txt')},
  {t:'Run it again: it should say "Already backed up today".',h:'./backup.sh',c:()=>/Already backed up today/.test(O().lastOut||'')},
  {t:'Schedule it every day at 02:00 with crontab -e, then list your cron jobs.',h:'crontab -e\ncrontab -l',f:{'/var/spool/cron/you':'# m h  dom mon dow   command\n0 2 * * * /home/you/docs/backup.sh\n'},c:()=>/^0\s+2\s+\*\s+\*\s+\*\s+\S*backup\.sh/m.test(F('/var/spool/cron/you'))&&H(/^crontab -l/)},
  {t:'What does */15 * * * * mean in cron?',o:['Every 15 hours','Every 15 minutes','On the 15th of each month','At 15:00'],a:1,e:'*/15 in the minute field means every 15 minutes.'},
  {t:'Why put set -e at the top of a script?',o:['It makes the script faster','The script stops at the first failing command instead of continuing in a broken state','It enables colors','It\'s required syntax'],a:1,e:'Without it, a failed cp could be followed by a delete. With it, the script stops right away.'},
 ]},
{id:'l6',lvl:'Remote',title:'SSH keys & remote servers',kind:'ops',
 setup:o=>{const h=o.addRemote('203.0.113.20',{name:'web1',user:'deploy'});o.mkdirp('/home/deploy/.ssh',h);o.write('/home/deploy/.ssh/authorized_keys','ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIworkkey000 work@laptop\n',h);
  o.mkdirp('/home/you/.ssh');o.write('/home/you/.ssh/work_key','-----BEGIN OPENSSH PRIVATE KEY-----\n(work key)\n-----END OPENSSH PRIVATE KEY-----\n');o.write('/home/you/.ssh/work_key.pub','ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIworkkey000 work@laptop\n');o.write('/home/you/site.tar.gz','(archive)')},
 intro:'A server web1 (203.0.113.20) is waiting, with user deploy. Set up key-based login. Any password works the first time.',
 sum:'SSH keys replace passwords: ssh-keygen -t ed25519 creates a private key (keep it secret, chmod 600) and a .pub public key. ssh-copy-id user@host appends your public key to the server\'s ~/.ssh/authorized_keys, and after that ssh user@host logs in without a password. scp copies files over SSH. SSH refuses private keys that other users can read.',
 keys:['ssh-keygen -t ed25519 -C "email"','~/.ssh/id_ed25519 (private) / .pub (public)','ssh-copy-id user@host','ssh user@host','scp file user@host:~','chmod 600 private key','ssh -i key user@host'],
 concept:`<p>SSH (Secure Shell) is how you control servers. Passwords can be guessed; <b>keys</b> can't be in practice.</p>
<div class="tbl-wrap"><table><tr><th>File</th><th>Where it goes</th><th>Share it?</th></tr>
<tr><td><code>~/.ssh/id_ed25519</code> (private)</td><td>Stays on your laptop, <code>chmod 600</code></td><td><b>Never</b></td></tr>
<tr><td><code>~/.ssh/id_ed25519.pub</code> (public)</td><td>Servers (<code>authorized_keys</code>), GitHub</td><td>Yes, that's its job</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">ssh-keygen -t ed25519 -C "you@example.com"
ssh-copy-id deploy@203.0.113.20        # installs your public key on the server
ssh deploy@203.0.113.20                # now logs in with the key
scp site.tar.gz deploy@203.0.113.20:~  # copy a file to the server</pre>
<div class="tip"><b>Then harden</b>Once keys work, real servers disable password login (<code>PasswordAuthentication no</code> in sshd_config) and often install fail2ban.</div>`,
 tasks:[
  {t:'Generate an ed25519 key pair (press Enter at each prompt).',h:'ssh-keygen -t ed25519 -C "you@example.com"\n\n\n',c:()=>!!node('/home/you/.ssh/id_ed25519')&&!!node('/home/you/.ssh/id_ed25519.pub')},
  {t:'Install your public key on the server.',h:'ssh-copy-id deploy@203.0.113.20\nany-password',c:()=>{const h=OPS.host('203.0.113.20');const pub=F('/home/you/.ssh/id_ed25519.pub');return pub&&(OPS.read('/home/deploy/.ssh/authorized_keys',h)||'').includes(pub.split(' ')[1])}},
  {t:'Log in with your key (no password prompt), then exit.',h:'ssh deploy@203.0.113.20\nexit',c:()=>O().flags.keyLogin&&O().cur==='local'},
  {t:'Copy site.tar.gz to the server\'s home folder.',h:'scp site.tar.gz deploy@203.0.113.20:~',c:()=>!!OPS.read('/home/deploy/site.tar.gz',OPS.host('203.0.113.20'))},
  {t:'Log in with ~/.ssh/work_key. SSH refuses it until you fix its permissions.',h:'ssh -i ~/.ssh/work_key deploy@203.0.113.20\nchmod 600 ~/.ssh/work_key\nssh -i ~/.ssh/work_key deploy@203.0.113.20\nexit',c:()=>node('/home/you/.ssh/work_key').m==='600'&&H(/^ssh -i ~\/\.ssh\/work_key deploy@/)},
  {t:'Which key do you paste into GitHub or a server?',o:['id_ed25519 (private)','id_ed25519.pub (public)','Both','Neither'],a:1,e:'Public keys are meant to be shared. If your private key leaks, delete that key pair and make a new one.'},
 ]},
],
quizzes:{linux:[
 {q:'Which command shows hidden files too?',o:['ls','ls -la','ls -h','dir'],a:1,e:'-a includes dotfiles; -l adds details.'},
 {q:'A script says "Permission denied" when you run ./script.sh. Fix?',o:['sudo rm script.sh','chmod +x script.sh','mv script.sh /bin','Restart'],a:1,e:'It needs the execute bit.'},
 {q:'Best permissions for an SSH private key?',o:['777','755','644','600'],a:3,e:'Only you can read or write it; SSH refuses anything looser.'},
 {q:'nginx won\'t start. First command to run?',o:['sudo reboot','journalctl -u nginx (or systemctl status nginx)','apt remove nginx','kill -9 1'],a:1,e:'Read the logs; they usually name the exact problem.'},
 {q:"What does awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -3 do?",o:['Deletes the log','Shows the 3 most frequent values of the first column','Counts lines','Sorts the file in place'],a:1,e:'Extract, group, count, sort descending, take the top 3.'},
 {q:'0 2 * * * in crontab means…',o:['Every 2 minutes','Every day at 02:00','On the 2nd of every month','Twice a day'],a:1,e:'Minute 0, hour 2, every day.'},
]},
real:[
 {id:'linux-r1',t:'Get a real Linux shell',p:'On Windows, install WSL (Ubuntu). On macOS, the Terminal is already Unix-like. Practise the navigation commands daily for a week.',s:'wsl --install -d Ubuntu'},
 {id:'linux-r2',t:'Write a useful Bash script',p:'Automate something you do often (backups, project setup, cleaning node_modules) and make it executable.',s:'nano ~/bin/mytool.sh\nchmod +x ~/bin/mytool.sh'},
 {id:'linux-r3',t:'Set up SSH keys for GitHub',p:'Generate a key, add the public key to GitHub, and test the connection.',s:'ssh-keygen -t ed25519 -C "you@example.com"\ncat ~/.ssh/id_ed25519.pub\nssh -T git@github.com'},
 {id:'linux-r4',t:'Practise with the OverTheWire Bandit game',p:'A free game that teaches Linux by solving puzzles over SSH. Try the first 10 levels.',s:'ssh bandit0@bandit.labs.overthewire.org -p 2220'},
]});
})();
