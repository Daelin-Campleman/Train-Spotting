const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")

// router.get("/", userController.getLogin);
router.get("/", userController.gameLevel1);

module.exports = router;
