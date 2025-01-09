// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: {
    '@': resolve(__dirname, './'),
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    // '@maptiler/weather',
    // '@maptiler/sdk',
    '@nuxt/icon',
    '@nuxt/image',
    // 'shadcn-nuxt',
  ],
  i18n: {
    lazy: false,
    langDir: 'langs/',
    locales: [
      { code: 'en', language: 'en-US', file: 'en-US.json' },
      { code: 'fr', language: 'fr-FR', file: 'fr-FR.json' }
    ],
    defaultLocale: 'fr',
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY,
      API_MAP: process.env.API_MAP
    },
  },
  ssr: false,  
})