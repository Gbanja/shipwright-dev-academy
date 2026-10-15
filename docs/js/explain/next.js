/* next: "Understand it" visual walkthroughs (nb1, n1-n8). */
{
/* CP: a dark code panel. lines are pre-escaped; act = index of the running line (-1 = none, all bright). */
const CP=(x,y,w,lines,act,fs,lh)=>{fs=fs||14;lh=lh||26;let s='<rect class="bx-dark" x="'+x+'" y="'+y+'" width="'+w+'" height="'+(lines.length*lh+14)+'" rx="8"/>';lines.forEach((l,i)=>{const ty=y+lh*(i+1);if(i===act)s+='<text class="t-a" x="'+(x+6)+'" y="'+ty+'" style="font-size:'+fs+'px">&#9654;</text>';s+='<text class="t-term'+(act>=0&&i!==act?' t-dim':'')+'" x="'+(x+(fs>14?28:24))+'" y="'+ty+'" style="font-size:'+fs+'px;white-space:pre">'+l+'</text>'});return s};
/* AR: a straight arrow from (x1,y1) to (x2,y2), horizontal or vertical, with class suffix '' | '-a' | '-ok'. */
const AR=(x1,y1,x2,y2,k)=>{k=k||'';let p;if(y1===y2){const d=x2>x1?1:-1;p=(x2)+','+y2+' '+(x2-12*d)+','+(y2-7)+' '+(x2-12*d)+','+(y2+7)}else{const d=y2>y1?1:-1;p=x2+','+y2+' '+(x2-7)+','+(y2-12*d)+' '+(x2+7)+','+(y2-12*d)}const ex=y1===y2?x2-10*(x2>x1?1:-1):x2,ey=y1===y2?y2:y2-10*(y2>y1?1:-1);return '<path class="ln'+k+'" d="M'+x1+' '+y1+'L'+ex+' '+ey+'"/><polygon class="ah'+k+'" points="'+p+'"/>'};

explain('nb1',`
<p>A price box on a shop website gives you the text <code>"5"</code>, not the number 5. Add 1 and JavaScript happily gives you <code>"51"</code>. TypeScript catches that kind of mistake while you type, before a single customer pays the wrong amount.</p>

${V.card(1,'Types','slots that only fit one shape',`
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="A shape sorter. The number slot takes 9.5, the string slot takes Dune, the boolean slot takes true, and the text 5 bounces off a number slot">
<circle class="bx-ok" cx="58" cy="44" r="30"/><text class="t-m" x="58" y="50" text-anchor="middle" style="font-size:17px">9.5</text>
<rect class="bx-ok" x="138" y="14" width="64" height="60" rx="4"/><text class="t-m" x="170" y="50" text-anchor="middle" style="font-size:16px">'Dune'</text>
<polygon class="bx-ok" points="282,12 318,74 246,74"/><text class="t-m" x="282" y="66" text-anchor="middle" style="font-size:15px">true</text>
<rect class="bx-bad" x="352" y="4" width="58" height="56" rx="4" transform="rotate(14 381 32)"/><text class="t-m" x="381" y="40" text-anchor="middle" style="font-size:17px">"5"</text>
${AR(58,80,58,104,'-ok')}${AR(170,80,170,104,'-ok')}${AR(282,80,282,104,'-ok')}
${V.ic('cross',366,70,30,'ic-bad')}
<rect class="bx" x="8" y="108" width="404" height="66" rx="10"/>
<circle class="bx-dark" cx="58" cy="141" r="24"/>
<rect class="bx-dark" x="146" y="118" width="48" height="46" rx="3"/>
<polygon class="bx-dark" points="282,116 308,164 256,164"/>
<circle class="bx-dark" cx="381" cy="141" r="24"/>
<text class="t-m" x="58" y="198" text-anchor="middle">number</text>
<text class="t-m" x="170" y="198" text-anchor="middle">string</text>
<text class="t-m" x="282" y="198" text-anchor="middle">boolean</text>
<text class="t-m" x="381" y="198" text-anchor="middle">number</text>
</svg><figcaption>Each type is a slot with a shape. A value only goes in if its shape matches. The text "5" is a string, so it will not fit a number slot, however much it looks like a number.</figcaption></figure>
${V.like(`<p>A toddler's shape sorter. The <b>type</b> is the shape of the hole and the <b>value</b> is the block. The <b>type checker</b> is the toy itself: a square block simply will not go through a round hole, so you find out straight away.</p>`)}
${V.why(`<p>JavaScript never checks what kind of value goes where, so mix-ups only show up when the code runs, often in front of users. In 2012 Microsoft released <b>TypeScript</b>: JavaScript plus <b>types</b>, labels saying what kind of value something may hold. A program called the <b>checker</b> reads your code before it runs and underlines every mismatch.</p>`)}
${V.anat([[1,'let'],' ',[2,'price'],[3,': number'],' ',[4,'= 9.5'],';'],[
 '<b>Keyword.</b> Same as JavaScript: <code>let</code> for a box you may refill, <code>const</code> for a sealed one.',
 '<b>Name.</b> The label on the box.',
 '<b>Type annotation.</b> A colon, then the type. It is the shape of the slot: <code>string</code> (text), <code>number</code> (any number, whole or decimal) or <code>boolean</code> (true or false).',
 '<b>Value.</b> Must fit the shape. If you leave the annotation out, TypeScript <b>infers</b> (works out) the type from this value.'])}
<p><b>Watch the checker work.</b> It reads your code like a teacher marking homework, before anything runs.</p>
${V.steps([
 ['You write a line. Nothing has run yet. The checker reads it and spots two things: a <b>number</b> slot and a value.',`<svg viewBox="0 0 420 180" role="img" aria-label="The line let count: number = &quot;5&quot; is read">
${CP(6,8,408,['let count: number = "5";'],0,16,30)}
<circle class="bx-dark" cx="90" cy="118" r="30"/><text class="t-s" x="90" y="170" text-anchor="middle">slot: number</text>
<rect class="bx-warn" x="270" y="88" width="62" height="60" rx="4"/><text class="t-m" x="301" y="124" text-anchor="middle" style="font-size:17px">"5"</text><text class="t-s" x="301" y="170" text-anchor="middle">value: string</text>
</svg>`],
 ['It tries the block in the slot. Quotes make <b>"5"</b> a string, a square block. The slot is round.',`<svg viewBox="0 0 420 180" role="img" aria-label="The string block is pushed towards the number slot">
${CP(6,8,408,['let count: number = "5";'],0,16,30)}
<circle class="bx-dark" cx="90" cy="118" r="30"/><text class="t-s" x="90" y="170" text-anchor="middle">slot: number</text>
<rect class="bx-warn" x="150" y="88" width="62" height="60" rx="4"/><text class="t-m" x="181" y="124" text-anchor="middle" style="font-size:17px">"5"</text>
${AR(146,118,126,118,'-a')}
</svg>`],
 ['No fit. The checker underlines the line in red with this message. Read it as: "you gave me text where I wanted a number".',`<svg viewBox="0 0 420 180" role="img" aria-label="Error: Type string is not assignable to type number">
${CP(6,8,408,['let count: number = "5";'],0,16,30)}
<path class="ln-x" d="M226 44Q233 49 240 44T254 44"/>
<circle class="bx-dark" cx="90" cy="118" r="30"/>
<rect class="bx-bad" x="150" y="88" width="62" height="60" rx="4"/><text class="t-m" x="181" y="124" text-anchor="middle" style="font-size:17px">"5"</text>
${V.ic('cross',234,98,40,'ic-bad')}
<text class="t-bad" x="8" y="172" style="font-size:14px">Type 'string' is not assignable to type 'number'.</text>
</svg>`],
 ['You remove the quotes. Now <b>5</b> is a number, a round block, and it drops straight in. No error.',`<svg viewBox="0 0 420 180" role="img" aria-label="let count: number = 5 fits">
${CP(6,8,408,['let count: number = 5;'],0,16,30)}
<circle class="bx-dark" cx="90" cy="118" r="30"/><circle class="bx-ok" cx="90" cy="118" r="26"/><text class="t-m" x="90" y="124" text-anchor="middle" style="font-size:18px">5</text>
${V.ic('check',150,96,44,'ic-ok')}<text class="t-ok" x="204" y="124" style="font-size:16px">0 errors</text>
</svg>`],
 ['When the code is built, TypeScript <b>removes every type</b> and hands plain JavaScript to the browser. Types only exist to help you while you write.',`<svg viewBox="0 0 420 180" role="img" aria-label="The build strips the type annotation">
${CP(6,8,408,['let count: number = 5;'],-1,16,30)}
${AR(210,58,210,94,'-a')}<text class="t-s" x="224" y="82">build</text>
${CP(6,98,408,['let count = 5;'],-1,16,30)}
<text class="t-s" x="8" y="172">browsers run this plain JavaScript</text>
</svg>`]])}
${V.rules(V.rh('Rules: break one and the checker complains'),
 V.no('price = \'cheap\'','Once price is a number, it stays a number'),V.ok('let n: number = 5','Numbers have no quotes'),
 V.no('let n: Number','Capital N is a different, rarely wanted thing. Use lowercase'),V.ok('string, number, boolean','The three basic types are all lowercase'),
 V.rh('Conventions: what professionals do'),
 V.ok('let price = 9.5','Let TypeScript infer the type when the value makes it obvious'),V.ok('let title: string','Annotate when there is no value yet, so the slot has a shape'))}
${V.hook(`Colon, then the shape: <code>name: type</code>. Wrong block, red line, before it ever runs.`)}
`)}

${V.card(2,'Arrays and object types','a form with labelled boxes',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A Product form with name and price boxes, and a filled-in copy for Dune, plus a tags list of strings">
<rect class="bx-info" x="8" y="10" width="190" height="122" rx="10"/><text class="t-b" x="22" y="36">type Product</text>
<text class="t-m" x="22" y="72">name</text><rect class="ln-d" x="82" y="54" width="104" height="26" rx="4"/><text class="t-s" x="134" y="72" text-anchor="middle">string</text>
<text class="t-m" x="22" y="112">price</text><rect class="ln-d" x="82" y="94" width="104" height="26" rx="4"/><text class="t-s" x="134" y="112" text-anchor="middle">number</text>
${AR(204,70,222,70,'-a')}
<rect class="bx-ok" x="228" y="10" width="184" height="122" rx="10"/><text class="t-b" x="242" y="36">book</text>
<text class="t-m" x="242" y="72">name</text><rect class="bx" x="300" y="54" width="100" height="26" rx="4"/><text class="t-m" x="350" y="72" text-anchor="middle">'Dune'</text>
<text class="t-m" x="242" y="112">price</text><rect class="bx" x="300" y="94" width="100" height="26" rx="4"/><text class="t-m" x="350" y="112" text-anchor="middle">9.5</text>
<text class="t-m" x="8" y="172">tags: string[]</text>
<rect class="bx" x="150" y="150" width="112" height="34" rx="5"/><text class="t-m" x="206" y="173" text-anchor="middle">'sci-fi'</text>
<rect class="bx" x="268" y="150" width="112" height="34" rx="5"/><text class="t-m" x="324" y="173" text-anchor="middle">'classic'</text>
</svg><figcaption>A type describes a shape: which labels an object has and what kind of value each one holds. string[] means "a list where every item is a string".</figcaption></figure>
${V.like(`<p>A blank passport form. The <b>type</b> is the printed form, with boxes for name and price. An <b>object</b> is one filled-in copy. Leave a box empty or write a word in the number box, and the form is rejected.</p>`)}
${V.anat([[1,'type'],' ',[2,'Product'],' = {\n  ',[3,'name'],[4,': string'],';\n  price: number;\n}'],[
 '<b>type</b> means "I am describing a shape". <code>interface Product { … }</code> does almost the same job.',
 '<b>Name of the shape.</b> Starts with a capital letter by convention: <code>Product</code>, <code>User</code>.',
 '<b>Property.</b> One label every Product must have.',
 '<b>Its type.</b> What kind of value goes in that box.'])}
${V.rules(V.rh('Rules'),
 V.no('{ name: \'Dune\' }','Missing price: every listed property is required'),V.no('{ name: \'Dune\', price: 9.5, pages: 412 }','pages is not on the form, so it is rejected'),
 V.ok('string[]','A list of strings. number[] is a list of numbers'),V.no('const book: product','Type names are case-sensitive: Product, not product'),
 V.rh('Conventions'),V.ok('type Product, interface User','PascalCase for type names, camelCase for values'))}
${V.hook(`A type is the blank form, an object is a filled-in copy, <code>[]</code> means "a list of".`)}
`)}

