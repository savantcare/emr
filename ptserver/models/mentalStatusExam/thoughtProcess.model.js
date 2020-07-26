module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("thought-process", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'linear-logical-and-goal-directed': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'disorganized': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'circumstantial': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'tangential': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'looseness-of-associations': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'flight-of-ideas': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'poverty-of-thought': {
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
