/*
How to model a table?
https://sequelize.org/v5/manual/getting-started.html#modeling-a-table

id is string since we do not want it to be a auto incrementing integer.
*/

module.exports = (sequelize, Sequelize) => {
  const Goal = sequelize.define(
    "goal",
    {
      uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      patientUUID: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      score: {
        type: Sequelize.INTEGER,
      },
      priority: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      discontinuedNotes: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      recordChangedByUUID: {
        type: Sequelize.STRING,
      },
      recordChangedFromIPAddress: {
        type: Sequelize.STRING,
        defaultValue: null,
      },
      recordChangedFromSection: {
        type: Sequelize.STRING,
        defaultValue: "patientFile",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Goal;
};
