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
<rect class="bx-hl" x="246" y="32" width="96" height="52" rx="6"/><text class="t-m" x="294" y="64" text-anchor="middle" style="font-size:17px">eggs</text>
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
<h4>Why PHP needs a package manager</h4>
<p>As soon as a project grows past one file, two problems appear.</p>
<ol>
<li><b>Loading your own files.</b> Each class lives in its own file. Before PHP can use a class, the file that defines it must be loaded, traditionally with a line like <code>require 'src/Models/Product.php';</code>. With fifty classes you need fifty of those lines, in the right order, and one wrong path breaks everything.</li>
<li><b>Using other people's code.</b> Nobody writes their own logging, email sending or date handling from scratch. Thousands of free, tested libraries exist. But downloading them by hand, keeping track of versions, and making sure your teammate has exactly the same versions is a nightmare.</li>
</ol>
<p><b>Composer</b> solves both. It is PHP's <b>package manager</b>: a command-line tool that downloads libraries (called <b>packages</b> or <b>dependencies</b>) and generates an <b>autoloader</b>, a small piece of code that loads each class file automatically the first time you use it. Packages come from <b>Packagist</b>, the public directory at packagist.org. Every Laravel and Symfony project starts with Composer.</p>

<h4>Namespaces: surnames for classes</h4>
<p>Before autoloading makes sense, you need <b>namespaces</b>. Two libraries might both have a class called <code>Logger</code>. A namespace is like a surname that keeps them apart: <code>Monolog\\Logger</code> and <code>App\\Logger</code> are different classes. The parts are separated by backslashes.</p>
<p>Look at the two files this lesson gives you in <code>~/shop</code>:</p>
<pre class="snip">// src/Models/Product.php
namespace App\\Models;       // everything below lives in App\\Models
class Product { ... }       // full name: App\\Models\\Product

// index.php
use App\\Models\\Product;    // "when I say Product, I mean this one"
$p = new Product('Keyboard', 49.5);</pre>
<p>The <code>namespace</code> line gives every class in that file its surname. The <code>use</code> line in another file is a shortcut: it lets you write the short name <code>Product</code> instead of the full <code>App\\Models\\Product</code> every time. <code>use</code> does <b>not</b> load anything. It only tells PHP what a name means.</p>

<h4>The first error: no autoloader yet</h4>
<p>The top of <code>index.php</code> says:</p>
<pre class="snip">require __DIR__ . '/vendor/autoload.php';</pre>
<p><code>require</code> means "load and run this other PHP file, and stop with a fatal error if it is missing". <code>__DIR__</code> is a built-in constant holding the folder the current file sits in, so the path works no matter where you run the script from. The file <code>vendor/autoload.php</code> is the one Composer generates. In this lesson it does not exist yet, so running <code>php index.php</code> fails with an error about failing to open <code>vendor/autoload.php</code>. On real PHP you would see "Failed to open stream: No such file or directory" followed by "Failed opening required". The fix is never to create that file by hand: you let Composer build it.</p>

<h4>composer.json and the PSR-4 rule</h4>
<p>Every Composer project has a file called <code>composer.json</code> in its root folder. It is written in JSON, a simple text format of keys and values in curly braces. It records two things: which packages the project needs, and how to find your own classes.</p>
<pre class="snip">{
    "name": "you/shop",
    "require": {},
    "autoload": {
        "psr-4": { "App\\\\": "src/" }
    }
}</pre>
<p>The <code>autoload</code> section uses a standard called <b>PSR-4</b>, agreed by the PHP community so every project finds classes the same way. The rule <code>"App\\\\": "src/"</code> says: "classes whose name starts with <code>App\\</code> live in the <code>src/</code> folder". The backslash is written twice because in JSON a single backslash starts a special code, so <code>\\\\</code> stands for one real backslash.</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="PSR-4 turns the class name App Models Product into the path src/Models/Product.php">
<text class="t-s" x="190" y="16" text-anchor="middle">class name</text>
<rect class="bx-a" x="40" y="24" width="80" height="40" rx="6"/><text class="t-m" x="80" y="50" text-anchor="middle">App\\</text>
<rect class="bx-info" x="120" y="24" width="110" height="40" rx="6"/><text class="t-m" x="175" y="50" text-anchor="middle">Models\\</text>
<rect class="bx-ok" x="230" y="24" width="110" height="40" rx="6"/><text class="t-m" x="285" y="50" text-anchor="middle">Product</text>
<path class="ln-a" d="M80 64L62 112"/><polygon class="ah-a" points="56,110 68,112 60,120"/>
<path class="ln" d="M175 64L157 112"/><polygon class="ah" points="151,110 163,112 155,120"/>
<path class="ln-ok" d="M285 64V112"/><polygon class="ah-ok" points="279,112 291,112 285,120"/>
<text class="t-s" x="296" y="96">add .php</text>
<rect class="bx-a" x="20" y="120" width="80" height="40" rx="6"/><text class="t-m" x="60" y="146" text-anchor="middle">src/</text>
<rect class="bx-info" x="100" y="120" width="110" height="40" rx="6"/><text class="t-m" x="155" y="146" text-anchor="middle">Models/</text>
<rect class="bx-ok" x="210" y="120" width="150" height="40" rx="6"/><text class="t-m" x="285" y="146" text-anchor="middle">Product.php</text>
<text class="t-s" x="210" y="184" text-anchor="middle">The prefix App\\ is swapped for src/</text>
<text class="t-s" x="210" y="202" text-anchor="middle">The rest of the name becomes folders and a file</text>
</svg><figcaption>How PSR-4 finds a file. The prefix App backslash is replaced by the folder src. Each remaining part of the name becomes a folder, and the last part, the class name, becomes the file name with .php added.</figcaption></figure>
<p>Work through it for <code>App\\Models\\Product</code>:</p>
<ol>
<li>Does the name start with a known prefix? Yes, <code>App\\</code>, which maps to <code>src/</code>.</li>
<li>Remove the prefix. What remains is <code>Models\\Product</code>.</li>
<li>Turn the backslashes into forward slashes: <code>Models/Product</code>.</li>
<li>Add <code>.php</code> and put the folder in front: <code>src/Models/Product.php</code>.</li>
</ol>
<p>So the rule only works if your files follow it: one class per file, the file named exactly like the class, and folders matching the namespace. On Linux servers file names are case-sensitive, so <code>product.php</code> will not be found for the class <code>Product</code>.</p>
<p>To create <code>composer.json</code>, run <code>composer init</code>. On a real machine it asks a series of questions (package name, description, dependencies, and whether to add a PSR-4 mapping). The <code>--name you/shop</code> option answers the name question up front. This sandbox skips the questions and adds the <code>App\\</code> to <code>src/</code> rule for you. On a real machine Composer suggests a namespace based on the package name, such as <code>You\\Shop\\</code>, so you would type <code>App</code> instead, or edit the file afterwards.</p>

