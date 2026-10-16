/* php: "Understand it" visual walkthroughs. */

explain('hb1',`
<p>When you open a shop and it says "Hi, Sam, you have 3 items in your basket", a program built that page just for you, a split second earlier. PHP is one of the most common languages doing that job, and it runs WordPress and Laravel sites all over the web.</p>

${V.card(1,'The server builds the page','a fresh page for every visitor',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A browser sends a request to a server. PHP runs hello.php on the server and only plain HTML comes back.">
${V.ic('laptop',12,40,76,'ic-info')}
<text class="t-b" x="50" y="140" text-anchor="middle">Browser</text>
<path class="ln-a" d="M98 62H272"/><polygon class="ah-a" points="270,55 270,69 282,62"/>
<text class="t-m t-a" x="186" y="50" text-anchor="middle" style="font-size:14px">GET /hello.php</text>
<path class="ln-ok" d="M284 122H110"/><polygon class="ah-ok" points="112,115 112,129 100,122"/>
${V.ic('file',112,132,40,'ic-ok')}
<text class="t-s" x="160" y="160">plain HTML</text>
<rect class="bx-a" x="290" y="10" width="120" height="166" rx="10"/>
${V.ic('server',320,20,60,'ic-a')}
<text class="t-m" x="350" y="106" text-anchor="middle" style="font-size:14px">hello.php</text>
${V.ic('gear',332,114,36,'ic-a')}
<text class="t-b" x="350" y="168" text-anchor="middle">PHP runs</text>
</svg><figcaption>Your browser asks for a page. The server sees the .php ending, lets PHP run the code, and sends back only the result: ordinary HTML. The PHP code itself never leaves the server.</figcaption></figure>
${V.like(`<p>A restaurant kitchen. You order (the <b>request</b>), the cook follows a recipe out of sight (PHP running your code), and only the finished plate comes to your table (the HTML). You never see the recipe.</p>`)}
${V.why(`<p>Early web pages were fixed files: everyone saw the same words. In 1994 Rasmus Lerdorf wrote some small tools to count visitors to his online CV and called them "Personal Home Page Tools". People loved being able to change a page for each visitor, and the tools grew into PHP, now short for "PHP: Hypertext Preprocessor".</p>`)}
${V.anat([[1,'&lt;?php'],'\n',[2,'echo'],' ',[3,'"Hello, world!\\n"'],[4,';']],[
 '<b>Opening tag.</b> Everything after it is PHP code. Anything before it is sent out as plain text.',
 '<b>echo.</b> PHP\'s word for "print this". Whatever follows goes into the page.',
 '<b>A string.</b> A piece of text, inside quotes. <code>\\n</code> is a code meaning "start a new line".',
 '<b>Semicolon.</b> Ends the statement (one instruction), like a full stop ends a sentence.'])}
<p><b>Watch one visit happen.</b> Press Next to follow a single request through the server.</p>
${V.steps([
 ['You press Enter. Your browser sends a <b>request</b> to the server: "please give me /hello.php".',`<svg viewBox="0 0 420 210" role="img" aria-label="The browser sends a request to the server">
${V.ic('laptop',10,8,56,'ic-info')}${V.ic('server',354,8,56,'ic-a')}
<path class="ln-a" d="M74 40H336"/><polygon class="ah-a" points="334,33 334,47 346,40"/>
<text class="t-m t-a" x="210" y="30" text-anchor="middle" style="font-size:14px">GET /hello.php</text>
<rect class="bx-dark" x="10" y="80" width="262" height="96" rx="8"/>
<text class="t-term t-dim" x="30" y="108" style="font-size:14px">&lt;?php</text>
<text class="t-term t-dim" x="30" y="134" style="font-size:14px">$name = "Ada";</text>
<text class="t-term t-dim" x="30" y="160" style="font-size:14px">echo "&lt;h1&gt;Hi, $name&lt;/h1&gt;";</text>
<text class="t-s" x="286" y="98">Memory</text><rect class="ln-d" x="284" y="106" width="126" height="70" rx="6"/>
<text class="t-s" x="10" y="200">Output:</text>
</svg>`],
 ['The server sees <b>.php</b> and hands the file to PHP. Line 2 runs: PHP makes a box called <b>$name</b> and puts <b>"Ada"</b> in it.',`<svg viewBox="0 0 420 210" role="img" aria-label="PHP runs line 2 and stores Ada in name">
${V.ic('laptop',10,8,56,'ic-info')}${V.ic('server',354,8,56,'ic-a')}
${V.ic('gear',306,16,40,'ic-a')}<text class="t-s" x="292" y="40" text-anchor="end">PHP is running</text>
<rect class="bx-dark" x="10" y="80" width="262" height="96" rx="8"/>
<text class="t-term t-dim" x="30" y="108" style="font-size:14px">&lt;?php</text>
<text class="t-a" x="14" y="134" style="font-size:14px">&#9654;</text><text class="t-term" x="30" y="134" style="font-size:14px">$name = "Ada";</text>
<text class="t-term t-dim" x="30" y="160" style="font-size:14px">echo "&lt;h1&gt;Hi, $name&lt;/h1&gt;";</text>
<text class="t-s" x="286" y="98">Memory</text><rect class="bx-ok" x="284" y="106" width="126" height="70" rx="6"/>
<text class="t-m" x="347" y="134" text-anchor="middle">$name</text><text class="t-m" x="347" y="162" text-anchor="middle" style="font-size:17px">"Ada"</text>
<text class="t-s" x="10" y="200">Output:</text>
</svg>`],
 ['Line 3: <b>echo</b> writes text into the output. Inside double quotes, PHP swaps <b>$name</b> for its value, so the output is <b>&amp;lt;h1&amp;gt;Hi, Ada&amp;lt;/h1&amp;gt;</b>.',`<svg viewBox="0 0 420 210" role="img" aria-label="echo writes h1 Hi, Ada into the output">
${V.ic('laptop',10,8,56,'ic-info')}${V.ic('server',354,8,56,'ic-a')}
${V.ic('gear',306,16,40,'ic-a')}<text class="t-s" x="292" y="40" text-anchor="end">PHP is running</text>
<rect class="bx-dark" x="10" y="80" width="262" height="96" rx="8"/>
<text class="t-term t-dim" x="30" y="108" style="font-size:14px">&lt;?php</text>
<text class="t-term t-dim" x="30" y="134" style="font-size:14px">$name = "Ada";</text>
<text class="t-a" x="14" y="160" style="font-size:14px">&#9654;</text><text class="t-term" x="30" y="160" style="font-size:14px">echo "&lt;h1&gt;Hi, $name&lt;/h1&gt;";</text>
<text class="t-s" x="286" y="98">Memory</text><rect class="bx-ok" x="284" y="106" width="126" height="70" rx="6"/>
<text class="t-m" x="347" y="134" text-anchor="middle">$name</text><text class="t-m" x="347" y="162" text-anchor="middle" style="font-size:17px">"Ada"</text>
<text class="t-s" x="10" y="200">Output:</text><text class="t-m t-ok" x="70" y="200" style="font-size:15px">&lt;h1&gt;Hi, Ada&lt;/h1&gt;</text>
</svg>`],
 ['The code is finished. The server sends <b>only the output</b> back across the internet. The memory box is thrown away: the next visitor gets a brand-new run.',`<svg viewBox="0 0 420 210" role="img" aria-label="The HTML output travels back to the browser">
${V.ic('laptop',10,8,56,'ic-info')}${V.ic('server',354,8,56,'ic-a')}
<path class="ln-ok" d="M346 40H84"/><polygon class="ah-ok" points="86,33 86,47 74,40"/>
${V.ic('file',190,46,30,'ic-ok')}<text class="t-s" x="226" y="68">HTML only</text>
<rect class="bx-dark" x="10" y="80" width="262" height="96" rx="8"/>
<text class="t-term t-dim" x="30" y="108" style="font-size:14px">&lt;?php</text>
<text class="t-term t-dim" x="30" y="134" style="font-size:14px">$name = "Ada";</text>
<text class="t-term t-dim" x="30" y="160" style="font-size:14px">echo "&lt;h1&gt;Hi, $name&lt;/h1&gt;";</text>
<text class="t-s" x="286" y="98">Memory</text><rect class="ln-d" x="284" y="106" width="126" height="70" rx="6"/>
<text class="t-s" x="347" y="146" text-anchor="middle">emptied</text>
<text class="t-s" x="10" y="200">Output:</text><text class="t-m t-ok" x="70" y="200" style="font-size:15px">&lt;h1&gt;Hi, Ada&lt;/h1&gt;</text>
</svg>`],
 ['Your browser draws the heading. If you choose "View source" you will find <b>no PHP at all</b>, only the HTML it produced.',`<svg viewBox="0 0 420 210" role="img" aria-label="The browser shows the heading Hi, Ada">
${V.ic('laptop',10,8,56,'ic-info')}${V.ic('server',354,8,56,'ic-a')}
<rect class="bx-info" x="10" y="80" width="400" height="96" rx="8"/>
<rect class="bx" x="10" y="80" width="400" height="22" rx="8"/>
<circle class="dot" cx="26" cy="91" r="4"/><circle class="dot" cx="40" cy="91" r="4"/><circle class="dot" cx="54" cy="91" r="4"/>
<text class="t-s" x="76" y="96">yoursite.com/hello.php</text>
<text class="t-b" x="30" y="150" style="font-size:30px">Hi, Ada</text>
<text class="t-s" x="10" y="200">Output:</text><text class="t-m t-ok" x="70" y="200" style="font-size:15px">&lt;h1&gt;Hi, Ada&lt;/h1&gt;</text>
</svg>`]])}
${V.rules(V.rh('Rules: break one and PHP stops with an error'),
 V.ok('&lt;?php','Code only runs after the opening tag'),V.no('echo "Hi"','Missing semicolon: "syntax error, unexpected ..."'),
 V.ok('hello.php','The file name must end in .php'),V.no('echo "Hi;','A quote opened must be closed'),
 V.rh('Conventions: what professionals do'),
 V.ok('// a note','Comments explain why; PHP ignores them'),V.ok('no closing ?&gt;','In a file that is only PHP, leave the closing tag off'))}
${V.hook(`The browser asks, PHP cooks, HTML comes out. The recipe never leaves the kitchen.`)}
`)}

