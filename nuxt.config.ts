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
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ]
})
