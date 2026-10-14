/* php: "Explained step by step" walkthroughs. */

explain('hb1',`
<h4>Why PHP exists: pages that change for each visitor</h4>
<p>A plain web page is a file that never changes. Everyone who opens it sees exactly the same words. That is fine for a poster, but useless for a shop, a forum or your inbox, where the page must show <i>your</i> basket, <i>your</i> messages and today's prices.</p>
<p>The fix is to have a program build the page at the moment someone asks for it. That program runs on a <b>server</b>: a computer, usually in a data centre, whose job is to answer requests from other computers. <b>PHP</b> is a programming language made for exactly this job. It powers WordPress, which runs a large share of all websites, as well as Wikipedia's software and apps built with the Laravel framework.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="A browser sends a request to a server, PHP runs and builds HTML, which is sent back">
<rect class="bx" x="10" y="46" width="100" height="156" rx="10"/>
<text class="t-b" x="60" y="118" text-anchor="middle">Browser</text>
<text class="t-s" x="60" y="138" text-anchor="middle">your device</text>
<rect class="bx-info" x="215" y="8" width="195" height="204" rx="10"/>
<text class="t-b" x="312" y="32" text-anchor="middle">Server</text>
<rect class="bx-a" x="230" y="46" width="165" height="40" rx="6"/>
<text class="t" x="312" y="71" text-anchor="middle">Web server</text>
<path class="ln" d="M312 86v10"/><polygon class="ah" points="306,96 318,96 312,104"/>
<rect class="bx-ok" x="230" y="104" width="165" height="40" rx="6"/>
<text class="t" x="312" y="129" text-anchor="middle">2. PHP runs code</text>
<path class="ln" d="M312 144v10"/><polygon class="ah" points="306,154 318,154 312,162"/>
<rect class="bx" x="230" y="162" width="165" height="40" rx="6"/>
<text class="t" x="312" y="187" text-anchor="middle">HTML is built</text>
<path class="ln-a" d="M110 66H222"/><polygon class="ah-a" points="222,60 222,72 230,66"/>
<text class="t-s" x="165" y="56" text-anchor="middle">1. request</text>
<path class="ln-ok" d="M230 182H118"/><polygon class="ah-ok" points="120,176 120,188 112,182"/>
<text class="t-s" x="165" y="172" text-anchor="middle">3. HTML back</text>
</svg><figcaption>Step 1: your browser asks the server for a page. Step 2: the web server hands the PHP file to PHP, which runs the code. Step 3: the finished HTML is sent back. The browser never sees the PHP code, only its result.</figcaption></figure>
<p>That last point is important. PHP runs <b>before</b> the page leaves the server. Your browser only receives the output, so visitors cannot read your PHP code. In this lesson's editor there is no browser in the middle: you press Run and the output appears below, which is the same thing a browser would have received.</p>
<div class="analogy"><b>Think of it like</b>A restaurant kitchen. You (the browser) order a dish. The cook (PHP) follows a recipe (your code) in the kitchen, where you cannot see. Only the finished plate (the HTML) comes out to your table.</div>

<h4>The rules of a PHP file</h4>
<p>A PHP file is a plain text file whose name ends in <code>.php</code>. Three small rules cover almost everything at the start:</p>
<ol>
<li><b>The opening tag.</b> PHP code starts after <code>&lt;?php</code>. Anything before that tag is treated as ordinary text, not code.</li>
<li><b>Statements end with a semicolon.</b> A <b>statement</b> is one instruction, like "print this" or "remember that". PHP needs a <code>;</code> at the end of each one, the way a sentence needs a full stop.</li>
<li><b>Comments are for humans.</b> Anything after <code>//</code> on a line is a <b>comment</b>: a note PHP ignores completely.</li>
</ol>
<pre class="snip">&lt;?php
// This is a comment. PHP skips it.
echo "Hello, world!\\n";   // prints Hello, world! then a new line</pre>
<p><code>echo</code> is PHP's word for "print this". The text in double quotes is called a <b>string</b>, which just means a piece of text. The <code>\\n</code> at the end is a special code meaning "new line". Without it, the next thing you print would carry on straight after, on the same line.</p>

<h4>Variables: named boxes for values</h4>
<p>Programs need to remember things: a name, an age, a price. A <b>variable</b> is a named box that holds one value. In PHP, every variable name starts with a dollar sign, which makes variables easy to spot.</p>
<pre class="snip">$name = "Ada";   // a string: text, always in quotes
$age = 36;       // an integer: a whole number, no quotes
echo $name;      // prints Ada</pre>
<p>The <code>=</code> sign does not mean "equals" as in maths. It means <b>"store"</b>: work out the value on the right, then put it into the box named on the left. Read <code>$age = 36;</code> aloud as "age becomes 36".</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Three variables as labelled boxes holding values">
<rect class="bx-a" x="10" y="14" width="120" height="44" rx="6"/><text class="t-m" x="70" y="42" text-anchor="middle">$name</text>
<path class="ln" d="M130 36h44"/><polygon class="ah" points="174,30 174,42 182,36"/>
<rect class="bx" x="184" y="14" width="110" height="44" rx="6"/><text class="t-m" x="239" y="42" text-anchor="middle">"Ada"</text>
<text class="t-s" x="306" y="41">string</text>
<rect class="bx-a" x="10" y="74" width="120" height="44" rx="6"/><text class="t-m" x="70" y="102" text-anchor="middle">$age</text>
<path class="ln" d="M130 96h44"/><polygon class="ah" points="174,90 174,102 182,96"/>
<rect class="bx" x="184" y="74" width="110" height="44" rx="6"/><text class="t-m" x="239" y="102" text-anchor="middle">36</text>
<text class="t-s" x="306" y="101">integer</text>
<rect class="bx-a" x="10" y="134" width="120" height="44" rx="6"/><text class="t-m" x="70" y="162" text-anchor="middle">$total</text>
<path class="ln" d="M130 156h44"/><polygon class="ah" points="174,150 174,162 182,156"/>
<rect class="bx" x="184" y="134" width="110" height="44" rx="6"/><text class="t-m" x="239" y="162" text-anchor="middle">30</text>
<text class="t-s" x="306" y="161">integer</text>
<text class="t-s" x="210" y="202" text-anchor="middle">Each name points at the value stored in it</text>
</svg><figcaption>Each variable is a label (on the left) attached to a value (in the middle). Text values are strings and sit in quotes. Whole numbers are integers and have no quotes.</figcaption></figure>
<p>A few naming rules: after the <code>$</code>, a name starts with a letter or an underscore, then letters, digits and underscores. Names are <b>case-sensitive</b>, so <code>$name</code> and <code>$Name</code> are two different boxes. Pick names that say what is inside: <code>$price</code> beats <code>$p</code>.</p>
<p>You can store a new value in a box at any time. The old value is simply replaced.</p>

<h4>Doing maths</h4>
<p>PHP understands the usual arithmetic signs: <code>+</code> add, <code>-</code> subtract, <code>*</code> multiply (a star, not an x) and <code>/</code> divide. You can calculate with variables too, which is where they become really useful:</p>
<pre class="snip">$price = 10;
$qty = 3;
$total = $price * $qty;   // PHP works out 10 * 3, then stores 30</pre>
<p>Notice the order of events. PHP looks up <code>$price</code> (10) and <code>$qty</code> (3), multiplies them, and only then stores the answer in <code>$total</code>. If you later change <code>$price</code>, <code>$total</code> does not update by itself. It holds the answer from the moment it was calculated.</p>

<h4>Joining text with the dot</h4>
<p>You will constantly want to build a sentence out of pieces: some fixed words plus the values in your variables. Joining strings together is called <b>concatenation</b>, and PHP uses a full stop, the <b>dot operator</b>, to do it.</p>
<pre class="snip">echo $name . " is " . $age . " years old.\\n";
// prints: Ada is 36 years old.</pre>
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="Four pieces joined by dots into one sentence">
<rect class="bx-info" x="6" y="20" width="66" height="40" rx="6"/><text class="t-m" x="39" y="46" text-anchor="middle">$name</text>
<text class="t-b t-a" x="82" y="48" text-anchor="middle" style="font-size:22px">.</text>
<rect class="bx-info" x="92" y="20" width="78" height="40" rx="6"/><text class="t-m" x="131" y="46" text-anchor="middle">" is "</text>
<text class="t-b t-a" x="180" y="48" text-anchor="middle" style="font-size:22px">.</text>
<rect class="bx-info" x="190" y="20" width="58" height="40" rx="6"/><text class="t-m" x="219" y="46" text-anchor="middle">$age</text>
<text class="t-b t-a" x="258" y="48" text-anchor="middle" style="font-size:22px">.</text>
<rect class="bx-info" x="268" y="20" width="146" height="40" rx="6"/><text class="t-m" x="341" y="46" text-anchor="middle">" years old."</text>
<path class="ln" d="M39 60L210 104M131 60L210 104M219 60L210 104M341 60L210 104"/>
<polygon class="ah" points="204,104 216,104 210,112"/>
<rect class="bx-ok" x="90" y="112" width="240" height="44" rx="6"/><text class="t-m" x="210" y="139" text-anchor="middle">Ada is 36 years old.</text>
<text class="t-s" x="210" y="180" text-anchor="middle">The number 36 is turned into the text "36"</text>
</svg><figcaption>Each dot glues the piece on its left to the piece on its right. The spaces live inside the quoted pieces, and the number 36 is converted to text automatically.</figcaption></figure>
<p>Two details catch people out. First, the spaces: <code>" is "</code> has a space at each end. Write <code>"is"</code> and <code>"years old."</code> without them and you get <code>Adais36years old.</code>, because the dot adds nothing between the pieces. Second, <code>$age</code> holds a number, but the dot needs text, so PHP quietly turns 36 into the string "36" for you.</p>

<h4>Double quotes fill in variables, single quotes do not</h4>
<p>There is a shorter way to build the same sentence. Inside <b>double quotes</b>, PHP looks for variable names and swaps in their values. This is called <b>interpolation</b>. Inside <b>single quotes</b>, PHP takes every character literally and swaps in nothing.</p>
<div class="tbl-wrap"><table><tr><th>You write</th><th>PHP prints</th></tr>
<tr><td><code>echo "Hi, $name!";</code></td><td>Hi, Ada!</td></tr>
<tr><td><code>echo 'Hi, $name!';</code></td><td>Hi, $name!</td></tr>
<tr><td><code>echo "Total: $total\\n";</code></td><td>Total: 30, then a new line</td></tr>
<tr><td><code>echo 'Total\\n';</code></td><td>Total\\n, with the backslash and n shown as typed</td></tr></table></div>
<p>The last row shows that <code>\\n</code> only means "new line" inside double quotes too. Single quotes are still useful: they are a clear signal that a string is plain fixed text with nothing to fill in.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>echo 'Total: $total';</code> and wondering why the screen shows the dollar sign and the word total. Single quotes never fill in variables. Switch to double quotes, or join with the dot: <code>'Total: ' . $total</code>.</div>

<h4>Built-in functions: ready-made tools</h4>
<p>A <b>function</b> is a named piece of code that does one job. PHP ships with thousands of them, called built-in functions. You <b>call</b> a function by writing its name followed by brackets, and you put the value it should work on inside the brackets. That value is called an <b>argument</b>. The function hands back an answer, called its <b>return value</b>.</p>
<pre class="snip">echo strlen("Ada");        // 3: the number of characters
echo strtoupper("ada");    // ADA: the same text in capitals
echo strtoupper($name);    // works on variables too: ADA</pre>
<p>The names are short for "string length" and "string to upper case". Because a function call produces a value, you can use it anywhere a value fits, including in the middle of a dot chain. Let's build "ADA has 3 letters" step by step:</p>
<ol>
<li><code>strtoupper($name)</code> gives <code>"ADA"</code>.</li>
<li><code>" has "</code> is fixed text, with a space at each end.</li>
<li><code>strlen($name)</code> gives <code>3</code>, which the dot turns into "3".</li>
<li><code>" letters\\n"</code> finishes the sentence and the line.</li>
</ol>
<p>Glue those four pieces with three dots and echo the result. Note that function calls are not run inside double quotes: <code>"strlen($name)"</code> prints <code>strlen(Ada)</code>, because only the variable is filled in. For function results you need the dot.</p>
<div class="tip"><b>Tip</b><code>strlen()</code> actually counts <b>bytes</b>, the units computers store text in. For plain English letters one letter is one byte, but an accented letter like é takes two. When you work with names from around the world, use <code>mb_strlen()</code>, which counts real characters.</div>

<h4>Reading the errors you will hit</h4>
<p>Errors are PHP telling you exactly where it got confused. The two you will meet first:</p>
<ul>
<li><b>Parse error: syntax error, unexpected ...</b> means PHP could not even read your code. The usual cause is a missing semicolon or a missing closing quote. PHP only notices the problem when it reaches the <i>next</i> thing, so look at the end of the line <b>before</b> the one it mentions.</li>
<li><b>Warning: Undefined variable $nme</b> means you used a name that was never given a value. Nine times out of ten it is a typo. Compare the spelling, including capital letters, with the line where you stored it.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Forgetting the <code>$</code>. Writing <code>name = "Ada";</code> is a syntax error, because without the dollar sign PHP does not know you mean a variable.</div>
<div class="try"><b>Try it in your head</b>Given <code>$city = "Leeds";</code>, what do these print? First, <code>echo "I live in $city";</code>. Second, <code>echo 'I live in ' . $city;</code>. Third, <code>echo strlen($city);</code>. Answers: the first two both print I live in Leeds (one by interpolation, one by the dot), and the third prints 5.</div>

<h4>Recap</h4>
<ul>
<li>PHP runs on the server and sends only its output, usually HTML, to the browser.</li>
<li>Code starts after <code>&lt;?php</code>, every statement ends with <code>;</code>, and <code>echo</code> prints.</li>
<li>Variables start with <code>$</code>, and <code>=</code> means "store the right side in the left".</li>
<li>The dot joins strings; double quotes fill in variables and <code>\\n</code>, single quotes take everything literally.</li>
<li>Functions like <code>strlen()</code> and <code>strtoupper()</code> take an argument in brackets and return a value you can echo or join.</li>
</ul>
`);

