/* docker: "Explained step by step" walkthroughs. */

explain('d1',`
<h4>The problem: "it works on my machine"</h4>
<p>An app is never just your code. To run, it needs a lot of other things around it:</p>
<ul>
<li>a <b>runtime</b>, the program that runs your code, such as Node.js 20 or Python 3.12, in the right version;</li>
<li><b>libraries</b>, the packages your code imports, in the right versions;</li>
<li><b>system tools</b> some of those packages expect, such as an image-processing library installed on the operating system;</li>
<li><b>configuration</b>, such as environment variables and settings files.</li>
</ul>
<p>Your laptop has one particular mix of all that. Your teammate's laptop has a slightly different mix, the test server another, and the production server another again. If any piece differs, the app can break somewhere it worked before. Then someone says the most famous sentence in software: "but it works on my machine".</p>
<p>The old fix was a long setup document ("install Node 20, then this, then that") that was always out of date. Docker's fix is different: <b>ship the machine's setup together with the app</b>.</p>

<h4>The idea: a container</h4>
<p>Docker packages your app and everything it needs into one sealed unit called a <b>container</b>. Inside it are the runtime, the libraries, the system files and your code, all at the exact versions you tested. Wherever Docker is installed, the container runs the same way, because it brings its own world with it.</p>
<div class="analogy"><b>Think of it like</b>A shipping container. Before them, every port loaded sacks, barrels and crates differently. After them, every ship, crane and lorry handles one standard box, and nobody cares what is inside. Docker is that standard box for software: your laptop, a CI server and a cloud server all handle containers the same way.</div>

<h4>Three words to keep straight: image, container, registry</h4>
<p>Docker has three words you will use every day, and mixing them up causes most beginner confusion.</p>
<ul>
<li>An <b>image</b> is a read-only package: a snapshot of the files the app needs (operating system files, runtime, libraries, your code) plus a note saying which command to run. It does nothing by itself; it is a template sitting on disk.</li>
<li>A <b>container</b> is what you get when you start an image: a running (or stopped) instance with its own processes. Each container also gets a thin writable layer on top, so it can create files without changing the image.</li>
<li>A <b>registry</b> is a server that stores images so people can download and share them. <b>Docker Hub</b> is the default public one; GitHub has one too.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 186" role="img" aria-label="One image in a registry is pulled, then started as several containers">
<rect class="bx-info" x="10" y="20" width="110" height="56" rx="8"/><text class="t-b" x="65" y="44" text-anchor="middle">registry</text><text class="t-s" x="65" y="63" text-anchor="middle">Docker Hub</text>
<path class="ln" d="M120 48h30"/><polygon class="ah" points="149,42 149,54 157,48"/><text class="t-s" x="138" y="36" text-anchor="middle">pull</text>
<rect class="bx-a" x="159" y="20" width="100" height="56" rx="8"/><text class="t-b t-a" x="209" y="44" text-anchor="middle">image</text><text class="t-s" x="209" y="63" text-anchor="middle">read-only</text>
<path class="ln-ok" d="M259 48h20v-20h22M279 48h22M279 48v62h22"/>
<polygon class="ah-ok" points="299,22 299,34 307,28"/><polygon class="ah-ok" points="299,42 299,54 307,48"/><polygon class="ah-ok" points="299,104 299,116 307,110"/>
<rect class="bx-ok" x="309" y="12" width="100" height="32" rx="8"/><text class="t" x="359" y="33" text-anchor="middle">container</text>
<rect class="bx-ok" x="309" y="52" width="100" height="32" rx="8"/><text class="t" x="359" y="73" text-anchor="middle">container</text>
<rect class="bx-ok" x="309" y="94" width="100" height="32" rx="8"/><text class="t" x="359" y="115" text-anchor="middle">container</text>
<text class="t-s" x="282" y="146" text-anchor="middle">run, run, run</text>
<text class="t-s" x="210" y="174" text-anchor="middle">like a class (the image) and its objects (containers)</text>
</svg><figcaption>An image is downloaded once from a registry such as Docker Hub. You can then start as many containers from it as you like, the way a class in code can create many objects. Each container runs separately.</figcaption></figure>

<h4>Containers are not virtual machines</h4>
<p>You may have heard of <b>virtual machines</b> (VMs): software that pretends to be a whole separate computer, with its own complete operating system inside. Containers solve a similar problem in a much lighter way, and the difference comes down to the <b>kernel</b>.</p>
<p>The kernel is the core of an operating system: the part that talks to the hardware, runs processes and manages memory and files. A VM boots its own full operating system, kernel and all. A container does not have its own kernel. It is a set of ordinary processes on the host machine, which the host's Linux kernel fences off so they get their own private view of files, processes and network. They cannot see the rest of the machine, and limits can be set on how much CPU and memory they use.</p>
<figure class="fig"><svg viewBox="0 0 420 290" role="img" aria-label="Virtual machines each carry a full guest OS; containers share the host kernel through Docker">
<text class="t-b" x="105" y="20" text-anchor="middle">virtual machines</text>
<text class="t-b" x="315" y="20" text-anchor="middle">containers</text>
<g text-anchor="middle">
<rect class="bx-ok" x="10" y="34" width="92" height="32" rx="6"/><text class="t-s" x="56" y="55">app A</text>
<rect class="bx-ok" x="108" y="34" width="92" height="32" rx="6"/><text class="t-s" x="154" y="55">app B</text>
<rect class="bx" x="10" y="72" width="92" height="32" rx="6"/><text class="t-s" x="56" y="93">libraries</text>
<rect class="bx" x="108" y="72" width="92" height="32" rx="6"/><text class="t-s" x="154" y="93">libraries</text>
<rect class="bx-bad" x="10" y="110" width="92" height="40" rx="6"/><text class="t-s" x="56" y="128">full guest</text><text class="t-s" x="56" y="144">OS + kernel</text>
<rect class="bx-bad" x="108" y="110" width="92" height="40" rx="6"/><text class="t-s" x="154" y="128">full guest</text><text class="t-s" x="154" y="144">OS + kernel</text>
<rect class="bx" x="10" y="156" width="190" height="32" rx="6"/><text class="t-s" x="105" y="177">hypervisor</text>
<rect class="bx-info" x="10" y="194" width="190" height="32" rx="6"/><text class="t-s" x="105" y="215">host OS and kernel</text>
<rect class="bx" x="10" y="232" width="190" height="32" rx="6"/><text class="t-s" x="105" y="253">hardware</text>
<rect class="bx-ok" x="220" y="80" width="92" height="32" rx="6"/><text class="t-s" x="266" y="101">app A</text>
<rect class="bx-ok" x="318" y="80" width="92" height="32" rx="6"/><text class="t-s" x="364" y="101">app B</text>
<rect class="bx" x="220" y="118" width="92" height="32" rx="6"/><text class="t-s" x="266" y="139">libraries</text>
<rect class="bx" x="318" y="118" width="92" height="32" rx="6"/><text class="t-s" x="364" y="139">libraries</text>
<rect class="bx-a" x="220" y="156" width="190" height="32" rx="6"/><text class="t-s" x="315" y="177">Docker Engine</text>
<rect class="bx-info" x="220" y="194" width="190" height="32" rx="6"/><text class="t-s" x="315" y="215">host OS and kernel</text>
<rect class="bx" x="220" y="232" width="190" height="32" rx="6"/><text class="t-s" x="315" y="253">hardware</text>
<text class="t-s" x="315" y="284">shared kernel: MBs, seconds</text>
<text class="t-s" x="105" y="284">GBs, minutes to boot</text>
</g>
</svg><figcaption>On the left, each virtual machine carries a complete guest operating system with its own kernel, which costs gigabytes and a slow boot. On the right, containers hold only the app and its libraries and share the host's kernel, so they are megabytes in size and start in about a second.</figcaption></figure>
<p>That is why a container image can be a few megabytes and start in about a second, while a VM image is gigabytes and takes a while to boot. One detail: because containers need a Linux kernel, Docker Desktop on Windows and macOS quietly runs one small Linux VM and puts your containers inside it.</p>

<h4>Your first container: <code>docker run hello-world</code></h4>
<p>You control Docker with the <code>docker</code> command. It is only a messenger: it passes your request to the <b>Docker Engine</b> (also called the Docker daemon), a background service that actually pulls images and runs containers. <code>docker --version</code> checks that the command is installed and prints its version.</p>
<p>Then try the classic first container. Here is everything that happens when you type <code>docker run hello-world</code>:</p>
<figure class="fig"><svg viewBox="0 0 420 260" role="img" aria-label="docker run: look for the image locally, pull it if missing, create and start a container, print, exit">
<rect class="bx" x="85" y="10" width="250" height="34" rx="8"/><text class="t-m" x="210" y="32" text-anchor="middle">docker run hello-world</text>
<path class="ln" d="M210 44v12"/><polygon class="ah" points="204,54 216,54 210,62"/>
<rect class="bx-warn" x="100" y="64" width="220" height="34" rx="8"/><text class="t" x="210" y="86" text-anchor="middle">image on this machine?</text>
<path class="ln-a" d="M100 81h-16v40"/><polygon class="ah-a" points="78,119 90,119 84,127"/><text class="t-s t-a" x="72" y="76" text-anchor="middle">no</text>
<rect class="bx-info" x="10" y="129" width="148" height="34" rx="8"/><text class="t" x="84" y="151" text-anchor="middle">pull from Hub</text>
<path class="ln" d="M158 146h34"/><polygon class="ah" points="190,140 190,152 198,146"/>
<path class="ln-ok" d="M320 81h10v57"/><polygon class="ah-ok" points="324,136 336,136 330,144"/><text class="t-s t-ok" x="350" y="76" text-anchor="middle">yes</text>
<rect class="bx" x="200" y="129" width="210" height="34" rx="8"/><text class="t" x="305" y="151" text-anchor="middle">create + start container</text>
<path class="ln" d="M305 163v14"/><polygon class="ah" points="299,175 311,175 305,183"/>
<rect class="bx-ok" x="200" y="185" width="210" height="30" rx="8"/><text class="t" x="305" y="205" text-anchor="middle">prints "Hello from Docker!"</text>
<path class="ln" d="M305 215v10"/><polygon class="ah" points="299,223 311,223 305,231"/>
<rect class="bx" x="200" y="233" width="210" height="24" rx="8"/><text class="t-s" x="305" y="250" text-anchor="middle">process ends: Exited (0)</text>
</svg><figcaption>What docker run does. It checks for the image on your machine, and if it is missing, downloads it from Docker Hub. Then it creates a container from the image and starts it. The program prints its greeting and finishes, so the container stops with exit code zero.</figcaption></figure>
<p>The first time, you will see <code>Unable to find image 'hello-world:latest' locally</code>, then a download, then the greeting. That first line is not an error: it is Docker telling you it is about to pull. Run the command again and it starts straight away, because the image is now stored locally.</p>

<h4>Listing containers: <code>docker ps</code> and <code>docker ps -a</code></h4>
<p><code>docker ps</code> lists <b>running</b> containers, and right after hello-world it shows nothing at all. <code>docker ps -a</code> (all) also shows stopped ones:</p>
<pre class="snip">CONTAINER ID  IMAGE        COMMAND    STATUS                  NAMES
3f2a9c1b7d04  hello-world  "/hello"   Exited (0) 9 seconds ago  eager_turing</pre>
<p>Each container gets a unique <b>ID</b> and a <b>name</b>. If you do not choose a name, Docker invents a random one from an adjective and a famous scientist. <code>COMMAND</code> is the program the container runs, and <code>STATUS</code> tells its story.</p>
<p>Why "Exited"? This is the key idea of the lesson: <b>a container lives exactly as long as its main process</b>. hello-world's process prints a message and finishes, so the container stops. The <code>(0)</code> is the exit code you met in the scripting lesson: zero means success. A web server's process, by contrast, runs forever waiting for visitors, so its container stays up, as you will see in the next lesson.</p>
<div class="mistake"><b>Common mistake</b>Reading "Exited" as "crashed". Exited only means the main process finished. Check the number: <code>Exited (0)</code> is a clean finish, while any other number, such as <code>Exited (1)</code>, means the program reported an error.</div>
<div class="mistake"><b>Common mistake</b>Treating a container like a small server you log in to and tweak by hand. Containers are meant to be disposable: you change the image and start a fresh container. Anything changed by hand inside one is lost when it is removed.</div>

<h4>Reading the errors you might hit</h4>
<ul>
<li><code>Cannot connect to the Docker daemon ... Is the docker daemon running?</code>: the docker command works, but the engine behind it is not running. Start Docker Desktop, or on Linux run <code>sudo systemctl start docker</code>.</li>
<li><code>permission denied while trying to connect to the Docker daemon socket</code>: on Linux, your user is not allowed to talk to Docker yet. Use <code>sudo</code>, or ask for your user to be added to the <code>docker</code> group.</li>
<li><code>docker: command not found</code>: Docker is not installed, or not on your PATH.</li>
</ul>
<div class="try"><b>Try it in your head</b>You run <code>docker run hello-world</code> three times. How many images and how many containers do you have? One image, downloaded the first time and reused after that. Three containers, all Exited, because every <code>docker run</code> creates a brand new container. <code>docker ps -a</code> would list all three.</div>

<h4>Recap</h4>
<ul>
<li>Apps break across machines because their runtime, libraries and settings differ. A container packs all of that with the app.</li>
<li>An image is the read-only template; a container is a running or stopped instance of it; a registry such as Docker Hub stores images.</li>
<li>Containers share the host's kernel, so they are far lighter and faster to start than virtual machines.</li>
<li><code>docker run</code> pulls the image if needed, creates a container and starts it. <code>docker ps -a</code> shows stopped containers too.</li>
<li>A container stops when its main process ends; <code>Exited (0)</code> means it finished successfully.</li>
</ul>
`);

