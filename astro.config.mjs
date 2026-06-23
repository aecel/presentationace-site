// @ts-check

import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
// https://astro.build/config

const SECRET_PATHS = ["/welcome", "/start"]

export default defineConfig({
  site: "https://presentationace.com", // your custom domain (future canonical URL)
  base: "/", // because the custom domain will point to the root of the project
  integrations: [
    sitemap({
      filter: (page) => {
        // page is a full URL like "https://something.com/secret"
        const url = new URL(page)
        return !SECRET_PATHS.includes(url.pathname)
      },
    }),
  ],
})
