# Shipwright Dev Academy

A hands-on software engineering academy that runs entirely in your browser. There are 15 tracks and 102 lessons, and every lesson has a sandbox that checks your work as you go. There is no backend and no build step.

| Phase | Tracks |
| --- | --- |
| 1 · Developer tools | Git & GitHub · Docker · Deployment & CI/CD |
| 2 · Building apps | Frontend libraries · Next.js + TypeScript · PHP · Python |
| 3 · Engineering depth | SQL & databases · Testing · Linux & the shell · Web security · Data structures & algorithms · System design · Cloud (AWS + Terraform) · AI integration |

## What's inside

- **Sandboxes that check your work**
  - A Git simulator with a live commit graph and a fake GitHub remote, including pull requests.
  - A simulated Linux terminal and machine: filesystem, pipes, `sudo`, `systemd`, SSH, Nginx, `ufw`, Docker and Compose, Vercel, GitHub Actions, the AWS CLI, Terraform, Redis, `pip`/`venv` and Composer.
  - Real code runners: JavaScript, TypeScript, HTML/CSS, React, Vue, a mini Next.js App Router, Python (Brython), SQL (sql.js) and PHP (a built-in interpreter).
  - A Playwright-style end-to-end test runner and a system design capacity simulator.
- **Quizzes** for every track.
- **Real-world reps**: tasks to do on your own machine and accounts.
- **Study notes**, saved automatically for each finished lesson and exportable as Markdown.
- **Progress tracking**: XP, ranks, a daily streak and per-track progress. Tracks unlock in order.

## Run it locally

The app lives in [`academy/`](academy). Serve that folder with any static server, because some browsers restrict web workers on `file://` URLs.

```bash
cd academy
npx serve .
```

or

```bash
cd academy
python -m http.server 8000
```

Then open http://localhost:8000 (or the URL `serve` prints).

## Publish on GitHub Pages

GitHub Pages can only publish from the repository root (`/`) or a `/docs` folder, so the contents of `academy/` need to be there. For example, move them into `docs/`:

```bash
git mv academy docs
git commit -m "Publish academy from /docs"
git push
```

Then go to **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/docs**, and save. After a minute the site is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

## Progress and backups

On GitHub Pages and locally, progress is saved in that browser's local storage. To move it between browsers or devices, open **Roadmap → Back up or restore progress**, save a backup in one place and restore it in the other. Restoring merges, so nothing you've finished is lost.

The AI integration lessons return clearly labelled offline samples, so the code still runs. In your own projects, call a model API from a server with your own key.

## Project structure

```
academy/
  index.html            # entry point (generated from page.html)
  page.html             # source page
  academy.css           # styles (light + dark themes)
  js/core.js            # tracks, progress, lesson engine, views, notes, backup/restore
  js/sim-git.js         # Git simulator + Git sandbox
  js/sim-ops.js         # Linux/Docker/cloud terminal simulator + terminal sandbox
  js/runners.js         # code runners + code sandbox
  js/php.js             # PHP interpreter (PDO, Composer autoload, mini Laravel)
  js/design.js          # system design simulator
  js/tracks/*.js        # lesson content, one file per track
  tools/build-index.ps1 # regenerates index.html after you edit page.html
shipwright-academy.html # standalone single-file version
```

After editing `page.html`, regenerate `index.html`:

```bash
powershell -ExecutionPolicy Bypass -File academy/tools/build-index.ps1
```

## Adding or changing lessons

Each track file calls `defineTrack({ id, name, lessons, quizzes, real })`. A lesson has a `kind` (`git`, `ops`, `code`, `design` or `none`), a `concept` (HTML), a short `sum`, `keys`, and `tasks`. Each task has a check function `c(ctx)`, a code expression `x`, or multiple-choice options `o` with an answer `a`. Keep lesson ids stable, because progress and notes are keyed by them.
