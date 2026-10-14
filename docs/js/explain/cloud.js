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
