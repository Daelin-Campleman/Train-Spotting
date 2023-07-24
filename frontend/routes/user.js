const express = require("express");
const router = express.Router();
const userController = require("../controller/userController")

router.get("/", userController.getLogin);
router.get("/game", userController.gameLevel1);

module.exports = router;
