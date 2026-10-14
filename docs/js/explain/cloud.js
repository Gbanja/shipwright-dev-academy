/* cloud: "Explained step by step" walkthroughs. */

explain('c1',`
<h4>What "the cloud" actually is</h4>
<p>"The cloud" sounds mysterious, but it is just <b>other people's computers, rented by the minute</b>. Companies like Amazon (AWS), Microsoft (Azure) and Google (Google Cloud) own enormous buildings full of servers. You rent a slice of them over the internet, use it for as long as you need, and stop paying when you hand it back.</p>
<p>Why not just buy your own servers? Imagine you are launching a shop and expect a rush on launch day. With your own hardware you would have to guess how many machines to buy, wait weeks for delivery, and then pay for them all year even when they sit idle. With the cloud you ask for ten servers at 9am, and give nine of them back at 6pm. That flexibility, <b>paying only for what you use and getting it in seconds</b>, is the whole point.</p>
<div class="analogy"><b>Think of it like</b>Electricity from the grid instead of running your own generator. You do not build a power station; you plug in, use what you need, and get a bill for exactly that. The cloud does the same for computing.</div>
<p>This track uses <b>AWS</b> (Amazon Web Services), the largest provider. The ideas carry over almost one to one to Azure and Google Cloud, only the names change.</p>

<h4>How much do you want to manage? IaaS, PaaS, serverless, SaaS</h4>
<p>Cloud services differ in how much of the work they do for you. Picture a stack of layers, from the physical machine at the bottom to your app at the top. Each kind of service draws the line between "the provider handles it" and "you handle it" at a different height.</p>
<figure class="fig"><svg viewBox="0 0 420 260" role="img" aria-label="Which layers you manage in IaaS, PaaS, serverless and SaaS">
<g text-anchor="middle">
<text class="t-b" x="121" y="20">IaaS</text><text class="t-b" x="203" y="20">PaaS</text><text class="t-s" x="285" y="20">Serverless</text><text class="t-b" x="367" y="20">SaaS</text>
</g>
<text class="t-s" x="8" y="57">your app</text><text class="t-s" x="8" y="103">runtime</text><text class="t-s" x="8" y="149">OS</text><text class="t-s" x="8" y="195">hardware</text>
<rect class="bx-a" x="84" y="34" width="74" height="38" rx="4"/><rect class="bx-a" x="84" y="80" width="74" height="38" rx="4"/><rect class="bx-a" x="84" y="126" width="74" height="38" rx="4"/><rect class="bx" x="84" y="172" width="74" height="38" rx="4"/>
<rect class="bx-a" x="166" y="34" width="74" height="38" rx="4"/><rect class="bx" x="166" y="80" width="74" height="38" rx="4"/><rect class="bx" x="166" y="126" width="74" height="38" rx="4"/><rect class="bx" x="166" y="172" width="74" height="38" rx="4"/>
<rect class="bx-a" x="248" y="34" width="74" height="38" rx="4"/><rect class="bx" x="248" y="80" width="74" height="38" rx="4"/><rect class="bx" x="248" y="126" width="74" height="38" rx="4"/><rect class="bx" x="248" y="172" width="74" height="38" rx="4"/>
<rect class="bx" x="330" y="34" width="74" height="38" rx="4"/><rect class="bx" x="330" y="80" width="74" height="38" rx="4"/><rect class="bx" x="330" y="126" width="74" height="38" rx="4"/><rect class="bx" x="330" y="172" width="74" height="38" rx="4"/>
<rect class="bx-a" x="84" y="226" width="20" height="20" rx="3"/><text class="t-s" x="112" y="241">you manage</text>
<rect class="bx" x="230" y="226" width="20" height="20" rx="3"/><text class="t-s" x="258" y="241">provider manages</text>
</svg><figcaption>Coloured squares are the layers you look after; plain ones are handled by the provider. With IaaS you manage everything from the operating system up. With PaaS and serverless you only bring your app or your functions. With SaaS you simply use finished software.</figcaption></figure>
<div class="tbl-wrap"><table><tr><th>Model</th><th>What you get</th><th>Examples</th></tr>
<tr><td><b>IaaS</b>, infrastructure as a service</td><td>Raw virtual machines, disks and networks. You install and patch the operating system and everything above it.</td><td>AWS EC2, DigitalOcean droplets, the VPS from the deployment track</td></tr>
<tr><td><b>PaaS</b>, platform as a service</td><td>You hand over your app; the platform builds, runs and scales it.</td><td>Vercel, Render, Heroku, AWS Elastic Beanstalk</td></tr>
<tr><td><b>Serverless</b> (functions)</td><td>You upload single functions; they run only when an event arrives, and you pay per request.</td><td>AWS Lambda, Cloudflare Workers</td></tr>
<tr><td><b>SaaS</b>, software as a service</td><td>Finished software you log in to and use.</td><td>Gmail, Slack, GitHub</td></tr></table></div>
<p>Here is a test you can always apply: <b>"Do I ever log in to a server and run <code>apt</code>?"</b> If yes, it is IaaS. If you only push code and it gets run for you, it is PaaS or serverless. If you only use it, it is SaaS. So Vercel, where you never touch a server, is PaaS.</p>
<p>"Serverless" does not mean there are no servers. It means the servers are entirely the provider's problem: you never see, size or patch them.</p>

<h4>Regions and availability zones</h4>
<p>AWS's data centres are grouped by geography. A <b>region</b> is a separate area of the world with its own cluster of data centres, named with a code like <code>us-east-1</code> (Northern Virginia), <code>eu-west-1</code> (Ireland) or <code>af-south-1</code> (Cape Town). When you create something, you create it <b>in one region</b>, and it stays there.</p>
<p>Inside each region there are several <b>availability zones</b>, or AZs, named like <code>us-east-1a</code> and <code>us-east-1b</code>. Each AZ is one or more data centres with its own power, cooling and network, a few kilometres from the others but linked by very fast connections. They are built so that a fire, flood or power cut in one zone does not affect the next.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="A region contains three availability zones; the app runs in two, so losing one zone keeps it online">
<rect class="bx-info" x="10" y="10" width="400" height="170" rx="10"/>
<text class="t-b" x="24" y="34">Region: us-east-1</text>
<rect class="bx-bad" x="24" y="48" width="114" height="118" rx="6"/><text class="t-b" x="81" y="72" text-anchor="middle">AZ a</text>
<rect class="bx" x="38" y="86" width="86" height="36" rx="4"/><text class="t-s" x="81" y="109" text-anchor="middle">server</text>
<path class="ln" d="M40 82l82 44M122 82l-82 44"/><text class="t-s t-bad" x="81" y="152" text-anchor="middle">power cut</text>
<rect class="bx-ok" x="153" y="48" width="114" height="118" rx="6"/><text class="t-b" x="210" y="72" text-anchor="middle">AZ b</text>
<rect class="bx" x="167" y="86" width="86" height="36" rx="4"/><text class="t-s" x="210" y="109" text-anchor="middle">server</text>
<text class="t-s t-ok" x="210" y="152" text-anchor="middle">still serving</text>
<rect class="bx" x="282" y="48" width="114" height="118" rx="6"/><text class="t-b" x="339" y="72" text-anchor="middle">AZ c</text>
<text class="t-s" x="339" y="109" text-anchor="middle">spare room</text>
<text class="t-s" x="210" y="206" text-anchor="middle">Two zones: one can fail and the app stays up.</text>
</svg><figcaption>A region is a group of independent availability zones. Because the app runs in two zones, a power cut that takes out zone a leaves the copy in zone b serving every visitor.</figcaption></figure>
<p>That is the trick to surviving failures: run important things in <b>at least two availability zones</b>. A bigger server does not help if its building loses power; a second copy in a different zone does. Choose the region itself mostly by <b>distance to your users</b> (closer means faster), by any legal rules about where data must stay, and by price, which varies a little between regions.</p>
<div class="mistake"><b>Common mistake</b>"My resources have vanished!" Usually they have not: the console or CLI is looking at a different region. Everything in AWS is per region, so a server made in <code>eu-west-1</code> does not appear when you list <code>us-east-1</code>. Check the region first.</div>

<h4>Shared responsibility: who secures what</h4>
<p>AWS and you split the security work, and the split follows the stack from earlier. AWS is responsible for the security <b>of</b> the cloud: the buildings, the hardware, the network cables and the software that runs the services. You are responsible for security <b>in</b> the cloud: everything you configure. Who may log in to your account, whether your storage is public, which ports are open, how strong your passwords are, and what data you store.</p>
<p>So if you make a storage bucket public by mistake and it leaks, that is on you, not AWS. Many real data breaches happen exactly this way, not because the cloud was hacked but because a setting was wrong.</p>

<h4>Talking to AWS from the terminal: <code>aws configure</code></h4>
<p>You can control AWS through its website, the <b>console</b>, but professionals mostly use the <b>AWS CLI</b>, a command called <code>aws</code>, because commands can be repeated, scripted and shared. Every command has the same shape: <code>aws</code>, then the service, then the operation, then options, like <code>aws s3 ls</code> or <code>aws ec2 describe-instances</code>.</p>
<p>First the CLI needs to know who you are and which region to use. <code>aws configure</code> asks four questions:</p>
<pre class="snip">aws configure
AWS Access Key ID [None]: AKIAEXAMPLE123      # like a username
AWS Secret Access Key [None]: ****            # like a password
Default region name [None]: us-east-1
Default output format [None]: json</pre>
<p>An <b>access key</b> is a pair: an ID that is not secret (long-term ones start with <code>AKIA</code>), and a secret key that absolutely is. The CLI saves them in your home folder, in <code>~/.aws/credentials</code> and <code>~/.aws/config</code>. In this sandbox the keys are made up. With a real account, treat the secret key exactly like the secrets in the deployment track: never commit it, never paste it into code. For your own daily work, AWS now recommends signing in with short-lived credentials through IAM Identity Center (<code>aws configure sso</code>) rather than long-lived keys; you will see why in the IAM lesson.</p>
<p>Then check who the CLI thinks you are:</p>
<pre class="snip">aws sts get-caller-identity
{ "UserId": "AIDA...", "Account": "123456789012",
  "Arn": "arn:aws:iam::123456789012:user/you" }</pre>
<p><code>sts</code> is the Security Token Service, which handles identities. The answer shows your 12-digit <b>account number</b> and your <b>ARN</b> (Amazon Resource Name), the full unique name AWS gives every user and resource. Run this whenever a command fails strangely: it is the AWS equivalent of <code>whoami</code>. If it says <code>Unable to locate credentials</code>, the CLI has not been configured yet.</p>

<h4>Day one rules: protect the account and the bill</h4>
<ul>
<li><b>Lock away the root user.</b> The email address you signed up with is the <b>root user</b>, which can do absolutely anything, including closing the account. Turn on <b>MFA</b> (multi-factor authentication: a code from an app on your phone as well as the password), then stop using root for daily work.</li>
<li><b>Create an everyday identity</b>, such as a user in IAM Identity Center, with only the access you need.</li>
<li><b>Set a billing alert</b>, for example a monthly budget of a few dollars in AWS Budgets that emails you when spending passes it. Cloud resources bill until you delete them, and a forgotten server or a leaked key can run up a large bill quietly. Free-tier offers change over time, so check the current terms rather than assuming something is free.</li>
</ul>
<div class="try"><b>Try it in your head</b>Your app runs on one large server in <code>us-east-1a</code>. The zone has a power failure. Would a bigger server have helped? No: it would be in the same dark building. Two smaller servers in <code>us-east-1a</code> and <code>us-east-1b</code> would have kept the app online.</div>

<h4>Recap</h4>
<ul>
<li>The cloud is renting computing on demand: pay for what you use, get it in seconds, give it back.</li>
<li>IaaS gives raw machines, PaaS runs your app, serverless runs functions per request, SaaS is finished software.</li>
<li>A region is an area of the world; it holds several independent availability zones. Run important things in at least two.</li>
<li>Shared responsibility: AWS secures the cloud itself; you secure your configuration, data and access.</li>
<li><code>aws configure</code> stores your keys and region; <code>aws sts get-caller-identity</code> shows who you are.</li>
<li>Day one: MFA on root, an everyday identity, and a billing alert.</li>
</ul>
`);

