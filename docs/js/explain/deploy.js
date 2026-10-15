/* deploy: "Understand it" visual walkthroughs. */
{
const dnsF=(hl,lines,msg,mcls,label)=>{
 const R={you:[4,68,68,68],res:[114,68,68,68],root:[246,4,52,52],dev:[246,68,52,52],ns:[246,132,52,52]};
 const L={'you-res':'M72 102H112','res-root':'M180 92 242 34','res-dev':'M180 100 242 94','res-ns':'M180 108 242 156'};
 return `<svg viewBox="0 0 420 210" role="img" aria-label="${label}">
${hl.map(k=>`<rect class="bx-hl" x="${R[k][0]}" y="${R[k][1]}" width="${R[k][2]}" height="${R[k][3]}" rx="10"/>`).join('')}
<text class="t-m" x="10" y="30" style="font-size:16px">portfolio.dev ?</text>
${lines.map(([k,c])=>`<path class="${c}" style="stroke-width:3" d="${L[k]}"/>`).join('')}
${V.ic('laptop',10,74,56,'ic-a')}<text class="t" x="38" y="154" text-anchor="middle">you</text>
${V.ic('server',120,74,56,'ic-info')}<text class="t" x="148" y="154" text-anchor="middle">resolver</text>
${V.ic('globe',250,8,44,'ic-p')}<text class="t" x="306" y="36">root</text>
${V.ic('server',250,72,44,'ic-p')}<text class="t-m" x="306" y="100">.dev</text>
${V.ic('server',250,136,44,'ic-ok')}<text class="t-m" x="306" y="164" style="font-size:14px">portfolio.dev</text>
<text class="t-b ${mcls}" x="10" y="200">${msg}</text>
</svg>`};
const urlF=(k,label)=>`<svg viewBox="0 0 420 210" role="img" aria-label="${label}">
<rect class="${k===0?'bx-hl':k===4?'bx-ok':'bx'}" x="8" y="8" width="404" height="36" rx="18"/>${V.ic('lock',18,14,24,k>=2?'ic-ok':'ic-info')}
<text class="t-m" x="50" y="32" style="font-size:16px">https://portfolio.dev/projects${k===0?'<tspan class="t-a">|</tspan>':''}</text>
${V.ic('book',186,52,44,k===1?'ic-ok':'ic-info')}
${k>=1?`<text class="t-m${k===1?' t-ok':''}" x="208" y="118" text-anchor="middle">76.76.21.21</text>`:''}
${k===1?'<path class="ln-a" style="stroke-width:3" d="M70 124 180 84"/>':''}
${V.ic('laptop',14,120,64,'ic-a')}<text class="t" x="46" y="204" text-anchor="middle">browser</text>
${V.ic('server',342,120,64,'ic-info')}<text class="t" x="374" y="204" text-anchor="middle">server</text>
${k>=2?`<path class="${k===4?'ln-ok':k===3?'ln-a':'ln-ok'}" style="stroke-width:3" d="M86 152H334"/>${V.ic('lock',196,138,28,'ic-ok')}`:''}
${k===2?'<text class="t" x="210" y="184" text-anchor="middle">secure line on port 443</text>':''}
${k===3?`<polygon class="ah-a" points="324,144 324,160 338,152"/>${V.ic('mail',254,134,34,'ic-a')}<text class="t-m t-a" x="210" y="184" text-anchor="middle">GET /projects</text>`:''}
${k===4?`<polygon class="ah-ok" points="96,144 96,160 82,152"/>${V.ic('mail',124,134,34,'ic-ok')}<text class="t-m t-ok" x="210" y="184" text-anchor="middle">200 OK + HTML</text>`:''}
</svg>`;

explain('p1',`
<p>Every time you type a web address, four things happen in less than a second. Learn them and "the site is down" stops being a mystery: you can find exactly which step broke.</p>

${V.card(1,'DNS','the internet\'s phonebook',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="A phonebook page called DNS turns the name portfolio.dev into the number 76.76.21.21">
${V.ic('laptop',4,52,64,'ic-a')}<text class="t" x="36" y="140" text-anchor="middle">browser</text>
<path class="ln-a" style="stroke-width:3" d="M72 84H86"/>
<rect class="bx-info" x="90" y="10" width="254" height="150" rx="8"/><path class="ln" d="M98 10V160"/>
<text class="t-b" x="220" y="34" text-anchor="middle">DNS</text>
<text class="t-m" x="108" y="66" style="font-size:14px">github.com</text><text class="t-m" x="336" y="66" text-anchor="end" style="font-size:14px">140.82.121.4</text>
<rect class="bx-ok" x="102" y="80" width="238" height="30" rx="5"/>
<text class="t-m" x="108" y="100" style="font-size:14px">portfolio.dev</text><text class="t-m t-ok" x="336" y="100" text-anchor="end" style="font-size:14px">76.76.21.21</text>
<text class="t-m" x="108" y="138" style="font-size:14px">www.github.com</text><text class="t-m t-info" x="336" y="138" text-anchor="end" style="font-size:14px">github.com</text>
${V.ic('server',354,64,60,'ic-ok')}
<text class="t-s" x="212" y="182" text-anchor="middle" style="font-size:14px">name in, number out</text>
</svg><figcaption>DNS (Domain Name System) is a huge shared phonebook. Your browser looks up a name and gets back the server's number, called its IP address. Some names point at another name instead, like www.github.com.</figcaption></figure>
${V.like(`<p>The contacts app on your phone. You tap "Mum", and the phone dials 07700 900123 for you. You remember names; the phone network only understands numbers.</p>`)}
${V.why(`<p>Computers find each other by <b>IP address</b>, a number like <code>76.76.21.21</code>. In the early internet, one text file listed every computer's name and number, and people copied it around by hand. By 1983 there were too many machines, so DNS was invented: a phonebook split across thousands of servers, each in charge of its own part.</p>`)}
${V.anat([[1,'www.github.com.'],' ',[2,'3600'],' ',[3,'IN'],' ',[4,'CNAME'],' ',[5,'github.com.']],[
 '<b>Name.</b> The domain you asked about. The final dot is the root of the phonebook.',
 '<b>TTL</b> (time to live). How many seconds everyone may remember this answer before asking again.',
 '<b>Class.</b> IN means internet. It is almost always IN.',
 '<b>Type.</b> <code>A</code> points to an IPv4 address. <code>CNAME</code> points to another name. <code>MX</code> is for email, <code>TXT</code> holds text such as ownership checks.',
 '<b>Value.</b> The answer: here, "look up github.com instead".'])}
<p>This is one line of what <code>dig www.github.com</code> prints. <b>Watch a lookup happen</b> the first time anyone asks for portfolio.dev:</p>
${V.steps([
 ['Your browser checks its own memory, called the <b>cache</b>. It has never visited portfolio.dev, so it must ask.',dnsF(['you'],[],'Not in my memory. Ask!','t-a','Browser checks its cache')],
 ['It asks a <b>resolver</b>: a lookup server run by your internet provider, or a public one like 1.1.1.1. The resolver does the hunting for you.',dnsF(['res'],[['you-res','ln-a']],'Resolver: I will find it.','t-a','Browser asks the resolver')],
 ['The resolver starts at the top. The <b>root</b> servers say "ask the .dev servers". The .dev servers say "ask portfolio.dev\'s own name server".',dnsF(['root','dev'],[['you-res','ln-a'],['res-root','ln-a'],['res-dev','ln-a']],'root: ask .dev. .dev: ask its server.','','Resolver asks root, then .dev')],
 ['The name server in charge of portfolio.dev gives the real answer: an <b>A record</b> pointing to <b>76.76.21.21</b>.',dnsF(['ns'],[['you-res','ln-a'],['res-ns','ln-ok']],'A record: 76.76.21.21','t-ok','The name server answers with the A record')],
 ['The answer travels back. The resolver and your browser both remember it for the TTL, so the next visit skips all the asking.',dnsF(['you','res'],[['you-res','ln-ok']],'Saved for its TTL. Now connect!','t-ok','The answer returns and is cached')]])}
${V.rules(V.rh('Rules: get these wrong and the name will not work'),
 V.ok('A  portfolio.dev → 76.76.21.21','An A record must point at an IP address'),V.no('A  www → portfolio.dev','An A record cannot point at a name. Use CNAME'),
 V.ok('CNAME  www → portfolio.dev','www becomes an alias and follows the root\'s A record'),V.no('CNAME on portfolio.dev itself','The root of a domain cannot be a CNAME. Use A there'),
 V.rh('Conventions'),
 V.ok('dig name','Your first check when a domain "does not work"'),V.ok('lower the TTL first','Before moving servers, so the change spreads fast'))}
${V.hook(`DNS is the phonebook: name in, number out. A points at a number, CNAME points at another name.`)}
`)}

${V.card(2,'Request and response','what happens after you press Enter',`
<figure class="fig"><svg viewBox="0 0 420 165" role="img" aria-label="The browser sends a request GET /projects and the server sends back a response 200 OK with the page">
${V.ic('laptop',8,40,72,'ic-a')}<text class="t" x="44" y="140" text-anchor="middle">browser</text>
${V.ic('server',340,40,72,'ic-info')}<text class="t" x="376" y="140" text-anchor="middle">server</text>
<text class="t-m t-a" x="210" y="54" text-anchor="middle" style="font-size:14px">request: GET /projects</text>
<path class="ln-a" style="stroke-width:3" d="M92 68H324"/><polygon class="ah-a" points="322,61 322,75 334,68"/>
<path class="ln-ok" style="stroke-width:3" d="M98 108H330"/><polygon class="ah-ok" points="100,101 100,115 88,108"/>
<text class="t-m t-ok" x="210" y="134" text-anchor="middle" style="font-size:14px">response: 200 OK + page</text>
</svg><figcaption>The web is a conversation. The browser sends a request saying what it wants. The server sends back a response: a status code, some headers and the page itself.</figcaption></figure>
${V.like(`<p>Ordering at a café counter. You say "one hot chocolate, please" (the request). The barista answers "here you go" and hands it over (the response), or says "sorry, we've run out".</p>`)}
${V.anat([[1,'https'],'://',[2,'portfolio.dev'],[3,'/projects'],[4,'?sort=new']],[
 '<b>Scheme.</b> The language to speak. <code>https</code> is HTTP inside a locked, encrypted connection.',
 '<b>Host.</b> The domain name. This is what DNS turns into an IP address.',
 '<b>Path.</b> Which page or file on that server you want.',
 '<b>Query.</b> Optional extra details after a <code>?</code>, as name=value pairs.'])}
<p><b>Watch the whole journey</b> of one address, from typing to the page appearing:</p>
${V.steps([
 ['You type the address and press Enter. The browser splits it into scheme, host and path.',urlF(0,'Typing the address')],
 ['<b>DNS lookup.</b> The phonebook turns portfolio.dev into 76.76.21.21.',urlF(1,'DNS gives the IP address')],
 ['<b>Connection.</b> The browser connects to that IP on port 443 and the two sides agree a secret code. This is the <b>TLS handshake</b>, and it is why the padlock appears.',urlF(2,'Secure connection on port 443')],
 ['<b>Request.</b> Through that safe line, the browser sends <code>GET /projects</code>. GET means "please give me".',urlF(3,'Request GET /projects travels to the server')],
 ['<b>Response.</b> The server replies <b>200 OK</b> with the HTML. The browser draws the page. Then it repeats steps 4 and 5 for every image and stylesheet.',urlF(4,'Response 200 OK returns with the HTML')]])}
${V.rules(V.rh('Rules and conventions'),
 V.ok('GET','Asks for a page. Typing an address always sends GET'),V.ok('POST','Sends data, like a form you submit'),
 V.no('htps://portfolio.dev','One wrong letter in the scheme and nothing loads'),V.ok('/Projects vs /projects','Paths can be case-sensitive: keep URLs lowercase'))}
${V.hook(`Look up, connect, ask, answer. Every page load, every time.`)}
`)}

${V.card(3,'Status codes','the server\'s three-digit answer',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="2xx success, 3xx go elsewhere, 4xx your mistake, 5xx server mistake">
<rect class="bx-ok" x="6" y="6" width="200" height="80" rx="10"/><text class="t-m t-ok" x="20" y="44" style="font-size:26px;font-weight:700">2xx</text><text class="t" x="20" y="72">it worked</text>${V.ic('check',146,24,46,'ic-ok')}
<rect class="bx-info" x="214" y="6" width="200" height="80" rx="10"/><text class="t-m t-info" x="228" y="44" style="font-size:26px;font-weight:700">3xx</text><text class="t" x="228" y="72">go over there</text>${V.ic('sign',354,24,46,'ic-info')}
<rect class="bx-warn" x="6" y="94" width="200" height="80" rx="10"/><text class="t-m t-warn" x="20" y="132" style="font-size:26px;font-weight:700">4xx</text><text class="t" x="20" y="160">you goofed</text>${V.ic('person',146,112,46,'ic-warn')}
<rect class="bx-bad" x="214" y="94" width="200" height="80" rx="10"/><text class="t-m t-bad" x="228" y="132" style="font-size:26px;font-weight:700">5xx</text><text class="t" x="228" y="160">we goofed</text>${V.ic('server',354,112,46,'ic-bad')}
</svg><figcaption>The first digit tells you whose problem it is. 4xx means the request was wrong. 5xx means the server broke.</figcaption></figure>
${V.like(`<p>A waiter. <b>200</b>: here's your meal. <b>301</b>: we've moved to the restaurant next door. <b>404</b>: that dish isn't on the menu. <b>500</b>: the kitchen is on fire. <b>502</b>: the waiter is here, but the chef isn't answering.</p>`)}
${V.anat([[1,'curl'],' ',[2,'-I'],' ',[3,'https://example.com']],[
 '<b>curl.</b> A tool that makes web requests from the terminal, with no browser.',
 '<b>-I</b> (capital i). Show only the headers, starting with the status line, such as <code>HTTP/2 200</code>.',
 '<b>URL.</b> The address to request.'])}
${V.rules(V.rh('Codes you will meet every week'),
 V.ok('200 OK','Success'),V.ok('301 / 302','Moved for good / moved for now'),
 V.ok('401 vs 403','401: not logged in. 403: logged in but not allowed'),V.ok('404 Not Found','No such page'),
 V.ok('500','The app crashed'),V.ok('502 Bad Gateway','The proxy is up, but the app behind it is not answering'),
 V.rh('Rule'),V.no('curl -i','Small i prints headers and the whole body. Use -I for just the headers'))}
${V.hook(`2 is good, 3 go elsewhere, 4 you goofed, 5 we goofed.`)}
`)}

