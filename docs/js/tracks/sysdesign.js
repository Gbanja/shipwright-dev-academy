/* Track 13: System design */
(()=>{
const SC_WRITE={name:'IoT sensor ingestion',rps:2000,readRatio:0.3};
defineTrack({id:'sysdesign',name:'System design',weeks:'3 weeks',
lessons:[
{id:'k1',lvl:'Foundations',title:'Clients, servers & APIs',kind:'none',
 sum:'Web systems are clients talking to servers over HTTP. REST exposes resources at URLs with standard methods; GraphQL lets clients ask for exactly the fields they need through one endpoint. Keep servers stateless (store sessions in a database or Redis) so any server can handle any request. GET, PUT and DELETE should be idempotent; POST usually isn\'t. Paginate large lists with cursors. Memory is far faster than disk, and disk far faster than a network round trip.',
 keys:['REST vs GraphQL','stateless servers','idempotency','cursor pagination','latency: memory ≪ disk ≪ network','status codes'],
 concept:`<p>System design is about making a working app keep working when it has 100× more users. It starts with how the pieces talk.</p>
<div class="tbl-wrap"><table><tr><th>Idea</th><th>What it means</th></tr>
<tr><td><b>REST</b></td><td>Resources at URLs (<code>GET /users/42</code>), standard methods and status codes, cache-friendly</td></tr>
<tr><td><b>GraphQL</b></td><td>One endpoint; the client asks for exactly the fields it needs. Great for complex UIs, harder to cache</td></tr>
<tr><td><b>Stateless</b></td><td>Servers keep no user data in memory between requests, so any server can handle any request</td></tr>
<tr><td><b>Idempotent</b></td><td>Doing it twice has the same effect as once (GET, PUT, DELETE). Retries are safe</td></tr>
<tr><td><b>Pagination</b></td><td>Return data in pages. Cursors (<code>?after=abc</code>) beat offsets on big, changing tables</td></tr></table></div>
<h4>Latency numbers to know (roughly)</h4>
<ul><li>Read from memory: ~100 nanoseconds</li><li>Read from SSD: ~100 microseconds (1,000× slower)</li><li>Round trip in the same data center: ~0.5 ms</li><li>Round trip between continents: ~150 ms</li></ul>
<p>That's why caches (memory) and CDNs (servers near users) matter so much. The next lessons are hands-on simulations.</p>`,
 tasks:[
  {t:'A mobile app needs a few fields from users, posts and comments in one screen. Which API style fits best?',o:['SOAP','GraphQL, so the client can request exactly those fields in one call','FTP','Raw SQL from the app'],a:1,e:'GraphQL avoids over-fetching and multiple round trips. REST works too, with more endpoints or calls.'},
  {t:'Why keep app servers stateless?',o:['They use less CPU','Any server can handle any request, so you can add or remove servers freely','Statelessness is required by HTTP','To avoid using a database'],a:1,e:'Put sessions in Redis or a database, not in one server\'s memory.'},
  {t:'A client times out and retries a payment request. What protects the user from being charged twice?',o:['Nothing','An idempotency key: the server recognizes the repeated request and returns the first result','A bigger timeout','GraphQL'],a:1,e:'Stripe and most payment APIs use idempotency keys for exactly this.'},
  {t:'Which HTTP methods should be idempotent?',o:['POST only','GET, PUT and DELETE','Only PATCH','None'],a:1,e:'Deleting something twice leaves it deleted; creating with POST twice usually makes two records.'},
  {t:'Paginating a feed that gets new posts every second. Better approach?',o:['OFFSET 100000','Cursor-based: ?after=<last id>','Return everything','Random sampling'],a:1,e:'Offsets get slow on big tables and skip or duplicate items when new rows arrive.'},
  {t:'Roughly how much slower is a cross-continent network round trip than a memory read?',o:['2×','About a million times','The same','10×'],a:1,e:'~150 ms vs ~100 ns. Network calls are the expensive part.'},
 ]},
{id:'k2',lvl:'Scaling',title:'Scaling out: load balancers & horizontal scaling',kind:'design',parts:['lb','app'],scenario:{name:'Launch day',rps:1500,readRatio:0.8,spof:true},goal:'No errors, p95 under 200 ms, no single point of failure, at most $350/month.',maxP95:200,budget:350,
 sum:'Vertical scaling means a bigger machine; horizontal scaling means more machines behind a load balancer, which removes the single point of failure. Servers degrade sharply as they approach full utilization, so plan for headroom (about 70–80% busy at peak). Size the fleet from traffic: required servers ≈ peak requests per second ÷ capacity per server ÷ target utilization.',
 keys:['vertical vs horizontal scaling','load balancer','single point of failure','utilization headroom (~75%)','servers = rps ÷ capacity ÷ target'],
 concept:`<p>Your app gets featured and traffic jumps to <b>1,500 requests/second</b>. One server handles about 400.</p>
<ul><li><b>Vertical scaling</b> (a bigger server) is simple but has a ceiling, and it's still one machine that can fail.</li>
<li><b>Horizontal scaling</b> (more servers) needs a <b>load balancer</b> to spread requests, and survives a server dying.</li></ul>
<p>Latency explodes as servers approach 100% busy: requests queue up. Real teams aim for about 70–80% at peak.</p>
<pre class="snip" style="margin-bottom:12px">servers needed ≈ 1500 rps ÷ 400 rps per server ÷ 0.75 target ≈ 5</pre>
<p>Use the controls to change the architecture. The load test re-runs instantly.</p>`,
 tasks:[
  {t:'Before changing anything: why is the site failing at 1,500 requests/second?',o:['The database is full','One app server can only handle ~400 rps, so it is overloaded and requests time out','DNS is down','The CDN is missing'],a:1,e:'Look at App load in the results: far above 100%.'},
  {t:'Add a load balancer and enough app servers that no requests fail.',sol:{lb:true,app:4},c:ctx=>ctx.cfg.lb&&ctx.m.err===0},
  {t:'Get p95 latency under 200 ms.',sol:{lb:true,app:5},c:ctx=>ctx.m.err===0&&ctx.m.p95<200},
  {t:'Meet every goal: no errors, p95 < 200 ms, at least 2 servers behind the balancer, at most $350/month.',c:ctx=>ctx.cfg.lb&&ctx.cfg.app>=2&&ctx.m.err===0&&ctx.m.p95<200&&ctx.m.cost<=350},
  {t:'Users get logged out when the load balancer sends them to a different server. Fix?',o:['Sticky sessions forever','Store sessions in a shared store (Redis or the database) so servers stay stateless','Use one server','Turn off the load balancer'],a:1,e:'Shared session storage lets any server handle any request.'},
 ]},
{id:'k3',lvl:'Scaling',title:'Caching & CDNs',kind:'design',parts:['cdn','lb','app','cache'],start:{lb:true,app:9},scenario:{name:'Black Friday sale',rps:4000,readRatio:0.95,staticShare:0.3,cacheHit:0.8},goal:'No errors, p95 under 150 ms, at most $620/month.',maxP95:150,budget:620,
 sum:'Caches keep frequently read data in memory (Redis) so the database isn\'t hit every time. With cache-aside, the app reads from the cache, falls back to the database on a miss, and stores the result with a TTL. CDNs serve static files (images, JS, CSS) from servers near users, removing that traffic from your app entirely. The hard part is invalidation: decide how stale data may be, and use TTLs or explicit invalidation when data changes.',
 keys:['cache-aside','hit rate','TTL','cache invalidation','CDN for static assets','read-heavy workloads'],
 concept:`<p>Black Friday: <b>4,000 rps</b>, 95% reads, and 30% of requests are static files (images, JS, CSS).</p>
<h4>Cache-aside (the most common pattern)</h4>
<pre class="snip" style="margin-bottom:12px">value = redis.get(key)
if value is missing:                  # cache miss
    value = db.query(...)
    redis.set(key, value, ttl=60)     # remember it for 60 s
return value</pre>
<p>With an 80% hit rate, the database sees only a fifth of the reads.</p>
<h4>CDNs</h4><p>A CDN (Cloudflare, CloudFront, Vercel's edge network) caches static files at hundreds of locations worldwide. Users get them faster, and your servers never see those requests.</p>
<div class="tip"><b>The famous hard problem</b>"There are only two hard things in computer science: cache invalidation and naming things." Decide how stale each piece of data is allowed to be.</div>`,
 tasks:[
  {t:'Add a cache so the database drops below 50% load.',sol:{cache:true},c:ctx=>ctx.cfg.cache&&ctx.m.dbU<0.5},
  {t:'Serve static files from a CDN so app servers stop seeing them.',sol:{cdn:true},c:ctx=>ctx.cfg.cdn&&ctx.m.appU<0.9},
  {t:'Meet every goal: no errors, p95 < 150 ms, at most $620/month.',c:ctx=>ctx.m.err===0&&ctx.m.p95<150&&ctx.m.cost<=620},
  {t:'A product\'s price changes but users still see the old one for a while. Why?',o:['The CDN is broken','The cached value hasn\'t expired or been invalidated yet','The database lost data','Users\' browsers are slow'],a:1,e:'Pick sensible TTLs, and delete or update the cache entry when the data changes.'},
  {t:'In cache-aside, what happens on a cache miss?',o:['Return an error','Read from the database, then store the result in the cache','Wait for the cache','Restart Redis'],a:1,e:'The next request for that key is a hit.'},
 ]},
{id:'k4',lvl:'Async work',title:'Queues & background jobs',kind:'design',parts:['lb','app','queue','workers','cache'],start:{lb:true,app:3},scenario:{name:'Sign-up surge',rps:800,readRatio:0.7,slowTask:{ms:400,share:0.1,what:'welcome email + PDF receipt'}},goal:'No errors and p95 under 150 ms.',maxP95:150,
 sum:'Don\'t make users wait for slow work they don\'t need right away (emails, PDFs, image resizing, webhooks). Put a job on a queue (SQS, RabbitMQ, Redis-based queues like BullMQ) and return immediately; background workers process jobs at their own pace. Size workers so throughput beats the arrival rate, and make jobs idempotent, because queues usually deliver at least once and retries will happen.',
 keys:['queue + workers','return early, process later','throughput ≥ arrival rate','at-least-once delivery','idempotent jobs','retries + dead-letter queue'],
 concept:`<p>When someone signs up, your app sends a welcome email and generates a PDF receipt. That takes about <b>400 ms</b>, and the user waits for all of it.</p>
<div class="flow"><span>Request</span><em>→</em><span>App saves user</span><em>→ enqueue job →</em><span>Queue</span><em>→</em><span>Worker sends email</span></div>
<p>With a queue, the app adds a small job message and responds immediately. Workers pick up jobs in the background.</p>
<ul><li>Each worker here processes ~50 jobs/second. If jobs arrive faster than workers finish them, the queue grows forever.</li><li>Queues usually deliver <b>at least once</b>, so a job may run twice. Make jobs <b>idempotent</b> (for example, check "email already sent for user 42?").</li><li>Failed jobs are retried and eventually go to a <b>dead-letter queue</b> for a human to inspect.</li></ul>`,
 tasks:[
  {t:'Move the slow work to a queue, with enough workers to keep up.',sol:{queue:true,workers:2},c:ctx=>ctx.cfg.queue&&ctx.cfg.workers>0&&ctx.m.tiers.workers&&ctx.m.tiers.workers.u<1},
  {t:'Meet the goal: no errors and p95 under 150 ms.',c:ctx=>ctx.m.err===0&&ctx.m.p95<150&&ctx.cfg.queue},
  {t:'A worker crashes halfway through sending an email, and the job is retried. What must the job be?',o:['Fast','Idempotent: running it twice must not send two emails','Encrypted','Synchronous'],a:1,e:'Record what was done (or use a unique message id) and skip work that already happened.'},
  {t:'Which work should NOT go on a background queue?',o:['Sending a welcome email','Resizing uploaded photos','Checking the password when a user logs in','Generating a monthly report'],a:2,e:'The user needs the login result right now. Queues are for work that can happen later.'},
 ]},
{id:'k5',lvl:'Data at scale',title:'Database replication & sharding',kind:'design',parts:['lb','app','replicas','shards'],start:{lb:true,app:7},scenario:{name:'Read-heavy news site',rps:2000,readRatio:0.97},goal:'Keep the database under 50% load, then handle a write-heavy workload.',maxP95:200,
 sum:'Read replicas copy the primary database and serve read queries, which scales read-heavy apps (with slight replication lag). Writes still go to the primary, so replicas don\'t help write-heavy workloads. Sharding splits data across several databases by a shard key (user_id, device_id) so writes scale too. A good shard key spreads load evenly and keeps related data together. Sharding adds a lot of complexity, so exhaust simpler options first.',
 keys:['primary + read replicas','replication lag','replicas don\'t scale writes','sharding by key','even shard key distribution','sharding is a last resort'],
 concept:`<div class="tbl-wrap"><table><tr><th></th><th>Read replicas</th><th>Sharding</th></tr>
<tr><td>How</td><td>Copies of the whole database; reads spread across them</td><td>Data split by key: users 1–1M on shard A, 1M–2M on shard B…</td></tr>
<tr><td>Scales</td><td>Reads</td><td>Reads <b>and</b> writes</td></tr>
<tr><td>Cost</td><td>Replication lag (replicas can be slightly behind)</td><td>Cross-shard queries and joins get hard; resharding is painful</td></tr></table></div>
<p>This lesson has two phases. First a news site where 97% of requests are reads. After you fix it, the scenario switches to an IoT system where sensors mostly <i>write</i>.</p>
<div class="tip"><b>Order of operations</b>Indexes and query fixes → caching → read replicas → vertical scaling → only then sharding.</div>`,
 tasks:[
  {t:'Phase 1: get database load under 50% for the read-heavy news site.',sol:{replicas:1},done:()=>{const b=BENCH.design;b.s=Object.assign({},SC_WRITE);b.render();toast('New scenario: IoT sensor ingestion (70% writes)')},c:ctx=>ctx.scenario.readRatio>0.9&&ctx.cfg.replicas>=1&&ctx.m.dbU<0.5},
  {t:'Phase 2 (IoT, 70% writes): get write load under 60%.',sol:{shards:3},c:ctx=>ctx.scenario.readRatio<0.5&&ctx.m.writeU<0.6&&ctx.m.err===0},
  {t:'Why didn\'t adding replicas fix the write-heavy workload?',o:['Replicas were misconfigured','Every write must go to the primary (and then be copied to each replica), so replicas only add read capacity','Replicas are slower','The load balancer was off'],a:1,e:'Replicas multiply read capacity, not write capacity.'},
  {t:'Best shard key for sensor readings?',o:['created_at date (all of today\'s writes hit one shard)','device_id (spreads writes evenly, keeps each device\'s data together)','country','A random number per row'],a:1,e:'A date key creates a hot shard; random keys scatter related data. device_id balances both concerns.'},
 ]},
{id:'k6',lvl:'Interview',title:'Interview: design a URL shortener',kind:'design',parts:['lb','app','cache','replicas'],scenario:{name:'Short links (redirects)',rps:3000,readRatio:0.99,cacheHit:0.95},goal:'No errors, p95 under 100 ms, at most $700/month.',maxP95:100,budget:700,
 sum:'Approach design interviews in steps: clarify requirements and scale, estimate numbers (napkin math), sketch the API and data model, design the high-level architecture, then deep-dive into bottlenecks and trade-offs. A URL shortener is read-heavy (about 99% redirects), so caching lookups is the biggest win. Generate codes by base62-encoding a unique ID (or random codes with a collision check), and choose 301 vs 302 based on whether you need click analytics.',
 keys:['clarify → estimate → API → data model → architecture → deep dive','napkin math','base62 IDs','301 vs 302','read-heavy → cache','trade-offs out loud'],
 concept:`<p>A classic interview question: <i>"Design a service like bit.ly."</i> A good answer follows a structure:</p>
<ol><li><b>Clarify</b>: custom aliases? expiry? analytics? About 100M new links a month, mostly reads.</li>
<li><b>Estimate</b>: about 40 new links/s on average; with a 100:1 read ratio, about 4,000 redirects/s at peak.</li>
<li><b>API</b>: <code>POST /links {url}</code> → <code>{code}</code>; <code>GET /{code}</code> → redirect.</li>
<li><b>Data</b>: <code>links(code PRIMARY KEY, url, created_at, owner_id)</code>.</li>
<li><b>Architecture</b>: load balancer → stateless app servers → cache → database.</li>
<li><b>Deep dive</b>: code generation, caching, hot links, analytics.</li></ol>
<pre class="snip" style="margin-bottom:12px">base62 = 0-9 a-z A-Z  →  7 characters ≈ 62⁷ ≈ 3.5 trillion codes</pre>
<p>Now build an architecture for the redirect traffic and meet the goals.</p>`,
 tasks:[
  {t:'How should you generate short codes?',o:['MD5 of the URL, first 3 characters','Base62-encode a unique, increasing ID (or random codes with a uniqueness check)','The current timestamp','Ask users to choose'],a:1,e:'Unique IDs give unique codes; 3 characters of a hash collide constantly.'},
  {t:'You want click analytics. Which redirect status?',o:['301 Moved Permanently','302 Found (temporary), so every click comes back through your servers','200 OK','404'],a:1,e:'Browsers cache 301s and stop asking you, which kills your analytics. 302 keeps every click visible.'},
  {t:'Build it: no errors, p95 under 100 ms, at most $700/month.',sol:{lb:true,app:12,cache:true},c:ctx=>ctx.m.err===0&&ctx.m.p95<100&&ctx.m.cost<=700},
  {t:'Napkin math: 100 million links × ~500 bytes each is about…',o:['50 MB','50 GB','50 TB','5 PB'],a:1,e:'10⁸ × 500 B = 5 × 10¹⁰ B ≈ 50 GB. That fits on one database server.'},
  {t:'Which single change gave the biggest win for this read-heavy system?',o:['More shards','A cache in front of the database for code → URL lookups','A message queue','A bigger load balancer'],a:1,e:'At 99% reads with a 95% hit rate, the database barely gets touched.'},
 ]},
],
quizzes:{sysdesign:[
 {q:'What does a load balancer give you?',o:['Faster SQL','Traffic spread across servers, and no single point of failure','Encryption','Caching'],a:1,e:'It also lets you deploy servers one at a time.'},
 {q:'Why do latencies spike when servers are near 100% busy?',o:['Bugs','Requests queue up waiting; queueing delay grows sharply near full utilization','DNS','Logging'],a:1,e:'Plan for headroom.'},
 {q:'Best fit for caching?',o:['Data read often and changed rarely','Data written once and never read','Passwords','Random numbers'],a:0,e:'High read-to-write ratio means high hit rate.'},
 {q:'A queue delivers "at least once". So your jobs must be…',o:['Fast','Idempotent','Encrypted','Small'],a:1,e:'Duplicate deliveries must be harmless.'},
 {q:'Read replicas help with…',o:['Write-heavy workloads','Read-heavy workloads','Schema migrations','Backups only'],a:1,e:'Writes still go to the primary.'},
 {q:'First step in a system design interview?',o:['Draw microservices','Clarify requirements and scale','Pick a database','Write code'],a:1,e:'Everything else depends on the requirements.'},
]},
real:[
 {id:'sd-r1',t:'Read "Designing Data-Intensive Applications"',p:'The classic book on how databases, replication, partitioning and streams really work. One chapter a week.',s:'# Martin Kleppmann, O\'Reilly'},
 {id:'sd-r2',t:'Work through the System Design Primer',p:'A free GitHub repo with diagrams, examples and practice questions.',s:'# github.com/donnemartin/system-design-primer'},
 {id:'sd-r3',t:'Draw the architecture of an app you\'ve built',p:'Diagram every component and data flow, estimate its traffic limits, and find the first bottleneck.',s:'# excalidraw.com is great for this'},
 {id:'sd-r4',t:'Do 3 mock design interviews',p:'Practise URL shortener, chat app and news feed designs out loud, 45 minutes each.',s:'# clarify → estimate → API → data → architecture → deep dive'},
]});
})();
