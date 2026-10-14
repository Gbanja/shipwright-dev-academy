/* testing: "Explained step by step" walkthroughs. */

explain('t1',`
<h4>Why automatic tests exist</h4>
<p>Every time you change code, you risk breaking something that used to work. Fix a bug in the checkout and the discount code stops working. Rename a function and a page three folders away crashes. These breakages are called <b>regressions</b>: things going backwards.</p>
<p>You could check everything by hand after each change: open the app, click through sign-up, add things to a cart, try a coupon. That is <b>manual testing</b>. It is slow, it is boring, and because it is boring people skip steps. After a few months the app is too big to check by hand at all, and every change feels scary.</p>
<p>An <b>automated test</b> is a small piece of code whose only job is to run some of your other code and check that the answer is right. A computer can run hundreds of them in a second, every time you save, without getting bored. That turns "I hope I didn't break anything" into "the tests say nothing broke", which is what lets teams change code quickly and confidently.</p>
<div class="analogy"><b>Think of it like</b>A smoke alarm. You fit it once, and from then on it watches all the time. It does not stop fires, but it tells you the moment something goes wrong, while the problem is still small and cheap to fix.</div>

<h4>The anatomy of a test</h4>
<p>Here is the starter code. The first three lines are the code being tested; the rest is the test:</p>
<pre class="snip">function add(a, b) {
  return a + b;
}

test('adds two numbers', () =&gt; {
  expect(add(2, 3)).toBe(5);
});</pre>
<p><code>test</code> is a function provided by the <b>test runner</b>, the tool that finds your tests, runs them and reports the results. Popular runners for JavaScript are Vitest and Jest, and this editor uses the same syntax. <code>test</code> takes two things:</p>
<ol>
<li>A <b>name</b> in quotes, describing the behaviour in plain words. It appears in the results, so make it read like a sentence: "adds two numbers".</li>
<li>A <b>function</b>, written <code>() =&gt; { ... }</code>, holding the code that does the checking. The runner calls it for you.</li>
</ol>
<p>Inside, the line <code>expect(add(2, 3)).toBe(5);</code> is an <b>assertion</b>: a statement of what must be true.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="An assertion split into actual value, matcher and expected value">
<rect class="bx-dark" x="10" y="14" width="400" height="34" rx="6"/>
<text class="t-term" x="22" y="37">test('adds two numbers', () =&gt; {</text>
<rect class="bx-a" x="10" y="70" width="180" height="40" rx="6"/><text class="t-m" x="100" y="95" text-anchor="middle">expect(add(2, 3))</text>
<rect class="bx-info" x="200" y="70" width="90" height="40" rx="6"/><text class="t-m" x="245" y="95" text-anchor="middle">.toBe</text>
<rect class="bx-ok" x="300" y="70" width="70" height="40" rx="6"/><text class="t-m" x="335" y="95" text-anchor="middle">(5)</text>
<g text-anchor="middle">
<text class="t-b t-a" x="100" y="134">actual</text><text class="t-s" x="100" y="152">what the code gave</text>
<text class="t-b t-info" x="245" y="134">matcher</text><text class="t-s" x="245" y="152">the check</text>
<text class="t-b t-ok" x="335" y="134">expected</text><text class="t-s" x="335" y="152">the right answer</text>
<text class="t-s" x="210" y="188">the test fails if the check is not true</text>
</g>
</svg><figcaption>An assertion has three parts. expect wraps the actual value your code produced. The matcher, here toBe, is the kind of check. The value in brackets after it is the answer you expect. If actual and expected don't match, the test fails.</figcaption></figure>
<p>Read it out loud: "expect add of 2 and 3 to be 5". The runner calls <code>add(2, 3)</code>, gets the <b>actual</b> value, and the <b>matcher</b> <code>toBe</code> compares it with the <b>expected</b> value. If they match, nothing happens and the test passes. If they don't, the assertion throws an error, the test stops there, and the runner marks it as failed.</p>

<h4>Red, green, and why you break things on purpose</h4>
<p>Run the starter and the test passes. Test tools show a pass in green and a failure in red, so people talk about tests "going green" or "going red".</p>
<p>The second task asks you to break <code>add</code> on purpose, by making it subtract. That feels odd, but it answers an important question: <b>can this test fail at all?</b> A test that passes no matter what the code does is worse than useless, because it gives you false confidence. By breaking the code and watching the test go red, you prove that it is really checking something. Then you fix the code and watch it go green again.</p>
<p>So a red test is not bad news. It means the safety net caught something before your users did.</p>

<h4>Reading a failure message</h4>
<p>When <code>add</code> subtracts, the output reports something like:</p>
<pre class="snip">✖ adds two numbers
  expected -1 to be 5</pre>
<p>Read it in two halves. The test name tells you <b>which behaviour</b> broke. The message tells you <b>what actually happened</b>: the code produced -1 where 5 was expected. Since 2 minus 3 is -1, the bug almost points at itself. Good test names and simple assertions make failures this easy to diagnose.</p>

<h4><code>toBe</code> and <code>toEqual</code></h4>
<p><code>toBe</code> checks that two values are exactly the same thing. That is right for numbers, text and true/false. Objects and arrays are different: two separately created arrays with the same contents are still two different arrays, so <code>expect([1, 2]).toBe([1, 2])</code> fails. For those, use <code>toEqual</code>, which compares the contents:</p>
<pre class="snip">expect(add(-2, -3)).toBe(-5);        // numbers: toBe
expect([1, 2].concat(3)).toEqual([1, 2, 3]);   // arrays: toEqual</pre>
<p>You can have as many tests as you like in a file. Each one is independent: a failure in one does not stop the others from running.</p>

<h4>The testing pyramid</h4>
<p>Not all tests are the same size. Professionals talk about three levels:</p>
<ul>
<li><b>Unit tests</b> check one small piece, usually one function, on its own. Like the test above. They run in milliseconds and point straight at the broken piece.</li>
<li><b>Integration tests</b> check that pieces work together, for example your code talking to a real database. Slower, but they catch problems in the joins between parts.</li>
<li><b>End-to-end tests</b> (E2E) drive the whole app the way a user does: open a browser, type, click, look at the screen. They give the most confidence that the real thing works, but they are slow and break more easily for reasons that are not bugs, like a page loading slowly.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="Testing pyramid: many unit tests, some integration, few end-to-end">
<polygon class="bx-a" points="160,20 110,80 210,80"/>
<polygon class="bx-info" points="105,86 215,86 260,146 60,146"/>
<polygon class="bx-ok" points="55,152 265,152 310,212 10,212"/>
<g text-anchor="middle">
<text class="t-b" x="160" y="72">E2E</text>
<text class="t-b" x="160" y="114">Integration</text><text class="t-s" x="160" y="134">some</text>
<text class="t-b" x="160" y="180">Unit</text><text class="t-s" x="160" y="200">lots</text>
</g>
<path class="ln" d="M340 200V36"/><polygon class="ah" points="334,40 346,40 340,28"/>
<text class="t-s" x="352" y="40">slower,</text><text class="t-s" x="352" y="56">fewer</text>
<text class="t-s" x="352" y="186">faster,</text><text class="t-s" x="352" y="202">more</text>
<text class="t-s" x="226" y="56">a few</text>
</svg><figcaption>The testing pyramid. The wide base is many fast unit tests. The middle is a smaller number of integration tests. The narrow top is a few slow end-to-end tests for the most important user journeys. Going up, each test is slower and checks more at once.</figcaption></figure>
<p>The shape is the advice: <b>many unit tests, some integration tests, a few end-to-end tests.</b> Fast tests at the bottom give quick, precise feedback on every save. The few slow tests at the top check that the most important journeys, such as signing up and paying, really work from end to end. This track climbs the pyramid: unit tests next, then mocks, a real database, a real browser, and finally writing tests first.</p>

<h4>Test behaviour, not implementation</h4>
<p>A good test checks <b>what</b> the code does from the outside: given this input, expect this output or this effect. It should not check <b>how</b> the code does it, such as the names of internal variables or which helper functions it calls.</p>
<p>Why? Because you will rewrite the "how" many times to make code cleaner or faster. That rewriting is called <b>refactoring</b>: changing the inside without changing the behaviour. Behaviour tests stay green through a refactor and only go red when something really breaks. Implementation tests go red every time you tidy up, and soon everyone ignores them.</p>
<div class="mistake"><b>Common mistake</b>Copying the code's own logic into the test, like <code>expect(add(2, 3)).toBe(2 + 3)</code>. If the logic is wrong, the test is wrong in the same way, and it passes. Write the expected answer as a plain, known value: <code>5</code>.</div>
<div class="mistake"><b>Common mistake</b>Never seeing a new test fail. If you have never watched it go red, you don't know it can. Break the code briefly, or check the test against a wrong expected value, then put things back.</div>
<div class="try"><b>Try it in your head</b>If <code>add</code> were changed to <code>return a * b;</code>, would the test <code>expect(add(2, 3)).toBe(5)</code> catch it? Yes: 2 times 3 is 6, so the output would say "expected 6 to be 5". Would <code>expect(add(2, 2)).toBe(4)</code> catch it? No, because 2 times 2 is also 4. That is why the choice of example values matters, which is the topic of the next lesson.</div>

<h4>Recap</h4>
<ul>
<li>Automated tests are code that checks code, so you can change things without fear of silent regressions.</li>
<li><code>test('name', () =&gt; { ... })</code> holds one check; <code>expect(actual).toBe(expected)</code> is the assertion. Use <code>toEqual</code> for arrays and objects.</li>
<li>Red means the test caught something. Watch each new test fail once, to prove it can.</li>
<li>The pyramid: many fast unit tests, some integration tests, a few end-to-end tests.</li>
<li>Test behaviour (inputs and outputs), not implementation details.</li>
</ul>
`);

