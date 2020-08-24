const recommendationDB = require("./database/recommendation.database.js");
const reminderDB = require("./database/reminder.database.js");
const phoneNumberDB = require("./database/phoneNumber.database.js");
const goalDB = require("./database/goal.database.js");
const userDB = require("./database/user.database.js");
const settingDB = require("./database/setting.database.js");
const componentDB = require("./database/component.database.js");
const socialHistoryDB = require("./database/socialhistory.database.js");
const diagnosisDB = require("./database/dx.database.js");
const appointmentDB = require("./database/appointment.database.js");
const screeningDB = require("./database/screening.database.js");
const bodyMeasurementDB = require("./database/bodymeasurement.database.js");
const mentalStatusExamDB = require("./database/mentalStatusExam.database");

module.exports = {
  recommendationDB: recommendationDB,
  reminderDB: reminderDB,
  phoneNumberDB: phoneNumberDB,
  goalDB: goalDB,
  userDB: userDB,
  settingDB: settingDB,
  componentDB: componentDB,
  socialHistoryDB: socialHistoryDB,
  diagnosisDB: diagnosisDB,
  appointmentDB: appointmentDB,
  screeningDB: screeningDB,
  bodyMeasurementDB: bodyMeasurementDB,
  mentalStatusExamDB,
};
