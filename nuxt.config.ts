// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Rently | The better way to rent.',
      meta: [
        { name: 'description', content: 'Rent now, pay later. Split your rent into manageable monthly payments with Rently. No large upfront deposits required.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: false
  }
})
