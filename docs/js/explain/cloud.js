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
<path class="ln-d" style="stroke-width:3" d="M80 100C130 150 170 150 196 132"/>
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
${['your code','scaling','runtime','OS','hardware'].map((r,i)=>{const y=36+i*31;const who=[[1,1,0,0],[1,1,0,0],[1,0,0,0],[1,0,0,0],[0,0,0,0]][i];return `<text class="t" x="8" y="${y+19}" style="font-size:14px">${r}</text>`+who.map((w,c)=>`<rect class="${w?'bx-a':'bx-ok'}" x="${104+c*78}" y="${y}" width="74" height="26" rx="4"/>`).join('')}).join('')}
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

}
