/* sysdesign: "Explained step by step" walkthroughs. */

explain('k1',`
<p>Every app you use is a conversation between your device and computers far away. System design is about keeping that conversation fast and reliable when a hundred times more people join in. It starts with how the pieces talk.</p>

${V.card(1,'Clients and servers','a restaurant for data',`
<figure class="fig"><svg viewBox="0 0 420 165" role="img" aria-label="A customer orders through a waiter; the kitchen cooks and the waiter brings the food back">
${V.ic('person',14,40,64,'ic-a')}${V.ic('person',178,40,64,'ic-info')}${V.ic('server',336,36,72,'ic-ok')}<path class="ln-a" d="M86 60H160"/><polygon class="ah-a" points="158,54 158,66 170,60"/><path class="ln-a" d="M250 60H318"/><polygon class="ah-a" points="316,54 316,66 328,60"/><path class="ln-ok" d="M328 90H260"/><polygon class="ah-ok" points="262,84 262,96 250,90"/><path class="ln-ok" d="M170 90H96"/><polygon class="ah-ok" points="98,84 98,96 86,90"/>
<text class="t-b" x="46" y="132" text-anchor="middle">you</text><text class="t-s" x="46" y="152" text-anchor="middle">client</text>
<text class="t-b" x="210" y="132" text-anchor="middle">waiter</text><text class="t-s" x="210" y="152" text-anchor="middle">HTTP + API</text>
<text class="t-b" x="372" y="132" text-anchor="middle">kitchen</text><text class="t-s" x="372" y="152" text-anchor="middle">server</text>
<text class="t-s" x="128" y="50" text-anchor="middle">order</text><text class="t-s" x="128" y="112" text-anchor="middle">food</text>
</svg><figcaption>You (the client) never walk into the kitchen. You give your order to the waiter, who follows set rules, and the food comes back to your table.</figcaption></figure>
${V.like(`<p>A restaurant. You are the <b>client</b>. The kitchen is the <b>server</b>. The menu and the waiter are the <b>API</b>: a fixed list of things you may ask for and a fixed way of asking. HTTP is the language the waiter speaks.</p>`)}
${V.why(`<p>One powerful computer can serve millions of small devices, and keeps the data in one safe place. Tim Berners-Lee created HTTP in 1989 to 1991 for the first web. Today phones, browsers and other servers all speak it.</p>`)}
${V.anat([[1,'GET'],' ',[2,'/users/42'],' ',[3,'HTTP/1.1'],'\n',[4,'200 OK']],[
 '<b>Method.</b> What you want to do: GET reads, POST creates, PUT replaces, PATCH changes part, DELETE removes.',
 '<b>Path.</b> Which thing you mean: user number 42.',
 '<b>Version</b> of HTTP.',
 '<b>Status code</b> in the reply: 2xx worked, 4xx you asked wrongly, 5xx the server broke.'])}
${V.steps([
 ['You open a profile page. The browser, the <b>client</b>, sends an HTTP request: "GET me user 42".',`<svg viewBox="0 0 420 180" role="img" aria-label="Client sends GET /users/42">
${V.ic('laptop',20,30,60,'ic-a')}${V.ic('server',180,30,60,'')}${V.ic('db',340,30,60,'')}<text class="t-b" x="50" y="114" text-anchor="middle">client</text><text class="t-b" x="210" y="114" text-anchor="middle">server</text><text class="t-b" x="370" y="114" text-anchor="middle">database</text>
<path class="ln-a" d="M86 60H166"/><polygon class="ah-a" points="164,54 164,66 176,60"/>
<rect class="bx-dark" x="10" y="128" width="400" height="44" rx="8"/><text class="t-term" x="24" y="156">GET /users/42</text>
</svg>`],
 ['The <b>server</b> runs your code for that route. It needs the data, so it asks the database.',`<svg viewBox="0 0 420 180" role="img" aria-label="Server queries the database">
${V.ic('laptop',20,30,60,'')}${V.ic('server',180,30,60,'ic-a')}${V.ic('db',340,30,60,'')}<text class="t-b" x="50" y="114" text-anchor="middle">client</text><text class="t-b" x="210" y="114" text-anchor="middle">server</text><text class="t-b" x="370" y="114" text-anchor="middle">database</text>
<path class="ln-a" d="M246 60H326"/><polygon class="ah-a" points="324,54 324,66 336,60"/>
<rect class="bx-dark" x="10" y="128" width="400" height="44" rx="8"/><text class="t-term" x="24" y="156">SELECT * FROM users WHERE id = 42</text>
</svg>`],
 ['The database finds the row and hands it back to the server.',`<svg viewBox="0 0 420 180" role="img" aria-label="Database returns the row">
${V.ic('laptop',20,30,60,'')}${V.ic('server',180,30,60,'')}${V.ic('db',340,30,60,'ic-a')}<text class="t-b" x="50" y="114" text-anchor="middle">client</text><text class="t-b" x="210" y="114" text-anchor="middle">server</text><text class="t-b" x="370" y="114" text-anchor="middle">database</text>
<path class="ln-ok" d="M336 60H256"/><polygon class="ah-ok" points="258,54 258,66 246,60"/>
<rect class="bx-dark" x="10" y="128" width="400" height="44" rx="8"/><text class="t-term" x="24" y="156">{ id: 42, name: "Ada" }</text>
</svg>`],
 ['The server replies with a <b>status code</b> and JSON. 200 means OK. The browser draws the page. The whole trip often takes under 100 ms.',`<svg viewBox="0 0 420 180" role="img" aria-label="Server responds 200 OK with JSON">
${V.ic('laptop',20,30,60,'ic-a')}${V.ic('server',180,30,60,'')}${V.ic('db',340,30,60,'')}<text class="t-b" x="50" y="114" text-anchor="middle">client</text><text class="t-b" x="210" y="114" text-anchor="middle">server</text><text class="t-b" x="370" y="114" text-anchor="middle">database</text>
<path class="ln-ok" d="M176 60H96"/><polygon class="ah-ok" points="98,54 98,66 86,60"/>
<rect class="bx-dark" x="10" y="128" width="400" height="44" rx="8"/><text class="t-term" x="24" y="156">{"id":42,"name":"Ada"}</text><text class="t-b t-ok" x="398" y="156" text-anchor="end">200 OK</text>
</svg>`]])}
${V.rules(V.rh('Status codes to know'),
 V.ok('200 OK','It worked, here is the data'),V.ok('201 Created','A POST made something new'),
 V.no('400 Bad Request','Your request is malformed'),V.no('401 / 403','Not logged in / not allowed'),
 V.no('404 Not Found','No such thing'),V.no('500','The server crashed: its fault, not yours'))}
${V.hook(`Client orders, server cooks, HTTP carries the plates.`)}
`)}

${V.card(2,'REST and GraphQL','two ways to design the menu',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="REST needs three requests to three URLs; GraphQL sends one query asking for exactly the fields needed">
<rect class="bx" x="8" y="10" width="196" height="160" rx="10"/><text class="t-b" x="106" y="34" text-anchor="middle">REST: 3 trips</text>
<rect class="bx-a" x="13" y="48" width="186" height="30" rx="6"/><text class="t-m" x="106" y="68" text-anchor="middle" style="font-size:14px">GET /users/42</text>
<rect class="bx-a" x="13" y="86" width="186" height="30" rx="6"/><text class="t-m" x="106" y="106" text-anchor="middle" style="font-size:14px">GET /users/42/posts</text>
<rect class="bx-a" x="13" y="124" width="186" height="30" rx="6"/><text class="t-m" x="106" y="144" text-anchor="middle" style="font-size:14px">GET /posts/9/comments</text>
<rect class="bx" x="216" y="10" width="196" height="160" rx="10"/><text class="t-b" x="314" y="34" text-anchor="middle">GraphQL: 1 trip</text>
<rect class="bx-info" x="228" y="48" width="172" height="106" rx="6"/>
<text class="t-m" x="240" y="70" style="font-size:14px">user(id: 42) {</text><text class="t-m" x="254" y="92" style="font-size:14px">name</text><text class="t-m" x="254" y="114" style="font-size:14px">posts { title }</text><text class="t-m" x="240" y="136" style="font-size:14px">}</text>
</svg><figcaption>REST gives every kind of thing its own URL. GraphQL has one endpoint, and the client lists exactly the fields it wants.</figcaption></figure>
${V.like(`<p>REST is a food court: one counter for burgers, one for drinks, one for pudding, so you queue three times. GraphQL is a single waiter with an order form: you tick exactly what you want and it all arrives on one tray.</p>`)}
${V.why(`<p>REST (2000) uses plain URLs and HTTP methods, so browsers and CDNs can cache responses easily. Facebook built GraphQL (2012, public in 2015) because its mobile app needed bits of many things on one screen, and several REST trips over a slow phone network were too slow.</p>`)}
${V.anat([[1,'GET'],' ',[2,'/users'],[3,'/42'],[4,'/posts'],[5,'?limit=20']],[
 '<b>Method</b> is the verb.',
 '<b>Collection.</b> A plural noun.',
 '<b>One item</b> by its id.',
 '<b>Things that belong</b> to that item.',
 '<b>Query string</b> for options such as page size or filters.'])}
${V.rules(V.rh('REST conventions'),
 V.ok('POST /users','The method is the verb'),V.no('GET /createUser','Never put the verb in the URL'),
 V.ok('/users/42','Plural nouns, ids in the path'),V.ok('POST /graphql','GraphQL: one endpoint for everything'))}
${V.hook(`REST: many doors, cache-friendly. GraphQL: one door, ask for exactly what you need.`)}
`)}

