/* dsa: "Explained step by step" walkthroughs. */

explain('ab1',`
<h4>What an algorithm is, and why you should care</h4>
<p>An <b>algorithm</b> is a recipe: a list of exact steps that turns an input into an output. The input might be a list of prices, and the output might be the cheapest one. "Exact" is the important word. A person can cope with "find the cheapest", but a computer needs to be told how: where to start, what to compare, and when to stop.</p>
<p>You already run algorithms every day without calling them that. Looking for your keys, you check each pocket in turn and stop when you feel them. Finding the tallest person in a room, you remember the tallest one so far and compare each new person with them. This lesson takes those everyday habits and writes them down as code.</p>
<p>Why bother learning this as a separate skill? Because almost every program, from a shopping basket to a search engine, is built from a handful of small, repeated recipes. Once you can recognise them, new problems stop looking new.</p>
<div class="analogy"><b>Think of it like</b>A cooking recipe written for someone who has never been in a kitchen. You cannot say "make a sauce". You have to say "put the pan on the heat, add the butter, stir until it melts". Writing an algorithm is writing at that level of detail.</div>

<h4>The habit that matters most: solve it by hand first</h4>
<p>Before you write any code, take a tiny example and do it yourself, slowly, on paper. Say out loud what you are doing at each step. Those sentences <i>are</i> the algorithm. The code is just a translation of them.</p>
<p>For example, to find the biggest number in <code>[4, 9, 2]</code>:</p>
<ol>
<li>Start by treating the first number, 4, as the best so far.</li>
<li>Look at 9. It is bigger than 4, so 9 becomes the best.</li>
<li>Look at 2. It is not bigger than 9, so nothing changes.</li>
<li>There are no more numbers. The answer is the best so far: 9.</li>
</ol>
<p>Notice that you remembered exactly one thing as you went: the best so far. Spotting <b>what you need to remember</b> is most of the work in designing an algorithm.</p>

<h4>A quick recap: arrays and indexes</h4>
<p>You met arrays in the Frontend track. An <b>array</b> is an ordered list of values. Each value sits in a numbered slot called an <b>index</b>, and the numbering starts at 0, not 1. The <code>length</code> property tells you how many items there are.</p>
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="An array of four numbers with indexes 0 to 3 underneath">
<text class="t-m" x="210" y="28" text-anchor="middle">const numbers = [4, 9, 2, 7]</text>
<rect class="bx" x="50" y="48" width="80" height="50" rx="4"/><rect class="bx" x="130" y="48" width="80" height="50" rx="4"/><rect class="bx" x="210" y="48" width="80" height="50" rx="4"/><rect class="bx" x="290" y="48" width="80" height="50" rx="4"/>
<g text-anchor="middle"><text class="t-m" x="90" y="80" style="font-size:20px">4</text><text class="t-m" x="170" y="80" style="font-size:20px">9</text><text class="t-m" x="250" y="80" style="font-size:20px">2</text><text class="t-m" x="330" y="80" style="font-size:20px">7</text>
<text class="t-b t-a" x="90" y="122">0</text><text class="t-b t-a" x="170" y="122">1</text><text class="t-b t-a" x="250" y="122">2</text><text class="t-b t-a" x="330" y="122">3</text>
<text class="t-s" x="210" y="158">index 0 is the first item; length is 4, last index is 3</text></g>
</svg><figcaption>An array of four numbers. The values sit in slots numbered from 0, so <code>numbers[1]</code> is 9. The length is 4, which means the last index is always one less than the length: 3.</figcaption></figure>
<p>That "last index is length minus one" rule causes more bugs than almost anything else in beginner code, so keep it in mind. You will see it again when we reverse a word.</p>

<h4>Walking through an array with a loop</h4>
<p>Nearly every algorithm in this lesson visits each item once. JavaScript gives you two common ways to do that:</p>
<pre class="snip">// 1. for...of: gives you each value, one at a time
for (const n of numbers) {
  console.log(n);          // 4, then 9, then 2, then 7
}

// 2. A counting loop: gives you each index
for (let i = 0; i &lt; numbers.length; i++) {
  console.log(i, numbers[i]);  // 0 4, then 1 9, ...
}</pre>
<p>Use <code>for...of</code> when you only care about the values. Use a counting loop when you need the position, or when you want to walk in a different direction, such as backwards.</p>

<h4>Pattern 1: the running total</h4>
<p>To add up a list, keep one variable, the <b>running total</b>. Start it at 0, then add each number to it as you pass.</p>
<pre class="snip">let total = 0;                 // nothing added yet
for (const n of numbers) total += n;
return total;</pre>
<p>Let's trace <code>sum([1, 2, 3])</code>, writing down the variable after each step. This is called a <b>trace</b>, and it is the best debugging tool you have.</p>
<div class="tbl-wrap"><table><tr><th>Step</th><th>n</th><th>total after the step</th></tr>
<tr><td>start</td><td>(none)</td><td>0</td></tr>
<tr><td>1</td><td>1</td><td>0 + 1 = 1</td></tr>
<tr><td>2</td><td>2</td><td>1 + 2 = 3</td></tr>
<tr><td>3</td><td>3</td><td>3 + 3 = 6</td></tr></table></div>
<p>Why start at 0? Because adding 0 changes nothing, so it is the natural "empty" value. It also handles the <b>edge case</b> for free: an edge case is an unusual input at the boundary, like an empty list. With <code>sum([])</code> the loop runs zero times and you return 0, which is exactly right.</p>

<h4>Pattern 2: best so far</h4>
<p>To find the biggest number, remember the <b>best so far</b> and replace it whenever you see something better. This is the hand method from earlier, turned into code:</p>
<pre class="snip">if (numbers.length === 0) return null;  // nothing to compare
let best = numbers[0];                   // first item wins so far
for (const n of numbers) {
  if (n &gt; best) best = n;               // found a better one
}
return best;</pre>
<p>The empty list needs special care here. There is no biggest number in an empty list, so the lesson asks you to return <code>null</code>, JavaScript's value for "nothing". You must check for that <i>before</i> reading <code>numbers[0]</code>.</p>
<div class="mistake"><b>Common mistake</b>Starting with <code>let best = 0</code>. It works for <code>[4, 9, 2]</code>, so it looks fine, but try <code>[-3, -1, -7]</code>. Every number is smaller than 0, so <code>best</code> never changes and you return 0, a number that is not even in the list. Starting from the first real item avoids the problem completely.</div>

<h4>Pattern 3: counting matches</h4>
<p>To count how often something appears, keep a counter that starts at 0 and goes up by one each time you find a match. <code>count++</code> is shorthand for "add one to count".</p>
<pre class="snip">let count = 0;
for (const x of items) {
  if (x === target) count++;   // only matches are counted
}
return count;</pre>
<p>For <code>countOf(['a', 'b', 'a'], 'a')</code> the counter goes 0, 1, 1, 2, and the answer is 2. Notice the shape: all three patterns have a variable set up <i>before</i> the loop, updated <i>inside</i> it, and returned <i>after</i> it. Once you see that shape, you will find it everywhere.</p>

<h4>Walking backwards, and two pointers</h4>
<p>To reverse a word without <code>.reverse()</code>, walk the indexes from the last one down to 0 and build a new string. The last index is <code>text.length - 1</code>, and the loop continues while <code>i &gt;= 0</code>, so index 0 is included. For <code>'code'</code>, i goes 3, 2, 1, 0, and the output grows from <code>'e'</code> to <code>'ed'</code>, <code>'edo'</code> and finally <code>'edoc'</code>.</p>
<p>A <b>palindrome</b> is a word that reads the same in both directions, like "level". You could reverse it and compare, but there is a neater method called <b>two pointers</b>. A pointer here just means a variable holding an index. Put one, <code>start</code>, at the beginning and another, <code>end</code>, at the end. Compare the two letters, then move both pointers one step inwards. Stop when they meet.</p>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="Two pointers moving inwards over the word racecar">
<g text-anchor="middle">
<text class="t-s" x="45" y="38">step 1</text><text class="t-s" x="45" y="88">step 2</text><text class="t-s" x="45" y="138">step 3</text><text class="t-s" x="45" y="188">stop</text>
</g>
<rect class="bx-a" x="100" y="15" width="36" height="36"/><rect class="bx" x="136" y="15" width="36" height="36"/><rect class="bx" x="172" y="15" width="36" height="36"/><rect class="bx" x="208" y="15" width="36" height="36"/><rect class="bx" x="244" y="15" width="36" height="36"/><rect class="bx" x="280" y="15" width="36" height="36"/><rect class="bx-a" x="316" y="15" width="36" height="36"/>
<rect class="bx" x="100" y="65" width="36" height="36"/><rect class="bx-a" x="136" y="65" width="36" height="36"/><rect class="bx" x="172" y="65" width="36" height="36"/><rect class="bx" x="208" y="65" width="36" height="36"/><rect class="bx" x="244" y="65" width="36" height="36"/><rect class="bx-a" x="280" y="65" width="36" height="36"/><rect class="bx" x="316" y="65" width="36" height="36"/>
<rect class="bx" x="100" y="115" width="36" height="36"/><rect class="bx" x="136" y="115" width="36" height="36"/><rect class="bx-a" x="172" y="115" width="36" height="36"/><rect class="bx" x="208" y="115" width="36" height="36"/><rect class="bx-a" x="244" y="115" width="36" height="36"/><rect class="bx" x="280" y="115" width="36" height="36"/><rect class="bx" x="316" y="115" width="36" height="36"/>
<rect class="bx" x="100" y="165" width="36" height="36"/><rect class="bx" x="136" y="165" width="36" height="36"/><rect class="bx" x="172" y="165" width="36" height="36"/><rect class="bx-ok" x="208" y="165" width="36" height="36"/><rect class="bx" x="244" y="165" width="36" height="36"/><rect class="bx" x="280" y="165" width="36" height="36"/><rect class="bx" x="316" y="165" width="36" height="36"/>
<g class="t-m" text-anchor="middle">
<text class="t-m" x="118" y="38">r</text><text class="t-m" x="154" y="38">a</text><text class="t-m" x="190" y="38">c</text><text class="t-m" x="226" y="38">e</text><text class="t-m" x="262" y="38">c</text><text class="t-m" x="298" y="38">a</text><text class="t-m" x="334" y="38">r</text>
<text class="t-m" x="118" y="88">r</text><text class="t-m" x="154" y="88">a</text><text class="t-m" x="190" y="88">c</text><text class="t-m" x="226" y="88">e</text><text class="t-m" x="262" y="88">c</text><text class="t-m" x="298" y="88">a</text><text class="t-m" x="334" y="88">r</text>
<text class="t-m" x="118" y="138">r</text><text class="t-m" x="154" y="138">a</text><text class="t-m" x="190" y="138">c</text><text class="t-m" x="226" y="138">e</text><text class="t-m" x="262" y="138">c</text><text class="t-m" x="298" y="138">a</text><text class="t-m" x="334" y="138">r</text>
<text class="t-m" x="118" y="188">r</text><text class="t-m" x="154" y="188">a</text><text class="t-m" x="190" y="188">c</text><text class="t-m" x="226" y="188">e</text><text class="t-m" x="262" y="188">c</text><text class="t-m" x="298" y="188">a</text><text class="t-m" x="334" y="188">r</text>
<text class="t-m t-ok" x="388" y="38">r=r</text><text class="t-m t-ok" x="388" y="88">a=a</text><text class="t-m t-ok" x="388" y="138">c=c</text><text class="t-b t-ok" x="388" y="188">true</text>
</g>
</svg><figcaption>Checking "racecar" with two pointers. Step 1 compares the outer pair, r and r. Step 2 compares a and a, step 3 compares c and c. Now both pointers sit on the middle letter, so there is nothing left to compare and the word is a palindrome.</figcaption></figure>
<p>In code that is a <code>while (start &lt; end)</code> loop. Inside it, if <code>word[start] !== word[end]</code>, return <code>false</code> straight away: one mismatch is enough. Otherwise do <code>start++</code> and <code>end--</code>. If the loop finishes without a mismatch, return <code>true</code>. For <code>'code'</code>, the very first comparison, c against e, fails, so you stop after one step. An empty word never enters the loop and counts as a palindrome, which is what the checker expects.</p>
<div class="mistake"><b>Common mistake</b>Off-by-one errors. Writing <code>i &lt;= numbers.length</code> instead of <code>i &lt; numbers.length</code> makes the loop visit one index past the end, and <code>numbers[4]</code> in a four-item array is <code>undefined</code>. Starting a backwards loop at <code>text.length</code> has the same problem. When something is off by exactly one, check your start index and your stop condition first.</div>

<h4>Counting steps: how much work does it do?</h4>
<p>Here is the idea that the rest of this track is built on. Count how many times the loop body runs. For <code>sum</code>, <code>max</code> and <code>countOf</code>, each item is looked at exactly once, so a list of 10 items takes about 10 steps and a list of a million takes about a million. If the list doubles, the work doubles. Work that grows in step with the input like this is called <b>linear</b>.</p>
<p>The palindrome check is a little cheaper: each step looks at two letters, so a 7-letter word needs only 3 comparisons. That is about half the length, but it still doubles when the word doubles, so it is linear too.</p>
<p>We don't count every tiny operation, such as each addition or each comparison. We count how the number of steps <i>grows</i> as the input grows. The next lesson gives this a name, Big-O, and shows algorithms that grow much faster than linear, which is where programs start to feel slow.</p>
<div class="try"><b>Try it in your head</b>Trace <code>max([-3, -1, -7])</code>. Best starts at -3. Next is -1, which is bigger, so best becomes -1. Next is -7, which is smaller, so nothing changes. The answer is -1. Now: how many steps does <code>countOf</code> take on a list of 500 items? About 500, one per item, whether or not any of them match.</div>

<h4>Recap</h4>
<ul>
<li>An algorithm is an exact recipe. Solve a tiny example by hand first, and the steps you say out loud become your code.</li>
<li>Arrays are numbered from 0, so the last index is <code>length - 1</code>.</li>
<li>Three core patterns: a running total, the best so far, and a counter. Set up before the loop, update inside, return after.</li>
<li>Two pointers walk in from both ends; they solve palindromes in one pass.</li>
<li>Always test edge cases on purpose: an empty list, one item, all negative numbers.</li>
<li>A loop that visits each item once does work in proportion to the input: double the list, double the work.</li>
</ul>
`);

