module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("thought-content", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'no-si-intent-or-plan': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'no-passive-death-wish': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'no-hi-intent-or-plan': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'no-delusional-thinking-observed': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'no-obsessive-thinking-observed': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'ruminations': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'si-without-intent-or-plan': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'si-as-detailed-below': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'hi-as-detailed-below': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'delusions': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'ior': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'obsessions': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'passive-death-wish': {
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
