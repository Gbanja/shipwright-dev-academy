/* frontend: "Explained step by step" walkthroughs. */

explain('fb1',`
<h4>What a web page really is</h4>
<p>When you open a website, your browser (Chrome, Firefox, Safari) downloads a plain text file from another computer and turns it into the page you see. That text file is written in <b>HTML</b>, which stands for HyperText Markup Language. "Markup" means you take ordinary text and mark it up with labels that say what each piece is: this line is a heading, this one is a paragraph, this word is a link.</p>
<p>HTML is not a programming language. It cannot add numbers or make decisions. It only <i>describes</i> content. That is exactly why it is the right place to start: there is nothing to calculate, just things to name.</p>
<p>A page is built from three languages that each have one job:</p>
<ul>
<li><b>HTML</b> says what is on the page: a heading, a paragraph, a picture.</li>
<li><b>CSS</b> says how it looks: colours, sizes and spacing. That is the next lesson.</li>
<li><b>JavaScript</b> makes it do things, like reacting to a click. That comes after.</li>
</ul>
<div class="analogy"><b>Think of it like</b>Building a house. HTML is the walls and rooms, CSS is the paint and furniture, and JavaScript is the electricity that makes the lights switch on. You build the walls first.</div>

<h4>Tags and elements</h4>
<p>HTML labels content with <b>tags</b>. A tag is a short word between angle brackets, the less-than and greater-than signs. Most tags come in pairs:</p>
<ul>
<li>An <b>opening tag</b>, such as <code>&lt;p&gt;</code>, marks where something starts.</li>
<li>A <b>closing tag</b>, such as <code>&lt;/p&gt;</code>, marks where it ends. It is the same word with a forward slash in front.</li>
</ul>
<p>The opening tag, the content and the closing tag together make one <b>element</b>. So <code>&lt;p&gt;I like maths.&lt;/p&gt;</code> is a paragraph element whose content is "I like maths." The browser never shows the tags themselves. It reads them, then shows the content in the right way: headings big and bold, paragraphs as blocks of text, links underlined and clickable.</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="An anchor element split into opening tag with an attribute, content and closing tag">
<text class="t-s" x="84" y="22" text-anchor="middle">attribute</text><text class="t-s" x="158" y="22" text-anchor="middle">value</text>
<path class="ln-d" d="M84 28v22"/><path class="ln-d" d="M158 28v22"/>
<rect class="bx-a" x="14" y="52" width="210" height="46" rx="6"/>
<text class="t-m" x="119" y="81" text-anchor="middle" style="font-size:17px">&lt;a href="/about"&gt;</text>
<rect class="bx-ok" x="232" y="52" width="76" height="46" rx="6"/>
<text class="t-m" x="270" y="81" text-anchor="middle" style="font-size:17px">About</text>
<rect class="bx-info" x="316" y="52" width="90" height="46" rx="6"/>
<text class="t-m" x="361" y="81" text-anchor="middle" style="font-size:17px">&lt;/a&gt;</text>
<g text-anchor="middle">
<text class="t-b t-a" x="119" y="124">opening tag</text>
<text class="t-b t-ok" x="270" y="124">content</text>
<text class="t-b t-info" x="361" y="124">closing tag</text>
</g>
<path class="ln" d="M18 142v10h388v-10"/>
<text class="t-b" x="210" y="176" text-anchor="middle">all of it together is one element</text>
<text class="t-s" x="210" y="198" text-anchor="middle">The browser shows only the content: a link saying About.</text>
</svg><figcaption>A link element in three parts. The opening tag holds the tag name a and an attribute called href. The content is the word About. The closing tag repeats the name with a slash. Together they form one element.</figcaption></figure>

<h4>The skeleton every page shares</h4>
<p>Open the starter code in the editor and you will see a few lines already there. Every HTML page has the same outline:</p>
<pre class="snip">&lt;!doctype html&gt;          &lt;!-- "this is modern HTML" --&gt;
&lt;html lang="en"&gt;          &lt;!-- the whole page; lang = English --&gt;
&lt;head&gt;                    &lt;!-- information ABOUT the page --&gt;
  &lt;meta charset="utf-8"&gt;  &lt;!-- which letters to expect --&gt;
  &lt;title&gt;About me&lt;/title&gt; &lt;!-- the text on the browser tab --&gt;
&lt;/head&gt;
&lt;body&gt;                    &lt;!-- everything people SEE --&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
<p>The notes on the right of each line are <b>comments</b>: notes for humans that the browser ignores. The key idea is the split between <code>&lt;head&gt;</code> and <code>&lt;body&gt;</code>. The head holds settings, such as the title shown on the browser tab. The body holds the visible page. All of today's work goes inside <code>&lt;body&gt;</code>, between its opening and closing tags.</p>
<p><code>charset="utf-8"</code> tells the browser which system of characters the file uses. UTF-8 covers every alphabet and symbol, so accented letters and the copyright sign come out correctly.</p>

<h4>The five tags for today</h4>
<p><b>Headings</b> go from <code>&lt;h1&gt;</code>, the most important, down to <code>&lt;h6&gt;</code>. Use one <code>&lt;h1&gt;</code> for the page's main title, like your name, then <code>&lt;h2&gt;</code> for sections such as "Things I like". Pick a heading by importance, not by size. Size is CSS's job.</p>
<p><b>Paragraphs</b> use <code>&lt;p&gt;</code>. Each one becomes its own block with a gap above and below. Pressing Enter inside your code does not start a new paragraph on the page; the browser treats line breaks and extra spaces in your code as a single space. Only a new <code>&lt;p&gt;</code> makes a new paragraph.</p>
<p><b>Links</b> use <code>&lt;a&gt;</code>, short for anchor. On its own an <code>&lt;a&gt;</code> goes nowhere. It needs to know its destination, and that is where attributes come in.</p>

<h4>Attributes: extra information inside the opening tag</h4>
<p>An <b>attribute</b> is a setting written inside the opening tag, in the form <code>name="value"</code>. For a link, the attribute <code>href</code> (hypertext reference) holds the address:</p>
<pre class="snip">&lt;a href="https://developer.mozilla.org"&gt;My favourite learning site&lt;/a&gt;</pre>
<p>Read it like a sentence: "a link, going to developer.mozilla.org, whose clickable words are My favourite learning site." A full address starts with <code>https://</code>. Without it, the browser thinks you mean a file on your own site, so <code>href="google.com"</code> looks for a page called google.com next to yours, and fails.</p>
<p><b>Lists</b> need two tags working together. <code>&lt;ul&gt;</code> (unordered list) is the list itself, and each item inside it is an <code>&lt;li&gt;</code> (list item). The browser adds the bullet points for you. If the order matters, like steps in a recipe, use <code>&lt;ol&gt;</code> (ordered list) instead and you get numbers.</p>
<pre class="snip">&lt;h2&gt;Things I like&lt;/h2&gt;
&lt;ul&gt;
  &lt;li&gt;Maths&lt;/li&gt;
  &lt;li&gt;Music&lt;/li&gt;
&lt;/ul&gt;</pre>
<p><b>Images</b> use <code>&lt;img&gt;</code>, and they are different in one way: an image has no content between tags, because the picture is loaded from a file. So <code>&lt;img&gt;</code> has <b>no closing tag</b>. It is called a <b>void element</b>. Everything it needs goes in two attributes:</p>
<ul>
<li><code>src</code> (source): the address of the picture file. In this lesson, <code>https://picsum.photos/200</code> serves a random 200 pixel photo.</li>
<li><code>alt</code> (alternative text): a short description of what the picture shows.</li>
</ul>
<pre class="snip">&lt;img src="https://picsum.photos/200" alt="A misty mountain lake at sunrise"&gt;</pre>

<h4>Why alt text matters</h4>
<p>Many people browse the web without seeing the screen. Blind and partially sighted people use a <b>screen reader</b>, a program that reads the page aloud. When it reaches an image, it reads the alt text. Without alt text it can only say "image", or read out the file name, which helps nobody.</p>
<p>Alt text also appears when the picture fails to load, on a slow train connection for example, and search engines read it to understand your images. Describe what the image shows, as you would to a friend on the phone. "Photo" is not helpful. "My dog Biscuit catching a frisbee" is.</p>
<div class="tip"><b>Tip</b>If an image is pure decoration and carries no meaning, give it an empty <code>alt=""</code>. That tells screen readers to skip it, which is better than leaving <code>alt</code> out.</div>

<h4>Nesting: boxes inside boxes</h4>
<p>Elements can sit inside other elements. The <code>&lt;li&gt;</code> items sit inside the <code>&lt;ul&gt;</code>, the list sits inside <code>&lt;body&gt;</code>, and the body sits inside <code>&lt;html&gt;</code>. This is called <b>nesting</b>. The outer element is the <b>parent</b> and the ones inside are its <b>children</b>, just like a family tree.</p>
<figure class="fig"><svg viewBox="0 0 420 260" role="img" aria-label="The page as a family tree: html contains head and body; body contains h1, p, ul and img; ul contains three li items">
<rect class="bx-dark" x="165" y="10" width="90" height="34" rx="6"/><text class="t-term" x="210" y="32" text-anchor="middle">html</text>
<path class="ln" d="M210 44v14M100 58h220M100 58v12M320 58v12"/>
<rect class="bx" x="55" y="70" width="90" height="34" rx="6"/><text class="t-m" x="100" y="92" text-anchor="middle">head</text>
<rect class="bx-a" x="275" y="70" width="90" height="34" rx="6"/><text class="t-m" x="320" y="92" text-anchor="middle">body</text>
<path class="ln" d="M100 104v16"/>
<rect class="bx" x="55" y="120" width="90" height="34" rx="6"/><text class="t-m" x="100" y="142" text-anchor="middle">title</text>
<path class="ln-a" d="M320 104v14M180 118h200M180 118v12M240 118v12M310 118v12M380 118v12"/>
<rect class="bx-ok" x="155" y="130" width="50" height="32" rx="6"/><text class="t-m" x="180" y="151" text-anchor="middle">h1</text>
<rect class="bx-ok" x="215" y="130" width="50" height="32" rx="6"/><text class="t-m" x="240" y="151" text-anchor="middle">p</text>
<rect class="bx-ok" x="285" y="130" width="50" height="32" rx="6"/><text class="t-m" x="310" y="151" text-anchor="middle">ul</text>
<rect class="bx-ok" x="355" y="130" width="50" height="32" rx="6"/><text class="t-m" x="380" y="151" text-anchor="middle">img</text>
<path class="ln-ok" d="M310 162v14M250 176h120M250 176v12M310 176v12M370 176v12"/>
<rect class="bx-info" x="227" y="188" width="46" height="30" rx="6"/><text class="t-m" x="250" y="208" text-anchor="middle">li</text>
<rect class="bx-info" x="287" y="188" width="46" height="30" rx="6"/><text class="t-m" x="310" y="208" text-anchor="middle">li</text>
<rect class="bx-info" x="347" y="188" width="46" height="30" rx="6"/><text class="t-m" x="370" y="208" text-anchor="middle">li</text>
<text class="t-s" x="100" y="176" text-anchor="middle">page settings</text>
<text class="t-s" x="20" y="244">Each line joins a parent (above) to its children (below).</text>
</svg><figcaption>The finished page as a tree. The html element holds the head and the body. Inside the body sit the heading, the paragraph, the list and the image. The list in turn holds three list items.</figcaption></figure>
<p>The one rule of nesting: <b>close tags in the reverse order you opened them</b>, like closing boxes inside boxes. <code>&lt;p&gt;&lt;a href="…"&gt;Hi&lt;/a&gt;&lt;/p&gt;</code> is correct. <code>&lt;p&gt;&lt;a href="…"&gt;Hi&lt;/p&gt;&lt;/a&gt;</code> crosses the lids over, and the browser has to guess what you meant.</p>
<p>Indent each child two spaces further than its parent. The browser does not care about indentation, but you will, because it lets you see the tree at a glance and spot a missing closing tag.</p>

<h4>Building the page, one task at a time</h4>
<p>Work through the tasks in order and press <b>Run</b> (or Ctrl+Enter) after each one to see the preview update:</p>
<ol>
<li>A <code>&lt;h1&gt;</code> with your name, directly inside <code>&lt;body&gt;</code>.</li>
<li>A <code>&lt;p&gt;</code> under it with a sentence about yourself.</li>
<li>An <code>&lt;a&gt;</code> whose <code>href</code> is a full address beginning with <code>https://</code>, with some words between the tags so there is something to click.</li>
<li>A <code>&lt;ul&gt;</code> holding at least three <code>&lt;li&gt;</code> items.</li>
<li>An <code>&lt;img&gt;</code> with both a <code>src</code> and a real <code>alt</code> description.</li>
</ol>
<div class="mistake"><b>Common mistake</b>Forgetting a closing tag. If you write <code>&lt;h1&gt;Ada Lovelace</code> and never close it, the browser keeps going and everything after it may turn into a giant heading. When text looks wrong, find the last element that looks right and check its closing tag.</div>
<div class="mistake"><b>Common mistake</b>Forgetting the quotes or the equals sign in an attribute, as in <code>&lt;a href=https://example.com&gt;</code> or <code>&lt;img src "cat.jpg"&gt;</code>. Always write <code>name="value"</code>, with straight double quotes. Quotes pasted from a word processor are curly, and the browser does not recognise them.</div>

<h4>When the page does not look right</h4>
<p>HTML almost never shows a red error message. Browsers are designed to be forgiving: they show <i>something</i> even when your code is broken. That is kind to visitors but means you have to be the detective:</p>
<ul>
<li><b>Text appears with angle brackets showing</b>, like a visible <code>&lt;p</code>: you probably missed a <code>&gt;</code>.</li>
<li><b>The link is not clickable</b>: check that <code>href</code> is inside the opening tag and has quotes.</li>
<li><b>A broken image icon appears</b>: the <code>src</code> address is wrong. Your alt text shows instead, which is exactly its job.</li>
<li><b>Nothing appears at all</b>: check the content is between <code>&lt;body&gt;</code> and <code>&lt;/body&gt;</code>, not in the head.</li>
</ul>
<div class="try"><b>Try it in your head</b>What will this show: <code>&lt;ul&gt;&lt;li&gt;Tea&lt;/li&gt;&lt;li&gt;Coffee&lt;/li&gt;&lt;/ul&gt;</code>? Answer: a bulleted list with two items, Tea and Coffee. And what is wrong with <code>&lt;img src="dog.jpg"&gt;&lt;/img&gt;</code>? Answer: img is a void element, so it has no closing tag, and it is missing its alt text.</div>

<h4>Recap</h4>
<ul>
<li>HTML describes what is on a page by wrapping content in tags. Opening tag, content and closing tag together form an element.</li>
<li>The head holds information about the page, and the body holds everything people see.</li>
<li>Use <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code> for headings, <code>&lt;p&gt;</code> for paragraphs, <code>&lt;ul&gt;</code> with <code>&lt;li&gt;</code> for lists.</li>
<li>Attributes such as <code>href</code>, <code>src</code> and <code>alt</code> go inside the opening tag as <code>name="value"</code>.</li>
<li><code>&lt;img&gt;</code> has no closing tag, and its alt text describes the picture for people who cannot see it.</li>
<li>Elements nest like boxes in boxes: close them in reverse order and indent children.</li>
</ul>
`);

explain('fb2',`
<h4>Why CSS exists</h4>
<p>In the last lesson you wrote HTML, and the browser showed it in its own plain default style: black text, a serif font, blue underlined links. HTML says <i>what</i> things are. It deliberately says nothing about how they look.</p>
<p>That job belongs to <b>CSS</b>, Cascading Style Sheets. Keeping the two apart is a big idea: you can restyle a whole website, every heading and every button, without touching a single word of content. One small change in the CSS updates a thousand pages at once.</p>
<p>In this lesson the CSS lives inside a <code>&lt;style&gt;</code> element in the page's head. The starter code already has an empty one with a comment saying "Write your CSS rules here". Everything you write today goes between <code>&lt;style&gt;</code> and <code>&lt;/style&gt;</code>. On bigger sites the same rules usually live in a separate <code>.css</code> file that every page links to, but they are written exactly the same way.</p>

<h4>The shape of a CSS rule</h4>
<p>CSS is a list of <b>rules</b>. Each rule answers two questions: <i>which elements?</i> and <i>what should change about them?</i></p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="A CSS rule: selector, braces, and declarations made of property and value">
<rect class="bx-dark" x="20" y="14" width="210" height="168" rx="8"/>
<text class="t-term" x="36" y="44" style="font-size:17px">h1 {</text>
<text class="t-term" x="56" y="80" style="font-size:17px">color: navy;</text>
<path class="ln-ok" d="M56 89h50"/><path class="ln-a" d="M127 89h41"/>
<text class="t-s t-ok" x="81" y="108" text-anchor="middle">property</text><text class="t-s t-a" x="148" y="108" text-anchor="middle">value</text>
<text class="t-term" x="56" y="142" style="font-size:17px">font-size: 40px;</text>
<text class="t-term" x="36" y="170" style="font-size:17px">}</text>
<path class="ln-a" d="M86 38h154"/><text class="t-b t-a" x="248" y="43">selector</text>
<path class="ln-d" d="M186 75h54"/><text class="t-s" x="248" y="80">declaration</text>
<path class="ln-d" d="M224 137h16"/><text class="t-s" x="248" y="142">declaration</text>
<text class="t-s" x="210" y="208" text-anchor="middle">Curly braces hold the declarations.</text>
<text class="t-s" x="210" y="228" text-anchor="middle">Each declaration ends with a semicolon.</text>
</svg><figcaption>The selector h1 picks every main heading. Inside the curly braces are declarations. Each declaration is a property, a colon, a value and a semicolon, so color colon navy means make the text colour navy.</figcaption></figure>
<p>Two pieces of vocabulary:</p>
<ul>
<li>The <b>selector</b>, before the curly braces, chooses which elements the rule applies to.</li>
<li>Each <b>declaration</b>, inside the braces, is one change: a <b>property</b> (the thing to change, such as <code>color</code>), a colon, a <b>value</b> (what to change it to, such as <code>navy</code>) and a semicolon.</li>
</ul>
<p>CSS uses American spelling for its own words. You write <code>color</code>, never "colour", or the browser will not recognise it.</p>

<h4>Three ways to choose elements</h4>
<p>The selector is the most important part of a rule, because a style that hits the wrong elements is useless. Start with three kinds.</p>
<p><b>By tag name.</b> Write the tag without angle brackets. <code>h1 { … }</code> styles every <code>&lt;h1&gt;</code> on the page. <code>body { … }</code> styles the body, and because text styles like fonts are <b>inherited</b> (passed down from parent to children), a font set on the body flows into every heading and paragraph inside it.</p>
<p><b>By class.</b> In the HTML you give an element a <code>class</code> attribute, such as <code>&lt;div class="card"&gt;</code>. In the CSS you select it with a full stop in front: <code>.card { … }</code>. A class is a reusable label. Ten elements can share it, and one element can have several, separated by spaces: <code>class="card featured"</code>. Most real CSS is written with classes.</p>
<p><b>By id.</b> In the HTML, <code>&lt;button id="buy"&gt;</code>. In the CSS, a hash sign in front: <code>#buy { … }</code>. An id names <b>one unique element</b>. No two elements on a page may share an id.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="Three selectors pointing at the elements they match in the coffee shop page">
<g text-anchor="middle">
<rect class="bx-a" x="14" y="20" width="96" height="38" rx="6"/><text class="t-m" x="62" y="44">h1</text>
<rect class="bx-ok" x="14" y="96" width="96" height="38" rx="6"/><text class="t-m" x="62" y="120">.card</text>
<rect class="bx-info" x="14" y="172" width="96" height="38" rx="6"/><text class="t-m" x="62" y="196">#buy</text>
</g>
<rect class="bx" x="180" y="10" width="228" height="210" rx="8"/>
<text class="t-m" x="194" y="44">&lt;h1&gt;Bean There</text>
<text class="t-m" x="194" y="74">&lt;p&gt;Fresh coffee…</text>
<rect class="bx-ok" x="190" y="90" width="208" height="120" rx="6"/>
<text class="t-m" x="200" y="116">&lt;div class="card"&gt;</text>
<text class="t-m" x="212" y="146">&lt;h2&gt;Flat white</text>
<rect class="bx-info" x="204" y="164" width="186" height="34" rx="5"/>
<text class="t-m" x="212" y="187">&lt;button id="buy"&gt;</text>
<path class="ln-a" d="M110 39h70"/><polygon class="ah-a" points="178,33 178,45 188,39"/>
<path class="ln-ok" d="M110 115h68"/><polygon class="ah-ok" points="178,109 178,121 188,115"/>
<path class="ln" d="M110 191h82"/><polygon class="ah" points="192,185 192,197 202,191"/>
</svg><figcaption>Each selector on the left points at what it matches in the page on the right. The tag selector h1 finds the heading. The class selector dot card finds the element with class card. The id selector hash buy finds the one button whose id is buy.</figcaption></figure>
<div class="mistake"><b>Common mistake</b>Mixing up the symbols. The HTML attribute is written without a symbol, <code>class="card"</code>, and the CSS selector with one, <code>.card</code>. Writing <code>card { }</code> in the CSS looks for a tag called card, which does not exist, so nothing happens and no error appears.</div>

<h4>When two rules disagree</h4>
<p>The C in CSS stands for <b>cascading</b>: several rules can apply to the same element, and the browser combines them. When two rules set the <i>same</i> property to different values, it picks a winner:</p>
<ol>
<li>The <b>more specific</b> selector wins. An id is more specific than a class, and a class is more specific than a tag name. So <code>#buy { color: white; }</code> beats <code>button { color: black; }</code>.</li>
<li>If they are equally specific, the rule written <b>later</b> wins.</li>
</ol>
<p>You will not need clever tricks today. Just remember: if a style "does not work", another, more specific rule may be overriding it.</p>

<h4>Colours and fonts</h4>
<p>You can write a colour in three common ways:</p>
<ul>
<li>A <b>name</b>: <code>white</code>, <code>navy</code>, <code>tomato</code>. Easy, but there are only about 140.</li>
<li>A <b>hex code</b>: <code>#6b3e26</code>. After the hash come three pairs of characters for red, green and blue. Each pair runs from <code>00</code> (none) to <code>ff</code> (full). Hex counts 0 to 9 and then a to f, so <code>ff</code> means 255.</li>
<li>An <b>rgb() value</b>: <code>rgb(107, 62, 38)</code>, the same three amounts written in ordinary numbers from 0 to 255.</li>
</ul>
<p>Decode <code>#6b3e26</code> step by step: red <code>6b</code> is 107, green <code>3e</code> is 62, blue <code>26</code> is 38. A fair amount of red, less green, very little blue: a warm coffee brown. <code>#ffffff</code> is all three at full, which is white, and <code>#000000</code> is black.</p>
<p>The property <code>color</code> sets the <b>text</b> colour. The property <code>background</code> (or <code>background-color</code>) sets the colour <b>behind</b> it. A button needs both: a dark background and light text, so people can read it.</p>
<p>For fonts, <code>font-family</code> takes a list, tried left to right:</p>
<pre class="snip">body {
  font-family: system-ui, sans-serif;
}</pre>
<p><code>system-ui</code> means "the device's own interface font", the one the phone or laptop uses for its menus. If that is not available, the browser falls back to any <code>sans-serif</code> font, a clean style without the little feet on letters. Always end the list with a general family like this as a safety net.</p>

<h4>The box model</h4>
<p>Here is the idea that unlocks all page layout: <b>every element is a rectangle</b>. Even a single word in a link has an invisible box around it. Each box is built in four layers, from the inside out.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="Box model: content inside padding, inside border, inside margin">
<rect class="bx-warn" x="10" y="10" width="400" height="230" rx="4"/>
<rect class="bx-a" x="56" y="44" width="308" height="162" rx="4"/>
<rect class="bx-ok" x="64" y="52" width="292" height="146" rx="2"/>
<rect class="bx-info" x="120" y="96" width="180" height="58" rx="2"/>
<text class="t-b" x="210" y="31" text-anchor="middle">margin: space outside</text>
<text class="t-b t-a" x="210" y="225" text-anchor="middle">border: the visible edge</text>
<text class="t-b t-ok" x="210" y="80" text-anchor="middle">padding: space inside</text>
<text class="t-b t-info" x="210" y="122" text-anchor="middle">content</text>
<text class="t-s" x="210" y="142" text-anchor="middle">the text itself</text>
</svg><figcaption>Four nested layers. In the middle is the content, the text itself. Around it is the padding, empty space inside the edge. Then the border, the visible line. Outside everything is the margin, empty space that pushes neighbours away.</figcaption></figure>
<ol>
<li><b>Content</b>: the text or image itself.</li>
<li><b>Padding</b>: empty space between the content and the border. It takes on the element's background colour, so it makes a card feel roomy.</li>
<li><b>Border</b>: a line around the padding. <code>border: 2px solid #6b3e26;</code> sets the width, the style (<code>solid</code>, <code>dashed</code>, <code>dotted</code>) and the colour in one go. Without a style, no border appears at all.</li>
<li><b>Margin</b>: empty, transparent space outside the border. It pushes other elements away.</li>
</ol>
<p>The simple test: do you want more room <b>inside</b> the frame, between the edge and the words? That is padding. Do you want more room <b>between</b> this box and the next one? That is margin.</p>
<p>Sizes are usually in <code>px</code>, pixels, the tiny dots on a screen. <code>padding: 16px;</code> adds 16 pixels on all four sides. To change just one side, add the side's name: <code>margin-bottom: 24px;</code> adds space only underneath. The sides are <code>top</code>, <code>right</code>, <code>bottom</code> and <code>left</code>.</p>

<h4>Putting it together on the coffee shop page</h4>
<p>Here is how the tasks map onto rules. Each line uses one idea from above:</p>
<pre class="snip">body  { font-family: system-ui, sans-serif; }  /* tag selector */
h1    { color: #6b3e26; }                     /* text colour   */
.card { padding: 16px;                         /* class selector */
        border: 2px solid #6b3e26; }</pre>
<p>For the remaining tasks, add <code>margin-bottom</code> to the <code>.card</code> rule (you can have several declarations in one rule), and write a new rule with the <code>#buy</code> selector that sets both <code>background</code> and <code>color</code>. Press Run after each change and watch the preview.</p>
<div class="mistake"><b>Common mistake</b>A missing semicolon. In <code>color: white background: brown;</code> the browser reads one broken declaration and quietly ignores <b>both</b> lines. CSS never shows an error; things just do not change. When a style refuses to apply, check the semicolons and the spelling first.</div>

<h4>Finding out why a style did not apply</h4>
<p>Because CSS fails silently, you need a checklist:</p>
<ul>
<li>Is the selector right? A missing full stop or hash, or a typo in the class name, matches nothing.</li>
<li>Is every declaration finished with a semicolon, and every rule closed with a curly brace?</li>
<li>Is the property spelled the CSS way, <code>color</code> and not "colour", <code>background</code> and not "backround"?</li>
<li>Is a more specific rule winning? In a real browser, right-click the element and choose Inspect. The developer tools list every rule that applies and cross out the ones that lost.</li>
</ul>
<div class="try"><b>Try it in your head</b>A card has <code>padding: 10px; border: 2px solid black; margin: 20px;</code>. How far is its text from the edge of the next card above it, if that card has no margin? Work outwards: 10 pixels of padding, 2 of border, 20 of margin, so 32 pixels in total. Which of those would be filled with the card's background colour? Only the 10 pixels of padding, because margin is always transparent.</div>

<h4>Recap</h4>
<ul>
<li>A CSS rule is a selector plus declarations: <code>property: value;</code>, each ending with a semicolon.</li>
<li>Select by tag (<code>h1</code>), by class (<code>.card</code>, reusable) or by id (<code>#buy</code>, unique).</li>
<li>When rules clash, the more specific selector wins, and if they are equal the later one wins.</li>
<li>Colours can be names, hex codes or <code>rgb()</code>. <code>color</code> is text, <code>background</code> is behind it.</li>
<li>Every element is a box: content, padding inside the border, the border, then margin outside.</li>
</ul>
`);