<h4>Generating the autoloader</h4>
<p><code>composer dump-autoload</code> reads the <code>autoload</code> section and writes the <code>vendor/</code> folder with <code>vendor/autoload.php</code> inside it. Once that file exists, here is what happens when <code>index.php</code> runs:</p>
<ol>
<li><code>require</code> loads <code>vendor/autoload.php</code>, which registers Composer's autoloader with PHP.</li>
<li>PHP reaches <code>new Product(...)</code>. Thanks to <code>use</code>, it knows this means <code>App\\Models\\Product</code>, but that class is not loaded yet.</li>
<li>Instead of failing, PHP asks the autoloader. The autoloader applies the PSR-4 rule, finds <code>src/Models/Product.php</code>, and loads it.</li>
<li>The class now exists, the object is built, and the script prints <code>Keyboard ($49.50)</code>.</li>
</ol>
<p>Files are only loaded when a class is first used, so big projects stay fast. You need to run <code>dump-autoload</code> again whenever you change the <code>autoload</code> section of <code>composer.json</code>. Adding a new class file inside an existing mapped folder does not need it: the PSR-4 rule simply finds the new file.</p>

<h4>Installing a package: <code>composer require</code></h4>
<p>Now for other people's code. <b>Monolog</b> is the most popular PHP logging library, and Laravel uses it internally. Packages are named <code>vendor/package</code>, where "vendor" means the publisher, so Monolog is <code>monolog/monolog</code>. One command does all the work:</p>
<pre class="snip">composer require monolog/monolog</pre>
<p>Behind the scenes Composer:</p>
<ol>
<li>adds <code>"monolog/monolog": "^3.7"</code> (or whatever is current) to the <code>require</code> section of <code>composer.json</code>;</li>
<li>works out exact versions of Monolog and anything Monolog itself needs;</li>
<li>writes those exact versions into <code>composer.lock</code>;</li>
<li>downloads the code into <code>vendor/</code> and regenerates the autoloader, so Monolog's classes load automatically too.</li>
</ol>
<p>The caret in <code>^3.7</code> is a <b>version constraint</b>: "3.7 or any newer 3.x version, but not 4.0". Major version numbers change when a library makes breaking changes, so the caret accepts safe updates and refuses risky ones.</p>
<figure class="fig"><svg viewBox="0 0 420 236" role="img" aria-label="composer.json and composer.lock are committed, vendor is ignored">
<rect class="bx-ok" x="20" y="10" width="190" height="50" rx="8"/><text class="t-m" x="115" y="32" text-anchor="middle">composer.json</text><text class="t-s" x="115" y="52" text-anchor="middle">ranges you asked for</text>
<path class="ln" d="M115 60V82"/><polygon class="ah" points="109,82 121,82 115,90"/><text class="t-s" x="126" y="80">resolve</text>
<rect class="bx-ok" x="20" y="90" width="190" height="50" rx="8"/><text class="t-m" x="115" y="112" text-anchor="middle">composer.lock</text><text class="t-s" x="115" y="132" text-anchor="middle">exact versions</text>
<path class="ln" d="M115 140V162"/><polygon class="ah" points="109,162 121,162 115,170"/><text class="t-s" x="126" y="160">download</text>
<rect class="bx-warn" x="20" y="170" width="190" height="50" rx="8"/><text class="t-m" x="115" y="192" text-anchor="middle">vendor/</text><text class="t-s" x="115" y="212" text-anchor="middle">the library code</text>
<path class="ln-d" d="M210 35H280M210 115H280M210 195H280"/>
<text class="t-b t-ok" x="290" y="40">commit</text>
<text class="t-b t-ok" x="290" y="120">commit</text>
<text class="t-b t-bad" x="290" y="200">ignore</text>
<text class="t-s" x="290" y="220">in .gitignore</text>
</svg><figcaption>composer.json holds the version ranges you asked for. Composer resolves them into exact versions in composer.lock, then downloads the code into vendor. The first two files go into Git; vendor is listed in .gitignore because anyone can rebuild it.</figcaption></figure>
<p>Using the library then looks like any other class: add <code>use Monolog\\Logger;</code> and <code>use Monolog\\Handler\\StreamHandler;</code> at the top, create a logger with a channel name such as <code>'app'</code>, attach a handler that says where messages go (<code>'php://stdout'</code> means "straight to the terminal"), and call a method named after the severity level, such as <code>info()</code>. Monolog prints each message with a timestamp, the channel and level (<code>app.INFO</code>), your message, and any extra details you passed as an array.</p>

<h4>What goes into Git: lock file yes, vendor no</h4>
<ul>
<li><b>Commit <code>composer.json</code></b>: it says what the project needs.</li>
<li><b>Commit <code>composer.lock</code></b>: it pins the exact versions. When a teammate or server runs <code>composer install</code>, Composer reads the lock file and installs precisely those versions, so everyone runs identical code.</li>
<li><b>Ignore <code>vendor/</code></b>: it is large, it is generated, and <code>composer install</code> recreates it anywhere.</li>
</ul>
<p>Know the difference between the commands: <code>composer install</code> follows the lock file exactly; <code>composer update</code> looks for newer versions within your ranges and rewrites the lock file; <code>composer require</code> adds a new package.</p>
<div class="mistake"><b>Common mistake</b>Changing the namespace or moving a file without matching the PSR-4 rule, then getting <b>Class "App\\Models\\Product" not found</b>. Check three things: the <code>namespace</code> line in the file, the folder path, and the exact file name with its capital letters.</div>
<div class="mistake"><b>Common mistake</b>Editing files inside <code>vendor/</code> to fix a library. The next <code>composer install</code> wipes your change. Fix it in your own code, or contribute the fix to the library.</div>

<h4>Reading the errors you will hit</h4>
<ul>
<li><b>Failed opening required 'vendor/autoload.php'</b>: the autoloader has not been generated. Run <code>composer install</code> or <code>composer dump-autoload</code>.</li>
<li><b>Composer could not find a composer.json file</b>: you are in the wrong folder, or have not run <code>composer init</code>.</li>
<li><b>Could not find a matching version of package</b>: the package name is misspelt or does not exist on Packagist.</li>
</ul>
<div class="try"><b>Try it in your head</b>With the rule <code>"App\\\\": "src/"</code>, where must the class <code>App\\Services\\Mailer</code> live? Strip <code>App\\</code>, turn <code>Services\\Mailer</code> into <code>Services/Mailer</code>, add <code>.php</code> and the folder: <code>src/Services/Mailer.php</code>.</div>