${V.card(3,'Typed functions','labelled inputs, a labelled output',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A machine withTax with two number inputs and a number output: 100 and 0.2 go in, 120 comes out">
<rect class="bx-info" x="6" y="26" width="86" height="40" rx="6"/><text class="t-m" x="49" y="52" text-anchor="middle" style="font-size:17px">100</text><text class="t-s" x="49" y="18" text-anchor="middle">price: number</text>
<rect class="bx-info" x="6" y="100" width="86" height="40" rx="6"/><text class="t-m" x="49" y="126" text-anchor="middle" style="font-size:17px">0.2</text><text class="t-s" x="49" y="160" text-anchor="middle">rate: number</text>
<path class="ln-a" d="M96 46L130 62M96 120L130 104"/>
<rect class="bx-a" x="134" y="30" width="150" height="110" rx="10"/>${V.ic('gear',182,40,54,'ic-a')}<text class="t-m" x="209" y="122" text-anchor="middle">withTax</text>
${AR(288,85,326,85,'-ok')}
<rect class="bx-ok" x="330" y="64" width="84" height="42" rx="6"/><text class="t-m" x="372" y="91" text-anchor="middle" style="font-size:17px">120</text><text class="t-s" x="372" y="128" text-anchor="middle">: number</text>
</svg><figcaption>A typed function says what shape each input must be and what shape comes out. Callers cannot feed it the wrong thing.</figcaption></figure>
${V.anat([[1,'function'],' ',[2,'withTax'],'(',[3,'price: number'],', rate: number)',[4,': number'],' {\n  return price * (1 + rate);\n}'],[
 '<b>Keyword.</b> Defines a function, as in JavaScript.',
 '<b>Name.</b> A verb that says what it does.',
 '<b>Parameter with its type.</b> Every input gets a colon and a type.',
 '<b>Return type.</b> After the closing bracket: the shape of the answer. If the body returns anything else, the checker objects.'])}
<p><b>Optional inputs.</b> Put <code>?</code> before the colon and the caller may leave it out. Then <code>??</code> picks a fallback: "use the right side if the left side is missing".</p>
${V.steps([
 ['<b>greet()</b> is called with nothing. The optional parameter <b>name</b> gets the special value <b>undefined</b>, which means "nothing here".',`<svg viewBox="0 0 420 170" role="img" aria-label="greet() leaves name undefined">
${CP(6,8,408,['function greet(name?: string): string {',"  return 'Hello, ' + (name ?? 'friend') + '!';"],-1,13,26)}
<text class="t-m" x="8" y="110" style="font-size:17px">greet()</text>
<text class="t-m" x="150" y="110">name</text><rect class="bx" x="200" y="88" width="140" height="32" rx="5"/><text class="t-m t-dim" x="270" y="110" text-anchor="middle">undefined</text>
</svg>`],
 ['<b>name ?? \'friend\'</b>: the left side is missing, so <b>??</b> takes the right side.',`<svg viewBox="0 0 420 170" role="img" aria-label="?? picks friend">
${CP(6,8,408,['function greet(name?: string): string {',"  return 'Hello, ' + (name ?? 'friend') + '!';"],1,13,26)}
<text class="t-m" x="8" y="110" style="font-size:17px">greet()</text>
<text class="t-m t-dim" x="150" y="110">undefined</text><text class="t-m" x="250" y="110">??</text><text class="t-m t-ok" x="290" y="110" style="font-weight:700">'friend'</text>
<text class="t-m" x="8" y="156" style="font-size:17px">→ 'Hello, friend!'</text>
</svg>`],
 ['<b>greet(\'Ada\')</b>: now name holds \'Ada\', so <b>??</b> keeps the left side.',`<svg viewBox="0 0 420 170" role="img" aria-label="greet Ada gives Hello, Ada!">
${CP(6,8,408,['function greet(name?: string): string {',"  return 'Hello, ' + (name ?? 'friend') + '!';"],1,13,26)}
<text class="t-m" x="8" y="110" style="font-size:17px">greet('Ada')</text>
<text class="t-m t-ok" x="150" y="110" style="font-weight:700">'Ada'</text><text class="t-m" x="210" y="110">??</text><text class="t-m t-dim" x="250" y="110">'friend'</text>
<text class="t-m" x="8" y="156" style="font-size:17px">→ 'Hello, Ada!'</text>
</svg>`]])}
${V.rules(V.no('withTax(\'100\', 0.2)','Text where a number belongs: red line'),V.ok('withTax(100, 0.2)','Both inputs fit their slots'),
 V.no('function f(a?: string, b: string)','Optional parameters must come last'),V.ok('(name?: string)','? goes before the colon'))}
${V.build(`<ol><li>Fix the starter's error: a number has no quotes.</li><li>Declare a string, a number and a boolean, each with a colon and its type.</li><li>Write a function whose two inputs and return value are all typed <code>number</code>.</li><li>Describe a Product shape with <code>type</code>, then make one object and one <code>string[]</code> list.</li><li>Write a greeting with an optional name and a <code>??</code> fallback. Run until there are zero errors.</li></ol>`)}
${V.hook(`Type the inputs, type the output, and <code>?</code> means "you may leave this out".`)}
`)}

<div class="try"><b>Try it in your head</b>1. Is <code>let n: number = "7"</code> allowed? <i>No: "7" is a string because of the quotes.</i> 2. What type is <code>['a', 'b']</code>? <i>string[].</i> 3. When are the types checked? <i>While you write and build, before the code runs. The browser never sees them.</i></div>
`);

explain('n1',`
<p>Big apps have thousands of functions passing data to each other. TypeScript lets you describe that data once, then checks every hand-over for you. Three tools do most of the work: shapes, generics and narrowing.</p>

${V.card(1,'Interfaces and typed functions','a checklist every item must pass',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="An Item checklist with name, price and qty. Two parcels pass, one with a price written as text fails">
<rect class="bx-info" x="6" y="10" width="134" height="150" rx="10"/>${V.ic('list',14,18,26,'ic-info')}<text class="t-b" x="46" y="37">Item</text>
<text class="t-m" x="16" y="78" style="font-size:14px">name: string</text>
<text class="t-m" x="16" y="108" style="font-size:14px">price: number</text>
<text class="t-m" x="16" y="138" style="font-size:14px">qty: number</text>
<rect class="bx-ok" x="150" y="50" width="82" height="110" rx="8"/><text class="t-m" x="191" y="78" text-anchor="middle">'Pen'</text><text class="t-m" x="191" y="108" text-anchor="middle">2</text><text class="t-m" x="191" y="138" text-anchor="middle">3</text>
<rect class="bx-bad" x="240" y="50" width="82" height="110" rx="8"/><text class="t-m" x="281" y="78" text-anchor="middle">'Book'</text><text class="t-m t-bad" x="281" y="108" text-anchor="middle" style="font-weight:700">'12'</text><text class="t-m" x="281" y="138" text-anchor="middle">1</text>
<rect class="bx-ok" x="330" y="50" width="82" height="110" rx="8"/><text class="t-m" x="371" y="78" text-anchor="middle">'Mug'</text><text class="t-m" x="371" y="108" text-anchor="middle">8</text><text class="t-m" x="371" y="138" text-anchor="middle">2</text>
${V.ic('check',177,14,28,'ic-ok')}${V.ic('cross',267,14,28,'ic-bad')}${V.ic('check',357,14,28,'ic-ok')}
<text class="t" x="210" y="182" text-anchor="middle">price '12' is text, not a number</text>
</svg><figcaption>An interface is a checklist. Every object that claims to be an Item must have each listed property, with the right kind of value.</figcaption></figure>
${V.like(`<p>A warehouse checklist taped to the conveyor belt: every parcel needs a name, a price and a quantity, and the price must be a number. The checker is the inspector who reads the checklist and stops the faulty parcel before it is shipped.</p>`)}
${V.why(`<p>In plain JavaScript a function has no idea what it will be handed. Someone passes <code>'12'</code> instead of <code>12</code> and <code>'12' * 1</code> quietly works while <code>'12' + 1</code> quietly gives <code>'121'</code>. Describing the shape once means every function that uses it is checked automatically.</p>`)}
${V.anat([[1,'function'],' ',[2,'total'],'(',[3,'items: Item[]'],')',[4,': number'],' { … }'],[
 '<b>Keyword.</b> Defines a function.',
 '<b>Name.</b> What it works out.',
 '<b>Typed parameter.</b> <code>Item[]</code> means "a list of things that pass the Item checklist".',
 '<b>Return type.</b> Promises a number comes back. Return text by mistake and you get a red line.'])}
${V.steps([
 ['The checker walks along the cart. Parcel 0 has a text name, a number price and a number qty. It passes.',`<svg viewBox="0 0 420 190" role="img" aria-label="Item 0 passes">
<rect class="bx-info" x="6" y="10" width="134" height="150" rx="10"/><text class="t-b" x="16" y="37">Item</text>
<text class="t-m" x="16" y="78" style="font-size:14px">name: string</text><text class="t-m" x="16" y="108" style="font-size:14px">price: number</text><text class="t-m" x="16" y="138" style="font-size:14px">qty: number</text>
<rect class="bx-hl" x="150" y="50" width="82" height="110" rx="8"/><text class="t-m" x="191" y="78" text-anchor="middle">'Pen'</text><text class="t-m" x="191" y="108" text-anchor="middle">2</text><text class="t-m" x="191" y="138" text-anchor="middle">3</text>
<rect class="bx" x="240" y="50" width="82" height="110" rx="8"/><text class="t-m" x="281" y="78" text-anchor="middle">'Book'</text><text class="t-m" x="281" y="108" text-anchor="middle">'12'</text><text class="t-m" x="281" y="138" text-anchor="middle">1</text>
<rect class="bx" x="330" y="50" width="82" height="110" rx="8"/><text class="t-m" x="371" y="78" text-anchor="middle">'Mug'</text><text class="t-m" x="371" y="108" text-anchor="middle">8</text><text class="t-m" x="371" y="138" text-anchor="middle">2</text>
<text class="t-s" x="150" y="34">cart[0]</text>${V.ic('check',204,14,26,'ic-ok')}
</svg>`],
 ['Parcel 1: its price is <b>\'12\'</b> in quotes, which is a string. The checklist says number, so the checker stops here with a red line.',`<svg viewBox="0 0 420 190" role="img" aria-label="Item 1 fails: price is a string">
<rect class="bx-info" x="6" y="10" width="134" height="150" rx="10"/><text class="t-b" x="16" y="37">Item</text>
<text class="t-m" x="16" y="78" style="font-size:14px">name: string</text><text class="t-m t-bad" x="16" y="108" style="font-size:14px;font-weight:700">price: number</text><text class="t-m" x="16" y="138" style="font-size:14px">qty: number</text>
<rect class="bx-ok" x="150" y="50" width="82" height="110" rx="8"/><text class="t-m" x="191" y="78" text-anchor="middle">'Pen'</text><text class="t-m" x="191" y="108" text-anchor="middle">2</text><text class="t-m" x="191" y="138" text-anchor="middle">3</text>
<rect class="bx-bad" x="240" y="50" width="82" height="110" rx="8"/><text class="t-m" x="281" y="78" text-anchor="middle">'Book'</text><text class="t-m t-bad" x="281" y="108" text-anchor="middle" style="font-weight:700">'12'</text><text class="t-m" x="281" y="138" text-anchor="middle">1</text>
<rect class="bx" x="330" y="50" width="82" height="110" rx="8"/><text class="t-m" x="371" y="78" text-anchor="middle">'Mug'</text><text class="t-m" x="371" y="108" text-anchor="middle">8</text><text class="t-m" x="371" y="138" text-anchor="middle">2</text>
<text class="t-s" x="240" y="34">cart[1]</text>${V.ic('cross',294,14,26,'ic-bad')}
<text class="t-bad" x="6" y="182" style="font-size:14px">Type 'string' is not assignable to type 'number'.</text>
</svg>`],
 ['Remove the quotes and every parcel passes. Now <b>total(cart)</b> can trust the data: 2×3 + 12×1 + 8×2 = <b>34</b>, and it is typed as a number.',`<svg viewBox="0 0 420 190" role="img" aria-label="All items pass and total is 34">
<rect class="bx-info" x="6" y="10" width="134" height="150" rx="10"/><text class="t-b" x="16" y="37">Item</text>
<text class="t-m" x="16" y="78" style="font-size:14px">name: string</text><text class="t-m" x="16" y="108" style="font-size:14px">price: number</text><text class="t-m" x="16" y="138" style="font-size:14px">qty: number</text>
<rect class="bx-ok" x="150" y="50" width="82" height="110" rx="8"/><text class="t-m" x="191" y="78" text-anchor="middle">'Pen'</text><text class="t-m" x="191" y="108" text-anchor="middle">2</text><text class="t-m" x="191" y="138" text-anchor="middle">3</text>
<rect class="bx-ok" x="240" y="50" width="82" height="110" rx="8"/><text class="t-m" x="281" y="78" text-anchor="middle">'Book'</text><text class="t-m t-ok" x="281" y="108" text-anchor="middle" style="font-weight:700">12</text><text class="t-m" x="281" y="138" text-anchor="middle">1</text>
<rect class="bx-ok" x="330" y="50" width="82" height="110" rx="8"/><text class="t-m" x="371" y="78" text-anchor="middle">'Mug'</text><text class="t-m" x="371" y="108" text-anchor="middle">8</text><text class="t-m" x="371" y="138" text-anchor="middle">2</text>
<text class="t-m" x="6" y="184" style="font-size:16px">total(cart)</text><text class="t-m t-ok" x="130" y="184" style="font-size:16px;font-weight:700">→ 34</text><text class="t-s" x="196" y="184">: number</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('interface Item { name: string; price: number }','Properties are separated by ; or ,'),V.no('const x: item','Names are case-sensitive: Item and item are different'),
 V.no('function total(items) { … }','In strict mode a parameter with no type is an error: "implicitly has an any type"'),V.ok('function total(items: Item[]): number','Type the inputs and the output'),
 V.rh('Conventions'),V.ok('interface Item','PascalCase for type and interface names'),V.ok('Type the edges','Parameters, return values, props and API data. Let TypeScript infer the variables inside'))}
