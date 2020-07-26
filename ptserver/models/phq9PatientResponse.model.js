/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
// type: Sequelize.ENUM('apptScheduled','apptCancelled','apptNoteNotLocked','apptNoteLocked') INTEGER
*/
module.exports = (sequelize, Sequelize) => {
    const phq9PatientResponse = sequelize.define("phq9PatientResponses", {
      patientUUID: {
        type: Sequelize.STRING(64),
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      question1: {
        type: Sequelize.ENUM,
        values: ['0','1','2','3']
      },
      question2: {
        type: Sequelize.ENUM,
        values: ['0','1','2','3']
      },
      question3: {
        type: Sequelize.ENUM,
        values: ['0','1','2','3']
      },
      question4: {
        type: Sequelize.ENUM,
        values: ['0','1','2','3']
      },
      question5: {
        type: Sequelize.ENUM,
        values: ['0','1','2','3']
      },
      question6: {
        type: Sequelize.ENUM,
        values: ['0','1','2','3']
      },
      question7: {
        type: Sequelize.ENUM,
        values: ['0','1','2','3']
      },
      question8: {
        type: Sequelize.ENUM,
        values: ['0','1','2','3']
      },
      question9: {
        type: Sequelize.ENUM,
        values: ['0','1','2','3']
      },
      question10: {
        type: Sequelize.ENUM,
        values: ['0','1','2','3']
      },
      recordChangedByUUID: {
        type: Sequelize.STRING(64)
      },
      recordChangedFromIPAddress: {
        type: Sequelize.STRING(20),
        defaultValue: null
      }
    },{
      timestamps: false,
      freezeTableName: true
    });
  
    return phq9PatientResponse;
  };
  