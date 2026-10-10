/* Projects: Linux & the shell */
(()=>{
const O=()=>OPS.st,H=re=>OPS.Hx(re),F=p=>OPS.file(p)||'';
const L=()=>OPS.host('local');
const node=p=>L().fs[p];
function accessLog(){const ips=[['203.0.113.9',9],['198.51.100.4',7],['192.0.2.33',5],['203.0.113.77',3],['198.51.100.12',2]];const paths=['/','/about','/api/products','/login','/cart','/checkout'];const lines=[];let n=0;
 for(const [ip,count] of ips)for(let i=0;i<count;i++){const status=n%7===3?500:n%5===4?404:200;lines.push(ip+' - - [09/Oct/2026:10:'+String(10+n).padStart(2,'0')+':02 +0000] "GET '+paths[n%paths.length]+' HTTP/1.1" '+status+' '+(512+n*37));n++}
 return lines.join('\n')+'\n'}
const LOG=accessLog();
const N500=LOG.split('\n').filter(l=>/" 500 /.test(l)).length;
const BROKEN='server {\n    listen 80\n    root /var/www/html;\n    index index.html;\n}\n';
const FIXED='server {\n    listen 80;\n    root /var/www/html;\n    index index.html;\n}\n';
const ROTATE='#!/bin/bash\nset -e\ncd /home/you/logs\nmkdir -p archive\nmv access.log archive/access-$(date +%F).log\ntouch access.log\necho "Rotated access.log"\n';
const own=(p)=>String((node(p)||{}).m||'');
const T='/home/you/team/';
const APPLOG='2026-10-09 09:58:01 INFO  Server started\n2026-10-09 10:02:13 ERROR Payment provider timeout (order 2201)\n2026-10-09 10:02:40 WARN  Slow query: 912ms\n2026-10-09 10:03:05 ERROR Payment provider timeout (order 2202)\n2026-10-09 10:04:59 INFO  User signed in: femi\n2026-10-09 10:06:44 ERROR Disk usage above 90%\n2026-10-09 10:07:30 INFO  Cache warmed\n';
const ERRS=APPLOG.split('\n').filter(l=>/ERROR/.test(l));
const HEALTH='#!/bin/bash\ncurl -s http://localhost > /dev/null\nif [ $? -eq 0 ]; then\n  echo "nginx: UP"\nelse\n  echo "nginx: DOWN"\nfi\n';
const noWrite=m=>m.length===3&&!/[2367]/.test(m[1])&&!/[2367]/.test(m[2]);

defineProjects('linux',{
guided:{title:'On call: rescue a server, then automate the fix',kind:'ops',
 pitch:'Work an incident end to end: stop a runaway process, read the logs to fix a crashed web server, investigate traffic with pipes, and automate log rotation with a script and cron.',
 setup:o=>{const h=o.H();h.procs.push({pid:4242,user:'you',cpu:98.7,mem:51.3,cmd:'node report-worker.js',stubborn:true});h.pkgs.nginx=true;h.services.nginx={active:false,failed:true,enabled:true,port:80,desc:'A high performance web server',logs:['Starting nginx.service - A high performance web server...','nginx: [emerg] invalid number of arguments in "listen" directive in /etc/nginx/sites-enabled/default:2',"nginx.service: Failed with result 'exit-code'."]};
  o.write('/etc/nginx/sites-available/default',BROKEN);o.write('/etc/nginx/sites-enabled/default','@link:/etc/nginx/sites-available/default');o.write('/var/www/html/index.html','<h1>It works!</h1>\n');o.mkdirp('/home/you/logs');o.write('/home/you/logs/access.log',LOG)},
 intro:'02:14. You have been paged: the machine is slow and the website is down. Start investigating.',
 brief:`<p>You're on call. Monitoring says the server is crawling and the website returns nothing. Work it like a real incident: <b>stop the bleeding</b> first, then <b>find the root cause</b>, then <b>prevent it from happening again</b>.</p>
<p>Watch the <b>Machine</b> panel: busy processes and service states update as you work.</p>
<div class="tip"><b>Goal</b>The site is back, you know who is hammering it, and logs rotate automatically every night.</div>`,
 tasks:[
 {t:'Find the process eating the CPU and stop it.',why:'<code>top</code> (or <code>ps aux</code>) shows what\'s running and how much CPU it uses. Try a normal <code>kill</code> first: it asks the process to exit cleanly. Use <code>kill -9</code> only if it ignores you, because -9 gives it no chance to clean up.',h:'top\nkill 4242\nps aux\nkill -9 4242',c:()=>!L().procs.some(p=>p.pid===4242)&&H(/^(top|htop|ps aux|ps -ef)/)},
 {t:'Find out why nginx is down.',why:'<code>systemctl status</code> tells you <b>that</b> it failed. <code>journalctl -u</code> tells you <b>why</b>. Read the exact line number in the error: it points at the problem.',h:'systemctl status nginx\njournalctl -u nginx',c:()=>H(/^(sudo )?systemctl status nginx/)&&!!O().flags.journal_nginx},
 {t:'Fix the config, test it, restart nginx and check the site answers.',why:'The <code>listen</code> line is missing its semicolon. Always run <code>nginx -t</code> before a restart: a bad config turns a restart into an outage. Then prove it works with a real request.',h:'sudo nano /etc/nginx/sites-available/default\nsudo nginx -t\nsudo systemctl restart nginx\ncurl localhost',f:{'/etc/nginx/sites-available/default':FIXED},c:()=>L().services.nginx.active&&/It works!/.test((O().lastHttp||{}).body||'')},
 {t:'Find which IP address sends the most requests.',why:'Pipes chain small tools: <code>awk</code> pulls out the first column (the IP), <code>sort | uniq -c</code> counts duplicates, <code>sort -rn</code> puts the biggest first and <code>head</code> trims the list. This one-liner answers "who is hammering us?" on any server.',h:"cd ~/logs\nawk '{print $1}' access.log | sort | uniq -c | sort -rn | head -3",c:()=>H(/awk .*print \$1.*\|\s*sort.*\|\s*uniq -c/)},
 {t:'Save every 500 error to errors.txt and count them.',why:'<code>&gt;</code> redirects output into a file, so you can attach evidence to the incident report. <code>wc -l</code> counts the lines.',h:"grep ' 500 ' access.log > errors.txt\nwc -l errors.txt\nhead -3 errors.txt",c:()=>{const e=F('/home/you/logs/errors.txt').split('\n').filter(Boolean);return e.length===N500&&e.every(l=>/" 500 /.test(l))}},
 {t:'Write rotate-logs.sh to archive today\'s log and start a fresh one, then run it.',why:'Logs grow forever and can fill a disk, which is a classic cause of outages. <code>set -e</code> stops the script at the first failing command. <code>$(date +%F)</code> puts today\'s date in the archive name. A script must be <b>executable</b> (<code>chmod +x</code>) before <code>./</code> can run it.',h:'cd ~\nnano rotate-logs.sh\nchmod +x rotate-logs.sh\n./rotate-logs.sh\nls logs/archive',f:{'/home/you/rotate-logs.sh':ROTATE},c:()=>!!node('/home/you/logs/archive/access-2026-10-09.log')&&!!node('/home/you/logs/access.log')&&F('/home/you/logs/access.log')===''},
 {t:'Schedule it every night at 00:05.',why:'The five cron fields are minute, hour, day of month, month and day of week. <code>5 0 * * *</code> means 00:05 every day. Use the script\'s <b>full path</b>: cron doesn\'t start in your home folder.',h:'crontab -e\ncrontab -l',f:{'/var/spool/cron/you':'# m h  dom mon dow   command\n5 0 * * * /home/you/rotate-logs.sh\n'},c:()=>/^5\s+0\s+\*\s+\*\s+\*\s+\/\S*rotate-logs\.sh/m.test(F('/var/spool/cron/you'))&&H(/^crontab -l/)},
 ]},
solo:{title:'Clean up and monitor a shared team server',kind:'ops',
 pitch:'Take over a messy shared machine: kill a rogue process, fix dangerous permissions, make a service survive reboots, extract errors, and add a scheduled health check.',
 setup:o=>{const h=o.H();o.mkdirp(T+'logs');h.cwd='/home/you/team';o.write('deploy.sh','#!/bin/bash\necho "Deploying team app..."\necho "Done"\n');h.fs[T+'deploy.sh'].m='666';o.write('secrets.env','DB_PASSWORD=hunter2\nSTRIPE_KEY=sk_live_example\n');h.fs[T+'secrets.env'].m='644';o.write('logs/app.log',APPLOG);o.write('README.md','# Team server\nAsk Femi before rebooting.\n');
  h.procs.push({pid:6666,user:'you',cpu:97.4,mem:12.1,cmd:'python3 /tmp/.x/miner.py',stubborn:true});h.pkgs.nginx=true;h.services.nginx={active:false,failed:false,enabled:false,port:80,desc:'A high performance web server',logs:['Stopped nginx.service.']};o.write('/etc/nginx/sites-available/default',FIXED);o.write('/etc/nginx/sites-enabled/default','@link:/etc/nginx/sites-available/default');o.write('/var/www/html/index.html','<h1>Team dashboard</h1>\n')},
 intro:'You just inherited ~/team on this shared server. Look around before you change anything.',
 brief:`<p>You've inherited a shared team server, and it's a mess. Everything you need is in <code>~/team</code> and the usual system locations. Investigate before you change things.</p>
<p><b>Your checklist:</b></p><ul><li>Something unknown is burning the CPU. Find it and get rid of it.</li><li><code>secrets.env</code> must be readable and writable by its owner only. <code>deploy.sh</code> must be runnable by its owner, and nobody else may modify it.</li><li>The team dashboard (nginx) is down, and it didn't come back after the last reboot either. Make it run now <b>and</b> after every reboot.</li><li>Put every <code>ERROR</code> line from <code>logs/app.log</code>, and nothing else, into <code>~/team/errors.txt</code>.</li><li>Write <code>~/team/health.sh</code>: it prints <code>nginx: UP</code> when <code>http://localhost</code> answers and <code>nginx: DOWN</code> when it doesn't. Run it to prove it works.</li><li>Run <code>health.sh</code> automatically every 5 minutes.</li></ul>`,
 tasks:[
 {t:'The rogue CPU-hogging process is gone.',now:true,c:()=>!L().procs.some(p=>p.pid===6666),
  miss:()=>H(/^(top|htop|ps)/)?'You looked at the processes but the miner (PID 6666) is still running. It ignores a polite kill. After a normal kill, check with ps aux and use kill -9 if it survived.':'You never looked at the running processes. Start with top or ps aux to find what\'s using the CPU.'},
 {t:'secrets.env is 600, and deploy.sh is executable by its owner and not writable by anyone else.',now:true,c:()=>{const d=own(T+'deploy.sh');return own(T+'secrets.env')==='600'&&/^[57]/.test(d)&&noWrite(d)},
  miss:()=>{const s=own(T+'secrets.env'),d=own(T+'deploy.sh');if(s!=='600')return 'secrets.env is '+s+'. Anyone on the machine can read the database password. chmod 600 secrets.env (owner read and write only).';if(!/^[57]/.test(d))return 'deploy.sh is '+d+', so its owner can\'t execute it. Give the owner x, for example chmod 750 deploy.sh or chmod 755 deploy.sh.';return 'deploy.sh is '+d+', so others can modify a script you run. Anyone could slip a command into it. Use 755 or 750.'}},
 {t:'nginx is running now and enabled to start on boot.',now:true,c:()=>{const s=L().services.nginx;return s.active&&s.enabled},
  miss:()=>{const s=L().services.nginx;if(!s.active)return 'nginx is not running. sudo systemctl start nginx (check with systemctl status nginx).';return 'nginx is running, but it\'s still disabled, so it won\'t come back after the next reboot. That\'s exactly what happened last time. sudo systemctl enable nginx.'}},
 {t:'~/team/errors.txt contains exactly the ERROR lines from logs/app.log.',c:()=>{const e=F(T+'errors.txt').split('\n').filter(Boolean);return e.length===ERRS.length&&e.every((l,i)=>l===ERRS[i])},
  miss:()=>{const f=F(T+'errors.txt');if(!f)return 'There is no ~/team/errors.txt. Redirect grep\'s output into it with >.';const e=f.split('\n').filter(Boolean);if(e.some(l=>!/ERROR/.test(l)))return 'errors.txt contains lines that aren\'t errors. grep ERROR keeps only the matching lines.';return 'errors.txt has '+e.length+' lines, but app.log has '+ERRS.length+' ERROR lines. Did you append (>>) to an old file more than once? Use > to overwrite.'}},
 {t:'health.sh prints "nginx: UP" when the site answers (and you ran it).',c:()=>{const s=F(T+'health.sh');return /curl/.test(s)&&/nginx: DOWN/.test(s)&&/^[57]/.test(own(T+'health.sh'))&&/nginx: UP/.test(O().lastOut||'')&&L().services.nginx.active},
  miss:()=>{const s=F(T+'health.sh');if(!s)return 'There is no ~/team/health.sh.';if(!/curl/.test(s))return 'health.sh never contacts the site. Use curl -s http://localhost, then check its exit code with $?.';if(!/nginx: DOWN/.test(s))return 'health.sh never prints "nginx: DOWN". A health check that can only say UP is useless: test $? and print DOWN in the else branch.';if(!/^[57]/.test(own(T+'health.sh')))return 'health.sh isn\'t executable, so cron can\'t run it. chmod +x health.sh.';return 'You never saw health.sh print "nginx: UP". Start nginx first, then run ./health.sh.'}},
 {t:'cron runs health.sh every 5 minutes, using its full path.',c:()=>/^\*\/5\s+\*\s+\*\s+\*\s+\*\s+\/\S*health\.sh/m.test(F('/var/spool/cron/you')),
  miss:()=>{const c=F('/var/spool/cron/you');if(!/health\.sh/.test(c))return 'Your crontab has no health.sh entry. crontab -e, then add a line.';if(!/^\*\/5\s/m.test(c))return 'The minute field should be */5, meaning every 5 minutes. A plain 5 means "at minute 5 of every hour".';return 'Use the full path (/home/you/team/health.sh). Cron doesn\'t start in your home folder, so relative paths fail silently.'}},
 ],
 warn:[
  {c:()=>H(/chmod\s+(-R\s+)?(0?777|a\+rwx)/),m:'You used chmod 777 at some point. That makes a file writable (and runnable) by everyone. It never fixes a permissions problem correctly.'},
  {c:()=>H(/kill -9/)&&!H(/^kill \d+/),m:'You went straight to kill -9. Send a normal kill (SIGTERM) first so the process can clean up, and use -9 only if it ignores you.'},
  {c:()=>H(/^sudo (chmod|nano|cat|ls|grep|cd|touch|echo|crontab)\b/),m:'You used sudo for commands that didn\'t need it. Root is for system changes only. Running everyday commands as root makes mistakes much more dangerous.'},
  {c:()=>H(/^(sudo )?(chmod|kill|systemctl|crontab)\b/)&&!H(/^(ls|cat|ll|tree)\b/),m:'You changed things without looking first (no ls or cat). On someone else\'s server, always look before you touch.'},
 ],
 ref:[{h:'ls -la\ncat README.md\ntop\nkill 6666\nps aux\nkill -9 6666\nchmod 600 secrets.env\nchmod 750 deploy.sh\nls -l\nsudo systemctl start nginx\nsudo systemctl enable nginx\nsystemctl status nginx\ngrep ERROR logs/app.log > errors.txt\ncat errors.txt'},
  {h:'nano health.sh\nchmod +x health.sh\n./health.sh',f:{'/home/you/team/health.sh':HEALTH}},
  {h:'crontab -e\ncrontab -l',f:{'/var/spool/cron/you':'# m h  dom mon dow   command\n*/5 * * * * /home/you/team/health.sh\n'}}]},
});
})();
