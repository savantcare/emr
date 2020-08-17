const router = require("express").Router();
const db = require("/gt/sc-prog-repos/emr/ptserver/models");
const Reminder = db.reminderDB.rems;
const User = db.userDB.users;
const { Op } = require("sequelize");

module.exports = (io, sequelize) => {
  router.post("/", async (req, res) => {
    try {
      const { data } = req.body;
      const patientId = data.ptUUID;
      const newReminder = await Reminder.create(data);
      /* Goal: we want to get each record's success and failure response
          So, we are using create and not using bulkCreate and making separate api query for each data */
      // console.log(newReminder)
      /* this informs all the clients.
       -doctor is added so that DA does not get high security messages on their socket. 
       So components that DA does not have access to they will not get the message
       Question: What is inside newReminder?
       */
      // console.log(`room-${patientId}-Doctor`)
      // console.log(newReminder)
      // io.to(`room-${patientId}-Doctor`).emit("ADD_REMINDER", newReminder);

      res.send(
        "ok"
      ); /* Fix: Instead of sending the whole object only OK needs to be sent */
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recommenation",
      });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const { patientId } = req.query;
      const queryResult = await Reminder.findAll({
        where: {
          ptUUID: patientId,
          // discontinue: {
          //   [Op.ne]: 1
          // }
        },
      });
      res.send(queryResult);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while fetching the Recommenation",
      });
    }
  });

  router.get("/getAll/", async (req, res) => {
    try {
      const getAll = await Reminder.sequelize.query(
        "SELECT *,UNIX_TIMESTAMP(ROW_START) as ROW_START, UNIX_TIMESTAMP(ROW_END) as ROW_END FROM rems FOR SYSTEM_TIME ALL order by ROW_START desc",
        {
          type: Reminder.sequelize.QueryTypes.SELECT,
        }
      );
      res.send(getAll);
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
      // console.log(req.body.description, req.params.id);
      await Reminder.update(
        {
          description: req.body.description,
        },
        {
          where: {
            uuid: req.params.id,
          },
        }
      );

      /* io.to(`room-${req.body.patientId}-Doctor`).emit(
        "UPDATE_REMINDER",
        req.body
      ); */
      res.send(
        "ok"
      ); /* Fix: Instead of sending the whole object only OK needs to be sent */
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while update the Reminder",
      });
    }
  });

  router.patch("/:id", async (req, res) => {
    try {
      // First update discontinuie notes and then delete row
      if (req.body.dNotes) {
        await Reminder.update(
          {
            notes: req.body.dNotes,
          },
          {
            where: {
              uuid: req.params.id,
            },
          }
        );
      }

      const queryResult = await Reminder.destroy({
        where: {
          uuid: req.params.id,
        },
      });
      io.to(`room-${req.body.patientId}-Doctor`).emit(
        "DISCONTINUE_REMINDER",
        req.params.id
      );
      res.send(
        "ok"
      ); /* Fix: Instead of sending the whole objefct only OK needs to be sent */
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while patch the Reminder",
      });
    }
  });

  router.get("/getHistory/:id", async (req, res) => {
    try {
      const histories = await Reminder.sequelize.query(
        "SELECT *,ROW_START, ROW_END FROM reminder_news FOR SYSTEM_TIME ALL where uuid = :uuid order by ROW_START desc",
        {
          replacements: { uuid: req.params.id },
          type: Reminder.sequelize.QueryTypes.SELECT,
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
        const { description, recordChangedByUUID, ROW_START } = history;

        if (histories.length - 1 == index) {
          // The case which there is no update history
          try {
            const user = await User.findOne({
              attributes: ["name"],
              where: { id: recordChangedByUUID },
            });
            const { name } = user;
            const data = {
              content: `${description}`,
              info: `Added by ${name} on ${new Date(ROW_START).toDateString()}`,
              type: `success`,
            };
            // console.log(data)
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
              content: `${description}`,
              info: `Changed by ${name} on ${new Date(
                ROW_START
              ).toDateString()}`,
              type: `primary`,
            };
            // console.log(data)
            return data;
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
          err.message || "Some error occured while get the reminder history",
      });
    }
  });

  router.post("/getHistoryByDate", async (req, res) => {
    const { startDate, endDate } = req.body;
    try {
      const history = await Reminder.findAll({
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

  return router;
};
