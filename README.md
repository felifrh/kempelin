# Kempelin website

One-page site for Kempelin (Seoul-based U.S. commerce operations team for Korean brands).
Plain HTML, CSS and JavaScript (ES modules). No build step, no framework, no cookies, no forms, no analytics.
Specification: the Website PRD (Draft 1, 17 Nov 2026).

## Structure

```
index.html                 markup, six sections + dialogs (simulations, privacy)
css/
  tokens.css               colours, fonts, spacing, easing (change the look here)
  base.css                 reset, header/nav, intro, cursor, reveal, skip link, 404
  sections.css             hero, idea, services (pinned), explore, work, contact
  simulations.css          overlays: amazon, instagram, tiktok, funding, privacy
js/
  boot.js                  runs first in <head>: js class, scroll reset, intro state
  main.js                  entry point, imports the modules below
  util.js                  shared helpers
  nav.js                   anchor scrolling, section state, nav highlight
  poses.js                 flight path of the swift (one pose per section)
  bird.js                  the swift (Three.js) with flat SVG fallback
  intro.js                 opening animation
  services.js              pinned, scroll-driven service cards
  simulations.js           overlays, hash routing, amazon calculator, funding finder
  dialog.js                focus trap and inert background for overlays
  contact.js, phone.js     phone/email assembled from parts, reveal button
  reveal.js, cursor.js, pictures.js
  three-fallback.js        loads Three.js from cdnjs until vendor/ exists
content/
  strings.en.js            all text that scripts insert (hints, calculator labels, funding programmes)
  contact.js               phone and email in pieces (PLACEHOLDER values)
assets/img, assets/video   pictures and clips (work-* are placeholders)
assets/icons, assets/og    app icons and the share image (placeholder design)
favicon.svg, favicon.ico, site.webmanifest
sitemap.xml, robots.txt, 404.html
vercel.json                security headers (CSP), caching, www redirect
scripts/fetch-vendor.sh
```

Visible page copy lives in `index.html` as real HTML text (needed for search engines and visitors without JavaScript).
Text inserted by scripts lives in `content/`. For the Korean version: add `content/strings.ko.js` and a `/ko/` page.

## Run locally

```
python3 -m http.server 8000
```

Open http://localhost:8000. ES modules need a server; opening index.html from disk does not work.

## Deep links

`#hero #idea #services #explore #work #contact`, simulations `#sim-amazon #sim-instagram #sim-tiktok #sim-funding`, privacy notice `#privacy`. Escape closes an overlay.

## Before going live

1. `bash scripts/fetch-vendor.sh` to download Three.js into `vendor/`; then delete `js/three-fallback.js` and its `<script>` tag, and remove `https://cdnjs.cloudflare.com` from the CSP in `vercel.json`.
2. Fonts: the page still loads Familjen Grotesk and IBM Plex Mono from Google Fonts. Replace with self-hosted woff2 files in `assets/fonts/` and `@font-face` rules in `css/tokens.css`, then remove `fonts.googleapis.com` and `fonts.gstatic.com` from the CSP and the `<link>` in `index.html`. ABC Gaisyr Mono Light is licensed; the client still has to deliver the webfont files.
3. Domain: `https://kempelin.com` is a placeholder in `index.html` (canonical, Open Graph, JSON-LD), `sitemap.xml`, `robots.txt` and the www redirect in `vercel.json`. Replace everywhere once the domain is final.
4. Contact data: `content/contact.js` holds placeholder phone and email. The address is in `index.html` (footer and privacy notice).
5. Privacy notice (`#privacy` in `index.html`): must be reviewed by the client or a lawyer (operator, hosting region, Korean PIPA).
6. Share image `assets/og/share.png` is a placeholder (system font, not the brand font); replace with the designed asset. Check previews in LinkedIn, iMessage and KakaoTalk.
7. Replace the placeholder pictures `assets/img/work-*.jpg` and their alt texts with Kempelin's own work.
8. Test the 3D swift on real phones; run Lighthouse, axe, a keyboard pass and VoiceOver (PRD 13).

## Security

`vercel.json` sets a strict Content-Security-Policy (`default-src 'self'`, no inline scripts or styles), HSTS, nosniff, Referrer-Policy, Permissions-Policy and `frame-ancestors 'none'`. Do not add inline `<script>` or `style=""` attributes; put code in `js/` and styles in `css/`. The two temporary allowances (cdnjs, Google Fonts) are listed in the steps above.

## Responsive behaviour

- Side padding is fluid (`--pad`, `--padr`): 20 px on phones, up to 128 px on wide windows.
- The swift reads the window aspect ratio: landscape (>= 1.05) uses the `L` poses, portrait the `M` poses (see `js/poses.js`).
- On the contact section the swift grows in smaller windows; on phones it keeps nearly the hero size and sits above the text.
- Services: one pinned row of four cards on wide windows (>= 900 px), one service at a time below that.

## Deploy

Static site. On Vercel: import the repository, framework preset "Other", no build command, output directory = root.
