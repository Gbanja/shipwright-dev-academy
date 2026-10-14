/* next: "Explained step by step" walkthroughs. */

explain('nb1',`
<h4>Why add types to JavaScript at all?</h4>
<p>JavaScript is relaxed about what you put where. A variable that held a number a moment ago can suddenly hold some text, and JavaScript will not complain. That freedom causes real bugs. Imagine a shop that reads a price from a form. Form fields always give you text, so the "price" is actually the text <code>"5"</code>, not the number 5. Now <code>"5" + 1</code> gives <code>"51"</code>, because adding text to anything glues the two together. Nobody notices until a customer is charged 51 pounds.</p>
<p><b>TypeScript</b> is JavaScript with one extra idea: <b>types</b>. A type is a label that says what kind of value something is allowed to hold, such as "a number" or "some text". A program called the <b>type checker</b> reads your code <i>before</i> it runs and warns you whenever a value does not match its label. The bug above would be underlined in red while you type, long before a customer sees it.</p>
<div class="analogy"><b>Think of it like</b>A shape sorter toy. Each hole has a shape: a circle, a square, a star. A type is the shape of the hole, and a value is the block you try to push in. The checker is the toy itself: a square block simply will not go through a round hole, so you find out straight away instead of later.</div>
<p>Everything you already know from JavaScript still works. TypeScript only adds labels on top. Files that use it end in <code>.ts</code> instead of <code>.js</code>.</p>

<h4>Your first type annotations</h4>
<p>You add a type by writing a colon after a variable's name, then the type. This is called a <b>type annotation</b>. The three basic types you will use all the time are:</p>
<ul>
<li><code>string</code>: text, written in quotes, like <code>'Dune'</code>. ("String" is the programming word for a string of characters.)</li>
<li><code>number</code>: any number, whole or with a decimal point, like <code>5</code> or <code>9.5</code>. There is no separate type for whole numbers.</li>
<li><code>boolean</code>: exactly <code>true</code> or <code>false</code>, used for yes-or-no facts.</li>
</ul>
<pre class="snip">let title: string = 'Dune';     // only text may go here
let price: number = 9.5;        // only numbers
let inStock: boolean = true;    // only true or false

price = 12;          // fine: still a number
price = 'cheap';     // error: text in a number slot</pre>
<p>Read <code>let price: number = 9.5</code> aloud as "let price, which is a number, equal 9.5". Notice that the types are written in lowercase. <code>String</code> with a capital S means something different, so always use the lowercase names.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="Values tested against typed slots: matching values fit, a quoted 5 does not fit a number slot">
<g text-anchor="middle"><text class="t-s" x="70" y="22">value</text><text class="t-s" x="250" y="22">typed slot</text><text class="t-s" x="375" y="22">result</text></g>
<rect class="bx" x="20" y="38" width="100" height="40" rx="6"/><text class="t-m" x="70" y="63" text-anchor="middle">5</text>
<path class="ln" d="M120 58h46"/><polygon class="ah" points="164,52 164,64 172,58"/>
<rect class="bx-ok" x="175" y="38" width="150" height="40" rx="6"/><text class="t-m" x="250" y="63" text-anchor="middle">count: number</text>
<text class="t-b t-ok" x="375" y="63" text-anchor="middle">fits</text>
<rect class="bx" x="20" y="93" width="100" height="40" rx="6"/><text class="t-m" x="70" y="118" text-anchor="middle">'5'</text>
<path class="ln" d="M120 113h46"/><polygon class="ah" points="164,107 164,119 172,113"/>
<rect class="bx-bad" x="175" y="93" width="150" height="40" rx="6"/><text class="t-m" x="250" y="118" text-anchor="middle">count: number</text>
<text class="t-b t-bad" x="375" y="118" text-anchor="middle">error</text>
<rect class="bx" x="20" y="148" width="100" height="40" rx="6"/><text class="t-m" x="70" y="173" text-anchor="middle">true</text>
<path class="ln" d="M120 168h46"/><polygon class="ah" points="164,162 164,174 172,168"/>
<rect class="bx-ok" x="175" y="148" width="150" height="40" rx="6"/><text class="t-m" x="250" y="173" text-anchor="middle">done: boolean</text>
<text class="t-b t-ok" x="375" y="173" text-anchor="middle">fits</text>
<rect class="bx" x="20" y="203" width="100" height="40" rx="6"/><text class="t-m" x="70" y="228" text-anchor="middle">'Dune'</text>
<path class="ln" d="M120 223h46"/><polygon class="ah" points="164,217 164,229 172,223"/>
<rect class="bx-ok" x="175" y="203" width="150" height="40" rx="6"/><text class="t-m" x="250" y="228" text-anchor="middle">title: string</text>
<text class="t-b t-ok" x="375" y="228" text-anchor="middle">fits</text>
</svg><figcaption>Each variable is a slot with a shape. The number 5 fits a number slot, but the text '5' in quotes is a string, so the checker rejects it, even though it looks like a number to you.</figcaption></figure>

<h4>Inference: you don't have to label everything</h4>
<p>Writing a type on every line would get tiring, so TypeScript works many of them out for itself. This is called <b>type inference</b>. If you write <code>let price = 9.5</code>, the checker sees a number on the right and quietly decides that <code>price</code> is a number from now on. Later, <code>price = 'cheap'</code> is still an error, even though you never wrote <code>: number</code>.</p>
<p>So when should you write the type yourself? A good habit is: annotate the <b>edges</b>, meaning function inputs and outputs and the shapes of your data, and let inference handle simple local variables. In this lesson the tasks ask for explicit annotations so you practise the syntax.</p>

<h4>Reading a type error</h4>
<p>The starter file contains <code>let count: number = "5";</code>. Press Run and the Output shows a red cross, a line number and a message:</p>
<pre class="snip">✖ line 4: Type 'string' is not assignable to type 'number'.</pre>
<p>Decode it word by word. "Assignable" means "allowed to be stored in". So the sentence says: "a string is not allowed to be stored in something labelled number". The first type named is what you <b>gave</b>; the second is what was <b>expected</b>. The fix is to give the expected kind of value: remove the quotes so <code>5</code> is a real number. (Changing the label to <code>string</code> would also silence the error, but a count should be a number, so fix the value, not the label.)</p>
<div class="tip"><b>Tip</b>Almost every TypeScript error follows the pattern "X is not assignable to Y". Find X (what you have) and Y (what was wanted), and ask which one is wrong.</div>

<h4>Arrays and objects: describing the shape of data</h4>
<p>An <b>array</b> is a list. To say "a list of strings", write the type of one item followed by square brackets: <code>string[]</code>. A list of numbers is <code>number[]</code>.</p>
<pre class="snip">const tags: string[] = ['sci-fi', 'classic'];
tags.push(42);    // error: a number can't go in a list of strings</pre>
<p>An <b>object</b> groups several named values, like a product with a name and a price. You describe its shape once, give that description a name, and reuse it. The keyword <code>type</code> creates a <b>type alias</b>: a name for a shape.</p>
<pre class="snip">type Product = {
  name: string;     // every Product must have a text name
  price: number;    // and a numeric price
};

const book: Product = { name: 'Dune', price: 9.5 };   // fits</pre>
<p>Two things are easy to confuse here. <code>type Product = { ... }</code> describes a shape, and holds no data. <code>const book: Product = { ... }</code> creates a real object that must match that shape. The first uses semicolons between fields and types after the colons; the second uses commas and real values.</p>
<p>The checker now holds every Product to the shape. Leave out <code>price</code> and you get <i>Property 'price' is missing in type ... but required in type 'Product'</i>. Add a field the shape doesn't mention, like <code>colour: 'red'</code>, and you get <i>Object literal may only specify known properties</i>, which usually catches a typo.</p>
<p>You will also see <code>interface</code>, which does nearly the same job:</p>
<pre class="snip">interface Product {
  name: string;
  price: number;
}</pre>
<p>For describing objects, <code>type</code> and <code>interface</code> are interchangeable, and the lesson accepts either. Pick one style and stay consistent.</p>

<h4>Typing functions: inputs and outputs</h4>
<p>Functions are where types help most, because a function is a promise: "give me these things and I'll give you that". You label each <b>parameter</b> (an input the function receives) and the <b>return type</b> (what comes out), which goes after the closing bracket.</p>
<pre class="snip">function priceWithTax(price: number, rate: number): number {
  return price * (1 + rate);
}

priceWithTax(100, 0.2);      // 120
priceWithTax('100', 0.2);    // error: string given, number expected</pre>
<figure class="fig"><svg viewBox="0 0 420 205" role="img" aria-label="Two typed inputs flow into priceWithTax, which returns a number">
<rect class="bx-info" x="5" y="20" width="145" height="54" rx="6"/><text class="t-m" x="77" y="43" text-anchor="middle">price: number</text><text class="t-s" x="77" y="63" text-anchor="middle">e.g. 100</text>
<rect class="bx-info" x="5" y="110" width="145" height="54" rx="6"/><text class="t-m" x="77" y="133" text-anchor="middle">rate: number</text><text class="t-s" x="77" y="153" text-anchor="middle">e.g. 0.2</text>
<path class="ln" d="M150 47L176 76"/><polygon class="ah" points="170,78 179,72 181,84"/>
<path class="ln" d="M150 137L176 106"/><polygon class="ah" points="170,104 181,96 179,108"/>
<rect class="bx-a" x="182" y="62" width="130" height="56" rx="8"/><text class="t-b" x="247" y="88" text-anchor="middle">priceWithTax</text><text class="t-s" x="247" y="106" text-anchor="middle">price × (1 + rate)</text>
<path class="ln-ok" d="M312 90h18"/><polygon class="ah-ok" points="328,84 328,96 336,90"/>
<rect class="bx-ok" x="338" y="62" width="78" height="56" rx="6"/><text class="t-m" x="377" y="86" text-anchor="middle">number</text><text class="t-s" x="377" y="106" text-anchor="middle">120</text>
<text class="t-s" x="210" y="195" text-anchor="middle">the checker tests both inputs and the result</text>
</svg><figcaption>A typed function is a promise with labelled doors. Two numbers go in, one number comes out. If a caller pushes text through an input door, or the body returns the wrong kind of value, the checker flags it.</figcaption></figure>
<p>Let's walk through the call <code>priceWithTax(100, 0.2)</code> step by step:</p>
<ol>
<li>The checker matches arguments to parameters by position: 100 goes to <code>price</code>, 0.2 goes to <code>rate</code>. Both are numbers, so both fit.</li>
<li>Inside, <code>1 + rate</code> is 1.2, and <code>price * 1.2</code> is 120.</li>
<li>The result is a number, which matches the promised return type <code>: number</code>.</li>
</ol>
<p>If you had accidentally written <code>return 'total: ' + price</code>, the return type would catch it: <i>Type 'string' is not assignable to type 'number'</i>. If a caller passed <code>'100'</code>, the message would be <i>Argument of type 'string' is not assignable to parameter of type 'number'</i>. Same pattern, different place.</p>

<h4>Optional parameters with <code>?</code></h4>
<p>Sometimes an input is allowed to be missing. Put a question mark after the parameter's name to make it <b>optional</b>:</p>
<pre class="snip">function greet(name?: string): string {
  return 'Hello, ' + (name ?? 'friend') + '!';
}
greet('Ada');   // 'Hello, Ada!'
greet();        // 'Hello, friend!'</pre>
<p>When the caller leaves it out, <code>name</code> holds the special value <code>undefined</code>, which means "nothing was given". So inside the function, TypeScript treats <code>name</code> as "a string or undefined", and it will warn you if you use it as if it were definitely a string. The <code>??</code> operator, called <b>nullish coalescing</b>, handles that: <code>name ?? 'friend'</code> means "use <code>name</code>, but if it is undefined (or null), use <code>'friend'</code> instead".</p>
<div class="mistake"><b>Common mistake</b>Using <code>||</code> instead of <code>??</code> for defaults. <code>||</code> also replaces empty text, 0 and false, because JavaScript treats those as "falsy". For a name it barely matters, but <code>quantity || 1</code> turns a real quantity of 0 into 1. <code>??</code> only steps in when the value is truly missing.</div>

<h4>Types disappear when the code runs</h4>
<p>Browsers and Node.js only understand plain JavaScript. So before your code runs, a build step removes every type annotation, and what is left is ordinary JavaScript. This is why people say types are "erased".</p>
<figure class="fig"><svg viewBox="0 0 420 175" role="img" aria-label="Pipeline: write TypeScript, check it, strip the types, run JavaScript">
<rect class="bx-info" x="5" y="15" width="90" height="56" rx="6"/><text class="t-b" x="50" y="40" text-anchor="middle">Write</text><text class="t-s" x="50" y="60" text-anchor="middle">app.ts</text>
<path class="ln" d="M95 43h12"/><polygon class="ah" points="105,37 105,49 112,43"/>
<rect class="bx-a" x="113" y="15" width="90" height="56" rx="6"/><text class="t-b" x="158" y="40" text-anchor="middle">Check</text><text class="t-s" x="158" y="60" text-anchor="middle">errors here</text>
<path class="ln" d="M203 43h12"/><polygon class="ah" points="213,37 213,49 220,43"/>
<rect class="bx-warn" x="221" y="15" width="90" height="56" rx="6"/><text class="t-b" x="266" y="40" text-anchor="middle">Strip</text><text class="t-s" x="266" y="60" text-anchor="middle">types gone</text>
<path class="ln" d="M311 43h12"/><polygon class="ah" points="321,37 321,49 328,43"/>
<rect class="bx-ok" x="329" y="15" width="86" height="56" rx="6"/><text class="t-b" x="372" y="40" text-anchor="middle">Run</text><text class="t-s" x="372" y="60" text-anchor="middle">app.js</text>
<rect class="bx-dark" x="10" y="100" width="185" height="40" rx="6"/><text class="t-term" x="102" y="125" text-anchor="middle">let n: number = 1;</text>
<path class="ln-a" d="M200 120h22"/><polygon class="ah-a" points="220,114 220,126 228,120"/>
<rect class="bx-dark" x="232" y="100" width="183" height="40" rx="6"/><text class="t-term" x="323" y="125" text-anchor="middle">let n = 1;</text>
<text class="t-s" x="102" y="162" text-anchor="middle">what you write</text><text class="t-s" x="323" y="162" text-anchor="middle">what actually runs</text>
</svg><figcaption>TypeScript checks your code, then the types are removed. The browser only ever sees the plain JavaScript on the right, so types protect you while you write and build, not while the program runs.</figcaption></figure>
<p>One consequence: TypeScript cannot check data that only arrives while the program is running, such as what a user types or what a server sends back. Your labels describe what you <i>expect</i>. Checking real incoming data needs ordinary code, or a validation library you will meet later.</p>
<div class="mistake"><b>Common mistake</b>Reaching for the type <code>any</code> to make an error go away. <code>any</code> switches the checker off for that value, so it hides the bug instead of fixing it. Read the message and fix the value or the label instead.</div>

<div class="try"><b>Try it in your head</b>Which of these lines cause errors? (a) <code>let done: boolean = 'false';</code> (b) <code>const prices: number[] = [3, 4.5];</code> (c) <code>const p: Product = { name: 'Dune' };</code> using the Product type above. Answer: (a) is an error, because <code>'false'</code> in quotes is a string. (b) is fine, since both items are numbers. (c) is an error, because <code>price</code> is missing.</div>

<h4>Recap</h4>
<ul>
<li>TypeScript is JavaScript plus types, checked before the code runs. The basic types are <code>string</code>, <code>number</code> and <code>boolean</code>.</li>
<li>Annotate with a colon: <code>let title: string</code>. TypeScript also infers types from values.</li>
<li>Lists are <code>string[]</code> or <code>number[]</code>. Name an object's shape with <code>type Product = { ... }</code> or <code>interface</code>.</li>
<li>Functions label each parameter and the return type: <code>function f(a: number): number</code>. A <code>?</code> makes a parameter optional, and <code>??</code> supplies a default.</li>
<li>Read errors as "what you gave is not assignable to what was expected". Types are erased before the code runs.</li>
</ul>
`);

