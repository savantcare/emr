module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("judgement", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'good': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'fair': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'questionable': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'poor': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'impaired': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'limited': {
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
