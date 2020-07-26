module.exports = (sequelize, Sequelize) => {
  const Reminder = sequelize.define("diagnosis", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    description: {
      type: Sequelize.STRING
    },
    discontinue: {
      type: Sequelize.BOOLEAN
    },
    patientId: {
      type: Sequelize.DECIMAL
    },
    recordChangedByUUID: {
      type: Sequelize.STRING
    },
    recordChangedOnDateTime: {
      type: Sequelize.DATE
    },
    recordChangedFromIPAddress: {
      type: Sequelize.STRING
    },
    // Timestamps
  });

  return Reminder;
};
