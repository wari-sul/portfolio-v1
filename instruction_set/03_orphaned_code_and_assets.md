# Instruction 03 — Orphaned Code and Assets

**Instruction ID:** 03
**Prerequisite:** Instruction 02 completed.

---

## 1. Issues identified

| #    | Issue                                                                                     | Location(s)                              |
| ---- | ----------------------------------------------------------------------------------------- | ---------------------------------------- |
| 3.1  | Unused imports `Icon` and `TechStackIcon` in Hero frontmatter                              | `src/components/Hero.astro`              |
| 3.2  | `astro-icon` integration + 3 iconify icon packages installed but unused after 3.1          | `astro.config.mjs`, `package.json`       |
| 3.3  | `react-icons` dependency has zero usages anywhere in the codebase                          | `package.json`                           |
| 3.4  | Five image assets are never referenced                                                     | `src/assets/`                            |
| 3.5  | Dead CSS rules and keyframes                                                               | `src/styles/global.css`                  |
| 3.6  | Classes referenced in markup/scripts that have no CSS definition (one is a visible bug)    | `Hero.astro`, `About.astro`, `BaseLayout.astro`, `global.css` |
| 3.7  | Experience schema collects `duration` and `company` fields that are never rendered         | `src/content.config.ts`, `src/content/experience/*.yaml` |

## 2. Problem explanation

- **3.1** `Hero.astro` imports `Icon` from `astro-icon/components` (line 4) and
  `TechStackIcon` (line 7), but the template never uses either. Unused imports confuse
  readers and keep otherwise-removable packages alive.
- **3.2** Once 3.1 is fixed, NOTHING imports `astro-icon`, so the `icon()` integration in
  `astro.config.mjs` and the packages `astro-icon`, `@iconify-json/devicon`,
  `@iconify-json/logos`, `@iconify-json/simple-icons` are pure dead weight (the tech-stack
  icons are rendered by the hand-written `src/components/TechStackIcon.tsx` instead).
- **3.3** `react-icons` has zero imports anywhere — confirmed by a full-repo search.
- **3.4** Unused assets: `arrow.png`, `html.png`, `javascript.png`, `react.svg`,
  `project7.png`. They inflate the repo and mislead content edits. (`project1.png` …
  `project6.png`, `ppic.png`, `ppic-mobile.png`, `logo.svg` ARE used — keep them.)
- **3.5** Dead CSS in `global.css`: `.floating-node` (+ its `@keyframes float`),
  `.loading` (+ its `@keyframes spin`), `.depth-lg` (only `.depth-sm`/`.depth-md` are
  used), `.shiny-effect`, and `@keyframes shine` (nothing uses it).
- **3.6** Three classes are referenced but have no styles:
  - `typewriter-cursor` (on the typing span in `Hero.astro`) — this is a **visible bug**:
    the typing headline is meant to show a blinking caret, but no caret CSS exists. Fix by
    ADDING the missing style.
  - `accordion-group` (two divs in `About.astro`) — no such CSS exists; remove the class.
  - `.interactive` and `.shiny-effect-container` (queried by the custom-cursor script in
    `BaseLayout.astro`) — no elements ever carry these classes; remove them from the selector.
- **3.7** The experience collection schema requires `duration` and defines optional
  `company`, and all three YAML files set `duration` — but `About.astro` renders only
  `title`, `description`, and `result`. Unrendered data is maintenance debt and lies to
  future editors who think the dates show up on the page. Decision from the audit:
  **remove the fields** (re-adding a timeline UI is a future feature, tracked separately).

## 3. Step-by-step fix instructions

### Step 1 — Remove unused imports in `src/components/Hero.astro`

1. Open `src/components/Hero.astro`. In the frontmatter block, delete these two lines:
   ```js
   import { Icon } from 'astro-icon/components';
   import TechStackIcon from './TechStackIcon';
   ```
2. Keep every other import (`siteConfig`, `Image`, the two profile images, `fetchStats`).

### Step 2 — Remove astro-icon and icon packages

1. Open `astro.config.mjs`:
   - Delete the line `import icon from 'astro-icon';`
   - Change `integrations: [icon(), react()]` to `integrations: [react()]`.
2. Uninstall the packages:
   ```bash
   npm uninstall astro-icon @iconify-json/devicon @iconify-json/logos @iconify-json/simple-icons react-icons
   ```
   (This covers issue 3.3 as well and updates `package-lock.json` automatically.)
