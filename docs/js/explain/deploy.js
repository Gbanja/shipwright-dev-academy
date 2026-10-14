/* deploy: "Explained step by step" walkthroughs. */

explain('p1',`
<h4>Why you need to know this before you deploy</h4>
<p>Deploying means putting your code on a computer that other people can reach over the internet. Before you do that, it helps enormously to know what actually happens when someone types your address into a browser. When a site is "down", the fault is almost always in one of a handful of steps, and if you know the steps, you know where to look.</p>
<p>There are only three big ideas here: <b>DNS</b> finds the computer, <b>HTTP</b> is the conversation you have with it, and <b>HTTPS</b> makes that conversation private and proves you are talking to the right computer. You will use two terminal tools to see each one with your own eyes: <code>dig</code> and <code>curl</code>.</p>
<div class="analogy"><b>Think of it like</b>Posting a letter to a company. You know its name, but the post office needs a street address, so you look it up in a directory first (DNS). Then you write the letter in a format the company understands (HTTP). For anything private, you seal it in a locked envelope that only the real company can open (HTTPS).</div>

<h4>Names, IP addresses and ports</h4>
<p>Every computer on the internet has an <b>IP address</b>, a number that works like a street address. An older style IPv4 address looks like <code>140.82.121.4</code>: four numbers from 0 to 255 separated by dots. Newer IPv6 addresses are longer and use letters and colons, but the idea is the same.</p>
<p>Humans are bad at remembering numbers, so we use <b>domain names</b> like <code>github.com</code> instead. Something has to translate the name into the number. That translator is DNS.</p>
<p>One computer can run many programs that listen for connections, so an address alone is not enough. A <b>port</b> is a numbered door on the computer, and each kind of service waits behind its own door:</p>
<div class="tbl-wrap"><table><tr><th>Port</th><th>Used for</th></tr>
<tr><td><code>80</code></td><td>HTTP, plain unencrypted web traffic</td></tr>
<tr><td><code>443</code></td><td>HTTPS, encrypted web traffic. Almost every real site today.</td></tr>
<tr><td><code>22</code></td><td>SSH, logging in to a server remotely</td></tr>
<tr><td><code>3000</code></td><td>Nothing official. A popular choice for apps while you develop them.</td></tr></table></div>
<p>When you type <code>https://github.com</code>, the <code>https</code> part tells the browser to use door 443 unless the address says otherwise.</p>

<h4>The whole journey, step by step</h4>
<p>Here is what happens in the second or so after you press Enter:</p>
<figure class="fig"><svg viewBox="0 0 420 290" role="img" aria-label="Sequence: browser asks DNS for the IP, then connects securely to the server and exchanges a request and response">
<rect class="bx-a" x="15" y="10" width="100" height="36" rx="6"/><text class="t-b" x="65" y="34" text-anchor="middle">Browser</text>
<rect class="bx-info" x="160" y="10" width="100" height="36" rx="6"/><text class="t-b" x="210" y="34" text-anchor="middle">DNS</text>
<rect class="bx-ok" x="305" y="10" width="100" height="36" rx="6"/><text class="t-b" x="355" y="34" text-anchor="middle">Server</text>
<path class="ln-d" d="M65 46v234"/><path class="ln-d" d="M210 46v100"/><path class="ln-d" d="M355 46v234"/>
<text class="t-s" x="137" y="74" text-anchor="middle">1. github.com?</text>
<path class="ln" d="M65 84h137"/><polygon class="ah" points="200,78 200,90 208,84"/>
<text class="t-s" x="137" y="114" text-anchor="middle">2. 140.82.121.4</text>
<path class="ln" d="M210 124h-137"/><polygon class="ah" points="75,118 75,130 67,124"/>
<text class="t-s" x="210" y="164" text-anchor="middle">3. connect + TLS handshake</text>
<path class="ln-a" d="M65 174h282"/><polygon class="ah-a" points="345,168 345,180 353,174"/>
<text class="t-s" x="210" y="209" text-anchor="middle">4. HTTP request: GET /</text>
<path class="ln-a" d="M65 219h282"/><polygon class="ah-a" points="345,213 345,225 353,219"/>
<text class="t-s" x="210" y="254" text-anchor="middle">5. response: 200 OK + page</text>
<path class="ln-ok" d="M355 264h-282"/><polygon class="ah-ok" points="75,258 75,270 67,264"/>
</svg><figcaption>Time runs downwards. First the browser asks DNS for the IP address of the name. Then it opens a connection to that address, sets up encryption with the TLS handshake, sends an HTTP request and receives the response.</figcaption></figure>
<ol>
<li><b>DNS lookup.</b> The browser asks a DNS resolver, usually run by your internet provider or a service like Cloudflare or Google, "what is the IP address for github.com?"</li>
<li><b>Answer.</b> The resolver replies with an IP address. It remembers the answer for a while, so the next lookup is instant.</li>
<li><b>Connect and secure.</b> The browser opens a connection to that IP on port 443 and runs the <b>TLS handshake</b>: the two sides agree on encryption keys and the server proves who it is with a certificate.</li>
<li><b>Request.</b> Over that private connection, the browser sends an HTTP request: "please GET me the page at <code>/</code>".</li>
<li><b>Response.</b> The server replies with a status code, some headers and the page itself, and the browser draws it.</li>
</ol>
<p>Each step can fail on its own, and each failure looks different. That is why you will learn to test them one at a time.</p>

<h4>DNS records: A and CNAME</h4>
<p>DNS is a giant, distributed phone book. The owner of a domain writes <b>records</b> into it, and each record has a type. Two types matter most when you deploy:</p>
<ul>
<li>An <b>A record</b> ("A" for address) points a name straight at an IPv4 address. <code>github.com</code> has an A record pointing at <code>140.82.121.4</code>. (An AAAA record does the same for an IPv6 address.)</li>
<li>A <b>CNAME record</b> ("canonical name") points a name at <b>another name</b>. It says "this is just an alias; go and look up that other name instead".</li>
</ul>
<p>You will also meet <b>MX</b> records, which say where email for the domain should go, and <b>TXT</b> records, which hold short pieces of text. Services like Google and Vercel ask you to add a TXT record to prove you own a domain.</p>
<p>The tool for reading DNS records is <code>dig</code> (domain information groper). Its most useful part is the <b>ANSWER SECTION</b>:</p>
<pre class="snip">dig github.com
;; ANSWER SECTION:
github.com.      60   IN   A   140.82.121.4
#  name          TTL  class type  value</pre>
<p>Read that line left to right: the name, then the <b>TTL</b> (time to live: how many seconds resolvers may remember this answer), then <code>IN</code> (internet, always the same), then the record type and its value. The TTL explains a classic surprise: when you change a DNS record, some people see the old answer until their cached copy expires.</p>
<p>Now look at an alias. Asking about <code>www.github.com</code> gives two lines, because DNS follows the chain for you:</p>
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="www.github.com is a CNAME to github.com, which has an A record to 140.82.121.4">
<rect class="bx-info" x="10" y="20" width="160" height="44" rx="6"/><text class="t-m" x="90" y="47" text-anchor="middle">www.github.com</text>
<path class="ln" d="M170 42h50"/><polygon class="ah" points="218,36 218,48 226,42"/>
<text class="t-s t-info" x="198" y="30" text-anchor="middle">CNAME</text>
<rect class="bx" x="228" y="20" width="120" height="44" rx="6"/><text class="t-m" x="288" y="47" text-anchor="middle">github.com</text>
<path class="ln-a" d="M288 64v32"/><polygon class="ah-a" points="282,94 294,94 288,102"/>
<text class="t-s t-a" x="300" y="86">A</text>
<rect class="bx-ok" x="218" y="104" width="140" height="44" rx="6"/><text class="t-m" x="288" y="131" text-anchor="middle">140.82.121.4</text>
<text class="t-s" x="20" y="110">An alias points</text><text class="t-s" x="20" y="128">at a name, which</text><text class="t-s" x="20" y="146">points at an IP.</text>
</svg><figcaption>The www name is only an alias. Its CNAME record sends the lookup to github.com, and the A record on github.com gives the actual IP address. Change the A record once and both names follow.</figcaption></figure>
<p>That is exactly why a CNAME is the right tool for adding <code>www</code> to your own site. Your root domain (often called the <b>apex</b>, like <code>portfolio.dev</code>) has the A record. You make <code>www.portfolio.dev</code> a CNAME to <code>portfolio.dev</code>, and from then on both names always lead to the same server. The DNS rules do not allow a plain CNAME on the apex itself, which is another reason the apex usually gets the A record.</p>
<div class="mistake"><b>Common mistake</b>Pointing a record at <code>0.0.0.0</code> or a made-up IP "to be filled in later". <code>0.0.0.0</code> is not a real public server, so visitors get a connection error. If a record must exist, point it at the real address or alias it with a CNAME.</div>

<h4>HTTP: the request and the response</h4>
<p><b>HTTP</b> (HyperText Transfer Protocol) is the agreed format for the conversation. A <b>protocol</b> is just a set of rules both sides follow, like the rules of a letter: address first, greeting, then the message. Every HTTP exchange is one <b>request</b> and one <b>response</b>.</p>
<figure class="fig"><svg viewBox="0 0 420 300" role="img" aria-label="Anatomy of an HTTP request and response">
<text class="t-b" x="10" y="20">Request</text>
<rect class="bx-dark" x="10" y="30" width="280" height="84" rx="6"/>
<text class="t-term" x="22" y="56">GET / HTTP/1.1</text>
<text class="t-term" x="22" y="80">Host: example.com</text>
<text class="t-term" x="22" y="104">Accept: text/html</text>
<text class="t-s t-a" x="300" y="56">method + path</text>
<text class="t-s" x="300" y="92">headers</text>
<text class="t-b" x="10" y="148">Response</text>
<rect class="bx-dark" x="10" y="158" width="280" height="132" rx="6"/>
<text class="t-term" x="22" y="184">HTTP/1.1 200 OK</text>
<text class="t-term" x="22" y="208">Content-Type: text/html</text>
<text class="t-term" x="22" y="232">Content-Length: 1256</text>
<text class="t-term" x="22" y="276">&lt;h1&gt;Example&lt;/h1&gt;</text>
<text class="t-s t-ok" x="300" y="184">status code</text>
<text class="t-s" x="300" y="220">headers</text>
<text class="t-s" x="300" y="250">blank line</text>
<text class="t-s t-info" x="300" y="276">body</text>
</svg><figcaption>A request starts with a method and a path, followed by headers. A response starts with a status code, followed by headers, an empty line, and then the body, which is the page itself.</figcaption></figure>
<ul>
<li>The <b>method</b> says what you want to do. <code>GET</code> means "give me this". <code>POST</code> means "here is some data", for example a form. <code>HEAD</code> means "give me only the headers, not the body".</li>
<li>The <b>path</b> is which page or resource you want, like <code>/</code> for the home page or <code>/about</code>.</li>
<li><b>Headers</b> are labelled extra facts, one per line, in the form <code>Name: value</code>. <code>Content-Type</code> says what kind of thing the body is.</li>
<li>The <b>body</b> is the actual content: HTML, JSON, an image.</li>
</ul>
<p>Modern sites mostly speak HTTP/2 or HTTP/3, which pack the same information more efficiently, so tools may print <code>HTTP/2 200</code> instead. The meaning of the parts is identical.</p>

<h4>Status codes: the first thing to read</h4>
<p>The three-digit <b>status code</b> tells you how things went. You do not need to memorise all of them, because the <b>first digit</b> tells you the category:</p>
<div class="tbl-wrap"><table><tr><th>Starts with</th><th>Meaning</th><th>Ones you will see</th></tr>
<tr><td><b>2</b></td><td>Success</td><td>200 OK, 201 Created</td></tr>
<tr><td><b>3</b></td><td>Redirect: look somewhere else</td><td>301 moved for good, 302 and 307 moved for now</td></tr>
<tr><td><b>4</b></td><td>The client (the request) is wrong</td><td>400 bad request, 401 not logged in, 403 forbidden, 404 not found</td></tr>
<tr><td><b>5</b></td><td>The server failed</td><td>500 server error, 502 bad gateway, 503 unavailable</td></tr></table></div>
<p>Two codes are worth extra care. <b>401</b> means "I don't know who you are, please log in", while <b>403</b> means "I know who you are, and you are still not allowed". And <b>502 Bad Gateway</b> comes from a <b>proxy</b>, a program like Nginx that sits in front of your app and passes requests on to it. A 502 means the proxy itself is fine but got no valid answer from the app behind it, usually because the app has crashed or is not running. You will build exactly that setup in a later lesson.</p>

<h4>HTTPS: the locked envelope</h4>
<p>Plain HTTP travels as readable text. Anyone between you and the server, such as a café's Wi-Fi router, could read or change it. <b>HTTPS</b> is HTTP sent inside an encrypted tunnel made by <b>TLS</b> (Transport Layer Security). TLS gives you two guarantees:</p>
<ul>
<li><b>Privacy:</b> the traffic is encrypted, so people in the middle see only scrambled bytes.</li>
<li><b>Identity:</b> the server shows a <b>certificate</b>, a signed document saying "this key belongs to github.com". Your browser checks the signature, and if it does not match the name you typed, it shows a big warning instead of the page.</li>
</ul>
<p>The padlock in the address bar means both checks passed. HTTPS listens on port 443, and today browsers treat plain HTTP sites as "not secure", so every real site you deploy should use HTTPS.</p>

<h4>Seeing it with <code>curl -I</code></h4>
<p><code>curl</code> is a command-line tool that sends HTTP requests and prints what comes back. On its own it prints the body. With <code>-I</code> (or <code>--head</code>) it sends a <code>HEAD</code> request and prints only the status line and headers, which is usually all you need to check health:</p>
<pre class="snip">curl -I https://example.com
HTTP/2 200                      # it worked
content-type: text/html         # the body would be HTML
cache-control: max-age=3600     # browsers may reuse it for an hour</pre>
<p>Notice that header names may arrive in lowercase. HTTP treats header names the same whatever their case.</p>
<div class="tip"><b>Tip</b>When "the site is down", test in order. <code>dig</code> first: does the name give the right IP? Then <code>curl -I</code>: does the server answer, and with which code? A DNS problem and a 500 error need completely different fixes.</div>
<div class="try"><b>Try it in your head</b><code>dig shop.example</code> returns the right IP, but <code>curl -I https://shop.example</code> prints <code>HTTP/2 502</code>. Which part is broken? DNS is fine, and something answered on 443, so the proxy is up. The app behind it is the problem: check whether its process is running.</div>

<h4>Recap</h4>
<ul>
<li>DNS turns a name into an IP address. An A record points at an IP; a CNAME points at another name, which is how <code>www</code> aliases the root domain.</li>
<li><code>dig name</code> shows the records; read the ANSWER SECTION and note the TTL.</li>
<li>HTTP is one request (method, path, headers) and one response (status code, headers, body).</li>
<li>The first digit of a status code gives the category: 2 success, 3 redirect, 4 client error, 5 server error. A 502 means the proxy could not get an answer from the app.</li>
<li>HTTPS is HTTP inside TLS on port 443: encrypted, and the certificate proves the server's identity.</li>
<li><code>curl -I</code> shows just the status and headers, your quickest health check.</li>
</ul>
`);