${V.card(3,'Stateless and idempotent','any waiter, any retry',`
${V.like(`<p>A <b>stateless</b> server is a waiter with no memory: your order ticket carries your table number, so any waiter can serve you. An <b>idempotent</b> action is a lift button: pressing it five times still calls the lift once.</p>`)}
${V.why(`<p>If server A remembers your login in its own memory, you are stuck with server A. Keep sessions in a shared store such as Redis or the database, and you can add or remove servers freely. Networks also drop replies, so clients retry. Retries must be safe, or a payment happens twice.</p>`)}
${V.steps([
 ['The app sends <code>POST /payments</code> for £20 with a unique <b>Idempotency-Key</b> header, key-7f3.',`<svg viewBox="0 0 420 175" role="img" aria-label="First request with key 7f3">
${V.ic('phone',14,24,56,'ic-a')}${V.ic('server',350,24,56,'')}<text class="t-b" x="42" y="100" text-anchor="middle">app</text><text class="t-b" x="378" y="100" text-anchor="middle">payments</text>
<path class="ln-a" d="M80 50H334"/><polygon class="ah-a" points="332,44 332,56 344,50"/><text class="t-m" x="212" y="38" text-anchor="middle">POST £20, key-7f3</text><text class="t-b t-ok" x="210" y="160" text-anchor="middle">sending...</text>
</svg>`],
 ['The server charges the card and saves "key-7f3 = paid". But the reply is lost, and the app times out.',`<svg viewBox="0 0 420 175" role="img" aria-label="Charged, but the reply is lost">
${V.ic('phone',14,24,56,'ic-a')}${V.ic('server',350,24,56,'')}<text class="t-b" x="42" y="100" text-anchor="middle">app</text><text class="t-b" x="378" y="100" text-anchor="middle">payments</text>
<path class="ln" d="M344 50H250"/><polygon class="ah" points="252,44 252,56 240,50"/><path class="ln-x" d="M200 38 226 62M226 38 200 62"/><text class="t-m" x="212" y="88" text-anchor="middle">reply lost</text><text class="t-b t-bad" x="210" y="160" text-anchor="middle">user sees an error</text>
</svg>`],
 ['The app retries with the <b>same key</b>. The server looks up key-7f3, sees it was already paid, and does not charge again.',`<svg viewBox="0 0 420 175" role="img" aria-label="Retry with the same key">
${V.ic('phone',14,24,56,'ic-a')}${V.ic('server',350,24,56,'')}<text class="t-b" x="42" y="100" text-anchor="middle">app</text><text class="t-b" x="378" y="100" text-anchor="middle">payments</text>
<path class="ln-a" d="M80 50H334"/><polygon class="ah-a" points="332,44 332,56 344,50"/><text class="t-m" x="212" y="38" text-anchor="middle">POST £20, key-7f3</text><text class="t-m t-a" x="212" y="88" text-anchor="middle">seen key-7f3!</text><text class="t-b t-ok" x="210" y="160" text-anchor="middle">no second charge</text>
</svg>`],
 ['It returns the <b>saved result</b> of the first request. Charged once, however many retries.',`<svg viewBox="0 0 420 175" role="img" aria-label="Saved result returned">
${V.ic('phone',14,24,56,'ic-a')}${V.ic('server',350,24,56,'')}<text class="t-b" x="42" y="100" text-anchor="middle">app</text><text class="t-b" x="378" y="100" text-anchor="middle">payments</text>
<path class="ln-ok" d="M344 50H90"/><polygon class="ah-ok" points="92,44 92,56 80,50"/><text class="t-m" x="212" y="38" text-anchor="middle">200 paid (saved)</text><text class="t-b t-ok" x="210" y="160" text-anchor="middle">charged exactly once</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('GET, PUT, DELETE','Idempotent: doing it twice has the same effect as once'),V.no('POST','Usually not: two POSTs make two records'),
 V.ok('Idempotency-Key header','A unique id per action makes POST retries safe'),V.no('sessions in server memory','The next request may land on a different server'))}