explain('n1',`
<h4>Where this lesson picks up</h4>
<p>In the basics lesson you labelled values with <code>string</code>, <code>number</code> and <code>boolean</code>, described objects with <code>type</code> or <code>interface</code>, and typed a function's inputs and output. That covers simple code. Real programs bring three harder questions:</p>
<ul>
<li>How do I type a function that works on <i>any</i> kind of list, without losing track of what is inside?</li>
<li>How do I describe a value that can be one of several different shapes, like "a success or a failure"?</li>
<li>How does TypeScript know which shape I have at a given moment?</li>
</ul>
<p>The answers are <b>generics</b>, <b>union types</b> and <b>narrowing</b>. They are what make TypeScript feel clever rather than fussy. This editor runs the real TypeScript compiler in <b>strict mode</b>, the setting professional projects use, where the checker is as careful as it can be.</p>

<h4>Step 1: type the data, then the function</h4>
<p>The starter file begins with an interface describing one item in a shopping cart:</p>
<pre class="snip">interface Item {
  name: string;
  price: number;
  qty: number;      // quantity: how many of this item
}
const cart: Item[] = [ ... ];   // a list of Items</pre>
<p><code>Item[]</code> means "a list where every entry is an Item". One entry has <code>price: '19'</code>, in quotes, so the checker says <i>Type 'string' is not assignable to type 'number'</i> and points at that line. You have seen that message before: what you gave (a string) does not fit what was promised (a number).</p>
<p>Next is <code>function total(items)</code>, with no types at all. In strict mode that is itself an error: <i>Parameter 'items' implicitly has an 'any' type</i>. The type <code>any</code> means "anything goes, don't check", and strict mode refuses to let it sneak in silently. So you label the parameter as <code>Item[]</code> and the result as <code>number</code>.</p>
<p>To add up the cart you can use <code>reduce</code>, an array method that walks through a list and carries a running total along. It takes a function <code>(sum, item) =&gt; ...</code> and a starting value, here <code>0</code>. Here is how it works through the cart, one step at a time:</p>
<div class="tbl-wrap"><table><tr><th>Step</th><th>sum before</th><th>item</th><th>price × qty</th><th>sum after</th></tr>
<tr><td>start</td><td>0</td><td></td><td></td><td>0</td></tr>
<tr><td>1</td><td>0</td><td>Keyboard</td><td>49 × 1 = 49</td><td>49</td></tr>
<tr><td>2</td><td>49</td><td>Mouse</td><td>19 × 2 = 38</td><td>87</td></tr></table></div>
<p>The final value, 87, is what <code>reduce</code> returns. A plain <code>for</code> loop with a <code>let sum = 0</code> works just as well. Notice that inside the callback you never had to label <code>item</code>: because <code>items</code> is an <code>Item[]</code>, TypeScript <b>infers</b> that each <code>item</code> is an Item, and it would warn you if you mistyped <code>item.prise</code>.</p>

<h4>Generics: a function with a blank to fill in</h4>
<p>Now imagine a helper that returns the first entry of a list. You want it to work for lists of numbers, lists of strings, lists of Items, anything. How do you type the parameter?</p>
<ul>
<li>Write <code>number[]</code> and it only works for numbers.</li>
<li>Write <code>any[]</code> and it works for everything, but the result is <code>any</code>, so the checker forgets what came out. You've switched off the safety net.</li>
</ul>
<p>A <b>generic</b> solves this. You give the function a <b>type parameter</b>, a placeholder name for "whatever type the caller uses", written in angle brackets. By convention it is called <code>T</code>, for "type".</p>
<pre class="snip">function first&lt;T&gt;(list: T[]): T | undefined {
  return list[0];
}
// read it as: "for some type T, take a list of T,
// and return a T, or undefined"</pre>
<p>A type parameter works like an ordinary function parameter, but for types. When you call <code>first([3, 4])</code>, TypeScript looks at the argument, sees a list of numbers, and fills in <code>T = number</code> everywhere <code>T</code> appears. You don't write it yourself; it is inferred.</p>
<figure class="fig"><svg viewBox="0 0 420 270" role="img" aria-label="The type parameter T is filled in from the argument and flows through to the return type">
<rect class="bx-dark" x="40" y="10" width="340" height="40" rx="6"/><text class="t-term" x="210" y="35" text-anchor="middle">first&lt;T&gt;(list: T[]): T | undefined</text>
<text class="t-b" x="105" y="80" text-anchor="middle">call 1</text><text class="t-b" x="315" y="80" text-anchor="middle">call 2</text>
<rect class="bx-info" x="15" y="92" width="180" height="40" rx="6"/><text class="t-m" x="105" y="117" text-anchor="middle">first([3, 4])</text>
<rect class="bx-info" x="225" y="92" width="180" height="40" rx="6"/><text class="t-m" x="315" y="117" text-anchor="middle">first(['x'])</text>
<path class="ln" d="M105 132v14"/><polygon class="ah" points="99,144 111,144 105,152"/>
<path class="ln" d="M315 132v14"/><polygon class="ah" points="309,144 321,144 315,152"/>
<rect class="bx-a" x="15" y="154" width="180" height="40" rx="6"/><text class="t-m t-a" x="105" y="179" text-anchor="middle">T = number</text>
<rect class="bx-a" x="225" y="154" width="180" height="40" rx="6"/><text class="t-m t-a" x="315" y="179" text-anchor="middle">T = string</text>
<path class="ln-ok" d="M105 194v14"/><polygon class="ah-ok" points="99,206 111,206 105,214"/>
<path class="ln-ok" d="M315 194v14"/><polygon class="ah-ok" points="309,206 321,206 315,214"/>
<rect class="bx-ok" x="5" y="216" width="200" height="40" rx="6"/><text class="t-m" x="105" y="241" text-anchor="middle">number | undefined</text>
<rect class="bx-ok" x="215" y="216" width="200" height="40" rx="6"/><text class="t-m" x="315" y="241" text-anchor="middle">string | undefined</text>
</svg><figcaption>One generic function, two calls. The argument decides what T is, and that choice flows through to the return type, so the result keeps an exact type instead of becoming "anything".</figcaption></figure>
<div class="analogy"><b>Think of it like</b>A labelled storage box. A plain box loses track of what you put in it, and you have to guess when you open it. A generic box has a label slot: put in socks and the label says "socks", so whoever opens it later knows exactly what they will find.</div>

<h4>Union types: "this or that"</h4>
<p>Look at the return type again: <code>T | undefined</code>. The vertical bar means "or". This is a <b>union type</b>: a value that may be any one of several types. Why include <code>undefined</code>? Because <code>first([])</code>, on an empty list, has nothing to return, and in JavaScript reading <code>list[0]</code> of an empty list gives <code>undefined</code>. Writing <code>T | undefined</code> is honest: it forces whoever calls <code>first</code> to deal with the "nothing there" case.</p>
<p>Unions also work for whole object shapes. The lesson's <code>Result</code> type says a result is <i>either</i> a success with a value <i>or</i> a failure with an error message:</p>
<pre class="snip">type Result =
  | { ok: true;  value: number }    // success shape
  | { ok: false; error: string };   // failure shape</pre>
<p>Notice <code>ok: true</code>. That is not <code>boolean</code>; it is the exact value <code>true</code>, a <b>literal type</b>. So the success shape always has <code>ok</code> equal to true, and the failure shape always has it false. A shared field like this, whose value tells the shapes apart, is called a <b>discriminant</b>, and the whole pattern is a <b>discriminated union</b>. You will see it everywhere: API responses, form states, loading states.</p>

<h4>Narrowing: TypeScript follows your <code>if</code></h4>
<p>Inside <code>describe(r: Result)</code>, you can't simply write <code>r.value</code>. The checker objects: <i>Property 'value' does not exist on type 'Result'</i>. That is correct. If <code>r</code> is a failure, there is no value to read.</p>
<p>The fix is to check the discriminant first. TypeScript reads your <code>if</code> and <b>narrows</b> the type: inside the branch it knows which shape you have.</p>
<figure class="fig"><svg viewBox="0 0 420 255" role="img" aria-label="An if check on r.ok splits the Result union into the success shape and the failure shape">
<rect class="bx" x="110" y="10" width="200" height="44" rx="8"/><text class="t-m" x="210" y="37" text-anchor="middle">r: Result</text>
<path class="ln" d="M210 54v16"/><polygon class="ah" points="204,68 216,68 210,76"/>
<rect class="bx-a" x="130" y="78" width="160" height="40" rx="8"/><text class="t-m" x="210" y="103" text-anchor="middle">if (r.ok)</text>
<path class="ln-ok" d="M150 118L100 150"/><polygon class="ah-ok" points="98,143 106,153 94,155"/>
<path class="ln" d="M270 118L320 150"/><polygon class="ah" points="314,153 322,143 326,155"/>
<text class="t-s t-ok" x="105" y="130" text-anchor="middle">true</text><text class="t-s" x="318" y="130" text-anchor="middle">false</text>
<rect class="bx-ok" x="10" y="158" width="190" height="84" rx="8"/>
<text class="t-b" x="105" y="182" text-anchor="middle">success shape</text>
<text class="t-m" x="105" y="206" text-anchor="middle">r.value ✓</text><text class="t-m t-bad" x="105" y="228" text-anchor="middle">r.error ✗</text>
<rect class="bx-warn" x="220" y="158" width="190" height="84" rx="8"/>
<text class="t-b" x="315" y="182" text-anchor="middle">failure shape</text>
<text class="t-m" x="315" y="206" text-anchor="middle">r.error ✓</text><text class="t-m t-bad" x="315" y="228" text-anchor="middle">r.value ✗</text>
</svg><figcaption>Before the check, r could be either shape, so neither value nor error is safe to read. After checking r.ok, each branch knows exactly one shape, and only that shape's fields are allowed.</figcaption></figure>
<pre class="snip">function describe(r: Result): string {
  if (r.ok) {
    // here r is { ok: true; value: number }
    return 'Value: ' + r.value;
  }
  // here r can only be { ok: false; error: string }
  return 'Error: ' + r.error;
}</pre>
<p>Walk through <code>describe({ ok: false, error: 'boom' })</code>: <code>r.ok</code> is false, so the <code>if</code> body is skipped. Every success would already have returned inside the <code>if</code>, so the only shape left is the failure, so <code>r.error</code> is allowed, and the function returns <code>'Error: boom'</code>.</p>
<p>Narrowing works with other checks too. <code>typeof x === 'string'</code> narrows <code>string | number</code> down to string, and <code>if (item !== undefined)</code> narrows <code>Item | undefined</code> down to Item. That is how you safely use the result of <code>first</code>.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>if (r.value)</code> to test for success. On the union, <code>value</code> is not guaranteed to exist, so that is an error. Even if it compiled, a real value of <code>0</code> counts as false in JavaScript, and a success would be reported as a failure. Check the discriminant, <code>r.ok</code>, instead.</div>
<div class="mistake"><b>Common mistake</b>Writing <code>function first(list: T[])</code> without the <code>&lt;T&gt;</code> after the name. The checker answers <i>Cannot find name 'T'</i>: a type parameter must be declared in angle brackets before you use it, just as a normal parameter must be listed in the brackets.</div>

<div class="try"><b>Try it in your head</b>What type does <code>first(cart)</code> have, using the cart above? And in <code>if (r.ok) { ... } else { ... }</code>, which field may you read in the else branch? Answer: <code>Item | undefined</code>, because T is filled in as Item. In the else branch r is the failure shape, so only <code>r.error</code> is allowed.</div>

<h4>Recap</h4>
<ul>
<li>Strict mode rejects untyped parameters (<i>implicitly has an 'any' type</i>). Type the edges: <code>total(items: Item[]): number</code>.</li>
<li>A generic <code>&lt;T&gt;</code> is a type parameter. The caller's argument fills it in, and it flows through to the result.</li>
<li><code>A | B</code> is a union: one of several types. <code>T | undefined</code> honestly says "might be nothing".</li>
<li>A discriminated union uses a shared literal field, like <code>ok: true</code> or <code>ok: false</code>, to tell shapes apart.</li>
<li>Narrowing: after <code>if (r.ok)</code>, TypeScript knows which shape you have and only allows its fields.</li>
</ul>
`);

