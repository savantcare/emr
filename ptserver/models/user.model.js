module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      roleUUID: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      age: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  User.associate = function (models) {
    User.belongsTo(models.userRole, { foreignKey: "roleId", as: "user_role" });
  };

  return User;
};
