# Shipwright Dev Academy

A hands-on software engineering academy that runs entirely in your browser. There are 15 tracks, 114 lessons and 30 projects, and every lesson and project has a sandbox that checks your work as you go. There is no backend and no build step.

| Phase | Tracks |
| --- | --- |
| 1 · Foundations | Linux & the shell · Git & GitHub · Frontend (HTML, CSS, JavaScript, React) |
| 2 · Building apps | Python **or** PHP (choose one) · SQL & databases · Testing · Next.js + TypeScript |
| 3 · Shipping | Docker · Deployment & CI/CD · Web security |
| 4 · Engineering depth | Data structures & algorithms · System design · Cloud (AWS + Terraform) · AI integration |

Tracks open in prerequisite order: each one only uses skills from the tracks before it.

## What's inside

- **Built on learning science**
  - **Prerequisite order**: you learn the terminal before tools that use it, and code before deploying code.
  - **Daily spaced review** (Review tab): every question you meet comes back after 1, 3, 7, 16, 35 and 90 days. Right answers wait longer; wrong ones come back tomorrow. Mixed practice rounds blend topics from a whole phase.
  - **Try first**: hints unlock after your first attempt.
  - **Explain it in your own words** after each lesson, saved to your notes.
  - **A core path**: a few lessons are marked optional, and you pick one backend language.
  - **An early debugging lesson** on reading errors and fixing bugs one at a time.
- **Four levels in every track**: Beginner, Intermediate, Advanced and Pro, ordered from easiest to hardest. Every track starts from zero experience. Each lesson shows where you are on the level ladder, what you'll be able to do at the end of the level, what the lesson builds on, and an "In plain English" explanation before the technical detail. Learners with experience can read the level goals and jump straight to their level.

- **Sandboxes that check your work**
  - A Git simulator with a live commit graph and a fake GitHub remote, including pull requests.
  - A simulated Linux terminal and machine: filesystem, pipes, `sudo`, `systemd`, SSH, Nginx, `ufw`, Docker and Compose, Vercel, GitHub Actions, the AWS CLI, Terraform, Redis, `pip`/`venv` and Composer.
  - Real code runners: JavaScript, TypeScript, HTML/CSS, React, Vue, a mini Next.js App Router, Python (Brython), SQL (sql.js) and PHP (a built-in interpreter).
  - A Playwright-style end-to-end test runner and a system design capacity simulator.
- **Quizzes** for every track.
- **Projects**: every track ends with two capstone projects, 30 in total.
  - A **guided project** walks you through a realistic build one step at a time, with the commands or code to type and why each step matters.
  - A **solo project** gives you a brief and requirements only. You build it in the same sandbox, then press **Submit for review** to get a report: which requirements you met, what went wrong for each one you missed, the commands that errored, and habits to fix. You can then copy a review request to paste into Claude for a written review (inside Claude, the page asks Claude directly) and compare your work with a reference solution.
  - The guided project opens when you finish a track's lessons, and the solo project opens after the guided one.
- **Real-world reps**: tasks to do on your own machine and accounts.
- **Study notes**, saved automatically for each finished lesson and exportable as Markdown.
- **Progress tracking**: XP, ranks, a daily streak and per-track progress. Tracks unlock in order.

## Run it locally

The app lives in [`docs/`](docs). Serve that folder with any static server, because some browsers restrict web workers on `file://` URLs.

```bash
cd docs
npx serve .
```

or

```bash
cd docs
python -m http.server 8000
```

Then open http://localhost:8000 (or the URL `serve` prints).

## Live site

The site is published with GitHub Pages from the `/docs` folder on `main`: https://gbanja.github.io/shipwright-dev-academy/

To publish your own copy, go to **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/docs**, and save.
## Progress and backups

On GitHub Pages and locally, progress is saved in that browser's local storage. To move it between browsers or devices, open **Roadmap → Back up or restore progress**, save a backup in one place and restore it in the other. Restoring merges, so nothing you've finished is lost.

The AI integration lessons return clearly labelled offline samples, so the code still runs. In your own projects, call a model API from a server with your own key.

## Project structure

```
docs/
  index.html            # entry point (generated from page.html)
  page.html             # source page
  academy.css           # styles (light + dark themes)
  js/core.js            # tracks, progress, lesson engine, views, notes, backup/restore
  js/sim-git.js         # Git simulator + Git sandbox
  js/sim-ops.js         # Linux/Docker/cloud terminal simulator + terminal sandbox
  js/runners.js         # code runners + code sandbox
  js/php.js             # PHP interpreter (PDO, Composer autoload, mini Laravel)
  js/design.js          # system design simulator
  js/beginner.js        # beginner lessons that open the tracks that used to start too deep
  js/levels.js          # level order, level goals and plain-English explanations for every lesson
  js/review.js          # spaced review, mixed practice, own-words notes, progress migrations
  js/projects.js        # guided + solo projects: steps, review reports, Projects tab
  js/projects/*.js      # project content, one file per track
  js/tracks/*.js        # lesson content, one file per track
  tools/build-index.ps1 # regenerates index.html after you edit page.html
shipwright-academy.html # standalone single-file version
```

After editing `page.html`, regenerate `index.html`:

```bash
powershell -ExecutionPolicy Bypass -File docs/tools/build-index.ps1
```

## Adding or changing lessons

Each track file calls `defineTrack({ id, name, lessons, quizzes, real })`. A lesson has a `kind` (`git`, `ops`, `code`, `design` or `none`), a `concept` (HTML), a short `sum`, `keys`, and `tasks`. Each task has a check function `c(ctx)`, a code expression `x`, or multiple-choice options `o` with an answer `a`. Keep lesson ids stable, because progress and notes are keyed by them.

## Adding or changing projects

Each file in `docs/js/projects/` calls `defineProjects(trackId, { guided, solo })`. A project uses the same sandbox settings as a lesson (`kind`, `setup`, `lang`, `starter`, `files` and so on), plus a `title`, a one-line `pitch` and a `brief` (HTML).

- **Guided** steps have `t` (the step), `why` (the explanation), and `h` (commands), `f` (files to write) or `code` (a snippet) to show. Each step has a check: `c(ctx)` or a code expression `x`.
- **Solo** requirements have `t` and a check, plus `miss`: the feedback shown when the requirement isn't met (a string, or a function of the sandbox state that diagnoses the mistake). Mark a requirement `now: true` if it must hold at submit time rather than at any point during the session. `warn` lists habit checks (`{ c, m }`), and `ref` is the reference solution.
