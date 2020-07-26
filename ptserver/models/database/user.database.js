const config = require("config");

const Sequelize = require("sequelize");
const userSequelize = new Sequelize(
  config.DB_USER,
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

const userDB = {};

userDB.Sequelize = Sequelize;
userDB.sequelize = userSequelize;

userDB.users = require("../user.model.js")(userSequelize, Sequelize);
userDB.userRoles = require("../userRole.model.js")(userSequelize, Sequelize);

userDB.sequelize.sync();

module.exports = userDB;
