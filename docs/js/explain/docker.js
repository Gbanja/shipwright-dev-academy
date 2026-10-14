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

explain('d4',`
<h4>Three things every real container needs</h4>
<p>The containers so far were simple: start, serve a page, get thrown away. A real app, and especially a database, needs three more things:</p>
<ol>
<li><b>Configuration.</b> The same image must run on your laptop and in production with different passwords and settings, without rebuilding.</li>
<li><b>Data that survives.</b> You will delete and replace containers constantly, for new versions or new settings. The data must not disappear with them.</li>
<li><b>A way to talk to each other.</b> Your app container has to find the database container.</li>
</ol>
<p>Docker's answers are <b>environment variables</b>, <b>volumes</b> and <b>networks</b>. You will use all three to run PostgreSQL, the database you met in the SQL track.</p>

<h4>Configuration: environment variables with <code>-e</code></h4>
<p>An <b>environment variable</b> is a named setting handed to a program when it starts, like <code>PORT=3000</code>. You have seen them in <code>.env</code> files; in Node.js a program reads them with <code>process.env.PORT</code>. They are the standard way to configure containers, because the image stays generic and each place that runs it supplies its own values.</p>
<p><code>-e KEY=value</code> sets one for a container. You can repeat it as many times as you need:</p>
<pre class="snip">docker run -d --name db -e POSTGRES_PASSWORD=secret postgres:16</pre>
<p>The official Postgres image reads <code>POSTGRES_PASSWORD</code> the first time it starts, and uses it as the password of the main database user, called <code>postgres</code>. Which variables an image understands is listed on its page on Docker Hub.</p>
<p>The settings are fixed when the container is created. To change one, you remove the container and run a new one with the new value.</p>

<h4>A failure on purpose: reading the logs</h4>
<p>The lesson first asks you to start Postgres <b>without</b> a password. <code>docker run</code> prints a container ID and looks fine. But <code>docker ps</code> shows nothing, and <code>docker ps -a</code> shows the container as <code>Exited (1)</code>: the main process stopped with an error. This is when you ask the container what happened:</p>
<pre class="snip">$ docker logs db
Error: Database is uninitialized and superuser password
is not specified.
You must specify POSTGRES_PASSWORD to a non-empty value...</pre>
<p>The image refuses to create a database nobody could log in to safely, and it tells you exactly which setting is missing. Before you start it properly, remove the failed container with <code>docker rm db</code>; otherwise the name <code>db</code> is still taken.</p>

<h4>Data that survives: volumes</h4>
<p>Every container has its own writable layer on top of its image. Postgres saves its tables there by default, in <code>/var/lib/postgresql/data</code>. But that layer belongs to the container: <code>docker rm</code> deletes it, and every row of data with it.</p>
<p>A <b>volume</b> is storage that Docker manages separately from any container. You create it once, then <b>mount</b> it into a container at a path, so that whatever the container writes to that path really goes into the volume. When the container is removed, the volume stays. Mount the same volume into a new container and the data is right there.</p>
<pre class="snip">docker volume create pgdata
-v pgdata:/var/lib/postgresql/data   # volume name : path inside</pre>
<p>The <code>-v</code> option reads like <code>-p</code>: the left side is outside (the volume called <code>pgdata</code>), the right side is inside the container (the folder where Postgres 16 keeps its files). The right-hand path depends on the image, so check its documentation.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="The first db container is removed, a second one mounts the same pgdata volume and finds the data">
<rect class="bx-bad" x="10" y="16" width="160" height="56" rx="8"/><text class="t-b" x="90" y="40" text-anchor="middle">db, first</text><text class="t-s t-bad" x="90" y="60" text-anchor="middle">removed with rm -f</text>
<rect class="bx-ok" x="250" y="16" width="160" height="56" rx="8"/><text class="t-b" x="330" y="40" text-anchor="middle">db, second</text><text class="t-s t-ok" x="330" y="60" text-anchor="middle">new container</text>
<path class="ln" d="M170 44h72"/><polygon class="ah" points="240,38 240,50 248,44"/><text class="t-s" x="208" y="36" text-anchor="middle">later</text>
<path class="ln-d" d="M90 72v50h80"/><path class="ln-ok" d="M330 72v50h-80"/>
<rect class="bx-a" x="140" y="110" width="140" height="56" rx="10"/><text class="t-b t-a" x="210" y="134" text-anchor="middle">pgdata</text><text class="t-s" x="210" y="154" text-anchor="middle">volume</text>
<text class="t-s" x="210" y="192" text-anchor="middle">the users table lives here, not in either container</text>
<text class="t-s" x="210" y="214" text-anchor="middle">mounted at /var/lib/postgresql/data</text>
</svg><figcaption>The first database container writes its data into the pgdata volume. When that container is removed, the volume stays. A brand new container mounts the same volume and finds all the data waiting, so nothing is lost.</figcaption></figure>
<p>There is a second kind of mount you will see often: a <b>bind mount</b>, such as <code>-v ./site:/usr/share/nginx/html</code>, which mounts a folder from your own machine instead of a Docker-managed volume. It is handy in development for live-editing files. For database data, named volumes are the usual choice.</p>

<h4>Talking to each other: networks</h4>
<p>As you saw with ports, each container has its own network. To let containers reach each other, you put them on the same <b>user-defined network</b>, one that you create yourself:</p>
<pre class="snip">docker network create appnet
docker run ... --network appnet --name db ... postgres:16</pre>
<p>A user-defined network comes with a built-in phone book (DNS, the system that turns names into addresses). Any container on <code>appnet</code> can reach this database simply as <code>db</code>, on its normal port: <code>db:5432</code>. The name is the container's <code>--name</code>. Docker's default network, used when you give no <code>--network</code>, does not offer this lookup by name, which is why you create your own.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="On the appnet network, the api container reaches the db container at db:5432; only published ports are reachable from your machine">
<rect class="bx-info" x="10" y="14" width="400" height="120" rx="12"/>
<text class="t-b t-info" x="24" y="36">network: appnet</text>
<rect class="bx-ok" x="30" y="54" width="120" height="56" rx="8"/><text class="t-b" x="90" y="78" text-anchor="middle">api</text><text class="t-s" x="90" y="98" text-anchor="middle">your app</text>
<rect class="bx-a" x="270" y="54" width="120" height="56" rx="8"/><text class="t-b" x="330" y="78" text-anchor="middle">db</text><text class="t-s" x="330" y="98" text-anchor="middle">postgres :5432</text>
<path class="ln-ok" d="M150 82h112"/><polygon class="ah-ok" points="260,76 260,88 268,82"/>
<text class="t-m t-ok" x="208" y="74" text-anchor="middle">db:5432</text>
<text class="t-s" x="210" y="162" text-anchor="middle">containers on one network find each other by name</text>
<text class="t-s" x="210" y="184" text-anchor="middle">no -p needed for container to container traffic</text>
</svg><figcaption>Both containers are on the appnet network. The app reaches the database by its container name, db, on port 5432. Publishing with dash p is only needed when your own machine must reach a container, not for containers talking to each other.</figcaption></figure>

<h4>Getting inside: <code>docker exec</code></h4>
<p><code>docker exec</code> runs an extra command inside a container that is already running. It does not start a new container; it adds a process to an existing one.</p>
<pre class="snip">docker exec -it db psql -U postgres   # Postgres's command-line client
docker exec -it db sh                 # a plain shell inside db</pre>
<p><code>-i</code> (interactive) keeps the input open so you can type, and <code>-t</code> gives you a proper terminal; together, <code>-it</code>, they are what you want for anything you type into. <code>psql -U postgres</code> opens Postgres's own command line as the user <code>postgres</code>. Type <code>\\q</code> to leave it. In the sandbox, connecting also creates a <code>users</code> table in the volume, so you have something to keep.</p>

<h4>Worked example: proving the data survives</h4>
<p>Here is the full, correct command. The backslash at the end of a line lets one command continue on the next line, so it is easier to read:</p>
<pre class="snip">docker run -d --name db \\
  --network appnet \\
  -e POSTGRES_PASSWORD=secret \\
  -v pgdata:/var/lib/postgresql/data \\
  postgres:16</pre>
<ul>
<li><code>--network appnet</code>: other containers on appnet can reach it as <code>db</code>.</li>
<li><code>-e POSTGRES_PASSWORD=secret</code>: the configuration it was missing.</li>
<li><code>-v pgdata:/var/lib/postgresql/data</code>: the data lives in the volume, not the container.</li>
</ul>
<p>Now the test. <code>docker rm -f db</code> destroys the container. Run the exact same command again, then <code>docker logs db</code>. On its very first start, Postgres had to create a new database. This time the logs say <code>PostgreSQL Database directory appears to contain a database; Skipping initialization</code>. That line is your proof: the new container found the old data in the volume.</p>
<div class="mistake"><b>Common mistake</b>Forgetting <code>-v</code> on a database container. Everything works perfectly until the first time you remove the container to upgrade it, and then every table is gone. Decide where the data lives before you put anything in it.</div>
<div class="mistake"><b>Common mistake</b>Thinking volumes are permanent no matter what. <code>docker volume rm pgdata</code> and <code>docker volume prune</code> really do delete the data, and <code>docker rm -v</code> also removes a container's unnamed volumes. Read twice before running anything that deletes volumes.</div>
<div class="try"><b>Try it in your head</b>You start a second container, <code>api</code>, on <code>appnet</code>. What host name should its database setting use, and does <code>db</code> need <code>-p 5432:5432</code>? The host is <code>db</code>, the container's name, on port 5432. No <code>-p</code> is needed, because both containers are on the same network; you would only publish the port if a program on your own machine had to connect.</div>

<h4>Recap</h4>
<ul>
<li><code>-e KEY=value</code> configures a container at creation; the image stays generic.</li>
<li>When a container will not stay up, <code>docker ps -a</code> shows the exit code and <code>docker logs NAME</code> shows why.</li>
<li>A container's own files vanish on <code>docker rm</code>. A volume, mounted with <code>-v name:/path</code>, keeps data across containers.</li>
<li>Containers on the same user-defined network (<code>--network</code>) reach each other by container name, such as <code>db:5432</code>.</li>
<li><code>docker exec -it NAME command</code> runs a command inside a running container.</li>
</ul>
`);

