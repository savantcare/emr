const router = require('express').Router()

const db = require('../models')
const Weight = db.bodyMeasurementDB.weight
const BMI = db.bodyMeasurementDB.bmi
const WaistCircumference = db.bodyMeasurementDB.waistCircumference
const BloodSugar = db.bodyMeasurementDB.bloodSugar
const Height = db.bodyMeasurementDB.height
const BloodPressure = db.bodyMeasurementDB.bloodPressure
const OxygenSaturation = db.bodyMeasurementDB.oxygenSaturation
const Pulse = db.bodyMeasurementDB.pulse
const Temperature = db.bodyMeasurementDB.temperature

const { QueryTypes } = require('sequelize')

router.post('/updateWeight', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Weight Data____')
    console.log(data)
    const result = await updateWeight(data)
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the Weight"
    })
  }
})

const updateWeight = async (data) => {
  const weights = await Weight.findAll({ where: { patientUUID: data.patientUUID } })
  let result = null
  if (weights.length > 0) {
    result = await Weight.update(data, {
      where: { patientUUID: data.patientUUID }
    })
  } else {
    result = await Weight.create(data)
  }
  return result
}

router.get('/getWeight', async (req, res) => {
  try {
    const queryResult = await Weight.sequelize.query('SELECT * FROM weight FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the Weight"
    })
  }
})

router.post('/updateBmi', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update BMI Data____')
    console.log(data)
    const bmis = await BMI.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (bmis.length > 0) {
      result = await BMI.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await BMI.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the BMI"
    })
  }
})

router.get('/getBmi', async (req, res) => {
  try {
    const queryResult = await BMI.sequelize.query('SELECT * FROM BMI FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the BMI"
    })
  }
})

router.post('/updateWaistCircumference', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update waistCircumference Data____')
    console.log(data)
    const waistCircumferences = await WaistCircumference.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (waistCircumferences.length > 0) {
      result = await WaistCircumference.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await WaistCircumference.create(data)
    }
    res.send(result)

  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the waist circumference"
    })
  }
})

router.get('/getWaistCircumferences', async (req, res) => {
  try {
    const queryResult = await WaistCircumference.sequelize.query('SELECT * FROM waistCircumference FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the wasit circumference"
    })
  }
})

router.post('/updateBloodSugar', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update BloodSugar Data____')
    console.log(data)
    const bloodSugars = await BloodSugar.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (bloodSugars.length > 0) {
      result = await BloodSugar.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await BloodSugar.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the blood sugar"
    })
  }
})

router.get('/getBloodSugar', async (req, res) => {
  try {
    const queryResult = await BloodSugar.sequelize.query('SELECT * FROM bloodSugar FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the bloodsugar"
    })
  }
})

router.post('/updateHeight', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Height Data____')
    console.log(data)
    const heights = await Height.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (heights.length > 0) {
      result = await Height.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Height.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the Height"
    })
  }
})

router.get('/getHeight', async (req, res) => {
  try {
    const queryResult = await Height.sequelize.query('SELECT * FROM height FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the height"
    })
  }
})

router.post('/updateBloodPressure', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update BloodPressure Data____')
    console.log(data)

    const bloodPressures = await BloodPressure.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (bloodPressures.length > 0) {
      result = await BloodPressure.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await BloodPressure.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the bloodPressure"
    })
  }
})

router.get('/getBloodPressure', async (req, res) => {
  try {
    const queryResult = await BloodPressure.sequelize.query('SELECT * FROM bloodPressure FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the bloodPressure"
    })
  }
})

router.post('/updateOxygenSaturation', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update OxygenSaturation Data____')
    console.log(data)

    const oxygenSaturations = await OxygenSaturation.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (oxygenSaturations.length > 0) {
      result = await OxygenSaturation.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await OxygenSaturation.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the oxygen saturation"
    })
  }
})

router.get('/getOxygenSaturation', async (req, res) => {
  try {
    const queryResult = await OxygenSaturation.sequelize.query('SELECT * FROM oxygenSaturation FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the oxygenSaturation"
    })
  }
})

router.post('/updatePulse', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Pulse Data____')
    console.log(data)

    const pulse = await Pulse.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (pulse.length > 0) {
      result = await Pulse.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Pulse.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the pulse"
    })
  }
})

router.get('/getPulse', async (req, res) => {
  try {
    const queryResult = await Pulse.sequelize.query('SELECT * FROM pulse FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the pulse"
    })
  }
})

router.post('/updateTemperature', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Temperature Data____')
    console.log(data)

    const temperature = await Temperature.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (temperature.length > 0) {
      result = await Temperature.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Temperature.create(data)
    }
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while update the temperature"
    })
  }
})

router.get('/getTemperature', async (req, res) => {
  try {
    const queryResult = await Temperature.sequelize.query('SELECT * FROM temperature FOR SYSTEM_TIME ALL', { type: QueryTypes.SELECT })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the temperature"
    })
  }
})

router.post('/updateBodyMeasurements', async (req, res) => {
  try {
    const { patientUUID, recordChangedByUUID, recordChangedFromIPAddress } = req.body
    if (req.body.waist) {
      const waist = { ...req.body.waist, patientUUID, recordChangedByUUID, recordChangedFromIPAddress }
      await updateWeight(waist)
    }
    res.send('success')
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while add the body measurements"
    })
  }
})

module.exports = router