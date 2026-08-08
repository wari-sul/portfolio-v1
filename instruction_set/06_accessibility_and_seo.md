# Instruction 06 — Accessibility and SEO

**Instruction ID:** 06
**Prerequisite:** Instruction 05 completed.

---

## 1. Issues identified

| #   | Issue                                                                                         | Location(s)                            |
| --- | --------------------------------------------------------------------------------------------- | -------------------------------------- |
| 6.1 | Custom cursor renders ALONGSIDE the native cursor — the native one is never hidden             | `src/styles/global.css`, `src/layouts/BaseLayout.astro` |
| 6.2 | Broken heading hierarchy: two `h1` in the navbar, none in the hero, `h3` without `h2`          | `Navbar.astro`, `Hero.astro`, `TechStack.astro` |
| 6.3 | No `prefers-reduced-motion` support despite heavy animation                                    | all animation scripts + `global.css`   |
| 6.4 | No canonical link and no `robots.txt`                                                          | `src/layouts/BaseLayout.astro`, `public/` |

## 2. Problem explanation

- **6.1** `.custom-cursor` is a decorative div that follows the mouse, but no CSS ever
  hides the system pointer. Desktop users see two cursors (the OS arrow AND the pink ring),
  which looks broken. The fix must scope `cursor: none` to devices with a fine pointer and
  only when the custom cursor is actually active, so touch/keyboard-only users and small
  screens are never affected.
- **6.2** Screen readers and SEO rely on one logical `h1` per page followed by `h2`
  sections. Currently: the desktop nav logo AND the mobile menu title are both `h1`;
  the hero name is a `span` (no `h1` at all); TechStack opens with an `h3` while skipping
  `h2`. The correct structure: hero name = single `h1`; Skills, Experience, Tech Stack,
  Portfolio, Contact = `h2`; nav titles are branding, not headings.
- **6.3** Visitors who enable "reduce motion" (vestibular disorders, battery savers) get
  the full GSAP/Lenis/VanillaTilt experience with no opt-out. Browsers expose the
  preference via `matchMedia('(prefers-reduced-motion: reduce)')`; every animation
  initializer should respect it, and CSS animations/transitions should be globally
  suppressed in that mode. Because Instruction 04 already made elements visible by
  default (`immediateRender: false`), skipping animations leaves content fully readable.
- **6.4** Without `rel="canonical"`, search engines may index URL variants (query strings,
  trailing-slash differences) as duplicates. `robots.txt` is expected at every site root;
  its absence is harmless but unprofessional.

## 3. Step-by-step fix instructions

### 3.1 — Hide the native cursor when the custom cursor is active

1. In `src/layouts/BaseLayout.astro`, inside the existing `if (cursor) { ... }` block
   (custom cursor section of the script), add as the FIRST line inside the block:
   ```js
   document.documentElement.classList.add('custom-cursor-on');
   ```
2. In `src/styles/global.css`, append:
   ```css
   /* Hide the native pointer only where the custom cursor is active (fine pointers only) */
   @media (pointer: fine) {
     html.custom-cursor-on,
     html.custom-cursor-on * {
       cursor: none;
     }
   }
   ```
3. Verify on desktop in dev: single pink ring cursor; hovering links enlarges it. Verify
   in mobile device mode: native touch behavior untouched (the cursor div is `hidden`
   below `md` anyway).

### 3.2 — Fix heading hierarchy

1. **`src/components/Navbar.astro`** — change BOTH headings to non-heading elements:
   - Desktop logo: `<h1 class="text-2xl font-black ...">` → `<span class="text-2xl font-black ...">`
     (keep the inner `<a href="#home">` unchanged, close with `</span>`).
   - Mobile menu title: `<h1 class="text-3xl primary-color-text ...">` → `<span ...>` same way.
2. **`src/components/Hero.astro`** — promote the name to the page's single `h1`:
   ```html
   <h1 class="animate-in text-3xl md:text-4xl lg:text-5xl block my-2 text-white font-extrabold font-display leading-tight break-words">{siteConfig.name}</h1>
   ```
   (it is currently a `<span>` with those exact classes).
3. **`src/components/TechStack.astro`** — change the section title `<h3 ...>` to `<h2 ...>`
   (classes unchanged).
