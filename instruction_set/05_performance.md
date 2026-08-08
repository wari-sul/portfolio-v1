# Instruction 05 — Performance

**Instruction ID:** 05
**Prerequisite:** Instruction 04 completed.

---

## 1. Issues identified

| #   | Issue                                                                                       | Location(s)                                      |
| --- | ------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| 5.1 | `import * as THREE` pulls the entire Three.js namespace for one constant                     | `src/components/AmbientBackground.tsx`           |
| 5.2 | GSAP/ScrollTrigger registration and VanillaTilt setup duplicated across 6 files              | `Hero.astro`, `About.astro`, `Contact.astro`, `Portfolio.astro`, `TechStackGrid.tsx`, `BaseLayout.astro` |
| 5.3 | Vimeo iframe loads eagerly with the initial page                                             | `src/components/Portfolio.astro` (+ `project6.yaml`) |
| 5.4 | Hero profile image forced to `quality={100}` — largest possible file for no visible gain     | `src/components/Hero.astro`                      |
| 5.5 | External font stylesheet is render-blocking with no `preconnect`                             | `src/layouts/BaseLayout.astro`                   |

## 2. Problem explanation

- **5.1** `import * as THREE from 'three'` binds the whole namespace. Tree-shaking works
  best with named imports; using a namespace import risks bundling more of Three.js than
  the single `AdditiveBlending` constant actually needs.
- **5.2** Five different scripts each run `gsap.registerPlugin(ScrollTrigger)` and five
  places hand-roll nearly identical `VanillaTilt.init(...)` option objects. Duplication
  means every tuning change (glare, speed, perspective) must be made in 5 spots and drifts
  over time (it already has: speeds range 500–1000, max 6–12). One shared utility removes
  the drift and shrinks the total script code.
- **5.3** The project carousel always injects a live Vimeo player iframe, which downloads
  Vimeo's player JS even if the visitor never watches it. Iframes support `loading="lazy"`,
  deferring that cost until the carousel is near the viewport.
- **5.4** `quality={100}` disables Astro's image optimization compression on the largest
  image on the page. The visual difference vs. the default (80) is imperceptible for a
  photo; the byte difference is significant.
- **5.5** The Fontshare CSS is fetched only when the HTML is parsed; without `preconnect`
  the TLS handshake to `api.fontshare.com` (and the font CDN) starts late, delaying text
  rendering.

## 3. Step-by-step fix instructions

### 3.1 — Named Three.js import (`src/components/AmbientBackground.tsx`)

1. Replace:
   ```ts
   import * as THREE from 'three';
   ```
   with:
   ```ts
   import { AdditiveBlending } from 'three';
   ```
2. In the `<PointMaterial>` JSX, change `blending={THREE.AdditiveBlending}` to
   `blending={AdditiveBlending}`.
3. No other `THREE.` usages exist in the file (verify with a search for `THREE.`).

### 3.2 — Shared animation utility

1. Create `src/utils/animations.ts`:
   ```ts
   import { gsap } from 'gsap';
   import { ScrollTrigger } from 'gsap/ScrollTrigger';
   import VanillaTilt from 'vanilla-tilt';

   gsap.registerPlugin(ScrollTrigger);

   export { gsap, ScrollTrigger };

   export interface TiltOptions {
     max?: number;
     speed?: number;
     maxGlare?: number;
     perspective?: number;
     scale?: number;
     gyroscope?: boolean;
   }

   /** Initialize VanillaTilt on every element matching the selector. No-op if none match. */
   export function initTilt(selector: string, options: TiltOptions = {}) {
     const elements = document.querySelectorAll(selector);
     if (elements.length === 0) return;
     VanillaTilt.init(Array.from(elements) as HTMLElement[], {
       max: options.max ?? 10,
       speed: options.speed ?? 700,
       glare: true,
       'max-glare': options.maxGlare ?? 0.12,
       perspective: options.perspective ?? 1200,
       ...(options.scale !== undefined && { scale: options.scale }),
       ...(options.gyroscope !== undefined && { gyroscope: options.gyroscope }),
     });
   }
   ```
