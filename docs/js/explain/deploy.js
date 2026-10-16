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
${S.map((s,i)=>{const cx=52+i*106;return (i===k?`<rect class="bx-hl" x="${cx-44}" y="22" width="88" height="112" rx="10"/>`:'')+V.ic(s[0],cx-32,30,64,s[2])+`<text class="t${i===k?'-b':''}" x="${cx}" y="124" text-anchor="middle">${s[1]}</text>`}).join('')}
${[0,1,2].map(i=>{const x=88+i*106,c=i<k?'ln-ok':'ln';return `<path class="${c}" style="stroke-width:3" d="M${x} 62H${x+20}"/><polygon class="${i<k?'ah-ok':'ah'}" points="${x+18},55 ${x+18},69 ${x+28},62"/>`}).join('')}
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

const sshF=(link,on,lines,label)=>`<svg viewBox="0 0 420 200" role="img" aria-label="${label}">
${on==='you'?'<rect class="bx-hl" x="4" y="2" width="104" height="60" rx="8"/>':''}${on==='vps'?'<rect class="bx-hl" x="320" y="2" width="96" height="60" rx="8"/>':''}
${V.ic('laptop',10,6,40,'ic-a')}<text class="t" x="56" y="32" style="font-size:14px">laptop</text>
${V.ic('server',326,6,40,'ic-info')}<text class="t" x="372" y="32" style="font-size:14px">VPS</text>
${link?`<path class="${link==='ok'?'ln-ok':'ln-d'}" style="stroke-width:3" d="M114 26H316"/>`:''}${link==='ok'?V.ic('lock',198,12,28,'ic-ok'):''}
<rect class="bx-dark" x="8" y="66" width="404" height="128" rx="8"/>
${lines.map((l,i)=>`<text class="t-term${l[1]?' '+l[1]:''}" x="20" y="${94+i*28}" style="font-size:14px">${l[0]}</text>`).join('')}
</svg>`;
const pxF=(k,label)=>{
 const a=(d,c,h)=>`<path class="${c}" style="stroke-width:3" d="${d}"/>`+(h?`<polygon class="${c==='ln-ok'?'ah-ok':'ah-a'}" points="${h}"/>`:'');
 return `<svg viewBox="0 0 420 190" role="img" aria-label="${label}">
<rect class="ln-d" x="128" y="14" width="288" height="138" rx="10"/><text class="t-s" x="140" y="34" style="font-size:14px">your VPS</text>
${V.ic('globe',8,52,64,'ic-p')}<text class="t" x="40" y="136" text-anchor="middle">visitor</text>
<rect class="${k===0||k===3?'bx-hl':'bx-info'}" x="140" y="44" width="116" height="96" rx="8"/>${V.ic('shield',176,50,44,'ic-info')}<text class="t-b" x="198" y="112" text-anchor="middle">Nginx</text><text class="t-m" x="198" y="132" text-anchor="middle" style="font-size:14px">:80 :443</text>
<rect class="${k===1||k===2?'bx-hl':'bx'}" x="292" y="44" width="116" height="96" rx="8"/>${V.ic('gear',328,50,44,'ic-a')}<text class="t-b" x="350" y="112" text-anchor="middle">Node app</text><text class="t-m" x="350" y="132" text-anchor="middle" style="font-size:14px">:3000</text>
${k===0?a('M76 76H128','ln-a','126,69 126,83 138,76'):''}
${k===1?a('M258 76H280','ln-a','278,69 278,83 290,76'):''}
${k===2?a('M290 112H270','ln-ok','272,105 272,119 260,112'):''}
${k===3?a('M138 112H86','ln-ok','88,105 88,119 76,112'):''}
<text class="t-m ${k<2?'t-a':'t-ok'}" x="210" y="180" text-anchor="middle" style="font-size:14px">${['GET / (port 443)','proxy_pass http://localhost:3000','200 OK + page','200 OK, encrypted for the visitor'][k]}</text>
</svg>`};
const fwF=(cmd,st,on,label)=>{
 const P=[['22','SSH'],['80','HTTP'],['443','HTTPS'],['3000','app']];
 return `<svg viewBox="0 0 420 210" role="img" aria-label="${label}">
<rect class="bx-dark" x="8" y="6" width="404" height="34" rx="8"/><text class="t-term" x="20" y="29" style="font-size:14px">$ ${cmd}</text>
<rect class="${on?'bx-info':'bx'}" x="8" y="52" width="404" height="116" rx="8"/><text class="t-b ${on?'t-info':''}" x="210" y="72" text-anchor="middle">${on?'Firewall ON: everything else blocked':'Firewall off: every door open'}</text>
${P.map((p,i)=>{const x=22+i*100,c=st[i]==='ok'?'bx-ok':st[i]==='no'?'bx-bad':'bx-warn';return `<rect class="${c}" x="${x}" y="82" width="76" height="76" rx="6"/><text class="t-m" x="${x+38}" y="104" text-anchor="middle" style="font-weight:700">${p[0]}</text>${V.ic(st[i]==='ok'?'check':st[i]==='no'?'cross':'door',x+22,110,32,st[i]==='ok'?'ic-ok':st[i]==='no'?'ic-bad':'ic-warn')}<text class="t" x="${x+38}" y="190" text-anchor="middle">${p[1]}</text>`}).join('')}
</svg>`};

