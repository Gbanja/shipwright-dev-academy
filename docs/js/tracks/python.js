/* Track 7: Python */
(()=>{
const O=()=>OPS.st,H=re=>OPS.Hx(re),F=p=>OPS.file(p)||'';
const Y1_START=`# 1. Return a greeting like "Hello, Ada!" using an f-string
def greet(name):
    pass

# 2. Squares of the even numbers in nums, using a list comprehension
nums = [1, 2, 3, 4, 5, 6]
even_squares = []

# 3. Count how often each word appears, e.g. {"the": 2, "cat": 1, ...}
def count_words(text):
    pass

# 4. Return the name of the player with the highest score
players = [
    {"name": "Ada", "score": 92},
    {"name": "Alan", "score": 87},
    {"name": "Grace", "score": 95},
]

def top_scorer(players):
    pass

print(greet("Ada"))
`;
const Y1_SOL=`def greet(name):
    return f"Hello, {name}!"

nums = [1, 2, 3, 4, 5, 6]
even_squares = [n * n for n in nums if n % 2 == 0]

def count_words(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts

players = [
    {"name": "Ada", "score": 92},
    {"name": "Alan", "score": 87},
    {"name": "Grace", "score": 95},
]

def top_scorer(players):
    best = max(players, key=lambda p: p["score"])
    return best["name"]

print(greet("Ada"))
print(even_squares)
print(count_words("the cat and the hat"))
print(top_scorer(players))
`;
const WEATHER_PY=`import requests

resp = requests.get("https://api.example.com/weather", params={"city": "Lagos"}, timeout=5)
resp.raise_for_status()
data = resp.json()
print(f"{data['city']}: {data['temp_c']}°C, {data['conditions']}")
`;
const CONTACTS='name,email,city\nAda Lovelace,ada@example.com,London\nGrace Hopper,grace@example.com,New York\nAlan Turing,alan@example.com,Wilmslow\n';
const Y3_START=`import csv
import json
import requests

# 1. load_contacts(path): read the CSV into a list of dicts (csv.DictReader)

# 2. Save the contacts to contacts.json (json.dump)

# 3. fetch_user(user_id): GET https://api.example.com/users/{id}; return None for a 404

# 4. safe_get(url): return the JSON, or {"error": "timeout"} if the request times out
`;
const Y3_SOL=`import csv
import json
import requests

def load_contacts(path):
    with open(path, newline="") as f:
        return list(csv.DictReader(f))

contacts = load_contacts("contacts.csv")
print(len(contacts), "contacts")

with open("contacts.json", "w") as f:
    json.dump(contacts, f, indent=2)

def fetch_user(user_id):
    resp = requests.get(f"https://api.example.com/users/{user_id}", timeout=5)
    if resp.status_code == 404:
        return None
    resp.raise_for_status()
    return resp.json()

print(fetch_user(1)["name"])
print(fetch_user(99))

def safe_get(url):
    try:
        resp = requests.get(url, timeout=2)
        resp.raise_for_status()
        return resp.json()
    except requests.exceptions.Timeout:
        return {"error": "timeout"}

print(safe_get("https://api.example.com/slow"))
`;
const Y4_START=`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

items = {1: {"id": 1, "name": "Keyboard", "price": 49.0, "in_stock": True}}

@app.get("/")
def home():
    return {"message": "TODO"}
`;
const Y4_SOL=`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    in_stock: bool = True

items = {1: {"id": 1, "name": "Keyboard", "price": 49.0, "in_stock": True}}

@app.get("/")
def home():
    return {"message": "Hello from FastAPI"}

@app.get("/items/{item_id}")
def get_item(item_id: int):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]

@app.post("/items", status_code=201)
def create_item(item: Item):
    new_id = max(items) + 1
    items[new_id] = {"id": new_id, **item.model_dump()}
    return items[new_id]

@app.get("/search")
def search(q: str = "", max_price: float = 1000):
    return [i for i in items.values() if q.lower() in i["name"].lower() and i["price"] <= max_price]
`;
const Y5_START=`def apply_discount(price, percent):
    """Return the price after a percentage discount, rounded to cents."""
    if percent < 0 or percent > 100:
        raise ValueError("percent must be between 0 and 100")
    return round(price * (1 - percent / 100), 2)


# pytest collects every function named test_* and runs it
def test_ten_percent():
    assert apply_discount(100, 10) == 90
`;
const Y5_SOL=`import pytest

def apply_discount(price, percent):
    """Return the price after a percentage discount, rounded to cents."""
    if percent < 0 or percent > 100:
        raise ValueError("percent must be between 0 and 100")
    return round(price * (1 - percent / 100), 2)


def test_ten_percent():
    assert apply_discount(100, 10) == 90

def test_no_discount():
    assert apply_discount(50, 0) == 50

def test_rounds_to_cents():
    assert apply_discount(19.99, 15) == 16.99

@pytest.mark.parametrize("price,percent,expected", [
    (200, 50, 100),
    (80, 25, 60),
    (10, 100, 0),
])
def test_many_cases(price, percent, expected):
    assert apply_discount(price, percent) == expected

def test_rejects_bad_percent():
    with pytest.raises(ValueError):
        apply_discount(100, 150)

@pytest.fixture
def cart():
    return [{"price": 10.0, "qty": 2}, {"price": 5.5, "qty": 1}]

def cart_total(items):
    return round(sum(i["price"] * i["qty"] for i in items), 2)

def test_cart_total(cart):
    assert cart_total(cart) == 25.5
`;
const Y6_FS={'downloads/IMG_2041.jpg':'(jpeg)','downloads/IMG_2042.JPG':'(jpeg)','downloads/photo.png':'(png)','downloads/report-q3.pdf':'(pdf)','downloads/budget.xlsx':'(xlsx)','downloads/notes.txt':'meeting notes','downloads/song.mp3':'(mp3)','downloads/setup.zip':'(zip)'};
const Y6_START=`import os
import shutil

# Sort everything in downloads/ into sub-folders by type:
#   images/ (.jpg .jpeg .png .gif), documents/ (.pdf .docx .xlsx .txt),
#   audio/ (.mp3 .wav), other/ (anything else)
# Then write report.txt with one line per folder, e.g. "images: 3"

print(os.listdir("downloads"))
`;
const Y6_SOL=`import os
import shutil
from datetime import date

CATEGORIES = {
    "images": [".jpg", ".jpeg", ".png", ".gif"],
    "documents": [".pdf", ".docx", ".xlsx", ".txt"],
    "audio": [".mp3", ".wav"],
}

def category_for(filename):
    ext = os.path.splitext(filename)[1].lower()
    for folder, extensions in CATEGORIES.items():
        if ext in extensions:
            return folder
    return "other"

def organize(folder):
    moved = {}
    for name in os.listdir(folder):
        path = os.path.join(folder, name)
        if os.path.isdir(path):
            continue  # already-sorted folders are skipped, so re-running is safe
        target = category_for(name)
        os.makedirs(os.path.join(folder, target), exist_ok=True)
        shutil.move(path, os.path.join(folder, target, name))
        moved[target] = moved.get(target, 0) + 1
    return moved

summary = organize("downloads")

with open("report.txt", "w") as f:
    f.write(f"Organized on {date.today()}\\n")
    for folder, count in sorted(summary.items()):
        f.write(f"{folder}: {count}\\n")

print(open("report.txt").read())
`;
defineTrack({id:'python',name:'Python',weeks:'3–4 weeks',
lessons:[
{id:'y1',lvl:'Language',title:'Syntax, lists, dicts & comprehensions',kind:'code',lang:'py',starter:Y1_START,
 sum:'Python uses indentation instead of braces. f-strings format text (f"Hello, {name}!"), lists hold ordered items, dicts map keys to values (counts.get(word, 0) + 1 is the counting idiom), and comprehensions build lists in one readable line ([n * n for n in nums if n % 2 == 0]). max(items, key=lambda p: p["score"]) finds the best item by a field.',
 keys:['f"Hello, {name}!"','[x * x for x in xs if cond]','d.get(key, 0)','for k, v in d.items()','max(xs, key=lambda x: ...)','indentation = blocks'],
 concept:`<p>Python is known for readability: indentation defines blocks, and the core data structures are built in.</p>
<div class="tbl-wrap"><table><tr><th>Type</th><th>Example</th><th>Use for</th></tr>
<tr><td>list</td><td><code>[1, 2, 3]</code></td><td>Ordered, changeable collections</td></tr>
<tr><td>tuple</td><td><code>(51.5, -0.12)</code></td><td>Fixed groups of values</td></tr>
<tr><td>dict</td><td><code>{"name": "Ada"}</code></td><td>Key → value lookups</td></tr>
<tr><td>set</td><td><code>{"a", "b"}</code></td><td>Unique items, fast membership tests</td></tr></table></div>
<pre class="snip" style="margin-bottom:12px">even_squares = [n * n for n in nums if n % 2 == 0]   # comprehension
counts[word] = counts.get(word, 0) + 1                # counting idiom
best = max(players, key=lambda p: p["score"])         # best by a field</pre>
<p>This editor runs real Python 3 in your browser (via Brython), standard library included.</p>`,
 tasks:[
  {t:'greet("Ada") returns "Hello, Ada!" using an f-string.',sol:Y1_SOL,showSol:false,hint:'return f"Hello, {name}!"',x:'greet("Ada") == "Hello, Ada!"',c:ctx=>/f["']/.test(ctx.code)},
  {t:'Build even_squares with a list comprehension: [4, 16, 36].',hint:'even_squares = [n * n for n in nums if n % 2 == 0]',x:'even_squares == [4, 16, 36]',c:ctx=>/\[[^\]]+\bfor\b[^\]]+\bin\b[^\]]+\]/.test(ctx.code)},
  {t:'count_words("the cat and the hat") returns {"the": 2, "cat": 1, "and": 1, "hat": 1}.',hint:'for word in text.lower().split(): counts[word] = counts.get(word, 0) + 1',x:'count_words("the cat and the hat") == {"the": 2, "cat": 1, "and": 1, "hat": 1}'},
  {t:'top_scorer(players) returns "Grace".',hint:'return max(players, key=lambda p: p["score"])["name"]',x:'top_scorer(players) == "Grace"'},
  {t:'You need to check quickly whether an email is in a list of 1 million emails, many times. Best structure?',o:['list','tuple','set','string'],a:2,e:'Membership tests on a set are O(1) on average; on a list they are O(n).'},
 ]},
{id:'y2',lvl:'Tooling',title:'Virtual environments & pip',kind:'ops',
 setup:o=>{o.mkdirp('/home/you/weather');o.H().cwd='/home/you/weather';o.write('weather.py',WEATHER_PY)},
 intro:'You are in ~/weather, a small script that needs the requests library. Install it the right way.',
 sum:'Never install packages into the system Python. Create a virtual environment per project (python3 -m venv .venv), activate it (source .venv/bin/activate, or .venv\\Scripts\\activate on Windows), then pip install inside it. Record exact versions with pip freeze > requirements.txt so others can recreate it with pip install -r requirements.txt. Add .venv/ to .gitignore.',
 keys:['python3 -m venv .venv','source .venv/bin/activate','pip install requests','pip freeze > requirements.txt','pip install -r requirements.txt','deactivate'],
 concept:`<p>Different projects need different package versions. A <b>virtual environment</b> is a private folder of packages for one project, so projects never fight over versions.</p>
<pre class="snip" style="margin-bottom:12px">python3 -m venv .venv            # create (once per project)
source .venv/bin/activate        # activate (macOS/Linux)
.venv\\Scripts\\activate           # activate (Windows)
pip install requests             # installs into .venv only
pip freeze > requirements.txt    # record exact versions
deactivate                       # leave the venv</pre>
<p>Modern Linux distributions refuse <code>pip install</code> into the system Python ("externally-managed-environment"). That's a guard rail telling you to use a venv. You'll see it first.</p>
<div class="tip"><b>Newer tools</b>uv and Poetry automate all of this (and uv is very fast). The concepts are the same: an isolated environment plus a lock of exact versions.</div>`,
 tasks:[
  {t:'Check your Python version.',h:'python3 --version',c:()=>H(/^python3 (--version|-V)/)},
  {t:'Try installing requests globally and read the error.',h:'pip install requests',c:()=>H(/^pip3? install requests/)},
  {t:'Create a virtual environment in .venv and activate it.',h:'python3 -m venv .venv\nsource .venv/bin/activate',c:()=>O().py.active&&!!O().flags.venvMade},
  {t:'Install requests inside the venv.',h:'pip install requests',c:()=>!!O().py.pkgs.requests&&O().py.active},
  {t:'Run the script.',h:'python3 weather.py',c:()=>/Lagos: 31°C/.test(O().lastOut||'')},
  {t:'Record the exact versions in requirements.txt.',h:'pip freeze > requirements.txt\ncat requirements.txt',c:()=>/requests==/.test(F('/home/you/weather/requirements.txt'))},
  {t:'Why a venv per project?',o:['It makes Python faster','Each project gets its own package versions without breaking others or the system','pip only works in venvs on Windows','It encrypts packages'],a:1,e:'Isolation plus requirements.txt makes the project reproducible on any machine.'},
 ]},
{id:'y3',lvl:'Language',title:'Files, JSON & calling APIs',kind:'code',lang:'py',fs:{'contacts.csv':CONTACTS},starter:Y3_START,
 sum:'Open files with a with block so they close automatically. csv.DictReader turns each CSV row into a dict; json.dump and json.load write and read JSON. requests.get(url, params=..., timeout=...) calls web APIs; check resp.status_code or call resp.raise_for_status(), read resp.json(), and always set a timeout and handle requests.exceptions.Timeout.',
 keys:['with open(path) as f:','csv.DictReader(f)','json.dump(data, f, indent=2)','requests.get(url, timeout=5)','resp.raise_for_status()','except requests.exceptions.Timeout'],
 concept:`<p>Most automation and backend work is reading data, transforming it, writing it out, and calling other services.</p>
<pre class="snip" style="margin-bottom:12px">with open("contacts.csv", newline="") as f:      # closes automatically
    rows = list(csv.DictReader(f))               # [{"name": ..., "email": ...}, ...]

with open("contacts.json", "w") as f:
    json.dump(rows, f, indent=2)

resp = requests.get("https://api.example.com/users/1", timeout=5)
resp.raise_for_status()                          # raise on 4xx/5xx
user = resp.json()</pre>
<div class="tip"><b>Always set a timeout</b>Without one, a slow server can hang your program forever. In this sandbox, <code>https://api.example.com/slow</code> always times out, so you can test that path.</div>
<p>This lesson has a virtual disk (shown below the output) with <code>contacts.csv</code>.</p>`,
 tasks:[
  {t:'load_contacts("contacts.csv") returns 3 dicts (use csv.DictReader).',sol:Y3_SOL,showSol:false,hint:'with open(path, newline="") as f: return list(csv.DictReader(f))',x:'len(load_contacts("contacts.csv")) == 3 and load_contacts("contacts.csv")[1]["email"] == "grace@example.com"'},
  {t:'Write the contacts to contacts.json with json.dump.',hint:'with open("contacts.json", "w") as f: json.dump(contacts, f, indent=2)',c:ctx=>{try{return JSON.parse((ctx.fs||{})['contacts.json']).length===3}catch(e){return false}}},
  {t:'fetch_user(1) returns Ada; fetch_user(99) returns None (the API returns 404).',hint:'resp = requests.get(f"https://api.example.com/users/{user_id}", timeout=5); if resp.status_code == 404: return None',x:'fetch_user(1)["name"] == "Ada Lovelace" and fetch_user(99) is None'},
  {t:'safe_get() returns {"error": "timeout"} for https://api.example.com/slow.',hint:'try: ... except requests.exceptions.Timeout: return {"error": "timeout"}',x:'safe_get("https://api.example.com/slow") == {"error": "timeout"}'},
  {t:'Why use with open(...) as f?',o:['It reads faster','The file is closed automatically, even if an error happens','It\'s required for CSV','It creates the file'],a:1,e:'Context managers guarantee cleanup.'},
 ]},
{id:'y4',lvl:'Web',title:'FastAPI web services',kind:'code',lang:'py',api:'py',apiStart:'/items/1',starter:Y4_START,
 sum:'FastAPI builds APIs from typed Python functions: decorate them with @app.get / @app.post and a path. Path parameters ({item_id}) and query parameters come from the function signature and are converted and validated by type, so a non-integer id returns 422 automatically. Request bodies are Pydantic models. Raise HTTPException(status_code=404) for errors and set status_code=201 for creation.',
 keys:['app = FastAPI()','@app.get("/items/{item_id}")','def get_item(item_id: int)','class Item(BaseModel)','@app.post("/items", status_code=201)','raise HTTPException(404, ...)','TestClient(app)'],
 concept:`<p><b>FastAPI</b> is the fastest-growing Python web framework. Type hints do the work: they validate input, convert types, and generate API docs.</p>
<pre class="snip" style="margin-bottom:12px">class Item(BaseModel):            # request body schema (Pydantic)
    name: str
    price: float

@app.get("/items/{item_id}")
def get_item(item_id: int):       # "/items/abc" → 422 automatically
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return items[item_id]         # dicts become JSON

@app.post("/items", status_code=201)
def create_item(item: Item): ...</pre>
<p>Real FastAPI runs on a server with <code>uvicorn main:app --reload</code> and gives you interactive docs at <code>/docs</code>. Here, requests go through FastAPI's <code>TestClient</code> pattern; use the request panel to try your endpoints.</p>`,
 tasks:[
  {t:'GET / returns {"message": "Hello from FastAPI"}.',sol:Y4_SOL,showSol:false,hint:'return {"message": "Hello from FastAPI"}',x:'_TC(app).get("/").json()["message"] == "Hello from FastAPI"'},
  {t:'GET /items/{item_id} with item_id: int: 200 for 1, 404 for a missing id, 422 for "abc".',hint:'@app.get("/items/{item_id}")\ndef get_item(item_id: int): ... raise HTTPException(status_code=404, detail="Item not found")',x:'_TC(app).get("/items/1").json()["name"] == "Keyboard" and _TC(app).get("/items/42").status_code == 404 and _TC(app).get("/items/abc").status_code == 422'},
  {t:'POST /items with a Pydantic Item model returns 201; a non-numeric price returns 422.',hint:'class Item(BaseModel): name: str; price: float   …   @app.post("/items", status_code=201)',x:'(lambda r: r.status_code == 201 and r.json()["name"] == "Mouse")(_TC(app).post("/items", json={"name": "Mouse", "price": 19.5})) and _TC(app).post("/items", json={"name": "X", "price": "cheap"}).status_code == 422'},
  {t:'GET /search?q=key returns matching items, using query parameters with defaults.',hint:'@app.get("/search")\ndef search(q: str = "", max_price: float = 1000): ...',x:'[i["name"] for i in _TC(app).get("/search?q=key").json()] == ["Keyboard"]'},
  {t:'Why does /items/abc return 422 without any code from you?',o:['FastAPI guesses','The item_id: int type hint is used to validate and convert the path parameter','Python can\'t parse it','The browser blocks it'],a:1,e:'Type hints drive validation. That\'s FastAPI\'s main idea.'},
 ]},
{id:'y5',lvl:'Quality',title:'Testing with pytest',kind:'code',lang:'py',pytest:true,starter:Y5_START,
 sum:'pytest finds functions named test_* and runs them; a plain assert is all you need, and pytest reports the values when it fails. @pytest.mark.parametrize runs one test over many inputs, pytest.raises(ValueError) checks that errors are raised, and fixtures (@pytest.fixture) provide reusable test data by parameter name. Test edge cases (zero, maximum, invalid input), not just the happy path.',
 keys:['def test_something():','assert result == expected','@pytest.mark.parametrize','with pytest.raises(ValueError):','@pytest.fixture','edge cases'],
 concept:`<p><b>pytest</b> is the standard Python test runner. Tests are plain functions with <code>assert</code>:</p>
<pre class="snip" style="margin-bottom:12px">@pytest.mark.parametrize("price,percent,expected", [
    (200, 50, 100),
    (10, 100, 0),
])
def test_many_cases(price, percent, expected):
    assert apply_discount(price, percent) == expected

def test_rejects_bad_percent():
    with pytest.raises(ValueError):
        apply_discount(100, 150)

@pytest.fixture
def cart():                                # injected by parameter name
    return [{"price": 10.0, "qty": 2}]

def test_cart_total(cart): ...</pre>
<p>Run your code and the results appear like <code>pytest</code> output.</p>`,
 tasks:[
  {t:'Write at least three passing tests, including one for rounding to cents.',sol:Y5_SOL,showSol:false,hint:'def test_rounds_to_cents(): assert apply_discount(19.99, 15) == 16.99',c:ctx=>ctx.tests&&ctx.tests.filter(t=>t.ok).length>=3&&ctx.tests.some(t=>t.ok&&/round/i.test(t.name))},
  {t:'Use @pytest.mark.parametrize to test three cases in one test.',hint:'@pytest.mark.parametrize("price,percent,expected", [(200, 50, 100), (80, 25, 60), (10, 100, 0)])',c:ctx=>ctx.tests&&ctx.tests.filter(t=>t.ok&&/\[/.test(t.name)).length>=3},
  {t:'Test that a percent over 100 raises ValueError.',hint:'with pytest.raises(ValueError): apply_discount(100, 150)',c:ctx=>ctx.tests&&ctx.tests.some(t=>t.ok&&/raise|reject|invalid|bad/i.test(t.name))&&/pytest\.raises/.test(ctx.code)},
  {t:'Use a fixture to provide a cart to a test.',hint:'@pytest.fixture\ndef cart(): return [...]\n\ndef test_cart_total(cart): assert cart_total(cart) == 25.5',c:ctx=>ctx.tests&&ctx.tests.some(t=>t.ok&&/cart/i.test(t.name))&&/@pytest\.fixture/.test(ctx.code)&&ctx.tests.every(t=>t.ok)},
  {t:'Which test adds the most value for apply_discount?',o:['Testing 10% twice','Testing the boundaries: 0%, 100% and invalid values like 150%','Testing that Python can multiply','Testing the docstring'],a:1,e:'Bugs cluster at edges. Boundary and invalid-input tests catch them.'},
 ]},
{id:'y6',lvl:'Automation',title:'Automation & scripting',kind:'code',lang:'py',fs:Y6_FS,starter:Y6_START,
 sum:'Automation scripts turn repetitive chores into one command. Use os.listdir to scan folders, os.path.splitext(name)[1].lower() to get extensions, os.makedirs(path, exist_ok=True) to create folders, and shutil.move to move files. Design scripts to be safe to re-run (idempotent): skip work that is already done, and write a summary report of what changed.',
 keys:['os.listdir(folder)','os.path.splitext(name)','os.makedirs(path, exist_ok=True)','shutil.move(src, dst)','idempotent scripts','write a report'],
 concept:`<p>Python's superpower for everyday developers: scripts that clean up files, rename things, process spreadsheets or call APIs on a schedule.</p>
<pre class="snip" style="margin-bottom:12px">for name in os.listdir("downloads"):
    ext = os.path.splitext(name)[1].lower()        # ".JPG" → ".jpg"
    target = "images" if ext in [".jpg", ".png"] else "other"
    os.makedirs(os.path.join("downloads", target), exist_ok=True)
    shutil.move(os.path.join("downloads", name),
                os.path.join("downloads", target, name))</pre>
<div class="tip"><b>Safe to re-run</b>Good scripts are <b>idempotent</b>: running them twice does no harm. Skip folders you already created, and consider a <code>--dry-run</code> mode that only prints what would happen.</div>
<p>The virtual disk below shows a messy <code>downloads/</code> folder. Organize it.</p>`,
 tasks:[
  {t:'Write category_for(filename) that maps extensions to folders (case-insensitive).',sol:Y6_SOL,showSol:false,hint:'ext = os.path.splitext(filename)[1].lower(); look it up in a dict of categories; default "other"',x:'category_for("IMG_1.JPG") == "images" and category_for("a.pdf") == "documents" and category_for("x.zip") == "other"'},
  {t:'Move every file in downloads/ into images/, documents/, audio/ or other/.',hint:'for name in os.listdir("downloads"): … os.makedirs(...exist_ok=True); shutil.move(...)',c:ctx=>{const fs=ctx.fs||{};const ks=Object.keys(fs);return !!fs['downloads/images/IMG_2042.JPG']&&!!fs['downloads/documents/report-q3.pdf']&&!!fs['downloads/audio/song.mp3']&&!!fs['downloads/other/setup.zip']&&!ks.some(k=>/^downloads\/[^/]+$/.test(k))}},
  {t:'Write report.txt with a count per folder (images: 3, documents: 3, audio: 1, other: 1).',hint:'for folder, count in sorted(summary.items()): f.write(f"{folder}: {count}\\n")',c:ctx=>{const r=(ctx.fs||{})['report.txt']||'';return /images: 3/.test(r)&&/documents: 3/.test(r)&&/audio: 1/.test(r)&&/other: 1/.test(r)}},
  {t:'Run the script a second time. It should not crash or move anything wrongly.',c:ctx=>!ctx.err&&!!(ctx.fs||{})['downloads/images/IMG_2041.jpg']&&BENCH.code.runs>=2},
  {t:'What makes an automation script safe to schedule?',o:['Running as root','Being idempotent and logging what it changed','Using global variables','Never handling errors'],a:1,e:'Scheduled jobs run unattended. Safe re-runs and clear logs are what make them trustworthy.'},
 ]},
],
quizzes:{python:[
 {q:'What does [x * 2 for x in range(3)] produce?',o:['[0, 2, 4]','[2, 4, 6]','(0, 2, 4)','6'],a:0,e:'range(3) is 0, 1, 2.'},
 {q:'pip install fails with "externally-managed-environment". What should you do?',o:['Use sudo pip install','Create and activate a virtual environment, then install','Delete Python','Ignore it'],a:1,e:'Isolate project packages in a venv.'},
 {q:'Why always pass timeout= to requests.get?',o:['It\'s required syntax','Otherwise a slow server can hang your program indefinitely','It makes requests faster','It retries automatically'],a:1,e:'requests has no default timeout.'},
 {q:'In FastAPI, def read(item_id: int) receives "/items/abc". Result?',o:['500 error','422 validation error','item_id = "abc"','404'],a:1,e:'The type hint validates the path parameter.'},
 {q:'How does pytest discover tests?',o:['A config file listing them','Functions named test_* in files named test_*.py','Classes extending TestCase only','Decorators only'],a:1,e:'Naming conventions are all you need.'},
 {q:'os.makedirs(path, exist_ok=True) does what if the folder exists?',o:['Raises an error','Nothing; it succeeds quietly','Deletes it','Renames it'],a:1,e:'That\'s what makes it idempotent.'},
]},
real:[
 {id:'py-r1',t:'Install Python 3.12+ and set up a project venv',p:'Install Python from python.org (tick "Add to PATH" on Windows), then create a project with its own venv.',s:'python --version\npython -m venv .venv\n.venv\\Scripts\\activate   # Windows\nsource .venv/bin/activate  # macOS/Linux'},
 {id:'py-r2',t:'Run a real FastAPI server',p:'Build the items API from the lesson and open the auto-generated docs at /docs.',s:'pip install "fastapi[standard]"\nfastapi dev main.py\n# open http://127.0.0.1:8000/docs'},
 {id:'py-r3',t:'Write and run a pytest suite',p:'Add tests to one of your Python projects and run them with coverage.',s:'pip install pytest pytest-cov\npytest -v --cov'},
 {id:'py-r4',t:'Automate a real chore',p:'Write a script that cleans up your own Downloads folder or renames photos by date, with a dry-run mode first.',s:'python organize.py --dry-run\npython organize.py'},
]});
})();
