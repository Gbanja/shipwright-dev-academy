/* python: "Explained step by step" walkthroughs. */

explain('yb1',`
<h4>What a program actually is</h4>
<p>A <b>program</b> is a list of instructions that a computer follows, one line at a time, from top to bottom. Computers are fast but completely literal: they do exactly what you wrote, not what you meant. A programming language is a way of writing those instructions that both you and the computer can read.</p>
<p><b>Python</b> is one of those languages. It was designed to be readable, so its instructions look a lot like short English sentences. It runs websites, analyses data, automates boring jobs and powers most AI research, which is why it is such a popular first language.</p>
<p>When you press <b>Run</b>, a program called the <b>Python interpreter</b> reads your code and carries out each line in order. In this app the interpreter runs inside your browser, but the code you write here is the same Python people run on servers and laptops.</p>
<div class="analogy"><b>Think of it like</b>A recipe. Each line is one step, the steps happen in order, and the cook (the interpreter) does exactly what the recipe says. If a step says "add salt" before you have a pan, the cook stops and complains.</div>

<h4>Your first instruction: <code>print</code></h4>
<pre class="snip">print("Hello, world!")</pre>
<p>This one line has three parts:</p>
<ul>
<li><code>print</code> is the name of a <b>function</b>. A function is a ready-made command that does one job. The job of <code>print</code> is to show something on the screen, in the Output area below your code.</li>
<li>The round brackets <code>( )</code> mean "run this function now, with whatever is inside". What you put inside is called the <b>argument</b>.</li>
<li><code>"Hello, world!"</code> is a piece of text. The quotes tell Python where the text starts and ends. Without them, Python would think <code>Hello</code> was the name of something and get confused.</li>
</ul>
<p>Single quotes and double quotes both work: <code>'hi'</code> and <code>"hi"</code> are the same. Just use the same kind at both ends.</p>
<p>Lines that start with <code>#</code> are <b>comments</b>. Python skips them completely. They are notes for the humans who read the code, including you next week.</p>

<h4>Variables: names stuck on values</h4>
<p>Programs need to remember things: a name someone typed, a price, a score. A <b>variable</b> is a name you give to a value so you can use it later.</p>
<pre class="snip">name = "Ada"      # store the text "Ada" under the name name
age = 36          # store the number 36 under the name age
print(name)       # shows: Ada
print(age)        # shows: 36</pre>
<p>The <code>=</code> sign here does not mean "equals" like in maths. It means <b>"make this name point at this value"</b>. Python always works out the right-hand side first, then attaches the name on the left to the result. That is why <code>age = age + 1</code> makes sense: take the current age, add one, and point <code>age</code> at the new number.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="Four variable names pointing at four values, each with its type">
<g text-anchor="middle"><text class="t-s" x="80" y="22">variable</text><text class="t-s" x="262" y="22">value</text><text class="t-s" x="372" y="22">type</text></g>
<rect class="bx-a" x="20" y="36" width="120" height="38" rx="6"/><text class="t-m" x="80" y="60" text-anchor="middle">name</text>
<path class="ln" d="M140 55h60"/><polygon class="ah" points="200,49 200,61 208,55"/>
<rect class="bx" x="210" y="36" width="104" height="38" rx="6"/><text class="t-m" x="262" y="60" text-anchor="middle">"Ada"</text>
<text class="t-b t-a" x="372" y="60" text-anchor="middle">str</text>
<rect class="bx-a" x="20" y="88" width="120" height="38" rx="6"/><text class="t-m" x="80" y="112" text-anchor="middle">age</text>
<path class="ln" d="M140 107h60"/><polygon class="ah" points="200,101 200,113 208,107"/>
<rect class="bx" x="210" y="88" width="104" height="38" rx="6"/><text class="t-m" x="262" y="112" text-anchor="middle">36</text>
<text class="t-b t-ok" x="372" y="112" text-anchor="middle">int</text>
<rect class="bx-a" x="20" y="140" width="120" height="38" rx="6"/><text class="t-m" x="80" y="164" text-anchor="middle">price</text>
<path class="ln" d="M140 159h60"/><polygon class="ah" points="200,153 200,165 208,159"/>
<rect class="bx" x="210" y="140" width="104" height="38" rx="6"/><text class="t-m" x="262" y="164" text-anchor="middle">19.99</text>
<text class="t-b t-info" x="372" y="164" text-anchor="middle">float</text>
<rect class="bx-a" x="20" y="192" width="120" height="38" rx="6"/><text class="t-m" x="80" y="216" text-anchor="middle">is_member</text>
<path class="ln" d="M140 211h60"/><polygon class="ah" points="200,205 200,217 208,211"/>
<rect class="bx" x="210" y="192" width="104" height="38" rx="6"/><text class="t-m" x="262" y="216" text-anchor="middle">True</text>
<text class="t-b t-warn" x="372" y="216" text-anchor="middle">bool</text>
</svg><figcaption>A variable is a name tag tied to a value. The name lives on the left, the value it points at is in the middle, and every value carries a type: str for text, int for whole numbers, float for decimals and bool for True or False.</figcaption></figure>
<p>A few rules for names. They can contain letters, digits and underscores, but cannot start with a digit or contain spaces. Capital letters matter, so <code>Age</code> and <code>age</code> are two different variables. Python style is lowercase words joined by underscores, like <code>first_name</code>. Choose names that say what the value means: <code>price</code> tells the next reader far more than <code>p</code>.</p>

<h4>Types: what kind of value is it?</h4>
<p>Every value in Python has a <b>type</b>. The type decides what you can do with the value. You can multiply two numbers, and you can make text upper case, but "upper-case the number 7" means nothing. These four types cover most beginner programs:</p>
<div class="tbl-wrap"><table><tr><th>Type</th><th>Short for</th><th>Holds</th><th>Examples</th></tr>
<tr><td><code>str</code></td><td>string</td><td>Text: a "string" of characters in quotes</td><td><code>"Ada"</code>, <code>'42'</code>, <code>""</code></td></tr>
<tr><td><code>int</code></td><td>integer</td><td>Whole numbers, no decimal point</td><td><code>36</code>, <code>0</code>, <code>-4</code></td></tr>
<tr><td><code>float</code></td><td>floating-point number</td><td>Numbers with a decimal point</td><td><code>19.99</code>, <code>3.0</code></td></tr>
<tr><td><code>bool</code></td><td>Boolean</td><td>Yes or no</td><td><code>True</code>, <code>False</code></td></tr></table></div>
<p>You can ask Python for the type of anything with the <code>type()</code> function. <code>print(type(36))</code> reports class int, and <code>print(type("36"))</code> reports class str. "Class" is Python's word for a type.</p>
<p>Notice that <code>True</code> and <code>False</code> start with a capital letter and have no quotes. With quotes, <code>"True"</code> would just be a four-letter piece of text.</p>
<div class="tip"><b>Tip</b>Arithmetic uses <code>+</code>, <code>-</code>, <code>*</code> for multiply and <code>/</code> for divide. Dividing always gives a float: <code>10 / 2</code> is <code>5.0</code>, not <code>5</code>.</div>

<h4>Text that looks like a number is still text</h4>
<p>This is the single most common beginner surprise. <code>"36"</code> with quotes is a string of two characters, a 3 and a 6. <code>36</code> without quotes is a number. They print the same, but they behave very differently:</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="Adding strings joins them, adding ints does maths, and int() converts between them">
<rect class="bx-warn" x="20" y="16" width="110" height="40" rx="6"/><text class="t-m" x="75" y="42" text-anchor="middle">"36"</text>
<text class="t-s" x="75" y="74" text-anchor="middle">str</text>
<path class="ln-a" d="M130 36h140"/><polygon class="ah-a" points="270,30 270,42 278,36"/>
<text class="t-m t-a" x="204" y="28" text-anchor="middle">int("36")</text>
<rect class="bx-ok" x="290" y="16" width="110" height="40" rx="6"/><text class="t-m" x="345" y="42" text-anchor="middle">36</text>
<text class="t-s" x="345" y="74" text-anchor="middle">int</text>
<line class="ln-d" x1="20" y1="94" x2="400" y2="94"/>
<text class="t-m" x="30" y="130">"36" + "1"</text><path class="ln" d="M190 125h40"/><polygon class="ah" points="230,119 230,131 238,125"/>
<text class="t-m t-warn" x="256" y="130">"361"</text><text class="t-s" x="320" y="130">joins text</text>
<text class="t-m" x="30" y="174">36 + 1</text><path class="ln" d="M190 169h40"/><polygon class="ah" points="230,163 230,175 238,169"/>
<text class="t-m t-ok" x="256" y="174">37</text><text class="t-s" x="320" y="174">adds</text>
<text class="t-m" x="30" y="214">"36" + 1</text><path class="ln" d="M190 209h40"/><polygon class="ah" points="230,203 230,215 238,209"/>
<text class="t-b t-bad" x="256" y="214">TypeError</text>
</svg><figcaption>The plus sign joins two strings end to end, adds two numbers, and refuses to mix a string with a number. The int function turns the text "36" into the number 36 so you can do maths with it.</figcaption></figure>
<p>Why does this matter? Anything a person types into a program, and anything read from a file, arrives as a string. If someone types their age, you get <code>"36"</code>, and you must <b>convert</b> it before doing maths. The conversion functions are named after the types:</p>
<pre class="snip">age_text = "36"
age_num = int(age_text)     # 36, a whole number
float("19.99")              # 19.99, a decimal
str(36)                     # "36", back to text
int(3.9)                    # 3: int() chops off the decimals</pre>
<p>Conversion only works when the text really looks like that type. <code>int("abc")</code> fails, and so does <code>int("3.5")</code>, because "3.5" is not a whole number. Use <code>float("3.5")</code> for that.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>"Age: " + 36</code>. Python refuses to guess whether you wanted text or maths, and stops with <code>TypeError: can only concatenate str (not "int") to str</code>. "Concatenate" just means "join end to end". Convert the number with <code>str(36)</code>, or better, use an f-string.</div>

<h4>f-strings: dropping values into text</h4>
<p>You will constantly want sentences built from variables, like "Ada is 36 years old". An <b>f-string</b> is the modern, readable way to do it. Put the letter <code>f</code> straight before the opening quote, then write any variable inside curly braces <code>{ }</code>:</p>
<pre class="snip">name = "Ada"
age = 36
greeting = f"Hi, I'm {name} and I'm {age} years old."
print(greeting)   # Hi, I'm Ada and I'm 36 years old.</pre>
<p>Step by step, Python reads the f-string from left to right. Ordinary characters are copied as they are. When it meets <code>{name}</code>, it looks up the variable <code>name</code>, finds <code>"Ada"</code> and puts that text in its place. When it meets <code>{age}</code>, it finds the number 36 and converts it to text for you. The result is one normal string.</p>
<p>You can put small calculations in the braces too: <code>f"Next year: {age + 1}"</code> gives <code>Next year: 37</code>.</p>
<div class="mistake"><b>Common mistake</b>Forgetting the <code>f</code>. Then <code>"Hi {name}"</code> prints the braces literally: <code>Hi {name}</code>. If you see curly braces in your output, check for the missing f.</div>

<h4>Decimals are slightly fuzzy: <code>round()</code></h4>
<p>Computers store decimal numbers in binary, and most decimals cannot be stored exactly in binary, just as one third cannot be written exactly as 0.333... in decimal. Usually you never notice. Sometimes you do:</p>
<pre class="snip">print(0.1 + 0.2)          # 0.30000000000000004
print(round(0.1 + 0.2, 2))  # 0.3</pre>
<p>The <code>round</code> function takes two arguments separated by a comma: the number, and how many decimal places to keep. For money, keep two. So for a price of 19.99 and a quantity of 3, you multiply them and round the result to 2 places, which gives 59.97. Rounding is how you present a tidy answer; serious finance software goes further and uses exact decimal types, but <code>round</code> is right for now.</p>

<h4>Reading the errors you will meet</h4>
<p>Errors are normal. Every programmer sees dozens a day. Python prints a <b>traceback</b>: the last line names the kind of error and explains it, and the lines above point at where it happened. Read the last line first.</p>
<div class="tbl-wrap"><table><tr><th>Last line says</th><th>What it means</th></tr>
<tr><td><code>NameError: name 'nme' is not defined</code></td><td>You used a name Python has never seen. Usually a typo, or the variable is created further down.</td></tr>
<tr><td><code>SyntaxError: unterminated string literal</code></td><td>A quote was opened but never closed.</td></tr>
<tr><td><code>TypeError: can only concatenate str ...</code></td><td>You mixed text and a number with <code>+</code>.</td></tr>
<tr><td><code>ValueError: invalid literal for int()</code></td><td>You tried <code>int()</code> on text that is not a whole number.</td></tr></table></div>
<div class="try"><b>Try it in your head</b>What is the type of <code>"42"</code>, and what does <code>int("42") + 1</code> give? The quotes make <code>"42"</code> a str. <code>int("42")</code> turns it into the number 42, and adding 1 gives the int <code>43</code>. What would <code>"42" + "1"</code> give? The text <code>"421"</code>.</div>

<h4>Recap</h4>
<ul>
<li><code>print(...)</code> shows a value in the output. Text goes in quotes; <code>#</code> starts a comment.</li>
<li><code>name = value</code> attaches a name to a value. The right-hand side is worked out first.</li>
<li>The four basic types are <code>str</code>, <code>int</code>, <code>float</code> and <code>bool</code>. <code>type(x)</code> tells you which one you have.</li>
<li><code>"36"</code> is text and <code>36</code> is a number. Convert with <code>int()</code>, <code>float()</code> and <code>str()</code>.</li>
<li>f-strings like <code>f"Hi {name}"</code> put values into text. Don't forget the <code>f</code>.</li>
<li>Decimals are stored approximately, so use <code>round(value, 2)</code> to show money.</li>
</ul>
`);

