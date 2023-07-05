// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app:{
    head: {
      title: "Mithu's blog",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'my website description'
        }
      ],
      link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
          { rel: 'stylesheet', type: 'text/css', href: '/assets/css/block-library/style.min.css' }
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    public: {
      wordpressUrl: 'http://blog.cybercraftit.com/graphql'
    }
  }
})
