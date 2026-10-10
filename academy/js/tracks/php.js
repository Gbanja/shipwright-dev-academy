/* Track 6: PHP */
(()=>{
const O=()=>OPS.st,H=re=>OPS.Hx(re),F=p=>OPS.file(p)||'';
const ev=(ctx,src)=>ctx.php&&ctx.php.eval?ctx.php.eval(src):{err:'no runtime'};
const lastReq=(ctx,m,re)=>[...(ctx.reqs||[])].reverse().find(r=>r.m===m&&re.test(r.u));
const H1_START=`<?php
declare(strict_types=1);

$name = 'Ada';
// 1. Print "Hello, Ada!" using the $name variable inside a double-quoted string

// 2. Return the average of an array of numbers
function average(array $numbers): float {
    return 0;
}

// 3. Print each key and value of $user on its own line, like "name: Ada"
$user = ['name' => 'Ada', 'role' => 'admin', 'city' => 'London'];

// 4. Make add() actually add
function add(int $a, int $b): int {
    return 0;
}

// 5. Keep only the passing scores (70 or more) with array_filter
$scores = [72, 95, 88, 61];
`;
const H1_SOL=`<?php
declare(strict_types=1);

$name = 'Ada';
echo "Hello, $name!\\n";

function average(array $numbers): float {
    if (count($numbers) === 0) {
        return 0.0;
    }
    return array_sum($numbers) / count($numbers);
}
echo average([80, 90, 85]) . "\\n";

$user = ['name' => 'Ada', 'role' => 'admin', 'city' => 'London'];
foreach ($user as $key => $value) {
    echo "$key: $value\\n";
}

function add(int $a, int $b): int {
    return $a + $b;
}
echo add(2, 3) . "\\n";

$scores = [72, 95, 88, 61];
$passed = array_filter($scores, fn($s) => $s >= 70);
echo implode(', ', $passed) . "\\n";
`;
const H2_START=`<?php
declare(strict_types=1);

// Build a small product catalogue with modern PHP OOP.

class Product {
    // TODO: constructor property promotion, a private base price,
    // price() and priceWithTax()
}

$mug = new Product();
`;
const H2_SOL=`<?php
declare(strict_types=1);

interface HasPrice {
    public function price(): float;
}

trait HasSlug {
    public function slug(): string {
        return strtolower(str_replace(' ', '-', $this->name));
    }
}

enum Status: string {
    case Draft = 'draft';
    case Published = 'published';
}

class Product implements HasPrice {
    use HasSlug;

    public function __construct(
        public string $name,
        private float $basePrice,
        public Status $status = Status::Draft,
    ) {}

    public function price(): float {
        return $this->basePrice;
    }

    public function priceWithTax(float $rate = 0.2): float {
        return round($this->price() * (1 + $rate), 2);
    }
}

class DigitalProduct extends Product {
    // Digital goods are tax-free in this example
    public function priceWithTax(float $rate = 0.2): float {
        return $this->price();
    }
}

$mug = new Product('Coffee Mug', 10.0);
echo $mug->name . ' costs ' . $mug->priceWithTax() . "\\n";
echo $mug->slug() . "\\n";

$ebook = new DigitalProduct('PHP Ebook', 15.0, Status::Published);
echo $ebook->priceWithTax() . ' (' . $ebook->status->value . ")\\n";
`;
const PRODUCT_PHP=`<?php
namespace App\\Models;

class Product
{
    public function __construct(public string $name, public float $price) {}

    public function label(): string
    {
        return $this->name . ' ($' . number_format($this->price, 2) . ')';
    }
}
`;
const INDEX_PHP=`<?php
require __DIR__ . '/vendor/autoload.php';

use App\\Models\\Product;

$p = new Product('Keyboard', 49.5);
echo $p->label() . "\\n";
`;
const INDEX_LOG=`<?php
require __DIR__ . '/vendor/autoload.php';

use App\\Models\\Product;
use Monolog\\Logger;
use Monolog\\Handler\\StreamHandler;

$log = new Logger('app');
$log->pushHandler(new StreamHandler('php://stdout'));

$p = new Product('Keyboard', 49.5);
$log->info('Product created', ['name' => $p->name]);
echo $p->label() . "\\n";
`;
const USERS_SEED="CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, role TEXT NOT NULL DEFAULT 'member');\nINSERT INTO users (name, email, role) VALUES ('Ada Lovelace','ada@example.com','admin'),('Grace Hopper','grace@example.com','member'),('Alan Turing','alan@example.com','member');";
const H4_START=`<?php
// Connect (this lesson's database is pre-filled with a users table)
$pdo = new PDO('mysql:host=localhost;dbname=shop', 'shop_user', 'secret');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

// 1. Fetch all users and print "N users"

// 2. findUserByEmail(PDO $pdo, string $email): ?array  using a prepared statement

// 3. createUser(PDO $pdo, string $name, string $email): int  returning the new id

// 4. Catch the error when an email is already taken
`;
const H4_SOL=`<?php
$pdo = new PDO('mysql:host=localhost;dbname=shop', 'shop_user', 'secret');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

$users = $pdo->query('SELECT id, name, email FROM users ORDER BY id')->fetchAll();
echo count($users) . " users\\n";

function findUserByEmail(PDO $pdo, string $email): ?array {
    $stmt = $pdo->prepare('SELECT id, name, email FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();
    return $user ?: null;
}
print_r(findUserByEmail($pdo, 'grace@example.com'));

function createUser(PDO $pdo, string $name, string $email): int {
    $stmt = $pdo->prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    $stmt->execute([$name, $email]);
    return (int) $pdo->lastInsertId();
}

try {
    createUser($pdo, 'Ada Again', 'ada@example.com');
} catch (PDOException $e) {
    echo "Could not create user: email already taken\\n";
}
`;
const POST_MIGRATION=`<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('body');
            $table->boolean('published')->default(false);
            $table->timestamps();
        });
    }
};
`;
const POST_MODEL=(fill)=>`<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Post extends Model
{
    protected $fillable = [${fill?"'title', 'body', 'published'":''}];
}
`;
const SEEDER=`<?php

namespace Database\\Seeders;

use App\\Models\\Post;
use Illuminate\\Database\\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Post::create(['title' => 'Hello Laravel', 'body' => 'My first post.', 'published' => true]);
        Post::create(['title' => 'Eloquent is neat', 'body' => 'Models map to tables.', 'published' => true]);
        Post::create(['title' => 'Draft ideas', 'body' => 'Not ready yet.', 'published' => false]);
    }
}
`;
const WEB_START=`<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Models\\Post;

Route::get('/', function () {
    return 'Welcome to my blog';
});
`;
const WEB_SOL=`<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Models\\Post;

Route::get('/', function () {
    return 'Welcome to my blog';
});

Route::get('/posts', function () {
    $posts = Post::where('published', true)->latest()->get();
    return view('posts.index', ['posts' => $posts]);
});

Route::get('/posts/{post}', function (Post $post) {
    return view('posts.show', ['post' => $post]);
});
`;
const VIEW_INDEX=`<h1>Blog</h1>
<ul>
@foreach ($posts as $post)
    <li><a href="/posts/{{ $post->id }}">{{ $post->title }}</a></li>
@endforeach
</ul>
`;
const VIEW_SHOW=`<article>
    <h1>{{ $post->title }}</h1>
    <p>{{ $post->body }}</p>
</article>
`;
const TASK_MIGRATION=`<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->boolean('done')->default(false);
            $table->timestamps();
        });
    }
};
`;
const TASK_MODEL=`<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Task extends Model
{
    protected $fillable = ['title', 'done'];

    protected $casts = ['done' => 'boolean'];
}
`;
const TASK_CTRL_START=`<?php

namespace App\\Http\\Controllers;

use App\\Models\\Task;
use Illuminate\\Http\\Request;

class TaskController extends Controller
{
    public function index()
    {
        // TODO: return all tasks
        return [];
    }
}
`;
const TASK_CTRL_SOL=`<?php

namespace App\\Http\\Controllers;

use App\\Models\\Task;
use Illuminate\\Http\\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::orderBy('id')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:100',
            'done' => 'boolean',
        ]);
        $task = Task::create($data);
        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        return $task;
    }

    public function update(Request $request, Task $task)
    {
        $data = $request->validate([
            'title' => 'string|max:100',
            'done' => 'boolean',
        ]);
        $task->update($data);
        return $task;
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->noContent();
    }
}
`;
const API_START=`<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\TaskController;

Route::get('/tasks', [TaskController::class, 'index']);
`;
const API_SOL=`<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\TaskController;

Route::get('/tasks', [TaskController::class, 'index']);
Route::post('/tasks', [TaskController::class, 'store']);
Route::get('/tasks/{task}', [TaskController::class, 'show']);
Route::patch('/tasks/{task}', [TaskController::class, 'update']);
Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
`;

defineTrack({id:'php',name:'PHP',weeks:'3–4 weeks',
lessons:[
{id:'h1',lvl:'Language',title:'PHP syntax, types & arrays',kind:'code',lang:'php',starter:H1_START,
 sum:'PHP code lives between <?php tags. Variables start with $, double-quoted strings interpolate variables ("Hello, $name!") while single-quoted strings don\'t, and . joins strings. Arrays are ordered maps that serve as lists and dictionaries (["name" => "Ada"]); loop them with foreach ($arr as $key => $value). declare(strict_types=1) makes scalar type declarations strict.',
 keys:['<?php','$variable','"Hello, $name"','["key" => "value"]','foreach ($a as $k => $v)','fn($x) => $x * 2','declare(strict_types=1)'],
 concept:`<p>PHP powers a huge share of the web, including WordPress and Laravel apps. Modern PHP 8 is fast, typed and pleasant to write.</p>
<div class="tbl-wrap"><table><tr><th>Concept</th><th>Example</th></tr>
<tr><td>Variables</td><td><code>$name = 'Ada';</code></td></tr>
<tr><td>Interpolation (double quotes only)</td><td><code>echo "Hello, $name!";</code></td></tr>
<tr><td>Concatenation</td><td><code>'Total: ' . $total</code></td></tr>
<tr><td>Arrays (list + map)</td><td><code>[1, 2, 3]</code>, <code>['name' =&gt; 'Ada']</code></td></tr>
<tr><td>Loop</td><td><code>foreach ($user as $key =&gt; $value) { … }</code></td></tr>
<tr><td>Arrow function</td><td><code>array_filter($xs, fn($x) =&gt; $x &gt;= 70)</code></td></tr>
<tr><td>Types</td><td><code>function add(int $a, int $b): int</code></td></tr></table></div>
<div class="tip"><b>strict_types</b>Without it, PHP quietly converts <code>"5"</code> to <code>5</code> for an <code>int</code> parameter. With <code>declare(strict_types=1);</code> it throws a TypeError instead. Most modern codebases turn it on.</div>
<p>This editor runs your PHP in a small interpreter built for these lessons. It supports the language features used here; for anything else, run real PHP from the Real-world reps.</p>`,
 tasks:[
  {t:'Print "Hello, Ada!" by interpolating $name in a double-quoted string.',sol:H1_SOL,showSol:false,hint:'echo "Hello, $name!\\n";',c:ctx=>/Hello, Ada!/.test(ctx.out||'')&&/"[^"\n]*\$name[^"\n]*"/.test(ctx.code)},
  {t:'Make average() return the mean (85 for [80, 90, 85]) and 0 for an empty array.',hint:'return array_sum($numbers) / count($numbers);  (guard against count 0)',c:ctx=>{if(!ctx.php)return false;const a=ctx.php.call('average',[80,90,85]),b=ctx.php.call('average',[]);return a.v===85&&b.v===0}},
  {t:'Print every key and value of $user as "key: value" with foreach.',hint:'foreach ($user as $key => $value) { echo "$key: $value\\n"; }',c:ctx=>/name: Ada/.test(ctx.out||'')&&/role: admin/.test(ctx.out||'')&&/city: London/.test(ctx.out||'')&&/foreach/.test(ctx.code)},
  {t:'Make add() work. With strict types on, add("2", 3) must throw a TypeError.',hint:'return $a + $b;',c:ctx=>{if(!ctx.php)return false;const ok=ctx.php.call('add',2,3);const bad=ctx.php.call('add','2',3);return ok.v===5&&/TypeError/.test(bad.err||'')}},
  {t:'Print the passing scores (72, 95, 88) using array_filter with an arrow function.',hint:"$passed = array_filter($scores, fn($s) => $s >= 70); echo implode(', ', $passed);",c:ctx=>/72, 95, 88/.test(ctx.out||'')&&/array_filter/.test(ctx.code)&&/fn\s*\(/.test(ctx.code)},
 ]},
{id:'h2',lvl:'Language',title:'OOP: classes, interfaces, traits & enums',kind:'code',lang:'php',starter:H2_START,
 sum:'Modern PHP classes use constructor property promotion (public function __construct(public string $name) {}), visibility (public, protected, private) and typed properties. Interfaces define a contract a class implements, traits share methods between unrelated classes, extends creates a subclass that can override methods, and backed enums (enum Status: string) replace magic strings.',
 keys:['__construct(public string $name)','private / protected / public','interface + implements','trait + use','extends / override','enum Status: string','Status::from("draft")'],
 concept:`<p>Object-oriented PHP is how frameworks like Laravel and Symfony are organized.</p>
<pre class="snip" style="margin-bottom:12px">class Product implements HasPrice {
    use HasSlug;                          // trait: shared methods

    public function __construct(          // promotion: declares + assigns
        public string $name,
        private float $basePrice,         // only this class can touch it
        public Status $status = Status::Draft,
    ) {}

    public function price(): float { return $this->basePrice; }
}

enum Status: string { case Draft = 'draft'; case Published = 'published'; }</pre>
<div class="tbl-wrap"><table><tr><th>Tool</th><th>Use it for</th></tr><tr><td>interface</td><td>"Anything that has a price()": a contract many classes can fulfill</td></tr><tr><td>abstract class / extends</td><td>Shared base behavior plus overrides</td></tr><tr><td>trait</td><td>Reusing methods across unrelated classes</td></tr><tr><td>enum</td><td>A fixed set of values instead of magic strings</td></tr></table></div>`,
 tasks:[
  {t:'Write Product with constructor promotion: public name, private basePrice, and priceWithTax() adding 20%.',sol:H2_SOL,showSol:false,hint:'public function __construct(public string $name, private float $basePrice) {}  …  return round($this->price() * 1.2, 2);',c:ctx=>{const a=ev(ctx,'(new Product("Mug", 10.0))->priceWithTax()');const b=ev(ctx,'(new Product("Mug", 10.0))->basePrice');return a.v===12&&/Cannot access private/.test(b.err||'')}},
  {t:'Make Product implement a HasPrice interface with a price(): float method.',hint:'interface HasPrice { public function price(): float; }  class Product implements HasPrice',c:ctx=>ev(ctx,'(new Product("A", 1.0)) instanceof HasPrice').v===true},
  {t:'Add a HasSlug trait whose slug() turns "Coffee Mug" into "coffee-mug".',hint:"trait HasSlug { public function slug(): string { return strtolower(str_replace(' ', '-', $this->name)); } }",c:ctx=>ev(ctx,'(new Product("Coffee Mug", 1.0))->slug()').v==='coffee-mug'},
  {t:'Add a backed enum Status (draft, published), defaulting new products to Draft.',hint:"enum Status: string { case Draft = 'draft'; case Published = 'published'; }",c:ctx=>ev(ctx,'(new Product("A", 1.0))->status->value').v==='draft'&&ev(ctx,'Status::from("published") === Status::Published').v===true},
  {t:'Create DigitalProduct extends Product, overriding priceWithTax() to skip tax.',hint:'class DigitalProduct extends Product { public function priceWithTax(float $rate = 0.2): float { return $this->price(); } }',c:ctx=>ev(ctx,'(new DigitalProduct("E", 15.0))->priceWithTax()').v===15},
 ]},
{id:'h3',lvl:'Tooling',title:'Composer & autoloading',kind:'ops',
 setup:o=>{o.mkdirp('/home/you/shop/src/Models');o.H().cwd='/home/you/shop';o.write('src/Models/Product.php',PRODUCT_PHP);o.write('index.php',INDEX_PHP)},
 intro:'You are in ~/shop. index.php uses App\\Models\\Product from src/, through Composer\'s autoloader, which doesn\'t exist yet. Run php index.php to see.',
 sum:'Composer is PHP\'s package manager. composer.json lists dependencies and autoload rules; PSR-4 maps a namespace prefix to a folder ("App\\\\": "src/") so require "vendor/autoload.php" loads classes on demand. composer require adds a package (like monolog/monolog for logging) and updates composer.lock. Commit composer.json and composer.lock, never vendor/.',
 keys:['composer init','"psr-4": { "App\\\\": "src/" }','composer dump-autoload','require "vendor/autoload.php"','composer require monolog/monolog','commit composer.lock, not vendor/'],
 concept:`<p>Real PHP projects use <b>Composer</b> for two jobs:</p>
<ol><li><b>Dependencies</b>: <code>composer require monolog/monolog</code> downloads a package into <code>vendor/</code> and records it in <code>composer.json</code> and <code>composer.lock</code>.</li>
<li><b>Autoloading</b>: instead of <code>require</code>-ing every file, map namespaces to folders (PSR-4) and include one file: <code>vendor/autoload.php</code>.</li></ol>
<pre class="snip" style="margin-bottom:12px">{
    "autoload": {
        "psr-4": { "App\\\\": "src/" }
    }
}
// App\\Models\\Product  →  src/Models/Product.php</pre>
<div class="tip"><b>What to commit</b>Commit <code>composer.json</code> and <code>composer.lock</code> so everyone gets identical versions. Add <code>vendor/</code> to <code>.gitignore</code>; teammates and servers run <code>composer install</code>.</div>`,
 tasks:[
  {t:'Run the script and read the error about vendor/autoload.php.',h:'php index.php',c:()=>H(/^php index\.php/)},
  {t:'Create composer.json with a PSR-4 autoload rule (composer init sets App\\ → src/).',h:'composer init --name you/shop\ncat composer.json',c:()=>/psr-4/.test(F('/home/you/shop/composer.json'))},
  {t:'Generate the autoloader and run the script again.',h:'composer dump-autoload\nphp index.php',c:()=>O().flags.autoload&&/Keyboard \(\$49\.50\)/.test(O().lastOut||'')},
  {t:'Install the Monolog logging library.',h:'composer require monolog/monolog',c:()=>(O().flags.required||[]).includes('monolog/monolog')},
  {t:'Log "Product created" with Monolog to stdout and run it.',h:'nano index.php\nphp index.php',f:{'index.php':INDEX_LOG},c:()=>/app\.INFO: Product created/.test(O().lastOut||'')},
  {t:'Which files belong in Git?',o:['vendor/ and composer.json','composer.json and composer.lock (vendor/ is ignored)','Only vendor/','Nothing from Composer'],a:1,e:'The lock file pins exact versions; composer install recreates vendor/ anywhere.'},
 ]},
{id:'h4',lvl:'Data',title:'PDO & MySQL, safely',kind:'code',lang:'php',sqlite:true,seed:USERS_SEED,starter:H4_START,
 sum:'PDO is PHP\'s database layer for MySQL, Postgres and SQLite. Turn on exceptions (ERRMODE_EXCEPTION) and a default fetch mode, then always use prepared statements: prepare() a query with placeholders (:email or ?) and execute() with the values. That keeps data separate from SQL, which prevents SQL injection. lastInsertId() returns the new row\'s id.',
 keys:['new PDO($dsn, $user, $pass)','PDO::ERRMODE_EXCEPTION','$pdo->prepare("... WHERE email = :email")','$stmt->execute(["email" => $email])','$stmt->fetch() / fetchAll()','$pdo->lastInsertId()','catch (PDOException $e)'],
 concept:`<p><b>PDO</b> talks to MySQL, PostgreSQL and SQLite with one API. Laravel's database layer is built on it.</p>
<pre class="snip" style="margin-bottom:12px">$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);      // values go separately from SQL
$user = $stmt->fetch();</pre>
<h4>Never do this</h4>
<pre class="snip" style="margin-bottom:12px">$pdo->query("SELECT * FROM users WHERE email = '$email'");   // SQL injection!</pre>
<p>If <code>$email</code> is <code>' OR '1'='1</code>, the query returns every user. With prepared statements the database treats the value strictly as data, never as SQL.</p>
<div class="tip"><b>Sandbox note</b>The DSN says mysql, but this lesson's database is SQLite running in your browser. The PDO code is identical. Data you insert persists until you reset the lesson.</div>`,
 tasks:[
  {t:'Fetch all users and print how many there are, like "3 users".',sol:H4_SOL,showSol:false,hint:"$users = $pdo->query('SELECT id, name, email FROM users')->fetchAll(); echo count($users) . \" users\\n\";",c:ctx=>{const m=(ctx.out||'').match(/(\d+) users/);return m&&+m[1]>=3}},
  {t:'Write findUserByEmail() with a prepared statement and a named placeholder.',hint:"$stmt = $pdo->prepare('SELECT id, name, email FROM users WHERE email = :email'); $stmt->execute(['email' => $email]);",c:ctx=>{const r=ev(ctx,'findUserByEmail($pdo, "grace@example.com")["name"]');return r.v==='Grace Hopper'&&ctx.php.queries.some(q=>q.prepared&&/:email|\?/.test(q.sql))}},
  {t:'Write createUser() that inserts with placeholders and returns the new id.',hint:"$stmt = $pdo->prepare('INSERT INTO users (name, email) VALUES (?, ?)'); $stmt->execute([$name, $email]); return (int) $pdo->lastInsertId();",c:ctx=>{const email='linus'+Date.now()+'@example.com';const r=ev(ctx,'createUser($pdo, "Linus", "'+email+'")');const f=ev(ctx,'findUserByEmail($pdo, "'+email+'")["name"]');return r.v>0&&f.v==='Linus'}},
  {t:'Catch the PDOException when creating a user whose email already exists.',hint:'try { createUser($pdo, "Ada Again", "ada@example.com"); } catch (PDOException $e) { echo "Could not create user: email already taken\\n"; }',c:ctx=>/already taken/.test(ctx.out||'')&&!ctx.err},
  {t:'Why are prepared statements safe from SQL injection?',o:['They escape quotes automatically in PHP','The SQL and the values are sent separately, so values can never become SQL','They are faster','MySQL rejects suspicious queries'],a:1,e:'The database parses the query first, then plugs in values as pure data.'},
 ]},
{id:'h5',lvl:'Laravel',title:'Laravel: routing, Eloquent & Blade',kind:'code',lang:'php',laravel:true,sqlite:true,seed:'',api:'php',apiStart:'/posts',term:true,project:'blog',open:'routes/web.php',
 files:{'routes/web.php':WEB_START,'app/Models/Post.php':POST_MODEL(false),'database/migrations/2026_10_10_000000_create_posts_table.php':POST_MIGRATION,'database/seeders/DatabaseSeeder.php':SEEDER},allowNew:true,
 sum:'Laravel is PHP\'s most popular framework. Routes in routes/web.php map URLs to closures or controllers. Migrations (php artisan migrate) create tables; Eloquent models map a class to a table (Post → posts) with expressive queries (Post::where("published", true)->latest()->get()). $fillable whitelists mass-assignable columns. Blade templates ({{ $post->title }}, @foreach) render HTML with escaping by default, and route-model binding (function (Post $post)) loads records from the URL.',
 keys:['Route::get("/posts", fn)','php artisan migrate','class Post extends Model','protected $fillable','Post::where(...)->latest()->get()','view("posts.index", [...])','{{ $post->title }} / @foreach','function (Post $post)'],
 concept:`<p>Laravel gives you a full structure: routes, controllers, models, migrations, views. This sandbox runs a mini version of it so you can practise the core loop.</p>
<div class="flow"><span>Request /posts</span><em>→</em><span>routes/web.php</span><em>→</em><span>Eloquent model → DB</span><em>→</em><span>Blade view</span><em>→</em><span>HTML</span></div>
<pre class="snip" style="margin-bottom:12px">Route::get('/posts', function () {
    $posts = Post::where('published', true)->latest()->get();
    return view('posts.index', ['posts' => $posts]);   // resources/views/posts/index.blade.php
});

Route::get('/posts/{post}', function (Post $post) {   // route-model binding: 404 if missing
    return view('posts.show', ['post' => $post]);
});</pre>
<p>Blade: <code>{{ $post->title }}</code> prints escaped text, and <code>@foreach ($posts as $post) … @endforeach</code> loops.</p>
<div class="tip"><b>Mass assignment</b><code>Post::create($request-&gt;all())</code> would let attackers set any column (like <code>is_admin</code>). Laravel refuses unless the column is in <code>$fillable</code>. You'll hit that error on purpose.</div>
<p>Use the terminal for <code>php artisan</code> commands and the request panel to visit routes.</p>`,
 tasks:[
  {t:'Run the migration to create the posts table.',term:'php artisan migrate',c:()=>(BENCH.code.applied||[]).some(f=>/create_posts_table/.test(f))},
  {t:'Seed the database. It fails on mass assignment until you fill in $fillable.',sol:{'app/Models/Post.php':POST_MODEL(true)},showSol:false,hint:"protected $fillable = ['title', 'body', 'published'];  then: php artisan db:seed",term:'php artisan db:seed',c:()=>!!BENCH.code.seeded},
  {t:'Add GET /posts that lists published posts in a Blade view (drafts hidden).',sol:{'routes/web.php':WEB_SOL,'resources/views/posts/index.blade.php':VIEW_INDEX,'resources/views/posts/show.blade.php':VIEW_SHOW},showSol:false,hint:"Route::get('/posts', function () { $posts = Post::where('published', true)->latest()->get(); return view('posts.index', ['posts' => $posts]); });  and resources/views/posts/index.blade.php with @foreach",req:{m:'GET',u:'/posts'},c:ctx=>{const r=lastReq(ctx,'GET',/^\/posts\/?$/);return r&&r.status===200&&/Hello Laravel/.test(String(r.json))&&!/Draft ideas/.test(String(r.json))}},
  {t:'Add GET /posts/{post} with route-model binding. A missing post returns 404.',req:[{m:'GET',u:'/posts/1'},{m:'GET',u:'/posts/999'}],hint:"Route::get('/posts/{post}', function (Post $post) { return view('posts.show', ['post' => $post]); });",c:ctx=>{const a=lastReq(ctx,'GET',/^\/posts\/1$/),b=lastReq(ctx,'GET',/^\/posts\/999$/);return a&&a.status===200&&/Hello Laravel/.test(String(a.json))&&b&&b.status===404}},
  {t:'Why does Laravel refuse Post::create() for columns missing from $fillable?',o:['It\'s a performance optimization','To stop attackers from setting columns you never meant to accept (mass assignment)','Because of SQL syntax','It only matters in tests'],a:1,e:'Whitelisting columns means a crafted form can\'t set is_admin or user_id.'},
 ]},
{id:'h6',lvl:'Laravel',title:'Building a REST API',kind:'code',lang:'php',laravel:true,sqlite:true,seed:'',api:'php',apiStart:'/api/tasks',term:true,project:'todo-api',open:'app/Http/Controllers/TaskController.php',
 files:{'routes/api.php':API_START,'app/Models/Task.php':TASK_MODEL,'app/Http/Controllers/TaskController.php':TASK_CTRL_START,'database/migrations/2026_10_10_000001_create_tasks_table.php':TASK_MIGRATION},
 sum:'A REST API exposes resources at URLs and uses HTTP methods for actions: GET /api/tasks lists, POST creates (201 Created), GET /api/tasks/{id} reads (404 if missing), PATCH updates, DELETE removes (204 No Content). In Laravel, routes/api.php maps those to controller methods; $request->validate() returns 422 with field errors on bad input, and returning a model or collection becomes JSON automatically.',
 keys:['routes/api.php → /api/...','[TaskController::class, "store"]','$request->validate([...])','response()->json($task, 201)','422 validation errors','404 for missing','response()->noContent() → 204'],
 concept:`<p>A <b>REST API</b> organizes data as resources with standard URLs and methods:</p>
<div class="tbl-wrap"><table><tr><th>Method + URL</th><th>Action</th><th>Success status</th></tr>
<tr><td><code>GET /api/tasks</code></td><td>List</td><td>200</td></tr>
<tr><td><code>POST /api/tasks</code></td><td>Create</td><td>201 Created</td></tr>
<tr><td><code>GET /api/tasks/{id}</code></td><td>Read one</td><td>200 (404 if missing)</td></tr>
<tr><td><code>PATCH /api/tasks/{id}</code></td><td>Update fields</td><td>200</td></tr>
<tr><td><code>DELETE /api/tasks/{id}</code></td><td>Delete</td><td>204 No Content</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">public function store(Request $request) {
    $data = $request->validate(['title' => 'required|string|max:100']);   // 422 on failure
    return response()->json(Task::create($data), 201);
}</pre>
<div class="tip"><b>Test with the request panel</b>Choose the method, type the path, add a JSON body for POST and PATCH, and press Send. Run <code>php artisan migrate</code> first.</div>`,
 tasks:[
  {t:'Create the tasks table.',term:'php artisan migrate',c:()=>(BENCH.code.applied||[]).some(f=>/create_tasks_table/.test(f))},
  {t:'POST /api/tasks creates a task (201); a missing title returns 422 with errors.',sol:{'app/Http/Controllers/TaskController.php':TASK_CTRL_SOL,'routes/api.php':API_SOL},showSol:false,hint:"Route::post('/tasks', [TaskController::class, 'store']);  and store() with $request->validate([...]) + response()->json($task, 201)",req:[{m:'POST',u:'/api/tasks',body:{title:'Write tests'}},{m:'POST',u:'/api/tasks',body:{}}],c:ctx=>{const rs=(ctx.reqs||[]).filter(r=>r.m==='POST'&&/^\/api\/tasks\/?$/.test(r.u));return rs.some(r=>r.status===201&&r.json&&r.json.id&&r.json.title)&&rs.some(r=>r.status===422&&r.json&&r.json.errors&&r.json.errors.title)}},
  {t:'GET /api/tasks lists tasks, and GET /api/tasks/{task} returns one or 404.',req:[{m:'GET',u:'/api/tasks'},{m:'GET',u:'/api/tasks/1'},{m:'GET',u:'/api/tasks/999'}],hint:"Route::get('/tasks/{task}', [TaskController::class, 'show']);  public function show(Task $task) { return $task; }",c:ctx=>{const l=lastReq(ctx,'GET',/^\/api\/tasks\/?$/),a=lastReq(ctx,'GET',/^\/api\/tasks\/1$/),b=lastReq(ctx,'GET',/^\/api\/tasks\/999$/);return l&&l.status===200&&Array.isArray(l.json)&&l.json.length>=1&&a&&a.status===200&&b&&b.status===404}},
  {t:'PATCH marks a task done; DELETE removes it with 204.',req:[{m:'PATCH',u:'/api/tasks/1',body:{done:true}},{m:'DELETE',u:'/api/tasks/1'},{m:'GET',u:'/api/tasks/1'}],hint:"update(): $task->update($request->validate(['done' => 'boolean'])); return $task;   destroy(): $task->delete(); return response()->noContent();",c:ctx=>{const p=lastReq(ctx,'PATCH',/^\/api\/tasks\/1$/),d=lastReq(ctx,'DELETE',/^\/api\/tasks\/1$/);const g=(ctx.reqs||[]).filter(r=>r.m==='GET'&&/^\/api\/tasks\/1$/.test(r.u)).pop();return p&&p.status===200&&p.json&&p.json.done===true&&d&&d.status===204&&g&&g.status===404&&(ctx.reqs||[]).lastIndexOf(g)>(ctx.reqs||[]).lastIndexOf(d)}},
  {t:'A client sends a POST with an invalid email field. Which status should the API return?',o:['200 with an error message','422 Unprocessable Content with field errors','500','404'],a:1,e:'4xx means the client must fix the request. 422 with per-field errors is Laravel\'s convention.'},
 ]},
],
quizzes:{php:[
 {q:'What prints "Hi Ada"?',o:["echo 'Hi $name';",'echo "Hi $name";','echo Hi.$name;','print(Hi $name);'],a:1,e:'Only double-quoted strings interpolate variables.'},
 {q:'What does declare(strict_types=1) change?',o:['Nothing','Scalar parameter and return types are enforced instead of silently converted','It enables classes','It makes PHP faster'],a:1,e:'add("2", 3) throws a TypeError instead of converting "2" to 2.'},
 {q:'Which prevents SQL injection in PDO?',o:['addslashes()','Prepared statements with placeholders','htmlspecialchars()','Using MySQL instead of SQLite'],a:1,e:'Placeholders keep values separate from the SQL text.'},
 {q:'composer.lock should be…',o:['Ignored','Committed, so every environment installs the same versions','Deleted after install','Edited by hand'],a:1,e:'composer install reads the lock file for reproducible installs.'},
 {q:'In Laravel, what does $fillable protect against?',o:['XSS','Mass assignment of columns you didn\'t intend users to set','CSRF','Slow queries'],a:1,e:'Only whitelisted attributes can be filled from arrays like $request->all().'},
 {q:'Which status fits a successful DELETE with no response body?',o:['200','201','204','404'],a:2,e:'204 No Content.'},
]},
real:[
 {id:'php-r1',t:'Install PHP 8 and Composer',p:'Install PHP 8.3 and Composer (Windows: Laravel Herd or XAMPP is easiest), then check the versions.',s:'php -v\ncomposer --version'},
 {id:'php-r2',t:'Create a Laravel app',p:'Create a new Laravel project and serve it locally.',s:'composer create-project laravel/laravel blog\ncd blog\nphp artisan serve'},
 {id:'php-r3',t:'Build a CRUD feature in Laravel',p:'Model + migration + controller + Blade views for one resource, with validation.',s:'php artisan make:model Post -mcr\nphp artisan migrate\nphp artisan route:list'},
 {id:'php-r4',t:'Write PHPUnit or Pest tests',p:'Add feature tests for your routes and run them.',s:'php artisan make:test PostTest\nphp artisan test'},
]});
})();