explain('yb2',`
<h4>Why programs need decisions, loops and functions</h4>
<p>So far your code has run straight down the page, every line exactly once. That is enough for a calculator, but real programs need three more powers:</p>
<ul>
<li><b>Deciding</b>: do one thing or another depending on the situation. "If the score is 90 or more, give an A."</li>
<li><b>Repeating</b>: do the same work for every item, or until something changes. "Add up every even number in this list."</li>
<li><b>Packaging</b>: give a piece of work a name, so you can reuse it whenever you need it, with different inputs. That named piece of work is a <b>function</b>.</li>
</ul>
<p>Almost every program ever written is built from those three ideas plus the variables you already know.</p>

<h4>Indentation: how Python groups lines</h4>
<p>Before any of that, you need one rule that makes Python different from many languages. Python uses the <b>spaces at the start of a line</b> to know which lines belong together.</p>
<p>A line that ends with a colon <code>:</code> opens a <b>block</b>. The block is every line below it that is indented further. The block ends as soon as a line goes back to the old indentation.</p>
<pre class="snip">if temperature &gt; 25:
    print("T-shirt weather")   # inside the block
    print("Wear sun cream")    # also inside
print("Have a nice day")       # back out: always runs</pre>
<p>The standard is <b>4 spaces</b> per level. The code editor usually inserts them for you when you press Tab or Enter after a colon. Many languages use curly braces for this job and treat indentation as decoration. In Python, indentation <i>is</i> the structure, so it has to be consistent.</p>
<div class="mistake"><b>Common mistake</b>Forgetting to indent after a colon. Python stops with <code>IndentationError: expected an indented block after 'if' statement on line 2</code>. The fix is to indent the line below by 4 spaces. A related error, <code>unindent does not match any outer indentation level</code>, means you used 3 spaces on one line and 4 on another.</div>

<h4>Comparisons: questions with a True or False answer</h4>
<p>A decision needs a question. In Python, a question is a <b>comparison</b>, and its answer is a bool: <code>True</code> or <code>False</code>.</p>
<div class="tbl-wrap"><table><tr><th>Write</th><th>Asks</th><th>Example that is True</th></tr>
<tr><td><code>==</code></td><td>equal to?</td><td><code>5 == 5</code></td></tr>
<tr><td><code>!=</code></td><td>not equal to?</td><td><code>5 != 3</code></td></tr>
<tr><td><code>&gt;</code> and <code>&lt;</code></td><td>greater than? less than?</td><td><code>7 &gt; 2</code></td></tr>
<tr><td><code>&gt;=</code> and <code>&lt;=</code></td><td>greater or equal? less or equal?</td><td><code>90 &gt;= 90</code></td></tr></table></div>
<p>Notice the double equals. A single <code>=</code> <b>stores</b> a value: <code>x = 5</code> means "point x at 5". A double <code>==</code> <b>asks</b>: <code>x == 5</code> means "is x equal to 5?" and gives True or False.</p>
<p>One more operator you need for this lesson: <code>%</code>, called <b>modulo</b>, gives the <b>remainder</b> after a division. <code>7 % 2</code> is 1, because 7 divided by 2 is 3 remainder 1. <code>8 % 2</code> is 0. Every even number divides by 2 with nothing left over, so <code>n % 2 == 0</code> is the standard way to ask "is n even?".</p>

<h4>Decisions: <code>if</code>, <code>elif</code> and <code>else</code></h4>
<p>An <code>if</code> runs its block only when its question is True. You can chain more questions with <code>elif</code> (short for "else if"), and finish with <code>else</code>, which catches everything that matched nothing above.</p>
<pre class="snip">if score &gt;= 90:
    letter = "A"
elif score &gt;= 80:      # only asked if the first was False
    letter = "B"
elif score &gt;= 70:
    letter = "C"
else:                  # none of the above
    letter = "F"</pre>
<p>Python asks the questions <b>in order, top to bottom</b>, and stops at the first one that is True. Only one block ever runs. Here is the path for a score of 85:</p>
<figure class="fig"><svg viewBox="0 0 420 316" role="img" aria-label="An if elif else chain for a score of 85, stopping at the second question">
<rect class="bx" x="70" y="8" width="150" height="36" rx="8"/><text class="t-m" x="145" y="31" text-anchor="middle">score = 85</text>
<path class="ln" d="M145 44v10"/><polygon class="ah" points="139,52 151,52 145,60"/>
<rect class="bx" x="30" y="62" width="230" height="40" rx="8"/><text class="t-m" x="145" y="87" text-anchor="middle">score &gt;= 90 ?</text>
<path class="ln-d" d="M260 82h44"/><text class="t-s" x="284" y="74" text-anchor="middle">yes</text>
<rect class="bx" x="312" y="64" width="88" height="36" rx="6"/><text class="t-m" x="356" y="87" text-anchor="middle">"A"</text>
<path class="ln-a" d="M145 102v20"/><polygon class="ah-a" points="139,120 151,120 145,128"/><text class="t-s t-a" x="157" y="120">no</text>
<rect class="bx-a" x="30" y="132" width="230" height="40" rx="8"/><text class="t-m" x="145" y="157" text-anchor="middle">score &gt;= 80 ?</text>
<path class="ln-ok" d="M260 152h44"/><polygon class="ah-ok" points="302,146 302,158 310,152"/><text class="t-s t-ok" x="284" y="144" text-anchor="middle">yes</text>
<rect class="bx-ok" x="312" y="134" width="88" height="36" rx="6"/><text class="t-m" x="356" y="157" text-anchor="middle">"B"</text>
<path class="ln-d" d="M145 172v28"/>
<rect class="bx" x="30" y="202" width="230" height="40" rx="8"/><text class="t-m" x="145" y="227" text-anchor="middle">score &gt;= 70 ?</text>
<path class="ln-d" d="M260 222h44"/>
<rect class="bx" x="312" y="204" width="88" height="36" rx="6"/><text class="t-m" x="356" y="227" text-anchor="middle">"C"</text>
<path class="ln-d" d="M145 242v28"/>
<rect class="bx" x="30" y="272" width="230" height="36" rx="8"/><text class="t-m" x="145" y="295" text-anchor="middle">else</text>
<path class="ln-d" d="M260 290h44"/>
<rect class="bx" x="312" y="272" width="88" height="36" rx="6"/><text class="t-m" x="356" y="295" text-anchor="middle">"F"</text>
</svg><figcaption>For a score of 85, the first question is False, so Python moves down. The second question is True, so the answer is B and Python skips everything below. The dashed paths are never even checked.</figcaption></figure>
<p>This is why the order matters. Because 90 was already ruled out, the <code>elif score &gt;= 80</code> line effectively means "80 to 89". If you put the <code>&gt;= 70</code> check first, a score of 95 would stop there and get a C.</p>
<p>A score of exactly 90 is worth checking too. <code>90 &gt;= 90</code> is True, so it gets an A. With <code>&gt;</code> instead of <code>&gt;=</code>, it would wrongly fall through to B. Values sitting exactly on a boundary are where most bugs hide.</p>

<h4>Loops with <code>for</code>: once per item</h4>
<p>A <code>for</code> loop runs its block once for each item in a collection, such as a list. A <b>list</b> is an ordered collection written in square brackets: <code>[1, 2, 3, 4]</code>. You will study lists properly in the next lesson.</p>
<pre class="snip">numbers = [1, 2, 3, 4]
total = 0
for n in numbers:          # n becomes 1, then 2, then 3, then 4
    if n % 2 == 0:         # is it even?
        total = total + n  # then add it to the running total
print(total)               # 6</pre>
<p>The name after <code>for</code>, here <code>n</code>, is a variable that Python points at each item in turn. Let's trace it step by step:</p>
<div class="tbl-wrap"><table><tr><th>Round</th><th>n</th><th>n % 2 == 0?</th><th>total after</th></tr>
<tr><td>1</td><td>1</td><td>False</td><td>0</td></tr>
<tr><td>2</td><td>2</td><td>True</td><td>2</td></tr>
<tr><td>3</td><td>3</td><td>False</td><td>2</td></tr>
<tr><td>4</td><td>4</td><td>True</td><td>6</td></tr></table></div>
<p>This pattern, start a variable at zero and add to it inside the loop, is called an <b>accumulator</b>. You will use it constantly. Notice that <code>total = 0</code> sits <i>before</i> the loop. Put it inside, and it would reset to zero every round.</p>
<p>If you just want to repeat something a number of times, <code>range</code> makes the numbers for you: <code>for i in range(3):</code> runs with i as 0, 1 and 2. It starts at 0 and stops <i>before</i> the number you give it.</p>

<h4>Loops with <code>while</code>: until a condition is False</h4>
<p>A <code>while</code> loop does not walk through a list. It keeps asking a question, and repeats its block for as long as the answer is True.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="A while loop checks n greater than 0, runs its body, and goes back to the check">
<rect class="bx-a" x="100" y="20" width="180" height="40" rx="8"/><text class="t-m" x="190" y="45" text-anchor="middle">n &gt; 0 ?</text>
<path class="ln-ok" d="M190 60v32"/><polygon class="ah-ok" points="184,90 196,90 190,98"/><text class="t-s t-ok" x="202" y="84">yes</text>
<rect class="bx-ok" x="70" y="100" width="240" height="66" rx="8"/>
<text class="t-m" x="190" y="127" text-anchor="middle">result.append(n)</text><text class="t-m" x="190" y="151" text-anchor="middle">n = n - 1</text>
<path class="ln" d="M70 133h-40v-93h62"/><polygon class="ah" points="92,34 92,46 100,40"/>
<path class="ln-a" d="M280 40h65v148"/><polygon class="ah-a" points="339,186 351,186 345,194"/><text class="t-s t-a" x="312" y="32" text-anchor="middle">no</text>
<rect class="bx" x="280" y="196" width="130" height="40" rx="8"/><text class="t" x="345" y="221" text-anchor="middle">return result</text>
<text class="t-s" x="20" y="214">n: 3, 2, 1, then 0</text>
<text class="t-s" x="20" y="234">result: [3, 2, 1]</text>
</svg><figcaption>Each round, Python asks whether n is greater than 0. If yes, it runs the body, which adds n to the result and makes n one smaller, then loops back to the question. When n reaches 0 the answer is no, and the loop ends.</figcaption></figure>
<pre class="snip">n = 3
result = []                # an empty list
while n &gt; 0:
    result.append(n)       # add n to the end of the list
    n = n - 1              # count down
print(result)              # [3, 2, 1]</pre>
<p><code>result.append(n)</code> adds an item to the end of a list. The dot means "use the append ability that belongs to this list".</p>
<p>If <code>n</code> starts at 0, the question is False straight away, the body never runs, and you get an empty list <code>[]</code>. That is correct, and it is another boundary worth testing.</p>
<div class="mistake"><b>Common mistake</b>Forgetting <code>n = n - 1</code>. Then n is 3 forever, the question is always True, and the loop never ends. This is an <b>infinite loop</b>: the program freezes until you stop it. Every <code>while</code> loop needs something inside it that moves it towards stopping.</div>
<p>Which loop should you use? Use <code>for</code> when you have a collection to go through. Use <code>while</code> when you are waiting for something to change and do not know in advance how many rounds it will take.</p>

<h4>Functions: <code>def</code>, parameters and <code>return</code></h4>
<p>A <b>function</b> is a named piece of work with inputs and an output. You have used built-in ones like <code>print</code> and <code>int</code>. Now you write your own with <code>def</code>, short for "define".</p>
<pre class="snip">def area(width, height):   # name, then inputs in brackets, then a colon
    return width * height  # the answer goes back to whoever asked

print(area(3, 4))          # 12
print(area(5, 2))          # 10</pre>
<p>Some words to know:</p>
<ul>
<li><b>Parameters</b> are the input names in the <code>def</code> line: <code>width</code> and <code>height</code>. They are variables that exist only while the function runs.</li>
<li><b>Arguments</b> are the actual values you pass in when you <b>call</b> the function: 3 and 4. They are matched to the parameters in order.</li>
<li><code>return</code> hands a value back and ends the function immediately. The call <code>area(3, 4)</code> is then replaced by that value, 12.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Calling greet with Ada sends the argument in and the returned text comes back">
<rect class="bx" x="10" y="20" width="160" height="150" rx="8"/>
<text class="t-s" x="90" y="42" text-anchor="middle">your code</text>
<text class="t-m" x="90" y="70" text-anchor="middle">greet("Ada")</text>
<text class="t-s" x="90" y="104" text-anchor="middle">becomes</text>
<text class="t-m t-ok" x="90" y="146" text-anchor="middle">"Hello, Ada!"</text>
<path class="ln-a" d="M170 65h52"/><polygon class="ah-a" points="222,59 222,71 230,65"/><text class="t-s t-a" x="200" y="55" text-anchor="middle">call</text>
<rect class="bx-a" x="232" y="20" width="178" height="150" rx="8"/>
<text class="t-s" x="321" y="42" text-anchor="middle">inside greet</text>
<text class="t-m" x="321" y="80" text-anchor="middle">name = "Ada"</text>
<text class="t-m" x="321" y="126" text-anchor="middle">return f"..."</text>
<path class="ln-ok" d="M232 141h-54"/><polygon class="ah-ok" points="178,135 178,147 170,141"/><text class="t-s t-ok" x="200" y="131" text-anchor="middle">return</text>
<text class="t-s" x="210" y="198" text-anchor="middle">The call is replaced by the returned value.</text>
</svg><figcaption>When you call greet with the argument Ada, Python jumps into the function and points the parameter name at Ada. The return line sends the finished text back, and the call in your code is replaced by that value.</figcaption></figure>
<p>Parameters can have a <b>default value</b>, used when the caller leaves the argument out:</p>
<pre class="snip">def greet(name="friend"):
    return f"Hello, {name}!"

greet()        # "Hello, friend!"  (default used)
greet("Ada")   # "Hello, Ada!"     (default replaced)</pre>
<div class="mistake"><b>Common mistake</b>Using <code>print</code> instead of <code>return</code> inside a function. Printing shows text on screen but gives nothing back, so the caller receives the special value <code>None</code>, which means "nothing". The tasks check what your functions <i>return</i>, so make sure each one ends in a <code>return</code> line.</div>
<p>Also check the indentation of <code>return</code> inside loops. In <code>sum_evens</code>, the <code>return total</code> line must line up with the <code>for</code>, not sit inside the loop. Inside the loop it would return after the very first number.</p>

<div class="try"><b>Try it in your head</b>What does <code>grade(70)</code> return? 70 is not 90 or more, and not 80 or more, but it is 70 or more, so <code>"C"</code>. And <code>countdown(2)</code>? n is 2, append 2, n becomes 1, append 1, n becomes 0 and the loop stops: <code>[2, 1]</code>.</div>

<h4>Recap</h4>
<ul>
<li>A colon opens a block, and the indented lines (4 spaces) below it are the block.</li>
<li><code>if</code>, <code>elif</code>, <code>else</code> check questions top to bottom and run only the first block whose question is True.</li>
<li><code>=</code> stores, <code>==</code> compares. <code>n % 2 == 0</code> asks whether n is even.</li>
<li><code>for item in list:</code> runs once per item. <code>while condition:</code> runs until the condition is False, so make sure something changes.</li>
<li><code>def name(param):</code> defines a function; <code>return value</code> hands the answer back. Defaults like <code>name="friend"</code> make an argument optional.</li>
</ul>
`);

