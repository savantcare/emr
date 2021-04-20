module.exports = {
  preset: "jest-puppeteer",
  globals: {
    baseUrl:
      process.env.NODE_ENV === 'dev'
        ? 'http://116.203.134.163.xip.io/'
        : process.env.NODE_ENV === 'test'
        ? 'http://ptserver:8000'
        : 'http://116.203.134.163:8000',
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^~/(.*)$": "<rootDir>/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: ["js", "vue", "json"],
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/cts/**/*.vue", "<rootDir>/pages/**/*.vue"],
};