${V.card(4,'Ports and HTTPS','numbered doors and sealed envelopes',`
<figure class="fig"><svg viewBox="0 0 420 196" role="img" aria-label="A server building at one IP address with doors numbered 22, 80, 443 and 3000">
<polygon class="bx" points="30,44 210,8 390,44"/><rect class="bx" x="30" y="44" width="360" height="116"/>
<text class="t-m" x="210" y="36" text-anchor="middle" style="font-size:14px">76.76.21.21</text>
<text class="t-m" x="74" y="70" text-anchor="middle" style="font-weight:700">22</text>${V.ic('door',50,78,48,'ic-p')}
<text class="t-m" x="164" y="70" text-anchor="middle" style="font-weight:700">80</text>${V.ic('door',140,78,48,'ic-info')}
<rect class="bx-ok" x="222" y="52" width="68" height="104" rx="6"/><text class="t-m" x="256" y="70" text-anchor="middle" style="font-weight:700">443</text>${V.ic('door',232,78,48,'ic-ok')}
<text class="t-m" x="346" y="70" text-anchor="middle" style="font-weight:700">3000</text>${V.ic('door',322,78,48,'ic-warn')}
<text class="t" x="74" y="184" text-anchor="middle">SSH</text><text class="t" x="164" y="184" text-anchor="middle">HTTP</text>
<text class="t-b t-ok" x="256" y="184" text-anchor="middle">HTTPS</text><text class="t" x="346" y="184" text-anchor="middle">dev server</text>
</svg><figcaption>One IP address, many doors. Each program on a server listens at its own numbered door, called a port. Websites use door 443 for HTTPS.</figcaption></figure>
${V.like(`<p>A block of flats. The IP address is the street address; the port is the flat number. Plain HTTP is a <b>postcard</b>: anyone handling it can read it. HTTPS is a <b>sealed envelope</b> with an ID check, so nobody on the café Wi-Fi can read or change it.</p>`)}
${V.why(`<p>HTTP was designed in 1991 for sharing science papers, so nobody thought about spies. Once people started typing passwords and card numbers, HTTPS wrapped HTTP in encryption. Today browsers mark plain HTTP sites as "Not secure".</p>`)}
${V.rules(V.rh('Default ports to know by heart'),
 V.ok('443','HTTPS: every real website'),V.ok('80','Plain HTTP: usually just redirects to 443'),
 V.ok('22','SSH: logging in to a server'),V.ok('3000','A common dev server port, never opened to the internet'))}
${V.hook(`Postcard is HTTP, sealed envelope is HTTPS, and it arrives at door 443.`)}
`)}

