const express = require('express')
const router = express.Router()
const db = require('../models')
const Appointment = db.appointmentDB.appt

router.get('/', async (req, res) => {
  try {
    const result = await Appointment.findAll({
      order: [['dateTimeOfAppt', 'ASC']]
    })
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while fetching the patient appointments"
    })
  }
})

module.exports = router