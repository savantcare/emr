const config = require("config");

const Sequelize = require("sequelize");
const diagnosisSequelize = new Sequelize(
  config.DB_DIAGNOSIS,
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

const diagnosisDB = {};

diagnosisDB.Sequelize = Sequelize;
diagnosisDB.sequelize = diagnosisSequelize;

//diagnosisDB.diagnosis = require('../diagnosis.model.js')(diagnosisSequelize, Sequelize) //This is for test only

diagnosisDB.diagnosis = require("../dx/dx.model.js")(
  diagnosisSequelize,
  Sequelize
);
diagnosisDB.diagnosisAssessment = require("../dx/dxa.model.js")(
  diagnosisSequelize,
  Sequelize
);
//diagnosisDB.dsmMasterCodes = require('../diagnosis/dsmMasterCodes.model.js')(diagnosisSequelize, Sequelize)
//diagnosisDB.icd10AndScreenMappingDetails = require('../diagnosis/icd10AndScreenMappingDetails.model.js')(diagnosisSequelize, Sequelize)
//diagnosisDB.icd10MasterCodes = require('../diagnosis/icd10MasterCodes.model.js')(diagnosisSequelize, Sequelize)
//diagnosisDB.patientReportedDiagnosis = require('../diagnosis/patientReportedDiagnosis.model.js')(diagnosisSequelize, Sequelize)
//diagnosisDB.patientReportedDiagnosisNote = require('../diagnosis/patientReportedDiagnosisNote.model.js')(diagnosisSequelize, Sequelize)
//diagnosisDB.ruledOutDiagnosis = require('../diagnosis/ruledOutDiagnosis.model.js')(diagnosisSequelize, Sequelize)
//diagnosisDB.ruledOutNotes = require('../diagnosis/ruledOutNotes.model.js')(diagnosisSequelize, Sequelize)

diagnosisDB.sequelize.sync();

module.exports = diagnosisDB;
