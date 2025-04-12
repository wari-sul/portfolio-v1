# portfolio-v1
Personal portfolio build for Cloudflare Worker deployment

**Note:** This repository represents an experimental branch. Features developed here may eventually be merged into the main repository for deployment.

## Implemented Features

*   **Core Portfolio Features:**
    *   Responsive design using Tailwind CSS.
    *   Hero section with profile picture and animated typing effect (`TypeAnimation`).
    *   About section detailing professional summary and stats.
    *   Interactive Skills section with accordion display (`framer-motion`).
    *   Experience section with accordion display (`framer-motion`).
    *   Portfolio section showcasing projects with a coverflow slider (`Swiper`).
    *   Contact form component (assuming `Contact.jsx` is functional).
    *   Navigation bar (`Navbar.jsx`).
    *   Footer section (`Footer.jsx`).
    *   Back-to-top button (`BackToTop.jsx`).
    *   Shiny effect on hover for icons/images (`ShinyEffect.jsx`).

*   **SEO Enhancements:**
    *   Added `robots.txt` to guide web crawlers.
    *   Added `sitemap.xml` and linked it in `robots.txt`.
    *   Included a meta description tag in `index.html`.
    *   Optimized the page `<title>` for better description.
    *   Corrected heading structure (`h1`, `h2`, `h3`) across components.
    *   Improved image `alt` text for accessibility and SEO.
    *   Added detailed `Person` structured data (schema markup) to `index.html`.


## Future Enhancements

*   **Admin Dashboard:** Implement a dashboard (potentially using a BaaS like Supabase) to allow dynamic updates of:
    *   Tech stack/skills
    *   Social media links
    *   Portfolio projects (add/remove/edit)
    *   About section content
    *   Experience section content