<div class="try"><b>Try it in your head</b>1. You want www.portfolio.dev to show the same site as portfolio.dev. Which record? <i>A CNAME: www → portfolio.dev.</i> 2. Nginx answers but says 502. Where do you look? <i>At the app behind it: it is not responding.</i> 3. Which door does HTTPS use? <i>Port 443.</i></div>
`);

const pushF=(k,msg,label)=>{
 const S=[['laptop','you','ic-a'],['branch','GitHub','ic-p'],['gear','Vercel','ic-info'],['globe','the world','ic-ok']];
 return `<svg viewBox="0 0 420 190" role="img" aria-label="${label}">
${S.map((s,i)=>{const cx=40+i*108;return (i===k?`<rect class="bx-hl" x="${cx-44}" y="22" width="88" height="112" rx="10"/>`:'')+V.ic(s[0],cx-32,30,64,s[2])+`<text class="t${i===k?'-b':''}" x="${cx}" y="124" text-anchor="middle">${s[1]}</text>`}).join('')}
${[0,1,2].map(i=>{const x=78+i*108,c=i<k?'ln-ok':'ln';return `<path class="${c}" style="stroke-width:3" d="M${x} 62H${x+20}"/><polygon class="${i<k?'ah-ok':'ah'}" points="${x+18},55 ${x+18},69 ${x+28},62"/>`}).join('')}
<rect class="bx-dark" x="8" y="142" width="404" height="40" rx="8"/><text class="t-term" x="20" y="168" style="font-size:14px">${msg}</text>
</svg>`};
const prevF=(cmd,rows,prod,label)=>`<svg viewBox="0 0 420 206" role="img" aria-label="${label}">
<rect class="bx-dark" x="8" y="8" width="404" height="34" rx="8"/><text class="t-term" x="20" y="31">$ ${cmd}</text>
${rows.map(([id,hl],i)=>{const y=52+i*36;return `<rect class="${hl?'bx-hl':'bx'}" x="8" y="${y}" width="404" height="30" rx="6"/><text class="t-m" x="18" y="${y+20}" style="font-weight:700">${id}</text><text class="t-m" x="68" y="${y+20}" style="font-size:14px">portfolio-${id}-you.vercel.app</text><text class="t t-ok" x="404" y="${y+20}" text-anchor="end">Ready</text>`}).join('')}
<rect class="${prod?'bx-ok':'bx'}" x="8" y="162" width="404" height="36" rx="8"/>${V.ic('globe',14,166,28,prod?'ic-ok':'ic-info')}
<text class="t-m" x="50" y="186" style="font-size:14px">portfolio.vercel.app ${prod?'→ '+prod:'(nothing yet)'}</text>
</svg>`;

explain('p2',`
<p>A site on your laptop is a secret only you can see. Deploying puts it on the internet with a link anyone can open, and platforms like Vercel make that one command.</p>

