module.exports = (sequelize, Sequelize) => {
  const patientAppointments = sequelize.define(
    "patientAppointments",
    {
      uuid: {
        type: Sequelize.STRING(64),
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      patientUUID: {
        type: Sequelize.STRING(64),
      },
      providerUUID: {
        type: Sequelize.STRING(64),
      },
      dateTimeOfAppt: {
        type: Sequelize.DATE,
      },
      stateOfAppt: {
        type: Sequelize.ENUM(
          "apptScheduled",
          "apptCancelled",
          "apptNoteNotLocked",
          "apptNoteLocked"
        ),
      },
      recordChangedByUUID: {
        type: Sequelize.STRING(64),
      },
      recordChangedFromIPAddress: {
        type: Sequelize.STRING(20),
        defaultValue: "",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return patientAppointments;
};
