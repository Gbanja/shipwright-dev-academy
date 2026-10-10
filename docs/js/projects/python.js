/* Projects: Python */
(()=>{
const CSV=`date,category,amount
2026-10-01,food,12.50
2026-10-02,transport,3.20
2026-10-02,food,8.75
2026-10-03,rent,450
2026-10-04,food,abc
2026-10-05,transport,15.00
2026-10-06,fun,22.40
`;
const LOAD=`import csv
import json


def parse_amount(text):
    """Return text as a float, or None if it is not a valid amount."""
    text = text.strip()
    if text.replace(".", "", 1).isdigit():
        return float(text)
    return None


def load_expenses(path):
    expenses = []
    with open(path, newline="") as f:
        for line_no, row in enumerate(csv.DictReader(f), start=2):
            amount = parse_amount(row["amount"])
            if amount is None:
                print(f"Skipping line {line_no}: bad amount {row['amount']!r}")
                continue
            row["amount"] = amount
            expenses.append(row)
    return expenses
`;
const TOTALS=`

def total_by_category(expenses):
    totals = {}
    for e in expenses:
        totals[e["category"]] = totals.get(e["category"], 0) + e["amount"]
    return {cat: round(amount, 2) for cat, amount in totals.items()}
`;
const TOP=`

def top_category(totals):
    if not totals:
        return None
    return max(totals, key=totals.get)
`;
const REPORT=`

def write_report(expenses, path):
    totals = total_by_category(expenses)
    report = {
        "total": round(sum(e["amount"] for e in expenses), 2),
        "by_category": totals,
        "top": top_category(totals),
    }
    with open(path, "w") as f:
        json.dump(report, f, indent=2)


expenses = load_expenses("expenses.csv")
write_report(expenses, "report.json")
print(f"Wrote report for {len(expenses)} expenses")
`;
const TESTS=`

def test_totals_add_up_per_category():
    rows = [{"category": "food", "amount": 2.5}, {"category": "food", "amount": 1.25}]
    assert total_by_category(rows) == {"food": 3.75}


def test_totals_of_empty_list_is_empty():
    assert total_by_category([]) == {}


def test_top_category_of_empty_totals_is_none():
    assert top_category({}) is None


def test_bad_rows_are_skipped():
    assert len(load_expenses("expenses.csv")) == 6
`;
const G_START=`# expenses.csv is in the virtual disk (see the Files panel).
# Build the tracker step by step.
`;

const API_START=`from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()

# Build the bookmarks API described in the brief, then test it.
`;
const API_REF=`from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from pydantic import BaseModel

app = FastAPI()


class BookmarkIn(BaseModel):
    url: str
    title: str
    tags: list = []


bookmarks = {}
next_id = 1


@app.get("/bookmarks")
def list_bookmarks(tag: str = ""):
    items = list(bookmarks.values())
    if tag:
        items = [b for b in items if tag in b["tags"]]
    return items


@app.post("/bookmarks", status_code=201)
def create_bookmark(data: BookmarkIn):
    global next_id
    if any(b["url"] == data.url for b in bookmarks.values()):
        raise HTTPException(status_code=409, detail="Bookmark already exists")
    bookmark = {"id": next_id, "url": data.url, "title": data.title, "tags": data.tags}
    bookmarks[next_id] = bookmark
    next_id += 1
    return bookmark


@app.get("/bookmarks/{bookmark_id}")
def get_bookmark(bookmark_id: int):
    if bookmark_id not in bookmarks:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    return bookmarks[bookmark_id]


@app.delete("/bookmarks/{bookmark_id}", status_code=204)
def delete_bookmark(bookmark_id: int):
    if bookmark_id not in bookmarks:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    del bookmarks[bookmark_id]


client = TestClient(app)


def test_create_returns_201_with_id():
    r = client.post("/bookmarks", json={"url": "https://test-1.dev", "title": "One"})
    assert r.status_code == 201
    assert r.json()["id"] > 0


def test_duplicate_url_is_rejected():
    client.post("/bookmarks", json={"url": "https://test-2.dev", "title": "Two"})
    r = client.post("/bookmarks", json={"url": "https://test-2.dev", "title": "Two again"})
    assert r.status_code == 409


def test_missing_bookmark_is_404():
    assert client.get("/bookmarks/9999").status_code == 404
`;
const tc='(lambda c: ';

defineProjects('python',{
guided:{title:'Build an expense tracker that handles messy data',kind:'code',lang:'py',pytest:true,fs:{'expenses.csv':CSV},starter:G_START,
 pitch:'Read a CSV that contains a bad row, total it per category, write a JSON report, and pin the behaviour down with pytest.',
 brief:`<p>Your bank exports expenses as a CSV, and like most real data it has a broken row (<code>abc</code> as an amount). You'll write a tracker that survives it, summarizes the data, writes a JSON report, and has tests so you can change it later without fear.</p>
<p>Write everything in one file and press <b>Run</b> after each step. The Files panel shows the virtual disk, including the report you write.</p>
<div class="tip"><b>Goal</b><code>report.json</code> with the total, per-category totals and the top category, plus passing tests that cover the edge cases.</div>`,
 tasks:[
 {t:'Write parse_amount(text) and load_expenses(path): read the CSV, convert amounts to float, and skip bad rows with a warning.',why:'<code>csv.DictReader</code> gives you each row as a dict keyed by the header. Everything in a CSV is a string, so validate it before you convert it. Never let one bad row crash the whole import, but don\'t drop it silently either: print which line you skipped, so someone can fix the source data.',code:LOAD,sol:LOAD,x:'len(load_expenses("expenses.csv")) == 6 and isinstance(load_expenses("expenses.csv")[0]["amount"], float) and parse_amount("abc") is None and parse_amount("12.50") == 12.5'},
 {t:'Write total_by_category(expenses) that returns totals rounded to cents.',why:'<code>dict.get(key, 0)</code> starts each category at zero. Floats can\'t store 0.1 exactly (3.2 + 15.0 may print as 18.200000000000003), so round money for display. Real finance code uses <code>Decimal</code> or integer cents.',code:TOTALS.trim(),sol:LOAD+TOTALS,x:'total_by_category(load_expenses("expenses.csv")) == {"food": 21.25, "transport": 18.2, "rent": 450.0, "fun": 22.4}'},
 {t:'Write top_category(totals) that returns the biggest category, or None when there is no data.',why:'<code>max(d, key=d.get)</code> compares the values and returns the key. Calling <code>max()</code> on an empty dict raises an error, so handle the empty case first and return <code>None</code>.',code:TOP.trim(),sol:LOAD+TOTALS+TOP,x:'top_category({"a": 1, "b": 5}) == "b" and top_category({}) is None'},
 {t:'Write report.json with the overall total, the per-category totals and the top category.',why:'<code>json.dump</code> turns Python dicts into JSON that any other program can read. <code>with open(...)</code> closes the file even if something fails halfway through.',code:REPORT.trim(),sol:LOAD+TOTALS+TOP+REPORT,c:ctx=>{try{const r=JSON.parse((ctx.fs||{})['report.json']);return Math.abs(r.total-511.85)<0.001&&r.top==='rent'&&r.by_category&&r.by_category.food===21.25}catch(e){return false}}},
 {t:'Add pytest tests: normal totals, an empty list, empty totals, and the bad row. All pass.',why:'Test the <b>edges</b>, where bugs live: empty input and malformed rows. Name each test after the behaviour it protects, so a failure tells you what broke.',code:TESTS.trim(),sol:LOAD+TOTALS+TOP+REPORT+TESTS,c:ctx=>ctx.tests&&ctx.tests.length>=3&&ctx.tests.every(t=>t.ok)&&ctx.tests.some(t=>/empty/i.test(t.name))},
 ]},
solo:{title:'Ship a tested bookmarks API with FastAPI',kind:'code',lang:'py',api:'py',apiStart:'/bookmarks',pytest:true,starter:API_START,
 pitch:'Design a small REST API with validation, proper status codes and filtering, then prove it works with pytest and TestClient.',
 brief:`<p>Build a bookmarks service in FastAPI. Keep the data in memory (a dict or list in the module). Use the request panel to try it out as you go.</p>
<p><b>Spec</b></p><ul><li><code>POST /bookmarks</code> takes JSON <code>{"url", "title", "tags"}</code>, where <code>tags</code> is optional and defaults to an empty list. It returns <b>201</b> with the stored bookmark including a numeric <code>id</code>, and <b>422</b> when <code>url</code> or <code>title</code> is missing.</li><li>Posting a URL that is already saved returns <b>409</b>.</li><li><code>GET /bookmarks/{id}</code> returns one bookmark, or <b>404</b>.</li><li><code>GET /bookmarks</code> lists everything, and <code>?tag=python</code> returns only bookmarks with that tag.</li><li><code>DELETE /bookmarks/{id}</code> returns <b>204</b>. Afterwards the bookmark is gone (404).</li><li>IDs are never reused, even after a delete.</li><li>Write at least 3 pytest tests that call the API through <code>TestClient</code>. All tests must pass.</li></ul>`,
 tasks:[
 {t:'POST /bookmarks returns 201 with an id; a missing title returns 422.',x:tc+'(lambda r: r.status_code == 201 and isinstance(r.json().get("id"), int))(c.post("/bookmarks", json={"url": "https://chk-a.dev", "title": "A", "tags": ["x"]})) and c.post("/bookmarks", json={"url": "https://chk-b.dev"}).status_code == 422)(_TC(app))',
  miss:'Either a valid POST didn\'t return 201 with a numeric "id", or a body without "title" wasn\'t rejected with 422. Use a Pydantic model (class BookmarkIn(BaseModel): url: str; title: str; tags: list = []) as the parameter type, and @app.post("/bookmarks", status_code=201). Without status_code=201 FastAPI answers 200.'},
 {t:'A duplicate URL returns 409.',x:tc+'c.post("/bookmarks", json={"url": "https://chk-dup.dev", "title": "D"}).status_code == 201 and c.post("/bookmarks", json={"url": "https://chk-dup.dev", "title": "D2"}).status_code == 409)(_TC(app))',
  miss:'Saving the same URL twice should fail the second time with 409 Conflict. Check the existing bookmarks before you insert, and raise HTTPException(status_code=409, detail="…").'},
 {t:'GET /bookmarks/{id} returns the bookmark or 404.',x:tc+'(lambda b: c.get("/bookmarks/" + str(b["id"])).json()["url"] == "https://chk-get.dev")(c.post("/bookmarks", json={"url": "https://chk-get.dev", "title": "G"}).json()) and c.get("/bookmarks/987654").status_code == 404)(_TC(app))',
  miss:'Fetching a bookmark by id should return it, and an unknown id should return 404. Annotate the path parameter as int (def get_bookmark(bookmark_id: int)), or "3" and 3 won\'t match. Raise HTTPException(status_code=404) when it is missing.'},
 {t:'GET /bookmarks?tag=python filters by tag.',x:tc+'c.post("/bookmarks", json={"url": "https://chk-py.dev", "title": "P", "tags": ["python"]}) and c.post("/bookmarks", json={"url": "https://chk-js.dev", "title": "J", "tags": ["js"]}) and all("python" in b["tags"] for b in c.get("/bookmarks?tag=python").json()) and any(b["url"] == "https://chk-py.dev" for b in c.get("/bookmarks?tag=python").json()) and len(c.get("/bookmarks").json()) > len(c.get("/bookmarks?tag=python").json()))(_TC(app))',
  miss:'?tag=python should return only the bookmarks whose tags include "python", and no tag should return everything. Add an optional query parameter, def list_bookmarks(tag: str = ""), and filter only when it is set.'},
 {t:'DELETE returns 204 and the bookmark is gone afterwards.',x:tc+'(lambda b: c.delete("/bookmarks/" + str(b["id"])).status_code == 204 and c.get("/bookmarks/" + str(b["id"])).status_code == 404)(c.post("/bookmarks", json={"url": "https://chk-del.dev", "title": "X"}).json()))(_TC(app))',
  miss:'DELETE should return 204 No Content (@app.delete(…, status_code=204)), and a GET afterwards should be 404. Make sure you remove it from the same collection your GET reads.'},
 {t:'IDs are never reused after a delete.',x:tc+'(lambda a, b: c.delete("/bookmarks/" + str(a["id"])) and c.post("/bookmarks", json={"url": "https://chk-id3.dev", "title": "3"}).json()["id"] not in (a["id"], b["id"]))(c.post("/bookmarks", json={"url": "https://chk-id1.dev", "title": "1"}).json(), c.post("/bookmarks", json={"url": "https://chk-id2.dev", "title": "2"}).json()))(_TC(app))',
  miss:'After deleting a bookmark, a new one got an id that already exists or existed before. That happens with id = len(bookmarks) + 1: delete one, and the next id collides. Keep a separate counter that only goes up.'},
 {t:'At least 3 pytest tests use TestClient, and all of them pass.',c:ctx=>ctx.tests&&ctx.tests.length>=3&&ctx.tests.every(t=>t.ok)&&/TestClient\(\s*app\s*\)/.test(ctx.code),
  miss:ctx=>{const t=ctx.tests||[];if(!t.length)return 'No tests found. Write functions named test_something() at the top level of the file.';if(t.some(x=>!x.ok))return 'Failing: '+t.filter(x=>!x.ok).map(x=>x.name+(x.err?' ('+x.err.slice(0,80)+')':'')).join('; ');if(t.length<3)return 'Only '+t.length+' test(s). Cover at least the happy path, a validation error and a 404.';return 'Your tests don\'t use TestClient(app). Call the API like a real client would.'}},
 ],
 warn:[
  {c:ctx=>/except\s*:/.test(ctx.code),m:'You used a bare except:. It also catches typos (NameError) and Ctrl+C. Catch the specific exception you expect.'},
  {c:ctx=>/len\(\s*\w+\s*\)\s*\+\s*1/.test(ctx.code),m:'You derive ids from len(...) + 1. That breaks as soon as anything is deleted. Use a counter, or let a database generate ids.'},
  {c:ctx=>(ctx.tests||[]).length>0&&!(ctx.tests||[]).some(t=>/4\d\d|missing|duplicate|invalid|not_found|404|409|422/i.test(t.name)),m:'All your tests cover happy paths. The valuable tests check what happens when things go wrong: 404, 409 and 422.'},
 ],
 ref:API_REF},
});
})();
