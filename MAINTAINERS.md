# Come aggiornare il sito (senza programmare)

Il sito è generato da questo repository. Dopo ogni modifica su branch **`main`**, GitHub Actions ricostruisce e pubblica automaticamente su **GitHub Pages**.

**Sezioni opzionali** (report, prossimo evento, social, team, ecc.) compaiono sul sito **solo** quando i dati necessari sono presenti (in **`config.json`** per URL e percorsi immagine; in **`site.json`** / **`site.en.json`** per testi e elenchi). Eccezione: **Cosa facciamo** è visibile con il testo introduttivo e un promemoria se l’elenco eventi è vuoto.

**Contenuti condivisi (una sola modifica):** apri **`src/data/config.json`** per brand, immagini globali, `report.url`, `nextEvent.lumaUrl`, Telegram / email / QR, URL dei moduli (team, associazione), URL dei link social (nell’ordine corrispondente alle etichette nei file lingua), `url` e `logo` dei partner (stesso ordine dei `name` nei file lingua), e `photo` dei membri del team (stesso ordine dei membri nei file lingua).

**Versione inglese:** **`src/data/site.en.json`** ha la stessa struttura di **`site.json`** (solo testi tradotti). Pulsante in alto a destra nell’hero: **English** → `/en/`, **Italiano** → home. La chiave **`ui`** in ciascun file lingua contiene etichette dell’interfaccia (pulsante lingua, testi accessibilità, nota a piè pagina).

## Testi, link e immagini editabili

- **`src/data/site.json`** (italiano) e **`src/data/site.en.json`** (inglese): testi, titoli di sezione, eventi passati, nomi partner, membri team (nome, ruolo, bio), pulsanti tradotti.
- **`src/data/config.json`**: tutto ciò che è uguale per entrambe le lingue (vedi tabella sotto).

| Dove | Campo | Cosa cambia |
|------|--------|-------------|
| `config.json` | `brand` | Titolo principale e riga footer (es. Proof of Students Hub) |
| `config.json` | `report.url` | Link al PDF; se vuoto la sezione report non compare |
| `config.json` | `nextEvent.lumaUrl` | Link Luma (titolo/data/testo restano in `site.json` / `site.en.json`) |
| `site.json` (+ EN) | `nextEvent` | `title`, `datetime`, `description`, etichetta pulsante Luma |
| `site.json` (+ EN) | `cosaFacciamo` | Eventi passati: `events` con `title`, `date`, `description` |
| `config.json` | `social.links[].url` | URL dei social (in `site.json` / `site.en.json` solo `label` per ogni voce, **stesso ordine**) |
| `config.json` | `joinTeam.url` | Modulo candidatura; se vuoto la sezione non compare |
| `config.json` | `association.formUrl` | Modulo iscrizione; se vuoto la sezione non compare |
| `config.json` | `partners.items` | Per ogni partner: `url`, `logo` (path sotto `public/`); i **`name`** sono nei file lingua, **stesso ordine** |
| `config.json` | `team.members[].photo` | Foto per membro; **stesso ordine** di `members` nei file lingua (`name`, `role`, `bio`) |
| `config.json` | `join` | `joinUrl` (Telegram ecc.), `email`, `qrImage` (path sotto `public/`) |
| `config.json` | `images` | `logo`, `usiBuilding`, `footerStrip` (path sotto `public/`; `footerStrip` vuoto per nascondere) |
| `site.json` (+ EN) | `chiSiamo` / `missione` / `visione` | Titolo e testo delle tre schede |
| `site.json` (+ EN) | `join` | `title`, `bullets`, `tagline`, `joinButtonLabel` |
| `site.json` (+ EN) | `seo.description` | Descrizione per motori di ricerca |

Salva con **Commit changes** su `main`. Se aggiungi o togli voci (social, partner, membri team), aggiorna **sia** `config.json` **sia** i due file lingua così che gli array restino allineati (in build, numeri diversi generano un errore chiaro).

### Esempi di struttura (copia e adatta)

**Evento passato** (dentro `cosaFacciamo.events`):

```json
{ "title": "Workshop Lightning", "date": "2025-10-12", "description": "Intro ai pagamenti su second layer." }
```

**Link social:** in `site.json` / `site.en.json` solo etichetta; URL in `config.json` nella voce `social.links` corrispondente (stesso indice).

```json
{ "label": "Instagram" }
```

**Partner:** nome traducibile nei file lingua; `url` e `logo` in `config.json` sotto `partners.items` (stesso ordine).

```json
{ "name": "Nome partner" }
```

**Membro team:** nome, ruolo, bio nei file lingua; `photo` in `config.json` sotto `team.members` (stesso ordine).

```json
{ "name": "Nome Cognome", "role": "Presidente", "bio": "Breve frase." }
```

## Aggiungere o sostituire immagini

1. Carica il file in **`public/images/`** (es. `public/images/mia-foto.jpg`).
2. In `config.json`, aggiorna il percorso relativo a `public/`, es. `images/mia-foto.jpg` (senza slash iniziale), per logo, foto team, partner, QR, ecc.

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
