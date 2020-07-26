module.exports = (sequelize, Sequelize) => {
  const Component = sequelize.define("waistCircumference", {
    patientUUID: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    waistCircumferenceInInches: {
      type: Sequelize.INTEGER
    },
    measurementDate: {
      type: Sequelize.DATE
    },
    Notes: {
      type: Sequelize.STRING
    },
    recordChangedByUUID: {
      type: Sequelize.STRING
    },
    recordChangedFromIPAddress: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Component;
};