explain('a1',`
<h4>Why speed needs its own language</h4>
<p>Two programs can give exactly the same answer and still behave completely differently. One finishes instantly on a list of a million items. The other is fine on 10 items, slow on 10,000, and never finishes on a million. On your laptop, with a small test list, you cannot tell them apart. In production, with real data, one of them takes the site down.</p>
<p>Timing your code with a stopwatch does not settle the question, because the result depends on the computer, the browser and what else is running. What you really want to know is: <b>if the input gets bigger, how much more work does my code do?</b> <b>Big-O notation</b> is the short, shared language programmers use to answer that question.</p>
<div class="analogy"><b>Think of it like</b>Planning a party. Sending one group message costs the same whether you invite 5 or 500 people. Phoning each guest grows with the guest list. Asking every guest to shake hands with every other guest grows much, much faster: 5 guests make 10 handshakes, 500 guests make nearly 125,000.</div>

<h4>Counting steps as the input grows</h4>
<p>In the last lesson you counted how many times a loop runs. Big-O builds on that. We call the size of the input <b>n</b>: the number of items in the array, or letters in the string. Then we ask how the number of steps grows as n grows.</p>
<p>Big-O deliberately ignores two kinds of detail:</p>
<ul>
<li><b>Constant factors.</b> A loop that does 3 small things per item takes about 3n steps. We still call it O(n), said "oh of n", because doubling n still doubles the work. The 3 depends on the machine; the doubling does not.</li>
<li><b>Smaller terms.</b> An algorithm that takes n² + n steps is called O(n²). When n is a million, n² is a million million and the extra n is a rounding error.</li>
</ul>
<p>What is left is the <b>shape</b> of the growth. That shape is what decides whether code survives big inputs.</p>

<h4>The five shapes you will meet</h4>
<p>Let's build them up one at a time, from best to worst.</p>
<ul>
<li><b>O(1), constant.</b> The work does not depend on n at all. Reading <code>arr[5]</code>, or looking up a key in a <code>Map</code>, takes the same time for 10 items or 10 million.</li>
<li><b>O(log n), logarithmic.</b> Each step throws away half of what is left. "Log n" simply means how many times you can halve n before you reach 1. Halving a million gives 500,000, then 250,000, and so on; after about 20 halvings you are down to one item. So a million items need only about 20 steps. Binary search, coming later in this track, works like this.</li>
<li><b>O(n), linear.</b> One pass over the data. Your <code>sum</code> and <code>max</code> from the last lesson are O(n).</li>
<li><b>O(n log n).</b> About n steps, done log n times. Good sorting algorithms, including JavaScript's built-in <code>.sort()</code>, are O(n log n). It is a little worse than linear and far better than quadratic.</li>
<li><b>O(n²), quadratic.</b> For every item, you loop over the items again. Ten items make 100 steps; a million items make a million million.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="Growth curves for O(1), O(log n), O(n), O(n log n) and O(n squared)">
<line class="ln" x1="50" y1="20" x2="50" y2="200"/><line class="ln" x1="50" y1="200" x2="330" y2="200"/>
<text class="t-s" x="6" y="114">steps</text>
<text class="t-s" x="190" y="222" text-anchor="middle">input size n, growing to the right</text>
<polyline class="ln-ok" fill="none" points="50,196 330,196"/>
<polyline class="ln-ok" fill="none" points="50,200 57,200 64,196 78,191 106,187 162,183 274,179 330,177"/>
<polyline class="ln" fill="none" points="50,200 330,30"/>
<polyline class="ln-d" fill="none" points="50,200 64,192 78,166 92,134 106,98 120,59 130,30"/>
<polyline class="ln-a" fill="none" points="50,200 57,196 64,183 71,162 78,132 85,94 92,47 94,30"/>
<text class="t-s t-ok" x="338" y="203">O(1)</text>
<text class="t-s t-ok" x="338" y="181">O(log n)</text>
<text class="t-s" x="338" y="36">O(n)</text>
<text class="t-s" x="136" y="30">O(n log n)</text>
<text class="t-s t-a" x="90" y="22" text-anchor="end">O(n²)</text>
</svg><figcaption>How the number of steps grows as the input grows. O(1) stays flat. O(log n) rises so slowly it barely leaves the floor. O(n) is a straight diagonal. O(n log n) bends upwards, and O(n squared) shoots off the top of the chart almost immediately.</figcaption></figure>
<p>The chart is easier to believe with real numbers:</p>
<div class="tbl-wrap"><table><tr><th>Big-O</th><th>n = 10</th><th>n = 1,000</th><th>n = 1,000,000</th></tr>
<tr><td>O(1)</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>O(log n)</td><td>about 3</td><td>about 10</td><td>about 20</td></tr>
<tr><td>O(n)</td><td>10</td><td>1,000</td><td>1,000,000</td></tr>
<tr><td>O(n log n)</td><td>about 33</td><td>about 10,000</td><td>about 20,000,000</td></tr>
<tr><td>O(n²)</td><td>100</td><td>1,000,000</td><td>1,000,000,000,000</td></tr></table></div>
<p>A computer does very roughly a few hundred million to a billion simple steps per second. Twenty million steps is a blink. A million million steps takes many minutes at best, and that is just one call.</p>

<h4>Spotting O(n²): nested loops</h4>
<p>Here is the lesson's starter code. It checks whether any value appears twice by comparing every pair of items:</p>
<pre class="snip">for (let i = 0; i &lt; arr.length; i++) {
  for (let j = i + 1; j &lt; arr.length; j++) {
    if (arr[i] === arr[j]) return true;
  }
}
return false;</pre>
<p>The outer loop picks an item. The inner loop compares it with every item after it. Starting <code>j</code> at <code>i + 1</code> avoids comparing an item with itself, or comparing the same pair twice.</p>
<figure class="fig"><svg viewBox="0 0 420 265" role="img" aria-label="Grid of all pairs for a five item array; the ten pairs above the diagonal are compared">
<g transform="translate(-30,0)">
<g text-anchor="middle">
<text class="t-s" x="210" y="16">j, the inner loop</text>
<text class="t-m" x="150" y="40">3</text><text class="t-m" x="190" y="40">1</text><text class="t-m" x="230" y="40">4</text><text class="t-m" x="270" y="40">1</text><text class="t-m" x="310" y="40">5</text>
<text class="t-m" x="112" y="75">3</text><text class="t-m" x="112" y="115">1</text><text class="t-m" x="112" y="155">4</text><text class="t-m" x="112" y="195">1</text><text class="t-m" x="112" y="235">5</text>
<text class="t-s" x="68" y="160">i, outer</text>
</g>
<rect class="bx" x="130" y="50" width="40" height="40"/><rect class="bx-a" x="170" y="50" width="40" height="40"/><rect class="bx-a" x="210" y="50" width="40" height="40"/><rect class="bx-a" x="250" y="50" width="40" height="40"/><rect class="bx-a" x="290" y="50" width="40" height="40"/>
<rect class="bx" x="130" y="90" width="40" height="40"/><rect class="bx" x="170" y="90" width="40" height="40"/><rect class="bx-a" x="210" y="90" width="40" height="40"/><rect class="bx-ok" x="250" y="90" width="40" height="40"/><rect class="bx-a" x="290" y="90" width="40" height="40"/>
<rect class="bx" x="130" y="130" width="40" height="40"/><rect class="bx" x="170" y="130" width="40" height="40"/><rect class="bx" x="210" y="130" width="40" height="40"/><rect class="bx-a" x="250" y="130" width="40" height="40"/><rect class="bx-a" x="290" y="130" width="40" height="40"/>
<rect class="bx" x="130" y="170" width="40" height="40"/><rect class="bx" x="170" y="170" width="40" height="40"/><rect class="bx" x="210" y="170" width="40" height="40"/><rect class="bx" x="250" y="170" width="40" height="40"/><rect class="bx-a" x="290" y="170" width="40" height="40"/>
<rect class="bx" x="130" y="210" width="40" height="40"/><rect class="bx" x="170" y="210" width="40" height="40"/><rect class="bx" x="210" y="210" width="40" height="40"/><rect class="bx" x="250" y="210" width="40" height="40"/><rect class="bx" x="290" y="210" width="40" height="40"/>
<text class="t-b t-ok" x="270" y="115" text-anchor="middle">=</text>
</g>
<g text-anchor="middle"><text class="t-b" x="358" y="120">10 pairs</text><text class="t-s" x="358" y="140">for n = 5</text><text class="t-s" x="358" y="170">n × (n − 1) ÷ 2</text></g>
</svg><figcaption>Every pair the nested loops can compare for the array 3, 1, 4, 1, 5. The ten shaded cells above the diagonal are the comparisons. The green cell is the pair of ones, where the function returns true. With no duplicate, all ten pairs get checked.</figcaption></figure>
<p>For n items there are n × (n − 1) ÷ 2 pairs. Drop the constant half and the small term, and that is O(n²). The checker for this lesson runs your function on <b>200,000</b> different numbers. That is about 20 billion comparisons for the starter version: far beyond the half-second limit.</p>

<h4>The fix: trade memory for speed with a Set</h4>
<p>The starter is slow because, for each item, it searches the rest of the array again. What if you could instantly answer "have I seen this value before?" Then one pass would be enough.</p>
<p>A <b>Set</b> is a built-in JavaScript collection that holds unique values. Its two key methods are <code>set.add(x)</code> and <code>set.has(x)</code>, and both take O(1) time on average, however big the set gets. (The next lesson shows the trick that makes this possible, called hashing.)</p>
<p>So the plan, in plain words: walk through the array once. For each value, ask the set whether you have seen it. If yes, you have found a duplicate, so stop. If no, add it to the set and carry on. Let's trace it on <code>[3, 1, 4, 1, 5]</code>:</p>
<div class="tbl-wrap"><table><tr><th>Value</th><th>Seen before?</th><th>Set afterwards</th></tr>
<tr><td>3</td><td>no</td><td>{3}</td></tr>
<tr><td>1</td><td>no</td><td>{3, 1}</td></tr>
<tr><td>4</td><td>no</td><td>{3, 1, 4}</td></tr>
<tr><td>1</td><td><b>yes</b>, return true</td><td>(stopped)</td></tr></table></div>
<p>Each item costs one <code>has</code> and at most one <code>add</code>, both O(1). That is n items times a constant, which is O(n). On 200,000 items it does a few hundred thousand cheap steps instead of 20 billion.</p>

<h4>Space complexity: the price you paid</h4>
<p>Big-O measures memory as well as time. This is called <b>space complexity</b>: how much extra memory your code needs as n grows. The nested-loop version uses only two counters, so its extra space is O(1). The Set version may store every item before it finishes, so its extra space is O(n).</p>
<p>That is the <b>time versus space trade-off</b>: you spent memory to save time. It is one of the most common moves in programming, and usually a very good deal, because memory is cheap and users' patience is not.</p>
<div class="mistake"><b>Common mistake</b>Hiding a loop inside a method. <code>arr.includes(x)</code> and <code>arr.indexOf(x)</code> look like single steps, but they scan the array from the start, so each one is O(n). Calling them inside a loop gives you O(n²) again, just with less visible code. A Set or Map lookup is the O(1) version.</div>
<div class="mistake"><b>Common mistake</b>Thinking Big-O tells you the time in seconds. It doesn't. An O(n²) function on 20 items can beat an O(n) one. Big-O tells you what happens as the input grows, which is where real systems get into trouble.</div>

<h4>When the checker says "too slow"</h4>
<p>If your answer is correct but the time check fails, the code is fine and the algorithm is not. Look for a loop inside a loop, or a hidden scan like <code>includes</code> inside a loop. Ask yourself what you keep searching for, and whether a Set or Map could remember it instead. If the page freezes for a while before failing, that is O(n²) chewing through 200,000 items.</p>
<div class="try"><b>Try it in your head</b>A function has one loop over the array, and inside it a second loop that always runs exactly 3 times. What is its Big-O? The inner loop does not grow with n, so it is 3n steps: O(n). And roughly how many halving steps would it take to search a sorted list of 1,000 items? Halve 1,000 about ten times to reach 1, so about 10.</div>

<h4>Recap</h4>
<ul>
<li>Big-O describes how work grows as the input size n grows, ignoring constant factors and smaller terms.</li>
<li>From best to worst: O(1), O(log n), O(n), O(n log n), O(n²).</li>
<li>Nested loops over the same data are the classic sign of O(n²).</li>
<li>A Set or Map gives O(1) average lookups, which often turns O(n²) into O(n).</li>
<li>Space complexity counts extra memory: the Set version uses O(n) memory to save time.</li>
</ul>
`);