${V.hook(`Describe the shape once, and every hand-over gets checked.`)}
`)}

${V.card(2,'Generics','a container that remembers what you put in',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="A jar with a blank label T, then three jars labelled string, number and User">
<rect class="bx-a" x="10" y="44" width="92" height="110" rx="14"/><rect class="bx-a" x="22" y="30" width="68" height="18" rx="4"/>
<rect class="bx" x="22" y="78" width="68" height="40" rx="4"/><text class="t-m t-a" x="56" y="105" text-anchor="middle" style="font-size:22px;font-weight:700">T</text>
<text class="t-s" x="56" y="176" text-anchor="middle">blank label</text>
${AR(108,99,132,99,'-a')}
<rect class="bx-ok" x="138" y="44" width="84" height="110" rx="14"/><rect class="bx-ok" x="150" y="30" width="60" height="18" rx="4"/>
<rect class="bx" x="146" y="58" width="68" height="28" rx="4"/><text class="t-m" x="180" y="78" text-anchor="middle" style="font-size:14px">string</text><text class="t-m" x="180" y="126" text-anchor="middle">'Ada'</text>
<rect class="bx-ok" x="232" y="44" width="84" height="110" rx="14"/><rect class="bx-ok" x="244" y="30" width="60" height="18" rx="4"/>
<rect class="bx" x="240" y="58" width="68" height="28" rx="4"/><text class="t-m" x="274" y="78" text-anchor="middle" style="font-size:14px">number</text><text class="t-m" x="274" y="126" text-anchor="middle">42</text>
<rect class="bx-ok" x="326" y="44" width="84" height="110" rx="14"/><rect class="bx-ok" x="338" y="30" width="60" height="18" rx="4"/>
<rect class="bx" x="334" y="58" width="68" height="28" rx="4"/><text class="t-m" x="368" y="78" text-anchor="middle" style="font-size:14px">User</text>${V.ic('person',350,96,36,'ic-ok')}
<text class="t-s" x="274" y="176" text-anchor="middle">label filled in when used</text>
</svg><figcaption>A generic is a container with a blank label, called T. Each time you use it, TypeScript writes the real type on the label, so it never forgets what is inside.</figcaption></figure>
${V.like(`<p>A school lunchbox with a blank name sticker. It works for anyone, and the moment Ada uses it her name goes on the sticker. Whoever opens it later knows exactly whose lunch it is.</p>`)}
${V.why(`<p>Some functions work on any kind of list, like "give me the first item". Without generics you would write one version for strings, one for numbers and one for users, or use <code>any</code>, which switches checking off. A generic writes the function once and keeps the type information flowing through.</p>`)}
${V.anat(['function first',[1,'&lt;T&gt;'],'(list: ',[2,'T[]'],')',[3,': T | undefined'],' {\n  return list[0];\n}'],[
 '<b>Type parameter.</b> A placeholder type, written in angle brackets. <code>T</code> is short for Type.',
 '<b>Uses T.</b> "A list of whatever T turns out to be."',
 '<b>Return type.</b> Either one T, or <code>undefined</code> when the list is empty. The <code>|</code> means "or".'])}
${V.steps([
 ['You call <b>first</b> with a list of names. TypeScript looks at what you passed in.',`<svg viewBox="0 0 420 180" role="img" aria-label="first called with Ada and Bob">