explain('hb2',`
<h4>Why programs need to decide, repeat and reuse</h4>
<p>So far your code has run like a shopping list: line one, then line two, then line three, every time, no matter what. Real programs need three more abilities:</p>
<ul>
<li><b>Decide</b>: do one thing or another depending on the situation. A score of 95 should get an A, a score of 40 should not.</li>
<li><b>Repeat</b>: do the same job many times without copying the code. Print every item in a list, however long it is.</li>
<li><b>Reuse</b>: give a useful piece of code a name, then run it whenever you need it.</li>
</ul>
<p>Almost every language has these three tools, with only small changes of spelling. Learn them properly once and they carry over to JavaScript, Python and the rest.</p>

<h4>Questions with yes or no answers</h4>
<p>Before PHP can decide anything, it needs a question it can answer with yes or no. In code, yes and no are the values <code>true</code> and <code>false</code>, called <b>booleans</b>. You get them by comparing two values:</p>
<div class="tbl-wrap"><table><tr><th>Operator</th><th>Question it asks</th><th>Example</th></tr>
<tr><td><code>&gt;</code> and <code>&lt;</code></td><td>Greater than? Less than?</td><td><code>30 &gt; 25</code> is true</td></tr>
<tr><td><code>&gt;=</code> and <code>&lt;=</code></td><td>Greater than or equal? Less than or equal?</td><td><code>90 &gt;= 90</code> is true</td></tr>
<tr><td><code>===</code></td><td>Exactly equal, same value and same type?</td><td><code>5 === 5</code> is true</td></tr>
<tr><td><code>!==</code></td><td>Not exactly equal?</td><td><code>5 !== 6</code> is true</td></tr></table></div>
<p>PHP also has a looser <code>==</code> that converts types before comparing, so <code>"5" == 5</code> is true. Modern PHP code prefers the strict <code>===</code>, because it has no surprises. And remember from the last lesson: a single <code>=</code> is not a question at all. It stores a value.</p>

<h4>Decisions with if, elseif and else</h4>
<p>An <code>if</code> statement runs a block of code only when its question is true. The question goes in round brackets, and the code that belongs to it goes inside curly braces <code>{ }</code>, which mark where the block starts and stops.</p>
<pre class="snip">if ($temp &gt; 25) {
    echo "T-shirt\\n";
} elseif ($temp &gt; 15) {     // only asked if the first was false
    echo "Jumper\\n";
} else {                    // none of the above was true
    echo "Coat\\n";
}</pre>
<p>PHP asks the questions <b>from top to bottom</b> and stops at the first one that is true. It runs that block, skips all the others, and carries on after the final brace. <code>else</code> has no question: it catches everything that fell through. At most one branch ever runs.</p>
<p>This lesson's first task is a grading function: 90 or more is an A, 80 or more a B, 70 or more a C, anything else an F. Here is how PHP walks through it for a score of 85:</p>
<figure class="fig"><svg viewBox="0 0 420 290" role="img" aria-label="Grading decision flow, with the path for a score of 85 highlighted">
<rect class="bx" x="30" y="10" width="250" height="44" rx="6"/><text class="t-m" x="155" y="38" text-anchor="middle">$score &gt;= 90</text>
<path class="ln" d="M280 32H318"/><polygon class="ah" points="318,26 318,38 326,32"/><text class="t-s" x="302" y="22" text-anchor="middle">yes</text>
<rect class="bx" x="326" y="10" width="84" height="44" rx="6"/><text class="t-m" x="368" y="38" text-anchor="middle">'A'</text>
<path class="ln-a" d="M155 54v12"/><polygon class="ah-a" points="149,66 161,66 155,74"/><text class="t-s t-a" x="165" y="68">no</text>
<rect class="bx-ok" x="30" y="74" width="250" height="44" rx="6"/><text class="t-m" x="155" y="102" text-anchor="middle">$score &gt;= 80</text>
<path class="ln-ok" d="M280 96H318"/><polygon class="ah-ok" points="318,90 318,102 326,96"/><text class="t-s t-ok" x="302" y="86" text-anchor="middle">yes</text>
<rect class="bx-ok" x="326" y="74" width="84" height="44" rx="6"/><text class="t-m" x="368" y="102" text-anchor="middle">'B'</text>
<path class="ln-d" d="M155 118v12"/><polygon class="ah" points="149,130 161,130 155,138"/><text class="t-s" x="165" y="132">no</text>
<rect class="bx" x="30" y="138" width="250" height="44" rx="6"/><text class="t-m" x="155" y="166" text-anchor="middle">$score &gt;= 70</text>
<path class="ln" d="M280 160H318"/><polygon class="ah" points="318,154 318,166 326,160"/><text class="t-s" x="302" y="150" text-anchor="middle">yes</text>
<rect class="bx" x="326" y="138" width="84" height="44" rx="6"/><text class="t-m" x="368" y="166" text-anchor="middle">'C'</text>
<path class="ln-d" d="M155 182v12"/><polygon class="ah" points="149,194 161,194 155,202"/><text class="t-s" x="165" y="196">no</text>
<rect class="bx" x="30" y="202" width="250" height="44" rx="6"/><text class="t" x="155" y="230" text-anchor="middle">else: none matched</text>
<path class="ln" d="M280 224H318"/><polygon class="ah" points="318,218 318,230 326,224"/>
<rect class="bx" x="326" y="202" width="84" height="44" rx="6"/><text class="t-m" x="368" y="230" text-anchor="middle">'F'</text>
<text class="t-s" x="210" y="276" text-anchor="middle">For 85: the first test fails, the second passes</text>
</svg><figcaption>PHP asks each question in order and takes the first "yes". For a score of 85, "is it at least 90?" is no, "is it at least 80?" is yes, so the answer is B and the remaining questions are never asked.</figcaption></figure>
<p>Because PHP stops at the first true question, the <b>order</b> matters. Checking "at least 70" first would give 95 a C, because 95 is also at least 70. Always test the strictest condition first.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>if ($score = 90)</code> with a single equals sign. That does not compare: it stores 90 in <code>$score</code>, and the whole thing counts as true, so the branch always runs. Use <code>&gt;=</code>, <code>===</code> or another comparison.</div>

<h4>Arrays: one variable, many values</h4>
<p>To repeat something for every item, you first need a way to hold several items. An <b>array</b> is a list of values stored in one variable. You write it with square brackets and commas:</p>
<pre class="snip">$items = ['bread', 'milk', 'eggs'];
echo $items[0];         // bread: positions start at 0
echo count($items);     // 3: how many items</pre>
<p>Each item has a position number called an <b>index</b>, and PHP counts from 0, so <code>'bread'</code> is at index 0 and <code>'eggs'</code> at index 2. The built-in function <code>count()</code> tells you how many items there are. You will learn much more about arrays in the next lesson.</p>

<h4>foreach: once for every item</h4>
<p>A <b>loop</b> is code that runs again and again. The friendliest loop is <code>foreach</code>, which means "for each item in this array, do this":</p>
<pre class="snip">foreach ($items as $item) {
    echo "- $item\\n";
}
// - bread
// - milk
// - eggs</pre>
<p>Read the first line as "go through <code>$items</code>, and each time round, call the current one <code>$item</code>". The loop runs the block three times. On the first round <code>$item</code> holds <code>'bread'</code>, on the second <code>'milk'</code>, on the third <code>'eggs'</code>, and then the loop ends because there is nothing left. You never manage a position number yourself, which is why <code>foreach</code> is the right choice whenever you want every item.</p>
<p>The name after <code>as</code> is your choice. A common habit is the plural for the array and the singular for one item: <code>$items</code> and <code>$item</code>, <code>$users</code> and <code>$user</code>.</p>

<h4>for: counting loops</h4>
<p>Sometimes you are not walking through a list but counting: "do this for 1, 2, 3, up to n". That is the job of the <code>for</code> loop. Its brackets hold three parts separated by semicolons:</p>
<pre class="snip">for ($i = 1; $i &lt;= 3; $i++) {
    echo $i;            // prints 123
}</pre>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="The for loop cycle: start, check, body, step, back to check">
<text class="t-s" x="75" y="52" text-anchor="middle">1. start</text>
<rect class="bx-info" x="20" y="60" width="110" height="40" rx="6"/><text class="t-m" x="75" y="85" text-anchor="middle">$i = 1</text>
<path class="ln" d="M130 80H152"/><polygon class="ah" points="152,74 152,86 160,80"/>
<rect class="bx-a" x="160" y="60" width="140" height="40" rx="6"/><text class="t-m" x="230" y="85" text-anchor="middle">$i &lt;= 3</text>
<text class="t-s" x="195" y="52" text-anchor="middle">2. check</text>
<path class="ln" d="M230 60V30H312"/><polygon class="ah" points="312,24 312,36 320,30"/><text class="t-s" x="238" y="50">false</text>
<rect class="bx" x="320" y="10" width="90" height="40" rx="6"/><text class="t" x="365" y="35" text-anchor="middle">loop ends</text>
<path class="ln-ok" d="M230 100V122"/><polygon class="ah-ok" points="224,122 236,122 230,130"/><text class="t-s t-ok" x="238" y="118">true</text>
<rect class="bx" x="160" y="130" width="140" height="40" rx="6"/><text class="t" x="230" y="155" text-anchor="middle">run the body</text>
<path class="ln" d="M300 150H312"/><polygon class="ah" points="312,144 312,156 320,150"/>
<rect class="bx-ok" x="320" y="130" width="90" height="40" rx="6"/><text class="t-m" x="365" y="155" text-anchor="middle">$i++</text>
<text class="t-s" x="365" y="190" text-anchor="middle">3. step</text>
<path class="ln" d="M365 130V80H308"/><polygon class="ah" points="308,74 308,86 300,80"/>
<text class="t-s" x="210" y="222" text-anchor="middle">Start runs once. Check runs before every round.</text>
<text class="t-s" x="210" y="242" text-anchor="middle">Step runs after every round.</text>
</svg><figcaption>The three parts of a for loop. The start sets the counter once. The check is asked before every round: true runs the body, false ends the loop. The step runs after every round, then the check is asked again.</figcaption></figure>
<p><code>$i++</code> is short for "add 1 to <code>$i</code>". Another shortcut you will want is <code>$total += $i</code>, which means "add <code>$i</code> to whatever <code>$total</code> already holds". It is the same as <code>$total = $total + $i</code>.</p>
<p>Put those together and you can add up 1 + 2 + 3 + 4. Start a running total at 0 before the loop, then add the counter on each round. Here is the trace for n = 4:</p>
<div class="tbl-wrap"><table><tr><th>Round</th><th><code>$i</code></th><th>Check <code>$i &lt;= 4</code></th><th><code>$total</code> after the body</th></tr>
<tr><td>1</td><td>1</td><td>true</td><td>0 + 1 = 1</td></tr>
<tr><td>2</td><td>2</td><td>true</td><td>1 + 2 = 3</td></tr>
<tr><td>3</td><td>3</td><td>true</td><td>3 + 3 = 6</td></tr>
<tr><td>4</td><td>4</td><td>true</td><td>6 + 4 = 10</td></tr>
<tr><td>-</td><td>5</td><td>false: loop ends</td><td>10</td></tr></table></div>
<p>What if n is 0? The very first check, 1 &lt;= 0, is false, so the body never runs and the total stays 0. That is exactly right, and the task tests it.</p>

<h4>Functions: name a job, then reuse it</h4>
<p>In the last lesson you called built-in functions like <code>strlen()</code>. Now you write your own. A function definition has four parts: the word <code>function</code>, a name, the <b>parameters</b> in brackets, and a body in braces.</p>
<pre class="snip">function area(int $width, int $height): int {
    return $width * $height;
}
echo area(3, 4);   // 12</pre>
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Function as a machine: two parameters in, one return value out">
<text class="t-s" x="70" y="14" text-anchor="middle">parameters</text>
<rect class="bx-info" x="10" y="20" width="120" height="40" rx="6"/><text class="t-m" x="70" y="45" text-anchor="middle">$width = 3</text>
<rect class="bx-info" x="10" y="80" width="120" height="40" rx="6"/><text class="t-m" x="70" y="105" text-anchor="middle">$height = 4</text>
<path class="ln" d="M130 40H142"/><polygon class="ah" points="142,34 142,46 150,40"/>
<path class="ln" d="M130 100H142"/><polygon class="ah" points="142,94 142,106 150,100"/>
<rect class="bx-a" x="150" y="20" width="170" height="100" rx="8"/>
<text class="t-b" x="235" y="52" text-anchor="middle">area()</text>
<text class="t-m" x="235" y="88" text-anchor="middle">$width * $height</text>
<path class="ln-ok" d="M320 70H342"/><polygon class="ah-ok" points="342,64 342,76 350,70"/>
<text class="t-s" x="380" y="42" text-anchor="middle">returns</text>
<rect class="bx-ok" x="350" y="50" width="60" height="40" rx="6"/><text class="t-m" x="380" y="75" text-anchor="middle">12</text>
<text class="t-s" x="210" y="155" text-anchor="middle">Values go in through the parameters, one answer comes out</text>
</svg><figcaption>A function is like a machine. The values you pass in, 3 and 4, land in the parameters width and height. The body multiplies them, and return sends the answer, 12, back to the place that called the function.</figcaption></figure>
<p>Step by step, when PHP reaches <code>area(3, 4)</code>:</p>
<ol>
<li>It jumps into the function and puts 3 into <code>$width</code> and 4 into <code>$height</code>, in that order.</li>
<li>It runs the body: 3 times 4 is 12.</li>
<li><code>return</code> sends 12 back and <b>ends the function immediately</b>. Any lines after a <code>return</code> that runs are skipped.</li>
<li>Back where it was called, <code>area(3, 4)</code> is replaced by 12, so <code>echo</code> prints 12.</li>
</ol>
<p>The words <code>int</code> before each parameter and <code>: int</code> after the brackets are <b>type declarations</b>. They say "this must be a whole number going in, and a whole number comes out". The common types are <code>int</code> (whole number), <code>float</code> (number with a decimal point), <code>string</code> (text), <code>bool</code> (true or false) and <code>array</code>. If code passes something that cannot be used as that type, PHP stops with a <code>TypeError</code> instead of carrying on with nonsense.</p>
<p>A function cannot see variables from outside it. Inside <code>sumTo()</code>, the <code>$items</code> array from the top of the file does not exist. Everything a function needs should arrive through its parameters, which keeps it predictable.</p>
<div class="mistake"><b>Common mistake</b>Using <code>echo</code> inside a function when the task wants a <code>return</code>. Echo prints to the screen, but the caller gets nothing back. The grading checks here call your function and look at what it <b>returns</b>, so every path through <code>grade()</code> must end in a <code>return</code>.</div>

<h4>Reading the errors you will hit</h4>
<ul>
<li><b>syntax error, unexpected end of file</b>: a <code>{</code> was never closed with a <code>}</code>. Count your braces, and indent the code inside each block so the pairs line up.</li>
<li><b>Return value must be of type string, none returned</b>: some path through your function reached the end without a <code>return</code>. Check every branch, including the <code>else</code>.</li>
<li><b>Call to undefined function sumto()</b> or similar: the name is misspelt, or the function was never defined.</li>
<li>The page hangs: a loop whose check never becomes false, such as forgetting <code>$i++</code>. This is called an <b>infinite loop</b>.</li>
</ul>
<div class="try"><b>Try it in your head</b>What does <code>grade(70)</code> return, and what does <code>sumTo(3)</code> return? For 70: not at least 90, not at least 80, but at least 70 is true, so <code>'C'</code>. For sumTo(3): 0 + 1 = 1, then 1 + 2 = 3, then 3 + 3 = 6, so 6.</div>

<h4>Recap</h4>
<ul>
<li>Comparisons like <code>&gt;=</code> and <code>===</code> give <code>true</code> or <code>false</code>. A single <code>=</code> stores, it never compares.</li>
<li><code>if</code>, <code>elseif</code> and <code>else</code> are checked top to bottom, and only the first true branch runs, so put the strictest test first.</li>
<li><code>foreach ($items as $item)</code> visits every item; <code>count()</code> says how many there are.</li>
<li><code>for ($i = 1; $i &lt;= $n; $i++)</code> has a start, a check before each round, and a step after each round.</li>
<li>Functions take typed parameters, and <code>return</code> hands back one value and ends the function.</li>
</ul>
`);

