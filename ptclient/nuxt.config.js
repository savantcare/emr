export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',

  telemetry: false,

  server: {
    port: 80, // default: 3000
    host: '0.0.0.0', // default: localhost
  },

  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: ['@/plugins/element-ui'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxt/typescript-build',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['vue-scrollto/nuxt'],

  // https://stackoverflow.com/questions/53993890/how-to-pass-env-variables-to-nuxt-in-production
  env: {
    baseUrl:
      process.env.NODE_ENV === 'dev'
        ? 'http://localhost:8000'
        : process.env.NODE_ENV === 'test'
        ? 'http://ptserver:8000'
        : 'http://116.203.134.163:8000',
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
      // set for vscode debugger
      config.devtool = 'source-map'
      // push new rules in module
      config.module.rules.push(
        {
          /*
            Q) Why is this config needed? 
            - before every build eslint loader check all mention file type (eg: md, js) from source directory and return format errors and warnings.try to fix those errors automattically.
            ** this config try to fix all errors and warnings before build the project
          */
          enforce: 'pre',
          test: /\.(js|vue)$/, // file type pattern
          loader: 'eslint-loader', // loader name
          exclude: /(node_modules)/, // bypass node_modules
          options: {
            fix: true, // to fix errors
          },
        },
        {
          /*
            Q) Why is this config needed? 
            - before every build eslint loader check sql, md, monopic file and throwing console error, console looks very dirty. try to by passing those file types.
            ** before add this config run yarn add ignore-loader if ignore-loader module doesn't exsists
            ** this config put ignore loader for mentioned file type (sql, md, monopic) to stop arise those error.
          */
          // push rule to specify ignore loader for some format (sql, md, monopic)
          test: /\.(sql|md|monopic|)$/, // file type pattern
          exclude: /(node_modules)/, // bypass node_modules
          loader: 'ignore-loader', // loader name
        }
      )
    },
  },
}
