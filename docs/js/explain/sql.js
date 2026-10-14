/* sql: "Explained step by step" walkthroughs. */

explain('sb1',`
<h4>Why apps need a database</h4>
<p>Think about a small online bookshop. It needs to remember every book, every customer and every order, and it needs to find one of them in a split second while hundreds of people are clicking at the same time. You could try to keep all of that in a text file or a spreadsheet, but very quickly you would hit problems: two people saving at once overwrite each other, finding one record means reading the whole file, and nothing stops someone typing "cheap" into the price column.</p>
<p>A <b>database</b> is a program whose whole job is to store data safely and answer questions about it quickly. Your app sends it a question, and it sends back an answer. It handles many users at once, it does not lose data when the power goes off, and it can enforce rules about what is allowed in.</p>
<div class="analogy"><b>Think of it like</b>A very fast, very strict librarian. You never walk into the stacks yourself. You hand the librarian a request slip ("all books by Toni Morrison, please"), and the librarian fetches exactly that and hands you a neat list.</div>

<h4>Relational databases and SQL</h4>
<p>The most common kind is a <b>relational database</b>. "Relational" sounds grand, but it mostly means the data is kept in <b>tables</b>, and tables can be linked to each other (you will learn the linking part later in the track). PostgreSQL, MySQL and SQLite are all relational databases. This lesson's sandbox runs SQLite inside your browser.</p>
<p>You talk to a relational database in <b>SQL</b>, short for Structured Query Language. People say it either as the letters "S, Q, L" or as the word "sequel"; both are fine. SQL is not a general programming language like Python. It is a language for one job: describing the data you want, and letting the database work out how to get it.</p>

<h4>Tables, rows and columns</h4>
<p>A table looks like a spreadsheet. This lesson's database has one table, called <code>books</code>, with eight books in it.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="A small books table with one row and one column highlighted">
<rect class="bx" x="20" y="30" width="40" height="30"/><rect class="bx" x="60" y="30" width="120" height="30"/><rect class="bx" x="180" y="30" width="60" height="30"/><rect class="bx-ok" x="240" y="30" width="60" height="30"/>
<rect class="bx" x="20" y="60" width="40" height="30"/><rect class="bx" x="60" y="60" width="120" height="30"/><rect class="bx" x="180" y="60" width="60" height="30"/><rect class="bx-ok" x="240" y="60" width="60" height="30"/>
<rect class="bx-a" x="20" y="90" width="40" height="30"/><rect class="bx-a" x="60" y="90" width="120" height="30"/><rect class="bx-a" x="180" y="90" width="60" height="30"/><rect class="bx-a" x="240" y="90" width="60" height="30"/>
<rect class="bx" x="20" y="120" width="40" height="30"/><rect class="bx" x="60" y="120" width="120" height="30"/><rect class="bx" x="180" y="120" width="60" height="30"/><rect class="bx-ok" x="240" y="120" width="60" height="30"/>
<g text-anchor="middle">
<text class="t-b" x="40" y="50">id</text><text class="t-b" x="120" y="50">title</text><text class="t-b" x="210" y="50">year</text><text class="t-b" x="270" y="50">price</text>
<text class="t" x="40" y="80">3</text><text class="t" x="120" y="80">The Hobbit</text><text class="t" x="210" y="80">1937</text><text class="t" x="270" y="80">8.99</text>
<text class="t" x="40" y="110">4</text><text class="t" x="120" y="110">Beloved</text><text class="t" x="210" y="110">1987</text><text class="t" x="270" y="110">11.00</text>
<text class="t" x="40" y="140">8</text><text class="t" x="120" y="140">Dune</text><text class="t" x="210" y="140">1965</text><text class="t" x="270" y="140">9.50</text>
</g>
<path class="ln-a" d="M304 105h22"/><polygon class="ah-a" points="304,99 304,111 296,105"/>
<text class="t-b t-a" x="332" y="102">a row</text><text class="t-s" x="332" y="120">one book</text>
<path class="ln-ok" d="M270 154v14"/><polygon class="ah-ok" points="264,158 276,158 270,150"/>
<text class="t-b t-ok" x="270" y="188" text-anchor="middle">a column</text><text class="t-s" x="270" y="206" text-anchor="middle">one property</text>
<path class="ln" d="M40 154v14"/><polygon class="ah" points="34,158 46,158 40,150"/>
<text class="t-s" x="12" y="188">id is the</text><text class="t-s" x="12" y="206">primary key</text>
</svg><figcaption>Three of the eight books. The highlighted row, Beloved, is one complete record. The highlighted price column holds the same property for every book. The id column gives each row its own unique number.</figcaption></figure>
<ul>
<li>A <b>row</b> is one record: one whole book, with all of its details.</li>
<li>A <b>column</b> is one property that every row has: every book has a title, an author, a year and a price.</li>
<li>Every column has a <b>type</b>, which says what kind of value it holds. Here <code>id</code> and <code>year</code> are whole numbers (<code>INTEGER</code>), <code>title</code> and <code>author</code> are text (<code>TEXT</code>), and <code>price</code> is a number with a decimal point (<code>REAL</code>).</li>
<li>The <code>id</code> column is the <b>primary key</b>: a value that is unique for every row, so you can always point at exactly one book. Two books might share a title, but they will never share an id.</li>
</ul>

<h4>Your first query: <code>SELECT * FROM books;</code></h4>
<p>A request to the database is called a <b>query</b>. The one you will write most often starts with <code>SELECT</code>, which means "give me some data". Here is the simplest useful query:</p>
<pre class="snip">SELECT * FROM books;</pre>
<p>Read it out loud and it almost makes sense in English: "select everything from books". Piece by piece:</p>
<ol>
<li><code>SELECT</code> says you want to read data.</li>
<li><code>*</code>, called "star", is a shortcut that means "every column".</li>
<li><code>FROM books</code> names the table to read from.</li>
<li><code>;</code>, the semicolon, marks the end of the statement, like a full stop at the end of a sentence.</li>
</ol>
<p>The answer comes back as a <b>result</b>, which is itself shaped like a table: columns across the top and rows underneath. That is a useful idea to hold on to. Every SELECT takes tables in and gives a table out.</p>
<p>The words <code>SELECT</code> and <code>FROM</code> are SQL <b>keywords</b>. SQL does not care whether you write them in capitals or lower case, but the habit is to use capitals so the keywords stand out from your table and column names. Spaces and line breaks don't matter either, so a long query can be spread over several lines to make it easier to read.</p>

<h4>Choosing columns, renaming them and limiting rows</h4>
<p>Asking for every column is fine while you explore, but real apps ask for just what they need. To choose columns, list their names, separated by commas:</p>
<pre class="snip">SELECT title, author FROM books;   -- two columns, all 8 rows</pre>
<p>The columns come back in the order you list them, so <code>SELECT author, title</code> would put the author first. Notice the two dashes: <code>--</code> starts a <b>comment</b>, a note for humans that the database ignores until the end of the line.</p>
<p>Sometimes the column name is not the label you want in the result. <code>AS</code> gives a column a new name, called an <b>alias</b>, in the result only:</p>
<pre class="snip">SELECT title, price AS cost FROM books;
-- the result has columns "title" and "cost"
-- the table itself still has a column called price</pre>
<p>Finally, <code>LIMIT</code> caps how many rows come back. It goes at the very end of the query:</p>
<pre class="snip">SELECT * FROM books LIMIT 3;   -- at most 3 rows</pre>
<p>Limits matter more than they look. A real table can hold millions of rows, and asking for all of them by accident can make your app crawl. LIMIT is also how pages of results work: "show the first 20".</p>
<figure class="fig"><svg viewBox="0 0 420 215" role="img" aria-label="SELECT picks two columns and LIMIT keeps three rows">
<text class="t-s" x="75" y="26" text-anchor="middle">books: 8 rows</text>
<g>
<rect class="bx" x="20" y="36" width="22" height="14"/><rect class="bx-ok" x="42" y="36" width="22" height="14"/><rect class="bx" x="64" y="36" width="22" height="14"/><rect class="bx" x="86" y="36" width="22" height="14"/><rect class="bx-ok" x="108" y="36" width="22" height="14"/>
<rect class="bx" x="20" y="50" width="22" height="14"/><rect class="bx-ok" x="42" y="50" width="22" height="14"/><rect class="bx" x="64" y="50" width="22" height="14"/><rect class="bx" x="86" y="50" width="22" height="14"/><rect class="bx-ok" x="108" y="50" width="22" height="14"/>
<rect class="bx" x="20" y="64" width="22" height="14"/><rect class="bx-ok" x="42" y="64" width="22" height="14"/><rect class="bx" x="64" y="64" width="22" height="14"/><rect class="bx" x="86" y="64" width="22" height="14"/><rect class="bx-ok" x="108" y="64" width="22" height="14"/>
<rect class="bx" x="20" y="78" width="22" height="14"/><rect class="bx" x="42" y="78" width="22" height="14"/><rect class="bx" x="64" y="78" width="22" height="14"/><rect class="bx" x="86" y="78" width="22" height="14"/><rect class="bx" x="108" y="78" width="22" height="14"/>
<rect class="bx" x="20" y="92" width="22" height="14"/><rect class="bx" x="42" y="92" width="22" height="14"/><rect class="bx" x="64" y="92" width="22" height="14"/><rect class="bx" x="86" y="92" width="22" height="14"/><rect class="bx" x="108" y="92" width="22" height="14"/>
<rect class="bx" x="20" y="106" width="22" height="14"/><rect class="bx" x="42" y="106" width="22" height="14"/><rect class="bx" x="64" y="106" width="22" height="14"/><rect class="bx" x="86" y="106" width="22" height="14"/><rect class="bx" x="108" y="106" width="22" height="14"/>
<rect class="bx" x="20" y="120" width="22" height="14"/><rect class="bx" x="42" y="120" width="22" height="14"/><rect class="bx" x="64" y="120" width="22" height="14"/><rect class="bx" x="86" y="120" width="22" height="14"/><rect class="bx" x="108" y="120" width="22" height="14"/>
<rect class="bx" x="20" y="134" width="22" height="14"/><rect class="bx" x="42" y="134" width="22" height="14"/><rect class="bx" x="64" y="134" width="22" height="14"/><rect class="bx" x="86" y="134" width="22" height="14"/><rect class="bx" x="108" y="134" width="22" height="14"/>
</g>
<path class="ln-ok" d="M142 92h38"/><polygon class="ah-ok" points="178,86 178,98 186,92"/>
<text class="t-s" x="295" y="26" text-anchor="middle">result: 3 rows</text>
<rect class="bx-ok" x="194" y="36" width="130" height="28"/><rect class="bx-ok" x="324" y="36" width="80" height="28"/>
<rect class="bx" x="194" y="64" width="130" height="28"/><rect class="bx" x="324" y="64" width="80" height="28"/>
<rect class="bx" x="194" y="92" width="130" height="28"/><rect class="bx" x="324" y="92" width="80" height="28"/>
<rect class="bx" x="194" y="120" width="130" height="28"/><rect class="bx" x="324" y="120" width="80" height="28"/>
<g text-anchor="middle">
<text class="t-b" x="259" y="55">title</text><text class="t-b" x="364" y="55">cost</text>
<text class="t-s" x="259" y="83">Things Fall…</text><text class="t-s" x="364" y="83">9.99</text>
<text class="t-s" x="259" y="111">Half of a…</text><text class="t-s" x="364" y="111">12.50</text>
<text class="t-s" x="259" y="139">The Hobbit</text><text class="t-s" x="364" y="139">8.99</text>
<text class="t-m" x="210" y="180">SELECT title, price AS cost</text>
<text class="t-m" x="210" y="202">FROM books LIMIT 3;</text>
</g>
</svg><figcaption>On the left is the whole books table as a grid of cells. The query keeps only the title and price columns, shown in green, and LIMIT keeps only the first three rows. The result on the right is a brand new little table, with price relabelled as cost.</figcaption></figure>
<p>One honest warning about LIMIT: a database does not promise any particular row order unless you ask for one. In this sandbox the rows come back in the order they were added, so "the first 3" means books 1, 2 and 3. In the next lessons you will learn <code>ORDER BY</code>, which makes the order explicit.</p>

<h4>Reading the errors you will hit</h4>
<p>Errors are the database telling you exactly what confused it. The common ones in SQLite:</p>
<div class="tbl-wrap"><table><tr><th>Message</th><th>What it means</th></tr>
<tr><td><code>no such table: book</code></td><td>The table name is misspelt. It is <code>books</code>, plural.</td></tr>
<tr><td><code>no such column: titel</code></td><td>A column name is misspelt or does not exist.</td></tr>
<tr><td><code>near "FROM": syntax error</code></td><td>The grammar broke just before the word it names. Very often a missing or extra comma.</td></tr>
<tr><td><code>incomplete input</code></td><td>The statement stops half way, for example a query that ends after <code>SELECT</code>.</td></tr></table></div>
<div class="mistake"><b>Common mistake</b>A comma after the last column: <code>SELECT title, author, FROM books;</code>. SQL then expects another column name and finds <code>FROM</code> instead, so it reports a syntax error near FROM. Commas go <i>between</i> column names, never after the last one.</div>
<div class="mistake"><b>Common mistake</b>Thinking <code>AS</code> renames the column in the table. It only changes the label in this one result. The next query still has to say <code>price</code>.</div>

<div class="try"><b>Try it in your head</b>What does <code>SELECT author AS writer, year FROM books LIMIT 2;</code> return? Two columns, labelled <code>writer</code> and <code>year</code>, and two rows: Chinua Achebe, 1958, and Chimamanda Ngozi Adichie, 2006.</div>
<div class="tip"><b>Tip</b>In this sandbox every Run starts again from the original eight books, so you can experiment freely. You cannot break anything.</div>

<h4>Recap</h4>
<ul>
<li>A relational database stores data in tables. A row is one record, a column is one property, and the primary key uniquely identifies each row.</li>
<li>SQL is the language you use to ask the database for data. Statements end with a semicolon.</li>
<li><code>SELECT * FROM books;</code> returns every column. <code>SELECT title, author FROM books;</code> returns only the columns you list, in that order.</li>
<li><code>AS</code> renames a column in the result only, and <code>LIMIT 3</code> caps the result at three rows.</li>
<li>Every query's result is itself a small table.</li>
</ul>
`);