explain('n2',`
<h4>Why React and TypeScript fit so well</h4>
<p>From the Frontend track you know that a React <b>component</b> is a function that returns a piece of page, and that <b>props</b> are the inputs you hand it, written like HTML attributes: <code>&lt;Button label="Add one" /&gt;</code>. Props are exactly where React apps break. Someone passes <code>lable</code> instead of <code>label</code>, forgets a required prop, or passes a number where text was expected, and the button silently renders empty.</p>
<p>A component is just a function, and props are just its input object. You already know how to type a function's input: describe its shape. Do that for props and your editor knows every prop each component accepts. It autocompletes them, and it underlines mistakes the moment you type them, in every file that uses the component.</p>
<p>React files that contain TypeScript end in <code>.tsx</code>: TypeScript plus JSX, the HTML-like syntax inside your JavaScript.</p>

<h4>Typing props with an interface</h4>
<p>The starter's <code>Button</code> takes <code>{ label, onClick }</code> with no types. That curly-brace syntax is <b>destructuring</b>: it pulls the <code>label</code> and <code>onClick</code> fields out of the props object into variables. To type it, describe the props object, then put the type after the closing curly brace:</p>
<pre class="snip">interface ButtonProps {
  label: string;          // the text on the button
  onClick: () =&gt; void;    // a function: no inputs, returns nothing useful
}

function Button({ label, onClick }: ButtonProps) {
  return &lt;button onClick={onClick}&gt;{label}&lt;/button&gt;;
}</pre>
<p>The new piece is <code>() =&gt; void</code>, which is the type of a function. The empty brackets say it takes no inputs, and <code>void</code> says "this returns nothing I care about". The arrow <code>() =&gt; setClicks(clicks + 1)</code> that <code>App</code> passes in fits that shape, so the checker accepts it.</p>
<figure class="fig"><svg viewBox="0 0 420 235" role="img" aria-label="App passes typed props down to Button, and Button calls onClick to send the click back up">
<rect class="bx-info" x="110" y="10" width="200" height="60" rx="8"/><text class="t-b" x="210" y="36" text-anchor="middle">App</text><text class="t-s" x="210" y="56" text-anchor="middle">state: clicks</text>
<rect class="bx-a" x="110" y="160" width="200" height="60" rx="8"/><text class="t-b" x="210" y="186" text-anchor="middle">Button</text><text class="t-s" x="210" y="206" text-anchor="middle">props: ButtonProps</text>
<path class="ln" d="M150 70v80"/><polygon class="ah" points="144,148 156,148 150,156"/>
<text class="t-s" x="140" y="105" text-anchor="end">props down:</text><text class="t-s" x="140" y="125" text-anchor="end">label, onClick</text>
<path class="ln-ok" d="M270 160v-80"/><polygon class="ah-ok" points="264,82 276,82 270,74"/>
<text class="t-s t-ok" x="280" y="105">click calls</text><text class="t-s t-ok" x="280" y="125">onClick()</text>
</svg><figcaption>Data flows down as props, checked against ButtonProps. Events flow back up: when the button is clicked it calls the onClick function App gave it, App adds one to its state, and React redraws the page.</figcaption></figure>
<p>Now try using it wrongly in your head. <code>&lt;Button onClick={...} /&gt;</code> without a label gives <i>Property 'label' is missing in type ... but required in type 'ButtonProps'</i>. <code>&lt;Button label={42} ... /&gt;</code> gives <i>Type 'number' is not assignable to type 'string'</i>. Same messages as before, now about props.</p>

<h4>Optional props and string literal unions</h4>
<p>The second task adds a <code>variant</code> prop that picks a look: a filled "primary" button or a see-through "ghost" button. You could type it as <code>string</code>, but then <code>variant="gohst"</code> would be accepted and silently fall back to the wrong look. Instead, list the only allowed values as a union of <b>string literal types</b>, exact pieces of text:</p>
<pre class="snip">interface ButtonProps {
  label: string;
  onClick: () =&gt; void;
  variant?: 'primary' | 'ghost';   // optional, and only these two
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  const look = variant === 'primary'
    ? { background: '#6A58CF', color: 'white' }
    : { background: 'transparent', color: '#6A58CF' };
  ...
}</pre>
<p>Three ideas are packed in there:</p>
<ol>
<li>The <code>?</code> makes the prop optional, just like an optional function parameter.</li>
<li><code>'primary' | 'ghost'</code> means the value must be exactly one of those two strings. Your editor now offers both in a dropdown, and <code>variant="danger"</code> fails with <i>Type '"danger"' is not assignable to type '"primary" | "ghost" | undefined'</i>. The type documents the component for the next developer.</li>
<li><code>variant = 'primary'</code> inside the destructuring is a <b>default value</b>: when the parent leaves the prop out, the component uses <code>'primary'</code>.</li>
</ol>
<p>The <code>condition ? a : b</code> expression, called the <b>ternary</b> operator, picks one of two style objects. Then <code>&lt;Button label="Reset" variant="ghost" onClick={() =&gt; setClicks(0)} /&gt;</code> renders a second, different-looking button. Many projects give the union a name, <code>type Variant = 'primary' | 'ghost'</code>, and write <code>variant?: Variant</code>. That works the same.</p>

<h4>Generic components</h4>
<p>In the previous lesson, <code>first&lt;T&gt;</code> worked on a list of anything while keeping track of the item type. Components can be generic too. A <code>List</code> component should render a list of users, products or messages, and the function that draws each item should know exactly what it receives.</p>
<pre class="snip">interface ListProps&lt;T&gt; {
  items: T[];                               // a list of some type T
  render: (item: T) =&gt; React.ReactNode;     // draws one T
}

function List&lt;T&gt;({ items, render }: ListProps&lt;T&gt;) {
  return &lt;ul&gt;{items.map((item, i) =&gt; &lt;li key={i}&gt;{render(item)}&lt;/li&gt;)}&lt;/ul&gt;;
}</pre>
<p><code>React.ReactNode</code> is React's type for "anything React can draw": JSX, text, a number, <code>null</code> for nothing, or a list of those. It is also the type you will see for <code>children</code>, the content placed between a component's opening and closing tags.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="Users flow into List, which fills T with User, so render receives a User">
<rect class="bx-info" x="10" y="15" width="160" height="50" rx="8"/><text class="t-m" x="90" y="45" text-anchor="middle">users: User[]</text>
<path class="ln" d="M170 40h22"/><polygon class="ah" points="190,34 190,46 198,40"/>
<rect class="bx-a" x="200" y="15" width="210" height="50" rx="8"/><text class="t-m" x="305" y="38" text-anchor="middle">&lt;List items=...&gt;</text><text class="t-s t-a" x="305" y="57" text-anchor="middle">T is filled in as User</text>
<path class="ln" d="M305 65v22"/><polygon class="ah" points="299,85 311,85 305,93"/>
<rect class="bx-a" x="140" y="95" width="270" height="50" rx="8"/><text class="t-m" x="275" y="125" text-anchor="middle">render: (item: User) =&gt; ...</text>
<path class="ln-ok" d="M275 145v22"/><polygon class="ah-ok" points="269,165 281,165 275,173"/>
<rect class="bx-ok" x="140" y="175" width="270" height="60" rx="8"/><text class="t-m" x="275" y="200" text-anchor="middle">u.name ✓  u.age ✗</text><text class="t-s" x="275" y="222" text-anchor="middle">only real User fields allowed</text>
</svg><figcaption>Passing a list of Users fills in T as User. That type flows into the render function, so inside it the editor knows u is a User and rejects fields a User does not have.</figcaption></figure>
<p>When you write <code>&lt;List items={users} render={(u) =&gt; &lt;b&gt;{u.name}&lt;/b&gt;} /&gt;</code>, TypeScript infers <code>T = User</code> from <code>items</code>, so <code>u</code> is a User without you writing a single annotation.</p>
<div class="tip"><b>Tip</b>Write generic components as <code>function List&lt;T&gt;(...)</code>, as here. In a <code>.tsx</code> file, an arrow function written <code>&lt;T&gt;(props) =&gt; ...</code> can be mistaken for a JSX tag; the usual workaround is <code>&lt;T,&gt;</code> with a comma.</div>

<h4>Typing state with <code>useState</code></h4>
<p><code>useState(0)</code> already infers a number from its starting value, so <code>useState&lt;number&gt;(0)</code> just says the same thing out loud. Writing the type in angle brackets matters when the starting value doesn't tell the whole story. A user who hasn't loaded yet starts as <code>null</code>, and you want the state to accept a User later:</p>
<pre class="snip">const [clicks, setClicks] = useState&lt;number&gt;(0);
const [user, setUser] = useState&lt;User | null&gt;(null);
// without the type, TypeScript would decide the state can only ever be null</pre>
<p>Yes, <code>useState</code> is generic, exactly like <code>first&lt;T&gt;</code>.</p>

<h4>Who actually checks the types here?</h4>
<p>This preview compiles your TSX with Babel, a tool that <b>strips</b> the types and runs what is left, without checking anything. Next.js does the same in development, with its own fast compiler. Stripping is quick, which is why the page reloads instantly. So in this lesson a type mistake will not stop the preview working.</p>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="App.tsx goes two ways: a fast compiler strips types and runs, while tsc checks types and reports errors">
<rect class="bx" x="135" y="10" width="150" height="44" rx="8"/><text class="t-m" x="210" y="37" text-anchor="middle">App.tsx</text>
<path class="ln" d="M175 54L110 92"/><polygon class="ah" points="108,85 115,95 103,97"/>
<path class="ln" d="M245 54L310 92"/><polygon class="ah" points="305,95 312,85 317,97"/>
<rect class="bx-warn" x="10" y="98" width="190" height="62" rx="8"/><text class="t-b" x="105" y="123" text-anchor="middle">Strip only</text><text class="t-s" x="105" y="145" text-anchor="middle">preview, next dev</text>
<rect class="bx-ok" x="220" y="98" width="190" height="62" rx="8"/><text class="t-b" x="315" y="123" text-anchor="middle">Check types</text><text class="t-s" x="315" y="145" text-anchor="middle">editor, tsc, next build</text>
<text class="t-s" x="105" y="190" text-anchor="middle">fast, catches nothing</text><text class="t-s" x="315" y="190" text-anchor="middle">slower, reports errors</text>
</svg><figcaption>The same file is handled two ways. Fast compilers only strip the types so the page runs. The type checker, in your editor, in tsc and inside next build, is what actually reports type errors.</figcaption></figure>
<p>The checks come from the real TypeScript checker: your editor runs it as you type, <code>npx tsc --noEmit</code> runs it across the project without producing files, and <code>next build</code> runs it before every production build and fails the build on errors. Teams also run it in CI, the automatic checks on every change.</p>
<div class="mistake"><b>Common mistake</b>Typing the props object in the wrong place: <code>function Button({ label: string })</code>. Inside destructuring, a colon means "rename", so that renames <code>label</code> to a variable called <code>string</code>. The type always goes after the whole pattern: <code>({ label }: ButtonProps)</code>.</div>

<div class="try"><b>Try it in your head</b>With the final ButtonProps, which of these is an error? (a) <code>&lt;Button label="Hi" onClick={() =&gt; {}} /&gt;</code> (b) <code>&lt;Button label="Hi" variant="ghost" /&gt;</code> (c) <code>&lt;Button label="Hi" onClick={() =&gt; {}} variant="Ghost" /&gt;</code>. Answer: (a) is fine, since variant is optional. (b) is missing the required onClick. (c) fails because "Ghost" with a capital G is not one of the allowed strings.</div>

<h4>Recap</h4>
<ul>
<li>Describe props with an interface and annotate the parameter: <code>({ label, onClick }: ButtonProps)</code>.</li>
<li><code>() =&gt; void</code> types a callback. <code>variant?: 'primary' | 'ghost'</code> is optional and limited to exact values, with a default in the destructuring.</li>
<li>Generic components like <code>List&lt;T&gt;</code> keep item types flowing into render functions. <code>React.ReactNode</code> means "anything React can draw".</li>
<li><code>useState&lt;User | null&gt;(null)</code> sets the state type when the starting value can't.</li>
<li>Fast compilers only strip types. The editor, <code>tsc --noEmit</code> and <code>next build</code> do the checking.</li>
</ul>
`);

