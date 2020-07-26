module.exports = (sequelize, Sequelize) => {
  const Setting = sequelize.define("setting", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.INTEGER
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  return Setting;
};
