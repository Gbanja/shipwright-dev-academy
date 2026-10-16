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
<p>Your app is featured on the news and traffic jumps from a trickle to 1,500 requests a second. One server can handle about 400. This lesson is how real sites survive that moment.</p>

${V.card(1,'Vertical or horizontal','a bigger oven or more chefs',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Vertical scaling: one huge server. Horizontal scaling: five smaller servers">
<rect class="bx" x="8" y="8" width="196" height="186" rx="10"/><text class="t-b" x="106" y="32" text-anchor="middle">Vertical: bigger</text>
${V.ic('server',56,46,100,'ic-warn')}<text class="t" x="106" y="168" text-anchor="middle">1 huge machine</text><text class="t-s" x="106" y="186" text-anchor="middle">has a size limit, can still die</text>
<rect class="bx" x="216" y="8" width="196" height="186" rx="10"/><text class="t-b" x="314" y="32" text-anchor="middle">Horizontal: more</text>
${V.ic('server',234,48,46,'ic-ok')}${V.ic('server',290,48,46,'ic-ok')}${V.ic('server',346,48,46,'ic-ok')}${V.ic('server',262,100,46,'ic-ok')}${V.ic('server',318,100,46,'ic-ok')}
<text class="t" x="314" y="168" text-anchor="middle">many small machines</text><text class="t-s" x="314" y="186" text-anchor="middle">add more, survive a failure</text>
</svg><figcaption>Vertical scaling buys a bigger machine. Horizontal scaling adds more machines that share the work.</figcaption></figure>
${V.like(`<p>A busy café. You could buy one enormous oven (vertical), but there is a biggest oven money can buy, and if it breaks nobody eats. Or you hire more chefs with normal ovens (horizontal): add chefs as you get busier, and if one is ill the others keep cooking.</p>`)}
${V.why(`<p>A <b>single point of failure</b> is one part whose failure stops everything. One server, however big, is exactly that. Horizontal scaling removes it, but now something has to decide which server gets each request. That is the load balancer.</p>`)}
${V.hook(`Bigger has a ceiling. More has a spare.`)}
`)}

${V.card(2,'Load balancers','the host who seats the guests',`
${V.like(`<p>The host at a restaurant door. Guests never pick a waiter; the host sends each party to whichever section has room. If a waiter goes home ill, the host simply stops seating people in that section.</p>`)}
${V.why(`<p>Users all type the same address. The load balancer (nginx, HAProxy, or a cloud one such as AWS Elastic Load Balancing) owns that address, spreads requests over the servers behind it, and checks their health so it never sends anyone to a dead one. It also lets you update servers one at a time with no downtime.</p>`)}
${V.steps([
 ['Request 1 arrives. The load balancer sends it to <b>server A</b>.',`<svg viewBox="0 0 420 200" role="img" aria-label="Request 1 to A">
${V.ic('people',8,60,60,'ic-a')}<text class="t-b" x="38" y="140" text-anchor="middle">users</text><rect class="bx-info" x="110" y="64" width="90" height="52" rx="10"/><text class="t-b" x="155" y="88" text-anchor="middle">load</text><text class="t-b" x="155" y="106" text-anchor="middle">balancer</text><path class="ln" d="M70 90H98"/><polygon class="ah" points="96,84 96,96 108,90"/><rect class="bx-hl" x="250" y="14" width="162" height="44" rx="8"/>${V.ic('server',258,20,32,'ic-a')}<text class="t-b" x="296" y="42">server A</text><text class="t-m t-a" x="400" y="42" text-anchor="end">1</text><path class="ln-a" d="M202 90L246 36"/><rect class="bx" x="250" y="70" width="162" height="44" rx="8"/>${V.ic('server',258,76,32,'')}<text class="t-b" x="296" y="98">server B</text><path class="ln-d" d="M202 90L246 92"/><rect class="bx" x="250" y="126" width="162" height="44" rx="8"/>${V.ic('server',258,132,32,'')}<text class="t-b" x="296" y="154">server C</text><path class="ln-d" d="M202 90L246 148"/><text class="t" x="10" y="190">round robin: A, B, C, A...</text>
</svg>`],
 ['Requests 2 and 3 go to <b>B</b> and <b>C</b>. Taking turns like this is called round robin.',`<svg viewBox="0 0 420 200" role="img" aria-label="Requests 2 and 3 to B and C">
${V.ic('people',8,60,60,'ic-a')}<text class="t-b" x="38" y="140" text-anchor="middle">users</text><rect class="bx-info" x="110" y="64" width="90" height="52" rx="10"/><text class="t-b" x="155" y="88" text-anchor="middle">load</text><text class="t-b" x="155" y="106" text-anchor="middle">balancer</text><path class="ln" d="M70 90H98"/><polygon class="ah" points="96,84 96,96 108,90"/><rect class="bx" x="250" y="14" width="162" height="44" rx="8"/>${V.ic('server',258,20,32,'')}<text class="t-b" x="296" y="42">server A</text><text class="t-m t-a" x="400" y="42" text-anchor="end">1</text><path class="ln-d" d="M202 90L246 36"/><rect class="bx" x="250" y="70" width="162" height="44" rx="8"/>${V.ic('server',258,76,32,'')}<text class="t-b" x="296" y="98">server B</text><text class="t-m t-a" x="400" y="98" text-anchor="end">2</text><path class="ln-d" d="M202 90L246 92"/><rect class="bx-hl" x="250" y="126" width="162" height="44" rx="8"/>${V.ic('server',258,132,32,'ic-a')}<text class="t-b" x="296" y="154">server C</text><text class="t-m t-a" x="400" y="154" text-anchor="end">3</text><path class="ln-a" d="M202 90L246 148"/><text class="t" x="10" y="190">each server gets a fair share</text>
</svg>`],
 ['Every few seconds the balancer runs a <b>health check</b> on each server. Server B stops answering, so it is taken out of the rotation.',`<svg viewBox="0 0 420 200" role="img" aria-label="Server B fails its health check">
${V.ic('people',8,60,60,'ic-a')}<text class="t-b" x="38" y="140" text-anchor="middle">users</text><rect class="bx-info" x="110" y="64" width="90" height="52" rx="10"/><text class="t-b" x="155" y="88" text-anchor="middle">load</text><text class="t-b" x="155" y="106" text-anchor="middle">balancer</text><path class="ln" d="M70 90H98"/><polygon class="ah" points="96,84 96,96 108,90"/><rect class="bx" x="250" y="14" width="162" height="44" rx="8"/>${V.ic('server',258,20,32,'')}<text class="t-b" x="296" y="42">server A</text><text class="t-m t-a" x="400" y="42" text-anchor="end">1</text><path class="ln-d" d="M202 90L246 36"/><rect class="bx-bad" x="250" y="70" width="162" height="44" rx="8"/>${V.ic('server',258,76,32,'ic-bad')}<text class="t-b" x="296" y="98">server B</text><path class="ln-x" d="M388 78 404 106M404 78 388 106"/><path class="ln-d" d="M202 90L246 92"/><rect class="bx" x="250" y="126" width="162" height="44" rx="8"/>${V.ic('server',258,132,32,'')}<text class="t-b" x="296" y="154">server C</text><text class="t-m t-a" x="400" y="154" text-anchor="end">3</text><path class="ln-d" d="M202 90L246 148"/><text class="t" x="10" y="190">health check: B failed</text>
</svg>`],
 ['Requests 4 and 5 go to <b>A</b> and <b>C</b>. Users notice nothing. With one server, this failure would have taken the whole site down.',`<svg viewBox="0 0 420 200" role="img" aria-label="Requests 4 and 5 skip B">
${V.ic('people',8,60,60,'ic-a')}<text class="t-b" x="38" y="140" text-anchor="middle">users</text><rect class="bx-info" x="110" y="64" width="90" height="52" rx="10"/><text class="t-b" x="155" y="88" text-anchor="middle">load</text><text class="t-b" x="155" y="106" text-anchor="middle">balancer</text><path class="ln" d="M70 90H98"/><polygon class="ah" points="96,84 96,96 108,90"/><rect class="bx-hl" x="250" y="14" width="162" height="44" rx="8"/>${V.ic('server',258,20,32,'ic-a')}<text class="t-b" x="296" y="42">server A</text><text class="t-m t-a" x="400" y="42" text-anchor="end">1 4</text><path class="ln-a" d="M202 90L246 36"/><rect class="bx-bad" x="250" y="70" width="162" height="44" rx="8"/>${V.ic('server',258,76,32,'ic-bad')}<text class="t-b" x="296" y="98">server B</text><path class="ln-x" d="M388 78 404 106M404 78 388 106"/><path class="ln-d" d="M202 90L246 92"/><rect class="bx" x="250" y="126" width="162" height="44" rx="8"/>${V.ic('server',258,132,32,'')}<text class="t-b" x="296" y="154">server C</text><text class="t-m t-a" x="400" y="154" text-anchor="end">3 5</text><path class="ln-d" d="M202 90L246 148"/><text class="t" x="10" y="190">no single point of failure</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('at least 2 servers','One server behind a balancer is still a single point of failure'),V.ok('health checks','e.g. GET /health every few seconds'),
 V.ok('round robin or least connections','Common ways to choose the next server'),V.no('one balancer, no backup','Managed cloud balancers are built to be redundant for you'))}
${V.hook(`The host seats guests and skips the sick waiter.`)}
`)}

${V.card(3,'Headroom','never run at 100%',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Waiting time stays low until about 75 percent busy, then rises steeply towards 100 percent">
<path class="ln" d="M40 10V170H404"/><path class="ln-a" style="stroke-width:3" d="M40 160C200 156 280 140 320 110S360 30 372 12"/><path class="ln-d" d="M310 170V118"/><text class="t-b t-ok" x="306" y="188" text-anchor="end">75%: safe peak</text><text class="t-b t-bad" x="404" y="188" text-anchor="end">100%</text><text class="t-s" x="48" y="22">waiting time</text><text class="t" x="60" y="140">queues stay short</text><text class="t-b t-bad" x="232" y="40">queues explode</text>
</svg><figcaption>As a server gets close to 100% busy, requests queue up and waiting time shoots up. Teams plan for about 70 to 80% at the busiest moment.</figcaption></figure>
${V.like(`<p>Supermarket tills. If tills are busy half the time, you walk straight up. If they are busy 99% of the time, any small rush creates a long queue that takes ages to clear. That queue is what users feel as a slow website.</p>`)}
${V.anat([[1,'1500 rps'],' ÷ ',[2,'400 rps per server'],' ÷ ',[3,'0.75'],' ≈ ',[4,'5 servers']],[
 '<b>Peak traffic.</b> Requests per second at the busiest moment.',
 '<b>Capacity</b> of one server, measured with a load test.',
 '<b>Target utilisation.</b> Aim for 75% busy, leaving headroom for spikes.',
 '<b>Round up.</b> 1500 ÷ 400 = 3.75, ÷ 0.75 = 5.'])}
${V.hook(`Size for the peak, then leave a quarter spare.`)}
`)}

${V.card(4,'Sticky trouble: sessions','keep servers forgetful',`
${V.steps([
 ['Ada logs in. The request lands on <b>server A</b>, which stores "Ada is logged in" in its own memory.',`<svg viewBox="0 0 420 205" role="img" aria-label="Session stored in server A memory">
${V.ic('person',10,64,52,'ic-a')}<rect class="bx" x="130" y="20" width="150" height="56" rx="8"/>${V.ic('server',138,30,36,'')}<text class="t-b" x="182" y="54">server A</text><rect class="bx" x="130" y="110" width="150" height="56" rx="8"/>${V.ic('server',138,120,36,'')}<text class="t-b" x="182" y="144">server B</text><path class="ln-a" d="M66 48H116"/><polygon class="ah-a" points="114,42 114,54 126,48"/><rect class="bx-ok" x="300" y="24" width="112" height="48" rx="8"/><text class="t-s" x="356" y="42" text-anchor="middle">in A's memory</text><text class="t-m" x="356" y="62" text-anchor="middle">Ada: in</text><text class="t" x="10" y="196">log in: works</text>
</svg>`],
 ['Her next click is sent to <b>server B</b>. B has never heard of her, so she is logged out. Annoying, and very common.',`<svg viewBox="0 0 420 205" role="img" aria-label="Server B does not know Ada">
${V.ic('person',10,64,52,'ic-a')}<rect class="bx" x="130" y="20" width="150" height="56" rx="8"/>${V.ic('server',138,30,36,'')}<text class="t-b" x="182" y="54">server A</text><rect class="bx" x="130" y="110" width="150" height="56" rx="8"/>${V.ic('server',138,120,36,'')}<text class="t-b" x="182" y="144">server B</text><path class="ln" d="M66 138H116"/><polygon class="ah" points="114,132 114,144 126,138"/><rect class="bx-ok" x="300" y="24" width="112" height="48" rx="8"/><text class="t-s" x="356" y="42" text-anchor="middle">in A's memory</text><text class="t-m" x="356" y="62" text-anchor="middle">Ada: in</text><rect class="bx-bad" x="300" y="114" width="112" height="48" rx="8"/><text class="t-b t-bad" x="356" y="144" text-anchor="middle">who are you?</text><text class="t-b t-bad" x="10" y="196">next click: logged out</text>
</svg>`],
 ['The fix: keep sessions in a <b>shared store</b> such as Redis. Every server reads the same session, so the servers stay stateless.',`<svg viewBox="0 0 420 205" role="img" aria-label="Sessions in shared Redis">
${V.ic('person',10,64,52,'ic-a')}<rect class="bx" x="130" y="20" width="150" height="56" rx="8"/>${V.ic('server',138,30,36,'')}<text class="t-b" x="182" y="54">server A</text><rect class="bx" x="130" y="110" width="150" height="56" rx="8"/>${V.ic('server',138,120,36,'')}<text class="t-b" x="182" y="144">server B</text><path class="ln" d="M66 138H116"/><polygon class="ah" points="114,132 114,144 126,138"/><rect class="bx-ok" x="318" y="66" width="94" height="68" rx="8"/>${V.ic('db',326,74,30,'ic-ok')}<text class="t-b" x="376" y="96" text-anchor="middle">Redis</text><text class="t-m" x="365" y="124" text-anchor="middle">Ada: in</text><path class="ln-ok" d="M282 48L316 84M282 138L316 116"/><text class="t-b t-ok" x="10" y="196">any server can read it</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('sessions in Redis or the database','Any server can handle any request'),V.no('sticky sessions forever','Pinning users to one server breaks when it dies'),
 V.ok('stateless app servers','Then adding a server is just "start one more"'))}
${V.build(`<ol><li>Run the load test first and read the app load: why is it failing?</li><li>Turn on the load balancer and add servers until no requests fail.</li><li>Keep adding until p95 latency, the time 95% of requests beat, is under 200 ms.</li><li>Check the monthly cost and trim any server you do not need.</li></ol>`)}
${V.hook(`If a server remembers you, it is a trap. Keep memory in a shared store.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Peak is 2,000 rps and a server handles 500. How many at 75% target? <i>2000 ÷ 500 ÷ 0.75 ≈ 5.3, so 6.</i> 2. What does a health check do? <i>Takes dead servers out of rotation.</i> 3. Why can one big server be risky? <i>It is a single point of failure.</i></div>
`);

explain('k3',`
<p>On Black Friday a shop gets 4,000 requests a second, and almost all of them read the same popular products. Asking the database every time would melt it. The fix is to keep copies close by: caches and CDNs.</p>

${V.card(1,'Caching','the fridge and the supermarket',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="A fridge at home is 5 steps away; the supermarket with everything is 20 minutes away">
${V.ic('house',10,30,110,'ic-a')}<rect class="bx-ok" x="46" y="86" width="36" height="46" rx="4"/><text class="t-b" x="64" y="160" text-anchor="middle">fridge</text><text class="t-s" x="64" y="180" text-anchor="middle">cache: 5 steps</text><path class="ln-d" d="M130 100H280"/><text class="t" x="205" y="90" text-anchor="middle">20 minutes away</text>${V.ic('truck',180,104,50,'')}${V.ic('house',290,24,120,'ic-info')}<text class="t-b" x="350" y="160" text-anchor="middle">supermarket</text><text class="t-s" x="350" y="180" text-anchor="middle">database: everything</text>
</svg><figcaption>Keep what you use most in the fridge. Only go to the supermarket when the fridge does not have it.</figcaption></figure>
${V.like(`<p>You do not drive to the supermarket every time you want milk. You keep milk in the fridge, a few steps away. The supermarket (the database) has everything, but it is far. The fridge (the cache) is small but instant. When the fridge is empty, you shop once and restock it.</p>`)}
${V.why(`<p>Databases read from disk and do real work for each query. A cache such as Redis keeps answers in memory, which is around a thousand times faster. With an 80% <b>hit rate</b>, the database only sees one read in five.</p>`)}
${V.steps([
 ['A request needs product 42. The app asks the cache first. It is not there: a <b>cache miss</b>.',`<svg viewBox="0 0 420 210" role="img" aria-label="Cache miss">
<rect class="bx" x="10" y="60" width="120" height="70" rx="10"/>${V.ic('server',20,72,44,'ic-a')}<text class="t-b" x="98" y="100" text-anchor="middle">app</text><rect class="bx-bad" x="270" y="8" width="142" height="70" rx="10"/>${V.ic('bulb',280,22,40,'ic-ok')}<text class="t-b" x="364" y="40" text-anchor="middle">cache</text><text class="t-s" x="364" y="62" text-anchor="middle">in memory</text><rect class="bx" x="270" y="112" width="142" height="70" rx="10"/>${V.ic('db',280,126,40,'')}<text class="t-b" x="364" y="144" text-anchor="middle">database</text><text class="t-s" x="364" y="166" text-anchor="middle">disk, slower</text><path class="ln-a" d="M132 60H256"/><polygon class="ah-a" points="254,54 254,66 266,60"/><text class="t-m" x="160" y="50">get p:42</text><text class="t-b t-bad" x="196" y="200" text-anchor="middle">MISS: not there</text>
</svg>`],
 ['So the app reads it from the <b>database</b>, the slow way.',`<svg viewBox="0 0 420 210" role="img" aria-label="Read from database">
<rect class="bx" x="10" y="60" width="120" height="70" rx="10"/>${V.ic('server',20,72,44,'ic-a')}<text class="t-b" x="98" y="100" text-anchor="middle">app</text><rect class="bx" x="270" y="8" width="142" height="70" rx="10"/>${V.ic('bulb',280,22,40,'ic-ok')}<text class="t-b" x="364" y="40" text-anchor="middle">cache</text><text class="t-s" x="364" y="62" text-anchor="middle">in memory</text><rect class="bx-hl" x="270" y="112" width="142" height="70" rx="10"/>${V.ic('db',280,126,40,'')}<text class="t-b" x="364" y="144" text-anchor="middle">database</text><text class="t-s" x="364" y="166" text-anchor="middle">disk, slower</text><path class="ln-a" d="M132 128H256"/><polygon class="ah-a" points="254,122 254,134 266,128"/><text class="t-m" x="150" y="122">SELECT...</text><path class="ln-ok" d="M266 150H142"/><polygon class="ah-ok" points="144,144 144,156 132,150"/><text class="t-b" x="196" y="200" text-anchor="middle">read the database: slower</text>
</svg>`],
 ['Before replying, the app stores a copy in the cache with a <b>TTL</b> (time to live) of 60 seconds.',`<svg viewBox="0 0 420 210" role="img" aria-label="Store with TTL 60 seconds">
<rect class="bx" x="10" y="60" width="120" height="70" rx="10"/>${V.ic('server',20,72,44,'ic-a')}<text class="t-b" x="98" y="100" text-anchor="middle">app</text><rect class="bx-ok" x="270" y="8" width="142" height="70" rx="10"/>${V.ic('bulb',280,22,40,'ic-ok')}<text class="t-b" x="364" y="40" text-anchor="middle">cache</text><text class="t-s" x="364" y="62" text-anchor="middle">in memory</text><rect class="bx" x="270" y="112" width="142" height="70" rx="10"/>${V.ic('db',280,126,40,'')}<text class="t-b" x="364" y="144" text-anchor="middle">database</text><text class="t-s" x="364" y="166" text-anchor="middle">disk, slower</text><path class="ln-ok" d="M132 60H256"/><polygon class="ah-ok" points="254,54 254,66 266,60"/><text class="t-m" x="150" y="50">SET EX 60</text><text class="t-b t-ok" x="196" y="200" text-anchor="middle">keep a copy for 60 s</text>
</svg>`],
 ['The next request for product 42 is a <b>cache hit</b>. Answered from memory, and the database never hears about it.',`<svg viewBox="0 0 420 210" role="img" aria-label="Cache hit">
<rect class="bx" x="10" y="60" width="120" height="70" rx="10"/>${V.ic('server',20,72,44,'ic-a')}<text class="t-b" x="98" y="100" text-anchor="middle">app</text><rect class="bx-hl" x="270" y="8" width="142" height="70" rx="10"/>${V.ic('bulb',280,22,40,'ic-ok')}<text class="t-b" x="364" y="40" text-anchor="middle">cache</text><text class="t-s" x="364" y="62" text-anchor="middle">in memory</text><rect class="bx" x="270" y="112" width="142" height="70" rx="10"/>${V.ic('db',280,126,40,'')}<text class="t-b" x="364" y="144" text-anchor="middle">database</text><text class="t-s" x="364" y="166" text-anchor="middle">disk, slower</text><path class="ln-a" d="M132 46H256"/><polygon class="ah-a" points="254,40 254,52 266,46"/><path class="ln-ok" d="M266 70H142"/><polygon class="ah-ok" points="144,64 144,76 132,70"/><text class="t-m" x="160" y="36">get p:42</text><text class="t-b t-ok" x="196" y="200" text-anchor="middle">HIT: fast, database untouched</text>
</svg>`]])}
${V.anat([[1,'SET'],' ',[2,'product:42'],' ',[3,'"{name:...,price:15}"'],' ',[4,'EX 60']],[
 '<b>Redis command</b> to store a value.',
 '<b>Key.</b> Convention: <code>type:id</code>, so keys are easy to find and delete.',
 '<b>Value.</b> Often the JSON the database would have given you.',
 '<b>Expiry.</b> Delete it automatically after 60 seconds. This is the TTL.'])}
${V.rules(V.rh('Rules'),
 V.ok('cache read-heavy data','Product pages, profiles: read often, changed rarely'),V.no('cache passwords or card numbers','Caches are for speed, not secrets'),
 V.ok('always set a TTL','So stale copies clean themselves up'),V.ok('miss: read DB, then SET','That is the cache-aside pattern'))}
${V.hook(`Check the fridge first. Empty? Shop once, restock, carry on.`)}
`)}

${V.card(2,'CDNs','corner shops all over the world',`
${V.like(`<p>A big brand does not ship every chocolate bar from its one factory. It stocks corner shops in every town. A <b>CDN</b> (content delivery network) is a chain of corner shops for your files: copies of your images, CSS and JavaScript sit on servers close to every user.</p>`)}
${V.why(`<p>A trip across the world takes about 150 ms, and files like images are big. CDNs such as Cloudflare, Amazon CloudFront and Vercel's edge network have hundreds of locations. On Black Friday, 30% of requests are static files: a CDN takes all of them off your servers.</p>`)}
${V.steps([
 ['A user in Lagos asks for <code>logo.png</code>. The request goes to the nearest CDN <b>edge</b> server. It does not have the file yet.',`<svg viewBox="0 0 420 196" role="img" aria-label="Edge miss">
${V.ic('globe',150,30,120,'ic-info')}<rect class="bx-a" x="300" y="20" width="112" height="58" rx="10"/>${V.ic('server',306,30,36,'ic-a')}<text class="t-b" x="374" y="46" text-anchor="middle">origin</text><text class="t-s" x="374" y="66" text-anchor="middle">far away</text><rect class="bx-hl" x="8" y="20" width="128" height="58" rx="10"/>${V.ic('server',14,30,36,'ic-ok')}<text class="t-b" x="88" y="46" text-anchor="middle">edge</text><text class="t-s" x="88" y="66" text-anchor="middle">near Lagos</text>${V.ic('person',14,120,44,'ic-a')}<text class="t-s" x="36" y="180" text-anchor="middle">user 1</text><path class="ln-a" d="M36 118V92"/><polygon class="ah-a" points="30,94 42,94 36,82"/><text class="t-b t-bad" x="160" y="186">edge: miss</text>
</svg>`],
 ['The edge fetches the file once from your <b>origin</b> server, perhaps in another continent, and keeps a copy.',`<svg viewBox="0 0 420 196" role="img" aria-label="Edge fetches from origin">
${V.ic('globe',150,30,120,'ic-info')}<rect class="bx-a" x="300" y="20" width="112" height="58" rx="10"/>${V.ic('server',306,30,36,'ic-a')}<text class="t-b" x="374" y="46" text-anchor="middle">origin</text><text class="t-s" x="374" y="66" text-anchor="middle">far away</text><rect class="bx-ok" x="8" y="20" width="128" height="58" rx="10"/>${V.ic('server',14,30,36,'ic-ok')}<text class="t-b" x="88" y="46" text-anchor="middle">edge</text><text class="t-s" x="88" y="66" text-anchor="middle">near Lagos</text>${V.ic('person',14,120,44,'ic-a')}<text class="t-s" x="36" y="180" text-anchor="middle">user 1</text><path class="ln-a" d="M138 40H296"/><polygon class="ah-a" points="148,34 148,46 138,40"/><text class="t-b" x="160" y="186">fetch once from origin</text>
</svg>`],
 ['Every later user nearby gets it straight from the edge: fast for them, and your servers never see the request.',`<svg viewBox="0 0 420 196" role="img" aria-label="Edge hit for user 2">
${V.ic('globe',150,30,120,'ic-info')}<rect class="bx-a" x="300" y="20" width="112" height="58" rx="10"/>${V.ic('server',306,30,36,'ic-a')}<text class="t-b" x="374" y="46" text-anchor="middle">origin</text><text class="t-s" x="374" y="66" text-anchor="middle">far away</text><rect class="bx-hl" x="8" y="20" width="128" height="58" rx="10"/>${V.ic('server',14,30,36,'ic-ok')}<text class="t-b" x="88" y="46" text-anchor="middle">edge</text><text class="t-s" x="88" y="66" text-anchor="middle">near Lagos</text>${V.ic('person',14,120,44,'ic-a')}<text class="t-s" x="36" y="180" text-anchor="middle">user 1</text>${V.ic('person',84,120,44,'ic-ok')}<text class="t-s" x="106" y="180" text-anchor="middle">user 2</text><path class="ln-ok" d="M106 118V92"/><polygon class="ah-ok" points="100,94 112,94 106,82"/><text class="t-b t-ok" x="160" y="186">edge: hit, close by</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('static files on the CDN','Images, fonts, CSS, JS'),V.ok('app.3f9c2b.js','Put a content hash in the file name, so a new version gets a new URL'),
 V.no('private, per-user pages','Do not let a shared cache store one user\'s data for everyone'))}
${V.hook(`Ship once to the corner shop; serve the street from there.`)}
`)}

${V.card(3,'Invalidation','the hard part',`
<figure class="fig"><svg viewBox="0 0 420 175" role="img" aria-label="The cache shows a price of 20 pounds while the database already says 15 pounds">
<rect class="bx-warn" x="10" y="20" width="180" height="110" rx="10"/><text class="t-b" x="100" y="46" text-anchor="middle">cache says</text><text class="t-m" x="100" y="90" text-anchor="middle" style="font-size:30px">£20</text><text class="t-s" x="100" y="118" text-anchor="middle">TTL: 45 s left</text>
<rect class="bx-ok" x="230" y="20" width="180" height="110" rx="10"/><text class="t-b" x="320" y="46" text-anchor="middle">database says</text><text class="t-m" x="320" y="90" text-anchor="middle" style="font-size:30px">£15</text><text class="t-s" x="320" y="118" text-anchor="middle">price just changed</text>
<text class="t-b t-bad" x="210" y="160" text-anchor="middle">users see stale data until it expires</text>
</svg><figcaption>The price changed in the database, but the cache still holds the old copy until its TTL runs out.</figcaption></figure>
${V.like(`<p>Milk in the fridge has a use-by date. Before that date you trust it; after it you throw it out and buy fresh. A TTL is the use-by date for cached data. And if you <i>know</i> the milk went off, you bin it early: that is invalidation.</p>`)}
${V.why(`<p>A programmer called Phil Karlton joked: "There are only two hard things in computer science: cache invalidation and naming things." Every cache trades freshness for speed. Your job is to decide, for each piece of data, how stale it may be.</p>`)}
${V.rules(V.rh('Rules'),
 V.ok('DEL product:42 on update','When the data changes, delete the cached copy'),V.ok('short TTL for prices and stock','Seconds, not days'),
 V.ok('long TTL for logos','Pair it with a hashed file name'),V.no('no TTL, no invalidation','Users may see old data forever'))}
${V.build(`<ol><li>Add a cache in the simulator and watch database load fall below 50%.</li><li>Add a CDN so static files never reach your app servers.</li><li>Tune servers until there are no errors, p95 is under 150 ms and the bill is under $620 a month.</li></ol>`)}
${V.hook(`Fast, fresh, simple: a cache lets you pick two.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Hit rate 90%: what share of reads reach the database? <i>10%.</i> 2. What happens on a cache miss in cache-aside? <i>Read the database, then store the result in the cache.</i> 3. Why put a hash in a JS file name? <i>A new version gets a new URL, so CDNs and browsers fetch it fresh.</i></div>
`);

explain('k4',`
<p>When you sign up for a website, a welcome email arrives a few seconds later. You did not wait for it, and that is on purpose. Work that can happen later is handed to a queue, so the page stays fast.</p>

${V.card(1,'Queues and workers','the ticket rail in a kitchen',`
${V.like(`<p>A restaurant kitchen. The waiter clips your order ticket to a rail and goes straight back to the tables. Chefs take tickets from the rail in order, at their own pace. The waiter never stands in the kitchen waiting for your pizza.</p>`)}
${V.why(`<p>Some work is slow and the user does not need it right now: emails, PDFs, resizing photos, calling other companies' webhooks. A <b>message queue</b> such as Amazon SQS, RabbitMQ, or BullMQ on top of Redis holds small job messages until a <b>worker</b> process is ready for them.</p>`)}
${V.steps([
 ['Without a queue: the app sends the welcome email and builds the PDF receipt <b>before</b> replying. The user stares at a spinner for 400 ms.',`<svg viewBox="0 0 420 196" role="img" aria-label="User waits for slow work">
${V.ic('person',6,40,44,'ic-a')}<rect class="bx" x="66" y="30" width="96" height="62" rx="10"/>${V.ic('server',74,42,36,'')}<text class="t-b" x="132" y="68" text-anchor="middle">app</text><text class="t-s" x="210" y="120" text-anchor="middle">queue</text><path class="ln" d="M150 160H272"/><rect class="bx-dark" x="300" y="30" width="112" height="62" rx="10"/>${V.ic('robot',306,40,40,'ic-ok')}<text class="t-term" x="372" y="68" text-anchor="middle">worker</text><path class="ln-a" d="M50 62H54"/><polygon class="ah-a" points="52,56 52,68 64,62"/><text class="t-b t-bad" x="10" y="186">user waits 400 ms: email + PDF</text>${V.ic('clock',176,36,48,'ic-bad')}
</svg>`],
 ['With a queue: the app saves the user, drops a small <b>job</b> message on the queue, and replies straight away.',`<svg viewBox="0 0 420 196" role="img" aria-label="App enqueues a job and replies">
${V.ic('person',6,40,44,'ic-a')}<rect class="bx" x="66" y="30" width="96" height="62" rx="10"/>${V.ic('server',74,42,36,'')}<text class="t-b" x="132" y="68" text-anchor="middle">app</text><text class="t-s" x="210" y="120" text-anchor="middle">queue</text><path class="ln" d="M150 160H272"/><rect class="bx-dark" x="300" y="30" width="112" height="62" rx="10"/>${V.ic('robot',306,40,40,'ic-ok')}<text class="t-term" x="372" y="68" text-anchor="middle">worker</text><rect class="bx-warn" x="166" y="128" width="50" height="30" rx="5"/><text class="t-m" x="191" y="149" text-anchor="middle">job</text><path class="ln-a" d="M150 94V118"/><polygon class="ah-a" points="144,116 156,116 150,128"/><path class="ln-ok" d="M64 96H32"/><polygon class="ah-ok" points="34,90 34,102 22,96"/><text class="t-b t-ok" x="10" y="186">201 sent at once: about 20 ms</text>
</svg>`],
 ['A separate <b>worker</b> process takes the job from the front of the queue whenever it is free.',`<svg viewBox="0 0 420 196" role="img" aria-label="Worker takes the job">
${V.ic('person',6,40,44,'ic-a')}<rect class="bx" x="66" y="30" width="96" height="62" rx="10"/>${V.ic('server',74,42,36,'')}<text class="t-b" x="132" y="68" text-anchor="middle">app</text><text class="t-s" x="210" y="120" text-anchor="middle">queue</text><path class="ln" d="M150 160H272"/><rect class="bx-dark" x="300" y="30" width="112" height="62" rx="10"/>${V.ic('robot',306,40,40,'ic-ok')}<text class="t-term" x="372" y="68" text-anchor="middle">worker</text><rect class="bx-hl" x="230" y="128" width="50" height="30" rx="5"/><text class="t-m" x="255" y="149" text-anchor="middle">job</text><path class="ln-a" d="M282 140C320 140 350 120 352 100"/><polygon class="ah-a" points="346,104 358,104 352,94"/><text class="t-b" x="10" y="186">worker takes the job from the front</text>
</svg>`],
 ['The worker does the slow work. The user was already on the next page long ago.',`<svg viewBox="0 0 420 196" role="img" aria-label="Worker sends the email">
${V.ic('person',6,40,44,'ic-a')}<rect class="bx" x="66" y="30" width="96" height="62" rx="10"/>${V.ic('server',74,42,36,'')}<text class="t-b" x="132" y="68" text-anchor="middle">app</text><text class="t-s" x="210" y="120" text-anchor="middle">queue</text><path class="ln" d="M150 160H272"/><rect class="bx-dark" x="300" y="30" width="112" height="62" rx="10"/>${V.ic('robot',306,40,40,'ic-ok')}<text class="t-term" x="372" y="68" text-anchor="middle">worker</text>${V.ic('mail',360,110,46,'ic-ok')}<text class="t-b t-ok" x="10" y="186">email + PDF sent in the background</text>
</svg>`]])}
${V.rules(V.rh('Queue it or not?'),
 V.ok('welcome emails, receipts','Can happen a few seconds later'),V.ok('resizing uploaded photos','Slow, and the user can see a placeholder'),
 V.no('checking a password at login','The user needs the answer now'),V.no('showing the basket total','Part of the page they are looking at'))}
${V.hook(`Clip the ticket, serve the next table.`)}
`)}

${V.card(2,'Keeping up','out must beat in',`
<figure class="fig"><svg viewBox="0 0 420 185" role="img" aria-label="A bath fills at 80 jobs per second and drains through two workers at 100 per second">
${V.ic('repeat',20,20,44,'ic-a')}<text class="t-b" x="76" y="38">in: 80 jobs/s</text><path class="ln-a" style="stroke-width:6" d="M110 60V96"/><path class="ln" style="stroke-width:3" d="M60 92V170H300V92"/><rect class="bx-info" x="62" y="130" width="236" height="38"/><text class="t-b" x="180" y="155" text-anchor="middle">queue level</text>${V.ic('robot',318,110,40,'ic-ok')}${V.ic('robot',366,110,40,'ic-ok')}<path class="ln-ok" style="stroke-width:6" d="M300 160H316"/><text class="t-b t-ok" x="414" y="70" text-anchor="end">out: 2 x 50 = 100/s</text><text class="t-s" x="384" y="100" text-anchor="middle">2 workers</text>
</svg><figcaption>If jobs arrive faster than workers finish them, the queue grows forever. Drain must beat tap.</figcaption></figure>
${V.like(`<p>A bath with the tap running and the plug out. If water drains faster than it pours in, the level stays low. If the tap wins, the bath overflows, however big it is. A queue only smooths out bursts; it cannot fix too few workers.</p>`)}
${V.why(`<p>Traffic comes in bursts: a TV advert, a sale starting at 9am. A queue soaks up the burst so nothing is lost, and the workers catch up afterwards. But if the <b>average</b> arrival rate is higher than the workers can handle, the backlog grows every minute and jobs arrive hours late. So you size the workers from the numbers.</p>`)}
${V.anat([[1,'800 rps'],' x ',[2,'10%'],' = ',[3,'80 jobs/s'],'   ',[4,'80 ÷ 50 = 1.6 → 2 workers']],[
 '<b>Requests per second</b> at peak.',
 '<b>Share that create a job</b> (the sign-ups).',
 '<b>Arrival rate</b> of jobs into the queue.',
 '<b>Workers needed.</b> Each finishes about 50 jobs a second. Always round up.'])}
${V.hook(`Tap in, drain out: workers x speed must beat arrivals.`)}
`)}

${V.card(3,'When things go wrong','retries, idempotency, dead letters',`
${V.like(`<p>A postman who is not sure a parcel was signed for brings it again the next day. That is safe only if you can say "already got it, thanks". Jobs must be just as safe to deliver twice.</p>`)}
${V.why(`<p>Most queues promise <b>at-least-once</b> delivery: a job is only removed when a worker says "done". If the worker crashes first, the job comes back. That is good, because nothing is lost, but it means a job can run twice.</p>`)}
${V.steps([
 ['A worker takes "send welcome email to user 42" and sends it.',`<svg viewBox="0 0 420 170" role="img" aria-label="Worker processing job">
<rect class="bx" x="10" y="20" width="400" height="44" rx="8"/><text class="t-s" x="20" y="14">queue</text>${V.ic('robot',20,96,44,'ic-ok')}<text class="t-b" x="42" y="160" text-anchor="middle">worker</text><rect class="bx-info" x="290" y="96" width="120" height="56" rx="8"/><text class="t-s" x="350" y="116" text-anchor="middle">sent log</text><rect class="bx-hl" x="20" y="28" width="190" height="28" rx="5"/><text class="t-m" x="115" y="47" text-anchor="middle" style="font-size:14px">email user 42</text><path class="ln-a" d="M42 58V84"/><polygon class="ah-a" points="36,82 48,82 42,94"/><text class="t-m" x="350" y="140" text-anchor="middle">(empty)</text><text class="t" x="80" y="124">sends the email...</text>
</svg>`],
 ['It records "42: sent", then crashes before telling the queue the job is done. The queue never got the "done" message.',`<svg viewBox="0 0 420 170" role="img" aria-label="Worker crashes before acknowledging">
<rect class="bx" x="10" y="20" width="400" height="44" rx="8"/><text class="t-s" x="20" y="14">queue</text>${V.ic('robot',20,96,44,'ic-bad')}<text class="t-b" x="42" y="160" text-anchor="middle">worker</text><rect class="bx-info" x="290" y="96" width="120" height="56" rx="8"/><text class="t-s" x="350" y="116" text-anchor="middle">sent log</text><rect class="ln-d" x="20" y="28" width="190" height="28" rx="5"/><text class="t-m t-dim" x="115" y="47" text-anchor="middle" style="font-size:14px">email user 42</text><text class="t-m" x="350" y="140" text-anchor="middle">42: sent</text><path class="ln-x" d="M20 96 64 140M64 96 20 140"/><text class="t-b t-bad" x="80" y="124">crash before "done"</text>
</svg>`],
 ['After a timeout the queue delivers the same job <b>again</b>. This is at-least-once delivery, and it is normal.',`<svg viewBox="0 0 420 170" role="img" aria-label="Job delivered again">
<rect class="bx" x="10" y="20" width="400" height="44" rx="8"/><text class="t-s" x="20" y="14">queue</text>${V.ic('robot',20,96,44,'ic-ok')}<text class="t-b" x="42" y="160" text-anchor="middle">worker</text><rect class="bx-info" x="290" y="96" width="120" height="56" rx="8"/><text class="t-s" x="350" y="116" text-anchor="middle">sent log</text><rect class="bx-warn" x="20" y="28" width="190" height="28" rx="5"/><text class="t-m" x="115" y="47" text-anchor="middle" style="font-size:14px">email user 42</text><text class="t-b t-warn" x="220" y="47">redelivered</text><path class="ln-a" d="M42 58V84"/><polygon class="ah-a" points="36,82 48,82 42,94"/><text class="t-m" x="350" y="140" text-anchor="middle">42: sent</text><text class="t" x="80" y="124">"sent for 42?"</text>
</svg>`],
 ['The job is <b>idempotent</b>: it checks the log first, sees the email went, and skips it. One email, not two.',`<svg viewBox="0 0 420 170" role="img" aria-label="Idempotent job skips the duplicate">
<rect class="bx" x="10" y="20" width="400" height="44" rx="8"/><text class="t-s" x="20" y="14">queue</text>${V.ic('robot',20,96,44,'ic-ok')}<text class="t-b" x="42" y="160" text-anchor="middle">worker</text><rect class="bx-info" x="290" y="96" width="120" height="56" rx="8"/><text class="t-s" x="350" y="116" text-anchor="middle">sent log</text><text class="t-s" x="210" y="47" text-anchor="middle">(job removed)</text><text class="t-m" x="350" y="140" text-anchor="middle">42: sent</text><text class="t-b t-ok" x="80" y="124">yes: skip, mark done</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('idempotent jobs','Check "already done for user 42?" before acting'),V.ok('retry with a growing wait','1 s, then 2 s, then 4 s: called backoff'),
 V.ok('dead-letter queue','After, say, 5 failures, park the job for a human'),V.no('assume exactly once','Duplicates will happen; plan for them'))}
${V.build(`<ol><li>In the simulator, turn on the queue so the slow 400 ms work leaves the request.</li><li>Work out the job rate and add enough workers that worker load stays under 100%.</li><li>Check there are no errors and p95 is under 150 ms.</li></ol>`)}
${V.hook(`At least once means maybe twice: make every job safe to repeat.`)}
`)}

<div class="try"><b>Try it in your head</b>1. 200 jobs a second arrive and each worker does 60. How many workers? <i>200 ÷ 60 ≈ 3.3, so 4.</i> 2. Should "check the password" go on a queue? <i>No: the user needs the answer now.</i> 3. What is a dead-letter queue for? <i>Jobs that keep failing, so a human can inspect them.</i></div>
`);

explain('k5',`
<p>Sooner or later the database is the busiest part of every system. There are two big ways to spread its load: make <b>copies</b> of it for reading, or <b>split</b> it into pieces. Each solves a different problem.</p>

${V.card(1,'Read replicas','photocopies of the recipe book',`
${V.like(`<p>One master recipe book in the head chef's office. Only the head chef may change it. Photocopies sit at every station, so cooks can read without queueing at the office. When a recipe changes, new copies go out, and for a minute some stations still have the old page.</p>`)}
${V.why(`<p>Most apps read far more than they write: a news site might be 97% reads. One database cannot answer them all, but copies can. PostgreSQL and MySQL both stream every change from the <b>primary</b> to its <b>replicas</b>.</p>`)}
${V.steps([
 ['A seller changes a price. Every <b>write</b> goes to the one <b>primary</b> database.',`<svg viewBox="0 0 420 234" role="img" aria-label="Write goes to the primary">
<rect class="bx" x="8" y="76" width="100" height="56" rx="10"/>${V.ic('server',14,86,36,'')}<text class="t-b" x="76" y="110" text-anchor="middle">app</text><rect class="bx-hl" x="150" y="70" width="110" height="68" rx="10"/>${V.ic('db',158,82,40,'ic-a')}<text class="t-b" x="226" y="100" text-anchor="middle">primary</text><text class="t-m" x="226" y="124" text-anchor="middle">£15</text><rect class="bx" x="300" y="14" width="112" height="64" rx="10"/>${V.ic('db',306,26,36,'ic-info')}<text class="t-b" x="374" y="42" text-anchor="middle">replica 1</text><text class="t-m" x="374" y="66" text-anchor="middle">£20</text><rect class="bx" x="300" y="130" width="112" height="64" rx="10"/>${V.ic('db',306,142,36,'ic-info')}<text class="t-b" x="374" y="158" text-anchor="middle">replica 2</text><text class="t-m" x="374" y="182" text-anchor="middle">£20</text><path class="ln-a" d="M110 104H138"/><polygon class="ah-a" points="136,98 136,110 148,104"/><text class="t-b" x="10" y="226">write: price = £15 (primary only)</text>
</svg>`],
 ['The primary sends the change to each <b>replica</b>. This takes a moment, so replica 2 is still behind: that delay is <b>replication lag</b>.',`<svg viewBox="0 0 420 234" role="img" aria-label="Replication with lag">
<rect class="bx" x="8" y="76" width="100" height="56" rx="10"/>${V.ic('server',14,86,36,'')}<text class="t-b" x="76" y="110" text-anchor="middle">app</text><rect class="bx-a" x="150" y="70" width="110" height="68" rx="10"/>${V.ic('db',158,82,40,'ic-a')}<text class="t-b" x="226" y="100" text-anchor="middle">primary</text><text class="t-m" x="226" y="124" text-anchor="middle">£15</text><rect class="bx" x="300" y="14" width="112" height="64" rx="10"/>${V.ic('db',306,26,36,'ic-info')}<text class="t-b" x="374" y="42" text-anchor="middle">replica 1</text><text class="t-m" x="374" y="66" text-anchor="middle">£15</text><rect class="bx-warn" x="300" y="130" width="112" height="64" rx="10"/>${V.ic('db',306,142,36,'ic-info')}<text class="t-b" x="374" y="158" text-anchor="middle">replica 2</text><text class="t-m" x="374" y="182" text-anchor="middle">£20</text><path class="ln-ok" d="M262 90L296 56"/><path class="ln-d" d="M262 120L296 150"/><text class="t-b" x="10" y="226">copied to replicas: replica 2 is behind</text>
</svg>`],
 ['Once caught up, every replica holds the same data, and <b>reads</b> are spread across them. Two replicas, roughly double the read capacity.',`<svg viewBox="0 0 420 234" role="img" aria-label="Reads spread over replicas">
<rect class="bx" x="8" y="76" width="100" height="56" rx="10"/>${V.ic('server',14,86,36,'')}<text class="t-b" x="76" y="110" text-anchor="middle">app</text><rect class="bx-a" x="150" y="70" width="110" height="68" rx="10"/>${V.ic('db',158,82,40,'ic-a')}<text class="t-b" x="226" y="100" text-anchor="middle">primary</text><text class="t-m" x="226" y="124" text-anchor="middle">£15</text><rect class="bx-hl" x="300" y="14" width="112" height="64" rx="10"/>${V.ic('db',306,26,36,'ic-info')}<text class="t-b" x="374" y="42" text-anchor="middle">replica 1</text><text class="t-m" x="374" y="66" text-anchor="middle">£15</text><rect class="bx-hl" x="300" y="130" width="112" height="64" rx="10"/>${V.ic('db',306,142,36,'ic-info')}<text class="t-b" x="374" y="158" text-anchor="middle">replica 2</text><text class="t-m" x="374" y="182" text-anchor="middle">£15</text><path class="ln-a" d="M108 92C180 30 250 40 296 46M108 116C180 190 250 170 296 162"/><text class="t-b t-ok" x="10" y="226">reads share the replicas</text>
</svg>`],
 ['The catch: a read that lands on a lagging replica sees the old value. If a user must see their own change at once, read that from the primary.',`<svg viewBox="0 0 420 234" role="img" aria-label="Stale read from a lagging replica">
<rect class="bx" x="8" y="76" width="100" height="56" rx="10"/>${V.ic('server',14,86,36,'')}<text class="t-b" x="76" y="110" text-anchor="middle">app</text><rect class="bx-a" x="150" y="70" width="110" height="68" rx="10"/>${V.ic('db',158,82,40,'ic-a')}<text class="t-b" x="226" y="100" text-anchor="middle">primary</text><text class="t-m" x="226" y="124" text-anchor="middle">£15</text><rect class="bx" x="300" y="14" width="112" height="64" rx="10"/>${V.ic('db',306,26,36,'ic-info')}<text class="t-b" x="374" y="42" text-anchor="middle">replica 1</text><text class="t-m" x="374" y="66" text-anchor="middle">£15</text><rect class="bx-bad" x="300" y="130" width="112" height="64" rx="10"/>${V.ic('db',306,142,36,'ic-info')}<text class="t-b" x="374" y="158" text-anchor="middle">replica 2</text><text class="t-m" x="374" y="182" text-anchor="middle">£20</text><path class="ln-a" d="M108 116C180 190 250 170 296 162"/><text class="t-b t-bad" x="10" y="226">a read hit replica 2 too early: old £20</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('writes → primary','There is only one place to change data'),V.ok('reads → replicas','Spread them for read capacity'),
 V.ok('read your own writes from the primary','Avoids "my change vanished" after saving'),V.no('replicas for a write-heavy app','Every write still lands on the primary, and then on every replica too'))}
${V.hook(`One writer, many readers, and the copies run a little late.`)}
`)}

${V.card(2,'Sharding','split the phone book',`
${V.like(`<p>A phone book too big for one library. Put A to H in one library, I to P in a second and Q to Z in a third. Each library only stores, and only updates, its own part. To find "Okafor", you know to go straight to the second one.</p>`)}
${V.why(`<p>When <b>writes</b> are the problem, copies do not help: each copy has to take every write. Sharding splits the rows across several databases by a <b>shard key</b>, so each one takes only part of the writes. Real systems use a hash of the key, or consistent hashing, rather than plain % 3, so shards can be added more easily.</p>`)}
${V.steps([
 ['A sensor reading from <b>device 17</b> arrives. The shard key is device_id. 17 divided by 3 leaves 2, so it goes to <b>shard 2</b>.',`<svg viewBox="0 0 420 196" role="img" aria-label="Device 17 to shard 2">
<rect class="bx" x="14" y="104" width="124" height="80" rx="10"/>${V.ic('db',22,118,40,'ic-info')}<text class="t-b" x="102" y="136" text-anchor="middle">shard 0</text><rect class="bx" x="150" y="104" width="124" height="80" rx="10"/>${V.ic('db',158,118,40,'ic-info')}<text class="t-b" x="238" y="136" text-anchor="middle">shard 1</text><rect class="bx-hl" x="286" y="104" width="124" height="80" rx="10"/>${V.ic('db',294,118,40,'ic-info')}<text class="t-b" x="374" y="136" text-anchor="middle">shard 2</text><text class="t-m" x="14" y="30" style="font-size:17px">device 17</text><text class="t-m t-a" x="14" y="62" style="font-size:17px">17 % 3 = 2</text><text class="t-b t-ok" x="406" y="62" text-anchor="end">→ shard 2</text><text class="t-m" x="102" y="166" text-anchor="middle">0 rows</text><text class="t-m" x="238" y="166" text-anchor="middle">0 rows</text><text class="t-m" x="374" y="166" text-anchor="middle">1 rows</text>
</svg>`],
 ['<b>Device 42</b>: 42 % 3 = 0, so shard 0. Different devices land on different databases, so the writes are shared out.',`<svg viewBox="0 0 420 196" role="img" aria-label="Device 42 to shard 0">
<rect class="bx-hl" x="14" y="104" width="124" height="80" rx="10"/>${V.ic('db',22,118,40,'ic-info')}<text class="t-b" x="102" y="136" text-anchor="middle">shard 0</text><rect class="bx" x="150" y="104" width="124" height="80" rx="10"/>${V.ic('db',158,118,40,'ic-info')}<text class="t-b" x="238" y="136" text-anchor="middle">shard 1</text><rect class="bx" x="286" y="104" width="124" height="80" rx="10"/>${V.ic('db',294,118,40,'ic-info')}<text class="t-b" x="374" y="136" text-anchor="middle">shard 2</text><text class="t-m" x="14" y="30" style="font-size:17px">device 42</text><text class="t-m t-a" x="14" y="62" style="font-size:17px">42 % 3 = 0</text><text class="t-b t-ok" x="406" y="62" text-anchor="end">→ shard 0</text><text class="t-m" x="102" y="166" text-anchor="middle">1 rows</text><text class="t-m" x="238" y="166" text-anchor="middle">0 rows</text><text class="t-m" x="374" y="166" text-anchor="middle">1 rows</text>
</svg>`],
 ['Device 8 also goes to shard 2. All of one device\'s readings always land together, so "show me device 8\'s history" asks only one shard.',`<svg viewBox="0 0 420 196" role="img" aria-label="Device 8 to shard 2">
<rect class="bx" x="14" y="104" width="124" height="80" rx="10"/>${V.ic('db',22,118,40,'ic-info')}<text class="t-b" x="102" y="136" text-anchor="middle">shard 0</text><rect class="bx" x="150" y="104" width="124" height="80" rx="10"/>${V.ic('db',158,118,40,'ic-info')}<text class="t-b" x="238" y="136" text-anchor="middle">shard 1</text><rect class="bx-hl" x="286" y="104" width="124" height="80" rx="10"/>${V.ic('db',294,118,40,'ic-info')}<text class="t-b" x="374" y="136" text-anchor="middle">shard 2</text><text class="t-m" x="14" y="30" style="font-size:17px">device 8</text><text class="t-m t-a" x="14" y="62" style="font-size:17px">8 % 3 = 2</text><text class="t-b t-ok" x="406" y="62" text-anchor="end">→ shard 2</text><text class="t-m" x="102" y="166" text-anchor="middle">1 rows</text><text class="t-m" x="238" y="166" text-anchor="middle">0 rows</text><text class="t-m" x="374" y="166" text-anchor="middle">2 rows</text>
</svg>`],
 ['A bad shard key: <b>created_at</b> by day. Every write today hits the same shard while the others sit idle. That is a <b>hot shard</b>.',`<svg viewBox="0 0 420 196" role="img" aria-label="A date key creates a hot shard">
<rect class="bx" x="14" y="104" width="124" height="80" rx="10"/>${V.ic('db',22,118,40,'ic-info')}<text class="t-b" x="102" y="136" text-anchor="middle">shard 0</text><rect class="bx" x="150" y="104" width="124" height="80" rx="10"/>${V.ic('db',158,118,40,'ic-info')}<text class="t-b" x="238" y="136" text-anchor="middle">shard 1</text><rect class="bx-bad" x="286" y="104" width="124" height="80" rx="10"/>${V.ic('db',294,118,40,'ic-bad')}<text class="t-b" x="374" y="136" text-anchor="middle">shard 2</text><text class="t-m" x="14" y="30" style="font-size:17px">created_at = today</text><text class="t-m t-a" x="14" y="62" style="font-size:17px">every new row</text><text class="t-b t-bad" x="406" y="62" text-anchor="end">→ one shard</text><text class="t-m" x="102" y="166" text-anchor="middle">0 rows</text><text class="t-m" x="238" y="166" text-anchor="middle">0 rows</text><text class="t-m" x="374" y="166" text-anchor="middle">all</text>
</svg>`]])}
${V.anat([[1,'shard'],' = ',[2,'hash(device_id)'],' ',[3,'% 3']],[
 '<b>Which database</b> stores this row.',
 '<b>The shard key</b>, turned into a number. Pick a key with many different values.',
 '<b>Number of shards.</b> The remainder is always 0, 1 or 2.'])}
${V.rules(V.rh('A good shard key'),
 V.ok('device_id, user_id','Spreads writes evenly and keeps related rows together'),V.no('created_at date','All of today\'s writes hit one hot shard'),
 V.no('a random number per row','Even, but one device\'s history is scattered everywhere'),V.no('JOIN across shards','Slow and hard: design so queries stay on one shard'))}
${V.hook(`Copies scale reads. Splits scale writes.`)}
`)}

${V.card(3,'Order of operations','sharding is the last resort',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Five steps from simplest to hardest: indexes, caching, read replicas, a bigger database, sharding">
<rect class="bx-ok" x="8" y="8" width="404" height="28" rx="6"/><text class="t" x="20" y="28">1. indexes and query fixes</text><rect class="bx-ok" x="38" y="42" width="374" height="28" rx="6"/><text class="t" x="50" y="62">2. caching</text><rect class="bx-ok" x="68" y="76" width="344" height="28" rx="6"/><text class="t" x="80" y="96">3. read replicas</text><rect class="bx-warn" x="98" y="110" width="314" height="28" rx="6"/><text class="t" x="110" y="130">4. a bigger database</text><rect class="bx-bad" x="128" y="144" width="284" height="28" rx="6"/><text class="t" x="140" y="164">5. sharding</text><text class="t-s" x="410" y="196" text-anchor="end">try them in this order</text>
</svg><figcaption>Each step down is harder to undo. Most apps never need the last one.</figcaption></figure>
${V.like(`<p>Before building an extension on your house, you tidy up, then add shelves, then rent a storage unit. Knocking walls down comes last, because it is expensive and hard to undo.</p>`)}
${V.build(`<ol><li>Phase 1, the news site: add one read replica and watch database load drop below 50%.</li><li>Phase 2, the IoT sensors: notice that more replicas barely help, because 70% of requests are writes.</li><li>Add shards until write load is under 60% with no errors.</li><li>Answer the questions: why replicas failed, and which shard key is best.</li></ol>`)}
${V.hook(`Fix the query, cache it, copy it, grow it, and only then split it.`)}
`)}

<div class="try"><b>Try it in your head</b>1. 95% of requests are reads. Replicas or shards? <i>Replicas.</i> 2. With 4 shards and key % 4, where does user 10 go? <i>Shard 2.</i> 3. Why might a user not see their new profile picture right after saving? <i>Replication lag: the read went to a replica that had not caught up.</i></div>
`);

explain('k6',`
<p>"Design a service like bit.ly" is the most famous system design interview question. It is small enough to finish in 45 minutes and touches every idea from this track. The secret is not a perfect answer, it is a calm, step-by-step method.</p>

${V.card(1,'The method','six steps, every time',`
<figure class="fig"><svg viewBox="0 0 420 196" role="img" aria-label="Six rising steps: clarify, estimate, API, data, design, dive in">
<rect class="bx-a" x="6" y="120" width="64" height="70" rx="6"/>${V.ic('chat',20,128,36,'ic-a')}<text class="t-b" x="38" y="186" text-anchor="middle" style="font-size:13.5px">Clarify</text><rect class="bx-a" x="75" y="100" width="64" height="90" rx="6"/>${V.ic('gear',89,108,36,'ic-a')}<text class="t-b" x="107" y="166" text-anchor="middle" style="font-size:13.5px">Estimate</text><rect class="bx-a" x="144" y="80" width="64" height="110" rx="6"/>${V.ic('terminal',158,88,36,'ic-a')}<text class="t-b" x="176" y="146" text-anchor="middle" style="font-size:13.5px">API</text><rect class="bx-a" x="213" y="60" width="64" height="130" rx="6"/>${V.ic('db',227,68,36,'ic-a')}<text class="t-b" x="245" y="126" text-anchor="middle" style="font-size:13.5px">Data</text><rect class="bx-a" x="282" y="40" width="64" height="150" rx="6"/>${V.ic('server',296,48,36,'ic-a')}<text class="t-b" x="314" y="106" text-anchor="middle" style="font-size:13.5px">Design</text><rect class="bx-a" x="351" y="20" width="64" height="170" rx="6"/>${V.ic('search',365,28,36,'ic-a')}<text class="t-b" x="383" y="86" text-anchor="middle" style="font-size:13.5px">Dive in</text>
</svg><figcaption>Climb in order. Each step uses what you learned on the one below.</figcaption></figure>
${V.like(`<p>Planning a school trip. First ask: where, how many pupils, what budget (clarify). Then count coaches and packed lunches (estimate). Then the timetable, the seating plan, the route, and finally the details: what if a coach breaks down?</p>`)}
${V.why(`<p>Interviewers grade how you think, not just the boxes you draw. Jumping straight to "microservices and Kafka" without asking how big the system is shows you are guessing. The steps keep you honest and make your reasoning easy to follow.</p>`)}
${V.rules(V.rh('Do'),
 V.ok('"Custom aliases? Expiry? Analytics?"','Clarify the features'),V.ok('"About 100M new links a month?"','Agree the scale'),
 V.ok('POST /links, GET /{code}','Sketch the API early'),V.no('drawing before asking','Every later choice depends on the requirements'))}
${V.hook(`Clarify, estimate, API, data, design, deep dive.`)}
`)}

${V.card(2,'Napkin maths','rough numbers, quickly',`
<figure class="fig"><svg viewBox="0 0 420 172" role="img" aria-label="100 million links a month is about 40 per second; 100 times as many redirects is about 4,000 per second; storage about 50 gigabytes">
<rect class="bx-info" x="8" y="10" width="404" height="46" rx="8"/><text class="t" x="20" y="39">new links</text><text class="t-m" x="400" y="39" text-anchor="end">100M/month ≈ 40/s</text>
<rect class="bx-warn" x="8" y="64" width="404" height="46" rx="8"/><text class="t" x="20" y="93">redirects (x100)</text><text class="t-m" x="400" y="93" text-anchor="end">≈ 4,000/s</text>
<rect class="bx-ok" x="8" y="118" width="404" height="46" rx="8"/><text class="t" x="20" y="147">storage</text><text class="t-m" x="400" y="147" text-anchor="end">100M x 500 B ≈ 50 GB</text>
</svg><figcaption>Round hard. A month is about 2.6 million seconds, so 100 million a month is roughly 40 a second.</figcaption></figure>
${V.like(`<p>Guessing how many sweets are in a jar: count one layer, count the layers, multiply. You do not need the exact number, just the right size: tens, thousands or millions.</p>`)}
${V.anat([[1,'100,000,000'],' ÷ ',[2,'2,600,000 s'],' ≈ ',[3,'40 writes/s'],'  x ',[4,'100']],[
 '<b>Links per month</b>, agreed while clarifying.',
 '<b>Seconds in a month</b>, roughly.',
 '<b>Average write rate.</b> Tiny for one database.',
 '<b>Read ratio.</b> Each link is clicked about 100 times, so about 4,000 redirects a second. This is a read-heavy system.'])}
${V.hook(`Round hard, multiply fast, then ask: does it fit on one machine?`)}
`)}

${V.card(3,'Short codes','base62: counting with 62 digits',`
${V.like(`<p>Car number plates. Using letters as well as digits lets a short plate cover millions of cars. Base62 uses 10 digits, 26 small letters and 26 capitals, so just 7 characters give 62⁷, about 3.5 trillion different codes.</p>`)}
${V.steps([
 ['Every new link gets the next unique id from the database, say <b>1000</b>. Base62 writes that number with 62 symbols: 0-9, a-z, A-Z.',`<svg viewBox="0 0 420 220" role="img" aria-label="id 1000">
<text class="t-s" x="10" y="20">alphabet: position → character</text><rect class="bx" x="10" y="28" width="41" height="40" rx="5"/><text class="t-m" x="30" y="54" text-anchor="middle" style="font-size:17px">0</text><text class="t-s" x="30" y="86" text-anchor="middle">0</text><rect class="bx" x="55" y="28" width="41" height="40" rx="5"/><text class="t-m" x="75" y="54" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="75" y="86" text-anchor="middle">1</text><rect class="bx" x="100" y="28" width="41" height="40" rx="5"/><text class="t-m" x="120" y="54" text-anchor="middle" style="font-size:17px">8</text><text class="t-s" x="120" y="86" text-anchor="middle">8</text><rect class="bx" x="145" y="28" width="41" height="40" rx="5"/><text class="t-m" x="165" y="54" text-anchor="middle" style="font-size:17px">9</text><text class="t-s" x="165" y="86" text-anchor="middle">9</text><rect class="bx" x="190" y="28" width="41" height="40" rx="5"/><text class="t-m" x="210" y="54" text-anchor="middle" style="font-size:17px">a</text><text class="t-s" x="210" y="86" text-anchor="middle">10</text><rect class="bx" x="235" y="28" width="41" height="40" rx="5"/><text class="t-m" x="255" y="54" text-anchor="middle" style="font-size:17px">g</text><text class="t-s" x="255" y="86" text-anchor="middle">16</text><rect class="bx" x="280" y="28" width="41" height="40" rx="5"/><text class="t-m" x="300" y="54" text-anchor="middle" style="font-size:17px">z</text><text class="t-s" x="300" y="86" text-anchor="middle">35</text><rect class="bx" x="325" y="28" width="41" height="40" rx="5"/><text class="t-m" x="345" y="54" text-anchor="middle" style="font-size:17px">A</text><text class="t-s" x="345" y="86" text-anchor="middle">36</text><rect class="bx" x="370" y="28" width="41" height="40" rx="5"/><text class="t-m" x="390" y="54" text-anchor="middle" style="font-size:17px">Z</text><text class="t-s" x="390" y="86" text-anchor="middle">61</text><text class="t-s" x="226" y="54" text-anchor="middle"></text><text class="t-m" x="10" y="124" style="font-size:18px">id = 1000</text><text class="t" x="10" y="156">divide by 62 and keep the remainders</text>
</svg>`],
 ['1000 ÷ 62 = 16, remainder <b>8</b>. Position 8 in the alphabet is the character <b>8</b>.',`<svg viewBox="0 0 420 220" role="img" aria-label="first remainder 8">
<text class="t-s" x="10" y="20">alphabet: position → character</text><rect class="bx" x="10" y="28" width="41" height="40" rx="5"/><text class="t-m" x="30" y="54" text-anchor="middle" style="font-size:17px">0</text><text class="t-s" x="30" y="86" text-anchor="middle">0</text><rect class="bx" x="55" y="28" width="41" height="40" rx="5"/><text class="t-m" x="75" y="54" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="75" y="86" text-anchor="middle">1</text><rect class="bx-hl" x="100" y="28" width="41" height="40" rx="5"/><text class="t-m" x="120" y="54" text-anchor="middle" style="font-size:17px">8</text><text class="t-s" x="120" y="86" text-anchor="middle">8</text><rect class="bx" x="145" y="28" width="41" height="40" rx="5"/><text class="t-m" x="165" y="54" text-anchor="middle" style="font-size:17px">9</text><text class="t-s" x="165" y="86" text-anchor="middle">9</text><rect class="bx" x="190" y="28" width="41" height="40" rx="5"/><text class="t-m" x="210" y="54" text-anchor="middle" style="font-size:17px">a</text><text class="t-s" x="210" y="86" text-anchor="middle">10</text><rect class="bx" x="235" y="28" width="41" height="40" rx="5"/><text class="t-m" x="255" y="54" text-anchor="middle" style="font-size:17px">g</text><text class="t-s" x="255" y="86" text-anchor="middle">16</text><rect class="bx" x="280" y="28" width="41" height="40" rx="5"/><text class="t-m" x="300" y="54" text-anchor="middle" style="font-size:17px">z</text><text class="t-s" x="300" y="86" text-anchor="middle">35</text><rect class="bx" x="325" y="28" width="41" height="40" rx="5"/><text class="t-m" x="345" y="54" text-anchor="middle" style="font-size:17px">A</text><text class="t-s" x="345" y="86" text-anchor="middle">36</text><rect class="bx" x="370" y="28" width="41" height="40" rx="5"/><text class="t-m" x="390" y="54" text-anchor="middle" style="font-size:17px">Z</text><text class="t-s" x="390" y="86" text-anchor="middle">61</text><text class="t-s" x="226" y="54" text-anchor="middle"></text><text class="t-m" x="10" y="124" style="font-size:17px">1000 ÷ 62 = 16 r 8</text><text class="t-m t-a" x="300" y="124" style="font-size:17px">→ 8</text>
</svg>`],
 ['16 ÷ 62 = 0, remainder <b>16</b>. Position 16 is <b>g</b> (a is 10, b is 11 ... g is 16). The quotient is 0, so stop.',`<svg viewBox="0 0 420 220" role="img" aria-label="second remainder 16 is g">
<text class="t-s" x="10" y="20">alphabet: position → character</text><rect class="bx" x="10" y="28" width="41" height="40" rx="5"/><text class="t-m" x="30" y="54" text-anchor="middle" style="font-size:17px">0</text><text class="t-s" x="30" y="86" text-anchor="middle">0</text><rect class="bx" x="55" y="28" width="41" height="40" rx="5"/><text class="t-m" x="75" y="54" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="75" y="86" text-anchor="middle">1</text><rect class="bx-hl" x="100" y="28" width="41" height="40" rx="5"/><text class="t-m" x="120" y="54" text-anchor="middle" style="font-size:17px">8</text><text class="t-s" x="120" y="86" text-anchor="middle">8</text><rect class="bx" x="145" y="28" width="41" height="40" rx="5"/><text class="t-m" x="165" y="54" text-anchor="middle" style="font-size:17px">9</text><text class="t-s" x="165" y="86" text-anchor="middle">9</text><rect class="bx" x="190" y="28" width="41" height="40" rx="5"/><text class="t-m" x="210" y="54" text-anchor="middle" style="font-size:17px">a</text><text class="t-s" x="210" y="86" text-anchor="middle">10</text><rect class="bx-hl" x="235" y="28" width="41" height="40" rx="5"/><text class="t-m" x="255" y="54" text-anchor="middle" style="font-size:17px">g</text><text class="t-s" x="255" y="86" text-anchor="middle">16</text><rect class="bx" x="280" y="28" width="41" height="40" rx="5"/><text class="t-m" x="300" y="54" text-anchor="middle" style="font-size:17px">z</text><text class="t-s" x="300" y="86" text-anchor="middle">35</text><rect class="bx" x="325" y="28" width="41" height="40" rx="5"/><text class="t-m" x="345" y="54" text-anchor="middle" style="font-size:17px">A</text><text class="t-s" x="345" y="86" text-anchor="middle">36</text><rect class="bx" x="370" y="28" width="41" height="40" rx="5"/><text class="t-m" x="390" y="54" text-anchor="middle" style="font-size:17px">Z</text><text class="t-s" x="390" y="86" text-anchor="middle">61</text><text class="t-s" x="226" y="54" text-anchor="middle"></text><text class="t-m" x="10" y="124" style="font-size:17px">1000 ÷ 62 = 16 r 8</text><text class="t-m t-a" x="300" y="124" style="font-size:17px">→ 8</text><text class="t-m" x="10" y="156" style="font-size:17px">  16 ÷ 62 =  0 r 16</text><text class="t-m t-a" x="300" y="156" style="font-size:17px">→ g</text>
</svg>`],
 ['Read the characters from the last one up: <b>g8</b>. Unique ids give unique codes, with no collisions to check.',`<svg viewBox="0 0 420 220" role="img" aria-label="code g8">
<text class="t-s" x="10" y="20">alphabet: position → character</text><rect class="bx" x="10" y="28" width="41" height="40" rx="5"/><text class="t-m" x="30" y="54" text-anchor="middle" style="font-size:17px">0</text><text class="t-s" x="30" y="86" text-anchor="middle">0</text><rect class="bx" x="55" y="28" width="41" height="40" rx="5"/><text class="t-m" x="75" y="54" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="75" y="86" text-anchor="middle">1</text><rect class="bx-hl" x="100" y="28" width="41" height="40" rx="5"/><text class="t-m" x="120" y="54" text-anchor="middle" style="font-size:17px">8</text><text class="t-s" x="120" y="86" text-anchor="middle">8</text><rect class="bx" x="145" y="28" width="41" height="40" rx="5"/><text class="t-m" x="165" y="54" text-anchor="middle" style="font-size:17px">9</text><text class="t-s" x="165" y="86" text-anchor="middle">9</text><rect class="bx" x="190" y="28" width="41" height="40" rx="5"/><text class="t-m" x="210" y="54" text-anchor="middle" style="font-size:17px">a</text><text class="t-s" x="210" y="86" text-anchor="middle">10</text><rect class="bx-hl" x="235" y="28" width="41" height="40" rx="5"/><text class="t-m" x="255" y="54" text-anchor="middle" style="font-size:17px">g</text><text class="t-s" x="255" y="86" text-anchor="middle">16</text><rect class="bx" x="280" y="28" width="41" height="40" rx="5"/><text class="t-m" x="300" y="54" text-anchor="middle" style="font-size:17px">z</text><text class="t-s" x="300" y="86" text-anchor="middle">35</text><rect class="bx" x="325" y="28" width="41" height="40" rx="5"/><text class="t-m" x="345" y="54" text-anchor="middle" style="font-size:17px">A</text><text class="t-s" x="345" y="86" text-anchor="middle">36</text><rect class="bx" x="370" y="28" width="41" height="40" rx="5"/><text class="t-m" x="390" y="54" text-anchor="middle" style="font-size:17px">Z</text><text class="t-s" x="390" y="86" text-anchor="middle">61</text><text class="t-s" x="226" y="54" text-anchor="middle"></text><text class="t-m" x="10" y="124" style="font-size:17px">1000 ÷ 62 = 16 r 8</text><text class="t-m t-a" x="300" y="124" style="font-size:17px">→ 8</text><text class="t-m" x="10" y="156" style="font-size:17px">  16 ÷ 62 =  0 r 16</text><text class="t-m t-a" x="300" y="156" style="font-size:17px">→ g</text><rect class="bx-ok" x="10" y="172" width="400" height="40" rx="8"/><text class="t-m" x="210" y="199" text-anchor="middle" style="font-size:18px">read bottom-up: sho.rt/g8</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('base62 of a unique id','Unique by design: no collision checks'),V.ok('random 7 characters','Also fine, but check the code is not already taken'),
 V.no('first 3 characters of MD5(url)','Only 4,096 possible codes: collisions everywhere'),V.ok('trade-off: ids are guessable','Say it out loud: g8 means g9 probably exists'))}
${V.hook(`Unique number in, short code out: divide by 62, read the remainders upwards.`)}
`)}

${V.card(4,'A click, end to end','following one redirect',`
${V.steps([
 ['You click <b>sho.rt/g8</b>. The browser sends <code>GET /g8</code>.',`<svg viewBox="0 0 420 216" role="img" aria-label="Browser sends GET /g8">
<rect class="bx-hl" x="6" y="20" width="88" height="84" rx="10"/>${V.ic('laptop',30,28,40,'ic-a')}<text class="t-b" x="50" y="94" text-anchor="middle">browser</text><rect class="bx" x="110" y="20" width="88" height="84" rx="10"/>${V.ic('sign',134,28,40,'')}<text class="t-b" x="154" y="94" text-anchor="middle">balancer</text><rect class="bx" x="214" y="20" width="88" height="84" rx="10"/>${V.ic('server',238,28,40,'')}<text class="t-b" x="258" y="94" text-anchor="middle">app</text><rect class="bx" x="318" y="20" width="88" height="84" rx="10"/>${V.ic('bulb',342,28,40,'')}<text class="t-b" x="362" y="94" text-anchor="middle">cache</text><rect class="bx-info" x="214" y="140" width="192" height="40" rx="8"/>${V.ic('db',222,144,30,'ic-info')}<text class="t-b" x="320" y="166" text-anchor="middle">database</text><text class="t-b" x="10" y="206">GET /g8</text>
</svg>`],
 ['The <b>load balancer</b> passes it to any healthy app server. They are stateless, so any one will do.',`<svg viewBox="0 0 420 216" role="img" aria-label="Load balancer picks a server">
<rect class="bx" x="6" y="20" width="88" height="84" rx="10"/>${V.ic('laptop',30,28,40,'')}<text class="t-b" x="50" y="94" text-anchor="middle">browser</text><rect class="bx-hl" x="110" y="20" width="88" height="84" rx="10"/>${V.ic('sign',134,28,40,'ic-a')}<text class="t-b" x="154" y="94" text-anchor="middle">balancer</text><rect class="bx" x="214" y="20" width="88" height="84" rx="10"/>${V.ic('server',238,28,40,'')}<text class="t-b" x="258" y="94" text-anchor="middle">app</text><rect class="bx" x="318" y="20" width="88" height="84" rx="10"/>${V.ic('bulb',342,28,40,'')}<text class="t-b" x="362" y="94" text-anchor="middle">cache</text><rect class="bx-info" x="214" y="140" width="192" height="40" rx="8"/>${V.ic('db',222,144,30,'ic-info')}<text class="t-b" x="320" y="166" text-anchor="middle">database</text><path class="ln-a" d="M95 62H99"/><polygon class="ah-a" points="97,56 97,68 109,62"/><text class="t-b" x="10" y="206">any app server can answer</text>
</svg>`],
 ['The app asks the <b>cache</b>: "g8?" Popular links are almost always there.',`<svg viewBox="0 0 420 216" role="img" aria-label="App asks the cache">
<rect class="bx" x="6" y="20" width="88" height="84" rx="10"/>${V.ic('laptop',30,28,40,'')}<text class="t-b" x="50" y="94" text-anchor="middle">browser</text><rect class="bx" x="110" y="20" width="88" height="84" rx="10"/>${V.ic('sign',134,28,40,'')}<text class="t-b" x="154" y="94" text-anchor="middle">balancer</text><rect class="bx-hl" x="214" y="20" width="88" height="84" rx="10"/>${V.ic('server',238,28,40,'ic-a')}<text class="t-b" x="258" y="94" text-anchor="middle">app</text><rect class="bx" x="318" y="20" width="88" height="84" rx="10"/>${V.ic('bulb',342,28,40,'')}<text class="t-b" x="362" y="94" text-anchor="middle">cache</text><rect class="bx-info" x="214" y="140" width="192" height="40" rx="8"/>${V.ic('db',222,144,30,'ic-info')}<text class="t-b" x="320" y="166" text-anchor="middle">database</text><path class="ln-a" d="M95 62H99"/><polygon class="ah-a" points="97,56 97,68 109,62"/><path class="ln-a" d="M199 62H203"/><polygon class="ah-a" points="201,56 201,68 213,62"/><path class="ln-a" d="M303 62H307"/><polygon class="ah-a" points="305,56 305,68 317,62"/><text class="t-b" x="10" y="206">cache: g8 → ?</text>
</svg>`],
 ['Cache hit: g8 means <code>https://example.com/a/very/long/page</code>. On a miss the app reads the database and stores the answer in the cache.',`<svg viewBox="0 0 420 216" role="img" aria-label="Cache hit">
<rect class="bx" x="6" y="20" width="88" height="84" rx="10"/>${V.ic('laptop',30,28,40,'')}<text class="t-b" x="50" y="94" text-anchor="middle">browser</text><rect class="bx" x="110" y="20" width="88" height="84" rx="10"/>${V.ic('sign',134,28,40,'')}<text class="t-b" x="154" y="94" text-anchor="middle">balancer</text><rect class="bx" x="214" y="20" width="88" height="84" rx="10"/>${V.ic('server',238,28,40,'')}<text class="t-b" x="258" y="94" text-anchor="middle">app</text><rect class="bx-hl" x="318" y="20" width="88" height="84" rx="10"/>${V.ic('bulb',342,28,40,'ic-a')}<text class="t-b" x="362" y="94" text-anchor="middle">cache</text><rect class="bx-info" x="214" y="140" width="192" height="40" rx="8"/>${V.ic('db',222,144,30,'ic-info')}<text class="t-b" x="320" y="166" text-anchor="middle">database</text><path class="ln-a" d="M95 62H99"/><polygon class="ah-a" points="97,56 97,68 109,62"/><path class="ln-a" d="M199 62H203"/><polygon class="ah-a" points="201,56 201,68 213,62"/><path class="ln-ok" d="M317 62H313"/><polygon class="ah-ok" points="315,56 315,68 303,62"/><text class="t-b t-ok" x="10" y="206">hit: the long URL, no database trip</text>
</svg>`],
 ['The app replies <b>302 Found</b> with a <code>Location</code> header holding the long URL. The browser follows it. Total time: a few milliseconds of server work.',`<svg viewBox="0 0 420 216" role="img" aria-label="302 redirect back to browser">
<rect class="bx-hl" x="6" y="20" width="88" height="84" rx="10"/>${V.ic('laptop',30,28,40,'ic-a')}<text class="t-b" x="50" y="94" text-anchor="middle">browser</text><rect class="bx" x="110" y="20" width="88" height="84" rx="10"/>${V.ic('sign',134,28,40,'')}<text class="t-b" x="154" y="94" text-anchor="middle">balancer</text><rect class="bx" x="214" y="20" width="88" height="84" rx="10"/>${V.ic('server',238,28,40,'')}<text class="t-b" x="258" y="94" text-anchor="middle">app</text><rect class="bx" x="318" y="20" width="88" height="84" rx="10"/>${V.ic('bulb',342,28,40,'')}<text class="t-b" x="362" y="94" text-anchor="middle">cache</text><rect class="bx-info" x="214" y="140" width="192" height="40" rx="8"/>${V.ic('db',222,144,30,'ic-info')}<text class="t-b" x="320" y="166" text-anchor="middle">database</text><path class="ln-ok" d="M258 106V124H50V116"/><polygon class="ah-ok" points="44,118 56,118 50,106"/><text class="t-b t-ok" x="10" y="206">302 Location: https://example.com/...</text>
</svg>`]])}
${V.anat([[1,'HTTP/1.1 302 Found'],'\n',[2,'Location: https://example.com/a/very/long/page']],[
 '<b>Status.</b> 302 means "temporarily over there". Browsers come back to you on every click, so you can count clicks.',
 '<b>Location header.</b> Where the browser should go next.'])}
${V.rules(V.rh('301 or 302?'),
 V.ok('302 Found','Every click passes through you: analytics work'),V.ok('301 Moved Permanently','Browsers cache it and stop asking: less load, but no click counts'),
 V.rh('Design choices'),
 V.ok('cache code → URL','99% reads with a 95% hit rate: the database barely notices'),V.ok('links(code PRIMARY KEY, url, ...)','Lookup by code is one index hit'))}
${V.build(`<ol><li>Answer the code-generation and 301 or 302 questions.</li><li>In the simulator, add a load balancer and enough app servers for 3,000 redirects a second.</li><li>Add a cache, then trim servers until p95 is under 100 ms and the bill is under $700 a month.</li><li>Do the storage maths: links times bytes per link.</li></ol>`)}
${V.hook(`Read-heavy? Cache first. Want the clicks? 302.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What is 62 in base62? <i>10: one sixty-two and zero ones.</i> 2. Why does a cache help this system so much? <i>99% of requests are reads of a few popular codes.</i> 3. A marketing team wants click counts. 301 or 302? <i>302.</i></div>
`);
