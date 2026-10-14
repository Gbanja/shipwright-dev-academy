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
<path class="ln-d" d="M212 120L282 136"/><text class="t-s t-bad" x="246" y="121" text-anchor="middle">skipped</text>
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

explain('k3',`
<h4>Black Friday: the same questions, over and over</h4>
<p>It is the biggest sale of the year. Traffic hits <b>4,000 requests per second</b>, and 95% of them are <b>reads</b>: people looking at products, not buying them yet. Thousands of shoppers ask for the same few popular product pages, the same prices and the same images, again and again.</p>
<p>Without help, every one of those requests travels all the way to your database, which works out the same answer it gave a millisecond ago. Remember the latency numbers from the first lesson: memory is far faster than disk or the network. This lesson uses that fact twice: a <b>cache</b> keeps popular answers in memory next to your servers, and a <b>CDN</b> keeps copies of your files close to your users.</p>
<div class="analogy"><b>Think of it like</b>A librarian who keeps a notepad of questions they have already looked up. "What time does the library close?" gets answered from the notepad in a second, instead of a trip to the archive every time.</div>

<h4>What a cache is</h4>
<p>A <b>cache</b> is a fast, temporary store of answers you have already worked out. The most common one in web systems is <b>Redis</b>, a server that keeps <b>key-value pairs</b> in memory: you store a value under a key, such as <code>product:42</code>, and fetch it back by that key in about a millisecond or two. It is the hash map from the algorithms track, running as a shared service that all your app servers can reach.</p>
<p>Two words describe every cache lookup. A <b>hit</b> means the answer was in the cache. A <b>miss</b> means it wasn't, so you must go to the slower source. The <b>hit rate</b> is the share of lookups that are hits. With an 80% hit rate, only 20 out of every 100 reads reach the database.</p>

<h4>Cache-aside, step by step</h4>
<p>The most common way to use a cache is called <b>cache-aside</b>, because the cache sits beside the database and your app code manages it:</p>
<pre class="snip">value = redis.get(key)
if value is missing:                  # cache miss
    value = db.query(...)             # the slow, reliable source
    redis.set(key, value, ttl=60)     # remember it for 60 seconds
return value</pre>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="A cache hit answered by the cache alone, beside a cache miss that queries the database and then saves the answer in the cache">
<text class="t-b t-ok" x="100" y="16" text-anchor="middle">hit</text><text class="t-b t-warn" x="310" y="16" text-anchor="middle">miss</text>
<rect class="bx-a" x="40" y="24" width="120" height="36" rx="6"/><text class="t" x="100" y="47" text-anchor="middle">App</text>
<rect class="bx-ok" x="40" y="90" width="120" height="40" rx="6"/><text class="t" x="100" y="115" text-anchor="middle">Cache</text>
<rect class="bx" x="40" y="160" width="120" height="40" rx="6"/><text class="t-s" x="100" y="185" text-anchor="middle">DB not touched</text>
<path class="ln" d="M80 60v22"/><polygon class="ah" points="74,80 86,80 80,88"/><text class="t-s" x="74" y="79" text-anchor="end">get</text>
<path class="ln-ok" d="M120 90v-22"/><polygon class="ah-ok" points="114,70 126,70 120,62"/><text class="t-s t-ok" x="128" y="79">value</text>
<line class="ln-d" x1="210" y1="8" x2="210" y2="208"/>
<rect class="bx-a" x="250" y="24" width="120" height="36" rx="6"/><text class="t" x="310" y="47" text-anchor="middle">App</text>
<rect class="bx-warn" x="250" y="90" width="120" height="40" rx="6"/><text class="t" x="310" y="115" text-anchor="middle">Cache: empty</text>
<rect class="bx-info" x="250" y="160" width="120" height="40" rx="6"/><text class="t" x="310" y="185" text-anchor="middle">Database</text>
<path class="ln" d="M280 60v22"/><polygon class="ah" points="274,80 286,80 280,88"/><text class="t-s" x="274" y="79" text-anchor="end">1 get</text>
<path class="ln-d" d="M335 60v22"/><polygon class="ah" points="329,80 341,80 335,88"/><text class="t-s" x="341" y="79">3 save</text>
<path class="ln" d="M370 36h22v144h-14"/><polygon class="ah" points="380,174 380,186 372,180"/><text class="t-b" x="400" y="112">2</text>
</svg><figcaption>Left, a hit: the app asks the cache, gets the value back in about two milliseconds, and the database is never touched. Right, a miss: step 1, the cache has nothing. Step 2, the app queries the database. Step 3, it saves the answer in the cache with a time limit, so the next request for the same key is a hit.</figcaption></figure>
<p>Notice that the cache never has to be complete. It fills itself with whatever people actually ask for, which is usually a small set of popular items. That is why caches work so well for <b>read-heavy</b> workloads, where reads far outnumber writes: the same answers are reused many times before they change.</p>

<h4>TTL and the hard part: invalidation</h4>
<p>A cached answer is a copy, and copies go out of date. If a product's price changes in the database, the cache still holds the old price. Data that is out of date is called <b>stale</b>.</p>
<p>The simplest defence is a <b>TTL</b>, short for "time to live": an expiry time attached to each cached value. With <code>ttl=60</code>, Redis deletes the value after 60 seconds, so the next request is a miss and fetches the fresh price. A TTL puts an upper limit on staleness: at worst, users see a price up to a minute old.</p>
<p>When a minute is too long, you <b>invalidate</b> explicitly: whenever the app updates the price in the database, it also deletes that key from the cache. The next read is a miss and loads the new value. Deleting the key is usually safer than writing the new value into the cache, because two updates racing each other could leave the older value in the cache.</p>
<div class="tip"><b>Tip</b>The old joke says there are only two hard things in computer science: cache invalidation and naming things. The practical answer is to decide, for each piece of data, how stale it may be. A product description can be an hour old. A stock count at checkout should not be cached at all.</div>
<div class="mistake"><b>Common mistake</b>Caching without a TTL "because the data never changes". It always changes eventually, and without an expiry the stale value lives forever, or until someone restarts Redis. Always set a TTL, even a long one.</div>

<h4>CDNs: files close to your users</h4>
<p>Many requests are not questions for the database at all. They are <b>static files</b>: images, JavaScript, CSS and fonts, which are the same for every user. In this lesson's scenario, 30% of all requests are static files, and your app servers are wasting their time sending them.</p>
<p>A <b>CDN</b>, or Content Delivery Network, is a company's network of servers in hundreds of cities worldwide, called <b>edge locations</b>. Examples are Cloudflare, Amazon CloudFront and Vercel's edge network. The first time someone near an edge asks for a file, the edge fetches it from your server, called the <b>origin</b>, and keeps a copy. Everyone nearby after that gets the copy from the edge.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="An origin server in the middle with CDN edge servers in four distant cities serving nearby users">
<rect class="bx-a" x="160" y="90" width="100" height="44" rx="8"/><text class="t-b" x="210" y="117" text-anchor="middle">Origin</text>
<rect class="bx-ok" x="10" y="14" width="110" height="36" rx="8"/><rect class="bx-ok" x="300" y="14" width="110" height="36" rx="8"/><rect class="bx-ok" x="10" y="166" width="110" height="36" rx="8"/><rect class="bx-ok" x="300" y="166" width="110" height="36" rx="8"/>
<g text-anchor="middle"><text class="t" x="65" y="37">New York</text><text class="t" x="355" y="37">Tokyo</text><text class="t" x="65" y="189">São Paulo</text><text class="t" x="355" y="189">Lagos</text>
<text class="t-s" x="65" y="70">users: ~20 ms</text><text class="t-s" x="355" y="70">users: ~20 ms</text><text class="t-s" x="65" y="158">users: ~20 ms</text><text class="t-s" x="355" y="158">users: ~20 ms</text></g>
<path class="ln-d" d="M120 50L160 92"/><path class="ln-d" d="M300 50L260 92"/><path class="ln-d" d="M120 166L160 132"/><path class="ln-d" d="M300 166L260 132"/>
<text class="t-s" x="210" y="152" text-anchor="middle">fetched once</text>
</svg><figcaption>Your origin server sits in one place. CDN edge servers in New York, Tokyo, São Paulo and Lagos each fetch a file from the origin once, along the dashed lines, then serve it to nearby users in around 20 milliseconds instead of a long round trip across the world.</figcaption></figure>
<p>A CDN wins twice. Users get files faster, because the round trip is short. And your servers never see those requests, so they have more capacity for real work. CDNs also use TTLs, set through HTTP caching headers. A common trick is to put a version or content hash in each file's name, such as <code>app.3f9a1c.js</code>, so a new release has a new name and old copies simply stop being requested.</p>

<h4>Worked example: the Black Friday numbers</h4>
<p>The lesson starts you with a load balancer and 9 app servers, which handle about 9 × 400 = 3,600 rps. That is less than 4,000, so the app tier is overloaded. Follow the traffic once you add both a CDN and a cache:</p>
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="4,000 requests per second split between the CDN, the app servers, the cache and the database">
<rect class="bx-info" x="10" y="90" width="72" height="44" rx="6"/><text class="t-b" x="46" y="110" text-anchor="middle">Users</text><text class="t-s" x="46" y="126" text-anchor="middle">4,000/s</text>
<rect class="bx-ok" x="110" y="14" width="84" height="44" rx="6"/><text class="t-b" x="152" y="34" text-anchor="middle">CDN</text><text class="t-s" x="152" y="50" text-anchor="middle">1,200/s</text>
<rect class="bx" x="110" y="90" width="84" height="44" rx="6"/><text class="t-b" x="152" y="110" text-anchor="middle">App</text><text class="t-s" x="152" y="126" text-anchor="middle">2,800/s</text>
<rect class="bx-ok" x="222" y="90" width="84" height="44" rx="6"/><text class="t-b" x="264" y="110" text-anchor="middle">Cache</text><text class="t-s" x="264" y="126" text-anchor="middle">2,128 hits</text>
<rect class="bx-info" x="334" y="90" width="78" height="44" rx="6"/><text class="t-b" x="373" y="110" text-anchor="middle">DB</text><text class="t-s" x="373" y="126" text-anchor="middle">672/s</text>
<path class="ln" d="M82 98L104 60"/><polygon class="ah" points="98,59 108,64 108,52"/>
<path class="ln" d="M82 112h20"/><polygon class="ah" points="100,106 100,118 108,112"/>
<path class="ln" d="M194 112h20"/><polygon class="ah" points="212,106 212,118 220,112"/>
<path class="ln" d="M306 112h20"/><polygon class="ah" points="324,106 324,118 332,112"/>
<text class="t-s" x="262" y="164" text-anchor="middle">DB gets 532 reads + 140 writes</text>
</svg><figcaption>Of 4,000 requests per second, the 1,200 static ones are served by the CDN. The app servers handle the other 2,800. Of those, 2,660 are reads, and the cache answers 80 per cent of them, 2,128. Only 532 reads and 140 writes, 672 in all, reach the database.</figcaption></figure>
<ul>
<li><b>App servers:</b> 2,800 ÷ 3,600 is about 78% busy. Busy, but under the danger zone.</li>
<li><b>Database:</b> without the cache it would get all 2,660 reads, about 89% of its 3,000-read capacity in the simulator. With the cache, 532 reads is about 18%.</li>
<li><b>Cost:</b> balancer $20, nine servers $360, CDN $30, cache $60 and the database $120 add up to $590, inside the $620 budget.</li>
</ul>
<p>Notice the order matters for diagnosis: the CDN fixes the overloaded <i>app</i> tier, and the cache fixes the overloaded <i>database</i>. Read the load figures in the results to see which tier is struggling before you add anything.</p>
<div class="try"><b>Try it in your head</b>Reads reaching the cache: 1,000 per second. Hit rate: 90%. How many reach the database? 10% of 1,000, so 100 per second. And a user updates their profile photo, but their friends still see the old one for a few minutes: why? The old image is still cached, in a CDN or cache, until its TTL runs out or it is invalidated.</div>

<h4>Recap</h4>
<ul>
<li>A cache keeps popular answers in memory (Redis), so repeated reads skip the database.</li>
<li>Cache-aside: read the cache; on a miss, read the database and store the result with a TTL.</li>
<li>The database only sees the misses: reads × (1 − hit rate).</li>
<li>Stale data is the price. Use TTLs to limit it, and delete keys when the data changes.</li>
<li>A CDN serves static files from edge locations near users, which is faster for them and takes load off your servers.</li>
</ul>
`);

