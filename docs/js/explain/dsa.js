/* dsa: "Explained step by step" walkthroughs. */

explain('ab1',`
<p>Every app you use runs on recipes. When your music app finds your most played song or a shop adds up your basket, a short list of exact steps is doing the work. This lesson teaches you to write those steps yourself.</p>

${V.card(1,'An algorithm is a recipe','solve it by hand first',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="A recipe card with four steps for finding the biggest number turns the input 4, 9, 2 into the output 9">
<rect class="bx-info" x="8" y="8" width="252" height="164" rx="10"/>${V.ic('book',18,16,30,'ic-info')}
<text class="t-b" x="56" y="38" style="font-size:17px">Recipe: biggest</text>
<text class="t" x="22" y="72">1. best = first number</text>
<text class="t" x="22" y="98">2. look at each next one</text>
<text class="t" x="22" y="124">3. bigger? It is the best</text>
<text class="t" x="22" y="150">4. hand back best</text>
<text class="t-s" x="342" y="22" text-anchor="middle">input</text>
<rect class="bx" x="282" y="30" width="38" height="40" rx="6"/><text class="t-m" x="301" y="56" text-anchor="middle" style="font-size:18px">4</text>
<rect class="bx" x="323" y="30" width="38" height="40" rx="6"/><text class="t-m" x="342" y="56" text-anchor="middle" style="font-size:18px">9</text>
<rect class="bx" x="364" y="30" width="38" height="40" rx="6"/><text class="t-m" x="383" y="56" text-anchor="middle" style="font-size:18px">2</text>
<path class="ln-ok" d="M342 76V108"/><polygon class="ah-ok" points="335,106 349,106 342,118"/>
<rect class="bx-ok" x="312" y="120" width="60" height="44" rx="8"/><text class="t-m" x="342" y="149" text-anchor="middle" style="font-size:22px">9</text>
<text class="t-s" x="342" y="178" text-anchor="middle">output</text>
</svg><figcaption>An algorithm turns an input into an output with exact steps. Write the steps in plain words first. The code is just a translation.</figcaption></figure>
${V.like(`<p>Finding your keys. You check every pocket, one at a time, and stop when you feel them. You never had to be told how, because you already run that algorithm. A computer needs the same steps spelled out with no gaps.</p>`)}
${V.why(`<p>Computers do exactly what they are told and nothing more. The word <b>algorithm</b> comes from al-Khwarizmi, a Persian mathematician who wrote step-by-step methods for arithmetic around the year 820. The habit that makes you good at them is old too: work a tiny example by hand, then write down what you did.</p>`)}
<p><b>Watch "best so far" find the biggest number.</b></p>
${V.steps([
 ['Start: the first number, <b>4</b>, is the best we have seen so far.',`<svg viewBox="0 0 420 170" role="img" aria-label="best starts as 4">
<rect class="bx-hl" x="40" y="20" width="100" height="56" rx="8"/><text class="t-m" x="90" y="56" text-anchor="middle" style="font-size:22px">4</text>
<rect class="bx" x="160" y="20" width="100" height="56" rx="8"/><text class="t-m" x="210" y="56" text-anchor="middle" style="font-size:22px">9</text>
<rect class="bx" x="280" y="20" width="100" height="56" rx="8"/><text class="t-m" x="330" y="56" text-anchor="middle" style="font-size:22px">2</text>
<text class="t-m" x="40" y="138" style="font-size:18px">best</text><rect class="bx-ok" x="96" y="110" width="90" height="44" rx="8"/><text class="t-m" x="141" y="140" text-anchor="middle" style="font-size:22px">4</text>
<text class="t" x="210" y="138">first number</text>
</svg>`],
 ['Look at <b>9</b>. Is 9 bigger than 4? Yes, so 9 becomes the new best.',`<svg viewBox="0 0 420 170" role="img" aria-label="9 is bigger, best becomes 9">
<rect class="bx" x="40" y="20" width="100" height="56" rx="8"/><text class="t-m" x="90" y="56" text-anchor="middle" style="font-size:22px">4</text>
<rect class="bx-hl" x="160" y="20" width="100" height="56" rx="8"/><text class="t-m" x="210" y="56" text-anchor="middle" style="font-size:22px">9</text>
<rect class="bx" x="280" y="20" width="100" height="56" rx="8"/><text class="t-m" x="330" y="56" text-anchor="middle" style="font-size:22px">2</text>
<text class="t-m" x="40" y="138" style="font-size:18px">best</text><rect class="bx-ok" x="96" y="110" width="90" height="44" rx="8"/><text class="t-m" x="141" y="140" text-anchor="middle" style="font-size:22px">9</text>
<text class="t" x="210" y="138">9 &gt; 4? yes</text>
</svg>`],
 ['Look at <b>2</b>. Is 2 bigger than 9? No, so the best stays 9.',`<svg viewBox="0 0 420 170" role="img" aria-label="2 is not bigger, best stays 9">
<rect class="bx" x="40" y="20" width="100" height="56" rx="8"/><text class="t-m" x="90" y="56" text-anchor="middle" style="font-size:22px">4</text>
<rect class="bx" x="160" y="20" width="100" height="56" rx="8"/><text class="t-m" x="210" y="56" text-anchor="middle" style="font-size:22px">9</text>
<rect class="bx-hl" x="280" y="20" width="100" height="56" rx="8"/><text class="t-m" x="330" y="56" text-anchor="middle" style="font-size:22px">2</text>
<text class="t-m" x="40" y="138" style="font-size:18px">best</text><rect class="bx-ok" x="96" y="110" width="90" height="44" rx="8"/><text class="t-m" x="141" y="140" text-anchor="middle" style="font-size:22px">9</text>
<text class="t" x="210" y="138">2 &gt; 9? no</text>
</svg>`],
 ['No numbers left. The loop ends and the function returns <b>9</b>. Three numbers, three looks.',`<svg viewBox="0 0 420 170" role="img" aria-label="Loop finished, return 9">
<rect class="bx" x="40" y="20" width="100" height="56" rx="8"/><text class="t-m t-dim" x="90" y="56" text-anchor="middle" style="font-size:22px">4</text>
<rect class="bx" x="160" y="20" width="100" height="56" rx="8"/><text class="t-m t-dim" x="210" y="56" text-anchor="middle" style="font-size:22px">9</text>
<rect class="bx" x="280" y="20" width="100" height="56" rx="8"/><text class="t-m t-dim" x="330" y="56" text-anchor="middle" style="font-size:22px">2</text>
<text class="t-m" x="40" y="138" style="font-size:18px">best</text><rect class="bx-ok" x="96" y="110" width="90" height="44" rx="8"/><text class="t-m" x="141" y="140" text-anchor="middle" style="font-size:22px">9</text>
<text class="t-b t-ok" x="210" y="138" style="font-size:17px">return 9</text>
</svg>`]])}
${V.hook(`Do it by hand, say it in words, then translate to code.`)}
`)}

${V.card(2,'Three loop patterns','total, best, count',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Three patterns: running total 4 plus 2 plus 3 is 9; best so far of 4, 9, 2 is 9; counting a in a, b, a gives 2">
<rect class="bx-a" x="6" y="8" width="130" height="154" rx="10"/>${V.ic('list',54,16,34,'ic-a')}
<text class="t-b" x="71" y="74" text-anchor="middle">Running total</text>
<text class="t-m" x="71" y="106" text-anchor="middle">4 + 2 + 3</text>
<text class="t-m t-a" x="71" y="142" text-anchor="middle" style="font-size:22px">9</text>
<rect class="bx-ok" x="145" y="8" width="130" height="154" rx="10"/>${V.ic('check',193,16,34,'ic-ok')}
<text class="t-b" x="210" y="74" text-anchor="middle">Best so far</text>
<text class="t-m" x="210" y="106" text-anchor="middle">4  9  2</text>
<text class="t-m t-ok" x="210" y="142" text-anchor="middle" style="font-size:22px">9</text>
<rect class="bx-info" x="284" y="8" width="130" height="154" rx="10"/>${V.ic('search',332,16,34,'ic-info')}
<text class="t-b" x="349" y="74" text-anchor="middle">Count matches</text>
<text class="t-m" x="349" y="106" text-anchor="middle">a  b  a</text>
<text class="t-m t-info" x="349" y="142" text-anchor="middle" style="font-size:22px">2</text>
</svg><figcaption>Most beginner algorithms are one loop that keeps track of one thing: a running total, the best value so far, or a count.</figcaption></figure>
${V.like(`<p>A shop till keeps a running total as each item is scanned. A judge at a talent show remembers only the best act so far. A teacher taking the register makes a tally mark for each pupil who is here.</p>`)}
${V.anat([[1,'for'],' (',[2,'const n'],' ',[3,'of numbers'],') ',[4,'total += n'],';'],[
 '<b>for.</b> Repeat the next instruction.',
 '<b>The current item.</b> Each time round, <code>n</code> holds the next value from the list.',
 '<b>The list to walk.</b> <code>of</code> visits every item in order, first to last.',
 '<b>The work.</b> <code>total += n</code> is short for <code>total = total + n</code>.'])}
${V.rules(V.rh('Rules: break one and you get the wrong answer'),
 V.ok('let total = 0;','A total must start at 0, before the loop'),V.no('let best = 0;','Fails for [-3, -1, -7]: no number beats 0'),
 V.ok('let best = numbers[0];','Start the best with a real item from the list'),V.ok('if (x === target) count++;','Compare with ===, then add one'),
 V.rh('Conventions'),
 V.ok('total, best, count','Name the thing you are tracking'),V.ok('for (const n of list)','Use for...of when you do not need the position'))}
${V.build(`<ol><li>Write <code>sum</code>: start <code>total</code> at 0, add each number, return it.</li><li>Write <code>max</code>: if the list is empty, return <code>null</code>. Otherwise start <code>best</code> at the first item and swap in anything bigger.</li><li>Write <code>countOf</code>: start <code>count</code> at 0 and add one for every match.</li><li>Test each with an empty list too.</li></ol>`)}
${V.hook(`Start value, loop, update, return. Every pattern has the same four parts.`)}
`)}

${V.card(3,'Two pointers','one at each end, walking inwards',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="The word racecar with a start pointer on the first letter and an end pointer on the last letter">
${V.ic('person',8,44,40,'ic-a')}${V.ic('person',372,44,40,'ic-info')}
<rect class="bx-warn" x="56" y="40" width="40" height="48" rx="6"/><text class="t-m" x="76" y="72" text-anchor="middle" style="font-size:20px">r</text>
<rect class="bx" x="100" y="40" width="40" height="48" rx="6"/><text class="t-m" x="120" y="72" text-anchor="middle" style="font-size:20px">a</text>
<rect class="bx" x="144" y="40" width="40" height="48" rx="6"/><text class="t-m" x="164" y="72" text-anchor="middle" style="font-size:20px">c</text>
<rect class="bx" x="188" y="40" width="40" height="48" rx="6"/><text class="t-m" x="208" y="72" text-anchor="middle" style="font-size:20px">e</text>
<rect class="bx" x="232" y="40" width="40" height="48" rx="6"/><text class="t-m" x="252" y="72" text-anchor="middle" style="font-size:20px">c</text>
<rect class="bx" x="276" y="40" width="40" height="48" rx="6"/><text class="t-m" x="296" y="72" text-anchor="middle" style="font-size:20px">a</text>
<rect class="bx-warn" x="320" y="40" width="40" height="48" rx="6"/><text class="t-m" x="340" y="72" text-anchor="middle" style="font-size:20px">r</text>
<text class="t-b t-a" x="76" y="118" text-anchor="middle">start</text><text class="t-b t-info" x="340" y="118" text-anchor="middle">end</text>
<text class="t-s" x="76" y="140" text-anchor="middle">index 0</text><text class="t-s" x="340" y="140" text-anchor="middle">index 6</text>
</svg><figcaption>Two pointers are two index variables. One starts at the front, one at the back, and they move towards each other.</figcaption></figure>
${V.like(`<p>Two friends check a word on a wall. One starts at the left end, one at the right. They each read a letter, shout it out, and take one step inwards. If they ever shout different letters, it is not a palindrome.</p>`)}
${V.why(`<p>A palindrome reads the same both ways. You could build the reversed word and compare, but that makes a whole new copy. Two pointers check it in place and stop at the first mismatch.</p>`)}
${V.anat([[1,'while'],' (',[2,'start &lt; end'],') { ',[3,'start++'],'; ',[4,'end--'],'; }'],[
 '<b>while.</b> Keep repeating as long as the condition is true.',
 '<b>Condition.</b> Stop when the pointers meet or cross. The middle letter needs no partner.',
 '<b>Move start right</b> by one.',
 '<b>Move end left</b> by one.'])}
${V.steps([
 ['<b>start</b> = 0, <b>end</b> = 6. Compare r and r. They match, so both pointers step inwards.',`<svg viewBox="0 0 420 150" role="img" aria-label="Compare r and r: match">
<rect class="bx-ok" x="56" y="30" width="40" height="48" rx="6"/><text class="t-m" x="76" y="62" text-anchor="middle" style="font-size:20px">r</text>
<rect class="bx" x="100" y="30" width="40" height="48" rx="6"/><text class="t-m" x="120" y="62" text-anchor="middle" style="font-size:20px">a</text>
<rect class="bx" x="144" y="30" width="40" height="48" rx="6"/><text class="t-m" x="164" y="62" text-anchor="middle" style="font-size:20px">c</text>
<rect class="bx" x="188" y="30" width="40" height="48" rx="6"/><text class="t-m" x="208" y="62" text-anchor="middle" style="font-size:20px">e</text>
<rect class="bx" x="232" y="30" width="40" height="48" rx="6"/><text class="t-m" x="252" y="62" text-anchor="middle" style="font-size:20px">c</text>
<rect class="bx" x="276" y="30" width="40" height="48" rx="6"/><text class="t-m" x="296" y="62" text-anchor="middle" style="font-size:20px">a</text>
<rect class="bx-ok" x="320" y="30" width="40" height="48" rx="6"/><text class="t-m" x="340" y="62" text-anchor="middle" style="font-size:20px">r</text>
<text class="t-b t-a" x="76" y="104" text-anchor="middle">start</text><text class="t-b t-info" x="340" y="104" text-anchor="middle">end</text>
<text class="t" x="208" y="136" text-anchor="middle">r = r, keep going</text>
</svg>`],
 ['<b>start</b> = 1, <b>end</b> = 5. a and a match. Step in again.',`<svg viewBox="0 0 420 150" role="img" aria-label="Compare a and a: match">
<rect class="bx" x="56" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="76" y="62" text-anchor="middle" style="font-size:20px">r</text>
<rect class="bx-ok" x="100" y="30" width="40" height="48" rx="6"/><text class="t-m" x="120" y="62" text-anchor="middle" style="font-size:20px">a</text>
<rect class="bx" x="144" y="30" width="40" height="48" rx="6"/><text class="t-m" x="164" y="62" text-anchor="middle" style="font-size:20px">c</text>
<rect class="bx" x="188" y="30" width="40" height="48" rx="6"/><text class="t-m" x="208" y="62" text-anchor="middle" style="font-size:20px">e</text>
<rect class="bx" x="232" y="30" width="40" height="48" rx="6"/><text class="t-m" x="252" y="62" text-anchor="middle" style="font-size:20px">c</text>
<rect class="bx-ok" x="276" y="30" width="40" height="48" rx="6"/><text class="t-m" x="296" y="62" text-anchor="middle" style="font-size:20px">a</text>
<rect class="bx" x="320" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="340" y="62" text-anchor="middle" style="font-size:20px">r</text>
<text class="t-b t-a" x="120" y="104" text-anchor="middle">start</text><text class="t-b t-info" x="296" y="104" text-anchor="middle">end</text>
<text class="t" x="208" y="136" text-anchor="middle">a = a, keep going</text>
</svg>`],
 ['<b>start</b> = 2, <b>end</b> = 4. c and c match. Step in again.',`<svg viewBox="0 0 420 150" role="img" aria-label="Compare c and c: match">
<rect class="bx" x="56" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="76" y="62" text-anchor="middle" style="font-size:20px">r</text>
<rect class="bx" x="100" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="120" y="62" text-anchor="middle" style="font-size:20px">a</text>
<rect class="bx-ok" x="144" y="30" width="40" height="48" rx="6"/><text class="t-m" x="164" y="62" text-anchor="middle" style="font-size:20px">c</text>
<rect class="bx" x="188" y="30" width="40" height="48" rx="6"/><text class="t-m" x="208" y="62" text-anchor="middle" style="font-size:20px">e</text>
<rect class="bx-ok" x="232" y="30" width="40" height="48" rx="6"/><text class="t-m" x="252" y="62" text-anchor="middle" style="font-size:20px">c</text>
<rect class="bx" x="276" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="296" y="62" text-anchor="middle" style="font-size:20px">a</text>
<rect class="bx" x="320" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="340" y="62" text-anchor="middle" style="font-size:20px">r</text>
<text class="t-b t-a" x="164" y="104" text-anchor="middle">start</text><text class="t-b t-info" x="252" y="104" text-anchor="middle">end</text>
<text class="t" x="208" y="136" text-anchor="middle">c = c, keep going</text>
</svg>`],
 ['Both pointers are now 3. <b>start &lt; end</b> is false, so the loop stops. No mismatch was found: return <b>true</b>. For "code", c and e differ at the first check, so it returns false straight away.',`<svg viewBox="0 0 420 150" role="img" aria-label="Pointers meet in the middle: return true">
<rect class="bx" x="56" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="76" y="62" text-anchor="middle" style="font-size:20px">r</text>
<rect class="bx" x="100" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="120" y="62" text-anchor="middle" style="font-size:20px">a</text>
<rect class="bx" x="144" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="164" y="62" text-anchor="middle" style="font-size:20px">c</text>
<rect class="bx-hl" x="188" y="30" width="40" height="48" rx="6"/><text class="t-m" x="208" y="62" text-anchor="middle" style="font-size:20px">e</text>
<rect class="bx" x="232" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="252" y="62" text-anchor="middle" style="font-size:20px">c</text>
<rect class="bx" x="276" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="296" y="62" text-anchor="middle" style="font-size:20px">a</text>
<rect class="bx" x="320" y="30" width="40" height="48" rx="6"/><text class="t-m t-dim" x="340" y="62" text-anchor="middle" style="font-size:20px">r</text>
<text class="t-b" x="208" y="104" text-anchor="middle">start = end</text>
<text class="t-b t-ok" x="208" y="136" text-anchor="middle" style="font-size:17px">return true</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('let end = word.length - 1;','The last index is one less than the length'),V.no('let end = word.length;','Points past the end: word[end] is undefined'),
 V.ok('for (let i = text.length - 1; i &gt;= 0; i--)','Walks backwards: use it to build a reversed string'),V.no('i &gt; 0','Skips index 0, so you lose the first letter'))}
${V.hook(`Start at both ends, step towards the middle, stop at the first mismatch.`)}
`)}

${V.card(4,'Counting steps','how the work grows',`
<p>Every pattern so far looks at each item once. So how much work is that? Count the steps as the list grows.</p>
${V.steps([
 ['A list of <b>4</b> items. The loop looks at each one once: <b>4 steps</b>.',`<svg viewBox="0 0 420 150" role="img" aria-label="4 items, 4 steps">
<text class="t-b" x="10" y="30" style="font-size:17px">n = 4</text>
<rect class="bx-ok" x="10" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="34" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="58" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="82" y="48" width="20" height="30" rx="4"/>
<text class="t-m" x="10" y="124" style="font-size:18px">steps: <tspan class="t-ok" style="font-weight:700">4</tspan></text>
</svg>`],
 ['Double the list to <b>8</b> items. The loop now does <b>8 steps</b>. Twice the items, twice the work.',`<svg viewBox="0 0 420 150" role="img" aria-label="8 items, 8 steps">
<text class="t-b" x="10" y="30" style="font-size:17px">n = 8</text>
<rect class="bx-ok" x="10" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="34" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="58" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="82" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="106" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="130" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="154" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="178" y="48" width="20" height="30" rx="4"/>
<text class="t-m" x="10" y="124" style="font-size:18px">steps: <tspan class="t-ok" style="font-weight:700">8</tspan></text>
</svg>`],
 ['Double again to <b>16</b>: <b>16 steps</b>. The work grows in a straight line with the input. Programmers call this <b>linear</b>.',`<svg viewBox="0 0 420 150" role="img" aria-label="16 items, 16 steps">
<text class="t-b" x="10" y="30" style="font-size:17px">n = 16</text>
<rect class="bx-ok" x="10" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="34" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="58" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="82" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="106" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="130" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="154" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="178" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="202" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="226" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="250" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="274" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="298" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="322" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="346" y="48" width="20" height="30" rx="4"/><rect class="bx-ok" x="370" y="48" width="20" height="30" rx="4"/>
<text class="t-m" x="10" y="124" style="font-size:18px">steps: <tspan class="t-ok" style="font-weight:700">16</tspan></text>
</svg>`],
 ['Compare a loop inside a loop, which pairs every item with every item. With 16 items that is 16 x 16 = <b>256 steps</b>. The next lesson shows why that gets slow fast.',`<svg viewBox="0 0 420 150" role="img" aria-label="A loop inside a loop on 16 items takes 256 steps">
<text class="t-b" x="10" y="30" style="font-size:17px">n = 16, loop inside a loop</text>
<rect class="bx-bad" x="10" y="48" width="380" height="30" rx="4"/>
<text class="t" x="200" y="69" text-anchor="middle">16 rows of 16 checks</text>
<text class="t-m" x="10" y="124" style="font-size:18px">steps: <tspan class="t-bad" style="font-weight:700">256</tspan></text>
</svg>`]])}
${V.like(`<p>Handing out exam papers. One paper per pupil: a class of 30 takes 30 hand-outs, and a class of 60 takes 60. You can predict the time without a stopwatch, just by counting.</p>`)}
${V.why(`<p>Seconds depend on how fast the computer is. Steps do not. Counting steps lets you compare two recipes fairly before you ever run them, and it is the first step towards Big-O.</p>`)}
${V.rules(V.rh('Edge cases: always test these on purpose'),
 V.ok('sum([]) === 0','An empty list has a total of nothing'),V.ok('max([]) === null','There is no biggest item, so say so'),
 V.ok("isPalindrome('') === true",'An empty word reads the same both ways'),V.ok('max([-3, -1, -7])','All negative: catches a best that started at 0'))}
