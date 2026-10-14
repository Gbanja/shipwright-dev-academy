/* sysdesign: "Explained step by step" walkthroughs. */

explain('k1',`
<h4>What system design is about</h4>
<p>Building an app that works for you and ten friends is one skill. Keeping it fast and online when a million people use it at once is another. <b>System design</b> is that second skill: choosing the pieces of a system (servers, databases, caches, queues) and how they connect, so it keeps working as it grows.</p>
<p>Every design, however big, is built from one basic conversation: a <b>client</b> asks, and a <b>server</b> answers. This lesson takes that conversation apart. Once you understand it properly, the rest of the track (load balancers, caches, queues, replicas) is just ways of making it faster, cheaper and harder to break.</p>

<h4>Clients, servers and HTTP</h4>
<p>A <b>client</b> is the program that asks for something: a web browser, a phone app, or even another server. A <b>server</b> is a program, running on a computer somewhere, that waits for requests and answers them. They talk over the network using <b>HTTP</b>, the HyperText Transfer Protocol, which is simply an agreed format for requests and responses.</p>
<p>A request says <b>what to do</b> (the method), <b>to what</b> (the path), and optionally carries data (the body). A response carries a <b>status code</b>, a three-digit number saying how it went, plus the data, usually as <b>JSON</b>, a text format for structured data.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="A phone app sends GET /users/42 to a server, which reads the database and replies 200 OK with JSON">
<rect class="bx-info" x="10" y="50" width="70" height="140" rx="10"/><text class="t-b" x="45" y="125" text-anchor="middle">Client</text>
<rect class="bx-a" x="180" y="50" width="76" height="140" rx="10"/><text class="t-b" x="218" y="125" text-anchor="middle">Server</text>
<rect class="bx" x="320" y="90" width="92" height="64" rx="10"/><text class="t-b" x="366" y="127" text-anchor="middle">Database</text>
<text class="t-m" x="130" y="34" text-anchor="middle">GET /users/42</text>
<path class="ln-a" d="M80 70h92"/><polygon class="ah-a" points="170,64 170,76 178,70"/>
<path class="ln" d="M256 110h56"/><polygon class="ah" points="310,104 310,116 318,110"/>
<path class="ln" d="M320 136h-56"/><polygon class="ah" points="266,130 266,142 258,136"/>
<text class="t-s" x="288" y="100" text-anchor="middle">query</text><text class="t-s" x="288" y="156" text-anchor="middle">row</text>
<path class="ln-ok" d="M180 170h-92"/><polygon class="ah-ok" points="90,164 90,176 82,170"/>
<text class="t-m t-ok" x="130" y="160" text-anchor="middle">200 OK</text>
<text class="t-s" x="130" y="210" text-anchor="middle">{"name":"Ada"}</text>
</svg><figcaption>One request and response. The client sends GET slash users slash 42. The server asks the database for that user, gets the row back, and replies with status 200 OK and the user as JSON. Each arrow across the network costs time.</figcaption></figure>
<p>Status codes come in families, and the first digit tells you who is at fault:</p>
<div class="tbl-wrap"><table><tr><th>Family</th><th>Meaning</th><th>Common examples</th></tr>
<tr><td>2xx</td><td>Success</td><td>200 OK, 201 Created, 204 No Content</td></tr>
<tr><td>3xx</td><td>Look somewhere else</td><td>301 Moved Permanently, 302 Found (a temporary redirect)</td></tr>
<tr><td>4xx</td><td>The client made a mistake</td><td>400 Bad Request, 401 not logged in, 403 not allowed, 404 Not Found, 429 Too Many Requests</td></tr>
<tr><td>5xx</td><td>The server failed</td><td>500 Internal Server Error, 503 Service Unavailable</td></tr></table></div>
<p>The difference matters in design: retrying a 4xx usually fails again, because the request itself is wrong, while a 5xx or a timeout may succeed on a retry.</p>

<h4>APIs: the menu of questions</h4>
<p>An <b>API</b>, short for Application Programming Interface, is the list of requests a server agrees to answer, and what each one returns. It is a contract: the app team and the server team can work separately as long as both stick to it. Two styles dominate.</p>
<p><b>REST</b> treats your data as <b>resources</b>, each with its own URL, and uses the standard HTTP methods on them:</p>
<pre class="snip">GET    /users/42          # read user 42
POST   /users             # create a new user
PUT    /users/42          # replace user 42
DELETE /users/42          # delete user 42
GET    /users/42/posts    # user 42's posts</pre>
<p>REST is simple, works with every tool, and its GET responses are easy to cache, because the same URL gives the same answer. Its weakness shows on complex screens: a mobile page that needs a user, their posts and each post's comments may need several round trips, and each response may include fields the screen never shows. That is called <b>over-fetching</b>.</p>
<p><b>GraphQL</b> takes a different approach. There is one endpoint, usually <code>/graphql</code>, and the client sends a query describing exactly the fields it wants, nested however it likes. The server returns that shape and nothing more, in one round trip. The cost is more server complexity and harder caching, because every request goes to the same URL with a different body.</p>
<div class="analogy"><b>Think of it like</b>REST is a set menu: each dish (URL) comes as the kitchen designed it. GraphQL is ordering à la carte: you list exactly what goes on your plate, and the waiter brings it all at once.</div>

<h4>Stateless servers</h4>
<p>Soon you will run several copies of your server, and any of them might receive a given request. That only works if the servers are <b>stateless</b>: a server keeps no memory of a user between requests. Everything it needs comes in the request itself (such as a login token) or lives in shared storage everyone can reach.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Two app servers both reading the user's session from one shared session store">
<rect class="bx-info" x="10" y="80" width="80" height="44" rx="8"/><text class="t-b" x="50" y="107" text-anchor="middle">User</text>
<rect class="bx-a" x="160" y="20" width="100" height="44" rx="8"/><text class="t" x="210" y="47" text-anchor="middle">Server A</text>
<rect class="bx-a" x="160" y="140" width="100" height="44" rx="8"/><text class="t" x="210" y="167" text-anchor="middle">Server B</text>
<rect class="bx-ok" x="320" y="72" width="94" height="60" rx="8"/><text class="t-b" x="367" y="98" text-anchor="middle">Redis</text><text class="t-s" x="367" y="118" text-anchor="middle">sessions</text>
<path class="ln" d="M90 92L152 48"/><polygon class="ah" points="148,43 155,53 160,42"/><text class="t-s" x="104" y="60">1st</text>
<path class="ln" d="M90 112L152 156"/><polygon class="ah" points="148,161 155,151 160,162"/><text class="t-s" x="104" y="150">2nd</text>
<path class="ln-ok" d="M260 42L314 88"/><polygon class="ah-ok" points="308,91 316,82 320,93"/>
<path class="ln-ok" d="M260 162L314 116"/><polygon class="ah-ok" points="308,113 316,122 320,111"/>
</svg><figcaption>A user's first request lands on server A and their second on server B. Because neither server keeps the login in its own memory, both look it up in a shared session store such as Redis, so the user stays logged in whichever server answers.</figcaption></figure>
<p>If instead server A kept the login in its own memory, the second request on server B would find nothing, and the user would be logged out at random. Stateless servers can be added, removed or restarted freely, which is the foundation of the next lesson.</p>

<h4>Idempotency: making retries safe</h4>
<p>Networks fail. A request may time out after the server already did the work, and the client cannot tell. The obvious fix is to retry, but is that safe? An operation is <b>idempotent</b> if doing it twice has the same effect as doing it once.</p>
<ul>
<li><code>GET</code> only reads, so repeating it changes nothing.</li>
<li><code>PUT /users/42</code> sets the user to an exact value; doing it twice leaves the same value.</li>
<li><code>DELETE /users/42</code> twice: the user is still just deleted.</li>
<li><code>POST /payments</code> usually creates something new each time. Twice means two payments.</li>
</ul>
<p>For non-idempotent actions such as payments, the standard fix is an <b>idempotency key</b>. The client generates a unique ID for the action and sends it with the request. The server records each key it has handled; if the same key arrives again, it returns the saved result instead of charging again. Payment APIs such as Stripe work exactly like this.</p>
<div class="mistake"><b>Common mistake</b>Assuming a timeout means "it failed". A timeout only means "I don't know". The work may have finished. Design every write so that a retry is harmless, either because it is naturally idempotent or because it carries an idempotency key.</div>

<h4>Pagination: big lists in pages</h4>
<p>Never return a list of a million posts in one response. Return a <b>page</b> at a time. The obvious way is an <b>offset</b>: "skip the first 100,000 rows and give me 20". It has two problems. The database still has to walk past all the skipped rows, so deep pages get slow. And if new posts arrive while someone scrolls, everything shifts down, so they see some posts twice and miss others.</p>
<p>A <b>cursor</b> fixes both. Each page ends with a marker, usually the ID of the last item, and the next request says "give me 20 after this one": <code>GET /posts?after=abc123</code>. The database jumps straight there using an index, and new posts at the top do not shift anything.</p>

<h4>Latency: why distance matters</h4>
<p><b>Latency</b> is how long you wait for something. The numbers are worth remembering, because they explain almost every design choice in this track:</p>
<div class="tbl-wrap"><table><tr><th>Operation</th><th>Roughly</th><th>Compared with memory</th></tr>
<tr><td>Read from memory (RAM)</td><td>100 nanoseconds</td><td>1×</td></tr>
<tr><td>Read from an SSD</td><td>100 microseconds</td><td>1,000× slower</td></tr>
<tr><td>Round trip inside one data centre</td><td>0.5 milliseconds</td><td>5,000× slower</td></tr>
<tr><td>Round trip between continents</td><td>150 milliseconds</td><td>about 1,500,000× slower</td></tr></table></div>
<p>A nanosecond is a billionth of a second, a microsecond a millionth, a millisecond a thousandth. The lesson: memory is far faster than disk, and disk far faster than the network. That is why caches keep answers in memory, and why CDNs put copies of files near users. Both are coming soon.</p>
<div class="try"><b>Try it in your head</b>A client sends <code>DELETE /posts/7</code>, times out, and retries. Is that safe? Yes: DELETE is idempotent, and the post ends up deleted either way. The server replies 404 to a request for a page that does not exist: whose fault is it? A 4xx code means the client's.</div>

<h4>Recap</h4>
<ul>
<li>Clients send HTTP requests (method, path, body); servers reply with a status code and data, often JSON.</li>
<li>REST gives each resource a URL and is cache-friendly; GraphQL uses one endpoint where the client asks for exactly the fields it needs.</li>
<li>Stateless servers keep no user data in memory, so any server can handle any request.</li>
<li>GET, PUT and DELETE should be idempotent; protect POSTs like payments with idempotency keys.</li>
<li>Paginate with cursors, and remember: memory is much faster than disk, and disk much faster than the network.</li>
</ul>
`);

