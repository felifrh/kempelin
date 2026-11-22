# Kempelin website

One-page site for Kempelin (Seoul-based U.S. commerce operations team for Korean brands).
Plain HTML, CSS and JavaScript. No build step, no framework, no cookies, no forms, no analytics.

## Structure

```
index.html              markup, all six sections (start, idea, services, explore, work, contact)
assets/css/main.css     all styles
assets/js/main.js       all behaviour: swift (Three.js), intro, services, simulations, phone reveal
assets/img/             pictures (work-*, sim-*, poster-*); work-* are placeholders
assets/video/           short clips for the Instagram and TikTok simulations
favicon.svg             swift in dark olive on acid
vendor/three.min.js     Three.js r128 (fetched by scripts/fetch-vendor.sh, see below)
vercel.json             security headers and caching
robots.txt
scripts/fetch-vendor.sh
```

## Run locally

```
python3 -m http.server 8000
```

Open http://localhost:8000. Opening index.html directly from disk also works for most parts, but videos may be blocked by the browser.

## Before going live

1. `bash scripts/fetch-vendor.sh` to download Three.js into `vendor/`. Until then the page falls back to the cdnjs copy.
2. Fonts: the page still loads Familjen Grotesk and IBM Plex Mono from Google Fonts (see the `<link>` in `index.html`). Replace with self-hosted woff2 files in `assets/fonts/` and `@font-face` rules, then remove `fonts.googleapis.com` and `fonts.gstatic.com` from the Content-Security-Policy in `vercel.json`. ABC Gaisyr Mono Light is licensed; the client still has to deliver the webfont files.
3. Replace the placeholder pictures in `assets/img/work-*.jpg` with Kempelin's own work.
4. Final copy, phone number, email and address from the client; privacy notice (`#privacy`) reviewed.
5. Domain: add canonical URL, Open Graph tags (share image 1200 x 630) and the sitemap line in `robots.txt`.
6. Favicon set: `.ico`, apple-touch icon and web manifest are still to be made from `favicon.svg`.
7. Test the 3D swift on real phones (size and flight paths).

## Responsive behaviour

- Side padding is fluid (`--pad`, `--padr`): 20 px on phones, up to 128 px on wide windows.
- The swift reads the window aspect ratio: landscape (>= 1.05) uses the `L` poses, portrait the `M` poses (see `POSES` in `assets/js/main.js`).
- On the contact section the swift grows in smaller windows; on phones it keeps nearly the hero size and sits above the text.
- Services: one pinned row of four cards on wide windows (>= 900 px), one service at a time below that.

## Deploy

Static site. On Vercel: import the repository, framework preset "Other", no build command, output directory = root.