2. In each Astro component script (`Hero.astro`, `About.astro`, `Contact.astro`,
   `Portfolio.astro`) replace the local imports/registration:
   ```js
   import { gsap } from "gsap";
   import { ScrollTrigger } from "gsap/ScrollTrigger";
   import VanillaTilt from 'vanilla-tilt';
   gsap.registerPlugin(ScrollTrigger);
   ```
   with:
   ```js
   import { gsap, initTilt } from '../utils/animations';
   ```
   (`Hero.astro` needs only `initTilt` plus `gsap` if its animations remain — check which
   it uses after Instruction 04 and import accordingly.)
3. Replace each `VanillaTilt.init(Array.from(...), { ... })` block with a single
   `initTilt(selector, options)` call, preserving the CURRENT per-section numbers exactly.
   Examples:
   ```js
   // Hero.astro
   initTilt('#home .glass-card', { max: 8, speed: 800, maxGlare: 0.12, perspective: 1200, scale: 1.01 });
   // About.astro
   initTilt('#about .glass-card:not(.about-intro-card)', { max: 12, speed: 600, maxGlare: 0.15, perspective: 1000, scale: 1.02, gyroscope: true });
   // Contact.astro
   initTilt('#contact .glass-card', { max: 6, speed: 700, maxGlare: 0.1, perspective: 1200 });
   // Portfolio.astro
   initTilt('#portfolio .snap-center', { max: 10, speed: 500, maxGlare: 0.15, perspective: 1200 });
   ```
4. In `src/components/TechStackGrid.tsx`, inside `initAnimations`, replace the three
   dynamic imports and the manual `VanillaTilt.init` block with:
   ```ts
   const { gsap, initTilt } = await import('../utils/animations');
   ```
   and
   ```ts
   initTilt('.tech-card', { max: 12, speed: 1000, maxGlare: 0.15, perspective: 1000, scale: 1.02 });
   ```
   Keep the dynamic `import()` form (it intentionally defers until hydration).
5. Remove the now-unused local `gsap.registerPlugin(ScrollTrigger)` calls everywhere.
6. Verify: `npm run build` succeeds; in dev, tilt + glare still work in hero, about,
   portfolio, tech stack, and contact sections.

### 3.3 — Lazy-load the Vimeo iframe (`src/components/Portfolio.astro`)

1. On the `<iframe ... src={project.data.videoUrl} ...>` element, add the attribute:
   ```html
   loading="lazy"
   ```
2. Verify in dev DevTools → Network: Vimeo resources are not requested until you scroll
   near the carousel.

### 3.4 — Drop forced image quality (`src/components/Hero.astro`)

1. On the desktop `<Image ... src={profilePic} ... />`, delete the `quality={100}` prop.
2. Verify the build output image is smaller: compare the size of the emitted `ppic` file
   in `dist/_astro/` before and after (record both numbers in the tracking entry).

### 3.5 — Preconnect the font hosts (`src/layouts/BaseLayout.astro`)

1. Directly ABOVE the existing Fontshare `<link ... stylesheet>` in `<head>`, add:
   ```html
   <link rel="preconnect" href="https://api.fontshare.com" crossorigin />
   <link rel="preconnect" href="https://cdn.fontshare.com" crossorigin />
   ```

### Final verification

1. `npm run build` — exits 0. Note total build time and `dist/` size; compare with the
   baseline recorded in Instruction 01 and put the delta in the tracking entry.
2. `npm run check` — error count unchanged.
3. `npm run preview` — full visual pass: particles render, fonts load, tilt works,
   carousel video plays on demand.

## 4. Strict constraints

- Do NOT change any animation timing/values other than routing them through the utility.
- Do NOT upgrade or swap libraries (no replacing VanillaTilt, GSAP, Lenis, or Three.js).
- Do NOT add code splitting, service workers, or compression plugins — out of scope.
- The utility file must not import React or Astro-specific modules; keep it framework-free.
- Do NOT alter the iframe `allow` attribute or Vimeo URL parameters.

## 5. Quality standards

- `src/utils/animations.ts` must be fully typed (no `any`) and pass `npm run check`.
- After this instruction, `grep -rn "VanillaTilt.init" src/` must match ONLY
  `src/utils/animations.ts`.
- `grep -rn "registerPlugin" src/` must match ONLY `src/utils/animations.ts`.
- Commit message: `perf: shared animation utils, lazy video, asset optimizations`.
