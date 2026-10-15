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
 V.ok("{ ')': '(', ']': '[', '}': '{' }",'A lookup object from each closer to its opener'),V.no('stack.length === 0 skipped','"((" never fails a pop, but leftovers mean false'),
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
<h4>When data branches</h4>
<p>Arrays, stacks, queues and linked lists are all <b>linear</b>: each item has at most one item after it. Plenty of real data is not like that. A folder contains several folders, each containing more. A web page's HTML has elements inside elements. A road network connects each city to several others, sometimes in loops.</p>
<p>Data that branches like a family tree is called a <b>tree</b>. Data with any connections at all, loops included, is called a <b>graph</b>. This lesson shows how to store both and, more importantly, how to visit every part of them in an organised way. The two strategies, <b>breadth-first search</b> and <b>depth-first search</b>, solve a huge range of problems, from "what is the shortest route out of this maze?" to "can I get from Lagos to Dakar?".</p>

<h4>Tree vocabulary</h4>
<p>A tree is made of <b>nodes</b>, joined by links called <b>edges</b>. The words come from family trees, turned upside down:</p>
<ul>
<li>The <b>root</b> is the single node at the top.</li>
<li>A node's <b>children</b> are the nodes directly below it; it is their <b>parent</b>.</li>
<li>A <b>leaf</b> is a node with no children.</li>
<li>The <b>depth</b> of the tree is how many levels it has, counting the root as level 1.</li>
</ul>
<p>In a <b>binary tree</b>, each node has at most two children, called <code>left</code> and <code>right</code>. The lesson provides this class, which is the linked list's <code>ListNode</code> with two pointers instead of one:</p>
<pre class="snip">class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;      // the data
    this.left = left;    // left child, or null
    this.right = right;  // right child, or null
  }
}</pre>
<p>The provided <code>tree</code> is a <b>binary search tree</b>, or BST. It follows one extra rule at every node: everything in the left branch is smaller than the node, and everything in the right branch is bigger. Look at the root, 8: the left side holds 1, 3, 4, 6 and 7, and the right side holds 10, 13 and 14.</p>

<h4>Recursion fits trees perfectly</h4>
<p>Here is the key insight: each child of a node is the root of its own, smaller tree, called a <b>subtree</b>. So any question about a tree can be answered by asking the same question about the two subtrees, which is exactly the shape of recursion from the last lesson.</p>
<p>Take <code>maxDepth</code>. In words: an empty tree has depth 0 (the base case). Otherwise, the depth is 1 for this node, plus the depth of whichever subtree is deeper.</p>
<pre class="snip">if (!root) return 0;   // null means "no tree here"
return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));</pre>
<p>Trace it from the bottom of the lesson's tree. The leaf 4 has two empty children, so its depth is 1 + max(0, 0) = 1. Node 6 has children 4 and 7, both depth 1, so 6 has depth 2. Node 3 has children 1 (depth 1) and 6 (depth 2), so 3 has depth 3. The right side, 10 then 14 then 13, also has depth 3. The root is 1 + max(3, 3) = <b>4</b>, the answer the task expects.</p>

<h4>Two ways to visit every node</h4>
<p>Visiting every node is called <b>traversing</b> the tree. There are two families of approach:</p>
<ul>
<li><b>Breadth-first search (BFS)</b> visits level by level: the root, then all of its children, then all of their children. It spreads out like a ripple.</li>
<li><b>Depth-first search (DFS)</b> goes as deep as possible down one branch before backing up and trying the next. It is like exploring a maze by always following the left-hand wall.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="The lesson's tree numbered in breadth-first visit order">
<g class="ln"><path class="ln" d="M210 40L110 100"/><path class="ln" d="M210 40L310 100"/><path class="ln" d="M110 100L60 160"/><path class="ln" d="M110 100L160 160"/><path class="ln" d="M310 100L360 160"/><path class="ln" d="M160 160L130 220"/><path class="ln" d="M160 160L190 220"/><path class="ln" d="M360 160L330 220"/></g>
<circle class="bx" cx="210" cy="40" r="18"/><circle class="bx" cx="110" cy="100" r="18"/><circle class="bx" cx="310" cy="100" r="18"/><circle class="bx" cx="60" cy="160" r="18"/><circle class="bx" cx="160" cy="160" r="18"/><circle class="bx" cx="360" cy="160" r="18"/><circle class="bx" cx="130" cy="220" r="18"/><circle class="bx" cx="190" cy="220" r="18"/><circle class="bx" cx="330" cy="220" r="18"/>
<g text-anchor="middle" class="t-m">
<text class="t-m" x="210" y="45">8</text><text class="t-m" x="110" y="105">3</text><text class="t-m" x="310" y="105">10</text><text class="t-m" x="60" y="165">1</text><text class="t-m" x="160" y="165">6</text><text class="t-m" x="360" y="165">14</text><text class="t-m" x="130" y="225">4</text><text class="t-m" x="190" y="225">7</text><text class="t-m" x="330" y="225">13</text>
</g>
<g text-anchor="middle">
<text class="t-b t-a" x="238" y="30">1</text><text class="t-b t-a" x="82" y="90">2</text><text class="t-b t-a" x="338" y="90">3</text><text class="t-b t-a" x="32" y="150">4</text><text class="t-b t-a" x="188" y="150">5</text><text class="t-b t-a" x="388" y="150">6</text><text class="t-b t-a" x="102" y="210">7</text><text class="t-b t-a" x="218" y="210">8</text><text class="t-b t-a" x="302" y="210">9</text>
</g>
<line class="ln-d" x1="10" y1="70" x2="410" y2="70"/><line class="ln-d" x1="10" y1="130" x2="410" y2="130"/><line class="ln-d" x1="10" y1="190" x2="410" y2="190"/>
</svg><figcaption>Breadth-first order, shown by the orange numbers. BFS visits the root 8 first, then the whole second level, 3 and 10, then the third level, 1, 6 and 14, and finally the bottom level, 4, 7 and 13. The dashed lines separate the levels.</figcaption></figure>
<p>BFS gets its order from a <b>queue</b>. Put the root in the queue. Then, repeatedly, take the node at the front, visit it, and add its children to the back. Because children always join behind everything already waiting, a whole level is finished before the next one starts.</p>
<p>DFS gets its order from a <b>stack</b>, and usually that stack is simply the call stack: you write it with recursion. There are three common DFS orders, depending on when you visit the node itself compared with its subtrees. The one this lesson asks for is <b>in-order</b>: visit the left subtree, then the node, then the right subtree.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="The same tree numbered in depth-first in-order visit order">
<g class="ln"><path class="ln" d="M210 40L110 100"/><path class="ln" d="M210 40L310 100"/><path class="ln" d="M110 100L60 160"/><path class="ln" d="M110 100L160 160"/><path class="ln" d="M310 100L360 160"/><path class="ln" d="M160 160L130 220"/><path class="ln" d="M160 160L190 220"/><path class="ln" d="M360 160L330 220"/></g>
<circle class="bx" cx="210" cy="40" r="18"/><circle class="bx" cx="110" cy="100" r="18"/><circle class="bx" cx="310" cy="100" r="18"/><circle class="bx" cx="60" cy="160" r="18"/><circle class="bx" cx="160" cy="160" r="18"/><circle class="bx" cx="360" cy="160" r="18"/><circle class="bx" cx="130" cy="220" r="18"/><circle class="bx" cx="190" cy="220" r="18"/><circle class="bx" cx="330" cy="220" r="18"/>
<g text-anchor="middle" class="t-m">
<text class="t-m" x="210" y="45">8</text><text class="t-m" x="110" y="105">3</text><text class="t-m" x="310" y="105">10</text><text class="t-m" x="60" y="165">1</text><text class="t-m" x="160" y="165">6</text><text class="t-m" x="360" y="165">14</text><text class="t-m" x="130" y="225">4</text><text class="t-m" x="190" y="225">7</text><text class="t-m" x="330" y="225">13</text>
</g>
<g text-anchor="middle">
<text class="t-b t-ok" x="238" y="30">6</text><text class="t-b t-ok" x="82" y="90">2</text><text class="t-b t-ok" x="338" y="90">7</text><text class="t-b t-ok" x="32" y="150">1</text><text class="t-b t-ok" x="188" y="150">4</text><text class="t-b t-ok" x="388" y="150">9</text><text class="t-b t-ok" x="102" y="210">3</text><text class="t-b t-ok" x="218" y="210">5</text><text class="t-b t-ok" x="302" y="210">8</text>
</g>
</svg><figcaption>Depth-first in-order, shown by the green numbers. DFS dives down the left side first and visits 1, then 3, then goes down into 6's branch for 4, 6 and 7, and only then visits the root 8. The right side follows: 10, 13, 14. Read in this order, the values come out sorted.</figcaption></figure>
<p>That is why in-order matters for a BST. Everything smaller than a node is in its left subtree, and in-order visits the left subtree first, then the node, then the bigger values on the right. So the output is <code>[1, 3, 4, 6, 7, 8, 10, 13, 14]</code>, sorted, without any sorting. In code: if the node is null, return; otherwise recurse left, push the node's value into an output array, then recurse right. Pass the same output array into every call so they all add to one list.</p>