explain('a2',`
<h4>The problem: finding things quickly</h4>
<p>Most programs spend their time finding things. Has this user signed up before? Which product has this barcode? Have I already seen this number? In the last lesson you saw that searching an array again and again turns a fast program into an O(n²) slow one, and that a Set fixed it.</p>
<p>This lesson opens up that trick. You will see why arrays are fast in one way and slow in another, how a <b>hash map</b> finds any item almost instantly, and how one simple move, "remember what you have seen in a map", solves a surprising number of interview questions.</p>

<h4>Arrays: fast by position, slow by value</h4>
<p>An array stores its items side by side in memory, in numbered slots. Because the slots are all the same size and in a row, the computer can jump straight to slot 500 with a bit of arithmetic. So reading <code>arr[500]</code> is O(1): it costs the same for any index.</p>
<p>But if you ask "where is the value 42?", the array has no idea. It must check slot 0, then slot 1, then slot 2, until it finds 42 or runs out. That is O(n). Methods like <code>includes</code> and <code>indexOf</code> do exactly this scan.</p>
<p><b>Strings</b> behave like arrays of characters. <code>'code'[0]</code> is <code>'c'</code>, <code>'code'.length</code> is 4, and <code>for (const c of 'code')</code> visits each letter. Everything in this lesson works on both.</p>
<div class="tbl-wrap"><table><tr><th>Question you ask</th><th>Array</th><th>Hash map</th></tr>
<tr><td>What is at position 500?</td><td>O(1)</td><td>(not what it is for)</td></tr>
<tr><td>Is this value in here?</td><td>O(n), scan everything</td><td>O(1) on average</td></tr>
<tr><td>Add a new item</td><td>O(1) at the end with <code>push</code></td><td>O(1) on average</td></tr></table></div>

<h4>Hash maps: find anything by its key</h4>
<p>A <b>hash map</b> stores pairs: a <b>key</b>, which you look things up by, and a <b>value</b>, which is the information you want back. A phone book maps names (keys) to numbers (values). A word count maps words to how many times they appear.</p>
<p>The clever part is how it finds a key without scanning. Inside, the map keeps an array of slots called <b>buckets</b>. When you store a key, a <b>hash function</b> turns the key into a number, always the same number for the same key, and that number picks the bucket. Later, to find the key, the map runs the same hash function, jumps straight to that one bucket and looks there. No scanning.</p>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="Keys pass through a hash function that picks a bucket for each">
<rect class="bx" x="10" y="30" width="100" height="36" rx="6"/><rect class="bx" x="10" y="90" width="100" height="36" rx="6"/><rect class="bx" x="10" y="150" width="100" height="36" rx="6"/>
<g text-anchor="middle"><text class="t-m" x="60" y="53">"apple"</text><text class="t-m" x="60" y="113">"kiwi"</text><text class="t-m" x="60" y="173">"fig"</text></g>
<path class="ln" d="M110 48h40"/><polygon class="ah" points="148,42 148,54 156,48"/>
<path class="ln" d="M110 108h40"/><polygon class="ah" points="148,102 148,114 156,108"/>
<path class="ln" d="M110 168h40"/><polygon class="ah" points="148,162 148,174 156,168"/>
<rect class="bx-a" x="158" y="22" width="84" height="172" rx="8"/>
<g text-anchor="middle"><text class="t-b" x="200" y="104">hash</text><text class="t-b" x="200" y="124">function</text></g>
<rect class="bx-info" x="300" y="20" width="110" height="35"/><rect class="bx-info" x="300" y="55" width="110" height="35"/><rect class="bx-info" x="300" y="90" width="110" height="35"/><rect class="bx-info" x="300" y="125" width="110" height="35"/><rect class="bx-info" x="300" y="160" width="110" height="35"/>
<g class="t-s"><text class="t-s" x="308" y="42">0</text><text class="t-s" x="308" y="77">1</text><text class="t-s" x="308" y="112">2</text><text class="t-s" x="308" y="147">3</text><text class="t-s" x="308" y="182">4</text></g>
<g text-anchor="middle"><text class="t-m" x="364" y="77">kiwi: 3</text><text class="t-m" x="364" y="147">apple: 5</text><text class="t-m" x="364" y="182">fig: 8</text></g>
<path class="ln-a" d="M242 60L296 74"/><polygon class="ah-a" points="293,68 291,79 300,75"/>
<path class="ln-a" d="M242 108L296 142"/><polygon class="ah-a" points="295,135 290,145 300,145"/>
<path class="ln-a" d="M242 160L296 177"/><polygon class="ah-a" points="294,171 291,182 300,178"/>
</svg><figcaption>Each key goes through the hash function, which turns it into a bucket number. "kiwi" lands in bucket 1, "apple" in bucket 3 and "fig" in bucket 4. To look up "apple" later, the map hashes it again, gets 3, and goes straight to that bucket instead of searching.</figcaption></figure>
<p>Sometimes two keys hash to the same bucket. That is called a <b>collision</b>, and the map handles it by keeping a tiny list in that bucket. The map also grows its bucket array as it fills up, so each bucket stays short. That is why lookups are <b>O(1) on average</b>: almost always instant, with rare unlucky cases.</p>
<div class="analogy"><b>Think of it like</b>A coat check. You hand over your coat and get ticket 47. When you come back, the attendant does not search every hook. They walk straight to hook 47. The ticket number is the hash.</div>

<h4>Hash maps in JavaScript</h4>
<p>You have three tools, and they all use hashing inside:</p>
<pre class="snip">const ages = new Map();      // keys can be any type
ages.set('Ada', 36);         // store a pair
ages.get('Ada');             // 36
ages.has('Bob');             // false

const seen = new Set();      // keys only, no values
const counts = {};           // a plain object; keys become strings
counts['e'] = 2;</pre>
<p>Use a <code>Map</code> when you need key-to-value pairs, a <code>Set</code> when you only care whether something is present, and a plain object for quick character counts. One detail: asking a Map for a key it doesn't have gives <code>undefined</code>, and so does reading a missing property on an object.</p>

<h4>Worked example: twoSum</h4>
<p>The first task: given <code>nums</code> and a <code>target</code>, return the indexes of the two numbers that add up to the target. The brute-force way checks every pair, which is O(n²).</p>
<p>Here is the insight. When you are standing on a number, you know exactly which partner you need: <code>target - nums[i]</code>. This partner is called the <b>complement</b>. So the only question is "have I already passed the complement, and where?" That is a lookup, and lookups are what maps are for. Store each value as a key, with its index as the value.</p>
<p>Trace <code>twoSum([3, 2, 4], 6)</code>:</p>
<div class="tbl-wrap"><table><tr><th>i</th><th>nums[i]</th><th>need = 6 − nums[i]</th><th>In the map?</th><th>Map afterwards</th></tr>
<tr><td>0</td><td>3</td><td>3</td><td>no (map is empty)</td><td>{3 → 0}</td></tr>
<tr><td>1</td><td>2</td><td>4</td><td>no</td><td>{3 → 0, 2 → 1}</td></tr>
<tr><td>2</td><td>4</td><td>2</td><td><b>yes, at index 1</b></td><td>return [1, 2]</td></tr></table></div>
<p>The order inside the loop matters: <b>check first, then store</b>. At i = 0 the value is 3 and the need is also 3. If you stored 3 before checking, you would find "yourself" and wrongly return [0, 0]. Checking first means you only ever match numbers that came earlier.</p>
<p>One pass, one O(1) lookup and one O(1) store per item: O(n) time, and O(n) extra space for the map.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>if (seen.get(need))</code> instead of <code>if (seen.has(need))</code>. When the partner is at index 0, <code>get</code> returns 0, and JavaScript treats 0 as false in an <code>if</code>. The check fails and you miss the answer. Use <code>has</code> to ask "is it there?", and <code>get</code> only to fetch it.</div>

<h4>Frequency counts: anagrams</h4>
<p>Two words are <b>anagrams</b> if they use exactly the same letters the same number of times, like "listen" and "silent". Sorting both words and comparing works, but sorting is O(n log n). Counting is O(n).</p>
<p>The counting idiom is worth memorising:</p>
<pre class="snip">counts[c] = (counts[c] || 0) + 1;
// first time:  counts[c] is undefined, so (undefined || 0) is 0, plus 1 = 1
// later times: the existing number, plus 1</pre>
<p>The plan: count every letter of the first word. Then walk the second word and use the counts up, subtracting 1 for each letter. If you ever need a letter whose count is already 0 or missing, they are not anagrams.</p>
<p>The lesson adds a twist: ignore case and spaces, so "Dormitory" and "Dirty room" match. This step is called <b>normalising</b> the input: make both strings follow the same rules before you compare. Lower-case them with <code>toLowerCase()</code> and strip the spaces with <code>replace(/\\s/g, '')</code>, where <code>\\s</code> means "any space character" and <code>g</code> means "everywhere, not just the first". Both become nine letters: <code>dormitory</code> and <code>dirtyroom</code>. A quick length check first is a cheap shortcut, because words of different lengths can never be anagrams. Words of the same length still need the full count: "aab" and "abb" are both three letters, but when you use up the second word, the count for b runs out.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>counts[c]++</code> on its own. The first time a letter appears, <code>counts[c]</code> is <code>undefined</code>, and <code>undefined + 1</code> is <code>NaN</code>, "not a number". Every later count stays NaN. Start the count from 0 with <code>(counts[c] || 0) + 1</code>, or use a Map with <code>(counts.get(c) || 0) + 1</code>.</div>

<h4>Two passes: the first unique character</h4>
<p>The last task asks for the index of the first character that appears exactly once. You cannot know a letter is unique until you have seen the whole string, so use two passes. Pass one counts every character. Pass two walks the string from the start and returns the first index whose count is 1.</p>
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="The string loveleetcode with each letter's count below it">
<text class="t-s" x="4" y="28">index</text><text class="t-s" x="4" y="68">letter</text><text class="t-s" x="4" y="118">count</text>
<g text-anchor="middle" class="t-s">
<text class="t-s" x="72" y="28">0</text><text class="t-s" x="100" y="28">1</text><text class="t-s t-ok" x="128" y="28">2</text><text class="t-s" x="156" y="28">3</text><text class="t-s" x="184" y="28">4</text><text class="t-s" x="212" y="28">5</text><text class="t-s" x="240" y="28">6</text><text class="t-s" x="268" y="28">7</text><text class="t-s" x="296" y="28">8</text><text class="t-s" x="324" y="28">9</text><text class="t-s" x="352" y="28">10</text><text class="t-s" x="380" y="28">11</text>
</g>
<rect class="bx" x="58" y="42" width="28" height="36"/><rect class="bx" x="86" y="42" width="28" height="36"/><rect class="bx-ok" x="114" y="42" width="28" height="36"/><rect class="bx" x="142" y="42" width="28" height="36"/><rect class="bx" x="170" y="42" width="28" height="36"/><rect class="bx" x="198" y="42" width="28" height="36"/><rect class="bx" x="226" y="42" width="28" height="36"/><rect class="bx" x="254" y="42" width="28" height="36"/><rect class="bx" x="282" y="42" width="28" height="36"/><rect class="bx" x="310" y="42" width="28" height="36"/><rect class="bx" x="338" y="42" width="28" height="36"/><rect class="bx" x="366" y="42" width="28" height="36"/>
<g text-anchor="middle">
<text class="t-m" x="72" y="66">l</text><text class="t-m" x="100" y="66">o</text><text class="t-m" x="128" y="66">v</text><text class="t-m" x="156" y="66">e</text><text class="t-m" x="184" y="66">l</text><text class="t-m" x="212" y="66">e</text><text class="t-m" x="240" y="66">e</text><text class="t-m" x="268" y="66">t</text><text class="t-m" x="296" y="66">c</text><text class="t-m" x="324" y="66">o</text><text class="t-m" x="352" y="66">d</text><text class="t-m" x="380" y="66">e</text>
<text class="t-m" x="72" y="118">2</text><text class="t-m" x="100" y="118">2</text><text class="t-b t-ok" x="128" y="118">1</text><text class="t-m" x="156" y="118">4</text><text class="t-m" x="184" y="118">2</text><text class="t-m" x="212" y="118">4</text><text class="t-m" x="240" y="118">4</text><text class="t-m" x="268" y="118">1</text><text class="t-m" x="296" y="118">1</text><text class="t-m" x="324" y="118">2</text><text class="t-m" x="352" y="118">1</text><text class="t-m" x="380" y="118">4</text>
<text class="t-s t-ok" x="128" y="142">first 1</text>
</g>
</svg><figcaption>The string "loveleetcode" with each letter's total count written below it, worked out in the first pass. The second pass reads the counts from left to right: l has 2, o has 2, and v has 1, so the answer is index 2.</figcaption></figure>
<p>Two passes of n steps is 2n, which is still O(n). Doing the loop twice is fine; doing a loop <i>inside</i> a loop is what hurts. For "aabb" every count is 2, so the second pass finishes without finding a 1 and you return -1.</p>
<div class="try"><b>Try it in your head</b>Trace <code>twoSum([2, 7, 11, 15], 9)</code>. At i = 0, value 2, need 7: not in the map, so store 2 → 0. At i = 1, value 7, need 2: it is in the map at index 0, so return [0, 1]. You never even looked at 11 or 15.</div>

<h4>Recap</h4>
<ul>
<li>Arrays find things by position in O(1) but by value in O(n).</li>
<li>A hash map uses a hash function to jump straight to the right bucket, giving O(1) average lookups and inserts.</li>
<li>twoSum: for each number, look up its complement <code>target - x</code>; check before you store.</li>
<li>Frequency counts with <code>(counts[c] || 0) + 1</code> solve anagram and "first unique" problems in O(n).</li>
<li>Normalise input (case, spaces) before you compare, and use <code>has</code>, not <code>get</code>, to test for presence.</li>
</ul>
`);