${V.hook(`Double the list, double the work. That is linear.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What does <code>sum</code> return for an empty list? <i>0.</i> 2. Why start <code>best</code> at <code>numbers[0]</code> and not 0? <i>Because every number could be negative.</i> 3. A loop visits each item once. The list grows from 1,000 to 3,000 items. How many steps now? <i>About 3,000: three times the work.</i></div>
`);

explain('a1',`
<p>Code that is fast on your 10 test items can freeze on a million real ones. Big-O is how programmers predict that before it happens, and it is the first thing interviewers ask about.</p>

${V.card(1,'What Big-O measures','growth, not seconds',`
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Growth curves: O(1) stays flat, O(log n) rises slowly, O(n) is a straight line, O(n squared) shoots up">
<path class="ln" d="M40 14V182H404"/>
<text class="t-s" x="46" y="20">steps</text><text class="t-s" x="404" y="202" text-anchor="end">n (input size)</text>
<path class="ln-a" style="stroke-width:3" d="M40 182Q220 180 262 22"/><text class="t-b t-bad" x="272" y="30">O(n²)</text>
<path class="ln" style="stroke-width:3" d="M40 182L330 66"/><text class="t-b t-warn" x="338" y="70">O(n)</text>
<path class="ln-ok" style="stroke-width:3" d="M40 182C70 150 160 140 330 132"/><text class="t-b t-info" x="338" y="136">O(log n)</text>
<path class="ln-ok" style="stroke-width:3" d="M40 170H330"/><text class="t-b t-ok" x="338" y="174">O(1)</text>
</svg><figcaption>Big-O describes the shape of the curve: how the number of steps grows as the input, n, gets bigger. Flat is best. Steep is trouble.</figcaption></figure>
${V.like(`<p>Inviting friends to a party. One message in the group chat takes the same effort for 5 or 500 friends: <b>O(1)</b>. Walking to each friend's house takes one trip per friend: <b>O(n)</b>. Making every guest shake hands with every other guest grows much faster: <b>O(n²)</b>.</p>`)}
${V.why(`<p>A fast laptop and a slow phone give different timings for the same code, so seconds are no good for comparing ideas. Mathematicians in the 1890s used "O" for "order of" to describe how quickly a formula grows. In the 1970s Donald Knuth made it the standard way to talk about algorithms.</p>`)}
${V.anat([[1,'O'],'(',[2,'n²'],')'],[
 '<b>O</b> means "grows on the order of". It is about the worst case for large inputs.',
 '<b>The growth.</b> <code>n</code> is the size of the input. <code>n²</code> means double the input, four times the work.'])}
${V.rules(V.rh('Rules for writing Big-O'),
 V.ok('O(2n) is O(n)','Drop constant numbers: they do not change the shape'),V.ok('O(n² + n) is O(n²)','Keep only the fastest-growing part'),
 V.ok('n = input size','Say what n is: items in the list, letters in the word'),V.no('O(5)','Any fixed number of steps is just O(1)'))}
${V.hook(`Big-O is the shape of the curve, not the time on the clock.`)}
`)}

${V.card(2,'The five common speeds','from instant to hopeless',`
<p>Press Next to grow the input. Watch how many steps each kind of algorithm needs.</p>
${V.steps([
 ['With only <b>10</b> items, every speed looks fine. Even O(n²) is just 100 steps.',`<svg viewBox="0 0 420 200" role="img" aria-label="n equals 10: 1, 3, 10, 33 and 100 steps">
<text class="t-b" x="10" y="22" style="font-size:17px">n = 10</text>
<rect class="bx-ok" x="8" y="34" width="404" height="28" rx="6"/><text class="t-m" x="18" y="54">O(1)</text><text class="t-m" x="402" y="54" text-anchor="end">1</text>
<rect class="bx-ok" x="8" y="66" width="404" height="28" rx="6"/><text class="t-m" x="18" y="86">O(log n)</text><text class="t-m" x="402" y="86" text-anchor="end">3</text>
<rect class="bx-ok" x="8" y="98" width="404" height="28" rx="6"/><text class="t-m" x="18" y="118">O(n)</text><text class="t-m" x="402" y="118" text-anchor="end">10</text>
<rect class="bx-ok" x="8" y="130" width="404" height="28" rx="6"/><text class="t-m" x="18" y="150">O(n log n)</text><text class="t-m" x="402" y="150" text-anchor="end">33</text>
<rect class="bx-ok" x="8" y="162" width="404" height="28" rx="6"/><text class="t-m" x="18" y="182">O(n²)</text><text class="t-m" x="402" y="182" text-anchor="end">100</text>
</svg>`],
 ['At <b>1,000</b> items, O(n²) needs a million steps. Still quick on a computer, but it is pulling away.',`<svg viewBox="0 0 420 200" role="img" aria-label="n equals 1000: 1, 10, 1000, 10000 and 1 million steps">
<text class="t-b" x="10" y="22" style="font-size:17px">n = 1,000</text>
<rect class="bx-ok" x="8" y="34" width="404" height="28" rx="6"/><text class="t-m" x="18" y="54">O(1)</text><text class="t-m" x="402" y="54" text-anchor="end">1</text>
<rect class="bx-ok" x="8" y="66" width="404" height="28" rx="6"/><text class="t-m" x="18" y="86">O(log n)</text><text class="t-m" x="402" y="86" text-anchor="end">10</text>
<rect class="bx-ok" x="8" y="98" width="404" height="28" rx="6"/><text class="t-m" x="18" y="118">O(n)</text><text class="t-m" x="402" y="118" text-anchor="end">1,000</text>
<rect class="bx-ok" x="8" y="130" width="404" height="28" rx="6"/><text class="t-m" x="18" y="150">O(n log n)</text><text class="t-m" x="402" y="150" text-anchor="end">10,000</text>
<rect class="bx-warn" x="8" y="162" width="404" height="28" rx="6"/><text class="t-m" x="18" y="182">O(n²)</text><text class="t-m" x="402" y="182" text-anchor="end">1,000,000</text>
</svg>`],
 ['At <b>1,000,000</b> items, O(log n) needs only 20 steps, but O(n²) needs a <b>trillion</b>. That takes many minutes even on a fast machine.',`<svg viewBox="0 0 420 200" role="img" aria-label="n equals 1 million: 1, 20, 1 million, 20 million and 1 trillion steps">
<text class="t-b" x="10" y="22" style="font-size:17px">n = 1,000,000</text>
<rect class="bx-ok" x="8" y="34" width="404" height="28" rx="6"/><text class="t-m" x="18" y="54">O(1)</text><text class="t-m" x="402" y="54" text-anchor="end">1</text>
<rect class="bx-ok" x="8" y="66" width="404" height="28" rx="6"/><text class="t-m" x="18" y="86">O(log n)</text><text class="t-m" x="402" y="86" text-anchor="end">20</text>
<rect class="bx-ok" x="8" y="98" width="404" height="28" rx="6"/><text class="t-m" x="18" y="118">O(n)</text><text class="t-m" x="402" y="118" text-anchor="end">1,000,000</text>
<rect class="bx-warn" x="8" y="130" width="404" height="28" rx="6"/><text class="t-m" x="18" y="150">O(n log n)</text><text class="t-m" x="402" y="150" text-anchor="end">20,000,000</text>
<rect class="bx-bad" x="8" y="162" width="404" height="28" rx="6"/><text class="t-m" x="18" y="182">O(n²)</text><text class="t-m t-bad" x="402" y="182" text-anchor="end" style="font-weight:700">1,000,000,000,000</text>
</svg>`]])}
${V.rules(V.rh('What each one looks like in code'),
 V.ok('map.get(key)','O(1): one jump, whatever the size'),V.ok('binary search','O(log n): halve the list every step'),
 V.ok('for (const x of arr)','O(n): one pass'),V.ok('arr.sort()','O(n log n): good sorting'),
 V.no('a loop inside a loop','O(n²) when both walk the same data'))}
${V.hook(`1, log, n, n log n, n squared: from instant to hopeless.`)}
`)}

${V.card(3,'Nested loops are O(n²)','everyone meets everyone',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="Five people, with a line between every pair: ten handshakes">
<path class="ln-d" d="M210 34 330 92M210 34 286 152M210 34 134 152M210 34 90 92M330 92 286 152M330 92 134 152M330 92 90 92M286 152 134 152M286 152 90 92M134 152 90 92"/>
${V.ic('person',192,12,36,'ic-a')}${V.ic('person',312,72,36,'ic-a')}${V.ic('person',268,132,36,'ic-a')}${V.ic('person',116,132,36,'ic-a')}${V.ic('person',72,72,36,'ic-a')}
<text class="t-b" x="368" y="30" text-anchor="middle">5 people</text><text class="t-b t-bad" x="368" y="52" text-anchor="middle">10 pairs</text>
</svg><figcaption>Comparing every item with every other item makes a pair for each line. 5 items give 10 pairs; 200,000 items give about 20 billion.</figcaption></figure>
${V.like(`<p>A class where every pupil must shake hands with every other pupil. Add one more pupil and they have to shake hands with everyone already there. The room fills with handshakes much faster than with people.</p>`)}
${V.anat([[1,'for (let i = 0; i &lt; arr.length; i++)'],'\n  ',[2,'for (let j = i + 1; j &lt; arr.length; j++)'],'\n    ',[3,'if (arr[i] === arr[j]) return true;']],[
 '<b>Outer loop.</b> Picks each item in turn: n times.',
 '<b>Inner loop.</b> For each of those, walks the rest of the list. Starting at <code>i + 1</code> skips pairs already checked.',
 '<b>The check.</b> Runs about n x n / 2 times. Drop the "/ 2" and you get O(n²).'])}
${V.steps([
 ['The starter <code>hasDuplicate([3, 1, 4, 1, 5])</code>. <b>i</b> points at 3, <b>j</b> at 1. Not equal.',`<svg viewBox="0 0 420 160" role="img" aria-label="Compare 3 and 1">
<rect class="bx-hl" x="40" y="24" width="64" height="52" rx="6"/><text class="t-m" x="72" y="58" text-anchor="middle" style="font-size:20px">3</text>
<rect class="bx-a" x="110" y="24" width="64" height="52" rx="6"/><text class="t-m" x="142" y="58" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx" x="180" y="24" width="64" height="52" rx="6"/><text class="t-m" x="212" y="58" text-anchor="middle" style="font-size:20px">4</text>
<rect class="bx" x="250" y="24" width="64" height="52" rx="6"/><text class="t-m" x="282" y="58" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx" x="320" y="24" width="64" height="52" rx="6"/><text class="t-m" x="352" y="58" text-anchor="middle" style="font-size:20px">5</text>
<text class="t-b t-warn" x="72" y="100" text-anchor="middle">i</text><text class="t-b t-a" x="142" y="100" text-anchor="middle">j</text>
<text class="t-m" x="40" y="142" style="font-size:17px">checks: 1</text>
</svg>`],
 ['j walks on: 3 against 4, then 1, then 5. No match. That is <b>4 checks</b> just for the first item.',`<svg viewBox="0 0 420 160" role="img" aria-label="3 compared with every other item, 4 checks">
<rect class="bx-hl" x="40" y="24" width="64" height="52" rx="6"/><text class="t-m" x="72" y="58" text-anchor="middle" style="font-size:20px">3</text>
<rect class="bx" x="110" y="24" width="64" height="52" rx="6"/><text class="t-m" x="142" y="58" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx" x="180" y="24" width="64" height="52" rx="6"/><text class="t-m" x="212" y="58" text-anchor="middle" style="font-size:20px">4</text>
<rect class="bx" x="250" y="24" width="64" height="52" rx="6"/><text class="t-m" x="282" y="58" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx-a" x="320" y="24" width="64" height="52" rx="6"/><text class="t-m" x="352" y="58" text-anchor="middle" style="font-size:20px">5</text>
<text class="t-b t-warn" x="72" y="100" text-anchor="middle">i</text><text class="t-b t-a" x="352" y="100" text-anchor="middle">j</text>
<text class="t-m" x="40" y="142" style="font-size:17px">checks: 4</text>
</svg>`],
 ['Now <b>i</b> moves to the first 1, and j starts again just after it. 1 against 4: no.',`<svg viewBox="0 0 420 160" role="img" aria-label="i on 1, j on 4">
<rect class="bx" x="40" y="24" width="64" height="52" rx="6"/><text class="t-m t-dim" x="72" y="58" text-anchor="middle" style="font-size:20px">3</text>
<rect class="bx-hl" x="110" y="24" width="64" height="52" rx="6"/><text class="t-m" x="142" y="58" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx-a" x="180" y="24" width="64" height="52" rx="6"/><text class="t-m" x="212" y="58" text-anchor="middle" style="font-size:20px">4</text>
<rect class="bx" x="250" y="24" width="64" height="52" rx="6"/><text class="t-m" x="282" y="58" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx" x="320" y="24" width="64" height="52" rx="6"/><text class="t-m" x="352" y="58" text-anchor="middle" style="font-size:20px">5</text>
<text class="t-b t-warn" x="142" y="100" text-anchor="middle">i</text><text class="t-b t-a" x="212" y="100" text-anchor="middle">j</text>
<text class="t-m" x="40" y="142" style="font-size:17px">checks: 5</text>
</svg>`],
 ['1 against 1: a match, so it returns <b>true</b> after 6 checks. With 200,000 different items it would never find a match and would make about <b>20 billion</b> checks.',`<svg viewBox="0 0 420 160" role="img" aria-label="1 equals 1, return true after 6 checks">
<rect class="bx" x="40" y="24" width="64" height="52" rx="6"/><text class="t-m t-dim" x="72" y="58" text-anchor="middle" style="font-size:20px">3</text>
<rect class="bx-ok" x="110" y="24" width="64" height="52" rx="6"/><text class="t-m" x="142" y="58" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx" x="180" y="24" width="64" height="52" rx="6"/><text class="t-m" x="212" y="58" text-anchor="middle" style="font-size:20px">4</text>
<rect class="bx-ok" x="250" y="24" width="64" height="52" rx="6"/><text class="t-m" x="282" y="58" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx" x="320" y="24" width="64" height="52" rx="6"/><text class="t-m" x="352" y="58" text-anchor="middle" style="font-size:20px">5</text>
<text class="t-b t-warn" x="142" y="100" text-anchor="middle">i</text><text class="t-b t-a" x="282" y="100" text-anchor="middle">j</text>
<text class="t-m" x="40" y="142" style="font-size:17px">checks: 6</text><text class="t-b t-ok" x="250" y="142" style="font-size:17px">return true</text>
</svg>`]])}
${V.hook(`A loop in a loop over the same list: n times n.`)}
`)}

