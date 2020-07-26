const router = require("express").Router();
const { uuid } = require("uuidv4");

const db = require("../models");
const UserRole = db.userDB.userRoles;

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newUserRole = await UserRole.create({
      id: uuid(),
      name: name,
    });
    res.send(newUserRole);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the UserRole",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const queryResult = await UserRole.findAll();
    res.send(queryResult);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while fetching the UserRole",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const queryResult = await UserRole.findOne({
      where: { uuid: req.params.id },
    });
    res.send(queryResult);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occured while fetching the UserRole",
    });
  }
});

module.exports = router;
