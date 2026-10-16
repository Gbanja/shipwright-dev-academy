/* sql: visual "Understand it" walkthroughs. */
(()=>{
/* T: a data table. cols [[header,width]...], rows [[cell...]...]; a cell may be [text,'t-ok'].
   o.hc highlight columns, o.dc dim columns, o.dr dim rows, o.rc {rowIndex:'bx-ok'} tint rows, o.x strike rows */
const T=(x,y,cols,rows,o={})=>{
 const rh=o.rh||26,fs=o.fs||14,W=cols.reduce((a,c)=>a+c[1],0),H=rh*(rows.length+1);
 const dr=o.dr||[],dc=o.dc||[],hc=o.hc||[],rc=o.rc||{},xs=o.x||[];
 let s='<rect class="'+(o.box||'bx')+'" x="'+x+'" y="'+y+'" width="'+W+'" height="'+H+'" rx="4"/>',cx=x;
 cols.forEach((c,i)=>{if(hc.includes(i))s+='<rect class="'+(o.hcls||'bx-hl')+'" x="'+cx+'" y="'+y+'" width="'+c[1]+'" height="'+H+'"/>';cx+=c[1]});
 rows.forEach((r,j)=>{if(rc[j])s+='<rect class="'+rc[j]+'" x="'+x+'" y="'+(y+rh*(j+1))+'" width="'+W+'" height="'+rh+'"/>'});
 s+='<path class="ln" d="M'+x+' '+(y+rh)+'H'+(x+W)+'"/>';cx=x;
 cols.forEach((c,i)=>{s+='<text class="t-b'+(dc.includes(i)?' t-dim':'')+'" x="'+(cx+6)+'" y="'+(y+rh*0.68)+'" style="font-size:'+fs+'px">'+c[0]+'</text>';cx+=c[1]});
 rows.forEach((r,j)=>{cx=x;const ry=y+rh*(j+1);r.forEach((v,i)=>{const[tx,cl]=Array.isArray(v)?v:[v,''];const dim=dr.includes(j)||dc.includes(i);
  s+='<text class="t'+(cl?' '+cl:'')+(dim?' t-dim':'')+'" x="'+(cx+6)+'" y="'+(ry+rh*0.68)+'" style="font-size:'+fs+'px">'+tx+'</text>';cx+=cols[i][1]});
  if(xs.includes(j))s+='<path class="ln-x" d="M'+(x+4)+' '+(ry+rh/2)+'H'+(x+W-4)+'"/>'});
 return s};
/* C: a dark code panel; cur = index (or list) of the line(s) marked as running */
const C=(x,y,w,lines,cur,o={})=>{const lh=o.lh||26,fs=o.fs||14,cu=[].concat(cur);
 let s='<rect class="bx-dark" x="'+x+'" y="'+y+'" width="'+w+'" height="'+(lines.length*lh+12)+'" rx="8"/>';
 lines.forEach((l,i)=>{const yy=y+lh*(i+1)-1,on=cu.includes(i);if(on)s+='<text class="t-a" x="'+(x+8)+'" y="'+yy+'" style="font-size:'+fs+'px">&#9654;</text>';
  s+='<text class="t-term'+(o.dim&&!on?' t-dim':'')+'" x="'+(x+26)+'" y="'+yy+'" style="font-size:'+fs+'px">'+l+'</text>'});return s};
const AR=(x1,x2,y,c)=>{const k=c===''?'':'-'+(c||'a');return '<path class="ln'+k+'" d="M'+x1+' '+y+'H'+(x2-10)+'"/><polygon class="ah'+k+'" points="'+(x2-12)+','+(y-6)+' '+(x2-12)+','+(y+6)+' '+x2+','+y+'"/>'};
const AD=(x,y1,y2,c)=>{const k=c===''?'':'-'+(c||'a');return '<path class="ln'+k+'" d="M'+x+' '+y1+'V'+(y2-10)+'"/><polygon class="ah'+k+'" points="'+(x-6)+','+(y2-12)+' '+(x+6)+','+(y2-12)+' '+x+','+y2+'"/>'};

/* ---------- sb1 ---------- */
const BK=[['id',30],['title',140],['author',130],['year',52],['price',52]];
const BR=[[1,'Things Fall Apart','Chinua Achebe',1958,'9.99'],[3,'The Hobbit','J. R. R. Tolkien',1937,'8.99'],[4,'Beloved','Toni Morrison',1987,'11.00'],[8,'Dune','Frank Herbert',1965,'9.50']];
const sel=(q,o)=>'<svg viewBox="0 0 420 200" role="img" aria-label="'+o.al+'"><text class="t-m" x="8" y="24" style="font-size:16px">'+q+'</text>'+T(8,40,BK,BR,o)+'</svg>';
const LIM=[['The Hobbit','8.99'],['Things Fall Apart','9.99'],['Dune','9.50'],['Beloved','11.00'],['Kindred','10.25']];
const lim=(h,o,extra)=>'<svg viewBox="0 0 420 178" role="img" aria-label="'+o.al+'">'+T(10,8,[['title',190],[h,90]],LIM,o)+(extra||'')+'</svg>';

explain('sb1',`
<p>Your school register, your music playlists and every message you have ever sent all live in a <b>database</b>. In this lesson you learn to ask a database questions in <b>SQL</b>, the language almost every database speaks.</p>

${V.card(1,'Tables, rows and columns','a spreadsheet with rules',`
<figure class="fig"><svg viewBox="0 0 420 224" role="img" aria-label="The books table with four rows. The Hobbit row is highlighted as one record, the year column as one property">
${T(10,8,[['id',44],['title',176],['year',80],['price',100]],[[1,'Things Fall Apart',1958,'9.99'],[2,'Half of a Yellow Sun',2006,'12.50'],[3,'The Hobbit',1937,'8.99'],[4,'Beloved',1987,'11.00']],{rh:30,fs:15,hc:[2],hcls:'bx-info',rc:{2:'bx-warn'}})}
<text class="t-b t-warn" x="10" y="186">row = one record (one book)</text>
<text class="t-b t-info" x="410" y="186" text-anchor="end">column = one property</text>
<text class="t-s" x="10" y="212">id is the primary key: a number no other row can have</text>
</svg><figcaption>The books table. Each row is one book. Each column is one fact that every book has. Four of the eight books are shown.</figcaption></figure>
${V.like(`<p>A class register. Each line is one pupil, and each column is one fact about every pupil: name, form, birthday. Every pupil also has a unique number, so two pupils called Sam never get mixed up. That unique number is the <b>primary key</b>.</p>`)}
${V.why(`<p>Early programs kept data in their own files, each in its own format, so sharing data and finding one record was slow and messy. In 1970 Edgar Codd, a researcher at IBM, suggested keeping everything in simple tables and asking for data by describing <i>what</i> you want, not <i>how</i> to find it. SQL grew from that idea in the 1970s and is still the most used data language in the world.</p>`)}
${V.rules(V.rh('Conventions: how professionals name things'),
 V.ok('books','Table names: lowercase, usually plural'),V.ok('published_year','Words joined with underscores (snake_case)'),
 V.no('Book Title','No spaces in names: SQL would read two words'),V.ok('id','Every table gets a primary key, usually called id'))}
${V.hook(`A table is the topic, a row is one thing, a column is one fact about every thing.`)}
`)}

${V.card(2,'SELECT … FROM','asking the database a question',`
<figure class="fig"><svg viewBox="0 0 420 196" role="img" aria-label="A person asks SELECT title, author FROM books and the database hands back a two-column result">
${V.ic('person',8,8,56,'ic-a')}
<rect class="bx" x="74" y="14" width="338" height="44" rx="10"/><text class="t-m" x="86" y="42">SELECT title, author FROM books;</text>
${V.ic('db',22,96,64,'ic-info')}<text class="t-s" x="54" y="184" text-anchor="middle">database</text>
${AR(92,124,128,'ok')}
<rect class="bx-ok" x="126" y="80" width="286" height="102" rx="8"/>
<text class="t-b" x="138" y="104" style="font-size:14px">title</text><text class="t-b" x="284" y="104" style="font-size:14px">author</text>
<path class="ln" d="M126 112H412"/>
<text class="t" x="138" y="134" style="font-size:14px">Things Fall Apart</text><text class="t" x="284" y="134" style="font-size:14px">Chinua Achebe</text>
<text class="t" x="138" y="158" style="font-size:14px">The Hobbit</text><text class="t" x="284" y="158" style="font-size:14px">J. R. R. Tolkien</text>
<text class="t-s" x="138" y="176">… 8 rows</text>
</svg><figcaption>You describe what you want. The database finds it and hands back a brand-new result table.</figcaption></figure>
${V.like(`<p>Ordering at a café counter. You don't walk into the kitchen; you say "two teas and a scone" and it arrives. SELECT is your order: you say which columns you want from which table, and the database fetches them.</p>`)}
${V.anat([[1,'SELECT'],' ',[2,'title, author'],' ',[3,'FROM'],' ',[4,'books'],[5,';']],[
 '<b>SELECT.</b> "Give me…". Every question starts here.',
 '<b>Column list.</b> The columns you want, separated by commas. <code>*</code> means every column.',
 '<b>FROM.</b> "…out of this table".',
 '<b>Table name.</b> Spelled exactly as it is in the database.',
 '<b>Semicolon.</b> The end of the statement, like a full stop.'])}
<p><b>Watch the query run.</b> The database does not read your words left to right. It finds the table first.</p>
${V.steps([
 ['<b>FROM books</b> runs first. The database finds the books table: every row and every column. (Four of the eight books are shown.)',sel('SELECT title, author <tspan class="t-a" style="font-weight:700">FROM books</tspan>;',{al:'The whole books table is selected',hc:[]})],
 ['<b>SELECT title, author</b> picks the columns. id, year and price fade away. Every row is still there.',sel('<tspan class="t-a" style="font-weight:700">SELECT title, author</tspan> FROM books;',{al:'Title and author columns highlighted, the rest faded',hc:[1,2],dc:[0,3,4]})],
 ['Out comes a result: a new, temporary table with just two columns. The books table itself has not changed at all.',`<svg viewBox="0 0 420 200" role="img" aria-label="Result table with only title and author"><text class="t-m" x="8" y="24" style="font-size:16px">SELECT title, author FROM books;</text>${T(8,40,[['title',190],['author',200]],BR.map(r=>[r[1],r[2]]),{box:'bx-ok',rh:28})}</svg>`],
 ['Swap the column list for <b>*</b> and you get every column back. Handy for a quick look.',sel('SELECT <tspan class="t-a" style="font-weight:700">*</tspan> FROM books;',{al:'SELECT star returns every column',hc:[0,1,2,3,4]})]])}
${V.rules(V.rh('Rules: break one and the query fails or lies'),
 V.no('SELECT title, author, FROM books','A comma before FROM is a syntax error'),V.no('SELECT title author FROM books','No comma: SQL quietly renames title to "author"'),
 V.no('SELECT * FROM book','Wrong table name: no such table: book'),V.ok('SELECT title, author FROM books;','Commas only between columns'),
 V.rh('Conventions'),
 V.ok('SELECT … FROM …','Keywords in capitals so they stand out (SQL does not mind)'),V.ok('SELECT title, price','In real apps, name the columns you need instead of *'))}
${V.build(`<ol><li>Decide which table holds the answer: <code>books</code>.</li><li>Start with <code>SELECT * FROM books;</code> to see everything.</li><li>Replace <code>*</code> with just the columns you need, comma between each.</li><li>End with a semicolon and press Run.</li></ol>`)}
${V.hook(`SELECT what, FROM where. The database finds the table first, then picks the columns.`)}
`)}

${V.card(3,'AS and LIMIT','rename it, cut it short',`
${V.like(`<p><b>AS</b> is a name badge at a party: the person is still the same, they just wear a friendlier name for tonight. <b>LIMIT</b> is "just the first three, please" at the sweet shop.</p>`)}
${V.anat([[1,'SELECT'],' title, ',[2,'price'],' ',[3,'AS cost'],' FROM books ',[4,'LIMIT 3'],';'],[
 '<b>SELECT</b> as before.',
 '<b>The real column.</b> Stored in the table as price.',
 '<b>AS</b> gives it a new name in the result only. The table still says price.',
 '<b>LIMIT</b> stops after this many rows.'])}
${V.steps([
 ['The query fetches title and price for every book (five shown here).',lim('price',{al:'Result with title and price, five rows'})],
 ['<b>AS cost</b> changes the column heading in the result. The data is exactly the same.',lim('cost',{al:'Heading renamed to cost',hc:[1]})],
 ['<b>LIMIT 3</b> cuts the result after three rows. The others are not sent back.',lim('cost',{al:'Only the first three rows kept',dr:[3,4]},'<path class="ln-d" d="M4 112H416"/><text class="t-b t-a" x="410" y="104" text-anchor="end">LIMIT 3</text>')]])}
${V.rules(V.rh('Rules'),
 V.ok("WHERE author = 'Toni Morrison'",'Single quotes are for text values'),V.ok('price AS cost','A new name for a column in the result'),
 V.no('SELECT … LIMIT 3 FROM books','LIMIT goes at the very end'),V.ok('LIMIT 3','Without ORDER BY, which 3 you get is not promised'))}
${V.hook(`AS gives a nickname, LIMIT says "that's enough".`)}
`)}

<div class="try"><b>Try it in your head</b>1. A table has 8 rows and 5 columns. How many books? <i>8: one row per book.</i> 2. What does <code>SELECT * FROM books LIMIT 2;</code> return? <i>Every column, but only two rows.</i> 3. After <code>SELECT price AS cost FROM books;</code>, is the column in the table now called cost? <i>No, only the result is renamed.</i></div>
`);

/* ---------- sb2 ---------- */
const UP=(q,rows,o)=>'<svg viewBox="0 0 420 196" role="img" aria-label="'+o.al+'"><text class="t-m" x="8" y="24" style="font-size:15px">'+q+'</text>'+T(8,40,[['id',40],['title',220],['price',90]],rows,o)+(o.note?'<text class="t-b '+(o.nc||'t-ok')+'" x="370" y="'+(o.ny||90)+'" text-anchor="middle">'+o.note+'</text>':'')+'</svg>';
const U0=[[3,'The Hobbit','8.99'],[6,'The Alchemist','7.50'],[7,'Americanah','13.00'],[8,'Dune','9.50']];
const INS=(rows,o)=>'<svg viewBox="0 0 420 190" role="img" aria-label="'+o.al+'">'+T(4,8,[['id',34],['title',140],['author',192],['year',46]],rows,o)+(o.extra||'')+'</svg>';
const I0=[[6,'The Alchemist','Paulo Coelho',1988],[7,'Americanah','Chimamanda Ngozi Adichie',2013],[8,'Dune','Frank Herbert',1965]];

explain('sb2',`
<p>When you post a photo, edit your bio or delete a message, an app is changing rows in a database. Four short commands do all of it, and one small word, <code>WHERE</code>, stops them doing damage.</p>

${V.card(1,'CRUD','the four jobs every app does',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Create is INSERT, Read is SELECT, Update is UPDATE, Delete is DELETE">
<rect class="bx-ok" x="6" y="8" width="96" height="134" rx="10"/>${V.ic('file',30,18,48,'ic-ok')}<text class="t-b" x="54" y="96" text-anchor="middle">Create</text><text class="t-m" x="54" y="126" text-anchor="middle" style="font-size:14px">INSERT</text>
<rect class="bx-info" x="110" y="8" width="96" height="134" rx="10"/>${V.ic('search',134,18,48,'ic-info')}<text class="t-b" x="158" y="96" text-anchor="middle">Read</text><text class="t-m" x="158" y="126" text-anchor="middle" style="font-size:14px">SELECT</text>
<rect class="bx-warn" x="214" y="8" width="96" height="134" rx="10"/>${V.ic('repeat',238,18,48,'ic-warn')}<text class="t-b" x="262" y="96" text-anchor="middle">Update</text><text class="t-m" x="262" y="126" text-anchor="middle" style="font-size:14px">UPDATE</text>
<rect class="bx-bad" x="318" y="8" width="96" height="134" rx="10"/>${V.ic('cross',342,18,48,'ic-bad')}<text class="t-b" x="366" y="96" text-anchor="middle">Delete</text><text class="t-m" x="366" y="126" text-anchor="middle" style="font-size:14px">DELETE</text>
</svg><figcaption>Create, Read, Update, Delete: CRUD. Each job has its own SQL command.</figcaption></figure>
${V.like(`<p>A notebook of your friends' birthdays. You write a new line (create), look one up (read), cross out a wrong date and write the right one (update), or tear a line out (delete).</p>`)}
${V.why(`<p>Programmers noticed in the 1980s that almost every screen in every app does one of these four things, and gave them the name CRUD. Once you know the four commands, you know how most apps talk to their data.</p>`)}
${V.hook(`Create, Read, Update, Delete: INSERT, SELECT, UPDATE, DELETE.`)}
`)}

${V.card(2,'INSERT','add a new row',`
${V.anat([[1,'INSERT INTO'],' ',[2,'books'],' ',[3,'(title, author, year, price)'],'\n',[4,'VALUES'],' ',[5,"('Purple Hibiscus', 'Chimamanda Ngozi Adichie', 2003, 11.20)"],';'],[
 '<b>INSERT INTO</b> "add a row to…".',
 '<b>Table.</b> Which table gets the new row.',
 '<b>Column list.</b> Which columns you are filling, in brackets.',
 '<b>VALUES</b> "…and here is what goes in them".',
 '<b>The values,</b> in the same order as the columns. Text in single quotes, numbers without.'])}
${V.steps([
 ['Before: the table ends at book 8, Dune.',INS(I0,{al:'Books 6 to 8'})],
 ['INSERT adds a new row at the end and matches each value to its column, in order. (The price goes in too; it is just not shown here.)',INS(I0.concat([['?','Purple Hibiscus','Chimamanda Ngozi Adichie',2003]]),{al:'New row added, id not set yet',rc:{3:'bx-hl'}})],
 ['You did not give an id. Because id is the <b>INTEGER PRIMARY KEY</b>, the database fills in the next free number, <b>9</b>, by itself.',INS(I0.concat([[['9','t-ok'],'Purple Hibiscus','Chimamanda Ngozi Adichie',2003]]),{al:'id 9 filled in automatically',rc:{3:'bx-ok'},extra:'<text class="t-b t-ok" x="4" y="160">id filled in for you</text>'})]])}
${V.rules(V.rh('Rules'),
 V.no("VALUES ('Purple Hibiscus', 2003)",'4 columns but 2 values: error'),V.ok('VALUES (…, 2003, 11.20)','Numbers have no quotes'),
 V.no('VALUES (Purple Hibiscus, …)','Text without quotes is read as a column name'),V.ok("'Things Fall Apart'",'Text inside single quotes'),
 V.ok("'O''Brien'",'An apostrophe inside text is written twice'),V.ok('leave id out','Let the database number new rows'))}
${V.hook(`Columns in brackets, values in the same order, text in single quotes.`)}
`)}

${V.card(3,'UPDATE and DELETE','always aim with WHERE',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="With WHERE one row is changed; without WHERE every row is changed">
<text class="t-b t-ok" x="100" y="22" text-anchor="middle">with WHERE id = 3</text>
<rect class="bx-ok" x="20" y="34" width="160" height="26" rx="4"/><rect class="bx" x="20" y="64" width="160" height="26" rx="4"/><rect class="bx" x="20" y="94" width="160" height="26" rx="4"/><rect class="bx" x="20" y="124" width="160" height="26" rx="4"/>
${V.ic('search',184,30,34,'ic-ok')}
<text class="t-b t-bad" x="320" y="22" text-anchor="middle">no WHERE</text>
<rect class="bx-bad" x="240" y="34" width="160" height="26" rx="4"/><rect class="bx-bad" x="240" y="64" width="160" height="26" rx="4"/><rect class="bx-bad" x="240" y="94" width="160" height="26" rx="4"/><rect class="bx-bad" x="240" y="124" width="160" height="26" rx="4"/>
${V.ic('warn',384,2,30,'ic-bad')}
</svg><figcaption>WHERE picks the rows to change. Leave it out and every row in the table matches.</figcaption></figure>
${V.like(`<p>WHERE is the address on a letter. With it, the postie delivers to one house. Without it, every house in town gets the letter.</p>`)}
${V.why(`<p>UPDATE and DELETE act on <i>every row that matches</i>. With no WHERE, every row matches. Most databases have no undo button, so one missing line can wipe a whole table.</p>`)}
${V.anat([[1,'UPDATE'],' ',[2,'books'],' ',[3,'SET price = 7.99'],' ',[4,'WHERE id = 3'],';'],[
 '<b>UPDATE</b> "change rows in…".','<b>Table.</b>','<b>SET</b> which column gets which new value. Several? <code>SET a = 1, b = 2</code>.','<b>WHERE</b> which rows. Use the id when you mean exactly one row.'])}
${V.steps([
 ['<b>WHERE id = 3</b> runs first and finds the rows to change: just The Hobbit.',UP('UPDATE books SET price = 7.99 WHERE id = 3;',U0,{al:'Row 3 found',rc:{0:'bx-hl'},dr:[1,2,3]})],
 ['<b>SET price = 7.99</b> changes that row only. The database reports "1 row changed".',UP('UPDATE books SET price = 7.99 WHERE id = 3;',[[3,'The Hobbit',['7.99','t-ok']]].concat(U0.slice(1)),{al:'Hobbit price now 7.99',rc:{0:'bx-ok'}})],
 ['<b>DELETE FROM books WHERE id = 8;</b> finds Dune and removes the whole row.',UP('DELETE FROM books WHERE id = 8;',[[3,'The Hobbit','7.99']].concat(U0.slice(1)),{al:'Dune row struck out',rc:{3:'bx-bad'},x:[3]})],
 ['Now forget the WHERE: <b>UPDATE books SET price = 0;</b> Every row matches, so every book is now free. Ouch.',UP('UPDATE books SET price = 0;',[[3,'The Hobbit',['0','t-bad']],[6,'The Alchemist',['0','t-bad']],[7,'Americanah',['0','t-bad']]],{al:'Every price is now 0',rc:{0:'bx-bad',1:'bx-bad',2:'bx-bad'}})]])}
${V.rules(V.rh('Rules'),
 V.no('UPDATE books SET price = 0;','No WHERE: every row changes'),V.no('DELETE * FROM books …','Not valid: it is DELETE FROM books'),
 V.ok('… WHERE id = 3;','The id matches exactly one row'),V.no("WHERE title = 'Dune'",'Risky: two books could share a title'),
 V.rh('Conventions'),
 V.ok('SELECT * FROM books WHERE id = 3;','Run the same WHERE as a SELECT first, to see what you will hit'),V.ok('write WHERE first','Type the WHERE before the SET, so you never run without it'))}
${V.build(`<ol><li>Add Purple Hibiscus with INSERT, values in column order.</li><li>Check The Hobbit's id with a SELECT, then UPDATE its price with <code>WHERE id = 3</code>.</li><li>DELETE Dune with <code>WHERE id = 8</code>.</li><li>Finish with <code>SELECT * FROM books;</code> and check all three changes.</li></ol>`)}
${V.hook(`No WHERE, no mercy. Aim with WHERE, then fire.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which command changes an existing row? <i>UPDATE.</i> 2. What does <code>DELETE FROM books;</code> remove? <i>Every row in the table.</i> 3. How do you write the text <code>Ada's book</code> inside SQL? <i><code>'Ada''s book'</code>.</i></div>
`);

/* ---------- s1 ---------- */
const CH=[['1 FROM',66],['2 WHERE',76],['3 SELECT',80],['4 ORDER BY',100],['5 LIMIT',66]];
const chips=n=>{let x=1,s='';CH.forEach((c,i)=>{s+='<rect class="'+(i<n?'bx-ok':i===n?'bx-hl':'bx')+'" x="'+x+'" y="4" width="'+c[1]+'" height="30" rx="6"/><text class="t-b'+(i>n?' t-dim':'')+'" x="'+(x+c[1]/2)+'" y="24" text-anchor="middle" style="font-size:14px">'+c[0]+'</text>';x+=c[1]+7});return s};
const PC=[['name',190],['category',120],['price',90]];
const P6=[['Mechanical Keyboard','Accessories','89'],['Wireless Mouse','Accessories','25'],['USB-C Hub','Accessories','39'],['27-inch Monitor','Displays','229'],['Desk Lamp','Office','18'],['Portable Speaker','Audio','45']];
const P4=[P6[1],P6[2],P6[4],P6[5]],PS=[P6[5],P6[2],P6[1],P6[4]];
const qf=(n,rows,o)=>'<svg viewBox="0 0 420 232" role="img" aria-label="'+o.al+'">'+chips(n)+T(10,44,PC,rows,o)+'</svg>';
const OS=[['#1','delivered'],['#2','delivered'],['#3','shipped'],['#4','delivered'],['#5','cancelled'],['#6','pending'],['#7','delivered'],['#8','shipped'],['#9','pending']];
const PILES=[['delivered',['#1','#2','#4','#7']],['shipped',['#3','#8']],['pending',['#6','#9']],['cancelled',['#5']]];
const piles=cnt=>{let s='';PILES.forEach((p,i)=>{const x=6+i*104;s+='<text class="t-b" x="'+(x+48)+'" y="22" text-anchor="middle">'+p[0]+'</text>';
 p[1].forEach((id,j)=>{s+='<rect class="bx-info" x="'+(x+8)+'" y="'+(34+j*30)+'" width="80" height="24" rx="5"/><text class="t-m" x="'+(x+48)+'" y="'+(51+j*30)+'" text-anchor="middle" style="font-size:14px">'+id+'</text>'});
 if(cnt)s+='<circle class="bx-ok" cx="'+(x+48)+'" cy="178" r="20"/><text class="t-b" x="'+(x+48)+'" y="185" text-anchor="middle" style="font-size:19px">'+p[1].length+'</text>'});return s};
const BARS=[['Accessories',5],['Office',3],['Audio',2],['Displays',1]];
const bars=(st)=>{let s='<path class="ln-d" d="M224 8V176"/><text class="t-s" x="228" y="190">2</text>';BARS.forEach((b,i)=>{const y=14+i*40,keep=b[1]>2;
 s+='<text class="t'+(st&&!keep?' t-dim':'')+'" x="10" y="'+(y+21)+'">'+b[0]+'</text><rect class="'+(st===0||keep||!st?(st&&keep?'bx-ok':'bx-info'):'bx')+'" x="112" y="'+y+'" width="'+(b[1]*56)+'" height="28" rx="4"/><text class="t-b'+(st&&!keep?' t-dim':'')+'" x="'+(118+b[1]*56)+'" y="'+(y+21)+'">'+b[1]+'</text>';
 if(st&&!keep)s+='<path class="ln-x" d="M108 '+(y+14)+'H'+(126+b[1]*56)+'"/>'});return s};

explain('s1',`
<p>Real databases hold millions of rows. The skill is asking for exactly the rows you need, in the right order, or a summary of them. This lesson shows you how the database works through your question, one clause at a time.</p>

${V.card(1,'Filter and sort','WHERE, ORDER BY, LIMIT',`
<figure class="fig"><svg viewBox="0 0 420 190" role="img" aria-label="Six prices go into a funnel labelled WHERE price under 50. Four come out, then they are sorted highest first">
<rect class="bx" x="8" y="10" width="62" height="24" rx="5"/><text class="t-m" x="39" y="27" text-anchor="middle" style="font-size:14px">89</text>
<rect class="bx" x="8" y="38" width="62" height="24" rx="5"/><text class="t-m" x="39" y="55" text-anchor="middle" style="font-size:14px">25</text>
<rect class="bx" x="8" y="66" width="62" height="24" rx="5"/><text class="t-m" x="39" y="83" text-anchor="middle" style="font-size:14px">39</text>
<rect class="bx" x="8" y="94" width="62" height="24" rx="5"/><text class="t-m" x="39" y="111" text-anchor="middle" style="font-size:14px">229</text>
<rect class="bx" x="8" y="122" width="62" height="24" rx="5"/><text class="t-m" x="39" y="139" text-anchor="middle" style="font-size:14px">18</text>
<rect class="bx" x="8" y="150" width="62" height="24" rx="5"/><text class="t-m" x="39" y="167" text-anchor="middle" style="font-size:14px">45</text>
${AR(76,112,92)}
<polygon class="bx-a" points="106,24 258,24 206,120 158,120"/><text class="t-b" x="182" y="50" text-anchor="middle">WHERE</text><text class="t-m" x="182" y="74" text-anchor="middle" style="font-size:14px">price &lt; 50</text>
<text class="t-bad" x="182" y="150" text-anchor="middle" style="font-size:14px">89 and 229</text><text class="t-bad" x="182" y="168" text-anchor="middle" style="font-size:14px">fall out</text>
${AR(254,290,92,'ok')}
<rect class="bx-ok" x="296" y="28" width="62" height="24" rx="5"/><text class="t-m" x="327" y="45" text-anchor="middle" style="font-size:14px">45</text>
<rect class="bx-ok" x="296" y="56" width="62" height="24" rx="5"/><text class="t-m" x="327" y="73" text-anchor="middle" style="font-size:14px">39</text>
<rect class="bx-ok" x="296" y="84" width="62" height="24" rx="5"/><text class="t-m" x="327" y="101" text-anchor="middle" style="font-size:14px">25</text>
<rect class="bx-ok" x="296" y="112" width="62" height="24" rx="5"/><text class="t-m" x="327" y="129" text-anchor="middle" style="font-size:14px">18</text>
<text class="t-s" x="327" y="160" text-anchor="middle">ORDER BY</text><text class="t-s" x="327" y="178" text-anchor="middle">price DESC</text>
</svg><figcaption>WHERE is a sieve: only rows that pass the test get through. ORDER BY then lines them up.</figcaption></figure>
${V.like(`<p>A librarian with a sieve. You hand over the whole shelf (FROM). She shakes out the books that don't fit your rule (WHERE), lines the rest up by price (ORDER BY) and hands you only the first few (LIMIT).</p>`)}
${V.why(`<p>You almost never want every row. Filtering inside the database is far faster than sending a million rows to your app and throwing most of them away there.</p>`)}
${V.anat([[1,'SELECT name, price'],' ',[2,'FROM products'],'\n',[3,'WHERE price &lt; 50'],' ',[4,'ORDER BY price DESC'],' ',[5,'LIMIT 3'],';'],[
 '<b>SELECT</b> the columns you want back.',
 '<b>FROM</b> the table to start with.',
 '<b>WHERE</b> a test every row must pass. Use <code>=</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>!=</code>, and join tests with <code>AND</code> / <code>OR</code>.',
 '<b>ORDER BY</b> sorts. <code>ASC</code> (smallest first) is the default; <code>DESC</code> is biggest first.',
 '<b>LIMIT</b> keeps only the first few rows.'])}
<p><b>Watch the database run it.</b> You <i>write</i> SELECT first, but the database <i>runs</i> FROM first. Follow the numbered chips.</p>
${V.steps([
 ['<b>1. FROM products.</b> The database fetches the whole table. (Six of the eleven products are shown.)',qf(0,P6,{al:'Six products'})],
 ['<b>2. WHERE price &lt; 50.</b> Every row is tested. The keyboard (89) and the monitor (229) fail, so they drop out.',qf(1,P6,{al:'Keyboard and monitor struck out',x:[0,3],dr:[0,3],rc:{0:'bx-bad',3:'bx-bad'}})],
 ['<b>3. SELECT name, price.</b> Only now are the columns picked. category fades. This is why a nickname made with AS cannot be used in WHERE: it does not exist yet.',qf(2,P4,{al:'Four rows left, category column faded',dc:[1]})],
 ['<b>4. ORDER BY price DESC.</b> The rows are sorted, highest price first: 45, 39, 25, 18.',qf(3,PS,{al:'Rows sorted by price descending',dc:[1],hc:[2]})],
 ['<b>5. LIMIT 3.</b> Only the first three rows are sent back. The answer: speaker, hub, mouse.',qf(4,PS,{al:'Only the first three rows kept',dc:[1],dr:[3]})+''] ])}
${V.rules(V.rh('Rules: break one and the query fails or lies'),
 V.ok("WHERE city = 'Lagos'",'Text values in single quotes'),V.no('WHERE city = "Lagos"','Double quotes mean a column name in standard SQL'),
 V.no("WHERE city = 'lagos'",'In SQLite and Postgres, = is case-sensitive: no match'),V.no('… ORDER BY price WHERE …','Clauses have a fixed order: WHERE comes before ORDER BY'),
 V.no('WHERE cost &lt; 50','cost made with AS does not exist yet when WHERE runs'),V.ok('ORDER BY cost','ORDER BY runs after SELECT, so the nickname works'))}
${V.hook(`Written: SELECT, FROM, WHERE, ORDER BY, LIMIT. Run: FROM, WHERE, SELECT, ORDER BY, LIMIT.`)}
`)}

${V.card(2,'Aggregates and GROUP BY','sort into piles, then count',`
<figure class="fig"><svg viewBox="0 0 420 206" role="img" aria-label="Nine orders sorted into four piles by status, each pile counted">${piles(true)}</svg><figcaption>GROUP BY status makes one pile per status. COUNT(*) counts each pile.</figcaption></figure>
${V.like(`<p>Tip a bag of sweets on the table, sort them into bowls by colour, then count each bowl. GROUP BY makes the bowls. COUNT, SUM and AVG work on what is in each bowl.</p>`)}
${V.why(`<p>People ask summary questions: how many orders per status, the average price per category, total sales per month. <b>Aggregate functions</b> squash many rows into one answer.</p>`)}
${V.anat([[1,'SELECT status'],', ',[2,'COUNT(*)'],' ',[3,'AS orders'],'\n',[4,'FROM orders'],' ',[5,'GROUP BY status'],';'],[
 '<b>The group label.</b> One row per different status.',
 '<b>Aggregate.</b> <code>COUNT(*)</code> counts rows. Others: <code>SUM(x)</code>, <code>AVG(x)</code>, <code>MIN(x)</code>, <code>MAX(x)</code>.',
 '<b>A name</b> for the result column.',
 '<b>The table.</b>',
 '<b>GROUP BY</b> which column makes the piles.'])}
${V.steps([
 ['FROM orders: nine orders, all mixed up.',`<svg viewBox="0 0 420 206" role="img" aria-label="Nine orders in a grid">${OS.map((o,i)=>'<rect class="bx-info" x="'+(10+(i%3)*136)+'" y="'+(20+Math.floor(i/3)*44)+'" width="126" height="32" rx="6"/><text class="t" x="'+(20+(i%3)*136)+'" y="'+(41+Math.floor(i/3)*44)+'" style="font-size:14px">'+o[0]+' '+o[1]+'</text>').join('')}</svg>`],
 ['<b>GROUP BY status</b> sorts them into one pile per status.',`<svg viewBox="0 0 420 206" role="img" aria-label="Orders in four piles">${piles(false)}</svg>`],
 ['<b>COUNT(*)</b> counts each pile. Each pile becomes exactly one row in the answer.',`<svg viewBox="0 0 420 206" role="img" aria-label="Each pile counted">${piles(true)}</svg>`],
 ['The result: four rows, one per status.',`<svg viewBox="0 0 420 206" role="img" aria-label="Result table status and orders">${T(90,20,[['status',140],['orders',100]],[['delivered',4],['shipped',2],['pending',2],['cancelled',1]],{box:'bx-ok',rh:30,fs:15})}</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('SELECT name, COUNT(*) … GROUP BY category','name is not grouped: Postgres refuses, SQLite picks any name'),V.ok('SELECT category, COUNT(*) … GROUP BY category','Select only grouped columns and aggregates'),
 V.ok('COUNT(*)','Counts rows'),V.ok('COUNT(email)','Counts rows where email is not NULL'))}
${V.hook(`GROUP BY makes the bowls. Aggregates count what is in them.`)}
`)}

${V.card(3,'WHERE vs HAVING','two different gates',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Rows pass through the WHERE gate, then are grouped, then groups pass through the HAVING gate">
${V.ic('list',4,30,52,'ic-info')}<text class="t-s" x="30" y="104" text-anchor="middle">rows</text>
${AR(60,92,56)}
${V.ic('door',94,22,64,'ic-a')}<text class="t-b t-a" x="126" y="110" text-anchor="middle">WHERE</text><text class="t-s" x="126" y="130" text-anchor="middle">checks rows</text>
${AR(162,196,56)}
${V.ic('box',198,30,52,'ic-info')}<text class="t-s" x="224" y="104" text-anchor="middle">groups</text>
${AR(254,288,56)}
${V.ic('door',290,22,64,'ic-ok')}<text class="t-b t-ok" x="322" y="110" text-anchor="middle">HAVING</text><text class="t-s" x="322" y="130" text-anchor="middle">checks groups</text>
${AR(358,410,56,'ok')}
</svg><figcaption>WHERE runs before the groups exist. HAVING runs after, so only HAVING can test a COUNT or an AVG.</figcaption></figure>
${V.like(`<p>A school sports day. WHERE is the check at the gate: each pupil is checked one by one. HAVING is the judges at the end, who look at each team's total.</p>`)}
${V.anat(['SELECT category, COUNT(*) FROM products','\n',[1,'GROUP BY category'],' ',[2,'HAVING COUNT(*) &gt; 2'],';'],[
 '<b>Make the groups</b> first.','<b>HAVING</b> keeps only groups that pass. It can use aggregates.'])}
${V.steps([
 ['GROUP BY category gives four groups. Accessories has 5 products, Office 3, Audio 2, Displays 1.',`<svg viewBox="0 0 420 200" role="img" aria-label="Bar chart of product counts per category">${bars(0)}</svg>`],
 ['<b>HAVING COUNT(*) &gt; 2</b> checks each group against the line. Audio and Displays are too small and drop out.',`<svg viewBox="0 0 420 200" role="img" aria-label="Audio and Displays fail the HAVING test">${bars(1)}</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('WHERE COUNT(*) &gt; 2','Error: aggregates are not allowed in WHERE'),V.ok('HAVING COUNT(*) &gt; 2','Tests on groups go in HAVING'),
 V.ok('WHERE price &gt; 10','Tests on single rows go in WHERE: it is faster, fewer rows to group'))}
${V.hook(`WHERE checks rows before the bowls. HAVING checks bowls after.`)}
`)}

<div class="try"><b>Try it in your head</b>1. Which runs first, WHERE or SELECT? <i>WHERE.</i> 2. You want customers in Lagos. Which clause? <i><code>WHERE city = 'Lagos'</code>.</i> 3. You want categories whose average price is over 40. WHERE or HAVING? <i>HAVING, because AVG needs the groups first.</i></div>
`);

/* ---------- s2 ---------- */
const CU=[[1,'Ada'],[2,'Grace'],[3,'Alan'],[8,'Linus']],OR=[[1,1],[2,1],[3,2],[8,3]];
const jn=(k,o={})=>{const ci=[0,0,1,2][k],ry=r=>53+26*r;let s='<svg viewBox="0 0 420 206" role="img" aria-label="'+(o.al||'')+'">'+T(6,14,[['id',40],['name',100]],CU,{rc:k>=0?{[ci]:'bx-hl'}:{},dr:o.done?[3]:[]})+T(220,14,[['id',60],['customer_id',130]],OR,{rc:k>=0?{[k]:'bx-hl'}:{}});
 if(k>=0)s+='<path class="ln-a" d="M218 '+ry(k)+'C186 '+ry(k)+' 180 '+ry(ci)+' 148 '+ry(ci)+'"/><polygon class="ah-a" points="158,'+(ry(ci)-6)+' 158,'+(ry(ci)+6)+' 146,'+ry(ci)+'"/>';
 if(o.done)s+=V.ic('cross',150,119,24,'ic-bad')+'<text class="t-s" x="10" y="164">Linus: no orders, left out</text>';
 const res=[['1','Ada'],['2','Ada'],['3','Grace'],['8','Alan']].slice(0,k+1);
 s+='<text class="t-s" x="'+(o.done?250:10)+'" y="164">result</text>';
 res.forEach((r,i)=>{s+='<rect class="bx-ok" x="'+(8+i*103)+'" y="172" width="96" height="28" rx="6"/><text class="t-m" x="'+(56+i*103)+'" y="191" text-anchor="middle" style="font-size:14px">'+r[0]+' · '+r[1]+'</text>'});
 return s+'</svg>'};
const LJ=[['Ada',1],['Ada',2],['Grace',3],['Alan',8],['Linus',['NULL','t-warn']]];

explain('s2',`
<p>A shop never stores a customer's name on every order. It stores the name once and points to it with a number. <b>Joins</b> follow those pointers and put the full picture back together.</p>

${V.card(1,'Keys that link tables','an id is a pointer',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="Each order's customer_id points to a row in customers">
${T(6,14,[['id',40],['name',100]],CU)}
${T(220,14,[['id',60],['customer_id',130]],OR,{hc:[1],hcls:'bx-info'})}
<path class="ln-a" d="M218 53C184 53 180 53 148 53M218 79C184 79 180 53 148 53M218 105C184 105 180 79 148 79M218 131C184 131 180 105 148 105"/><polygon class="ah-a" points="158,47 158,59 146,53"/><polygon class="ah-a" points="158,73 158,85 146,79"/><polygon class="ah-a" points="158,99 158,111 146,105"/>
<text class="t-s" x="6" y="12">customers</text><text class="t-s" x="220" y="12">orders</text>
</svg><figcaption>orders.customer_id holds a customer's id. Linus (8) has no arrow pointing at him: he has never ordered.</figcaption></figure>
${V.like(`<p>A cloakroom ticket. Your coat does not have your name sewn in; it has ticket 42, and the book at the desk says ticket 42 belongs to you. <code>customer_id</code> is the ticket number.</p>`)}
${V.why(`<p>If every order copied the customer's name and email, changing an email would mean finding and fixing every copy. Storing each fact once and pointing to it keeps data correct. A column that points at another table's id is a <b>foreign key</b>.</p>`)}
${V.hook(`Store it once, point to it by id, join it back when you need it.`)}
`)}

${V.card(2,'INNER JOIN','only the pairs that match',`
${V.anat(['SELECT o.id, c.name\nFROM ',[1,'orders o'],'\n',[2,'JOIN'],' ',[3,'customers c'],' ',[4,'ON c.id = o.customer_id'],';'],[
 '<b>First table,</b> with a short nickname (alias) <code>o</code>.',
 '<b>JOIN</b> (the same as INNER JOIN) keeps only rows that find a partner.',
 '<b>Second table,</b> alias <code>c</code>.',
 '<b>ON</b> the matching rule: this column equals that column.'])}
<p><b>Watch the matching.</b> For each order, the database looks up the customer whose id equals the order's customer_id.</p>
${V.steps([
 ['Order 1 has customer_id 1. Customer 1 is Ada. The pair becomes a result row.',jn(0,{al:'Order 1 matches Ada'})],
 ['Order 2 also has customer_id 1. Ada again: one customer can match many orders.',jn(1,{al:'Order 2 matches Ada'})],
 ['Order 3 points to customer 2: Grace.',jn(2,{al:'Order 3 matches Grace'})],
 ['Order 8 points to customer 3: Alan. Nobody points at Linus, so an INNER JOIN leaves him out.',jn(3,{al:'Order 8 matches Alan, Linus left out',done:true})]])}
${V.rules(V.rh('Rules'),
 V.no('SELECT id FROM orders o JOIN customers c …','Both tables have id: "ambiguous column name"'),V.ok('SELECT o.id, c.name','Say which table each column comes from'),
 V.no('JOIN customers c   (no ON)','SQLite pairs every row with every row (9 × 8 = 72); Postgres refuses'),
 V.rh('Conventions'),V.ok('customers c, orders o','Short aliases from the table name'),V.ok('ON c.id = o.customer_id','Foreign keys named after the table: customer_id'))}
${V.hook(`JOIN … ON: match the ticket number to the owner.`)}
`)}

${V.card(3,'LEFT JOIN','keep everyone, fill gaps with NULL',`
<figure class="fig"><svg viewBox="0 0 420 178" role="img" aria-label="Two diagrams. INNER JOIN shades only the overlap. LEFT JOIN shades the whole left circle">
<text class="t-s" x="70" y="16" text-anchor="middle">customers</text><text class="t-s" x="130" y="16" text-anchor="middle">orders</text>
<circle class="bx" cx="130" cy="78" r="50"/><circle class="bx" cx="70" cy="78" r="50"/>
<path class="bx-ok" d="M100 38A50 50 0 0 1 100 118A50 50 0 0 1 100 38Z"/>
<text class="t-b" x="100" y="154" text-anchor="middle">INNER JOIN</text><text class="t-s" x="100" y="172" text-anchor="middle">only matches</text>
<text class="t-s" x="280" y="16" text-anchor="middle">customers</text><text class="t-s" x="340" y="16" text-anchor="middle">orders</text>
<circle class="bx" cx="340" cy="78" r="50"/><circle class="bx-ok" cx="280" cy="78" r="50"/><path class="ln" d="M310 38A50 50 0 0 1 310 118"/>
<text class="t-b" x="310" y="154" text-anchor="middle">LEFT JOIN</text><text class="t-s" x="310" y="172" text-anchor="middle">every left row</text>
</svg><figcaption>LEFT JOIN keeps every row of the left table, whether or not it finds a partner.</figcaption></figure>
${V.like(`<p>Taking the register for after-school clubs. You call every pupil's name and write down their club. A pupil with no club still gets a line; the club box is left blank. That blank is <b>NULL</b>: "no value".</p>`)}
${V.anat(['SELECT c.name FROM customers c\n',[1,'LEFT JOIN orders o'],' ',[2,'ON o.customer_id = c.id'],'\n',[3,'WHERE o.id IS NULL'],';'],[
 '<b>LEFT JOIN</b> keeps every customer (the left table).','<b>ON</b> the matching rule, as before.','<b>IS NULL</b> keeps only the customers who found no order.'])}
${V.steps([
 ['LEFT JOIN customers to orders. Linus finds no order, but he stays, with <b>NULL</b> in the order column.',`<svg viewBox="0 0 420 178" role="img" aria-label="Left join result with Linus and NULL">${T(80,6,[['c.name',140],['o.id',110]],LJ,{rc:{4:'bx-warn'}})}</svg>`],
 ['<b>WHERE o.id IS NULL</b> keeps only rows with no match. The answer: Linus has never ordered.',`<svg viewBox="0 0 420 178" role="img" aria-label="Only Linus is left">${T(80,6,[['c.name',140],['o.id',110]],LJ,{rc:{4:'bx-ok'},dr:[0,1,2,3],x:[0,1,2,3]})}</svg>`]])}
${V.rules(V.rh('Rules'),
 V.no('WHERE o.id = NULL','Never true: nothing equals NULL, not even NULL'),V.ok('WHERE o.id IS NULL','The right way to test for "no value"'),
 V.no("LEFT JOIN … WHERE o.status = 'delivered'",'A WHERE on the right table throws away the NULL rows again'))}
${V.hook(`INNER keeps couples. LEFT keeps everyone from the left, with NULL for the lonely.`)}
`)}

${V.card(4,'Chains and subqueries','follow the links, or ask a question inside a question',`
<figure class="fig"><svg viewBox="0 0 420 244" role="img" aria-label="customers to orders to order_items to products, each linked by a key">
<rect class="bx-info" x="10" y="6" width="180" height="40" rx="8"/>${V.ic('person',18,11,30,'ic-info')}<text class="t-m" x="56" y="32">customers c</text>
${AD(100,46,68)}<text class="t-m" x="200" y="62" style="font-size:14px">o.customer_id = c.id</text>
<rect class="bx-info" x="10" y="70" width="180" height="40" rx="8"/>${V.ic('list',18,75,30,'ic-info')}<text class="t-m" x="56" y="96">orders o</text>
${AD(100,110,132)}<text class="t-m" x="200" y="126" style="font-size:14px">oi.order_id = o.id</text>
<rect class="bx-info" x="10" y="134" width="180" height="40" rx="8"/>${V.ic('box',18,139,30,'ic-info')}<text class="t-m" x="56" y="160">order_items oi</text>
${AD(100,174,196)}<text class="t-m" x="200" y="190" style="font-size:14px">oi.product_id = p.id</text>
<rect class="bx-info" x="10" y="198" width="180" height="40" rx="8"/>${V.ic('tag',18,203,30,'ic-info')}<text class="t-m" x="56" y="224">products p</text>
</svg><figcaption>Each JOIN is one step along a chain of keys. To total what each customer spent, walk from customers to order_items.</figcaption></figure>
${V.like(`<p>Stepping stones across a river. Each JOIN is one stone. You cannot jump from customers to products in one go, but you can hop through orders and order_items.</p>`)}
<pre class="snip">SELECT name FROM products
WHERE id NOT IN (SELECT product_id FROM order_items);</pre>
<p>A <b>subquery</b> is a query in brackets inside another. The inner one runs first and makes a list of sold product ids; the outer one keeps products not in that list.</p>
${V.rules(V.rh('Rules'),
 V.ok('SUM(oi.qty * oi.unit_price)','Multiply on each row, then add them up'),V.ok('GROUP BY c.id','Group by the id: two customers might share a name'),
 V.no('NOT IN (… a list containing NULL)','If the subquery returns a NULL, NOT IN matches nothing'),V.ok('NOT EXISTS (…)','A safer choice when NULLs are possible'))}
${V.build(`<ol><li>Join orders to customers on <code>c.id = o.customer_id</code> and list id, name and status.</li><li>LEFT JOIN customers to orders and keep <code>o.id IS NULL</code>.</li><li>Chain customers, orders and order_items, filter delivered orders, GROUP BY customer and SUM.</li><li>Use <code>NOT IN (SELECT product_id FROM order_items)</code> for unsold products.</li></ol>`)}
${V.hook(`One JOIN per stepping stone. Brackets inside brackets run first.`)}
`)}

<div class="try"><b>Try it in your head</b>1. An order has customer_id 4. Which customer is it? <i>The one with id 4.</i> 2. You want every customer, even those with no orders. Which join? <i>LEFT JOIN from customers.</i> 3. Why is <code>WHERE x = NULL</code> wrong? <i>Nothing equals NULL; use IS NULL.</i></div>
`);

/* ---------- s3 ---------- */
const AU=[[1,'Chinua Achebe'],[2,'Ursula K. Le Guin']];
const fk=(rows,o)=>'<svg viewBox="0 0 420 172" role="img" aria-label="'+o.al+'"><text class="t-s" x="6" y="14">authors</text>'+T(6,20,[['id',36],['name',140]],AU)+'<text class="t-s" x="190" y="14">books</text>'+T(190,20,[['title',150],['author_id',74]],rows,o)+(o.msg?'<text class="t-b '+o.mc+'" x="6" y="'+(o.my||160)+'">'+o.msg+'</text>':'')+'</svg>';
const BT0=[['Things Fall Apart',1]];
const btg=(pairs,o)=>{let s='<svg viewBox="0 0 420 200" role="img" aria-label="'+o.al+'"><text class="t-s" x="6" y="14">books</text>'+T(6,20,[['id',30],['title',96]],[[1,'Things F…'],[2,'Earthsea']])+'<text class="t-s" x="154" y="14">book_tags</text>'+T(154,20,[['book_id',66],['tag_id',58]],pairs,o)+'<text class="t-s" x="300" y="14">tags</text>'+T(300,20,[['id',30],['name',84]],[[1,'classic'],[2,'fantasy']]);
 return s+(o.msg?'<text class="t-b '+o.mc+'" x="6" y="194" style="font-size:14px">'+o.msg+'</text>':'')+'</svg>'};

explain('s3',`
<p>A database design is like the foundations of a house: very hard to change once people live in it. A few simple rules keep your data correct for years, and they all start with one idea: store each fact once.</p>

${V.card(1,'One fact, one place','normalisation',`
<figure class="fig"><svg viewBox="0 0 420 256" role="img" aria-label="A messy table repeats the author's name and gets a typo; the tidy version stores the author once and books point to author 1">
<text class="t-b t-bad" x="6" y="16">Messy: the name is copied</text>
${T(6,24,[['title',170],['author',150],['country',84]],[['Things Fall Apart','Chinua Achebe','Nigeria'],['Arrow of God',['Chinua Acheb','t-bad'],'Nigeria'],['No Longer at Ease','Chinua Achebe','Nigeria']],{rc:{1:'bx-bad'}})}
${AD(210,130,150)}
<text class="t-b t-ok" x="6" y="148">Tidy: stored once</text>
${T(6,156,[['id',34],['name',134]],[[1,'Chinua Achebe']],{box:'bx-ok'})}
${T(196,156,[['title',140],['author_id',78]],[['Things Fall Apart',1],['Arrow of God',1],['No Longer at Ease',1]])}
</svg><figcaption>Copies drift apart: one typo and the database thinks there are two authors. Store the author once and point to it.</figcaption></figure>
${V.like(`<p>Your phone's contacts. You save a friend's number once, and every chat points at that contact. If they get a new number, you fix it in one place and every chat is right.</p>`)}
${V.why(`<p>When the same fact is copied into many rows, an update can miss a copy and the data starts to disagree with itself. In the 1970s Edgar Codd described <b>normal forms</b>: rules for splitting tables so each fact lives in exactly one place. Doing this is called <b>normalisation</b>.</p>`)}
${V.rules(V.rh('Conventions: names that explain themselves'),
 V.ok('authors, books, tags','Tables: plural, lowercase, snake_case'),V.ok('id','Every table has a primary key called id'),
 V.ok('author_id','A foreign key is the other table\'s name (singular) + _id'),V.no("tags = 'fantasy,classic'",'A list in one cell is a missing table'),
 V.no('author1, author2, author3','Numbered columns are a missing table too'))}
${V.hook(`One fact, one place. Point, don't copy.`)}
`)}

${V.card(2,'Keys and one-to-many','the foreign key lives on the "many" side',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="One author linked to three books; each book carries author_id 1">
${V.ic('person',20,40,72,'ic-a')}<text class="t-b" x="56" y="138" text-anchor="middle">authors.id = 1</text>
<path class="ln-a" d="M100 76C150 76 160 30 210 30M100 76H210M100 76C150 76 160 122 210 122"/>
${V.ic('book',214,10,40,'ic-info')}<text class="t-m" x="262" y="36" style="font-size:14px">author_id = 1</text>
${V.ic('book',214,56,40,'ic-info')}<text class="t-m" x="262" y="82" style="font-size:14px">author_id = 1</text>
${V.ic('book',214,102,40,'ic-info')}<text class="t-m" x="262" y="128" style="font-size:14px">author_id = 1</text>
<text class="t-s" x="210" y="162">each book says who wrote it</text>
</svg><figcaption>One author, many books. Each book carries the author's id. The author does not keep a list of books.</figcaption></figure>
${V.like(`<p>A school and its pupils. Each pupil's form says which school they go to. The school's form does not list every pupil: it would run out of boxes.</p>`)}
${V.anat([[1,'author_id'],' ',[2,'INTEGER'],' ',[3,'NOT NULL'],' ',[4,'REFERENCES authors(id)']],[
 '<b>Column name:</b> the table it points to, plus <code>_id</code>.',
 '<b>Type:</b> the same type as the id it points at.',
 '<b>NOT NULL:</b> every book must have an author.',
 '<b>Foreign key:</b> the value must be an id that exists in authors.'])}
${V.steps([
 ['Two authors exist. Books point at them through author_id.',fk(BT0,{al:'authors and books tables'})],
 ['Insert a book with author_id 2. Author 2 exists, so it is accepted.',fk(BT0.concat([['A Wizard of Earthsea',2]]),{al:'Book with author 2 accepted',rc:{1:'bx-ok'},msg:'Accepted: author 2 exists',mc:'t-ok'})],
 ['Insert a book with author_id 99. There is no author 99, so the database refuses: <b>FOREIGN KEY constraint failed</b>.',fk(BT0.concat([['A Wizard of Earthsea',2],['Mystery Book',['99','t-bad']]]),{al:'Book with author 99 rejected',rc:{2:'bx-bad'},x:[2],msg:'Rejected: there is no author 99',mc:'t-bad'})]])}
${V.rules(V.rh('Rules'),
 V.ok('books.author_id','The foreign key goes on the many side'),V.no('authors.book_id','One column cannot hold many books'),
 V.ok('PRAGMA foreign_keys = ON;','SQLite only checks foreign keys after this; Postgres always does'))}
${V.hook(`Many points to one. The arrow starts on the "many" side.`)}
`)}

${V.card(3,'Many-to-many','a join table in the middle',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="Books on the left, tags on the right, book_tags in the middle linking them">
${V.ic('book',14,20,44,'ic-info')}<text class="t" x="64" y="48">book 1</text>
${V.ic('book',14,84,44,'ic-info')}<text class="t" x="64" y="112">book 2</text>
<rect class="bx-a" x="150" y="14" width="120" height="122" rx="10"/><text class="t-b" x="210" y="36" text-anchor="middle">book_tags</text>
<text class="t-m" x="210" y="66" text-anchor="middle" style="font-size:14px">(1, 1)</text><text class="t-m" x="210" y="92" text-anchor="middle" style="font-size:14px">(2, 1)</text><text class="t-m" x="210" y="118" text-anchor="middle" style="font-size:14px">(2, 2)</text>
<path class="ln-d" d="M124 42H150M124 106H150M270 62H300M270 106H300"/>
${V.ic('tag',304,38,40,'ic-ok')}<text class="t" x="350" y="64">classic</text>
${V.ic('tag',304,84,40,'ic-ok')}<text class="t" x="350" y="110">fantasy</text>
</svg><figcaption>A book has many tags and a tag has many books. Each line of book_tags is one book-and-tag pair.</figcaption></figure>
${V.like(`<p>Pupils and after-school clubs. One pupil joins many clubs; one club has many pupils. The sign-up sheet, one line per pupil-and-club pair, is the join table.</p>`)}
${V.anat([['','CREATE TABLE '],[1,'book_tags'],' (\n  ',[2,'book_id INTEGER NOT NULL REFERENCES books(id)'],',\n  ',[3,'tag_id  INTEGER NOT NULL REFERENCES tags(id)'],',\n  ',[4,'PRIMARY KEY (book_id, tag_id)'],'\n);'].map(p=>Array.isArray(p)&&p[0]===''?p[1]:p),[
 '<b>Name:</b> both table names joined.','<b>Points at a book.</b>','<b>Points at a tag.</b>','<b>Composite primary key:</b> the pair together must be unique.'])}
${V.steps([
 ['Tag book 1 as classic: add the pair (1, 1).',btg([[1,1]],{al:'Pair 1 1 added',rc:{0:'bx-ok'}})],
 ['Book 2 is classic too, and fantasy: add (2, 1) and (2, 2).',btg([[1,1],[2,1],[2,2]],{al:'Three pairs',rc:{1:'bx-ok',2:'bx-ok'}})],
 ['Try to add (2, 2) again. The primary key says each pair can appear only once: <b>UNIQUE constraint failed</b>.',btg([[1,1],[2,1],[2,2],[['2','t-bad'],['2','t-bad']]],{al:'Duplicate pair rejected',rc:{3:'bx-bad'},x:[3],msg:'Rejected: a book cannot get the same tag twice',mc:'t-bad'})]])}
${V.rules(V.rh('Rules'),V.ok('PRIMARY KEY (book_id, tag_id)','Stops duplicate pairs'),V.ok('JOIN book_tags bt ON bt.book_id = b.id','Two JOINs get from books to tag names'),
 V.ok('name TEXT NOT NULL UNIQUE','No two tags with the same name'))}
${V.build(`<ol><li>Create <code>authors</code>: id primary key, name NOT NULL, country.</li><li>Create <code>books</code> with an <code>author_id</code> that REFERENCES authors.</li><li>Create <code>tags</code> (unique name) and <code>book_tags</code> with a two-column primary key.</li><li>Insert a few rows, then JOIN books to book_tags to tags and list title with tag.</li></ol>`)}
${V.hook(`One-to-many: a foreign key. Many-to-many: a table in the middle.`)}
`)}

<div class="try"><b>Try it in your head</b>1. A customer has many orders. Which table gets the foreign key? <i>orders (customer_id).</i> 2. Students and courses: how many tables? <i>Three: students, courses and a join table.</i> 3. What is wrong with a column holding <code>'red,blue'</code>? <i>It is a list in one cell; it belongs in its own table.</i></div>
`);

/* ---------- s4 ---------- */
const EV=[['1','user1@example.com'],['2','user2@example.com'],['3','user3@example.com'],['⋮','⋮'],['42','user42@example.com'],['⋮','⋮'],['20000','user0@example.com']];
const IX=[['user40','40, 540, …'],['user41','41, 541, …'],['user42','42, 542, …'],['user43','43, 543, …'],['user44','44, 544, …']];
const scan=(o)=>{let s='<svg viewBox="0 0 420 240" role="img" aria-label="'+o.al+'"><text class="t-s" x="6" y="14">events (20,000 rows)</text>'+T(6,20,[['id',54],['user_email',176]],EV,Object.assign({rh:24},o.t||{}))+'<text class="t-s" x="250" y="14">index on user_email</text>';
 if(o.ix)s+=T(250,20,[['email',74],['rows',90]],IX,Object.assign({rh:24},o.ix));else s+='<rect class="ln-d" x="250" y="20" width="164" height="192" rx="6"/><text class="t-s" x="332" y="116" text-anchor="middle">no index yet</text>';
 return s+'<text class="t-b '+(o.mc||'t-a')+'" x="6" y="234">'+o.msg+'</text></svg>'};
const cmp=(k,o)=>{const R=[['user41','2025-07-01'],['user42','2025-01-15'],['user42','2025-06-03'],['user42','2025-08-20'],['user43','2025-06-15']];
 return '<svg viewBox="0 0 420 222" role="img" aria-label="'+o.al+'"><text class="t-m" x="6" y="20" style="font-size:14px">'+o.q+'</text>'+T(6,32,[['user_email',140],['created_at',140]],R,{rc:o.rc})+V.ic(o.ok?'check':'cross',320,70,64,o.ok?'ic-ok':'ic-bad')+'<text class="t-b '+(o.ok?'t-ok':'t-bad')+'" x="352" y="160" text-anchor="middle">'+o.v+'</text></svg>'};

explain('s4',`
<p>A query that is instant on 8 rows can take seconds on 20 million. Indexes are how real apps answer in milliseconds, and query plans are how you find out whether one is being used.</p>

${V.card(1,'Full scan vs index','reading every page vs looking it up',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="Left: reading every page of a book. Right: jumping from the index straight to one page">
${V.ic('book',20,16,96,'ic-bad')}<text class="t-b t-bad" x="68" y="134" text-anchor="middle">SCAN</text><text class="t-s" x="68" y="156" text-anchor="middle">read every page</text>
<rect class="bx-info" x="200" y="14" width="96" height="112" rx="6"/><text class="t-s" x="210" y="36">Index</text>
<text class="t-m" x="210" y="62" style="font-size:14px">tides 77</text><text class="t-m t-a" x="210" y="86" style="font-size:14px">volcano</text><text class="t-m t-a" x="210" y="108" style="font-size:14px">  → 212</text>
${AR(300,346,96,'ok')}${V.ic('file',350,56,64,'ic-ok')}
<text class="t-b t-ok" x="300" y="148" text-anchor="middle">SEARCH</text><text class="t-s" x="300" y="166" text-anchor="middle">jump to the page</text>
</svg><figcaption>Without an index the database reads every row. With one it looks the value up in a sorted list and jumps straight to the rows.</figcaption></figure>
${V.like(`<p>The index at the back of a textbook. To find "volcano" you don't read all 400 pages. You find it in the alphabetical index, which says page 212, and jump there.</p>`)}
${V.why(`<p>A table keeps rows in the order they arrived, so finding one email means checking every row: a <b>full table scan</b>. An <b>index</b> is a separate, sorted copy of one column with pointers back to the rows. Most databases store it as a <b>B-tree</b>, a structure invented in 1970 that finds any value in a handful of steps, even among millions.</p>`)}
${V.anat([[1,'CREATE INDEX'],' ',[2,'idx_events_user_email'],' ',[3,'ON events'],[4,'(user_email)'],';'],[
 '<b>CREATE INDEX</b> builds a sorted look-up list.',
 '<b>Its name.</b> Convention: <code>idx_</code> + table + column.',
 '<b>Which table.</b>',
 '<b>Which column(s)</b> to sort by: the one your WHERE filters on.'])}
${V.steps([
 ['<b>No index.</b> To find user42 the database starts at row 1: not a match.',scan({al:'Checking row 1',t:{rc:{0:'bx-hl'}},msg:'checked 1 of 20,000 rows'})],
 ['It keeps going, row after row. It cannot stop at the first match either: there might be more further down.',scan({al:'Checking row 42',t:{rc:{4:'bx-ok'},dr:[0,1,2]},msg:'checked 42 of 20,000 rows'})],
 ['Every single row is checked. That is a <b>SCAN</b>: 20,000 reads to find 40 matches.',scan({al:'All rows checked',t:{dr:[0,1,2,3,4,5],rc:{6:'bx-hl'}},msg:'checked 20,000 of 20,000 rows',mc:'t-bad'})],
 ['<b>With the index.</b> The emails are kept sorted, so the database jumps straight to user42, like finding a word in a dictionary.',scan({al:'Index lookup finds user42',ix:{rc:{2:'bx-hl'},dr:[0,1,3,4]},msg:'a few steps, then straight to the rows',mc:'t-ok'})],
 ['Each index entry points at its rows: 42, 542, 1042 and so on. Only those 40 rows are read. That is a <b>SEARCH</b>.',scan({al:'Index points to rows 42, 542 and more',ix:{rc:{2:'bx-ok'},dr:[0,1,3,4]},t:{rc:{4:'bx-ok'},dr:[0,1,2,6]},msg:'40 rows read instead of 20,000',mc:'t-ok'})]])}
${V.hook(`No index: read the whole book. Index: look it up at the back.`)}
`)}

${V.card(2,'Reading the plan','ask the database how it will work',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="Two plans: before, SCAN events; after, SEARCH events USING INDEX">
<text class="t-b" x="6" y="18">Before the index</text>
<rect class="bx-dark" x="6" y="26" width="408" height="40" rx="8"/><text class="t-term t-bad" x="18" y="52" style="font-size:15px">SCAN events</text>
<text class="t-b" x="6" y="92">After the index</text>
<rect class="bx-dark" x="6" y="100" width="408" height="56" rx="8"/><text class="t-term t-ok" x="18" y="122" style="font-size:14px">SEARCH events USING INDEX</text><text class="t-term t-ok" x="18" y="144" style="font-size:14px">idx_events_user_email (user_email=?)</text>
</svg><figcaption>SQLite's EXPLAIN QUERY PLAN tells you SCAN (read everything) or SEARCH (use an index).</figcaption></figure>
${V.like(`<p>A sat nav's route preview. Before you set off, it shows which roads it will take. EXPLAIN shows which route the database will take through your data, without you waiting for the slow trip.</p>`)}
${V.anat([[1,'EXPLAIN QUERY PLAN'],'\n',[2,"SELECT * FROM events WHERE user_email = 'user42@example.com'"],';'],[
 '<b>EXPLAIN QUERY PLAN</b> (SQLite): "describe how you would run this". Postgres uses <code>EXPLAIN</code> or <code>EXPLAIN ANALYZE</code>.',
 '<b>Any normal query.</b> Its plan comes back instead of its rows.'])}
${V.rules(V.rh('Reading plans'),
 V.no('SCAN events','On a big table with a WHERE: probably a missing index'),V.ok('SEARCH … USING INDEX','The index is being used'),
 V.no('Seq Scan on events','The Postgres name for a full scan'),V.ok('Index Scan using …','Postgres is using an index'),
 V.rh('Watch out'),V.no('EXPLAIN ANALYZE DELETE …','ANALYZE really runs the query, so it really deletes'),V.no("WHERE email LIKE '%@gmail.com'",'A leading % cannot use a normal index'))}
${V.hook(`EXPLAIN before you complain: SCAN is slow, SEARCH is fast.`)}
`)}

${V.card(3,'Composite indexes','the phone book rule',`
<figure class="fig"><svg viewBox="0 0 420 170" role="img" aria-label="A phone book sorted by surname, then first name">
${V.ic('book',10,30,90,'ic-a')}<text class="t-s" x="55" y="146" text-anchor="middle">phone book</text>
<rect class="bx" x="120" y="10" width="290" height="150" rx="8"/>
<text class="t-m" x="136" y="40">Achebe, Chinua</text><text class="t-m" x="136" y="68">Adichie, Chimamanda</text>
<rect class="bx-warn" x="128" y="78" width="274" height="54" rx="4"/><text class="t-m" x="136" y="98">Okafor, Ngozi</text><text class="t-m" x="136" y="124">Okafor, Tunde</text>
<text class="t-m" x="136" y="152">Traoré, Aya</text>
</svg><figcaption>Sorted by surname first, then first name. All the Okafors sit together, and inside that group the first names are in order.</figcaption></figure>
${V.like(`<p>A phone book is sorted by surname, then first name. Finding "Okafor, Ngozi" is quick. Finding everyone whose first name is Ngozi means reading the whole book, because first names are only in order <i>inside</i> each surname.</p>`)}
${V.anat([[1,'CREATE INDEX idx_events_user_date'],' ON events(',[2,'user_email'],', ',[3,'created_at'],');'],[
 '<b>One index,</b> two columns.','<b>Sorted by this first</b> (like the surname).','<b>Then by this,</b> inside each email (like the first name).'])}
${V.steps([
 ['<b>WHERE user_email = ? AND created_at &gt;= ?</b> The index goes straight to user42, then to the right dates inside it.',cmp(0,{q:'WHERE user_email = ? AND created_at &gt;= ?',al:'Both columns used',rc:{2:'bx-ok',3:'bx-ok'},ok:true,v:'uses index'})],
 ['<b>WHERE user_email = ?</b> on its own uses the left part of the index. All of user42 sits together.',cmp(1,{q:'WHERE user_email = ?',al:'Left column used',rc:{1:'bx-ok',2:'bx-ok',3:'bx-ok'},ok:true,v:'uses index'})],
 ['<b>WHERE created_at &gt;= ?</b> alone: matching dates are scattered across every email. The index cannot help, so the database scans.',cmp(2,{q:'WHERE created_at &gt;= ?',al:'Second column alone cannot use the index',rc:{0:'bx-bad',2:'bx-bad',3:'bx-bad',4:'bx-bad'},ok:false,v:'full scan'})]])}
${V.rules(V.rh('Rules'),
 V.ok('(user_email, created_at)','Helps queries on email, or email + date'),V.no('… WHERE created_at &gt;= ?','Skips the first column: cannot use it'),
 V.rh('The cost of indexes'),V.no('an index on every column','Every INSERT, UPDATE and DELETE must update every index, and each one takes disk space'),
 V.ok('index what you WHERE, JOIN and ORDER BY','Add indexes for real, slow queries'))}
${V.build(`<ol><li>Run <code>EXPLAIN QUERY PLAN</code> on the email query and spot <code>SCAN</code>.</li><li><code>CREATE INDEX</code> on <code>events(user_email)</code>.</li><li>Run the plan again and look for <code>SEARCH … USING INDEX</code>.</li><li>Create a composite index on <code>(user_email, created_at)</code> for the date query.</li></ol>`)}
${V.hook(`Composite indexes read left to right, like a phone book.`)}
`)}

<div class="try"><b>Try it in your head</b>1. The plan says SCAN on a 5-million-row table. What do you try first? <i>An index on the filtered column.</i> 2. Index on (a, b). Can <code>WHERE b = 1</code> use it? <i>No, b is not the leftmost column.</i> 3. Why not index every column? <i>Writes get slower and the indexes take space.</i></div>
`);

/* ---------- s5 ---------- */
const TX=['BEGIN;','UPDATE … balance - 200 WHERE id = 1;','UPDATE … balance + 200 WHERE id = 2;','COMMIT;'];
const acct=(x,name,v,cls,note)=>'<rect class="'+cls+'" x="'+x+'" y="134" width="190" height="66" rx="10"/>'+V.ic('jar',x+10,142,48,'ic-a')+'<text class="t-b" x="'+(x+68)+'" y="158">'+name+'</text><text class="t-m" x="'+(x+68)+'" y="186" style="font-size:20px">'+v+'</text>'+(note?'<text class="t-s" x="'+(x+184)+'" y="186" text-anchor="end">'+note+'</text>':'');
const tx=(cur,a,b,o)=>'<svg viewBox="0 0 420 228" role="img" aria-label="'+o.al+'">'+C(6,6,408,o.lines||TX,cur,{dim:true})+acct(10,'Ada',a[0],a[1],a[2])+acct(220,'Grace',b[0],b[1],b[2])+(o.msg?'<text class="t-b '+o.mc+'" x="210" y="222" text-anchor="middle">'+o.msg+'</text>':'')+(o.extra||'')+'</svg>';
const chk=(n,o)=>'<svg viewBox="0 0 420 190" role="img" aria-label="'+o.al+'"><text class="t-m" x="6" y="22" style="font-size:14px">'+o.q+'</text>'+V.ic('shield',20,46,80,n>=2?'ic-bad':'ic-a')+'<text class="t-m" x="60" y="152" text-anchor="middle" style="font-size:14px">CHECK</text><text class="t-m" x="60" y="172" text-anchor="middle" style="font-size:14px">balance &gt;= 0</text>'+
 '<rect class="'+(o.bc||'bx')+'" x="140" y="50" width="270" height="70" rx="10"/><text class="t-b" x="156" y="78">'+o.t1+'</text><text class="t-m '+(o.c2||'')+'" x="156" y="106" style="font-size:16px">'+o.t2+'</text>'+(o.msg?'<text class="t-b '+o.mc+'" x="140" y="160">'+o.msg+'</text>':'')+'</svg>';

explain('s5',`
<p>Moving money takes two changes: take it from one account, add it to another. If the power cuts out in between, money simply vanishes. Transactions and constraints are how databases make sure that can never happen.</p>

${V.card(1,'Transactions','all or nothing',`
<figure class="fig"><svg viewBox="0 0 420 160" role="img" aria-label="200 moves from Ada's jar to Grace's jar inside a BEGIN to COMMIT bracket">
<rect class="ln-d" x="6" y="30" width="408" height="120" rx="12"/><text class="t-b t-a" x="20" y="22">BEGIN</text><text class="t-b t-a" x="400" y="22" text-anchor="end">COMMIT</text>
${V.ic('jar',30,48,64,'ic-a')}<text class="t-b" x="62" y="136" text-anchor="middle">Ada 500</text>
${AR(110,300,80,'ok')}<text class="t-m" x="205" y="70" text-anchor="middle" style="font-size:18px">200</text><text class="t-s" x="205" y="104" text-anchor="middle">both steps, or neither</text>
${V.ic('jar',326,48,64,'ic-a')}<text class="t-b" x="358" y="136" text-anchor="middle">Grace 300</text>
</svg><figcaption>Everything between BEGIN and COMMIT counts as one single step. It all happens, or none of it does.</figcaption></figure>
${V.like(`<p>Swapping trading cards with a friend. You both hold out your cards and swap at the same moment. Nobody hands theirs over and then watches the other person walk off.</p>`)}
${V.why(`<p>Banks and airlines in the 1970s needed changes that could never half-happen, even in a crash. Researchers such as Jim Gray worked out how databases could promise this, and in 1983 the promises were given the name <b>ACID</b>.</p>`)}
${V.anat([[1,'BEGIN;'],'\n',[2,'UPDATE accounts SET balance = balance - 200 WHERE id = 1;'],'\n',[2,'UPDATE accounts SET balance = balance + 200 WHERE id = 2;'],'\n',[3,'COMMIT;']],[
 '<b>BEGIN</b> starts the transaction: "the next changes belong together".',
 '<b>The work.</b> Changes are visible only inside this transaction for now.',
 '<b>COMMIT</b> saves everything at once. <code>ROLLBACK</code> instead throws it all away.'])}
<p><b>Watch a crash.</b> The first update has run, and then the power fails.</p>
${V.steps([
 ['<b>BEGIN.</b> The transaction starts. Ada has 500, Grace has 300.',tx(0,['500','bx'],['300','bx'],{al:'Begin: Ada 500, Grace 300'})],
 ['Line 2 takes 200 from Ada. Her balance shows 300, but only <i>inside</i> this unfinished transaction.',tx(1,['300','bx-warn','not saved'],['300','bx'],{al:'Ada 300 pending'})],
 ['The power cuts out before line 3. Grace never got her 200. If this were saved, 200 would be lost.',tx(1,['300','bx-warn','not saved'],['300','bx'],{al:'Crash before line 3',msg:'CRASH! The transaction never reached COMMIT',mc:'t-bad',extra:V.ic('warn',370,58,36,'ic-bad')})],
 ['When the database restarts, it <b>rolls back</b> everything that was not committed. Ada is back to 500. No money vanished.',tx(-1,['500','bx-ok','rolled back'],['300','bx-ok'],{al:'Rolled back: Ada 500, Grace 300',msg:'ROLLBACK: as if nothing happened',mc:'t-ok'})],
 ['Run it again with no crash. <b>COMMIT</b> saves both changes together: Ada 300, Grace 500.',tx(3,['300','bx-ok'],['500','bx-ok'],{al:'Committed: Ada 300, Grace 500',msg:'COMMIT: both changes saved at once',mc:'t-ok'})]])}
${V.rules(V.rh('Rules'),
 V.ok('BEGIN; … COMMIT;','Every BEGIN ends with COMMIT or ROLLBACK'),V.ok('ROLLBACK;','Your undo button, until you COMMIT'),
 V.no('UPDATE …; UPDATE …;  (no BEGIN)','Each statement saves on its own: a crash between them leaves half a transfer'),
 V.rh('Conventions'),V.ok('keep transactions short','A long transaction holds locks and makes other users wait'))}
${V.hook(`BEGIN, do the work, COMMIT. Crash in the middle? Rolled back, nothing lost.`)}
`)}

${V.card(2,'ACID','four promises',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="Four tiles: Atomic, Consistent, Isolated, Durable">
<rect class="bx-a" x="6" y="6" width="200" height="80" rx="10"/>${V.ic('box',16,20,48,'ic-a')}<text class="t-b" x="74" y="38" style="font-size:17px">Atomic</text><text class="t-s" x="74" y="62">all or nothing</text>
<rect class="bx-ok" x="214" y="6" width="200" height="80" rx="10"/>${V.ic('shield',224,20,48,'ic-ok')}<text class="t-b" x="282" y="38" style="font-size:17px">Consistent</text><text class="t-s" x="282" y="62">rules always hold</text>
<rect class="bx-info" x="6" y="94" width="200" height="80" rx="10"/>${V.ic('lock',16,108,48,'ic-info')}<text class="t-b" x="74" y="126" style="font-size:17px">Isolated</text><text class="t-s" x="74" y="150">no peeking at</text><text class="t-s" x="74" y="166">half-done work</text>
<rect class="bx-warn" x="214" y="94" width="200" height="80" rx="10"/>${V.ic('db',224,108,48,'ic-warn')}<text class="t-b" x="282" y="126" style="font-size:17px">Durable</text><text class="t-s" x="282" y="150">saved means saved,</text><text class="t-s" x="282" y="166">even after a crash</text>
</svg><figcaption>ACID: the four promises a transaction makes.</figcaption></figure>
${V.like(`<p>Posting a parcel. <b>Atomic:</b> the whole parcel arrives, never half. <b>Consistent:</b> the post office will not accept a parcel with no address. <b>Isolated:</b> nobody sees inside until it is delivered. <b>Durable:</b> once it is signed for, it stays delivered.</p>`)}
${V.hook(`A-C-I-D: all or nothing, rules hold, no peeking, saved for good.`)}
`)}

${V.card(3,'Constraints','the database says no',`
${V.like(`<p>A bouncer with a list of rules. It does not matter which door you come in by (the app, an admin script, a bug), the bouncer checks everyone.</p>`)}
${V.why(`<p>Your app should check data too, but apps have bugs and data arrives from many places. Rules written into the table are checked on every single change, so bad data cannot get in at all.</p>`)}
${V.anat([['','balance INTEGER '],[1,'NOT NULL'],' ',[2,'CHECK (balance &gt;= 0)'],'\nemail TEXT ',[3,'UNIQUE'],'\nuser_id INTEGER ',[4,'REFERENCES users(id)']].map(p=>Array.isArray(p)&&p[0]===''?p[1]:p),[
 '<b>NOT NULL:</b> a value must be given.','<b>CHECK:</b> any yes/no rule. Here: no overdrafts.','<b>UNIQUE:</b> no two rows may share this value.','<b>Foreign key:</b> must point at a row that exists.'])}
${V.steps([
 ['Someone tries to take 1000 from Ada, who has 500.',chk(0,{al:'The update is sent',q:'UPDATE accounts SET balance = balance - 1000 WHERE id = 1;',t1:'Ada: 500 - 1000',t2:'= ?'})],
 ['The database works out the new balance: <b>-500</b>. Before saving, it checks every rule on the table.',chk(1,{al:'New balance would be -500',q:'UPDATE accounts SET balance = balance - 1000 WHERE id = 1;',t1:'Ada: 500 - 1000',t2:'= -500',c2:'t-bad',bc:'bx-warn'})],
 ['-500 breaks <b>CHECK (balance &gt;= 0)</b>. The change is refused: <b>CHECK constraint failed</b>. Ada still has 500.',chk(2,{al:'Check constraint failed, balance unchanged',q:'UPDATE accounts SET balance = balance - 1000 WHERE id = 1;',t1:'Ada: still',t2:'500',c2:'t-ok',bc:'bx-ok',msg:'Error: CHECK constraint failed',mc:'t-bad'})]])}
${V.rules(V.rh('Rules'),
 V.ok('CHECK (balance &gt;= 0)','Stops overdrafts, whatever the app does'),V.ok('email TEXT NOT NULL UNIQUE','No missing and no duplicate emails'),
 V.no('checking only in the app','A bug or a second app can skip it'),V.ok('UNIQUE constraint failed: users.email','The error tells you exactly which rule'))}
${V.build(`<ol><li>Wrap two UPDATEs in <code>BEGIN;</code> … <code>COMMIT;</code> to move 200 from Ada to Grace.</li><li>Try taking 1000 from Ada and read the CHECK error.</li><li>INSERT a duplicate email and read the UNIQUE error.</li><li><code>BEGIN;</code>, change a balance, <code>ROLLBACK;</code>, then SELECT: it is unchanged.</li></ol>`)}
${V.hook(`The app asks nicely. Constraints are the law.`)}
`)}

<div class="try"><b>Try it in your head</b>1. You BEGIN, run one UPDATE, then ROLLBACK. What changed? <i>Nothing.</i> 2. Which ACID letter means "all or nothing"? <i>A, atomic.</i> 3. A buggy script inserts a second user with the same email. What stops it? <i>A UNIQUE constraint on email.</i></div>
`);

/* ---------- s6 ---------- */
const term=(cmd,out,store,o)=>'<svg viewBox="0 0 420 200" role="img" aria-label="'+o.al+'"><rect class="bx-dark" x="6" y="6" width="408" height="70" rx="8"/><text class="t-term" x="18" y="34" style="font-size:14px">$ '+cmd+'</text><text class="t-term '+(o.oc||'t-ok')+'" x="18" y="60" style="font-size:14px">'+out+'</text><text class="t-s" x="6" y="100">Redis memory</text>'+store+'</svg>';
const note=(x,k,v,t,cls)=>'<rect class="'+(cls||'bx-warn')+'" x="'+x+'" y="110" width="250" height="78" rx="8"/><text class="t-m" x="'+(x+12)+'" y="138">'+k+'</text><text class="t-m" x="'+(x+12)+'" y="168">"'+v+'"</text>'+V.ic('clock',x+176,118,32,'ic-a')+'<text class="t-b" x="'+(x+192)+'" y="178" text-anchor="middle">'+t+'</text>';
const qu=(items,o)=>{let s='<svg viewBox="0 0 420 200" role="img" aria-label="'+o.al+'"><rect class="bx-dark" x="6" y="6" width="408" height="70" rx="8"/><text class="t-term" x="18" y="34" style="font-size:14px">$ '+o.cmd+'</text><text class="t-term t-ok" x="18" y="60" style="font-size:14px">'+o.out+'</text>';
 s+='<text class="t-b t-a" x="10" y="146">LPUSH</text><text class="t-s" x="10" y="164">adds here</text><text class="t-b t-a" x="410" y="146" text-anchor="end">RPOP</text><text class="t-s" x="410" y="164" text-anchor="end">takes here</text><rect class="ln-d" x="66" y="110" width="288" height="80" rx="8"/><text class="t-s" x="76" y="102">jobs</text>';
 items.forEach((it,i)=>{s+='<rect class="'+(it[1]||'bx-info')+'" x="'+(76+i*136)+'" y="128" width="132" height="44" rx="6"/><text class="t-m" x="'+(142+i*136)+'" y="155" text-anchor="middle" style="font-size:14px">'+it[0]+'</text>'});return s+'</svg>'};
const ca=(k,o)=>{const on=(i)=>k===i;let s='<svg viewBox="0 0 420 190" role="img" aria-label="'+o.al+'">'+V.ic('server',10,50,64,'ic-a')+'<text class="t-s" x="42" y="134" text-anchor="middle">your app</text>';
 s+='<rect class="'+(o.r||'bx')+'" x="160" y="10" width="110" height="70" rx="10"/><text class="t-b" x="215" y="40" text-anchor="middle">Redis</text><text class="t-s" x="215" y="62" text-anchor="middle">'+(o.rt||'cache')+'</text>';
 s+='<rect class="'+(o.p||'bx')+'" x="160" y="110" width="110" height="70" rx="10"/><text class="t-b" x="215" y="140" text-anchor="middle">Postgres</text><text class="t-s" x="215" y="162" text-anchor="middle">the truth</text>';
 return s+(o.lines||'')+'<text class="t-b '+(o.mc||'t-a')+'" x="284" y="'+(o.my||100)+'">'+o.msg+'</text></svg>'};

explain('s6',`
<p>Not every job needs the same tool. Most apps keep their main data in a relational database and add a very fast in-memory store, <b>Redis</b>, for sessions, counters, queues and caches.</p>

${V.card(1,'Picking a database','a toolbox, not a contest',`
<figure class="fig"><svg viewBox="0 0 420 180" role="img" aria-label="Four tiles: PostgreSQL for main data, MySQL for main data, Redis for caches and sessions, MongoDB for documents">
<rect class="bx-info" x="6" y="6" width="200" height="80" rx="10"/>${V.ic('db',14,20,48,'ic-info')}<text class="t-b" x="70" y="38">PostgreSQL</text><text class="t-s" x="70" y="62">relational: main data</text>
<rect class="bx-a" x="214" y="6" width="200" height="80" rx="10"/>${V.ic('db',222,20,48,'ic-a')}<text class="t-b" x="278" y="38">MySQL</text><text class="t-s" x="278" y="62">relational: main data</text>
<rect class="bx-warn" x="6" y="94" width="200" height="80" rx="10"/>${V.ic('clock',14,108,48,'ic-warn')}<text class="t-b" x="70" y="126">Redis</text><text class="t-s" x="70" y="150">in memory: caches,</text><text class="t-s" x="70" y="166">sessions, counters</text>
<rect class="bx-ok" x="214" y="94" width="200" height="80" rx="10"/>${V.ic('file',222,108,48,'ic-ok')}<text class="t-b" x="278" y="126">MongoDB</text><text class="t-s" x="278" y="150">document: flexible,</text><text class="t-s" x="278" y="166">nested records</text>
</svg><figcaption>Postgres or MySQL hold your main data. Redis sits beside them for speed. Document stores like MongoDB suit data with no fixed shape.</figcaption></figure>
${V.like(`<p>A filing cabinet and a whiteboard. The filing cabinet (Postgres) keeps everything safely, sorted and checked. The whiteboard by the door (Redis) is super quick to read, gets wiped regularly, and is never the only copy of anything important.</p>`)}
${V.why(`<p>Postgres grew from the POSTGRES project at the University of California, Berkeley, in 1986. MySQL arrived in 1995 and powers huge numbers of PHP sites. In 2009 Salvatore Sanfilippo built Redis because his web app needed answers faster than a disk-based database could give. Keeping data in memory (RAM) makes reads take well under a millisecond.</p>`)}
${V.rules(V.rh('Conventions'),
 V.ok('start with Postgres','Users, orders, payments: relational data'),V.ok('add Redis for a real need','Caching, sessions, counters, queues, rate limits'),
 V.no('Redis as the only copy of orders','It lives in memory; treat it as a fast copy'),V.no('picking a database because it is trendy','Pick the one that fits the data'))}
${V.hook(`Postgres is the filing cabinet. Redis is the whiteboard by the door.`)}
`)}

${V.card(2,'Redis keys and expiry','sticky notes that peel off by themselves',`
${V.anat([[1,'redis-cli'],' ',[2,'SET'],' ',[3,'session:42'],' ',[4,'"ada"'],' ',[5,'EX 60']],[
 '<b>redis-cli</b> is the command-line tool that talks to Redis.',
 '<b>SET</b> stores a value under a key. <code>GET</code> reads it, <code>DEL</code> removes it.',
 '<b>Key.</b> Convention: <code>type:id</code>, separated by colons.',
 '<b>Value.</b> Use quotes if it contains spaces.',
 '<b>EX 60</b> expires the key after 60 seconds. <code>PX</code> counts in milliseconds.'])}
${V.steps([
 ['<b>SET</b> with <b>EX 60</b>. Redis replies OK and starts a 60-second timer on the key.',term('redis-cli SET session:42 "ada" EX 60','OK',note(80,'session:42','ada','60s'),{al:'Key stored with 60 second timer'})],
 ['<b>TTL</b> (time to live) asks how many seconds are left.',term('redis-cli TTL session:42','(integer) 58',note(80,'session:42','ada','58s'),{al:'58 seconds left'})],
 ['Time passes: <code>sleep 61</code>. The timer runs out and Redis deletes the key by itself.',term('sleep 61','',note(80,'session:42','ada','0s','bx-bad')+'<path class="ln-x" d="M84 150H326"/>',{al:'Timer ran out, key deleted'})],
 ['<b>GET</b> now finds nothing: <b>(nil)</b>. Perfect for login sessions that should end on their own.',term('redis-cli GET session:42','(nil)','<rect class="ln-d" x="80" y="110" width="250" height="78" rx="8"/><text class="t-s" x="205" y="154" text-anchor="middle">empty</text>',{al:'GET returns nil',oc:'t-warn'})]])}
${V.rules(V.rh('Rules'),
 V.ok('user:1, session:42, page:views','Keys: type, colon, id'),V.ok('TTL key → -1','The key exists but never expires'),
 V.ok('TTL key → -2','The key does not exist'),V.no('a cache with no expiry','Stale data lives forever: set EX'))}
${V.hook(`SET it, give it a TTL, and Redis cleans up for you.`)}
`)}

${V.card(3,'Counters, queues and hashes','more than one kind of value',`
<figure class="fig"><svg viewBox="0 0 420 150" role="img" aria-label="A counter showing 3, a list of jobs, and a hash card for user 1">
<rect class="bx-ok" x="6" y="10" width="120" height="120" rx="10"/><text class="t-s" x="66" y="34" text-anchor="middle">INCR</text><text class="t-m" x="66" y="84" text-anchor="middle" style="font-size:36px">3</text><text class="t-s" x="66" y="116" text-anchor="middle">page:views</text>
<rect class="bx-info" x="136" y="10" width="130" height="120" rx="10"/><text class="t-s" x="201" y="34" text-anchor="middle">LIST: jobs</text><text class="t-m" x="148" y="70" style="font-size:14px">resize-image</text><text class="t-m" x="148" y="100" style="font-size:14px">send-email</text>
<rect class="bx-a" x="276" y="10" width="138" height="120" rx="10"/><text class="t-s" x="345" y="34" text-anchor="middle">HASH: user:1</text><text class="t-m" x="288" y="70" style="font-size:14px">name  Ada</text><text class="t-m" x="288" y="100" style="font-size:14px">city  London</text>
</svg><figcaption>A Redis value can be a counter, a list (great for queues) or a hash (a small set of named fields).</figcaption></figure>
${V.like(`<p>A clicker counter at a gate (INCR), a queue of people at a shop till (a list), and a name badge with several lines on it (a hash).</p>`)}
${V.steps([
 ['<b>LPUSH</b> adds a job to the left end of the list.',qu([['send-email:7']],{al:'One job in the list',cmd:'redis-cli LPUSH jobs "send-email:7"',out:'(integer) 1'})],
 ['Another LPUSH. The new job goes on the left, pushing the older one to the right.',qu([['resize-image:12','bx-ok'],['send-email:7']],{al:'Two jobs, newest on the left',cmd:'redis-cli LPUSH jobs "resize-image:12"',out:'(integer) 2'})],
 ['<b>LRANGE jobs 0 -1</b> lists everything from the first item (0) to the last (-1).',qu([['resize-image:12'],['send-email:7']],{al:'LRANGE lists both jobs',cmd:'redis-cli LRANGE jobs 0 -1',out:'1) "resize-image:12"  2) "send-email:7"'})],
 ['A worker runs <b>RPOP</b> and takes from the right: the <i>oldest</i> job. Push left, pop right: first in, first out, like a real queue.',qu([['resize-image:12'],['send-email:7','bx-ok']],{al:'RPOP takes the oldest job',cmd:'redis-cli RPOP jobs',out:'"send-email:7"'})]])}
${V.rules(V.rh('Rules'),
 V.ok('INCR page:views','Atomic: two servers counting at once never lose a click'),V.ok('LRANGE jobs 0 -1','0 is the first item, -1 the last'),
 V.ok('HSET user:1 name Ada city London','One key, several fields'),V.ok('HGETALL user:1','Read every field back'))}
${V.hook(`INCR counts, lists queue, hashes hold fields.`)}
`)}

${V.card(4,'Cache-aside','check Redis first, fall back to Postgres',`
${V.like(`<p>Keeping today's lunch menu on a whiteboard so nobody has to dig through the filing cabinet every time someone asks. When the board is wiped, someone checks the cabinet and writes it up again.</p>`)}
${V.steps([
 ['A page needs the product list. The app asks Redis first.',ca(0,{al:'App asks Redis',r:'bx-hl',lines:AR(80,158,60),msg:'GET products'})],
 ['Redis has nothing: a <b>cache miss</b>. So the app asks Postgres, the source of truth. This is the slow trip.',ca(1,{al:'Miss, ask Postgres',r:'bx-bad',rt:'(nil): miss',p:'bx-hl',lines:AR(80,158,150),msg:'miss → Postgres',mc:'t-bad'})],
 ['The app stores the answer in Redis with an expiry: <code>SET products … EX 300</code> (five minutes).',ca(2,{al:'Answer saved in Redis with an expiry',r:'bx-ok',rt:'saved, EX 300',lines:AR(80,158,60,'ok'),msg:'SET … EX 300',mc:'t-ok'})],
 ['The next visitor gets a <b>cache hit</b>: the answer comes straight from memory. Postgres is not touched.',ca(3,{al:'Cache hit',r:'bx-ok',rt:'hit',lines:AR(80,158,60,'ok'),msg:'hit: fast',mc:'t-ok'})]])}
${V.rules(V.rh('Rules'),V.ok('Postgres is the truth','Redis holds a copy that may be a few minutes old'),V.ok('always set an expiry','Old copies clear themselves'))}
${V.build(`<ol><li><code>SET greeting "hello"</code>, then <code>GET greeting</code>.</li><li>SET a session with <code>EX 60</code>, check <code>TTL</code>, wait it out, GET it again.</li><li>Run <code>INCR page:views</code> three times.</li><li>LPUSH two jobs and list them with <code>LRANGE jobs 0 -1</code>.</li></ol>`)}
${V.hook(`Check the whiteboard, then the cabinet, then write it on the whiteboard.`)}
`)}

<div class="try"><b>Try it in your head</b>1. What does <code>GET</code> return after a key expires? <i>(nil).</i> 2. A new app with users and payments: which main database? <i>PostgreSQL.</i> 3. LPUSH a, then LPUSH b. What does RPOP return? <i>a, the oldest.</i></div>
`);
})();