explain('y1',`
<h4>Why collections matter</h4>
<p>One variable holds one value. Real programs deal with many: every word in a document, every player in a game, every order in a shop. Making a separate variable for each would be impossible, so Python gives you <b>collections</b>: single values that hold many other values.</p>
<p>Python has four built in, and each answers a different need. A <b>list</b> keeps things in order. A <b>tuple</b> is a fixed group that never changes. A <b>dictionary</b> looks things up by name. A <b>set</b> keeps only unique items. Choosing the right one makes code shorter, clearer and faster.</p>
<p>You have already met two tools you will use here: f-strings from the first lesson, like <code>f"Hello, {name}!"</code>, and <code>for</code> loops with indented blocks from the second.</p>

<h4>Lists: ordered and changeable</h4>
<p>A <b>list</b> is written with square brackets and commas:</p>
<pre class="snip">fruit = ["apple", "kiwi", "plum", "fig"]
print(len(fruit))     # 4: len() counts the items
fruit.append("lime")  # add to the end
print(fruit[0])       # apple: the first item</pre>
<p>Each item has a numbered position called an <b>index</b>. The surprising part is that Python counts from <b>zero</b>. The first item is index 0, the second is index 1, and the last is one less than the length. Python also lets you count backwards from the end with negative numbers: <code>-1</code> is always the last item.</p>
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A list of four fruits with indexes 0 to 3 above and minus 4 to minus 1 below">
<g text-anchor="middle">
<text class="t-b t-ok" x="75" y="30">0</text><text class="t-b t-ok" x="165" y="30">1</text><text class="t-b t-ok" x="255" y="30">2</text><text class="t-b t-ok" x="345" y="30">3</text>
</g>
<rect class="bx" x="30" y="44" width="90" height="48" rx="4"/><rect class="bx" x="120" y="44" width="90" height="48" rx="4"/><rect class="bx" x="210" y="44" width="90" height="48" rx="4"/><rect class="bx" x="300" y="44" width="90" height="48" rx="4"/>
<g text-anchor="middle">
<text class="t-m" x="75" y="74">"apple"</text><text class="t-m" x="165" y="74">"kiwi"</text><text class="t-m" x="255" y="74">"plum"</text><text class="t-m" x="345" y="74">"fig"</text>
<text class="t-b t-a" x="75" y="118">-4</text><text class="t-b t-a" x="165" y="118">-3</text><text class="t-b t-a" x="255" y="118">-2</text><text class="t-b t-a" x="345" y="118">-1</text>
<text class="t-s" x="210" y="156">fruit[1] is "kiwi"; fruit[-1] is "fig"</text>
</g>
</svg><figcaption>Each item in a list has two addresses. Counting from the front starts at zero, so kiwi is at index 1. Counting from the back starts at minus one, so the last item, fig, is always at minus one.</figcaption></figure>
<p>You can also take a <b>slice</b>, a smaller list, with a colon: <code>fruit[1:3]</code> gives <code>["kiwi", "plum"]</code>. The slice includes the start index and stops <i>before</i> the end index, just like <code>range</code>.</p>
<div class="mistake"><b>Common mistake</b>Asking for <code>fruit[4]</code> in a four-item list. The positions are 0 to 3, so Python stops with <code>IndexError: list index out of range</code>. If you see it, print <code>len()</code> of your list and remember that the last index is the length minus one.</div>
<p>A <b>tuple</b> looks like a list with round brackets, such as <code>(51.5, -0.12)</code> for a latitude and longitude. Once made, it cannot be changed. Use it for small groups that belong together and should stay fixed.</p>

<h4>Dictionaries: look things up by name</h4>
<p>Lists are great when position matters. But often you want to find something by a <b>name</b>, not a number. "What is Ada's score?" is a lookup, not a position. That is what a <b>dictionary</b>, or <b>dict</b>, is for.</p>
<p>A dict is a collection of <b>key: value</b> pairs in curly braces. The <b>key</b> is what you look up by, and the <b>value</b> is what you get back:</p>
<pre class="snip">player = {"name": "Ada", "score": 92}
print(player["name"])    # Ada: look up by key
player["score"] = 95     # change a value
player["level"] = 3      # a new key adds a new pair
print("level" in player) # True: is this key present?</pre>
<figure class="fig"><svg viewBox="0 0 420 236" role="img" aria-label="Dictionary keys pointing at values, with a missing key causing KeyError unless get is used">
<g text-anchor="middle"><text class="t-s" x="80" y="20">key</text><text class="t-s" x="270" y="20">value</text></g>
<rect class="bx-info" x="20" y="30" width="120" height="34" rx="6"/><text class="t-m" x="80" y="52" text-anchor="middle">"the"</text>
<path class="ln" d="M140 47h82"/><polygon class="ah" points="222,41 222,53 230,47"/>
<rect class="bx" x="232" y="30" width="76" height="34" rx="6"/><text class="t-m" x="270" y="52" text-anchor="middle">2</text>
<rect class="bx-info" x="20" y="74" width="120" height="34" rx="6"/><text class="t-m" x="80" y="96" text-anchor="middle">"cat"</text>
<path class="ln" d="M140 91h82"/><polygon class="ah" points="222,85 222,97 230,91"/>
<rect class="bx" x="232" y="74" width="76" height="34" rx="6"/><text class="t-m" x="270" y="96" text-anchor="middle">1</text>
<rect class="bx-info" x="20" y="118" width="120" height="34" rx="6"/><text class="t-m" x="80" y="140" text-anchor="middle">"and"</text>
<path class="ln" d="M140 135h82"/><polygon class="ah" points="222,129 222,141 230,135"/>
<rect class="bx" x="232" y="118" width="76" height="34" rx="6"/><text class="t-m" x="270" y="140" text-anchor="middle">1</text>
<line class="ln-d" x1="20" y1="166" x2="400" y2="166"/>
<rect class="bx-warn" x="20" y="190" width="120" height="34" rx="6"/><text class="t-m" x="80" y="212" text-anchor="middle">"dog"</text>
<text class="t-m" x="160" y="200">d["dog"]</text><text class="t-b t-bad" x="250" y="200">KeyError</text>
<text class="t-m" x="160" y="228">d.get("dog", 0)</text><text class="t-b t-ok" x="320" y="228">0</text>
</svg><figcaption>A dictionary maps each key to one value, like words to their counts. Looking up a key that is not there with square brackets crashes with KeyError, while the get method returns the default you give it, here zero.</figcaption></figure>
<p>Keys must be unique: one key, one value. Assigning to an existing key replaces its value. Looking up a missing key with square brackets raises <code>KeyError</code>. The <b>get</b> method is the safe alternative: <code>d.get(key, 0)</code> returns the value if the key exists, and your default (here 0) if not. Without a default, <code>get</code> returns <code>None</code>.</p>
<p>To loop over a dict, use <code>.items()</code>, which gives you each key and value together. Writing two names after <code>for</code> unpacks each pair into them:</p>
<pre class="snip">for word, count in counts.items():
    print(f"{word}: {count}")</pre>

<h4>The counting idiom, step by step</h4>
<p>Counting things is one of the most common jobs in programming, and dicts make it easy. The task asks you to count each word in <code>"the cat and the hat"</code>. First, split the text into words. Two string <b>methods</b> (functions that belong to a value, called with a dot) help: <code>.lower()</code> makes all letters lower case, so "The" and "the" count as the same word, and <code>.split()</code> breaks the text at spaces into a list.</p>
<pre class="snip">words = "the cat and the hat".lower().split()
# ["the", "cat", "and", "the", "hat"]
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1</pre>
<p>The key line reads the current count (0 if the word is new), adds 1, and stores it back. Trace it:</p>
<div class="tbl-wrap"><table><tr><th>word</th><th>counts.get(word, 0)</th><th>counts afterwards</th></tr>
<tr><td>the</td><td>0</td><td>the: 1</td></tr>
<tr><td>cat</td><td>0</td><td>the: 1, cat: 1</td></tr>
<tr><td>and</td><td>0</td><td>the: 1, cat: 1, and: 1</td></tr>
<tr><td>the</td><td>1</td><td>the: 2, cat: 1, and: 1</td></tr>
<tr><td>hat</td><td>0</td><td>the: 2, cat: 1, and: 1, hat: 1</td></tr></table></div>
<p>Remember that a function must <code>return counts</code> at the end, after the loop, for the task to see the result.</p>

<h4>Sets: unique items and fast "is it in there?"</h4>
<p>A <b>set</b> is written with curly braces but no colons: <code>{"a", "b"}</code>. It has no order and no duplicates; adding something already there does nothing. <code>set(["a", "b", "a"])</code> gives <code>{"a", "b"}</code>.</p>
<p>Sets shine at one question: <i>is this item in here?</i> To answer <code>x in some_list</code>, Python checks the items one by one, so a list of a million emails can take a million checks. A set stores items in a way that lets Python jump straight to where an item would be, so the check takes about the same tiny time whether the set holds ten items or ten million. Programmers write this as <b>O(1)</b> ("constant time") for sets and <b>O(n)</b> ("grows with the number of items") for lists.</p>

<h4>Comprehensions: build a list in one line</h4>
<p>A very common loop builds a new list from an old one: go through each item, maybe skip some, maybe transform the rest. You could write it the long way:</p>
<pre class="snip">even_squares = []
for n in nums:
    if n % 2 == 0:
        even_squares.append(n * n)</pre>
<p>A <b>list comprehension</b> says the same thing in one readable line. Read it as "n times n, for each n in nums, if n is even":</p>
<pre class="snip">even_squares = [n * n for n in nums if n % 2 == 0]</pre>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A comprehension filters 1 to 6 down to the even numbers and squares them">
<text class="t-s" x="20" y="38">nums</text>
<text class="t-s" x="20" y="98">if even</text>
<text class="t-s" x="20" y="158">n * n</text>
<g text-anchor="middle">
<rect class="bx" x="130" y="18" width="36" height="32" rx="4"/><text class="t-m" x="148" y="40">1</text>
<rect class="bx" x="176" y="18" width="36" height="32" rx="4"/><text class="t-m" x="194" y="40">2</text>
<rect class="bx" x="222" y="18" width="36" height="32" rx="4"/><text class="t-m" x="240" y="40">3</text>
<rect class="bx" x="268" y="18" width="36" height="32" rx="4"/><text class="t-m" x="286" y="40">4</text>
<rect class="bx" x="314" y="18" width="36" height="32" rx="4"/><text class="t-m" x="332" y="40">5</text>
<rect class="bx" x="360" y="18" width="36" height="32" rx="4"/><text class="t-m" x="378" y="40">6</text>
<text class="t-s" x="148" y="98">skip</text><text class="t-s" x="240" y="98">skip</text><text class="t-s" x="332" y="98">skip</text>
<path class="ln-a" d="M194 50v20"/><polygon class="ah-a" points="188,68 200,68 194,76"/>
<path class="ln-a" d="M286 50v20"/><polygon class="ah-a" points="280,68 292,68 286,76"/>
<path class="ln-a" d="M378 50v20"/><polygon class="ah-a" points="372,68 384,68 378,76"/>
<rect class="bx-a" x="176" y="78" width="36" height="32" rx="4"/><text class="t-m" x="194" y="100">2</text>
<rect class="bx-a" x="268" y="78" width="36" height="32" rx="4"/><text class="t-m" x="286" y="100">4</text>
<rect class="bx-a" x="360" y="78" width="36" height="32" rx="4"/><text class="t-m" x="378" y="100">6</text>
<path class="ln-ok" d="M194 110v20"/><polygon class="ah-ok" points="188,128 200,128 194,136"/>
<path class="ln-ok" d="M286 110v20"/><polygon class="ah-ok" points="280,128 292,128 286,136"/>
<path class="ln-ok" d="M378 110v20"/><polygon class="ah-ok" points="372,128 384,128 378,136"/>
<rect class="bx-ok" x="176" y="138" width="36" height="32" rx="4"/><text class="t-m" x="194" y="160">4</text>
<rect class="bx-ok" x="264" y="138" width="44" height="32" rx="4"/><text class="t-m" x="286" y="160">16</text>
<rect class="bx-ok" x="356" y="138" width="44" height="32" rx="4"/><text class="t-m" x="378" y="160">36</text>
<text class="t-s" x="210" y="194">result: [4, 16, 36]</text>
</g>
</svg><figcaption>The comprehension walks through 1 to 6. The if part skips the odd numbers, and the n times n part squares each number that survives, giving 4, 16 and 36.</figcaption></figure>
<p>The three parts always sit in the same places: <b>what to keep</b> first, then the <b>for</b> part, then an optional <b>if</b> filter. Comprehensions are for building one list. If your loop does several jobs, prints things or needs many lines, a normal loop is clearer.</p>

<h4>Finding the best item: <code>max</code> with a <code>key</code></h4>
<p><code>max([3, 9, 4])</code> gives 9. But what is the "biggest" of a list of dicts like <code>{"name": "Ada", "score": 92}</code>? Python can't guess, so you tell it what to compare with the <code>key</code> argument. You pass it a small function that takes one item and returns the thing to compare.</p>
<p>A <b>lambda</b> is a tiny, unnamed, one-line function. <code>lambda p: p["score"]</code> means "given a player p, return p's score". It is the same as writing <code>def get_score(p): return p["score"]</code> and passing <code>get_score</code>.</p>
<pre class="snip">best = max(players, key=lambda p: p["score"])
# best is the whole dict: {"name": "Grace", "score": 95}
print(best["name"])   # Grace</pre>
<p>Notice that <code>max</code> gives back the <b>whole item</b>, not just the score. To return the name, look up <code>["name"]</code> on the result. <code>min</code> and <code>sorted</code> accept the same <code>key</code> argument.</p>
<div class="mistake"><b>Common mistake</b>Mixing up the brackets. Square brackets <code>[]</code> make a list or look something up. Curly braces with colons <code>{"a": 1}</code> make a dict. Curly braces without colons make a set, except that empty <code>{}</code> is an empty dict; an empty set is written <code>set()</code>.</div>

<div class="try"><b>Try it in your head</b>Given <code>nums = [1, 2, 3, 4, 5, 6]</code>, what is <code>[n + 1 for n in nums if n &gt; 4]</code>? Only 5 and 6 pass the filter, and adding 1 gives <code>[6, 7]</code>. And what is <code>nums[-2]</code>? Counting from the end, -1 is 6, so -2 is <code>5</code>.</div>

<h4>Recap</h4>
<ul>
<li>Lists <code>[ ]</code> keep order and count from index 0; <code>-1</code> is the last item. Tuples <code>( )</code> are fixed groups.</li>
<li>Dicts <code>{key: value}</code> look things up by key. <code>d.get(key, 0)</code> avoids KeyError, and <code>for k, v in d.items()</code> loops over pairs.</li>
<li><code>counts[word] = counts.get(word, 0) + 1</code> is the standard way to count.</li>
<li>Sets hold unique items and answer "is it in here?" almost instantly.</li>
<li><code>[expr for x in xs if cond]</code> builds a filtered, transformed list in one line.</li>
<li><code>max(items, key=lambda x: x["score"])</code> finds the item with the highest score, and returns the whole item.</li>
</ul>
`);