<h4>Recap</h4>
<ul>
<li>Composer downloads packages from Packagist into <code>vendor/</code> and generates <code>vendor/autoload.php</code>.</li>
<li>Namespaces are surnames for classes; <code>use</code> creates a short name and loads nothing.</li>
<li>PSR-4 maps a namespace prefix to a folder, so <code>App\\Models\\Product</code> lives in <code>src/Models/Product.php</code>.</li>
<li><code>composer dump-autoload</code> rebuilds the autoloader; <code>composer require vendor/package</code> adds a library.</li>
<li>Commit <code>composer.json</code> and <code>composer.lock</code>; ignore <code>vendor/</code> and rebuild it with <code>composer install</code>.</li>
</ul>
`);

explain('h4',`
<h4>Why PHP needs a database</h4>
<p>Everything a PHP script holds in variables disappears when the request ends. The next visitor starts with a blank slate. To remember users, orders and posts between requests, you need somewhere permanent to keep them. That is a <b>database</b>: a program that stores data on disk and answers questions about it quickly and safely, even when many people use it at once.</p>
<p>Most PHP apps use a <b>relational database</b> such as MySQL, MariaDB, PostgreSQL or SQLite. Data lives in <b>tables</b>, which are like spreadsheets: each <b>row</b> is one record (one user), and each <b>column</b> is one field (name, email, role). You talk to the database in <b>SQL</b>, a language of short commands:</p>
<pre class="snip">SELECT id, name FROM users;                        -- read rows
SELECT * FROM users WHERE email = 'ada@example.com';  -- only matching rows
INSERT INTO users (name, email) VALUES ('Linus', 'l@x.com');  -- add a row</pre>
<p>(In SQL, two dashes start a comment, like <code>//</code> in PHP.) This lesson's database already holds a <code>users</code> table with three people in it. Its <code>email</code> column is marked <b>UNIQUE</b>, which means the database refuses a second row with the same email.</p>

<h4>PDO: one way to talk to many databases</h4>
<p><b>PDO</b> stands for PHP Data Objects. It is the database layer built into PHP, and it works the same way whichever database sits behind it. Laravel's database code is built on top of it. You start by creating a connection object:</p>
<pre class="snip">$pdo = new PDO('mysql:host=localhost;dbname=shop', 'shop_user', 'secret');
$pdo-&gt;setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo-&gt;setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);</pre>
<p>Line by line:</p>
<ul>
<li>The first argument is the <b>DSN</b> (data source name): which kind of database (<code>mysql</code>), which computer it runs on (<code>localhost</code> means this same machine) and which database to use (<code>shop</code>). Then come a username and a password. In a real app these come from a settings file or environment variables, never typed into code you commit.</li>
<li><code>ERRMODE_EXCEPTION</code> tells PDO to <b>throw an exception</b> when something goes wrong. An exception is PHP's way of stopping normal flow and shouting "this failed", which you can catch and handle. It has been the default since PHP 8.0, but setting it explicitly is a common habit that makes the intent clear.</li>
<li><code>FETCH_ASSOC</code> makes every row come back as an associative array, like <code>['id' =&gt; 1, 'name' =&gt; 'Ada Lovelace', ...]</code>, keyed by column name. You learned to work with those in the arrays lesson.</li>
</ul>
<p>The <code>::</code> in <code>PDO::ATTR_ERRMODE</code> reads a <b>constant</b>, a fixed named value that belongs to the class itself rather than to one object.</p>
<div class="tip"><b>Tip</b>The DSN here says <code>mysql</code>, but the lesson's sandbox quietly runs SQLite in your browser. Your PDO code is exactly the same either way, which is the whole point of PDO.</div>

<h4>Reading rows</h4>
<p>For a fixed query with no outside input, <code>query()</code> runs the SQL straight away and returns a <b>statement</b> object holding the results. <code>fetchAll()</code> then gives you every row as an array of arrays:</p>
<pre class="snip">$users = $pdo-&gt;query('SELECT id, name, email FROM users ORDER BY id')-&gt;fetchAll();
// $users[0] is ['id' =&gt; 1, 'name' =&gt; 'Ada Lovelace', 'email' =&gt; ...]</pre>
<p>Notice the two arrows in a row: <code>query()</code> returns a statement, and <code>-&gt;fetchAll()</code> is called on that result straight away. Because <code>$users</code> is an ordinary PHP array, <code>count($users)</code> tells you how many rows came back. That is the first task.</p>

<h4>The danger: building SQL out of user input</h4>
<p>Now suppose you want one user by email, and the email comes from a login form. The obvious approach is to glue the input into the SQL text:</p>
<pre class="snip">// NEVER do this
$pdo-&gt;query("SELECT * FROM users WHERE email = '$email'");</pre>
<p>This works for honest input. But the database receives one long string and cannot tell which parts you wrote and which parts the visitor typed. So a visitor can type SQL. Watch what happens when someone enters <code>' OR '1'='1</code> as their email:</p>
<figure class="fig"><svg viewBox="0 0 420 280" role="img" aria-label="String building lets input become SQL; a prepared statement keeps it as data">
<text class="t-b t-bad" x="10" y="20">Gluing text together</text>
<rect class="bx-bad" x="10" y="30" width="400" height="44" rx="6"/>
<text class="t-m" x="210" y="57" text-anchor="middle">WHERE email = '' OR '1'='1'</text>
<text class="t-s t-bad" x="210" y="94" text-anchor="middle">The input became SQL: every row matches</text>
<text class="t-b t-ok" x="10" y="130">Prepared statement</text>
<rect class="bx-ok" x="10" y="140" width="220" height="40" rx="6"/><text class="t-m" x="120" y="165" text-anchor="middle">email = :email</text>
<rect class="bx-info" x="250" y="140" width="160" height="40" rx="6"/><text class="t-m" x="330" y="165" text-anchor="middle">' OR '1'='1</text>
<path class="ln-ok" d="M120 180L186 208"/><polygon class="ah-ok" points="182,202 188,213 192,204"/>
<path class="ln" d="M330 180L244 208"/><polygon class="ah" points="238,204 242,213 248,202"/>
<text class="t-s" x="64" y="204" text-anchor="middle">SQL first</text>
<text class="t-s" x="368" y="204" text-anchor="middle">value later</text>
<rect class="bx" x="140" y="214" width="140" height="36" rx="6"/><text class="t-b" x="210" y="237" text-anchor="middle">Database</text>
<text class="t-s t-ok" x="210" y="272" text-anchor="middle">The input is only data: no email matches it</text>
</svg><figcaption>Top: when the input is glued into the SQL, its quote marks end the email text early and the words OR one equals one become part of the query, so every user matches. Bottom: a prepared statement sends the SQL first and the value separately, so the database only ever compares emails with that odd text.</figcaption></figure>
<p>Step by step, the glued query becomes <code>WHERE email = '' OR '1'='1'</code>. The visitor's first quote mark closed the email text early. The rest, <code>OR '1'='1'</code>, is now SQL, and because one always equals one, the condition is true for every row. The attacker gets every user. With other inputs they could read other tables or delete data. This attack is called <b>SQL injection</b>, and it has been behind some of the largest data breaches in history.</p>

