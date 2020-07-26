const config = require("config");

const Sequelize = require("sequelize");
const socialHistorySequelize = new Sequelize(
  config.DB_SOCIALHISTORY,
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

const socialHistoryDB = {};

socialHistoryDB.Sequelize = Sequelize;
socialHistoryDB.sequelize = socialHistorySequelize;

socialHistoryDB.birthplace = require("../socialHistory/birthplace.model.js")(
  socialHistorySequelize,
  Sequelize
);
socialHistoryDB.livesWith = require("../socialHistory/livesWith.model.js")(
  socialHistorySequelize,
  Sequelize
);
socialHistoryDB.livesIn = require("../socialHistory/livesIn.model.js")(
  socialHistorySequelize,
  Sequelize
);
socialHistoryDB.numberOfChildren = require("../socialHistory/numberOfChildren.model.js")(
  socialHistorySequelize,
  Sequelize
);
socialHistoryDB.userGender = require("../socialHistory/userGender.model.js")(
  socialHistorySequelize,
  Sequelize
);
socialHistoryDB.userDateOfBirth = require("../socialHistory/userDateOfBirth.model.js")(
  socialHistorySequelize,
  Sequelize
);
socialHistoryDB.maritalHistory = require("../socialHistory/maritalHistory.model.js")(
  socialHistorySequelize,
  Sequelize
);
socialHistoryDB.otherMajorLifeEvent = require("../socialHistory/otherMajorLifeEvent.model.js")(
  socialHistorySequelize,
  Sequelize
);
socialHistoryDB.educationHistory = require("../socialHistory/educationHistory.model.js")(
  socialHistorySequelize,
  Sequelize
);
socialHistoryDB.employmentHistory = require("../socialHistory/employmentHistory.model.js")(
  socialHistorySequelize,
  Sequelize
);

socialHistoryDB.sequelize.sync();

module.exports = socialHistoryDB;
