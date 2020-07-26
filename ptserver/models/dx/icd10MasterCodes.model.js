module.exports = (sequelize, Sequelize) => {
  const icd10MasterCodes = sequelize.define("icd10MasterCodes", {
    uuid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    icd10Code: {
      type: Sequelize.BOOLEAN
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
  });

  return icd10MasterCodes;
};
