module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add custom rules here
  rules: {
    /*
      Q) Why needed? 
      - before every build eslint loader check all files and return format errors and warnings (eg:  no-console, whitspace ...) in console.
      - We do not want to show these errors in production environment as private data may leak.
    */
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'warning', // stop showing console warning from production enviroment
    'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'warning', // stop showing debugger warning from production enviroment
  },
}