explain('a3',`
<h4>Why the order of things matters</h4>
<p>Arrays and hash maps let you store data and find it. Many problems, though, care about <b>order</b>: which item should be handled next? Your browser's back button must return to the most recent page. A printer must print jobs in the order they arrived. These two rules, "most recent first" and "oldest first", are so common that they have their own names: the <b>stack</b> and the <b>queue</b>.</p>
<p>This lesson also introduces the <b>linked list</b>, a different way of storing a sequence that you will meet inside many other structures, and the classic interview exercise of reversing one.</p>

<h4>Stacks and queues</h4>
<p>A <b>stack</b> is last in, first out, often shortened to LIFO. You add to the top and take from the top, like a pile of plates. Adding is called <b>push</b> and removing is called <b>pop</b>.</p>
<p>A <b>queue</b> is first in, first out, or FIFO. You join at the back and leave from the front, like a line at a shop. Adding is called <b>enqueue</b> and removing is called <b>dequeue</b>.</p>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="A stack where push and pop both use the top, beside a queue where items join at the back and leave from the front">
<text class="t-b" x="100" y="24" text-anchor="middle">stack</text>
<rect class="bx-a" x="55" y="70" width="90" height="32" rx="4"/><rect class="bx" x="55" y="102" width="90" height="32" rx="4"/><rect class="bx" x="55" y="134" width="90" height="32" rx="4"/>
<g text-anchor="middle"><text class="t-m" x="100" y="92">C</text><text class="t-m" x="100" y="124">B</text><text class="t-m" x="100" y="156">A</text></g>
<path class="ln-a" d="M72 38v22"/><polygon class="ah-a" points="66,58 78,58 72,66"/><text class="t-s" x="64" y="52" text-anchor="end">push</text>
<path class="ln-a" d="M128 64v-20"/><polygon class="ah-a" points="122,46 134,46 128,38"/><text class="t-s" x="138" y="52">pop</text>
<text class="t-s" x="100" y="200" text-anchor="middle">last in, first out</text>
<line class="ln-d" x1="210" y1="10" x2="210" y2="205"/>
<text class="t-b" x="325" y="24" text-anchor="middle">queue</text>
<rect class="bx-a" x="250" y="90" width="50" height="40" rx="4"/><rect class="bx" x="300" y="90" width="50" height="40" rx="4"/><rect class="bx" x="350" y="90" width="50" height="40" rx="4"/>
<g text-anchor="middle"><text class="t-m" x="275" y="115">A</text><text class="t-m" x="325" y="115">B</text><text class="t-m" x="375" y="115">C</text>
<text class="t-s" x="275" y="82">front</text><text class="t-s" x="375" y="148">back</text></g>
<text class="t-s" x="375" y="54" text-anchor="middle">enqueue</text><path class="ln-ok" d="M375 60v22"/><polygon class="ah-ok" points="369,80 381,80 375,88"/>
<path class="ln-a" d="M275 132v24"/><polygon class="ah-a" points="269,154 281,154 275,162"/><text class="t-s" x="275" y="180" text-anchor="middle">dequeue</text>
<text class="t-s" x="325" y="200" text-anchor="middle">first in, first out</text>
</svg><figcaption>On the left, a stack: A, B and C were pushed in that order, and pop takes C, the newest, from the top. On the right, a queue: new items join at the back, and dequeue takes A, the oldest, from the front.</figcaption></figure>
<p>In JavaScript, an ordinary array already works as a stack: <code>arr.push(x)</code> adds to the end and <code>arr.pop()</code> removes from the end, both in O(1). The end of the array is the top of the stack.</p>
<div class="analogy"><b>Think of it like</b>The back button is a stack of pages: the page you saw last is the first one you return to. A call centre is a queue: the caller who has waited longest is answered first.</div>

<h4>Worked example: matching brackets with a stack</h4>
<p>The first task asks whether a string of brackets like <code>{[()]}</code> is balanced. Balanced means every opening bracket has a matching closing bracket of the same type, and they close in the right order: the most recently opened bracket must close first. "Most recent first" is the stack rule, which is the clue.</p>
<p>The algorithm in words:</p>
<ol>
<li>Walk through the string one character at a time.</li>
<li>If it is an opening bracket, push it.</li>
<li>If it is a closing bracket, pop the top of the stack. If what you popped is not the matching opener, the string is invalid.</li>
<li>At the end, the stack must be empty. Anything left over was never closed.</li>
</ol>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="The stack after each character of the string with curly, square and round brackets nested">
<g text-anchor="middle">
<text class="t-m" x="60" y="28" style="font-size:18px">{</text><text class="t-m" x="120" y="28" style="font-size:18px">[</text><text class="t-m" x="180" y="28" style="font-size:18px">(</text><text class="t-m" x="240" y="28" style="font-size:18px">)</text><text class="t-m" x="300" y="28" style="font-size:18px">]</text><text class="t-m" x="360" y="28" style="font-size:18px">}</text>
</g>
<line class="ln-d" x1="20" y1="40" x2="400" y2="40"/>
<rect class="bx" x="42" y="124" width="36" height="26"/>
<rect class="bx" x="102" y="124" width="36" height="26"/><rect class="bx" x="102" y="98" width="36" height="26"/>
<rect class="bx" x="162" y="124" width="36" height="26"/><rect class="bx" x="162" y="98" width="36" height="26"/><rect class="bx-a" x="162" y="72" width="36" height="26"/>
<rect class="bx" x="222" y="124" width="36" height="26"/><rect class="bx" x="222" y="98" width="36" height="26"/>
<rect class="bx" x="282" y="124" width="36" height="26"/>
<g text-anchor="middle">
<text class="t-m" x="60" y="143">{</text>
<text class="t-m" x="120" y="143">{</text><text class="t-m" x="120" y="117">[</text>
<text class="t-m" x="180" y="143">{</text><text class="t-m" x="180" y="117">[</text><text class="t-m" x="180" y="91">(</text>
<text class="t-m" x="240" y="143">{</text><text class="t-m" x="240" y="117">[</text>
<text class="t-m" x="300" y="143">{</text>
<text class="t-s" x="360" y="143">empty</text>
<text class="t-s" x="60" y="172">push</text><text class="t-s" x="120" y="172">push</text><text class="t-s" x="180" y="172">push</text><text class="t-s t-ok" x="240" y="172">pop (</text><text class="t-s t-ok" x="300" y="172">pop [</text><text class="t-s t-ok" x="360" y="172">pop {</text>
<text class="t-b t-ok" x="210" y="200">stack empty at the end: valid</text>
</g>
</svg><figcaption>Reading the brackets left to right. The three openers are pushed, so the round bracket ends up on top. Each closer then pops the top, and every pop is the matching opener. The stack is empty at the end, so the string is valid.</figcaption></figure>
<p>Now try <code>([)]</code>. You push <code>(</code> and <code>[</code>. Then <code>)</code> arrives, you pop, and you get <code>[</code>. That is the wrong partner, so return <code>false</code>. A lookup object such as <code>{ ')': '(', ']': '[', '}': '{' }</code> tells you which opener each closer needs.</p>
<div class="mistake"><b>Common mistake</b>Forgetting the two edge cases. For <code>(</code> on its own, every step succeeds, but the stack still holds <code>(</code> at the end, so you must return <code>stack.length === 0</code>, not just <code>true</code>. For <code>]</code> on its own, the stack is empty when you pop. <code>pop()</code> on an empty array returns <code>undefined</code>, which does not equal <code>[</code>, so the comparison correctly gives false.</div>

<h4>Building a fast queue</h4>
<p>You might reach for <code>arr.push(x)</code> to enqueue and <code>arr.shift()</code> to dequeue. It works, but <code>shift</code> removes item 0 and then moves every other item down one slot to close the gap. With 200,000 items, that is 200,000 moves per dequeue: O(n). Emptying the queue becomes O(n²), and the lesson's speed test will fail.</p>
<p>The fix is to never move anything. Store items in an object, keyed by number, and keep two counters:</p>
<ul>
<li><code>head</code>: the number of the item at the front, the next one to leave.</li>
<li><code>tail</code>: the number the next arriving item will get.</li>
</ul>
<p>Enqueue stores the item at <code>items[tail]</code> and adds 1 to <code>tail</code>. Dequeue reads <code>items[head]</code>, deletes it, and adds 1 to <code>head</code>. The size is simply <code>tail - head</code>. Trace it: enqueue 1, 2, 3 gives items 0, 1 and 2, with head 0 and tail 3, so the size is 3. One dequeue returns item 0, the value 1, and moves head to 1, leaving size 2. Every operation is a couple of steps, whatever the size: O(1). When the size is 0, dequeue should return <code>undefined</code>, as the task expects.</p>

<h4>Linked lists: a chain of nodes</h4>
<p>An array keeps items side by side in memory. A <b>linked list</b> does not. Each item lives in its own small object called a <b>node</b>, which holds a value and a <b>pointer</b> to the next node. A pointer is just a reference: "the next one is over there". The lesson gives you this class:</p>
<pre class="snip">class ListNode {
  constructor(val, next = null) {
    this.val = val;    // the data
    this.next = next;  // the next node, or null at the end
  }
}</pre>
<p>You hold the list by its first node, called the <b>head</b>. To walk it, start at the head and keep following <code>next</code> until you reach <code>null</code>, which marks the end. The helpers <code>fromArray([1, 2, 3])</code> and <code>toArray(head)</code> convert between arrays and lists so you can test easily.</p>
<p>The trade-off: inserting or removing a node is O(1) once you are standing next to it, because you only re-point an arrow and nothing has to shift. But reaching item 500 means following 500 pointers: O(n), not O(1) as with an array.</p>

<h4>Worked example: reversing a linked list</h4>
<p>To reverse the list, you do not move any values. You flip every arrow so it points backwards. You walk the list once with three variables:</p>
<ul>
<li><code>prev</code>: the part you have already reversed. It starts as <code>null</code>, because the old first node will become the new last node.</li>
<li><code>current</code>: the node you are flipping now. It starts at the head.</li>
<li><code>next</code>: a temporary note of where the rest of the list is, saved <i>before</i> you flip the arrow.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="A linked list one to four, then the same list after two of its arrows have been flipped">
<text class="t-s" x="10" y="26">before: head is 1</text>
<rect class="bx" x="60" y="40" width="50" height="40" rx="6"/><rect class="bx" x="140" y="40" width="50" height="40" rx="6"/><rect class="bx" x="220" y="40" width="50" height="40" rx="6"/><rect class="bx" x="300" y="40" width="50" height="40" rx="6"/>
<g text-anchor="middle"><text class="t-m" x="85" y="65">1</text><text class="t-m" x="165" y="65">2</text><text class="t-m" x="245" y="65">3</text><text class="t-m" x="325" y="65">4</text><text class="t-s" x="388" y="65">null</text></g>
<path class="ln" d="M110 60h22"/><polygon class="ah" points="130,54 130,66 138,60"/>
<path class="ln" d="M190 60h22"/><polygon class="ah" points="210,54 210,66 218,60"/>
<path class="ln" d="M270 60h22"/><polygon class="ah" points="290,54 290,66 298,60"/>
<path class="ln" d="M350 60h14"/><polygon class="ah" points="362,54 362,66 370,60"/>
<text class="t-s" x="10" y="122">after two steps</text>
<rect class="bx-ok" x="60" y="134" width="50" height="40" rx="6"/><rect class="bx-ok" x="140" y="134" width="50" height="40" rx="6"/><rect class="bx-a" x="220" y="134" width="50" height="40" rx="6"/><rect class="bx" x="300" y="134" width="50" height="40" rx="6"/>
<g text-anchor="middle"><text class="t-m" x="85" y="159">1</text><text class="t-m" x="165" y="159">2</text><text class="t-m" x="245" y="159">3</text><text class="t-m" x="325" y="159">4</text><text class="t-s" x="26" y="159">null</text><text class="t-s" x="388" y="159">null</text>
<text class="t-s t-ok" x="165" y="196">prev</text><text class="t-s t-a" x="245" y="196">current</text></g>
<path class="ln-ok" d="M60 154h-6"/><polygon class="ah-ok" points="56,148 56,160 48,154"/>
<path class="ln-ok" d="M140 154h-22"/><polygon class="ah-ok" points="120,148 120,160 112,154"/>
<path class="ln" d="M270 154h22"/><polygon class="ah" points="290,148 290,160 298,154"/>
<path class="ln" d="M350 154h14"/><polygon class="ah" points="362,148 362,160 370,154"/>
</svg><figcaption>Top: the list 1, 2, 3, 4, with every arrow pointing right. Bottom: after two steps, the arrows of 1 and 2 have been flipped to point left, and prev points at 2, the head of the reversed part. Current is 3, the next node to flip. The loop repeats until current is null, and then prev is the new head, 4.</figcaption></figure>
<p>Each step of the loop does four things, in this exact order: save <code>next = current.next</code>; flip the arrow with <code>current.next = prev</code>; move <code>prev</code> forward to <code>current</code>; move <code>current</code> forward to <code>next</code>. When <code>current</code> becomes <code>null</code>, you have flipped every node, and <code>prev</code> is the new head. Return it. An empty list (<code>null</code>) never enters the loop, and you return <code>prev</code>, which is still <code>null</code>: exactly what the task checks.</p>
<div class="mistake"><b>Common mistake</b>Flipping the arrow before saving <code>next</code>. As soon as you write <code>current.next = prev</code>, the only reference to the rest of the list is gone, and nodes 3 and 4 are lost. Always save first, then flip.</div>

<div class="try"><b>Try it in your head</b>Run the bracket checker on <code>{(})</code>. Push <code>{</code>, push <code>(</code>. Then <code>}</code> arrives and you pop <code>(</code>: wrong partner, so false. Now, a queue holds 5, 8 and 2, added in that order. What does dequeue return? 5, the oldest. What would pop return on a stack holding the same values pushed in the same order? 2, the newest.</div>

<h4>Recap</h4>
<ul>
<li>A stack is last in, first out: push and pop at the top. Use it for brackets, undo and the back button.</li>
<li>A queue is first in, first out: enqueue at the back, dequeue at the front. Use it for jobs waiting their turn.</li>
<li><code>array.shift()</code> is O(n). A queue with head and tail counters dequeues in O(1).</li>
<li>A linked list is nodes joined by <code>next</code> pointers, ending in <code>null</code>; you hold it by its head.</li>
<li>To reverse a list, walk it with <code>prev</code>, <code>current</code> and <code>next</code>, saving <code>next</code> before flipping each arrow.</li>
</ul>
`);