explain('y2',`
<h4>The problem: one computer, many projects</h4>
<p>Python on its own can do a lot, but most real projects also use <b>packages</b>: code other people wrote and shared so you don't have to. The <code>requests</code> package, which this lesson's weather script needs, makes calling websites easy. There are hundreds of thousands of packages on <b>PyPI</b>, the Python Package Index, the public library that Python's installer downloads from.</p>
<p>The installer is called <b>pip</b> ("pip installs packages"). The trouble starts when several projects share one computer:</p>
<ul>
<li>Your new project wants <code>requests</code> version 2.32. An old project you still maintain was written for version 2.25 and breaks on anything newer. Only one version can be installed in a given place at a time.</li>
<li>Your operating system itself runs tools written in Python. On Linux, upgrading a package that those tools depend on can break parts of the system.</li>
<li>A teammate clones your project and it doesn't run, because you installed something months ago and forgot to tell anyone.</li>
</ul>
<p>The answer to all three is the same: give every project its <b>own private set of packages</b>. That private set is a <b>virtual environment</b>, usually shortened to <b>venv</b>.</p>
<div class="analogy"><b>Think of it like</b>Each project gets its own toolbox. You can put a different spanner in each box without the boxes ever fighting, and the toolbox bolted to the wall of the house (the system Python) stays untouched.</div>

<h4>What a virtual environment is</h4>
<p>A venv is not a virtual machine and nothing is being emulated. It is simply a <b>folder</b> inside your project that contains a link to a Python interpreter, its own copy of pip, and its own empty <code>site-packages</code> folder where installed packages go.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="The system Python is left alone while two projects each have their own venv with different package versions">
<rect class="bx-warn" x="90" y="12" width="240" height="56" rx="8"/>
<text class="t-b" x="210" y="36" text-anchor="middle">System Python</text>
<text class="t-s" x="210" y="56" text-anchor="middle">used by the OS: do not touch</text>
<path class="ln-d" d="M150 68v42"/><path class="ln-d" d="M270 68v42"/>
<text class="t-s" x="210" y="96" text-anchor="middle">same interpreter</text>
<rect class="bx-ok" x="20" y="112" width="180" height="120" rx="8"/>
<text class="t-b" x="110" y="138" text-anchor="middle">weather/.venv</text>
<rect class="bx" x="36" y="152" width="148" height="30" rx="4"/><text class="t-m" x="110" y="172" text-anchor="middle">requests 2.32</text>
<rect class="bx" x="36" y="190" width="148" height="30" rx="4"/><text class="t-m" x="110" y="210" text-anchor="middle">certifi ...</text>
<rect class="bx-info" x="220" y="112" width="180" height="120" rx="8"/>
<text class="t-b" x="310" y="138" text-anchor="middle">oldapp/.venv</text>
<rect class="bx" x="236" y="152" width="148" height="30" rx="4"/><text class="t-m" x="310" y="172" text-anchor="middle">requests 2.25</text>
<rect class="bx" x="236" y="190" width="148" height="30" rx="4"/><text class="t-m" x="310" y="210" text-anchor="middle">flask 2.0</text>
</svg><figcaption>Both projects run on the same Python interpreter, but each has its own folder of packages. The weather project can use requests 2.32 while the old app keeps 2.25, and the system's own Python packages are never changed.</figcaption></figure>
<p>Before creating one, check which Python you have. On Linux and macOS the command is <code>python3</code>, because on many systems plain <code>python</code> either doesn't exist or means an ancient version 2. Running <code>python3 --version</code> prints something like <code>Python 3.12.4</code>.</p>

<h4>The guard rail: "externally-managed-environment"</h4>
<p>The lesson asks you to try <code>pip install requests</code> before making a venv, so you meet this error on purpose:</p>
<pre class="snip">error: externally-managed-environment
× This environment is externally managed
╰─&gt; To install Python packages system-wide, try apt install python3-xyz.
    If you wish to install a non-Debian-packaged Python package,
    create a virtual environment using python3 -m venv path/to/venv.</pre>
<p>It looks scary, but it is helpful. Since about 2023, Debian, Ubuntu, Fedora and others mark their system Python as "managed by the operating system". pip sees that mark and refuses to install into it, because doing so could break system tools. The message even tells you the fix: create a virtual environment.</p>
<div class="mistake"><b>Common mistake</b>Forcing past the error with <code>sudo pip install</code> or the <code>--break-system-packages</code> flag. The flag is named that way as a warning. Both put packages into the system Python, which is exactly what the guard rail is protecting. Make a venv instead; it takes two seconds.</div>

<h4>Creating and activating a venv</h4>
<pre class="snip">python3 -m venv .venv        # create the environment in a folder called .venv
source .venv/bin/activate    # switch this terminal into it (Linux and macOS)
.venv\\Scripts\\activate       # the same on Windows</pre>
<p>Breaking down the first line: <code>-m venv</code> means "run Python's built-in <b>venv module</b>", a tool that ships with Python. <code>.venv</code> is the name of the folder to create. The leading dot hides the folder in normal listings, and <code>.venv</code> is the name most editors look for automatically. You create it <b>once per project</b>, inside the project folder.</p>
<p>The second line <b>activates</b> it. Activation only affects the terminal you run it in, and it does two things. It usually adds <code>(.venv)</code> to the start of your prompt, so you can see you are inside. More importantly, it changes your <b>PATH</b>.</p>
<p><b>PATH</b> is a list of folders your shell searches, in order, whenever you type a command name. Activation puts <code>.venv/bin</code> at the front of that list, so <code>python</code> and <code>pip</code> now find the venv's copies first:</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="After activation the shell finds pip in .venv/bin before /usr/bin">
<rect class="bx-dark" x="20" y="14" width="150" height="38" rx="6"/><text class="t-term" x="95" y="38" text-anchor="middle">$ pip install</text>
<path class="ln" d="M170 33h40"/><polygon class="ah" points="208,27 208,39 216,33"/>
<text class="t-s" x="222" y="38">shell searches PATH:</text>
<text class="t-s" x="30" y="86">1st</text>
<rect class="bx-ok" x="70" y="66" width="200" height="34" rx="6"/><text class="t-m" x="170" y="88" text-anchor="middle">.venv/bin</text>
<text class="t-b t-ok" x="290" y="88">found pip</text>
<text class="t-s" x="30" y="132">2nd</text>
<rect class="bx" x="70" y="112" width="200" height="34" rx="6"/><text class="t-m" x="170" y="134" text-anchor="middle">/usr/local/bin</text>
<text class="t-s" x="290" y="134">not checked</text>
<text class="t-s" x="30" y="178">3rd</text>
<rect class="bx" x="70" y="158" width="200" height="34" rx="6"/><text class="t-m" x="170" y="180" text-anchor="middle">/usr/bin</text>
<text class="t-s" x="290" y="180">not checked</text>
</svg><figcaption>When you type a command, the shell checks each folder on the PATH in order and runs the first match. Activating the venv puts its bin folder first, so pip and python now mean the venv's own copies, and the system copies further down are never reached.</figcaption></figure>
<div class="tip"><b>Tip</b>Activation is a convenience, not magic. Running <code>.venv/bin/python weather.py</code> uses the venv directly without activating, which is handy in scripts and scheduled jobs.</div>

<h4>Installing and running inside the venv</h4>
<p>With the venv active, the same command that failed now works:</p>
<pre class="snip">pip install requests
# Collecting requests ... Successfully installed certifi charset-normalizer idna requests urllib3
python3 weather.py
# Lagos: 31°C, ...</pre>
<p>pip downloaded <code>requests</code> from PyPI, plus the packages <i>it</i> depends on, called <b>dependencies</b>, and put them all in <code>.venv/lib/python3.12/site-packages</code>. Nothing outside your project changed.</p>
<p>If you forget to activate, or open a new terminal and forget again, running the script fails with <code>ModuleNotFoundError: No module named 'requests'</code>. That error almost always means "this Python can't see the package", either because you are outside the venv or because you never installed it. Check for <code>(.venv)</code> in the prompt, or run <code>pip list</code> to see what this environment has.</p>

<h4>Recording what you installed: <code>requirements.txt</code></h4>
<p>Your venv now works on your machine. But the <code>.venv</code> folder is large, full of files specific to your computer, and should never be shared. What you share instead is a short list of what to install. <code>pip freeze</code> prints every installed package with its exact version:</p>
<pre class="snip">pip freeze &gt; requirements.txt   # save the list to a file
cat requirements.txt
# requests==2.32.3
# urllib3==...  (plus the other dependencies)</pre>
<p>The <code>&gt;</code> is a shell feature called <b>redirection</b>: instead of printing the output on screen, the shell writes it into the named file, replacing anything already there. The <code>==</code> in each line <b>pins</b> an exact version, so everyone gets the same code you tested with.</p>
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="pip freeze writes requirements.txt, which travels with the code, and pip install -r recreates the packages">
<rect class="bx-ok" x="10" y="20" width="100" height="70" rx="8"/><text class="t-b" x="60" y="48" text-anchor="middle">your venv</text><text class="t-s" x="60" y="72" text-anchor="middle">packages</text>
<path class="ln-a" d="M110 55h14"/><polygon class="ah-a" points="122,49 122,61 130,55"/>
<rect class="bx-a" x="132" y="20" width="156" height="70" rx="8"/><text class="t" x="210" y="50" text-anchor="middle">requirements.txt</text><text class="t-s" x="210" y="72" text-anchor="middle">exact versions</text>
<path class="ln-ok" d="M288 55h14"/><polygon class="ah-ok" points="300,49 300,61 308,55"/>
<rect class="bx-info" x="310" y="20" width="100" height="70" rx="8"/><text class="t-b" x="360" y="48" text-anchor="middle">new venv</text><text class="t-s" x="360" y="72" text-anchor="middle">rebuilt</text>
<text class="t-m" x="60" y="122" text-anchor="middle">pip freeze</text>
<text class="t-s" x="210" y="122" text-anchor="middle">goes into git</text>
<text class="t-m" x="360" y="122" text-anchor="middle">pip install</text><text class="t-m" x="360" y="144" text-anchor="middle">-r ...</text>
</svg><figcaption>pip freeze writes the exact list of packages into requirements.txt. That small text file is committed with your code, and on another machine pip install with the -r option reads it and rebuilds an identical environment.</figcaption></figure>
<p>Anyone, including you on a new laptop or a server, rebuilds the environment like this:</p>
<pre class="snip">python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt   # -r means "read the list from this file"</pre>
<p>When you are done working, <code>deactivate</code> puts your PATH back and leaves the venv. Next time, just activate again; you don't recreate it.</p>
<div class="mistake"><b>Common mistake</b>Committing the <code>.venv</code> folder to git. It contains thousands of files and paths that only work on your machine. Add a line <code>.venv/</code> to your <code>.gitignore</code> file so git ignores it, and commit <code>requirements.txt</code> instead.</div>

<h4>Newer tools do the same thing</h4>
<p>You will see tools like <b>uv</b> and <b>Poetry</b> in modern projects. uv in particular is very fast and increasingly popular. They create the environment, install packages and write a <b>lock file</b> of exact versions for you, often from a <code>pyproject.toml</code> file. The ideas are identical to what you just did by hand: one isolated environment per project, plus a record of exact versions.</p>

<div class="try"><b>Try it in your head</b>You open a fresh terminal, <code>cd</code> into the weather project and run <code>python3 weather.py</code>. You get <code>ModuleNotFoundError: No module named 'requests'</code>, but you installed it yesterday. Why? The new terminal is not activated, so <code>python3</code> is the system one, which can't see the venv's packages. Run <code>source .venv/bin/activate</code> and try again.</div>

<h4>Recap</h4>
<ul>
<li>A virtual environment is a folder of packages private to one project, so projects never clash and the system Python stays safe.</li>
<li><code>python3 -m venv .venv</code> creates it once; <code>source .venv/bin/activate</code> (or <code>.venv\\Scripts\\activate</code> on Windows) switches the terminal into it by putting it first on the PATH.</li>
<li>"externally-managed-environment" is a guard rail telling you to use a venv. Don't force past it.</li>
<li><code>pip freeze &gt; requirements.txt</code> records exact versions; <code>pip install -r requirements.txt</code> recreates them.</li>
<li><code>deactivate</code> leaves the venv. Put <code>.venv/</code> in <code>.gitignore</code>.</li>
</ul>
`);

