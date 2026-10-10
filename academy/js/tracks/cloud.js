/* Track 14: Cloud fundamentals (AWS + Terraform) */
(()=>{
const O=()=>OPS.st,H=re=>OPS.Hx(re),F=p=>OPS.file(p)||'';
const A=()=>OPS.st.aws;
const conf=o=>{o.st.aws.conf=true;o.st.aws.region='us-east-1';o.write('/home/you/.aws/config','[default]\nregion = us-east-1\noutput = json\n')};
const BUCKET='you-portfolio-assets-2026';
const LAMBDA_JS=`exports.handler = async (event) => {
  const name = event.name || 'world';
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello, ' + name + '!' }),
  };
};
`;
const POLICY=`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::${BUCKET}/*"
    }
  ]
}
`;
const TF1=`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "assets" {
  bucket = "you-portfolio-assets-tf-2026"

  tags = {
    Project = "portfolio"
  }
}
`;
const TF2=TF1+`
resource "aws_instance" "web" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t3.micro"

  tags = {
    Name = "portfolio-web"
  }
}
`;
defineTrack({id:'cloud',name:'Cloud fundamentals',weeks:'2 weeks',
lessons:[
{id:'c1',lvl:'Concepts',title:'Cloud concepts & the AWS CLI',kind:'ops',
 intro:'This terminal has a simulated AWS account. Use made-up values when aws configure asks for keys, like AKIAEXAMPLE123.',
 sum:'The cloud rents you computing on demand. IaaS gives raw servers and networks (EC2); PaaS runs your app for you (Vercel, Render, Elastic Beanstalk); serverless runs functions per request (Lambda); SaaS is finished software (Gmail). Providers run regions made of several availability zones; spread across zones for resilience. In the shared responsibility model the provider secures the hardware and you secure your configuration, data and access. Set billing alerts on day one.',
 keys:['aws configure','aws sts get-caller-identity','IaaS / PaaS / SaaS / serverless','regions & availability zones','shared responsibility','billing alarms'],
 concept:`<div class="tbl-wrap"><table><tr><th>Model</th><th>You manage</th><th>Examples</th></tr>
<tr><td><b>IaaS</b></td><td>OS, runtime, app, scaling</td><td>AWS EC2, DigitalOcean droplets</td></tr>
<tr><td><b>PaaS</b></td><td>Just your app and config</td><td>Vercel, Render, Heroku, Elastic Beanstalk</td></tr>
<tr><td><b>Serverless</b></td><td>Functions; billed per request</td><td>AWS Lambda, Cloudflare Workers</td></tr>
<tr><td><b>SaaS</b></td><td>Nothing; you use it</td><td>Gmail, Slack, GitHub</td></tr></table></div>
<p>AWS has <b>regions</b> (us-east-1, eu-west-1, af-south-1…), each with several <b>availability zones</b> (separate data centers). Run important things in at least two zones.</p>
<div class="tip"><b>Day one rules</b>Turn on MFA for the root account, create an IAM user or SSO login for daily work, and set a billing alarm. Surprise bills are the classic beginner mistake.</div>`,
 tasks:[
  {t:'Configure the CLI (made-up keys, region us-east-1, output json).',h:'aws configure\nAKIAEXAMPLE123\nexample-secret-key\nus-east-1\njson',c:()=>A().conf&&A().region==='us-east-1'},
  {t:'Check which identity the CLI is using.',h:'aws sts get-caller-identity',c:()=>H(/^aws sts get-caller-identity/)},
  {t:'Vercel builds and hosts your app; you never touch a server. That\'s…',o:['IaaS','PaaS','SaaS','On-premises'],a:1,e:'Platform as a Service: you bring the code, they run it.'},
  {t:'How do you survive one data center going down?',o:['Use a bigger instance','Run across multiple availability zones','Use a CDN only','Restart the server'],a:1,e:'AZs are independent facilities within a region.'},
  {t:'Under the shared responsibility model, who secures your S3 bucket\'s permissions?',o:['AWS','You','Nobody','Your users'],a:1,e:'AWS secures the infrastructure; you secure what you configure on it.'},
  {t:'First thing to set up on a new AWS account?',o:['A huge EC2 instance','MFA on the root user and a billing alarm','Public S3 buckets','Nothing'],a:1,e:'Protect the account, and know when costs climb.'},
 ]},
{id:'c2',lvl:'Compute',title:'Compute: EC2 & Lambda',kind:'ops',
 setup:o=>{conf(o);o.mkdirp('/home/you/hello-fn');o.H().cwd='/home/you/hello-fn'},
 intro:'Credentials are already configured. Launch a virtual server, then deploy a serverless function.',
 sum:'EC2 gives you virtual servers: choose an image (AMI) and an instance type (t3.micro is small and cheap), attach a key pair for SSH, and pay while it runs, so terminate what you don\'t need. Lambda runs a function per event with no servers to manage: you upload code, AWS scales it automatically, and you pay per request. Pick EC2 for long-running or specialized workloads, and Lambda for spiky, event-driven work.',
 keys:['aws ec2 create-key-pair','aws ec2 run-instances --image-id --instance-type','describe-instances','terminate-instances','exports.handler = async (event) => ...','aws lambda create-function','aws lambda invoke'],
 concept:`<div class="tbl-wrap"><table><tr><th></th><th>EC2</th><th>Lambda</th></tr>
<tr><td>What</td><td>A virtual machine you manage</td><td>A function AWS runs on each event</td></tr>
<tr><td>Billing</td><td>Per second it's running</td><td>Per request plus run time (generous free tier)</td></tr>
<tr><td>Scaling</td><td>You add instances (or Auto Scaling)</td><td>Automatic, to thousands in parallel</td></tr>
<tr><td>Good for</td><td>Long-running servers, custom software</td><td>APIs with spiky traffic, cron jobs, file processing</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">exports.handler = async (event) => {        // index.js
  return { statusCode: 200, body: JSON.stringify({ message: 'Hello, ' + event.name }) };
};</pre>
<p>This simulator gives predictable resource IDs. Your first instance will be <code>i-05a8c1e3f7b9d2468</code>.</p>
<div class="tip"><b>Cost habit</b>Stopped instances still bill for their disks. Terminate anything you're done with.</div>`,
 tasks:[
  {t:'Create a key pair named my-key.',h:'aws ec2 create-key-pair --key-name my-key',c:()=>!!A().keys['my-key']},
  {t:'Launch a t3.micro instance with that key.',h:'aws ec2 run-instances --image-id ami-0abcdef1234567890 --instance-type t3.micro --key-name my-key',c:()=>Object.values(A().ec2).some(i=>i.type==='t3.micro'&&i.key==='my-key')},
  {t:'List your instances and see it running.',h:'aws ec2 describe-instances',c:()=>O().flags.described&&Object.values(A().ec2).some(i=>i.state==='running')},
  {t:'Terminate it so it stops costing money.',h:'aws ec2 terminate-instances --instance-ids i-05a8c1e3f7b9d2468',c:()=>Object.values(A().ec2).length>0&&Object.values(A().ec2).every(i=>i.state==='terminated')},
  {t:'Write a Lambda handler in index.js, zip it, and create the function.',h:'nano index.js\nzip function.zip index.js\naws lambda create-function --function-name hello --runtime nodejs20.x --handler index.handler --role arn:aws:iam::123456789012:role/lambda-basic --zip-file fileb://function.zip',f:{'index.js':LAMBDA_JS},c:()=>!!A().lambda.hello},
  {t:'Invoke it with {"name":"Ada"} and read the result.',h:'aws lambda invoke --function-name hello --payload \'{"name":"Ada"}\' out.json\ncat out.json',c:()=>/Hello, Ada!/.test(F('/home/you/hello-fn/out.json'))},
  {t:'An API gets 10 requests a minute normally and 5,000 during a monthly sale. Better fit?',o:['A huge EC2 instance running all month','Lambda: scales automatically and you pay per request','A desktop PC','Two EC2 instances'],a:1,e:'Spiky, event-driven traffic is Lambda\'s sweet spot.'},
 ]},
{id:'c3',lvl:'Storage',title:'Storage: S3 & managed databases',kind:'ops',
 setup:o=>{conf(o);o.mkdirp('/home/you/site');o.H().cwd='/home/you/site';o.write('logo.png','(png bytes)');o.write('index.html','<h1>Portfolio</h1>\n')},
 intro:'Store files in S3 and create a managed Postgres database.',
 sum:'S3 stores objects (files) in buckets with globally unique names. It is cheap, durable and private by default; share files temporarily with presigned URLs instead of making buckets public. Managed databases (RDS, Aurora, or Neon and Supabase outside AWS) handle backups, patching and failover for you. Keep databases off the public internet and let a secret manager hold the master password.',
 keys:['aws s3 mb s3://bucket','aws s3 cp file s3://bucket/','aws s3 ls','aws s3 presign --expires-in','bucket names are global','aws rds create-db-instance','not publicly accessible'],
 concept:`<div class="tbl-wrap"><table><tr><th>Service</th><th>Stores</th><th>Use for</th></tr>
<tr><td><b>S3</b></td><td>Objects (files) in buckets</td><td>Uploads, images, backups, static sites</td></tr>
<tr><td><b>EBS</b></td><td>Disks attached to one EC2 instance</td><td>A server's own filesystem</td></tr>
<tr><td><b>RDS</b></td><td>Managed relational databases</td><td>Postgres or MySQL without running the server yourself</td></tr></table></div>
<p>Bucket names are <b>global</b> across every AWS account, so pick something unique like <code>${BUCKET}</code>.</p>
<div class="tip"><b>Leaked buckets</b>Many data breaches are public S3 buckets. Keep buckets private and hand out <b>presigned URLs</b>, which are temporary links that expire.</div>`,
 tasks:[
  {t:`Create a bucket named ${BUCKET}.`,h:`aws s3 mb s3://${BUCKET}`,c:()=>!!A().s3[BUCKET]},
  {t:'Upload logo.png and list the bucket.',h:`aws s3 cp logo.png s3://${BUCKET}/\naws s3 ls s3://${BUCKET}`,c:()=>A().s3[BUCKET]&&A().s3[BUCKET].objects['logo.png']!=null&&H(/^aws s3 ls s3:\/\//)},
  {t:'Create a link to the logo that expires in 10 minutes.',h:`aws s3 presign s3://${BUCKET}/logo.png --expires-in 600`,c:()=>H(/^aws s3 presign/)},
  {t:'Why might aws s3 mb s3://photos fail even on a brand-new account?',o:['S3 is down','Bucket names are global, and someone already owns "photos"','You need a credit card','The name is too short'],a:1,e:'Pick globally unique names, often prefixed with your org or project.'},
  {t:'Create a small private Postgres database, with AWS managing the master password.',h:'aws rds create-db-instance --db-instance-identifier shop-db --engine postgres --db-instance-class db.t3.micro --allocated-storage 20 --master-username shop --manage-master-user-password\naws rds describe-db-instances',c:()=>A().rds['shop-db']&&!A().rds['shop-db'].public&&A().rds['shop-db'].status==='available'},
  {t:'Where should a production database usually live?',o:['Publicly accessible on the internet','In a private network, reachable only by your app servers','On a developer laptop','In an S3 bucket'],a:1,e:'If the internet can\'t reach the database, it can\'t attack it.'},
 ]},
{id:'c4',lvl:'Security',title:'IAM: users, policies & least privilege',kind:'ops',
 setup:o=>{conf(o);o.st.aws.s3[BUCKET]={objects:{},region:'us-east-1'};o.mkdirp('/home/you/iam');o.H().cwd='/home/you/iam'},
 intro:'Your CI pipeline needs to upload files to the portfolio bucket, and nothing else. Give it exactly that.',
 sum:'IAM controls who can do what in AWS. A policy is JSON with statements (Effect, Action, Resource); attach policies to users, groups or roles. Follow least privilege: grant only the actions and resources a job needs (s3:PutObject on one bucket, not s3:* or AdministratorAccess). Test with the policy simulator. Prefer IAM roles with short-lived credentials over long-lived access keys for apps and CI.',
 keys:['aws iam create-user','policy JSON: Effect / Action / Resource','aws iam create-policy --policy-document file://policy.json','aws iam attach-user-policy','aws iam simulate-principal-policy','least privilege','roles over access keys'],
 concept:`<pre class="snip" style="margin-bottom:12px">{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:PutObject", "s3:GetObject"],          // only these actions
    "Resource": "arn:aws:s3:::${BUCKET}/*"   // only this bucket
  }]
}</pre>
<p>Anything not explicitly allowed is denied. An explicit <code>Deny</code> beats any <code>Allow</code>.</p>
<div class="tbl-wrap"><table><tr><th>Identity</th><th>Use for</th></tr><tr><td>IAM user + access keys</td><td>Legacy scripts. Keys are long-lived, so rotate them</td></tr><tr><td><b>IAM role</b></td><td>EC2, Lambda, GitHub Actions (OIDC): temporary credentials, nothing to leak</td></tr></table></div>`,
 tasks:[
  {t:'Create an IAM user named deploy-bot.',h:'aws iam create-user --user-name deploy-bot',c:()=>!!A().users['deploy-bot']},
  {t:'Write a least-privilege policy (PutObject and GetObject on the bucket only) and create it.',h:'nano policy.json\naws iam create-policy --policy-name portfolio-uploads --policy-document file://policy.json',f:{'policy.json':POLICY},c:()=>{const p=A().policies['arn:aws:iam::123456789012:policy/portfolio-uploads'];if(!p)return false;const st=[].concat(p.doc.Statement);return st.every(s=>![].concat(s.Action).some(a=>/\*/.test(a))&&[].concat(s.Resource).every(r=>r!=='*'))}},
  {t:'Attach the policy to deploy-bot.',h:'aws iam attach-user-policy --user-name deploy-bot --policy-arn arn:aws:iam::123456789012:policy/portfolio-uploads',c:()=>(A().attached['deploy-bot']||[]).length>0},
  {t:'Simulate: PutObject should be allowed and DeleteBucket denied.',h:`aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::123456789012:user/deploy-bot --action-names s3:PutObject s3:DeleteBucket --resource-arns arn:aws:s3:::${BUCKET}/logo.png`,c:()=>{const s=O().flags.simulated||[];return s.includes('s3:PutObject')&&s.includes('s3:DeleteBucket')}},
  {t:'Why not just attach AdministratorAccess to the CI user?',o:['It costs more','If its keys leak, an attacker controls your whole account; least privilege limits the blast radius','Admins can\'t upload files','AWS forbids it'],a:1,e:'Give each identity exactly what its job needs.'},
  {t:'How should a Lambda function or GitHub Actions get AWS access?',o:['Paste access keys into the code','An IAM role with temporary credentials (OIDC for GitHub Actions)','Use the root account','Share one admin user'],a:1,e:'Temporary credentials expire on their own, so there\'s nothing long-lived to leak.'},
 ]},
{id:'c5',lvl:'Networking',title:'Networking: VPCs & security groups',kind:'ops',
 setup:o=>conf(o),
 intro:'Build a network for a web server: a VPC, a subnet, and a firewall (security group) that only lets the right traffic in. IDs are predictable here: your VPC will be vpc-05a8c1e3f7b9d2468.',
 sum:'A VPC is your private network in the cloud, defined by an IP range (CIDR such as 10.0.0.0/16) and split into subnets: public subnets for load balancers, private ones for apps and databases. Security groups are stateful firewalls on each resource. Allow only the ports you need (443 from anywhere for a website) and restrict admin ports: SSH (22) only from your IP, or better, no SSH at all with AWS Systems Manager.',
 keys:['aws ec2 create-vpc --cidr-block 10.0.0.0/16','create-subnet 10.0.1.0/24','create-security-group','authorize-security-group-ingress --port 443 --cidr 0.0.0.0/0','SSH only from your IP (/32)','public vs private subnets'],
 concept:`<pre class="snip" style="margin-bottom:12px">VPC 10.0.0.0/16  (65,536 addresses)
 ├─ public subnet  10.0.1.0/24   → load balancer, bastion
 └─ private subnet 10.0.2.0/24   → app servers, database

security group "web-sg"
  allow tcp 443 from 0.0.0.0/0        ← the whole internet, for HTTPS
  allow tcp 22  from 198.51.100.7/32  ← only your IP, for SSH</pre>
<p>CIDR notation: <code>/16</code> fixes the first 16 bits, <code>/24</code> the first 24, and <code>/32</code> is exactly one IP address.</p>
<div class="tip"><b>Don't open 22 to the world</b>Bots scan every public IP for SSH within minutes. Restrict it to your IP, use a bastion host, or use AWS Systems Manager Session Manager with no open ports at all.</div>`,
 tasks:[
  {t:'Create a VPC with the range 10.0.0.0/16.',h:'aws ec2 create-vpc --cidr-block 10.0.0.0/16',c:()=>Object.values(A().vpcs).some(v=>v.cidr==='10.0.0.0/16')},
  {t:'Create a subnet 10.0.1.0/24 inside it.',h:'aws ec2 create-subnet --vpc-id vpc-05a8c1e3f7b9d2468 --cidr-block 10.0.1.0/24',c:()=>Object.values(A().subnets).some(s=>s.cidr==='10.0.1.0/24')},
  {t:'Create a security group named web-sg in the VPC.',h:'aws ec2 create-security-group --group-name web-sg --description "Web servers" --vpc-id vpc-05a8c1e3f7b9d2468',c:()=>Object.values(A().sgs).some(g=>g.name==='web-sg')},
  {t:'Allow HTTPS (443) from anywhere, and SSH (22) only from your IP 198.51.100.7/32.',h:'aws ec2 authorize-security-group-ingress --group-id sg-05a8c1e3f7b9d2468 --protocol tcp --port 443 --cidr 0.0.0.0/0\naws ec2 authorize-security-group-ingress --group-id sg-05a8c1e3f7b9d2468 --protocol tcp --port 22 --cidr 198.51.100.7/32',c:()=>{const g=Object.values(A().sgs).find(x=>x.name==='web-sg');return g&&g.rules.some(r=>r.port===443&&r.cidr==='0.0.0.0/0')&&g.rules.some(r=>r.port===22&&/\/32$/.test(r.cidr))&&!g.rules.some(r=>r.port===22&&r.cidr==='0.0.0.0/0')}},
  {t:'Launch a web server in the subnet with that security group.',h:'aws ec2 run-instances --image-id ami-0abcdef1234567890 --instance-type t3.micro --subnet-id subnet-05a8c1e3f7b9d2468 --security-group-ids sg-05a8c1e3f7b9d2468',c:()=>Object.values(A().ec2).some(i=>i.sg.includes('sg-05a8c1e3f7b9d2468'))},
  {t:'Where should the database go?',o:['A public subnet with port 5432 open to 0.0.0.0/0','A private subnet, with a security group that allows 5432 only from the app servers\' security group','Same server as the website','Anywhere'],a:1,e:'Layered network rules mean even a leaked password isn\'t enough to reach the database.'},
 ]},
{id:'c6',lvl:'Infrastructure as code',title:'Infrastructure as code with Terraform',kind:'ops',
 setup:o=>{conf(o);o.mkdirp('/home/you/infra');o.H().cwd='/home/you/infra'},
 intro:'You are in ~/infra. Describe infrastructure in code, review the plan, apply it, then tear it down.',
 sum:'Infrastructure as code describes cloud resources in files (Terraform .tf, or Pulumi or CloudFormation) that are reviewed in pull requests and applied the same way every time. The Terraform loop: terraform init downloads providers, terraform plan shows exactly what will change (+ create, ~ update, - destroy), terraform apply makes it so, and terraform destroy removes it. Commit .tf files; keep state in a remote, locked backend (S3 + DynamoDB, or Terraform Cloud), never in Git.',
 keys:['provider "aws" { region }','resource "aws_s3_bucket" "name" { ... }','terraform init','terraform plan','terraform apply','terraform destroy','remote state, never commit .tfstate'],
 concept:`<pre class="snip" style="margin-bottom:12px">resource "aws_s3_bucket" "assets" {
  bucket = "you-portfolio-assets-tf-2026"
}</pre>
<div class="flow"><span>write .tf</span><em>→</em><span>terraform init</span><em>→</em><span>terraform plan (review!)</span><em>→</em><span>terraform apply</span><em>→</em><span>commit + PR</span></div>
<p>Terraform compares your files with its <b>state</b> (what it created before) and computes the difference. The plan is your safety net: read it every time, especially any line that says <b>destroy</b>.</p>
<div class="tip"><b>State</b>Terraform state can contain secrets and must not be edited by hand or committed. Teams store it remotely with locking so two people can't apply at once.</div>`,
 tasks:[
  {t:'Write main.tf with the AWS provider and an S3 bucket, then initialize.',h:'nano main.tf\nterraform init',f:{'main.tf':TF1},c:()=>O().tf.init},
  {t:'Preview the changes.',h:'terraform plan',c:()=>O().flags.planned},
  {t:'Apply them (type yes to confirm).',h:'terraform apply\nyes',c:()=>!!O().tf.state['aws_s3_bucket.assets']},
  {t:'Add an aws_instance named web to main.tf and apply again.',h:'nano main.tf\nterraform plan\nterraform apply -auto-approve\nterraform state list',f:{'main.tf':TF2},c:()=>!!O().tf.state['aws_instance.web']&&!!O().tf.state['aws_s3_bucket.assets']},
  {t:'Destroy everything (type yes) so nothing keeps billing.',h:'terraform destroy\nyes',c:()=>O().flags.destroyed&&Object.keys(O().tf.state).length===0},
  {t:'What is the main advantage of infrastructure as code?',o:['It\'s faster to click','Infrastructure is versioned, reviewed in PRs, and reproducible across environments','It\'s free','It removes the need for a cloud account'],a:1,e:'Same code, same result: staging and production stop drifting apart.'},
  {t:'What should you commit to Git?',o:['terraform.tfstate','The .tf files (and the lock file); state lives in a remote backend','Your AWS keys','Nothing'],a:1,e:'State can contain secrets; use S3 + DynamoDB locking or Terraform Cloud.'},
 ]},
],
quizzes:{cloud:[
 {q:'Which is serverless?',o:['EC2','AWS Lambda','A VPS','A laptop'],a:1,e:'You deploy functions; AWS runs and scales them.'},
 {q:'S3 bucket names are…',o:['Unique per account','Globally unique across all AWS accounts','Random','Optional'],a:1,e:'Pick distinctive names.'},
 {q:'How to share a private S3 file for 10 minutes?',o:['Make the bucket public','A presigned URL with --expires-in 600','Email the access keys','Copy it to EC2'],a:1,e:'Temporary, scoped access.'},
 {q:'Least privilege means…',o:['Admin for everyone','Each identity gets only the permissions its job needs','No permissions','Read-only always'],a:1,e:'It limits the blast radius of a leak.'},
 {q:'SSH (port 22) on a security group should be open to…',o:['0.0.0.0/0','Only your IP or a bastion (or closed, using Session Manager)','Everyone in your country','Port 22 is always safe'],a:1,e:'Bots scan the whole internet constantly.'},
 {q:'Which Terraform command shows changes without making them?',o:['terraform apply','terraform plan','terraform destroy','terraform init'],a:1,e:'Always read the plan.'},
]},
real:[
 {id:'cloud-r1',t:'Create an AWS account safely',p:'Sign up for the free tier, enable MFA on root, create an admin user (or IAM Identity Center), and set a $5 billing alarm.',s:'# Billing → Budgets → Create budget → $5 monthly cost budget'},
 {id:'cloud-r2',t:'Host a static site on S3 + CloudFront',p:'Upload a built site to S3 and serve it through CloudFront with HTTPS.',s:'aws s3 mb s3://YOUR-UNIQUE-SITE\naws s3 sync ./dist s3://YOUR-UNIQUE-SITE'},
 {id:'cloud-r3',t:'Deploy a Lambda function behind an API',p:'Create a Lambda with a Function URL (or API Gateway) and call it with curl.',s:'aws lambda create-function-url-config --function-name hello --auth-type NONE'},
 {id:'cloud-r4',t:'Manage real infrastructure with Terraform',p:'Install Terraform, create one S3 bucket from code, then destroy it. Commit the .tf files to Git.',s:'terraform init && terraform plan && terraform apply\nterraform destroy'},
]});
})();