${CP(6,8,408,['function first&lt;T&gt;(list: T[]): T | undefined'],-1,13,26)}
<text class="t-m" x="8" y="86" style="font-size:17px">first(['Ada', 'Bob'])</text>
<rect class="bx-a" x="300" y="64" width="90" height="100" rx="14"/><rect class="bx" x="310" y="76" width="70" height="32" rx="4"/><text class="t-m t-a" x="345" y="99" text-anchor="middle" style="font-weight:700">T</text>
</svg>`],
 ['Both items are strings, so it <b>infers</b> that T is <b>string</b> and writes it on the label. You did not have to say so.',`<svg viewBox="0 0 420 180" role="img" aria-label="T becomes string">
${CP(6,8,408,['function first&lt;T&gt;(list: T[]): T | undefined'],-1,13,26)}
<text class="t-m" x="8" y="86" style="font-size:17px">first(['Ada', 'Bob'])</text>
<text class="t" x="8" y="130">T = <tspan class="t-ok" style="font-weight:700">string</tspan></text>
<rect class="bx-ok" x="300" y="64" width="90" height="100" rx="14"/><rect class="bx" x="310" y="76" width="70" height="32" rx="4"/><text class="t-m" x="345" y="98" text-anchor="middle" style="font-size:14px">string</text>
</svg>`],
 ['The answer comes back typed as <b>string | undefined</b>. Your editor now knows <b>.toUpperCase()</b> exists on it, once you have checked it is not undefined.',`<svg viewBox="0 0 420 180" role="img" aria-label="Result is Ada, typed string or undefined">
