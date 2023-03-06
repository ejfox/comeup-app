// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // add tachyons css
  css: ['tachyons/css/tachyons.css'],
  modules: [
    // supabase
    '@nuxtjs/supabase',
  ],
})