${V.card(4,'Trade memory for speed','a Set remembers what you have seen',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A bouncer at a door with a guest list clipboard, ticking off names">
${V.ic('door',20,30,90,'ic-info')}${V.ic('person',120,50,70,'ic-a')}
<rect class="bx-ok" x="214" y="16" width="190" height="140" rx="10"/>${V.ic('list',226,26,28,'ic-ok')}
<text class="t-b" x="262" y="46">seen</text>
<text class="t-m" x="232" y="82">3  1  4</text>
<text class="t" x="232" y="114">"1 again? Seen it!"</text>
<text class="t-s" x="232" y="140">one glance, any size</text>
</svg><figcaption>A Set is a guest list you can check in one glance, however long it is. Checking is O(1) on average.</figcaption></figure>
${V.like(`<p>A bouncer with a guest list. Instead of comparing each new arrival with everyone inside, they glance at the clipboard: "Already in? Then you are a duplicate." One look per person.</p>`)}
${V.why(`<p>The nested loop compares every pair because it has no memory. Give it memory and each item only needs one look. You spend extra space, up to one entry per item, which is <b>O(n) space</b>, to save a huge amount of time.</p>`)}
${V.anat([[1,'const seen = new Set();'],'\n',[2,'if (seen.has(x))'],' return true;\n',[3,'seen.add(x);']],[
 '<b>Make the memory.</b> An empty Set, before the loop.',
 '<b>Check.</b> <code>has</code> answers "have I seen this?" in O(1) on average.',
 '<b>Remember.</b> Add the item so later items can find it.'])}
${V.steps([
 ['Read <b>3</b>. Not in seen, so add it.',`<svg viewBox="0 0 420 150" role="img" aria-label="Read 3, add to seen">
<rect class="bx-hl" x="40" y="16" width="60" height="46" rx="6"/><text class="t-m" x="70" y="46" text-anchor="middle" style="font-size:20px">3</text><rect class="bx" x="108" y="16" width="60" height="46" rx="6"/><text class="t-m" x="138" y="46" text-anchor="middle" style="font-size:20px">1</text><rect class="bx" x="176" y="16" width="60" height="46" rx="6"/><text class="t-m" x="206" y="46" text-anchor="middle" style="font-size:20px">4</text><rect class="bx" x="244" y="16" width="60" height="46" rx="6"/><text class="t-m" x="274" y="46" text-anchor="middle" style="font-size:20px">1</text><rect class="bx" x="312" y="16" width="60" height="46" rx="6"/><text class="t-m" x="342" y="46" text-anchor="middle" style="font-size:20px">5</text>
<text class="t-m" x="40" y="118" style="font-size:17px">seen</text><rect class="bx-ok" x="96" y="92" width="276" height="40" rx="8"/><text class="t-m" x="110" y="118" style="font-size:18px">{ 3 }</text>
</svg>`],
 ['Read <b>1</b>, then <b>4</b>. Neither is in seen, so both are added.',`<svg viewBox="0 0 420 150" role="img" aria-label="Read 1 and 4, add both">
<rect class="bx" x="40" y="16" width="60" height="46" rx="6"/><text class="t-m t-dim" x="70" y="46" text-anchor="middle" style="font-size:20px">3</text><rect class="bx" x="108" y="16" width="60" height="46" rx="6"/><text class="t-m t-dim" x="138" y="46" text-anchor="middle" style="font-size:20px">1</text><rect class="bx-hl" x="176" y="16" width="60" height="46" rx="6"/><text class="t-m" x="206" y="46" text-anchor="middle" style="font-size:20px">4</text><rect class="bx" x="244" y="16" width="60" height="46" rx="6"/><text class="t-m" x="274" y="46" text-anchor="middle" style="font-size:20px">1</text><rect class="bx" x="312" y="16" width="60" height="46" rx="6"/><text class="t-m" x="342" y="46" text-anchor="middle" style="font-size:20px">5</text>
<text class="t-m" x="40" y="118" style="font-size:17px">seen</text><rect class="bx-ok" x="96" y="92" width="276" height="40" rx="8"/><text class="t-m" x="110" y="118" style="font-size:18px">{ 3, 1, 4 }</text>
</svg>`],
 ['Read <b>1</b> again. <code>seen.has(1)</code> is true, so return <b>true</b>. Only 4 looks, and 200,000 items would take 200,000 looks, not 20 billion.',`<svg viewBox="0 0 420 150" role="img" aria-label="1 is already in seen, return true">
<rect class="bx" x="40" y="16" width="60" height="46" rx="6"/><text class="t-m t-dim" x="70" y="46" text-anchor="middle" style="font-size:20px">3</text><rect class="bx" x="108" y="16" width="60" height="46" rx="6"/><text class="t-m t-dim" x="138" y="46" text-anchor="middle" style="font-size:20px">1</text><rect class="bx" x="176" y="16" width="60" height="46" rx="6"/><text class="t-m t-dim" x="206" y="46" text-anchor="middle" style="font-size:20px">4</text><rect class="bx-ok" x="244" y="16" width="60" height="46" rx="6"/><text class="t-m" x="274" y="46" text-anchor="middle" style="font-size:20px">1</text><rect class="bx" x="312" y="16" width="60" height="46" rx="6"/><text class="t-m" x="342" y="46" text-anchor="middle" style="font-size:20px">5</text>
<text class="t-m" x="40" y="118" style="font-size:17px">seen</text><rect class="bx-ok" x="96" y="92" width="276" height="40" rx="8"/><text class="t-m" x="110" y="118" style="font-size:18px">{ 3, <tspan class="t-ok" style="font-weight:700">1</tspan>, 4 }</text>
<text class="t-b t-ok" x="274" y="84" text-anchor="middle">found!</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('seen.has(x)','Set lookup: O(1) on average'),V.no('seenArray.includes(x)','An array search is O(n), so you are back to O(n²)'),
 V.ok('return true','Stop the moment you find a duplicate'),V.ok('return false','Only after the loop: no duplicate anywhere'))}
${V.build(`<ol><li>Answer the first task by counting the loops in the starter.</li><li>Replace the two loops with one <code>for...of</code> loop.</li><li>Make an empty Set before it.</li><li>Inside: if the Set has the item, return true; otherwise add it.</li><li>After the loop, return false. Run it and watch the 200,000-item test pass.</li></ol>`)}
${V.hook(`Spend memory, save time: a Set turns n² into n.`)}
`)}

<div class="try"><b>Try it in your head</b>1. A function loops over a list once, then loops over it again. What is its Big-O? <i>O(n): 2n drops its constant.</i> 2. Searching a sorted list of 1,000,000 by halving takes about how many steps? <i>About 20.</i> 3. How much extra memory does the Set version use in the worst case? <i>O(n): one entry per item.</i></div>
`);

explain('a2',`
<p>Most "easy" interview questions about lists and words are solved with one trick: remember what you have seen in a hash map. Learn the trick once and dozens of problems turn from slow to instant.</p>

${V.card(1,'Hash maps','jump straight to the right drawer',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="The key cat goes through a hash function and comes out as drawer number 2">
<rect class="bx-a" x="10" y="24" width="96" height="48" rx="8"/><text class="t-m" x="58" y="54" text-anchor="middle" style="font-size:19px">'cat'</text>
<path class="ln-a" d="M108 48H150"/><polygon class="ah-a" points="148,41 148,55 160,48"/>
${V.ic('gear',164,18,60,'ic-a')}<text class="t-s" x="194" y="94" text-anchor="middle">hash function</text>
<path class="ln-a" d="M228 48H270"/><polygon class="ah-a" points="268,41 268,55 280,48"/>
<rect class="bx-warn" x="284" y="24" width="60" height="48" rx="8"/><text class="t-m" x="314" y="55" text-anchor="middle" style="font-size:22px">2</text>
<rect class="bx" x="18" y="118" width="72" height="56" rx="6"/><rect class="bx" x="98" y="118" width="72" height="56" rx="6"/><rect class="bx-ok" x="178" y="118" width="72" height="56" rx="6"/><rect class="bx" x="258" y="118" width="72" height="56" rx="6"/><rect class="bx" x="338" y="118" width="72" height="56" rx="6"/>
<text class="t-s" x="54" y="112" text-anchor="middle">0</text><text class="t-s" x="134" y="112" text-anchor="middle">1</text><text class="t-b t-ok" x="214" y="112" text-anchor="middle">2</text><text class="t-s" x="294" y="112" text-anchor="middle">3</text><text class="t-s" x="374" y="112" text-anchor="middle">4</text>
<text class="t-m" x="214" y="152" text-anchor="middle">cat: 3</text>
</svg><figcaption>A hash function turns a key into a drawer number. To find the key later, run the same function and open that one drawer. No searching. (The numbers here are made up.)</figcaption></figure>
${V.like(`<p>A cloakroom. You hand over your coat and get ticket 2. Later you show ticket 2 and the attendant goes straight to peg 2. They never check every coat on the rail.</p>`)}
${V.why(`<p>Finding a value in a plain array means checking items one by one: O(n). In the 1950s, engineers at IBM worked out how to turn a key into a storage position with arithmetic. That idea, the hash table, makes adding and finding take O(1) on average. In JavaScript, <code>Map</code>, <code>Set</code> and plain objects are all hash tables.</p>`)}
${V.steps([
 ['<code>map.set(\'cat\', 3)</code>. The hash function turns \'cat\' into drawer <b>2</b>.',`<svg viewBox="0 0 420 180" role="img" aria-label="cat hashes to 2">
<text class="t-m" x="10" y="32" style="font-size:17px">set('cat', 3)</text><text class="t-m t-a" x="250" y="32" style="font-size:17px">hash: 2</text>
<rect class="bx" x="18" y="96" width="72" height="56" rx="6"/><rect class="bx" x="98" y="96" width="72" height="56" rx="6"/><rect class="bx-hl" x="178" y="96" width="72" height="56" rx="6"/><rect class="bx" x="258" y="96" width="72" height="56" rx="6"/><rect class="bx" x="338" y="96" width="72" height="56" rx="6"/>
<text class="t-s" x="54" y="88" text-anchor="middle">0</text><text class="t-s" x="134" y="88" text-anchor="middle">1</text><text class="t-s" x="214" y="88" text-anchor="middle">2</text><text class="t-s" x="294" y="88" text-anchor="middle">3</text><text class="t-s" x="374" y="88" text-anchor="middle">4</text>
</svg>`],
 ['The pair <b>cat: 3</b> goes into drawer 2.',`<svg viewBox="0 0 420 180" role="img" aria-label="cat 3 stored in drawer 2">
<text class="t-m" x="10" y="32" style="font-size:17px">set('cat', 3)</text><text class="t-m t-a" x="250" y="32" style="font-size:17px">hash: 2</text>
<rect class="bx" x="18" y="96" width="72" height="56" rx="6"/><rect class="bx" x="98" y="96" width="72" height="56" rx="6"/><rect class="bx-ok" x="178" y="96" width="72" height="56" rx="6"/><rect class="bx" x="258" y="96" width="72" height="56" rx="6"/><rect class="bx" x="338" y="96" width="72" height="56" rx="6"/>
<text class="t-s" x="54" y="88" text-anchor="middle">0</text><text class="t-s" x="134" y="88" text-anchor="middle">1</text><text class="t-s" x="214" y="88" text-anchor="middle">2</text><text class="t-s" x="294" y="88" text-anchor="middle">3</text><text class="t-s" x="374" y="88" text-anchor="middle">4</text>
<text class="t-m" x="214" y="130" text-anchor="middle">cat: 3</text>
</svg>`],
 ['<code>map.set(\'dog\', 5)</code>. \'dog\' hashes to drawer <b>4</b>, so it goes there.',`<svg viewBox="0 0 420 180" role="img" aria-label="dog hashes to 4 and is stored there">
<text class="t-m" x="10" y="32" style="font-size:17px">set('dog', 5)</text><text class="t-m t-a" x="250" y="32" style="font-size:17px">hash: 4</text>
<rect class="bx" x="18" y="96" width="72" height="56" rx="6"/><rect class="bx" x="98" y="96" width="72" height="56" rx="6"/><rect class="bx-ok" x="178" y="96" width="72" height="56" rx="6"/><rect class="bx" x="258" y="96" width="72" height="56" rx="6"/><rect class="bx-ok" x="338" y="96" width="72" height="56" rx="6"/>
<text class="t-s" x="54" y="88" text-anchor="middle">0</text><text class="t-s" x="134" y="88" text-anchor="middle">1</text><text class="t-s" x="214" y="88" text-anchor="middle">2</text><text class="t-s" x="294" y="88" text-anchor="middle">3</text><text class="t-s" x="374" y="88" text-anchor="middle">4</text>
<text class="t-m" x="214" y="130" text-anchor="middle">cat: 3</text><text class="t-m" x="374" y="130" text-anchor="middle">dog: 5</text>
</svg>`],
 ['<code>map.get(\'cat\')</code>. Hash \'cat\' again: drawer 2. Open it and hand back <b>3</b>. One step, whether the map holds 2 keys or 2 million.',`<svg viewBox="0 0 420 180" role="img" aria-label="get cat jumps to drawer 2 and returns 3">
<text class="t-m" x="10" y="32" style="font-size:17px">get('cat')</text><text class="t-m t-a" x="250" y="32" style="font-size:17px">hash: 2</text>
<rect class="bx" x="18" y="96" width="72" height="56" rx="6"/><rect class="bx" x="98" y="96" width="72" height="56" rx="6"/><rect class="bx-hl" x="178" y="96" width="72" height="56" rx="6"/><rect class="bx" x="258" y="96" width="72" height="56" rx="6"/><rect class="bx-ok" x="338" y="96" width="72" height="56" rx="6"/>
<text class="t-s" x="54" y="88" text-anchor="middle">0</text><text class="t-s" x="134" y="88" text-anchor="middle">1</text><text class="t-s" x="214" y="88" text-anchor="middle">2</text><text class="t-s" x="294" y="88" text-anchor="middle">3</text><text class="t-s" x="374" y="88" text-anchor="middle">4</text>
<text class="t-m" x="214" y="130" text-anchor="middle">cat: 3</text><text class="t-m" x="374" y="130" text-anchor="middle">dog: 5</text>
<text class="t-b t-ok" x="214" y="176" text-anchor="middle">returns 3</text>
</svg>`]])}
${V.rules(V.rh('Pick the right tool'),
 V.ok('new Map()','Key to value. Any type of key, keeps insertion order'),V.ok('new Set()','Keys only: "have I seen this?"'),
 V.ok('{} plain object','Fine for counting letters. Keys always become strings'),V.no('map[key] = value','On a Map, use map.set(key, value) and map.get(key)'),
 V.ok('map.has(key)','true or false. get on a missing key gives undefined'))}
${V.hook(`Same key, same drawer. Hash it and jump.`)}
`)}

${V.card(2,'twoSum','look for the partner you need',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="The number 7 needs a partner of 2 to make 9">
<rect class="bx-a" x="40" y="40" width="80" height="64" rx="10"/><text class="t-m" x="80" y="81" text-anchor="middle" style="font-size:26px">7</text>
<text class="t-m" x="150" y="82" text-anchor="middle" style="font-size:24px">+</text>
<rect class="ln-d" x="180" y="40" width="80" height="64" rx="10"/><text class="t-m t-a" x="220" y="81" text-anchor="middle" style="font-size:26px">?</text>
<text class="t-m" x="290" y="82" text-anchor="middle" style="font-size:24px">=</text>
<rect class="bx-ok" x="320" y="40" width="80" height="64" rx="10"/><text class="t-m" x="360" y="81" text-anchor="middle" style="font-size:26px">9</text>
<text class="t" x="220" y="136" text-anchor="middle">need = 9 - 7 = 2</text>
</svg><figcaption>For each number you know exactly which partner you need: target minus the number. So ask the map: "have I already seen it?"</figcaption></figure>
${V.like(`<p>A school disco where pairs must have badge numbers adding up to 9. You hold 7, so you look at the list by the door for a 2. If no 2 has arrived yet, you write your own name and number on the list for whoever comes next.</p>`)}
${V.anat([[1,'const need = target - nums[i];'],'\n',[2,'if (seen.has(need))'],' ',[3,'return [seen.get(need), i];'],'\n',[4,'seen.set(nums[i], i);']],[
 '<b>Work out the partner.</b> The one number that would complete the pair.',
 '<b>Ask the map.</b> O(1) on average.',
 '<b>Found it.</b> Return the partner\'s index first, then yours.',
 '<b>Not yet.</b> Store your value and index so a later number can find you.'])}
${V.steps([
 ['<code>twoSum([3, 2, 4], 6)</code>. i = 0: the number is 3, so we need 6 - 3 = <b>3</b>. The map is empty, so store <b>3 at index 0</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="i 0: need 3, not seen, store 3 to 0">
<rect class="bx-hl" x="40" y="14" width="70" height="48" rx="6"/><text class="t-m" x="75" y="45" text-anchor="middle" style="font-size:20px">3</text><rect class="bx" x="118" y="14" width="70" height="48" rx="6"/><text class="t-m" x="153" y="45" text-anchor="middle" style="font-size:20px">2</text><rect class="bx" x="196" y="14" width="70" height="48" rx="6"/><text class="t-m" x="231" y="45" text-anchor="middle" style="font-size:20px">4</text>
<text class="t-m" x="290" y="45">need 3</text>
<text class="t-m" x="40" y="128" style="font-size:17px">seen</text><rect class="bx-ok" x="100" y="100" width="300" height="44" rx="8"/><text class="t-m" x="114" y="128" style="font-size:17px">3 → 0</text>
</svg>`],
 ['i = 1: the number is 2, so we need <b>4</b>. No 4 in the map. Store <b>2 at index 1</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="i 1: need 4, not seen, store 2 to 1">
<rect class="bx" x="40" y="14" width="70" height="48" rx="6"/><text class="t-m t-dim" x="75" y="45" text-anchor="middle" style="font-size:20px">3</text><rect class="bx-hl" x="118" y="14" width="70" height="48" rx="6"/><text class="t-m" x="153" y="45" text-anchor="middle" style="font-size:20px">2</text><rect class="bx" x="196" y="14" width="70" height="48" rx="6"/><text class="t-m" x="231" y="45" text-anchor="middle" style="font-size:20px">4</text>
<text class="t-m" x="290" y="45">need 4</text>
<text class="t-m" x="40" y="128" style="font-size:17px">seen</text><rect class="bx-ok" x="100" y="100" width="300" height="44" rx="8"/><text class="t-m" x="114" y="128" style="font-size:17px">3 → 0</text><text class="t-m" x="214" y="128" style="font-size:17px">2 → 1</text>
</svg>`],
 ['i = 2: the number is 4, so we need <b>2</b>. The map has 2 at index 1. Return <b>[1, 2]</b>. One pass: O(n).',`<svg viewBox="0 0 420 170" role="img" aria-label="i 2: need 2, found at index 1, return 1, 2">
<rect class="bx" x="40" y="14" width="70" height="48" rx="6"/><text class="t-m t-dim" x="75" y="45" text-anchor="middle" style="font-size:20px">3</text><rect class="bx-ok" x="118" y="14" width="70" height="48" rx="6"/><text class="t-m" x="153" y="45" text-anchor="middle" style="font-size:20px">2</text><rect class="bx-ok" x="196" y="14" width="70" height="48" rx="6"/><text class="t-m" x="231" y="45" text-anchor="middle" style="font-size:20px">4</text>
<text class="t-m" x="290" y="45">need 2</text>
<text class="t-m" x="40" y="128" style="font-size:17px">seen</text><rect class="bx-ok" x="100" y="100" width="300" height="44" rx="8"/><text class="t-m" x="114" y="128" style="font-size:17px">3 → 0</text><text class="t-m t-ok" x="214" y="128" style="font-size:17px;font-weight:700">2 → 1</text>
<text class="t-b t-ok" x="290" y="82" style="font-size:17px">return [1, 2]</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('check, then store','Check before you add, so a number never pairs with itself'),V.no('two loops over every pair','Works, but O(n²): too slow for 100,000 items'),
 V.ok('value → index','Store the index as the value: the answer needs positions'))}
${V.hook(`Need = target minus me. Seen it? Done. Not yet? Write me down.`)}
`)}

${V.card(3,'Counting with a map','tally marks for letters',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="Dormitory and Dirty room become the same letter counts">
<text class="t-m" x="10" y="30" style="font-size:17px">"Dormitory"</text><text class="t-m" x="410" y="30" text-anchor="end" style="font-size:17px">"Dirty room"</text>
<text class="t-s" x="10" y="56">lowercase, no spaces</text><text class="t-s" x="410" y="56" text-anchor="end">lowercase, no spaces</text>
<rect class="bx-info" x="10" y="72" width="400" height="96" rx="10"/>
<text class="t-m" x="26" y="104">d:1  o:2  r:2  m:1</text><text class="t-m" x="26" y="140">i:1  t:1  y:1</text>
${V.ic('check',346,94,48,'ic-ok')}
</svg><figcaption>Two words are anagrams when every letter appears the same number of times. Clean the input first, then count.</figcaption></figure>
${V.like(`<p>Two bags of Scrabble tiles. Tip each bag out and sort the tiles into piles by letter. If every pile is the same height in both, the bags can spell each other's words.</p>`)}
${V.anat([[1,'counts[c]'],' = ',[2,'(counts[c] || 0)'],' ',[3,'+ 1'],';'],[
 '<b>The tally for letter c.</b>',
 '<b>The current count,</b> or 0 if this letter has not appeared yet. Without <code>|| 0</code> you get <code>undefined + 1</code>, which is NaN.',
 '<b>Add one</b> for this letter.'])}
${V.steps([
 ['<code>firstUniqueChar("swiss")</code>. Pass 1: walk the word and count every letter.',`<svg viewBox="0 0 420 160" role="img" aria-label="Counts for swiss: s 3, w 1, i 1">
<rect class="bx" x="40" y="14" width="60" height="46" rx="6"/><text class="t-m" x="70" y="44" text-anchor="middle" style="font-size:20px">s</text><rect class="bx" x="108" y="14" width="60" height="46" rx="6"/><text class="t-m" x="138" y="44" text-anchor="middle" style="font-size:20px">w</text><rect class="bx" x="176" y="14" width="60" height="46" rx="6"/><text class="t-m" x="206" y="44" text-anchor="middle" style="font-size:20px">i</text><rect class="bx" x="244" y="14" width="60" height="46" rx="6"/><text class="t-m" x="274" y="44" text-anchor="middle" style="font-size:20px">s</text><rect class="bx" x="312" y="14" width="60" height="46" rx="6"/><text class="t-m" x="342" y="44" text-anchor="middle" style="font-size:20px">s</text>
<text class="t-m" x="40" y="122" style="font-size:17px">counts</text><rect class="bx-info" x="120" y="96" width="252" height="40" rx="8"/><text class="t-m" x="134" y="122" style="font-size:17px">s:3  w:1  i:1</text>
</svg>`],
 ['Pass 2: walk the word again. Index 0 is <b>s</b>, and s appears 3 times. Not unique, keep going.',`<svg viewBox="0 0 420 160" role="img" aria-label="Index 0 is s with count 3: skip">
<rect class="bx-bad" x="40" y="14" width="60" height="46" rx="6"/><text class="t-m" x="70" y="44" text-anchor="middle" style="font-size:20px">s</text><rect class="bx" x="108" y="14" width="60" height="46" rx="6"/><text class="t-m" x="138" y="44" text-anchor="middle" style="font-size:20px">w</text><rect class="bx" x="176" y="14" width="60" height="46" rx="6"/><text class="t-m" x="206" y="44" text-anchor="middle" style="font-size:20px">i</text><rect class="bx" x="244" y="14" width="60" height="46" rx="6"/><text class="t-m" x="274" y="44" text-anchor="middle" style="font-size:20px">s</text><rect class="bx" x="312" y="14" width="60" height="46" rx="6"/><text class="t-m" x="342" y="44" text-anchor="middle" style="font-size:20px">s</text>
<text class="t-b t-bad" x="70" y="82" text-anchor="middle">3</text>
<text class="t-m" x="40" y="122" style="font-size:17px">counts</text><rect class="bx-info" x="120" y="96" width="252" height="40" rx="8"/><text class="t-m" x="134" y="122" style="font-size:17px">s:3  w:1  i:1</text>
</svg>`],
 ['Index 1 is <b>w</b>, and w appears once. Return <b>1</b>. Two passes over the word is 2n steps, which is still O(n).',`<svg viewBox="0 0 420 160" role="img" aria-label="Index 1 is w with count 1: return 1">
<rect class="bx" x="40" y="14" width="60" height="46" rx="6"/><text class="t-m t-dim" x="70" y="44" text-anchor="middle" style="font-size:20px">s</text><rect class="bx-ok" x="108" y="14" width="60" height="46" rx="6"/><text class="t-m" x="138" y="44" text-anchor="middle" style="font-size:20px">w</text><rect class="bx" x="176" y="14" width="60" height="46" rx="6"/><text class="t-m" x="206" y="44" text-anchor="middle" style="font-size:20px">i</text><rect class="bx" x="244" y="14" width="60" height="46" rx="6"/><text class="t-m" x="274" y="44" text-anchor="middle" style="font-size:20px">s</text><rect class="bx" x="312" y="14" width="60" height="46" rx="6"/><text class="t-m" x="342" y="44" text-anchor="middle" style="font-size:20px">s</text>
<text class="t-b t-ok" x="138" y="82" text-anchor="middle">1</text>
<text class="t-m" x="40" y="122" style="font-size:17px">counts</text><rect class="bx-info" x="120" y="96" width="252" height="40" rx="8"/><text class="t-m" x="134" y="122" style="font-size:17px">s:3  w:1  i:1</text>
<text class="t-b t-ok" x="290" y="82" style="font-size:17px">return 1</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('s.toLowerCase()','Normalise first: make every letter the same case'),V.ok("replace(/\\s/g, '')",'Then remove spaces: \\s matches any whitespace'),V.no('"D" !== "d"','Without lowercasing, capitals count as different letters'),
 V.ok('a.length !== b.length','Different lengths after cleaning? Return false straight away'),V.ok('return -1','The usual answer for "not found"'))}
${V.build(`<ol><li><code>twoSum</code>: one loop, a Map of value to index, check for <code>target - nums[i]</code> before storing.</li><li><code>isAnagram</code>: clean both words, compare lengths, count the letters of the first, then subtract the letters of the second. Any count that would go below zero means false.</li><li><code>firstUniqueChar</code>: count every letter, then walk again and return the first index whose count is 1, or -1.</li></ol>`)}
${V.hook(`Clean it, count it, compare it.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Why is <code>map.get(key)</code> O(1) on average? <i>The hash sends you straight to one drawer.</i> 2. In twoSum with target 10, you reach 6. What do you look for? <i>4.</i> 3. What is the first unique letter of "aabcb"? <i>c, at index 3.</i></div>
`);

explain('a3',`
<p>The undo button, the browser's back button and the print queue are all built from three simple shapes for storing data. Each one decides <b>which item comes out next</b>, and picking the right one makes hard problems easy.</p>

${V.card(1,'Stacks','last in, first out',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="A stack of plates: push adds to the top, pop takes from the top">
<rect class="bx" x="120" y="148" width="180" height="26" rx="12"/><text class="t-m" x="210" y="166" text-anchor="middle">plate 1</text>
<rect class="bx" x="120" y="118" width="180" height="26" rx="12"/><text class="t-m" x="210" y="136" text-anchor="middle">plate 2</text>
<rect class="bx-a" x="120" y="88" width="180" height="26" rx="12"/><text class="t-m" x="210" y="106" text-anchor="middle">plate 3</text>
<path class="ln-ok" d="M60 30C60 70 90 92 112 98"/><polygon class="ah-ok" points="108,90 110,104 120,98"/><text class="t-b t-ok" x="26" y="24">push</text>
<path class="ln-a" d="M308 98C330 92 360 70 360 36"/><polygon class="ah-a" points="353,40 367,40 360,28"/><text class="t-b t-a" x="368" y="24" text-anchor="end">pop</text>
<text class="t-s" x="210" y="74" text-anchor="middle">top: the only plate you can touch</text>
</svg><figcaption>A stack only lets you add or remove at the top. The last thing pushed is the first thing popped: LIFO, last in, first out.</figcaption></figure>
${V.like(`<p>A pile of plates in the school canteen. Clean plates go on the top, and you take from the top. The plate at the bottom waits until every plate above it has gone.</p>`)}
${V.why(`<p>Lots of problems are about "the most recent thing first". Undo reverses your latest action. The back button returns to your latest page. When functions call other functions, the computer keeps a <b>call stack</b> so it can return to the latest caller first.</p>`)}
${V.anat([[1,'stack.push(c)'],'      ',[2,'stack.pop()'],'      ',[3,'stack.length === 0']],[
 '<b>push</b> puts an item on top. O(1).',
 '<b>pop</b> removes the top item and gives it back. O(1). On an empty array it gives <code>undefined</code>.',
 '<b>Empty?</b> Every bracket matched only if nothing is left over at the end.'])}
<p><b>Watch a stack check brackets.</b> Every closing bracket must match the most recent opening one.</p>
${V.steps([
 ['Reading <code>{[()]}</code>. The first character <b>{</b> is an opener, so push it.',`<svg viewBox="0 0 420 200" role="img" aria-label="Push the curly brace">
<rect class="bx-hl" x="80" y="10" width="44" height="44" rx="6"/><text class="t-m" x="102" y="39" text-anchor="middle" style="font-size:20px">{</text><rect class="bx" x="128" y="10" width="44" height="44" rx="6"/><text class="t-m" x="150" y="39" text-anchor="middle" style="font-size:20px">[</text><rect class="bx" x="176" y="10" width="44" height="44" rx="6"/><text class="t-m" x="198" y="39" text-anchor="middle" style="font-size:20px">(</text><rect class="bx" x="224" y="10" width="44" height="44" rx="6"/><text class="t-m" x="246" y="39" text-anchor="middle" style="font-size:20px">)</text><rect class="bx" x="272" y="10" width="44" height="44" rx="6"/><text class="t-m" x="294" y="39" text-anchor="middle" style="font-size:20px">]</text><rect class="bx" x="320" y="10" width="44" height="44" rx="6"/><text class="t-m" x="342" y="39" text-anchor="middle" style="font-size:20px">}</text>
<path class="ln" d="M40 194H160"/><text class="t-s" x="100" y="72" text-anchor="middle">stack</text>
<rect class="bx-a" x="50" y="158" width="100" height="32" rx="6"/><text class="t-m" x="100" y="180" text-anchor="middle" style="font-size:18px">{</text>
<text class="t-b t-ok" x="190" y="180">push {</text>
</svg>`],
 ['<b>[</b> and <b>(</b> are openers too. Push both. <b>(</b> is now on top.',`<svg viewBox="0 0 420 200" role="img" aria-label="Push square bracket and round bracket">
<rect class="bx" x="80" y="10" width="44" height="44" rx="6"/><text class="t-m t-dim" x="102" y="39" text-anchor="middle" style="font-size:20px">{</text><rect class="bx" x="128" y="10" width="44" height="44" rx="6"/><text class="t-m" x="150" y="39" text-anchor="middle" style="font-size:20px">[</text><rect class="bx-hl" x="176" y="10" width="44" height="44" rx="6"/><text class="t-m" x="198" y="39" text-anchor="middle" style="font-size:20px">(</text><rect class="bx" x="224" y="10" width="44" height="44" rx="6"/><text class="t-m" x="246" y="39" text-anchor="middle" style="font-size:20px">)</text><rect class="bx" x="272" y="10" width="44" height="44" rx="6"/><text class="t-m" x="294" y="39" text-anchor="middle" style="font-size:20px">]</text><rect class="bx" x="320" y="10" width="44" height="44" rx="6"/><text class="t-m" x="342" y="39" text-anchor="middle" style="font-size:20px">}</text>
<path class="ln" d="M40 194H160"/><text class="t-s" x="100" y="72" text-anchor="middle">stack</text>
<rect class="bx" x="50" y="158" width="100" height="32" rx="6"/><text class="t-m" x="100" y="180" text-anchor="middle" style="font-size:18px">{</text>
<rect class="bx" x="50" y="122" width="100" height="32" rx="6"/><text class="t-m" x="100" y="144" text-anchor="middle" style="font-size:18px">[</text>
<rect class="bx-a" x="50" y="86" width="100" height="32" rx="6"/><text class="t-m" x="100" y="108" text-anchor="middle" style="font-size:18px">(</text>
<text class="t-b t-ok" x="190" y="108">push [ then (</text>
</svg>`],
 ['<b>)</b> is a closer. Pop the top: it is <b>(</b>, the matching opener. Good.',`<svg viewBox="0 0 420 200" role="img" aria-label="Pop the round bracket: it matches">
<rect class="bx" x="80" y="10" width="44" height="44" rx="6"/><text class="t-m t-dim" x="102" y="39" text-anchor="middle" style="font-size:20px">{</text><rect class="bx" x="128" y="10" width="44" height="44" rx="6"/><text class="t-m t-dim" x="150" y="39" text-anchor="middle" style="font-size:20px">[</text><rect class="bx" x="176" y="10" width="44" height="44" rx="6"/><text class="t-m t-dim" x="198" y="39" text-anchor="middle" style="font-size:20px">(</text><rect class="bx-hl" x="224" y="10" width="44" height="44" rx="6"/><text class="t-m" x="246" y="39" text-anchor="middle" style="font-size:20px">)</text><rect class="bx" x="272" y="10" width="44" height="44" rx="6"/><text class="t-m" x="294" y="39" text-anchor="middle" style="font-size:20px">]</text><rect class="bx" x="320" y="10" width="44" height="44" rx="6"/><text class="t-m" x="342" y="39" text-anchor="middle" style="font-size:20px">}</text>
<path class="ln" d="M40 194H160"/><text class="t-s" x="100" y="72" text-anchor="middle">stack</text>
<rect class="bx" x="50" y="158" width="100" height="32" rx="6"/><text class="t-m" x="100" y="180" text-anchor="middle" style="font-size:18px">{</text>
<rect class="bx-a" x="50" y="122" width="100" height="32" rx="6"/><text class="t-m" x="100" y="144" text-anchor="middle" style="font-size:18px">[</text>
<text class="t-b t-ok" x="190" y="108">pop ( matches )</text>
</svg>`],
 ['<b>]</b> pops <b>[</b> and <b>}</b> pops <b>{</b>. Both match, and the stack ends empty, so return <b>true</b>.',`<svg viewBox="0 0 420 200" role="img" aria-label="All matched, stack empty, return true">
<rect class="bx" x="80" y="10" width="44" height="44" rx="6"/><text class="t-m t-dim" x="102" y="39" text-anchor="middle" style="font-size:20px">{</text><rect class="bx" x="128" y="10" width="44" height="44" rx="6"/><text class="t-m t-dim" x="150" y="39" text-anchor="middle" style="font-size:20px">[</text><rect class="bx" x="176" y="10" width="44" height="44" rx="6"/><text class="t-m t-dim" x="198" y="39" text-anchor="middle" style="font-size:20px">(</text><rect class="bx" x="224" y="10" width="44" height="44" rx="6"/><text class="t-m t-dim" x="246" y="39" text-anchor="middle" style="font-size:20px">)</text><rect class="bx" x="272" y="10" width="44" height="44" rx="6"/><text class="t-m t-dim" x="294" y="39" text-anchor="middle" style="font-size:20px">]</text><rect class="bx-hl" x="320" y="10" width="44" height="44" rx="6"/><text class="t-m" x="342" y="39" text-anchor="middle" style="font-size:20px">}</text>
<path class="ln" d="M40 194H160"/><text class="t-s" x="100" y="72" text-anchor="middle">stack</text>
<text class="t-s" x="100" y="180" text-anchor="middle">(empty)</text>
<text class="t-b t-ok" x="190" y="180" style="font-size:17px">return true</text>
</svg>`],
 ['Now <code>([)]</code>. Push <b>(</b>, push <b>[</b>. Then <b>)</b> pops <b>[</b>, which does not match. Return <b>false</b> at once.',`<svg viewBox="0 0 420 200" role="img" aria-label="Round bracket closes but the top is a square bracket: return false">
<rect class="bx" x="80" y="10" width="44" height="44" rx="6"/><text class="t-m t-dim" x="102" y="39" text-anchor="middle" style="font-size:20px">(</text><rect class="bx" x="128" y="10" width="44" height="44" rx="6"/><text class="t-m t-dim" x="150" y="39" text-anchor="middle" style="font-size:20px">[</text><rect class="bx-hl" x="176" y="10" width="44" height="44" rx="6"/><text class="t-m" x="198" y="39" text-anchor="middle" style="font-size:20px">)</text><rect class="bx" x="224" y="10" width="44" height="44" rx="6"/><text class="t-m" x="246" y="39" text-anchor="middle" style="font-size:20px">]</text>
<path class="ln" d="M40 194H160"/><text class="t-s" x="100" y="72" text-anchor="middle">stack</text>
<rect class="bx" x="50" y="158" width="100" height="32" rx="6"/><text class="t-m" x="100" y="180" text-anchor="middle" style="font-size:18px">(</text>
<rect class="bx-bad" x="50" y="122" width="100" height="32" rx="6"/><text class="t-m" x="100" y="144" text-anchor="middle" style="font-size:18px">[</text>
<text class="t-b t-bad" x="190" y="144">pop [ but saw )</text>
<text class="t-b t-bad" x="190" y="180" style="font-size:17px">return false</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok("{ ')': '(', ']': '[', '}': '{' }",'A lookup object from each closer to its opener'),V.no('return true at the end','Wrong for "((": always return stack.length === 0'),
 V.ok('"]" first','Popping an empty stack gives undefined: no match, so false'))}
${V.hook(`Plates on a pile: last on, first off.`)}
`)}

${V.card(2,'Queues','first in, first out',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="A queue of three people at a shop till: served from the front, joining at the back">
${V.ic('house',12,30,70,'ic-info')}<text class="t-s" x="47" y="124" text-anchor="middle">till</text>
${V.ic('person',110,40,56,'ic-ok')}${V.ic('person',190,40,56,'ic-a')}${V.ic('person',270,40,56,'ic-a')}
<text class="t-b t-ok" x="138" y="124" text-anchor="middle">front</text><text class="t-b" x="298" y="124" text-anchor="middle">back</text>
<path class="ln-d" d="M346 68H400"/><polygon class="ah" points="342,61 342,75 332,68"/><text class="t-s" x="380" y="54" text-anchor="middle">join</text>
<text class="t-s" x="210" y="152" text-anchor="middle">dequeue from the front, enqueue at the back</text>
</svg><figcaption>A queue serves people in the order they arrived: FIFO, first in, first out.</figcaption></figure>
${V.like(`<p>The queue at a shop till. New people join at the back. The person at the front is served next. Nobody pushes in.</p>`)}
${V.why(`<p>Fairness and order. Print jobs, messages waiting to be sent and background tasks should be handled in the order they arrived. Breadth-first search, in the next lesson, also depends on a queue.</p>`)}
${V.anat([[1,'this.items[this.tail++] = value;'],'\n',[2,'const value = this.items[this.head];'],'\n',[3,'delete this.items[this.head++];']],[
 '<b>Enqueue.</b> Store at slot <code>tail</code>, then move tail on by one. <code>tail++</code> uses the old number first, then adds 1.',
 '<b>Read the front</b> item at slot <code>head</code>.',
 '<b>Dequeue.</b> Remove it and move head on. Nothing else moves, so it is O(1).'])}
${V.steps([
 ['An empty queue. <b>head</b> and <b>tail</b> are both 0, so size = tail - head = 0.',`<svg viewBox="0 0 420 160" role="img" aria-label="Empty queue, head 0, tail 0">
<rect class="bx" x="40" y="30" width="76" height="50" rx="6"/><rect class="bx" x="122" y="30" width="76" height="50" rx="6"/><rect class="bx" x="204" y="30" width="76" height="50" rx="6"/><rect class="bx" x="286" y="30" width="76" height="50" rx="6"/>
<text class="t-s" x="78" y="22" text-anchor="middle">slot 0</text><text class="t-s" x="160" y="22" text-anchor="middle">slot 1</text><text class="t-s" x="242" y="22" text-anchor="middle">slot 2</text><text class="t-s" x="324" y="22" text-anchor="middle">slot 3</text>
<text class="t-b t-ok" x="78" y="108" text-anchor="middle">head</text><text class="t-b t-a" x="78" y="130" text-anchor="middle">tail</text>
<text class="t-m" x="40" y="156">size 0</text>
</svg>`],
 ['<code>enqueue(1)</code>, <code>enqueue(2)</code>, <code>enqueue(3)</code>. Each goes in at <b>tail</b>, and tail moves on to 3.',`<svg viewBox="0 0 420 160" role="img" aria-label="Three items queued, tail is 3">
<rect class="bx-ok" x="40" y="30" width="76" height="50" rx="6"/><text class="t-m" x="78" y="62" text-anchor="middle" style="font-size:20px">1</text><rect class="bx-ok" x="122" y="30" width="76" height="50" rx="6"/><text class="t-m" x="160" y="62" text-anchor="middle" style="font-size:20px">2</text><rect class="bx-ok" x="204" y="30" width="76" height="50" rx="6"/><text class="t-m" x="242" y="62" text-anchor="middle" style="font-size:20px">3</text><rect class="bx" x="286" y="30" width="76" height="50" rx="6"/>
<text class="t-s" x="78" y="22" text-anchor="middle">slot 0</text><text class="t-s" x="160" y="22" text-anchor="middle">slot 1</text><text class="t-s" x="242" y="22" text-anchor="middle">slot 2</text><text class="t-s" x="324" y="22" text-anchor="middle">slot 3</text>
<text class="t-b t-ok" x="78" y="108" text-anchor="middle">head</text><text class="t-b t-a" x="324" y="108" text-anchor="middle">tail</text>
<text class="t-m" x="40" y="156">size 3</text>
</svg>`],
 ['<code>dequeue()</code> hands back slot <b>head</b>, which is <b>1</b>, deletes it and moves head to 1. The others stay where they are.',`<svg viewBox="0 0 420 160" role="img" aria-label="Dequeue returns 1, head moves to slot 1">
<rect class="ln-d" x="40" y="30" width="76" height="50" rx="6"/><rect class="bx-ok" x="122" y="30" width="76" height="50" rx="6"/><text class="t-m" x="160" y="62" text-anchor="middle" style="font-size:20px">2</text><rect class="bx-ok" x="204" y="30" width="76" height="50" rx="6"/><text class="t-m" x="242" y="62" text-anchor="middle" style="font-size:20px">3</text><rect class="bx" x="286" y="30" width="76" height="50" rx="6"/>
<text class="t-s" x="78" y="22" text-anchor="middle">slot 0</text><text class="t-s" x="160" y="22" text-anchor="middle">slot 1</text><text class="t-s" x="242" y="22" text-anchor="middle">slot 2</text><text class="t-s" x="324" y="22" text-anchor="middle">slot 3</text>
<text class="t-b t-ok" x="160" y="108" text-anchor="middle">head</text><text class="t-b t-a" x="324" y="108" text-anchor="middle">tail</text>
<text class="t-m" x="40" y="156">size 2</text><text class="t-b t-ok" x="200" y="156">returned 1</text>
</svg>`],
 ['The trap: <code>array.shift()</code> also removes the front, but then slides <b>every</b> other item one place left. With 200,000 items that is O(n) per dequeue.',`<svg viewBox="0 0 420 160" role="img" aria-label="shift moves every remaining item left">
<rect class="bx-bad" x="40" y="30" width="76" height="50" rx="6"/><text class="t-m" x="78" y="62" text-anchor="middle" style="font-size:20px">2</text><rect class="bx-bad" x="122" y="30" width="76" height="50" rx="6"/><text class="t-m" x="160" y="62" text-anchor="middle" style="font-size:20px">3</text><rect class="bx-bad" x="204" y="30" width="76" height="50" rx="6"/><text class="t-m" x="242" y="62" text-anchor="middle" style="font-size:20px">4</text><rect class="bx-bad" x="286" y="30" width="76" height="50" rx="6"/><text class="t-m" x="324" y="62" text-anchor="middle" style="font-size:20px">5</text>
<path class="ln-a" d="M150 96H96M232 96H178M314 96H260"/><polygon class="ah-a" points="98,90 98,102 88,96"/><polygon class="ah-a" points="180,90 180,102 170,96"/><polygon class="ah-a" points="262,90 262,102 252,96"/>
<text class="t-b t-bad" x="40" y="146">arr.shift(): everyone moves</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('queue.shift()','O(n): every item slides along'),V.ok('head and tail indexes','O(1): only two numbers change'),
 V.ok('size() { return this.tail - this.head; }','Count without looping'),V.ok('return undefined','dequeue on an empty queue gives nothing back'))}
${V.hook(`Stack: last in, first out. Queue: first come, first served.`)}
`)}

${V.card(3,'Linked lists','a treasure hunt of clues',`
<figure class="fig"><svg viewBox="0 0 420 140" role="img" aria-label="Three nodes: 1 points to 2, 2 points to 3, 3 points to null">
<rect class="bx-a" x="40" y="40" width="96" height="54" rx="8"/><path class="ln" d="M96 40V94"/><text class="t-m" x="68" y="73" text-anchor="middle" style="font-size:20px">1</text><circle class="dot" cx="116" cy="67" r="5"/>
<rect class="bx-a" x="170" y="40" width="96" height="54" rx="8"/><path class="ln" d="M226 40V94"/><text class="t-m" x="198" y="73" text-anchor="middle" style="font-size:20px">2</text><circle class="dot" cx="246" cy="67" r="5"/>
<rect class="bx-a" x="300" y="40" width="96" height="54" rx="8"/><path class="ln" d="M356 40V94"/><text class="t-m" x="328" y="73" text-anchor="middle" style="font-size:20px">3</text><text class="t-s" x="376" y="72" text-anchor="middle">null</text>
<path class="ln-a" d="M120 67H160"/><polygon class="ah-a" points="158,61 158,73 168,67"/>
<path class="ln-a" d="M250 67H290"/><polygon class="ah-a" points="288,61 288,73 298,67"/>
<text class="t-s" x="68" y="30" text-anchor="middle">val</text><text class="t-s" x="116" y="30" text-anchor="middle">next</text>
<text class="t-b" x="68" y="122" text-anchor="middle">head</text>
</svg><figcaption>Each node holds a value and a <b>next</b> pointer to the node after it. The last one points to null. You only hold the first node, called the head.</figcaption></figure>
${V.like(`<p>A treasure hunt. Each clue has a message and says where the next clue is hidden. To reach clue 3 you must follow clue 1, then clue 2. Rewrite the "next" note on each clue and the hunt runs in a different order.</p>`)}
${V.why(`<p>Adding or removing an item in the middle of an array shifts everything after it. In a linked list you only change one or two pointers. Linked lists sit inside many other structures, such as the caches that remember your recently used apps.</p>`)}
${V.anat([[1,'const next = current.next;'],'\n',[2,'current.next = prev;'],'\n',[3,'prev = current;'],'\n',[4,'current = next;']],[
 '<b>Save the way forward</b> before you break it.',
 '<b>Flip the arrow</b> to point backwards.',
 '<b>Move prev</b> up to this node.',
 '<b>Step forward</b> using the saved pointer.'])}
${V.steps([
 ['Start: <b>prev</b> = null, <b>current</b> = node 1. The arrows all point right.',`<svg viewBox="0 0 420 170" role="img" aria-label="Start: prev null, current 1">
<text class="t-m" x="26" y="88" text-anchor="middle">null</text>
<rect class="bx-hl" x="70" y="60" width="70" height="44" rx="8"/><text class="t-m" x="105" y="89" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx" x="176" y="60" width="70" height="44" rx="8"/><text class="t-m" x="211" y="89" text-anchor="middle" style="font-size:20px">2</text>
<rect class="bx" x="282" y="60" width="70" height="44" rx="8"/><text class="t-m" x="317" y="89" text-anchor="middle" style="font-size:20px">3</text>
<text class="t-m" x="390" y="88" text-anchor="middle">null</text>
<path class="ln-a" d="M140 82H166"/><polygon class="ah-a" points="164,76 164,88 174,82"/><path class="ln-a" d="M246 82H272"/><polygon class="ah-a" points="270,76 270,88 280,82"/><path class="ln-a" d="M352 82H360"/><polygon class="ah-a" points="358,76 358,88 366,82"/>
<text class="t-b t-warn" x="26" y="134" text-anchor="middle">prev</text><text class="t-b t-a" x="105" y="134" text-anchor="middle">current</text>
</svg>`],
 ['Round 1: save next (2), point 1 back at <b>null</b>, then move prev to 1 and current to 2.',`<svg viewBox="0 0 420 170" role="img" aria-label="1 now points to null; prev 1, current 2">
<text class="t-m" x="26" y="88" text-anchor="middle">null</text>
<rect class="bx-ok" x="70" y="60" width="70" height="44" rx="8"/><text class="t-m" x="105" y="89" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx-hl" x="176" y="60" width="70" height="44" rx="8"/><text class="t-m" x="211" y="89" text-anchor="middle" style="font-size:20px">2</text>
<rect class="bx" x="282" y="60" width="70" height="44" rx="8"/><text class="t-m" x="317" y="89" text-anchor="middle" style="font-size:20px">3</text>
<text class="t-m" x="390" y="88" text-anchor="middle">null</text>
<path class="ln-ok" d="M70 82H58"/><polygon class="ah-ok" points="60,76 60,88 52,82"/><path class="ln-a" d="M246 82H272"/><polygon class="ah-a" points="270,76 270,88 280,82"/><path class="ln-a" d="M352 82H360"/><polygon class="ah-a" points="358,76 358,88 366,82"/>
<text class="t-b t-warn" x="105" y="134" text-anchor="middle">prev</text><text class="t-b t-a" x="211" y="134" text-anchor="middle">current</text>
</svg>`],
 ['Round 2: save next (3), point 2 back at <b>1</b>, move prev to 2 and current to 3.',`<svg viewBox="0 0 420 170" role="img" aria-label="2 now points to 1; prev 2, current 3">
<text class="t-m" x="26" y="88" text-anchor="middle">null</text>
<rect class="bx-ok" x="70" y="60" width="70" height="44" rx="8"/><text class="t-m" x="105" y="89" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx-ok" x="176" y="60" width="70" height="44" rx="8"/><text class="t-m" x="211" y="89" text-anchor="middle" style="font-size:20px">2</text>
<rect class="bx-hl" x="282" y="60" width="70" height="44" rx="8"/><text class="t-m" x="317" y="89" text-anchor="middle" style="font-size:20px">3</text>
<text class="t-m" x="390" y="88" text-anchor="middle">null</text>
<path class="ln-ok" d="M70 82H58"/><polygon class="ah-ok" points="60,76 60,88 52,82"/><path class="ln-ok" d="M176 82H152"/><polygon class="ah-ok" points="154,76 154,88 144,82"/><path class="ln-a" d="M352 82H360"/><polygon class="ah-a" points="358,76 358,88 366,82"/>
<text class="t-b t-warn" x="211" y="134" text-anchor="middle">prev</text><text class="t-b t-a" x="317" y="134" text-anchor="middle">current</text>
</svg>`],
 ['Round 3: point 3 back at <b>2</b>. current becomes null, so the loop stops. <b>prev</b> (node 3) is the new head: 3 → 2 → 1 → null.',`<svg viewBox="0 0 420 170" role="img" aria-label="All arrows reversed; return prev, node 3">
<text class="t-m" x="26" y="88" text-anchor="middle">null</text>
<rect class="bx-ok" x="70" y="60" width="70" height="44" rx="8"/><text class="t-m" x="105" y="89" text-anchor="middle" style="font-size:20px">1</text>
<rect class="bx-ok" x="176" y="60" width="70" height="44" rx="8"/><text class="t-m" x="211" y="89" text-anchor="middle" style="font-size:20px">2</text>
<rect class="bx-ok" x="282" y="60" width="70" height="44" rx="8"/><text class="t-m" x="317" y="89" text-anchor="middle" style="font-size:20px">3</text>
<text class="t-m t-dim" x="390" y="88" text-anchor="middle">null</text>
<path class="ln-ok" d="M70 82H58"/><polygon class="ah-ok" points="60,76 60,88 52,82"/><path class="ln-ok" d="M176 82H152"/><polygon class="ah-ok" points="154,76 154,88 144,82"/><path class="ln-ok" d="M282 82H258"/><polygon class="ah-ok" points="260,76 260,88 250,82"/>
<text class="t-b t-warn" x="317" y="134" text-anchor="middle">prev</text><text class="t-b t-a" x="390" y="134" text-anchor="middle">current</text>
<text class="t-b t-ok" x="317" y="160" text-anchor="middle">return prev</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('current.next = prev; first','You lose the rest of the list. Save next first'),V.ok('return prev','current is null at the end; prev is the new head'),
 V.ok('reverseList(null) === null','An empty list: the loop never runs, prev stays null'),V.ok('while (current)','Stops when you walk off the end'))}
${V.build(`<ol><li><code>isValid</code>: make a lookup of closer to opener and an empty array as the stack. Push openers. For a closer, pop and compare. At the end, the stack must be empty.</li><li><code>reverseList</code>: the four lines above inside <code>while (current)</code>, then return prev.</li><li><code>Queue</code>: a constructor with <code>items = {}</code>, <code>head = 0</code> and <code>tail = 0</code>, then <code>enqueue</code>, <code>dequeue</code> and <code>size</code>.</li></ol>`)}
${V.hook(`Save next, flip, step, step.`)}
`)}

<div class="try"><b>Try it in your head</b>1. You push A, B, C onto a stack and pop once. What comes out? <i>C.</i> 2. You enqueue A, B, C and dequeue once. What comes out? <i>A.</i> 3. Is <code>"(]"</code> valid? <i>No: ] pops (, which does not match.</i></div>
`);

explain('a4',`
<p>Your folders, a family tree, the page structure of every website and the map in your sat nav are all trees or graphs. Two ways of exploring them, breadth-first and depth-first, answer questions like "what is the shortest route?" and "can I get there at all?".</p>

${V.card(1,'Trees and recursion','a family tree of values',`
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="A binary search tree with 8 at the root">
<path class="ln" d="M210 30L110 78M210 30L310 78M110 78L60 128M110 78L160 128M310 78L360 128M160 128L128 178M160 128L192 178M360 128L328 178"/>
<circle class="bx-a" cx="210" cy="30" r="19"/><text class="t-m" x="210" y="36" text-anchor="middle" style="font-size:17px">8</text>
<circle class="bx-a" cx="110" cy="78" r="19"/><text class="t-m" x="110" y="84" text-anchor="middle" style="font-size:17px">3</text>
<circle class="bx-a" cx="310" cy="78" r="19"/><text class="t-m" x="310" y="84" text-anchor="middle" style="font-size:17px">10</text>
<circle class="bx-a" cx="60" cy="128" r="19"/><text class="t-m" x="60" y="134" text-anchor="middle" style="font-size:17px">1</text>
<circle class="bx-a" cx="160" cy="128" r="19"/><text class="t-m" x="160" y="134" text-anchor="middle" style="font-size:17px">6</text>
<circle class="bx-a" cx="360" cy="128" r="19"/><text class="t-m" x="360" y="134" text-anchor="middle" style="font-size:17px">14</text>
<circle class="bx-a" cx="128" cy="178" r="19"/><text class="t-m" x="128" y="184" text-anchor="middle" style="font-size:17px">4</text>
<circle class="bx-a" cx="192" cy="178" r="19"/><text class="t-m" x="192" y="184" text-anchor="middle" style="font-size:17px">7</text>
<circle class="bx-a" cx="328" cy="178" r="19"/><text class="t-m" x="328" y="184" text-anchor="middle" style="font-size:17px">13</text>
<text class="t-s" x="8" y="34">level 1</text><text class="t-s" x="8" y="82">level 2</text><text class="t-s" x="8" y="206">level 4</text>
<text class="t-s" x="410" y="34" text-anchor="end">smaller left</text><text class="t-s" x="410" y="52" text-anchor="end">bigger right</text>
</svg><figcaption>A tree: one root at the top, and every node has children below it. In a binary search tree, each node has at most two children, smaller values go left and bigger values go right.</figcaption></figure>
${V.like(`<p>A family tree, or the folders on your computer. A folder holds smaller folders, which hold smaller folders still. To measure how deep the whole thing goes, ask each folder: "how deep are you?" and add one for yourself.</p>`)}
${V.why(`<p>Lots of real data is a hierarchy, with no loops: the DOM of a web page, a company org chart, a file system. Because every subtree is itself a tree, the neatest code is <b>recursive</b>: a function that calls itself on the left child and the right child.</p>`)}
${V.anat([[1,'if (!root) return 0;'],'\n',[2,'return 1 +'],' ',[3,'Math.max(maxDepth(root.left), maxDepth(root.right))'],';'],[
 '<b>Base case.</b> An empty spot (null) has depth 0. This is what stops the recursion.',
 '<b>Count this node</b> as one level.',
 '<b>Ask both children</b> how deep they go, and keep the deeper answer.'])}
<p><b>In-order traversal</b> visits the left subtree, then the node, then the right subtree. Watch what it does to a binary search tree.</p>
${V.steps([
 ['Go left as far as you can: 8, then 3, then <b>1</b>. 1 has no left child, so visit it. Output: 1.',`<svg viewBox="0 0 420 250" role="img" aria-label="Visit 1 first">
<path class="ln" d="M210 30L110 78M210 30L310 78M110 78L60 128M110 78L160 128M310 78L360 128M160 128L128 178M160 128L192 178M360 128L328 178"/>
<circle class="bx" cx="210" cy="30" r="19"/><text class="t-m" x="210" y="36" text-anchor="middle" style="font-size:17px">8</text>
<circle class="bx" cx="110" cy="78" r="19"/><text class="t-m" x="110" y="84" text-anchor="middle" style="font-size:17px">3</text>
<circle class="bx" cx="310" cy="78" r="19"/><text class="t-m" x="310" y="84" text-anchor="middle" style="font-size:17px">10</text>
<circle class="bx-hl" cx="60" cy="128" r="19"/><text class="t-m" x="60" y="134" text-anchor="middle" style="font-size:17px">1</text>
<circle class="bx" cx="160" cy="128" r="19"/><text class="t-m" x="160" y="134" text-anchor="middle" style="font-size:17px">6</text>
<circle class="bx" cx="360" cy="128" r="19"/><text class="t-m" x="360" y="134" text-anchor="middle" style="font-size:17px">14</text>
<circle class="bx" cx="128" cy="178" r="19"/><text class="t-m" x="128" y="184" text-anchor="middle" style="font-size:17px">4</text>
<circle class="bx" cx="192" cy="178" r="19"/><text class="t-m" x="192" y="184" text-anchor="middle" style="font-size:17px">7</text>
<circle class="bx" cx="328" cy="178" r="19"/><text class="t-m" x="328" y="184" text-anchor="middle" style="font-size:17px">13</text>
<text class="t-s" x="10" y="214">output</text><text class="t-m" x="10" y="240" style="font-size:18px">[1]</text>
</svg>`],
 ['Back up to <b>3</b> and visit it. Then go into its right subtree: 6, then left to <b>4</b>. Visit 4.',`<svg viewBox="0 0 420 250" role="img" aria-label="Visit 3 then 4">
<path class="ln" d="M210 30L110 78M210 30L310 78M110 78L60 128M110 78L160 128M310 78L360 128M160 128L128 178M160 128L192 178M360 128L328 178"/>
<circle class="bx" cx="210" cy="30" r="19"/><text class="t-m" x="210" y="36" text-anchor="middle" style="font-size:17px">8</text>
<circle class="bx-ok" cx="110" cy="78" r="19"/><text class="t-m" x="110" y="84" text-anchor="middle" style="font-size:17px">3</text>
<circle class="bx" cx="310" cy="78" r="19"/><text class="t-m" x="310" y="84" text-anchor="middle" style="font-size:17px">10</text>
<circle class="bx-ok" cx="60" cy="128" r="19"/><text class="t-m" x="60" y="134" text-anchor="middle" style="font-size:17px">1</text>
<circle class="bx" cx="160" cy="128" r="19"/><text class="t-m" x="160" y="134" text-anchor="middle" style="font-size:17px">6</text>
<circle class="bx" cx="360" cy="128" r="19"/><text class="t-m" x="360" y="134" text-anchor="middle" style="font-size:17px">14</text>
<circle class="bx-hl" cx="128" cy="178" r="19"/><text class="t-m" x="128" y="184" text-anchor="middle" style="font-size:17px">4</text>
<circle class="bx" cx="192" cy="178" r="19"/><text class="t-m" x="192" y="184" text-anchor="middle" style="font-size:17px">7</text>
<circle class="bx" cx="328" cy="178" r="19"/><text class="t-m" x="328" y="184" text-anchor="middle" style="font-size:17px">13</text>
<text class="t-s" x="10" y="214">output</text><text class="t-m" x="10" y="240" style="font-size:18px">[1, 3, 4]</text>
</svg>`],
 ['Back to <b>6</b>, visit it, then its right child <b>7</b>. The whole left side of 8 is done.',`<svg viewBox="0 0 420 250" role="img" aria-label="Visit 6 then 7">
<path class="ln" d="M210 30L110 78M210 30L310 78M110 78L60 128M110 78L160 128M310 78L360 128M160 128L128 178M160 128L192 178M360 128L328 178"/>
<circle class="bx" cx="210" cy="30" r="19"/><text class="t-m" x="210" y="36" text-anchor="middle" style="font-size:17px">8</text>
<circle class="bx-ok" cx="110" cy="78" r="19"/><text class="t-m" x="110" y="84" text-anchor="middle" style="font-size:17px">3</text>
<circle class="bx" cx="310" cy="78" r="19"/><text class="t-m" x="310" y="84" text-anchor="middle" style="font-size:17px">10</text>
<circle class="bx-ok" cx="60" cy="128" r="19"/><text class="t-m" x="60" y="134" text-anchor="middle" style="font-size:17px">1</text>
<circle class="bx-ok" cx="160" cy="128" r="19"/><text class="t-m" x="160" y="134" text-anchor="middle" style="font-size:17px">6</text>
<circle class="bx" cx="360" cy="128" r="19"/><text class="t-m" x="360" y="134" text-anchor="middle" style="font-size:17px">14</text>
<circle class="bx-ok" cx="128" cy="178" r="19"/><text class="t-m" x="128" y="184" text-anchor="middle" style="font-size:17px">4</text>
<circle class="bx-hl" cx="192" cy="178" r="19"/><text class="t-m" x="192" y="184" text-anchor="middle" style="font-size:17px">7</text>
<circle class="bx" cx="328" cy="178" r="19"/><text class="t-m" x="328" y="184" text-anchor="middle" style="font-size:17px">13</text>
<text class="t-s" x="10" y="214">output</text><text class="t-m" x="10" y="240" style="font-size:18px">[1, 3, 4, 6, 7]</text>
</svg>`],
 ['Visit the root <b>8</b>, then the right side: 10, then 13 (left of 14), then 14. The output is <b>sorted</b>, for free.',`<svg viewBox="0 0 420 250" role="img" aria-label="Whole tree visited in sorted order">
<path class="ln" d="M210 30L110 78M210 30L310 78M110 78L60 128M110 78L160 128M310 78L360 128M160 128L128 178M160 128L192 178M360 128L328 178"/>
<circle class="bx-ok" cx="210" cy="30" r="19"/><text class="t-m" x="210" y="36" text-anchor="middle" style="font-size:17px">8</text>
<circle class="bx-ok" cx="110" cy="78" r="19"/><text class="t-m" x="110" y="84" text-anchor="middle" style="font-size:17px">3</text>
<circle class="bx-ok" cx="310" cy="78" r="19"/><text class="t-m" x="310" y="84" text-anchor="middle" style="font-size:17px">10</text>
<circle class="bx-ok" cx="60" cy="128" r="19"/><text class="t-m" x="60" y="134" text-anchor="middle" style="font-size:17px">1</text>
<circle class="bx-ok" cx="160" cy="128" r="19"/><text class="t-m" x="160" y="134" text-anchor="middle" style="font-size:17px">6</text>
<circle class="bx-hl" cx="360" cy="128" r="19"/><text class="t-m" x="360" y="134" text-anchor="middle" style="font-size:17px">14</text>
<circle class="bx-ok" cx="128" cy="178" r="19"/><text class="t-m" x="128" y="184" text-anchor="middle" style="font-size:17px">4</text>
<circle class="bx-ok" cx="192" cy="178" r="19"/><text class="t-m" x="192" y="184" text-anchor="middle" style="font-size:17px">7</text>
<circle class="bx-ok" cx="328" cy="178" r="19"/><text class="t-m" x="328" y="184" text-anchor="middle" style="font-size:17px">13</text>
<text class="t-s" x="10" y="214">output</text><text class="t-m" x="10" y="240" style="font-size:18px">[1, 3, 4, 6, 7, 8, 10, 13, 14]</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('if (!root) return 0;','Every recursive function needs a base case'),V.no('forgetting the base case','Recursion never stops: "Maximum call stack size exceeded"'),
 V.ok('left, node, right','In-order. Pass the same out array down so every call adds to it'),V.ok('depth of empty tree = 0','maxDepth(null) must be 0, not 1'))}
${V.hook(`Left, me, right: in-order reads a search tree in sorted order.`)}
`)}

${V.card(2,'Breadth-first search','ripples in a pond',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Ripples spreading out from a stone: ring 1, ring 2, ring 3">
<circle class="ln-d" cx="100" cy="85" r="78"/><circle class="ln-d" cx="100" cy="85" r="52"/><circle class="ln-d" cx="100" cy="85" r="26"/><circle class="dot" cx="100" cy="85" r="7"/>
<text class="t-b" x="138" y="80" text-anchor="middle">1</text><text class="t-b" x="164" y="72" text-anchor="middle">2</text><text class="t-b" x="190" y="64" text-anchor="middle">3</text>
<text class="t-b t-a" x="100" y="112" text-anchor="middle">start</text>
<text class="t" x="214" y="62">Every place 1 step</text><text class="t" x="214" y="86">away is reached</text><text class="t" x="214" y="110">before any place</text><text class="t" x="214" y="134">2 steps away.</text>
</svg><figcaption>BFS explores in rings: everything 1 step away, then everything 2 steps away, and so on. So the first time it reaches the end, it got there by the shortest route.</figcaption></figure>
${V.like(`<p>Drop a stone in a pond. The ripple reaches every spot 1 metre away before any spot 2 metres away. A rumour spreads the same way: your friends hear it first, then their friends.</p>`)}
${V.why(`<p>In a maze or a grid where every step costs the same, you want the fewest steps. BFS guarantees it, because it never takes a longer path before finishing all shorter ones. It needs a <b>queue</b>: first in, first out keeps the rings in order.</p>`)}
${V.anat([[1,'const [r, c, steps] = queue.shift();'],'\n',[2,'if (r === end[0] &amp;&amp; c === end[1]) return steps;'],'\n',[3,'seen.add(key); queue.push([nr, nc, steps + 1]);']],[
 '<b>Take the front</b> of the queue: a cell and how many steps it took to get there. (shift is fine for a small grid.)',
 '<b>Arrived?</b> Then this is the shortest distance.',
 '<b>Add each open neighbour</b> not yet seen, one step further away. Mark it seen <i>now</i>, so it is never queued twice.'])}
${V.steps([
 ['Start at the top-left with 0 steps. Dark squares are walls. BFS spreads to the open neighbours: 1, then 2.',`<svg viewBox="0 0 420 190" role="img" aria-label="Distances 0 to 2">
<rect class="bx-ok" x="20" y="14" width="40" height="40" rx="4"/><text class="t-m" x="40" y="40" text-anchor="middle" style="font-size:17px">0</text>
<rect class="bx-ok" x="62" y="14" width="40" height="40" rx="4"/><text class="t-m" x="82" y="40" text-anchor="middle" style="font-size:17px">1</text>
<rect class="bx-hl" x="104" y="14" width="40" height="40" rx="4"/><text class="t-m" x="124" y="40" text-anchor="middle" style="font-size:17px">2</text>
<rect class="bx-dark" x="146" y="14" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="20" y="56" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="62" y="56" width="40" height="40" rx="4"/>
<rect class="bx" x="104" y="56" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="146" y="56" width="40" height="40" rx="4"/>
<rect class="bx" x="20" y="98" width="40" height="40" rx="4"/>
<rect class="bx" x="62" y="98" width="40" height="40" rx="4"/>
<rect class="bx" x="104" y="98" width="40" height="40" rx="4"/>
<rect class="bx" x="146" y="98" width="40" height="40" rx="4"/>
<rect class="bx" x="20" y="140" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="62" y="140" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="104" y="140" width="40" height="40" rx="4"/>
<rect class="bx" x="146" y="140" width="40" height="40" rx="4"/><text class="t-s" x="166" y="165" text-anchor="middle">end</text>
<text class="t-s" x="206" y="30">queue (row,col)</text><text class="t-m" x="206" y="56" style="font-size:15px">(0,2)</text>
<text class="t-b" x="206" y="110" style="font-size:16px">rings 0, 1, 2</text><text class="t" x="206" y="136"></text>
</svg>`],
 ['From 2 the only way is down: 3, then 4 in the middle of row 3.',`<svg viewBox="0 0 420 190" role="img" aria-label="Distances up to 4">
<rect class="bx-ok" x="20" y="14" width="40" height="40" rx="4"/><text class="t-m" x="40" y="40" text-anchor="middle" style="font-size:17px">0</text>
<rect class="bx-ok" x="62" y="14" width="40" height="40" rx="4"/><text class="t-m" x="82" y="40" text-anchor="middle" style="font-size:17px">1</text>
<rect class="bx-ok" x="104" y="14" width="40" height="40" rx="4"/><text class="t-m" x="124" y="40" text-anchor="middle" style="font-size:17px">2</text>
<rect class="bx-dark" x="146" y="14" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="20" y="56" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="62" y="56" width="40" height="40" rx="4"/>
<rect class="bx-ok" x="104" y="56" width="40" height="40" rx="4"/><text class="t-m" x="124" y="82" text-anchor="middle" style="font-size:17px">3</text>
<rect class="bx-dark" x="146" y="56" width="40" height="40" rx="4"/>
<rect class="bx" x="20" y="98" width="40" height="40" rx="4"/>
<rect class="bx" x="62" y="98" width="40" height="40" rx="4"/>
<rect class="bx-hl" x="104" y="98" width="40" height="40" rx="4"/><text class="t-m" x="124" y="124" text-anchor="middle" style="font-size:17px">4</text>
<rect class="bx" x="146" y="98" width="40" height="40" rx="4"/>
<rect class="bx" x="20" y="140" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="62" y="140" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="104" y="140" width="40" height="40" rx="4"/>
<rect class="bx" x="146" y="140" width="40" height="40" rx="4"/><text class="t-s" x="166" y="165" text-anchor="middle">end</text>
<text class="t-s" x="206" y="30">queue (row,col)</text><text class="t-m" x="206" y="56" style="font-size:15px">(2,2)</text>
<text class="t-b" x="206" y="110" style="font-size:16px">rings 3, 4</text><text class="t" x="206" y="136"></text>
</svg>`],
 ['From 4, two cells are 5 steps away at once, one to the left and one to the right. Both join the queue.',`<svg viewBox="0 0 420 190" role="img" aria-label="Two cells at distance 5">
<rect class="bx-ok" x="20" y="14" width="40" height="40" rx="4"/><text class="t-m" x="40" y="40" text-anchor="middle" style="font-size:17px">0</text>
<rect class="bx-ok" x="62" y="14" width="40" height="40" rx="4"/><text class="t-m" x="82" y="40" text-anchor="middle" style="font-size:17px">1</text>
<rect class="bx-ok" x="104" y="14" width="40" height="40" rx="4"/><text class="t-m" x="124" y="40" text-anchor="middle" style="font-size:17px">2</text>
<rect class="bx-dark" x="146" y="14" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="20" y="56" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="62" y="56" width="40" height="40" rx="4"/>
<rect class="bx-ok" x="104" y="56" width="40" height="40" rx="4"/><text class="t-m" x="124" y="82" text-anchor="middle" style="font-size:17px">3</text>
<rect class="bx-dark" x="146" y="56" width="40" height="40" rx="4"/>
<rect class="bx" x="20" y="98" width="40" height="40" rx="4"/>
<rect class="bx-hl" x="62" y="98" width="40" height="40" rx="4"/><text class="t-m" x="82" y="124" text-anchor="middle" style="font-size:17px">5</text>
<rect class="bx-ok" x="104" y="98" width="40" height="40" rx="4"/><text class="t-m" x="124" y="124" text-anchor="middle" style="font-size:17px">4</text>
<rect class="bx-hl" x="146" y="98" width="40" height="40" rx="4"/><text class="t-m" x="166" y="124" text-anchor="middle" style="font-size:17px">5</text>
<rect class="bx" x="20" y="140" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="62" y="140" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="104" y="140" width="40" height="40" rx="4"/>
<rect class="bx" x="146" y="140" width="40" height="40" rx="4"/><text class="t-s" x="166" y="165" text-anchor="middle">end</text>
<text class="t-s" x="206" y="30">queue (row,col)</text><text class="t-m" x="206" y="56" style="font-size:15px">(2,1) (2,3)</text>
<text class="t-b" x="206" y="110" style="font-size:16px">ring 5</text><text class="t" x="206" y="136">two at once</text>
</svg>`],
 ['The end cell is reached at <b>6</b>. Because BFS works ring by ring, no shorter path exists. If the queue empties first, return <b>-1</b>.',`<svg viewBox="0 0 420 190" role="img" aria-label="End reached in 6 steps">
<rect class="bx-ok" x="20" y="14" width="40" height="40" rx="4"/><text class="t-m" x="40" y="40" text-anchor="middle" style="font-size:17px">0</text>
<rect class="bx-ok" x="62" y="14" width="40" height="40" rx="4"/><text class="t-m" x="82" y="40" text-anchor="middle" style="font-size:17px">1</text>
<rect class="bx-ok" x="104" y="14" width="40" height="40" rx="4"/><text class="t-m" x="124" y="40" text-anchor="middle" style="font-size:17px">2</text>
<rect class="bx-dark" x="146" y="14" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="20" y="56" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="62" y="56" width="40" height="40" rx="4"/>
<rect class="bx-ok" x="104" y="56" width="40" height="40" rx="4"/><text class="t-m" x="124" y="82" text-anchor="middle" style="font-size:17px">3</text>
<rect class="bx-dark" x="146" y="56" width="40" height="40" rx="4"/>
<rect class="bx-hl" x="20" y="98" width="40" height="40" rx="4"/><text class="t-m" x="40" y="124" text-anchor="middle" style="font-size:17px">6</text>
<rect class="bx-ok" x="62" y="98" width="40" height="40" rx="4"/><text class="t-m" x="82" y="124" text-anchor="middle" style="font-size:17px">5</text>
<rect class="bx-ok" x="104" y="98" width="40" height="40" rx="4"/><text class="t-m" x="124" y="124" text-anchor="middle" style="font-size:17px">4</text>
<rect class="bx-ok" x="146" y="98" width="40" height="40" rx="4"/><text class="t-m" x="166" y="124" text-anchor="middle" style="font-size:17px">5</text>
<rect class="bx" x="20" y="140" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="62" y="140" width="40" height="40" rx="4"/>
<rect class="bx-dark" x="104" y="140" width="40" height="40" rx="4"/>
<rect class="bx-ok" x="146" y="140" width="40" height="40" rx="4"/><text class="t-m" x="166" y="166" text-anchor="middle" style="font-size:17px">6</text>
<text class="t-s" x="206" y="30">queue (row,col)</text><text class="t-m" x="206" y="56" style="font-size:15px">(2,0) (3,3)</text>
<text class="t-b t-ok" x="206" y="110" style="font-size:16px">return 6</text><text class="t" x="206" y="136">shortest possible</text>
</svg>`]])}
${V.hook(`Ripples, not rabbit holes: BFS plus a queue finds the shortest path.`)}
`)}

${V.card(3,'Depth-first search','follow one corridor to the end',`
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Routes: Lagos to Accra and Abuja, Accra to Abidjan, Abidjan to Dakar, Nairobi to Kampala">
<path class="ln" d="M116 38H154M258 38H296M352 56V88M68 56V88M116 182H154"/><polygon class="ah" points="152,32 152,44 162,38"/><polygon class="ah" points="294,32 294,44 304,38"/><polygon class="ah" points="346,86 358,86 352,96"/><polygon class="ah" points="62,86 74,86 68,96"/><polygon class="ah" points="152,176 152,188 162,182"/>
<rect class="bx" x="20" y="20" width="96" height="36" rx="8"/><text class="t" x="68" y="43" text-anchor="middle">Lagos</text>
<rect class="bx" x="162" y="20" width="96" height="36" rx="8"/><text class="t" x="210" y="43" text-anchor="middle">Accra</text>
<rect class="bx" x="304" y="20" width="96" height="36" rx="8"/><text class="t" x="352" y="43" text-anchor="middle">Abidjan</text>
<rect class="bx" x="304" y="96" width="96" height="36" rx="8"/><text class="t" x="352" y="119" text-anchor="middle">Dakar</text>
<rect class="bx" x="20" y="96" width="96" height="36" rx="8"/><text class="t" x="68" y="119" text-anchor="middle">Abuja</text>
<rect class="bx" x="20" y="164" width="96" height="36" rx="8"/><text class="t" x="68" y="187" text-anchor="middle">Nairobi</text>
<rect class="bx" x="162" y="164" width="96" height="36" rx="8"/><text class="t" x="210" y="187" text-anchor="middle">Kampala</text>
</svg><figcaption>A graph is places joined by connections, here one-way flight routes. Unlike a tree, it can have loops and separate islands. Nairobi cannot be reached from Lagos at all.</figcaption></figure>
${V.like(`<p>Exploring a maze with a piece of chalk. Take the first corridor and keep going until you hit a dead end. Then walk back to the last junction and try the next corridor. Chalk a mark on every room so you never explore it twice.</p>`)}
${V.anat([[1,'if (from === to) return true;'],'\n',[2,'seen.add(from);'],'\n',[3,'for (const next of graph[from] || [])'],'\n  ',[4,'if (!seen.has(next) &amp;&amp; hasRoute(graph, next, to, seen)) return true;']],[
 '<b>Base case.</b> You are standing on the destination.',
 '<b>Chalk mark.</b> Without it, a loop such as A to B to A runs forever.',
 '<b>Each road out.</b> <code>|| []</code> handles a city with no list.',
 '<b>Go deep.</b> Recurse into an unvisited neighbour. If that search succeeds, pass true all the way back up.'])}
${V.steps([
 ['<code>hasRoute(ROUTES, "Lagos", "Dakar")</code>. Start at Lagos and mark it seen.',`<svg viewBox="0 0 420 210" role="img" aria-label="At Lagos">
<path class="ln" d="M116 38H154M258 38H296M352 56V88M68 56V88M116 182H154"/><polygon class="ah" points="152,32 152,44 162,38"/><polygon class="ah" points="294,32 294,44 304,38"/><polygon class="ah" points="346,86 358,86 352,96"/><polygon class="ah" points="62,86 74,86 68,96"/><polygon class="ah" points="152,176 152,188 162,182"/>
<rect class="bx-hl" x="20" y="20" width="96" height="36" rx="8"/><text class="t" x="68" y="43" text-anchor="middle">Lagos</text>
<rect class="bx" x="162" y="20" width="96" height="36" rx="8"/><text class="t" x="210" y="43" text-anchor="middle">Accra</text>
<rect class="bx" x="304" y="20" width="96" height="36" rx="8"/><text class="t" x="352" y="43" text-anchor="middle">Abidjan</text>
<rect class="bx" x="304" y="96" width="96" height="36" rx="8"/><text class="t" x="352" y="119" text-anchor="middle">Dakar</text>
<rect class="bx" x="20" y="96" width="96" height="36" rx="8"/><text class="t" x="68" y="119" text-anchor="middle">Abuja</text>
<rect class="bx" x="20" y="164" width="96" height="36" rx="8"/><text class="t" x="68" y="187" text-anchor="middle">Nairobi</text>
<rect class="bx" x="162" y="164" width="96" height="36" rx="8"/><text class="t" x="210" y="187" text-anchor="middle">Kampala</text>
</svg>`],
 ['Take the first road, to <b>Accra</b>. Go deep straight away, before even looking at Abuja.',`<svg viewBox="0 0 420 210" role="img" aria-label="Deep into Accra">
<path class="ln" d="M116 38H154M258 38H296M352 56V88M68 56V88M116 182H154"/><polygon class="ah" points="152,32 152,44 162,38"/><polygon class="ah" points="294,32 294,44 304,38"/><polygon class="ah" points="346,86 358,86 352,96"/><polygon class="ah" points="62,86 74,86 68,96"/><polygon class="ah" points="152,176 152,188 162,182"/>
<rect class="bx-ok" x="20" y="20" width="96" height="36" rx="8"/><text class="t" x="68" y="43" text-anchor="middle">Lagos</text>
<rect class="bx-hl" x="162" y="20" width="96" height="36" rx="8"/><text class="t" x="210" y="43" text-anchor="middle">Accra</text>
<rect class="bx" x="304" y="20" width="96" height="36" rx="8"/><text class="t" x="352" y="43" text-anchor="middle">Abidjan</text>
<rect class="bx" x="304" y="96" width="96" height="36" rx="8"/><text class="t" x="352" y="119" text-anchor="middle">Dakar</text>
<rect class="bx" x="20" y="96" width="96" height="36" rx="8"/><text class="t" x="68" y="119" text-anchor="middle">Abuja</text>
<rect class="bx" x="20" y="164" width="96" height="36" rx="8"/><text class="t" x="68" y="187" text-anchor="middle">Nairobi</text>
<rect class="bx" x="162" y="164" width="96" height="36" rx="8"/><text class="t" x="210" y="187" text-anchor="middle">Kampala</text>
</svg>`],
 ['From Accra, the only road goes to <b>Abidjan</b>. Keep going deeper.',`<svg viewBox="0 0 420 210" role="img" aria-label="Deep into Abidjan">
<path class="ln" d="M116 38H154M258 38H296M352 56V88M68 56V88M116 182H154"/><polygon class="ah" points="152,32 152,44 162,38"/><polygon class="ah" points="294,32 294,44 304,38"/><polygon class="ah" points="346,86 358,86 352,96"/><polygon class="ah" points="62,86 74,86 68,96"/><polygon class="ah" points="152,176 152,188 162,182"/>
<rect class="bx-ok" x="20" y="20" width="96" height="36" rx="8"/><text class="t" x="68" y="43" text-anchor="middle">Lagos</text>
<rect class="bx-ok" x="162" y="20" width="96" height="36" rx="8"/><text class="t" x="210" y="43" text-anchor="middle">Accra</text>
<rect class="bx-hl" x="304" y="20" width="96" height="36" rx="8"/><text class="t" x="352" y="43" text-anchor="middle">Abidjan</text>
<rect class="bx" x="304" y="96" width="96" height="36" rx="8"/><text class="t" x="352" y="119" text-anchor="middle">Dakar</text>
<rect class="bx" x="20" y="96" width="96" height="36" rx="8"/><text class="t" x="68" y="119" text-anchor="middle">Abuja</text>
<rect class="bx" x="20" y="164" width="96" height="36" rx="8"/><text class="t" x="68" y="187" text-anchor="middle">Nairobi</text>
<rect class="bx" x="162" y="164" width="96" height="36" rx="8"/><text class="t" x="210" y="187" text-anchor="middle">Kampala</text>
</svg>`],
 ['From Abidjan to <b>Dakar</b>: that is the destination. Return true, and every call above returns true too.',`<svg viewBox="0 0 420 210" role="img" aria-label="Dakar reached: true">
<path class="ln" d="M116 38H154M258 38H296M352 56V88M68 56V88M116 182H154"/><polygon class="ah" points="152,32 152,44 162,38"/><polygon class="ah" points="294,32 294,44 304,38"/><polygon class="ah" points="346,86 358,86 352,96"/><polygon class="ah" points="62,86 74,86 68,96"/><polygon class="ah" points="152,176 152,188 162,182"/>
<rect class="bx-ok" x="20" y="20" width="96" height="36" rx="8"/><text class="t" x="68" y="43" text-anchor="middle">Lagos</text>
<rect class="bx-ok" x="162" y="20" width="96" height="36" rx="8"/><text class="t" x="210" y="43" text-anchor="middle">Accra</text>
<rect class="bx-ok" x="304" y="20" width="96" height="36" rx="8"/><text class="t" x="352" y="43" text-anchor="middle">Abidjan</text>
<rect class="bx-hl" x="304" y="96" width="96" height="36" rx="8"/><text class="t" x="352" y="119" text-anchor="middle">Dakar</text>
<rect class="bx" x="20" y="96" width="96" height="36" rx="8"/><text class="t" x="68" y="119" text-anchor="middle">Abuja</text>
<rect class="bx" x="20" y="164" width="96" height="36" rx="8"/><text class="t" x="68" y="187" text-anchor="middle">Nairobi</text>
<rect class="bx" x="162" y="164" width="96" height="36" rx="8"/><text class="t" x="210" y="187" text-anchor="middle">Kampala</text>
<text class="t-b t-ok" x="304" y="182" text-anchor="start" style="font-size:16px">true</text>
</svg>`],
 ['Lagos to <b>Nairobi</b>: DFS tries every road from Lagos and finds only Accra, Abidjan, Dakar and Abuja. Nothing left to try, so it returns <b>false</b>.',`<svg viewBox="0 0 420 210" role="img" aria-label="Nairobi never reached: false">
<path class="ln" d="M116 38H154M258 38H296M352 56V88M68 56V88M116 182H154"/><polygon class="ah" points="152,32 152,44 162,38"/><polygon class="ah" points="294,32 294,44 304,38"/><polygon class="ah" points="346,86 358,86 352,96"/><polygon class="ah" points="62,86 74,86 68,96"/><polygon class="ah" points="152,176 152,188 162,182"/>
<rect class="bx-ok" x="20" y="20" width="96" height="36" rx="8"/><text class="t" x="68" y="43" text-anchor="middle">Lagos</text>
<rect class="bx-ok" x="162" y="20" width="96" height="36" rx="8"/><text class="t" x="210" y="43" text-anchor="middle">Accra</text>
<rect class="bx-ok" x="304" y="20" width="96" height="36" rx="8"/><text class="t" x="352" y="43" text-anchor="middle">Abidjan</text>
<rect class="bx-ok" x="304" y="96" width="96" height="36" rx="8"/><text class="t" x="352" y="119" text-anchor="middle">Dakar</text>
<rect class="bx-ok" x="20" y="96" width="96" height="36" rx="8"/><text class="t" x="68" y="119" text-anchor="middle">Abuja</text>
<rect class="bx-bad" x="20" y="164" width="96" height="36" rx="8"/><text class="t" x="68" y="187" text-anchor="middle">Nairobi</text>
<rect class="bx" x="162" y="164" width="96" height="36" rx="8"/><text class="t" x="210" y="187" text-anchor="middle">Kampala</text>
<text class="t-b t-bad" x="304" y="182" text-anchor="start" style="font-size:16px">false</text>
</svg>`]])}
${V.rules(V.rh('BFS or DFS?'),
 V.ok('shortest path, unweighted','BFS with a queue'),V.ok('can I get there at all?','DFS with recursion or a stack'),
 V.ok('const seen = new Set()','Both need a visited set on graphs'),V.no('no visited set','A loop in the graph means an infinite loop in your code'))}
${V.build(`<ol><li><code>maxDepth</code>: base case, then 1 plus the deeper child.</li><li><code>inorder</code>: recurse left, push the value, recurse right, return the array.</li><li><code>shortestPath</code>: a queue of <code>[row, col, steps]</code>, a seen Set of <code>"r,c"</code> strings, and four directions. Skip walls and cells outside the grid. Return -1 if the queue empties.</li><li><code>hasRoute</code>: the DFS above, with <code>seen</code> as a default parameter.</li></ol>`)}
${V.hook(`BFS goes wide with a queue. DFS goes deep with recursion. Both chalk the walls.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What is the depth of a tree with just one node? <i>1.</i> 2. Which search would you use to find the fewest moves in a maze? <i>BFS.</i> 3. Why does DFS need a seen set on a graph but not on a tree? <i>Graphs can loop back on themselves; trees cannot.</i></div>
`);

explain('a5',`
<p>Finding a word in a dictionary, sorting a playlist, working out a number that depends on smaller ones: three of the most famous ideas in computing. Each one wins by making the problem smaller at every step.</p>

${V.card(1,'Binary search','halve it every time',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="1,000,000 items halved again and again: 500,000, 250,000, down to 1 in about 20 steps">
<rect class="bx-a" x="10" y="14" width="400" height="26" rx="5"/><text class="t-m" x="210" y="33" text-anchor="middle">1,000,000</text>
<rect class="bx-a" x="10" y="48" width="200" height="26" rx="5"/><text class="t-m" x="110" y="67" text-anchor="middle">500,000</text>
<rect class="bx-a" x="10" y="82" width="100" height="26" rx="5"/><text class="t-m" x="60" y="101" text-anchor="middle">250,000</text>
<rect class="bx-a" x="10" y="116" width="50" height="26" rx="5"/>
<text class="t-b" x="140" y="133">... about 20 halvings to reach 1</text>
<text class="t-s" x="10" y="162">each step throws away half of what is left</text>
</svg><figcaption>Halving 1,000,000 again and again reaches 1 after about 20 steps. That is O(log n). It only works because the list is sorted.</figcaption></figure>
${V.like(`<p>The "guess my number from 1 to 100" game. A smart player always guesses the middle: "50?" "Higher." "75?" "Lower." Each answer throws away half the numbers, so 7 guesses are always enough.</p>`)}
${V.why(`<p>Checking a sorted list one by one wastes the order. Looking at the middle tells you which half the target must be in, so you never look at the other half again. That is how you find a word in a paper dictionary, and how databases search their indexes.</p>`)}
${V.anat([[1,'let lo = 0, hi = sorted.length - 1;'],'\n',[2,'while (lo &lt;= hi)'],' {\n  ',[3,'const mid = (lo + hi) &gt;&gt; 1;'],'\n  ',[4,'sorted[mid] &lt; target ? lo = mid + 1 : hi = mid - 1;'],'\n}'],[
 '<b>The search window.</b> lo and hi are the first and last index still in play.',
 '<b>Keep going</b> while the window has at least one item. When lo passes hi, the target is not there: return -1.',
 '<b>The middle.</b> <code>&gt;&gt; 1</code> shifts the bits right by one: it halves and drops the fraction, like <code>Math.floor((lo + hi) / 2)</code>.',
 '<b>Throw away half.</b> Too small? Search right of mid. Too big? Search left. (Check for equality first and return mid.)'])}
${V.steps([
 ['Find <b>13</b>. lo = 0, hi = 7, so mid = 3. sorted[3] is 7, which is too small. Throw away the left half: lo = 4.',`<svg viewBox="0 0 420 180" role="img" aria-label="mid 3 holds 7, too small">
<rect class="bx-a" x="18" y="14" width="44" height="46" rx="6"/><text class="t-m" x="40" y="44" text-anchor="middle" style="font-size:18px">1</text><text class="t-s" x="40" y="78" text-anchor="middle">0</text>
<rect class="bx-a" x="66" y="14" width="44" height="46" rx="6"/><text class="t-m" x="88" y="44" text-anchor="middle" style="font-size:18px">3</text><text class="t-s" x="88" y="78" text-anchor="middle">1</text>
<rect class="bx-a" x="114" y="14" width="44" height="46" rx="6"/><text class="t-m" x="136" y="44" text-anchor="middle" style="font-size:18px">5</text><text class="t-s" x="136" y="78" text-anchor="middle">2</text>
<rect class="bx-hl" x="162" y="14" width="44" height="46" rx="6"/><text class="t-m" x="184" y="44" text-anchor="middle" style="font-size:18px">7</text><text class="t-s" x="184" y="78" text-anchor="middle">3</text>
<rect class="bx-a" x="210" y="14" width="44" height="46" rx="6"/><text class="t-m" x="232" y="44" text-anchor="middle" style="font-size:18px">9</text><text class="t-s" x="232" y="78" text-anchor="middle">4</text>
<rect class="bx-a" x="258" y="14" width="44" height="46" rx="6"/><text class="t-m" x="280" y="44" text-anchor="middle" style="font-size:18px">11</text><text class="t-s" x="280" y="78" text-anchor="middle">5</text>
<rect class="bx-a" x="306" y="14" width="44" height="46" rx="6"/><text class="t-m" x="328" y="44" text-anchor="middle" style="font-size:18px">13</text><text class="t-s" x="328" y="78" text-anchor="middle">6</text>
<rect class="bx-a" x="354" y="14" width="44" height="46" rx="6"/><text class="t-m" x="376" y="44" text-anchor="middle" style="font-size:18px">15</text><text class="t-s" x="376" y="78" text-anchor="middle">7</text>
<text class="t-b t-warn" x="184" y="104" text-anchor="middle">mid</text><text class="t-b t-a" x="40" y="126" text-anchor="middle">lo</text><text class="t-b t-a" x="376" y="148" text-anchor="middle">hi</text>
<text class="t-b" x="10" y="174">7 &lt; 13: lo = mid + 1</text>
</svg>`],
 ['lo = 4, hi = 7, so mid = 5. sorted[5] is 11, still too small: lo = 6.',`<svg viewBox="0 0 420 180" role="img" aria-label="mid 5 holds 11, too small">
<rect class="bx" x="18" y="14" width="44" height="46" rx="6"/><text class="t-m t-dim" x="40" y="44" text-anchor="middle" style="font-size:18px">1</text><text class="t-s" x="40" y="78" text-anchor="middle">0</text>
<rect class="bx" x="66" y="14" width="44" height="46" rx="6"/><text class="t-m t-dim" x="88" y="44" text-anchor="middle" style="font-size:18px">3</text><text class="t-s" x="88" y="78" text-anchor="middle">1</text>
<rect class="bx" x="114" y="14" width="44" height="46" rx="6"/><text class="t-m t-dim" x="136" y="44" text-anchor="middle" style="font-size:18px">5</text><text class="t-s" x="136" y="78" text-anchor="middle">2</text>
<rect class="bx" x="162" y="14" width="44" height="46" rx="6"/><text class="t-m t-dim" x="184" y="44" text-anchor="middle" style="font-size:18px">7</text><text class="t-s" x="184" y="78" text-anchor="middle">3</text>
<rect class="bx-a" x="210" y="14" width="44" height="46" rx="6"/><text class="t-m" x="232" y="44" text-anchor="middle" style="font-size:18px">9</text><text class="t-s" x="232" y="78" text-anchor="middle">4</text>
<rect class="bx-hl" x="258" y="14" width="44" height="46" rx="6"/><text class="t-m" x="280" y="44" text-anchor="middle" style="font-size:18px">11</text><text class="t-s" x="280" y="78" text-anchor="middle">5</text>
<rect class="bx-a" x="306" y="14" width="44" height="46" rx="6"/><text class="t-m" x="328" y="44" text-anchor="middle" style="font-size:18px">13</text><text class="t-s" x="328" y="78" text-anchor="middle">6</text>
<rect class="bx-a" x="354" y="14" width="44" height="46" rx="6"/><text class="t-m" x="376" y="44" text-anchor="middle" style="font-size:18px">15</text><text class="t-s" x="376" y="78" text-anchor="middle">7</text>
<text class="t-b t-warn" x="280" y="104" text-anchor="middle">mid</text><text class="t-b t-a" x="232" y="126" text-anchor="middle">lo</text><text class="t-b t-a" x="376" y="148" text-anchor="middle">hi</text>
<text class="t-b" x="10" y="174">11 &lt; 13: lo = mid + 1</text>
</svg>`],
 ['lo = 6, hi = 7, so mid = 6. sorted[6] is <b>13</b>. Found it: return 6. Three looks instead of seven.',`<svg viewBox="0 0 420 180" role="img" aria-label="mid 6 holds 13, found">
<rect class="bx" x="18" y="14" width="44" height="46" rx="6"/><text class="t-m t-dim" x="40" y="44" text-anchor="middle" style="font-size:18px">1</text><text class="t-s" x="40" y="78" text-anchor="middle">0</text>
<rect class="bx" x="66" y="14" width="44" height="46" rx="6"/><text class="t-m t-dim" x="88" y="44" text-anchor="middle" style="font-size:18px">3</text><text class="t-s" x="88" y="78" text-anchor="middle">1</text>
<rect class="bx" x="114" y="14" width="44" height="46" rx="6"/><text class="t-m t-dim" x="136" y="44" text-anchor="middle" style="font-size:18px">5</text><text class="t-s" x="136" y="78" text-anchor="middle">2</text>
<rect class="bx" x="162" y="14" width="44" height="46" rx="6"/><text class="t-m t-dim" x="184" y="44" text-anchor="middle" style="font-size:18px">7</text><text class="t-s" x="184" y="78" text-anchor="middle">3</text>
<rect class="bx" x="210" y="14" width="44" height="46" rx="6"/><text class="t-m t-dim" x="232" y="44" text-anchor="middle" style="font-size:18px">9</text><text class="t-s" x="232" y="78" text-anchor="middle">4</text>
<rect class="bx" x="258" y="14" width="44" height="46" rx="6"/><text class="t-m t-dim" x="280" y="44" text-anchor="middle" style="font-size:18px">11</text><text class="t-s" x="280" y="78" text-anchor="middle">5</text>
<rect class="bx-ok" x="306" y="14" width="44" height="46" rx="6"/><text class="t-m" x="328" y="44" text-anchor="middle" style="font-size:18px">13</text><text class="t-s" x="328" y="78" text-anchor="middle">6</text>
<rect class="bx-a" x="354" y="14" width="44" height="46" rx="6"/><text class="t-m" x="376" y="44" text-anchor="middle" style="font-size:18px">15</text><text class="t-s" x="376" y="78" text-anchor="middle">7</text>
<text class="t-b t-warn" x="328" y="104" text-anchor="middle">mid</text><text class="t-b t-a" x="328" y="126" text-anchor="middle">lo</text><text class="t-b t-a" x="376" y="148" text-anchor="middle">hi</text>
<text class="t-b t-ok" x="10" y="174">13 === 13: return 6</text>
</svg>`]])}
${V.rules(V.rh('Rules'),
 V.ok('sorted input only','On an unsorted list the halves mean nothing'),V.ok('lo &lt;= hi','Use &lt;=, or you miss a one-item window'),
 V.no('lo = mid','The window may never shrink: an infinite loop. Use mid + 1'),V.ok('return -1','When the window is empty, the target is not there'))}
${V.hook(`Look in the middle, bin half, repeat.`)}
`)}

${V.card(2,'Recursion','a function that calls itself',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="Nested calls like Russian dolls: mergeSort of four items holds mergeSort of two, which holds mergeSort of one, the base case">
<rect class="bx-info" x="8" y="8" width="404" height="174" rx="40"/><text class="t-m" x="210" y="36" text-anchor="middle">mergeSort([5, 2, 4, 1])</text>
<rect class="bx-a" x="58" y="50" width="304" height="122" rx="34"/><text class="t-m" x="210" y="78" text-anchor="middle">mergeSort([5, 2])</text>
<rect class="bx-ok" x="108" y="92" width="204" height="70" rx="28"/><text class="t-m" x="210" y="122" text-anchor="middle">mergeSort([5])</text><text class="t-b t-ok" x="210" y="146" text-anchor="middle">base case: stop</text>
</svg><figcaption>A recursive function solves a big problem by calling itself on a smaller one, like Russian dolls. The smallest doll is the <b>base case</b>, where it stops.</figcaption></figure>
${V.like(`<p>Russian dolls. To reach the smallest doll you open a doll, find a smaller doll, and do the same thing again. You stop when a doll does not open. Without that last solid doll you would be opening forever.</p>`)}
${V.why(`<p>Some problems contain smaller copies of themselves: sorting half a list, a folder inside a folder. Each call waits on the <b>call stack</b> until its smaller call returns. With no base case the stack fills up and JavaScript stops with <code>RangeError: Maximum call stack size exceeded</code>.</p>`)}
${V.rules(V.rh('Every recursive function needs'),
 V.ok('a base case','The smallest input, answered directly: if (arr.length &lt;= 1)'),V.ok('a smaller step','Each call must move towards the base case'),
 V.no('fib(n) calls fib(n)','Same size again: it never gets smaller'))}
${V.hook(`Smaller every call, and a floor to stop on.`)}
`)}

${V.card(3,'Merge sort','split, sort the halves, merge',`
${V.like(`<p>Sorting a huge pile of exam papers with friends. Split the pile in two and hand each half to a friend, who does the same, until everyone holds one paper. One paper is already sorted. Then pairs of people merge their piles by always taking the smaller top paper.</p>`)}
${V.steps([
 ['Start with <code>[5, 2, 4, 1]</code>. It has more than one item, so split it in the middle.',`<svg viewBox="0 0 420 226" role="img" aria-label="Start with 5, 2, 4, 1">
<rect class="bx-hl" x="126" y="10" width="40" height="32" rx="5"/><text class="t-m" x="146" y="32" text-anchor="middle" style="font-size:17px">5</text><rect class="bx-hl" x="168" y="10" width="40" height="32" rx="5"/><text class="t-m" x="188" y="32" text-anchor="middle" style="font-size:17px">2</text><rect class="bx-hl" x="210" y="10" width="40" height="32" rx="5"/><text class="t-m" x="230" y="32" text-anchor="middle" style="font-size:17px">4</text><rect class="bx-hl" x="252" y="10" width="40" height="32" rx="5"/><text class="t-m" x="272" y="32" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="31" text-anchor="end">start</text>
</svg>`],
 ['Two halves: <code>[5, 2]</code> and <code>[4, 1]</code>. Each is still too big, so split again.',`<svg viewBox="0 0 420 226" role="img" aria-label="Split into two halves">
<rect class="bx" x="126" y="10" width="40" height="32" rx="5"/><text class="t-m" x="146" y="32" text-anchor="middle" style="font-size:17px">5</text><rect class="bx" x="168" y="10" width="40" height="32" rx="5"/><text class="t-m" x="188" y="32" text-anchor="middle" style="font-size:17px">2</text><rect class="bx" x="210" y="10" width="40" height="32" rx="5"/><text class="t-m" x="230" y="32" text-anchor="middle" style="font-size:17px">4</text><rect class="bx" x="252" y="10" width="40" height="32" rx="5"/><text class="t-m" x="272" y="32" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="31" text-anchor="end">start</text>
<rect class="bx-hl" x="70" y="54" width="40" height="32" rx="5"/><text class="t-m" x="90" y="76" text-anchor="middle" style="font-size:17px">5</text><rect class="bx-hl" x="112" y="54" width="40" height="32" rx="5"/><text class="t-m" x="132" y="76" text-anchor="middle" style="font-size:17px">2</text><rect class="bx-hl" x="266" y="54" width="40" height="32" rx="5"/><text class="t-m" x="286" y="76" text-anchor="middle" style="font-size:17px">4</text><rect class="bx-hl" x="308" y="54" width="40" height="32" rx="5"/><text class="t-m" x="328" y="76" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="75" text-anchor="end">split</text>
</svg>`],
 ['Four single items. A list of one is already sorted: this is the <b>base case</b>.',`<svg viewBox="0 0 420 226" role="img" aria-label="Split into single items">
<rect class="bx" x="126" y="10" width="40" height="32" rx="5"/><text class="t-m" x="146" y="32" text-anchor="middle" style="font-size:17px">5</text><rect class="bx" x="168" y="10" width="40" height="32" rx="5"/><text class="t-m" x="188" y="32" text-anchor="middle" style="font-size:17px">2</text><rect class="bx" x="210" y="10" width="40" height="32" rx="5"/><text class="t-m" x="230" y="32" text-anchor="middle" style="font-size:17px">4</text><rect class="bx" x="252" y="10" width="40" height="32" rx="5"/><text class="t-m" x="272" y="32" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="31" text-anchor="end">start</text>
<rect class="bx" x="70" y="54" width="40" height="32" rx="5"/><text class="t-m" x="90" y="76" text-anchor="middle" style="font-size:17px">5</text><rect class="bx" x="112" y="54" width="40" height="32" rx="5"/><text class="t-m" x="132" y="76" text-anchor="middle" style="font-size:17px">2</text><rect class="bx" x="266" y="54" width="40" height="32" rx="5"/><text class="t-m" x="286" y="76" text-anchor="middle" style="font-size:17px">4</text><rect class="bx" x="308" y="54" width="40" height="32" rx="5"/><text class="t-m" x="328" y="76" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="75" text-anchor="end">split</text>
<rect class="bx-hl" x="50" y="98" width="40" height="32" rx="5"/><text class="t-m" x="70" y="120" text-anchor="middle" style="font-size:17px">5</text><rect class="bx-hl" x="120" y="98" width="40" height="32" rx="5"/><text class="t-m" x="140" y="120" text-anchor="middle" style="font-size:17px">2</text><rect class="bx-hl" x="246" y="98" width="40" height="32" rx="5"/><text class="t-m" x="266" y="120" text-anchor="middle" style="font-size:17px">4</text><rect class="bx-hl" x="316" y="98" width="40" height="32" rx="5"/><text class="t-m" x="336" y="120" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="119" text-anchor="end">split</text>
</svg>`],
 ['Merge pairs. Compare the fronts and take the smaller one each time: <code>[2, 5]</code> and <code>[1, 4]</code>.',`<svg viewBox="0 0 420 226" role="img" aria-label="Merge into 2, 5 and 1, 4">
<rect class="bx" x="126" y="10" width="40" height="32" rx="5"/><text class="t-m" x="146" y="32" text-anchor="middle" style="font-size:17px">5</text><rect class="bx" x="168" y="10" width="40" height="32" rx="5"/><text class="t-m" x="188" y="32" text-anchor="middle" style="font-size:17px">2</text><rect class="bx" x="210" y="10" width="40" height="32" rx="5"/><text class="t-m" x="230" y="32" text-anchor="middle" style="font-size:17px">4</text><rect class="bx" x="252" y="10" width="40" height="32" rx="5"/><text class="t-m" x="272" y="32" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="31" text-anchor="end">start</text>
<rect class="bx" x="70" y="54" width="40" height="32" rx="5"/><text class="t-m" x="90" y="76" text-anchor="middle" style="font-size:17px">5</text><rect class="bx" x="112" y="54" width="40" height="32" rx="5"/><text class="t-m" x="132" y="76" text-anchor="middle" style="font-size:17px">2</text><rect class="bx" x="266" y="54" width="40" height="32" rx="5"/><text class="t-m" x="286" y="76" text-anchor="middle" style="font-size:17px">4</text><rect class="bx" x="308" y="54" width="40" height="32" rx="5"/><text class="t-m" x="328" y="76" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="75" text-anchor="end">split</text>
<rect class="bx" x="50" y="98" width="40" height="32" rx="5"/><text class="t-m" x="70" y="120" text-anchor="middle" style="font-size:17px">5</text><rect class="bx" x="120" y="98" width="40" height="32" rx="5"/><text class="t-m" x="140" y="120" text-anchor="middle" style="font-size:17px">2</text><rect class="bx" x="246" y="98" width="40" height="32" rx="5"/><text class="t-m" x="266" y="120" text-anchor="middle" style="font-size:17px">4</text><rect class="bx" x="316" y="98" width="40" height="32" rx="5"/><text class="t-m" x="336" y="120" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="119" text-anchor="end">split</text>
<rect class="bx-hl" x="70" y="142" width="40" height="32" rx="5"/><text class="t-m" x="90" y="164" text-anchor="middle" style="font-size:17px">2</text><rect class="bx-hl" x="112" y="142" width="40" height="32" rx="5"/><text class="t-m" x="132" y="164" text-anchor="middle" style="font-size:17px">5</text><rect class="bx-hl" x="266" y="142" width="40" height="32" rx="5"/><text class="t-m" x="286" y="164" text-anchor="middle" style="font-size:17px">1</text><rect class="bx-hl" x="308" y="142" width="40" height="32" rx="5"/><text class="t-m" x="328" y="164" text-anchor="middle" style="font-size:17px">4</text><text class="t-s" x="410" y="163" text-anchor="end">merge</text>
</svg>`],
 ['Merge the halves: 1 &lt; 2, take 1. 2 &lt; 4, take 2. 4 &lt; 5, take 4. Then the leftover 5. Result: <code>[1, 2, 4, 5]</code>.',`<svg viewBox="0 0 420 226" role="img" aria-label="Final merge gives 1, 2, 4, 5">
<rect class="bx" x="126" y="10" width="40" height="32" rx="5"/><text class="t-m" x="146" y="32" text-anchor="middle" style="font-size:17px">5</text><rect class="bx" x="168" y="10" width="40" height="32" rx="5"/><text class="t-m" x="188" y="32" text-anchor="middle" style="font-size:17px">2</text><rect class="bx" x="210" y="10" width="40" height="32" rx="5"/><text class="t-m" x="230" y="32" text-anchor="middle" style="font-size:17px">4</text><rect class="bx" x="252" y="10" width="40" height="32" rx="5"/><text class="t-m" x="272" y="32" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="31" text-anchor="end">start</text>
<rect class="bx" x="70" y="54" width="40" height="32" rx="5"/><text class="t-m" x="90" y="76" text-anchor="middle" style="font-size:17px">5</text><rect class="bx" x="112" y="54" width="40" height="32" rx="5"/><text class="t-m" x="132" y="76" text-anchor="middle" style="font-size:17px">2</text><rect class="bx" x="266" y="54" width="40" height="32" rx="5"/><text class="t-m" x="286" y="76" text-anchor="middle" style="font-size:17px">4</text><rect class="bx" x="308" y="54" width="40" height="32" rx="5"/><text class="t-m" x="328" y="76" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="75" text-anchor="end">split</text>
<rect class="bx" x="50" y="98" width="40" height="32" rx="5"/><text class="t-m" x="70" y="120" text-anchor="middle" style="font-size:17px">5</text><rect class="bx" x="120" y="98" width="40" height="32" rx="5"/><text class="t-m" x="140" y="120" text-anchor="middle" style="font-size:17px">2</text><rect class="bx" x="246" y="98" width="40" height="32" rx="5"/><text class="t-m" x="266" y="120" text-anchor="middle" style="font-size:17px">4</text><rect class="bx" x="316" y="98" width="40" height="32" rx="5"/><text class="t-m" x="336" y="120" text-anchor="middle" style="font-size:17px">1</text><text class="t-s" x="410" y="119" text-anchor="end">split</text>
<rect class="bx-ok" x="70" y="142" width="40" height="32" rx="5"/><text class="t-m" x="90" y="164" text-anchor="middle" style="font-size:17px">2</text><rect class="bx-ok" x="112" y="142" width="40" height="32" rx="5"/><text class="t-m" x="132" y="164" text-anchor="middle" style="font-size:17px">5</text><rect class="bx-ok" x="266" y="142" width="40" height="32" rx="5"/><text class="t-m" x="286" y="164" text-anchor="middle" style="font-size:17px">1</text><rect class="bx-ok" x="308" y="142" width="40" height="32" rx="5"/><text class="t-m" x="328" y="164" text-anchor="middle" style="font-size:17px">4</text><text class="t-s" x="410" y="163" text-anchor="end">merge</text>
<rect class="bx-ok" x="126" y="186" width="40" height="32" rx="5"/><text class="t-m" x="146" y="208" text-anchor="middle" style="font-size:17px">1</text><rect class="bx-ok" x="168" y="186" width="40" height="32" rx="5"/><text class="t-m" x="188" y="208" text-anchor="middle" style="font-size:17px">2</text><rect class="bx-ok" x="210" y="186" width="40" height="32" rx="5"/><text class="t-m" x="230" y="208" text-anchor="middle" style="font-size:17px">4</text><rect class="bx-ok" x="252" y="186" width="40" height="32" rx="5"/><text class="t-m" x="272" y="208" text-anchor="middle" style="font-size:17px">5</text><text class="t-s" x="410" y="207" text-anchor="end">merge</text>
</svg>`]])}
${V.why(`<p>Comparing every item with every other is O(n²). Merge sort splits about log n times, and each level of merging touches all n items once, so it is <b>O(n log n)</b>. John von Neumann described it in 1945, and it is still used inside real sorting functions today.</p>`)}
${V.anat([[1,'if (arr.length &lt;= 1) return arr.slice();'],'\n',[2,'const left = mergeSort(arr.slice(0, mid));'],'\n',[3,'out.push(left[i] &lt;= right[j] ? left[i++] : right[j++]);'],'\n',[4,'return out.concat(left.slice(i), right.slice(j));']],[
 '<b>Base case.</b> Return a copy, so you never change the caller\'s array.',
 '<b>Sort each half</b> by calling mergeSort again (and the same for the right half).',
 '<b>Merge step.</b> Take whichever front item is smaller and move that pointer on.',
 '<b>Leftovers.</b> When one side runs out, the rest of the other side is already sorted.'])}
${V.hook(`Split till it's one, merge till it's done.`)}
`)}

${V.card(4,'Memoization','write the answer down',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="The call tree for fib(5): fib(3) is worked out twice and fib(2) three times">
<path class="ln" d="M210 36L115 58M210 36L305 58M115 86L60 108M115 86L170 108M305 86L250 108M305 86L360 108"/>
<rect class="bx" x="174" y="8" width="72" height="28" rx="6"/><text class="t-m" x="210" y="27" text-anchor="middle" style="font-size:14px">fib(5)</text><rect class="bx" x="79" y="58" width="72" height="28" rx="6"/><text class="t-m" x="115" y="77" text-anchor="middle" style="font-size:14px">fib(4)</text><rect class="bx-bad" x="269" y="58" width="72" height="28" rx="6"/><text class="t-m" x="305" y="77" text-anchor="middle" style="font-size:14px">fib(3)</text><rect class="bx-bad" x="24" y="108" width="72" height="28" rx="6"/><text class="t-m" x="60" y="127" text-anchor="middle" style="font-size:14px">fib(3)</text><rect class="bx-warn" x="134" y="108" width="72" height="28" rx="6"/><text class="t-m" x="170" y="127" text-anchor="middle" style="font-size:14px">fib(2)</text><rect class="bx-warn" x="214" y="108" width="72" height="28" rx="6"/><text class="t-m" x="250" y="127" text-anchor="middle" style="font-size:14px">fib(2)</text><rect class="bx" x="324" y="108" width="72" height="28" rx="6"/><text class="t-m" x="360" y="127" text-anchor="middle" style="font-size:14px">fib(1)</text>
<text class="t-s" x="60" y="160" text-anchor="middle">...and more</text><text class="t-s" x="210" y="160" text-anchor="middle">...</text><text class="t-b t-bad" x="410" y="172" text-anchor="end">same work, again</text>
</svg><figcaption>Plain recursive fib(5) works out fib(3) twice and fib(2) three times. For fib(70) the repeats add up to hundreds of trillions of calls.</figcaption></figure>
${V.like(`<p>Your times tables. You do not work out 7 x 8 from scratch every time; you remembered it once. Memoization gives a function a notebook: before working, look the answer up; after working, write it down.</p>`)}
${V.anat([[1,'if (memo.has(n)) return memo.get(n);'],'\n',[2,'const value = fib(n - 1) + fib(n - 2);'],'\n',[3,'memo.set(n, value);']],[
 '<b>Look it up.</b> Already solved? Return it instantly.',
 '<b>Work it out</b> once, the slow way.',
 '<b>Write it down</b> for next time. Now each n is computed only once: O(n).'])}
${V.rules(V.rh('Rules'),
 V.ok('const memo = new Map();','Outside the function, so every call shares one notebook'),V.no('const memo inside fib','A new empty notebook on every call remembers nothing'),
 V.ok('if (n &lt; 2) return n;','The base case still comes first'))}
${V.build(`<ol><li><code>binarySearch</code>: the lo, hi, mid loop. Return mid when equal, -1 after the loop.</li><li><code>mergeSort</code>: base case, split at <code>arr.length &gt;&gt; 1</code>, sort both halves, merge with two pointers. No <code>.sort()</code>.</li><li><code>fib</code>: add a Map outside the function, look up first, store before returning. Check that <code>fib(70)</code> is instant.</li></ol>`)}
${V.hook(`Never solve the same small problem twice: memoize it.`)}
`)}

<div class="try"><b>Try it in your head</b>1. How many looks does binary search need at most for 1,000 sorted items? <i>About 10.</i> 2. What is the base case of merge sort? <i>A list of 0 or 1 items.</i> 3. Why is memoized fib O(n)? <i>Each value from 0 to n is computed once, then looked up.</i></div>
`);

explain('a6',`
<p>Interviewers do not want you to memorise hundreds of answers. They want you to spot the <b>pattern</b> in a question. Three patterns, a sliding window, a running best and dynamic programming, crack a huge share of them.</p>

${V.card(1,'Sliding window','a frame that slides along',`
${V.like(`<p>A caterpillar crawling along a word. Its head moves forward one letter at a time. If its body would cover the same letter twice, its tail shuffles forward until the repeat is gone. You note its longest length along the way.</p>`)}
${V.why(`<p>"Longest substring" questions tempt you to check every start and every end: O(n²) or worse. A window keeps the answer for the current stretch and only adjusts its edges, so each letter enters once and leaves once: O(n).</p>`)}
${V.steps([
 ['<code>"pwwkew"</code>. The right edge moves first: <b>p</b>, then <b>w</b>. No repeats, so the window is "pw" and best is 2.',`<svg viewBox="0 0 420 170" role="img" aria-label="Window pw, best 2">
<rect class="bx-ok" x="40" y="34" width="52" height="50" rx="6"/><text class="t-m" x="66" y="66" text-anchor="middle" style="font-size:20px">p</text><text class="t-s" x="66" y="24" text-anchor="middle">0</text>
<rect class="bx-ok" x="96" y="34" width="52" height="50" rx="6"/><text class="t-m" x="122" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="122" y="24" text-anchor="middle">1</text>
<rect class="bx" x="152" y="34" width="52" height="50" rx="6"/><text class="t-m t-dim" x="178" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="178" y="24" text-anchor="middle">2</text>
<rect class="bx" x="208" y="34" width="52" height="50" rx="6"/><text class="t-m t-dim" x="234" y="66" text-anchor="middle" style="font-size:20px">k</text><text class="t-s" x="234" y="24" text-anchor="middle">3</text>
<rect class="bx" x="264" y="34" width="52" height="50" rx="6"/><text class="t-m t-dim" x="290" y="66" text-anchor="middle" style="font-size:20px">e</text><text class="t-s" x="290" y="24" text-anchor="middle">4</text>
<rect class="bx" x="320" y="34" width="52" height="50" rx="6"/><text class="t-m t-dim" x="346" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="346" y="24" text-anchor="middle">5</text>
<rect class="ln-a" style="stroke-width:3" x="34" y="28" width="120" height="62" rx="9"/>
<text class="t-b t-a" x="94.0" y="110" text-anchor="middle">window</text>
<text class="t-m" x="40" y="150" style="font-size:17px">best: 2</text><text class="t" x="180" y="150">"pw": no repeats</text>
</svg>`],
 ['The next <b>w</b> is already in the window. Move the left edge past the old w: start = 2. The window shrinks to "w".',`<svg viewBox="0 0 420 170" role="img" aria-label="Repeat w: start jumps to 2">
<rect class="bx" x="40" y="34" width="52" height="50" rx="6"/><text class="t-m" x="66" y="66" text-anchor="middle" style="font-size:20px">p</text><text class="t-s" x="66" y="24" text-anchor="middle">0</text>
<rect class="bx" x="96" y="34" width="52" height="50" rx="6"/><text class="t-m" x="122" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="122" y="24" text-anchor="middle">1</text>
<rect class="bx-bad" x="152" y="34" width="52" height="50" rx="6"/><text class="t-m" x="178" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="178" y="24" text-anchor="middle">2</text>
<rect class="bx" x="208" y="34" width="52" height="50" rx="6"/><text class="t-m t-dim" x="234" y="66" text-anchor="middle" style="font-size:20px">k</text><text class="t-s" x="234" y="24" text-anchor="middle">3</text>
<rect class="bx" x="264" y="34" width="52" height="50" rx="6"/><text class="t-m t-dim" x="290" y="66" text-anchor="middle" style="font-size:20px">e</text><text class="t-s" x="290" y="24" text-anchor="middle">4</text>
<rect class="bx" x="320" y="34" width="52" height="50" rx="6"/><text class="t-m t-dim" x="346" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="346" y="24" text-anchor="middle">5</text>
<rect class="ln-a" style="stroke-width:3" x="146" y="28" width="64" height="62" rx="9"/>
<text class="t-b t-a" x="178.0" y="110" text-anchor="middle">window</text>
<text class="t-m" x="40" y="150" style="font-size:17px">best: 2</text><text class="t" x="180" y="150">w seen at 1: start = 2</text>
</svg>`],
 ['Add <b>k</b> and <b>e</b>. The window is "wke", length 3. New best: <b>3</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="Window wke, best 3">
<rect class="bx" x="40" y="34" width="52" height="50" rx="6"/><text class="t-m" x="66" y="66" text-anchor="middle" style="font-size:20px">p</text><text class="t-s" x="66" y="24" text-anchor="middle">0</text>
<rect class="bx" x="96" y="34" width="52" height="50" rx="6"/><text class="t-m" x="122" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="122" y="24" text-anchor="middle">1</text>
<rect class="bx-ok" x="152" y="34" width="52" height="50" rx="6"/><text class="t-m" x="178" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="178" y="24" text-anchor="middle">2</text>
<rect class="bx-ok" x="208" y="34" width="52" height="50" rx="6"/><text class="t-m" x="234" y="66" text-anchor="middle" style="font-size:20px">k</text><text class="t-s" x="234" y="24" text-anchor="middle">3</text>
<rect class="bx-ok" x="264" y="34" width="52" height="50" rx="6"/><text class="t-m" x="290" y="66" text-anchor="middle" style="font-size:20px">e</text><text class="t-s" x="290" y="24" text-anchor="middle">4</text>
<rect class="bx" x="320" y="34" width="52" height="50" rx="6"/><text class="t-m t-dim" x="346" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="346" y="24" text-anchor="middle">5</text>
<rect class="ln-a" style="stroke-width:3" x="146" y="28" width="176" height="62" rx="9"/>
<text class="t-b t-a" x="234.0" y="110" text-anchor="middle">window</text>
<text class="t-m" x="40" y="150" style="font-size:17px">best: 3</text><text class="t" x="180" y="150">"wke": length 3</text>
</svg>`],
 ['Another <b>w</b>. Its last position (2) is inside the window, so start jumps to 3: "kew". Still 3. The answer is <b>3</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="Window kew, answer 3">
<rect class="bx" x="40" y="34" width="52" height="50" rx="6"/><text class="t-m" x="66" y="66" text-anchor="middle" style="font-size:20px">p</text><text class="t-s" x="66" y="24" text-anchor="middle">0</text>
<rect class="bx" x="96" y="34" width="52" height="50" rx="6"/><text class="t-m" x="122" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="122" y="24" text-anchor="middle">1</text>
<rect class="bx" x="152" y="34" width="52" height="50" rx="6"/><text class="t-m" x="178" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="178" y="24" text-anchor="middle">2</text>
<rect class="bx-ok" x="208" y="34" width="52" height="50" rx="6"/><text class="t-m" x="234" y="66" text-anchor="middle" style="font-size:20px">k</text><text class="t-s" x="234" y="24" text-anchor="middle">3</text>
<rect class="bx-ok" x="264" y="34" width="52" height="50" rx="6"/><text class="t-m" x="290" y="66" text-anchor="middle" style="font-size:20px">e</text><text class="t-s" x="290" y="24" text-anchor="middle">4</text>
<rect class="bx-bad" x="320" y="34" width="52" height="50" rx="6"/><text class="t-m" x="346" y="66" text-anchor="middle" style="font-size:20px">w</text><text class="t-s" x="346" y="24" text-anchor="middle">5</text>
<rect class="ln-a" style="stroke-width:3" x="202" y="28" width="176" height="62" rx="9"/>
<text class="t-b t-a" x="290.0" y="110" text-anchor="middle">window</text>
<text class="t-m" x="40" y="150" style="font-size:17px">best: 3</text><text class="t" x="180" y="150">"kew": answer 3</text>
</svg>`]])}
${V.anat([[1,'if (lastSeen.has(s[i]) &amp;&amp; lastSeen.get(s[i]) &gt;= start)'],' ',[2,'start = lastSeen.get(s[i]) + 1;'],'\n',[3,'lastSeen.set(s[i], i);'],'\n',[4,'best = Math.max(best, i - start + 1);']],[
 '<b>A repeat inside the window?</b> The <code>&gt;= start</code> part ignores old copies that are already behind the left edge.',
 '<b>Shrink:</b> jump the left edge just past the old copy.',
 '<b>Remember</b> where this letter was last seen.',
 '<b>Measure</b> the window: right minus left plus one.'])}
${V.rules(V.rh('Rules'),
 V.ok('i - start + 1','A window from 2 to 4 holds 3 letters, not 2'),V.no('forgetting &gt;= start','"abba" gives 3 instead of 2: the first a is outside the window'),
 V.ok('lengthOfLongestSubstring("") === 0','An empty string has no window'))}
${V.hook(`Grow the right edge, shrink the left on a repeat, measure each time.`)}
`)}

${V.card(2,'One pass with a running best','buy low, sell later',`
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="Prices 7, 1, 5, 3, 6, 4 over six days: buy at 1 on day 2, sell at 6 on day 5 for a profit of 5">
<path class="ln" d="M30 10V176H410"/>
<path class="ln-a" style="stroke-width:3" d="M60 29L124 155L188 71L252 113L316 50L380 92"/>
<circle class="dot" cx="60" cy="29" r="7"/><text class="t-m" x="60" y="15" text-anchor="middle">7</text><text class="t-s" x="60" y="194" text-anchor="middle">day 1</text>
<circle class="dot-ok" cx="124" cy="155" r="7"/><text class="t-m" x="104" y="160" text-anchor="middle">1</text><text class="t-s" x="124" y="194" text-anchor="middle">day 2</text>
<circle class="dot" cx="188" cy="71" r="7"/><text class="t-m" x="188" y="57" text-anchor="middle">5</text><text class="t-s" x="188" y="194" text-anchor="middle">day 3</text>
<circle class="dot" cx="252" cy="113" r="7"/><text class="t-m" x="252" y="99" text-anchor="middle">3</text><text class="t-s" x="252" y="194" text-anchor="middle">day 4</text>
<circle class="dot-ok" cx="316" cy="50" r="7"/><text class="t-m" x="316" y="36" text-anchor="middle">6</text><text class="t-s" x="316" y="194" text-anchor="middle">day 5</text>
<circle class="dot" cx="380" cy="92" r="7"/><text class="t-m" x="380" y="78" text-anchor="middle">4</text><text class="t-s" x="380" y="194" text-anchor="middle">day 6</text>
<path class="ln-d" d="M124 155H316M316 155V50"/><text class="t-b t-ok" x="78" y="134" text-anchor="middle">buy</text><text class="t-b t-ok" x="350" y="44">sell</text><text class="t-b t-ok" x="326" y="110">+5</text>
</svg><figcaption>Walk through the days once. Remember the lowest price so far. Each day, ask: "if I sold today, what would I make?" Keep the best answer.</figcaption></figure>
${V.like(`<p>Tracking trainers on a resale app. You keep a note of the cheapest price you have seen, and each day you check how much you would make by selling at today's price. You never need to look back further than your note.</p>`)}
${V.anat([[1,'lowest = Math.min(lowest, p);'],'\n',[2,'best = Math.max(best, p - lowest);']],[
 '<b>Running minimum.</b> Start it at <code>Infinity</code> so the first price always replaces it.',
 '<b>Running best.</b> Start at 0: if prices only fall, you simply do not trade.'])}
${V.hook(`Remember the low, test each high: one pass.`)}
`)}

${V.card(3,'Dynamic programming','build big answers from small ones',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="A staircase: ways to reach steps 0 to 5 are 1, 1, 2, 3, 5, 8">
<rect class="bx-info" x="16" y="140" width="62" height="30" rx="4"/><text class="t-m" x="47" y="162" text-anchor="middle" style="font-size:18px">1</text><text class="t-s" x="47" y="186" text-anchor="middle">step 0</text>
<rect class="bx-info" x="82" y="116" width="62" height="54" rx="4"/><text class="t-m" x="113" y="138" text-anchor="middle" style="font-size:18px">1</text><text class="t-s" x="113" y="186" text-anchor="middle">step 1</text>
<rect class="bx-info" x="148" y="92" width="62" height="78" rx="4"/><text class="t-m" x="179" y="114" text-anchor="middle" style="font-size:18px">2</text><text class="t-s" x="179" y="186" text-anchor="middle">step 2</text>
<rect class="bx-info" x="214" y="68" width="62" height="102" rx="4"/><text class="t-m" x="245" y="90" text-anchor="middle" style="font-size:18px">3</text><text class="t-s" x="245" y="186" text-anchor="middle">step 3</text>
<rect class="bx-info" x="280" y="44" width="62" height="126" rx="4"/><text class="t-m" x="311" y="66" text-anchor="middle" style="font-size:18px">5</text><text class="t-s" x="311" y="186" text-anchor="middle">step 4</text>
<rect class="bx-a" x="346" y="20" width="62" height="150" rx="4"/><text class="t-m" x="377" y="42" text-anchor="middle" style="font-size:18px">8</text><text class="t-s" x="377" y="186" text-anchor="middle">step 5</text>
<text class="t" x="16" y="30">ways(5) = ways(4) + ways(3)</text><text class="t-m" x="16" y="54">8 = 5 + 3</text>
</svg><figcaption>To reach step 5 your last move was from step 4 (a 1-step) or step 3 (a 2-step). So the ways to reach 5 are the ways to reach 4 plus the ways to reach 3.</figcaption></figure>
${V.like(`<p>Building a Lego tower. You do not design the 10th floor from nothing; you put it on top of floors 1 to 9, which you already built. Dynamic programming fills in answers from the smallest up, so every answer can stand on earlier ones.</p>`)}
${V.why(`<p>Plain recursion recomputes the same small answers again and again, like fib in the last lesson. Richard Bellman named "dynamic programming" in the 1950s. The idea: store the answer for every smaller size in a table, <code>dp</code>, and fill it in order.</p>`)}
<p><b>Watch the coin change table fill up</b> for coins [1, 2, 5] and amount 6. <code>dp[x]</code> is the fewest coins that make x.</p>
${V.steps([
 ['<b>dp[0] = 0</b>: zero coins make 0. Every other amount starts as Infinity, meaning "not possible yet".',`<svg viewBox="0 0 420 170" role="img" aria-label="dp 0 is 0, the rest infinity">
<text class="t-s" x="26" y="20">amount</text><text class="t-s" x="26" y="112">fewest coins: dp[amount]</text>
<text class="t-b" x="51" y="40" text-anchor="middle">0</text><rect class="bx-hl" x="26" y="50" width="50" height="44" rx="6"/><text class="t-m" x="51" y="79" text-anchor="middle" style="font-size:19px">0</text>
<text class="t-b" x="105" y="40" text-anchor="middle">1</text><rect class="bx" x="80" y="50" width="50" height="44" rx="6"/><text class="t-m" x="105" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t-b" x="159" y="40" text-anchor="middle">2</text><rect class="bx" x="134" y="50" width="50" height="44" rx="6"/><text class="t-m" x="159" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t-b" x="213" y="40" text-anchor="middle">3</text><rect class="bx" x="188" y="50" width="50" height="44" rx="6"/><text class="t-m" x="213" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t-b" x="267" y="40" text-anchor="middle">4</text><rect class="bx" x="242" y="50" width="50" height="44" rx="6"/><text class="t-m" x="267" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t-b" x="321" y="40" text-anchor="middle">5</text><rect class="bx" x="296" y="50" width="50" height="44" rx="6"/><text class="t-m" x="321" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t-b" x="375" y="40" text-anchor="middle">6</text><rect class="bx" x="350" y="50" width="50" height="44" rx="6"/><text class="t-m" x="375" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t" x="26" y="146">base case: dp[0] = 0</text>
</svg>`],
 ['dp[1]: a 1 coin plus dp[0], so <b>1</b>. dp[2]: a 2 coin plus dp[0], so <b>1</b>.',`<svg viewBox="0 0 420 170" role="img" aria-label="dp 1 and dp 2 are 1">
<text class="t-s" x="26" y="20">amount</text><text class="t-s" x="26" y="112">fewest coins: dp[amount]</text>
<text class="t-b" x="51" y="40" text-anchor="middle">0</text><rect class="bx-ok" x="26" y="50" width="50" height="44" rx="6"/><text class="t-m" x="51" y="79" text-anchor="middle" style="font-size:19px">0</text>
<text class="t-b" x="105" y="40" text-anchor="middle">1</text><rect class="bx-hl" x="80" y="50" width="50" height="44" rx="6"/><text class="t-m" x="105" y="79" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-b" x="159" y="40" text-anchor="middle">2</text><rect class="bx-hl" x="134" y="50" width="50" height="44" rx="6"/><text class="t-m" x="159" y="79" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-b" x="213" y="40" text-anchor="middle">3</text><rect class="bx" x="188" y="50" width="50" height="44" rx="6"/><text class="t-m" x="213" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t-b" x="267" y="40" text-anchor="middle">4</text><rect class="bx" x="242" y="50" width="50" height="44" rx="6"/><text class="t-m" x="267" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t-b" x="321" y="40" text-anchor="middle">5</text><rect class="bx" x="296" y="50" width="50" height="44" rx="6"/><text class="t-m" x="321" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t-b" x="375" y="40" text-anchor="middle">6</text><rect class="bx" x="350" y="50" width="50" height="44" rx="6"/><text class="t-m" x="375" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t" x="26" y="146">2 = one 2 coin</text>
</svg>`],
 ['dp[3] = dp[1] + 1 = <b>2</b> (2 + 1). dp[4] = dp[2] + 1 = <b>2</b> (2 + 2).',`<svg viewBox="0 0 420 170" role="img" aria-label="dp 3 and dp 4 are 2">
<text class="t-s" x="26" y="20">amount</text><text class="t-s" x="26" y="112">fewest coins: dp[amount]</text>
<text class="t-b" x="51" y="40" text-anchor="middle">0</text><rect class="bx-ok" x="26" y="50" width="50" height="44" rx="6"/><text class="t-m" x="51" y="79" text-anchor="middle" style="font-size:19px">0</text>
<text class="t-b" x="105" y="40" text-anchor="middle">1</text><rect class="bx-ok" x="80" y="50" width="50" height="44" rx="6"/><text class="t-m" x="105" y="79" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-b" x="159" y="40" text-anchor="middle">2</text><rect class="bx-ok" x="134" y="50" width="50" height="44" rx="6"/><text class="t-m" x="159" y="79" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-b" x="213" y="40" text-anchor="middle">3</text><rect class="bx-hl" x="188" y="50" width="50" height="44" rx="6"/><text class="t-m" x="213" y="79" text-anchor="middle" style="font-size:19px">2</text>
<text class="t-b" x="267" y="40" text-anchor="middle">4</text><rect class="bx-hl" x="242" y="50" width="50" height="44" rx="6"/><text class="t-m" x="267" y="79" text-anchor="middle" style="font-size:19px">2</text>
<text class="t-b" x="321" y="40" text-anchor="middle">5</text><rect class="bx" x="296" y="50" width="50" height="44" rx="6"/><text class="t-m" x="321" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t-b" x="375" y="40" text-anchor="middle">6</text><rect class="bx" x="350" y="50" width="50" height="44" rx="6"/><text class="t-m" x="375" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t" x="26" y="146">4 = 2 + 2</text>
</svg>`],
 ['dp[5]: using the 5 coin, dp[0] + 1 = <b>1</b>. That beats dp[4] + 1 = 3.',`<svg viewBox="0 0 420 170" role="img" aria-label="dp 5 is 1">
<text class="t-s" x="26" y="20">amount</text><text class="t-s" x="26" y="112">fewest coins: dp[amount]</text>
<text class="t-b" x="51" y="40" text-anchor="middle">0</text><rect class="bx-ok" x="26" y="50" width="50" height="44" rx="6"/><text class="t-m" x="51" y="79" text-anchor="middle" style="font-size:19px">0</text>
<text class="t-b" x="105" y="40" text-anchor="middle">1</text><rect class="bx-ok" x="80" y="50" width="50" height="44" rx="6"/><text class="t-m" x="105" y="79" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-b" x="159" y="40" text-anchor="middle">2</text><rect class="bx-ok" x="134" y="50" width="50" height="44" rx="6"/><text class="t-m" x="159" y="79" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-b" x="213" y="40" text-anchor="middle">3</text><rect class="bx-ok" x="188" y="50" width="50" height="44" rx="6"/><text class="t-m" x="213" y="79" text-anchor="middle" style="font-size:19px">2</text>
<text class="t-b" x="267" y="40" text-anchor="middle">4</text><rect class="bx-ok" x="242" y="50" width="50" height="44" rx="6"/><text class="t-m" x="267" y="79" text-anchor="middle" style="font-size:19px">2</text>
<text class="t-b" x="321" y="40" text-anchor="middle">5</text><rect class="bx-hl" x="296" y="50" width="50" height="44" rx="6"/><text class="t-m" x="321" y="79" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-b" x="375" y="40" text-anchor="middle">6</text><rect class="bx" x="350" y="50" width="50" height="44" rx="6"/><text class="t-m" x="375" y="79" text-anchor="middle" style="font-size:19px">∞</text>
<text class="t" x="26" y="146">5 = one 5 coin</text>
</svg>`],
 ['dp[6]: try each coin. Coin 1: dp[5] + 1 = 2. Coin 2: dp[4] + 1 = 3. Coin 5: dp[1] + 1 = 2. The smallest is <b>2</b>: return 2 (5 + 1).',`<svg viewBox="0 0 420 170" role="img" aria-label="dp 6 is 2">
<text class="t-s" x="26" y="20">amount</text><text class="t-s" x="26" y="112">fewest coins: dp[amount]</text>
<text class="t-b" x="51" y="40" text-anchor="middle">0</text><rect class="bx-ok" x="26" y="50" width="50" height="44" rx="6"/><text class="t-m" x="51" y="79" text-anchor="middle" style="font-size:19px">0</text>
<text class="t-b" x="105" y="40" text-anchor="middle">1</text><rect class="bx-ok" x="80" y="50" width="50" height="44" rx="6"/><text class="t-m" x="105" y="79" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-b" x="159" y="40" text-anchor="middle">2</text><rect class="bx-ok" x="134" y="50" width="50" height="44" rx="6"/><text class="t-m" x="159" y="79" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-b" x="213" y="40" text-anchor="middle">3</text><rect class="bx-ok" x="188" y="50" width="50" height="44" rx="6"/><text class="t-m" x="213" y="79" text-anchor="middle" style="font-size:19px">2</text>
<text class="t-b" x="267" y="40" text-anchor="middle">4</text><rect class="bx-ok" x="242" y="50" width="50" height="44" rx="6"/><text class="t-m" x="267" y="79" text-anchor="middle" style="font-size:19px">2</text>
<text class="t-b" x="321" y="40" text-anchor="middle">5</text><rect class="bx-ok" x="296" y="50" width="50" height="44" rx="6"/><text class="t-m" x="321" y="79" text-anchor="middle" style="font-size:19px">1</text>
<text class="t-b" x="375" y="40" text-anchor="middle">6</text><rect class="bx-hl" x="350" y="50" width="50" height="44" rx="6"/><text class="t-m" x="375" y="79" text-anchor="middle" style="font-size:19px">2</text>
<text class="t" x="26" y="146">6 = 5 + 1: return 2</text>
</svg>`]])}
${V.anat([[1,'dp[0] = 0'],'\n',[2,'for (let x = 1; x &lt;= amount; x++)'],'\n  ',[3,'for (const c of coins)'],'\n    ',[4,'if (c &lt;= x) dp[x] = Math.min(dp[x], dp[x - c] + 1);']],[
 '<b>Base case.</b> Everything else starts at Infinity.',
 '<b>Fill the table</b> from small amounts to big ones.',
 '<b>Try every coin</b> as the last coin used.',
 '<b>The rule:</b> one coin plus the best way to make what is left.'])}
${V.rules(V.rh('Rules'),
 V.ok('new Array(amount + 1).fill(Infinity)','Size amount + 1, so index amount exists'),V.ok('dp[amount] === Infinity ? -1 : dp[amount]','Still Infinity means impossible'),
 V.ok('let a = 1, b = 1;','climbStairs only needs the last two answers, not a whole table'),V.no('greedy: biggest coin first','Fails for coins like [1, 3, 4] and amount 6'))}
${V.hook(`Small answers first, big answers from small ones.`)}
`)}

${V.card(4,'The live interview','think out loud in five steps',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Five interview steps: clarify, example, brute force, optimise, test">
<rect class="bx-a" x="10" y="20" width="74" height="96" rx="10"/>${V.ic('chat',29,30,36,'ic-a')}<text class="t-b" x="47" y="94" text-anchor="middle" style="font-size:14px">Clarify</text><text class="t-s" x="47" y="140" text-anchor="middle">1</text>
<rect class="bx-a" x="92" y="20" width="74" height="96" rx="10"/>${V.ic('book',111,30,36,'ic-a')}<text class="t-b" x="129" y="94" text-anchor="middle" style="font-size:14px">Example</text><text class="t-s" x="129" y="140" text-anchor="middle">2</text>
<rect class="bx-a" x="174" y="20" width="74" height="96" rx="10"/>${V.ic('gear',193,30,36,'ic-a')}<text class="t-b" x="211" y="94" text-anchor="middle" style="font-size:14px">Brute</text><text class="t-s" x="211" y="140" text-anchor="middle">3</text>
<rect class="bx-a" x="256" y="20" width="74" height="96" rx="10"/>${V.ic('bulb',275,30,36,'ic-a')}<text class="t-b" x="293" y="94" text-anchor="middle" style="font-size:14px">Optimise</text><text class="t-s" x="293" y="140" text-anchor="middle">4</text>
<rect class="bx-ok" x="338" y="20" width="74" height="96" rx="10"/>${V.ic('check',357,30,36,'ic-ok')}<text class="t-b" x="375" y="94" text-anchor="middle" style="font-size:14px">Test</text><text class="t-s" x="375" y="140" text-anchor="middle">5</text>
</svg><figcaption>Clarify the question, work an example by hand, say the brute force and its Big-O, optimise, then test edge cases.</figcaption></figure>
${V.like(`<p>A driving test. The examiner cares about your mirror checks and signals as much as reaching the end of the road. In an interview, your spoken reasoning is the mirror check.</p>`)}
${V.rules(V.rh('Do'),
 V.ok('"Can the input be empty?"','Clarify before you code'),V.ok('"Brute force is O(n²)..."','Say it, then improve it'),
 V.ok('test [], one item, duplicates','Edge cases catch most bugs'),V.no('silent typing','The interviewer cannot grade thinking they cannot hear'))}
${V.build(`<ol><li><code>lengthOfLongestSubstring</code>: a Map of last positions, a start index and a best length.</li><li><code>maxProfit</code>: lowest starts at Infinity, best at 0, one loop.</li><li><code>climbStairs</code>: two variables, both 1, then <code>[a, b] = [b, a + b]</code> up to n.</li><li><code>coinChange</code>: the dp table above.</li><li>Test each with the edge cases in the task.</li></ol>`)}
${V.hook(`Clarify, example, brute force, optimise, test.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Longest substring without repeats in "bbbbb"? <i>1.</i> 2. Prices [7, 6, 4, 3, 1]: best profit? <i>0: never buy.</i> 3. How many ways to climb 4 stairs with 1 or 2 steps? <i>5.</i></div>
`);
