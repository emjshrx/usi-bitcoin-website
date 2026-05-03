# USI Bitcoin Club — website

Static site for **Bitcoin USI Club**, built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/), published on **GitHub Pages** via **GitHub Actions** on every push to `main`.

## Local development

Requires [Node.js](https://nodejs.org/) 20+ (see `.nvmrc`).

```bash
npm install
npm run dev
```

For `npm run dev` and `npm run preview`, open the site at **`http://localhost:4321/`** (Italian default) and **`http://localhost:4321/en/`** for English.

**Languages:** Italian is the default (`/`). English uses the same layout at **`/en/`**. Translatable copy lives in [`src/data/site.json`](src/data/site.json) (IT) and [`src/data/site.en.json`](src/data/site.en.json) (EN). Shared URLs and asset paths (report PDF, Luma, forms, Telegram, social URLs, logos, team photos, hero images) are defined once in [`src/data/config.json`](src/data/config.json); [`src/data/siteData.ts`](src/data/siteData.ts) merges them at build time.

Production build:

```bash
npm run build
npm run preview
```

The repository includes `package-lock.json`; CI uses `npm ci` for reproducible installs.

## Content for non-developers

See **[MAINTAINERS.md](./MAINTAINERS.md)**.

## Deploy

1. Repository → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.
2. The workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) runs on every push to `main`.
3. In [`astro.config.mjs`](./astro.config.mjs), set `site` to the canonical production URL and `base` to `"/"` (dedicated domain), or for a project under `github.io`, to the correct URL and `/<repo>/` path.

Production URL: [https://bitcoinclub.ch](https://bitcoinclub.ch) (and `/en/` for English).

## Design references

Screenshots from the Canva deck are in [`docs/reference/`](./docs/reference/). PDFs and source images remain in the repository root.
