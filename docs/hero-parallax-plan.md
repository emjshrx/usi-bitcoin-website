# Layered parallax hero — implementation plan

Replace the current single-photo hero in [`src/components/HomePage.astro`](../src/components/HomePage.astro) with a 4-layer parallax hero (sky / far mountains / near mountains / lake-foreground) cut from the existing Lugano photo, driven by [Lenis](https://github.com/darkroomengineering/lenis) smooth-scroll for a [premai.io](https://www.premai.io/)-style feel.

> **Note**: image-cutting is done manually outside the app. This document specifies the expected asset deliverables and the code work to wire them up.

---

## Reference & current state

- **Reference**: [premai.io](https://www.premai.io/) hero — Lenis smooth-scroll + RAF transforms moving stacked DOM layers at different rates (not `background-attachment: fixed`).
- **Current hero**: [`src/components/HomePage.astro`](../src/components/HomePage.astro) lines 52–85 (single `#hero-bg` div, one flat photo, single-speed parallax via the inline script lines 376–392).
- **Current source image**: [`public/images/orientamento-correzione_obiettivo_-_9.jpg`](../public/images/orientamento-correzione_obiettivo_-_9.jpg), referenced from [`src/data/config.json`](../src/data/config.json) as `images.hero` (string).

---

## Layer composition

```mermaid
flowchart TB
  subgraph Stack [Z-stack back to front]
    sky[Layer 1 sky and clouds<br/>speed 0.05]
    far[Layer 2 far mountains<br/>speed 0.15]
    near[Layer 3 near mountains and coastline<br/>speed 0.30]
    lake[Layer 4 lake and city foreground<br/>speed 0.50]
    title[Layer 5 headline Bitcoin USI Club<br/>speed 0.20]
  end
  sky --> far --> near --> lake --> title
```

Speeds are translateY multipliers applied to `lenis.scroll`; later (foreground) layers move faster, creating depth. Tune speeds during QA.

---

## 1. Asset deliverables (manual cut, dropped into `public/images/hero/`)

Each layer must be **inpainted behind the layers in front of it** so no holes appear when the layers separate on scroll. Aspect ratio of each PNG/WebP should roughly match the original photo, with **~20% extra vertical bleed** above and below the visible area so translation never exposes the file edge.

Because parallax runs on **mobile too**, ship two resolutions per layer (desktop + mobile) and select via `srcset` so phones don't download 2400px assets:

| Layer | Desktop file | Mobile file | Transparency |
| --- | --- | --- | --- |
| Sky | `hero-sky.webp` (~2400×1400) + `.jpg` fallback | `hero-sky-sm.webp` (~960×560) | None — back layer |
| Far mountains | `hero-mountains-far.webp` (~2400×900) + `.png` fallback | `hero-mountains-far-sm.webp` (~960×360) | Transparent above the ridge |
| Near mountains | `hero-mountains-near.webp` (~2400×700) + `.png` fallback | `hero-mountains-near-sm.webp` (~960×280) | Transparent above the silhouette |
| Lake / foreground | `hero-lake.webp` (~2400×900) + `.png` fallback | `hero-lake-sm.webp` (~960×360) | Transparent above the waterline |

Budgets (WebP quality ~75, raster fallback only when WebP unsupported):

- Mobile total: **≤ 180 KB**
- Desktop total: **≤ 450 KB**

---

## 2. Dependencies

```bash
npm install lenis
```

`lenis` is ~9 KB gzip, MIT-licensed, framework-agnostic. Same library premai.io uses.

---

## 3. Config + types

Update [`src/data/config.json`](../src/data/config.json) — change `images.hero` from a string to a layered object, with `desktop` + `mobile` paths per layer:

```json
"images": {
  "logo": "images/pos_hub_logo.jpeg",
  "hero": {
    "sky": {
      "desktop": "images/hero/hero-sky.webp",
      "mobile": "images/hero/hero-sky-sm.webp"
    },
    "mountainsFar": {
      "desktop": "images/hero/hero-mountains-far.webp",
      "mobile": "images/hero/hero-mountains-far-sm.webp"
    },
    "mountainsNear": {
      "desktop": "images/hero/hero-mountains-near.webp",
      "mobile": "images/hero/hero-mountains-near-sm.webp"
    },
    "lake": {
      "desktop": "images/hero/hero-lake.webp",
      "mobile": "images/hero/hero-lake-sm.webp"
    }
  }
}
```

Propagate the type change through [`src/data/siteData.ts`](../src/data/siteData.ts) and update the consumer in [`src/components/HomePage.astro`](../src/components/HomePage.astro) (line 40 currently reads `site.images.hero` as a string).

---

## 4. New component: `src/components/HeroParallax.astro`

Extract the hero from `HomePage.astro` into its own component for clarity. Renders the 5 stacked layers as absolutely-positioned `<div>`s inside a `relative overflow-hidden` section sized at `min-h-[100svh]`. Each image layer uses `<picture>` with WebP + raster fallback, `loading="eager"`, and `fetchpriority="high"` on the sky layer.

Skeleton:

```astro
---
import { withBase } from "../utils/withBase";
import type { SiteData } from "../data/siteData";

interface Props { site: SiteData; lang: "it" | "en"; }
const { site, lang } = Astro.props;
const asset = withBase;
const en = lang === "en";
const { sky, mountainsFar, mountainsNear, lake } = site.images.hero;
---

<section id="hero" class="relative overflow-hidden min-h-[100svh]" aria-label={site.brand.title}>
  <div data-parallax data-speed-desktop="0.05" data-speed-mobile="0.04" class="hero-layer" aria-hidden="true">
    <img
      src={asset(sky.desktop)}
      srcset={`${asset(sky.mobile)} 960w, ${asset(sky.desktop)} 2400w`}
      sizes="100vw"
      alt=""
      fetchpriority="high"
      loading="eager"
    />
  </div>
  <div data-parallax data-speed-desktop="0.15" data-speed-mobile="0.10" class="hero-layer" aria-hidden="true">
    <img
      src={asset(mountainsFar.desktop)}
      srcset={`${asset(mountainsFar.mobile)} 960w, ${asset(mountainsFar.desktop)} 2400w`}
      sizes="100vw"
      alt=""
      loading="eager"
    />
  </div>
  <div data-parallax data-speed-desktop="0.30" data-speed-mobile="0.20" class="hero-layer" aria-hidden="true">
    <img
      src={asset(mountainsNear.desktop)}
      srcset={`${asset(mountainsNear.mobile)} 960w, ${asset(mountainsNear.desktop)} 2400w`}
      sizes="100vw"
      alt=""
      loading="eager"
    />
  </div>
  <div data-parallax data-speed-desktop="0.50" data-speed-mobile="0.32" class="hero-layer" aria-hidden="true">
    <img
      src={asset(lake.desktop)}
      srcset={`${asset(lake.mobile)} 960w, ${asset(lake.desktop)} 2400w`}
      sizes="100vw"
      alt=""
      loading="eager"
    />
  </div>

  <div class="absolute inset-0 bg-black/35" aria-hidden="true"></div>

  <div data-parallax data-speed-desktop="0.20" data-speed-mobile="0.14" class="relative z-10 flex h-full w-full items-end px-6 pb-20 md:px-16">
    <div>
      <h1 class="text-6xl font-black uppercase leading-none tracking-tight text-white drop-shadow-xl md:text-8xl lg:text-9xl">
        {site.brand.title}
      </h1>
      <p class="mt-4 text-base font-semibold tracking-wide text-white/65 drop-shadow md:text-lg">
        {en
          ? "First Bitcoin University Club in Switzerland · USI · Lugano"
          : "Primo Bitcoin University Club in Svizzera · USI · Lugano"}
      </p>
    </div>
  </div>

  <div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" aria-hidden="true"></div>
</section>

<style>
  .hero-layer { position: absolute; inset: -10% 0; will-change: transform; transform: translate3d(0, 0, 0); backface-visibility: hidden; }
  .hero-layer img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
</style>
```

Then in [`src/components/HomePage.astro`](../src/components/HomePage.astro) replace lines 52–85 (the inline `<section>`) with:

```astro
<HeroParallax site={site} lang={lang} />
```

…and remove the inline parallax `<script>` block at lines 376–392.

---

## 5. Smooth-scroll + parallax init (desktop & mobile)

Add a single global module script. Recommended: new `src/components/SmoothScroll.astro` mounted once in [`src/layouts/Layout.astro`](../src/layouts/Layout.astro) just before `<slot />` closes (so it ships site-wide).

Parallax must run on **both desktop and mobile**. We do this by:

1. Initializing Lenis with `smoothWheel: true` for desktop and `syncTouch: true` so touch scroll on phones also flows through Lenis's RAF loop and emits a single unified `scroll` stream.
2. Picking the per-layer speed from `data-speed-desktop` or `data-speed-mobile` based on a `(max-width: 767px)` media query, so the parallax range stays sensible on small viewports (where the section is much shorter and aggressive translations would overshoot the bleed).
3. Updating speeds on resize / orientation change.

```astro
---
// src/components/SmoothScroll.astro
---
<script>
  import Lenis from "lenis";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce) {
    const mqMobile = window.matchMedia("(max-width: 767px)");

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchMultiplier: 1,
    });

    const layers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );

    let speeds: number[] = [];
    const computeSpeeds = () => {
      const isMobile = mqMobile.matches;
      speeds = layers.map((el) => {
        const raw = isMobile
          ? el.dataset.speedMobile ?? el.dataset.speed
          : el.dataset.speedDesktop ?? el.dataset.speed;
        return parseFloat(raw || "0");
      });
    };
    computeSpeeds();
    mqMobile.addEventListener("change", computeSpeeds);
    window.addEventListener("resize", computeSpeeds, { passive: true });

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      for (let i = 0; i < layers.length; i++) {
        layers[i].style.transform = `translate3d(0, ${scroll * speeds[i]}px, 0)`;
      }
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }
</script>
```

Notes:

- This must be a module `<script>` (no `is:inline`) so Astro bundles the `lenis` import.
- `syncTouch: true` makes Lenis drive touch-scroll through its own RAF, which keeps the parallax transforms in lockstep with finger movement on iOS/Android instead of stuttering between native scroll events. `syncTouchLerp` (~0.075) tames any "rubbery" feel.
- Mobile speeds are deliberately lower (~60–65% of desktop values) because the hero section is shorter on phones, so the same scroll distance covers proportionally more of the viewport.
- When `prefers-reduced-motion: reduce` is on we skip Lenis entirely; layers stay static, page uses the browser's native scroll.
- The existing scroll-spy in [`src/components/SiteHeader.astro`](../src/components/SiteHeader.astro) (lines 252–381) and the smooth-anchor scrolling already in place keep working — Lenis dispatches real `scroll` events on `window` and the `IntersectionObserver` continues to fire normally on both desktop and mobile.
- iOS-specific: the section uses `min-h-[100svh]` (small viewport height) so the address-bar collapse doesn't change the section height mid-scroll and cause layer jumps. `will-change: transform` + `translate3d(0,0,0)` baseline (set in §4 styles) promotes each layer to its own compositor layer for smooth GPU-accelerated transforms.

---

## 6. Accessibility & SEO

- One `<h1>` only (already the case).
- All layer `<img>` elements get `alt=""` and the wrapping layer gets `aria-hidden="true"` (decorative).
- The `<section>` keeps `aria-label={site.brand.title}`.
- Respect `prefers-reduced-motion` (handled in §5).

---

## 7. Cleanup

- Remove the inline parallax `<script>` block at the bottom of [`src/components/HomePage.astro`](../src/components/HomePage.astro) (lines 376–392) once `HeroParallax.astro` + the new init script handle it.
- Drop `site.images.hero` string handling at line 40 of `HomePage.astro` since the hero now reads the layered object directly inside `HeroParallax.astro`.
- The original [`public/images/orientamento-correzione_obiettivo_-_9.jpg`](../public/images/orientamento-correzione_obiettivo_-_9.jpg) can be kept as a backup until the cut layers are validated, then deleted to slim the repo.

---

## Resource checklist

- [ ] 4 desktop layered images **and** 4 mobile-resolution variants (WebP + raster fallback) under `public/images/hero/` — produced manually
- [ ] `lenis` npm dep added
- [ ] `images.hero` in [`src/data/config.json`](../src/data/config.json) reshaped from string to object of `{ desktop, mobile }` per layer
- [ ] `SiteData` type updated in [`src/data/siteData.ts`](../src/data/siteData.ts)
- [ ] New component `src/components/HeroParallax.astro` with `srcset` for each layer and `data-speed-desktop` / `data-speed-mobile` attributes
- [ ] Edit [`src/components/HomePage.astro`](../src/components/HomePage.astro) to use `<HeroParallax />` and drop the inline parallax script
- [ ] New `src/components/SmoothScroll.astro` (with `syncTouch: true` for mobile) mounted in [`src/layouts/Layout.astro`](../src/layouts/Layout.astro)
- [ ] QA desktop: reduced-motion fallback, scroll-spy still works, no horizontal overflow, image edges hidden during scroll
- [ ] QA mobile (real iOS Safari + Android Chrome): smooth touch parallax with `syncTouch`, no juddery bottom-bar resize, no white gap below lake layer at full scroll, mobile srcset variants actually load (verify in DevTools network panel)
