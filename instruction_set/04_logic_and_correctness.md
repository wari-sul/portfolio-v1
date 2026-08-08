# Instruction 04 — Logic and Correctness Bugs

**Instruction ID:** 04 (the largest instruction — work through each subsection separately)
**Prerequisite:** Instruction 03 completed.

---

## 1. Issues identified

| #    | Issue                                                                                          | Location(s)                                    |
| ---- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| 4.1  | Favicon and OG/Twitter images point at `/assets/*` paths that do not exist in `public/`          | `src/layouts/BaseLayout.astro`                 |
| 4.2  | `og:url` / `twitter:url` point to `dashboard.warisul.com` instead of this site                   | `src/layouts/BaseLayout.astro`, `src/config/site.ts` |
| 4.3  | Icon name mismatch: config says `hugging-face`, icon map key is `huggingface` → renders "?"      | `src/config/site.ts`, `src/components/TechStackIcon.tsx` |
| 4.4  | Corrupted `apache-kafka` SVG path data                                                           | `src/components/TechStackIcon.tsx`             |
| 4.5  | SVG gradient/mask ID prefix is per icon NAME, not per INSTANCE — duplicate IDs in the DOM        | `src/components/TechStackIcon.tsx`             |
| 4.6  | `gsap.from(..., opacity: 0)` pattern leaves elements invisible on rapid reload; three `setTimeout` band-aids hide the root cause | `BaseLayout.astro`, `Hero.astro`, `About.astro`, `Contact.astro`, `Portfolio.astro`, `TechStackGrid.tsx` |
| 4.7  | `fetchStats()` awaited twice per build (Hero + About) — duplicate network request                | `Hero.astro`, `About.astro`, `src/utils/fetchStats.ts` |
| 4.8  | Lenis initialized with removed/deprecated v1 options (`direction`, `gestureDirection`, `smooth`) | `src/layouts/BaseLayout.astro`                 |
| 4.9  | Mobile menu toggles Tailwind classes via JS; toggles classes the button never has                | `src/components/Navbar.astro`                  |
| 4.10 | Contact form fails silently on empty fields; no guard when `PUBLIC_STATICFORMS_KEY` is unset     | `src/components/Contact.astro`                 |

## 2. Problem explanation

- **4.1** `src/assets/` images are processed and emitted with hashed filenames
  (`/_astro/ppic.HASH.png`). The hardcoded paths `/assets/logo.svg` and `/assets/ppic.png`
  in the `<head>` therefore 404 in production: broken favicon tab icon, broken social
  share previews.
- **4.2** `og:url` should be the canonical URL of THIS page/site, not the unrelated
  dashboard subdomain.
- **4.3** `TechStackIcon` falls back to rendering a literal `?` when the key is missing.
  Because `site.ts` uses `"hugging-face"`, the Hugging Face card shows a "?" today.
- **4.4** The kafka entry contains corrupted path data (`c-16.186 0-30.flies 7.455...`,
  plus negative coordinates like `-87.993` that draw outside the viewBox). The icon
  renders as garbage.
- **4.5** The code comment claims the `uid` avoids ID collisions, but `uid` is
  `` `ic-${iconName}-` `` — identical for every instance of the same icon. Two rendered
  instances of the Python icon define two `#ic-python-a` gradients; browsers use the
  first match for both, which breaks colors when instances differ or unmount.
- **4.6** `gsap.from(target, { opacity: 0, ... })` immediately paints the target invisible
  and relies on ScrollTrigger firing to reveal it. On rapid reloads ScrollTrigger can
  misfire, leaving sections permanently invisible — a bug already visible in git history
  (`fix: GSAP ScrollTrigger visibility bugs on reload`). The current workaround is three
  separate `setTimeout` scans (2.5–3 s) that force-show stuck elements. That is fragile,
  delays first paint correctness, and duplicates logic in three files. The robust fix is
  `gsap.fromTo` with `immediateRender: false`: elements stay VISIBLE until their trigger
  fires, so a misfiring trigger degrades to "no animation", never "invisible content".
