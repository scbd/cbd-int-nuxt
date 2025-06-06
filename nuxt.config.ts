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
    "@nuxtjs/i18n",
    "@nuxt/image",
    'nuxt-gtag',
    '@nuxtjs/robots',
  ],
  i18n: {
    locales: [
      { code: 'ar', iso: 'ar-SA',  dir: 'rtl', file: 'ar.json' },
      { code: 'en', iso: 'en-US',              file: 'en.json' },
      { code: 'fr', iso: 'fr-FR',              file: 'fr.json' },
      { code: 'es', iso: 'es-ES',              file: 'es.json' },
      { code: 'ru', iso: 'ru-RU',              file: 'ru.json' },
      { code: 'zh', iso: 'zh-CN',              file: 'zh.json' },
    ],
      defaultLocale: 'en',
      detectBrowserLanguage : {
          alwaysRedirect: true,
          fallbackLocale: 'en'
    },
  },
  gtag: {
    id: process.env.GTAG
  },
  site: { indexable: false },
  runtimeConfig: {
    DRUPAL_CLIENT_SECRET: process.env.DRUPAL_CLIENT_SECRET,
    public: {
      DRUPAL_URL: process.env.DRUPAL_URL,
      DRUPAL_CLIENT_ID: process.env.DRUPAL_CLIENT_ID,
      DRUPAL_SCOPE: process.env.DRUPAL_SCOPE,
      SOLR_QUERY: process.env.SOLR_QUERY,
      IMAGE_URL: process.env.IMAGE_URL,
    },
  },
  css: ["~/assets/scss/styles.scss"],
});