explain('d5',`
<h4>Why Compose exists</h4>
<p>At the end of the last lesson, running one database took a command with a network, an environment variable and a volume. A real app has several containers: your API, a database, maybe a cache. Each one needs its own long <code>docker run</code> command, in the right order, with matching names, every time anyone on the team starts the project. That is slow and easy to get wrong.</p>
<p><b>Docker Compose</b> solves it by moving all those settings into one file, <code>compose.yaml</code>, kept in the project folder. The file describes <b>what</b> you want running: which containers, with which ports, settings, volumes and connections. Then one command, <code>docker compose up</code>, makes it so. Because the file lives in Git, everyone gets the same setup.</p>

<h4>Reading YAML in two minutes</h4>
<p>Compose files are written in <b>YAML</b>, a format designed to be easy for humans to read. You only need three rules:</p>
<ul>
<li><code>key: value</code> sets a value. The space after the colon is required.</li>
<li><b>Indentation shows nesting.</b> Lines indented under a key belong to it. Use spaces, never tabs, and keep the same depth for items at the same level. Two spaces per level is the habit.</li>
<li>A line starting with <code>- </code> is one item in a list.</li>
</ul>
<pre class="snip">services:            # a key whose value is everything indented below
  db:                # one service, nested inside services
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data   # a list with one item</pre>

<h4>The lesson's <code>compose.yaml</code>, piece by piece</h4>
<p>Everything under <code>services</code> is one <b>service</b>: a container Compose will run, named by its key. This file has two, <code>web</code> and <code>db</code>. Nearly every setting matches a <code>docker run</code> option you already know:</p>
<div class="tbl-wrap"><table><tr><th>In compose.yaml</th><th>Same as</th></tr>
<tr><td><code>build: .</code></td><td><code>docker build .</code> using the Dockerfile in this folder</td></tr>
<tr><td><code>image: postgres:16</code></td><td>The image name in <code>docker run</code></td></tr>
<tr><td><code>ports: - "3000:3000"</code></td><td><code>-p 3000:3000</code></td></tr>
<tr><td><code>environment:</code></td><td><code>-e KEY=value</code>, one per line</td></tr>
<tr><td><code>volumes: - pgdata:/var/lib/...</code></td><td><code>-v pgdata:/var/lib/...</code></td></tr>
<tr><td><code>depends_on: - db</code></td><td>Start <code>db</code> before <code>web</code></td></tr></table></div>
<p>Two more details. The port is written in quotes, <code>"3000:3000"</code>, because YAML can misread some unquoted numbers containing colons; quoting ports is the safe habit. And the <code>volumes:</code> block at the very bottom, outside <code>services</code>, declares the named volume <code>pgdata</code> so Compose creates it for you.</p>

<h4>One command: <code>docker compose up -d</code></h4>
<p>Run it in the folder that contains <code>compose.yaml</code>. Compose then does everything you did by hand in the last lesson:</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="docker compose up reads compose.yaml and creates a network, a volume and two containers">
<rect class="bx-info" x="140" y="10" width="140" height="36" rx="8"/><text class="t-m" x="210" y="34" text-anchor="middle">compose.yaml</text>
<path class="ln" d="M210 46v22"/><polygon class="ah" points="204,66 216,66 210,74"/>
<text class="t-s" x="222" y="62">up -d</text>
<rect class="bx" x="10" y="78" width="400" height="120" rx="12"/>
<text class="t-b" x="24" y="100">network: shop_default</text>
<rect class="bx-ok" x="30" y="116" width="130" height="62" rx="8"/><text class="t-b" x="95" y="142" text-anchor="middle">web</text><text class="t-s" x="95" y="164" text-anchor="middle">built from .</text>
<rect class="bx-a" x="260" y="116" width="130" height="62" rx="8"/><text class="t-b" x="325" y="142" text-anchor="middle">db</text><text class="t-s" x="325" y="164" text-anchor="middle">postgres:16</text>
<path class="ln" d="M160 147h92"/><polygon class="ah" points="250,141 250,153 258,147"/>
<text class="t-s" x="208" y="139" text-anchor="middle">by name</text>
<rect class="bx-warn" x="260" y="208" width="130" height="34" rx="14"/><text class="t-s" x="325" y="230" text-anchor="middle">volume pgdata</text>
<path class="ln-d" d="M325 178v30M95 178v26"/>
<text class="t-s" x="95" y="220" text-anchor="middle">localhost:3000</text>
<text class="t-s" x="95" y="238" text-anchor="middle">published to you</text>
</svg><figcaption>docker compose up reads compose dot yaml and creates everything in it: a private network named after the folder, the web container built from the Dockerfile, the db container from the postgres image, and the pgdata volume mounted into db. Services on the network reach each other by service name.</figcaption></figure>
<ol>
<li>It builds the <code>web</code> image from the Dockerfile, because of <code>build: .</code>.</li>
<li>It creates a network for the project, named after the folder: <code>shop_default</code>.</li>
<li>It creates the <code>pgdata</code> volume (shown as <code>shop_pgdata</code>, with the project name in front).</li>
<li>It starts <code>db</code>, then <code>web</code>, because web depends on db.</li>
</ol>
<p>Every service joins that network, and each one is reachable by its <b>service name</b>: the database is simply <code>db</code>. <code>-d</code> means detached, exactly as with <code>docker run</code>. The command is <code>docker compose</code>, with a space; you may still see the older separate tool written <code>docker-compose</code> in tutorials.</p>

<h4>The classic bug: <code>localhost</code> inside a container</h4>
<p>The provided file has a bug that catches almost everyone once. Look at the database address the app is given:</p>
<pre class="snip">DATABASE_URL: postgres://postgres:secret@localhost:5432/shop
#                      user   :password@host     :port/database</pre>
<p>A connection URL packs everything into one line: the kind of database, the user and password, the <b>host</b> (which machine), the port, and the database name. The host here is <code>localhost</code>. When you <code>curl localhost:3000</code>, the API answers with an error containing <code>ECONNREFUSED</code>, short for "connection refused": the app knocked on that address and port, and nothing was listening.</p>
<p>Why? <code>localhost</code> always means "the machine I am running on". For a process inside a container, that machine is <b>its own container</b>. The <code>web</code> container has nothing on port 5432; Postgres lives in a different container, with a different localhost of its own.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Inside web, localhost loops back to web itself and fails; the name db reaches the database container">
<rect class="bx-ok" x="10" y="20" width="170" height="130" rx="10"/><text class="t-b" x="95" y="44" text-anchor="middle">web container</text>
<rect class="bx" x="30" y="60" width="130" height="34" rx="6"/><text class="t-s" x="95" y="82" text-anchor="middle">node app</text>
<path class="ln-a" d="M95 94v14h-75v-31h2" fill="none"/><polygon class="ah-a" points="22,71 22,83 30,77"/>
<text class="t-s t-bad" x="95" y="134" text-anchor="middle">localhost: refused</text>
<rect class="bx-a" x="250" y="20" width="160" height="130" rx="10"/><text class="t-b" x="330" y="44" text-anchor="middle">db container</text>
<rect class="bx" x="270" y="60" width="120" height="34" rx="6"/><text class="t-s" x="330" y="82" text-anchor="middle">postgres :5432</text>
<path class="ln-ok" d="M160 77h102"/><polygon class="ah-ok" points="260,71 260,83 268,77"/>
<text class="t-m t-ok" x="214" y="68" text-anchor="middle">db</text>
<text class="t-s" x="210" y="184" text-anchor="middle">each container has its own localhost</text>
</svg><figcaption>Inside the web container, localhost points back at the web container itself, where nothing listens on port 5432, so the connection is refused. Using the service name db sends the connection across the Compose network to the database container.</figcaption></figure>
<p>The fix is to use the service name as the host: <code>@db:5432</code>. Edit the file, then run <code>docker compose up -d</code> again. Compose compares the file with what is running, sees that only <code>web</code>'s settings changed, and recreates just that container. The next <code>curl localhost:3000</code> connects. (On your own machine, <code>localhost:3000</code> is correct, because that request comes from your machine and reaches web through the published port.)</p>

<h4>Everyday commands: <code>ps</code>, <code>logs</code>, <code>down</code></h4>
<pre class="snip">docker compose ps          # this project's containers and their status
docker compose logs web    # one service's logs (-f to follow)
docker compose down        # stop and remove containers and network</pre>
<p>These work on the project in the current folder, so you use service names like <code>web</code> rather than full container names. <code>down</code> removes the containers and the network but <b>keeps volumes</b>, so your database survives until next time. <code>docker compose down -v</code> also deletes the volumes, and with them all the data.</p>
<div class="mistake"><b>Common mistake</b>Trusting <code>depends_on</code> to wait until the database is ready. It only controls start order: db's container is <i>started</i> first, but Postgres may need a few more seconds before it accepts connections. Real projects add a <code>healthcheck</code> to the db service and write <code>condition: service_healthy</code> under depends_on, or make the app retry its connection.</div>
<div class="mistake"><b>Common mistake</b>Indenting with tabs, or by an uneven number of spaces. YAML then either refuses the file or, worse, silently attaches a setting to the wrong service. If Compose reports a parsing error, look at the indentation of the line it names and the line above.</div>
<div class="try"><b>Try it in your head</b>You add a third service called <code>cache</code> using the <code>redis:7</code> image, which listens on port 6379. What address should <code>web</code> use for it, and does cache need a <code>ports</code> entry? <code>cache:6379</code>, the service name and its port. No <code>ports</code> entry is needed, because web reaches it over the project network; you would only publish it to connect from your own machine.</div>

<h4>Recap</h4>
<ul>
<li><code>compose.yaml</code> describes a whole app: services with their image or build, ports, environment, volumes and dependencies.</li>
<li><code>docker compose up -d</code> builds, creates a project network and volumes, and starts everything; run it again after edits to apply changes.</li>
<li>Services reach each other by <b>service name</b>, such as <code>db:5432</code>.</li>
<li>Inside a container, <code>localhost</code> means that container itself, never another service.</li>
<li><code>docker compose ps</code>, <code>logs</code> and <code>down</code> manage the stack; <code>down</code> keeps volumes unless you add <code>-v</code>.</li>
</ul>
`);

