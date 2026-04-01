# Come aggiornare il sito (senza programmare)

Il sito è generato da questo repository. Dopo ogni modifica su branch **`main`**, GitHub Actions ricostruisce e pubblica automaticamente su **GitHub Pages**.

## Testi, link e immagini editabili

Apri su GitHub il file **`src/data/site.json`** e clicca la matita (Edit).

| Campo | Cosa cambia |
|--------|-------------|
| `brand.title` | Titolo principale del club |
| `brand.colophon` | Riga nel footer (es. Proof of Students Hub) |
| `chiSiamo` / `missione` / `visione` | Titolo e testo delle tre schede |
| `join.bullets` | Elenco puntato sotto “Unisciti a noi” |
| `join.tagline` | Oggetto con `before`, `emphasis` (es. `UNI`), `after` per il payoff in inglese |
| `join.joinUrl` | Link al gruppo Telegram / WhatsApp / ecc. |
| `join.joinButtonLabel` | Testo del pulsante |
| `join.qrImage` | Opzionale: percorso immagine QR sotto `public/` (es. `images/qr.png`); stringa vuota per nasconderla |
| `join.email` | Se metti un’email, compare un link `mailto:` |
| `images.logo` | Percorso immagine logo (sotto `public/`) |
| `images.usiBuilding` | Foto USI (sotto `public/`) |
| `images.footerStrip` | Foto larga in fondo; lascia `""` per nasconderla |
| `seo.description` | Descrizione per motori di ricerca |

Salva con **Commit changes** su `main`.

## Aggiungere o sostituire immagini

1. Carica il file in **`public/images/`** (es. `public/images/mia-foto.jpg`).
2. In `site.json`, aggiorna il percorso relativo a `public/`, es. `images/mia-foto.jpg` (senza slash iniziale).

## Deploy e URL

- **Impostazioni repository → Pages:** sorgente **GitHub Actions**.
- Se rinomini il repository o usi un altro account, aggiorna **`astro.config.mjs`**: valori `site` e `base` devono corrispondere a `https://<utente>.github.io/<repo>/`.

## Sviluppo locale (sviluppatori)

```bash
npm install
npm run dev
npm run build
npm run preview
```