explain('k2',`
<h4>Launch day: when one server is not enough</h4>
<p>Your app gets featured, and traffic jumps to <b>1,500 requests per second</b>. "Requests per second", often written rps, is the standard way to measure load: how many questions arrive at your servers every second. In this lesson's simulator, one app server can handle about <b>400</b>. You do not need a calculator to see the problem: the server receives almost four times what it can process.</p>
<p>What happens then is not a gentle slowdown. Requests pile up waiting, each one waits longer than the last, and soon clients give up with timeouts. Users see errors. This lesson is about the two ways to add capacity, why one of them wins at scale, and how to work out exactly how many servers you need.</p>

<h4>Vertical scaling: a bigger machine</h4>
<p><b>Vertical scaling</b>, also called scaling up, means replacing your server with a more powerful one: more CPU cores, more memory. It is attractive because nothing else changes. Your code, your deployment and your database connection stay exactly the same.</p>
<p>It has two hard limits. First, there is a ceiling: the biggest machine you can rent is only so big, and the largest sizes cost far more per unit of power. Second, it is still <b>one machine</b>. If it crashes, or you need to restart it to install an update, the whole site is down.</p>

<h4>Horizontal scaling: more machines</h4>
<p><b>Horizontal scaling</b>, or scaling out, means running several ordinary servers side by side, each a copy of your app. Need more capacity? Add another copy. One crashes? The others carry on.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Vertical scaling makes one server bigger; horizontal scaling adds more servers of the same size">
<text class="t-b" x="100" y="22" text-anchor="middle">vertical</text><text class="t-b" x="310" y="22" text-anchor="middle">horizontal</text>
<rect class="bx" x="30" y="130" width="40" height="44" rx="4"/><text class="t-s" x="50" y="157" text-anchor="middle">app</text>
<path class="ln" d="M76 152h18"/><polygon class="ah" points="92,146 92,158 100,152"/>
<rect class="bx-a" x="106" y="60" width="76" height="114" rx="6"/><text class="t-b" x="144" y="114" text-anchor="middle">BIG</text><text class="t-s" x="144" y="134" text-anchor="middle">app</text>
<text class="t-s t-bad" x="106" y="194" text-anchor="middle">still one machine</text>
<line class="ln-d" x1="210" y1="10" x2="210" y2="195"/>
<rect class="bx-ok" x="232" y="130" width="40" height="44" rx="4"/><rect class="bx-ok" x="282" y="130" width="40" height="44" rx="4"/><rect class="bx-ok" x="332" y="130" width="40" height="44" rx="4"/><rect class="bx-ok" x="382" y="130" width="30" height="44" rx="4"/>
<g text-anchor="middle"><text class="t-s" x="252" y="157">app</text><text class="t-s" x="302" y="157">app</text><text class="t-s" x="352" y="157">app</text><text class="t-s" x="397" y="157">+</text></g>
<rect class="bx-info" x="262" y="56" width="96" height="40" rx="8"/><text class="t" x="310" y="81" text-anchor="middle">balancer</text>
<path class="ln" d="M290 96L256 126"/><path class="ln" d="M310 96v30"/><path class="ln" d="M330 96L350 126"/>
<text class="t-s t-ok" x="320" y="194" text-anchor="middle">add more as needed</text>
</svg><figcaption>Left: vertical scaling swaps a small server for a big one, but it is still a single machine that can fail. Right: horizontal scaling keeps servers the same size and adds more of them behind a load balancer, which shares the traffic between them.</figcaption></figure>
<div class="analogy"><b>Think of it like</b>A busy shop. Vertical scaling is training your one shop assistant to work twice as fast; there is a limit, and if they are ill, the shop shuts. Horizontal scaling is hiring more assistants, with someone at the door sending each customer to whoever is free.</div>

<h4>The load balancer</h4>
<p>Several servers raise a question: which one does a user talk to? Users only know one address, such as <code>shop.example.com</code>. The answer is a <b>load balancer</b>: a component that sits in front of the servers, receives every request at that one address, and forwards each to one of the servers behind it.</p>
<p>How does it choose? The simplest rule is <b>round robin</b>: server 1, then 2, then 3, then back to 1. Smarter rules pick the server with the fewest requests in progress. Load balancers also run <b>health checks</b>: every few seconds they ask each server "are you alive?", usually by requesting a simple status URL, and stop sending traffic to any server that fails to answer.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="A load balancer spreads requests across four servers and skips one that has failed">
<rect class="bx-info" x="10" y="90" width="76" height="44" rx="8"/><text class="t-b" x="48" y="117" text-anchor="middle">Users</text>
<path class="ln-a" d="M86 112h22"/><polygon class="ah-a" points="106,106 106,118 114,112"/>
<rect class="bx-a" x="116" y="80" width="96" height="64" rx="8"/><text class="t-b" x="164" y="108" text-anchor="middle">Load</text><text class="t-b" x="164" y="128" text-anchor="middle">balancer</text>
<rect class="bx-ok" x="290" y="14" width="110" height="38" rx="6"/><rect class="bx-ok" x="290" y="66" width="110" height="38" rx="6"/><rect class="bx-bad" x="290" y="118" width="110" height="38" rx="6"/><rect class="bx-ok" x="290" y="170" width="110" height="38" rx="6"/>
<g text-anchor="middle"><text class="t" x="345" y="38">App 1</text><text class="t" x="345" y="90">App 2</text><text class="t t-bad" x="345" y="142">App 3 down</text><text class="t" x="345" y="194">App 4</text></g>
<path class="ln-ok" d="M212 98L282 36"/><polygon class="ah-ok" points="277,31 284,41 290,30"/>
<path class="ln-ok" d="M212 106L282 86"/><polygon class="ah-ok" points="279,80 282,92 290,84"/>
<path class="ln-d" d="M212 120L282 136"/><text class="t-s t-bad" x="252" y="150" text-anchor="middle">skipped</text>
<path class="ln-ok" d="M212 128L282 188"/><polygon class="ah-ok" points="276,192 284,183 290,193"/>
</svg><figcaption>Users send every request to the load balancer, which forwards each one to a healthy app server. App 3 has failed its health check, so the balancer skips it and shares the traffic between apps 1, 2 and 4. Users never notice.</figcaption></figure>
<p>This is how horizontal scaling removes the <b>single point of failure</b>: any one part whose failure takes the whole system down. With one server, that server is a single point of failure. With four behind a balancer, losing one costs a quarter of your capacity, not your whole site. It also makes deployments safe, because you can update servers one at a time while the others keep serving. (Real setups run the load balancer itself as a redundant pair, or use a managed one from a cloud provider, so it is not a single point of failure either.)</p>
<div class="mistake"><b>Common mistake</b>Adding servers but keeping state on them. If server 1 stores a user's login in its memory and the balancer sends their next click to server 2, they are suddenly logged out. This is why the previous lesson insisted on stateless servers: put sessions in a shared store such as Redis or the database. "Sticky sessions", which pin a user to one server, hide the problem but bring back the single point of failure for that user.</div>

<h4>Why you never run servers at 100%</h4>
<p>If one server handles 400 rps, is 4 servers for 1,600 rps of capacity enough for 1,500 rps? On paper, yes. In practice, no, and the reason is <b>queueing</b>.</p>
<p>Requests do not arrive evenly. They come in random clumps. When a server is lightly used, a clump is absorbed quickly. When it is nearly full, every clump creates a queue, and the queue barely shrinks before the next clump arrives. As a result, waiting time does not grow steadily with how busy a server is; it explodes as you approach 100%.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="Waiting time stays low until a server is about 70 per cent busy, then climbs steeply towards 100 per cent">
<rect class="bx-ok" x="281" y="30" width="33" height="160"/>
<text class="t-s t-ok" x="297" y="24" text-anchor="middle">aim here</text>
<line class="ln" x1="50" y1="20" x2="50" y2="190"/><line class="ln" x1="50" y1="190" x2="390" y2="190"/>
<polyline class="ln-a" fill="none" points="50,190 149,183 215,173 248,165 281,152 298,140 314,123 331,95 340,68 347,40 350,21"/>
<line class="ln-d" x1="380" y1="20" x2="380" y2="190"/>
<g text-anchor="middle"><text class="t-s" x="50" y="208">0%</text><text class="t-s" x="215" y="208">50%</text><text class="t-s" x="380" y="208">100%</text><text class="t-s" x="215" y="226">how busy the server is</text></g>
<text class="t-s" x="58" y="34">waiting time</text>
</svg><figcaption>How long requests wait as a server gets busier. Up to about half busy, waiting barely changes. Past about 80 per cent it climbs steeply, and near 100 per cent it shoots off the chart. The green band, 70 to 80 per cent, is where teams aim to run at peak.</figcaption></figure>
<p>So teams plan for <b>headroom</b>: spare capacity. A common target is about <b>70 to 80% busy at peak</b>, often written as a target utilisation of 0.75. That leaves room for clumps, for a server failing, and for traffic you did not predict.</p>

<h4>Worked example: how many servers?</h4>
<p>The formula combines everything above:</p>
<pre class="snip">servers needed = peak rps ÷ capacity per server ÷ target utilisation
               = 1500 ÷ 400 ÷ 0.75
               = 3.75 ÷ 0.75
               = 5</pre>
<p>Read it in two steps. 1,500 ÷ 400 = 3.75 servers would be exactly 100% busy. Dividing by 0.75 adds the headroom, giving 5. Always round <b>up</b>: you cannot run three quarters of a server.</p>
<p>The simulator agrees. With a load balancer and 4 app servers, they run about 94% busy: nothing fails outright, but queues build and the slowest requests take far longer than the 200 ms goal. With 5 servers they run about 75% busy, and p95 latency drops well under 200 ms. <b>p95</b> means the 95th percentile: 95 out of 100 requests are at least this fast. Teams watch it instead of the average because the average hides the slow requests that users actually complain about.</p>
<p>Cost matters too. In the simulator, a load balancer costs $20 a month and each app server $40, on top of the database. Five servers and a balancer fit comfortably inside the $350 budget. Real system design is always this balance: fast enough, reliable enough, and affordable.</p>
<div class="mistake"><b>Common mistake</b>Turning up the app server count without switching on the load balancer. Without one, all traffic still goes to a single server, and the extra machines sit idle while you pay for them. The simulator's notes warn you when this happens.</div>
<div class="try"><b>Try it in your head</b>Traffic grows to 2,400 rps, and each server still handles 400. How many servers at a 0.75 target? 2,400 ÷ 400 = 6, and 6 ÷ 0.75 = 8 servers.</div>

<h4>Recap</h4>
<ul>
<li>Vertical scaling buys a bigger machine: simple, but it has a ceiling and is still a single point of failure.</li>
<li>Horizontal scaling adds more machines behind a load balancer, which spreads requests and skips unhealthy servers.</li>
<li>Servers must be stateless for this to work: keep sessions in a shared store.</li>
<li>Waiting time explodes near 100% busy, so aim for about 75% at peak.</li>
<li>Servers needed ≈ peak rps ÷ capacity per server ÷ target utilisation, rounded up.</li>
</ul>
`);
