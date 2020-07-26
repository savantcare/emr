
module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("cognition", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'grossly-intact-no-memory-impairment-adequate-fund-of-knowledge-n': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'impaired': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'fluctuating': {
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
