import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// GitHub Pages project site: https://<user>.github.io/<repo>/
// If you fork or rename the repo, update `site` and `base` to match.
export default defineConfig({
  site: "https://emjshrx.github.io",
  base: "/usi-bitcoin-website",
  integrations: [tailwind()],
});
