const router = require('express').Router()
const db = require('../models')
const Setting = db.settingDB.settings

router.post('/', async (req, res) => {
  try {
    const newSetting = await Setting.create(req.body)
    res.send(newSetting)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Setting"
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const queryResult = await Setting.findAll()
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the Setting"
    })
  }
})



module.exports = router