/* python: visual "Understand it" walkthroughs. */

explain('yb1',`
<p>Every app you use, from YouTube's recommendations to the program that marks exam papers, starts with three tiny skills: showing something, remembering something and knowing what kind of thing it is. Today you learn all three in Python, the language behind most of the world's data science and AI.</p>

${V.card(1,'print()','the program\'s loudspeaker',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="The line print Hello world goes into Python and Hello, world! appears in the output. print of 2 plus 3 shows 5">
<rect class="bx-dark" x="8" y="14" width="226" height="56" rx="8"/><text class="t-term" x="20" y="48" style="font-size:14px">print("Hello, world!")</text>
<path class="ln-a" d="M238 42H258"/><polygon class="ah-a" points="256,35 256,49 268,42"/>
<rect class="bx-ok" x="272" y="14" width="140" height="56" rx="8"/><text class="t-m" x="342" y="48" text-anchor="middle">Hello, world!</text>
<rect class="bx-dark" x="8" y="96" width="226" height="56" rx="8"/><text class="t-term" x="20" y="130" style="font-size:14px">print(2 + 3)</text>
<path class="ln-a" d="M238 124H258"/><polygon class="ah-a" points="256,117 256,131 268,124"/>
<rect class="bx-ok" x="272" y="96" width="140" height="56" rx="8"/><text class="t-m" x="342" y="132" text-anchor="middle" style="font-size:22px">5</text>
</svg><figcaption>Whatever you put inside the brackets, print shows in the Output area. If it is a sum, Python works out the answer first and prints that.</figcaption></figure>
${V.like(`<p>A school loudspeaker. Your program does lots of work silently. <code>print</code> is the button you press to announce something so a person can hear (well, see) it.</p>`)}
${V.why(`<p>A program that never shows anything is useless to a human. Python was created by Guido van Rossum and first released in 1991, with the goal of being as readable as English. That is why its "show this" command is simply the word <b>print</b>.</p>`)}
${V.anat([[1,'print'],[2,'('],[3,'"Hello, world!"'],[2,')']],[
 '<b>Function name.</b> A function is a ready-made command that does one job. This one shows things.',
 '<b>Brackets.</b> They mean "run it now", and they hold what you hand over. That item is called the <b>argument</b>.',
 '<b>A string.</b> Text in quotes. The quotes show Python where the text starts and ends.'])}
${V.rules(V.rh('Rules: break one and Python stops with an error'),
 V.ok('print("hi")','Lower case p, round brackets'),V.no('Print("hi")','Capitals matter: Print is a different (unknown) name'),
 V.no('print "hi"','Old Python 2 style. Python 3 needs brackets'),V.no('print("hi\')','Open and close with the same kind of quote'),
 V.rh('Conventions'),V.ok('# a comment','Python skips anything after #. Use it for notes to humans'))}
${V.hook(`Brackets to run it, quotes round text: <code>print("...")</code> is your program's voice.`)}
`)}

${V.card(2,'Variables','name tags tied to values',`
<figure class="fig"><svg viewBox="0 0 420 196" role="img" aria-label="Three name tags on strings: name tied to the text Ada, age tied to 36, is_member tied to True">
<path class="bx-a" d="M24 12H112L124 26 112 40H24Z"/><text class="t-m" x="70" y="31" text-anchor="middle">name</text>
<path class="bx-a" d="M162 12H250L262 26 250 40H162Z"/><text class="t-m" x="208" y="31" text-anchor="middle">age</text>
<path class="bx-a" d="M296 12H398L410 26 398 40H296Z"/><text class="t-m" x="348" y="31" text-anchor="middle">is_member</text>
<path class="ln-d" d="M70 40V68M208 40V68M348 40V68"/>
<circle class="bx-info" cx="70" cy="110" r="42"/><text class="t-m" x="70" y="117" text-anchor="middle" style="font-size:19px">"Ada"</text>
<circle class="bx-ok" cx="208" cy="110" r="42"/><text class="t-m" x="208" y="118" text-anchor="middle" style="font-size:22px">36</text>
<circle class="bx-warn" cx="348" cy="110" r="42"/><text class="t-m" x="348" y="117" text-anchor="middle" style="font-size:19px">True</text>
<text class="t-b" x="70" y="184" text-anchor="middle">str</text><text class="t-b" x="208" y="184" text-anchor="middle">int</text><text class="t-b" x="348" y="184" text-anchor="middle">bool</text>
</svg><figcaption>A Python variable is a name tag tied to a value. The value is the real thing; the tag is just how you find it again. Move the tag and the name points somewhere new.</figcaption></figure>
${V.like(`<p>Name tags at a party. The person (the value) exists on their own. The sticker says what to call them. You can peel a sticker off and stick it on someone else, and two stickers can even be on the same person.</p>`)}
${V.why(`<p>Inside the computer, values sit in memory at numbered addresses. Nobody wants to write "the thing at slot 140229". A variable lets you say <code>age</code> instead, so your code reads like a sentence.</p>`)}
${V.anat([[1,'age'],' ',[2,'='],' ',[3,'36']],[
 '<b>Name.</b> The tag. You choose it.',
 '<b>Assignment.</b> One <code>=</code> means "tie this name to this value". It is not "equals" from maths.',
 '<b>Value.</b> Python works this side out first, then ties the name to the answer.'])}
<p><b>Watch Python run it.</b> Follow the arrow and see what happens to the tags.</p>
${V.steps([
 ['Line 1. Python makes the text <b>"Ada"</b> and ties the tag <b>name</b> to it.',`<svg viewBox="0 0 420 190" role="img" aria-label="name tied to Ada">
<rect class="bx-dark" x="6" y="8" width="204" height="150" rx="8"/>
<text class="t-a" x="12" y="42" style="font-size:15px">&#9654;</text><text class="t-term" x="30" y="42" style="font-size:14px">name = "Ada"</text>
<text class="t-term t-dim" x="30" y="74" style="font-size:14px">age = 36</text>
<text class="t-term t-dim" x="30" y="106" style="font-size:14px">age = age + 1</text>
<text class="t-term t-dim" x="30" y="138" style="font-size:14px">print(age)</text>
<path class="bx-a" d="M222 36H284L296 50 284 64H222Z"/><text class="t-m" x="253" y="55" text-anchor="middle">name</text>
<path class="ln-d" d="M296 50H316"/><rect class="bx-info" x="318" y="30" width="92" height="40" rx="20"/><text class="t-m" x="364" y="56" text-anchor="middle">"Ada"</text>
</svg>`],
 ['Line 2. A new value, <b>36</b>, gets the tag <b>age</b>.',`<svg viewBox="0 0 420 190" role="img" aria-label="age tied to 36">
<rect class="bx-dark" x="6" y="8" width="204" height="150" rx="8"/>
<text class="t-term t-dim" x="30" y="42" style="font-size:14px">name = "Ada"</text>
<text class="t-a" x="12" y="74" style="font-size:15px">&#9654;</text><text class="t-term" x="30" y="74" style="font-size:14px">age = 36</text>
<text class="t-term t-dim" x="30" y="106" style="font-size:14px">age = age + 1</text>
<text class="t-term t-dim" x="30" y="138" style="font-size:14px">print(age)</text>
<path class="bx-a" d="M222 36H284L296 50 284 64H222Z"/><text class="t-m" x="253" y="55" text-anchor="middle">name</text>
<path class="ln-d" d="M296 50H316"/><rect class="bx-info" x="318" y="30" width="92" height="40" rx="20"/><text class="t-m" x="364" y="56" text-anchor="middle">"Ada"</text>
<path class="bx-a" d="M222 96H274L286 110 274 124H222Z"/><text class="t-m" x="248" y="115" text-anchor="middle">age</text>
<path class="ln-d" d="M286 110H300"/><rect class="bx-ok" x="302" y="90" width="50" height="40" rx="20"/><text class="t-m" x="327" y="116" text-anchor="middle">36</text>
</svg>`],
 ['Line 3. The right side runs first: age is 36, plus 1 is <b>37</b>. Python makes the new value 37 and moves the <b>age</b> tag onto it. Nothing points at 36 any more, so Python throws it away.',`<svg viewBox="0 0 420 190" role="img" aria-label="age tag moves from 36 to 37">
<rect class="bx-dark" x="6" y="8" width="204" height="150" rx="8"/>
<text class="t-term t-dim" x="30" y="42" style="font-size:14px">name = "Ada"</text>
<text class="t-term t-dim" x="30" y="74" style="font-size:14px">age = 36</text>
<text class="t-a" x="12" y="106" style="font-size:15px">&#9654;</text><text class="t-term" x="30" y="106" style="font-size:14px">age = age + 1</text>
<text class="t-term t-dim" x="30" y="138" style="font-size:14px">print(age)</text>
<path class="bx-a" d="M222 36H284L296 50 284 64H222Z"/><text class="t-m" x="253" y="55" text-anchor="middle">name</text>
<path class="ln-d" d="M296 50H316"/><rect class="bx-info" x="318" y="30" width="92" height="40" rx="20"/><text class="t-m" x="364" y="56" text-anchor="middle">"Ada"</text>
<path class="bx-a" d="M222 96H274L286 110 274 124H222Z"/><text class="t-m" x="248" y="115" text-anchor="middle">age</text>
<rect class="bx" x="302" y="90" width="50" height="40" rx="20"/><text class="t-m t-dim" x="327" y="116" text-anchor="middle">36</text><path class="ln-x" d="M306 126 348 94"/>
<path class="ln-a" d="M286 110C300 152 352 152 372 132"/><rect class="bx-ok" x="360" y="90" width="50" height="40" rx="20"/><text class="t-m" x="385" y="116" text-anchor="middle">37</text>
<text class="t-s" x="232" y="178" style="font-size:14px">36 + 1 = 37</text>
</svg>`],
 ['Line 4. <b>print(age)</b> follows the tag and shows what it points at: <b>37</b>.',`<svg viewBox="0 0 420 190" role="img" aria-label="Output 37">
<rect class="bx-dark" x="6" y="8" width="204" height="150" rx="8"/>
<text class="t-term t-dim" x="30" y="42" style="font-size:14px">name = "Ada"</text>
<text class="t-term t-dim" x="30" y="74" style="font-size:14px">age = 36</text>
<text class="t-term t-dim" x="30" y="106" style="font-size:14px">age = age + 1</text>
<text class="t-a" x="12" y="138" style="font-size:15px">&#9654;</text><text class="t-term" x="30" y="138" style="font-size:14px">print(age)</text>
<path class="bx-a" d="M222 36H284L296 50 284 64H222Z"/><text class="t-m" x="253" y="55" text-anchor="middle">name</text>
<path class="ln-d" d="M296 50H316"/><rect class="bx-info" x="318" y="30" width="92" height="40" rx="20"/><text class="t-m" x="364" y="56" text-anchor="middle">"Ada"</text>
<path class="bx-a" d="M222 96H274L286 110 274 124H222Z"/><text class="t-m" x="248" y="115" text-anchor="middle">age</text>
<path class="ln-d" d="M286 110H358"/><rect class="bx-ok" x="360" y="90" width="50" height="40" rx="20"/><text class="t-m" x="385" y="116" text-anchor="middle">37</text>
<text class="t-b" x="8" y="182">Output:</text><text class="t-m t-ok" x="76" y="182" style="font-size:18px">37</text>
</svg>`]])}
${V.rules(V.rh('Rules: break one and the code will not run'),
 V.no('2nd_place','A name cannot start with a digit'),V.ok('place_2','Digits are fine after the first character'),
 V.no('first name','No spaces: Python sees two names'),V.no('first-name','A hyphen is read as minus'),
 V.no('class = 3','Keywords such as class, if, for, def and True are taken'),V.ok('age vs Age','Capitals matter: these are two different names'),
 V.rh('Conventions: PEP 8, the official Python style guide'),
 V.ok('first_name','snake_case: lower-case words joined by underscores'),V.no('firstName','Works, but it is JavaScript style, not Python style'),
 V.no('x, data2, thing','Vague names. Say what it holds: price, user_count'),V.ok('MAX_LIVES = 3','ALL_CAPS signals a constant: please never change it'),
 V.no('print = 5','Never reuse built-in names. After this, print() stops working'))}
${V.build(`<ol><li>Decide what to remember: your name and age.</li><li>Pick snake_case names: <code>name</code>, <code>age</code>.</li><li>Tie them to values: <code>name = "Ada"</code> and <code>age = 36</code>. Text in quotes, numbers without.</li><li>Use them: <code>print(name)</code>.</li><li>Change one: <code>age = age + 1</code>, then print it again.</li></ol>`)}
${V.hook(`A variable is a sticker, not a box. One <code>=</code> sticks a name on a value.`)}
`)}

${V.card(3,'Types','what kind of value is it?',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="Four types: str holds text like Ada, int holds whole numbers like 36, float holds decimals like 19.99, bool holds True or False">
<rect class="bx-info" x="6" y="8" width="200" height="66" rx="10"/><text class="t-m" x="20" y="48" style="font-size:20px">"Ada"</text><text class="t-b" x="106" y="36">str</text><text class="t" x="106" y="60" style="font-size:14px">text</text>
<rect class="bx-ok" x="214" y="8" width="200" height="66" rx="10"/><text class="t-m" x="230" y="48" style="font-size:20px">36</text><text class="t-b" x="300" y="36">int</text><text class="t" x="300" y="60" style="font-size:14px">whole number</text>
<rect class="bx-a" x="6" y="84" width="200" height="66" rx="10"/><text class="t-m" x="20" y="124" style="font-size:20px">19.99</text><text class="t-b" x="106" y="112">float</text><text class="t" x="106" y="136" style="font-size:14px">decimal</text>
<rect class="bx-warn" x="214" y="84" width="200" height="66" rx="10"/><text class="t-m" x="230" y="124" style="font-size:20px">True</text><text class="t-b" x="300" y="112">bool</text><text class="t" x="300" y="136" style="font-size:14px">yes or no</text>
</svg><figcaption>Every value has a type, and the type decides what you can do with it. You can multiply numbers and make text upper case, but not the other way round.</figcaption></figure>
${V.like(`<p>Shapes in a shape-sorter toy. A star will not go through the circle hole. In the same way, Python will not add the text <code>"36"</code> to the number <code>1</code>. You must turn the star into a circle first.</p>`)}
${V.why(`<p>The computer stores text and numbers in completely different ways. Types tell Python how to read the bits, and stop you doing nonsense by accident, like "multiply my name by 7".</p>`)}
${V.anat([[1,'age_num'],' = ',[2,'int'],'(',[3,'"36"'],')'],[
 '<b>New name</b> for the converted value.',
 '<b>Converter.</b> Named after the type you want: <code>int()</code>, <code>float()</code>, <code>str()</code>.',
 '<b>The input.</b> Text that looks like a number. Anything typed by a person or read from a file arrives as text.'])}
${V.steps([
 ['<b>age_text</b> is tied to <b>"36"</b>. The quotes make it a <b>str</b>: the characters 3 and 6, not a number.',`<svg viewBox="0 0 420 196" role="img" aria-label="age_text holds the string 36">
<rect class="bx-dark" x="6" y="8" width="230" height="140" rx="8"/>
<text class="t-a" x="12" y="40" style="font-size:15px">&#9654;</text><text class="t-term" x="28" y="40" style="font-size:14px">age_text = "36"</text>
<text class="t-term t-dim" x="28" y="72" style="font-size:14px">age_text + 1</text>
<text class="t-term t-dim" x="28" y="104" style="font-size:14px">age_num = int(age_text)</text>
<text class="t-term t-dim" x="28" y="136" style="font-size:14px">age_num + 1</text>
<text class="t-m" x="250" y="30">age_text</text><rect class="bx-warn" x="250" y="40" width="80" height="40" rx="6"/><text class="t-m" x="290" y="66" text-anchor="middle">"36"</text><text class="t-b" x="344" y="66">str</text>
</svg>`],
 ['Python refuses to mix text and a number. It stops with a <b>TypeError</b>: can only concatenate str (not "int") to str.',`<svg viewBox="0 0 420 196" role="img" aria-label="TypeError when adding text and a number">
<rect class="bx-dark" x="6" y="8" width="230" height="140" rx="8"/>
<text class="t-term t-dim" x="28" y="40" style="font-size:14px">age_text = "36"</text>
<text class="t-a" x="12" y="72" style="font-size:15px">&#9654;</text><text class="t-term" x="28" y="72" style="font-size:14px">age_text + 1</text>
<text class="t-term t-dim" x="28" y="104" style="font-size:14px">age_num = int(age_text)</text>
<text class="t-term t-dim" x="28" y="136" style="font-size:14px">age_num + 1</text>
<text class="t-m" x="250" y="30">age_text</text><rect class="bx-warn" x="250" y="40" width="80" height="40" rx="6"/><text class="t-m" x="290" y="66" text-anchor="middle">"36"</text><text class="t-b" x="344" y="66">str</text>
${V.ic('cross',252,96,34,'ic-bad')}<text class="t-b t-bad" x="294" y="120">TypeError</text>
<text class="t-bad" x="8" y="180" style="font-size:14px">str + int: Python will not guess what you meant</text>
</svg>`],
 ['<b>int("36")</b> reads the characters and builds the real number <b>36</b>. The new tag <b>age_num</b> is tied to it.',`<svg viewBox="0 0 420 196" role="img" aria-label="int converts the string 36 to the number 36">
<rect class="bx-dark" x="6" y="8" width="230" height="140" rx="8"/>
<text class="t-term t-dim" x="28" y="40" style="font-size:14px">age_text = "36"</text>
<text class="t-term t-dim" x="28" y="72" style="font-size:14px">age_text + 1</text>
<text class="t-a" x="12" y="104" style="font-size:15px">&#9654;</text><text class="t-term" x="28" y="104" style="font-size:14px">age_num = int(age_text)</text>
<text class="t-term t-dim" x="28" y="136" style="font-size:14px">age_num + 1</text>
<text class="t-m" x="250" y="30">age_text</text><rect class="bx-warn" x="250" y="40" width="80" height="40" rx="6"/><text class="t-m" x="290" y="66" text-anchor="middle">"36"</text><text class="t-b" x="344" y="66">str</text>
<path class="ln-a" d="M290 82V100"/><polygon class="ah-a" points="283,98 297,98 290,108"/><text class="t-m t-a" x="304" y="100" style="font-size:14px">int()</text>
<text class="t-m" x="250" y="126">age_num</text><rect class="bx-ok" x="250" y="134" width="80" height="40" rx="6"/><text class="t-m" x="290" y="160" text-anchor="middle">36</text><text class="t-b" x="344" y="160">int</text>
</svg>`],
 ['Now it is a real number, so maths works: 36 + 1 = <b>37</b>.',`<svg viewBox="0 0 420 196" role="img" aria-label="age_num plus 1 is 37">
<rect class="bx-dark" x="6" y="8" width="230" height="140" rx="8"/>
<text class="t-term t-dim" x="28" y="40" style="font-size:14px">age_text = "36"</text>
<text class="t-term t-dim" x="28" y="72" style="font-size:14px">age_text + 1</text>
<text class="t-term t-dim" x="28" y="104" style="font-size:14px">age_num = int(age_text)</text>
<text class="t-a" x="12" y="136" style="font-size:15px">&#9654;</text><text class="t-term" x="28" y="136" style="font-size:14px">age_num + 1</text>
<text class="t-m" x="250" y="30">age_text</text><rect class="bx-warn" x="250" y="40" width="80" height="40" rx="6"/><text class="t-m" x="290" y="66" text-anchor="middle">"36"</text><text class="t-b" x="344" y="66">str</text>
<text class="t-m" x="250" y="126">age_num</text><rect class="bx-ok" x="250" y="134" width="80" height="40" rx="6"/><text class="t-m" x="290" y="160" text-anchor="middle">36</text><text class="t-b" x="344" y="160">int</text>
<text class="t-b t-ok" x="8" y="182" style="font-size:17px">36 + 1 = 37</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('True, False','Capital first letter, no quotes'),V.no('true, "True"','Lower case is an unknown name; quotes make it text'),
 V.ok('"36" + "1"','Gives "361": plus joins two strings'),V.no('"36" + 1','TypeError: convert first with int()'),
 V.ok('10 / 2','Gives 5.0: dividing always makes a float'),V.ok('type(36)','Asks Python for the type: int'))}