explain('fb3',`
<p>Every program ever written, from a calculator to Instagram, is built from the same five ideas. Learn them properly once and every language after this one is just new spelling.</p>

${V.card(1,'Variables','boxes that remember',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Three labelled boxes on a shelf: score holds 15, name is sealed and holds Ada, isLoggedIn holds true">
<path class="bx-a" d="M30 14H112L124 28 112 42H30Z"/><text class="t-m" x="74" y="33" text-anchor="middle">score</text>
<path class="bx-a" d="M164 14H246L258 28 246 42H164Z"/><text class="t-m" x="208" y="33" text-anchor="middle">name</text>
<path class="bx-a" d="M292 14H398L410 28 398 42H292Z"/><text class="t-m" x="348" y="33" text-anchor="middle">isLoggedIn</text>
<path class="ln-d" d="M76 42V70M210 42V64M346 42V70"/>
<rect class="bx-ok" x="22" y="64" width="108" height="14" rx="3" transform="rotate(-16 22 78)"/>
<rect class="bx-ok" x="22" y="78" width="108" height="78" rx="6"/><text class="t-m" x="76" y="124" text-anchor="middle" style="font-size:22px">15</text>
<rect class="bx-info" x="152" y="64" width="116" height="14" rx="3"/>
<rect class="bx-info" x="156" y="78" width="108" height="78" rx="6"/><text class="t-m" x="210" y="124" text-anchor="middle" style="font-size:20px">'Ada'</text>
${V.ic('lock',232,124,28,'ic-info')}
<rect class="bx-ok" x="290" y="64" width="108" height="14" rx="3" transform="rotate(-16 290 78)"/>
<rect class="bx-ok" x="290" y="78" width="108" height="78" rx="6"/><text class="t-m" x="344" y="124" text-anchor="middle" style="font-size:20px">true</text>
<path class="ln" style="stroke-width:4" d="M8 158H412"/>
<text class="t-s" x="76" y="182" text-anchor="middle">let: can refill</text>
<text class="t-s" x="210" y="182" text-anchor="middle">const: sealed</text>
<text class="t-s" x="344" y="182" text-anchor="middle">let: can refill</text>
</svg><figcaption>Three variables. Each is a box with a name tag. The value is what is inside. let boxes have an open lid, so you can swap the contents. The const box is sealed once it is filled.</figcaption></figure>
${V.like(`<p>A labelled storage box. The <b>label</b> is the variable's name, the <b>contents</b> are its value. Say the name, and the computer opens that box and hands you what's inside.</p>`)}
${V.why(`<p>Programs constantly need to remember things: your score, your name, what is in your basket. Inside the computer, memory is billions of numbered slots with addresses like <code>0x7ffd3a10</code>. The first programmers had to remember those numbers by hand. Variables were invented so you can give a slot a human name and write <code>score</code> instead.</p>`)}
${V.anat([[1,'let'],' ',[2,'score'],' ',[3,'='],' ',[4,'10'],[5,';']],[
 '<b>Keyword.</b> <code>let</code> means "make a new box I may refill". <code>const</code> means "make a sealed box".',
 '<b>Name.</b> The label on the box. You choose it, then use it later to get the value back.',
 '<b>Assignment.</b> <code>=</code> means "put into", not "equals". Read it right to left: put 10 into score.',
 '<b>Value.</b> What goes in the box: a number (<code>10</code>), text in quotes (<code>\'Ada\'</code>), <code>true</code> or <code>false</code>, a list, and more.',
 '<b>Semicolon.</b> Ends the instruction, like a full stop ends a sentence.'])}
<p><b>Watch the computer run it.</b> Press Next and follow the arrow down the code while the boxes change.</p>
${V.steps([
 ['Line 1 runs. The computer makes a new box, writes <b>score</b> on its tag and puts <b>10</b> inside.',`<svg viewBox="0 0 420 200" role="img" aria-label="Memory after line 1: score holds 10">
<rect class="bx-dark" x="6" y="8" width="214" height="150" rx="8"/>
<text class="t-a" x="14" y="44" style="font-size:15px">&#9654;</text>
<text class="t-term" x="32" y="44" style="font-size:14px">let score = 10;</text>
<text class="t-term t-dim" x="32" y="76" style="font-size:14px">score = score + 5;</text>
<text class="t-term t-dim" x="32" y="108" style="font-size:14px">const name = 'Ada';</text>
<text class="t-term t-dim" x="32" y="140" style="font-size:14px">name = 'Bob';</text>
<text class="t-s" x="238" y="24">Memory</text>
<text class="t-m" x="238" y="50">score</text><rect class="bx-ok" x="236" y="56" width="176" height="40" rx="6"/><text class="t-m" x="324" y="82" text-anchor="middle" style="font-size:19px">10</text>
</svg>`],
 ['Line 2. The right side is worked out first: it reads <b>score</b> (10) and adds 5. Then it puts the answer, <b>15</b>, back in the same box. The old 10 is gone for good.',`<svg viewBox="0 0 420 200" role="img" aria-label="Memory after line 2: score holds 15, old value 10 crossed out">
<rect class="bx-dark" x="6" y="8" width="214" height="150" rx="8"/>
<text class="t-term t-dim" x="32" y="44" style="font-size:14px">let score = 10;</text>
<text class="t-a" x="14" y="76" style="font-size:15px">&#9654;</text>
<text class="t-term" x="32" y="76" style="font-size:14px">score = score + 5;</text>
<text class="t-term t-dim" x="32" y="108" style="font-size:14px">const name = 'Ada';</text>
<text class="t-term t-dim" x="32" y="140" style="font-size:14px">name = 'Bob';</text>
<text class="t-s" x="238" y="24">Memory</text>
<text class="t-m" x="238" y="50">score</text><rect class="bx-ok" x="236" y="56" width="176" height="40" rx="6"/>
<text class="t-m t-dim" x="290" y="82" text-anchor="middle" style="font-size:17px">10</text><path class="ln-x" d="M276 86 304 70"/>
<text class="t-ok" x="318" y="82" style="font-size:15px">&#10140;</text><text class="t-m" x="360" y="82" text-anchor="middle" style="font-size:19px">15</text>
<text class="t-s" x="238" y="120">10 + 5 = 15</text>
</svg>`],
 ['Line 3. <b>const</b> makes a sealed box called <b>name</b> holding the text <b>\'Ada\'</b>. Text always goes inside quotes.',`<svg viewBox="0 0 420 200" role="img" aria-label="Memory after line 3: score 15 and sealed box name holding Ada">
<rect class="bx-dark" x="6" y="8" width="214" height="150" rx="8"/>
<text class="t-term t-dim" x="32" y="44" style="font-size:14px">let score = 10;</text>
<text class="t-term t-dim" x="32" y="76" style="font-size:14px">score = score + 5;</text>
<text class="t-a" x="14" y="108" style="font-size:15px">&#9654;</text>
<text class="t-term" x="32" y="108" style="font-size:14px">const name = 'Ada';</text>
<text class="t-term t-dim" x="32" y="140" style="font-size:14px">name = 'Bob';</text>
<text class="t-s" x="238" y="24">Memory</text>
<text class="t-m" x="238" y="50">score</text><rect class="bx-ok" x="236" y="56" width="176" height="40" rx="6"/><text class="t-m" x="324" y="82" text-anchor="middle" style="font-size:19px">15</text>
<text class="t-m" x="238" y="120">name</text><rect class="bx-info" x="236" y="126" width="176" height="40" rx="6"/><text class="t-m" x="310" y="152" text-anchor="middle" style="font-size:18px">'Ada'</text>
${V.ic('lock',374,131,30,'ic-info')}
</svg>`],
 ['Line 4 tries to refill the sealed box. JavaScript refuses and stops with a <b>TypeError</b>. That is const protecting you from changing something by accident.',`<svg viewBox="0 0 420 200" role="img" aria-label="Line 4 fails: TypeError, assignment to constant variable">
<rect class="bx-dark" x="6" y="8" width="214" height="150" rx="8"/>
<text class="t-term t-dim" x="32" y="44" style="font-size:14px">let score = 10;</text>
<text class="t-term t-dim" x="32" y="76" style="font-size:14px">score = score + 5;</text>
<text class="t-term t-dim" x="32" y="108" style="font-size:14px">const name = 'Ada';</text>
<text class="t-a" x="14" y="140" style="font-size:15px">&#9654;</text>
<text class="t-term" x="32" y="140" style="font-size:14px">name = 'Bob';</text>
<text class="t-s" x="238" y="24">Memory</text>
<text class="t-m" x="238" y="50">score</text><rect class="bx-ok" x="236" y="56" width="176" height="40" rx="6"/><text class="t-m" x="324" y="82" text-anchor="middle" style="font-size:19px">15</text>
<text class="t-m" x="238" y="120">name</text><rect class="bx-bad" x="236" y="126" width="176" height="40" rx="6"/><text class="t-m" x="310" y="152" text-anchor="middle" style="font-size:18px">'Ada'</text>
${V.ic('cross',372,129,34,'ic-bad')}
<text class="t-bad" x="8" y="190" style="font-size:14px">TypeError: Assignment to constant variable.</text>
</svg>`]])}
${V.rules(V.rh('Rules: break one and the code will not run'),
 V.no('2ndPlace','A name cannot start with a digit'),V.ok('place2','Digits are fine after the first character'),
 V.no('first name','No spaces: the computer sees two words'),V.no('user-age','A hyphen is read as minus: user minus age'),
 V.no('let, if, class','Reserved words already mean something'),V.ok('score vs Score','Capitals matter: these are two different boxes'),
 V.rh('Conventions: what professionals do so code reads easily'),
 V.ok('totalPrice','camelCase: first word small, each next word starts with a capital'),V.no('tp, x, data2','Vague names: next week you will not know what they hold'),
 V.ok('isLoggedIn','true/false values read like a yes/no question'),V.ok('const first','Use let only when the value really must change'))}
${V.build(`<ol><li>Decide what to remember: the player's score.</li><li>Pick a clear name: <code>score</code>.</li><li>Will it change? Yes, so use <code>let</code>.</li><li>Create and fill it: <code>let score = 0;</code></li><li>Use it: <code>console.log(score);</code></li><li>Change it: <code>score = score + 10;</code></li></ol>`)}
${V.hook(`Name it, fill it, use it. <code>const</code> is a sealed box, <code>let</code> is a refillable one, and <code>=</code> means "put into".`)}
`)}

${V.card(2,'Functions','recipes you write once and use forever',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="4 goes into the double machine and 8 comes out">
<circle class="bx-info" cx="50" cy="70" r="30"/><text class="t-m" x="50" y="78" text-anchor="middle" style="font-size:24px">4</text>
<text class="t-s" x="50" y="124" text-anchor="middle">argument</text>
<path class="ln-a" d="M84 70H140"/><polygon class="ah-a" points="138,63 138,77 150,70"/>
<rect class="bx-a" x="152" y="16" width="116" height="108" rx="10"/>${V.ic('gear',184,26,52,'ic-a')}
<text class="t-m" x="210" y="106" text-anchor="middle">double(n)</text>
<text class="t-s" x="210" y="146" text-anchor="middle">return n * 2</text>
<path class="ln-ok" d="M272 70H328"/><polygon class="ah-ok" points="326,63 326,77 338,70"/>
<circle class="bx-ok" cx="370" cy="70" r="30"/><text class="t-m" x="370" y="78" text-anchor="middle" style="font-size:24px">8</text>
<text class="t-s" x="370" y="124" text-anchor="middle">returned</text>
</svg><figcaption>A function is a machine with a name. Something goes in (the argument 4), the same steps run inside, and a result comes out (8).</figcaption></figure>
${V.like(`<p>A recipe card. The ingredients are the <b>inputs</b>, the method is the <b>body</b>, and the finished dish is the <b>return value</b>. You write the recipe once and cook it whenever you like.</p>`)}
${V.why(`<p>Without functions you would copy the same lines everywhere, and fixing one bug would mean fixing every copy. A function gives a set of steps one name, so you write them once and simply call the name.</p>`)}
${V.anat([[1,'function'],' ',[2,'double'],[3,'(n)'],' {\n  ',[4,'return'],' ',[5,'n * 2'],';\n}'],[
 '<b>Keyword.</b> "I am defining a recipe." Nothing runs yet.',
 '<b>Name.</b> Use a verb, because functions do things: <code>double</code>, <code>addTax</code>, <code>canVote</code>.',
 '<b>Parameter.</b> An empty box, filled with whatever you pass in each time you call it.',
 '<b>return.</b> Hands the answer back to whoever called the function, and stops it.',
 '<b>The work.</b> What to do with the inputs.'])}
${V.steps([['JavaScript reaches <b>double(4)</b>. It jumps into the function and puts <b>4</b> into the parameter box <b>n</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="Calling double with 4 fills n with 4"><text class="t-m" x="16" y="34" style="font-size:17px">const result = <tspan class="t-a" style="font-weight:700">double(4)</tspan>;</text><rect class="ln-d" x="16" y="60" width="388" height="96" rx="10"/><text class="t-s" x="30" y="82">inside double</text><text class="t-m" x="34" y="132" style="font-size:19px">n</text><rect class="bx-info" x="58" y="104" width="84" height="42" rx="6"/><text class="t-m" x="100" y="132" text-anchor="middle" style="font-size:19px">4</text><path class="ln-a" d="M262 42C262 76 128 66 104 98"/><polygon class="ah-a" points="97,94 109,94 103,104"/></svg>`],['Inside, it works out <b>n * 2</b>. n is 4, so the answer is <b>8</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="n times 2 is 8"><text class="t-m" x="16" y="34" style="font-size:17px">const result = double(4);</text><rect class="ln-d" x="16" y="60" width="388" height="96" rx="10"/><text class="t-s" x="30" y="82">inside double</text><text class="t-m" x="34" y="132" style="font-size:19px">n</text><rect class="bx-info" x="58" y="104" width="84" height="42" rx="6"/><text class="t-m" x="100" y="132" text-anchor="middle" style="font-size:19px">4</text><text class="t-m" x="176" y="132" style="font-size:19px">4 * 2 = <tspan class="t-ok" style="font-weight:700">8</tspan></text></svg>`],['<b>return</b> sends 8 back out. The call <b>double(4)</b> is replaced by its answer, as if you had written 8 there.',`<svg viewBox="0 0 420 170" role="img" aria-label="return 8 replaces the call"><text class="t-m" x="16" y="34" style="font-size:17px">const result = <tspan class="t-ok" style="font-weight:700">8</tspan>;</text><rect class="ln-d" x="16" y="60" width="388" height="96" rx="10"/><text class="t-s" x="30" y="82">inside double</text><text class="t-m" x="176" y="132" style="font-size:19px">return 8</text><path class="ln-ok" d="M222 110C222 72 186 62 168 44"/><polygon class="ah-ok" points="163,52 175,46 164,38"/></svg>`],['8 goes into the box <b>result</b>. The function is finished and its temporary box n is thrown away. Call it again with 21 and you get 42.',`<svg viewBox="0 0 420 170" role="img" aria-label="result holds 8"><text class="t-m" x="16" y="34" style="font-size:17px">const result = double(4);</text><text class="t-m" x="16" y="104" style="font-size:19px">result</text><rect class="bx-ok" x="94" y="78" width="96" height="42" rx="6"/><text class="t-m" x="142" y="106" text-anchor="middle" style="font-size:20px">8</text><text class="t" x="214" y="96">double(21) gives 42</text><text class="t" x="214" y="122">double(0) gives 0</text></svg>`]])}
${V.rules(V.ok('double(4)','Parentheses make it run (a "call")'),V.no('double','Without () you only point at the recipe; nothing runs'),
 V.ok('return n * 2;','return hands the answer back'),V.no('console.log(n * 2)','Printing is not returning: the caller gets undefined'))}
${V.hook(`Ingredients in, dish out. Define once, call many times. No <code>return</code>, no answer.`)}
`)}

${V.card(3,'Decisions','if / else: a fork in the road',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="Fork: is temperature over 25? Yes: wear a t-shirt. No: bring a jacket">
<polygon class="bx-warn" points="210,10 330,58 210,106 90,58"/>
<text class="t-m" x="210" y="56" text-anchor="middle" style="font-size:14px">temperature</text><text class="t-m" x="210" y="76" text-anchor="middle" style="font-size:14px">&gt; 25 ?</text>
<path class="ln-ok" d="M118 76 70 124"/><polygon class="ah-ok" points="64,116 76,124 64,130"/><text class="t-b t-ok" x="68" y="96">true</text>
<path class="ln" d="M302 76 350 124"/><polygon class="ah" points="356,116 344,124 356,130"/><text class="t-b" x="328" y="96">false</text>
<rect class="bx-ok" x="10" y="132" width="150" height="46" rx="8"/><text class="t" x="85" y="161" text-anchor="middle">Wear a t-shirt</text>
<rect class="bx" x="260" y="132" width="150" height="46" rx="8"/><text class="t" x="335" y="161" text-anchor="middle">Bring a jacket</text>
</svg><figcaption>The condition is a yes/no question. If it is true, the first block runs; if not, the else block runs. Never both.</figcaption></figure>
${V.why(`<p>Real programs react to what happens: show an error if the password is wrong, give free delivery over £50. <code>if</code> is how code chooses.</p>`)}
${V.anat([[1,'if'],' (',[2,'temperature &gt; 25'],') ',[3,'{ … }'],' ',[4,'else'],' ',[5,'{ … }']],[
 '<b>if</b> starts the question.','<b>Condition.</b> Anything that ends up true or false.','<b>Runs when true.</b>','<b>else</b> means "otherwise". It is optional.','<b>Runs when false.</b>'])}
${V.rules(V.ok('a === b','Is equal (three = signs)'),V.ok('a !== b','Is not equal'),V.ok('age &gt;= 18','At least 18: the 18 itself counts'),
 V.no('if (age = 18)','One = PUTS 18 into age. Always use === to compare'),V.no('a == b','Two = signs bend the rules: "5" == 5 is true. Avoid it'))}
${V.hook(`A question in brackets. True takes the first door, false takes <code>else</code>. <code>=</code> stores, <code>===</code> compares.`)}
`)}