<h4>BFS for the shortest path in a grid</h4>
<p>A grid is a graph in disguise: each open cell is a node, connected to the open cells above, below, left and right. The lesson's <code>GRID</code> uses 0 for open and 1 for a wall, and positions are written <code>[row, column]</code>, counting from 0.</p>
<p>Why BFS for shortest paths? Because it explores in rings of distance. Every cell 1 step away is reached before any cell 2 steps away, and so on. So the first time BFS reaches the target, it has found it by the shortest route. DFS gives no such promise: it might wander a long way round first.</p>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="The four by four grid with walls and the BFS distance from the top left corner written in each open cell">
<g text-anchor="middle" class="t-s"><text class="t-s" x="132" y="14">0</text><text class="t-s" x="176" y="14">1</text><text class="t-s" x="220" y="14">2</text><text class="t-s" x="264" y="14">3</text><text class="t-s" x="96" y="47">0</text><text class="t-s" x="96" y="91">1</text><text class="t-s" x="96" y="135">2</text><text class="t-s" x="96" y="179">3</text></g>
<rect class="bx-info" x="110" y="20" width="44" height="44"/><rect class="bx" x="154" y="20" width="44" height="44"/><rect class="bx" x="198" y="20" width="44" height="44"/><rect class="bx-bad" x="242" y="20" width="44" height="44"/>
<rect class="bx-bad" x="110" y="64" width="44" height="44"/><rect class="bx-bad" x="154" y="64" width="44" height="44"/><rect class="bx" x="198" y="64" width="44" height="44"/><rect class="bx-bad" x="242" y="64" width="44" height="44"/>
<rect class="bx" x="110" y="108" width="44" height="44"/><rect class="bx" x="154" y="108" width="44" height="44"/><rect class="bx" x="198" y="108" width="44" height="44"/><rect class="bx" x="242" y="108" width="44" height="44"/>
<rect class="bx" x="110" y="152" width="44" height="44"/><rect class="bx-bad" x="154" y="152" width="44" height="44"/><rect class="bx-bad" x="198" y="152" width="44" height="44"/><rect class="bx-ok" x="242" y="152" width="44" height="44"/>
<g text-anchor="middle">
<text class="t-b" x="132" y="47">0</text><text class="t-m" x="176" y="47">1</text><text class="t-m" x="220" y="47">2</text>
<text class="t-m" x="220" y="91">3</text>
<text class="t-m" x="132" y="135">6</text><text class="t-m" x="176" y="135">5</text><text class="t-m" x="220" y="135">4</text><text class="t-m" x="264" y="135">5</text>
<text class="t-m" x="132" y="179">7</text><text class="t-b" x="264" y="179">6</text>
</g>
<rect class="bx-info" x="310" y="40" width="16" height="16"/><text class="t-s" x="334" y="53">start</text>
<rect class="bx-ok" x="310" y="70" width="16" height="16"/><text class="t-s" x="334" y="83">target</text>
<rect class="bx-bad" x="310" y="100" width="16" height="16"/><text class="t-s" x="334" y="113">wall</text>
</svg><figcaption>The lesson's grid, with walls shown in red. Each open cell holds its distance from the start in the top-left corner, in the order BFS discovers them. The route must squeeze through the single gap at row 1, column 2, and the target in the bottom-right corner is reached in 6 steps.</figcaption></figure>
<p>The algorithm:</p>
<ol>
<li>Put the start in a queue as <code>[row, col, steps]</code> with 0 steps, and add it to a <code>seen</code> set.</li>
<li>Take the front entry. If it is the target, return its steps.</li>
<li>Otherwise look at its four neighbours. Keep a neighbour only if it is inside the grid, is open (0), and is not in <code>seen</code>. Mark it seen and add it to the queue with steps + 1.</li>
<li>If the queue runs empty, the target cannot be reached: return -1.</li>
</ol>
<p>A Set cannot compare arrays by their contents, so store each position as a string such as <code>'2,3'</code>. Mark a cell as seen when you <i>add</i> it to the queue, not when you take it out, or the same cell can be queued many times. The lesson's solution uses <code>queue.shift()</code>, which is fine for a 16-cell grid; for big grids, use the head-index queue from the stacks and queues lesson.</p>
<div class="mistake"><b>Common mistake</b>Checking <code>grid[nr][nc]</code> before checking the bounds. If <code>nr</code> is -1, <code>grid[-1]</code> is <code>undefined</code>, and reading <code>[nc]</code> from it throws <code>TypeError: Cannot read properties of undefined</code>. Test <code>nr &gt;= 0 &amp;&amp; nr &lt; rows</code> and the same for columns first; <code>&amp;&amp;</code> stops at the first false, so the grid is never read out of range.</div>