explain('n3',`
<h4>What Next.js adds to React</h4>
<p>React draws components, but a real website needs more: many pages at different addresses, a shared header on every page, data loaded on the server, and a way to build it all for production. <b>Next.js</b> is a <b>framework</b> built on React that supplies those parts. A framework is a ready-made structure you fill in, as opposed to a library you call yourself.</p>
<p>The first job is <b>routing</b>: deciding which page to show for which address. An address like <code>https://example.com/blog/hello-world</code> has a <b>path</b>, the part after the domain: <code>/blog/hello-world</code>. Each piece between slashes is a <b>segment</b>, so this path has two segments, <code>blog</code> and <code>hello-world</code>. A <b>route</b> is a path your app knows how to answer.</p>
<p>Modern Next.js uses the <b>App Router</b>. Its big idea is that you don't write a list of routes anywhere. Your folders <i>are</i> the routes.</p>
<div class="analogy"><b>Think of it like</b>A filing cabinet where the drawer labels spell out the address. To find <code>/blog/hello-world</code>, open the <code>blog</code> drawer, then the folder for that post, and read the page inside.</div>

<h4>Folders are segments, <code>page.tsx</code> makes them visible</h4>
<p>Everything lives in a folder called <code>app</code>. Two rules do almost all the work:</p>
<ol>
<li>Each folder inside <code>app</code> adds one segment to the path.</li>
<li>A folder only becomes a page people can visit when it contains a file named exactly <code>page.tsx</code>. That file's <b>default export</b> (the component after <code>export default</code>) is what gets drawn.</li>
</ol>
<figure class="fig"><svg viewBox="0 0 420 290" role="img" aria-label="Folder tree under app mapped to the URLs it creates">
<path class="ln" d="M30 38V268"/>
<path class="ln" d="M30 60h12M30 90h12M30 120h12M30 180h12M30 268h12"/>
<path class="ln" d="M55 128V150h12"/><path class="ln" d="M55 188V210h12"/><path class="ln" d="M80 218V240h12"/>
<g class="t-m"><text class="t-m t-b" x="20" y="30">app/</text>
<text class="t-m" x="45" y="65">layout.tsx</text>
<text class="t-m" x="45" y="95">page.tsx</text>
<text class="t-m" x="45" y="125">about/</text>
<text class="t-m" x="70" y="155">page.tsx</text>
<text class="t-m" x="45" y="185">blog/</text>
<text class="t-m" x="70" y="215">[slug]/</text>
<text class="t-m" x="95" y="245">page.tsx</text>
<text class="t-m" x="45" y="273">not-found.tsx</text></g>
<path class="ln-d" d="M150 60h100M130 90h120M155 150h95M180 240h70M175 268h75"/>
<text class="t-s" x="258" y="65">frame for all pages</text>
<text class="t-m t-a" x="258" y="95">/</text>
<text class="t-m t-a" x="258" y="155">/about</text>
<text class="t-m t-a" x="258" y="245">/blog/anything</text>
<text class="t-s" x="258" y="273">any unknown URL</text>
</svg><figcaption>The folder tree is the website's map. Each page.tsx becomes a URL made from the folder names above it. Folders such as blog on their own add a segment but are not pages. Square brackets mark a segment that can be anything.</figcaption></figure>
<p>So the first task is just a new file. Create <code>app/about/page.tsx</code>:</p>
<pre class="snip">// app/about/page.tsx  →  /about
export default function About() {
  return &lt;h1&gt;About me&lt;/h1&gt;;
}</pre>
<p>The function's name doesn't matter to the router; only the folder path and the file name do. You never import this component anywhere. Next.js finds it because of where it lives.</p>

<h4>Layouts: the frame around every page</h4>
<p>Most sites repeat the same header and navigation on every page. Copying it into each page would be tedious and easy to get wrong. A <b>layout</b> is a component that wraps pages. It receives the current page as a prop called <code>children</code> and decides where to place it:</p>
<pre class="snip">// app/layout.tsx: the root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    &lt;html lang="en"&gt;
      &lt;body&gt;
        &lt;nav&gt;...links go here...&lt;/nav&gt;
        {children}      {/* the current page is drawn here */}
      &lt;/body&gt;
    &lt;/html&gt;
  );
}</pre>
<p>The layout in <code>app/</code> is the <b>root layout</b>. It is required, and it is the only place that writes the <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code> tags. Layouts can also nest: a <code>layout.tsx</code> inside <code>app/blog/</code> wraps only the blog pages, inside the root layout.</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="Nested layouts: the root layout wraps the blog layout, which wraps the page">
<rect class="bx-info" x="10" y="10" width="400" height="220" rx="10"/>
<text class="t-b t-info" x="25" y="34">app/layout.tsx</text><text class="t-s" x="395" y="34" text-anchor="end">html, body, nav</text>
<rect class="bx-warn" x="35" y="50" width="350" height="160" rx="10"/>
<text class="t-b" x="50" y="74">app/blog/layout.tsx</text><text class="t-s" x="370" y="74" text-anchor="end">sidebar</text>
<rect class="bx-ok" x="60" y="90" width="300" height="100" rx="10"/>
<text class="t-b" x="210" y="130" text-anchor="middle">blog/[slug]/page.tsx</text>
<text class="t-s" x="210" y="155" text-anchor="middle">the content that changes</text>
</svg><figcaption>Visiting a blog post draws three components inside each other. The root layout is the outer frame, the blog layout sits in its children slot, and the page sits in the blog layout's children slot. Moving between posts only swaps the innermost box.</figcaption></figure>
<p>When you move from one page to another, Next.js keeps the layouts on screen and swaps only the page inside them. Anything in a layout, like a search box someone is typing in, stays exactly as it was.</p>

<h4>Moving between pages with <code>Link</code></h4>
<p>A normal HTML link, <code>&lt;a href="/about"&gt;</code>, makes the browser throw away the whole page and download a new one: a full reload. Next.js gives you a <code>Link</code> component that does better:</p>
<pre class="snip">import Link from 'next/link';

&lt;nav&gt;
  &lt;Link href="/"&gt;Home&lt;/Link&gt;
  &lt;Link href="/about"&gt;About&lt;/Link&gt;
&lt;/nav&gt;</pre>
<p><code>Link</code> still renders a real <code>&lt;a&gt;</code> tag, so it works for keyboards, screen readers and search engines. But when it is clicked, Next.js fetches just the new page's content and swaps it in without a reload. That is called <b>client-side navigation</b>. In a production build it also <b>prefetches</b>: it starts loading pages whose links are visible on screen before they are clicked, so navigation feels instant. Put the <code>&lt;nav&gt;</code> in the root layout, above <code>{children}</code>, and every page gets it.</p>

<h4>Dynamic segments: one file, many URLs</h4>
<p>A blog might have hundreds of posts. You don't want a folder per post. Instead, name a folder with square brackets, like <code>[slug]</code>. That is a <b>dynamic segment</b>: it matches <i>any</i> value in that position, and Next.js hands you the actual value. A <b>slug</b> is the readable, URL-friendly name of an item, such as <code>hello-world</code>.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="The URL /blog/hello-world matched against the folders blog and [slug], producing params.slug">
<text class="t-s" x="10" y="38">URL</text>
<rect class="bx-info" x="70" y="15" width="130" height="38" rx="6"/><text class="t-m" x="135" y="39" text-anchor="middle">blog</text>
<rect class="bx-info" x="215" y="15" width="190" height="38" rx="6"/><text class="t-m" x="310" y="39" text-anchor="middle">hello-world</text>
<path class="ln" d="M135 53v20"/><path class="ln" d="M310 53v20"/>
<text class="t-s" x="10" y="101">folders</text>
<rect class="bx" x="70" y="78" width="130" height="38" rx="6"/><text class="t-m" x="135" y="102" text-anchor="middle">blog/</text>
<rect class="bx-a" x="215" y="78" width="190" height="38" rx="6"/><text class="t-m" x="310" y="102" text-anchor="middle">[slug]/</text>
<text class="t-s t-ok" x="143" y="68">exact match</text>
<path class="ln-a" d="M310 116v22"/><polygon class="ah-a" points="304,136 316,136 310,144"/>
<rect class="bx-ok" x="150" y="146" width="255" height="40" rx="6"/><text class="t-m" x="277" y="171" text-anchor="middle">slug: 'hello-world'</text>
<text class="t-s" x="10" y="171">params</text>
</svg><figcaption>Next.js lines up the URL's segments with the folders. The blog segment must match exactly. The bracketed folder accepts anything, and the value it caught, hello-world, is handed to the page as params.slug.</figcaption></figure>
<p>The page receives an object called <code>params</code> holding the caught values, named after the folder:</p>
<pre class="snip">// app/blog/[slug]/page.tsx   (style used in this sandbox)
export default function BlogPost({ params }: { params: { slug: string } }) {
  return &lt;h1&gt;Post: {params.slug}&lt;/h1&gt;;
}</pre>
<p>Visit <code>/blog/hello-world</code> and you see "Post: hello-world". In a real app you would use the slug to look up the post's data.</p>
<div class="tip"><b>Version note</b>This sandbox follows Next.js 14, where <code>params</code> is a plain object. Since Next.js 15, <code>params</code> is a <b>Promise</b>, a value that arrives a moment later, so the page is <code>async</code> and waits for it: <code>const { slug } = await params;</code> with the type <code>{ params: Promise&lt;{ slug: string }&gt; }</code>. Use that form in new real projects; the routing idea is identical.</div>

<h4>When no route matches: <code>not-found.tsx</code></h4>
<p>If someone types a path that matches no folder, the server answers with status <b>404</b>, the standard code for "not found". Next.js shows a plain default message. Add <code>app/not-found.tsx</code>, exporting a component, and that is shown instead, inside your root layout, so the nav stays. In a real app you can also call <code>notFound()</code> from <code>next/navigation</code> inside a page, for example when a slug matches no post in the database.</p>

<h4>Reading routing problems</h4>
<ul>
<li><b>You get a 404 for a page you just made.</b> Check the file is named exactly <code>page.tsx</code> (not <code>Page.tsx</code>, <code>about.tsx</code> or <code>pages.tsx</code>) and sits in the right folder.</li>
<li><b>The page is blank or errors.</b> Check it has <code>export default</code>. A page without a default export gives Next.js nothing to draw.</li>
<li><b>The nav only appears on one page.</b> It was put in a page instead of the layout.</li>
</ul>
<div class="mistake"><b>Common mistake</b>Forgetting <code>{children}</code> in a layout. The layout draws fine, but every page under it vanishes, because you never told the layout where to put them.</div>
<div class="mistake"><b>Common mistake</b>Using <code>&lt;a href&gt;</code> for links inside your own site. It works, but every click reloads the whole page and resets layouts. Use <code>Link</code> for internal pages and keep plain <code>&lt;a&gt;</code> for other websites.</div>

<div class="try"><b>Try it in your head</b>Which file draws <code>/shop/shoes/42</code> if your folders are <code>app/shop/[category]/[id]/page.tsx</code>? What is in <code>params</code>? Answer: that page.tsx, with <code>params</code> equal to category "shoes" and id "42". Note that "42" arrives as text, because URLs are text.</div>

<h4>Recap</h4>
<ul>
<li>In the App Router, folders under <code>app/</code> are URL segments, and <code>page.tsx</code> makes a segment visitable: <code>app/about/page.tsx</code> is <code>/about</code>.</li>
<li><code>layout.tsx</code> wraps every page below it through <code>children</code>. The root layout holds <code>html</code>, <code>body</code> and the nav, and layouts nest.</li>
<li><code>Link</code> from <code>next/link</code> navigates without a full reload and prefetches.</li>
<li><code>[slug]</code> folders catch any value, passed as <code>params.slug</code>. From Next.js 15, await <code>params</code>.</li>
<li><code>app/not-found.tsx</code> customises the 404 page.</li>
</ul>
`);