explain('sb2',`
<h4>Reading is only half the job</h4>
<p>In the last lesson you asked the database questions with <code>SELECT</code>. But an app also changes its data all day long. A new customer signs up, someone edits their address, an order is cancelled. Almost everything an app does with stored data falls into four actions, remembered as <b>CRUD</b>:</p>
<div class="tbl-wrap"><table><tr><th>Action</th><th>SQL statement</th><th>Bookshop example</th></tr>
<tr><td><b>C</b>reate</td><td><code>INSERT</code></td><td>Add a new book to the catalogue.</td></tr>
<tr><td><b>R</b>ead</td><td><code>SELECT</code></td><td>Show the list of books.</td></tr>
<tr><td><b>U</b>pdate</td><td><code>UPDATE</code></td><td>Put The Hobbit on sale.</td></tr>
<tr><td><b>D</b>elete</td><td><code>DELETE</code></td><td>Remove a book you no longer stock.</td></tr></table></div>
<p>A SELECT only looks. The other three really change what is stored, so they need a little more care. This lesson is about that care as much as the syntax.</p>

<h4>INSERT: adding a row</h4>
<p>To add a book, you say which table, which columns you are filling in, and the values for them:</p>
<pre class="snip">INSERT INTO books (title, author, year, price)
VALUES ('Purple Hibiscus', 'Chimamanda Ngozi Adichie', 2003, 11.20);</pre>
<p>Step by step:</p>
<ol>
<li><code>INSERT INTO books</code>: add a new row to the books table.</li>
<li><code>(title, author, year, price)</code>: the columns you are about to give values for.</li>
<li><code>VALUES (...)</code>: the values, in <b>exactly the same order</b> as the column list. The first value goes into <code>title</code>, the second into <code>author</code>, and so on.</li>
</ol>
<p>Two details matter here. First, <b>text goes in single quotes</b> and numbers don't: <code>'Purple Hibiscus'</code> but <code>2003</code>. Second, you did not give an <code>id</code>. Because <code>id</code> is the table's <code>INTEGER PRIMARY KEY</code>, SQLite fills it in for you with the next free number, one more than the largest id so far. The table has ids 1 to 8, so the new book gets 9.</p>
<figure class="fig"><svg viewBox="0 0 420 200" role="img" aria-label="INSERT adds a new row at id 9, with the id filled in automatically">
<rect class="bx" x="40" y="20" width="50" height="30"/><rect class="bx" x="90" y="20" width="170" height="30"/><rect class="bx" x="260" y="20" width="70" height="30"/>
<rect class="bx" x="40" y="50" width="50" height="30"/><rect class="bx" x="90" y="50" width="170" height="30"/><rect class="bx" x="260" y="50" width="70" height="30"/>
<rect class="bx" x="40" y="80" width="50" height="30"/><rect class="bx" x="90" y="80" width="170" height="30"/><rect class="bx" x="260" y="80" width="70" height="30"/>
<rect class="bx-a" x="40" y="126" width="50" height="30"/><rect class="bx-ok" x="90" y="126" width="170" height="30"/><rect class="bx-ok" x="260" y="126" width="70" height="30"/>
<g text-anchor="middle">
<text class="t-b" x="65" y="40">id</text><text class="t-b" x="175" y="40">title</text><text class="t-b" x="295" y="40">price</text>
<text class="t" x="65" y="70">7</text><text class="t" x="175" y="70">Americanah</text><text class="t" x="295" y="70">13.00</text>
<text class="t" x="65" y="100">8</text><text class="t" x="175" y="100">Dune</text><text class="t" x="295" y="100">9.50</text>
<text class="t-b t-a" x="65" y="146">9</text><text class="t" x="175" y="146">Purple Hibiscus</text><text class="t" x="295" y="146">11.20</text>
</g>
<path class="ln-d" d="M40 118h290"/>
<path class="ln-a" d="M65 162v12"/><polygon class="ah-a" points="59,166 71,166 65,158"/>
<text class="t-s t-a" x="20" y="190">filled in for you</text>
<text class="t-s t-ok" x="200" y="190" text-anchor="middle">your values</text>
<path class="ln-ok" d="M200 176v-12"/><polygon class="ah-ok" points="194,168 206,168 200,160"/>
</svg><figcaption>The new row lands below the existing ones. You supplied the title, author, year and price, shown in green. The database chose the id, 9, because 8 was the largest id so far.</figcaption></figure>
<p>You can add several rows in one statement by separating the bracketed groups with commas: <code>VALUES ('A', ...), ('B', ...);</code>.</p>
<p>What if a title contains an apostrophe, like <i>Don't Look Back</i>? The apostrophe would end the text early. In SQL you write two single quotes in a row to mean one: <code>'Don''t Look Back'</code>.</p>

<h4>WHERE: choosing which rows to touch</h4>
<p>Before UPDATE and DELETE, you need one new tool. <code>WHERE</code> is a filter. It goes after the table name and keeps only the rows for which its condition is true:</p>
<pre class="snip">SELECT * FROM books WHERE id = 3;        -- just The Hobbit
SELECT * FROM books WHERE year &lt; 1960;    -- books older than 1960</pre>
<p>In SQL a single <code>=</code> means "is equal to". (If you know another programming language where comparison is <code>==</code>, note the difference.) The other comparisons are <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, and <code>&lt;&gt;</code> for "not equal".</p>
<p>When you want to change exactly one row, filter on the <b>primary key</b>. <code>WHERE id = 3</code> can only ever match one book, because ids are unique. <code>WHERE title = 'Dune'</code> looks safe, but if the shop later stocks two editions of Dune it quietly matches both.</p>

<h4>UPDATE: changing rows</h4>
<pre class="snip">UPDATE books SET price = 7.99 WHERE id = 3;</pre>
<p>Read it as a sentence: "in books, set price to 7.99, where the id is 3". The three parts are the table, the change, and which rows get the change. You can change several columns at once by separating them with commas, and the new value can be calculated from the old one:</p>
<pre class="snip">UPDATE books SET price = 10.00, year = 1966 WHERE id = 8;
UPDATE books SET price = price * 0.9 WHERE year &lt; 1960;  -- 10% off old books</pre>
<p>In the second line, <code>price * 0.9</code> is worked out separately for each matching row, using that row's own current price.</p>
<figure class="fig"><svg viewBox="0 0 420 230" role="img" aria-label="UPDATE with WHERE changes one row; without WHERE it changes every row">
<text class="t-b t-ok" x="105" y="22" text-anchor="middle">WHERE id = 3</text>
<text class="t-b t-bad" x="315" y="22" text-anchor="middle">no WHERE</text>
<g text-anchor="middle">
<rect class="bx" x="50" y="36" width="40" height="30"/><rect class="bx" x="90" y="36" width="70" height="30"/>
<rect class="bx" x="50" y="66" width="40" height="30"/><rect class="bx" x="90" y="66" width="70" height="30"/>
<rect class="bx-ok" x="50" y="96" width="40" height="30"/><rect class="bx-ok" x="90" y="96" width="70" height="30"/>
<rect class="bx" x="50" y="126" width="40" height="30"/><rect class="bx" x="90" y="126" width="70" height="30"/>
<text class="t-b" x="70" y="56">id</text><text class="t-b" x="125" y="56">price</text>
<text class="t" x="70" y="86">2</text><text class="t" x="125" y="86">12.50</text>
<text class="t" x="70" y="116">3</text><text class="t-b t-ok" x="125" y="116">7.99</text>
<text class="t" x="70" y="146">4</text><text class="t" x="125" y="146">11.00</text>
<rect class="bx" x="260" y="36" width="40" height="30"/><rect class="bx" x="300" y="36" width="70" height="30"/>
<rect class="bx-bad" x="260" y="66" width="40" height="30"/><rect class="bx-bad" x="300" y="66" width="70" height="30"/>
<rect class="bx-bad" x="260" y="96" width="40" height="30"/><rect class="bx-bad" x="300" y="96" width="70" height="30"/>
<rect class="bx-bad" x="260" y="126" width="40" height="30"/><rect class="bx-bad" x="300" y="126" width="70" height="30"/>
<text class="t-b" x="280" y="56">id</text><text class="t-b" x="335" y="56">price</text>
<text class="t" x="280" y="86">2</text><text class="t-b t-bad" x="335" y="86">7.99</text>
<text class="t" x="280" y="116">3</text><text class="t-b t-bad" x="335" y="116">7.99</text>
<text class="t" x="280" y="146">4</text><text class="t-b t-bad" x="335" y="146">7.99</text>
<text class="t-s" x="105" y="180">1 row changed</text>
<text class="t-s" x="315" y="180">all 8 rows changed</text>
<text class="t-m" x="210" y="214" style="font-size:15px">UPDATE books SET price = 7.99 ...</text>
</g>
<line class="ln-d" x1="210" y1="34" x2="210" y2="186"/>
</svg><figcaption>The same UPDATE, run two ways. On the left, WHERE id equals 3 picks out one row and only The Hobbit changes. On the right there is no WHERE, so every book in the table gets the new price.</figcaption></figure>

<h4>DELETE: removing rows</h4>
<pre class="snip">DELETE FROM books WHERE id = 8;</pre>
<p>DELETE removes whole rows; there are no column names in it. Notice the wording: it is <code>DELETE FROM</code>, not <code>DELETE books</code>. If you only want to clear one value inside a row, that is an UPDATE, not a DELETE.</p>
<p>A real database has no undo button and no recycle bin. A deleted row is gone unless someone kept a backup. You will meet a safety net called a transaction later in the track, but the best protection is the habit below.</p>

<h4>The habit that saves you: SELECT first</h4>
<p>Without a <code>WHERE</code>, UPDATE and DELETE apply to <b>every row in the table</b>. The database will not ask "are you sure?". So professionals use this routine:</p>
<ol>
<li>Write the WHERE part first, as a SELECT: <code>SELECT * FROM books WHERE id = 8;</code></li>
<li>Run it and check that it returns exactly the rows you mean to change.</li>
<li>Only then swap <code>SELECT *</code> for <code>DELETE</code> (or for <code>UPDATE books SET ...</code>), keeping the WHERE untouched.</li>
<li>Afterwards, SELECT again to see the result.</li>
</ol>
<p>In this sandbox every Run starts from the original eight books, and the statements in your file run from top to bottom. So keep all your INSERT, UPDATE and DELETE statements in the file together, and end with <code>SELECT * FROM books;</code> so the Results panel shows the final state.</p>
<div class="mistake"><b>Common mistake</b>Forgetting the WHERE, or running the statement before you have finished typing it. <code>DELETE FROM books;</code> is a perfectly valid statement: it empties the table. Write the WHERE before anything else.</div>
<div class="mistake"><b>Common mistake</b>Wrapping text in double quotes: <code>WHERE title = "Dune"</code>. In standard SQL, double quotes mean a <i>name</i>, such as a column, and single quotes mean text. SQLite sometimes guesses what you meant, but PostgreSQL will say the column "Dune" does not exist. Always use single quotes for text.</div>

<h4>Reading the errors you will hit</h4>
<div class="tbl-wrap"><table><tr><th>Message</th><th>What it means</th></tr>
<tr><td><code>NOT NULL constraint failed: books.author</code></td><td>The table requires an author and you left it out. Every column here is marked <code>NOT NULL</code>, meaning "must have a value".</td></tr>
<tr><td><code>table books has 5 columns but 4 values were supplied</code></td><td>You skipped the column list, so SQLite expected a value for every column, including id. Name your columns.</td></tr>
<tr><td><code>unrecognized token</code></td><td>Usually a missing closing quote, so the rest of the line became part of the text.</td></tr></table></div>
<div class="try"><b>Try it in your head</b>How many rows does <code>UPDATE books SET price = price + 1 WHERE year &lt; 1960;</code> change? The books from before 1960 are Things Fall Apart (1958) and The Hobbit (1937), so two rows, and each one goes up by exactly 1 from its own price.</div>

<h4>Recap</h4>
<ul>
<li>CRUD is Create, Read, Update, Delete: <code>INSERT</code>, <code>SELECT</code>, <code>UPDATE</code>, <code>DELETE</code>.</li>
<li><code>INSERT INTO books (cols) VALUES (...)</code> lists values in the same order as the columns. Text in single quotes; the id is filled in for you.</li>
<li><code>UPDATE books SET price = 7.99 WHERE id = 3;</code> changes only the rows WHERE picks.</li>
<li><code>DELETE FROM books WHERE id = 8;</code> removes whole rows, with no undo.</li>
<li>Without WHERE, UPDATE and DELETE hit every row. Test the WHERE with a SELECT first, and filter on the primary key when you mean one row.</li>
</ul>
`);

