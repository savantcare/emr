module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("psychomotor", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'normal': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'agitated': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'retarded': {
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
