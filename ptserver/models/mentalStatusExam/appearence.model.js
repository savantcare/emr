module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("appearence", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'good-grooming-and-hygiene': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'no-apparent-distress': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'well-developed-well-nourished': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'appears-stated-age': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'appears-younger-then-stated-age': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'appears-older-then-stated-age': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'obese': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'thin-or-cachetic': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'disheveled-unkempt': {
      type: Sequelize.ENUM('yes', 'no')
    },
    malodorus: {
      type: Sequelize.ENUM('yes', 'no')
    },
    others: {
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
