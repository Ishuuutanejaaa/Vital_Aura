const BMI = require("../models/BMI");

exports.createBMI = async (req, res) => {
  const { name, height, weight, bmi, status } = req.body;

  try {
    const newEntry = new BMI({ name, height, weight, bmi, status });
    await newEntry.save();
    res.status(201).send("BMI data saved successfully!");
  } catch (err) {
    res.status(500).send("Error saving data.");
  }
};

exports.getAllBMI = async (req, res) => {
  try {
    const entries = await BMI.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).send("Error retrieving data.");
  }
};