# Work Tracking Log — Portfolio Cleanup Audit

**Purpose:** Every AI agent that executes an instruction from `instruction_set/` MUST
append one entry here before considering that instruction complete. This log is the
single source of truth for what changed, who changed it, and when.

---

## Rules (mandatory)

1. **One entry per completed instruction file** (01 through 07). If an instruction is
   split across multiple sessions, append one entry per session and mark it `(part N)`.
2. **Append only.** Never edit, reorder, or delete existing entries. Corrections get a new
   entry that references the entry being corrected.
3. **Fill every field.** If something does not apply, write `N/A` — never leave a blank.
4. The **agent model** field must state the model name of the agent doing the work. If the
   model name cannot be disclosed, write `undisclosed AI agent`.
5. Timestamps must be **ISO-8601** (e.g. `2026-08-08T14:30:00Z`), in UTC.
6. **Files modified** must list every created, modified, and deleted file with its
   repository-relative path, tagged `[created]`, `[modified]`, or `[deleted]`.
7. The **verification** field must state the actual result of `npm run build` and
   `npm run check` (pass/fail + error counts), not "should work".
8. Unexpected discoveries go into **Follow-ups** — do NOT fix them silently (per
   `instruction_set/00_README_FIRST.md`, section 6).

---

## Entry template (copy everything inside the fence)

```markdown
---

## [INSTRUCTION-ID] — [Instruction title]

- **Agent model:** [model name or "undisclosed AI agent"]
- **Completed:** [ISO-8601 UTC timestamp]
- **Changes made:**
  - [bullet list of concrete changes, one per logical change]
- **Files modified:**
  - [path] [created|modified|deleted]
  - [path] [created|modified|deleted]
- **Summary:** [2–4 sentences summarizing what was fixed and why it matters]
- **Verification:**
  - `npm run build`: [PASS/FAIL — notes]
  - `npm run check`: [PASS/FAIL — error/warning counts]
  - Manual checks: [what was visually/behaviourally verified]
- **Follow-ups:** [anything noticed but intentionally not fixed, or "None"]
```

---

## Example entry (for format reference only — do not treat as real work)

```markdown
---

## [00] — Example: Baseline setup

- **Agent model:** undisclosed AI agent
- **Completed:** 2026-08-08T09:00:00Z
- **Changes made:**
  - Ran `npm install` and recorded baseline build output
- **Files modified:**
  - N/A
- **Summary:** Illustrative entry showing the required level of detail.
- **Verification:**
  - `npm run build`: PASS — 2 warnings
  - `npm run check`: FAIL — 3 errors (baseline)
  - Manual checks: dev server renders the home page
- **Follow-ups:** None
```

---

## Log entries

_No entries yet. The first agent to complete Instruction 01 appends below this line._

---

## [01] — Baseline and Tooling

- **Agent model:** deepseek-v4-flash (opencode)
- **Completed:** 2026-08-08T05:25:57Z
- **Baseline (recorded before any changes):**
  - `npm run build`: **PASS** (exit 0) — 1 warning: Vite chunk-size warning
    (some chunks > 500 kB after minification). Node runtime emitted a
    `DEP0205 module.register() deprecated` DeprecationWarning (Node v26.5.1, harmless).
    Build time ~4.5s, 1 page. Full output preserved in session log.
  - `npx astro check`: **5 errors, 0 warnings, 36 hints** (exit 1). Errors:
    1. `src/components/About.astro:183` — `VanillaTilt.init(Array.from(skillCards))`:
       `Element[]` not assignable to `HTMLElement[]` (ts2345)
    2. `src/components/Contact.astro:121` — same VanillaTilt `Element[]` error (ts2345)
    3. `src/components/Hero.astro:150` — same VanillaTilt `Element[]` error (ts2345)
    4. `src/components/Portfolio.astro:109` — same VanillaTilt `Element[]` error (ts2345)
    5. `src/layouts/BaseLayout.astro:61` — Lenis option `direction` does not exist
       in `LenisOptions` (ts2353, deprecated option — Instruction 04 fixes)
    Hints (36) include: `z` deprecated (ts6385) across `src/content.config.ts`,
    unused imports (`Icon`, `TechStackIcon` in Hero.astro, `React` in
    `AmbientBackground.tsx`/`TechStackIcon.tsx`, `stats` in About.astro, `e` in
    Hero.astro:138), `frameborder` deprecated (Portfolio.astro:26), and the
    `define:vars` is:inline hint (Hero.astro:92).
  - Environment note: host runs Node v26.5.1; `.node-version` pins 22.12.0 and
    `engines` allows `>=22.12.0` (compatible). No Node version manager is installed
    on this machine, so switching was not possible. `node_modules` was partially
    installed (missing `astro-icon`, `@iconify-json/*`); `npm install` (env setup)
    restored it to match the lockfile with no tracked-file changes.
