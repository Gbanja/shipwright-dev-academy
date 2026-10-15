/* sql: visual "Understand it" walkthroughs. */
(()=>{
/* T: a data table. cols [[header,width]...], rows [[cell...]...]; a cell may be [text,'t-ok'].
   o.hc highlight columns, o.dc dim columns, o.dr dim rows, o.rc {rowIndex:'bx-ok'} tint rows, o.x strike rows */
const T=(x,y,cols,rows,o={})=>{
 const rh=o.rh||26,fs=o.fs||14,W=cols.reduce((a,c)=>a+c[1],0),H=rh*(rows.length+1);
 const dr=o.dr||[],dc=o.dc||[],hc=o.hc||[],rc=o.rc||{},xs=o.x||[];
 let s='<rect class="'+(o.box||'bx')+'" x="'+x+'" y="'+y+'" width="'+W+'" height="'+H+'" rx="4"/>',cx=x;
 cols.forEach((c,i)=>{if(hc.includes(i))s+='<rect class="bx-hl" x="'+cx+'" y="'+y+'" width="'+c[1]+'" height="'+H+'"/>';cx+=c[1]});
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
const lim=(h,o,extra)=>'<svg viewBox="0 0 420 210" role="img" aria-label="'+o.al+'">'+T(10,8,[['title',190],[h,90]],LIM,o)+(extra||'')+'</svg>';

explain('sb1',`
<p>Your school register, your music playlists and every message you have ever sent all live in a <b>database</b>. In this lesson you learn to ask a database questions in <b>SQL</b>, the language almost every database speaks.</p>

${V.card(1,'Tables, rows and columns','a spreadsheet with rules',`
<figure class="fig"><svg viewBox="0 0 420 224" role="img" aria-label="The books table with four rows. The Hobbit row is highlighted as one record, the year column as one property">
${T(10,8,[['id',44],['title',176],['year',80],['price',100]],[[1,'Things Fall Apart',1958,'9.99'],[2,'Half of a Yellow Sun',2006,'12.50'],[3,'The Hobbit',1937,'8.99'],[4,'Beloved',1987,'11.00']],{rh:30,fs:15,hc:[2],rc:{2:'bx-warn'}})}
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
})();
