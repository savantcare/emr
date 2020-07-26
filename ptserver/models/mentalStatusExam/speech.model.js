module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("speech", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'regular-rate-and-rhythm': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'fluent': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'incoherent': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'talkative': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'pressured': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'mumbling': {
      type: Sequelize.ENUM('yes', 'no')
    },
    other: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    recordChangedByUUID: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    recordChangedFromIPAddress: {
      type: Sequelize.STRING,
      defaultValue: ''
    },
    timeOfEvaluation: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return model;
};
