const config = require("config");

const Sequelize = require("sequelize");
const componentSequelize = new Sequelize(
  config.DB_COMPONENT,
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

const componentDB = {};

componentDB.Sequelize = Sequelize;
componentDB.sequelize = componentSequelize;

componentDB.components = require("../component.model.js")(
  componentSequelize,
  Sequelize
);

componentDB.sequelize.sync(); // see doc at recommendation.database.js

module.exports = componentDB;
