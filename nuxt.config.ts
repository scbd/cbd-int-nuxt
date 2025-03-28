// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    https:
    {
      key: './keys/localhost-key.pem',
      cert: './keys/localhost.pem'
    }
  },
  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/image'],
  runtimeConfig: {
    DRUPAL_CLIENT_SECRET: process.env.DRUPAL_CLIENT_SECRET,
    public: {
      DRUPAL_URL: process.env.DRUPAL_URL,
      DRUPAL_CLIENT_ID: process.env.DRUPAL_CLIENT_ID,
      DRUPAL_SCOPE: process.env.DRUPAL_SCOPE
    }
  },
  css: ['~/assets/scss/styles.scss'],
})