explain('d6',`
<h4>Why a smaller image matters</h4>
<p>Your site in <code>~/site</code> is built with <b>Vite</b>, a frontend build tool. To <b>build</b> it you need Node.js, npm and a folder full of packages. But the result of the build is just a handful of plain HTML, CSS and JavaScript files. To <b>serve</b> those files to visitors you only need them and a small web server.</p>
<p>The current Dockerfile ignores that difference. It starts from <code>node:20</code>, copies everything, installs, builds, and then ships the lot: Node, npm, the source code, every package in <code>node_modules</code>, and the build output. That image weighs around a gigabyte. Shipping it costs you three ways:</p>
<ul>
<li><b>Speed:</b> every deploy uploads and downloads far more data than it needs.</li>
<li><b>Storage:</b> every version you keep takes that space again in the registry and on servers.</li>
<li><b>Security:</b> every program in the image is something that could have a vulnerability. Tools you do not ship cannot be attacked.</li>
</ul>
<p>A <b>multi-stage build</b> keeps the convenience of building inside Docker, but ships only the result.</p>

<h4>What <code>npm run build</code> produces</h4>
<p><code>package.json</code> defines a script called <code>build</code> that runs <code>vite build</code>. Vite reads your source files, bundles and shrinks them, and writes the finished site into a folder called <code>dist</code> (short for distribution). Everything a browser needs is in <code>dist</code>; nothing else in the project is needed at run time. Remember that folder name: it is the only thing worth keeping.</p>

<h4>Multi-stage builds: build in one place, ship from another</h4>
<p>A multi-stage Dockerfile simply has more than one <code>FROM</code>. Each <code>FROM</code> starts a new, empty <b>stage</b> on a new base image. You can name a stage with <code>AS</code>, and a later stage can copy files out of an earlier one with <code>COPY --from=name</code>. Only the <b>last</b> stage becomes the image you tag and ship; earlier stages are scaffolding that gets left behind.</p>
<pre class="snip">FROM node:20-alpine AS build      # stage 1, named "build"
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build                 # creates /app/dist

FROM nginx:alpine                 # stage 2: a fresh, small start
COPY --from=build /app/dist /usr/share/nginx/html</pre>
<p>The first stage is the Dockerfile you already know, with the same caching-friendly order from the Dockerfile lesson. The second stage starts again from <code>nginx:alpine</code>, the nginx web server on Alpine Linux, and copies in one thing: the <code>dist</code> folder from the build stage. <code>/usr/share/nginx/html</code> is the folder the nginx image serves files from by default.</p>
<p>Notice there is no <code>CMD</code> in the final stage. An image inherits settings from its base, and <code>nginx:alpine</code> already has a <code>CMD</code> that starts nginx on port 80.</p>
<figure class="fig"><svg viewBox="0 0 420 270" role="img" aria-label="The build stage holds Node, packages and source; only the dist folder is copied into the small nginx stage">
<rect class="bx" x="10" y="10" width="180" height="200" rx="10"/>
<text class="t-b" x="100" y="34" text-anchor="middle">stage 1: build</text>
<rect class="bx-bad" x="24" y="48" width="152" height="30" rx="6"/><text class="t-s" x="100" y="68" text-anchor="middle">Node.js and npm</text>
<rect class="bx-bad" x="24" y="84" width="152" height="30" rx="6"/><text class="t-s" x="100" y="104" text-anchor="middle">node_modules</text>
<rect class="bx-bad" x="24" y="120" width="152" height="30" rx="6"/><text class="t-s" x="100" y="140" text-anchor="middle">source code</text>
<rect class="bx-ok" x="24" y="160" width="152" height="34" rx="6"/><text class="t-m" x="100" y="182" text-anchor="middle">/app/dist</text>
<rect class="bx-a" x="230" y="60" width="180" height="150" rx="10"/>
<text class="t-b" x="320" y="84" text-anchor="middle">stage 2: ships</text>
<rect class="bx" x="244" y="100" width="152" height="30" rx="6"/><text class="t-s" x="320" y="120" text-anchor="middle">nginx:alpine</text>
<rect class="bx-ok" x="244" y="160" width="152" height="34" rx="6"/><text class="t-s" x="320" y="182" text-anchor="middle">site files only</text>
<path class="ln-ok" d="M176 177h60"/><polygon class="ah-ok" points="234,171 234,183 242,177"/>
<text class="t-s t-ok" x="209" y="234" text-anchor="middle">COPY --from=build</text>
<text class="t-s t-bad" x="100" y="258" text-anchor="middle">left behind</text>
<text class="t-s t-ok" x="320" y="258" text-anchor="middle">the final image</text>
</svg><figcaption>The build stage contains Node, npm, all the packages and the source code, and produces the dist folder. COPY dash dash from equals build carries only dist into the second stage, which starts from the small nginx image. Everything else stays behind and is not shipped.</figcaption></figure>

<h4>Worked example: fat versus slim</h4>
<p>The lesson has you build both versions and compare them:</p>
<pre class="snip">docker build -t site:fat .     # the original Dockerfile
# rewrite the Dockerfile as two stages, then:
docker build -t site:slim .
docker images                  # compare the SIZE column</pre>
<p>Here the tag after the colon is used as a label for the variant: <code>site:fat</code> and <code>site:slim</code> are two images in the same repository. The slim one is a few tens of megabytes; the fat one is many times larger. Then run the slim one and check it serves the site. nginx listens on port 80 inside, so publish it as usual:</p>
<pre class="snip">docker run -d -p 8080:80 --name site site:slim
curl localhost:8080</pre>

<h4>Image names, and what a tag really is</h4>
<p>To share an image you push it to a <b>registry</b>, and the image's name says exactly where it goes. A full name has up to four parts:</p>
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="The parts of an image name: registry, user, repository and tag">
<rect class="bx-dark" x="10" y="12" width="400" height="46" rx="6"/>
<text class="t-term" x="210" y="41" text-anchor="middle" style="font-size:18px">docker.io/you/site:1.0</text>
<path class="ln" d="M100 60v20M175 60v52M230 60v20M287 60v52"/>
<g text-anchor="middle">
<text class="t" x="100" y="98">registry</text>
<text class="t" x="175" y="130">your user</text>
<text class="t" x="230" y="98">repository</text>
<text class="t-b t-a" x="300" y="130">tag</text>
</g>
<text class="t-s" x="210" y="154" text-anchor="middle">docker.io is the default, so you can leave it out</text>
</svg><figcaption>An image name is the registry, your user name, the repository and the tag. docker dot io is Docker Hub and is assumed when you leave it out, so you slash site colon 1 point 0 means the same thing.</figcaption></figure>
<p>Official images like <code>nginx</code> have no user part because they live in Docker Hub's special <code>library</code> collection. Your own images must start with your Docker Hub user name, because that is the space you are allowed to push into.</p>
<p><code>docker tag site:slim you/site:1.0</code> does not copy anything. It adds a second name that points at the <b>same</b> image; in <code>docker images</code> both rows show the same <code>IMAGE ID</code>. Think of it as a second label on the same box.</p>

<h4>Logging in and pushing</h4>
<p>Pushing needs an account and a login. <code>docker login</code> asks for your Docker Hub user name and password (for real accounts, Docker recommends a <b>personal access token</b> instead of your password). Then <code>docker push you/site:1.0</code> uploads the image.</p>
<figure class="fig"><svg viewBox="0 0 420 130" role="img" aria-label="You push the image to Docker Hub, and a server pulls the same tagged image">
<rect class="bx-info" x="10" y="30" width="110" height="50" rx="8"/><text class="t-b" x="65" y="60" text-anchor="middle">laptop or CI</text>
<path class="ln-a" d="M120 55h40"/><polygon class="ah-a" points="158,49 158,61 166,55"/><text class="t-s" x="141" y="45" text-anchor="middle">push</text>
<rect class="bx-a" x="168" y="30" width="96" height="50" rx="8"/><text class="t-b" x="216" y="60" text-anchor="middle">registry</text>
<path class="ln-ok" d="M264 55h40"/><polygon class="ah-ok" points="302,49 302,61 310,55"/><text class="t-s" x="285" y="45" text-anchor="middle">pull</text>
<rect class="bx-ok" x="312" y="30" width="98" height="50" rx="8"/><text class="t-b" x="361" y="60" text-anchor="middle">servers</text>
<text class="t-m" x="216" y="112" text-anchor="middle">you/site:1.0</text>
</svg><figcaption>You or your CI pipeline push a tagged image to the registry once. Every server that needs it then pulls exactly the same image by its name and tag.</figcaption></figure>
<p>Like a pull, a push works layer by layer, and any layer the registry already has (such as the nginx base layers) is skipped. On a server, <code>docker pull you/site:1.0</code> fetches exactly that image. The Deploy track builds on exactly this.</p>
<div class="mistake"><b>Common mistake</b>Relying on <code>latest</code>. It is not magic and does not mean "newest": it is just the tag Docker uses when you do not give one, and it can point at different images on different days. In production, tag every release with a version, <code>1.0</code>, <code>1.1</code>, and deploy that exact tag. Then you always know what is running, and rolling back means running the previous tag.</div>

<h4>Reading the errors you might hit</h4>
<ul>
<li><code>denied: requested access to the resource is denied</code>: you are not logged in, or the name does not start with your own user name.</li>
<li><code>An image does not exist locally with the tag</code>: you tried to push a name you have not created yet. Run <code>docker tag</code> first.</li>
<li>A failed <code>COPY --from=build</code> with <code>not found</code>: the build stage wrote its output somewhere else. Some tools use <code>build</code> instead of <code>dist</code>; check what <code>npm run build</code> actually creates.</li>
</ul>
<div class="try"><b>Try it in your head</b>You fix a typo, rebuild as <code>site:slim</code>, and want to release it. What do you run? <code>docker tag site:slim you/site:1.1</code> and then <code>docker push you/site:1.1</code>. A new version number, not a reused one, so <code>1.0</code> still means the old release if you need to roll back.</div>

<h4>Recap</h4>
<ul>
<li>Building needs heavy tools; serving does not. Shipping the build tools makes images large, slow and riskier.</li>
<li>A multi-stage build has several <code>FROM</code> lines. <code>AS build</code> names a stage; <code>COPY --from=build</code> takes only the output into the last stage, which is what ships.</li>
<li>The final stage here is <code>nginx:alpine</code> serving <code>/usr/share/nginx/html</code> on port 80.</li>
<li>Image names are <code>registry/user/repository:tag</code>; <code>docker tag</code> adds a name to an existing image.</li>
<li><code>docker login</code>, then <code>docker push you/site:1.0</code>. Tag real versions instead of relying on <code>latest</code>.</li>
</ul>
`);