${V.card(4,'Arrays and loops','a row of lockers, visited one by one',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="The array prices holds 4, 2 and 3.5 at positions 0, 1 and 2">
<path class="bx-a" d="M14 12H102L114 26 102 40H14Z"/><text class="t-m" x="58" y="31" text-anchor="middle">prices</text><path class="ln-d" d="M58 40V58"/>
<rect class="bx" x="58" y="58" width="100" height="56" rx="6"/><text class="t-m" x="108" y="93" text-anchor="middle" style="font-size:20px">4</text>
<rect class="bx" x="160" y="58" width="100" height="56" rx="6"/><text class="t-m" x="210" y="93" text-anchor="middle" style="font-size:20px">2</text>
<rect class="bx" x="262" y="58" width="100" height="56" rx="6"/><text class="t-m" x="312" y="93" text-anchor="middle" style="font-size:20px">3.5</text>
<text class="t-b t-a" x="108" y="138" text-anchor="middle">[0]</text><text class="t-b t-a" x="210" y="138" text-anchor="middle">[1]</text><text class="t-b t-a" x="312" y="138" text-anchor="middle">[2]</text>
</svg><figcaption>An array is one variable holding a numbered row of values. The numbers, called indexes, start at 0, so prices[0] is 4 and the last of three items is prices[2].</figcaption></figure>
${V.like(`<p>A row of school lockers. The whole row has one name, and each locker has a number starting at 0. A <b>loop</b> is walking along the row, opening each locker in turn and doing the same job.</p>`)}
${V.steps([
 ['Before the loop: make a running total, <b>sum</b>, starting at 0.',`<svg viewBox="0 0 420 150" role="img" aria-label="sum starts at 0">
<rect class="bx" x="20" y="14" width="110" height="46" rx="6"/><text class="t-m" x="75" y="44" text-anchor="middle">4</text>
<rect class="bx" x="140" y="14" width="110" height="46" rx="6"/><text class="t-m" x="195" y="44" text-anchor="middle">2</text>
<rect class="bx" x="260" y="14" width="110" height="46" rx="6"/><text class="t-m" x="315" y="44" text-anchor="middle">3.5</text>
<text class="t-m" x="20" y="116">sum</text><rect class="bx-ok" x="64" y="92" width="100" height="38" rx="6"/><text class="t-m" x="114" y="118" text-anchor="middle" style="font-size:19px">0</text>
</svg>`],
 ['First trip: <b>price</b> is 4. sum becomes 0 + 4 = <b>4</b>.',`<svg viewBox="0 0 420 150" role="img" aria-label="price 4, sum 4">
<rect class="bx-hl" x="20" y="14" width="110" height="46" rx="6"/><text class="t-m" x="75" y="44" text-anchor="middle">4</text>
<rect class="bx" x="140" y="14" width="110" height="46" rx="6"/><text class="t-m" x="195" y="44" text-anchor="middle">2</text>
<rect class="bx" x="260" y="14" width="110" height="46" rx="6"/><text class="t-m" x="315" y="44" text-anchor="middle">3.5</text>
<text class="t-m" x="20" y="116">sum</text><rect class="bx-ok" x="64" y="92" width="100" height="38" rx="6"/><text class="t-m" x="114" y="118" text-anchor="middle" style="font-size:19px">4</text>
<text class="t-s" x="190" y="116">0 + 4 = 4</text>
</svg>`],
 ['Second trip: <b>price</b> is 2. sum becomes 4 + 2 = <b>6</b>.',`<svg viewBox="0 0 420 150" role="img" aria-label="price 2, sum 6">
<rect class="bx" x="20" y="14" width="110" height="46" rx="6"/><text class="t-m" x="75" y="44" text-anchor="middle">4</text>
<rect class="bx-hl" x="140" y="14" width="110" height="46" rx="6"/><text class="t-m" x="195" y="44" text-anchor="middle">2</text>
<rect class="bx" x="260" y="14" width="110" height="46" rx="6"/><text class="t-m" x="315" y="44" text-anchor="middle">3.5</text>
<text class="t-m" x="20" y="116">sum</text><rect class="bx-ok" x="64" y="92" width="100" height="38" rx="6"/><text class="t-m" x="114" y="118" text-anchor="middle" style="font-size:19px">6</text>
<text class="t-s" x="190" y="116">4 + 2 = 6</text>
</svg>`],
 ['Last trip: <b>price</b> is 3.5. sum becomes 6 + 3.5 = <b>9.5</b>. No lockers left, so the loop ends and the function returns 9.5.',`<svg viewBox="0 0 420 150" role="img" aria-label="price 3.5, sum 9.5">
<rect class="bx" x="20" y="14" width="110" height="46" rx="6"/><text class="t-m" x="75" y="44" text-anchor="middle">4</text>
<rect class="bx" x="140" y="14" width="110" height="46" rx="6"/><text class="t-m" x="195" y="44" text-anchor="middle">2</text>
<rect class="bx-hl" x="260" y="14" width="110" height="46" rx="6"/><text class="t-m" x="315" y="44" text-anchor="middle">3.5</text>
<text class="t-m" x="20" y="116">sum</text><rect class="bx-ok" x="64" y="92" width="100" height="38" rx="6"/><text class="t-m" x="114" y="118" text-anchor="middle" style="font-size:19px">9.5</text>
<text class="t-s" x="190" y="116">6 + 3.5 = 9.5</text>
</svg>`]])}
<pre class="snip">let sum = 0;
for (const price of prices) {   // visit each locker in turn
  sum = sum + price;
}</pre>
${V.rules(V.ok('prices[0]','The first item is at index 0'),V.no('prices[3]','One past the end: you get undefined'),
 V.ok('prices.length','How many items there are (3)'),V.ok('for (const p of list)','Visits every item; no counting needed'))}
${V.hook(`A row of lockers numbered from 0. A loop does the same job at every locker.`)}
`)}

${V.card(5,'Objects','values with labels, like an ID card',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="An ID card object with name Ada and age 36">
<rect class="bx-info" x="70" y="10" width="280" height="130" rx="12"/>${V.ic('person',92,38,64,'ic-info')}
<text class="t-s" x="176" y="52">name</text><text class="t-m" x="240" y="52">'Ada'</text>
<text class="t-s" x="176" y="88">age</text><text class="t-m" x="240" y="88">36</text>
<text class="t-s" x="176" y="124">user.name gives 'Ada'</text>
</svg><figcaption>An object stores related values under labels called keys. You ask for a value by its label, user.name, instead of remembering its position.</figcaption></figure>
${V.anat([[1,'{'],' ',[2,'name'],[3,':'],' ',[4,"'Ada'"],[5,','],' age: 36 ',[1,'}']],[
 '<b>Curly braces</b> wrap the whole object.','<b>Key.</b> The label.','<b>Colon</b> joins a key to its value.','<b>Value.</b> Anything: text, a number, even another object.','<b>Comma</b> separates one pair from the next.'])}
<p>To put values inside text, use backticks and <code>\${ }</code>: <code>\`\${user.name} is \${user.age}\`</code> becomes <code>Ada is 36</code>. This is called a template string.</p>
${V.hook(`Arrays find things by position. Objects find things by name.`)}
`)}

<div class="try"><b>Try it in your head</b>1. After <code>let a = 3; a = a * 2;</code> what is in a? <i>6.</i> 2. What does <code>double(5)</code> give if double has no return? <i>undefined.</i> 3. In <code>['x','y','z']</code>, what is at index 1? <i>'y'.</i></div>
`);

explain('fb4',`
<h4>Bugs are normal, guessing is optional</h4>
<p>A <b>bug</b> is any difference between what you wanted your code to do and what it actually does. Every programmer writes them, every day, at every level of experience. What separates a beginner from a professional is not fewer bugs. It is a calm, repeatable <b>method</b> for finding them.</p>
<p>The beginner's instinct is to stare at the code and change things until it works. That is slow, and when it does finally work you do not know why. Debugging properly means treating the bug like a mystery: gather clues, form a theory, test it, then act.</p>
<p>The starter code is a small shopping cart with <b>four</b> planted bugs. The instruction at the top says not to hunt for them line by line. That is the point of the lesson: let the computer tell you where to look.</p>

<h4>The debugging loop</h4>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="A loop of five steps: run, read, guess, test, fix one thing, then run again">
<rect class="bx-dark" x="150" y="10" width="120" height="38" rx="8"/><text class="t-term" x="210" y="35" text-anchor="middle">1. Run it</text>
<rect class="bx-a" x="290" y="76" width="120" height="38" rx="8"/><text class="t-b" x="350" y="100" text-anchor="middle">2. Read</text>
<rect class="bx-warn" x="250" y="170" width="120" height="38" rx="8"/><text class="t-b" x="310" y="194" text-anchor="middle">3. Guess</text>
<rect class="bx-info" x="50" y="170" width="120" height="38" rx="8"/><text class="t-b" x="110" y="194" text-anchor="middle">4. Test</text>
<rect class="bx-ok" x="10" y="76" width="120" height="38" rx="8"/><text class="t-b" x="70" y="100" text-anchor="middle">5. Fix one</text>
<path class="ln" d="M270 34q70 4 78 34"/><polygon class="ah" points="342,66 354,66 348,76"/>
<path class="ln" d="M350 114q2 40 -22 52"/><polygon class="ah" points="332,160 334,172 324,168"/>
<path class="ln" d="M250 189h-70"/><polygon class="ah" points="182,183 182,195 172,189"/>
<path class="ln" d="M80 170q-12 -30 -10 -48"/><polygon class="ah" points="64,124 76,124 70,114"/>
<path class="ln" d="M70 76q4 -36 72 -42"/><polygon class="ah" points="140,28 140,40 150,34"/>
<text class="t-s" x="210" y="236" text-anchor="middle">Go round once per bug, until it all works.</text>
</svg><figcaption>The debugging loop. Run the code. Read what went wrong. Guess the cause. Test the guess by looking at real values. Fix one thing only. Then run again and go round the loop for the next problem.</figcaption></figure>
<ol>
<li><b>Run it.</b> See the problem happen with your own eyes. This is called <b>reproducing</b> the bug.</li>
<li><b>Read</b> the error, or describe exactly what is wrong: "it printed undefined where I expected a price".</li>
<li><b>Guess</b> a cause. One specific theory, not "something is broken".</li>
<li><b>Test</b> the guess by looking at real values, usually with <code>console.log</code>.</li>
<li><b>Fix one thing</b>, then run again. If you change five things at once and it starts working, you will not know which change mattered, and you may have added a new bug.</li>
</ol>

<h4>How to read an error message</h4>
<p>When JavaScript hits a problem it cannot get past, it stops and <b>throws an error</b>: a message saying what went wrong. Beginners often skim the red text in a panic. Slow down. It is the most useful clue you will ever get.</p>
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="An error message split into its type and its message">
<rect class="bx-dark" x="10" y="20" width="400" height="44" rx="6"/>
<text class="t-term t-bad" x="22" y="48">ReferenceError:</text>
<text class="t-term" x="168" y="48">formatPrise is not defined</text>
<path class="ln-a" d="M22 74v8h132v-8"/><path class="ln-ok" d="M168 74v8h232v-8"/>
<text class="t-b t-a" x="88" y="104" text-anchor="middle">the TYPE</text>
<text class="t-b t-ok" x="284" y="104" text-anchor="middle">the MESSAGE</text>
<text class="t-s" x="88" y="124" text-anchor="middle">what kind of problem</text>
<text class="t-s" x="284" y="124" text-anchor="middle">exactly what, in plain words</text>
</svg><figcaption>The first error this lesson's code produces. The type, ReferenceError, says what kind of problem it is: an unknown name. The message names the exact culprit: formatPrise is not defined.</figcaption></figure>
<p>An error has up to three parts:</p>
<ul>
<li>The <b>type</b>, before the colon, tells you the category of problem.</li>
<li>The <b>message</b> names the exact thing that failed, often by its variable or function name.</li>
<li>The <b>location</b>, when shown, gives the line number where JavaScript gave up. The real mistake is usually on that line, though sometimes on one just above it.</li>
</ul>
<p>The types you will meet most often:</p>
<div class="tbl-wrap"><table><tr><th>Error type</th><th>What it usually means</th></tr>
<tr><td><code>ReferenceError</code></td><td>You used a name that does not exist. Very often a typo, or a capital letter in the wrong place.</td></tr>
<tr><td><code>TypeError</code></td><td>The thing exists but is the wrong kind for what you did. Most often: reading a property of <code>undefined</code>.</td></tr>
<tr><td><code>SyntaxError</code></td><td>The code is not valid JavaScript at all: a missing bracket, quote or comma. Nothing runs.</td></tr></table></div>
<p>Important: JavaScript stops at the <b>first</b> error. Fixing it often reveals the next one. A new, different error after a fix is progress, not failure.</p>

<h4>Bug one: the name that does not exist</h4>
<p>Run the starter code. The error says <code>formatPrise</code> is not defined. Search the code for that name and compare it with the function definitions. The function was created with one spelling and called with another. JavaScript treats names as exact strings of letters, so one wrong letter is a completely different name.</p>
<p>That is the classic <code>ReferenceError</code>: always compare the name in the message, letter by letter, with where you defined it.</p>

<h4>Bug two: off by one</h4>
<p>Fix the typo and run again. A new error appears: a <code>TypeError</code> that cannot read <code>price</code> of <code>undefined</code>. Decode it slowly. Something tried to do <code>something.price</code>, and that something was <code>undefined</code>, JavaScript's word for "no value here".</p>
<p>The only place that reads <code>.price</code> is inside <code>cartTotal</code>, on <code>items[i]</code>. Arrays are <b>numbered from zero</b>: the first item is at position 0, the second at position 1. So a list of 2 items has positions 0 and 1, and its <code>length</code> is 2. Ask for position 2 and you get <code>undefined</code>, because nothing is there.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="An array of two items at positions 0 and 1; position 2 is empty and gives undefined">
<g text-anchor="middle">
<rect class="bx-ok" x="30" y="40" width="110" height="50" rx="6"/><text class="t-b" x="85" y="70">Mug</text>
<rect class="bx-ok" x="150" y="40" width="110" height="50" rx="6"/><text class="t-b" x="205" y="70">Tea</text>
<rect class="bx-bad" x="270" y="40" width="110" height="50" rx="6"/><text class="t-m t-bad" x="325" y="70">undefined</text>
<text class="t-m" x="85" y="26">i = 0</text><text class="t-m" x="205" y="26">i = 1</text><text class="t-m t-bad" x="325" y="26">i = 2</text>
</g>
<path class="ln-ok" d="M30 112h230"/><text class="t-s t-ok" x="145" y="132" text-anchor="middle">i &lt; length: stops here, correct</text>
<path class="ln-a" d="M30 156h350"/><text class="t-s t-a" x="205" y="176" text-anchor="middle">i &lt;= length: one step too far</text>
<text class="t-s" x="325" y="112" text-anchor="middle">length is 2</text>
</svg><figcaption>The cart has two items, at positions 0 and 1, so its length is 2. A loop that runs while i is less than the length visits 0 and 1 and stops. A loop that runs while i is less than or equal to the length also tries position 2, finds nothing there, and crashes reading price of undefined.</figcaption></figure>
<p>This is called an <b>off-by-one error</b>, and it is one of the most common bugs in all of programming. Look at the loop's condition and ask: when <code>i</code> equals the length, should the loop still run? It should not.</p>
<p>The loop here is a counting loop, <code>for (let i = 0; …; i++)</code>. It has three parts: start <code>i</code> at 0, keep going while the condition is true, and add 1 to <code>i</code> after each pass. The <code>for…of</code> loop from the last lesson avoids this whole class of bug, because it never deals with positions.</p>

<h4>Bug three: the function that forgets to answer</h4>
<p>Run again. No error now, but the output says <code>Total: undefined</code>. When there is no error but a wrong answer, it is a <b>logic bug</b>: the code runs, it just does the wrong thing.</p>
<p>Follow the value backwards. The line prints <code>formatPrice(…)</code>, so <code>formatPrice</code> handed back <code>undefined</code>. Look inside it. It builds the text with a dollar sign and two decimal places, but nothing sends that text back. A function without a <code>return</code> always gives back <code>undefined</code>. The work happens, then gets thrown away.</p>
<p>By the way, <code>toFixed(2)</code> turns a number into a string with exactly two digits after the point, so 32.5 becomes <code>'32.50'</code>.</p>

<h4>Bug four: one equals sign too few</h4>
<p>Now the total prints correctly, 32.50, but "Free shipping?" says <code>true</code>. Free shipping should only start at 50. Test your guess with a log at the top of <code>isFreeShipping</code>:</p>
<pre class="snip">function isFreeShipping(total) {
  console.log('total is', total);   // what came in?
  // ...rest of the function
}</pre>
<p>It logs 32.5, as expected. So the input is fine, and the problem must be in the condition. Look at it: one equals sign. Remember that a single <code>=</code> <b>stores</b> a value. It does not compare. The condition sets <code>total</code> to 50, and the value 50 counts as "true enough" for an <code>if</code>. In JavaScript, every number except 0 counts as true in a condition. So the function says yes to everything.</p>
<p>The task wording tells you the right comparison: "totals of 50 <i>or more</i>". Pick the operator that means greater than or equal.</p>
<div class="mistake"><b>Common mistake</b>Leaving debugging logs in your finished code. They clutter the output, and here the last task checks the exact output lines. Delete them once the bug is fixed.</div>

<h4>Making the invisible visible</h4>
<p><code>console.log</code> is your torch. When the output is wrong, log the values at each step and compare them with what you expected. The bug lives exactly where the two first differ. Label your logs so you know which is which:</p>
<pre class="snip">console.log('i =', i, 'item =', items[i]);
console.log('sum so far:', total);</pre>
<p>In a real browser you can go further. Press F12 to open the developer tools, where the Console tab shows the same errors with clickable line numbers. Writing the word <code>debugger;</code> on a line pauses the code there while the tools are open, so you can inspect every variable and step through one line at a time.</p>
<div class="mistake"><b>Common mistake</b>Fixing the symptom instead of the cause. Wrapping the crashing line in a check like "only read price if the item exists" would hide bug two, but the loop would still be wrong. Ask why the value was wrong in the first place.</div>
<div class="try"><b>Try it in your head</b>A list has 5 items. What is the last valid position? Answer: 4, because positions start at 0. And what does this print: <code>function f() { 2 + 2; } console.log(f());</code>? Answer: undefined, because the function works out 4 but never returns it.</div>

<h4>Recap</h4>
<ul>
<li>Debug with a loop: run, read, guess, test, fix one thing, run again.</li>
<li>Read errors slowly: the type says what kind of problem, the message names the culprit, the line says where.</li>
<li>ReferenceError usually means a typo in a name. TypeError reading something of undefined often means an index past the end.</li>
<li>Arrays start at 0, so the last position is length minus one. Loop while <code>i &lt; length</code>.</li>
<li>No error but a wrong answer is a logic bug: log values to find where reality and expectation split.</li>
<li>A missing <code>return</code> gives <code>undefined</code>, and a single <code>=</code> assigns rather than compares.</li>
</ul>
`);

explain('f1',`
<h4>Why structure and layout matter</h4>
<p>You can already write HTML and style it with CSS. But open the starter code and notice something: the page is built entirely from <code>&lt;div&gt;</code> elements. A <code>&lt;div&gt;</code> ("division") is a generic box that means nothing at all. Visually the page works. Underneath, nothing tells a computer which part is the menu and which part is the main content.</p>
<p>And everything stacks in one long column, because that is what the browser does by default. Most block elements, like <code>&lt;div&gt;</code>, <code>&lt;p&gt;</code> and <code>&lt;h1&gt;</code>, take the full width and push the next element underneath. To put things side by side you need layout tools.</p>
<p>This lesson fixes both problems: <b>semantic HTML</b> for meaning, then <b>flexbox</b> and <b>grid</b> for layout, and finally <b>media queries</b> so the layout adapts to phones. Every frontend framework you will meet later, React included, ends up producing exactly this HTML and CSS.</p>

