const extensionPath = './cors';
module.exports = {
  launch: {
    headless: false,
    slowMo: process.env.SLOWMO ? process.env.SLOWMO : 50,
    defaultViewport: { width: 1440, height: 900 },
    devtools: false,
    browser: 'chrome',
    args: [
      "--no-sandbox",
      "--start-maximized", // --start-fullscreen --start-maximized
      "--ignore-certificate-errors",
      `--disable-extensions-except=${extensionPath}`,
      "--disable-web-security",
      "--allow-running-insecure-content",
    ],
  },
};