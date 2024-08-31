import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";
import webmanifest from "astro-webmanifest";

import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://adhan.app",
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
    react(),
    webmanifest({
      name: "AdhanApp",
      icon: "/favicon.svg",
      short_name: "AA",
      description: "Malaysia's Prayer Times",
      start_url: "/",
      theme_color: "#ffb86c",
      background_color: "#ffb86c",
      display: "standalone",
    }),
    robotsTxt({
      sitemap: ["https://adhan.app/sitemap-index.xml"],
    }),
  ],
});
