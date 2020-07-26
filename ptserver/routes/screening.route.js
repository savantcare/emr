const router = require('express').Router()
const db = require('../models')
const screensListMaster = db.screeningDB.screensListMaster
const screensAssignedToPatient = db.screeningDB.screensAssignedToPatient
const phq9PatientResponse = db.screeningDB.phq9PatientResponse
// const User = db.userDB.users
// const { Op } = require("sequelize")

//Screening

module.exports = (io) => {

  //  get the patient assigned screen list 
  router.get('/', async (req, res) => {
    try {
      //const { patientId, userId, date } = req.body
      const { patientUUID } = req.query

      const queryResult = await screensListMaster.sequelize.query('SELECT * FROM screensAssignedToPatients LEFT JOIN  screensListMasters ON screensAssignedToPatients.screenUUID = screensListMasters.uuid where screensAssignedToPatients.patientUUID=:patientUUID', {
        replacements: { patientUUID: patientUUID },
        type: screensListMaster.sequelize.QueryTypes.SELECT
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while fetching the Screening data"
      })
    }
  })

  router.get('/getScreenMasterList', async (req, res) => {
    try {

      //const { patientUUID } = req.query
      const queryResult = await screensListMaster.sequelize.query(
        'SELECT * FROM  screensListMasters ', {
        //replacements: { patientUUID: patientId },
        type: screensListMaster.sequelize.QueryTypes.SELECT
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while fetching the Screening"
      })
    }
  })

  router.post('/addPatientScreen', async (req, res) => {
    try {
      const { data, patientUUID, date } = req.body

      const newScreening = await screensAssignedToPatient.bulkCreate(data)

      const queryResult = await screensListMaster.sequelize.query('SELECT * FROM screensAssignedToPatients LEFT JOIN  screensListMasters ON screensAssignedToPatients.screenUUID = screensListMasters.uuid where screensAssignedToPatients.patientUUID=:patientUUID', {
        replacements: { patientUUID: patientUUID },
        type: screensListMaster.sequelize.QueryTypes.SELECT
      })
      res.send(queryResult)
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while fetching the Screening"
      })
    }
  })


  router.get('/getScreeningDetail', async (req, res) => {
    try {

      const { screentype, patientUUID } = req.query
      let returnData = {
        screentype: screentype,
        record: {}
      }

      if (screentype == 'PHQ9') {

        queryResult = await phq9PatientResponse.sequelize.query('SELECT * FROM phq9PatientResponses  where patientUUID=:patientUUID', {
          replacements: { patientUUID: patientUUID },
          type: phq9PatientResponse.sequelize.QueryTypes.SELECT
        })

        if (queryResult.length > 0) {
          returnData.record = queryResult[0]
        }

        res.send(returnData)
      }

    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while fetching the Screening"
      })
    }
  })

  router.post('/storeScreeningDetail', async (req, res) => {
    try {
      const { data, patientUUID, screentype, updateFlag } = req.body
      let returnData = {
        screentype: screentype,
        record: {}
      }

      if (screentype == 'PHQ9') {
        if (updateFlag == true) {
          const updateScreening = await phq9PatientResponse.update(data[0], {
            where: {
              patientUUID: patientUUID
            }
          })
        }
        else {
          const newScreening = await phq9PatientResponse.bulkCreate(data)
        }
        queryResult = await phq9PatientResponse.sequelize.query('SELECT * FROM phq9PatientResponses   where patientUUID=:patientUUID', {
          replacements: { patientUUID: patientUUID },
          type: phq9PatientResponse.sequelize.QueryTypes.SELECT
        })

        if (queryResult.length > 0) {
          returnData.record = queryResult[0]
        }

        res.send(returnData)
      }

    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while fetching the Screening"
      })
    }
  })

  router.get('/getScreenHistoryDetail', async (req, res) => {
    try {

      const { screentype, patientUUID } = req.query
      let returnData = {
        screentype: screentype,
        record: {}
      }

      if (screentype == 'PHQ9') {
        queryResult = await phq9PatientResponse.sequelize.query('SELECT *, row_start, row_end  FROM phq9PatientResponses  FOR SYSTEM_TIME ALL where patientUUID=:patientUUID', {
          replacements: { patientUUID: patientUUID },
          type: phq9PatientResponse.sequelize.QueryTypes.SELECT
        })

        if (queryResult.length > 0) {
          returnData.record = queryResult
        }

        res.send(returnData)
      }

    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occured while fetching the Screening"
      })
    }
  })





  return router
}