# Instruction 02 — Deployment Config Cleanup (Cloudflare Pages static)

**Instruction ID:** 02
**Prerequisite:** Instruction 01 completed.

---

## 1. Issues identified

| #   | Issue                                                                                              | Location                    |
| --- | -------------------------------------------------------------------------------------------------- | --------------------------- |
| 2.1 | `wrangler.jsonc` configures a Cloudflare **Workers** server entry that is not installed             | `wrangler.jsonc`            |
| 2.2 | Empty generated Workers type declaration left over                                                  | `worker-configuration.d.ts` |
| 2.3 | `generate-types` npm script exists only to serve the orphaned Workers setup                         | `package.json`              |
| 2.4 | `wrangler` CLI dependency installed but no longer needed                                            | `package.json`              |
| 2.5 | `tsconfig.json` includes the orphaned type declaration file                                         | `tsconfig.json`             |

## 2. Problem explanation

The project builds as a **purely static site** (no `output: 'server'`, no adapter in
`astro.config.mjs`). Stats are fetched at **build time** (`src/utils/fetchStats.ts`),
and the README confirms deployment to Cloudflare Pages. However, `wrangler.jsonc` still
points at `"main": "@astrojs/cloudflare/entrypoints/server"` — a package that is not in
`package.json` at all. Anyone running `wrangler deploy` would get a hard failure, and
the leftover files mislead future maintainers into thinking this is an SSR Workers app.

These artifacts are dead weight from an earlier experiment. The deployment target was
confirmed with the project owner as **static Cloudflare Pages**, so the correct fix is
removal — not repairing the Workers setup.

`public/_headers` (security headers) works with Cloudflare Pages and must be kept.

## 3. Step-by-step fix instructions

### Step 1 — Confirm nothing else references wrangler

1. Search the whole repository (excluding `node_modules`) for references:
   ```bash
   grep -rn "wrangler" --exclude-dir=node_modules --exclude-dir=.git .
   ```
2. Expected hits: `wrangler.jsonc`, `worker-configuration.d.ts`, `package.json`
   (script + dependency), and possibly `README.md`. If you find a reference anywhere
   else (e.g. a CI workflow), note it in your tracking entry before removing.

### Step 2 — Delete the orphaned files

1. Delete `wrangler.jsonc` (repository root).
2. Delete `worker-configuration.d.ts` (repository root).
3. Use your editor's delete or `git rm` so the deletions are staged cleanly:
   ```bash
   git rm wrangler.jsonc worker-configuration.d.ts
   ```

### Step 3 — Clean `package.json`

1. Remove the script line:
   ```json
   "generate-types": "wrangler types"
   ```
   Make sure the JSON stays valid: fix the trailing comma on the line above it
   (`"astro": "astro",` must end without a trailing comma if it becomes the last entry).
2. Remove the dependency entry:
   ```json
   "wrangler": "^4.92.0"
   ```
3. Save, then run:
   ```bash
   npm install
   ```
   to update `package-lock.json`.

### Step 4 — Clean `tsconfig.json`

1. Open `tsconfig.json`. The `include` array currently looks like:
   ```json
   "include": [
     ".astro/types.d.ts",
     "**/*",
     "./worker-configuration.d.ts"
   ],
   ```
2. Remove the `"./worker-configuration.d.ts"` entry (and fix the trailing comma):
   ```json
   "include": [
     ".astro/types.d.ts",
     "**/*"
   ],
   ```
3. Save.

### Step 5 — Update README references (only if present)

1. If `README.md` mentions `wrangler`, `wrangler deploy`, or Workers-specific setup,
   remove or correct those lines to match static Cloudflare Pages deployment.
   Do not rewrite unrelated README sections — a full README refresh is Instruction 07.

### Step 6 — Verify

1. `grep -rn "wrangler" --exclude-dir=node_modules --exclude-dir=.git .` should now
   return nothing (or only historical notes you intentionally kept — there should be none).
2. `npm run build` — exits 0, output identical to before this instruction.
3. `npm run check` — error count unchanged from baseline.
4. `git status` — confirm only the intended files are deleted/modified.

## 4. Strict constraints

- Do NOT add `@astrojs/cloudflare` or any adapter. The site stays static.
- Do NOT change `astro.config.mjs` in this instruction.
- Do NOT delete or modify `public/_headers` — it is valid and used by Cloudflare Pages.
- Do NOT modify deployment-related environment variables (`GIST_STATS_URL`,
  `PUBLIC_STATICFORMS_KEY`) or `src/env.d.ts`.
- Keep the `"overrides"` block in `package.json` exactly as it is.

## 5. Quality standards

- `package.json` and `tsconfig.json` must remain valid JSON (run `npm install` and
  `npm run build` to prove it).
- File deletions must go through git (`git rm`) so history stays clean.
- Commit message for this instruction: `chore: remove orphaned Cloudflare Workers config`.
