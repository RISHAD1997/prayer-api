const express = require("express");
const prayerData = require("../controller/index.js");

const router = express.Router();

router.get("/prayerData", prayerData);

module.exports = router;
