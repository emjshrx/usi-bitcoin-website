# USI Bitcoin Club — sito web

Sito statico per **Bitcoin USI Club**, generato con [Astro](https://astro.build/) e [Tailwind CSS](https://tailwindcss.com/), pubblicato su **GitHub Pages** tramite **GitHub Actions** ad ogni push su `main`.

## Sviluppo locale

Richiede [Node.js](https://nodejs.org/) 20+ (vedi `.nvmrc`).

```bash
npm install
npm run dev
```

For `npm run dev` and `npm run preview`, open the site at **`http://localhost:4321/`** (Italian default) and **`http://localhost:4321/en/`** for English.

**Languages:** Italian is the default (`/`). English uses the same layout at **`/en/`**. Translatable copy lives in [`src/data/site.json`](src/data/site.json) (IT) and [`src/data/site.en.json`](src/data/site.en.json) (EN). Shared URLs and asset paths (report PDF, Luma, forms, Telegram, social URLs, logos, team photos, hero images) live once in [`src/data/config.json`](src/data/config.json); [`src/data/siteData.ts`](src/data/siteData.ts) merges them at build time.

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
3. In [`astro.config.mjs`](./astro.config.mjs) imposta `site` sull’URL canonico in produzione e `base` su `"/"` (dominio dedicato) oppure, per un progetto sotto `github.io`, sull’URL e sul path `/<repo>/` corretti.

URL di produzione: [https://bitcoinclub.ch](https://bitcoinclub.ch) (e `/en/` per l’inglese).

## Riferimenti di design

Screenshot del deck Canva in [`docs/reference/`](./docs/reference/). PDF e immagini sorgente restano nella root del repo.