explain('k4',`
<h4>Why users should not wait for slow work</h4>
<p>When someone signs up, your app does three things: it saves the new user in the database, sends a welcome email, and generates a PDF receipt. Saving takes a few milliseconds. The email and PDF take about <b>400 milliseconds</b>, because they involve talking to an email provider and building a document. If the app does all of it before replying, the new user stares at a spinner for the whole time.</p>
<p>But does the user need the email to have been sent before they see "Welcome!"? No. They need to know their account exists. The email can arrive a few seconds later and nobody will notice. This lesson is about splitting work into "must happen now" and "can happen soon", and using a <b>queue</b> to do the second kind in the background.</p>
<div class="analogy"><b>Think of it like</b>A restaurant. The waiter takes your order, clips the ticket to the kitchen rail and comes straight back to you. They do not stand at the stove while your meal cooks. The rail is the queue, and the cooks are the workers.</div>

<h4>The pieces: producers, a queue and workers</h4>
<p>A <b>message queue</b> is a service that holds a list of <b>jobs</b> (also called messages) in order, until something takes them. Popular choices are Amazon SQS, RabbitMQ, and Redis-based libraries such as BullMQ. It is the first-in, first-out queue from the algorithms track, run as a reliable shared service.</p>
<ul>
<li>A <b>producer</b> adds jobs to the queue. Here, your app servers are the producers: "send the welcome email to user 42".</li>
<li>A <b>worker</b>, or consumer, is a separate program that takes jobs off the queue one by one and does the actual work.</li>
<li>A job is small: usually just the facts needed to do the work, such as a user ID, not the whole email.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Three app servers add jobs to a queue, and two workers take jobs from it">
<rect class="bx-a" x="10" y="20" width="80" height="36" rx="6"/><rect class="bx-a" x="10" y="80" width="80" height="36" rx="6"/><rect class="bx-a" x="10" y="140" width="80" height="36" rx="6"/>
<g text-anchor="middle"><text class="t" x="50" y="43">App 1</text><text class="t" x="50" y="103">App 2</text><text class="t" x="50" y="163">App 3</text></g>
<path class="ln" d="M90 38L130 86"/><path class="ln" d="M90 98h40"/><path class="ln" d="M90 158L130 110"/><polygon class="ah" points="128,92 128,104 136,98"/>
<rect class="bx-info" x="138" y="76" width="140" height="44" rx="6"/>
<rect class="bx" x="146" y="84" width="24" height="28"/><rect class="bx" x="174" y="84" width="24" height="28"/><rect class="bx" x="202" y="84" width="24" height="28"/><rect class="bx" x="230" y="84" width="24" height="28"/>
<text class="t-b" x="208" y="66" text-anchor="middle">Queue</text><text class="t-s" x="208" y="140" text-anchor="middle">80 jobs/s arrive</text>
<path class="ln-ok" d="M278 92L318 56"/><polygon class="ah-ok" points="313,52 320,61 324,50"/>
<path class="ln-ok" d="M278 104L318 140"/><polygon class="ah-ok" points="313,144 320,135 324,146"/>
<rect class="bx-ok" x="326" y="30" width="86" height="36" rx="6"/><rect class="bx-ok" x="326" y="130" width="86" height="36" rx="6"/>
<g text-anchor="middle"><text class="t" x="369" y="53">Worker 1</text><text class="t" x="369" y="153">Worker 2</text><text class="t-s" x="369" y="86">50 jobs/s</text><text class="t-s" x="369" y="186">50 jobs/s</text></g>
</svg><figcaption>The app servers are producers: each sign-up adds a small job to the queue. Two workers take jobs from the front and do the slow work. Together they can finish 100 jobs a second, more than the 80 a second arriving, so the queue stays short.</figcaption></figure>
<p>The request now goes: save the user, add one job to the queue, reply. Adding a job is a quick network call, a millisecond or two, so the user gets their answer almost at once.</p>

<h4>Before and after, on a timeline</h4>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="Timeline: without a queue the user waits for the email and PDF; with a queue they get a reply at once and a worker does the slow part later">
<text class="t-b" x="10" y="22">without a queue</text>
<rect class="bx-info" x="60" y="34" width="16" height="26"/><rect class="bx-warn" x="76" y="34" width="308" height="26"/>
<text class="t-s" x="230" y="52" text-anchor="middle">email + PDF, about 400 ms</text>
<path class="ln-a" d="M60 72h324"/><polygon class="ah-a" points="382,66 382,78 390,72"/>
<text class="t-s t-a" x="225" y="92" text-anchor="middle">user waits about 420 ms</text>
<text class="t-b" x="10" y="124">with a queue</text>
<rect class="bx-info" x="60" y="136" width="16" height="26"/><rect class="bx-ok" x="76" y="136" width="6" height="26"/>
<text class="t-s t-ok" x="92" y="154">reply: about 25 ms</text>
<rect class="bx-warn" x="90" y="176" width="308" height="26"/>
<text class="t-s" x="244" y="194" text-anchor="middle">worker: email + PDF, later</text>
</svg><figcaption>Top: without a queue, the user waits for the save, shown in blue, and the slow email and PDF work, in amber, before getting a reply. Bottom: with a queue, the app saves the user, quickly adds a job, shown in green, and replies straight away. A background worker does the same slow work afterwards, while the user is already using the app.</figcaption></figure>
<p>The total work is the same. What changes is <b>who waits for it</b>. In the simulator, 10% of the 800 requests per second trigger the slow task, and without a queue that pushes p95 latency well over the 150 ms goal. With a queue, the slow part disappears from the request path.</p>

<h4>Keeping up: throughput must beat the arrival rate</h4>
<p>A queue does not make work vanish. It only lets work wait. So you must check that the workers can keep up on average:</p>
<pre class="snip">jobs arriving  = 800 requests/s × 10% = 80 jobs/s
one worker     = 50 jobs/s
workers needed = 80 ÷ 50 = 1.6  →  round up to 2
two workers    = 100 jobs/s, about 80% busy</pre>
<p><b>Throughput</b> is how many jobs your workers finish per second. The <b>arrival rate</b> is how many jobs are added per second. If throughput is higher, the queue drains and stays short. If it is lower, even slightly, the queue grows every second, forever: with one worker, 30 extra jobs pile up each second, over 100,000 an hour, and emails arrive later and later. A short burst above capacity is fine, because the queue absorbs it and workers catch up afterwards. That buffering is one of the queue's biggest benefits.</p>
<div class="mistake"><b>Common mistake</b>Adding a queue with zero workers. Jobs go in and nothing ever takes them out. The simulator warns you when this happens; in real life you notice when customers complain that no emails arrived. Always watch the queue's length: a number that only grows means your workers are not keeping up, or are not running.</div>

<h4>At-least-once delivery and idempotent jobs</h4>
<p>Here is a subtle problem. A worker takes a job, sends the email, and then crashes before telling the queue "done". The queue cannot know the email went out. To be safe, it makes the job visible again after a timeout, and another worker runs it. The user gets two welcome emails.</p>
<p>This is called <b>at-least-once delivery</b>: the queue promises every job will run, but some may run more than once. Most queues work this way, because the alternative, risking jobs that never run, is worse. So the rule is: <b>make every job idempotent</b>. Running it twice must have the same effect as running it once. You met idempotency with HTTP methods; here it applies to jobs.</p>
<p>How, in practice? Record what was done, and check before doing it:</p>
<pre class="snip">job: send welcome email to user 42
if user 42 already has welcome_email_sent:
    skip                      # a repeat delivery: do nothing
else:
    send the email
    mark welcome_email_sent for user 42</pre>
<p>Another common approach is to give each job a unique ID and store the IDs of finished jobs. Email and payment providers often accept such an ID themselves and ignore repeats.</p>

<h4>Retries and the dead-letter queue</h4>
<p>Sometimes a job fails for a passing reason: the email provider is briefly down. The queue <b>retries</b> it later, usually waiting a little longer between each attempt so it does not hammer a struggling service. But some jobs will never succeed, for example an email address that does not exist. Retrying those forever wastes worker time.</p>
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="A job is retried after failing, and after several failures moves to a dead-letter queue">
<rect class="bx-info" x="10" y="60" width="90" height="44" rx="6"/><text class="t-b" x="55" y="87" text-anchor="middle">Queue</text>
<rect class="bx-ok" x="160" y="60" width="90" height="44" rx="6"/><text class="t-b" x="205" y="87" text-anchor="middle">Worker</text>
<rect class="bx-ok" x="320" y="14" width="92" height="40" rx="6"/><text class="t" x="366" y="39" text-anchor="middle">done</text>
<rect class="bx-bad" x="320" y="112" width="92" height="52" rx="6"/><text class="t-b" x="366" y="134" text-anchor="middle">dead-letter</text><text class="t-s" x="366" y="152" text-anchor="middle">for a human</text>
<path class="ln" d="M100 82h52"/><polygon class="ah" points="150,76 150,88 158,82"/>
<path class="ln-ok" d="M250 72L312 40"/><polygon class="ah-ok" points="308,35 313,46 320,36"/><text class="t-s t-ok" x="300" y="28" text-anchor="end">success</text>
<path class="ln-a" d="M250 96L312 132"/><polygon class="ah-a" points="306,135 313,126 320,138"/><text class="t-s t-a" x="304" y="154" text-anchor="end">failed 5 times</text>
<path class="ln-d" d="M175 104v40H55v-32"/><polygon class="ah" points="49,114 61,114 55,106"/><text class="t-s" x="115" y="162" text-anchor="middle">failed: retry later</text>
</svg><figcaption>A worker takes a job from the queue. If it succeeds, the job is done. If it fails, it goes back to the queue to be retried later. After too many failures, say five, it moves to a dead-letter queue, where a person can look at what went wrong.</figcaption></figure>
<p>A <b>dead-letter queue</b> is a separate queue where jobs go after failing too many times. Nothing processes it automatically. Engineers check it, fix the cause, and replay the jobs if needed. It keeps one broken job from blocking or slowing everything else.</p>

<h4>What belongs on a queue, and what does not</h4>
<p>Good candidates are anything the user does not need to see finished right now: sending emails and notifications, resizing uploaded photos, generating reports and PDFs, calling other companies' webhooks. Bad candidates are anything the response depends on. Checking a password at login must happen before you can reply "welcome back" or "wrong password", so it stays in the request.</p>
<div class="try"><b>Try it in your head</b>Jobs arrive at 230 per second, and each worker handles 50 per second. How many workers do you need to keep up? 230 ÷ 50 = 4.6, so round up to 5. And with only 4 workers, what happens to the queue? It grows by 30 jobs every second.</div>

<h4>Recap</h4>
<ul>
<li>Put slow work the user does not need right now on a queue, and reply immediately.</li>
<li>Producers add small jobs; workers take them from the front and do the work in the background.</li>
<li>Worker throughput must beat the arrival rate, or the queue grows forever. Watch the queue length.</li>
<li>Queues usually deliver at least once, so make every job idempotent.</li>
<li>Failed jobs are retried with growing delays, then moved to a dead-letter queue for a human.</li>
</ul>
`);