<h4>Prepared statements: the SQL and the data travel separately</h4>
<p>The fix is a <b>prepared statement</b>. You send the SQL with <b>placeholders</b>, marked gaps where values will go, and send the values in a separate step. It happens in three moves:</p>
<figure class="fig"><svg viewBox="0 0 420 136" role="img" aria-label="Three steps: prepare, execute, fetch">
<text class="t-b" x="70" y="18" text-anchor="middle">1</text><text class="t-b" x="210" y="18" text-anchor="middle">2</text><text class="t-b" x="350" y="18" text-anchor="middle">3</text>
<rect class="bx-a" x="10" y="28" width="120" height="44" rx="6"/><text class="t-m" x="70" y="55" text-anchor="middle">prepare()</text>
<path class="ln" d="M130 50H142"/><polygon class="ah" points="142,44 142,56 150,50"/>
<rect class="bx-info" x="150" y="28" width="120" height="44" rx="6"/><text class="t-m" x="210" y="55" text-anchor="middle">execute()</text>
<path class="ln" d="M270 50H282"/><polygon class="ah" points="282,44 282,56 290,50"/>
<rect class="bx-ok" x="290" y="28" width="120" height="44" rx="6"/><text class="t-m" x="350" y="55" text-anchor="middle">fetch()</text>
<text class="t-s" x="70" y="94" text-anchor="middle">SQL with gaps</text>
<text class="t-s" x="210" y="94" text-anchor="middle">fill the gaps</text>
<text class="t-s" x="350" y="94" text-anchor="middle">read a row</text>
<text class="t-s" x="210" y="126" text-anchor="middle">$stmt holds the prepared query between the steps</text>
</svg><figcaption>A prepared statement in three steps. Prepare sends the SQL with gaps and gets back a statement. Execute fills the gaps with your values. Fetch reads the resulting rows one at a time.</figcaption></figure>
<pre class="snip">$stmt = $pdo-&gt;prepare('SELECT id, name, email FROM users WHERE email = :email');
$stmt-&gt;execute(['email' =&gt; $email]);   // the value goes here
$user = $stmt-&gt;fetch();                 // one row, or false if none</pre>
<p>The database reads and plans the query <b>before</b> it ever sees the value. When the value arrives, it can only fill the gap as data. Quote marks in it are just characters to compare, so the injection attempt simply finds no user with that strange email.</p>
<p>There are two placeholder styles. <b>Named</b> placeholders start with a colon, like <code>:email</code>, and you pass an associative array whose keys match the names. <b>Positional</b> placeholders are question marks, and you pass a plain list in the same order: <code>prepare('INSERT INTO users (name, email) VALUES (?, ?)')</code> then <code>execute([$name, $email])</code>. Pick one style per query; you cannot mix them.</p>
<p><code>fetch()</code> returns the next row, or <code>false</code> when there are no rows left. A function that looks up one user should therefore promise <code>?array</code>: the question mark makes the type <b>nullable</b>, meaning "an array, or <code>null</code>". A neat way to convert the <code>false</code> into <code>null</code> is <code>return $user ?: null;</code>. The <code>?:</code> operator gives the left side if it counts as true, otherwise the right side.</p>

<h4>Inserting rows and getting the new id</h4>
<p>Inserting uses exactly the same prepare and execute steps. Most tables have an <code>id</code> column that the database numbers automatically, so after inserting you often want to know which number the new row received. <code>$pdo-&gt;lastInsertId()</code> tells you. It returns the id as a <b>string</b>, though, so a function promising <code>: int</code> should convert it with <code>(int)</code>, which is called a <b>cast</b>: <code>return (int) $pdo-&gt;lastInsertId();</code>.</p>

<h4>When the database says no: catching exceptions</h4>
<p>Try to insert a second user with <code>ada@example.com</code> and the UNIQUE rule refuses. Because of <code>ERRMODE_EXCEPTION</code>, PDO throws a <code>PDOException</code>. If nothing catches it, your script stops with a fatal error. To handle it, wrap the risky code in <code>try</code> and say what to do in <code>catch</code>:</p>
<pre class="snip">try {
    // code that might fail
} catch (PDOException $e) {
    // runs only if a PDOException was thrown above
    echo "Could not create user\\n";
}</pre>
<p>PHP runs the <code>try</code> block. If an exception of that type is thrown, it jumps straight to the <code>catch</code> block, with the exception in <code>$e</code>; <code>$e-&gt;getMessage()</code> holds the database's explanation. If nothing is thrown, the <code>catch</code> block is skipped. Show visitors a friendly message and write the technical details to a log, because raw database errors can reveal your table structure to an attacker.</p>
<div class="mistake"><b>Common mistake</b>Putting quotes around a placeholder: <code>WHERE email = ':email'</code>. Inside quotes it is no longer a placeholder, just the literal text ":email", so nothing matches and PDO may complain about a parameter that is not defined. Placeholders are always bare.</div>
<div class="mistake"><b>Common mistake</b>Trying to use a placeholder for a table or column name, such as <code>ORDER BY :column</code>. Placeholders only stand in for <b>values</b>. If a column name must vary, check it against a fixed list of allowed names in PHP first.</div>

<h4>Reading the errors you will hit</h4>
<ul>
<li><b>SQLSTATE[23000]: Integrity constraint violation</b>: a rule such as UNIQUE was broken. SQLite words it "UNIQUE constraint failed: users.email"; MySQL says "Duplicate entry".</li>
<li><b>SQLSTATE[HY093]: Invalid parameter number</b>: the placeholders and the values you passed to <code>execute()</code> do not match up.</li>
<li><b>no such table</b> or <b>Table doesn't exist</b>: a typo in the table name, or the wrong database.</li>
</ul>
<div class="try"><b>Try it in your head</b>A search box runs <code>$pdo-&gt;prepare('SELECT * FROM users WHERE name = ?')</code> and then <code>execute([$search])</code>. A visitor types <code>x'; DROP TABLE users; --</code>. What happens? Nothing bad: the whole text is compared as a name, no user has that name, and you get zero rows.</div>