3. Verify no leftovers:
   ```bash
   grep -rn "astro-icon\|react-icons" --exclude-dir=node_modules --exclude-dir=.git src/ astro.config.mjs
   ```
   Expected result: no matches.
4. If a folder `src/icons/` exists, delete it too (it does not exist today; this is a
   safety check only).

### Step 3 — Delete unused assets

1. Delete exactly these five files from `src/assets/`:
   ```
   arrow.png  html.png  javascript.png  react.svg  project7.png
   ```
   Recommended:
   ```bash
   git rm src/assets/arrow.png src/assets/html.png src/assets/javascript.png src/assets/react.svg src/assets/project7.png
   ```
2. Double-check before committing:
   ```bash
   grep -rn "arrow.png\|html.png\|javascript.png\|react.svg\|project7" --exclude-dir=node_modules --exclude-dir=.git src/
   ```
   Expected: no matches. If anything matches, STOP and investigate.

### Step 4 — Remove dead CSS in `src/styles/global.css`

Delete the following blocks entirely (rule + associated keyframes):

1. `@keyframes float` and `.floating-node`.
2. `@keyframes spin` and `.loading` (including the `/* Add loading animation */` comment).
3. `.depth-lg` (leave `.depth-sm` and `.depth-md`).
4. `.shiny-effect`.
5. `@keyframes shine`.

Do NOT touch: `.custom-cursor*`, `@keyframes mesh-gradient`, the `@layer base` body rule,
`.primary-color-text`, `.bg-primary-color`, `.glass`, `.glass-card`, `.depth-sm`,
`.depth-md`, `.tracking-card`, `.tracking-glow`.

### Step 5 — Fix referenced-but-undefined classes

1. **Add** the missing caret style for `typewriter-cursor` to `global.css` (append near
   the other component styles):
   ```css
   @keyframes caret-blink {
     0%, 45% { opacity: 1; }
     50%, 95% { opacity: 0; }
     100% { opacity: 1; }
   }

   .typewriter-cursor::after {
     content: "";
     display: inline-block;
     width: 2px;
     height: 1.1em;
     margin-left: 4px;
     vertical-align: text-bottom;
     background: #e53e9a;
     animation: caret-blink 1.2s steps(1) infinite;
   }
   ```
   Verify visually in `npm run dev`: the typing headline in the hero shows a blinking
   pink caret while text types/deletes.
2. In `src/components/About.astro`, remove the class `accordion-group` from both
   containers (the skills grid div and the experience list div, around lines 70 and 100).
3. In `src/layouts/BaseLayout.astro`, in the cursor hoverables selector
   (`document.querySelectorAll(...)` around line 117), remove `.interactive,` and
   `.shiny-effect-container` from the selector string, leaving:
   ```js
   document.querySelectorAll('a, button, [role="button"], .magnetic-btn, .glass-card')
   ```

### Step 6 — Drop unrendered experience fields

1. In `src/content.config.ts`, remove these two lines from the experience schema:
   ```js
   duration: z.string(),
   company: z.string().optional(),
   ```
2. In each of `src/content/experience/exp1.yaml`, `exp2.yaml`, `exp3.yaml`, delete the
   `duration: "..."` line. (`company` is not present in any of them.)
3. Verify: `npm run build` — the content layer validates YAML against the schema; any
   leftover field would fail the build.

### Step 7 — Verify everything

1. `npm run build` — exits 0.
2. `npm run check` — error count must not increase vs. baseline.
3. `npm run dev` — visually confirm: hero typing caret blinks, tech-stack icons render,
   About section looks unchanged.

## 4. Strict constraints

- Do NOT delete or modify any used asset (`ppic.png`, `ppic-mobile.png`, `project1-6.png`,
  `logo.svg`, `favicon.*`).
- Do NOT touch `TechStackIcon.tsx` or `TechStackGrid.tsx` in this instruction (they have
  their own fixes in Instruction 04).
- Do NOT rewrite the custom-cursor script beyond the selector change in Step 5.3.
- Do NOT change the visual design when adding the caret style — a subtle blinking bar is
  the goal; no colors other than the existing brand pink `#e53e9a`.
- Do NOT render `duration`/`company` instead of deleting them — the audit decision is
  removal. A timeline UI is a future feature request, not part of this cleanup.

## 5. Quality standards

- After this instruction, `grep` for every removed identifier must return zero matches in
  `src/` and config files.
- CSS file must still be valid (build passing proves Tailwind/vite processed it).
- Commit message: `chore: remove orphaned code, assets, and dead CSS`.
