const config = require("config");

const Sequelize = require("sequelize");

const recommendationSequelize = new Sequelize(
  config.DB_RECOMMENDATION,
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

const recommendationDB = {};

recommendationDB.Sequelize = Sequelize;
recommendationDB.sequelize = recommendationSequelize;

recommendationDB.recommendations = require("../recommendation.model.js")(
  recommendationSequelize,
  Sequelize
);

recommendationDB.sequelize.sync(); //  This creates the table if it doesn't exist (and does nothing if it already exists)
// Ref: https://sequelize.org/master/manual/model-basics.html#model-synchronization

module.exports = recommendationDB;
