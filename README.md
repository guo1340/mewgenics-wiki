# Mewgenics Wiki

A static, frontend-only Mewgenics wiki. No database, no build step, no
backend. Just HTML, CSS, and vanilla JavaScript — drop it on any static host.

## What's inside

```
mewgenics-wiki/
├── index.html         # SPA shell
├── css/
│   └── style.css      # All styling (dark theme)
├── js/
│   ├── data.js        # All wiki content lives here — edit this to add entries
│   └── app.js         # Hash router, search, filtering, rendering
└── README.md          # This file
```

## Features

- **Hash-based SPA routing** — `/cats`, `/cats/sir-whiskers`, etc. No server config needed.
- **Global search** with `/` keyboard shortcut.
- **Filterable + sortable tables** for cats, abilities, and items.
- **Cross-linking** — abilities link to the cats that use them, enemies link to their biomes, and so on.
- **Detail pages** auto-generated from `data.js` — no hand-written HTML per entry.
- **Persistent filter state** via `localStorage`.
- **Mobile-friendly** with collapsible side nav.
- **Patch notes log** so users know what's current.
- **Legal/compliance pages** for About, Privacy Policy, and Contact before enabling ads.
- **Dark theme** because game wikis live in dark mode.

## Adding content

Open `js/data.js` and append to the relevant array. The site re-renders automatically
on next page load — no build step.

### Add a cat

```js
{
  id: 'mr-paws',                    // unique kebab-case
  name: 'Mr. Paws',
  emoji: '🐱',
  type: 'water',                    // fire, water, earth, dark, light, air
  rarity: 'uncommon',               // common | uncommon | rare | epic | legendary
  sex: 'M',
  hp: 30, speed: 5,
  stats: { attack: 60, defense: 50, magic: 75, speed: 70, luck: 40 },
  traits: ['Healer'],
  genes: ['ff', 'WW', 'tt'],
  abilities: ['heal-lick', 'soak'], // ids must match abilities array
  lore: 'A short description shown on the detail page.',
  role: 'How to play this cat.'
}
```

### Add an ability / item / enemy / location / status / gene

Same pattern — see existing entries in each array for the schema.

### Add a strategy

```js
{
  id: 'my-build',
  title: 'My Build',
  author: 'community',
  tags: ['fire', 'damage'],
  summary: 'One-line summary.',
  body: 'Full strategy text.'
}
```

### Add a patch note

Prepend to the `patches` array (newest first):

```js
{
  version: '0.7.2',
  date: '2026-05-01',
  changes: ['What changed.', 'Another bullet.']
}
```

## Local preview

Because the site uses `file://`-safe inline data (no `fetch()` for data),
**you can open `index.html` directly in a browser**. No local server required.

If you'd rather use one (cleaner URLs, easier debugging):

```bash
# Python 3
python -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deploying to Cloudflare Pages (via GitHub)

1. **Create a GitHub repo** and push these files:

   ```bash
   cd mewgenics-wiki
   git init
   git add .
   git commit -m "Initial wiki"
   git branch -M main
   git remote add origin https://github.com/<you>/mewgenics-wiki.git
   git push -u origin main
   ```

2. **Connect Cloudflare Pages**:
   - Log into <https://dash.cloudflare.com> → Workers &amp; Pages → Create → Pages → Connect to Git.
   - Pick the repo.

3. **Build settings** (this is where it's easy to overthink — there's nothing to build):
   - Framework preset: **None**
   - Build command: _(leave empty)_
   - Build output directory: `/`
   - Root directory: _(leave empty unless you nested the wiki inside a subfolder)_

4. **Deploy**. You'll get a URL like `mewgenics-wiki.pages.dev`. Every push to `main` redeploys automatically.

5. **Custom domain (optional)**: Pages → your project → Custom domains → Set up a domain.

## Adding real game images

The wiki ships with stylized SVG sprites as fallbacks. To swap in real game
images:

1. Create an `img/` folder structure in the repo:
   ```
   img/
   ├── cats/
   ├── items/
   ├── abilities/
   ├── enemies/
   └── locations/
   ```
2. Drop your image files in (PNG or WebP recommended, ~256×256 or square).
3. In `js/data.js`, add an `image` field to the entry:
   ```js
   {
     id: 'sir-whiskers',
     name: 'Sir Whiskers',
     image: 'img/cats/sir-whiskers.png',  // ← add this
     ...
   }
   ```

The wiki uses the image when present and falls back to the SVG sprite
automatically — no code changes required.

## Legal pages before ads

This version includes these hash-routed pages:

- `/about`
- `/privacy-policy`
- `/contact`

Before applying for AdSense, update the placeholder contact email on the Contact page in `js/app.js`, then make sure these pages are linked in the footer and reachable from the deployed site.

## Setting up Google AdSense

Ad slots are already laid out across the site (top banner per page, two
rectangles in the right sidebar, a half-page in the left sidebar, and an
in-article slot at the bottom of every page). They render as inert
"Advertisement" placeholders until you wire up AdSense.

To enable ads:

1. Sign up at <https://www.google.com/adsense> and get your publisher ID
   (looks like `ca-pub-1234567890123456`).
2. In `index.html`, find the AdSense block in `<head>`, replace the
   placeholder publisher ID, and **uncomment** the `<script>` tag.
3. In your AdSense dashboard, create ad units (one each for: banner,
   rectangle, half-page, in-article).
4. In `js/app.js`, find the `adSlot()` function. Inside it, the commented-out
   `<ins class="adsbygoogle">` block is the AdSense snippet. Uncomment it and
   replace `data-ad-client` and `data-ad-slot` with your real values. You can
   either map each `format` to a different slot ID (recommended) or use a
   single auto-format unit for everything.

Until step 4 is done, the placeholders stay visible — useful for previewing
layout without actually serving ads.

## Roadmap (when you're ready to upgrade)

The static-only design has hard ceilings. When you hit them, here's where to go:

| You want to…              | Add this                                                                       |
| ------------------------- | ------------------------------------------------------------------------------ |
| Let users edit pages      | Switch to Astro/Hugo + GitHub PRs, or migrate to MediaWiki                     |
| Comments on pages         | Giscus (GitHub Discussions) — still no backend                                 |
| User accounts / favorites | Cloudflare Workers + KV or D1 (free tier)                                      |
| Better search             | Add Lunr.js or Pagefind for fuzzy + typo-tolerant search                       |
| Multilingual              | Split `data.js` into `data.en.js`, `data.ja.js` etc. and switch on a UI toggle |

## License

&copy; 2026. All rights reserved.

All content in this repository — including the wiki text, structure, code, and
data files — is reserved by the site owner. Do not redistribute without
permission.