explain('c2',`
<h4>Two ways to run code in the cloud</h4>
<p>"Compute" just means running programs. AWS offers many ways to do it, but two are the foundations, and they sit at opposite ends of the scale you met in the last lesson:</p>
<ul>
<li><b>EC2</b> (Elastic Compute Cloud) rents you a whole <b>virtual machine</b>: a computer that exists as software on AWS's hardware. It is IaaS. You choose its size, log in, install things, and it runs until you stop it.</li>
<li><b>Lambda</b> runs a single <b>function</b> each time an event happens, then stops. It is serverless. There is no machine for you to see; you upload code, and you pay only while it runs.</li>
</ul>
<div class="analogy"><b>Think of it like</b>Renting a car versus taking a taxi. A rented car (EC2) is yours all day: you can go anywhere and keep things in the boot, but you pay for every hour, even while it is parked. A taxi (Lambda) appears when you call it, takes you on one trip, and you pay only for that trip. For a daily commute the car wins; for occasional trips the taxi does.</div>
<p>Credentials and region are already set up in the sandbox, so you can go straight to the commands.</p>

<h4>EC2 ingredients: image, instance type, key pair</h4>
<p>To launch a virtual machine, called an <b>instance</b>, you make three choices:</p>
<ul>
<li>An <b>AMI</b> (Amazon Machine Image): the starting disk, with an operating system already installed, such as Ubuntu or Amazon Linux. Every AMI has an ID like <code>ami-0abcdef1234567890</code>. AMI IDs differ from region to region, so in real life you look up the current one for your region.</li>
<li>An <b>instance type</b>: how big the machine is. The name has a pattern. In <code>t3.micro</code>, <code>t</code> is the family (general purpose, "burstable", good for small sites that are mostly idle), <code>3</code> is the generation, and <code>micro</code> is the size: two virtual CPUs and 1 GiB of memory. Bigger sizes, like <code>large</code> or <code>xlarge</code>, cost more per hour.</li>
<li>A <b>key pair</b>: how you will log in with SSH. AWS keeps the public half and gives you the private half <b>once</b>.</li>
</ul>
<pre class="snip">aws ec2 create-key-pair --key-name my-key
# the "KeyMaterial" in the reply is your private key.
# Real life: save it with --query KeyMaterial --output text &gt; my-key.pem
# then chmod 400 my-key.pem, so only you can read it</pre>
<p>AWS does not keep a copy of the private key. If you lose it, you cannot use it to log in again; you would need a new key. And <code>chmod 400</code> is the Linux permission habit for secrets: read for the owner, nothing for anyone else. SSH refuses to use a key file other people can read.</p>

<h4>Launching, listing and terminating</h4>
<pre class="snip">aws ec2 run-instances --image-id ami-0abcdef1234567890 \\
    --instance-type t3.micro --key-name my-key
# the backslash continues the command on the next line</pre>
<p>The reply is a block of <b>JSON</b>, a format of labelled values in curly braces. Look for <code>InstanceId</code>, which here is <code>i-05a8c1e3f7b9d2468</code>, and <code>State</code>, which starts as <code>pending</code> while AWS finds hardware and boots the machine. A few moments later, <code>aws ec2 describe-instances</code> lists your instances, and the state reads <code>running</code>. When it runs, it also gets a public IP address, and you could SSH in exactly as you did with the VPS.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="Instance lifecycle: pending, running, stopped, terminated, and what each one costs">
<rect class="bx-info" x="10" y="20" width="110" height="44" rx="6"/><text class="t-b" x="65" y="47" text-anchor="middle">pending</text>
<path class="ln" d="M120 42h22"/><polygon class="ah" points="140,36 140,48 148,42"/>
<rect class="bx-ok" x="150" y="20" width="110" height="44" rx="6"/><text class="t-b" x="205" y="47" text-anchor="middle">running</text>
<path class="ln" d="M260 42h22"/><polygon class="ah" points="280,36 280,48 288,42"/>
<rect class="bx-warn" x="290" y="20" width="120" height="44" rx="6"/><text class="t-b" x="350" y="47" text-anchor="middle">stopped</text>
<path class="ln" d="M190 64v50"/><polygon class="ah" points="184,112 196,112 190,120"/>
<path class="ln" d="M350 64v38h-120v12"/><polygon class="ah" points="224,114 236,114 230,122"/>
<rect class="bx-bad" x="150" y="122" width="110" height="44" rx="6"/><text class="t-b" x="205" y="149" text-anchor="middle">terminated</text>
<text class="t-s" x="196" y="86" text-anchor="end">billed per second</text>
<text class="t-s" x="342" y="86" text-anchor="end">disk still billed</text>
<text class="t-s" x="205" y="190" text-anchor="middle">deleted for good, nothing billed</text>
<text class="t-s" x="205" y="214" text-anchor="middle">(this cannot be undone)</text>
</svg><figcaption>A new instance is pending, then running, which is billed by the second. Stopping it pauses the computing charge, but its disk is still billed. Terminating deletes it completely and stops all charges, and cannot be undone.</figcaption></figure>
<p>When you are done, terminate it, naming it by its ID:</p>
<pre class="snip">aws ec2 terminate-instances --instance-ids i-05a8c1e3f7b9d2468</pre>
<p><b>Stop</b> and <b>terminate</b> are different. Stopping is like shutting a laptop: you can start it again later, and its disk survives, which is why the disk keeps costing money. Terminating is like recycling the laptop: the instance and, by default, its main disk are gone for good.</p>
<div class="mistake"><b>Common mistake</b>Launching an instance to try something and forgetting it. It keeps running, and billing, all month. Make it a habit to run <code>describe-instances</code> at the end of every session and terminate whatever you no longer need. Stopped is not free.</div>

<h4>Lambda: just the function</h4>
<p>An EC2 instance runs all the time, waiting for work. Most small jobs do not need that. "Resize this uploaded photo", "answer this API request", "send a reminder email at 8am" each take a fraction of a second. Lambda lets you upload just the code for that job. AWS keeps it ready, runs it when an <b>event</b> arrives (an HTTP request, a new file, a timer), and scales it automatically: one copy for one request, hundreds of copies running side by side for hundreds.</p>
<p>A Lambda function in Node.js is a file that exports one function, called the <b>handler</b>:</p>
<pre class="snip">exports.handler = async (event) =&gt; {        // index.js
  const name = event.name || 'world';      // read the input
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, ' + name + '!' }),
  };
};</pre>
<p>Read it line by line. <code>exports.handler</code> makes the function available under the name <code>handler</code>. It is <code>async</code> because Lambda waits for its result. The <code>event</code> is the input: whatever data the trigger sent, already turned from JSON into a JavaScript object. <code>event.name || 'world'</code> means "use the name if there is one, otherwise <code>world</code>". The return value is the output. The <code>statusCode</code> and <code>body</code> shape is what Lambda expects when the function answers web requests, and <code>body</code> must be a string, so the object is turned into JSON text with <code>JSON.stringify</code>.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="An event goes into the handler, which returns a response that is saved to out.json">
<rect class="bx-dark" x="10" y="20" width="120" height="60" rx="6"/><text class="t-term" x="70" y="46" text-anchor="middle">event</text><text class="t-term" x="70" y="68" text-anchor="middle">name: Ada</text>
<path class="ln-a" d="M130 50h20"/><polygon class="ah-a" points="148,44 148,56 156,50"/>
<rect class="bx-a" x="158" y="20" width="110" height="60" rx="6"/><text class="t-b" x="213" y="46" text-anchor="middle">handler</text><text class="t-s" x="213" y="66" text-anchor="middle">index.js</text>
<path class="ln-a" d="M268 50h20"/><polygon class="ah-a" points="286,44 286,56 294,50"/>
<rect class="bx-ok" x="296" y="20" width="114" height="60" rx="6"/><text class="t-b" x="353" y="46" text-anchor="middle">out.json</text><text class="t-s" x="353" y="66" text-anchor="middle">Hello, Ada!</text>
<text class="t-s" x="10" y="116">--payload sends the event in.</text>
<text class="t-s" x="10" y="138">--handler index.handler names the file and</text>
<text class="t-s" x="10" y="160">the exported function to call.</text>
<text class="t-s" x="10" y="182">The last argument is where the reply is saved.</text>
</svg><figcaption>Invoking the function sends an event, here with the name Ada. Lambda calls the exported handler in index.js, and the value it returns is written to the file out.json.</figcaption></figure>

<h4>Packaging and creating the function</h4>
<p>Lambda receives code as a <b>zip file</b>. Then <code>create-function</code> tells AWS everything it needs:</p>
<pre class="snip">zip function.zip index.js
aws lambda create-function --function-name hello \\
    --runtime nodejs20.x --handler index.handler \\
    --role arn:aws:iam::123456789012:role/lambda-basic \\
    --zip-file fileb://function.zip</pre>
<ul>
<li><code>--runtime</code> picks the language version. Node.js versions retire over time, so for real projects choose the newest Node.js runtime Lambda currently offers.</li>
<li><code>--handler index.handler</code> means "in the file <code>index.js</code>, call the export named <code>handler</code>". If either half is wrong, every call fails with a "handler is undefined" or "cannot find module" error.</li>
<li><code>--role</code> is the identity the function runs as, written as an ARN. At minimum it lets the function write its logs. You will build roles in the IAM lesson.</li>
<li><code>fileb://</code> means "read this local file as binary data". <code>file://</code> is for text, such as JSON.</li>
</ul>

<h4>Invoking it and reading the result</h4>
<pre class="snip">aws lambda invoke --function-name hello \\
    --payload '{"name":"Ada"}' out.json
cat out.json     # {"statusCode":200,"body":"{\\"message\\":\\"Hello, Ada!\\"}"}</pre>
<p>The single quotes around the payload stop the shell from interfering with the double quotes inside the JSON. Two outputs can confuse you here. The command prints a short reply with <code>"StatusCode": 200</code>, which only means "Lambda ran your function". Your function's own answer is in <code>out.json</code>. If the code crashed, the command still prints 200 but adds <code>"FunctionError": "Unhandled"</code>, and <code>out.json</code> contains the error message. Always read <code>out.json</code>.</p>
<div class="tip"><b>Tip</b>With the real AWS CLI version 2, add <code>--cli-binary-format raw-in-base64-out</code> to <code>invoke</code> when you pass the payload as plain JSON. Without it, CLI v2 expects the payload in base64 encoding and reports an invalid base64 error.</div>

<h4>Which one should you choose?</h4>
<div class="tbl-wrap"><table><tr><th></th><th>EC2</th><th>Lambda</th></tr>
<tr><td>You pay</td><td>Every second it runs, busy or idle</td><td>Per request plus the milliseconds of run time</td></tr>
<tr><td>Scaling</td><td>You add instances, or set up Auto Scaling</td><td>Automatic, from zero to thousands at once</td></tr>
<tr><td>Limits</td><td>Runs for as long as you like, any software</td><td>Each run lasts at most 15 minutes</td></tr>
<tr><td>Good for</td><td>Steady long-running servers, custom software</td><td>Spiky or occasional event-driven work</td></tr></table></div>
<p>One trade-off to know: after a quiet spell, Lambda's first request takes a little longer while AWS prepares a fresh copy of your function, a <b>cold start</b>. For most apps it is a fraction of a second, but it is why steady, latency-sensitive services often stay on servers.</p>
<div class="try"><b>Try it in your head</b>An API gets about 10 requests a minute, except during a monthly sale when it gets 5,000. Which fits better? Lambda. An EC2 setup would need to be sized, and paid for all month, for the sale peak. Lambda scales up for the sale on its own and costs almost nothing on quiet days.</div>

<h4>Recap</h4>
<ul>
<li>EC2 rents a virtual machine: pick an AMI, an instance type like <code>t3.micro</code> and a key pair, then <code>run-instances</code>.</li>
<li>Instances go pending, running, stopped, terminated. Running bills per second, stopped still bills the disk, so terminate what you are done with.</li>
<li>Lambda runs one exported <code>handler(event)</code> per event and you pay per request.</li>
<li><code>create-function</code> needs a name, runtime, handler (<code>file.export</code>), role and zip; <code>invoke</code> writes the function's reply to a file.</li>
<li>Choose EC2 for steady, long-running work and Lambda for spiky, event-driven work.</li>
</ul>
`);

