const router = require('express').Router()
const db = require('../models')
const ServiceStatement = db.serviceStatementDB.serviceStatements
const User = db.userDB.users
const { Op } = require("sequelize")

module.exports = (io) => {
  router.post('/', async (req, res) => {
    try {
      const { data, patientId } = req.body
      const newServiceStatement = await ServiceStatement.bulkCreate(data)       // See 
      console.log(newServiceStatement)
      /* this informs all the clients.
       -doctor is added so that DA does not get high security messages on their socket. 
       So components that DA does not have access to they will not get the message
       Question: What is inside newServiceStatement?
       */
      console.log(`room-${patientId}-Doctor`)
      console.log(newServiceStatement)
      io.to(`room-${patientId}-Doctor`).emit("ADD_SERVICE_STATEMENT", newServiceStatement)

      res.send(newServiceStatement) /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the service statement"
      })
    }
  })

  router.get('/', async (req, res) => {
    try {
      const { patientId } = req.query
      const queryResult = await ServiceStatement.findAll({
        where: {
          patientId: patientId,
          discontinue: {
            [Op.ne]: 1
          }
        }
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while fetching the service statement"
      })
    }
  })

  router.put('/:id', async (req, res) => {    // Replace existing row with new row
    try {
      // Update the existing object to discontinue.
      await ServiceStatement.update({
        discontinue: true,
        discontinueAt: new Date(),
        discontinuedByUserId: req.body.discontinuedByUserId
      }, {
        where: {
          id: req.params.id
        }
      })

      // Add new value
      const newData = {
        serviceStatementID: req.body.serviceStatementID,
        patientId: req.body.patientId,
        createdByUserId: req.body.createdByUserId,
        description: req.body.description,
        createdAt: new Date()
      }
      await ServiceStatement.create(newData)

      io.to(`room-${req.body.patientId}-Doctor`).emit("UPDATE_SERVICE_STATEMENT", req.body)
      res.send("ok") /* Fix: Instead of sending the whole object only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while update the ServiceStatement"
      })
    }
  })

  router.patch('/:id', async (req, res) => {
    try {
      const queryResult = await ServiceStatement.update({
        discontinue: true,
        discontinueAt: new Date()
      }, {
        where: {
          id: req.params.id
        }
      })
      io.to(`room-${req.body.patientId}-Doctor`).emit("DISCONTINUE_SERVICE_STATEMENT", req.params.id)
      res.send(queryResult) /* Fix: Instead of sending the whole objefct only OK needs to be sent*/
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while patch the ServiceStatement"
      })
    }
  })

  router.get('/getHistory/:id', async (req, res) => {
    try {
      const histories = await ServiceStatement.findAll({
        where: {
          serviceStatementID: req.params.id
        }
      })
      /**
       * Expect result:
       *  {
       *    "content": "History 1",
       *    "info": "Added by {User} on {Date}" || "Updated by {User} on {Date}"
       *  }
       * 
       */

      const promises = histories.map(async history => {
        const { description, createdByUserId, discontinuedByUserId, createdAt, discontinueAt } = history
        if (discontinuedByUserId == null) { // The case which there is no update history
          try {
            const user = await User.findOne({
              attributes: ['name'],
              where: { id: createdByUserId }
            })

            const { name } = user
            const data = {
              content: description,
              info: `Added by ${name} on ${new Date(createdAt).toDateString()}`
            }
            console.log(data)
            return data
          } catch (err) {
            return err.message || "Some error occured while get user info"
          }
        } else { // The case which there is an update history
          try {
            const user = await User.findOne({
              attributes: ['name'],
              where: { id: discontinuedByUserId }
            })

            const { name } = user
            return {
              content: description,
              info: `Changed by ${name} on ${new Date(discontinueAt).toDateString()}`
            }
          } catch (err) {
            return err.message || "Some error occured while get user info"
          }
        }
      })

      const result = await Promise.all(promises)
      res.send(result)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while get the serviceStatement history"
      })
    }
  })

  router.post("/getHistoryByDate", async (req, res) => {
    const { startDate, endDate } = req.body
    try {
      const history = await ServiceStatement.findAll({
        where: {
          createdAt: {
            [Op.and]: [
              {
                [Op.gte]: startDate
              },
              {
                [Op.lte]: endDate
              }
            ]
          }
        }
      })
      res.send(history)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while get historical data"
      })
    }
  })

  return router
}