<h4>Semantic elements: tags that say what they are</h4>
<p>"Semantic" means "to do with meaning". HTML has elements that behave exactly like a <code>&lt;div&gt;</code> but also announce their role:</p>
<div class="tbl-wrap"><table><tr><th>Element</th><th>Meaning</th></tr>
<tr><td><code>&lt;header&gt;</code></td><td>The introductory strip at the top: logo, site name, navigation.</td></tr>
<tr><td><code>&lt;nav&gt;</code></td><td>A block of main navigation links.</td></tr>
<tr><td><code>&lt;main&gt;</code></td><td>The main content of this page. Use only one per page.</td></tr>
<tr><td><code>&lt;section&gt;</code></td><td>A themed group of content, usually with its own heading.</td></tr>
<tr><td><code>&lt;article&gt;</code></td><td>A self-contained item that would make sense on its own: a blog post, a product card.</td></tr>
<tr><td><code>&lt;footer&gt;</code></td><td>The closing strip: copyright, contact links.</td></tr></table></div>
<figure class="fig"><svg viewBox="0 0 420 260" role="img" aria-label="Page wireframe: header with nav on top, main with a section of three articles, footer at the bottom">
<rect class="bx-a" x="10" y="10" width="400" height="50" rx="6"/>
<text class="t-b t-a" x="22" y="40">header</text>
<rect class="bx" x="140" y="20" width="258" height="30" rx="5"/><text class="t-m" x="152" y="40">nav</text>
<text class="t-s" x="250" y="40">Work  About  Contact</text>
<rect class="bx-ok" x="10" y="70" width="400" height="140" rx="6"/>
<text class="t-b t-ok" x="22" y="94">main</text>
<rect class="bx-info" x="22" y="104" width="376" height="96" rx="5"/>
<text class="t-m t-info" x="34" y="124">section class="cards"</text>
<g text-anchor="middle">
<rect class="bx" x="34" y="134" width="112" height="56" rx="5"/><text class="t-m" x="90" y="167">article</text>
<rect class="bx" x="154" y="134" width="112" height="56" rx="5"/><text class="t-m" x="210" y="167">article</text>
<rect class="bx" x="274" y="134" width="112" height="56" rx="5"/><text class="t-m" x="330" y="167">article</text>
</g>
<rect class="bx-dark" x="10" y="220" width="400" height="32" rx="6"/>
<text class="t-term" x="22" y="242">footer</text><text class="t-term" x="300" y="242">© 2026 Ada</text>
</svg><figcaption>The portfolio page rebuilt with meaning. A header at the top holds the nav links. The main area holds a section of three article cards. A footer closes the page.</figcaption></figure>
<p>Why bother, if it looks the same? Because people and programs other than sighted humans read your page:</p>
<ul>
<li><b>Screen readers</b>, which read pages aloud for blind users, list these elements as <b>landmarks</b>. A user can press one key to jump straight to the navigation or skip to the main content, instead of listening to every link first.</li>
<li><b>Search engines</b> use the structure to work out what your page is about and which text matters most.</li>
<li><b>Other developers</b>, including you in six months, can read the code and understand it at a glance.</li>
</ul>
<p>A list of links is still a list, so inside <code>&lt;nav&gt;</code> put the links in a <code>&lt;ul&gt;</code>, one <code>&lt;li&gt;</code> per link. Screen readers then announce "list, three items", which tells the user how many choices there are.</p>

<h4>Flexbox: a row of things</h4>
<p><b>Flexbox</b> (the flexible box layout) arranges items along <b>one line</b>, either a row or a column. It is perfect for a row of nav links, a toolbar or a button group.</p>
<p>The key idea: you put <code>display: flex;</code> on the <b>parent</b>, called the <b>flex container</b>, and its direct children, the <b>flex items</b>, line up. You never put it on the items themselves.</p>
<pre class="snip">nav ul {
  display: flex;       /* children sit in a row  */
  gap: 16px;           /* space between them     */
  list-style: none;    /* hide the bullet points */
  padding: 0;          /* remove the list indent */
}</pre>
<p>The selector <code>nav ul</code>, with a space between the two names, is a <b>descendant selector</b>: it means "any <code>ul</code> inside a <code>nav</code>". It targets only the menu list, not every list on the page.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="A flex container with three items in a row along the main axis, with gaps, and the cross axis running down">
<rect class="bx-a" x="20" y="30" width="330" height="110" rx="8"/>
<text class="t-s t-a" x="30" y="22">flex container: nav ul</text>
<g text-anchor="middle">
<rect class="bx-ok" x="40" y="60" width="80" height="50" rx="6"/><text class="t-b" x="80" y="90">Work</text>
<rect class="bx-ok" x="140" y="60" width="80" height="50" rx="6"/><text class="t-b" x="180" y="90">About</text>
<rect class="bx-ok" x="240" y="60" width="90" height="50" rx="6"/><text class="t-b" x="285" y="90">Contact</text>
<text class="t-s" x="128" y="128">gap</text><text class="t-s" x="230" y="128">gap</text>
</g>
<path class="ln-d" d="M120 85h20M220 85h20"/>
<path class="ln-a" d="M20 170h320"/><polygon class="ah-a" points="338,164 338,176 348,170"/>
<text class="t-b t-a" x="184" y="196" text-anchor="middle">main axis: justify-content</text>
<path class="ln-ok" d="M376 30v100"/><polygon class="ah-ok" points="370,128 382,128 376,138"/>
<text class="t-s t-ok" x="376" y="160" text-anchor="middle">cross</text>
<text class="t-s t-ok" x="376" y="178" text-anchor="middle">axis</text>
</svg><figcaption>Flexbox lines items up along the main axis, left to right in a row. Gap adds space between neighbours. justify-content spreads items along the main axis, and align-items lines them up on the cross axis, which runs top to bottom.</figcaption></figure>
<p>Two more properties give you control along the two directions, called <b>axes</b>:</p>
<ul>
<li><code>justify-content</code> works along the <b>main axis</b> (left to right in a row). <code>space-between</code> pushes the first item to one end and the last to the other, which is how many headers put a logo on the left and links on the right.</li>
<li><code>align-items</code> works on the <b>cross axis</b> (top to bottom in a row). <code>align-items: center</code> lines items up through their middles, so a tall logo and short links sit neatly together.</li>
</ul>

<h4>Grid: rows and columns together</h4>
<p>Flexbox thinks in one line. A set of cards needs <b>two</b> dimensions: columns across and rows down, with everything aligned in both directions. That is <b>CSS Grid</b>.</p>
<pre class="snip">.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);   /* 3 equal columns */
  gap: 16px;                                 /* space between cells */
}</pre>
<p>Reading <code>repeat(3, 1fr)</code> step by step:</p>
<ol>
<li><code>grid-template-columns</code> lists the width of each column, so <code>1fr 1fr 1fr</code> means three columns.</li>
<li><code>repeat(3, 1fr)</code> is shorthand for exactly that: "repeat 1fr three times".</li>
<li><code>fr</code> means "fraction of the free space". Three columns of 1fr each share the space equally, a third each. <code>2fr 1fr</code> would make the first column twice as wide as the second.</li>
</ol>
<p>The children drop into the cells in order: first card in column 1, second in column 2, third in column 3. A fourth card would start a new row automatically. As with flexbox, <code>display: grid</code> goes on the <b>parent</b>, here the element with class <code>cards</code>, and <code>gap</code> works the same way.</p>
<div class="analogy"><b>Think of it like</b>Flexbox is a bookshelf: one row of books, which you can push left, right or spread out. Grid is a chessboard: you decide the rows and columns, and pieces drop into squares.</div>

<h4>Responsive design and media queries</h4>
<p>Three columns look great on a laptop. On a phone 400 pixels wide, each card would be a squashed strip about 120 pixels wide. <b>Responsive design</b> means one page that adapts its layout to the screen it is on.</p>
<p>The tool is a <b>media query</b>: a block of CSS that only applies when a condition about the screen is true.</p>
<pre class="snip">@media (max-width: 600px) {
  .cards {
    grid-template-columns: 1fr;   /* one column */
  }
}</pre>
<p>Read it as: "when the viewport is at most 600 pixels wide, give the cards one column". The <b>viewport</b> is the visible area of the page inside the browser window. Above 600 pixels the query is ignored and the three-column rule applies. At 600 or below, both rules match the same selector, and the one written later wins, as you learnt in the CSS lesson. That is why media queries go <b>after</b> the normal rules.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="The same cards: three columns on a wide screen, stacked in one column on a phone">
<rect class="bx" x="10" y="20" width="250" height="150" rx="8"/>
<text class="t-s" x="135" y="14" text-anchor="middle">wide screen, 900px</text>
<rect class="bx-ok" x="24" y="40" width="68" height="110" rx="5"/><rect class="bx-ok" x="101" y="40" width="68" height="110" rx="5"/><rect class="bx-ok" x="178" y="40" width="68" height="110" rx="5"/>
<g text-anchor="middle"><text class="t-b" x="58" y="100">1</text><text class="t-b" x="135" y="100">2</text><text class="t-b" x="212" y="100">3</text></g>
<rect class="bx" x="300" y="20" width="110" height="200" rx="12"/>
<text class="t-s" x="355" y="14" text-anchor="middle">phone, 420px</text>
<rect class="bx-ok" x="314" y="40" width="82" height="50" rx="5"/><rect class="bx-ok" x="314" y="98" width="82" height="50" rx="5"/><rect class="bx-ok" x="314" y="156" width="82" height="50" rx="5"/>
<g text-anchor="middle"><text class="t-b" x="355" y="70">1</text><text class="t-b" x="355" y="128">2</text><text class="t-b" x="355" y="186">3</text></g>
<path class="ln-a" d="M262 95h30"/><polygon class="ah-a" points="290,89 290,101 300,95"/>
<text class="t-s" x="135" y="196" text-anchor="middle">repeat(3, 1fr)</text>
<text class="t-s" x="135" y="216" text-anchor="middle">phone: media query sets 1fr</text>
</svg><figcaption>The same three cards on two screens. At 900 pixels wide they sit in three equal columns. At 420 pixels the media query matches, the grid switches to one column, and the cards stack.</figcaption></figure>
<p>One more piece makes media queries work on real phones. Without it, mobile browsers pretend to be about 980 pixels wide and shrink the whole page, so your query never fires. Add this to the head:</p>
<pre class="snip">&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</pre>
<div class="tip"><b>Tip</b>Professionals often design <b>mobile-first</b>: write the one-column phone layout as the normal rule, then add a <code>@media (min-width: 600px)</code> query that switches to three columns on bigger screens. Small screens get the simplest CSS, and you add complexity only where there is room for it. Either direction passes the tasks here.</div>

<h4>Working through the tasks</h4>
<ol>
<li>Swap each meaningful <code>&lt;div&gt;</code> for its semantic element: the top strip, the menu, the content area and the bottom strip. Put the links in a list.</li>
<li>Make the nav list a flex container with a gap.</li>
<li>Make <code>.cards</code> a grid with three equal columns. The checker widens the preview to 900 pixels to test it.</li>
<li>Add a media query for 600 pixels and below that switches to one column. The checker squeezes the preview to 420 pixels.</li>
</ol>
<div class="mistake"><b>Common mistake</b>Putting <code>display: flex</code> or <code>display: grid</code> on the items instead of their parent. Layout properties describe how a container arranges its <b>children</b>. If <code>.card</code> gets <code>display: grid</code>, each card lays out its own heading and paragraph, and the cards themselves do not move.</div>
<div class="mistake"><b>Common mistake</b>Changing the tags but not the CSS. If your old CSS targeted <code>.menu</code> and you removed that class when switching to <code>&lt;nav&gt;</code>, the rule now matches nothing. Update selectors to match the new HTML.</div>

<h4>When the layout will not budge</h4>
<ul>
<li>Items still stack? Check that <code>display</code> is on the direct parent of the items you want to move. Flex and grid affect children only, not grandchildren.</li>
<li>Media query never applies? Check the brackets: <code>@media (max-width: 600px) { … }</code> needs both the round brackets and its own pair of curly braces around the rules inside.</li>
<li>Media query always applies, or never? Make sure it comes after the normal rule, so it wins when both match.</li>
<li>In a real browser, the developer tools draw flex and grid outlines over the page when you inspect the container, which shows you exactly where each cell is.</li>
</ul>
<div class="try"><b>Try it in your head</b>A container has <code>grid-template-columns: 2fr 1fr;</code> and 300 pixels of space, with no gap. How wide is each column? Total fractions: 2 plus 1 is 3, so each fr is 100 pixels. The first column is 200 pixels, the second 100. And where does a fifth card go in <code>repeat(3, 1fr)</code>? Into the second column of the second row.</div>

<h4>Recap</h4>
<ul>
<li>Semantic elements such as <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code> and <code>&lt;footer&gt;</code> give the page meaning that screen readers and search engines use.</li>
<li>Flexbox lays children out along one line; put <code>display: flex</code> and <code>gap</code> on the parent.</li>
<li>Grid lays children out in rows and columns; <code>repeat(3, 1fr)</code> makes three equal columns.</li>
<li>A media query applies CSS only when its condition is true, such as <code>max-width: 600px</code>. Put it after the normal rules.</li>
<li>Add the viewport meta tag so phones report their real width.</li>
</ul>
`);

explain('f2',`
<h4>Making a page come alive</h4>
<p>So far your pages have been fixed: whatever HTML you wrote is what appears, and it never changes. Real apps react. You type a task, press Add, and it appears in a list. You open a page and the latest messages load in without a refresh. All of that is JavaScript changing the page while it is open.</p>
<p>This lesson joins the two halves you have learnt: the JavaScript language from the beginner lessons, and the HTML page. The bridge between them is called the <b>DOM</b>. Libraries like React, which come next, do this work for you, but they are doing exactly what you will do by hand here. Knowing it makes React far less magical.</p>

<h4>The DOM: the page as a tree of objects</h4>
<p>When the browser reads your HTML, it does not keep the text. It builds a model of the page in memory: one <b>object</b> for every element, linked together in a tree just like the nesting tree you drew in your first HTML lesson. That model is the <b>Document Object Model</b>, or DOM.</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="HTML text becomes a DOM tree; JavaScript reads and changes the tree and the screen follows">
<rect class="bx-dark" x="10" y="20" width="120" height="96" rx="6"/>
<text class="t-term" x="20" y="44">&lt;input&gt;</text><text class="t-term" x="20" y="68">&lt;button&gt;</text><text class="t-term" x="20" y="92">&lt;ul&gt;</text>
<text class="t-s" x="70" y="136" text-anchor="middle">HTML text</text>
<path class="ln" d="M130 68h22"/><polygon class="ah" points="150,62 150,74 160,68"/>
<rect class="bx-a" x="230" y="10" width="100" height="32" rx="6"/><text class="t-m" x="280" y="31" text-anchor="middle">document</text>
<path class="ln" d="M280 42v12M200 54h160M200 54v10M280 54v10M360 54v10"/>
<g text-anchor="middle">
<rect class="bx-ok" x="164" y="64" width="72" height="30" rx="6"/><text class="t-m" x="200" y="84">input</text>
<rect class="bx-ok" x="244" y="64" width="72" height="30" rx="6"/><text class="t-m" x="280" y="84">button</text>
<rect class="bx-ok" x="324" y="64" width="72" height="30" rx="6"/><text class="t-m" x="360" y="84">ul</text>
</g>
<path class="ln-d" d="M360 94v16"/>
<rect class="bx-info" x="324" y="110" width="72" height="30" rx="6"/><text class="t-m" x="360" y="130" text-anchor="middle">li</text>
<text class="t-s" x="360" y="156" text-anchor="middle">added by JS</text>
<text class="t-b" x="222" y="31" text-anchor="end">DOM</text>
<rect class="bx-warn" x="164" y="180" width="232" height="44" rx="8"/>
<text class="t-b" x="280" y="207" text-anchor="middle">your JavaScript</text>
<path class="ln-a" d="M200 180v-80"/><polygon class="ah-a" points="194,102 206,102 200,94"/>
<path class="ln-a" d="M360 180v-34"/><polygon class="ah-a" points="354,148 366,148 360,140"/>
<text class="t-s" x="70" y="196" text-anchor="middle">find, change,</text>
<text class="t-s" x="70" y="214" text-anchor="middle">add, remove</text>
</svg><figcaption>The browser turns the HTML text into a tree of objects called the DOM. Your JavaScript reaches into that tree to read the input and to add new list items. Whenever the tree changes, the screen updates to match.</figcaption></figure>
<p>The crucial fact: <b>the screen always shows the DOM, not your original HTML</b>. Change an object in the tree and the page changes instantly, with no reload. Add a new object and a new element appears. JavaScript gets into the tree through a ready-made variable called <code>document</code>.</p>

<h4>Finding elements with querySelector</h4>
<pre class="snip">const input = document.querySelector('#task');
const list = document.querySelector('#list');</pre>
<p><code>document.querySelector</code> takes a <b>CSS selector</b>, exactly like the ones you wrote in the CSS lessons, and gives back the first element that matches. <code>'#task'</code> means "the element with id task". You can also use <code>'.card'</code> or <code>'nav a'</code>. If nothing matches, it gives back <code>null</code>, which means "nothing".</p>
<p>Each element object has <b>properties</b> you can read and change with a dot:</p>
<ul>
<li><code>input.value</code> is the text currently typed into an input box. Setting it to an empty string, <code>''</code>, clears the box.</li>
<li><code>el.textContent</code> is the text inside an element. Setting it replaces that text.</li>
</ul>

<h4>Building new elements</h4>
<p>Adding a list item takes three steps:</p>
<pre class="snip">const li = document.createElement('li');   // 1. make a new li
li.textContent = 'Buy milk';               // 2. fill it with text
list.append(li);                           // 3. attach it to the ul</pre>
<p>Step 1 creates the element in memory only. It is not on the page yet, like a sticky note you have written but not stuck anywhere. Step 3, <code>append</code>, attaches it as the last child of <code>list</code>, and only then does it appear. Forgetting to append is a very common reason for "nothing happens". The opposite, <code>li.remove()</code>, takes an element out of the tree, and it vanishes from the screen.</p>

<h4>textContent, not innerHTML</h4>
<p>There is another property, <code>innerHTML</code>, that reads text as HTML and builds elements from it. It looks convenient, but never feed it text a user typed. If someone types <code>&lt;img src=x onerror="stealCookies()"&gt;</code> into your task box, <code>innerHTML</code> turns it into a real element and runs their code in your page. That attack is called <b>cross-site scripting</b>, or XSS. <code>textContent</code> always treats input as plain characters, so the same text just shows up as harmless words. You will try this attack yourself in the Security track.</p>

<h4>Events: reacting to the user</h4>
<p>An <b>event</b> is something that happens on the page: a click, a key press, the mouse moving. You ask an element to run a function whenever a particular event happens with <code>addEventListener</code>:</p>
<pre class="snip">const addButton = document.querySelector('#add');
addButton.addEventListener('click', addTask);

function addTask() {
  // runs every time #add is clicked
}</pre>
<p>Read it as: "add button, when you hear a click, run <code>addTask</code>". The function you hand over is called a <b>callback</b> or <b>event handler</b>. Notice there are no brackets after <code>addTask</code> here: you are handing over the function itself to be called later, not calling it now. Writing <code>addTask()</code> would run it once immediately and hand over its result instead.</p>
<p>You will often see a short inline function written with an arrow:</p>
<pre class="snip">del.addEventListener('click', () =&gt; li.remove());</pre>
<p><code>() =&gt; li.remove()</code> is an <b>arrow function</b>: a function with no name and no inputs, whose body is <code>li.remove()</code>. It is just a compact way to write <code>function () { li.remove(); }</code>.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Timeline: page loads and registers the listener, then later a click runs the handler which changes the DOM">
<path class="ln" d="M20 60h380"/><polygon class="ah" points="398,54 398,66 408,60"/>
<text class="t-s" x="20" y="40">page loads</text><text class="t-s" x="340" y="40">time</text>
<circle class="dot" cx="50" cy="60" r="7"/><circle class="dot-ok" cx="230" cy="60" r="7"/>
<rect class="bx-info" x="10" y="90" width="140" height="56" rx="8"/>
<text class="t" x="80" y="114" text-anchor="middle">listener is</text><text class="t" x="80" y="134" text-anchor="middle">registered</text>
<path class="ln-d" d="M50 67v23"/>
<path class="ln-ok" d="M230 67v23"/>
<rect class="bx-ok" x="170" y="90" width="120" height="56" rx="8"/>
<text class="t-b" x="230" y="114" text-anchor="middle">click!</text><text class="t" x="230" y="134" text-anchor="middle">addTask runs</text>
<path class="ln-a" d="M290 118h26"/><polygon class="ah-a" points="314,112 314,124 324,118"/>
<rect class="bx-a" x="326" y="90" width="84" height="56" rx="8"/>
<text class="t" x="368" y="114" text-anchor="middle">new li</text><text class="t" x="368" y="134" text-anchor="middle">appears</text>
<text class="t-s" x="210" y="180" text-anchor="middle">Waiting costs nothing; the handler runs once per click.</text>
</svg><figcaption>When the page loads, your script registers a listener and then finishes. Nothing else happens until the user clicks. Each click runs the handler again, which builds a new list item and appends it, so it appears on screen.</figcaption></figure>
<p>For the Enter key, listen for <code>'keydown'</code> on the input. The handler receives an <b>event object</b>, usually named <code>e</code>, describing what happened, and <code>e.key</code> holds the name of the key, such as <code>'Enter'</code>.</p>

<h4>The task list, step by step</h4>
<p>Inside the click handler, the logic for the first three tasks goes like this:</p>
<ol>
<li>Read the text: take <code>input.value</code> and call <code>.trim()</code> on it, which removes spaces from both ends. That way three spaces count as empty.</li>
<li>If the text is empty, <code>return</code> straight away, so nothing is added. An empty string counts as false in a condition, so <code>if (!text) return;</code> reads "if there is no text, stop". The <code>!</code> means "not".</li>
<li>Create the <code>li</code>, set its <code>textContent</code>, append it to the list.</li>
<li>Create a Delete <code>button</code> the same way, give it a click listener that removes <i>this</i> <code>li</code>, and append the button into the <code>li</code>.</li>
<li>Clear the input by setting its value to an empty string.</li>
</ol>
<p>Why does each Delete button remove the right item? Because each time the handler runs it creates a brand-new <code>li</code> variable, and the arrow function created in that same run remembers it. JavaScript functions keep hold of the variables around them when they were created. This is called a <b>closure</b>, and it is used everywhere in frontend code.</p>

