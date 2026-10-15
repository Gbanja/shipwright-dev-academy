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
<text class="t-m" x="210" y="138" text-anchor="middle" style="font-size:16px">nums [1..6] &#10140; [4, 16, 36]#10140; [4, 16, 36]</text>
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
