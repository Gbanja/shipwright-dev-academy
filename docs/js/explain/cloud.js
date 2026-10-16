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
${V.ic('door',176,60,60,'ic-a')}${V.ic('server',72,104,48,'ic-info')}<text class="t-m" x="150" y="152" text-anchor="middle" style="font-size:14px">t3.micro</text>
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
 ['If you <b>stop</b> it, the computer switches off but its disk is kept, and the disk still costs a little.',lifeF(2,'aws ec2 stop-instances --instance-ids i-05a8...','disk','Stopped')],
 ['<b>Terminate</b> deletes it for good, disk included. Billing ends.',lifeF(3,'aws ec2 terminate-instances --instance-ids i-05a8...','none','Terminated')]])}
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
 ['Sale day: thousands of requests arrive at once. Lambda simply runs many copies side by side.',lamF(10,'5,000 req/min','scaling out automatically...','Many copies run')],
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

}
