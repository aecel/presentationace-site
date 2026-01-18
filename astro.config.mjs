// @ts-check

import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
// https://astro.build/config
export default defineConfig({
  site: "https://presentationace.com", // your custom domain (future canonical URL)
  base: "/", // because the custom domain will point to the root of the project
  integrations: [sitemap()],
})