explain('y3',`
<h4>Why programs read, write and call out</h4>
<p>Everything you have written so far forgets its data the moment it finishes. Variables live in the computer's memory, and memory is wiped when the program ends. Real programs need to <b>keep</b> data, by saving it to files, and to <b>exchange</b> data with other programs, often over the internet.</p>
<p>That gives a pattern you will see in almost all automation and backend work: <b>read</b> data from somewhere, <b>transform</b> it with the lists and dicts you already know, then <b>write</b> it somewhere or <b>send</b> it to another service. This lesson covers each step: text files, CSV spreadsheets, JSON, and web APIs.</p>
<p>The lesson has a small virtual disk, shown below the output, holding <code>contacts.csv</code>. Files your code writes appear there too.</p>

<h4>Opening files safely with <code>with</code></h4>
<p>To use a file, you <b>open</b> it, which gives you a file object to read from or write to, and later you <b>close</b> it. Closing matters: it makes sure everything you wrote is actually saved to disk, and it releases the file for other programs.</p>
<pre class="snip">with open("notes.txt", "w") as f:   # "w" = write: create or replace
    f.write("first line\\n")          # \\n starts a new line
# the file is closed here automatically

with open("notes.txt") as f:        # no mode means "r" = read
    text = f.read()</pre>
<p>The <code>with</code> statement opens the file, points the name <code>f</code> at it, runs the indented block, and then <b>always closes the file</b> when the block ends, even if an error happens halfway through. You never have to remember to call close. Tools like this that guarantee clean-up are called <b>context managers</b>.</p>
<div class="tbl-wrap"><table><tr><th>Mode</th><th>Meaning</th><th>If the file exists</th></tr>
<tr><td><code>"r"</code></td><td>read (the default)</td><td>reads it; crashes if missing</td></tr>
<tr><td><code>"w"</code></td><td>write</td><td><b>empties it first</b>, then writes</td></tr>
<tr><td><code>"a"</code></td><td>append</td><td>adds to the end</td></tr></table></div>
<p>A path like <code>"contacts.csv"</code> is <b>relative</b>: Python looks for it in the folder the program is running in. A missing file gives <code>FileNotFoundError: [Errno 2] No such file or directory</code>, which usually means a typo or the wrong folder.</p>

<h4>CSV: spreadsheets as plain text</h4>
<p><b>CSV</b> means comma-separated values. It is the simplest spreadsheet format: each line is a row, commas separate the columns, and the first line is usually a <b>header</b> naming the columns. Every spreadsheet program can save and open it. Here is the lesson's file:</p>
<pre class="snip">name,email,city
Ada Lovelace,ada@example.com,London
Grace Hopper,grace@example.com,New York
Alan Turing,alan@example.com,Wilmslow</pre>
<p>You could split each line on commas yourself, but real CSV has traps, like a value that itself contains a comma inside quotes. Python's built-in <code>csv</code> module handles all of that. Its <code>DictReader</code> reads the header and turns every other row into a dict, using the header words as keys:</p>
<figure class="fig"><svg viewBox="0 0 420 236" role="img" aria-label="csv.DictReader uses the header line as keys and turns each row into a dictionary">
<rect class="bx-dark" x="10" y="14" width="400" height="62" rx="6"/>
<text class="t-term" x="22" y="38">name,email,city</text>
<text class="t-term" x="22" y="62">Ada Lovelace,ada@...,London</text>
<text class="t-s t-a" x="300" y="38">header: keys</text>
<path class="ln-a" d="M210 76v30"/><polygon class="ah-a" points="204,104 216,104 210,112"/>
<text class="t-m t-a" x="222" y="98">csv.DictReader</text>
<rect class="bx-ok" x="10" y="116" width="400" height="106" rx="8"/>
<text class="t-m" x="24" y="142">{</text>
<text class="t-m" x="40" y="164"><tspan class="t-a">"name"</tspan>: "Ada Lovelace",</text>
<text class="t-m" x="40" y="186"><tspan class="t-a">"email"</tspan>: "ada@example.com",</text>
<text class="t-m" x="40" y="208"><tspan class="t-a">"city"</tspan>: "London" }</text>
</svg><figcaption>The header line, name, email and city, becomes the keys. Each following line becomes one dictionary, so the first data row turns into a dict whose name is Ada Lovelace, whose email is ada at example dot com and whose city is London.</figcaption></figure>
<pre class="snip">import csv                               # load the csv module

with open("contacts.csv", newline="") as f:
    contacts = list(csv.DictReader(f))   # a list of 3 dicts
print(contacts[1]["email"])              # grace@example.com</pre>
<p>Three details. <code>import csv</code> at the top makes the module available. <code>newline=""</code> is what Python's documentation recommends for CSV files: it lets the csv module handle line endings itself. And <code>list(...)</code> collects all the rows <i>inside</i> the <code>with</code> block, because DictReader reads lazily, one row at a time, and can't read anything once the file is closed.</p>
<div class="mistake"><b>Common mistake</b>Forgetting that every CSV value is a <b>string</b>. A column of ages gives you <code>"36"</code>, not <code>36</code>. Convert with <code>int()</code> or <code>float()</code> before doing maths, just like keyboard input in the first lesson.</div>

<h4>JSON: the language programs share</h4>
<p><b>JSON</b> (JavaScript Object Notation) is a text format for structured data. Almost every web API speaks it, and it maps neatly onto Python's own types:</p>
<div class="tbl-wrap"><table><tr><th>JSON</th><th>Python</th></tr>
<tr><td>object <code>{"a": 1}</code></td><td>dict</td></tr>
<tr><td>array <code>[1, 2]</code></td><td>list</td></tr>
<tr><td>string <code>"hi"</code> (double quotes only)</td><td>str</td></tr>
<tr><td>number <code>3</code>, <code>2.5</code></td><td>int, float</td></tr>
<tr><td><code>true</code>, <code>false</code>, <code>null</code></td><td><code>True</code>, <code>False</code>, <code>None</code></td></tr></table></div>
<p>Turning Python data into JSON text is called <b>serialising</b>, and turning text back into Python data is <b>parsing</b> or deserialising. The <code>json</code> module does both:</p>
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="json.dump turns a Python list of dicts into JSON text, json.load turns it back">
<rect class="bx-info" x="10" y="30" width="150" height="110" rx="8"/>
<text class="t-b" x="85" y="58" text-anchor="middle">Python</text>
<text class="t-s" x="85" y="84" text-anchor="middle">list of dicts</text>
<text class="t-s" x="85" y="106" text-anchor="middle">in memory</text>
<rect class="bx-warn" x="260" y="30" width="150" height="110" rx="8"/>
<text class="t-b" x="335" y="58" text-anchor="middle">JSON text</text>
<text class="t-s" x="335" y="84" text-anchor="middle">contacts.json</text>
<text class="t-s" x="335" y="106" text-anchor="middle">on disk or network</text>
<path class="ln-a" d="M160 64h92"/><polygon class="ah-a" points="250,58 250,70 258,64"/>
<text class="t-m t-a" x="210" y="52" text-anchor="middle">dump</text>
<path class="ln-ok" d="M260 110h-92"/><polygon class="ah-ok" points="170,104 170,116 162,110"/>
<text class="t-m t-ok" x="210" y="132" text-anchor="middle">load</text>
<text class="t-s" x="210" y="170" text-anchor="middle">dumps and loads do the same with strings</text>
</svg><figcaption>json dump writes Python data out as JSON text, and json load reads JSON text back into Python dicts and lists. The versions ending in s, dumps and loads, work with a string instead of a file.</figcaption></figure>
<pre class="snip">import json

with open("contacts.json", "w") as f:
    json.dump(contacts, f, indent=2)   # indent=2 makes it readable

with open("contacts.json") as f:
    again = json.load(f)               # back to a list of dicts</pre>
<p>Without <code>indent</code>, the whole file is one long line. With <code>indent=2</code>, each level is indented two spaces, which is much easier for humans to read.</p>

<h4>Calling a web API</h4>
<p>An <b>API</b> (application programming interface) is a way for one program to ask another for something. A <b>web API</b> does it over HTTP, the same protocol your browser uses. Your program is the <b>client</b>: it sends a <b>request</b> to a <b>URL</b>. The other program is the <b>server</b>: it sends back a <b>response</b> made of a <b>status code</b> (a number saying how it went) and a <b>body</b>, usually JSON.</p>
<div class="tbl-wrap"><table><tr><th>Status</th><th>Means</th></tr>
<tr><td>200</td><td>OK, here is your data</td></tr>
<tr><td>404</td><td>Not found: that thing doesn't exist</td></tr>
<tr><td>400 to 499</td><td>Client error: something is wrong with your request</td></tr>
<tr><td>500 to 599</td><td>Server error: the server itself failed</td></tr></table></div>
<p>The <code>requests</code> package, which you installed in the virtual environments lesson, makes this short. <code>requests.get</code> sends a GET request, the kind that asks to read data:</p>
<pre class="snip">resp = requests.get("https://api.example.com/users/1", timeout=5)
print(resp.status_code)   # 200
user = resp.json()        # parse the JSON body into a dict
print(user["name"])       # Ada Lovelace</pre>
<p>To ask for different users, build the URL with an f-string: <code>f"https://api.example.com/users/{user_id}"</code>. For values after a question mark in a URL, called <b>query parameters</b>, pass a dict: <code>params={"city": "Lagos"}</code> becomes <code>?city=Lagos</code>.</p>
<figure class="fig"><svg viewBox="0 0 420 270" role="img" aria-label="Three requests: users 1 returns 200, users 99 returns 404, slow never answers and times out">
<rect class="bx" x="10" y="10" width="120" height="34" rx="6"/><text class="t-b" x="70" y="32" text-anchor="middle">your script</text>
<rect class="bx" x="290" y="10" width="120" height="34" rx="6"/><text class="t-b" x="350" y="32" text-anchor="middle">API server</text>
<path class="ln-d" d="M70 44v216"/><path class="ln-d" d="M350 44v216"/>
<path class="ln" d="M70 70h272"/><polygon class="ah" points="340,64 340,76 348,70"/><text class="t-m" x="210" y="64" text-anchor="middle">GET /users/1</text>
<path class="ln-ok" d="M350 100h-272"/><polygon class="ah-ok" points="80,94 80,106 72,100"/><text class="t-s t-ok" x="210" y="94" text-anchor="middle">200 with user JSON</text>
<path class="ln" d="M70 140h272"/><polygon class="ah" points="340,134 340,146 348,140"/><text class="t-m" x="210" y="134" text-anchor="middle">GET /users/99</text>
<path class="ln-a" d="M350 170h-272"/><polygon class="ah-a" points="80,164 80,176 72,170"/><text class="t-s t-a" x="210" y="164" text-anchor="middle">404 not found</text>
<path class="ln" d="M70 210h272"/><polygon class="ah" points="340,204 340,216 348,210"/><text class="t-m" x="210" y="204" text-anchor="middle">GET /slow</text>
<text class="t-s" x="340" y="240" text-anchor="end">no reply</text>
<rect class="bx-bad" x="12" y="228" width="116" height="30" rx="6"/><text class="t-s" x="70" y="248" text-anchor="middle">Timeout raised</text>
</svg><figcaption>Each request travels from your script to the server, and a response comes back. User 1 exists, so the answer is 200 with JSON. User 99 does not, so the answer is 404. The slow endpoint never answers, and only the timeout stops your script from waiting forever.</figcaption></figure>

<h4>When things go wrong: status codes, exceptions and timeouts</h4>
<p>Network calls fail in ways ordinary code doesn't. Handle three cases.</p>
<p><b>The server says no.</b> A 404 is a perfectly valid response, so <code>requests</code> does not crash on it. You check it yourself. For "fetch a user, or None if missing", test for 404 first:</p>
<pre class="snip">if resp.status_code == 404:
    return None              # missing is a normal answer here
resp.raise_for_status()      # any other 4xx or 5xx: stop loudly
return resp.json()</pre>
<p><code>raise_for_status()</code> does nothing for a successful response, and raises <code>requests.exceptions.HTTPError</code> for any 400 or 500 code. Raising an <b>exception</b> means stopping the normal flow of the program with an error, unless some code catches it. The order matters: if <code>raise_for_status()</code> ran first, the 404 would raise before you could return None.</p>
<p><b>The server never answers.</b> By default, <code>requests</code> has <b>no timeout</b> at all, so a stuck server can make your program wait forever. Always pass <code>timeout=</code> in seconds. When the time runs out, <code>requests</code> raises <code>requests.exceptions.Timeout</code>.</p>
<p><b>Catching it.</b> A <code>try</code> block runs code that might fail. If an exception of the named type is raised, Python jumps to the matching <code>except</code> block instead of crashing:</p>
<pre class="snip">try:
    resp = requests.get(url, timeout=2)
    resp.raise_for_status()
    return resp.json()
except requests.exceptions.Timeout:
    return {"error": "timeout"}     # a calm answer instead of a crash</pre>
<p>In this sandbox, <code>https://api.example.com/slow</code> always times out, so you can test exactly this path.</p>
<div class="mistake"><b>Common mistake</b>Writing a bare <code>except:</code> with no exception type. It catches everything, including your own typos, and hides real bugs behind a friendly message. Name the exception you expect, like <code>requests.exceptions.Timeout</code>.</div>

<div class="try"><b>Try it in your head</b>You open <code>contacts.json</code> with mode <code>"w"</code> but your code crashes before writing anything. What is in the file now? Nothing: <code>"w"</code> empties the file the moment it opens. And what Python value does the JSON <code>null</code> become after <code>json.load</code>? <code>None</code>.</div>

<h4>Recap</h4>
<ul>
<li><code>with open(path, mode) as f:</code> closes the file automatically. <code>"w"</code> replaces, <code>"a"</code> appends, <code>"r"</code> reads.</li>
<li><code>csv.DictReader(f)</code> turns each CSV row into a dict keyed by the header. Every value is a string.</li>
<li><code>json.dump(data, f, indent=2)</code> writes JSON; <code>json.load(f)</code> reads it back into dicts and lists.</li>
<li><code>requests.get(url, timeout=5)</code> calls an API. Check <code>resp.status_code</code>, use <code>resp.raise_for_status()</code> for unexpected errors and <code>resp.json()</code> for the body.</li>
<li>Always set a timeout, and catch <code>requests.exceptions.Timeout</code> with <code>try</code> and <code>except</code>.</li>
</ul>
`);