${V.card(2,'Variables wear a $','name badges for your data',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="Three boxes on a shelf, each with a dollar name tag: $name holds Ada, $age holds 36, $price holds 9.99">
<path class="bx-a" d="M24 14H118L130 30 118 46H24Z"/><text class="t-m" x="74" y="37" text-anchor="middle" style="font-size:17px">$name</text>
<path class="bx-a" d="M160 14H248L260 30 248 46H160Z"/><text class="t-m" x="206" y="37" text-anchor="middle" style="font-size:17px">$age</text>
<path class="bx-a" d="M290 14H392L404 30 392 46H290Z"/><text class="t-m" x="342" y="37" text-anchor="middle" style="font-size:17px">$price</text>
<path class="ln-d" d="M74 46V70M206 46V70M342 46V70"/>
<rect class="bx-ok" x="20" y="70" width="112" height="76" rx="6"/><text class="t-m" x="76" y="116" text-anchor="middle" style="font-size:20px">"Ada"</text>
<rect class="bx-ok" x="152" y="70" width="112" height="76" rx="6"/><text class="t-m" x="208" y="116" text-anchor="middle" style="font-size:20px">36</text>
<rect class="bx-ok" x="286" y="70" width="112" height="76" rx="6"/><text class="t-m" x="342" y="116" text-anchor="middle" style="font-size:20px">9.99</text>
<path class="ln" style="stroke-width:4" d="M8 148H412"/>
<text class="t-s" x="76" y="174" text-anchor="middle">text (string)</text>
<text class="t-s" x="208" y="174" text-anchor="middle">whole number</text>
<text class="t-s" x="342" y="174" text-anchor="middle">decimal</text>
</svg><figcaption>A variable is a labelled box. In PHP every label starts with a dollar sign. You do not say what type of thing goes in: PHP works it out from the value.</figcaption></figure>
${V.like(`<p>A name badge at a party. The <b>$</b> is the badge that says "I am a variable". The word after it is the name, and the value is the person wearing it.</p>`)}
${V.why(`<p>PHP grew out of tools written in Perl and shell scripts, which marked variables with <code>$</code>. Keeping the badge lets PHP spot a variable instantly, even in the middle of text. That is exactly what makes <code>"Hi, $name"</code> work.</p>`)}
${V.anat([[1,'$'],[2,'name'],' ',[3,'='],' ',[4,'"Ada"'],[5,';']],[
 '<b>Dollar sign.</b> Every variable starts with it, every time you use it, not just the first time.',
 '<b>Name.</b> Starts with a letter or underscore, then letters, digits or underscores.',
 '<b>Assignment.</b> <code>=</code> means "put into". Read it right to left: put "Ada" into $name.',
 '<b>Value.</b> Text in quotes, a number like <code>36</code> or <code>9.99</code>, <code>true</code> or <code>false</code>.',
 '<b>Semicolon.</b> Ends the statement.'])}
${V.rules(V.rh('Rules: break one and it will not run'),
 V.no('name = "Ada";','Forgot the $: PHP thinks name is a constant'),V.ok('$name = "Ada";','Badge on, every time'),
 V.no('$1st','A name cannot start with a digit'),V.ok('$first1','Digits are fine later on'),
 V.no('$first name','No spaces'),V.no('$user-age','A hyphen means minus'),
 V.ok('$Name vs $name','Capitals matter: two different boxes'),
 V.rh('Conventions'),
 V.ok('$firstName','camelCase: most modern PHP code, including Laravel'),V.ok('$first_name','snake_case: common in older code like WordPress. Pick one per project'),
 V.no('$x, $data2','Vague names: say what the box holds'))}
${V.build(`<ol><li>Open the editor. The <code>&lt;?php</code> tag is already there.</li><li>Make two boxes: <code>$name</code> holding the text Ada and <code>$age</code> holding the number 36. Text needs quotes, numbers do not.</li><li>Print one of them with <code>echo $name;</code> and press Run.</li><li>Do some maths: <code>$total = $price * $qty;</code>. The star means multiply.</li></ol>`)}
${V.hook(`No dollar, no variable. <code>$</code> on the badge, <code>=</code> puts it in, <code>;</code> closes the deal.`)}
`)}

${V.card(3,'Joining text','dots, double quotes and single quotes',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Three pieces, Hi comma, dollar name and an exclamation mark, are glued by dots into Hi, Ada!">
<rect class="bx-info" x="10" y="16" width="96" height="46" rx="8"/><text class="t-m" x="58" y="46" text-anchor="middle" style="font-size:17px">"Hi, "</text>
<circle class="bx-a" cx="126" cy="39" r="12"/><text class="t-b" x="126" y="45" text-anchor="middle" style="font-size:20px">.</text>
<rect class="bx-ok" x="146" y="16" width="96" height="46" rx="8"/><text class="t-m" x="194" y="46" text-anchor="middle" style="font-size:17px">$name</text>
<circle class="bx-a" cx="262" cy="39" r="12"/><text class="t-b" x="262" y="45" text-anchor="middle" style="font-size:20px">.</text>
<rect class="bx-info" x="282" y="16" width="70" height="46" rx="8"/><text class="t-m" x="317" y="46" text-anchor="middle" style="font-size:17px">"!"</text>
<path class="ln-a" d="M210 70V98"/><polygon class="ah-a" points="203,96 217,96 210,108"/>
<rect class="bx-ok" x="110" y="112" width="200" height="48" rx="8"/><text class="t-m" x="210" y="143" text-anchor="middle" style="font-size:20px">Hi, Ada!</text>
</svg><figcaption>The dot is PHP's glue. It sticks pieces of text together into one longer string, in order, left to right.</figcaption></figure>
${V.like(`<p>A <b>double-quoted</b> string is a form with blanks: PHP fills in every <code>$name</code> it finds. A <b>single-quoted</b> string is a photocopy: what you wrote is exactly what you get, dollar sign and all.</p>`)}
${V.anat([[1,'"'],[2,'Hi, '],[3,'$name'],[2,'!'],[4,'\\n'],[1,'"']],[
 '<b>Double quotes.</b> Switch on "fill in the blanks" mode.',
 '<b>Plain text.</b> Printed exactly as written.',
 '<b>A variable.</b> Replaced by its value. This is called <b>interpolation</b>.',
 '<b>Escape code.</b> <code>\\n</code> means new line. It only works inside double quotes.'])}
${V.steps([
 ['PHP reads <b>echo "Hi, " . $name . "!";</b> and sees three pieces joined by two dots.',`<svg viewBox="0 0 420 150" role="img" aria-label="Three separate pieces">
<text class="t-m" x="10" y="28" style="font-size:15px">echo "Hi, " . $name . "!";</text>
<rect class="bx-info" x="10" y="52" width="110" height="44" rx="6"/><text class="t-m" x="65" y="80" text-anchor="middle" style="font-size:17px">"Hi, "</text>
<rect class="bx" x="150" y="52" width="110" height="44" rx="6"/><text class="t-m" x="205" y="80" text-anchor="middle" style="font-size:17px">$name</text>
<rect class="bx-info" x="290" y="52" width="110" height="44" rx="6"/><text class="t-m" x="345" y="80" text-anchor="middle" style="font-size:17px">"!"</text>
</svg>`],
 ['It looks up <b>$name</b> in memory and finds <b>Ada</b>.',`<svg viewBox="0 0 420 150" role="img" aria-label="name is replaced by Ada">
<text class="t-m" x="10" y="28" style="font-size:15px">echo "Hi, " . $name . "!";</text>
<rect class="bx-info" x="10" y="52" width="110" height="44" rx="6"/><text class="t-m" x="65" y="80" text-anchor="middle" style="font-size:17px">"Hi, "</text>
<rect class="bx-hl" x="150" y="52" width="110" height="44" rx="6"/><text class="t-m" x="205" y="80" text-anchor="middle" style="font-size:17px">"Ada"</text>
<rect class="bx-info" x="290" y="52" width="110" height="44" rx="6"/><text class="t-m" x="345" y="80" text-anchor="middle" style="font-size:17px">"!"</text>
<text class="t-s" x="205" y="122" text-anchor="middle">$name holds "Ada"</text>
</svg>`],
 ['The dots glue the pieces into one string, <b>"Hi, Ada!"</b>.',`<svg viewBox="0 0 420 150" role="img" aria-label="Glued into Hi, Ada!">
<text class="t-m" x="10" y="28" style="font-size:15px">echo "Hi, " . $name . "!";</text>
<rect class="bx-ok" x="10" y="52" width="390" height="44" rx="6"/><text class="t-m" x="205" y="80" text-anchor="middle" style="font-size:19px">"Hi, Ada!"</text>
</svg>`],
 ['<b>echo</b> prints it. Swap the dots for double quotes, <b>echo "Hi, $name!";</b>, and you get the same result in one piece.',`<svg viewBox="0 0 420 150" role="img" aria-label="Output Hi, Ada!">
<text class="t-m" x="10" y="28" style="font-size:15px">echo "Hi, " . $name . "!";</text>
<rect class="bx-dark" x="10" y="52" width="390" height="44" rx="6"/><text class="t-term" x="26" y="80" style="font-size:17px">Hi, Ada!</text>
<text class="t-m" x="10" y="130" style="font-size:15px">echo "Hi, $name!";  <tspan class="t-ok">same output</tspan></text>
</svg>`]])}
<p><b>Built-in helpers.</b> PHP comes with thousands of ready-made functions. Two for text: <code>strlen("Ada")</code> counts characters and gives 3, and <code>strtoupper("ada")</code> gives <code>ADA</code>. You can glue their results with dots too.</p>
${V.rules(V.rh('Rules'),
 V.no('echo \'Hi, $name\';','Single quotes print $name literally'),V.ok('echo "Hi, $name";','Double quotes fill it in: Hi, Ada'),
 V.no('"Hi, " + $name','+ is only for numbers: TypeError'),V.ok('"Hi, " . $name','The dot joins text'),
 V.no('\'Bye\\n\'','In single quotes \\n is just a backslash and an n'),
 V.rh('Conventions'),
 V.ok('\'plain text\'','Single quotes when there is nothing to fill in'),V.ok('"{$user} wins"','Curly braces make the variable\'s edges clear'))}
${V.hook(`Double quotes fill the blanks, single quotes take a photo. Dots glue, plus adds.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What does <code>echo 'Cost: $price';</code> print? <i>Cost: $price, exactly as written.</i> 2. Where does PHP code run: on the server or in the browser? <i>On the server. The browser only gets the output.</i> 3. What is <code>strlen("Hello")</code>? <i>5.</i></div>
`);

explain('hb2',`
<p>Every app you use is doing three things over and over: making <b>decisions</b> (is the password right?), <b>repeating</b> (show every message) and <b>reusing</b> named steps (work out the price). Learn these three in PHP and you can read the logic of almost any program.</p>

${V.card(1,'Decisions','if, elseif, else: a signpost',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A signpost with three signs: over 25 degrees T-shirt, over 15 degrees jumper, otherwise coat">
<rect class="bx-dark" x="200" y="20" width="14" height="170" rx="3"/>
<path class="bx-ok" d="M214 24H372L398 46 372 68H214Z"/><text class="t-b" x="226" y="52" style="font-size:16px">over 25: T-shirt</text>
<path class="bx-info" d="M200 80H48L22 102 48 124H200Z"/><text class="t-b" x="190" y="108" text-anchor="end" style="font-size:16px">over 15: jumper</text>
<path class="bx-warn" d="M214 136H340L366 158 340 180H214Z"/><text class="t-b" x="226" y="164" style="font-size:16px">else: coat</text>
${V.ic('person',94,136,52,'ic-a')}
</svg><figcaption>PHP reads the signs from the top. It follows the first one whose question is true and ignores the rest. If none match, it takes the else sign.</figcaption></figure>
${V.like(`<p>Getting dressed in the morning. You check the weather once and ask, in order: is it hot? Is it mild? Otherwise, wear a coat. You only put on <b>one</b> outfit.</p>`)}
${V.why(`<p>A program that does the same thing every time is a poster. Real software must react: show an error if the password is wrong, give free delivery over £50. Every language since the 1950s has had some form of <code>if</code>, because without it a computer cannot choose.</p>`)}
${V.anat([[1,'if'],' ',[2,'($temp &gt; 25)'],' ',[3,'{ echo "T-shirt"; }'],'\n',[4,'elseif'],' ($temp &gt; 15) { ... }\n',[5,'else'],' { echo "Coat"; }'],[
 '<b>if</b> asks the first question.',
 '<b>Condition</b>, always in round brackets. It must end up <code>true</code> or <code>false</code>.',
 '<b>Block.</b> The curly braces hold the code for this branch.',
 '<b>elseif</b> (one word) asks another question, only if the earlier ones were false.',
 '<b>else</b> catches everything left over. It has no condition.'])}
${V.steps([
 ['<b>$temp</b> is 18. PHP asks the first question: is 18 greater than 25? <b>No</b>, so it skips that block.',`<svg viewBox="0 0 420 196" role="img" aria-label="18 greater than 25 is false">
<text class="t-m" x="10" y="22" style="font-size:16px">$temp = 18;</text>
<rect class="bx-hl" x="10" y="38" width="204" height="44" rx="6"/><text class="t-m" x="20" y="66" style="font-size:14px">if ($temp &gt; 25)</text>
<rect class="bx" x="10" y="92" width="204" height="44" rx="6"/><text class="t-m" x="20" y="120" style="font-size:14px">elseif ($temp &gt; 15)</text>
<rect class="bx" x="10" y="146" width="204" height="44" rx="6"/><text class="t-m" x="20" y="174" style="font-size:14px">else</text>
<text class="t-b t-bad" x="226" y="58">false</text>${V.ic('cross',226,62,22,'ic-bad')}
<rect class="bx" x="290" y="38" width="120" height="44" rx="6"/><text class="t" x="350" y="66" text-anchor="middle">T-shirt</text>
<rect class="bx" x="290" y="92" width="120" height="44" rx="6"/><text class="t" x="350" y="120" text-anchor="middle">Jumper</text>
<rect class="bx" x="290" y="146" width="120" height="44" rx="6"/><text class="t" x="350" y="174" text-anchor="middle">Coat</text>
</svg>`],
 ['Next question: is 18 greater than 15? <b>Yes</b>. PHP runs this block and prints <b>Jumper</b>.',`<svg viewBox="0 0 420 196" role="img" aria-label="18 greater than 15 is true, prints Jumper">
<text class="t-m" x="10" y="22" style="font-size:16px">$temp = 18;</text>
<rect class="bx" x="10" y="38" width="204" height="44" rx="6"/><text class="t-m t-dim" x="20" y="66" style="font-size:14px">if ($temp &gt; 25)</text>
<rect class="bx-hl" x="10" y="92" width="204" height="44" rx="6"/><text class="t-m" x="20" y="120" style="font-size:14px">elseif ($temp &gt; 15)</text>
<rect class="bx" x="10" y="146" width="204" height="44" rx="6"/><text class="t-m" x="20" y="174" style="font-size:14px">else</text>
<text class="t-b t-ok" x="226" y="104">true</text><path class="ln-ok" d="M226 114H276"/><polygon class="ah-ok" points="274,107 274,121 286,114"/>
<rect class="bx" x="290" y="38" width="120" height="44" rx="6"/><text class="t t-dim" x="350" y="66" text-anchor="middle">T-shirt</text>
<rect class="bx-ok" x="290" y="92" width="120" height="44" rx="6"/><text class="t-b" x="350" y="120" text-anchor="middle">Jumper</text>
<rect class="bx" x="290" y="146" width="120" height="44" rx="6"/><text class="t" x="350" y="174" text-anchor="middle">Coat</text>
</svg>`],
 ['A branch has run, so PHP <b>skips everything else</b> in the chain, including else. One outfit, never two.',`<svg viewBox="0 0 420 196" role="img" aria-label="else is skipped">
<text class="t-m" x="10" y="22" style="font-size:16px">$temp = 18;</text>
<rect class="bx" x="10" y="38" width="204" height="44" rx="6"/><text class="t-m t-dim" x="20" y="66" style="font-size:14px">if ($temp &gt; 25)</text>
<rect class="bx" x="10" y="92" width="204" height="44" rx="6"/><text class="t-m" x="20" y="120" style="font-size:14px">elseif ($temp &gt; 15)</text>
<rect class="bx" x="10" y="146" width="204" height="44" rx="6"/><text class="t-m t-dim" x="20" y="174" style="font-size:14px">else</text>
<text class="t-s" x="226" y="174">skipped</text>
<rect class="bx" x="290" y="38" width="120" height="44" rx="6"/><text class="t t-dim" x="350" y="66" text-anchor="middle">T-shirt</text>
<rect class="bx-ok" x="290" y="92" width="120" height="44" rx="6"/><text class="t-b" x="350" y="120" text-anchor="middle">Jumper</text>
<rect class="bx" x="290" y="146" width="120" height="44" rx="6"/><text class="t t-dim" x="350" y="174" text-anchor="middle">Coat</text>
</svg>`]])}
${V.rules(V.rh('Rules: compare, do not store'),
 V.no('if ($age = 18)','One = PUTS 18 into $age, and the test is always true'),V.ok('if ($age === 18)','Three = compares value and type'),
 V.no('"5" == 5','Two = bends the types: this is true. Surprises follow'),V.ok('$score &gt;= 90','At least 90: the 90 itself counts'),
 V.no('if $temp &gt; 25 {','The condition needs round brackets'),
 V.rh('Conventions'),
 V.ok('elseif','One word is the PHP style (else if also works)'),V.ok('{ } always','Use braces even for one line; adding a second line is then safe'),
 V.ok('highest first','Check 90 before 80, or 95 would get a B'))}
${V.hook(`Top to bottom, first true wins, the rest are skipped. <code>=</code> stores, <code>===</code> compares.`)}
`)}

${V.card(2,'Loops','for counts, foreach walks the list',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="A conveyor belt carries bread, milk and eggs past a robot that prints a line for each one">
<rect class="bx" x="10" y="86" width="400" height="22" rx="11"/>
<circle class="dot" cx="30" cy="97" r="5"/><circle class="dot" cx="390" cy="97" r="5"/>
<rect class="bx-info" x="34" y="32" width="96" height="52" rx="6"/><text class="t-m" x="82" y="64" text-anchor="middle" style="font-size:17px">bread</text>
<rect class="bx-info" x="140" y="32" width="96" height="52" rx="6"/><text class="t-m" x="188" y="64" text-anchor="middle" style="font-size:17px">milk</text>
<rect class="bx-warn" x="246" y="32" width="96" height="52" rx="6"/><text class="t-m" x="294" y="64" text-anchor="middle" style="font-size:17px">eggs</text>
${V.ic('robot',350,20,56,'ic-a')}
<text class="t-m" x="34" y="138" style="font-size:16px">foreach ($items as $item)</text>
<text class="t-s" x="34" y="164">one turn per item, in order, then stop</text>
</svg><figcaption>foreach is a conveyor belt. Each turn, the next item lands in $item and the loop body runs once with it. When the belt is empty, the loop ends by itself.</figcaption></figure>
${V.like(`<p><b>foreach</b> is a conveyor belt at a till: every item goes past the scanner exactly once. <b>for</b> is laps of a running track: start at lap 1, keep going while you are under the target, add one lap each time round.</p>`)}
${V.why(`<p>Computers are brilliant at doing the same job thousands of times without getting bored. Writing <code>echo</code> once per item would be endless, and would break the moment the list changed size. A loop writes the job once and repeats it.</p>`)}
${V.anat([[1,'for'],' (',[2,'$i = 1'],'; ',[3,'$i &lt;= $n'],'; ',[4,'$i++'],') { ... }'],[
 '<b>for</b> starts a counting loop.',
 '<b>Start.</b> Runs once, before the first lap: the counter $i begins at 1.',
 '<b>Keep going while.</b> Checked before every lap. False means stop.',
 '<b>After each lap.</b> <code>$i++</code> means "add 1 to $i".'])}
${V.steps([
 ['<b>sumTo(3)</b> starts. The running total begins at 0 and the counter <b>$i</b> starts at 1.',`<svg viewBox="0 0 420 170" role="img" aria-label="total 0, i 1">
<rect class="bx-dark" x="6" y="8" width="262" height="124" rx="8"/>
<text class="t-a" x="10" y="38" style="font-size:14px">&#9654;</text><text class="t-term" x="26" y="38" style="font-size:14px">$total = 0;</text>
<text class="t-term t-dim" x="26" y="66" style="font-size:14px">for ($i=1; $i&lt;=3; $i++) {</text>
<text class="t-term t-dim" x="50" y="94" style="font-size:14px">$total += $i;</text>
<text class="t-term t-dim" x="26" y="122" style="font-size:14px">}</text>
<text class="t-m" x="282" y="34">$i</text><rect class="bx-info" x="330" y="12" width="80" height="34" rx="6"/><text class="t-m" x="370" y="36" text-anchor="middle" style="font-size:18px">1</text>
<text class="t-m" x="282" y="84">$total</text><rect class="bx-ok" x="342" y="62" width="68" height="34" rx="6"/><text class="t-m" x="376" y="86" text-anchor="middle" style="font-size:18px">0</text>
</svg>`],
 ['Lap 1: is 1 &amp;lt;= 3? Yes. <b>$total += $i</b> adds 1, so total is <b>1</b>. Then $i++ makes $i 2.',`<svg viewBox="0 0 420 170" role="img" aria-label="lap 1, total 1">
<rect class="bx-dark" x="6" y="8" width="262" height="124" rx="8"/>
<text class="t-term t-dim" x="26" y="38" style="font-size:14px">$total = 0;</text>
<text class="t-term t-dim" x="26" y="66" style="font-size:14px">for ($i=1; $i&lt;=3; $i++) {</text>
<text class="t-a" x="10" y="94" style="font-size:14px">&#9654;</text><text class="t-term" x="50" y="94" style="font-size:14px">$total += $i;</text>
<text class="t-term t-dim" x="26" y="122" style="font-size:14px">}</text>
<text class="t-m" x="282" y="34">$i</text><rect class="bx-info" x="330" y="12" width="80" height="34" rx="6"/><text class="t-m" x="370" y="36" text-anchor="middle" style="font-size:18px">1</text>
<text class="t-m" x="282" y="84">$total</text><rect class="bx-ok" x="342" y="62" width="68" height="34" rx="6"/><text class="t-m" x="376" y="86" text-anchor="middle" style="font-size:18px">1</text>
<text class="t-s" x="10" y="160">1 &lt;= 3 is true. total = 0 + 1 = 1</text>
</svg>`],
 ['Lap 2: is 2 &amp;lt;= 3? Yes. Total becomes 1 + 2 = <b>3</b>, and $i becomes 3.',`<svg viewBox="0 0 420 170" role="img" aria-label="lap 2, total 3">
<rect class="bx-dark" x="6" y="8" width="262" height="124" rx="8"/>
<text class="t-term t-dim" x="26" y="38" style="font-size:14px">$total = 0;</text>
<text class="t-term t-dim" x="26" y="66" style="font-size:14px">for ($i=1; $i&lt;=3; $i++) {</text>
<text class="t-a" x="10" y="94" style="font-size:14px">&#9654;</text><text class="t-term" x="50" y="94" style="font-size:14px">$total += $i;</text>
<text class="t-term t-dim" x="26" y="122" style="font-size:14px">}</text>
<text class="t-m" x="282" y="34">$i</text><rect class="bx-info" x="330" y="12" width="80" height="34" rx="6"/><text class="t-m" x="370" y="36" text-anchor="middle" style="font-size:18px">2</text>
<text class="t-m" x="282" y="84">$total</text><rect class="bx-ok" x="342" y="62" width="68" height="34" rx="6"/><text class="t-m" x="376" y="86" text-anchor="middle" style="font-size:18px">3</text>
<text class="t-s" x="10" y="160">2 &lt;= 3 is true. total = 1 + 2 = 3</text>
</svg>`],
 ['Lap 3: is 3 &amp;lt;= 3? Yes, because &amp;lt;= includes 3 itself. Total becomes 3 + 3 = <b>6</b>, and $i becomes 4.',`<svg viewBox="0 0 420 170" role="img" aria-label="lap 3, total 6">
<rect class="bx-dark" x="6" y="8" width="262" height="124" rx="8"/>
<text class="t-term t-dim" x="26" y="38" style="font-size:14px">$total = 0;</text>
<text class="t-term t-dim" x="26" y="66" style="font-size:14px">for ($i=1; $i&lt;=3; $i++) {</text>
<text class="t-a" x="10" y="94" style="font-size:14px">&#9654;</text><text class="t-term" x="50" y="94" style="font-size:14px">$total += $i;</text>
<text class="t-term t-dim" x="26" y="122" style="font-size:14px">}</text>
<text class="t-m" x="282" y="34">$i</text><rect class="bx-info" x="330" y="12" width="80" height="34" rx="6"/><text class="t-m" x="370" y="36" text-anchor="middle" style="font-size:18px">3</text>
<text class="t-m" x="282" y="84">$total</text><rect class="bx-ok" x="342" y="62" width="68" height="34" rx="6"/><text class="t-m" x="376" y="86" text-anchor="middle" style="font-size:18px">6</text>
<text class="t-s" x="10" y="160">3 &lt;= 3 is true. total = 3 + 3 = 6</text>
</svg>`],
 ['Check again: is 4 &amp;lt;= 3? <b>No</b>. The loop stops and the function returns <b>6</b> (1 + 2 + 3).',`<svg viewBox="0 0 420 170" role="img" aria-label="4 is not less or equal 3, loop ends, total 6">
<rect class="bx-dark" x="6" y="8" width="262" height="124" rx="8"/>
<text class="t-term t-dim" x="26" y="38" style="font-size:14px">$total = 0;</text>
<text class="t-a" x="10" y="66" style="font-size:14px">&#9654;</text><text class="t-term" x="26" y="66" style="font-size:14px">for ($i=1; $i&lt;=3; $i++) {</text>
<text class="t-term t-dim" x="50" y="94" style="font-size:14px">$total += $i;</text>
<text class="t-term t-dim" x="26" y="122" style="font-size:14px">}</text>
<text class="t-m" x="282" y="34">$i</text><rect class="bx-bad" x="330" y="12" width="80" height="34" rx="6"/><text class="t-m" x="370" y="36" text-anchor="middle" style="font-size:18px">4</text>
<text class="t-m" x="282" y="84">$total</text><rect class="bx-ok" x="342" y="62" width="68" height="34" rx="6"/><text class="t-m" x="376" y="86" text-anchor="middle" style="font-size:18px">6</text>
<text class="t-b t-bad" x="10" y="160">4 &lt;= 3 is false: stop. Answer: 6</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('foreach ($items as $item)','The list first, then the name for one item'),V.no('foreach ($item as $items)','Backwards: PHP tries to loop over a single string'),
 V.no('for ($i=1; $i&lt;=3; )','No $i++: the counter never moves and the loop never ends'),V.no('$i &lt; 3','Off by one: stops before 3 is added'),
 V.ok('count($items)','How many items the array holds'),
 V.rh('Conventions'),
 V.ok('$items / $item','Plural for the list, singular for one item'),V.ok('$i','A short counter name is fine for a simple for loop'))}
${V.hook(`foreach walks the belt; for runs laps. Start, check, do, add one, check again.`)}
`)}

${V.card(3,'Functions','a named machine with labelled slots',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="85, an int, goes into the grade machine and B, a string, comes out">
<circle class="bx-info" cx="48" cy="70" r="32"/><text class="t-m" x="48" y="78" text-anchor="middle" style="font-size:24px">85</text>
<text class="t-s" x="48" y="126" text-anchor="middle">int in</text>
<path class="ln-a" d="M84 70H136"/><polygon class="ah-a" points="134,63 134,77 146,70"/>
<rect class="bx-a" x="148" y="14" width="124" height="112" rx="10"/>${V.ic('machine',182,22,56,'ic-a')}
<text class="t-m" x="210" y="112" text-anchor="middle" style="font-size:17px">grade()</text>
<path class="ln-ok" d="M276 70H328"/><polygon class="ah-ok" points="326,63 326,77 338,70"/>
<circle class="bx-ok" cx="372" cy="70" r="32"/><text class="t-m" x="372" y="78" text-anchor="middle" style="font-size:24px">"B"</text>
<text class="t-s" x="372" y="126" text-anchor="middle">string out</text>
<text class="t-s" x="210" y="156" text-anchor="middle">The labels on the slots say what may go in and come out</text>
</svg><figcaption>A function is a machine with a name. The types are labels on its slots: this one only accepts a whole number and always hands back text.</figcaption></figure>
${V.like(`<p>A vending machine. The coin slot only takes coins (the <b>parameter type</b>), the tray only gives out snacks (the <b>return type</b>), and you can use it as many times as you like.</p>`)}
${V.why(`<p>Without functions you would copy the same grading code everywhere, and fixing a bug would mean fixing every copy. Types for numbers and text arrived in PHP 7 (2015) because people kept passing the wrong kind of value by accident. Now PHP checks for you.</p>`)}
${V.anat([[1,'function'],' ',[2,'grade'],'(',[3,'int $score'],')',[4,': string'],' {\n    ',[5,'return'],' \'B\';\n}'],[
 '<b>function</b>: "I am defining a machine". Nothing runs yet.',
 '<b>Name.</b> A verb or a clear noun: <code>grade</code>, <code>sumTo</code>, <code>area</code>.',
 '<b>Typed parameter.</b> A box that gets filled each call. Types: <code>int</code>, <code>float</code>, <code>string</code>, <code>bool</code>, <code>array</code>.',
 '<b>Return type.</b> What kind of value comes out.',
 '<b>return</b> hands the answer back and stops the function straight away.'])}
${V.rules(V.rh('Rules'),
 V.ok('return \'A\';','The caller gets the value'),V.no('echo \'A\';','Printing is not returning: the caller gets nothing back'),
 V.ok('grade(85)','Brackets make it run'),V.no('grade(\'high\')','Wrong type: PHP throws a TypeError'),
 V.rh('Conventions'),
 V.ok('sumTo, getTotal','camelCase verbs for function names'),V.ok('one job each','Small functions are easier to test and reuse'))}
${V.build(`<ol><li>Write the first line: <code>function grade(int $score): string {</code></li><li>Inside, use an if / elseif / else ladder, highest grade first, with a <code>return</code> in each branch.</li><li>For <code>sumTo</code>, start <code>$total</code> at 0, add each <code>$i</code> in a for loop, then return the total.</li><li>Print the shopping list with <code>foreach</code> and <code>"- $item\\n"</code>.</li><li>Finish with <code>count($items)</code> glued to <code>" items"</code>.</li></ol>`)}
${V.hook(`Define once, call often. Types on the slots, <code>return</code> out of the tray.`)}
`)}