<h4>DFS on a graph: is there a route?</h4>
<p>The lesson's <code>ROUTES</code> is stored as an <b>adjacency list</b>: an object where each city's key holds an array of the cities you can travel to directly. The routes are one-way, so this is a <b>directed</b> graph.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="One way routes between West African cities, and a separate pair of East African cities">
<rect class="bx-a" x="10" y="30" width="80" height="36" rx="8"/><rect class="bx" x="115" y="30" width="80" height="36" rx="8"/><rect class="bx" x="220" y="30" width="80" height="36" rx="8"/><rect class="bx-ok" x="325" y="30" width="80" height="36" rx="8"/>
<rect class="bx" x="10" y="100" width="80" height="36" rx="8"/>
<rect class="bx" x="220" y="150" width="80" height="36" rx="8"/><rect class="bx" x="325" y="150" width="80" height="36" rx="8"/>
<g text-anchor="middle"><text class="t" x="50" y="53">Lagos</text><text class="t" x="155" y="53">Accra</text><text class="t" x="260" y="53">Abidjan</text><text class="t" x="365" y="53">Dakar</text><text class="t" x="50" y="123">Abuja</text><text class="t" x="260" y="173">Nairobi</text><text class="t" x="365" y="173">Kampala</text></g>
<path class="ln-a" d="M90 48h17"/><polygon class="ah-a" points="105,42 105,54 113,48"/>
<path class="ln-a" d="M195 48h17"/><polygon class="ah-a" points="210,42 210,54 218,48"/>
<path class="ln-a" d="M300 48h17"/><polygon class="ah-a" points="315,42 315,54 323,48"/>
<path class="ln" d="M50 66v26"/><polygon class="ah" points="44,90 56,90 50,98"/>
<path class="ln" d="M300 168h17"/><polygon class="ah" points="315,162 315,174 323,168"/>
</svg><figcaption>The routes as a picture. From Lagos you can fly to Accra or Abuja. The highlighted chain, Lagos to Accra to Abidjan to Dakar, is the route DFS finds. Nairobi and Kampala are connected to each other but to nothing else, so no route from Lagos ever reaches them.</figcaption></figure>
<p>DFS with recursion, in words: if you are already at the destination, return true. Otherwise mark the current city as visited, and for each neighbour you have not visited yet, ask the same question from there. If any of those calls returns true, so do you. If none do, return false.</p>
<p>Tracing Lagos to Dakar: Lagos is not Dakar, so try its first neighbour, Accra. Accra tries Abidjan. Abidjan tries Dakar, which is the destination, so true travels all the way back up. From Lagos to Nairobi, DFS tries everything reachable (Accra, Abidjan, Dakar, Abuja), runs out of neighbours, and returns false.</p>
<p>The <b>visited set</b> matters because real graphs have loops. If A leads to B and B leads back to A, a search without memory goes round forever and crashes with a stack overflow. Pass the same set into every recursive call so they share one memory.</p>
<div class="mistake"><b>Common mistake</b>Using a city lookup like <code>graph[from]</code> without a fallback. If a city has no entry at all, that is <code>undefined</code>, and looping over it throws an error. Writing <code>graph[from] || []</code> treats a missing city as one with no routes.</div>

<div class="try"><b>Try it in your head</b>Which uses a queue, BFS or DFS? BFS. Using the grid picture, how many steps from the start to row 0, column 2? Two, the answer the second grid test expects. And what does in-order print for a tree with root 5, left child 2 and right child 9? 2, 5, 9.</div>

<h4>Recap</h4>
<ul>
<li>A tree is a root with children and no loops; a graph allows any connections. Each subtree is a smaller tree, so recursion fits naturally.</li>
<li>Depth is 1 + the deeper subtree, with 0 for an empty tree.</li>
<li>In-order DFS (left, node, right) on a binary search tree gives the values sorted.</li>
<li>BFS uses a queue and explores level by level, so it finds shortest paths in unweighted grids and graphs.</li>
<li>DFS uses recursion or a stack and answers "can I get there?". Always keep a visited set.</li>
</ul>
`);

explain('a5',`
<h4>Why sorted data is so powerful</h4>
<p>Finding a word in a dictionary does not mean reading from "aardvark" onwards. You open it near the middle, see that your word comes later, and ignore the whole first half. A few flips later you are there. That only works because the dictionary is <b>sorted</b>.</p>
<p>This lesson covers that trick, called <b>binary search</b>, then one of the classic ways to sort data in the first place, <b>merge sort</b>. Both rely on an idea you will use for the rest of this track: <b>recursion</b>, where a function solves a problem by solving smaller copies of the same problem. Finally, you will see how remembering answers, called <b>memoisation</b>, can turn a function that would run for days into one that finishes instantly.</p>

