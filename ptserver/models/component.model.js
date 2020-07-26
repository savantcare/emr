module.exports = (sequelize, Sequelize) => {
  const Component = sequelize.define(
    "ctMaster",
    {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      tag: {
        // health | other
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Component;
};