<div class="try"><b>Try it in your head</b>1. With <code>$temp = 30</code>, which branch runs in the ladder above? <i>The first one: T-shirt.</i> 2. How many times does <code>for ($i = 1; $i &lt;= 5; $i++)</code> run? <i>5 times.</i> 3. What does <code>count(['a', 'b'])</code> give? <i>2.</i></div>
`);

explain('h1',`
<p>This is the PHP you will meet in every real job: typed functions that refuse bad input, arrays that act as both lists and labelled records, and short arrow functions that filter data in one line. Get these right and Laravel code stops looking like magic.</p>

${V.card(1,'Types and strict mode','a bouncer at the door',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="A bouncer guards a door marked int only. The number 5 walks in; the text 5 in quotes is turned away">
<rect class="bx-dark" x="330" y="18" width="80" height="150" rx="6"/>${V.ic('door',340,40,60,'ic-ok')}
<text class="t-term" x="370" y="156" text-anchor="middle" style="font-weight:700">int only</text>
${V.ic('shield',248,40,70,'ic-a')}<text class="t-b" x="283" y="132" text-anchor="middle">strict</text>
<circle class="bx-ok" cx="174" cy="56" r="28"/><text class="t-m" x="174" y="64" text-anchor="middle" style="font-size:22px">5</text>
<path class="ln-ok" d="M206 56H240"/><polygon class="ah-ok" points="238,49 238,63 250,56"/>
<text class="t-s" x="174" y="104" text-anchor="middle">int: let in</text>
<circle class="bx-bad" cx="60" cy="120" r="32"/><text class="t-m" x="60" y="128" text-anchor="middle" style="font-size:20px">"5"</text>
${V.ic('cross',94,96,30,'ic-bad')}
<text class="t-s" x="60" y="174" text-anchor="middle">string: turned away</text>
</svg><figcaption>With strict types on, a parameter marked int only accepts a real whole number. The text "5" looks like a number but is a string, so it is refused at the door.</figcaption></figure>
${V.like(`<p>A bouncer checking tickets. Without strict mode the bouncer squints at a hand-written "5" and lets it in as if it were a real ticket. With strict mode, only the genuine ticket gets through.</p>`)}
${V.why(`<p>PHP began as a relaxed language that converted values for you. That was handy for web forms, where everything arrives as text, but it hid bugs: <code>"5 apples"</code> could slip in as 5 with only a warning. PHP 7 added <code>declare(strict_types=1)</code> so teams could switch the guessing off. Most modern projects turn it on in every file.</p>`)}
${V.anat([[1,'declare(strict_types=1);'],'\n\n',[2,'function'],' add(',[3,'int'],' $a, int $b)',[4,': int'],' {\n    return $a + $b;\n}'],[
 '<b>Strict mode.</b> Must be the very first statement in the file. It applies to calls made from that file.',
 '<b>function</b> starts the definition.',
 '<b>Parameter type.</b> Common types: <code>int</code> (whole number), <code>float</code> (decimal), <code>string</code> (text), <code>bool</code> (true/false), <code>array</code>.',
 '<b>Return type.</b> PHP checks the value you return matches it.'])}
${V.steps([
 ['Someone calls <b>add("2", 3)</b>. The first value is a <b>string</b> (text in quotes), but $a is labelled <b>int</b>.',`<svg viewBox="0 0 420 192" role="img" aria-label="add is called with the string 2 and the int 3">
<text class="t-m" x="10" y="26" style="font-size:17px">add("2", 3)</text>
<text class="t-m" x="10" y="80">$a</text><rect class="bx-warn" x="44" y="56" width="100" height="38" rx="6"/><text class="t-m" x="94" y="81" text-anchor="middle" style="font-size:18px">"2"</text>
<text class="t-s" x="154" y="80">wants int, got string</text>
<text class="t-m" x="10" y="130">$b</text><rect class="bx-ok" x="44" y="106" width="100" height="38" rx="6"/><text class="t-m" x="94" y="131" text-anchor="middle" style="font-size:18px">3</text>
<text class="t-s" x="154" y="130">int: fine</text>
</svg>`],
 ['<b>Without</b> strict mode, PHP quietly converts "2" into the number 2 and returns 5. It works, but the mistake that sent text is now hidden.',`<svg viewBox="0 0 420 192" role="img" aria-label="Without strict types, 2 is converted and the result is 5">
<text class="t-m" x="10" y="26" style="font-size:17px">add("2", 3)</text>
<text class="t-m" x="10" y="80">$a</text><rect class="bx-warn" x="44" y="56" width="100" height="38" rx="6"/><text class="t-m t-dim" x="94" y="81" text-anchor="middle" style="font-size:18px">"2"</text>
<text class="t-warn" x="156" y="81" style="font-size:16px">&#10140;</text><rect class="bx-ok" x="180" y="56" width="70" height="38" rx="6"/><text class="t-m" x="215" y="81" text-anchor="middle" style="font-size:18px">2</text>
<text class="t-m" x="10" y="130">$b</text><rect class="bx-ok" x="44" y="106" width="100" height="38" rx="6"/><text class="t-m" x="94" y="131" text-anchor="middle" style="font-size:18px">3</text>
<text class="t-b t-warn" x="270" y="81">quietly changed</text>
<text class="t-b" x="10" y="164" style="font-size:17px">returns 5</text>
</svg>`],
 ['<b>With</b> <b>declare(strict_types=1)</b> at the top, PHP refuses and throws a <b>TypeError</b>. The bug is caught on the exact line that caused it.',`<svg viewBox="0 0 420 192" role="img" aria-label="With strict types, a TypeError is thrown">
<text class="t-m" x="10" y="26" style="font-size:17px">add("2", 3)</text>
<text class="t-m" x="10" y="80">$a</text><rect class="bx-bad" x="44" y="56" width="100" height="38" rx="6"/><text class="t-m" x="94" y="81" text-anchor="middle" style="font-size:18px">"2"</text>
${V.ic('cross',154,58,34,'ic-bad')}
<text class="t-m" x="10" y="130">$b</text><rect class="bx-ok" x="44" y="106" width="100" height="38" rx="6"/><text class="t-m" x="94" y="131" text-anchor="middle" style="font-size:18px">3</text>
<text class="t-b t-bad" x="200" y="81">refused</text>
<text class="t-bad" x="10" y="166" style="font-size:14px">TypeError: add(): Argument #1 ($a)</text>
<text class="t-bad" x="10" y="186" style="font-size:14px">must be of type int, string given</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('declare(strict_types=1);','First statement in the file, right after &lt;?php'),V.no('echo "hi"; declare(...)','Anywhere else is a fatal error'),
 V.no('echo \'Hello, $name!\';','Single quotes never fill in variables'),V.ok('echo "Hello, $name!";','Double quotes interpolate'),
 V.ok('\'Total: \' . $total','The dot joins strings'),
 V.rh('Conventions'),
 V.ok('strict in every file','Laravel and Symfony teams usually require it'),V.ok('type every parameter','Types are free, checked documentation'))}
${V.hook(`Strict mode is a bouncer: a "5" in quotes is not a 5.`)}
`)}

${V.card(2,'Arrays','numbered lockers or labelled drawers',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Left: an indexed array, lockers 0 1 2 holding 72, 95, 88. Right: an associative array, drawers labelled name, role, city holding Ada, admin, London">
<text class="t-b" x="10" y="20">Indexed (a list)</text>
<rect class="bx" x="10" y="34" width="58" height="76" rx="6"/><text class="t-m" x="39" y="78" text-anchor="middle" style="font-size:18px">72</text>
<rect class="bx" x="72" y="34" width="58" height="76" rx="6"/><text class="t-m" x="101" y="78" text-anchor="middle" style="font-size:18px">95</text>
<rect class="bx" x="134" y="34" width="58" height="76" rx="6"/><text class="t-m" x="163" y="78" text-anchor="middle" style="font-size:18px">88</text>
<text class="t-b t-a" x="39" y="132" text-anchor="middle">[0]</text><text class="t-b t-a" x="101" y="132" text-anchor="middle">[1]</text><text class="t-b t-a" x="163" y="132" text-anchor="middle">[2]</text>
<text class="t-m" x="10" y="176" style="font-size:14px">[72, 95, 88]</text>
<path class="ln-d" d="M208 10V190"/>
<text class="t-b" x="222" y="20">Labelled (a map)</text>
<rect class="bx-info" x="222" y="34" width="188" height="30" rx="5"/><text class="t-s" x="232" y="54">name</text><text class="t-m" x="296" y="55">'Ada'</text>
<rect class="bx-info" x="222" y="68" width="188" height="30" rx="5"/><text class="t-s" x="232" y="88">role</text><text class="t-m" x="296" y="89">'admin'</text>
<rect class="bx-info" x="222" y="102" width="188" height="30" rx="5"/><text class="t-s" x="232" y="122">city</text><text class="t-m" x="296" y="123">'London'</text>
<text class="t-m" x="222" y="176" style="font-size:14px">['name' =&gt; 'Ada']</text>
</svg><figcaption>Both are PHP arrays. An indexed array numbers its slots from 0. An associative array lets you choose the labels, called keys.</figcaption></figure>
${V.like(`<p>An indexed array is a row of school lockers: you find things by number. An associative array is a filing cabinet with labelled drawers: you find things by name, like <code>$user['city']</code>.</p>`)}
${V.why(`<p>Most languages have two separate tools for this, such as lists and dictionaries. PHP has <b>one</b> array type that does both: under the hood it is an ordered map, so every slot has a key, and for a plain list PHP just picks the keys 0, 1, 2 for you.</p>`)}
${V.anat([[1,'$user'],' = ',[2,'['],[3,"'name'"],' ',[4,'=&gt;'],' ',[5,"'Ada'"],', \'role\' =&gt; \'admin\'',[2,']'],';'],[
 '<b>Variable</b> holding the whole array.',
 '<b>Square brackets</b> wrap the array.',
 '<b>Key.</b> The label. Usually a string in quotes, or a whole number.',
 '<b>Double arrow</b> <code>=&gt;</code> joins a key to its value. Not <code>:</code> and not <code>=</code>.',
 '<b>Value.</b> Anything: text, a number, even another array.'])}
${V.steps([
 ['<b>foreach ($user as $key =&gt; $value)</b> opens the first drawer. $key gets <b>name</b>, $value gets <b>Ada</b>, and the body prints a line.',`<svg viewBox="0 0 420 160" role="img" aria-label="First pass: key name, value Ada">
<rect class="bx-hl" x="10" y="14" width="160" height="38" rx="5"/><text class="t-s" x="20" y="38">name</text><text class="t-m" x="84" y="39">'Ada'</text>
<rect class="bx-info" x="10" y="60" width="160" height="38" rx="5"/><text class="t-s" x="20" y="84">role</text><text class="t-m" x="84" y="85">'admin'</text>
<rect class="bx-info" x="10" y="106" width="160" height="38" rx="5"/><text class="t-s" x="20" y="130">city</text><text class="t-m" x="84" y="131">'London'</text>
<text class="t-s" x="182" y="24">$key</text><rect class="bx-a" x="182" y="30" width="96" height="34" rx="5"/><text class="t-m" x="230" y="53" text-anchor="middle">'name'</text>
<text class="t-s" x="182" y="88">$value</text><rect class="bx-ok" x="182" y="94" width="96" height="34" rx="5"/><text class="t-m" x="230" y="117" text-anchor="middle">'Ada'</text>
<rect class="bx-dark" x="288" y="14" width="126" height="130" rx="6"/>
<text class="t-term" x="296" y="40" style="font-size:14px">name: Ada</text>
</svg>`],
 ['Second pass: the next drawer. $key is <b>role</b>, $value is <b>admin</b>.',`<svg viewBox="0 0 420 160" role="img" aria-label="Second pass: key role, value admin">
<rect class="bx-info" x="10" y="14" width="160" height="38" rx="5"/><text class="t-s" x="20" y="38">name</text><text class="t-m" x="84" y="39">'Ada'</text>
<rect class="bx-hl" x="10" y="60" width="160" height="38" rx="5"/><text class="t-s" x="20" y="84">role</text><text class="t-m" x="84" y="85">'admin'</text>
<rect class="bx-info" x="10" y="106" width="160" height="38" rx="5"/><text class="t-s" x="20" y="130">city</text><text class="t-m" x="84" y="131">'London'</text>
<text class="t-s" x="182" y="24">$key</text><rect class="bx-a" x="182" y="30" width="96" height="34" rx="5"/><text class="t-m" x="230" y="53" text-anchor="middle">'role'</text>
<text class="t-s" x="182" y="88">$value</text><rect class="bx-ok" x="182" y="94" width="96" height="34" rx="5"/><text class="t-m" x="230" y="117" text-anchor="middle">'admin'</text>
<rect class="bx-dark" x="288" y="14" width="126" height="130" rx="6"/>
<text class="t-term" x="296" y="40" style="font-size:14px">name: Ada</text>
<text class="t-term" x="296" y="64" style="font-size:14px">role: admin</text>
</svg>`],
 ['Last drawer: <b>city</b> and <b>London</b>. No drawers left, so the loop ends. Arrays keep their order, so the lines come out in the order you wrote them.',`<svg viewBox="0 0 420 160" role="img" aria-label="Third pass: key city, value London">
<rect class="bx-info" x="10" y="14" width="160" height="38" rx="5"/><text class="t-s" x="20" y="38">name</text><text class="t-m" x="84" y="39">'Ada'</text>
<rect class="bx-info" x="10" y="60" width="160" height="38" rx="5"/><text class="t-s" x="20" y="84">role</text><text class="t-m" x="84" y="85">'admin'</text>
<rect class="bx-hl" x="10" y="106" width="160" height="38" rx="5"/><text class="t-s" x="20" y="130">city</text><text class="t-m" x="84" y="131">'London'</text>
<text class="t-s" x="182" y="24">$key</text><rect class="bx-a" x="182" y="30" width="96" height="34" rx="5"/><text class="t-m" x="230" y="53" text-anchor="middle">'city'</text>
<text class="t-s" x="182" y="88">$value</text><rect class="bx-ok" x="182" y="94" width="96" height="34" rx="5"/><text class="t-m" x="230" y="117" text-anchor="middle">'London'</text>
<rect class="bx-dark" x="288" y="14" width="126" height="130" rx="6"/>
<text class="t-term" x="296" y="40" style="font-size:14px">name: Ada</text>
<text class="t-term" x="296" y="64" style="font-size:14px">role: admin</text>
<text class="t-term" x="296" y="88" style="font-size:14px">city: London</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('$scores[0]','Indexes start at 0, so this is the first item'),V.no('[\'name\': \'Ada\']','PHP uses =&gt;, not a colon'),
 V.no('$user[\'age\']','A key that does not exist: "Warning: Undefined array key"'),V.ok('$list[] = 42;','Empty brackets add to the end'),
 V.ok('foreach ($a as $k =&gt; $v)','Array first, then key =&gt; value'),
 V.rh('Conventions'),
 V.ok('\'first_name\'','Keys in snake_case, matching database columns'),V.ok('[1, 2, 3,]','A trailing comma is allowed and makes adding lines tidy'))}
${V.hook(`Lockers by number, drawers by name: one PHP array does both.`)}
`)}

${V.card(3,'Arrow functions and filtering','a sieve for your data',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Scores 72, 95, 88 and 61 pour into a sieve marked s at least 70. 72, 95 and 88 pass through; 61 is caught">
<circle class="bx" cx="60" cy="30" r="22"/><text class="t-m" x="60" y="37" text-anchor="middle" style="font-size:18px">72</text>
<circle class="bx" cx="160" cy="30" r="22"/><text class="t-m" x="160" y="37" text-anchor="middle" style="font-size:18px">95</text>
<circle class="bx" cx="260" cy="30" r="22"/><text class="t-m" x="260" y="37" text-anchor="middle" style="font-size:18px">88</text>
<circle class="bx-bad" cx="360" cy="30" r="22"/><text class="t-m" x="360" y="37" text-anchor="middle" style="font-size:18px">61</text>
<path class="bx-a" d="M20 64H400L330 112H90Z"/>
<text class="t-m" x="210" y="94" text-anchor="middle" style="font-size:16px">fn($s) =&gt; $s &gt;= 70</text>
${V.ic('cross',372,64,26,'ic-bad')}
<path class="ln-ok" d="M210 114V136"/><polygon class="ah-ok" points="203,134 217,134 210,146"/>
<rect class="bx-ok" x="110" y="150" width="200" height="40" rx="8"/><text class="t-m" x="210" y="177" text-anchor="middle" style="font-size:18px">72, 95, 88</text>
</svg><figcaption>array_filter tips every value into the sieve. The arrow function is the test: values where it says true fall through and are kept. 61 fails and is left behind.</figcaption></figure>
${V.like(`<p>A sieve in a kitchen. The holes are your rule. Everything is poured in, only what fits the rule comes out the bottom.</p>`)}
${V.why(`<p>Writing a loop, an if and a new array just to keep some values is a lot of typing for a simple idea. PHP 7.4 added <b>arrow functions</b>, tiny one-line functions you can hand to helpers like <code>array_filter</code> and <code>array_map</code>.</p>`)}
${V.anat([[1,'array_filter'],'(',[2,'$scores'],', ',[3,'fn($s)'],' ',[4,'=&gt;'],' ',[5,'$s &gt;= 70'],')'],[
 '<b>Helper.</b> Keeps the values for which your test returns true.',
 '<b>The input array.</b> It is not changed; you get a new array back.',
 '<b>fn and its parameter.</b> $s holds one score at a time.',
 '<b>Arrow.</b> "Gives back".',
 '<b>One expression</b> that is the answer. No braces, no return keyword.'])}
${V.rules(V.rh('Rules'),
 V.ok('fn($s) =&gt; $s &gt;= 70','Exactly one expression after the arrow'),V.no('fn($s) =&gt; { return ...; }','No braces in an arrow function; use function () { } for longer code'),
 V.no('array_sum($n) / count($n)','With an empty array this divides by zero: DivisionByZeroError'),V.ok('if (count($n) === 0) return 0.0;','Guard the empty case first'),
 V.ok('implode(\', \', $passed)','Joins array values into one string'),
 V.rh('Conventions'),
 V.ok('array_values(...)','array_filter keeps the old keys; this renumbers them 0, 1, 2'),V.ok('$passed, $scores','Name arrays in the plural'))}
${V.build(`<ol><li>Interpolate: put <code>$name</code> inside a double-quoted string.</li><li>For the average, add with <code>array_sum</code>, divide by <code>count</code>, and return 0.0 first if the array is empty.</li><li>Loop <code>$user</code> with <code>foreach ($user as $key =&gt; $value)</code> and print <code>"$key: $value\\n"</code>.</li><li>Fix <code>add()</code> to return <code>$a + $b</code>; strict mode does the type checking for you.</li><li>Filter with <code>fn($s) =&gt; $s &gt;= 70</code> and print the result with <code>implode</code>.</li></ol>`)}
${V.hook(`Pour it in, keep what passes: <code>array_filter</code> plus a one-line <code>fn</code>.`)}
`)}

<div class="try"><b>Try it in your head</b>1. In <code>['a', 'b', 'c']</code>, what is the key of 'c'? <i>2.</i> 2. With strict types on, what happens with <code>add(2.5, 1)</code> if both parameters are int? <i>A TypeError: a float is not an int.</i> 3. What does <code>array_filter([5, 80, 90], fn($x) =&gt; $x &gt; 50)</code> keep? <i>80 and 90.</i></div>
`);

explain('h2',`
<p>Laravel, Symfony and WordPress are built out of <b>classes</b>. Once you can read one, you can open any of their files and understand what you are looking at. This lesson builds a tiny shop catalogue the modern PHP 8 way.</p>

${V.card(1,'Classes and objects','a blueprint and the houses built from it',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="One blueprint labelled class Product. Arrows marked new lead to two houses: mug with price 10 and lamp with price 25">
<rect class="bx-info" x="10" y="20" width="150" height="150" rx="6"/>
<path class="ln-d" d="M10 70H160M10 120H160M60 20V170M110 20V170"/>
<path class="ln" style="stroke-width:3" d="M40 110L85 66 130 110V152H40Z"/>
<text class="t-m" x="85" y="190" text-anchor="middle" style="font-size:15px">class Product</text>
<path class="ln-a" d="M166 70 236 48"/><polygon class="ah-a" points="232,40 244,46 236,55"/>
<path class="ln-a" d="M166 120 236 142"/><polygon class="ah-a" points="236,135 244,145 232,150"/>
<text class="t-b t-a" x="190" y="102" style="font-size:16px">new</text>
${V.ic('house',248,6,74,'ic-ok')}<text class="t-m" x="330" y="38" style="font-size:15px">$mug</text><text class="t-s" x="330" y="60">'Mug', 10.0</text>
${V.ic('house',248,104,74,'ic-warn')}<text class="t-m" x="330" y="136" style="font-size:15px">$lamp</text><text class="t-s" x="330" y="158">'Lamp', 25.0</text>
</svg><figcaption>A class is the blueprint. Each object is a separate house built from it with new. They share the same design but hold their own values.</figcaption></figure>
${V.like(`<p>An architect draws <b>one</b> blueprint, and a builder can build a whole street of houses from it. You cannot live in a blueprint; you live in a house. In code, you cannot use a class's values directly; you use an <b>object</b> made from it.</p>`)}
${V.why(`<p>As programs grow, loose variables and functions turn into spaghetti. Object-oriented programming, popular since the 1980s, bundles data and the functions that use it into one unit. PHP gained proper classes in PHP 5 (2004), and PHP 8 made them much shorter to write.</p>`)}
${V.anat([[1,'$mug'],' = ',[2,'new'],' ',[3,'Product'],[4,"('Mug', 10.0)"],';\necho ',[1,'$mug'],[5,'-&gt;'],'name;'],[
 '<b>Variable</b> holding the finished object (the house).',
 '<b>new</b> means "build one now".',
 '<b>Class name.</b> Which blueprint to use.',
 '<b>Arguments</b> passed to the constructor, the setup method that runs once when the object is built.',
 '<b>Object arrow.</b> <code>-&gt;</code> reaches inside an object: a property (a value) or a method (a function).'])}
${V.steps([
 ['The class <b>Product</b> is only a plan. Nothing exists in memory yet.',`<svg viewBox="0 0 420 180" role="img" aria-label="Only the blueprint exists">
<rect class="bx-info" x="10" y="14" width="150" height="150" rx="6"/>
<text class="t-m" x="22" y="40" style="font-size:15px">Product</text>
<text class="t-s" x="22" y="70">name</text><text class="t-s" x="22" y="96">basePrice</text>
<text class="t-s" x="22" y="130">price()</text><text class="t-s" x="22" y="154">priceWithTax()</text>
<text class="t-s" x="206" y="40">Memory</text><rect class="ln-d" x="204" y="48" width="206" height="116" rx="8"/>
<text class="t-s" x="307" y="112" text-anchor="middle">empty</text>
</svg>`],
 ['<b>new Product(\'Mug\', 10.0)</b> builds a new object from the plan. The constructor runs and fills its properties.',`<svg viewBox="0 0 420 180" role="img" aria-label="An object is built and filled">
<rect class="bx-info" x="10" y="14" width="150" height="150" rx="6"/>
<text class="t-m" x="22" y="40" style="font-size:15px">Product</text>
<text class="t-s" x="22" y="70">name</text><text class="t-s" x="22" y="96">basePrice</text>
<text class="t-s" x="22" y="130">price()</text><text class="t-s" x="22" y="154">priceWithTax()</text>
<text class="t-s" x="206" y="40">Memory</text><rect class="bx-ok" x="204" y="48" width="206" height="116" rx="8"/>
<text class="t-s" x="216" y="82">name</text><text class="t-m" x="310" y="82">'Mug'</text>
<text class="t-s" x="216" y="114">basePrice</text><text class="t-m" x="310" y="114">10.0</text>
<path class="ln-a" d="M162 90H196"/><polygon class="ah-a" points="194,83 194,97 204,90"/>
</svg>`],
 ['The variable <b>$mug</b> now points at that object. Build another with different values and the two never mix.',`<svg viewBox="0 0 420 180" role="img" aria-label="mug points at the object">
<rect class="bx-info" x="10" y="14" width="150" height="150" rx="6"/>
<text class="t-m" x="22" y="40" style="font-size:15px">Product</text>
<text class="t-s" x="22" y="70">name</text><text class="t-s" x="22" y="96">basePrice</text>
<text class="t-s" x="22" y="130">price()</text><text class="t-s" x="22" y="154">priceWithTax()</text>
<text class="t-s" x="206" y="40">Memory</text><rect class="bx-ok" x="204" y="48" width="206" height="116" rx="8"/>
<text class="t-s" x="216" y="82">name</text><text class="t-m" x="310" y="82">'Mug'</text>
<text class="t-s" x="216" y="114">basePrice</text><text class="t-m" x="310" y="114">10.0</text>
<path class="bx-a" d="M300 132H390L402 146 390 160H300Z"/><text class="t-m" x="346" y="152" text-anchor="middle">$mug</text>
</svg>`],
 ['<b>$mug-&gt;priceWithTax()</b> runs the method on <b>this</b> object. Inside, <b>$this</b> means "the object I was called on", so it works out 10.0 × 1.2 = <b>12</b>.',`<svg viewBox="0 0 420 180" role="img" aria-label="priceWithTax returns 12">
<rect class="bx-info" x="10" y="14" width="150" height="150" rx="6"/>
<text class="t-m" x="22" y="40" style="font-size:15px">Product</text>
<text class="t-s" x="22" y="70">name</text><text class="t-s" x="22" y="96">basePrice</text>
<text class="t-s" x="22" y="130">price()</text><rect class="bx-hl" x="16" y="138" width="138" height="24" rx="4"/><text class="t-s" x="22" y="155">priceWithTax()</text>
<text class="t-s" x="206" y="40">Memory</text><rect class="bx-ok" x="204" y="48" width="206" height="116" rx="8"/>
<text class="t-s" x="216" y="82">name</text><text class="t-m" x="310" y="82">'Mug'</text>
<text class="t-s" x="216" y="114">basePrice</text><text class="t-m" x="310" y="114">10.0</text>
<path class="bx-a" d="M300 132H390L402 146 390 160H300Z"/><text class="t-m" x="346" y="152" text-anchor="middle">$mug</text>
<text class="t-b t-ok" x="216" y="152" style="font-size:18px">= 12</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('Product(\'Mug\', 10.0)','Without new, PHP looks for a function called Product'),V.ok('$mug-&gt;name','-&gt; for properties and methods'),
 V.no('$mug.name','The dot joins strings; it does not reach into objects'),V.ok('$this-&gt;basePrice','Inside a method, $this is the current object'),
 V.rh('Conventions'),
 V.ok('class Product','PascalCase: every word starts with a capital'),V.ok('Product.php','One class per file, named exactly like the class'),
 V.ok('priceWithTax()','Methods in camelCase, named after what they do'))}
${V.hook(`Class is the blueprint, object is the house, <code>new</code> is the builder, <code>-&gt;</code> is the front door.`)}
`)}

${V.card(2,'Constructor promotion and visibility','who is allowed in which room',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="A house in three zones: public front garden open to everyone, protected family rooms for the class and its children, private safe for the class only">
<rect class="bx-ok" x="10" y="40" width="130" height="120" rx="6"/>${V.ic('people',45,56,60,'ic-ok')}
<text class="t-b" x="75" y="138" text-anchor="middle">public</text><text class="t-s" x="75" y="28" text-anchor="middle">anyone</text>
<rect class="bx-info" x="146" y="40" width="130" height="120" rx="6"/>${V.ic('house',181,56,60,'ic-info')}
<text class="t-b" x="211" y="138" text-anchor="middle">protected</text><text class="t-s" x="211" y="28" text-anchor="middle">family (subclasses)</text>
<rect class="bx-bad" x="282" y="40" width="128" height="120" rx="6"/>${V.ic('lock',316,56,60,'ic-bad')}
<text class="t-b" x="346" y="138" text-anchor="middle">private</text><text class="t-s" x="346" y="28" text-anchor="middle">this class only</text>
</svg><figcaption>Visibility decides who may touch a property or method. Keep things private unless the outside world genuinely needs them.</figcaption></figure>
${V.like(`<p>A house: anyone can walk through the <b>public</b> front garden, only family enter the <b>protected</b> rooms, and only the owner opens the <b>private</b> safe. The base price lives in the safe, so nobody outside can change it by accident.</p>`)}
${V.why(`<p>Before PHP 8, each property was written three times: declared, listed as a constructor parameter, then assigned with <code>$this-&gt;name = $name;</code>. <b>Constructor promotion</b> (PHP 8.0) does all three in one line.</p>`)}
${V.anat([[1,'public function __construct'],'(\n    ',[2,'public'],' ',[3,'string'],' ',[4,'$name'],',\n    ',[2,'private'],' float $basePrice,\n) {}'],[
 '<b>The constructor.</b> Two underscores. Runs automatically when <code>new</code> builds the object.',
 '<b>Visibility.</b> Writing it here turns the parameter into a property. That is the "promotion".',
 '<b>Type</b> of the property.',
 '<b>Name.</b> Becomes <code>$this-&gt;name</code> inside and <code>$mug-&gt;name</code> outside.'])}
${V.rules(V.rh('Rules'),
 V.no('$mug-&gt;basePrice','From outside: "Error: Cannot access private property"'),V.ok('$mug-&gt;price()','Expose a public method that reads it'),
 V.no('__construct(string $name)','No visibility word means no property is created'),V.no('_construct','One underscore is just an ordinary method'),
 V.rh('Conventions'),
 V.ok('private by default','Open things up only when needed'),V.ok('trailing comma','One parameter per line, comma after the last'))}
${V.hook(`Public garden, protected family room, private safe. Promotion writes it all in one line.`)}
`)}

${V.card(3,'Interfaces, inheritance and traits','contracts, family trees and toolkits',`
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Interface HasPrice is a contract. Product signs it and uses the HasSlug toolkit. DigitalProduct is a child of Product">
<rect class="bx-warn" x="10" y="14" width="150" height="62" rx="6"/>${V.ic('file',18,22,40,'ic-warn')}
<text class="t-m" x="64" y="40" style="font-size:14px">HasPrice</text><text class="t-s" x="64" y="62">price()</text>
<rect class="bx-info" x="260" y="14" width="150" height="62" rx="6"/>${V.ic('gear',268,22,40,'ic-info')}
<text class="t-m" x="314" y="40" style="font-size:14px">HasSlug</text><text class="t-s" x="314" y="62">slug()</text>
<rect class="bx-a" x="135" y="108" width="150" height="40" rx="6"/><text class="t-m" x="210" y="134" text-anchor="middle" style="font-size:16px">Product</text>
<path class="ln-d" d="M90 76 160 108"/><text class="t-s" x="34" y="100">implements</text>
<path class="ln-d" d="M330 76 260 108"/><text class="t-s" x="330" y="100">use</text>
<path class="ln" d="M210 172V150"/><polygon class="ah" points="203,156 217,156 210,146"/>
<rect class="bx-ok" x="110" y="172" width="200" height="34" rx="6"/><text class="t-m" x="210" y="195" text-anchor="middle" style="font-size:15px">DigitalProduct</text>
<text class="t-s" x="320" y="194">extends</text>
</svg><figcaption>An interface is a promise Product signs. A trait is a toolkit of methods copied in. A subclass extends Product, inheriting everything and changing what it needs.</figcaption></figure>
${V.like(`<p>An <b>interface</b> is a job advert: "must be able to give a price". A <b>subclass</b> is a child who inherits the family recipes and tweaks one. A <b>trait</b> is a sticker pack of skills you can stick on any class, even unrelated ones.</p>`)}
${V.why(`<p>PHP lets a class have only one parent, to avoid confusing family trees. Interfaces (since PHP 5) let unrelated classes promise the same methods, so code can accept "anything with a price()". Traits (PHP 5.4) were added so classes in different families could still share code.</p>`)}
${V.anat([[1,'class'],' DigitalProduct ',[2,'extends Product'],' ',[3,'implements HasPrice'],' {\n    ',[4,'use HasSlug;'],'\n}'],[
 '<b>class</b> and its name.',
 '<b>extends.</b> Inherit every method and property of one parent class.',
 '<b>implements.</b> Promise to provide every method the interface lists. A class can implement many.',
 '<b>use</b> inside the class pulls in a trait\'s methods.'])}
${V.steps([
 ['<b>$ebook-&gt;priceWithTax()</b>. PHP looks in <b>DigitalProduct</b> first and finds its own version, which skips tax. That is an <b>override</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="priceWithTax found in DigitalProduct">
<rect class="bx-a" x="10" y="14" width="190" height="70" rx="6"/><text class="t-m" x="20" y="36" style="font-size:14px">Product</text>
<text class="t-s" x="20" y="58">price()  priceWithTax()</text><text class="t-s" x="20" y="76">slug() from HasSlug</text>
<path class="ln" d="M105 112V88"/><polygon class="ah" points="98,94 112,94 105,84"/>
<rect class="bx-hl" x="10" y="112" width="190" height="46" rx="6"/><text class="t-m" x="20" y="132" style="font-size:14px">DigitalProduct</text><text class="t-s" x="20" y="152">priceWithTax()</text>
<text class="t-m" x="220" y="40" style="font-size:15px">$ebook-&gt;priceWithTax()</text>
<text class="t-b t-ok" x="220" y="140">found here: 15.0</text>
</svg>`],
 ['<b>$ebook-&gt;price()</b>. DigitalProduct has no price(), so PHP climbs to the parent, <b>Product</b>, and uses that one.',`<svg viewBox="0 0 420 170" role="img" aria-label="price found in Product">
<rect class="bx-hl" x="10" y="14" width="190" height="70" rx="6"/><text class="t-m" x="20" y="36" style="font-size:14px">Product</text>
<text class="t-s" x="20" y="58">price()  priceWithTax()</text><text class="t-s" x="20" y="76">slug() from HasSlug</text>
<path class="ln" d="M105 112V88"/><polygon class="ah" points="98,94 112,94 105,84"/>
<rect class="bx" x="10" y="112" width="190" height="46" rx="6"/><text class="t-m" x="20" y="132" style="font-size:14px">DigitalProduct</text><text class="t-s" x="20" y="152">priceWithTax()</text>
<text class="t-m" x="220" y="40" style="font-size:15px">$ebook-&gt;price()</text>
<text class="t-s" x="220" y="140">not in the child...</text>
<text class="t-b t-ok" x="220" y="66">...found in parent</text>
</svg>`],
 ['<b>$ebook-&gt;slug()</b>. Product copied slug() in from the trait, so the child inherits it too and gets <b>php-ebook</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="slug found via the trait">
<rect class="bx" x="10" y="14" width="190" height="70" rx="6"/><text class="t-m" x="20" y="36" style="font-size:14px">Product</text>
<text class="t-s" x="20" y="58">price()  priceWithTax()</text><rect class="bx-hl" x="14" y="63" width="172" height="18" rx="3"/><text class="t-s" x="20" y="77">slug() from HasSlug</text>
<path class="ln" d="M105 112V88"/><polygon class="ah" points="98,94 112,94 105,84"/>
<rect class="bx" x="10" y="112" width="190" height="46" rx="6"/><text class="t-m" x="20" y="132" style="font-size:14px">DigitalProduct</text><text class="t-s" x="20" y="152">priceWithTax()</text>
<text class="t-m" x="220" y="40" style="font-size:15px">$ebook-&gt;slug()</text>
<text class="t-b t-ok" x="220" y="76">'php-ebook'</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('extends A, B','Only one parent class is allowed'),V.ok('implements A, B','Many interfaces are fine'),
 V.no('implements HasPrice, no price()','Missing a promised method is a fatal error'),V.ok('compatible override','An override must stay compatible with the parent method\'s parameters and return type'),
 V.rh('Conventions'),
 V.ok('HasPrice, Sluggable','Interface and trait names describe an ability'),V.ok('interfaces first','Type parameters with the interface, not a concrete class'))}
${V.hook(`Interface: a promise. extends: a family. Trait: a sticker pack.`)}
`)}

${V.card(4,'Enums','a dial with fixed positions',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A dial that can only point to Draft or Published. A typo like publishd is not on the dial">
<circle class="bx-info" cx="110" cy="96" r="64"/><path class="ln-a" style="stroke-width:5" d="M110 96 70 56"/><circle class="dot-m" cx="110" cy="96" r="7"/>
<text class="t-b" x="36" y="30">Draft</text><text class="t-b" x="140" y="30">Published</text>
<rect class="bx-bad" x="250" y="70" width="160" height="50" rx="8"/><text class="t-m" x="330" y="101" text-anchor="middle" style="font-size:17px">'publishd'</text>
${V.ic('cross',386,52,30,'ic-bad')}
<text class="t-s" x="330" y="148" text-anchor="middle">not a position: refused</text>
</svg><figcaption>An enum lists every value something is allowed to have. A typo cannot sneak in, because it is not on the dial.</figcaption></figure>
${V.like(`<p>A washing machine dial. It clicks to fixed settings and nothing in between. Compare that with a text box where someone types "publishd" and the bug hides for weeks.</p>`)}
${V.anat([[1,'enum'],' ',[2,'Status'],[3,': string'],' {\n    ',[4,'case Draft'],' = ',[5,"'draft'"],';\n    case Published = \'published\';\n}'],[
 '<b>enum</b> (PHP 8.1) starts the list.',
 '<b>Name</b>, in PascalCase like a class.',
 '<b>Backing type.</b> Each case also has a plain value, handy for databases.',
 '<b>A case.</b> Use it as <code>Status::Draft</code>.',
 '<b>Backing value.</b> Read it with <code>-&gt;value</code>.'])}
${V.rules(V.ok('Status::from(\'published\')','Turns stored text back into a case'),V.no('Status::from(\'deleted\')','Not a case: throws a ValueError'),
 V.ok('Status::tryFrom(\'deleted\')','Returns null instead of throwing'),V.ok('$p-&gt;status === Status::Draft','Compare cases with ==='))}
${V.build(`<ol><li>Write <code>class Product</code> with a promoted constructor: public name, private basePrice.</li><li>Add <code>price()</code> and <code>priceWithTax()</code>, using <code>round(..., 2)</code>.</li><li>Declare <code>interface HasPrice</code> and add <code>implements HasPrice</code>.</li><li>Write <code>trait HasSlug</code> with <code>strtolower</code> and <code>str_replace</code>, then <code>use HasSlug;</code>.</li><li>Add the enum and a promoted <code>Status $status = Status::Draft</code>.</li><li>Finish with <code>DigitalProduct extends Product</code> overriding <code>priceWithTax()</code>.</li></ol>`)}
${V.hook(`If the list of allowed values is fixed, make it an enum, not a string.`)}
`)}

<div class="try"><b>Try it in your head</b>1. How many objects does <code>new Product(...)</code> written twice create? <i>Two, each with its own values.</i> 2. Can code outside the class read a private property? <i>No, it throws an Error.</i> 3. How many classes can one class extend? <i>One, but it can implement many interfaces and use many traits.</i></div>
`);

explain('h3',`
<p>No professional writes everything from scratch. Logging, payments, emails, dates: someone has already built and tested them. <b>Composer</b> is how a PHP project borrows that code safely and finds every class it needs without a pile of <code>require</code> lines.</p>

${V.card(1,'Composer installs packages','a shopping list and a receipt',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="composer.json is a shopping list, a truck from Packagist delivers packages into the vendor folder, and composer.lock is the receipt with exact versions">
${V.ic('list',10,20,60,'ic-info')}<text class="t-m" x="60" y="104" text-anchor="middle" style="font-size:14px">composer.json</text>
<text class="t-s" x="60" y="124" text-anchor="middle">what you want</text>
${V.ic('globe',176,8,40,'ic-a')}<text class="t-s" x="222" y="34">Packagist</text>
${V.ic('truck',150,50,70,'ic-a')}
<path class="ln-a" d="M88 70H142"/><polygon class="ah-a" points="140,63 140,77 150,70"/>
<path class="ln-ok" d="M226 86H282"/><polygon class="ah-ok" points="280,79 280,93 292,86"/>
${V.ic('folder',300,40,76,'ic-ok')}<text class="t-m" x="338" y="134" text-anchor="middle" style="font-size:14px">vendor/</text>
${V.ic('file',146,124,40,'ic-warn')}<text class="t-m" x="192" y="146" style="font-size:14px">composer.lock</text>
<text class="t-s" x="192" y="168">exact versions</text>
</svg><figcaption>composer.json says what you need. Composer downloads it from Packagist, the public PHP package catalogue, into vendor/, and writes the exact versions it chose into composer.lock.</figcaption></figure>
${V.like(`<p><b>composer.json</b> is your shopping list ("milk, any brand from version 3"). <b>composer.lock</b> is the receipt: exactly which carton you got. Hand someone the receipt and they can buy the identical shopping.</p>`)}
${V.why(`<p>Before Composer arrived in 2012, PHP developers downloaded zip files by hand and copied them into projects. Versions drifted, updates were scary, and nobody knew what was installed. Composer made it one command, and the lock file made every computer identical.</p>`)}
${V.anat([[1,'composer'],' ',[2,'require'],' ',[3,'monolog'],[4,'/'],[5,'monolog']],[
 '<b>The tool.</b> Composer is a command-line program.',
 '<b>Command.</b> "Add this package to my project". <code>install</code> and <code>update</code> are its siblings.',
 '<b>Vendor name.</b> The person or organisation who publishes it.',
 '<b>Slash</b> between vendor and package. Always both parts.',
 '<b>Package name.</b> Monolog is the most used PHP logging library.'])}
${V.steps([
 ['You run <b>composer require monolog/monolog</b>. Composer asks Packagist which versions exist and which work with your PHP.',`<svg viewBox="0 0 420 170" role="img" aria-label="Composer asks Packagist for monolog">
<rect class="bx-dark" x="10" y="10" width="400" height="34" rx="6"/><text class="t-term" x="20" y="33" style="font-size:14px">$ composer require monolog/monolog</text>
${V.ic('globe',30,64,50,'ic-a')}<text class="t-s" x="20" y="134">Packagist</text>
<path class="ln-a" d="M90 90H150"/><text class="t-s" x="160" y="94">which versions fit?</text>
<rect class="ln-d" x="300" y="56" width="110" height="100" rx="8"/><text class="t-m" x="355" y="80" text-anchor="middle" style="font-size:14px">vendor/</text>
</svg>`],
 ['It downloads the newest version that fits, plus anything Monolog itself needs, into the <b>vendor/</b> folder.',`<svg viewBox="0 0 420 170" role="img" aria-label="Packages are downloaded into vendor">
<rect class="bx-dark" x="10" y="10" width="400" height="34" rx="6"/><text class="t-term" x="20" y="33" style="font-size:14px">$ composer require monolog/monolog</text>
${V.ic('globe',30,64,50,'ic-a')}<text class="t-s" x="20" y="134">Packagist</text>
${V.ic('truck',150,62,60,'ic-a')}<path class="ln-ok" d="M218 92H286"/><polygon class="ah-ok" points="284,85 284,99 296,92"/>
<rect class="bx-ok" x="300" y="56" width="110" height="100" rx="8"/><text class="t-m" x="355" y="80" text-anchor="middle" style="font-size:14px">vendor/</text>
<text class="t-s" x="312" y="108">monolog/</text><text class="t-s" x="312" y="132">psr/log/</text>
</svg>`],
 ['It adds a version rule such as <b>"^3.9"</b> (3.9 or newer, but below 4) to composer.json, and the exact version to <b>composer.lock</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="composer.json and composer.lock are updated">
<rect class="bx-dark" x="10" y="10" width="400" height="34" rx="6"/><text class="t-term" x="20" y="33" style="font-size:14px">$ composer require monolog/monolog</text>
<rect class="bx-info" x="10" y="56" width="196" height="100" rx="8"/><text class="t-m" x="20" y="80" style="font-size:14px">composer.json</text>
<text class="t-m" x="20" y="112" style="font-size:14px">"monolog/monolog":</text><text class="t-m t-a" x="20" y="136" style="font-size:14px">"^3.9"</text>
<rect class="bx-warn" x="214" y="56" width="196" height="100" rx="8"/><text class="t-m" x="224" y="80" style="font-size:14px">composer.lock</text>
<text class="t-s" x="224" y="112">monolog: exact</text><text class="t-s" x="224" y="136">psr/log: exact</text>
</svg>`],
 ['Finally it rebuilds <b>vendor/autoload.php</b>, so your code can use the new classes straight away.',`<svg viewBox="0 0 420 170" role="img" aria-label="The autoloader is regenerated">
<rect class="bx-dark" x="10" y="10" width="400" height="34" rx="6"/><text class="t-term" x="20" y="33" style="font-size:14px">$ composer require monolog/monolog</text>
<rect class="bx-ok" x="10" y="56" width="400" height="100" rx="8"/>${V.ic('book',24,70,60,'ic-ok')}
<text class="t-m" x="100" y="96" style="font-size:16px">vendor/autoload.php</text>
<text class="t-s" x="100" y="124">Generating autoload files</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('composer install','Teammates and servers: installs exactly what the lock file says'),V.no('composer update on a server','Picks new versions; do it on purpose on your own machine'),
 V.no('editing files in vendor/','Your changes are wiped on the next install'),
 V.rh('Conventions: what goes in Git'),
 V.ok('composer.json + composer.lock','Commit both, so everyone gets the same versions'),V.no('vendor/','Add it to .gitignore; it can always be rebuilt'))}
${V.hook(`json is the list, lock is the receipt, vendor is the delivery you never commit.`)}
`)}

${V.card(2,'Autoloading','the library catalogue',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A reader asks for App Models Product. The catalogue card maps App to src. The librarian fetches src/Models/Product.php from the shelf">
${V.ic('person',10,30,56,'ic-info')}
<rect class="bx-info" x="72" y="16" width="190" height="40" rx="8"/><text class="t-m" x="167" y="42" text-anchor="middle" style="font-size:14px">App\\Models\\Product</text>
<rect class="bx-warn" x="72" y="74" width="190" height="56" rx="6"/>${V.ic('card',80,82,38,'ic-warn')}
<text class="t-m" x="126" y="100" style="font-size:14px">App\\ &#10140; src/</text><text class="t-s" x="126" y="120">catalogue card</text>
<path class="ln-a" d="M262 102H296"/><polygon class="ah-a" points="294,95 294,109 306,102"/>
${V.ic('book',314,40,80,'ic-ok')}
<rect class="bx-ok" x="10" y="150" width="400" height="40" rx="8"/><text class="t-m" x="210" y="176" text-anchor="middle" style="font-size:16px">src/Models/Product.php</text>
</svg><figcaption>You ask for a class by its full name. The autoloader checks its catalogue rule, turns the name into a file path, and loads that file. You never write require for your own classes again.</figcaption></figure>
${V.like(`<p>A library. You do not wander every shelf: you give the librarian a title, they check the <b>catalogue</b>, and fetch the book from the right shelf. The autoloader is the librarian, the PSR-4 rule is the catalogue.</p>`)}
${V.why(`<p>Big projects have hundreds of class files. Writing <code>require 'src/Models/Product.php';</code> for each one was slow, easy to forget, and loaded files you did not need. PHP added autoloading, and the community agreed one shared catalogue rule, <b>PSR-4</b>, so every package finds classes the same way.</p>`)}
${V.anat(['"autoload": { "psr-4": { ',[1,'"App\\\\"'],': ',[2,'"src/"'],' } }'],[
 '<b>Namespace prefix.</b> Any class whose full name starts with <code>App\\</code>. JSON needs the backslash written twice.',
 '<b>Folder.</b> Where those classes live, relative to composer.json.'])}
${V.steps([
 ['index.php says <b>new Product(...)</b>. Thanks to <b>use App\\Models\\Product;</b>, PHP knows its full name, but the class has not been loaded yet.',`<svg viewBox="0 0 420 180" role="img" aria-label="PHP needs the class App Models Product">
<rect class="bx-dark" x="10" y="10" width="400" height="60" rx="6"/>
<text class="t-term" x="20" y="34" style="font-size:14px">use App\\Models\\Product;</text>
<text class="t-term" x="20" y="58" style="font-size:14px">$p = new Product('Keyboard', 49.5);</text>
<rect class="bx-hl" x="10" y="86" width="400" height="40" rx="6"/><text class="t-m" x="210" y="112" text-anchor="middle" style="font-size:16px">App\\Models\\Product</text>
<text class="t-s" x="210" y="160" text-anchor="middle">Not loaded yet. Ask the autoloader.</text>
</svg>`],
 ['The autoloader checks its catalogue. The name starts with <b>App\\</b>, and the rule says App\\ lives in <b>src/</b>. So it swaps the prefix.',`<svg viewBox="0 0 420 180" role="img" aria-label="App prefix becomes src">
<rect class="bx-dark" x="10" y="10" width="400" height="60" rx="6"/>
<text class="t-term t-dim" x="20" y="34" style="font-size:14px">use App\\Models\\Product;</text>
<text class="t-term t-dim" x="20" y="58" style="font-size:14px">$p = new Product('Keyboard', 49.5);</text>
<rect class="bx" x="10" y="86" width="400" height="40" rx="6"/><text class="t-m" x="210" y="112" text-anchor="middle" style="font-size:16px"><tspan class="t-bad">App\\</tspan>Models\\Product</text>
<rect class="bx" x="10" y="134" width="400" height="40" rx="6"/><text class="t-m" x="210" y="160" text-anchor="middle" style="font-size:16px"><tspan class="t-ok">src/</tspan>Models\\Product</text>
</svg>`],
 ['Backslashes become folder slashes and <b>.php</b> goes on the end: <b>src/Models/Product.php</b>.',`<svg viewBox="0 0 420 180" role="img" aria-label="The path becomes src/Models/Product.php">
<rect class="bx-dark" x="10" y="10" width="400" height="60" rx="6"/>
<text class="t-term t-dim" x="20" y="34" style="font-size:14px">use App\\Models\\Product;</text>
<text class="t-term t-dim" x="20" y="58" style="font-size:14px">$p = new Product('Keyboard', 49.5);</text>
<rect class="bx" x="10" y="86" width="400" height="40" rx="6"/><text class="t-m" x="210" y="112" text-anchor="middle" style="font-size:16px">src/Models<tspan class="t-bad">\\</tspan>Product</text>
<rect class="bx-ok" x="10" y="134" width="400" height="40" rx="6"/><text class="t-m" x="210" y="160" text-anchor="middle" style="font-size:16px">src/Models/Product<tspan class="t-ok">.php</tspan></text>
</svg>`],
 ['The file is loaded, the class now exists, and <b>new</b> builds the object. The script prints <b>Keyboard ($49.50)</b>.',`<svg viewBox="0 0 420 180" role="img" aria-label="The object is built and the script prints Keyboard 49.50">
<rect class="bx-dark" x="10" y="10" width="400" height="60" rx="6"/>
<text class="t-term t-dim" x="20" y="34" style="font-size:14px">use App\\Models\\Product;</text>
<text class="t-a" x="6" y="58" style="font-size:13px">&#9654;</text><text class="t-term" x="20" y="58" style="font-size:14px">$p = new Product('Keyboard', 49.5);</text>
<rect class="bx-ok" x="10" y="86" width="400" height="40" rx="6"/>${V.ic('check',18,92,28,'ic-ok')}<text class="t-m" x="56" y="112" style="font-size:15px">src/Models/Product.php loaded</text>
<rect class="bx-dark" x="10" y="134" width="400" height="40" rx="6"/><text class="t-term" x="20" y="160" style="font-size:16px">Keyboard ($49.50)</text>
</svg>`]])}
${V.rules(V.rh('Rules: the catalogue only works if names match'),
 V.ok('namespace App\\Models;','In src/Models/Product.php: the namespace mirrors the folders'),V.no('src/models/product.php','Wrong capitals: fails on Linux servers, which care about case'),
 V.no('no require of vendor/autoload.php','"Failed to open stream" or "Class not found"'),V.ok('require __DIR__ . \'/vendor/autoload.php\';','Once, at the top of your entry file'),
 V.ok('composer dump-autoload','Run after you change the autoload rules in composer.json'),
 V.rh('Conventions'),
 V.ok('App\\ =&gt; src/','Laravel uses App\\ =&gt; app/; same idea'),V.ok('one class per file','File name = class name + .php'))}
${V.build(`<ol><li>Run <code>php index.php</code> and read the error: vendor/autoload.php does not exist yet.</li><li>Run <code>composer init</code> to create composer.json, with a PSR-4 rule mapping App\\ to src/.</li><li>Run <code>composer dump-autoload</code> to build the autoloader, then run the script again.</li><li>Add Monolog with <code>composer require</code>.</li><li>Create a <code>Logger</code>, push a <code>StreamHandler</code> to <code>php://stdout</code>, and call <code>-&gt;info('Product created')</code>.</li></ol>`)}
${V.hook(`Full name in, file path out: prefix to folder, backslash to slash, add .php.`)}
`)}

<div class="try"><b>Try it in your head</b>1. With <code>"App\\\\": "src/"</code>, where does <code>App\\Mail\\Welcome</code> live? <i>src/Mail/Welcome.php.</i> 2. A teammate clones your repo. Which command recreates vendor/? <i>composer install.</i> 3. Should vendor/ be committed? <i>No. Commit composer.json and composer.lock.</i></div>
`);

explain('h4',`
<p>Almost every website stores its users, orders and posts in a database. The way PHP talks to that database decides whether a stranger can read everyone's data with one clever line typed into a login box. This lesson teaches the safe way, every time.</p>

${V.card(1,'PDO','one plug, many databases',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="PHP connects through a PDO adapter to MySQL, PostgreSQL or SQLite">
<rect class="bx-a" x="10" y="56" width="96" height="64" rx="8"/><text class="t-b" x="58" y="94" text-anchor="middle" style="font-size:18px">PHP</text>
<path class="ln" style="stroke-width:3" d="M106 88H140"/>
<rect class="bx-warn" x="140" y="50" width="100" height="76" rx="10"/>${V.ic('chip',166,56,48,'ic-warn')}<text class="t-b" x="190" y="118" text-anchor="middle">PDO</text>
<path class="ln" style="stroke-width:3" d="M240 88 270 34M240 88H270M240 88 270 142"/>
${V.ic('db',272,10,44,'ic-info')}<text class="t" x="320" y="38">MySQL</text>
${V.ic('db',272,66,44,'ic-info')}<text class="t" x="320" y="94">PostgreSQL</text>
${V.ic('db',272,122,44,'ic-info')}<text class="t" x="320" y="150">SQLite</text>
</svg><figcaption>PDO (PHP Data Objects) gives PHP one way of talking to many databases. Change one connection string and the rest of your code stays the same.</figcaption></figure>
${V.like(`<p>A travel adapter. Your charger has one plug; the adapter lets it fit the sockets of many countries. PDO is the adapter between your PHP and whichever database the project uses.</p>`)}
${V.why(`<p>PHP once had a different set of functions for every database, each with its own names and habits. Switching database meant rewriting everything. PDO arrived in PHP 5.1 (2005) with one shared API, and Laravel's database layer is built on top of it.</p>`)}
${V.anat([['new PDO(\''],[1,'mysql'],[2,':host=localhost'],[3,';dbname=shop'],'\', ',[4,'\'shop_user\', \'secret\''],')'],[
 '<b>Driver.</b> Which kind of database: <code>mysql</code>, <code>pgsql</code> or <code>sqlite</code>.',
 '<b>Host.</b> The computer the database runs on.',
 '<b>Database name.</b> One server can hold many databases.',
 '<b>Username and password.</b> In real projects they come from environment settings, never typed into code.'])}
${V.rules(V.rh('Rules'),
 V.ok('PDO::ERRMODE_EXCEPTION','Errors throw exceptions you can catch (the default since PHP 8; set it anyway)'),
 V.ok('PDO::FETCH_ASSOC','Rows come back as arrays keyed by column name'),
 V.no('\'secret\' committed to Git','Passwords belong in a .env file or server settings'),
 V.rh('Conventions'),
 V.ok('one $pdo per request','Connect once and pass it to the functions that need it'))}
${V.hook(`One adapter, many sockets: PDO.`)}
`)}

${V.card(2,'Prepared statements','a form with boxes, not a glued note',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Left: a ransom-style note where user text is glued into the command. Right: a form with a separate box where user text can only ever be data">
<text class="t-b t-bad" x="10" y="20">Glued string</text>
<rect class="bx-bad" x="10" y="30" width="196" height="120" rx="8"/>
<text class="t-m" x="20" y="60" style="font-size:14px">WHERE email =</text>
<rect class="bx" x="20" y="72" width="176" height="30" rx="3" transform="rotate(-3 20 72)"/><text class="t-m t-bad" x="28" y="94" style="font-size:14px">'' OR '1'='1'</text>
<text class="t-s" x="20" y="136">text became code</text>
<text class="t-b t-ok" x="222" y="20">Prepared</text>
<rect class="bx-ok" x="214" y="30" width="196" height="120" rx="8"/>
<text class="t-m" x="224" y="60" style="font-size:14px">WHERE email =</text>
<rect class="bx-info" x="224" y="72" width="176" height="30" rx="4"/><text class="t-m" x="232" y="93" style="font-size:14px">:email</text>
${V.ic('shield',366,108,36,'ic-ok')}
<text class="t-s" x="224" y="136">box only holds data</text>
<text class="t-s" x="210" y="186" text-anchor="middle">Same input. Only one is safe.</text>
</svg><figcaption>Gluing user input into SQL lets that input rewrite your command. A placeholder is a fixed box: whatever goes in is only ever a value.</figcaption></figure>
${V.like(`<p>A bank form has a box marked "amount". Whatever you write in it is treated as an amount, even if you write "and give me the vault". Gluing input into SQL is like letting customers write directly onto the cashier's instruction sheet.</p>`)}
${V.why(`<p><b>SQL injection</b> has been one of the most damaging web attacks for over 25 years, behind huge data leaks. Prepared statements fix it at the root: the database receives the query's shape first and the values afterwards, so a value can never change the shape.</p>`)}
<p><b>Watch the attack work on glued SQL.</b></p>
${V.steps([
 ['The code glues whatever is in the email box straight into the SQL text. With a normal email, the query finds one user.',`<svg viewBox="0 0 420 196" role="img" aria-label="Normal email finds one user">
<text class="t-s" x="10" y="18">Email box on the login form</text>
<rect class="bx" x="10" y="26" width="400" height="36" rx="6"/><text class="t-m" x="20" y="50" style="font-size:15px">ada@example.com</text>
<rect class="bx-dark" x="10" y="74" width="400" height="66" rx="6"/>
<text class="t-term" x="20" y="98" style="font-size:14px">SELECT * FROM users</text>
<text class="t-term" x="20" y="126" style="font-size:14px">WHERE email = '<tspan class="t-ok">ada@example.com</tspan>'</text>
<rect class="bx-ok" x="10" y="152" width="400" height="38" rx="6"/><text class="t" x="20" y="177">1 row: Ada Lovelace</text>
</svg>`],
 ['An attacker types <b>\' OR \'1\'=\'1</b> instead of an email. It starts with a quote mark on purpose.',`<svg viewBox="0 0 420 196" role="img" aria-label="Attacker types quote OR 1 equals 1">
<text class="t-s" x="10" y="18">Email box on the login form</text>
<rect class="bx-warn" x="10" y="26" width="400" height="36" rx="6"/><text class="t-m t-bad" x="20" y="50" style="font-size:15px">' OR '1'='1</text>${V.ic('person',370,28,32,'ic-bad')}
<rect class="bx-dark" x="10" y="74" width="400" height="66" rx="6"/>
<text class="t-term" x="20" y="98" style="font-size:14px">SELECT * FROM users</text>
<text class="t-term" x="20" y="126" style="font-size:14px">WHERE email = '<tspan class="t-dim">$email</tspan>'</text>
<rect class="ln-d" x="10" y="152" width="400" height="38" rx="6"/>
</svg>`],
 ['After gluing, the attacker\'s quote <b>closes the text early</b>. <b>OR \'1\'=\'1\'</b> is now part of the SQL code, and 1 always equals 1.',`<svg viewBox="0 0 420 196" role="img" aria-label="The glued query now has an always-true condition">
<text class="t-s" x="10" y="18">Email box on the login form</text>
<rect class="bx-warn" x="10" y="26" width="400" height="36" rx="6"/><text class="t-m t-bad" x="20" y="50" style="font-size:15px">' OR '1'='1</text>
<rect class="bx-dark" x="10" y="74" width="400" height="66" rx="6"/>
<text class="t-term" x="20" y="98" style="font-size:14px">SELECT * FROM users</text>
<text class="t-term" x="20" y="126" style="font-size:14px">WHERE email = '<tspan class="t-bad">' OR '1'='1</tspan>'</text>
<rect class="ln-d" x="10" y="152" width="400" height="38" rx="6"/><text class="t-b t-bad" x="20" y="177">condition is true for every row</text>
</svg>`],
 ['The database obeys and returns <b>every user</b>. On a login form, that can mean logging in as the first user, often the admin.',`<svg viewBox="0 0 420 196" role="img" aria-label="Every user is leaked">
<text class="t-s" x="10" y="18">Email box on the login form</text>
<rect class="bx-warn" x="10" y="26" width="400" height="36" rx="6"/><text class="t-m t-bad" x="20" y="50" style="font-size:15px">' OR '1'='1</text>
<rect class="bx-dark" x="10" y="74" width="400" height="66" rx="6"/>
<text class="t-term" x="20" y="98" style="font-size:14px">SELECT * FROM users</text>
<text class="t-term" x="20" y="126" style="font-size:14px">WHERE email = '<tspan class="t-bad">' OR '1'='1</tspan>'</text>
<rect class="bx-bad" x="10" y="152" width="400" height="38" rx="6"/>${V.ic('warn',16,156,30,'ic-bad')}<text class="t-b" x="54" y="177">3 rows: Ada, Grace, Alan. Leaked!</text>
</svg>`]])}
<p><b>Now the same attack against a prepared statement.</b></p>
${V.steps([
 ['<b>prepare()</b> sends the SQL with a placeholder, <b>:email</b>, and no data. The database reads it and fixes its shape: "compare email to <b>one value</b>".',`<svg viewBox="0 0 420 196" role="img" aria-label="The query shape is sent first">
<rect class="bx-dark" x="10" y="10" width="270" height="66" rx="6"/>
<text class="t-term" x="20" y="36" style="font-size:14px">SELECT * FROM users</text>
<text class="t-term" x="20" y="64" style="font-size:14px">WHERE email = <tspan class="t-ok">:email</tspan></text>
<path class="ln-a" d="M284 42H330"/><polygon class="ah-a" points="328,35 328,49 340,42"/>
${V.ic('db',346,12,60,'ic-info')}
<rect class="ln-d" x="10" y="92" width="270" height="44" rx="6"/><text class="t-s" x="20" y="119">value: not sent yet</text>
<rect class="ln-d" x="10" y="150" width="400" height="40" rx="6"/>
</svg>`],
 ['<b>execute()</b> sends the value <b>separately</b>, like a parcel with a label. The attacker\'s text travels as data.',`<svg viewBox="0 0 420 196" role="img" aria-label="The value travels separately">
<rect class="bx-dark" x="10" y="10" width="270" height="66" rx="6"/>
<text class="t-term t-dim" x="20" y="36" style="font-size:14px">SELECT * FROM users</text>
<text class="t-term t-dim" x="20" y="64" style="font-size:14px">WHERE email = :email</text>
${V.ic('db',346,12,60,'ic-info')}
<rect class="bx-info" x="10" y="92" width="270" height="44" rx="6"/>${V.ic('box',16,96,34,'ic-info')}<text class="t-m t-bad" x="58" y="120" style="font-size:15px">' OR '1'='1</text>
<path class="ln-a" d="M284 114 340 66"/><polygon class="ah-a" points="332,64 344,62 340,74"/>
<rect class="ln-d" x="10" y="150" width="400" height="40" rx="6"/>
</svg>`],
 ['The database drops the parcel into the <b>:email</b> slot as plain text. It looks for a user whose email is literally <b>\' OR \'1\'=\'1</b>. The quotes are just characters.',`<svg viewBox="0 0 420 196" role="img" aria-label="The value is compared as plain text">
<rect class="bx-dark" x="10" y="10" width="270" height="66" rx="6"/>
<text class="t-term t-dim" x="20" y="36" style="font-size:14px">SELECT * FROM users</text>
<text class="t-term" x="20" y="64" style="font-size:14px">WHERE email = <tspan class="t-ok">[data]</tspan></text>
${V.ic('shield',346,12,60,'ic-ok')}
<rect class="bx-info" x="10" y="92" width="400" height="44" rx="6"/><text class="t-s" x="20" y="119">email equals the text</text><text class="t-m" x="190" y="120" style="font-size:15px">' OR '1'='1</text>
<rect class="ln-d" x="10" y="150" width="400" height="40" rx="6"/>
</svg>`],
 ['Nobody has that email, so the result is <b>0 rows</b>. The attack is blocked, and you did not have to spot it.',`<svg viewBox="0 0 420 196" role="img" aria-label="Zero rows, attack blocked">
<rect class="bx-dark" x="10" y="10" width="270" height="66" rx="6"/>
<text class="t-term t-dim" x="20" y="36" style="font-size:14px">SELECT * FROM users</text>
<text class="t-term t-dim" x="20" y="64" style="font-size:14px">WHERE email = :email</text>
${V.ic('shield',346,12,60,'ic-ok')}
<rect class="bx-info" x="10" y="92" width="400" height="44" rx="6"/><text class="t-s" x="20" y="119">email equals the text</text><text class="t-m" x="190" y="120" style="font-size:15px">' OR '1'='1</text>
<rect class="bx-ok" x="10" y="150" width="400" height="40" rx="6"/>${V.ic('check',16,155,30,'ic-ok')}<text class="t-b" x="54" y="176">0 rows. Attack blocked.</text>
</svg>`]])}
${V.anat(['$stmt = $pdo-&gt;',[1,'prepare'],'(\'... WHERE email = ',[2,':email'],'\');\n$stmt-&gt;',[3,'execute'],'(',[4,'[\'email\' =&gt; $email]'],');\n$user = $stmt-&gt;',[5,'fetch'],'();'],[
 '<b>prepare.</b> Sends the SQL shape, with placeholders, and gets back a statement object.',
 '<b>Named placeholder.</b> A labelled empty box. <code>?</code> is the unnamed kind, filled in order.',
 '<b>execute.</b> Sends the values. You can run the same statement again with new values.',
 '<b>Values array.</b> Keys match the placeholder names, without the colon.',
 '<b>fetch.</b> One row as an array, or <code>false</code> if nothing matched.'])}
${V.rules(V.rh('Rules: security musts'),
 V.no('"... WHERE email = \'$email\'"','Never put a variable inside SQL text'),V.ok('WHERE email = :email','A placeholder for every value'),
 V.no('\':email\'','No quotes round a placeholder; they make it literal text'),V.no('ORDER BY :column','Placeholders hold values only, not table or column names: check those against an allow-list'),
 V.rh('Conventions'),
 V.ok(':email or ?','Pick one style per query; do not mix them'),V.ok('escaping by hand','Not needed, and easy to get wrong. Let placeholders do it'))}
${V.hook(`Shape first, data second. Glue makes code; boxes keep data.`)}
`)}

${V.card(3,'Reading, adding and catching errors','fetch, lastInsertId and try/catch',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="A users table. A new row, Linus, gets id 4. A second Ada with an email already taken bounces off the unique lock">
<rect class="bx" x="10" y="10" width="260" height="30" rx="4"/><text class="t-b" x="22" y="31">id</text><text class="t-b" x="66" y="31">email</text>
<text class="t-m" x="22" y="62">1</text><text class="t-m" x="66" y="62" style="font-size:14px">ada@example.com</text>
<text class="t-m" x="22" y="90">2</text><text class="t-m" x="66" y="90" style="font-size:14px">grace@example.com</text>
<text class="t-m" x="22" y="118">3</text><text class="t-m" x="66" y="118" style="font-size:14px">alan@example.com</text>
<rect class="bx-ok" x="10" y="128" width="260" height="30" rx="4"/><text class="t-m" x="22" y="149">4</text><text class="t-m" x="66" y="149" style="font-size:14px">linus@example.com</text>
<path class="bx-a" d="M282 130H370L382 143 370 156H282Z"/><text class="t-m" x="326" y="148" text-anchor="middle" style="font-size:14px">new id 4</text>
<rect class="bx-bad" x="290" y="20" width="120" height="60" rx="6"/><text class="t-s" x="350" y="44" text-anchor="middle">ada@... again</text>${V.ic('lock',334,48,28,'ic-bad')}
<text class="t-bad" x="350" y="104" text-anchor="middle" style="font-size:14px">UNIQUE: refused</text>
<text class="t-s" x="10" y="188">INSERT adds a row; a duplicate email throws a PDOException</text>
</svg><figcaption>Inserting gives the new row the next id, which lastInsertId() reads back. The email column is UNIQUE, so a second account with the same email is refused with an exception you can catch.</figcaption></figure>
${V.like(`<p>Signing up at a gym: you get the next membership number. Try to sign up twice with the same email and the desk says no, politely, instead of the whole gym shutting down. <code>try/catch</code> is that polite desk.</p>`)}
${V.anat([[1,'try'],' { createUser($pdo, ...); }\n',[2,'catch'],' (',[3,'PDOException $e'],') {\n    echo "',[4,'email already taken'],'";\n}'],[
 '<b>try</b>: run this, but be ready for trouble.',
 '<b>catch</b> runs only if something inside try threw an exception.',
 '<b>The type</b> to catch, and a variable holding the details.',
 '<b>A friendly message</b> for the user, instead of a crash.'])}
${V.rules(V.rh('Rules'),
 V.ok('return $user ?: null;','fetch() gives false when nothing matches; turn it into null for a ?array return type'),
 V.ok('(int) $pdo-&gt;lastInsertId()','It returns a string; cast it to match an int return type'),
 V.no('echo $e-&gt;getMessage();','Raw database errors can reveal table names to attackers. Log them, show a simple message'),
 V.rh('Conventions'),
 V.ok('fetchAll() for lists','Every row as an array of arrays'),V.ok('SELECT id, name, email','Name the columns you need instead of *'))}
${V.build(`<ol><li>Run a fixed query with <code>$pdo-&gt;query(...)-&gt;fetchAll()</code> and print <code>count($users) . " users"</code>. No user input, so no placeholder needed.</li><li>Write <code>findUserByEmail</code>: prepare with <code>:email</code>, execute with the array, return the fetched row or null.</li><li>Write <code>createUser</code>: prepare an INSERT with two <code>?</code> placeholders, execute with <code>[$name, $email]</code>, return the new id.</li><li>Wrap a duplicate insert in <code>try/catch (PDOException $e)</code> and print a friendly message.</li></ol>`)}
${V.hook(`fetch one, fetchAll many, lastInsertId for the new one, catch the clash.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Is <code>"WHERE id = $id"</code> safe if $id came from the URL? <i>No. Use a placeholder.</i> 2. What does fetch() return when no row matches? <i>false.</i> 3. Can a placeholder stand for a column name? <i>No, only for values.</i></div>
`);

explain('h5',`
<p>Laravel is the most popular PHP framework: a ready-made structure where every kind of code has its own place. Learn the path one request takes through it, <b>route, controller, model, view</b>, and you can find your way around any Laravel app.</p>

${V.card(1,'The journey of a request','route, controller, model, view',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="A request passes four stations: the route signpost, the controller, the model with the database, and the view that makes HTML">
<rect class="bx-a" x="6" y="20" width="96" height="104" rx="8"/>${V.ic('sign',30,28,48,'ic-a')}<text class="t-b" x="54" y="96" text-anchor="middle">Route</text><text class="t-s" x="54" y="116" text-anchor="middle">which URL?</text>
<rect class="bx-info" x="110" y="20" width="96" height="104" rx="8"/>${V.ic('person',134,28,48,'ic-info')}<text class="t-b" x="158" y="96" text-anchor="middle">Controller</text><text class="t-s" x="158" y="116" text-anchor="middle">decides</text>
<rect class="bx-warn" x="214" y="20" width="96" height="104" rx="8"/>${V.ic('db',238,28,48,'ic-warn')}<text class="t-b" x="262" y="96" text-anchor="middle">Model</text><text class="t-s" x="262" y="116" text-anchor="middle">gets data</text>
<rect class="bx-ok" x="318" y="20" width="96" height="104" rx="8"/>${V.ic('file',342,28,48,'ic-ok')}<text class="t-b" x="366" y="96" text-anchor="middle">View</text><text class="t-s" x="366" y="116" text-anchor="middle">makes HTML</text>
<path class="ln-a" d="M20 150H400"/><polygon class="ah-a" points="398,143 398,157 410,150"/>
<text class="t-m" x="10" y="180" style="font-size:14px">GET /posts</text><text class="t-m" x="410" y="180" text-anchor="end" style="font-size:14px">HTML page</text>
</svg><figcaption>Every request walks the same line of stations. Each station has one job, so you always know which file to open.</figcaption></figure>
${V.like(`<p>A restaurant. The <b>host</b> at the door reads your booking and sends you to a table (route). The <b>waiter</b> takes your order and coordinates (controller). The <b>pantry</b> supplies ingredients (model and database). The <b>plating</b> makes it look good (view).</p>`)}
${V.why(`<p>Early PHP sites mixed SQL, logic and HTML in one file, and big sites became impossible to change. The <b>MVC</b> pattern (Model, View, Controller) splits those jobs. Taylor Otwell released Laravel in 2011 to make MVC in PHP pleasant, with sensible defaults for everything.</p>`)}
${V.anat([[1,'Route::get'],'(',[2,"'/posts'"],', ',[3,'[PostController::class, \'index\']'],');'],[
 '<b>HTTP method.</b> <code>get</code> for reading pages. Others: <code>post</code>, <code>patch</code>, <code>delete</code>.',
 '<b>URL path</b> this route answers.',
 '<b>What to run:</b> a controller class and method. Small apps, like this lesson\'s, can put a <code>function () { ... }</code> here instead.'])}
${V.steps([
 ['The browser asks for <b>GET /posts</b>. Laravel reads <b>routes/web.php</b> from the top and finds the route for /posts.',`<svg viewBox="0 0 420 160" role="img" aria-label="The route matches">
<rect class="bx-hl" x="6" y="14" width="96" height="70" rx="8"/>${V.ic('sign',34,20,40,'ic-a')}<text class="t-b" x="54" y="76" text-anchor="middle">Route</text>
<rect class="bx" x="110" y="14" width="96" height="70" rx="8"/>${V.ic('person',138,20,40,'ic-info')}<text class="t-b" x="158" y="76" text-anchor="middle">Controller</text>
<rect class="bx" x="214" y="14" width="96" height="70" rx="8"/>${V.ic('db',242,20,40,'ic-warn')}<text class="t-b" x="262" y="76" text-anchor="middle">Model</text>
<rect class="bx" x="318" y="14" width="96" height="70" rx="8"/>${V.ic('file',346,20,40,'ic-ok')}<text class="t-b" x="366" y="76" text-anchor="middle">View</text>
<rect class="bx-dark" x="6" y="98" width="408" height="52" rx="6"/><text class="t-term" x="16" y="130" style="font-size:14px">Route::get('/posts', ...)  <tspan class="t-ok">match</tspan></text>
</svg>`],
 ['The route hands over to the controller code. Its job: "get the published posts, then show them".',`<svg viewBox="0 0 420 160" role="img" aria-label="The controller runs">
<rect class="bx" x="6" y="14" width="96" height="70" rx="8"/>${V.ic('sign',34,20,40,'ic-a')}<text class="t-b" x="54" y="76" text-anchor="middle">Route</text>
<rect class="bx-hl" x="110" y="14" width="96" height="70" rx="8"/>${V.ic('person',138,20,40,'ic-info')}<text class="t-b" x="158" y="76" text-anchor="middle">Controller</text>
<rect class="bx" x="214" y="14" width="96" height="70" rx="8"/>${V.ic('db',242,20,40,'ic-warn')}<text class="t-b" x="262" y="76" text-anchor="middle">Model</text>
<rect class="bx" x="318" y="14" width="96" height="70" rx="8"/>${V.ic('file',346,20,40,'ic-ok')}<text class="t-b" x="366" y="76" text-anchor="middle">View</text>
<rect class="bx-dark" x="6" y="98" width="408" height="52" rx="6"/><text class="t-term" x="16" y="130" style="font-size:14px">$posts = Post::where(...)-&gt;get();</text>
</svg>`],
 ['The <b>Post</b> model turns that PHP into SQL, asks the database, and gives back a collection of Post objects.',`<svg viewBox="0 0 420 160" role="img" aria-label="The model queries the database">
<rect class="bx" x="6" y="14" width="96" height="70" rx="8"/>${V.ic('sign',34,20,40,'ic-a')}<text class="t-b" x="54" y="76" text-anchor="middle">Route</text>
<rect class="bx" x="110" y="14" width="96" height="70" rx="8"/>${V.ic('person',138,20,40,'ic-info')}<text class="t-b" x="158" y="76" text-anchor="middle">Controller</text>
<rect class="bx-hl" x="214" y="14" width="96" height="70" rx="8"/>${V.ic('db',242,20,40,'ic-warn')}<text class="t-b" x="262" y="76" text-anchor="middle">Model</text>
<rect class="bx" x="318" y="14" width="96" height="70" rx="8"/>${V.ic('file',346,20,40,'ic-ok')}<text class="t-b" x="366" y="76" text-anchor="middle">View</text>
<rect class="bx-dark" x="6" y="98" width="408" height="52" rx="6"/><text class="t-term" x="16" y="120" style="font-size:14px">select * from posts</text><text class="t-term" x="16" y="142" style="font-size:14px">where published = 1  <tspan class="t-ok">2 posts</tspan></text>
</svg>`],
 ['The controller passes the posts to the <b>posts.index</b> view. Blade fills the template and the finished HTML goes back to the browser.',`<svg viewBox="0 0 420 160" role="img" aria-label="The view renders HTML">
<rect class="bx" x="6" y="14" width="96" height="70" rx="8"/>${V.ic('sign',34,20,40,'ic-a')}<text class="t-b" x="54" y="76" text-anchor="middle">Route</text>
<rect class="bx" x="110" y="14" width="96" height="70" rx="8"/>${V.ic('person',138,20,40,'ic-info')}<text class="t-b" x="158" y="76" text-anchor="middle">Controller</text>
<rect class="bx" x="214" y="14" width="96" height="70" rx="8"/>${V.ic('db',242,20,40,'ic-warn')}<text class="t-b" x="262" y="76" text-anchor="middle">Model</text>
<rect class="bx-hl" x="318" y="14" width="96" height="70" rx="8"/>${V.ic('file',346,20,40,'ic-ok')}<text class="t-b" x="366" y="76" text-anchor="middle">View</text>
<rect class="bx-ok" x="6" y="98" width="408" height="52" rx="6"/><text class="t-m" x="16" y="120" style="font-size:14px">&lt;li&gt;Hello Laravel&lt;/li&gt;</text><text class="t-m" x="16" y="142" style="font-size:14px">&lt;li&gt;Eloquent is neat&lt;/li&gt;</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('routes/web.php','Pages for browsers live here'),V.no('two routes, same URL and method','The first match wins; the second never runs'),
 V.rh('Conventions'),
 V.ok('PostController','Singular model name + Controller'),V.ok('index, show, store','Standard method names for list, one item, create'))}
${V.hook(`Host, waiter, pantry, plate: route, controller, model, view.`)}
`)}

${V.card(2,'Migrations and Eloquent models','a table blueprint and a class that speaks SQL',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="The Post class is linked to the posts table. Each object is one row">
<rect class="bx-a" x="10" y="20" width="140" height="120" rx="8"/><text class="t-m" x="80" y="52" text-anchor="middle" style="font-size:17px">Post</text>
<text class="t-s" x="80" y="80" text-anchor="middle">class (singular)</text>${V.ic('box',60,90,40,'ic-a')}
<path class="ln-a" d="M154 80H200"/><polygon class="ah-a" points="198,73 198,87 210,80"/><path class="ln-a" d="M210 96H164"/><polygon class="ah-a" points="166,89 166,103 154,96"/>
<rect class="bx" x="214" y="20" width="196" height="30" rx="4"/><text class="t-m" x="312" y="41" text-anchor="middle" style="font-size:15px">posts</text>
<rect class="bx" x="214" y="50" width="196" height="30"/><text class="t-s" x="224" y="70">1  Hello Laravel</text>
<rect class="bx-info" x="214" y="80" width="196" height="30"/><text class="t-s" x="224" y="100">2  Eloquent is neat</text>
<rect class="bx" x="214" y="110" width="196" height="30"/><text class="t-s" x="224" y="130">3  Draft ideas</text>
<text class="t-s" x="312" y="164" text-anchor="middle">table (plural)</text>
</svg><figcaption>An Eloquent model is a class linked to one table. Laravel guesses the table name: Post becomes posts. Each Post object is one row.</figcaption></figure>
${V.like(`<p>A <b>migration</b> is the builder's plan for a table: which columns, what types. A <b>model</b> is a translator standing at the table: you speak PHP, it speaks SQL to the database for you.</p>`)}
${V.why(`<p>Writing SQL by hand for every page is repetitive, and changing tables by hand on every computer goes wrong. Migrations are table changes saved as code, so <code>php artisan migrate</code> builds the same tables everywhere. Eloquent is Laravel's ORM (object-relational mapper): it turns rows into objects.</p>`)}
${V.anat([[1,'Post'],[2,'::where'],"('published', true)",[3,'-&gt;latest()'],[4,'-&gt;get()']],[
 '<b>The model.</b> Starts a query on the posts table.',
 '<b>where.</b> Only rows where the column equals the value. Values are bound safely, like PDO placeholders.',
 '<b>latest.</b> Newest first, ordered by <code>created_at</code>.',
 '<b>get.</b> Runs the query now and returns a collection of Post objects.'])}
${V.rules(V.rh('Rules: mass assignment'),
 V.no('$fillable = []','Post::create([...]) refuses: MassAssignmentException'),V.ok('$fillable = [\'title\', \'body\', \'published\']','Only these columns may be filled from an array'),
 V.no('Post::create($request-&gt;all())','Without $fillable, a crafted form could set is_admin'),
 V.rh('Conventions: naming'),
 V.ok('Post / posts','Model singular PascalCase, table plural snake_case'),V.ok('create_posts_table','Migration files are named after what they do, with a timestamp'),
 V.ok('php artisan migrate','Applies migrations that have not run yet'))}
${V.hook(`Migration builds the table, model speaks to it, $fillable guards it.`)}
`)}

${V.card(3,'Blade views and route-model binding','templates with holes, URLs that find rows',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="A Blade template with holes is filled with a post's title and body to make a page">
<rect class="bx-info" x="10" y="14" width="190" height="150" rx="8"/>
<text class="t-m" x="22" y="42" style="font-size:14px">&lt;h1&gt;</text>
<rect class="ln-d" x="22" y="52" width="164" height="30" rx="4"/><text class="t-m" x="28" y="72" style="font-size:14px">{{ $post-&gt;title }}</text>
<text class="t-m" x="22" y="104" style="font-size:14px">&lt;p&gt;</text>
<rect class="ln-d" x="22" y="114" width="164" height="30" rx="4"/><text class="t-m" x="28" y="134" style="font-size:14px">{{ $post-&gt;body }}</text>
<path class="ln-a" d="M202 90H226"/><polygon class="ah-a" points="224,83 224,97 236,90"/>
<rect class="bx-ok" x="240" y="14" width="170" height="150" rx="8"/>
<text class="t-b" x="252" y="70" style="font-size:20px">Hello Laravel</text>
<text class="t" x="252" y="134">My first post.</text>
</svg><figcaption>A Blade view is HTML with holes. Laravel fills each {{ }} with a value, safely escaped, and sends the result.</figcaption></figure>
${V.like(`<p>A birthday card template with blank lines for the name. Blade writes in the name, but always in ink that cannot turn into instructions: if someone's "name" is a <code>&lt;script&gt;</code> tag, it is shown as text, not run.</p>`)}
${V.anat([[1,'@foreach'],' ($posts as $post)\n  &lt;li&gt;',[2,'{{ $post-&gt;title }}'],'&lt;/li&gt;\n',[1,'@endforeach']],[
 '<b>Blade directives</b> start with <code>@</code>: loops, ifs, layouts. Every <code>@foreach</code> needs an <code>@endforeach</code>.',
 '<b>Echo with escaping.</b> Prints the value with &lt; and &gt; made harmless. This stops XSS (cross-site scripting).'])}
${V.steps([
 ['A visitor opens <b>/posts/1</b>. The route <b>/posts/{post}</b> matches, and <b>{post}</b> captures 1.',`<svg viewBox="0 0 420 150" role="img" aria-label="URL posts 1 matches the route">
<rect class="bx-hl" x="10" y="14" width="400" height="40" rx="6"/><text class="t-m" x="22" y="40" style="font-size:15px">GET /posts/<tspan class="t-a" style="font-weight:700">1</tspan></text>
<text class="t-m" x="10" y="88" style="font-size:14px">'/posts/{post}'  ...  function (Post $post)</text>
<rect class="ln-d" x="10" y="104" width="400" height="38" rx="6"/>
</svg>`],
 ['The parameter is typed <b>Post $post</b> and named like <b>{post}</b>, so Laravel looks up the Post with id 1 and passes in the object.',`<svg viewBox="0 0 420 150" role="img" aria-label="Laravel finds post 1">
<rect class="bx" x="10" y="14" width="400" height="40" rx="6"/><text class="t-m" x="22" y="40" style="font-size:15px">GET /posts/<tspan class="t-a" style="font-weight:700">1</tspan></text>
<text class="t-m" x="10" y="88" style="font-size:14px">'/posts/{post}'  ...  function (Post $post)</text>
<rect class="bx-ok" x="10" y="104" width="400" height="38" rx="6"/><text class="t" x="22" y="129">$post = Post 1: "Hello Laravel"</text>
</svg>`],
 ['Someone tries <b>/posts/999</b>. No such row, so Laravel stops and answers <b>404 Not Found</b> for you. No if statement needed.',`<svg viewBox="0 0 420 150" role="img" aria-label="Missing post gives 404">
<rect class="bx" x="10" y="14" width="400" height="40" rx="6"/><text class="t-m" x="22" y="40" style="font-size:15px">GET /posts/<tspan class="t-bad" style="font-weight:700">999</tspan></text>
<text class="t-m" x="10" y="88" style="font-size:14px">'/posts/{post}'  ...  function (Post $post)</text>
<rect class="bx-bad" x="10" y="104" width="400" height="38" rx="6"/><text class="t-b" x="22" y="129">404 Not Found</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('view(\'posts.index\', [...])','Dot means folder: resources/views/posts/index.blade.php'),V.no('{!! $post-&gt;body !!}','Prints raw HTML: only for content you fully trust'),
 V.no('{post} with function (Post $item)','The names must match or binding does not happen'),V.ok('.blade.php','Views need this ending to be compiled by Blade'),
 V.rh('Conventions'),
 V.ok('posts/index, posts/show','One folder per model, views named after the action'))}
${V.build(`<ol><li>Run <code>php artisan migrate</code> to create the posts table.</li><li>Run <code>php artisan db:seed</code>, read the mass assignment error, then fill in <code>$fillable</code> and seed again.</li><li>Add <code>Route::get('/posts', ...)</code> that queries published posts, newest first, and returns <code>view('posts.index', ['posts' =&gt; $posts])</code>.</li><li>Create the index view with <code>@foreach</code> and links to each post.</li><li>Add <code>/posts/{post}</code> with a <code>Post $post</code> parameter and a show view. Test /posts/1 and /posts/999.</li></ol>`)}
${V.hook(`Double curlies escape, the URL name matches the parameter, a missing row is a free 404.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which table does a model called <code>Comment</code> use? <i>comments.</i> 2. Which file does <code>view('posts.show')</code> load? <i>resources/views/posts/show.blade.php.</i> 3. What stops <code>Post::create($request-&gt;all())</code> setting any column? <i>$fillable.</i></div>
`);

explain('h6',`
<p>Phone apps, JavaScript front ends and other servers do not want HTML pages. They want raw data. A <b>REST API</b> is how your Laravel app serves that data, using URLs and HTTP methods that every developer in the world already understands.</p>

${V.card(1,'Resources and verbs','one address, five actions',`
<figure class="fig"><svg viewBox="0 0 420 206" role="img" aria-label="Five requests on the tasks resource: GET lists, POST creates, GET with an id reads one, PATCH changes, DELETE removes, each with its status code">
<text class="t-s" x="10" y="16">method</text><text class="t-s" x="104" y="16">address</text><text class="t-s" x="246" y="16">action</text><text class="t-s" x="346" y="16">status</text>
<rect class="bx-ok" x="10" y="26" width="84" height="30" rx="6"/><text class="t-b" x="52" y="47" text-anchor="middle">GET</text><text class="t-m" x="104" y="47" style="font-size:15px">/api/tasks</text><text class="t" x="246" y="47">list all</text><rect class="bx" x="346" y="26" width="64" height="30" rx="6"/><text class="t-m" x="378" y="47" text-anchor="middle">200</text>
<rect class="bx-a" x="10" y="62" width="84" height="30" rx="6"/><text class="t-b" x="52" y="83" text-anchor="middle">POST</text><text class="t-m" x="104" y="83" style="font-size:15px">/api/tasks</text><text class="t" x="246" y="83">create</text><rect class="bx" x="346" y="62" width="64" height="30" rx="6"/><text class="t-m" x="378" y="83" text-anchor="middle">201</text>
<rect class="bx-ok" x="10" y="98" width="84" height="30" rx="6"/><text class="t-b" x="52" y="119" text-anchor="middle">GET</text><text class="t-m" x="104" y="119" style="font-size:15px">/api/tasks/1</text><text class="t" x="246" y="119">read one</text><rect class="bx" x="346" y="98" width="64" height="30" rx="6"/><text class="t-m" x="378" y="119" text-anchor="middle">200</text>
<rect class="bx-info" x="10" y="134" width="84" height="30" rx="6"/><text class="t-b" x="52" y="155" text-anchor="middle">PATCH</text><text class="t-m" x="104" y="155" style="font-size:15px">/api/tasks/1</text><text class="t" x="246" y="155">change</text><rect class="bx" x="346" y="134" width="64" height="30" rx="6"/><text class="t-m" x="378" y="155" text-anchor="middle">200</text>
<rect class="bx-bad" x="10" y="170" width="84" height="30" rx="6"/><text class="t-b" x="52" y="191" text-anchor="middle">DELETE</text><text class="t-m" x="104" y="191" style="font-size:15px">/api/tasks/1</text><text class="t" x="246" y="191">remove</text><rect class="bx" x="346" y="170" width="64" height="30" rx="6"/><text class="t-m" x="378" y="191" text-anchor="middle">204</text>
</svg><figcaption>A resource is a kind of thing, here tasks. It has one address. The HTTP method says what to do, and the status code in the answer says how it went.</figcaption></figure>
${V.like(`<p>A library counter. There is one counter for books, and you can ask it different things: show me the list, add this new book, show me book 7, fix book 7's label, throw book 7 away. Same counter, different verbs. The librarian always answers with a short code: done, created, not found.</p>`)}
${V.why(`<p>Before REST, every API invented its own style: <code>/getTasks</code>, <code>/makeNewTask.php?x=1</code>. Roy Fielding described REST in 2000: use the web's own building blocks, URLs for things and HTTP methods for actions. Now any developer can guess how your API works.</p>`)}
${V.anat([[1,'PATCH'],' ',[2,'/api/tasks'],[3,'/1'],'  ',[4,'{"done": true}'],'  &#8594; ',[5,'200']],[
 '<b>Method.</b> The verb: GET reads, POST creates, PATCH changes some fields, DELETE removes.',
 '<b>Resource.</b> Plural noun, never a verb.',
 '<b>ID.</b> Which one. Leave it off to mean the whole collection.',
 '<b>JSON body.</b> Data sent with POST and PATCH.',
 '<b>Status code.</b> 2xx means success, 4xx means the client must fix something, 5xx means the server broke.'])}
${V.rules(V.rh('Rules: status codes'),
 V.ok('201 Created','After POST makes something; send the new item back'),V.ok('204 No Content','After DELETE: success, nothing to say'),
 V.ok('404 Not Found','The ID does not exist'),V.ok('422 Unprocessable Content','The data broke a validation rule'),
 V.no('200 {"error": "..."}','Never say "OK" for a failure; clients check the code'),
 V.rh('Conventions'),
 V.ok('/api/tasks/5','Plural nouns, ID in the path'),V.no('/api/deleteTask?id=5','Verbs in the URL: the method is the verb'))}
${V.hook(`Nouns in the URL, verbs in the method, the answer in the status.`)}
`)}

${V.card(2,'Create with validation','POST, validate, 201 or 422',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="A request passes a validation gate. Good data goes on to be saved with 201. Bad data is sent back with 422">
${V.ic('mail',10,60,56,'ic-info')}<text class="t-s" x="38" y="136" text-anchor="middle">request</text>
<path class="ln" d="M72 88H130"/><polygon class="ah" points="128,81 128,95 140,88"/>
<rect class="bx-warn" x="142" y="40" width="96" height="96" rx="10"/>${V.ic('shield',166,52,48,'ic-warn')}<text class="t-b" x="190" y="124" text-anchor="middle">validate</text>
<path class="ln-ok" d="M240 66 300 36"/><polygon class="ah-ok" points="296,28 308,32 302,42"/>
<rect class="bx-ok" x="310" y="12" width="100" height="52" rx="8"/><text class="t-b" x="360" y="36" text-anchor="middle">saved</text><text class="t-m" x="360" y="56" text-anchor="middle">201</text>
<path class="ln" d="M240 110 300 140"/><polygon class="ah" points="302,132 308,146 296,146"/>
<rect class="bx-bad" x="310" y="116" width="100" height="52" rx="8"/><text class="t-b" x="360" y="140" text-anchor="middle">sent back</text><text class="t-m" x="360" y="160" text-anchor="middle">422</text>
</svg><figcaption>Validation is a gate before the database. Good data goes through and is saved. Bad data is turned back with a list of what to fix.</figcaption></figure>
${V.like(`<p>A form at the post office. The clerk checks it before accepting the parcel: no address, no delivery, and you get the form back with the empty box circled. That circled box is the <b>errors</b> object in a 422 reply.</p>`)}
${V.why(`<p>Never trust what arrives over the internet. Anyone can send any JSON. Checking it by hand with lots of ifs is tedious and easy to miss, so Laravel gives you <code>$request-&gt;validate()</code> with short rules that build the error reply for you.</p>`)}
${V.anat(['$data = $request-&gt;',[1,'validate'],'([\n    \'title\' =&gt; \'',[2,'required'],'|',[3,'string'],'|',[4,'max:100'],'\',\n]);\nreturn response()-&gt;json(Task::create($data), ',[5,'201'],');'],[
 '<b>validate.</b> Checks the request. On failure it stops and replies 422 by itself. On success it returns only the checked fields.',
 '<b>required.</b> The field must be present and not empty.',
 '<b>string.</b> Must be text.',
 '<b>max:100.</b> At most 100 characters. Rules are joined with a pipe <code>|</code>.',
 '<b>Status.</b> 201 Created instead of the default 200.'])}
${V.steps([
 ['The client sends <b>POST /api/tasks</b> with the JSON body <b>{"title": "Write tests"}</b>.',`<svg viewBox="0 0 420 180" role="img" aria-label="POST request with a title">
<rect class="bx-info" x="10" y="12" width="400" height="44" rx="6"/><text class="t-m" x="22" y="40" style="font-size:15px">POST /api/tasks  {"title": "Write tests"}</text>
<rect class="bx" x="10" y="70" width="190" height="40" rx="6"/><text class="t-m" x="22" y="96" style="font-size:14px">routes/api.php</text>
<rect class="bx" x="220" y="70" width="190" height="40" rx="6"/><text class="t-m" x="232" y="96" style="font-size:14px">store()</text>
<rect class="ln-d" x="10" y="124" width="400" height="48" rx="6"/>
</svg>`],
 ['<b>routes/api.php</b> matches POST /tasks and calls <b>TaskController@store</b>. Laravel adds the /api prefix to every route in that file.',`<svg viewBox="0 0 420 180" role="img" aria-label="The route calls store">
<rect class="bx-info" x="10" y="12" width="400" height="44" rx="6"/><text class="t-m" x="22" y="40" style="font-size:15px">POST /api/tasks  {"title": "Write tests"}</text>
<rect class="bx-hl" x="10" y="70" width="190" height="40" rx="6"/><text class="t-m" x="22" y="96" style="font-size:14px">routes/api.php</text>
<path class="ln-a" d="M200 90H212"/><polygon class="ah-a" points="210,84 210,96 220,90"/>
<rect class="bx-hl" x="220" y="70" width="190" height="40" rx="6"/><text class="t-m" x="232" y="96" style="font-size:14px">store()</text>
<rect class="ln-d" x="10" y="124" width="400" height="48" rx="6"/>
</svg>`],
 ['<b>validate()</b> checks the rules. title is there, it is text and it is short. Passed.',`<svg viewBox="0 0 420 180" role="img" aria-label="Validation passes">
<rect class="bx-info" x="10" y="12" width="400" height="44" rx="6"/><text class="t-m" x="22" y="40" style="font-size:15px">POST /api/tasks  {"title": "Write tests"}</text>
<rect class="bx" x="10" y="70" width="190" height="40" rx="6"/><text class="t-m" x="22" y="96" style="font-size:14px">routes/api.php</text>
<rect class="bx-ok" x="220" y="70" width="190" height="40" rx="6"/><text class="t-m" x="232" y="96" style="font-size:14px">store()</text>${V.ic('check',374,76,28,'ic-ok')}
<rect class="ln-d" x="10" y="124" width="400" height="48" rx="6"/><text class="t" x="22" y="154">required ok, string ok, max:100 ok</text>
</svg>`],
 ['<b>Task::create()</b> saves the row and the controller replies <b>201 Created</b> with the new task as JSON, including its new id.',`<svg viewBox="0 0 420 180" role="img" aria-label="201 Created with the new task">
<rect class="bx-info" x="10" y="12" width="400" height="44" rx="6"/><text class="t-m" x="22" y="40" style="font-size:15px">POST /api/tasks  {"title": "Write tests"}</text>
<rect class="bx" x="10" y="70" width="190" height="40" rx="6"/><text class="t-m" x="22" y="96" style="font-size:14px">routes/api.php</text>
<rect class="bx-ok" x="220" y="70" width="190" height="40" rx="6"/><text class="t-m" x="232" y="96" style="font-size:14px">store()</text>
<rect class="bx-ok" x="10" y="124" width="400" height="48" rx="6"/><text class="t-m" x="22" y="154" style="font-size:14px"><tspan class="t-ok" style="font-weight:700">201</tspan> {"id": 1, "title": "Write tests"}</text>
</svg>`],
 ['Now the client sends an <b>empty body</b>. validate() fails, stops the method and replies <b>422</b> with an errors object naming each bad field.',`<svg viewBox="0 0 420 180" role="img" aria-label="Empty body gives 422 with errors">
<rect class="bx-info" x="10" y="12" width="400" height="44" rx="6"/><text class="t-m" x="22" y="40" style="font-size:15px">POST /api/tasks  {}</text>
<rect class="bx" x="10" y="70" width="190" height="40" rx="6"/><text class="t-m" x="22" y="96" style="font-size:14px">routes/api.php</text>
<rect class="bx-bad" x="220" y="70" width="190" height="40" rx="6"/><text class="t-m" x="232" y="96" style="font-size:14px">store()</text>${V.ic('cross',374,76,28,'ic-bad')}
<rect class="bx-bad" x="10" y="124" width="400" height="48" rx="6"/><text class="t-m" x="22" y="144" style="font-size:14px"><tspan class="t-bad" style="font-weight:700">422</tspan> "errors": {"title": [</text><text class="t-m" x="22" y="164" style="font-size:14px">  "The title field is required."]}</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('[TaskController::class, \'store\']','A route points at a controller class and method name'),V.no('Task::create($request-&gt;all())','Skips validation; save $data from validate() instead'),
 V.ok('\'done\' =&gt; \'boolean\'','Validate every field you accept, not just required ones'),
 V.rh('Conventions'),
 V.ok('index, store, show, update, destroy','Laravel\'s standard names for the five actions'),V.ok('php artisan install:api','On Laravel 11 and later, creates routes/api.php'))}
${V.hook(`Validate at the gate: pass gets 201, fail gets 422 with the reasons.`)}
`)}

${V.card(3,'Read, update, delete','the life of one task',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Task 1 is created, marked done, then deleted. Asking for it afterwards gives 404">
<rect class="bx-ok" x="10" y="30" width="90" height="70" rx="8"/>${V.ic('card',33,36,44,'ic-ok')}<text class="t-s" x="55" y="94" text-anchor="middle">created</text>
<rect class="bx-info" x="116" y="30" width="90" height="70" rx="8"/>${V.ic('check',139,36,44,'ic-info')}<text class="t-s" x="161" y="94" text-anchor="middle">done</text>
<rect class="bx-bad" x="222" y="30" width="90" height="70" rx="8"/>${V.ic('cross',245,36,44,'ic-bad')}<text class="t-s" x="267" y="94" text-anchor="middle">deleted</text>
<rect class="ln-d" x="328" y="30" width="82" height="70" rx="8"/><text class="t-b" x="369" y="72" text-anchor="middle">404</text>
<text class="t-m" x="55" y="128" text-anchor="middle" style="font-size:14px">POST</text><text class="t-m" x="161" y="128" text-anchor="middle" style="font-size:14px">PATCH</text><text class="t-m" x="267" y="128" text-anchor="middle" style="font-size:14px">DELETE</text><text class="t-m" x="369" y="128" text-anchor="middle" style="font-size:14px">GET</text>
</svg><figcaption>One task's life told in four requests. After the delete, the same address answers 404.</figcaption></figure>
${V.steps([
 ['<b>PATCH /api/tasks/1</b> with <b>{"done": true}</b>. Route-model binding finds task 1; update() changes only that field and returns the task with 200.',`<svg viewBox="0 0 420 140" role="img" aria-label="PATCH marks task 1 done">
<rect class="bx-info" x="10" y="12" width="400" height="40" rx="6"/><text class="t-m" x="22" y="38" style="font-size:15px">PATCH /api/tasks/1  {"done": true}</text>
<rect class="bx-ok" x="10" y="70" width="400" height="56" rx="6"/><text class="t-m" x="22" y="104" style="font-size:14px"><tspan class="t-ok" style="font-weight:700">200</tspan> {"id": 1, "done": true, ...}</text>
</svg>`],
 ['<b>DELETE /api/tasks/1</b>. destroy() deletes the row and returns <b>response()-&gt;noContent()</b>: status 204 and an empty body.',`<svg viewBox="0 0 420 140" role="img" aria-label="DELETE returns 204">
<rect class="bx-info" x="10" y="12" width="400" height="40" rx="6"/><text class="t-m" x="22" y="38" style="font-size:15px">DELETE /api/tasks/1</text>
<rect class="bx-ok" x="10" y="70" width="400" height="56" rx="6"/><text class="t-m" x="22" y="104" style="font-size:14px"><tspan class="t-ok" style="font-weight:700">204</tspan> (empty body)</text>
</svg>`],
 ['<b>GET /api/tasks/1</b> again. The row is gone, so binding cannot find it and Laravel answers <b>404</b> before show() even runs.',`<svg viewBox="0 0 420 140" role="img" aria-label="GET after delete returns 404">
<rect class="bx-info" x="10" y="12" width="400" height="40" rx="6"/><text class="t-m" x="22" y="38" style="font-size:15px">GET /api/tasks/1</text>
<rect class="bx-bad" x="10" y="70" width="400" height="56" rx="6"/><text class="t-m" x="22" y="104" style="font-size:14px"><tspan class="t-bad" style="font-weight:700">404</tspan> Not Found</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('function show(Task $task)','Typed parameter + {task} in the URL = automatic lookup and 404'),V.ok('return $task;','Returning a model sends it as JSON with 200'),
 V.no('PATCH with \'title\' =&gt; \'required\'','A partial update should not demand every field'),
 V.rh('Conventions'),
 V.ok('PATCH for some fields','PUT traditionally replaces the whole item'),V.ok('$casts = [\'done\' =&gt; \'boolean\']','So JSON shows true, not 1'))}
${V.build(`<ol><li>Run <code>php artisan migrate</code> to create the tasks table.</li><li>Add the POST route and write <code>store()</code>: validate, create, return JSON with 201. Test with a title, then with an empty body.</li><li>Add <code>GET /tasks</code> and <code>GET /tasks/{task}</code>; test ids 1 and 999.</li><li>Add PATCH and DELETE routes with <code>update()</code> and <code>destroy()</code>.</li><li>Send PATCH, then DELETE, then GET the same task and watch 200, 204, 404.</li></ol>`)}
${V.hook(`Created 201, deleted 204, missing 404, wrong data 422.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which method and URL list every task? <i>GET /api/tasks.</i> 2. What status should a successful DELETE return? <i>204 No Content.</i> 3. A POST arrives without a required title. What does Laravel reply? <i>422 with an errors object.</i></div>
`);