<h4>Binary search: halve the problem each step</h4>
<p>Searching an unsorted array means checking every item: O(n). In a sorted array you can do far better. Keep two markers, <code>lo</code> and <code>hi</code>, for the lowest and highest index the target could still be at. Then repeat:</p>
<ol>
<li>Look at the middle item, at index <code>mid</code>, halfway between lo and hi.</li>
<li>If it is the target, return <code>mid</code>.</li>
<li>If it is smaller than the target, the target must be to the right, so move <code>lo</code> to <code>mid + 1</code>.</li>
<li>If it is bigger, the target must be to the left, so move <code>hi</code> to <code>mid - 1</code>.</li>
<li>If <code>lo</code> passes <code>hi</code>, there is nothing left to search: return -1.</li>
</ol>
<figure class="fig"><svg viewBox="0 0 420 222" role="img" aria-label="Binary search for 38 in eight sorted numbers, halving the range at each step">
<g text-anchor="middle" class="t-s"><text class="t-s" x="100" y="26">0</text><text class="t-s" x="140" y="26">1</text><text class="t-s" x="180" y="26">2</text><text class="t-s" x="220" y="26">3</text><text class="t-s" x="260" y="26">4</text><text class="t-s" x="300" y="26">5</text><text class="t-s" x="340" y="26">6</text><text class="t-s" x="380" y="26">7</text></g>
<rect class="bx-info" x="80" y="36" width="40" height="34"/><rect class="bx-info" x="120" y="36" width="40" height="34"/><rect class="bx-info" x="160" y="36" width="40" height="34"/><rect class="bx-a" x="200" y="36" width="40" height="34"/><rect class="bx-info" x="240" y="36" width="40" height="34"/><rect class="bx-info" x="280" y="36" width="40" height="34"/><rect class="bx-info" x="320" y="36" width="40" height="34"/><rect class="bx-info" x="360" y="36" width="40" height="34"/>
<rect class="bx" x="80" y="98" width="40" height="34"/><rect class="bx" x="120" y="98" width="40" height="34"/><rect class="bx" x="160" y="98" width="40" height="34"/><rect class="bx" x="200" y="98" width="40" height="34"/><rect class="bx-info" x="240" y="98" width="40" height="34"/><rect class="bx-a" x="280" y="98" width="40" height="34"/><rect class="bx-info" x="320" y="98" width="40" height="34"/><rect class="bx-info" x="360" y="98" width="40" height="34"/>
<rect class="bx" x="80" y="160" width="40" height="34"/><rect class="bx" x="120" y="160" width="40" height="34"/><rect class="bx" x="160" y="160" width="40" height="34"/><rect class="bx" x="200" y="160" width="40" height="34"/><rect class="bx" x="240" y="160" width="40" height="34"/><rect class="bx" x="280" y="160" width="40" height="34"/><rect class="bx-ok" x="320" y="160" width="40" height="34"/><rect class="bx-info" x="360" y="160" width="40" height="34"/>
<g text-anchor="middle">
<text class="t-m" x="100" y="59">2</text><text class="t-m" x="140" y="59">5</text><text class="t-m" x="180" y="59">8</text><text class="t-m" x="220" y="59">12</text><text class="t-m" x="260" y="59">16</text><text class="t-m" x="300" y="59">23</text><text class="t-m" x="340" y="59">38</text><text class="t-m" x="380" y="59">56</text>
<text class="t-s" x="100" y="121">2</text><text class="t-s" x="140" y="121">5</text><text class="t-s" x="180" y="121">8</text><text class="t-s" x="220" y="121">12</text><text class="t-m" x="260" y="121">16</text><text class="t-m" x="300" y="121">23</text><text class="t-m" x="340" y="121">38</text><text class="t-m" x="380" y="121">56</text>
<text class="t-s" x="100" y="183">2</text><text class="t-s" x="140" y="183">5</text><text class="t-s" x="180" y="183">8</text><text class="t-s" x="220" y="183">12</text><text class="t-s" x="260" y="183">16</text><text class="t-s" x="300" y="183">23</text><text class="t-m" x="340" y="183">38</text><text class="t-m" x="380" y="183">56</text>
<text class="t-s" x="100" y="86">lo</text><text class="t-s t-a" x="220" y="86">mid</text><text class="t-s" x="380" y="86">hi</text>
<text class="t-s" x="260" y="148">lo</text><text class="t-s t-a" x="300" y="148">mid</text><text class="t-s" x="380" y="148">hi</text>
<text class="t-s t-ok" x="340" y="210">lo, mid</text><text class="t-s" x="384" y="210">hi</text>
</g>
<text class="t-s" x="8" y="50">step 1</text><text class="t-s" x="8" y="68">12 &lt; 38</text>
<text class="t-s" x="8" y="112">step 2</text><text class="t-s" x="8" y="130">23 &lt; 38</text>
<text class="t-s" x="8" y="174">step 3</text><text class="t-s t-ok" x="8" y="192">found</text>
</svg><figcaption>Searching for 38 in eight sorted numbers. Step 1 looks at the middle, 12. That is smaller than 38, so the whole left half is greyed out. Step 2 looks at 23, also smaller, so another chunk goes. Step 3 lands on 38 at index 6. Three looks instead of up to eight.</figcaption></figure>
<p>Each step throws away half of what is left, which is why binary search is O(log n). A million items need about 20 steps; a billion need about 30. The middle index is written <code>mid = (lo + hi) &gt;&gt; 1</code> in the lesson. The <code>&gt;&gt; 1</code> shifts the number's bits one place right, which for positive whole numbers is the same as dividing by 2 and rounding down: <code>Math.floor((lo + hi) / 2)</code> works just as well.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>while (lo &lt; hi)</code> instead of <code>while (lo &lt;= hi)</code>, or <code>lo = mid</code> instead of <code>lo = mid + 1</code>. The first skips the last remaining item, so searching for 9 in <code>[1, 3, 5, 7, 9]</code> fails. The second can leave lo and hi stuck forever, and your page freezes. Since you have already checked <code>mid</code>, always step past it.</div>

<h4>Recursion: a function that calls itself</h4>
<p>Before merge sort, you need recursion. A <b>recursive</b> function solves a problem by calling itself on a smaller version of the same problem. Every recursive function has two parts:</p>
<ul>
<li>A <b>base case</b>: an input so small the answer is obvious, returned directly without calling itself.</li>
<li>A <b>recursive case</b>: break the problem into a smaller piece, call yourself on it, and use the answer.</li>
</ul>
<p>The classic tiny example is the factorial: 3 factorial is 3 × 2 × 1 = 6.</p>
<pre class="snip">function factorial(n) {
  if (n === 0) return 1;           // base case
  return n * factorial(n - 1);     // smaller copy of the problem
}</pre>
<p>How does the computer keep track? Every time a function is called, JavaScript adds a <b>frame</b> to the <b>call stack</b>: a note holding that call's variables and where it was up to. A frame stays on the stack until its call returns. It is a stack in exactly the sense of the last lesson: the newest call finishes first.</p>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="The call stack for factorial of 3, with calls piling up and answers flowing back down">
<rect class="bx-ok" x="60" y="20" width="200" height="36" rx="4"/><rect class="bx" x="60" y="60" width="200" height="36" rx="4"/><rect class="bx" x="60" y="100" width="200" height="36" rx="4"/><rect class="bx" x="60" y="140" width="200" height="36" rx="4"/>
<g text-anchor="middle"><text class="t-m" x="160" y="43">factorial(0)</text><text class="t-m" x="160" y="83">factorial(1)</text><text class="t-m" x="160" y="123">factorial(2)</text><text class="t-m" x="160" y="163">factorial(3)</text></g>
<text class="t-s t-ok" x="275" y="43">base case: 1</text><text class="t-s" x="275" y="83">1 × 1 = 1</text><text class="t-s" x="275" y="123">2 × 1 = 2</text><text class="t-b t-ok" x="275" y="163">3 × 2 = 6</text>
<path class="ln-a" d="M34 170V30"/><polygon class="ah-a" points="28,32 40,32 34,22"/><text class="t-s t-a" x="34" y="196" text-anchor="middle">calls</text>
<path class="ln-ok" d="M398 30v140"/><polygon class="ah-ok" points="392,168 404,168 398,178"/><text class="t-s t-ok" x="392" y="200" text-anchor="middle">returns</text>
</svg><figcaption>Calling factorial of 3 piles frames up the call stack: 3 waits for 2, which waits for 1, which waits for 0. Factorial of 0 is the base case and returns 1 straight away. Then the answers flow back down: 1 times 1 is 1, 2 times 1 is 2, and 3 times 2 is 6.</figcaption></figure>
<p>Without a base case the calls never stop. Each one adds a frame, the stack fills up, and JavaScript gives up with <code>RangeError: Maximum call stack size exceeded</code>. When you see that error, check that your base case exists and that every call really moves towards it.</p>

