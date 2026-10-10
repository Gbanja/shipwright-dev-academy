/* Track 8: SQL & database design */
(()=>{
const SHOP=`CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, city TEXT NOT NULL, joined_at TEXT NOT NULL);
INSERT INTO customers VALUES
 (1,'Ada Lovelace','ada@example.com','London','2025-01-14'),
 (2,'Grace Hopper','grace@example.com','New York','2025-02-03'),
 (3,'Alan Turing','alan@example.com','Manchester','2025-02-20'),
 (4,'Chinua Achebe','chinua@example.com','Lagos','2025-03-11'),
 (5,'Ngozi Okafor','ngozi@example.com','Lagos','2025-04-02'),
 (6,'Kwame Mensah','kwame@example.com','Accra','2025-04-18'),
 (7,'Aya Traoré','aya@example.com','Abidjan','2025-05-09'),
 (8,'Linus Berg','linus@example.com','Stockholm','2025-06-30');
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT NOT NULL, category TEXT NOT NULL, price REAL NOT NULL);
INSERT INTO products VALUES
 (1,'Mechanical Keyboard','Accessories',89.0),(2,'Wireless Mouse','Accessories',25.0),(3,'USB-C Hub','Accessories',39.0),
 (4,'27-inch Monitor','Displays',229.0),(5,'Laptop Stand','Office',32.0),(6,'Desk Lamp','Office',18.0),
 (7,'Noise-cancelling Headphones','Audio',199.0),(8,'Webcam','Accessories',59.0),(9,'Mouse Pad','Accessories',9.0),
 (10,'Portable Speaker','Audio',45.0),(11,'Ergonomic Chair','Office',349.0);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER NOT NULL REFERENCES customers(id), status TEXT NOT NULL, created_at TEXT NOT NULL);
INSERT INTO orders VALUES
 (1,1,'delivered','2025-03-01'),(2,1,'delivered','2025-05-12'),(3,2,'shipped','2025-06-02'),(4,4,'delivered','2025-04-20'),
 (5,4,'cancelled','2025-05-01'),(6,5,'pending','2025-07-07'),(7,6,'delivered','2025-06-15'),(8,3,'shipped','2025-07-01'),(9,7,'pending','2025-07-20');
CREATE TABLE order_items (order_id INTEGER NOT NULL REFERENCES orders(id), product_id INTEGER NOT NULL REFERENCES products(id), qty INTEGER NOT NULL, unit_price REAL NOT NULL);
INSERT INTO order_items VALUES
 (1,1,1,89.0),(1,9,1,9.0),(2,4,1,229.0),(3,2,2,25.0),(3,5,1,32.0),(4,7,1,199.0),(5,6,2,18.0),(6,3,1,39.0),(6,8,1,59.0),
 (7,10,1,45.0),(7,2,1,25.0),(8,1,1,89.0),(9,5,1,32.0),(9,6,1,18.0);
`;
const EVENTS=`CREATE TABLE events (id INTEGER PRIMARY KEY, user_email TEXT NOT NULL, type TEXT NOT NULL, created_at TEXT NOT NULL);
WITH RECURSIVE n(i) AS (SELECT 1 UNION ALL SELECT i + 1 FROM n WHERE i < 20000)
INSERT INTO events (user_email, type, created_at)
SELECT 'user' || (i % 500) || '@example.com',
       CASE i % 3 WHEN 0 THEN 'login' WHEN 1 THEN 'view' ELSE 'purchase' END,
       date('2025-01-01', '+' || (i % 300) || ' days')
FROM n;
`;
const BANK=`CREATE TABLE accounts (id INTEGER PRIMARY KEY, owner TEXT NOT NULL, balance INTEGER NOT NULL CHECK (balance >= 0));
INSERT INTO accounts VALUES (1, 'Ada', 500), (2, 'Grace', 300);
CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE);
INSERT INTO users (email) VALUES ('ada@example.com');
`;
const nv=v=>typeof v==='number'?Math.round(v*100)/100:v;
const rowsOf=r=>r?r.values.map(row=>JSON.stringify(row.map(nv))):[];
function same(ctx,ref,ordered){if(!ctx.last||ctx.err)return false;let exp;try{exp=ctx.db.exec(ref)[0]}catch(e){return false}const a=rowsOf(ctx.last),b=rowsOf(exp);if(!b.length||a.length!==b.length)return false;if(ctx.last.columns.length!==exp.columns.length)return false;if(ordered)return a.every((x,i)=>x===b[i]);return a.slice().sort().join('|')===b.slice().sort().join('|')}
const has=(ctx,re)=>re.test(ctx.code||'');
const plan=(ctx,q)=>{try{return (ctx.db.exec('EXPLAIN QUERY PLAN '+q)[0]||{values:[]}).values.map(v=>v[v.length-1]).join(' | ')}catch(e){return ''}};
const O=()=>OPS.st,H=re=>OPS.Hx(re);
defineTrack({id:'sql',name:'SQL & database design',weeks:'3 weeks',
lessons:[
{id:'s1',lvl:'Querying',title:'SELECT, filtering, sorting & aggregates',kind:'code',lang:'sql',seed:SHOP,starter:`-- Tables: customers, products, orders, order_items
-- Run one query per task. The checker reads the result of your LAST statement.

SELECT * FROM customers;
`,
 sum:'SELECT picks columns, FROM picks the table, WHERE filters rows, ORDER BY sorts (DESC for highest first), and LIMIT caps the count. Aggregates (COUNT, SUM, AVG, MIN, MAX) with GROUP BY summarize groups; HAVING filters groups after aggregation, while WHERE filters rows before it.',
 keys:['SELECT col FROM t WHERE ...','ORDER BY col DESC','COUNT(*) / SUM / AVG','GROUP BY col','HAVING AVG(x) > 40','WHERE filters rows, HAVING filters groups'],
 concept:`<p>SQL is how almost every application talks to its data. The order you <i>write</i> a query in:</p>
<pre class="snip" style="margin-bottom:12px">SELECT   category, AVG(price) AS avg_price   -- 5. pick columns
FROM     products                            -- 1. choose the table
WHERE    price &gt; 10                          -- 2. filter rows
GROUP BY category                            -- 3. make groups
HAVING   AVG(price) &gt; 40                     -- 4. filter groups
ORDER BY avg_price DESC                      -- 6. sort
LIMIT    3;                                  -- 7. cap</pre>
<p>The numbers show the order the database <i>runs</i> it in. That's why you can't use a SELECT alias in WHERE, but you can in ORDER BY.</p>
<p>The database is a small shop: <code>customers</code>, <code>products</code>, <code>orders</code>, <code>order_items</code>. It is reset every time you press Run. Click Run on the starter to see the customers.</p>`,
 tasks:[
  {t:'Show the name and city of customers who live in Lagos.',sol:"SELECT name, city FROM customers WHERE city = 'Lagos';",c:ctx=>same(ctx,"SELECT name, city FROM customers WHERE city = 'Lagos'")},
  {t:'Show the name and price of products under $50, most expensive first.',sol:'SELECT name, price FROM products WHERE price < 50 ORDER BY price DESC;',c:ctx=>same(ctx,'SELECT name, price FROM products WHERE price < 50 ORDER BY price DESC',true)},
  {t:'Count the orders in each status (columns: status, count).',sol:'SELECT status, COUNT(*) AS orders FROM orders GROUP BY status;',c:ctx=>same(ctx,'SELECT status, COUNT(*) FROM orders GROUP BY status')},
  {t:'Show each category\'s average price, keeping only categories averaging over $40 (use HAVING).',sol:'SELECT category, AVG(price) AS avg_price FROM products GROUP BY category HAVING AVG(price) > 40;',c:ctx=>has(ctx,/HAVING/i)&&same(ctx,'SELECT category, AVG(price) FROM products GROUP BY category HAVING AVG(price) > 40')},
  {t:'You want categories with more than 3 products. Where does that condition go?',o:['WHERE COUNT(*) > 3','HAVING COUNT(*) > 3','ORDER BY COUNT(*) > 3','LIMIT 3'],a:1,e:'Conditions on aggregates go in HAVING, because WHERE runs before the groups exist.'},
 ]},
{id:'s2',lvl:'Querying',title:'Joins & subqueries',kind:'code',lang:'sql',seed:SHOP,starter:`-- orders.customer_id → customers.id
-- order_items.order_id → orders.id, order_items.product_id → products.id

SELECT * FROM orders;
`,
 sum:'JOIN combines rows from related tables using a key: INNER JOIN keeps only matches, LEFT JOIN keeps every row from the left table and fills missing matches with NULL (so WHERE right.id IS NULL finds rows with no match). Chain joins across several tables, then GROUP BY to total them. Subqueries (WHERE id NOT IN (SELECT ...)) answer "which rows are not in that set".',
 keys:['JOIN t ON t.id = x.t_id','LEFT JOIN ... WHERE right.id IS NULL','SUM(qty * unit_price)','multi-table joins','NOT IN (SELECT ...) / NOT EXISTS','table aliases'],
 concept:`<p>Data is split across tables so nothing is duplicated. <b>Joins</b> put it back together.</p>
<div class="tbl-wrap"><table><tr><th>Join</th><th>Keeps</th></tr><tr><td><code>INNER JOIN</code></td><td>Only rows that match on both sides</td></tr><tr><td><code>LEFT JOIN</code></td><td>Every left row; right columns are NULL when nothing matches</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">SELECT c.name, SUM(oi.qty * oi.unit_price) AS total
FROM customers c
JOIN orders o       ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id   = o.id
WHERE o.status = 'delivered'
GROUP BY c.id
ORDER BY total DESC;</pre>
<div class="tip"><b>Finding what's missing</b><code>LEFT JOIN … WHERE o.id IS NULL</code> is the classic way to find customers with no orders, products never sold, and so on.</div>`,
 tasks:[
  {t:'List every order\'s id, the customer\'s name, and the status.',sol:'SELECT o.id, c.name, o.status FROM orders o JOIN customers c ON c.id = o.customer_id;',c:ctx=>has(ctx,/JOIN/i)&&same(ctx,'SELECT o.id, c.name, o.status FROM orders o JOIN customers c ON c.id = o.customer_id')},
  {t:'Find customers who have never ordered (LEFT JOIN + IS NULL).',sol:'SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL;',c:ctx=>has(ctx,/LEFT\s+(OUTER\s+)?JOIN/i)&&same(ctx,'SELECT c.name FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL')},
  {t:'Total spent per customer on delivered orders, highest first (name, total).',sol:"SELECT c.name, SUM(oi.qty * oi.unit_price) AS total\nFROM customers c\nJOIN orders o ON o.customer_id = c.id\nJOIN order_items oi ON oi.order_id = o.id\nWHERE o.status = 'delivered'\nGROUP BY c.id\nORDER BY total DESC;",c:ctx=>same(ctx,"SELECT c.name, SUM(oi.qty * oi.unit_price) AS total FROM customers c JOIN orders o ON o.customer_id = c.id JOIN order_items oi ON oi.order_id = o.id WHERE o.status = 'delivered' GROUP BY c.id ORDER BY total DESC",true)},
  {t:'Find products that have never been ordered, using a subquery.',sol:'SELECT name FROM products WHERE id NOT IN (SELECT product_id FROM order_items);',c:ctx=>has(ctx,/NOT\s+IN|NOT\s+EXISTS|LEFT\s+JOIN/i)&&same(ctx,'SELECT name FROM products WHERE id NOT IN (SELECT product_id FROM order_items)')},
  {t:'You need every customer, including those without orders, with their order count. Which join?',o:['INNER JOIN','LEFT JOIN from customers to orders','CROSS JOIN','No join'],a:1,e:'LEFT JOIN keeps customers with zero orders; COUNT(o.id) then counts 0 for them.'},
 ]},
{id:'s3',lvl:'Design',title:'Schema design & normalization',kind:'code',lang:'sql',seed:'',starter:`-- Design a database for a small bookshop.
-- Every Run starts from an empty database, so keep all your statements in this file.

`,
 sum:'Good schemas store each fact once (normalization). Every table gets a primary key; relationships use foreign keys (author_id INTEGER REFERENCES authors(id)). One-to-many puts the foreign key on the "many" side; many-to-many needs a join table (book_tags) whose primary key is the pair of foreign keys. Use NOT NULL and UNIQUE to let the database enforce your rules.',
 keys:['PRIMARY KEY','REFERENCES other(id)','one-to-many: FK on the many side','many-to-many: join table','PRIMARY KEY (book_id, tag_id)','NOT NULL / UNIQUE'],
 concept:`<p>Bad schema design causes bugs for years. The core rules:</p>
<ul><li><b>One fact, one place.</b> Don't copy an author's name into every book row. Store authors once and reference them.</li>
<li><b>One-to-many</b> (an author has many books): put <code>author_id</code> on <code>books</code>.</li>
<li><b>Many-to-many</b> (books ↔ tags): add a join table with both foreign keys.</li>
<li><b>Let the database enforce rules</b> with <code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code> and <code>REFERENCES</code>.</li></ul>
<pre class="snip" style="margin-bottom:12px">CREATE TABLE book_tags (
  book_id INTEGER NOT NULL REFERENCES books(id),
  tag_id  INTEGER NOT NULL REFERENCES tags(id),
  PRIMARY KEY (book_id, tag_id)          -- a book can't get the same tag twice
);</pre>
<div class="tip"><b>Smell test</b>A column holding <code>"fantasy,classic,award"</code> is a missing table. You can't index it, join it or validate it.</div>`,
 tasks:[
  {t:'Create authors (id primary key, name NOT NULL, country).',sol:`CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT
);`,c:ctx=>{const cols=ctx.q("SELECT name, \"notnull\" AS nn, pk FROM pragma_table_info('authors')");return cols.some(c=>c.name==='id'&&c.pk)&&cols.some(c=>c.name==='name'&&c.nn)}},
  {t:'Create books with title NOT NULL, published_year, and author_id referencing authors.',sol:`CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT
);

CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  published_year INTEGER,
  author_id INTEGER NOT NULL REFERENCES authors(id)
);`,c:ctx=>ctx.q("SELECT \"table\" AS t FROM pragma_foreign_key_list('books')").some(r=>r.t==='authors')},
  {t:'Model many-to-many tags: a tags table (unique name) and a book_tags join table keyed by both ids.',sol:`CREATE TABLE authors (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT
);

CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  published_year INTEGER,
  author_id INTEGER NOT NULL REFERENCES authors(id)
);

CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE book_tags (
  book_id INTEGER NOT NULL REFERENCES books(id),
  tag_id INTEGER NOT NULL REFERENCES tags(id),
  PRIMARY KEY (book_id, tag_id)
);`,c:ctx=>{const fk=ctx.q("SELECT \"table\" AS t FROM pragma_foreign_key_list('book_tags')").map(r=>r.t);const pk=ctx.q("SELECT name FROM pragma_table_info('book_tags') WHERE pk > 0");const uq=ctx.q("SELECT \"unique\" AS u FROM pragma_index_list('tags')");return fk.includes('books')&&fk.includes('tags')&&pk.length===2&&uq.some(r=>r.u)}},
  {t:'Insert a few books and tags, then list each book title with its tag names.',sol:`CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT NOT NULL, country TEXT);
CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, published_year INTEGER, author_id INTEGER NOT NULL REFERENCES authors(id));
CREATE TABLE tags (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);
CREATE TABLE book_tags (book_id INTEGER NOT NULL REFERENCES books(id), tag_id INTEGER NOT NULL REFERENCES tags(id), PRIMARY KEY (book_id, tag_id));

INSERT INTO authors VALUES (1, 'Chinua Achebe', 'Nigeria'), (2, 'Ursula K. Le Guin', 'USA');
INSERT INTO books VALUES (1, 'Things Fall Apart', 1958, 1), (2, 'A Wizard of Earthsea', 1968, 2);
INSERT INTO tags VALUES (1, 'classic'), (2, 'fantasy');
INSERT INTO book_tags VALUES (1, 1), (2, 1), (2, 2);

SELECT b.title, t.name AS tag
FROM books b
JOIN book_tags bt ON bt.book_id = b.id
JOIN tags t ON t.id = bt.tag_id
ORDER BY b.title;`,c:ctx=>!ctx.err&&ctx.last&&ctx.last.values.length>=2&&ctx.last.columns.length===2&&has(ctx,/JOIN\s+book_tags/i)},
  {t:'Why is a tags column like "fantasy,classic" a bad design?',o:['It uses too much storage','You can\'t reliably index, join, validate or rename tags; the data belongs in its own table','SQL doesn\'t allow commas','It is fine'],a:1,e:'Separate rows let the database enforce and query the relationship.'},
 ]},
{id:'s4',lvl:'Performance',title:'Indexes & query plans',kind:'code',lang:'sql',seed:EVENTS,starter:`-- events has 20,000 rows. Find out how SQLite runs a query, then make it fast.

EXPLAIN QUERY PLAN
SELECT * FROM events WHERE user_email = 'user42@example.com';
`,
 sum:'Without an index the database reads every row (SCAN). An index on the filtered column lets it jump straight to matches (SEARCH ... USING INDEX). Read plans with EXPLAIN QUERY PLAN (EXPLAIN ANALYZE in Postgres). A composite index (user_email, created_at) serves queries filtering on its leftmost columns. Indexes speed up reads but slow writes and use space, so add them for real query patterns.',
 keys:['EXPLAIN QUERY PLAN','SCAN vs SEARCH','CREATE INDEX idx ON t(col)','composite index (a, b)','leftmost prefix rule','indexes cost writes + space'],
 concept:`<p>An <b>index</b> is like the index at the back of a book: instead of reading every page, you jump to the right one.</p>
<pre class="snip" style="margin-bottom:12px">EXPLAIN QUERY PLAN SELECT * FROM events WHERE user_email = 'x';
-- SCAN events                       ← reads all 20,000 rows

CREATE INDEX idx_events_user_email ON events(user_email);
-- SEARCH events USING INDEX idx_events_user_email (user_email=?)</pre>
<h4>Composite indexes</h4>
<p><code>CREATE INDEX … ON events(user_email, created_at)</code> helps <code>WHERE user_email = ? AND created_at &gt;= ?</code>, and also queries on <code>user_email</code> alone. It does <b>not</b> help a query filtering only on <code>created_at</code>: indexes work from the <b>leftmost</b> column.</p>
<div class="tip"><b>Postgres</b>The same idea with <code>EXPLAIN ANALYZE</code>, which also shows real timings. Look for "Seq Scan" on big tables.</div>`,
 tasks:[
  {t:'Run the plan and see SQLite SCAN the whole events table.',c:ctx=>has(ctx,/EXPLAIN\s+QUERY\s+PLAN/i)&&ctx.last&&/SCAN/.test(JSON.stringify(ctx.last.values))},
  {t:'Create an index on events(user_email) and see the plan switch to SEARCH ... USING INDEX.',sol:`CREATE INDEX idx_events_user_email ON events(user_email);

EXPLAIN QUERY PLAN
SELECT * FROM events WHERE user_email = 'user42@example.com';`,c:ctx=>/USING (COVERING )?INDEX/.test(plan(ctx,"SELECT * FROM events WHERE user_email = 'user42@example.com'"))},
  {t:'Create a composite index for WHERE user_email = ? AND created_at >= ?.',sol:`CREATE INDEX idx_events_user_date ON events(user_email, created_at);

EXPLAIN QUERY PLAN
SELECT * FROM events
WHERE user_email = 'user42@example.com' AND created_at >= '2025-06-01';`,c:ctx=>{const idx=ctx.q("SELECT name FROM pragma_index_list('events')").map(r=>r.name);return idx.some(n=>{const cols=ctx.q("SELECT name FROM pragma_index_info('"+n+"') ORDER BY seqno").map(r=>r.name);return cols[0]==='user_email'&&cols[1]==='created_at'})}},
  {t:'With an index on (user_email, created_at), which query can NOT use it efficiently?',o:["WHERE user_email = 'a'","WHERE user_email = 'a' AND created_at > '2025-01-01'","WHERE created_at > '2025-01-01'","WHERE user_email = 'a' ORDER BY created_at"],a:2,e:'Composite indexes are sorted by the first column first, so filtering only on the second column can\'t use it.'},
  {t:'Why not index every column?',o:['SQL forbids it','Every index must be updated on each INSERT/UPDATE/DELETE and takes disk space','Indexes make SELECTs slower','Only one index per table is allowed'],a:1,e:'Index the columns your real queries filter, join and sort on.'},
 ]},
{id:'s5',lvl:'Reliability',title:'Transactions & constraints',kind:'code',lang:'sql',seed:BANK,starter:`-- accounts(id, owner, balance CHECK balance >= 0); users(email UNIQUE)

SELECT * FROM accounts;
`,
 sum:'A transaction groups statements so they all succeed or none do: BEGIN; ... COMMIT; or ROLLBACK; to undo. That is the A in ACID (atomic); a money transfer must never debit one account without crediting the other. Constraints (CHECK, UNIQUE, NOT NULL, FOREIGN KEY) make the database reject invalid data no matter which code path sends it.',
 keys:['BEGIN;','COMMIT;','ROLLBACK;','CHECK (balance >= 0)','UNIQUE','ACID: atomic, consistent, isolated, durable'],
 concept:`<p>Moving $200 from Ada to Grace takes two updates. If the server crashes between them, money vanishes. Transactions prevent that:</p>
<pre class="snip" style="margin-bottom:12px">BEGIN;
UPDATE accounts SET balance = balance - 200 WHERE id = 1;
UPDATE accounts SET balance = balance + 200 WHERE id = 2;
COMMIT;            -- or ROLLBACK; to undo everything since BEGIN</pre>
<div class="tbl-wrap"><table><tr><th>ACID</th><th>Means</th></tr><tr><td><b>A</b>tomic</td><td>All statements happen, or none</td></tr><tr><td><b>C</b>onsistent</td><td>Constraints always hold</td></tr><tr><td><b>I</b>solated</td><td>Concurrent transactions don't see each other's half-done work</td></tr><tr><td><b>D</b>urable</td><td>Once committed, it survives crashes</td></tr></table></div>
<p><b>Constraints</b> are your last line of defense. <code>CHECK (balance &gt;= 0)</code> stops overdrafts even if your app has a bug.</p>`,
 tasks:[
  {t:'Transfer 200 from Ada (id 1) to Grace (id 2) inside a transaction.',sol:`BEGIN;
UPDATE accounts SET balance = balance - 200 WHERE id = 1;
UPDATE accounts SET balance = balance + 200 WHERE id = 2;
COMMIT;

SELECT * FROM accounts;`,c:ctx=>{const r=ctx.q('SELECT id, balance FROM accounts ORDER BY id');return has(ctx,/BEGIN/i)&&has(ctx,/COMMIT/i)&&r[0]&&r[0].balance===300&&r[1].balance===500}},
  {t:'Try to take 1000 from Ada and see the CHECK constraint reject it.',sol:`UPDATE accounts SET balance = balance - 1000 WHERE id = 1;`,c:ctx=>/CHECK constraint failed/i.test(ctx.err||'')},
  {t:'Insert a duplicate email into users and see UNIQUE reject it.',sol:`INSERT INTO users (email) VALUES ('ada@example.com');`,c:ctx=>/UNIQUE constraint failed/i.test(ctx.err||'')},
  {t:'Start a transaction, change Ada\'s balance, then ROLLBACK. The change disappears.',sol:`BEGIN;
UPDATE accounts SET balance = 0 WHERE id = 1;
ROLLBACK;

SELECT * FROM accounts;`,c:ctx=>has(ctx,/ROLLBACK/i)&&!ctx.err&&ctx.q('SELECT balance FROM accounts WHERE id = 1')[0].balance===500},
  {t:'"Atomic" in ACID means…',o:['Very fast','All statements in a transaction take effect, or none do','Each row is locked','Data is encrypted'],a:1,e:'Atomicity is why a transfer can\'t half-happen.'},
 ]},
{id:'s6',lvl:'Beyond SQL',title:'Postgres, MySQL & NoSQL (Redis)',kind:'ops',
 intro:'This terminal has redis-cli. Redis is an in-memory key-value store, used for caching, sessions, counters and queues.',
 sum:'Default to a relational database (Postgres is the modern favourite; MySQL is everywhere too) for your main data. Add Redis, an in-memory key-value store, for caches and sessions (SET key value EX seconds), counters (INCR), queues (LPUSH / RPOP) and rate limits. Document databases like MongoDB fit flexible, nested documents, but you give up joins and some constraints.',
 keys:['redis-cli SET k v EX 60','GET / DEL','TTL','INCR','LPUSH / LRANGE','HSET / HGETALL','Postgres by default'],
 concept:`<div class="tbl-wrap"><table><tr><th>Database</th><th>Type</th><th>Great for</th></tr>
<tr><td><b>PostgreSQL</b></td><td>Relational</td><td>Your main data: rich SQL, strong consistency, JSON columns too</td></tr>
<tr><td><b>MySQL</b></td><td>Relational</td><td>Same job; huge install base (WordPress, many PHP apps)</td></tr>
<tr><td><b>Redis</b></td><td>In-memory key-value</td><td>Caching, sessions, counters, queues, rate limits</td></tr>
<tr><td><b>MongoDB</b></td><td>Document</td><td>Flexible nested documents when the schema really varies</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">SET session:42 "ada" EX 60     # expires after 60 seconds
INCR page:views                # atomic counter
LPUSH jobs "send-email:7"      # push onto a queue
HSET user:1 name Ada city London</pre>
<div class="tip"><b>Rule of thumb</b>Start with Postgres. Add Redis when you have a caching or queueing need. Don't pick a database because it's trendy.</div>`,
 tasks:[
  {t:'Store and read a key.',h:'redis-cli SET greeting "hello"\nredis-cli GET greeting',c:()=>O().redis.data.greeting==='hello'&&H(/redis-cli GET greeting/i)},
  {t:'Cache a session for 60 seconds, check its TTL, wait it out, and see it vanish.',h:'redis-cli SET session:42 "ada" EX 60\nredis-cli TTL session:42\nsleep 61\nredis-cli GET session:42',c:()=>H(/SET session:42 .* EX 60/i)&&H(/^sleep (6[1-9]|[7-9]\d|\d{3,})/)&&H(/GET session:42/i)&&!('session:42' in O().redis.data)},
  {t:'Count page views with INCR three times.',h:'redis-cli INCR page:views\nredis-cli INCR page:views\nredis-cli INCR page:views',c:()=>O().redis.data['page:views']==='3'},
  {t:'Push two jobs onto a queue and list them.',h:'redis-cli LPUSH jobs "send-email:7"\nredis-cli LPUSH jobs "resize-image:12"\nredis-cli LRANGE jobs 0 -1',c:()=>Array.isArray(O().redis.data.jobs)&&O().redis.data.jobs.length>=2&&H(/LRANGE jobs/i)},
  {t:'Your app shows a slow, rarely-changing product list on every page. Where do you add Redis?',o:['Replace Postgres with Redis','Cache the product list in Redis with an expiry, and keep Postgres as the source of truth','Store passwords in Redis','Redis can\'t help'],a:1,e:'Cache-aside: read from Redis, fall back to Postgres on a miss, and set a TTL.'},
  {t:'Starting a new web app with users, orders and payments. Default main database?',o:['MongoDB','Redis','PostgreSQL','A JSON file'],a:2,e:'Relational data with strong consistency is what Postgres is built for.'},
 ]},
],
quizzes:{sql:[
 {q:'WHERE vs HAVING?',o:['Same thing','WHERE filters rows before grouping; HAVING filters groups after aggregation','HAVING is faster','WHERE only works with numbers'],a:1,e:'Aggregates like COUNT(*) belong in HAVING.'},
 {q:'Find customers with no orders. Best approach?',o:['INNER JOIN','LEFT JOIN orders and WHERE orders.id IS NULL','CROSS JOIN','ORDER BY'],a:1,e:'Unmatched left rows have NULLs on the right side.'},
 {q:'An author has many books. Where does the foreign key go?',o:['authors.book_id','books.author_id','A tags table','Both'],a:1,e:'The "many" side holds the foreign key.'},
 {q:'EXPLAIN shows "SCAN" on a huge table for WHERE email = ?. Fix?',o:['Add more RAM','CREATE INDEX on email','Use LIMIT','Rewrite in NoSQL'],a:1,e:'An index turns a full scan into a search.'},
 {q:'Which guarantees a transfer never half-completes?',o:['An index','A transaction (BEGIN ... COMMIT)','A view','A UNIQUE constraint'],a:1,e:'Atomicity.'},
 {q:'Good default use for Redis?',o:['Main database for orders','Caching and sessions with expiry','Storing file uploads','Full-text search only'],a:1,e:'In-memory, fast, with TTLs.'},
]},
real:[
 {id:'sql-r1',t:'Run Postgres locally with Docker',p:'Start Postgres in a container and connect with psql (or a GUI like TablePlus or DBeaver).',s:'docker run -d --name pg -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres:16\ndocker exec -it pg psql -U postgres'},
 {id:'sql-r2',t:'Practise on a real dataset',p:'Load a sample database (Postgres "pagila" or SQLite "chinook") and write 10 queries using joins and aggregates.',s:'# chinook for SQLite: https://github.com/lerocha/chinook-database'},
 {id:'sql-r3',t:'Find and fix a slow query',p:'In one of your apps, run EXPLAIN ANALYZE on the slowest query, add an index, and compare.',s:'EXPLAIN ANALYZE SELECT ...;\nCREATE INDEX CONCURRENTLY idx_name ON table(col);'},
 {id:'sql-r4',t:'Try Redis',p:'Run Redis in Docker and use it as a cache in one app.',s:'docker run -d --name redis -p 6379:6379 redis:7\ndocker exec -it redis redis-cli'},
]});
})();
