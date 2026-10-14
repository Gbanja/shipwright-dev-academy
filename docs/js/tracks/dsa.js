/* Track 12: Data structures & algorithms */
(()=>{
const perf=(setup,call,ms)=>`(()=>{${setup};const __t=performance.now();const __r=${call};return [__r, performance.now()-__t<${ms}]})()`;
const LIST_PRELUDE=`class ListNode { constructor(val, next = null) { this.val = val; this.next = next; } }
const fromArray = (arr) => arr.reduceRight((next, val) => new ListNode(val, next), null);
const toArray = (head) => { const out = []; while (head) { out.push(head.val); head = head.next; } return out; };`;
const TREE_PRELUDE=`class TreeNode { constructor(val, left = null, right = null) { this.val = val; this.left = left; this.right = right; } }
const tree = new TreeNode(8,
  new TreeNode(3, new TreeNode(1), new TreeNode(6, new TreeNode(4), new TreeNode(7))),
  new TreeNode(10, null, new TreeNode(14, new TreeNode(13))));
const GRID = [
  [0, 0, 0, 1],
  [1, 1, 0, 1],
  [0, 0, 0, 0],
  [0, 1, 1, 0],
];
const ROUTES = { Lagos: ['Accra', 'Abuja'], Accra: ['Abidjan'], Abuja: [], Abidjan: ['Dakar'], Dakar: [], Nairobi: ['Kampala'], Kampala: [] };`;
const A1_START=`// Return true if any value appears twice.
// This version compares every pair of items.
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

console.log(hasDuplicate([3, 1, 4, 1, 5]));
`;
const A1_SOL=`// O(n): remember what we've seen in a Set (O(1) average lookups)
function hasDuplicate(arr) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(x)) return true;
    seen.add(x);
  }
  return false;
}

console.log(hasDuplicate([3, 1, 4, 1, 5]));
`;
const A2_START=`// 1. twoSum(nums, target): indices of the two numbers that add up to target
function twoSum(nums, target) {
}

// 2. isAnagram(a, b): same letters in a different order? Ignore case and spaces.
function isAnagram(a, b) {
}

// 3. firstUniqueChar(s): index of the first character that appears once, or -1
function firstUniqueChar(s) {
}
`;
const A2_SOL=`function twoSum(nums, target) {
  const seen = new Map();            // value → index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return null;
}

function isAnagram(a, b) {
  const clean = (s) => s.toLowerCase().replace(/\\s/g, '');
  a = clean(a);
  b = clean(b);
  if (a.length !== b.length) return false;
  const counts = {};
  for (const c of a) counts[c] = (counts[c] || 0) + 1;
  for (const c of b) {
    if (!counts[c]) return false;
    counts[c]--;
  }
  return true;
}

function firstUniqueChar(s) {
  const counts = new Map();
  for (const c of s) counts.set(c, (counts.get(c) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (counts.get(s[i]) === 1) return i;
  }
  return -1;
}
`;
const A3_START=`// Helpers available: ListNode, fromArray([1,2,3]), toArray(head)

// 1. isValid(s): are the brackets ()[]{} balanced and properly nested?
function isValid(s) {
}

// 2. reverseList(head): reverse a singly linked list and return the new head
function reverseList(head) {
}

// 3. A Queue (first in, first out) with enqueue, dequeue and size
class Queue {
}
`;
const A3_SOL=`function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];
  for (const c of s) {
    if ('([{'.includes(c)) stack.push(c);
    else if (pairs[c]) {
      if (stack.pop() !== pairs[c]) return false;
    }
  }
  return stack.length === 0;
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

class Queue {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(value) {
    this.items[this.tail++] = value;
  }
  dequeue() {
    if (this.size() === 0) return undefined;
    const value = this.items[this.head];
    delete this.items[this.head++];
    return value;
  }
  size() {
    return this.tail - this.head;
  }
}
`;
const A4_START=`// Available: TreeNode, tree (a binary search tree), GRID (0 = open, 1 = wall), ROUTES (adjacency list)

// 1. maxDepth(root): number of levels in the tree
function maxDepth(root) {
}

// 2. inorder(root): values in left → node → right order (a BST gives them sorted)
function inorder(root) {
}

// 3. shortestPath(grid, [r, c], [r, c]): fewest steps up/down/left/right, or -1
function shortestPath(grid, start, end) {
}

// 4. hasRoute(graph, from, to): can you get from one city to the other?
function hasRoute(graph, from, to) {
}
`;
const A4_SOL=`function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function inorder(root, out = []) {
  if (!root) return out;
  inorder(root.left, out);
  out.push(root.val);
  inorder(root.right, out);
  return out;
}

function shortestPath(grid, start, end) {
  const rows = grid.length, cols = grid[0].length;
  const queue = [[start[0], start[1], 0]];
  const seen = new Set([start.join(',')]);
  while (queue.length) {
    const [r, c, steps] = queue.shift();
    if (r === end[0] && c === end[1]) return steps;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      const key = nr + ',' + nc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 0 && !seen.has(key)) {
        seen.add(key);
        queue.push([nr, nc, steps + 1]);
      }
    }
  }
  return -1;
}

function hasRoute(graph, from, to, seen = new Set()) {
  if (from === to) return true;
  seen.add(from);
  for (const next of graph[from] || []) {
    if (!seen.has(next) && hasRoute(graph, next, to, seen)) return true;
  }
  return false;
}
`;
const A5_START=`// 1. binarySearch(sorted, target): index of target, or -1. Must be O(log n).
function binarySearch(sorted, target) {
}

// 2. mergeSort(arr): return a NEW sorted array (don't use .sort())
function mergeSort(arr) {
}

// 3. fib(n): the nth Fibonacci number (fib(0) = 0, fib(1) = 1). fib(70) must be fast.
function fib(n) {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
}
`;
const A5_SOL=`function binarySearch(sorted, target) {
  let lo = 0, hi = sorted.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (sorted[mid] === target) return mid;
    if (sorted[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr.slice();
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const out = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    out.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return out.concat(left.slice(i), right.slice(j));
}

const memo = new Map();
function fib(n) {
  if (n < 2) return n;
  if (memo.has(n)) return memo.get(n);
  const value = fib(n - 1) + fib(n - 2);
  memo.set(n, value);
  return value;
}
`;
const A6_START=`// 1. Sliding window: length of the longest substring without repeating characters
function lengthOfLongestSubstring(s) {
}

// 2. One pass: best profit from buying one day and selling on a later day (0 if none)
function maxProfit(prices) {
}

// 3. Dynamic programming: ways to climb n stairs taking 1 or 2 steps at a time
function climbStairs(n) {
}

// 4. Dynamic programming: fewest coins to make amount, or -1 if impossible
function coinChange(coins, amount) {
}
`;
const A6_SOL=`function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let start = 0, best = 0;
  for (let i = 0; i < s.length; i++) {
    if (lastSeen.has(s[i]) && lastSeen.get(s[i]) >= start) start = lastSeen.get(s[i]) + 1;
    lastSeen.set(s[i], i);
    best = Math.max(best, i - start + 1);
  }
  return best;
}

function maxProfit(prices) {
  let lowest = Infinity, best = 0;
  for (const p of prices) {
    lowest = Math.min(lowest, p);
    best = Math.max(best, p - lowest);
  }
  return best;
}

function climbStairs(n) {
  let a = 1, b = 1;           // ways to reach step 0 and step 1
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}

function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let x = 1; x <= amount; x++) {
    for (const c of coins) {
      if (c <= x) dp[x] = Math.min(dp[x], dp[x - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
`;
defineTrack({id:'dsa',name:'Data structures & algorithms',weeks:'4–6 weeks',
lessons:[
{id:'a1',lvl:'Foundations',title:'Big-O: time & space complexity',kind:'code',lang:'js',starter:A1_START,timeout:6000,
 sum:'Big-O describes how running time or memory grows with input size n, ignoring constants. O(1) is constant (a Map lookup), O(log n) halves the work each step (binary search), O(n) is one pass, O(n log n) is efficient sorting, and O(n²) is nested loops over the same data. Trading memory for speed, for example with a Set, often turns O(n²) into O(n).',
 keys:['O(1)','O(log n)','O(n)','O(n log n)','O(n²)','nested loops','Set/Map for O(1) lookups','time vs space trade-off'],
 concept:`<p><b>Big-O</b> answers: if the input gets 10× bigger, how much slower does my code get?</p>
<div class="tbl-wrap"><table><tr><th>Big-O</th><th>Name</th><th>Example</th><th>n = 1,000,000</th></tr>
<tr><td>O(1)</td><td>constant</td><td><code>map.get(key)</code></td><td>1 step</td></tr>
<tr><td>O(log n)</td><td>logarithmic</td><td>binary search</td><td>~20 steps</td></tr>
<tr><td>O(n)</td><td>linear</td><td>one loop</td><td>1 million</td></tr>
<tr><td>O(n log n)</td><td>linearithmic</td><td>merge sort, <code>.sort()</code></td><td>~20 million</td></tr>
<tr><td>O(n²)</td><td>quadratic</td><td>nested loops over the data</td><td>1 trillion (far too slow)</td></tr></table></div>
<p>The starter <code>hasDuplicate</code> compares every pair. The checker runs your code on <b>200,000</b> items with a time limit, so only an efficient solution passes.</p>
<div class="tip"><b>Classic trick</b>Spend memory to save time: a <code>Set</code> remembers what you've seen with O(1) lookups.</div>`,
 tasks:[
  {t:'What is the time complexity of the starter hasDuplicate?',o:['O(1)','O(log n)','O(n)','O(n²)'],a:3,e:'Two nested loops over the same array: about n²/2 comparisons.'},
  {t:'Rewrite hasDuplicate in O(n) using a Set. It must handle 200,000 items in under 0.5 s.',sol:A1_SOL,showSol:false,hint:'const seen = new Set(); for (const x of arr) { if (seen.has(x)) return true; seen.add(x); } return false;',x:'hasDuplicate([3, 1, 4, 1]) === true && hasDuplicate([1, 2, 3]) === false && '+perf('const __a = Array.from({ length: 200000 }, (_, i) => i)','hasDuplicate(__a)',500)+'.join() === "false,true"'},
  {t:'What extra space does the Set version use?',o:['O(1)','O(n)','O(n²)','None'],a:1,e:'In the worst case it stores every item, trading O(n) memory for O(n) time.'},
  {t:'Searching a sorted array of 1 million items by halving each step takes about…',o:['1,000,000 steps','1,000 steps','20 steps','1 step'],a:2,e:'log₂(1,000,000) ≈ 20. That\'s binary search.'},
  {t:'Which grows fastest as n increases?',o:['O(n log n)','O(n)','O(n²)','O(log n)'],a:2,e:'Quadratic beats them all, in the bad sense.'},
 ]},
{id:'a2',lvl:'Core structures',title:'Arrays, strings & hash maps',kind:'code',lang:'js',starter:A2_START,
 sum:'Hash maps (Map, Set, plain objects) give O(1) average inserts and lookups, which is the most common way to speed up array and string problems. twoSum stores each value\'s index and checks for target - value in one pass. Counting characters in a map solves anagram and "first unique" problems in O(n).',
 keys:['Map: value → index','target - x lookup','frequency counts','one pass O(n)','normalize input (case, spaces)'],
 concept:`<p>Most "easy" interview questions are solved by the same move: <b>remember things in a hash map</b>.</p>
<pre class="snip" style="margin-bottom:12px">// twoSum: for each number, have I already seen the partner I need?
const seen = new Map();                 // value → index
for (let i = 0; i < nums.length; i++) {
  const need = target - nums[i];
  if (seen.has(need)) return [seen.get(need), i];
  seen.set(nums[i], i);
}</pre>
<p>Brute force checks every pair (O(n²)); the map makes it O(n). Counting characters (<code>counts[c] = (counts[c] || 0) + 1</code>) solves anagrams, "first unique character" and many more.</p>`,
 tasks:[
  {t:'twoSum returns the indices of the two numbers that add up to target, in O(n).',sol:A2_SOL,showSol:false,hint:'Keep a Map of value → index; for each nums[i], look up target - nums[i].',x:'JSON.stringify(twoSum([2, 7, 11, 15], 9)) === "[0,1]" && JSON.stringify(twoSum([3, 2, 4], 6)) === "[1,2]" && '+perf('const __a = Array.from({ length: 100000 }, (_, i) => i)','twoSum(__a, 199997)',400)+'.map(String).join() === "99998,99999,true"'},
  {t:'isAnagram ignores case and spaces: "Dormitory" and "Dirty room" are anagrams.',hint:'Lowercase, remove spaces, compare character counts.',x:'isAnagram("listen", "silent") && !isAnagram("rat", "car") && isAnagram("Dormitory", "Dirty room") && !isAnagram("aab", "abb")'},
  {t:'firstUniqueChar returns the index of the first non-repeating character, or -1.',hint:'Count every character, then scan again for the first count of 1.',x:'firstUniqueChar("leetcode") === 0 && firstUniqueChar("loveleetcode") === 2 && firstUniqueChar("aabb") === -1'},
  {t:'Why does a Map make twoSum O(n)?',o:['Maps sort the data','Checking whether a value was seen is O(1) on average instead of scanning the array again','Maps use less memory','It doesn\'t'],a:1,e:'One pass, with O(1) lookups along the way.'},
 ]},
{id:'a3',lvl:'Core structures',title:'Stacks, queues & linked lists',kind:'code',lang:'js',prelude:LIST_PRELUDE,starter:A3_START,
 sum:'A stack is last-in-first-out (push/pop), ideal for matching brackets, undo and depth-first search. A queue is first-in-first-out (enqueue/dequeue), ideal for breadth-first search and job processing. Avoid array.shift() for queues, because it is O(n). A linked list is nodes pointing to the next node; reversing one means re-pointing next with prev/current/next variables.',
 keys:['stack: push / pop (LIFO)','queue: enqueue / dequeue (FIFO)','brackets → stack','prev / current / next','O(1) dequeue (no shift)'],
 concept:`<div class="tbl-wrap"><table><tr><th>Structure</th><th>Order</th><th>Real examples</th></tr>
<tr><td><b>Stack</b></td><td>Last in, first out</td><td>Undo, browser back button, matching brackets, the call stack</td></tr>
<tr><td><b>Queue</b></td><td>First in, first out</td><td>Print jobs, background jobs, breadth-first search</td></tr>
<tr><td><b>Linked list</b></td><td>Nodes with <code>next</code> pointers</td><td>LRU caches, the internals of many structures</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">// Reverse a linked list: walk it, flipping each arrow
let prev = null, current = head;
while (current) {
  const next = current.next;
  current.next = prev;
  prev = current;
  current = next;
}
return prev;</pre>
<div class="tip"><b>Performance trap</b><code>array.shift()</code> moves every element, so it's O(n). A real queue keeps head and tail indexes.</div>`,
 tasks:[
  {t:'isValid checks that ()[]{} are balanced and properly nested (use a stack).',sol:A3_SOL,showSol:false,hint:'Push opening brackets; on a closing one, pop and check it matches.',x:'isValid("()[]{}") && isValid("{[()]}") && !isValid("([)]") && !isValid("(") && !isValid("]")'},
  {t:'reverseList reverses a linked list in place.',hint:'prev = null; while (current) { next = current.next; current.next = prev; prev = current; current = next; } return prev;',x:'JSON.stringify(toArray(reverseList(fromArray([1, 2, 3, 4])))) === "[4,3,2,1]" && reverseList(null) === null'},
  {t:'Build a Queue class with enqueue, dequeue and size (O(1) dequeue).',hint:'Store items in an object with head and tail indexes.',x:'(() => { const q = new Queue(); q.enqueue(1); q.enqueue(2); q.enqueue(3); const a = q.dequeue(); return a === 1 && q.size() === 2 && q.dequeue() === 2 && q.dequeue() === 3 && q.dequeue() === undefined; })() && '+perf('const __q = new Queue(); for (let i = 0; i < 200000; i++) __q.enqueue(i)','(() => { let s = 0; while (__q.size()) s += __q.dequeue(); return s; })()',400)+'[1]'},
  {t:'The browser\'s back button behaves like a…',o:['Queue','Stack','Hash map','Tree'],a:1,e:'The most recent page is the first one you go back to.'},
 ]},
{id:'a4',lvl:'Trees & graphs',title:'Trees, BFS & DFS',kind:'code',lang:'js',prelude:TREE_PRELUDE,starter:A4_START,
 sum:'Trees are naturally recursive: a node\'s depth is 1 + the deeper of its children, and an in-order traversal (left, node, right) of a binary search tree yields sorted values. Breadth-first search (BFS) explores level by level with a queue and finds shortest paths in unweighted graphs and grids. Depth-first search (DFS) goes deep with recursion or a stack and answers "is there a path?". Track visited nodes to avoid infinite loops.',
 keys:['recursion on left/right','in-order traversal → sorted BST','BFS + queue = shortest path','DFS + recursion/stack = reachability','visited set'],
 concept:`<p>A <b>tree</b> is nodes with children and no cycles: the DOM, your file system, a company org chart. A <b>graph</b> allows any connections: maps, social networks, dependency graphs.</p>
<pre class="snip" style="margin-bottom:12px">         8                 maxDepth = 4
       /   \\               inorder  = 1 3 4 6 7 8 10 13 14
      3     10
     / \\      \\
    1   6     14
       / \\    /
      4   7  13</pre>
<div class="tbl-wrap"><table><tr><th></th><th>BFS</th><th>DFS</th></tr><tr><td>Uses</td><td>A queue</td><td>Recursion or a stack</td></tr><tr><td>Explores</td><td>Level by level</td><td>As deep as possible first</td></tr><tr><td>Best for</td><td>Shortest path (unweighted)</td><td>Reachability, cycles, topological order</td></tr></table></div>
<p>Provided: <code>tree</code>, a 4×4 <code>GRID</code> (0 = open, 1 = wall), and a <code>ROUTES</code> adjacency list of cities.</p>`,
 tasks:[
  {t:'maxDepth(tree) returns 4.',sol:A4_SOL,showSol:false,hint:'if (!root) return 0; return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));',x:'maxDepth(tree) === 4 && maxDepth(null) === 0'},
  {t:'inorder(tree) returns the values sorted (it\'s a binary search tree).',hint:'Visit left subtree, then the node, then the right subtree.',x:'JSON.stringify(inorder(tree)) === "[1,3,4,6,7,8,10,13,14]"'},
  {t:'shortestPath(GRID, [0,0], [3,3]) returns 6 using BFS; unreachable targets return -1.',hint:'Queue of [row, col, steps]; mark visited; try the 4 neighbours that are open (0).',x:'shortestPath(GRID, [0, 0], [3, 3]) === 6 && shortestPath(GRID, [0, 0], [0, 2]) === 2 && shortestPath([[0, 1], [1, 0]], [0, 0], [1, 1]) === -1'},
  {t:'hasRoute(ROUTES, "Lagos", "Dakar") is true; Lagos to Nairobi is false (DFS).',hint:'Recurse into neighbours you haven\'t visited yet.',x:'hasRoute(ROUTES, "Lagos", "Dakar") === true && hasRoute(ROUTES, "Lagos", "Nairobi") === false && hasRoute(ROUTES, "Nairobi", "Kampala") === true'},
  {t:'Shortest path in an unweighted maze?',o:['DFS','BFS','Sorting','Binary search'],a:1,e:'BFS reaches every cell at distance d before any cell at distance d + 1.'},
 ]},
{id:'a5',lvl:'Algorithms',title:'Sorting, searching & recursion',kind:'code',lang:'js',starter:A5_START,timeout:6000,
 sum:'Binary search finds an item in a sorted array in O(log n) by halving the range each step. Merge sort splits an array in half, sorts each half recursively and merges them in O(n log n). Every recursion needs a base case. Naive recursive Fibonacci repeats work exponentially; memoization (caching results) makes it O(n). That is the core idea of dynamic programming.',
 keys:['binary search: lo / hi / mid','merge sort: split + merge','base case','memoization (Map cache)','O(log n) / O(n log n)'],
 concept:`<pre class="snip" style="margin-bottom:12px">// Binary search: O(log n)
let lo = 0, hi = arr.length - 1;
while (lo &lt;= hi) {
  const mid = (lo + hi) &gt;&gt; 1;
  if (arr[mid] === target) return mid;
  arr[mid] &lt; target ? (lo = mid + 1) : (hi = mid - 1);
}</pre>
<p><b>Recursion</b> = a function calling itself on a smaller problem, with a <b>base case</b> that stops it. Merge sort: sort the left half, sort the right half, merge them.</p>
<p>The starter <code>fib</code> recomputes the same values exponentially many times: fib(70) would take days. <b>Memoize</b> it by caching each result in a Map.</p>`,
 tasks:[
  {t:'binarySearch finds targets in O(log n): 100,000 lookups in a million items in under 0.3 s.',sol:A5_SOL,showSol:false,hint:'lo = 0, hi = n - 1; while (lo <= hi) { mid = (lo + hi) >> 1; … }',x:'binarySearch([1, 3, 5, 7, 9], 7) === 3 && binarySearch([1, 3, 5], 4) === -1 && binarySearch([], 1) === -1 && '+perf('const __a = Array.from({ length: 1000000 }, (_, i) => i * 2)','(() => { let f = 0; for (let k = 0; k < 100000; k++) if (binarySearch(__a, k * 6) >= 0) f++; return f; })()',300)+'.join() === "100000,true"'},
  {t:'mergeSort returns a new sorted array (no .sort()).',hint:'Split in half, mergeSort each half, then merge the two sorted halves.',x:'(() => { const a = Array.from({ length: 20000 }, () => Math.floor(Math.random() * 1e6)); const copy = a.slice(); const s = mergeSort(a); return JSON.stringify(s) === JSON.stringify(copy.slice().sort((x, y) => x - y)) && JSON.stringify(a) === JSON.stringify(copy); })()',c:ctx=>!/\.sort\(/.test(ctx.code.split('function mergeSort')[1]||'')},
  {t:'Memoize fib so fib(70) = 190392490709135 returns instantly.',hint:'const memo = new Map(); if (memo.has(n)) return memo.get(n); … memo.set(n, value);',x:'fib(10) === 55 && fib(70) === 190392490709135'},
  {t:'What happens if a recursive function has no base case?',o:['It returns undefined','It calls itself forever until the stack overflows','It runs once','It becomes a loop automatically'],a:1,e:'"Maximum call stack size exceeded". Always define when to stop.'},
 ]},
{id:'a6',lvl:'Interviews',title:'Interview patterns: sliding window & dynamic programming',kind:'code',lang:'js',starter:A6_START,
 sum:'Recognize patterns instead of memorizing answers. Sliding window keeps a moving range over an array or string (longest substring without repeats). The one-pass running minimum or maximum solves stock-profit style problems. Dynamic programming builds answers from smaller subproblems (climbStairs(n) = climbStairs(n-1) + climbStairs(n-2); coin change uses dp[x] = min(dp[x - coin] + 1)). In interviews: clarify, give examples, start with brute force, optimize, test edge cases.',
 keys:['sliding window: start/end pointers','running min/max','DP: dp[i] from smaller dp','base cases dp[0]','clarify → brute force → optimize → test'],
 concept:`<div class="tbl-wrap"><table><tr><th>Pattern</th><th>Signal in the question</th><th>Idea</th></tr>
<tr><td>Sliding window</td><td>"longest/shortest substring or subarray that…"</td><td>Grow the right edge, shrink the left when the rule breaks</td></tr>
<tr><td>One pass + running state</td><td>"best time to buy and sell"</td><td>Track the lowest price so far</td></tr>
<tr><td>Dynamic programming</td><td>"how many ways", "minimum number of…"</td><td>Answer for n from answers for smaller n</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">// Coin change: dp[x] = fewest coins to make x
dp[0] = 0
dp[x] = min over coins c of dp[x - c] + 1</pre>
<h4>In a live interview</h4><ol><li>Clarify the problem and constraints.</li><li>Work through an example by hand.</li><li>Say the brute-force solution and its Big-O.</li><li>Optimize, explaining your thinking out loud.</li><li>Test edge cases: empty input, one item, duplicates.</li></ol>`,
 tasks:[
  {t:'lengthOfLongestSubstring: "abcabcbb" → 3, "bbbbb" → 1, "pwwkew" → 3.',sol:A6_SOL,showSol:false,hint:'Map each char to its last index; move start past repeats; track the best window length.',x:'lengthOfLongestSubstring("abcabcbb") === 3 && lengthOfLongestSubstring("bbbbb") === 1 && lengthOfLongestSubstring("pwwkew") === 3 && lengthOfLongestSubstring("") === 0 && lengthOfLongestSubstring("abba") === 2'},
  {t:'maxProfit: [7,1,5,3,6,4] → 5; falling prices → 0.',hint:'Track the lowest price so far and the best price - lowest.',x:'maxProfit([7, 1, 5, 3, 6, 4]) === 5 && maxProfit([7, 6, 4, 3, 1]) === 0 && maxProfit([]) === 0'},
  {t:'climbStairs: 2 → 2, 5 → 8, and 45 → 1836311903 instantly.',hint:'ways(n) = ways(n - 1) + ways(n - 2); keep just two variables.',x:'climbStairs(1) === 1 && climbStairs(2) === 2 && climbStairs(5) === 8 && climbStairs(45) === 1836311903'},
  {t:'coinChange: [1,2,5] for 11 → 3; [2] for 3 → -1; amount 0 → 0.',hint:'dp = Array(amount + 1).fill(Infinity); dp[0] = 0; dp[x] = min(dp[x - c] + 1)',x:'coinChange([1, 2, 5], 11) === 3 && coinChange([2], 3) === -1 && coinChange([1], 0) === 0 && coinChange([186, 419, 83, 408], 6249) === 20'},
  {t:'In a live coding interview, what should you do first?',o:['Start typing the optimal solution','Clarify the problem and walk through an example','Ask for the answer','Stay silent and think'],a:1,e:'Interviewers grade your communication and process as much as the final code.'},
 ]},
],
quizzes:{dsa:[
 {q:'Looking up a key in a JavaScript Map is on average…',o:['O(n)','O(log n)','O(1)','O(n²)'],a:2,e:'Hash tables give constant-time average lookups.'},
 {q:'Which needs the input to be sorted?',o:['Linear search','Binary search','Hash lookup','BFS'],a:1,e:'Binary search relies on order to discard half each step.'},
 {q:'Matching brackets is a classic use of a…',o:['Queue','Stack','Heap','Graph'],a:1,e:'The most recent opening bracket must close first.'},
 {q:'Shortest path in an unweighted graph?',o:['DFS','BFS','Merge sort','Binary search'],a:1,e:'BFS explores by distance.'},
 {q:'Memoization means…',o:['Writing notes','Caching results of function calls so repeated inputs are instant','Sorting first','Using less memory'],a:1,e:'It turns exponential recursion into polynomial time.'},
 {q:'"Longest substring without repeating characters" suggests…',o:['Sliding window','Sorting','Binary search tree','Recursion only'],a:0,e:'A window that grows and shrinks over the string.'},
]},
real:[
 {id:'dsa-r1',t:'Solve 20 easy problems on LeetCode or NeetCode',p:'Follow the NeetCode roadmap order (arrays & hashing first). Time yourself and explain each solution out loud.',s:'# neetcode.io/roadmap'},
 {id:'dsa-r2',t:'Do 5 mock interviews',p:'Practise with a friend or on Pramp / interviewing.io: 45 minutes, talking through your thinking.',s:'# clarify → example → brute force → optimize → test'},
 {id:'dsa-r3',t:'Implement the core structures from scratch',p:'Write a Stack, Queue, LinkedList, BinarySearchTree and a graph BFS/DFS in your main language, with tests.',s:'npx vitest'},
 {id:'dsa-r4',t:'Keep a pattern journal',p:'For every problem, write the pattern, the key insight and the Big-O. Review it weekly.',s:'# e.g. "two sum → hash map of complements → O(n)"'},
]});
})();
