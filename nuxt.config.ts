// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    locales: [
      { code: 'en', language: 'en-US' },
      { code: 'fr', language: 'fr-FR' }
    ],
    defaultLocale: 'fr',
  }
})