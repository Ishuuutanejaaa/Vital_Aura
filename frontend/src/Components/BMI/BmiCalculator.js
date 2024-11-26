import React, { useState } from "react";
import axios from "axios";

import "./BmiCalculator.css";

function BmiCalculator() {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();

    if (!name || !height || !weight) {
      alert("Please fill in all fields!");
      return;
    }

    const heightInMeters = height / 100;
    const calculatedBMI = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    let bmiStatus = "";
    if (calculatedBMI < 18.5) {
      bmiStatus = "Underweight";
    } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
      bmiStatus = "Normal weight";
    } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
      bmiStatus = "Overweight";
    } else {
      bmiStatus = "Obese";
    }

    setBmi(calculatedBMI);
    setStatus(bmiStatus);

    // Save to the backend
    // ...
  };

  return (
    <div className="bmi-calculator">
      <h1>BMI Calculator</h1>
      <form onSubmit={calculateBMI}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
        <button type="submit">Calculate BMI</button>
      </form>
      {bmi && (
        <div className="result">
          <h2>Hello {name}!</h2>
          <p>Your BMI: <strong>{bmi}</strong></p>
          <p>Status: <strong>{status}</strong></p>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default BmiCalculator;