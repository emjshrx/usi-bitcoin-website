# USI Bitcoin Club — sito web

Sito statico per **Bitcoin USI Club**, generato con [Astro](https://astro.build/) e [Tailwind CSS](https://tailwindcss.com/), pubblicato su **GitHub Pages** tramite **GitHub Actions** ad ogni push su `main`.

## Sviluppo locale

Richiede [Node.js](https://nodejs.org/) 20+ (vedi `.nvmrc`).

```bash
npm install
npm run dev
```

With `base: '/usi-bitcoin-website'`, open **`http://localhost:4321/usi-bitcoin-website/`** for `npm run dev` and `npm run preview` (not the site root), so assets and routes resolve correctly.

**Languages:** Italian is the default (`/usi-bitcoin-website/`). English uses the same layout at **`/usi-bitcoin-website/en/`**. Translatable copy lives in [`src/data/site.json`](src/data/site.json) (IT) and [`src/data/site.en.json`](src/data/site.en.json) (EN). Shared URLs and asset paths (report PDF, Luma, forms, Telegram, social URLs, logos, team photos, hero images) live once in [`src/data/config.json`](src/data/config.json); [`src/data/siteData.ts`](src/data/siteData.ts) merges them at build time.

Build di produzione:

```bash
npm run build
npm run preview
```

Il repository include `package-lock.json`; in CI si usa `npm ci` per installazioni riproducibili.

## Contenuti per non sviluppatori

Vedi **[MAINTAINERS.md](./MAINTAINERS.md)**.

## Deploy

1. Repository → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.
2. Il workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) parte su ogni push su `main`.
3. Se cambi nome del repository o account GitHub, aggiorna `site` e `base` in [`astro.config.mjs`](./astro.config.mjs).

URL atteso: `https://emjshrx.github.io/usi-bitcoin-website/` (con questa configurazione).

## Riferimenti di design

Screenshot del deck Canva in [`docs/reference/`](./docs/reference/). PDF e immagini sorgente restano nella root del repo.