explain('c3',`
<h4>Where should your data live?</h4>
<p>In the last lesson you ran code. But almost every app also needs to <b>keep</b> things: the photos people upload, your site's images, nightly backups, and the rows of a database such as users and orders. Where you put them matters, because a server can be terminated at any moment, and anything stored only on its disk goes with it.</p>
<p>AWS has a storage service for each kind of data. This lesson covers the two you will use most:</p>
<div class="tbl-wrap"><table><tr><th>Service</th><th>Stores</th><th>Use for</th></tr>
<tr><td><b>S3</b></td><td>Files, called objects, in containers called buckets</td><td>Uploads, images, backups, static websites</td></tr>
<tr><td><b>EBS</b></td><td>A virtual disk attached to one EC2 instance</td><td>The server's own operating system and files</td></tr>
<tr><td><b>RDS</b></td><td>A managed relational database</td><td>Postgres or MySQL without running the database server yourself</td></tr></table></div>
<p>EBS you met without knowing it: it is the disk that stays billed when an instance is stopped. The rest of this lesson is about S3 and RDS.</p>

<h4>S3: buckets and objects</h4>
<p><b>S3</b> (Simple Storage Service) is storage for files on the internet. You never think about disks or how full they are; you simply put files in and take them out, and AWS stores each one redundantly across several availability zones. It is designed to be extremely durable: losing a file you stored is vanishingly rare.</p>
<p>Two words to learn:</p>
<ul>
<li>A <b>bucket</b> is a named container for files. You create it once.</li>
<li>An <b>object</b> is one stored file, plus a little information about it. Each object has a <b>key</b>, its name inside the bucket, such as <code>logo.png</code> or <code>images/2026/logo.png</code>.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="A bucket holds objects, each identified by a key; the full address is s3 colon slash slash bucket slash key">
<rect class="bx-info" x="10" y="10" width="400" height="160" rx="10"/>
<text class="t-b" x="24" y="34">bucket: you-portfolio-assets-2026</text>
<rect class="bx" x="24" y="48" width="180" height="50" rx="6"/><text class="t-m" x="114" y="70" text-anchor="middle">logo.png</text><text class="t-s" x="114" y="88" text-anchor="middle">an object</text>
<rect class="bx" x="216" y="48" width="180" height="50" rx="6"/><text class="t-m" x="306" y="70" text-anchor="middle">index.html</text><text class="t-s" x="306" y="88" text-anchor="middle">an object</text>
<rect class="bx" x="24" y="108" width="372" height="50" rx="6"/><text class="t-m" x="210" y="130" text-anchor="middle">backups/2026-10-01.sql</text><text class="t-s" x="210" y="148" text-anchor="middle">the key contains slashes; there is no real folder</text>
<text class="t-s" x="10" y="196">Full address of one object:</text>
<text class="t-m" x="10" y="222"><tspan class="t-info">s3://you-portfolio-assets-2026</tspan>/logo.png</text>
<text class="t-s" x="10" y="242">bucket name, then the object's key</text>
</svg><figcaption>A bucket is one big container. Inside it, each file is an object with a key, its name. Slashes in a key only look like folders. You address an object as s3, colon, two slashes, the bucket name, a slash and the key.</figcaption></figure>
<p>Inside a bucket there are no real folders. A key like <code>backups/2026-10-01.sql</code> is just a name that happens to contain a slash, and the console draws it as a folder to be friendly. The part before the last slash is called a <b>prefix</b>.</p>

<h4>Bucket names are global</h4>
<p>Here is the surprise that catches everyone. A bucket name must be unique across <b>every AWS account in the world</b>, not just yours, because it becomes part of a web address like <code>you-portfolio-assets-2026.s3.amazonaws.com</code>. Names must be 3 to 63 characters of lowercase letters, numbers, dots and hyphens.</p>
<p>So <code>aws s3 mb s3://photos</code> fails even on a brand-new account: somebody claimed <code>photos</code> years ago. The error is <code>BucketAlreadyExists</code>. Pick something distinctive, usually starting with your name, organisation or project, like <code>you-portfolio-assets-2026</code>.</p>

<h4>Working with S3 from the CLI</h4>
<p>The S3 commands deliberately look like Linux file commands:</p>
<pre class="snip">aws s3 mb s3://you-portfolio-assets-2026        # make bucket
aws s3 cp logo.png s3://you-portfolio-assets-2026/   # copy up
aws s3 ls                                        # list your buckets
aws s3 ls s3://you-portfolio-assets-2026         # list objects inside</pre>
<p><code>mb</code> means "make bucket", and <code>cp</code> copies just like the Linux <code>cp</code>: from the first place to the second. Ending the destination with a slash keeps the file's own name as the key. Swap the two arguments to download. <code>ls</code> with no argument lists your buckets; with a bucket address it lists the objects, showing date, size in bytes and key.</p>

<h4>Private by default, and presigned URLs</h4>
<p>New buckets block all public access by default, and you should keep it that way. Some of the largest data leaks in history were S3 buckets someone made public "just for a moment". Remember shared responsibility: AWS secures S3, but who may read your bucket is your setting.</p>
<p>So how do you let someone download one private file, say a customer's invoice? You create a <b>presigned URL</b>: a normal web link that includes a signature made with your credentials and an expiry time. Anyone holding the link can fetch that one object until it expires, and nothing else.</p>
<pre class="snip">aws s3 presign s3://you-portfolio-assets-2026/logo.png --expires-in 600
# prints https://...amazonaws.com/logo.png?X-Amz-Expires=600&amp;X-Amz-Signature=...</pre>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="You sign a link to one private object; the recipient can fetch it until it expires">
<rect class="bx-a" x="10" y="20" width="110" height="50" rx="6"/><text class="t-b" x="65" y="42" text-anchor="middle">You</text><text class="t-s" x="65" y="60" text-anchor="middle">aws s3 presign</text>
<path class="ln-a" d="M120 45h36"/><polygon class="ah-a" points="154,39 154,51 162,45"/>
<rect class="bx-info" x="164" y="20" width="110" height="50" rx="6"/><text class="t-b" x="219" y="42" text-anchor="middle">Link</text><text class="t-s" x="219" y="60" text-anchor="middle">valid 10 min</text>
<path class="ln-a" d="M274 45h36"/><polygon class="ah-a" points="308,39 308,51 316,45"/>
<rect class="bx" x="318" y="20" width="92" height="50" rx="6"/><text class="t-b" x="364" y="49" text-anchor="middle">Friend</text>
<path class="ln-ok" d="M364 70v40h-150v14"/><polygon class="ah-ok" points="208,122 220,122 214,130"/>
<rect class="bx-ok" x="120" y="132" width="190" height="50" rx="6"/><text class="t-b" x="215" y="154" text-anchor="middle">private bucket</text><text class="t-s" x="215" y="172" text-anchor="middle">returns logo.png</text>
<text class="t-s t-bad" x="10" y="160">after 10 min:</text><text class="t-s t-bad" x="10" y="178">access denied</text>
</svg><figcaption>You sign a link for one object. Your friend uses it to fetch that file from the private bucket. After ten minutes the same link is refused, and the bucket itself was never made public.</figcaption></figure>
<p><code>--expires-in</code> is in seconds, so 600 is ten minutes. The signature is checked by S3 on every use, so the link cannot be edited to point at a different file. The link can only do what your own credentials could, so it fails if you lack read access.</p>
<div class="mistake"><b>Common mistake</b>Making a whole bucket public because one image needed sharing. Share single files with presigned URLs, and for a public website put a CDN such as CloudFront in front of a private bucket. "Public bucket" should always feel alarming.</div>

<h4>Managed databases with RDS</h4>
<p>Running a database yourself on a server means installing it, applying security patches, taking backups, testing that the backups restore, and replacing the server when it fails, ideally without losing data. That is a lot of careful, boring work. A <b>managed database</b> does it for you. On AWS that is <b>RDS</b> (Relational Database Service), which runs Postgres, MySQL and others; outside AWS, Neon and Supabase offer managed Postgres too.</p>
<pre class="snip">aws rds create-db-instance --db-instance-identifier shop-db \\
    --engine postgres --db-instance-class db.t3.micro \\
    --allocated-storage 20 --master-username shop \\
    --manage-master-user-password</pre>
<ul>
<li><code>--db-instance-identifier</code> is your name for it. <code>--engine postgres</code> picks the database software.</li>
<li><code>--db-instance-class db.t3.micro</code> is the machine size, named like EC2 types with <code>db.</code> in front. <code>--allocated-storage 20</code> is 20 GiB of disk.</li>
<li><code>--master-username</code> is the administrator login. <code>--manage-master-user-password</code> tells AWS to generate the password and keep it in <b>Secrets Manager</b>, AWS's vault for secrets. You never type it, never see it in your shell history, and it can be rotated automatically.</li>
</ul>
<p>The database starts in the state <code>creating</code>, which takes several minutes in real life. <code>aws rds describe-db-instances</code> shows when it becomes <code>available</code>, and gives its <b>endpoint</b>: the host name and port (5432 for Postgres) your app connects to, which goes into your <code>DATABASE_URL</code>.</p>

<h4>Keep the database off the internet</h4>
<p>Look for <code>"PubliclyAccessible": false</code> in the output. A production database should only be reachable from your own app servers, inside a private network, never from the whole internet. If attackers cannot even connect, a guessed or leaked password is far less dangerous. Whether a new instance is public by default depends on your network setup, so in real projects say it explicitly with <code>--no-publicly-accessible</code>. The networking lesson shows how to build that private network.</p>
<div class="try"><b>Try it in your head</b>You run <code>aws s3 cp report.pdf s3://you-portfolio-assets-2026/docs/</code>. What is the object's key, and is there now a folder called <code>docs</code>? The key is <code>docs/report.pdf</code>. There is no real folder; <code>docs/</code> is just the start of the name, which the console displays as a folder.</div>

<h4>Recap</h4>
<ul>
<li>S3 stores objects (files) under keys inside buckets; address them as <code>s3://bucket/key</code>.</li>
<li>Bucket names are global across all AWS accounts: choose distinctive names.</li>
<li><code>aws s3 mb</code>, <code>cp</code> and <code>ls</code> work like their Linux cousins.</li>
<li>Keep buckets private and share single files with <code>aws s3 presign --expires-in</code>.</li>
<li>RDS runs, patches and backs up databases for you; <code>--manage-master-user-password</code> keeps the password in Secrets Manager.</li>
<li>Production databases are not publicly accessible: only your app can reach them.</li>
</ul>
`);