explain('d2',`
<h4>From hello-world to a real server</h4>
<p>hello-world printed a message and stopped. Most containers you will run do the opposite: they start a <b>server</b>, a program that runs forever, waiting for requests. In this lesson you run <b>nginx</b> (said "engine-x"), one of the most popular web servers in the world, without installing it on your machine at all. You will download its image, start it in the background, reach it from your machine, read what it logs, and clean up.</p>
<p>Along the way you meet the one idea that confuses almost everyone at first: <b>ports</b>, and how a container's ports connect to your machine's.</p>

<h4>Pulling images, and what a tag is</h4>
<p><code>docker pull nginx</code> downloads the nginx image from Docker Hub to your machine. Every image name has two parts, <code>name:tag</code>. The <b>tag</b> picks a version, such as <code>nginx:1.27</code> or <code>postgres:16</code>. If you leave the tag off, Docker assumes <code>latest</code>, so <code>nginx</code> really means <code>nginx:latest</code>.</p>
<p>While it downloads you will see several lines finish one by one. An image is made of <b>layers</b>, stacked sets of files, and Docker fetches each one separately. Layers that you already have from another image are reused instead of downloaded again. You will build your own layers in the next lesson.</p>
<p><code>docker images</code> lists the images stored on your machine:</p>
<pre class="snip">REPOSITORY    TAG      IMAGE ID       CREATED       SIZE
nginx         latest   a1b2c3d4e5f6   2 weeks ago   192MB
hello-world   latest   d2c94e258dcb   1 year ago    13.3kB</pre>
<p><code>IMAGE ID</code> is a unique fingerprint of the image's contents, and <code>CREATED</code> is when the image was built, not when you downloaded it.</p>

<h4>Running in the background: <code>-d</code> and <code>--name</code></h4>
<p><code>docker run</code> does two things in one: it <b>creates</b> a new container from an image and <b>starts</b> it. (It also pulls the image first if you do not have it.) Two options make it much nicer for servers:</p>
<ul>
<li><code>-d</code> means <b>detached</b>. Without it, the container is attached to your terminal: you see its output, and pressing Ctrl+C stops it. With <code>-d</code>, it runs in the background, Docker prints the new container's long ID, and you get your prompt back.</li>
<li><code>--name web</code> gives the container a name you choose. Every later command can then say <code>web</code> instead of a random name or a long ID.</li>
</ul>
<p>Option order matters in one way: options for Docker go <b>before</b> the image name. Anything after the image name is passed to the program inside the container instead.</p>

<h4>Ports: the numbered doors of a computer</h4>
<p>One computer can run many servers at once: a web server, a database, an app. When a request arrives over the network, how does the computer know which program should get it? Each server program <b>listens</b> on a numbered <b>port</b>, from 1 to 65535, and every request is addressed to a port as well as to a machine. Some numbers are conventions: web servers use port 80 (and 443 for HTTPS), PostgreSQL uses 5432, and development servers often use 3000. Only one program can listen on a given port at a time.</p>
<p>Now the twist. Each container gets its <b>own private network</b>, with its own set of ports. nginx inside the container listens on port 80, but that is the container's port 80, not your machine's. From outside, nothing can reach it, which is a good default for safety.</p>
<p>To let traffic in, you <b>publish</b> a port with <code>-p HOST:CONTAINER</code>. <code>-p 8080:80</code> tells Docker: "whenever something arrives at port 8080 on my machine, forward it to port 80 inside this container".</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="A request to localhost port 8080 is forwarded by Docker to port 80 inside the container">
<rect class="bx" x="10" y="20" width="400" height="150" rx="12"/>
<text class="t-b" x="24" y="44">your machine</text>
<rect class="bx-info" x="24" y="72" width="110" height="50" rx="8"/><text class="t" x="79" y="94" text-anchor="middle">browser</text><text class="t-s" x="79" y="112" text-anchor="middle">or curl</text>
<path class="ln-a" d="M134 97h44"/><polygon class="ah-a" points="176,91 176,103 184,97"/>
<rect class="bx-a" x="186" y="78" width="56" height="38" rx="6"/><text class="t-m" x="214" y="102" text-anchor="middle">8080</text>
<rect class="bx-ok" x="262" y="56" width="136" height="100" rx="10"/>
<text class="t-s" x="330" y="76" text-anchor="middle">container "web"</text>
<rect class="bx" x="274" y="84" width="40" height="30" rx="6"/><text class="t-m" x="294" y="104" text-anchor="middle">80</text>
<text class="t-b" x="356" y="104" text-anchor="middle">nginx</text>
<path class="ln-a" d="M242 97h24"/><polygon class="ah-a" points="266,91 266,103 274,97"/>
<path class="ln-ok" d="M314 99h14"/>
<text class="t-s" x="330" y="142" text-anchor="middle">own network</text>
<text class="t-m t-a" x="210" y="198" text-anchor="middle">-p 8080:80</text>
</svg><figcaption>Your browser or curl talks to port 8080 on your own machine. Because of dash p 8080 colon 80, Docker forwards that traffic to port 80 inside the container, where nginx is listening. Without the dash p, the container's port 80 is unreachable from outside.</figcaption></figure>
<p>Read the flag left to right as "outside, then inside": the left number is always <b>your machine</b>. The two numbers do not have to differ, and <code>-p 80:80</code> is common on servers. Choosing a different host port lets you run several containers that all use port 80 inside: one on 8080, one on 8081, and so on.</p>
<p>Putting it together:</p>
<pre class="snip">docker run -d -p 8080:80 --name web nginx
curl localhost:8080       # localhost = this machine</pre>
<p>curl prints nginx's welcome page, an HTML document containing <code>Welcome to nginx!</code>. In <code>docker ps</code>, the <code>PORTS</code> column now shows something like <code>0.0.0.0:8080-&gt;80/tcp</code>: port 8080 on every network address of your machine, forwarded to port 80 in the container. (TCP is the type of network connection web traffic uses.)</p>

<h4>Reading a container's logs</h4>
<p>A detached container's output does not appear in your terminal, but Docker records it. Anything the main process prints is captured, and <code>docker logs web</code> shows it. The official nginx image prints a line for every request it serves, so after your curl you will see your own request there: the address it came from, the time, <code>"GET / HTTP/1.1"</code> and the status <code>200</code>, just like the access log you searched in the Linux track.</p>
<pre class="snip">docker logs web             # everything so far
docker logs --tail 20 web   # just the last 20 lines
docker logs -f web          # follow new lines; Ctrl+C to stop</pre>
<p>Pressing Ctrl+C after <code>-f</code> only stops you watching. The container keeps running.</p>

<h4>The container life cycle: stop, start, remove</h4>
<figure class="fig"><svg viewBox="0 0 420 176" role="img" aria-label="Container life cycle: run creates a running container, stop makes it exited, start runs it again, rm deletes it">
<rect class="bx-a" x="10" y="20" width="90" height="44" rx="8"/><text class="t-b t-a" x="55" y="47" text-anchor="middle">image</text>
<path class="ln" d="M100 42h34"/><polygon class="ah" points="132,36 132,48 140,42"/><text class="t-s" x="118" y="32" text-anchor="middle">run</text>
<rect class="bx-ok" x="142" y="20" width="110" height="44" rx="8"/><text class="t-b t-ok" x="197" y="47" text-anchor="middle">running</text>
<path class="ln" d="M252 34h66"/><polygon class="ah" points="316,28 316,40 324,34"/><text class="t-s" x="288" y="26" text-anchor="middle">stop</text>
<path class="ln" d="M326 54h-66"/><polygon class="ah" points="262,48 262,60 254,54"/><text class="t-s" x="292" y="76" text-anchor="middle">start</text>
<rect class="bx-warn" x="326" y="20" width="84" height="44" rx="8"/><text class="t-b t-warn" x="368" y="47" text-anchor="middle">exited</text>
<path class="ln" d="M368 64v52"/><polygon class="ah" points="362,114 374,114 368,122"/><text class="t-s" x="386" y="96">rm</text>
<rect class="bx-bad" x="310" y="124" width="100" height="40" rx="8"/><text class="t-b t-bad" x="360" y="149" text-anchor="middle">removed</text>
<text class="t-s" x="55" y="96" text-anchor="middle">stays on</text><text class="t-s" x="55" y="113" text-anchor="middle">disk after rm</text>
<path class="ln-d" d="M197 64v80h105" fill="none"/><polygon class="ah" points="300,138 300,150 308,144"/>
<text class="t-s" x="250" y="136" text-anchor="middle">rm -f</text>
</svg><figcaption>docker run turns an image into a running container. docker stop moves it to exited, and docker start brings the same container back. docker rm deletes an exited container for good, and rm dash f stops and deletes a running one in one step. The image itself is untouched and stays on disk.</figcaption></figure>
<ul>
<li><code>docker stop web</code> asks the main process to shut down. It sends SIGTERM, the polite signal from the processes lesson, waits up to 10 seconds, and then sends SIGKILL if the process is still running.</li>
<li><code>docker start web</code> starts the same stopped container again, with the same settings.</li>
<li><code>docker rm web</code> deletes a stopped container, including any files created inside it. <code>docker rm -f web</code> forces it: stop and remove in one step.</li>
<li>Removing a container never removes its image. <code>docker rmi nginx</code> deletes the image, once no container uses it.</li>
</ul>

<h4>Reading the errors you will hit</h4>
<ul>
<li><code>Conflict. The container name "/web" is already in use</code>: names must be unique, and a container named web still exists, even if it is stopped. Check <code>docker ps -a</code>, then <code>docker rm web</code> or pick another name.</li>
<li><code>Bind for 0.0.0.0:8080 failed: port is already allocated</code>: something on your machine, often another container, already uses host port 8080. Choose another left-hand number.</li>
<li><code>You cannot remove a running container</code>: stop it first, or use <code>rm -f</code>.</li>
<li><code>curl: (7) Failed to connect to localhost port 8080</code>: nothing is published on that port. Check the <code>PORTS</code> column in <code>docker ps</code>; you probably forgot <code>-p</code>.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Writing the port mapping backwards, as <code>-p 80:8080</code>. That publishes your machine's port 80 to port 8080 inside the container, where nothing is listening, so requests fail. Remember: host first, container second.</div>
<div class="try"><b>Try it in your head</b>You run <code>docker run -d -p 5000:80 --name site nginx</code>. Which address shows the page? <code>localhost:5000</code>, because the left number is your machine. Now you want a second nginx at the same time: you need a new name and a different host port, such as <code>-p 5001:80 --name site2</code>. Inside, both still use port 80, and that is fine because each container has its own network.</div>

<h4>Recap</h4>
<ul>
<li><code>docker pull name:tag</code> downloads an image; no tag means <code>latest</code>. <code>docker images</code> lists them.</li>
<li><code>docker run -d --name web nginx</code> creates and starts a container in the background with a friendly name.</li>
<li>Containers have their own ports. <code>-p HOST:CONTAINER</code> publishes one, so <code>-p 8080:80</code> makes <code>localhost:8080</code> reach nginx's port 80.</li>
<li><code>docker logs</code> shows what the container printed; add <code>-f</code> to follow.</li>
<li><code>docker stop</code>, <code>start</code> and <code>rm</code> manage the life cycle; removing a container keeps the image.</li>
</ul>
`);

