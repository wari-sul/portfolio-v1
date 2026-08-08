# 🌟 SM WARISUL A. RAFIN - Elite V3 Portfolio

Welcome to the **v3-experimental** iteration of my professional portfolio! This site is engineered for maximum performance, striking aesthetics, and elite interactive physics.

## ✨ Features
- **Interactive 3D WebGL Background**: Custom particle field reacting to mouse movement built with Three.js.
- **Physical Smooth Scroll**: Lenis inertial scrolling physics.
- **Luxury Typography**: Typeset in Clash Display (Headings) and Satoshi (Body).
- **Glassmorphism & Preserve-3D Tilt**: Bento boxes physically tilt with glare based on mouse position.

## 🚀 Deployment & Environment Variables (IMPORTANT)

This project requires two environment variables to function correctly in production:

### `GIST_STATS_URL` — Live Stats Source
Dynamically fetches live stats (Projects, Experience, Clients) from a GitHub Gist during the build phase.

### `PUBLIC_STATICFORMS_KEY` — Contact Form Backend
Required for the contact form to submit. Get your key at [StaticForms](https://www.staticforms.xyz). Without this key, the contact form will silently fail to submit.

> [!WARNING]
> Because `.env` files are ignored by git (for security reasons), your deployment platform (e.g., Cloudflare Pages, Vercel) **will not automatically see your secrets**.

Copy `.env.example` to `.env` and fill in your values for local development.

### Setting up on Cloudflare Pages
To ensure your site works correctly in production:
1. Go to your Cloudflare Dashboard and open this Pages project.
2. Navigate to **Settings** -> **Environment variables**.
3. Add the following variables:
   - **Name**: `GIST_STATS_URL` — **Value**: `https://gist.githubusercontent.com/wari-sul/.../raw/stats.json`
   - **Name**: `PUBLIC_STATICFORMS_KEY` — **Value**: your key from staticforms.xyz
4. Save and trigger a new deployment.

## 🧞 Development Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server                          |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally                       |
| `npm run check`           | Run Astro type-checking                          |
