const router = require('express').Router()
const db = require('../models')
const { uuid } = require('uuidv4');

const Birthplace = db.socialHistoryDB.birthplace
const LivesWith = db.socialHistoryDB.livesWith
const LivesIn = db.socialHistoryDB.livesIn
const NumberOfChildren = db.socialHistoryDB.numberOfChildren
const UserGender = db.socialHistoryDB.userGender
const UserDateOfBirth = db.socialHistoryDB.userDateOfBirth
const MaritalHistory = db.socialHistoryDB.maritalHistory
const OtherMajorLifeEvent = db.socialHistoryDB.otherMajorLifeEvent
const EmploymentHistory = db.socialHistoryDB.employmentHistory
const EducationHistory = db.socialHistoryDB.educationHistory


router.post('/', async (req, res) => {
  console.log(req.body)
  const { birthPlace, livesWith, livesIn, numberOfChildren, biologicalGender, patientPreferredGender,
    userDateOfBirth, maritalHistory, otherMajorEvent, employmentHistory, educationHistory } = req.body
  if (birthPlace != null) {
    await Birthplace.create({
      uuid: uuid(),
      value: birthPlace
    })
  }
  if (livesWith != null) {
    await LivesWith.create({
      uuid: uuid(),
      value: livesWith
    })
  }
  if (livesIn != null) {
    await LivesIn.create({
      uuid: uuid(),
      value: livesIn
    })
  }
  if (numberOfChildren != null) {
    await NumberOfChildren.create({
      uuid: uuid(),
      value: numberOfChildren
    })
  }
  if (biologicalGender != null) {
    await UserGender.create({
      uuid: uuid(),
      value: biologicalGender,
      genderType: 1
    })
  }
  if (patientPreferredGender != null) {
    await UserGender.create({
      uuid: uuid(),
      value: patientPreferredGender,
      genderType: 2
    })
  }
  if (userDateOfBirth != null) {
    await UserDateOfBirth.create({
      uuid: uuid(),
      dateOfBirth: userDateOfBirth
    })
  }
  if (maritalHistory != null) {
    const newHistory = maritalHistory.filter(history => {
      return history.isNew == true
    })
    await MaritalHistory.bulkCreate(newHistory)
  }

  if (otherMajorEvent != null) {
    const newHistory = otherMajorEvent.filter(history => {
      return history.isNew == true
    })
    await OtherMajorLifeEvent.bulkCreate(newHistory)
  }
  if (employmentHistory != null) {
    const newHistory = employmentHistory.filter(history => {
      return history.isNew == true
    })
    await EmploymentHistory.bulkCreate(newHistory)
  }
  if (educationHistory != null) {
    const newHistory = educationHistory.filter(history => {
      return history.isNew == true
    })
    await EducationHistory.bulkCreate(newHistory)
  }

  res.send("Ok")
})

router.get('/', async (req, res) => {
  try {
    const birthplace = await Birthplace.findOne({ order: [["createdAt", "DESC"]] }) || { value: "" }
    const livesWith = await LivesWith.findOne({ order: [["createdAt", "DESC"]] }) || { value: "" }
    const livesIn = await LivesIn.findOne({ order: [["createdAt", "DESC"]] }) || { value: "" }
    const numberOfChildren = await NumberOfChildren.findOne({ order: [["createdAt", "DESC"]] }) || { value: "" }
    const biologicalGender = await UserGender.findOne({ where: { genderType: 1 }, order: [["createdAt", "DESC"]] }) || { value: "" }
    const patientPreferredGender = await UserGender.findOne({ where: { genderType: 2 }, order: [["createdAt", "DESC"]] }) || { value: "" }
    const userDateOfBirth = await UserDateOfBirth.findOne({ order: [["createdAt", "DESC"]] }) || { dateOfBirth: "" }
    const maritalHistory = await MaritalHistory.findAll()
    const otherMajorLifeEvent = await OtherMajorLifeEvent.findAll()
    const employmentHistory = await EmploymentHistory.findAll()
    const educationHistory = await EducationHistory.findAll()

    res.send({
      birthPlace: birthplace.value,
      livesWith: livesWith.value,
      livesIn: livesIn.value,
      numberOfChildren: numberOfChildren.value,
      biologicalGender: biologicalGender.value,
      patientPreferredGender: patientPreferredGender.value,
      userDateOfBirth: userDateOfBirth.dateOfBirth,
      maritalHistory: maritalHistory,
      otherMajorEvent: otherMajorLifeEvent,
      employmentHistory: employmentHistory,
      educationHistory: educationHistory
    })
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the Setting"
    })
  }
})



module.exports = router