<h4>Merge sort: split, sort the halves, merge</h4>
<p>Merge sort uses recursion beautifully. The idea is that sorting is hard, but <b>merging two lists that are already sorted</b> is easy. To merge, compare the front items of both lists, take the smaller one, and repeat. Each comparison places one item, so merging is O(n).</p>
<p>So the whole algorithm is:</p>
<ol>
<li><b>Base case:</b> an array with 0 or 1 items is already sorted. Return a copy of it.</li>
<li><b>Split</b> the array into a left half and a right half.</li>
<li><b>Sort each half</b> by calling merge sort on it. Recursion!</li>
<li><b>Merge</b> the two sorted halves and return the result.</li>
</ol>
<figure class="fig"><svg viewBox="0 0 420 235" role="img" aria-label="Merge sort splitting 5 2 4 1 into single items and merging them back in order">
<text class="t-s" x="4" y="38">start</text><text class="t-s" x="4" y="82">split</text><text class="t-s" x="4" y="126">split</text><text class="t-s" x="4" y="170">merge</text><text class="t-s" x="4" y="214">merge</text>
<g class="ln"><path class="ln" d="M210 48L110 64"/><path class="ln" d="M210 48L310 64"/><path class="ln" d="M110 92L75 108"/><path class="ln" d="M110 92L145 108"/><path class="ln" d="M310 92L275 108"/><path class="ln" d="M310 92L345 108"/><path class="ln-ok" d="M75 136L110 152"/><path class="ln-ok" d="M145 136L110 152"/><path class="ln-ok" d="M275 136L310 152"/><path class="ln-ok" d="M345 136L310 152"/><path class="ln-ok" d="M110 180L210 196"/><path class="ln-ok" d="M310 180L210 196"/></g>
<rect class="bx" x="150" y="20" width="30" height="28"/><rect class="bx" x="180" y="20" width="30" height="28"/><rect class="bx" x="210" y="20" width="30" height="28"/><rect class="bx" x="240" y="20" width="30" height="28"/>
<rect class="bx" x="80" y="64" width="30" height="28"/><rect class="bx" x="110" y="64" width="30" height="28"/><rect class="bx" x="280" y="64" width="30" height="28"/><rect class="bx" x="310" y="64" width="30" height="28"/>
<rect class="bx-info" x="60" y="108" width="30" height="28"/><rect class="bx-info" x="130" y="108" width="30" height="28"/><rect class="bx-info" x="260" y="108" width="30" height="28"/><rect class="bx-info" x="330" y="108" width="30" height="28"/>
<rect class="bx-ok" x="80" y="152" width="30" height="28"/><rect class="bx-ok" x="110" y="152" width="30" height="28"/><rect class="bx-ok" x="280" y="152" width="30" height="28"/><rect class="bx-ok" x="310" y="152" width="30" height="28"/>
<rect class="bx-ok" x="150" y="196" width="30" height="28"/><rect class="bx-ok" x="180" y="196" width="30" height="28"/><rect class="bx-ok" x="210" y="196" width="30" height="28"/><rect class="bx-ok" x="240" y="196" width="30" height="28"/>
<g text-anchor="middle" class="t-m">
<text class="t-m" x="165" y="39">5</text><text class="t-m" x="195" y="39">2</text><text class="t-m" x="225" y="39">4</text><text class="t-m" x="255" y="39">1</text>
<text class="t-m" x="95" y="83">5</text><text class="t-m" x="125" y="83">2</text><text class="t-m" x="295" y="83">4</text><text class="t-m" x="325" y="83">1</text>
<text class="t-m" x="75" y="127">5</text><text class="t-m" x="145" y="127">2</text><text class="t-m" x="275" y="127">4</text><text class="t-m" x="345" y="127">1</text>
<text class="t-m" x="95" y="171">2</text><text class="t-m" x="125" y="171">5</text><text class="t-m" x="295" y="171">1</text><text class="t-m" x="325" y="171">4</text>
<text class="t-m" x="165" y="215">1</text><text class="t-m" x="195" y="215">2</text><text class="t-m" x="225" y="215">4</text><text class="t-m" x="255" y="215">5</text>
</g>
</svg><figcaption>Merge sort on 5, 2, 4, 1. The array is split in half, then in half again, until every piece is a single item, which is already sorted. Then pairs are merged in order: 5 and 2 become 2, 5, and 4 and 1 become 1, 4. A final merge of 2, 5 with 1, 4 gives 1, 2, 4, 5.</figcaption></figure>
<p>Let's trace that final merge. The fronts are 2 and 1: take 1. Now 2 against 4: take 2. Then 5 against 4: take 4. The right list is empty, so copy what is left of the left list, 5. Result: <code>[1, 2, 4, 5]</code>. In code, two index variables <code>i</code> and <code>j</code> track the front of each half, and <code>left.slice(i)</code> and <code>right.slice(j)</code> pick up whatever remains. <code>slice</code> returns a new array without changing the old one, which matters because the task checks that you do not modify the input.</p>
<p>Why O(n log n)? Halving n items down to single items takes about log n levels, and at each level, all the merges together touch every item once, which is n work. So n work, log n times.</p>

<h4>Memoisation: never solve the same problem twice</h4>
<p>The Fibonacci numbers start 0, 1, and each next number is the sum of the two before: 0, 1, 1, 2, 3, 5, 8, 13. The starter <code>fib</code> follows that definition literally: <code>fib(n - 1) + fib(n - 2)</code>. It is correct, and it is a disaster.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="The call tree for fib of 4, where fib of 2 is computed twice">
<g class="ln"><path class="ln" d="M210 50L120 80"/><path class="ln" d="M210 50L300 80"/><path class="ln" d="M120 110L70 140"/><path class="ln" d="M120 110L170 140"/><path class="ln" d="M300 110L250 140"/><path class="ln" d="M300 110L350 140"/><path class="ln" d="M70 170L35 200"/><path class="ln" d="M70 170L105 200"/></g>
<rect class="bx-a" x="179" y="20" width="62" height="30" rx="6"/>
<rect class="bx" x="89" y="80" width="62" height="30" rx="6"/><rect class="bx-warn" x="269" y="80" width="62" height="30" rx="6"/>
<rect class="bx-warn" x="39" y="140" width="62" height="30" rx="6"/><rect class="bx" x="139" y="140" width="62" height="30" rx="6"/><rect class="bx" x="219" y="140" width="62" height="30" rx="6"/><rect class="bx" x="319" y="140" width="62" height="30" rx="6"/>
<rect class="bx" x="4" y="200" width="62" height="30" rx="6"/><rect class="bx" x="74" y="200" width="62" height="30" rx="6"/>
<g text-anchor="middle" class="t-m">
<text class="t-m" x="210" y="41">fib(4)</text><text class="t-m" x="120" y="101">fib(3)</text><text class="t-m" x="300" y="101">fib(2)</text>
<text class="t-m" x="70" y="161">fib(2)</text><text class="t-m" x="170" y="161">fib(1)</text><text class="t-m" x="250" y="161">fib(1)</text><text class="t-m" x="350" y="161">fib(0)</text>
<text class="t-m" x="35" y="221">fib(1)</text><text class="t-m" x="105" y="221">fib(0)</text>
</g>
<text class="t-s t-warn" x="300" y="215" text-anchor="middle">fib(2) worked out twice</text>
</svg><figcaption>Every call to fib makes two more calls. Even for fib of 4, the whole fib of 2 branch is computed twice, highlighted in amber. For bigger numbers the repeats multiply: the tree roughly doubles with each step up, so fib of 70 would make hundreds of trillions of calls.</figcaption></figure>
<p>That doubling makes naive Fibonacci exponential, roughly O(2ⁿ). fib(70) would keep a computer busy for days. Yet there are only 71 different questions it ever asks: fib(0) up to fib(70). The waste is asking them again and again.</p>
<p><b>Memoisation</b> means caching each answer the first time you compute it, and returning the cached answer every time after that. A Map is perfect for this: the key is <code>n</code>, the value is <code>fib(n)</code>.</p>
<pre class="snip">const memo = new Map();              // outside the function, so it lasts
function fib(n) {
  if (n &lt; 2) return n;               // base cases: fib(0)=0, fib(1)=1
  if (memo.has(n)) return memo.get(n); // seen it? instant answer
  const value = fib(n - 1) + fib(n - 2);
  memo.set(n, value);                 // remember before returning
  return value;
}</pre>
<p>Now each fib(k) is computed once, so fib(70) takes about 70 real steps: O(n). fib(70) is 190,392,490,709,135, which is still small enough for a JavaScript number to hold exactly. This "solve each smaller problem once and remember it" idea is the heart of <b>dynamic programming</b>, which the final lesson of this track builds on.</p>
<div class="mistake"><b>Common mistake</b>Creating the memo inside the function, as <code>const memo = new Map()</code> on its first line. Then every call gets its own brand-new, empty map, nothing is ever shared, and it is as slow as before. The cache has to live outside the function, or be passed into each call.</div>