explain('h1',`
<h4>Why PHP arrays matter so much</h4>
<p>In the last lesson you met a simple array: a numbered list like <code>['bread', 'milk', 'eggs']</code>. Real data is usually richer than a list. A user has a name, a role and a city. A product has a title, a price and a stock count. You want to look things up by a <b>label</b>, not by a position number.</p>
<p>Many languages give you two separate tools for this: a list for numbered items and a "dictionary" or "map" for labelled ones. PHP uses <b>one</b> tool for both. That makes PHP arrays the most-used data structure in the language. Form data, database rows, settings and JSON from other services all arrive as arrays. This lesson also introduces <b>strict types</b>, a modern PHP setting that catches a whole family of silly bugs.</p>

<h4>Quick recap: strings and interpolation</h4>
<p>Two habits from the first lesson carry straight over. Double-quoted strings fill in variables, single-quoted strings do not:</p>
<pre class="snip">$name = 'Ada';             // single quotes: fixed text
echo "Hello, $name!\\n";    // double quotes: prints Hello, Ada!
echo 'Total: ' . 30;       // the dot joins pieces</pre>
<p>Many PHP developers use single quotes for any string that has nothing to fill in, and double quotes only when they need interpolation or <code>\\n</code>. The starter file follows that style, which is why <code>$name = 'Ada';</code> uses single quotes.</p>

<h4>One array, two shapes</h4>
<p>Under the hood, every PHP array is an <b>ordered map</b>: a list of pairs, each pair being a <b>key</b> (the label) and a <b>value</b> (the thing stored). "Ordered" means PHP remembers the order you added the pairs in.</p>
<ul>
<li>An <b>indexed array</b> (a list) lets PHP choose the keys for you: 0, 1, 2 and so on.</li>
<li>An <b>associative array</b> uses keys you choose, usually strings. You pair each key with its value using the arrow <code>=&gt;</code>, read aloud as "maps to".</li>
</ul>
<pre class="snip">$items = ['bread', 'milk', 'eggs'];                // keys 0, 1, 2
$user = ['name' =&gt; 'Ada', 'role' =&gt; 'admin', 'city' =&gt; 'London'];</pre>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="An indexed array and an associative array, both as key and value pairs">
<text class="t-b" x="90" y="22" text-anchor="middle">Indexed</text>
<text class="t-b" x="315" y="22" text-anchor="middle">Associative</text>
<rect class="bx-info" x="10" y="34" width="50" height="40"/><text class="t-m" x="35" y="59" text-anchor="middle">0</text>
<rect class="bx" x="60" y="34" width="110" height="40"/><text class="t-m" x="115" y="59" text-anchor="middle">'bread'</text>
<rect class="bx-info" x="10" y="74" width="50" height="40"/><text class="t-m" x="35" y="99" text-anchor="middle">1</text>
<rect class="bx" x="60" y="74" width="110" height="40"/><text class="t-m" x="115" y="99" text-anchor="middle">'milk'</text>
<rect class="bx-info" x="10" y="114" width="50" height="40"/><text class="t-m" x="35" y="139" text-anchor="middle">2</text>
<rect class="bx" x="60" y="114" width="110" height="40"/><text class="t-m" x="115" y="139" text-anchor="middle">'eggs'</text>
<rect class="bx-a" x="210" y="34" width="86" height="40"/><text class="t-m" x="253" y="59" text-anchor="middle">'name'</text>
<rect class="bx" x="296" y="34" width="114" height="40"/><text class="t-m" x="353" y="59" text-anchor="middle">'Ada'</text>
<rect class="bx-a" x="210" y="74" width="86" height="40"/><text class="t-m" x="253" y="99" text-anchor="middle">'role'</text>
<rect class="bx" x="296" y="74" width="114" height="40"/><text class="t-m" x="353" y="99" text-anchor="middle">'admin'</text>
<rect class="bx-a" x="210" y="114" width="86" height="40"/><text class="t-m" x="253" y="139" text-anchor="middle">'city'</text>
<rect class="bx" x="296" y="114" width="114" height="40"/><text class="t-m" x="353" y="139" text-anchor="middle">'London'</text>
<text class="t-s" x="90" y="176" text-anchor="middle">keys made for you</text>
<text class="t-s" x="310" y="176" text-anchor="middle">keys you choose</text>
<text class="t-s" x="210" y="200" text-anchor="middle">Both are the same thing: ordered key and value pairs</text>
</svg><figcaption>Left, an indexed array: PHP numbers the keys 0, 1, 2. Right, an associative array: you choose the keys name, role and city. Either way, each row is a key paired with a value.</figcaption></figure>
<p>You read and write single values with square brackets around the key:</p>
<pre class="snip">echo $user['name'];          // Ada
$user['city'] = 'Paris';     // replace a value
$user['email'] = 'a@x.com';  // a new key adds a new pair
$items[] = 'tea';            // empty brackets: add to the end
echo "City: {$user['city']}\\n";   // curly braces inside quotes</pre>
<p>That last line shows a useful trick. To put an array value inside a double-quoted string, wrap it in curly braces so PHP knows exactly where the expression starts and ends.</p>

<h4>foreach with keys and values</h4>
<p>You already know <code>foreach ($items as $item)</code>, which hands you each value. For an associative array you usually want the label too. Add a second name with the arrow: <code>foreach ($array as $key =&gt; $value)</code>.</p>
<pre class="snip">foreach ($user as $key =&gt; $value) {
    // round 1: $key is 'name', $value is 'Ada'
    // round 2: $key is 'role', $value is 'admin'
    // round 3: $key is 'city', $value is 'London'
}</pre>
<p>On each round PHP fills both variables from the next pair, in the order the pairs were added. Inside the loop you can print them in any format you like, for example with interpolation in a double-quoted string, ending in <code>\\n</code> so each pair gets its own line. The names <code>$key</code> and <code>$value</code> are only a convention. <code>$field =&gt; $text</code> works just as well.</p>

<h4>Handy array functions, and the average task</h4>
<p>PHP has a big library of array functions. Three you need now:</p>
<ul>
<li><code>count($numbers)</code>: how many items.</li>
<li><code>array_sum($numbers)</code>: all the values added together.</li>
<li><code>implode(', ', $list)</code>: join the values into one string, with <code>', '</code> between each pair of neighbours. <code>implode(', ', [72, 95])</code> gives <code>72, 95</code>.</li>
</ul>
<p>The mean (average) of some numbers is their sum divided by how many there are. For <code>[80, 90, 85]</code>: the sum is 255, the count is 3, and 255 divided by 3 is 85.</p>
<p>Now the edge case. For an empty array, the count is 0, and dividing by zero is impossible. PHP 8 refuses with a <code>DivisionByZeroError</code>, which stops your program. The task wants 0 for an empty list, so check for that case <b>first</b> and return early:</p>
<pre class="snip">if (count($numbers) === 0) {
    return 0.0;     // nothing to average
}
// only reached when there is at least one number</pre>
<p>This pattern, called a <b>guard clause</b>, handles the awkward case at the top so the main calculation can stay simple. Notice <code>0.0</code>: the function promises a <code>float</code> (a number that can have a decimal point). Returning a whole number from a float function is allowed, because PHP can widen 85 to 85.0 without losing anything, but writing <code>0.0</code> makes your intention obvious. When PHP echoes the float 85.0, it prints just 85.</p>

<h4>Functions you can pass around: arrow functions</h4>
<p>Some array functions need you to supply a small rule. <code>array_filter()</code> is one: it walks through an array and keeps only the items your rule says yes to. You give it the rule as an <b>arrow function</b>, a tiny function with no name, written <code>fn(parameter) =&gt; expression</code>:</p>
<pre class="snip">$double = fn($x) =&gt; $x * 2;
echo $double(5);                         // 10

$passed = array_filter($scores, fn($s) =&gt; $s &gt;= 70);</pre>
<p>An arrow function automatically returns the value of its expression, so there is no <code>return</code> keyword and no braces. <code>array_filter</code> calls it once for every score. If the answer is <code>true</code>, the item is kept; if <code>false</code>, it is dropped.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="array_filter keeps items that pass the rule and keeps their original keys">
<rect class="bx" x="12" y="20" width="86" height="40" rx="6"/><text class="t-m" x="55" y="45" text-anchor="middle">0 =&gt; 72</text>
<rect class="bx" x="112" y="20" width="86" height="40" rx="6"/><text class="t-m" x="155" y="45" text-anchor="middle">1 =&gt; 95</text>
<rect class="bx" x="212" y="20" width="86" height="40" rx="6"/><text class="t-m" x="255" y="45" text-anchor="middle">2 =&gt; 88</text>
<rect class="bx" x="312" y="20" width="86" height="40" rx="6"/><text class="t-m" x="355" y="45" text-anchor="middle">3 =&gt; 61</text>
<path class="ln" d="M55 60v16M155 60v16M255 60v16M355 60v16"/>
<polygon class="ah" points="49,76 61,76 55,84"/><polygon class="ah" points="149,76 161,76 155,84"/><polygon class="ah" points="249,76 261,76 255,84"/><polygon class="ah" points="349,76 361,76 355,84"/>
<rect class="bx-a" x="30" y="84" width="360" height="40" rx="8"/><text class="t-m" x="210" y="109" text-anchor="middle">fn($s) =&gt; $s &gt;= 70</text>
<path class="ln-ok" d="M55 124v18M155 124v18M255 124v18"/>
<polygon class="ah-ok" points="49,142 61,142 55,150"/><polygon class="ah-ok" points="149,142 161,142 155,150"/><polygon class="ah-ok" points="249,142 261,142 255,150"/>
<rect class="bx-ok" x="12" y="150" width="86" height="40" rx="6"/><text class="t-m" x="55" y="175" text-anchor="middle">0 =&gt; 72</text>
<rect class="bx-ok" x="112" y="150" width="86" height="40" rx="6"/><text class="t-m" x="155" y="175" text-anchor="middle">1 =&gt; 95</text>
<rect class="bx-ok" x="212" y="150" width="86" height="40" rx="6"/><text class="t-m" x="255" y="175" text-anchor="middle">2 =&gt; 88</text>
<text class="t-s t-bad" x="355" y="175" text-anchor="middle">61 dropped</text>
<text class="t-s" x="210" y="212" text-anchor="middle">The kept items keep their original keys</text>
</svg><figcaption>Every score goes through the rule "is it at least 70?". 72, 95 and 88 pass and are kept, with their original keys 0, 1 and 2. 61 fails and is dropped.</figcaption></figure>
<p>One detail: <code>array_filter</code> keeps the original keys. Here that does not matter, because the dropped item was last, and <code>implode()</code> ignores keys anyway. If you filter out an item from the middle, the keys will have a gap, and <code>array_values()</code> renumbers them from 0. A close cousin, <code>array_map($fn, $array)</code>, transforms every item instead of filtering.</p>

<h4>Types and <code>declare(strict_types=1)</code></h4>
<p>You have seen typed functions like <code>function add(int $a, int $b): int</code>. By default, PHP is forgiving about those types. If you call <code>add("2", 3)</code>, PHP notices that the text <code>"2"</code> looks like a number and quietly converts it to the integer 2. This is called <b>coercive mode</b>.</p>
<p>That sounds helpful, but it hides bugs. Text from a form, a file or a URL is always a string. If it slips through unconverted, you want to know at once, not three steps later when something odd happens. So modern PHP files start with this line:</p>
<pre class="snip">&lt;?php
declare(strict_types=1);   // must be the very first statement</pre>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Calling add with the string 2: converted in default mode, refused in strict mode">
<rect class="bx-info" x="10" y="70" width="130" height="40" rx="6"/><text class="t-m" x="75" y="95" text-anchor="middle">add("2", 3)</text>
<path class="ln" d="M140 90H148V40H160M148 90V140H160"/>
<polygon class="ah" points="158,34 158,46 166,40"/><polygon class="ah" points="158,134 158,146 166,140"/>
<text class="t-s" x="233" y="14" text-anchor="middle">default mode</text>
<rect class="bx-warn" x="166" y="20" width="134" height="40" rx="6"/><text class="t" x="233" y="45" text-anchor="middle">"2" becomes 2</text>
<path class="ln" d="M300 40H306"/><polygon class="ah" points="306,34 306,46 314,40"/>
<rect class="bx" x="314" y="20" width="98" height="40" rx="6"/><text class="t-m" x="363" y="45" text-anchor="middle">5</text>
<text class="t-s" x="233" y="114" text-anchor="middle">strict_types=1</text>
<rect class="bx-ok" x="166" y="120" width="134" height="40" rx="6"/><text class="t" x="233" y="145" text-anchor="middle">refused</text>
<path class="ln" d="M300 140H306"/><polygon class="ah" points="306,134 306,146 314,140"/>
<rect class="bx-bad" x="314" y="120" width="98" height="40" rx="6"/><text class="t-b" x="363" y="145" text-anchor="middle">TypeError</text>
<text class="t-s" x="210" y="190" text-anchor="middle">Strict mode catches the mix-up at the call</text>
</svg><figcaption>The same call, two outcomes. In default mode PHP silently converts the text "2" into the number 2 and returns 5. With strict types on, PHP refuses the string and throws a TypeError, pointing straight at the bad call.</figcaption></figure>
<p>A few facts worth knowing about strict types:</p>
<ul>
<li>It must be the first statement in the file, right after <code>&lt;?php</code>. Anywhere else is an error.</li>
<li>It applies to the calls made <b>from that file</b>, for parameters and return values.</li>
<li>The one conversion it still allows is an <code>int</code> into a <code>float</code>, because that never loses information. That is why returning 85 from <code>average()</code> is fine.</li>
</ul>
<p>The fourth task checks this directly: once <code>add()</code> really adds, <code>add(2, 3)</code> must give 5, and <code>add("2", 3)</code> must throw a <code>TypeError</code>. The starter file already has strict types turned on, so making <code>add()</code> work correctly is all it takes.</p>
<div class="mistake"><b>Common mistake</b>Dividing before checking for an empty array. <code>array_sum([]) / count([])</code> is 0 divided by 0, which throws <code>DivisionByZeroError</code>. Put the guard clause first, before any division.</div>
<div class="mistake"><b>Common mistake</b>Writing <code>$user[name]</code> without quotes around the key. PHP 8 treats the bare word as an undefined constant and stops with an error. String keys always need quotes: <code>$user['name']</code>.</div>

<h4>Reading the errors you will hit</h4>
<ul>
<li><b>TypeError: add(): Argument #1 ($a) must be of type int, string given</b>: a value of the wrong type reached a typed parameter. The message names the function, the parameter and what it got instead.</li>
<li><b>Warning: Undefined array key "nmae"</b>: you asked for a key that is not in the array. Check the spelling against where the array was built.</li>
<li><b>DivisionByZeroError: Division by zero</b>: something was divided by 0. Add a guard.</li>
</ul>
<div class="try"><b>Try it in your head</b>What does <code>implode(' / ', array_filter([5, 12, 8, 20], fn($n) =&gt; $n &gt; 7))</code> produce? 5 fails, 12 passes, 8 passes, 20 passes, so the result is <code>12 / 8 / 20</code>.</div>

<h4>Recap</h4>
<ul>
<li>Every PHP array is an ordered map of keys to values: indexed arrays number the keys, associative arrays use your own with <code>=&gt;</code>.</li>
<li><code>foreach ($array as $key =&gt; $value)</code> walks the pairs in order.</li>
<li><code>count()</code>, <code>array_sum()</code> and <code>implode()</code> cover a lot of daily work; guard against empty arrays before dividing.</li>
<li><code>fn($x) =&gt; ...</code> is a short function that returns its expression, perfect for <code>array_filter()</code> and <code>array_map()</code>.</li>
<li><code>declare(strict_types=1)</code> turns silent type conversions into a <code>TypeError</code>, so mistakes show up where they happen.</li>
</ul>
`);

