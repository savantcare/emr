
module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("attitude", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'pleasant-and-cooperative': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'uncooperative': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'hostile-or-defiant': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'guarded': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'evasive': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'apathetic': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'disorganized-behavior': {
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