${CP(6,8,408,['function first&lt;T&gt;(list: T[]): T | undefined'],-1,13,26)}
<text class="t-m" x="8" y="86" style="font-size:17px">first(['Ada', 'Bob'])</text>
<text class="t-m t-ok" x="8" y="130" style="font-size:17px;font-weight:700">→ 'Ada'</text><text class="t-s" x="8" y="156">type: string | undefined</text>
<rect class="bx-ok" x="300" y="64" width="90" height="100" rx="14"/><rect class="bx" x="310" y="76" width="70" height="32" rx="4"/><text class="t-m" x="345" y="98" text-anchor="middle" style="font-size:14px">string</text><text class="t-m" x="345" y="146" text-anchor="middle">'Ada'</text>
</svg>`],
 ['Call it with an empty list of numbers. T is <b>number</b>, but there is no first item, so you get <b>undefined</b>. That is why the return type says <b>| undefined</b>.',`<svg viewBox="0 0 420 180" role="img" aria-label="Empty list gives undefined">
${CP(6,8,408,['function first&lt;T&gt;(list: T[]): T | undefined'],-1,13,26)}
<text class="t-m" x="8" y="86" style="font-size:17px">first([] as number[])</text>
<text class="t-m t-warn" x="8" y="130" style="font-size:17px;font-weight:700">→ undefined</text>
<rect class="bx-warn" x="300" y="64" width="90" height="100" rx="14"/><rect class="bx" x="310" y="76" width="70" height="32" rx="4"/><text class="t-m" x="345" y="98" text-anchor="middle" style="font-size:14px">number</text><text class="t-s" x="345" y="146" text-anchor="middle">empty</text>
</svg>`]])}
${V.rules(V.no('function first(list: any[]): any','any tears the label off: nothing is checked any more'),V.ok('function first&lt;T&gt;(list: T[]): T | undefined','The label travels from input to output'),
 V.no('function first(list: T[])','T must be declared in &lt;T&gt; before you use it'),V.ok('&lt;T&gt;, &lt;TItem&gt;','Convention: a single capital T, or a name starting with T'))}
${V.hook(`<code>&lt;T&gt;</code> is a blank label: fill it on the way in, read it on the way out.`)}
`)}