explain('y4',`
<h4>From calling APIs to building one</h4>
<p>In the files and APIs lesson you were the <b>client</b>: your script sent a request to <code>api.example.com</code> and got JSON back. Now you build the other side, the <b>server</b>. A web API is a program that sits waiting for HTTP requests, works out what each one is asking for, and sends back a response, usually JSON.</p>
<p>Doing that from scratch means reading raw network text, picking out the path, converting text to numbers, checking the input and writing correct HTTP replies. A <b>web framework</b> does that plumbing for you, so you only write the interesting part: what each address should do.</p>
<p><b>FastAPI</b> is one of the most popular Python web frameworks. Its big idea is that you describe your inputs with ordinary Python <b>type hints</b>, and FastAPI uses them to convert, validate and document everything automatically.</p>

<h4>A quick HTTP refresher, from the server's side</h4>
<p>Every request a server receives has a <b>method</b>, which says what kind of action it is, and a <b>path</b>, which says what it is about. The two you need here:</p>
<ul>
<li><b>GET</b> asks to read something, like <code>GET /items/1</code>, "show me item 1".</li>
<li><b>POST</b> asks to create something. It carries a <b>body</b>: the JSON data for the new thing.</li>
</ul>
<p>Requests can also carry <b>query parameters</b> after a question mark, like <code>/search?q=key</code>. Every response carries a status code. This lesson uses four:</p>
<div class="tbl-wrap"><table><tr><th>Code</th><th>Meaning</th><th>When you send it</th></tr>
<tr><td>200</td><td>OK</td><td>The default for a successful request.</td></tr>
<tr><td>201</td><td>Created</td><td>A POST successfully made something new.</td></tr>
<tr><td>404</td><td>Not Found</td><td>The thing asked for doesn't exist.</td></tr>
<tr><td>422</td><td>Unprocessable</td><td>The request arrived, but its data is invalid. FastAPI sends this for you.</td></tr></table></div>

<h4>Your first endpoint</h4>
<pre class="snip">from fastapi import FastAPI

app = FastAPI()                # the application object

@app.get("/")                  # GET requests for the path "/" ...
def home():                    # ... are handled by this function
    return {"message": "Hello from FastAPI"}</pre>
<p><code>app = FastAPI()</code> creates the application. The line <code>@app.get("/")</code> is a <b>decorator</b>, the same <code>@</code> syntax you saw in the pytest lesson. It registers the function below it: "when a GET request for <code>/</code> arrives, call <code>home</code>". A path plus a method plus its function is called a <b>route</b> or <b>endpoint</b>.</p>
<p>Whatever the function returns, FastAPI turns into JSON. A dict becomes a JSON object and a list becomes a JSON array, so you never call <code>json.dumps</code> yourself.</p>
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A request goes to FastAPI, which calls your function, and the returned dict comes back as JSON">
<rect class="bx" x="10" y="20" width="120" height="56" rx="8"/><text class="t-b" x="70" y="44" text-anchor="middle">client</text><text class="t-m" x="70" y="66" text-anchor="middle">GET /items/1</text>
<rect class="bx-a" x="150" y="20" width="120" height="56" rx="8"/><text class="t-b" x="210" y="44" text-anchor="middle">FastAPI</text><text class="t-s" x="210" y="64" text-anchor="middle">match, convert</text>
<rect class="bx-ok" x="290" y="20" width="120" height="56" rx="8"/><text class="t-b" x="350" y="44" text-anchor="middle">your function</text><text class="t-m" x="350" y="66" text-anchor="middle">get_item(1)</text>
<path class="ln" d="M130 40h12"/><polygon class="ah" points="140,34 140,46 148,40"/>
<path class="ln" d="M270 40h12"/><polygon class="ah" points="280,34 280,46 288,40"/>
<path class="ln-ok" d="M350 76v50h-132"/><polygon class="ah-ok" points="220,120 220,132 212,126"/>
<text class="t-s t-ok" x="290" y="146" text-anchor="middle">returns a dict</text>
<path class="ln-a" d="M210 76v50"/>
<path class="ln-a" d="M210 126h-132"/><polygon class="ah-a" points="80,120 80,132 72,126"/><path class="ln-a" d="M70 126v-42"/><polygon class="ah-a" points="64,86 76,86 70,78"/>
<text class="t-s t-a" x="140" y="146" text-anchor="middle">200 + JSON</text>
</svg><figcaption>The client sends GET slash items slash 1. FastAPI finds the matching route, converts the 1 from text to a number and calls your function. Your function returns a plain dict, and FastAPI sends it back to the client as JSON with status 200.</figcaption></figure>

<h4>Type hints: telling Python what a value should be</h4>
<p>A <b>type hint</b> is a note after a name, written with a colon, saying what type it should hold: <code>item_id: int</code> means "item_id should be an int". Plain Python mostly ignores hints; they are documentation for humans and editors. FastAPI is different: it reads your hints and <b>enforces</b> them on incoming data.</p>
<p>That matters because everything arriving over HTTP is text. The path <code>/items/1</code> contains the character "1", not the number 1. In this lesson's data, items are stored in a dict whose keys are numbers, <code>{1: {...}}</code>, so looking up the text <code>"1"</code> would find nothing. The hint makes FastAPI convert it for you.</p>

<h4>Path parameters: <code>/items/{item_id}</code></h4>
<p>Curly braces in a path mark a <b>path parameter</b>, a part of the URL that changes. FastAPI passes it to the function argument of the <b>same name</b>:</p>
<pre class="snip">@app.get("/items/{item_id}")
def get_item(item_id: int):        # "/items/1" calls get_item(1)
    if item_id not in items:       # is this key in the dict?
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]</pre>
<p>Three different requests take three different routes through this code:</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="items 1 returns 200, items 42 returns 404 from your code, items abc returns 422 from FastAPI">
<text class="t-s" x="10" y="20">request</text><text class="t-s" x="232" y="20">status</text><text class="t-s" x="318" y="20">decided by</text>
<text class="t-m" x="10" y="62">GET /items/1</text>
<path class="ln" d="M160 57h56"/><polygon class="ah" points="214,51 214,63 222,57"/>
<rect class="bx-ok" x="226" y="38" width="76" height="36" rx="6"/><text class="t-b t-ok" x="264" y="61" text-anchor="middle">200</text>
<text class="t-s" x="318" y="61">your return</text>
<text class="t-m" x="10" y="122">GET /items/42</text>
<path class="ln" d="M160 117h56"/><polygon class="ah" points="214,111 214,123 222,117"/>
<rect class="bx-warn" x="226" y="98" width="76" height="36" rx="6"/><text class="t-b t-warn" x="264" y="121" text-anchor="middle">404</text>
<text class="t-s" x="318" y="121">your raise</text>
<text class="t-m" x="10" y="182">GET /items/abc</text>
<path class="ln-a" d="M160 177h56"/><polygon class="ah-a" points="214,171 214,183 222,177"/>
<rect class="bx-bad" x="226" y="158" width="76" height="36" rx="6"/><text class="t-b t-bad" x="264" y="181" text-anchor="middle">422</text>
<text class="t-s" x="318" y="181">FastAPI</text>
<text class="t-s" x="10" y="218">For abc, your function never even runs.</text>
</svg><figcaption>Item 1 exists, so your function returns it with status 200. Item 42 is a valid number but missing, so your code raises a 404. The text abc cannot become an int, so FastAPI answers 422 on its own, before your function is called.</figcaption></figure>
<p>For the third request, FastAPI replies with a JSON body explaining exactly what was wrong: a list under <code>"detail"</code> saying the input in the path parameter <code>item_id</code> should be a valid integer. You wrote no code for that. This is FastAPI's main idea, and the answer to the lesson's last question.</p>

<h4>Sending errors with <code>HTTPException</code></h4>
<p>When something is missing, you don't return an error, you <b>raise</b> one: <code>raise HTTPException(status_code=404, detail="Item not found")</code>. FastAPI catches it and sends status 404 with the body <code>{"detail": "Item not found"}</code>. Raising also stops the function immediately, so the lookup below it never runs.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>return {"error": "Item not found"}</code> instead of raising. The client receives that message with status <b>200 OK</b>, so any program checking the status code believes it succeeded. The status code is part of your answer; make it honest.</div>

<h4>Query parameters: optional extras</h4>
<p>Any function argument that is <b>not</b> in the path becomes a query parameter. Give it a default and it becomes optional:</p>
<pre class="snip">@app.get("/search")
def search(q: str = "", max_price: float = 1000):
    # /search?q=key            gives q="key", max_price=1000
    # /search?q=key&amp;max_price=30 gives max_price=30.0
    ...</pre>
<p>The body is ordinary Python: go through <code>items.values()</code> and keep those whose lower-cased name contains the lower-cased <code>q</code> and whose price is at most <code>max_price</code>. A list comprehension from the lists and dicts lesson does it in one line, and the list is returned as a JSON array. Like path parameters, query values are converted by type, so <code>?max_price=cheap</code> gets a 422.</p>

<h4>Request bodies with Pydantic models</h4>
<p>A POST that creates an item sends a JSON body like <code>{"name": "Mouse", "price": 19.5}</code>. To describe what a valid body looks like, you write a small <b>class</b>, a blueprint for a kind of object, based on Pydantic's <code>BaseModel</code>. <b>Pydantic</b> is the validation library FastAPI is built on.</p>
<pre class="snip">from pydantic import BaseModel

class Item(BaseModel):
    name: str
    price: float
    in_stock: bool = True     # a default makes this field optional</pre>
<p>Each line is a field name with a type hint. Use the class as the type of a function argument, and FastAPI reads the request body, checks it against the model and hands you a ready-made <code>Item</code>:</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="A JSON body is checked against the Item model; valid data becomes an Item, invalid data gets 422">
<rect class="bx-dark" x="6" y="20" width="174" height="64" rx="6"/><text class="t-term" x="16" y="46">"name": "Mouse"</text><text class="t-term" x="16" y="70">"price": 19.5</text>
<path class="ln" d="M180 52h6"/><polygon class="ah" points="186,46 186,58 194,52"/>
<rect class="bx-info" x="196" y="14" width="102" height="76" rx="8"/><text class="t-b" x="247" y="38" text-anchor="middle">Item</text><text class="t-s" x="247" y="58" text-anchor="middle">name: str</text><text class="t-s" x="247" y="78" text-anchor="middle">price: float</text>
<path class="ln-ok" d="M298 52h18"/><polygon class="ah-ok" points="314,46 314,58 322,52"/>
<rect class="bx-ok" x="324" y="30" width="86" height="44" rx="6"/><text class="t-b t-ok" x="367" y="57" text-anchor="middle">201</text>
<rect class="bx-dark" x="6" y="120" width="174" height="64" rx="6"/><text class="t-term" x="16" y="146">"name": "X"</text><text class="t-term" x="16" y="170">"price": "cheap"</text>
<path class="ln-a" d="M180 152h134"/><polygon class="ah-a" points="314,146 314,158 322,152"/>
<rect class="bx-bad" x="324" y="130" width="86" height="44" rx="6"/><text class="t-b t-bad" x="367" y="157" text-anchor="middle">422</text>
<text class="t-s" x="250" y="142" text-anchor="middle">not a float</text>
</svg><figcaption>A body with a text name and a numeric price matches the Item model, so your function runs and the new item comes back with status 201. A body whose price is the word cheap cannot become a float, so FastAPI rejects it with 422 and your function never runs.</figcaption></figure>
<pre class="snip">@app.post("/items", status_code=201)
def create_item(item: Item):
    new_id = max(items) + 1                       # highest key, plus one
    items[new_id] = {"id": new_id, **item.model_dump()}
    return items[new_id]</pre>
<p>Line by line: <code>status_code=201</code> changes the success code from the default 200 to Created. <code>max(items)</code> on a dict looks at its keys, so it gives the highest id so far. <code>item.model_dump()</code> turns the Item back into a plain dict. Inside a dict literal, <code>**</code> <b>unpacks</b> another dict, copying all its pairs in, so the result is one dict with the id plus every field.</p>
<p>Pydantic is sensible about conversion: a price sent as the text <code>"19.5"</code> is accepted and converted, because it clearly is a number. <code>"cheap"</code> is not, so it gets a 422, and so does a body with a required field such as <code>name</code> missing.</p>

<h4>Running it for real, and testing it here</h4>
<p>On your own computer, install with <code>pip install "fastapi[standard]"</code> inside a virtual environment, save the code as <code>main.py</code> and run <code>fastapi dev main.py</code>, or the long-standing equivalent <code>uvicorn main:app --reload</code>. <b>Uvicorn</b> is the server program that listens for network connections and passes requests to your <code>app</code>. Then open <code>http://127.0.0.1:8000/docs</code> to see interactive documentation that FastAPI generated from your type hints.</p>
<p>This sandbox has no real network server, so it uses FastAPI's <code>TestClient</code>, which sends requests straight to your <code>app</code> object in memory. It is the same tool you would use with pytest:</p>
<pre class="snip">from fastapi.testclient import TestClient
client = TestClient(app)
resp = client.get("/items/1")
print(resp.status_code, resp.json())   # 200 {'id': 1, 'name': 'Keyboard', ...}</pre>
<p>The request panel in this lesson does that for you: type a path such as <code>/items/1</code> and send it.</p>
<div class="mistake"><b>Common mistake</b>A path in the decorator that doesn't match the function argument, such as <code>"/items/{id}"</code> with <code>def get_item(item_id: int)</code>. FastAPI then treats <code>item_id</code> as a required query parameter, and every request gets a 422 saying the field is missing. The name in braces and the argument name must be identical.</div>

<div class="try"><b>Try it in your head</b>With the lesson's code, what does <code>GET /items/2</code> return before you have posted anything? Only item 1 exists, so your code raises a 404 with detail "Item not found". And <code>GET /items/2.5</code>? 2.5 is not a whole number, so FastAPI answers 422 before your function runs.</div>

<h4>Recap</h4>
<ul>
<li><code>app = FastAPI()</code> creates the app; <code>@app.get(path)</code> and <code>@app.post(path)</code> register functions as endpoints, and returned dicts become JSON.</li>
<li>Type hints like <code>item_id: int</code> make FastAPI convert and validate input; bad input gets 422 automatically.</li>
<li><code>{item_id}</code> in the path fills the argument of the same name; other arguments are query parameters, optional when they have defaults.</li>
<li>A Pydantic <code>BaseModel</code> class describes the JSON body; <code>status_code=201</code> marks creation.</li>
<li><code>raise HTTPException(status_code=404, detail=...)</code> sends an honest error. Run locally with <code>fastapi dev main.py</code> and test with <code>TestClient(app)</code>.</li>
</ul>
`);

