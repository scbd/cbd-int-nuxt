// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  devServer: {
    https: {
      key: "./keys/localhost-key.pem",
      cert: "./keys/localhost.pem",
    },
  },
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/image",
    "nuxt-gtag",
    "@nuxtjs/robots",
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  i18n: {
    locales: [
      { code: "ar", iso: "ar-SA", dir: "rtl", file: "ar.json" },
      { code: "en", iso: "en-US", file: "en.json" },
      { code: "fr", iso: "fr-FR", file: "fr.json" },
      { code: "es", iso: "es-ES", file: "es.json" },
      { code: "ru", iso: "ru-RU", file: "ru.json" },
      { code: "zh", iso: "zh-CN", file: "zh.json" },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: {
      alwaysRedirect: true,
      fallbackLocale: "en",
    },
    strategy: "no_prefix",
  },
  gtag: {
    id: "",
  },
  site: { indexable: false },
  runtimeConfig: {
    DRUPAL_CLIENT_SECRET: "",
    public: {
      DRUPAL_URL: "",
      DRUPAL_CLIENT_ID: "",
      DRUPAL_SCOPE: "",
      SOLR_QUERY: "",
      FRONTEND_URL: "",
      IMAGE_URL: "",
    },
  },
  css: ["~/assets/scss/styles.scss"],
});