explain('p3',`
<p>Platforms are easy, but sometimes you want your own computer on the internet, with total control. A rented Linux server, called a <b>VPS</b> (virtual private server), gives you exactly that, and total responsibility too.</p>

${V.card(1,'SSH','a locked remote control for a faraway computer',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Your laptop sends typed commands through an encrypted tunnel to a server far away">
${V.ic('laptop',8,30,72,'ic-a')}<text class="t" x="44" y="128" text-anchor="middle">your laptop</text>
<rect class="bx-ok" x="96" y="50" width="228" height="34" rx="17"/>${V.ic('lock',196,52,30,'ic-ok')}
<text class="t-m" x="150" y="76" text-anchor="middle" style="font-size:14px">ls</text><text class="t-m" x="276" y="76" text-anchor="middle" style="font-size:14px">files</text>
${V.ic('server',340,30,72,'ic-info')}<text class="t" x="376" y="128" text-anchor="middle">VPS</text>
<text class="t-s" x="210" y="112" text-anchor="middle" style="font-size:14px">encrypted tunnel, port 22</text>
</svg><figcaption>SSH (Secure Shell) lets you type into a terminal on a computer in another country. Everything you type travels inside an encrypted tunnel.</figcaption></figure>
${V.like(`<p>A walkie-talkie with a secret code to a robot in another city. You say "list your files", the robot does it and reads back the answer. Nobody listening in can understand a word.</p>`)}
${V.why(`<p>Before SSH, people used a tool called telnet, which sent passwords as plain text. In 1995 a Finnish student, Tatu Ylönen, wrote SSH after someone stole passwords on his university network by listening in.</p>`)}
${V.anat([[1,'ssh'],' ',[2,'root'],[3,'@'],[4,'203.0.113.10']],[
 '<b>ssh.</b> The program that opens the secure connection.',
 '<b>User.</b> Which account to log in as on the server. <code>root</code> is the all-powerful admin.',
 '<b>@</b> means "at", like an email address.',
 '<b>Host.</b> The server\'s IP address or domain name.'])}
${V.steps([
 ['You type the command on your laptop. The prompt <code>you@laptop</code> shows where you are.',sshF('d','you',[['you@laptop:~$ ssh root@203.0.113.10']],'You type the ssh command')],
 ['First visit only: SSH shows the server\'s <b>fingerprint</b>, a unique ID, and asks if you trust it. You type <b>yes</b> and it is remembered.',sshF('d','',[['you@laptop:~$ ssh root@203.0.113.10','t-dim'],['Host key fingerprint is SHA256:x7Qp...'],['Continue connecting (yes/no)? yes']],'The server shows its fingerprint')],
 ['The server asks for the password (or checks your key). Nothing appears while you type a password. That is normal.',sshF('ok','',[['you@laptop:~$ ssh root@203.0.113.10','t-dim'],['Continue connecting (yes/no)? yes','t-dim'],["root@203.0.113.10's password:"]],'Password check')],
 ['You are in. The prompt changes to <code>root@vps</code>: every command now runs <b>on the server</b>, not your laptop.',sshF('ok','vps',[['Welcome to Ubuntu 24.04 LTS','t-dim'],['root@vps:~# apt update'],['Hit:1 http://archive.ubuntu.com ...','t-dim']],'Logged in to the server')],
 ['<code>exit</code> closes the tunnel and you are back on your laptop.',sshF('','you',[['root@vps:~# exit','t-dim'],['Connection to 203.0.113.10 closed.'],['you@laptop:~$']],'Back on the laptop')]])}
${V.rules(V.rh('Rules'),V.ok('read the prompt','root@vps or you@laptop tells you which computer will obey'),
 V.no('ssh 203.0.113.10:22','SSH does not take a colon port. Use -p 22 (22 is the default anyway)'),
 V.rh('Conventions'),V.ok('ssh-keygen -t ed25519','Log in with a key pair instead of a password'),V.ok('a normal user + sudo','Day to day, avoid working as root'))}
${V.hook(`ssh user@host: a locked tunnel to a faraway terminal. Always read the prompt.`)}
`)}

