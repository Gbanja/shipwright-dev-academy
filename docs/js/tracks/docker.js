/* Track 2: Docker */
(()=>{
const O=()=>OPS.st,H=re=>OPS.Hx(re),C=n=>OPS.ctr(n),F=p=>OPS.file(p)||'';
const body=()=>(O().lastHttp&&O().lastHttp.body)||'';
const DOCKERFILE_NODE='FROM node:24-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]\n';
defineTrack({id:'docker',name:'Docker',weeks:'~2 weeks',
lessons:[
{id:'d1',lvl:'Foundations',title:'Why containers exist',kind:'ops',
 sum:'A container packages an app with everything it needs (runtime, libraries, config) so it runs the same on any machine. An image is the read-only template; a container is a running instance of an image. Containers share the host kernel, so they start in seconds and are much lighter than virtual machines.',
 keys:['docker --version','docker run hello-world','docker ps -a','image vs container'],
 concept:`<p>Every developer has heard "it works on my machine". The app runs on your laptop but breaks on a teammate's laptop or the server, because something differs: the Node or Python version, a missing library, an environment variable.</p>
<p><b>Docker</b> fixes this by packaging your app <i>together with everything it needs</i> into one unit called a <b>container</b>. The container runs the same way on your laptop, your teammate's laptop, a CI server and production.</p>
<div class="tbl-wrap"><table><tr><th>Word</th><th>Meaning</th><th>Analogy</th></tr>
<tr><td><b>Image</b></td><td>A read-only template: OS files + runtime + your code + settings</td><td>A recipe, or a class in code</td></tr>
<tr><td><b>Container</b></td><td>A running (or stopped) instance of an image</td><td>The meal cooked from the recipe, or an object</td></tr>
<tr><td><b>Registry</b></td><td>Where images are stored and shared (Docker Hub, GitHub Container Registry)</td><td>A cookbook library</td></tr></table></div>
<h4>Containers vs virtual machines</h4>
<p>A virtual machine runs a whole extra operating system, so it takes gigabytes and minutes to boot. A container shares the host's kernel and only packages what the app needs, so it is megabytes and starts in seconds.</p>
<div class="tip"><b>Key idea</b>A container lives only as long as its main process. When the process finishes, the container stops ("Exited").</div>`,
 tasks:[
  {t:'Check that Docker is installed.',h:'docker --version',c:()=>H(/^docker (--version|version)$/)},
  {t:'Run your first container from the hello-world image.',h:'docker run hello-world',c:()=>O().flags.ranHello},
  {t:'List all containers, including stopped ones.',h:'docker ps -a',c:()=>H(/^docker (ps|container ls) (-a|--all)/)},
  {t:'Why does hello-world show "Exited" in the list?',o:['It crashed with an error','Its main process finished printing, so the container stopped','Docker ran out of memory','You forgot the -d flag'],a:1,e:'A container runs as long as its main process does. hello-world prints a message and exits, so the container stops with exit code 0 (success).'},
  {t:'Which pairing is right?',o:['An image is a running container','An image is to a container what a class is to an object','A container is a stored template','Images and containers are the same thing'],a:1,e:'You build or pull an image once, then start as many containers from it as you like.'},
 ]},
{id:'d2',lvl:'Foundations',title:'Images, containers & ports',kind:'ops',
 sum:'docker pull downloads an image; docker run creates and starts a container. -d runs it in the background, --name gives it a name, and -p HOST:CONTAINER publishes a port so you can reach it from your machine. docker logs, docker stop and docker rm manage its life cycle.',
 keys:['docker pull nginx','docker images','docker run -d -p 8080:80 --name web nginx','docker logs web','docker stop web','docker rm web'],
 concept:`<p>Let's run a real web server: <b>nginx</b>. You pull its image from Docker Hub, start a container, and reach it from your browser through a <b>port mapping</b>.</p>
<div class="tbl-wrap"><table><tr><th>Flag</th><th>What it does</th></tr>
<tr><td><code>-d</code></td><td>Detached: run in the background and give your terminal back</td></tr>
<tr><td><code>--name web</code></td><td>Give the container a friendly name instead of a random one</td></tr>
<tr><td><code>-p 8080:80</code></td><td>Publish a port: <b>your machine's</b> port 8080 → the <b>container's</b> port 80</td></tr></table></div>
<p>Containers are isolated: nginx listens on port 80 <i>inside</i> its container. Without <code>-p</code>, nothing outside can reach it.</p>
<div class="flow"><span>browser :8080</span><em>-p 8080:80 →</em><span>container :80</span><em>→</em><span>nginx</span></div>
<div class="tip"><b>Read order</b><code>-p HOST:CONTAINER</code>. The left side is always your machine.</div>`,
 tasks:[
  {t:'Download the nginx image.',h:'docker pull nginx',c:()=>!!O().docker.images['nginx:latest']},
  {t:'List the images on your machine.',h:'docker images',c:()=>H(/^docker (images|image ls)/)},
  {t:'Run nginx in the background, named web, with your port 8080 mapped to its port 80.',h:'docker run -d -p 8080:80 --name web nginx',c:()=>{const c=C('web');return c&&c.status==='running'&&c.ports.some(p=>p.h===8080&&p.c===80)}},
  {t:'Request the page from your machine and see nginx answer.',h:'curl localhost:8080',c:()=>/Welcome to nginx/.test(body())},
  {t:'Read the container\'s logs.',h:'docker logs web',c:()=>(O().flags.logsOf||[]).includes('web')},
  {t:'Stop the container, then remove it.',h:'docker stop web\ndocker rm web',c:()=>!C('web')&&H(/^docker (rm|container rm)( -f)? web/)},
 ]},
{id:'d3',lvl:'Building images',title:'Writing a Dockerfile',kind:'ops',
 setup:o=>{o.mkdirp('/home/you/hello-api');o.H().cwd='/home/you/hello-api';o.write('package.json','{\n  "name": "hello-api",\n  "scripts": { "start": "node server.js" },\n  "dependencies": { "express": "^4.21.0" }\n}\n');o.write('server.js',"const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => res.send('Hello from Docker'));\n\napp.listen(3000, () => console.log('Server listening on port 3000'));\n");},
 intro:'You are in ~/hello-api, a small Express app. Run ls and cat server.js to look around.',
 sum:'A Dockerfile is the recipe for an image. FROM picks a base image, WORKDIR sets the folder, COPY brings files in, RUN executes build steps, EXPOSE documents the port, and CMD is the command the container runs. Copy package.json and install dependencies before copying the rest of the code so Docker can reuse the cached layer.',
 keys:['FROM node:24-alpine','WORKDIR /app','COPY package*.json ./','RUN npm install','CMD ["node","server.js"]','docker build -t name .'],
 concept:`<p>A <b>Dockerfile</b> is a text file of instructions that builds an image, one layer per instruction.</p>
<div class="tbl-wrap"><table><tr><th>Instruction</th><th>Purpose</th></tr>
<tr><td><code>FROM node:24-alpine</code></td><td>Start from a base image (Node 24 on tiny Alpine Linux)</td></tr>
<tr><td><code>WORKDIR /app</code></td><td>Set the working folder inside the image</td></tr>
<tr><td><code>COPY package*.json ./</code></td><td>Copy files from your project into the image</td></tr>
<tr><td><code>RUN npm install</code></td><td>Run a command at <i>build</i> time</td></tr>
<tr><td><code>EXPOSE 3000</code></td><td>Document which port the app listens on</td></tr>
<tr><td><code>CMD ["node", "server.js"]</code></td><td>The command the container runs at <i>start</i> time</td></tr></table></div>
<h4>Layer caching</h4>
<p>Docker caches each layer. If a layer's inputs haven't changed, the build reuses it ("CACHED"). That's why we copy <code>package.json</code> and run <code>npm install</code> <i>before</i> copying the rest of the code: editing <code>server.js</code> then doesn't trigger a slow reinstall.</p>
<p>Open the editor with <code>nano Dockerfile</code>, type the file, and press Save.</p>`,
 tasks:[
  {t:'Create a Dockerfile for this Node app.',h:'nano Dockerfile',f:{'Dockerfile':DOCKERFILE_NODE},c:()=>/^FROM\s+node/m.test(F('/home/you/hello-api/Dockerfile'))&&/^CMD/m.test(F('/home/you/hello-api/Dockerfile'))},
  {t:'Build an image named hello-api from the current folder.',h:'docker build -t hello-api .',c:()=>!!O().docker.images['hello-api:latest']},
  {t:'Run it in the background as api, publishing port 3000.',h:'docker run -d -p 3000:3000 --name api hello-api',c:()=>{const c=C('api');return c&&c.status==='running'}},
  {t:'Request the app and get "Hello from Docker".',h:'curl localhost:3000',c:()=>/Hello from Docker/.test(body())},
  {t:'Change the message in server.js, rebuild, and spot the CACHED layers in the output.',h:'nano server.js\ndocker build -t hello-api .',f:{'server.js':"const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => res.send('Hello again from Docker'));\n\napp.listen(3000, () => console.log('Server listening on port 3000'));\n"},c:()=>(O().flags.cacheHits||0)>=2&&/Hello again/.test(F('/home/you/hello-api/server.js'))},
  {t:'Why copy package.json and run npm install before COPY . . ?',o:['Docker requires that order','So editing code doesn\'t invalidate the cached npm install layer','It makes the image more secure','npm install can\'t see other files'],a:1,e:'Layers rebuild from the first changed input downwards. Dependencies change rarely; code changes constantly. Ordering them this way keeps rebuilds fast.'},
 ]},
{id:'d4',lvl:'Building images',title:'Volumes, environment & networks',kind:'ops',
 sum:'Containers are disposable, so data must live in a volume (-v name:/path) to survive restarts and rebuilds. Configuration goes in environment variables (-e KEY=value). Containers on the same user-defined network (--network) reach each other by name.',
 keys:['docker network create appnet','docker volume create pgdata','-e POSTGRES_PASSWORD=...','-v pgdata:/var/lib/postgresql/data','docker logs','docker exec'],
 concept:`<p>Three things every real app needs from its containers:</p>
<ul><li><b>Configuration:</b> environment variables, passed with <code>-e KEY=value</code>. Images stay generic; each environment sets its own values.</li>
<li><b>Data that survives:</b> a container's filesystem disappears when you remove the container. A <b>volume</b> (<code>-v pgdata:/var/lib/postgresql/data</code>) stores data outside the container.</li>
<li><b>Talking to each other:</b> containers on the same user-defined <b>network</b> can reach each other by container name, like <code>db:5432</code>.</li></ul>
<p>We'll run PostgreSQL, the database you'll use in later tracks. First we'll make a classic mistake on purpose, so you learn to read logs.</p>
<div class="tip"><b>Debugging habit</b>A container that "won't stay up" almost always explains why in <code>docker logs NAME</code>.</div>`,
 tasks:[
  {t:'Create a network named appnet and a volume named pgdata.',h:'docker network create appnet\ndocker volume create pgdata',c:()=>!!O().docker.nets.appnet&&!!O().docker.vols.pgdata},
  {t:'Start Postgres WITHOUT a password, then read its logs to find out why it stopped.',h:'docker run -d --name db postgres:16\ndocker logs db',c:()=>(O().flags.logsOf||[]).includes('db')},
  {t:'Remove it and start it properly: password, network and volume.',h:'docker rm db\ndocker run -d --name db --network appnet -e POSTGRES_PASSWORD=secret -v pgdata:/var/lib/postgresql/data postgres:16',c:()=>{const c=C('db');return c&&c.status==='running'&&c.net==='appnet'&&c.vols.some(v=>v.vol==='pgdata')}},
  {t:'Connect with psql inside the container (this creates a users table in the sandbox).',h:'docker exec -it db psql -U postgres',c:()=>!!(O().docker.vols.pgdata&&O().docker.vols.pgdata.tables)},
  {t:'Delete the container and start a new one on the same volume. Check the logs: the data is still there.',h:'docker rm -f db\ndocker run -d --name db --network appnet -e POSTGRES_PASSWORD=secret -v pgdata:/var/lib/postgresql/data postgres:16\ndocker logs db',c:()=>{const c=C('db');return H(/^docker rm -f db/)&&c&&c.status==='running'&&/Skipping initialization/.test(c.logs.join(' '))&&(O().flags.logsOf||[]).filter(n=>n==='db').length>=2}},
  {t:'Why put database files in a volume?',o:['Volumes make queries faster','Containers are disposable; a volume keeps data when the container is removed or replaced','Postgres refuses to run without one','Volumes encrypt the data'],a:1,e:'You will replace containers constantly (new versions, config changes). Volumes decouple your data from any single container.'},
 ]},
{id:'d5',lvl:'Multi-container apps',title:'Docker Compose',kind:'ops',
 setup:o=>{o.mkdirp('/home/you/shop');o.H().cwd='/home/you/shop';o.write('package.json','{\n  "name": "shop",\n  "dependencies": { "express": "^4.21.0", "pg": "^8.13.0" }\n}\n');o.write('server.js',"const express = require('express');\nconst app = express();\nconst url = process.env.DATABASE_URL;\n\napp.get('/', (req, res) => res.send('Shop API'));\n\napp.listen(3000);\n");o.write('Dockerfile',DOCKERFILE_NODE);
  o.write('compose.yaml','services:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      DATABASE_URL: postgres://postgres:secret@localhost:5432/shop\n    depends_on:\n      - db\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: secret\n      POSTGRES_DB: shop\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n\nvolumes:\n  pgdata:\n')},
 intro:'You are in ~/shop: an API, its Dockerfile, and a compose.yaml. Run cat compose.yaml first.',
 sum:'Docker Compose describes a whole multi-container app in compose.yaml: services, ports, environment, volumes and dependencies. docker compose up -d builds and starts everything on a shared network where services reach each other by service name. Inside a container, localhost means that container itself.',
 keys:['compose.yaml','docker compose up -d','docker compose ps','docker compose logs web','docker compose down','service name as hostname'],
 concept:`<p>Real apps are several containers: a web server, a database, maybe a cache. Typing long <code>docker run</code> commands for each gets painful. <b>Docker Compose</b> describes the whole app in one file and starts it with one command.</p>
<pre class="snip" style="margin-bottom:12px">services:
  web:                  # your app, built from ./Dockerfile
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/shop
    depends_on: [db]
  db:                   # a ready-made image
    image: postgres:16</pre>
<p>Compose puts all services on one network. Each service is reachable by its <b>service name</b>, so the app connects to the database at host <code>db</code>.</p>
<div class="tip"><b>The classic bug</b>Inside a container, <code>localhost</code> means <i>that container</i>, not your laptop and not the database container. The provided compose.yaml has this bug. Find it and fix it.</div>`,
 tasks:[
  {t:'Start the whole stack in the background.',h:'docker compose up -d',c:()=>O().flags.composeUp},
  {t:'Request the API. It can\'t reach the database. Read the error.',h:'curl localhost:3000',c:()=>{if(/ECONNREFUSED/.test(body()))O().flags.sawRefused=true;return !!O().flags.sawRefused}},
  {t:'Fix DATABASE_URL in compose.yaml so it points at the db service, then run up again.',h:'nano compose.yaml\ndocker compose up -d',f:{'compose.yaml':'services:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      DATABASE_URL: postgres://postgres:secret@db:5432/shop\n    depends_on:\n      - db\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: secret\n      POSTGRES_DB: shop\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n\nvolumes:\n  pgdata:\n'},c:()=>{const w=C('web');return w&&/@db:5432/.test(w.env.DATABASE_URL||'')}},
  {t:'Request the API again and see it connect to Postgres.',h:'curl localhost:3000',c:()=>/Connected to Postgres/.test(body())},
  {t:'List the stack\'s containers, then shut everything down.',h:'docker compose ps\ndocker compose down',c:()=>H(/^docker compose ps/)&&O().flags.composeDown},
  {t:'Why did "localhost" fail inside the web container?',o:['Postgres was still starting','localhost inside a container is the container itself; other services are reached by service name','Compose doesn\'t support environment variables','Port 5432 was blocked by a firewall'],a:1,e:'Each container has its own network namespace. On the Compose network, the database is at db:5432.'},
 ]},
{id:'d6',lvl:'Shipping images',title:'Multi-stage builds & registries',kind:'ops',
 setup:o=>{o.mkdirp('/home/you/site/src');o.H().cwd='/home/you/site';o.write('package.json','{\n  "name": "site",\n  "scripts": { "build": "vite build" },\n  "devDependencies": { "vite": "^5.4.0" }\n}\n');o.write('src/index.html','<h1>My portfolio</h1>\n');o.write('index.html','<!doctype html><title>Portfolio</title><div id="app"></div>\n');o.write('Dockerfile','FROM node:24\nWORKDIR /app\nCOPY . .\nRUN npm install\nRUN npm run build\nCMD ["npx", "vite", "preview"]\n')},
 intro:'You are in ~/site, a static site built with Vite. The current Dockerfile ships the whole Node toolchain. Run cat Dockerfile.',
 sum:'A multi-stage build uses one stage with the full toolchain to build the app, then copies only the output into a small runtime image (FROM nginx:alpine + COPY --from=build). Images are shared through registries: docker login, tag the image as username/name:version, then docker push.',
 keys:['FROM node:24-alpine AS build','COPY --from=build /app/dist /usr/share/nginx/html','docker login','docker tag site:slim you/site:1.0','docker push you/site:1.0'],
 concept:`<p>To build a frontend you need Node, npm and hundreds of packages. To <i>serve</i> it you only need the built HTML/JS/CSS files and a web server. Shipping the build tools to production wastes space and adds security risk.</p>
<p>A <b>multi-stage build</b> has several <code>FROM</code> lines. Earlier stages build; the last stage is what ships:</p>
<pre class="snip" style="margin-bottom:12px">FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html</pre>
<h4>Registries</h4>
<p>To deploy an image, push it to a registry. Name it <code>username/name:version</code>, log in, then push. Servers and CI pipelines pull it from there.</p>
<div class="tip"><b>Tag versions</b>Avoid relying on <code>:latest</code> in production. Tag every release (<code>:1.0</code>, <code>:1.1</code>) so you know exactly what runs and can roll back.</div>`,
 tasks:[
  {t:'Build the current single-stage image as site:fat.',h:'docker build -t site:fat .',c:()=>!!O().docker.images['site:fat']},
  {t:'Rewrite the Dockerfile as a multi-stage build that ships with nginx:alpine, and build it as site:slim.',h:'nano Dockerfile\ndocker build -t site:slim .',f:{'Dockerfile':'FROM node:24-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=build /app/dist /usr/share/nginx/html\n'},c:()=>{const i=O().docker.images['site:slim'];return i&&i.stages>=2&&i.size<100}},
  {t:'Compare the two image sizes.',h:'docker images',c:()=>H(/^docker (images|image ls)/)&&!!O().docker.images['site:slim']},
  {t:'Run the slim image on port 8080 and check it serves your site.',h:'docker run -d -p 8080:80 --name site site:slim\ncurl localhost:8080',c:()=>/Built app|portfolio/i.test(body())&&C('site')&&C('site').image==='site:slim'},
  {t:'Log in to Docker Hub (any username and password work in the sandbox).',h:'docker login\nyou\nmy-password',c:()=>!!O().docker.login},
  {t:'Tag the image as YOUR_USERNAME/site:1.0 and push it.',h:'docker tag site:slim you/site:1.0\ndocker push you/site:1.0',c:()=>(O().flags.pushed||[]).some(r=>/\/site:1\.0$/.test(r))},
 ]},
],
quizzes:{docker:[
 {q:'What problem does Docker mainly solve?',o:['Slow internet','"Works on my machine": apps behaving differently across environments','Writing CSS','Version control'],a:1,e:'Packaging the app with its dependencies makes it run the same everywhere.'},
 {q:'docker run -p 5000:80 nginx. How do you reach nginx from your browser?',o:['localhost:80','localhost:5000','nginx:5000','You can\'t'],a:1,e:'-p HOST:CONTAINER. Your machine\'s port 5000 forwards to the container\'s port 80.'},
 {q:'Which Dockerfile instruction runs when the container STARTS (not at build time)?',o:['RUN','COPY','CMD','FROM'],a:2,e:'RUN executes during the build. CMD (or ENTRYPOINT) is the process the container runs.'},
 {q:'Your web container can\'t reach Postgres at localhost:5432 in Compose. Fix?',o:['Use the service name, e.g. db:5432','Expose 5432 on your laptop','Restart Docker','Use 127.0.0.1 instead'],a:0,e:'Compose services reach each other by service name on the shared network.'},
 {q:'Why use a multi-stage build?',o:['To run two apps in one container','To ship only the runtime output, not the build toolchain, so images are smaller and safer','Because Docker requires it for Node','To speed up the network'],a:1,e:'The final stage copies just the build artifacts into a minimal base image.'},
 {q:'Where should a container\'s database files live?',o:['Inside the container filesystem','In a volume','In the image','In environment variables'],a:1,e:'Volumes persist beyond any single container\'s life.'},
]},
real:[
 {id:'docker-r1',t:'Install Docker Desktop',p:'Install Docker Desktop (Windows/Mac) or Docker Engine (Linux), then verify it works.',s:'docker --version\ndocker run hello-world'},
 {id:'docker-r2',t:'Dockerize one of your own projects',p:'Write a Dockerfile for a real app of yours, build it, and run it. Add a .dockerignore with node_modules.',s:'docker build -t my-app .\ndocker run -d -p 3000:3000 --name my-app my-app\ndocker logs my-app'},
 {id:'docker-r3',t:'Run your app with a real database using Compose',p:'Create compose.yaml with your app plus postgres:16 and a named volume. Start and stop it.',s:'docker compose up -d\ndocker compose logs -f web\ndocker compose down'},
 {id:'docker-r4',t:'Push an image to Docker Hub',p:'Create a free Docker Hub account, then tag and push a versioned image.',s:'docker login\ndocker tag my-app YOURNAME/my-app:1.0\ndocker push YOURNAME/my-app:1.0'},
]});
})();