<h4>Recap</h4>
<ul>
<li><code>new PDO($dsn, $user, $pass)</code> connects; set <code>ERRMODE_EXCEPTION</code> and <code>FETCH_ASSOC</code> straight after.</li>
<li>Gluing input into SQL allows SQL injection, where the input turns into commands.</li>
<li>Prepared statements send SQL with placeholders (<code>:email</code> or <code>?</code>) first and the values separately via <code>execute()</code>.</li>
<li><code>fetch()</code> gives one row or <code>false</code>, <code>fetchAll()</code> gives all rows, and <code>lastInsertId()</code> gives the new id as a string.</li>
<li>Wrap risky database calls in <code>try</code> and <code>catch (PDOException $e)</code>, and show users a friendly message.</li>
</ul>
`);

explain('h5',`
<h4>Why use a framework</h4>
<p>Every web app needs the same plumbing: work out which code should handle each URL, read and write the database, fill HTML templates, check form input and defend against common attacks. You could build all of that yourself with the PHP you know. It would take months, and your homemade security would probably have holes.</p>
<p>A <b>framework</b> is a ready-made structure that already does the plumbing. You fill in the parts that make your app unique. <b>Laravel</b> is the most popular PHP framework. Its big idea is <b>convention over configuration</b>: if you put files where Laravel expects and name them the way it expects, things connect by themselves, without long settings files.</p>
<div class="tbl-wrap"><table><tr><th>Folder or file</th><th>What lives there</th></tr>
<tr><td><code>routes/web.php</code></td><td>Which code answers which URL</td></tr>
<tr><td><code>app/Models/</code></td><td>Model classes, one per database table</td></tr>
<tr><td><code>database/migrations/</code></td><td>Step-by-step instructions to build tables</td></tr>
<tr><td><code>database/seeders/</code></td><td>Code that fills tables with starter data</td></tr>
<tr><td><code>resources/views/</code></td><td>Blade templates that become HTML</td></tr></table></div>
<p>This lesson's <code>blog</code> project has all of these, apart from the views, which you create.</p>

<h4>The journey of a request</h4>
<p>When someone visits <code>/posts</code>, the request passes through the pieces in a fixed order. Keep this picture in mind for the rest of the lesson:</p>
<figure class="fig"><svg viewBox="0 0 420 256" role="img" aria-label="A request goes to the route, the model and database, the Blade view, and back as HTML">
<rect class="bx-info" x="140" y="10" width="170" height="36" rx="6"/><text class="t-m" x="225" y="33" text-anchor="middle">GET /posts</text>
<text class="t-s" x="130" y="33" text-anchor="end">browser asks</text>
<path class="ln" d="M225 46v6"/><polygon class="ah" points="219,52 231,52 225,60"/>
<rect class="bx-a" x="140" y="60" width="170" height="36" rx="6"/><text class="t-m" x="225" y="83" text-anchor="middle">routes/web.php</text>
<text class="t-s" x="130" y="83" text-anchor="end">route matches</text>
<path class="ln" d="M225 96v6"/><polygon class="ah" points="219,102 231,102 225,110"/>
<rect class="bx" x="140" y="110" width="170" height="36" rx="6"/><text class="t" x="225" y="133" text-anchor="middle">Post model</text>
<text class="t-s" x="130" y="133" text-anchor="end">model queries</text>
<path class="ln" d="M318 128H332"/><polygon class="ah" points="318,122 318,134 310,128"/><polygon class="ah" points="332,122 332,134 340,128"/>
<rect class="bx" x="340" y="110" width="72" height="36" rx="6"/><text class="t-s" x="376" y="133" text-anchor="middle">database</text>
<path class="ln" d="M225 146v6"/><polygon class="ah" points="219,152 231,152 225,160"/>
<rect class="bx-warn" x="140" y="160" width="170" height="36" rx="6"/><text class="t" x="225" y="183" text-anchor="middle">Blade view</text>
<text class="t-s" x="130" y="183" text-anchor="end">view renders</text>
<path class="ln-ok" d="M225 196v6"/><polygon class="ah-ok" points="219,202 231,202 225,210"/>
<rect class="bx-ok" x="140" y="210" width="170" height="36" rx="6"/><text class="t" x="225" y="233" text-anchor="middle">HTML page</text>
<text class="t-s" x="130" y="233" text-anchor="end">sent back</text>
</svg><figcaption>The request for slash posts first meets the routes file, which picks the code to run. That code asks the Post model for data, and the model talks to the database. The data is handed to a Blade view, which produces the HTML page that goes back to the browser.</figcaption></figure>
<p>This split has a name, <b>MVC</b>: <b>M</b>odels handle data, <b>V</b>iews handle what the page looks like, and <b>C</b>ontrollers decide what to do for each request. In this lesson small functions inside the routes file play the controller role. Bigger apps move them into controller classes, which you will do in the next lesson.</p>

<h4>Artisan and migrations: building the table</h4>
<p><b>Artisan</b> is Laravel's command-line helper. You run it as <code>php artisan</code> followed by a command. The first one you need is <code>php artisan migrate</code>.</p>
<p>A <b>migration</b> is a PHP file that describes a change to the database's structure, such as "create a posts table with these columns". Look at the lesson's migration:</p>
<pre class="snip">Schema::create('posts', function (Blueprint $table) {
    $table-&gt;id();                                  // auto-numbered id
    $table-&gt;string('title');                       // short text
    $table-&gt;text('body');                          // long text
    $table-&gt;boolean('published')-&gt;default(false);  // true or false
    $table-&gt;timestamps();                          // created_at, updated_at
});</pre>
<p>Why not just create the table by hand? Because migrations live in your code and in Git. A teammate or a server runs <code>php artisan migrate</code> and gets exactly the same tables. Laravel records which migrations have already run in its own table, so running the command again only applies new ones. Migrations are version control for your database structure.</p>