${V.card(2,'Nginx in front','a receptionist for your app',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Visitors meet Nginx at the front desk on ports 80 and 443; Nginx passes requests to the app on port 3000">
${V.ic('people',6,34,70,'ic-p')}<text class="t" x="41" y="130" text-anchor="middle">visitors</text>
<path class="ln-a" style="stroke-width:3" d="M80 70H110"/><polygon class="ah-a" points="108,63 108,77 120,70"/>
<rect class="bx-info" x="124" y="16" width="130" height="110" rx="10"/>${V.ic('person',165,22,48,'ic-info')}<text class="t-b" x="189" y="90" text-anchor="middle">Nginx</text><text class="t-m" x="189" y="112" text-anchor="middle" style="font-size:14px">front desk</text>
<path class="ln-a" style="stroke-width:3" d="M258 70H284"/><polygon class="ah-a" points="282,63 282,77 294,70"/>
<rect class="bx-a" x="298" y="16" width="116" height="110" rx="10"/>${V.ic('gear',332,22,48,'ic-a')}<text class="t-b" x="356" y="90" text-anchor="middle">app</text><text class="t-m" x="356" y="112" text-anchor="middle" style="font-size:14px">room 3000</text>
<text class="t-s" x="270" y="146" text-anchor="middle" style="font-size:14px">only the front desk faces the street</text>
</svg><figcaption>Nginx is a web server that sits in front of your app. This job is called a reverse proxy.</figcaption></figure>
${V.like(`<p>A hotel receptionist. Guests never wander the corridors: they go to the front desk, and the receptionist passes each request to the right room and brings back the answer.</p>`)}
${V.why(`<p>Your Node app is good at running your code but not at the internet's chores. Nginx handles HTTPS, serves files fast, copes with slow visitors and can sit in front of several apps on one machine.</p>`)}
${V.anat([[1,'location /'],' {\n    ',[2,'proxy_pass'],' ',[3,'http://localhost:3000'],[4,';'],'\n}'],[
 '<b>location.</b> Which paths this rule covers. <code>/</code> means everything.',
 '<b>proxy_pass.</b> "Pass the request on to..."',
 '<b>Upstream.</b> Where the app listens. localhost means "this same machine".',
 '<b>Semicolon.</b> Every Nginx setting must end with one.'])}
${V.steps([
 ['A visitor asks for the home page. The request arrives at Nginx on port 443.',pxF(0,'Request reaches Nginx')],
 ['Nginx follows <code>proxy_pass</code> and forwards it to the app on port 3000, inside the same machine.',pxF(1,'Nginx forwards to the app')],
 ['The app builds the page and hands it back to Nginx.',pxF(2,'The app answers Nginx')],
 ['Nginx encrypts the answer and sends it to the visitor. The visitor never talks to port 3000 directly.',pxF(3,'Nginx answers the visitor')]])}
${V.rules(V.rh('Rules'),V.ok('nginx -t','Test the config first. It names the line with the mistake'),V.no('proxy_pass http://localhost:3000','Missing the semicolon: Nginx refuses to load'),
 V.ok('systemctl reload nginx','Loads the new config without dropping visitors'),V.no('editing, then forgetting to reload','Nginx keeps using the old config until you reload'),
 V.rh('Convention'),V.ok('apt update && apt install -y nginx','Refresh the package list, then install'))}
${V.hook(`Edit, test, reload: <code>nginx -t</code> before <code>systemctl reload nginx</code>.`)}
`)}

${V.card(3,'The firewall','close every door you do not use',`
${V.like(`<p>A castle wall with gates. ufw (uncomplicated firewall) decides which gates are open. Lock the gates before you open the one you are standing in, and you lock yourself outside the castle.</p>`)}
${V.why(`<p>Bots scan every public IP address on the internet, all day. Any open port is a door they will try. A firewall means only the services you chose can be reached.</p>`)}
${V.steps([
 ['A fresh server: the firewall is off, so every port is reachable, including your app\'s port 3000.',fwF('ufw status',['open','open','open','open'],false,'Firewall off')],
 ['Allow SSH <b>first</b>, so you keep your own way in.',fwF('ufw allow OpenSSH',['ok','open','open','open'],false,'SSH allowed')],
 ['Allow web traffic. "Nginx Full" means ports 80 and 443. It needs quotes because of the space.',fwF('ufw allow "Nginx Full"',['ok','ok','ok','open'],false,'Web allowed')],
 ['Now switch it on. Everything you did not allow is blocked, including 3000. Your SSH session survives.',fwF('ufw enable',['ok','ok','ok','no'],true,'Firewall on')]])}
${V.rules(V.rh('Rules'),V.ok('ufw allow OpenSSH, then ufw enable','Right order: you stay connected'),V.no('ufw enable first','You cut your own SSH line and are locked out'),
 V.no('ufw allow Nginx Full','Without quotes, the space splits it into two words'),V.ok('ufw status','Check what is allowed'))}
${V.hook(`Allow SSH before you enable: never lock the door you are standing in.`)}
`)}

${V.card(4,'HTTPS with certbot','a free ID card for your site',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="Let's Encrypt checks you control portfolio.dev, then issues a certificate that Nginx uses">
${V.ic('shield',14,30,64,'ic-ok')}<text class="t" x="46" y="122" text-anchor="middle">Let's Encrypt</text>
<path class="ln-ok" style="stroke-width:3" d="M92 62H118"/><polygon class="ah-ok" points="116,55 116,69 128,62"/>
<rect class="bx-ok" x="132" y="10" width="190" height="112" rx="10"/>${V.ic('lock',144,20,34,'ic-ok')}
<text class="t-b" x="186" y="44">Certificate</text><text class="t-m" x="146" y="78" style="font-size:14px">portfolio.dev</text><text class="t" x="146" y="106" style="font-size:14px">expires in 90 days</text>
<path class="ln-ok" style="stroke-width:3" d="M326 62H344"/><polygon class="ah-ok" points="342,55 342,69 354,62"/>
${V.ic('server',356,30,58,'ic-info')}<text class="t" x="385" y="122" text-anchor="middle">Nginx</text>
<text class="t-s" x="210" y="152" text-anchor="middle" style="font-size:14px">certbot fetches it, installs it and renews it</text>
</svg><figcaption>A certificate proves to browsers that the server really is portfolio.dev. That proof is what turns the padlock on.</figcaption></figure>
${V.like(`<p>A passport. A trusted office checks who you are and stamps a document with an expiry date. Browsers trust the office, so they trust your passport.</p>`)}
${V.why(`<p>Certificates used to cost money and take hours to set up, so many sites skipped HTTPS. Let's Encrypt launched in 2015 and gives them away free and automatically. Now most of the web is HTTPS.</p>`)}
${V.anat([[1,'certbot'],' ',[2,'--nginx'],' ',[3,'-d portfolio.dev']],[
 '<b>certbot.</b> The tool that talks to Let\'s Encrypt for you.',
 '<b>--nginx.</b> Also edit the Nginx config to use the certificate.',
 '<b>-d.</b> The domain to cover. Repeat it for each name, like <code>-d www.portfolio.dev</code>.'])}
${V.rules(V.rh('Rules'),V.ok('DNS points at the server first','Let\'s Encrypt checks by visiting your domain'),V.ok('port 80 open','The check arrives on plain HTTP'),
 V.rh('Conventions'),V.ok('certbot renew --dry-run','Prove automatic renewal works'))}
${V.build(`<ol><li><code>ssh</code> into the server.</li><li><code>apt update</code>, then install Nginx.</li><li>Allow OpenSSH and "Nginx Full", then enable ufw.</li><li>Add <code>proxy_pass</code>, run <code>nginx -t</code>, reload.</li><li><code>exit</code> and <code>curl</code> the domain from your laptop.</li><li>Install certbot and its Nginx plugin, run it, then <code>curl -I https://...</code></li></ol>`)}
${V.hook(`Connect, install, wall up, proxy, padlock.`)}
`)}

<div class="try"><b>Try it in your head</b>1. The prompt says <code>root@vps:~#</code>. Where will <code>rm</code> delete files? <i>On the server.</i> 2. You edited the Nginx config but nothing changed. What did you forget? <i>nginx -t, then systemctl reload nginx.</i> 3. What must you run before <code>ufw enable</code>? <i>ufw allow OpenSSH.</i></div>
`);

const ciF=(st,verdict,label)=>{
 const R=['on: push','runs-on: ubuntu-latest','uses: actions/checkout@v4','uses: actions/setup-node@v4','run: npm ci','run: npm test'];
 const C={ok:['bx-ok','check','ic-ok'],run:['bx-hl','clock','ic-a'],bad:['bx-bad','cross','ic-bad'],p:['bx','','']};
 return `<svg viewBox="0 0 420 206" role="img" aria-label="${label}">
${R.map((r,i)=>{const c=C[st[i]],y=8+i*33;return `<rect class="${c[0]}" x="8" y="${y}" width="290" height="28" rx="6"/><text class="t-m${st[i]==='p'?' t-dim':''}" x="18" y="${y+19}" style="font-size:14px">${r}</text>`+(c[1]?V.ic(c[1],304,y+1,26,c[2]):'')}).join('')}
${V.ic('robot',344,30,64,verdict==='passed'?'ic-ok':verdict==='failed'?'ic-bad':'ic-a')}
<text class="t-b ${verdict==='passed'?'t-ok':verdict==='failed'?'t-bad':'t-a'}" x="376" y="124" text-anchor="middle">${verdict}</text>
</svg>`};
const taxF=(rate,res,ok,msg,label)=>`<svg viewBox="0 0 420 190" role="img" aria-label="${label}">
<rect class="bx-dark" x="8" y="8" width="404" height="62" rx="8"/><text class="t-term t-dim" x="20" y="32" style="font-size:14px">// src/tax.js</text>
<text class="t-term" x="20" y="56" style="font-size:14px">export const rate = <tspan class="${rate==='0.10'?'t-bad':'t-ok'}">${rate}</tspan>;</text>
<rect class="${ok===null?'bx':ok?'bx-ok':'bx-bad'}" x="8" y="82" width="320" height="100" rx="8"/>
<text class="t-m" x="20" y="108" style="font-size:14px">expect(withTax(100))</text><text class="t-m" x="20" y="132" style="font-size:14px">  .toBe(108)</text>
<text class="t-m ${ok===null?'':ok?'t-ok':'t-bad'}" x="20" y="166" style="font-size:15px;font-weight:700">${res}</text>
${ok===null?V.ic('clock',344,94,62,'ic-a'):V.ic(ok?'check':'cross',344,94,62,ok?'ic-ok':'ic-bad')}
<text class="t-b ${ok===null?'':ok?'t-ok':'t-bad'}" x="375" y="178" text-anchor="middle">${msg}</text>
</svg>`;

explain('p4',`
<p>Imagine a robot that tests every change you push, within minutes, and shouts before broken code reaches your users. That robot is CI, and it takes one small file to hire it.</p>

${V.card(1,'Continuous integration','a robot inspector on every push',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="Commits ride a conveyor belt past a robot inspector; good ones get a green tick, a broken one gets a red cross">
${V.ic('robot',178,4,64,'ic-a')}<text class="t-b" x="210" y="84" text-anchor="middle">CI</text>
<path class="ln" style="stroke-width:5" d="M8 126H412"/>
<rect class="bx-ok" x="20" y="96" width="72" height="28" rx="5"/><text class="t-m" x="56" y="116" text-anchor="middle" style="font-size:14px">a1b2</text>${V.ic('check',44,132,24,'ic-ok')}
<rect class="bx-ok" x="120" y="96" width="72" height="28" rx="5"/><text class="t-m" x="156" y="116" text-anchor="middle" style="font-size:14px">c3d4</text>${V.ic('check',144,132,24,'ic-ok')}
<rect class="bx-warn" x="228" y="96" width="72" height="28" rx="5"/><text class="t-m" x="264" y="116" text-anchor="middle" style="font-size:14px">e5f6</text>${V.ic('search',252,132,24,'ic-a')}
<rect class="bx-bad" x="328" y="96" width="72" height="28" rx="5"/><text class="t-m" x="364" y="116" text-anchor="middle" style="font-size:14px">g7h8</text>${V.ic('cross',352,132,24,'ic-bad')}
</svg><figcaption>CI (continuous integration) checks every commit the same way: install, test, build. A red cross means "do not merge this yet".</figcaption></figure>
${V.like(`<p>A quality inspector at the end of a factory line. Every single product is checked before it leaves, not just the ones someone remembered to look at.</p>`)}
${V.why(`<p>Teams used to combine everyone's work rarely, then spend days fixing what clashed. Programmers called it "integration hell". The cure, named in the 1990s, was to integrate small changes all the time and test each one automatically.</p>`)}
<p><b>Watch a run</b>, stage by stage, after you push:</p>
${V.steps([
 ['You push. GitHub reads your workflow file and sees <code>on: push</code>, so a run starts.',ciF(['run','p','p','p','p','p'],'starting','The push triggers a run')],
 ['GitHub starts a brand-new virtual machine, called a <b>runner</b>. It is completely empty: no code, no Node.',ciF(['ok','run','p','p','p','p'],'booting','A fresh runner starts')],
 ['<code>checkout</code> copies your repository onto the runner. <code>setup-node</code> installs Node 24.',ciF(['ok','ok','ok','run','p','p'],'running','Checkout and setup-node')],
 ['<code>npm ci</code> installs the exact package versions listed in your lockfile.',ciF(['ok','ok','ok','ok','run','p'],'running','npm ci installs packages')],
 ['<code>npm test</code> runs every test. All pass, so the run goes green and the commit gets a tick.',ciF(['ok','ok','ok','ok','ok','ok'],'passed','All steps pass')]])}
${V.hook(`Every push, same checks, same robot. Green means go.`)}
`)}

${V.card(2,'The workflow file','workflow, jobs, steps',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A workflow contains jobs; each job runs on a runner and contains steps">
<rect class="bx-info" x="6" y="6" width="408" height="158" rx="10"/><text class="t-b t-info" x="18" y="30">Workflow: ci.yml</text><text class="t-m" x="402" y="30" text-anchor="end" style="font-size:14px">on: push</text>
<rect class="bx-a" x="18" y="42" width="384" height="112" rx="8"/><text class="t-b t-a" x="30" y="64">Job: test</text>
<rect class="bx" x="30" y="76" width="86" height="64" rx="6"/><text class="t" x="73" y="104" text-anchor="middle">step</text><text class="t-m" x="73" y="128" text-anchor="middle" style="font-size:14px">uses</text>
<rect class="bx" x="122" y="76" width="86" height="64" rx="6"/><text class="t" x="165" y="104" text-anchor="middle">step</text><text class="t-m" x="165" y="128" text-anchor="middle" style="font-size:14px">uses</text>
<rect class="bx" x="214" y="76" width="86" height="64" rx="6"/><text class="t" x="257" y="104" text-anchor="middle">step</text><text class="t-m" x="257" y="128" text-anchor="middle" style="font-size:14px">run</text>
<rect class="bx" x="306" y="76" width="86" height="64" rx="6"/><text class="t" x="349" y="104" text-anchor="middle">step</text><text class="t-m" x="349" y="128" text-anchor="middle" style="font-size:14px">run</text>
</svg><figcaption>Boxes inside boxes. A workflow holds jobs. Each job gets its own runner machine and runs its steps in order, top to bottom.</figcaption></figure>
${V.like(`<p>A recipe book. The <b>workflow</b> is the book, a <b>job</b> is one recipe, cooked in its own kitchen (the runner), and <b>steps</b> are the numbered instructions.</p>`)}
${V.anat([[1,'on: push'],'\njobs:\n  test:\n    ',[2,'runs-on: ubuntu-latest'],'\n    steps:\n      - ',[3,'uses: actions/checkout@v4'],'\n      - ',[4,'run: npm test']],[
 '<b>Trigger.</b> When to run. <code>push</code>, <code>pull_request</code>, or both.',
 '<b>Runner.</b> Which kind of fresh machine the job gets.',
 '<b>uses.</b> Borrow a ready-made action someone published. <code>@v4</code> pins its version.',
 '<b>run.</b> Type a shell command, exactly as you would in a terminal.'])}
${V.rules(V.rh('Rules: break one and the workflow never runs'),
 V.ok('.github/workflows/ci.yml','GitHub only looks in this exact folder'),V.no('a tab before steps:','YAML forbids tabs. Use two spaces per level'),
 V.no('steps: with wrong indent','Indentation is meaning: a misplaced line belongs to a different parent'),
 V.rh('Conventions'),V.ok('run: npm ci','Exact, clean install from the lockfile. Use it in CI, not npm install'),
 V.ok('actions/checkout@v4','Always pin actions to a version'),V.ok('gh run watch','Follow the run live from your terminal'))}
${V.build(`<ol><li><code>mkdir -p .github/workflows</code></li><li>Create <code>ci.yml</code> with a trigger, a job and four steps: checkout, setup-node, npm ci, npm test.</li><li>Commit and <code>git push</code>.</li><li>Run <code>gh run watch</code> and wait for the green tick.</li></ol>`)}
${V.hook(`Workflow, job, steps: book, recipe, instructions. Two spaces, never tabs.`)}
`)}