explain('p2',`
<h4>Why use a platform at all</h4>
<p>In the last lesson you saw what a visitor's browser does: look up a name, connect securely, ask for a page. For your site to answer, a computer somewhere must be switched on all day, have a public IP address, hold a certificate for HTTPS, and run your code. Setting all that up by hand is a real job, and you will do it yourself in a later lesson.</p>
<p>A <b>hosting platform</b> such as Vercel, Netlify or Cloudflare Pages does that job for you. You give it your project, and it builds it, stores the result on servers around the world, gives it an HTTPS address and keeps it running. There is no server for you to log in to, patch or restart. For a frontend or a Next.js app, this is usually the quickest safe way to get online.</p>
<div class="analogy"><b>Think of it like</b>Self-publishing a book through a print-on-demand service. You hand over the manuscript. They typeset it, print it, put it in shops worldwide and keep it in stock. You never touch a printing press, but you still decide which edition is on the shelf.</div>

<h4>Step 1: build it on your own machine</h4>
<p>The code you write is not exactly what the browser receives. A <b>build</b> is the step that turns your source files into the optimised files that get served: it checks your code compiles, combines and shrinks the JavaScript, and prepares each page.</p>
<p>Your project, <code>~/portfolio</code>, is a Next.js site. Open <code>package.json</code> and look at the <code>scripts</code> section. Each script is a named shortcut for a longer command:</p>
<pre class="snip">"scripts": {
  "dev": "next dev",      # local server that reloads as you edit
  "build": "next build",  # make the production version
  "start": "next start",  # run the built version
  "test": "vitest run"
}</pre>
<p><code>npm run build</code> runs the <code>build</code> script, so it runs <code>next build</code>. If it ends with a success message, your project compiles. If it ends with <code>Failed to compile</code>, read the first error: it names the file and line.</p>
<p>Why build locally when the platform builds for you anyway? Because the platform runs <b>the same build command</b>. A build error on your laptop is a build error on Vercel, and finding it locally takes seconds instead of a round trip to the cloud.</p>
<div class="mistake"><b>Common mistake</b>Deploying straight away and debugging from the platform's build log. It works, but it is slow and noisy. Make <code>npm run build</code> a habit before every deploy. If <code>npm run dev</code> works but <code>npm run build</code> fails, trust the build: the development server is more forgiving.</div>

<h4>Step 2: log in once with <code>vercel login</code></h4>
<p>The <b>Vercel CLI</b> is a command-line program called <code>vercel</code> that talks to your Vercel account. CLI stands for command-line interface: a program you drive by typing instead of clicking. Before it can deploy anything, it must know who you are.</p>
<p><code>vercel login</code> asks how you want to sign in (for example with GitHub), opens a browser to confirm, and then saves a login token on your computer so you do not have to repeat it. In the sandbox you just press Enter at the prompt. If you forget this step, any other <code>vercel</code> command tells you there are no credentials and suggests <code>vercel login</code>.</p>

<h4>Step 3: a preview deployment with <code>vercel</code></h4>
<p>Run <code>vercel</code> with no arguments from inside your project folder. The very first time, it asks a couple of questions to <b>link</b> the folder to a project on your account, such as "Set up and deploy?". It records the link in a hidden <code>.vercel</code> folder so it remembers next time.</p>
<p>Then it uploads your files, runs the build on Vercel's machines and prints a URL like <code>https://portfolio-a1b2c3d4e-you.vercel.app</code>. That is a <b>preview deployment</b>: a complete, working copy of your site at its own unique address. It is not your public production site. It is a draft you can open, test and send to someone for review.</p>

<h4>Step 4: production with <code>vercel --prod</code></h4>
<p><b>Production</b> is the version real visitors see at your main address, such as <code>portfolio.vercel.app</code> or your own domain. <code>vercel --prod</code> builds a new deployment and marks it as production, and the CLI shows that your main address now points at it. In the output, look for the words <b>Production</b> and <b>Aliased</b>.</p>
<figure class="fig"><svg viewBox="0 0 420 270" role="img" aria-label="Code goes through a build, then becomes either a preview or production deployment">
<rect class="bx" x="10" y="14" width="120" height="44" rx="6"/><text class="t-b" x="70" y="41" text-anchor="middle">Your code</text>
<path class="ln" d="M130 36h40"/><polygon class="ah" points="168,30 168,42 176,36"/>
<rect class="bx-a" x="178" y="14" width="120" height="44" rx="6"/><text class="t-b" x="238" y="41" text-anchor="middle">Build</text>
<text class="t-s" x="238" y="76" text-anchor="middle">npm run build</text>
<path class="ln" d="M238 84v20h-128v20"/><polygon class="ah" points="104,122 116,122 110,130"/>
<path class="ln-ok" d="M238 104h90v20"/><polygon class="ah-ok" points="322,122 334,122 328,130"/>
<rect class="bx-info" x="20" y="132" width="180" height="56" rx="6"/><text class="t-b" x="110" y="156" text-anchor="middle">Preview</text><text class="t-s" x="110" y="176" text-anchor="middle">vercel, or a branch push</text>
<rect class="bx-ok" x="228" y="132" width="180" height="56" rx="6"/><text class="t-b" x="318" y="156" text-anchor="middle">Production</text><text class="t-s" x="318" y="176" text-anchor="middle">vercel --prod, or main</text>
<text class="t-s" x="110" y="214" text-anchor="middle">unique test URL</text>
<text class="t-s" x="110" y="232" text-anchor="middle">for you and reviewers</text>
<text class="t-s" x="318" y="214" text-anchor="middle">your real domain</text>
<text class="t-s" x="318" y="232" text-anchor="middle">for every visitor</text>
</svg><figcaption>Every deployment goes through the same build. A preview gets its own test address. A production deployment is the one your real domain serves. From the terminal you choose with <code>vercel</code> or <code>vercel --prod</code>; with Git connected, a branch push makes a preview and a merge to main makes production.</figcaption></figure>
<p>After deploying, check it really answers, using the tool from the last lesson: <code>curl -I https://portfolio.vercel.app</code>. You are looking for a <code>200</code> status. Your browser is fine too, but <code>curl</code> shows you the exact code with nothing cached.</p>

<h4>Why previews matter</h4>
<p>Previews are the quiet superpower of these platforms. Imagine you change the layout of your project page. Instead of telling a reviewer "pull my branch, install everything and run it", you send a link. They click it, see the real thing on their phone, and comment. Bugs get caught while only you and your reviewer can see them, not after real users find them.</p>
<p>When you connect a GitHub repository to Vercel (in the dashboard, with "Import Project"), this happens automatically: every push to a branch gets a preview URL, which Vercel posts on the pull request, and every merge into <code>main</code> deploys to production. The CLI commands you are learning do the same thing by hand, which makes it easy to see each step.</p>

<h4>Deployments never change: immutability</h4>
<p>Here is the idea that makes everything safe. A deployment is <b>immutable</b>: once it is built, it never changes. Deploying again does not edit the old one. It creates a brand new deployment with its own URL, and the old one stays exactly as it was.</p>
<p>So what is "production"? It is just a <b>pointer</b>. Your main address is an <b>alias</b>, a second name that points at one specific deployment. Deploying to production moves the pointer to the new deployment.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Three immutable deployments in a row, with the production address pointing at the newest one">
<text class="t-s" x="10" y="20">older</text><text class="t-s" x="410" y="20" text-anchor="end">newer</text>
<path class="ln-d" d="M50 16h310"/><polygon class="ah" points="358,10 358,22 366,16"/>
<rect class="bx" x="10" y="40" width="120" height="50" rx="6"/><text class="t-m" x="70" y="62" text-anchor="middle">…-a1b2</text><text class="t-s" x="70" y="80" text-anchor="middle">Monday</text>
<rect class="bx" x="150" y="40" width="120" height="50" rx="6"/><text class="t-m" x="210" y="62" text-anchor="middle">…-c3d4</text><text class="t-s" x="210" y="80" text-anchor="middle">Tuesday</text>
<rect class="bx-ok" x="290" y="40" width="120" height="50" rx="6"/><text class="t-m" x="350" y="62" text-anchor="middle">…-e5f6</text><text class="t-s" x="350" y="80" text-anchor="middle">Wednesday</text>
<rect class="bx-a" x="186" y="140" width="224" height="44" rx="6"/><text class="t-m" x="298" y="167" text-anchor="middle">portfolio.vercel.app</text>
<path class="ln-a" d="M350 140v-38"/><polygon class="ah-a" points="344,104 356,104 350,96"/>
<path class="ln-d" d="M230 140v-20h-20v-18"/><polygon class="ah" points="204,104 216,104 210,96"/>
<text class="t-s" x="20" y="150">rollback: move</text><text class="t-s" x="20" y="168">the pointer back</text>
</svg><figcaption>Each deploy adds a new, frozen deployment with its own address. The production address is only a pointer to one of them. Rolling back means pointing it at an older deployment, shown by the dashed arrow, with no rebuild.</figcaption></figure>
<p>This has two big benefits:</p>
<ul>
<li><b>Instant rollbacks.</b> If Wednesday's deploy is broken, you point production back at Tuesday's deployment. Nothing has to be rebuilt, so it takes seconds. You will do exactly this in the monitoring lesson.</li>
<li><b>No half-updated site.</b> Visitors either get the old version or the new one, never a mixture, because the switch happens only after the new build has fully succeeded. If the build fails, the pointer does not move and the live site is untouched.</li>
</ul>

<h4>Listing your deployments with <code>vercel ls</code></h4>
<p><code>vercel ls</code> prints your recent deployments, newest first, with their URL, status and environment. You should see your preview marked <b>Preview</b> and your latest production one marked as the current production deployment. It is a handy way to find the URL of an older deployment, for example to compare it with the current one.</p>
<div class="tip"><b>Tip</b>Every deployment, preview or production, stays reachable at its own URL. That makes "when did this break?" easy to answer: open a few older deployment URLs and find the last one that worked.</div>

<h4>Reading what goes wrong</h4>
<ul>
<li><b>No existing credentials found:</b> you have not logged in on this machine. Run <code>vercel login</code>.</li>
<li><b>No package.json found:</b> you are in the wrong folder. Use <code>pwd</code> to check, then <code>cd</code> into the project.</li>
<li><b>Failed to compile</b> during the deploy: a build error. Nothing was deployed and the live site is unchanged. Reproduce it with <code>npm run build</code>, fix it, and deploy again.</li>
<li><b>404 DEPLOYMENT_NOT_FOUND</b> from <code>curl</code>: the address you tried is not linked to any deployment. Check the URL the CLI printed.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Sending people the long preview URL and calling it "the site". Previews are for testing. Real users should get the production address, which keeps working when you deploy again. A preview URL keeps showing that one old version.</div>
<div class="try"><b>Try it in your head</b>You run <code>vercel</code>, then <code>vercel --prod</code>, then <code>vercel</code> again. How many deployments exist, and which one does the production address show? Three deployments, each with its own URL. Production shows the second one, because only <code>--prod</code> moves the production pointer.</div>

<h4>Recap</h4>
<ul>
<li>Hosting platforms build and serve your site for you, with HTTPS and no server to manage.</li>
<li><code>npm run build</code> locally first: the platform runs the same build, so errors show up here faster.</li>
<li><code>vercel login</code> once, then <code>vercel</code> creates a preview with its own URL and <code>vercel --prod</code> updates production.</li>
<li>Deployments are immutable. Production is an alias pointing at one of them, which makes rollbacks instant.</li>
<li><code>vercel ls</code> lists deployments; <code>curl -I</code> confirms the live site returns 200.</li>
</ul>
`);

