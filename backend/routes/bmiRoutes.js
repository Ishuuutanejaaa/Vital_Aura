const express = require("express");
const { createBMI, getAllBMI } = require("../controllers/bmiController");

const router = express.Router();

router.post("/bmi", createBMI);
router.get("/bmi", getAllBMI);

module.exports = router;