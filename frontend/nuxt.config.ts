// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  components: [{ path: '@/components', pathPrefix: false }],
  css: ['@/assets/css/tailwind.css'],
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