${V.hook(`Same request twice, same result once.`)}
`)}

${V.card(4,'Pagination and latency','bookmarks and distances',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Latency: memory 100 nanoseconds, SSD 100 microseconds, same data centre half a millisecond, another continent 150 milliseconds">
<text class="t-s" x="250" y="22" text-anchor="end">real time</text><text class="t-s" x="400" y="22" text-anchor="end">if memory took 1 s</text>
<rect class="bx-ok" x="8" y="34" width="404" height="34" rx="6"/><text class="t" x="20" y="57">memory read</text><text class="t-m" x="250" y="57" text-anchor="end">100 ns</text><text class="t-b" x="400" y="57" text-anchor="end">1 second</text>
<rect class="bx-ok" x="8" y="74" width="404" height="34" rx="6"/><text class="t" x="20" y="97">SSD read</text><text class="t-m" x="250" y="97" text-anchor="end">100 µs</text><text class="t-b" x="400" y="97" text-anchor="end">17 minutes</text>
<rect class="bx-warn" x="8" y="114" width="404" height="34" rx="6"/><text class="t" x="20" y="137">same data centre</text><text class="t-m" x="250" y="137" text-anchor="end">0.5 ms</text><text class="t-b" x="400" y="137" text-anchor="end">1.4 hours</text>
<rect class="bx-bad" x="8" y="154" width="404" height="34" rx="6"/><text class="t" x="20" y="177">other continent</text><text class="t-m" x="250" y="177" text-anchor="end">150 ms</text><text class="t-b" x="400" y="177" text-anchor="end">17 days</text>

</svg><figcaption>Rough latencies. Scale them so a memory read takes one second and a trip across the world takes over two weeks. Network trips are the expensive part.</figcaption></figure>
${V.like(`<p>Reading page 5,000 of a huge book. <b>Offset</b> pagination counts every page from the start each time. <b>Cursor</b> pagination is a bookmark: "carry on after this one". The bookmark is just as fast on page 5,000 as on page 2, and new pages added at the front do not shuffle your place.</p>`)}
${V.anat([[1,'GET /posts'],[2,'?limit=20'],[3,'&amp;after=abc123']],[
 '<b>The list</b> you want.',
 '<b>Page size.</b> Never return everything at once.',
 '<b>Cursor.</b> The id of the last item you saw. The server returns the next 20 after it.'])}
${V.rules(V.rh('Rules'),
 V.no('OFFSET 100000','The database still walks past 100,000 rows'),V.ok('WHERE id &gt; :after LIMIT 20','A cursor jumps straight there with an index'),
 V.ok('cache in memory','Memory is about a thousand times faster than an SSD'),V.ok('servers near users','A CDN avoids the 150 ms trip across the world'))}
${V.hook(`Memory is a whisper, disk is a walk, the network is a flight.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which status code means the server crashed? <i>500.</i> 2. Is <code>DELETE /posts/9</code> idempotent? <i>Yes: deleting it twice still leaves it deleted.</i> 3. A feed gets new posts every second. Offset or cursor? <i>Cursor.</i></div>
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