explain('h2',`
<h4>Why classes exist</h4>
<p>So far your data and your functions have lived apart. A product might be an array like <code>['name' =&gt; 'Mug', 'price' =&gt; 10.0]</code>, and somewhere else there is a function that calculates its tax. That works for a page of code. In a big app it falls apart: anyone can put a wrong value into the array, nothing tells you which functions belong to products, and a typo in a key fails silently.</p>
<p><b>Object-oriented programming</b>, usually shortened to OOP, fixes this by bundling the data and the functions that work on it into one unit. Laravel, Symfony and almost every modern PHP library are built this way, so reading their code means reading classes.</p>

<h4>Classes and objects</h4>
<p>A <b>class</b> is a blueprint. It describes what every product has (a name, a price) and what every product can do (work out its price with tax). An <b>object</b> is one real thing built from that blueprint: this particular mug, that particular ebook. You can build as many objects from one class as you like, and each keeps its own values.</p>
<ul>
<li>The values an object holds are called <b>properties</b>. They are variables that belong to the object.</li>
<li>The functions written inside a class are called <b>methods</b>. They are functions that belong to the object.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="One Product class used to build two separate objects">
<rect class="bx-a" x="10" y="40" width="150" height="120" rx="8"/>
<text class="t-b" x="85" y="66" text-anchor="middle">class Product</text>
<text class="t-s" x="85" y="96" text-anchor="middle">name</text>
<text class="t-s" x="85" y="116" text-anchor="middle">basePrice</text>
<text class="t-s" x="85" y="136" text-anchor="middle">price()</text>
<path class="ln" d="M160 80H180V50H232"/><polygon class="ah" points="232,44 232,56 240,50"/>
<path class="ln" d="M160 120H180V150H232"/><polygon class="ah" points="232,144 232,156 240,150"/>
<text class="t-s" x="206" y="42" text-anchor="middle">new</text>
<text class="t-s" x="206" y="142" text-anchor="middle">new</text>
<rect class="bx-ok" x="240" y="10" width="170" height="80" rx="8"/>
<text class="t-m" x="325" y="34" text-anchor="middle">$mug</text>
<text class="t-s" x="325" y="56" text-anchor="middle">name: Coffee Mug</text>
<text class="t-s" x="325" y="76" text-anchor="middle">basePrice: 10.0</text>
<rect class="bx-ok" x="240" y="110" width="170" height="80" rx="8"/>
<text class="t-m" x="325" y="134" text-anchor="middle">$ebook</text>
<text class="t-s" x="325" y="156" text-anchor="middle">name: PHP Ebook</text>
<text class="t-s" x="325" y="176" text-anchor="middle">basePrice: 15.0</text>
</svg><figcaption>One class, many objects. The Product class lists what every product has and can do. Each use of new builds a separate object with its own values: a coffee mug costing 10 and an ebook costing 15.</figcaption></figure>
<p>You build an object with <code>new</code>, and reach into it with the arrow <code>-&gt;</code>:</p>
<pre class="snip">$mug = new Product('Coffee Mug', 10.0);
echo $mug-&gt;name;              // a property: Coffee Mug
echo $mug-&gt;priceWithTax();    // a method call: 12</pre>
<p>Inside a method, the object that the method was called on is available as <code>$this</code>. When you run <code>$mug-&gt;price()</code>, <code>$this</code> means <code>$mug</code>, so <code>$this-&gt;basePrice</code> reads the mug's own price.</p>

<h4>The constructor and property promotion</h4>
<p>When you write <code>new Product('Coffee Mug', 10.0)</code>, PHP runs a special method called the <b>constructor</b>, always named <code>__construct</code> (two underscores). Its job is to set up the new object. In older PHP it took three steps per property: declare it, accept a parameter, copy one into the other.</p>
<pre class="snip">class Product {
    public string $name;                     // 1. declare
    public function __construct(string $name) {   // 2. accept
        $this-&gt;name = $name;                 // 3. copy
    }
}</pre>
<p>PHP 8 added <b>constructor property promotion</b>, which does all three in one go. Put a visibility word such as <code>public</code> or <code>private</code> in front of a constructor parameter, and PHP declares the property and fills it for you:</p>
<pre class="snip">class Product {
    public function __construct(
        public string $name,
        private float $basePrice,
    ) {}     // empty body: nothing else to do
}</pre>
<p>The trailing comma after the last parameter is allowed, and it makes adding another parameter later a one-line change.</p>

<h4>Visibility: who may touch what</h4>
<p>The words <code>public</code>, <code>protected</code> and <code>private</code> control where a property or method can be used from. This is how a class protects its data from being changed in ways it did not expect, an idea called <b>encapsulation</b>.</p>
<div class="tbl-wrap"><table><tr><th>Keyword</th><th>Who can use it</th></tr>
<tr><td><code>public</code></td><td>Anyone: code outside the class, the class itself and its subclasses.</td></tr>
<tr><td><code>protected</code></td><td>The class itself and classes that extend it, but not outside code.</td></tr>
<tr><td><code>private</code></td><td>Only code inside this exact class.</td></tr></table></div>
<p>In this lesson the base price is <code>private</code>. Outside code that tries <code>$mug-&gt;basePrice</code> gets <b>Error: Cannot access private property Product::$basePrice</b>. Instead, the class offers a public method, <code>price()</code>, to read it. That way, if pricing rules change later (discounts, currencies), only the class changes, and every caller keeps working. The first task checks both halves: tax works, and the private property really is private.</p>

<h4>Methods, default parameters and rounding</h4>
<p>A method that adds 20% tax could look like this:</p>
<pre class="snip">public function priceWithTax(float $rate = 0.2): float {
    return round($this-&gt;price() * (1 + $rate), 2);
}</pre>
<p>Step by step for the mug: <code>$this-&gt;price()</code> is 10.0. <code>1 + $rate</code> is 1.2. 10.0 times 1.2 is 12.0. <code>round(..., 2)</code> rounds to 2 decimal places, and 12.0 is returned.</p>
<p>Two new ideas are hiding in there. <code>$rate = 0.2</code> is a <b>default value</b>: if the caller leaves the argument out, 0.2 is used. And <code>round()</code> is there because computers store decimal numbers in binary, which cannot represent most decimals exactly. For example, 0.1 + 0.2 comes out as 0.30000000000000004. Rounding money to 2 places hides those tiny errors. (Serious shops store prices as whole pennies for this reason.)</p>

<h4>Interfaces, traits and inheritance</h4>
<p>Three tools let classes share and promise behaviour. They fit together like this:</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="Product implements HasPrice, uses HasSlug, and DigitalProduct extends Product">
<rect class="bx-info" x="20" y="10" width="170" height="50" rx="8"/>
<text class="t-s" x="105" y="28" text-anchor="middle">interface</text><text class="t-b" x="105" y="50" text-anchor="middle">HasPrice</text>
<rect class="bx-warn" x="230" y="10" width="170" height="50" rx="8"/>
<text class="t-s" x="315" y="28" text-anchor="middle">trait</text><text class="t-b" x="315" y="50" text-anchor="middle">HasSlug</text>
<rect class="bx-a" x="110" y="100" width="200" height="50" rx="8"/>
<text class="t-s" x="210" y="118" text-anchor="middle">class</text><text class="t-b" x="210" y="140" text-anchor="middle">Product</text>
<path class="ln" d="M150 100V80H105V68"/><polygon class="ah" points="99,68 111,68 105,60"/>
<text class="t-s" x="98" y="90" text-anchor="end">implements</text>
<path class="ln" d="M270 100V80H315V68"/><polygon class="ah" points="309,68 321,68 315,60"/>
<text class="t-s" x="322" y="90">uses</text>
<rect class="bx" x="110" y="190" width="200" height="50" rx="8"/>
<text class="t-s" x="210" y="208" text-anchor="middle">class</text><text class="t-b" x="210" y="230" text-anchor="middle">DigitalProduct</text>
<path class="ln" d="M210 190V158"/><polygon class="ah" points="204,158 216,158 210,150"/>
<text class="t-s" x="220" y="178">extends</text>
</svg><figcaption>Product implements the HasPrice interface, which is a promise to have a price method. It uses the HasSlug trait, which copies in a ready-made slug method. DigitalProduct extends Product, so it inherits everything Product has and can change parts of it.</figcaption></figure>
<p><b>An interface is a promise.</b> It lists method names and types, with no code inside them. A class that says <code>implements HasPrice</code> promises to provide every method on the list, and PHP refuses to load the class if one is missing.</p>
<pre class="snip">interface HasPrice {
    public function price(): float;   // no body: just the promise
}
class Product implements HasPrice { ... }</pre>
<p>Why bother? Because other code can now accept "anything with a price" without caring what it is. A basket can total products, gift cards and delivery charges alike, as long as each implements <code>HasPrice</code>. You can test the promise with <code>instanceof</code>: <code>$mug instanceof HasPrice</code> is <code>true</code>.</p>
<p><b>A trait is a reusable chunk of methods.</b> Writing <code>use HasSlug;</code> inside a class is like pasting the trait's methods into it. A <b>slug</b> is the URL-friendly version of a name, so "Coffee Mug" becomes <code>coffee-mug</code>: lower case, with spaces swapped for hyphens. Two built-in functions do it: <code>str_replace(' ', '-', $text)</code> swaps every space for a hyphen, and <code>strtolower()</code> lowers the case. Inside the trait, <code>$this-&gt;name</code> refers to the name of whatever class is using it.</p>
<p><b>Inheritance with <code>extends</code></b> creates a subclass: a more specific version of an existing class. <code>class DigitalProduct extends Product</code> gets every method and property of Product for free. To change one behaviour, write a method with the same name in the subclass. This is called <b>overriding</b>, and PHP will use the subclass's version for DigitalProduct objects. Digital goods here are tax-free, so the override simply returns the plain price. Its signature (parameters and return type) must stay compatible with the parent's, and inside an override you can still call the original with <code>parent::priceWithTax()</code>.</p>
<p>Note that a subclass cannot reach the parent's <code>private</code> properties directly, which is one more reason the parent offers <code>price()</code>.</p>

<h4>Enums: a fixed set of choices</h4>
<p>A product's status is either draft or published. You could store the strings <code>'draft'</code> and <code>'published'</code>, but nothing would stop a typo like <code>'pubished'</code>. An <b>enum</b> (short for enumeration) defines the complete list of allowed values, and PHP rejects anything else.</p>
<pre class="snip">enum Status: string {
    case Draft = 'draft';
    case Published = 'published';
}
$s = Status::Draft;
echo $s-&gt;value;                    // draft
var_dump(Status::from('published') === Status::Published);  // bool(true)</pre>
<p>The <code>: string</code> makes it a <b>backed enum</b>: each case carries a string, read with <code>-&gt;value</code>. That is handy for saving to a database. Going the other way, <code>Status::from('published')</code> turns a stored string back into the case, and throws an error for an unknown string; <code>Status::tryFrom()</code> returns <code>null</code> instead. To make new products start as drafts, give the constructor parameter a default: <code>public Status $status = Status::Draft</code>.</p>
<div class="tip"><b>Tip</b>Declare interfaces, traits and enums above the classes that use them. PHP can usually cope with the order in one file, but putting dependencies first avoids "not found" errors and reads more naturally.</div>
<div class="mistake"><b>Common mistake</b>Forgetting <code>$this-&gt;</code> inside a method. Writing <code>return $basePrice;</code> looks for a local variable that does not exist and gives an "Undefined variable" warning. Properties are always reached through <code>$this-&gt;basePrice</code>.</div>

<h4>Reading the errors you will hit</h4>
<ul>
<li><b>Cannot access private property</b>: outside code touched something private. Use a public method instead.</li>
<li><b>Class Product contains 1 abstract method and must therefore be declared abstract or implement the remaining methods</b>: you said <code>implements</code> but did not write every method the interface lists.</li>
<li><b>Too few arguments to function Product::__construct()</b>: <code>new Product()</code> was called without the values the constructor needs.</li>
<li><b>"pubished" is not a valid backing value for enum Status</b>: <code>from()</code> was given a string that matches no case.</li>
</ul>
<div class="try"><b>Try it in your head</b>With the classes above, what do <code>(new Product('Tea Pot', 20.0))-&gt;priceWithTax()</code> and <code>(new DigitalProduct('Tea Pot', 20.0))-&gt;slug()</code> return? The first is 20.0 times 1.2, so 24. The second uses the trait the subclass inherited, giving <code>tea-pot</code>.</div>

<h4>Recap</h4>
<ul>
<li>A class is a blueprint; <code>new</code> builds objects; <code>-&gt;</code> reaches properties and methods; <code>$this</code> is the current object.</li>
<li>Constructor promotion (<code>public string $name</code> in the constructor) declares and fills properties in one step.</li>
<li><code>private</code> hides data inside the class; <code>protected</code> also allows subclasses; <code>public</code> allows everyone.</li>
<li>An interface is a promise, a trait is shared code, and <code>extends</code> builds a subclass that can override methods.</li>
<li>Backed enums list every allowed value; use <code>-&gt;value</code>, <code>from()</code> and <code>tryFrom()</code>.</li>
</ul>
`);

