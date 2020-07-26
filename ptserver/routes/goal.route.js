const router = require("express").Router();
const db = require("../models");
const Goal = db.goalDB.goals;
const User = db.userDB.users;
const { Op } = require("sequelize");
//const { uuid } = require('uuidv4');

module.exports = (io) => {
  router.post("/", async (req, res) => {
    try {
      //req.body.data[0].uuid = uuid();
      const { data, patientUUID } = req.body;
      const newGoal = await Goal.bulkCreate(data);

      //console.log(newGoal)
      /* this informs all the clients.
       -doctor is added so that DA does not get high security messages on their socket. 
       So components that DA does not have access to they will not get the message
       Question: What is inside newGoal?
       */
      //console.log(`room-${patientUUID}-Doctor`)
      //console.log(newGoal)

      io.to(`room-${patientUUID}-Doctor`).emit("ADD_GOAL", newGoal);
      res.send(
        newGoal
      ); /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Goal",
      });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const { patientUUID } = req.query;
      /* const queryResult = await Goal.findAll({
        where: {
          patientUUID: patientUUID,
          //discontinue: {
          //  [Op.ne]: 1
          //}
        },
      }); */

      const queryResult = await Goal.sequelize.query(
        "SELECT *, ROW_START, ROW_END FROM goal FOR SYSTEM_TIME ALL where patientUUID = :patientUUID ORDER BY ROW_START DESC",
        {
          replacements: { patientUUID: patientUUID },
          type: Goal.sequelize.QueryTypes.SELECT,
        }
      );

      res.send(queryResult);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching the Goal",
      });
    }
  });

  router.put("/:uuid", async (req, res) => {
    // Replace existing row with new row
    try {
      // Update the existing object to discontinue.
      await Goal.update(
        {
          score: req.body.score,
          startDate: req.body.startDate,
          recordChangedByUUID: req.body.recordChangedByUUID,
          recordChangedOnDateTime: req.body.recordChangedOnDateTime,
        },
        {
          where: {
            uuid: req.body.uuid,
          },
        }
      );

      io.to(`room-${req.body.patientUUID}-Doctor`).emit(
        "UPDATE_GOAL",
        req.body
      );
      res.send(
        "ok"
      ); /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while update the Goal",
      });
    }
  });

  router.patch("/:uuid", async (req, res) => {
    try {
      const queryResult = await Goal.destroy({
        where: {
          uuid: req.body.uuid,
        },
      });

      io.to(`room-${req.body.patientUUID}-Doctor`).emit(
        "DISCONTINUE_GOAL",
        req.body.uuid
      );
      res.send(
        "ok"
      ); /* Fix: Instead of sending the whole objefct only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while patch the Goal",
      });
    }
  });

  router.get("/getHistory/:id", async (req, res) => {
    try {
      /*const histories = await Goal.findAll({
        where: {
          uuid: req.params.id
        }
      })*/

      const histories = await Goal.sequelize.query(
        "SELECT *, ROW_START, ROW_END FROM goals FOR SYSTEM_TIME ALL where uuid = :uuid ORDER BY ROW_START DESC",
        {
          replacements: { uuid: req.params.id },
          type: Goal.sequelize.QueryTypes.SELECT,
        }
      );
      /**
       * Expect result:
       *  {
       *    "content": "History 1",
       *    "info": "Added by {User} on {Date}" || "Updated by {User} on {Date}"
       *  }
       *
       */

      const promises = histories.map(async (history, index) => {
        const {
          score,
          recordChangedByUUID,
          recordChangedOnDateTime,
          ROW_START,
        } = history;

        if (histories.length - 1 == index) {
          // The case which there is no update history
          try {
            const user = await User.findOne({
              attributes: ["name"],
              where: { id: recordChangedByUUID },
            });

            const { name } = user;
            const data = {
              content: `Score: ${score}`,
              info: `Added by ${name} on ${new Date(ROW_START).toDateString()}`,
              type: `success`,
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
              where: { id: recordChangedByUUID },
            });

            const { name } = user;
            return {
              content: `Score: ${score}`,
              info: `Changed by ${name} on ${new Date(
                ROW_START
              ).toDateString()}`,
              type: `primary`,
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
        message: err.message || "Some error occured while get the goal history",
      });
    }
  });

  router.post("/getHistoryByDate", async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
      const history = await Goal.findAll({
        where: {
          recordChangedOnDateTime: {
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

  return router;
};
