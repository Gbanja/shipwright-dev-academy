/* cloud: "Understand it" visual walkthroughs. */
{
const rentF=(k,label)=>{
 const msg=['$ aws ec2 run-instances ...','AWS finds a free slot in a real machine','i-05a8c1e3f7b9d2468  running  (meter on)','$ aws ec2 terminate-instances ...  (meter off)'][k];
 let s='';for(let r=0;r<2;r++)for(let c=0;c<4;c++){const x=132+c*70,y=34+r*58,me=r===0&&c===2;s+=(me&&k>0&&k<3?`<rect class="bx-hl" x="${x-6}" y="${y-4}" width="56" height="54" rx="6"/>`:'')+V.ic('server',x,y,44,me&&k===2?'ic-ok':me&&k===3?'ic-info':'ic-info')+(me&&k===3?V.ic('cross',x+24,y+24,22,'ic-bad'):'')+(me&&k===2?V.ic('check',x+24,y+24,22,'ic-ok'):'')}
 return `<svg viewBox="0 0 420 200" role="img" aria-label="${label}">
${V.ic('laptop',8,52,60,'ic-a')}<text class="t" x="38" y="130" text-anchor="middle">you</text>
${k===0?'<path class="ln-a" style="stroke-width:3" d="M72 82H104"/><polygon class="ah-a" points="102,75 102,89 114,82"/>':''}
<rect class="ln-d" x="116" y="8" width="296" height="142" rx="10"/><text class="t-s" x="128" y="26" style="font-size:14px">data centre, us-east-1</text>
${s}
<rect class="bx-dark" x="8" y="160" width="404" height="34" rx="8"/><text class="t-term" x="20" y="183" style="font-size:14px">${msg}</text>
</svg>`};
const azF=(down,label,msg,ok)=>{
 const Z=['2a','2b','2c'];
 return `<svg viewBox="0 0 420 200" role="img" aria-label="${label}">
<rect class="bx-info" x="6" y="6" width="408" height="148" rx="10"/><text class="t-b t-info" x="18" y="30">Region eu-west-2 (London)</text>
${Z.map((z,i)=>{const x=18+i*134,isDown=down.includes(i),runs=i<2;return `<rect class="${isDown?'bx-bad':'bx'}" x="${x}" y="42" width="120" height="102" rx="8"/><text class="t-m" x="${x+60}" y="64" text-anchor="middle" style="font-size:14px">eu-west-${z}</text>`+V.ic(isDown?'cross':'server',x+38,72,44,isDown?'ic-bad':runs?'ic-ok':'ic-info')+`<text class="t ${isDown?'t-bad':runs?'t-ok':''}" x="${x+60}" y="136" text-anchor="middle" style="font-size:14px">${isDown?'power cut':runs?'your app':'spare'}</text>`}).join('')}
${V.ic('people',8,158,38,ok?'ic-ok':'ic-bad')}<text class="t-b ${ok?'t-ok':'t-bad'}" x="54" y="184">${msg}</text>
</svg>`};

explain('c1',`
<p>Netflix, Duolingo and millions of small apps do not own most of the computers they run on. They rent them, by the second, from giant buildings full of machines. That is "the cloud".</p>

${V.card(1,'Renting computers','the cloud is someone else\'s data centre',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A data centre full of server racks; you rent one machine and pay by the hour">
<polygon class="bx" points="120,40 266,8 412,40"/><rect class="bx" x="120" y="40" width="292" height="122"/>
${V.ic('server',138,54,44,'ic-info')}${V.ic('server',206,54,44,'ic-info')}${V.ic('server',274,54,44,'ic-info')}${V.ic('server',342,54,44,'ic-info')}
${V.ic('server',138,108,44,'ic-info')}<rect class="bx-ok" x="200" y="102" width="56" height="56" rx="6"/>${V.ic('server',206,108,44,'ic-ok')}${V.ic('server',274,108,44,'ic-info')}${V.ic('server',342,108,44,'ic-info')}
${V.ic('person',14,40,60,'ic-a')}<text class="t" x="44" y="124" text-anchor="middle">you</text>
<text class="t-m t-ok" x="44" y="152" text-anchor="middle" style="font-size:14px">pay by</text><text class="t-m t-ok" x="44" y="168" text-anchor="middle" style="font-size:14px">the hour</text>
</svg><figcaption>A cloud provider owns huge buildings full of computers, called data centres. You rent a slice of one machine over the internet and pay only while you use it.</figcaption></figure>
${V.like(`<p>Hiring a bike from a city bike rack. You do not buy a bike, store it or fix its brakes. You unlock one with your phone, ride, drop it off and pay for the minutes.</p>`)}
${V.why(`<p>Companies used to buy their own servers: wait weeks for delivery, guess how many they would need, and pay for them even when idle. In 2006 Amazon started renting out spare computing as Amazon Web Services (AWS). Microsoft Azure and Google Cloud followed.</p>`)}
${V.steps([
 ['You ask for a computer with one command (or a click in the web console).',rentF(0,'You request a server')],
 ['AWS finds room on one of its real machines. Your server is a <b>virtual machine</b>: a software computer sharing that hardware.',rentF(1,'AWS picks a slot')],
 ['Seconds later it is running and has an ID. The meter starts.',rentF(2,'The server is running')],
 ['When you are done you terminate it. The slot goes back to the pool and the meter stops.',rentF(3,'Terminated, meter off')]])}
${V.hook(`The cloud is just someone else's computer, rented by the second.`)}
`)}

${V.card(2,'IaaS, PaaS, serverless, SaaS','how much do you want to look after?',`
<figure class="fig"><svg viewBox="0 0 420 218" role="img" aria-label="Who manages each layer: in IaaS you manage almost everything, in SaaS the provider manages everything">
<text class="t-b" x="141" y="24" text-anchor="middle" style="font-size:14px">IaaS</text><text class="t-b" x="219" y="24" text-anchor="middle" style="font-size:14px">PaaS</text><text class="t-b" x="297" y="24" text-anchor="middle" style="font-size:14px">Serverless</text><text class="t-b" x="375" y="24" text-anchor="middle" style="font-size:14px">SaaS</text>
${['your code','scaling','runtime','OS','hardware'].map((r,i)=>{const y=36+i*31;const who=[[1,1,1,0],[1,1,0,0],[1,0,0,0],[1,0,0,0],[0,0,0,0]][i];return `<text class="t" x="8" y="${y+19}" style="font-size:14px">${r}</text>`+who.map((w,c)=>`<rect class="${w?'bx-a':'bx-ok'}" x="${104+c*78}" y="${y}" width="74" height="26" rx="4"/>`).join('')}).join('')}
<rect class="bx-a" x="104" y="196" width="18" height="18" rx="3"/><text class="t" x="128" y="210" style="font-size:14px">you</text>
<rect class="bx-ok" x="190" y="196" width="18" height="18" rx="3"/><text class="t" x="214" y="210" style="font-size:14px">the provider</text>
</svg><figcaption>Moving right, the provider takes over more layers. You do less work but have less control.</figcaption></figure>
${V.like(`<p>Pizza. <b>IaaS</b>: they rent you a kitchen, you make everything. <b>PaaS</b>: you bring your recipe, they cook it. <b>Serverless</b>: they cook one slice each time someone orders. <b>SaaS</b>: you just eat at the restaurant.</p>`)}
${V.rules(V.rh('Examples'),V.ok('IaaS','AWS EC2, DigitalOcean droplets'),V.ok('PaaS','Vercel, Render, Heroku, Elastic Beanstalk'),
 V.ok('Serverless','AWS Lambda, Cloudflare Workers'),V.ok('SaaS','Gmail, Slack, GitHub'))}
${V.hook(`Kitchen, chef, slice, restaurant: the further right, the less you manage.`)}
`)}

${V.card(3,'Regions and availability zones','do not keep all your eggs in one building',`
${V.like(`<p>A shop chain with two branches in the same city. If one branch floods, customers walk to the other. A <b>region</b> is the city; an <b>availability zone</b> (AZ) is one branch: a separate data centre with its own power and network.</p>`)}
${V.steps([
 ['Your app runs in two availability zones inside the London region.',azF([],'App in two zones','Users: all fine',1)],
 ['A power cut takes out zone eu-west-2a. Its copy of your app goes dark.',azF([0],'Zone 2a fails','Half the servers are gone...',0)],
 ['Traffic simply goes to eu-west-2b. Users never notice. Had you used one zone only, the site would be down.',azF([0],'Traffic moves to 2b','Users: still fine',1)]])}
${V.rules(V.rh('Naming'),V.ok('us-east-1, eu-west-2','Region codes: area, direction, number'),V.ok('eu-west-2a','An AZ: the region code plus a letter'),
 V.rh('Conventions'),V.ok('at least two AZs','For anything that must stay up'),V.ok('a region near your users','Shorter distance, faster pages'))}
${V.hook(`Region is the city, zone is the building. Use two buildings.`)}
`)}

${V.card(4,'Your account and the CLI','who locks which door',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="AWS secures the building and hardware; you secure your data, permissions and passwords">
<rect class="bx-info" x="6" y="6" width="200" height="158" rx="10"/>${V.ic('house',20,16,46,'ic-info')}<text class="t-b" x="74" y="46">AWS secures</text>
<text class="t" x="20" y="92" style="font-size:14px">buildings and guards</text><text class="t" x="20" y="118" style="font-size:14px">hardware and network</text><text class="t" x="20" y="144" style="font-size:14px">the cloud itself</text>
<rect class="bx-a" x="214" y="6" width="200" height="158" rx="10"/>${V.ic('key',228,16,46,'ic-a')}<text class="t-b" x="282" y="46">You secure</text>
<text class="t" x="228" y="92" style="font-size:14px">your data</text><text class="t" x="228" y="118" style="font-size:14px">who has permission</text><text class="t" x="228" y="144" style="font-size:14px">passwords and keys</text>
</svg><figcaption>The shared responsibility model. AWS protects the cloud; you protect what you put in it.</figcaption></figure>
${V.like(`<p>A landlord and a tenant. The landlord keeps the building safe; if you leave your own front door open, that is on you.</p>`)}
${V.anat([[1,'aws'],' ',[2,'sts'],' ',[3,'get-caller-identity']],[
 '<b>aws.</b> The AWS command-line tool. Set it up once with <code>aws configure</code>: access key, secret key, region, output format.',
 '<b>Service.</b> Which AWS service to talk to. STS is the security token service.',
 '<b>Operation.</b> What to ask it. This one answers "who am I logged in as?"'])}
${V.rules(V.rh('Day one rules'),V.ok('MFA on the root user','The root login can do anything: protect it with a second factor'),
 V.ok('a billing alarm','Get an email before a forgotten server costs you money'),V.no('access keys in Git','Bots find them within minutes and run up huge bills'),
 V.no('using root every day','Create a separate everyday login'))}
${V.build(`<ol><li>Run <code>aws configure</code> and answer its four questions.</li><li>Check who you are with <code>aws sts get-caller-identity</code>.</li><li>In a real account: turn on MFA for root and create a budget alert.</li></ol>`)}
${V.hook(`AWS locks the building; you lock your own door.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Vercel builds and hosts your code; you never see a server. Which model? <i>PaaS.</i> 2. How do you survive one data centre losing power? <i>Run in at least two availability zones.</i> 3. Who secures your bucket's permissions? <i>You.</i></div>
`);

const lifeF=(k,cmd,bill,label)=>{
 const S=['pending','running','stopped','terminated'];
 return `<svg viewBox="0 0 420 190" role="img" aria-label="${label}">
<rect class="bx-dark" x="8" y="6" width="404" height="34" rx="8"/><text class="t-term" x="20" y="29" style="font-size:14px">$ ${cmd}</text>
${S.map((s,i)=>{const x=8+i*103;return `<rect class="${i===k?'bx-hl':'bx'}" x="${x}" y="58" width="94" height="76" rx="8"/>`+V.ic(i===3?'cross':i===2?'clock':i===1?'check':'gear',x+29,64,36,i===k?(i===3?'ic-bad':i===1?'ic-ok':'ic-a'):'ic-info')+`<text class="t${i===k?'-b':''}" x="${x+47}" y="122" text-anchor="middle" style="font-size:14px">${s}</text>`+(i<3?`<path class="ln" d="M${x+94} 96H${x+103}"/>`:'')}).join('')}
<rect class="${bill==='none'?'bx-ok':bill==='disk'?'bx-warn':'bx-bad'}" x="8" y="146" width="404" height="38" rx="8"/>
<text class="t-b ${bill==='none'?'t-ok':bill==='disk'?'t-warn':'t-bad'}" x="20" y="171">${bill==='none'?'Billing: nothing':bill==='disk'?'Billing: still paying for the disk':'Billing: every second it runs'}</text>
</svg>`};
const lamF=(n,who,msg,label)=>`<svg viewBox="0 0 420 196" role="img" aria-label="${label}">
${V.ic(n>3?'people':'person',8,30,64,n?'ic-p':'ic-info')}<text class="t" x="40" y="116" text-anchor="middle" style="font-size:14px">${who}</text>
${n?'<path class="ln-a" style="stroke-width:3" d="M78 62H104"/><polygon class="ah-a" points="102,55 102,69 114,62"/>':''}
<rect class="ln-d" x="118" y="8" width="294" height="136" rx="10"/><text class="t-s" x="130" y="28" style="font-size:14px">copies of your function</text>
${n===0?'<text class="t t-dim" x="265" y="88" text-anchor="middle">none running: $0</text>':Array.from({length:Math.min(n,10)},(_,i)=>V.ic('box',132+(i%5)*56,40+Math.floor(i/5)*50,42,'ic-ok')).join('')}
<rect class="bx-dark" x="8" y="154" width="404" height="36" rx="8"/><text class="t-term" x="20" y="177" style="font-size:14px">${msg}</text>
</svg>`;

explain('c2',`
<p>Every app needs computers to run on. AWS offers two very different ways to rent them: a server that is always on, or a function that wakes up only when someone needs it. Picking the right one saves money and stress.</p>

${V.card(1,'EC2','an always-on shop',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A shop open 24 hours with lights on and a meter running, even with no customers">
<polygon class="bx-a" points="40,46 150,8 260,46"/><rect class="bx" x="40" y="46" width="220" height="116"/>
<rect class="bx-ok" x="60" y="60" width="96" height="34" rx="6"/><text class="t-b t-ok" x="108" y="83" text-anchor="middle">OPEN</text>
${V.ic('door',176,60,60,'ic-a')}${V.ic('server',56,104,48,'ic-info')}<text class="t-m" x="160" y="140" text-anchor="middle" style="font-size:14px">t3.micro</text>
${V.ic('clock',290,14,54,'ic-a')}<text class="t-b" x="317" y="92" text-anchor="middle">24/7</text>
<rect class="bx-bad" x="282" y="108" width="132" height="54" rx="8"/><text class="t-m t-bad" x="348" y="132" text-anchor="middle" style="font-size:14px">meter on</text><text class="t" x="348" y="152" text-anchor="middle" style="font-size:14px">even if empty</text>
</svg><figcaption>An EC2 instance is a virtual server you rent. It runs, and costs money, every second until you stop it, whether anyone visits or not.</figcaption></figure>
${V.like(`<p>Renting a shop on the high street. It is yours to arrange however you like, open all day, but you pay the rent even on days nobody walks in.</p>`)}
${V.why(`<p>EC2 (Elastic Compute Cloud), launched in 2006, was AWS's first big hit: a whole server in seconds instead of weeks. It is still the right tool when you need full control or something must run all the time.</p>`)}
${V.anat([[1,'aws ec2 run-instances'],' ',[2,'--image-id ami-0abc...'],' ',[3,'--instance-type t3.micro'],' ',[4,'--key-name my-key']],[
 '<b>Launch.</b> Start one or more new instances.',
 '<b>Image.</b> An AMI (Amazon Machine Image): the disk to start from, such as Ubuntu with nothing else installed.',
 '<b>Size.</b> How big a computer. <code>t3</code> is the family and generation; <code>micro</code> is the size.',
 '<b>Key pair.</b> The key you will use to SSH in. Create it first with <code>create-key-pair</code>.'])}
${V.steps([
 ['You launch it. AWS prepares the machine: the state is <b>pending</b>.',lifeF(0,'aws ec2 run-instances ...','on','Pending')],
 ['A few seconds later it is <b>running</b>. <code>describe-instances</code> shows it, with its ID and IP address.',lifeF(1,'aws ec2 describe-instances','on','Running')],
 ['If you <b>stop</b> it, the computer switches off but its disk is kept, and the disk still costs a little.',lifeF(2,'aws ec2 stop-instances ...','disk','Stopped')],
 ['<b>Terminate</b> deletes it for good, disk included. Billing ends.',lifeF(3,'aws ec2 terminate-instances ...','none','Terminated')]])}
${V.rules(V.rh('Rules'),V.ok('create-key-pair first','run-instances fails if the key name does not exist'),V.no('stopped = free','A stopped instance still bills for its disk'),
 V.rh('Conventions'),V.ok('t3.micro','Start small: you can resize later'),V.ok('terminate when done','Forgotten servers are the classic surprise bill'))}
${V.hook(`EC2 is a shop: open all day, rent all day. Terminate what you don't use.`)}
`)}

${V.card(2,'Lambda','a pop-up stall that appears for each customer',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="An empty pitch costs nothing; when customers arrive, stalls pop up, one per customer">
<rect class="ln-d" x="6" y="10" width="124" height="120" rx="10"/><text class="t t-dim" x="68" y="76" text-anchor="middle">empty: $0</text>
<path class="ln-a" style="stroke-width:3" d="M136 70H158"/><polygon class="ah-a" points="156,63 156,77 168,70"/>
${V.ic('person',176,14,40,'ic-p')}${V.ic('box',176,64,44,'ic-ok')}
${V.ic('person',236,14,40,'ic-p')}${V.ic('box',236,64,44,'ic-ok')}
${V.ic('person',296,14,40,'ic-p')}${V.ic('box',296,64,44,'ic-ok')}
${V.ic('person',356,14,40,'ic-p')}${V.ic('box',356,64,44,'ic-ok')}
<text class="t" x="290" y="132" text-anchor="middle">one copy per request</text>
<text class="t-s" x="210" y="154" text-anchor="middle" style="font-size:14px">pay per request, not per hour</text>
</svg><figcaption>AWS Lambda runs your function only when an event arrives, such as a web request. More events means more copies at once, automatically.</figcaption></figure>
${V.like(`<p>A pop-up stall. When a customer turns up, a stall appears, serves them and folds away. A thousand customers? A thousand stalls. No customers, no stalls, no rent.</p>`)}
${V.why(`<p>Lots of code runs only now and then: resizing a photo, sending an email, answering an API call. Keeping a server on all day for that is waste. Lambda launched in 2014 and started the "serverless" idea: there are still servers, you just never see or manage them.</p>`)}
${V.anat([[1,'exports.handler'],' = ',[2,'async'],' (',[3,'event'],') =&gt; {\n  ',[4,'return { statusCode: 200, body: ... }'],';\n};'],[
 '<b>Handler.</b> The function Lambda calls. <code>--handler index.handler</code> means "file index.js, export handler".',
 '<b>async.</b> It can wait for things like database calls.',
 '<b>event.</b> The input: the request or the JSON you send, like <code>{"name":"Ada"}</code>.',
 '<b>Return.</b> The answer, sent back to whoever called it.'])}
${V.steps([
 ['Quiet time. No copies of your function exist, and you pay nothing.',lamF(0,'nobody','$ (no requests)','Nothing running')],
 ['An event arrives: <code>{"name":"Ada"}</code>. Lambda starts a copy and calls your handler. The first start takes a little longer; this is called a <b>cold start</b>.',lamF(1,'1 request','event: {"name":"Ada"}','One copy runs')],
 ['The handler returns. The answer goes back.',lamF(1,'1 request','{"message":"Hello, Ada!"}','The function returns')],
 ['Sale day: thousands of requests arrive at once. Lambda simply runs many copies side by side.',lamF(10,'5,000/min','scaling out automatically...','Many copies run')],
 ['Traffic drops and the copies are cleared away. You paid only for the work done.',lamF(0,'nobody','billed: requests + run time only','Back to zero')]])}
${V.rules(V.rh('Rules'),V.ok('--handler index.handler','Must match the file name and the exported name'),V.no('a 2-hour job','Each run is limited to 15 minutes'),
 V.ok('zip function.zip index.js','Code is uploaded as a zip'),V.ok('--cli-binary-format raw-in-base64-out','AWS CLI v2 needs this to send plain JSON with invoke'))}
${V.hook(`Lambda is a pop-up: it appears for each customer, then folds away.`)}
`)}

${V.card(3,'Which one?','match the tool to the traffic',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Steady traffic suits EC2; spiky traffic suits Lambda">
<rect class="bx-info" x="6" y="6" width="200" height="158" rx="10"/><text class="t-b" x="106" y="30" text-anchor="middle">steady all day</text>
<path class="ln-a" style="stroke-width:3" d="M20 90H192"/><path class="ln" d="M20 130H192"/><text class="t-b t-info" x="106" y="154" text-anchor="middle">EC2</text>
<rect class="bx-ok" x="214" y="6" width="200" height="158" rx="10"/><text class="t-b" x="314" y="30" text-anchor="middle">quiet, then spikes</text>
<path class="ln-a" style="stroke-width:3" d="M228 126H260L272 50 284 126H330L340 70 350 126H400"/><path class="ln" d="M228 130H400"/><text class="t-b t-ok" x="314" y="154" text-anchor="middle">Lambda</text>
</svg><figcaption>Busy all the time? A server is cheaper. Quiet most of the time with sudden rushes? Lambda wins.</figcaption></figure>
${V.rules(V.ok('EC2','Long-running servers, games, custom software, full control'),V.ok('Lambda','APIs with spiky traffic, scheduled jobs, reacting to file uploads'))}
${V.build(`<ol><li><code>create-key-pair</code>, then <code>run-instances</code> with t3.micro.</li><li><code>describe-instances</code> to see it running.</li><li><code>terminate-instances</code> with its ID.</li><li>Write <code>index.js</code>, zip it, <code>lambda create-function</code>.</li><li><code>lambda invoke</code> with a name, then read <code>out.json</code>.</li></ol>`)}
${V.hook(`Always-on shop: pay rent. Pop-up stall: pay per customer.`)}
`)}

<div class="try"><b>Try it in your head</b>1. An API gets 10 requests a minute, and 5,000 during a monthly sale. EC2 or Lambda? <i>Lambda.</i> 2. You stopped an instance. Are you paying anything? <i>Yes, for its disk. Terminate to stop paying.</i> 3. What does <code>--handler index.handler</code> point at? <i>The handler export in index.js.</i></div>
`);

const bucketSvg=(x,items,lock)=>`<path class="${lock?'bx-info':'bx'}" d="M${x} 76H${x+170}L${x+152} 190H${x+18}Z"/><ellipse class="${lock?'bx-info':'bx'}" cx="${x+85}" cy="76" rx="85" ry="12"/>${items.map((n,i)=>V.ic('file',x+28+i*60,104,44,'ic-ok')+`<text class="t-m" x="${x+50+i*60}" y="174" text-anchor="middle" style="font-size:14px">${n}</text>`).join('')}${lock?V.ic('lock',x+140,50,30,'ic-info'):''}`;
const s3F=(lines,items,right,label)=>`<svg viewBox="0 0 420 200" role="img" aria-label="${label}">
<rect class="bx-dark" x="8" y="4" width="404" height="${lines.length*22+12}" rx="8"/>${lines.map((l,i)=>`<text class="t-term" x="18" y="${24+i*22}" style="font-size:14px">${l}</text>`).join('')}
${bucketSvg(8,items,false)}
${right.map(([t,c],i)=>`<text class="t-m ${c||''}" x="200" y="${104+i*26}" style="font-size:14px">${t}</text>`).join('')}
</svg>`;
const preF=(cmd,link,who,code,banner,label)=>`<svg viewBox="0 0 420 200" role="img" aria-label="${label}">
<rect class="bx-dark" x="8" y="4" width="404" height="34" rx="8"/><text class="t-term" x="18" y="27" style="font-size:14px">$ ${cmd}</text>
${V.ic('person',8,56,56,who?'ic-p':'ic-info')}<text class="t" x="36" y="132" text-anchor="middle" style="font-size:14px">${who||'stranger'}</text>
<rect class="${link?'bx-warn':'bx'}" x="80" y="60" width="210" height="60" rx="8"/>${link?`<text class="t-m" x="92" y="84" style="font-size:14px">logo.png?X-Amz-</text><text class="t-m" x="92" y="108" style="font-size:14px">Signature=9f3c...</text>`:'<text class="t t-dim" x="185" y="96" text-anchor="middle" style="font-size:14px">no link</text>'}
${V.ic('folder',318,50,64,'ic-info')}${V.ic('lock',362,94,28,'ic-info')}<text class="t" x="350" y="136" text-anchor="middle" style="font-size:14px">private bucket</text>
<rect class="${code===200?'bx-ok':code?'bx-bad':'bx-info'}" x="8" y="150" width="404" height="42" rx="8"/><text class="t-b ${code===200?'t-ok':code?'t-bad':'t-info'}" x="20" y="177">${banner}</text>
</svg>`;

explain('c3',`
<p>Apps are full of files: profile pictures, uploads, backups. They also need a database that never loses data. The cloud gives you both without you looking after a single disk.</p>

${V.card(1,'S3 buckets','unlimited storage for files',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A bucket named you-portfolio-assets-2026 holding objects logo.png and index.html, each found by its key">
<text class="t-m" x="93" y="34" text-anchor="middle" style="font-size:14px">s3://you-portfolio-</text><text class="t-m" x="93" y="54" text-anchor="middle" style="font-size:14px">assets-2026</text>
${bucketSvg(8,['logo','index'],false)}
<text class="t-b" x="210" y="96">object = file + key</text>
<text class="t-m" x="210" y="126" style="font-size:14px">key: logo.png</text>
<text class="t-m" x="210" y="152" style="font-size:14px">key: index.html</text>
<text class="t" x="210" y="184" style="font-size:14px">private by default</text>
</svg><figcaption>S3 (Simple Storage Service) keeps files, called objects, in containers called buckets. Each object is found by its key, its name inside the bucket.</figcaption></figure>
${V.like(`<p>A cloakroom with an endless rail. You hand over your coat (the file) and get a ticket with its name (the key). Show the ticket and you get exactly that coat back, years later.</p>`)}
${V.why(`<p>Storing files on your own server means the disk fills up, breaks or is lost with the server. S3, launched in 2006, stores each file on several devices in several data centres, so losing one is almost impossible. It is designed for 99.999999999% durability ("eleven nines").</p>`)}
${V.anat([[1,'aws s3 cp'],' ',[2,'logo.png'],' ',[3,'s3://'],[4,'you-portfolio-assets-2026'],[5,'/']],[
 '<b>Copy.</b> Works like the Linux <code>cp</code>, but one side can be S3.',
 '<b>Source.</b> The file on your computer.',
 '<b>S3 address.</b> Means "inside S3".',
 '<b>Bucket name.</b>',
 '<b>Key prefix.</b> A trailing slash keeps the same file name: the key becomes <code>logo.png</code>.'])}
${V.steps([
 ['<code>mb</code> (make bucket) creates an empty bucket.',s3F(['$ aws s3 mb s3://you-portfolio-assets-2026'],[],[['make_bucket:','t-ok'],['you-portfolio-'],['assets-2026']],'Bucket created')],
 ['<code>cp</code> uploads the file. It becomes an object with the key logo.png.',s3F(['$ aws s3 cp logo.png','    s3://you-portfolio-assets-2026/'],['logo'],[['upload:','t-ok'],['logo.png']],'File uploaded')],
 ['<code>ls</code> lists what is inside, with sizes and dates.',s3F(['$ aws s3 ls s3://you-portfolio-assets-2026'],['logo'],[['2026-10-15'],['logo.png','t-ok']],'Bucket listed')]])}
${V.rules(V.rh('Bucket name rules'),V.ok('you-portfolio-assets-2026','Lowercase letters, numbers and hyphens, 3 to 63 characters'),
 V.no('Photos_2026','No capitals, no underscores'),V.no('s3://photos','Names are global across every AWS account: "photos" was taken long ago'),
 V.rh('Convention'),V.ok('project-purpose-year','Prefix with your project or organisation so the name is unique'))}
${V.hook(`Bucket is the rail, key is the ticket, object is the coat.`)}
`)}

${V.card(2,'Presigned URLs','a ticket that expires',`
${V.like(`<p>A cinema ticket. It gets one person into one film, and after the showing it is worthless. Nobody needs a key to the whole cinema.</p>`)}
${V.why(`<p>Thousands of data leaks came from buckets made public by mistake. Since 2023, new buckets block public access by default. When someone needs one file, you give them a temporary signed link instead.</p>`)}
${V.steps([
 ['A stranger tries to download the logo directly. The bucket is private, so S3 says <b>403 Access Denied</b>.',preF('curl https://...s3.amazonaws.com/logo.png','','',403,'403 Access Denied','Private bucket refuses')],
 ['You create a <b>presigned URL</b>: a link with a secret signature and an expiry time baked in.',preF('aws s3 presign ... --expires-in 600',1,'you',0,'Link valid for 600 seconds','A signed link is created')],
 ['You send the link to a friend. S3 checks the signature and the time, then hands over the file.',preF('curl "https://...logo.png?X-Amz-..."',1,'friend',200,'200 OK: here is logo.png','The friend downloads it')],
 ['Eleven minutes later the same link fails. Nothing to clean up.',preF('curl "https://...logo.png?X-Amz-..."',1,'friend',403,'403: Request has expired','The link has expired')]])}
${V.rules(V.ok('--expires-in 600','Seconds: 600 is 10 minutes'),V.no('making the bucket public','Anyone could list and download everything'))}
${V.hook(`Private bucket, temporary ticket.`)}
`)}

${V.card(3,'Managed databases','a database with a caretaker',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="An RDS Postgres database inside a private network, with AWS doing backups, updates and failover">
<rect class="ln-d" x="6" y="6" width="210" height="158" rx="10"/><text class="t-s" x="18" y="28" style="font-size:14px">private network</text>
${V.ic('db',60,40,80,'ic-info')}<text class="t-b" x="100" y="146" text-anchor="middle">Postgres</text>
${V.ic('robot',236,10,50,'ic-ok')}<text class="t-b t-ok" x="296" y="42">AWS does:</text>
<text class="t" x="240" y="86" style="font-size:14px">nightly backups</text>
<text class="t" x="240" y="112" style="font-size:14px">security updates</text>
<text class="t" x="240" y="138" style="font-size:14px">swap to a spare if</text><text class="t" x="240" y="158" style="font-size:14px">a machine dies</text>
</svg><figcaption>RDS (Relational Database Service) runs Postgres or MySQL for you. You use the database; AWS does the chores.</figcaption></figure>
${V.like(`<p>Renting a flat with a caretaker instead of owning a house. You live there; someone else fixes the boiler and checks the smoke alarms.</p>`)}
${V.anat([[1,'aws rds create-db-instance'],' ',[2,'--engine postgres'],' ',[3,'--db-instance-class db.t3.micro'],' ',[4,'--manage-master-user-password']],[
 '<b>Create.</b> Start a new managed database. Give it a name with <code>--db-instance-identifier</code>.',
 '<b>Engine.</b> Which database software.',
 '<b>Size.</b> Database sizes start with <code>db.</code>',
 '<b>Password.</b> AWS creates the admin password and keeps it in Secrets Manager, so it is never typed or committed.'])}
${V.rules(V.rh('Rules'),V.ok('private network only','Only your app servers can reach it'),V.no('port 5432 open to the internet','Bots will start guessing passwords at once'),
 V.rh('Which store?'),V.ok('S3','Files: uploads, images, backups'),V.ok('EBS','The disk attached to one EC2 server'),V.ok('RDS','Tables of data your app queries'))}
${V.build(`<ol><li><code>aws s3 mb</code> with a unique name.</li><li><code>aws s3 cp</code> the logo, then <code>aws s3 ls</code>.</li><li><code>aws s3 presign</code> with <code>--expires-in 600</code>.</li><li><code>aws rds create-db-instance</code> with postgres, db.t3.micro, 20 GB and a managed password.</li><li><code>aws rds describe-db-instances</code> until it says available.</li></ol>`)}
${V.hook(`Files in buckets, rows in RDS, and neither on the open internet.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Why can <code>aws s3 mb s3://photos</code> fail on a brand-new account? <i>Bucket names are global, and it is taken.</i> 2. How long is <code>--expires-in 600</code>? <i>10 minutes.</i> 3. Where should the production database live? <i>In a private network, reachable only by your app.</i></div>
`);

const iamF=(act,step,a,b,dec,label)=>{
 const row=(y,n,q,st,on)=>`<rect class="${on?'bx-hl':'bx'}" x="8" y="${y}" width="404" height="38" rx="6"/><text class="t-b" x="20" y="${y+25}">${n}</text><text class="t" x="44" y="${y+25}" style="font-size:14px">${q}</text>`+(st?`<text class="t-b ${st[1]}" x="400" y="${y+25}" text-anchor="end">${st[0]}</text>`:'');
 return `<svg viewBox="0 0 420 206" role="img" aria-label="${label}">
${V.ic('robot',8,4,40,'ic-info')}<text class="t-m" x="56" y="22" style="font-size:14px">deploy-bot wants</text><text class="t-m t-a" x="56" y="42" style="font-size:14px;font-weight:700">${act}</text>
${row(56,'1','Any Deny that matches?',a,step===1)}
${row(102,'2','Any Allow that matches?',b,step===2)}
<rect class="${dec==='ALLOWED'?'bx-ok':dec?'bx-bad':'bx'}" x="8" y="152" width="404" height="46" rx="8"/>${dec?V.ic(dec==='ALLOWED'?'check':'cross',18,159,32,dec==='ALLOWED'?'ic-ok':'ic-bad'):''}
<text class="t-b ${dec==='ALLOWED'?'t-ok':dec?'t-bad':'t-dim'}" x="60" y="181">${dec||'decision...'}</text>
</svg>`};

explain('c4',`
<p>One leaked password can hand a stranger your whole cloud account. IAM is how you make sure every person and every program can do exactly its job, and nothing more.</p>

${V.card(1,'Identities','who is asking?',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Three kinds of identity: a user for one person or program, a group for many people, a role worn temporarily by a service">
<rect class="bx-info" x="6" y="6" width="130" height="158" rx="10"/>${V.ic('person',41,16,60,'ic-info')}<text class="t-b" x="71" y="100" text-anchor="middle">user</text><text class="t" x="71" y="126" text-anchor="middle" style="font-size:14px">one person</text><text class="t" x="71" y="146" text-anchor="middle" style="font-size:14px">or program</text>
<rect class="bx-a" x="145" y="6" width="130" height="158" rx="10"/>${V.ic('people',180,16,60,'ic-a')}<text class="t-b" x="210" y="100" text-anchor="middle">group</text><text class="t" x="210" y="126" text-anchor="middle" style="font-size:14px">same rules</text><text class="t" x="210" y="146" text-anchor="middle" style="font-size:14px">for many</text>
<rect class="bx-ok" x="284" y="6" width="130" height="158" rx="10"/>${V.ic('card',319,16,60,'ic-ok')}<text class="t-b" x="349" y="100" text-anchor="middle">role</text><text class="t" x="349" y="126" text-anchor="middle" style="font-size:14px">a badge worn</text><text class="t" x="349" y="146" text-anchor="middle" style="font-size:14px">for a while</text>
</svg><figcaption>IAM (Identity and Access Management) knows three kinds of identity. Permissions, written as policies, are attached to them.</figcaption></figure>
${V.like(`<p>School keycards. A student's card opens the library but not the staff room. A visitor gets a badge at reception that stops working at 5pm.</p>`)}
${V.why(`<p>In the early days, teams shared one all-powerful login. If it leaked, everything was exposed, and you could not tell who did what. IAM, added to AWS in 2010, gives every person and program its own identity with its own limits.</p>`)}
${V.anat([[1,'aws iam'],' ',[2,'create-user'],' ',[3,'--user-name deploy-bot']],[
 '<b>Service.</b> IAM, for identities and permissions.',
 '<b>Operation.</b> Make a new user. A new user can do nothing at all until you attach a policy.',
 '<b>Name.</b> Say what it is for: <code>deploy-bot</code>, not <code>user2</code>.'])}
${V.rules(V.rh('Conventions'),V.ok('one user per person','Never share a login: you lose track of who did what'),V.ok('policies on groups','Give the "developers" group its rules, then add people to it'),V.ok('roles for programs','Servers and CI wear a role instead of holding a password'))}
${V.hook(`Every person and every program gets its own card.`)}
`)}

${V.card(2,'Policies','the rules on the card',`
${V.like(`<p>A guest list at a door: names that may come in, and which rooms they may enter. Not on the list? You are not getting in.</p>`)}
${V.anat([[1,'"Effect": "Allow"'],',\n',[2,'"Action": ["s3:PutObject", "s3:GetObject"]'],',\n',[3,'"Resource": "arn:aws:s3:::you-portfolio-assets-2026/*"']],[
 '<b>Effect.</b> Allow or Deny.',
 '<b>Action.</b> Which operations, as <code>service:Operation</code>.',
 '<b>Resource.</b> Which things, by ARN (Amazon Resource Name). <code>/*</code> means every object in the bucket.'])}
<p>These three lines sit inside a <code>Statement</code>, under <code>"Version": "2012-10-17"</code>. <b>Watch AWS check a request</b> against them:</p>
${V.steps([
 ['deploy-bot asks to upload logo.png. AWS gathers every policy attached to it.',iamF('s3:PutObject  bucket/logo.png',0,null,null,'','A request arrives')],
 ['First question: does any policy <b>Deny</b> this? An explicit Deny beats everything. There is none.',iamF('s3:PutObject  bucket/logo.png',1,['none','t-ok'],null,'','No deny')],
 ['Second question: does any policy <b>Allow</b> it? Yes: the action s3:PutObject and the resource bucket/* both match.',iamF('s3:PutObject  bucket/logo.png',2,['none','t-ok'],['yes','t-ok'],'','Allow matches')],
 ['So the request is <b>allowed</b>.',iamF('s3:PutObject  bucket/logo.png',0,['none','t-ok'],['yes','t-ok'],'ALLOWED','Allowed')],
 ['Now it asks for s3:DeleteBucket. No Deny, but no Allow either. Anything not allowed is <b>denied</b> by default.',iamF('s3:DeleteBucket  bucket',0,['none','t-ok'],['no','t-bad'],'DENIED (nothing allows it)','Implicitly denied')]])}
${V.rules(V.rh('Rules'),V.ok('"Version": "2012-10-17"','The policy language version. Copy it exactly; it is not today\'s date'),
 V.ok('bucket/*','Objects inside the bucket: needed for PutObject and GetObject'),V.no('"Action": "s3:*"','Every S3 action, including deleting buckets'),
 V.no('"Resource": "*"','Every resource in the account'))}
${V.hook(`Deny beats Allow, and silence means no.`)}
`)}

${V.card(3,'Least privilege','the smallest keyring that does the job',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A master key opens every door; a single key opens one. If the master key leaks, everything is exposed">
<rect class="bx-bad" x="6" y="6" width="200" height="148" rx="10"/>${V.ic('key',20,16,48,'ic-bad')}<text class="t-b t-bad" x="76" y="40">Administrator</text><text class="t-b t-bad" x="76" y="60">Access</text>
${V.ic('door',22,82,36,'ic-bad')}${V.ic('door',66,82,36,'ic-bad')}${V.ic('door',110,82,36,'ic-bad')}${V.ic('door',154,82,36,'ic-bad')}<text class="t" x="106" y="144" text-anchor="middle" style="font-size:14px">leak = lose everything</text>
<rect class="bx-ok" x="214" y="6" width="200" height="148" rx="10"/>${V.ic('key',228,16,48,'ic-ok')}<text class="t-b t-ok" x="284" y="40">PutObject</text><text class="t-b t-ok" x="284" y="60">one bucket</text>
${V.ic('door',230,82,36,'ic-ok')}${V.ic('lock',274,82,36,'ic-info')}${V.ic('lock',318,82,36,'ic-info')}${V.ic('lock',362,82,36,'ic-info')}<text class="t" x="314" y="144" text-anchor="middle" style="font-size:14px">leak = one bucket</text>
</svg><figcaption>Least privilege: give each identity only what its job needs. If its keys leak, the damage, called the blast radius, stays small.</figcaption></figure>
${V.like(`<p>Giving the dog walker your front door key, not the keys to your car, safe and office too.</p>`)}
${V.anat([[1,'aws iam simulate-principal-policy'],' ',[2,'--policy-source-arn ...user/deploy-bot'],' ',[3,'--action-names s3:PutObject s3:DeleteBucket']],[
 '<b>Simulate.</b> Ask "would this be allowed?" without actually doing it.',
 '<b>Who.</b> The identity to test, by ARN.',
 '<b>What.</b> The actions to try. Expect <code>allowed</code> and <code>implicitDeny</code>.'])}
${V.rules(V.rh('Rules'),V.no('AdministratorAccess on CI','If CI\'s keys leak, the attacker owns your account'),V.ok('roles for machines','EC2, Lambda and GitHub Actions (via OIDC) get temporary credentials that expire on their own'),
 V.no('access keys in code','Long-lived keys get leaked. Rotate any you must keep'))}
${V.build(`<ol><li><code>aws iam create-user --user-name deploy-bot</code></li><li>Write <code>policy.json</code>: Allow PutObject and GetObject on the bucket's <code>/*</code> only.</li><li><code>aws iam create-policy --policy-name portfolio-uploads --policy-document file://policy.json</code></li><li><code>aws iam attach-user-policy</code> with the policy's ARN.</li><li>Simulate PutObject (allowed) and DeleteBucket (denied).</li></ol>`)}
${V.hook(`Smallest keyring, smallest blast radius. Machines wear roles, not keys.`)}
`)}

<div class="try"><b>Try it in your head</b>1. A policy allows s3:PutObject only. Can the user delete the bucket? <i>No: nothing allows it, so it is denied.</i> 2. One policy allows an action and another denies it. Result? <i>Denied: an explicit Deny always wins.</i> 3. How should GitHub Actions get AWS access? <i>An IAM role via OIDC, with temporary credentials.</i></div>
`);

const sgF=(who,ip,port,hit,ok,label)=>`<svg viewBox="0 0 420 190" role="img" aria-label="${label}">
${V.ic(who==='bot'?'bug':who==='you'?'laptop':'globe',8,24,56,who==='bot'?'ic-bad':'ic-p')}<text class="t-m" x="36" y="102" text-anchor="middle" style="font-size:14px">${ip}</text>
<path class="${ok?'ln-ok':'ln'}" style="stroke-width:3" d="M72 52H142"/><polygon class="${ok?'ah-ok':'ah'}" points="140,45 140,59 152,52"/>
<rect class="bx-dark" x="80" y="62" width="58" height="26" rx="5"/><text class="t-term" x="109" y="81" text-anchor="middle" style="font-size:14px">${port}</text>
${ok?'':V.ic('cross',94,30,26,'ic-bad')}
<rect class="${ok?'bx-ok':'bx'}" x="156" y="14" width="96" height="104" rx="8"/>${V.ic('server',180,22,48,'ic-info')}<text class="t" x="204" y="92" text-anchor="middle" style="font-size:14px">web</text><text class="t" x="204" y="110" text-anchor="middle" style="font-size:14px">server</text>
<rect class="bx-info" x="262" y="14" width="150" height="104" rx="8"/>${V.ic('shield',270,20,26,'ic-info')}<text class="t-b" x="302" y="39">web-sg</text>
${hit===0?'<rect class="bx-hl" x="268" y="48" width="138" height="28" rx="5"/>':''}${hit===1?'<rect class="bx-hl" x="268" y="80" width="138" height="28" rx="5"/>':''}
<text class="t-m" x="274" y="67" style="font-size:14px">443 ← anyone</text><text class="t-m" x="274" y="99" style="font-size:14px">22 ← 198.51…/32</text>
<rect class="${ok?'bx-ok':'bx-bad'}" x="8" y="132" width="404" height="50" rx="8"/><text class="t-b ${ok?'t-ok':'t-bad'}" x="20" y="163">${ok?'Allowed in':'Blocked: no rule lets it in'}</text>
</svg>`;
const vpcF=(k,cmd,label)=>`<svg viewBox="0 0 420 200" role="img" aria-label="${label}">
<rect class="bx-dark" x="8" y="4" width="404" height="32" rx="8"/><text class="t-term" x="18" y="26" style="font-size:14px">$ ${cmd}</text>
<rect class="${k>=0?'bx-info':'ln-d'}" x="8" y="46" width="404" height="148" rx="10"/><text class="t-b t-info" x="20" y="68">VPC 10.0.0.0/16</text>
${k>=1?`<rect class="${k===1?'bx-hl':'bx-ok'}" x="22" y="78" width="376" height="106" rx="8"/><text class="t-m" x="34" y="100" style="font-size:14px">subnet 10.0.1.0/24</text>`:''}
${k>=2?`<rect class="${k===2?'bx-hl':'bx'}" x="196" y="88" width="190" height="88" rx="8"/>${V.ic('shield',204,94,30,'ic-a')}<text class="t-b" x="240" y="114">web-sg</text><text class="t-m" x="206" y="140" style="font-size:14px">443 ← anyone</text><text class="t-m" x="206" y="164" style="font-size:14px">22 ← your IP</text>`:''}
${k>=3?`${V.ic('server',60,108,60,'ic-ok')}<path class="ln-ok" style="stroke-width:3" d="M124 138H192"/><text class="t" x="90" y="182" text-anchor="middle" style="font-size:14px">instance</text>`:''}
</svg>`;

explain('c5',`
<p>When you put a server in the cloud, who can reach it? By default, maybe the whole internet. A VPC and its security groups let you decide exactly which doors exist and who may knock.</p>

${V.card(1,'The VPC','your own gated estate',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A VPC as a walled estate with one gate to the internet, a public street with the web server and a private street with the database">
${V.ic('globe',2,76,44,'ic-p')}<text class="t" x="33" y="140" text-anchor="middle" style="font-size:14px">internet</text>
<rect class="bx" x="66" y="6" width="348" height="188" rx="12"/><text class="t-b" x="80" y="28">VPC 10.0.0.0/16</text>
<rect class="bx-warn" x="54" y="80" width="26" height="40" rx="4"/>${V.ic('door',54,82,26,'ic-warn')}
<rect class="bx-ok" x="92" y="40" width="310" height="68" rx="8"/><text class="t-b t-ok" x="104" y="62">public subnet</text><text class="t-m" x="104" y="86" style="font-size:14px">10.0.1.0/24</text>${V.ic('server',348,48,48,'ic-ok')}<text class="t" x="300" y="98" text-anchor="end" style="font-size:14px">web server</text>
<rect class="bx-info" x="92" y="118" width="310" height="68" rx="8"/><text class="t-b t-info" x="104" y="140">private subnet</text><text class="t-m" x="104" y="164" style="font-size:14px">10.0.2.0/24</text>${V.ic('db',348,126,48,'ic-info')}${V.ic('lock',306,140,26,'ic-info')}
</svg><figcaption>A VPC (virtual private cloud) is your own private network in AWS. Subnets are streets inside it: public ones face the gate, private ones cannot be reached from outside at all.</figcaption></figure>
${V.like(`<p>A gated housing estate. One gate to the road. Shops near the gate where visitors are welcome (the public subnet), homes deep inside where only residents go (the private subnet).</p>`)}
${V.why(`<p>The first cloud servers all sat on one big shared network. Since 2009, a VPC gives every customer a walled-off network with its own address range, so your database is not one mistake away from the internet.</p>`)}
${V.anat([[1,'10.0.0.0'],[2,'/16']],[
 '<b>Starting address.</b> The first address of the range. Private ranges start with 10., 172.16 to 172.31, or 192.168.',
 '<b>Prefix length.</b> How many of the 32 bits are fixed. The more fixed, the smaller the range.'])}
${V.rules(V.rh('CIDR sizes'),V.ok('/16','65,536 addresses: a whole VPC'),V.ok('/24','256 addresses: one subnet (AWS keeps 5)'),V.ok('/32','Exactly one address, like your own IP'),
 V.rh('Rules'),V.ok('10.0.1.0/24 inside 10.0.0.0/16','A subnet must fit inside its VPC'),V.no('two subnets both 10.0.1.0/24','Subnets in a VPC cannot overlap'))}
${V.hook(`VPC is the estate, subnets are streets, the internet comes in through one gate.`)}
`)}

${V.card(2,'Security groups','a door guard on every server',`
${V.like(`<p>A guard at each front door with a short list: "deliveries for door 443 from anyone; door 22 only for the owner". Anyone not on the list is turned away, and people inside can always open the door to leave.</p>`)}
${V.why(`<p>Bots scan every public address on the internet for open ports, all day. A security group is a firewall attached to each resource, so even inside your VPC every server only accepts what you listed.</p>`)}
${V.anat([[1,'authorize-security-group-ingress'],' ',[2,'--protocol tcp'],' ',[3,'--port 443'],' ',[4,'--cidr 0.0.0.0/0']],[
 '<b>Add an inbound rule.</b> Ingress means traffic coming in.',
 '<b>Protocol.</b> Web traffic and SSH both use TCP.',
 '<b>Port.</b> Which door.',
 '<b>From where.</b> <code>0.0.0.0/0</code> means anyone; <code>198.51.100.7/32</code> means one address.'])}
${V.steps([
 ['A visitor requests your site on port 443. The first rule matches: <b>allowed</b>. The reply goes back out by itself, because security groups remember allowed connections (they are <b>stateful</b>).',sgF('web','visitor','443',0,1,'HTTPS from anyone allowed')],
 ['You SSH in from your home IP, 198.51.100.7. The second rule matches: allowed.',sgF('you','your IP','22',1,1,'SSH from your IP allowed')],
 ['A bot tries port 22 from another address. No rule matches that address: <b>blocked</b>.',sgF('bot','a bot','22',-1,0,'SSH from a bot blocked')],
 ['Someone tries the database port 5432. There is no rule for it at all, so it is blocked. Security groups only have Allow rules; everything else is refused.',sgF('web','anyone','5432',-1,0,'Port 5432 blocked')]])}
${V.rules(V.rh('Rules'),V.no('--port 22 --cidr 0.0.0.0/0','SSH open to the world: bots start guessing in minutes'),V.ok('--port 22 --cidr 198.51.100.7/32','SSH from your IP only, or use Session Manager with no port open'),
 V.ok('database SG: 5432 from app SG','Let the database accept only your app servers\' security group'))}
${V.hook(`A guard with a guest list: not listed, not getting in.`)}
`)}

${V.card(3,'Build the estate','four commands, in order',`
${V.steps([
 ['Create the VPC with its address range. You get an ID like vpc-05a8c1e3f7b9d2468.',vpcF(0,'aws ec2 create-vpc --cidr-block 10.0.0.0/16','VPC created')],
 ['Carve out a subnet. Its range must sit inside the VPC\'s range.',vpcF(1,'aws ec2 create-subnet ... 10.0.1.0/24','Subnet created')],
 ['Create the security group web-sg in the VPC, then add the two rules: 443 from anyone, 22 from your IP.',vpcF(2,'aws ec2 authorize-security-group-ingress ...','Security group with rules')],
 ['Launch the server into the subnet, guarded by web-sg.',vpcF(3,'aws ec2 run-instances ... --subnet-id ...','Instance launched')]])}
${V.rules(V.ok('--vpc-id, --subnet-id, --group-id','Each command uses the ID the one before printed'),V.ok('private subnet for the database','Only reachable from inside the estate'))}
${V.hook(`Estate, street, guard, house.`)}
`)}

<div class="try"><b>Try it in your head</b>1. How many addresses does /24 cover? <i>256.</i> 2. SSH should be open to whom? <i>Only your IP (/32), or nobody if you use Session Manager.</i> 3. Where does the database go? <i>A private subnet, accepting 5432 only from the app's security group.</i></div>
`);

const tfF=(code,state,cloud,out,label)=>{
 const col=(x,title,cls,items)=>`<rect class="${cls}" x="${x}" y="8" width="128" height="134" rx="8"/><text class="t-b${cls==='bx-dark'?' t-term':''}" x="${x+12}" y="30" style="font-size:14px">${title}</text>`+items;
 return `<svg viewBox="0 0 420 212" role="img" aria-label="${label}">
${col(8,'main.tf','bx-dark',code.map(([t,c],i)=>`<text class="t-term ${c||''}" x="20" y="${60+i*26}" style="font-size:14px">${t}</text>`).join(''))}
${col(146,'state','bx',state.length?state.map(([t,c],i)=>`<text class="t-m ${c||''}" x="158" y="${60+i*26}" style="font-size:14px">${t}</text>`).join(''):'<text class="t t-dim" x="158" y="62" style="font-size:14px">empty</text>')}
${col(284,'AWS','bx-info',cloud.map(([ic,c],i)=>V.ic(ic,296+i*58,54,48,c)).join('')+(cloud.length?'':'<text class="t t-dim" x="296" y="62" style="font-size:14px">nothing</text>'))}
<rect class="bx-dark" x="8" y="150" width="404" height="56" rx="8"/>${out.map(([t,c],i)=>`<text class="t-term ${c||''}" x="18" y="${172+i*24}" style="font-size:14px">${t}</text>`).join('')}
</svg>`};

explain('c6',`
<p>Clicking around a cloud console works once. But can you click it exactly the same way next month, for a second environment, after a teammate changed something? Infrastructure as code means your servers and buckets are described in files, reviewed and rebuilt at will.</p>

${V.card(1,'Infrastructure as code','a blueprint instead of memory',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A main.tf blueprint goes to Terraform, which builds a bucket and a server in AWS">
<rect class="bx-dark" x="6" y="12" width="132" height="120" rx="8"/><text class="t-term" x="18" y="38" style="font-size:14px">main.tf</text>
<text class="t-term t-dim" x="18" y="70" style="font-size:14px">bucket</text><text class="t-term t-dim" x="18" y="98" style="font-size:14px">server</text>
<path class="ln-a" style="stroke-width:3" d="M142 72H160"/><polygon class="ah-a" points="158,65 158,79 170,72"/>
${V.ic('robot',176,30,64,'ic-a')}<text class="t-b" x="208" y="118" text-anchor="middle">Terraform</text>
<path class="ln-ok" style="stroke-width:3" d="M246 72H264"/><polygon class="ah-ok" points="262,65 262,79 274,72"/>
<rect class="bx-info" x="280" y="12" width="134" height="120" rx="8"/><text class="t-b t-info" x="292" y="36">AWS</text>${V.ic('folder',290,52,52,'ic-ok')}${V.ic('server',350,52,52,'ic-ok')}
<text class="t-s" x="210" y="154" text-anchor="middle" style="font-size:14px">same file, same result, every time</text>
</svg><figcaption>You describe what you want in files. Terraform works out the steps and builds it. Running it again builds nothing new, because it is already there.</figcaption></figure>
${V.like(`<p>LEGO instructions versus building from memory. With the booklet, anyone can build the same castle, spot a missing page, and build a second copy for a friend.</p>`)}
${V.why(`<p>Hand-built infrastructure drifts: nobody remembers which box was ticked, and staging slowly stops matching production. HashiCorp released Terraform in 2014 so infrastructure could live in Git, be reviewed in pull requests and be rebuilt on demand. OpenTofu is an open-source copy with the same commands.</p>`)}
${V.hook(`Write it down once; build it the same way forever.`)}
`)}

${V.card(2,'Writing a resource','the shape of a .tf file',`
${V.anat([[1,'resource'],' ',[2,'"aws_s3_bucket"'],' ',[3,'"assets"'],' {\n  ',[4,'bucket'],' = ',[5,'"you-portfolio-assets-tf-2026"'],'\n}'],[
 '<b>Block type.</b> <code>resource</code> means "a thing that should exist". Other blocks: <code>provider</code>, <code>terraform</code>.',
 '<b>Resource type.</b> Which kind of thing, from the AWS provider.',
 '<b>Local name.</b> Terraform\'s nickname, used only inside your code. Together they form the address <code>aws_s3_bucket.assets</code>.',
 '<b>Argument.</b> A setting of that resource.',
 '<b>Value.</b> Here the real bucket name in AWS, which must be globally unique.'])}
${V.rules(V.rh('Rules'),V.ok('provider "aws" { region = "us-east-1" }','Tell Terraform which cloud and which region'),
 V.no('bucket = you-portfolio','Text values need double quotes'),V.ok('"assets" vs the bucket name','The local name is for your code; the bucket name is what AWS sees'),
 V.rh('Conventions'),V.ok('version = "~&gt; 5.0"','Pin the provider so an upgrade cannot surprise you'),V.ok('snake_case local names','<code>web</code>, <code>assets</code>, <code>main_db</code>'))}
${V.hook(`resource "type" "nickname" { settings }.`)}
`)}

${V.card(3,'Plan, then apply','see the changes before they happen',`
${V.like(`<p>An architect showing you the plans before the builders arrive. You read them, say yes, and only then does anyone pick up a shovel.</p>`)}
${V.steps([
 ['<code>terraform init</code> downloads the AWS provider, the plug-in that knows how to talk to AWS.',tfF([['bucket']],[],[],[['$ terraform init'],['Terraform has been successfully initialized!','t-ok']],'Init')],
 ['<code>terraform plan</code> compares your files with the state (what it built before). The bucket is missing, so the plan says <b>+ create</b>. Nothing is built yet.',tfF([['+ bucket','t-ok']],[],[],[['+ aws_s3_bucket.assets','t-ok'],['Plan: 1 to add, 0 to change, 0 to destroy.']],'Plan')],
 ['<code>terraform apply</code> shows the plan again and waits for you to type <b>yes</b>. Then it creates the bucket and records it in the state.',tfF([['bucket']],[['assets']],[['folder','ic-ok']],[['Enter a value: yes'],['Apply complete! Resources: 1 added.','t-ok']],'Apply')],
 ['You add an <code>aws_instance</code> called web. The plan only adds the server: the bucket already matches, so it is left alone.',tfF([['bucket'],['+ instance','t-ok']],[['assets']],[['folder','ic-ok']],[['+ aws_instance.web','t-ok'],['Plan: 1 to add, 0 to change, 0 to destroy.']],'Second plan')],
 ['After apply, both exist. <code>terraform destroy</code> plans <b>- destroy</b> for everything, you type yes, and the bill stops.',tfF([['bucket'],['instance']],[],[],[['- aws_instance.web  - aws_s3_bucket.assets','t-bad'],['Destroy complete! Resources: 2 destroyed.']],'Destroy')]])}
${V.rules(V.rh('Read the symbols'),V.ok('+','Will be created'),V.ok('~','Will be changed in place'),V.no('-','Will be destroyed: read twice'),V.no('-/+','Destroyed and rebuilt: data on it can be lost'))}
${V.hook(`Plan is the preview, apply is the button. Never press the button without reading the preview.`)}
`)}

${V.card(4,'State','Terraform\'s memory',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="The state file links each address in your code to a real resource ID in AWS">
<rect class="bx-dark" x="6" y="10" width="140" height="120" rx="8"/><text class="t-term" x="18" y="34" style="font-size:14px">your code</text><text class="t-term" x="18" y="74" style="font-size:14px">assets</text><text class="t-term" x="18" y="108" style="font-size:14px">web</text>
<rect class="bx-warn" x="160" y="10" width="100" height="120" rx="8"/>${V.ic('book',186,24,48,'ic-warn')}<text class="t-b" x="210" y="100" text-anchor="middle">state</text>
<path class="ln-d" d="M90 70H160M90 104H160M260 70H274M260 104H274"/>
<rect class="bx-info" x="274" y="10" width="140" height="120" rx="8"/><text class="t-b t-info" x="286" y="34">AWS</text><text class="t-m" x="286" y="74" style="font-size:14px">you-portf…</text><text class="t-m" x="286" y="108" style="font-size:14px">i-05a8c1…</text>
<text class="t-s" x="210" y="152" text-anchor="middle" style="font-size:14px">which name in code is which real thing</text>
</svg><figcaption>The state file is Terraform's notebook: it links each address in your code to the real resource it created.</figcaption></figure>
${V.like(`<p>A cloakroom's ticket book. Lose it, and the attendant no longer knows which coat belongs to which ticket.</p>`)}
${V.rules(V.rh('Rules'),V.ok('commit the .tf files and .terraform.lock.hcl','Code and pinned provider versions belong in Git'),
 V.no('commit terraform.tfstate','It can contain secrets, and two copies will disagree'),V.no('edit the state by hand','Use terraform commands, like terraform state list'),
 V.rh('Conventions'),V.ok('remote state with locking','An S3 backend (with its lock file) or HCP Terraform, so two people cannot apply at once'))}
${V.build(`<ol><li>Write <code>main.tf</code> with the provider and an S3 bucket.</li><li><code>terraform init</code>, then <code>terraform plan</code>.</li><li><code>terraform apply</code> and type yes.</li><li>Add an <code>aws_instance</code> named web; plan, apply, then <code>terraform state list</code>.</li><li><code>terraform destroy</code> and type yes.</li></ol>`)}
${V.hook(`Code says what you want, state says what you have, plan shows the difference.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which command shows changes without making them? <i>terraform plan.</i> 2. A plan line starts with <code>-/+</code>. Worried? <i>Yes: it will destroy and rebuild that resource.</i> 3. Should <code>terraform.tfstate</code> go in Git? <i>No: keep it in a remote, locked backend.</i></div>
`);

}
