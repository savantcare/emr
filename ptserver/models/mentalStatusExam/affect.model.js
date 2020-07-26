module.exports = (sequelize, Sequelize) => {
  const model = sequelize.define("affect", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    'euthymic': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'dysphoric': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'irritable': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'angry': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'bright': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'euphoric': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'labile': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'stable': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'mood-congruent': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'mood-incongruent': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'expansive': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'full-range': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'constricted': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'blunted': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'flat': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'anxious': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'tearful': {
      type: Sequelize.ENUM('yes', 'no')
    },
    'dysthymic': {
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