${V.hook(`Quotes make text. Text is not a number until <code>int()</code> says so.`)}
`)}

${V.card(4,'f-strings and rounding','fill in the blanks',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="A form with two blanks, name and age, filled in to read Ada is 36 years old">
<rect class="bx" x="8" y="8" width="404" height="56" rx="8"/><text class="t-m" x="22" y="42" style="font-size:16px">f"<tspan class="t-a">{name}</tspan> is <tspan class="t-a">{age}</tspan> years old"</text>
<path class="ln-a" d="M210 68V88"/><polygon class="ah-a" points="203,86 217,86 210,96"/>
<rect class="bx-ok" x="8" y="98" width="404" height="46" rx="8"/><text class="t-m" x="22" y="128" style="font-size:16px"><tspan class="t-ok">Ada</tspan> is <tspan class="t-ok">36</tspan> years old</text>
</svg><figcaption>An f-string is a sentence with blanks. Each pair of curly braces is a blank, and Python fills it with the value of whatever is inside.</figcaption></figure>
${V.like(`<p>A birthday card that says "Happy birthday, ____!". You write the card once and fill the blank for each friend. The <code>f</code> before the quotes tells Python "this card has blanks".</p>`)}
${V.anat([[1,'f'],[2,'"'],[3,'{name}'],' is ',[3,'{age}'],' years old',[2,'"']],[
 '<b>The f.</b> Short for "formatted". Without it, the braces are printed as they are.',
 '<b>Quotes.</b> It is still a string.',
 '<b>Blanks.</b> Any variable or sum goes inside the braces, even <code>{age + 1}</code>.'])}
${V.watch(`<p><b>Decimals are stored approximately.</b> <code>1.1 * 3</code> gives <code>3.3000000000000003</code>. For money, round to two places: <code>round(1.1 * 3, 2)</code> gives <code>3.3</code>. The second number in <code>round</code> is how many decimal places to keep.</p>`)}
${V.rules(V.ok('f"Hi {name}"','The f goes right before the opening quote'),V.no('"Hi {name}"','Forgot the f: prints Hi {name} literally'),
 V.no('"Hi " + age','TypeError: f-strings convert numbers for you, + does not'))}
${V.hook(`Read the f as "fill in": braces are the blanks, Python writes in the answers.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What type is <code>"42"</code>? <i>str, because of the quotes.</i> 2. After <code>x = 5</code> then <code>x = x * 2</code>, what does <code>print(x)</code> show? <i>10.</i> 3. Is <code>total-price</code> a valid variable name? <i>No. The hyphen is minus; use total_price.</i></div>
`);

explain('yb2',`
<p>A program that only runs top to bottom is a calculator. Add three powers and it becomes a real program: it can <b>decide</b> (if), <b>repeat</b> (loops) and <b>reuse</b> (functions). Every game, app and website is built from these.</p>

