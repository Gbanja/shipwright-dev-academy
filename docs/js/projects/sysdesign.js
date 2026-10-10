/* Projects: System design */
(()=>{
const SC2={name:'Featured on a big blog',rps:2000,readRatio:0.9,staticShare:0.4,uploads:true,spof:true};
const SC3={name:'Viral',rps:6000,readRatio:0.95,staticShare:0.4,cacheHit:0.9,uploads:true,spof:true};
const SC4={name:'Notifications launch',rps:2500,readRatio:0.7,staticShare:0.2,cacheHit:0.8,uploads:true,spof:true,slowTask:{ms:400,share:0.15,what:'notification email'}};
const go=(sc,msg)=>()=>{const b=BENCH.design;b.s=Object.assign({},sc);b.render();toast(msg)};
const is=(ctx,n)=>ctx.scenario&&ctx.scenario.name===n;
const pct=u=>Math.round(u*100)+'%';
const notes=ctx=>ctx.m.notes.length?' The simulator says: '+ctx.m.notes[0]:'';

defineProjects('sysdesign',{
guided:{title:'Scale a photo-sharing app from launch to viral',kind:'design',scenario:{name:'Launch',rps:300,readRatio:0.85,uploads:true},maxP95:150,goal:'Each step names its own target. The traffic changes as your app grows.',
 pitch:'Grow one architecture through four traffic phases: launch, a traffic spike, going viral and a slow new feature. Add each component only when the numbers say you need it.',
 brief:`<p>You're the founding engineer of a photo-sharing app. Instead of drawing a giant architecture on day one, you'll do what good teams do: <b>start simple and add components only when the load test shows a bottleneck</b>.</p>
<p>The traffic scenario changes as you finish steps. Read the results panel after every change: it names the bottleneck.</p>
<div class="tip"><b>Goal</b>An architecture that survives viral traffic and a slow new feature, where you can explain why each component is there.</div>`,
 tasks:[
 {t:'Launch day (300 req/s): keep uploaded photos safe in object storage.',why:'One app server handles launch traffic easily, so don\'t over-build. But photos saved on a server\'s disk vanish when you add a second server or replace this one. Object storage (S3) keeps files outside the servers, so they become <b>stateless</b> and disposable.',h:'Turn on: Object storage (S3)',sol:{storage:true},done:go(SC2,'New phase: a big blog featured you. 2,000 requests/second!'),c:ctx=>is(ctx,'Launch')&&ctx.cfg.storage&&ctx.m.err===0},
 {t:'Featured on a big blog (2,000 req/s): put a load balancer in front of enough app servers that nothing fails.',why:'One server handles about 400 req/s. Adding servers (<b>horizontal scaling</b>) only works with a load balancer spreading the traffic, and two or more servers also remove the single point of failure. Add servers until the error rate hits 0.',h:'Turn on: Load balancer\nApp servers: + until Error rate is 0%',sol:{lb:true,app:6},c:ctx=>is(ctx,SC2.name)&&ctx.cfg.lb&&ctx.cfg.app>=2&&ctx.m.err===0},
 {t:'Same traffic: serve images and scripts from a CDN, and get p95 under 120 ms.',why:'40% of requests are static files. A CDN serves them from servers near your users, so they never reach your app servers. That\'s faster for users and cheaper than adding servers. Watch App load drop.',h:'Turn on: CDN',sol:{cdn:true},done:go(SC3,'New phase: you went viral. 6,000 requests/second!'),c:ctx=>is(ctx,SC2.name)&&ctx.cfg.cdn&&ctx.m.err===0&&ctx.m.p95<120},
 {t:'Viral (6,000 req/s): no errors, and database load under 60%.',why:'Two bottlenecks at once. Add app servers for the request volume, and look at DB load. 95% of requests are reads of the same popular photos, so a <b>cache</b> answers most of them from memory and the database barely notices.',h:'App servers: + (try 10–12)\nTurn on: Cache (Redis)',sol:{app:11,cache:true},done:go(SC4,'New phase: you shipped notifications. Each one sends an email (400 ms).'),c:ctx=>is(ctx,SC3.name)&&ctx.m.err===0&&ctx.cfg.cache&&ctx.m.dbU<0.6},
 {t:'Notifications launch: move the slow emails to a queue with enough workers, and get p95 under 150 ms.',why:'Sending an email takes 400 ms, and users shouldn\'t wait for it. Put a message on a <b>queue</b>, answer the user right away, and let <b>background workers</b> do the slow part. Add workers until they are under 80% busy, or the backlog grows forever.',h:'Turn on: Message queue\nBackground workers: + until worker load is under 80%',sol:{queue:true,workers:8},c:ctx=>is(ctx,SC4.name)&&ctx.cfg.queue&&ctx.m.tiers.workers&&ctx.m.tiers.workers.u<0.8&&ctx.m.err===0&&ctx.m.p95<150},
 ]},
solo:{title:'Design for a concert ticket drop',kind:'design',scenario:{name:'Ticket drop',rps:5000,readRatio:0.85,staticShare:0.3,cacheHit:0.85,spof:true,slowTask:{ms:500,share:0.05,what:'PDF ticket + email'}},maxP95:150,budget:950,goal:'0 errors · p95 < 150 ms · no single point of failure · app < 80% and DB < 60% busy · slow work off the request path · ≤ $950/month',
 pitch:'A ticket sale hits 5,000 requests per second at 10:00 sharp. Design an architecture that meets latency, reliability, headroom and budget targets all at once.',
 brief:`<p>A promoter is selling tickets for a stadium tour. At 10:00 sharp, 5,000 requests per second arrive: mostly people refreshing the event page, with static images, and some buying. Each purchase generates a <b>PDF ticket and an email</b>, which takes 500 ms.</p>
<p><b>The promoter's requirements</b></p><ul><li>No failed requests at peak.</li><li>p95 latency under 150 ms.</li><li>No single point of failure in the app tier.</li><li>Headroom for a bigger crowd than expected: app servers under 80% busy, database under 60%.</li><li>Ticket generation must not slow down requests, and the background work must keep up (workers under 80%).</li><li>At most <b>$950/month</b>.</li></ul>
<p>Start from one server and add components based on what the load test tells you. Submit when you think it\'s right.</p>`,
 tasks:[
 {t:'No failed requests at peak (0% errors).',c:ctx=>ctx.m.err===0,miss:ctx=>'Your design fails '+ctx.m.err+'% of requests.'+notes(ctx)},
 {t:'p95 latency under 150 ms.',c:ctx=>ctx.m.p95<150,miss:ctx=>'p95 is '+(ctx.m.p95>=9999?'timing out':ctx.m.p95+' ms')+'.'+(!ctx.cfg.cdn?' 30% of requests are static files that your app servers still serve. A CDN takes them off your servers.':ctx.m.appU>0.75?' App servers are at '+pct(ctx.m.appU)+': latency climbs steeply past ~75%.':!ctx.cfg.queue?' Every purchase waits 500 ms for the PDF and email. Move that to a queue.':' Look at which tier is busiest in the results.')},
 {t:'No single point of failure: a load balancer with at least 2 app servers.',c:ctx=>ctx.cfg.lb&&ctx.cfg.app>=2,miss:ctx=>!ctx.cfg.lb?'There is no load balancer, so all traffic goes through one app server. If it crashes at 10:00, the sale is over.':'You need at least 2 app servers behind the load balancer.'},
 {t:'Headroom: app servers under 80% busy and the database under 60%.',c:ctx=>ctx.m.appU<0.8&&ctx.m.dbU<0.6,miss:ctx=>ctx.m.appU>=0.8?'App servers are '+pct(ctx.m.appU)+' busy. A slightly bigger crowd would tip them over. Add servers, or take static traffic away with a CDN.':'The database is '+pct(ctx.m.dbU)+' busy. '+(ctx.m.readU>=ctx.m.writeU?(ctx.cfg.cache?'Reads are still the problem: consider a read replica.':'Most of that is repeated reads of the same event page. A cache is the cheapest fix.'):'Most of that is writes. Replicas don\'t help writes; sharding does, but check whether you really need it.')},
 {t:'Ticket generation runs on a queue, and workers keep up (under 80% busy).',c:ctx=>ctx.cfg.queue&&ctx.m.tiers.workers&&ctx.m.tiers.workers.u<0.8,miss:ctx=>!ctx.cfg.queue?'The 500 ms PDF and email still run inside the request. Add a message queue and background workers.':!ctx.cfg.workers?'The queue has no workers, so tickets are never generated. Fans would never get their tickets.':'Workers are '+pct(ctx.m.tiers.workers.u)+' busy. The backlog grows during the sale. Add workers (each handles about 50 jobs per second).'},
 {t:'Monthly cost is $950 or less.',c:ctx=>ctx.m.cost<=950,miss:ctx=>'Your design costs $'+ctx.m.cost+'/month. '+(ctx.cfg.replicas?'Read replicas cost $120 each; a $60 cache absorbs most of these reads. ':'')+(ctx.cfg.shards>1?'Shards cost $120 each, and the write load here doesn\'t need them. ':'')+(ctx.cfg.storage?'Nothing in this scenario uploads files, so object storage isn\'t needed. ':'')+'Remove what doesn\'t pull its weight.'},
 ],
 warn:[
  {c:ctx=>ctx.cfg.shards>1,m:'You added database shards. Sharding is a big operational commitment (cross-shard queries, rebalancing) and the write load didn\'t need it. Reach for it last.'},
  {c:ctx=>ctx.cfg.replicas>0&&!ctx.cfg.cache,m:'You scaled reads with replicas before trying a cache. For hot, repeated reads, a cache is cheaper and faster.'},
  {c:ctx=>ctx.cfg.app>=2&&ctx.m.appU<0.45,m:'Your app servers are under 45% busy. Some headroom is good, but this much is money spent on idle machines. Autoscaling would let you pay for the peak only during the peak.'},
  {c:ctx=>ctx.cfg.storage,m:'You turned on object storage, but nothing in this scenario stores files. Every component you add is something to run, monitor and pay for.'},
 ],
 ref:[{sol:{cdn:true,lb:true,app:12,cache:true,queue:true,workers:5}}]},
});
})();