<h4>fetch: asking a server for data</h4>
<p>Most data an app shows lives on a <b>server</b>, another computer on the internet. To get it, the browser sends a <b>request</b> to an address, and the server sends back a <b>response</b>. An address that returns data for programs rather than pages for people is called an <b>API</b> (application programming interface). This preview has a pretend one at <code>/api/users</code>.</p>
<p>The data usually comes back as <b>JSON</b> (JavaScript Object Notation): text that looks exactly like JavaScript arrays and objects, for example <code>[{"id":1,"name":"Ada Lovelace"}]</code>.</p>
<figure class="fig"><svg viewBox="0 0 420 260" role="img" aria-label="Request and response between the browser and the server, with two awaits">
<rect class="bx-info" x="20" y="10" width="120" height="36" rx="6"/><text class="t-b" x="80" y="33" text-anchor="middle">browser</text>
<rect class="bx-a" x="280" y="10" width="120" height="36" rx="6"/><text class="t-b" x="340" y="33" text-anchor="middle">server</text>
<path class="ln-d" d="M80 46v204M340 46v204"/>
<path class="ln-a" d="M80 80h250"/><polygon class="ah-a" points="328,74 328,86 338,80"/>
<text class="t-m" x="210" y="72" text-anchor="middle">GET /api/users</text>
<text class="t-s" x="210" y="112" text-anchor="middle">code waits at await fetch</text>
<path class="ln-ok" d="M340 150h-250"/><polygon class="ah-ok" points="92,144 92,156 82,150"/>
<text class="t-m" x="210" y="142" text-anchor="middle">200 OK + JSON</text>
<rect class="bx-ok" x="96" y="170" width="228" height="34" rx="6"/><text class="t" x="210" y="192" text-anchor="middle">await res.json(): read body</text>
<rect class="bx" x="96" y="214" width="228" height="32" rx="6"/><text class="t" x="210" y="235" text-anchor="middle">loop: one li per user</text>
</svg><figcaption>The browser sends a request for slash api slash users. While the server works, the code waits at await fetch. The response arrives with status 200 and a JSON body. A second await reads that body into a JavaScript array, and then a loop adds one list item per user.</figcaption></figure>
<pre class="snip">async function loadUsers() {
  const res = await fetch('/api/users');   // send request, wait
  const users = await res.json();          // read body as JSON
  console.log(users[0].name);              // Ada Lovelace
}
loadUsers();</pre>

<h4>Why the two awaits</h4>
<p>Network requests take time, anywhere from milliseconds to seconds. JavaScript must not freeze the page while it waits, or nothing could be clicked. So <code>fetch</code> immediately returns a <b>Promise</b>: an object that stands for "a value that will arrive later", like a ticket at a coffee shop counter.</p>
<p><code>await</code> means "pause this function until the promise is ready, then give me the value". The rest of the page keeps working meanwhile. You can only use <code>await</code> inside a function marked <code>async</code>, which is why the code is wrapped in <code>async function</code> and then called.</p>
<p>There are two waits because the response arrives in stages. The first <code>await</code> gives you the <b>response</b> object as soon as the headers (the status code and other details) arrive. The body may still be downloading, so <code>res.json()</code> returns another promise, and the second <code>await</code> gives you the finished JavaScript data. From there it is the loop you already know: <code>for (const user of users)</code>, creating an <code>li</code> for each <code>user.name</code>.</p>
<div class="mistake"><b>Common mistake</b>Forgetting <code>await</code>. Without it, <code>users</code> is a Promise object, not an array, and looping over it fails with an error saying it is not iterable. If you see a value printed as <code>Promise { … }</code>, you are missing an await.</div>
<div class="mistake"><b>Common mistake</b>Running <code>querySelector</code> before the element exists. If your script runs before the HTML it looks for has been read, you get <code>null</code>, and the next line fails with <code>Cannot read properties of null (reading 'addEventListener')</code>. In this lesson the script sits after the HTML, so the elements already exist. Check the selector spelling first, including the hash.</div>

<h4>Errors you may see</h4>
<ul>
<li><code>Cannot read properties of null</code>: <code>querySelector</code> found nothing. Check the selector and that the element exists.</li>
<li><code>Failed to fetch</code>: the request could not complete. In this preview, only <code>/api/users</code> and <code>/api/products</code> exist. On a real site, check the address and your connection.</li>
<li><code>await is only valid in async functions</code>: wrap the code in an <code>async function</code>.</li>
<li>Nothing happens and no error: is the element appended? Is the listener attached to the right element? Add a <code>console.log</code> inside the handler to see whether it runs at all.</li>
</ul>
<div class="try"><b>Try it in your head</b>A user types two spaces and clicks Add. What happens with the trim and empty check in place? <code>'  '.trim()</code> is the empty string, which counts as false, so the handler returns and the list does not change. And what goes wrong with <code>button.addEventListener('click', addTask())</code>? The brackets call addTask once when the page loads, and its result, undefined, is registered instead of the function, so clicks do nothing.</div>

<h4>Recap</h4>
<ul>
<li>The DOM is the browser's live tree of element objects. The screen always shows the DOM, so changing it changes the page.</li>
<li><code>querySelector</code> finds elements with CSS selectors. <code>createElement</code> makes one, <code>append</code> attaches it, <code>remove</code> takes it away.</li>
<li>Set text with <code>textContent</code>; never put user input into <code>innerHTML</code>.</li>
<li><code>addEventListener('click', fn)</code> runs your function every time the event happens. Pass the function, do not call it.</li>
<li><code>fetch</code> returns a promise. In an <code>async</code> function, <code>await fetch(url)</code> then <code>await res.json()</code> gives you the data.</li>
</ul>
`);

explain('f3',`
<h4>The problem React solves</h4>
<p>In the last lesson you built a task list by hand: find the list, create an element, set its text, append it, attach a listener, remember to remove it later. For one list that is fine. For a real app with a basket, a menu, notifications and a hundred buttons, all those hand-made changes pile up. Sooner or later the screen and your data disagree: the basket badge says 3 but the list shows 2.</p>
<p><b>React</b>, a JavaScript library made by Meta and the most widely used way to build web interfaces, takes a different approach. You stop giving step-by-step DOM instructions. Instead you describe <b>what the screen should look like for the current data</b>, and React works out which DOM changes are needed to get there. When the data changes, you describe the screen again, and React updates only what is different.</p>
<p>People sum this up as <b>UI = f(state)</b>: the user interface is a function of the state. Same data in, same screen out.</p>

<h4>Components and JSX</h4>
<p>A React app is built from <b>components</b>: small, reusable pieces of interface, like LEGO bricks. A component is simply a JavaScript function that returns what to show:</p>
<pre class="snip">function Greeting() {
  return &lt;h2&gt;Hello there&lt;/h2&gt;;
}

// use it like a tag, anywhere:
&lt;Greeting /&gt;</pre>
<p>That HTML-looking code inside JavaScript is <b>JSX</b>. It is not really HTML: a build tool translates each tag into a JavaScript function call that describes an element. A few rules follow from that:</p>
<ul>
<li>Component names start with a <b>capital letter</b>. <code>&lt;Counter /&gt;</code> is your component; <code>&lt;button&gt;</code> is a normal HTML element.</li>
<li>Curly braces <code>{ }</code> switch back to JavaScript inside JSX: <code>&lt;p&gt;You have {count} items&lt;/p&gt;</code> drops in the value of <code>count</code>.</li>
<li>A component returns <b>one</b> outer element. Wrap siblings in a parent such as <code>&lt;main&gt;</code>.</li>
<li>Every tag must be closed. Tags with nothing inside close themselves with a slash: <code>&lt;Counter /&gt;</code>.</li>
<li>Because <code>class</code> is a reserved word in JavaScript, the HTML attribute is written <code>className</code>.</li>
</ul>
<p>In the starter code, <code>App</code> is the top component, and <code>export default</code> marks it as the one the preview should show. App uses <code>&lt;Counter /&gt;</code>, so components form a tree, just like the DOM.</p>

<h4>Props: passing data down</h4>
<p>A component on its own always shows the same thing. <b>Props</b> (short for properties) let the parent pass in data, just like attributes on an HTML tag:</p>
<pre class="snip">&lt;TodoList items={todos} /&gt;          // parent passes the todos array

function TodoList({ items }) {      // child receives it
  // items is now the array
}</pre>
<p>React gathers all the attributes into one object and passes it as the function's single argument. The curly braces in <code>({ items })</code> are <b>destructuring</b>: they unpack the <code>items</code> key from that object into a variable of the same name. You can give a default, too: <code>({ step = 1 })</code> uses 1 when the parent passes nothing.</p>
<p>Props are <b>read-only</b>. A child never changes its props. Data flows one way: down the tree. When a child needs to tell its parent something, the parent passes down a function as a prop and the child calls it. That is how events travel up.</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="Component tree: App passes items down to TodoList; Counter owns its own count state; events flow up through callback props">
<rect class="bx-a" x="150" y="10" width="120" height="40" rx="8"/><text class="t-b" x="210" y="35" text-anchor="middle">App</text>
<path class="ln-ok" d="M170 50v40"/><polygon class="ah-ok" points="164,88 176,88 170,98"/>
<path class="ln-ok" d="M250 50v40"/><polygon class="ah-ok" points="244,88 256,88 250,98"/>
<rect class="bx-info" x="20" y="100" width="170" height="70" rx="8"/>
<text class="t-b" x="105" y="126" text-anchor="middle">Counter</text>
<text class="t-s" x="105" y="148" text-anchor="middle">owns state: count</text>
<rect class="bx-info" x="230" y="100" width="170" height="70" rx="8"/>
<text class="t-b" x="315" y="126" text-anchor="middle">TodoList</text>
<text class="t-s" x="315" y="148" text-anchor="middle">gets props: items</text>
<text class="t-s t-ok" x="100" y="78" text-anchor="middle">props down</text>
<text class="t-s t-ok" x="320" y="78" text-anchor="middle">items={todos}</text>
<path class="ln" d="M315 170v20M265 190h100M265 190v10M315 190v10M365 190v10"/>
<g text-anchor="middle">
<rect class="bx" x="245" y="200" width="40" height="28" rx="5"/><text class="t-m" x="265" y="219">li</text>
<rect class="bx" x="295" y="200" width="40" height="28" rx="5"/><text class="t-m" x="315" y="219">li</text>
<rect class="bx" x="345" y="200" width="40" height="28" rx="5"/><text class="t-m" x="365" y="219">li</text>
</g>
<path class="ln-a" d="M405 100V30H282"/><polygon class="ah-a" points="282,24 282,36 272,30"/>
<text class="t-s t-a" x="340" y="22" text-anchor="middle">events up</text>
<text class="t-s" x="105" y="200" text-anchor="middle">a click changes</text>
<text class="t-s" x="105" y="218" text-anchor="middle">only Counter</text>
</svg><figcaption>A component tree. App sits at the top and passes data down as props, such as the todos array going to TodoList as items. Counter keeps its own count in state. Data only ever flows downward; to send something up, a child calls a function its parent gave it as a prop.</figcaption></figure>

<h4>Rendering lists with map and keys</h4>
<p>To turn an array of data into an array of elements, use the array method <code>map</code>. It runs a function on every item and collects the results into a new array:</p>
<pre class="snip">[1, 2, 3].map((n) =&gt; n * 10);   // [10, 20, 30]

&lt;ul&gt;
  {items.map((item) =&gt; &lt;li key={item.id}&gt;{item.text}&lt;/li&gt;)}
&lt;/ul&gt;</pre>
<p>Each element in a list needs a <code>key</code>: a value that is unique among its siblings and stays the same between renders, such as a database id. Keys let React tell items apart. If you delete the second of three items, React uses the keys to see exactly which one went, and removes just that element. Without stable keys it might reuse the wrong element and, for example, leave typed text in the wrong row. Avoid using the array position as a key when items can be reordered or removed.</p>

<h4>State: data that changes</h4>
<p>Props come from outside. <b>State</b> is data a component owns and can change itself, like the number of clicks on a counter. You create it with the <b>hook</b> <code>useState</code>. A hook is a special React function whose name starts with <code>use</code>.</p>
<pre class="snip">const [count, setCount] = useState(0);</pre>
<p>Read it piece by piece:</p>
<ul>
<li><code>useState(0)</code> creates a piece of state whose starting value is 0.</li>
<li>It returns two things in an array: the current value and a function to change it.</li>
<li>The square brackets unpack them into two names you choose: <code>count</code> and <code>setCount</code>.</li>
</ul>
<p>To change state, call the setter: <code>setCount(count + 1)</code>. That does two things. It stores the new value, and it tells React to <b>re-render</b>: to call your component function again. This time <code>useState</code> hands back the new value, the JSX shows the new number, and React updates that one piece of text on the screen.</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="The re-render cycle: render shows count, the click calls setCount, React stores the new value and calls the component again">
<rect class="bx-info" x="130" y="10" width="160" height="50" rx="8"/>
<text class="t-b" x="210" y="32" text-anchor="middle">Counter() runs</text><text class="t-s" x="210" y="50" text-anchor="middle">count is 0</text>
<rect class="bx-ok" x="270" y="100" width="140" height="50" rx="8"/>
<text class="t-b" x="340" y="122" text-anchor="middle">screen shows</text><text class="t-s" x="340" y="140" text-anchor="middle">Clicked 0 times</text>
<rect class="bx-warn" x="130" y="180" width="160" height="50" rx="8"/>
<text class="t-b" x="210" y="202" text-anchor="middle">user clicks</text><text class="t-s" x="210" y="220" text-anchor="middle">setCount(0 + 1)</text>
<rect class="bx-a" x="10" y="100" width="140" height="50" rx="8"/>
<text class="t-b" x="80" y="122" text-anchor="middle">React stores 1</text><text class="t-s" x="80" y="140" text-anchor="middle">and re-renders</text>
<path class="ln" d="M290 40q50 4 50 58"/><polygon class="ah" points="334,92 346,92 340,100"/>
<path class="ln" d="M340 150q0 52 -48 56"/><polygon class="ah" points="296,200 296,212 288,206"/>
<path class="ln" d="M130 206q-50 -4 -50 -52"/><polygon class="ah" points="74,158 86,158 80,150"/>
<path class="ln-a" d="M80 100q0 -58 48 -60"/><polygon class="ah-a" points="124,34 124,46 132,40"/>
</svg><figcaption>The state cycle. Counter runs with count 0 and the screen shows Clicked 0 times. A click calls setCount with 1. React stores 1 and calls Counter again, which now returns Clicked 1 times, and React updates just that text.</figcaption></figure>
<div class="mistake"><b>Common mistake</b>Using an ordinary variable. <code>let count = 0;</code> with <code>count = count + 1</code> in the click handler changes the number in memory, but React does not know, so nothing re-renders. Worse, the next render runs the function again and resets it to 0. Anything that should change what is on screen must live in state and change through its setter.</div>
<p>In JSX, events are attributes in camel case, such as <code>onClick</code>, and you pass a function: <code>onClick={() =&gt; setCount(count + 1)}</code>. The arrow function matters. Writing <code>onClick={setCount(count + 1)}</code> would call the setter <i>during</i> rendering, which triggers another render, which calls it again: React stops this loop with the error "Too many re-renders".</p>

<h4>Effects: doing things after rendering</h4>
<p>A component's main job is to return JSX. But sometimes you need to reach outside React: change the browser tab's title, start a timer, or fetch data. These are called <b>side effects</b>, and they belong in <code>useEffect</code>:</p>
<pre class="snip">useEffect(() =&gt; {
  document.title = 'Clicked ' + count + ' times';
}, [count]);   // dependency array: re-run when count changes</pre>
<p><code>useEffect</code> takes two arguments. The first is a function: the effect itself. The second is the <b>dependency array</b>: the values the effect uses. React runs the effect <b>after</b> the screen has been updated, and then again only when something in that array has changed since last time.</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Timeline of renders and when effects run for three kinds of dependency array">
<g text-anchor="middle">
<text class="t-s" x="170" y="20">1st render</text><text class="t-s" x="270" y="20">count changed</text><text class="t-s" x="370" y="20">other change</text>
</g>
<path class="ln-d" d="M120 30h290"/>
<text class="t-m" x="10" y="66">[count]</text>
<circle class="dot-ok" cx="170" cy="60" r="9"/><circle class="dot-ok" cx="270" cy="60" r="9"/><circle class="dot-m" cx="370" cy="60" r="9"/>
<text class="t-m" x="10" y="116">[ ]</text>
<circle class="dot-ok" cx="170" cy="110" r="9"/><circle class="dot-m" cx="270" cy="110" r="9"/><circle class="dot-m" cx="370" cy="110" r="9"/>
<text class="t-m" x="10" y="166">none</text>
<circle class="dot-ok" cx="170" cy="160" r="9"/><circle class="dot-ok" cx="270" cy="160" r="9"/><circle class="dot-ok" cx="370" cy="160" r="9"/>
<circle class="dot-ok" cx="130" cy="198" r="6"/><text class="t-s" x="142" y="203">effect runs</text>
<circle class="dot-m" cx="250" cy="198" r="6"/><text class="t-s" x="262" y="203">skipped</text>
</svg><figcaption>When effects run, after each render. With count in the dependency array, the effect runs after the first render and whenever count changes, and is skipped otherwise. With an empty array it runs once, after the first render. With no array at all it runs after every render.</figcaption></figure>
<p>The effect can also return a <b>cleanup</b> function, which React calls before re-running the effect and when the component is removed. It is how you stop a timer you started. You will not need one today.</p>
<div class="mistake"><b>Common mistake</b>Calling hooks inside an <code>if</code>, a loop or a click handler. Hooks must be called at the top level of the component, in the same order every render, because React matches each <code>useState</code> call to its stored value by its position in that order.</div>

<h4>Tying it to the tasks</h4>
<ol>
<li>In <code>Counter</code>, create count state, show <code>{count}</code> inside the button text, and give the button an <code>onClick</code> that calls the setter.</li>
<li>Add a <code>useEffect</code> that sets <code>document.title</code> from the count, with <code>count</code> in its dependency array.</li>
<li>Write a <code>TodoList</code> component that receives an <code>items</code> prop and maps it to <code>&lt;li&gt;</code> elements with keys. Define a small array of todo objects with <code>id</code> and <code>text</code> outside the components, and render <code>&lt;TodoList items={…} /&gt;</code> inside App.</li>
</ol>
<p>If something breaks, read the red error in the preview. A warning that "each child in a list should have a unique key prop" means a <code>key</code> is missing on the element returned from <code>map</code>, not on the <code>&lt;ul&gt;</code>. "X is not defined" usually means a missing import or a typo in a component name.</p>
<div class="try"><b>Try it in your head</b>Count is 4 and the user clicks once. What runs, in order? The click calls setCount with 5; React calls Counter again, which returns Clicked 5 times; React updates the button text; then, because count changed, the effect runs and sets the tab title to Clicked 5 times. If the dependency array had been empty, the title would still say Clicked 0 times.</div>

<h4>Recap</h4>
<ul>
<li>A component is a function that returns JSX; React turns your description into DOM updates.</li>
<li>Props pass read-only data down the tree; events go up by calling functions passed as props.</li>
<li><code>useState</code> gives a value and a setter. Calling the setter stores the value and re-renders the component.</li>
<li>Render arrays with <code>map</code>, and give each item a stable, unique <code>key</code>.</li>
<li><code>useEffect</code> runs side effects after rendering, re-running only when its dependencies change.</li>
</ul>
`);

explain('f4',`
<h4>Why style with utility classes?</h4>
<p>In the CSS lessons you wrote rules in a stylesheet and connected them to HTML with class names like <code>.card</code>. That works well for a small page. On a large app it causes some familiar pains:</p>
<ul>
<li><b>Naming everything.</b> Is it <code>.card</code>, <code>.project-card</code> or <code>.card-wrapper-inner</code>? Teams spend real time on this.</li>
<li><b>Fear of deleting.</b> Nobody knows which old rules are still used somewhere, so the stylesheet only ever grows.</li>
<li><b>Inconsistency.</b> One developer uses 15 pixels of padding, another 16, another 18, and the design slowly drifts.</li>
<li><b>Jumping between files</b> to see how one element looks.</li>
</ul>
<p><b>Tailwind CSS</b> flips the approach. It provides thousands of tiny ready-made classes, called <b>utility classes</b>, that each do one small thing. You style an element by listing them directly in its markup. No names to invent, nothing to hunt for in another file, and every value comes from a shared scale, so designs stay consistent.</p>
<pre class="snip">&lt;div className="rounded-lg border p-4 shadow-sm"&gt;Shop&lt;/div&gt;</pre>
<p>Remember from the React lesson that JSX writes the class attribute as <code>className</code>. Several classes are separated by spaces, exactly as in plain HTML.</p>

<h4>Reading utility classes</h4>
<p>Each utility is shorthand for one or two CSS declarations you already know. Here is the card above, decoded:</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="Four Tailwind classes and the CSS each one produces">
<g text-anchor="middle">
<rect class="bx-a" x="10" y="16" width="120" height="34" rx="6"/><text class="t-m" x="70" y="38">rounded-lg</text>
<rect class="bx-a" x="10" y="66" width="120" height="34" rx="6"/><text class="t-m" x="70" y="88">border</text>
<rect class="bx-a" x="10" y="116" width="120" height="34" rx="6"/><text class="t-m" x="70" y="138">p-4</text>
<rect class="bx-a" x="10" y="166" width="120" height="34" rx="6"/><text class="t-m" x="70" y="188">shadow-sm</text>
</g>
<path class="ln" d="M130 33h26M130 83h26M130 133h26M130 183h26"/>
<polygon class="ah" points="154,27 154,39 164,33"/><polygon class="ah" points="154,77 154,89 164,83"/><polygon class="ah" points="154,127 154,139 164,133"/><polygon class="ah" points="154,177 154,189 164,183"/>
<rect class="bx-dark" x="168" y="10" width="242" height="200" rx="8"/>
<text class="t-term" x="180" y="38">border-radius: 8px</text>
<text class="t-term" x="180" y="88">border: 1px solid</text>
<text class="t-term" x="180" y="138">padding: 1rem</text>
<text class="t-term" x="180" y="188">box-shadow: small</text>
</svg><figcaption>Each Tailwind class on the left stands for CSS on the right. rounded-lg rounds the corners by 8 pixels. border adds a one pixel solid border. p-4 adds padding of 1 rem, which is 16 pixels. shadow-sm adds a small soft shadow.</figcaption></figure>
<p>The names follow patterns, so you learn the patterns, not thousands of classes:</p>
<div class="tbl-wrap"><table><tr><th>Pattern</th><th>Means</th><th>Examples</th></tr>
<tr><td><code>p-</code>, <code>px-</code>, <code>py-</code>, <code>pt-</code></td><td>padding: all sides, left and right, top and bottom, top only</td><td><code>p-4</code>, <code>px-4 py-2</code></td></tr>
<tr><td><code>m-</code>, <code>mb-</code></td><td>margin, the same way</td><td><code>mb-6</code></td></tr>
<tr><td><code>bg-</code>, <code>text-</code></td><td>background colour, text colour or size</td><td><code>bg-violet-600</code>, <code>text-white</code>, <code>text-sm</code></td></tr>
<tr><td><code>font-</code></td><td>font weight</td><td><code>font-semibold</code>, <code>font-bold</code></td></tr>
<tr><td><code>rounded-</code></td><td>corner rounding</td><td><code>rounded-md</code>, <code>rounded-lg</code></td></tr></table></div>
<p><b>The spacing scale.</b> The number in <code>p-4</code> is not pixels. Each step is a quarter of a <b>rem</b>. A rem is a unit equal to the page's base font size, 16 pixels by default. So one step is 4 pixels, and <code>p-4</code> is 4 times 4, which is 16 pixels. <code>p-2</code> is 8 pixels and <code>gap-4</code> is a 16 pixel gap. Using rem instead of pixels means spacing grows if the user increases their browser's text size.</p>
<p><b>The colour scale.</b> Colours have a name and a shade from 50 (very light) to 950 (very dark). <code>bg-violet-600</code> is a strong violet background, <code>hover:bg-violet-700</code> a slightly darker one, and <code>bg-gray-50</code> an almost-white grey.</p>

