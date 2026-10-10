/* Projects: SQL & database design */
(()=>{
const nv=v=>typeof v==='number'?Math.round(v*100)/100:v;
const norm=rows=>rows.map(r=>JSON.stringify(r.map(nv)));
/* does any result set in this run equal the expected rows? */
function found(ctx,exp,ordered){const e=norm(exp);return (ctx.results||[]).some(r=>{if(!r.values.length||r.columns.length!==exp[0].length||r.values.length!==exp.length)return false;const a=norm(r.values);return ordered?a.every((x,i)=>x===e[i]):[...a].sort().join('|')===[...e].sort().join('|')})}
/* explain how the closest result differs, without giving the answer away */
function closest(ctx,exp,ordered,what){const rs=(ctx.results||[]).filter(r=>r.columns.length===exp[0].length);if(ctx.err)return 'Your file stopped with an error: '+ctx.err.split('\n')[0]+'. Statements after the error never ran.';if(!rs.length)return 'None of your queries returns '+exp[0].length+' column'+(exp[0].length>1?'s':'')+' ('+what+').';const e=norm(exp);let best=null,score=-1;for(const r of rs){const a=norm(r.values);const hit=a.filter(x=>e.includes(x)).length;if(hit>score){score=hit;best=r}}
 const a=norm(best.values);if(best.values.length!==exp.length)return 'Your closest query returns '+best.values.length+' row'+(best.values.length===1?'':'s')+'; the answer has '+exp.length+'. '+(best.values.length<exp.length?'Rows are missing: an inner JOIN drops rows with no match, and WHERE filters before grouping.':'There are extra rows: check your WHERE filter and your GROUP BY.');
 if(ordered&&[...a].sort().join('|')===[...e].sort().join('|'))return 'Right rows, wrong order. Add ORDER BY.';return 'Your closest query has the right number of rows, but '+(exp.length-score)+' of them have different values. Check which rows you filter on and how you aggregate.'}
const plan=(ctx,q)=>{try{return (ctx.db.exec('EXPLAIN QUERY PLAN '+q)[0]||{values:[]}).values.map(v=>v[v.length-1]).join(' | ')}catch(e){return ''}};
const sameWidth=(ctx,exp)=>(ctx.results||[]).some(r=>r.columns.length===exp[0].length);
const tableSql=(ctx,t)=>((ctx.q("SELECT sql FROM sqlite_master WHERE type='table' AND name='"+t+"'")[0]||{}).sql)||'';

/* ---------- guided: event ticketing ---------- */
const T1=`CREATE TABLE venues (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL
);

CREATE TABLE events (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  venue_id INTEGER NOT NULL REFERENCES venues(id),
  starts_at TEXT NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0)
);
`;
const T2=`
CREATE TABLE tickets (
  id INTEGER PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id),
  buyer_email TEXT NOT NULL,
  price INTEGER NOT NULL CHECK (price >= 0),
  UNIQUE (event_id, buyer_email)
);
`;
const T3=`
INSERT INTO venues (id, name, city) VALUES
  (1, 'Eko Hall', 'Lagos'), (2, 'Small Room', 'Accra');
INSERT INTO events (id, title, venue_id, starts_at, capacity) VALUES
  (1, 'JS Conf', 1, '2026-11-02', 4),
  (2, 'Python Meetup', 2, '2026-11-09', 2),
  (3, 'Design Night', 2, '2026-11-20', 10);
INSERT INTO tickets (event_id, buyer_email, price) VALUES
  (1, 'ada@example.com', 50), (1, 'grace@example.com', 50), (1, 'alan@example.com', 30),
  (2, 'ada@example.com', 20), (2, 'linus@example.com', 20);
`;
const T4=`
-- Tickets sold and revenue per event, including events with no sales
SELECT e.title, COUNT(t.id) AS sold, COALESCE(SUM(t.price), 0) AS revenue
FROM events e
LEFT JOIN tickets t ON t.event_id = e.id
GROUP BY e.id
ORDER BY revenue DESC;
`;
const T5=`
-- Events that are more than half sold
SELECT e.title, COUNT(t.id) AS sold, e.capacity
FROM events e
JOIN tickets t ON t.event_id = e.id
GROUP BY e.id
HAVING COUNT(t.id) * 2 > e.capacity;
`;
const T6=`
CREATE INDEX idx_tickets_buyer ON tickets (buyer_email);
EXPLAIN QUERY PLAN SELECT * FROM tickets WHERE buyer_email = 'ada@example.com';
`;

/* ---------- solo: SaaS analytics ---------- */
const SAAS=`CREATE TABLE plans (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE, price INTEGER NOT NULL);
INSERT INTO plans VALUES (1,'Starter',9),(2,'Pro',20),(3,'Business',49);
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, country TEXT NOT NULL);
INSERT INTO customers VALUES
 (1,'Amara Obi','amara@example.com','NG'),(2,'Ben Carter','ben@example.com','UK'),(3,'Chen Wei','chen@example.com','SG'),
 (4,'Dana Kowalski','dana@example.com','PL'),(5,'Elif Demir','elif@example.com','TR'),(6,'Femi Adeyemi','femi@example.com','NG'),
 (7,'Gita Rao','gita@example.com','IN'),(8,'Hugo Silva','hugo@example.com','BR');
CREATE TABLE subscriptions (id INTEGER PRIMARY KEY, customer_id INTEGER NOT NULL REFERENCES customers(id), plan_id INTEGER NOT NULL REFERENCES plans(id), status TEXT NOT NULL, started_at TEXT NOT NULL, cancelled_at TEXT);
INSERT INTO subscriptions VALUES
 (1,1,2,'active','2026-01-10',NULL),(2,2,1,'active','2026-02-01',NULL),(3,3,3,'active','2026-02-15',NULL),
 (4,4,2,'cancelled','2026-01-05','2026-04-20'),(5,5,1,'cancelled','2026-03-01','2026-04-02'),(6,6,2,'active','2026-05-11',NULL),
 (7,7,3,'cancelled','2026-02-20','2026-06-30'),(8,8,2,'active','2026-06-01',NULL),(9,4,1,'active','2026-05-01',NULL);
CREATE TABLE payments (id INTEGER PRIMARY KEY, customer_id INTEGER NOT NULL REFERENCES customers(id), amount INTEGER NOT NULL, paid_at TEXT NOT NULL);
INSERT INTO payments (customer_id, amount, paid_at) VALUES
 (1,20,'2026-01-10'),(1,20,'2026-02-10'),(1,20,'2026-03-10'),(2,9,'2026-02-01'),(2,9,'2026-03-01'),(3,49,'2026-02-15'),(3,49,'2026-03-15'),
 (4,20,'2026-01-05'),(4,20,'2026-02-05'),(4,20,'2026-03-05'),(4,9,'2026-05-01'),(5,9,'2026-03-01'),(6,20,'2026-05-11'),
 (7,49,'2026-02-20'),(7,49,'2026-03-20'),(7,49,'2026-04-20'),(7,49,'2026-05-20');
`;
const MRR=[['Pro',60],['Business',49],['Starter',18]];
const NEVER=[['Hugo Silva']];
const TOP3=[['Gita Rao',196],['Chen Wei',98],['Dana Kowalski',69]];
const CHURN=[['2026-04',2],['2026-06',1]];
const SOLO_REF=`-- 1. MRR per plan (active subscriptions only)
SELECT p.name AS plan, SUM(p.price) AS mrr
FROM subscriptions s
JOIN plans p ON p.id = s.plan_id
WHERE s.status = 'active'
GROUP BY p.id
ORDER BY mrr DESC;

-- 2. Customers who have never paid
SELECT c.name
FROM customers c
LEFT JOIN payments pay ON pay.customer_id = c.id
WHERE pay.id IS NULL;

-- 3. Top 3 customers by lifetime payments
SELECT c.name, SUM(pay.amount) AS total_paid
FROM customers c
JOIN payments pay ON pay.customer_id = c.id
GROUP BY c.id
ORDER BY total_paid DESC
LIMIT 3;

-- 4. Cancellations per month
SELECT strftime('%Y-%m', cancelled_at) AS month, COUNT(*) AS cancellations
FROM subscriptions
WHERE cancelled_at IS NOT NULL
GROUP BY month
ORDER BY month;

-- 5. Make "payments for one customer" fast
CREATE INDEX idx_payments_customer ON payments (customer_id);

-- 6. Price change, all or nothing
BEGIN;
UPDATE plans SET price = 22 WHERE name = 'Pro';
COMMIT;
`;

defineProjects('sql',{
guided:{title:'Design a ticketing database and report on it',kind:'code',lang:'sql',seed:'',starter:'-- Every Run starts from an empty database, so keep all your statements in this file.\n\n',
 pitch:'Design tables with keys and constraints, load data, then answer real business questions with joins, grouping and HAVING, and speed up a lookup with an index.',
 brief:`<p>You're building the database behind a small event-ticketing site: venues, events and tickets. First you design tables the database itself keeps consistent. Then you answer the questions the organizers actually ask.</p>
<p>Each Run starts from an empty database and executes your whole file, so keep adding to the same file. Results from every query appear below the editor.</p>
<div class="tip"><b>Goal</b>A schema that rejects bad data, a revenue report that includes events with zero sales, and an index the query planner actually uses.</div>`,
 tasks:[
 {t:'Create venues and events. An event must belong to a venue and have a positive capacity.',why:'<code>REFERENCES</code> makes a foreign key: an event can\'t point at a venue that doesn\'t exist. <code>CHECK (capacity &gt; 0)</code> moves a business rule into the database, so <b>every</b> app that writes to it obeys the rule.',code:T1,sol:T1,c:ctx=>!ctx.err&&ctx.q("SELECT \"table\" AS t FROM pragma_foreign_key_list('events')").some(r=>r.t==='venues')&&/CHECK\s*\(\s*capacity\s*>\s*0\s*\)/i.test(tableSql(ctx,'events'))},
 {t:'Create tickets so the same email can buy only one ticket per event.',why:'A <code>UNIQUE (event_id, buyer_email)</code> constraint across <b>two columns</b> stops double-booking, even when two requests arrive at the same moment. Code-only checks can lose that race.',code:T2,sol:T1+T2,c:ctx=>{if(ctx.err)return false;const idx=ctx.q("SELECT name FROM pragma_index_list('tickets') WHERE \"unique\" = 1");return idx.some(i=>{const cols=ctx.q("SELECT name FROM pragma_index_info('"+i.name+"')").map(c=>c.name).sort().join(',');return cols==='buyer_email,event_id'})&&ctx.q("SELECT \"table\" AS t FROM pragma_foreign_key_list('tickets')").some(r=>r.t==='events')}},
 {t:'Load the sample data.',why:'Insert parents before children: venues, then events, then tickets. Otherwise the foreign keys have nothing to point at. Listing column names in <code>INSERT</code> keeps it working when someone adds a column later.',code:T3,sol:T1+T2+T3,c:ctx=>!ctx.err&&(ctx.q('SELECT COUNT(*) AS n FROM tickets')[0]||{}).n===5&&(ctx.q('SELECT COUNT(*) AS n FROM events')[0]||{}).n===3},
 {t:'Report tickets sold and revenue per event, including events with no sales, highest revenue first.',why:'A plain <code>JOIN</code> would drop "Design Night", which has no tickets. <code>LEFT JOIN</code> keeps every event, and <code>COALESCE</code> turns the missing sum (NULL) into 0. <code>COUNT(t.id)</code> counts tickets, not rows, so an event with no sales correctly shows 0.',code:T4,sol:T1+T2+T3+T4,c:ctx=>found(ctx,[['JS Conf',3,130],['Python Meetup',2,40],['Design Night',0,0]],true)},
 {t:'List events that are more than half sold.',why:'<code>WHERE</code> filters rows <b>before</b> grouping. <code>HAVING</code> filters groups <b>after</b> aggregation, which is what you need to compare a count against capacity.',code:T5,sol:T1+T2+T3+T4+T5,c:ctx=>found(ctx,[['JS Conf',3,4],['Python Meetup',2,2]],false)},
 {t:'Add an index for looking up tickets by email, and confirm the plan uses it.',why:'Without an index, finding one buyer\'s tickets means scanning every row. <code>EXPLAIN QUERY PLAN</code> shows <code>SEARCH … USING INDEX</code> once the index is there. Index the columns your real queries filter on.',code:T6,sol:T1+T2+T3+T4+T5+T6,c:ctx=>/USING (COVERING )?INDEX/.test(plan(ctx,"SELECT * FROM tickets WHERE buyer_email = 'ada@example.com'"))&&/EXPLAIN\s+QUERY\s+PLAN/i.test(ctx.code)},
 ]},
solo:{title:'Answer business questions on a SaaS database',kind:'code',lang:'sql',seed:SAAS,starter:`-- Tables: plans, customers, subscriptions, payments (already filled in).
-- Explore first, e.g.: SELECT * FROM subscriptions;
-- Answer every question in this file. Each Run starts from the original data.

`,
 pitch:'Explore an unfamiliar subscription database and answer the questions a founder asks: revenue, non-payers, top customers and churn. Then make a safe schema and data change.',
 brief:`<p>You've joined a SaaS startup as its first engineer. The founder sends you questions about the production database: <code>plans</code>, <code>customers</code>, <code>subscriptions</code> (with <code>status</code> 'active' or 'cancelled' and a <code>cancelled_at</code> date) and <code>payments</code>. Start by exploring the tables.</p>
<p>Write one query per question in this file. Answer with current prices, and put the price change last.</p><ol><li><b>MRR per plan:</b> monthly recurring revenue from <b>active</b> subscriptions only. Columns: plan name and MRR, largest first.</li><li><b>Never paid:</b> names of customers with no payments at all.</li><li><b>Top customers:</b> the 3 customers who have paid the most in total, with the total, highest first.</li><li><b>Churn:</b> the number of cancellations per month (<code>YYYY-MM</code>), oldest month first.</li><li><b>Performance:</b> the support tool looks up payments by <code>customer_id</code> all day. Make that fast.</li><li><b>Price change:</b> Pro goes from 20 to 22. Apply it so it can't half-happen.</li></ol>`,
 tasks:[
 {t:'1. MRR per plan from active subscriptions, largest first.',c:ctx=>found(ctx,MRR,true),miss:ctx=>{const m=closest(ctx,MRR,true,'plan, mrr');return /status/.test(ctx.code)||!sameWidth(ctx,MRR)?m:m+' Did you leave out the cancelled subscriptions? Only status = \'active\' counts toward MRR.'}},
 {t:'2. Customers who have never made a payment.',c:ctx=>found(ctx,NEVER,false),miss:ctx=>{const m=closest(ctx,NEVER,false,'name');return /LEFT\s+JOIN|NOT\s+IN|NOT\s+EXISTS/i.test(ctx.code)||!sameWidth(ctx,NEVER)?m:m+' Customers with no payments have no rows to join to. Use LEFT JOIN … WHERE payments.id IS NULL, or NOT EXISTS.'}},
 {t:'3. Top 3 customers by total paid, with the total.',c:ctx=>found(ctx,TOP3,true),miss:ctx=>closest(ctx,TOP3,true,'name, total')+(/LIMIT\s+3/i.test(ctx.code)||!sameWidth(ctx,TOP3)?'':' Remember LIMIT 3 after ORDER BY … DESC.')},
 {t:'4. Cancellations per month (YYYY-MM), oldest first.',c:ctx=>found(ctx,CHURN,true),miss:ctx=>closest(ctx,CHURN,true,'month, cancellations')+(/strftime|substr/i.test(ctx.code)||!sameWidth(ctx,CHURN)?'':' To group by month, turn the date into "YYYY-MM" with strftime(\'%Y-%m\', cancelled_at) or substr(cancelled_at, 1, 7).')},
 {t:'5. Looking up payments by customer_id uses an index.',c:ctx=>/USING (COVERING )?INDEX/.test(plan(ctx,'SELECT * FROM payments WHERE customer_id = 3')),miss:ctx=>{const p=plan(ctx,'SELECT * FROM payments WHERE customer_id = 3');return 'The plan for "SELECT * FROM payments WHERE customer_id = 3" is still: '+(p||'unknown')+'. A SCAN reads every payment. CREATE INDEX on payments(customer_id).'}},
 {t:'6. Pro costs 22, applied inside a transaction, and no other plan changed.',c:ctx=>{const r=ctx.q('SELECT name, price FROM plans ORDER BY id').map(x=>x.name+':'+x.price).join(',');return r==='Starter:9,Pro:22,Business:49'&&/\bBEGIN\b/i.test(ctx.code)&&/\bCOMMIT\b/i.test(ctx.code)},
  miss:ctx=>{const r=ctx.q('SELECT name, price FROM plans ORDER BY id');const pro=r.find(x=>x.name==='Pro');if(r.some(x=>x.name!=='Pro'&&({Starter:9,Business:49})[x.name]!==x.price))return 'Another plan\'s price changed too: '+r.map(x=>x.name+' '+x.price).join(', ')+'. An UPDATE without a WHERE clause changes every row.';if(!pro||pro.price!==22)return 'Pro\'s price is '+(pro?pro.price:'missing')+', not 22.'+(/ROLLBACK/i.test(ctx.code)?' Your transaction ends in ROLLBACK, which undoes it.':'');return 'The price is right, but the update isn\'t wrapped in BEGIN … COMMIT. Here it\'s one statement, but price changes usually come with other writes (audit log, invoices) that must succeed or fail together.'}},
 ],
 warn:[
  {c:ctx=>/SELECT\s+\*/i.test(ctx.code.replace(/--.*$/gm,'').split(/;\s*/).filter(s=>/GROUP BY|JOIN/i.test(s)).join(';')),m:'You used SELECT * inside a report query. Name the columns you need: reports stay stable when someone adds a column, and the database reads less.'},
  {c:ctx=>/UPDATE\s+plans\s+SET[^;]*;/i.test(ctx.code)&&!/UPDATE\s+plans\s+SET[^;]*WHERE/i.test(ctx.code),m:'You ran an UPDATE without a WHERE clause. Even if you fixed it later, this is how production data gets wiped. Write the WHERE first.'},
  {c:ctx=>(ctx.results||[]).length>0&&!/^\s*--/m.test(ctx.code),m:'There are no comments. In a file of business queries, a one-line comment per query ("-- MRR per plan") saves the next person (and you) real time.'},
 ],
 ref:SOLO_REF},
});
})();