explain('s1',`
<h4>From "all the rows" to "the right rows"</h4>
<p>So far you have read whole tables, chosen columns and changed single rows. Real questions are sharper than that. "Which customers live in Lagos?" "What are our cheapest products?" "How many orders are still pending?" "Which product categories earn the most on average?"</p>
<p>SQL answers each of these with a few extra <b>clauses</b>. A clause is one part of a statement that starts with a keyword, like <code>WHERE ...</code> or <code>ORDER BY ...</code>. This lesson adds four: WHERE to filter, ORDER BY to sort, GROUP BY to summarise, and HAVING to filter the summaries.</p>
<p>The database for this lesson is a small shop with four tables: <code>customers</code>, <code>products</code>, <code>orders</code> and <code>order_items</code>. For now you only need one table at a time. The checker reads the result of the <b>last</b> statement you run, so put the query for the current task at the bottom.</p>

<h4>WHERE: keep only the rows you want</h4>
<p>You met WHERE briefly when you changed rows. With SELECT it works the same way: the database looks at each row in turn, tests the condition, and keeps the row only if the condition is true.</p>
<pre class="snip">SELECT name, city FROM customers WHERE city = 'London';
SELECT name, price FROM products WHERE price &gt;= 100;</pre>
<p>Text values go in single quotes and must match exactly. In SQLite and PostgreSQL, <code>'london'</code> with a small l does not match <code>'London'</code>. You can combine conditions:</p>
<ul>
<li><code>AND</code>: both must be true. <code>WHERE category = 'Audio' AND price &lt; 100</code></li>
<li><code>OR</code>: at least one must be true. <code>WHERE city = 'Lagos' OR city = 'Accra'</code></li>
<li><code>IN (...)</code>: a shorter way to write several ORs. <code>WHERE city IN ('Lagos', 'Accra')</code></li>
<li><code>BETWEEN a AND b</code>: a range that includes both ends. <code>WHERE price BETWEEN 20 AND 50</code></li>
</ul>
<p>When you mix AND with OR, add brackets to say what you mean. AND binds more tightly than OR, just like multiplication before addition in maths, so <code>a OR b AND c</code> means <code>a OR (b AND c)</code>, which is rarely what people intend.</p>

<h4>ORDER BY and LIMIT: sorting and cutting off</h4>
<p>A database makes no promise about row order unless you ask. <code>ORDER BY</code> asks:</p>
<pre class="snip">SELECT name, price FROM products ORDER BY price;        -- cheapest first
SELECT name, price FROM products ORDER BY price DESC;   -- most expensive first
SELECT name, city FROM customers ORDER BY city, name;   -- by city, then name</pre>
<p>The default direction is <code>ASC</code>, ascending: smallest number first, or A to Z for text. <code>DESC</code> means descending. With more than one column, the second only breaks ties in the first: customers are sorted by city, and the two Lagos customers are then sorted by name.</p>
<p>ORDER BY and LIMIT together answer "top N" questions. <code>ORDER BY price DESC LIMIT 3</code> is "the three most expensive products". Without the ORDER BY, LIMIT 3 would just give you whichever three rows came out first.</p>

<h4>Aggregates: many rows in, one number out</h4>
<p>An <b>aggregate function</b> takes a whole column of values and squashes it into one answer, like the totals row at the bottom of a spreadsheet.</p>
<div class="tbl-wrap"><table><tr><th>Function</th><th>Answers</th><th>Example on products</th></tr>
<tr><td><code>COUNT(*)</code></td><td>How many rows?</td><td>11</td></tr>
<tr><td><code>SUM(price)</code></td><td>What do they add up to?</td><td>1093</td></tr>
<tr><td><code>AVG(price)</code></td><td>What is the average?</td><td>about 99.36</td></tr>
<tr><td><code>MIN(price)</code> / <code>MAX(price)</code></td><td>Smallest / largest?</td><td>9 / 349</td></tr></table></div>
<pre class="snip">SELECT COUNT(*) AS products, AVG(price) AS avg_price FROM products;
-- one row: 11 | 99.36...</pre>
<p><code>COUNT(*)</code> counts rows. <code>COUNT(column)</code> counts only the rows where that column actually has a value, which matters once you meet empty values (called NULL) in the next lesson.</p>

<h4>GROUP BY: one summary per group</h4>
<p>A single total for the whole table is useful, but usually you want a total <i>per something</i>: orders per status, average price per category. <code>GROUP BY</code> sorts the rows into piles that share a value, then runs the aggregate once on each pile.</p>
<figure class="fig"><svg viewBox="0 0 420 255" role="img" aria-label="Nine orders sorted into four piles by status, each pile counted">
<text class="t-s" x="85" y="22" text-anchor="middle">orders, 9 rows</text>
<text class="t-s" x="325" y="22" text-anchor="middle">GROUP BY status</text>
<g text-anchor="middle">
<rect class="bx-ok" x="20" y="36" width="130" height="20"/><text class="t-s" x="85" y="51">#1 delivered</text>
<rect class="bx-ok" x="20" y="56" width="130" height="20"/><text class="t-s" x="85" y="71">#2 delivered</text>
<rect class="bx-ok" x="20" y="76" width="130" height="20"/><text class="t-s" x="85" y="91">#4 delivered</text>
<rect class="bx-ok" x="20" y="96" width="130" height="20"/><text class="t-s" x="85" y="111">#7 delivered</text>
<rect class="bx-info" x="20" y="124" width="130" height="20"/><text class="t-s" x="85" y="139">#3 shipped</text>
<rect class="bx-info" x="20" y="144" width="130" height="20"/><text class="t-s" x="85" y="159">#8 shipped</text>
<rect class="bx-warn" x="20" y="172" width="130" height="20"/><text class="t-s" x="85" y="187">#6 pending</text>
<rect class="bx-warn" x="20" y="192" width="130" height="20"/><text class="t-s" x="85" y="207">#9 pending</text>
<rect class="bx-bad" x="20" y="220" width="130" height="20"/><text class="t-s" x="85" y="235">#5 cancelled</text>
<rect class="bx-ok" x="250" y="62" width="150" height="28" rx="6"/><text class="t" x="325" y="81">delivered: <tspan class="t-b">4</tspan></text>
<rect class="bx-info" x="250" y="130" width="150" height="28" rx="6"/><text class="t" x="325" y="149">shipped: <tspan class="t-b">2</tspan></text>
<rect class="bx-warn" x="250" y="178" width="150" height="28" rx="6"/><text class="t" x="325" y="197">pending: <tspan class="t-b">2</tspan></text>
<rect class="bx-bad" x="250" y="216" width="150" height="28" rx="6"/><text class="t" x="325" y="235">cancelled: <tspan class="t-b">1</tspan></text>
</g>
<path class="ln" d="M156 38h8v76h-8"/><path class="ln" d="M164 76h76"/><polygon class="ah" points="238,70 238,82 246,76"/>
<path class="ln" d="M156 126h8v36h-8"/><path class="ln" d="M164 144h76"/><polygon class="ah" points="238,138 238,150 246,144"/>
<path class="ln" d="M156 174h8v36h-8"/><path class="ln" d="M164 192h76"/><polygon class="ah" points="238,186 238,198 246,192"/>
<path class="ln" d="M156 230h84"/><polygon class="ah" points="238,224 238,236 246,230"/>
</svg><figcaption>GROUP BY status puts the nine orders into four piles, one per status. COUNT of star then runs once per pile, so the result has four rows: delivered 4, shipped 2, pending 2 and cancelled 1.</figcaption></figure>
<pre class="snip">SELECT category, COUNT(*) AS products
FROM products
GROUP BY category;
-- Accessories 5 | Audio 2 | Displays 1 | Office 3</pre>
<p>The result has <b>one row per group</b>. That gives you a firm rule: every column in the SELECT must be either the thing you grouped by, or an aggregate. Asking for <code>name</code> here makes no sense, because the Accessories pile holds five different names and only one row comes out.</p>

<h4>HAVING: filtering the groups</h4>
<p>Suppose you only want categories whose average price is over 40. You cannot write that in WHERE, because WHERE looks at one row at a time, before any piles exist. An individual row has a price, but it does not have an average. <code>HAVING</code> is a filter that runs <b>after</b> grouping, so it can test aggregates:</p>
<pre class="snip">SELECT category, AVG(price) AS avg_price
FROM products
WHERE price &gt; 10            -- rows: drop the cheap mouse pad
GROUP BY category
HAVING COUNT(*) &gt;= 2;        -- groups: keep piles with 2+ products</pre>
<p>Both filters can appear in one query, and they do different jobs: <b>WHERE filters rows, HAVING filters groups.</b></p>

<h4>The order SQL really runs in</h4>
<p>You <i>write</i> a query starting with SELECT, but the database does not <i>run</i> it in that order. It runs the clauses in a fixed logical order, and once you know it, most confusing errors suddenly make sense.</p>
<figure class="fig"><svg viewBox="0 0 420 262" role="img" aria-label="Clause run order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT">
<g text-anchor="middle">
<rect class="bx" x="40" y="8" width="150" height="28" rx="6"/><text class="t-m" x="115" y="27">1 FROM</text>
<rect class="bx-ok" x="40" y="44" width="150" height="28" rx="6"/><text class="t-m" x="115" y="63">2 WHERE</text>
<rect class="bx" x="40" y="80" width="150" height="28" rx="6"/><text class="t-m" x="115" y="99">3 GROUP BY</text>
<rect class="bx-warn" x="40" y="116" width="150" height="28" rx="6"/><text class="t-m" x="115" y="135">4 HAVING</text>
<rect class="bx-a" x="40" y="152" width="150" height="28" rx="6"/><text class="t-m" x="115" y="171">5 SELECT</text>
<rect class="bx" x="40" y="188" width="150" height="28" rx="6"/><text class="t-m" x="115" y="207">6 ORDER BY</text>
<rect class="bx" x="40" y="224" width="150" height="28" rx="6"/><text class="t-m" x="115" y="243">7 LIMIT</text>
</g>
<path class="ln" d="M20 22v222"/><polygon class="ah" points="14,240 26,240 20,250"/>
<g class="t-s">
<text class="t-s" x="205" y="27">pick the table</text>
<text class="t-s" x="205" y="63">keep matching rows</text>
<text class="t-s" x="205" y="99">make the piles</text>
<text class="t-s" x="205" y="135">keep matching piles</text>
<text class="t-s" x="205" y="171">pick columns, aliases</text>
<text class="t-s" x="205" y="207">sort (aliases work)</text>
<text class="t-s" x="205" y="243">cut off the rest</text>
</g>
</svg><figcaption>The logical run order, top to bottom. FROM chooses the table, WHERE drops rows, GROUP BY makes piles, HAVING drops piles, and only then does SELECT pick the columns and give them aliases. ORDER BY sorts and LIMIT cuts off the result.</figcaption></figure>
<p>Three consequences fall straight out of that picture:</p>
<ol>
<li><b>Aggregates cannot go in WHERE.</b> At step 2 the piles do not exist yet. SQLite says <code>misuse of aggregate: COUNT()</code>; PostgreSQL says aggregate functions are not allowed in WHERE. Move the condition to HAVING.</li>
<li><b>ORDER BY can use an alias.</b> SELECT (step 5) has already named <code>avg_price</code> by the time ORDER BY (step 6) runs, so <code>ORDER BY avg_price DESC</code> works.</li>
<li><b>WHERE should not use an alias.</b> At step 2 the alias does not exist yet. PostgreSQL rejects it. SQLite happens to be lenient and allows it, but don't build the habit: repeat the expression instead.</li>
</ol>
<p>(Behind the scenes, the database may physically do the work in a cleverer order to go faster, but the answer is always as if it ran in this order.)</p>

<h4>Common mistakes and the errors behind them</h4>
<div class="mistake"><b>Common mistake</b>Selecting a column that is neither grouped nor aggregated, like <code>SELECT category, name, COUNT(*) ... GROUP BY category</code>. PostgreSQL refuses with "must appear in the GROUP BY clause or be used in an aggregate function". SQLite quietly picks a name from one random row of each pile, which looks like an answer but is meaningless. Fix it by grouping by that column too, or by removing it.</div>
<div class="mistake"><b>Common mistake</b>Writing the clauses in the wrong order on the page. The written order is always SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY, LIMIT. Put HAVING before GROUP BY and you get a syntax error.</div>
<div class="tip"><b>Tip</b>AVG can return long decimals: the average of all products is 99.3636 and so on. <code>ROUND(AVG(price), 2)</code> rounds to two decimal places for display.</div>

<div class="try"><b>Try it in your head</b>Products in Office cost 32, 18 and 349. What does <code>SELECT category, MIN(price) FROM products WHERE price &gt; 20 GROUP BY category HAVING COUNT(*) &gt;= 2;</code> give for Office? WHERE first drops the 18 lamp, leaving 32 and 349. That pile has 2 rows, so HAVING keeps it, and MIN is 32.</div>

<h4>Recap</h4>
<ul>
<li><code>WHERE</code> keeps rows that match a condition; combine conditions with AND, OR, IN and BETWEEN.</li>
<li><code>ORDER BY col DESC</code> sorts highest first; with <code>LIMIT</code> it answers "top N" questions.</li>
<li>COUNT, SUM, AVG, MIN and MAX squash many rows into one value. <code>GROUP BY</code> does that once per group, giving one row per group.</li>
<li>WHERE filters rows before grouping; HAVING filters groups after, so conditions on aggregates go in HAVING.</li>
<li>Run order: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY, LIMIT. That is why aliases work in ORDER BY but not in WHERE.</li>
</ul>
`);