- **4.7** Both `Hero.astro` and `About.astro` await `fetchStats()` independently, so each
  build performs the same external Gist fetch twice.
- **4.8** The `lenis` package (v1.3.x, the successor of studio-freight/lenis) renamed/removed
  those options: `direction` → `orientation`, `gestureDirection` → `gestureOrientation`,
  `smooth` → `smoothWheel`. Unknown options are silently ignored — behavior drifts.
- **4.9** The script adds/removes literal Tailwind classes (`left-[-100%]`, `left-0`,
  `relative`, `mr-4`). This only works because Tailwind happens to find the literal strings
  in the script — a class-name typo or a purge change silently breaks the menu. The button
  never has `relative`/`mr-4`, so those toggles do nothing.
- **4.10** When required fields are empty the handler just `return`s — the user gets zero
  feedback. If `PUBLIC_STATICFORMS_KEY` is unset the hidden `apiKey` input is omitted
  silently and every submission fails with a generic error.

## 3. Step-by-step fix instructions

### 4.1 Fix favicon and social images (`src/layouts/BaseLayout.astro`)

1. Change the favicon line to the file that actually exists in `public/`:
   ```html
   <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
   ```
2. For the OG/Twitter images, use Astro's asset pipeline instead of a hardcoded path.
   In the frontmatter add:
   ```js
   import ogImage from '../assets/ppic.png';
   ```
   and replace BOTH `content="/assets/ppic.png"` occurrences with:
   ```html
   <meta property="og:image" content={ogImage.src} />
   ...
   <meta property="twitter:image" content={ogImage.src} />
   ```
3. Verify: `npm run build`, then open `dist/index.html` and confirm the meta tags contain
   a real hashed path like `/_astro/ppic.xxxxx.png`.

### 4.2 Fix `og:url` (`src/config/site.ts`, `BaseLayout.astro`)

1. Add a top-level `url` field to the `siteConfig` object, right above `links`:
   ```ts
   url: "https://warisul.com/",
   ```
   (This is the primary domain — flag in your tracking entry's Follow-ups that the owner
   should confirm it matches the production domain.)
2. In `BaseLayout.astro`, replace both occurrences of
   `content={siteConfig.links.dashboard}` (og:url and twitter:url) with
   `content={siteConfig.url}`.

### 4.3 Fix the Hugging Face icon name (`src/config/site.ts`)

1. In the `techStack` array, change:
   ```ts
   icon: "hugging-face",
   ```
   to:
   ```ts
   icon: "huggingface",
   ```
2. Verify in `npm run dev`: the Hugging Face card shows its logo, not `?`.

### 4.4 Replace the corrupted Apache Kafka SVG (`src/components/TechStackIcon.tsx`)

1. Obtain the official Kafka mark from simple-icons (slug `apachekafka`):
   - Fetch `https://simpleicons.org/icons/apachekafka.svg` (it is a single `<path>` with
     `viewBox="0 0 24 24"`).
2. In `svgMap`, replace the ENTIRE `"apache-kafka"` entry with a corrected one using that
   path data:
   ```ts
   "apache-kafka": {
     viewBox: "0 0 24 24",
     content: (_uid) => `<path fill="currentColor" d="...PATH FROM SIMPLE-ICONS..."/>`
   },
   ```
3. If you cannot fetch the SVG, use any editor with the `@iconify-json/simple-icons`
   dataset already in `node_modules` BEFORE Instruction 03 removed it — otherwise stop and
   record a blocker in the tracking file; do NOT invent path data.
4. Verify visually: the Kafka card renders a recognizable Kafka glyph in `currentColor`
   (gray, turning white on hover like the others).

### 4.5 Make SVG ID prefixes unique per instance (`src/components/TechStackIcon.tsx`)

1. Import `useId` from React at the top of the file (extend the existing import).
2. Inside the `TechStackIcon` component, replace:
   ```ts
   const uid = `ic-${iconName}-`;
   ```
   with:
   ```ts
   // useId is unique per component instance; strip characters invalid in SVG url(#...) refs
   const uid = `ic-${useId().replace(/[^a-zA-Z0-9]/g, '')}-`;
   ```
