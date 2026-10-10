/* Track 3: Deployment & CI/CD */
(()=>{
const O=()=>OPS.st,H=re=>OPS.Hx(re),F=p=>OPS.file(p)||'';
const last=()=>O().lastHttp||{};
const nextProject=(o,name)=>{o.mkdirp('/home/you/'+name+'/app');o.H().cwd='/home/you/'+name;o.write('package.json',JSON.stringify({name,version:'1.0.0',scripts:{dev:'next dev',build:'next build',start:'next start',test:'vitest run'},dependencies:{next:'14.2.15',react:'18.3.1','react-dom':'18.3.1'},devDependencies:{vitest:'2.1.2'}},null,2)+'\n');o.write('app/page.tsx','export default function Home() {\n  return <h1>Hi, I build things for the web.</h1>;\n}\n');o.write('app/layout.tsx','export default function RootLayout({ children }) {\n  return <html><body>{children}</body></html>;\n}\n');o.mkdirp('/home/you/'+name+'/.git')};
const NGINX_PROXY='server {\n    listen 80;\n    server_name portfolio.dev www.portfolio.dev;\n\n    location / {\n        proxy_pass http://localhost:3000;\n        proxy_set_header Host $host;\n        proxy_set_header X-Real-IP $remote_addr;\n    }\n}\n';
const CI_YML='name: CI\n\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm test\n';
defineTrack({id:'deploy',name:'Deployment & CI/CD',weeks:'~2 weeks',
lessons:[
{id:'p1',lvl:'The web',title:'How the web works: DNS, HTTP & HTTPS',kind:'ops',
 setup:o=>{const s=o.st;s.dns['github.com']=[{type:'A',value:'140.82.121.4'}];s.dns['www.github.com']=[{type:'CNAME',value:'github.com'}];s.dns['portfolio.dev']=[];},
 sum:'Typing a URL triggers a DNS lookup that turns the domain into an IP address (A record) or into another name first (CNAME). The browser then sends an HTTP request to that server, normally over HTTPS on port 443, and gets back a status code (200 OK, 301 redirect, 404 not found, 500 server error), headers and a body.',
 keys:['dig domain','A record','CNAME record','curl -I https://...','status codes','port 443'],
 concept:`<p>Before you deploy anything, know what happens when someone types your URL:</p>
<div class="flow"><span>Browser</span><em>1. DNS lookup →</em><span>IP address</span><em>2. TLS handshake →</em><span>HTTPS connection</span><em>3. HTTP request →</em><span>Server</span><em>4. response →</em><span>Page</span></div>
<div class="tbl-wrap"><table><tr><th>DNS record</th><th>Points a name at…</th><th>Example</th></tr>
<tr><td><b>A</b></td><td>an IPv4 address</td><td><code>portfolio.dev → 76.76.21.21</code></td></tr>
<tr><td><b>CNAME</b></td><td>another name</td><td><code>www.portfolio.dev → portfolio.dev</code></td></tr>
<tr><td><b>MX</b></td><td>mail servers</td><td>for your email</td></tr>
<tr><td><b>TXT</b></td><td>text, e.g. domain verification</td><td>Google / Vercel ownership checks</td></tr></table></div>
<h4>Status codes you'll see every day</h4>
<ul><li><b>2xx</b> success: 200 OK, 201 Created</li><li><b>3xx</b> redirect: 301 permanent, 302/307 temporary</li><li><b>4xx</b> the client's fault: 400 bad request, 401 not logged in, 403 forbidden, 404 not found</li><li><b>5xx</b> the server's fault: 500 error, 502 bad gateway, 503 unavailable</li></ul>
<div class="tip"><b>Tool tip</b><code>dig</code> shows DNS records; <code>curl -I</code> shows only the response headers. Both are your first debugging tools when "the site is down".</div>`,
 tasks:[
  {t:'Look up the DNS records for github.com.',h:'dig github.com',c:()=>(O().flags.dug||[]).includes('github.com')},
  {t:'Look up www.github.com and notice it\'s a CNAME.',h:'dig www.github.com',c:()=>(O().flags.dug||[]).includes('www.github.com')},
  {t:'Fetch only the response headers of https://example.com.',h:'curl -I https://example.com',c:()=>H(/^curl (-I|--head) https?:\/\/example\.com/)},
  {t:'Your site works at portfolio.dev but you want www.portfolio.dev too. Which record?',o:['A record for www pointing at 0.0.0.0','CNAME record: www → portfolio.dev','MX record','TXT record'],a:1,e:'A CNAME makes www an alias of the root domain, so both follow the same A record.'},
  {t:'A user reports a 502 Bad Gateway. Where is the problem most likely?',o:['The user\'s browser','The proxy (e.g. Nginx) is up but the app behind it isn\'t responding','DNS','Their Wi-Fi'],a:1,e:'502 means the gateway or proxy got no valid answer from the upstream app. Check that the app process is running.'},
  {t:'Which port does HTTPS use by default?',o:['80','22','443','3000'],a:2,e:'HTTP is 80, HTTPS is 443, SSH is 22. 3000 is just a common dev-server port.'},
 ]},
{id:'p2',lvl:'Platforms',title:'Deploying a frontend to Vercel',kind:'ops',
 setup:o=>nextProject(o,'portfolio'),
 intro:'You are in ~/portfolio, a Next.js site. Check package.json, then build it.',
 sum:'Platforms like Vercel and Netlify build and host frontends for you. Build locally first (npm run build) to catch errors, log in with vercel login, run vercel to create a preview deployment with its own URL, then vercel --prod to update the production site. Every deployment is immutable and keeps its own URL.',
 keys:['npm run build','vercel login','vercel','vercel --prod','vercel ls','preview vs production'],
 concept:`<p>For frontends and full-stack apps like Next.js, <b>Vercel</b> (or Netlify, or Cloudflare Pages) is the fastest path to production. You don't manage servers: you push code, the platform builds it and serves it from a global network.</p>
<h4>Preview vs production</h4>
<ul><li><b>Preview deployments</b> get a unique URL for every push or branch. You use them to test and to share with reviewers before merging.</li><li><b>Production</b> is what your real domain serves. <code>vercel --prod</code> (or merging to <code>main</code>) updates it.</li></ul>
<p>Every deployment is <b>immutable</b>: it never changes after it's built. Rolling back just points production at an older deployment.</p>
<div class="tip"><b>Habit</b>Run <code>npm run build</code> locally before you deploy. A build error on your machine is a build error on Vercel.</div>`,
 tasks:[
  {t:'Build the project locally to make sure it compiles.',h:'npm run build',c:()=>O().flags.npm_build},
  {t:'Log in to Vercel (press Enter at the prompt).',h:'vercel login\n',c:()=>O().vercel.login},
  {t:'Create a preview deployment.',h:'vercel',c:()=>O().vercel.deps.some(d=>d.target==='preview')},
  {t:'Deploy to production.',h:'vercel --prod',c:()=>!!O().vercel.prod},
  {t:'Check the production site responds.',h:'curl -I https://portfolio.vercel.app',c:()=>H(/^curl.*portfolio\.vercel\.app/)&&last().status===200},
  {t:'Why are preview deployments useful?',o:['They are faster than production','Every change gets its own live URL to test and review before it reaches real users','They are free and production isn\'t','They skip the build step'],a:1,e:'Reviewers click a real link instead of pulling your branch. Bugs get caught before production.'},
 ]},
{id:'p3',lvl:'Servers',title:'A Linux VPS: SSH, Nginx, firewall & HTTPS',kind:'ops',
 setup:o=>{const h=o.addRemote('203.0.113.10',{name:'vps',user:'root',domain:'portfolio.dev'});h.services.app={active:true,enabled:true,port:3000,cmd:'node /opt/portfolio/server.js',logs:['Portfolio app listening on :3000'],resp:'<h1>Portfolio app</h1><p>served by Node on port 3000</p>',ctype:'text/html'};o.st.dns['www.portfolio.dev']=[{type:'CNAME',value:'portfolio.dev'}]},
 intro:'You rented a VPS at 203.0.113.10 (portfolio.dev points to it). A Node app already runs on port 3000. Your job: put Nginx in front, lock down the firewall, and add HTTPS. Any password works for SSH in the sandbox.',
 sum:'On a VPS you manage everything yourself. SSH in, install packages with apt, allow SSH in the firewall BEFORE enabling it (ufw allow OpenSSH), put Nginx in front of the app as a reverse proxy (proxy_pass http://localhost:3000), test the config with nginx -t, reload Nginx, and add a free HTTPS certificate with certbot.',
 keys:['ssh root@IP','apt update && apt install nginx','ufw allow OpenSSH','ufw allow "Nginx Full"','proxy_pass http://localhost:3000','nginx -t','systemctl reload nginx','certbot --nginx -d domain'],
 concept:`<p>A <b>VPS</b> (virtual private server, e.g. from DigitalOcean, Hetzner or AWS Lightsail) gives you a Linux machine with a public IP. Total control, total responsibility.</p>
<div class="flow"><span>Internet :80/:443</span><em>→</em><span>Nginx (reverse proxy)</span><em>proxy_pass →</em><span>Node app :3000</span></div>
<p><b>Why Nginx in front?</b> It handles HTTPS, serves static files fast, buffers slow clients, and lets you run several apps on one server. Your app only listens on localhost.</p>
<pre class="snip" style="margin-bottom:12px">server {
    listen 80;
    server_name portfolio.dev;
    location / {
        proxy_pass http://localhost:3000;
    }
}</pre>
<div class="tip"><b>Don't lock yourself out</b>Always run <code>ufw allow OpenSSH</code> before <code>ufw enable</code>. Enable the firewall without allowing SSH and your connection is cut off for good.</div>`,
 tasks:[
  {t:'SSH into the server as root.',h:'ssh root@203.0.113.10\nany-password',c:()=>O().flags.sshed==='203.0.113.10'},
  {t:'Update the package list and install Nginx.',h:'apt update\napt install -y nginx',c:()=>!!OPS.host('203.0.113.10').pkgs.nginx},
  {t:'Allow SSH and web traffic, then turn on the firewall.',h:'ufw allow OpenSSH\nufw allow "Nginx Full"\nufw enable',c:()=>{const h=OPS.host('203.0.113.10');return h.ufw.on&&!O().flags.lockedOut&&h.ufw.rules.some(r=>/ssh|22/i.test(r))&&h.ufw.rules.some(r=>/nginx|80|http/i.test(r))}},
  {t:'Point Nginx at the app with proxy_pass, test the config, and reload.',h:'nano /etc/nginx/sites-available/default\nnginx -t\nsystemctl reload nginx',f:{'/etc/nginx/sites-available/default':NGINX_PROXY},c:()=>{const h=OPS.host('203.0.113.10');const c=OPS.read('/etc/nginx/sites-available/default',h)||'';return /proxy_pass\s+http:\/\/(localhost|127\.0\.0\.1):3000/.test(c)&&(O().flags.sv_reload_nginx||O().flags.sv_restart_nginx)}},
  {t:'Go back to your laptop and load http://portfolio.dev.',h:'exit\ncurl http://portfolio.dev',c:()=>O().cur==='local'&&/Portfolio app/.test(last().body||'')},
  {t:'Get a free HTTPS certificate with certbot, then load https://portfolio.dev.',h:'ssh root@203.0.113.10\nany-password\napt install -y certbot python3-certbot-nginx\ncertbot --nginx -d portfolio.dev\nexit\ncurl -I https://portfolio.dev',c:()=>OPS.host('203.0.113.10').https==='portfolio.dev'&&H(/^curl.*https:\/\/portfolio\.dev/)&&last().status===200},
 ]},
{id:'p4',lvl:'Automation',title:'GitHub Actions: CI that runs on every push',kind:'ops',
 setup:o=>{nextProject(o,'portfolio');o.write('src/tax.js','export const rate = 0.08;\nexport const withTax = (n) => Math.round(n * (1 + rate));\n');o.write('src/tax.test.js',"import { withTax } from './tax.js';\ntest('adds tax correctly', () => expect(withTax(100)).toBe(108));\n");o.st.flags.testsFail=()=>!/rate = 0\.08/.test(OPS.read('/home/you/portfolio/src/tax.js',OPS.host('local'))||'')},
 intro:'You are in ~/portfolio, which is already a Git repo connected to GitHub. Add a CI workflow so every push runs the tests.',
 sum:'Continuous Integration runs your checks automatically on every push and pull request. A GitHub Actions workflow is a YAML file in .github/workflows/ with a trigger (on: push), jobs that run on a runner (runs-on: ubuntu-latest), and steps that either use a prebuilt action (uses: actions/checkout@v4) or run a command (run: npm test). A red run blocks bad code from being merged.',
 keys:['.github/workflows/ci.yml','on: push','runs-on: ubuntu-latest','uses: actions/checkout@v4','run: npm ci','run: npm test','gh run watch'],
 concept:`<p><b>CI (continuous integration)</b> means a robot checks every change: install, lint, test, build. If anything fails you know within minutes, before the change reaches <code>main</code>.</p>
<pre class="snip" style="margin-bottom:12px">name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  test:
    runs-on: ubuntu-latest       # a fresh virtual machine
    steps:
      - uses: actions/checkout@v4      # get your code
      - uses: actions/setup-node@v4    # install Node
        with:
          node-version: 20
      - run: npm ci                    # clean install from the lockfile
      - run: npm test</pre>
<ul><li><b>Workflow</b>: one YAML file in <code>.github/workflows/</code></li><li><b>Job</b>: runs on its own runner machine; jobs run in parallel unless one <code>needs</code> another</li><li><b>Step</b>: <code>uses</code> a published action, or <code>run</code>s a shell command</li></ul>
<div class="tip"><b>YAML is strict</b>Indentation is meaning. Two spaces per level, never tabs.</div>`,
 tasks:[
  {t:'Create a CI workflow that installs dependencies and runs the tests on every push.',h:'mkdir -p .github/workflows\nnano .github/workflows/ci.yml',f:{'.github/workflows/ci.yml':CI_YML},c:()=>/runs-on/.test(F('/home/you/portfolio/.github/workflows/ci.yml'))},
  {t:'Commit and push. Then watch the run.',h:'git add .\ngit commit -m "Add CI workflow"\ngit push\ngh run watch',c:()=>O().ci.runs.some(r=>r.status==='success')&&O().flags.watched},
  {t:'A teammate changes the tax rate. Edit src/tax.js to rate = 0.10, push, and watch CI catch it.',h:'nano src/tax.js\ngit commit -am "Change tax rate"\ngit push\ngh run watch',f:{'src/tax.js':'export const rate = 0.10;\nexport const withTax = (n) => Math.round(n * (1 + rate));\n'},c:()=>O().ci.runs.some(r=>r.status==='failure')},
  {t:'Fix the rate back to 0.08 and push. CI goes green again.',h:'nano src/tax.js\ngit commit -am "Fix tax rate"\ngit push\ngh run watch',f:{'src/tax.js':'export const rate = 0.08;\nexport const withTax = (n) => Math.round(n * (1 + rate));\n'},c:()=>{const r=O().ci.runs;return r.length>=3&&r[r.length-1].status==='success'&&r.some(x=>x.status==='failure')}},
  {t:'What is the main value of CI?',o:['It deploys faster','It catches broken code automatically on every change, before it reaches main','It replaces code review','It makes the app run faster'],a:1,e:'CI is a safety net. Teams usually protect main so a pull request can\'t merge until CI passes.'},
 ]},
{id:'p5',lvl:'Automation',title:'Environment variables & secrets',kind:'ops',
 setup:o=>{nextProject(o,'portfolio');o.write('.gitignore','node_modules\n.next\n');o.st.vercel.login=true},
 intro:'You are in ~/portfolio. The app needs a DATABASE_URL, and the deploy workflow needs a Vercel token. Keep both out of Git.',
 sum:'Configuration that differs per environment, and every secret, goes in environment variables, never in code. Locally they live in .env, which must be in .gitignore. In production you set them on the platform (vercel env add), and CI reads secrets from GitHub Actions secrets (gh secret set, used as ${{ secrets.NAME }}). Anything prefixed NEXT_PUBLIC_ is sent to the browser, so never put secrets there.',
 keys:['.env','.gitignore','vercel env add NAME production','gh secret set NAME','${{ secrets.NAME }}','NEXT_PUBLIC_ is public'],
 concept:`<p>Three places environment variables live:</p>
<div class="tbl-wrap"><table><tr><th>Where</th><th>How</th><th>Committed to Git?</th></tr>
<tr><td>Your laptop</td><td><code>.env</code> / <code>.env.local</code> file</td><td><b>Never</b>. Add it to .gitignore</td></tr>
<tr><td>Hosting (Vercel, Render…)</td><td><code>vercel env add</code> or the dashboard</td><td>No, stored encrypted</td></tr>
<tr><td>CI (GitHub Actions)</td><td>Repo Settings → Secrets, or <code>gh secret set</code></td><td>No; used as <code>\${{ secrets.NAME }}</code></td></tr></table></div>
<p>Commit a <code>.env.example</code> with the variable <i>names</i> and fake values, so teammates know what to set.</p>
<div class="tip"><b>Public by design</b>In Next.js, variables named <code>NEXT_PUBLIC_*</code> are baked into the JavaScript sent to browsers. Anyone can read them. Secrets must never use that prefix.</div>`,
 tasks:[
  {t:'Create a .env with a DATABASE_URL.',h:'echo "DATABASE_URL=postgres://user:pass@localhost:5432/portfolio" > .env',c:()=>/DATABASE_URL=/.test(F('/home/you/portfolio/.env'))},
  {t:'Make sure Git ignores .env.',h:'echo ".env" >> .gitignore\ncat .gitignore',c:()=>/^\.env$/m.test(F('/home/you/portfolio/.gitignore'))},
  {t:'Add DATABASE_URL to Vercel\'s production environment (type any value at the prompt).',h:'vercel env add DATABASE_URL production\npostgres://prod-user:prod-pass@db.example.com:5432/portfolio',c:()=>!!O().vercel.env.DATABASE_URL},
  {t:'Store a VERCEL_TOKEN secret for GitHub Actions.',h:'gh secret set VERCEL_TOKEN\nfake-token-123',c:()=>!!O().ci.secrets.VERCEL_TOKEN},
  {t:'Add a deploy workflow that uses the secret, push, and watch it pass.',h:'mkdir -p .github/workflows\nnano .github/workflows/deploy.yml\ngit add .\ngit commit -m "Add deploy workflow"\ngit push\ngh run watch',f:{'.github/workflows/deploy.yml':'name: Deploy\n\non:\n  push:\n    branches: [main]\n\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npx vercel deploy --prod --token ${{ secrets.VERCEL_TOKEN }}\n'},c:()=>O().ci.runs.some(r=>r.status==='success'&&r.deployed)},
  {t:'Which variable is safe to expose to the browser?',o:['NEXT_PUBLIC_STRIPE_SECRET_KEY','DATABASE_URL','NEXT_PUBLIC_SITE_NAME','JWT_SECRET'],a:2,e:'Only non-secret values belong in NEXT_PUBLIC_ variables. A site name is fine; keys and passwords are not.'},
 ]},
{id:'p6',lvl:'Operations',title:'Monitoring, logs & rollbacks',kind:'ops',
 setup:o=>{nextProject(o,'portfolio');const s=o.st;s.vercel.login=true;s.vercel.linked=true;const good={host:'portfolio-a1b2c3d4e-you.vercel.app',url:'https://portfolio-a1b2c3d4e-you.vercel.app',target:'production',status:'Ready',at:1,broken:false,body:'<html><title>portfolio</title> … projects page works …</html>'};const bad={host:'portfolio-f9e8d7c6b-you.vercel.app',url:'https://portfolio-f9e8d7c6b-you.vercel.app',target:'production',status:'Ready',at:2,broken:true};s.vercel.deps=[good,bad];s.vercel.prod=bad;s.vercel.prevProd=good;s.vercel.aliasHosts=['portfolio.vercel.app']},
 intro:'It\'s 9pm. Ten minutes ago someone shipped to production. Users are reporting errors. Find out what\'s wrong and fix it fast.',
 sum:'When production breaks, restore service first and debug second. Confirm the problem (curl), read the logs (vercel logs, journalctl -u app), then roll back to the last good deployment (vercel rollback), which is instant because deployments are immutable. Afterwards, fix the bug properly and write a short postmortem.',
 keys:['curl -I https://site','vercel logs URL','vercel rollback','journalctl -u app','restore first, debug second'],
 concept:`<p>Every team ships a bug to production eventually. What separates professionals is the response:</p>
<ol><li><b>Confirm</b> the problem yourself: <code>curl -I</code> the site, check the status code.</li>
<li><b>Look</b> at logs and errors: <code>vercel logs</code>, <code>journalctl -u app</code>, or your error tracker (Sentry).</li>
<li><b>Restore service</b>: roll back to the last good version. Don't debug while users suffer.</li>
<li><b>Fix forward</b> calmly: reproduce, write a test, fix, deploy.</li>
<li><b>Learn</b>: a short, blameless postmortem. What happened, why, and what stops it from happening again.</li></ol>
<div class="tip"><b>Monitoring</b>In real projects you also set up uptime checks (Better Stack, UptimeRobot) and error tracking (Sentry), so you hear about problems before your users tell you.</div>`,
 tasks:[
  {t:'Confirm the problem: request the production site.',h:'curl -I https://portfolio.vercel.app',c:()=>{if(last().status===500)O().flags.saw500=true;return !!O().flags.saw500}},
  {t:'Read the production logs to see the error.',h:'vercel logs https://portfolio-f9e8d7c6b-you.vercel.app',c:()=>O().flags.vlogs},
  {t:'Restore service by rolling back to the previous deployment.',h:'vercel rollback',c:()=>O().flags.rolledBack&&O().vercel.prod&&!O().vercel.prod.broken},
  {t:'Verify the site is healthy again.',h:'curl -I https://portfolio.vercel.app',c:()=>O().flags.rolledBack&&last().status===200},
  {t:'In an outage, what comes first?',o:['Find the root cause in the code','Restore service (roll back), then investigate','Write the postmortem','Email all users'],a:1,e:'Users care that it works. Rollback first; root-cause analysis happens once things are calm.'},
  {t:'What makes a good postmortem?',o:['Naming who caused it','A blameless timeline, the root cause, and concrete actions that prevent a repeat','Keeping it secret','Only describing the fix'],a:1,e:'Blameless postmortems make people share honestly, which is how systems actually improve.'},
 ]},
],
quizzes:{deploy:[
 {q:'What does a DNS A record do?',o:['Points a domain at an IPv4 address','Sends email','Stores HTML','Encrypts traffic'],a:0,e:'A = address. CNAME aliases one name to another.'},
 {q:'Your site returns 502 Bad Gateway behind Nginx. First thing to check?',o:['DNS records','Whether the app process behind Nginx is running','The user\'s browser','The SSL certificate'],a:1,e:'Nginx is answering, but the upstream app isn\'t. Check systemctl status app and the app logs.'},
 {q:'Why must you run ufw allow OpenSSH before ufw enable on a remote server?',o:['It is faster','Otherwise the firewall blocks your SSH session and you are locked out','ufw requires it alphabetically','It enables HTTPS'],a:1,e:'Enabling the firewall without allowing SSH cuts your own connection.'},
 {q:'In GitHub Actions, what does uses: actions/checkout@v4 do?',o:['Deploys the site','Downloads your repository\'s code onto the runner','Runs the tests','Installs Node'],a:1,e:'The runner starts empty; checkout fetches your code so later steps can use it.'},
 {q:'Where should a production database password live?',o:['In the code','In a committed .env file','In the hosting platform\'s environment variables or a secret manager','In NEXT_PUBLIC_DB_PASSWORD'],a:2,e:'Secrets are injected at runtime by the platform and never committed.'},
 {q:'A deploy broke production. Fastest safe fix?',o:['Hotfix directly on the server','Roll back to the previous deployment, then fix properly','Delete the project','Wait for traffic to drop'],a:1,e:'Rollback restores service in seconds; then fix forward with a test.'},
]},
real:[
 {id:'deploy-r1',t:'Deploy a real project to Vercel',p:'Import a GitHub repo at vercel.com/new (or use the CLI). Open a pull request and look at its preview URL.',s:'npm i -g vercel\nvercel login\nvercel\nvercel --prod'},
 {id:'deploy-r2',t:'Add CI to one of your repos',p:'Create .github/workflows/ci.yml that installs and runs tests on every push and pull request. Then protect main so PRs need a green check.',s:'mkdir -p .github/workflows\n# write ci.yml, then:\ngit add . && git commit -m "Add CI" && git push'},
 {id:'deploy-r3',t:'Set up a VPS with Nginx and HTTPS',p:'Rent a small VPS (about $5/month), point a domain at it, and serve an app behind Nginx with a Let\'s Encrypt certificate.',s:'ssh root@YOUR_IP\napt update && apt install -y nginx certbot python3-certbot-nginx\nufw allow OpenSSH && ufw allow "Nginx Full" && ufw enable\ncertbot --nginx -d yourdomain.com'},
 {id:'deploy-r4',t:'Add uptime monitoring and error tracking',p:'Create a free uptime check (Better Stack or UptimeRobot) for your site and add Sentry to one app.',s:'npx @sentry/wizard@latest -i nextjs'},
]});
})();