explain('a4',`
<h4>When data branches</h4>
<p>Arrays, stacks, queues and linked lists are all <b>linear</b>: each item has at most one item after it. Plenty of real data is not like that. A folder contains several folders, each containing more. A web page's HTML has elements inside elements. A road network connects each city to several others, sometimes in loops.</p>
<p>Data that branches like a family tree is called a <b>tree</b>. Data with any connections at all, loops included, is called a <b>graph</b>. This lesson shows how to store both and, more importantly, how to visit every part of them in an organised way. The two strategies, <b>breadth-first search</b> and <b>depth-first search</b>, solve a huge range of problems, from "what is the shortest route out of this maze?" to "can I get from Lagos to Dakar?".</p>

<h4>Tree vocabulary</h4>
<p>A tree is made of <b>nodes</b>, joined by links called <b>edges</b>. The words come from family trees, turned upside down:</p>
<ul>
<li>The <b>root</b> is the single node at the top.</li>
<li>A node's <b>children</b> are the nodes directly below it; it is their <b>parent</b>.</li>
<li>A <b>leaf</b> is a node with no children.</li>
<li>The <b>depth</b> of the tree is how many levels it has, counting the root as level 1.</li>
</ul>
<p>In a <b>binary tree</b>, each node has at most two children, called <code>left</code> and <code>right</code>. The lesson provides this class, which is the linked list's <code>ListNode</code> with two pointers instead of one:</p>
<pre class="snip">class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;      // the data
    this.left = left;    // left child, or null
    this.right = right;  // right child, or null
  }
}</pre>
<p>The provided <code>tree</code> is a <b>binary search tree</b>, or BST. It follows one extra rule at every node: everything in the left branch is smaller than the node, and everything in the right branch is bigger. Look at the root, 8: the left side holds 1, 3, 4, 6 and 7, and the right side holds 10, 13 and 14.</p>

<h4>Recursion fits trees perfectly</h4>
<p>Here is the key insight: each child of a node is the root of its own, smaller tree, called a <b>subtree</b>. So any question about a tree can be answered by asking the same question about the two subtrees, which is exactly the shape of recursion from the last lesson.</p>
<p>Take <code>maxDepth</code>. In words: an empty tree has depth 0 (the base case). Otherwise, the depth is 1 for this node, plus the depth of whichever subtree is deeper.</p>
<pre class="snip">if (!root) return 0;   // null means "no tree here"
return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));</pre>
<p>Trace it from the bottom of the lesson's tree. The leaf 4 has two empty children, so its depth is 1 + max(0, 0) = 1. Node 6 has children 4 and 7, both depth 1, so 6 has depth 2. Node 3 has children 1 (depth 1) and 6 (depth 2), so 3 has depth 3. The right side, 10 then 14 then 13, also has depth 3. The root is 1 + max(3, 3) = <b>4</b>, the answer the task expects.</p>

<h4>Two ways to visit every node</h4>
<p>Visiting every node is called <b>traversing</b> the tree. There are two families of approach:</p>
<ul>
<li><b>Breadth-first search (BFS)</b> visits level by level: the root, then all of its children, then all of their children. It spreads out like a ripple.</li>
<li><b>Depth-first search (DFS)</b> goes as deep as possible down one branch before backing up and trying the next. It is like exploring a maze by always following the left-hand wall.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="The lesson's tree numbered in breadth-first visit order">
<g class="ln"><path class="ln" d="M210 40L110 100"/><path class="ln" d="M210 40L310 100"/><path class="ln" d="M110 100L60 160"/><path class="ln" d="M110 100L160 160"/><path class="ln" d="M310 100L360 160"/><path class="ln" d="M160 160L130 220"/><path class="ln" d="M160 160L190 220"/><path class="ln" d="M360 160L330 220"/></g>
<circle class="bx" cx="210" cy="40" r="18"/><circle class="bx" cx="110" cy="100" r="18"/><circle class="bx" cx="310" cy="100" r="18"/><circle class="bx" cx="60" cy="160" r="18"/><circle class="bx" cx="160" cy="160" r="18"/><circle class="bx" cx="360" cy="160" r="18"/><circle class="bx" cx="130" cy="220" r="18"/><circle class="bx" cx="190" cy="220" r="18"/><circle class="bx" cx="330" cy="220" r="18"/>
<g text-anchor="middle" class="t-m">
<text class="t-m" x="210" y="45">8</text><text class="t-m" x="110" y="105">3</text><text class="t-m" x="310" y="105">10</text><text class="t-m" x="60" y="165">1</text><text class="t-m" x="160" y="165">6</text><text class="t-m" x="360" y="165">14</text><text class="t-m" x="130" y="225">4</text><text class="t-m" x="190" y="225">7</text><text class="t-m" x="330" y="225">13</text>
</g>
<g text-anchor="middle">
<text class="t-b t-a" x="238" y="30">1</text><text class="t-b t-a" x="82" y="90">2</text><text class="t-b t-a" x="338" y="90">3</text><text class="t-b t-a" x="32" y="150">4</text><text class="t-b t-a" x="188" y="150">5</text><text class="t-b t-a" x="388" y="150">6</text><text class="t-b t-a" x="102" y="210">7</text><text class="t-b t-a" x="218" y="210">8</text><text class="t-b t-a" x="302" y="210">9</text>
</g>
<line class="ln-d" x1="10" y1="70" x2="410" y2="70"/><line class="ln-d" x1="10" y1="130" x2="410" y2="130"/><line class="ln-d" x1="10" y1="190" x2="410" y2="190"/>
</svg><figcaption>Breadth-first order, shown by the orange numbers. BFS visits the root 8 first, then the whole second level, 3 and 10, then the third level, 1, 6 and 14, and finally the bottom level, 4, 7 and 13. The dashed lines separate the levels.</figcaption></figure>
<p>BFS gets its order from a <b>queue</b>. Put the root in the queue. Then, repeatedly, take the node at the front, visit it, and add its children to the back. Because children always join behind everything already waiting, a whole level is finished before the next one starts.</p>
<p>DFS gets its order from a <b>stack</b>, and usually that stack is simply the call stack: you write it with recursion. There are three common DFS orders, depending on when you visit the node itself compared with its subtrees. The one this lesson asks for is <b>in-order</b>: visit the left subtree, then the node, then the right subtree.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="The same tree numbered in depth-first in-order visit order">
<g class="ln"><path class="ln" d="M210 40L110 100"/><path class="ln" d="M210 40L310 100"/><path class="ln" d="M110 100L60 160"/><path class="ln" d="M110 100L160 160"/><path class="ln" d="M310 100L360 160"/><path class="ln" d="M160 160L130 220"/><path class="ln" d="M160 160L190 220"/><path class="ln" d="M360 160L330 220"/></g>
<circle class="bx" cx="210" cy="40" r="18"/><circle class="bx" cx="110" cy="100" r="18"/><circle class="bx" cx="310" cy="100" r="18"/><circle class="bx" cx="60" cy="160" r="18"/><circle class="bx" cx="160" cy="160" r="18"/><circle class="bx" cx="360" cy="160" r="18"/><circle class="bx" cx="130" cy="220" r="18"/><circle class="bx" cx="190" cy="220" r="18"/><circle class="bx" cx="330" cy="220" r="18"/>
<g text-anchor="middle" class="t-m">
<text class="t-m" x="210" y="45">8</text><text class="t-m" x="110" y="105">3</text><text class="t-m" x="310" y="105">10</text><text class="t-m" x="60" y="165">1</text><text class="t-m" x="160" y="165">6</text><text class="t-m" x="360" y="165">14</text><text class="t-m" x="130" y="225">4</text><text class="t-m" x="190" y="225">7</text><text class="t-m" x="330" y="225">13</text>
</g>
<g text-anchor="middle">
<text class="t-b t-ok" x="238" y="30">6</text><text class="t-b t-ok" x="82" y="90">2</text><text class="t-b t-ok" x="338" y="90">7</text><text class="t-b t-ok" x="32" y="150">1</text><text class="t-b t-ok" x="188" y="150">4</text><text class="t-b t-ok" x="388" y="150">9</text><text class="t-b t-ok" x="102" y="210">3</text><text class="t-b t-ok" x="218" y="210">5</text><text class="t-b t-ok" x="302" y="210">8</text>
</g>
</svg><figcaption>Depth-first in-order, shown by the green numbers. DFS dives down the left side first and visits 1, then 3, then goes down into 6's branch for 4, 6 and 7, and only then visits the root 8. The right side follows: 10, 13, 14. Read in this order, the values come out sorted.</figcaption></figure>
<p>That is why in-order matters for a BST. Everything smaller than a node is in its left subtree, and in-order visits the left subtree first, then the node, then the bigger values on the right. So the output is <code>[1, 3, 4, 6, 7, 8, 10, 13, 14]</code>, sorted, without any sorting. In code: if the node is null, return; otherwise recurse left, push the node's value into an output array, then recurse right. Pass the same output array into every call so they all add to one list.</p>

<h4>BFS for the shortest path in a grid</h4>
<p>A grid is a graph in disguise: each open cell is a node, connected to the open cells above, below, left and right. The lesson's <code>GRID</code> uses 0 for open and 1 for a wall, and positions are written <code>[row, column]</code>, counting from 0.</p>
<p>Why BFS for shortest paths? Because it explores in rings of distance. Every cell 1 step away is reached before any cell 2 steps away, and so on. So the first time BFS reaches the target, it has found it by the shortest route. DFS gives no such promise: it might wander a long way round first.</p>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="The four by four grid with walls and the BFS distance from the top left corner written in each open cell">
<g text-anchor="middle" class="t-s"><text class="t-s" x="132" y="14">0</text><text class="t-s" x="176" y="14">1</text><text class="t-s" x="220" y="14">2</text><text class="t-s" x="264" y="14">3</text><text class="t-s" x="96" y="47">0</text><text class="t-s" x="96" y="91">1</text><text class="t-s" x="96" y="135">2</text><text class="t-s" x="96" y="179">3</text></g>
<rect class="bx-a" x="110" y="20" width="44" height="44"/><rect class="bx" x="154" y="20" width="44" height="44"/><rect class="bx" x="198" y="20" width="44" height="44"/><rect class="bx-dark" x="242" y="20" width="44" height="44"/>
<rect class="bx-dark" x="110" y="64" width="44" height="44"/><rect class="bx-dark" x="154" y="64" width="44" height="44"/><rect class="bx" x="198" y="64" width="44" height="44"/><rect class="bx-dark" x="242" y="64" width="44" height="44"/>
<rect class="bx" x="110" y="108" width="44" height="44"/><rect class="bx" x="154" y="108" width="44" height="44"/><rect class="bx" x="198" y="108" width="44" height="44"/><rect class="bx" x="242" y="108" width="44" height="44"/>
<rect class="bx" x="110" y="152" width="44" height="44"/><rect class="bx-dark" x="154" y="152" width="44" height="44"/><rect class="bx-dark" x="198" y="152" width="44" height="44"/><rect class="bx-ok" x="242" y="152" width="44" height="44"/>
<g text-anchor="middle">
<text class="t-b" x="132" y="47">0</text><text class="t-m" x="176" y="47">1</text><text class="t-m" x="220" y="47">2</text>
<text class="t-m" x="220" y="91">3</text>
<text class="t-m" x="132" y="135">6</text><text class="t-m" x="176" y="135">5</text><text class="t-m" x="220" y="135">4</text><text class="t-m" x="264" y="135">5</text>
<text class="t-m" x="132" y="179">7</text><text class="t-b" x="264" y="179">6</text>
</g>
<rect class="bx-a" x="310" y="40" width="16" height="16"/><text class="t-s" x="334" y="53">start</text>
<rect class="bx-ok" x="310" y="70" width="16" height="16"/><text class="t-s" x="334" y="83">target</text>
<rect class="bx-dark" x="310" y="100" width="16" height="16"/><text class="t-s" x="334" y="113">wall</text>
</svg><figcaption>The lesson's grid, with walls shown dark. Each open cell holds its distance from the start in the top-left corner, in the order BFS discovers them. The route must squeeze through the single gap at row 1, column 2, and the target in the bottom-right corner is reached in 6 steps.</figcaption></figure>
<p>The algorithm:</p>
<ol>
<li>Put the start in a queue as <code>[row, col, steps]</code> with 0 steps, and add it to a <code>seen</code> set.</li>
<li>Take the front entry. If it is the target, return its steps.</li>
<li>Otherwise look at its four neighbours. Keep a neighbour only if it is inside the grid, is open (0), and is not in <code>seen</code>. Mark it seen and add it to the queue with steps + 1.</li>
<li>If the queue runs empty, the target cannot be reached: return -1.</li>
</ol>
<p>A Set cannot compare arrays by their contents, so store each position as a string such as <code>'2,3'</code>. Mark a cell as seen when you <i>add</i> it to the queue, not when you take it out, or the same cell can be queued many times. The lesson's solution uses <code>queue.shift()</code>, which is fine for a 16-cell grid; for big grids, use the head-index queue from the stacks and queues lesson.</p>
<div class="mistake"><b>Common mistake</b>Checking <code>grid[nr][nc]</code> before checking the bounds. If <code>nr</code> is -1, <code>grid[-1]</code> is <code>undefined</code>, and reading <code>[nc]</code> from it throws <code>TypeError: Cannot read properties of undefined</code>. Test <code>nr &gt;= 0 &amp;&amp; nr &lt; rows</code> and the same for columns first; <code>&amp;&amp;</code> stops at the first false, so the grid is never read out of range.</div>

<h4>DFS on a graph: is there a route?</h4>
<p>The lesson's <code>ROUTES</code> is stored as an <b>adjacency list</b>: an object where each city's key holds an array of the cities you can travel to directly. The routes are one-way, so this is a <b>directed</b> graph.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="One way routes between West African cities, and a separate pair of East African cities">
<rect class="bx-a" x="10" y="30" width="80" height="36" rx="8"/><rect class="bx" x="115" y="30" width="80" height="36" rx="8"/><rect class="bx" x="220" y="30" width="80" height="36" rx="8"/><rect class="bx-ok" x="325" y="30" width="80" height="36" rx="8"/>
<rect class="bx" x="10" y="100" width="80" height="36" rx="8"/>
<rect class="bx" x="220" y="150" width="80" height="36" rx="8"/><rect class="bx" x="325" y="150" width="80" height="36" rx="8"/>
<g text-anchor="middle"><text class="t" x="50" y="53">Lagos</text><text class="t" x="155" y="53">Accra</text><text class="t" x="260" y="53">Abidjan</text><text class="t" x="365" y="53">Dakar</text><text class="t" x="50" y="123">Abuja</text><text class="t" x="260" y="173">Nairobi</text><text class="t" x="365" y="173">Kampala</text></g>
<path class="ln-a" d="M90 48h17"/><polygon class="ah-a" points="105,42 105,54 113,48"/>
<path class="ln-a" d="M195 48h17"/><polygon class="ah-a" points="210,42 210,54 218,48"/>
<path class="ln-a" d="M300 48h17"/><polygon class="ah-a" points="315,42 315,54 323,48"/>
<path class="ln" d="M50 66v26"/><polygon class="ah" points="44,90 56,90 50,98"/>
<path class="ln" d="M300 168h17"/><polygon class="ah" points="315,162 315,174 323,168"/>
</svg><figcaption>The routes as a picture. From Lagos you can fly to Accra or Abuja. The highlighted chain, Lagos to Accra to Abidjan to Dakar, is the route DFS finds. Nairobi and Kampala are connected to each other but to nothing else, so no route from Lagos ever reaches them.</figcaption></figure>
<p>DFS with recursion, in words: if you are already at the destination, return true. Otherwise mark the current city as visited, and for each neighbour you have not visited yet, ask the same question from there. If any of those calls returns true, so do you. If none do, return false.</p>
<p>Tracing Lagos to Dakar: Lagos is not Dakar, so try its first neighbour, Accra. Accra tries Abidjan. Abidjan tries Dakar, which is the destination, so true travels all the way back up. From Lagos to Nairobi, DFS tries everything reachable (Accra, Abidjan, Dakar, Abuja), runs out of neighbours, and returns false.</p>
<p>The <b>visited set</b> matters because real graphs have loops. If A leads to B and B leads back to A, a search without memory goes round forever and crashes with a stack overflow. Pass the same set into every recursive call so they share one memory.</p>
<div class="mistake"><b>Common mistake</b>Using a city lookup like <code>graph[from]</code> without a fallback. If a city has no entry at all, that is <code>undefined</code>, and looping over it throws an error. Writing <code>graph[from] || []</code> treats a missing city as one with no routes.</div>

<div class="try"><b>Try it in your head</b>Which uses a queue, BFS or DFS? BFS. Using the grid picture, how many steps from the start to row 0, column 2? Two, the answer the second grid test expects. And what does in-order print for a tree with root 5, left child 2 and right child 9? 2, 5, 9.</div>

<h4>Recap</h4>
<ul>
<li>A tree is a root with children and no loops; a graph allows any connections. Each subtree is a smaller tree, so recursion fits naturally.</li>
<li>Depth is 1 + the deeper subtree, with 0 for an empty tree.</li>
<li>In-order DFS (left, node, right) on a binary search tree gives the values sorted.</li>
<li>BFS uses a queue and explores level by level, so it finds shortest paths in unweighted grids and graphs.</li>
<li>DFS uses recursion or a stack and answers "can I get there?". Always keep a visited set.</li>
</ul>
`);

