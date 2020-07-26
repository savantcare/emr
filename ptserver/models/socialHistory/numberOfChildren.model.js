module.exports = (sequelize, Sequelize) => {
  const NumberOfChildren = sequelize.define("numberOfChildren", {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    value: {
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

  return NumberOfChildren;
};