explain('h3',`
<h4>Why PHP needs a package manager</h4>
<p>As soon as a project grows past one file, two problems appear.</p>
<ol>
<li><b>Loading your own files.</b> Each class lives in its own file. Before PHP can use a class, the file that defines it must be loaded, traditionally with a line like <code>require 'src/Models/Product.php';</code>. With fifty classes you need fifty of those lines, in the right order, and one wrong path breaks everything.</li>
<li><b>Using other people's code.</b> Nobody writes their own logging, email sending or date handling from scratch. Thousands of free, tested libraries exist. But downloading them by hand, keeping track of versions, and making sure your teammate has exactly the same versions is a nightmare.</li>
</ol>
<p><b>Composer</b> solves both. It is PHP's <b>package manager</b>: a command-line tool that downloads libraries (called <b>packages</b> or <b>dependencies</b>) and generates an <b>autoloader</b>, a small piece of code that loads each class file automatically the first time you use it. Packages come from <b>Packagist</b>, the public directory at packagist.org. Every Laravel and Symfony project starts with Composer.</p>

<h4>Namespaces: surnames for classes</h4>
<p>Before autoloading makes sense, you need <b>namespaces</b>. Two libraries might both have a class called <code>Logger</code>. A namespace is like a surname that keeps them apart: <code>Monolog\\Logger</code> and <code>App\\Logger</code> are different classes. The parts are separated by backslashes.</p>
<p>Look at the two files this lesson gives you in <code>~/shop</code>:</p>
<pre class="snip">// src/Models/Product.php
namespace App\\Models;       // everything below lives in App\\Models
class Product { ... }       // full name: App\\Models\\Product

// index.php
use App\\Models\\Product;    // "when I say Product, I mean this one"
$p = new Product('Keyboard', 49.5);</pre>
<p>The <code>namespace</code> line gives every class in that file its surname. The <code>use</code> line in another file is a shortcut: it lets you write the short name <code>Product</code> instead of the full <code>App\\Models\\Product</code> every time. <code>use</code> does <b>not</b> load anything. It only tells PHP what a name means.</p>

<h4>The first error: no autoloader yet</h4>
<p>The top of <code>index.php</code> says:</p>
<pre class="snip">require __DIR__ . '/vendor/autoload.php';</pre>
<p><code>require</code> means "load and run this other PHP file, and stop with a fatal error if it is missing". <code>__DIR__</code> is a built-in constant holding the folder the current file sits in, so the path works no matter where you run the script from. The file <code>vendor/autoload.php</code> is the one Composer generates. In this lesson it does not exist yet, so running <code>php index.php</code> fails with an error about failing to open <code>vendor/autoload.php</code>. On real PHP you would see "Failed to open stream: No such file or directory" followed by "Failed opening required". The fix is never to create that file by hand: you let Composer build it.</p>

<h4>composer.json and the PSR-4 rule</h4>
<p>Every Composer project has a file called <code>composer.json</code> in its root folder. It is written in JSON, a simple text format of keys and values in curly braces. It records two things: which packages the project needs, and how to find your own classes.</p>
<pre class="snip">{
    "name": "you/shop",
    "require": {},
    "autoload": {
        "psr-4": { "App\\\\": "src/" }
    }
}</pre>
<p>The <code>autoload</code> section uses a standard called <b>PSR-4</b>, agreed by the PHP community so every project finds classes the same way. The rule <code>"App\\\\": "src/"</code> says: "classes whose name starts with <code>App\\</code> live in the <code>src/</code> folder". The backslash is written twice because in JSON a single backslash starts a special code, so <code>\\\\</code> stands for one real backslash.</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="PSR-4 turns the class name App Models Product into the path src/Models/Product.php">
<text class="t-s" x="190" y="16" text-anchor="middle">class name</text>
<rect class="bx-a" x="40" y="24" width="80" height="40" rx="6"/><text class="t-m" x="80" y="50" text-anchor="middle">App\\</text>
<rect class="bx-info" x="120" y="24" width="110" height="40" rx="6"/><text class="t-m" x="175" y="50" text-anchor="middle">Models\\</text>
<rect class="bx-ok" x="230" y="24" width="110" height="40" rx="6"/><text class="t-m" x="285" y="50" text-anchor="middle">Product</text>
<path class="ln-a" d="M80 64L62 112"/><polygon class="ah-a" points="56,110 68,112 60,120"/>
<path class="ln" d="M175 64L157 112"/><polygon class="ah" points="151,110 163,112 155,120"/>
<path class="ln-ok" d="M285 64V112"/><polygon class="ah-ok" points="279,112 291,112 285,120"/>
<text class="t-s" x="296" y="96">add .php</text>
<rect class="bx-a" x="20" y="120" width="80" height="40" rx="6"/><text class="t-m" x="60" y="146" text-anchor="middle">src/</text>
<rect class="bx-info" x="100" y="120" width="110" height="40" rx="6"/><text class="t-m" x="155" y="146" text-anchor="middle">Models/</text>
<rect class="bx-ok" x="210" y="120" width="150" height="40" rx="6"/><text class="t-m" x="285" y="146" text-anchor="middle">Product.php</text>
<text class="t-s" x="210" y="184" text-anchor="middle">The prefix App\\ is swapped for src/</text>
<text class="t-s" x="210" y="202" text-anchor="middle">The rest of the name becomes folders and a file</text>
</svg><figcaption>How PSR-4 finds a file. The prefix App backslash is replaced by the folder src. Each remaining part of the name becomes a folder, and the last part, the class name, becomes the file name with .php added.</figcaption></figure>
<p>Work through it for <code>App\\Models\\Product</code>:</p>
<ol>
<li>Does the name start with a known prefix? Yes, <code>App\\</code>, which maps to <code>src/</code>.</li>
<li>Remove the prefix. What remains is <code>Models\\Product</code>.</li>
<li>Turn the backslashes into forward slashes: <code>Models/Product</code>.</li>
<li>Add <code>.php</code> and put the folder in front: <code>src/Models/Product.php</code>.</li>
</ol>
<p>So the rule only works if your files follow it: one class per file, the file named exactly like the class, and folders matching the namespace. On Linux servers file names are case-sensitive, so <code>product.php</code> will not be found for the class <code>Product</code>.</p>
<p>To create <code>composer.json</code>, run <code>composer init</code>. On a real machine it asks a series of questions (package name, description, dependencies, and whether to add a PSR-4 mapping). The <code>--name you/shop</code> option answers the name question up front. This sandbox skips the questions and adds the <code>App\\</code> to <code>src/</code> rule for you. On a real machine Composer suggests a namespace based on the package name, such as <code>You\\Shop\\</code>, so you would type <code>App</code> instead, or edit the file afterwards.</p>

<h4>Generating the autoloader</h4>
<p><code>composer dump-autoload</code> reads the <code>autoload</code> section and writes the <code>vendor/</code> folder with <code>vendor/autoload.php</code> inside it. Once that file exists, here is what happens when <code>index.php</code> runs:</p>
<ol>
<li><code>require</code> loads <code>vendor/autoload.php</code>, which registers Composer's autoloader with PHP.</li>
<li>PHP reaches <code>new Product(...)</code>. Thanks to <code>use</code>, it knows this means <code>App\\Models\\Product</code>, but that class is not loaded yet.</li>
<li>Instead of failing, PHP asks the autoloader. The autoloader applies the PSR-4 rule, finds <code>src/Models/Product.php</code>, and loads it.</li>
<li>The class now exists, the object is built, and the script prints <code>Keyboard ($49.50)</code>.</li>
</ol>
<p>Files are only loaded when a class is first used, so big projects stay fast. You need to run <code>dump-autoload</code> again whenever you change the <code>autoload</code> section of <code>composer.json</code>. Adding a new class file inside an existing mapped folder does not need it: the PSR-4 rule simply finds the new file.</p>

<h4>Installing a package: <code>composer require</code></h4>
<p>Now for other people's code. <b>Monolog</b> is the most popular PHP logging library, and Laravel uses it internally. Packages are named <code>vendor/package</code>, where "vendor" means the publisher, so Monolog is <code>monolog/monolog</code>. One command does all the work:</p>
<pre class="snip">composer require monolog/monolog</pre>
<p>Behind the scenes Composer:</p>
<ol>
<li>adds <code>"monolog/monolog": "^3.7"</code> (or whatever is current) to the <code>require</code> section of <code>composer.json</code>;</li>
<li>works out exact versions of Monolog and anything Monolog itself needs;</li>
<li>writes those exact versions into <code>composer.lock</code>;</li>
<li>downloads the code into <code>vendor/</code> and regenerates the autoloader, so Monolog's classes load automatically too.</li>
</ol>
<p>The caret in <code>^3.7</code> is a <b>version constraint</b>: "3.7 or any newer 3.x version, but not 4.0". Major version numbers change when a library makes breaking changes, so the caret accepts safe updates and refuses risky ones.</p>
<figure class="fig"><svg viewBox="0 0 420 236" role="img" aria-label="composer.json and composer.lock are committed, vendor is ignored">
<rect class="bx-ok" x="20" y="10" width="190" height="50" rx="8"/><text class="t-m" x="115" y="32" text-anchor="middle">composer.json</text><text class="t-s" x="115" y="52" text-anchor="middle">ranges you asked for</text>
<path class="ln" d="M115 60V82"/><polygon class="ah" points="109,82 121,82 115,90"/><text class="t-s" x="126" y="80">resolve</text>
<rect class="bx-ok" x="20" y="90" width="190" height="50" rx="8"/><text class="t-m" x="115" y="112" text-anchor="middle">composer.lock</text><text class="t-s" x="115" y="132" text-anchor="middle">exact versions</text>
<path class="ln" d="M115 140V162"/><polygon class="ah" points="109,162 121,162 115,170"/><text class="t-s" x="126" y="160">download</text>
<rect class="bx-warn" x="20" y="170" width="190" height="50" rx="8"/><text class="t-m" x="115" y="192" text-anchor="middle">vendor/</text><text class="t-s" x="115" y="212" text-anchor="middle">the library code</text>
<path class="ln-d" d="M210 35H280M210 115H280M210 195H280"/>
<text class="t-b t-ok" x="290" y="40">commit</text>
<text class="t-b t-ok" x="290" y="120">commit</text>
<text class="t-b t-bad" x="290" y="200">ignore</text>
<text class="t-s" x="290" y="220">in .gitignore</text>
</svg><figcaption>composer.json holds the version ranges you asked for. Composer resolves them into exact versions in composer.lock, then downloads the code into vendor. The first two files go into Git; vendor is listed in .gitignore because anyone can rebuild it.</figcaption></figure>
<p>Using the library then looks like any other class: add <code>use Monolog\\Logger;</code> and <code>use Monolog\\Handler\\StreamHandler;</code> at the top, create a logger with a channel name such as <code>'app'</code>, attach a handler that says where messages go (<code>'php://stdout'</code> means "straight to the terminal"), and call a method named after the severity level, such as <code>info()</code>. Monolog prints each message with a timestamp, the channel and level (<code>app.INFO</code>), your message, and any extra details you passed as an array.</p>

<h4>What goes into Git: lock file yes, vendor no</h4>
<ul>
<li><b>Commit <code>composer.json</code></b>: it says what the project needs.</li>
<li><b>Commit <code>composer.lock</code></b>: it pins the exact versions. When a teammate or server runs <code>composer install</code>, Composer reads the lock file and installs precisely those versions, so everyone runs identical code.</li>
<li><b>Ignore <code>vendor/</code></b>: it is large, it is generated, and <code>composer install</code> recreates it anywhere.</li>
</ul>
<p>Know the difference between the commands: <code>composer install</code> follows the lock file exactly; <code>composer update</code> looks for newer versions within your ranges and rewrites the lock file; <code>composer require</code> adds a new package.</p>
<div class="mistake"><b>Common mistake</b>Changing the namespace or moving a file without matching the PSR-4 rule, then getting <b>Class "App\\Models\\Product" not found</b>. Check three things: the <code>namespace</code> line in the file, the folder path, and the exact file name with its capital letters.</div>
<div class="mistake"><b>Common mistake</b>Editing files inside <code>vendor/</code> to fix a library. The next <code>composer install</code> wipes your change. Fix it in your own code, or contribute the fix to the library.</div>

<h4>Reading the errors you will hit</h4>
<ul>
<li><b>Failed opening required 'vendor/autoload.php'</b>: the autoloader has not been generated. Run <code>composer install</code> or <code>composer dump-autoload</code>.</li>
<li><b>Composer could not find a composer.json file</b>: you are in the wrong folder, or have not run <code>composer init</code>.</li>
<li><b>Could not find a matching version of package</b>: the package name is misspelt or does not exist on Packagist.</li>
</ul>
<div class="try"><b>Try it in your head</b>With the rule <code>"App\\\\": "src/"</code>, where must the class <code>App\\Services\\Mailer</code> live? Strip <code>App\\</code>, turn <code>Services\\Mailer</code> into <code>Services/Mailer</code>, add <code>.php</code> and the folder: <code>src/Services/Mailer.php</code>.</div>

<h4>Recap</h4>
<ul>
<li>Composer downloads packages from Packagist into <code>vendor/</code> and generates <code>vendor/autoload.php</code>.</li>
<li>Namespaces are surnames for classes; <code>use</code> creates a short name and loads nothing.</li>
<li>PSR-4 maps a namespace prefix to a folder, so <code>App\\Models\\Product</code> lives in <code>src/Models/Product.php</code>.</li>
<li><code>composer dump-autoload</code> rebuilds the autoloader; <code>composer require vendor/package</code> adds a library.</li>
<li>Commit <code>composer.json</code> and <code>composer.lock</code>; ignore <code>vendor/</code> and rebuild it with <code>composer install</code>.</li>
</ul>
`);