explain('n4',`
<h4>Two computers are involved in every page</h4>
<p>Every time someone opens your site, two computers work together. The <b>server</b> is the computer that runs your Next.js app and holds your database and secrets. The <b>client</b> is the visitor's browser, on their phone or laptop. Code can run on either one, and where it runs changes what it can do.</p>
<p>Classic React apps ran almost everything in the browser. The server sent a nearly empty page plus a big bundle of JavaScript; the browser downloaded it, ran it, then asked the server for data, showing a loading spinner meanwhile. That has three costs: lots of JavaScript for slow phones to download, extra waiting for data, and no safe way to touch the database, because anything sent to the browser can be read by anyone.</p>
<p>The App Router fixes this with <b>React Server Components</b>. The idea is simple: <b>components run on the server unless you say otherwise</b>.</p>

<h4>Server Components: the default</h4>
<p>Every component in the <code>app</code> folder is a <b>Server Component</b> unless its file is marked otherwise. A Server Component runs only on the server. It turns into HTML there, and that result is sent to the browser. The component's own code is never sent at all.</p>
<p>Because it runs on the server, a Server Component can do things browser code never could:</p>
<ul>
<li>It can be <code>async</code>, meaning it can pause with <code>await</code> until data arrives, then carry on.</li>
<li>It can query the database directly and read secret settings like API keys, which never leave the server.</li>
<li>It adds no JavaScript to the download, so pages stay light.</li>
</ul>
<p>Here is the shape the third task asks for:</p>
<pre class="snip">import { getProjects } from '@/lib/data';

export default async function Home() {     // async: allowed on the server
  const projects = await getProjects();      // wait for the data
  return (
    &lt;ul&gt;
      {projects.map((p) =&gt; &lt;li key={p.id}&gt;{p.name}&lt;/li&gt;)}
    &lt;/ul&gt;
  );
}</pre>
<p>Notice what is missing: no <code>useEffect</code>, no loading state, no fetch to your own API. The data is simply there when the HTML is built. <code>getProjects</code> returns a <code>Promise&lt;Project[]&gt;</code>, a list of projects that arrives later, and <code>await</code> unwraps it. The <code>@/</code> at the start of the import path is a shortcut for the project's root folder, set up by Next.js, so <code>@/lib/data</code> means the file <code>lib/data.ts</code>.</p>

<h4>What Server Components cannot do</h4>
<p>A Server Component runs once, produces its HTML, and is finished. It never lives in the browser. So anything that needs to keep running in front of the user is impossible there:</p>
<ul>
<li><b>State</b> with <code>useState</code>: there is no "later" in which the value could change.</li>
<li><b>Effects</b> with <code>useEffect</code>: they run in the browser after the page appears.</li>
<li><b>Event handlers</b> like <code>onClick</code>: a click happens in the browser, where this code doesn't exist.</li>
<li><b>Browser features</b> like <code>window</code> or <code>localStorage</code>: the server has no window.</li>
</ul>
<p>That is exactly what goes wrong in the starter. The page uses <code>useState</code> and <code>onClick</code>, but it is a Server Component. Press Run and you get a build error. Real Next.js says roughly: <i>You're importing a component that needs useState. This React Hook only works in a Client Component. To fix, mark the file (or its parent) with the "use client" directive.</i> The message tells you the problem and the tool.</p>

<h4>Client Components: <code>'use client'</code></h4>
<p>When a component needs interactivity, put the line <code>'use client';</code> at the very top of its file, before the imports. This is called a <b>directive</b>: an instruction to the build tool rather than normal code. It turns that file into a <b>Client Component</b>, and its JavaScript is sent to the browser.</p>
<div class="tbl-wrap"><table><tr><th></th><th>Server Component</th><th>Client Component</th></tr>
<tr><td>How to get one</td><td>Default, nothing to write</td><td><code>'use client'</code> at the top of the file</td></tr>
<tr><td>Where it runs</td><td>Server only</td><td>Server for the first HTML, then the browser</td></tr>
<tr><td>Can use</td><td><code>async</code>/<code>await</code>, database, secrets</td><td>State, effects, clicks, browser APIs</td></tr>
<tr><td>JavaScript sent to the browser</td><td>None</td><td>Yes, its code and what it imports</td></tr></table></div>
<p>The second row surprises people. A Client Component is <i>also</i> run on the server once, to produce HTML for the first page load, so the visitor sees the button straight away. Then its JavaScript arrives and React attaches the click handlers to that existing HTML. This step is called <b>hydration</b>: the dry HTML gets "watered" with behaviour.</p>
<figure class="fig"><svg viewBox="0 0 420 260" role="img" aria-label="What runs where: the server page and the client button both make HTML on the server, but only the button's JavaScript goes to the browser">
<text class="t-b" x="105" y="22" text-anchor="middle">Server</text><text class="t-b" x="315" y="22" text-anchor="middle">Browser</text>
<path class="ln-d" d="M210 8V250"/>
<rect class="bx-info" x="15" y="35" width="180" height="56" rx="8"/><text class="t-b" x="105" y="59" text-anchor="middle">page.tsx</text><text class="t-s" x="105" y="79" text-anchor="middle">awaits getProjects()</text>
<rect class="bx-a" x="15" y="122" width="180" height="56" rx="8"/><text class="t-b" x="105" y="146" text-anchor="middle">LikeButton</text><text class="t-s" x="105" y="166" text-anchor="middle">'use client'</text>
<path class="ln" d="M195 63h30"/><polygon class="ah" points="223,57 223,69 231,63"/>
<path class="ln" d="M195 150h30"/><polygon class="ah" points="223,144 223,156 231,150"/>
<rect class="bx" x="233" y="35" width="175" height="143" rx="8"/><text class="t-b" x="320" y="100" text-anchor="middle">HTML</text><text class="t-s" x="320" y="120" text-anchor="middle">list + button</text>
<path class="ln-a" d="M105 178V222h120"/><polygon class="ah-a" points="223,216 223,228 231,222"/>
<rect class="bx-a" x="233" y="198" width="175" height="50" rx="8"/><text class="t-b" x="320" y="220" text-anchor="middle">JS: LikeButton</text><text class="t-s" x="320" y="238" text-anchor="middle">makes clicks work</text>
<text class="t-s" x="105" y="110" text-anchor="middle">page code stays here</text>
</svg><figcaption>Both components produce HTML on the server, so the whole page appears at once. Only the client component's JavaScript travels to the browser, to make the button clickable. The page's own code, and the data access inside it, never leave the server.</figcaption></figure>

<h4>Worked example: fix it the right way</h4>
<p>The quickest "fix" would be to put <code>'use client'</code> on the whole page. Don't. A Client Component can't be <code>async</code>, so you could no longer <code>await getProjects()</code>, and the whole page's code would be shipped to the browser. Instead, move only the interactive part out:</p>
<ol>
<li>Create <code>components/LikeButton.tsx</code>. Its first line is <code>'use client';</code>.</li>
<li>Move the <code>useState</code> import, the <code>likes</code> state and the <code>&lt;button&gt;</code> into a default-exported <code>LikeButton</code> component in that file.</li>
<li>In <code>app/page.tsx</code>, delete the state and the <code>useState</code> import, then <code>import LikeButton from '@/components/LikeButton'</code> and render <code>&lt;LikeButton /&gt;</code> where the button was.</li>
<li>Now the page has no hooks left, so make it <code>async</code>, await the projects and list them, as shown above.</li>
</ol>
<pre class="snip">// components/LikeButton.tsx
'use client';                          // must be the first statement
import { useState } from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return &lt;button onClick={() =&gt; setLikes(likes + 1)}&gt;♥ {likes}&lt;/button&gt;;
}</pre>

<h4>Keep client components small, at the leaves</h4>
<p>Picture your page as a tree of components, with the layout at the top. <code>'use client'</code> marks a <b>boundary</b>: that file, and every file it imports, becomes client code. So mark as little as possible, as far down the tree as possible, at the <b>leaves</b>, the small end pieces like buttons and inputs.</p>
<figure class="fig"><svg viewBox="0 0 420 235" role="img" aria-label="A component tree where layout, page and list are server components and only the like button leaf is a client component">
<rect class="bx-info" x="140" y="10" width="140" height="40" rx="8"/><text class="t" x="210" y="35" text-anchor="middle">RootLayout</text>
<path class="ln" d="M210 50v22"/>
<rect class="bx-info" x="140" y="72" width="140" height="40" rx="8"/><text class="t" x="210" y="97" text-anchor="middle">Home page</text>
<path class="ln" d="M180 112L105 140M240 112L315 140"/>
<rect class="bx-info" x="30" y="140" width="150" height="40" rx="8"/><text class="t" x="105" y="165" text-anchor="middle">project list</text>
<rect class="bx-a" x="240" y="140" width="150" height="40" rx="8"/><text class="t-b" x="315" y="165" text-anchor="middle">LikeButton</text>
<rect class="bx-info" x="20" y="200" width="16" height="16" rx="3"/><text class="t-s" x="44" y="213">server: no JS shipped</text>
<rect class="bx-a" x="230" y="200" width="16" height="16" rx="3"/><text class="t-s" x="254" y="213">client: JS shipped</text>
</svg><figcaption>Most of the tree stays on the server. Only the one leaf that reacts to clicks is a client component, so the browser downloads just the code for that button.</figcaption></figure>
<p>A Server Component may import and render a Client Component, as the page does with <code>LikeButton</code>. The reverse is not allowed: a file marked <code>'use client'</code> cannot import a Server Component, because by then you are in browser code. (A Server Component can still be passed into a Client Component as its <code>children</code>, which you will meet in bigger apps.) Props passed from server to client must be plain data, like text, numbers, arrays and simple objects, because they travel over the network. A function can't be sent that way.</p>
<div class="mistake"><b>Common mistake</b>Putting <code>'use client'</code> below the imports, or after other code. A directive only counts as the first statement in the file (comments above it are fine). Anywhere else it is just an unused string, and you get the same build error as before.</div>
<div class="mistake"><b>Common mistake</b>Reading a secret, such as a database password, inside a Client Component. Its code is sent to every visitor, so anything it uses can end up in the browser. Next.js only exposes environment variables whose names start with <code>NEXT_PUBLIC_</code> to the browser, which protects you, but the safe habit is to keep secrets and data access in Server Components.</div>

<div class="try"><b>Try it in your head</b>Which of these must be Client Components? (a) A footer showing the year. (b) A search box that filters a list as you type. (c) A page that lists orders from the database. (d) A dark mode toggle. Answer: (b) and (d), because they react to typing and clicks. (a) and (c) just display things, so they stay on the server, and (c) needs the server to reach the database.</div>

<h4>Recap</h4>
<ul>
<li>In the App Router, components are Server Components by default: they run on the server, can be <code>async</code>, can read the database and secrets, and ship no JavaScript.</li>
<li>State, effects, event handlers and browser APIs need a Client Component, marked with <code>'use client'</code> as the file's first statement.</li>
<li>Client Components still render HTML on the server first, then hydrate in the browser.</li>
<li><code>'use client'</code> is a boundary: everything a client file imports becomes client code.</li>
<li>Keep the page on the server and move only the interactive leaves, like <code>LikeButton</code>, into small client files.</li>
</ul>
`);

