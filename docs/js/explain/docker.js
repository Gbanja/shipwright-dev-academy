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
