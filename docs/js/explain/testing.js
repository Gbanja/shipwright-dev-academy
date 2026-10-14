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
