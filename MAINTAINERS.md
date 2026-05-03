# How to update the site (without coding)

The site is generated from this repository. After every change on the **`main`** branch, GitHub Actions rebuilds and publishes automatically to **GitHub Pages**.

**Optional sections** (report, next event, social, team, etc.) appear on the site **only** when the required data is present (in **`config.json`** for URLs and image paths; in **`site.json`** / **`site.en.json`** for text and lists). Exception: **What we do** is visible with the intro text and a reminder if the events list is empty.

**Shared content (single place to edit):** open **`src/data/config.json`** for brand, global images, `report.url`, `nextEvent.lumaUrl`, Telegram / email / QR, form URLs (team, association), social link URLs (in the same order as the labels in the language files), partner `url` and `logo` (same order as `name` in the language files), and team member `photo` (same order as members in the language files).

**English version:** **`src/data/site.en.json`** has the same structure as **`site.json`** (translated text only). Hero top-right: **English** → `/en/`, **Italiano** → home. The **`ui`** key in each language file holds interface labels (language button, accessibility text, footer note).

## Editable text, links, and images

- **`src/data/site.json`** (Italian) and **`src/data/site.en.json`** (English): copy, section titles, past events, partner names, team members (name, role, bio), translated buttons.
- **`src/data/config.json`**: everything identical across languages (see table below).

| Where | Field | What it changes |
|------|--------|-----------------|
| `config.json` | `brand` | Main title and footer line (e.g. Proof of Students Hub) |
| `config.json` | `report.url` | PDF link; if empty the report section is hidden |
| `config.json` | `nextEvent.lumaUrl` | Luma link (title/date/copy stay in `site.json` / `site.en.json`) |
| `site.json` (+ EN) | `nextEvent` | `title`, `datetime`, `description`, Luma button label |
| `site.json` (+ EN) | `cosaFacciamo` | Past events: `events` with `title`, `date`, `description` |
| `config.json` | `social.links[].url` | Social URLs (in `site.json` / `site.en.json` only `label` per entry, **same order**) |
| `config.json` | `joinTeam.url` | Application form; if empty the section is hidden |
| `config.json` | `association.formUrl` | Membership form; if empty the section is hidden |
| `config.json` | `partners.items` | Per partner: `url`, `logo` (path under `public/`); **`name`** values are in the language files, **same order** |
| `config.json` | `team.members[].photo` | Photo per member; **same order** as `members` in the language files (`name`, `role`, `bio`) |
| `config.json` | `join` | `joinUrl` (Telegram etc.), `email`, `qrImage` (path under `public/`) |
| `config.json` | `images` | `logo`, `usiBuilding`, `footerStrip` (paths under `public/`; empty `footerStrip` to hide) |
| `site.json` (+ EN) | `chiSiamo` / `missione` / `visione` | Title and body for the three tabs |
| `site.json` (+ EN) | `join` | `title`, `bullets`, `tagline`, `joinButtonLabel` |
| `site.json` (+ EN) | `seo.description` | Search engine description |

Save with **Commit changes** on `main`. If you add or remove entries (social, partners, team members), update **both** `config.json` **and** the two language files so arrays stay aligned (at build time, mismatched counts produce a clear error).

### Example shapes (copy and adapt)

**Past event** (inside `cosaFacciamo.events`):

```json
{ "title": "Lightning workshop", "date": "2025-10-12", "description": "Intro to second-layer payments." }
```

**Social link:** in `site.json` / `site.en.json` only the label; URL in `config.json` under the matching `social.links` entry (same index).

```json
{ "label": "Instagram" }
```

**Partner:** translatable name in the language files; `url` and `logo` in `config.json` under `partners.items` (same order).

```json
{ "name": "Partner name" }
```

**Team member:** name, role, bio in the language files; `photo` in `config.json` under `team.members` (same order).

```json
{ "name": "First Last", "role": "President", "bio": "Short sentence." }
```

## Adding or replacing images

1. Upload the file to **`public/images/`** (e.g. `public/images/my-photo.jpg`).
2. In `config.json`, update the path relative to `public/`, e.g. `images/my-photo.jpg` (no leading slash), for logo, team photos, partners, QR, etc.

## Deploy and URLs

- **Repository Settings → Pages:** source **GitHub Actions**.
- If you change host or public path, update **`astro.config.mjs`**: `site` = canonical URL (e.g. `https://bitcoinclub.ch` or `https://<user>.github.io`), `base` = `"/"` on a dedicated domain or `"/<repo>/"` on GitHub Pages without a custom domain.

## Local development (developers)

```bash
npm install
npm run dev
npm run build
npm run preview
```
