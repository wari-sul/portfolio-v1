# Instruction 00 — READ THIS FIRST (Master Workflow)

**Instruction ID:** 00
**Type:** Mandatory onboarding — read before touching anything else.

---

## 1. What was found during the audit (context)

The portfolio codebase (`/home/warisul/Documents/GitHub/portfolio-v1`) was audited end-to-end.
It is an Astro 6 + React 19 + Tailwind CSS v4 static site with GSAP/Lenis/VanillaTilt
animations and a Three.js particle background. The audit found, in summary:

- Broken asset references in the HTML `<head>` (favicon, Open Graph image).
- Orphaned deployment config for Cloudflare Workers (the site deploys statically to Cloudflare Pages).
- Unused imports, unused dependencies, unused image assets, and dead CSS.
- Multiple logic bugs (icon name mismatch, corrupted SVG path, duplicate network fetches,
  deprecated library options, fragile JS class toggling).
- A recurring "elements stuck at opacity: 0" animation bug masked by `setTimeout` hacks.
- Performance, accessibility, SEO, and content-consistency issues.

Every problem area has its own instruction file in this folder, numbered `01` through `07`.

## 2. How to use this instruction set

1. Read this file (`00_README_FIRST.md`) completely.
2. Execute the instruction files **in numeric order**: `01`, then `02`, … up to `07`.
3. Work on **exactly one instruction file at a time**. Finish it, verify it, log it in the
   tracking file (section 5 below), commit it, then move to the next one.
4. Never mix changes from two different instruction files into one commit.
5. If an instruction tells you to verify something (build, preview, grep), actually run it
   and check the result before moving on. Do not assume it works.

## 3. Environment setup

The user's shell is `fish`. Use absolute paths or prefix commands accordingly.

1. Confirm Node version: the project pins **Node 22.12.0** (see `.node-version`).
   ```bash
   node --version
   ```
   If it does not match, switch versions with your Node version manager before continuing.
2. Install dependencies (the `node_modules` directory may be missing):
   ```bash
   cd /home/warisul/Documents/GitHub/portfolio-v1
   npm install
   ```
3. Verify the project starts at all before making any change:
   ```bash
   npm run dev
   ```
   Open the printed URL (usually `http://localhost:4321`). If the dev server fails to start,
   stop and fix that first — nothing else in this instruction set can proceed.

## 4. How to verify your work (standard commands)

Run these after every instruction file unless the file says otherwise:

| Command          | Purpose                                                        | Success criterion                     |
| ---------------- | -------------------------------------------------------------- | ------------------------------------- |
| `npm run build`  | Full production build                                          | Exits 0, no errors                    |
| `npm run check`  | Astro + TypeScript check (added by Instruction 01)             | 0 errors (warnings noted in tracking) |
| `npm run preview`| Serve the production build locally                             | Site renders, no console errors       |

Before running `npm run check` for the first time, Instruction 01 must be completed
(it adds the script). Until then use `npx astro check`.

## 5. Mandatory tracking rule (hard completion gate)

The folder `tracking/` at the repository root contains `TRACKING.md`. **Every instruction
file you complete requires one appended entry in that file.** An instruction is NOT
considered done until its tracking entry exists.

Each entry must record:

1. The instruction ID and title (e.g. `03 — Orphaned Code and Assets`).
2. What specific changes were made.
3. Which AI agent model performed the work (state your own model name; if you cannot
   disclose it, write `undisclosed AI agent`).
4. Timestamp of completion in ISO-8601 format, e.g. `2026-08-08T14:30:00Z`.
5. The list of files created, modified, or deleted.
6. A brief summary of the fixes implemented.
7. Verification result (did `npm run build` / `npm run check` pass?).

Use the entry template printed at the top of `tracking/TRACKING.md`. Append only —
never rewrite or delete previous entries.

## 6. Global constraints (apply to every instruction)

- **No scope creep.** Only change what the current instruction file explicitly describes.
  If you notice an additional problem, do NOT fix it silently — note it in the "Follow-ups"
  section of your tracking entry.
- **No new dependencies** unless an instruction explicitly tells you to add one.
- **No version upgrades** of existing dependencies.
- **Preserve formatting conventions** of each file you edit (indentation, quote style,
  trailing commas). Match surrounding code; do not reformat untouched code.
- **Do not modify the git config** and do not push anywhere. Commits are local only.
- **Never delete content data** (YAML files under `src/content/`) unless an instruction
  explicitly lists the file and field to remove.
- If an instruction gives you example code, adapt it exactly to the surrounding file's
  style — do not paste it blindly if indentation or naming differs.

## 7. Code quality standards to maintain everywhere

- TypeScript strict mode is enabled (`astro/tsconfigs/strict`). Never silence type errors
  with `any` or `@ts-ignore` unless an instruction explicitly permits it.
- Astro frontmatter (the `---` block) holds data loading; markup stays declarative.
- Client-side behavior lives in `<script>` tags (Astro) or React hooks (`.tsx` islands).
- Keep class names and IDs referenced by scripts synchronized: if you rename an ID in
  markup, search the whole `src/` tree for its usage in scripts before committing.
- Prefer removing dead code over commenting it out.
- Commit messages: `fix:`, `chore:`, `refactor:`, `perf:`, or `docs:` prefix + short summary,
  e.g. `fix: remove orphaned wrangler config`.

## 8. Order of operations (checklist)

- [ ] Read this file
- [ ] Environment setup (section 3)
- [ ] Instruction 01 → verify → track → commit
- [ ] Instruction 02 → verify → track → commit
- [ ] Instruction 03 → verify → track → commit
- [ ] Instruction 04 → verify → track → commit
- [ ] Instruction 05 → verify → track → commit
- [ ] Instruction 06 → verify → track → commit
- [ ] Instruction 07 → verify → track → commit
- [ ] Final full verification: `npm run build`, `npm run check`, `npm run preview`
      with manual checks listed in Instruction 04's GSAP section (rapid reload test)