3. Update the surrounding comment to say "unique prefix per icon INSTANCE".
4. Note: icons without `<defs>` ignore `uid` (their callbacks are `(_uid) => ...`) — that
   is fine, leave them alone.

### 4.6 Root-fix the GSAP visibility bug (six files)

**The universal replacement pattern.** Every entrance animation must become a `fromTo`
with `immediateRender: false` and (for scroll-triggered ones) `once: true`:

```js
gsap.fromTo(targets,
  { opacity: 0, y: 50 /* same FROM vars as before */ },
  {
    opacity: 1, y: 0 /* same TO vars as before */,
    immediateRender: false,          // CRITICAL: stay visible until the trigger fires
    ease: 'power4.out',
    duration: 1.6,
    scrollTrigger: { trigger: '...', start: 'top 85%', once: true },
  }
);
```

Apply per file (keep existing durations, eases, staggers, filters — only restructure):

1. **`src/layouts/BaseLayout.astro`** — DELETE the entire "Global safety fallback" block:
   the comment lines plus the `setTimeout(...)` that queries `.snap-center, .tech-card, ...`
   and forces opacity (roughly lines 76–91). Everything else in the script stays.
2. **`src/components/Hero.astro`** — convert both `gsap.from(...)` calls
   (`#home-left-card .animate-in` and `#home img`) to the `fromTo` pattern. They have no
   scrollTrigger (they run on load); keep them triggerless but still use
   `immediateRender: false`.
3. **`src/components/About.astro`** — convert the four `gsap.from(...)` calls
   (`.about-intro-card`, `.about-reveal`, `.about-accent-bar`, and the per-card loop) to
   `fromTo` with `immediateRender: false`. Remove the `onComplete` callback in the per-card
   loop that manually sets `card.style.opacity = '1'`.
4. **`src/components/Contact.astro`** — convert both `gsap.from(...)` calls to `fromTo`
   with `immediateRender: false`, and ADD `once: true` to their scrollTrigger configs
   (they currently lack it and re-animate on every scroll past).
5. **`src/components/Portfolio.astro`** — the `fromTo` already exists: add
   `immediateRender: false` to the TO-vars object, remove the `onComplete` callback that
   manually sets opacity/filter, and DELETE the trailing `setTimeout` fallback block
   (the "Fallback to ensure visibility" comment + timeout, roughly lines 152–162).
6. **`src/components/TechStackGrid.tsx`** — same treatment inside `initAnimations`:
   add `immediateRender: false`, remove the `onComplete` opacity hack, DELETE the
   "Safety fallback" `setTimeout` block.

**Verification for 4.6 (mandatory):** `npm run build` + `npm run preview`, then reload the
page rapidly 3–4 times in a row. Every section (hero, about cards, tech stack grid,
portfolio carousel, contact) must remain visible. No element may stay at opacity 0.

### 4.7 Deduplicate `fetchStats`

1. In `src/pages/index.astro` frontmatter, add:
   ```js
   import { fetchStats } from '../utils/fetchStats';
   const stats = await fetchStats();
   ```
   and pass it to the two consumers:
   ```html
   <Hero stats={stats} />
   ...
   <About stats={stats} />
   ```
2. In `src/components/Hero.astro`: remove the `fetchStats` import and the
   `const stats = await fetchStats();` line; instead declare props:
   ```js
   import type { PortfolioStats } from '../utils/fetchStats';
   interface Props { stats: PortfolioStats; }
   const { stats } = Astro.props;
   ```
3. Do the exact same in `src/components/About.astro` (it also imports `fetchStats` today).
4. Leave `src/utils/fetchStats.ts` unchanged.
5. Verify: during `npm run build` you should see at most ONE Gist request in the output /
   network logs, and stats still render in hero and about sections.

### 4.8 Migrate Lenis options (`src/layouts/BaseLayout.astro`)

Replace the Lenis constructor options:
```js
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
});
```
(removed: `direction`, `gestureDirection`, `smooth`). Verify scrolling still feels
smooth in `npm run dev`.