explain('k5',`
<h4>When the database becomes the bottleneck</h4>
<p>So far you have scaled the app tier by adding servers, which is easy because app servers are stateless: any copy can do any job. The database is different. It holds the <b>state</b>, the actual data, and there is normally only one of it. Caches take a lot of reads off it, but eventually even a well-cached database runs out of capacity.</p>
<p>This lesson covers the two classic ways to spread a database over several machines. <b>Replication</b> keeps full copies of the data on several servers, which helps with reading. <b>Sharding</b> splits the data into pieces stored on different servers, which helps with writing too. The lesson's simulator has two phases, one for each.</p>

<h4>Reads and writes are different jobs</h4>
<p>A <b>read</b> asks for data and changes nothing: show this article, list these comments. A <b>write</b> changes data: insert a new reading, update a balance. The mix of the two decides which tool you need. A news site is <b>read-heavy</b>: in this lesson's first scenario, 97% of requests are reads. A system collecting measurements from sensors is <b>write-heavy</b>: the second scenario is 70% writes.</p>
<p>In the simulator, one database handles about 3,000 reads per second or 1,000 writes per second. Writes are more expensive because the database must update its indexes and save every change safely to disk.</p>

<h4>Replication: copies that share the reading</h4>
<p>With <b>replication</b>, one database is the <b>primary</b> (sometimes called the leader). Every write goes to it. The primary then sends each change to one or more <b>read replicas</b>, which apply the same changes and so hold a full copy of the data. Your app sends writes to the primary and spreads reads across the replicas, and often the primary too.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="Writes go to the primary, which copies changes to two replicas; reads are spread across the replicas">
<rect class="bx-a" x="10" y="84" width="80" height="44" rx="6"/><text class="t-b" x="50" y="111" text-anchor="middle">App</text>
<rect class="bx-a" x="170" y="20" width="110" height="48" rx="6"/><text class="t-b" x="225" y="49" text-anchor="middle">Primary</text>
<rect class="bx-info" x="290" y="100" width="104" height="40" rx="6"/><rect class="bx-info" x="290" y="170" width="104" height="40" rx="6"/>
<text class="t" x="342" y="125" text-anchor="middle">Replica 1</text><text class="t" x="342" y="195" text-anchor="middle">Replica 2</text>
<path class="ln-a" d="M90 96L162 52"/><polygon class="ah-a" points="157,48 163,58 170,47"/><text class="t-s t-a" x="112" y="60">writes</text>
<path class="ln-d" d="M280 44H412V190H402"/><path class="ln-d" d="M412 120H402"/>
<polygon class="ah" points="402,114 402,126 395,120"/><polygon class="ah" points="402,184 402,196 395,190"/>
<text class="t-s" x="340" y="36" text-anchor="middle">copy</text>
<path class="ln-ok" d="M90 112L282 120"/><polygon class="ah-ok" points="281,114 281,126 289,120"/>
<path class="ln-ok" d="M90 122L282 188"/><polygon class="ah-ok" points="279,182 276,194 288,191"/>
<text class="t-s t-ok" x="150" y="168">reads</text>
</svg><figcaption>The app sends every write to the primary. The primary copies each change, along the dashed lines, to replica 1 and replica 2. Reads are spread across the replicas, so adding a replica adds read capacity.</figcaption></figure>
<p>Worked example, phase 1: 2,000 requests per second with 97% reads is 1,940 reads per second. One database can do about 3,000, so it is 65% busy, above the lesson's 50% goal. Add one replica and the reads are shared by two copies with 6,000 reads of capacity: about 32% busy. Goal met.</p>
<p>Replicas bring a bonus: if the primary dies, a replica already holds the data and can be <b>promoted</b> to become the new primary. Managed databases such as Amazon RDS can do this automatically.</p>

<h4>Replication lag</h4>
<p>Copying takes time. Usually it is milliseconds, but under heavy load it can be seconds. That delay is called <b>replication lag</b>, and during it a replica returns slightly old data.</p>
<p>The classic symptom: a user posts a comment, the page reloads, and their own comment is missing, because the write went to the primary but the reload read from a replica that has not caught up. The common fix is called <b>read-your-own-writes</b>: for a short time after a user writes something, send that user's reads to the primary. Data where a few seconds of delay is harmless, such as an article's view count, can always come from replicas.</p>

<h4>Why replicas do not help with writes</h4>
<p>Now phase 2: an IoT system, meaning the "Internet of Things", lots of small devices sending sensor readings. It also receives 2,000 requests per second, but 70% are writes: 1,400 writes per second against a capacity of 1,000. The database is at 140% and failing.</p>
<p>Add replicas and nothing improves. Every write still has to go to the one primary. Worse, each replica must also apply every write, so each copy does the full write workload. Replicas multiply <b>read</b> capacity only.</p>
<div class="mistake"><b>Common mistake</b>Adding replicas to fix a write problem. It is the most natural thing to try and it never works. Before scaling a database, check which kind of load is high: the simulator's notes say "drowning in reads" or "can't keep up with writes". Reads point to caches and replicas; writes point to sharding.</div>

<h4>Sharding: split the data itself</h4>
<p><b>Sharding</b>, also called partitioning, splits the data across several independent databases, called <b>shards</b>. Each shard holds only part of the data and handles only the reads and writes for that part. Three shards means roughly three times the write capacity, because each write goes to just one of them.</p>
<p>How does the app know which shard holds a row? It uses a <b>shard key</b>: a column, such as <code>device_id</code>, whose value decides the shard. A common rule is to <b>hash</b> the key, turning it into a number exactly as a hash map does, and take the remainder when dividing by the number of shards:</p>
<pre class="snip">shard = hash(device_id) % 3      # % means "remainder after dividing"
# hash("sensor-17")  = 1,000,004  → remainder 2 → shard C
# hash("sensor-42")  = 7,331      → remainder 2 → shard C
# hash("sensor-99")  = 52,416     → remainder 0 → shard A</pre>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Sensor readings routed to three shards by hashing the device id">
<rect class="bx" x="10" y="20" width="110" height="34" rx="6"/><rect class="bx" x="10" y="86" width="110" height="34" rx="6"/><rect class="bx" x="10" y="152" width="110" height="34" rx="6"/>
<g text-anchor="middle"><text class="t-m" x="65" y="42">sensor-99</text><text class="t-m" x="65" y="108">sensor-5</text><text class="t-m" x="65" y="174">sensor-17</text></g>
<rect class="bx-a" x="160" y="60" width="90" height="86" rx="8"/><text class="t-b" x="205" y="98" text-anchor="middle">hash</text><text class="t-s" x="205" y="118" text-anchor="middle">% 3</text>
<path class="ln" d="M120 37L152 72"/><path class="ln" d="M120 103h32"/><path class="ln" d="M120 169L152 134"/>
<rect class="bx-ok" x="300" y="20" width="110" height="40" rx="6"/><rect class="bx-ok" x="300" y="84" width="110" height="40" rx="6"/><rect class="bx-ok" x="300" y="148" width="110" height="40" rx="6"/>
<g text-anchor="middle"><text class="t" x="355" y="45">Shard A</text><text class="t" x="355" y="109">Shard B</text><text class="t" x="355" y="173">Shard C</text></g>
<path class="ln-ok" d="M250 80L292 46"/><polygon class="ah-ok" points="287,42 294,52 298,40"/>
<path class="ln-ok" d="M250 104h42"/><polygon class="ah-ok" points="290,98 290,110 298,104"/>
<path class="ln-ok" d="M250 128L292 162"/><polygon class="ah-ok" points="287,166 294,156 298,168"/>
</svg><figcaption>Every reading carries its device ID. The router hashes the ID and takes the remainder after dividing by 3, which picks shard A, B or C. The same device always lands on the same shard, so all of one device's readings live together.</figcaption></figure>
<p>Worked example, phase 2: 1,400 writes per second. Two shards give 2,000 writes of capacity, which is 70% busy, still above the lesson's 60% goal. Three shards give 3,000: about 47% busy. Goal met.</p>

<h4>Choosing a good shard key</h4>
<p>A shard key must do two jobs at once:</p>
<ul>
<li><b>Spread the load evenly</b>, so no shard gets far more traffic than the others. An overloaded shard is called a <b>hot shard</b>, and it limits the whole system.</li>
<li><b>Keep related data together</b>, so common queries need only one shard.</li>
</ul>
<div class="tbl-wrap"><table><tr><th>Shard key for sensor readings</th><th>Even load?</th><th>Related data together?</th></tr>
<tr><td><code>created_at</code> date</td><td>No: every write today hits the same shard</td><td>Yes, for one day</td></tr>
<tr><td>A random number per row</td><td>Yes</td><td>No: one device's readings are scattered everywhere</td></tr>
<tr><td><code>device_id</code></td><td>Yes: thousands of devices hash evenly</td><td>Yes: each device's history is on one shard</td></tr></table></div>
<p>The date key is the trap. It looks tidy, but all of today's writes go to a single shard while the others sit idle, so you have paid for three databases and still have the write capacity of one.</p>

<h4>The price of sharding</h4>
<p>Sharding works, but it makes everything harder. A query that needs data from every shard, such as "average reading across all devices", must ask all of them and combine the answers. Joins between rows on different shards are no longer done by the database; your code has to do them. Transactions across shards are difficult. And adding a fourth shard to a <code>% 3</code> scheme changes the remainder for most keys, so most of the data must move. That is called <b>resharding</b>, and it is painful (techniques such as consistent hashing reduce how much moves).</p>
<div class="tip"><b>Tip</b>The usual order when a database struggles: first add indexes and fix slow queries; then add caching; then read replicas; then a bigger database server (vertical scaling); and only then shard. Many very large companies run for years on one primary with replicas.</div>
<div class="try"><b>Try it in your head</b>A database handles 1,000 writes per second, and you expect 2,500. You add four replicas. Does it help? No: every write still goes to the primary. How many shards would keep each one at or under 50% busy? 2,500 ÷ 500 = 5 shards.</div>

<h4>Recap</h4>
<ul>
<li>Replication: one primary takes all writes and copies them to read replicas, which add read capacity.</li>
<li>Replicas can lag behind, so read your own writes from the primary when freshness matters.</li>
<li>Replicas do not scale writes: every write still goes to the primary, and to every copy.</li>
<li>Sharding splits data across databases by a shard key, so reads and writes both scale.</li>
<li>Pick a key that spreads load evenly and keeps related data together, like <code>device_id</code>; shard only after simpler fixes.</li>
</ul>
`);