explain('h4',`
<h4>Why PHP needs a database</h4>
<p>Everything a PHP script holds in variables disappears when the request ends. The next visitor starts with a blank slate. To remember users, orders and posts between requests, you need somewhere permanent to keep them. That is a <b>database</b>: a program that stores data on disk and answers questions about it quickly and safely, even when many people use it at once.</p>
<p>Most PHP apps use a <b>relational database</b> such as MySQL, MariaDB, PostgreSQL or SQLite. Data lives in <b>tables</b>, which are like spreadsheets: each <b>row</b> is one record (one user), and each <b>column</b> is one field (name, email, role). You talk to the database in <b>SQL</b>, a language of short commands:</p>
<pre class="snip">SELECT id, name FROM users;                        -- read rows
SELECT * FROM users WHERE email = 'ada@example.com';  -- only matching rows
INSERT INTO users (name, email) VALUES ('Linus', 'l@x.com');  -- add a row</pre>
<p>(In SQL, two dashes start a comment, like <code>//</code> in PHP.) This lesson's database already holds a <code>users</code> table with three people in it. Its <code>email</code> column is marked <b>UNIQUE</b>, which means the database refuses a second row with the same email.</p>

<h4>PDO: one way to talk to many databases</h4>
<p><b>PDO</b> stands for PHP Data Objects. It is the database layer built into PHP, and it works the same way whichever database sits behind it. Laravel's database code is built on top of it. You start by creating a connection object:</p>
<pre class="snip">$pdo = new PDO('mysql:host=localhost;dbname=shop', 'shop_user', 'secret');
$pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo-&gt;setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);</pre>
<p>Line by line:</p>
<ul>
<li>The first argument is the <b>DSN</b> (data source name): which kind of database (<code>mysql</code>), which computer it runs on (<code>localhost</code> means this same machine) and which database to use (<code>shop</code>). Then come a username and a password. In a real app these come from a settings file or environment variables, never typed into code you commit.</li>
<li><code>ERRMODE_EXCEPTION</code> tells PDO to <b>throw an exception</b> when something goes wrong. An exception is PHP's way of stopping normal flow and shouting "this failed", which you can catch and handle. It has been the default since PHP 8.0, but setting it explicitly is a common habit that makes the intent clear.</li>
<li><code>FETCH_ASSOC</code> makes every row come back as an associative array, like <code>['id' =&gt; 1, 'name' =&gt; 'Ada Lovelace', ...]</code>, keyed by column name. You learned to work with those in the arrays lesson.</li>
</ul>
<p>The <code>::</code> in <code>PDO::ATTR_ERRMODE</code> reads a <b>constant</b>, a fixed named value that belongs to the class itself rather than to one object.</p>
<div class="tip"><b>Tip</b>The DSN here says <code>mysql</code>, but the lesson's sandbox quietly runs SQLite in your browser. Your PDO code is exactly the same either way, which is the whole point of PDO.</div>

<h4>Reading rows</h4>
<p>For a fixed query with no outside input, <code>query()</code> runs the SQL straight away and returns a <b>statement</b> object holding the results. <code>fetchAll()</code> then gives you every row as an array of arrays:</p>
<pre class="snip">$users = $pdo-&gt;query('SELECT id, name, email FROM users ORDER BY id')-&gt;fetchAll();
// $users[0] is ['id' =&gt; 1, 'name' =&gt; 'Ada Lovelace', 'email' =&gt; ...]</pre>
<p>Notice the two arrows in a row: <code>query()</code> returns a statement, and <code>-&gt;fetchAll()</code> is called on that result straight away. Because <code>$users</code> is an ordinary PHP array, <code>count($users)</code> tells you how many rows came back. That is the first task.</p>

<h4>The danger: building SQL out of user input</h4>
<p>Now suppose you want one user by email, and the email comes from a login form. The obvious approach is to glue the input into the SQL text:</p>
<pre class="snip">// NEVER do this
$pdo-&gt;query("SELECT * FROM users WHERE email = '$email'");</pre>
<p>This works for honest input. But the database receives one long string and cannot tell which parts you wrote and which parts the visitor typed. So a visitor can type SQL. Watch what happens when someone enters <code>' OR '1'='1</code> as their email:</p>
<figure class="fig"><svg viewBox="0 0 420 280" role="img" aria-label="String building lets input become SQL; a prepared statement keeps it as data">
<text class="t-b t-bad" x="10" y="20">Gluing text together</text>
<rect class="bx-bad" x="10" y="30" width="400" height="44" rx="6"/>
<text class="t-m" x="210" y="57" text-anchor="middle">WHERE email = '' OR '1'='1'</text>
<text class="t-s t-bad" x="210" y="94" text-anchor="middle">The input became SQL: every row matches</text>
<text class="t-b t-ok" x="10" y="130">Prepared statement</text>
<rect class="bx-ok" x="10" y="140" width="220" height="40" rx="6"/><text class="t-m" x="120" y="165" text-anchor="middle">email = :email</text>
<rect class="bx-info" x="250" y="140" width="160" height="40" rx="6"/><text class="t-m" x="330" y="165" text-anchor="middle">' OR '1'='1</text>
<path class="ln-ok" d="M120 180L186 208"/><polygon class="ah-ok" points="182,202 188,213 192,204"/>
<path class="ln" d="M330 180L244 208"/><polygon class="ah" points="238,204 242,213 248,202"/>
<text class="t-s" x="64" y="204" text-anchor="middle">SQL first</text>
<text class="t-s" x="368" y="204" text-anchor="middle">value later</text>
<rect class="bx" x="140" y="214" width="140" height="36" rx="6"/><text class="t-b" x="210" y="237" text-anchor="middle">Database</text>
<text class="t-s t-ok" x="210" y="272" text-anchor="middle">The input is only data: no email matches it</text>
</svg><figcaption>Top: when the input is glued into the SQL, its quote marks end the email text early and the words OR one equals one become part of the query, so every user matches. Bottom: a prepared statement sends the SQL first and the value separately, so the database only ever compares emails with that odd text.</figcaption></figure>
<p>Step by step, the glued query becomes <code>WHERE email = '' OR '1'='1'</code>. The visitor's first quote mark closed the email text early. The rest, <code>OR '1'='1'</code>, is now SQL, and because one always equals one, the condition is true for every row. The attacker gets every user. With other inputs they could read other tables or delete data. This attack is called <b>SQL injection</b>, and it has been behind some of the largest data breaches in history.</p>

<h4>Prepared statements: the SQL and the data travel separately</h4>
<p>The fix is a <b>prepared statement</b>. You send the SQL with <b>placeholders</b>, marked gaps where values will go, and send the values in a separate step. It happens in three moves:</p>
<figure class="fig"><svg viewBox="0 0 420 136" role="img" aria-label="Three steps: prepare, execute, fetch">
<text class="t-b" x="70" y="18" text-anchor="middle">1</text><text class="t-b" x="210" y="18" text-anchor="middle">2</text><text class="t-b" x="350" y="18" text-anchor="middle">3</text>
<rect class="bx-a" x="10" y="28" width="120" height="44" rx="6"/><text class="t-m" x="70" y="55" text-anchor="middle">prepare()</text>
<path class="ln" d="M130 50H142"/><polygon class="ah" points="142,44 142,56 150,50"/>
<rect class="bx-info" x="150" y="28" width="120" height="44" rx="6"/><text class="t-m" x="210" y="55" text-anchor="middle">execute()</text>
<path class="ln" d="M270 50H282"/><polygon class="ah" points="282,44 282,56 290,50"/>
<rect class="bx-ok" x="290" y="28" width="120" height="44" rx="6"/><text class="t-m" x="350" y="55" text-anchor="middle">fetch()</text>
<text class="t-s" x="70" y="94" text-anchor="middle">SQL with gaps</text>
<text class="t-s" x="210" y="94" text-anchor="middle">fill the gaps</text>
<text class="t-s" x="350" y="94" text-anchor="middle">read a row</text>
<text class="t-s" x="210" y="126" text-anchor="middle">$stmt holds the prepared query between the steps</text>
</svg><figcaption>A prepared statement in three steps. Prepare sends the SQL with gaps and gets back a statement. Execute fills the gaps with your values. Fetch reads the resulting rows one at a time.</figcaption></figure>
<pre class="snip">$stmt = $pdo-&gt;prepare('SELECT id, name, email FROM users WHERE email = :email');
$stmt-&gt;execute(['email' =&gt; $email]);   // the value goes here
$user = $stmt-&gt;fetch();                 // one row, or false if none</pre>
<p>The database reads and plans the query <b>before</b> it ever sees the value. When the value arrives, it can only fill the gap as data. Quote marks in it are just characters to compare, so the injection attempt simply finds no user with that strange email.</p>
<p>There are two placeholder styles. <b>Named</b> placeholders start with a colon, like <code>:email</code>, and you pass an associative array whose keys match the names. <b>Positional</b> placeholders are question marks, and you pass a plain list in the same order: <code>prepare('INSERT INTO users (name, email) VALUES (?, ?)')</code> then <code>execute([$name, $email])</code>. Pick one style per query; you cannot mix them.</p>
<p><code>fetch()</code> returns the next row, or <code>false</code> when there are no rows left. A function that looks up one user should therefore promise <code>?array</code>: the question mark makes the type <b>nullable</b>, meaning "an array, or <code>null</code>". A neat way to convert the <code>false</code> into <code>null</code> is <code>return $user ?: null;</code>. The <code>?:</code> operator gives the left side if it counts as true, otherwise the right side.</p>

<h4>Inserting rows and getting the new id</h4>
<p>Inserting uses exactly the same prepare and execute steps. Most tables have an <code>id</code> column that the database numbers automatically, so after inserting you often want to know which number the new row received. <code>$pdo-&gt;lastInsertId()</code> tells you. It returns the id as a <b>string</b>, though, so a function promising <code>: int</code> should convert it with <code>(int)</code>, which is called a <b>cast</b>: <code>return (int) $pdo-&gt;lastInsertId();</code>.</p>

<h4>When the database says no: catching exceptions</h4>
<p>Try to insert a second user with <code>ada@example.com</code> and the UNIQUE rule refuses. Because of <code>ERRMODE_EXCEPTION</code>, PDO throws a <code>PDOException</code>. If nothing catches it, your script stops with a fatal error. To handle it, wrap the risky code in <code>try</code> and say what to do in <code>catch</code>:</p>
<pre class="snip">try {
    // code that might fail
} catch (PDOException $e) {
    // runs only if a PDOException was thrown above
    echo "Could not create user\\n";
}</pre>
<p>PHP runs the <code>try</code> block. If an exception of that type is thrown, it jumps straight to the <code>catch</code> block, with the exception in <code>$e</code>; <code>$e-&gt;getMessage()</code> holds the database's explanation. If nothing is thrown, the <code>catch</code> block is skipped. Show visitors a friendly message and write the technical details to a log, because raw database errors can reveal your table structure to an attacker.</p>
<div class="mistake"><b>Common mistake</b>Putting quotes around a placeholder: <code>WHERE email = ':email'</code>. Inside quotes it is no longer a placeholder, just the literal text ":email", so nothing matches and PDO may complain about a parameter that is not defined. Placeholders are always bare.</div>
<div class="mistake"><b>Common mistake</b>Trying to use a placeholder for a table or column name, such as <code>ORDER BY :column</code>. Placeholders only stand in for <b>values</b>. If a column name must vary, check it against a fixed list of allowed names in PHP first.</div>

<h4>Reading the errors you will hit</h4>
<ul>
<li><b>SQLSTATE[23000]: Integrity constraint violation</b>: a rule such as UNIQUE was broken. SQLite words it "UNIQUE constraint failed: users.email"; MySQL says "Duplicate entry".</li>
<li><b>SQLSTATE[HY093]: Invalid parameter number</b>: the placeholders and the values you passed to <code>execute()</code> do not match up.</li>
<li><b>no such table</b> or <b>Table doesn't exist</b>: a typo in the table name, or the wrong database.</li>
</ul>
<div class="try"><b>Try it in your head</b>A search box runs <code>$pdo-&gt;prepare('SELECT * FROM users WHERE name = ?')</code> and then <code>execute([$search])</code>. A visitor types <code>x'; DROP TABLE users; --</code>. What happens? Nothing bad: the whole text is compared as a name, no user has that name, and you get zero rows.</div>

<h4>Recap</h4>
<ul>
<li><code>new PDO($dsn, $user, $pass)</code> connects; set <code>ERRMODE_EXCEPTION</code> and <code>FETCH_ASSOC</code> straight after.</li>
<li>Gluing input into SQL allows SQL injection, where the input turns into commands.</li>
<li>Prepared statements send SQL with placeholders (<code>:email</code> or <code>?</code>) first and the values separately via <code>execute()</code>.</li>
<li><code>fetch()</code> gives one row or <code>false</code>, <code>fetchAll()</code> gives all rows, and <code>lastInsertId()</code> gives the new id as a string.</li>
<li>Wrap risky database calls in <code>try</code> and <code>catch (PDOException $e)</code>, and show users a friendly message.</li>
</ul>
`);