<div class="try"><b>Try it in your head</b>Binary search for 4 in <code>[1, 3, 5]</code>. lo = 0, hi = 2, mid = 1: 3 is smaller than 4, so lo = 2. Now mid = 2: 5 is bigger, so hi = 1. lo (2) has passed hi (1), so return -1. And how many halving steps does binary search need for 1,000 items? About 10.</div>

<h4>Recap</h4>
<ul>
<li>Binary search needs sorted data. Check the middle, discard half, repeat: O(log n). Loop while <code>lo &lt;= hi</code> and step past <code>mid</code>.</li>
<li>A recursive function needs a base case and must move towards it, or the call stack overflows.</li>
<li>Merge sort splits until pieces have one item, then merges sorted halves: O(n log n).</li>
<li>Naive recursive Fibonacci repeats work exponentially. Memoising with a Map makes it O(n).</li>
<li>Memoisation, "remember answers to smaller problems", is the core idea of dynamic programming.</li>
</ul>
`);

explain('a6',`
<h4>Patterns, not memorised answers</h4>
<p>Coding interviews draw on thousands of questions, and nobody memorises them all. The good news is that most of them are built from a small number of <b>patterns</b>: reusable ideas you can recognise from the wording of the question. Spot the pattern and you already know the shape of the answer.</p>
<p>This lesson covers three of the most common ones. The <b>sliding window</b> scans a string or array with a moving frame. <b>One pass with running state</b> remembers one useful fact, like the cheapest price so far, as it goes. <b>Dynamic programming</b> builds the answer to a big problem out of answers to smaller ones, which you started in the last two lessons with memoised Fibonacci. Finally, you will see how to work through a problem out loud in a live interview.</p>

<h4>The sliding window</h4>
<p>The first task: find the length of the longest <b>substring</b> without a repeated character. A substring is an unbroken run of characters, so in <code>"pwwkew"</code>, <code>"wke"</code> is a substring but <code>"pwke"</code> is not, because it skips a letter.</p>
<p>Brute force would check every possible substring, and there are about n² of them, each needing its own check. The sliding window does it in one pass. Picture a frame over the string with a left edge, <code>start</code>, and a right edge, <code>i</code>:</p>
<ul>
<li>Each step, move the right edge one character further, growing the window.</li>
<li>If the new character is already inside the window, the rule is broken. Move the left edge to just past the earlier copy of that character, shrinking the window until it is valid again.</li>
<li>After each step, the window is valid, so compare its length, <code>i - start + 1</code>, with the best so far.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="A window sliding over the string pwwkew, step by step">
<g text-anchor="middle"><text class="t-s" x="40" y="22">i</text><text class="t-s" x="345" y="22">length</text><text class="t-s" x="395" y="22">best</text></g>
<g text-anchor="middle" class="t-s"><text class="t-s" x="40" y="54">0</text><text class="t-s" x="40" y="88">1</text><text class="t-s" x="40" y="122">2</text><text class="t-s" x="40" y="156">3</text><text class="t-s" x="40" y="190">4</text><text class="t-s" x="40" y="224">5</text></g>
<rect class="bx-info" x="80" y="32" width="36" height="30"/><rect class="bx" x="116" y="32" width="36" height="30"/><rect class="bx" x="152" y="32" width="36" height="30"/><rect class="bx" x="188" y="32" width="36" height="30"/><rect class="bx" x="224" y="32" width="36" height="30"/><rect class="bx" x="260" y="32" width="36" height="30"/>
<rect class="bx-info" x="80" y="66" width="36" height="30"/><rect class="bx-info" x="116" y="66" width="36" height="30"/><rect class="bx" x="152" y="66" width="36" height="30"/><rect class="bx" x="188" y="66" width="36" height="30"/><rect class="bx" x="224" y="66" width="36" height="30"/><rect class="bx" x="260" y="66" width="36" height="30"/>
<rect class="bx" x="80" y="100" width="36" height="30"/><rect class="bx" x="116" y="100" width="36" height="30"/><rect class="bx-warn" x="152" y="100" width="36" height="30"/><rect class="bx" x="188" y="100" width="36" height="30"/><rect class="bx" x="224" y="100" width="36" height="30"/><rect class="bx" x="260" y="100" width="36" height="30"/>
<rect class="bx" x="80" y="134" width="36" height="30"/><rect class="bx" x="116" y="134" width="36" height="30"/><rect class="bx-info" x="152" y="134" width="36" height="30"/><rect class="bx-info" x="188" y="134" width="36" height="30"/><rect class="bx" x="224" y="134" width="36" height="30"/><rect class="bx" x="260" y="134" width="36" height="30"/>
<rect class="bx" x="80" y="168" width="36" height="30"/><rect class="bx" x="116" y="168" width="36" height="30"/><rect class="bx-ok" x="152" y="168" width="36" height="30"/><rect class="bx-ok" x="188" y="168" width="36" height="30"/><rect class="bx-ok" x="224" y="168" width="36" height="30"/><rect class="bx" x="260" y="168" width="36" height="30"/>
<rect class="bx" x="80" y="202" width="36" height="30"/><rect class="bx" x="116" y="202" width="36" height="30"/><rect class="bx" x="152" y="202" width="36" height="30"/><rect class="bx-info" x="188" y="202" width="36" height="30"/><rect class="bx-info" x="224" y="202" width="36" height="30"/><rect class="bx-warn" x="260" y="202" width="36" height="30"/>
<g text-anchor="middle" class="t-m">
<text class="t-m" x="98" y="53">p</text><text class="t-m" x="134" y="53">w</text><text class="t-m" x="170" y="53">w</text><text class="t-m" x="206" y="53">k</text><text class="t-m" x="242" y="53">e</text><text class="t-m" x="278" y="53">w</text>
<text class="t-m" x="98" y="87">p</text><text class="t-m" x="134" y="87">w</text><text class="t-m" x="170" y="87">w</text><text class="t-m" x="206" y="87">k</text><text class="t-m" x="242" y="87">e</text><text class="t-m" x="278" y="87">w</text>
<text class="t-m" x="98" y="121">p</text><text class="t-m" x="134" y="121">w</text><text class="t-m" x="170" y="121">w</text><text class="t-m" x="206" y="121">k</text><text class="t-m" x="242" y="121">e</text><text class="t-m" x="278" y="121">w</text>
<text class="t-m" x="98" y="155">p</text><text class="t-m" x="134" y="155">w</text><text class="t-m" x="170" y="155">w</text><text class="t-m" x="206" y="155">k</text><text class="t-m" x="242" y="155">e</text><text class="t-m" x="278" y="155">w</text>
<text class="t-m" x="98" y="189">p</text><text class="t-m" x="134" y="189">w</text><text class="t-m" x="170" y="189">w</text><text class="t-m" x="206" y="189">k</text><text class="t-m" x="242" y="189">e</text><text class="t-m" x="278" y="189">w</text>
<text class="t-m" x="98" y="223">p</text><text class="t-m" x="134" y="223">w</text><text class="t-m" x="170" y="223">w</text><text class="t-m" x="206" y="223">k</text><text class="t-m" x="242" y="223">e</text><text class="t-m" x="278" y="223">w</text>
<text class="t-m" x="345" y="53">1</text><text class="t-m" x="345" y="87">2</text><text class="t-m" x="345" y="121">1</text><text class="t-m" x="345" y="155">2</text><text class="t-m" x="345" y="189">3</text><text class="t-m" x="345" y="223">3</text>
<text class="t-m" x="395" y="53">1</text><text class="t-m" x="395" y="87">2</text><text class="t-m" x="395" y="121">2</text><text class="t-m" x="395" y="155">2</text><text class="t-b t-ok" x="395" y="189">3</text><text class="t-b t-ok" x="395" y="223">3</text>
</g>
</svg><figcaption>The window sliding over "pwwkew". The shaded boxes are the window after each step. At i equals 2 the second w repeats, so the left edge jumps past the first w and the window shrinks to just "w". It then grows to "wke", length 3. At i equals 5 another w repeats, so the window becomes "kew", still length 3. The best is 3.</figcaption></figure>
<p>How do you know where the earlier copy is? Keep a Map from each character to the index where you <b>last saw</b> it, which is the hash map habit from earlier lessons. Each character enters and leaves the window at most once, so the whole thing is O(n).</p>
<div class="mistake"><b>Common mistake</b>Moving the left edge backwards. Take <code>"abba"</code>. At the second b, start jumps to 2. At the final a, the map says a was last seen at index 0. That copy is already <i>outside</i> the window, so you must ignore it. Only move <code>start</code> when the last-seen index is <code>&gt;= start</code>. Without that check you set start back to 1 and get 3 instead of the correct 2.</div>