explain('t2',`
<h4>Passing is easy; catching bugs is the skill</h4>
<p>In the last lesson you saw that <code>expect(add(2, 2)).toBe(4)</code> would happily pass even if <code>add</code> multiplied instead of adding. The test ran, it was green, and it protected nothing. Writing tests that pass is easy. Writing tests that <b>fail when the code is wrong</b> is the real skill, and it comes down to choosing good examples.</p>
<p>This lesson's code is a shopping cart in <code>cart.js</code>, with three small functions:</p>
<ul>
<li><code>subtotal(items)</code> adds up price times quantity for every item.</li>
<li><code>applyCoupon(total, code)</code> takes 10% off for <code>SAVE10</code>, leaves the total alone for <code>FREESHIP</code>, and throws an error for any other code.</li>
<li><code>shipping(total)</code> is free when the total is 50 or more, and 4.99 otherwise.</li>
</ul>
<p>Small, pure functions like these, where the same input always gives the same output and nothing else is touched, are the perfect target for <b>unit tests</b>.</p>

<h4>Two files: the code and its tests</h4>
<p>Real projects keep tests in their own files next to the code, named like <code>cart.test.js</code>. The test file pulls in the functions it needs:</p>
<pre class="snip">import { subtotal, applyCoupon, shipping } from './cart.js';</pre>
<p>That works because <code>cart.js</code> marks those functions with <code>export</code>, meaning "other files may use this". The <code>./</code> means "in the same folder".</p>
<p>To keep many tests tidy, you group them with <code>describe</code>, and write each test with <code>it</code>. <code>it</code> is simply another name for <code>test</code>, chosen so the name reads as a sentence:</p>
<pre class="snip">describe('subtotal', () =&gt; {
  it('is 0 for an empty cart', () =&gt; {
    expect(subtotal([])).toBe(0);
  });
});
// results show: subtotal &gt; is 0 for an empty cart</pre>

<h4>Arrange, Act, Assert</h4>
<p>Almost every good unit test has the same three-step shape, called <b>Arrange-Act-Assert</b>:</p>
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="Arrange, Act, Assert as three steps">
<rect class="bx-info" x="10" y="20" width="120" height="80" rx="8"/>
<rect class="bx-a" x="150" y="20" width="120" height="80" rx="8"/>
<rect class="bx-ok" x="290" y="20" width="120" height="80" rx="8"/>
<g text-anchor="middle">
<text class="t-b" x="70" y="48">1 Arrange</text><text class="t-s" x="70" y="72">build the</text><text class="t-s" x="70" y="88">inputs</text>
<text class="t-b" x="210" y="48">2 Act</text><text class="t-s" x="210" y="72">call the code</text><text class="t-s" x="210" y="88">once</text>
<text class="t-b" x="350" y="48">3 Assert</text><text class="t-s" x="350" y="72">check the</text><text class="t-s" x="350" y="88">result</text>
<text class="t-m" x="70" y="132">items</text><text class="t-m" x="210" y="132">subtotal()</text><text class="t-m" x="350" y="132">toBe(25)</text>
</g>
<path class="ln" d="M130 60h14"/><polygon class="ah" points="142,54 142,66 150,60"/>
<path class="ln" d="M270 60h14"/><polygon class="ah" points="282,54 282,66 290,60"/>
</svg><figcaption>Arrange sets up the inputs, such as a list of cart items. Act calls the function being tested, once. Assert checks the result against the answer you worked out by hand.</figcaption></figure>
<pre class="snip">it('adds price × qty for each item', () =&gt; {
  const items = [{ price: 10, qty: 2 }, { price: 5, qty: 1 }]; // Arrange
  const result = subtotal(items);                              // Act
  expect(result).toBe(25);                                     // Assert
});</pre>
<p>Notice the expected value, 25, is worked out by hand (10 × 2 + 5 × 1), not by calling code. A test that keeps this shape is easy to read months later: what was set up, what was done, what should be true.</p>

<h4>Choosing examples: happy path, edges and errors</h4>
<p>Bugs are not spread evenly. They cluster in a few predictable places, so good testers aim their examples there:</p>
<ul>
<li><b>The happy path:</b> the normal case, like a cart with two items. Confirm the basic job works.</li>
<li><b>Edge cases:</b> the extremes. An empty cart. A single item. A quantity of zero. Code often forgets these. For <code>subtotal</code>, an empty cart must give 0, not crash.</li>
<li><b>Error cases:</b> invalid input should fail loudly and clearly. <code>applyCoupon(80, 'BOGUS')</code> must throw, not silently give a discount.</li>
<li><b>Boundaries:</b> wherever the code makes a decision with <code>&gt;</code>, <code>&gt;=</code>, <code>&lt;</code> or <code>&lt;=</code>. More on these below.</li>
</ul>
<p>Testing that something <b>throws</b> needs one extra detail:</p>
<pre class="snip">expect(() =&gt; applyCoupon(80, 'BOGUS')).toThrow('Invalid coupon');</pre>
<p>The call is wrapped in <code>() =&gt;</code>, a tiny function. If you wrote <code>expect(applyCoupon(80, 'BOGUS'))</code>, the error would be thrown while JavaScript is still working out the argument, before <code>expect</code> even runs, and the test would simply crash. Handing <code>expect</code> a function lets <code>toThrow</code> call it itself, catch the error and inspect it. The text you pass, <code>'Invalid coupon'</code>, only needs to appear somewhere inside the error message.</p>

<h4>Boundaries, and how mutation testing proves your tests work</h4>
<p>The shipping rule is "free from 50": <code>total &gt;= 50 ? 0 : 4.99</code>. One of the most common bugs in all of programming is writing <code>&gt;</code> where <code>&gt;=</code> was meant, or the other way round. It is called an <b>off-by-one</b> error, and it only shows up at the exact boundary.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="The correct rule and the buggy rule only disagree at exactly 50">
<text class="t-m" x="20" y="28">total &gt;= 50  (correct)</text>
<rect class="bx-warn" x="20" y="38" width="220" height="30"/><rect class="bx-ok" x="240" y="38" width="160" height="30"/>
<text class="t" x="120" y="58" text-anchor="middle">4.99</text><text class="t" x="320" y="58" text-anchor="middle">free</text>
<text class="t-m t-bad" x="20" y="100">total &gt; 50  (bug)</text>
<rect class="bx-warn" x="20" y="110" width="244" height="30"/><rect class="bx-ok" x="264" y="110" width="136" height="30"/>
<text class="t" x="140" y="130" text-anchor="middle">4.99</text><text class="t" x="330" y="130" text-anchor="middle">free</text>
<path class="ln" d="M20 166h380"/>
<path class="ln-d" d="M180 34v136"/><path class="ln-a" d="M240 34v136"/>
<text class="t-s" x="180" y="188" text-anchor="middle">49.99</text><text class="t-b t-a" x="240" y="188" text-anchor="middle">50</text>
<text class="t-s" x="172" y="208" text-anchor="end">same in both</text><text class="t-s t-a" x="248" y="208">they disagree</text>
</svg><figcaption>Two versions of the shipping rule, drawn along a line of totals (not to scale). At 49.99 both versions charge 4.99, so a test there cannot tell them apart. At exactly 50 the correct rule says free and the buggy rule still charges, so only a test at 50 catches the bug.</figcaption></figure>
<p>So test <b>both sides</b> of every boundary: the last value that should not qualify (49.99) and the first value that should (50). Values far away, like 10 and 100, pass under both versions and catch nothing.</p>
<p>How do you know your tests are strong enough? <b>Mutation testing</b> answers that by attacking them. A tool makes a small change to your code, called a <b>mutant</b>: it flips <code>&gt;=</code> to <code>&gt;</code>, swaps <code>+</code> for <code>-</code>, or changes a number. Then it reruns your tests. If at least one test fails, the mutant is "killed": your tests noticed. If they all still pass, the mutant "survived", which means a real bug of that kind could slip through. The last task in this lesson does exactly this to <code>shipping()</code>. Tools such as Stryker do it across a whole project.</p>

<h4>A word about decimals</h4>
<p>Computers store most decimal numbers slightly inexactly, so <code>0.1 + 0.2</code> in JavaScript gives <code>0.30000000000000004</code>. A test like <code>expect(0.1 + 0.2).toBe(0.3)</code> fails. When a result is calculated with decimals, use <code>toBeCloseTo</code>, which allows a tiny difference: <code>expect(0.1 + 0.2).toBeCloseTo(0.3)</code>. Notice that <code>applyCoupon</code> avoids the problem by rounding to two decimal places, so <code>applyCoupon(80, 'SAVE10')</code> gives exactly 72.</p>

<h4>Reading the failures you will meet</h4>
<div class="tbl-wrap"><table><tr><th>Output</th><th>What it means</th></tr>
<tr><td><code>expected 4.99 to be 0</code></td><td>The code charged shipping where your test expected free. Check the boundary.</td></tr>
<tr><td><code>expected function to throw</code></td><td>The function finished normally. Either it really doesn't reject that input, or you passed a valid code.</td></tr>
<tr><td><code>expected error "..." to include "..."</code></td><td>It threw, but with a different message than the text you gave toThrow.</td></tr>
<tr><td><code>Invalid coupon: BOGUS</code> as a crash</td><td>You forgot the <code>() =&gt;</code> wrapper, so the error escaped before expect could catch it.</td></tr></table></div>
<div class="mistake"><b>Common mistake</b>Testing only the happy path. A suite where every example is "a normal cart" stays green while empty carts crash and boundaries are wrong. For each function, ask: what is the emptiest input, the smallest, the biggest, the invalid one, and where are the edges?</div>
<div class="mistake"><b>Common mistake</b>Several unrelated checks in one giant test. When it fails, the name doesn't tell you which behaviour broke, and the first failing assertion hides the rest. Prefer one behaviour per <code>it</code>, with a name that says what should happen.</div>
<div class="try"><b>Try it in your head</b>A mutant changes <code>total * 0.9</code> to <code>total * 0.8</code> in <code>applyCoupon</code>. Would a test <code>expect(applyCoupon(80, 'SAVE10')).toBe(72)</code> kill it? Yes: 80 × 0.8 is 64, so the test fails. Would a test that only checks <code>applyCoupon(0, 'SAVE10')</code> is 0 kill it? No: 0 times anything is 0, so the mutant survives.</div>

<h4>Recap</h4>
<ul>
<li>Group tests with <code>describe</code>, write each with <code>it</code>, and import the code under test from its module.</li>
<li>Shape each test as Arrange, Act, Assert, with the expected value worked out by hand.</li>
<li>Cover the happy path, edge cases such as an empty cart, and error cases with <code>expect(() =&gt; fn()).toThrow('message')</code>.</li>
<li>Test both sides of every boundary, such as 49.99 and 50 for a "50 or more" rule.</li>
<li>Mutation testing makes small bugs on purpose; a good suite fails for each one.</li>
</ul>
`);

