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
 ['You pass <b>items={users}</b> to List. users is a User[], so TypeScript sets <b>T = User</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="T becomes User">
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
<text class="t-bad" x="10" y="110" style="font-size:14px">u.nmae: Property 'nmae'</text><text class="t-bad" x="10" y="132" style="font-size:14px">does not exist on type</text><text class="t-bad" x="10" y="154" style="font-size:14px">'User'.</text>
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

/* n3 helpers: the app/ folder tree. hl = map of row index to box class; notes = map of row index to right-hand text. */
const N3T=[['app/',0,'folder'],['layout.tsx',1,'file'],['page.tsx',1,'file'],['not-found.tsx',1,'file'],['about/',1,'folder'],['page.tsx',2,'file'],['blog/',1,'folder'],['[slug]/',2,'folder'],['page.tsx',3,'file']];
const TREE=(y0,hl,notes,dim)=>N3T.map(([n,d,ic],i)=>{const y=y0+i*25,x=10+d*22;const c=hl&&hl[i];return (c?'<rect class="'+c+'" x="'+(x-4)+'" y="'+(y-2)+'" width="'+(n.length*9+34)+'" height="24" rx="5"/>':'')+V.ic(ic,x,y+1,20,ic==='folder'?'ic-warn':'ic-info')+'<text class="t-m'+(dim&&!c?' t-dim':'')+'" x="'+(x+24)+'" y="'+(y+17)+'" style="font-size:14px">'+n+'</text>'+(notes&&notes[i]?'<text class="t-m t-a" x="250" y="'+(y+17)+'" style="font-size:14px">'+notes[i]+'</text>':'')}).join('');
const URLB=(u,cls)=>'<rect class="'+(cls||'bx')+'" x="6" y="6" width="408" height="34" rx="17"/>'+V.ic('globe',14,11,24,'ic-info')+'<text class="t-m" x="46" y="29" style="font-size:15px">'+u+'</text>';

explain('n3',`
<p>Every website is a set of addresses: <code>/</code>, <code>/about</code>, <code>/blog/my-first-post</code>. In Next.js you do not write a list of routes anywhere. You make folders, and the folders <i>are</i> the addresses.</p>

${V.card(1,'Folders become URLs','the file tree is the map',`
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="The app folder tree with the URL each page file serves">
${TREE(8,{2:'bx-ok',5:'bx-ok',8:'bx-ok'},{1:'wraps every page',2:'→ /',3:'→ 404 page',5:'→ /about',8:'→ /blog/anything'})}
</svg><figcaption>Each folder inside app/ is one piece of the URL. A folder only becomes a real page when it contains a page.tsx file. Square brackets make a folder that matches anything.</figcaption></figure>
${V.like(`<p>A block of flats. The URL is the address: building, then floor, then flat. Each folder is a door you walk through, and <code>page.tsx</code> is the room you end up in. A folder in square brackets is a door labelled "any flat number": whatever you ask for, it lets you in and tells the room which number you wanted.</p>`)}
${V.why(`<p>Older apps kept a long routing file mapping each address to code, and it drifted out of date. Next.js 13 (2022) introduced the <b>App Router</b>, where the <code>app/</code> folder itself is the map. Look at the folders and you know every address the site has.</p>`)}
${V.anat([[1,'app'],'/',[2,'blog'],'/',[3,'[slug]'],'/',[4,'page.tsx']],[
 '<b>The app folder.</b> The root of every route. It stands for <code>/</code>.',
 '<b>A static segment.</b> Matches exactly <code>/blog</code>.',
 '<b>A dynamic segment.</b> The brackets match any value in that position and hand it to the page as <code>params.slug</code>.',
 '<b>The page file.</b> Its default export is the component shown at this address. No page.tsx, no route.'])}
<p><b>Watch Next.js find a page.</b> You type an address and it walks the folder tree, one segment at a time.</p>
${V.steps([
 ['You visit <b>/blog/hello</b>. Next.js splits the path into segments: <b>blog</b>, then <b>hello</b>.',`<svg viewBox="0 0 420 290" role="img" aria-label="URL /blog/hello split into two segments">
${URLB('localhost:3000/blog/hello')}
<rect class="bx-a" x="250" y="56" width="62" height="28" rx="6"/><text class="t-m" x="281" y="76" text-anchor="middle" style="font-size:14px">blog</text>
<rect class="bx-a" x="320" y="56" width="70" height="28" rx="6"/><text class="t-m" x="355" y="76" text-anchor="middle" style="font-size:14px">hello</text>
${TREE(56,{0:'bx-hl'},null,true)}
</svg>`],
 ['Segment one, <b>blog</b>: there is a folder with exactly that name, so it goes in.',`<svg viewBox="0 0 420 290" role="img" aria-label="blog matches the blog folder">
${URLB('localhost:3000/blog/hello')}
<rect class="bx-ok" x="250" y="56" width="62" height="28" rx="6"/><text class="t-m" x="281" y="76" text-anchor="middle" style="font-size:14px">blog</text>
<rect class="bx" x="320" y="56" width="70" height="28" rx="6"/><text class="t-m" x="355" y="76" text-anchor="middle" style="font-size:14px">hello</text>
${TREE(56,{0:'bx-ok',6:'bx-hl'},null,true)}
</svg>`],
 ['Segment two, <b>hello</b>: no folder has that name, but <b>[slug]</b> matches anything. Next.js remembers <b>slug = \'hello\'</b>.',`<svg viewBox="0 0 420 290" role="img" aria-label="hello matches the slug folder">
${URLB('localhost:3000/blog/hello')}
<rect class="bx-ok" x="250" y="56" width="62" height="28" rx="6"/><text class="t-m" x="281" y="76" text-anchor="middle" style="font-size:14px">blog</text>
<rect class="bx-ok" x="320" y="56" width="70" height="28" rx="6"/><text class="t-m" x="355" y="76" text-anchor="middle" style="font-size:14px">hello</text>
${TREE(56,{0:'bx-ok',6:'bx-ok',7:'bx-hl'},{7:"slug = 'hello'"},true)}
</svg>`],
 ['Inside is a <b>page.tsx</b>, so this is a real route. Next.js renders it, passing <b>params.slug</b>, and the page shows "Post: hello".',`<svg viewBox="0 0 420 290" role="img" aria-label="The slug page renders Post: hello">
${URLB('localhost:3000/blog/hello','bx-ok')}
${TREE(56,{0:'bx-ok',6:'bx-ok',7:'bx-ok',8:'bx-hl'},{7:"slug = 'hello'"},true)}
<rect class="bx-ok" x="240" y="236" width="174" height="44" rx="8"/><text class="t-b" x="327" y="264" text-anchor="middle">Post: hello</text>
</svg>`],
 ['Now try <b>/nope</b>. No folder matches, so Next.js shows <b>not-found.tsx</b>, your custom 404 page.',`<svg viewBox="0 0 420 290" role="img" aria-label="/nope falls back to not-found.tsx">
${URLB('localhost:3000/nope','bx-bad')}
${TREE(56,{0:'bx-ok',3:'bx-hl'},null,true)}
<rect class="bx-bad" x="240" y="236" width="174" height="44" rx="8"/><text class="t-b" x="327" y="264" text-anchor="middle">Page not found</text>
</svg>`]])}
${V.rules(V.rh('Rules: break one and the route does not exist'),
 V.no('app/about/About.tsx','The file must be called page.tsx exactly'),V.ok('app/about/page.tsx','Serves /about'),
 V.no('app/blog/{slug}/','Dynamic folders use square brackets, not braces'),V.ok('export default function Page()','The page must be the default export'),
 V.rh('Conventions'),V.ok('app/contact-us/','Folder names are lowercase words joined by hyphens, because they appear in the URL'),
 V.ok('const { slug } = await params','Next.js 15 and later: params is a Promise. This sandbox follows Next 14, where it is a plain object'))}
${V.hook(`Folders are the address, <code>page.tsx</code> is the room, and <code>[brackets]</code> mean "any".`)}
`)}

${V.card(2,'Layouts and Link','picture frames that stay on the wall',`
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="A picture frame labelled layout.tsx with a nav bar and footer, holding a swappable picture labelled page.tsx">
<rect class="bx-warn" x="6" y="6" width="408" height="198" rx="12"/><text class="t-s" x="20" y="28">app/layout.tsx</text>
<rect class="bx" x="20" y="36" width="380" height="36" rx="6"/>${V.ic('house',30,42,24,'ic-a')}<text class="t-b t-a" x="62" y="60">Home</text><text class="t-b t-a" x="130" y="60">About</text><text class="t-s" x="250" y="60">nav: on every page</text>
<rect class="bx-info" x="40" y="84" width="340" height="78" rx="8"/><text class="t-s" x="54" y="104">{children} = page.tsx</text><text class="t-b" x="210" y="140" text-anchor="middle" style="font-size:18px">About me</text>
<text class="t-s" x="210" y="190" text-anchor="middle">footer: on every page</text>
</svg><figcaption>A layout is a frame that wraps every page below its folder. When you move between pages, only the picture inside changes. The frame, with its navigation, stays put.</figcaption></figure>
${V.like(`<p>A picture frame on the wall. To show a different photo you slide out the old one and slide in the new one. You do not take down the frame, repaint the wall and hang it again.</p>`)}
${V.why(`<p>Almost every site repeats the same header, nav and footer. Copying them into each page is error-prone. A layout writes them once, and because the frame stays mounted between pages, things like a search box keep their state while you navigate.</p>`)}
${V.anat(['export default function ',[1,'RootLayout'],'({ ',[2,'children'],' }) {\n  return (\n    ',[3,'&lt;html&gt;&lt;body&gt;'],'\n      &lt;nav&gt;',[4,'&lt;Link href="/about"&gt;'],'About&lt;/Link&gt;&lt;/nav&gt;\n      {children}\n    &lt;/body&gt;&lt;/html&gt;\n  );\n}'],[
 '<b>The layout component</b>, in <code>app/layout.tsx</code>. The root layout wraps the entire site.',
 '<b>children</b> is the hole in the frame: whichever page matches the URL is slotted in here.',
 '<b>html and body.</b> Only the root layout writes these, and it must.',
 '<b>Link</b>, imported from <code>next/link</code>. Like an <code>a</code> tag, but it swaps the page without a full reload.'])}
${V.steps([
 ['You are on <b>/</b>. The frame (nav and footer) comes from the layout. The picture is the home page.',`<svg viewBox="0 0 420 190" role="img" aria-label="Home page inside the layout frame">
<rect class="bx-warn" x="6" y="6" width="408" height="176" rx="12"/>
<rect class="bx" x="20" y="18" width="380" height="36" rx="6"/><text class="t-b t-a" x="36" y="42">Home</text><text class="t-b t-a" x="104" y="42">About</text>
<rect class="bx-info" x="40" y="68" width="340" height="80" rx="8"/><text class="t-b" x="210" y="114" text-anchor="middle" style="font-size:18px">Welcome!</text>
<text class="t-s" x="210" y="172" text-anchor="middle">footer</text>
</svg>`],
 ['You click the <b>About</b> Link. Next.js fetches only the new page and slides it into the frame. The frame does not flicker or reload.',`<svg viewBox="0 0 420 190" role="img" aria-label="Link swaps only the picture">
<rect class="bx-warn" x="6" y="6" width="408" height="176" rx="12"/>
<rect class="bx" x="20" y="18" width="380" height="36" rx="6"/><text class="t-b t-a" x="36" y="42">Home</text><rect class="bx-hl" x="98" y="24" width="60" height="24" rx="5"/><text class="t-b t-a" x="104" y="42">About</text>
<rect class="bx-ok" x="40" y="68" width="340" height="80" rx="8"/><text class="t-b" x="210" y="114" text-anchor="middle" style="font-size:18px">About me</text>
<text class="t-s" x="210" y="172" text-anchor="middle">footer</text>${V.ic('check',372,20,32,'ic-ok')}
</svg>`],
 ['With a plain <b>a</b> tag instead, the browser throws the whole page away and loads everything again: frame, picture, scripts. Slower, and any state in the frame is lost.',`<svg viewBox="0 0 420 190" role="img" aria-label="A plain a tag reloads everything">
<rect class="bx-bad" x="6" y="6" width="408" height="176" rx="12" style="stroke-dasharray:6 5"/>
<rect class="bx" x="20" y="18" width="380" height="36" rx="6" style="opacity:.35"/>
<rect class="bx" x="40" y="68" width="340" height="80" rx="8" style="opacity:.35"/>${V.ic('repeat',186,82,48,'ic-bad')}
<text class="t-bad" x="210" y="172" text-anchor="middle" style="font-size:14px">full page reload</text>
</svg>`]])}
${V.rules(V.no('&lt;a href="/about"&gt;','Works, but reloads the whole page'),V.ok('&lt;Link href="/about"&gt;','Import Link from next/link for links inside your site'),
 V.no('A root layout with no &lt;html&gt;','The root layout must render html and body'),V.ok('app/blog/layout.tsx','A layout in a folder frames only the pages below it, inside the root frame'))}
${V.build(`<ol><li>Make a folder for the new address with a <code>page.tsx</code> inside, exporting a component by default.</li><li>In the root layout, add a nav with two <code>Link</code>s above <code>{children}</code>.</li><li>Make a folder in square brackets under <code>blog/</code>, and show <code>params.slug</code> in its page.</li><li>Add <code>app/not-found.tsx</code>, then visit a made-up address in the URL bar to see it.</li></ol>`)}
${V.hook(`The layout is the frame, the page is the picture, and Link swaps the picture, not the frame.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which file serves <code>/contact</code>? <i>app/contact/page.tsx.</i> 2. At <code>/blog/dune</code>, what is params.slug? <i>'dune'.</i> 3. Why use Link instead of a? <i>It swaps the page without reloading the whole site, so the layout stays.</i></div>
`);

/* n4 helpers: kitchen (server) on the left, table (browser) on the right. */
const KT=(hs,hb)=>'<rect class="'+(hs||'bx')+'" x="6" y="8" width="150" height="170" rx="12"/><text class="t-b" x="81" y="32" text-anchor="middle">Server</text><text class="t-s" x="81" y="50" text-anchor="middle">the kitchen</text>'+V.ic('server',18,62,44,'ic-p')+V.ic('db',94,62,44,'ic-info')+V.ic('key',58,118,36,'ic-warn')+'<text class="t-s" x="40" y="172" text-anchor="middle">code</text><text class="t-s" x="116" y="122" text-anchor="middle">data</text><text class="t-s" x="122" y="172" text-anchor="middle">secrets</text>'+
 '<rect class="'+(hb||'bx')+'" x="264" y="8" width="150" height="170" rx="12"/><text class="t-b" x="339" y="32" text-anchor="middle">Browser</text><text class="t-s" x="339" y="50" text-anchor="middle">the table</text>'+V.ic('laptop',305,58,68,'ic-a');
/* tree for the use-client card. cls: [page, list, button] box classes */
const CT=(c,ptxt,btxt)=>'<rect class="'+c[0]+'" x="100" y="10" width="220" height="40" rx="8"/><text class="t-m" x="210" y="36" text-anchor="middle">'+ptxt+'</text><path class="ln" d="M170 50 110 86M250 50 310 86"/><rect class="'+c[1]+'" x="30" y="86" width="160" height="40" rx="8"/><text class="t-m" x="110" y="112" text-anchor="middle">ProjectList</text><rect class="'+c[2]+'" x="230" y="86" width="160" height="40" rx="8"/><text class="t-m" x="310" y="112" text-anchor="middle">'+btxt+'</text>';

explain('n4',`
<p>Modern Next.js asks one question about every component: does this run in the kitchen or at the table? Get it right and your pages load fast, keep secrets safe and send far less code to phones.</p>

${V.card(1,'Server Components','cooked in the kitchen, served as a plate',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="The server, with code, data and secrets, sends a finished HTML plate and a tiny bit of JavaScript for the like button to the browser">
${KT('bx-info','bx')}
${AR(162,80,258,80,'-ok')}<text class="t-b" x="210" y="70" text-anchor="middle">HTML</text>
${AR(162,130,258,130,'-a')}<text class="t-s" x="210" y="120" text-anchor="middle">tiny JS</text><text class="t-s" x="210" y="152" text-anchor="middle">(like button)</text>
</svg><figcaption>By default every component runs on the server. It can read the database and secret keys, then sends finished HTML. Only interactive pieces send JavaScript.</figcaption></figure>
${V.like(`<p>A restaurant. The <b>kitchen</b> (the server) has the fridge (the database), the recipes and the till keys (secrets). Diners never walk in there. They get a finished <b>plate</b> (HTML) at the <b>table</b> (the browser). Only things you touch at the table, like the call-waiter buzzer, need to work at the table.</p>`)}
${V.why(`<p>For years React sent the whole app's JavaScript to the browser and fetched data from there, which made phones slow and forced you to build an API for every query. React Server Components, adopted by the Next.js App Router in 2023, run on the server by default: they fetch data directly and send zero JavaScript for themselves.</p>`)}
${V.anat(['export default ',[1,'async'],' function Home() {\n  const projects = ',[2,'await getProjects()'],';\n  return ',[3,'&lt;ul&gt;{projects.map(…)}&lt;/ul&gt;'],';\n}'],[
 '<b>async.</b> Server Components may be async functions, which client components cannot.',
 '<b>Direct data access.</b> Waits for the data right here, on the server. No fetch to your own API, no loading spinner code.',
 '<b>The plate.</b> The JSX is turned into HTML on the server and sent to the browser.'])}
<p><b>Watch one page load.</b> Follow the order from the kitchen to the table.</p>
${V.steps([
 ['The browser asks for the home page. The request goes to the kitchen.',`<svg viewBox="0 0 420 190" role="img" aria-label="Browser requests the page">
${KT('bx','bx-hl')}
${AR(258,90,162,90,'-a')}<text class="t-m" x="210" y="80" text-anchor="middle">GET /</text>
</svg>`],
 ['The server runs <b>Home()</b>. It reaches <b>await getProjects()</b> and reads the database directly. Secrets stay here and never travel.',`<svg viewBox="0 0 420 190" role="img" aria-label="Server reads the database">
${KT('bx-hl','bx')}
<text class="t-m t-a" x="210" y="84" text-anchor="middle" style="font-size:14px">await</text><text class="t-m t-a" x="210" y="104" text-anchor="middle" style="font-size:13px">getProjects</text>
</svg>`],
 ['It turns the data into HTML, a finished plate, and sends it. Alongside goes a small bundle of JavaScript: only the code for the like button.',`<svg viewBox="0 0 420 190" role="img" aria-label="HTML and tiny JS travel to the browser">
${KT('bx-info','bx')}
${AR(162,80,258,80,'-ok')}<text class="t-b" x="210" y="70" text-anchor="middle">HTML</text>
${AR(162,130,258,130,'-a')}<text class="t-s" x="210" y="120" text-anchor="middle">tiny JS</text>
</svg>`],
 ['The page appears straight away. Then the small script <b>hydrates</b> the button: it attaches the click handler so the button comes alive.',`<svg viewBox="0 0 420 190" role="img" aria-label="Browser shows the page, button hydrates">
${KT('bx','bx-ok')}
<rect class="bx-a" x="296" y="134" width="86" height="34" rx="17"/><text class="t-b" x="339" y="157" text-anchor="middle">Like 0</text>
</svg>`],
 ['You click <b>Like</b>. The count goes from 0 to 1 entirely at the table, in the browser. The kitchen is not even asked.',`<svg viewBox="0 0 420 190" role="img" aria-label="Clicking like updates in the browser only">
${KT('bx','bx-ok')}
<rect class="bx-hl" x="296" y="134" width="86" height="34" rx="17"/><text class="t-b" x="339" y="157" text-anchor="middle">Like 1</text>
<text class="t-s t-dim" x="210" y="100" text-anchor="middle">no request</text>
</svg>`]])}
${V.rules(V.ok('Fetch data in a Server Component','Direct, secure, no extra API'),V.no('NEXT_PUBLIC_STRIPE_SECRET','The NEXT_PUBLIC_ prefix copies a value into browser code anyone can read. Keep secrets unprefixed and server-only'),
 V.ok('export default async function Page()','Only Server Components can be async'))}
${V.hook(`Cook in the kitchen, serve a plate. Only the buzzer needs to work at the table.`)}
`)}

${V.card(2,'"use client"','marking what must work at the table',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A component tree: Page and ProjectList on the server, LikeButton a client leaf">
${CT(['bx-info','bx-info','bx-a'],'Page','LikeButton')}
<text class="t-s" x="110" y="146" text-anchor="middle">server</text><text class="t-s" x="310" y="146" text-anchor="middle">'use client'</text>
${V.ic('server',2,92,26,'ic-info')}${V.ic('laptop',392,92,26,'ic-a')}
</svg><figcaption>Keep the tree on the server and make only the small interactive leaves client components. Here only LikeButton ships JavaScript.</figcaption></figure>
${V.like(`<p>The waiter's order pad. Most dishes are cooked in the kitchen, but anything finished at the table, like flambéing or grating cheese, is marked on the pad so the right kit goes out to the table. <code>'use client'</code> is that mark.</p>`)}
${V.why(`<p>Some things can only happen in a browser: remembering a click (<code>useState</code>), reacting to it (<code>onClick</code>), or using <code>window</code>. A server sends a plate and is gone, so it cannot react to a click. The directive tells Next.js which files must also be sent to the browser. (Client components still render once on the server for the first HTML, then come alive in the browser.)</p>`)}
${V.anat([[1,"'use client';"],'\nimport { useState } from \'react\';\n\n',[2,'export default function LikeButton()'],' {\n  const [n, setN] = ',[3,'useState(0)'],';\n  return &lt;button ',[4,'onClick'],'={…}&gt;Like {n}&lt;/button&gt;;\n}'],[
 '<b>The directive.</b> The very first line of the file, above the imports. This file and everything it imports become client code.',
 '<b>A normal component</b>, in its own file such as <code>components/LikeButton.tsx</code>.',
 '<b>State</b>: memory that lives in the browser.',
 '<b>An event handler</b>: reacts to clicks in the browser.'])}
${V.steps([
 ['The starter puts <b>useState</b> straight into the page. Pages are server components, so the build stops: this hook only works in a Client Component.',`<svg viewBox="0 0 420 170" role="img" aria-label="useState in a server page fails">
${CT(['bx-bad','bx','bx'],'Page + useState','button')}
<text class="t-bad" x="210" y="156" text-anchor="middle" style="font-size:14px">useState only works in a Client Component</text>
</svg>`],
 ['Quick but wrong fix: put <b>\'use client\'</b> on the page. The error goes, but now the whole page ships to the browser and it cannot be async or read the database.',`<svg viewBox="0 0 420 170" role="img" aria-label="Whole page becomes client code">
${CT(['bx-warn','bx-warn','bx-warn'],"'use client' Page",'button')}
<text class="t-warn" x="210" y="156" text-anchor="middle" style="font-size:14px">everything ships to the browser</text>
</svg>`],
 ['Right fix: move only the button into its own file marked <b>\'use client\'</b>. The page stays on the server, can be async and awaits the projects, and only the small button ships.',`<svg viewBox="0 0 420 170" role="img" aria-label="Only LikeButton is a client component">
${CT(['bx-info','bx-info','bx-ok'],'async Page','LikeButton')}
<text class="t-ok" x="210" y="156" text-anchor="middle" style="font-size:14px">server tree, one small client leaf</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no("import … ; 'use client';",'The directive must be the first line, before any import'),V.no('async function LikeButton() in a client file','Client components cannot be async'),
 V.no('onClick in a server component','Event handlers and hooks need a client component'),V.ok('&lt;LikeButton /&gt; inside a server page','Server components can render client components'),
 V.rh('Conventions'),V.ok('Keep client components small','Push them to the leaves of the tree so less JavaScript ships'))}
${V.build(`<ol><li>Run the starter and read the build error.</li><li>Create <code>components/LikeButton.tsx</code>, put the directive on line 1, and move the state and button into it.</li><li>Import it into the page and render it.</li><li>Make the page <code>async</code>, await the projects and list them.</li></ol>`)}
${V.hook(`Server by default. Click, state or window? Mark that leaf <code>'use client'</code>.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Can a component with <code>onClick</code> be a server component? <i>No: it must be a client component.</i> 2. Where does an unmarked <code>app/page.tsx</code> run? <i>On the server. It can be async and sends no JS for itself.</i> 3. Why not mark the whole page <code>'use client'</code>? <i>It ships everything to the browser and loses direct, secure data access.</i></div>
`);

/* n5 helper: browser with a form and message list on the left, server on the right. */
const SA=(o)=>'<rect class="'+(o.b||'bx')+'" x="6" y="8" width="170" height="184" rx="12"/><text class="t-b" x="18" y="32">Browser</text>'+
 '<rect class="'+(o.in||'bx')+'" x="18" y="44" width="96" height="32" rx="5"/><text class="t-m" x="28" y="66" style="font-size:14px">'+(o.txt||'')+'</text><rect class="'+(o.btn||'bx-a')+'" x="120" y="44" width="46" height="32" rx="5"/><text class="t-b" x="143" y="65" text-anchor="middle" style="font-size:14px">Post</text>'+
 '<text class="t" x="18" y="108">• Hello</text><text class="t" x="18" y="132">• Welcome</text>'+(o.newMsg?'<rect class="bx-ok" x="14" y="140" width="110" height="26" rx="5"/><text class="t" x="18" y="159">• Hi!</text>':'')+
 '<rect class="'+(o.s||'bx')+'" x="250" y="8" width="164" height="184" rx="12"/><text class="t-b" x="262" y="32">Server</text>'+
 '<rect class="'+(o.fn||'bx')+'" x="262" y="44" width="140" height="40" rx="6"/><text class="t-m" x="332" y="69" text-anchor="middle" style="font-size:14px">postMessage()</text>'+V.ic('db',300,112,52,'ic-info')+(o.dbNew?'<text class="t-m t-ok" x="362" y="146" style="font-size:14px">+Hi!</text>':'')+(o.extra||'');

explain('n5',`
<p>Showing data is half of an app. The other half is changing it: posting a message, saving a form, answering a phone app. Next.js gives you two tools, one for your own forms and one for everyone else.</p>

${V.card(1,'Server Actions','a letter box straight to the right desk',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A form in the browser posts straight to the postMessage function on the server, which saves to the database and sends back a fresh page">
${SA({txt:'Hi!',newMsg:true,s:'bx-info',fn:'bx-ok',dbNew:true})}
<path class="ln-a" d="M180 60H246"/><polygon class="ah-a" points="246,53 246,67 256,60"/>${V.ic('mail',196,24,30,'ic-a')}
<path class="ln-ok" d="M246 150H186"/><polygon class="ah-ok" points="186,143 186,157 176,150"/><text class="t-s" x="213" y="176" text-anchor="middle">fresh page</text>
</svg><figcaption>The form posts straight to a function on the server. It saves the message, refreshes the page data, and the browser gets the updated page back.</figcaption></figure>
${V.like(`<p>A letter box in an office wall labelled with one person's name. You drop your note in and it lands on exactly that person's desk. No receptionist, no switchboard: that is the API you no longer have to build.</p>`)}
${V.why(`<p>Before, saving a form meant writing an API route, then browser code to <code>fetch</code> it, handle errors and refresh the page. React 19 and Next.js made <b>Server Actions</b> stable in 2024: you pass a server function straight to <code>&lt;form action&gt;</code>. It even works before the page's JavaScript has loaded, because it is an ordinary HTML form post.</p>`)}
${V.anat(['async function postMessage(',[1,'formData: FormData'],') {\n  ',[2,"'use server';"],'\n  addMessage(String(',[3,"formData.get('text')"],'));\n  ',[4,"revalidatePath('/')"],';\n}\n&lt;form ',[5,'action={postMessage}'],'&gt;&lt;input name="text" /&gt;…&lt;/form&gt;'],[
 '<b>The form data.</b> Every field in the form, packed up by the browser.',
 '<b>The directive.</b> Marks this function as callable from the browser but run on the server.',
 '<b>Read one field</b> by its <code>name</code>. It can be null, so wrap it in <code>String(…)</code> or check it.',
 '<b>Refresh.</b> Tells Next.js the data on <code>/</code> changed, so the page is rendered again with the new message.',
 '<b>Wire it up.</b> The form submits to the function. No <code>fetch</code>, no API URL.'])}
<p><b>Watch the round trip.</b> One press of the button, five moments.</p>
${V.steps([
 ['You type <b>Hi!</b> and press Post. The browser packs every named field into FormData.',`<svg viewBox="0 0 420 200" role="img" aria-label="User types Hi! and presses Post">
${SA({txt:'Hi!',in:'bx-hl',btn:'bx-hl',b:'bx'})}
</svg>`],
 ['The form is sent to the server as a POST request carrying <b>text=Hi!</b>. This is a normal form post, so it works even without JavaScript.',`<svg viewBox="0 0 420 200" role="img" aria-label="The form data travels to the server">
${SA({txt:'Hi!'})}
<path class="ln-a" d="M180 60H246"/><polygon class="ah-a" points="246,53 246,67 256,60"/>${V.ic('mail',196,22,32,'ic-a')}<text class="t-s" x="213" y="86" text-anchor="middle">text=Hi!</text>
</svg>`],
 ['On the server, <b>postMessage</b> runs. <b>formData.get(\'text\')</b> gives \'Hi!\', and addMessage saves it.',`<svg viewBox="0 0 420 200" role="img" aria-label="postMessage saves Hi! to the database">
${SA({txt:'Hi!',fn:'bx-hl',dbNew:true})}
</svg>`],
 ['<b>revalidatePath(\'/\')</b> marks the home page\'s data as out of date, so Next.js renders the page again with the new list.',`<svg viewBox="0 0 420 200" role="img" aria-label="revalidatePath re-renders the page">
${SA({txt:'Hi!',fn:'bx-ok',dbNew:true,s:'bx-hl',extra:V.ic('repeat',340,150,32,'ic-a')})}
</svg>`],
 ['The fresh page comes back and <b>Hi!</b> appears in the list. You wrote no fetch call and no API.',`<svg viewBox="0 0 420 200" role="img" aria-label="The updated page shows Hi!">
${SA({txt:'',newMsg:true,fn:'bx-ok',dbNew:true,b:'bx-ok'})}
<path class="ln-ok" d="M246 150H186"/><polygon class="ah-ok" points="186,143 186,157 176,150"/>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('&lt;input id="text"&gt;','FormData uses the name attribute; without name="text", get(\'text\') is null'),V.ok("'use server'",'First line of the function body, or the top of a file of actions'),
 V.no('Trusting the input','An action is a public endpoint anyone can call: validate the data and check who is logged in'),
 V.rh('Conventions'),V.ok('createPost, deleteTodo','Name actions with a verb'),V.ok('revalidatePath after writes','Otherwise the page may keep showing the old data'))}
${V.hook(`Form to function, function to database, revalidate, fresh page back.`)}
`)}

${V.card(2,'Route handlers','a service hatch for other apps',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A phone app and another server call the route file, which answers with JSON">
${V.ic('phone',14,16,46,'ic-info')}<text class="t-s" x="37" y="78" text-anchor="middle">mobile app</text>
${V.ic('server',14,96,46,'ic-p')}<text class="t-s" x="37" y="158" text-anchor="middle">webhook</text>
<path class="ln-a" d="M66 40 146 74M66 120 146 92"/>
<rect class="bx-a" x="150" y="50" width="134" height="64" rx="8"/><text class="t-m" x="217" y="78" text-anchor="middle" style="font-size:14px">api/messages/</text><text class="t-m" x="217" y="100" text-anchor="middle" style="font-size:14px">route.ts</text>
${AR(290,82,322,82,'-ok')}
<rect class="bx-dark" x="326" y="44" width="88" height="76" rx="8"/><text class="t-term" x="338" y="72" style="font-size:14px">[{ "id":</text><text class="t-term" x="338" y="94" style="font-size:14px">  1, … }]</text>
</svg><figcaption>A route handler is a URL that returns data, usually JSON, instead of a page. Anything that speaks HTTP can call it.</figcaption></figure>
${V.like(`<p>The service hatch at the back of a restaurant. Diners come through the front door and get a full meal (pages). Delivery drivers knock at the hatch and get a packed box (JSON). Same kitchen, different door.</p>`)}
${V.anat(['// app/api/messages/route.ts\nexport async function ',[1,'POST'],'(',[2,'req: Request'],') {\n  const { text } = await req.json();\n  if (!text)\n    return NextResponse.json({ error: … }, ',[3,'{ status: 400 }'],');\n  …\n  return NextResponse.json(msg, { ',[4,'status: 201'],' });\n}'],[
 '<b>The HTTP method</b>, exported by name in capitals: <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>.',
 '<b>The incoming request</b>: the standard web Request, with headers and body.',
 '<b>An error status.</b> 400 means "your request was wrong". Return early so nothing is saved.',
 '<b>Status code.</b> 201 means "created". GET answers default to 200, "OK".'])}
${V.steps([
 ['An app sends <b>POST</b> with an empty body. The handler finds no text and answers <b>400</b>.',`<svg viewBox="0 0 420 150" role="img" aria-label="POST without text returns 400">
${V.ic('phone',8,20,44,'ic-info')}<text class="t-m" x="60" y="40" style="font-size:14px">POST {}</text>
${AR(60,56,264,56,'-a')}
<rect class="bx" x="270" y="30" width="96" height="52" rx="8"/><text class="t-m" x="318" y="61" text-anchor="middle" style="font-size:14px">route.ts</text>
<rect class="bx-bad" x="60" y="100" width="300" height="38" rx="8"/><text class="t-m" x="72" y="125" style="font-size:14px">400 { "error": "text required" }</text>
</svg>`],
 ['It tries again with <b>{"text":"Hi"}</b>. The handler saves it and answers <b>201 Created</b> with the new message as JSON.',`<svg viewBox="0 0 420 150" role="img" aria-label="POST with text returns 201">
${V.ic('phone',8,20,44,'ic-info')}<text class="t-m" x="60" y="40" style="font-size:14px">POST {"text":"Hi"}</text>
${AR(60,56,264,56,'-a')}
<rect class="bx-ok" x="270" y="30" width="96" height="52" rx="8"/><text class="t-m" x="318" y="61" text-anchor="middle" style="font-size:14px">route.ts</text>
<rect class="bx-ok" x="60" y="100" width="300" height="38" rx="8"/><text class="t-m" x="72" y="125" style="font-size:14px">201 { "id": 3, "text": "Hi" }</text>
</svg>`],
 ['A <b>GET</b> to the same URL runs the GET function instead, and returns every message with status <b>200</b>.',`<svg viewBox="0 0 420 150" role="img" aria-label="GET returns all messages">
${V.ic('phone',8,20,44,'ic-info')}<text class="t-m" x="60" y="40" style="font-size:14px">GET</text>
${AR(60,56,264,56,'-a')}
<rect class="bx-ok" x="270" y="30" width="96" height="52" rx="8"/><text class="t-m" x="318" y="61" text-anchor="middle" style="font-size:14px">route.ts</text>
<rect class="bx-ok" x="60" y="100" width="300" height="38" rx="8"/><text class="t-m" x="72" y="125" style="font-size:14px">200 [ {…}, {…}, {…} ]</text>
</svg>`]])}
${V.rules(V.no('export async function post()','Method names must be capitals: POST'),V.ok('app/api/messages/route.ts','The file must be called route.ts (or route.js)'),
 V.no('page.tsx and route.ts in one folder','One URL cannot be both a page and an API'),V.ok('await req.json()','Reading the body is asynchronous'))}
${V.hook(`Your own forms use actions. Everyone else knocks at <code>route.ts</code>.`)}
`)}

${V.card(3,'Static or dynamic','a printed menu or cooked to order',`
${V.steps([
 ['You run <b>next build</b>. It goes through every route and decides how each will be served.',`<svg viewBox="0 0 420 200" role="img" aria-label="next build starts">
${CP(6,8,408,['$ next build','Route (app)','┌ ○ /','├ ○ /about','├ ƒ /api/messages','└ ƒ /dashboard'],0,14,26)}
</svg>`],
 ['<b>○ Static</b>: pages that look the same for everyone are rendered once, now, and saved. Like a printed menu, they are ready instantly.',`<svg viewBox="0 0 420 200" role="img" aria-label="Static routes highlighted">
${CP(6,8,240,['$ next build','Route (app)','┌ ○ /','├ ○ /about','├ ƒ /api/messages','└ ƒ /dashboard'],2,14,26)}
${V.ic('book',290,30,60,'ic-ok')}<text class="t-b t-ok" x="320" y="116" text-anchor="middle">○ static</text><text class="t-s" x="320" y="140" text-anchor="middle">built once</text>
</svg>`],
 ['<b>ƒ Dynamic</b>: pages that read cookies, headers or search params, like a dashboard for the logged-in user, are cooked to order on every request.',`<svg viewBox="0 0 420 200" role="img" aria-label="Dynamic routes highlighted">
${CP(6,8,240,['$ next build','Route (app)','┌ ○ /','├ ○ /about','├ ƒ /api/messages','└ ƒ /dashboard'],5,14,26)}
${V.ic('clock',290,30,60,'ic-a')}<text class="t-b t-a" x="320" y="116" text-anchor="middle">ƒ dynamic</text><text class="t-s" x="320" y="140" text-anchor="middle">per request</text>
</svg>`]])}
${V.like(`<p>A café prints its standard menu once in the morning (static), but makes your sandwich when you order it, because only you know what you want in it (dynamic).</p>`)}
${V.rules(V.ok('About page','Same for everyone: static'),V.ok('Dashboard reading cookies()','Different per visitor: dynamic'),V.ok('next build, then read the table','The symbols tell you how each route will be served'))}
${V.build(`<ol><li>Write an action with the directive, read the field by its name, save it and revalidate <code>/</code>; pass it to the form's <code>action</code>.</li><li>Create <code>app/api/messages/route.ts</code> exporting <code>GET</code> that returns the messages with <code>NextResponse.json</code>.</li><li>Add <code>POST</code>: 400 when the text is missing, 201 with the new message otherwise.</li><li>Run <code>next build</code> in the terminal and find the ○ and ƒ symbols.</li></ol>`)}
${V.hook(`Same for everyone? Print it once (○). Depends on who is asking? Cook it each time (ƒ).`)}
`)}

<div class="try"><b>Try it in your head</b>1. What does <code>formData.get('text')</code> read? <i>The field whose name attribute is "text".</i> 2. Which status means "created"? <i>201.</i> 3. Is a page that reads the session cookie static or dynamic? <i>Dynamic (ƒ): it differs per visitor.</i></div>
`);

/* n6 helpers: a Post table. cols: show the published column; rows: [id,title,pub,cls] */
const PT=(x,y,pubCol,rows,hl)=>{let s='<rect class="'+(hl||'bx')+'" x="'+x+'" y="'+y+'" width="'+(pubCol?266:170)+'" height="'+(34+rows.length*30)+'" rx="8"/><text class="t-b" x="'+(x+10)+'" y="'+(y+22)+'" style="font-size:14px">id</text><text class="t-b" x="'+(x+44)+'" y="'+(y+22)+'" style="font-size:14px">title</text>'+(pubCol?'<text class="t-b t-ok" x="'+(x+170)+'" y="'+(y+22)+'" style="font-size:14px">published</text>':'')+'<path class="ln" d="M'+x+' '+(y+30)+'h'+(pubCol?266:170)+'"/>';
 rows.forEach((r,i)=>{const ry=y+52+i*30;if(r[3])s+='<rect class="'+r[3]+'" x="'+(x+3)+'" y="'+(ry-19)+'" width="'+(pubCol?260:164)+'" height="26" rx="4"/>';s+='<text class="t-m'+(r[4]?' t-dim':'')+'" x="'+(x+12)+'" y="'+ry+'" style="font-size:14px">'+r[0]+'</text><text class="t-m'+(r[4]?' t-dim':'')+'" x="'+(x+44)+'" y="'+ry+'" style="font-size:14px">'+r[1]+'</text>'+(pubCol?'<text class="t-m'+(r[4]?' t-dim':'')+'" x="'+(x+170)+'" y="'+ry+'" style="font-size:14px">'+r[2]+'</text>':'')});return s};

explain('n6',`
<p>Almost every real app stores data in a database, and the database speaks SQL, not TypeScript. Prisma is the translator: you describe your data once, and it builds the tables and gives you typed, autocompleting queries.</p>

${V.card(1,'Schema to database','a blueprint the builders follow',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A blueprint of model Post with id, title and createdAt becomes a Post table in the database">
<rect class="bx-info" x="6" y="8" width="196" height="150" rx="10"/>${V.ic('file',14,16,26,'ic-info')}<text class="t-s" x="46" y="34">schema.prisma</text>
<text class="t-m" x="18" y="66" style="font-size:14px">model Post {</text>
<text class="t-m" x="30" y="92" style="font-size:14px">id        Int</text>
<text class="t-m" x="30" y="116" style="font-size:14px">title     String</text>
<text class="t-m" x="30" y="140" style="font-size:14px">createdAt DateTime</text>
${AR(208,84,236,84,'-a')}<text class="t-s" x="222" y="110" text-anchor="middle">migrate</text>
${V.ic('db',300,8,40,'ic-info')}<text class="t-b" x="346" y="34">Post</text>
<rect class="bx" x="242" y="54" width="172" height="104" rx="8"/>
<text class="t-b" x="252" y="76" style="font-size:14px">id</text><text class="t-b" x="282" y="76" style="font-size:14px">title</text><text class="t-b" x="356" y="76" style="font-size:14px">created</text>
<path class="ln" d="M242 84h172"/>
<text class="t-m" x="254" y="108" style="font-size:14px">1</text><text class="t-m" x="282" y="108" style="font-size:14px">Hello</text><text class="t-m" x="356" y="108" style="font-size:14px">10-12</text>
<text class="t-m" x="254" y="138" style="font-size:14px">2</text><text class="t-m" x="282" y="138" style="font-size:14px">Ideas</text><text class="t-m" x="356" y="138" style="font-size:14px">10-14</text>
</svg><figcaption>You write the blueprint (a model in schema.prisma). A migration turns it into a real table: one column per field, one row per post.</figcaption></figure>
${V.like(`<p>An architect's blueprint and a building crew. You never lay bricks yourself: you change the drawing, and the crew compares it with the building and does only the work needed. Every job sheet is filed, so the next site can be built exactly the same way.</p>`)}
${V.why(`<p>Writing SQL by hand for every table and query is slow and nothing checks that your code matches the tables. An <b>ORM</b> (object-relational mapper) maps tables to objects in your language. Prisma, first released in 2019, became the most popular ORM for TypeScript because the schema gives you types for free.</p>`)}
${V.anat([[1,'published'],' ',[2,'Boolean'],' ',[3,'@default(false)']],[
 '<b>Field name.</b> Becomes a column. camelCase by convention.',
 '<b>Prisma type.</b> <code>Int</code>, <code>String</code>, <code>Boolean</code>, <code>DateTime</code> and more. Each maps to a database column type and a TypeScript type.',
 '<b>Attribute.</b> Extra rules with <code>@</code>: <code>@default(false)</code> gives new rows a value, <code>@id</code> marks the primary key, <code>@default(autoincrement())</code> counts 1, 2, 3.'])}
<p><b>Watch a migration.</b> You add one field and run <code>npx prisma migrate dev --name add_published</code>.</p>
${V.steps([
 ['You add a line to the blueprint: <b>published Boolean @default(false)</b>. The database has not changed yet.',`<svg viewBox="0 0 420 210" role="img" aria-label="New field added to the schema">
${CP(6,8,408,['model Post {','  id     Int    @id @default(autoincrement())','  title  String','  published Boolean @default(false)','}'],3,13,24)}
<text class="t-s" x="8" y="168">schema.prisma</text>
</svg>`],
 ['<b>migrate dev</b> compares the blueprint with the real database and finds one difference: the table has no published column.',`<svg viewBox="0 0 420 210" role="img" aria-label="Prisma finds the difference">
${PT(6,8,false,[['1','Hello'],['2','Draft']])}
${V.ic('search',190,40,44,'ic-a')}
<rect class="bx-warn" x="246" y="30" width="168" height="60" rx="8"/><text class="t-s" x="258" y="54">missing column:</text><text class="t-m" x="258" y="78" style="font-size:14px">published</text>
</svg>`],
 ['It writes the change as SQL in a new, dated <b>migration file</b>, named after your <b>--name</b>.',`<svg viewBox="0 0 420 210" role="img" aria-label="A migration SQL file is written">
${V.ic('file',8,8,32,'ic-info')}<text class="t-m" x="44" y="22" style="font-size:13px">prisma/migrations/</text><text class="t-m" x="44" y="40" style="font-size:13px">20261015120000_add_published/migration.sql</text>
${CP(6,52,408,['ALTER TABLE "Post"','  ADD COLUMN "published" BOOLEAN','  NOT NULL DEFAULT false;'],-1,14,26)}
</svg>`],
 ['It runs that SQL on your database. The new column appears, and existing rows get the default, <b>false</b>.',`<svg viewBox="0 0 420 210" role="img" aria-label="The table gains a published column">
${PT(6,8,true,[['1','Hello','false'],['2','Draft','false']],'bx-ok')}
${V.ic('check',290,36,44,'ic-ok')}
</svg>`],
 ['Finally the <b>Prisma Client</b> is generated again from the schema, so <b>post.published</b> now autocompletes in your code as a boolean.',`<svg viewBox="0 0 420 210" role="img" aria-label="The typed client knows about published">
${CP(6,8,408,['const posts = await prisma.post.findMany();','posts[0].published   // boolean'],1,14,28)}
${V.ic('gear',12,90,40,'ic-a')}<text class="t-m" x="60" y="116" style="font-size:14px">npx prisma generate</text>
<text class="t-s" x="60" y="140">(run by migrate dev in Prisma 6 and earlier)</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('Editing the production database by hand','The change is in no file, so dev, CI and production drift apart'),V.ok('Every change is a migration','Committed to Git and applied the same way everywhere'),
 V.no('Editing a migration that already ran','Make a new migration instead'),V.ok('npx prisma migrate deploy','Applies committed migrations in production'),
 V.rh('Conventions'),V.ok('model Post','Models are PascalCase and singular'),V.ok('--name add_published','Name each migration after what it changes'))}
${V.hook(`Change the blueprint, migrate, commit. Never lay bricks by hand.`)}
`)}

${V.card(2,'Typed queries','an order ticket for the database',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="Your code hands an order ticket with where and orderBy to Prisma, which fetches matching rows from the database">
${V.ic('laptop',8,40,56,'ic-a')}<text class="t-s" x="36" y="120" text-anchor="middle">your code</text>
<rect class="bx-warn" x="80" y="20" width="150" height="104" rx="6"/><text class="t-b" x="92" y="42" style="font-size:14px">ticket</text><text class="t-m" x="92" y="70" style="font-size:14px">where:</text><text class="t-m" x="104" y="90" style="font-size:14px">published</text><text class="t-m" x="92" y="114" style="font-size:14px">orderBy: id↓</text>
${AR(236,72,272,72,'-a')}
${V.ic('robot',278,40,56,'ic-p')}<text class="t-s" x="306" y="120" text-anchor="middle">Prisma</text>
${V.ic('db',356,40,56,'ic-info')}<text class="t-s" x="384" y="120" text-anchor="middle">database</text>
<text class="t" x="210" y="164" text-anchor="middle">SQL goes out, typed Post objects come back</text>
</svg><figcaption>You fill in a ticket as a plain object. Prisma writes the SQL, runs it, and hands back objects with the right TypeScript type.</figcaption></figure>
${V.anat(['await ',[1,'prisma.post'],'.',[2,'findMany'],'({\n  ',[3,'where: { published: true }'],',\n  ',[4,"orderBy: { id: 'desc' }"],'\n});'],[
 '<b>The model.</b> Model <code>Post</code> becomes <code>prisma.post</code>, lowercase.',
 '<b>The operation.</b> <code>findMany</code> (a list), <code>findUnique</code> (one by id), <code>create</code>, <code>update</code>, <code>delete</code>.',
 '<b>Filter.</b> Only rows matching this. Like SQL WHERE.',
 '<b>Sort.</b> <code>\'desc\'</code> means newest (highest id) first.'])}
${V.steps([
 ['The table holds three posts. One is a draft: published is false.',`<svg viewBox="0 0 420 160" role="img" aria-label="Three rows in the table">
${PT(6,8,true,[['1','Hello','true'],['2','Draft','false'],['3','Launch','true']])}
</svg>`],
 ['<b>where: { published: true }</b> keeps only matching rows. The draft is filtered out.',`<svg viewBox="0 0 420 160" role="img" aria-label="Draft row filtered out">
${PT(6,8,true,[['1','Hello','true','bx-ok'],['2','Draft','false','',1],['3','Launch','true','bx-ok']])}
<path class="ln-x" d="M14 86H262"/>
</svg>`],
 ['<b>orderBy: { id: \'desc\' }</b> sorts what is left, highest id first. You get back a typed list: <b>Post[]</b>.',`<svg viewBox="0 0 420 160" role="img" aria-label="Result sorted 3 then 1">
${PT(6,8,true,[['3','Launch','true','bx-ok'],['1','Hello','true','bx-ok']])}
<text class="t-m t-ok" x="290" y="70" style="font-size:16px;font-weight:700">→ Post[]</text>
</svg>`]])}
<p>Writing works the same way: <code>await prisma.post.create({ data: { title: 'Hello' } })</code>. Call it from a server action, then revalidate the page.</p>
${V.rules(V.no('prisma.Post.findMany()','The client uses the lowercase model name'),V.no('prisma.post.create({ title: \'Hi\' })','The values go inside data: { … }'),
 V.no('const posts = prisma.post.findMany()','Forgot await: you get a Promise, not posts'),V.ok('In server code only','Prisma talks to the database: use it in server components and actions'))}
${V.build(`<ol><li>Run your first migration with a <code>--name</code> and watch the migration file appear.</li><li>List posts with <code>findMany</code> in the page, and add a form whose server action calls <code>create</code>.</li><li>Add a boolean field with a default to the model, then run a second migration.</li><li>Add a <code>where</code> so only published posts show. Create one and check it stays hidden.</li></ol>`)}
${V.hook(`Schema is the blueprint, migrations are the job sheets, the client is the waiter with your order.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Model <code>Comment</code>: what is the client property? <i>prisma.comment.</i> 2. You added a field to the schema. What next? <i>Run a new migration and commit it.</i> 3. Why does an old post show published = false? <i>The @default(false) filled in existing rows.</i></div>
`);

/* n7 helpers: browser (left) and server (right) for login; door scene for middleware. */
const LG=(o)=>'<rect class="'+(o.b||'bx')+'" x="6" y="8" width="160" height="176" rx="12"/><text class="t-b" x="18" y="32">Browser</text>'+
 '<rect class="bx" x="18" y="44" width="136" height="28" rx="5"/><text class="t-m" x="26" y="64" style="font-size:13px">ada@example.com</text><rect class="bx" x="18" y="80" width="136" height="28" rx="5"/><text class="t-m" x="26" y="100" style="font-size:14px">'+(o.pw||'••••••••')+'</text>'+
 (o.cookie?V.ic('card',22,120,40,'ic-ok')+'<text class="t-m t-ok" x="68" y="146" style="font-size:14px">session</text>':'')+(o.msg||'')+
 '<rect class="'+(o.s||'bx')+'" x="254" y="8" width="160" height="176" rx="12"/><text class="t-b" x="266" y="32">Server</text>'+V.ic('db',266,44,40,'ic-info')+'<text class="t-s" x="312" y="62">stored hash</text><text class="t-m" x="312" y="82" style="font-size:13px">$2b$12$Xa…</text>'+(o.srv||'');
const DOOR=(o)=>V.ic(o.who||'person',8,40,60,o.wc||'ic-info')+(o.cookie?V.ic('card',52,94,30,'ic-ok'):'')+'<text class="t-m" x="8" y="30" style="font-size:14px">'+o.url+'</text>'+
 '<rect class="'+(o.mb||'bx-warn')+'" x="140" y="20" width="110" height="130" rx="10"/>'+V.ic('shield',170,36,50,'ic-warn')+'<text class="t-m" x="195" y="112" text-anchor="middle" style="font-size:13px">middleware</text>'+
 '<rect class="'+(o.db||'bx')+'" x="300" y="20" width="114" height="130" rx="10"/>'+V.ic(o.dic||'lock',332,44,50,o.dcl||'ic-p')+'<text class="t-m" x="357" y="128" text-anchor="middle" style="font-size:13px">/dashboard</text>'+(o.extra||'');

explain('n7',`
<p>Every app with accounts has to answer one question on every request: who is this? Get it wrong and strangers read other people's data. This lesson shows the moving parts that libraries like Auth.js and Clerk handle for you.</p>

${V.card(1,'Logging in','swap a password for a wristband',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="At the ticket desk a person proves who they are once and gets a wristband labelled session, with three safety stamps: httpOnly, secure and sameSite">
${V.ic('person',10,40,70,'ic-info')}<text class="t-s" x="45" y="130" text-anchor="middle">you</text>
${AR(90,74,126,74,'-a')}<text class="t-s" x="108" y="60" text-anchor="middle">password</text>
<rect class="bx-info" x="134" y="30" width="96" height="92" rx="10"/>${V.ic('lock',160,44,44,'ic-info')}<text class="t-s" x="182" y="112" text-anchor="middle">check once</text>
${AR(236,74,268,74,'-ok')}
<rect class="bx-ok" x="276" y="44" width="138" height="56" rx="28"/>${V.ic('card',288,54,36,'ic-ok')}<text class="t-m" x="332" y="78" style="font-size:14px">session</text>
<text class="t-m" x="6" y="164" style="font-size:14px">httpOnly</text><text class="t-m" x="134" y="164" style="font-size:14px">secure</text><text class="t-m" x="262" y="164" style="font-size:14px">sameSite</text>
</svg><figcaption>You prove who you are once, with your password. The server gives the browser a session cookie, and the browser shows it on every later request.</figcaption></figure>
${V.like(`<p>A festival wristband. At the gate you show your ticket and ID once, and they snap a band on your wrist. After that, staff just glance at the band. It cannot be slipped off and handed to someone else easily, and it only works at this festival.</p>`)}
${V.why(`<p>The web forgets you between requests: each one arrives as a stranger. Typing a password on every click is impossible, so after one check the server sets a <b>cookie</b>, a small named value the browser stores and sends back automatically. Passwords themselves are never stored, only a <b>hash</b>: a scrambled fingerprint (made with bcrypt or argon2) that cannot be turned back into the password.</p>`)}
${V.anat(['cookies().set(',[1,"'session'"],', ',[2,'sessionId'],', {\n  ',[3,'httpOnly: true'],', ',[4,'secure: true'],', ',[5,"sameSite: 'lax'"],'\n});'],[
 '<b>Cookie name.</b>',
 '<b>Value.</b> In real apps a long random ID or a signed token, never a password.',
 '<b>httpOnly.</b> JavaScript on the page cannot read it, so an XSS bug (attacker script running in your page) cannot steal it.',
 '<b>secure.</b> Only sent over HTTPS, so nobody on the café Wi-Fi can read it.',
 '<b>sameSite.</b> Not sent when another site tries to trigger requests to yours, which blocks most CSRF attacks.'])}
${V.steps([
 ['You submit the login form. The email and password go to a server action over HTTPS.',`<svg viewBox="0 0 420 190" role="img" aria-label="Login form posts to the server">
${LG({b:'bx-hl'})}
${AR(170,90,250,90,'-a')}${V.ic('mail',192,52,32,'ic-a')}
</svg>`],
 ['The server finds the <b>stored hash</b> for that email, hashes what you typed the same way, and compares the two fingerprints.',`<svg viewBox="0 0 420 190" role="img" aria-label="Server compares hashes">
${LG({s:'bx-hl',srv:'<text class="t-m" x="312" y="118" style="font-size:13px">hash(typed)</text><text class="t-b" x="334" y="142" text-anchor="middle">=?</text>'})}
</svg>`],
 ['If they differ, it answers <b>"Wrong email or password"</b>. It never says which one was wrong, so attackers cannot test which emails have accounts.',`<svg viewBox="0 0 420 190" role="img" aria-label="Wrong password message">
${LG({pw:'••••',msg:'<text class="t-bad" x="18" y="140" style="font-size:13px">Wrong email</text><text class="t-bad" x="18" y="160" style="font-size:13px">or password</text>',srv:V.ic('cross',312,110,40,'ic-bad')})}
</svg>`],
 ['If they match, the server sets the <b>session cookie</b> with all three safety flags, then calls <b>redirect(\'/dashboard\')</b>.',`<svg viewBox="0 0 420 190" role="img" aria-label="Server sets the cookie">
${LG({s:'bx-ok',srv:V.ic('check',312,110,40,'ic-ok')})}
${AR(250,140,170,140,'-ok')}<text class="t-s" x="210" y="130" text-anchor="middle">Set-Cookie</text>
</svg>`],
 ['The browser keeps the wristband and sends it automatically with every request to your site. Scripts on the page cannot read it.',`<svg viewBox="0 0 420 190" role="img" aria-label="Browser now holds the cookie">
${LG({cookie:true,b:'bx-ok'})}
${AR(170,160,250,160,'-ok')}<text class="t-s" x="210" y="150" text-anchor="middle">every request</text>
</svg>`]])}
${V.rules(V.rh('Security musts'),
 V.no('password === user.password','Never store or compare plain passwords: compare hashes'),V.ok('bcrypt / argon2','Slow hashing on purpose, so guessing is expensive'),
 V.no('"No account with that email"','Leaks which emails exist. Say "Wrong email or password"'),V.ok('httpOnly, secure, sameSite','Set all three on session cookies'),
 V.rh('Version note'),V.ok('(await cookies()).set(…)','Next.js 15 and later: cookies() is async. This sandbox follows Next 14'))}
${V.hook(`Check the password once, hand out a wristband, and make it httpOnly, secure and sameSite.`)}
`)}

${V.card(2,'Middleware','a bouncer at the door',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A visitor walks to the dashboard door and a bouncer called middleware checks for a wristband first">
${DOOR({url:'GET /dashboard',cookie:true})}
${AR(84,84,134,84,'-a')}${AR(256,84,294,84,'-ok')}
</svg><figcaption>Middleware runs before the page, for every URL that matches. No wristband, no entry: it sends you to /login instead.</figcaption></figure>
${V.like(`<p>A bouncer at the door of the VIP room. He does not cook or serve. He checks one thing, your wristband, before you get anywhere near the room, and points you back to the ticket desk if you have none.</p>`)}
${V.anat(['export function middleware(',[1,'request: NextRequest'],') {\n  if (!',[2,"request.cookies.get('session')"],')\n    return ',[3,"NextResponse.redirect(new URL('/login', request.url))"],';\n  return ',[4,'NextResponse.next()'],';\n}\nexport const config = { ',[5,"matcher: ['/dashboard/:path*']"],' };'],[
 '<b>The incoming request</b>, before any page runs.',
 '<b>Check the wristband.</b> Is there a session cookie?',
 '<b>Turn them away.</b> Redirect to /login. <code>new URL</code> builds a full address from the current one.',
 '<b>Let them in.</b> Carry on to the page as normal.',
 '<b>Which doors to guard.</b> <code>:path*</code> means /dashboard and everything under it.'])}
${V.steps([
 ['A visitor with no cookie asks for <b>/dashboard</b>. The URL matches the matcher, so middleware runs first.',`<svg viewBox="0 0 420 160" role="img" aria-label="Visitor without cookie reaches middleware">
${DOOR({url:'GET /dashboard',mb:'bx-hl'})}
${AR(84,84,134,84,'-a')}
</svg>`],
 ['No session cookie, so it returns a <b>redirect to /login</b>. The dashboard code never runs.',`<svg viewBox="0 0 420 160" role="img" aria-label="Redirect to login">
${DOOR({url:'→ /login',mb:'bx-bad',wc:'ic-bad'})}
${AR(134,120,84,120,'')}<text class="t-bad" x="108" y="146" text-anchor="middle" style="font-size:14px">307</text>
</svg>`],
 ['After logging in, the browser sends the cookie. Middleware finds it and calls <b>NextResponse.next()</b>: the dashboard renders.',`<svg viewBox="0 0 420 160" role="img" aria-label="With cookie the dashboard opens">
${DOOR({url:'GET /dashboard',cookie:true,mb:'bx-ok',db:'bx-ok',dic:'unlock',dcl:'ic-ok'})}
${AR(84,84,134,84,'-a')}${AR(256,84,294,84,'-ok')}
</svg>`],
 ['<b>Log out</b> deletes the cookie. Ask for /dashboard again and the bouncer sends you to /login once more.',`<svg viewBox="0 0 420 160" role="img" aria-label="After logout the visitor is redirected again">
${DOOR({url:'GET /dashboard',mb:'bx-bad',extra:'<text class="t-s" x="8" y="150">cookie deleted</text>'})}
${AR(84,84,134,84,'-a')}
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no("matcher: ['/dashboard']",'Guards only that exact page, not /dashboard/settings'),V.ok("matcher: ['/dashboard/:path*']",'Guards the page and everything below it'),
 V.no('Checking only in middleware','Also check the session where the data is read. A 2025 Next.js bug let attackers skip middleware entirely'),
 V.rh('Conventions'),V.ok('Auth.js, Clerk, Supabase Auth','In real projects use a proven library: it handles expiry, rotation, OAuth and CSRF'),
 V.ok('proxy.ts','Next.js 16 renamed middleware.ts to proxy.ts (export function proxy). Same idea'))}
${V.build(`<ol><li>Create <code>middleware.ts</code> in the project root that redirects to /login when there is no session cookie, with a matcher for the dashboard.</li><li>Build the login page: its server action checks the password, sets an httpOnly cookie and redirects to /dashboard.</li><li>Show "Wrong email or password" when the check fails.</li><li>Add a log out action that deletes the cookie and redirects to /login.</li></ol>`)}
${V.hook(`Login hands out the wristband. Middleware is the bouncer. Logout cuts the band off.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Why httpOnly? <i>Scripts on the page cannot read the cookie, so an XSS bug cannot steal the session.</i> 2. Does middleware run for <code>/about</code> with the matcher above? <i>No: only /dashboard and below.</i> 3. What does the server store instead of passwords? <i>A slow hash, made with bcrypt or argon2.</i></div>
`);
}
