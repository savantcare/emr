module.exports = (sequelize, Sequelize) => {
  const LivesWith = sequelize.define("livesWith", {
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

  return LivesWith;
};