### 4.9 Rework the mobile menu toggle (`src/components/Navbar.astro`)

1. On the `#mobile-menu` div, replace `left-[-100%]` with `-translate-x-full` and add the
   Tailwind data-attribute variants so visibility is state-driven:
   ```html
   <div id="mobile-menu"
        class="fixed top-0 h-screen w-[70%] border-r border-r-gray-900 bg-[#0a0a0c]/95 backdrop-blur-xl transition-transform duration-500 ease-in-out z-50 flex flex-col justify-center -translate-x-full data-open:translate-x-0">
   ```
   (Drop `left-0`/`left-[-100%]` entirely; keep every other existing class.)
2. Replace the whole script body with attribute toggling (no class-name strings):
   ```html
   <script>
     const btn = document.getElementById('mobile-menu-btn');
     const menu = document.getElementById('mobile-menu');
     const links = document.querySelectorAll('.mobile-link');
     let navOpen = false;

     const toggleMenu = () => {
       navOpen = !navOpen;
       if (navOpen) {
         menu?.setAttribute('data-open', '');
       } else {
         menu?.removeAttribute('data-open');
       }
       btn?.setAttribute('aria-expanded', String(navOpen));
     };

     btn?.addEventListener('click', toggleMenu);
     links.forEach((link) =>
       link.addEventListener('click', () => {
         if (navOpen) toggleMenu();
       })
     );
   </script>
   ```
3. Add `aria-expanded="false"` to the `#mobile-menu-btn` button in the markup.
4. Verify in dev at mobile width (DevTools device mode): menu slides in/out, links close
   the menu, and resizing to desktop leaves no broken state.
5. If the slide animation does not work because Tailwind did not generate `data-open:`,
   confirm you used the exact variant spelling `data-open:translate-x-0` and rebuild.

### 4.10 Harden the contact form (`src/components/Contact.astro`)

1. Frontmatter guard — after `const accessKey = import.meta.env.PUBLIC_STATICFORMS_KEY;`
   add:
   ```js
   if (!accessKey) {
     console.warn('[Contact] PUBLIC_STATICFORMS_KEY is not set — form submissions will fail.');
   }
   ```
   and render the hidden input only when a key exists:
   ```html
   {accessKey && <input type="hidden" name="apiKey" value={accessKey} />}
   ```
2. Remove the `novalidate` attribute from `<form id="contact-form" novalidate>` so native
   browser validation (the `required` + `type="email"` attributes) blocks obviously bad
   input with built-in messages.
3. Replace the silent guard in the submit handler:
   ```js
   if (!name || !email || !message) return;
   ```
   with user-visible feedback:
   ```js
   if (!name || !email || !message) {
     errorEl?.classList.remove('hidden');
     return;
   }
   ```
4. Verify in dev: submitting an empty form shows browser validation; with fields filled
   but no API key, the error banner appears instead of a silent nothing.

## 4. Strict constraints

- Do NOT redesign any visual effect in 4.6 — same durations, eases, transforms; only the
  structural `fromTo` + `immediateRender: false` change and hack removal.
- Do NOT remove or restructure GSAP animations beyond the six files listed.
- Do NOT change the StaticForms endpoint URL or the form field names (`name`, `email`,
  `message`, `apiKey`, `honeypot`).
- Do NOT invent SVG path data (4.4) — use the official simple-icons source or log a blocker.
- Do NOT add any new npm package in this instruction.
- Keep all existing IDs (`home`, `contact-form`, `mobile-menu`, etc.) — scripts and
  anchor links depend on them.

## 5. Quality standards

- After 4.6, the strings `setTimeout` must not appear anywhere in animation code paths
  (grep `src/` — the only allowed remaining uses are the typing-effect delays in
  `Hero.astro` and the ScrollTrigger `refresh` delay in `BaseLayout.astro`).
- TypeScript must stay clean: `npm run check` error count must not increase vs. baseline.
- One commit for the whole instruction is acceptable, but prefer one commit per subsection
  (`fix: head meta paths`, `fix: gsap visibility root cause`, etc.) for reviewability.
