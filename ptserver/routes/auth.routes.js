const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { uuid } = require('uuidv4');

const db = require('../models')
const User = db.userDB.users

const expiresIn = '1h'
const SECRET_KEY = '123456789'

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (await isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = 'Email and Password already exist';
    res.status(status).json({ status, message });
    return
  }

  try {
    const userObj = req.body
    userObj["id"] = uuid()
    const newUser = await User.create(userObj)
    const access_token = createToken({ email })
    res.status(200).json({ access_token: access_token, role: newUser.roleId })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User"
    })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const queryResult = await User.findAll({
    where: {
      email: email,
      password: password
    }
  })
  if (queryResult.length > 0) {
    const user = queryResult[0]
    const access_token = createToken({ email })
    res.status(200).json({ access_token: access_token, roleUUID: user.roleUUID, userUUID: user.uuid })
  } else {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({ status, message })
  }
})

// Check if the user exists in database
async function isAuthenticated({ email, password }) {
  const data = await User.findAll({
    where: {
      email: email,
      password: password
    }
  })
  return data.length > 0 ? true : false
}

// Create a token from a payload 
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

module.exports = router