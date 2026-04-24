import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// Production: custom domain. For GitHub Pages with a subpath, set `site` to your
// `https://<user>.github.io` URL and `base` to `/<repo>/` instead.
export default defineConfig({
  site: "https://bitcoinclub.ch",
  base: "/",
  integrations: [tailwind()],
});