explain('h5',`
<h4>Why use a framework</h4>
<p>Every web app needs the same plumbing: work out which code should handle each URL, read and write the database, fill HTML templates, check form input and defend against common attacks. You could build all of that yourself with the PHP you know. It would take months, and your homemade security would probably have holes.</p>
<p>A <b>framework</b> is a ready-made structure that already does the plumbing. You fill in the parts that make your app unique. <b>Laravel</b> is the most popular PHP framework. Its big idea is <b>convention over configuration</b>: if you put files where Laravel expects and name them the way it expects, things connect by themselves, without long settings files.</p>
<div class="tbl-wrap"><table><tr><th>Folder or file</th><th>What lives there</th></tr>
<tr><td><code>routes/web.php</code></td><td>Which code answers which URL</td></tr>
<tr><td><code>app/Models/</code></td><td>Model classes, one per database table</td></tr>
<tr><td><code>database/migrations/</code></td><td>Step-by-step instructions to build tables</td></tr>
<tr><td><code>database/seeders/</code></td><td>Code that fills tables with starter data</td></tr>
<tr><td><code>resources/views/</code></td><td>Blade templates that become HTML</td></tr></table></div>
<p>This lesson's <code>blog</code> project has all of these, apart from the views, which you create.</p>

<h4>The journey of a request</h4>
<p>When someone visits <code>/posts</code>, the request passes through the pieces in a fixed order. Keep this picture in mind for the rest of the lesson:</p>
<figure class="fig"><svg viewBox="0 0 420 256" role="img" aria-label="A request goes to the route, the model and database, the Blade view, and back as HTML">
<rect class="bx-info" x="140" y="10" width="170" height="36" rx="6"/><text class="t-m" x="225" y="33" text-anchor="middle">GET /posts</text>
<text class="t-s" x="130" y="33" text-anchor="end">browser asks</text>
<path class="ln" d="M225 46v6"/><polygon class="ah" points="219,52 231,52 225,60"/>
<rect class="bx-a" x="140" y="60" width="170" height="36" rx="6"/><text class="t-m" x="225" y="83" text-anchor="middle">routes/web.php</text>
<text class="t-s" x="130" y="83" text-anchor="end">route matches</text>
<path class="ln" d="M225 96v6"/><polygon class="ah" points="219,102 231,102 225,110"/>
<rect class="bx" x="140" y="110" width="170" height="36" rx="6"/><text class="t" x="225" y="133" text-anchor="middle">Post model</text>
<text class="t-s" x="130" y="133" text-anchor="end">model queries</text>
<path class="ln" d="M318 128H332"/><polygon class="ah" points="318,122 318,134 310,128"/><polygon class="ah" points="332,122 332,134 340,128"/>
<rect class="bx" x="340" y="110" width="72" height="36" rx="6"/><text class="t-s" x="376" y="133" text-anchor="middle">database</text>
<path class="ln" d="M225 146v6"/><polygon class="ah" points="219,152 231,152 225,160"/>
<rect class="bx-warn" x="140" y="160" width="170" height="36" rx="6"/><text class="t" x="225" y="183" text-anchor="middle">Blade view</text>
<text class="t-s" x="130" y="183" text-anchor="end">view renders</text>
<path class="ln-ok" d="M225 196v6"/><polygon class="ah-ok" points="219,202 231,202 225,210"/>
<rect class="bx-ok" x="140" y="210" width="170" height="36" rx="6"/><text class="t" x="225" y="233" text-anchor="middle">HTML page</text>
<text class="t-s" x="130" y="233" text-anchor="end">sent back</text>
</svg><figcaption>The request for slash posts first meets the routes file, which picks the code to run. That code asks the Post model for data, and the model talks to the database. The data is handed to a Blade view, which produces the HTML page that goes back to the browser.</figcaption></figure>
<p>This split has a name, <b>MVC</b>: <b>M</b>odels handle data, <b>V</b>iews handle what the page looks like, and <b>C</b>ontrollers decide what to do for each request. In this lesson small functions inside the routes file play the controller role. Bigger apps move them into controller classes, which you will do in the next lesson.</p>

<h4>Artisan and migrations: building the table</h4>
<p><b>Artisan</b> is Laravel's command-line helper. You run it as <code>php artisan</code> followed by a command. The first one you need is <code>php artisan migrate</code>.</p>
<p>A <b>migration</b> is a PHP file that describes a change to the database's structure, such as "create a posts table with these columns". Look at the lesson's migration:</p>
<pre class="snip">Schema::create('posts', function (Blueprint $table) {
    $table-&gt;id();                                  // auto-numbered id
    $table-&gt;string('title');                       // short text
    $table-&gt;text('body');                          // long text
    $table-&gt;boolean('published')-&gt;default(false);  // true or false
    $table-&gt;timestamps();                          // created_at, updated_at
});</pre>
<p>Why not just create the table by hand? Because migrations live in your code and in Git. A teammate or a server runs <code>php artisan migrate</code> and gets exactly the same tables. Laravel records which migrations have already run in its own table, so running the command again only applies new ones. Migrations are version control for your database structure.</p>

<h4>Eloquent models: a class for each table</h4>
<p><b>Eloquent</b> is Laravel's <b>ORM</b>, short for object-relational mapper. It connects a class to a table, so each row comes back as an object and you rarely write SQL by hand. The connection is made by naming convention: the class <code>Post</code> uses the table <code>posts</code>, the plural in lower case.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="The Post class maps to the posts table and each Post object maps to one row">
<rect class="bx-a" x="10" y="20" width="140" height="36" rx="6"/><text class="t-b" x="80" y="43" text-anchor="middle">class Post</text>
<rect class="bx-ok" x="10" y="56" width="140" height="36" rx="6"/><text class="t" x="80" y="79" text-anchor="middle">a Post object</text>
<path class="ln-a" d="M150 38H192"/><polygon class="ah-a" points="192,32 192,44 200,38"/>
<path class="ln-ok" d="M150 74H192"/><polygon class="ah-ok" points="192,68 192,80 200,74"/>
<rect class="bx-info" x="200" y="20" width="50" height="36"/><text class="t-b" x="225" y="43" text-anchor="middle">id</text>
<rect class="bx-info" x="250" y="20" width="160" height="36"/><text class="t-b" x="330" y="43" text-anchor="middle">title</text>
<rect class="bx-ok" x="200" y="56" width="50" height="36"/><text class="t-m" x="225" y="79" text-anchor="middle">1</text>
<rect class="bx-ok" x="250" y="56" width="160" height="36"/><text class="t-s" x="330" y="79" text-anchor="middle">Hello Laravel</text>
<rect class="bx" x="200" y="92" width="50" height="36"/><text class="t-m" x="225" y="115" text-anchor="middle">2</text>
<rect class="bx" x="250" y="92" width="160" height="36"/><text class="t-s" x="330" y="115" text-anchor="middle">Eloquent is neat</text>
<rect class="bx" x="200" y="128" width="50" height="36"/><text class="t-m" x="225" y="151" text-anchor="middle">3</text>
<rect class="bx" x="250" y="128" width="160" height="36"/><text class="t-s" x="330" y="151" text-anchor="middle">Draft ideas</text>
<text class="t-s" x="210" y="190" text-anchor="middle">The class matches the table; each object matches one row</text>
</svg><figcaption>The Post class is linked to the posts table by its name. Each Post object holds one row, so the object for row 1 has the title Hello Laravel, and its columns are read as properties.</figcaption></figure>
<p>With an almost empty class (<code>class Post extends Model</code>), you already get a full set of tools, because <code>Model</code> provides them through inheritance:</p>
<pre class="snip">Post::all();                     // every row, as Post objects
Post::find(1);                   // the row with id 1, or null
Post::where('published', true)   // start a query with a condition
    -&gt;latest()                   // newest first (by created_at)
    -&gt;get();                     // run it: a collection of Posts</pre>
<p>The last example is a <b>chain</b>. Each method adds a piece to the query, and nothing is sent to the database until <code>get()</code> runs it. The result is a <b>collection</b>, Laravel's list-like object, which you can loop over with <code>foreach</code> just like an array. Each column is a property: <code>$post-&gt;title</code>.</p>

<h4>Mass assignment and <code>$fillable</code></h4>
<p>The seeder fills the table with three posts, using <code>Post::create([...])</code> with an array of column values. Setting many columns from one array at once is called <b>mass assignment</b>. Run <code>php artisan db:seed</code> and it fails with an error along the lines of <b>Add [title] to fillable property to allow mass assignment on [App\\Models\\Post]</b>.</p>
<p>That refusal is deliberate. Imagine a sign-up form handled with <code>User::create($request-&gt;all())</code>. A crafty visitor adds a hidden field <code>is_admin=1</code> to the form, and they have made themselves an administrator. So Laravel only mass-assigns columns you have explicitly allowed in the model's <code>$fillable</code> list:</p>
<pre class="snip">class Post extends Model
{
    protected $fillable = ['title', 'body'];   // add every column the seeder sets
}</pre>
<p>Look at the seeder to see which columns it sets, list exactly those, and run <code>php artisan db:seed</code> again.</p>

<h4>Routes and views</h4>
<p>A <b>route</b> pairs an HTTP method and a URL with the code that answers it. You already have one for the home page. A route for the post list fetches the data and hands it to a view:</p>
<pre class="snip">Route::get('/posts', function () {
    $posts = Post::where('published', true)-&gt;latest()-&gt;get();
    return view('posts.index', ['posts' =&gt; $posts]);
});</pre>
<p><code>view('posts.index', [...])</code> means "render the template at <code>resources/views/posts/index.blade.php</code> and give it these variables". The dot in the name stands for a folder, and Laravel adds <code>.blade.php</code> itself. The array's keys become variable names inside the template, so <code>'posts'</code> becomes <code>$posts</code> there. Filtering with <code>where('published', true)</code> is what keeps the draft off the page.</p>

<h4>Blade templates and escaping</h4>
<p><b>Blade</b> is Laravel's template language: mostly HTML, plus a few special markers.</p>
<pre class="snip">&lt;h1&gt;Blog&lt;/h1&gt;
&lt;ul&gt;
@foreach ($posts as $post)
    &lt;li&gt;{{ $post-&gt;title }}&lt;/li&gt;
@endforeach
&lt;/ul&gt;</pre>
<p><code>@foreach</code> and <code>@endforeach</code> repeat the HTML between them once per post. <code>{{ ... }}</code> prints a value, and here is the important part: it <b>escapes</b> it first, turning characters like <code>&lt;</code> into harmless codes. If someone titles a post with a <code>&lt;script&gt;</code> tag, visitors see the text instead of running the script. That attack is called <b>cross-site scripting</b>, or XSS, and Blade blocks it by default. Blade also has <code>{!! ... !!}</code>, which prints without escaping. Only use it for HTML you fully trust.</p>

<h4>Route parameters and route-model binding</h4>
<p>To show one post, the URL needs to carry its id: <code>/posts/1</code>, <code>/posts/2</code>. In the route, curly braces mark a part of the URL that can vary, a <b>route parameter</b>: <code>Route::get('/posts/{post}', ...)</code>.</p>
<p>Now the clever part. If your function asks for a <code>Post</code> object with a parameter of the same name, <code>function (Post $post)</code>, Laravel takes the number from the URL, looks up the post with that id, and passes in the finished object. This is <b>route-model binding</b>. If no post has that id, Laravel stops and returns a <b>404 Not Found</b> page for you. That is exactly what the last task checks with <code>/posts/999</code>.</p>
<div class="mistake"><b>Common mistake</b>Mismatched names, such as <code>{id}</code> in the URL with <code>Post $post</code> in the function. Binding only happens when the name in braces matches the parameter name, so use <code>{post}</code> with <code>$post</code>.</div>
<div class="mistake"><b>Common mistake</b>Forgetting <code>-&gt;get()</code> at the end of a query chain. Without it you pass the unfinished query to the view instead of the posts.</div>

<h4>Reading the errors you will hit</h4>
<ul>
<li><b>Add [title] to fillable property</b>: a mass-assigned column is missing from <code>$fillable</code>.</li>
<li><b>View [posts.index] not found</b>: the template file is missing or misnamed. It must be <code>resources/views/posts/index.blade.php</code>.</li>
<li><b>no such table: posts</b>, or "Base table or view not found" on MySQL: run <code>php artisan migrate</code> first.</li>
<li><b>Undefined variable $posts</b> inside a view: the key in the array passed to <code>view()</code> does not match the name used in the template.</li>
</ul>
<div class="try"><b>Try it in your head</b>After seeding, what does <code>/posts</code> list, and what does <code>/posts/3</code> show? The list shows only the two published posts, newest first, so "Draft ideas" is missing. But <code>/posts/3</code> still shows the draft, because the show route looks posts up by id and does not filter. A real blog would add that check too.</div>

<h4>Recap</h4>
<ul>
<li>A Laravel request flows route, then model and database, then Blade view, then HTML.</li>
<li>Migrations describe tables in code; <code>php artisan migrate</code> applies them.</li>
<li>Eloquent links <code>Post</code> to <code>posts</code>; chains like <code>where()-&gt;latest()-&gt;get()</code> build and run queries.</li>
<li><code>$fillable</code> lists the only columns that may be mass-assigned, blocking crafted form fields.</li>
<li><code>{{ }}</code> prints escaped text, <code>@foreach</code> loops, and <code>function (Post $post)</code> with <code>{post}</code> loads the record or returns 404.</li>
</ul>
`);

