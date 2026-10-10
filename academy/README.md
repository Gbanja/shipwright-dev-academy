# Shipwright Dev Academy

A hands-on software engineering academy that runs entirely in your browser. There are 15 tracks and 102 lessons, and every lesson has a sandbox that checks your work as you go.

| Phase | Tracks |
| --- | --- |
| 1 · Developer tools | Git & GitHub · Docker · Deployment & CI/CD |
| 2 · Building apps | Frontend libraries · Next.js + TypeScript · PHP · Python |
| 3 · Engineering depth | SQL & databases · Testing · Linux & the shell · Web security · Data structures & algorithms · System design · Cloud (AWS + Terraform) · AI integration |

## What's inside

- **Sandboxes that check your work**
  - A Git simulator with a live commit graph and a fake GitHub remote, including pull requests.
  - A simulated Linux terminal and machine: filesystem, pipes, `sudo`, `systemd`, SSH, Nginx, `ufw`, Docker and Compose, Vercel, GitHub Actions, the AWS CLI, Terraform, Redis, `pip`/`venv` and Composer.
  - Real code runners:
    - JavaScript, in a Web Worker with a time limit.
    - TypeScript, using the real compiler.
    - HTML and CSS, React, Vue and a mini Next.js App Router, all with a live preview.
    - Python through Brython, with FastAPI, pytest and `requests` shims.
    - SQL on SQLite (sql.js).
    - PHP through a small built-in interpreter, with PDO, Composer autoloading and a mini Laravel.
  - A Playwright-style end-to-end test runner.
  - A system design capacity simulator.
- **Quizzes** for every track.
- **Real-world reps**: tasks to do on your own machine and accounts.
- **Study notes**, saved automatically for each finished lesson. A note holds the summary, key commands and everything you typed. The last 5 versions are kept and can be exported as Markdown.
- **Progress tracking**: XP, ranks, a daily streak and per-track progress. Tracks unlock in order, and locked tracks can be previewed.

## Use it

### On GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then **main** and **/ (root)**, and save.
3. After a minute your academy is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

### Locally

Serve the folder with any static server. Some browsers restrict web workers on `file://` URLs.

```bash
npx serve .
```

or

```bash
python -m http.server 8000
```

Then open http://localhost:8000 (or the URL `serve` prints).

## Progress between Claude and GitHub Pages

Progress is stored where you use the academy. In Claude it's saved to your Claude account; on GitHub Pages it's saved in that browser's local storage. To move it, open **Roadmap → Back up or restore progress**, copy or save a backup in one place, and restore it in the other. Restoring merges, so nothing you've finished is lost.

The AI integration lessons call a real model when the page runs inside Claude. Elsewhere they return clearly labelled offline samples, so the code still runs. In your own projects, call the API from a server with your own key.

## Project structure

```
index.html            # GitHub Pages / local entry point (generated from page.html)
page.html             # Claude artifact entry point
academy.css           # styles (light + dark themes)
js/core.js            # tracks, progress, lesson engine, views, notes, backup/restore
js/sim-git.js         # Git simulator + Git sandbox
js/sim-ops.js         # Linux/Docker/cloud terminal simulator + terminal sandbox
js/runners.js         # code runners + code sandbox (JS, TS, web, React, Next, Python, SQL, PHP, E2E, AI)
js/php.js             # PHP interpreter (PDO, Composer autoload, mini Laravel)
js/design.js          # system design simulator
js/tracks/*.js        # lesson content, one file per track
tools/build-index.ps1 # regenerates index.html after you edit page.html
```

After editing `page.html`, regenerate `index.html`:

```bash
powershell -ExecutionPolicy Bypass -File tools/build-index.ps1
```

## Adding or changing lessons

Each track file calls `defineTrack({ id, name, lessons, quizzes, real })`. A lesson has a `kind` (`git`, `ops`, `code`, `design` or `none`), a `concept` (HTML), a short `sum`, `keys`, and `tasks`. Each task has a check function `c(ctx)`, a code expression `x`, or multiple-choice options `o` with an answer `a`. Keep lesson ids stable, because progress and notes are keyed by them.