explain('t3',`
<h4>The problem with testing code that talks to the outside world</h4>
<p>The cart functions in the last lesson were easy to test: numbers in, numbers out. Real code is rarely that tidy. Look at <code>signUp</code> in this lesson's <code>signup.js</code>. It checks the email, saves a user to a database, and sends a welcome email. <code>getWeather</code> calls a weather service over the internet.</p>
<p>Run those for real inside a unit test and you hit trouble fast:</p>
<ul>
<li><b>Side effects:</b> every test run sends a real email, or worse, charges a real card.</li>
<li><b>Slowness:</b> a network call takes hundreds of milliseconds; a thousand tests that each make one take minutes.</li>
<li><b>Flakiness:</b> if the weather service is down, your tests fail even though your code is fine. A test that sometimes passes and sometimes fails with no code change is called <b>flaky</b>.</li>
<li><b>Hard-to-reach cases:</b> how do you make a real API fail on demand, to test your error handling?</li>
</ul>
<p>The answer is to swap the real dependency for a stand-in during the test. A <b>dependency</b> is anything your code relies on to do its job, such as a database, a mailer or a <code>fetch</code> function. The stand-in is called a <b>test double</b>, after the stunt doubles used in films.</p>

<h4>Dependency injection: leaving a door open for the double</h4>
<p>Look closely at the function's signature:</p>
<pre class="snip">export async function signUp(email, { db, mailer }) { ... }</pre>
<p><code>signUp</code> does not create its own database connection or mailer. It receives them as arguments. The app passes in the real ones; a test passes in fakes. Handing a function the things it depends on, instead of letting it fetch them itself, is called <b>dependency injection</b>. It is the single biggest reason code is easy or hard to test.</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="The same signUp function wired to real dependencies in the app and fakes in the test">
<text class="t-b" x="10" y="20">In the app</text>
<rect class="bx-a" x="10" y="44" width="110" height="40" rx="8"/><text class="t-m" x="65" y="69" text-anchor="middle">signUp</text>
<rect class="bx-info" x="250" y="30" width="160" height="32" rx="6"/><text class="t" x="330" y="51" text-anchor="middle">real database</text>
<rect class="bx-warn" x="250" y="68" width="160" height="32" rx="6"/><text class="t" x="330" y="89" text-anchor="middle">sends real email</text>
<path class="ln" d="M120 58L242 46"/><polygon class="ah" points="240,40 241,52 250,45"/>
<path class="ln" d="M120 72L242 84"/><polygon class="ah" points="241,78 240,90 250,85"/>
<line class="ln-d" x1="10" y1="118" x2="410" y2="118"/>
<text class="t-b" x="10" y="144">In the test</text>
<rect class="bx-a" x="10" y="168" width="110" height="40" rx="8"/><text class="t-m" x="65" y="193" text-anchor="middle">signUp</text>
<rect class="bx-ok" x="250" y="154" width="160" height="32" rx="6"/><text class="t" x="330" y="175" text-anchor="middle">fake db: vi.fn</text>
<rect class="bx-ok" x="250" y="192" width="160" height="32" rx="6"/><text class="t" x="330" y="213" text-anchor="middle">fake mailer: vi.fn</text>
<path class="ln-ok" d="M120 182L242 170"/><polygon class="ah-ok" points="240,164 241,176 250,169"/>
<path class="ln-ok" d="M120 196L242 208"/><polygon class="ah-ok" points="241,202 240,214 250,209"/>
</svg><figcaption>The same signUp code, unchanged, in two settings. In the app it is handed a real database and a real mailer. In the test it is handed fake versions made with vi.fn, which do nothing harmful and remember how they were called.</figcaption></figure>

<h4>The family of test doubles</h4>
<p>You will hear several names. They overlap, and many people say "mock" for all of them, but the differences are useful:</p>
<div class="tbl-wrap"><table><tr><th>Name</th><th>What it does</th></tr>
<tr><td><b>Stub</b></td><td>Returns a canned answer, such as "the API says 31 degrees".</td></tr>
<tr><td><b>Spy</b></td><td>Records how it was called, so you can check afterwards.</td></tr>
<tr><td><b>Mock</b></td><td>A stub and spy in one: returns what you choose and records its calls.</td></tr>
<tr><td><b>Fake</b></td><td>A simple working version, such as an in-memory list pretending to be a database.</td></tr></table></div>

<h4><code>vi.fn()</code>: a function that remembers</h4>
<p>In Vitest, <code>vi.fn()</code> creates a mock function. (In Jest the same thing is called <code>jest.fn()</code>.) You can call it like any function. It does nothing real, but it keeps a log of every call and the arguments it received, in <code>.mock.calls</code>. You can also tell it what to return:</p>
<pre class="snip">const greet = vi.fn().mockReturnValue('hi');
greet('Ada');          // returns 'hi'
greet.mock.calls;      // [['Ada']]: one call, with one argument</pre>
<p>Database and email calls are <b>asynchronous</b>: they take time, so instead of an answer they return a <b>promise</b>, an object that delivers the answer later. Code waits for it with <code>await</code>. <code>signUp</code> does exactly that when it calls <code>db.createUser</code>. So the fakes must return promises too, and <code>.mockResolvedValue(x)</code> does that: it makes the mock return a promise that delivers <code>x</code>.</p>
<pre class="snip">const db = { createUser: vi.fn().mockResolvedValue({ id: 1, email: 'ada@example.com' }) };
const mailer = { send: vi.fn().mockResolvedValue(true) };</pre>
<p>Each fake is a plain object shaped like the real thing: <code>db</code> has a <code>createUser</code> method, <code>mailer</code> has a <code>send</code> method. <code>signUp</code> cannot tell the difference.</p>

<h4>Asserting what happened</h4>
<p>With mocks you can check two kinds of thing: the <b>result</b> the function returned, and the <b>interactions</b>, meaning which calls it made to its dependencies.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="signUp calls the mock, the mock logs the call, the assertion reads the log">
<rect class="bx-dark" x="10" y="14" width="400" height="36" rx="6"/>
<text class="t-term" x="22" y="38">mailer.send('ada@…', 'Welcome!')</text>
<path class="ln" d="M210 50v18"/><polygon class="ah" points="204,66 216,66 210,74"/>
<rect class="bx-a" x="60" y="76" width="300" height="84" rx="8"/>
<text class="t-b" x="210" y="100" text-anchor="middle">mock: mailer.send</text>
<text class="t-s" x="76" y="124">log: call 1 → 'ada@…', 'Welcome!'</text>
<text class="t-s" x="76" y="146">returns: a promise of true</text>
<path class="ln-ok" d="M210 160v18"/><polygon class="ah-ok" points="204,176 216,176 210,184"/>
<rect class="bx-ok" x="30" y="186" width="360" height="52" rx="8"/>
<text class="t-m" x="210" y="208" text-anchor="middle">toHaveBeenCalledWith(</text>
<text class="t-m" x="210" y="228" text-anchor="middle">'ada@…', 'Welcome!')</text>
</svg><figcaption>When signUp calls mailer.send, the mock does nothing harmful. It writes the arguments into its call log and hands back the answer you chose. Afterwards, toHaveBeenCalledWith reads that log and passes if one of the recorded calls matches exactly.</figcaption></figure>
<pre class="snip">const user = await signUp('ada@example.com', { db, mailer });
expect(user.id).toBe(1);                                   // the result
expect(mailer.send).toHaveBeenCalledWith('ada@example.com', 'Welcome!');
expect(db.createUser).toHaveBeenCalledTimes(1);</pre>
<p>Just as useful is checking that something did <b>not</b> happen. For an invalid email, <code>signUp</code> should throw before touching the database: <code>expect(db.createUser).not.toHaveBeenCalled()</code>. <code>.not</code> flips any matcher.</p>

<h4>Testing async errors with <code>rejects</code></h4>
<p>An <code>async</code> function never throws in the normal way. It returns a promise that <b>rejects</b> with the error. So instead of the <code>() =&gt;</code> wrapper from the last lesson, you hand the promise itself to expect and use <code>.rejects</code>:</p>
<pre class="snip">await expect(signUp('nope', { db, mailer })).rejects.toThrow('Invalid email');</pre>
<p>Note the <code>await</code> at the front, and that the test function itself must be marked <code>async</code>, by writing <code>async</code> just before its <code>() =&gt;</code>.</p>
<div class="mistake"><b>Common mistake</b>Forgetting that <code>await</code>. Without it the test finishes before the promise is checked, so the assertion runs too late, or not at all, and the test can pass even when the code is wrong. Every assertion using <code>.rejects</code> or <code>.resolves</code> needs <code>await</code> in front.</div>

<h4>A fake <code>fetch</code> for <code>getWeather</code></h4>
<p><code>getWeather(city, fetchFn)</code> also takes its dependency as an argument. The real <code>fetch</code> returns a response object with an <code>ok</code> flag and a <code>json()</code> method that delivers the data. So the fake returns an object of that shape:</p>
<pre class="snip">const fakeFetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () =&gt; ({ temp_c: 31 }),
});</pre>
<p>Now you control the outside world completely. Want to test the failure path? Make the fake resolve to <code>{ ok: false }</code> and check that the function returns <code>null</code>. No real server needed, and the test gives the same answer every time.</p>

<h4>Fresh fixtures with <code>beforeEach</code></h4>
<p>The data and fakes a test needs are called <b>fixtures</b>. If two tests share one mock, the call log from the first test is still there in the second, and assertions like <code>not.toHaveBeenCalled()</code> fail for confusing reasons. <code>beforeEach</code> runs a function before every test in its <code>describe</code> block, so each test starts with brand-new fakes:</p>
<pre class="snip">let db, mailer;
beforeEach(() =&gt; {
  db = { createUser: vi.fn().mockResolvedValue({ id: 1 }) };
  mailer = { send: vi.fn().mockResolvedValue(true) };
});</pre>
<p>The variables are declared with <code>let</code> outside, so every test can see them, and filled in fresh inside <code>beforeEach</code>.</p>

<h4>Don't over-mock</h4>
<p>Mocks test that your code <i>asked</i> the right things. They cannot tell you whether the real thing would have <i>agreed</i>. A mocked <code>db.createUser</code> happily accepts a typo in your SQL. So mock what is slow, costly, random or outside your control: email, payments, third-party APIs, the clock. For your own database code, the next lesson uses a real test database instead.</p>
<div class="mistake"><b>Common mistake</b>Mocking so much that the test only checks the mocks. If every line of a function is a call to a mock, and the test asserts exactly those calls in exactly that order, it will break on every refactor and catch very few real bugs.</div>
<div class="try"><b>Try it in your head</b>In <code>signUp</code>, suppose someone swaps the order so the welcome email is sent <i>before</i> the email is validated. Which of your tests goes red? The invalid-email test: <code>signUp('nope', ...)</code> still rejects, but if you also assert <code>expect(mailer.send).not.toHaveBeenCalled()</code>, that fails, because the mock's log shows an email was sent to "nope".</div>

<h4>Recap</h4>
<ul>
<li>Replace slow, costly or external dependencies with test doubles. Passing dependencies in as arguments (dependency injection) makes that easy.</li>
<li><code>vi.fn()</code> makes a mock that records its calls; <code>.mockResolvedValue(x)</code> makes it return a promise of <code>x</code>.</li>
<li>Check interactions with <code>toHaveBeenCalledWith(...)</code>, <code>toHaveBeenCalledTimes(n)</code> and <code>not.toHaveBeenCalled()</code>.</li>
<li>Test async errors with <code>await expect(promise).rejects.toThrow('...')</code>, inside an <code>async</code> test.</li>
<li>Build fresh fixtures in <code>beforeEach</code>, and mock only what you don't control.</li>
</ul>
`);