<h4>Eloquent models: a class for each table</h4>
<p><b>Eloquent</b> is Laravel's <b>ORM</b>, short for object-relational mapper. It connects a class to a table, so each row comes back as an object and you rarely write SQL by hand. The connection is made by naming convention: the class <code>Post</code> uses the table <code>posts</code>, the plural in lower case.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="The Post class maps to the posts table and each Post object maps to one row">
<rect class="bx-a" x="10" y="20" width="140" height="36" rx="6"/><text class="t-b" x="80" y="43" text-anchor="middle">class Post</text>
<rect class="bx-ok" x="10" y="56" width="140" height="36" rx="6"/><text class="t" x="80" y="79" text-anchor="middle">a Post object</text>
<path class="ln-a" d="M150 38H192"/><polygon class="ah-a" points="192,32 192,44 200,38"/>
<path class="ln-ok" d="M150 74H192"/><polygon class="ah-ok" points="192,68 192,80 200,74"/>
<rect class="bx-info" x="200" y="20" width="50" height="36"/><text class="t-b" x="225" y="43" text-anchor="middle">id</text>
<rect class="bx-info" x="250" y="20" width="160" height="36"/><text class="t-b" x="330" y="43" text-anchor="middle">title</text>
<rect class="bx-ok" x="200" y="56" width="50" height="36"/><text class="t-m" x="225" y="79" text-anchor="middle">1</text>
<rect class="bx-ok" x="250" y="56" width="160" height="36"/><text class="t-s" x="330" y="79" text-anchor="middle">Hello Laravel</text>
<rect class="bx" x="200" y="92" width="50" height="36"/><text class="t-m" x="225" y="115" text-anchor="middle">2</text>
<rect class="bx" x="250" y="92" width="160" height="36"/><text class="t-s" x="330" y="115" text-anchor="middle">Eloquent is neat</text>
<rect class="bx" x="200" y="128" width="50" height="36"/><text class="t-m" x="225" y="151" text-anchor="middle">3</text>
<rect class="bx" x="250" y="128" width="160" height="36"/><text class="t-s" x="330" y="151" text-anchor="middle">Draft ideas</text>
<text class="t-s" x="210" y="190" text-anchor="middle">The class matches the table; each object matches one row</text>
</svg><figcaption>The Post class is linked to the posts table by its name. Each Post object holds one row, so the object for row 1 has the title Hello Laravel, and its columns are read as properties.</figcaption></figure>
<p>With an almost empty class (<code>class Post extends Model</code>), you already get a full set of tools, because <code>Model</code> provides them through inheritance:</p>
<pre class="snip">Post::all();                     // every row, as Post objects
Post::find(1);                   // the row with id 1, or null
Post::where('published', true)   // start a query with a condition
    -&gt;latest()                   // newest first (by created_at)
    -&gt;get();                     // run it: a collection of Posts</pre>
<p>The last example is a <b>chain</b>. Each method adds a piece to the query, and nothing is sent to the database until <code>get()</code> runs it. The result is a <b>collection</b>, Laravel's list-like object, which you can loop over with <code>foreach</code> just like an array. Each column is a property: <code>$post-&gt;title</code>.</p>

<h4>Mass assignment and <code>$fillable</code></h4>
<p>The seeder fills the table with three posts, using <code>Post::create([...])</code> with an array of column values. Setting many columns from one array at once is called <b>mass assignment</b>. Run <code>php artisan db:seed</code> and it fails with an error along the lines of <b>Add [title] to fillable property to allow mass assignment on [App\\Models\\Post]</b>.</p>
<p>That refusal is deliberate. Imagine a sign-up form handled with <code>User::create($request-&gt;all())</code>. A crafty visitor adds a hidden field <code>is_admin=1</code> to the form, and they have made themselves an administrator. So Laravel only mass-assigns columns you have explicitly allowed in the model's <code>$fillable</code> list:</p>
<pre class="snip">class Post extends Model
{
    protected $fillable = ['title', 'body'];   // add every column the seeder sets
}</pre>
<p>Look at the seeder to see which columns it sets, list exactly those, and run <code>php artisan db:seed</code> again.</p>

<h4>Routes and views</h4>
<p>A <b>route</b> pairs an HTTP method and a URL with the code that answers it. You already have one for the home page. A route for the post list fetches the data and hands it to a view:</p>
<pre class="snip">Route::get('/posts', function () {
    $posts = Post::where('published', true)-&gt;latest()-&gt;get();
    return view('posts.index', ['posts' =&gt; $posts]);
});</pre>
<p><code>view('posts.index', [...])</code> means "render the template at <code>resources/views/posts/index.blade.php</code> and give it these variables". The dot in the name stands for a folder, and Laravel adds <code>.blade.php</code> itself. The array's keys become variable names inside the template, so <code>'posts'</code> becomes <code>$posts</code> there. Filtering with <code>where('published', true)</code> is what keeps the draft off the page.</p>

<h4>Blade templates and escaping</h4>
<p><b>Blade</b> is Laravel's template language: mostly HTML, plus a few special markers.</p>
<pre class="snip">&lt;h1&gt;Blog&lt;/h1&gt;
&lt;ul&gt;
@foreach ($posts as $post)
    &lt;li&gt;{{ $post-&gt;title }}&lt;/li&gt;
@endforeach
&lt;/ul&gt;</pre>
<p><code>@foreach</code> and <code>@endforeach</code> repeat the HTML between them once per post. <code>{{ ... }}</code> prints a value, and here is the important part: it <b>escapes</b> it first, turning characters like <code>&lt;</code> into harmless codes. If someone titles a post with a <code>&lt;script&gt;</code> tag, visitors see the text instead of running the script. That attack is called <b>cross-site scripting</b>, or XSS, and Blade blocks it by default. Blade also has <code>{!! ... !!}</code>, which prints without escaping. Only use it for HTML you fully trust.</p>

<h4>Route parameters and route-model binding</h4>
<p>To show one post, the URL needs to carry its id: <code>/posts/1</code>, <code>/posts/2</code>. In the route, curly braces mark a part of the URL that can vary, a <b>route parameter</b>: <code>Route::get('/posts/{post}', ...)</code>.</p>
<p>Now the clever part. If your function asks for a <code>Post</code> object with a parameter of the same name, <code>function (Post $post)</code>, Laravel takes the number from the URL, looks up the post with that id, and passes in the finished object. This is <b>route-model binding</b>. If no post has that id, Laravel stops and returns a <b>404 Not Found</b> page for you. That is exactly what the last task checks with <code>/posts/999</code>.</p>
<div class="mistake"><b>Common mistake</b>Mismatched names, such as <code>{id}</code> in the URL with <code>Post $post</code> in the function. Binding only happens when the name in braces matches the parameter name, so use <code>{post}</code> with <code>$post</code>.</div>
<div class="mistake"><b>Common mistake</b>Forgetting <code>-&gt;get()</code> at the end of a query chain. Without it you pass the unfinished query to the view instead of the posts.</div>

<h4>Reading the errors you will hit</h4>
<ul>
<li><b>Add [title] to fillable property</b>: a mass-assigned column is missing from <code>$fillable</code>.</li>
<li><b>View [posts.index] not found</b>: the template file is missing or misnamed. It must be <code>resources/views/posts/index.blade.php</code>.</li>
<li><b>no such table: posts</b>, or "Base table or view not found" on MySQL: run <code>php artisan migrate</code> first.</li>
<li><b>Undefined variable $posts</b> inside a view: the key in the array passed to <code>view()</code> does not match the name used in the template.</li>
</ul>
<div class="try"><b>Try it in your head</b>After seeding, what does <code>/posts</code> list, and what does <code>/posts/3</code> show? The list shows only the two published posts, newest first, so "Draft ideas" is missing. But <code>/posts/3</code> still shows the draft, because the show route looks posts up by id and does not filter. A real blog would add that check too.</div>

