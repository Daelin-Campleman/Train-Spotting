const express = require("express");
const router = express.Router();
const landingController = require("../controller/landingController")

router.get("/", landingController.landing);
router.get("/test", landingController.testLanding);

module.exports = router;