${V.card(1,'Indentation','Python\'s blocks are made of spaces',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="An if line ending in a colon, two indented lines forming its block, and an unindented line that always runs">
<rect class="bx-info" x="55" y="50" width="194" height="62" rx="8"/>
<text class="t-m" x="16" y="36" style="font-size:16px">if hot:</text>
<circle class="dot-m" cx="22" cy="68" r="3"/><circle class="dot-m" cx="31" cy="68" r="3"/><circle class="dot-m" cx="40" cy="68" r="3"/><circle class="dot-m" cx="49" cy="68" r="3"/>
<text class="t-m" x="60" y="74" style="font-size:16px">print("T-shirt")</text>
<text class="t-m" x="60" y="102" style="font-size:16px">print("Sun cream")</text>
<text class="t-m" x="16" y="146" style="font-size:16px">print("Bye")</text>
<text class="t-b t-a" x="90" y="36">&#8592; colon opens a block</text>
<text class="t-b t-info" x="262" y="78">the block:</text><text class="t" x="262" y="98">runs only if hot</text>
<text class="t" x="140" y="146">&#8592; back at the edge: always runs</text>
</svg><figcaption>The colon says "a block starts here". Every line indented 4 spaces below it belongs to that block. The first line back at the left edge is outside it.</figcaption></figure>
${V.like(`<p>A to-do list with sub-points. "Pack bag" is the heading, and the indented items under it (pencil case, PE kit) belong to it. The next un-indented line is a new job.</p>`)}
${V.why(`<p>Most languages mark blocks with curly braces <code>{ }</code>, and people indent anyway so humans can read it. Python's creator decided the indentation should <b>be</b> the structure, so the code always looks exactly the way it works.</p>`)}
${V.anat([[1,'if hot'],[2,':'],'\n',[3,'    '],[4,'print("T-shirt")']],[
 '<b>The header.</b> A line that starts a block: <code>if</code>, <code>elif</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>def</code>.',
 '<b>Colon.</b> Must end every header line.',
 '<b>Four spaces.</b> The indent. Your editor adds them when you press Tab.',
 '<b>The block.</b> One or more lines, all at the same indent.'])}
${V.rules(V.rh('Rules: break one and Python will not run'),
 V.no('if hot','Missing colon: SyntaxError'),V.no('if hot:<br>print("hi")','Nothing indented under the colon: IndentationError'),
 V.no('2 spaces, then 4','Every line in one block must line up exactly'),V.no('tabs + spaces','Mixing them confuses Python (TabError)'),
 V.rh('Conventions'),V.ok('4 spaces','The PEP 8 standard. Set your editor to insert spaces for Tab'))}
${V.hook(`Colon opens, spaces hold, back to the edge to close.`)}
`)}

${V.card(2,'Decisions','if, elif, else: a sorting ladder',`
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="A ladder of checks: score at least 90 gives A, at least 80 gives B, at least 70 gives C, else F">
<text class="t-m" x="8" y="22" style="font-size:16px">grade(score)</text>
<rect class="bx-warn" x="8" y="40" width="200" height="32" rx="6"/><text class="t-m" x="108" y="61" text-anchor="middle">score >= 90 ?</text>
<path class="ln" d="M212 56H286"/><polygon class="ah" points="284,50 284,62 296,56"/><text class="t-s" x="226" y="50" style="font-size:14px">True</text>
<rect class="bx" x="300" y="40" width="56" height="32" rx="6"/><text class="t-b" x="328" y="62" text-anchor="middle" style="font-size:18px">"A"</text>
<path class="ln" d="M108 72V84"/><polygon class="ah" points="102,82 114,82 108,92"/><text class="t-s" x="120" y="88" style="font-size:14px">False</text>
<rect class="bx-warn" x="8" y="94" width="200" height="32" rx="6"/><text class="t-m" x="108" y="115" text-anchor="middle">score >= 80 ?</text>
<path class="ln" d="M212 110H286"/><polygon class="ah" points="284,104 284,116 296,110"/><text class="t-s" x="226" y="104" style="font-size:14px">True</text>
<rect class="bx" x="300" y="94" width="56" height="32" rx="6"/><text class="t-b" x="328" y="116" text-anchor="middle" style="font-size:18px">"B"</text>
<path class="ln" d="M108 126V138"/><polygon class="ah" points="102,136 114,136 108,146"/><text class="t-s" x="120" y="142" style="font-size:14px">False</text>
<rect class="bx-warn" x="8" y="148" width="200" height="32" rx="6"/><text class="t-m" x="108" y="169" text-anchor="middle">score >= 70 ?</text>
<path class="ln" d="M212 164H286"/><polygon class="ah" points="284,158 284,170 296,164"/><text class="t-s" x="226" y="158" style="font-size:14px">True</text>
<rect class="bx" x="300" y="148" width="56" height="32" rx="6"/><text class="t-b" x="328" y="170" text-anchor="middle" style="font-size:18px">"C"</text>
<path class="ln" d="M108 180V192"/><polygon class="ah" points="102,190 114,190 108,200"/><text class="t-s" x="120" y="196" style="font-size:14px">False</text>
<rect class="bx" x="8" y="202" width="200" height="32" rx="6"/><text class="t-m" x="108" y="223" text-anchor="middle">else</text>
<path class="ln" d="M212 218H286"/><polygon class="ah" points="284,212 284,224 296,218"/>
<rect class="bx" x="300" y="202" width="56" height="32" rx="6"/><text class="t-b" x="328" y="224" text-anchor="middle" style="font-size:18px">"F"</text>
</svg><figcaption>Python asks each question in order, top to bottom. The first one that is True wins and its exit is taken. Only if every question is False does else run.</figcaption></figure>
${V.like(`<p>Coin-sorting machine. A coin rolls past slots, from the biggest to the smallest, and drops into the first slot it fits. It never drops into two.</p>`)}
${V.anat([[1,'if'],' ',[2,'score &gt;= 90'],':\n    return "A"\n',[3,'elif'],' score &gt;= 80:\n    return "B"\n',[4,'else'],':\n    return "F"'],[
 '<b>if</b> asks the first question.',
 '<b>Condition.</b> Anything that ends up <code>True</code> or <code>False</code>.',
 '<b>elif</b> means "else if". It is only asked if every question above was False. You can have as many as you need.',
 '<b>else</b> catches everything left. No condition, and it is optional.'])}
${V.steps([
 ['<b>grade(85)</b> is called. First question: is 85 &gt;= 90? <b>False</b>, so Python moves down.',`<svg viewBox="0 0 420 240" role="img" aria-label="85 is not at least 90, so go down">
<text class="t-m" x="8" y="22" style="font-size:16px">grade(85)</text>
<rect class="bx-hl" x="8" y="40" width="200" height="32" rx="6"/><text class="t-m" x="108" y="61" text-anchor="middle">85 >= 90 ?</text>
<path class="ln" d="M212 56H286"/><polygon class="ah" points="284,50 284,62 296,56"/><text class="t-s" x="226" y="50" style="font-size:14px">True</text>
<rect class="bx" x="300" y="40" width="56" height="32" rx="6"/><text class="t-b" x="328" y="62" text-anchor="middle" style="font-size:18px">"A"</text>
<path class="ln-a" d="M108 72V84"/><polygon class="ah-a" points="102,82 114,82 108,92"/><text class="t-b t-bad" x="120" y="88" style="font-size:14px">False</text>
<rect class="bx" x="8" y="94" width="200" height="32" rx="6"/><text class="t-m" x="108" y="115" text-anchor="middle">85 >= 80 ?</text>
<path class="ln" d="M212 110H286"/><polygon class="ah" points="284,104 284,116 296,110"/><text class="t-s" x="226" y="104" style="font-size:14px">True</text>
<rect class="bx" x="300" y="94" width="56" height="32" rx="6"/><text class="t-b" x="328" y="116" text-anchor="middle" style="font-size:18px">"B"</text>
<path class="ln" d="M108 126V138"/><polygon class="ah" points="102,136 114,136 108,146"/><text class="t-s" x="120" y="142" style="font-size:14px">False</text>
<rect class="bx" x="8" y="148" width="200" height="32" rx="6"/><text class="t-m" x="108" y="169" text-anchor="middle">85 >= 70 ?</text>
<path class="ln" d="M212 164H286"/><polygon class="ah" points="284,158 284,170 296,164"/><text class="t-s" x="226" y="158" style="font-size:14px">True</text>
<rect class="bx" x="300" y="148" width="56" height="32" rx="6"/><text class="t-b" x="328" y="170" text-anchor="middle" style="font-size:18px">"C"</text>
<path class="ln" d="M108 180V192"/><polygon class="ah" points="102,190 114,190 108,200"/><text class="t-s" x="120" y="196" style="font-size:14px">False</text>
<rect class="bx" x="8" y="202" width="200" height="32" rx="6"/><text class="t-m" x="108" y="223" text-anchor="middle">else</text>
<path class="ln" d="M212 218H286"/><polygon class="ah" points="284,212 284,224 296,218"/>
<rect class="bx" x="300" y="202" width="56" height="32" rx="6"/><text class="t-b" x="328" y="224" text-anchor="middle" style="font-size:18px">"F"</text>
</svg>`],
 ['Next question: is 85 &gt;= 80? <b>True</b>. Python takes the B exit.',`<svg viewBox="0 0 420 240" role="img" aria-label="85 is at least 80, so take the B exit">
<text class="t-m" x="8" y="22" style="font-size:16px">grade(85)</text>
<rect class="bx" x="8" y="40" width="200" height="32" rx="6"/><text class="t-m t-dim" x="108" y="61" text-anchor="middle">85 >= 90 ?</text>
<path class="ln" d="M212 56H286"/><polygon class="ah" points="284,50 284,62 296,56"/><text class="t-s t-dim" x="226" y="50" style="font-size:14px">True</text>
<rect class="bx" x="300" y="40" width="56" height="32" rx="6"/><text class="t-b t-dim" x="328" y="62" text-anchor="middle" style="font-size:18px">"A"</text>
<path class="ln-a" d="M108 72V84"/><polygon class="ah-a" points="102,82 114,82 108,92"/><text class="t-b t-bad" x="120" y="88" style="font-size:14px">False</text>
<rect class="bx-hl" x="8" y="94" width="200" height="32" rx="6"/><text class="t-m" x="108" y="115" text-anchor="middle">85 >= 80 ?</text>
<path class="ln-ok" d="M212 110H286"/><polygon class="ah-ok" points="284,104 284,116 296,110"/><text class="t-s" x="226" y="104" style="font-size:14px">True</text>
<rect class="bx-ok" x="300" y="94" width="56" height="32" rx="6"/><text class="t-b" x="328" y="116" text-anchor="middle" style="font-size:18px">"B"</text>
<path class="ln" d="M108 126V138"/><polygon class="ah" points="102,136 114,136 108,146"/><text class="t-s t-dim" x="120" y="142" style="font-size:14px">False</text>
<rect class="bx" x="8" y="148" width="200" height="32" rx="6"/><text class="t-m t-dim" x="108" y="169" text-anchor="middle">85 >= 70 ?</text>
<path class="ln" d="M212 164H286"/><polygon class="ah" points="284,158 284,170 296,164"/><text class="t-s t-dim" x="226" y="158" style="font-size:14px">True</text>
<rect class="bx" x="300" y="148" width="56" height="32" rx="6"/><text class="t-b t-dim" x="328" y="170" text-anchor="middle" style="font-size:18px">"C"</text>
<path class="ln" d="M108 180V192"/><polygon class="ah" points="102,190 114,190 108,200"/><text class="t-s t-dim" x="120" y="196" style="font-size:14px">False</text>
<rect class="bx" x="8" y="202" width="200" height="32" rx="6"/><text class="t-m t-dim" x="108" y="223" text-anchor="middle">else</text>
<path class="ln" d="M212 218H286"/><polygon class="ah" points="284,212 284,224 296,218"/>
<rect class="bx" x="300" y="202" width="56" height="32" rx="6"/><text class="t-b t-dim" x="328" y="224" text-anchor="middle" style="font-size:18px">"F"</text>
</svg>`],
 ['<b>return "B"</b> hands the answer back and ends the function. The questions below are never even asked.',`<svg viewBox="0 0 420 240" role="img" aria-label="grade returns B and the rest is skipped">
<text class="t-m" x="8" y="22" style="font-size:16px">grade(85)</text>
<text class="t-b t-ok" x="412" y="22" text-anchor="end" style="font-size:16px">returns "B"</text>
<rect class="bx" x="8" y="40" width="200" height="32" rx="6"/><text class="t-m t-dim" x="108" y="61" text-anchor="middle">85 >= 90 ?</text>
<path class="ln" d="M212 56H286"/><polygon class="ah" points="284,50 284,62 296,56"/><text class="t-s t-dim" x="226" y="50" style="font-size:14px">True</text>
<rect class="bx" x="300" y="40" width="56" height="32" rx="6"/><text class="t-b t-dim" x="328" y="62" text-anchor="middle" style="font-size:18px">"A"</text>
<path class="ln-a" d="M108 72V84"/><polygon class="ah-a" points="102,82 114,82 108,92"/><text class="t-b t-bad" x="120" y="88" style="font-size:14px">False</text>
<rect class="bx-ok" x="8" y="94" width="200" height="32" rx="6"/><text class="t-m" x="108" y="115" text-anchor="middle">85 >= 80 ?</text>
<path class="ln-ok" d="M212 110H286"/><polygon class="ah-ok" points="284,104 284,116 296,110"/><text class="t-s" x="226" y="104" style="font-size:14px">True</text>
<rect class="bx-ok" x="300" y="94" width="56" height="32" rx="6"/><text class="t-b" x="328" y="116" text-anchor="middle" style="font-size:18px">"B"</text>
<path class="ln" d="M108 126V138"/><polygon class="ah" points="102,136 114,136 108,146"/><text class="t-s t-dim" x="120" y="142" style="font-size:14px">False</text>
<rect class="bx" x="8" y="148" width="200" height="32" rx="6"/><text class="t-m t-dim" x="108" y="169" text-anchor="middle">85 >= 70 ?</text>
<path class="ln" d="M212 164H286"/><polygon class="ah" points="284,158 284,170 296,164"/><text class="t-s t-dim" x="226" y="158" style="font-size:14px">True</text>
<rect class="bx" x="300" y="148" width="56" height="32" rx="6"/><text class="t-b t-dim" x="328" y="170" text-anchor="middle" style="font-size:18px">"C"</text>
<path class="ln" d="M108 180V192"/><polygon class="ah" points="102,190 114,190 108,200"/><text class="t-s t-dim" x="120" y="196" style="font-size:14px">False</text>
<rect class="bx" x="8" y="202" width="200" height="32" rx="6"/><text class="t-m t-dim" x="108" y="223" text-anchor="middle">else</text>
<path class="ln" d="M212 218H286"/><polygon class="ah" points="284,212 284,224 296,218"/>
<rect class="bx" x="300" y="202" width="56" height="32" rx="6"/><text class="t-b t-dim" x="328" y="224" text-anchor="middle" style="font-size:18px">"F"</text>
<text class="t-s" x="366" y="170" style="font-size:14px">skipped</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('score == 90','Two = signs compare: "is it equal?"'),V.no('if score = 90:','One = stores a value. Python refuses it here'),
 V.ok('!=  &lt;  &gt;  &lt;=  &gt;=','Not equal, less, more, at most, at least'),V.no('else if','Python spells it elif'),
 V.rh('Conventions'),V.ok('biggest first','Put the strictest check at the top. If &gt;= 70 came first, 95 would get a C'))}
${V.hook(`Top to bottom, first True wins. One = stores, two == compare.`)}
`)}

${V.card(3,'Loops','the same job, again and again',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A conveyor belt carries the numbers 1, 2, 3 and 4 past a robot that does the same job to each">
<path class="ln" style="stroke-width:5" d="M10 110H410"/>
<circle class="bx" cx="40" cy="126" r="12"/><circle class="bx" cx="380" cy="126" r="12"/>
<rect class="bx" x="24" y="56" width="50" height="50" rx="6"/><text class="t-m" x="49" y="89" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx" x="88" y="56" width="50" height="50" rx="6"/><text class="t-m" x="113" y="89" text-anchor="middle" style="font-size:20px">2</text>
<rect class="bx-warn" x="186" y="56" width="50" height="50" rx="6"/><text class="t-m" x="211" y="89" text-anchor="middle" style="font-size:20px">3</text>
<rect class="bx" x="300" y="56" width="50" height="50" rx="6"/><text class="t-m" x="325" y="89" text-anchor="middle" style="font-size:20px">4</text>
${V.ic('robot',186,4,50,'ic-a')}
<text class="t-b t-a" x="246" y="34">n = 3</text>
<text class="t" x="210" y="152" text-anchor="middle">for n in numbers: one trip per item</text>
</svg><figcaption>A for loop is a conveyor belt. Each item comes past in turn, gets the name n for that trip, and the same block of code runs on it.</figcaption></figure>
${V.like(`<p>Marking a pile of homework. You pick up the top book, do the same marking steps, put it down, and pick up the next, until the pile is empty.</p>`)}
${V.why(`<p>Computers are brilliant at boring repetition. Without loops, adding up 1,000 numbers would take 1,000 lines. With a loop it takes three, and it works for any length of list.</p>`)}
${V.anat([[1,'for'],' ',[2,'n'],' ',[3,'in'],' ',[4,'numbers'],':'],[
 '<b>for</b> starts a loop that visits every item.',
 '<b>Loop variable.</b> A name tag that moves to the next item on every trip. You choose the name.',
 '<b>in</b> joins the name to the collection.',
 '<b>The collection.</b> A list, a string, or <code>range(5)</code>, which gives 0, 1, 2, 3, 4.'])}
<p><b>Watch sum_evens([1, 2, 3, 4]) run.</b> The <code>%</code> sign gives the remainder after dividing, so <code>n % 2 == 0</code> means "n is even". <code>total += n</code> is short for <code>total = total + n</code>.</p>
${V.steps([
 ['Before the loop: start a running total at <b>0</b>.',`<svg viewBox="0 0 420 206" role="img" aria-label="sum_evens step 0">
<rect class="bx-dark" x="6" y="8" width="186" height="140" rx="8"/>
<text class="t-term" x="16" y="34" style="font-size:14px">total&#160;=&#160;0</text>
<text class="t-term t-dim" x="16" y="60" style="font-size:14px">for&#160;n&#160;in&#160;numbers:</text>
<text class="t-term t-dim" x="16" y="86" style="font-size:14px">&#160;&#160;&#160;&#160;if&#160;n&#160;%&#160;2&#160;==&#160;0:</text>
<text class="t-term t-dim" x="16" y="112" style="font-size:14px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;total&#160;+=&#160;n</text>
<text class="t-term t-dim" x="16" y="138" style="font-size:14px">return&#160;total</text>
<path class="ln" style="stroke-width:4" d="M206 92H414"/>
<rect class="bx" x="210" y="44" width="44" height="44" rx="6"/><text class="t-m" x="232" y="73" text-anchor="middle" style="font-size:19px">1</text>
<rect class="bx" x="261" y="44" width="44" height="44" rx="6"/><text class="t-m" x="283" y="73" text-anchor="middle" style="font-size:19px">2</text>
<rect class="bx" x="312" y="44" width="44" height="44" rx="6"/><text class="t-m" x="334" y="73" text-anchor="middle" style="font-size:19px">3</text>
<rect class="bx" x="363" y="44" width="44" height="44" rx="6"/><text class="t-m" x="385" y="73" text-anchor="middle" style="font-size:19px">4</text>
<text class="t-s" x="210" y="34" style="font-size:14px">numbers</text>
<text class="t-m" x="10" y="186" style="font-size:16px">total</text>
<rect class="bx-ok" x="70" y="160" width="76" height="38" rx="6"/><text class="t-m" x="108" y="186" text-anchor="middle" style="font-size:19px">0</text>
</svg>`],
 ['Trip 1: n is <b>1</b>. 1 divided by 2 leaves 1, so it is odd. The if is False and nothing is added.',`<svg viewBox="0 0 420 206" role="img" aria-label="sum_evens step 1">
<rect class="bx-dark" x="6" y="8" width="186" height="140" rx="8"/>
<text class="t-term t-dim" x="16" y="34" style="font-size:14px">total&#160;=&#160;0</text>
<text class="t-term" x="16" y="60" style="font-size:14px">for&#160;n&#160;in&#160;numbers:</text>
<text class="t-term" x="16" y="86" style="font-size:14px">&#160;&#160;&#160;&#160;if&#160;n&#160;%&#160;2&#160;==&#160;0:</text>
<text class="t-term t-dim" x="16" y="112" style="font-size:14px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;total&#160;+=&#160;n</text>
<text class="t-term t-dim" x="16" y="138" style="font-size:14px">return&#160;total</text>
<path class="ln" style="stroke-width:4" d="M206 92H414"/>
<rect class="bx-hl" x="210" y="44" width="44" height="44" rx="6"/><text class="t-m" x="232" y="73" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-s" x="232" y="114" text-anchor="middle" style="font-size:14px">skip</text>
<rect class="bx" x="261" y="44" width="44" height="44" rx="6"/><text class="t-m" x="283" y="73" text-anchor="middle" style="font-size:19px">2</text>
<rect class="bx" x="312" y="44" width="44" height="44" rx="6"/><text class="t-m" x="334" y="73" text-anchor="middle" style="font-size:19px">3</text>
<rect class="bx" x="363" y="44" width="44" height="44" rx="6"/><text class="t-m" x="385" y="73" text-anchor="middle" style="font-size:19px">4</text>
<text class="t-s" x="210" y="34" style="font-size:14px">numbers</text>
<text class="t-b t-a" x="232" y="138" text-anchor="middle">n = 1</text>
<text class="t-m" x="10" y="186" style="font-size:16px">total</text>
<rect class="bx-ok" x="70" y="160" width="76" height="38" rx="6"/><text class="t-m" x="108" y="186" text-anchor="middle" style="font-size:19px">0</text>
<text class="t" x="164" y="186" style="font-size:15px">1 % 2 is 1: odd, skip</text>
</svg>`],
 ['Trip 2: n is <b>2</b>. The remainder is 0, so it is even. total becomes 0 + 2 = <b>2</b>.',`<svg viewBox="0 0 420 206" role="img" aria-label="sum_evens step 2">
<rect class="bx-dark" x="6" y="8" width="186" height="140" rx="8"/>
<text class="t-term t-dim" x="16" y="34" style="font-size:14px">total&#160;=&#160;0</text>
<text class="t-term" x="16" y="60" style="font-size:14px">for&#160;n&#160;in&#160;numbers:</text>
<text class="t-term" x="16" y="86" style="font-size:14px">&#160;&#160;&#160;&#160;if&#160;n&#160;%&#160;2&#160;==&#160;0:</text>
<text class="t-term" x="16" y="112" style="font-size:14px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;total&#160;+=&#160;n</text>
<text class="t-term t-dim" x="16" y="138" style="font-size:14px">return&#160;total</text>
<path class="ln" style="stroke-width:4" d="M206 92H414"/>
<rect class="bx" x="210" y="44" width="44" height="44" rx="6"/><text class="t-m t-dim" x="232" y="73" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-s" x="232" y="114" text-anchor="middle" style="font-size:14px">skip</text>
<rect class="bx-hl" x="261" y="44" width="44" height="44" rx="6"/><text class="t-m" x="283" y="73" text-anchor="middle" style="font-size:19px">2</text>
<text class="t-b t-ok" x="283" y="114" text-anchor="middle">even</text>
<rect class="bx" x="312" y="44" width="44" height="44" rx="6"/><text class="t-m" x="334" y="73" text-anchor="middle" style="font-size:19px">3</text>
<rect class="bx" x="363" y="44" width="44" height="44" rx="6"/><text class="t-m" x="385" y="73" text-anchor="middle" style="font-size:19px">4</text>
<text class="t-s" x="210" y="34" style="font-size:14px">numbers</text>
<text class="t-b t-a" x="283" y="138" text-anchor="middle">n = 2</text>
<text class="t-m" x="10" y="186" style="font-size:16px">total</text>
<rect class="bx-ok" x="70" y="160" width="76" height="38" rx="6"/><text class="t-m" x="108" y="186" text-anchor="middle" style="font-size:19px">2</text>
<text class="t" x="164" y="186" style="font-size:15px">2 % 2 is 0: 0 + 2 = 2</text>
</svg>`],
 ['Trip 3: n is <b>3</b>. Odd, skipped.',`<svg viewBox="0 0 420 206" role="img" aria-label="sum_evens step 3">
<rect class="bx-dark" x="6" y="8" width="186" height="140" rx="8"/>
<text class="t-term t-dim" x="16" y="34" style="font-size:14px">total&#160;=&#160;0</text>
<text class="t-term" x="16" y="60" style="font-size:14px">for&#160;n&#160;in&#160;numbers:</text>
<text class="t-term" x="16" y="86" style="font-size:14px">&#160;&#160;&#160;&#160;if&#160;n&#160;%&#160;2&#160;==&#160;0:</text>
<text class="t-term t-dim" x="16" y="112" style="font-size:14px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;total&#160;+=&#160;n</text>
<text class="t-term t-dim" x="16" y="138" style="font-size:14px">return&#160;total</text>
<path class="ln" style="stroke-width:4" d="M206 92H414"/>
<rect class="bx" x="210" y="44" width="44" height="44" rx="6"/><text class="t-m t-dim" x="232" y="73" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-s" x="232" y="114" text-anchor="middle" style="font-size:14px">skip</text>
<rect class="bx" x="261" y="44" width="44" height="44" rx="6"/><text class="t-m t-dim" x="283" y="73" text-anchor="middle" style="font-size:19px">2</text>
<text class="t-b t-ok" x="283" y="114" text-anchor="middle">even</text>
<rect class="bx-hl" x="312" y="44" width="44" height="44" rx="6"/><text class="t-m" x="334" y="73" text-anchor="middle" style="font-size:19px">3</text>
<text class="t-s" x="334" y="114" text-anchor="middle" style="font-size:14px">skip</text>
<rect class="bx" x="363" y="44" width="44" height="44" rx="6"/><text class="t-m" x="385" y="73" text-anchor="middle" style="font-size:19px">4</text>
<text class="t-s" x="210" y="34" style="font-size:14px">numbers</text>
<text class="t-b t-a" x="334" y="138" text-anchor="middle">n = 3</text>
<text class="t-m" x="10" y="186" style="font-size:16px">total</text>
<rect class="bx-ok" x="70" y="160" width="76" height="38" rx="6"/><text class="t-m" x="108" y="186" text-anchor="middle" style="font-size:19px">2</text>
<text class="t" x="164" y="186" style="font-size:15px">3 % 2 is 1: odd, skip</text>
</svg>`],
 ['Trip 4: n is <b>4</b>. Even, so total becomes 2 + 4 = <b>6</b>.',`<svg viewBox="0 0 420 206" role="img" aria-label="sum_evens step 4">
<rect class="bx-dark" x="6" y="8" width="186" height="140" rx="8"/>
<text class="t-term t-dim" x="16" y="34" style="font-size:14px">total&#160;=&#160;0</text>
<text class="t-term" x="16" y="60" style="font-size:14px">for&#160;n&#160;in&#160;numbers:</text>
<text class="t-term" x="16" y="86" style="font-size:14px">&#160;&#160;&#160;&#160;if&#160;n&#160;%&#160;2&#160;==&#160;0:</text>
<text class="t-term" x="16" y="112" style="font-size:14px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;total&#160;+=&#160;n</text>
<text class="t-term t-dim" x="16" y="138" style="font-size:14px">return&#160;total</text>
<path class="ln" style="stroke-width:4" d="M206 92H414"/>
<rect class="bx" x="210" y="44" width="44" height="44" rx="6"/><text class="t-m t-dim" x="232" y="73" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-s" x="232" y="114" text-anchor="middle" style="font-size:14px">skip</text>
<rect class="bx" x="261" y="44" width="44" height="44" rx="6"/><text class="t-m t-dim" x="283" y="73" text-anchor="middle" style="font-size:19px">2</text>
<text class="t-b t-ok" x="283" y="114" text-anchor="middle">even</text>
<rect class="bx" x="312" y="44" width="44" height="44" rx="6"/><text class="t-m t-dim" x="334" y="73" text-anchor="middle" style="font-size:19px">3</text>
<text class="t-s" x="334" y="114" text-anchor="middle" style="font-size:14px">skip</text>
<rect class="bx-hl" x="363" y="44" width="44" height="44" rx="6"/><text class="t-m" x="385" y="73" text-anchor="middle" style="font-size:19px">4</text>
<text class="t-b t-ok" x="385" y="114" text-anchor="middle">even</text>
<text class="t-s" x="210" y="34" style="font-size:14px">numbers</text>
<text class="t-b t-a" x="385" y="138" text-anchor="middle">n = 4</text>
<text class="t-m" x="10" y="186" style="font-size:16px">total</text>
<rect class="bx-ok" x="70" y="160" width="76" height="38" rx="6"/><text class="t-m" x="108" y="186" text-anchor="middle" style="font-size:19px">6</text>
<text class="t" x="164" y="186" style="font-size:15px">4 % 2 is 0: 2 + 4 = 6</text>
</svg>`],
 ['The belt is empty, so the loop ends. Python carries on with the next un-indented line: <b>return total</b> gives back 6.',`<svg viewBox="0 0 420 206" role="img" aria-label="sum_evens step 5">
<rect class="bx-dark" x="6" y="8" width="186" height="140" rx="8"/>
<text class="t-term t-dim" x="16" y="34" style="font-size:14px">total&#160;=&#160;0</text>
<text class="t-term t-dim" x="16" y="60" style="font-size:14px">for&#160;n&#160;in&#160;numbers:</text>
<text class="t-term t-dim" x="16" y="86" style="font-size:14px">&#160;&#160;&#160;&#160;if&#160;n&#160;%&#160;2&#160;==&#160;0:</text>
<text class="t-term t-dim" x="16" y="112" style="font-size:14px">&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;total&#160;+=&#160;n</text>
<text class="t-term" x="16" y="138" style="font-size:14px">return&#160;total</text>
<path class="ln" style="stroke-width:4" d="M206 92H414"/>
<rect class="bx" x="210" y="44" width="44" height="44" rx="6"/><text class="t-m t-dim" x="232" y="73" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-s" x="232" y="114" text-anchor="middle" style="font-size:14px">skip</text>
<rect class="bx" x="261" y="44" width="44" height="44" rx="6"/><text class="t-m t-dim" x="283" y="73" text-anchor="middle" style="font-size:19px">2</text>
<text class="t-b t-ok" x="283" y="114" text-anchor="middle">even</text>
<rect class="bx" x="312" y="44" width="44" height="44" rx="6"/><text class="t-m t-dim" x="334" y="73" text-anchor="middle" style="font-size:19px">3</text>
<text class="t-s" x="334" y="114" text-anchor="middle" style="font-size:14px">skip</text>
<rect class="bx" x="363" y="44" width="44" height="44" rx="6"/><text class="t-m t-dim" x="385" y="73" text-anchor="middle" style="font-size:19px">4</text>
<text class="t-b t-ok" x="385" y="114" text-anchor="middle">even</text>
<text class="t-s" x="210" y="34" style="font-size:14px">numbers</text>
<text class="t-m" x="10" y="186" style="font-size:16px">total</text>
<rect class="bx-ok" x="70" y="160" width="76" height="38" rx="6"/><text class="t-m" x="108" y="186" text-anchor="middle" style="font-size:19px">6</text>
<text class="t-b t-ok" x="164" y="186" style="font-size:15px">returns 6</text>
</svg>`]])}
<p><b>while</b> is the other loop. It repeats as long as a condition stays True, so it suits "keep going until..." jobs, like a countdown:</p>
<pre class="snip">while n &gt; 0:          # check, then run the block, then check again
    result.append(n)    # add n to the end of the list
    n = n - 1           # change n, or the loop never stops</pre>
${V.rules(V.rh('Rules'),
 V.ok('for n in numbers:','Colon at the end, block indented below'),V.no('while n &gt; 0: (n never changes)','An infinite loop: the program never finishes'),
 V.ok('range(3)','0, 1, 2. It stops before 3'),
 V.rh('Conventions'),V.ok('for name in names:','Plural list, singular loop name'),V.ok('for when you know the items','while when you only know when to stop'))}
${V.hook(`for walks the list; while waits for False. Always change what while is watching.`)}
`)}

${V.card(4,'Functions','machines you build once',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="The greet machine: put in Ada and Hello, Ada! comes out; put in nothing and the default friend is used">
<rect class="bx-a" x="140" y="26" width="140" height="130" rx="12"/>${V.ic('machine',180,38,60,'ic-a')}
<text class="t-m" x="210" y="124" text-anchor="middle">greet</text>
<text class="t-s" x="210" y="146" text-anchor="middle" style="font-size:14px">default: "friend"</text>
<text class="t-m" x="8" y="62">"Ada"</text><path class="ln-a" d="M66 56H128"/><polygon class="ah-a" points="126,49 126,63 138,56"/>
<text class="t-m t-dim" x="8" y="130">(nothing)</text><path class="ln" d="M94 124H128"/><polygon class="ah" points="126,117 126,131 138,124"/>
<path class="ln-ok" d="M284 56H302"/><polygon class="ah-ok" points="300,49 300,63 312,56"/>
<rect class="bx-ok" x="314" y="36" width="100" height="40" rx="6"/><text class="t-m" x="364" y="61" text-anchor="middle" style="font-size:14px">Hello, Ada!</text>
<path class="ln-ok" d="M284 124H302"/><polygon class="ah-ok" points="300,117 300,131 312,124"/>
<rect class="bx-ok" x="314" y="104" width="100" height="40" rx="6"/><text class="t-m" x="364" y="122" text-anchor="middle" style="font-size:14px">Hello,</text><text class="t-m" x="364" y="138" text-anchor="middle" style="font-size:14px">friend!</text>
<text class="t" x="210" y="182" text-anchor="middle">input in, the same steps, answer out</text>
</svg><figcaption>A function is a machine with a name. You feed it inputs (arguments), it runs its steps, and it hands back a result. A default value is used when you feed it nothing.</figcaption></figure>
${V.like(`<p>A smoothie maker. You build the machine once. After that, anyone can throw in fruit, press the button and get a drink, without knowing how the blades work.</p>`)}
${V.why(`<p>Copying the same ten lines into five places means five places to fix when there is a bug. A function gives those lines one name, so you write them once and call them anywhere.</p>`)}
${V.anat([[1,'def'],' ',[2,'greet'],'(',[3,'name="friend"'],')',[4,':'],'\n    ',[5,'return'],' f"Hello, {name}!"'],[
 '<b>def</b>: "I am defining a machine". Nothing runs yet.',
 '<b>Name.</b> snake_case and a verb, because functions do things.',
 '<b>Parameter</b> with a <b>default</b>. A parameter is a name tag that gets tied to whatever you pass in. If you pass nothing, it uses "friend".',
 '<b>Colon.</b> The indented body follows.',
 '<b>return</b> hands the answer back to the caller and stops the function.'])}
${V.rules(V.rh('Rules'),
 V.ok('greet("Ada")','Brackets run it'),V.no('greet','No brackets: you only point at the machine'),
 V.ok('return answer','The caller gets the answer back'),V.no('print(answer)','Printing is not returning. The caller gets None'),
 V.no('def f(a="x", b):','Parameters with defaults must come last'),
 V.rh('Conventions'),V.ok('calculate_total()','snake_case verb that says what it does'))}
${V.build(`<ol><li>Name the job: <code>greet</code>.</li><li>Decide the input and its default: <code>name="friend"</code>.</li><li>Write the header: <code>def greet(name="friend"):</code></li><li>Indent the body and <code>return</code> the f-string.</li><li>Test both ways: <code>greet()</code> and <code>greet("Ada")</code>.</li></ol>`)}
${V.hook(`def builds the machine, brackets switch it on, return hands out the answer.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What does <code>grade(70)</code> return? <i>"C", because 70 &gt;= 70 is True.</i> 2. What is <code>7 % 2</code>? <i>1, so 7 is odd.</i> 3. A function prints its answer but has no return. What does the caller get? <i>None.</i></div>
`);

explain('y1',`
<p>Real programs juggle lots of values at once: a playlist, a class register, a high-score table. Python gives you four built-in containers for this, plus a one-line trick, the comprehension, that experienced Python developers use every day. You already know f-strings, like <code>f"Hello, {name}!"</code>; now you put them to work on real data.</p>

${V.card(1,'Four containers','pick the right one for the job',`
<figure class="fig"><svg viewBox="0 0 420 216" role="img" aria-label="Four containers: a list is a row of boxes, a tuple is a locked pair, a dict is a cabinet with labelled drawers, a set is a bag of unique items">
<rect class="bx" x="6" y="6" width="200" height="100" rx="10"/><text class="t-b" x="18" y="30">list</text><text class="t-m t-a" x="62" y="30">[ ]</text>
<rect class="bx-info" x="18" y="42" width="40" height="34" rx="5"/><text class="t-m" x="38" y="65" text-anchor="middle">7</text>
<rect class="bx-info" x="62" y="42" width="40" height="34" rx="5"/><text class="t-m" x="82" y="65" text-anchor="middle">2</text>
<rect class="bx-info" x="106" y="42" width="40" height="34" rx="5"/><text class="t-m" x="126" y="65" text-anchor="middle">7</text>
<text class="t" x="18" y="98" style="font-size:14px">in order, can change</text>
<rect class="bx" x="214" y="6" width="200" height="100" rx="10"/><text class="t-b" x="226" y="30">tuple</text><text class="t-m t-a" x="280" y="30">( )</text>
<rect class="bx-warn" x="226" y="42" width="128" height="34" rx="5"/><text class="t-m" x="290" y="65" text-anchor="middle" style="font-size:14px">51.5, -0.12</text>${V.ic('lock',362,40,36,'ic-warn')}
<text class="t" x="226" y="98" style="font-size:14px">fixed once made</text>
<rect class="bx" x="6" y="112" width="200" height="100" rx="10"/><text class="t-b" x="18" y="136">dict</text><text class="t-m t-a" x="62" y="136">{k: v}</text>
<rect class="bx-ok" x="18" y="146" width="150" height="24" rx="4"/><text class="t-m" x="26" y="164" style="font-size:14px">"name": "Ada"</text>
<rect class="bx-ok" x="18" y="174" width="150" height="24" rx="4"/><text class="t-m" x="26" y="192" style="font-size:14px">"age": 36</text>
<rect class="bx" x="214" y="112" width="200" height="100" rx="10"/><text class="t-b" x="226" y="136">set</text><text class="t-m t-a" x="262" y="136">{ }</text>
<circle class="bx-a" cx="246" cy="170" r="17"/><text class="t-m" x="246" y="176" text-anchor="middle">a</text>
<circle class="bx-a" cx="288" cy="170" r="17"/><text class="t-m" x="288" y="176" text-anchor="middle">b</text>
<circle class="bx-a" cx="330" cy="170" r="17"/><text class="t-m" x="330" y="176" text-anchor="middle">c</text>
<text class="t" x="352" y="176" style="font-size:14px">no</text><text class="t" x="352" y="196" style="font-size:14px">repeats</text>
</svg><figcaption>A list is an ordered row (repeats allowed). A tuple is a fixed, locked group. A dict finds values by label. A set holds each item only once.</figcaption></figure>
${V.like(`<p>A <b>list</b> is a shopping list: in order, and you can cross things out or add more. A <b>tuple</b> is a map grid reference printed on a sign: fixed. A <b>dict</b> is a filing cabinet with labelled drawers. A <b>set</b> is a sticker album where each sticker can appear only once.</p>`)}
${V.why(`<p>Each shape is fast at a different job. Finding one email among a million in a list means checking them one by one. A set (or a dict) jumps straight to the answer, because it files each item by a code worked out from its value, called a <b>hash</b>.</p>`)}
${V.anat([[1,'[1, 2]'],'   ',[2,'(1, 2)'],'   ',[3,'{"a": 1}'],'   ',[4,'{1, 2}']],[
 '<b>list.</b> Square brackets. Ask by position: <code>xs[0]</code> is the first.',
 '<b>tuple.</b> Round brackets. Cannot be changed after it is made.',
 '<b>dict.</b> Curly braces with <code>key: value</code> pairs.',
 '<b>set.</b> Curly braces, no colons. Duplicates vanish.'])}
${V.rules(V.rh('Rules'),
 V.ok('xs[0]','Positions start at 0'),V.no('xs[3] (3 items)','IndexError: one past the end'),
 V.no('{}','This is an empty dict, not a set'),V.ok('set()','The way to make an empty set'),
 V.no('point[0] = 9','A tuple cannot change: TypeError'),
 V.rh('Conventions'),V.ok('players = [...]','Plural names for collections'),V.ok('email in emails_set','Use a set for fast "is it in there?" checks'))}
${V.hook(`Square for order, round for fixed, curly with colons for labels, curly without for unique.`)}
`)}

${V.card(2,'Dicts','a cabinet with labelled drawers',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A cabinet called user with drawers labelled name, age and city">
<rect class="bx" x="100" y="8" width="220" height="154" rx="10"/>
<rect class="bx-info" x="112" y="20" width="196" height="40" rx="6"/><text class="t-m" x="124" y="46">"name"</text><text class="t-m t-a" x="296" y="46" text-anchor="end">"Ada"</text>
<rect class="bx-info" x="112" y="66" width="196" height="40" rx="6"/><text class="t-m" x="124" y="92">"age"</text><text class="t-m t-a" x="296" y="92" text-anchor="end">36</text>
<rect class="bx-info" x="112" y="112" width="196" height="40" rx="6"/><text class="t-m" x="124" y="138">"city"</text><text class="t-m t-a" x="296" y="138" text-anchor="end">"London"</text>
<text class="t-b" x="10" y="90">user</text>
<text class="t" x="332" y="70" style="font-size:14px">label =</text><text class="t" x="332" y="88" style="font-size:14px">key</text>
<text class="t" x="332" y="116" style="font-size:14px">inside =</text><text class="t" x="332" y="134" style="font-size:14px">value</text>
</svg><figcaption>A dict (short for dictionary) stores pairs. The label on the drawer is the key, what is inside is the value. user["age"] opens the drawer labelled age and gives you 36.</figcaption></figure>
${V.like(`<p>A school office filing cabinet. Nobody says "give me drawer number 3". They say "give me the drawer labelled Year 9". Labels are unique, so there is exactly one drawer per label.</p>`)}
${V.anat([[1,'counts'],[2,'[word]'],' = ',[1,'counts'],[3,'.get(word, 0)'],' ',[4,'+ 1']],[
 '<b>The dict.</b> Our cabinet of word counts.',
 '<b>Square brackets with a key.</b> On the left of = it means "put into this drawer", making the drawer if it is new.',
 '<b>.get(key, default).</b> "Give me what is in this drawer, or 0 if there is no such drawer." No crash.',
 '<b>Add one</b> for the word we just saw.'])}
<p><b>Watch the counting trick on "the cat the".</b></p>
${V.steps([
 ['Start with an empty cabinet: <b>counts = {}</b>.',`<svg viewBox="0 0 420 224" role="img" aria-label="count_words step 0">
<text class="t-m" x="10" y="24" style="font-size:14px">counts[word] = counts.get(word, 0) + 1</text>
<rect class="bx" x="10" y="40" width="56" height="34" rx="6"/><text class="t-m" x="38" y="63" text-anchor="middle" style="font-size:14px">"the"</text>
<rect class="bx" x="72" y="40" width="56" height="34" rx="6"/><text class="t-m" x="100" y="63" text-anchor="middle" style="font-size:14px">"cat"</text>
<rect class="bx" x="134" y="40" width="56" height="34" rx="6"/><text class="t-m" x="162" y="63" text-anchor="middle" style="font-size:14px">"the"</text>
<text class="t-m t-a" x="200" y="56" style="font-size:14px">counts = {}</text>
<text class="t" x="200" y="76" style="font-size:14px">an empty cabinet</text>
<text class="t-b" x="8" y="158">counts</text>
<rect class="bx" x="80" y="92" width="250" height="124" rx="8"/>
<rect class="ln-d" x="90" y="100" width="230" height="32" rx="5"/>
<rect class="ln-d" x="90" y="138" width="230" height="32" rx="5"/>
<rect class="ln-d" x="90" y="176" width="230" height="32" rx="5"/>
</svg>`],
 ['Word "the". There is no "the" drawer, so <b>get</b> gives the default 0. 0 + 1 = 1, and a new drawer "the" is made holding 1.',`<svg viewBox="0 0 420 224" role="img" aria-label="count_words step 1">
<text class="t-m" x="10" y="24" style="font-size:14px">counts[word] = counts.get(word, 0) + 1</text>
<rect class="bx-hl" x="10" y="40" width="56" height="34" rx="6"/><text class="t-m" x="38" y="63" text-anchor="middle" style="font-size:14px">"the"</text>
<rect class="bx" x="72" y="40" width="56" height="34" rx="6"/><text class="t-m" x="100" y="63" text-anchor="middle" style="font-size:14px">"cat"</text>
<rect class="bx" x="134" y="40" width="56" height="34" rx="6"/><text class="t-m" x="162" y="63" text-anchor="middle" style="font-size:14px">"the"</text>
<text class="t-m t-a" x="200" y="56" style="font-size:14px">get("the", 0) gives 0</text>
<text class="t" x="200" y="76" style="font-size:14px">no drawer yet: 0 + 1</text>
<text class="t-b" x="8" y="158">counts</text>
<rect class="bx" x="80" y="92" width="250" height="124" rx="8"/>
<rect class="bx-ok" x="90" y="100" width="230" height="32" rx="5"/><text class="t-m" x="104" y="122">"the"</text><path class="ln" style="stroke-width:3" d="M190 116H220"/><text class="t-m" x="304" y="123" text-anchor="end" style="font-size:18px">1</text>
<rect class="ln-d" x="90" y="138" width="230" height="32" rx="5"/>
<rect class="ln-d" x="90" y="176" width="230" height="32" rx="5"/>
</svg>`],
 ['Word "cat". Same again: no drawer yet, so it starts at 0 and becomes 1.',`<svg viewBox="0 0 420 224" role="img" aria-label="count_words step 2">
<text class="t-m" x="10" y="24" style="font-size:14px">counts[word] = counts.get(word, 0) + 1</text>
<rect class="bx" x="10" y="40" width="56" height="34" rx="6"/><text class="t-m t-dim" x="38" y="63" text-anchor="middle" style="font-size:14px">"the"</text>
<rect class="bx-hl" x="72" y="40" width="56" height="34" rx="6"/><text class="t-m" x="100" y="63" text-anchor="middle" style="font-size:14px">"cat"</text>
<rect class="bx" x="134" y="40" width="56" height="34" rx="6"/><text class="t-m" x="162" y="63" text-anchor="middle" style="font-size:14px">"the"</text>
<text class="t-m t-a" x="200" y="56" style="font-size:14px">get("cat", 0) gives 0</text>
<text class="t" x="200" y="76" style="font-size:14px">no drawer yet: 0 + 1</text>
<text class="t-b" x="8" y="158">counts</text>
<rect class="bx" x="80" y="92" width="250" height="124" rx="8"/>
<rect class="bx-info" x="90" y="100" width="230" height="32" rx="5"/><text class="t-m" x="104" y="122">"the"</text><path class="ln" style="stroke-width:3" d="M190 116H220"/><text class="t-m" x="304" y="123" text-anchor="end" style="font-size:18px">1</text>
<rect class="bx-ok" x="90" y="138" width="230" height="32" rx="5"/><text class="t-m" x="104" y="160">"cat"</text><path class="ln" style="stroke-width:3" d="M190 154H220"/><text class="t-m" x="304" y="161" text-anchor="end" style="font-size:18px">1</text>
<rect class="ln-d" x="90" y="176" width="230" height="32" rx="5"/>
</svg>`],
 ['Word "the" again. This time the drawer exists, so <b>get</b> gives 1. 1 + 1 = 2 goes back in the same drawer. Result: <b>{"the": 2, "cat": 1}</b>.',`<svg viewBox="0 0 420 224" role="img" aria-label="count_words step 3">
<text class="t-m" x="10" y="24" style="font-size:14px">counts[word] = counts.get(word, 0) + 1</text>
<rect class="bx" x="10" y="40" width="56" height="34" rx="6"/><text class="t-m t-dim" x="38" y="63" text-anchor="middle" style="font-size:14px">"the"</text>
<rect class="bx" x="72" y="40" width="56" height="34" rx="6"/><text class="t-m t-dim" x="100" y="63" text-anchor="middle" style="font-size:14px">"cat"</text>
<rect class="bx-hl" x="134" y="40" width="56" height="34" rx="6"/><text class="t-m" x="162" y="63" text-anchor="middle" style="font-size:14px">"the"</text>
<text class="t-m t-a" x="200" y="56" style="font-size:14px">get("the", 0) gives 1</text>
<text class="t" x="200" y="76" style="font-size:14px">drawer exists: 1 + 1</text>
<text class="t-b" x="8" y="158">counts</text>
<rect class="bx" x="80" y="92" width="250" height="124" rx="8"/>
<rect class="bx-ok" x="90" y="100" width="230" height="32" rx="5"/><text class="t-m" x="104" y="122">"the"</text><path class="ln" style="stroke-width:3" d="M190 116H220"/><text class="t-m" x="304" y="123" text-anchor="end" style="font-size:18px">2</text>
<rect class="bx-info" x="90" y="138" width="230" height="32" rx="5"/><text class="t-m" x="104" y="160">"cat"</text><path class="ln" style="stroke-width:3" d="M190 154H220"/><text class="t-m" x="304" y="161" text-anchor="end" style="font-size:18px">1</text>
<rect class="ln-d" x="90" y="176" width="230" height="32" rx="5"/>
<text class="t-b t-ok" x="340" y="140" style="font-size:14px">the: 2</text><text class="t-b t-ok" x="340" y="162" style="font-size:14px">cat: 1</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('counts["dog"]','A missing key crashes with KeyError'),V.ok('counts.get("dog", 0)','A missing key gives your default instead'),
 V.ok('d[key] = value','Same key again? It overwrites. Keys are unique'),V.no('{[1, 2]: "x"}','Keys must be unchangeable: str, int, tuple. Not a list'),
 V.ok('for k, v in d.items():','Loop over key and value together'),V.ok('"age" in user','in checks the keys'))}
${V.hook(`Lists ask "which position?" Dicts ask "which label?" Use <code>.get(key, 0)</code> when the drawer might be missing.`)}
`)}

${V.card(3,'Comprehensions','a production line in one line',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="Production line: take each n, keep the even ones, square them, collect the results">
<rect class="bx" x="6" y="26" width="118" height="70" rx="10"/>${V.ic('repeat',46,32,36,'ic-info')}<text class="t" x="65" y="88" text-anchor="middle">take each n</text>
<path class="ln-a" d="M126 61H140"/><polygon class="ah-a" points="138,54 138,68 150,61"/>
<rect class="bx" x="152" y="26" width="118" height="70" rx="10"/>${V.ic('check',192,32,36,'ic-ok')}<text class="t" x="211" y="88" text-anchor="middle">keep evens</text>
<path class="ln-a" d="M272 61H286"/><polygon class="ah-a" points="284,54 284,68 296,61"/>
<rect class="bx" x="298" y="26" width="116" height="70" rx="10"/>${V.ic('gear',338,32,36,'ic-a')}<text class="t" x="356" y="88" text-anchor="middle">square it</text>
<text class="t-m" x="210" y="138" text-anchor="middle" style="font-size:16px">nums &#10140; [4, 16, 36]</text>
</svg><figcaption>A comprehension is a tiny factory. Items come in, an optional filter throws some away, a formula transforms the rest, and the results drop into a new list.</figcaption></figure>
${V.why(`<p>Building a new list from an old one is so common that the loop version (make an empty list, loop, check, append) gets boring. Python borrowed this short form from maths, where you write "the set of n squared, for n in nums, where n is even".</p>`)}
${V.anat([[1,'['],[2,'n * n'],' ',[3,'for n in nums'],' ',[4,'if n % 2 == 0'],[1,']']],[
 '<b>Square brackets.</b> The result is a new list.',
 '<b>What to make.</b> The formula applied to each item that survives.',
 '<b>The loop.</b> Exactly like a normal for line, without the colon.',
 '<b>The filter.</b> Optional. Only items where this is True get in.'])}
${V.steps([
 ['The factory starts with the input list and an empty result.',`<svg viewBox="0 0 420 200" role="img" aria-label="comprehension step 0">
<text class="t-m" x="8" y="40">nums</text>
<rect class="bx" x="64" y="16" width="44" height="38" rx="6"/><text class="t-m" x="86" y="42" text-anchor="middle" style="font-size:18px">1</text>
<rect class="bx" x="122" y="16" width="44" height="38" rx="6"/><text class="t-m" x="144" y="42" text-anchor="middle" style="font-size:18px">2</text>
<rect class="bx" x="180" y="16" width="44" height="38" rx="6"/><text class="t-m" x="202" y="42" text-anchor="middle" style="font-size:18px">3</text>
<rect class="bx" x="238" y="16" width="44" height="38" rx="6"/><text class="t-m" x="260" y="42" text-anchor="middle" style="font-size:18px">4</text>
<rect class="bx" x="296" y="16" width="44" height="38" rx="6"/><text class="t-m" x="318" y="42" text-anchor="middle" style="font-size:18px">5</text>
<rect class="bx" x="354" y="16" width="44" height="38" rx="6"/><text class="t-m" x="376" y="42" text-anchor="middle" style="font-size:18px">6</text>
<text class="t-m" x="8" y="178">even_squares</text>
<rect class="bx-ok" x="130" y="152" width="282" height="40" rx="6"/><text class="t-m" x="144" y="178" style="font-size:18px">[]</text>
</svg>`],
 ['1 is odd, so the filter drops it. 2 is even, so it is squared: <b>4</b> goes into the result.',`<svg viewBox="0 0 420 200" role="img" aria-label="comprehension step 1">
<text class="t-m" x="8" y="40">nums</text>
<rect class="bx-hl" x="64" y="16" width="44" height="38" rx="6"/><text class="t-m" x="86" y="42" text-anchor="middle" style="font-size:18px">1</text>
<text class="t-b t-bad" x="86" y="80" text-anchor="middle" style="font-size:14px">odd</text><text class="t-s" x="86" y="102" text-anchor="middle" style="font-size:14px">dropped</text>
<rect class="bx-hl" x="122" y="16" width="44" height="38" rx="6"/><text class="t-m" x="144" y="42" text-anchor="middle" style="font-size:18px">2</text>
<text class="t-b t-ok" x="144" y="80" text-anchor="middle" style="font-size:14px">even</text><path class="ln-ok" d="M144 86V104"/><polygon class="ah-ok" points="138,102 150,102 144,112"/><text class="t-m t-ok" x="144" y="132" text-anchor="middle" style="font-size:14px">2*2</text>
<rect class="bx" x="180" y="16" width="44" height="38" rx="6"/><text class="t-m" x="202" y="42" text-anchor="middle" style="font-size:18px">3</text>
<rect class="bx" x="238" y="16" width="44" height="38" rx="6"/><text class="t-m" x="260" y="42" text-anchor="middle" style="font-size:18px">4</text>
<rect class="bx" x="296" y="16" width="44" height="38" rx="6"/><text class="t-m" x="318" y="42" text-anchor="middle" style="font-size:18px">5</text>
<rect class="bx" x="354" y="16" width="44" height="38" rx="6"/><text class="t-m" x="376" y="42" text-anchor="middle" style="font-size:18px">6</text>
<text class="t-m" x="8" y="178">even_squares</text>
<rect class="bx-ok" x="130" y="152" width="282" height="40" rx="6"/><text class="t-m" x="144" y="178" style="font-size:18px">[4]</text>
</svg>`],
 ['3 is dropped. 4 is even: 4 * 4 = <b>16</b>.',`<svg viewBox="0 0 420 200" role="img" aria-label="comprehension step 2">
<text class="t-m" x="8" y="40">nums</text>
<rect class="bx" x="64" y="16" width="44" height="38" rx="6"/><text class="t-m t-dim" x="86" y="42" text-anchor="middle" style="font-size:18px">1</text>
<text class="t-b t-bad" x="86" y="80" text-anchor="middle" style="font-size:14px">odd</text><text class="t-s" x="86" y="102" text-anchor="middle" style="font-size:14px">dropped</text>
<rect class="bx" x="122" y="16" width="44" height="38" rx="6"/><text class="t-m t-dim" x="144" y="42" text-anchor="middle" style="font-size:18px">2</text>
<text class="t-b t-ok" x="144" y="80" text-anchor="middle" style="font-size:14px">even</text><path class="ln-ok" d="M144 86V104"/><polygon class="ah-ok" points="138,102 150,102 144,112"/><text class="t-m t-ok" x="144" y="132" text-anchor="middle" style="font-size:14px">2*2</text>
<rect class="bx-hl" x="180" y="16" width="44" height="38" rx="6"/><text class="t-m" x="202" y="42" text-anchor="middle" style="font-size:18px">3</text>
<text class="t-b t-bad" x="202" y="80" text-anchor="middle" style="font-size:14px">odd</text><text class="t-s" x="202" y="102" text-anchor="middle" style="font-size:14px">dropped</text>
<rect class="bx-hl" x="238" y="16" width="44" height="38" rx="6"/><text class="t-m" x="260" y="42" text-anchor="middle" style="font-size:18px">4</text>
<text class="t-b t-ok" x="260" y="80" text-anchor="middle" style="font-size:14px">even</text><path class="ln-ok" d="M260 86V104"/><polygon class="ah-ok" points="254,102 266,102 260,112"/><text class="t-m t-ok" x="260" y="132" text-anchor="middle" style="font-size:14px">4*4</text>
<rect class="bx" x="296" y="16" width="44" height="38" rx="6"/><text class="t-m" x="318" y="42" text-anchor="middle" style="font-size:18px">5</text>
<rect class="bx" x="354" y="16" width="44" height="38" rx="6"/><text class="t-m" x="376" y="42" text-anchor="middle" style="font-size:18px">6</text>
<text class="t-m" x="8" y="178">even_squares</text>
<rect class="bx-ok" x="130" y="152" width="282" height="40" rx="6"/><text class="t-m" x="144" y="178" style="font-size:18px">[4, 16]</text>
</svg>`],
 ['5 is dropped. 6 becomes <b>36</b>. The result is <b>[4, 16, 36]</b>, the same as the five-line loop, in one readable line.',`<svg viewBox="0 0 420 200" role="img" aria-label="comprehension step 3">
<text class="t-m" x="8" y="40">nums</text>
<rect class="bx" x="64" y="16" width="44" height="38" rx="6"/><text class="t-m t-dim" x="86" y="42" text-anchor="middle" style="font-size:18px">1</text>
<text class="t-b t-bad" x="86" y="80" text-anchor="middle" style="font-size:14px">odd</text><text class="t-s" x="86" y="102" text-anchor="middle" style="font-size:14px">dropped</text>
<rect class="bx" x="122" y="16" width="44" height="38" rx="6"/><text class="t-m t-dim" x="144" y="42" text-anchor="middle" style="font-size:18px">2</text>
<text class="t-b t-ok" x="144" y="80" text-anchor="middle" style="font-size:14px">even</text><path class="ln-ok" d="M144 86V104"/><polygon class="ah-ok" points="138,102 150,102 144,112"/><text class="t-m t-ok" x="144" y="132" text-anchor="middle" style="font-size:14px">2*2</text>
<rect class="bx" x="180" y="16" width="44" height="38" rx="6"/><text class="t-m t-dim" x="202" y="42" text-anchor="middle" style="font-size:18px">3</text>
<text class="t-b t-bad" x="202" y="80" text-anchor="middle" style="font-size:14px">odd</text><text class="t-s" x="202" y="102" text-anchor="middle" style="font-size:14px">dropped</text>
<rect class="bx" x="238" y="16" width="44" height="38" rx="6"/><text class="t-m t-dim" x="260" y="42" text-anchor="middle" style="font-size:18px">4</text>
<text class="t-b t-ok" x="260" y="80" text-anchor="middle" style="font-size:14px">even</text><path class="ln-ok" d="M260 86V104"/><polygon class="ah-ok" points="254,102 266,102 260,112"/><text class="t-m t-ok" x="260" y="132" text-anchor="middle" style="font-size:14px">4*4</text>
<rect class="bx-hl" x="296" y="16" width="44" height="38" rx="6"/><text class="t-m" x="318" y="42" text-anchor="middle" style="font-size:18px">5</text>
<text class="t-b t-bad" x="318" y="80" text-anchor="middle" style="font-size:14px">odd</text><text class="t-s" x="318" y="102" text-anchor="middle" style="font-size:14px">dropped</text>
<rect class="bx-hl" x="354" y="16" width="44" height="38" rx="6"/><text class="t-m" x="376" y="42" text-anchor="middle" style="font-size:18px">6</text>
<text class="t-b t-ok" x="376" y="80" text-anchor="middle" style="font-size:14px">even</text><path class="ln-ok" d="M376 86V104"/><polygon class="ah-ok" points="370,102 382,102 376,112"/><text class="t-m t-ok" x="376" y="132" text-anchor="middle" style="font-size:14px">6*6</text>
<text class="t-m" x="8" y="178">even_squares</text>
<rect class="bx-ok" x="130" y="152" width="282" height="40" rx="6"/><text class="t-m" x="144" y="178" style="font-size:18px">[4, 16, 36]</text>
</svg>`]])}
${V.rules(V.rh('Conventions'),
 V.ok('[n * n for n in nums]','Short and clear: great'),V.no('[a for b in c for d in b if d if a]','Too clever. If it does not fit on one line, use a normal loop'),
 V.ok('{w: len(w) for w in words}','Curly braces with a colon build a dict the same way'))}
${V.hook(`Make what, for which, if when: <code>[make for item in list if test]</code>.`)}
`)}

${V.card(4,'Best by a field','max with key=lambda',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Three player cards: Ada 92, Alan 87, Grace 95. The judge only looks at the score and picks Grace">
<rect class="bx" x="8" y="62" width="122" height="96" rx="10"/>${V.ic('person',16,72,36,'ic-info')}<text class="t-b" x="58" y="96">Ada</text><text class="t-m" x="69" y="140" text-anchor="middle" style="font-size:20px">92</text>
<rect class="bx" x="148" y="62" width="122" height="96" rx="10"/>${V.ic('person',156,72,36,'ic-info')}<text class="t-b" x="198" y="96">Alan</text><text class="t-m" x="209" y="140" text-anchor="middle" style="font-size:20px">87</text>
<rect class="bx-ok" x="288" y="62" width="124" height="96" rx="10"/>${V.ic('person',296,72,36,'ic-ok')}<text class="t-b" x="338" y="96">Grace</text><text class="t-m t-ok" x="350" y="140" text-anchor="middle" style="font-size:20px">95</text>
${V.ic('search',8,6,40,'ic-a')}<text class="t-b t-a" x="56" y="32">key: look only at the score</text>
${V.ic('check',378,114,30,'ic-ok')}
</svg><figcaption>max normally compares whole items. key= tells it what to look at: here, only each player's score. It hands back the whole winning card.</figcaption></figure>
${V.like(`<p>A talent-show judge with a scorecard. They do not compare costumes or names, only the number on the card, and then call the winner up on stage.</p>`)}
${V.anat([[1,'max'],'(',[2,'players'],', ',[3,'key='],[4,'lambda p: p["score"]'],')',[5,'["name"]']],[
 '<b>max</b> finds the biggest. <code>min</code> and <code>sorted</code> work the same way.',
 '<b>The list</b> of player dicts.',
 '<b>key=</b> "compare by this, please".',
 '<b>lambda.</b> A tiny no-name function: given a player p, give back p["score"].',
 '<b>Pick the name</b> from the winning dict.'])}
${V.rules(V.ok('lambda p: p["score"]','One expression, no return keyword'),V.no('max(players)','Python cannot compare two dicts: TypeError'),
 V.ok('sorted(players, key=..., reverse=True)','A high-score table, best first'))}
${V.hook(`key= is the judge's scorecard: compare by this, return the whole winner.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What is <code>[x * 2 for x in range(3)]</code>? <i>[0, 2, 4].</i> 2. <code>d = {"a": 1}</code>. What does <code>d.get("b", 0)</code> give? <i>0.</i> 3. You must check a million times whether an email is in a big collection. Which container? <i>A set.</i></div>
`);

explain('y2',`
<p>Sooner or later your code needs someone else's code: a library for web requests, for charts, for AI. Installing it the wrong way can break other projects, or even your computer's own tools. This lesson is the professional habit that prevents that, and you will use it in every Python project you ever start.</p>

${V.card(1,'Virtual environments','a separate toolbox for every project',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Three toolboxes: the locked system Python, the weather project with requests 2.32, and an old app with requests 2.25. They never mix">
<rect class="bx-bad" x="6" y="44" width="128" height="120" rx="10"/>${V.ic('lock',46,56,48,'ic-bad')}
<text class="t" x="70" y="128" text-anchor="middle" style="font-size:14px">system Python</text><text class="t" x="70" y="148" text-anchor="middle" style="font-size:14px">hands off</text>
<rect class="bx-ok" x="146" y="44" width="128" height="120" rx="10"/>${V.ic('box',186,52,48,'ic-ok')}
<text class="t-m" x="210" y="20" text-anchor="middle" style="font-size:14px">weather/</text>
<rect class="bx" x="156" y="108" width="108" height="24" rx="4"/><text class="t-m" x="210" y="125" text-anchor="middle" style="font-size:14px">requests 2.32</text>
<text class="t" x="210" y="152" text-anchor="middle" style="font-size:14px">.venv</text>
<rect class="bx-info" x="286" y="44" width="128" height="120" rx="10"/>${V.ic('box',326,52,48,'ic-info')}
<text class="t-m" x="350" y="20" text-anchor="middle" style="font-size:14px">old-app/</text>
<rect class="bx" x="296" y="108" width="108" height="24" rx="4"/><text class="t-m" x="350" y="125" text-anchor="middle" style="font-size:14px">requests 2.25</text>
<text class="t" x="350" y="152" text-anchor="middle" style="font-size:14px">.venv</text>
<text class="t" x="210" y="190" text-anchor="middle">each project carries its own kit</text>
</svg><figcaption>A virtual environment (venv) is a private folder of packages for one project. Two projects can need different versions of the same library, and neither touches the system Python your computer relies on.</figcaption></figure>
${V.like(`<p>A plumber keeps a separate labelled toolbox for each building they look after. Parts for one job never get mixed up with another, and nobody raids the landlord's own toolbox, which keeps the lights on.</p>`)}
${V.why(`<p>Packages used to go into one shared place. Upgrading a library for project A silently broke project B. The <code>venv</code> tool was built into Python in 2012 (version 3.3) to fix this. Since about 2023, many Linux systems go further: they refuse <code>pip install</code> into the system Python with an <b>externally-managed-environment</b> error. That error is a guard rail, not a bug.</p>`)}
${V.anat([[1,'python3'],' ',[2,'-m venv'],' ',[3,'.venv']],[
 '<b>Which Python.</b> The new environment copies this version. On Windows it is usually <code>python</code> or <code>py</code>.',
 '<b>Run a module.</b> <code>-m</code> means "run this built-in tool", and the tool is <code>venv</code>.',
 '<b>Folder name.</b> Where the toolbox lives. <code>.venv</code> is the usual name; the dot hides it in normal listings.'])}
<p><b>Watch the whole routine.</b> Top: what you type. Bottom: what changes on disk.</p>
${V.steps([
 ['Installing straight into the system Python is refused. Good: it protects tools your computer needs.',`<svg viewBox="0 0 420 216" role="img" aria-label="venv step 1">
<rect class="bx-dark" x="6" y="8" width="408" height="100" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$ pip install requests</text>
<text class="t-term t-bad" x="18" y="64" style="font-size:14px">error: externally-managed-environment</text>
<text class="t-term t-dim" x="18" y="92" style="font-size:14px">system Python is protected</text>
<rect class="bx-bad" x="6" y="118" width="132" height="92" rx="8"/>
${V.ic('lock',50,124,40,'ic-bad')}
<text class="t" x="72" y="184" text-anchor="middle" style="font-size:14px">system</text><text class="t" x="72" y="202" text-anchor="middle" style="font-size:14px">Python</text>
<rect class="bx" x="148" y="118" width="266" height="92" rx="8"/>
${V.ic('folder',156,122,28,'ic-info')}
<text class="t-m" x="190" y="142">weather/</text>
${V.ic('file',160,156,26,'ic-t')}
<text class="t-m" x="160" y="200" style="font-size:14px">weather.py</text>
</svg>`],
 ['<b>python3 -m venv .venv</b> builds an empty toolbox inside your project folder.',`<svg viewBox="0 0 420 216" role="img" aria-label="venv step 2">
<rect class="bx-dark" x="6" y="8" width="408" height="100" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$ python3 -m venv .venv</text>
<text class="t-term t-dim" x="18" y="64" style="font-size:14px">(a new folder appears)</text>
<text class="t-term" x="18" y="92" style="font-size:14px"></text>
<rect class="bx" x="6" y="118" width="132" height="92" rx="8"/>
${V.ic('lock',50,124,40,'ic-t')}
<text class="t" x="72" y="184" text-anchor="middle" style="font-size:14px">system</text><text class="t" x="72" y="202" text-anchor="middle" style="font-size:14px">Python</text>
<rect class="bx" x="148" y="118" width="266" height="92" rx="8"/>
${V.ic('folder',156,122,28,'ic-info')}
<text class="t-m" x="190" y="142">weather/</text>
${V.ic('file',160,156,26,'ic-t')}
<text class="t-m" x="160" y="200" style="font-size:14px">weather.py</text>
<rect class="bx-info" x="280" y="126" width="128" height="76" rx="8"/>
<text class="t-m" x="290" y="146" style="font-size:14px">.venv/</text>
<text class="t t-dim" x="344" y="184" text-anchor="middle" style="font-size:14px">(empty)</text>
</svg>`],
 ['<b>source .venv/bin/activate</b> switches it on. The prompt starts with <b>(.venv)</b>, so you can always see which toolbox is open.',`<svg viewBox="0 0 420 216" role="img" aria-label="venv step 3">
<rect class="bx-dark" x="6" y="8" width="408" height="100" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$ source .venv/bin/activate</text>
<text class="t-term t-ok" x="18" y="64" style="font-size:14px">(.venv) $</text>
<text class="t-term t-dim" x="18" y="92" style="font-size:14px">python and pip now mean the .venv ones</text>
<rect class="bx" x="6" y="118" width="132" height="92" rx="8"/>
${V.ic('lock',50,124,40,'ic-t')}
<text class="t" x="72" y="184" text-anchor="middle" style="font-size:14px">system</text><text class="t" x="72" y="202" text-anchor="middle" style="font-size:14px">Python</text>
<rect class="bx" x="148" y="118" width="266" height="92" rx="8"/>
${V.ic('folder',156,122,28,'ic-info')}
<text class="t-m" x="190" y="142">weather/</text>
${V.ic('file',160,156,26,'ic-t')}
<text class="t-m" x="160" y="200" style="font-size:14px">weather.py</text>
<rect class="bx-hl" x="280" y="126" width="128" height="76" rx="8"/>
<text class="t-m" x="290" y="146" style="font-size:14px">.venv/</text>
<text class="t-b t-a" x="346" y="146" style="font-size:14px">active</text>
<text class="t t-dim" x="344" y="184" text-anchor="middle" style="font-size:14px">(empty)</text>
</svg>`],
 ['Now <b>pip install requests</b> goes into .venv only, together with the 4 helper packages requests needs.',`<svg viewBox="0 0 420 216" role="img" aria-label="venv step 4">
<rect class="bx-dark" x="6" y="8" width="408" height="100" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">(.venv) $ pip install requests</text>
<text class="t-term t-ok" x="18" y="64" style="font-size:14px">Successfully installed requests-2.32.3</text>
<text class="t-term t-dim" x="18" y="92" style="font-size:14px">certifi charset-normalizer idna urllib3</text>
<rect class="bx" x="6" y="118" width="132" height="92" rx="8"/>
${V.ic('lock',50,124,40,'ic-t')}
<text class="t" x="72" y="184" text-anchor="middle" style="font-size:14px">system</text><text class="t" x="72" y="202" text-anchor="middle" style="font-size:14px">Python</text>
<rect class="bx" x="148" y="118" width="266" height="92" rx="8"/>
${V.ic('folder',156,122,28,'ic-info')}
<text class="t-m" x="190" y="142">weather/</text>
${V.ic('file',160,156,26,'ic-t')}
<text class="t-m" x="160" y="200" style="font-size:14px">weather.py</text>
<rect class="bx-ok" x="280" y="126" width="128" height="76" rx="8"/>
<text class="t-m" x="290" y="146" style="font-size:14px">.venv/</text>
<rect class="bx" x="288" y="154" width="112" height="20" rx="4"/><text class="t-m" x="344" y="169" text-anchor="middle" style="font-size:14px">requests</text>
<text class="t" x="344" y="194" text-anchor="middle" style="font-size:14px">+ 4 helpers</text>
</svg>`],
 ['The script finds requests and runs. <b>deactivate</b> closes the toolbox when you are done.',`<svg viewBox="0 0 420 216" role="img" aria-label="venv step 5">
<rect class="bx-dark" x="6" y="8" width="408" height="100" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">(.venv) $ python3 weather.py</text>
<text class="t-term t-ok" x="18" y="64" style="font-size:14px">Lagos: 31°C ...</text>
<text class="t-term t-dim" x="18" y="92" style="font-size:14px">(.venv) $ deactivate</text>
<rect class="bx" x="6" y="118" width="132" height="92" rx="8"/>
${V.ic('lock',50,124,40,'ic-t')}
<text class="t" x="72" y="184" text-anchor="middle" style="font-size:14px">system</text><text class="t" x="72" y="202" text-anchor="middle" style="font-size:14px">Python</text>
<rect class="bx" x="148" y="118" width="266" height="92" rx="8"/>
${V.ic('folder',156,122,28,'ic-info')}
<text class="t-m" x="190" y="142">weather/</text>
${V.ic('file',160,156,26,'ic-t')}
<text class="t-m" x="160" y="200" style="font-size:14px">weather.py</text>
<rect class="bx-ok" x="280" y="126" width="128" height="76" rx="8"/>
<text class="t-m" x="290" y="146" style="font-size:14px">.venv/</text>
<rect class="bx" x="288" y="154" width="112" height="20" rx="4"/><text class="t-m" x="344" y="169" text-anchor="middle" style="font-size:14px">requests</text>
<text class="t" x="344" y="194" text-anchor="middle" style="font-size:14px">+ 4 helpers</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('source .venv/bin/activate','Activate on macOS and Linux'),V.ok('.venv\\Scripts\\activate','Activate on Windows'),
 V.no('sudo pip install ...','Never force packages into the system Python'),V.no('git add .venv','Never commit the toolbox. Add .venv/ to .gitignore'),
 V.rh('Conventions'),V.ok('one .venv per project','Created inside the project folder'),V.ok('python -m pip install ...','Guarantees the pip that matches the active Python'),
 V.ok('(.venv) in the prompt','Check it before you install anything'))}
${V.hook(`Make it, start it, fill it: <code>venv</code>, <code>activate</code>, <code>pip install</code>.`)}
`)}

${V.card(2,'requirements.txt','the shopping list that rebuilds the toolbox',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="A requirements.txt file lists exact versions such as requests==2.32.3">
<rect class="bx" x="96" y="8" width="228" height="164" rx="10"/>${V.ic('file',108,18,34,'ic-info')}<text class="t-m" x="148" y="42">requirements.txt</text>
<path class="ln-d" d="M108 56H312"/>
<text class="t-m" x="112" y="80" style="font-size:14px">certifi==2024.8.30</text>
<text class="t-m" x="112" y="102" style="font-size:14px">charset-normalizer==3.4.0</text>
<text class="t-m" x="112" y="124" style="font-size:14px">idna==3.10</text>
<text class="t-m t-a" x="112" y="146" style="font-size:14px">requests==2.32.3</text>
<text class="t-m" x="112" y="168" style="font-size:14px">urllib3==2.2.3</text>
<text class="t-b t-a" x="330" y="146" style="font-size:14px">== exact</text>
</svg><figcaption>pip freeze writes down every package in the active venv with its exact version. That list, not the venv folder, is what you share.</figcaption></figure>
${V.like(`<p>Instead of posting a friend your whole kitchen, you send the recipe's shopping list. They buy the same items and end up with the same ingredients.</p>`)}
${V.anat([[1,'pip freeze'],' ',[2,'&gt;'],' ',[3,'requirements.txt']],[
 '<b>pip freeze</b> prints every installed package as <code>name==version</code>.',
 '<b>&gt;</b> is the terminal\'s "send the output into this file" arrow (it replaces the file).',
 '<b>The file.</b> The standard name every Python developer recognises.'])}
${V.steps([
 ['Inside your active venv, <b>pip freeze &gt; requirements.txt</b> writes the list.',`<svg viewBox="0 0 420 240" role="img" aria-label="requirements step 1">
${V.ic('laptop',20,6,44,'ic-info')}
<text class="t-b" x="72" y="34">your laptop</text>
${V.ic('laptop',236,6,44,'ic-t')}
<text class="t-b t-dim" x="288" y="34">teammate</text>
<rect class="bx-ok" x="10" y="58" width="186" height="72" rx="8"/><text class="t-m" x="22" y="78" style="font-size:14px">.venv/</text><text class="t-m" x="22" y="100" style="font-size:14px">requests 2.32.3</text><text class="t" x="22" y="121" style="font-size:14px">+ 4 helpers</text>
<rect class="bx-info" x="10" y="142" width="186" height="64" rx="8"/>${V.ic('file',16,150,26,'ic-info')}<text class="t-m" x="46" y="168" style="font-size:14px">requirements.txt</text><text class="t-m" x="22" y="194" style="font-size:14px">requests==2.32.3</text>
<rect class="ln-d" x="236" y="58" width="178" height="72" rx="8"/><text class="t t-dim" x="326" y="100" text-anchor="middle" style="font-size:14px">no toolbox yet</text>
</svg>`],
 ['You commit your code and requirements.txt. Your teammate pulls it. They have the list but no toolbox yet.',`<svg viewBox="0 0 420 240" role="img" aria-label="requirements step 2">
${V.ic('laptop',20,6,44,'ic-info')}
<text class="t-b" x="72" y="34">your laptop</text>
${V.ic('laptop',236,6,44,'ic-p')}
<text class="t-b" x="288" y="34">teammate</text>
<rect class="bx-ok" x="10" y="58" width="186" height="72" rx="8"/><text class="t-m" x="22" y="78" style="font-size:14px">.venv/</text><text class="t-m" x="22" y="100" style="font-size:14px">requests 2.32.3</text><text class="t" x="22" y="121" style="font-size:14px">+ 4 helpers</text>
<rect class="bx-info" x="10" y="142" width="186" height="64" rx="8"/>${V.ic('file',16,150,26,'ic-info')}<text class="t-m" x="46" y="168" style="font-size:14px">requirements.txt</text><text class="t-m" x="22" y="194" style="font-size:14px">requests==2.32.3</text>
<path class="ln-a" d="M198 174H228"/><polygon class="ah-a" points="226,167 226,181 238,174"/>
<rect class="bx-info" x="236" y="142" width="178" height="64" rx="8"/>${V.ic('file',246,150,26,'ic-info')}<text class="t-m" x="272" y="168" style="font-size:14px">requirements.txt</text><text class="t-m" x="252" y="194" style="font-size:14px">requests==2.32.3</text>
<text class="t" x="217" y="230" text-anchor="middle" style="font-size:14px">git sends the list, never the .venv folder</text>
<rect class="ln-d" x="236" y="58" width="178" height="72" rx="8"/><text class="t t-dim" x="326" y="100" text-anchor="middle" style="font-size:14px">no toolbox yet</text>
</svg>`],
 ['They run <b>python3 -m venv .venv</b>, activate it, then <b>pip install -r requirements.txt</b>. Same versions, same toolbox, and the code works first time.',`<svg viewBox="0 0 420 240" role="img" aria-label="requirements step 3">
${V.ic('laptop',20,6,44,'ic-info')}
<text class="t-b" x="72" y="34">your laptop</text>
${V.ic('laptop',236,6,44,'ic-p')}
<text class="t-b" x="288" y="34">teammate</text>
<rect class="bx-ok" x="10" y="58" width="186" height="72" rx="8"/><text class="t-m" x="22" y="78" style="font-size:14px">.venv/</text><text class="t-m" x="22" y="100" style="font-size:14px">requests 2.32.3</text><text class="t" x="22" y="121" style="font-size:14px">+ 4 helpers</text>
<rect class="bx-info" x="10" y="142" width="186" height="64" rx="8"/>${V.ic('file',16,150,26,'ic-info')}<text class="t-m" x="46" y="168" style="font-size:14px">requirements.txt</text><text class="t-m" x="22" y="194" style="font-size:14px">requests==2.32.3</text>
<path class="ln-a" d="M198 174H228"/><polygon class="ah-a" points="226,167 226,181 238,174"/>
<rect class="bx-info" x="236" y="142" width="178" height="64" rx="8"/>${V.ic('file',246,150,26,'ic-info')}<text class="t-m" x="272" y="168" style="font-size:14px">requirements.txt</text><text class="t-m" x="252" y="194" style="font-size:14px">requests==2.32.3</text>
<text class="t" x="217" y="230" text-anchor="middle" style="font-size:14px">git sends the list, never the .venv folder</text>
<rect class="bx-ok" x="236" y="58" width="178" height="72" rx="8"/><text class="t-m" x="252" y="78" style="font-size:14px">.venv/</text><text class="t-m" x="252" y="100" style="font-size:14px">requests 2.32.3</text><text class="t" x="252" y="121" style="font-size:14px">+ 4 helpers</text>
<path class="ln-ok" d="M326 140V134"/><polygon class="ah-ok" points="320,138 332,138 326,130"/>
</svg>`]])}
${V.rules(V.ok('pip install -r requirements.txt','-r means "read the list from this file"'),V.no('pip freeze (venv not active)','You would list the wrong toolbox'),
 V.ok('requests==2.32.3','== pins an exact version, so builds repeat exactly'))}
${V.watch(`<p><b>Newer tools, same idea.</b> <b>uv</b> (very fast) and <b>Poetry</b> create the venv and keep a <b>lock file</b> of exact versions for you. The ideas are identical: an isolated toolbox plus a precise list.</p>`)}
${V.build(`<ol><li><code>cd</code> into the project and check <code>python3 --version</code>.</li><li>Create the toolbox: <code>python3 -m venv .venv</code>.</li><li>Open it: <code>source .venv/bin/activate</code> and look for <b>(.venv)</b>.</li><li><code>pip install requests</code>, then run the script.</li><li>Write the list: <code>pip freeze &gt; requirements.txt</code> and read it with <code>cat</code>.</li></ol>`)}
${V.hook(`Share the list, not the toolbox. freeze writes it, <code>-r</code> reads it.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Your prompt has no <b>(.venv)</b>. Is it safe to pip install? <i>No. Activate first.</i> 2. Should .venv go into Git? <i>No. Commit requirements.txt instead.</i> 3. What does <code>-r</code> mean in <code>pip install -r requirements.txt</code>? <i>Read the package list from that file.</i></div>
`);

explain('y3',`
<p>Most useful programs do three things: read data from somewhere, change it, and send it somewhere else. A spreadsheet export becomes a report; a weather service becomes an app. This lesson gives you all three: files, JSON and web APIs.</p>

${V.card(1,'Files','borrow, use, hand back',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Entering the with block opens the file, leaving it closes the file automatically, even if an error happens inside">
<rect class="bx-info" x="110" y="18" width="200" height="110" rx="12"/>
<text class="t-m" x="210" y="44" text-anchor="middle" style="font-size:14px">with open(...) as f:</text>
${V.ic('file',186,54,48,'ic-info')}<text class="t" x="210" y="120" text-anchor="middle" style="font-size:14px">read or write f here</text>
${V.ic('unlock',22,40,48,'ic-ok')}<text class="t-b t-ok" x="46" y="112" text-anchor="middle" style="font-size:14px">opened</text>
<path class="ln-ok" d="M74 64H100"/><polygon class="ah-ok" points="98,57 98,71 110,64"/>
<path class="ln-a" d="M312 64H338"/><polygon class="ah-a" points="336,57 336,71 348,64"/>
${V.ic('lock',350,40,48,'ic-a')}<text class="t-b t-a" x="374" y="112" text-anchor="middle" style="font-size:14px">closed</text>
<text class="t" x="210" y="158" text-anchor="middle">closed for you, even if something crashes</text>
</svg><figcaption>A with block opens the file on the way in and always closes it on the way out. Forgetting to close files can lose data that was still waiting to be written.</figcaption></figure>
${V.like(`<p>Borrowing a library book with an automatic return chute on your way out of the room. You cannot forget to hand it back, even if you leave in a hurry.</p>`)}
${V.anat([[1,'with'],' ',[2,'open("contacts.csv", newline="")'],' ',[3,'as f'],':\n    ',[4,'rows = list(csv.DictReader(f))']],[
 '<b>with</b> starts a block that tidies up after itself. This is called a <b>context manager</b>.',
 '<b>open(path, ...)</b> opens the file. Add <code>"w"</code> to write. <code>newline=""</code> is what the csv module asks for.',
 '<b>as f</b>: the name for the open file inside the block.',
 '<b>The block.</b> Use <code>f</code> here, indented. After the block, the file is closed.'])}
${V.rules(V.rh('Rules'),
 V.ok('open(path)','Default mode "r": read only'),V.no('open(path, "w") by mistake','"w" wipes the file the moment it opens'),
 V.ok('open(path, "a")','Append: add to the end, keep what is there'),
 V.rh('Conventions'),V.ok('encoding="utf-8"','Say it, so names like Zoë survive on every computer'),V.ok('with open(...) as f:','Always, rather than calling f.close() yourself'))}
${V.hook(`with opens, the indent uses, the edge closes.`)}
`)}

${V.card(2,'CSV and JSON','turning text into data and back',`
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Python dict on the left, JSON text on the right. True becomes true, None becomes null, tuples become lists, and JSON always uses double quotes">
<text class="t-b" x="100" y="22" text-anchor="middle">Python dict</text><text class="t-b" x="320" y="22" text-anchor="middle">JSON text</text>
<path class="ln-a" d="M196 18H226"/><polygon class="ah-a" points="224,11 224,25 236,18"/><polygon class="ah-a" points="198,11 198,25 186,18"/>
<rect class="bx-ok" x="6" y="34" width="188" height="168" rx="10"/><rect class="bx-info" x="226" y="34" width="188" height="168" rx="10"/>
<text class="t-m" x="16" y="64" style="font-size:14px">'Ada'</text><text class="t-m" x="236" y="64" style="font-size:14px">"Ada"</text>
<text class="t-m" x="16" y="98" style="font-size:14px">True / False</text><text class="t-m" x="236" y="98" style="font-size:14px">true / false</text>
<text class="t-m" x="16" y="132" style="font-size:14px">None</text><text class="t-m" x="236" y="132" style="font-size:14px">null</text>
<text class="t-m" x="16" y="166" style="font-size:14px">(1, 2) or [1, 2]</text><text class="t-m" x="236" y="166" style="font-size:14px">[1, 2]</text>
<text class="t-m" x="16" y="192" style="font-size:14px">{"k": 1}</text><text class="t-m" x="236" y="192" style="font-size:14px">{"k": 1}</text>
</svg><figcaption>JSON is text that looks almost like a Python dict. json.dump writes Python data as JSON text; json.load reads JSON text back into Python. A few words change spelling on the way.</figcaption></figure>
${V.like(`<p>Packing for a trip abroad. Your belongings (Python data) are folded into a suitcase (JSON text) that any airport in the world understands. At the other end you unpack, and everything is back as it was.</p>`)}
${V.why(`<p>Programs in different languages need a shared way to swap data. In the early 2000s, Douglas Crockford popularised JSON (JavaScript Object Notation) as a lighter alternative to XML. Today nearly every web API speaks it, and Python's built-in <code>json</code> module translates it for you. CSV is even older: a plain-text table, one row per line, commas between columns.</p>`)}
${V.anat([[1,'json.dump'],'(',[2,'rows'],', ',[3,'f'],', ',[4,'indent=2'],')'],[
 '<b>dump</b> writes to a file. <code>dumps</code> (with an s, for "string") gives you the text instead. <code>load</code> and <code>loads</code> go the other way.',
 '<b>The data</b>: lists, dicts, strings, numbers, booleans and None.',
 '<b>The file</b>, opened with <code>"w"</code>.',
 '<b>indent=2</b> adds line breaks and spaces so humans can read it.'])}
${V.steps([
 ['Start: a CSV file. The first line is the <b>header</b>, naming the columns.',`<svg viewBox="0 0 420 270" role="img" aria-label="file data flow step 1">
<rect class="bx-hl" x="6" y="8" width="408" height="78" rx="8"/>
<text class="t-b" x="16" y="28" style="font-size:14px">contacts.csv</text><text class="t-s" x="404" y="28" text-anchor="end" style="font-size:14px">a text file</text>
<text class="t-m t-a" x="16" y="52" style="font-size:14px">name,email,city</text>
<text class="t-m" x="16" y="74" style="font-size:14px">Ada Lovelace,ada@example.com,London</text>
<path class="ln" d="M60 88V100"/><polygon class="ah" points="54,98 66,98 60,108"/>
<text class="t-m" x="74" y="104" style="font-size:14px">csv.DictReader(f)</text>
<rect class="ln-d" x="6" y="112" width="408" height="56" rx="8"/>
<rect class="ln-d" x="6" y="194" width="408" height="70" rx="8"/>
</svg>`],
 ['<b>csv.DictReader</b> reads each row and pairs it with the header. Every row becomes a dict, like <code>row["email"]</code>.',`<svg viewBox="0 0 420 270" role="img" aria-label="file data flow step 2">
<rect class="bx" x="6" y="8" width="408" height="78" rx="8"/>
<text class="t-b" x="16" y="28" style="font-size:14px">contacts.csv</text><text class="t-s" x="404" y="28" text-anchor="end" style="font-size:14px">a text file</text>
<text class="t-m t-a" x="16" y="52" style="font-size:14px">name,email,city</text>
<text class="t-m" x="16" y="74" style="font-size:14px">Ada Lovelace,ada@example.com,London</text>
<path class="ln-a" d="M60 88V100"/><polygon class="ah-a" points="54,98 66,98 60,108"/>
<text class="t-m t-a" x="74" y="104" style="font-size:14px">csv.DictReader(f)</text>
<rect class="bx-hl" x="6" y="112" width="408" height="56" rx="8"/>
<text class="t-b" x="16" y="132" style="font-size:14px">Python: a list of dicts</text>
<text class="t-m" x="16" y="156" style="font-size:14px">[{"name":&#160;"Ada&#160;Lovelace",&#160;"email":&#160;...},</text>
<rect class="ln-d" x="6" y="194" width="408" height="70" rx="8"/>
</svg>`],
 ['<b>json.dump</b> writes the whole list into contacts.json as JSON text.',`<svg viewBox="0 0 420 270" role="img" aria-label="file data flow step 3">
<rect class="bx" x="6" y="8" width="408" height="78" rx="8"/>
<text class="t-b" x="16" y="28" style="font-size:14px">contacts.csv</text><text class="t-s" x="404" y="28" text-anchor="end" style="font-size:14px">a text file</text>
<text class="t-m t-a" x="16" y="52" style="font-size:14px">name,email,city</text>
<text class="t-m" x="16" y="74" style="font-size:14px">Ada Lovelace,ada@example.com,London</text>
<path class="ln" d="M60 88V100"/><polygon class="ah" points="54,98 66,98 60,108"/>
<text class="t-m" x="74" y="104" style="font-size:14px">csv.DictReader(f)</text>
<rect class="bx-ok" x="6" y="112" width="408" height="56" rx="8"/>
<text class="t-b" x="16" y="132" style="font-size:14px">Python: a list of dicts</text>
<text class="t-m" x="16" y="156" style="font-size:14px">[{"name":&#160;"Ada&#160;Lovelace",&#160;"email":&#160;...},</text>
<path class="ln-a" d="M60 170V182"/><polygon class="ah-a" points="54,180 66,180 60,190"/>
<text class="t-m t-a" x="74" y="186" style="font-size:14px">json.dump(rows, f, indent=2)</text>
<rect class="bx-hl" x="6" y="194" width="408" height="70" rx="8"/>
<text class="t-b" x="16" y="214" style="font-size:14px">contacts.json</text><text class="t-s" x="404" y="214" text-anchor="end" style="font-size:14px">text again</text>
<text class="t-m" x="16" y="236" style="font-size:14px">[</text>
<text class="t-m" x="16" y="256" style="font-size:14px">&#160;&#160;{"name":&#160;"Ada&#160;Lovelace",&#160;"email":&#160;...</text>
</svg>`],
 ['Later, or in another program, <b>json.load</b> reads that text and rebuilds the same list of dicts.',`<svg viewBox="0 0 420 270" role="img" aria-label="file data flow step 4">
<rect class="bx" x="6" y="8" width="408" height="78" rx="8"/>
<text class="t-b" x="16" y="28" style="font-size:14px">contacts.csv</text><text class="t-s" x="404" y="28" text-anchor="end" style="font-size:14px">a text file</text>
<text class="t-m t-a" x="16" y="52" style="font-size:14px">name,email,city</text>
<text class="t-m" x="16" y="74" style="font-size:14px">Ada Lovelace,ada@example.com,London</text>
<path class="ln" d="M60 88V100"/><polygon class="ah" points="54,98 66,98 60,108"/>
<text class="t-m" x="74" y="104" style="font-size:14px">csv.DictReader(f)</text>
<rect class="bx-hl" x="6" y="112" width="408" height="56" rx="8"/>
<text class="t-b" x="16" y="132" style="font-size:14px">Python: a list of dicts</text>
<text class="t-m" x="16" y="156" style="font-size:14px">[{"name":&#160;"Ada&#160;Lovelace",&#160;"email":&#160;...},</text>
<path class="ln" d="M60 170V182"/><polygon class="ah" points="54,180 66,180 60,190"/>
<text class="t-m" x="74" y="186" style="font-size:14px">json.dump</text>
<path class="ln-ok" d="M370 192V180"/><polygon class="ah-ok" points="364,182 376,182 370,172"/>
<text class="t-m t-ok" x="360" y="186" text-anchor="end" style="font-size:14px">json.load(f)</text>
<rect class="bx" x="6" y="194" width="408" height="70" rx="8"/>
<text class="t-b" x="16" y="214" style="font-size:14px">contacts.json</text><text class="t-s" x="404" y="214" text-anchor="end" style="font-size:14px">text again</text>
<text class="t-m" x="16" y="236" style="font-size:14px">[</text>
<text class="t-m" x="16" y="256" style="font-size:14px">&#160;&#160;{"name":&#160;"Ada&#160;Lovelace",&#160;"email":&#160;...</text>
</svg>`]])}
${V.rules(V.rh('JSON rules: break one and the text will not load'),
 V.ok('{"name": "Ada"}','Keys and strings in double quotes'),V.no("{'name': 'Ada'}",'Single quotes are not JSON'),
 V.no('{"a": 1,}','No comma after the last item'),V.no('True, None','In JSON they are true and null'))}
${V.hook(`dump packs, load unpacks; the s versions work with strings.`)}
`)}

${V.card(3,'Calling an API','order from another program\'s menu',`
<figure class="fig"><svg viewBox="0 0 420 204" role="img" aria-label="API call step 2">
${V.ic('laptop',8,30,64,'ic-info')}
<text class="t" x="40" y="114" text-anchor="middle" style="font-size:14px">your code</text>
${V.ic('server',348,30,64,'ic-a')}
<text class="t" x="380" y="114" text-anchor="middle" style="font-size:14px">API</text>
<path class="ln-a" d="M80 56H330"/><polygon class="ah-a" points="328,49 328,63 340,56"/>
<text class="t-m" x="210" y="46" text-anchor="middle" style="font-size:14px">GET /users/1</text>
${V.ic('clock',194,64,30,'ic-t')}
<text class="t-b" x="230" y="86" style="font-size:14px">timer: 5 s</text>
<path class="ln-ok" d="M340 104H90"/><polygon class="ah-ok" points="92,97 92,111 80,104"/>
<text class="t-b t-ok" x="210" y="124" text-anchor="middle" style="font-size:15px">200 OK + JSON</text>
<rect class="bx-ok" x="6" y="140" width="408" height="58" rx="8"/>
<text class="t-m" x="16" y="162" style="font-size:14px">resp.json()</text>
<text class="t-m t-a" x="16" y="186" style="font-size:14px">{"name": "Ada Lovelace", ...}</text>
</svg><figcaption>Your code sends a request over the internet. The API (a program that answers requests from other programs) replies with a status code and, usually, JSON.</figcaption></figure>
${V.like(`<p>Ordering at a café counter. You ask for one thing, the staff bring it back, or tell you "sorry, we have none" (404). If nobody answers at all, you do not wait all day: you set a timer and walk away.</p>`)}
${V.anat([[1,'requests'],'.',[2,'get'],'(',[3,'url'],', ',[4,'params={"city": "Lagos"}'],', ',[5,'timeout=5'],')'],[
 '<b>requests.</b> The most popular Python library for HTTP. Install it with pip.',
 '<b>get</b> asks to read something. <code>post</code> sends new data.',
 '<b>url.</b> The address of the thing you want.',
 '<b>params.</b> Builds <code>?city=Lagos</code> on the end of the address for you, safely.',
 '<b>timeout.</b> Give up after 5 seconds. requests has no timeout unless you set one.'])}
${V.steps([
 ['<b>requests.get</b> sends the request and starts a 5-second timer.',`<svg viewBox="0 0 420 204" role="img" aria-label="API call step 1">
${V.ic('laptop',8,30,64,'ic-info')}
<text class="t" x="40" y="114" text-anchor="middle" style="font-size:14px">your code</text>
${V.ic('server',348,30,64,'ic-a')}
<text class="t" x="380" y="114" text-anchor="middle" style="font-size:14px">API</text>
<path class="ln-a" d="M80 56H330"/><polygon class="ah-a" points="328,49 328,63 340,56"/>
<text class="t-m" x="210" y="46" text-anchor="middle" style="font-size:14px">GET /users/1</text>
${V.ic('clock',194,64,30,'ic-t')}
<text class="t-b" x="230" y="86" style="font-size:14px">timer: 5 s</text>
<rect class="bx" x="6" y="140" width="408" height="58" rx="8"/>
<text class="t-m" x="16" y="162" style="font-size:14px">requests.get(url, timeout=5)</text>
<text class="t-m t-a" x="16" y="186" style="font-size:14px">waiting for an answer...</text>
</svg>`],
 ['The server answers <b>200 OK</b> with JSON. <b>resp.json()</b> turns it into a Python dict.',`<svg viewBox="0 0 420 204" role="img" aria-label="API call step 2">
${V.ic('laptop',8,30,64,'ic-info')}
<text class="t" x="40" y="114" text-anchor="middle" style="font-size:14px">your code</text>
${V.ic('server',348,30,64,'ic-a')}
<text class="t" x="380" y="114" text-anchor="middle" style="font-size:14px">API</text>
<path class="ln-a" d="M80 56H330"/><polygon class="ah-a" points="328,49 328,63 340,56"/>
<text class="t-m" x="210" y="46" text-anchor="middle" style="font-size:14px">GET /users/1</text>
${V.ic('clock',194,64,30,'ic-t')}
<text class="t-b" x="230" y="86" style="font-size:14px">timer: 5 s</text>
<path class="ln-ok" d="M340 104H90"/><polygon class="ah-ok" points="92,97 92,111 80,104"/>
<text class="t-b t-ok" x="210" y="124" text-anchor="middle" style="font-size:15px">200 OK + JSON</text>
<rect class="bx-ok" x="6" y="140" width="408" height="58" rx="8"/>
<text class="t-m" x="16" y="162" style="font-size:14px">resp.json()</text>
<text class="t-m t-a" x="16" y="186" style="font-size:14px">{"name": "Ada Lovelace", ...}</text>
</svg>`],
 ['User 99 does not exist, so the answer is <b>404</b>. Check <code>resp.status_code</code> and return None instead of crashing.',`<svg viewBox="0 0 420 204" role="img" aria-label="API call step 3">
${V.ic('laptop',8,30,64,'ic-info')}
<text class="t" x="40" y="114" text-anchor="middle" style="font-size:14px">your code</text>
${V.ic('server',348,30,64,'ic-a')}
<text class="t" x="380" y="114" text-anchor="middle" style="font-size:14px">API</text>
<path class="ln-a" d="M80 56H330"/><polygon class="ah-a" points="328,49 328,63 340,56"/>
<text class="t-m" x="210" y="46" text-anchor="middle" style="font-size:14px">GET /users/99</text>
${V.ic('clock',194,64,30,'ic-t')}
<text class="t-b" x="230" y="86" style="font-size:14px">timer: 5 s</text>
<path class="ln" d="M340 104H90"/><polygon class="ah" points="92,97 92,111 80,104"/>
<text class="t-b t-bad" x="210" y="124" text-anchor="middle" style="font-size:15px">404 Not Found</text>
<rect class="bx-warn" x="6" y="140" width="408" height="58" rx="8"/>
<text class="t-m" x="16" y="162" style="font-size:14px">resp.status_code == 404</text>
<text class="t-m t-a" x="16" y="186" style="font-size:14px">fetch_user returns None</text>
</svg>`],
 ['The slow address never answers. After 5 seconds requests raises <b>Timeout</b>. Your <code>try</code>/<code>except</code> catches it and returns a friendly error.',`<svg viewBox="0 0 420 204" role="img" aria-label="API call step 4">
${V.ic('laptop',8,30,64,'ic-info')}
<text class="t" x="40" y="114" text-anchor="middle" style="font-size:14px">your code</text>
${V.ic('server',348,30,64,'ic-a')}
<text class="t" x="380" y="114" text-anchor="middle" style="font-size:14px">API</text>
<path class="ln-a" d="M80 56H330"/><polygon class="ah-a" points="328,49 328,63 340,56"/>
<text class="t-m" x="210" y="46" text-anchor="middle" style="font-size:14px">GET /slow</text>
${V.ic('clock',194,64,30,'ic-warn')}
<text class="t-b t-bad" x="230" y="86" style="font-size:14px">5 s... give up</text>
<rect class="bx-bad" x="6" y="140" width="408" height="58" rx="8"/>
<text class="t-m" x="16" y="162" style="font-size:14px">except requests.exceptions.Timeout:</text>
<text class="t-m t-a" x="16" y="186" style="font-size:14px">return {"error": "timeout"}</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('timeout=5','Always. Without it, a silent server can freeze your program forever'),V.no('except:','Catches everything, even typos. Name the error you expect'),
 V.ok('resp.raise_for_status()','Turns a 4xx or 5xx reply into an exception'),V.ok('if resp.status_code == 404:','Handle the "not found" case before raising'),
 V.rh('Conventions'),V.no('api_key = "sk-123..."','Never write secrets in code. Read them from environment variables'))}
${V.build(`<ol><li>Open the CSV with <code>with open(path, newline="") as f</code>.</li><li>Return <code>list(csv.DictReader(f))</code>.</li><li>Open contacts.json with <code>"w"</code> and <code>json.dump</code> the list.</li><li>In fetch_user, call <code>requests.get</code> with an f-string URL and a timeout; return None on 404, else <code>resp.json()</code>.</li><li>In safe_get, wrap the call in <code>try</code> and catch <code>requests.exceptions.Timeout</code>.</li></ol>`)}
${V.hook(`Ask, set a timer, check the status, then unpack the JSON.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What does Python's <code>None</code> become in JSON? <i>null.</i> 2. You open a file with <code>"w"</code> that already has data. What happens to it? <i>It is wiped.</i> 3. Why pass <code>timeout=</code>? <i>So a server that never answers cannot hang your program.</i></div>
`);

explain('y4',`
<p>When a phone app shows your orders or a game saves your score, it is talking to a <b>web API</b> on a server: a program that answers requests from other programs. FastAPI lets you build one in a few lines of Python, and it checks every request for you.</p>

${V.card(1,'FastAPI','a restaurant for data',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="A phone sends GET /items/1 to the server, FastAPI finds the matching route on its menu, your function runs and JSON comes back">
${V.ic('phone',6,40,56,'ic-info')}<text class="t" x="34" y="120" text-anchor="middle" style="font-size:14px">client</text>
<path class="ln-a" d="M66 58H100"/><polygon class="ah-a" points="98,51 98,65 110,58"/>
<rect class="bx-a" x="112" y="10" width="190" height="130" rx="10"/>${V.ic('list',122,18,30,'ic-a')}<text class="t-b" x="160" y="40">the menu</text>
<text class="t-m" x="124" y="72" style="font-size:14px">GET  /</text>
<text class="t-m t-a" x="124" y="98" style="font-size:14px">GET  /items/{item_id}</text>
<text class="t-m" x="124" y="124" style="font-size:14px">POST /items</text>
<path class="ln-a" d="M304 94H322"/><polygon class="ah-a" points="320,87 320,101 332,94"/>
${V.ic('gear',338,58,52,'ic-ok')}<text class="t" x="364" y="130" text-anchor="middle" style="font-size:14px">your</text><text class="t" x="364" y="148" text-anchor="middle" style="font-size:14px">function</text>
<path class="ln-ok" d="M364 160V176H34V136"/><polygon class="ah-ok" points="27,138 41,138 34,128"/>
<text class="t-b t-ok" x="200" y="170" text-anchor="middle" style="font-size:14px">JSON comes back</text>
</svg><figcaption>Each route is one dish on the menu: a method (GET, POST) plus a path. When a request matches, FastAPI calls your function and turns what it returns into JSON.</figcaption></figure>
${V.like(`<p>A restaurant. The <b>menu</b> lists what you can order (the routes). The <b>waiter</b> (a server program called uvicorn) takes orders to the kitchen. Your <b>function</b> is the chef. The waiter also refuses nonsense orders before the chef ever sees them.</p>`)}
${V.why(`<p>Python added <b>type hints</b> like <code>item_id: int</code> in 2015. In 2018 Sebastián Ramírez released FastAPI, which reads those hints and uses them to check inputs, convert text to numbers and write interactive documentation, all automatically. It is built on two other libraries: Starlette (the web part) and Pydantic (the checking part).</p>`)}
${V.anat([[1,'@app.get'],'(',[2,'"/items/{item_id}"'],')\n',[3,'def get_item'],'(',[4,'item_id: int'],'):\n    return items[item_id]'],[
 '<b>Decorator.</b> The <code>@</code> line pins the function below onto the menu for GET requests.',
 '<b>Path.</b> The part in curly braces is a <b>path parameter</b>: whatever is in that spot of the address.',
 '<b>Your function.</b> A normal def. snake_case, named after what it does.',
 '<b>Type hint.</b> The parameter name matches the braces, and <code>int</code> tells FastAPI to convert and check it.'])}
<p><b>Follow one request through FastAPI.</b> Left: the stations. Right: what the request looks like at each one.</p>
${V.steps([
 ['<b>GET /items/1</b> arrives. FastAPI scans the menu and finds the route <b>/items/{item_id}</b>. Everything in a web address is text, so item_id is "1".',`<svg viewBox="0 0 420 232" role="img" aria-label="Request arrives and the route is matched">
<rect class="bx-ok" x="6" y="12" width="190" height="36" rx="6"/><text class="t" x="16" y="36" style="font-size:14px">1 server receives</text>
<path class="ln-d" d="M198 30H210"/><text class="t-m " x="214" y="36" style="font-size:14px">GET /items/1</text>
<rect class="bx-hl" x="6" y="56" width="190" height="36" rx="6"/><text class="t" x="16" y="80" style="font-size:14px">2 match the route</text>
<path class="ln-d" d="M198 74H210"/><text class="t-m t-a" x="214" y="80" style="font-size:14px">/items/{item_id}</text>
<rect class="bx" x="6" y="100" width="190" height="36" rx="6"/><text class="t" x="16" y="124" style="font-size:14px">3 check the types</text>
<rect class="bx" x="6" y="144" width="190" height="36" rx="6"/><text class="t" x="16" y="168" style="font-size:14px">4 run your function</text>
<rect class="bx" x="6" y="188" width="190" height="36" rx="6"/><text class="t" x="16" y="212" style="font-size:14px">5 send JSON back</text>
</svg>`],
 ['The type hint says <b>int</b>, so FastAPI converts "1" into the number 1. Your code never has to.',`<svg viewBox="0 0 420 232" role="img" aria-label="Type check turns text 1 into the number 1">
<rect class="bx-ok" x="6" y="12" width="190" height="36" rx="6"/><text class="t" x="16" y="36" style="font-size:14px">1 server receives</text>
<path class="ln-d" d="M198 30H210"/><text class="t-m " x="214" y="36" style="font-size:14px">GET /items/1</text>
<rect class="bx-ok" x="6" y="56" width="190" height="36" rx="6"/><text class="t" x="16" y="80" style="font-size:14px">2 match the route</text>
<path class="ln-d" d="M198 74H210"/><text class="t-m " x="214" y="80" style="font-size:14px">item_id = "1"</text>
<rect class="bx-hl" x="6" y="100" width="190" height="36" rx="6"/><text class="t" x="16" y="124" style="font-size:14px">3 check the types</text>
<path class="ln-d" d="M198 118H210"/><text class="t-m t-a" x="214" y="124" style="font-size:14px">item_id: int = 1</text>
<rect class="bx" x="6" y="144" width="190" height="36" rx="6"/><text class="t" x="16" y="168" style="font-size:14px">4 run your function</text>
<rect class="bx" x="6" y="188" width="190" height="36" rx="6"/><text class="t" x="16" y="212" style="font-size:14px">5 send JSON back</text>
</svg>`],
 ['Now your function runs with item_id = 1 and returns a normal Python dict.',`<svg viewBox="0 0 420 232" role="img" aria-label="Your function runs">
<rect class="bx-ok" x="6" y="12" width="190" height="36" rx="6"/><text class="t" x="16" y="36" style="font-size:14px">1 server receives</text>
<path class="ln-d" d="M198 30H210"/><text class="t-m " x="214" y="36" style="font-size:14px">GET /items/1</text>
<rect class="bx-ok" x="6" y="56" width="190" height="36" rx="6"/><text class="t" x="16" y="80" style="font-size:14px">2 match the route</text>
<path class="ln-d" d="M198 74H210"/><text class="t-m " x="214" y="80" style="font-size:14px">item_id = "1"</text>
<rect class="bx-ok" x="6" y="100" width="190" height="36" rx="6"/><text class="t" x="16" y="124" style="font-size:14px">3 check the types</text>
<path class="ln-d" d="M198 118H210"/><text class="t-m " x="214" y="124" style="font-size:14px">item_id: int = 1</text>
<rect class="bx-hl" x="6" y="144" width="190" height="36" rx="6"/><text class="t" x="16" y="168" style="font-size:14px">4 run your function</text>
<path class="ln-d" d="M198 162H210"/><text class="t-m t-a" x="214" y="168" style="font-size:14px">return items[1]</text>
<rect class="bx" x="6" y="188" width="190" height="36" rx="6"/><text class="t" x="16" y="212" style="font-size:14px">5 send JSON back</text>
</svg>`],
 ['FastAPI turns the dict into JSON and sends it with status <b>200 OK</b>.',`<svg viewBox="0 0 420 232" role="img" aria-label="The dict goes back as JSON with status 200">
<rect class="bx-ok" x="6" y="12" width="190" height="36" rx="6"/><text class="t" x="16" y="36" style="font-size:14px">1 server receives</text>
<path class="ln-d" d="M198 30H210"/><text class="t-m " x="214" y="36" style="font-size:14px">GET /items/1</text>
<rect class="bx-ok" x="6" y="56" width="190" height="36" rx="6"/><text class="t" x="16" y="80" style="font-size:14px">2 match the route</text>
<path class="ln-d" d="M198 74H210"/><text class="t-m " x="214" y="80" style="font-size:14px">item_id = "1"</text>
<rect class="bx-ok" x="6" y="100" width="190" height="36" rx="6"/><text class="t" x="16" y="124" style="font-size:14px">3 check the types</text>
<path class="ln-d" d="M198 118H210"/><text class="t-m " x="214" y="124" style="font-size:14px">item_id: int = 1</text>
<rect class="bx-ok" x="6" y="144" width="190" height="36" rx="6"/><text class="t" x="16" y="168" style="font-size:14px">4 run your function</text>
<path class="ln-d" d="M198 162H210"/><text class="t-m " x="214" y="168" style="font-size:14px">return items[1]</text>
<rect class="bx-hl" x="6" y="188" width="190" height="36" rx="6"/><text class="t" x="16" y="212" style="font-size:14px">5 send JSON back</text>
<path class="ln-d" d="M198 206H210"/><text class="t-m t-ok" x="214" y="212" style="font-size:14px">200 {"name": "Keyboard"</text>
</svg>`],
 ['Try <b>/items/abc</b>. "abc" cannot become an int, so FastAPI stops at station 3 and answers <b>422</b> with details. Your function is never called.',`<svg viewBox="0 0 420 232" role="img" aria-label="abc is not an int so FastAPI answers 422 and the function never runs">
<rect class="bx-ok" x="6" y="12" width="190" height="36" rx="6"/><text class="t" x="16" y="36" style="font-size:14px">1 server receives</text>
<path class="ln-d" d="M198 30H210"/><text class="t-m " x="214" y="36" style="font-size:14px">GET /items/abc</text>
<rect class="bx-ok" x="6" y="56" width="190" height="36" rx="6"/><text class="t" x="16" y="80" style="font-size:14px">2 match the route</text>
<path class="ln-d" d="M198 74H210"/><text class="t-m " x="214" y="80" style="font-size:14px">item_id = "abc"</text>
<rect class="bx-bad" x="6" y="100" width="190" height="36" rx="6"/><text class="t" x="16" y="124" style="font-size:14px">3 check the types</text>
<path class="ln-d" d="M198 118H210"/><text class="t-m t-bad" x="214" y="124" style="font-size:14px">"abc" is not an int</text>
<rect class="bx" x="6" y="144" width="190" height="36" rx="6"/><text class="t t-dim" x="16" y="168" style="font-size:14px">4 run your function</text>
<path class="ln-d" d="M198 162H210"/><text class="t-m t-dim" x="214" y="168" style="font-size:14px">never runs</text>
<rect class="bx-ok" x="6" y="188" width="190" height="36" rx="6"/><text class="t" x="16" y="212" style="font-size:14px">5 send JSON back</text>
<path class="ln-d" d="M198 206H210"/><text class="t-m t-bad" x="214" y="212" style="font-size:14px">422 + error details</text>
</svg>`],
 ['Try <b>/items/42</b>. The type is fine, but item 42 does not exist. Your function raises <b>HTTPException(status_code=404)</b>, and the client gets 404 "Item not found".',`<svg viewBox="0 0 420 232" role="img" aria-label="Item 42 is missing so the function raises a 404">
<rect class="bx-ok" x="6" y="12" width="190" height="36" rx="6"/><text class="t" x="16" y="36" style="font-size:14px">1 server receives</text>
<path class="ln-d" d="M198 30H210"/><text class="t-m " x="214" y="36" style="font-size:14px">GET /items/42</text>
<rect class="bx-ok" x="6" y="56" width="190" height="36" rx="6"/><text class="t" x="16" y="80" style="font-size:14px">2 match the route</text>
<path class="ln-d" d="M198 74H210"/><text class="t-m " x="214" y="80" style="font-size:14px">item_id = "42"</text>
<rect class="bx-ok" x="6" y="100" width="190" height="36" rx="6"/><text class="t" x="16" y="124" style="font-size:14px">3 check the types</text>
<path class="ln-d" d="M198 118H210"/><text class="t-m " x="214" y="124" style="font-size:14px">item_id: int = 42</text>
<rect class="bx-bad" x="6" y="144" width="190" height="36" rx="6"/><text class="t" x="16" y="168" style="font-size:14px">4 run your function</text>
<path class="ln-d" d="M198 162H210"/><text class="t-m t-bad" x="214" y="168" style="font-size:14px">raise HTTPException</text>
<rect class="bx-ok" x="6" y="188" width="190" height="36" rx="6"/><text class="t" x="16" y="212" style="font-size:14px">5 send JSON back</text>
<path class="ln-d" d="M198 206H210"/><text class="t-m t-bad" x="214" y="212" style="font-size:14px">404 Item not found</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('"/items/{item_id}" + item_id: int','The name in braces must match the parameter name'),V.no('return "error", 404','Returning does not set the status. Raise HTTPException'),
 V.ok('return {"name": "Keyboard"}','Dicts and lists become JSON automatically'),
 V.rh('Conventions'),V.ok('/items, /items/{item_id}','Plural nouns in paths; the method (GET, POST) is the verb'))}
${V.hook(`Menu, check, cook, serve: route match, type check, your function, JSON.`)}
`)}

${V.card(2,'Request bodies','Pydantic checks the order form',`
<figure class="fig"><svg viewBox="0 0 420 184" role="img" aria-label="request body check 1">
<text class="t-b" x="8" y="22" style="font-size:14px">POST /items  body:</text>
<rect class="bx" x="6" y="30" width="408" height="36" rx="6"/><text class="t-m" x="16" y="54" style="font-size:14px">{"name": "Mouse", "price": 19.5}</text>
<path class="ln-a" d="M60 68V80"/><polygon class="ah-a" points="54,78 66,78 60,88"/>
<rect class="bx-info" x="6" y="90" width="200" height="86" rx="8"/><text class="t-m" x="16" y="112" style="font-size:14px">class Item:</text>
<text class="t-m" x="30" y="138" style="font-size:14px">name: str</text><text class="t-m" x="30" y="162" style="font-size:14px">price: float</text>
<text class="t-b t-ok" x="176" y="138" style="font-size:16px">&#10003;</text>
<text class="t-b t-ok" x="176" y="162" style="font-size:16px">&#10003;</text>
<text class="t" x="222" y="126" style="font-size:14px">every field present</text><text class="t" x="222" y="148" style="font-size:14px">and the right type</text>
</svg><figcaption>A Pydantic model is a form with rules: which fields must be there, and what type each one is. FastAPI checks the JSON body against it before your function runs.</figcaption></figure>
${V.like(`<p>A bouncer with a guest list. Every person (field) must be on the list and have the right ticket (type). Anyone who fails is turned away at the door with a note saying exactly why.</p>`)}
${V.anat([[1,'class Item(BaseModel)'],':\n    ',[2,'name: str'],'\n    price: float\n\n',[3,'@app.post("/items", status_code=201)'],'\ndef create_item(',[4,'item: Item'],'):'],[
 '<b>The model.</b> A class that inherits from Pydantic\'s <code>BaseModel</code>. CapitalisedWords, as for every class.',
 '<b>Fields.</b> One line each: name, colon, type.',
 '<b>POST route</b> for creating things. <code>status_code=201</code> means "Created" instead of the default 200.',
 '<b>Body parameter.</b> Because its type is a model, FastAPI reads it from the JSON body.'])}
${V.steps([
 ['A POST arrives with a JSON body. FastAPI checks each field against the Item form.',`<svg viewBox="0 0 420 184" role="img" aria-label="request body check 1">
<text class="t-b" x="8" y="22" style="font-size:14px">POST /items  body:</text>
<rect class="bx" x="6" y="30" width="408" height="36" rx="6"/><text class="t-m" x="16" y="54" style="font-size:14px">{"name": "Mouse", "price": 19.5}</text>
<path class="ln-a" d="M60 68V80"/><polygon class="ah-a" points="54,78 66,78 60,88"/>
<rect class="bx-info" x="6" y="90" width="200" height="86" rx="8"/><text class="t-m" x="16" y="112" style="font-size:14px">class Item:</text>
<text class="t-m" x="30" y="138" style="font-size:14px">name: str</text><text class="t-m" x="30" y="162" style="font-size:14px">price: float</text>
<text class="t-b t-ok" x="176" y="138" style="font-size:16px">&#10003;</text>
<text class="t-b t-ok" x="176" y="162" style="font-size:16px">&#10003;</text>
<text class="t" x="222" y="126" style="font-size:14px">every field present</text><text class="t" x="222" y="148" style="font-size:14px">and the right type</text>
</svg>`],
 ['Both fields pass, so your function gets a ready-made <b>item</b> with <code>item.name</code> and <code>item.price</code>. It answers <b>201 Created</b>.',`<svg viewBox="0 0 420 184" role="img" aria-label="request body check 2">
<text class="t-b" x="8" y="22" style="font-size:14px">POST /items  body:</text>
<rect class="bx" x="6" y="30" width="408" height="36" rx="6"/><text class="t-m" x="16" y="54" style="font-size:14px">{"name": "Mouse", "price": 19.5}</text>
<path class="ln-a" d="M60 68V80"/><polygon class="ah-a" points="54,78 66,78 60,88"/>
<rect class="bx-info" x="6" y="90" width="200" height="86" rx="8"/><text class="t-m" x="16" y="112" style="font-size:14px">class Item:</text>
<text class="t-m" x="30" y="138" style="font-size:14px">name: str</text><text class="t-m" x="30" y="162" style="font-size:14px">price: float</text>
<text class="t-b t-ok" x="176" y="138" style="font-size:16px">&#10003;</text>
<text class="t-b t-ok" x="176" y="162" style="font-size:16px">&#10003;</text>
<path class="ln-ok" d="M208 132H226"/><polygon class="ah-ok" points="224,125 224,139 236,132"/>
<rect class="bx-ok" x="238" y="96" width="176" height="74" rx="8"/><text class="t-b t-ok" x="326" y="124" text-anchor="middle">201 Created</text><text class="t-m" x="326" y="152" text-anchor="middle" style="font-size:14px">item.price = 19.5</text>
</svg>`],
 ['"cheap" is not a number. FastAPI answers <b>422</b> and names the bad field. Your function never runs.',`<svg viewBox="0 0 420 184" role="img" aria-label="request body check 3">
<text class="t-b" x="8" y="22" style="font-size:14px">POST /items  body:</text>
<rect class="bx" x="6" y="30" width="408" height="36" rx="6"/><text class="t-m" x="16" y="54" style="font-size:14px">{"name": "X", "price": "cheap"}</text>
<path class="ln-a" d="M60 68V80"/><polygon class="ah-a" points="54,78 66,78 60,88"/>
<rect class="bx-info" x="6" y="90" width="200" height="86" rx="8"/><text class="t-m" x="16" y="112" style="font-size:14px">class Item:</text>
<text class="t-m" x="30" y="138" style="font-size:14px">name: str</text><text class="t-m" x="30" y="162" style="font-size:14px">price: float</text>
<text class="t-b t-ok" x="176" y="138" style="font-size:16px">&#10003;</text>
<text class="t-b t-bad" x="176" y="162" style="font-size:16px">&#10007;</text>
<path class="ln-a" d="M208 132H226"/><polygon class="ah-a" points="224,125 224,139 236,132"/>
<rect class="bx-bad" x="238" y="96" width="176" height="74" rx="8"/><text class="t-b t-bad" x="326" y="122" text-anchor="middle">422</text><text class="t" x="326" y="144" text-anchor="middle" style="font-size:14px">price: not a</text><text class="t" x="326" y="162" text-anchor="middle" style="font-size:14px">valid number</text>
</svg>`]])}
${V.rules(V.rh('Status codes you will use'),
 V.ok('200 OK','A normal successful answer'),V.ok('201 Created','Something new was made (POST)'),
 V.no('404 Not Found','The thing asked for does not exist'),V.no('422 Unprocessable','Input failed the type checks'))}
${V.hook(`Types are the bouncer: wrong type, 422, and the chef never sees it.`)}
`)}

${V.card(3,'Query parameters and running it','the extras after the ?',`
<figure class="fig"><svg viewBox="0 0 420 140" role="img" aria-label="The address /search?q=key&amp;max_price=50 split into path, q and max_price, matching the function parameters">
<text class="t-m" x="10" y="34" style="font-size:17px">/search<tspan class="t-a">?q=key</tspan><tspan class="t-info">&amp;max_price=50</tspan></text>
<text class="t-a" x="80" y="60" style="font-size:14px">q</text><text class="t-info" x="190" y="60" style="font-size:14px">max_price</text>
<rect class="bx" x="6" y="70" width="408" height="62" rx="8"/>
<text class="t-m" x="16" y="96" style="font-size:14px">def search(<tspan class="t-a">q: str = ""</tspan>,</text>
<text class="t-m t-info" x="110" y="120" style="font-size:14px">max_price: float = 1000):</text>
</svg><figcaption>After the ? come query parameters, joined by &amp;. Any function parameter that is not in the path is read from here. A default value makes it optional.</figcaption></figure>
${V.anat([[1,'uvicorn'],' ',[2,'main'],[3,':app'],' ',[4,'--reload']],[
 '<b>uvicorn</b>: the server program (the waiter) that runs your app.',
 '<b>main</b>: the file main.py, written without .py.',
 '<b>:app</b>: the variable inside it, <code>app = FastAPI()</code>.',
 '<b>--reload</b>: restart automatically when you save. For development only.'])}
${V.rules(V.ok('q: str = ""','Has a default, so ?q= can be left out'),V.no('q: str','No default: leaving it out gives 422'),
 V.ok('http://127.0.0.1:8000/docs','Free interactive docs: try every route in the browser'),V.ok('TestClient(app).get("/")','Call your API from tests without a real server'))}
${V.build(`<ol><li>Make GET <code>/</code> return a message dict.</li><li>Add GET <code>/items/{item_id}</code> with <code>item_id: int</code>; raise <code>HTTPException(status_code=404, detail="Item not found")</code> when missing.</li><li>Write the <code>Item</code> model and a POST route with <code>status_code=201</code>.</li><li>Add <code>/search</code> with defaulted query parameters and filter the items.</li><li>Try each one, including bad inputs, in the request panel.</li></ol>`)}
${V.hook(`Braces in the path, ? for extras, a type hint for every input.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What does GET <code>/items/abc</code> return when the hint is <code>item_id: int</code>? <i>422.</i> 2. Which status code means "created"? <i>201.</i> 3. In <code>/search?q=key</code>, what is <code>q</code>? <i>A query parameter with the value "key".</i></div>
`);

explain('y5',`
<p>Every time you change code, something else might quietly break. Checking everything by hand takes ages, so professionals write <b>tests</b>: small programs that check your program in under a second. pytest is the tool almost every Python team uses.</p>

${V.card(1,'A test','arrange, act, assert',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Three panels: arrange the inputs, act by calling the function, assert the result is what you expected">
<rect class="bx-info" x="6" y="10" width="128" height="126" rx="10"/>${V.ic('box',46,20,48,'ic-info')}<text class="t-b" x="70" y="92" text-anchor="middle">1 Arrange</text><text class="t" x="70" y="116" text-anchor="middle" style="font-size:14px">set up inputs</text>
<path class="ln-a" d="M136 73H142"/><polygon class="ah-a" points="140,66 140,80 150,73"/>
<rect class="bx-a" x="146" y="10" width="128" height="126" rx="10"/>${V.ic('gear',186,20,48,'ic-a')}<text class="t-b" x="210" y="92" text-anchor="middle">2 Act</text><text class="t" x="210" y="116" text-anchor="middle" style="font-size:14px">call the code</text>
<path class="ln-a" d="M276 73H282"/><polygon class="ah-a" points="280,66 280,80 290,73"/>
<rect class="bx-ok" x="286" y="10" width="128" height="126" rx="10"/>${V.ic('check',326,20,48,'ic-ok')}<text class="t-b" x="350" y="92" text-anchor="middle">3 Assert</text><text class="t" x="350" y="116" text-anchor="middle" style="font-size:14px">check the result</text>
<text class="t-m" x="210" y="162" text-anchor="middle" style="font-size:14px">19.99, 15 &#10140; apply_discount &#10140; 16.99 ?</text>
</svg><figcaption>Every good test has the same three beats. Set things up, do the one thing you are testing, then check the answer is exactly what you expected.</figcaption></figure>
${V.like(`<p>A science experiment. Arrange the equipment, do the experiment, read the thermometer and compare it with your prediction. If the reading is wrong, you know exactly which experiment failed.</p>`)}
${V.why(`<p>Older Python testing meant writing classes full of special methods like <code>assertEqual</code>. pytest, which grew out of the PyPy project in the mid-2000s, lets a test be a plain function with a plain <code>assert</code>, and still reports exactly what went wrong.</p>`)}
${V.anat([[1,'def test_rounds_to_cents'],'():\n    ',[2,'price, percent = 19.99, 15'],'\n    ',[3,'result = apply_discount(price, percent)'],'\n    ',[4,'assert result == 16.99']],[
 '<b>The name.</b> Must start with <code>test_</code> or pytest ignores it. Say what should happen.',
 '<b>Arrange.</b> The inputs.',
 '<b>Act.</b> Call the code once.',
 '<b>Assert.</b> <code>assert</code> means "this must be True". If it is False, the test fails.'])}
<p><b>Watch pytest run.</b> Imagine someone deleted the <code>round()</code> from apply_discount.</p>
${V.steps([
 ['pytest searches for files named <b>test_*.py</b> and, inside them, functions named <b>test_*</b>. It collects 2.',`<svg viewBox="0 0 420 212" role="img" aria-label="pytest run step 1">
<rect class="bx-dark" x="6" y="8" width="408" height="196" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$&#160;pytest</text>
<text class="t-term t-a" x="18" y="66" style="font-size:14px">collected&#160;2&#160;items</text>
</svg>`],
 ['The first test runs and passes. pytest prints a dot for each pass.',`<svg viewBox="0 0 420 212" role="img" aria-label="pytest run step 2">
<rect class="bx-dark" x="6" y="8" width="408" height="196" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$&#160;pytest</text>
<text class="t-term t-dim" x="18" y="66" style="font-size:14px">collected&#160;2&#160;items</text>
<text class="t-term" x="18" y="96" style="font-size:14px">test_discount.py&#160;.</text>
<text class="t-b t-ok" x="250" y="96" style="font-size:14px">. = passed</text>
</svg>`],
 ['The second fails: <b>F</b>. pytest shows the failing line and the real values: 16.9915 is not 16.99. You instantly know rounding broke.',`<svg viewBox="0 0 420 212" role="img" aria-label="pytest run step 3">
<rect class="bx-dark" x="6" y="8" width="408" height="196" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$&#160;pytest</text>
<text class="t-term t-dim" x="18" y="66" style="font-size:14px">collected&#160;2&#160;items</text>
<text class="t-term" x="18" y="96" style="font-size:14px">test_discount.py&#160;.F</text>
<text class="t-term t-bad" x="18" y="126" style="font-size:14px">&gt;&#160;&#160;assert&#160;result&#160;==&#160;16.99</text>
<text class="t-term t-bad" x="18" y="156" style="font-size:14px">E&#160;&#160;assert&#160;16.9915&#160;==&#160;16.99</text>
<text class="t-b t-bad" x="250" y="96" style="font-size:14px">F = failed</text>
</svg>`],
 ['The summary line: 1 failed, 1 passed. Fix the code, run again, and aim for all green.',`<svg viewBox="0 0 420 212" role="img" aria-label="pytest run step 4">
<rect class="bx-dark" x="6" y="8" width="408" height="196" rx="8"/>
<text class="t-term" x="18" y="36" style="font-size:14px">$&#160;pytest</text>
<text class="t-term t-dim" x="18" y="66" style="font-size:14px">collected&#160;2&#160;items</text>
<text class="t-term" x="18" y="96" style="font-size:14px">test_discount.py&#160;.F</text>
<text class="t-term t-bad" x="18" y="126" style="font-size:14px">&gt;&#160;&#160;assert&#160;result&#160;==&#160;16.99</text>
<text class="t-term t-bad" x="18" y="156" style="font-size:14px">E&#160;&#160;assert&#160;16.9915&#160;==&#160;16.99</text>
<text class="t-term t-warn" x="18" y="186" style="font-size:14px">1&#160;failed,&#160;1&#160;passed&#160;in&#160;0.02s</text>
</svg>`]])}
${V.rules(V.rh('Rules: or pytest will not find your tests'),
 V.ok('test_discount.py','File names start with test_ (or end with _test.py)'),V.no('check_discount()','Functions must start with test_'),
 V.ok('assert a == b','A plain assert is all you need'),
 V.rh('Conventions'),V.ok('test_rejects_percent_over_100','Long, clear names: the name is the report'),V.ok('one behaviour per test','When it fails, you know exactly what broke'))}
${V.hook(`Arrange, act, assert: set it, run it, check it.`)}
`)}

${V.card(2,'Parametrize','one test, many cases',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="Three rows of inputs feed one test function, producing three separate passing tests">
<rect class="bx" x="6" y="12" width="150" height="40" rx="6"/><text class="t-m" x="81" y="38" text-anchor="middle">200, 50, 100</text>
<rect class="bx" x="6" y="68" width="150" height="40" rx="6"/><text class="t-m" x="81" y="94" text-anchor="middle">80, 25, 60</text>
<rect class="bx" x="6" y="124" width="150" height="40" rx="6"/><text class="t-m" x="81" y="150" text-anchor="middle">10, 100, 0</text>
<path class="ln-a" d="M158 32 190 78M158 88H190M158 144 190 98"/>
<rect class="bx-a" x="192" y="58" width="96" height="60" rx="10"/>${V.ic('gear',220,62,40,'ic-a')}<text class="t-s" x="240" y="112" text-anchor="middle" style="font-size:14px">one test</text>
<path class="ln-ok" d="M290 78 314 32M290 88H314M290 98 314 144"/>
${V.ic('check',318,14,36,'ic-ok')}${V.ic('check',318,70,36,'ic-ok')}${V.ic('check',318,126,36,'ic-ok')}
<text class="t" x="360" y="38" style="font-size:14px">pass</text><text class="t" x="360" y="94" style="font-size:14px">pass</text><text class="t" x="360" y="150" style="font-size:14px">pass</text>
</svg><figcaption>Each row is (price, percent, expected). pytest runs the same test once per row and reports each as its own test, such as test_many_cases[200-50-100].</figcaption></figure>
${V.like(`<p>A cookie cutter. You make the shape once and press it into as many lumps of dough as you like.</p>`)}
${V.anat([[1,'@pytest.mark.parametrize'],'(',[2,'"price,percent,expected"'],', [\n    ',[3,'(200, 50, 100)'],',\n    (80, 25, 60),\n])\ndef test_many_cases(',[4,'price, percent, expected'],'):'],[
 '<b>The decorator.</b> Needs <code>import pytest</code> at the top.',
 '<b>Names</b> of the values, in one string, separated by commas.',
 '<b>One tuple per case</b>, in the same order as the names.',
 '<b>Matching parameters.</b> The names must be spelled exactly the same.'])}
${V.rules(V.no('"price, percent" vs (price, pct)','Names must match the parameters exactly'),V.ok('a list of tuples','Add a case by adding one line'))}
${V.hook(`One cutter, many cookies: one test, a row per case.`)}
`)}

${V.card(3,'Edge cases and errors','test where bugs hide',`
<figure class="fig"><svg viewBox="0 0 420 140" role="img" aria-label="A number line of percentages. 0 and 100 are the edges, 50 is the middle, -5 and 150 are invalid">
<path class="ln" style="stroke-width:4" d="M20 70H400"/>
<rect class="bx-ok" x="80" y="56" width="260" height="28" rx="4"/>
<circle class="dot" cx="40" cy="70" r="9"/><text class="t-b t-bad" x="40" y="44" text-anchor="middle">-5</text>
<circle class="dot-ok" cx="80" cy="70" r="9"/><text class="t-b" x="80" y="44" text-anchor="middle">0</text>
<circle class="dot-m" cx="210" cy="70" r="7"/><text class="t" x="210" y="44" text-anchor="middle">50</text>
<circle class="dot-ok" cx="340" cy="70" r="9"/><text class="t-b" x="340" y="44" text-anchor="middle">100</text>
<circle class="dot" cx="385" cy="70" r="9"/><text class="t-b t-bad" x="385" y="44" text-anchor="middle">150</text>
<text class="t" x="80" y="112" text-anchor="middle" style="font-size:14px">edge</text><text class="t" x="210" y="112" text-anchor="middle" style="font-size:14px">happy path</text><text class="t" x="340" y="112" text-anchor="middle" style="font-size:14px">edge</text>
<text class="t-bad" x="40" y="132" text-anchor="middle" style="font-size:14px">invalid</text><text class="t-bad" x="385" y="132" text-anchor="middle" style="font-size:14px">invalid</text>
</svg><figcaption>Testing 50% only proves the easy case. Bugs cluster at the edges (0 and 100) and just outside them (-5, 150), so test those too.</figcaption></figure>
${V.like(`<p>Testing a bridge with one bicycle tells you very little. Engineers test it with the heaviest lorry it is meant to carry, and check that it refuses one that is too heavy.</p>`)}
${V.anat([[1,'with'],' ',[2,'pytest.raises(ValueError)'],':\n    ',[3,'apply_discount(100, 150)']],[
 '<b>with</b> wraps the code that should fail.',
 '<b>The error you expect.</b> The test passes only if exactly this kind of error happens.',
 '<b>The bad call.</b> 150% is not allowed, so a ValueError must be raised.'])}
${V.rules(V.ok('pytest.raises(ValueError)','Passes only if that error is raised'),V.no('a test with no assert','It can never fail, so it proves nothing'),
 V.ok('0, 100, -1, 101','Test each edge and one step past it'))}
${V.hook(`Middle is easy, edges are where bugs live.`)}
`)}

${V.card(4,'Fixtures','ready-made test ingredients',`
<figure class="fig"><svg viewBox="0 0 420 218" role="img" aria-label="fixture step 4">
<rect class="bx-info" x="6" y="8" width="408" height="62" rx="8"/>
<text class="t-m t-a" x="16" y="32" style="font-size:14px">@pytest.fixture</text>
<text class="t-m" x="16" y="56" style="font-size:14px">def <tspan class="t-b">cart</tspan>(): return [...]</text>
<rect class="bx-hl" x="6" y="150" width="408" height="62" rx="8"/>
<text class="t-m" x="16" y="174" style="font-size:14px">def test_cart_total(<tspan class="t-a">cart</tspan>):</text>
<text class="t-m" x="40" y="198" style="font-size:14px">assert cart_total(cart) == 25.5</text>
<path class="ln-a" d="M120 148V80"/><polygon class="ah-a" points="113,82 127,82 120,72"/>
<text class="t" x="132" y="104" style="font-size:14px">pytest finds the fixture</text><text class="t" x="132" y="122" style="font-size:14px">with the same name</text>
<rect class="bx-ok" x="286" y="80" width="128" height="60" rx="8"/>${V.ic('list',294,88,26,'ic-ok')}<text class="t-m" x="326" y="106" style="font-size:14px">2 items</text><text class="t" x="350" y="130" text-anchor="middle" style="font-size:14px">fresh copy</text>
<path class="ln-ok" d="M350 142V148"/><polygon class="ah-ok" points="343,144 357,144 350,152"/>
<text class="t-b t-ok" x="404" y="198" text-anchor="end" style="font-size:16px">&#10003;</text>
</svg><figcaption>A fixture is a function that prepares something tests need. Any test that names it as a parameter gets a fresh copy, automatically.</figcaption></figure>
${V.like(`<p>A restaurant kitchen's prep station. The chef shouts "onions!" and a bowl of freshly chopped onions arrives. Every dish gets its own fresh bowl, so one dish cannot spoil another.</p>`)}
${V.steps([
 ['pytest is about to run <b>test_cart_total</b> and sees it asks for a parameter called <b>cart</b>.',`<svg viewBox="0 0 420 218" role="img" aria-label="fixture step 1">
<rect class="bx-info" x="6" y="8" width="408" height="62" rx="8"/>
<text class="t-m t-a" x="16" y="32" style="font-size:14px">@pytest.fixture</text>
<text class="t-m" x="16" y="56" style="font-size:14px">def <tspan class="t-b">cart</tspan>(): return [...]</text>
<rect class="bx-hl" x="6" y="150" width="408" height="62" rx="8"/>
<text class="t-m" x="16" y="174" style="font-size:14px">def test_cart_total(<tspan class="t-a">cart</tspan>):</text>
<text class="t-m" x="40" y="198" style="font-size:14px">assert cart_total(cart) == 25.5</text>
<text class="t-b t-a" x="210" y="118" text-anchor="middle">"This test wants something called cart."</text>
</svg>`],
 ['It looks for a function marked <b>@pytest.fixture</b> with that exact name.',`<svg viewBox="0 0 420 218" role="img" aria-label="fixture step 2">
<rect class="bx-hl" x="6" y="8" width="408" height="62" rx="8"/>
<text class="t-m t-a" x="16" y="32" style="font-size:14px">@pytest.fixture</text>
<text class="t-m" x="16" y="56" style="font-size:14px">def <tspan class="t-b">cart</tspan>(): return [...]</text>
<rect class="bx" x="6" y="150" width="408" height="62" rx="8"/>
<text class="t-m" x="16" y="174" style="font-size:14px">def test_cart_total(<tspan class="t-a">cart</tspan>):</text>
<text class="t-m" x="40" y="198" style="font-size:14px">assert cart_total(cart) == 25.5</text>
<path class="ln-a" d="M120 148V80"/><polygon class="ah-a" points="113,82 127,82 120,72"/>
<text class="t" x="132" y="104" style="font-size:14px">pytest finds the fixture</text><text class="t" x="132" y="122" style="font-size:14px">with the same name</text>
</svg>`],
 ['It calls the fixture, which builds a fresh cart list.',`<svg viewBox="0 0 420 218" role="img" aria-label="fixture step 3">
<rect class="bx-hl" x="6" y="8" width="408" height="62" rx="8"/>
<text class="t-m t-a" x="16" y="32" style="font-size:14px">@pytest.fixture</text>
<text class="t-m" x="16" y="56" style="font-size:14px">def <tspan class="t-b">cart</tspan>(): return [...]</text>
<rect class="bx" x="6" y="150" width="408" height="62" rx="8"/>
<text class="t-m" x="16" y="174" style="font-size:14px">def test_cart_total(<tspan class="t-a">cart</tspan>):</text>
<text class="t-m" x="40" y="198" style="font-size:14px">assert cart_total(cart) == 25.5</text>
<path class="ln-a" d="M120 148V80"/><polygon class="ah-a" points="113,82 127,82 120,72"/>
<text class="t" x="132" y="104" style="font-size:14px">pytest finds the fixture</text><text class="t" x="132" y="122" style="font-size:14px">with the same name</text>
<rect class="bx-ok" x="286" y="80" width="128" height="60" rx="8"/>${V.ic('list',294,88,26,'ic-ok')}<text class="t-m" x="326" y="106" style="font-size:14px">2 items</text><text class="t" x="350" y="130" text-anchor="middle" style="font-size:14px">fresh copy</text>
</svg>`],
 ['It passes that list into the test as <b>cart</b>, and the assert runs. Pass.',`<svg viewBox="0 0 420 218" role="img" aria-label="fixture step 4">
<rect class="bx-info" x="6" y="8" width="408" height="62" rx="8"/>
<text class="t-m t-a" x="16" y="32" style="font-size:14px">@pytest.fixture</text>
<text class="t-m" x="16" y="56" style="font-size:14px">def <tspan class="t-b">cart</tspan>(): return [...]</text>
<rect class="bx-hl" x="6" y="150" width="408" height="62" rx="8"/>
<text class="t-m" x="16" y="174" style="font-size:14px">def test_cart_total(<tspan class="t-a">cart</tspan>):</text>
<text class="t-m" x="40" y="198" style="font-size:14px">assert cart_total(cart) == 25.5</text>
<path class="ln-a" d="M120 148V80"/><polygon class="ah-a" points="113,82 127,82 120,72"/>
<text class="t" x="132" y="104" style="font-size:14px">pytest finds the fixture</text><text class="t" x="132" y="122" style="font-size:14px">with the same name</text>
<rect class="bx-ok" x="286" y="80" width="128" height="60" rx="8"/>${V.ic('list',294,88,26,'ic-ok')}<text class="t-m" x="326" y="106" style="font-size:14px">2 items</text><text class="t" x="350" y="130" text-anchor="middle" style="font-size:14px">fresh copy</text>
<path class="ln-ok" d="M350 142V148"/><polygon class="ah-ok" points="343,144 357,144 350,152"/>
<text class="t-b t-ok" x="404" y="198" text-anchor="end" style="font-size:16px">&#10003;</text>
</svg>`]])}
${V.rules(V.ok('def test_x(cart):','The parameter name picks the fixture'),V.no('test_x(cart) with no fixture','pytest stops: fixture \'cart\' not found'),
 V.ok('a fresh copy per test','Tests stay independent: one cannot spoil another'))}
${V.build(`<ol><li>Write three tests with clear <code>test_</code> names, including one for rounding.</li><li>Turn similar tests into one <code>@pytest.mark.parametrize</code> test with three rows.</li><li>Add a <code>pytest.raises(ValueError)</code> test for 150%.</li><li>Create a <code>cart</code> fixture and a test that asks for it by name.</li><li>Run, read any F carefully, and repeat until all pass.</li></ol>`)}
${V.hook(`Name it in the brackets and pytest brings it to the table.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Will pytest run a function called <code>check_total()</code>? <i>No. It must start with test_.</i> 2. What does F mean in pytest output? <i>A test failed.</i> 3. Which percents are the best to test for apply_discount? <i>0, 100 and invalid values like 150, not just 10.</i></div>
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
