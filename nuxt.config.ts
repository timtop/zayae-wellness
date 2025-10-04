// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Zayae Wellness",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.jpg" }],
      meta: [
        {
          name: "description",
          content: "Restore you balance, Reclaim your glow.",
        },

        // Open Graph
        { property: "og:title", content: "Zayae Wellness" },
        {
          property: "og:description",
          content: "Restore you balance, Reclaim your glow.",
        },
        { property: "og:image", content: "/open-graph.jpg" },
        { property: "og:url", content: "https://zayaewellness.com" },
        { property: "og:type", content: "website" },

        // Twitter Card (optional)
        { name: "twitter:card", content: "Zayae Wellness" },
        { name: "twitter:title", content: "Zayae Wellness" },
        {
          name: "twitter:description",
          content: "Restore you balance, Reclaim your glow.",
        },
        { name: "twitter:image", content: "/open-graph.jpg" },
      ],
    },
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: [
    "~/assets/css/normalize.css",
    "~/assets/css/webflow.css",
    "~/assets/css/zayae-wellness.webflow.css",
  ],

  runtimeConfig: {
    public: {
      shopifyApi: process.env.SHOPIFY_API,
      shopifySecret: process.env.SHOPIFY_TOKEN,
    },
  },
});
