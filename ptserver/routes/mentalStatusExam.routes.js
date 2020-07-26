const router = require('express').Router()
const db = require('../models')
const { QueryTypes } = require('sequelize')

const Appearence = db.mentalStatusExamDB.appearence
const Attitude = db.mentalStatusExamDB.attitude
const Cognition = db.mentalStatusExamDB.cognition
const Constitutional = db.mentalStatusExamDB.constitutional
const EyeContact = db.mentalStatusExamDB.eyeContact
const ImpulseControl = db.mentalStatusExamDB.impulseControl
const ThoughtProcess = db.mentalStatusExamDB.thoughtProcess
const Psychomotor = db.mentalStatusExamDB.psychomotor
const Insight = db.mentalStatusExamDB.insight
const Speech = db.mentalStatusExamDB.speech
const Judgement = db.mentalStatusExamDB.judgement
const Affect = db.mentalStatusExamDB.affect
const ThoughtContent = db.mentalStatusExamDB.thoughtContent
const Neurological = db.mentalStatusExamDB.neurological
const Perception = db.mentalStatusExamDB.perception

router.post('/updateAppearence', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Appearence Data____')
    console.log(data)

    const existingList = await Appearence.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Appearence.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Appearence.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Appearence"
    })
  }
})

router.post('/getAppearence', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Appearence.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM appearence FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get appearence"
    })
  }
})

router.post('/updateAttitude', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Attitude Data____')
    console.log(data)

    const existingList = await Attitude.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Attitude.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Attitude.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Attitude"
    })
  }
})

router.post('/getAttitude', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Attitude.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM attitude FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get attitude"
    })
  }
})

router.post('/updateCognition', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Cognition Data____')
    console.log(data)

    const existingList = await Cognition.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Cognition.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Cognition.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Cognition"
    })
  }
})

router.post('/getCognition', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Cognition.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM cognition FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get cognition"
    })
  }
})

router.post('/updateConstitutional', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Constitutional Data____')
    console.log(data)

    const existingList = await Constitutional.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Constitutional.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Constitutional.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Constitutional"
    })
  }
})

router.post('/getConstitutional', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Constitutional.sequelize.query('SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM constitutional FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId',
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get constitutional"
    })
  }
})

router.post('/updateEyeContact', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update EyeContact Data____')
    console.log(data)

    const existingList = await EyeContact.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await EyeContact.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await EyeContact.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the EyeContact"
    })
  }
})

router.post('/getEyeContact', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await EyeContact.sequelize.query(`SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM \`eye-contact\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get eye-contact"
    })
  }
})

router.post('/updateImpulseControl', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update ImpulseControl Data____')
    console.log(data)

    const existingList = await ImpulseControl.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await ImpulseControl.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await ImpulseControl.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the ImpulseControl"
    })
  }
})

router.post('/getImpulseControl', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await ImpulseControl.sequelize.query(`SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM \`impulse-control\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get impulse-control"
    })
  }
})

router.post('/updateThoughtProcess', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update ThoughtProcess Data____')
    console.log(data)

    const existingList = await ThoughtProcess.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await ThoughtProcess.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await ThoughtProcess.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the ThoughtProcess"
    })
  }
})

router.post('/getThoughtProcess', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await ThoughtProcess.sequelize.query(`SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM \`thought-process\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get thought-process"
    })
  }
})

router.post('/updatePsychomotor', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Psychomotor Data____')
    console.log(data)

    const existingList = await Psychomotor.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Psychomotor.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Psychomotor.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Psychomotor"
    })
  }
})

router.post('/getPsychomotor', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Psychomotor.sequelize.query(`SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM \`psychomotor\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get psychomotor"
    })
  }
})

router.post('/updateInsight', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Insight Data____')
    console.log(data)

    const existingList = await Insight.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Insight.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Insight.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Insight"
    })
  }
})

router.post('/getInsight', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Insight.sequelize.query(`SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM \`insight\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get insight"
    })
  }
})

router.post('/updateSpeech', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Speech Data____')
    console.log(data)

    const existingList = await Speech.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Speech.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Speech.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Speech"
    })
  }
})

router.post('/getSpeech', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Speech.sequelize.query(`SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM \`speech\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get speech"
    })
  }
})

router.post('/updateJudgement', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Judgement Data____')
    console.log(data)

    const existingList = await Judgement.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Judgement.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Judgement.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Judgement"
    })
  }
})

router.post('/getJudgement', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Judgement.sequelize.query(`SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM \`judgement\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get judgement"
    })
  }
})

router.post('/updateAffect', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Affect Data____')
    console.log(data)

    const existingList = await Affect.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Affect.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Affect.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Affect"
    })
  }
})

router.post('/getAffect', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Affect.sequelize.query(`SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM \`affect\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get affect"
    })
  }
})

router.post('/updateThoughtContent', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update ThoughtContent Data____')
    console.log(data)

    const existingList = await ThoughtContent.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await ThoughtContent.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await ThoughtContent.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the ThoughtContent"
    })
  }
})

router.post('/getThoughtContent', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await ThoughtContent.sequelize.query(`SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM \`thought-content\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get thought-content"
    })
  }
})

router.post('/updateNeurological', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Neurological Data____')
    console.log(data)

    const existingList = await Neurological.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Neurological.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Neurological.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Neurological"
    })
  }
})

router.post('/getNeurological', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Neurological.sequelize.query(`SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM \`neurological\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get neurological"
    })
  }
})

router.post('/updatePerception', async (req, res) => {
  try {
    const { data } = req.body
    console.log('___Update Perception Data____')
    console.log(data)

    const existingList = await Perception.findAll({ where: { patientUUID: data.patientUUID } })
    let result = null
    if (existingList.length > 0) {
      result = await Perception.update(data, {
        where: { patientUUID: data.patientUUID }
      })
    } else {
      result = await Perception.create(data)
    }

    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Perception"
    })
  }
})

router.post('/getPerception', async (req, res) => {
  try {
    const { patientId } = req.body
    const queryResult = await Perception.sequelize.query(`SELECT *, UNIX_TIMESTAMP(ROW_START) AS ROW_START, UNIX_TIMESTAMP(ROW_END) AS ROW_END FROM \`perception\` FOR SYSTEM_TIME ALL WHERE patientUUID=:patientId`,
      {
        replacements: { patientId: patientId },
        type: QueryTypes.SELECT
      }
    )
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while get perception"
    })
  }
})

module.exports = router