explain('c4',`
<h4>Why permissions are the heart of cloud security</h4>
<p>Your AWS account can do almost anything: launch hundreds of servers, read every file, delete every database. Every request to AWS, from the console, the CLI or your own code, arrives with credentials, and AWS must decide: <b>is this identity allowed to do this action to this thing?</b> The service that answers is <b>IAM</b>, Identity and Access Management.</p>
<p>In this lesson your CI pipeline needs to upload files to the portfolio bucket. The lazy answer is to give it full admin rights. The professional answer is to give it exactly "upload and read files in that one bucket", and nothing more. You will build that, and then prove it works.</p>
<div class="analogy"><b>Think of it like</b>Key cards in an office building. The cleaner's card opens the corridors and the store cupboard, not the server room. If a card is lost, the damage is limited to the doors it opens. IAM policies decide which doors each card opens.</div>

<h4>Identities: users, groups and roles</h4>
<p>IAM has three kinds of identity, each called a <b>principal</b> (the "who" in a request):</p>
<ul>
<li>An <b>IAM user</b> is a long-lived identity for one person or program. It can have a password for the console and <b>access keys</b> for the CLI, the AKIA keys you met in the first lesson.</li>
<li>A <b>group</b> is a set of users that share permissions, like "developers". Attach permissions to the group, and every member gets them.</li>
<li>A <b>role</b> is an identity with no password or keys of its own. Instead, something trusted <b>assumes</b> the role and receives <b>temporary credentials</b> that expire on their own, usually within an hour. EC2 instances, Lambda functions and GitHub Actions all use roles. The <code>--role</code> you passed to Lambda in the compute lesson was exactly this.</li>
</ul>
<p>Creating a user is one command:</p>
<pre class="snip">aws iam create-user --user-name deploy-bot</pre>
<p>A brand-new user can do <b>nothing</b>. IAM starts from "no" for everything. Permissions only exist when you attach a policy.</p>

<h4>Names for everything: ARNs</h4>
<p>To say which thing a permission applies to, IAM uses <b>ARNs</b> (Amazon Resource Names), the unique full names you saw in <code>get-caller-identity</code>. They look long, but they are built from parts separated by colons:</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="Two ARNs split into their parts: service, account and resource">
<text class="t-m" x="10" y="34">arn:aws:<tspan class="t-a">iam</tspan>::<tspan class="t-info">123456789012</tspan>:<tspan class="t-ok">user/deploy-bot</tspan></text>
<text class="t-s t-a" x="106" y="58" text-anchor="middle">service</text><text class="t-s t-info" x="192" y="58" text-anchor="middle">account</text><text class="t-s t-ok" x="306" y="58" text-anchor="middle">resource</text>
<text class="t-m" x="10" y="118">arn:aws:<tspan class="t-a">s3</tspan>:::<tspan class="t-ok">you-portfolio-</tspan></text>
<text class="t-m" x="100" y="140"><tspan class="t-ok">assets-2026/*</tspan></text>
<text class="t-s t-a" x="102" y="164" text-anchor="middle">service</text><text class="t-s t-ok" x="250" y="164" text-anchor="middle">bucket, then every object</text>
<text class="t-s" x="10" y="200">S3 names are global, so its ARNs leave region and account empty.</text>
</svg><figcaption>An ARN starts with arn, colon, aws, then the service, the region, the account number and the resource, separated by colons. A user ARN names the IAM service, your account and the user. An S3 ARN has empty region and account parts, because bucket names are already global, and ends with the bucket and a pattern for its objects.</figcaption></figure>
<p>The star is a <b>wildcard</b> meaning "anything here". So <code>arn:aws:s3:::you-portfolio-assets-2026/*</code> means "every object inside that bucket". Note that the bucket itself, <code>arn:aws:s3:::you-portfolio-assets-2026</code> without the slash and star, is a different resource from the objects in it.</p>

<h4>Policies: Effect, Action, Resource</h4>
<p>A <b>policy</b> is a JSON document listing permissions. Each entry is a <b>statement</b> with three key parts that answer: allow or deny, which actions, on which resources.</p>
<pre class="snip">{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:PutObject", "s3:GetObject"],
    "Resource": "arn:aws:s3:::you-portfolio-assets-2026/*"
  }]
}</pre>
<ul>
<li><code>Version</code> is the version of the policy language, and is always the literal date <code>2012-10-17</code>. It is not today's date; do not change it.</li>
<li><code>Effect</code> is <code>Allow</code> or <code>Deny</code>.</li>
<li><code>Action</code> lists operations, written <code>service:Operation</code>. <code>s3:PutObject</code> is uploading an object, <code>s3:GetObject</code> is downloading one.</li>
<li><code>Resource</code> is the ARN, or ARNs, the actions may touch.</li>
</ul>
<p>Read that statement aloud: "Allow uploading and downloading objects, but only in the portfolio bucket." It does not allow deleting objects, listing other buckets, or touching EC2. Real JSON files cannot contain comments, so keep notes outside the file.</p>
<p>You save it as <code>policy.json</code>, turn it into a named policy in AWS, then attach it to the user:</p>
<pre class="snip">aws iam create-policy --policy-name portfolio-uploads \\
    --policy-document file://policy.json
aws iam attach-user-policy --user-name deploy-bot \\
    --policy-arn arn:aws:iam::123456789012:policy/portfolio-uploads</pre>
<p><code>file://</code> tells the CLI to read the document from a local file. The <code>create-policy</code> output includes the new policy's ARN, which is what <code>attach-user-policy</code> needs. If the JSON has a typo, such as a missing comma or quote, you get a <code>MalformedPolicyDocument</code> error.</p>

<h4>How AWS decides: deny wins</h4>
<p>When a request arrives, AWS gathers every policy that applies to that principal and works through a fixed order:</p>
<figure class="fig"><svg viewBox="0 0 420 290" role="img" aria-label="Policy evaluation: an explicit deny wins, then an allow, otherwise denied by default">
<rect class="bx" x="70" y="10" width="280" height="40" rx="8"/><text class="t-b" x="210" y="35" text-anchor="middle">Request: who, action, resource</text>
<path class="ln" d="M210 50v16"/><polygon class="ah" points="204,64 216,64 210,72"/>
<rect class="bx-bad" x="40" y="74" width="230" height="44" rx="8"/><text class="t" x="155" y="101" text-anchor="middle">Any statement Denies it?</text>
<path class="ln" d="M270 96h40"/><polygon class="ah" points="308,90 308,102 316,96"/><text class="t-s" x="290" y="88" text-anchor="middle">yes</text>
<rect class="bx-bad" x="318" y="76" width="92" height="40" rx="6"/><text class="t-s t-bad" x="364" y="101" text-anchor="middle">DENIED</text>
<path class="ln" d="M155 118v18"/><polygon class="ah" points="149,134 161,134 155,142"/><text class="t-s" x="166" y="134">no</text>
<rect class="bx-ok" x="40" y="144" width="230" height="44" rx="8"/><text class="t" x="155" y="171" text-anchor="middle">Any statement Allows it?</text>
<path class="ln-ok" d="M270 166h40"/><polygon class="ah-ok" points="308,160 308,172 316,166"/><text class="t-s" x="290" y="158" text-anchor="middle">yes</text>
<rect class="bx-ok" x="318" y="146" width="92" height="40" rx="6"/><text class="t-s t-ok" x="364" y="171" text-anchor="middle">ALLOWED</text>
<path class="ln" d="M155 188v18"/><polygon class="ah" points="149,204 161,204 155,212"/><text class="t-s" x="166" y="204">no</text>
<rect class="bx-warn" x="40" y="214" width="230" height="44" rx="8"/><text class="t" x="155" y="241" text-anchor="middle">Denied by default</text>
<text class="t-s" x="155" y="280" text-anchor="middle">"implicit deny": nobody said yes</text>
</svg><figcaption>AWS first looks for any statement that explicitly denies the request; if it finds one, the answer is no, whatever else says yes. Then it looks for an allow. If nothing allows it, the request is refused by default.</figcaption></figure>
<ol>
<li>An <b>explicit Deny</b> anywhere beats every Allow.</li>
<li>Otherwise, an <b>Allow</b> that matches the action and the resource permits it.</li>
<li>Otherwise, it is denied: an <b>implicit deny</b>, because nothing said yes.</li>
</ol>
<p>Everything starts as "no". That is why you only ever need to write down what <b>is</b> allowed.</p>

<h4>Proving it with the policy simulator</h4>
<p>Do not just hope a policy is right. IAM has a simulator that evaluates it without doing anything for real:</p>
<pre class="snip">aws iam simulate-principal-policy \\
    --policy-source-arn arn:aws:iam::123456789012:user/deploy-bot \\
    --action-names s3:PutObject s3:DeleteBucket \\
    --resource-arns arn:aws:s3:::you-portfolio-assets-2026/logo.png</pre>
<p>In the output, find <code>EvalDecision</code> for each action. You want <code>allowed</code> for <code>s3:PutObject</code> and <code>implicitDeny</code> for <code>s3:DeleteBucket</code>, because nothing allowed it. If you ever see <code>explicitDeny</code>, some statement says Deny.</p>

<h4>Least privilege and the blast radius</h4>
<p><b>Least privilege</b> means every identity gets exactly the permissions its job needs, and no more: the same habit you learned with <code>chmod 600</code> and <code>sudo</code> on Linux. The reason is the <b>blast radius</b>: how much damage is possible if those credentials leak. CI keys end up in logs, laptops get stolen, dependencies get compromised. If <code>deploy-bot</code> has <code>AdministratorAccess</code>, a leak hands an attacker your whole account, including the bill. With your policy, the worst they can do is upload files to one bucket.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>"Action": "s3:*"</code> or <code>"Resource": "*"</code> to make an <code>AccessDenied</code> error go away. It works, and it quietly grants deleting every bucket in the account. Read the error instead: it names the exact action that was denied, so add just that action on just that resource.</div>

<h4>Roles over access keys</h4>
<p>Access keys for an IAM user never expire on their own, so a leaked key works until someone notices and deletes it. Roles fix that. A Lambda function or EC2 instance is given a role, and AWS hands it fresh temporary credentials automatically. GitHub Actions can do the same through <b>OIDC</b> (OpenID Connect): GitHub proves to AWS "this is a run of workflow X in repository Y", and AWS lets that run assume a role for a short time. No long-lived secret is stored anywhere. The <code>deploy-bot</code> user in this lesson is fine for learning, but in a real project you would give the same policy to a role.</p>
<div class="try"><b>Try it in your head</b><code>deploy-bot</code> has only your policy. It tries <code>s3:DeleteObject</code> on <code>logo.png</code> in the portfolio bucket. Result? Denied, an implicit deny: the policy allows only PutObject and GetObject, and nothing allows deleting.</div>

<h4>Recap</h4>
<ul>
<li>IAM decides whether a principal (user, group member or role) may perform an action on a resource.</li>
<li>A policy is JSON: statements with <code>Effect</code>, <code>Action</code> (<code>service:Operation</code>) and <code>Resource</code> (an ARN). <code>Version</code> is always <code>2012-10-17</code>.</li>
<li>Explicit Deny beats Allow; with no Allow, the answer is an implicit deny.</li>
<li><code>create-policy</code>, then <code>attach-user-policy</code>, then check with <code>simulate-principal-policy</code>.</li>
<li>Least privilege keeps the blast radius small. Prefer roles with temporary credentials over access keys.</li>
</ul>
`);

