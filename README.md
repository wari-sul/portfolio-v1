# 🌟 SM WARISUL A. RAFIN — Portfolio (v4)

Welcome to the current iteration of my professional portfolio! This is a fully static
site built with **Astro**, designed for speed, clean aesthetics, and interactive
physics.

## ✨ Features

- **Typing Hero Titles**: Rotating job titles with a blinking caret.
- **Live Stats**: Projects / Experience / Clients fetched from a GitHub Gist at
  **build time** (with fallbacks baked in).
- **Tilt & Glare Glass Cards**: Bento cards physically tilt with glare based on mouse
  position (VanillaTilt).
- **Horizontal-Snap Portfolio Carousel**: Snap-scrolling project cards with Vimeo
  embeds and live demo / GitHub links.
- **Tech-Stack Tooltips**: Hover (desktop) / tap (mobile) tooltips per technology.
- **Contact Form**: Powered by StaticForms with honeypot spam protection.
- **Reduced-Motion Aware**: All animation, smooth-scroll, and custom-cursor effects
  respect the `prefers-reduced-motion` setting.

## 🛠️ Tech Stack

- **Astro 6** — static site generation with YAML content collections
- **React 19** — islands (tech-stack grid, 3D particle background)
- **Tailwind CSS v4**
- **GSAP + ScrollTrigger** — scroll-driven entrance animations
- **Lenis** — inertial smooth scrolling
- **VanillaTilt** — 3D tilt/glare card effects
- **Three.js (react-three-fiber)** — ambient WebGL particle background

## 🚀 Development Commands

| Command            | Action                          |
| ------------------ | ------------------------------- |
| `npm run dev`      | Start dev server                |
| `npm run build`    | Production build                |
| `npm run preview`  | Preview the production build    |
| `npm run check`    | Astro + TypeScript static check |

## 🔑 Environment Variables (IMPORTANT)

Two build-time environment variables are used:

- `GIST_STATS_URL` — URL of a JSON Gist providing `projects`, `experience`, and
  `clients` stats. Falls back to the defaults in `src/config/site.ts` when unset or
  unreachable.
- `PUBLIC_STATICFORMS_KEY` — StaticForms API key for the contact form.

> [!WARNING]
> Because `.env` files are ignored by git (for security reasons), your deployment
> platform (e.g., Cloudflare Pages) **will not automatically see your secrets**.

### Setting up on Cloudflare Pages

To ensure your stats load correctly in production:

1. Go to your Cloudflare Dashboard and open this Pages project.
2. Navigate to **Settings** -> **Environment variables**.
3. Add `GIST_STATS_URL` (and `PUBLIC_STATICFORMS_KEY` for the contact form).
4. Save and trigger a new deployment. Cloudflare will now securely bake your live
   stats into the static site!

## 🌐 Deployment

The site builds to a **purely static** bundle (`astro build`) and deploys to
**Cloudflare Pages**. Security headers are provided by `public/_headers`, which
Cloudflare Pages applies automatically.
