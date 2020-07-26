module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("neurological", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'gait-and-station-normal': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'gait-and-station-abnormal': {
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