explain('p3',`
<h4>Why run your own server</h4>
<p>Vercel hid the server from you, which is lovely until you need something it does not offer: a long-running background job, a database on the same machine, a program in a language the platform does not support, or simply a lower monthly bill. Then you rent a <b>VPS</b>, a virtual private server. Companies such as DigitalOcean, Hetzner and AWS Lightsail split big physical machines into many small virtual ones and rent you one, with its own public IP address and a fresh copy of Linux.</p>
<p>The trade-off is simple: <b>total control, total responsibility</b>. Nobody installs the web server, closes the open doors or sets up HTTPS for you. This lesson walks through exactly those jobs, in the order a professional does them.</p>
<div class="analogy"><b>Think of it like</b>Renting an empty flat instead of staying in a hotel. You can arrange it however you like, but you have to fit the locks, hire the doorman and put up the nameplate yourself.</div>

<h4>The finished picture</h4>
<p>Before the commands, look at what you are building. In the sandbox, a Node.js app is already running on the server and listening on port 3000. You will put two things in front of it: a <b>firewall</b> and <b>Nginx</b>.</p>
<figure class="fig"><svg viewBox="0 0 420 300" role="img" aria-label="Internet traffic passes the firewall to Nginx on ports 80 and 443, which forwards to the app on port 3000">
<rect class="bx-info" x="135" y="10" width="150" height="40" rx="6"/><text class="t-b" x="210" y="35" text-anchor="middle">Internet</text>
<path class="ln" d="M210 50v26"/><polygon class="ah" points="204,74 216,74 210,82"/>
<rect class="bx-dark" x="10" y="84" width="400" height="206" rx="10"/>
<text class="t-term" x="24" y="106">VPS 203.0.113.10</text>
<rect class="bx-warn" x="30" y="118" width="360" height="40" rx="6"/><text class="t-b" x="210" y="143" text-anchor="middle">Firewall (ufw): 22, 80, 443</text>
<path class="ln" d="M115 158v18"/><polygon class="ah" points="109,174 121,174 115,182"/>
<rect class="bx-a" x="30" y="184" width="170" height="44" rx="6"/><text class="t-b" x="115" y="204" text-anchor="middle">Nginx</text><text class="t-s" x="115" y="221" text-anchor="middle">ports 80, 443</text>
<path class="ln-ok" d="M200 206h22"/><polygon class="ah-ok" points="220,200 220,212 228,206"/>
<rect class="bx-ok" x="230" y="184" width="160" height="44" rx="6"/><text class="t-b" x="310" y="204" text-anchor="middle">Node app</text><text class="t-s" x="310" y="221" text-anchor="middle">localhost:3000</text>
<text class="t-term" x="24" y="258">proxy_pass sends each request</text>
<text class="t-term" x="24" y="278">on to the app</text>
</svg><figcaption>Visitors reach the server's public address. The firewall lets in only SSH on port 22 and web traffic on ports 80 and 443. Nginx receives the web requests and passes each one to the Node app on port 3000 inside the same machine.</figcaption></figure>
<p>Notice what the internet can <b>not</b> reach: port 3000. Only Nginx talks to the app. That is the shape of almost every self-hosted web app.</p>

<h4>Step 1: get in with SSH</h4>
<p><b>SSH</b> (Secure Shell) gives you a terminal on a remote computer over an encrypted connection, on port 22. You write <code>ssh user@address</code>:</p>
<pre class="snip">ssh root@203.0.113.10
# first time only: "Are you sure you want to continue connecting?" type yes
root@vps:~#      # the prompt changed: you are now typing on the server</pre>
<p>The changed prompt is your most important clue. From now on, every command runs on the VPS, not your laptop, until you type <code>exit</code>. Many mistakes come from forgetting which machine you are on.</p>
<p>The first-time question is SSH showing you the server's <b>fingerprint</b>, a short summary of its identity key. Your computer remembers it, and if it ever changes, SSH warns you loudly, because someone might be pretending to be your server. The sandbox accepts any password. On a real server you should log in with an <b>SSH key</b> instead and turn password login off, because bots try common passwords against every public server all day.</p>
<p>You are logged in as <b>root</b>, the all-powerful administrator, which is why the commands below need no <code>sudo</code>. On a real server, you would soon create a normal user and use <code>sudo</code>, following the least-privilege habit from the Linux track.</p>

<h4>Step 2: install Nginx with apt</h4>
<p>Ubuntu installs software with <code>apt</code>, its package manager. A <b>package</b> is a ready-made bundle of a program and its settings.</p>
<pre class="snip">apt update              # refresh the list of available packages
apt install -y nginx    # install Nginx; -y answers "yes" for you</pre>
<p><code>apt update</code> does not upgrade anything. It downloads the latest catalogue, so that <code>apt install</code> fetches current versions. On Ubuntu, Nginx starts automatically after installing and is set to start at every boot.</p>
<p><b>Nginx</b> (said "engine x") is a fast, battle-tested web server. Here it works as a <b>reverse proxy</b>: a program that receives requests from the outside and forwards them to another program behind it, then passes the reply back. Why not let the internet talk to Node directly?</p>
<ul>
<li>Nginx handles <b>HTTPS</b>, so your app never has to deal with certificates.</li>
<li>It serves static files such as images very efficiently.</li>
<li>It copes with slow or misbehaving clients, so they do not tie up your app.</li>
<li>It can host several sites on one server, sending each domain name to a different app.</li>
</ul>

<h4>Step 3: the firewall, in the right order</h4>
<p>A <b>firewall</b> decides which network connections may reach the machine. Ubuntu's friendly tool for it is <code>ufw</code>, the Uncomplicated Firewall. Once switched on, it <b>blocks every incoming connection</b> except the ones you have allowed.</p>
<p>That rule is exactly why order matters. You are connected over SSH. If you switch the firewall on first, it blocks port 22, your own connection is cut, and you cannot get back in. Your only way back is the provider's emergency web console.</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Allowing SSH before enabling the firewall keeps you connected; enabling first locks you out">
<text class="t-b t-ok" x="10" y="22">Safe order</text>
<rect class="bx-ok" x="10" y="32" width="125" height="40" rx="6"/><text class="t-s" x="72" y="57" text-anchor="middle">allow OpenSSH</text>
<path class="ln-ok" d="M135 52h12"/><polygon class="ah-ok" points="145,46 145,58 153,52"/>
<rect class="bx-ok" x="155" y="32" width="125" height="40" rx="6"/><text class="t-s" x="217" y="57" text-anchor="middle">allow Nginx Full</text>
<path class="ln-ok" d="M280 52h12"/><polygon class="ah-ok" points="290,46 290,58 298,52"/>
<rect class="bx-ok" x="300" y="32" width="110" height="40" rx="6"/><text class="t-s" x="355" y="57" text-anchor="middle">enable</text>
<text class="t-s" x="10" y="94">You stay connected. Port 22 was already open.</text>
<text class="t-b t-bad" x="10" y="132">Wrong order</text>
<rect class="bx-bad" x="10" y="142" width="125" height="40" rx="6"/><text class="t-s" x="72" y="167" text-anchor="middle">enable</text>
<path class="ln" d="M135 162h12"/><polygon class="ah" points="145,156 145,168 153,162"/>
<rect class="bx-bad" x="155" y="142" width="255" height="40" rx="6"/><text class="t-s" x="282" y="167" text-anchor="middle">port 22 blocked: locked out</text>
<text class="t-s" x="10" y="202">Your SSH session is cut and cannot reconnect.</text>
</svg><figcaption>Allow SSH first, then web traffic, and only then switch the firewall on. Switching it on first blocks port 22 and cuts off the very connection you are typing through.</figcaption></figure>
<pre class="snip">ufw allow OpenSSH       # port 22, so you can stay in
ufw allow "Nginx Full"  # ports 80 and 443
ufw enable              # now switch it on
ufw status              # check what is allowed</pre>
<p><code>OpenSSH</code> and <code>Nginx Full</code> are <b>application profiles</b>, named shortcuts that packages install. <code>Nginx Full</code> means both HTTP on 80 and HTTPS on 443. The quotes are needed because the name contains a space. <code>ufw enable</code> warns that it may disrupt SSH connections. Because you allowed OpenSSH, it is safe to say yes.</p>
<div class="mistake"><b>Common mistake</b>Typing <code>ufw enable</code> first "to see what happens". On a remote server, what happens is that you are locked out. Make "allow SSH, then enable" a reflex.</div>

<h4>Step 4: point Nginx at the app</h4>
<p>On Ubuntu, Nginx's site settings live in <code>/etc/nginx/sites-available/default</code>. Open it with <code>nano</code> and make the <code>server</code> block look like this:</p>
<pre class="snip">server {
    listen 80;                                # accept HTTP on port 80
    server_name portfolio.dev www.portfolio.dev;  # for these names
    location / {                              # every path starting with /
        proxy_pass http://localhost:3000;     # forward to the app
        proxy_set_header Host $host;          # pass the original name on
        proxy_set_header X-Real-IP $remote_addr;  # and the visitor's IP
    }
}</pre>
<p>Read it as a sentence: "for requests on port 80 for portfolio.dev, send everything to the app on port 3000 on this same machine". <code>localhost</code> always means "this computer". Without the two <code>proxy_set_header</code> lines, the app would think every request came from Nginx itself rather than from the real visitor. Every line inside the braces ends with a semicolon.</p>
<p>Now test, then apply:</p>
<pre class="snip">nginx -t                 # check the config for mistakes
systemctl reload nginx   # apply it without dropping visitors</pre>
<p><code>nginx -t</code> should print "syntax is ok" and "test is successful". If not, it names the file and line number of the problem, often a missing semicolon or brace. Always test before reloading. <code>reload</code> tells the running Nginx to reread its settings gently, so current visitors are not cut off.</p>
<p>Then type <code>exit</code> to return to your laptop and run <code>curl http://portfolio.dev</code>. DNS sends you to the VPS, the firewall lets port 80 through, Nginx forwards to the app, and the app's HTML comes back. If you see <code>502 Bad Gateway</code> instead, you met it in the first lesson: Nginx is fine but the app behind it is not answering.</p>

<h4>Step 5: HTTPS with certbot</h4>
<p>Your site works, but over plain HTTP. For the padlock you need a <b>certificate</b>, and <b>Let's Encrypt</b> issues them for free. <code>certbot</code> is the program that asks Let's Encrypt for one and installs it:</p>
<pre class="snip">apt install -y certbot python3-certbot-nginx
certbot --nginx -d portfolio.dev   # add another -d for www if you like</pre>
<p>The <code>--nginx</code> part uses the Nginx plugin, which edits your Nginx settings for you: it adds a <code>listen 443 ssl</code> block with the certificate and can redirect plain HTTP to HTTPS. Before Let's Encrypt signs anything, it checks that you really control the domain. It connects to <code>portfolio.dev</code> on port 80 and looks for a temporary file certbot placed there. So two things must already be true: the DNS A record points at this server, and port 80 is open in the firewall. If DNS points elsewhere, certbot fails with a "DNS problem" message.</p>
<p>Why does anyone trust a certificate that you got in thirty seconds? Because of a <b>chain of signatures</b>:</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="Chain of trust from a root authority in your browser, to Let's Encrypt, to your site's certificate">
<rect class="bx-ok" x="20" y="10" width="220" height="50" rx="6"/><text class="t-b" x="130" y="32" text-anchor="middle">Root authority</text><text class="t-s" x="130" y="50" text-anchor="middle">built into browsers</text>
<path class="ln-ok" d="M130 60v24"/><polygon class="ah-ok" points="124,82 136,82 130,90"/><text class="t-s" x="142" y="80">signs</text>
<rect class="bx-info" x="20" y="92" width="220" height="50" rx="6"/><text class="t-b" x="130" y="114" text-anchor="middle">Let's Encrypt</text><text class="t-s" x="130" y="132" text-anchor="middle">intermediate</text>
<path class="ln-ok" d="M130 142v24"/><polygon class="ah-ok" points="124,164 136,164 130,172"/><text class="t-s" x="142" y="162">signs</text>
<rect class="bx-a" x="20" y="174" width="220" height="50" rx="6"/><text class="t-b" x="130" y="196" text-anchor="middle">portfolio.dev</text><text class="t-s" x="130" y="214" text-anchor="middle">your certificate</text>
<text class="t-b" x="262" y="40">Browser checks</text>
<text class="t-s" x="262" y="66">1. chain ends at a</text><text class="t-s" x="262" y="84">trusted root</text>
<text class="t-s" x="262" y="112">2. name matches the</text><text class="t-s" x="262" y="130">address typed</text>
<text class="t-s" x="262" y="158">3. not expired</text>
</svg><figcaption>Your certificate is signed by Let's Encrypt, whose own certificate is signed by a root authority that browsers already trust. The browser follows the signatures up to that root, then checks the name matches the site and the date has not passed.</figcaption></figure>
<p>Let's Encrypt certificates are short-lived, currently about 90 days, so certbot sets up automatic renewal. You do not need to remember it, but <code>certbot renew --dry-run</code> is a good way to check renewal will work.</p>
<p>Finally, <code>exit</code>, and from your laptop run <code>curl -I https://portfolio.dev</code>. A <code>200</code> over HTTPS means the whole chain works.</p>

<h4>Reading the errors</h4>
<ul>
<li><b>ssh: Connection timed out:</b> the server is unreachable on port 22, often because a firewall blocks it.</li>
<li><b>nginx -t: test failed:</b> a typo in the config. Read the line number it gives. Do not reload until it passes.</li>
<li><b>curl: Failed to connect ... Timeout:</b> the firewall is blocking that port. Check <code>ufw status</code>.</li>
<li><b>502 Bad Gateway:</b> Nginx works, the app does not. Check the app is running and the port in <code>proxy_pass</code> is right.</li>
</ul>
<div class="try"><b>Try it in your head</b>You set <code>proxy_pass http://localhost:8080;</code> by mistake, while the app listens on 3000. <code>nginx -t</code> passes. What does <code>curl http://portfolio.dev</code> show? A 502 Bad Gateway: the config is valid, but nothing answers on 8080, so Nginx gets no reply from upstream.</div>

<h4>Recap</h4>
<ul>
<li>A VPS is a rented Linux machine: you install, secure and maintain everything yourself.</li>
<li><code>ssh root@IP</code> gets you a shell on it. Watch the prompt so you know which machine you are on.</li>
<li><code>apt update</code> then <code>apt install -y nginx</code>. Nginx is a reverse proxy: <code>proxy_pass http://localhost:3000</code> forwards requests to your app.</li>
<li>Firewall order: <code>ufw allow OpenSSH</code> and <code>ufw allow "Nginx Full"</code> before <code>ufw enable</code>.</li>
<li>Always <code>nginx -t</code> before <code>systemctl reload nginx</code>.</li>
<li><code>certbot --nginx -d domain</code> gets a free, auto-renewing certificate, once DNS points at the server and port 80 is open.</li>
</ul>
`);

