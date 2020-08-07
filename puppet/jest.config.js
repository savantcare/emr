module.exports = {
  preset: "jest-puppeteer",
  globals: {
    URL:
      process.env.NODE_ENV === "test"
        ? "http://ptclient:80/pf/abcd"
        : "http://localhost:80/pf/abcd", // change URL as per NODE_ENV
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
