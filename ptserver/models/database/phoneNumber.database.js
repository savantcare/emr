const config = require("config");

const Sequelize = require("sequelize");
const phoneNumberSequelize = new Sequelize(
  config.DB_PHONE_NUMBER,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    port: config.DB_PORT,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

const phoneNumberDB = {};

phoneNumberDB.Sequelize = Sequelize;
phoneNumberDB.sequelize = phoneNumberSequelize;

phoneNumberDB.numbers = require("../phoneNumbers.model.js")(
  phoneNumberSequelize,
  Sequelize
);

phoneNumberDB.sequelize.sync();

module.exports = phoneNumberDB;
