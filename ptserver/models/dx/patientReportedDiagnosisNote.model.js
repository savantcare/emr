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
    createdByUserId: {
      type: Sequelize.DECIMAL
    },
    discontinuedByUserId: {
      type: Sequelize.DECIMAL
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    discontinueAt: Sequelize.DATE
  });

  return Reminder;
};