explain('p4',`
<h4>Why let a robot check every change</h4>
<p>You now know how to put a site online. The scary part is what happens next: you, or a teammate, change something small, push it, and it quietly breaks something you were not looking at. Tests catch that kind of bug, but only if somebody runs them, every time, on a clean machine. People forget. Robots do not.</p>
<p><b>Continuous integration</b>, or <b>CI</b>, means that every time anyone pushes code, an automatic system installs the project from scratch and runs its checks: tests, and often linting (style checks) and a build. "Integration" means combining everyone's changes; "continuous" means doing it on every change instead of once a month. If anything fails, you hear about it within minutes, before the change reaches <code>main</code> or your users.</p>
<div class="analogy"><b>Think of it like</b>A kitchen where every dish is tasted by the head chef before it leaves the pass. Nobody is insulted, it is just the routine, and nothing burnt reaches a customer.</div>
<p><b>GitHub Actions</b> is the CI system built into GitHub. You describe what should happen in a text file inside your repository, and GitHub runs it for you.</p>

<h4>The building blocks: workflow, job, step, runner</h4>
<p>GitHub Actions uses four words. Learn them once and every workflow file becomes readable.</p>
<ul>
<li>A <b>workflow</b> is one automated process, described in one file in the folder <code>.github/workflows/</code>. The folder name must be exactly that, including the dot.</li>
<li>A workflow has a <b>trigger</b>, written under <code>on:</code>, which says which event starts it, such as a push.</li>
<li>A workflow contains one or more <b>jobs</b>. Each job runs on its own fresh machine.</li>
<li>That machine is called a <b>runner</b>: a temporary virtual computer that GitHub starts for the job and throws away afterwards. <code>runs-on: ubuntu-latest</code> asks for a recent Ubuntu Linux runner.</li>
<li>A job is a list of <b>steps</b>, run in order, top to bottom. If one step fails, the steps after it are skipped and the job fails.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="A workflow file contains a trigger and jobs; each job runs on a runner and has steps">
<rect class="bx" x="10" y="10" width="400" height="230" rx="10"/>
<text class="t-m" x="24" y="34">ci.yml  (workflow)</text>
<rect class="bx-info" x="24" y="46" width="372" height="34" rx="6"/><text class="t" x="210" y="68" text-anchor="middle">on: push, pull_request  (trigger)</text>
<rect class="bx-a" x="24" y="92" width="372" height="136" rx="8"/>
<text class="t-b" x="38" y="114">job: test</text><text class="t-s" x="384" y="114" text-anchor="end">runs-on: ubuntu-latest</text>
<rect class="bx" x="38" y="124" width="166" height="40" rx="6"/><text class="t-s" x="121" y="149" text-anchor="middle">1. uses: checkout</text>
<rect class="bx" x="216" y="124" width="166" height="40" rx="6"/><text class="t-s" x="299" y="149" text-anchor="middle">2. uses: setup-node</text>
<rect class="bx" x="38" y="176" width="166" height="40" rx="6"/><text class="t-s" x="121" y="201" text-anchor="middle">3. run: npm ci</text>
<rect class="bx" x="216" y="176" width="166" height="40" rx="6"/><text class="t-s" x="299" y="201" text-anchor="middle">4. run: npm test</text>
</svg><figcaption>One workflow file holds a trigger and one or more jobs. Each job runs on its own runner machine and works through its steps in order: get the code, install Node, install the dependencies, run the tests.</figcaption></figure>

<h4>Just enough YAML</h4>
<p>Workflow files are written in <b>YAML</b>, a format for structured settings that is designed to be easy for humans to read. You only need three rules:</p>
<ul>
<li><code>key: value</code> sets a value, like <code>name: CI</code>.</li>
<li><b>Indentation shows nesting.</b> A line indented under another belongs to it. Use two spaces per level and never tabs. A wrongly indented line silently changes the meaning, or makes the file invalid.</li>
<li>A line starting with <code>- </code> (dash and space) is one item in a list. Each step is a list item. Square brackets are a short way to write a list on one line: <code>[main]</code> is a list with one item.</li>
</ul>

<h4>The workflow, line by line</h4>
<p>Here is the CI file for your portfolio, the one you will create at <code>.github/workflows/ci.yml</code>:</p>
<pre class="snip">name: CI                 # the name shown on GitHub
on:
  push:
    branches: [main]     # run on pushes to main
  pull_request:          # and on every pull request
jobs:
  test:                  # a job called "test"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4</pre>
<pre class="snip">      - uses: actions/setup-node@v4
        with:
          node-version: 20     # an input for that action
      - run: npm ci            # clean install
      - run: npm test          # run the test suite</pre>
<p>The two kinds of step are worth slowing down for:</p>
<ul>
<li><code>uses:</code> runs a ready-made <b>action</b>, a reusable package of steps someone has published. <code>actions/checkout@v4</code> means "the <code>checkout</code> action from the <code>actions</code> organisation on GitHub, version 4". It downloads your repository onto the runner. Without it, the runner is an empty machine and <code>npm test</code> has nothing to test. <code>actions/setup-node</code> installs Node.js, and <code>with:</code> passes it settings, here which Node version.</li>
<li><code>run:</code> runs a shell command, exactly as if you typed it in a terminal on the runner.</li>
</ul>
<p>Why <code>npm ci</code> rather than <code>npm install</code>? <code>npm ci</code> ("clean install") installs exactly the versions recorded in <code>package-lock.json</code>, starting from an empty <code>node_modules</code>, and fails if the lock file and <code>package.json</code> disagree. That makes every CI run use precisely the same dependencies, so a failure means your code changed, not some library.</p>
<div class="mistake"><b>Common mistake</b>Saving the file as <code>.github/workflow/ci.yml</code> (missing the s) or <code>github/workflows/ci.yml</code> (missing the dot). GitHub only looks in <code>.github/workflows/</code>. In the wrong folder, nothing runs and nothing tells you why.</div>

<h4>What happens when you push</h4>
<p>The workflow file is just a file until GitHub sees it. So you commit and push it like any other change, using the Git commands you already know: <code>git add</code>, <code>git commit</code>, <code>git push</code>. The push itself matches the trigger, so the very first run starts straight away.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A push starts a fresh runner that checks out, installs and tests, ending in a green tick or a red cross">
<rect class="bx-info" x="10" y="20" width="80" height="44" rx="6"/><text class="t-b" x="50" y="47" text-anchor="middle">push</text>
<path class="ln" d="M90 42h16"/><polygon class="ah" points="104,36 104,48 112,42"/>
<rect class="bx" x="114" y="20" width="96" height="44" rx="6"/><text class="t-s" x="162" y="40" text-anchor="middle">fresh</text><text class="t-s" x="162" y="56" text-anchor="middle">runner</text>
<path class="ln" d="M210 42h16"/><polygon class="ah" points="224,36 224,48 232,42"/>
<rect class="bx-a" x="234" y="20" width="176" height="44" rx="6"/><text class="t-s" x="322" y="47" text-anchor="middle">checkout, install, test</text>
<path class="ln" d="M322 64v20h-200v20"/><path class="ln" d="M322 84h0v20"/>
<polygon class="ah" points="116,102 128,102 122,110"/><polygon class="ah" points="316,102 328,102 322,110"/>
<rect class="bx-ok" x="52" y="112" width="140" height="44" rx="6"/><text class="t-b t-ok" x="122" y="139" text-anchor="middle">all pass</text>
<rect class="bx-bad" x="252" y="112" width="140" height="44" rx="6"/><text class="t-b t-bad" x="322" y="139" text-anchor="middle">a step fails</text>
<text class="t-s" x="122" y="180" text-anchor="middle">green tick: safe to merge</text>
<text class="t-s" x="322" y="180" text-anchor="middle">red cross: fix first</text>
</svg><figcaption>Every push starts a brand new runner. It fetches the code, installs everything and runs the tests. If every step passes, the commit gets a green tick. If any step fails, it gets a red cross and the remaining steps are skipped.</figcaption></figure>
<p>To follow along from your terminal, use GitHub's own command-line tool, <code>gh</code>:</p>
<pre class="snip">gh run watch    # follow the current run live, step by step
gh run list     # recent runs and whether they passed</pre>
<p>On the GitHub website, the same information is under the repository's <b>Actions</b> tab, and every commit and pull request shows a small tick or cross.</p>

<h4>A worked example: watching CI catch a bug</h4>
<p>Your project has a tiny module, <code>src/tax.js</code>, with <code>rate = 0.08</code> and a function <code>withTax</code> that adds 8% and rounds. Its test, in <code>src/tax.test.js</code>, says that <code>withTax(100)</code> must be <code>108</code>.</p>
<ol>
<li><b>First push:</b> you add the workflow and push. The runner checks out, installs, runs the test: 100 × 1.08 = 108. Green.</li>
<li><b>A teammate's change:</b> someone edits the rate to <code>0.10</code> and pushes. Now <code>withTax(100)</code> gives 110. The test expected 108, so <code>npm test</code> exits with an error, the step fails, and the run goes red. The log shows something like <code>expected 110 to be 108</code>.</li>
<li><b>The fix:</b> you set the rate back to <code>0.08</code>, commit and push. A new run starts and goes green again.</li>
</ol>
<p>Nobody had to remember to run the tests. The robot did it on every push, and the mistake was visible within a minute.</p>
<div class="tip"><b>Tip</b>When a run is red, open it and scroll to the <b>first</b> failing step. Read the last few lines of its log. The error is almost always right there: a failing test, a typo in a command, or a missing file. Later errors are often just knock-on effects.</div>

<h4>Making CI a real gate</h4>
<p>A red cross only helps if it stops bad code. On real teams, the <code>main</code> branch is <b>protected</b>: in the repository settings you add a rule that pull requests cannot be merged until the CI check passes. Then broken code can still be pushed to a branch, but it cannot reach <code>main</code>. That is why the workflow also triggers on <code>pull_request</code>: every proposed change is tested before anyone clicks "Merge".</p>
<p>CI does not replace code review, and it does not make your app faster. It is a safety net that never gets tired.</p>
<div class="try"><b>Try it in your head</b>Your workflow has the steps checkout, setup-node, <code>npm ci</code>, <code>npm test</code>. Someone deletes the checkout step. What fails, and why? <code>npm ci</code> fails, because the runner starts empty: there is no <code>package.json</code> to install from. Without checkout, your code never arrives.</div>

<h4>Recap</h4>
<ul>
<li>CI runs your checks automatically on every push and pull request, on a clean machine.</li>
<li>A workflow is a YAML file in <code>.github/workflows/</code>, with a trigger (<code>on:</code>), jobs, and steps.</li>
<li>Each job runs on a fresh runner (<code>runs-on: ubuntu-latest</code>). Steps either <code>uses:</code> a published action or <code>run:</code> a command.</li>
<li><code>actions/checkout</code> fetches your code; <code>npm ci</code> installs exact versions from the lock file; <code>npm test</code> runs the tests.</li>
<li>Indentation is meaning in YAML: two spaces, never tabs.</li>
<li><code>gh run watch</code> follows a run; protect <code>main</code> so a red run blocks the merge.</li>
</ul>
`);

