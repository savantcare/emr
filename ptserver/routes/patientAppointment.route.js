const router = require('express').Router()
const db = require('../models')
const appt = db.patientAppointment.appt

router.post('/', async (req, res) => {
  try {
    const newComponent = await Component.create(req.body)
    res.send(newComponent)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Component"
    })
  }
})

router.get('/getByType/:id', async (req, res) => {
  try {
    const queryResult = await appt.findAll({
      where: { type: req.params.id }
    })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the records"
    })
  }
})



module.exports = router