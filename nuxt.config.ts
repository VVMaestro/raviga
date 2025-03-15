// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'vue-yandex-maps/nuxt',
    'nuxtjs-naive-ui',
  ],
  yandexMaps: {
    apikey: '4675ea5c-7d13-424f-bd4d-6a1710b28dfc'
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'vueuc']
    }
  },
});