explain('k6',`
<h4>What a design interview is really testing</h4>
<p>"Design a service like bit.ly" is one of the most common system design interview questions. You will not write code. Instead, for about 45 minutes, you talk through how you would build it, drawing boxes and arrows as you go. There is no single right answer. The interviewer is watching <b>how you think</b>: do you ask before assuming, do you back your choices with numbers, and can you explain the trade-offs?</p>
<p>This lesson walks through the whole design using everything from the track: APIs, stateless servers, load balancers, caches and replicas. Then you build the architecture in the simulator.</p>

<h4>A structure to follow</h4>
<p>A clear structure keeps you calm and shows the interviewer you are organised. Six steps:</p>
<ol>
<li><b>Clarify</b> the requirements and the scale.</li>
<li><b>Estimate</b> the load and storage with quick rough maths.</li>
<li><b>Sketch the API</b>: the requests the system answers.</li>
<li><b>Design the data model</b>: what you store.</li>
<li><b>Draw the high-level architecture.</b></li>
<li><b>Deep dive</b> into the hard parts and the trade-offs.</li>
</ol>
<p>Say each step out loud as you start it, so the interviewer can follow along and steer you.</p>

<h4>Step 1: clarify</h4>
<p>A URL shortener takes a long link and returns a short one, like <code>sho.rt/4c92</code>. Anyone who opens the short link is <b>redirected</b> to the long one. Before designing, ask questions such as:</p>
<ul>
<li>Can users choose their own custom codes? Do links expire?</li>
<li>Do we need click analytics, meaning counting who clicked and when?</li>
<li>How many new links per month, and how many clicks?</li>
</ul>
<p>Say the interviewer answers: about 100 million new links a month, analytics wanted, and clicks outnumber new links about 100 to 1. Already you know the most important fact: this system is extremely <b>read-heavy</b>. Almost all traffic is redirects.</p>

<h4>Step 2: estimate with napkin maths</h4>
<p><b>Napkin maths</b> means rough calculations with rounded numbers, the kind you could do on a napkin. The goal is the right order of magnitude, not precision. One handy fact: a month has about 2.5 million seconds (30 days × 86,400 seconds).</p>
<pre class="snip">new links:  100,000,000 ÷ 2,500,000 s  ≈ 40 per second
redirects:  40 × 100                   ≈ 4,000 per second
storage:    100,000,000 × 500 bytes    = 50,000,000,000 bytes
                                       ≈ 50 GB per month</pre>
<p>Read that last line slowly. 500 bytes is a generous guess for one row (the code, the long URL, a date and an owner). 10⁸ rows × 500 bytes is 5 × 10¹⁰ bytes, which is 50 GB. A single database server holds that comfortably; even several years of links fits on one large server. So storage is not the problem. Handling thousands of redirects a second, quickly, is. The 4,000 figure is an average, and real traffic has peaks above it, which is why you plan with headroom.</p>

<h4>Steps 3 and 4: API and data model</h4>
<p>Two requests do almost all the work:</p>
<pre class="snip">POST /links   body: {"url": "https://example.com/very/long"}
              → 201 Created  {"code": "4c92"}

GET  /4c92    → 302 Found
              Location: https://example.com/very/long</pre>
<p>The second one is the redirect. The <code>Location</code> header tells the browser where to go next, and it follows automatically. The data model is one table, with the short code as its <b>primary key</b> (the unique identifier, indexed for instant lookups):</p>
<pre class="snip">links(code PRIMARY KEY, url, created_at, owner_id)</pre>

<h4>Step 5: the architecture</h4>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="Users, load balancer, stateless app servers, a cache and a database with a replica">
<rect class="bx-info" x="8" y="88" width="68" height="44" rx="6"/><text class="t-b" x="42" y="115" text-anchor="middle">Users</text>
<rect class="bx-a" x="96" y="80" width="70" height="60" rx="6"/><text class="t-b" x="131" y="106" text-anchor="middle">Load</text><text class="t-s" x="131" y="124" text-anchor="middle">balancer</text>
<rect class="bx" x="194" y="64" width="80" height="44" rx="6"/><rect class="bx" x="190" y="76" width="80" height="44" rx="6"/><rect class="bx" x="186" y="88" width="80" height="44" rx="6"/>
<text class="t-b" x="226" y="108" text-anchor="middle">App</text><text class="t-s" x="226" y="125" text-anchor="middle">stateless</text>
<rect class="bx-ok" x="300" y="14" width="112" height="44" rx="6"/><text class="t-b" x="356" y="34" text-anchor="middle">Cache</text><text class="t-s" x="356" y="50" text-anchor="middle">code → url</text>
<rect class="bx-info" x="300" y="100" width="112" height="40" rx="6"/><text class="t-b" x="356" y="125" text-anchor="middle">Database</text>
<rect class="bx" x="300" y="168" width="112" height="36" rx="6"/><text class="t" x="356" y="191" text-anchor="middle">Replica</text>
<path class="ln" d="M76 110h12"/><polygon class="ah" points="86,104 86,116 94,110"/>
<path class="ln" d="M166 110h12"/><polygon class="ah" points="176,104 176,116 184,110"/>
<path class="ln-ok" d="M270 80L294 52"/><polygon class="ah-ok" points="289,49 297,57 300,45"/><text class="t-s t-ok" x="250" y="40" text-anchor="middle">1 look up</text>
<path class="ln" d="M266 118h26"/><polygon class="ah" points="290,112 290,124 298,118"/><text class="t-s" x="250" y="160" text-anchor="middle">2 on a miss</text>
<path class="ln-d" d="M356 140v20"/><polygon class="ah" points="350,158 362,158 356,166"/>
</svg><figcaption>Users reach a load balancer, which spreads requests over several stateless app servers. For a redirect, an app server first looks the code up in the cache. Only on a miss does it ask the database, which is copied to a replica for safety and extra read capacity.</figcaption></figure>
<p>Walk the redirect path out loud: the request reaches the load balancer, which picks an app server. The app looks up the code in the cache. On a hit, it replies with the redirect at once. On a miss, it reads the database, stores the answer in the cache, then replies. Creating a link goes the other way: the app generates a code, writes the row to the database, and returns the code.</p>
<p>Why does the cache matter so much here? Links never change once created, so cached entries never go stale, and popular links are clicked over and over. In the lesson's scenario, 95% of lookups hit the cache, so out of about 3,000 reads per second only around 150 reach the database.</p>

<h4>Step 6, deep dive: generating short codes</h4>
<p>Each code must be short and unique. The clean approach is to give every link a unique, increasing number (the database can generate one, as an auto-incrementing ID) and write that number in <b>base62</b>.</p>
<p>You know base 10: ten digits, 0 to 9. Base62 uses 62 "digits": <code>0-9</code>, then <code>a-z</code> for 10 to 35, then <code>A-Z</code> for 36 to 61. Converting works like converting to any base: divide by 62 repeatedly and keep the remainders. Take the ID 1,000,000:</p>
<div class="tbl-wrap"><table><tr><th>Divide</th><th>Result</th><th>Remainder</th><th>Character</th></tr>
<tr><td>1,000,000 ÷ 62</td><td>16,129</td><td>2</td><td>2</td></tr>
<tr><td>16,129 ÷ 62</td><td>260</td><td>9</td><td>9</td></tr>
<tr><td>260 ÷ 62</td><td>4</td><td>12</td><td>c</td></tr>
<tr><td>4 ÷ 62</td><td>0</td><td>4</td><td>4</td></tr></table></div>
<p>Read the characters from the bottom up: <code>4c92</code>. A million links need only four characters. Seven characters give 62⁷, about 3.5 trillion codes, which is enough for this service practically forever.</p>
<p>The alternative is a random 7-character code, checking the database to make sure it is not already taken. Random codes cannot be guessed in sequence, which some products prefer, at the cost of that extra check.</p>
<div class="mistake"><b>Common mistake</b>Using the first few characters of a hash of the URL, such as MD5, as the code. Three characters give only 62³, about 238,000 combinations, so with millions of links, different URLs collide constantly and one link silently overwrites another. Hashes are only safe as codes if you keep them long and still check for collisions.</div>

<h4>Deep dive: 301 or 302?</h4>
<p>Both status codes redirect, but they tell the browser different things. <b>301 Moved Permanently</b> says "this will always point there". Browsers remember it and, next time, go straight to the long URL without asking you. <b>302 Found</b> says "for now, go there", so the browser asks you every time.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="With 302 every click passes through the shortener; with 301 later clicks skip it">
<text class="t-b" x="10" y="22">302: every click</text>
<rect class="bx-info" x="10" y="34" width="90" height="36" rx="6"/><rect class="bx-a" x="165" y="34" width="90" height="36" rx="6"/><rect class="bx-ok" x="320" y="34" width="90" height="36" rx="6"/>
<g text-anchor="middle"><text class="t" x="55" y="57">Browser</text><text class="t" x="210" y="57">sho.rt</text><text class="t" x="365" y="57">Target</text></g>
<path class="ln-a" d="M100 52h57"/><polygon class="ah-a" points="155,46 155,58 163,52"/><path class="ln-ok" d="M255 52h57"/><polygon class="ah-ok" points="310,46 310,58 318,52"/>
<text class="t-s t-ok" x="210" y="90" text-anchor="middle">you count every click</text>
<line class="ln-d" x1="10" y1="104" x2="410" y2="104"/>
<text class="t-b" x="10" y="128">301: later clicks</text>
<rect class="bx-info" x="10" y="150" width="90" height="36" rx="6"/><rect class="bx" x="165" y="150" width="90" height="36" rx="6"/><rect class="bx-ok" x="320" y="150" width="90" height="36" rx="6"/>
<g text-anchor="middle"><text class="t" x="55" y="173">Browser</text><text class="t-s" x="210" y="173">never asked</text><text class="t" x="365" y="173">Target</text></g>
<path class="ln-ok" d="M100 160Q210 120 312 160"/><polygon class="ah-ok" points="306,152 310,164 318,162"/>
</svg><figcaption>Top: with a 302 redirect, every click goes from the browser to the shortener and then on to the target, so every click can be counted. Bottom: after a 301, the browser remembers the target and goes straight there on later clicks. The shortener never sees them, so analytics miss them.</figcaption></figure>
<p>Since this design needs click analytics, choose <b>302</b>. The trade-off, said out loud: 301 would cut your traffic, because browsers stop asking, but you would lose visibility of repeat clicks. Naming a trade-off like this is exactly what interviewers listen for.</p>

<h4>Building it in the simulator</h4>
<p>The scenario: 3,000 redirects per second, 99% reads, and a goal of no errors, p95 under 100 ms, and at most $700 a month. Use the formula from the scaling lesson: 3,000 ÷ 400 ÷ 0.75 = 10 app servers behind a load balancer, plus a cache. Then check the results: the 100 ms goal is strict, so if p95 is still too high, add a server or two and watch the cost stay under budget. With a 95% hit rate, the database load barely moves, which answers the last question in the tasks: the cache is the single biggest win.</p>
<div class="try"><b>Try it in your head</b>What is the ID 125 in base62? 125 ÷ 62 is 2 remainder 1, and 2 ÷ 62 is 0 remainder 2. Reading bottom up: <code>21</code>. And if storage were 1 billion links at 500 bytes each? 10⁹ × 500 = 5 × 10¹¹ bytes, about 500 GB.</div>

<h4>Recap</h4>
<ul>
<li>Follow the steps out loud: clarify, estimate, API, data model, architecture, deep dive.</li>
<li>Napkin maths sets priorities: about 40 writes and 4,000 reads a second, and 50 GB a month, so reads are the challenge.</li>
<li>Read-heavy plus links that never change means caching the code-to-URL lookup is the biggest win.</li>
<li>Generate codes by base62-encoding a unique ID; 7 characters give about 3.5 trillion codes.</li>
<li>Use 302 when you need analytics, 301 when you don't, and always say the trade-off out loud.</li>
</ul>
`);