<h4>One pass with running state: the stock problem</h4>
<p>The second task: given a list of daily prices, find the best profit from buying on one day and selling on a <i>later</i> day. If prices only fall, the answer is 0, meaning "don't trade".</p>
<p>Brute force tries every buy day with every later sell day: O(n²). The insight is that if you are selling today, the best day to have bought was the <b>cheapest day so far</b>. So walk the prices once and remember two things: the lowest price seen, and the best profit seen.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="A line chart of the prices 7, 1, 5, 3, 6, 4 with the best buy and sell days marked">
<line class="ln" x1="40" y1="200" x2="400" y2="200"/>
<polyline class="ln-a" fill="none" points="60,46 120,178 180,90 240,134 300,68 360,112"/>
<circle class="dot" cx="60" cy="46" r="5"/><circle class="dot-ok" cx="120" cy="178" r="7"/><circle class="dot" cx="180" cy="90" r="5"/><circle class="dot" cx="240" cy="134" r="5"/><circle class="dot-ok" cx="300" cy="68" r="7"/><circle class="dot" cx="360" cy="112" r="5"/>
<g text-anchor="middle"><text class="t-m" x="60" y="34">7</text><text class="t-m" x="96" y="182">1</text><text class="t-m" x="180" y="78">5</text><text class="t-m" x="240" y="122">3</text><text class="t-m" x="300" y="56">6</text><text class="t-m" x="360" y="100">4</text>
<text class="t-s" x="60" y="220">day 0</text><text class="t-s" x="120" y="220">1</text><text class="t-s" x="180" y="220">2</text><text class="t-s" x="240" y="220">3</text><text class="t-s" x="300" y="220">4</text><text class="t-s" x="360" y="220">5</text>
<text class="t-s t-ok" x="120" y="196">buy</text><text class="t-b t-ok" x="374" y="160">profit 5</text></g>
<line class="ln-d" x1="120" y1="178" x2="330" y2="178"/><path class="ln-ok" d="M330 176V76"/><polygon class="ah-ok" points="324,78 336,78 330,70"/>
</svg><figcaption>The prices 7, 1, 5, 3, 6 and 4 as a line. The lowest point so far is 1, on day 1, marked as the buy. The highest price after it is 6, on day 4. Selling there makes a profit of 6 minus 1, which is 5.</figcaption></figure>
<p>Trace <code>[7, 1, 5, 3, 6, 4]</code>: lowest starts as <code>Infinity</code>, a value bigger than any price, so the first price always replaces it. After 7, lowest is 7 and best is 0. After 1, lowest is 1. At 5, profit 4 becomes best. At 3, profit 2, no change. At 6, profit 5, the new best. At 4, profit 3, no change. Answer: 5. For an empty list the loop never runs and you return 0.</p>

<h4>Dynamic programming: big answers from small ones</h4>
<p><b>Dynamic programming</b>, or DP, is a fancy name for a simple idea: if the answer for n can be built from answers for smaller numbers, work out the small answers first, store them, and build upwards. It is memoisation from the Fibonacci exercise, done in a loop instead of with recursion.</p>
<p>Every DP solution answers three questions:</p>
<ol>
<li><b>What does dp[x] mean?</b> Say it in one plain sentence.</li>
<li><b>What are the base cases?</b> The smallest answers you know without calculating.</li>
<li><b>What is the rule</b> that builds dp[x] from smaller entries?</li>
</ol>