explain('c5',`
<h4>Why your cloud needs its own network</h4>
<p>So far your servers and databases have floated somewhere inside AWS. In reality, every one of them sits in a network, and the network decides who can even <b>try</b> to connect. IAM, from the last lesson, controls who may call the AWS API. Networking controls a different thing: which <b>network traffic</b>, such as a visitor's browser or an attacker's scanner, can reach your machines at all.</p>
<p>The goal is the layout every serious web app uses: the website is reachable from the internet on HTTPS, the admin door (SSH) is open only to you, and the database is not reachable from the internet at all.</p>
<div class="analogy"><b>Think of it like</b>A private campus. The <b>VPC</b> is the wall around the whole site. <b>Subnets</b> are the buildings: a reception building near the public gate, and back-office buildings with no street entrance. <b>Security groups</b> are the guards at each door, holding a list of who may come in.</div>

<h4>IP ranges and CIDR notation</h4>
<p>A <b>VPC</b> (Virtual Private Cloud) is your own private network inside AWS. When you create one, you choose which IP addresses it owns, written in <b>CIDR notation</b>, like <code>10.0.0.0/16</code>. Addresses starting with <code>10.</code> are reserved for private networks, so they never clash with real internet addresses.</p>
<p>The number after the slash is the key. An IPv4 address is 32 bits, four numbers of 8 bits each. The slash number says how many bits, counting from the left, are <b>fixed</b>. The remaining bits are free to vary, and each free bit doubles the number of addresses.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="CIDR: /16 fixes two numbers and leaves 65,536 addresses, /24 fixes three and leaves 256, /32 fixes all four and is one address">
<g text-anchor="middle">
<text class="t-b" x="70" y="22">range</text><text class="t-b" x="230" y="22">fixed / free</text><text class="t-b" x="370" y="22">addresses</text>
</g>
<text class="t-m" x="10" y="62">10.0.0.0/16</text>
<rect class="bx-a" x="140" y="44" width="44" height="28" rx="3"/><rect class="bx-a" x="188" y="44" width="44" height="28" rx="3"/><rect class="bx-ok" x="236" y="44" width="44" height="28" rx="3"/><rect class="bx-ok" x="284" y="44" width="44" height="28" rx="3"/>
<text class="t" x="370" y="63" text-anchor="middle">65,536</text>
<text class="t-m" x="10" y="112">10.0.1.0/24</text>
<rect class="bx-a" x="140" y="94" width="44" height="28" rx="3"/><rect class="bx-a" x="188" y="94" width="44" height="28" rx="3"/><rect class="bx-a" x="236" y="94" width="44" height="28" rx="3"/><rect class="bx-ok" x="284" y="94" width="44" height="28" rx="3"/>
<text class="t" x="370" y="113" text-anchor="middle">256</text>
<text class="t-m" x="10" y="162">x.x.x.x/32</text>
<rect class="bx-a" x="140" y="144" width="44" height="28" rx="3"/><rect class="bx-a" x="188" y="144" width="44" height="28" rx="3"/><rect class="bx-a" x="236" y="144" width="44" height="28" rx="3"/><rect class="bx-a" x="284" y="144" width="44" height="28" rx="3"/>
<text class="t" x="370" y="163" text-anchor="middle">1</text>
<rect class="bx-a" x="140" y="190" width="18" height="18" rx="3"/><text class="t-s" x="164" y="204">fixed 8 bits</text>
<rect class="bx-ok" x="260" y="190" width="18" height="18" rx="3"/><text class="t-s" x="284" y="204">free 8 bits</text>
</svg><figcaption>Each block is one of the four numbers in an address, 8 bits each. A /16 fixes the first two numbers and leaves two free, which gives 256 times 256, or 65,536 addresses. A /24 fixes three and leaves 256. A /32 fixes all four, so it means exactly one address.</figcaption></figure>
<ul>
<li><code>10.0.0.0/16</code>: the first 16 bits (<code>10.0</code>) are fixed; everything from <code>10.0.0.0</code> to <code>10.0.255.255</code> belongs to it. That is 65,536 addresses, plenty for a whole VPC.</li>
<li><code>10.0.1.0/24</code>: the first 24 bits (<code>10.0.1</code>) are fixed; it covers <code>10.0.1.0</code> to <code>10.0.1.255</code>, 256 addresses. AWS keeps 5 of each subnet for itself, leaving 251.</li>
<li><code>198.51.100.7/32</code>: all 32 bits fixed, so it means that one address only.</li>
<li><code>0.0.0.0/0</code>: zero bits fixed, so it matches <b>every</b> address. In a firewall rule it means "the whole internet".</li>
</ul>

<h4>Subnets: public and private</h4>
<p>A <b>subnet</b> is a slice of the VPC's range, and each subnet lives in one availability zone. The VPC <code>10.0.0.0/16</code> can hold subnets like <code>10.0.1.0/24</code> and <code>10.0.2.0/24</code>, since both fit inside it. What makes a subnet "public" or "private" is not its name but its <b>route table</b>, the list of directions for traffic leaving it:</p>
<ul>
<li>A <b>public subnet</b> has a route sending internet traffic to an <b>internet gateway</b>, the VPC's door to the internet. Machines there can have public IP addresses. Put load balancers here, the front doors that receive visitors.</li>
<li>A <b>private subnet</b> has no such route. Nothing on the internet can start a connection to it. Put app servers and databases here. (If they need to download updates, a NAT gateway lets them start outgoing connections only.)</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 300" role="img" aria-label="A VPC with a public subnet holding a load balancer and a private subnet holding the app and database">
<rect class="bx-info" x="150" y="8" width="120" height="34" rx="6"/><text class="t-b" x="210" y="30" text-anchor="middle">Internet</text>
<path class="ln-a" d="M210 42v30"/><polygon class="ah-a" points="204,70 216,70 210,78"/><text class="t-s t-a" x="220" y="62">443 only</text>
<rect class="bx" x="10" y="52" width="400" height="240" rx="10"/>
<text class="t-m" x="22" y="74">VPC 10.0.0.0/16</text>
<rect class="bx-ok" x="24" y="84" width="372" height="66" rx="8"/>
<text class="t-s" x="36" y="102">public subnet 10.0.1.0/24</text>
<rect class="bx" x="140" y="108" width="140" height="34" rx="6"/><text class="t-s" x="210" y="130" text-anchor="middle">load balancer</text>
<path class="ln" d="M210 142v24"/><polygon class="ah" points="204,164 216,164 210,172"/>
<rect class="bx-warn" x="24" y="160" width="372" height="120" rx="8"/>
<text class="t-s" x="36" y="186">private subnet 10.0.2.0/24</text>
<rect class="bx" x="140" y="174" width="140" height="34" rx="6"/><text class="t-s" x="210" y="196" text-anchor="middle">app servers</text>
<path class="ln" d="M210 208v18"/><polygon class="ah" points="204,224 216,224 210,232"/>
<rect class="bx" x="140" y="234" width="140" height="34" rx="6"/><text class="t-s" x="210" y="256" text-anchor="middle">database :5432</text>
<text class="t-s" x="300" y="256">no route</text><text class="t-s" x="300" y="272">from internet</text>
</svg><figcaption>Visitors reach only the public subnet, on port 443, where the load balancer receives them and passes requests to app servers in the private subnet. The app servers talk to the database, which sits in the private subnet with no route from the internet.</figcaption></figure>

<h4>Security groups: a guard on every door</h4>
<p>Subnets decide where traffic can be routed. A <b>security group</b> is a firewall attached to each individual resource, such as an instance or a database, and lists which incoming traffic is allowed. Key facts:</p>
<ul>
<li>Rules only <b>allow</b>. Anything not allowed is blocked. A new security group allows no incoming traffic at all, and allows all outgoing traffic.</li>
<li>Each inbound rule names a <b>protocol</b> (usually <code>tcp</code>), a <b>port</b> (which service), and a <b>source</b> (who may connect, as a CIDR range or another security group).</li>
<li>They are <b>stateful</b>: if a request is allowed in, the reply is automatically allowed back out. You never write rules for replies.</li>
</ul>
<p>It is the same idea as <code>ufw</code> on your VPS, except it lives outside the machine, so a mistake inside the server cannot switch it off.</p>

<h4>Building it step by step</h4>
<pre class="snip">aws ec2 create-vpc --cidr-block 10.0.0.0/16
aws ec2 create-subnet --vpc-id vpc-05a8c1e3f7b9d2468 \\
    --cidr-block 10.0.1.0/24
aws ec2 create-security-group --group-name web-sg \\
    --description "Web servers" --vpc-id vpc-05a8c1e3f7b9d2468</pre>
<p>Each command prints an ID you need in the next one: the VPC ID goes into the subnet and security group commands, and the group ID (<code>sg-...</code>) goes into the rules. In this sandbox the IDs are predictable; in real life, copy them from the output. A security group <b>must</b> have a description, which is why that option is there.</p>
<p>Now the two rules:</p>
<pre class="snip">aws ec2 authorize-security-group-ingress --group-id sg-05a8c1e3f7b9d2468 \\
    --protocol tcp --port 443 --cidr 0.0.0.0/0          # HTTPS, everyone
aws ec2 authorize-security-group-ingress --group-id sg-05a8c1e3f7b9d2468 \\
    --protocol tcp --port 22 --cidr 198.51.100.7/32     # SSH, just you</pre>
<p>"Ingress" means incoming. Read each rule as a sentence: "allow TCP on port 443 from anywhere", and "allow TCP on port 22 from this single address". Finally you launch an instance with <code>run-instances</code>, adding <code>--subnet-id</code> and <code>--security-group-ids</code> to place it in your subnet behind your guard.</p>
<div class="mistake"><b>Common mistake</b>Opening port 22 to <code>0.0.0.0/0</code> "just for now". Automated bots scan every public address for SSH within minutes of it appearing, trying common passwords. Restrict SSH to your own IP with <code>/32</code>, or better, use AWS Systems Manager Session Manager, which gives you a shell with no inbound port open at all.</div>

<h4>Where the database goes</h4>
<p>The database belongs in a private subnet, with its own security group allowing port 5432 (Postgres) only from the <b>app servers' security group</b>, not from an IP range. Using a group as the source means "any machine wearing that badge", so it keeps working as app servers come and go. Now an attacker needs to get past the internet, into the VPC, onto an app server, and only then try the password. Each layer has to fail before data leaks. Security people call this <b>defence in depth</b>.</p>
<div class="try"><b>Try it in your head</b>Your security group allows <code>tcp 22 from 198.51.100.7/32</code>. You go to a café and your public IP becomes <code>203.0.113.50</code>. Can you SSH in? No: <code>/32</code> means only <code>198.51.100.7</code>. The connection simply times out, because security groups drop disallowed traffic silently. You would add a rule for your new IP, then remove it afterwards.</div>

<h4>Recap</h4>
<ul>
<li>A VPC is your private network, defined by a CIDR range such as <code>10.0.0.0/16</code>.</li>
<li>The slash number is how many bits are fixed: /16 is 65,536 addresses, /24 is 256, /32 is one, /0 is everyone.</li>
<li>Subnets split the VPC: public ones route to an internet gateway, private ones do not. Databases and apps go private.</li>
<li>Security groups are stateful, allow-only firewalls on each resource: protocol, port and source.</li>
<li>443 from <code>0.0.0.0/0</code> for a website; SSH only from your <code>/32</code>, or no SSH at all with Session Manager.</li>
</ul>
`);
