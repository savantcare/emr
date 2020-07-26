const config = require("config");

const Sequelize = require("sequelize");
const bodyMeasurementSequelize = new Sequelize(
  config.DB_BODYMEASUREMENT,
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

const bodyMeasurement = {};

bodyMeasurement.Sequelize = Sequelize;
bodyMeasurement.sequelize = bodyMeasurementSequelize;

bodyMeasurement.weight = require("../bodyMeasurement/weight.model")(
  bodyMeasurementSequelize,
  Sequelize
);
bodyMeasurement.bmi = require("../bodyMeasurement/bmi.model")(
  bodyMeasurementSequelize,
  Sequelize
);
bodyMeasurement.waistCircumference = require("../bodyMeasurement/waistCircumference.model")(
  bodyMeasurementSequelize,
  Sequelize
);
bodyMeasurement.bloodSugar = require("../bodyMeasurement/bloodSugar.model")(
  bodyMeasurementSequelize,
  Sequelize
);
bodyMeasurement.height = require("../bodyMeasurement/height.model")(
  bodyMeasurementSequelize,
  Sequelize
);
bodyMeasurement.bloodPressure = require("../bodyMeasurement/bloodPressure.model")(
  bodyMeasurementSequelize,
  Sequelize
);
bodyMeasurement.oxygenSaturation = require("../bodyMeasurement/oxygenSaturations.model")(
  bodyMeasurementSequelize,
  Sequelize
);
bodyMeasurement.pulse = require("../bodyMeasurement/pulse.model")(
  bodyMeasurementSequelize,
  Sequelize
);
bodyMeasurement.temperature = require("../bodyMeasurement/temperature.mode")(
  bodyMeasurementSequelize,
  Sequelize
);

bodyMeasurement.sequelize.sync(); // see doc at recommendation.database.js

module.exports = bodyMeasurement;
