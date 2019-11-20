import pkg from './package'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // '@nuxtjs/vuetify'
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: [
      '~/assets/scss/_setting.scss',
      '~/assets/scss/_function.scss',
      '~/assets/scss/_mixin.scss',
      '~/assets/scss/_reset.scss',
      '~/assets/scss/_base.scss'
    ]
  },

  // vuetify: {
  //   // Vuetify の設定はここに書く
  //   theme: {
  //     primary: '#3f51b5',
  //     secondary: '#b0bec5',
  //     accent: '#8c9eff',
  //     error: '#b71c1c'
  //   }
  // },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