explain('a5',`
<h4>Why sorted data is so powerful</h4>
<p>Finding a word in a dictionary does not mean reading from "aardvark" onwards. You open it near the middle, see that your word comes later, and ignore the whole first half. A few flips later you are there. That only works because the dictionary is <b>sorted</b>.</p>
<p>This lesson covers that trick, called <b>binary search</b>, then one of the classic ways to sort data in the first place, <b>merge sort</b>. Both rely on an idea you will use for the rest of this track: <b>recursion</b>, where a function solves a problem by solving smaller copies of the same problem. Finally, you will see how remembering answers, called <b>memoisation</b>, can turn a function that would run for days into one that finishes instantly.</p>

<h4>Binary search: halve the problem each step</h4>
<p>Searching an unsorted array means checking every item: O(n). In a sorted array you can do far better. Keep two markers, <code>lo</code> and <code>hi</code>, for the lowest and highest index the target could still be at. Then repeat:</p>
<ol>
<li>Look at the middle item, at index <code>mid</code>, halfway between lo and hi.</li>
<li>If it is the target, return <code>mid</code>.</li>
<li>If it is smaller than the target, the target must be to the right, so move <code>lo</code> to <code>mid + 1</code>.</li>
<li>If it is bigger, the target must be to the left, so move <code>hi</code> to <code>mid - 1</code>.</li>
<li>If <code>lo</code> passes <code>hi</code>, there is nothing left to search: return -1.</li>
</ol>
<figure class="fig"><svg viewBox="0 0 420 222" role="img" aria-label="Binary search for 38 in eight sorted numbers, halving the range at each step">
<g text-anchor="middle" class="t-s"><text class="t-s" x="100" y="26">0</text><text class="t-s" x="140" y="26">1</text><text class="t-s" x="180" y="26">2</text><text class="t-s" x="220" y="26">3</text><text class="t-s" x="260" y="26">4</text><text class="t-s" x="300" y="26">5</text><text class="t-s" x="340" y="26">6</text><text class="t-s" x="380" y="26">7</text></g>
<rect class="bx-info" x="80" y="36" width="40" height="34"/><rect class="bx-info" x="120" y="36" width="40" height="34"/><rect class="bx-info" x="160" y="36" width="40" height="34"/><rect class="bx-a" x="200" y="36" width="40" height="34"/><rect class="bx-info" x="240" y="36" width="40" height="34"/><rect class="bx-info" x="280" y="36" width="40" height="34"/><rect class="bx-info" x="320" y="36" width="40" height="34"/><rect class="bx-info" x="360" y="36" width="40" height="34"/>
<rect class="bx" x="80" y="98" width="40" height="34"/><rect class="bx" x="120" y="98" width="40" height="34"/><rect class="bx" x="160" y="98" width="40" height="34"/><rect class="bx" x="200" y="98" width="40" height="34"/><rect class="bx-info" x="240" y="98" width="40" height="34"/><rect class="bx-a" x="280" y="98" width="40" height="34"/><rect class="bx-info" x="320" y="98" width="40" height="34"/><rect class="bx-info" x="360" y="98" width="40" height="34"/>
<rect class="bx" x="80" y="160" width="40" height="34"/><rect class="bx" x="120" y="160" width="40" height="34"/><rect class="bx" x="160" y="160" width="40" height="34"/><rect class="bx" x="200" y="160" width="40" height="34"/><rect class="bx" x="240" y="160" width="40" height="34"/><rect class="bx" x="280" y="160" width="40" height="34"/><rect class="bx-ok" x="320" y="160" width="40" height="34"/><rect class="bx-info" x="360" y="160" width="40" height="34"/>
<g text-anchor="middle">
<text class="t-m" x="100" y="59">2</text><text class="t-m" x="140" y="59">5</text><text class="t-m" x="180" y="59">8</text><text class="t-m" x="220" y="59">12</text><text class="t-m" x="260" y="59">16</text><text class="t-m" x="300" y="59">23</text><text class="t-m" x="340" y="59">38</text><text class="t-m" x="380" y="59">56</text>
<text class="t-s" x="100" y="121">2</text><text class="t-s" x="140" y="121">5</text><text class="t-s" x="180" y="121">8</text><text class="t-s" x="220" y="121">12</text><text class="t-m" x="260" y="121">16</text><text class="t-m" x="300" y="121">23</text><text class="t-m" x="340" y="121">38</text><text class="t-m" x="380" y="121">56</text>
<text class="t-s" x="100" y="183">2</text><text class="t-s" x="140" y="183">5</text><text class="t-s" x="180" y="183">8</text><text class="t-s" x="220" y="183">12</text><text class="t-s" x="260" y="183">16</text><text class="t-s" x="300" y="183">23</text><text class="t-m" x="340" y="183">38</text><text class="t-m" x="380" y="183">56</text>
<text class="t-s" x="100" y="86">lo</text><text class="t-s t-a" x="220" y="86">mid</text><text class="t-s" x="380" y="86">hi</text>
<text class="t-s" x="260" y="148">lo</text><text class="t-s t-a" x="300" y="148">mid</text><text class="t-s" x="380" y="148">hi</text>
<text class="t-s t-ok" x="340" y="210">lo, mid</text><text class="t-s" x="384" y="210">hi</text>
</g>
<text class="t-s" x="8" y="50">step 1</text><text class="t-s" x="8" y="68">12 &lt; 38</text>
<text class="t-s" x="8" y="112">step 2</text><text class="t-s" x="8" y="130">23 &lt; 38</text>
<text class="t-s" x="8" y="174">step 3</text><text class="t-s t-ok" x="8" y="192">found</text>
</svg><figcaption>Searching for 38 in eight sorted numbers. Step 1 looks at the middle, 12. That is smaller than 38, so the whole left half is greyed out. Step 2 looks at 23, also smaller, so another chunk goes. Step 3 lands on 38 at index 6. Three looks instead of up to eight.</figcaption></figure>
<p>Each step throws away half of what is left, which is why binary search is O(log n). A million items need about 20 steps; a billion need about 30. The middle index is written <code>mid = (lo + hi) &gt;&gt; 1</code> in the lesson. The <code>&gt;&gt; 1</code> shifts the number's bits one place right, which for positive whole numbers is the same as dividing by 2 and rounding down: <code>Math.floor((lo + hi) / 2)</code> works just as well.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>while (lo &lt; hi)</code> instead of <code>while (lo &lt;= hi)</code>, or <code>lo = mid</code> instead of <code>lo = mid + 1</code>. The first skips the last remaining item, so searching for 9 in <code>[1, 3, 5, 7, 9]</code> fails. The second can leave lo and hi stuck forever, and your page freezes. Since you have already checked <code>mid</code>, always step past it.</div>

<h4>Recursion: a function that calls itself</h4>
<p>Before merge sort, you need recursion. A <b>recursive</b> function solves a problem by calling itself on a smaller version of the same problem. Every recursive function has two parts:</p>
<ul>
<li>A <b>base case</b>: an input so small the answer is obvious, returned directly without calling itself.</li>
<li>A <b>recursive case</b>: break the problem into a smaller piece, call yourself on it, and use the answer.</li>
</ul>
<p>The classic tiny example is the factorial: 3 factorial is 3 × 2 × 1 = 6.</p>
<pre class="snip">function factorial(n) {
  if (n === 0) return 1;           // base case
  return n * factorial(n - 1);     // smaller copy of the problem
}</pre>
<p>How does the computer keep track? Every time a function is called, JavaScript adds a <b>frame</b> to the <b>call stack</b>: a note holding that call's variables and where it was up to. A frame stays on the stack until its call returns. It is a stack in exactly the sense of the last lesson: the newest call finishes first.</p>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="The call stack for factorial of 3, with calls piling up and answers flowing back down">
<rect class="bx-ok" x="60" y="20" width="200" height="36" rx="4"/><rect class="bx" x="60" y="60" width="200" height="36" rx="4"/><rect class="bx" x="60" y="100" width="200" height="36" rx="4"/><rect class="bx" x="60" y="140" width="200" height="36" rx="4"/>
<g text-anchor="middle"><text class="t-m" x="160" y="43">factorial(0)</text><text class="t-m" x="160" y="83">factorial(1)</text><text class="t-m" x="160" y="123">factorial(2)</text><text class="t-m" x="160" y="163">factorial(3)</text></g>
<text class="t-s t-ok" x="275" y="43">base case: 1</text><text class="t-s" x="275" y="83">1 × 1 = 1</text><text class="t-s" x="275" y="123">2 × 1 = 2</text><text class="t-b t-ok" x="275" y="163">3 × 2 = 6</text>
<path class="ln-a" d="M34 170V30"/><polygon class="ah-a" points="28,32 40,32 34,22"/><text class="t-s t-a" x="34" y="196" text-anchor="middle">calls</text>
<path class="ln-ok" d="M398 30v140"/><polygon class="ah-ok" points="392,168 404,168 398,178"/><text class="t-s t-ok" x="392" y="200" text-anchor="middle">returns</text>
</svg><figcaption>Calling factorial of 3 piles frames up the call stack: 3 waits for 2, which waits for 1, which waits for 0. Factorial of 0 is the base case and returns 1 straight away. Then the answers flow back down: 1 times 1 is 1, 2 times 1 is 2, and 3 times 2 is 6.</figcaption></figure>
<p>Without a base case the calls never stop. Each one adds a frame, the stack fills up, and JavaScript gives up with <code>RangeError: Maximum call stack size exceeded</code>. When you see that error, check that your base case exists and that every call really moves towards it.</p>

<h4>Merge sort: split, sort the halves, merge</h4>
<p>Merge sort uses recursion beautifully. The idea is that sorting is hard, but <b>merging two lists that are already sorted</b> is easy. To merge, compare the front items of both lists, take the smaller one, and repeat. Each comparison places one item, so merging is O(n).</p>
<p>So the whole algorithm is:</p>
<ol>
<li><b>Base case:</b> an array with 0 or 1 items is already sorted. Return a copy of it.</li>
<li><b>Split</b> the array into a left half and a right half.</li>
<li><b>Sort each half</b> by calling merge sort on it. Recursion!</li>
<li><b>Merge</b> the two sorted halves and return the result.</li>
</ol>
<figure class="fig"><svg viewBox="0 0 420 235" role="img" aria-label="Merge sort splitting 5 2 4 1 into single items and merging them back in order">
<text class="t-s" x="4" y="38">start</text><text class="t-s" x="4" y="82">split</text><text class="t-s" x="4" y="126">split</text><text class="t-s" x="4" y="170">merge</text><text class="t-s" x="4" y="214">merge</text>
<g class="ln"><path class="ln" d="M210 48L110 64"/><path class="ln" d="M210 48L310 64"/><path class="ln" d="M110 92L75 108"/><path class="ln" d="M110 92L145 108"/><path class="ln" d="M310 92L275 108"/><path class="ln" d="M310 92L345 108"/><path class="ln-ok" d="M75 136L110 152"/><path class="ln-ok" d="M145 136L110 152"/><path class="ln-ok" d="M275 136L310 152"/><path class="ln-ok" d="M345 136L310 152"/><path class="ln-ok" d="M110 180L210 196"/><path class="ln-ok" d="M310 180L210 196"/></g>
<rect class="bx" x="150" y="20" width="30" height="28"/><rect class="bx" x="180" y="20" width="30" height="28"/><rect class="bx" x="210" y="20" width="30" height="28"/><rect class="bx" x="240" y="20" width="30" height="28"/>
<rect class="bx" x="80" y="64" width="30" height="28"/><rect class="bx" x="110" y="64" width="30" height="28"/><rect class="bx" x="280" y="64" width="30" height="28"/><rect class="bx" x="310" y="64" width="30" height="28"/>
<rect class="bx-info" x="60" y="108" width="30" height="28"/><rect class="bx-info" x="130" y="108" width="30" height="28"/><rect class="bx-info" x="260" y="108" width="30" height="28"/><rect class="bx-info" x="330" y="108" width="30" height="28"/>
<rect class="bx-ok" x="80" y="152" width="30" height="28"/><rect class="bx-ok" x="110" y="152" width="30" height="28"/><rect class="bx-ok" x="280" y="152" width="30" height="28"/><rect class="bx-ok" x="310" y="152" width="30" height="28"/>
<rect class="bx-ok" x="150" y="196" width="30" height="28"/><rect class="bx-ok" x="180" y="196" width="30" height="28"/><rect class="bx-ok" x="210" y="196" width="30" height="28"/><rect class="bx-ok" x="240" y="196" width="30" height="28"/>
<g text-anchor="middle" class="t-m">
<text class="t-m" x="165" y="39">5</text><text class="t-m" x="195" y="39">2</text><text class="t-m" x="225" y="39">4</text><text class="t-m" x="255" y="39">1</text>
<text class="t-m" x="95" y="83">5</text><text class="t-m" x="125" y="83">2</text><text class="t-m" x="295" y="83">4</text><text class="t-m" x="325" y="83">1</text>
<text class="t-m" x="75" y="127">5</text><text class="t-m" x="145" y="127">2</text><text class="t-m" x="275" y="127">4</text><text class="t-m" x="345" y="127">1</text>
<text class="t-m" x="95" y="171">2</text><text class="t-m" x="125" y="171">5</text><text class="t-m" x="295" y="171">1</text><text class="t-m" x="325" y="171">4</text>
<text class="t-m" x="165" y="215">1</text><text class="t-m" x="195" y="215">2</text><text class="t-m" x="225" y="215">4</text><text class="t-m" x="255" y="215">5</text>
</g>
</svg><figcaption>Merge sort on 5, 2, 4, 1. The array is split in half, then in half again, until every piece is a single item, which is already sorted. Then pairs are merged in order: 5 and 2 become 2, 5, and 4 and 1 become 1, 4. A final merge of 2, 5 with 1, 4 gives 1, 2, 4, 5.</figcaption></figure>
<p>Let's trace that final merge. The fronts are 2 and 1: take 1. Now 2 against 4: take 2. Then 5 against 4: take 4. The right list is empty, so copy what is left of the left list, 5. Result: <code>[1, 2, 4, 5]</code>. In code, two index variables <code>i</code> and <code>j</code> track the front of each half, and <code>left.slice(i)</code> and <code>right.slice(j)</code> pick up whatever remains. <code>slice</code> returns a new array without changing the old one, which matters because the task checks that you do not modify the input.</p>
<p>Why O(n log n)? Halving n items down to single items takes about log n levels, and at each level, all the merges together touch every item once, which is n work. So n work, log n times.</p>

<h4>Memoisation: never solve the same problem twice</h4>
<p>The Fibonacci numbers start 0, 1, and each next number is the sum of the two before: 0, 1, 1, 2, 3, 5, 8, 13. The starter <code>fib</code> follows that definition literally: <code>fib(n - 1) + fib(n - 2)</code>. It is correct, and it is a disaster.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="The call tree for fib of 4, where fib of 2 is computed twice">
<g class="ln"><path class="ln" d="M210 50L120 80"/><path class="ln" d="M210 50L300 80"/><path class="ln" d="M120 110L70 140"/><path class="ln" d="M120 110L170 140"/><path class="ln" d="M300 110L250 140"/><path class="ln" d="M300 110L350 140"/><path class="ln" d="M70 170L35 200"/><path class="ln" d="M70 170L105 200"/></g>
<rect class="bx-a" x="179" y="20" width="62" height="30" rx="6"/>
<rect class="bx" x="89" y="80" width="62" height="30" rx="6"/><rect class="bx-warn" x="269" y="80" width="62" height="30" rx="6"/>
<rect class="bx-warn" x="39" y="140" width="62" height="30" rx="6"/><rect class="bx" x="139" y="140" width="62" height="30" rx="6"/><rect class="bx" x="219" y="140" width="62" height="30" rx="6"/><rect class="bx" x="319" y="140" width="62" height="30" rx="6"/>
<rect class="bx" x="4" y="200" width="62" height="30" rx="6"/><rect class="bx" x="74" y="200" width="62" height="30" rx="6"/>
<g text-anchor="middle" class="t-m">
<text class="t-m" x="210" y="41">fib(4)</text><text class="t-m" x="120" y="101">fib(3)</text><text class="t-m" x="300" y="101">fib(2)</text>
<text class="t-m" x="70" y="161">fib(2)</text><text class="t-m" x="170" y="161">fib(1)</text><text class="t-m" x="250" y="161">fib(1)</text><text class="t-m" x="350" y="161">fib(0)</text>
<text class="t-m" x="35" y="221">fib(1)</text><text class="t-m" x="105" y="221">fib(0)</text>
</g>
<text class="t-s t-warn" x="300" y="215" text-anchor="middle">fib(2) worked out twice</text>
</svg><figcaption>Every call to fib makes two more calls. Even for fib of 4, the whole fib of 2 branch is computed twice, highlighted in amber. For bigger numbers the repeats multiply: the tree roughly doubles with each step up, so fib of 70 would make hundreds of trillions of calls.</figcaption></figure>
<p>That doubling makes naive Fibonacci exponential, roughly O(2ⁿ). fib(70) would keep a computer busy for days. Yet there are only 71 different questions it ever asks: fib(0) up to fib(70). The waste is asking them again and again.</p>
<p><b>Memoisation</b> means caching each answer the first time you compute it, and returning the cached answer every time after that. A Map is perfect for this: the key is <code>n</code>, the value is <code>fib(n)</code>.</p>
<pre class="snip">const memo = new Map();              // outside the function, so it lasts
function fib(n) {
  if (n &lt; 2) return n;               // base cases: fib(0)=0, fib(1)=1
  if (memo.has(n)) return memo.get(n); // seen it? instant answer
  const value = fib(n - 1) + fib(n - 2);
  memo.set(n, value);                 // remember before returning
  return value;
}</pre>
<p>Now each fib(k) is computed once, so fib(70) takes about 70 real steps: O(n). fib(70) is 190,392,490,709,135, which is still small enough for a JavaScript number to hold exactly. This "solve each smaller problem once and remember it" idea is the heart of <b>dynamic programming</b>, which the final lesson of this track builds on.</p>
<div class="mistake"><b>Common mistake</b>Creating the memo inside the function, as <code>const memo = new Map()</code> on its first line. Then every call gets its own brand-new, empty map, nothing is ever shared, and it is as slow as before. The cache has to live outside the function, or be passed into each call.</div>

<div class="try"><b>Try it in your head</b>Binary search for 4 in <code>[1, 3, 5]</code>. lo = 0, hi = 2, mid = 1: 3 is smaller than 4, so lo = 2. Now mid = 2: 5 is bigger, so hi = 1. lo (2) has passed hi (1), so return -1. And how many halving steps does binary search need for 1,000 items? About 10.</div>

<h4>Recap</h4>
<ul>
<li>Binary search needs sorted data. Check the middle, discard half, repeat: O(log n). Loop while <code>lo &lt;= hi</code> and step past <code>mid</code>.</li>
<li>A recursive function needs a base case and must move towards it, or the call stack overflows.</li>
<li>Merge sort splits until pieces have one item, then merges sorted halves: O(n log n).</li>
<li>Naive recursive Fibonacci repeats work exponentially. Memoising with a Map makes it O(n).</li>
<li>Memoisation, "remember answers to smaller problems", is the core idea of dynamic programming.</li>
</ul>
`);