explain('s2',`
<h4>Why the data is split across tables</h4>
<p>Look at the <code>orders</code> table and you will not find a customer's name in it. Each order has a <code>customer_id</code> instead: just the number of the customer who placed it. The name lives in one place only, the <code>customers</code> table.</p>
<p>This is deliberate. If Ada's name were copied into every one of her orders and she changed it, you would have to find and fix every copy, and sooner or later one would be missed. Storing each fact once and pointing at it with an id avoids that. (The next lesson is all about designing tables this way.)</p>
<p>A column that holds another table's primary key, like <code>orders.customer_id</code>, is called a <b>foreign key</b>. It is the link between the two tables. The starter comment lists this shop's links:</p>
<pre class="snip">orders.customer_id     → customers.id
order_items.order_id   → orders.id
order_items.product_id → products.id</pre>
<p>The price of splitting is that answering "who placed order 3?" now needs two tables. Putting them back together is what a <b>join</b> does.</p>

<h4>How a join matches rows</h4>
<pre class="snip">SELECT c.name, o.id, o.status
FROM orders o
JOIN customers c ON c.id = o.customer_id;</pre>
<p>Here is what that asks for, in plain words:</p>
<ol>
<li><code>FROM orders o</code>: start from the orders table, and call it <code>o</code> for short.</li>
<li><code>JOIN customers c</code>: bring in the customers table, nicknamed <code>c</code>.</li>
<li><code>ON c.id = o.customer_id</code>: pair an order with a customer when the customer's id equals the order's customer_id. This is the <b>join condition</b>.</li>
<li><code>SELECT c.name, o.id, o.status</code>: from each matched pair, show the customer's name and the order's id and status.</li>
</ol>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Orders point at customers through customer_id">
<text class="t-b" x="95" y="20" text-anchor="middle">customers</text>
<text class="t-b" x="320" y="20" text-anchor="middle">orders</text>
<rect class="bx" x="20" y="30" width="110" height="28"/><rect class="bx-a" x="130" y="30" width="40" height="28"/>
<rect class="bx" x="20" y="58" width="110" height="28"/><rect class="bx-a" x="130" y="58" width="40" height="28"/>
<rect class="bx" x="20" y="86" width="110" height="28"/><rect class="bx-a" x="130" y="86" width="40" height="28"/>
<rect class="bx" x="20" y="114" width="110" height="28"/><rect class="bx-a" x="130" y="114" width="40" height="28"/>
<rect class="bx-a" x="250" y="30" width="100" height="28"/><rect class="bx" x="350" y="30" width="50" height="28"/>
<rect class="bx-a" x="250" y="58" width="100" height="28"/><rect class="bx" x="350" y="58" width="50" height="28"/>
<rect class="bx-a" x="250" y="86" width="100" height="28"/><rect class="bx" x="350" y="86" width="50" height="28"/>
<rect class="bx-a" x="250" y="114" width="100" height="28"/><rect class="bx" x="350" y="114" width="50" height="28"/>
<g text-anchor="middle">
<text class="t-b" x="75" y="49">name</text><text class="t-b" x="150" y="49">id</text>
<text class="t" x="75" y="77">Ada</text><text class="t" x="150" y="77">1</text>
<text class="t" x="75" y="105">Grace</text><text class="t" x="150" y="105">2</text>
<text class="t" x="75" y="133">Linus</text><text class="t" x="150" y="133">8</text>
<text class="t-s" x="300" y="48">customer_id</text><text class="t-b" x="375" y="49">id</text>
<text class="t" x="300" y="77">1</text><text class="t" x="375" y="77">1</text>
<text class="t" x="300" y="105">1</text><text class="t" x="375" y="105">2</text>
<text class="t" x="300" y="133">2</text><text class="t" x="375" y="133">3</text>
</g>
<path class="ln-a" d="M170 72L250 72"/><path class="ln-a" d="M170 72L250 100"/><path class="ln-a" d="M170 100L250 128"/>
<text class="t-s" x="178" y="152">no match</text>
<text class="t-m" x="210" y="190" text-anchor="middle">ON c.id = o.customer_id</text>
</svg><figcaption>Each order's customer_id points at one customer's id. Ada, id 1, matches two orders. Grace, id 2, matches one. Linus, id 8, has no orders, so nothing points at him.</figcaption></figure>
<p>Notice two things in the picture. One customer can match <b>several</b> orders, so Ada appears in the result twice, once per order. That is normal, and it is exactly what you want when listing orders. And Linus matches <b>nothing</b>, which leads to the most important choice in joins.</p>

<h4>Table aliases and qualified names</h4>
<p>The short names <code>o</code> and <code>c</code> are <b>table aliases</b>. You could write <code>FROM orders AS o</code>, but the AS is optional for tables. Once a table has an alias, you refer to its columns as <code>alias.column</code>, for example <code>o.status</code>. That is called a <b>qualified</b> column name.</p>
<p>Qualifying matters because both tables have a column called <code>id</code>. If you write just <code>id</code>, the database cannot tell which one you mean and stops with <code>ambiguous column name: id</code>. The fix is always to add the alias in front.</p>

<h4>INNER JOIN versus LEFT JOIN</h4>
<p>Plain <code>JOIN</code> is short for <code>INNER JOIN</code>. It keeps only rows that found a partner on both sides. Linus has no orders, so an inner join from customers to orders simply leaves him out.</p>
<p><code>LEFT JOIN</code> keeps <b>every</b> row from the left table, the one named in FROM, whether it found a partner or not. When there is no partner, the columns from the right table are filled with <b>NULL</b>. NULL is SQL's word for "no value here": not zero, not empty text, just missing.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="INNER JOIN gives three rows; LEFT JOIN gives four, with NULL for Linus">
<text class="t-b" x="105" y="20" text-anchor="middle">INNER JOIN</text>
<text class="t-b" x="315" y="20" text-anchor="middle">LEFT JOIN</text>
<g text-anchor="middle">
<rect class="bx" x="30" y="30" width="90" height="28"/><rect class="bx" x="120" y="30" width="60" height="28"/>
<rect class="bx-ok" x="30" y="58" width="90" height="28"/><rect class="bx-ok" x="120" y="58" width="60" height="28"/>
<rect class="bx-ok" x="30" y="86" width="90" height="28"/><rect class="bx-ok" x="120" y="86" width="60" height="28"/>
<rect class="bx-ok" x="30" y="114" width="90" height="28"/><rect class="bx-ok" x="120" y="114" width="60" height="28"/>
<text class="t-b" x="75" y="49">name</text><text class="t-b" x="150" y="49">o.id</text>
<text class="t" x="75" y="77">Ada</text><text class="t" x="150" y="77">1</text>
<text class="t" x="75" y="105">Ada</text><text class="t" x="150" y="105">2</text>
<text class="t" x="75" y="133">Grace</text><text class="t" x="150" y="133">3</text>
<rect class="bx" x="240" y="30" width="90" height="28"/><rect class="bx" x="330" y="30" width="60" height="28"/>
<rect class="bx-ok" x="240" y="58" width="90" height="28"/><rect class="bx-ok" x="330" y="58" width="60" height="28"/>
<rect class="bx-ok" x="240" y="86" width="90" height="28"/><rect class="bx-ok" x="330" y="86" width="60" height="28"/>
<rect class="bx-ok" x="240" y="114" width="90" height="28"/><rect class="bx-ok" x="330" y="114" width="60" height="28"/>
<rect class="bx-warn" x="240" y="142" width="90" height="28"/><rect class="bx-warn" x="330" y="142" width="60" height="28"/>
<text class="t-b" x="285" y="49">name</text><text class="t-b" x="360" y="49">o.id</text>
<text class="t" x="285" y="77">Ada</text><text class="t" x="360" y="77">1</text>
<text class="t" x="285" y="105">Ada</text><text class="t" x="360" y="105">2</text>
<text class="t" x="285" y="133">Grace</text><text class="t" x="360" y="133">3</text>
<text class="t" x="285" y="161">Linus</text><text class="t-b t-warn" x="360" y="161">NULL</text>
<text class="t-s" x="105" y="196">matches only</text>
<text class="t-s" x="315" y="196">every customer kept</text>
</g>
<line class="ln-d" x1="210" y1="30" x2="210" y2="200"/>
</svg><figcaption>The same three customers joined to their orders two ways. The inner join returns only the three matched pairs. The left join also keeps Linus, and because he has no order, his order id column is NULL.</figcaption></figure>
<p>That NULL is a clue you can search for. "Customers who have never ordered" are exactly the rows where the right-hand side came back empty:</p>
<pre class="snip">SELECT c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;      -- no order was found for this customer</pre>
<p>Remember the run order from the last lesson: FROM and its joins happen first, then WHERE. So the join builds the table with NULLs, and WHERE keeps only those rows.</p>
<div class="mistake"><b>Common mistake</b>Writing <code>WHERE o.id = NULL</code>. Nothing is ever "equal" to NULL, not even another NULL, because NULL means "unknown". The comparison is never true and you get no rows. Always test with <code>IS NULL</code> or <code>IS NOT NULL</code>.</div>

<h4>Chaining joins and totalling</h4>
<p>A question like "how much has each customer spent?" needs four steps of linking: customer to orders, orders to their items, and the items carry the quantity and price. You simply add one JOIN per link:</p>
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Join path: customers to orders to order_items to products">
<rect class="bx" x="20" y="20" width="150" height="40" rx="8"/><text class="t-b" x="95" y="45" text-anchor="middle">customers</text>
<rect class="bx" x="250" y="20" width="150" height="40" rx="8"/><text class="t-b" x="325" y="45" text-anchor="middle">orders</text>
<rect class="bx-a" x="250" y="110" width="150" height="40" rx="8"/><text class="t-b" x="325" y="135" text-anchor="middle">order_items</text>
<rect class="bx" x="20" y="110" width="150" height="40" rx="8"/><text class="t-b" x="95" y="135" text-anchor="middle">products</text>
<path class="ln-a" d="M170 40h72"/><polygon class="ah-a" points="240,34 240,46 248,40"/>
<text class="t-s" x="210" y="76" text-anchor="middle">customer_id</text>
<path class="ln-a" d="M325 60v42"/><polygon class="ah-a" points="319,100 331,100 325,108"/>
<text class="t-s" x="335" y="88">order_id</text>
<path class="ln" d="M250 130h-72"/><polygon class="ah" points="180,124 180,136 172,130"/>
<text class="t-s" x="210" y="165" text-anchor="middle">product_id</text>
</svg><figcaption>Each arrow is one JOIN, following one foreign key. To total what customers spent you follow the first two links. Following the third link to products lets you show product names too.</figcaption></figure>
<pre class="snip">SELECT c.name, SUM(oi.qty * oi.unit_price) AS total
FROM customers c
JOIN orders o       ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id   = o.id
GROUP BY c.id;</pre>
<p>Think through what happens to Ada. After the first join she has two rows, one per order. Order 1 has two items, so after the second join she has three rows: keyboard (1 × 89), mouse pad (1 × 9) and monitor (1 × 229). <code>qty * unit_price</code> is calculated on each row, then GROUP BY gathers Ada's three rows into one pile and SUM adds them: 327.</p>
<p>Grouping by <code>c.id</code> rather than <code>c.name</code> is a good habit: two customers can share a name, but never an id. Because the id is the primary key, the database knows each id has exactly one name, so selecting <code>c.name</code> is allowed, even in PostgreSQL.</p>
<p>From here, all the tools from the last lesson still apply: put a WHERE on <code>o.status</code> before the grouping, and an ORDER BY on the total afterwards.</p>

<h4>Subqueries: a query inside a query</h4>
<p>A <b>subquery</b> is a SELECT in brackets, used inside another statement. The inner query runs and produces a list, and the outer query uses it:</p>
<pre class="snip">-- customers who have at least one pending order
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE status = 'pending');</pre>
<p>Read it inside out: first "the customer ids on pending orders", then "customers whose id is in that list". Flip it with <code>NOT IN</code> to ask which rows are <i>not</i> in a set, which is another way to find what is missing. <code>NOT EXISTS</code> does the same job and is often preferred in larger systems:</p>
<pre class="snip">SELECT name FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);</pre>
<div class="mistake"><b>Common mistake</b><code>NOT IN</code> has a trap: if the subquery's list contains even one NULL, the whole condition returns no rows at all, because the database cannot be sure a value is "not in" a list containing an unknown. It is safe here because those columns are <code>NOT NULL</code>, but in general <code>NOT EXISTS</code> or <code>LEFT JOIN ... IS NULL</code> avoid the problem.</div>

<h4>Counting with a LEFT JOIN</h4>
<p>"Every customer with their number of orders, including zero" combines the ideas. Use a LEFT JOIN from customers so nobody is dropped, and count <code>o.id</code> rather than <code>*</code>. <code>COUNT(*)</code> counts rows, and Linus still has one row (full of NULLs), so he would wrongly score 1. <code>COUNT(o.id)</code> skips NULLs and correctly gives him 0.</p>

<div class="try"><b>Try it in your head</b>Grace (id 2) has one order, number 3, containing 2 wireless mice at 25 and 1 laptop stand at 32. How many rows does she have after joining customers, orders and order_items, and what is her total? Two rows, one per item: 2 × 25 = 50 and 1 × 32 = 32, so her total is 82.</div>

<h4>Recap</h4>
<ul>
<li>Data is split so each fact lives once. A foreign key such as <code>orders.customer_id</code> points at another table's primary key.</li>
<li><code>JOIN t ON t.id = x.t_id</code> pairs rows that match. One row can match many, so rows can repeat.</li>
<li>INNER JOIN keeps only matches. LEFT JOIN keeps every left row and fills missing right columns with NULL; <code>WHERE right.id IS NULL</code> finds rows with no match.</li>
<li>Use table aliases and qualified names like <code>o.id</code> to avoid "ambiguous column" errors. Chain one JOIN per link, then GROUP BY to total.</li>
<li>Subqueries feed one query's result into another. Prefer NOT EXISTS over NOT IN when NULLs are possible.</li>
</ul>
`);