4. Leave `About.astro` (its `h2` Skills/Experience), `Portfolio.astro` (`h2`), and
   `Contact.astro` (`h2`) as they are — they are already correct.
5. Verify: install/use any heading-outline tool or simply search the built
   `dist/index.html`: exactly ONE `<h1`, and every section title is an `<h2`.
   Also confirm the GSAP/JS selectors never targeted those tags by element name
   (search `src/` for `querySelectorAll('h1'` etc. — there are none).

### 3.3 — Respect `prefers-reduced-motion`

1. **`src/layouts/BaseLayout.astro`** — near the top of the script, add:
   ```js
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   ```
   Then:
   - Wrap the Lenis creation + `lenis.on(...)`, the `gsap.ticker.add(...)` and
     `gsap.ticker.lagSmoothing(0)` lines, and the custom cursor initialization in
     `if (!prefersReducedMotion) { ... }`. When skipped, the page uses native scrolling
     and the native cursor — both perfectly functional.
   - KEEP the `window.addEventListener('load', ...)` ScrollTrigger refresh outside the
     guard (harmless and protective).
2. **Component scripts** (`Hero.astro`, `About.astro`, `Contact.astro`,
   `Portfolio.astro`): at the top of each `<script>` add the same
   `prefersReducedMotion` constant, then wrap ONLY the animation and tilt initialization
   code in `if (!prefersReducedMotion) { ... }`. Do NOT wrap non-animation logic:
   - Hero: keep the typing effect OUTSIDE the guard (it is content, and text changes are
     small; but DO guard the magnetic-button transforms and tilt).
   - Contact: keep the form submission handler OUTSIDE the guard; guard tilt + gsap.
   - Navbar/Portfolio scroll buttons: pure functionality — leave unguarded.
3. **`src/components/TechStackGrid.tsx`** — in the `useEffect`, skip calling
   `initAnimations()` when reduced motion is preferred:
   ```ts
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   if (!prefersReducedMotion) {
     initAnimations();
   }
   ```
   Tooltip hover/click behavior must keep working (it is not animation-dependent).
4. **`src/styles/global.css`** — append the global kill-switch:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *,
     *::before,
     *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
       scroll-behavior: auto !important;
     }
   }
   ```
5. Verify: in browser DevTools, enable "Emulate prefers-reduced-motion" (Rendering tab),
   reload, and confirm: no particle drift animation jank requirement (the WebGL canvas
   may keep its gentle motion — acceptable), no scroll animations, instant transitions,
   all content visible, page scrollable.

### 3.4 — Canonical link and robots.txt

1. In `src/layouts/BaseLayout.astro` `<head>` (after the primary meta tags), add:
   ```html
   <link rel="canonical" href={siteConfig.url} />
   ```
   (`siteConfig.url` was added in Instruction 04 — if it is missing, stop and complete
   Instruction 04 first.)
2. Create `public/robots.txt`:
   ```
   User-agent: *
   Allow: /
   ```
   Do not add a Sitemap line — no sitemap exists yet (record as follow-up).
3. Verify: after `npm run build`, `dist/robots.txt` exists and `dist/index.html` contains
   the canonical link.

### Final verification

1. `npm run build` — exits 0.
2. `npm run check` — error count unchanged.
3. `npm run preview` with a screen-reader outline check or DevTools Lighthouse a11y run:
   the accessibility score should be equal or better than before; no new violations.

## 4. Strict constraints

- Do NOT change copy, colors, or layout — this instruction is structural only.
- Do NOT remove animations for everyone; only gate them behind the media query.
- Do NOT add `aria-hidden` to visible content to game audits.
- The single-`h1` rule is absolute: if you find another `h1` anywhere in `src/`, convert
  it and mention it in the tracking entry.
- Do NOT add a sitemap, JSON-LD, or additional meta tags beyond canonical.

## 5. Quality standards

- After this instruction, `grep -rn "<h1" src/` must match exactly ONE occurrence
  (the hero name).
- Every `matchMedia('(prefers-reduced-motion: reduce)')` check must use the identical
  spelling so it is greppable.
- Commit message: `feat: accessibility and SEO improvements (cursor, headings, reduced motion, canonical)`.
