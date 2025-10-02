// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: [
    "~/assets/css/normalize.css",
    "~/assets/css/webflow.css",
    "~/assets/css/zayae-wellness.webflow.css",
  ],

  runtimeConfig: {
    shopifySecret: process.env.SHOPIFY_TOKEN,

    public: {
      shopifyApiKey: process.env.SHOPIFY_API,
    },
  },
});
