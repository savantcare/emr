const config = require("config");

const Sequelize = require("sequelize");
const serviceStatementSequelize = new Sequelize(
  config.DB_SERVICE_STATEMENT,
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

const serviceStatementDB = {};

serviceStatementDB.Sequelize = Sequelize;
serviceStatementDB.sequelize = serviceStatementSequelize;

serviceStatementDB.serviceStatements = require("../serviceStatement.model.js")(
  serviceStatementSequelize,
  Sequelize
);

serviceStatementDB.sequelize.sync(); //  This creates the table if it doesn't exist (and does nothing if it already exists)
// Ref: https://sequelize.org/master/manual/model-basics.html#model-synchronization

module.exports = serviceStatementDB;
