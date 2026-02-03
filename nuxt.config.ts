// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  site: {
    url: 'https://www.rently-uae.com',
    name: 'Rently UAE',
  },

  sitemap: {
    sources: ['/api/__sitemap__/blog-urls', '/api/__sitemap__/uses-urls'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
    },
  },

  robots: {
    sitemap: '/sitemap.xml',
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Split Annual Rent into Monthly Payments | Rently UAE',
      meta: [
        { name: 'description', content: 'Rent now, pay later. Split your annual rent into manageable monthly payments with Rently. No large upfront deposits required. Available across UAE.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://www.rently-uae.com',
    },
  },

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: false
  }
})
