# eLoveletter 💌

A personal digital love letter — an installable PWA. A sealed wax envelope opens with
an animation to reveal a letter, a photo gallery, and background music.

Built with Vite + React + TypeScript, `vite-plugin-pwa`, and Framer Motion. Deploys to
Vercel as a static site.

## Make it yours

Everything you edit lives in **one file**: [`src/content/letter.ts`](src/content/letter.ts).

1. **Write the letter** — set `to`, `from`, `date`, `envelopeNote`, `paragraphs`, `closing`.
2. **Add photos** — drop images into `public/photos/` and point `photos[]` at them
   (any format; update the paths). Placeholder images ship so it runs immediately.
3. **Add a song** — put an `.mp3` in `public/music/` and set `music.src`. The music
   control only appears once a valid song loads. Remove the `music` block to disable it.
4. **Swap the icons** (optional) — replace the PNGs in `public/icons/` to change the app
   icon and the theme.

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

Production preview (with the service worker active):

```bash
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new). Vercel auto-detects Vite
   (build `vite build`, output `dist/`). No config needed.
3. Open the live HTTPS URL on your phone → browser menu → **Add to Home Screen**.

> PWA install and offline require HTTPS, which Vercel provides automatically.

## Notes

- Fonts (Cormorant Garamond, EB Garamond, Great Vibes) are self-hosted via `@fontsource`,
  so the letter works fully offline once opened.
- Respects `prefers-reduced-motion`: the envelope opens instantly and ambient hearts are
  hidden for anyone who prefers less motion.