explain('s3',`
<h4>Why the shape of your tables matters</h4>
<p>So far someone else designed the tables, and you queried them. Now you are the designer. The set of tables, their columns and the rules on them is called the <b>schema</b>. A good schema makes every later query simple and keeps bad data out. A poor one causes bugs for as long as the app lives, because changing a schema full of real data is slow and risky.</p>
<p>Imagine a first attempt at a bookshop database: one big table where each row is a book, with its author's name, the author's country and a list of tags squeezed into one column.</p>
<figure class="fig"><svg viewBox="0 0 420 290" role="img" aria-label="One flat table split into authors and books tables">
<text class="t-b t-bad" x="15" y="20">Before: one big table</text>
<g text-anchor="middle">
<rect class="bx" x="15" y="30" width="100" height="22"/><rect class="bx" x="115" y="30" width="80" height="22"/><rect class="bx" x="195" y="30" width="80" height="22"/><rect class="bx" x="275" y="30" width="130" height="22"/>
<rect class="bx" x="15" y="52" width="100" height="22"/><rect class="bx-warn" x="115" y="52" width="80" height="22"/><rect class="bx-warn" x="195" y="52" width="80" height="22"/><rect class="bx-bad" x="275" y="52" width="130" height="22"/>
<rect class="bx" x="15" y="74" width="100" height="22"/><rect class="bx-warn" x="115" y="74" width="80" height="22"/><rect class="bx-warn" x="195" y="74" width="80" height="22"/><rect class="bx-bad" x="275" y="74" width="130" height="22"/>
<rect class="bx" x="15" y="96" width="100" height="22"/><rect class="bx" x="115" y="96" width="80" height="22"/><rect class="bx" x="195" y="96" width="80" height="22"/><rect class="bx" x="275" y="96" width="130" height="22"/>
<text class="t-s" x="65" y="46">title</text><text class="t-s" x="155" y="46">author</text><text class="t-s" x="235" y="46">country</text><text class="t-s" x="340" y="46">tags</text>
<text class="t-s" x="65" y="68">Arrow of God</text><text class="t-s" x="155" y="68">Achebe</text><text class="t-s" x="235" y="68">Nigeria</text><text class="t-s" x="340" y="68">classic,africa</text>
<text class="t-s" x="65" y="90">Girls at War</text><text class="t-s" x="155" y="90">Achebe</text><text class="t-s" x="235" y="90">Nigeria</text><text class="t-s" x="340" y="90">stories,africa</text>
<text class="t-s" x="65" y="112">Beloved</text><text class="t-s" x="155" y="112">Morrison</text><text class="t-s" x="235" y="112">USA</text><text class="t-s" x="340" y="112">classic</text>
</g>
<path class="ln-ok" d="M210 126v22"/><polygon class="ah-ok" points="204,146 216,146 210,154"/>
<text class="t-b t-ok" x="15" y="170">After: each fact once</text>
<g text-anchor="middle">
<rect class="bx-ok" x="15" y="180" width="30" height="22"/><rect class="bx-ok" x="45" y="180" width="80" height="22"/><rect class="bx-ok" x="125" y="180" width="70" height="22"/>
<rect class="bx" x="15" y="202" width="30" height="22"/><rect class="bx" x="45" y="202" width="80" height="22"/><rect class="bx" x="125" y="202" width="70" height="22"/>
<rect class="bx" x="15" y="224" width="30" height="22"/><rect class="bx" x="45" y="224" width="80" height="22"/><rect class="bx" x="125" y="224" width="70" height="22"/>
<text class="t-s" x="30" y="196">id</text><text class="t-s" x="85" y="196">name</text><text class="t-s" x="160" y="196">country</text>
<text class="t-s" x="30" y="218">1</text><text class="t-s" x="85" y="218">Achebe</text><text class="t-s" x="160" y="218">Nigeria</text>
<text class="t-s" x="30" y="240">2</text><text class="t-s" x="85" y="240">Morrison</text><text class="t-s" x="160" y="240">USA</text>
<text class="t-s" x="105" y="266">authors</text>
<rect class="bx-ok" x="215" y="180" width="30" height="22"/><rect class="bx-ok" x="245" y="180" width="90" height="22"/><rect class="bx-a" x="335" y="180" width="70" height="22"/>
<rect class="bx" x="215" y="202" width="30" height="22"/><rect class="bx" x="245" y="202" width="90" height="22"/><rect class="bx" x="335" y="202" width="70" height="22"/>
<rect class="bx" x="215" y="224" width="30" height="22"/><rect class="bx" x="245" y="224" width="90" height="22"/><rect class="bx" x="335" y="224" width="70" height="22"/>
<rect class="bx" x="215" y="246" width="30" height="22"/><rect class="bx" x="245" y="246" width="90" height="22"/><rect class="bx" x="335" y="246" width="70" height="22"/>
<text class="t-s" x="230" y="196">id</text><text class="t-s" x="290" y="196">title</text><text class="t-s" x="370" y="196">author_id</text>
<text class="t-s" x="230" y="218">1</text><text class="t-s" x="290" y="218">Arrow of God</text><text class="t-s" x="370" y="218">1</text>
<text class="t-s" x="230" y="240">2</text><text class="t-s" x="290" y="240">Girls at War</text><text class="t-s" x="370" y="240">1</text>
<text class="t-s" x="230" y="262">3</text><text class="t-s" x="290" y="262">Beloved</text><text class="t-s" x="370" y="262">2</text>
<text class="t-s" x="310" y="284">books</text>
</g>
</svg><figcaption>Before, Achebe's name and country are repeated on every one of his books, shown in amber, and several tags are crammed into one cell, shown in red. After, each author is stored once in an authors table, and each book points at its author with an author_id number. Tags get their own tables, shown in the next diagram.</figcaption></figure>
<p>The flat table works on day one, but it has three hidden problems, known as <b>anomalies</b>:</p>
<ul>
<li><b>Update anomaly.</b> If a country name is corrected, you must change it on every one of that author's rows. Miss one and the data now contradicts itself.</li>
<li><b>Insert anomaly.</b> You cannot record a new author until they have a book, because a row is a book.</li>
<li><b>Delete anomaly.</b> Delete an author's last book and you lose everything you knew about the author.</li>
</ul>
<p>The cure is <b>normalisation</b>: splitting data into tables so that <b>each fact is stored exactly once</b>, and linking the tables with ids.</p>

<h4>CREATE TABLE: building a table</h4>
<p>You make a table with <code>CREATE TABLE</code>, listing each column's name, its type and any rules:</p>
<pre class="snip">CREATE TABLE authors (
  id      INTEGER PRIMARY KEY,   -- unique id, filled in automatically
  name    TEXT NOT NULL,         -- every author must have a name
  country TEXT                   -- optional: may be left empty (NULL)
);</pre>
<p>Columns are separated by commas, with no comma after the last one. The common types are <code>INTEGER</code> for whole numbers, <code>REAL</code> for decimals and <code>TEXT</code> for text. (PostgreSQL has many more, such as dates and true/false values; SQLite keeps it simple.)</p>
<p>Every table should have a <b>primary key</b>. Usually that is a meaningless number, <code>id</code>, which never changes even if the author's name does. That makes it a safe thing for other tables to point at.</p>
<p>In this lesson's sandbox each Run starts with an <b>empty</b> database, so your file must contain every CREATE TABLE, in order, every time.</p>

<h4>One-to-many: the foreign key goes on the "many" side</h4>
<p>An author can write many books, but each book has one author. That is a <b>one-to-many</b> relationship. You link them with a <b>foreign key</b>: a column on one table that holds the primary key of a row in another.</p>
<p>The question is which side gets it. A cell holds one value, so <code>authors</code> cannot hold a list of book ids. But each book needs to store only one author id. So the foreign key always goes on the "many" side:</p>
<pre class="snip">CREATE TABLE books (
  id        INTEGER PRIMARY KEY,
  title     TEXT NOT NULL,
  author_id INTEGER NOT NULL REFERENCES authors(id)
);</pre>
<p><code>REFERENCES authors(id)</code> declares that <code>author_id</code> must match an existing author's id. The database can then refuse a book whose author does not exist. Create <code>authors</code> before <code>books</code>, and insert authors before their books, so the thing being pointed at always exists first.</p>

<h4>Many-to-many: a join table</h4>
<p>Tags are different. One book has many tags, and one tag, such as "classic", belongs to many books. Neither side can hold a single foreign key, and a comma list is the broken design from the start. The answer is a third table, a <b>join table</b>, where each row records one pairing:</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="One-to-many: authors to books. Many-to-many: books to book_tags to tags">
<text class="t-s" x="210" y="18" text-anchor="middle">one-to-many</text>
<rect class="bx" x="50" y="28" width="120" height="40" rx="8"/><text class="t-b" x="110" y="53" text-anchor="middle">authors</text>
<rect class="bx" x="250" y="28" width="120" height="40" rx="8"/><text class="t-b" x="310" y="53" text-anchor="middle">books</text>
<path class="ln-a" d="M170 48h80"/>
<text class="t-s t-a" x="178" y="42">1</text><text class="t-s t-a" x="210" y="42">many</text>
<text class="t-s" x="310" y="86" text-anchor="middle">has author_id</text>
<line class="ln-d" x1="10" y1="102" x2="410" y2="102"/>
<text class="t-s" x="210" y="122" text-anchor="middle">many-to-many</text>
<rect class="bx" x="10" y="134" width="110" height="40" rx="8"/><text class="t-b" x="65" y="159" text-anchor="middle">books</text>
<rect class="bx-a" x="155" y="134" width="110" height="40" rx="8"/><text class="t-b" x="210" y="159" text-anchor="middle">book_tags</text>
<rect class="bx" x="300" y="134" width="110" height="40" rx="8"/><text class="t-b" x="355" y="159" text-anchor="middle">tags</text>
<path class="ln-a" d="M120 154h35"/><path class="ln-a" d="M265 154h35"/>
<text class="t-s" x="210" y="196" text-anchor="middle">rows like (book 1, tag 1)</text>
<text class="t-s" x="210" y="214" text-anchor="middle">key: (book_id, tag_id)</text>
</svg><figcaption>Top: one author has many books, so books carries the author_id. Bottom: books and tags are many-to-many, so a join table called book_tags sits between them. Each of its rows pairs one book id with one tag id, and the pair is its primary key.</figcaption></figure>
<pre class="snip">CREATE TABLE book_tags (
  book_id INTEGER NOT NULL REFERENCES books(id),
  tag_id  INTEGER NOT NULL REFERENCES tags(id),
  PRIMARY KEY (book_id, tag_id)   -- the PAIR must be unique
);</pre>
<p>The last line is a <b>composite primary key</b>: a key made of two columns together. Book 1 can appear many times, and tag 1 can appear many times, but the pair (1, 1) can appear only once. So a book can never get the same tag twice.</p>
<p>To read the tags back, you join through the middle table, two joins in a row, exactly like the chains in the last lesson: books to book_tags on the book id, then book_tags to tags on the tag id.</p>

<h4>Let the database enforce the rules</h4>
<p>Your app's code will check things, but code has bugs, and data can arrive from scripts, admin tools or a second app. <b>Constraints</b> are rules written into the schema, and the database checks them on every single change, whoever makes it:</p>
<div class="tbl-wrap"><table><tr><th>Constraint</th><th>Rule</th><th>Example</th></tr>
<tr><td><code>PRIMARY KEY</code></td><td>Unique and identifies the row</td><td><code>id INTEGER PRIMARY KEY</code></td></tr>
<tr><td><code>NOT NULL</code></td><td>A value is required</td><td><code>title TEXT NOT NULL</code></td></tr>
<tr><td><code>UNIQUE</code></td><td>No two rows may share this value</td><td><code>name TEXT NOT NULL UNIQUE</code> on tags</td></tr>
<tr><td><code>CHECK</code></td><td>A condition must be true</td><td><code>CHECK (published_year &gt; 0)</code></td></tr>
<tr><td><code>REFERENCES</code></td><td>Must point at an existing row</td><td><code>REFERENCES authors(id)</code></td></tr></table></div>
<div class="tip"><b>Tip</b>PostgreSQL and MySQL always enforce foreign keys. SQLite, for historical reasons, only does so after <code>PRAGMA foreign_keys = ON;</code> is run on the connection, so real SQLite apps switch it on at startup. The declaration is still recorded either way.</div>

<h4>The normal forms in one sentence</h4>
<p>Textbooks describe "normal forms", numbered rules for a good schema. You don't need to memorise them, but the first three boil down to this:</p>
<ul>
<li><b>First normal form:</b> one value per cell. No comma lists, no "phone1, phone2, phone3" columns.</li>
<li><b>Second and third normal forms:</b> every column must describe the row's key, the whole key, and nothing but the key. An author's country describes the author, not the book, so it belongs in authors.</li>
</ul>

<h4>Errors and mistakes you will meet</h4>
<div class="tbl-wrap"><table><tr><th>Message</th><th>What it means</th></tr>
<tr><td><code>table authors already exists</code></td><td>The same CREATE TABLE appears twice in your file.</td></tr>
<tr><td><code>UNIQUE constraint failed: tags.name</code></td><td>You inserted a tag name that is already there.</td></tr>
<tr><td><code>FOREIGN KEY constraint failed</code></td><td>(With enforcement on) a row points at an id that does not exist.</td></tr></table></div>
<div class="mistake"><b>Common mistake</b>Storing a list in one column, like <code>tags = 'fantasy,classic'</code>. You cannot index it, join on it, stop typos like "fantsy", or rename a tag everywhere at once. A comma inside a cell is a sign of a missing table.</div>
<div class="mistake"><b>Common mistake</b>Putting the foreign key on the "one" side, such as a <code>book_id</code> column on authors. Then an author can only ever have one book. Ask "which side has many?" and put the key there.</div>
<div class="try"><b>Try it in your head</b>A school has students and courses. A student takes many courses, and a course has many students. How do you model it? Neither side can hold the key, so add a join table such as <code>enrolments(student_id, course_id)</code> with <code>PRIMARY KEY (student_id, course_id)</code>. If you also need each student's grade, it goes in that join table, because a grade describes one student in one course.</div>

<h4>Recap</h4>
<ul>
<li>Store each fact once. Repeated values and comma lists cause update, insert and delete anomalies.</li>
<li>Every table gets a primary key. A foreign key, <code>REFERENCES other(id)</code>, links a row to a row in another table.</li>
<li>One-to-many: the foreign key goes on the "many" side, like <code>books.author_id</code>.</li>
<li>Many-to-many: a join table such as <code>book_tags</code>, whose primary key is the pair <code>(book_id, tag_id)</code>.</li>
<li>Use NOT NULL, UNIQUE, CHECK and REFERENCES so the database itself refuses bad data.</li>
</ul>
`);