<h4>Recap</h4>
<ul>
<li>A Laravel request flows route, then model and database, then Blade view, then HTML.</li>
<li>Migrations describe tables in code; <code>php artisan migrate</code> applies them.</li>
<li>Eloquent links <code>Post</code> to <code>posts</code>; chains like <code>where()-&gt;latest()-&gt;get()</code> build and run queries.</li>
<li><code>$fillable</code> lists the only columns that may be mass-assigned, blocking crafted form fields.</li>
<li><code>{{ }}</code> prints escaped text, <code>@foreach</code> loops, and <code>function (Post $post)</code> with <code>{post}</code> loads the record or returns 404.</li>
</ul>
`);

explain('h6',`
<h4>Why build an API</h4>
<p>In the last lesson your Laravel app answered with HTML pages, made for people reading in a browser. But many of your "visitors" are not people. A phone app, a JavaScript front end, or another company's server wants the <b>data</b>, not a page, so it can display or process it its own way.</p>
<p>An <b>API</b> (application programming interface) is a set of URLs designed for programs to call. Instead of HTML, it answers with <b>JSON</b>, a plain text format for data that every language can read. A task looks like this in JSON:</p>
<pre class="snip">{ "id": 1, "title": "Write tests", "done": false }</pre>
<p>Curly braces hold named fields, much like a PHP associative array. A list of tasks is the same thing inside square brackets. This lesson builds a to-do API that can list, create, read, update and delete tasks, the four basic data jobs often called <b>CRUD</b> (create, read, update, delete).</p>

<h4>REST: nouns in the URL, verbs in the method</h4>
<p>Every HTTP request has a <b>method</b> (also called a verb) and a <b>URL</b>. <b>REST</b> is a widely used style for designing APIs around that pair. The URL names a <b>resource</b>, a thing such as "all tasks" or "task number 1". The method says what to do with it. The URLs stay simple nouns; you never need <code>/deleteTask</code>.</p>
<div class="tbl-wrap"><table><tr><th>Method and URL</th><th>Meaning</th><th>Success status</th></tr>
<tr><td><code>GET /api/tasks</code></td><td>List all tasks</td><td>200 OK</td></tr>
<tr><td><code>POST /api/tasks</code></td><td>Create a new task from the request body</td><td>201 Created</td></tr>
<tr><td><code>GET /api/tasks/1</code></td><td>Read task 1</td><td>200 OK, or 404 if it does not exist</td></tr>
<tr><td><code>PATCH /api/tasks/1</code></td><td>Change some fields of task 1</td><td>200 OK</td></tr>
<tr><td><code>DELETE /api/tasks/1</code></td><td>Remove task 1</td><td>204 No Content</td></tr></table></div>
<p>GET only ever reads; it must never change data, because browsers, search engines and caches repeat GET requests freely. POST and PATCH carry a <b>body</b>: the JSON data being sent. You may also meet <code>PUT</code>, which replaces a whole resource, whereas <code>PATCH</code> changes only the fields you send.</p>

<h4>Status codes: the answer before the answer</h4>
<p>Every response starts with a three-digit <b>status code</b>. Programs read it before anything else to know whether the request worked. The first digit tells you the family:</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Status code families: 2xx success, 4xx client mistakes, 5xx server failures">
<rect class="bx-ok" x="10" y="10" width="120" height="50" rx="8"/><text class="t-b" x="70" y="32" text-anchor="middle">2xx</text><text class="t-s" x="70" y="50" text-anchor="middle">it worked</text>
<text class="t-s" x="145" y="31">200 OK, 201 Created</text><text class="t-s" x="145" y="51">204 No Content</text>
<rect class="bx-warn" x="10" y="75" width="120" height="50" rx="8"/><text class="t-b" x="70" y="97" text-anchor="middle">4xx</text><text class="t-s" x="70" y="115" text-anchor="middle">client's mistake</text>
<text class="t-s" x="145" y="96">404 Not Found</text><text class="t-s" x="145" y="116">422 Unprocessable Content</text>
<rect class="bx-bad" x="10" y="140" width="120" height="50" rx="8"/><text class="t-b" x="70" y="162" text-anchor="middle">5xx</text><text class="t-s" x="70" y="180" text-anchor="middle">server's fault</text>
<text class="t-s" x="145" y="161">500 Internal Server Error</text><text class="t-s" x="145" y="181">a bug or crash on your side</text>
</svg><figcaption>Status codes come in families. Codes in the 200s mean success. Codes in the 400s mean the client sent something wrong and must fix it, such as a missing record or invalid data. Codes in the 500s mean the server itself failed.</figcaption></figure>
<p>Choosing the right code is part of the API's design. A client that receives 422 knows to show the user the form errors; a client that receives 500 knows to try again later or report a bug. Returning 200 with "error" hidden in the body forces every client to guess.</p>