<h4>Layout and responsive prefixes</h4>
<p>The flexbox and grid ideas from the layout lesson come as utilities too: <code>flex</code> means <code>display: flex</code>, <code>grid</code> means <code>display: grid</code>, <code>grid-cols-3</code> means three equal columns, and <code>gap-4</code> sets the gap.</p>
<p>Media queries become <b>prefixes</b>. A class with <code>md:</code> in front only applies when the screen is at least the "medium" width, 768 pixels:</p>
<pre class="snip">&lt;div className="grid grid-cols-1 md:grid-cols-3 gap-4"&gt;</pre>
<p>Read it as: "a grid with one column; from medium screens upward, three columns". This is <b>mobile-first</b>, the approach suggested in the layout lesson: classes without a prefix are for every screen, starting with phones, and each prefix adds changes for bigger screens. Under the hood, <code>md:</code> becomes a <code>@media (min-width: 48rem)</code> query.</p>
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="Breakpoint ruler: below 768 pixels grid-cols-1 applies; from md at 768 pixels grid-cols-3 takes over">
<path class="ln" d="M10 70h400"/>
<g text-anchor="middle">
<path class="ln" d="M10 62v16M140 62v16M200 62v16M290 62v16M370 62v16"/>
<text class="t-s" x="10" y="98">0</text><text class="t-b" x="140" y="54">sm</text><text class="t-b t-a" x="200" y="54">md</text><text class="t-b" x="290" y="54">lg</text><text class="t-b" x="370" y="54">xl</text>
<text class="t-s" x="140" y="98">640</text><text class="t-s" x="200" y="98">768</text><text class="t-s" x="290" y="98">1024</text><text class="t-s" x="370" y="98">1280</text>
</g>
<rect class="bx-info" x="10" y="118" width="188" height="36" rx="6"/><text class="t-m" x="104" y="141" text-anchor="middle">grid-cols-1</text>
<rect class="bx-ok" x="202" y="118" width="208" height="36" rx="6"/><text class="t-m" x="306" y="141" text-anchor="middle">md:grid-cols-3 wins</text>
<text class="t-s" x="210" y="180" text-anchor="middle">Screen width in pixels. Each prefix means "this wide or wider".</text>
<text class="t-s" x="10" y="24">phones</text><text class="t-s" x="410" y="24" text-anchor="end">big screens</text>
</svg><figcaption>Tailwind's default breakpoints on a ruler of screen widths: sm at 640 pixels, md at 768, lg at 1024 and xl at 1280. Below 768 pixels, only grid-cols-1 applies and the cards stack. From 768 pixels up, md grid-cols-3 also applies and wins, giving three columns.</figcaption></figure>
<p>Other prefixes work the same way for states: <code>hover:</code> applies while the mouse is over the element, <code>focus:</code> while it has keyboard focus, and <code>dark:</code> in dark mode.</p>

<h4>Components keep utility classes tidy</h4>
<p>The usual first reaction to Tailwind is "my markup is full of class names!". The answer is React components. You write the long list of classes once, inside a component, and use the component everywhere. That is also why shadcn/ui, below, is built this way.</p>
<p>Real apps need the same component in several looks: a solid main button and a quieter outlined one. The common pattern is a <b>variant prop</b>: a prop that picks one of a few named styles from a lookup object.</p>
<pre class="snip">const variants = {
  primary: 'bg-violet-600 text-white',
  outline: 'border bg-white text-gray-900',
};
// inside Button: shared classes + variants[variant]
&lt;Button variant="outline"&gt;Cancel&lt;/Button&gt;</pre>
<p>Inside <code>Button</code>, receive <code>variant</code> as a prop with a default of <code>'primary'</code>, look up <code>variants[variant]</code>, and join that string onto the shared classes such as padding and rounding. The square brackets read an object key held in a variable: if <code>variant</code> is <code>'outline'</code>, <code>variants[variant]</code> is the outline string. Remember to keep a space between the shared classes and the variant classes when you join the strings, or two class names merge into one nonsense name.</p>
<p>The finished pattern often also accepts <code>...props</code>, the <b>rest</b> syntax, which collects any other props such as <code>onClick</code> or <code>type</code>, and passes them on with <code>{...props}</code> to the real <code>&lt;button&gt;</code>. Then your Button works anywhere a normal button would.</p>
<div class="mistake"><b>Common mistake</b>Building class names from pieces, like <code>'bg-' + colour + '-600'</code>. Tailwind works by scanning your source files for complete class names and generating CSS only for the ones it finds. A name glued together at runtime never appears whole in your code, so its CSS is never generated and the style silently does nothing. Always write full class names, for example in a lookup object as above.</div>

<h4>shadcn/ui: components you own</h4>
<p>Buttons are easy. Accessible dialogs, dropdown menus, date pickers and tabs are hard: they must trap keyboard focus, close on Escape, announce themselves to screen readers, and work on touch screens. Getting all of that right yourself takes weeks.</p>
<p>Most component libraries are packages you install, and their code lives hidden in your dependencies. When their look or behaviour does not quite fit, you fight them with overrides. <b>shadcn/ui</b> works differently: it is a collection of components whose <b>source code you copy into your project</b>, usually with a command such as <code>npx shadcn@latest add button</code>. After that, the file is yours. You read it, edit it, restyle it, and nothing is hidden.</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Layers: your app uses your copied component files, styled with Tailwind, built on Radix UI behaviour">
<rect class="bx-a" x="40" y="10" width="340" height="40" rx="8"/><text class="t-b" x="210" y="35" text-anchor="middle">your app's pages</text>
<rect class="bx-ok" x="40" y="62" width="340" height="52" rx="8"/><text class="t-b" x="210" y="84" text-anchor="middle">components/ui/button.tsx</text><text class="t-s" x="210" y="104" text-anchor="middle">copied in by shadcn: yours to edit</text>
<rect class="bx-info" x="40" y="126" width="164" height="52" rx="8"/><text class="t-b" x="122" y="148" text-anchor="middle">Tailwind</text><text class="t-s" x="122" y="168" text-anchor="middle">the look</text>
<rect class="bx-warn" x="216" y="126" width="164" height="52" rx="8"/><text class="t-b" x="298" y="148" text-anchor="middle">Radix UI</text><text class="t-s" x="298" y="168" text-anchor="middle">the behaviour</text>
<text class="t-s" x="210" y="200" text-anchor="middle">Tailwind and Radix stay as installed packages.</text>
</svg><figcaption>How shadcn/ui fits together. Your pages use component files that live in your own project. Each component gets its look from Tailwind classes and its accessible behaviour, such as keyboard handling and focus, from Radix UI primitives. Tailwind and Radix remain packages you install; only the component file is copied in.</figcaption></figure>
<p>Under the hood, many shadcn components wrap <b>Radix UI</b> primitives, unstyled components that handle the hard accessibility behaviour, and style them with Tailwind. Buttons use the variant pattern you just learnt, written with a small helper library called class-variance-authority. Today's Button task is a hand-made version of exactly that idea.</p>

<h4>Working through the tasks</h4>
<ol>
<li>Give each card div the classes for rounded corners, a border and <code>p-4</code>. The checker looks for an element with <code>p-4</code> whose padding really is 16 pixels.</li>
<li>Give the cards' wrapper <code>grid grid-cols-1 md:grid-cols-3</code> and a gap. The checker tests it at 900 and at 420 pixels wide.</li>
<li>Add a <code>variant</code> prop to Button with two looks, and render one of each, so their background colours differ.</li>
</ol>
<p>If the preview shows no styling at all, Tailwind itself has not loaded: it comes from the internet in this sandbox, so check your connection and press Run again. Note that the cards are plain divs at first; turning them into a small <code>Card</code> component, as the solution does, is optional but good practice.</p>
<div class="try"><b>Try it in your head</b>How many pixels of padding does <code>px-6 py-2</code> give? Each step is 4 pixels, so 24 pixels left and right and 8 pixels top and bottom. And on a screen 700 pixels wide, how many columns does <code>grid-cols-1 md:grid-cols-3</code> show? One, because 700 is below the md breakpoint of 768.</div>

<h4>Recap</h4>
<ul>
<li>Tailwind styles elements with small utility classes in <code>className</code>, each standing for one bit of CSS.</li>
<li>Spacing steps are 4 pixels each, so <code>p-4</code> is 16 pixels; colours run from shade 50 to 950.</li>
<li>Prefixes such as <code>md:</code> and <code>hover:</code> apply a class only from that screen width up, or in that state.</li>
<li>Write full class names; wrap repeated class lists in components, with variant props for different looks.</li>
<li>shadcn/ui copies accessible components into your codebase, built on Radix UI and Tailwind, so you own and can change them.</li>
</ul>
`);

explain('f5',`
<h4>When useState is not enough</h4>
<p>In the React lesson, each piece of state lived inside one component: the Counter owned its count. That is the right default. Keep state as close as possible to where it is used.</p>
<p>But real apps have data that many distant components need. Picture a shop. The "Add to cart" button sits deep inside a product page. The cart badge showing "Cart: 3" sits in the header at the top. They are far apart in the component tree, yet they share one number.</p>
<p>With only <code>useState</code>, the number has to live in a component above both of them, usually App. Then App passes it down as props through every layer in between, even layers that do not care about it. That is called <b>prop drilling</b>, and it makes components cluttered and hard to move around.</p>
<figure class="fig"><svg viewBox="0 0 420 265" role="img" aria-label="Prop drilling on the left threads the cart through every layer; a store on the right is read directly by the two components that need it">
<text class="t-b" x="100" y="20" text-anchor="middle">prop drilling</text>
<g text-anchor="middle">
<rect class="bx-a" x="60" y="32" width="80" height="30" rx="6"/><text class="t-m" x="100" y="52">App</text>
<rect class="bx" x="10" y="92" width="80" height="30" rx="6"/><text class="t-m" x="50" y="112">Header</text>
<rect class="bx" x="110" y="92" width="80" height="30" rx="6"/><text class="t-m" x="150" y="112">Page</text>
<rect class="bx-ok" x="10" y="152" width="80" height="30" rx="6"/><text class="t-m" x="50" y="172">Badge</text>
<rect class="bx" x="110" y="152" width="80" height="30" rx="6"/><text class="t-m" x="150" y="172">Product</text>
<rect class="bx-ok" x="110" y="212" width="80" height="30" rx="6"/><text class="t-m" x="150" y="232">AddBtn</text>
</g>
<path class="ln-a" d="M90 62l-36 30M110 62l36 30M50 122v30M150 122v30M150 182v30"/>
<path class="ln-d" d="M210 20v240"/>
<text class="t-b" x="315" y="20" text-anchor="middle">shared store</text>
<g text-anchor="middle">
<rect class="bx-warn" x="265" y="32" width="100" height="40" rx="8"/><text class="t-b" x="315" y="57">useCart</text>
<rect class="bx-ok" x="230" y="200" width="80" height="30" rx="6"/><text class="t-m" x="270" y="220">Badge</text>
<rect class="bx-ok" x="325" y="200" width="85" height="30" rx="6"/><text class="t-m" x="367" y="220">AddBtn</text>
</g>
<path class="ln-ok" d="M290 72L272 192M340 72l26 120"/>
<polygon class="ah-ok" points="266,190 278,192 271,200"/><polygon class="ah-ok" points="360,191 372,189 368,199"/>
<text class="t-s" x="315" y="256" text-anchor="middle">read directly, no middlemen</text>
</svg><figcaption>On the left, the cart lives in App and is passed down as props through Header, Page and Product, which do not use it, just to reach the Badge and the Add button. On the right, the cart lives in a store, and only the two components that need it read from it directly.</figcaption></figure>
<p>A <b>store</b> solves this. It is a piece of state that lives outside the component tree, and any component can read from it or change it directly. This lesson covers the two most common store libraries, Zustand and Redux Toolkit, and then a third tool for a different kind of data altogether.</p>

<h4>Two kinds of state</h4>
<p>Before choosing a tool, sort your data into two piles. This is the single most useful idea in this lesson.</p>
<div class="tbl-wrap"><table><tr><th></th><th>Client state</th><th>Server state</th></tr>
<tr><td>Examples</td><td>Is the menu open? What is in the cart? Light or dark theme?</td><td>The product list, the user's orders, comments</td></tr>
<tr><td>Who owns it</td><td>The browser. It is the only copy.</td><td>The server. You only hold a copy, which can go out of date.</td></tr>
<tr><td>Hard parts</td><td>Sharing it between components</td><td>Loading, errors, caching, keeping it fresh</td></tr>
<tr><td>Tool</td><td><code>useState</code>, then Zustand or Redux Toolkit</td><td>TanStack Query</td></tr></table></div>
<p>Mixing them up is a classic mistake: people copy API data into a global store, then write piles of code to track loading flags and decide when to fetch again. Server state has its own tool, which you will meet below.</p>

<h4>Zustand: a small shared store</h4>
<p><b>Zustand</b> (German for "state") makes a store in a few lines:</p>
<pre class="snip">import { create } from 'zustand';

const useCart = create((set) =&gt; ({
  items: 0,                                         // the data
  add: () =&gt; set((state) =&gt; ({ items: state.items + 1 })),  // an action
}));</pre>
<p>Step by step:</p>
<ol>
<li><code>create</code> builds the store and gives you back a hook. By convention its name starts with <code>use</code>, so <code>useCart</code>.</li>
<li>You pass <code>create</code> a function that receives <code>set</code>, Zustand's tool for changing the store, and returns the starting contents: an object.</li>
<li>That object holds both data (<code>items: 0</code>) and <b>actions</b>, functions that change the data (<code>add</code>).</li>
<li>Inside <code>add</code>, <code>set</code> is given an <b>updater function</b>. It receives the current state and returns only the keys that change. Zustand merges that into the store, so <code>add</code> stays as it was.</li>
</ol>
<p>Notice the round brackets in <code>({ items: … })</code>. An arrow function that should return an object needs them, because a bare curly brace after the arrow would be read as the start of a function body.</p>
<p>Now any component, anywhere, can use the store:</p>
<pre class="snip">function CartBadge() {
  const items = useCart((s) =&gt; s.items);   // pick one value
  return &lt;p id="badge"&gt;Cart: {items}&lt;/p&gt;;
}</pre>
<p>The function <code>(s) =&gt; s.items</code> is a <b>selector</b>: it picks the part of the store this component cares about. Zustand re-renders the component only when that selected value changes. An <code>AddButton</code> selects <code>s.add</code> and calls it from <code>onClick</code>. Click the button, the store changes, the badge re-renders. Neither component knows the other exists.</p>

<h4>Redux Toolkit: the same job with more structure</h4>
<p><b>Redux</b> is the older, very widely used store library, and <b>Redux Toolkit</b> is the modern, official way to write it. You will meet it in many company codebases, so you need to be able to read it, even though this lesson's tasks use Zustand.</p>
<pre class="snip">const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: 0 },
  reducers: {
    add: (state) =&gt; { state.items += 1; },
  },
});
// in a component:
dispatch(cartSlice.actions.add());</pre>
<p>The ideas map closely onto Zustand. A <b>slice</b> is one section of the store, with its starting state and its <b>reducers</b>, the functions that say how state changes. Components do not call those directly: they <b>dispatch</b> an <b>action</b>, a small object describing what happened, and Redux runs the matching reducer. The reducer looks like it changes state directly; Redux Toolkit uses a library called Immer to turn that into a safe, fresh copy behind the scenes.</p>
<p>That extra ceremony buys you a strict, predictable pattern and excellent developer tools that record every action, so you can replay how the state got where it is. Large teams like that. For most apps, Zustand's lighter approach is enough. Reach for the simplest tool first.</p>

<h4>Server state and TanStack Query</h4>
<p>Fetching a list sounds simple: call <code>fetch</code> in an effect and put the result in state. In practice you also need a loading message, an error message, a way to avoid fetching the same list twice when two components need it, a cache so going back to a page is instant, and a way to refresh data that may have changed on the server. Writing all of that for every request is a lot of fiddly code.</p>
<p><b>TanStack Query</b> (formerly React Query) does it for you:</p>
<pre class="snip">const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: () =&gt; fetch('/api/products').then((r) =&gt; r.json()),
});</pre>
<ul>
<li><code>queryFn</code> is how to get the data. It must return a promise. <code>.then(fn)</code> is another way to wait for a promise, instead of <code>await</code>: "when the response arrives, run this function on it". Returning <code>r.json()</code> from it gives you the parsed array.</li>
<li><code>queryKey</code> is the data's name in the cache. Any component asking for <code>['products']</code> shares the same cached copy and the same request.</li>
<li>The hook returns an object; you destructure <code>data</code>, <code>isLoading</code> (true while the first load is in progress) and <code>error</code> (set if it failed).</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Query lifecycle: loading, then success with fresh data, cached and stale, then a background refetch">
<g text-anchor="middle">
<rect class="bx-warn" x="10" y="20" width="110" height="50" rx="8"/><text class="t-b" x="65" y="42">loading</text><text class="t-s" x="65" y="60">isLoading true</text>
<rect class="bx-ok" x="155" y="20" width="110" height="50" rx="8"/><text class="t-b" x="210" y="42">success</text><text class="t-s" x="210" y="60">data is ready</text>
<rect class="bx-info" x="300" y="20" width="110" height="50" rx="8"/><text class="t-b" x="355" y="42">cached</text><text class="t-s" x="355" y="60">later: stale</text>
<rect class="bx-bad" x="10" y="130" width="110" height="50" rx="8"/><text class="t-b" x="65" y="152">error</text><text class="t-s" x="65" y="170">error is set</text>
<rect class="bx" x="230" y="130" width="180" height="50" rx="8"/><text class="t-b" x="320" y="152">background refetch</text><text class="t-s" x="320" y="170">old data stays on screen</text>
</g>
<path class="ln" d="M120 45h26"/><polygon class="ah" points="144,39 144,51 154,45"/>
<path class="ln" d="M265 45h26"/><polygon class="ah" points="289,39 289,51 299,45"/>
<path class="ln-a" d="M65 70v50"/><polygon class="ah-a" points="59,118 71,118 65,128"/>
<path class="ln" d="M355 70v50"/><polygon class="ah" points="349,118 361,118 355,128"/>
<path class="ln-ok" d="M260 130l-40 -50"/><polygon class="ah-ok" points="214,86 224,79 215,72"/>
<text class="t-s" x="410" y="104" text-anchor="end">e.g. window focus</text>
</svg><figcaption>The life of a query. It starts loading. It either fails, setting error, or succeeds with data. The data is cached and, after a while, marked stale. A trigger such as returning to the browser tab fetches it again in the background while the old data stays on screen, then swaps in the fresh copy.</figcaption></figure>
<p>A component using it follows a simple shape: if loading, return a loading message; if error, return an error message; otherwise map <code>data</code> to list items with keys. In TanStack Query version 5 you will also see <code>isPending</code>, which is closely related; both work for a first load.</p>
<p>One setup step: the cache has to live somewhere. You create one <code>QueryClient</code> outside your components and wrap the app in <code>&lt;QueryClientProvider client={queryClient}&gt;</code>. Any component inside that wrapper can call <code>useQuery</code>.</p>
<div class="mistake"><b>Common mistake</b>Forgetting the provider. <code>useQuery</code> outside a <code>QueryClientProvider</code> throws an error saying no QueryClient is set. Wrap everything that App returns, and create the client once, outside App, so it is not recreated on every render.</div>
<div class="mistake"><b>Common mistake</b>Using <code>data</code> before it exists. On the first render <code>data</code> is <code>undefined</code>, so <code>data.map</code> crashes with "Cannot read properties of undefined". Handle the loading state first and return early.</div>

<h4>Putting the tasks together</h4>
<ol>
<li>Create the <code>useCart</code> store with <code>items</code> and <code>add</code>. Write <code>CartBadge</code>, rendering a paragraph with id <code>badge</code>, and <code>AddButton</code>, a button labelled "Add to cart". Render both in App.</li>
<li>Write <code>Products</code> with <code>useQuery</code> for <code>/api/products</code>, a loading message, and one <code>li</code> per product. This preview's pretend API answers that address with three products.</li>
<li>Wrap App's content in the provider.</li>
</ol>
<div class="try"><b>Try it in your head</b>Two components on the same page both call <code>useQuery</code> with the key <code>['products']</code>. How many network requests are made? One: they share the cache entry, and the second simply reads the same result. And is "the search box is open" client or server state? Client state: only the browser knows it, so a <code>useState</code> or a store is the right home.</div>

