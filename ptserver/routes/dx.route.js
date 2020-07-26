const router = require("express").Router();
const db = require("../models");
const Diagnosis = db.diagnosisDB.diagnosis;
const DiagnosisAssessment = db.diagnosisDB.diagnosisAssessment;
const User = db.userDB.users;
const { Op } = require("sequelize");

module.exports = (io) => {
  router.post("/", async (req, res) => {
    try {
      const data = req.body;

      const newDiagnosis = await Diagnosis.bulkCreate(data); // See

      /* this informs all the clients.
       -doctor is added so that DA does not get high security messages on their socket. 
       So components that DA does not have access to they will not get the message
       Question: What is inside newDiagnosis?
       */
      /*console.log(`room-${patientId}-Doctor`)
      console.log(newDiagnosis)
      io.to(`room-${patientId}-Doctor`).emit("ADD_DIAGNOSIS", newDiagnosis)*/

      res.send(
        newDiagnosis
      ); /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Diagnosis",
      });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const { patientId } = req.query;

      const diagnoses = await Diagnosis.findAll({
        where: {
          patientUUId: patientId,
        },
      });

      /**
       *
       */

      /*const promises = diagnoses.map(async (diagnosis,index) => {
        const { uuid, diagnosisName, diagnosedOnDate, recordChangedByUUID, recordChangedOnDateTime} = diagnosis
        

        try {
          const dxAddedByUser = await User.findOne({
            attributes: ['name'],
            where: { id: recordChangedByUUID }
            
          })
          const { name } = dxAddedByUser

          const dxCurrentAssessment = await DiagnosisAssessment.findOne({
            attributes: ['uuid','diagnosisAssessment'],
            where: { diagnosisUUID: uuid }
            
          })
          
          //const currentAssessment = '';
          if(dxCurrentAssessment!=null) {

            const data = {
              uuid: uuid, 
              diagnosisName: `${diagnosisName}`,
              currentAssessmentUUID: `${dxCurrentAssessment.uuid}`,
              currentAssessment: `${dxCurrentAssessment.diagnosisAssessment}`,
              diagnosedOnDate: `${new Date(diagnosedOnDate).toDateString()}`,
              diagnosisAddedDetails: `${new Date(recordChangedOnDateTime).toDateString()} by ${name}`,
              assessmentList: []
            }
            //console.log(data)
            return data
          }
          else {
            const data = {
              uuid: uuid, 
              diagnosisName: `${diagnosisName}`,
              currentAssessmentUUID: ``,
              currentAssessment: ``,
              diagnosedOnDate: `${new Date(diagnosedOnDate).toDateString()}`,
              diagnosisAddedDetails: `${new Date(recordChangedOnDateTime).toDateString()} by ${name}`,
              assessmentList: []
            }
            //console.log(data)
            return data
          }     
          
        } catch (err) {
          return err.message || "Some error occured while get user info"
        }

                                   

      })
      */
      /**
       * Expect result:
       *  {
       *    "content": "History 1",
       *    "info": "Added by {User} on {Date}" || "Updated by {User} on {Date}"
       *  }
       *
       */

      //const result = await Promise.all(promises)
      res.send(diagnoses);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while fetching the Recommenation",
      });
    }
  });

  router.put("/:id", async (req, res) => {
    // Replace existing row with new row
    try {
      // Update the existing object to discontinue.
      await Diagnosis.update(
        {
          diagnosisName: req.body.diagnosisName,
          icd10Code: req.body.icd10Code,
          diagnosedOnDate: req.body.diagnosedOnDate,
          recordChangedByUUID: req.body.recordChangedByUUID,
          recordChangedOnDateTime: req.body.recordChangedOnDateTime,
          recordChangedFromIPAddress: req.body.recordChangedFromIPAddress,
        },
        {
          where: {
            uuid: req.params.id,
          },
        }
      );

      io.to(`room-${req.body.patientUUId}-Doctor`).emit(
        "UPDATE_DIAGNOSIS",
        req.body
      );
      res.send(
        "ok"
      ); /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while update the Recommendation",
      });
    }
  });

  router.put("/changeAssessment/:id", async (req, res) => {
    // Replace existing row with new row
    try {
      const data = req.body;
      // Update the existing object to discontinue.
      //*Ref : https://sequelize.org/master/manual/model-querying-finders.html
      const [dxAssessment, created] = await DiagnosisAssessment.findOrCreate({
        where: {
          diagnosisUUID: req.body.uuid,
          patientUUID: req.body.patientUUID,
        },
        defaults: {
          diagnosisAssessment: req.body.currentAssessment,
          recordChangedByUUID: req.body.recordChangedByUUID,
          diagnosisUUID: req.body.uuid,
          patientUUID: req.body.patientUUID,
        },
      });

      const returnVal = { status: "Ok", updatedData: null, created: created };

      //console.log(created); // The boolean indicating whether this instance was just created
      if (!created) {
        //Assessment for the dx was already there, so we need to update if there is a change in assessment
        if (dxAssessment.diagnosisAssessment != data.currentAssessment) {
          await DiagnosisAssessment.update(
            {
              diagnosisAssessment: data.currentAssessment,
              recordChangedByUUID: data.recordChangedByUUID,
            },
            {
              where: {
                uuid: dxAssessment.uuid,
              },
            }
          );
        }

        const diagnosesCurrentAssessment = await DiagnosisAssessment.findAll({
          where: {
            diagnosisUUId: data.uuid,
          },
        });

        returnVal.updatedData = diagnosesCurrentAssessment;
        //console.log(user.job); // This will certainly be 'Technical Lead JavaScript'
      } else {
        returnVal.updatedData = dxAssessment;
      }

      /*await Diagnosis.update({
        diagnosisName: req.body.diagnosisName,
        icd10Code: req.body.icd10Code,
        diagnosedOnDate: req.body.diagnosedOnDate,
        recordChangedByUUID: req.body.recordChangedByUUID,
        recordChangedOnDateTime: req.body.recordChangedOnDateTime,
        recordChangedFromIPAddress: req.body.recordChangedFromIPAddress
      }, {
        where: {
          uuid: req.params.id
        }
      })

      io.to(`room-${req.body.patientUUId}-Doctor`).emit("UPDATE_DIAGNOSIS", req.body)*/
      res.send(
        returnVal
      ); /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while update the Recommendation",
      });
    }
  });

  router.get("/getAssessmentHistory/:id", async (req, res) => {
    try {
      /*const histories = await Reminder.sequelize.query('SELECT *,ROW_START, ROW_END FROM reminder_news FOR SYSTEM_TIME ALL where uuid = :uuid order by ROW_START desc',
                            {
                              replacements: { uuid: req.params.id },
                              type: Reminder.sequelize.QueryTypes.SELECT
                            }
                        );*/
      /**
       * Expect result:
       *  {
       *    "content": "History 1",
       *    "info": "Added by {User} on {Date}" || "Updated by {User} on {Date}"
       *  }
       *
       */
      const assessments = await DiagnosisAssessment.sequelize.query(
        "SELECT *,ROW_START, ROW_END FROM diagnosisAssessment FOR SYSTEM_TIME ALL where uuid = :uuid order by ROW_START desc",
        {
          replacements: { uuid: req.params.id },
          type: DiagnosisAssessment.sequelize.QueryTypes.SELECT,
        }
      );

      const assessmentPromises = assessments.map(
        async (history, innerIndex) => {
          const {
            diagnosisAssessment,
            recordChangedByUUID,
            ROW_START,
          } = history;

          if (assessments.length - 1 == innerIndex) {
            // The case which there is no update history
            try {
              const user = await User.findOne({
                attributes: ["name"],
                where: { id: recordChangedByUUID },
              });
              const { name } = user;
              const data = {
                content: `${diagnosisAssessment}`,
                info: `Added by ${name} on ${new Date(
                  ROW_START
                ).toDateString()}`,
                type: `success`,
              };
              //console.log(data)
              return data;
            } catch (err) {
              return err.message || "Some error occured while get user info";
            }
          } else {
            // The case which there is an update history
            try {
              const user = await User.findOne({
                attributes: ["name"],
                where: { id: recordChangedByUUID },
              });

              const { name } = user;
              const data = {
                content: `${diagnosisAssessment}`,
                info: `Changed by ${name} on ${new Date(
                  ROW_START
                ).toDateString()}`,
                type: `primary`,
              };
              //console.log(data)
              return data;
            } catch (err) {
              return err.message || "Some error occured while get user info";
            }
          }
        }
      );
      const assessmentList = await Promise.all(assessmentPromises);
      res.send(assessmentList);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while get the reminder history",
      });
    }
  });

  //

  router.patch("/:id", async (req, res) => {
    try {
      const queryResult = await Diagnosis.destroy({
        where: {
          uuid: req.params.id,
        },
      });

      io.to(`room-${req.body.patientUUId}-Doctor`).emit(
        "DISCONTINUE_DIAGNOSIS",
        req.params.id
      );
      res.send(
        "ok"
      ); /* Fix: Instead of sending the whole objefct only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while patch the Diagnosis",
      });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const queryResult = await Diagnosis.destroy({
        where: {
          uuid: req.params.id,
        },
      });
      io.to(`room-${req.body.patientUUId}-Doctor`).emit(
        "DISCONTINUE_DIAGNOSIS",
        req.params.id
      );
      res.send(
        queryResult
      ); /* Fix: Instead of sending the whole objefct only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while discontinuing diagnosis",
      });
    }
  });

  router.get("/getHistory/:id", async (req, res) => {
    try {
      const histories = await Diagnosis.findAll({
        where: {
          diagnosisID: req.params.id,
        },
      });
      /**
       * Expect result:
       *  {
       *    "content": "History 1",
       *    "info": "Added by {User} on {Date}" || "Updated by {User} on {Date}"
       *  }
       *
       */

      const promises = histories.map(async (history) => {
        const {
          name,
          createdByUserId,
          discontinuedByUserId,
          createdAt,
          discontinueAt,
        } = history;
        if (discontinuedByUserId == null) {
          // The case which there is no update history
          try {
            const user = await User.findOne({
              attributes: ["name"],
              where: { id: createdByUserId },
            });

            const { addedByName } = user;
            const data = {
              content: name,
              info: `Added by ${addedByName} on ${new Date(
                createdAt
              ).toDateString()}`,
            };
            console.log(data);
            return data;
          } catch (err) {
            return err.message || "Some error occured while get user info";
          }
        } else {
          // The case which there is an update history
          try {
            const user = await User.findOne({
              attributes: ["name"],
              where: { id: discontinuedByUserId },
            });

            const { discontinuedByName } = user;
            return {
              content: name,
              info: `Changed by ${discontinuedByName} on ${new Date(
                discontinueAt
              ).toDateString()}`,
            };
          } catch (err) {
            return err.message || "Some error occured while get user info";
          }
        }
      });

      const result = await Promise.all(promises);
      res.send(result);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occured while get the diagnosis history",
      });
    }
  });

  router.post("/getHistoryByDate", async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
      const history = await Diagnosis.findAll({
        where: {
          createdAt: {
            [Op.and]: [
              {
                [Op.gte]: startDate,
              },
              {
                [Op.lte]: endDate,
              },
            ],
          },
        },
      });
      res.send(history);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while get historical data",
      });
    }
  });

  router.patch("/discontinueAssessment/:id", async (req, res) => {
    try {
      const queryResult = await DiagnosisAssessment.destroy({
        where: {
          uuid: req.params.id,
        },
      });

      io.to(`room-${req.body.patientUUId}-Doctor`).emit(
        "DISCONTINUE_DIAGNOSIS_ASSESSMENT",
        req.params.id
      );
      res.send(
        "ok"
      ); /* Fix: Instead of sending the whole objefct only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while patch the Diagnosis",
      });
    }
  });

  return router;
};