explain('s4',`
<h4>Why a correct query can still be too slow</h4>
<p>The <code>events</code> table in this lesson has 20,000 rows: logins, page views and purchases by 500 different users. The starter asks for one user's events. The answer is correct and comes back quickly in your browser. So what is the problem?</p>
<p>The problem is <i>how</i> the database found those rows. With no help, it has only one option: start at row 1 and check every single row, asking "is this user42?". That is called a <b>full table scan</b>. At 20,000 rows it takes a blink. At 50 million rows, with hundreds of users loading pages every second, each running that query, it is the reason a website grinds to a halt. Slow queries are one of the most common causes of slow apps, and the most common fix is an <b>index</b>.</p>
<div class="analogy"><b>Think of it like</b>The index at the back of a book. To find every page that mentions "Lagos", you could read the whole book, or you could look up "Lagos" in the alphabetical index, which lists page numbers. The index is extra pages that the publisher had to prepare, but it turns a long search into a short one.</div>

<h4>What an index really is</h4>
<p>An index is a separate structure, stored alongside the table, that keeps the values of one or more columns <b>in sorted order</b>, each with a pointer back to its row. The table itself stays in whatever order rows arrived in. Only the index is sorted.</p>
<p>Sorting is the whole trick. In a sorted list you never need to check everything. Open it in the middle: is user42 before or after this point? Throw away the half it cannot be in, and repeat. Each step halves what is left, so 20,000 entries need only about 15 steps instead of 20,000.</p>
<p>Real databases store indexes as a <b>B-tree</b>, a sorted tree that is very wide and very shallow. Each box in the tree, called a node, holds hundreds of keys, so even a table with millions of rows needs only three or four steps from the top of the tree to the right entry.</p>
<figure class="fig"><svg viewBox="0 0 420 250" role="img" aria-label="A full scan reads every row; a B-tree index follows one short path">
<text class="t-b" x="70" y="22" text-anchor="middle">No index</text>
<rect class="bx-warn" x="20" y="36" width="100" height="10"/><rect class="bx-warn" x="20" y="49" width="100" height="10"/><rect class="bx-warn" x="20" y="62" width="100" height="10"/><rect class="bx-warn" x="20" y="75" width="100" height="10"/><rect class="bx-warn" x="20" y="88" width="100" height="10"/><rect class="bx-warn" x="20" y="101" width="100" height="10"/><rect class="bx-warn" x="20" y="114" width="100" height="10"/><rect class="bx-warn" x="20" y="127" width="100" height="10"/><rect class="bx-warn" x="20" y="140" width="100" height="10"/><rect class="bx-warn" x="20" y="153" width="100" height="10"/><rect class="bx-warn" x="20" y="166" width="100" height="10"/><rect class="bx-warn" x="20" y="179" width="100" height="10"/>
<path class="ln" d="M132 36v150"/><polygon class="ah" points="126,182 138,182 132,192"/>
<text class="t-s" x="70" y="214" text-anchor="middle">SCAN: check</text><text class="t-s" x="70" y="232" text-anchor="middle">all 20,000 rows</text>
<line class="ln-d" x1="155" y1="20" x2="155" y2="236"/>
<text class="t-b" x="288" y="22" text-anchor="middle">With an index</text>
<rect class="bx-ok" x="243" y="36" width="90" height="30" rx="6"/><text class="t-m" x="288" y="57" text-anchor="middle">g | p</text>
<rect class="bx" x="170" y="104" width="70" height="30" rx="6"/><text class="t-m" x="205" y="125" text-anchor="middle">a–f</text>
<rect class="bx-ok" x="253" y="104" width="70" height="30" rx="6"/><text class="t-m" x="288" y="125" text-anchor="middle">g–o</text>
<rect class="bx" x="336" y="104" width="70" height="30" rx="6"/><text class="t-m" x="371" y="125" text-anchor="middle">p–z</text>
<path class="ln" d="M258 66L210 104"/><path class="ln-ok" d="M288 66v30"/><polygon class="ah-ok" points="282,94 294,94 288,102"/><path class="ln" d="M318 66L366 104"/>
<path class="ln-ok" d="M288 134v30"/><polygon class="ah-ok" points="282,162 294,162 288,170"/>
<rect class="bx-ok" x="208" y="172" width="160" height="28" rx="6"/><text class="t-s" x="288" y="191" text-anchor="middle">grace@… → row 812</text>
<text class="t-s" x="288" y="232" text-anchor="middle">SEARCH: a few steps</text>
</svg><figcaption>Left: without an index, the database checks every row. Right: an index is a sorted tree. To find grace, it reads the top node, which says g to o is in the middle branch, follows that one branch, and lands on the entry that points straight at the right row.</figcaption></figure>

<h4>Reading a query plan</h4>
<p>You do not have to guess whether a query uses an index. Put <code>EXPLAIN QUERY PLAN</code> in front of a query and SQLite tells you how it <i>would</i> run it, without running it. That description is the <b>query plan</b>.</p>
<pre class="snip">EXPLAIN QUERY PLAN
SELECT * FROM events WHERE user_email = 'user42@example.com';
-- SCAN events</pre>
<p>There are two words to look for:</p>
<ul>
<li><b>SCAN</b> means "read the table from top to bottom". On a big table, inside a frequent query, it is the warning sign.</li>
<li><b>SEARCH ... USING INDEX</b> means "jump straight to the matching rows through an index". That is what you want.</li>
</ul>
<p>Now create an index on the column you filter on, and ask again:</p>
<pre class="snip">CREATE INDEX idx_events_user_email ON events(user_email);
-- plan now reads:
-- SEARCH events USING INDEX idx_events_user_email (user_email=?)</pre>
<p>Piece by piece: <code>CREATE INDEX</code>, then a name of your choosing (the habit is <code>idx_table_column</code>, so you can recognise it later), then <code>ON table(column)</code>. The <code>(user_email=?)</code> in the plan says which condition the index is being used for; the question mark stands for "whatever value you search for". Remember that every Run starts fresh, so the CREATE INDEX must sit above the EXPLAIN in your file.</p>
<p>You may also see <b>USING COVERING INDEX</b>. That is even better: every column the query needs is inside the index itself, so the database never has to visit the table at all.</p>
<div class="tip"><b>PostgreSQL</b>The same idea is <code>EXPLAIN</code>, or <code>EXPLAIN ANALYZE</code>, which actually runs the query and reports real timings. There, the warning sign is "Seq Scan" (sequential scan) on a big table, and the good sign is "Index Scan" or "Index Only Scan".</div>

<h4>Composite indexes and the leftmost rule</h4>
<p>Many queries filter on two columns, such as "this user's events since June":</p>
<pre class="snip">SELECT * FROM events
WHERE user_email = 'user42@example.com' AND created_at &gt;= '2025-06-01';</pre>
<p>A <b>composite index</b> covers several columns at once: <code>CREATE INDEX ... ON events(user_email, created_at)</code>. The order of the columns matters enormously. The index is sorted by the <b>first</b> column, and only within equal first values is it sorted by the second, exactly like a phone book sorted by surname and then by first name.</p>
<figure class="fig"><svg viewBox="0 0 420 260" role="img" aria-label="A composite index sorted by email then date; one query uses a contiguous block, the other is scattered">
<text class="t-s" x="125" y="22" text-anchor="middle">index on (email, date)</text>
<g text-anchor="middle">
<rect class="bx" x="20" y="36" width="70" height="22"/><rect class="bx" x="90" y="36" width="140" height="22"/>
<rect class="bx" x="20" y="58" width="70" height="22"/><rect class="bx" x="90" y="58" width="140" height="22"/>
<rect class="bx" x="20" y="80" width="70" height="22"/><rect class="bx" x="90" y="80" width="140" height="22"/>
<rect class="bx" x="20" y="102" width="70" height="22"/><rect class="bx" x="90" y="102" width="140" height="22"/>
<rect class="bx" x="20" y="124" width="70" height="22"/><rect class="bx" x="90" y="124" width="140" height="22"/>
<rect class="bx" x="20" y="146" width="70" height="22"/><rect class="bx" x="90" y="146" width="140" height="22"/>
<rect class="bx-ok" x="20" y="168" width="70" height="22"/><rect class="bx-ok" x="90" y="168" width="140" height="22"/>
<rect class="bx-ok" x="20" y="190" width="70" height="22"/><rect class="bx-ok" x="90" y="190" width="140" height="22"/>
<text class="t-m" x="55" y="52">ada</text><text class="t-m" x="160" y="52">2025-01-03</text>
<text class="t-m" x="55" y="74">ada</text><text class="t-m" x="160" y="74">2025-06-10</text>
<text class="t-m" x="55" y="96">ada</text><text class="t-m" x="160" y="96">2025-07-02</text>
<text class="t-m" x="55" y="118">bob</text><text class="t-m" x="160" y="118">2025-02-14</text>
<text class="t-m" x="55" y="140">bob</text><text class="t-m" x="160" y="140">2025-06-20</text>
<text class="t-m" x="55" y="162">cy</text><text class="t-m" x="160" y="162">2025-01-09</text>
<text class="t-m" x="55" y="184">cy</text><text class="t-m" x="160" y="184">2025-06-05</text>
<text class="t-m" x="55" y="206">cy</text><text class="t-m" x="160" y="206">2025-08-30</text>
<text class="t-s t-ok" x="290" y="22">cy, since</text><text class="t-s t-ok" x="290" y="36">June</text>
<text class="t-s t-a" x="370" y="22">since June,</text><text class="t-s t-a" x="370" y="36">any user</text>
</g>
<circle class="dot-ok" cx="290" cy="179" r="7"/><circle class="dot-ok" cx="290" cy="201" r="7"/>
<path class="ln-ok" d="M276 170v40"/>
<circle class="dot" cx="370" cy="69" r="7"/><circle class="dot" cx="370" cy="91" r="7"/><circle class="dot" cx="370" cy="135" r="7"/><circle class="dot" cx="370" cy="179" r="7"/><circle class="dot" cx="370" cy="201" r="7"/>
<text class="t-s t-ok" x="290" y="236" text-anchor="middle">one block</text>
<text class="t-s t-a" x="370" y="236" text-anchor="middle">scattered</text>
</svg><figcaption>A composite index is sorted by email first, then by date within each email. The matches for "cy, since June" sit together in one block, so the database jumps there and reads two entries. The matches for "since June, any user" are scattered through the whole index, so the index cannot take it straight to them.</figcaption></figure>
<p>This gives the <b>leftmost prefix rule</b>: an index on <code>(a, b)</code> helps queries that filter on <code>a</code>, or on <code>a</code> and <code>b</code> together. It does not help a query that filters only on <code>b</code>, just as a phone book cannot quickly find "everyone called Ada" regardless of surname. So list the column you filter by equality first, and the range column (like a date) after it.</p>

<h4>Indexes are not free</h4>
<p>If indexes are so good, why not index every column? Because each index is a second copy of some of the data, kept sorted at all times:</p>
<ul>
<li><b>Writes get slower.</b> Every INSERT, every DELETE and every UPDATE of an indexed column must also update each affected index.</li>
<li><b>They take space</b> on disk and in memory.</li>
<li><b>Some barely help.</b> The <code>type</code> column has only three values, so "all the views" is a third of the table. Reading a third of the table through an index can be slower than a plain scan, and the database's planner may simply ignore the index.</li>
</ul>
<p>The professional approach is to index for your <b>real</b> queries: the columns you filter on, join on and sort by often, especially foreign keys like <code>orders.customer_id</code>.</p>
<div class="mistake"><b>Common mistake</b>Wrapping the column in a function: <code>WHERE lower(user_email) = '...'</code>. The index is sorted by the raw email, not by its lower-case version, so the database falls back to a scan. The same happens with a leading wildcard such as <code>LIKE '%@example.com'</code>, because the index cannot be entered by the end of a value.</div>
<div class="mistake"><b>Common mistake</b>Creating the composite index in the wrong order, <code>(created_at, user_email)</code>, for a query that filters on one exact user and a date range. Equality column first, range column second.</div>
<div class="try"><b>Try it in your head</b>You have an index on <code>(user_email, created_at)</code>. Which of these can use it: (1) <code>WHERE user_email = 'a'</code>, (2) <code>WHERE created_at &gt; '2025-03-01'</code>, (3) <code>WHERE user_email = 'a' ORDER BY created_at</code>? Answer: 1 and 3. Number 3 even gets its sorting for free, because within one email the index is already in date order. Number 2 skips the leftmost column, so it cannot.</div>

<h4>Recap</h4>
<ul>
<li>Without an index, a filter means a full scan of every row. <code>EXPLAIN QUERY PLAN</code> shows it as <b>SCAN</b>.</li>
<li><code>CREATE INDEX idx_name ON table(col)</code> builds a sorted B-tree; the plan then shows <b>SEARCH ... USING INDEX</b>.</li>
<li>A composite index <code>(a, b)</code> is sorted by a, then b. It serves filters on a, or a and b, but not b alone: the leftmost prefix rule.</li>
<li>Indexes cost write speed and space, so add them for the queries you actually run.</li>
<li>In PostgreSQL, use <code>EXPLAIN ANALYZE</code> and watch for "Seq Scan" on big tables.</li>
</ul>
`);

