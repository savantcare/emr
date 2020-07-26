module.exports = (sequelize, Sequelize) => {
  const UserGender = sequelize.define("userGender", {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    genderType: {
      type: Sequelize.INTEGER // 1: BiologicalGender, 2: PreferredGender
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

  return UserGender;
};