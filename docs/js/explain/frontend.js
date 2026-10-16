/* frontend: "Explained step by step" walkthroughs. */

explain('fb1',`
<p>Every web page you have ever opened, from Google to YouTube, is HTML underneath. Learn its few simple rules and you can put your own page on the internet.</p>

${V.card(1,'Tags and elements','labels around content',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="The element p Hello p: an opening tag, the content and a closing tag">
<rect class="bx-a" x="14" y="28" width="90" height="56" rx="8"/><text class="t-m" x="59" y="64" text-anchor="middle" style="font-size:22px">&lt;p&gt;</text>
<rect class="bx-ok" x="114" y="28" width="192" height="56" rx="8"/><text class="t" x="210" y="64" text-anchor="middle" style="font-size:22px">Hello!</text>
<rect class="bx-a" x="316" y="28" width="90" height="56" rx="8"/><text class="t-m" x="361" y="64" text-anchor="middle" style="font-size:22px">&lt;/p&gt;</text>
<text class="t-s" x="59" y="108" text-anchor="middle">opening tag</text><text class="t-s" x="210" y="108" text-anchor="middle">content</text><text class="t-s" x="361" y="108" text-anchor="middle">closing tag</text>
<path class="ln" d="M14 122V130H406V122"/>
<text class="t-b" x="210" y="156" text-anchor="middle">all three together = one element</text>
</svg><figcaption>A tag is a word inside angle brackets. The opening tag and the closing tag (with a slash) wrap the content like two slices of bread.</figcaption></figure>
${V.like(`<p>Labels on a parcel. The content is the thing inside; the tag says what kind of thing it is: "this is a heading", "this is a paragraph". The browser reads the labels and decides how to show each parcel.</p>`)}
${V.why(`<p>In 1989 to 1991 Tim Berners-Lee at CERN wanted scientists to share documents that linked to each other. He invented <b>HTML</b>, HyperText Markup Language. "Markup" comes from editors who marked up paper manuscripts with notes like "make this a heading". HTML does the same thing with tags.</p>`)}
${V.anat([[1,'&lt;h1&gt;'],[2,'Ada Lovelace'],[3,'&lt;/h1&gt;']],[
 '<b>Opening tag.</b> The tag name inside <code>&lt; &gt;</code>. <code>h1</code> means "the biggest heading".',
 '<b>Content.</b> What the reader actually sees.',
 '<b>Closing tag.</b> The same name with a slash: "the heading ends here".'])}
<p><b>Watch the browser read your file.</b> It goes from top to bottom, turning tags into things on the screen.</p>
${V.steps([
 ['The browser receives the file as plain text. Nothing is on the page yet.',`<svg viewBox="0 0 420 190" role="img" aria-label="HTML code on the left, an empty browser window on the right">
<rect class="bx-dark" x="6" y="8" width="220" height="168" rx="8"/>
<text class="t-term" x="28" y="36" style="font-size:14px">&lt;h1&gt;Ada&lt;/h1&gt;</text>
<text class="t-term" x="28" y="62" style="font-size:14px">&lt;p&gt;I like maths.&lt;/p&gt;</text>
<text class="t-term" x="28" y="88" style="font-size:14px">&lt;ul&gt;</text>
<text class="t-term" x="46" y="114" style="font-size:14px">&lt;li&gt;Tea&lt;/li&gt;</text>
<text class="t-term" x="46" y="140" style="font-size:14px">&lt;li&gt;Cake&lt;/li&gt;</text>
<text class="t-term" x="28" y="166" style="font-size:14px">&lt;/ul&gt;</text>
<rect class="bx" x="238" y="8" width="176" height="168" rx="8"/><path class="ln" d="M238 30H414"/>
<circle class="dot-m" cx="252" cy="19" r="4"/><circle class="dot-m" cx="266" cy="19" r="4"/><circle class="dot-m" cx="280" cy="19" r="4"/>
${V.ic('globe',300,70,56,'ic-info')}
</svg>`],
 ['<b>&amp;lt;h1&amp;gt;</b> means "biggest heading", so <b>Ada</b> appears large and bold. The tags themselves are never shown.',`<svg viewBox="0 0 420 190" role="img" aria-label="The h1 line turns into a big heading Ada">
<rect class="bx-dark" x="6" y="8" width="220" height="168" rx="8"/>
<text class="t-a" x="12" y="36" style="font-size:13px">&#9654;</text>
<text class="t-term" x="28" y="36" style="font-size:14px">&lt;h1&gt;Ada&lt;/h1&gt;</text>
<text class="t-term t-dim" x="28" y="62" style="font-size:14px">&lt;p&gt;I like maths.&lt;/p&gt;</text>
<text class="t-term t-dim" x="28" y="88" style="font-size:14px">&lt;ul&gt;</text>
<text class="t-term t-dim" x="46" y="114" style="font-size:14px">&lt;li&gt;Tea&lt;/li&gt;</text>
<text class="t-term t-dim" x="46" y="140" style="font-size:14px">&lt;li&gt;Cake&lt;/li&gt;</text>
<text class="t-term t-dim" x="28" y="166" style="font-size:14px">&lt;/ul&gt;</text>
<rect class="bx" x="238" y="8" width="176" height="168" rx="8"/><path class="ln" d="M238 30H414"/>
<circle class="dot-m" cx="252" cy="19" r="4"/><circle class="dot-m" cx="266" cy="19" r="4"/><circle class="dot-m" cx="280" cy="19" r="4"/>
<rect class="bx-hl" x="246" y="40" width="160" height="38" rx="5"/><text class="t-b" x="254" y="70" style="font-size:26px">Ada</text>
</svg>`],
 ['<b>&amp;lt;p&amp;gt;</b> is a paragraph: normal text, with space above and below it.',`<svg viewBox="0 0 420 190" role="img" aria-label="The p line turns into a paragraph">
<rect class="bx-dark" x="6" y="8" width="220" height="168" rx="8"/>
<text class="t-term t-dim" x="28" y="36" style="font-size:14px">&lt;h1&gt;Ada&lt;/h1&gt;</text>
<text class="t-a" x="12" y="62" style="font-size:13px">&#9654;</text>
<text class="t-term" x="28" y="62" style="font-size:14px">&lt;p&gt;I like maths.&lt;/p&gt;</text>
<text class="t-term t-dim" x="28" y="88" style="font-size:14px">&lt;ul&gt;</text>
<text class="t-term t-dim" x="46" y="114" style="font-size:14px">&lt;li&gt;Tea&lt;/li&gt;</text>
<text class="t-term t-dim" x="46" y="140" style="font-size:14px">&lt;li&gt;Cake&lt;/li&gt;</text>
<text class="t-term t-dim" x="28" y="166" style="font-size:14px">&lt;/ul&gt;</text>
<rect class="bx" x="238" y="8" width="176" height="168" rx="8"/><path class="ln" d="M238 30H414"/>
<circle class="dot-m" cx="252" cy="19" r="4"/><circle class="dot-m" cx="266" cy="19" r="4"/><circle class="dot-m" cx="280" cy="19" r="4"/>
<text class="t-b" x="254" y="70" style="font-size:26px">Ada</text>
<rect class="bx-hl" x="246" y="84" width="160" height="30" rx="5"/><text class="t" x="254" y="104">I like maths.</text>
</svg>`],
 ['<b>&amp;lt;ul&amp;gt;</b> starts a bulleted list, and each <b>&amp;lt;li&amp;gt;</b> inside it becomes one bullet point. The page is done.',`<svg viewBox="0 0 420 190" role="img" aria-label="The list turns into two bullet points, Tea and Cake">
<rect class="bx-dark" x="6" y="8" width="220" height="168" rx="8"/>
<text class="t-term t-dim" x="28" y="36" style="font-size:14px">&lt;h1&gt;Ada&lt;/h1&gt;</text>
<text class="t-term t-dim" x="28" y="62" style="font-size:14px">&lt;p&gt;I like maths.&lt;/p&gt;</text>
<text class="t-a" x="12" y="88" style="font-size:13px">&#9654;</text>
<text class="t-term" x="28" y="88" style="font-size:14px">&lt;ul&gt;</text>
<text class="t-term" x="46" y="114" style="font-size:14px">&lt;li&gt;Tea&lt;/li&gt;</text>
<text class="t-term" x="46" y="140" style="font-size:14px">&lt;li&gt;Cake&lt;/li&gt;</text>
<text class="t-term" x="28" y="166" style="font-size:14px">&lt;/ul&gt;</text>
<rect class="bx" x="238" y="8" width="176" height="168" rx="8"/><path class="ln" d="M238 30H414"/>
<circle class="dot-m" cx="252" cy="19" r="4"/><circle class="dot-m" cx="266" cy="19" r="4"/><circle class="dot-m" cx="280" cy="19" r="4"/>
<text class="t-b" x="254" y="70" style="font-size:26px">Ada</text>
<text class="t" x="254" y="104">I like maths.</text>
<rect class="bx-hl" x="246" y="118" width="160" height="52" rx="5"/>
<circle class="dot-m" cx="262" cy="138" r="3.5"/><text class="t" x="274" y="143">Tea</text>
<circle class="dot-m" cx="262" cy="160" r="3.5"/><text class="t" x="274" y="165">Cake</text>
</svg>`]])}
${V.rules(V.rh('Rules: break one and the page goes wrong'),
 V.no('&lt;p&gt;Hello','Forgot the closing tag: the paragraph swallows what comes next'),V.ok('&lt;p&gt;Hello&lt;/p&gt;','Every opened tag gets closed'),
 V.no('&lt;p&gt;Hi&lt;p&gt;','The closing tag needs its slash: &lt;/p&gt;'),V.ok('&lt;img ...&gt;','A few tags, like img, have no closing tag'),
 V.rh('Conventions'),
 V.ok('&lt;h1&gt; not &lt;H1&gt;','Write tag names in lowercase'),V.ok('one &lt;h1&gt; per page','The main title. Use h2 to h6 for smaller headings'))}
${V.hook(`Open it, fill it, close it: <code>&lt;tag&gt;</code> content <code>&lt;/tag&gt;</code>. The slash means "the end".`)}
`)}

${V.card(2,'Nesting','boxes inside boxes',`
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Nested boxes: html contains body, body contains h1, p and ul, and ul contains three li items">
<rect class="bx" x="6" y="6" width="408" height="198" rx="10"/><text class="t-m" x="18" y="26">html</text>
<rect class="bx-info" x="18" y="34" width="384" height="162" rx="8"/><text class="t-m" x="30" y="54">body</text>
<rect class="bx-a" x="30" y="62" width="120" height="46" rx="6"/><text class="t-m" x="90" y="91" text-anchor="middle">h1</text>
<rect class="bx-a" x="30" y="118" width="120" height="66" rx="6"/><text class="t-m" x="90" y="156" text-anchor="middle">p</text>
<rect class="bx-ok" x="164" y="62" width="226" height="122" rx="6"/><text class="t-m" x="176" y="84">ul</text>
<rect class="bx" x="200" y="70" width="178" height="30" rx="5"/><text class="t-m" x="289" y="90" text-anchor="middle">li</text>
<rect class="bx" x="200" y="108" width="178" height="30" rx="5"/><text class="t-m" x="289" y="128" text-anchor="middle">li</text>
<rect class="bx" x="200" y="146" width="178" height="30" rx="5"/><text class="t-m" x="289" y="166" text-anchor="middle">li</text>
</svg><figcaption>A page is boxes inside boxes. html holds everything. body holds what you see. The list ul holds its items li.</figcaption></figure>
${V.like(`<p>Russian dolls, or folders inside folders on your computer. Each box sits <b>completely</b> inside the one around it. The outer box is the <b>parent</b>, the boxes inside are its <b>children</b>.</p>`)}
${V.why(`<p>The browser needs to know what belongs to what. A list item on its own means nothing; inside a list it becomes a bullet. Nesting gives the page a clear shape, and later CSS and JavaScript use that shape to find things.</p>`)}
${V.rules(V.rh('Rules'),
 V.no('&lt;b&gt;&lt;i&gt;Hi&lt;/b&gt;&lt;/i&gt;','Crossed boxes: the inner one must close first'),V.ok('&lt;b&gt;&lt;i&gt;Hi&lt;/i&gt;&lt;/b&gt;','Last opened, first closed'),
 V.no('&lt;li&gt; on its own','An li always lives inside a ul (or an ol)'),V.ok('content inside &lt;body&gt;','Everything the reader sees goes in body'),
 V.rh('Conventions'),
 V.ok('indent children','Two spaces per level, so you can see the boxes in the code'))}
${V.hook(`Last opened, first closed. Children live inside their parent.`)}
`)}

