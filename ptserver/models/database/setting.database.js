const config = require("config");

const Sequelize = require("sequelize");
const settingSequelize = new Sequelize(
  config.DB_SETTING,
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

const settingDB = {};

settingDB.Sequelize = Sequelize;
settingDB.sequelize = settingSequelize;

settingDB.settings = require("../setting.model.js")(
  settingSequelize,
  Sequelize
);

settingDB.sequelize.sync();

module.exports = settingDB;