explain('y5',`
<h4>Why write tests at all?</h4>
<p>So far you have checked your code by running it and reading the output. That works for ten lines. It stops working when a project grows, because every change can break something you are not looking at. Fix a rounding bug in one function, and a different function that relied on the old behaviour quietly starts giving wrong answers. Nobody notices until a customer does.</p>
<p>A <b>test</b> is a small piece of code that calls your real code with an example input and checks the answer is what you expected. Once written, it runs in milliseconds, as often as you like, and never gets bored. A collection of tests, called a <b>test suite</b>, lets you change code with confidence: if every test still passes, you haven't broken anything they cover.</p>
<p><b>pytest</b> is the standard tool for running Python tests. In a real project you install it into your virtual environment with <code>pip install pytest</code>, then run <code>pytest</code> in the project folder. In this lesson, pressing Run does the same job and shows pytest-style results.</p>

<h4>The building block: <code>assert</code></h4>
<p><code>assert</code> is a Python keyword that states something must be True. If it is, nothing happens. If it isn't, Python raises an <code>AssertionError</code> and stops.</p>
<pre class="snip">assert 2 + 2 == 4      # True: silently carries on
assert 2 + 2 == 5      # False: AssertionError</pre>
<p>A pytest test is just a function whose name starts with <code>test_</code>, containing one or more asserts:</p>
<pre class="snip">def test_ten_percent():
    assert apply_discount(100, 10) == 90</pre>
<p>That is the whole thing. There is no special class to inherit from and nothing to register. pytest <b>discovers</b> tests by name: it looks in files named <code>test_*.py</code> or <code>*_test.py</code>, and runs every function in them whose name starts with <code>test_</code>. A test passes if it finishes without an error, and fails if any assert is False or anything else raises an exception.</p>

<h4>Arrange, act, assert</h4>
<p>Almost every good test has the same three-step shape. Thinking in these steps keeps tests short and focused on one behaviour each.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="Arrange sets up inputs, act calls the code, assert checks the result, leading to pass or fail">
<rect class="bx-info" x="10" y="20" width="120" height="64" rx="8"/><text class="t-b" x="70" y="46" text-anchor="middle">Arrange</text><text class="t-s" x="70" y="68" text-anchor="middle">set up inputs</text>
<path class="ln" d="M130 52h14"/><polygon class="ah" points="142,46 142,58 150,52"/>
<rect class="bx-a" x="150" y="20" width="120" height="64" rx="8"/><text class="t-b" x="210" y="46" text-anchor="middle">Act</text><text class="t-s" x="210" y="68" text-anchor="middle">call your code</text>
<path class="ln" d="M270 52h14"/><polygon class="ah" points="282,46 282,58 290,52"/>
<rect class="bx-warn" x="290" y="20" width="120" height="64" rx="8"/><text class="t-b" x="350" y="46" text-anchor="middle">Assert</text><text class="t-s" x="350" y="68" text-anchor="middle">check the result</text>
<path class="ln-ok" d="M320 84v40"/><polygon class="ah-ok" points="314,122 326,122 320,130"/>
<path class="ln-a" d="M380 84v40"/><polygon class="ah-a" points="374,122 386,122 380,130"/>
<rect class="bx-ok" x="270" y="132" width="76" height="34" rx="6"/><text class="t-b t-ok" x="308" y="154" text-anchor="middle">pass</text>
<rect class="bx-bad" x="354" y="132" width="56" height="34" rx="6"/><text class="t-b t-bad" x="382" y="154" text-anchor="middle">fail</text>
<text class="t-m" x="10" y="126">price = 19.99</text>
<text class="t-m" x="10" y="152">result = apply_...</text>
<text class="t-m" x="10" y="178">assert result == 16.99</text>
<text class="t-s" x="10" y="208">One behaviour per test, in three steps.</text>
</svg><figcaption>Arrange prepares the inputs, act calls the code being tested, and assert compares the result with what you expected. If the assert holds, the test passes; if not, it fails and pytest shows you both values.</figcaption></figure>
<pre class="snip">def test_rounds_to_cents():
    price, percent = 19.99, 15                # arrange
    result = apply_discount(price, percent)   # act
    assert result == 16.99                    # assert</pre>
<p>Work this one through by hand. 15 percent off means paying 85 percent. 19.99 times 0.85 is 16.9915, and <code>round(..., 2)</code> keeps two decimal places, giving 16.99. That is exactly the kind of fiddly detail a test should pin down, and it is why the first task asks for a test whose name mentions rounding.</p>

<h4>Reading a failure</h4>
<p>pytest's best feature is what it shows when a test fails. It rewrites plain asserts so that you see the actual values, not just "False":</p>
<pre class="snip">    def test_ten_percent():
&gt;       assert apply_discount(100, 10) == 91
E       assert 90.0 == 91
E        +  where 90.0 = apply_discount(100, 10)</pre>
<p>Read it from the top. The <code>&gt;</code> marks the failing line. The <code>E</code> lines explain: the left side was <code>90.0</code>, the right side was <code>91</code>, and the 90.0 came from calling <code>apply_discount(100, 10)</code>. Now decide: is the code wrong, or is the test's expectation wrong? Here the test is wrong, since 10 percent off 100 is 90. Both happen in real life, so always check both.</p>
<p>Notice <code>90.0 == 90</code> would pass: Python treats the float 90.0 and the int 90 as equal.</p>
<div class="tip"><b>Tip</b>Decimals stored in binary are approximate, so an unrounded result such as <code>0.1 + 0.2</code> is not exactly <code>0.3</code>. Here <code>apply_discount</code> rounds for you. For unrounded floats, compare with <code>pytest.approx</code>: <code>assert 0.1 + 0.2 == pytest.approx(0.3)</code>.</div>

<h4>Many cases, one test: <code>parametrize</code></h4>
<p>Writing a separate function for every example gets repetitive. <code>@pytest.mark.parametrize</code> runs one test function many times, once per row of data.</p>
<p>The line starting with <code>@</code> is a <b>decorator</b>. A decorator sits directly above a <code>def</code> and adds behaviour to that function, here telling pytest "run this with each of these inputs". You will meet decorators again in FastAPI.</p>
<pre class="snip">import pytest

@pytest.mark.parametrize("price,percent,expected", [
    (200, 50, 100),
    (80, 25, 60),
    (10, 100, 0),
])
def test_many_cases(price, percent, expected):
    assert apply_discount(price, percent) == expected</pre>
<p>The first argument is a string naming the parameters, separated by commas. The second is a list of tuples, one tuple per case, with values in the same order. pytest unpacks each tuple into the function's parameters:</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="One parametrized test function becomes three separate test runs">
<rect class="bx-a" x="6" y="84" width="166" height="40" rx="8"/><text class="t-m" x="89" y="109" text-anchor="middle">test_many_cases</text>
<path class="ln" d="M172 104h18v-70h20"/><polygon class="ah" points="208,28 208,40 216,34"/>
<path class="ln" d="M190 104h20"/><polygon class="ah" points="208,98 208,110 216,104"/>
<path class="ln" d="M190 104v70h20"/><polygon class="ah" points="208,168 208,180 216,174"/>
<rect class="bx-ok" x="218" y="14" width="192" height="40" rx="6"/><text class="t-m" x="314" y="39" text-anchor="middle">[200-50-100]</text>
<rect class="bx-ok" x="218" y="84" width="192" height="40" rx="6"/><text class="t-m" x="314" y="109" text-anchor="middle">[80-25-60]</text>
<rect class="bx-ok" x="218" y="154" width="192" height="40" rx="6"/><text class="t-m" x="314" y="179" text-anchor="middle">[10-100-0]</text>
</svg><figcaption>pytest turns the single parametrized function into three separate tests, one per row of data. Each gets an ID in square brackets built from its values, so if one row fails you see exactly which case broke.</figcaption></figure>
<p>Each case shows up as its own test, named like <code>test_many_cases[200-50-100]</code>, and passes or fails on its own. Adding a new case is now one line of data.</p>
<div class="mistake"><b>Common mistake</b>Forgetting <code>import pytest</code> at the top. The starter code doesn't have it, because a plain assert test doesn't need it. As soon as you use <code>pytest.mark</code>, <code>pytest.raises</code> or <code>pytest.fixture</code>, you get <code>NameError: name 'pytest' is not defined</code> until you add the import.</div>

<h4>Testing that errors happen: <code>pytest.raises</code></h4>
<p>Good code refuses bad input loudly. <code>apply_discount</code> raises <code>ValueError</code>, Python's standard exception for "right type, wrong value", when the percent is below 0 or above 100. That refusal is a behaviour too, and it deserves a test:</p>
<pre class="snip">def test_rejects_bad_percent():
    with pytest.raises(ValueError):
        apply_discount(100, 150)</pre>
<p>This reads backwards from normal code: the test <b>passes</b> only if the code inside the <code>with</code> block raises <code>ValueError</code>. If no error happens, pytest fails the test with a message starting <code>DID NOT RAISE</code>. Any other kind of exception also fails it. You can check the message too, with <code>pytest.raises(ValueError, match="between 0 and 100")</code>.</p>

<h4>Shared test data: fixtures</h4>
<p>Several tests often need the same setup, like a sample shopping cart. Copying it into each test is messy. A <b>fixture</b> is a function marked with <code>@pytest.fixture</code> that builds that data. Any test that wants it simply names it as a parameter:</p>
<pre class="snip">@pytest.fixture
def cart():
    return [{"price": 10.0, "qty": 2}, {"price": 5.5, "qty": 1}]

def test_cart_total(cart):          # pytest sees the name "cart"
    assert cart_total(cart) == 25.5  # 10.0 x 2 + 5.5 x 1</pre>
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="pytest matches the test's parameter name to a fixture, calls it, and passes in the result">
<rect class="bx-info" x="10" y="20" width="160" height="56" rx="8"/><text class="t-s" x="90" y="42" text-anchor="middle">fixture</text><text class="t-m" x="90" y="64" text-anchor="middle">cart()</text>
<rect class="bx-a" x="250" y="20" width="160" height="56" rx="8"/><text class="t-s" x="330" y="42" text-anchor="middle">test asks for</text><text class="t-m" x="330" y="64" text-anchor="middle">cart</text>
<path class="ln-a" d="M250 48h-72"/><polygon class="ah-a" points="180,42 180,54 172,48"/><text class="t-s t-a" x="210" y="40" text-anchor="middle">same name</text>
<path class="ln-ok" d="M90 76v40h152"/><polygon class="ah-ok" points="242,110 242,122 250,116"/>
<text class="t-s t-ok" x="160" y="138" text-anchor="middle">returns a fresh list</text>
<rect class="bx-ok" x="250" y="96" width="160" height="40" rx="8"/><text class="t-m" x="330" y="121" text-anchor="middle">test runs</text>
<text class="t-s" x="210" y="166" text-anchor="middle">A new cart is built for every test that asks.</text>
</svg><figcaption>Before running test_cart_total, pytest notices its parameter is called cart, finds the fixture with that name, calls it, and passes the returned list into the test. Each test gets its own fresh copy.</figcaption></figure>
<p>This is called <b>dependency injection</b>: the test declares what it needs, and pytest provides it. By default the fixture runs again for every test, so one test changing the cart can never affect another.</p>

<h4>What to test: the edges</h4>
<p>Testing 10 percent twice adds nothing. Bugs cluster at <b>edge cases</b>: the boundaries and unusual inputs where a <code>&lt;</code> should have been <code>&lt;=</code>. For <code>apply_discount</code>, good cases are:</p>
<ul>
<li><b>0 percent</b>: the price should be unchanged.</li>
<li><b>100 percent</b>: the price should be 0, and 100 must not be rejected.</li>
<li><b>Just outside the range</b>: -1 and 101 should both raise <code>ValueError</code>.</li>
<li><b>Awkward decimals</b>: like 19.99 at 15 percent, to check the rounding.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Copying the code's current output into the test without checking it. If the function is wrong, your test now locks the bug in. Work out the expected answer yourself, by hand or from the requirement, before you write the assert.</div>

<div class="try"><b>Try it in your head</b>Does <code>apply_discount(50, 0) == 50</code> pass? 0 percent off means multiplying by 1, giving 50.0, and 50.0 equals 50, so yes. What about a test that calls <code>apply_discount(100, 100)</code> inside <code>pytest.raises(ValueError)</code>? It fails with DID NOT RAISE, because 100 is allowed: the check is <code>percent &gt; 100</code>, and 100 is not greater than 100.</div>

<h4>Recap</h4>
<ul>
<li>pytest runs every <code>test_*</code> function in <code>test_*.py</code> files; a plain <code>assert result == expected</code> is all you need, and failures show both values.</li>
<li>Shape each test as arrange, act, assert, checking one behaviour.</li>
<li><code>@pytest.mark.parametrize</code> runs one test over many rows of data, each reported separately.</li>
<li><code>with pytest.raises(ValueError):</code> passes only if that error is raised.</li>
<li><code>@pytest.fixture</code> provides shared setup to any test that names it as a parameter.</li>
<li>Test the edges: zero, the maximum, and just-invalid values. Remember <code>import pytest</code>.</li>
</ul>
`);

