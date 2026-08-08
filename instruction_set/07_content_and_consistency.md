# Instruction 07 — Content and Consistency

**Instruction ID:** 07
**Prerequisite:** Instruction 06 completed.

---

## 1. Issues identified

| #   | Issue                                                                                          | Location(s)                              |
| --- | ---------------------------------------------------------------------------------------------- | ---------------------------------------- |
| 7.1 | Placeholder project title "Project #1" shipped as real content                                  | `src/content/projects/project1.yaml`     |
| 7.2 | Blog URL hardcoded twice in the Navbar while `siteConfig.links` is the declared single source of truth (and holds a different blogging platform, `hashnode`) | `src/components/Navbar.astro`, `src/config/site.ts` |
| 7.3 | README describes the previous iteration ("v3-experimental") and omits current reality           | `README.md`                              |

## 2. Problem explanation

- **7.1** `project1.yaml` literally says `title: "Project #1"`. Every other project has a
  real name; this one reads as unfinished to visitors. The description ("prototype of a
  mobile application for a food delivery service startup") provides enough information to
  write a neutral, honest title without inventing branding.
- **7.2** The Navbar contains `https://blog.warisul.com/` twice (desktop + mobile menus).
  `siteConfig.links` already centralizes GitHub/LinkedIn/Hashnode, so site links belong
  there. The mismatch with `hashnode` is also confusing: both are blogging links. The fix:
  add the blog URL to `siteConfig.links` and reference it from the Navbar, keeping both
  keys since they point to different platforms (owner may retire one later — not our call).
- **7.3** The README still sells "Elite V3 Portfolio", mentions `v3-experimental`, and its
  commands table predates the `check` script. After the cleanup (Instructions 01–06) the
  docs must describe the project as it now is: v4, static Astro site on Cloudflare Pages.

## 3. Step-by-step fix instructions

### 3.1 — Replace the placeholder project title

1. Open `src/content/projects/project1.yaml`.
2. Change:
   ```yaml
   title: "Project #1"
   ```
   to:
   ```yaml
   title: "Food Delivery App Prototype"
   ```
3. Do NOT touch the description, image, links, or order fields.
4. Record in your tracking entry's Follow-ups: "project1 title is audit-generated; owner
   should confirm or supply the real project name."

### 3.2 — Centralize the blog link

1. In `src/config/site.ts`, add a `blog` key inside `links` (keep `hashnode`):
   ```ts
   links: {
     github: "https://github.com/wari-sul",
     linkedin: "https://www.linkedin.com/in/warisul-rafin",
     blog: "https://blog.warisul.com/",
     dashboard: "https://dashboard.warisul.com/",
     hashnode: "https://hashnode.com/warisul",
   },
   ```
2. In `src/components/Navbar.astro`, replace BOTH hardcoded occurrences of
   `href="https://blog.warisul.com/"` (desktop list item and mobile menu list item) with:
   ```html
   href={siteConfig.links.blog}
   ```
3. Verify: `grep -rn "blog.warisul.com" src/` should now match ONLY `src/config/site.ts`.
4. Verify in dev: both Blog links open the correct URL in a new tab.

### 3.3 — Rewrite the README

Replace the body of `README.md` with an accurate description of the CURRENT project.
Required sections and facts (write in the same friendly first-person tone as today's
README, keep emojis usage modest and consistent with existing style):

1. **Title + one-paragraph intro** — "SM WARISUL A. RAFIN — Portfolio (v4)". Astro-based
   static portfolio.
2. **Tech stack** — Astro 6, React 19 islands, Tailwind CSS v4, GSAP + ScrollTrigger,
   Lenis smooth scroll, VanillaTilt, Three.js (react-three-fiber) particle background,
   YAML content collections.
3. **Features** — typing hero titles, live stats fetched from a GitHub Gist at build time,
   tilt/glare glass cards, horizontal-snap portfolio carousel with Vimeo embeds, contact
   form via StaticForms, tech-stack tooltips.
4. **Development commands table** — must include:
   | Command            | Action                          |
   | ------------------ | ------------------------------- |
   | `npm run dev`      | Start dev server                |
   | `npm run build`    | Production build                |
   | `npm run preview`  | Preview the production build    |
   | `npm run check`    | Astro + TypeScript static check |
5. **Environment variables** — document both variables used at build time:
   - `GIST_STATS_URL` — URL of a JSON Gist providing `projects`, `experience`, `clients`
     (falls back to `src/config/site.ts` defaults when unset or unreachable).
   - `PUBLIC_STATICFORMS_KEY` — StaticForms API key for the contact form.
   Keep the existing Cloudflare Pages warning about setting env vars in the dashboard.
6. **Deployment** — static build deployed to Cloudflare Pages; note that `public/_headers`
   provides security headers. Remove ALL mentions of v3-experimental, wrangler, or Workers.
7. Keep the existing LICENSE reference if present.

### Final verification

1. `npm run build` — exits 0.
2. `npm run check` — error count unchanged.
3. `npm run preview` — portfolio card 1 shows the new title; both Blog links work.
4. Read the rendered README (GitHub preview) — no stale references.

## 4. Strict constraints

- Do NOT modify any project data besides project1's `title` (no descriptions, links,
  images, or ordering changes).
- Do NOT remove the `hashnode` link or the Hashnode social button in the hero.
- Do NOT fabricate facts in the README (feature list above is the source of truth; if you
  see something in the code not listed, add it only if you verified it works).
- Do NOT touch `instruction_set/` or `tracking/` contents except appending the required
  tracking entry.

## 5. Quality standards

- YAML stays valid (build validates it).
- `site.ts` remains the single source of truth for every external URL in the UI.
- Commit message: `docs: fix placeholder content, centralize links, refresh README`.