explain('n5',`
<h4>From showing data to changing it</h4>
<p>In the last lesson a Server Component read data and displayed it. Real apps also need to <i>change</i> data: post a message, save a profile, add to a basket. The change must happen on the server, where the data lives, but the user is clicking in the browser. Something has to carry the request across.</p>
<p>The traditional answer is to build an <b>API</b>, a set of server addresses that accept and return data, and then write browser code that calls it with <code>fetch</code>, handles loading, handles errors and refreshes the page. Next.js gives you two tools that cover this, each for a different job:</p>
<ul>
<li><b>Server Actions</b>, for forms and buttons in your own app.</li>
<li><b>Route handlers</b>, for an API that other programs, like a mobile app, can call.</li>
</ul>
<p>Then there is <b>caching</b>: keeping results to reuse, so pages stay fast. It is also why you sometimes need to tell Next.js "this data changed".</p>

<h4>A quick refresher on HTML forms</h4>
<p>A <code>&lt;form&gt;</code> collects inputs and sends them somewhere when submitted. Each input's <code>name</code> becomes a label for its value. So <code>&lt;input name="text" /&gt;</code> containing "Hi" sends the pair <code>text = Hi</code>. On the receiving end, those pairs arrive as a <b>FormData</b> object, and <code>formData.get('text')</code> reads one value back out by name.</p>
<p>Forms send data using an HTTP <b>method</b>. <b>GET</b> means "give me something" and <b>POST</b> means "here is something to create or change". Forms that change data use POST.</p>

<h4>Server Actions: a form that calls a server function</h4>
<p>A <b>Server Action</b> is an <code>async</code> function that always runs on the server, marked with the <code>'use server'</code> directive. You hand it straight to a form's <code>action</code> prop:</p>
<pre class="snip">import { revalidatePath } from 'next/cache';
import { messages, addMessage } from '@/lib/store';

async function postMessage(formData: FormData) {
  'use server';                                   // this runs on the server
  const text = String(formData.get('text') || '').trim();
  if (!text) return;                              // ignore empty posts
  addMessage(text);
  revalidatePath('/');                            // the page's data changed
}

// in the component: &lt;form action={postMessage}&gt; ... &lt;/form&gt;</pre>
<p>Line by line: <code>formData.get('text')</code> returns the value, or <code>null</code> if the field was missing, so <code>|| ''</code> swaps a missing value for empty text, and <code>String(...)</code> makes sure TypeScript knows it is text. <code>.trim()</code> removes spaces at either end, so a post of only spaces counts as empty. Then the message is stored and the page is told to refresh.</p>
<p>When <code>'use server'</code> sits inside a function, only that function is a Server Action. You can also put <code>'use server'</code> at the top of a separate file, such as <code>app/actions.ts</code>, and every exported function in it becomes one. That is the way to use actions from Client Components.</p>
<figure class="fig"><svg viewBox="0 0 420 285" role="img" aria-label="Server action round trip: the browser posts form data, the server runs the action and revalidates, and sends back the updated page">
<rect class="bx-info" x="20" y="10" width="120" height="34" rx="6"/><text class="t-b" x="80" y="32" text-anchor="middle">Browser</text>
<rect class="bx-a" x="280" y="10" width="120" height="34" rx="6"/><text class="t-b" x="340" y="32" text-anchor="middle">Server</text>
<path class="ln-d" d="M80 44V240M340 44V230"/>
<text class="t-s" x="210" y="66" text-anchor="middle">1. POST text = Hi</text>
<path class="ln-a" d="M80 74H330"/><polygon class="ah-a" points="328,68 328,80 336,74"/>
<rect class="bx" x="262" y="92" width="150" height="30" rx="6"/><text class="t-s" x="337" y="112" text-anchor="middle">2. postMessage runs</text>
<rect class="bx" x="262" y="130" width="150" height="30" rx="6"/><text class="t-s" x="337" y="150" text-anchor="middle">3. addMessage(text)</text>
<rect class="bx-warn" x="262" y="168" width="150" height="30" rx="6"/><text class="t-s" x="337" y="188" text-anchor="middle">4. revalidatePath</text>
<text class="t-s t-ok" x="210" y="222" text-anchor="middle">5. updated page</text>
<path class="ln-ok" d="M340 230H90"/><polygon class="ah-ok" points="92,224 92,236 84,230"/>
<rect class="bx-ok" x="10" y="244" width="140" height="34" rx="6"/><text class="t-s" x="80" y="266" text-anchor="middle">"Hi" appears</text>
</svg><figcaption>One round trip. The form posts its fields to the server, your action function runs there and saves the message, revalidatePath marks the page as out of date, and the response carries the freshly rendered page back, so the new message appears.</figcaption></figure>
<p>Behind the scenes, Next.js gives each action a hidden ID and makes the form post to it. You never write a URL or a <code>fetch</code>. Because it is a real HTML form, it even works before the page's JavaScript has finished loading. This is called <b>progressive enhancement</b>: the basic version works everywhere, and JavaScript makes it smoother.</p>
<div class="mistake"><b>Common mistake</b>Trusting the input because "only my form calls this". A Server Action is a public endpoint: anyone can send a POST to it with any data. Always check the values inside the action, and in real apps also check that the user is logged in and allowed to make the change.</div>

<h4>Route handlers: a JSON API for other programs</h4>
<p>A Server Action is tied to your own pages. But a mobile app, another company's server or a <b>webhook</b> (an automatic message one service sends another, like "payment received") needs a normal URL that speaks <b>JSON</b>, the standard text format for data. For that you write a <b>route handler</b>: a file named <code>route.ts</code> inside <code>app</code>. Its folder path becomes the URL, just like pages, and you export one function per HTTP method:</p>
<pre class="snip">// app/api/messages/route.ts  →  /api/messages
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(messages);      // 200 OK with a JSON list
}

export async function POST(request: Request) {
  const body = await request.json();        // read the JSON sent in
  if (!body.text) {
    return NextResponse.json({ error: 'text is required' }, { status: 400 });
  }
  ...                                       // create it, then reply 201
}</pre>
<p>Every HTTP response carries a <b>status code</b>, a number saying how it went. <b>200</b> means OK. <b>201</b> means "created", the right answer when a POST made something new. <b>400</b> means "bad request": the caller sent something wrong, so it is their problem to fix. <code>NextResponse.json(data, { status })</code> turns data into JSON and sets the code. If you leave out the status, it is 200.</p>
<figure class="fig"><svg viewBox="0 0 420 205" role="img" aria-label="A mobile app posts to the route handler, which replies 400 without text or 201 with the new message">
<rect class="bx-info" x="5" y="70" width="105" height="56" rx="8"/><text class="t-b" x="57" y="94" text-anchor="middle">Mobile</text><text class="t-s" x="57" y="114" text-anchor="middle">app</text>
<path class="ln" d="M110 98h22"/><polygon class="ah" points="130,92 130,104 138,98"/>
<text class="t-s" x="122" y="60" text-anchor="middle">POST JSON</text>
<rect class="bx-a" x="140" y="70" width="130" height="56" rx="8"/><text class="t-m" x="205" y="94" text-anchor="middle">route.ts</text><text class="t-s" x="205" y="114" text-anchor="middle">POST()</text>
<path class="ln" d="M270 88L298 52"/><polygon class="ah" points="292,52 302,46 301,58"/>
<path class="ln" d="M270 108L298 144"/><polygon class="ah" points="301,138 302,150 292,144"/>
<rect class="bx-bad" x="300" y="15" width="115" height="56" rx="8"/><text class="t-b" x="357" y="39" text-anchor="middle">400</text><text class="t-s" x="357" y="59" text-anchor="middle">no text sent</text>
<rect class="bx-ok" x="300" y="125" width="115" height="56" rx="8"/><text class="t-b" x="357" y="149" text-anchor="middle">201</text><text class="t-s" x="357" y="169" text-anchor="middle">new message</text>
</svg><figcaption>Another program sends JSON to the route handler's POST function. If the text is missing it replies with status 400 and an error message. Otherwise it creates the message and replies with status 201 and the new message as JSON.</figcaption></figure>
<p>A route handler and a page can't live in the same folder, because both would answer the same URL. That is one reason APIs usually sit under <code>app/api/</code>.</p>
<div class="tip"><b>Which one do I use?</b>Your own form or button changing data: a Server Action. Anything outside your Next.js pages calling in: a route handler. Don't build an API route just so your own Server Component can fetch from it; it can read the data directly.</div>

<h4>Caching: why <code>revalidatePath</code> exists</h4>
<p>Rendering a page takes work. If the result would be identical for every visitor, it is wasteful to rebuild it each time. So when you run <code>npm run build</code>, which runs <code>next build</code>, Next.js looks at every route and decides:</p>
<ul>
<li><b>○ Static</b>: the page doesn't depend on who is asking, so it is rendered once, at build time (called <b>prerendering</b>), and the saved HTML is served to everyone. Very fast.</li>
<li><b>ƒ Dynamic</b>: the page depends on the request, so it is rendered fresh for every visit. Reading <b>cookies</b> (small values the browser sends with each request, such as a login), request headers or the URL's search parameters makes a page dynamic.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 235" role="img" aria-label="next build sorts routes into static and dynamic depending on whether they read the request">
<rect class="bx" x="110" y="10" width="200" height="40" rx="8"/><text class="t-b" x="210" y="35" text-anchor="middle">next build</text>
<path class="ln" d="M210 50v16"/><polygon class="ah" points="204,64 216,64 210,72"/>
<rect class="bx-a" x="85" y="74" width="250" height="40" rx="8"/><text class="t" x="210" y="99" text-anchor="middle">Reads cookies or headers?</text>
<path class="ln" d="M150 114L105 146"/><polygon class="ah" points="103,139 111,148 99,150"/>
<path class="ln" d="M270 114L315 146"/><polygon class="ah" points="309,148 317,139 321,150"/>
<text class="t-s" x="113" y="128" text-anchor="middle">no</text><text class="t-s" x="307" y="128" text-anchor="middle">yes</text>
<rect class="bx-ok" x="10" y="152" width="190" height="70" rx="8"/><text class="t-b" x="105" y="178" text-anchor="middle">○ Static</text><text class="t-s" x="105" y="198" text-anchor="middle">built once, reused</text>
<rect class="bx-warn" x="220" y="152" width="190" height="70" rx="8"/><text class="t-b" x="315" y="178" text-anchor="middle">ƒ Dynamic</text><text class="t-s" x="315" y="198" text-anchor="middle">rendered every visit</text>
</svg><figcaption>For each route, the build asks whether the page depends on the incoming request. If not, it is prerendered once and the same HTML is reused for everyone. If it reads things like cookies, it must be rendered fresh for every visit.</figcaption></figure>
<p>Here is the catch. The guestbook page is static: it was rendered with the messages that existed at build time. When someone posts, the saved copy is now out of date. <code>revalidatePath('/')</code> tells Next.js "throw away what you saved for this path", so the next render uses fresh data. Forget it, and the post is stored but the page keeps showing the old list.</p>
<p>Next.js has several caches, including saved fetch results on the server and recently visited pages in the browser, and their defaults have changed between versions. Since Next.js 15, <code>fetch</code> results and GET route handlers are not cached unless you opt in. The safe mental model: after changing data, revalidate the paths that show it.</p>

<div class="try"><b>Try it in your head</b>Your POST handler receives <code>{"text": ""}</code>. What status does it return, and why? Then: you remove <code>revalidatePath('/')</code> from the action and post "Hi" in a production build. Is the message saved, and does it appear? Answer: 400, because empty text is falsy, so <code>!body.text</code> is true. Without revalidation the message is saved, but the static page keeps serving its old copy, so it doesn't appear.</div>

<h4>Recap</h4>
<ul>
<li>A Server Action is an async function with <code>'use server'</code>, passed to <code>&lt;form action={...}&gt;</code>. It receives FormData; read fields with <code>formData.get('name')</code>.</li>
<li>Actions are public endpoints: validate input and check permissions inside them.</li>
<li>Route handlers live in <code>route.ts</code> and export <code>GET</code>, <code>POST</code> and so on, replying with <code>NextResponse.json(data, { status })</code>: 200 OK, 201 created, 400 bad request.</li>
<li><code>next build</code> marks routes ○ static (prerendered once) or ƒ dynamic (rendered per request, for example when reading cookies).</li>
<li>After changing data, <code>revalidatePath</code> clears the saved copy so the page shows fresh data.</li>
</ul>
`);