<h4>Worked example: climbing stairs</h4>
<p>You climb a staircase taking 1 or 2 steps at a time. How many different ways are there to reach step n?</p>
<p>Think about your <b>last move</b>. To stand on step n, you either came from step n − 1 with a single step, or from step n − 2 with a double step. Those are the only options, and they never overlap. So the number of ways is <code>ways(n - 1) + ways(n - 2)</code>.</p>
<div class="tbl-wrap"><table><tr><th>n</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr>
<tr><td>ways</td><td>1</td><td>1</td><td>2</td><td>3</td><td>5</td><td>8</td></tr></table></div>
<p>The base cases: 1 way to be on step 0 (do nothing) and 1 way to reach step 1. Every later entry is the sum of the two before it, so this is the Fibonacci pattern again. Since each step only needs the previous two values, you can keep just two variables, <code>a</code> and <code>b</code>, and slide them forward. That makes it O(n) time and O(1) space, and n = 45 finishes instantly.</p>

<h4>Worked example: coin change, filling a DP table</h4>
<p>The last task: given coin values, find the <b>fewest</b> coins that add up to an amount, or -1 if it cannot be done. With coins <code>[1, 2, 5]</code> and amount 11, the answer is 3: 5 + 5 + 1.</p>
<p>Greedy guessing, always taking the biggest coin, can fail with odd coin sets, so DP it is. The three questions:</p>
<ul>
<li><b>Meaning:</b> <code>dp[x]</code> is the fewest coins that make the amount x.</li>
<li><b>Base case:</b> <code>dp[0] = 0</code>. Making 0 takes no coins. Every other entry starts as <code>Infinity</code>, meaning "not possible yet".</li>
<li><b>Rule:</b> to make x, your last coin was some coin c. Before it you had made x − c, which took <code>dp[x - c]</code> coins. So try every coin and keep the smallest <code>dp[x - c] + 1</code>.</li>
</ul>
<figure class="fig"><svg viewBox="0 0 420 240" role="img" aria-label="The coin change table for coins 1, 2 and 5, filled from amount 0 to 11">
<text class="t-m" x="210" y="24" text-anchor="middle">coins [1, 2, 5], amount 11</text>
<path class="ln-a" fill="none" d="M245 130Q320 40 393 130"/><path class="ln-a" fill="none" d="M335 130Q365 95 393 130"/><path class="ln-a" fill="none" d="M365 130Q380 110 393 130"/>
<text class="t-s" x="4" y="153">dp[x]</text><text class="t-s" x="4" y="186">x</text>
<rect class="bx" x="50" y="130" width="30" height="36"/><rect class="bx" x="80" y="130" width="30" height="36"/><rect class="bx" x="110" y="130" width="30" height="36"/><rect class="bx" x="140" y="130" width="30" height="36"/><rect class="bx" x="170" y="130" width="30" height="36"/><rect class="bx" x="200" y="130" width="30" height="36"/><rect class="bx-info" x="230" y="130" width="30" height="36"/><rect class="bx" x="260" y="130" width="30" height="36"/><rect class="bx" x="290" y="130" width="30" height="36"/><rect class="bx-info" x="320" y="130" width="30" height="36"/><rect class="bx-info" x="350" y="130" width="30" height="36"/><rect class="bx-ok" x="380" y="130" width="30" height="36"/>
<g text-anchor="middle">
<text class="t-m" x="65" y="154">0</text><text class="t-m" x="95" y="154">1</text><text class="t-m" x="125" y="154">1</text><text class="t-m" x="155" y="154">2</text><text class="t-m" x="185" y="154">2</text><text class="t-m" x="215" y="154">1</text><text class="t-m" x="245" y="154">2</text><text class="t-m" x="275" y="154">2</text><text class="t-m" x="305" y="154">3</text><text class="t-m" x="335" y="154">3</text><text class="t-m" x="365" y="154">2</text><text class="t-b t-ok" x="395" y="154">3</text>
<text class="t-s" x="65" y="186">0</text><text class="t-s" x="95" y="186">1</text><text class="t-s" x="125" y="186">2</text><text class="t-s" x="155" y="186">3</text><text class="t-s" x="185" y="186">4</text><text class="t-s" x="215" y="186">5</text><text class="t-s" x="245" y="186">6</text><text class="t-s" x="275" y="186">7</text><text class="t-s" x="305" y="186">8</text><text class="t-s" x="335" y="186">9</text><text class="t-s" x="365" y="186">10</text><text class="t-s" x="395" y="186">11</text>
<text class="t-s" x="210" y="222">dp[11] = 1 + smallest of dp[10], dp[9], dp[6] = 3</text>
</g>
</svg><figcaption>The table is filled from left to right, starting with dp of 0 equals 0. To fill dp of 11, look back by each coin: 1 step back to dp of 10, 2 back to dp of 9, and 5 back to dp of 6. The smallest of those is 2, so dp of 11 is 2 plus 1, which is 3 coins.</figcaption></figure>
<p>Check one entry by hand. dp[6]: coin 1 gives dp[5] + 1 = 2; coin 2 gives dp[4] + 1 = 3; coin 5 gives dp[1] + 1 = 2. The smallest is 2 (5 + 1). Filling the table is O(amount × number of coins).</p>
<p>At the end, if <code>dp[amount]</code> is still <code>Infinity</code>, no combination worked, so return -1. With coins <code>[2]</code> and amount 3, dp[1] stays Infinity, and dp[3] = dp[1] + 1 is Infinity too. <code>Infinity + 1</code> is still Infinity in JavaScript, which is why it makes a safe "impossible" marker.</p>
<div class="mistake"><b>Common mistake</b>Filling the array with 0 instead of <code>Infinity</code>. Then <code>Math.min</code> always picks the 0, every amount looks free, and you return 0 coins. Start every entry except dp[0] as "impossible", and let the rule improve them.</div>

<h4>How to work through a problem in an interview</h4>
<p>Interviewers grade how you think as much as the final code. A reliable routine:</p>
<ol>
<li><b>Clarify.</b> Repeat the problem in your own words and ask about edge cases: can the input be empty? Are there negative numbers?</li>
<li><b>Work an example by hand</b>, out loud, like the traces in this lesson.</li>
<li><b>State the brute force</b> and its Big-O. It proves you can solve it, and gives you something to improve.</li>
<li><b>Optimise.</b> Ask which pattern the wording suggests: "longest substring" suggests a window, "how many ways" or "fewest" suggests DP, "have I seen this?" suggests a hash map.</li>
<li><b>Test edge cases</b>: empty input, one item, all the same, impossible cases.</li>
</ol>

<div class="try"><b>Try it in your head</b>How many ways are there to climb 6 stairs? The table continues 5, 8, so the next is 5 + 8 = 13. And what is the longest substring without repeats in <code>"bbbbb"</code>? Every new b repeats, so the window never grows past 1.</div>

<h4>Recap</h4>
<ul>
<li>Sliding window: grow the right edge, and when the rule breaks, move the left edge forward, never back.</li>
<li>One pass with running state: remember the lowest price so far and the best profit so far.</li>
<li>Dynamic programming: define dp[x] in words, set the base cases, then build each entry from smaller ones.</li>
<li>climbStairs adds the two previous answers; coin change takes the best of <code>dp[x - c] + 1</code>, with Infinity meaning impossible.</li>
<li>In interviews: clarify, work an example, state the brute force, optimise, then test edge cases.</li>
</ul>
`);
