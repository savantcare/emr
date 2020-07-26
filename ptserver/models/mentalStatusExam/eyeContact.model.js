module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("eye-contact", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'appropriate': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'downcast': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'intense': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'fleeting': {
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