${V.card(1,'Build first','check it compiles before anyone else sees it',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Source files go into npm run build and come out as an optimised .next folder">
${V.ic('file',10,14,40,'ic-info')}<text class="t-m" x="56" y="40" style="font-size:14px">page.tsx</text>
${V.ic('file',10,62,40,'ic-info')}<text class="t-m" x="56" y="88" style="font-size:14px">layout.tsx</text>
${V.ic('file',10,110,40,'ic-info')}<text class="t-m" x="56" y="136" style="font-size:14px">package.json</text>
<path class="ln-a" style="stroke-width:3" d="M166 80H186"/><polygon class="ah-a" points="184,73 184,87 196,80"/>
${V.ic('gear',200,30,76,'ic-a')}<text class="t-m" x="238" y="132" text-anchor="middle" style="font-size:14px">npm run build</text>
<path class="ln-ok" style="stroke-width:3" d="M284 80H304"/><polygon class="ah-ok" points="302,73 302,87 314,80"/>
${V.ic('folder',318,30,76,'ic-ok')}<text class="t-m" x="356" y="132" text-anchor="middle">.next/</text>
<text class="t-s" x="210" y="162" text-anchor="middle" style="font-size:14px">your code in, fast ready-to-serve files out</text>
</svg><figcaption>A build turns the code you write into small, fast files a server can send. If the build fails, there is nothing to deploy.</figcaption></figure>
${V.like(`<p>A dress rehearsal before opening night. If an actor forgets a line, you want to find out in the empty theatre, not in front of the audience.</p>`)}
${V.anat([[1,'npm'],' ',[2,'run'],' ',[3,'build']],[
 '<b>npm.</b> Node\'s package manager. It also runs your project\'s scripts.',
 '<b>run.</b> "Run the script with this name from package.json."',
 '<b>build.</b> The script name. In this project it means <code>next build</code>.'])}
${V.rules(V.rh('Rules'),
 V.ok('npm run build','Runs the "build" script from package.json'),V.no('npm build','Not your script. Custom scripts need the word run'),
 V.ok('npm test, npm start','The only common shortcuts that work without run'),
 V.no('import "./Header" (file is header.tsx)','Works on Mac and Windows, fails on the Linux build server: names are case-sensitive there'),
 V.rh('Convention'),V.ok('build locally, then deploy','A build error on your laptop is a build error on Vercel'))}
${V.hook(`Rehearse before the show: <code>npm run build</code> before every deploy.`)}
`)}

${V.card(2,'Push to live','the platform does the boring parts',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Before: you rent a server, install, copy and restart. With a platform: you push and it does the rest">
<rect class="bx-bad" x="6" y="6" width="200" height="138" rx="10"/><text class="t-b t-bad" x="106" y="32" text-anchor="middle">By hand</text>
<text class="t" x="20" y="60">rent a server</text><text class="t" x="20" y="84">install Node</text><text class="t" x="20" y="108">copy files over</text><text class="t" x="20" y="132">restart, pray</text>
<rect class="bx-ok" x="214" y="6" width="200" height="138" rx="10"/><text class="t-b t-ok" x="314" y="32" text-anchor="middle">With a platform</text>
${V.ic('laptop',236,48,52,'ic-a')}<path class="ln-ok" style="stroke-width:3" d="M294 74H320"/><polygon class="ah-ok" points="318,67 318,81 330,74"/>${V.ic('globe',336,48,52,'ic-ok')}
<text class="t-m" x="314" y="130" text-anchor="middle">git push</text>
</svg><figcaption>Platforms such as Vercel, Netlify and Cloudflare Pages build and host your site, so there is no server for you to look after.</figcaption></figure>
${V.like(`<p>Sending your story to a publisher. You hand over the manuscript; they print it, bind it and put it in shops worldwide. You never touch a printing press.</p>`)}
${V.why(`<p>Deploying used to mean renting a server, installing everything and copying files by hand, then hoping nothing broke. Around 2007 Heroku made "git push to deploy" popular, and frontend platforms like Netlify and Vercel (first called ZEIT) followed in the mid-2010s.</p>`)}
<p><b>Watch one push go live.</b> With Git connected, every push to <code>main</code> does this by itself. The <code>vercel</code> command does the same, uploading from your laptop instead of GitHub.</p>
${V.steps([
 ['You push your commits to GitHub.',pushF(0,'$ git push origin main','You push to GitHub')],
 ['GitHub tells Vercel "there is a new commit on main". Vercel starts a fresh, empty build machine.',pushF(1,'new commit on main → start a build','GitHub tells Vercel')],
 ['Vercel downloads your code, installs the packages and runs your build script, exactly like <code>npm run build</code> on your laptop.',pushF(2,'npm install ... next build','Vercel builds the code')],
 ['The built files are copied to servers all over the world, so visitors get them from somewhere nearby. This network is called a <b>CDN</b> (content delivery network).',pushF(3,'Build OK. Copying files worldwide...','Files spread to the global network')],
 ['Done. The deployment gets its own URL and, for main, your real domain points at it. Usually under a minute.',pushF(4,'Ready: https://portfolio.vercel.app','The site is live')]])}
${V.hook(`You push, they build, the world sees it.`)}
`)}

