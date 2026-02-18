# Agency Vitrine — Frontend

This repository contains a responsive, animated landing site for a digital agency built with Vite + React + Tailwind CSS and Framer Motion.

What's included

- `src/` : React components and pages (Hero, Services, Process, Testimonials, Contact, FAQ, etc.)
- `api/contact.js` : Vercel-compatible serverless endpoint (SendGrid) to send contact emails (optional)
- `NOTES.md` : project notes and environment variable instructions

Quick start (on a machine with Node.js/npm)

```powershell
git clone https://github.com/othmanebke/agency-vitrine.git
cd agency-vitrine
git checkout NOVAWEB
npm install
npm run dev
```

If your work PC can't install Node (like the author mentioned), clone the repo on a personal machine that has Node and run the commands above.

Enabling the contact form

- Formspree (no backend): set `VITE_FORMSPREE=https://formspree.io/f/your-id` in a local `.env` file or in Vercel environment variables.
- Serverless (recommended): enable serverless with SendGrid by adding the following env vars on Vercel:
  - `SENDGRID_API_KEY` = <your_sendgrid_api_key>
  - `SENDGRID_TO` = <your_email>
  - `SENDGRID_FROM` = <optional_from_address>
  - `VITE_USE_SERVERLESS` = true

Deployment on Vercel (one-click)

1. Create a Vercel account and import the GitHub repository.
2. Set the Environment Variables (see above) under Project Settings → Environment Variables.
3. Trigger a deploy — Vercel will run `npm install` and `npm run build` automatically.

Notes

- The UI respects `prefers-reduced-motion` for accessibility.
- The Hero uses a decorative Lottie animation (lazy-loaded). Replace the URL or import a local JSON in `src/components/Hero.jsx` to use a specific animation.

If you want, I can: add unit tests, tune mobile spacing, or set up the Vercel project & environment variables for you.
