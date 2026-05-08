# Mewgenics Wiki

A static, frontend-only fan wiki for Mewgenics. No database, no build step, no
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

- **Hash-based SPA routing** — `#/cats`, `#/cats/sir-whiskers`, etc. No server config needed.
- **Global search** with `/` keyboard shortcut.
- **Filterable + sortable tables** for cats, abilities, and items.
- **Cross-linking** — abilities link to the cats that use them, enemies link to their biomes, and so on.
- **Detail pages** auto-generated from `data.js` — no hand-written HTML per entry.
- **Persistent filter state** via `localStorage`.
- **Mobile-friendly** with collapsible side nav.
- **Patch notes log** so users know what's current.
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
   - Build command: *(leave empty)*
   - Build output directory: `/`
   - Root directory: *(leave empty unless you nested the wiki inside a subfolder)*

4. **Deploy**. You'll get a URL like `mewgenics-wiki.pages.dev`. Every push to `main` redeploys automatically.

5. **Custom domain (optional)**: Pages → your project → Custom domains → Set up a domain.

## Roadmap (when you're ready to upgrade)

The static-only design has hard ceilings. When you hit them, here's where to go:

| You want to… | Add this |
| --- | --- |
| Let users edit pages | Switch to Astro/Hugo + GitHub PRs, or migrate to MediaWiki |
| Comments on pages | Giscus (GitHub Discussions) — still no backend |
| User accounts / favorites | Cloudflare Workers + KV or D1 (free tier) |
| Real images / sprites | Drop them in `/img`, reference from `data.js` |
| Better search | Add Lunr.js or Pagefind for fuzzy + typo-tolerant search |
| Multilingual | Split `data.js` into `data.en.js`, `data.ja.js` etc. and switch on a UI toggle |

## License + disclaimer

Mewgenics is © its respective developers. This is an unofficial fan-built wiki —
all content in `data.js` is community-contributed and should be treated as
unverified placeholder until cross-checked against the actual game.