explain('s5',`
<h4>The problem: a job that takes two steps</h4>
<p>Ada has 500 in her bank account and Grace has 300. Ada sends Grace 200. To the bank's database that is two separate changes:</p>
<pre class="snip">UPDATE accounts SET balance = balance - 200 WHERE id = 1;  -- Ada pays
UPDATE accounts SET balance = balance + 200 WHERE id = 2;  -- Grace receives</pre>
<p>Now imagine the server crashes, or loses power, or the app hits a bug, in the tiny gap between those two lines. Ada's 200 has left her account, but it never reached Grace's. Before the transfer the bank held 800 in total. Afterwards it holds 600. Money has simply vanished.</p>
<p>Crashes are rare, but a busy system runs millions of transfers, so "rare" happens every week. The database needs a way to treat several changes as <b>one indivisible unit</b>. That unit is a <b>transaction</b>.</p>
<figure class="fig"><svg viewBox="0 0 420 220" role="img" aria-label="Without a transaction a crash loses 200; with one, the change is undone">
<text class="t-b t-bad" x="10" y="22">No transaction</text>
<rect class="bx-ok" x="10" y="34" width="85" height="40" rx="6"/><text class="t" x="52" y="59" text-anchor="middle">Ada −200</text>
<rect class="bx-bad" x="115" y="34" width="85" height="40" rx="6"/><text class="t-b t-bad" x="157" y="59" text-anchor="middle">crash</text>
<rect class="bx" x="220" y="34" width="85" height="40" rx="6"/><text class="t-s" x="262" y="51" text-anchor="middle">Grace +200</text><text class="t-s" x="262" y="67" text-anchor="middle">never runs</text>
<rect class="bx-bad" x="325" y="34" width="85" height="40" rx="6"/><text class="t-s" x="367" y="51" text-anchor="middle">total</text><text class="t-b t-bad" x="367" y="68" text-anchor="middle">600</text>
<path class="ln" d="M95 54h14"/><polygon class="ah" points="107,49 107,59 114,54"/>
<path class="ln-d" d="M200 54h14"/><path class="ln" d="M305 54h14"/><polygon class="ah" points="317,49 317,59 324,54"/>
<line class="ln-d" x1="10" y1="100" x2="410" y2="100"/>
<text class="t-b t-ok" x="10" y="128">Inside a transaction</text>
<rect class="bx" x="10" y="140" width="85" height="40" rx="6"/><text class="t-m" x="52" y="165" text-anchor="middle">BEGIN</text>
<rect class="bx-ok" x="115" y="140" width="85" height="40" rx="6"/><text class="t" x="157" y="165" text-anchor="middle">Ada −200</text>
<rect class="bx-bad" x="220" y="140" width="85" height="40" rx="6"/><text class="t-b t-bad" x="262" y="165" text-anchor="middle">crash</text>
<rect class="bx-ok" x="325" y="140" width="85" height="40" rx="6"/><text class="t-s" x="367" y="157" text-anchor="middle">undone:</text><text class="t-b t-ok" x="367" y="174" text-anchor="middle">total 800</text>
<path class="ln" d="M95 160h14"/><polygon class="ah" points="107,155 107,165 114,160"/>
<path class="ln" d="M200 160h14"/><polygon class="ah" points="212,155 212,165 219,160"/>
<path class="ln-ok" d="M305 160h14"/><polygon class="ah-ok" points="317,155 317,165 324,160"/>
<text class="t-s" x="210" y="208" text-anchor="middle">never committed, so the database rolls it back</text>
</svg><figcaption>Top: without a transaction, the first update is saved, the crash stops the second, and 200 disappears. Bottom: inside a transaction nothing is final until COMMIT. After the crash the database undoes the half-finished work, so both balances are back as they were and the total is still 800.</figcaption></figure>

<h4>BEGIN, COMMIT and ROLLBACK</h4>
<p>You mark the start of a transaction with <code>BEGIN</code> and the end with one of two words:</p>
<ul>
<li><code>COMMIT</code>: "I'm done, make all of it permanent".</li>
<li><code>ROLLBACK</code>: "Forget it, undo everything since BEGIN".</li>
</ul>
<pre class="snip">BEGIN;
UPDATE accounts SET balance = balance - 200 WHERE id = 1;
UPDATE accounts SET balance = balance + 200 WHERE id = 2;
COMMIT;
SELECT * FROM accounts;   -- Ada 300, Grace 500</pre>
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="BEGIN, then statements, then either COMMIT or ROLLBACK">
<rect class="bx" x="10" y="72" width="80" height="40" rx="8"/><text class="t-m" x="50" y="97" text-anchor="middle">BEGIN</text>
<path class="ln" d="M90 92h18"/><polygon class="ah" points="106,86 106,98 114,92"/>
<rect class="bx-a" x="116" y="62" width="130" height="60" rx="8"/><text class="t" x="181" y="88" text-anchor="middle">changes,</text><text class="t" x="181" y="108" text-anchor="middle">not final yet</text>
<path class="ln-ok" d="M246 80L286 46"/><polygon class="ah-ok" points="280,42 290,50 292,40"/>
<path class="ln" d="M246 104L286 138"/><polygon class="ah" points="280,142 290,134 292,144"/>
<rect class="bx-ok" x="292" y="20" width="118" height="40" rx="8"/><text class="t-m" x="351" y="45" text-anchor="middle">COMMIT</text>
<text class="t-s" x="351" y="78" text-anchor="middle">all saved for good</text>
<rect class="bx-warn" x="292" y="124" width="118" height="40" rx="8"/><text class="t-m" x="351" y="149" text-anchor="middle">ROLLBACK</text>
<text class="t-s" x="351" y="182" text-anchor="middle">all undone</text>
</svg><figcaption>After BEGIN, every change is provisional. COMMIT makes all of them permanent at once. ROLLBACK, or a crash before COMMIT, throws all of them away, as if the transaction never happened.</figcaption></figure>
<p>What if you never write BEGIN? Then the database runs in <b>autocommit</b> mode: each statement on its own is a tiny transaction that commits the moment it finishes. That is fine for single changes, and dangerous for jobs that need two or more.</p>
<p>ROLLBACK is worth trying deliberately, because seeing it work builds trust:</p>
<pre class="snip">BEGIN;
UPDATE accounts SET balance = 0 WHERE id = 1;   -- oops
ROLLBACK;
SELECT * FROM accounts;   -- Ada still has 500</pre>
<p>In a real app the code usually looks like this: begin, run the statements, and if anything goes wrong, roll back; otherwise commit. Most database libraries give you a helper that does exactly that.</p>

<h4>ACID: the four promises</h4>
<p>Transactions in databases like PostgreSQL, MySQL and SQLite come with four guarantees, remembered as <b>ACID</b>:</p>
<div class="tbl-wrap"><table><tr><th>Letter</th><th>Promise</th><th>In the bank example</th></tr>
<tr><td><b>A</b>tomic</td><td>All of the changes happen, or none do.</td><td>No half transfers.</td></tr>
<tr><td><b>C</b>onsistent</td><td>Every rule (constraint) holds after each transaction.</td><td>No balance ever ends below zero.</td></tr>
<tr><td><b>I</b>solated</td><td>Transactions running at the same time don't see each other's half-done work.</td><td>A report running mid-transfer never sees the 600 total.</td></tr>
<tr><td><b>D</b>urable</td><td>Once COMMIT returns, the change survives a crash or power cut.</td><td>The bank can tell Ada "sent" and mean it.</td></tr></table></div>
<p>"Atomic" comes from the Greek for "cannot be cut": the transaction cannot be split in half. Durability is achieved by writing changes to a log on disk before COMMIT reports success.</p>

<h4>Constraints: rules the database refuses to break</h4>
<p>Transactions protect against half-done work. <b>Constraints</b> protect against wrong work. Look at how this lesson's tables are defined:</p>
<pre class="snip">balance INTEGER NOT NULL CHECK (balance &gt;= 0)
email   TEXT NOT NULL UNIQUE</pre>
<p>A <code>CHECK</code> constraint is a condition every row must satisfy. <code>UNIQUE</code> means no two rows may share the value. You met both, along with NOT NULL and foreign keys, in the schema lesson. Here is the point of them: they are enforced <b>by the database, on every change</b>, no matter which part of which app sent it. Your code may have a bug that forgets to check Ada's balance. The CHECK does not forget.</p>
<pre class="snip">UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
-- Error: CHECK constraint failed: balance &gt;= 0
INSERT INTO users (email) VALUES ('ada@example.com');
-- Error: UNIQUE constraint failed: users.email</pre>
<p>Read these errors as good news. The bad change was refused, the row is untouched, and the message even names the rule and the column. A UNIQUE error on sign-up is how many apps detect "this email is already registered".</p>

<h4>When a statement fails inside a transaction</h4>
<p>Constraints and transactions work as a team. Suppose a transfer's second UPDATE breaks a rule. The failed statement makes no change. What happens to the rest of the transaction depends on the database:</p>
<ul>
<li><b>SQLite</b> undoes only the failed statement and leaves the transaction open. Your code must then decide, and almost always the right decision is <code>ROLLBACK</code>.</li>
<li><b>PostgreSQL</b> marks the whole transaction as failed. Every further statement is refused with "current transaction is aborted" until you ROLLBACK.</li>
</ul>
<p>Either way, the rule for your app is the same: <b>on any error inside a transaction, roll back.</b></p>
<div class="mistake"><b>Common mistake</b>Reading a balance into your app, doing the maths there, then writing the new number back: "Ada has 500, so set it to 300". If two transfers do that at the same moment, both read 500 and one change is lost. Let the database do the arithmetic in one statement, <code>SET balance = balance - 200</code>, inside a transaction.</div>
<div class="mistake"><b>Common mistake</b>Writing <code>BEGIN</code> and forgetting <code>COMMIT</code>. Your changes look fine from inside your own connection, but nobody else sees them, and they vanish when the connection closes. Every BEGIN needs a COMMIT or a ROLLBACK.</div>
<div class="try"><b>Try it in your head</b>Starting from Ada 500 and Grace 300, you run: <code>BEGIN;</code> take 200 from Ada; give 200 to Grace; <code>ROLLBACK;</code>. Then you take 100 from Ada with no transaction. What are the balances? The rollback undoes both transfer steps, so Ada is back to 500 and Grace to 300. The last update commits on its own, leaving Ada 400 and Grace 300.</div>

<h4>Recap</h4>
<ul>
<li>A transaction groups statements: <code>BEGIN;</code> ... <code>COMMIT;</code> saves all of them, <code>ROLLBACK;</code> undoes all of them.</li>
<li>Without BEGIN, each statement commits on its own (autocommit), so multi-step jobs can be left half done.</li>
<li>ACID: atomic (all or nothing), consistent (rules hold), isolated (no peeking at half-done work), durable (committed means saved).</li>
<li>Constraints like <code>CHECK (balance &gt;= 0)</code>, <code>UNIQUE</code> and <code>NOT NULL</code> make the database refuse bad data, whoever sends it.</li>
<li>If anything fails inside a transaction, roll back.</li>
</ul>
`);

