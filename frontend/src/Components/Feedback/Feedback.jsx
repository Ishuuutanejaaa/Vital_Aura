import React, { useState } from "react";
import axios from "axios";
import "./Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "General Feedback",
    rating: 5,
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/feedback", formData);
      alert(response.data.message || "Feedback submitted successfully!");
      setFormData({
        name: "",
        email: "",
        type: "General Feedback",
        rating: 5,
        comments: "",
      });
    } catch (error) {
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div
      className="feedback-container"
      style={{
        backgroundImage: `url('/feedbackbackgroundimage.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div className="feedback-form">
        <h2>We Value Your Feedback!</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Feedback Type:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="General Feedback">General Feedback</option>
            </select>
          </label>
          <label>
            Rating:
            <select name="rating" value={formData.rating} onChange={handleChange}>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star}
                </option>
              ))}
            </select>
          </label>
          <label>
            Comments:
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;

