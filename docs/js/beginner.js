/* Beginner lessons: gentle starting points for tracks that used to begin too deep.
   They are inserted in front of each track's original lessons by levels.js. */
const NEW_LESSONS={};
function addLessons(tid,lessons){const t=ACAD.tracks[tid];if(!t)return;for(const l of lessons){l.track=tid;l.isNew=true;ACAD.lessonById[l.id]=l;t.lessons.push(l)}NEW_LESSONS[tid]=lessons.map(l=>l.id)}
(()=>{

/* ================= FRONTEND ================= */
const HTML_START=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>About me</title>
</head>
<body>
  <!-- Everything you want people to SEE goes inside <body>. -->
  <!-- Write your tags below this line, then press Run. -->

</body>
</html>`;
const HTML_SOL=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>About me</title>
</head>
<body>
  <h1>Ada Lovelace</h1>
  <p>I am learning to build websites, one tag at a time.</p>
  <a href="https://developer.mozilla.org">My favourite learning site</a>
  <h2>Things I like</h2>
  <ul>
    <li>Maths</li>
    <li>Music</li>
    <li>Machines</li>
  </ul>
  <img src="https://picsum.photos/200" alt="A random landscape photo">
</body>
</html>`;
const CSS_START=`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Coffee shop</title>
  <style>
    /* Write your CSS rules here. */

  </style>
</head>
<body>
  <h1>Bean There</h1>
  <p>Fresh coffee, roasted every morning.</p>
  <div class="card">
    <h2>Flat white</h2>
    <p>Smooth espresso with steamed milk.</p>
    <button id="buy">Buy for $4</button>
  </div>
</body>
</html>`;
const CSS_SOL=CSS_START.replace("    /* Write your CSS rules here. */\n","    body { font-family: system-ui, sans-serif; }\n    h1 { color: #6b3e26; }\n    .card { padding: 16px; border: 2px solid #6b3e26; margin-bottom: 24px; }\n    #buy { background: #6b3e26; color: white; }\n");
const JS_START=`// Lines starting with // are comments: notes for humans. JavaScript ignores them.
// Write your code below. Press Run, and anything you console.log() appears under Output.

`;
const JS_SOL=`const name = 'Ada';
console.log('Hello, ' + name + '!');

function add(a, b) {
  return a + b;
}

function canVote(age) {
  if (age >= 18) {
    return true;
  } else {
    return false;
  }
}

function total(prices) {
  let sum = 0;
  for (const price of prices) {
    sum = sum + price;
  }
  return sum;
}

function describe(person) {
  return \`\${person.name} is \${person.age}\`;
}

console.log(add(2, 3), canVote(20), total([1, 2, 3.5]), describe({ name: 'Ada', age: 36 }));
`;
addLessons('frontend',[
{id:'fb1',title:'Your first web page: HTML',kind:'code',lang:'web',starter:HTML_START,
 sum:'HTML describes what is on a page. Content goes between an opening and a closing tag, like <p>text</p>. Headings are <h1> to <h6>, paragraphs <p>, links <a href="...">, lists <ul> with <li> items, and images <img src="..." alt="...">. The alt text describes an image for people who can\'t see it.',
 keys:['<h1>…</h1>','<p>…</p>','<a href="url">…</a>','<ul><li>…</li></ul>','<img src="…" alt="…">'],
 concept:`<p>Every website you have ever visited is built from three languages that work together:</p>
<ul><li><b>HTML</b> says <i>what</i> is on the page: a heading, a paragraph, a picture.</li><li><b>CSS</b> says how it <i>looks</i>: colours, sizes, spacing.</li><li><b>JavaScript</b> makes it <i>do</i> things: react to clicks, load new data.</li></ul>
<p>This lesson is about HTML. You don't need any experience.</p>
<h4>Tags: labels around content</h4>
<p>HTML works by wrapping content in <b>tags</b>. A tag is a word inside angle brackets. Most come in pairs: an <b>opening tag</b> and a <b>closing tag</b> with a slash.</p>
<pre class="snip" style="margin-bottom:12px">&lt;p&gt;This is a paragraph.&lt;/p&gt;
 ↑ opening tag          ↑ closing tag</pre>
<p>The whole thing (opening tag + content + closing tag) is called an <b>element</b>. The browser reads the tags and decides how to show the content.</p>
<h4>The tags you need today</h4>
<div class="tbl-wrap"><table><tr><th>Tag</th><th>What it means</th><th>Example</th></tr>
<tr><td><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code></td><td>Headings, from biggest (h1) to smallest</td><td><code>&lt;h1&gt;Ada Lovelace&lt;/h1&gt;</code></td></tr>
<tr><td><code>&lt;p&gt;</code></td><td>A paragraph of text</td><td><code>&lt;p&gt;I like maths.&lt;/p&gt;</code></td></tr>
<tr><td><code>&lt;a&gt;</code></td><td>A link. <code>href</code> says where it goes</td><td><code>&lt;a href="https://example.com"&gt;Visit&lt;/a&gt;</code></td></tr>
<tr><td><code>&lt;ul&gt;</code> + <code>&lt;li&gt;</code></td><td>A bulleted list and its items</td><td><code>&lt;ul&gt;&lt;li&gt;Tea&lt;/li&gt;&lt;/ul&gt;</code></td></tr>
<tr><td><code>&lt;img&gt;</code></td><td>An image. It has no closing tag</td><td><code>&lt;img src="cat.jpg" alt="A sleeping cat"&gt;</code></td></tr></table></div>
<h4>Attributes: extra information</h4>
<p>Some tags need more information, given as <b>attributes</b> inside the opening tag: <code>name="value"</code>. A link needs <code>href</code> (the address). An image needs <code>src</code> (the picture file) and <code>alt</code> (a text description, read aloud to blind users and shown if the picture fails to load).</p>
<h4>Nesting</h4>
<p>Elements can sit inside other elements, like boxes inside boxes. List items <code>&lt;li&gt;</code> always sit inside a list <code>&lt;ul&gt;</code>. Indent nested tags so you can see the structure.</p>
<div class="tip"><b>How to work</b>Type in the editor, press <b>Run</b> (or Ctrl+Enter), and look at the preview. If something doesn't appear, check that every opening tag has its closing tag.</div>`,
 tasks:[
  {t:'Add a main heading (<h1>) with your name inside <body>.',sol:HTML_SOL,showSol:false,hint:'<h1>Your Name</h1>',c:ctx=>!!ctx.$('h1')&&ctx.$('h1').textContent.trim().length>1},
  {t:'Add a paragraph (<p>) of at least a few words about yourself.',hint:'<p>I am learning to build websites.</p>',c:ctx=>ctx.$$('p').some(p=>p.textContent.trim().length>=10)},
  {t:'Add a link (<a>) to any website, using href.',hint:'<a href="https://developer.mozilla.org">A site I like</a>',c:ctx=>ctx.$$('a').some(a=>/^https?:\/\//.test(a.getAttribute('href')||'')&&a.textContent.trim().length>0)},
  {t:'Add a bulleted list (<ul>) with at least three items (<li>).',hint:'<ul>\n  <li>Maths</li>\n  <li>Music</li>\n  <li>Machines</li>\n</ul>',c:ctx=>ctx.$$('ul > li').length>=3},
  {t:'Add an image (<img>) with both src and a helpful alt text.',hint:'<img src="https://picsum.photos/200" alt="A landscape photo">',c:ctx=>ctx.$$('img').some(i=>(i.getAttribute('src')||'').length>3&&(i.getAttribute('alt')||'').trim().length>3)},
  {t:'What is the alt attribute on an image for?',o:['It makes the image load faster','It describes the image for people who can\'t see it, and shows if the image fails to load','It sets the image size','It is the image\'s file name'],a:1,e:'Screen readers read alt text aloud to blind users. Search engines read it too. Describe what the image shows.'},
 ]},
{id:'fb2',title:'Styling with CSS: selectors, colours & the box model',kind:'code',lang:'web',starter:CSS_START,
 sum:'CSS rules have a selector (which elements) and declarations (property: value;). Select by tag (h1), by class (.card) or by id (#buy). Every element is a box: content, then padding (space inside the border), then the border, then margin (space outside).',
 keys:['h1 { color: … }','.class { … }','#id { … }','padding / border / margin','font-family'],
 concept:`<p>HTML gives a page its content. <b>CSS</b> (Cascading Style Sheets) gives it its look. In this lesson you write CSS inside the <code>&lt;style&gt;</code> tag in the page's head.</p>
<h4>A CSS rule has two parts</h4>
<pre class="snip" style="margin-bottom:12px">h1 {              ← selector: WHICH elements to style
  color: navy;    ← declaration: property: value;
  font-size: 40px;
}</pre>
<p>Each declaration ends with a semicolon. Forgetting one is the most common beginner mistake, and it silently breaks the next line.</p>
<h4>Three ways to select</h4>
<div class="tbl-wrap"><table><tr><th>Selector</th><th>Matches</th><th>Use it when</th></tr>
<tr><td><code>p</code></td><td>Every <code>&lt;p&gt;</code> element</td><td>All elements of one kind should look the same</td></tr>
<tr><td><code>.card</code></td><td>Every element with <code>class="card"</code></td><td>A reusable style. Most of your CSS will use classes</td></tr>
<tr><td><code>#buy</code></td><td>The one element with <code>id="buy"</code></td><td>One unique element (ids must be unique on a page)</td></tr></table></div>
<h4>The box model</h4>
<p>The browser draws every element as a rectangle with layers, like a framed picture:</p>
<div class="flow"><span>content</span><em>+</em><span>padding (inside)</span><em>+</em><span>border</span><em>+</em><span>margin (outside)</span></div>
<p><b>Padding</b> is space between the content and its border: it makes a card feel roomy. <b>Margin</b> is space outside the border: it pushes neighbouring elements away.</p>
<h4>Colours and fonts</h4>
<p>Colours can be names (<code>white</code>), hex codes (<code>#6b3e26</code>) or <code>rgb(107, 62, 38)</code>. <code>font-family: system-ui, sans-serif;</code> uses the device's own clean font, with sans-serif as a fallback.</p>
<div class="tip"><b>Try things</b>CSS is learned by experimenting. Change a number, press Run, look. Nothing can break permanently, and Reset code brings back the original.</div>`,
 tasks:[
  {t:'Give the whole page a clean font with a body rule.',sol:CSS_SOL,showSol:false,hint:'body { font-family: system-ui, sans-serif; }',c:ctx=>/sans-serif|system-ui|arial|helvetica|verdana/i.test(ctx.css(ctx.doc.body,'fontFamily')||'')},
  {t:'Change the colour of the <h1> heading.',hint:'h1 { color: #6b3e26; }',c:ctx=>{const h=ctx.$('h1');return !!h&&ctx.css(h,'color')!=='rgb(0, 0, 0)'}},
  {t:'Use the .card class selector to give the card 16px of padding and a solid border.',hint:'.card { padding: 16px; border: 2px solid #6b3e26; }',c:ctx=>{const c=ctx.$('.card');return !!c&&ctx.css(c,'paddingTop')==='16px'&&ctx.css(c,'borderTopStyle')==='solid'}},
  {t:'Add 24px of margin below the card.',hint:'.card { margin-bottom: 24px; }',c:ctx=>{const c=ctx.$('.card');return !!c&&ctx.css(c,'marginBottom')==='24px'}},
  {t:'Use the #buy id selector to give the button a background colour and white text.',hint:'#buy { background: #6b3e26; color: white; }',c:ctx=>{const b=ctx.$('#buy');return !!b&&ctx.css(b,'color')==='rgb(255, 255, 255)'&&!/rgb\(239, 239, 239\)|rgba\(0, 0, 0, 0\)/.test(ctx.css(b,'backgroundColor'))}},
  {t:'You want more space between a card\'s border and the text inside it. Which property?',o:['margin','padding','border-width','gap'],a:1,e:'Padding is inside the border. Margin is outside it, between this element and its neighbours.'},
 ]},
{id:'fb3',title:'JavaScript basics: variables, functions & decisions',kind:'code',lang:'js',starter:JS_START,
 sum:'A variable stores a value: const for values that never change, let for ones that do. A function is a named, reusable recipe: it takes inputs (parameters) and gives back a result with return. if/else makes decisions, a for…of loop repeats work for each item in an array, and an object groups related values: { name: "Ada", age: 36 }.',
 keys:['const / let','console.log()','function name(a, b) { return … }','if (…) { } else { }','for (const x of list)','{ key: value }','`Hello ${name}`'],
 concept:`<p>HTML is the content and CSS is the look. <b>JavaScript</b> is the behaviour: it is a real programming language that runs in every browser. Here you learn the five ideas every program is built from. Output appears under the editor.</p>
<h4>1. Variables: named boxes for values</h4>
<pre class="snip" style="margin-bottom:12px">const name = 'Ada';     // text (a "string") in quotes
let score = 10;         // a number
score = score + 5;      // let can change; const cannot
console.log(name, score);  // prints: Ada 15</pre>
<p>Use <code>const</code> by default. Use <code>let</code> only when the value must change.</p>
<h4>2. Functions: reusable recipes</h4>
<pre class="snip" style="margin-bottom:12px">function double(n) {    // n is a parameter (an input)
  return n * 2;         // return sends the answer back
}
double(4);              // → 8</pre>
<h4>3. Decisions with if / else</h4>
<pre class="snip" style="margin-bottom:12px">if (temperature > 25) {
  console.log('Wear a t-shirt');
} else {
  console.log('Bring a jacket');
}</pre>
<p>Comparisons: <code>&gt;</code> <code>&lt;</code> <code>&gt;=</code> <code>&lt;=</code>, <code>===</code> (equal) and <code>!==</code> (not equal). Always use three equals signs.</p>
<h4>4. Arrays and loops</h4>
<pre class="snip" style="margin-bottom:12px">const fruits = ['apple', 'banana', 'cherry'];   // a list
for (const fruit of fruits) {                   // repeat for each item
  console.log(fruit);
}</pre>
<h4>5. Objects: related values together</h4>
<pre class="snip" style="margin-bottom:12px">const user = { name: 'Ada', age: 36 };
console.log(user.name);                         // Ada
console.log(\`\${user.name} is \${user.age}\`);     // template string: Ada is 36</pre>
<p>Backticks (<code>\`</code>) make a <b>template string</b>: <code>\${…}</code> inside it is replaced by a value.</p>
<div class="tip"><b>Read the errors</b>When something is wrong, the Output shows an error with a line number. Read it slowly. It usually says exactly what is missing.</div>`,
 tasks:[
  {t:'Create a variable called name and print a greeting with console.log.',sol:JS_SOL,showSol:false,hint:"const name = 'Ada';\nconsole.log('Hello, ' + name + '!');",c:ctx=>/\b(const|let)\s+name\s*=/.test(ctx.code)&&(ctx.logs||[]).some(l=>/hello/i.test(l))},
  {t:'Write a function add(a, b) that returns the two numbers added together.',hint:'function add(a, b) {\n  return a + b;\n}',x:'add(2, 3) === 5 && add(-1, 1) === 0'},
  {t:'Write canVote(age): true when age is 18 or more, false otherwise.',hint:'function canVote(age) {\n  if (age >= 18) {\n    return true;\n  } else {\n    return false;\n  }\n}',x:'canVote(18) === true && canVote(30) === true && canVote(17) === false'},
  {t:'Write total(prices) that adds up an array of numbers with a for…of loop.',hint:'function total(prices) {\n  let sum = 0;\n  for (const price of prices) {\n    sum = sum + price;\n  }\n  return sum;\n}',x:'total([1, 2, 3.5]) === 6.5 && total([]) === 0',c:ctx=>/for\s*\(/.test(ctx.code)},
  {t:'Write describe(person) that returns "Ada is 36" for { name: "Ada", age: 36 }, using a template string.',hint:'function describe(person) {\n  return `${person.name} is ${person.age}`;\n}',x:"describe({ name: 'Ada', age: 36 }) === 'Ada is 36' && describe({ name: 'Linus', age: 21 }) === 'Linus is 21'",c:ctx=>/`[^`]*\$\{/.test(ctx.code)},
  {t:'When should you use let instead of const?',o:['Always','When the variable will be given a new value later','For text only','For numbers only'],a:1,e:'const prevents accidental reassignment, so it is the safer default. Reach for let when you really need to change the value, like a running total.'},
 ]},
]);

/* ================= PYTHON ================= */
const PY1_START=`# Lines starting with # are comments: notes for humans. Python ignores them.
# Write your code below and press Run. Anything you print() appears under Output.

`;
const PY1_SOL=`print("Hello, world!")

name = "Ada"
age = 36
greeting = f"Hi, I'm {name} and I'm {age} years old."
print(greeting)

age_text = "36"
age_num = int(age_text)

price = 19.99
quantity = 3
total = round(price * quantity, 2)
print(total)
`;
const PY2_SOL=`def grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    else:
        return "F"


def sum_evens(numbers):
    total = 0
    for n in numbers:
        if n % 2 == 0:
            total = total + n
    return total


def countdown(n):
    result = []
    while n > 0:
        result.append(n)
        n = n - 1
    return result


def greet(name="friend"):
    return f"Hello, {name}!"


print(grade(85), sum_evens([1, 2, 3, 4]), countdown(3), greet())
`;
addLessons('python',[
{id:'yb1',title:'Your first Python: print, variables & types',kind:'code',lang:'py',starter:PY1_START,
 sum:'print() shows output. A variable is a name for a value: name = "Ada". Values have types: str (text), int (whole numbers), float (decimals) and bool (True/False). f-strings put values into text: f"Hi {name}". Convert between types with int(), float() and str().',
 keys:['print("…")','name = "Ada"','str / int / float / bool','f"Hi {name}"','int("36")','round(x, 2)'],
 concept:`<p><b>Python</b> is a programming language that reads almost like English. It's used for websites, data, automation and AI, and it's a great first language. No experience needed.</p>
<h4>Your first line of code</h4>
<pre class="snip" style="margin-bottom:12px">print("Hello, world!")</pre>
<p><code>print</code> is a <b>function</b>: a command that does a job. You give it what to show inside the round brackets. Text goes in quotes.</p>
<h4>Variables: names for values</h4>
<pre class="snip" style="margin-bottom:12px">name = "Ada"     # the = sign means "store this value under this name"
age = 36
print(name)      # Ada</pre>
<p>Pick names that say what the value means: <code>age</code>, not <code>x</code>. Python style uses lowercase with underscores: <code>first_name</code>.</p>
<h4>Types: what kind of value</h4>
<div class="tbl-wrap"><table><tr><th>Type</th><th>Meaning</th><th>Examples</th></tr>
<tr><td><code>str</code></td><td>Text (a "string" of characters)</td><td><code>"Ada"</code>, <code>'hello'</code></td></tr>
<tr><td><code>int</code></td><td>Whole number</td><td><code>36</code>, <code>-4</code></td></tr>
<tr><td><code>float</code></td><td>Decimal number</td><td><code>19.99</code></td></tr>
<tr><td><code>bool</code></td><td>Yes or no</td><td><code>True</code>, <code>False</code></td></tr></table></div>
<p><code>"36"</code> (text) and <code>36</code> (a number) are different. Text read from a keyboard or a file is always a string, so convert it with <code>int("36")</code> before doing maths.</p>
<h4>f-strings: values inside text</h4>
<pre class="snip" style="margin-bottom:12px">print(f"{name} is {age} years old")   # Ada is 36 years old</pre>
<p>Put an <code>f</code> before the quotes, and anything in <code>{curly braces}</code> is replaced by its value.</p>
<div class="tip"><b>Decimals</b>Computers store decimals approximately: <code>19.99 * 3</code> gives <code>59.97000000000001</code>. Use <code>round(value, 2)</code> to show money.</div>`,
 tasks:[
  {t:'Print the text Hello, world!',sol:PY1_SOL,showSol:false,hint:'print("Hello, world!")',c:ctx=>/Hello, world!/.test(ctx.out||'')},
  {t:'Create a variable name (text) and a variable age (a whole number).',hint:'name = "Ada"\nage = 36',x:'isinstance(name, str) and isinstance(age, int) and not isinstance(age, bool)'},
  {t:'Build a variable greeting with an f-string that includes both name and age.',hint:'greeting = f"Hi, I\'m {name} and I\'m {age} years old."',x:'name in greeting and str(age) in greeting',c:ctx=>/f["']/.test(ctx.code)},
  {t:'Convert the text "36" into a number: store it as age_num using int().',hint:'age_text = "36"\nage_num = int(age_text)',x:'age_num == 36 and isinstance(age_num, int)'},
  {t:'Calculate total = 19.99 × 3, rounded to 2 decimal places.',hint:'price = 19.99\nquantity = 3\ntotal = round(price * quantity, 2)',x:'total == 59.97'},
  {t:'What is the type of the value "42" (with quotes)?',o:['int','str','float','bool'],a:1,e:'Quotes make it text. int("42") converts it into the number 42.'},
 ]},
{id:'yb2',title:'Decisions, loops & functions',kind:'code',lang:'py',starter:'# Write grade, sum_evens, countdown and greet as described in the tasks.\n',
 sum:'if / elif / else chooses between paths; Python uses indentation (4 spaces) to mark which lines belong to a block. for x in list repeats for each item; while repeats until a condition is false. def defines a function; return gives back the result; parameters can have defaults like name="friend".',
 keys:['if / elif / else:','indentation (4 spaces)','for n in numbers:','while n > 0:','def name(param):','return value','n % 2 == 0'],
 concept:`<p>Programs become useful when they can <b>decide</b> and <b>repeat</b>. You'll also learn to package code into <b>functions</b> you can reuse.</p>
<h4>Indentation is part of the language</h4>
<p>Python uses the spaces at the start of a line to know which lines belong together. A line ending in a colon <code>:</code> starts a block, and the block is the indented lines below it. Use 4 spaces.</p>
<h4>Decisions: if / elif / else</h4>
<pre class="snip" style="margin-bottom:12px">if temperature > 25:
    print("T-shirt weather")
elif temperature > 15:          # "else if": checked only if the first was false
    print("Bring a jumper")
else:
    print("Coat!")</pre>
<p>Compare with <code>==</code> (equal), <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>. A single <code>=</code> stores a value; a double <code>==</code> compares.</p>
<h4>Loops: repeat work</h4>
<pre class="snip" style="margin-bottom:12px">for fruit in ["apple", "banana"]:   # once per item
    print(fruit)

n = 3
while n > 0:                        # until the condition is False
    print(n)
    n = n - 1                       # forget this and it loops forever!</pre>
<h4>Functions: name a piece of work</h4>
<pre class="snip" style="margin-bottom:12px">def area(width, height):     # def = define; width and height are inputs
    return width * height    # return = the answer

area(3, 4)                   # → 12</pre>
<p>Parameters can have a default: <code>def greet(name="friend")</code> works with or without an argument.</p>
<div class="tip"><b>Even or odd?</b><code>%</code> gives the remainder of a division. <code>n % 2 == 0</code> is True for even numbers.</div>`,
 tasks:[
  {t:'Write grade(score): "A" for 90+, "B" for 80–89, "C" for 70–79, otherwise "F".',sol:PY2_SOL,showSol:false,hint:'def grade(score):\n    if score >= 90:\n        return "A"\n    elif score >= 80:\n        return "B"\n    elif score >= 70:\n        return "C"\n    else:\n        return "F"',x:'grade(95) == "A" and grade(90) == "A" and grade(85) == "B" and grade(72) == "C" and grade(40) == "F"'},
  {t:'Write sum_evens(numbers) that adds up only the even numbers, using a for loop.',hint:'total = 0\nfor n in numbers:\n    if n % 2 == 0:\n        total = total + n\nreturn total',x:'sum_evens([1, 2, 3, 4]) == 6 and sum_evens([]) == 0 and sum_evens([1, 3]) == 0',c:ctx=>/for\s+\w+\s+in/.test(ctx.code)},
  {t:'Write countdown(n) that returns [n, …, 1] using a while loop.',hint:'result = []\nwhile n > 0:\n    result.append(n)\n    n = n - 1\nreturn result',x:'countdown(3) == [3, 2, 1] and countdown(0) == []',c:ctx=>/while\s/.test(ctx.code)},
  {t:'Write greet(name="friend") so greet() gives "Hello, friend!" and greet("Ada") gives "Hello, Ada!".',hint:'def greet(name="friend"):\n    return f"Hello, {name}!"',x:'greet() == "Hello, friend!" and greet("Ada") == "Hello, Ada!"'},
  {t:'What is the difference between = and ==?',o:['None','= stores a value in a variable; == compares two values','== stores; = compares','= is for text, == for numbers'],a:1,e:'x = 5 puts 5 in x. x == 5 asks "is x equal to 5?" and gives True or False.'},
 ]},
]);

/* ================= PHP ================= */
addLessons('php',[
{id:'hb1',title:'Your first PHP: echo, variables & strings',kind:'code',lang:'php',starter:`<?php
// PHP code lives after the <?php tag. Lines starting with // are comments.
// Write your code below and press Run.

`,
 sum:'PHP runs on the server and builds the page before it reaches the browser. echo prints output. Variables start with $: $name = "Ada";. Every statement ends with a semicolon. Join text with the dot operator (.), or put variables inside double-quoted strings. Built-in functions like strlen() and strtoupper() work on text.',
 keys:['<?php','echo "…";','$name = "Ada";','"Hello, " . $name','"Hello, $name"','strlen()','strtoupper()'],
 concept:`<p><b>PHP</b> runs on a <b>server</b>. When someone visits a PHP page, the server runs the code and sends the result (usually HTML) to the browser. It powers WordPress, Wikipedia's software and Laravel apps. No experience needed for this lesson.</p>
<h4>The rules of a PHP file</h4>
<ul><li>Code starts after <code>&lt;?php</code>.</li><li>Every statement ends with a <b>semicolon</b> <code>;</code>. A missing one is the number-one beginner error.</li><li><code>echo</code> prints something.</li></ul>
<pre class="snip" style="margin-bottom:12px">&lt;?php
echo "Hello, world!\\n";     // \\n means "new line"</pre>
<h4>Variables start with a dollar sign</h4>
<pre class="snip" style="margin-bottom:12px">$name = "Ada";
$age = 36;
echo $name;</pre>
<h4>Joining text</h4>
<p>Two ways. The <b>dot operator</b> glues pieces together, and <b>double quotes</b> let you put variables straight in:</p>
<pre class="snip" style="margin-bottom:12px">echo "Hi, " . $name . "!\\n";   // dot: Hi, Ada!
echo "Hi, $name!\\n";           // double quotes fill in $name
echo 'Hi, $name!\\n';           // single quotes do NOT: prints Hi, $name!\\n</pre>
<h4>Maths and built-in functions</h4>
<pre class="snip" style="margin-bottom:12px">$total = 10 * 3;             // 30
echo strlen("Ada");          // 3: number of characters
echo strtoupper("ada");      // ADA</pre>
<div class="tip"><b>Read the error</b>"syntax error, unexpected …" almost always means a missing semicolon or quote on the line before the one mentioned.</div>`,
 tasks:[
  {t:'Print Hello, world! with echo.',sol:`<?php
echo "Hello, world!\\n";

$name = "Ada";
$age = 36;
echo $name . " is " . $age . " years old.\\n";

$price = 10;
$qty = 3;
$total = $price * $qty;
echo "Total: $total\\n";

echo strtoupper($name) . " has " . strlen($name) . " letters\\n";
`,showSol:false,hint:'echo "Hello, world!\\n";',c:ctx=>/Hello, world!/.test(ctx.out||'')},
  {t:'Store $name = "Ada" and $age = 36, then print "Ada is 36 years old." using the dot operator.',hint:'echo $name . " is " . $age . " years old.\\n";',c:ctx=>/Ada is 36 years old\./.test(ctx.out||'')&&/\$name\s*\./.test(ctx.code)},
  {t:'Calculate $total = $price * $qty (10 × 3) and print "Total: 30" using a double-quoted string.',hint:'$price = 10;\n$qty = 3;\n$total = $price * $qty;\necho "Total: $total\\n";',c:ctx=>/Total: 30/.test(ctx.out||'')&&/"[^"\n]*\$total/.test(ctx.code)},
  {t:'Print "ADA has 3 letters" using strtoupper() and strlen() on $name.',hint:'echo strtoupper($name) . " has " . strlen($name) . " letters\\n";',c:ctx=>/ADA has 3 letters/.test(ctx.out||'')&&/strtoupper\(/.test(ctx.code)&&/strlen\(/.test(ctx.code)},
  {t:'What does echo \'Hi, $name\'; print (single quotes)?',o:['Hi, Ada','Hi, $name','An error','Nothing'],a:1,e:'Single quotes are taken literally. Use double quotes or the dot operator to insert a variable.'},
 ]},
{id:'hb2',title:'Decisions, loops & functions in PHP',kind:'code',lang:'php',starter:`<?php
// Write grade(), sumTo() and the shopping-list loop described in the tasks.

$items = ['bread', 'milk', 'eggs'];
`,
 sum:'if / elseif / else chooses a path. for counts (for ($i = 1; $i <= $n; $i++)), foreach walks through each item of an array. function name(type $param): returnType { return …; } defines a reusable function. Arrays are written [1, 2, 3]; count() gives their length.',
 keys:['if (…) { } elseif (…) { } else { }','for ($i = 1; $i <= $n; $i++)','foreach ($items as $item)','function f(int $x): string','return …;','count($items)'],
 concept:`<p>Now you'll make PHP <b>decide</b>, <b>repeat</b> and <b>reuse</b>. These three ideas are the same in every language, so they carry over once you learn them.</p>
<h4>Decisions</h4>
<pre class="snip" style="margin-bottom:12px">if ($temp > 25) {
    echo "T-shirt\\n";
} elseif ($temp > 15) {
    echo "Jumper\\n";
} else {
    echo "Coat\\n";
}</pre>
<p>Curly braces <code>{ }</code> mark the block of code that belongs to each branch.</p>
<h4>Loops</h4>
<pre class="snip" style="margin-bottom:12px">for ($i = 1; $i &lt;= 3; $i++) {      // start; keep going while; after each round
    echo $i;                          // 123
}

$items = ['bread', 'milk'];           // an array: a list of values
foreach ($items as $item) {           // once per item
    echo "- $item\\n";
}</pre>
<p><code>$i++</code> means "add 1 to $i".</p>
<h4>Functions with types</h4>
<pre class="snip" style="margin-bottom:12px">function area(int $width, int $height): int {
    return $width * $height;
}
echo area(3, 4);   // 12</pre>
<p>The types (<code>int</code>, <code>string</code>, <code>float</code>, <code>bool</code>, <code>array</code>) say what goes in and what comes out. PHP checks them, which catches mistakes early.</p>`,
 tasks:[
  {t:'Write grade(int $score): string returning "A" (90+), "B" (80+), "C" (70+) or "F".',sol:`<?php
$items = ['bread', 'milk', 'eggs'];

function grade(int $score): string {
    if ($score >= 90) {
        return 'A';
    } elseif ($score >= 80) {
        return 'B';
    } elseif ($score >= 70) {
        return 'C';
    } else {
        return 'F';
    }
}

function sumTo(int $n): int {
    $total = 0;
    for ($i = 1; $i <= $n; $i++) {
        $total += $i;
    }
    return $total;
}

foreach ($items as $item) {
    echo "- $item\\n";
}
echo count($items) . " items\\n";
`,showSol:false,hint:"function grade(int $score): string {\n    if ($score >= 90) {\n        return 'A';\n    } elseif ($score >= 80) {\n        return 'B';\n    } elseif ($score >= 70) {\n        return 'C';\n    } else {\n        return 'F';\n    }\n}",c:ctx=>{if(!ctx.php)return false;const g=s=>ctx.php.call('grade',s).v;return g(95)==='A'&&g(90)==='A'&&g(85)==='B'&&g(70)==='C'&&g(10)==='F'}},
  {t:'Write sumTo(int $n): int that adds 1 + 2 + … + n with a for loop.',hint:'$total = 0;\nfor ($i = 1; $i <= $n; $i++) {\n    $total += $i;\n}\nreturn $total;',c:ctx=>!!ctx.php&&ctx.php.call('sumTo',4).v===10&&ctx.php.call('sumTo',0).v===0&&/for\s*\(/.test(ctx.code)},
  {t:'Print each item of $items on its own line as "- bread" with foreach.',hint:'foreach ($items as $item) {\n    echo "- $item\\n";\n}',c:ctx=>/- bread\n- milk\n- eggs/.test(ctx.out||'')&&/foreach/.test(ctx.code)},
  {t:'Print how many items there are, like "3 items", using count().',hint:'echo count($items) . " items\\n";',c:ctx=>/3 items/.test(ctx.out||'')&&/count\(/.test(ctx.code)},
  {t:'Which loop fits "do something for every item in this array"?',o:['while','foreach','for with $i','if'],a:1,e:'foreach walks an array item by item without you managing an index.'},
 ]},
]);

/* ================= SQL ================= */
const BOOKS=`CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT NOT NULL, year INTEGER NOT NULL, price REAL NOT NULL);
INSERT INTO books VALUES
 (1,'Things Fall Apart','Chinua Achebe',1958,9.99),(2,'Half of a Yellow Sun','Chimamanda Ngozi Adichie',2006,12.50),
 (3,'The Hobbit','J. R. R. Tolkien',1937,8.99),(4,'Beloved','Toni Morrison',1987,11.00),
 (5,'Kindred','Octavia E. Butler',1979,10.25),(6,'The Alchemist','Paulo Coelho',1988,7.50),
 (7,'Americanah','Chimamanda Ngozi Adichie',2013,13.00),(8,'Dune','Frank Herbert',1965,9.50);`;
const cols=(ctx,list)=>!!ctx.last&&JSON.stringify(ctx.last.columns.map(c=>c.toLowerCase()))===JSON.stringify(list);
addLessons('sql',[
{id:'sb1',title:'What is a database? Your first SELECT',kind:'code',lang:'sql',seed:BOOKS,starter:`-- This database has one table: books (id, title, author, year, price).
-- Lines starting with -- are comments. Write a query below and press Run.

`,
 sum:'A relational database stores data in tables: each row is one record and each column is one property. SELECT asks for data: SELECT * FROM books returns every column; SELECT title, author FROM books returns only those. AS renames a column in the result, and LIMIT caps how many rows come back. Queries end with a semicolon.',
 keys:['SELECT * FROM table;','SELECT col1, col2 FROM table;','SELECT col AS new_name','LIMIT 3'],
 concept:`<p>Almost every app stores its data in a <b>database</b>: users, orders, messages. The most common kind is a <b>relational database</b>, and you talk to it with <b>SQL</b> (Structured Query Language). No experience needed.</p>
<h4>Tables, rows and columns</h4>
<p>A table looks like a spreadsheet. This lesson's database has a <code>books</code> table:</p>
<div class="tbl-wrap"><table><tr><th>id</th><th>title</th><th>author</th><th>year</th><th>price</th></tr>
<tr><td>1</td><td>Things Fall Apart</td><td>Chinua Achebe</td><td>1958</td><td>9.99</td></tr>
<tr><td>3</td><td>The Hobbit</td><td>J. R. R. Tolkien</td><td>1937</td><td>8.99</td></tr>
<tr><td colspan="5">… 8 books in total</td></tr></table></div>
<ul><li>Each <b>row</b> is one book (one record).</li><li>Each <b>column</b> is one property of every book.</li><li><code>id</code> is the <b>primary key</b>: a unique number that identifies each row.</li></ul>
<h4>Asking questions with SELECT</h4>
<pre class="snip" style="margin-bottom:12px">SELECT * FROM books;               -- * means "every column"
SELECT title, author FROM books;   -- only these columns
SELECT title AS book FROM books;   -- rename the column in the result
SELECT * FROM books LIMIT 3;       -- only the first 3 rows</pre>
<p>Read a query out loud: "select title and author from books." SQL keywords are usually written in capitals so they stand out, but SQL doesn't mind either way. End each query with a semicolon.</p>
<div class="tip"><b>Results</b>The Results panel shows the rows from your most recent query. Every Run starts again from the original data, so you can't break anything.</div>`,
 tasks:[
  {t:'Show every column of every book.',sol:'SELECT * FROM books;',c:ctx=>!!ctx.last&&ctx.last.values.length===8&&ctx.last.columns.length===5},
  {t:'Show only the title and author columns.',sol:'SELECT title, author FROM books;',c:ctx=>cols(ctx,['title','author'])&&ctx.last.values.length===8},
  {t:'Show the title and price, renaming price to cost with AS.',sol:'SELECT title, price AS cost FROM books;',c:ctx=>cols(ctx,['title','cost'])&&ctx.last.values.length===8},
  {t:'Show just the first 3 books.',sol:'SELECT * FROM books LIMIT 3;',c:ctx=>!!ctx.last&&ctx.last.values.length===3&&/LIMIT\s+3/i.test(ctx.code)},
  {t:'In a table, what is one row?',o:['One property, like "price"','One record, like one book','The whole database','A query'],a:1,e:'Rows are records; columns are the properties every record has.'},
 ]},
{id:'sb2',title:'Adding, changing & deleting rows',kind:'code',lang:'sql',seed:BOOKS,starter:`-- books (id, title, author, year, price). Every Run starts from the original 8 books.
-- Write all your statements in this file, then add a SELECT at the end to check the result.

`,
 sum:'INSERT INTO table (columns) VALUES (…) adds a row. UPDATE table SET column = value WHERE … changes rows. DELETE FROM table WHERE … removes rows. Always write the WHERE clause: without it, UPDATE and DELETE affect every row in the table.',
 keys:["INSERT INTO books (title, …) VALUES ('…', …);",'UPDATE books SET price = 5 WHERE id = 3;','DELETE FROM books WHERE id = 8;','WHERE is essential'],
 concept:`<p>Reading data is half the job. Apps also <b>create</b>, <b>update</b> and <b>delete</b> data. Together with reading, that's called <b>CRUD</b>: Create, Read, Update, Delete.</p>
<h4>INSERT: add a row</h4>
<pre class="snip" style="margin-bottom:12px">INSERT INTO books (title, author, year, price)
VALUES ('Purple Hibiscus', 'Chimamanda Ngozi Adichie', 2003, 11.20);</pre>
<p>List the columns, then the values in the same order. Text goes in single quotes, numbers don't. The <code>id</code> is filled in automatically.</p>
<h4>UPDATE: change rows</h4>
<pre class="snip" style="margin-bottom:12px">UPDATE books SET price = 7.99 WHERE id = 3;</pre>
<h4>DELETE: remove rows</h4>
<pre class="snip" style="margin-bottom:12px">DELETE FROM books WHERE id = 8;</pre>
<div class="tip"><b>The most important habit in SQL</b><code>WHERE</code> decides which rows are affected. <code>UPDATE books SET price = 0;</code> with no WHERE makes <b>every</b> book free. Write the WHERE part first, and check it with a SELECT using the same WHERE.</div>
<p>After your changes, add <code>SELECT * FROM books;</code> at the end to see the result.</p>`,
 tasks:[
  {t:"Add the book 'Purple Hibiscus' by Chimamanda Ngozi Adichie (2003, 11.20).",sol:"INSERT INTO books (title, author, year, price)\nVALUES ('Purple Hibiscus', 'Chimamanda Ngozi Adichie', 2003, 11.20);\n\nUPDATE books SET price = 7.99 WHERE id = 3;\n\nDELETE FROM books WHERE id = 8;\n\nSELECT * FROM books;",showSol:false,hint:"INSERT INTO books (title, author, year, price)\nVALUES ('Purple Hibiscus', 'Chimamanda Ngozi Adichie', 2003, 11.20);",c:ctx=>!ctx.err&&ctx.q("SELECT COUNT(*) AS n FROM books WHERE title = 'Purple Hibiscus' AND year = 2003")[0].n===1},
  {t:'Change the price of The Hobbit (id 3) to 7.99, and only that book.',hint:'UPDATE books SET price = 7.99 WHERE id = 3;',c:ctx=>{const r=ctx.q('SELECT id, price FROM books ORDER BY id');const h=r.find(x=>x.id===3);return !!h&&Math.abs(h.price-7.99)<1e-9&&r.filter(x=>Math.abs(x.price-7.99)<1e-9).length===1}},
  {t:'Delete Dune (id 8) and nothing else.',hint:'DELETE FROM books WHERE id = 8;',c:ctx=>{const n=ctx.q('SELECT COUNT(*) AS n FROM books')[0].n;return !ctx.q('SELECT id FROM books WHERE id = 8').length&&n>=7}},
  {t:'Finish with a SELECT that shows the whole table.',hint:'SELECT * FROM books;',c:ctx=>!!ctx.last&&ctx.last.columns.length===5&&ctx.last.values.length>=7},
  {t:'What does UPDATE books SET price = 0; (no WHERE) do?',o:['Nothing','Makes every book cost 0','Makes the first book cost 0','Shows an error'],a:1,e:'Without WHERE, UPDATE and DELETE apply to every row. Always write WHERE.'},
 ]},
]);

/* ================= NEXT (TypeScript basics) ================= */
addLessons('next',[
{id:'nb1',title:'TypeScript basics: types for values & functions',kind:'code',lang:'ts',starter:`// TypeScript = JavaScript + types. Fix and finish this file, then press Run.
// Type errors appear under Output with a red ✖ and a line number.

let count: number = "5";

`,
 sum:'TypeScript adds types to JavaScript and checks them before your code runs. Annotate with a colon: let title: string, let price: number, let done: boolean. Arrays are string[] or number[]. Describe objects with type or interface. Functions declare parameter and return types: function f(x: number): number. A ? makes a parameter optional.',
 keys:['let x: string','number / boolean','string[]','type Product = { … }','function f(a: number): number','name?: string'],
 concept:`<p>You know JavaScript from the Frontend track. <b>TypeScript</b> is JavaScript plus <b>types</b>: labels that say what kind of value something holds. The TypeScript checker reads your code <i>before</i> it runs and warns you when values don't match. Many bugs get caught while you type instead of after users find them.</p>
<h4>Annotating variables</h4>
<pre class="snip" style="margin-bottom:12px">let title: string = 'Dune';
let price: number = 9.5;
let inStock: boolean = true;

price = 'cheap';   // ✖ Type 'string' is not assignable to type 'number'</pre>
<p>The part after the colon is the type. Often TypeScript can <b>infer</b> it: <code>let price = 9.5</code> is already a number.</p>
<h4>Arrays and objects</h4>
<pre class="snip" style="margin-bottom:12px">const tags: string[] = ['sci-fi', 'classic'];

type Product = {
  name: string;
  price: number;
};
const book: Product = { name: 'Dune', price: 9.5 };</pre>
<h4>Functions</h4>
<pre class="snip" style="margin-bottom:12px">function withTax(price: number, rate: number): number {
  return price * (1 + rate);
}
//           ↑ input types                 ↑ return type

function greet(name?: string): string {   // ? = optional
  return 'Hello, ' + (name ?? 'friend') + '!';
}</pre>
<p><code>??</code> means "use the right side if the left side is missing".</p>
<div class="tip"><b>Types disappear at runtime</b>Browsers run plain JavaScript. TypeScript removes the types when it builds your code, so they only help while you write and build.</div>`,
 tasks:[
  {t:'Fix the type error: count should hold a number.',sol:`let count: number = 5;

let title: string = 'Dune';
let price: number = 9.5;
let inStock: boolean = true;

function priceWithTax(price: number, rate: number): number {
  return price * (1 + rate);
}

type Product = {
  name: string;
  price: number;
};
const tags: string[] = ['sci-fi', 'classic'];
const book: Product = { name: 'Dune', price: 9.5 };

function greet(name?: string): string {
  return 'Hello, ' + (name ?? 'friend') + '!';
}
`,showSol:false,hint:'let count: number = 5;',c:ctx=>!!ctx.diag&&!ctx.diag.some(d=>/not assignable/.test(d.msg))&&/count\s*:\s*number\s*=\s*\d/.test(ctx.code)},
  {t:'Declare title: string, price: number and inStock: boolean with type annotations.',hint:"let title: string = 'Dune';\nlet price: number = 9.5;\nlet inStock: boolean = true;",c:ctx=>/\w+\s*:\s*string\s*=/.test(ctx.code)&&/\w+\s*:\s*number\s*=/.test(ctx.code)&&/\w+\s*:\s*boolean\s*=/.test(ctx.code)&&!!ctx.diag&&ctx.diag.length===0},
  {t:'Write priceWithTax(price: number, rate: number): number.',hint:'function priceWithTax(price: number, rate: number): number {\n  return price * (1 + rate);\n}',x:'priceWithTax(100, 0.2) === 120',c:ctx=>/function\s+priceWithTax\s*\(\s*\w+\s*:\s*number\s*,\s*\w+\s*:\s*number\s*\)\s*:\s*number/.test(ctx.code)},
  {t:'Define a Product type (name: string, price: number) and a string[] array, with no type errors.',hint:"type Product = {\n  name: string;\n  price: number;\n};\nconst tags: string[] = ['sci-fi', 'classic'];\nconst book: Product = { name: 'Dune', price: 9.5 };",c:ctx=>/(type\s+Product\s*=|interface\s+Product)/.test(ctx.code)&&/:\s*string\[\]/.test(ctx.code)&&/:\s*Product\b/.test(ctx.code)&&!!ctx.diag&&ctx.diag.length===0},
  {t:'Write greet(name?: string): string: greet() gives "Hello, friend!" and greet("Ada") gives "Hello, Ada!".',hint:"function greet(name?: string): string {\n  return 'Hello, ' + (name ?? 'friend') + '!';\n}",x:"greet() === 'Hello, friend!' && greet('Ada') === 'Hello, Ada!'",c:ctx=>/name\s*\?\s*:\s*string/.test(ctx.code)},
  {t:'When does TypeScript catch a type error?',o:['Only when users click a button','While you write and build, before the code runs','Never','Only in production'],a:1,e:'The checker runs in your editor and in the build. At runtime the types are gone.'},
 ]},
]);

/* ================= DSA ================= */
addLessons('dsa',[
{id:'ab1',title:'Thinking in algorithms: loops, arrays & counting steps',kind:'code',lang:'js',starter:`// An algorithm is a step-by-step recipe. Write each function below, then press Run.

`,
 sum:'An algorithm is a precise, step-by-step recipe for solving a problem. Most beginner algorithms walk through an array with a loop and keep track of something: a running total, the best value so far, a count. Before coding, solve a tiny example by hand and write the steps in plain words. Counting how many steps your loop takes is the first step to Big-O.',
 keys:['for (const x of arr)','running total','best so far','count matches','two pointers (start, end)'],
 concept:`<p>An <b>algorithm</b> is a recipe: exact steps that turn an input into an output. You already follow algorithms, like "check every pocket until you find your keys". This lesson builds the habits that every later lesson relies on. You only need the JavaScript basics from the Frontend track.</p>
<h4>The habit: solve it by hand first</h4>
<p>Before writing code, take a tiny example and do it yourself on paper. To find the biggest number in <code>[4, 9, 2]</code>: "Start with the first number as the best. Look at each next number. If it's bigger than the best, it becomes the best." Those sentences <i>are</i> the algorithm. Code is just translating them.</p>
<h4>Three patterns you'll use forever</h4>
<pre class="snip" style="margin-bottom:12px">// 1. Running total
let sum = 0;
for (const n of numbers) sum += n;

// 2. Best so far
let best = numbers[0];
for (const n of numbers) if (n > best) best = n;

// 3. Counting matches
let count = 0;
for (const x of items) if (x === target) count++;</pre>
<h4>Counting steps</h4>
<p>Each pattern looks at every item once. With 10 items that's 10 steps, and with a million items it's a million. The work grows <b>in proportion</b> to the input. The next lesson gives this a name, <b>O(n)</b>, and shows why some algorithms grow much faster.</p>
<div class="tip"><b>Edge cases</b>Always ask: what if the list is empty? What if it has one item? Good algorithms handle these on purpose.</div>`,
 tasks:[
  {t:'sum(numbers): add up all the numbers (0 for an empty array).',sol:`function sum(numbers) {
  let total = 0;
  for (const n of numbers) total += n;
  return total;
}

function max(numbers) {
  if (numbers.length === 0) return null;
  let best = numbers[0];
  for (const n of numbers) if (n > best) best = n;
  return best;
}

function countOf(items, target) {
  let count = 0;
  for (const x of items) if (x === target) count++;
  return count;
}

function reverse(text) {
  let out = '';
  for (let i = text.length - 1; i >= 0; i--) out += text[i];
  return out;
}

function isPalindrome(word) {
  let start = 0;
  let end = word.length - 1;
  while (start < end) {
    if (word[start] !== word[end]) return false;
    start++;
    end--;
  }
  return true;
}
`,showSol:false,hint:'let total = 0;\nfor (const n of numbers) total += n;\nreturn total;',x:'sum([1, 2, 3]) === 6 && sum([]) === 0 && sum([-5, 5]) === 0'},
  {t:'max(numbers): the biggest number, or null for an empty array. Don\'t use Math.max.',hint:'if (numbers.length === 0) return null;\nlet best = numbers[0];\nfor (const n of numbers) if (n > best) best = n;\nreturn best;',x:'max([4, 9, 2]) === 9 && max([-3, -1, -7]) === -1 && max([]) === null',c:ctx=>!/Math\.max/.test(ctx.code)},
  {t:'countOf(items, target): how many times target appears.',hint:'let count = 0;\nfor (const x of items) if (x === target) count++;\nreturn count;',x:"countOf(['a', 'b', 'a'], 'a') === 2 && countOf([], 'a') === 0"},
  {t:'reverse(text): the text backwards, using a loop (no .reverse()).',hint:"let out = '';\nfor (let i = text.length - 1; i >= 0; i--) out += text[i];\nreturn out;",x:"reverse('code') === 'edoc' && reverse('') === ''",c:ctx=>!/\.reverse\(/.test(ctx.code)},
  {t:'isPalindrome(word): true if it reads the same both ways, comparing from both ends.',hint:'let start = 0, end = word.length - 1;\nwhile (start < end) {\n  if (word[start] !== word[end]) return false;\n  start++; end--;\n}\nreturn true;',x:"isPalindrome('racecar') === true && isPalindrome('level') === true && isPalindrome('code') === false && isPalindrome('') === true"},
  {t:'A loop looks at every item of a list once. The list doubles in size. The work…',o:['stays the same','roughly doubles','squares','halves'],a:1,e:'Work that grows in proportion to the input is called linear, O(n). That\'s the topic of the next lesson.'},
 ]},
]);
})();
