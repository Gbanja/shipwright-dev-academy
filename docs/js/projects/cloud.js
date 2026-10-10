/* Projects: Cloud fundamentals (AWS + Terraform) */
(()=>{
const O=()=>OPS.st,H=re=>OPS.Hx(re),F=p=>OPS.file(p)||'';
const A=()=>OPS.st.aws;
const conf=o=>{o.st.aws.conf=true;o.st.aws.region='us-east-1';o.write('/home/you/.aws/config','[default]\nregion = us-east-1\noutput = json\n')};
const BUCKET='you-tour-site-2026';
const D='/home/you/tour/';
const HANDLER="exports.handler = async (event) => {\n  const name = event.name || 'traveller';\n  return {\n    statusCode: 200,\n    body: JSON.stringify({ message: 'Welcome to the tour, ' + name + '!' }),\n  };\n};\n";
const POLICY=`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject"],
      "Resource": "arn:aws:s3:::${BUCKET}/*"
    },
    {
      "Effect": "Allow",
      "Action": ["lambda:UpdateFunctionCode"],
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:greet"
    }
  ]
}
`;
const TF=`terraform {
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

resource "aws_s3_bucket" "logs" {
  bucket = "you-tour-logs-2026"

  tags = {
    Project = "tour"
  }
}
`;
const policyActs=()=>Object.values(A().policies).flatMap(p=>[].concat(p.doc.Statement||[]).flatMap(s=>[].concat(s.Action)));
const vpc=()=>Object.values(A().vpcs).find(v=>v.cidr==='10.20.0.0/16');
const sub=c=>Object.values(A().subnets).find(s=>s.cidr===c);
const sg=n=>Object.values(A().sgs).find(g=>g.name===n);
const SIZES=['t3.nano','t3.micro','t3.small','t2.micro','t4g.micro','t4g.small'];

defineProjects('cloud',{
guided:{title:'Launch a tour site on AWS, then codify it',kind:'ops',
 setup:o=>{conf(o);o.mkdirp(D+'site');o.H().cwd='/home/you/tour';o.write('site/index.html','<h1>World tour 2026</h1>\n<p>Dates and cities coming soon.</p>\n');o.write('site/style.css','body { font-family: system-ui; }\n')},
 intro:'You are in ~/tour. The AWS CLI is already configured with sandbox keys.',
 pitch:'Host a static site on S3, ship a Lambda function, give CI a least-privilege IAM user, capture infrastructure in Terraform, and tear it all down so nothing keeps billing.',
 brief:`<p>A band wants a tour website and a tiny API that greets fans. You'll build it on AWS the way a careful engineer does: verify which account you're in, use managed services, give automation only the permissions it needs, describe infrastructure as code, and clean up after yourself.</p>
<p>Watch the <b>AWS resources</b> and <b>Terraform state</b> sections of the Machine panel.</p>
<div class="tip"><b>Goal</b>Everything works, a CI user can deploy but can\'t delete, and when you finish, nothing is left running that you forgot about.</div>`,
 tasks:[
 {t:'Check which AWS identity and account you\'re about to change.',why:'Before you touch a cloud account, confirm <b>which</b> account you\'re in. Engineers have deleted production while thinking they were in staging. <code>sts get-caller-identity</code> takes one second.',h:'aws sts get-caller-identity',c:()=>H(/^aws sts get-caller-identity/)},
 {t:'Create a bucket and upload the site.',why:'S3 stores files (objects) in buckets. Bucket names are <b>global</b> across every AWS account, so generic names are taken: include something unique. Uploading is just <code>aws s3 cp</code>.',h:`aws s3 mb s3://${BUCKET}\naws s3 cp site/index.html s3://${BUCKET}/\naws s3 cp site/style.css s3://${BUCKET}/\naws s3 ls s3://${BUCKET}`,c:()=>{const b=A().s3[BUCKET];return !!b&&b.objects['index.html']!=null&&b.objects['style.css']!=null}},
 {t:'Ship the greeting API as a Lambda function and invoke it.',why:'Lambda runs your function only when called, so you pay per request and nothing idles. The <b>handler</b> <code>index.handler</code> means "file index.js, export handler". It needs an IAM <b>role</b> that it runs as.',h:"nano index.js\nzip function.zip index.js\naws lambda create-function --function-name greet --runtime nodejs20.x --handler index.handler --role arn:aws:iam::123456789012:role/lambda-basic --zip-file fileb://function.zip\naws lambda invoke --function-name greet --payload '{\"name\":\"Ada\"}' out.json\ncat out.json",f:{'index.js':HANDLER},c:()=>/Welcome to the tour, Ada/.test(F(D+'out.json'))},
 {t:'Create a CI user that can upload the site and update the function, and nothing else.',why:'<b>Least privilege</b>: if the CI token leaks, the damage is limited to what the policy allows. Name the exact actions and resources. <code>"Action": "*"</code> on <code>"Resource": "*"</code> hands the attacker the whole account. <code>simulate-principal-policy</code> proves it before anything is live.',h:`aws iam create-user --user-name ci-deployer\nnano policy.json\naws iam create-policy --policy-name tour-deploy --policy-document file://policy.json\naws iam attach-user-policy --user-name ci-deployer --policy-arn arn:aws:iam::123456789012:policy/tour-deploy\naws iam simulate-principal-policy --policy-source-arn arn:aws:iam::123456789012:user/ci-deployer --action-names s3:PutObject s3:DeleteBucket --resource-arns arn:aws:s3:::${BUCKET}/index.html`,f:{'policy.json':POLICY},c:()=>(A().attached['ci-deployer']||[]).length>0&&(O().flags.simulated||[]).includes('s3:PutObject')&&(O().flags.simulated||[]).includes('s3:DeleteBucket')&&!policyActs().some(a=>a==='*'||/^\w+:\*$/.test(a))},
 {t:'Describe a logs bucket in Terraform, then init, plan and apply.',why:'Clicking around the console can\'t be reviewed or repeated. Terraform describes the infrastructure in files you commit. <code>plan</code> shows exactly what will change <b>before</b> it changes. Read it every time.',h:'mkdir infra\ncd infra\nnano main.tf\nterraform init\nterraform plan\nterraform apply\nyes',f:{'/home/you/tour/infra/main.tf':TF},c:()=>!!O().tf.state['aws_s3_bucket.logs']&&!!O().flags.planned},
 {t:'Clean up: destroy the Terraform resources and delete what you created by hand.',why:'Forgotten resources are the number one cause of surprise cloud bills. <code>terraform destroy</code> removes what Terraform made. Hand-made resources need hand-made cleanup. An empty bucket can be removed with <code>rb</code>, or <code>--force</code> deletes its contents first.',h:`terraform destroy\nyes\ncd ..\naws s3 rb s3://${BUCKET} --force\naws s3 ls`,c:()=>!!O().flags.destroyed&&Object.keys(O().tf.state).length===0&&!A().s3[BUCKET]},
 ]},
solo:{title:'Network a two-tier app securely on AWS',kind:'ops',
 setup:o=>{conf(o);o.st.aws.keys['tour-key']=true},
 intro:'The AWS CLI is configured. Your office IP is 198.51.100.7.',
 pitch:'Build a VPC with public and private subnets, tight security groups, a web server and a private database, without leaking a password or opening SSH to the world.',
 brief:`<p>A client wants their web app on AWS with a proper network: a web server reachable from the internet and a database that is <b>not</b>. You're using the AWS CLI. Your office IP is <code>198.51.100.7</code>, and a key pair called <code>tour-key</code> already exists.</p>
<p><b>Requirements</b></p><ul><li>A VPC with the range <code>10.20.0.0/16</code>, containing a public subnet <code>10.20.1.0/24</code> and a private subnet <code>10.20.2.0/24</code>.</li><li>A security group <code>web-sg</code>: HTTPS (443) from anywhere, SSH (22) <b>only</b> from the office IP.</li><li>A security group <code>db-sg</code>: Postgres (5432) only from the public subnet's range. Nothing from the internet.</li><li>A running <code>t3.micro</code> web server in the public subnet, using <code>web-sg</code> and the <code>tour-key</code> key pair.</li><li>A Postgres database (<code>db.t3.micro</code>) that is <b>not</b> publicly accessible, created without typing its password on the command line.</li><li>Keep costs small: no instance larger than <code>t3.small</code>, and terminate anything you launched by mistake.</li></ul>`,
 tasks:[
 {t:'VPC 10.20.0.0/16 with subnets 10.20.1.0/24 and 10.20.2.0/24 inside it.',c:()=>{const v=vpc();return !!v&&!!sub('10.20.1.0/24')&&!!sub('10.20.2.0/24')&&sub('10.20.1.0/24').vpc===v.id&&sub('10.20.2.0/24').vpc===v.id},
  miss:()=>{const v=vpc();if(!v)return Object.keys(A().vpcs).length?'Your VPC uses '+Object.values(A().vpcs).map(x=>x.cidr).join(', ')+' instead of 10.20.0.0/16.':'There is no VPC yet: aws ec2 create-vpc --cidr-block 10.20.0.0/16.';const s1=sub('10.20.1.0/24'),s2=sub('10.20.2.0/24');if(!s1||!s2)return 'Missing subnet: '+[!s1&&'10.20.1.0/24',!s2&&'10.20.2.0/24'].filter(Boolean).join(' and ')+'. Create it with --vpc-id '+v.id+'.';return 'A subnet was created in a different VPC. Pass --vpc-id '+v.id+'.'}},
 {t:'web-sg allows 443 from anywhere and 22 only from 198.51.100.7/32.',now:true,c:()=>{const g=sg('web-sg');if(!g)return false;const r=g.rules;return r.some(x=>x.port===443&&x.cidr==='0.0.0.0/0')&&r.some(x=>x.port===22&&x.cidr==='198.51.100.7/32')&&!r.some(x=>x.port===22&&x.cidr!=='198.51.100.7/32')&&!r.some(x=>![22,443,80].includes(x.port))},
  miss:()=>{const g=sg('web-sg');if(!g)return 'There is no security group named web-sg.';const r=g.rules;if(r.some(x=>x.port===22&&x.cidr==='0.0.0.0/0'))return 'SSH (22) is open to 0.0.0.0/0, the whole internet. Bots try passwords on port 22 all day. Revoke that rule (revoke-security-group-ingress) and allow only 198.51.100.7/32.';if(!r.some(x=>x.port===443&&x.cidr==='0.0.0.0/0'))return 'HTTPS (443) isn\'t open to 0.0.0.0/0, so visitors can\'t reach the site.';if(!r.some(x=>x.port===22&&x.cidr==='198.51.100.7/32'))return 'SSH from the office (198.51.100.7/32) isn\'t allowed. /32 means exactly one address.';return 'web-sg has extra rules: '+r.map(x=>x.port+' from '+x.cidr).join(', ')+'. Open only what the brief asks for.'}},
 {t:'db-sg allows 5432 only from 10.20.1.0/24.',now:true,c:()=>{const g=sg('db-sg');return !!g&&g.rules.length>0&&g.rules.every(x=>x.port===5432&&x.cidr==='10.20.1.0/24')},
  miss:()=>{const g=sg('db-sg');if(!g)return 'There is no security group named db-sg.';if(!g.rules.length)return 'db-sg has no rules, so the web server can\'t reach the database either. Allow 5432 from 10.20.1.0/24.';const bad=g.rules.filter(x=>!(x.port===5432&&x.cidr==='10.20.1.0/24'));return 'db-sg also allows: '+bad.map(x=>x.port+' from '+x.cidr).join(', ')+'. The database should accept Postgres traffic from the web subnet only, never 0.0.0.0/0.'}},
 {t:'A t3.micro web server runs in the public subnet with web-sg and tour-key.',now:true,c:()=>{const s=sub('10.20.1.0/24'),g=sg('web-sg');return !!s&&!!g&&Object.values(A().ec2).some(i=>i.state==='running'&&i.type==='t3.micro'&&i.subnet===s.id&&i.sg.includes(g.id)&&i.key==='tour-key')},
  miss:()=>{const s=sub('10.20.1.0/24'),g=sg('web-sg');const live=Object.values(A().ec2).filter(i=>i.state!=='terminated');if(!live.length)return 'No instance is running. Launch one with run-instances.';const i=live[live.length-1];if(i.state==='pending')return 'Your instance is still "pending" because you haven\'t checked on it. Run aws ec2 describe-instances to see it running.';if(i.type!=='t3.micro')return 'The instance type is '+i.type+'. The brief asks for t3.micro.';if(!s||i.subnet!==s.id)return 'The instance isn\'t in the public subnet. Pass --subnet-id '+(s?s.id:'(the 10.20.1.0/24 subnet)')+'.';if(!g||!i.sg.includes(g.id))return 'The instance doesn\'t use web-sg. Pass --security-group-ids '+(g?g.id:'(web-sg\'s id)')+'.';return 'Launch it with --key-name tour-key, or you\'ll have no way to SSH in.'}},
 {t:'A private db.t3.micro Postgres database, created without a password on the command line.',c:()=>Object.values(A().rds).some(d=>d.engine==='postgres'&&d.cls==='db.t3.micro'&&!d.public)&&!H(/--master-user-password/),
  miss:()=>{if(H(/--master-user-password/))return 'You typed the master password on the command line. It is now in your shell history, and possibly in CI logs. Use --manage-master-user-password so AWS generates the password and keeps it in Secrets Manager.';const d=Object.values(A().rds);if(!d.length)return 'There is no database. Use aws rds create-db-instance.';if(d.some(x=>x.public))return 'The database is publicly accessible. Databases belong in private networks: drop --publicly-accessible.';return 'Use --engine postgres and --db-instance-class db.t3.micro.'}},
 {t:'No instance is larger than t3.small, and nothing launched by mistake is still running.',now:true,c:()=>{const live=Object.values(A().ec2).filter(i=>i.state!=='terminated');return live.length===1&&live.every(i=>SIZES.includes(i.type))},
  miss:()=>{const live=Object.values(A().ec2).filter(i=>i.state!=='terminated');if(!live.length)return 'Nothing is running. You still need the web server.';const big=live.filter(i=>!SIZES.includes(i.type));if(big.length)return big.map(i=>i.id+' is '+i.type).join(', ')+', which is bigger than needed for a small app and bills every hour. Terminate it.';return 'You have '+live.length+' instances that aren\'t terminated: '+live.map(i=>i.id+' ('+i.state+')').join(', ')+'. Stopped instances still cost money for their disks. Terminate the extras with aws ec2 terminate-instances.'}},
 ],
 warn:[
  {c:()=>Object.values(A().sgs).some(g=>g.rules.some(r=>r.port===22&&r.cidr==='0.0.0.0/0'))||H(/--port 22 --cidr 0\.0\.0\.0\/0/),m:'At some point SSH was open to 0.0.0.0/0. Even briefly, that is enough for scanners to find it. Write the narrow rule first.'},
  {c:()=>!H(/^aws sts get-caller-identity/),m:'You never checked which account you were in (aws sts get-caller-identity). Do it before creating anything in a client\'s account.'},
  {c:()=>!H(/describe-(security-groups|instances|vpcs)/),m:'You never ran a describe-* command to verify what you built. Trust, but verify: the CLI only tells you it accepted the request.'},
 ],
 ref:[{h:'aws sts get-caller-identity\naws ec2 create-vpc --cidr-block 10.20.0.0/16\naws ec2 create-subnet --vpc-id vpc-05a8c1e3f7b9d2468 --cidr-block 10.20.1.0/24\naws ec2 create-subnet --vpc-id vpc-05a8c1e3f7b9d2468 --cidr-block 10.20.2.0/24\naws ec2 create-security-group --group-name web-sg --description "Web servers" --vpc-id vpc-05a8c1e3f7b9d2468\naws ec2 authorize-security-group-ingress --group-id sg-05a8c1e3f7b9d2468 --protocol tcp --port 443 --cidr 0.0.0.0/0\naws ec2 authorize-security-group-ingress --group-id sg-05a8c1e3f7b9d2468 --protocol tcp --port 22 --cidr 198.51.100.7/32\naws ec2 create-security-group --group-name db-sg --description "Database" --vpc-id vpc-05a8c1e3f7b9d2468\naws ec2 authorize-security-group-ingress --group-id sg-06b9d2f4a8c0e3579 --protocol tcp --port 5432 --cidr 10.20.1.0/24\naws ec2 describe-security-groups\naws ec2 run-instances --image-id ami-0abcdef1234567890 --instance-type t3.micro --key-name tour-key --subnet-id subnet-05a8c1e3f7b9d2468 --security-group-ids sg-05a8c1e3f7b9d2468\naws ec2 describe-instances\naws rds create-db-instance --db-instance-identifier tour-db --engine postgres --db-instance-class db.t3.micro --allocated-storage 20 --master-username tour --manage-master-user-password --vpc-security-group-ids sg-06b9d2f4a8c0e3579'}]},
});
})();