<h4>API routes and controllers</h4>
<p>API routes live in <code>routes/api.php</code>, and Laravel automatically puts <code>/api</code> in front of every URL in that file. So <code>Route::get('/tasks', ...)</code> answers <code>/api/tasks</code>. (In new Laravel 11 and later projects that file does not exist until you run <code>php artisan install:api</code>; this lesson's project already has it.)</p>
<p>Last lesson, small functions inside the routes file did the work. For an API with five actions, that gets crowded, so the code moves into a <b>controller</b>: a class whose methods each handle one action. The route points at a method using an array of the class name and the method name:</p>
<pre class="snip">Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/tasks/{task}', [TaskController::class, 'show']);</pre>
<p><code>TaskController::class</code> is simply the class's full name as a string, written in a way your editor can check. Laravel's usual method names are <code>index</code> (list), <code>store</code> (create), <code>show</code> (read one), <code>update</code> and <code>destroy</code>. Following them pays off: once you know the pattern, <code>Route::apiResource('tasks', TaskController::class)</code> registers all five routes in one line.</p>
<p>Here is the nicest shortcut in Laravel APIs: if a controller method <b>returns a model or a collection</b>, Laravel converts it to JSON and sends it with status 200. So <code>index()</code> can simply return <code>Task::orderBy('id')-&gt;get()</code>. The model's <code>$casts</code> setting, <code>'done' =&gt; 'boolean'</code>, makes sure <code>done</code> comes out as a real <code>true</code> or <code>false</code> in JSON, not the 0 or 1 the database stores.</p>

<h4>Creating with validation: 201 or 422</h4>
<p>Never trust incoming data. A client might send no title, a number instead of text, or a title ten thousand characters long. <code>$request-&gt;validate()</code> checks the request body against <b>rules</b>, written as text separated by vertical bars:</p>
<pre class="snip">$data = $request-&gt;validate([
    'title' =&gt; 'required|string|max:100',   // must exist, be text, at most 100 chars
    'done'  =&gt; 'boolean',                    // optional, but true/false if sent
]);</pre>
<figure class="fig"><svg viewBox="0 0 420 236" role="img" aria-label="POST request: validation fails with 422, or passes and creates the task with 201">
<rect class="bx-info" x="120" y="10" width="180" height="36" rx="6"/><text class="t-m" x="210" y="33" text-anchor="middle">POST /api/tasks</text>
<path class="ln" d="M210 46v12"/><polygon class="ah" points="204,58 216,58 210,66"/>
<rect class="bx-a" x="120" y="66" width="180" height="36" rx="6"/><text class="t-m" x="210" y="89" text-anchor="middle">validate()</text>
<path class="ln" d="M210 102V112H100V126M210 112H320V126"/>
<polygon class="ah" points="94,126 106,126 100,134"/><polygon class="ah-ok" points="314,126 326,126 320,134"/>
<text class="t-s t-bad" x="150" y="128" text-anchor="middle">fails</text>
<text class="t-s t-ok" x="268" y="128" text-anchor="middle">passes</text>
<rect class="bx-bad" x="10" y="134" width="180" height="40" rx="6"/><text class="t-b" x="100" y="159" text-anchor="middle">422 + errors</text>
<text class="t-s" x="100" y="194" text-anchor="middle">nothing is saved</text>
<rect class="bx" x="230" y="134" width="180" height="40" rx="6"/><text class="t-m" x="320" y="159" text-anchor="middle">Task::create</text>
<path class="ln-ok" d="M320 174v12"/><polygon class="ah-ok" points="314,186 326,186 320,194"/>
<rect class="bx-ok" x="230" y="194" width="180" height="36" rx="6"/><text class="t-b" x="320" y="217" text-anchor="middle">201 + new task</text>
</svg><figcaption>Every POST passes through validation first. If a rule fails, Laravel stops immediately and answers 422 with the errors for each field, and nothing is saved. If every rule passes, the task is created and returned with status 201.</figcaption></figure>
<p>If any rule fails, <code>validate()</code> stops the method right there. When the client asks for JSON, as API clients do with an <code>Accept: application/json</code> header, Laravel answers <b>422 Unprocessable Content</b> with a body like this:</p>
<pre class="snip">{
  "message": "The title field is required.",
  "errors": { "title": ["The title field is required."] }
}</pre>
<p>The <code>errors</code> object lists the problems field by field, so a front end can show each message next to the right input. If validation passes, <code>validate()</code> returns <b>only the validated fields</b>. Extra fields a client slipped in are dropped, which works hand in hand with <code>$fillable</code> from the last lesson.</p>
<p>Returning the new task directly would send status 200. For a creation, the correct code is 201 Created, so you build the response yourself: <code>response()-&gt;json($task, 201)</code>, meaning "send this as JSON with status 201".</p>

<h4>Reading, updating and deleting one task</h4>
<p>The three single-task actions all use a <code>{task}</code> route parameter with <b>route-model binding</b>, which you met last lesson: a method parameter <code>Task $task</code> receives the task whose id is in the URL. When there is no such task, Laravel answers <b>404 Not Found</b> before your method even runs. That means <code>show()</code> can be one line that returns <code>$task</code>.</p>
<ul>
<li><b>update</b> takes both the request and the task: <code>update(Request $request, Task $task)</code>. Because PATCH changes only some fields, its rules leave out <code>required</code>. Then <code>$task-&gt;update($data)</code> saves the changes, and returning <code>$task</code> sends back the updated version with 200.</li>
<li><b>destroy</b> calls <code>$task-&gt;delete()</code>. There is nothing useful left to send back, so it returns <code>response()-&gt;noContent()</code>, which is status <b>204 No Content</b>: success, with an empty body.</li>
</ul>
<p>The last task checks the whole story in order: PATCH sets <code>done</code> to true, DELETE answers 204, and a GET for the same task afterwards answers 404, proving it is really gone.</p>
<div class="tip"><b>Tip</b>Run <code>php artisan migrate</code> before anything else, or every request fails because the tasks table does not exist. Then use the request panel: choose the method, type the path, add a JSON body for POST and PATCH, and press Send. Always look at the status code first, then the body.</div>
<div class="mistake"><b>Common mistake</b>Keeping <code>required</code> in the PATCH rules. Then a client that only wants to tick a task as done must also resend the title, or gets a 422. Partial updates need rules without <code>required</code>.</div>
<div class="mistake"><b>Common mistake</b>Adding a method to the controller but not a route for it. The method exists, yet the URL gives 404 or "405 Method Not Allowed", because Laravel only knows the routes in <code>routes/api.php</code>. Every action needs both.</div>

<h4>Reading the errors you will hit</h4>
<ul>
<li><b>404 Not Found</b>: either no route matches that method and URL, or route-model binding found no record with that id.</li>
<li><b>405 Method Not Allowed</b>: the URL exists, but not with that method, for example a DELETE route that was never added.</li>
<li><b>422</b> with <code>errors</code>: your own validation rejected the body. Read the field messages.</li>
<li><b>500</b>: your code crashed. Common causes are a missing table (run the migration) or a column missing from <code>$fillable</code>.</li>
</ul>
<div class="try"><b>Try it in your head</b>A client sends <code>POST /api/tasks</code> with the body <code>{"title": ""}</code>, then <code>DELETE /api/tasks/42</code> when no task 42 exists. What status codes come back? The empty title fails <code>required</code>, so 422. The delete finds no task through route-model binding, so 404.</div>

<h4>Recap</h4>
<ul>
<li>A REST API names resources in URLs and uses the method for the action: GET reads, POST creates, PATCH updates, DELETE removes.</li>
<li>Status families: 2xx success, 4xx the client's mistake, 5xx the server's fault. Create with 201, delete with 204, missing with 404, invalid with 422.</li>
<li>Routes in <code>routes/api.php</code> get the <code>/api</code> prefix and point at controller methods with <code>[TaskController::class, 'store']</code>.</li>
<li>Returning a model or collection sends JSON with 200; <code>response()-&gt;json($task, 201)</code> and <code>response()-&gt;noContent()</code> set other codes.</li>
<li><code>$request-&gt;validate()</code> returns only checked fields, or answers 422 with errors for each field.</li>
</ul>
`);