${V.card(3,'Red means stop','CI catches the bug before users do',`
${V.like(`<p>A smoke alarm. It is annoying when it goes off, but you would much rather hear it than not.</p>`)}
${V.steps([
 ['A teammate changes the tax rate to 0.10 and pushes. It looks harmless.',taxF('0.10','waiting for CI...',null,'running','Tax rate changed to 0.10')],
 ['CI runs the test. 100 plus 10% is 110, but the test expects 108. The run turns <b>red</b> and the pull request cannot be merged.',taxF('0.10','received 110: FAIL',false,'failed','Test fails: received 110')],
 ['You put the rate back to 0.08 and push again.',taxF('0.08','waiting for CI...',null,'running','Rate fixed to 0.08')],
 ['CI goes <b>green</b>: 108 equals 108. The change is safe to merge.',taxF('0.08','received 108: PASS',true,'passed','Test passes')]])}
${V.rules(V.rh('Rules'),V.ok('protect main','Settings can require a green check before merging'),
 V.no('deleting the failing test','Turns the alarm off without putting the fire out'),
 V.ok('read the failing step\'s log','It says exactly what was expected and what came back'))}
${V.hook(`Red means stop and read the log. Green means merge.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Your workflow is in <code>workflows/ci.yml</code> at the top of the repo and never runs. Why? <i>It must be in .github/workflows/.</i> 2. What does <code>uses: actions/checkout@v4</code> do? <i>Copies your code onto the empty runner.</i> 3. Which is better in CI, <code>npm install</code> or <code>npm ci</code>? <i>npm ci: an exact install from the lockfile.</i></div>
`);

const gitF=(cmd,files,pushed,label)=>`<svg viewBox="0 0 420 206" role="img" aria-label="${label}">
<rect class="bx-dark" x="8" y="6" width="404" height="34" rx="8"/><text class="t-term" x="20" y="29" style="font-size:14px">$ ${cmd}</text>
<text class="t-s" x="12" y="62" style="font-size:14px">your folder</text>
${files.map(([n,c,note],i)=>{const y=70+i*33;return `<rect class="${c}" x="8" y="${y}" width="196" height="28" rx="6"/>${V.ic('file',14,y+3,22,'ic-info')}<text class="t-m${note==='ignored'?' t-dim':''}" x="42" y="${y+19}" style="font-size:14px">${n}</text>`+(note?`<text class="t ${note==='ignored'?'t-info':'t-warn'}" x="198" y="${y+19}" text-anchor="end" style="font-size:14px">${note}</text>`:'')}).join('')}
<rect class="bx-info" x="220" y="48" width="192" height="152" rx="10"/>${V.ic('branch',230,54,30,'ic-p')}<text class="t-b" x="268" y="76">GitHub</text>
${pushed?pushed.map((n,i)=>`<text class="t-m${n[1]?' t-bad':''}" x="236" y="${108+i*26}" style="font-size:14px">${n[0]}</text>`).join(''):'<text class="t t-dim" x="236" y="112">nothing pushed yet</text>'}
</svg>`;
const secF=(k,msg,label)=>{
 const S=[['laptop','you','ic-a'],['lock','GitHub secrets','ic-ok'],['robot','runner','ic-info'],['globe','Vercel','ic-p']];
 return `<svg viewBox="0 0 420 190" role="img" aria-label="${label}">
${S.map((s,i)=>{const cx=52+i*106;return (i===k?`<rect class="bx-hl" x="${cx-50}" y="16" width="100" height="118" rx="10"/>`:'')+V.ic(s[0],cx-30,26,60,s[2])+`<text class="t${i===k?'-b':''}" x="${cx}" y="110" text-anchor="middle" style="font-size:14px">${s[1].split(' ')[0]}</text>`+(s[1].includes(' ')?`<text class="t${i===k?'-b':''}" x="${cx}" y="126" text-anchor="middle" style="font-size:14px">${s[1].split(' ')[1]}</text>`:'')}).join('')}
${[0,1,2].map(i=>{const x=88+i*106;return `<path class="${i<k?'ln-ok':'ln'}" style="stroke-width:3" d="M${x} 56H${x+20}"/><polygon class="${i<k?'ah-ok':'ah'}" points="${x+18},49 ${x+18},63 ${x+28},56"/>`}).join('')}
<rect class="bx-dark" x="8" y="142" width="404" height="40" rx="8"/><text class="t-term" x="20" y="168" style="font-size:14px">${msg}</text>
</svg>`};

explain('p5',`
<p>Your code is shared with teammates, GitHub and sometimes the whole world. Your passwords must not be. Environment variables are how you keep them apart.</p>

${V.card(1,'Environment variables','same code, different settings in each place',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="The code asks for DATABASE_URL; the laptop, CI and Vercel each supply a different value">
<rect class="bx-dark" x="80" y="6" width="260" height="38" rx="8"/><text class="t-term" x="210" y="31" text-anchor="middle" style="font-size:14px">process.env.DATABASE_URL</text>
<path class="ln-d" d="M150 44 70 74M210 44V74M270 44 350 74"/>
<rect class="bx-a" x="6" y="76" width="128" height="104" rx="8"/>${V.ic('laptop',46,82,48,'ic-a')}<text class="t-b" x="70" y="148" text-anchor="middle">laptop</text><text class="t-m" x="70" y="170" text-anchor="middle" style="font-size:14px">local db</text>
<rect class="bx-info" x="146" y="76" width="128" height="104" rx="8"/>${V.ic('robot',186,82,48,'ic-info')}<text class="t-b" x="210" y="148" text-anchor="middle">CI</text><text class="t-m" x="210" y="170" text-anchor="middle" style="font-size:14px">test db</text>
<rect class="bx-ok" x="286" y="76" width="128" height="104" rx="8"/>${V.ic('globe',326,82,48,'ic-ok')}<text class="t-b" x="350" y="148" text-anchor="middle">production</text><text class="t-m" x="350" y="170" text-anchor="middle" style="font-size:14px">real db</text>
</svg><figcaption>The code only knows the variable's name. Each place the code runs fills in its own value.</figcaption></figure>
${V.like(`<p>A coat hook with a label. The code says "take the key hanging on the hook marked DATABASE_URL". Every house hangs its own key on that hook, so the same instructions open a different door in each house.</p>`)}
${V.why(`<p>Passwords written into code get copied everywhere the code goes, and changing one means a new release. In 2011 Heroku's "Twelve-Factor App" guide said: keep settings in the environment, not the code. Everyone has done it since.</p>`)}
${V.anat([[1,'DATABASE_URL'],[2,'='],[3,'postgres://'],[4,'me:pw'],'@',[5,'localhost'],'/',[6,'site']],[
 '<b>Name.</b> CAPITALS with underscores, by convention.',
 '<b>Equals.</b> No spaces on either side in a .env file.',
 '<b>Scheme.</b> Which kind of database.',
 '<b>Login.</b> The secret part. This is why the whole line is secret.',
 '<b>Host.</b> Where the database lives. Here, this same computer.',
 '<b>Database name.</b>'])}
${V.rules(V.rh('Rules'),V.ok('API_KEY=abc123','One per line, no spaces around ='),V.no('API_KEY = abc123','Spaces can become part of the name or value'),
 V.rh('Conventions'),V.ok('UPPER_SNAKE_CASE','Names in capitals with underscores'),V.ok('.env.example','Commit the names with fake values, so teammates know what to set'))}
${V.hook(`The code knows the name, the place supplies the value.`)}
`)}

${V.card(2,'.env and .gitignore','keep the secret file out of Git',`
${V.like(`<p>A diary in a shared house. You can keep it in your room, but you put a sign on it, "do not pack", so it never ends up in the boxes you send away.</p>`)}
${V.steps([
 ['You create <code>.env</code> with your database password. Git notices a new, untracked file. One <code>git add .</code> would include it.',gitF('echo "DATABASE_URL=postgres://..." &gt; .env',[['.env','bx-hl','untracked!'],['.gitignore','bx',''],['package.json','bx',''],['app/','bx','']],null,'A new .env file is untracked')],
 ['You add <code>.env</code> to <code>.gitignore</code>, the list of files Git must pretend not to see. Note the double <code>&gt;&gt;</code>: it adds a line instead of wiping the file.',gitF('echo ".env" &gt;&gt; .gitignore',[['.env','bx','ignored'],['.gitignore','bx-hl',''],['package.json','bx',''],['app/','bx','']],null,'.env is now ignored')],
 ['Now you push. Everything goes to GitHub except <code>.env</code>. The secret stays on your laptop.',gitF('git add . &amp;&amp; git push',[['.env','bx','ignored'],['.gitignore','bx-ok',''],['package.json','bx-ok',''],['app/','bx-ok','']],[['.gitignore'],['package.json'],['app/'],['no .env',1]],'Pushed without .env')]])}
${V.rules(V.rh('Rules'),V.ok('echo ".env" &gt;&gt; .gitignore','&gt;&gt; appends a line'),V.no('echo ".env" &gt; .gitignore','A single &gt; replaces the whole file'),
 V.ok('add .env to .gitignore first','Before your first commit'),V.no('deleting a pushed .env','It stays in Git history forever. Change (rotate) the password instead'))}
${V.hook(`Secrets live in .env, and .env lives in .gitignore.`)}
`)}

${V.card(3,'Secrets on platforms','production and CI keep their own copies',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Three homes for settings: .env on your laptop, Vercel environment variables, GitHub Actions secrets">
<rect class="bx-a" x="6" y="6" width="130" height="138" rx="10"/>${V.ic('laptop',43,16,56,'ic-a')}<text class="t-m" x="71" y="98" text-anchor="middle">.env</text><text class="t" x="71" y="126" text-anchor="middle" style="font-size:14px">your laptop</text>
<rect class="bx-ok" x="145" y="6" width="130" height="138" rx="10"/>${V.ic('lock',182,16,56,'ic-ok')}<text class="t-m" x="210" y="98" text-anchor="middle" style="font-size:14px">vercel env</text><text class="t" x="210" y="126" text-anchor="middle" style="font-size:14px">production</text>
<rect class="bx-info" x="284" y="6" width="130" height="138" rx="10"/>${V.ic('lock',321,16,56,'ic-info')}<text class="t-m" x="349" y="98" text-anchor="middle" style="font-size:14px">gh secret</text><text class="t" x="349" y="126" text-anchor="middle" style="font-size:14px">GitHub Actions</text>
</svg><figcaption>Your laptop uses .env. The hosting platform and CI each store their own copy, encrypted, and inject it when the code runs.</figcaption></figure>
${V.anat([[1,'gh secret set'],' ',[2,'VERCEL_TOKEN']],[
 '<b>gh secret set.</b> Store a secret in your GitHub repository. It asks for the value, so it never lands in your shell history.',
 '<b>Name.</b> How workflows will refer to it.'])}
${V.steps([
 ['You store the token. GitHub encrypts it at once. Even you cannot read it back, only replace it.',secF(0,'$ gh secret set VERCEL_TOKEN','You store the secret')],
 ['Your workflow refers to it by name, never by value.',secF(1,'--token \${{ secrets.VERCEL_TOKEN }}','The workflow names the secret')],
 ['When the job runs, GitHub hands the real value to the runner. If it ever appears in the log, GitHub prints <b>***</b> instead.',secF(2,'log: vercel deploy --prod --token ***','The runner receives it, masked')],
 ['The runner uses the token to deploy. The secret never touched your code.',secF(3,'Production: https://portfolio.vercel.app','Deployed')]])}
${V.rules(V.ok('vercel env add DATABASE_URL production','Asks for the value, then stores it for production only'),
 V.ok('\${{ secrets.NAME }}','The only way a workflow should read a secret'),V.no('run: echo $TOKEN','Do not print secrets on purpose, even masked'))}
${V.hook(`Name in the code, value in the vault.`)}
`)}

${V.card(4,'NEXT_PUBLIC_ is public','some variables are shipped to every visitor',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="NEXT_PUBLIC_SITE_NAME is visible to anyone in the browser; DATABASE_URL stays locked on the server">
<rect class="bx-warn" x="6" y="6" width="200" height="148" rx="10"/>${V.ic('search',20,16,44,'ic-warn')}<text class="t-b" x="74" y="46">browser</text>
<text class="t-m" x="18" y="92" style="font-size:14px">NEXT_PUBLIC_</text><text class="t-m" x="18" y="112" style="font-size:14px">SITE_NAME</text><text class="t t-warn" x="18" y="140" style="font-size:14px">anyone can read it</text>
<rect class="bx-ok" x="214" y="6" width="200" height="148" rx="10"/>${V.ic('lock',228,16,44,'ic-ok')}<text class="t-b" x="282" y="46">server only</text>
<text class="t-m" x="226" y="102" style="font-size:14px">DATABASE_URL</text><text class="t t-ok" x="226" y="140" style="font-size:14px">never leaves</text>
</svg><figcaption>In Next.js, a variable starting with NEXT_PUBLIC_ is copied into the JavaScript sent to browsers. Everything else stays on the server.</figcaption></figure>
${V.like(`<p>NEXT_PUBLIC_ is a postcard: fine for "Ada's portfolio", never for a password.</p>`)}
${V.rules(V.ok('NEXT_PUBLIC_SITE_NAME','Not a secret: fine to show'),V.no('NEXT_PUBLIC_STRIPE_SECRET_KEY','Every visitor could read and use it'))}
${V.build(`<ol><li>Create <code>.env</code> with <code>DATABASE_URL=...</code>.</li><li>Append <code>.env</code> to <code>.gitignore</code> and check with <code>cat .gitignore</code>.</li><li><code>vercel env add DATABASE_URL production</code>.</li><li><code>gh secret set VERCEL_TOKEN</code>.</li><li>Write a deploy workflow that uses <code>\${{ secrets.VERCEL_TOKEN }}</code>, push, and <code>gh run watch</code>.</li></ol>`)}
${V.hook(`If it is NEXT_PUBLIC_, it is a postcard.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What does <code>echo ".env" &gt; .gitignore</code> do to your old .gitignore? <i>Wipes it and leaves only .env.</i> 2. You pushed a password by mistake and deleted the file. Safe now? <i>No: it is in the history. Change the password.</i> 3. Which is safe to expose: <code>NEXT_PUBLIC_SITE_NAME</code> or <code>JWT_SECRET</code>? <i>NEXT_PUBLIC_SITE_NAME.</i></div>
`);

const rbF=(cmd,rows,prod,code,label)=>{
 const ok=code===200;
 return `<svg viewBox="0 0 420 210" role="img" aria-label="${label}">
<rect class="bx-dark" x="8" y="6" width="404" height="34" rx="8"/><text class="t-term" x="20" y="29" style="font-size:14px">$ ${cmd}</text>
${rows.map(([id,when,bad],i)=>{const y=52+i*38;return `<rect class="${i===prod?(bad?'bx-bad':'bx-ok'):'bx'}" x="8" y="${y}" width="262" height="32" rx="6"/><text class="t-m" x="18" y="${y+22}" style="font-weight:700">${id}</text><text class="t" x="262" y="${y+22}" text-anchor="end" style="font-size:14px">${when}</text>`+(bad?V.ic('bug',140,y+5,22,'ic-bad'):'')}).join('')}
<rect class="bx-info" x="304" y="${52+prod*38-6}" width="108" height="44" rx="8"/><text class="t-b" x="358" y="${52+prod*38+21}" text-anchor="middle" style="font-size:14px">production</text>
<path class="ln-a" style="stroke-width:3" d="M302 ${68+prod*38}H284"/><polygon class="ah-a" points="286,${61+prod*38} 286,${75+prod*38} 274,${68+prod*38}"/>
<rect class="${ok?'bx-ok':'bx-bad'}" x="8" y="170" width="404" height="34" rx="8"/><text class="t-m ${ok?'t-ok':'t-bad'}" x="20" y="193" style="font-size:14px;font-weight:700">curl -I portfolio.vercel.app → ${ok?'200 OK':'500 Error'}</text>
</svg>`};

explain('p6',`
<p>Every team ships a bug to production one day. What makes a professional is not never breaking things; it is noticing fast and fixing it in minutes, calmly.</p>

${V.card(1,'Monitoring','hear about problems before your users do',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="An uptime robot checks the site every minute; green ticks turn into red crosses and it sends an alert">
${V.ic('robot',8,30,64,'ic-info')}<text class="t" x="40" y="118" text-anchor="middle">uptime check</text>
<path class="ln" style="stroke-width:3" d="M84 62H340"/>
<circle class="dot-ok" cx="104" cy="62" r="9"/><circle class="dot-ok" cx="144" cy="62" r="9"/><circle class="dot-ok" cx="184" cy="62" r="9"/><circle class="dot-ok" cx="224" cy="62" r="9"/>
${V.ic('cross',250,49,26,'ic-bad')}${V.ic('cross',290,49,26,'ic-bad')}
<text class="t-m" x="164" y="96" text-anchor="middle" style="font-size:14px">200 200 200 200</text><text class="t-m t-bad" x="284" y="96" text-anchor="middle" style="font-size:14px">500 500</text>
${V.ic('phone',350,26,60,'ic-bad')}<text class="t-b t-bad" x="380" y="118" text-anchor="middle">alert!</text>
<text class="t-s" x="210" y="150" text-anchor="middle" style="font-size:14px">one request a minute, every minute, all night</text>
</svg><figcaption>An uptime check visits your site every minute. The moment it gets errors, your phone buzzes.</figcaption></figure>
${V.like(`<p>A smoke alarm and a heart monitor. You do not sit staring at the patient all night; the machine beeps the second something changes.</p>`)}
${V.why(`<p>Without monitoring, the first sign of trouble is an angry message from a user, hours later. Uptime services (Better Stack, UptimeRobot) and error trackers (Sentry) turn that into an alert within a minute.</p>`)}
${V.anat([[1,'HTTP/2'],' ',[2,'500']],[
 '<b>Protocol.</b> Which version of HTTP the server spoke.',
 '<b>Status.</b> The number to look at. 500 means the app crashed. This is the first line <code>curl -I</code> prints.'])}
${V.rules(V.rh('Rules'),V.ok('confirm it yourself','Run curl -I on the site before you change anything'),V.no('"works on my laptop"','Production is what matters. Check the real URL'))}
${V.hook(`Machines watch, people sleep. Confirm with <code>curl -I</code>.`)}
`)}

${V.card(2,'Logs','the server\'s diary',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A log: two info lines, then an error line for the projects page">
<rect class="bx-dark" x="6" y="6" width="408" height="148" rx="8"/>
<text class="t-term t-dim" x="18" y="36" style="font-size:14px">21:02:58 INFO  GET /       200</text>
<text class="t-term t-dim" x="18" y="64" style="font-size:14px">21:03:05 INFO  GET /about  200</text>
<text class="t-term t-bad" x="18" y="92" style="font-size:14px">21:03:12 ERROR GET /projects 500</text>
<text class="t-term t-bad" x="18" y="120" style="font-size:14px">TypeError: Cannot read properties</text>
<text class="t-term t-bad" x="18" y="144" style="font-size:14px">  of undefined (reading 'map')</text>
</svg><figcaption>Every request leaves a line in the log. When something breaks, the error line says what, where and when.</figcaption></figure>
${V.like(`<p>A plane's black box. It records everything, all the time, so after a problem you can replay exactly what happened instead of guessing.</p>`)}
${V.anat([[1,'21:03:12'],' ',[2,'ERROR'],' ',[3,'GET /projects'],' ',[4,'500']],[
 '<b>Time.</b> Match it to when users started complaining.',
 '<b>Level.</b> INFO is normal, WARN is odd, ERROR is broken.',
 '<b>What was asked.</b> Which page failed.',
 '<b>Status.</b> What the visitor got back.'])}
${V.rules(V.rh('Where to read logs'),V.ok('vercel logs &lt;deployment-url&gt;','Logs for one Vercel deployment'),V.ok('journalctl -u app','Logs for a service called app on a Linux server'),
 V.ok('journalctl -u app -f','Follow: new lines appear live'),V.ok('journalctl -u app -n 50','Only the last 50 lines'),
 V.rh('Rule'),V.no('reading only the last line','Scroll up to the first ERROR: later errors are often side effects'))}
${V.hook(`Logs are the black box: find the first ERROR and its time.`)}
`)}

${V.card(3,'Rollback','put yesterday\'s photo back in the frame',`
${V.like(`<p>The undo button. Remember that every deployment is a frozen photo. Rolling back does not rebuild anything: it just points production at the last photo that worked.</p>`)}
${V.why(`<p>Hunting for a bug takes time, and while you hunt, every visitor sees an error. Because platforms keep old deployments unchanged, going back takes seconds. That is why the rule is: restore first, debug second.</p>`)}
${V.steps([
 ['Monday\'s deployment is live and healthy.',rbF('vercel ls',[['a1b2c3d4e','Monday']],0,200,'Monday deployment healthy')],
 ['Tonight someone deploys f9e8d7c6b. It has a bug on the projects page, and the site starts returning 500.',rbF('vercel --prod',[['a1b2c3d4e','Monday'],['f9e8d7c6b','tonight',1]],1,500,'Tonight deployment returns 500')],
 ['You run <code>vercel rollback</code>. Production points back at Monday\'s deployment. Nothing is rebuilt, so it takes seconds.',rbF('vercel rollback',[['a1b2c3d4e','Monday'],['f9e8d7c6b','tonight',1]],0,200,'Rolled back to Monday')],
 ['You check: <code>curl -I</code> says 200 again. Users are happy, and you can debug calmly.',rbF('curl -I https://portfolio.vercel.app',[['a1b2c3d4e','Monday'],['f9e8d7c6b','tonight',1]],0,200,'Site healthy again')],
 ['Next morning you <b>fix forward</b>: reproduce the bug, add a test, fix it, and deploy a new version.',rbF('vercel --prod',[['a1b2c3d4e','Monday'],['f9e8d7c6b','tonight',1],['k7m1p2q3r','fixed']],2,200,'Fixed version deployed')]])}
${V.rules(V.rh('Rules'),V.ok('roll back first','Service comes back in seconds'),V.no('hotfix on the live server at 9pm','Rushed fixes under pressure often break more'),
 V.rh('On a VPS'),V.ok('keep the previous release','Without immutable deploys, you need the old version ready to switch back to'))}
${V.hook(`Restore first, debug second.`)}
`)}

${V.card(4,'After the fire','the five steps and a blameless postmortem',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Five steps in order: confirm, read logs, roll back, fix forward, learn">
<path class="ln" style="stroke-width:3" d="M42 50H378"/>
<circle class="bx-info" cx="42" cy="50" r="24"/><text class="t-b" x="42" y="56" text-anchor="middle">1</text><text class="t" x="42" y="98" text-anchor="middle">confirm</text>
<circle class="bx-info" cx="126" cy="50" r="24"/><text class="t-b" x="126" y="56" text-anchor="middle">2</text><text class="t" x="126" y="98" text-anchor="middle">logs</text>
<circle class="bx-ok" cx="210" cy="50" r="24"/><text class="t-b" x="210" y="56" text-anchor="middle">3</text><text class="t-b t-ok" x="210" y="98" text-anchor="middle">roll back</text>
<circle class="bx-info" cx="294" cy="50" r="24"/><text class="t-b" x="294" y="56" text-anchor="middle">4</text><text class="t" x="294" y="98" text-anchor="middle">fix forward</text>
<circle class="bx-info" cx="378" cy="50" r="24"/><text class="t-b" x="378" y="56" text-anchor="middle">5</text><text class="t" x="378" y="98" text-anchor="middle">learn</text>
<text class="t-s" x="210" y="136" text-anchor="middle" style="font-size:14px">users are safe after step 3</text>
</svg><figcaption>The calm order of an incident. Steps 1 to 3 happen in minutes; 4 and 5 happen once the pressure is off.</figcaption></figure>
${V.like(`<p>Air crash investigators. They do not hunt for someone to punish; they find out why it happened so it never happens again. That is why pilots report their own mistakes.</p>`)}
${V.rules(V.rh('A good postmortem has'),V.ok('a timeline','What happened, minute by minute'),V.ok('the root cause','Why it broke, not just what broke'),
 V.ok('actions','Concrete changes, like "add a test for the projects page"'),V.no('"Sam broke it"','Blame makes people hide mistakes, and hidden mistakes come back'))}
${V.build(`<ol><li><code>curl -I</code> the production site and see the 500.</li><li>Read the logs with <code>vercel logs</code> and the broken deployment's URL.</li><li><code>vercel rollback</code>.</li><li><code>curl -I</code> again and see 200.</li></ol>`)}
${V.hook(`Confirm, look, restore, fix, learn. Blame the system, not the person.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Users see errors at 9pm. First move? <i>Confirm with curl -I, then roll back.</i> 2. Why is <code>vercel rollback</code> so fast? <i>It rebuilds nothing; it points production at an older deployment.</i> 3. What should a postmortem never contain? <i>Blame on a person.</i></div>
`);

}
