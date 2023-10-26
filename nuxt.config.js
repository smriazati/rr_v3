export default {
  target: 'static',
  head: {
    titleTemplate: "%s | Roots of Resistance",
    title: 'Roots of Resistance',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Roots of Resistance: The Tuchyn Story teaches students about Jewish resistance during the Holocaust in the village of Tuchyn, Ukraine.' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/1/bgimg.jpg',
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Painting of a person (small in frame) running into a forest.',
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  css: ['~/assets/sass/main.scss'],
  plugins: ['~/plugins/maps.client', '~/plugins/router-actions.client', '~/plugins/vimeo.client', '~/plugins/sanity-image-builder', '~/plugins/page-metadata'],
  router: {
    middleware: ['language']
  },
  components: true,
  gsap: {
    extraPlugins: {
      scrollTo: true,
      scrollTrigger: true
    }
  },
  googleFonts: {
    prefetch: true,
    preconnect: true,
    families: {
      'Atkinson+Hyperlegible': true,
    },
    display: 'swap'
  },
  buildModules: [
    '@nuxtjs/google-fonts', 'nuxt-gsap-module',
  ],
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/sanity/module'
  ],
  sanity: {
    projectId: 'hxa1vf8p',
    apiVersion: '2021-10-21'
  },
  styleResources: {
    scss: [
      '~/assets/sass/imports/imports.scss'
    ],
    hoistUseStatements: true
  },
  env: {
    mapsApi: process.env.GOOGLEMAPSAPI,
  },
  privateRuntimeConfig: {
    mapsApi: process.env.GOOGLEMAPSAPI
  },
  build: {
    extractCSS: true,
    loaders: {
      limit: 0,
    }
  },
}
