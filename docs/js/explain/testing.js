/* testing: visual "Understand it" walkthroughs. */
(()=>{
/* C: dark code panel; cur = index (or list) of running line(s) */
const C=(x,y,w,lines,cur,o={})=>{const lh=o.lh||26,fs=o.fs||14,cu=[].concat(cur);
 let s='<rect class="bx-dark" x="'+x+'" y="'+y+'" width="'+w+'" height="'+(lines.length*lh+12)+'" rx="8"/>';
 lines.forEach((l,i)=>{const yy=y+lh*(i+1)-1,on=cu.includes(i);if(on)s+='<text class="t-a" x="'+(x+8)+'" y="'+yy+'" style="font-size:'+fs+'px">&#9654;</text>';
  s+='<text class="t-term'+(o.dim&&!on?' t-dim':'')+'" x="'+(x+26)+'" y="'+yy+'" style="font-size:'+fs+'px">'+l+'</text>'});return s};
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
const aaa=(cur,o)=>'<svg viewBox="0 0 420 246" role="img" aria-label="'+o.al+'">'+C(6,6,408,AAA,cur,{dim:true})+'<text class="t-b t-a" x="12" y="190">'+o.tag+'</text>'+(o.body||'')+'</svg>';
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
<circle class="dot-m" cx="180" cy="70" r="8"/><text class="t-m" x="180" y="100" text-anchor="middle">49.99</text><text class="t-s" x="180" y="122" text-anchor="middle">pays 4.99</text>
<circle class="dot-ok" cx="240" cy="70" r="8"/><text class="t-m" x="262" y="100">50</text><text class="t-s" x="262" y="122">free</text>
<text class="t-s" x="30" y="56">10: easy, but</text><text class="t-s" x="30" y="94">says little</text>
<text class="t-s" x="390" y="56" text-anchor="end">100: same</text>
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
})();