explain('p5',`
<h4>Why secrets must never be in your code</h4>
<p>Your app needs a few pieces of information that are not really code: the address and password of its database, an API key for a payment service, a token that lets your CI deploy to Vercel. These are <b>secrets</b>: anyone who has them can act as you.</p>
<p>The tempting thing is to paste them straight into a file, like <code>const db = "postgres://user:pass@..."</code>. The problem is Git. Once a secret is committed, it lives in the repository's history forever, even if you delete the line in the next commit. Every clone, every fork and, for a public repository, every bot that scans GitHub for keys can find it. Leaked cloud keys are often abused within minutes.</p>
<p>There is a second, quieter reason. Your laptop, your preview deployments and production should use <b>different</b> databases. If the address is written into the code, you would have to change the code for each place it runs.</p>
<div class="analogy"><b>Think of it like</b>A recipe and its ingredients. The recipe (your code) can be shared with anyone. The ingredients (secrets and settings) are handed to whichever kitchen is cooking today. The recipe just says "use the flour from the cupboard", never "use the flour in Sam's flat".</div>

<h4>Environment variables: settings handed in from outside</h4>
<p>An <b>environment variable</b> is a named value that the operating system hands to a program when it starts. Every program gets a set of them. You have already met some: <code>HOME</code> and <code>PATH</code> are environment variables in your shell.</p>
<p>In Node.js, your code reads them through <code>process.env</code>:</p>
<pre class="snip">// the code only names the variable, never the value
const dbUrl = process.env.DATABASE_URL;</pre>
<p>That one line works everywhere. On your laptop, <code>DATABASE_URL</code> holds your local database. In production, the platform hands in the production one. The code never changes; only what is <b>injected</b> into it at run time does.</p>
<figure class="fig"><svg viewBox="0 0 420 260" role="img" aria-label="The same code reads DATABASE_URL, which is supplied by a .env file locally, by Vercel in production and by GitHub secrets in CI">
<text class="t-s" x="210" y="18" text-anchor="middle">same code, committed to Git</text>
<rect class="bx-dark" x="100" y="26" width="220" height="56" rx="8"/>
<text class="t-term" x="210" y="50" text-anchor="middle">process.env</text>
<text class="t-term" x="210" y="72" text-anchor="middle">.DATABASE_URL</text>
<path class="ln-ok" d="M70 160v-50h80v-18"/><polygon class="ah-ok" points="144,92 156,92 150,84"/>
<path class="ln-ok" d="M210 160v-68"/><polygon class="ah-ok" points="204,92 216,92 210,84"/>
<path class="ln-ok" d="M350 160v-50h-80v-18"/><polygon class="ah-ok" points="264,92 276,92 270,84"/>
<rect class="bx-info" x="10" y="160" width="120" height="56" rx="6"/><text class="t-b" x="70" y="183" text-anchor="middle">.env file</text><text class="t-s" x="70" y="202" text-anchor="middle">your laptop</text>
<rect class="bx-a" x="150" y="160" width="120" height="56" rx="6"/><text class="t-b" x="210" y="183" text-anchor="middle">Vercel env</text><text class="t-s" x="210" y="202" text-anchor="middle">production</text>
<rect class="bx-warn" x="290" y="160" width="120" height="56" rx="6"/><text class="t-b" x="350" y="183" text-anchor="middle">GH secrets</text><text class="t-s" x="350" y="202" text-anchor="middle">CI runs</text>
<text class="t-s" x="210" y="246" text-anchor="middle">values: never committed</text>
</svg><figcaption>The code only refers to the variable by name, and that code is committed. The actual value comes from a different place depending on where the code runs: a .env file on your laptop, Vercel's settings in production, and GitHub's encrypted secrets inside CI. None of those values are committed.</figcaption></figure>
<p>There are three places values live, one for each place your code runs. You will set up all three.</p>

<h4>Place 1: your laptop, in <code>.env</code></h4>
<p>Typing <code>export DATABASE_URL=...</code> before every session gets old fast. So frameworks such as Next.js read a file called <code>.env</code> in the project folder at start-up and load each <code>NAME=value</code> line into <code>process.env</code>. (<code>.env.local</code> works the same way and is meant for values that only apply to your machine.)</p>
<pre class="snip">echo "DATABASE_URL=postgres://user:pass@localhost:5432/portfolio" > .env
cat .env      # check it</pre>
<p>That URL packs a lot in, so read it piece by piece: <code>postgres://</code> is the kind of database, <code>user:pass</code> are the username and password, <code>localhost:5432</code> is the machine and port, and <code>portfolio</code> is the database name. One string, and it contains a password. That is why it must never be committed.</p>

<h4>Keeping <code>.env</code> out of Git</h4>
<p>A file called <code>.gitignore</code> lists files Git should pretend do not exist. Add <code>.env</code> to it:</p>
<pre class="snip">echo ".env" >> .gitignore   # two arrows: add a line to the end
cat .gitignore              # node_modules, .next and now .env</pre>
<p>Look closely at the arrows. One arrow, <code>&gt;</code>, <b>replaces</b> the whole file with the new text. Two arrows, <code>&gt;&gt;</code>, <b>append</b> to the end. Using one arrow here would wipe out the existing lines, so <code>node_modules</code> would suddenly be tracked. After this, <code>git status</code> should not list <code>.env</code> at all.</p>
<p>Your teammates still need to know which variables to set. The habit is to commit a <code>.env.example</code> file with the <b>names</b> and fake values, like <code>DATABASE_URL=postgres://user:pass@localhost:5432/dbname</code>. It documents the setup without revealing anything.</p>
<div class="mistake"><b>Common mistake</b>Adding <code>.env</code> to <code>.gitignore</code> after it was already committed. <code>.gitignore</code> only affects files Git is not tracking yet. You must also run <code>git rm --cached .env</code> to stop tracking it, and, because the secret is already in the history, treat it as leaked: <b>change the password or key</b>. Deleting the file does not un-leak it.</div>

<h4>Place 2: production, on the platform</h4>
<p>Your <code>.env</code> file never leaves your laptop, so Vercel has no idea what <code>DATABASE_URL</code> should be. You give it the production value directly:</p>
<pre class="snip">vercel env add DATABASE_URL production
? What's the value of DATABASE_URL?   # type it; it is hidden</pre>
<p>The last word picks which <b>environment</b> gets the value. Vercel has three: <code>production</code>, <code>preview</code> and <code>development</code>. That lets previews use a test database while production uses the real one. Vercel stores the value encrypted, and <code>vercel env ls</code> lists the names without showing the values.</p>
<p>One detail catches everyone: variables are handed in when a deployment is <b>built and started</b>. Adding or changing one does not touch deployments that already exist, so you redeploy for the new value to take effect. And <code>vercel env pull</code> downloads the development values into <code>.env.local</code>, which is handy on a new laptop.</p>

<h4>Place 3: CI, in GitHub Actions secrets</h4>
<p>In the last lesson, CI ran your tests. Now you want it to deploy too, and deploying to Vercel needs a <b>token</b>: a long random string that acts like a password for your account. CI runners start empty and cannot see your laptop, so the token must be stored in GitHub:</p>
<pre class="snip">gh secret set VERCEL_TOKEN
? Paste your secret:      # hidden as you type</pre>
<p>This saves an encrypted <b>repository secret</b>. You can also add one on the website under the repository's Settings, then Secrets and variables, then Actions. Once saved, nobody can read the value back, not even you. You can only replace it.</p>
<p>A workflow uses it with GitHub's expression syntax, two curly braces with a dollar sign in front:</p>
<pre class="snip">steps:
  - uses: actions/checkout@v4
  - run: npx vercel deploy --prod --token \${{ secrets.VERCEL_TOKEN }}</pre>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="The secret is stored encrypted, filled in only while the job runs, and masked in the logs">
<rect class="bx-warn" x="10" y="20" width="120" height="56" rx="6"/><text class="t-b" x="70" y="44" text-anchor="middle">gh secret</text><text class="t-s" x="70" y="63" text-anchor="middle">stored encrypted</text>
<path class="ln" d="M130 48h20"/><polygon class="ah" points="148,42 148,54 156,48"/>
<rect class="bx-a" x="158" y="20" width="100" height="56" rx="6"/><text class="t-b" x="208" y="44" text-anchor="middle">runner</text><text class="t-s" x="208" y="63" text-anchor="middle">value added</text>
<path class="ln" d="M258 48h16"/><polygon class="ah" points="272,42 272,54 280,48"/>
<rect class="bx-dark" x="282" y="20" width="128" height="56" rx="6"/><text class="t-term" x="346" y="44" text-anchor="middle">log</text><text class="t-term" x="346" y="64" text-anchor="middle">--token ***</text>
<text class="t-s" x="10" y="112">The file only contains the name.</text>
<text class="t-s" x="10" y="134">GitHub swaps in the value while the job runs,</text>
<text class="t-s" x="10" y="156">and prints *** if it ever shows up in the log.</text>
</svg><figcaption>The workflow file mentions only the secret's name. GitHub fills in the real value while the job runs, and replaces it with three stars if it ever appears in the log output.</figcaption></figure>
<p>The workflow file is committed, but it only contains the <b>name</b> of the secret. GitHub fills in the value when the job runs and hides it in the logs. In real projects, the Vercel CLI also needs to know which project to deploy, usually through two more variables, <code>VERCEL_ORG_ID</code> and <code>VERCEL_PROJECT_ID</code>, stored the same way.</p>

<h4>The <code>NEXT_PUBLIC_</code> trap</h4>
<p>Everything so far runs on a server, where visitors cannot see it. But some of your Next.js code runs <b>in the visitor's browser</b>. Browsers have no access to your server's environment, so Next.js has a rule: any variable whose name starts with <code>NEXT_PUBLIC_</code> is copied, at build time, straight into the JavaScript files sent to the browser.</p>
<p>Anything sent to the browser is public. Anyone can open the developer tools and read it. So:</p>
<ul>
<li><code>NEXT_PUBLIC_SITE_NAME</code>: fine. It is shown on the page anyway.</li>
<li><code>NEXT_PUBLIC_STRIPE_SECRET_KEY</code>: a disaster. The word "secret" in the name does not protect it; the prefix publishes it.</li>
<li><code>DATABASE_URL</code> and <code>JWT_SECRET</code>: correct as they are. Without the prefix, they stay on the server.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Adding <code>NEXT_PUBLIC_</code> to a secret because "the variable was undefined in my component". That error is telling you the code runs in the browser, where the secret must never go. Move that code to the server, for example into an API route, instead.</div>
<div class="try"><b>Try it in your head</b>You set <code>DATABASE_URL</code> on Vercel with <code>vercel env add</code>, then open the live site, and it still connects to the old database. Why? Variables are applied when a deployment is built and started. The running deployment was created before your change. Redeploy, and the new value is used.</div>

<h4>Recap</h4>
<ul>
<li>Secrets and per-environment settings live in environment variables. Code reads <code>process.env.NAME</code> and never contains the value.</li>
<li>Locally: a <code>.env</code> file listed in <code>.gitignore</code>, plus a committed <code>.env.example</code> with fake values.</li>
<li>Production: <code>vercel env add NAME production</code>, then redeploy.</li>
<li>CI: <code>gh secret set NAME</code>, used as <code>\${{ secrets.NAME }}</code> and masked in logs.</li>
<li><code>NEXT_PUBLIC_</code> variables are sent to every browser. Never put a secret in one.</li>
<li>If a secret was ever committed, rotate it: change the key or password.</li>
</ul>
`);

