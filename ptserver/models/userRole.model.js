module.exports = (sequelize, Sequelize) => {
  const UserRoles = sequelize.define(
    "user_roles",
    {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
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

  UserRoles.associate = function (models) {
    UserRole.hasMany(models.user, { as: "users" });
  };

  return UserRoles;
};