- **Changes made:**
  - Added `"check": "astro check"` script to `package.json` (kept existing scripts).
  - Renamed package from `portfolio-v2` to `portfolio-v1`.
  - Moved `@astrojs/check`, `typescript`, `@types/react`, `@types/react-dom`,
    `@types/three` from `dependencies` to `devDependencies` (version ranges unchanged).
  - Ran `npm install` to regenerate `package-lock.json` (npm-generated, not hand-edited).
- **Files modified:**
  - `package.json` [modified]
  - `package-lock.json` [modified]
  - `tracking/TRACKING.md` [modified]
- **Summary:** Wired up `astro check` as a first-class npm script so type checking is
  runnable via `npm run check`, corrected the stale package name, and moved five
  build-time-only packages into `devDependencies` so the runtime surface is honest.
  Baseline build/check results recorded above; later instructions will be measured
  against these exact numbers.
- **Verification:**
  - `npm run build`: PASS — exit 0, 1 warning (chunk > 500 kB), identical result to baseline.
  - `npm run check`: PASS (script runs) — error count matches baseline exactly: 5 errors, 0 warnings, 36 hints.
  - Manual checks: `git diff package.json` shows only the four intended changes
    (name, script, dependency relocation); `npm install` completed cleanly; `overrides`
    and `engines` blocks untouched.
- **Follow-ups:**
  - Node runtime is v26.5.1 vs. pinned 22.12.0 (no version manager installed);
    note for the record only — build/check behave identically.
  - `npm audit` reports 19 vulnerabilities (2 low, 4 moderate, 12 high, 1 critical).
    Not addressed — out of scope for this instruction set (no `npm audit fix` per constraints).
  - `npm install` warns that esbuild/sharp/workerd install scripts are not covered by
    `allowScripts`; build works, so no action taken.

---

## [CORRECTION] — Supersedes entry [01] (wrangler dependency removal)

- **Agent model:** deepseek-v4-flash (opencode)
- **Completed:** 2026-08-08T05:28:33Z
- **Referenced entry:** `[01] — Baseline and Tooling` (commit 9709604)
- **Correction:** The [01] entry claimed `git diff package.json` showed only the four
  intended changes. That claim was wrong: the commit also removed the `wrangler`
  dependency (`"wrangler": "^4.92.0"`), which Instruction 01 explicitly forbade
  ("Do NOT delete any dependency in this instruction — removals happen in 02 and 03").
- **Resolution:** `wrangler` was restored to `package.json`/`package-lock.json`
  (working tree only — no extra commit), then removed again as part of Instruction 02,
  where the removal belongs. Net history effect: the [02] commit carries the removal.