explain('p6',`
<h4>Why this is a skill of its own</h4>
<p>Every team ships a bug to production eventually. It is not a sign that you are bad at this, it is a certainty. Tests and CI catch most problems, but not all: some only appear with real data, real traffic or a real third-party service. What separates professionals is not that they never break things. It is how quickly and calmly they notice and recover.</p>
<p>This lesson is a drill. It is 9pm, someone deployed ten minutes ago, and users are reporting errors. You will confirm the problem, read the evidence, restore the site, and then learn how to make sure it does not happen again. Everything you need, you have already met: <code>curl -I</code> from the first lesson, and immutable deployments from the Vercel lesson.</p>
<div class="analogy"><b>Think of it like</b>A burst pipe at home. First you turn off the water at the main, so the flooding stops. Only then do you find out exactly which joint failed and replace it properly. Nobody stands in a flooded kitchen studying plumbing diagrams.</div>

<h4>Three words: production, logs, monitoring</h4>
<ul>
<li><b>Production</b> is the live system that real people use, as opposed to your laptop or a preview.</li>
<li><b>Logs</b> are the running diary of a program: one line per event, such as "request for / answered 200", or "error: something was undefined". When something goes wrong, the logs are your first evidence.</li>
<li><b>Monitoring</b> is anything that watches production for you and raises the alarm, so you do not depend on users complaining. Two kinds matter most at the start: an <b>uptime check</b>, a service that requests your site every minute or so and alerts you when it stops answering 200, and an <b>error tracker</b> such as Sentry, which collects every crash from your app with the details needed to fix it.</li>
</ul>

<h4>The incident playbook: restore first, debug second</h4>
<p>An <b>incident</b> is any time production is broken or badly degraded. The order of the response matters more than anything else in this lesson:</p>
<figure class="fig"><svg viewBox="0 0 420 270" role="img" aria-label="Incident timeline: a bad deploy, users affected until a rollback, then a calm fix and a postmortem">
<path class="ln" d="M20 60h380"/><polygon class="ah" points="398,54 398,66 406,60"/>
<text class="t-s" x="404" y="30" text-anchor="end">time</text>
<rect class="bx-bad" x="40" y="40" width="190" height="40" rx="4"/><text class="t-b t-bad" x="135" y="65" text-anchor="middle">users see errors</text>
<rect class="bx-ok" x="230" y="40" width="160" height="40" rx="4"/><text class="t-b t-ok" x="310" y="65" text-anchor="middle">site working</text>
<circle class="dot-m" cx="40" cy="100" r="6"/><text class="t-s" x="40" y="124" text-anchor="middle">bad</text><text class="t-s" x="40" y="140" text-anchor="middle">deploy</text>
<circle class="dot" cx="100" cy="100" r="6"/><text class="t-s" x="100" y="124" text-anchor="middle">1. confirm</text>
<circle class="dot" cx="170" cy="100" r="6"/><text class="t-s" x="170" y="124" text-anchor="middle">2. logs</text>
<circle class="dot-ok" cx="230" cy="100" r="6"/><text class="t-s" x="242" y="124" text-anchor="middle">3. rollback</text>
<circle class="dot" cx="310" cy="100" r="6"/><text class="t-s" x="310" y="148" text-anchor="middle">4. fix forward</text>
<circle class="dot" cx="380" cy="100" r="6"/><text class="t-s" x="380" y="172" text-anchor="end">5. postmortem</text>
<path class="ln-d" d="M40 196h190"/><path class="ln-d" d="M40 188v16"/><path class="ln-d" d="M230 188v16"/>
<text class="t-b" x="135" y="226" text-anchor="middle">keep this short</text>
<text class="t-s" x="135" y="246" text-anchor="middle">every minute here hurts users</text>
<text class="t-s" x="315" y="226" text-anchor="middle">no rush: users</text>
<text class="t-s" x="315" y="246" text-anchor="middle">are fine again</text>
</svg><figcaption>A timeline of the incident. Users suffer from the bad deploy until the rollback, so the first three steps, confirm, read the logs and roll back, should be as quick as possible. The proper fix and the postmortem happen afterwards, when the site already works.</figcaption></figure>
<ol>
<li><b>Confirm</b> the problem yourself. Reports can be vague or wrong.</li>
<li><b>Look</b> at the logs to see what is failing and roughly why.</li>
<li><b>Restore service</b>: roll back to the last version that worked.</li>
<li><b>Fix forward</b> calmly: reproduce the bug, write a test for it, fix it, and deploy through CI as normal.</li>
<li><b>Learn</b>: write a short postmortem.</li>
</ol>
<p>The tempting mistake is to jump to step 4 while the site is still down, trying to find and fix the bug under pressure. That keeps users waiting, and rushed fixes often add a second bug. Restore first. You can investigate as long as you like once the site works again.</p>

<h4>Step 1: confirm with <code>curl -I</code></h4>
<pre class="snip">curl -I https://portfolio.vercel.app
HTTP/2 500          # the server failed
server: Vercel</pre>
<p>A <code>500</code> confirms it. Remember the first digit from the first lesson: 5 means the server failed, not the visitor. You now know the problem is real, it is in your app rather than DNS or someone's Wi-Fi, and you have a quick test to repeat later to check the fix.</p>

<h4>Step 2: read the logs</h4>
<p>On Vercel, <code>vercel logs</code> followed by a deployment URL shows that deployment's runtime logs, meaning what the app printed while handling requests. Use the URL of the newest production deployment, which <code>vercel ls</code> shows you.</p>
<p>Logs look intimidating, but each line has the same parts. Here is the kind of thing you will see:</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="Anatomy of a log line and an error with a stack trace">
<rect class="bx-dark" x="10" y="10" width="400" height="120" rx="8"/>
<text class="t-term" x="22" y="36">10:31:02</text><text class="t-term" x="112" y="36">GET</text><text class="t-term" x="160" y="36">500</text><text class="t-term" x="208" y="36">/api/projects</text>
<text class="t-term" x="22" y="68">TypeError: Cannot read</text>
<text class="t-term" x="22" y="90">properties of undefined</text>
<text class="t-term" x="40" y="118">at route.js:14:28</text>
<path class="ln-a" d="M58 132v20"/><text class="t-s t-a" x="58" y="170" text-anchor="middle">when</text>
<path class="ln-a" d="M125 132v20"/><text class="t-s t-a" x="125" y="170" text-anchor="middle">method</text>
<path class="ln-a" d="M173 132v40"/><text class="t-s t-a" x="173" y="190" text-anchor="middle">status</text>
<path class="ln-a" d="M266 132v20"/><text class="t-s t-a" x="266" y="170" text-anchor="middle">which page</text>
<text class="t-s t-info" x="22" y="216">The error says what went wrong. The "at" line says</text>
<text class="t-s t-info" x="22" y="234">where: file route.js, line 14, character 28.</text>
</svg><figcaption>The first line is a request: the time, the method, the status code and the path. The next lines are an error. The message says what went wrong, and the line starting with "at" is the stack trace, pointing at the exact file, line and column where it happened.</figcaption></figure>
<ul>
<li>The <b>request line</b> tells you every request to <code>/api/projects</code> is failing with 500, while other pages might be fine. That narrows the search enormously.</li>
<li>The <b>error message</b>, <code>Cannot read properties of undefined (reading 'map')</code>, means the code called <code>.map()</code> on something that did not exist, typically a list it expected from a database or API that came back empty or missing.</li>
<li>The <b>stack trace</b> lines starting with <code>at</code> show where. Read the top one first: it is usually your code, with a file, line and column number.</li>
</ul>
<p>On your own VPS from the server lesson, the equivalent is the system journal. If your app runs as a systemd service called <code>app</code>, <code>journalctl -u app</code> shows its logs. Add <code>-n 50</code> for just the last fifty lines, or <code>-f</code> to follow new lines live, like <code>gh run watch</code> for logs.</p>
<div class="tip"><b>Tip</b>You do not need to fully understand the bug before rolling back. "Every request to one route has failed since the last deploy" is plenty of evidence. Note what you saw, then restore service.</div>

<h4>Step 3: roll back</h4>
<p>This is where immutable deployments pay off. The previous production deployment still exists, unchanged, at its own URL. Rolling back simply points the production address back at it:</p>
<pre class="snip">vercel rollback      # production points at the previous deployment
curl -I https://portfolio.vercel.app   # check: HTTP/2 200 again</pre>
<p>Nothing is rebuilt, so it takes seconds. Then <b>verify</b>: never assume a fix worked. Run the same <code>curl -I</code> you used to confirm the problem, and look for the <code>200</code>.</p>
<p>One real-world detail: after a rollback, Vercel stops automatically moving production to new deployments, so a push to <code>main</code> will not undo your rollback by accident. Once your proper fix is deployed and checked, you <b>promote</b> it to production, for example with <code>vercel promote</code>, and normal behaviour resumes.</p>
<div class="mistake"><b>Common mistake</b>"Hotfixing" production by hand: editing files directly on the server, or pushing a quick untested change straight to <code>main</code>. It skips your tests and review exactly when you are most stressed and most likely to slip. Roll back to something known to work, then fix through the normal path.</div>

<h4>Steps 4 and 5: fix forward, then a postmortem</h4>
<p>With users safe, fix the bug properly. Reproduce it locally, write a test that fails because of it (for example, "the projects route copes with an empty list"), make the test pass, and ship through CI. The new test means this exact bug can never quietly return.</p>
<p>Finally, write a short <b>postmortem</b>, a written review of the incident. A good one has:</p>
<ul>
<li>a <b>timeline</b>: when it broke, when someone noticed, when it was restored;</li>
<li>the <b>root cause</b>: the underlying reason, not just the line of code (for example, "the route assumed the database always returns a list, and no test covered the empty case");</li>
<li><b>actions</b>: concrete changes that stop a repeat, such as a new test, an uptime check, or an alert on error rates.</li>
</ul>
<p>Good postmortems are <b>blameless</b>. They ask "how did our system allow this?" rather than "who did this?". People who fear blame hide mistakes, and hidden mistakes happen again.</p>
<div class="try"><b>Try it in your head</b>Your uptime check alerts you at 2am: the site returns 500. The last deploy was at 1:40am. What do you do first? Confirm it with <code>curl -I</code>, glance at the logs, and roll back to the deployment from before 1:40. Investigate in the morning, when the site is working and you are awake.</div>

<h4>Recap</h4>
<ul>
<li>Every team breaks production sometimes. The response is what matters: restore first, debug second.</li>
<li>Confirm with <code>curl -I</code>; read the logs with <code>vercel logs URL</code> or <code>journalctl -u app</code>.</li>
<li>In a log, read the status code and path, then the error message, then the top "at" line of the stack trace.</li>
<li><code>vercel rollback</code> is instant because deployments are immutable. Always verify afterwards.</li>
<li>Fix forward with a test, then write a blameless postmortem: timeline, root cause, actions.</li>
<li>Uptime checks and error tracking let you hear about problems before your users tell you.</li>
</ul>
`);