explain('n6',`
<h4>Why a database, and why Prisma?</h4>
<p>So far your guestbook kept messages in a JavaScript array. Restart the server and they are gone, and with two servers each would have its own list. Real apps keep data in a <b>database</b>: a separate program built to store data safely on disk, let many users read and write at once, and survive crashes. <b>PostgreSQL</b>, usually called Postgres, is one of the most popular, and it is free.</p>
<p>Postgres is a <b>relational database</b>: it stores data in <b>tables</b>. A table is like a spreadsheet: each <b>column</b> is one kind of fact (title, date), and each <b>row</b> is one record (one post). You talk to it in <b>SQL</b>, a language of commands like <code>SELECT * FROM "Post"</code>.</p>
<p>You could write SQL strings straight into your TypeScript, but TypeScript can't see inside a string. A typo in a column name, or a number where text belongs, is only discovered when the query fails while running. <b>Prisma</b> is an <b>ORM</b>, an Object-Relational Mapper: a translator between database tables and the objects in your code. You describe your data once, and Prisma creates the tables and gives you typed functions to read and write them.</p>
<div class="analogy"><b>Think of it like</b>An architect's plan for a building. You draw the plan (the schema), the builders follow it to change the actual building (the migration), and you get a labelled key for every room (the typed client), so you can never walk into a room that doesn't exist.</div>

<h4>The schema: describing your data once</h4>
<p>Everything starts in <code>prisma/schema.prisma</code>. It has three parts:</p>
<pre class="snip">generator client {               // what code to generate for you
  provider = "prisma-client-js"
}
datasource db {                  // which database to connect to
  provider = "postgresql"
  url      = env("DATABASE_URL") // read from the .env file, never hard-coded
}
model Post {                     // one model = one table
  id        Int      @id @default(autoincrement())
  title     String
  createdAt DateTime @default(now())
}</pre>
<p><code>DATABASE_URL</code> is the database's address plus username and password, which is why it lives in a private <code>.env</code> file. Each line inside a <b>model</b> describes one column: a name, a type, then optional <b>attributes</b> starting with <code>@</code> that add rules.</p>
<div class="tbl-wrap"><table><tr><th>Piece</th><th>Meaning</th></tr>
<tr><td><code>Int</code>, <code>String</code>, <code>Boolean</code>, <code>DateTime</code></td><td>Whole number, text, true or false, a date and time.</td></tr>
<tr><td><code>@id</code></td><td>This column is the <b>primary key</b>: the unique number that identifies each row.</td></tr>
<tr><td><code>@default(autoincrement())</code></td><td>The database fills in 1, 2, 3... by itself.</td></tr>
<tr><td><code>@default(now())</code></td><td>If you don't give a value, use the current time.</td></tr>
<tr><td><code>String?</code></td><td>A question mark makes the column optional (it may be empty, called null).</td></tr></table></div>

<h4>Migrations: turning the schema into real tables</h4>
<p>Writing the schema changes nothing in the database yet. You run:</p>
<pre class="snip">npx prisma migrate dev --name init</pre>
<p><code>npx</code> runs a tool installed in your project. <code>migrate dev</code> compares your schema with the database, works out the SQL needed to make them match, saves that SQL as a new <b>migration</b> file, and applies it. The <code>--name</code> is a short label for the change. Prisma creates a folder like <code>prisma/migrations/20261014093000_init/</code> holding a <code>migration.sql</code> file:</p>
<pre class="snip">CREATE TABLE "Post" (
  "id" SERIAL NOT NULL,                 -- auto-numbered
  "title" TEXT NOT NULL,                -- NOT NULL: must have a value
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);</pre>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="The schema is turned by migrate dev into a SQL migration file, which is applied to the database and also used to generate the typed client">
<rect class="bx-info" x="10" y="20" width="120" height="56" rx="8"/><text class="t-b" x="70" y="44" text-anchor="middle">schema</text><text class="t-s" x="70" y="64" text-anchor="middle">model Post</text>
<path class="ln" d="M130 48h20"/><polygon class="ah" points="148,42 148,54 156,48"/>
<rect class="bx-a" x="158" y="20" width="110" height="56" rx="8"/><text class="t-b" x="213" y="44" text-anchor="middle">migrate</text><text class="t-s" x="213" y="64" text-anchor="middle">dev --name</text>
<path class="ln" d="M268 48h20"/><polygon class="ah" points="286,42 286,54 294,48"/>
<rect class="bx-warn" x="296" y="20" width="118" height="56" rx="8"/><text class="t-b" x="355" y="44" text-anchor="middle">SQL file</text><text class="t-s" x="355" y="64" text-anchor="middle">saved in Git</text>
<path class="ln" d="M355 76v38"/><polygon class="ah" points="349,112 361,112 355,120"/>
<rect class="bx-ok" x="296" y="122" width="118" height="56" rx="8"/><text class="t-b" x="355" y="146" text-anchor="middle">Database</text><text class="t-s" x="355" y="166" text-anchor="middle">table created</text>
<path class="ln-d" d="M70 76v70h50"/><polygon class="ah" points="118,140 118,152 126,146"/>
<rect class="bx-info" x="128" y="122" width="140" height="56" rx="8"/><text class="t-b" x="198" y="146" text-anchor="middle">Prisma Client</text><text class="t-s" x="198" y="166" text-anchor="middle">typed functions</text>
<text class="t-s" x="210" y="208" text-anchor="middle">one source of truth, two results</text>
</svg><figcaption>The schema is the single source of truth. Migrate dev turns it into a SQL file that is kept in Git and applied to the database. The same schema also produces the Prisma Client, the typed functions your code uses.</figcaption></figure>
<p>Every change to the schema gets its own migration. The migrations folder is committed to Git, so the whole history of your database's shape is reviewable, and every copy of the database, on your laptop, in testing and in production, gets the same changes in the same order. In production you apply them with <code>npx prisma migrate deploy</code>, which runs the saved files without creating new ones.</p>
<div class="tip"><b>Tip</b><code>migrate dev</code> normally also regenerates the client. If your editor ever says a field you just added doesn't exist, run <code>npx prisma generate</code> to rebuild the typed client from the schema.</div>

<h4>The client: typed queries</h4>
<p>The project already has <code>lib/prisma.ts</code>, which creates one shared client: <code>export const prisma = new PrismaClient();</code>. For every model, the client has a property named after it in lowercase, <code>prisma.post</code>, with functions for each kind of operation:</p>
<pre class="snip">const posts = await prisma.post.findMany({
  orderBy: { id: 'desc' },          // newest first ('asc' = oldest first)
});
await prisma.post.create({
  data: { title: 'Hello' },         // id and createdAt are filled in for you
});</pre>
<figure class="fig"><svg viewBox="0 0 420 165" role="img" aria-label="Your code calls the Prisma Client, which sends SQL to the database, and the rows come back as typed objects">
<rect class="bx-info" x="5" y="15" width="120" height="56" rx="8"/><text class="t-b" x="65" y="39" text-anchor="middle">Your code</text><text class="t-s" x="65" y="59" text-anchor="middle">findMany()</text>
<path class="ln-a" d="M125 43h20"/><polygon class="ah-a" points="143,37 143,49 151,43"/>
<rect class="bx-a" x="152" y="15" width="120" height="56" rx="8"/><text class="t-b" x="212" y="39" text-anchor="middle">Prisma Client</text><text class="t-s" x="212" y="59" text-anchor="middle">writes the SQL</text>
<path class="ln-a" d="M272 43h20"/><polygon class="ah-a" points="290,37 290,49 298,43"/>
<rect class="bx-warn" x="299" y="15" width="116" height="56" rx="8"/><text class="t-b" x="357" y="39" text-anchor="middle">Database</text><text class="t-s" x="357" y="59" text-anchor="middle">runs SELECT</text>
<path class="ln-ok" d="M357 71v40H65V81"/><polygon class="ah-ok" points="59,83 71,83 65,75"/>
<text class="t-s t-ok" x="210" y="135" text-anchor="middle">rows come back as typed Post objects</text>
</svg><figcaption>A query's journey. Your code calls a typed function, the Prisma Client translates it into SQL, the database runs it, and the rows come back to your code as objects whose fields TypeScript already knows.</figcaption></figure>
<p>These are database calls, so they return Promises and you <code>await</code> them. That is why they belong in Server Components and Server Actions: the server can reach the database, the browser cannot. Prisma writes the SQL for you, and the results are typed: <code>posts</code> is a list of objects with <code>id</code>, <code>title</code> and <code>createdAt</code>. Type <code>p.titel</code> and the editor underlines it immediately.</p>
<p>The second task puts this together in <code>app/page.tsx</code>: the async page awaits <code>findMany</code> and lists the titles, and a Server Action reads the title from the form, calls <code>prisma.post.create</code>, then <code>revalidatePath('/')</code>, just as you did with the guestbook. Other functions follow the same pattern: <code>findUnique({ where: { id } })</code> for one row, <code>update</code> and <code>delete</code> for changes.</p>

<h4>Changing the schema: a second migration</h4>
<p>Now you want drafts: posts that exist but aren't shown yet. Add one line to the model, then migrate again with a new name:</p>
<pre class="snip">  published Boolean  @default(false)

npx prisma migrate dev --name add-published</pre>
<p>Prisma compares again, sees one new column and writes a second migration, roughly <code>ALTER TABLE "Post" ADD COLUMN "published" BOOLEAN NOT NULL DEFAULT false;</code>. The default matters. The table already has rows, and a column that must have a value needs <i>something</i> in those old rows. <code>@default(false)</code> supplies it, so every existing post becomes a draft.</p>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="The Post table before and after the add-published migration, with existing rows filled with false">
<text class="t-b" x="10" y="22">Before</text>
<rect class="bx" x="10" y="32" width="250" height="30"/><text class="t-s" x="30" y="52">id</text><text class="t-s" x="80" y="52">title</text>
<rect class="bx" x="10" y="62" width="250" height="30"/><text class="t-m" x="30" y="83">1</text><text class="t-m" x="80" y="83">Hello</text>
<text class="t-b" x="10" y="122">After</text>
<rect class="bx" x="10" y="132" width="250" height="30"/><text class="t-s" x="30" y="152">id</text><text class="t-s" x="80" y="152">title</text>
<rect class="bx-ok" x="260" y="132" width="150" height="30"/><text class="t-s t-ok" x="275" y="152">published</text>
<rect class="bx" x="10" y="162" width="250" height="30"/><text class="t-m" x="30" y="183">1</text><text class="t-m" x="80" y="183">Hello</text>
<rect class="bx-ok" x="260" y="162" width="150" height="30"/><text class="t-m t-ok" x="275" y="183">false</text>
<text class="t-s" x="285" y="83">new column added,</text><text class="t-s" x="285" y="101">old rows get default</text>
</svg><figcaption>The second migration adds a published column to the existing table. The old row keeps its data, and because the column has a default, it is filled with false rather than being left empty. The createdAt column is left out here to save space.</figcaption></figure>
<p>For the last task, filter with <code>where</code>: <code>findMany({ where: { published: true }, orderBy: { id: 'desc' } })</code>. <code>where</code> means "only rows matching this", like SQL's WHERE. New posts default to <code>false</code>, so a freshly created post is a draft and no longer appears.</p>

<h4>Reading Prisma errors</h4>
<ul>
<li><b>"The table ... does not exist in the current database"</b>: you changed the schema or started fresh but haven't run the migration. Run <code>migrate dev</code>.</li>
<li><b>"Unknown argument"</b> or a red underline on a field: a typo, or the client is older than the schema. Check spelling, then <code>npx prisma generate</code>.</li>
<li><b>"Can't reach database server"</b>: <code>DATABASE_URL</code> is wrong or the database is not running. (In this sandbox the database is SQLite running in your browser, so you won't see this one here.)</li>
</ul>
<div class="mistake"><b>Common mistake</b>Changing the database by hand, for example adding a column with a database tool. Your schema and migrations no longer match reality, the next <code>migrate dev</code> reports "drift" and may want to reset your data, and production never gets the change. Every change goes through the schema and a migration.</div>
<div class="mistake"><b>Common mistake</b>Adding a required column with no default to a table that already has rows. The migration can't fill the old rows, so Prisma warns you or fails. Give it a <code>@default(...)</code>, or make it optional with <code>?</code>.</div>
<div class="tip"><b>Version note</b>Recent Prisma releases (version 7) move the database URL out of the schema into a <code>prisma.config.ts</code> file and use a newer generator called <code>prisma-client</code>. Models, migrations and queries work as shown here; follow the setup in the docs for your version.</div>

<div class="try"><b>Try it in your head</b>You add <code>views Int @default(0)</code> to Post and run <code>migrate dev --name add-views</code>. How many migration folders exist, and what is <code>views</code> on the old "Hello" post? Answer: three (init, add-published, add-views), and the old post gets 0, the default.</div>

<h4>Recap</h4>
<ul>
<li>Prisma is an ORM: describe models in <code>prisma/schema.prisma</code>, and it creates tables and a typed client.</li>
<li>Attributes add rules: <code>@id</code>, <code>@default(autoincrement())</code>, <code>@default(now())</code>, <code>@default(false)</code>.</li>
<li><code>npx prisma migrate dev --name something</code> writes a versioned SQL migration and applies it. Migrations are committed to Git, and production uses <code>migrate deploy</code>.</li>
<li>Query from server code: <code>prisma.post.findMany({ where, orderBy })</code> and <code>prisma.post.create({ data })</code>, with typed results.</li>
<li>Never change the database by hand; give new required columns a default.</li>
</ul>
`);

