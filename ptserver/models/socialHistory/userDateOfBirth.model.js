module.exports = (sequelize, Sequelize) => {
  const UserDateOfBirth = sequelize.define("userDateOfBirth", {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    dateOfBirth: {
      type: Sequelize.STRING
    },
    notes: {
      type: Sequelize.STRING
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  return UserDateOfBirth;
};