<h4>Recap</h4>
<ul>
<li>Keep state local first. When distant components share it, use a store instead of drilling props through every layer.</li>
<li>Zustand: <code>create((set) =&gt; ({ … }))</code> makes a hook; components pick values with selectors and re-render only when those change.</li>
<li>Redux Toolkit does the same with slices, reducers and dispatched actions, adding structure and devtools for large teams.</li>
<li>Server data is a cached copy: let TanStack Query fetch, cache, share and refresh it.</li>
<li><code>useQuery({ queryKey, queryFn })</code> gives <code>data</code>, <code>isLoading</code> and <code>error</code>, inside a <code>QueryClientProvider</code>.</li>
</ul>
`);

explain('f6',`
<h4>Why forms deserve their own tools</h4>
<p>Forms are how users talk to your app: signing up, logging in, checking out, posting a comment. They look simple, a few boxes and a button, but every form has to answer the same awkward questions. What did the user type? Is it valid? Which message goes under which box? When should errors appear? What happens on submit?</p>
<p>You could answer them by hand with <code>useState</code>: one piece of state per field, an <code>onChange</code> on every input, a pile of <code>if</code> statements for the checks, and more state for the error messages. For two fields that is tolerable. For a twenty-field checkout it becomes hundreds of lines of repetitive, easy-to-break code, and every keystroke re-renders the whole form.</p>
<p>The modern pairing splits the job in two. <b>React Hook Form</b> manages the form: it collects values, tracks errors and handles submission. <b>Zod</b> describes what valid data looks like and checks it. A small adapter called a <b>resolver</b> connects them.</p>

<h4>Zod: describe the shape once</h4>
<p>A <b>schema</b> is a description of what valid data looks like. With Zod you build one from small pieces:</p>
<pre class="snip">import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Use at least 8 characters'),
});</pre>
<p>Read it aloud and it is almost English: "an object, whose email is a string that is a valid email address, and whose password is a string with a minimum length of 8". Each rule can take a message as its last argument, which becomes the error text the user sees.</p>
<p>Chaining like <code>z.string().email()</code> works because each method returns a new schema with one more rule added. Zod version 4 also offers a shorter <code>z.email()</code>; the chained form used here still works.</p>
<p>To check data against a schema, call <code>safeParse</code>:</p>
<pre class="snip">schema.safeParse({ email: 'nope', password: 'short' });
// { success: false, error: { issues: [
//     { path: ['email'], message: 'Enter a valid email', ... },
//     { path: ['password'], message: 'Use at least 8 characters', ... } ] } }</pre>
<p>It never crashes. It returns an object whose <code>success</code> is <code>true</code> with the clean <code>data</code>, or <code>false</code> with a list of <b>issues</b>. Each issue says which field failed, in <code>path</code>, and why, in <code>message</code>. (There is also <code>parse</code>, which throws an error instead of returning one.)</p>

<h4>React Hook Form: register, handleSubmit, errors</h4>
<p>The <code>useForm</code> hook gives you a toolkit. You destructure the three parts you need:</p>
<pre class="snip">const { register, handleSubmit, formState: { errors } } =
  useForm({ resolver: zodResolver(schema) });</pre>
<p>That line uses <b>nested destructuring</b>: take <code>formState</code> out of the result, then take <code>errors</code> out of <code>formState</code>.</p>
<p><b>register</b> connects one input to the form:</p>
<pre class="snip">&lt;input {...register('email')} /&gt;</pre>
<p><code>register('email')</code> returns an object of props: the field's <code>name</code>, an <code>onChange</code> and an <code>onBlur</code> handler, and a <code>ref</code>, React's way of holding a direct reference to the real DOM element. The <code>{...}</code> <b>spread</b> syntax copies every one of those props onto the input. You do not write them yourself.</p>
<p>Because React Hook Form reads values straight from the DOM elements through those refs, typing does not have to update React state on every key. Inputs that keep their own value like this are called <b>uncontrolled</b>. The result is less code and fewer re-renders.</p>
<p><b>handleSubmit</b> wraps your submit function:</p>
<pre class="snip">&lt;form onSubmit={handleSubmit(onValid)}&gt;</pre>
<p>When the form is submitted, <code>handleSubmit</code> first stops the browser's default behaviour, which would reload the whole page. Then it collects all values and validates them. Only if everything passes does it call your <code>onValid</code> function with the clean data. If anything fails, it fills <code>errors</code> instead, and your function never runs.</p>
<figure class="fig"><svg viewBox="0 0 420 270" role="img" aria-label="Submit flow: values go through handleSubmit and the resolver to Zod; either errors are shown or onValid runs">
<rect class="bx-info" x="130" y="10" width="160" height="40" rx="8"/><text class="t-b" x="210" y="35" text-anchor="middle">click Sign up</text>
<path class="ln" d="M210 50v14"/><polygon class="ah" points="204,62 216,62 210,70"/>
<rect class="bx-a" x="110" y="72" width="200" height="40" rx="8"/><text class="t-m" x="210" y="97" text-anchor="middle">handleSubmit</text>
<path class="ln" d="M210 112v14"/><polygon class="ah" points="204,124 216,124 210,132"/>
<rect class="bx-warn" x="90" y="134" width="240" height="40" rx="8"/><text class="t" x="210" y="159" text-anchor="middle">resolver: Zod safeParse</text>
<path class="ln-a" d="M150 174l-50 36"/><polygon class="ah-a" points="96,202 106,210 94,214"/>
<path class="ln-ok" d="M270 174l50 36"/><polygon class="ah-ok" points="314,210 326,206 324,216"/>
<rect class="bx-bad" x="10" y="214" width="180" height="48" rx="8"/><text class="t-b" x="100" y="236" text-anchor="middle">invalid</text><text class="t-s" x="100" y="254" text-anchor="middle">errors filled, shown</text>
<rect class="bx-ok" x="230" y="214" width="180" height="48" rx="8"/><text class="t-b" x="320" y="236" text-anchor="middle">valid</text><text class="t-s" x="320" y="254" text-anchor="middle">onValid(data) runs</text>
</svg><figcaption>What happens on submit. handleSubmit stops the page reload and passes the values to the resolver, which runs Zod's safeParse. If anything is invalid, the errors object is filled and messages appear under the fields. If everything is valid, your onValid function runs with the clean data.</figcaption></figure>

<h4>The resolver: the bridge between them</h4>
<p>React Hook Form and Zod do not know about each other. A <b>resolver</b> is a function React Hook Form calls with the form's values; it must return either the valid values, or an <code>errors</code> object keyed by field name. In a real project you import a ready-made one, <code>zodResolver</code>, from the package <code>@hookform/resolvers/zod</code>. This sandbox does not have that package, so you write its core yourself. It is shorter than you might fear:</p>
<pre class="snip">const zodResolver = (schema) =&gt; async (values) =&gt; {
  const result = schema.safeParse(values);
  if (result.success) return { values: result.data, errors: {} };
  // otherwise: build errors from result.error.issues
};</pre>
<p>Note the double arrow. <code>zodResolver(schema)</code> is a function that <b>returns another function</b>, the resolver itself, which remembers <code>schema</code> through a closure, the idea from the DOM lesson. For the failure case, loop over <code>result.error.issues</code> with <code>for…of</code>. For each issue, the field name is <code>issue.path[0]</code>, the first entry of its path, and you store <code>{ message: issue.message }</code> under that name. Return <code>{ values: {}, errors }</code> at the end.</p>

<h4>Showing errors, accessibly</h4>
<pre class="snip">{errors.email &amp;&amp; &lt;p role="alert"&gt;{errors.email.message}&lt;/p&gt;}</pre>
<p>This is a common JSX pattern for "show this only if". The <code>&amp;&amp;</code> operator means "and". If <code>errors.email</code> does not exist, the expression stops there and React renders nothing. If it does exist, the result is the paragraph, so it appears.</p>
<p>Two small accessibility habits make a big difference:</p>
<ul>
<li>Wrap each input in a <code>&lt;label&gt;</code> with visible text. Clicking the label focuses the input, and a screen reader announces "Email, edit text" instead of just "edit text".</li>
<li>Give error messages <code>role="alert"</code>. A screen reader then reads the message out the moment it appears, so a blind user knows the submit failed and why.</li>
</ul>
<p>For the password field, add <code>type="password"</code> so the characters are hidden. The button should have <code>type="submit"</code>; a button inside a form submits it by default, but being explicit avoids surprises.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>onSubmit={onValid}</code> without <code>handleSubmit</code>. The browser then performs its old-fashioned submit and reloads the page, wiping everything, and no validation runs. Always pass your function <i>through</i> <code>handleSubmit</code>.</div>
<div class="mistake"><b>Common mistake</b>A field that never validates because its name differs. <code>register('Email')</code> with a schema key <code>email</code> do not match: names are case-sensitive and must be identical in the schema, in <code>register</code> and in <code>errors.email</code>.</div>

<h4>Validate on the server too</h4>
<p>Everything above runs in the user's browser, and the user controls their browser completely. They can switch JavaScript off, edit your code in the developer tools, or skip your page entirely and send a request straight to your API with a command-line tool. Browser validation is a convenience for honest users: instant feedback, fewer mistakes. It is <b>not security</b>.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Two paths to the API: through the form with browser validation, and a direct request that skips it; only server validation catches both">
<rect class="bx-info" x="10" y="20" width="110" height="44" rx="8"/><text class="t-b" x="65" y="47" text-anchor="middle">your form</text>
<rect class="bx-ok" x="150" y="20" width="110" height="44" rx="8"/><text class="t-s" x="205" y="40" text-anchor="middle">browser</text><text class="t-s" x="205" y="56" text-anchor="middle">validation</text>
<rect class="bx-bad" x="10" y="130" width="110" height="44" rx="8"/><text class="t-b" x="65" y="157" text-anchor="middle">attacker</text>
<rect class="bx-a" x="300" y="64" width="110" height="64" rx="8"/><text class="t-b" x="355" y="90" text-anchor="middle">server</text><text class="t-s" x="355" y="110" text-anchor="middle">validates again</text>
<path class="ln" d="M120 42h22"/><polygon class="ah" points="140,36 140,48 150,42"/>
<path class="ln-ok" d="M260 42l32 26"/><polygon class="ah-ok" points="286,72 296,64 298,76"/>
<path class="ln-a" d="M120 152h120l52 -28"/><polygon class="ah-a" points="286,118 296,130 300,118"/>
<text class="t-s t-a" x="190" y="144" text-anchor="middle">skips the form</text>
</svg><figcaption>Two ways data reaches your server. Honest users come through your form, where browser validation helps them. An attacker can send a request directly and skip the form. Only validation on the server catches both, so the server must always check again.</figcaption></figure>
<p>The server must check every request again. A nice benefit of Zod is that the very same schema can run on a Node.js server, so the rules are written once and stay in sync.</p>

<h4>The tasks</h4>
<ol>
<li>Write the schema with both messages exactly as the task states.</li>
<li>Write the resolver, set up <code>useForm</code> with it, register an email input and a password input, and show each field's message under it.</li>
<li>Keep a <code>welcome</code> value in <code>useState</code> (the starter does not import it, so add <code>import { useState } from 'react';</code>), and in your valid-submit function set it to the submitted email, then show "Welcome, " followed by that email.</li>
</ol>
<div class="try"><b>Try it in your head</b>The user types <code>ada@example.com</code> and the password <code>abc</code>, then submits. What appears? The email passes, the password fails the minimum length, so "Use at least 8 characters" appears under the password and the welcome function does not run. What would <code>issue.path[0]</code> be for that failure? The string <code>'password'</code>.</div>

<h4>Recap</h4>
<ul>
<li>Zod describes valid data once with a schema; <code>safeParse</code> returns success with data, or a list of issues with paths and messages.</li>
<li>React Hook Form: <code>register</code> connects inputs, <code>handleSubmit</code> validates and stops the page reload, <code>formState.errors</code> holds messages.</li>
<li>A resolver bridges the two by turning Zod's issues into an errors object keyed by field name.</li>
<li>Use labels and <code>role="alert"</code> so everyone can use and understand your form.</li>
<li>Browser validation is for user experience; always validate again on the server, ideally with the same schema.</li>
</ul>
`);

explain('f8',`
<h4>Why write tests for a UI?</h4>
<p>Every time you change code, something that used to work might quietly break. You could click through every page after every change to check, but that gets slow and boring, and you will skip it on a busy day. That is exactly the day something breaks.</p>
<p>An <b>automated test</b> is a small program that checks your code for you. It does what a user would do, like clicking Increment twice, and then checks what appears, like "Count: 2". Run all your tests after each change and in seconds you know whether anything broke. Teams usually run them automatically on every change before it can be merged.</p>
<p><b>React Testing Library</b> (RTL) is the standard tool for testing React components. Its guiding rule is worth memorising: <i>the more your tests resemble the way your software is used, the more confidence they give you.</i></p>

<h4>The shape of a test</h4>
<p>A test runner, such as Vitest or Jest in real projects, finds your tests, runs each one and reports which passed. In this sandbox the preview plays that role. Each test is written like this:</p>
<pre class="snip">test('starts at zero', () =&gt; {
  render(&lt;Counter /&gt;);                        // arrange
  const heading = screen.getByRole('heading'); // find
  expect(heading.textContent).toBe('Count: 0');  // assert
});</pre>
<p><code>test</code> takes two arguments: a <b>name</b> that describes the behaviour in plain words, and a <b>function</b> holding the steps. If every step runs without an error, the test passes. If any step throws an error, it fails, and the runner shows you which line and why.</p>
<p>Almost every UI test follows the same three-step pattern, often called <b>Arrange, Act, Assert</b>:</p>
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="Arrange, Act, Assert: render the component, fire a click, expect the text">
<g text-anchor="middle">
<rect class="bx-info" x="10" y="20" width="120" height="66" rx="8"/><text class="t-b" x="70" y="46">1. Arrange</text><text class="t-s" x="70" y="70">render it</text>
<rect class="bx-warn" x="150" y="20" width="120" height="66" rx="8"/><text class="t-b" x="210" y="46">2. Act</text><text class="t-s" x="210" y="70">click, type</text>
<rect class="bx-ok" x="290" y="20" width="120" height="66" rx="8"/><text class="t-b" x="350" y="46">3. Assert</text><text class="t-s" x="350" y="70">check screen</text>
</g>
<path class="ln" d="M130 53h12M270 53h12"/><polygon class="ah" points="140,47 140,59 150,53"/><polygon class="ah" points="280,47 280,59 290,53"/>
<rect class="bx-dark" x="10" y="106" width="400" height="74" rx="8"/>
<text class="t-term" x="22" y="130">render(&lt;Counter /&gt;)</text>
<text class="t-term" x="22" y="150">fireEvent.click(button)</text>
<text class="t-term" x="22" y="170">expect(text).toBe('Count: 1')</text>
</svg><figcaption>The three steps of a UI test. Arrange: render the component. Act: do what a user does, such as clicking a button. Assert: check that the screen now shows what it should.</figcaption></figure>

<h4>render and screen</h4>
<p><code>render(&lt;Counter /&gt;)</code> draws the component into a pretend page. Tests usually run without a visible browser, in a simulated DOM called jsdom, but the component cannot tell the difference: it gets real DOM elements, real events and real state updates.</p>
<p><code>screen</code> is an object representing that whole page. You use its <b>queries</b> to find elements, the way a person scanning the screen would.</p>

<h4>Finding things by role</h4>
<p>Every element has a <b>role</b>: what kind of thing it is to assistive technology such as a screen reader. Many roles come automatically from the HTML tag:</p>
<div class="tbl-wrap"><table><tr><th>HTML</th><th>Role</th><th>Its accessible name</th></tr>
<tr><td><code>&lt;button&gt;Increment&lt;/button&gt;</code></td><td><code>button</code></td><td>Increment (its text)</td></tr>
<tr><td><code>&lt;h2&gt;Count: 0&lt;/h2&gt;</code></td><td><code>heading</code></td><td>Count: 0</td></tr>
<tr><td><code>&lt;a href="…"&gt;Home&lt;/a&gt;</code></td><td><code>link</code></td><td>Home</td></tr>
<tr><td><code>&lt;input&gt;</code> inside a label</td><td><code>textbox</code></td><td>the label's text</td></tr></table></div>
<p>The <b>accessible name</b> is what a screen reader would announce for that element, usually its visible text or its label. <code>screen.getByRole('button', { name: 'Increment' })</code> means "find the button that a screen reader would call Increment".</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="The Counter as screen readers see it: a heading and two buttons; getByRole with name Increment matches one button">
<rect class="bx" x="10" y="10" width="230" height="190" rx="8"/>
<text class="t-s" x="125" y="32" text-anchor="middle">what assistive tech sees</text>
<rect class="bx-info" x="26" y="46" width="198" height="40" rx="6"/><text class="t" x="38" y="71">heading: Count: 0</text>
<rect class="bx-ok" x="26" y="96" width="198" height="40" rx="6"/><text class="t" x="38" y="121">button: Increment</text>
<rect class="bx" x="26" y="146" width="198" height="40" rx="6"/><text class="t" x="38" y="171">button: Reset</text>
<rect class="bx-dark" x="262" y="80" width="148" height="74" rx="8"/>
<text class="t-term" x="274" y="104">getByRole(</text><text class="t-term" x="274" y="124"> 'button',</text><text class="t-term" x="274" y="144"> name: …)</text>
<path class="ln-ok" d="M262 116h-30"/><polygon class="ah-ok" points="234,110 234,122 224,116"/>
</svg><figcaption>The Counter as a screen reader sees it: a heading called Count 0 and two buttons called Increment and Reset. A query for the button role alone would match two elements. Adding the name Increment narrows it to exactly one.</figcaption></figure>
<p>Why prefer roles over CSS classes or ids? Three reasons:</p>
<ul>
<li><b>It tests what users experience.</b> Users never see your class names. They see a button labelled Increment.</li>
<li><b>It survives refactoring.</b> Rename a class or restructure the markup and the test still passes, as long as the user sees the same thing.</li>
<li><b>It checks accessibility for free.</b> If <code>getByRole</code> cannot find your button, a screen-reader user probably cannot either. An icon button with no text and no label fails the query, which tells you to fix it.</li>
</ul>
<p>When roles do not fit, fall back in this order: <code>getByLabelText</code> for form fields, <code>getByText</code> for plain text such as <code>screen.getByText('Count: 0')</code>, and <code>getByTestId</code> only as a last resort.</p>

<h4>Acting and asserting</h4>
<p><code>fireEvent.click(element)</code> sends a click event to the element, exactly as a real click would, so its <code>onClick</code> runs, state changes and React re-renders. In real projects many teams use the companion library <code>@testing-library/user-event</code>, which simulates whole interactions more realistically (a click includes the mouse moving, pressing and releasing). <code>fireEvent</code> is what this sandbox provides, and it is fine for clicks.</p>
<p>Then <code>expect(value)</code> wraps the actual value, and a <b>matcher</b> compares it with what you expected:</p>
<ul>
<li><code>.toBe('Count: 2')</code> passes only if the value is exactly that.</li>
<li><code>.toBeTruthy()</code> passes if the value counts as true, for example an element that was found.</li>
</ul>
<p>Re-query after acting. Find the heading again, or read its <code>textContent</code> after the clicks, so you see the updated text.</p>

<h4>Each test starts fresh</h4>
<p>Every test should <code>render</code> its own component. Between tests the library removes what was rendered, so state never leaks from one test into the next. That is why the Reset test must click Increment itself first: it starts from a brand-new Counter at zero, not from wherever the previous test left off. Tests that depend on each other break in confusing ways when run in a different order.</p>
<p>For the tasks:</p>
<ol>
<li>An "increments" test: render, find the Increment button by role and name, click it twice, then expect the heading text to be "Count: 2". Put the word increment in the test name, since the checker looks for it.</li>
<li>A "resets" test: render, click Increment, click Reset, expect "Count: 0".</li>
<li>Keep the starting test, so three tests pass.</li>
</ol>
<div class="mistake"><b>Common mistake</b><code>screen.getByRole('button')</code> with no name on a component with two buttons. <code>getBy</code> queries demand exactly one match, so this fails with "Found multiple elements with the role button". Add <code>{ name: 'Increment' }</code> to say which one.</div>
<div class="mistake"><b>Common mistake</b>Testing implementation details: reaching for the <code>count</code> state variable, or a class name. A test like that breaks when you refactor, even though users notice nothing. Test what is on the screen.</div>

<h4>Reading a failing test</h4>
<ul>
<li><b>"Unable to find an accessible element with the role button and name Incremnt"</b>: nothing matched. Check the spelling of the name, which must match the visible text. The error also prints the roles it did find, which is a great clue.</li>
<li><b>"Expected: Count: 2, Received: Count: 1"</b>: the code ran but the screen showed something else. Did you click twice? Did you query the right element?</li>
<li><b>"render is not defined"</b>: a missing import. Here <code>render</code>, <code>screen</code> and <code>fireEvent</code> are provided; in a real project you import them from <code>@testing-library/react</code>.</li>
</ul>
<p>The other query families are worth knowing: <code>queryBy…</code> returns <code>null</code> instead of throwing when nothing matches, which is how you check that something is <i>not</i> there, and <code>findBy…</code> returns a promise that waits for an element to appear, for content that loads later.</p>
<div class="try"><b>Try it in your head</b>A test renders Counter, clicks Increment three times and then Reset once. What should the heading say? Count: 0. And why would <code>screen.getByText('Count: 3')</code> fail at that point? Because no element shows that text any more, and getBy queries throw when they find nothing.</div>

<h4>Recap</h4>
<ul>
<li>A UI test renders a component, acts like a user and asserts on what appears: arrange, act, assert.</li>
<li>Find elements with <code>screen.getByRole</code> and an accessible name first; fall back to label, text, and test ids last.</li>
<li><code>fireEvent.click</code> triggers real handlers; <code>expect(…).toBe(…)</code> checks the result.</li>
<li>Each test renders its own fresh component, so tests never depend on each other.</li>
<li>Test behaviour users can see, not internal state or class names; a role query that fails often points to an accessibility problem.</li>
</ul>
`);

explain('f7',`
<h4>Polish that does a job</h4>
<p>Your app works, it is tested, and its data flows cleanly. This lesson is about the finishing touches that make it feel professional: <b>animation</b> and <b>charts</b>. Both are easy to overdo, so keep one question in mind throughout: does this help the user understand something, or is it just decoration?</p>
<p>Good animation has a purpose:</p>
<ul>
<li><b>Guide attention</b>: a new notification sliding in is noticed; one that just appears may be missed.</li>
<li><b>Show continuity</b>: a panel that slides open from a button shows where it came from and where it will go back to.</li>
<li><b>Give feedback</b>: a button that responds when pressed tells the user the click registered.</li>
</ul>
<p>Good charts have a purpose too: turning a column of numbers into a shape the eye understands in a second. "Visitors doubled between January and April" is hard to see in a table and obvious in a bar chart.</p>

