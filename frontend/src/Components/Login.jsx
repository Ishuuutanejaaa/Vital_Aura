import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    gender: '',
    address: '',
    phoneNumber: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSwitch = () => setIsSignUp(!isSignUp);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignUp
      ? 'http://localhost:5000/api/person/register'
      : 'http://localhost:5000/api/person/login';

    const payload = isSignUp
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        if (isSignUp) {
          setIsSignUp(false);
        } else {
          localStorage.setItem('token', data.token);
          navigate('/home'); // Redirect to home page after successful login
        }
      } else {
        alert(data.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="log-body">
      <div className="background"></div>
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Log In Form */}
        <div className="form-container log-in-container">
          <form onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <a href="#">Forgot your password?</a>
            <button type="submit">Log In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <img src="/Vital Aura logo.png" alt="logo" />
              <h1>Welcome Back!</h1>
              <p>Stay healthy and motivated</p>
              <button className="ghost" onClick={handleSwitch}>
                Log In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <img src="/Vital Aura logo.png" alt="logo" />
              <h1>New Here?</h1>
              <p>Join us to track and maintain your health</p>
              <button className="ghost" onClick={handleSwitch}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