explain('t4',`
<h4>Mocks can lie</h4>
<p>In the last lesson you replaced the database with a mock. That made the tests fast and safe, but it also hid something: a mock agrees with whatever you told it. Suppose your code says <code>INSRT INTO users</code>, with a typo. A mocked <code>db.run</code> records the call and returns happily, and the test is green. The real database would have refused the statement on the first try.</p>
<p>The same goes for anything the database itself is responsible for: whether a column name is right, whether a <code>UNIQUE</code> rule really exists, whether <code>ORDER BY</code> sorts the way you assumed. Unit tests with mocks cannot check any of that, because the database is not there.</p>
<p>An <b>integration test</b> checks that pieces really work <b>together</b>. Here, that means running your data functions against a real database. It sits in the middle of the testing pyramid: slower than a unit test, but it catches a whole class of bugs that unit tests never see.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="A unit test with a mock stops before the database; an integration test goes all the way">
<rect class="bx" x="140" y="14" width="140" height="36" rx="6"/><text class="t" x="210" y="37" text-anchor="middle">your test</text>
<rect class="bx-a" x="140" y="66" width="140" height="36" rx="6"/><text class="t-m" x="210" y="89" text-anchor="middle">createUser()</text>
<rect class="bx" x="140" y="118" width="140" height="36" rx="6"/><text class="t" x="210" y="141" text-anchor="middle">SQL statement</text>
<rect class="bx-info" x="140" y="170" width="140" height="36" rx="6"/><text class="t" x="210" y="193" text-anchor="middle">real database</text>
<path class="ln" d="M210 50v8"/><polygon class="ah" points="205,57 215,57 210,65"/>
<path class="ln" d="M210 102v8"/><polygon class="ah" points="205,109 215,109 210,117"/>
<path class="ln" d="M210 154v8"/><polygon class="ah" points="205,161 215,161 210,169"/>
<path class="ln-a" d="M128 16h-10v94h10"/>
<text class="t-s t-a" x="108" y="56" text-anchor="end">unit test,</text><text class="t-s t-a" x="108" y="72" text-anchor="end">mock below</text>
<path class="ln-ok" d="M292 16h10v190h-10"/>
<text class="t-s t-ok" x="312" y="104">integration</text><text class="t-s t-ok" x="312" y="120">test: the</text><text class="t-s t-ok" x="312" y="136">whole path</text>
<text class="t-s t-bad" x="108" y="141" text-anchor="end">never checked</text>
</svg><figcaption>A unit test with a mocked database only covers the top half: your test and your function's logic. The SQL and the database never run, so mistakes there go unseen. An integration test runs the whole path, down to the real database.</figcaption></figure>

<h4>The tools in this sandbox</h4>
<p>In this lesson, <code>db</code> is a real SQLite database, created from the lesson's schema, with a table <code>users(id, email UNIQUE, name)</code>. It offers two methods:</p>
<ul>
<li><code>db.run(sql, params)</code> runs a statement that changes data, such as INSERT or DELETE.</li>
<li><code>db.query(sql, params)</code> runs a SELECT and returns an array of row objects, like <code>[{ id: 1, email: 'ada@example.com', name: 'Ada' }]</code>.</li>
</ul>
<p>Look at how the starter functions pass values: <code>'SELECT * FROM users WHERE email = ?'</code> with <code>[email]</code>. Each <code>?</code> is a <b>placeholder</b>, and the database fills it with the matching value from the array. This is called a <b>parameterised query</b>. It is not just tidier than gluing strings together: it makes the value always count as data, never as SQL, which is the standard defence against an attack called SQL injection. Real database libraries for PostgreSQL and MySQL work the same way.</p>
<p>These functions are synchronous: they return their answer straight away, so no <code>await</code> is needed in this lesson's tests.</p>

<h4>Writing the tests</h4>
<p>An integration test still follows Arrange-Act-Assert. The difference is that "Arrange" puts real rows into a real table:</p>
<pre class="snip">test('finds a user by email', () =&gt; {
  createUser(db, { email: 'grace@example.com', name: 'Grace' }); // Arrange
  const found = findByEmail(db, 'grace@example.com');          // Act
  expect(found.name).toBe('Grace');                             // Assert
});</pre>
<p>Think about the edge cases too. What should <code>findByEmail</code> return for an address that isn't there? The code says <code>|| null</code>, so a good test checks that the answer is exactly <code>null</code>, not <code>undefined</code> and not a crash.</p>
<p>The real database lets you test its <b>constraints</b>. Inserting the same email twice must fail. SQLite reports <code>UNIQUE constraint failed: users.email</code>, and that error is thrown out of <code>createUser</code>, so the wrapped-function form of <code>toThrow</code> from the unit testing lesson catches it. Passing <code>'UNIQUE'</code> to <code>toThrow</code> checks that the message contains that word. This test proves something no mock could: that the rule really exists in the schema.</p>
<p>For <code>listUsers</code>, which sorts by name, insert the users in the <i>wrong</i> order on purpose, then check the order that comes back. If you insert them already sorted, the test passes even if the ORDER BY is missing. Comparing a whole array needs <code>toEqual</code>, and <code>.map((u) =&gt; u.name)</code> turns the rows into a simple list of names that is easy to compare.</p>

<h4>The big rule: every test starts from a known state</h4>
<p>A real database <b>remembers</b>. Rows inserted by one test are still in the table when the next test runs. That causes the most confusing kind of failure:</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Without a reset, the second test fails on leftover data; with beforeEach, both pass">
<text class="t-b t-bad" x="10" y="20">No reset</text>
<rect class="bx" x="10" y="32" width="90" height="46" rx="6"/><text class="t-s" x="55" y="52" text-anchor="middle">test A:</text><text class="t-s" x="55" y="68" text-anchor="middle">add Ada</text>
<rect class="bx-warn" x="115" y="32" width="90" height="46" rx="6"/><text class="t-s" x="160" y="52" text-anchor="middle">table still</text><text class="t-s" x="160" y="68" text-anchor="middle">has Ada</text>
<rect class="bx" x="220" y="32" width="90" height="46" rx="6"/><text class="t-s" x="265" y="52" text-anchor="middle">test B:</text><text class="t-s" x="265" y="68" text-anchor="middle">add Ada</text>
<rect class="bx-bad" x="325" y="32" width="85" height="46" rx="6"/><text class="t-b t-bad" x="367" y="52" text-anchor="middle">fails</text><text class="t-s" x="367" y="68" text-anchor="middle">UNIQUE</text>
<path class="ln" d="M100 55h9"/><path class="ln" d="M205 55h9"/><path class="ln" d="M310 55h9"/>
<line class="ln-d" x1="10" y1="100" x2="410" y2="100"/>
<text class="t-b t-ok" x="10" y="124">beforeEach resets</text>
<rect class="bx-ok" x="10" y="136" width="90" height="46" rx="6"/><text class="t-s" x="55" y="164" text-anchor="middle">empty table</text>
<rect class="bx" x="115" y="136" width="90" height="46" rx="6"/><text class="t-s" x="160" y="156" text-anchor="middle">test A:</text><text class="t-s" x="160" y="172" text-anchor="middle">add Ada</text>
<rect class="bx-ok" x="220" y="136" width="90" height="46" rx="6"/><text class="t-s" x="265" y="164" text-anchor="middle">empty table</text>
<rect class="bx-ok" x="325" y="136" width="85" height="46" rx="6"/><text class="t-s" x="367" y="156" text-anchor="middle">test B:</text><text class="t-b t-ok" x="367" y="172" text-anchor="middle">passes</text>
<path class="ln" d="M100 159h9"/><path class="ln" d="M205 159h9"/><path class="ln" d="M310 159h9"/>
</svg><figcaption>Top: test A leaves Ada in the table, so test B, which also adds Ada, fails on the UNIQUE rule even though the code is fine. Bottom: beforeEach empties the table before every test, so each one starts clean and both pass.</figcaption></figure>
<p>Tests that lean on each other's leftovers pass alone and fail together, or pass in one order and fail in another. The fix is to reset the state before every test:</p>
<pre class="snip">beforeEach(() =&gt; {
  db.run('DELETE FROM users');   // every test starts with an empty table
});</pre>
<p>Now every test is <b>independent</b>: it creates exactly the rows it needs and makes no assumptions about what ran before. Independent tests can run in any order, one at a time or all at once, with the same result.</p>
<div class="tip"><b>Tip</b>Deleting rows is the simplest reset. Bigger projects often wrap each test in a transaction and roll it back at the end, which undoes everything the test did and is very fast. Either way, the goal is a known starting state.</div>

<h4>In real projects: a throwaway database</h4>
<p>Never point tests at your production database: they delete data on purpose. Teams run a separate, disposable database just for tests, ideally the <b>same kind</b> as production, because SQLite, PostgreSQL and MySQL differ in small ways that matter. In continuous integration (CI), the automated system that runs your tests on every change, the usual approach is to start PostgreSQL in a Docker container for the test run. Libraries called <b>Testcontainers</b> do that from inside the test code, starting a fresh container before the tests and removing it afterwards.</p>

<h4>Errors and mistakes you will meet</h4>
<div class="tbl-wrap"><table><tr><th>Message</th><th>What it means</th></tr>
<tr><td><code>UNIQUE constraint failed: users.email</code> in a test you didn't expect</td><td>Leftover rows from an earlier test. Reset in beforeEach.</td></tr>
<tr><td><code>Cannot read properties of null (reading 'name')</code></td><td><code>findByEmail</code> returned null: the row wasn't there, perhaps a typo in the email.</td></tr>
<tr><td><code>expected [...] to equal [...]</code></td><td>The order or the contents differ. Read both arrays carefully.</td></tr></table></div>
<div class="mistake"><b>Common mistake</b>One test that creates the data and a second test that relies on it. It works until someone runs the second test alone, or the runner reorders them. Each test should arrange its own data.</div>
<div class="mistake"><b>Common mistake</b>Testing <code>listUsers</code> with users inserted already in alphabetical order. The test cannot fail, so it proves nothing about sorting. Insert them out of order.</div>
<div class="try"><b>Try it in your head</b>There is no beforeEach. Test 1 creates Grace and Alan and checks <code>listUsers</code> gives Alan then Grace. Test 2 creates Ada and checks <code>listUsers</code> returns exactly one name. Does test 2 pass? No: the table still has Grace and Alan, so it returns three names, Ada, Alan and Grace. Add the reset and it passes.</div>

<h4>Recap</h4>
<ul>
<li>Integration tests run your code against the real thing, here a real database, catching wrong SQL and missing constraints that mocks hide.</li>
<li>Use parameterised queries with <code>?</code> placeholders, and test constraints directly, such as a duplicate email throwing a UNIQUE error.</li>
<li>Choose data that could fail: insert out of order to test sorting, and check the "not found" case returns null.</li>
<li>Reset state in <code>beforeEach</code> so every test is independent and order doesn't matter.</li>
<li>In CI, use a throwaway database of the same kind as production, for example PostgreSQL in Docker or via Testcontainers.</li>
</ul>
`);

