// @ts-check

import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
// https://astro.build/config

const SECRET_PATHS = ["/welcome", "/start"]

export default defineConfig({
  site: "https://presentationace.com", 
  base: "/", 
  integrations: [
    sitemap({
      filter: (page) => {
        const url = new URL(page)
        return !SECRET_PATHS.includes(url.pathname)
      },
    }),
  ],
})