${V.card(3,'Unions and narrowing','one of two shapes, and an if that tells them apart',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="A Result is either an ok card with a value or a failed card with an error">
<rect class="bx" x="140" y="8" width="140" height="44" rx="8"/><text class="t-m" x="210" y="37" text-anchor="middle" style="font-size:17px">Result</text>
<path class="ln-d" d="M180 52 100 84M240 52 320 84"/><text class="t-b" x="210" y="80" text-anchor="middle">either / or</text>
<rect class="bx-ok" x="6" y="88" width="196" height="84" rx="10"/>${V.ic('check',14,96,30,'ic-ok')}<text class="t-m" x="52" y="118" style="font-size:14px">ok: true</text><text class="t-m" x="22" y="154" style="font-size:14px">value: number</text>
<rect class="bx-bad" x="218" y="88" width="196" height="84" rx="10"/>${V.ic('cross',226,96,30,'ic-bad')}<text class="t-m" x="264" y="118" style="font-size:14px">ok: false</text><text class="t-m" x="234" y="154" style="font-size:14px">error: string</text>
</svg><figcaption>A union type says "this is one of these shapes". The ok field is the tag that tells you which one you are holding.</figcaption></figure>
${V.like(`<p>An exam result envelope. Inside is either a pass slip with your mark or a fail slip with a reason. You read the first word, <b>PASS</b> or <b>FAIL</b>, and only then know which other line to look for.</p>`)}
${V.anat([[1,'type'],' Result =\n  ',[2,'{ ok: true; value: number }'],'\n  ',[3,'|'],' ',[2,'{ ok: false; error: string }'],';'],[
 '<b>A type alias.</b> Gives the union a name.',
 '<b>The shapes.</b> Each has the same field <code>ok</code>, but with a different fixed value. That field is the <b>discriminant</b>: the tag that tells them apart.',
 '<b>Union bar.</b> <code>|</code> means "or".'])}
<p><b>Watch narrowing happen.</b> Narrowing means TypeScript shrinks the possible shapes as your <code>if</code> checks rule some out.</p>
${V.steps([
 ['Before any check, <b>r</b> could be either shape. Ask for <b>r.value</b> and you get a red line: the fail shape has no value.',`<svg viewBox="0 0 420 190" role="img" aria-label="Both shapes possible, r.value is an error">
<text class="t-m" x="8" y="28" style="font-size:16px">r.value</text>${V.ic('cross',90,8,26,'ic-bad')}<text class="t-bad" x="124" y="28" style="font-size:14px">Property 'value' does not exist</text>
<rect class="bx-ok" x="6" y="52" width="196" height="84" rx="10"/><text class="t-m" x="22" y="84" style="font-size:14px">ok: true</text><text class="t-m" x="22" y="118" style="font-size:14px">value: number</text>
<rect class="bx-bad" x="218" y="52" width="196" height="84" rx="10"/><text class="t-m" x="234" y="84" style="font-size:14px">ok: false</text><text class="t-m" x="234" y="118" style="font-size:14px">error: string</text>
<text class="t" x="210" y="172" text-anchor="middle">r: Result (could be either)</text>
</svg>`],
 ['<b>if (r.ok)</b> asks the tag. Inside the true branch, only the pass shape is left, so <b>r.value</b> is allowed and is a number.',`<svg viewBox="0 0 420 190" role="img" aria-label="Inside if r.ok only the ok shape remains">
<text class="t-m" x="8" y="28" style="font-size:16px">if (r.ok) { r.value }</text>${V.ic('check',220,8,26,'ic-ok')}
<rect class="bx-hl" x="6" y="52" width="196" height="84" rx="10"/><text class="t-m" x="22" y="84" style="font-size:14px">ok: true</text><text class="t-m" x="22" y="118" style="font-size:14px">value: number</text>
<rect class="bx" x="218" y="52" width="196" height="84" rx="10" style="opacity:.35"/><text class="t-m t-dim" x="234" y="84" style="font-size:14px">ok: false</text><text class="t-m t-dim" x="234" y="118" style="font-size:14px">error: string</text><path class="ln-x" d="M226 60 406 128"/>
<text class="t" x="210" y="172" text-anchor="middle">narrowed to the ok shape</text>
</svg>`],
 ['In the <b>else</b> branch the opposite is true: only the fail shape is left, so <b>r.error</b> is allowed.',`<svg viewBox="0 0 420 190" role="img" aria-label="In else only the error shape remains">
<text class="t-m" x="8" y="28" style="font-size:16px">else { r.error }</text>${V.ic('check',176,8,26,'ic-ok')}
<rect class="bx" x="6" y="52" width="196" height="84" rx="10" style="opacity:.35"/><text class="t-m t-dim" x="22" y="84" style="font-size:14px">ok: true</text><text class="t-m t-dim" x="22" y="118" style="font-size:14px">value: number</text><path class="ln-x" d="M14 60 194 128"/>
<rect class="bx-hl" x="218" y="52" width="196" height="84" rx="10"/><text class="t-m" x="234" y="84" style="font-size:14px">ok: false</text><text class="t-m" x="234" y="118" style="font-size:14px">error: string</text>
<text class="t" x="210" y="172" text-anchor="middle">narrowed to the error shape</text>
</svg>`],
 ['Put together, a describe function gives a sensible sentence for each shape, and TypeScript has checked both paths.',`<svg viewBox="0 0 420 190" role="img" aria-label="Value: 5 for ok, Error: boom for failure">
<rect class="bx-ok" x="6" y="52" width="196" height="84" rx="10"/><text class="t-m" x="22" y="84" style="font-size:14px">{ ok: true,</text><text class="t-m" x="22" y="118" style="font-size:14px">  value: 5 }</text>
<rect class="bx-bad" x="218" y="52" width="196" height="84" rx="10"/><text class="t-m" x="234" y="84" style="font-size:14px">{ ok: false,</text><text class="t-m" x="234" y="118" style="font-size:14px">  error: 'boom' }</text>
<text class="t-m t-ok" x="104" y="172" text-anchor="middle" style="font-size:16px">"Value: 5"</text><text class="t-m t-bad" x="316" y="172" text-anchor="middle" style="font-size:16px">"Error: boom"</text>
</svg>`]])}
${V.rules(V.ok('ok: true / ok: false','The tag must be a fixed literal value, not just boolean'),V.no('r.value before checking','Not allowed until an if has ruled out the error shape'),
 V.ok('typeof x === \'string\'','Narrowing works with typeof checks too'),V.ok('if (item !== undefined)','The usual way to handle T | undefined'))}
${V.build(`<ol><li>Find the value that is in quotes but should be a number, and fix it.</li><li>Give <code>total</code> a typed parameter (a list of Item) and a number return type, and add up price times qty.</li><li>Write <code>first</code> with <code>&lt;T&gt;</code>, returning <code>list[0]</code>.</li><li>In <code>describe</code>, check <code>r.ok</code> first, then use <code>r.value</code> in one branch and <code>r.error</code> in the other.</li><li>Run until the output shows zero type errors.</li></ol>`)}
${V.hook(`Check the tag, and the type narrows: <code>if (r.ok)</code> opens one envelope at a time.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What type does <code>first([1, 2, 3])</code> return? <i>number | undefined.</i> 2. Why does <code>r.error</code> fail inside <code>if (r.ok)</code>? <i>Inside that branch r can only be the ok shape, which has no error.</i> 3. What does <code>any</code> do to checking? <i>Switches it off for that value.</i></div>
`);

explain('n2',`
<p>Components are passed props all day long, often by teammates who did not write them. Typed props turn every component into a form with printed boxes: your editor fills in the options for you and flags the wrong ones as you type.</p>

${V.card(1,'Typed props','an order form with tick boxes',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A ButtonProps order form with label, onClick and an optional variant of primary or ghost, producing a solid Save button and an outlined Reset button">
<rect class="bx-info" x="6" y="8" width="222" height="184" rx="10"/>${V.ic('list',16,16,26,'ic-info')}<text class="t-b" x="50" y="35">ButtonProps</text>
<text class="t-m" x="18" y="70" style="font-size:14px">label: string</text>
<text class="t-m" x="18" y="98" style="font-size:14px">onClick: () =&gt; void</text>
<text class="t-m t-a" x="18" y="128" style="font-size:14px">variant?</text><text class="t-s" x="104" y="128">(optional)</text>
<rect class="bx" x="20" y="142" width="16" height="16" rx="3"/><text class="t-m" x="44" y="156" style="font-size:14px">'primary'</text>
<rect class="bx" x="20" y="166" width="16" height="16" rx="3"/><text class="t-m" x="44" y="180" style="font-size:14px">'ghost'</text>
<text class="t-s" x="130" y="168">only these two</text>
${AR(234,100,262,100,'-a')}
<rect class="bx-a" x="272" y="44" width="136" height="48" rx="10"/><text class="t-b" x="340" y="74" text-anchor="middle">Save</text>
<rect class="bx" x="272" y="110" width="136" height="48" rx="10"/><text class="t-b" x="340" y="140" text-anchor="middle">Reset</text>
<text class="t-s" x="340" y="34" text-anchor="middle">primary</text><text class="t-s" x="340" y="178" text-anchor="middle">ghost</text>
</svg><figcaption>An interface lists the props a component accepts. The question mark makes a prop optional, and a union of exact strings means only those options exist.</figcaption></figure>
${V.like(`<p>A café order slip. "Name" and "Drink" are required boxes, and "Milk" is an optional tick box with exactly two choices printed. You cannot tick "custard", because there is no box for it.</p>`)}
${V.why(`<p>In plain React a typo like <code>lable="Save"</code> or a missing <code>onClick</code> only shows up as a broken button in the browser. With typed props the editor autocompletes the right names and underlines mistakes at once, which is why most React codebases in 2026 are written in TypeScript (<code>.tsx</code> files).</p>`)}
${V.anat(['function Button(',[1,'{ label, onClick, variant'],[2," = 'primary'"],' }',[3,': ButtonProps'],')'],[
 '<b>Destructuring.</b> Unpacks the props object into separate variables.',
 '<b>Default value.</b> Used when the caller leaves the optional prop out.',
 '<b>The props type.</b> Annotates the one parameter React passes in: the whole props object.'])}
${V.steps([
 ['You use the component with both required props. The checker compares them with the form: both boxes filled. A solid Save button renders.',`<svg viewBox="0 0 420 170" role="img" aria-label="Correct usage renders Save">
${CP(6,8,408,['&lt;Button label="Save" onClick={save} /&gt;'],0,14,30)}
${V.ic('check',10,62,32,'ic-ok')}<text class="t-ok" x="50" y="84" style="font-size:15px">0 errors</text>
<rect class="bx-a" x="250" y="64" width="150" height="50" rx="10"/><text class="t-b" x="325" y="95" text-anchor="middle">Save</text>
</svg>`],
 ['Forget <b>onClick</b> and the editor underlines the tag at once. A required box on the form is empty.',`<svg viewBox="0 0 420 170" role="img" aria-label="Missing onClick error">
${CP(6,8,408,['&lt;Button label="Save" /&gt;'],0,14,30)}
${V.ic('cross',10,62,32,'ic-bad')}<text class="t-bad" x="50" y="84" style="font-size:14px">Property 'onClick' is missing in type</text>
<text class="t-bad" x="50" y="106" style="font-size:14px">'{ label: string; }' but required</text>
<text class="t-bad" x="50" y="128" style="font-size:14px">in type 'ButtonProps'.</text>
</svg>`],
 ['Try <b>variant="danger"</b>. There is no "danger" tick box, so it is rejected and the message lists the allowed values.',`<svg viewBox="0 0 420 170" role="img" aria-label="danger is not an allowed variant">
${CP(6,8,408,['&lt;Button … variant="danger" /&gt;'],0,14,30)}
${V.ic('cross',10,62,32,'ic-bad')}<text class="t-bad" x="50" y="84" style="font-size:14px">Type '"danger"' is not assignable to</text>
<text class="t-bad" x="50" y="106" style="font-size:14px">type '"primary" | "ghost" | undefined'.</text>
</svg>`],
 ['<b>variant="ghost"</b> is on the form. It is accepted and the outlined Reset button renders.',`<svg viewBox="0 0 420 170" role="img" aria-label="ghost variant renders Reset">
${CP(6,8,408,['&lt;Button … variant="ghost" /&gt;'],0,14,30)}
${V.ic('check',10,62,32,'ic-ok')}<text class="t-ok" x="50" y="84" style="font-size:15px">0 errors</text>
<rect class="bx" x="250" y="64" width="150" height="50" rx="10"/><text class="t-b" x="325" y="95" text-anchor="middle">Reset</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('function Button(props: string)','React passes ONE object of props, so type the whole object'),V.ok('({ label }: ButtonProps)','Destructure, then annotate the object'),
 V.no('variant?: string','Too loose: any text is accepted, typos included'),V.ok("variant?: 'primary' | 'ghost'",'A union of exact strings lists every allowed value'),
 V.rh('Conventions'),V.ok('ButtonProps','Name the props type after the component plus "Props"'),V.ok('onClick: () =&gt; void','A function that takes nothing and returns nothing useful'))}
${V.hook(`Props are a form: required boxes, optional <code>?</code> boxes, and tick boxes made of <code>'a' | 'b'</code>.`)}
`)}

${V.card(2,'Generic components and typed state','one list machine for any kind of item',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="User items go into a List machine, which stamps each one with render and outputs list rows">
${V.ic('person',10,20,40,'ic-info')}${V.ic('person',10,70,40,'ic-info')}${V.ic('person',10,120,40,'ic-info')}
<text class="t-m" x="58" y="46" style="font-size:14px">Ada</text><text class="t-m" x="58" y="96" style="font-size:14px">Linus</text><text class="t-m" x="58" y="146" style="font-size:14px">Grace</text>
<text class="t-s" x="10" y="174">items: User[]</text>
${AR(112,90,140,90,'-a')}
<rect class="bx-a" x="146" y="30" width="128" height="120" rx="10"/>${V.ic('gear',184,40,52,'ic-a')}<text class="t-m" x="210" y="114" text-anchor="middle">List&lt;T&gt;</text><text class="t-s" x="210" y="136" text-anchor="middle">T = User</text>
${AR(280,90,306,90,'-ok')}
<rect class="bx" x="312" y="20" width="100" height="36" rx="6"/><text class="t" x="324" y="44">• Ada</text>
<rect class="bx" x="312" y="72" width="100" height="36" rx="6"/><text class="t" x="324" y="96">• Linus</text>
<rect class="bx" x="312" y="124" width="100" height="36" rx="6"/><text class="t" x="324" y="148">• Grace</text>
</svg><figcaption>A generic component works for any item type. Pass it users and T becomes User, so the render function knows each item has a name.</figcaption></figure>
${V.like(`<p>A label printer. Feed it anything (users, products, songs) and it prints one tidy label per item. You hand it a small instruction card, the <b>render</b> function, saying what to print for each one.</p>`)}
${V.anat(['function List',[1,'&lt;T&gt;'],'({ items, render }: ',[2,'ListProps&lt;T&gt;'],')\n\ntype ListProps&lt;T&gt; = {\n  items: ',[3,'T[]'],';\n  render: ',[4,'(item: T) =&gt; React.ReactNode'],';\n};'],[
 '<b>Type parameter.</b> The blank label, filled in from what you pass.',
 '<b>Props type that takes T.</b> Generic types can be passed a type, like a function is passed a value.',
 '<b>Items.</b> A list of T.',
 '<b>Render function.</b> Takes one T, returns something React can show. <code>React.ReactNode</code> means "anything renderable": JSX, text, a number or null.'])}
${V.steps([
 ['You write <b>&lt;List items={users} … /&gt;</b>. users is a User[], so TypeScript sets <b>T = User</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="T becomes User">
${CP(6,8,408,['&lt;List items={users}','      render={u =&gt; &lt;li&gt;{u.name}&lt;/li&gt;} /&gt;'],0,14,26)}
<text class="t" x="10" y="110">T = <tspan class="t-ok" style="font-weight:700">User</tspan></text>
<rect class="bx" x="230" y="90" width="180" height="70" rx="8"/><text class="t-s" x="242" y="112">output</text>
</svg>`],
 ['List calls <b>render</b> for the first item. Because T is User, the editor knows <b>u.name</b> exists and offers it as you type.',`<svg viewBox="0 0 420 170" role="img" aria-label="render called with Ada">
${CP(6,8,408,['&lt;List items={users}','      render={u =&gt; &lt;li&gt;{u.name}&lt;/li&gt;} /&gt;'],1,14,26)}
<text class="t" x="10" y="110">u = <tspan class="t-m">{ name: 'Ada' }</tspan></text>
<rect class="bx" x="230" y="90" width="180" height="70" rx="8"/><text class="t-s" x="242" y="112">output</text><text class="t" x="242" y="140">• Ada</text>
</svg>`],
 ['Same again for every item. Write <b>u.nmae</b> by mistake and you get a red line, not a blank row.',`<svg viewBox="0 0 420 170" role="img" aria-label="render called for every item">
${CP(6,8,408,['&lt;List items={users}','      render={u =&gt; &lt;li&gt;{u.name}&lt;/li&gt;} /&gt;'],1,14,26)}
<text class="t-bad" x="10" y="110" style="font-size:14px">u.nmae ✖ does not exist</text>
<rect class="bx-ok" x="230" y="90" width="180" height="70" rx="8"/><text class="t" x="242" y="114">• Ada</text><text class="t" x="242" y="134">• Linus</text><text class="t" x="242" y="154">• Grace</text>
</svg>`]])}
<p><b>Typed state.</b> <code>useState(0)</code> infers <code>number</code> by itself. When the starting value does not show the full type, pass it in angle brackets: <code>useState&lt;number&gt;(0)</code>, or <code>useState&lt;User | null&gt;(null)</code> for "nothing yet, a User later".</p>
${V.rules(V.ok('useState(0)','Inferred as number: no brackets needed'),V.no('useState(null)','Inferred as null forever, so you can never store a User'),
 V.ok('useState&lt;User | null&gt;(null)','Say what it will hold later'),V.ok('children: React.ReactNode','The usual type for anything placed between tags'))}
