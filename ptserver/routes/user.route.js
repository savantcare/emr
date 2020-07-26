const router = require('express').Router()
const db = require('../models')
const User = db.userDB.users

router.post('/getDetail', async (req, res) => {
  try {
    const queryResult = await User.findAll({
      where: req.body
    })
    res.send(queryResult)
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the User"
    })
  }
})

module.exports = router