explain('h6',`
<h4>Why build an API</h4>
<p>In the last lesson your Laravel app answered with HTML pages, made for people reading in a browser. But many of your "visitors" are not people. A phone app, a JavaScript front end, or another company's server wants the <b>data</b>, not a page, so it can display or process it its own way.</p>
<p>An <b>API</b> (application programming interface) is a set of URLs designed for programs to call. Instead of HTML, it answers with <b>JSON</b>, a plain text format for data that every language can read. A task looks like this in JSON:</p>
<pre class="snip">{ "id": 1, "title": "Write tests", "done": false }</pre>
<p>Curly braces hold named fields, much like a PHP associative array. A list of tasks is the same thing inside square brackets. This lesson builds a to-do API that can list, create, read, update and delete tasks, the four basic data jobs often called <b>CRUD</b> (create, read, update, delete).</p>

<h4>REST: nouns in the URL, verbs in the method</h4>
<p>Every HTTP request has a <b>method</b> (also called a verb) and a <b>URL</b>. <b>REST</b> is a widely used style for designing APIs around that pair. The URL names a <b>resource</b>, a thing such as "all tasks" or "task number 1". The method says what to do with it. The URLs stay simple nouns; you never need <code>/deleteTask</code>.</p>
<div class="tbl-wrap"><table><tr><th>Method and URL</th><th>Meaning</th><th>Success status</th></tr>
<tr><td><code>GET /api/tasks</code></td><td>List all tasks</td><td>200 OK</td></tr>
<tr><td><code>POST /api/tasks</code></td><td>Create a new task from the request body</td><td>201 Created</td></tr>
<tr><td><code>GET /api/tasks/1</code></td><td>Read task 1</td><td>200 OK, or 404 if it does not exist</td></tr>
<tr><td><code>PATCH /api/tasks/1</code></td><td>Change some fields of task 1</td><td>200 OK</td></tr>
<tr><td><code>DELETE /api/tasks/1</code></td><td>Remove task 1</td><td>204 No Content</td></tr></table></div>
<p>GET only ever reads; it must never change data, because browsers, search engines and caches repeat GET requests freely. POST and PATCH carry a <b>body</b>: the JSON data being sent. You may also meet <code>PUT</code>, which replaces a whole resource, whereas <code>PATCH</code> changes only the fields you send.</p>

<h4>Status codes: the answer before the answer</h4>
<p>Every response starts with a three-digit <b>status code</b>. Programs read it before anything else to know whether the request worked. The first digit tells you the family:</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Status code families: 2xx success, 4xx client mistakes, 5xx server failures">
<rect class="bx-ok" x="10" y="10" width="120" height="50" rx="8"/><text class="t-b" x="70" y="32" text-anchor="middle">2xx</text><text class="t-s" x="70" y="50" text-anchor="middle">it worked</text>
<text class="t-s" x="145" y="31">200 OK, 201 Created</text><text class="t-s" x="145" y="51">204 No Content</text>
<rect class="bx-warn" x="10" y="75" width="120" height="50" rx="8"/><text class="t-b" x="70" y="97" text-anchor="middle">4xx</text><text class="t-s" x="70" y="115" text-anchor="middle">client's mistake</text>
<text class="t-s" x="145" y="96">404 Not Found</text><text class="t-s" x="145" y="116">422 Unprocessable Content</text>
<rect class="bx-bad" x="10" y="140" width="120" height="50" rx="8"/><text class="t-b" x="70" y="162" text-anchor="middle">5xx</text><text class="t-s" x="70" y="180" text-anchor="middle">server's fault</text>
<text class="t-s" x="145" y="161">500 Internal Server Error</text><text class="t-s" x="145" y="181">a bug or crash on your side</text>
</svg><figcaption>Status codes come in families. Codes in the 200s mean success. Codes in the 400s mean the client sent something wrong and must fix it, such as a missing record or invalid data. Codes in the 500s mean the server itself failed.</figcaption></figure>
<p>Choosing the right code is part of the API's design. A client that receives 422 knows to show the user the form errors; a client that receives 500 knows to try again later or report a bug. Returning 200 with "error" hidden in the body forces every client to guess.</p>

<h4>API routes and controllers</h4>
<p>API routes live in <code>routes/api.php</code>, and Laravel automatically puts <code>/api</code> in front of every URL in that file. So <code>Route::get('/tasks', ...)</code> answers <code>/api/tasks</code>. (In new Laravel 11 and later projects that file does not exist until you run <code>php artisan install:api</code>; this lesson's project already has it.)</p>
<p>Last lesson, small functions inside the routes file did the work. For an API with five actions, that gets crowded, so the code moves into a <b>controller</b>: a class whose methods each handle one action. The route points at a method using an array of the class name and the method name:</p>
<pre class="snip">Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/tasks/{task}', [TaskController::class, 'show']);</pre>
<p><code>TaskController::class</code> is simply the class's full name as a string, written in a way your editor can check. Laravel's usual method names are <code>index</code> (list), <code>store</code> (create), <code>show</code> (read one), <code>update</code> and <code>destroy</code>. Following them pays off: once you know the pattern, <code>Route::apiResource('tasks', TaskController::class)</code> registers all five routes in one line.</p>
<p>Here is the nicest shortcut in Laravel APIs: if a controller method <b>returns a model or a collection</b>, Laravel converts it to JSON and sends it with status 200. So <code>index()</code> can simply return <code>Task::orderBy('id')-&gt;get()</code>. The model's <code>$casts</code> setting, <code>'done' =&gt; 'boolean'</code>, makes sure <code>done</code> comes out as a real <code>true</code> or <code>false</code> in JSON, not the 0 or 1 the database stores.</p>

<h4>Creating with validation: 201 or 422</h4>
<p>Never trust incoming data. A client might send no title, a number instead of text, or a title ten thousand characters long. <code>$request-&gt;validate()</code> checks the request body against <b>rules</b>, written as text separated by vertical bars:</p>
<pre class="snip">$data = $request-&gt;validate([
    'title' =&gt; 'required|string|max:100',   // must exist, be text, at most 100 chars
    'done'  =&gt; 'boolean',                    // optional, but true/false if sent
]);</pre>
<figure class="fig"><svg viewBox="0 0 420 236" role="img" aria-label="POST request: validation fails with 422, or passes and creates the task with 201">
<rect class="bx-info" x="120" y="10" width="180" height="36" rx="6"/><text class="t-m" x="210" y="33" text-anchor="middle">POST /api/tasks</text>
<path class="ln" d="M210 46v12"/><polygon class="ah" points="204,58 216,58 210,66"/>
<rect class="bx-a" x="120" y="66" width="180" height="36" rx="6"/><text class="t-m" x="210" y="89" text-anchor="middle">validate()</text>
<path class="ln" d="M210 102V112H100V126M210 112H320V126"/>
<polygon class="ah" points="94,126 106,126 100,134"/><polygon class="ah-ok" points="314,126 326,126 320,134"/>
<text class="t-s t-bad" x="150" y="128" text-anchor="middle">fails</text>
<text class="t-s t-ok" x="268" y="128" text-anchor="middle">passes</text>
<rect class="bx-bad" x="10" y="134" width="180" height="40" rx="6"/><text class="t-b" x="100" y="159" text-anchor="middle">422 + errors</text>
<text class="t-s" x="100" y="194" text-anchor="middle">nothing is saved</text>
<rect class="bx" x="230" y="134" width="180" height="40" rx="6"/><text class="t-m" x="320" y="159" text-anchor="middle">Task::create</text>
<path class="ln-ok" d="M320 174v12"/><polygon class="ah-ok" points="314,186 326,186 320,194"/>
<rect class="bx-ok" x="230" y="194" width="180" height="36" rx="6"/><text class="t-b" x="320" y="217" text-anchor="middle">201 + new task</text>
</svg><figcaption>Every POST passes through validation first. If a rule fails, Laravel stops immediately and answers 422 with the errors for each field, and nothing is saved. If every rule passes, the task is created and returned with status 201.</figcaption></figure>
<p>If any rule fails, <code>validate()</code> stops the method right there. When the client asks for JSON, as API clients do with an <code>Accept: application/json</code> header, Laravel answers <b>422 Unprocessable Content</b> with a body like this:</p>
<pre class="snip">{
  "message": "The title field is required.",
  "errors": { "title": ["The title field is required."] }
}</pre>
<p>The <code>errors</code> object lists the problems field by field, so a front end can show each message next to the right input. If validation passes, <code>validate()</code> returns <b>only the validated fields</b>. Extra fields a client slipped in are dropped, which works hand in hand with <code>$fillable</code> from the last lesson.</p>
<p>Returning the new task directly would send status 200. For a creation, the correct code is 201 Created, so you build the response yourself: <code>response()-&gt;json($task, 201)</code>, meaning "send this as JSON with status 201".</p>

<h4>Reading, updating and deleting one task</h4>
<p>The three single-task actions all use a <code>{task}</code> route parameter with <b>route-model binding</b>, which you met last lesson: a method parameter <code>Task $task</code> receives the task whose id is in the URL. When there is no such task, Laravel answers <b>404 Not Found</b> before your method even runs. That means <code>show()</code> can be one line that returns <code>$task</code>.</p>
<ul>
<li><b>update</b> takes both the request and the task: <code>update(Request $request, Task $task)</code>. Because PATCH changes only some fields, its rules leave out <code>required</code>. Then <code>$task-&gt;update($data)</code> saves the changes, and returning <code>$task</code> sends back the updated version with 200.</li>
<li><b>destroy</b> calls <code>$task-&gt;delete()</code>. There is nothing useful left to send back, so it returns <code>response()-&gt;noContent()</code>, which is status <b>204 No Content</b>: success, with an empty body.</li>
</ul>
<p>The last task checks the whole story in order: PATCH sets <code>done</code> to true, DELETE answers 204, and a GET for the same task afterwards answers 404, proving it is really gone.</p>
<div class="tip"><b>Tip</b>Run <code>php artisan migrate</code> before anything else, or every request fails because the tasks table does not exist. Then use the request panel: choose the method, type the path, add a JSON body for POST and PATCH, and press Send. Always look at the status code first, then the body.</div>
<div class="mistake"><b>Common mistake</b>Keeping <code>required</code> in the PATCH rules. Then a client that only wants to tick a task as done must also resend the title, or gets a 422. Partial updates need rules without <code>required</code>.</div>
<div class="mistake"><b>Common mistake</b>Adding a method to the controller but not a route for it. The method exists, yet the URL gives 404 or "405 Method Not Allowed", because Laravel only knows the routes in <code>routes/api.php</code>. Every action needs both.</div>

<h4>Reading the errors you will hit</h4>
<ul>
<li><b>404 Not Found</b>: either no route matches that method and URL, or route-model binding found no record with that id.</li>
<li><b>405 Method Not Allowed</b>: the URL exists, but not with that method, for example a DELETE route that was never added.</li>
<li><b>422</b> with <code>errors</code>: your own validation rejected the body. Read the field messages.</li>
<li><b>500</b>: your code crashed. Common causes are a missing table (run the migration) or a column missing from <code>$fillable</code>.</li>
</ul>
<div class="try"><b>Try it in your head</b>A client sends <code>POST /api/tasks</code> with the body <code>{"title": ""}</code>, then <code>DELETE /api/tasks/42</code> when no task 42 exists. What status codes come back? The empty title fails <code>required</code>, so 422. The delete finds no task through route-model binding, so 404.</div>

<h4>Recap</h4>
<ul>
<li>A REST API names resources in URLs and uses the method for the action: GET reads, POST creates, PATCH updates, DELETE removes.</li>
<li>Status families: 2xx success, 4xx the client's mistake, 5xx the server's fault. Create with 201, delete with 204, missing with 404, invalid with 422.</li>
<li>Routes in <code>routes/api.php</code> get the <code>/api</code> prefix and point at controller methods with <code>[TaskController::class, 'store']</code>.</li>
<li>Returning a model or collection sends JSON with 200; <code>response()-&gt;json($task, 201)</code> and <code>response()-&gt;noContent()</code> set other codes.</li>
<li><code>$request-&gt;validate()</code> returns only checked fields, or answers 422 with errors for each field.</li>
</ul>
`);