explain('y6',`
<h4>Why write scripts for chores</h4>
<p>Some computer jobs are boring, repetitive and easy to get wrong by hand: sorting a messy downloads folder, renaming a hundred photos, turning a weekly spreadsheet into a report. A <b>script</b> is a short program that does a chore like that for you. Write it once, and the job takes one command forever after. It can even run on a schedule while you sleep.</p>
<p>This lesson's chore: a <code>downloads/</code> folder with eight files of mixed types, all dumped in one place. Your script sorts them into sub-folders by type and writes a <code>report.txt</code> saying what it did. You already have the building blocks: loops, dicts, functions, and opening files with <code>with</code>. The new pieces are two modules for working with the file system.</p>
<figure class="fig"><svg viewBox="0 0 420 300" role="img" aria-label="A flat downloads folder of eight files becomes four sub-folders">
<text class="t-b" x="20" y="22">before</text><text class="t-b" x="222" y="22">after</text>
<rect class="bx-warn" x="10" y="32" width="170" height="196" rx="8"/>
<text class="t-m" x="22" y="56">downloads/</text>
<text class="t-s" x="34" y="78">IMG_2041.jpg</text><text class="t-s" x="34" y="96">IMG_2042.JPG</text><text class="t-s" x="34" y="114">photo.png</text><text class="t-s" x="34" y="132">report-q3.pdf</text><text class="t-s" x="34" y="150">budget.xlsx</text><text class="t-s" x="34" y="168">notes.txt</text><text class="t-s" x="34" y="186">song.mp3</text><text class="t-s" x="34" y="204">setup.zip</text>
<path class="ln-a" d="M180 130h22"/><polygon class="ah-a" points="200,124 200,136 208,130"/>
<rect class="bx-ok" x="210" y="32" width="200" height="262" rx="8"/>
<text class="t-m" x="222" y="56">downloads/</text>
<text class="t-b t-ok" x="230" y="80">images/</text>
<text class="t-s" x="246" y="98">IMG_2041.jpg</text><text class="t-s" x="246" y="116">IMG_2042.JPG</text><text class="t-s" x="246" y="134">photo.png</text>
<text class="t-b t-ok" x="230" y="158">documents/</text>
<text class="t-s" x="246" y="176">report-q3.pdf</text><text class="t-s" x="246" y="194">budget.xlsx</text><text class="t-s" x="246" y="212">notes.txt</text>
<text class="t-b t-ok" x="230" y="236">audio/</text><text class="t-s" x="300" y="236">song.mp3</text>
<text class="t-b t-ok" x="230" y="264">other/</text><text class="t-s" x="300" y="264">setup.zip</text>
</svg><figcaption>Before, all eight files sit loose in downloads. After the script, three images, three documents, one audio file and one other file each live in their own sub-folder, and a report records the counts.</figcaption></figure>

<h4>The tools: <code>os</code>, <code>os.path</code> and <code>shutil</code></h4>
<p>Python's <code>os</code> module talks to the operating system: listing folders, making folders, checking what a path is. Inside it, <code>os.path</code> works with <b>paths</b>, the text addresses of files like <code>downloads/notes.txt</code>. The <code>shutil</code> module ("shell utilities") does bigger file operations like moving and copying.</p>
<div class="tbl-wrap"><table><tr><th>Call</th><th>Does</th></tr>
<tr><td><code>os.listdir("downloads")</code></td><td>Returns a list of the <b>names</b> inside the folder, files and folders alike.</td></tr>
<tr><td><code>os.path.join("downloads", "a.pdf")</code></td><td>Glues path parts with the right separator: <code>downloads/a.pdf</code>.</td></tr>
<tr><td><code>os.path.isdir(path)</code></td><td>True if the path is a folder.</td></tr>
<tr><td><code>os.path.splitext(name)</code></td><td>Splits off the extension: a pair of the base name and the extension.</td></tr>
<tr><td><code>os.makedirs(path, exist_ok=True)</code></td><td>Creates a folder, and any missing parent folders.</td></tr>
<tr><td><code>shutil.move(src, dst)</code></td><td>Moves a file from one path to another.</td></tr></table></div>
<p>Two of these hide traps worth understanding.</p>
<p><code>os.listdir</code> returns bare names like <code>"notes.txt"</code>, not full paths. To do anything with the file, you must join the folder back on: <code>os.path.join("downloads", name)</code>. Also, the order of the names is not guaranteed, so never rely on it.</p>
<p>Why <code>os.path.join</code> instead of just writing <code>"downloads/" + name</code>? Windows separates folders with a backslash and Linux and macOS use a forward slash. <code>join</code> uses the right one for the computer the script runs on, so the same script works everywhere.</p>

<h4>Finding a file's type from its extension</h4>
<p>The <b>extension</b> is the part of a file name after the last dot, like <code>.pdf</code>. It is how we decide where each file belongs. Walk one awkward name through the steps:</p>
<figure class="fig"><svg viewBox="0 0 420 268" role="img" aria-label="IMG_2042.JPG is split, the extension taken, lowered, and looked up to give images">
<rect class="bx" x="110" y="10" width="200" height="34" rx="6"/><text class="t-m" x="210" y="32" text-anchor="middle">"IMG_2042.JPG"</text>
<path class="ln" d="M210 44v14"/><polygon class="ah" points="204,56 216,56 210,64"/><text class="t-s" x="222" y="58">splitext</text>
<rect class="bx" x="70" y="66" width="280" height="34" rx="6"/><text class="t-m" x="210" y="88" text-anchor="middle">("IMG_2042", ".JPG")</text>
<path class="ln" d="M210 100v14"/><polygon class="ah" points="204,112 216,112 210,120"/><text class="t-s" x="222" y="114">take item [1]</text>
<rect class="bx-warn" x="150" y="122" width="120" height="34" rx="6"/><text class="t-m" x="210" y="144" text-anchor="middle">".JPG"</text>
<path class="ln-a" d="M210 156v14"/><polygon class="ah-a" points="204,168 216,168 210,176"/><text class="t-s t-a" x="222" y="170">.lower()</text>
<rect class="bx-a" x="150" y="178" width="120" height="34" rx="6"/><text class="t-m" x="210" y="200" text-anchor="middle">".jpg"</text>
<path class="ln-ok" d="M270 195h40"/><polygon class="ah-ok" points="308,189 308,201 316,195"/><text class="t-s" x="292" y="226" text-anchor="middle">look up</text>
<rect class="bx-ok" x="318" y="178" width="92" height="34" rx="6"/><text class="t-m" x="364" y="200" text-anchor="middle">images</text>
<text class="t-s" x="210" y="256" text-anchor="middle">Without .lower(), ".JPG" would not match ".jpg".</text>
</svg><figcaption>splitext splits the name into the base and the extension. Index 1 picks the extension, .JPG. Lowering it gives .jpg, which is found in the images list. Without lowering, the capital letters would not match and the photo would land in other.</figcaption></figure>
<p><code>splitext</code> splits at the <b>last</b> dot, so <code>"archive.tar.gz"</code> gives <code>".gz"</code>, and a name with no dot gives an empty extension <code>""</code>. Both are fine here: they simply land in <code>other</code>.</p>
<p>To map extensions to folders, a dict of lists keeps all the rules in one readable place, and a function hides the details:</p>
<pre class="snip">CATEGORIES = {
    "images": [".jpg", ".jpeg", ".png", ".gif"],
    "documents": [".pdf", ".docx", ".xlsx", ".txt"],
    "audio": [".mp3", ".wav"],
}
# category_for(filename): get the lowered extension, loop over
# CATEGORIES.items(), return the folder whose list contains it,
# and return "other" if none does.</pre>
<p>Writing a constant like <code>CATEGORIES</code> in capitals is a Python convention meaning "this is a setting, don't change it while running". Adding a new type later is a one-line edit, not a new <code>elif</code>.</p>

<h4>Moving the files</h4>
<p>The main loop goes through every name, skips anything that is already a folder, works out the category, makes sure the target folder exists, and moves the file:</p>
<pre class="snip">for name in os.listdir(folder):
    path = os.path.join(folder, name)
    if os.path.isdir(path):
        continue                      # skip folders: go to the next name
    target = category_for(name)
    os.makedirs(os.path.join(folder, target), exist_ok=True)
    shutil.move(path, os.path.join(folder, target, name))</pre>
<p><code>continue</code> means "stop this round of the loop now and start the next one". It keeps the rest of the loop body un-nested and easy to read.</p>
<p><code>exist_ok=True</code> matters a lot. Without it, <code>os.makedirs</code> raises <code>FileExistsError</code> the second time it is asked to create <code>images/</code>, which happens as soon as there is a second image. With it, an existing folder is quietly accepted.</p>
<p>To build the report, count as you go with the dict counting idiom from the lists and dicts lesson: <code>moved[target] = moved.get(target, 0) + 1</code>. Then write one line per folder, using <code>sorted(moved.items())</code> so the report is in a stable alphabetical order rather than whatever order the files happened to be listed in.</p>

<h4>Idempotent: safe to run twice</h4>
<p>A script is <b>idempotent</b> when running it a second time does no extra harm: the result is the same as running it once. This is the most important property of any script that might run on a schedule, be run by a colleague, or be re-run after a crash halfway through.</p>
<div class="tbl-wrap"><table><tr><th></th><th>First run</th><th>Second run</th></tr>
<tr><td>What <code>listdir</code> sees</td><td>8 loose files</td><td>4 folders, no loose files</td></tr>
<tr><td>Without the <code>isdir</code> check</td><td>Works</td><td>Tries to move the folder <code>images</code> into <code>other/</code></td></tr>
<tr><td>Without <code>exist_ok=True</code></td><td>Crashes on the second image</td><td>Crashes straight away</td></tr>
<tr><td>Written carefully</td><td>Moves 8 files</td><td>Moves nothing, no errors</td></tr></table></div>
<p>On the second run the summary is empty, so the report honestly says nothing was moved. That is correct behaviour: the job was already done.</p>
<div class="mistake"><b>Common mistake</b>Forgetting that folders show up in <code>os.listdir</code> too. After the first run, <code>images</code> has no extension, so <code>category_for</code> says "other", and without the <code>isdir</code> check your script moves your sorted folders into <code>other/</code>. Always decide explicitly what to do with folders.</div>
<div class="mistake"><b>Common mistake</b>Testing a destructive script on real files first. Moving and deleting can't be undone with Ctrl+Z. Try it on a copy, and consider a <b>dry run</b> mode that only prints what it <i>would</i> do. Also note that if a file with the same name already exists in the target folder, <code>shutil.move</code> may silently replace it on Linux and macOS.</div>

<h4>Writing a useful report</h4>
<p>Scripts that run unattended must leave a trace, otherwise nobody knows what happened. Write the report with mode <code>"w"</code> so each run replaces the last one, and include the date so readers know when it ran:</p>
<pre class="snip">from datetime import date

with open("report.txt", "w") as f:
    f.write(f"Organized on {date.today()}\\n")
    # then one line per folder, e.g. "images: 3\\n"</pre>
<p><code>f.write</code> does not add line breaks for you, so end each line with <code>\\n</code>. The report lives outside <code>downloads/</code>, so the script never tries to sort its own report.</p>
<div class="tip"><b>Tip</b>Modern Python code often uses the <code>pathlib</code> module instead, where paths are objects: <code>Path("downloads") / name</code> joins paths and <code>path.suffix</code> gives the extension. It does the same jobs; <code>os</code> and <code>shutil</code> are what this lesson's checks expect, and you will see both styles in real projects.</div>

<div class="try"><b>Try it in your head</b>Which folder does <code>"Holiday.PNG"</code> go to? The extension is <code>.PNG</code>, lowered to <code>.png</code>, which is in the images list: <code>images</code>. And <code>"Makefile"</code>? There is no dot, so the extension is empty and it goes to <code>other</code>.</div>

<h4>Recap</h4>
<ul>
<li><code>os.listdir(folder)</code> gives bare names, including folders; rebuild full paths with <code>os.path.join</code>.</li>
<li><code>os.path.splitext(name)[1].lower()</code> gets a lower-case extension, so <code>.JPG</code> and <code>.jpg</code> match.</li>
<li><code>os.makedirs(path, exist_ok=True)</code> creates folders without failing if they exist; <code>shutil.move(src, dst)</code> moves files.</li>
<li>Idempotent scripts are safe to run twice: skip work already done and never crash on things that already exist.</li>
<li>Always write a report of what changed, with a date, and test destructive scripts on copies or with a dry run first.</li>
</ul>
`);
