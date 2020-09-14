const router = require("express").Router();
const db = require("../models");
const screensListMaster = db.screeningDB.screensListMaster;
const screensAssignedToPatient = db.screeningDB.screensAssignedToPatient;
const phq9PatientResponse = db.screeningDB.phq9PatientResponse;
// const User = db.userDB.users
// const { Op } = require("sequelize")

// Screening

module.exports = (io) => {
  //  get the patient assigned screen list
  router.get("/getAll/", async (req, res) => {
    try {
      //const { patientId, userId, date } = req.body
      const { patientUUID } = req.query;

      const queryResult = await screensListMaster.sequelize.query(
        "SELECT *, UNIX_TIMESTAMP(scrAssignedToPts.ROW_START) as ROW_START, UNIX_TIMESTAMP(scrAssignedToPts.ROW_END) as ROW_END FROM scrAssignedToPts FOR SYSTEM_TIME ALL LEFT JOIN  scrListMasters ON scrAssignedToPts.scrUUID = scrListMasters.uuid where scrAssignedToPts.ptUUID=:patientUUID",
        {
          replacements: { patientUUID: patientUUID },
          type: screensListMaster.sequelize.QueryTypes.SELECT,
        }
      );
      res.send(queryResult);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while fetching the Screening data",
      });
    }
  });

  router.get("/getScrMasterList/", async (req, res) => {
    try {
      const queryResult = await screensListMaster.sequelize.query(
        "SELECT * FROM  scrListMasters ",
        {
          type: screensListMaster.sequelize.QueryTypes.SELECT,
        }
      );
      res.send(queryResult);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while fetching the Screening data",
      });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const { data } = req.body;
      const scrPtData = [
        {
          uuid: data.uuid,
          scrUUID: data.scrUUID,
          ptUUID: data.ptUUID,
          notes: data.notes,
          recordChangedByUUID: data.recordChangedByUUID,
          recordChangedFromIPAddress: data.recordChangedFromIPAddress,
        },
      ];

      const queryResult = await screensAssignedToPatient.bulkCreate(scrPtData, {
        returning: true,
      });
      res.send(queryResult);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while updating Screening",
      });
    }
  });

  router.get("/getPatientScrDetail", async (req, res) => {
    try {
      const { screentype, ptUUID } = req.query;
      if (screentype == "PHQ9") {
        queryResult = await phq9PatientResponse.sequelize.query(
          "SELECT " +
            "ptUUID as uuid, " +
            "question1 as littleInterestOrPleasureInDoingThings, " +
            "question2 as feelingDownDepressedOrHopeless, " +
            "question3 as troubleFallingOrStayingAsleep, " +
            "question4 as feelingTiredOrHavingLittleEnergy, " +
            "question5 as poorAppetiteOrOvereating, " +
            "question6 as feelingBadAboutYourself, " +
            "question7 as troubleConcentratingOnThings, " +
            "question8 as movingOrSpeakingSoSlowly, " +
            "question9 as thoughtsThatYouWouldBeBetterOffDead, " +
            "question10 as ifYouCheckedOffAnyProblems, " +
            "recordChangedByUUID, " +
            "recordChangedFromIPAddress, " +
            "UNIX_TIMESTAMP(row_start) AS ROW_START, " +
            "UNIX_TIMESTAMP(row_end) AS ROW_END " +
            "FROM phq9PtResponses FOR SYSTEM_TIME ALL where ptUUID=:ptUUID",
          {
            replacements: { ptUUID: ptUUID },
            type: phq9PatientResponse.sequelize.QueryTypes.SELECT,
          }
        );

        if (queryResult.length > 0) {
          res.send(queryResult);
        } else {
          const emptyRow = {
            uuid: ptUUID,
          };
          res.send(emptyRow);
        }
      }
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while fetching the Screening",
      });
    }
  });

  router.post("/storePatientScreenDetail", async (req, res) => {
    try {
      const { data, ptUUID } = req.body;

      for (i = 1; i <= 10; i++) {
        let key = "question" + i;
        data[key] = data[key] == "null" ? null : String(data[key]);
      }

      phq9PatientResponse.upsert(data).then(function (test) {
        if (test) {
          res.status(200);
          res.send("Successfully updated");
        } else {
          res.status(200);
          res.send("Successfully stored");
        }
      });
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while fetching the Screening",
      });
    }
  });

  return router;
};
