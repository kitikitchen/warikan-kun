import pkg from './package'

export default {
  mode: 'spa',

  server: {
    host: '0.0.0.0',
  },

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.displayName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    { src: '~/assets/scss/_reset.scss', lang: 'scss' },
    { src: '~/assets/scss/_base.scss', lang: 'scss' },
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/style-resources', '@nuxtjs/pwa'],

  styleResources: {
    scss: [
      '~/assets/scss/_setting.scss',
      '~/assets/scss/_function.scss',
      '~/assets/scss/_mixin.scss',
    ],
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
  },

  pwa: {
    manifest: {
      name: pkg.displayName,
      short_name: pkg.displayName,
      lang: 'ja',
    },
  },
}