explain('d3',`
<h4>Why write your own image</h4>
<p>So far you have run images that other people built, like nginx. To ship <b>your</b> app you need your own image: one that contains Node.js, your app's packages and your code, and knows how to start it. You could set that up by hand inside a container, but nobody could repeat it exactly, and you would forget the steps by next month.</p>
<p>Instead you write a <b>Dockerfile</b>: a plain text file, saved next to your code, that lists the steps to build the image, in order. Anyone with the file and the code gets exactly the same image, every time. Because it is just text, it also lives in Git with the rest of your project.</p>
<p>The lesson's folder, <code>~/hello-api</code>, holds a tiny Express app: <code>package.json</code> lists its one dependency, and <code>server.js</code> answers "Hello from Docker" on port 3000.</p>

<h4>The Dockerfile, line by line</h4>
<pre class="snip">FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]</pre>
<p>Each line is one <b>instruction</b>: an uppercase keyword, then its arguments. Read it top to bottom, like a recipe.</p>
<ol>
<li><code>FROM node:20-alpine</code> picks the <b>base image</b> to start from. You never build from nothing. This one already contains Node.js 20 on <b>Alpine Linux</b>, a tiny Linux distribution designed for containers, which keeps the image small. Every Dockerfile starts with <code>FROM</code>.</li>
<li><code>WORKDIR /app</code> sets the working folder inside the image, creating it if needed. It is <code>cd</code> for the rest of the Dockerfile: later relative paths, and the final command, all happen in <code>/app</code>.</li>
<li><code>COPY package*.json ./</code> copies files from your project into the image. The <code>*</code> wildcard matches both <code>package.json</code> and <code>package-lock.json</code> if it exists, and <code>./</code> means "into the working folder", <code>/app</code>.</li>
<li><code>RUN npm install</code> runs a command <b>while the image is being built</b>, and saves the result into the image. Here it downloads Express into <code>/app/node_modules</code>.</li>
<li><code>COPY . .</code> copies everything else: from <code>.</code>, your project folder, to <code>.</code>, the working folder in the image.</li>
<li><code>EXPOSE 3000</code> records that the app listens on port 3000. It is <b>documentation only</b>: it does not publish anything. You still need <code>-p</code> when you run it.</li>
<li><code>CMD ["node", "server.js"]</code> is the command a container runs <b>when it starts</b>. It becomes the container's main process.</li>
</ol>
<p>The square-bracket form of <code>CMD</code> is called the <b>exec form</b>: a list of words in double quotes, separated by commas. Docker runs <code>node</code> directly, with no shell in between, so signals such as the SIGTERM sent by <code>docker stop</code> reach your app. A Dockerfile has only one <code>CMD</code>; if you write two, the last one wins.</p>

<h4>Build time and run time</h4>
<p>The most important distinction in a Dockerfile is <b>when</b> each line happens. Everything except <code>CMD</code> happens once, at <b>build time</b>, when you create the image. <code>CMD</code> happens every time a container starts, at <b>run time</b>.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="docker build turns a Dockerfile and project files into an image; docker run starts the CMD in a container">
<rect class="bx-info" x="10" y="20" width="110" height="60" rx="8"/><text class="t-b" x="65" y="45" text-anchor="middle">Dockerfile</text><text class="t-s" x="65" y="66" text-anchor="middle">+ your files</text>
<path class="ln" d="M120 50h32"/><polygon class="ah" points="150,44 150,56 158,50"/>
<rect class="bx-a" x="160" y="20" width="100" height="60" rx="8"/><text class="t-b t-a" x="210" y="56" text-anchor="middle">image</text>
<path class="ln-ok" d="M260 50h32"/><polygon class="ah-ok" points="290,44 290,56 298,50"/>
<rect class="bx-ok" x="300" y="20" width="110" height="60" rx="8"/><text class="t-b t-ok" x="355" y="56" text-anchor="middle">container</text>
<text class="t-m" x="139" y="104" text-anchor="middle">build</text><text class="t-m" x="279" y="104" text-anchor="middle">run</text>
<line class="ln-d" x1="10" y1="122" x2="410" y2="122"/>
<text class="t-b" x="110" y="150" text-anchor="middle">build time, once</text>
<text class="t-s" x="110" y="172" text-anchor="middle">FROM, WORKDIR, COPY, RUN</text>
<text class="t-s" x="110" y="192" text-anchor="middle">npm install happens here</text>
<text class="t-b" x="320" y="150" text-anchor="middle">run time, every start</text>
<text class="t-s" x="320" y="172" text-anchor="middle">CMD</text>
<text class="t-s" x="320" y="192" text-anchor="middle">node server.js runs here</text>
</svg><figcaption>docker build reads the Dockerfile and your files once, and produces an image with everything already installed. docker run starts a container from that image, and only then runs the CMD, node server dot js. A RUN line happens at build time, a CMD at run time.</figcaption></figure>
<p>That is why installing packages goes in <code>RUN</code>: you want it done once and baked into the image, not repeated on every start. And it is why the server goes in <code>CMD</code>: a server that started during the build would just block the build forever.</p>

<h4>Building and running: <code>docker build -t hello-api .</code></h4>
<p>Two parts of the build command matter:</p>
<ul>
<li><code>-t hello-api</code> <b>tags</b> the image with a name, so you can run it by name. With no <code>:tag</code>, it becomes <code>hello-api:latest</code>.</li>
<li>The final <code>.</code> is the <b>build context</b>: the folder whose files Docker may use. <code>COPY</code> can only see files inside it. Here it is the current folder, <code>~/hello-api</code>.</li>
</ul>
<p>Docker prints a numbered line for each step and finishes with the image name. Then you run it exactly as you ran nginx, using the app's port on both sides:</p>
<pre class="snip">docker build -t hello-api .
docker run -d -p 3000:3000 --name api hello-api
curl localhost:3000        # Hello from Docker</pre>
<p>Inside the container, <code>server.js</code> listens on port 3000; <code>-p 3000:3000</code> publishes it as port 3000 on your machine.</p>

<h4>Layers and the build cache</h4>
<p>Each instruction that changes files, <code>FROM</code>, <code>COPY</code>, <code>RUN</code> and <code>WORKDIR</code>, produces a <b>layer</b>: the set of files that step added or changed. The image is those layers stacked up. <code>EXPOSE</code> and <code>CMD</code> only record settings.</p>
<p>Docker keeps every layer it builds in a <b>cache</b>. On the next build, for each step it asks: "is this step's input exactly the same as last time?" For a <code>RUN</code>, the input is the command text. For a <code>COPY</code>, it is also the contents of the files being copied. If the input is unchanged, Docker reuses the stored layer and prints <code>CACHED</code>, which takes no time. The rule that makes order matter is this: <b>once one step has to rebuild, every step after it rebuilds too</b>, because each layer sits on top of the one before.</p>
<figure class="fig"><svg viewBox="0 0 420 260" role="img" aria-label="After editing server.js, the good order reuses the npm install layer; the bad order reinstalls">
<text class="t-b t-ok" x="105" y="18" text-anchor="middle">good order</text>
<text class="t-b t-bad" x="315" y="18" text-anchor="middle">bad order</text>
<g text-anchor="middle">
<rect class="bx-ok" x="10" y="30" width="190" height="32" rx="6"/><text class="t-s" x="105" y="51">FROM: cached</text>
<rect class="bx-ok" x="10" y="68" width="190" height="32" rx="6"/><text class="t-s" x="105" y="89">WORKDIR: cached</text>
<rect class="bx-ok" x="10" y="106" width="190" height="32" rx="6"/><text class="t-s" x="105" y="127">COPY package: cached</text>
<rect class="bx-ok" x="10" y="144" width="190" height="32" rx="6"/><text class="t-s" x="105" y="165">npm install: cached</text>
<rect class="bx-warn" x="10" y="182" width="190" height="32" rx="6"/><text class="t-s" x="105" y="203">COPY . . : rebuilt</text>
<rect class="bx-ok" x="220" y="30" width="190" height="32" rx="6"/><text class="t-s" x="315" y="51">FROM: cached</text>
<rect class="bx-ok" x="220" y="68" width="190" height="32" rx="6"/><text class="t-s" x="315" y="89">WORKDIR: cached</text>
<rect class="bx-warn" x="220" y="106" width="190" height="32" rx="6"/><text class="t-s" x="315" y="127">COPY . . : rebuilt</text>
<rect class="bx-bad" x="220" y="144" width="190" height="32" rx="6"/><text class="t-s" x="315" y="165">npm install: rebuilt</text>
<text class="t-s t-ok" x="105" y="242">about a second</text>
<text class="t-s t-bad" x="315" y="242">reinstalls every package</text>
</g>
</svg><figcaption>You edited server dot js and rebuilt. In the good order, the package files have not changed, so npm install is reused from the cache and only the final copy reruns. In the bad order, the code is copied before npm install, so the changed file forces npm install to run again from scratch.</figcaption></figure>
<p>That is the whole reason for copying <code>package*.json</code> on its own first. Your dependencies change rarely; your code changes all the time. Putting the slow, rarely changing step first means everyday edits only rerun the fast final copy. In the lesson's last task you edit the message in <code>server.js</code>, rebuild, and should see <code>CACHED</code> next to the early steps.</p>
<div class="tip"><b>Tip</b>Add a <code>.dockerignore</code> file listing <code>node_modules</code> (and things like <code>.git</code> and <code>.env</code>). It works like <code>.gitignore</code>: those paths are left out of the build context, so <code>COPY . .</code> cannot overwrite the packages installed inside the image, or leak secrets into it.</div>

<h4>Reading build and run errors</h4>
<ul>
<li><code>"docker build" requires exactly 1 argument</code>: you forgot the final dot.</li>
<li>A <code>COPY</code> step failing with <code>not found</code>: the file is not in the build context. Check the name, the folder you ran the build from, and <code>.dockerignore</code>.</li>
<li>A <code>RUN</code> step failing: its command returned an error, for example npm could not install a package. The build stops there, and the lines just above the error explain why.</li>
<li>The container shows <code>Exited (1)</code> straight after <code>docker run</code>: the app crashed on start. <code>docker logs api</code> shows its error, such as a missing file in <code>CMD</code>.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Rebuilding and expecting the running container to change. A container is made from the image as it was when the container was created. After a rebuild, remove the old container (<code>docker rm -f api</code>) and run a new one from the new image.</div>
<div class="try"><b>Try it in your head</b>You add a new package to <code>package.json</code> and rebuild. Which steps are cached? <code>FROM</code> and <code>WORKDIR</code> are. <code>COPY package*.json ./</code> now has different input, so it rebuilds, and so does everything after it: <code>npm install</code> and <code>COPY . .</code>. That is correct behaviour: new dependencies really do need installing.</div>

<h4>Recap</h4>
<ul>
<li>A Dockerfile is a recipe: <code>FROM</code> a base, <code>WORKDIR</code>, <code>COPY</code> files in, <code>RUN</code> build steps, <code>EXPOSE</code> to document the port, and <code>CMD</code> to start the app.</li>
<li><code>RUN</code> happens once at build time; <code>CMD</code> runs every time a container starts.</li>
<li><code>docker build -t name .</code> builds an image from the current folder, the build context.</li>
<li>Each step is a cached layer; once a step changes, every later step rebuilds.</li>
<li>Copy <code>package*.json</code> and install before <code>COPY . .</code>, so code edits do not trigger a reinstall.</li>
</ul>
`);