${V.card(3,'Attributes: links and images','extra details inside the opening tag',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="A link points to an address with href. An image shows a picture and its alt text is read aloud">
<text class="t-info" x="24" y="40" style="font-size:20px;font-weight:700">Visit MDN</text><path class="ln-a" d="M24 47H124"/>
<path class="ln-a" d="M74 56V92"/><polygon class="ah-a" points="67,90 81,90 74,102"/>
${V.ic('globe',46,104,56,'ic-info')}
<text class="t-s" x="24" y="176">href = where it goes</text>
<rect class="bx" x="230" y="12" width="176" height="96" rx="6"/>
<path class="bx-ok" d="M238 100 284 56 316 82 340 64 398 100Z"/><circle class="dot" cx="372" cy="36" r="11"/>
${V.ic('chat',230,120,40,'ic-info')}
<text class="t" x="278" y="138">"Sunset over hills"</text>
<text class="t-s" x="278" y="160">alt, read aloud</text>
</svg><figcaption>Attributes add details. A link needs an address (href). An image needs a file (src) and a description (alt) for anyone who cannot see it.</figcaption></figure>
${V.like(`<p>An attribute is like a sticker on the parcel with extra details: "deliver to this address", "fragile". A link is a signpost: the words are what you read, <b>href</b> is where it takes you.</p>`)}
${V.why(`<p>Some tags cannot do their job with content alone. A link must know its destination. An image is not text at all, so it needs a file to load and words that describe it. Blind people use <b>screen readers</b>, programs that read the page aloud. Without <b>alt</b> they hear nothing useful.</p>`)}
${V.anat([[1,'&lt;img'],' ',[2,'src'],[3,'="sunset.jpg"'],' ',[4,'alt="Sunset over hills"'],[5,'&gt;']],[
 '<b>Tag name.</b> img means image.',
 '<b>Attribute name.</b> src is short for source: which file to show.',
 '<b>Value.</b> Always in double quotes, joined to the name with <code>=</code>.',
 '<b>alt text.</b> Says what the picture shows, in a few words.',
 '<b>No closing tag.</b> An image has no content to wrap, so <code>&lt;/img&gt;</code> does not exist.'])}
<p><b>Watch what alt does</b> when things go wrong, and when someone cannot see the screen.</p>
${V.steps([
 ['The picture loads. Most visitors never see the alt text at all.',`<svg viewBox="0 0 420 170" role="img" aria-label="The image loads normally">
<rect class="bx" x="20" y="14" width="180" height="130" rx="6"/>
<path class="bx-ok" d="M28 136 82 76 122 112 150 92 192 136Z"/><circle class="dot" cx="166" cy="42" r="13"/>
${V.ic('check',226,30,40,'ic-ok')}<text class="t-b" x="276" y="56">Picture loads</text>
<text class="t-s" x="226" y="100">alt="Sunset over hills"</text><text class="t-s" x="226" y="122">is there, but hidden</text>
</svg>`],
 ['The file is missing or the internet is slow. The browser shows the <b>alt text</b> instead, so the reader still knows what belongs there.',`<svg viewBox="0 0 420 170" role="img" aria-label="The image fails and the alt text is shown instead">
<rect class="bx-bad" x="20" y="14" width="180" height="130" rx="6"/>
${V.ic('cross',34,24,30,'ic-bad')}<text class="t" x="34" y="92">Sunset over hills</text>
${V.ic('warn',226,30,40,'ic-warn')}<text class="t-b" x="276" y="56">File missing</text>
<text class="t-s" x="226" y="100">The browser shows</text><text class="t-s" x="226" y="122">the alt text instead</text>
</svg>`],
 ['A blind visitor uses a screen reader. When it reaches the image it says <b>"image, Sunset over hills"</b> out loud.',`<svg viewBox="0 0 420 170" role="img" aria-label="A screen reader reads the alt text aloud">
<rect class="bx" x="20" y="14" width="180" height="130" rx="6"/>
<path class="bx-ok" d="M28 136 82 76 122 112 150 92 192 136Z"/><circle class="dot" cx="166" cy="42" r="13"/>
${V.ic('person',226,20,48,'ic-info')}${V.ic('chat',280,24,40,'ic-info')}
<text class="t-b" x="226" y="100">"image, Sunset</text><text class="t-b" x="226" y="124">over hills"</text>
</svg>`],
 ['A lazy alt like the file name helps nobody. The screen reader says <b>"IMG_0412.jpg"</b>. Describe what the picture shows instead.',`<svg viewBox="0 0 420 170" role="img" aria-label="A bad alt text, the file name, is read aloud and is useless">
<rect class="bx" x="20" y="14" width="180" height="130" rx="6"/>
<path class="bx-ok" d="M28 136 82 76 122 112 150 92 192 136Z"/><circle class="dot" cx="166" cy="42" r="13"/>
${V.ic('person',226,20,48,'ic-info')}${V.ic('cross',280,26,36,'ic-bad')}
<text class="t-b t-bad" x="226" y="100">"IMG_0412.jpg"</text><text class="t-s" x="226" y="124">Tells them nothing</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('href="https://example.com"','Links to other sites start with https://'),V.no('href="www.example.com"','Without https:// the browser looks for a file on your own site'),
 V.no('src=cat.jpg alt=my cat','Values go in quotes, or spaces break them'),V.ok('&lt;a href="..."&gt;Visit&lt;/a&gt;','The link text goes between the tags'),
 V.rh('Conventions'),
 V.ok('alt="Girl reading a book"','Describe what it shows, briefly'),V.no('alt="image"','The reader already knows it is an image'),
 V.no('&lt;a&gt;Click here&lt;/a&gt;','Say where it goes: "Read the MDN guide"'))}
${V.build(`<ol><li>Inside <code>&lt;body&gt;</code>, add an <code>h1</code> with your name.</li><li>Below it, a <code>p</code> with a sentence about you.</li><li>Add an <code>a</code> whose <code>href</code> is a full address starting <code>https://</code>, with link text between the tags.</li><li>Add a <code>ul</code> and put three <code>li</code> items inside it.</li><li>Add an <code>img</code> with a picture address in <code>src</code> and a real description in <code>alt</code>. Press Run.</li></ol>`)}
${V.hook(`Name="value" in the opening tag. href says where, src says which file, alt says what it shows.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What is wrong with <code>&lt;h1&gt;Hi&lt;h1&gt;</code>? <i>The second tag needs a slash: &lt;/h1&gt;.</i> 2. Where must an <code>li</code> live? <i>Inside a ul (or ol).</i> 3. Who hears the alt text? <i>Screen-reader users, and everyone sees it if the image fails.</i></div>
`);

explain('fb2',`
<p>HTML decides what is on the page. CSS decides how it looks. The same HTML can look like a plain school report or a slick shop, just by changing the CSS.</p>

${V.card(1,'A CSS rule','who to style, and how',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="An instruction card says h1, colour navy. The browser paints every h1 on the page">
<rect class="bx-warn" x="10" y="20" width="182" height="124" rx="10"/>
<text class="t-m" x="24" y="52" style="font-size:16px">h1 {</text>
<text class="t-m" x="40" y="80" style="font-size:14px">color: navy;</text>
<text class="t-m" x="40" y="106" style="font-size:14px">font-size: 40px;</text>
<text class="t-m" x="24" y="132" style="font-size:16px">}</text>
<path class="ln-a" d="M198 82H234"/><polygon class="ah-a" points="232,75 232,89 244,82"/>
<rect class="bx" x="250" y="10" width="162" height="150" rx="8"/>
<text class="t-b t-info" x="262" y="48" style="font-size:22px">Heading</text>
<path class="ln" d="M262 64H398M262 78H380"/>
<text class="t-b t-info" x="262" y="114" style="font-size:22px">Heading</text>
<path class="ln" d="M262 130H398M262 144H372"/>
</svg><figcaption>One rule, many matches. The rule names which elements (every h1) and what to change. The browser applies it to all of them at once.</figcaption></figure>
${V.like(`<p>A note for a decorator: "<b>All front doors</b>: paint them navy and make them taller." The first part says which things, the rest says what to do to them.</p>`)}
${V.why(`<p>In the early web, people styled each heading by hand with <code>&lt;font&gt;</code> tags. Changing the colour of a site meant editing every page. In 1994 Håkon Wium Lie proposed <b>CSS</b>, Cascading Style Sheets, and the first version became a standard in 1996. Now one rule restyles every match on every page.</p>`)}
${V.anat([[1,'h1'],' ',[2,'{'],' ',[3,'color'],[4,':'],' ',[5,'navy'],[6,';'],' ',[2,'}']],[
 '<b>Selector.</b> Which elements to style. Here: every <code>&lt;h1&gt;</code>.',
 '<b>Curly braces.</b> Hold the list of changes for those elements.',
 '<b>Property.</b> What to change: <code>color</code> (text colour), <code>font-size</code>, <code>padding</code>...',
 '<b>Colon.</b> Joins the property to its value.',
 '<b>Value.</b> The new setting.',
 '<b>Semicolon.</b> Ends one declaration (property + value). Never skip it.'])}
<p><b>Watch one missing semicolon break two lines.</b></p>
${V.steps([
 ['Both declarations end with a semicolon. The heading turns navy and big.',`<svg viewBox="0 0 420 170" role="img" aria-label="Correct rule: heading is navy and large">
<rect class="bx-dark" x="6" y="8" width="250" height="124" rx="8"/>
<text class="t-term" x="20" y="36" style="font-size:15px">h1 {</text>
<text class="t-term" x="38" y="64" style="font-size:15px">color: navy;</text>
<text class="t-term" x="38" y="92" style="font-size:15px">font-size: 40px;</text>
<text class="t-term" x="20" y="120" style="font-size:15px">}</text>
<rect class="bx" x="268" y="8" width="146" height="124" rx="8"/>
<text class="t-b t-info" x="341" y="84" text-anchor="middle" style="font-size:34px">Title</text>
${V.ic('check',10,140,24,'ic-ok')}<text class="t" x="40" y="158">Both declarations work</text>
</svg>`],
 ['Someone deletes the semicolon after <b>navy</b>. The browser keeps reading and treats lines 2 and 3 as <b>one</b> long value: "navy font-size: 40px".',`<svg viewBox="0 0 420 170" role="img" aria-label="Missing semicolon: two lines read as one value">
<rect class="bx-dark" x="6" y="8" width="250" height="124" rx="8"/>
<text class="t-term" x="20" y="36" style="font-size:15px">h1 {</text>
<rect class="bx-bad" x="30" y="46" width="216" height="56" rx="5"/>
<text class="t-m" x="38" y="64" style="font-size:15px">color: navy</text>
<text class="t-m" x="38" y="92" style="font-size:15px">font-size: 40px;</text>
<text class="t-bad" x="140" y="66" style="font-size:20px;font-weight:700">?</text>
<text class="t-term" x="20" y="120" style="font-size:15px">}</text>
<rect class="bx" x="268" y="8" width="146" height="124" rx="8"/>
<text class="t-s" x="341" y="76" text-anchor="middle">reading...</text>
${V.ic('warn',10,140,24,'ic-warn')}<text class="t" x="40" y="158">Lines 2 and 3 become one value</text>
</svg>`],
 ['That is not a real colour, so the browser silently throws the whole declaration away. Both settings are lost, and there is no error message to warn you.',`<svg viewBox="0 0 420 170" role="img" aria-label="Both declarations dropped: heading stays black and small">
<rect class="bx-dark" x="6" y="8" width="250" height="124" rx="8"/>
<text class="t-term" x="20" y="36" style="font-size:15px">h1 {</text>
<text class="t-term t-dim" x="38" y="64" style="font-size:15px">color: navy</text>
<text class="t-term t-dim" x="38" y="92" style="font-size:15px">font-size: 40px;</text>
<path class="ln-x" d="M34 59H150M34 87H186"/>
<text class="t-term" x="20" y="120" style="font-size:15px">}</text>
<rect class="bx" x="268" y="8" width="146" height="124" rx="8"/>
<text class="t-b" x="341" y="78" text-anchor="middle" style="font-size:20px">Title</text>
${V.ic('cross',10,140,24,'ic-bad')}<text class="t t-bad" x="40" y="158">Both lost, no error shown</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('color navy;','Missing colon: ignored'),V.no('color: navy','Missing semicolon: breaks the next line too'),
 V.no('font-size: 40 px;','No space between a number and its unit'),V.ok('margin: 0;','Zero needs no unit'),
 V.rh('Conventions'),
 V.ok('one declaration per line','Easy to read and easy to spot a missing ;'))}
${V.hook(`Who, then how: <code>selector { property: value; }</code>. Every line ends with a semicolon.`)}
`)}

${V.card(2,'Selectors','tag, class or id',`
<figure class="fig"><svg viewBox="0 0 420 175" role="img" aria-label="Three kinds of selector: a tag picks every element of a kind, a class picks a team, an id picks one person">
${V.ic('people',30,8,76,'ic-a')}${V.ic('tag',172,12,72,'ic-ok')}${V.ic('person',314,8,76,'ic-info')}
<text class="t-m" x="68" y="112" text-anchor="middle" style="font-size:22px">p</text>
<text class="t-m" x="208" y="112" text-anchor="middle" style="font-size:22px">.card</text>
<text class="t-m" x="352" y="112" text-anchor="middle" style="font-size:22px">#buy</text>
<text class="t-s" x="68" y="140" text-anchor="middle">every &lt;p&gt;</text>
<text class="t-s" x="208" y="140" text-anchor="middle">every element with</text><text class="t-s" x="208" y="158" text-anchor="middle">class="card"</text>
<text class="t-s" x="352" y="140" text-anchor="middle">the one element</text><text class="t-s" x="352" y="158" text-anchor="middle">with id="buy"</text>
</svg><figcaption>A tag selector is a word, a class selector starts with a dot, and an id selector starts with a hash.</figcaption></figure>
${V.like(`<p>A school assembly. "<b>Everyone</b> in Year 9, stand up" is a tag. "Everyone in the <b>football team</b>, stand up" is a class: a group you choose to join, and anyone can be in it. "<b>Sam Patel</b>, stand up" is an id: exactly one person.</p>`)}
<p><b>Watch each selector find its matches</b> on this small page.</p>
${V.steps([
 ['The selector <b>p</b> matches every paragraph, whatever its class.',`<svg viewBox="0 0 420 195" role="img" aria-label="Selector p matches the two p elements">
<rect class="bx" x="10" y="10" width="250" height="30" rx="5"/><text class="t-m" x="22" y="31" style="font-size:14px">&lt;h1&gt;</text>
<rect class="bx-hl" x="10" y="46" width="250" height="30" rx="5"/><text class="t-m" x="22" y="67" style="font-size:14px">&lt;p&gt;</text>
<rect class="bx-hl" x="10" y="82" width="250" height="30" rx="5"/><text class="t-m" x="22" y="103" style="font-size:14px">&lt;p class="card"&gt;</text>
<rect class="bx" x="10" y="118" width="250" height="30" rx="5"/><text class="t-m" x="22" y="139" style="font-size:14px">&lt;div class="card"&gt;</text>
<rect class="bx" x="10" y="154" width="250" height="30" rx="5"/><text class="t-m" x="22" y="175" style="font-size:14px">&lt;button id="buy"&gt;</text>
<text class="t-m t-a" x="290" y="90" style="font-size:30px">p</text><text class="t-s" x="290" y="120">2 matches</text>
</svg>`],
 ['<b>.card</b> matches any element with class="card", whether it is a p, a div or anything else.',`<svg viewBox="0 0 420 195" role="img" aria-label="Selector .card matches the two elements with class card">
<rect class="bx" x="10" y="10" width="250" height="30" rx="5"/><text class="t-m" x="22" y="31" style="font-size:14px">&lt;h1&gt;</text>
<rect class="bx" x="10" y="46" width="250" height="30" rx="5"/><text class="t-m" x="22" y="67" style="font-size:14px">&lt;p&gt;</text>
<rect class="bx-hl" x="10" y="82" width="250" height="30" rx="5"/><text class="t-m" x="22" y="103" style="font-size:14px">&lt;p class="card"&gt;</text>
<rect class="bx-hl" x="10" y="118" width="250" height="30" rx="5"/><text class="t-m" x="22" y="139" style="font-size:14px">&lt;div class="card"&gt;</text>
<rect class="bx" x="10" y="154" width="250" height="30" rx="5"/><text class="t-m" x="22" y="175" style="font-size:14px">&lt;button id="buy"&gt;</text>
<text class="t-m t-a" x="290" y="90" style="font-size:30px">.card</text><text class="t-s" x="290" y="120">2 matches</text>
</svg>`],
 ['<b>#buy</b> matches the single element with id="buy". An id must be unique on the page.',`<svg viewBox="0 0 420 195" role="img" aria-label="Selector #buy matches the button">
<rect class="bx" x="10" y="10" width="250" height="30" rx="5"/><text class="t-m" x="22" y="31" style="font-size:14px">&lt;h1&gt;</text>
<rect class="bx" x="10" y="46" width="250" height="30" rx="5"/><text class="t-m" x="22" y="67" style="font-size:14px">&lt;p&gt;</text>
<rect class="bx" x="10" y="82" width="250" height="30" rx="5"/><text class="t-m" x="22" y="103" style="font-size:14px">&lt;p class="card"&gt;</text>
<rect class="bx" x="10" y="118" width="250" height="30" rx="5"/><text class="t-m" x="22" y="139" style="font-size:14px">&lt;div class="card"&gt;</text>
<rect class="bx-hl" x="10" y="154" width="250" height="30" rx="5"/><text class="t-m" x="22" y="175" style="font-size:14px">&lt;button id="buy"&gt;</text>
<text class="t-m t-a" x="290" y="90" style="font-size:30px">#buy</text><text class="t-s" x="290" y="120">1 match</text>
</svg>`],
 ['A clash: <b>p</b> says grey, <b>.card</b> says green. Both match the third line. The more <b>specific</b> selector wins, so it turns green. If two are equally specific, the one written later wins.',`<svg viewBox="0 0 420 195" role="img" aria-label="p and .card both match; the class wins">
<rect class="bx" x="10" y="10" width="250" height="30" rx="5"/><text class="t-m" x="22" y="31" style="font-size:14px">&lt;h1&gt;</text>
<rect class="bx" x="10" y="46" width="250" height="30" rx="5"/><text class="t-m" x="22" y="67" style="font-size:14px">&lt;p&gt;</text>
<rect class="bx-ok" x="10" y="82" width="250" height="30" rx="5"/><text class="t-m" x="22" y="103" style="font-size:14px">&lt;p class="card"&gt;</text>
<rect class="bx" x="10" y="118" width="250" height="30" rx="5"/><text class="t-m" x="22" y="139" style="font-size:14px">&lt;div class="card"&gt;</text>
<rect class="bx" x="10" y="154" width="250" height="30" rx="5"/><text class="t-m" x="22" y="175" style="font-size:14px">&lt;button id="buy"&gt;</text>
<text class="t-m t-dim" x="276" y="40" style="font-size:14px">p: grey</text><path class="ln-x" d="M274 35H344"/>
<text class="t-m" x="276" y="68" style="font-size:14px">.card: green</text>
<text class="t-b t-ok" x="276" y="104">.card wins</text>
<text class="t-s" x="276" y="140">id beats class</text><text class="t-s" x="276" y="160">class beats tag</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('class="card"','In HTML: no dot'),V.ok('.card { }','In CSS: a dot means class'),
 V.no('class=".card"','A dot in the HTML is wrong'),V.no('two id="buy"','An id must appear only once per page'),
 V.rh('Conventions'),
 V.ok('.price-tag','Lowercase words joined with hyphens'),V.ok('style with classes','Most of your CSS should use classes; keep ids for one-offs'))}
${V.hook(`Word for a kind, dot for a team, hash for one. Id beats class beats tag.`)}
`)}

${V.card(3,'Colours and fonts','three ways to say one colour',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="Three paint tins labelled navy, #000080 and rgb(0, 0, 128) all hold the same colour">
${V.ic('jar',30,8,80,'ic-info')}${V.ic('jar',170,8,80,'ic-info')}${V.ic('jar',310,8,80,'ic-info')}
<text class="t-m" x="70" y="118" text-anchor="middle" style="font-size:17px">navy</text>
<text class="t-m" x="210" y="118" text-anchor="middle" style="font-size:17px">#000080</text>
<text class="t-m" x="350" y="118" text-anchor="middle" style="font-size:15px">rgb(0, 0, 128)</text>
<text class="t-s" x="210" y="148" text-anchor="middle">three labels, the same paint</text>
</svg><figcaption>A colour can be a name, a hex code or an rgb() value. These three are exactly the same navy.</figcaption></figure>
${V.like(`<p>Mixing light. Every screen colour is a mix of <b>red</b>, <b>green</b> and <b>blue</b> light, each from 0 (off) to 255 (full). A hex code is just those three amounts written in base 16.</p>`)}
${V.anat([[1,'#'],[2,'00'],[3,'00'],[4,'80']],[
 '<b>Hash.</b> Says "this is a hex colour".',
 '<b>Red.</b> Two digits from <code>00</code> (none) to <code>ff</code> (full). Digits go 0 to 9, then a to f.',
 '<b>Green.</b> Same scale.',
 '<b>Blue.</b> <code>80</code> is 128, about half. So this is a darkish blue.'])}
${V.rules(V.rh('Rules'),
 V.ok('color','Colour of the text'),V.ok('background','Colour behind it'),
 V.no('colour: red;','CSS uses American spelling: color'),V.no('#00080','Five digits is not a colour: use six (or the short three)'),
 V.rh('Conventions'),
 V.ok('font-family: system-ui, sans-serif;','A list: use the device font, and if it is missing, any clean sans-serif'))}
${V.hook(`Red, green, blue, two digits each. And always spell it <code>color</code>.`)}
`)}

${V.card(4,'The box model','every element is a framed picture',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="Box model like a framed picture: content in the middle, padding around it, then the border, then margin outside">
<rect class="ln-d" x="10" y="10" width="230" height="170" rx="4"/>
<rect class="bx-a" x="34" y="32" width="182" height="126" rx="3" style="stroke-width:6"/>
<rect class="bx-ok" x="74" y="62" width="102" height="58" rx="4"/><text class="t-b" x="125" y="96" text-anchor="middle">content</text>
<path class="ln" d="M256 22H230M256 58H216M256 92H170M256 140H150"/>
<text class="t-b" x="262" y="27">margin</text><text class="t-s" x="262" y="44">outside the frame</text>
<text class="t-b" x="262" y="63">border</text>
<text class="t-b" x="262" y="97">content</text>
<text class="t-b" x="262" y="145">padding</text><text class="t-s" x="262" y="162">inside the frame</text>
</svg><figcaption>From the inside out: the content, then padding, then the border, then margin. Padding is inside the frame; margin is the empty wall around it.</figcaption></figure>
${V.like(`<p>A framed picture on a wall. The <b>content</b> is the photo. The <b>padding</b> is the white card mount around it. The <b>border</b> is the frame. The <b>margin</b> is the empty wall that keeps other pictures from touching it.</p>`)}
${V.why(`<p>Browsers need a simple, predictable way to lay out thousands of elements. Treating each one as a rectangle with four layers means every element, from a button to a whole section, follows the same rules.</p>`)}
${V.anat([[1,'.card'],' {\n  ',[2,'padding: 12px;'],'\n  ',[3,'border: 3px dashed #333;'],'\n  ',[4,'margin-bottom: 20px;'],'\n}'],[
 '<b>Selector.</b> Every element with class="card".',
 '<b>Padding.</b> One value sets all four sides inside the border.',
 '<b>Border.</b> Width, style (solid, dashed, dotted) and colour. Without a style, no border appears.',
 '<b>Margin.</b> <code>margin-bottom</code> sets only the bottom side. There are -top, -left and -right versions too.'])}
<p><b>Watch the layers build up</b>, and see the next element get pushed down.</p>
${V.steps([
 ['Just the content. The next element sits right underneath it.',`<svg viewBox="0 0 420 180" role="img" aria-label="Content only">
<rect class="bx-ok" x="150" y="40" width="120" height="40" rx="3"/><text class="t" x="210" y="66" text-anchor="middle">Coffee £3</text>
<rect class="bx" x="126" y="84" width="168" height="34" rx="4"/><text class="t-s" x="210" y="106" text-anchor="middle">next card</text>
<text class="t-b t-ok" x="310" y="40">content</text>
</svg>`],
 ['<b>padding</b> adds space inside, around the content. The box grows, so the next card moves down.',`<svg viewBox="0 0 420 180" role="img" aria-label="Padding added around content">
<rect class="ln-d" x="130" y="20" width="160" height="80" rx="3"/>
<rect class="bx-ok" x="150" y="40" width="120" height="40" rx="3"/><text class="t" x="210" y="66" text-anchor="middle">Coffee £3</text>
<rect class="bx" x="126" y="104" width="168" height="34" rx="4"/><text class="t-s" x="210" y="126" text-anchor="middle">next card</text>
<text class="t-b t-ok" x="310" y="40">content</text><text class="t-b" x="310" y="68">+ padding</text>
</svg>`],
 ['<b>border</b> draws the frame around the padding.',`<svg viewBox="0 0 420 180" role="img" aria-label="Border drawn around padding">
<rect class="bx-a" x="128" y="18" width="164" height="84" rx="3" style="stroke-width:5"/>
<rect class="bx-ok" x="150" y="40" width="120" height="40" rx="3"/><text class="t" x="210" y="66" text-anchor="middle">Coffee £3</text>
<rect class="bx" x="126" y="108" width="168" height="34" rx="4"/><text class="t-s" x="210" y="130" text-anchor="middle">next card</text>
<text class="t-b t-ok" x="310" y="40">content</text><text class="t-b" x="310" y="68">+ padding</text><text class="t-b t-a" x="310" y="96">+ border</text>
</svg>`],
 ['<b>margin-bottom</b> adds invisible space outside the border. It pushes the next card further away.',`<svg viewBox="0 0 420 180" role="img" aria-label="Margin below pushes the next card away">
<rect class="bx-a" x="128" y="18" width="164" height="84" rx="3" style="stroke-width:5"/>
<rect class="bx-ok" x="150" y="40" width="120" height="40" rx="3"/><text class="t" x="210" y="66" text-anchor="middle">Coffee £3</text>
<rect class="ln-d" x="128" y="106" width="164" height="30" rx="2"/><text class="t-s" x="210" y="126" text-anchor="middle">margin</text>
<rect class="bx" x="126" y="140" width="168" height="34" rx="4"/><text class="t-s" x="210" y="162" text-anchor="middle">next card</text>
<text class="t-b t-ok" x="310" y="40">content</text><text class="t-b" x="310" y="68">+ padding</text><text class="t-b t-a" x="310" y="96">+ border</text><text class="t-b" x="310" y="124">+ margin</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('padding','Space inside the border'),V.ok('margin','Space outside the border'),
 V.no('border: 2px #333;','No style given, so no border is drawn'),V.ok('border: 2px solid #333;','Width, style, colour'),
 V.rh('Conventions'),
 V.ok('padding for roominess','Text touching a border looks cramped'),V.ok('margin for spacing','Use margin to space cards apart'))}
${V.build(`<ol><li>Write a <code>body</code> rule that sets <code>font-family</code> to a clean list ending in <code>sans-serif</code>.</li><li>Write an <code>h1</code> rule that changes its <code>color</code>.</li><li>In a <code>.card</code> rule, add padding and a border with a width, a style and a colour.</li><li>In the same rule, add a bottom margin.</li><li>Write a <code>#buy</code> rule with a <code>background</code> and white text.</li></ol>`)}
${V.hook(`Photo, mount, frame, wall: content, padding, border, margin. Padding is in, margin is out.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which selector matches <code>&lt;div class="card"&gt;</code>: <code>div</code>, <code>.card</code> or both? <i>Both. If they clash, .card wins.</i> 2. You want more space between a card's border and its text. Which property? <i>padding.</i> 3. Why might <code>color: red</code> on one line stop the next line working? <i>A missing semicolon joins them into one broken value.</i></div>
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
<p>Every programmer writes bugs, every day, at every level. Professionals are not the people with fewer bugs. They are the people with a calm, repeatable <b>method</b> for finding them.</p>

${V.card(1,'Read the error','the computer is giving you a clue',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A magnifying glass over the error ReferenceError: formatPrise is not defined. The first word is the type, the rest is the message">
${V.ic('search',10,6,54,'ic-a')}
<text class="t-b" x="76" y="30">Read it slowly, word by word.</text>
<text class="t" x="76" y="52">It names the exact problem.</text>
<rect class="bx-bad" x="8" y="70" width="404" height="42" rx="6"/>
<text class="t-m t-bad" x="18" y="97" style="font-size:15px;font-weight:700">ReferenceError: formatPrise is not defined</text>
<path class="ln" d="M14 118V126H140V118M154 118V126H404V118"/>
<text class="t-b" x="77" y="148" text-anchor="middle">type</text><text class="t-s" x="77" y="164" text-anchor="middle">what kind of problem</text>
<text class="t-b" x="279" y="148" text-anchor="middle">message</text><text class="t-s" x="279" y="164" text-anchor="middle">what exactly, in plain words</text>
</svg><figcaption>An error message has two parts. The type tells you what kind of problem it is. The message names the exact thing that went wrong.</figcaption></figure>
${V.like(`<p>The warning light on a car dashboard. It does not just say "broken"; it says "low oil". An error message is the same: it points at the part that needs fixing, if you read it.</p>`)}
${V.why(`<p>Engineers called faults "bugs" long before computers. In 1947 Grace Hopper's team found a real moth stuck in the Harvard Mark II computer and taped it into their logbook as the "first actual case of bug being found". Today the computer does the searching for you and reports what it found.</p>`)}
${V.anat([[1,'ReferenceError'],[2,':'],' ',[3,'formatPrise'],' ',[4,'is not defined']],[
 '<b>Type.</b> The family of problem. Each type has usual causes (see below).',
 '<b>Colon.</b> Separates the type from the details.',
 '<b>The name it complains about.</b> Your best clue. Search your code for it.',
 '<b>What is wrong with it.</b> Here: no variable or function with this exact name exists.'])}
${V.rules(V.rh('What each error usually means'),
 V.ok('ReferenceError: x is not defined','A typo in a name, or using something before creating it'),
 V.ok('TypeError: Cannot read properties of undefined','You used something that does not exist, often one past the end of a list'),
 V.ok('SyntaxError: Unexpected token','A missing bracket, quote or comma near that spot'),
 V.ok('No error, wrong answer','A logic bug: the code runs, but does the wrong thing'),
 V.rh('Rules'),
 V.ok('Fix the first error first','JavaScript stops at the first problem; later ones appear after'),V.no('Panic at red text','A new error after a fix means progress'))}
${V.hook(`Type, then message. The error is a clue, not an insult.`)}
`)}

${V.card(2,'The debugging loop','a method, not luck',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A loop of five steps: run, read, guess, test, fix, then run again">
<rect class="bx-a" x="4" y="10" width="70" height="84" rx="8"/>${V.ic('arrow',21,18,36,'ic-a')}<text class="t-b" x="39" y="80" text-anchor="middle">Run</text>
<rect class="bx-a" x="87" y="10" width="70" height="84" rx="8"/>${V.ic('search',104,18,36,'ic-a')}<text class="t-b" x="122" y="80" text-anchor="middle">Read</text>
<rect class="bx-a" x="170" y="10" width="70" height="84" rx="8"/>${V.ic('bulb',187,18,36,'ic-a')}<text class="t-b" x="205" y="80" text-anchor="middle">Guess</text>
<rect class="bx-a" x="253" y="10" width="70" height="84" rx="8"/>${V.ic('list',270,18,36,'ic-a')}<text class="t-b" x="288" y="80" text-anchor="middle">Test</text>
<rect class="bx-ok" x="336" y="10" width="70" height="84" rx="8"/>${V.ic('gear',353,18,36,'ic-ok')}<text class="t-b" x="371" y="80" text-anchor="middle">Fix</text>
<polygon class="ah-a" points="76,46 76,58 85,52"/><polygon class="ah-a" points="159,46 159,58 168,52"/><polygon class="ah-a" points="242,46 242,58 251,52"/><polygon class="ah-a" points="325,46 325,58 334,52"/>
<path class="ln-a" d="M371 98V126H39V106"/><polygon class="ah-a" points="32,108 46,108 39,97"/>
<text class="t-s" x="205" y="152" text-anchor="middle">change ONE thing, then run again</text>
</svg><figcaption>Run it, read what happens, guess the cause, test the guess, fix one thing. Then run again and repeat until it works.</figcaption></figure>
${V.like(`<p>A doctor does not guess a cure from across the room. They look at the symptoms, think of a likely cause, run a test to check, then treat it, and check again.</p>`)}
${V.why(`<p>Changing random things until it works wastes hours and often adds new bugs. If you change five things at once and it starts working, you will not know which change mattered.</p>`)}
${V.anat([[1,'console.log'],'(',[2,"'i ='"],', ',[3,'i'],', ',[2,"'total ='"],', ',[3,'total'],')'],[
 '<b>console.log.</b> Prints to the Output so you can see inside your running code.',
 '<b>Labels.</b> Text in quotes, so you know which number is which.',
 '<b>Values.</b> The real values right now. Compare them with what you expected.'])}
<p><b>Watch the loop find four bugs</b> in a shopping-cart program, one at a time.</p>
${V.steps([
 ['Run. The first error is a <b>ReferenceError</b>. The name in the message does not exist: look closely and it is a typo. Fix that one name, then run again.',`<svg viewBox="0 0 420 160" role="img" aria-label="First run: ReferenceError">
<rect class="bx-dark" x="6" y="8" width="408" height="80" rx="8"/>
<text class="t-term t-bad" x="18" y="40" style="font-size:14px">ReferenceError: formatPrise is not defined</text>
${V.ic('bug',8,104,36,'ic-bad')}<text class="t-b" x="52" y="122">Bug 1: a typo in a name</text><text class="t-s" x="52" y="144">Price, not Prise</text>
</svg>`],
 ['New error, which means progress. A <b>TypeError</b> reading <b>price</b> of <b>undefined</b>: the code asked a list item that does not exist for its price. The loop goes one step too far.',`<svg viewBox="0 0 420 160" role="img" aria-label="Second run: TypeError reading price of undefined">
<rect class="bx-dark" x="6" y="8" width="408" height="80" rx="8"/>
<text class="t-term t-bad" x="18" y="40" style="font-size:14px">TypeError: Cannot read properties</text>
<text class="t-term t-bad" x="18" y="66" style="font-size:14px">of undefined (reading 'price')</text>
${V.ic('bug',8,104,36,'ic-bad')}<text class="t-b" x="52" y="122">Bug 2: off by one</text><text class="t-s" x="52" y="144">The loop visits a locker that is not there</text>
</svg>`],
 ['No error now, but the output says <b>undefined</b>. A logic bug. formatPrice builds the text but never hands it back. It is missing <b>return</b>.',`<svg viewBox="0 0 420 160" role="img" aria-label="Third run: Total: undefined">
<rect class="bx-dark" x="6" y="8" width="408" height="80" rx="8"/>
<text class="t-term" x="18" y="40" style="font-size:14px">Total: undefined</text>
${V.ic('bug',8,104,36,'ic-bad')}<text class="t-b" x="52" y="122">Bug 3: missing return</text><text class="t-s" x="52" y="144">Worked out, never handed back</text>
</svg>`],
 ['The total looks right, but free shipping says <b>true</b> for £32.50. Test the guess with console.log: the if <b>puts</b> 50 into total with one =, instead of comparing.',`<svg viewBox="0 0 420 160" role="img" aria-label="Fourth run: free shipping wrongly true">
<rect class="bx-dark" x="6" y="8" width="408" height="80" rx="8"/>
<text class="t-term" x="18" y="40" style="font-size:14px">Total: $32.50</text>
<text class="t-term" x="18" y="66" style="font-size:14px">Free shipping? <tspan class="t-bad">true</tspan></text>
${V.ic('bug',8,104,36,'ic-bad')}<text class="t-b" x="52" y="122">Bug 4: = instead of a comparison</text><text class="t-s" x="52" y="144">32.50 is under 50, so it should be false</text>
</svg>`],
 ['Every line is right. Four bugs, each found by running, reading and fixing <b>one</b> thing at a time.',`<svg viewBox="0 0 420 160" role="img" aria-label="Final run: correct output">
<rect class="bx-dark" x="6" y="8" width="408" height="80" rx="8"/>
<text class="t-term" x="18" y="40" style="font-size:14px">Total: $32.50</text>
<text class="t-term" x="18" y="66" style="font-size:14px">Free shipping? <tspan class="t-ok">false</tspan></text>
${V.ic('check',8,104,36,'ic-ok')}<text class="t-b t-ok" x="52" y="122">All fixed</text><text class="t-s" x="52" y="144">One change, one run, every time</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('one change, then Run','You always know what fixed it'),V.no('five changes at once','If it breaks, which one did it?'),
 V.rh('Conventions'),
 V.ok("console.log('total =', total)",'Label your logs'),V.ok('delete logs when done','Clean up before you share the code'))}
${V.hook(`Run, read, guess, test, fix. One change at a time.`)}
`)}

${V.card(3,'Three classic bugs','the ones everyone writes',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="One equals sign puts 50 into the box total. Greater-or-equal asks a yes or no question">
<circle class="bx-info" cx="40" cy="44" r="24"/><text class="t-m" x="40" y="51" text-anchor="middle" style="font-size:18px">50</text>
<path class="ln-a" d="M66 52 98 76"/><polygon class="ah-a" points="92,82 104,82 100,70"/>
<rect class="bx-ok" x="96" y="84" width="96" height="44" rx="6"/><text class="t-m" x="144" y="112" text-anchor="middle">total</text>
<text class="t-m" x="84" y="30" style="font-size:17px">total = 50</text>
<text class="t-s" x="20" y="156">= puts a value in</text>
<path class="ln-d" d="M214 10V160"/>
<polygon class="bx-warn" points="320,24 404,70 320,116 236,70"/>
<text class="t-m" x="320" y="66" text-anchor="middle" style="font-size:14px">total &gt;= 50</text><text class="t-m" x="320" y="86" text-anchor="middle" style="font-size:14px">?</text>
<text class="t-s" x="240" y="156">&gt;=, ===, &lt; ask a question</text>
</svg><figcaption>Inside an if, one = does not compare. It stores 50 in total, and 50 counts as true, so the if always runs.</figcaption></figure>
${V.like(`<p>Off by one is the classic: a row of 2 lockers is numbered 0 and 1. Walk to locker 2 and you find a wall. Ask the wall for its price and the program crashes.</p>`)}
<p><b>Watch the loop</b> <code>for (let i = 0; i &lt;= items.length; i++)</code> run over a cart with 2 items.</p>
${V.steps([
 ['i is 0. Is 0 &amp;lt;= 2? Yes. items[0] is the mug, price 12.',`<svg viewBox="0 0 420 165" role="img" aria-label="i is 0, locker 0 is the mug">
<rect class="bx-hl" x="20" y="14" width="110" height="50" rx="6"/><text class="t" x="75" y="45" text-anchor="middle">Mug</text>
<rect class="bx" x="140" y="14" width="110" height="50" rx="6"/><text class="t" x="195" y="45" text-anchor="middle">Tea</text>
<rect class="ln-d" x="260" y="14" width="110" height="50" rx="6"/><text class="t-s" x="315" y="45" text-anchor="middle">nothing</text>
<text class="t-b t-a" x="75" y="86" text-anchor="middle">[0]</text><text class="t-b t-a" x="195" y="86" text-anchor="middle">[1]</text><text class="t-b t-a" x="315" y="86" text-anchor="middle">[2]</text>
<text class="t-m" x="20" y="122">i = 0:  0 &lt;= 2 is true</text>
<text class="t" x="20" y="150">items[0].price is 12</text>
</svg>`],
 ['i is 1. Is 1 &amp;lt;= 2? Yes. items[1] is the tea, price 8.5.',`<svg viewBox="0 0 420 165" role="img" aria-label="i is 1, locker 1 is the tea">
<rect class="bx" x="20" y="14" width="110" height="50" rx="6"/><text class="t" x="75" y="45" text-anchor="middle">Mug</text>
<rect class="bx-hl" x="140" y="14" width="110" height="50" rx="6"/><text class="t" x="195" y="45" text-anchor="middle">Tea</text>
<rect class="ln-d" x="260" y="14" width="110" height="50" rx="6"/><text class="t-s" x="315" y="45" text-anchor="middle">nothing</text>
<text class="t-b t-a" x="75" y="86" text-anchor="middle">[0]</text><text class="t-b t-a" x="195" y="86" text-anchor="middle">[1]</text><text class="t-b t-a" x="315" y="86" text-anchor="middle">[2]</text>
<text class="t-m" x="20" y="122">i = 1:  1 &lt;= 2 is true</text>
<text class="t" x="20" y="150">items[1].price is 8.5</text>
</svg>`],
 ['i is 2. Is 2 &amp;lt;= 2? Still yes, so the loop goes on. But there is no items[2]. It is <b>undefined</b>, and asking undefined for .price crashes.',`<svg viewBox="0 0 420 165" role="img" aria-label="i is 2, there is no locker 2, crash">
<rect class="bx" x="20" y="14" width="110" height="50" rx="6"/><text class="t" x="75" y="45" text-anchor="middle">Mug</text>
<rect class="bx" x="140" y="14" width="110" height="50" rx="6"/><text class="t" x="195" y="45" text-anchor="middle">Tea</text>
<rect class="bx-bad" x="260" y="14" width="110" height="50" rx="6"/>${V.ic('cross',299,21,36,'ic-bad')}
<text class="t-b t-a" x="75" y="86" text-anchor="middle">[0]</text><text class="t-b t-a" x="195" y="86" text-anchor="middle">[1]</text><text class="t-b t-a" x="315" y="86" text-anchor="middle">[2]</text>
<text class="t-m" x="20" y="122">i = 2:  2 &lt;= 2 is <tspan class="t-bad">true!</tspan></text>
<text class="t t-bad" x="20" y="150">items[2] is undefined: TypeError</text>
</svg>`],
 ['With <b>&amp;lt;</b> instead of <b>&amp;lt;=</b>, the check is 2 &amp;lt; 2, which is false. The loop stops after the last real item.',`<svg viewBox="0 0 420 165" role="img" aria-label="With less-than, the loop stops at the right place">
<rect class="bx-ok" x="20" y="14" width="110" height="50" rx="6"/><text class="t" x="75" y="45" text-anchor="middle">Mug</text>
<rect class="bx-ok" x="140" y="14" width="110" height="50" rx="6"/><text class="t" x="195" y="45" text-anchor="middle">Tea</text>
<rect class="ln-d" x="260" y="14" width="110" height="50" rx="6"/><text class="t-s" x="315" y="45" text-anchor="middle">never visited</text>
<text class="t-b t-a" x="75" y="86" text-anchor="middle">[0]</text><text class="t-b t-a" x="195" y="86" text-anchor="middle">[1]</text><text class="t-b t-a" x="315" y="86" text-anchor="middle">[2]</text>
<text class="t-m" x="20" y="122">i = 2:  2 &lt; 2 is <tspan class="t-ok">false</tspan></text>
<text class="t t-ok" x="20" y="150">Loop ends. Positions go 0 to length - 1.</text>
</svg>`]])}
${V.rules(V.rh('The three classics'),
 V.no('i &lt;= list.length','Off by one: goes past the end'),V.ok('i &lt; list.length','Stops at the last real position'),
 V.no('if (x = 50)','Stores 50 in x, and 50 counts as true'),V.ok('if (x &gt;= 50)','Compares and gives true or false'),
 V.no("'$' + amount;",'Works out the text, then throws it away: the caller gets undefined'),V.ok("return '$' + amount;",'Hands the answer back'))}
${V.build(`<ol><li>Press Run and read the first red line out loud.</li><li>Find the name it mentions and fix just that.</li><li>Run again. Read the new error and work out which line it points at.</li><li>When there is no error but a wrong answer, add a labelled <code>console.log</code> and compare the real values with what you expected.</li><li>Repeat until the output matches the expected lines exactly.</li></ol>`)}
${V.hook(`Lockers go 0 to length minus 1. One = stores, a comparison asks. No return, no answer.`)}
`)}

<div class="try"><b>Try it in your head</b>1. <code>ReferenceError: totl is not defined</code>. Likely cause? <i>A typo: it should be total.</i> 2. A list has 3 items. What is the last index? <i>2.</i> 3. The code runs with no error but prints a wrong number. First move? <i>console.log the values to find where they first differ from what you expect.</i></div>
`);

explain('f1',`
<p>React, Vue and every other framework end up producing plain HTML and CSS. Get the structure and layout right here and every framework after this is easier.</p>

${V.card(1,'Semantic HTML','tags that say what things are',`
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="A page plan: header with nav at the top, main with a section of three articles, footer at the bottom">
<rect class="bx" x="6" y="6" width="408" height="198" rx="8"/>
<rect class="bx-a" x="14" y="14" width="392" height="40" rx="6"/><text class="t-m" x="26" y="39">header</text>
<rect class="bx-info" x="196" y="20" width="202" height="28" rx="5"/><text class="t-m" x="208" y="39">nav</text>
<path class="ln" d="M256 34H290M302 34H336M348 34H382"/>
<rect class="bx-ok" x="14" y="62" width="392" height="104" rx="6"/><text class="t-m" x="26" y="82">main</text>
<rect class="ln-d" x="24" y="90" width="372" height="68" rx="5"/>
<rect class="bx" x="34" y="98" width="112" height="52" rx="5"/><text class="t-m" x="90" y="129" text-anchor="middle" style="font-size:14px">article</text>
<rect class="bx" x="154" y="98" width="112" height="52" rx="5"/><text class="t-m" x="210" y="129" text-anchor="middle" style="font-size:14px">article</text>
<rect class="bx" x="274" y="98" width="112" height="52" rx="5"/><text class="t-m" x="330" y="129" text-anchor="middle" style="font-size:14px">article</text>
<rect class="bx-warn" x="14" y="172" width="392" height="26" rx="6"/><text class="t-m" x="26" y="190">footer</text>
</svg><figcaption>A semantic page. Each part is named for what it is: the top banner, the navigation links, the main content (a section of article cards) and the footer.</figcaption></figure>
${V.like(`<p>Signs on the doors of a building: "Reception", "Library", "Exit". A page made only of <code>&lt;div&gt;</code>s is a building where every door just says "Room". You can still walk around, but nobody can find anything quickly.</p>`)}
${V.why(`<p>Before HTML5 (finished in 2014), people wrote <code>&lt;div id="header"&gt;</code>, and every site invented its own names. HTML5 added standard tags with meaning. Screen readers turn them into <b>landmarks</b> that blind users can jump between, and search engines use them to find your real content.</p>`)}
${V.anat([[1,'&lt;nav&gt;'],'\n  ',[2,'&lt;ul&gt;'],'\n    ',[3,'&lt;li&gt;'],[4,'&lt;a href="#work"&gt;Work&lt;/a&gt;'],'&lt;/li&gt;\n  &lt;/ul&gt;\n',[1,'&lt;/nav&gt;']],[
 '<b>nav.</b> The landmark for the main links around your site.',
 '<b>ul.</b> A menu is a list of links, so it is marked up as a list.',
 '<b>li.</b> One menu item.',
 '<b>The link.</b> <code>#work</code> jumps to the element with <code>id="work"</code> on the same page.'])}
<p><b>Watch a screen reader</b> look for its way around, first on a page of divs, then on a semantic page.</p>
${V.steps([
 ['A page made only of <b>div</b>s. The screen reader finds no landmarks, so its user must listen from the top, line by line.',`<svg viewBox="0 0 420 180" role="img" aria-label="All divs: no landmarks found">
<rect class="bx" x="10" y="10" width="190" height="34" rx="5"/><text class="t-m" x="22" y="32">div</text>
<rect class="bx" x="10" y="50" width="190" height="34" rx="5"/><text class="t-m" x="22" y="72">div</text>
<rect class="bx" x="10" y="90" width="190" height="50" rx="5"/><text class="t-m" x="22" y="120">div</text>
<rect class="bx" x="10" y="146" width="190" height="28" rx="5"/><text class="t-m" x="22" y="165">div</text>
${V.ic('person',220,10,44,'ic-info')}<text class="t-b" x="272" y="38">Landmarks:</text>
<text class="t t-bad" x="226" y="84">none found</text>
<text class="t-s" x="226" y="112">Listening from the top,</text><text class="t-s" x="226" y="132">one line at a time...</text>
</svg>`],
 ['The same page with <b>header</b>, <b>nav</b>, <b>main</b> and <b>footer</b>. Now the reader lists four landmarks. (It calls the top header "banner" and the footer "content info".)',`<svg viewBox="0 0 420 180" role="img" aria-label="Semantic page: four landmarks listed">
<rect class="bx-a" x="10" y="10" width="190" height="34" rx="5"/><text class="t-m" x="22" y="32">header</text>
<rect class="bx-info" x="10" y="50" width="190" height="34" rx="5"/><text class="t-m" x="22" y="72">nav</text>
<rect class="bx-ok" x="10" y="90" width="190" height="50" rx="5"/><text class="t-m" x="22" y="120">main</text>
<rect class="bx-warn" x="10" y="146" width="190" height="28" rx="5"/><text class="t-m" x="22" y="165">footer</text>
${V.ic('person',220,10,44,'ic-info')}<text class="t-b" x="272" y="38">Landmarks:</text>
<text class="t" x="226" y="76">banner</text><text class="t" x="226" y="100">navigation</text><text class="t" x="226" y="124">main</text><text class="t" x="226" y="148">content info</text>
</svg>`],
 ['The user presses one key to jump straight to <b>main</b>, skipping the menu they have heard a hundred times.',`<svg viewBox="0 0 420 180" role="img" aria-label="Jumping straight to main">
<rect class="bx-a" x="10" y="10" width="190" height="34" rx="5"/><text class="t-m t-dim" x="22" y="32">header</text>
<rect class="bx-info" x="10" y="50" width="190" height="34" rx="5"/><text class="t-m t-dim" x="22" y="72">nav</text>
<rect class="bx-hl" x="10" y="90" width="190" height="50" rx="5"/><text class="t-m" x="22" y="120" style="font-weight:700">main</text>
<rect class="bx-warn" x="10" y="146" width="190" height="28" rx="5"/><text class="t-m t-dim" x="22" y="165">footer</text>
${V.ic('person',220,10,44,'ic-info')}<text class="t-b" x="272" y="38">Landmarks:</text>
<text class="t t-dim" x="226" y="76">banner</text><text class="t t-dim" x="226" y="100">navigation</text><text class="t-b t-ok" x="226" y="124">main  &#9664; jump!</text><text class="t t-dim" x="226" y="148">content info</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('one &lt;main&gt; per page','The single main content area'),V.no('&lt;div class="nav"&gt;','A class name gives no meaning to a screen reader'),
 V.rh('Conventions'),
 V.ok('&lt;section&gt;','A group of related content, usually with a heading'),V.ok('&lt;article&gt;','A self-contained item: a card, a post'),
 V.ok('&lt;div&gt;','Only for styling, when no other tag fits'))}
${V.hook(`Name the rooms: header, nav, main, footer. A div is a door with no sign.`)}
`)}

${V.card(2,'Flexbox','one direction: a row or a column',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Three items in a row inside a flex container, with gaps between them and an arrow showing the main axis">
<rect class="bx-info" x="30" y="16" width="360" height="100" rx="8"/>
<rect class="bx-a" x="50" y="36" width="90" height="60" rx="6"/><text class="t-b" x="95" y="71" text-anchor="middle">Work</text>
<rect class="bx-a" x="165" y="36" width="90" height="60" rx="6"/><text class="t-b" x="210" y="71" text-anchor="middle">About</text>
<rect class="bx-a" x="280" y="36" width="90" height="60" rx="6"/><text class="t-b" x="325" y="71" text-anchor="middle">Contact</text>
<text class="t-s" x="152" y="112" text-anchor="middle">gap</text><text class="t-s" x="267" y="112" text-anchor="middle">gap</text>
<path class="ln-a" d="M30 138H380"/><polygon class="ah-a" points="378,131 378,145 390,138"/>
<text class="t-b t-a" x="210" y="162" text-anchor="middle">main axis: items line up this way</text>
</svg><figcaption>display: flex turns the children of an element into a line of items. gap puts equal space between them.</figcaption></figure>
${V.like(`<p>Books on a shelf. The shelf is the <b>container</b>, the books are the <b>items</b>. Flexbox decides which way the books line up, how far apart they stand, and whether they sit at the top, middle or bottom of the shelf.</p>`)}
${V.why(`<p>For years, putting things side by side meant hacks with floats that broke easily. Flexbox, supported in all major browsers from about 2015, was designed for exactly this job: lining things up in one direction.</p>`)}
${V.anat([[1,'nav ul'],' {\n  ',[2,'display: flex;'],'\n  ',[3,'gap: 16px;'],'\n  ',[4,'align-items: center;'],'\n}'],[
 '<b>The container.</b> Flex goes on the <b>parent</b>; its children become the items.',
 '<b>display: flex.</b> Children line up in a row (the default direction).',
 '<b>gap.</b> Space between items, but not around the outside.',
 '<b>align-items.</b> Lines items up across the row: top, center or bottom.'])}
<p><b>Watch a list of links become a menu bar</b>, one line of CSS at a time.</p>
${V.steps([
 ['A plain list: one link per line, with bullet points.',`<svg viewBox="0 0 420 160" role="img" aria-label="Plain list with bullets">
<rect class="bx-dark" x="6" y="8" width="200" height="144" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">nav ul {</text><text class="t-term" x="18" y="140" style="font-size:14px">}</text>
<rect class="bx" x="218" y="8" width="196" height="144" rx="8"/>
<circle class="dot-m" cx="236" cy="45" r="3.5"/><text class="t t-info" x="248" y="50">Work</text>
<circle class="dot-m" cx="236" cy="75" r="3.5"/><text class="t t-info" x="248" y="80">About</text>
<circle class="dot-m" cx="236" cy="105" r="3.5"/><text class="t t-info" x="248" y="110">Contact</text>
</svg>`],
 ['<b>list-style: none</b> removes the bullets. Adding <b>padding: 0</b> as well would remove the indent that lists have by default.',`<svg viewBox="0 0 420 160" role="img" aria-label="Bullets removed">
<rect class="bx-dark" x="6" y="8" width="200" height="144" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">nav ul {</text>
<text class="t-term t-ok" x="32" y="60" style="font-size:14px">list-style: none;</text>
<text class="t-term" x="18" y="140" style="font-size:14px">}</text>
<rect class="bx" x="218" y="8" width="196" height="144" rx="8"/>
<text class="t t-info" x="230" y="50">Work</text><text class="t t-info" x="230" y="80">About</text><text class="t t-info" x="230" y="110">Contact</text>
</svg>`],
 ['<b>display: flex</b> lines the items up in a row. But they are squashed together.',`<svg viewBox="0 0 420 160" role="img" aria-label="Items in a row, touching">
<rect class="bx-dark" x="6" y="8" width="200" height="144" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">nav ul {</text>
<text class="t-term" x="32" y="60" style="font-size:14px">list-style: none;</text>
<text class="t-term t-ok" x="32" y="84" style="font-size:14px">display: flex;</text>
<text class="t-term" x="18" y="140" style="font-size:14px">}</text>
<rect class="bx" x="218" y="8" width="196" height="144" rx="8"/>
<text class="t t-info" x="230" y="50">Work</text><text class="t t-info" x="266" y="50">About</text><text class="t t-info" x="311" y="50">Contact</text>
</svg>`],
 ['<b>gap: 16px</b> puts equal space between the items. A menu bar, with no margins to fiddle with.',`<svg viewBox="0 0 420 160" role="img" aria-label="Items in a row with gaps">
<rect class="bx-dark" x="6" y="8" width="200" height="144" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">nav ul {</text>
<text class="t-term" x="32" y="60" style="font-size:14px">list-style: none;</text>
<text class="t-term" x="32" y="84" style="font-size:14px">display: flex;</text>
<text class="t-term t-ok" x="32" y="108" style="font-size:14px">gap: 16px;</text>
<text class="t-term" x="18" y="140" style="font-size:14px">}</text>
<rect class="bx" x="218" y="8" width="196" height="144" rx="8"/>
<text class="t t-info" x="230" y="50">Work</text><text class="t t-info" x="282" y="50">About</text><text class="t t-info" x="343" y="50">Contact</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('nav ul { display: flex }','Flex on the parent'),V.no('li { display: flex }','On the items it only affects what is inside each item'),
 V.rh('Conventions'),
 V.ok('justify-content','Spreads items along the row'),V.ok('align-items','Lines them up across it'),
 V.ok('gap over margins','One gap value instead of a margin on every item'))}
${V.hook(`Flex is a shelf: one line, items side by side, gap between.`)}
`)}

${V.card(3,'CSS Grid','two directions: rows and columns',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A grid of three equal columns, like an egg box, with six cards dropped into the slots">
<text class="t-m t-a" x="86" y="20" text-anchor="middle">1fr</text><text class="t-m t-a" x="210" y="20" text-anchor="middle">1fr</text><text class="t-m t-a" x="334" y="20" text-anchor="middle">1fr</text>
<rect class="bx-info" x="20" y="28" width="380" height="132" rx="8"/>
<rect class="bx-a" x="30" y="38" width="112" height="52" rx="6"/><text class="t" x="86" y="69" text-anchor="middle">Shop</text>
<rect class="bx-a" x="154" y="38" width="112" height="52" rx="6"/><text class="t" x="210" y="69" text-anchor="middle">Blog</text>
<rect class="bx-a" x="278" y="38" width="112" height="52" rx="6"/><text class="t" x="334" y="69" text-anchor="middle">Chat</text>
<rect class="bx" x="30" y="98" width="112" height="52" rx="6"/><text class="t" x="86" y="129" text-anchor="middle">Game</text>
<rect class="bx" x="154" y="98" width="112" height="52" rx="6"/><text class="t" x="210" y="129" text-anchor="middle">Map</text>
<rect class="ln-d" x="278" y="98" width="112" height="52" rx="6"/><text class="t-s" x="334" y="129" text-anchor="middle">next slot</text>
</svg><figcaption>Three equal columns. Items drop into the slots in order, left to right, and a new row starts when a row is full.</figcaption></figure>
${V.like(`<p>An egg box. You decide the slots first, then the eggs go in one by one, filling each row before starting the next. You never position each egg yourself.</p>`)}
${V.why(`<p>Flexbox handles one line well, but card galleries and whole page layouts need rows <b>and</b> columns that line up. CSS Grid, in all major browsers since 2017, was built for two-dimensional layout.</p>`)}
${V.anat([[1,'grid-template-columns'],': ',[2,'repeat'],'(',[3,'3'],', ',[4,'1fr'],');'],[
 '<b>Property.</b> Describes the columns. (Use it together with <code>display: grid</code> on the parent.)',
 '<b>repeat().</b> Shorthand so you do not write the same size again and again.',
 '<b>How many.</b> Three columns.',
 '<b>fr.</b> One <b>fr</b>action of the free space. Three 1fr columns share it equally.'])}
${V.rules(V.rh('Rules'),
 V.ok('repeat(3, 1fr)','Same as 1fr 1fr 1fr'),V.ok('gap: 16px','Works in grid too, between rows and columns'),
 V.rh('Conventions'),
 V.ok('Flex for a line','Menus, toolbars, a button row'),V.ok('Grid for a layout','Card galleries, whole pages'))}
${V.hook(`Flex is a shelf, grid is an egg box. 1fr means "one equal share".`)}
`)}

