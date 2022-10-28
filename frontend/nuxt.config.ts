// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css'],
  modules: ['@pinia/nuxt', 'nuxt-icon'],
  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
    },
  },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
})