${V.card(3,'Preview and production','test on a copy, then go live',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="The domain portfolio.vercel.app points at deployment 3. Deployments 1 and 2 are still kept, frozen">
<rect class="bx-ok" x="110" y="6" width="200" height="38" rx="8"/><text class="t-m" x="210" y="31" text-anchor="middle" style="font-size:14px">portfolio.vercel.app</text>
<path class="ln-ok" style="stroke-width:3" d="M290 44 342 84"/><polygon class="ah-ok" points="334,86 348,80 346,94"/>
<rect class="bx" x="8" y="96" width="124" height="78" rx="8"/><text class="t-b" x="22" y="124">Deploy 1</text><text class="t" x="22" y="152">Monday</text>${V.ic('lock',98,134,26,'ic-info')}
<rect class="bx" x="148" y="96" width="124" height="78" rx="8"/><text class="t-b" x="162" y="124">Deploy 2</text><text class="t" x="162" y="152">Tuesday</text>${V.ic('lock',238,134,26,'ic-info')}
<rect class="bx-ok" x="288" y="96" width="124" height="78" rx="8"/><text class="t-b" x="302" y="124">Deploy 3</text><text class="t" x="302" y="152">today</text>${V.ic('lock',378,134,26,'ic-ok')}
</svg><figcaption>Every deployment is frozen forever with its own URL. Your real domain is just a sign pointing at one of them.</figcaption></figure>
${V.like(`<p>Photo prints and a frame on the wall. Each deployment is a print that never changes. <b>Production</b> is whichever print is in the frame. To undo, you put yesterday's print back in the frame.</p>`)}
${V.why(`<p>Testing on the live site means real visitors see your mistakes. A <b>preview deployment</b> is a full copy at a private-looking URL, so you and your reviewers can click around before anything reaches real users.</p>`)}
${V.anat([[1,'vercel'],' ',[2,'--prod']],[
 '<b>vercel.</b> On its own, it builds a <b>preview</b> deployment with a new unique URL.',
 '<b>--prod.</b> Builds a <b>production</b> deployment and points your real domain at it.'])}
${V.steps([
 ['<code>vercel</code> builds a preview with its own URL. Your real domain does not exist yet.',prevF('vercel',[['k3x9',1]],'','First preview deployment')],
 ['A friend spots a typo on the preview. You fix it and run <code>vercel</code> again: a second preview with a new URL. The first one is untouched.',prevF('vercel',[['k3x9',0],['m7q2',1]],'','Second preview deployment')],
 ['Happy with it, you run <code>vercel --prod</code>. It builds a production deployment and your domain now points at it.',prevF('vercel --prod',[['k3x9',0],['m7q2',0],['p4w8',1]],'p4w8','Production deployment')],
 ['<code>vercel ls</code> lists them all. None was ever changed, which is why rolling back later is instant.',prevF('vercel ls',[['k3x9',0],['m7q2',0],['p4w8',0]],'p4w8','All deployments listed')]])}
${V.rules(V.rh('Rules'),
 V.ok('vercel login','Once per computer, before anything else'),V.no('vercel --prod first','Skipping the preview means your users are the testers'),
 V.rh('Conventions with Git connected'),
 V.ok('push a branch','Gets a preview URL, often posted on the pull request'),V.ok('merge to main','Becomes production automatically'))}
${V.build(`<ol><li>Run <code>npm run build</code> and fix any errors.</li><li>Run <code>vercel login</code> once.</li><li>Run <code>vercel</code> and open the preview URL it prints.</li><li>Run <code>vercel --prod</code> to update the real site.</li><li>Check it answers: <code>curl -I</code> the production URL and look for 200.</li></ol>`)}
${V.hook(`Preview is the rehearsal, production is the show, and every deployment is a photo that never changes.`)}
`)}

<div class="try"><b>Try it in your head</b>1. The build fails on Vercel but not on your Mac. A likely cause? <i>A file name with different capitals: Linux is case-sensitive.</i> 2. Which command gives you a test URL without touching the real site? <i>vercel</i> 3. Why is rolling back instant? <i>Old deployments are kept unchanged; the domain just points back at one.</i></div>
`);

}
