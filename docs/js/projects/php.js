/* Projects: PHP */
(()=>{
const ev=(ctx,src)=>ctx.php&&ctx.php.eval?ctx.php.eval(src):{err:'no runtime'};
const lastReq=(ctx,m,re)=>[...(ctx.reqs||[])].reverse().find(r=>r.m===m&&re.test(r.u));
const MIG='database/migrations/2026_10_10_00002_create_contacts_table.php';
const API_START=`<?php

use Illuminate\\Support\\Facades\\Route;

// Your API routes. Everything here is served under /api
`;
const MIGRATION=`<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('email')->unique();
            $table->string('company')->nullable();
            $table->timestamps();
        });
    }
};
`;
const MODEL=`<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Contact extends Model
{
    protected $fillable = ['name', 'email', 'company'];
}
`;
const CTRL=(full)=>`<?php

namespace App\\Http\\Controllers;

use App\\Models\\Contact;
use Illuminate\\Http\\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'email' => 'required|email|unique:contacts,email',
            'company' => 'string|max:100',
        ]);
        return response()->json(Contact::create($data), 201);
    }
${full?`
    public function index()
    {
        return Contact::orderBy('name')->get();
    }

    public function show(Contact $contact)
    {
        return $contact;
    }
`:''}}
`;
const ROUTES=(full)=>`<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\ContactController;

Route::post('/contacts', [ContactController::class, 'store']);
${full?"Route::get('/contacts', [ContactController::class, 'index']);\nRoute::get('/contacts/{contact}', [ContactController::class, 'show']);\n":''}`;

const SEED=`CREATE TABLE products (sku TEXT PRIMARY KEY, name TEXT NOT NULL, price REAL NOT NULL, stock INTEGER NOT NULL);
INSERT INTO products VALUES ('KB-01','Mechanical keyboard',89.0,12),('MS-02','Wireless mouse',25.0,2),('MN-03','27-inch monitor',229.0,4),('HB-04','USB-C hub',39.0,0);`;
const SOLO_START=`<?php
declare(strict_types=1);

// The database is pre-filled: products(sku, name, price, stock)
$pdo = new PDO('mysql:host=localhost;dbname=warehouse', 'app', 'secret');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

// Build the inventory tool described in the brief.
`;
const SOLO_REF=`<?php
declare(strict_types=1);

$pdo = new PDO('mysql:host=localhost;dbname=warehouse', 'app', 'secret');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

class Product
{
    public function __construct(
        public string $sku,
        public string $name,
        public float $price,
        public int $stock,
    ) {}

    public function isLowStock(): bool
    {
        return $this->stock < 5;
    }

    public function value(): float
    {
        return $this->price * $this->stock;
    }
}

function toProduct(array $row): Product
{
    return new Product($row['sku'], $row['name'], (float) $row['price'], (int) $row['stock']);
}

function loadProducts(PDO $pdo): array
{
    $rows = $pdo->query('SELECT sku, name, price, stock FROM products ORDER BY sku')->fetchAll();
    return array_map(fn($row) => toProduct($row), $rows);
}

function findProduct(PDO $pdo, string $sku): ?Product
{
    $stmt = $pdo->prepare('SELECT sku, name, price, stock FROM products WHERE sku = :sku');
    $stmt->execute(['sku' => $sku]);
    $row = $stmt->fetch();
    return $row ? toProduct($row) : null;
}

function restock(PDO $pdo, string $sku, int $qty): bool
{
    if ($qty <= 0) {
        throw new InvalidArgumentException('Quantity must be positive');
    }
    $stmt = $pdo->prepare('UPDATE products SET stock = stock + :qty WHERE sku = :sku');
    $stmt->execute(['qty' => $qty, 'sku' => $sku]);
    return $stmt->rowCount() === 1;
}

$products = loadProducts($pdo);

$low = array_filter($products, fn(Product $p) => $p->isLowStock());
usort($low, fn(Product $a, Product $b) => $a->stock <=> $b->stock);
foreach ($low as $p) {
    echo "LOW STOCK: {$p->name} ({$p->stock} left)\\n";
}

$total = array_sum(array_map(fn(Product $p) => $p->value(), $products));
echo 'Inventory value: $' . number_format($total, 2) . "\\n";
`;
const fnBody=(code,name)=>{const i=code.search(new RegExp('function\\s+'+name+'\\s*\\('));if(i<0)return '';return code.slice(i,i+700)};

defineProjects('php',{
guided:{title:'Build a contacts REST API in Laravel',kind:'code',lang:'php',laravel:true,sqlite:true,seed:'',api:'php',apiStart:'/api/contacts',term:true,project:'contacts-api',open:'routes/api.php',files:{'routes/api.php':API_START},
 pitch:'Scaffold a model, migration and controller with Artisan, then build validated create, list and show endpoints and test them with real requests.',
 brief:`<p>A CRM team needs a small API to store contacts. You'll build it the Laravel way: Artisan generates the files, a migration defines the table, the controller validates input, and routes map URLs to controller methods.</p>
<p>Use the <b>terminal</b> for <code>php artisan</code> commands and the <b>request panel</b> to call your API. The files Artisan creates appear as tabs in the editor.</p>
<div class="tip"><b>Goal</b><code>POST /api/contacts</code> rejects bad input with 422, <code>GET /api/contacts</code> lists contacts, and <code>GET /api/contacts/{id}</code> returns one or a 404.</div>`,
 tasks:[
 {t:'Generate the Contact model with a migration, and a ContactController.',why:'Artisan writes the boilerplate with the right namespaces and file names, so you don\'t have to. <code>-m</code> also creates a migration for the <code>contacts</code> table.',term:['php artisan make:model Contact -m','php artisan make:controller ContactController'],h:'php artisan make:model Contact -m\nphp artisan make:controller ContactController',c:()=>{const f=BENCH.code.files||{};return !!f['app/Models/Contact.php']&&!!f['app/Http/Controllers/ContactController.php']&&Object.keys(f).some(k=>/create_contacts_table/.test(k))}},
 {t:'Define the columns in the new migration (unique email), then migrate.',why:'The migration is the table\'s source of truth, kept in Git and run the same way everywhere. <code>->unique()</code> makes the <b>database</b> refuse duplicate emails, even if a bug in your code lets one through. <code>->nullable()</code> marks optional columns.',code:"Schema::create('contacts', function (Blueprint $table) {\n    $table->id();\n    $table->string('name', 100);\n    $table->string('email')->unique();\n    $table->string('company')->nullable();\n    $table->timestamps();\n});",sol:{[MIG]:MIGRATION},term:'php artisan migrate',c:()=>(BENCH.code.applied||[]).some(f=>/create_contacts_table/.test(f))&&/->unique\(\)/.test(Object.entries(BENCH.code.files||{}).find(([k])=>/create_contacts_table/.test(k))?.[1]||'')},
 {t:'Allow mass assignment, then add a validated store() endpoint at POST /api/contacts.',why:'<code>$fillable</code> lists the columns a request may set, so an attacker can\'t sneak in <code>is_admin=1</code>. <code>$request->validate()</code> returns <b>422</b> with per-field errors automatically. <code>unique:contacts,email</code> gives a friendly error before the database has to refuse the duplicate.',code:"// app/Models/Contact.php\nprotected $fillable = ['name', 'email', 'company'];\n\n// app/Http/Controllers/ContactController.php\npublic function store(Request $request)\n{\n    $data = $request->validate([\n        'name' => 'required|string|max:100',\n        'email' => 'required|email|unique:contacts,email',\n        'company' => 'string|max:100',\n    ]);\n    return response()->json(Contact::create($data), 201);\n}\n\n// routes/api.php\nuse App\\Http\\Controllers\\ContactController;\nRoute::post('/contacts', [ContactController::class, 'store']);",sol:{'app/Models/Contact.php':MODEL,'app/Http/Controllers/ContactController.php':CTRL(false),'routes/api.php':ROUTES(false)},req:[{m:'POST',u:'/api/contacts',body:{name:'Ada Lovelace',email:'ada@example.com'}},{m:'POST',u:'/api/contacts',body:{name:'Ada Again',email:'ada@example.com'}},{m:'POST',u:'/api/contacts',body:{name:'',email:'not-an-email'}}],c:ctx=>{const rs=(ctx.reqs||[]).filter(r=>r.m==='POST'&&/^\/api\/contacts\/?$/.test(r.u));return rs.some(r=>r.status===201&&r.json&&r.json.id)&&rs.some(r=>r.status===422&&r.json&&r.json.errors&&r.json.errors.email)}},
 {t:'Add index() and show() with route-model binding: list contacts, return one, or 404.',why:'Type-hinting <code>Contact $contact</code> makes Laravel load the row for <code>{contact}</code> and return <b>404</b> automatically when it doesn\'t exist. Returning a model or collection becomes JSON.',code:"public function index()\n{\n    return Contact::orderBy('name')->get();\n}\n\npublic function show(Contact $contact)\n{\n    return $contact;\n}\n\n// routes/api.php\nRoute::get('/contacts', [ContactController::class, 'index']);\nRoute::get('/contacts/{contact}', [ContactController::class, 'show']);",sol:{'app/Http/Controllers/ContactController.php':CTRL(true),'routes/api.php':ROUTES(true)},req:[{m:'GET',u:'/api/contacts'},{m:'GET',u:'/api/contacts/1'},{m:'GET',u:'/api/contacts/999'}],c:ctx=>{const l=lastReq(ctx,'GET',/^\/api\/contacts\/?$/),a=lastReq(ctx,'GET',/^\/api\/contacts\/1$/),b=lastReq(ctx,'GET',/^\/api\/contacts\/999$/);return l&&l.status===200&&Array.isArray(l.json)&&a&&a.status===200&&b&&b.status===404}},
 {t:'List your routes to double-check the API surface.',why:'<code>route:list</code> shows every URL your app answers, with its method and handler. Run it before a deploy to make sure you haven\'t exposed something by accident.',term:'php artisan route:list',h:'php artisan route:list',c:()=>!!BENCH.code.listedRoutes},
 ]},
solo:{title:'Inventory report with PDO and classes',kind:'code',lang:'php',sqlite:true,seed:SEED,starter:SOLO_START,
 pitch:'Model products as a class, query a database safely with prepared statements, update stock with validation, and print a sorted low-stock report.',
 brief:`<p>A warehouse needs a small PHP tool. The database already has a <code>products</code> table: <code>sku</code>, <code>name</code>, <code>price</code> and <code>stock</code>. <code>$pdo</code> is connected in the starter. Use exactly these names, because the warehouse's other scripts call them.</p>
<ul><li><b>class Product</b> with public <code>sku</code>, <code>name</code>, <code>price</code> (float) and <code>stock</code> (int), using constructor promotion. <code>isLowStock(): bool</code> is true when stock is under 5.</li><li><b>loadProducts(PDO $pdo): array</b> returns every product as a <code>Product</code> object.</li><li><b>findProduct(PDO $pdo, string $sku): ?Product</b> returns the product, or <code>null</code> if there is none. SKUs come from user input.</li><li><b>restock(PDO $pdo, string $sku, int $qty): bool</b> adds <code>$qty</code> to the stock and throws <code>InvalidArgumentException</code> when <code>$qty</code> is 0 or less.</li><li>Running the script prints a <b>low-stock report</b>, one line per low product with the lowest stock first, like <code>LOW STOCK: USB-C hub (0 left)</code>. The last line is <code>Inventory value: $2,034.00</code> (price × stock for all products, formatted with a thousands separator).</li></ul>
<p>Don't call <code>restock()</code> at the top level of the script: the database keeps changes between runs.</p>`,
 tasks:[
 {t:'Product uses constructor promotion, and isLowStock() is true below 5.',c:ctx=>ev(ctx,'(new Product("X", "Test", 1.5, 4))->isLowStock()').v===true&&ev(ctx,'(new Product("X", "Test", 1.5, 5))->isLowStock()').v===false&&/__construct\s*\(\s*(public|private|protected)/.test(ctx.code),
  miss:ctx=>{const r=ev(ctx,'(new Product("X", "Test", 1.5, 5))->isLowStock()');if(r.err)return /not found|undefined|Class/i.test(r.err)?'There is no Product class with the constructor (sku, name, price, stock).':'Creating a Product failed: '+r.err;if(r.v===true)return 'isLowStock() returns true for exactly 5. The brief says under 5, so use < 5, not <= 5. Off-by-one errors at boundaries are the most common bug there is.';if(!/__construct\s*\(\s*(public|private|protected)/.test(ctx.code))return 'Use constructor promotion: public function __construct(public string $sku, …) {} declares and assigns the properties in one place.';return 'isLowStock() should return true when stock is 4.'}},
 {t:'loadProducts() returns 4 Product objects.',c:ctx=>ev(ctx,'count(loadProducts($pdo))').v===4&&ev(ctx,'loadProducts($pdo)[0] instanceof Product').v===true,
  miss:ctx=>{const r=ev(ctx,'count(loadProducts($pdo))');if(r.err)return /undefined function/i.test(r.err)?'There is no loadProducts function.':'Calling loadProducts($pdo) failed: '+r.err.split('\n')[0];return ev(ctx,'loadProducts($pdo)[0] instanceof Product').v!==true?'loadProducts() returns plain arrays. Map each row to new Product(...), for example with array_map.':'loadProducts() returned '+r.v+' items instead of 4.'}},
 {t:'findProduct() uses a prepared statement and returns null for an unknown SKU.',c:ctx=>{const b=fnBody(ctx.code,'findProduct');return ev(ctx,'findProduct($pdo, "MN-03")->name').v==='27-inch monitor'&&ev(ctx,'findProduct($pdo, "NOPE-99")').v===null&&/->prepare\(/.test(b)&&!/\.\s*\$sku|\{\$sku\}|'\$sku'|"[^"]*\$sku/.test(b.split('->prepare(')[1]||'')},
  miss:ctx=>{const b=fnBody(ctx.code,'findProduct');if(!b)return 'There is no findProduct function.';if(!/->prepare\(/.test(b)||/\.\s*\$sku|\{\$sku\}|"[^"]*\$sku/.test(b))return 'findProduct() puts $sku straight into the SQL string. Someone could send "x\' OR \'1\'=\'1" as a SKU. Use $pdo->prepare(\'… WHERE sku = :sku\') and execute([\'sku\' => $sku]).';const n=ev(ctx,'findProduct($pdo, "NOPE-99")');if(n.err)return 'findProduct() crashed on an unknown SKU: '+n.err+'. fetch() returns false when there is no row; check for that before you build a Product.';if(n.v!==null)return 'For an unknown SKU, findProduct() should return null, not false or an empty value. The ?Product return type promises a Product or null.';return 'findProduct($pdo, "MN-03") should return the Product for "27-inch monitor".'}},
 {t:'restock() adds to the stock and throws InvalidArgumentException for qty <= 0.',c:ctx=>{const before=ev(ctx,'findProduct($pdo, "KB-01")->stock').v;const r=ev(ctx,'restock($pdo, "KB-01", 5)');const after=ev(ctx,'findProduct($pdo, "KB-01")->stock').v;const bad=ev(ctx,'restock($pdo, "KB-01", 0)');ev(ctx,'$pdo->exec("UPDATE products SET stock = 12 WHERE sku = \'KB-01\'")');return !r.err&&typeof before==='number'&&after===before+5&&/InvalidArgumentException/.test(bad.err||'')},
  miss:ctx=>{const bad=ev(ctx,'restock($pdo, "KB-01", 0)');ev(ctx,'$pdo->exec("UPDATE products SET stock = 12 WHERE sku = \'KB-01\'")');if(/not found|undefined function/i.test(bad.err||''))return 'There is no restock function.';if(bad.err&&!/InvalidArgumentException/.test(bad.err))bad.err=bad.err.split('\n')[0];if(!/InvalidArgumentException/.test(bad.err||''))return 'restock($pdo, "KB-01", 0) didn\'t throw InvalidArgumentException'+(bad.err?' (it threw: '+bad.err.slice(0,80)+')':'')+'. Validate the input first: if ($qty <= 0) throw new InvalidArgumentException(…).';return 'restock() didn\'t add the quantity to the stock. Use one prepared UPDATE: SET stock = stock + :qty WHERE sku = :sku.'}},
 {t:'The script prints the low-stock lines, lowest stock first.',c:ctx=>{const o=ctx.out||'';const i0=o.indexOf('LOW STOCK: USB-C hub (0 left)'),i1=o.indexOf('LOW STOCK: Wireless mouse (2 left)'),i2=o.indexOf('LOW STOCK: 27-inch monitor (4 left)');return i0>=0&&i1>i0&&i2>i1&&!/LOW STOCK: Mechanical/.test(o)},
  miss:ctx=>{const o=ctx.out||'';if(!/LOW STOCK/.test(o))return ctx.err?'The script stopped with an error before printing: '+ctx.err.slice(0,160):'Nothing starting with "LOW STOCK:" was printed.';if(/Mechanical/.test(o))return 'The keyboard (12 in stock) is in your report. Filter with isLowStock() first.';if(/Wireless mouse \((?!2 )/.test(o)||/hub \((?!0 )/.test(o))return 'The stock numbers in your report don\'t match the database. Did a top-level restock() call change them? Remove it. You can reset the data by opening the project again.';return 'The lines are in the wrong order or format. Expected, in this order:\nLOW STOCK: USB-C hub (0 left)\nLOW STOCK: Wireless mouse (2 left)\nLOW STOCK: 27-inch monitor (4 left)\nSort with usort and the <=> operator.'}},
 {t:'The last line is "Inventory value: $2,034.00".',c:ctx=>/Inventory value: \$2,034\.00\s*$/.test(ctx.out||''),
  miss:ctx=>{const m=(ctx.out||'').match(/Inventory value:.*$/m);if(!m)return 'There is no "Inventory value:" line.';return 'You printed "'+m[0]+'". Sum price × stock across all products, then format with number_format($total, 2) for the comma and two decimals.'}},
 ],
 warn:[
  {c:ctx=>/query\([^)]*\$\w+/.test(ctx.code)||/"\s*SELECT[^"]*\$\w+/.test(ctx.code),m:'Some SQL is built by putting a variable inside the query string. Even when the value looks safe today, use placeholders by default.'},
  {c:ctx=>/^(\$\w+\s*=\s*)?restock\(/m.test(ctx.code),m:'You call restock() at the top level, so every run changes the database. Side effects in a script\'s main body are a classic source of "it worked yesterday" bugs.'},
  {c:ctx=>!/declare\(strict_types=1\)/.test(ctx.code),m:'You removed declare(strict_types=1). Strict types turn silent conversions like "5" into 5 into errors, which catches bugs early.'},
 ],
 ref:SOLO_REF},
});
})();