${V.hook(`Write the machine once with <code>&lt;T&gt;</code>; it learns the item type from what you feed it.`)}
`)}

${V.card(3,'Where type errors are caught','the printer does not spell-check',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Button.tsx goes two ways: a fast build that strips types and runs, and tsc or the editor that checks types and shows errors">
${V.ic('file',8,58,52,'ic-a')}<text class="t-m" x="34" y="132" text-anchor="middle">.tsx</text>
<path class="ln-a" d="M66 84 112 40M66 84 112 128"/>
<rect class="bx" x="116" y="12" width="296" height="56" rx="8"/>${V.ic('machine',124,20,40,'ic-p')}<text class="t-b" x="172" y="36">Fast build (Babel, SWC)</text><text class="t-s" x="172" y="58">strips the types, does not check them</text>
<rect class="bx-ok" x="116" y="100" width="296" height="56" rx="8"/>${V.ic('search',124,108,40,'ic-ok')}<text class="t-b" x="172" y="124">tsc and your editor</text><text class="t-s" x="172" y="146">checks every type, shows red lines</text>
</svg><figcaption>Two separate jobs. One tool removes types so the code can run fast. Another tool reads the types and reports mistakes.</figcaption></figure>
${V.like(`<p>A printer prints your essay exactly as written, spelling mistakes and all. Spell-check is a separate tool you run before printing. Babel and SWC are the printer; <code>tsc</code>, the TypeScript compiler, is the spell-checker.</p>`)}
${V.why(`<p>Checking types across a whole project takes time, so dev servers skip it to stay instant. Your editor runs the checker live as you type, and <code>next build</code> runs a full type check and stops on errors. This lesson's preview strips types like a dev server, so a wrong prop will not stop it running. That is exactly why the checker matters.</p>`)}
${V.rules(V.ok('npx tsc --noEmit','Check every file, write nothing: a classic CI step'),V.no('// @ts-ignore','Hides the red line, keeps the bug'),V.ok('next build','Fails the build on type errors by default'))}
${V.build(`<ol><li>Write <code>interface ButtonProps</code> with <code>label</code> and <code>onClick</code>, then annotate Button's destructured parameter with it.</li><li>Add an optional <code>variant</code> limited to two exact strings, with a default, and render a second button using the other one.</li><li>Write <code>List&lt;T&gt;</code> taking <code>items</code> and <code>render</code>, and use it to show the users.</li></ol>`)}
${V.hook(`Babel prints, tsc proofreads.`)}
`)}

<div class="try"><b>Try it in your head</b>1. How do you make a prop optional? <i>Put ? after its name: variant?.</i> 2. In <code>&lt;List items={[1, 2]} … /&gt;</code>, what is T? <i>number.</i> 3. Does the fast dev build stop on a type error? <i>No. It only strips types; tsc and your editor catch them.</i></div>
`);
}
