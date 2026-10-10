/* Projects: Data structures & algorithms */
(()=>{
/* ---------- guided: autocomplete ---------- */
const G_START=`const TEXT = \`Git tracks changes. Good engineers commit often, and good commits tell a story.
Graphs, grids and greedy algorithms appear in interviews; graphs appear in real systems too.
Great tests guard great code. Go, get going: grow your skills one commit at a time.\`;

// Build the autocomplete engine step by step.
`;
const C1=`
function countWords(text) {
  const counts = new Map();
  for (const raw of text.toLowerCase().split(/\\s+/)) {
    const word = raw.replace(/[^a-z0-9']/g, '');
    if (!word) continue;
    counts.set(word, (counts.get(word) || 0) + 1);
  }
  return counts;
}
`;
const C2=`
function topWords(counts, k) {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, k);
}
`;
const C3=`
class TrieNode {
  constructor() {
    this.children = new Map();
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.end = true;
  }

  find(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      node = node.children.get(ch);
      if (!node) return null;
    }
    return node;
  }

  has(word) {
    const node = this.find(word);
    return !!node && node.end;
  }

  withPrefix(prefix) {
    const out = [];
    const walk = (node, path) => {
      if (node.end) out.push(path);
      for (const [ch, child] of node.children) walk(child, path + ch);
    };
    const start = this.find(prefix);
    if (start) walk(start, prefix);
    return out.sort();
  }
}
`;
const C4=`
function suggest(trie, counts, prefix, k) {
  return trie.withPrefix(prefix.toLowerCase())
    .sort((a, b) => (counts.get(b) || 0) - (counts.get(a) || 0) || a.localeCompare(b))
    .slice(0, k);
}

const counts = countWords(TEXT);
const trie = new Trie();
for (const word of counts.keys()) trie.insert(word);
console.log(suggest(trie, counts, 'g', 3));
`;
const C6=`
function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function didYouMean(word, words) {
  let best = null;
  for (const w of words) {
    const d = editDistance(word, w);
    if (best === null || d < best.d || (d === best.d && w < best.w)) best = { w, d };
  }
  return best && best.d <= 2 ? best.w : null;
}
`;
const BIG="(() => { const t = new Trie(); const words = []; for (let i = 0; i < 50000; i++) { const w = 'w' + (i * 7919 % 50000).toString(36) + 'x'; words.push(w); t.insert(w); } const t0 = performance.now(); let hits = 0; for (let i = 0; i < 20000; i++) if (t.has(words[(i * 31) % 50000])) hits++; const fast = performance.now() - t0 < 150; return hits === 20000 && fast && !t.has('nope') && !t.has('w'); })()";

/* ---------- solo: routing ---------- */
const R_START=`// Delivery stops and travel times in minutes. Roads go both ways.
const EDGES = [
  ['Depot', 'Market', 4],
  ['Depot', 'Bridge', 2],
  ['Bridge', 'Market', 1],
  ['Market', 'Harbor', 5],
  ['Bridge', 'School', 7],
  ['School', 'Harbor', 1],
  ['Harbor', 'Airport', 3],
  ['Island', 'Lighthouse', 2],
];

// Implement buildGraph, fewestStops, MinHeap and fastestRoute as described in the brief.
`;
const R_REF=R_START.replace('// Implement buildGraph, fewestStops, MinHeap and fastestRoute as described in the brief.\n',`function buildGraph(edges) {
  const graph = new Map();
  const add = (a, b, time) => {
    if (!graph.has(a)) graph.set(a, []);
    graph.get(a).push({ to: b, time });
  };
  for (const [a, b, time] of edges) {
    add(a, b, time);
    add(b, a, time);
  }
  return graph;
}

function fewestStops(graph, from, to) {
  if (from === to) return 0;
  const seen = new Set([from]);
  let frontier = [from];
  for (let hops = 1; frontier.length; hops++) {
    const next = [];
    for (const stop of frontier) {
      for (const { to: n } of graph.get(stop) || []) {
        if (n === to) return hops;
        if (!seen.has(n)) {
          seen.add(n);
          next.push(n);
        }
      }
    }
    frontier = next;
  }
  return -1;
}

class MinHeap {
  constructor() {
    this.items = [];
  }
  get size() {
    return this.items.length;
  }
  push(value, priority) {
    const a = this.items;
    a.push({ value, priority });
    let i = a.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (a[p].priority <= a[i].priority) break;
      [a[p], a[i]] = [a[i], a[p]];
      i = p;
    }
  }
  pop() {
    const a = this.items;
    if (!a.length) return undefined;
    const top = a[0];
    const last = a.pop();
    if (a.length) {
      a[0] = last;
      let i = 0;
      for (;;) {
        const l = 2 * i + 1, r = l + 1;
        let m = i;
        if (l < a.length && a[l].priority < a[m].priority) m = l;
        if (r < a.length && a[r].priority < a[m].priority) m = r;
        if (m === i) break;
        [a[m], a[i]] = [a[i], a[m]];
        i = m;
      }
    }
    return top.value;
  }
}

function fastestRoute(graph, from, to) {
  const dist = new Map([[from, 0]]);
  const prev = new Map();
  const heap = new MinHeap();
  heap.push(from, 0);
  while (heap.size) {
    const stop = heap.pop();
    if (stop === to) break;
    for (const { to: n, time } of graph.get(stop) || []) {
      const d = dist.get(stop) + time;
      if (d < (dist.has(n) ? dist.get(n) : Infinity)) {
        dist.set(n, d);
        prev.set(n, stop);
        heap.push(n, d);
      }
    }
  }
  if (!dist.has(to)) return null;
  const path = [to];
  while (path[0] !== from) path.unshift(prev.get(path[0]));
  return { time: dist.get(to), path };
}

const graph = buildGraph(EDGES);
console.log(fewestStops(graph, 'Depot', 'Harbor'), fastestRoute(graph, 'Depot', 'Harbor'));
`);
const GRID="(() => { const N = 140, edges = []; const id = (r, c) => r + ':' + c; for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { if (c + 1 < N) edges.push([id(r, c), id(r, c + 1), (r * 7 + c * 13) % 9 + 1]); if (r + 1 < N) edges.push([id(r, c), id(r + 1, c), (r * 11 + c * 5) % 9 + 1]); } const g = buildGraph(edges); const t0 = performance.now(); const res = fastestRoute(g, id(0, 0), id(N - 1, N - 1)); const ms = performance.now() - t0; if (!res || ms > 600) return false; const w = new Map(edges.flatMap(([a, b, t]) => [[a + '|' + b, t], [b + '|' + a, t]])); let sum = 0; for (let i = 1; i < res.path.length; i++) { const t = w.get(res.path[i - 1] + '|' + res.path[i]); if (t == null) return false; sum += t; } return sum === res.time && res.path[0] === id(0, 0) && res.path[res.path.length - 1] === id(N - 1, N - 1) && res.time <= 2 * (N - 1) * 9; })()";

defineProjects('dsa',{
guided:{title:'Build a search-as-you-type engine',kind:'code',lang:'js',starter:G_START,timeout:8000,
 pitch:'Count words with a hash map, rank them, store them in a trie for instant prefix search, prove it scales, and add "did you mean?" with dynamic programming.',
 brief:`<p>Every search box suggests words as you type. You'll build that engine from data-structure building blocks, the way it\'s done for real: a hash map for counts, sorting for ranking, a <b>trie</b> for prefix lookups, and <b>dynamic programming</b> for typo correction.</p>
<p>Keep everything in one file. After each step, press <b>Run</b>. The checks call your functions directly.</p>
<div class="tip"><b>Goal</b><code>suggest(trie, counts, 'g', 3)</code> returns the three most frequent words starting with "g", fast enough for 50,000 words.</div>`,
 tasks:[
 {t:'countWords(text): count each lowercase word in a Map, ignoring punctuation.',why:'A <b>hash map</b> gives O(1) average lookups and updates, so counting n words takes O(n). With an array of pairs, each word would mean a scan, which is O(n²) overall.',code:C1.trim(),sol:G_START+C1,x:"countWords('The cat, the HAT.').get('the') === 2 && countWords('The cat, the HAT.').size === 3 && countWords('').size === 0"},
 {t:'topWords(counts, k): the k most frequent words, ties broken alphabetically.',why:'Sorting is O(n log n). A comparator that returns <code>b[1] - a[1]</code> sorts by count, highest first, and <code>|| a[0].localeCompare(b[0])</code> breaks ties, so the output is <b>deterministic</b>. Tests and users both need that.',code:C2.trim(),sol:G_START+C1+C2,x:"JSON.stringify(topWords(countWords('b a b c a b'), 2)) === '[[\"b\",3],[\"a\",2]]' && JSON.stringify(topWords(countWords('y x'), 5)) === '[[\"x\",1],[\"y\",1]]'"},
 {t:'Build a Trie with insert(word), has(word) and withPrefix(prefix).',why:'A trie stores words letter by letter in a tree, so every word sharing a prefix shares a path. Finding a prefix costs O(length of the prefix), no matter how many words you store. <code>has()</code> must check the <code>end</code> flag: "gr" is a prefix of "great", not a word.',code:C3.trim(),sol:G_START+C1+C2+C3,x:"(() => { const t = new Trie(); ['go', 'good', 'got', 'git', 'great'].forEach((w) => t.insert(w)); return t.has('go') && !t.has('goo') && !t.has('gr') && JSON.stringify(t.withPrefix('go')) === '[\"go\",\"good\",\"got\"]' && t.withPrefix('z').length === 0; })()"},
 {t:'suggest(trie, counts, prefix, k): the most frequent completions first.',why:'This is where the structures combine: the trie narrows the candidates, the map ranks them, and sorting picks the top k. Lowercasing the prefix keeps "G" and "g" consistent.',code:C4.trim(),sol:G_START+C1+C2+C3+C4,x:"(() => { const c = countWords(TEXT); const t = new Trie(); for (const w of c.keys()) t.insert(w); return JSON.stringify(suggest(t, c, 'g', 3)) === '[\"good\",\"graphs\",\"great\"]' && JSON.stringify(suggest(t, c, 'Co', 5)) === '[\"commit\",\"code\",\"commits\"]'; })()"},
 {t:'Prove it scales: 20,000 has() lookups on a 50,000-word trie in under 150 ms.',why:'Big-O is a promise about growth. Checking "is this a word?" by scanning an array is O(n) per lookup, about a billion steps here. A trie (or a Set) answers in time proportional to the word\'s length. If your trie passed step 3, this already passes: run it and look at the timing.',sol:G_START+C1+C2+C3+C4,x:BIG},
 {t:'editDistance(a, b) with dynamic programming, and didYouMean(word, words).',why:'Edit distance counts the inserts, deletes and substitutions needed to turn one word into another. Trying every possibility is exponential. <b>Dynamic programming</b> fills a table where each cell reuses three smaller answers: O(a×b). It\'s the same idea behind diff tools and DNA alignment.',code:C6.trim(),sol:G_START+C1+C2+C3+C4+C6,x:"editDistance('kitten', 'sitting') === 3 && editDistance('', 'abc') === 3 && editDistance('flaw', 'lawn') === 2 && editDistance('same', 'same') === 0 && didYouMean('comit', ['commit', 'code', 'cat']) === 'commit' && didYouMean('zzzz', ['commit']) === null"},
 ]},
solo:{title:'Route delivery vans with graphs',kind:'code',lang:'js',starter:R_START,timeout:8000,
 pitch:'Model a road network as a graph, find the fewest stops with BFS, build a binary heap, and find the fastest route with Dijkstra, fast enough for a 20,000-stop city.',
 brief:`<p>A delivery company needs routing. Roads are in <code>EDGES</code> as <code>[stopA, stopB, minutes]</code>, and every road goes both ways. Implement these exactly, because the dispatch system calls them:</p>
<ul><li><code>buildGraph(edges)</code> returns a <code>Map</code> from each stop to an array of <code>{ to, time }</code> neighbours, in both directions.</li><li><code>fewestStops(graph, from, to)</code> returns the minimum number of roads to travel: <code>0</code> when <code>from === to</code>, <code>-1</code> when there is no route.</li><li><code>class MinHeap</code> has <code>push(value, priority)</code>, <code>pop()</code> (returns the value with the <b>lowest</b> priority, or <code>undefined</code> when empty) and a <code>size</code> property. Both operations must be O(log n).</li><li><code>fastestRoute(graph, from, to)</code> returns <code>{ time, path }</code> with the minimum total minutes and the list of stops, or <code>null</code> when there is no route.</li><li><code>fastestRoute</code> must handle a 140×140 grid city (19,600 stops) in well under a second.</li></ul>`,
 tasks:[
 {t:'buildGraph returns a Map of { to, time } neighbours, in both directions.',x:"(() => { const g = buildGraph(EDGES); return g instanceof Map && g.get('Market').length === 3 && g.get('Market').some((e) => e.to === 'Bridge' && e.time === 1) && g.get('Bridge').some((e) => e.to === 'Market' && e.time === 1) && g.get('Lighthouse').length === 1; })()",
  miss:'buildGraph must return a Map where get(\'Market\') is an array like [{ to: \'Depot\', time: 4 }, …]. Market touches 3 roads. Remember roads go both ways: add each edge to both stops.'},
 {t:'fewestStops uses BFS: Depot→Harbor is 2, same stop is 0, unreachable is -1.',x:"(() => { const g = buildGraph(EDGES); return fewestStops(g, 'Depot', 'Harbor') === 2 && fewestStops(g, 'Depot', 'Airport') === 3 && fewestStops(g, 'Depot', 'Depot') === 0 && fewestStops(g, 'Depot', 'Island') === -1 && fewestStops(g, 'Depot', 'Nowhere') === -1; })()",
  miss:'Breadth-first search explores the graph in rings: every stop 1 road away, then 2, and so on. The first time you reach the target, the ring number is the answer. Track visited stops, or cycles will loop forever. Return -1 when the queue runs out.'},
 {t:'MinHeap pops values in priority order, and its size is right.',x:"(() => { const h = new MinHeap(); const nums = Array.from({ length: 500 }, (_, i) => (i * 7919) % 1000); nums.forEach((n) => h.push('v' + n, n)); if (h.size !== 500) return false; let prev = -1; for (let i = 0; i < 500; i++) { const v = +h.pop().slice(1); if (v < prev) return false; prev = v; } return h.size === 0 && h.pop() === undefined; })() && (() => { const h = new MinHeap(); const t0 = performance.now(); for (let i = 0; i < 100000; i++) h.push(i, (i * 7919) % 100003); while (h.size) h.pop(); return performance.now() - t0 < 400; })()",
  miss:'Either pop() doesn\'t always return the lowest-priority value, size is wrong, or it\'s too slow (100,000 pushes and pops should take well under 400 ms). Sorting the whole array on every push is O(n log n) per operation. A binary heap keeps an array where each parent is ≤ its children, so push and pop only "bubble" along one path: O(log n).'},
 {t:'fastestRoute finds the minimum time and its path, or null.',x:"(() => { const g = buildGraph(EDGES); const r = fastestRoute(g, 'Depot', 'Harbor'); const a = fastestRoute(g, 'Depot', 'Airport'); return r && r.time === 8 && JSON.stringify(r.path) === '[\"Depot\",\"Bridge\",\"Market\",\"Harbor\"]' && a && a.time === 11 && fastestRoute(g, 'Depot', 'Island') === null && fastestRoute(g, 'Depot', 'Depot').time === 0; })()",
  miss:'Depot→Harbor should take 8 minutes via Bridge and Market. That route has more stops than the 2-road route, which takes 9, so BFS gives the wrong answer here. Use Dijkstra: always expand the stop with the smallest known time (your MinHeap), and record each stop\'s predecessor to rebuild the path.'},
 {t:'fastestRoute handles a 19,600-stop city quickly, with a valid path.',x:GRID,
  miss:'On the 140×140 grid, fastestRoute either took over 600 ms, failed, or returned a path whose times don\'t add up. An O(V²) Dijkstra that scans all stops for the next one does about 384 million steps here. Use your MinHeap so each step costs O(log V).'},
 ],
 warn:[
  {c:ctx=>/\.shift\(\)/.test(ctx.code),m:'You used array.shift() as a queue. shift() is O(n) because it moves every element. That\'s fine for small inputs, but for big graphs use a moving index or a two-list frontier.'},
  {c:ctx=>/\.sort\(/.test((ctx.code.split(/class\s+MinHeap/)[1]||'').split(/\n}\n/)[0]),m:'Your MinHeap calls sort(). That makes it a sorted array (O(n log n) per push), not a heap.'},
  {c:ctx=>/JSON\.parse\(JSON\.stringify/.test(ctx.code),m:'You deep-copy with JSON.parse(JSON.stringify(…)) inside an algorithm. It\'s slow and drops Maps and Sets. Copy only what you need.'},
 ],
 ref:R_REF},
});
})();