explain('s6',`
<h4>Why there is more than one kind of database</h4>
<p>Everything in this track so far has used a <b>relational</b> database: tables, SQL, joins, constraints and transactions. For an app's main records, such as users, orders and payments, that is almost always the right choice. But some jobs have a very different shape:</p>
<ul>
<li>"Is this person logged in?" is asked on every single page view, and only needs a tiny piece of data.</li>
<li>"How many times was this page viewed?" means thousands of +1s per second.</li>
<li>"Send this email later" needs a waiting line of jobs.</li>
</ul>
<p>A relational database can do all of these, but it is built for safety and rich queries, not raw speed on tiny lookups. So teams usually keep their main data in PostgreSQL or MySQL and add a second, specialised store for the fast, temporary jobs. The most popular one is <b>Redis</b>.</p>

<h4>PostgreSQL and MySQL: the relational workhorses</h4>
<p>Both are mature, free, open-source relational databases, and both speak SQL with ACID transactions. Everything you learned in SQLite carries over, with small differences in syntax and types.</p>
<ul>
<li><b>PostgreSQL</b> ("Postgres") is the usual default for new projects. It has strict, careful behaviour, rich types including <code>JSONB</code> for storing JSON documents inside a column, and powerful extensions such as PostGIS for maps and pgvector for AI search.</li>
<li><b>MySQL</b> (and its close cousin MariaDB) is everywhere, especially behind PHP apps such as WordPress. It does the same core job very well.</li>
</ul>
<p>SQLite, which you have been using, is a third option: a whole database in a single file, built into your program. It is ideal for phones, desktop apps, tests and small sites, but a busy web app with many servers writing at once normally uses Postgres or MySQL.</p>

<h4>Redis: a key-value store in memory</h4>
<p>Redis has no tables and no SQL. It is a <b>key-value store</b>: a giant dictionary where you store a value under a name, the <b>key</b>, and later fetch it by that exact name. There are no joins and no WHERE clauses. You always ask for a key you already know.</p>
<p>Its second big idea is that it keeps all its data in <b>memory</b> (RAM) rather than on disk. Memory is many times faster to reach than even a fast SSD, so a Redis lookup typically takes well under a millisecond. The trade-off is that memory is smaller and more expensive than disk, and data held only in memory is lost if the server stops. Redis can save snapshots and a log of writes to disk, but the safest mental model is: <b>Redis holds copies and temporary things; your relational database holds the truth.</b></p>
<figure class="fig"><svg viewBox="0 0 420 236" role="img" aria-label="Redis keys with string, counter, list and hash values">
<g class="t-s"><text class="t-s" x="12" y="20">key</text><text class="t-s" x="160" y="20">type</text><text class="t-s" x="240" y="20">value</text></g>
<rect class="bx" x="10" y="30" width="400" height="34" rx="6"/>
<text class="t-m" x="20" y="52">greeting</text><text class="t-s" x="160" y="52">string</text><text class="t" x="240" y="52">"hello"</text>
<rect class="bx-warn" x="10" y="70" width="400" height="34" rx="6"/>
<text class="t-m" x="20" y="92">session:42</text><text class="t-s" x="160" y="92">string</text><text class="t" x="240" y="92">"ada"</text><text class="t-s t-warn" x="320" y="92">TTL 60s</text>
<rect class="bx" x="10" y="110" width="400" height="34" rx="6"/>
<text class="t-m" x="20" y="132">page:views</text><text class="t-s" x="160" y="132">counter</text><text class="t" x="240" y="132">"3"</text>
<rect class="bx" x="10" y="150" width="400" height="34" rx="6"/>
<text class="t-m" x="20" y="172">jobs</text><text class="t-s" x="160" y="172">list</text>
<rect class="bx-a" x="236" y="156" width="80" height="22" rx="4"/><text class="t-s" x="276" y="172" text-anchor="middle">resize…</text>
<rect class="bx-a" x="322" y="156" width="80" height="22" rx="4"/><text class="t-s" x="362" y="172" text-anchor="middle">send…</text>
<rect class="bx" x="10" y="190" width="400" height="34" rx="6"/>
<text class="t-m" x="20" y="212">user:1</text><text class="t-s" x="160" y="212">hash</text><text class="t-s" x="240" y="212">name=Ada, city=London</text>
</svg><figcaption>Each line is one key and its value. Most values are plain strings, and a counter is a string that holds a number. session:42 has a time to live of 60 seconds, after which Redis deletes it. jobs is a list in order, newest first, and user:1 is a hash: a small set of named fields under one key.</figcaption></figure>
<p>Keys are just text. The habit is to build them from parts separated by colons, like <code>session:42</code> or <code>user:1</code>, so related keys are easy to recognise.</p>

<h4>Strings, expiry and TTL</h4>
<p>In this lesson's terminal you type <code>redis-cli</code> followed by a Redis command. The most basic commands store, read and delete a value:</p>
<pre class="snip">redis-cli SET greeting "hello"   # OK
redis-cli GET greeting           # "hello"
redis-cli DEL greeting           # (integer) 1, one key deleted
redis-cli GET greeting           # (nil), no such key</pre>
<p><code>(nil)</code> is how redis-cli shows "nothing stored under that key". Redis command names are not case-sensitive, but key names are: <code>Greeting</code> and <code>greeting</code> are different keys.</p>
<p>The feature that makes Redis perfect for sessions and caches is <b>expiry</b>. Add <code>EX</code> and a number of seconds, and Redis deletes the key by itself when the time is up:</p>
<pre class="snip">redis-cli SET session:42 "ada" EX 60
redis-cli TTL session:42         # (integer) 60, then counts down</pre>
<p><code>TTL</code> means "time to live". It returns the seconds remaining, <code>-1</code> if the key exists but never expires, and <code>-2</code> if the key does not exist (perhaps because it already expired). A login session that expires on its own is exactly what you want: an abandoned session cleans itself up. In the sandbox, <code>sleep 61</code> waits 61 seconds of simulated time so you can watch the key disappear.</p>

<h4>Counters, queues and hashes</h4>
<p><code>INCR</code> adds 1 to a number stored under a key, creating it at 0 first if it does not exist, and returns the new value:</p>
<pre class="snip">redis-cli INCR page:views        # (integer) 1
redis-cli INCR page:views        # (integer) 2</pre>
<p>The important word is <b>atomic</b>: Redis handles one command at a time, so if a thousand visitors call INCR at the same moment, every single +1 counts. Compare that with "read the number, add one, write it back" in your app, where two visitors can read the same old number and one view is lost. The same trick powers <b>rate limits</b>: INCR a key like <code>login:ada</code> with a short expiry, and refuse when the count gets too high.</p>
<p>A Redis <b>list</b> is an ordered sequence, handy as a queue of jobs for background workers:</p>
<pre class="snip">redis-cli LPUSH jobs "send-email:7"      # add to the left (front)
redis-cli LPUSH jobs "resize-image:12"
redis-cli LRANGE jobs 0 -1               # show all, front to back
redis-cli RPOP jobs                      # take one from the right (back)</pre>
<p><code>LRANGE</code> takes a start and a stop position. Positions count from 0, and <code>-1</code> means "the last one", so <code>0 -1</code> means the whole list. Because LPUSH adds at the front, the newest job is shown first. Pushing at one end and popping at the other makes a fair first-in, first-out queue.</p>
<p>A <b>hash</b> stores several named fields under one key, like a tiny record: <code>HSET user:1 name Ada city London</code>, then <code>HGETALL user:1</code> returns every field and value.</p>
<div class="mistake"><b>Common mistake</b>Using a command on the wrong kind of value, such as <code>LPUSH greeting x</code> when <code>greeting</code> holds a string. Redis replies <code>WRONGTYPE Operation against a key holding the wrong kind of value</code>. Similarly, INCR on a non-number gives "value is not an integer". Pick a fresh key, or DEL the old one.</div>

<h4>Caching: Redis in front of Postgres</h4>
<p>The most common use of Redis is as a <b>cache</b>: a fast copy of data that is slow to work out. Suppose every page shows a product list that takes a heavy query and rarely changes. The usual pattern is called <b>cache-aside</b>:</p>
<figure class="fig"><svg viewBox="0 0 420 210" role="img" aria-label="Cache-aside: the app checks Redis first and falls back to Postgres on a miss">
<rect class="bx" x="10" y="80" width="100" height="50" rx="8"/><text class="t-b" x="60" y="110" text-anchor="middle">Your app</text>
<rect class="bx-a" x="280" y="20" width="130" height="50" rx="8"/><text class="t-b" x="345" y="50" text-anchor="middle">Redis</text>
<rect class="bx-info" x="280" y="140" width="130" height="50" rx="8"/><text class="t-b" x="345" y="170" text-anchor="middle">Postgres</text>
<path class="ln-a" d="M110 92L272 40"/><polygon class="ah-a" points="268,34 272,46 280,38"/>
<text class="t-s t-a" x="150" y="52">1 ask the cache</text>
<path class="ln" d="M110 120L272 162"/><polygon class="ah" points="268,168 272,156 280,166"/>
<text class="t-s" x="128" y="164">2 on a miss, query</text>
<path class="ln-d" d="M110 110L270 64"/><polygon class="ah" points="266,58 270,70 278,62"/>
<text class="t-s" x="176" y="116">3 save a copy, TTL</text>
</svg><figcaption>Step 1, the app asks Redis. If the data is there, a hit, it is used straight away. Step 2, on a miss, the app runs the real query on Postgres. Step 3, the app saves the answer in Redis with an expiry, so the next request is a hit until the copy expires.</figcaption></figure>
<p>The expiry is what keeps the cache honest. Without it, a price change in Postgres might never reach users, because they keep getting the old copy. Postgres stays the <b>source of truth</b>; Redis only ever holds a copy that is allowed to disappear.</p>

<h4>Document databases, and how to choose</h4>
<p>Document databases such as <b>MongoDB</b> store JSON-like documents instead of rows, and each document can have a different shape. They suit data whose structure really does vary a lot. The cost is that joins, constraints and multi-record transactions exist but are less natural, so relational data tends to end up duplicated. Remember that Postgres can also store flexible JSON in a <code>JSONB</code> column, which covers many of these cases.</p>
<div class="tbl-wrap"><table><tr><th>Need</th><th>Reach for</th></tr>
<tr><td>Users, orders, payments: the main records</td><td>PostgreSQL (or MySQL)</td></tr>
<tr><td>Sessions, caches, counters, rate limits, simple queues</td><td>Redis, alongside the main database</td></tr>
<tr><td>Documents whose shape truly varies</td><td>A Postgres JSONB column, or MongoDB</td></tr></table></div>
<div class="mistake"><b>Common mistake</b>Using Redis as the only home for important data. A restart or a memory limit can throw keys away, and Redis cannot enforce your business rules or join records. Keep anything you cannot afford to lose in the relational database.</div>
<div class="try"><b>Try it in your head</b>You run <code>SET code:ada "4821" EX 300</code> for a login code. After 100 seconds, what does <code>TTL code:ada</code> return? About 200. After 400 seconds, what do <code>GET code:ada</code> and <code>TTL code:ada</code> return? <code>(nil)</code> and <code>-2</code>, because the key has expired and no longer exists.</div>

<h4>Recap</h4>
<ul>
<li>Default to a relational database, usually PostgreSQL, for your main data. MySQL does the same job and is very widespread.</li>
<li>Redis is an in-memory key-value store: very fast, ideal for temporary data, not the source of truth.</li>
<li><code>SET key value EX 60</code> stores with an expiry; <code>GET</code>, <code>DEL</code> and <code>TTL</code> read, delete and check time left.</li>
<li><code>INCR</code> is an atomic counter; <code>LPUSH</code> and <code>LRANGE</code> build and show a list; <code>HSET</code> and <code>HGETALL</code> store fields under one key.</li>
<li>Cache-aside: check Redis, fall back to Postgres on a miss, store the answer with a TTL.</li>
</ul>
`);