explain('t5',`
<h4>A robot user at the top of the pyramid</h4>
<p>Unit tests check single functions. Integration tests check your code with a real database. But a user never calls a function. They open a page, type into boxes, click buttons and read what appears. Plenty can go wrong in between: a button wired to the wrong handler, a form field with a renamed id, a page that never redirects after login. Every function can pass its own tests while the actual login screen is broken.</p>
<p>An <b>end-to-end test</b> (E2E) checks the app the way a user experiences it, from one end (the browser) to the other (the server and database behind it). It is a script that drives a real browser: go to this page, fill in this box, click that button, expect this text on screen. It is the robot user at the narrow top of the testing pyramid.</p>
<p>The most popular modern tool for this is <b>Playwright</b>. It can drive Chromium (the engine behind Chrome and Edge), Firefox and WebKit (the engine behind Safari). The sandbox in this lesson runs a Playwright-compatible API against the small login app in the preview.</p>

<h4>The shape of a Playwright test</h4>
<pre class="snip">import { test, expect } from '@playwright/test';

test('shows the sign-in page', async ({ page }) =&gt; {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});</pre>
<p>Three things are new compared with unit tests:</p>
<ul>
<li><b><code>{ page }</code>.</b> Playwright hands each test a <code>page</code>: one browser tab, freshly opened for this test, with no cookies or leftovers from other tests. The curly braces pick <code>page</code> out of the bundle of helpers Playwright offers, which it calls <b>fixtures</b>.</li>
<li><b><code>async</code> and <code>await</code>.</b> Everything a browser does takes time: loading, typing, clicking. Each step returns a promise, and <code>await</code> waits for it to finish before the next line runs. Nearly every line of an E2E test starts with <code>await</code>.</li>
<li><b><code>page.goto('/')</code></b> opens a page. The <code>/</code> is relative to the app's base address, which is set in Playwright's configuration, so the same test can run against your laptop or a staging server.</li>
</ul>

<h4>Locators: finding things the way a user does</h4>
<p>Before you can click a button, the test has to find it. A <b>locator</b> is Playwright's description of how to find an element on the page. The recommended locators describe elements the way a person would:</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="The login page with locators pointing at the heading, email field and button">
<rect class="bx" x="10" y="10" width="200" height="220" rx="8"/>
<rect class="bx-info" x="10" y="10" width="200" height="24" rx="8"/>
<circle class="dot-m" cx="26" cy="22" r="4"/><circle class="dot-m" cx="40" cy="22" r="4"/><circle class="dot-m" cx="54" cy="22" r="4"/>
<text class="t-b" x="28" y="66" style="font-size:18px">Sign in</text>
<text class="t-s" x="28" y="94">Email</text>
<rect class="bx" x="28" y="100" width="164" height="24" rx="4"/>
<text class="t-s" x="28" y="146">Password</text>
<rect class="bx" x="28" y="152" width="164" height="24" rx="4"/>
<rect class="bx-a" x="28" y="190" width="80" height="28" rx="6"/><text class="t-s" x="68" y="209" text-anchor="middle">Log in</text>
<path class="ln-a" d="M226 60h-120"/><polygon class="ah-a" points="108,54 108,66 100,60"/>
<text class="t-m" x="230" y="65">getByRole(</text><text class="t-s" x="230" y="83">'heading', Sign in</text>
<path class="ln-ok" d="M226 112h-26"/><polygon class="ah-ok" points="202,106 202,118 194,112"/>
<text class="t-m" x="230" y="117">getByLabel(</text><text class="t-s" x="230" y="135">'Email'</text>
<path class="ln-a" d="M226 204h-110"/><polygon class="ah-a" points="118,198 118,210 110,204"/>
<text class="t-m" x="230" y="209">getByRole(</text><text class="t-s" x="230" y="227">'button', Log in</text>
</svg><figcaption>The login page as a user sees it. getByRole with heading and the name Sign in finds the title. getByLabel with Email finds the input whose label says Email. getByRole with button and the name Log in finds the button by its visible text.</figcaption></figure>
<div class="tbl-wrap"><table><tr><th>Locator</th><th>Finds</th></tr>
<tr><td><code>page.getByRole('button', { name: 'Log in' })</code></td><td>A button whose accessible name is "Log in"</td></tr>
<tr><td><code>page.getByRole('heading', { name: 'Dashboard' })</code></td><td>A heading such as <code>&lt;h1&gt;</code> with that text</td></tr>
<tr><td><code>page.getByLabel('Email')</code></td><td>The input connected to the label "Email"</td></tr>
<tr><td><code>page.getByText('Welcome back')</code></td><td>An element containing that text</td></tr></table></div>
<p>A <b>role</b> is what kind of thing an element is: a button, a heading, a link, a text box, an alert. The <b>accessible name</b> is what it is called, usually its visible text or its label. These are exactly what screen readers announce to blind users, so locating by role has a bonus: if your test can't find the button by role and name, a screen reader user probably can't either.</p>
<p>Why not use CSS selectors like <code>.btn-primary-2</code> or <code>div &gt; div &gt; button</code>? Because they describe the page's internal structure, which designers change all the time. The button's role and its text "Log in" are what the user relies on, so they change far less.</p>

<h4>Actions and auto-waiting assertions</h4>
<p>Once you have a locator, you act on it:</p>
<pre class="snip">await page.getByLabel('Email').fill('ada@example.com');   // type into a box
await page.getByRole('button', { name: 'Log in' }).click(); // click</pre>
<p><code>fill</code> clears the box and types the text. <code>click</code> clicks. Before acting, Playwright automatically waits until the element exists, is visible and can be used.</p>
<p>Then you check the outcome with <code>expect</code>, as before, but with matchers made for pages:</p>
<pre class="snip">await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
await expect(page.getByRole('alert')).toHaveText('Invalid email or password');</pre>
<p>These are <b>web-first assertions</b>, and they <b>wait</b>. In this app, logging in takes a moment before the dashboard appears. A plain check made instantly after the click would see the old sign-in page and fail. <code>toBeVisible()</code> instead keeps checking, many times a second, until the heading appears or a time limit runs out (five seconds by default in Playwright). The test continues the instant the condition is true.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="Timeline: a short sleep checks too early, a long sleep wastes time, auto-wait passes as soon as the page is ready">
<g class="t-s"><text class="t-s" x="10" y="45">app</text><text class="t-s" x="10" y="95">sleep 100 ms</text><text class="t-s" x="10" y="145">auto-wait</text><text class="t-s" x="10" y="195">sleep 3 s</text></g>
<rect class="bx-warn" x="130" y="28" width="68" height="26"/><rect class="bx-ok" x="198" y="28" width="202" height="26"/>
<text class="t-s" x="300" y="46" text-anchor="middle">Dashboard shown</text>
<path class="ln-d" d="M198 22v180"/>
<path class="ln" d="M130 90h45"/><circle class="dot" cx="175" cy="90" r="7"/><text class="t-s t-bad" x="208" y="95">too early: fails</text>
<path class="ln" d="M130 140h80"/><circle class="dot-m" cx="148" cy="140" r="4"/><circle class="dot-m" cx="166" cy="140" r="4"/><circle class="dot-m" cx="184" cy="140" r="4"/><circle class="dot-ok" cx="206" cy="140" r="7"/><text class="t-s t-ok" x="222" y="145">passes at once</text>
<path class="ln" d="M130 190h264"/><polygon class="ah" points="392,184 392,196 402,190"/><text class="t-s" x="300" y="182" text-anchor="middle">still waiting…</text>
</svg><figcaption>The top bar shows the app: signing in, in amber, then the dashboard, in green. A fixed 100 millisecond sleep checks too early and fails. A 3 second sleep would pass but wastes almost all of that time. An auto-waiting assertion checks repeatedly and passes the moment the dashboard appears.</figcaption></figure>
<div class="mistake"><b>Common mistake</b>Adding fixed sleeps such as <code>await page.waitForTimeout(5000)</code>. On a fast run you waste five seconds; on a slow day five seconds is still not enough, and the test fails at random. Let auto-waiting assertions wait for the actual condition.</div>

<h4>Keeping E2E tests readable</h4>
<p>Several tests in this lesson start the same way: open the page, type the email and a password, click Log in. Repeating those four lines everywhere makes tests long and hard to change. Put them in a helper function that takes <code>page</code> and the password as arguments, then call it at the start of each test. A test then reads like a story: log in with a wrong password, expect the alert.</p>
<p>Each test still gets its own fresh <code>page</code>, so a logged-in state never leaks into the next test. That isolation is why a log-out test must log in first, inside itself.</p>
<p>Because E2E tests are slow and have the most moving parts, keep them <b>few</b> and aim them at <b>critical journeys</b>: signing up, logging in, checking out, paying. Detailed rules such as "free shipping from 50" belong in fast unit tests.</p>

<h4>Reading the errors you will meet</h4>
<div class="tbl-wrap"><table><tr><th>Error</th><th>What it usually means</th></tr>
<tr><td>Timed out waiting for the element to be visible</td><td>It never appeared. A wrong name, a typo in the text, or the action before it failed (for example a wrong password, so no dashboard).</td></tr>
<tr><td>Strict mode violation: the locator resolved to 2 elements</td><td>Your locator matches more than one element, so Playwright refuses to guess. Add the <code>name</code>, or be more specific.</td></tr>
<tr><td>A test that passes or fails at random</td><td>Often a missing <code>await</code>, so a step raced ahead of the browser.</td></tr></table></div>
<div class="mistake"><b>Common mistake</b>Forgetting <code>await</code> before an action or an <code>expect</code>. The line starts but nothing waits for it, so the test may finish before the click has happened, or report a failure in the wrong place. If a line touches the page, it needs <code>await</code>.</div>
<div class="try"><b>Try it in your head</b>The app's error message appears in an element with <code>role="alert"</code>. Which locator and matcher check it shows the right text after a wrong password? <code>page.getByRole('alert')</code> with <code>toHaveText('Invalid email or password')</code>, behind an <code>await</code>. Because <code>toHaveText</code> waits, it doesn't matter that the message appears a moment after the click.</div>

<h4>Recap</h4>
<ul>
<li>E2E tests drive a real browser like a user. Keep them few and focused on critical journeys.</li>
<li>Each test gets a fresh <code>page</code>; every browser step is <code>await</code>ed, starting with <code>page.goto('/')</code>.</li>
<li>Find elements with user-facing locators: <code>getByRole</code> with a name, <code>getByLabel</code>, <code>getByText</code>.</li>
<li>Act with <code>fill</code> and <code>click</code>; check with auto-waiting assertions like <code>toBeVisible()</code> and <code>toHaveText()</code>.</li>
<li>Never use fixed sleeps; wait for the condition you actually care about.</li>
</ul>
`);