explain('n7',`
<h4>Who are you, and should you be here?</h4>
<p>Two words get mixed up constantly. <b>Authentication</b> answers "who are you?", usually by checking a password. <b>Authorisation</b> answers "what are you allowed to do?", such as "only Ada may see Ada's dashboard". This lesson builds authentication, plus the simplest authorisation rule: you must be logged in to see <code>/dashboard</code>.</p>
<p>There is a puzzle to solve first. The web's protocol, <b>HTTP</b>, is <b>stateless</b>: every request arrives on its own, and the server does not remember the previous one. You log in, then click to the next page, and to the server that click comes from a complete stranger. You can't ask for the password on every click, so the server needs a way to recognise you again.</p>
<div class="analogy"><b>Think of it like</b>A club with a bouncer. At the door you show ID once (your password). The bouncer gives you a wristband (a cookie). Inside, staff just glance at the wristband instead of asking for ID again, and when you leave, the wristband is cut off (logout).</div>

<h4>Cookies: the wristband</h4>
<p>A <b>cookie</b> is a small named piece of text that a server asks the browser to store. The server sends it in a response header called <code>Set-Cookie</code>. From then on, the browser automatically attaches it to every request to that same site, in a header called <code>Cookie</code>. So after login the server sets a cookie named <code>session</code>, and every later request carries it, proving who is asking.</p>
<p>A cookie can carry <b>flags</b>, extra rules the browser enforces. Three matter for login cookies:</p>
<div class="tbl-wrap"><table><tr><th>Flag</th><th>What it does</th><th>What it protects against</th></tr>
<tr><td><code>httpOnly</code></td><td>Page JavaScript cannot read the cookie at all.</td><td>A cross-site scripting (XSS) bug, where an attacker's script runs on your page and tries to steal it.</td></tr>
<tr><td><code>secure</code></td><td>Only sent over HTTPS, the encrypted connection.</td><td>Someone on the same café Wi-Fi reading it in transit.</td></tr>
<tr><td><code>sameSite: 'lax'</code></td><td>Not sent with form posts or background requests started by other websites.</td><td>Cross-site request forgery (CSRF), where another site tricks your browser into acting for you.</td></tr></table></div>
<p>(Browsers treat <code>localhost</code> as secure, so <code>secure</code> cookies still work while you develop.)</p>

<h4>Passwords: store a hash, never the password</h4>
<p>If your database stores passwords as plain text, anyone who ever sees the database, through a leak, a backup or a nosy employee, learns every user's password, and people reuse passwords on other sites. So you store a <b>hash</b> instead. A hash function turns text into a scrambled fingerprint, and it only works one way: easy to compute from the password, practically impossible to reverse.</p>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="Signing up stores the hash of the password; logging in hashes the attempt and compares the two hashes">
<text class="t-b" x="10" y="22">Sign up</text>
<rect class="bx-info" x="10" y="32" width="120" height="40" rx="6"/><text class="t-s" x="70" y="57" text-anchor="middle">password</text>
<path class="ln" d="M130 52h20"/><polygon class="ah" points="148,46 148,58 156,52"/>
<rect class="bx-a" x="158" y="32" width="100" height="40" rx="6"/><text class="t-s" x="208" y="57" text-anchor="middle">hash it</text>
<path class="ln" d="M258 52h20"/><polygon class="ah" points="276,46 276,58 284,52"/>
<rect class="bx-warn" x="286" y="32" width="124" height="40" rx="6"/><text class="t-m" x="348" y="57" text-anchor="middle">$2b$a9f…</text>
<text class="t-s" x="348" y="90" text-anchor="middle">only this is stored</text>
<text class="t-b" x="10" y="122">Log in</text>
<rect class="bx-info" x="10" y="132" width="120" height="40" rx="6"/><text class="t-s" x="70" y="157" text-anchor="middle">attempt</text>
<path class="ln" d="M130 152h20"/><polygon class="ah" points="148,146 148,158 156,152"/>
<rect class="bx-a" x="158" y="132" width="100" height="40" rx="6"/><text class="t-s" x="208" y="157" text-anchor="middle">hash it</text>
<path class="ln" d="M258 152h20"/><polygon class="ah" points="276,146 276,158 284,152"/>
<rect class="bx-ok" x="286" y="132" width="124" height="40" rx="6"/><text class="t-s" x="348" y="157" text-anchor="middle">same? let in</text>
<path class="ln-d" d="M348 98v30"/>
<text class="t-s" x="210" y="200" text-anchor="middle">the real password is never kept</text>
</svg><figcaption>At sign up, the password is hashed and only the hash is saved. At login, the attempt is hashed the same way and the two hashes are compared. If they match, the password was right, without the real password ever being stored.</figcaption></figure>
<p>Real apps use <b>bcrypt</b> or <b>argon2</b>. They are deliberately slow, so an attacker can't try billions of guesses, and they mix in a random <b>salt</b> so two users with the same password get different hashes. The tiny <code>hash</code> function in <code>lib/auth.ts</code> is a demo only; you just call <code>checkPassword(email, password)</code>, which returns true or false.</p>

<h4>Logging in with a Server Action</h4>
<p>The login page is a form whose action runs on the server. In outline:</p>
<pre class="snip">async function login(formData: FormData) {
  'use server';
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  if (!checkPassword(email, password)) {
    redirect('/login?error=1');               // back to the form, with a flag
  }
  cookies().set('session', email, { httpOnly: true, secure: true, sameSite: 'lax' });
  redirect('/dashboard');
}</pre>
<p><code>cookies()</code> from <code>next/headers</code> gives access to the request's cookies, and <code>.set(name, value, options)</code> adds a <code>Set-Cookie</code> to the response. <code>redirect</code> from <code>next/navigation</code> sends the browser to another page. It works by stopping the function on the spot, so nothing after a <code>redirect</code> runs: a wrong password never reaches the line that sets the cookie.</p>
<p>The <code>?error=1</code> part is a <b>search parameter</b>: extra information in the URL after a question mark. The page receives it as the <code>searchParams</code> prop, so <code>{searchParams.error &amp;&amp; &lt;p role="alert"&gt;Wrong email or password&lt;/p&gt;}</code> shows the message only after a failed attempt. Saying "email or password" without saying which was wrong is deliberate: it stops attackers learning which emails have accounts.</p>
<figure class="fig"><svg viewBox="0 0 420 300" role="img" aria-label="Login flow: post the form, check the hash, set the cookie and redirect, then later requests carry the cookie past middleware">
<rect class="bx-info" x="20" y="10" width="120" height="34" rx="6"/><text class="t-b" x="80" y="32" text-anchor="middle">Browser</text>
<rect class="bx-a" x="280" y="10" width="120" height="34" rx="6"/><text class="t-b" x="340" y="32" text-anchor="middle">Server</text>
<path class="ln-d" d="M80 44V290M340 44V290"/>
<text class="t-s" x="210" y="66" text-anchor="middle">POST email + password</text>
<path class="ln-a" d="M80 74H330"/><polygon class="ah-a" points="328,68 328,80 336,74"/>
<rect class="bx" x="270" y="86" width="140" height="30" rx="6"/><text class="t-s" x="340" y="106" text-anchor="middle">check the hash</text>
<text class="t-s t-ok" x="210" y="140" text-anchor="middle">Set-Cookie: session</text>
<text class="t-s t-ok" x="210" y="156" text-anchor="middle">redirect to /dashboard</text>
<path class="ln-ok" d="M340 164H90"/><polygon class="ah-ok" points="92,158 92,170 84,164"/>
<text class="t-s" x="210" y="196" text-anchor="middle">GET /dashboard + Cookie</text>
<path class="ln-a" d="M80 204H330"/><polygon class="ah-a" points="328,198 328,210 336,204"/>
<rect class="bx-warn" x="270" y="216" width="140" height="30" rx="6"/><text class="t-s" x="340" y="236" text-anchor="middle">middleware: ok</text>
<path class="ln-ok" d="M340 270H90"/><polygon class="ah-ok" points="92,264 92,276 84,270"/>
<text class="t-s t-ok" x="210" y="262" text-anchor="middle">dashboard page</text>
</svg><figcaption>The password crosses the network once. The server checks it, sets the session cookie and redirects. On every later request the browser sends the cookie automatically, middleware sees it and lets the request through to the dashboard.</figcaption></figure>

<h4>Middleware: the bouncer at the door</h4>
<p><b>Middleware</b> is code that runs <i>before</i> a request reaches a page. It can let the request continue, redirect it elsewhere, or change it. It lives in a single file, <code>middleware.ts</code>, at the project root, next to the <code>app</code> folder rather than inside it:</p>
<pre class="snip">import { NextResponse } from 'next/server';

export function middleware(request) {
  if (!request.cookies.get('session')) {                    // no wristband
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();                               // carry on
}
export const config = { matcher: ['/dashboard/:path*'] };</pre>
<p>Reading it piece by piece:</p>
<ul>
<li><code>request.cookies.get('session')</code> looks for the cookie, and gives <code>undefined</code> if it is missing.</li>
<li>A redirect needs a full address, so <code>new URL('/login', request.url)</code> builds one from the path plus the current site, for example <code>https://yoursite.com/login</code>.</li>
<li><code>NextResponse.next()</code> means "let this request continue to the page".</li>
<li><code>matcher</code> limits which paths run the middleware. <code>/dashboard/:path*</code> means <code>/dashboard</code> and anything below it, like <code>/dashboard/settings</code>. Without a matcher it would run on every request, including the login page itself.</li>
</ul>

<h4>Logging out</h4>
<p>Logout is another Server Action: <code>cookies().delete('session')</code> removes the wristband, then <code>redirect('/login')</code>. The next visit to <code>/dashboard</code> has no cookie, so middleware sends it back to the login page. Put the action on a form with a "Log out" button in the dashboard.</p>
<div class="mistake"><b>Common mistake</b>Trusting a cookie that simply contains the email, as this lesson's demo does. A cookie is just text in the user's browser: anyone can open the developer tools and set <code>session</code> to someone else's email. Real sessions use either a long random <b>session ID</b> that the server looks up in its database, or a <b>signed token</b> the server can verify hasn't been changed. Auth libraries do this for you.</div>
<div class="mistake"><b>Common mistake</b>Relying on middleware alone. It is a fast first check, not the only one. In 2025 a Next.js bug let attackers skip middleware entirely on some self-hosted apps. Check the session again where data is actually read or changed: in the page, the Server Action or the data function.</div>
<div class="tip"><b>Version note</b>This sandbox follows Next.js 14, where <code>cookies()</code> and <code>searchParams</code> are used directly. Since Next.js 15 they are asynchronous: write <code>(await cookies()).set(...)</code> and <code>const { error } = await searchParams</code>. Next.js 16 also renames <code>middleware.ts</code> to <code>proxy.ts</code>, with the function called <code>proxy</code>; the idea is unchanged.</div>
<p>In real projects, use a proven library such as <b>Auth.js</b> (formerly NextAuth), <b>Clerk</b> or Supabase Auth. They handle secure sessions, expiry, "log in with Google", password resets and many attacks you haven't met yet. Building it once by hand is how you understand what they do for you.</p>

<div class="try"><b>Try it in your head</b>Your matcher is <code>['/dashboard/:path*']</code>. A visitor with no cookie opens <code>/dashboard/billing</code>, then <code>/login</code>. What happens each time? Answer: <code>/dashboard/billing</code> matches, there is no session, so they are redirected to <code>/login</code>. <code>/login</code> doesn't match the matcher, so middleware doesn't run and the login page loads normally.</div>

<h4>Recap</h4>
<ul>
<li>Authentication checks who you are; authorisation checks what you may do. HTTP forgets you between requests, so a session cookie remembers you.</li>
<li>Store password hashes (bcrypt or argon2), never passwords. Mark session cookies <code>httpOnly</code>, <code>secure</code> and <code>sameSite: 'lax'</code>.</li>
<li>A login Server Action checks the password, calls <code>cookies().set(...)</code> and <code>redirect('/dashboard')</code>. Logout deletes the cookie.</li>
<li><code>middleware.ts</code> runs before matching routes; <code>NextResponse.redirect(new URL('/login', request.url))</code> turns away visitors without a session.</li>
<li>Real sessions must be unforgeable, and checked again near the data. Use Auth.js or Clerk in production.</li>
</ul>
`);
