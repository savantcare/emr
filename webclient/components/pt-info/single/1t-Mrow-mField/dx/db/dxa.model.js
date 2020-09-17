module.exports = (sequelize, Sequelize) => {
  const DiagnosisAssessment = sequelize.define(
    'dxa',
    {
      uuid: {
        type: Sequelize.STRING,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      dxUUID: {
        type: Sequelize.STRING,
      },
      patientUUID: {
        type: Sequelize.STRING,
      },
      dxAssessment: {
        type: Sequelize.STRING,
      },
      recordChangedByUUID: {
        type: Sequelize.STRING,
      },
      recordChangedOnDateTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      recordChangedFromIPAddress: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      // Timestamps
    },
    {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,

      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,
    }
  )

  return DiagnosisAssessment
}
