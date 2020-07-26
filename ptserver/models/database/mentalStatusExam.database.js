const config = require("config");

const Sequelize = require("sequelize");
const mentalStatusExamSequelize = new Sequelize(
  config.DB_MENTAL_STATUS_EXAM,
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

const mentalStatusExam = {};

mentalStatusExam.Sequelize = Sequelize;
mentalStatusExam.sequelize = mentalStatusExamSequelize;

mentalStatusExam.appearence = require("../mentalStatusExam/appearence.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.attitude = require("../mentalStatusExam/attitude.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.cognition = require("../mentalStatusExam/cognition.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.constitutional = require("../mentalStatusExam/constitutional.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.eyeContact = require("../mentalStatusExam/eyeContact.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.impulseControl = require("../mentalStatusExam/impulseControl.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.thoughtProcess = require("../mentalStatusExam/thoughtProcess.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.psychomotor = require("../mentalStatusExam/psychomotor.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.insight = require("../mentalStatusExam/insight.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.speech = require("../mentalStatusExam/speech.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.judgement = require("../mentalStatusExam/judgement.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.affect = require("../mentalStatusExam/affect.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.thoughtContent = require("../mentalStatusExam/thoughtContent.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.neurological = require("../mentalStatusExam/neurological.model")(
  mentalStatusExamSequelize,
  Sequelize
);
mentalStatusExam.perception = require("../mentalStatusExam/perception.model")(
  mentalStatusExamSequelize,
  Sequelize
);

mentalStatusExam.sequelize.sync();

module.exports = mentalStatusExam;