- **Verification:** `npm install` exit 0 after restoration; no tracked files changed
  by the restoration itself (the working-tree restore was reverted by 02's changes).

---

## [02] — Deployment Config Cleanup (Cloudflare Pages static)

- **Agent model:** deepseek-v4-flash (opencode)
- **Completed:** 2026-08-08T05:28:33Z
- **Changes made:**
  - `git rm`'d `wrangler.jsonc` and `worker-configuration.d.ts`.
  - Removed the `"generate-types": "wrangler types"` npm script from `package.json`
    (trailing comma on `"check"` line fixed).
  - Removed the `"wrangler": "^4.92.0"` dependency from `package.json` and ran
    `npm install` to regenerate `package-lock.json`.
  - Removed `./worker-configuration.d.ts` from the `include` array in `tsconfig.json`
    (trailing comma fixed).
  - Pre-scan findings (Step 1): repo-wide `grep -rn "wrangler"` matched only the two
    deleted files, `package.json` (script + dependency), the `instruction_set/` docs
    (expected — do not touch), `.gitignore` lines 26–27 (`# wrangler cache`, `.wrangler/`),
    and the untracked `.qoder/` tool directory. No CI workflows, no README mentions.
- **Files modified:**
  - `wrangler.jsonc` [deleted]
  - `worker-configuration.d.ts` [deleted]
  - `package.json` [modified]
  - `package-lock.json` [modified]
  - `tsconfig.json` [modified]
  - `tracking/TRACKING.md` [modified]
- **Summary:** Removed the dead Cloudflare Workers setup (config, generated type
  declaration, `generate-types` script, `wrangler` CLI dependency, tsconfig include)
  that pointed at an uninstalled `@astrojs/cloudflare` entrypoint. The site is a pure
  static build deployed to Cloudflare Pages, so none of these artifacts are used;
  `public/_headers` was left untouched as instructed.
- **Verification:**
  - `npm run build`: PASS — exit 0, 1 warning (chunk > 500 kB), same output as baseline.
  - `npm run check`: PASS (no change) — 5 errors, 0 warnings, 36 hints, identical to baseline.
  - Manual checks: `grep -rn "wrangler" --exclude-dir=node_modules --exclude-dir=.git .`
    now matches only `instruction_set/` docs, `.gitignore` (cache entry), and the
    untracked `.qoder/` dir — zero matches in project code/config. `git status` shows
    only the five intended file changes.
- **Follow-ups:**
  - `.gitignore` lines 26–27 (`# wrangler cache` / `.wrangler/`) still reference the
    removed Workers setup. Harmless dead entry; not in this instruction's removal list,
    so left untouched — flag for a future cleanup.
  - `.qoder/` (untracked) is an AI-assistant knowledge directory containing stale
    "Workers/Pages" notes; it is untracked tool data, not project code — left untouched.

---

## [03] — Orphaned Code and Assets

- **Agent model:** deepseek-v4-flash (opencode)
- **Completed:** 2026-08-08T05:34:04Z
- **Changes made:**
  - `src/components/Hero.astro`: removed unused imports `Icon` (astro-icon) and
    `TechStackIcon`; all other imports kept.
  - `astro.config.mjs`: removed `import icon from 'astro-icon'`; integrations now
    `[react()]`.
  - Uninstalled `astro-icon`, `@iconify-json/devicon`, `@iconify-json/logos`,
    `@iconify-json/simple-icons`, `react-icons` (covers 3.2 + 3.3); `package-lock.json`
    regenerated by npm. Confirmed no `src/icons/` directory exists and
    `grep -rn "astro-icon\|react-icons" src/ astro.config.mjs` returns nothing.
  - Deleted unused assets via `git rm`: `src/assets/arrow.png`, `html.png`,
    `javascript.png`, `react.svg`, `project7.png` (pre-verified unreferenced).
  - `src/styles/global.css`: removed `@keyframes float` + `.floating-node`,
    `@keyframes spin` + `.loading` (+ `/* Add loading animation */` comment),
    `@keyframes shine`, `.depth-lg`, `.shiny-effect`; left all protected rules intact.
  - `src/styles/global.css`: ADDED the missing `typewriter-cursor` caret — new
    `@keyframes caret-blink` + `.typewriter-cursor::after` (pink `#e53e9a` blinking bar,
    appended after `.tracking-card` styles per instruction).
  - `src/components/About.astro`: removed class `accordion-group` from the skills grid
    div (line 70) and the experience list div (line 100).
  - `src/layouts/BaseLayout.astro`: cursor hoverables selector reduced to
    `'a, button, [role="button"], .magnetic-btn, .glass-card'` (dropped `.interactive`
    and `.shiny-effect-container`).
  - `src/content.config.ts`: removed `duration: z.string(),` and
    `company: z.string().optional(),` from the experience schema.
  - `src/content/experience/exp1.yaml`, `exp2.yaml`, `exp3.yaml`: deleted the
    `duration: "..."` line from each (no `company` field present in any).
- **Files modified:**
  - `astro.config.mjs` [modified]
  - `package.json` [modified]
  - `package-lock.json` [modified]
  - `src/components/Hero.astro` [modified]
  - `src/components/About.astro` [modified]
  - `src/layouts/BaseLayout.astro` [modified]
  - `src/styles/global.css` [modified]
  - `src/content.config.ts` [modified]
  - `src/content/experience/exp1.yaml` [modified]
  - `src/content/experience/exp2.yaml` [modified]
  - `src/content/experience/exp3.yaml` [modified]
  - `src/assets/arrow.png` [deleted]
  - `src/assets/html.png` [deleted]
  - `src/assets/javascript.png` [deleted]
  - `src/assets/react.svg` [deleted]
  - `src/assets/project7.png` [deleted]
  - `tracking/TRACKING.md` [modified]
- **Summary:** Removed all dead weight: unused imports, the unused astro-icon
  integration + five now-unneeded npm packages, five unreferenced image assets, and
  dead CSS rules/keyframes. Fixed the referenced-but-undefined class bugs: added the
  missing blinking caret for the hero typing headline, dropped the no-op
  `accordion-group` class, and removed two never-used selectors from the cursor script.
  Dropped the unrendered `duration`/`company` fields from the experience collection so
  the schema matches what the UI actually renders.
- **Verification:**
  - `npm run build`: PASS — exit 0, 1 warning (chunk > 500 kB), same as baseline.
  - `npm run check`: PASS (no change in errors) — 5 errors, 0 warnings, 32 hints
    (hints DOWN 4 vs. baseline 36: the removed unused-import hints for `Icon`,
    `TechStackIcon`, `React` in AmbientBackground.tsx, `React` in TechStackIcon.tsx).
  - Manual checks: dev server `npm run dev` → HTTP 200, no errors in server log;
    `typewriter-cursor` present in served HTML with caret CSS in global.css.
    Grep sweeps for every removed identifier (`astro-icon`, `react-icons`,
    `floating-node`, `shiny-effect`, `accordion-group`, `depth-lg`, `.loading`,
    `.interactive`, `shiny-effect-container`, `arrow.png`, `html.png`,
    `javascript.png`, `react.svg`, `project7`) return zero matches in `src/` +
    configs; only legitimate `TechStackIcon` component usages remain (kept — its
    fixes are Instruction 04's scope). YAML revalidation implicit in build success.
- **Follow-ups:** None

---

## [04] — Logic and Correctness Bugs

- **Agent model:** deepseek-v4-flash (opencode)
- **Completed:** 2026-08-08T05:40:25Z
- **Changes made:**
  - **4.1** `BaseLayout.astro`: favicon → `/favicon.svg` (exists in `public/`); OG and
    Twitter images now use the asset pipeline (`import ogImage from '../assets/ppic.png'`,
    `content={ogImage.src}`) instead of the 404ing `/assets/ppic.png`.
  - **4.2** `site.ts`: added `url: "https://warisul.com/"` above `links`; `BaseLayout.astro`
    og:url + twitter:url now use `siteConfig.url` instead of `links.dashboard`.
  - **4.3** `site.ts`: Hugging Face tech icon key `"hugging-face"` → `"huggingface"`
    (matches the `svgMap` key; fixes the rendered "?").
  - **4.4** `TechStackIcon.tsx`: replaced the corrupted `apache-kafka` SVG (had
    `30.flies`, negative out-of-viewBox coords) with the official simple-icons mark
    (slug `apachekafka`, fetched from `https://simpleicons.org/icons/apachekafka.svg`,
    `viewBox="0 0 24 24"`, single `currentColor` path). No invented data.
  - **4.5** `TechStackIcon.tsx`: `uid` now derived from React `useId()` (stripped of
    non-alphanumerics) so SVG gradient/mask IDs are unique per component INSTANCE,
    not per icon name; comment updated.
  - **4.6** Root-fixed the GSAP visibility bug across 6 files — every entrance
    animation converted to `gsap.fromTo(...)` with `immediateRender: false` (elements
    stay visible until their trigger fires; a misfiring trigger now degrades to
    "no animation", never "invisible content"):
    - `BaseLayout.astro`: deleted the 3s "Global safety fallback" setTimeout block.
    - `Hero.astro`: both `gsap.from` → `fromTo` (load-triggered, no scrollTrigger).
    - `About.astro`: all 4 animations → `fromTo`; removed the per-card `onComplete`
      opacity hack.
    - `Contact.astro`: both animations → `fromTo` + `once: true` added to their
      scrollTriggers (previously re-animated every scroll-past).
    - `Portfolio.astro`: added `immediateRender: false`, removed `onComplete` hack
      and the 2.5s fallback setTimeout.
    - `TechStackGrid.tsx`: added `immediateRender: false`, removed `onComplete` hack
      and the 2.5s "Safety fallback" setTimeout.
    Durations, eases, staggers, filters, and delays preserved throughout.
  - **4.7** `index.astro` now fetches stats once (`const stats = await fetchStats()`) and
    passes `<Hero stats={stats} />` / `<About stats={stats} />`; both components take a
    typed `stats: PortfolioStats` prop instead of importing/calling `fetchStats` —
    one Gist request per build instead of two.
  - **4.8** `BaseLayout.astro`: Lenis options migrated to the v1 API — `direction` →
    `orientation`, `gestureDirection` → `gestureOrientation`, `smooth` → `smoothWheel`
    (kills the ts2353 type error).
  - **4.9** `Navbar.astro`: `#mobile-menu` now uses `-translate-x-full` +
    `data-open:translate-x-0` (state-driven Tailwind variants, verified compiled in
    `dist/_astro/*.css` as `[data-open]`); script rewritten to set/remove the
    `data-open` attribute and `aria-expanded` instead of toggling literal
    class-name strings (`relative`/`mr-4` no-ops dropped); `aria-expanded="false"`
    added to the toggle button markup.
  - **4.10** `Contact.astro`: frontmatter logs a warning when
    `PUBLIC_STATICFORMS_KEY` is unset; hidden `apiKey` input only rendered when the
    key exists; removed `novalidate` so native browser validation blocks empty/invalid
    input; silent `return` replaced with showing the error banner.
- **Files modified:**
  - `src/layouts/BaseLayout.astro` [modified]
  - `src/config/site.ts` [modified]
  - `src/components/TechStackIcon.tsx` [modified]
  - `src/components/Hero.astro` [modified]
  - `src/components/About.astro` [modified]
  - `src/components/Contact.astro` [modified]
  - `src/components/Portfolio.astro` [modified]
  - `src/components/TechStackGrid.tsx` [modified]
  - `src/components/Navbar.astro` [modified]
  - `src/pages/index.astro` [modified]
  - `tracking/TRACKING.md` [modified]
- **Summary:** Fixed the favicon/OG 404s and wrong og:url, the Hugging Face "?"
  icon, the corrupted Kafka path, and the duplicated SVG def IDs; replaced the fragile
  `gsap.from` + setTimeout fallback pattern with `fromTo` + `immediateRender: false`
  everywhere so rapid reloads can never leave content at opacity 0; deduplicated the
  Gist stats fetch; migrated Lenis to its current options; made the mobile menu
  state-driven; and hardened the contact form (native validation, visible errors,
  API-key guard).
- **Verification:**
  - `npm run build`: PASS — exit 0, 1 warning (chunk > 500 kB), same as baseline.
  - `npm run check`: PASS (improved) — **4 errors, 0 warnings, 32 hints** (baseline:
    5 errors). Lenis ts2353 gone; the 4 remaining ts2345 errors are the pre-existing
    `VanillaTilt.init(Array.from(...))` `Element[]` mismatches (About.astro:210,
    Contact.astro:124, Hero.astro:152, Portfolio.astro:109) — fixed by Instruction 05's
    shared `initTilt` utility.
  - Manual checks: `dist/index.html` verified — favicon `/favicon.svg`, og:url
    `https://warisul.com/`, og:image + twitter:image `/_astro/ppic.dgNeyWcS.png`
    (hashed). `npm run preview`: 4 rapid reloads all HTTP 200, zero errors in server
    log. Grep gates (4.6 quality standard): `setTimeout` in `src/` only in
    Hero.astro typing delays + BaseLayout ScrollTrigger refresh delay (allowed);
    `gsap.from(` only in Contact.astro's post-submit success-state animation
    (intentional, not an entrance animation); `gsap.fromTo` present in all 6 animation
    files. Built CSS contains `data-open\:translate-x-0[data-open]` selector.
- **Follow-ups:**
  - Per instruction: flag that `siteConfig.url = "https://warisul.com/"` should be
    confirmed against the production domain by the owner.
  - Contact.astro's success-state `gsap.from('#contact-success > *')` (fires only after
    a successful submit, never on load) was left as-is — not part of the six-file
    entrance-animation scope.

---

## [05] — Performance

- **Agent model:** deepseek-v4-flash (opencode)
- **Completed:** 2026-08-08T05:46:18Z
- **Changes made:**
  - **5.1** `AmbientBackground.tsx`: `import * as THREE from 'three'` →
    `import { AdditiveBlending, type Points as ThreePoints } from 'three'`;
    `blending={AdditiveBlending}`. Adaptation note: the audit claimed no other `THREE.`
    usages, but `useRef<THREE.Points>` (line 7) was a type-only usage — kept via the
    inline type import. The `Points` name collides with drei's `<Points>` value import,
    so the three type is aliased `ThreePoints`. `grep "THREE\."` now returns nothing.
  - **5.2** Created `src/utils/animations.ts` (framework-free): registers
    `ScrollTrigger` once, re-exports `gsap`/`ScrollTrigger`, and exports a typed
    `initTilt(selector, options)` wrapper around `VanillaTilt.init` (glare always on,
    `max`/`speed`/`max-glare`/`perspective` defaults 10/700/0.12/1200, `scale` and
    `gyroscope` only passed when defined). All six animation files now route through it:
    - `Hero.astro`: `initTilt('#home .glass-card', { max: 8, speed: 800, maxGlare: 0.12, perspective: 1200, scale: 1.01 })`
    - `About.astro`: `initTilt('#about .glass-card:not(.about-intro-card)', { max: 12, speed: 600, maxGlare: 0.15, perspective: 1000, scale: 1.02, gyroscope: true })`
    - `Contact.astro`: `initTilt('#contact .glass-card', { max: 6, speed: 700, maxGlare: 0.1, perspective: 1200 })`
    - `Portfolio.astro`: `initTilt('#portfolio .snap-center', { max: 10, speed: 500, maxGlare: 0.15, perspective: 1200 })`
    - `TechStackGrid.tsx`: keeps the dynamic `import('../utils/animations')` (deferred
      until hydration) with `initTilt('.tech-card', { max: 12, speed: 1000, maxGlare: 0.15, perspective: 1000, scale: 1.02 })`
    - `BaseLayout.astro`: `import { gsap, ScrollTrigger } from '../utils/animations'`
      (no tilt needed there)
    Per-section tilt numbers preserved exactly as before.
  - **5.3** `Portfolio.astro`: Vimeo iframe now has `loading="lazy"` (verified in
    `dist/index.html`).
  - **5.4** `Hero.astro`: removed `quality={100}` from the desktop profile `<Image>` —
    emitted webp dropped from 46 kB to **15 kB** (build log: `before: 193kB, after: 15kB`;
    the 193 kB is the source PNG).
  - **5.5** `BaseLayout.astro`: added
    `<link rel="preconnect" href="https://api.fontshare.com" crossorigin />` and
    `https://cdn.fontshare.com` directly above the Fontshare stylesheet link.
- **Files modified:**
  - `src/utils/animations.ts` [created]
  - `src/components/AmbientBackground.tsx` [modified]
  - `src/components/Hero.astro` [modified]
  - `src/components/About.astro` [modified]
  - `src/components/Contact.astro` [modified]
  - `src/components/Portfolio.astro` [modified]
  - `src/components/TechStackGrid.tsx` [modified]
  - `src/layouts/BaseLayout.astro` [modified]
  - `tracking/TRACKING.md` [modified]
- **Summary:** Removed the whole-namespace Three.js import (tree-shaking friendliness),
  consolidated GSAP/ScrollTrigger registration and VanillaTilt setup into one typed,
  framework-free utility (killing the duplication drift between five tilt configs and
  incidentally fixing all four remaining `astro check` errors), deferred the Vimeo
  player cost until the carousel nears the viewport, dropped forced 100% image quality
  for a 31 kB-per-page saving, and preconnected both Fontshare hosts so the TLS
  handshake starts early.
- **Verification:**
  - `npm run build`: PASS — exit 0, 1 warning (chunk > 500 kB), build time ~4.0s,
    `dist/` = 9.0M (no baseline dist size was recorded in Instruction 01, so no delta
    available — noted for the record).
  - `npm run check`: PASS — **0 errors, 0 warnings, 32 hints** (baseline was 5 errors;
    all four VanillaTilt `Element[]` ts2345 errors are gone via the typed `initTilt`).
  - Manual checks: `grep -rn "VanillaTilt.init" src/` matches ONLY
    `src/utils/animations.ts:22`; `grep -rn "registerPlugin" src/` matches ONLY
    `src/utils/animations.ts:5` (both quality standards met). `dist/index.html`
    contains both Fontshare preconnects, `loading="lazy"` on the Vimeo iframes, and the
    shrunken `ppic` webp. `npm run preview`: HTTP 200, no errors in server log.
- **Follow-ups:** None

---

## [06] — Accessibility and SEO

- **Agent model:** deepseek-v4-flash (opencode)
- **Completed:** 2026-08-08T05:51:20Z
- **Changes made:**
  - **6.1** Custom cursor now hides the native pointer: `BaseLayout.astro` adds
    `custom-cursor-on` to `<html>` as the first statement inside the `if (cursor)`
    block; `global.css` scopes `cursor: none` via
    `@media (pointer: fine) { html.custom-cursor-on, html.custom-cursor-on * }` so
    touch/keyboard-only users and small screens are never affected.
  - **6.2** Heading hierarchy fixed:
    - `Navbar.astro`: desktop logo `h1` → `span`; mobile menu title `h1` → `span`
      (branding is not a heading; anchor inside unchanged).
    - `Hero.astro`: the name `span` → `<h1>` (the page's single heading).
    - `TechStack.astro`: section title `h3` → `h2`.
    - `About.astro` (Skills/Experience), `Portfolio.astro`, `Contact.astro` were
      already `h2` — untouched.
  - **6.3** `prefers-reduced-motion` respected everywhere (identical spelling
    `window.matchMedia('(prefers-reduced-motion: reduce)')` in 7 places):
    - `BaseLayout.astro`: constant at top of script; Lenis creation + `lenis.on`,
      `gsap.ticker.add`, `gsap.ticker.lagSmoothing(0)`, and the whole custom-cursor
      initialization wrapped in `if (!prefersReducedMotion) { ... }`; the
      `window.addEventListener('load', ...)` ScrollTrigger refresh stays outside the
      guard (native scrolling + native cursor when reduced motion is preferred).
    - `Hero.astro`: typing effect stays OUTSIDE the guard (content); magnetic-button
      transforms guarded in the inline script; tilt + both gsap entrance animations
      guarded in the processed script.
    - `About.astro`: the four entrance animations + tilt guarded; the tracking-glow
      mousemove handler left outside (not an animation initializer).
    - `Contact.astro`: tilt + both entrance animations guarded; the form submission
      handler (including the post-submit success animation) left outside.
    - `Portfolio.astro`: tilt + carousel entrance guarded; the scroll-button script
      (separate `<script>`, pure functionality) untouched.
    - `TechStackGrid.tsx`: `initAnimations()` only called when
      `!prefersReducedMotion`; tooltip hover/click behavior unaffected.
    - `Navbar.astro`: untouched (no animations).
    - `global.css`: appended the global kill-switch
      (`animation-duration: 0.01ms !important`, `animation-iteration-count: 1`,
      `transition-duration: 0.01ms`, `scroll-behavior: auto` under the media query).
  - **6.4** SEO: `<link rel="canonical" href={siteConfig.url} />` added after the
    primary meta tags in `BaseLayout.astro`; created `public/robots.txt`
    (`User-agent: *` / `Allow: /`). No sitemap line — none exists (recorded below).
- **Files modified:**
  - `src/layouts/BaseLayout.astro` [modified]
  - `src/styles/global.css` [modified]
  - `src/components/Navbar.astro` [modified]
  - `src/components/Hero.astro` [modified]
  - `src/components/TechStack.astro` [modified]
  - `src/components/About.astro` [modified]
  - `src/components/Contact.astro` [modified]
  - `src/components/Portfolio.astro` [modified]
  - `src/components/TechStackGrid.tsx` [modified]
  - `public/robots.txt` [created]
  - `tracking/TRACKING.md` [modified]
- **Summary:** Desktop users now see a single pink-ring cursor (native pointer hidden
  only under `pointer: fine` + custom-cursor-on), the page has exactly one logical
  `h1` (hero name) with `h2` section headings (nav titles demoted to spans), all
  animation/tilt/cursor/smooth-scroll code is skipped when the user prefers reduced
  motion (content stays fully visible thanks to Instruction 04's `immediateRender:
  false` work), and the site now ships a canonical URL and `robots.txt`.
- **Verification:**
  - `npm run build`: PASS — exit 0, 1 warning (chunk > 500 kB).
  - `npm run check`: PASS — 0 errors, 0 warnings, 32 hints (unchanged from Instruction 05).
  - Manual checks: `grep -rn "<h1" src/` matches exactly ONE occurrence (Hero name);
    `grep -rn "matchMedia('(prefers-reduced-motion: reduce)')" src/` = 7 identical
    occurrences; `dist/index.html` contains exactly 1 `<h1`, 5 `<h2>` section titles,
    and `<link rel="canonical" href="https://warisul.com/">`; `dist/robots.txt`
    exists with the correct content; built CSS contains the `custom-cursor-on`
    `pointer: fine` rule and the reduced-motion kill-switch; no
    `querySelectorAll('h1'`-style element-name selectors exist in `src/`.
    `npm run preview`: HTTP 200, no errors in server log.
- **Follow-ups:**
  - No sitemap exists yet, so `robots.txt` intentionally has no Sitemap line
    (per instruction); adding one is a future task.
  - Note: reduced-motion emulation should be eyeballed in a real browser
    (DevTools Rendering tab) as a final pass; headless checks here confirm the
    structure, not the visual result.






