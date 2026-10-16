/* testing: visual "Understand it" walkthroughs. */
(()=>{
/* C: dark code panel; cur = index (or list) of running line(s) */
const C=(x,y,w,lines,cur,o={})=>{const lh=o.lh||26,fs=o.fs||14,cu=[].concat(cur);
 let s='<rect class="bx-dark" x="'+x+'" y="'+y+'" width="'+w+'" height="'+(lines.length*lh+12)+'" rx="8"/>';
 lines.forEach((l,i)=>{const yy=y+lh*(i+1)-1,on=cu.includes(i);if(on)s+='<text class="t-a" x="'+(x+8)+'" y="'+yy+'" style="font-size:'+fs+'px">&#9654;</text>';
  s+='<text class="t-term'+(o.dim&&!on?' t-dim':'')+'" x="'+(x+26)+'" y="'+yy+'" style="font-size:'+fs+'px">'+l.replace(/^ +/,m=>'&#160;'.repeat(m.length))+'</text>'});return s};
const AR=(x1,x2,y,c)=>{const k=c===''?'':'-'+(c||'a');return '<path class="ln'+k+'" d="M'+x1+' '+y+'H'+(x2-10)+'"/><polygon class="ah'+k+'" points="'+(x2-12)+','+(y-6)+' '+(x2-12)+','+(y+6)+' '+x2+','+y+'"/>'};
/* B: a PASS / FAIL pill */
const B=(x,y,ok,t)=>'<rect class="'+(ok?'bx-ok':'bx-bad')+'" x="'+x+'" y="'+y+'" width="'+(t.length*9+44)+'" height="32" rx="16"/>'+V.ic(ok?'check':'cross',x+6,y+4,24,ok?'ic-ok':'ic-bad')+'<text class="t-b '+(ok?'t-ok':'t-bad')+'" x="'+(x+36)+'" y="'+(y+22)+'">'+t+'</text>';
/* box: a labelled value box */
const BX=(x,y,w,label,val,cls)=>'<text class="t-s" x="'+x+'" y="'+(y-6)+'">'+label+'</text><rect class="'+(cls||'bx')+'" x="'+x+'" y="'+y+'" width="'+w+'" height="40" rx="6"/><text class="t-m" x="'+(x+w/2)+'" y="'+(y+26)+'" text-anchor="middle" style="font-size:17px">'+val+'</text>';

/* ---------- t1 ---------- */
const ADD=(op)=>['function add(a, b) {','  return a '+op+' b;','}',"expect(add(2, 3)).toBe(5);"];
const run=(cur,op,a,res,o)=>'<svg viewBox="0 0 420 210" role="img" aria-label="'+o.al+'">'+C(6,6,408,ADD(op),cur,{dim:true})+BX(10,150,110,'actual',a,o.ac)+BX(160,150,110,'expected','5','bx')+(res?B(290,154,res==='ok',res==='ok'?'PASS':'FAIL'):'')+(o.extra||'')+'</svg>';
const PY=(on,o={})=>{const L=[[150,20,270,20,300,70,120,70,'E2E','few, slow',3],[120,74,300,74,330,124,90,124,'integration','some',2],[90,128,330,128,360,178,60,178,'unit','many, fast',1]];
 let s='<svg viewBox="0 0 420 200" role="img" aria-label="'+(o.al||'Testing pyramid')+'">';
 L.forEach(l=>{const vis=on>=l[10],inv=o.inv;s+='<polygon class="'+(vis?(l[10]===on&&!inv?'bx-hl':'bx-info'):'bx')+'" points="'+l[0]+','+l[1]+' '+l[2]+','+l[3]+' '+l[4]+','+l[5]+' '+l[6]+','+l[7]+'"/><text class="t-b'+(vis?'':' t-dim')+'" x="210" y="'+(l[1]+24)+'" text-anchor="middle">'+l[8]+'</text><text class="t-s'+(vis?'':' t-dim')+'" x="210" y="'+(l[1]+42)+'" text-anchor="middle">'+l[9]+'</text>'});
 if(o.side)s+='<text class="t-s" x="10" y="60">slower,</text><text class="t-s" x="10" y="76">costlier</text><text class="t-s" x="410" y="150" text-anchor="end">faster,</text><text class="t-s" x="410" y="166" text-anchor="end">cheaper</text>';
 return s+(o.extra||'')+'</svg>'};
const CONE='<svg viewBox="0 0 420 200" role="img" aria-label="The upside-down ice cream cone: mostly slow end-to-end tests"><polygon class="bx-bad" points="60,20 360,20 330,70 90,70"/><text class="t-b" x="210" y="44" text-anchor="middle">E2E</text><text class="t-s" x="210" y="62" text-anchor="middle">lots: slow, flaky</text><polygon class="bx-warn" points="90,74 330,74 300,124 120,124"/><text class="t-b" x="210" y="98" text-anchor="middle">integration</text><polygon class="bx" points="120,128 300,128 270,178 150,178"/><text class="t-b" x="210" y="152" text-anchor="middle">unit</text><text class="t-s" x="210" y="170" text-anchor="middle">hardly any</text>'+V.ic('warn',368,90,44,'ic-bad')+'</svg>';

explain('t1',`
<p>Every time you change code, you risk breaking something that used to work. A <b>test</b> checks it for you in a fraction of a second, every single time, so you can change code without fear.</p>

${V.card(1,'A test is code that checks code','a robot with a checklist',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A robot feeds 2 and 3 into the add machine, gets 5, and ticks the checklist">
${V.ic('robot',8,30,80,'ic-a')}<text class="t-s" x="48" y="132" text-anchor="middle">test runner</text>
${AR(94,140,70)}<text class="t-m" x="117" y="58" text-anchor="middle" style="font-size:14px">2, 3</text>
<rect class="bx-info" x="144" y="20" width="120" height="100" rx="10"/>${V.ic('gear',178,28,52,'ic-info')}<text class="t-m" x="204" y="106" text-anchor="middle">add()</text>
${AR(268,312,70,'ok')}<text class="t-m t-ok" x="290" y="58" text-anchor="middle" style="font-size:18px">5</text>
<rect class="bx-ok" x="316" y="20" width="98" height="100" rx="10"/>${V.ic('check',340,30,50,'ic-ok')}<text class="t-s" x="365" y="106" text-anchor="middle">5 = 5 ✓</text>
<text class="t" x="210" y="156" text-anchor="middle">give it an input, check the output</text>
</svg><figcaption>A test calls your code with a known input and checks the answer against the one you expect.</figcaption></figure>
${V.like(`<p>A smoke alarm. You don't stand in the kitchen sniffing all day; the alarm checks constantly and shouts the moment something is wrong. Tests are smoke alarms for your code.</p>`)}
${V.why(`<p>Clicking through an app by hand after every change is slow, boring and easy to get wrong. In the 1990s Kent Beck and others built small tools (SUnit, then JUnit) that let programmers write checks as code and run hundreds in seconds. Today's tools, like Jest and Vitest for JavaScript, use the same idea.</p>`)}
${V.anat([[1,'test'],'(',[2,"'adds two numbers'"],', ',[3,'() =&gt; {'],'\n  ',[4,'expect(add(2, 3))'],[5,'.toBe(5)'],';\n});'],[
 '<b>test</b> registers one check with the test runner.',
 '<b>Name.</b> Says what behaviour is being checked. It appears in the report.',
 '<b>The body,</b> an arrow function the runner calls.',
 '<b>expect(actual)</b>: the value your code really produced.',
 '<b>Matcher.</b> <code>toBe(5)</code> says what it should be. If they differ, the test fails.'])}
<p><b>Watch a test run, then catch a bug.</b></p>
${V.steps([
 ['The runner reaches the expect line and calls <b>add(2, 3)</b>.',run(3,'+','?',null,{al:'Calling add'})],
 ['Inside add, <b>a + b</b> gives 5. That is the actual value.',run(1,'+','5',null,{al:'add returns 5',ac:'bx-info'})],
 ['<b>toBe(5)</b> compares actual 5 with expected 5. They match: <b>PASS</b>.',run(3,'+','5','ok',{al:'Test passes',ac:'bx-ok'})],
 ['Someone changes + to - by mistake. Now add(2, 3) gives -1, and the test goes red: <b>Expected: 5, Received: -1</b>. Bug caught before any user saw it.',run(1,'-','-1','bad',{al:'Test fails: expected 5 received -1',ac:'bx-bad'})]])}
${V.rules(V.rh('Rules'),
 V.ok("test('adds two numbers', …)",'Every test has a name and a body'),V.no('expect(add(2, 3))','No matcher: nothing is checked'),
 V.ok('.toBe(5)','For numbers, text and true/false'),V.ok('watch it fail once','A test you have never seen fail might not test anything'))}
${V.hook(`Input in, expect the output. Green means safe, red means caught.`)}
`)}

${V.card(2,'The testing pyramid','lots of small tests, a few big ones',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A car factory: test each part, test the engine on a bench, then take a test drive">
<rect class="bx-info" x="6" y="10" width="130" height="110" rx="10"/>${V.ic('chip',47,20,48,'ic-info')}<text class="t-b" x="71" y="92" text-anchor="middle">each part</text><text class="t-s" x="71" y="110" text-anchor="middle">unit</text>
<rect class="bx-a" x="145" y="10" width="130" height="110" rx="10"/>${V.ic('machine',186,20,48,'ic-a')}<text class="t-b" x="210" y="92" text-anchor="middle">engine</text><text class="t-s" x="210" y="110" text-anchor="middle">integration</text>
<rect class="bx-ok" x="284" y="10" width="130" height="110" rx="10"/>${V.ic('truck',325,20,48,'ic-ok')}<text class="t-b" x="349" y="92" text-anchor="middle">test drive</text><text class="t-s" x="349" y="110" text-anchor="middle">end-to-end</text>
<text class="t" x="210" y="148" text-anchor="middle">thousands of parts, dozens of engines, a few drives</text>
</svg><figcaption>A car factory checks every bolt, then tests engines on a bench, then takes a few cars for a real drive.</figcaption></figure>
${V.like(`<p>A car factory. Checking each bolt is quick and cheap, so they check thousands (<b>unit tests</b>: one function). Bolting the engine together and running it on a bench checks parts working together (<b>integration tests</b>). A real test drive checks everything at once but takes ages, so only a few cars get one (<b>end-to-end tests</b>: the whole app in a browser).</p>`)}
${V.why(`<p>Teams that tested mainly through the browser ended up with slow, fragile test suites. Mike Cohn drew the pyramid in 2009 to show a better balance: many fast tests at the bottom, few slow ones at the top.</p>`)}
${V.steps([
 ['The base: <b>unit tests</b>. Each checks one function in milliseconds, so you can have thousands.',PY(1,{al:'Unit layer highlighted'})],
 ['The middle: <b>integration tests</b>. Pieces together, such as your code and a real database. Slower, so fewer.',PY(2,{al:'Integration layer highlighted'})],
 ['The top: <b>end-to-end tests</b>. A robot clicks through the real app in a browser. Slow, so keep a few for the journeys that matter most: sign-up, login, checkout.',PY(3,{al:'E2E layer highlighted',side:true})],
 ['The mistake to avoid: the upside-down <b>ice cream cone</b>. Mostly browser tests means a suite that takes an hour and fails at random.',CONE]])}
${V.rules(V.rh('Conventions'),
 V.ok('many unit tests','Fast and precise: they point straight at the broken function'),V.ok('a few E2E tests','Only for the most important user journeys'),
 V.no('testing everything through the browser','Slow, flaky, and hard to see what broke'))}
${V.hook(`Wide at the bottom, narrow at the top: many small, some medium, few big.`)}
`)}

${V.card(3,'What makes a good test','check behaviour, not wiring',`
${V.like(`<p>Testing a vending machine: put in a coin, press B4, check that crisps come out. You don't open the panel to check which gear turned. If the engineers redesign the gears, your test still works.</p>`)}
${V.rules(V.rh('Rules for good tests'),
 V.ok('expect(add(-2, -3)).toBe(-5)','Checks what comes out for an input: behaviour'),V.no('checking private variables','Breaks whenever the inside changes, even when nothing is wrong'),
 V.ok('one behaviour per test','When it fails, the name tells you what broke'),V.ok('fast and repeatable','Same result every run, in milliseconds'),
 V.rh('Naming'),V.ok("'handles negative numbers'",'Name says the behaviour'),V.no("'test2'",'Tells you nothing when it fails'))}
${V.build(`<ol><li>Run the starter test and see it pass.</li><li>Break <code>add</code> on purpose (make it subtract) and watch it go red.</li><li>Fix it, then add a second test for negative numbers, such as <code>add(-2, -3)</code>.</li><li>Run again: both green.</li></ol>`)}
${V.hook(`Test what it does, not how it does it.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which kind of test should you have the most of? <i>Unit tests.</i> 2. <code>expect(add(1, 1)).toBe(3)</code>: pass or fail? <i>Fail: received 2.</i> 3. Why watch a new test fail once? <i>To prove it can actually catch a bug.</i></div>
`);

/* ---------- t2 ---------- */
const AAA=["it('adds price × qty', () =&gt; {","  const items = [{ price: 10, qty: 2 },","                 { price: 5, qty: 1 }];","  const total = subtotal(items);","  expect(total).toBe(25);","});"];
const aaa=(cur,o)=>'<svg viewBox="0 0 420 246" role="img" aria-label="'+o.al+'">'+C(6,6,408,AAA,cur,{dim:true})+'<text class="t-b t-a" x="12" y="194">'+o.tag+'</text>'+(o.body||'')+'</svg>';
const SHIP=(op)=>['function shipping(total) {','  return total '+op+' 50 ? 0 : 4.99;','}'];
const mut=(op,tests,o)=>{let s='<svg viewBox="0 0 420 220" role="img" aria-label="'+o.al+'">'+C(6,6,408,SHIP(op),o.cur!=null?o.cur:-1,{})+(o.mark?'<rect class="bx-warn" x="186" y="36" width="34" height="22" rx="4"/><text class="t-term t-bad" x="160" y="51" style="font-size:14px"> </text>':'');
 tests.forEach((t,i)=>{s+='<text class="t-m" x="10" y="'+(124+i*38)+'" style="font-size:14px">'+t[0]+'</text>'+B(276,104+i*38,t[1],t[1]?'pass':'fail')});return s+(o.msg?'<text class="t-b '+o.mc+'" x="10" y="212">'+o.msg+'</text>':'')+'</svg>'};

explain('t2',`
<p>Writing tests that pass is easy. Writing tests that <b>catch bugs</b> is the real skill. It comes down to a tidy shape for each test and choosing the right inputs.</p>

${V.card(1,'Arrange, Act, Assert','set up, do it, check it',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Three panels: Arrange the items, Act by calling subtotal, Assert the total is 25">
<rect class="bx-info" x="6" y="10" width="128" height="110" rx="10"/>${V.ic('list',46,18,48,'ic-info')}<text class="t-b" x="70" y="88" text-anchor="middle">Arrange</text><text class="t-s" x="70" y="108" text-anchor="middle">make the inputs</text>
${AR(136,150,65)}
<rect class="bx-a" x="152" y="10" width="116" height="110" rx="10"/>${V.ic('gear',186,18,48,'ic-a')}<text class="t-b" x="210" y="88" text-anchor="middle">Act</text><text class="t-s" x="210" y="108" text-anchor="middle">call the code</text>
${AR(270,284,65)}
<rect class="bx-ok" x="286" y="10" width="128" height="110" rx="10"/>${V.ic('check',326,18,48,'ic-ok')}<text class="t-b" x="350" y="88" text-anchor="middle">Assert</text><text class="t-s" x="350" y="108" text-anchor="middle">check the result</text>
<text class="t-s" x="210" y="144" text-anchor="middle">every test, the same three steps</text>
</svg><figcaption>Arrange-Act-Assert: the shape that makes any test easy to read.</figcaption></figure>
${V.like(`<p>A science experiment. Set up the equipment (arrange), do the experiment (act), then write down whether the result matches your prediction (assert).</p>`)}
${V.why(`<p>A test is read far more often than it is written, usually when it has just failed and someone is in a hurry. Putting every test in the same three-part shape means anyone can see at a glance what was set up, what was done and what was expected.</p>`)}
${V.steps([
 ['<b>Arrange.</b> Build the inputs: a cart with 2 items at 10 and 1 item at 5.',aaa([1,2],{al:'Arrange the cart',tag:'ARRANGE',body:'<rect class="bx-info" x="12" y="202" width="180" height="36" rx="6"/><text class="t-m" x="102" y="226" text-anchor="middle">10 × 2</text><rect class="bx-info" x="212" y="202" width="180" height="36" rx="6"/><text class="t-m" x="302" y="226" text-anchor="middle">5 × 1</text>'})],
 ['<b>Act.</b> Call the code once. subtotal works out 10 × 2 + 5 × 1 = <b>25</b>.',aaa(3,{al:'Act: subtotal returns 25',tag:'ACT',body:'<text class="t-m" x="12" y="226" style="font-size:16px">20 + 5 = </text><rect class="bx-info" x="112" y="204" width="80" height="34" rx="6"/><text class="t-m" x="152" y="227" text-anchor="middle" style="font-size:17px">25</text><text class="t-s" x="206" y="226">stored in total</text>'})],
 ['<b>Assert.</b> Check the result: total is 25, expected 25. Green.',aaa(4,{al:'Assert passes',tag:'ASSERT',body:'<text class="t-m" x="12" y="226" style="font-size:16px">25 === 25</text>'+B(150,204,true,'PASS')})]])}
${V.rules(V.rh('Conventions'),
 V.ok("describe('subtotal', …)",'Group tests for one function'),V.ok("it('is 0 for an empty cart', …)",'it + a sentence about behaviour'),
 V.ok('one Act per test','Call the code once, then assert'),V.no('a test with 15 expects','When it fails you cannot tell which idea broke'))}
${V.hook(`Arrange, Act, Assert: set the table, cook, taste.`)}
`)}

${V.card(2,'Choosing what to test','normal, edge, error, boundary',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="A number line around 50. 49.99 costs 4.99, 50 ships free">
<path class="ln" style="stroke-width:3" d="M20 70H400"/>
<path class="ln-d" d="M240 24V112"/><text class="t-b t-a" x="240" y="18" text-anchor="middle">rule: total &gt;= 50</text>
<circle class="dot" cx="180" cy="70" r="8"/><text class="t-m" x="180" y="100" text-anchor="middle">49.99</text><text class="t-s" x="180" y="122" text-anchor="middle">pays 4.99</text>
<circle class="dot-ok" cx="240" cy="70" r="8"/><text class="t-m" x="262" y="100">50</text><text class="t-s" x="262" y="122">free</text>
<circle class="dot-m" cx="50" cy="70" r="7"/><text class="t-m t-dim" x="50" y="100" text-anchor="middle">10</text><text class="t-s" x="50" y="122" text-anchor="middle">too far</text>
<circle class="dot-m" cx="370" cy="70" r="7"/><text class="t-m t-dim" x="370" y="100" text-anchor="middle">100</text><text class="t-s" x="370" y="122" text-anchor="middle">too far</text>
<text class="t" x="210" y="146" text-anchor="middle">bugs hide right at the edge</text>
</svg><figcaption>Test both sides of a boundary. Off-by-one bugs, like &gt; written instead of &gt;=, live exactly there.</figcaption></figure>
${V.like(`<p>Testing a fairground ride's height sign "you must be 120 cm". You check a child of 119 cm and one of exactly 120 cm. A 150 cm adult tells you nothing about whether the sign is in the right place.</p>`)}
${V.anat([[1,'expect'],'(',[2,"() =&gt; applyCoupon(80, 'BOGUS')"],')',[3,'.toThrow'],'(',[4,"'Invalid coupon'"],');'],[
 '<b>expect</b> as usual.',
 '<b>Wrapped in a function.</b> The runner calls it for you and catches the error.',
 '<b>toThrow</b> passes only if an error is thrown.',
 '<b>Optional:</b> text the error message must contain.'])}
${V.rules(V.rh('Pick these cases'),
 V.ok('happy path','The normal case: SAVE10 on 80 gives 72'),V.ok('edge cases','Empty cart, zero, one item'),
 V.ok('error cases','Bad input throws a clear error'),V.ok('boundaries','49.99 and 50 for a "from 50" rule'),
 V.rh('Matcher rules'),V.no("expect(applyCoupon(80, 'BOGUS')).toThrow()",'Not wrapped: the error escapes and crashes the test'),
 V.ok('toEqual([1, 2])','Compares arrays and objects by content; toBe would fail'),V.ok('toBeCloseTo(0.3)','For decimals: 0.1 + 0.2 is not exactly 0.3'))}
${V.hook(`Happy, edge, error, boundary: test both sides of every line.`)}
`)}

${V.card(3,'Mutation testing','do your tests notice a bug?',`
${V.like(`<p>A fire drill with a fake fire. You light a harmless smoke candle to check the alarms really go off. Mutation testing plants a small fake bug to check your tests really go red.</p>`)}
${V.why(`<p>A suite can be 100% green and still miss bugs. Mutation tools (StrykerJS for JavaScript, for example) change your code in tiny ways, like <code>&gt;=</code> to <code>&gt;</code>, and rerun your tests. If no test fails, the bug "survived" and your tests have a gap.</p>`)}
${V.steps([
 ['The real code: free shipping from 50. Two weak tests, at 10 and 100, both pass.',mut('&gt;=',[['shipping(10) → 4.99',true],['shipping(100) → 0',true]],{al:'Original code, both tests pass'})],
 ['The tool plants a bug: <b>&gt;=</b> becomes <b>&gt;</b>. Both tests still pass. The mutant <b>survived</b>: these tests would never notice.',mut('&gt;',[['shipping(10) → 4.99',true],['shipping(100) → 0',true]],{al:'Mutant survives',cur:1,msg:'Mutant survived: your tests missed a bug',mc:'t-bad'})],
 ['Add a boundary test: <b>shipping(50)</b> should be 0. With the planted bug it returns 4.99, so the test fails. The mutant is <b>killed</b>.',mut('&gt;',[['shipping(49.99) → 4.99',true],['shipping(50) → 0',false]],{al:'Boundary test kills the mutant',cur:1,msg:'Mutant killed: your tests catch this bug',mc:'t-ok'})]])}
${V.build(`<ol><li>In <code>describe('subtotal')</code>, test a normal cart and an empty one.</li><li>Test that SAVE10 takes 10% off and that an unknown code throws.</li><li>Test shipping at 49.99 and at 50.</li><li>Ask yourself: if <code>&gt;=</code> became <code>&gt;</code>, which test would fail?</li></ol>`)}
${V.hook(`A good test goes red when the code goes wrong.`)}
`)}

<div class="try"><b>Try it in your head</b>1. A rule says "under 18 pays half". Which two ages do you test? <i>17 and 18.</i> 2. Why wrap the call in <code>() =&gt;</code> for toThrow? <i>So the runner can catch the error itself.</i> 3. A mutant survives. What does that mean? <i>A small bug went unnoticed: add a test.</i></div>
`);

/* ---------- t3 ---------- */
const SU=['await signUp(email, { db, mailer });','  … mailer.send(email, \'Welcome!\');'];
const mk=(k,o)=>{let s='<svg viewBox="0 0 420 220" role="img" aria-label="'+o.al+'">'+C(6,6,408,SU,o.cur,{dim:true})+V.ic('gear',20,96,56,'ic-a')+'<text class="t-s" x="48" y="168" text-anchor="middle">signUp</text>'+AR(84,150,124);
 if(k===0)s+='<rect class="bx-bad" x="152" y="90" width="120" height="70" rx="10"/>'+V.ic('mail',166,98,40,'ic-bad')+'<text class="t-b" x="236" y="122">real</text><text class="t-s" x="212" y="150" text-anchor="middle">mailer</text>'+AR(276,330,124,'')+V.ic('globe',336,92,64,'ic-bad')+'<text class="t-b t-bad" x="210" y="204" text-anchor="middle">A real email to a real inbox, every test run</text>';
 else{s+='<rect class="bx-ok" x="152" y="84" width="120" height="82" rx="10"/>'+V.ic('robot',166,92,40,'ic-ok')+'<text class="t-b" x="236" y="118">fake</text><text class="t-m" x="212" y="154" text-anchor="middle" style="font-size:14px">vi.fn()</text>';
  s+='<rect class="bx'+(k>=2?'-info':'')+'" x="290" y="84" width="124" height="82" rx="8"/><text class="t-s" x="352" y="104" text-anchor="middle">call log</text>'+(k>=2?'<text class="t-m" x="300" y="130" style="font-size:14px">send(</text><text class="t-m" x="300" y="152" style="font-size:14px">\'ada@…\', …)</text>':'<text class="t-s" x="352" y="138" text-anchor="middle">(empty)</text>');
  if(k===3)s+=B(110,180,true,'toHaveBeenCalledWith ✓')}
 return s+'</svg>'};
const FX=(k,o)=>{const tl=['beforeEach','test 1','beforeEach','test 2'];let s='<svg viewBox="0 0 420 190" role="img" aria-label="'+o.al+'">';
 tl.forEach((t,i)=>{const x=6+i*104;s+='<rect class="'+(i===k?'bx-hl':i<k?'bx-ok':'bx')+'" x="'+x+'" y="10" width="96" height="36" rx="8"/><text class="t-b'+(i>k?' t-dim':'')+'" x="'+(x+48)+'" y="33" text-anchor="middle" style="font-size:14px">'+t+'</text>'});
 return s+'<text class="t-s" x="10" y="80">mailer.send, call count</text><rect class="'+o.mc+'" x="10" y="90" width="150" height="70" rx="10"/><text class="t-m" x="85" y="136" text-anchor="middle" style="font-size:30px">'+o.n+'</text><text class="t" x="180" y="112">'+o.l1+'</text><text class="t" x="180" y="138">'+o.l2+'</text></svg>'};

explain('t3',`
<p>You don't want your tests sending real emails, charging real cards or calling a weather service that might be down. Instead you hand the code a stand-in that behaves the way you choose and remembers what it was asked to do.</p>

${V.card(1,'Test doubles','stand-ins for the real thing',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="An actor and a stunt double side by side; the stunt double takes the dangerous scene">
${V.ic('person',30,14,80,'ic-a')}<text class="t-b" x="70" y="118" text-anchor="middle">real mailer</text><text class="t-s" x="70" y="138" text-anchor="middle">slow, sends real mail</text>
${AR(140,270,60,'ok')}<text class="t-s" x="205" y="48" text-anchor="middle">swap in for tests</text>
${V.ic('robot',300,14,80,'ic-ok')}<text class="t-b" x="340" y="118" text-anchor="middle">mock mailer</text><text class="t-s" x="340" y="138" text-anchor="middle">instant, records calls</text>
</svg><figcaption>A test double is a stand-in for a real dependency, like a stunt double for an actor.</figcaption></figure>
${V.like(`<p>A film's stunt double. The real actor doesn't jump off the building; a double who looks the part does it safely, and the director checks the jump happened. Crash-test dummies do the same job for cars.</p>`)}
${V.why(`<p>Real email, payment and web services are slow, can cost money, and give different answers on different days. A test must be fast and give the same result every time, so the outside world is swapped for doubles. The kinds have names: a <b>stub</b> returns a ready-made answer, a <b>mock</b> also records how it was called, a <b>fake</b> is a simple working version, and a <b>fixture</b> is the test data you set up.</p>`)}
<p><b>Watch a mock stand in.</b></p>
${V.steps([
 ['With the real mailer, every test run sends a real "Welcome!" email. Slow, and somebody\'s inbox fills up.',mk(0,{al:'Real mailer sends a real email',cur:1})],
 ['In the test, the mailer is swapped for a mock made with <b>vi.fn()</b>. It does nothing, very quickly, and keeps a log of every call.',mk(1,{al:'Mock mailer with an empty call log',cur:-1})],
 ['signUp runs and calls mailer.send. The mock writes the call and its arguments in its log.',mk(2,{al:'Call recorded in the log',cur:1})],
 ['The test asks the mock: were you called with ada@example.com and "Welcome!"? Yes: <b>pass</b>. No email ever left the building.',mk(3,{al:'toHaveBeenCalledWith passes',cur:-1})]])}
${V.hook(`Mock what you don't control: email, payments, other people's APIs.`)}
`)}

${V.card(2,'vi.fn()','a mock function you program',`
${V.anat([[1,'vi.fn()'],[2,'.mockResolvedValue(true)']],[
 '<b>vi.fn()</b> (Vitest; <code>jest.fn()</code> in Jest) makes an empty function that records every call.',
 '<b>mockResolvedValue</b> makes it return a promise that resolves to this value, like a real async call would. Use <code>mockReturnValue</code> for normal functions.'])}
${V.anat([[1,'expect(mailer.send)'],[2,'.toHaveBeenCalledWith'],'(',[3,"'ada@example.com', 'Welcome!'"],');'],[
 '<b>The mock</b> you want to ask about.','<b>Was it called with…</b>','<b>…exactly these arguments?</b>'])}
${V.rules(V.rh('Rules'),
 V.ok('expect(db.createUser).not.toHaveBeenCalled()','Prove something did NOT happen'),V.ok('toHaveBeenCalledTimes(1)','Count the calls'),
 V.ok("await expect(p).rejects.toThrow('Invalid email')",'For async errors, await the expect'),V.no("expect(p).rejects.toThrow(…)  (no await)",'The test can finish before the check runs'),
 V.no('mocking add() or Math.max','Mock slow or outside things, not simple code'))}
${V.hook(`vi.fn() records, mockResolvedValue answers, toHaveBeenCalledWith checks.`)}
`)}

${V.card(3,'Injection and fixtures','plug in, start fresh',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="signUp has two sockets, db and mailer; real or fake plugs fit">
<rect class="bx-a" x="100" y="20" width="120" height="110" rx="12"/><text class="t-m" x="160" y="80" text-anchor="middle">signUp</text>
<rect class="bx" x="70" y="40" width="30" height="24" rx="4"/><text class="t-s" x="62" y="57" text-anchor="end">db</text>
<rect class="bx" x="70" y="86" width="30" height="24" rx="4"/><text class="t-s" x="62" y="103" text-anchor="end">mailer</text>
<text class="t-b t-ok" x="236" y="56">tests: plug in fakes</text><text class="t-b t-a" x="236" y="98">app: plug in real</text>
</svg><figcaption>signUp(email, { db, mailer }) receives its helpers as arguments, so a test can plug in fakes.</figcaption></figure>
${V.like(`<p>A games console with removable controllers. The console doesn't care whether you plug in the official controller or a test one. Passing helpers in as arguments, called <b>dependency injection</b>, gives your code sockets instead of hard-wired cables.</p>`)}
${V.steps([
 ['<b>beforeEach</b> runs before every test and builds brand-new mocks. The call count starts at 0.',FX(0,{al:'beforeEach builds fresh mocks',mc:'bx-info',n:'0',l1:'fresh mocks',l2:'built for test 1'})],
 ['Test 1 signs Ada up. mailer.send is called once.',FX(1,{al:'Test 1 calls send once',mc:'bx-warn',n:'1',l1:'test 1 used the mock',l2:'count is now 1'})],
 ['beforeEach runs again and throws the old mocks away. Fresh mocks, count back to 0.',FX(2,{al:'Fresh mocks again',mc:'bx-info',n:'0',l1:'old mocks thrown away',l2:'nothing leaks across'})],
 ['Test 2 checks an invalid email is rejected and send was <b>never</b> called. It passes, because no leftover count from test 1 is around.',FX(3,{al:'Test 2 sees zero calls',mc:'bx-ok',n:'0',l1:'not.toHaveBeenCalled()',l2:'passes'})]])}
${V.rules(V.rh('Conventions'),V.ok('let db, mailer; beforeEach(() =&gt; { … })','Fresh fixtures for every test'),
 V.no('one shared mock for the whole file','Calls from one test leak into the next'),V.no('mocking your own database queries','Use a real test database instead (next lesson)'))}
${V.build(`<ol><li>In <code>beforeEach</code>, make <code>db</code> and <code>mailer</code> objects whose methods are <code>vi.fn().mockResolvedValue(…)</code>.</li><li>Test that signUp returns the user and calls <code>mailer.send</code> with the email and 'Welcome!'.</li><li>Test that 'nope' rejects with 'Invalid email' and <code>db.createUser</code> is never called.</li><li>Give getWeather a fake fetch: one that succeeds, one with <code>ok: false</code>.</li></ol>`)}
${V.hook(`Inject the helpers, fake the outside world, start fresh every test.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which should you mock: a payment API or an add() function? <i>The payment API.</i> 2. How do you check an email was not sent? <i><code>expect(mailer.send).not.toHaveBeenCalled()</code>.</i> 3. Why build mocks in beforeEach? <i>So no test sees another test's calls.</i></div>
`);

/* ---------- t4 ---------- */
const DB=(k,o)=>{const tl=['test A','test B'];let s='<svg viewBox="0 0 420 206" role="img" aria-label="'+o.al+'">';
 if(o.reset)s+='<rect class="'+(o.rk?'bx-hl':'bx-ok')+'" x="6" y="10" width="130" height="34" rx="8"/><text class="t-b" x="71" y="32" text-anchor="middle" style="font-size:14px">beforeEach</text>';
 tl.forEach((t,i)=>{const x=(o.reset?146:6)+i*136;s+='<rect class="'+(i===k?'bx-hl':i<k?'bx-ok':'bx')+'" x="'+x+'" y="10" width="126" height="34" rx="8"/><text class="t-b" x="'+(x+63)+'" y="32" text-anchor="middle" style="font-size:14px">'+t+'</text>'});
 s+='<text class="t-s" x="10" y="72">users table</text><rect class="bx" x="10" y="80" width="260" height="'+(26*(o.rows.length+1))+'" rx="4"/><text class="t-b" x="18" y="98" style="font-size:14px">email</text><path class="ln" d="M10 106H270"/>';
 o.rows.forEach((r,i)=>{s+='<text class="t'+(r[1]?' '+r[1]:'')+'" x="18" y="'+(124+i*26)+'" style="font-size:14px">'+r[0]+'</text>'});
 return s+(o.res?B(290,90,o.res==='ok',o.res==='ok'?'pass':'fail'):'')+(o.msg?'<text class="t-b '+o.mc+'" x="10" y="198">'+o.msg+'</text>':'')+'</svg>'};

const RT=(code,sql,rows,res,o)=>{let s='<svg viewBox="0 0 420 210" role="img" aria-label="'+o.al+'">'+C(6,6,408,[code],0,{})+'<text class="t-s" x="10" y="64">SQL sent to the real database</text><text class="t-m t-a" x="10" y="86" style="font-size:14px">'+sql+'</text><text class="t-s" x="10" y="114">users table</text><rect class="bx" x="10" y="122" width="250" height="'+(26*(rows.length+1))+'" rx="4"/><text class="t-b" x="18" y="140" style="font-size:14px">email, name</text><path class="ln" d="M10 148H260"/>';
 rows.forEach((r,i)=>{s+='<text class="t'+(o.hl===i?' t-ok':'')+'" x="18" y="'+(166+i*26)+'" style="font-size:14px">'+r+'</text>'});
 return s+'<text class="t-s" x="280" y="140">returns</text><rect class="'+(o.rc||'bx-ok')+'" x="280" y="148" width="134" height="40" rx="8"/><text class="t-m" x="347" y="174" text-anchor="middle" style="font-size:15px">'+res+'</text></svg>'};

explain('t4',`
<p>Mocks are fast, but they can lie: a fake database never complains about a typo in your SQL or a missing rule. <b>Integration tests</b> run your code against the real thing, so those mistakes show up in the test and not in front of users.</p>

${V.card(1,'What mocks cannot catch','a rehearsal on the real stage',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Left: the mock database says OK to a duplicate email. Right: the real database refuses it">
<rect class="bx-warn" x="6" y="10" width="196" height="150" rx="12"/>${V.ic('robot',20,24,52,'ic-warn')}<text class="t-b" x="84" y="56">mocked db</text>
<text class="t-m" x="20" y="104" style="font-size:14px">createUser(ada)</text><text class="t-m" x="20" y="126" style="font-size:14px">createUser(ada)</text><text class="t-b t-ok" x="20" y="150">"OK!" (wrong)</text>
<rect class="bx-ok" x="218" y="10" width="196" height="150" rx="12"/>${V.ic('db',232,24,52,'ic-info')}<text class="t-b" x="296" y="56">real SQLite</text>
<text class="t-m" x="232" y="104" style="font-size:14px">createUser(ada)</text><text class="t-m" x="232" y="126" style="font-size:14px">createUser(ada)</text><text class="t-b t-bad" x="232" y="150">UNIQUE failed</text>
</svg><figcaption>The mock happily accepts a duplicate email. Only the real database knows about its UNIQUE rule.</figcaption></figure>
${V.like(`<p>Rehearsing a play with cardboard props in a classroom, versus a dress rehearsal on the real stage. The classroom is quicker, but only the stage shows you the door that sticks and the steps that are too steep.</p>`)}
${V.why(`<p>Many bugs live <i>between</i> pieces: wrong SQL, a missing constraint, a column with a different name. Unit tests with mocks skip exactly that join. Running Postgres or SQLite inside tests used to be painful; today a throwaway database in Docker (or a tool like Testcontainers) starts in seconds.</p>`)}
${V.hook(`Mocks check your logic. Integration tests check your assumptions.`)}
`)}

${V.card(2,'Reset before every test','a clean table each time',`
${V.like(`<p>Wiping the whiteboard before each lesson. If you don't, the next teacher's sums get mixed up with the last teacher's leftovers.</p>`)}
${V.anat([[1,'beforeEach'],'(() =&gt; {\n  ',[2,"db.run('DELETE FROM users')"],';\n});'],[
 '<b>beforeEach</b> runs before every single test.',
 '<b>Reset</b> to a known state. Another common way: run each test inside a transaction and roll it back.'])}
${V.steps([
 ['<b>No reset.</b> Test A creates Ada and checks she can be found. Pass.',DB(0,{al:'Test A passes',rows:[['ada@example.com']],res:'ok'})],
 ['Test B also creates Ada, but Ada from test A is still there. UNIQUE fails and test B goes red, even though the code is fine.',DB(1,{al:'Test B fails because of leftover data',rows:[['ada@example.com','t-warn'],['ada@example.com','t-bad']],res:'bad',msg:'Leftover from test A: tests depend on each other',mc:'t-bad'})],
 ['<b>Add beforeEach.</b> Before test A, the table is emptied.',DB(-1,{al:'beforeEach empties the table',reset:true,rk:true,rows:[['(empty)','t-dim']]})],
 ['Before test B it is emptied again, so test B starts clean and passes. Now the tests pass in any order.',DB(1,{al:'Test B passes on a clean table',reset:true,rows:[['ada@example.com']],res:'ok',msg:'Each test starts from the same known state',mc:'t-ok'})]])}
${V.rules(V.rh('Rules'),
 V.ok("beforeEach(() =&gt; db.run('DELETE FROM users'))",'Known state before every test'),V.no('test B relies on rows from test A','Passes alone, fails together, or the reverse'),
 V.no('pointing tests at the real production database','Tests delete data. Always a separate test database'))}
${V.hook(`Wipe the board before every lesson: no leftovers, no surprises.`)}
`)}

${V.card(3,'Test the database\'s rules','constraints and order',`
${V.anat([[1,'expect'],'(',[2,"() =&gt; createUser(db, { email: 'ada@example.com', name: 'Ada 2' })"],')\n  ',[3,".toThrow('UNIQUE')"],';'],[
 '<b>expect</b> as usual.','<b>Wrapped</b> so the runner can catch the error.','<b>The real database\'s error</b> must mention UNIQUE.'])}
<p><b>Watch the real queries run.</b> Nothing is faked: the SQL really reaches SQLite.</p>
${V.steps([
 ["<b>createUser</b> sends a real INSERT. A real row appears in the table.",RT("createUser(db, { email: 'ada@…', … })","INSERT INTO users (email, name) VALUES (?, ?)",['ada@example.com, Ada'],'{ id: 1, … }',{al:'Insert creates a real row',hl:0})],
 ["<b>findByEmail</b> sends a real SELECT and gets Ada back. If the SQL had a typo, this is where the test would go red.",RT("findByEmail(db, 'ada@example.com')","SELECT * FROM users WHERE email = ?",['ada@example.com, Ada'],"name: 'Ada'",{al:'Select finds Ada',hl:0})],
 ["An unknown email finds no row, so the function returns <b>null</b>. The test checks that path too.",RT("findByEmail(db, 'nobody@example.com')","SELECT * FROM users WHERE email = ?",['ada@example.com, Ada'],'null',{al:'Unknown email returns null',rc:'bx-warn'})]])}
${V.rules(V.rh('What to check'),
 V.ok('create, then find','The row really went in and comes back out'),V.ok('duplicates throw','The UNIQUE constraint exists and works'),
 V.ok("toEqual(['Alan', 'Grace'])",'ORDER BY really sorts the way you think'),V.ok('a missing row gives null','The "not found" path'),
 V.rh('In CI'),V.ok('docker run … postgres:16','A throwaway database for each test run'))}
${V.build(`<ol><li>Add <code>beforeEach</code> that runs <code>DELETE FROM users</code>.</li><li>Test create-then-find, and that an unknown email gives <code>null</code>.</li><li>Test that a second Ada throws an error mentioning UNIQUE.</li><li>Create Grace then Alan, and check <code>listUsers</code> gives Alan first with <code>toEqual</code>.</li></ol>`)}
${V.hook(`Real database, clean slate, test its rules too.`)}
`)}

<div class="try"><b>Try it in your head</b>1. A test passes alone but fails with the others. First suspect? <i>Leftover data: tests share state.</i> 2. Can a mocked db catch a missing UNIQUE constraint? <i>No, only the real database can.</i> 3. Where do integration tests sit in the pyramid? <i>The middle.</i></div>
`);

/* ---------- t5 ---------- */
const WEB=(cmd,k,o)=>{let s='<svg viewBox="0 0 420 262" role="img" aria-label="'+o.al+'">'+C(6,4,408,cmd,[0,1],{})+'<g transform="translate(0,26)"><rect class="bx" x="6" y="50" width="408" height="182" rx="10"/><path class="ln" d="M6 76H414"/><circle class="dot" cx="22" cy="63" r="4"/><circle class="dot" cx="36" cy="63" r="4"/><circle class="dot" cx="50" cy="63" r="4"/><text class="t-s" x="70" y="68">localhost /'+(o.dash?'dashboard':'')+'</text>';
 if(o.dash)s+='<text class="t-b" x="24" y="112" style="font-size:20px">Dashboard</text><text class="t" x="24" y="142">Welcome back, Ada</text>'+(o.found?B(240,150,true,'visible ✓'):'');
 else{s+='<text class="t-b" x="24" y="106" style="font-size:18px">Sign in</text><text class="t-s" x="24" y="128">Email</text><rect class="'+(k===1?'bx-hl':'bx')+'" x="80" y="114" width="220" height="24" rx="4"/><text class="t-m" x="88" y="131" style="font-size:14px">'+(k>=1?'ada@example.com':'')+'</text>';
  s+='<text class="t-s" x="24" y="160">Password</text><rect class="'+(k===2?'bx-hl':'bx')+'" x="100" y="146" width="200" height="24" rx="4"/><text class="t-m" x="108" y="163" style="font-size:14px">'+(k>=2?'••••••••':'')+'</text>';
  s+='<rect class="'+(k===3?'bx-hl':'bx-a')+'" x="24" y="184" width="90" height="32" rx="6"/><text class="t-b" x="69" y="205" text-anchor="middle" style="font-size:14px">Log in</text>'+(k===3?V.ic('clock',130,184,30,'ic-a')+'<text class="t-s" x="166" y="205">logging in…</text>':'')+(k===0?B(240,184,true,'heading ✓'):'')}
 return s+'</g></svg>'};
const WT=(k)=>{let s='<svg viewBox="0 0 420 200" role="img" aria-label="Timeline of auto-waiting vs a fixed sleep"><path class="ln" d="M20 40H400"/><text class="t-s" x="20" y="24">0 ms</text><text class="t-s" x="400" y="24" text-anchor="end">5000 ms</text><path class="ln-d" d="M62 30V104"/><text class="t-s" x="56" y="122">↑ page ready at 150 ms</text>';
 s+='<text class="t-b" x="20" y="74">auto-wait</text>';
 if(k>=0)s+='<circle class="dot-m" cx="24" cy="94" r="5"/><circle class="dot-m" cx="40" cy="94" r="5"/><circle class="dot-ok" cx="62" cy="94" r="7"/>'+(k>=1?'<text class="t t-ok" x="80" y="99">found: test goes on at once</text>':'<text class="t-s" x="80" y="99">checking again… and again…</text>');
 s+='<text class="t-b" x="20" y="154">waitForTimeout(5000)</text>';
 if(k>=2)s+='<rect class="bx-bad" x="20" y="166" width="380" height="22" rx="4"/><text class="t-s" x="210" y="182" text-anchor="middle">waits the full 5 seconds, every run</text>';
 return s+'</svg>'};

explain('t5',`
<p>Unit tests check the pieces. An <b>end-to-end test</b> checks the whole app the way a person uses it: open the page, type, click, and see the right thing appear. Playwright is a tool that drives a real browser to do exactly that.</p>

${V.card(1,'A robot user','Playwright drives the browser',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A robot types into a browser window and clicks the Log in button">
${V.ic('robot',10,30,90,'ic-a')}${AR(104,150,76)}
<rect class="bx" x="156" y="10" width="258" height="140" rx="10"/><path class="ln" d="M156 34H414"/><text class="t-s" x="168" y="27">localhost /</text>
<text class="t-b" x="170" y="62">Sign in</text><rect class="bx-info" x="170" y="72" width="200" height="22" rx="4"/><rect class="bx-info" x="170" y="100" width="200" height="22" rx="4"/>
<rect class="bx-a" x="170" y="128" width="70" height="18" rx="4"/>${V.ic('arrow',236,124,26,'ic-a')}
</svg><figcaption>Playwright controls Chromium, Firefox or WebKit and does what a user would: go to a page, fill in fields, click.</figcaption></figure>
${V.like(`<p>A mystery shopper. The shop hires someone to walk in, pick up items, pay at the till and check the receipt, exactly like a real customer. If anything goes wrong anywhere along the way, they report it.</p>`)}
${V.why(`<p>Only an end-to-end test proves that the front end, back end and database work together in a real browser. Early tools like Selenium (2004) worked but were slow and flaky. Microsoft released Playwright in 2020 with locators that find elements like a person would and assertions that wait automatically.</p>`)}
${V.anat([[1,'await'],' ',[2,'page'],'.',[3,"getByRole('button', { name: 'Log in' })"],'.',[4,'click()'],';'],[
 '<b>await</b>: every browser action takes time, so wait for it.',
 '<b>page</b>: the browser tab, given to your test.',
 '<b>Locator</b>: find the element by its role and visible name, as a user would.',
 '<b>Action</b>: <code>click()</code>, <code>fill(\'text\')</code>, <code>check()</code> and more.'])}
${V.steps([
 ["<b>page.goto('/')</b> opens the app. The test checks the Sign in heading is visible.",WEB(["await page.goto('/');",''],0,{al:'Sign in page opened'})],
 ["<b>getByLabel('Email').fill(…)</b> finds the box labelled Email and types into it.",WEB(["await page.getByLabel('Email')","  .fill('ada@example.com');"],1,{al:'Email typed'})],
 ['The same for the password.',WEB(["await page.getByLabel('Password')","  .fill('hunter22');"],2,{al:'Password typed'})],
 ['<b>click()</b> on the Log in button. The app takes a moment to log in.',WEB(["await page.getByRole('button',","  { name: 'Log in' }).click();"],3,{al:'Log in clicked, loading'})],
 ['<b>expect(…).toBeVisible()</b> keeps checking until the Dashboard heading appears. It does: pass.',WEB(["await expect(page.getByRole('heading',","  { name: 'Dashboard' })).toBeVisible();"],4,{al:'Dashboard visible, test passes',dash:true,found:true})]])}
${V.hook(`Go, fill, click, expect: a robot that uses your app like a person.`)}
`)}

${V.card(2,'Locators','find things the way people do',`
${V.like(`<p>Giving directions. "Press the button that says Log in" works even after the room is redecorated. "Press the third button in the second box on the left" breaks the moment anything moves.</p>`)}
${V.rules(V.rh('Good locators: survive redesigns'),
 V.ok("getByRole('button', { name: 'Log in' })",'Role + visible name: the best choice'),V.ok("getByLabel('Email')",'Form fields by their label'),
 V.ok("getByText('Welcome back')",'Plain text on the page'),
 V.rh('Fragile locators: avoid'),V.no("locator('.btn-primary-2')",'Breaks when a class name changes'),V.no("locator('div &gt; div &gt; button')",'Breaks when the layout changes'),
 V.rh('Conventions'),V.ok('a few critical journeys','Sign-up, login, checkout. Not every button'))}
${V.hook(`Find it like a user: by role, by label, by text.`)}
`)}

${V.card(3,'Auto-waiting','never sleep, always expect',`
${V.like(`<p>Waiting for a bus. You can stand there checking the road until it arrives, then get on straight away. Or you can set a 20-minute timer and refuse to look up: slow if the bus came early, and you miss it if it is late.</p>`)}
${V.steps([
 ['The test clicks Log in. <b>toBeVisible()</b> checks for the Dashboard heading: not yet… not yet…',WT(0)],
 ['At 150 ms the page is ready. The assertion sees it straight away and the test moves on.',WT(1)],
 ['A fixed <b>waitForTimeout(5000)</b> always waits 5 seconds, even when the page was ready in 150 ms. And on a slow day, 5 seconds may not be enough.',WT(2)]])}
${V.rules(V.rh('Rules'),
 V.ok('await expect(locator).toBeVisible()','Retries until true, or fails after a timeout'),V.ok("await expect(locator).toHaveText('…')",'Waits for the right text'),
 V.no('await page.waitForTimeout(5000)','A fixed sleep: slow and still flaky'),V.no('expect(…).toBeVisible()  (no await)','The check never really waits'))}
${V.build(`<ol><li>Write a small <code>logIn(page, password)</code> helper: goto, fill both fields, click.</li><li>Log in with hunter22 and expect the Dashboard heading.</li><li>Log in with a wrong password and expect the alert to have the error text.</li><li>Log in, click Log out, and expect the Sign in heading again.</li></ol>`)}
${V.hook(`Don't sleep, expect: the assertion waits exactly as long as it needs.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Best locator for a "Save" button? <i><code>getByRole('button', { name: 'Save' })</code>.</i> 2. A test fails because the page is slow. Add a sleep? <i>No: use an auto-waiting expect.</i> 3. Should every feature get an E2E test? <i>No, only the critical journeys.</i></div>
`);

/* ---------- t6 ---------- */
const CYC=(k,o={})=>{const N=[[210,40,'RED','failing test','bx-bad','t-bad'],[340,150,'GREEN','make it pass','bx-ok','t-ok'],[80,150,'REFACTOR','tidy up','bx-info','t-info']];
 let s='<svg viewBox="0 0 420 210" role="img" aria-label="'+(o.al||'Red, green, refactor loop')+'"><path class="ln-d" d="M250 52C320 60 350 100 345 120M300 168H130M90 120C80 80 120 50 170 46"/>';
 s+='<polygon class="ah" points="339,116 351,116 345,128"/><polygon class="ah" points="142,162 142,174 130,168"/><polygon class="ah" points="160,40 172,46 160,52"/>';
 N.forEach((n,i)=>{const on=k===-1||k===i;s+='<rect class="'+(on?n[4]:'bx')+'" x="'+(n[0]-66)+'" y="'+(n[1]-26)+'" width="132" height="56" rx="28"/><text class="t-b '+(on?n[5]:'t-dim')+'" x="'+n[0]+'" y="'+(n[1]-2)+'" text-anchor="middle">'+n[2]+'</text><text class="t-s'+(on?'':' t-dim')+'" x="'+n[0]+'" y="'+(n[1]+18)+'" text-anchor="middle">'+n[3]+'</text>'});
 return s+(o.extra||'')+'</svg>'};
const SL=(lines,cur,res,o)=>{let s='<svg viewBox="0 0 420 230" role="img" aria-label="'+o.al+'">'+C(6,6,408,lines,cur,{dim:true});const y=lines.length*26+40;
 res.forEach((r,i)=>{s+='<text class="t-m" x="10" y="'+(y+i*34)+'" style="font-size:14px">'+r[0].replace(/ /g,'&#160;')+'</text>'+B(300,y-22+i*34,r[1],r[1]?'pass':'fail')});return s+'</svg>'};

explain('t6',`
<p>Normally you write code, then test it. <b>Test-driven development</b> (TDD) flips that round: you write a failing test first, then just enough code to pass it. It sounds backwards, but it means you always know what "done" looks like.</p>

${V.card(1,'Red, green, refactor','the TDD loop',`
<figure class="fig">${CYC(-1)}<figcaption>Red: write a test that fails. Green: the simplest code that passes. Refactor: tidy up while staying green. Then go round again.</figcaption></figure>
${V.like(`<p>Making a key for a lock. First you build the lock (the test), so you know exactly what shape the key must be. Then you file the key (the code) until it turns. Then you smooth the rough edges, testing that it still turns.</p>`)}
${V.why(`<p>Kent Beck described TDD in his 2002 book <i>Test-Driven Development: By Example</i>. Writing the test first forces you to decide what the code should do before you get lost in how. As a bonus, every behaviour ends up with a test protecting it.</p>`)}
<p><b>Watch one loop with slugify</b>, which turns a title into a web address part: "Hello World" becomes "hello-world".</p>
${V.steps([
 ['<b>RED.</b> Write the test first. slugify still returns an empty string, so the test fails. Good: it proves the test can fail.',SL(["function slugify(title) {","  return '';","}"],1,[["'Hello World' → 'hello-world'",false]],{al:'Red: test fails'})],
 ['<b>GREEN.</b> Write the simplest code that passes: lower case, split on spaces, join with dashes. Not clever, just enough.',SL(["function slugify(title) {","  return title.toLowerCase()","    .split(' ').join('-');","}"],[1,2],[["'Hello World' → 'hello-world'",true],["'Docker' → 'docker'",true]],{al:'Green: both tests pass'})],
 ['<b>REFACTOR.</b> Make the code clearer without changing what it does. Run the tests after every change: still green, so nothing broke.',SL(["function slugify(title) {","  const words = title.toLowerCase()","    .split(' ');","  return words.join('-');","}"],[1,2,3],[["'Hello World' → 'hello-world'",true],["'Docker' → 'docker'",true]],{al:'Refactor: still green'})]])}
${V.hook(`Red, green, refactor: fail it, pass it, tidy it.`)}
`)}

${V.card(2,'New requirement, new red test','grow the code one test at a time',`
${V.like(`<p>A school rule book. When a new problem appears, you first write the new rule down, then you change how things are done to follow it.</p>`)}
${V.steps([
 ['A new requirement: titles with punctuation and extra spaces. Write the test first. The simple code gives <b>"--hello,---world!--"</b>: red.',SL(["  return title.toLowerCase()","    .split(' ').join('-');"],-1,[["'Hello World'",true],["'  Hello,   World!  '",false]],{al:'New test fails'})],
 ['Add steps one at a time: trim the ends, drop punctuation, then turn any run of spaces or dashes into one dash.',SL([".toLowerCase().trim()",".replace(/[^a-z0-9\\s-]/g, '')",".replace(/[\\s-]+/g, '-')"],[1,2],[["'Hello World'",true],["'  Hello,   World!  '",true]],{al:'Both tests pass'})],
 ['Add the repeated-dash test ("Git -- the basics"). It already passes, and the old tests are still green. Commit while green.',SL([".toLowerCase().trim()",".replace(/[^a-z0-9\\s-]/g, '')",".replace(/[\\s-]+/g, '-')"],-1,[["'  Hello,   World!  '",true],["'Git -- the basics'",true]],{al:'All tests pass'})]])}
${V.anat([['','.replace('],[1,'/[^a-z0-9\\s-]/g'],', ',[2,"''"],')'].map(p=>Array.isArray(p)&&p[0]===''?p[1]:p),[
 '<b>A regular expression:</b> any character that is <i>not</i> (<code>^</code>) a letter, digit, space or dash. <code>g</code> means every match, not just the first.',
 '<b>Replace with nothing,</b> which deletes it.'])}
${V.rules(V.rh('Rules of TDD'),
 V.ok('test first, watch it fail','Proves the test can catch a problem'),V.no('writing code with no failing test','Then nothing proves it works'),
 V.ok('simplest code to pass','No extra features "just in case"'),V.ok('refactor only on green','If a test goes red, undo the last change'),
 V.ok('small steps, commit on green','Every commit is a working version'))}
${V.build(`<ol><li>Write two tests for slugify and run them: both red.</li><li>Make them pass with the simplest code.</li><li>Add failing tests for punctuation, extra spaces and repeated dashes.</li><li>Implement with <code>trim</code> and <code>replace</code> until all four pass, then tidy.</li></ol>`)}
${V.hook(`New rule? New red test. Then green, then tidy.`)}
`)}

${V.card(3,'Why it works','and when to use it',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Each test is a safety net under a trapeze artist">
${V.ic('person',180,6,56,'ic-a')}
<path class="ln-ok" style="stroke-width:3" d="M40 110Q210 150 380 110"/><path class="ln-ok" d="M80 116V96M150 128V104M210 132V108M270 128V104M340 116V96"/>
<text class="t-b t-ok" x="210" y="92" text-anchor="middle">a net of tests</text>
</svg><figcaption>Every TDD loop adds one more strand to the safety net under your code.</figcaption></figure>
${V.like(`<p>A trapeze artist with a safety net. With the net in place they can try bolder moves. With a test for every behaviour, you can rename, reorganise and speed up code, and the tests shout the moment you drop something.</p>`)}
${V.why(`<p>Code written test-first is usually easier to test (small functions, clear inputs and outputs), because you had to call it before it existed. The tests also act as a precise, always-up-to-date description of what the code should do.</p>`)}
${V.rules(V.rh('When it fits best'),V.ok('clear rules: slugify, prices, validation','Inputs and outputs are easy to state'),V.ok('fixing a bug','First a test that shows the bug (red), then the fix (green)'),
 V.no('quick throwaway experiments','Explore first, then write tests for the version you keep'))}
${V.hook(`Every loop adds a strand to the net.`)}
`)}

<div class="try"><b>Try it in your head</b>1. In TDD, what do you write first? <i>A failing test.</i> 2. You are refactoring and a test goes red. What now? <i>Undo the last change; refactoring must keep tests green.</i> 3. Why watch the test fail first? <i>To prove it can actually detect the problem.</i></div>
`);
})();
