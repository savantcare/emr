// On 20th sept 2020: Compiling and showing changes was taking 20 seconds. Also changes were visible without refreshing manually.
export default {
  // Section 1: Nuxt rendering mode See https://nuxtjs.org/api/configuration-mode
  ssr: false,

  // Section 2: Nuxt target can be static or server. See https://nuxtjs.org/api/configuration-target TODO: Why is this not static.
  target: 'server',

  telemetry: false,

  server: {
    port: 80, // default: 3000
    host: '0.0.0.0', // default: localhost
  },

  // Section 3: Headers of the page See https://nuxtjs.org/api/configuration-head
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

  // Section 4: Global CSS
  css: ['element-ui/lib/theme-chalk/index.css'],

  // Section 5: Plugins to load before mounting the App https://nuxtjs.org/guide/plugins
  plugins: ['@/plugins/element-ui', { src: '@/plugins/vue-shortkey.js', mode: 'client' }],

  // Section 6: Auto import components https://nuxtjs.org/api/configuration-components
  components: true,

  // Section 7: Nuxt.js modules
  modules: ['vue-scrollto/nuxt'],
  // https://stackoverflow.com/questions/53993890/how-to-pass-env-variables-to-nuxt-in-production
  env: {
    baseUrl:
      process.env.NODE_ENV === 'dev'
        ? 'http://localhost:8000'
        : process.env.NODE_ENV === 'test'
        ? 'http://ptserver:8000'
        : 'http://116.203.134.163:8000',

    UseServerDBForFamilyHistory: false,
    makeFetchPostApiCalls: false,
    diagnosisFormDef: {
      id: 'diagnosis',
      plural: 'diagnosis',
      singular: 'diagnosis',
      fields: [
        { fieldNameInDb: 'diagnosis', fieldNameInUi: 'Diagnosis', fieldType: 'autocomplete', span: 8 },
        { fieldNameInDb: 'assessment', fieldNameInUi: 'Assessment', fieldType: 'textarea', span: 8 },
        { fieldNameInDb: 'onset', fieldNameInUi: 'Onset', fieldType: '', span: 8 },
      ],
    },
    familyHistoryFormDef: {
      id: 'family_history',
      plural: 'family history',
      singular: 'family history',
      fields: [
        { fieldNameInDb: 'relationship', fieldNameInUi: 'Relationship', fieldType: '', span: 6 },
        { fieldNameInDb: 'description', fieldNameInUi: 'Description', fieldType: 'textarea', span: 12 },
      ],
    },
    miscellaneousNotesFormDef: {
      id: 'miscellaneous_notes',
      plural: 'miscellaneous notes',
      singular: 'miscellaneous note',
      fields: [{ fieldNameInDb: 'description', fieldNameInUi: 'Description', fieldType: 'textarea', span: 12 }],
    },
    planCommentsFormDef: {
      id: 'plan_comments',
      plural: 'plan comments',
      singular: 'plan comment',
      fields: [{ fieldNameInDb: 'description', fieldNameInUi: 'Description', fieldType: 'textarea', span: 12 }],
    },
    processNotesFormDef: {
      id: 'process_notes',
      plural: 'process notes',
      singular: 'process note',
      fields: [{ fieldNameInDb: 'description', fieldNameInUi: 'Description', fieldType: 'textarea', span: 12 }],
    },
    serviceStatementsFormDef: {
      id: 'service_statements',
      plural: 'service statements',
      singular: 'service statement',
      fields: [
        {
          fieldNameInDb: 'total_minutes_in_psychotherapy_select',
          fieldNameInUi: 'Total minutes in psychotherapy',
          fieldType: 'multi-select-with-buttons',
          span: 12,
        },
        {
          fieldNameInDb: 'modality_of_psychotherapy_multi_select',
          fieldNameInUi: 'Modality of psychotherapy',
          fieldType: 'multi-select-with-buttons',
          span: 12,
        },
        {
          fieldNameInDb: 'total_minutes_with_patient_select',
          fieldNameInUi: 'Total minutes with patient',
          fieldType: 'multi-select-with-buttons',
          span: 12,
        },
      ],
      formReviewed: false,
      maxRows: 1,
    },
  },

  // Section 8: Nuxt.js dev-modules Factor 4 influencing build time. When I removed the following when I changed the code in the editor and saved the browser showed the changes without 2 seconds without refresh.
  /*  
  buildModules: [
    '@nuxtjs/eslint-module', // https://github.com/nuxt-community/eslint-module
  ],
  */

  // Section 9: Build configuration https://nuxtjs.org/api/configuration-build/
  build: {
    transpile: [/^element-ui/],

    /* Goal:  Reduce the build time. 
              Build time depends on 4 factors:
                  1. cache                          https://nuxtjs.org/api/configuration-build/#cache
                  2. parallel                       https://nuxtjs.org/api/configuration-build/#parallel
                  3. hardsource                     https://nuxtjs.org/api/configuration-build/#hardsource
                  4. Build modules loaded
                  5. loaders doing pre-processing   https://stackoverflow.com/questions/56350912/nuxt-application-taking-more-than-4-minutes-to-compile

              Comparison of different options: scanrio: changing the text name inside full-name.vue 
                          cache   parallel    hardsource    loaders    Buildmkodules  Time
                            Y         Y           N            NP         NP           2s
                            Y         Y           N            NP          P           8s
                            N         Y           N            NP          P          10s
                            Y         Y           N            P           P          15s
                            Y         N           N            P           P          15s   
                            N         N           N            P           P          25s                      

    */

    // Factor 1 influencing build time
    cache: true,

    // Factor 2 influencing build time
    parallel: true,

    // Factor 3 influencing build time
    /* HardSource has to be initilized before the extend(config)  
          Ref: https://github.com/tinytxy/nuxt_demo/blob/d7df41c992733b60f815c7d5b2638ac3be04d070/nuxt.config.js
              https://github.com/Sphereon-Opensource/poe-js-webapp/blob/3887d3f1eaa19ae12c1aee8897db27788d94f776/nuxt.config.js
              https://github.com/saavuio/s_nuxt_2nd/blob/f889e7dbabf62d369df683ca1827a05625c76f31/base/nuxt.config.js
      */
    // hardSource: true, // this makes the compile hang at 93%

    // Factor 5 influencing build time
    loaders: {
      vue: {
        prettify: false, //
        eslint: false,
        babel: false,
      },
    },

    extend(config, ctx) {
      // set for vscode debugger
      config.devtool = 'source-map'

      /* Section start: Enabling this section increases the build time.
      // push new rules in module
      config.module.rules.push(
        {
          // Q) Why is this config needed? 
          //      Before every build eslint loader check all mention file type (eg: md, js) from source directory and return format errors and warnings.try to fix those errors automattically.
          //      This config try to fix all errors and warnings before build the project
          enforce: 'pre',
          test: /\.(js|vue)$/, // file type pattern
          loader: 'eslint-loader', // https://nuxtjs.org/api/configuration-build/#loaders
          exclude: /(node_modules)/, // bypass node_modules
          options: {
            fix: true, // to fix errors
          },
        },
        {
          // Q) Why is this config needed? 
          //    Before every build eslint loader check sql, md, monopic file and throwing console error, console looks very dirty. try to by passing those file types.
          //    Before add this config run yarn add ignore-loader if ignore-loader module doesn't exsists
          //    This config put ignore loader for mentioned file type (sql, md, monopic) to stop arise those error.
          // push rule to specify ignore loader for some format (sql, md, monopic)
          test: /\.(sql|md|monopic|)$/, // file type pattern
          exclude: /(node_modules)/, // bypass node_modules
          loader: 'ignore-loader', // loader name
        }
      )
      Section end */
    },
  },
}
