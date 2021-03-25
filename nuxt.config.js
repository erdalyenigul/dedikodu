export default {
  head: {
    title: 'Dedikodu Yay! İçinde tutma, şişersin. Yaz gitsin :)',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Dedikodu Yay! İçinde tutma, şişersin. Yaz gitsin :)' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Anton&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Caveat&display=swap' }
    ]
  },

  css: [
    '@/assets/css/reset.css',
    '@/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  plugins: [
    '~/plugins/fontawesome.js',
    '@/plugins/firebase.js',
  ],

  components: true,

  buildModules: [
    '@nuxtjs/eslint-module'
  ],

  modules: [
    '@nuxtjs/axios'
  ],

  axios: {},

  build: {
  }
}
