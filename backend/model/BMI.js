const mongoose = require("mongoose");

const bmiSchema = new mongoose.Schema({
  name: String,
  height: Number,
  weight: Number,
  bmi: Number,
  status: String,
});

const BMI = mongoose.model("BMI", bmiSchema);

module.exports = BMI;