explain('t6',`
<h4>Writing the exam before the lesson</h4>
<p>So far you have written code first and tests afterwards. That works, but it has two weaknesses. It is tempting to skip the tests when you are busy, so some behaviour never gets one. And a test written after the code tends to check what the code <i>does</i>, rather than what it <i>should</i> do, so it can quietly bless a bug.</p>
<p><b>Test-driven development</b>, or <b>TDD</b>, flips the order. Before writing any code for a behaviour, you write a test that describes it. The test fails, because the code doesn't exist yet. Then you write just enough code to make it pass. Then you tidy up. Then you repeat, one small behaviour at a time.</p>
<p>The payoff is that you decide what "done" means <b>before</b> you start, in a form the computer can check. Every behaviour ends up with a test, because no behaviour is written without one. And the growing set of tests gives you the confidence to clean up and change code later.</p>

<h4>The cycle: red, green, refactor</h4>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="TDD cycle: red, then green, then refactor, then back to red">
<rect class="bx-bad" x="140" y="14" width="140" height="52" rx="10"/><text class="t-b t-bad" x="210" y="36" text-anchor="middle">1 Red</text><text class="t-s" x="210" y="56" text-anchor="middle">a failing test</text>
<rect class="bx-ok" x="265" y="146" width="140" height="52" rx="10"/><text class="t-b t-ok" x="335" y="168" text-anchor="middle">2 Green</text><text class="t-s" x="335" y="188" text-anchor="middle">simplest code</text>
<rect class="bx-info" x="15" y="146" width="140" height="52" rx="10"/><text class="t-b t-info" x="85" y="168" text-anchor="middle">3 Refactor</text><text class="t-s" x="85" y="188" text-anchor="middle">tidy, stay green</text>
<path class="ln" d="M266 66L318 136"/><polygon class="ah" points="311,136 323,132 322,145"/>
<path class="ln" d="M265 172h-102"/><polygon class="ah" points="165,166 165,178 157,172"/>
<path class="ln" d="M100 146L152 76"/><polygon class="ah" points="145,77 157,81 155,68"/>
<text class="t-s" x="210" y="112" text-anchor="middle">repeat for each</text><text class="t-s" x="210" y="128" text-anchor="middle">small behaviour</text>
</svg><figcaption>The TDD loop. Red: write one small test and watch it fail. Green: write the simplest code that makes it pass. Refactor: improve the code while every test stays green. Then start again with the next behaviour.</figcaption></figure>
<ol>
<li><b>Red.</b> Write one small test for the next behaviour. Run it and <b>watch it fail</b>. That proves the test can fail, and that the behaviour really is missing.</li>
<li><b>Green.</b> Write the <b>simplest</b> code that makes the test pass. Not the clever version, not the general version. Just enough.</li>
<li><b>Refactor.</b> Now that the tests protect you, improve the code: clearer names, less repetition, a better structure. Run the tests after each change. They must stay green.</li>
</ol>
<p>The steps are small on purpose. If a test goes red, the bug can only be in the few lines you just wrote.</p>

<h4>The task: <code>slugify</code></h4>
<p>A <b>slug</b> is the readable part of a web address, like the <code>hello-world</code> in <code>/blog/hello-world</code>. <code>slugify(title)</code> should turn a post title into one: lower case, words joined by dashes, no punctuation. The starter function just returns an empty string, <code>''</code>.</p>

<h4>Round one: red, then green</h4>
<p>Start by writing tests for the basic behaviour, such as <code>'Hello World'</code> becoming <code>'hello-world'</code>, and a single word like <code>'Docker'</code> becoming <code>'docker'</code>. Run them. Both fail:</p>
<pre class="snip">✖ lowercases and joins words with dashes
  expected '' to be 'hello-world'</pre>
<p>That is a <b>good</b> failure: it fails for the right reason, because the function returns nothing useful yet. If a brand-new test passes immediately, be suspicious: either the behaviour already exists, or the test is not checking what you think.</p>
<p>Now the simplest code that passes. Three built-in string tools do it:</p>
<pre class="snip">'Hello World'.toLowerCase()     // 'hello world'
'hello world'.split(' ')        // ['hello', 'world']: cut at each space
['hello', 'world'].join('-')    // 'hello-world': glue with dashes</pre>
<p>Chain them inside <code>slugify</code>, run the tests, and both go green. Notice what you did <i>not</i> do: you did not worry about punctuation or double spaces. No test asks for that yet, so in TDD you don't build it yet.</p>

<h4>Round two: a new requirement means a new failing test</h4>
<p>Real titles are messier. A new requirement arrives: strip punctuation, ignore extra spaces, and collapse repeated dashes. In TDD you do <b>not</b> start by changing the code. You start by writing tests for the new behaviour, such as <code>'  Hello,   World!  '</code> becoming <code>'hello-world'</code>, and <code>'Git -- the basics'</code> becoming <code>'git-the-basics'</code>.</p>
<p>Run them. The two old tests still pass, and the two new ones fail. Look at what the current code actually produces, because it shows exactly what is missing:</p>
<pre class="snip">slugify('  Hello,   World!  ')  // '--hello,---world!--'
slugify('Git -- the basics')    // 'git----the-basics'</pre>
<p>Every space became a dash, including the spaces at the ends and the runs of spaces, and the comma and exclamation mark survived. That is the to-do list for the next green step.</p>

<h4>Round two, green: the tools you need</h4>
<p>Three more tools close the gap:</p>
<ul>
<li><code>.trim()</code> removes spaces from both ends of a string.</li>
<li><code>.replace(pattern, replacement)</code> swaps parts of a string. With a <b>regular expression</b> as the pattern, it can match whole kinds of characters at once.</li>
<li>A regular expression is written between slashes. <code>[...]</code> means "any one of these characters", and <code>[^...]</code> means "any character <i>except</i> these". <code>\\s</code> means any whitespace, <code>+</code> means "one or more in a row", and the <code>g</code> flag at the end means "every match, not just the first".</li>
</ul>
<p>So <code>/[^a-z0-9\\s-]/g</code> matches every character that is not a lowercase letter, a digit, whitespace or a dash: in other words, punctuation. Replace those with <code>''</code> to delete them. And <code>/[\\s-]+/g</code> matches each run of spaces and dashes, so replacing those with a single <code>'-'</code> collapses them.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="A messy title passing through lowercase, trim, drop punctuation and collapse steps">
<g class="t-s"><text class="t-s" x="10" y="35">input</text><text class="t-s" x="10" y="77">lowercase</text><text class="t-s" x="10" y="119">trim</text><text class="t-s" x="10" y="161">no punctuation</text><text class="t-s" x="10" y="203">collapse to -</text></g>
<rect class="bx" x="130" y="12" width="280" height="34" rx="6"/><text class="t-m" x="142" y="35">··Hello,···World!··</text>
<rect class="bx" x="130" y="54" width="280" height="34" rx="6"/><text class="t-m" x="142" y="77">··hello,···world!··</text>
<rect class="bx" x="130" y="96" width="280" height="34" rx="6"/><text class="t-m" x="142" y="119">hello,···world!</text>
<rect class="bx-a" x="130" y="138" width="280" height="34" rx="6"/><text class="t-m" x="142" y="161">hello···world</text>
<rect class="bx-ok" x="130" y="180" width="280" height="34" rx="6"/><text class="t-m t-ok" x="142" y="203">hello-world</text>
</svg><figcaption>The messy title at each stage, with every space drawn as a small dot. Lowercasing changes the letters. Trimming removes the spaces at both ends. Dropping punctuation removes the comma and the exclamation mark. Finally each run of spaces or dashes becomes one dash, giving hello-world.</figcaption></figure>
<p>Order matters. Trim before collapsing, or the end spaces become end dashes. For awkward inputs like <code>'- Hi -'</code>, one more replace that removes a dash at the very start or end of the string makes the result clean.</p>

<h4>Refactor: tidy while green</h4>
<p>Once all four tests pass, look at the code with fresh eyes. Is each step obvious? A long chain of <code>.replace</code> calls reads well if each line is on its own and has a short comment saying what it does. Could a name be clearer? Is anything left over from the first, simpler version?</p>
<p><b>Refactoring</b> means changing the structure of code without changing its behaviour. Because the four tests describe the behaviour exactly, you can change anything you like and know within a second whether you broke something. Run the tests after every small change. If one goes red, undo the last change. That safety is the whole reason the refactor step comes <i>after</i> green.</p>
<div class="mistake"><b>Common mistake</b>Taking giant steps: writing ten tests and a hundred lines, then facing six failures at once. Keep each loop small, one behaviour per test, and the cause of every failure is obvious.</div>
<div class="mistake"><b>Common mistake</b>Skipping the refactor step because "it works". Code written in many quick green steps gets messy fast. A minute of tidying each loop, with the tests as a safety net, keeps it healthy.</div>
<div class="try"><b>Try it in your head</b>After round one, the code is <code>title.toLowerCase().split(' ').join('-')</code>. What does it return for <code>'Docker  Compose'</code>, with two spaces? Splitting on single spaces gives <code>['docker', '', 'compose']</code>, so the result is <code>'docker--compose'</code>, with a double dash. In TDD, noticing that means writing a failing test for it first, and only then fixing the code.</div>

<h4>Recap</h4>
<ul>
<li>TDD is a loop: red (a failing test), green (the simplest code that passes), refactor (tidy up while staying green).</li>
<li>Always watch a new test fail first, and make sure it fails for the right reason.</li>
<li>Write only the code the current tests ask for; a new requirement starts with a new failing test.</li>
<li>Refactor in small steps, running the tests after each one.</li>
<li>The result: a clear definition of done, a test for every behaviour, and the confidence to change code later.</li>
</ul>
`);