${V.card(4,'Responsive design','one page, every screen size',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="On a laptop the cards sit in three columns. On a phone they stack in one column">
<rect class="bx" x="14" y="14" width="236" height="132" rx="8"/><path class="ln" d="M4 154H260"/>
<rect class="bx-a" x="26" y="46" width="66" height="60" rx="5"/><rect class="bx-a" x="99" y="46" width="66" height="60" rx="5"/><rect class="bx-a" x="172" y="46" width="66" height="60" rx="5"/>
<text class="t-s" x="132" y="174" text-anchor="middle">wide: 3 columns</text>
<rect class="bx" x="300" y="8" width="100" height="150" rx="14"/>
<rect class="bx-a" x="312" y="28" width="76" height="34" rx="4"/><rect class="bx-a" x="312" y="68" width="76" height="34" rx="4"/><rect class="bx-a" x="312" y="108" width="76" height="34" rx="4"/>
<text class="t-s" x="350" y="174" text-anchor="middle">phone: 1 column</text>
</svg><figcaption>The same HTML, two layouts. A media query switches the grid to one column when the screen is narrow.</figcaption></figure>
${V.like(`<p>Water takes the shape of whatever glass you pour it into. A responsive page does the same: the content stays the same, the layout reshapes to fit the screen.</p>`)}
${V.why(`<p>When smartphones arrived in 2007, desktop sites showed up tiny and you had to pinch and zoom. In 2010 Ethan Marcotte named the fix <b>responsive web design</b>: flexible layouts plus <b>media queries</b>, CSS that only applies under a condition such as a narrow screen.</p>`)}
${V.anat([[1,'@media'],' ',[2,'(max-width: 600px)'],' {\n  ',[3,'.cards'],' { ',[4,'grid-template-columns: 1fr;'],' }\n}'],[
 '<b>@media.</b> "Only apply the rules inside when..."',
 '<b>Condition.</b> The screen is 600px wide <b>or less</b>.',
 '<b>Selector.</b> Normal CSS rules go inside.',
 '<b>The change.</b> One column instead of three.'])}
<p><b>Drag the window narrower</b> and watch the condition switch on.</p>
${V.steps([
 ['900px wide. Is 900 at most 600? No, so the media query is off. Three columns.',`<svg viewBox="0 0 420 175" role="img" aria-label="900px: three columns">
<rect class="bx" x="10" y="10" width="380" height="120" rx="8"/>
<rect class="bx-a" x="22" y="40" width="112" height="60" rx="5"/><rect class="bx-a" x="144" y="40" width="112" height="60" rx="5"/><rect class="bx-a" x="266" y="40" width="112" height="60" rx="5"/>
<text class="t-b" x="10" y="156">900px</text><text class="t-m" x="90" y="156">900 &lt;= 600? <tspan class="t-bad">no</tspan></text>
</svg>`],
 ['700px. Still bigger than 600, still off. The three columns just get narrower, because 1fr shares whatever space there is.',`<svg viewBox="0 0 420 175" role="img" aria-label="700px: still three columns">
<rect class="bx" x="10" y="10" width="296" height="120" rx="8"/>
<rect class="bx-a" x="22" y="40" width="84" height="60" rx="5"/><rect class="bx-a" x="116" y="40" width="84" height="60" rx="5"/><rect class="bx-a" x="210" y="40" width="84" height="60" rx="5"/>
<text class="t-b" x="10" y="156">700px</text><text class="t-m" x="90" y="156">700 &lt;= 600? <tspan class="t-bad">no</tspan></text>
</svg>`],
 ['600px. max-width includes 600 itself, so now the condition is true. The rule inside switches on: one column.',`<svg viewBox="0 0 420 175" role="img" aria-label="600px: one column">
<rect class="bx-hl" x="10" y="10" width="254" height="120" rx="8"/>
<rect class="bx-a" x="22" y="20" width="230" height="30" rx="5"/><rect class="bx-a" x="22" y="56" width="230" height="30" rx="5"/><rect class="bx-a" x="22" y="92" width="230" height="30" rx="5"/>
<text class="t-b" x="10" y="156">600px</text><text class="t-m" x="90" y="156">600 &lt;= 600? <tspan class="t-ok">yes</tspan></text>
</svg>`],
 ['400px, phone size. Still true: one comfortable column, no pinching or zooming.',`<svg viewBox="0 0 420 175" role="img" aria-label="400px: one column">
<rect class="bx-hl" x="10" y="10" width="170" height="120" rx="8"/>
<rect class="bx-a" x="22" y="20" width="146" height="30" rx="5"/><rect class="bx-a" x="22" y="56" width="146" height="30" rx="5"/><rect class="bx-a" x="22" y="92" width="146" height="30" rx="5"/>
<text class="t-b" x="10" y="156">400px</text><text class="t-m" x="90" y="156">400 &lt;= 600? <tspan class="t-ok">yes</tspan></text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;','Without it, phones pretend to be about 980px wide and your media query never fires'),
 V.no('@media before the base rule','Same selector, so the later rule wins: put media queries after'),
 V.rh('Conventions'),
 V.ok('mobile-first','Write the phone layout first, then add @media (min-width: ...) for bigger screens'))}
${V.build(`<ol><li>Swap the outer divs for <code>header</code>, <code>nav</code>, <code>main</code> and <code>footer</code>, and put the menu links in a <code>ul</code>.</li><li>Make the menu list a flex row with a gap and no bullets.</li><li>Make the card container a grid of three equal columns with a gap.</li><li>Add a media query for screens 600px or narrower that switches it to one column.</li><li>Run it, then make the preview narrow to check.</li></ol>`)}
${V.hook(`Same content, different glass. @media says "only when the screen is like this".`)}
`)}

<div class="try"><b>Try it in your head</b>1. Menu links in a row: flex or grid? <i>Flex: one direction.</i> 2. What does <code>repeat(4, 1fr)</code> make? <i>Four equal columns.</i> 3. At exactly 600px, does <code>@media (max-width: 600px)</code> apply? <i>Yes: max-width includes 600.</i></div>
`);

explain('f2',`
<p>Every "Add to basket" button, live search box and endless feed works the same way underneath: find an element, react to an event, change the page, load data. React does this for you later, so learn what it is doing.</p>

${V.card(1,'The DOM','the page as a live tree',`
<figure class="fig"><svg viewBox="0 0 420 212" role="img" aria-label="The DOM tree: document, then html, then body, which holds input#task, button#add and ul#list, which holds an li">
<rect class="bx-dark" x="150" y="6" width="120" height="30" rx="6"/><text class="t-term" x="210" y="26" text-anchor="middle">document</text>
<rect class="bx" x="170" y="52" width="80" height="30" rx="6"/><text class="t-m" x="210" y="72" text-anchor="middle">html</text>
<rect class="bx" x="170" y="98" width="80" height="30" rx="6"/><text class="t-m" x="210" y="118" text-anchor="middle">body</text>
<path class="ln" d="M210 36V52M210 82V98M210 128V136H69V146M210 136V146M210 136H351V146M351 176V184"/>
<rect class="bx-info" x="14" y="146" width="110" height="30" rx="6"/><text class="t-m" x="69" y="166" text-anchor="middle" style="font-size:14px">input#task</text>
<rect class="bx-a" x="150" y="146" width="120" height="30" rx="6"/><text class="t-m" x="210" y="166" text-anchor="middle" style="font-size:14px">button#add</text>
<rect class="bx-ok" x="296" y="146" width="110" height="30" rx="6"/><text class="t-m" x="351" y="166" text-anchor="middle" style="font-size:14px">ul#list</text>
<rect class="bx" x="321" y="184" width="60" height="24" rx="5"/><text class="t-m" x="351" y="201" text-anchor="middle" style="font-size:14px">li</text>
</svg><figcaption>The browser turns your HTML into a tree of objects called the DOM (Document Object Model). JavaScript can reach any branch and change it, and the screen updates straight away.</figcaption></figure>
${V.like(`<p>A puppet on strings. The HTML file is the puppet as it was built. The DOM is the puppet hanging up live, and JavaScript holds the strings: pull one and that part of the page moves at once.</p>`)}
${V.why(`<p>In the late 1990s, Netscape and Internet Explorer each let scripts change pages in their own incompatible way. In 1998 the W3C standardised the DOM, so the same JavaScript works in every browser.</p>`)}
${V.anat([[1,'document'],[2,'.querySelector'],'(',[3,"'#add'"],')'],[
 '<b>document.</b> The whole page, the root of the tree.',
 '<b>querySelector.</b> "Find me the first element that matches."',
 '<b>A CSS selector.</b> The same ones you write in CSS: <code>#id</code>, <code>.class</code>, <code>tag</code>.'])}
${V.rules(V.rh('Rules'),
 V.ok("querySelector('#list')",'The first match, or null if none'),V.ok("querySelectorAll('li')",'Every match, as a list'),
 V.no('script in &lt;head&gt; with no defer','It runs before the elements exist, so it finds null'),V.ok('script at the end of body','The tree is built by then'))}
${V.hook(`HTML is the plan, the DOM is the live building. <code>querySelector</code> finds a room by its CSS address.`)}
`)}

${V.card(2,'Changing the page','create, fill, append',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="A visitor types an image tag with an attack in it. textContent shows it as harmless text. innerHTML runs it as code">
<text class="t-s" x="210" y="18" text-anchor="middle">A visitor types this into your box:</text>
<rect class="bx" x="60" y="26" width="300" height="34" rx="6"/><text class="t-m" x="72" y="48" style="font-size:14px">&lt;img src=x onerror=alert(1)&gt;</text>
<path class="ln" d="M150 62 112 90M270 62 308 90"/>
<rect class="bx-ok" x="10" y="94" width="195" height="78" rx="8"/>${V.ic('check',164,100,32,'ic-ok')}
<text class="t-b" x="22" y="118">textContent</text><text class="t" x="22" y="142">shown as plain text</text><text class="t-s" x="22" y="162">harmless</text>
<rect class="bx-bad" x="215" y="94" width="195" height="78" rx="8"/>${V.ic('warn',370,100,32,'ic-bad')}
<text class="t-b" x="227" y="118">innerHTML</text><text class="t" x="227" y="142">runs as code!</text><text class="t-s" x="227" y="162">the attacker's script runs</text>
</svg><figcaption>textContent treats what it is given as plain text. innerHTML builds HTML from it, so a visitor can sneak in code. This attack is called cross-site scripting (XSS).</figcaption></figure>
${V.like(`<p>Building a new shelf for a room: first you make the shelf (create), then you put the label on it (fill), then you fix it to the wall (append). Until that last step, nobody in the room can see it.</p>`)}
<p><b>Watch a new list item being made</b> and then removed.</p>
${V.steps([
 ['<b>createElement</b> makes a brand new, empty li. It exists only in memory: it is not on the page yet.',`<svg viewBox="0 0 420 180" role="img" aria-label="A new empty li floats outside the page">
<rect class="bx-dark" x="6" y="8" width="408" height="36" rx="6"/><text class="t-term" x="16" y="31" style="font-size:14px">const li = document.createElement('li');</text>
<rect class="bx" x="10" y="56" width="230" height="116" rx="8"/><text class="t-m" x="22" y="76">ul#list</text>
<circle class="dot-m" cx="28" cy="100" r="3.5"/><text class="t" x="40" y="105">Walk dog</text>
<rect class="ln-d" x="264" y="84" width="140" height="36" rx="5"/><text class="t-m" x="280" y="107">li</text>
<text class="t-s" x="264" y="144">in memory only</text>
</svg>`],
 ['<b>textContent</b> puts the text inside it. Still invisible to the visitor.',`<svg viewBox="0 0 420 180" role="img" aria-label="The li now holds Buy milk">
<rect class="bx-dark" x="6" y="8" width="408" height="36" rx="6"/><text class="t-term" x="16" y="31" style="font-size:14px">li.textContent = 'Buy milk';</text>
<rect class="bx" x="10" y="56" width="230" height="116" rx="8"/><text class="t-m" x="22" y="76">ul#list</text>
<circle class="dot-m" cx="28" cy="100" r="3.5"/><text class="t" x="40" y="105">Walk dog</text>
<rect class="bx-hl" x="264" y="84" width="140" height="36" rx="5"/><text class="t" x="280" y="107">Buy milk</text>
<text class="t-s" x="264" y="144">in memory only</text>
</svg>`],
 ['<b>append</b> attaches it to the list in the DOM. Now it is on the page.',`<svg viewBox="0 0 420 180" role="img" aria-label="The li is appended to the list">
<rect class="bx-dark" x="6" y="8" width="408" height="36" rx="6"/><text class="t-term" x="16" y="31" style="font-size:14px">list.append(li);</text>
<rect class="bx" x="10" y="56" width="230" height="116" rx="8"/><text class="t-m" x="22" y="76">ul#list</text>
<circle class="dot-m" cx="28" cy="100" r="3.5"/><text class="t" x="40" y="105">Walk dog</text>
<rect class="bx-hl" x="20" y="114" width="200" height="30" rx="5"/><circle class="dot-m" cx="28" cy="129" r="3.5"/><text class="t" x="40" y="134">Buy milk</text>
${V.ic('check',290,84,40,'ic-ok')}<text class="t-s" x="264" y="144">on the page</text>
</svg>`],
 ['<b>remove</b> takes an element out of the DOM, and it disappears from the page.',`<svg viewBox="0 0 420 180" role="img" aria-label="The li is removed">
<rect class="bx-dark" x="6" y="8" width="408" height="36" rx="6"/><text class="t-term" x="16" y="31" style="font-size:14px">li.remove();</text>
<rect class="bx" x="10" y="56" width="230" height="116" rx="8"/><text class="t-m" x="22" y="76">ul#list</text>
<circle class="dot-m" cx="28" cy="100" r="3.5"/><text class="t" x="40" y="105">Walk dog</text>
<rect class="ln-d" x="20" y="114" width="200" height="30" rx="5"/><text class="t t-dim" x="40" y="134">Buy milk</text><path class="ln-x" d="M36 129H112"/>
<text class="t-s" x="264" y="144">gone</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('li.textContent = input.value','User text stays text'),V.no('li.innerHTML = input.value','Lets a visitor inject code (XSS)'),
 V.no('createElement without append','Made, but never shown'),
 V.rh('Conventions'),
 V.ok("input.value.trim()",'Cut spaces off both ends before checking for empty'))}
${V.hook(`Create, fill, append. Text goes in with textContent, never innerHTML.`)}
`)}

${V.card(3,'Events','doing something when the user acts',`
<figure class="fig"><svg viewBox="0 0 420 165" role="img" aria-label="Clicking the Add button sends a click event, and your addTask function runs">
<rect class="bx-a" x="20" y="48" width="110" height="50" rx="10"/><text class="t-b" x="75" y="79" text-anchor="middle">Add</text>
<polygon class="ah" points="112,86 112,116 119,109 125,121 130,119 124,107 134,107"/>
<path class="ln-a" d="M140 73H218"/><polygon class="ah-a" points="216,66 216,80 228,73"/>
<text class="t-b t-a" x="182" y="60" text-anchor="middle">click</text>
<rect class="bx-ok" x="232" y="38" width="176" height="70" rx="10"/>
<text class="t-m" x="320" y="70" text-anchor="middle">addTask()</text><text class="t-s" x="320" y="92" text-anchor="middle">your function runs</text>
<text class="t-s" x="210" y="150" text-anchor="middle">addEventListener connects the button to the action</text>
</svg><figcaption>An event is something that happens: a click, a key press. A listener is a function the browser calls each time that event happens.</figcaption></figure>
${V.like(`<p>A doorbell. You wire it up once. Nothing happens until someone presses it, and then the bell rings, every time, as often as they press.</p>`)}
${V.anat([[1,'button'],[2,'.addEventListener'],'(',[3,"'click'"],', ',[4,'addTask'],')'],[
 '<b>The element</b> to watch.',
 '<b>addEventListener.</b> "When this happens to it, call that."',
 '<b>The event name.</b> <code>\'click\'</code>, <code>\'keydown\'</code>, <code>\'input\'</code>...',
 '<b>The function</b> to call. No brackets: you hand over the function, the browser calls it later.'])}
<p><b>Watch a click bubble up.</b> The event starts at the button you clicked and then travels up through every parent.</p>
${V.steps([
 ['You click <b>Delete</b>. The event starts at the button, its <b>target</b>. Its listener runs first.',`<svg viewBox="0 0 420 175" role="img" aria-label="Event at the button">
<rect class="bx" x="10" y="10" width="300" height="156" rx="8"/><text class="t-m" x="22" y="30">body</text>
<rect class="bx" x="24" y="38" width="272" height="118" rx="7"/><text class="t-m" x="36" y="58">ul</text>
<rect class="bx" x="38" y="68" width="244" height="78" rx="6"/><text class="t-m" x="50" y="88">li</text><text class="t" x="50" y="126">Buy milk</text>
<rect class="bx-hl" x="186" y="96" width="84" height="36" rx="6"/><text class="t-b" x="228" y="119" text-anchor="middle">Delete</text>
<text class="t-b t-a" x="324" y="146">button</text><text class="t-m t-dim" x="324" y="116">li</text><text class="t-m t-dim" x="324" y="86">ul</text><text class="t-m t-dim" x="324" y="56">body</text>
</svg>`],
 ['Then it <b>bubbles</b> up to the parent li.',`<svg viewBox="0 0 420 175" role="img" aria-label="Event bubbles to li">
<rect class="bx" x="10" y="10" width="300" height="156" rx="8"/><text class="t-m" x="22" y="30">body</text>
<rect class="bx" x="24" y="38" width="272" height="118" rx="7"/><text class="t-m" x="36" y="58">ul</text>
<rect class="bx-hl" x="38" y="68" width="244" height="78" rx="6"/><text class="t-m" x="50" y="88">li</text><text class="t" x="50" y="126">Buy milk</text>
<rect class="bx" x="186" y="96" width="84" height="36" rx="6"/><text class="t-b" x="228" y="119" text-anchor="middle">Delete</text>
<text class="t-m t-dim" x="324" y="146">button</text><text class="t-b t-a" x="324" y="116">li</text><text class="t-m t-dim" x="324" y="86">ul</text><text class="t-m t-dim" x="324" y="56">body</text>
<path class="ln-a" d="M345 136V124"/>
</svg>`],
 ['Then to the ul. A listener here would hear clicks from <b>every</b> Delete button in the list, even ones added later. That trick is called event delegation.',`<svg viewBox="0 0 420 175" role="img" aria-label="Event bubbles to ul">
<rect class="bx" x="10" y="10" width="300" height="156" rx="8"/><text class="t-m" x="22" y="30">body</text>
<rect class="bx-hl" x="24" y="38" width="272" height="118" rx="7"/><text class="t-m" x="36" y="58">ul</text>
<rect class="bx" x="38" y="68" width="244" height="78" rx="6"/><text class="t-m" x="50" y="88">li</text><text class="t" x="50" y="126">Buy milk</text>
<rect class="bx" x="186" y="96" width="84" height="36" rx="6"/><text class="t-b" x="228" y="119" text-anchor="middle">Delete</text>
<text class="t-m t-dim" x="324" y="146">button</text><text class="t-m t-dim" x="324" y="116">li</text><text class="t-b t-a" x="324" y="86">ul</text><text class="t-m t-dim" x="324" y="56">body</text>
</svg>`],
 ['Finally up to body and the document. Any listener on the way gets its turn.',`<svg viewBox="0 0 420 175" role="img" aria-label="Event reaches body">
<rect class="bx-hl" x="10" y="10" width="300" height="156" rx="8"/><text class="t-m" x="22" y="30">body</text>
<rect class="bx" x="24" y="38" width="272" height="118" rx="7"/><text class="t-m" x="36" y="58">ul</text>
<rect class="bx" x="38" y="68" width="244" height="78" rx="6"/><text class="t-m" x="50" y="88">li</text><text class="t" x="50" y="126">Buy milk</text>
<rect class="bx" x="186" y="96" width="84" height="36" rx="6"/><text class="t-b" x="228" y="119" text-anchor="middle">Delete</text>
<text class="t-m t-dim" x="324" y="146">button</text><text class="t-m t-dim" x="324" y="116">li</text><text class="t-m t-dim" x="324" y="86">ul</text><text class="t-b t-a" x="324" y="56">body</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok("addEventListener('click', addTask)",'Hand over the function'),V.no("addEventListener('click', addTask())",'The brackets call it right now, once, and hand over its result'),
 V.no("'onclick'",'The event name is just click'),V.ok("e.key === 'Enter'",'In a keydown listener, which key was pressed'),
 V.rh('Conventions'),
 V.ok("() =&gt; li.remove()",'A small arrow function when the job is one line'))}
${V.hook(`Wire the bell once, it rings every press. No brackets on the function you hand over.`)}
`)}

${V.card(4,'Loading data with fetch','order, wait, collect',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="The browser sends a request to the server and the server sends back JSON data">
${V.ic('laptop',10,14,70,'ic-a')}<text class="t-s" x="45" y="102" text-anchor="middle">browser</text>
${V.ic('server',340,14,70,'ic-info')}<text class="t-s" x="375" y="102" text-anchor="middle">server</text>
<path class="ln-a" d="M90 36H322"/><polygon class="ah-a" points="320,29 320,43 332,36"/><text class="t-m" x="210" y="28" text-anchor="middle" style="font-size:14px">GET /api/users</text>
<path class="ln-ok" d="M330 66H98"/><polygon class="ah-ok" points="100,59 100,73 88,66"/><text class="t-m" x="210" y="88" text-anchor="middle" style="font-size:14px">[ {...}, {...}, {...} ]</text>
<text class="t-s" x="210" y="142" text-anchor="middle">request goes out, response comes back</text>
</svg><figcaption>fetch sends a request across the internet and gives you a promise of the answer. The data usually comes back as JSON, text that looks like JavaScript objects.</figcaption></figure>
${V.like(`<p>Ordering in a restaurant. The waiter takes your order to the kitchen. You do not freeze until the food comes: you keep chatting. When the plate arrives, you still have to take the lid off before you can eat. That lid is <code>res.json()</code>.</p>`)}
${V.why(`<p>Pages used to reload completely to show new data. Around 2005, Gmail and Google Maps showed that JavaScript could quietly load data in the background (this was called AJAX). <code>fetch</code>, added to browsers around 2015, is the modern, simpler way to do it.</p>`)}
${V.anat([[1,'const res'],' = ',[2,'await'],' ',[3,'fetch'],'(',[4,"'/api/users'"],');'],[
 '<b>The response.</b> Status (200 OK, 404...) and headers. The data inside still needs reading.',
 '<b>await.</b> Pause this function until the answer arrives. The rest of the page keeps working.',
 '<b>fetch.</b> Sends the request and returns a Promise: an IOU for a future value.',
 '<b>The address</b> to ask. Starting with / means "on this same site".'])}
${V.steps([
 ['<b>fetch</b> sends the request. You get a Promise that is still <b>pending</b>. The page stays responsive while it waits.',`<svg viewBox="0 0 420 180" role="img" aria-label="Request travelling to the server, promise pending">
${V.ic('laptop',10,14,70,'ic-a')}${V.ic('server',340,14,70,'ic-info')}<path class="ln-d" d="M90 55H330"/>
<rect class="bx-a" x="140" y="38" width="140" height="34" rx="6"/><text class="t-m" x="210" y="61" text-anchor="middle" style="font-size:14px">GET /api/users</text>
<polygon class="ah-a" points="318,48 318,62 330,55"/>
${V.ic('clock',10,118,34,'ic-warn')}<text class="t-b" x="52" y="134">Promise: pending</text><text class="t-s" x="52" y="156">the page keeps working while it waits</text>
</svg>`],
 ['The server answers. <b>res</b> arrives with a status like <b>200 OK</b>. The body (the data) is still being read.',`<svg viewBox="0 0 420 180" role="img" aria-label="Response arrives">
${V.ic('laptop',10,14,70,'ic-a')}${V.ic('server',340,14,70,'ic-info')}<path class="ln-d" d="M90 55H330"/>
<rect class="bx-ok" x="140" y="38" width="140" height="34" rx="6"/><text class="t-m" x="210" y="61" text-anchor="middle" style="font-size:14px">200 OK</text>
<polygon class="ah-ok" points="102,48 102,62 90,55"/>
${V.ic('box',10,118,34,'ic-ok')}<text class="t-b" x="52" y="134">res: the response</text><text class="t-s" x="52" y="156">a parcel, still sealed</text>
</svg>`],
 ['<b>await res.json()</b> reads the body and turns the JSON text into a real JavaScript array of objects.',`<svg viewBox="0 0 420 180" role="img" aria-label="JSON becomes an array">
${V.ic('laptop',10,14,70,'ic-a')}${V.ic('server',340,14,70,'ic-info')}<path class="ln-d" d="M90 55H330"/>
<rect class="bx-ok" x="10" y="114" width="400" height="52" rx="8"/>
<text class="t-m" x="22" y="145" style="font-size:14px">[{ id: 1, name: 'Ada Lovelace' }, ...]</text>
</svg>`],
 ['A <b>for...of</b> loop makes an li for each user, sets its textContent and appends it. The names appear.',`<svg viewBox="0 0 420 180" role="img" aria-label="Three names shown on the page">
${V.ic('laptop',10,14,70,'ic-a')}${V.ic('server',340,14,70,'ic-info')}<path class="ln-d" d="M90 55H330"/>
<rect class="bx" x="10" y="114" width="400" height="52" rx="8"/>
<circle class="dot-m" cx="24" cy="140" r="3.5"/><text class="t" x="34" y="145">Ada Lovelace</text>
<circle class="dot-m" cx="152" cy="140" r="3.5"/><text class="t" x="162" y="145">Grace Hopper</text>
<circle class="dot-m" cx="284" cy="140" r="3.5"/><text class="t" x="294" y="145">Alan Turing</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('async function loadUsers()','await only works inside an async function (or a module)'),V.no('const users = res.json()','Forgot await: you get a Promise, not the data'),
 V.ok('if (!res.ok) ...','fetch does not fail on 404 or 500; check res.ok yourself'),V.no('defining loadUsers() and never calling it','A recipe nobody cooks'))}
${V.build(`<ol><li>Find the input, the Add button and the list with <code>querySelector</code>.</li><li>Write a function that trims the input, stops if it is empty, then creates, fills and appends an li, and clears the box.</li><li>Inside it, also create a Delete button whose click listener removes that li, and append it to the li.</li><li>Connect your function to the Add button's click.</li><li>Write an async function that fetches <code>/api/users</code>, reads the JSON and adds an li per name to <code>#users</code>. Call it.</li></ol>`)}
${V.hook(`Order, wait, unwrap: <code>await fetch</code>, then <code>await res.json()</code>.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What does <code>querySelector</code> return if nothing matches? <i>null.</i> 2. Why is <code>addEventListener('click', go())</code> wrong? <i>go() runs immediately; you must pass go itself.</i> 3. Does fetch throw an error on a 404? <i>No. Check res.ok.</i></div>
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
