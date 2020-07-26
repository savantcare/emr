module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("perception", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'no-avh': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'ah': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'command-ah': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'vh': {
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