<h4>Declarative animation with Motion</h4>
<p>You could animate by hand, changing a style a little on every frame with JavaScript timers. That is fiddly, and easy to make jerky. <b>Framer Motion</b> takes the same approach as React itself: you <b>declare</b> the start and the end, and the library works out every frame in between.</p>
<p>The library has recently been renamed <b>Motion</b>. New projects install the <code>motion</code> package and import from <code>motion/react</code>; this sandbox uses the older <code>framer-motion</code> name, and the code is the same either way.</p>
<pre class="snip">&lt;motion.h1
  initial={{ opacity: 0, y: -20 }}     // where it starts
  animate={{ opacity: 1, y: 0 }}       // where it ends up
  transition={{ duration: 0.4 }}       // how long: 0.4 seconds
&gt;
  Analytics
&lt;/motion.h1&gt;</pre>
<p>Piece by piece:</p>
<ul>
<li><code>motion.h1</code> is a special version of <code>&lt;h1&gt;</code> that can animate. There is one for every HTML tag: <code>motion.div</code>, <code>motion.button</code> and so on. Swap the tag name, and remember to change the closing tag too.</li>
<li><code>initial</code> is the state when the element first appears: fully transparent (<code>opacity: 0</code>) and 20 pixels higher than normal (<code>y: -20</code>).</li>
<li><code>animate</code> is the state to move to: fully visible, at its normal position.</li>
<li><code>transition</code> controls how: here, over 0.4 seconds.</li>
</ul>
<p>Why double curly braces? The outer pair switches JSX into JavaScript, as you learnt in the React lesson. The inner pair is a JavaScript object. So <code>initial={{ opacity: 0 }}</code> passes the object <code>{ opacity: 0 }</code> as the prop.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="Over 0.4 seconds opacity rises from 0 to 1 and the heading slides down from minus 20 to 0 pixels">
<path class="ln" d="M50 30v100h350"/>
<path class="ln-a" d="M50 128C100 50 220 40 400 38"/>
<text class="t-b t-a" x="400" y="62" text-anchor="end">opacity 0 to 1</text>

<g text-anchor="middle">
<rect class="bx" x="18" y="146" width="64" height="26" rx="4"/><text class="t-s" x="50" y="164">y: -20</text>
<rect class="bx-info" x="190" y="146" width="70" height="26" rx="4"/><text class="t-s" x="225" y="164">y: -3</text>
<rect class="bx-ok" x="368" y="146" width="50" height="26" rx="4"/><text class="t-s" x="393" y="164">y: 0</text>
</g>
<path class="ln-d" d="M84 159h104M262 159h104"/>
<text class="t-s" x="50" y="200" text-anchor="middle">0 s</text><text class="t-s" x="225" y="200" text-anchor="middle">0.2 s</text><text class="t-s" x="400" y="200" text-anchor="end">0.4 s</text>
</svg><figcaption>What the heading does over 0.4 seconds. Its opacity climbs from invisible to fully visible, quickly at first and gently at the end. At the same time it slides from 20 pixels above its place down to its normal position.</figcaption></figure>
<p>The motion is not a straight line: by default it starts quickly and slows gently at the end, which is called <b>easing</b>. Real objects do not start and stop instantly, so eased movement feels natural.</p>
<div class="tip"><b>Tip</b>Animate <code>opacity</code> and position or scale (which Motion applies as a CSS <code>transform</code>). Browsers can animate those very smoothly. Animating <code>width</code>, <code>height</code> or <code>margin</code> forces the browser to recalculate the layout of the page on every frame, which can stutter on slower phones. And keep it short: most interface animations last between about 0.15 and 0.4 seconds. Longer feels sluggish.</div>

<h4>Respecting reduced motion</h4>
<p>For some people, movement on screen is not just distracting but physically unpleasant. People with vestibular disorders, which affect the inner ear and balance, can get dizzy or nauseous from sliding and zooming effects. Every major operating system has a "reduce motion" setting, and browsers pass it on to websites.</p>
<p>You can read it in two ways:</p>
<pre class="snip">@media (prefers-reduced-motion: reduce) {
  * { animation: none; transition: none; }   /* CSS: switch off */
}

const reduce = useReducedMotion();   // Motion's hook: true or false</pre>
<p>With the hook you can, for example, keep the fade but drop the slide: start <code>y</code> at 0 when <code>reduce</code> is true. Respecting this setting is an accessibility requirement, not a nice extra. Fading is usually fine; large movement, zooming and parallax should go.</p>

<h4>Charts from components: Recharts</h4>
<p><b>Recharts</b> builds charts the React way: from components, fed by an array of data. Your data is an array of objects, one object per bar, which is exactly the shape you have been using all track:</p>
<pre class="snip">const data = [
  { month: 'Jan', visitors: 120 },
  { month: 'Feb', visitors: 210 },
];</pre>
<p>Then you compose the chart from parts:</p>
<pre class="snip">&lt;BarChart width={420} height={220} data={data}&gt;
  &lt;XAxis dataKey="month" /&gt;     // labels along the bottom
  &lt;YAxis /&gt;                     // number scale up the side
  &lt;Tooltip /&gt;                   // box with values on hover
  &lt;Bar dataKey="visitors" /&gt;    // one bar per object
&lt;/BarChart&gt;</pre>
<p>The key word is <code>dataKey</code>. It names which key of each object to use. <code>XAxis dataKey="month"</code> says "label each position with that object's month". <code>Bar dataKey="visitors"</code> says "make each bar as tall as that object's visitors". You never calculate a pixel height: <code>YAxis</code> works out a sensible scale from the largest value, and every bar is sized against it.</p>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="Each data object becomes one bar: month sets the label and visitors sets the height">
<rect class="bx-dark" x="10" y="20" width="170" height="130" rx="8"/>
<text class="t-term" x="20" y="46">month: 'Jan'</text><text class="t-term" x="20" y="66">visitors: 120</text>
<path class="ln-d" d="M20 80h150"/>
<text class="t-term" x="20" y="106">month: 'Feb'</text><text class="t-term" x="20" y="126">visitors: 210</text>
<path class="ln" d="M220 30v170h190"/>
<rect class="bx-a" x="250" y="132" width="50" height="68"/>
<rect class="bx-a" x="330" y="82" width="50" height="118"/>
<g text-anchor="middle"><text class="t" x="275" y="220">Jan</text><text class="t" x="355" y="220">Feb</text>
<text class="t-s" x="275" y="124">120</text><text class="t-s" x="355" y="74">210</text></g>
<path class="ln-ok" d="M180 60q40 0 70 90"/><polygon class="ah-ok" points="244,146 256,144 252,156"/>
<text class="t-s t-ok" x="95" y="176" text-anchor="middle">dataKey="visitors"</text>
<text class="t-s t-ok" x="95" y="196" text-anchor="middle">sets the height</text>
<text class="t-s" x="95" y="222" text-anchor="middle">dataKey="month": label</text>
</svg><figcaption>How Recharts reads the data. Each object becomes one bar. The month key, chosen by the XAxis dataKey, becomes the label underneath. The visitors key, chosen by the Bar dataKey, sets the bar's height, so 210 visitors makes a taller bar than 120.</figcaption></figure>
<p>Recharts draws with <b>SVG</b>, the same vector drawing format as the diagrams in these lessons, so charts stay sharp at any size. In a real app you would usually wrap the chart in Recharts' <code>ResponsiveContainer</code> so it fills its parent's width instead of a fixed 420 pixels.</p>

<h4>Data in, chart out</h4>
<p>Here is the payoff of everything you learnt about React. The chart is a function of its data, just like any component. Add an object to the array and the chart gains a bar; no drawing code changes. The tasks walk you through exactly that:</p>
<ol>
<li>Swap the <code>h1</code> for <code>motion.h1</code> with <code>initial</code> and <code>animate</code> props.</li>
<li>Render the bar chart. The starter data has only two months and the task wants four, so add March (180 visitors) and April (320) as two more objects.</li>
<li>Add May with 410 visitors and watch a fifth bar appear.</li>
</ol>
<p>Since <code>App</code> must return one outer element, wrap the heading and the chart together in a <code>&lt;main&gt;</code>.</p>
<p>Pick the chart type by the question it answers. <b>Bar charts</b> compare separate categories, such as visitors per month. <b>Line charts</b> show a trend over continuous time. Pie charts are hard to read beyond three or four slices; a bar chart is nearly always clearer.</p>
<div class="mistake"><b>Common mistake</b>A <code>dataKey</code> that does not match the data, such as <code>dataKey="visits"</code> when the objects say <code>visitors</code>. Recharts shows no error; it simply draws empty bars or no labels. Copy key names exactly, including capital letters.</div>
<div class="mistake"><b>Common mistake</b>Forgetting the outer braces in <code>animate={{ … }}</code>, writing <code>animate={ opacity: 1 }</code>. That is not a valid JavaScript expression, so the preview shows a syntax error. Props that take objects always have two pairs of braces.</div>
<p>Charts need words too. A screen reader cannot "see" a bar chart, so give the important finding in text nearby, such as a short sentence saying visitors more than tripled from January to May.</p>
<div class="try"><b>Try it in your head</b>Your data has five objects and the largest value is 410. How many bars appear, and which is tallest? Five bars, and May's is tallest because 410 is the largest visitors value. And a user has "reduce motion" switched on: what should happen to the sliding heading? Skip the slide and show it in place, perhaps with a quick fade.</div>

<h4>Recap</h4>
<ul>
<li>Animate with a purpose: guide attention, show continuity, give feedback. Keep it short.</li>
<li>Swap a tag for <code>motion.tag</code> and declare <code>initial</code>, <code>animate</code> and <code>transition</code>; Motion fills in the frames.</li>
<li>Prefer animating opacity and transforms, and honour <code>prefers-reduced-motion</code>.</li>
<li>Recharts composes charts from components fed by an array; <code>dataKey</code> picks which key labels or sizes each bar.</li>
<li>Change the data and React redraws the chart: the chart is a function of its data.</li>
</ul>
`);

explain('f9',`
<h4>Why look beyond React?</h4>
<p>React is the most common frontend library in job adverts, which is why most of this track uses it. But it is not the only good answer. <b>Vue</b> and <b>Svelte</b> are popular, well-supported alternatives, and you will meet them at companies, in open-source projects and in job listings, especially Vue in parts of Europe and Asia.</p>
<p>There is a second, bigger reason to look. Seeing the same ideas in a different syntax shows you which parts are <i>React</i> and which parts are simply <i>how frontend works</i>. Components, props, state, events and lists exist in all three. Once you can spot them, a new framework is a new accent, not a new language.</p>
<div class="tbl-wrap"><table><tr><th>Idea</th><th>React</th><th>Vue</th><th>Svelte 5</th></tr>
<tr><td>Show a value</td><td><code>{count}</code></td><td><code>{{ count }}</code></td><td><code>{count}</code></td></tr>
<tr><td>State</td><td><code>useState(0)</code></td><td><code>ref(0)</code></td><td><code>$state(0)</code></td></tr>
<tr><td>Click</td><td><code>onClick={…}</code></td><td><code>@click="…"</code></td><td><code>onclick={…}</code></td></tr>
<tr><td>List</td><td><code>items.map(…)</code></td><td><code>v-for</code></td><td><code>{#each}</code></td></tr>
<tr><td>Full-stack framework</td><td>Next.js</td><td>Nuxt</td><td>SvelteKit</td></tr></table></div>

<h4>A Vue app from the ground up</h4>
<p>Open the starter code. Vue splits a component into two parts: an HTML <b>template</b> that describes what to show, and JavaScript that provides the data. Here the template is the HTML inside <code>&lt;div id="app"&gt;</code>, and the script sets things up:</p>
<pre class="snip">const { createApp, ref } = Vue;

createApp({
  setup() {
    const title = ref('Frameworks');   // reactive state
    return { title };                   // expose to template
  },
}).mount('#app');                       // take over #app</pre>
<ol>
<li><code>createApp({ … })</code> creates a Vue application from a component definition.</li>
<li><code>setup()</code> runs once when the component starts. It creates the state and returns an object of everything the template is allowed to use. Forget to return something and the template cannot see it.</li>
<li><code>.mount('#app')</code> tells Vue to take control of the element with id <code>app</code>, read the template inside it, and keep it up to date.</li>
</ol>
<p>In the template, double curly braces show a value: <code>&lt;h1&gt;{{ title }}&lt;/h1&gt;</code>. That is called <b>interpolation</b>, and people often call the braces "mustaches".</p>

<h4>ref: a reactive box</h4>
<p><code>ref(0)</code> creates a <b>ref</b>: a small box holding a value, which Vue watches. In JavaScript you read and change the value through <code>.value</code>, as in <code>count.value++</code>. In the template, Vue unwraps it for you, so you just write <code>count</code>.</p>
<p>Here is the big difference from React. In React, when state changes, the whole component function runs again and React compares the old and new output. Vue instead records which components read which refs. When a ref changes, Vue knows exactly who depends on it and updates only those, and because Vue compiles your template ahead of time, it already knows which parts of the HTML can change, so the patch touches just them. This tracking is called <b>reactivity</b>, and it is finer-grained than React's approach. (Vue still uses a virtual DOM inside, as the quick reference notes, but it does far less comparing.)</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="React re-runs the whole component function on a state change; Vue updates only the template parts that read the changed ref">
<text class="t-b" x="105" y="20" text-anchor="middle">React</text><text class="t-b" x="315" y="20" text-anchor="middle">Vue</text>
<path class="ln-d" d="M210 10v210"/>
<rect class="bx-warn" x="20" y="34" width="170" height="36" rx="6"/><text class="t" x="105" y="58" text-anchor="middle">setCount(1)</text>
<path class="ln" d="M105 70v14"/><polygon class="ah" points="99,82 111,82 105,90"/>
<rect class="bx-a" x="20" y="92" width="170" height="60" rx="6"/><text class="t-b" x="105" y="116" text-anchor="middle">whole function</text><text class="t" x="105" y="138" text-anchor="middle">runs again</text>
<path class="ln" d="M105 152v14"/><polygon class="ah" points="99,164 111,164 105,172"/>
<rect class="bx-ok" x="20" y="174" width="170" height="40" rx="6"/><text class="t" x="105" y="199" text-anchor="middle">compare, patch DOM</text>
<rect class="bx-warn" x="230" y="34" width="170" height="36" rx="6"/><text class="t" x="315" y="58" text-anchor="middle">count++</text>
<path class="ln" d="M315 70v14"/><polygon class="ah" points="309,82 321,82 315,90"/>
<rect class="bx" x="230" y="92" width="170" height="122" rx="6"/>
<rect class="bx" x="244" y="104" width="142" height="28" rx="4"/><text class="t-m" x="256" y="123">h1: title</text>
<rect class="bx-ok" x="244" y="140" width="142" height="28" rx="4"/><text class="t-m" x="256" y="159">button: count</text>
<rect class="bx" x="244" y="176" width="142" height="28" rx="4"/><text class="t-m" x="256" y="195">ul: list</text>
</svg><figcaption>Two ways to react to a change. In React, calling the setter runs the whole component function again, and React compares the result with the previous one before patching the DOM. In Vue, changing count updates only what reads count, here the button text; the heading and the list are not touched.</figcaption></figure>
<p>Both approaches work well in practice. The point is to understand that "re-render everything and compare" and "track and update precisely" are two different designs for the same goal.</p>

<h4>Directives: special attributes in the template</h4>
<p>Vue adds behaviour to HTML through <b>directives</b>, attributes that start with <code>v-</code> or a shorthand symbol. Their values are JavaScript expressions.</p>
<p><b>Events with <code>@click</code>.</b> <code>@click</code> is short for <code>v-on:click</code>. Its value can be a small statement that runs on each click:</p>
<pre class="snip">&lt;button @click="count++"&gt;Clicked {{ count }} times&lt;/button&gt;</pre>
<p>For this to work, create <code>count</code> with <code>ref(0)</code> in <code>setup</code> and add it to the returned object. In the template, <code>count++</code> changes the ref's value directly, because Vue unwraps it.</p>
<p><b>Lists with <code>v-for</code>.</b> Put it on the element you want repeated:</p>
<pre class="snip">&lt;li v-for="fw in frameworks" :key="fw.name"&gt;{{ fw.name }}&lt;/li&gt;</pre>
<p>Read it as "one <code>li</code> for each <code>fw</code> in <code>frameworks</code>". The array lives in <code>setup</code> and must be returned like everything else. <code>:key</code> plays exactly the role <code>key</code> played in React's lists: a stable, unique identity for each item. The colon is short for <code>v-bind:</code>, which means "this attribute's value is a JavaScript expression, not plain text". Without the colon, every item's key would be the literal string <code>fw.name</code>.</p>
<p><b>Two-way binding with <code>v-model</code>.</b> In React, connecting an input to state takes a value prop and a change handler. Vue does both with one directive:</p>
<pre class="snip">&lt;input v-model="title"&gt;</pre>
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="v-model links an input and a ref both ways, and the heading reading the ref updates too">
<rect class="bx-info" x="20" y="60" width="120" height="44" rx="8"/><text class="t-m" x="80" y="87" text-anchor="middle">input</text>
<rect class="bx-warn" x="230" y="60" width="170" height="44" rx="8"/><text class="t-m" x="315" y="87" text-anchor="middle">title (ref)</text>
<path class="ln-a" d="M140 72h80"/><polygon class="ah-a" points="218,66 218,78 228,72"/>
<path class="ln-ok" d="M230 92h-80"/><polygon class="ah-ok" points="152,86 152,98 142,92"/>
<text class="t-s t-a" x="185" y="56" text-anchor="middle">typing</text>
<text class="t-s t-ok" x="185" y="124" text-anchor="middle">code change</text>
<path class="ln" d="M315 104v26"/><polygon class="ah" points="309,128 321,128 315,136"/>
<rect class="bx-ok" x="230" y="138" width="170" height="36" rx="8"/><text class="t-m" x="315" y="161" text-anchor="middle">h1 shows title</text>
<text class="t-s" x="80" y="30" text-anchor="middle">v-model links</text><text class="t-s" x="80" y="46" text-anchor="middle">both directions</text>
</svg><figcaption>v-model ties an input to a ref in both directions. Typing in the box updates title, and changing title in code updates the box. Because the heading also reads title, it changes as you type.</figcaption></figure>
<p>Typing updates <code>title</code>; changing <code>title</code> in code updates the box. Since the heading shows <code>{{ title }}</code>, it changes letter by letter as you type, which is exactly what the third task checks.</p>
<p>There are more directives you will meet soon: <code>v-if</code> shows an element only when a condition is true, like <code>&amp;&amp;</code> in JSX, and <code>:class</code> sets classes from an expression.</p>
<div class="mistake"><b>Common mistake</b>Creating state in <code>setup</code> but not returning it. The template then sees nothing, and Vue logs a warning that a property was accessed during render but is not defined. Every name the template uses must be in the object <code>setup</code> returns.</div>
<div class="mistake"><b>Common mistake</b>Writing <code>key="fw.name"</code> without the colon. That passes the text "fw.name" as every item's key. Remember: colon means "evaluate this as JavaScript".</div>

<h4>Svelte: the framework that compiles away</h4>
<p>React and Vue both ship a <b>runtime</b>: library code downloaded into the user's browser that does the work of tracking changes and updating the DOM. <b>Svelte</b> takes a different route. It is a <b>compiler</b>: a tool that runs on your computer when you build the app, reads your components, and turns them into plain JavaScript that updates exactly the right DOM nodes directly. There is no virtual DOM to compare, and much less framework code reaches the browser.</p>
<pre class="snip">&lt;script&gt;
  let count = $state(0);     // Svelte 5 "rune": reactive state
&lt;/script&gt;

&lt;button onclick={() =&gt; count++}&gt;Clicked {count} times&lt;/button&gt;</pre>
<p>A <code>.svelte</code> file looks like an HTML page: a script, your markup, and optionally a style block whose CSS only applies to that component. Since Svelte 5, reactive state is declared with <b>runes</b>, special compiler instructions that start with a dollar sign, such as <code>$state</code>. To the compiler, <code>count++</code> means "update the number in the button". Older Svelte code makes every top-level <code>let</code> reactive without a rune, so you will see both styles online.</p>
<p>The trade-offs: very small, fast output and code that feels close to plain HTML, against a smaller ecosystem and job market than React's.</p>

<h4>How to choose a framework</h4>
<p>Arguments online about the "best" framework generate a lot of heat. Professionals choose with practical questions:</p>
<ul>
<li><b>The team.</b> What does the team already know? Retraining costs months.</li>
<li><b>The ecosystem.</b> Are there mature libraries for what you need: forms, charts, UI kits, testing?</li>
<li><b>Hiring.</b> Can you find developers who know it? React has the largest pool.</li>
<li><b>The project.</b> A tiny widget on a slow phone network benefits from Svelte's small output. A huge app with many teams may benefit from React's size of ecosystem.</li>
</ul>
<p>Not GitHub stars, not novelty. And whichever you pick, the fundamentals you have learnt, components, one-way data flow, state, effects and accessible HTML, carry straight over.</p>
<div class="try"><b>Try it in your head</b>In Vue, <code>setup</code> returns <code>{ title }</code> but the template uses <code>{{ count }}</code>. What happens? count is undefined in the template, so nothing shows and Vue warns about it; count must be created with ref and returned. And what is the Vue equivalent of React's <code>items.map(i =&gt; &lt;li key={i.id}&gt;…)</code>? An <code>li</code> with <code>v-for="i in items"</code> and <code>:key="i.id"</code>.</div>

<h4>Recap</h4>
<ul>
<li>Components, props, state, events and lists exist in every framework; only the syntax differs.</li>
<li>Vue: <code>createApp</code> with a <code>setup</code> that returns state, mounted onto an element; <code>{{ }}</code> shows values.</li>
<li><code>ref()</code> is a reactive box; Vue updates only the template parts that read it.</li>
<li>Directives: <code>@click</code> for events, <code>v-for</code> with <code>:key</code> for lists, <code>v-model</code> for two-way input binding.</li>
<li>Svelte is a compiler: components become plain JavaScript with no virtual DOM shipped; Svelte 5 uses runes like <code>$state</code>.</li>
<li>Choose by team, ecosystem, hiring and project needs, not hype.</li>
</ul>
`);