explain('a6',`
<h4>Patterns, not memorised answers</h4>
<p>Coding interviews draw on thousands of questions, and nobody memorises them all. The good news is that most of them are built from a small number of <b>patterns</b>: reusable ideas you can recognise from the wording of the question. Spot the pattern and you already know the shape of the answer.</p>
<p>This lesson covers three of the most common ones. The <b>sliding window</b> scans a string or array with a moving frame. <b>One pass with running state</b> remembers one useful fact, like the cheapest price so far, as it goes. <b>Dynamic programming</b> builds the answer to a big problem out of answers to smaller ones, which you started in the last two lessons with memoised Fibonacci. Finally, you will see how to work through a problem out loud in a live interview.</p>

<h4>The sliding window</h4>
<p>The first task: find the length of the longest <b>substring</b> without a repeated character. A substring is an unbroken run of characters, so in <code>"pwwkew"</code>, <code>"wke"</code> is a substring but <code>"pwke"</code> is not, because it skips a letter.</p>
<p>Brute force would check every possible substring, and there are about n² of them, each needing its own check. The sliding window does it in one pass. Picture a frame over the string with a left edge, <code>start</code>, and a right edge, <code>i</code>:</p>
<ul>
<li>Each step, move the right edge one character further, growing the window.</li>
<li>If the new character is already inside the window, the rule is broken. Move the left edge to just past the earlier copy of that character, shrinking the window until it is valid again.</li>
<li>After each step, the window is valid, so compare its length, <code>i - start + 1</code>, with the best so far.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="A window sliding over the string pwwkew, step by step">
<g text-anchor="middle"><text class="t-s" x="40" y="22">i</text><text class="t-s" x="345" y="22">length</text><text class="t-s" x="395" y="22">best</text></g>
<g text-anchor="middle" class="t-s"><text class="t-s" x="40" y="54">0</text><text class="t-s" x="40" y="88">1</text><text class="t-s" x="40" y="122">2</text><text class="t-s" x="40" y="156">3</text><text class="t-s" x="40" y="190">4</text><text class="t-s" x="40" y="224">5</text></g>
<rect class="bx-info" x="80" y="32" width="36" height="30"/><rect class="bx" x="116" y="32" width="36" height="30"/><rect class="bx" x="152" y="32" width="36" height="30"/><rect class="bx" x="188" y="32" width="36" height="30"/><rect class="bx" x="224" y="32" width="36" height="30"/><rect class="bx" x="260" y="32" width="36" height="30"/>
<rect class="bx-info" x="80" y="66" width="36" height="30"/><rect class="bx-info" x="116" y="66" width="36" height="30"/><rect class="bx" x="152" y="66" width="36" height="30"/><rect class="bx" x="188" y="66" width="36" height="30"/><rect class="bx" x="224" y="66" width="36" height="30"/><rect class="bx" x="260" y="66" width="36" height="30"/>
<rect class="bx" x="80" y="100" width="36" height="30"/><rect class="bx" x="116" y="100" width="36" height="30"/><rect class="bx-warn" x="152" y="100" width="36" height="30"/><rect class="bx" x="188" y="100" width="36" height="30"/><rect class="bx" x="224" y="100" width="36" height="30"/><rect class="bx" x="260" y="100" width="36" height="30"/>
<rect class="bx" x="80" y="134" width="36" height="30"/><rect class="bx" x="116" y="134" width="36" height="30"/><rect class="bx-info" x="152" y="134" width="36" height="30"/><rect class="bx-info" x="188" y="134" width="36" height="30"/><rect class="bx" x="224" y="134" width="36" height="30"/><rect class="bx" x="260" y="134" width="36" height="30"/>
<rect class="bx" x="80" y="168" width="36" height="30"/><rect class="bx" x="116" y="168" width="36" height="30"/><rect class="bx-ok" x="152" y="168" width="36" height="30"/><rect class="bx-ok" x="188" y="168" width="36" height="30"/><rect class="bx-ok" x="224" y="168" width="36" height="30"/><rect class="bx" x="260" y="168" width="36" height="30"/>
<rect class="bx" x="80" y="202" width="36" height="30"/><rect class="bx" x="116" y="202" width="36" height="30"/><rect class="bx" x="152" y="202" width="36" height="30"/><rect class="bx-info" x="188" y="202" width="36" height="30"/><rect class="bx-info" x="224" y="202" width="36" height="30"/><rect class="bx-warn" x="260" y="202" width="36" height="30"/>
<g text-anchor="middle" class="t-m">
<text class="t-m" x="98" y="53">p</text><text class="t-m" x="134" y="53">w</text><text class="t-m" x="170" y="53">w</text><text class="t-m" x="206" y="53">k</text><text class="t-m" x="242" y="53">e</text><text class="t-m" x="278" y="53">w</text>
<text class="t-m" x="98" y="87">p</text><text class="t-m" x="134" y="87">w</text><text class="t-m" x="170" y="87">w</text><text class="t-m" x="206" y="87">k</text><text class="t-m" x="242" y="87">e</text><text class="t-m" x="278" y="87">w</text>
<text class="t-m" x="98" y="121">p</text><text class="t-m" x="134" y="121">w</text><text class="t-m" x="170" y="121">w</text><text class="t-m" x="206" y="121">k</text><text class="t-m" x="242" y="121">e</text><text class="t-m" x="278" y="121">w</text>
<text class="t-m" x="98" y="155">p</text><text class="t-m" x="134" y="155">w</text><text class="t-m" x="170" y="155">w</text><text class="t-m" x="206" y="155">k</text><text class="t-m" x="242" y="155">e</text><text class="t-m" x="278" y="155">w</text>
<text class="t-m" x="98" y="189">p</text><text class="t-m" x="134" y="189">w</text><text class="t-m" x="170" y="189">w</text><text class="t-m" x="206" y="189">k</text><text class="t-m" x="242" y="189">e</text><text class="t-m" x="278" y="189">w</text>
<text class="t-m" x="98" y="223">p</text><text class="t-m" x="134" y="223">w</text><text class="t-m" x="170" y="223">w</text><text class="t-m" x="206" y="223">k</text><text class="t-m" x="242" y="223">e</text><text class="t-m" x="278" y="223">w</text>
<text class="t-m" x="345" y="53">1</text><text class="t-m" x="345" y="87">2</text><text class="t-m" x="345" y="121">1</text><text class="t-m" x="345" y="155">2</text><text class="t-m" x="345" y="189">3</text><text class="t-m" x="345" y="223">3</text>
<text class="t-m" x="395" y="53">1</text><text class="t-m" x="395" y="87">2</text><text class="t-m" x="395" y="121">2</text><text class="t-m" x="395" y="155">2</text><text class="t-b t-ok" x="395" y="189">3</text><text class="t-b t-ok" x="395" y="223">3</text>
</g>
</svg><figcaption>The window sliding over "pwwkew". The shaded boxes are the window after each step. At i equals 2 the second w repeats, so the left edge jumps past the first w and the window shrinks to just "w". It then grows to "wke", length 3. At i equals 5 another w repeats, so the window becomes "kew", still length 3. The best is 3.</figcaption></figure>
<p>How do you know where the earlier copy is? Keep a Map from each character to the index where you <b>last saw</b> it, which is the hash map habit from earlier lessons. Each character enters and leaves the window at most once, so the whole thing is O(n).</p>
<div class="mistake"><b>Common mistake</b>Moving the left edge backwards. Take <code>"abba"</code>. At the second b, start jumps to 2. At the final a, the map says a was last seen at index 0. That copy is already <i>outside</i> the window, so you must ignore it. Only move <code>start</code> when the last-seen index is <code>&gt;= start</code>. Without that check you set start back to 1 and get 3 instead of the correct 2.</div>

<h4>One pass with running state: the stock problem</h4>
<p>The second task: given a list of daily prices, find the best profit from buying on one day and selling on a <i>later</i> day. If prices only fall, the answer is 0, meaning "don't trade".</p>
<p>Brute force tries every buy day with every later sell day: O(n²). The insight is that if you are selling today, the best day to have bought was the <b>cheapest day so far</b>. So walk the prices once and remember two things: the lowest price seen, and the best profit seen.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="A line chart of the prices 7, 1, 5, 3, 6, 4 with the best buy and sell days marked">
<line class="ln" x1="40" y1="200" x2="400" y2="200"/>
<polyline class="ln-a" fill="none" points="60,46 120,178 180,90 240,134 300,68 360,112"/>
<circle class="dot" cx="60" cy="46" r="5"/><circle class="dot-ok" cx="120" cy="178" r="7"/><circle class="dot" cx="180" cy="90" r="5"/><circle class="dot" cx="240" cy="134" r="5"/><circle class="dot-ok" cx="300" cy="68" r="7"/><circle class="dot" cx="360" cy="112" r="5"/>
<g text-anchor="middle"><text class="t-m" x="60" y="34">7</text><text class="t-m" x="96" y="182">1</text><text class="t-m" x="180" y="78">5</text><text class="t-m" x="240" y="122">3</text><text class="t-m" x="300" y="56">6</text><text class="t-m" x="360" y="100">4</text>
<text class="t-s" x="60" y="220">day 0</text><text class="t-s" x="120" y="220">1</text><text class="t-s" x="180" y="220">2</text><text class="t-s" x="240" y="220">3</text><text class="t-s" x="300" y="220">4</text><text class="t-s" x="360" y="220">5</text>
<text class="t-s t-ok" x="120" y="196">buy</text><text class="t-b t-ok" x="374" y="160">profit 5</text></g>
<line class="ln-d" x1="120" y1="178" x2="330" y2="178"/><path class="ln-ok" d="M330 176V76"/><polygon class="ah-ok" points="324,78 336,78 330,70"/>
</svg><figcaption>The prices 7, 1, 5, 3, 6 and 4 as a line. The lowest point so far is 1, on day 1, marked as the buy. The highest price after it is 6, on day 4. Selling there makes a profit of 6 minus 1, which is 5.</figcaption></figure>
<p>Trace <code>[7, 1, 5, 3, 6, 4]</code>: lowest starts as <code>Infinity</code>, a value bigger than any price, so the first price always replaces it. After 7, lowest is 7 and best is 0. After 1, lowest is 1. At 5, profit 4 becomes best. At 3, profit 2, no change. At 6, profit 5, the new best. At 4, profit 3, no change. Answer: 5. For an empty list the loop never runs and you return 0.</p>

<h4>Dynamic programming: big answers from small ones</h4>
<p><b>Dynamic programming</b>, or DP, is a fancy name for a simple idea: if the answer for n can be built from answers for smaller numbers, work out the small answers first, store them, and build upwards. It is memoisation from the Fibonacci exercise, done in a loop instead of with recursion.</p>
<p>Every DP solution answers three questions:</p>
<ol>
<li><b>What does dp[x] mean?</b> Say it in one plain sentence.</li>
<li><b>What are the base cases?</b> The smallest answers you know without calculating.</li>
<li><b>What is the rule</b> that builds dp[x] from smaller entries?</li>
</ol>

<h4>Worked example: climbing stairs</h4>
<p>You climb a staircase taking 1 or 2 steps at a time. How many different ways are there to reach step n?</p>
<p>Think about your <b>last move</b>. To stand on step n, you either came from step n − 1 with a single step, or from step n − 2 with a double step. Those are the only options, and they never overlap. So the number of ways is <code>ways(n - 1) + ways(n - 2)</code>.</p>
<div class="tbl-wrap"><table><tr><th>n</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
<tr><td>ways</td><td>1</td><td>1</td><td>2</td><td>3</td><td>5</td><td>8</td></tr></table></div>
<p>The base cases: 1 way to be on step 0 (do nothing) and 1 way to reach step 1. Every later entry is the sum of the two before it, so this is the Fibonacci pattern again. Since each step only needs the previous two values, you can keep just two variables, <code>a</code> and <code>b</code>, and slide them forward. That makes it O(n) time and O(1) space, and n = 45 finishes instantly.</p>

<h4>Worked example: coin change, filling a DP table</h4>
<p>The last task: given coin values, find the <b>fewest</b> coins that add up to an amount, or -1 if it cannot be done. With coins <code>[1, 2, 5]</code> and amount 11, the answer is 3: 5 + 5 + 1.</p>
<p>Greedy guessing, always taking the biggest coin, can fail with odd coin sets, so DP it is. The three questions:</p>
<ul>
<li><b>Meaning:</b> <code>dp[x]</code> is the fewest coins that make the amount x.</li>
<li><b>Base case:</b> <code>dp[0] = 0</code>. Making 0 takes no coins. Every other entry starts as <code>Infinity</code>, meaning "not possible yet".</li>
<li><b>Rule:</b> to make x, your last coin was some coin c. Before it you had made x − c, which took <code>dp[x - c]</code> coins. So try every coin and keep the smallest <code>dp[x - c] + 1</code>.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="The coin change table for coins 1, 2 and 5, filled from amount 0 to 11">
<text class="t-m" x="210" y="24" text-anchor="middle">coins [1, 2, 5], amount 11</text>
<path class="ln-a" fill="none" d="M245 130Q320 40 393 130"/><path class="ln-a" fill="none" d="M335 130Q365 95 393 130"/><path class="ln-a" fill="none" d="M365 130Q380 110 393 130"/>
<text class="t-s" x="4" y="153">dp[x]</text><text class="t-s" x="4" y="186">x</text>
<rect class="bx" x="50" y="130" width="30" height="36"/><rect class="bx" x="80" y="130" width="30" height="36"/><rect class="bx" x="110" y="130" width="30" height="36"/><rect class="bx" x="140" y="130" width="30" height="36"/><rect class="bx" x="170" y="130" width="30" height="36"/><rect class="bx" x="200" y="130" width="30" height="36"/><rect class="bx-info" x="230" y="130" width="30" height="36"/><rect class="bx" x="260" y="130" width="30" height="36"/><rect class="bx" x="290" y="130" width="30" height="36"/><rect class="bx-info" x="320" y="130" width="30" height="36"/><rect class="bx-info" x="350" y="130" width="30" height="36"/><rect class="bx-ok" x="380" y="130" width="30" height="36"/>
<g text-anchor="middle">
<text class="t-m" x="65" y="154">0</text><text class="t-m" x="95" y="154">1</text><text class="t-m" x="125" y="154">1</text><text class="t-m" x="155" y="154">2</text><text class="t-m" x="185" y="154">2</text><text class="t-m" x="215" y="154">1</text><text class="t-m" x="245" y="154">2</text><text class="t-m" x="275" y="154">2</text><text class="t-m" x="305" y="154">3</text><text class="t-m" x="335" y="154">3</text><text class="t-m" x="365" y="154">2</text><text class="t-b t-ok" x="395" y="154">3</text>
<text class="t-s" x="65" y="186">0</text><text class="t-s" x="95" y="186">1</text><text class="t-s" x="125" y="186">2</text><text class="t-s" x="155" y="186">3</text><text class="t-s" x="185" y="186">4</text><text class="t-s" x="215" y="186">5</text><text class="t-s" x="245" y="186">6</text><text class="t-s" x="275" y="186">7</text><text class="t-s" x="305" y="186">8</text><text class="t-s" x="335" y="186">9</text><text class="t-s" x="365" y="186">10</text><text class="t-s" x="395" y="186">11</text>
<text class="t-s" x="210" y="222">dp[11] = 1 + smallest of dp[10], dp[9], dp[6] = 3</text>
</g>
</svg><figcaption>The table is filled from left to right, starting with dp of 0 equals 0. To fill dp of 11, look back by each coin: 1 step back to dp of 10, 2 back to dp of 9, and 5 back to dp of 6. The smallest of those is 2, so dp of 11 is 2 plus 1, which is 3 coins.</figcaption></figure>
<p>Check one entry by hand. dp[6]: coin 1 gives dp[5] + 1 = 2; coin 2 gives dp[4] + 1 = 3; coin 5 gives dp[1] + 1 = 2. The smallest is 2 (5 + 1). Filling the table is O(amount × number of coins).</p>
<p>At the end, if <code>dp[amount]</code> is still <code>Infinity</code>, no combination worked, so return -1. With coins <code>[2]</code> and amount 3, dp[1] stays Infinity, and dp[3] = dp[1] + 1 is Infinity too. <code>Infinity + 1</code> is still Infinity in JavaScript, which is why it makes a safe "impossible" marker.</p>
<div class="mistake"><b>Common mistake</b>Filling the array with 0 instead of <code>Infinity</code>. Then <code>Math.min</code> always picks the 0, every amount looks free, and you return 0 coins. Start every entry except dp[0] as "impossible", and let the rule improve them.</div>

<h4>How to work through a problem in an interview</h4>
<p>Interviewers grade how you think as much as the final code. A reliable routine:</p>
<ol>
<li><b>Clarify.</b> Repeat the problem in your own words and ask about edge cases: can the input be empty? Are there negative numbers?</li>
<li><b>Work an example by hand</b>, out loud, like the traces in this lesson.</li>
<li><b>State the brute force</b> and its Big-O. It proves you can solve it, and gives you something to improve.</li>
<li><b>Optimise.</b> Ask which pattern the wording suggests: "longest substring" suggests a window, "how many ways" or "fewest" suggests DP, "have I seen this?" suggests a hash map.</li>
<li><b>Test edge cases</b>: empty input, one item, all the same, impossible cases.</li>
</ol>

<div class="try"><b>Try it in your head</b>How many ways are there to climb 6 stairs? The table continues 5, 8, so the next is 5 + 8 = 13. And what is the longest substring without repeats in <code>"bbbbb"</code>? Every new b repeats, so the window never grows past 1.</div>

<h4>Recap</h4>
<ul>
<li>Sliding window: grow the right edge, and when the rule breaks, move the left edge forward, never back.</li>
<li>One pass with running state: remember the lowest price so far and the best profit so far.</li>
<li>Dynamic programming: define dp[x] in words, set the base cases, then build each entry from smaller ones.</li>
<li>climbStairs adds the two previous answers; coin change takes the best of <code>dp[x - c] + 1</code>, with Infinity meaning impossible.</li>
<li>In interviews: clarify, work an example, state the brute force, optimise, then test edge cases.</li>
</ul>
`);
