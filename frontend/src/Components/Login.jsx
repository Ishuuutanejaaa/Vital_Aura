import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Styles/Login.module.css';

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
          setFormData({ ...formData, password: '' });
        } else {
          localStorage.setItem('token', data.token);
          navigate('/home');
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
    <div className={styles.logBody}>
      <div className={styles.container}>
        {isSignUp ? (
          <div className={styles.formContainer}>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
              <input type="number" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account?{' '}
              <button
                className={styles.linkButton}
                onClick={() => {
                  setIsSignUp(false);
                  setFormData({ ...formData, password: '' });
                }}
              >
                Log In
              </button>
            </p>
          </div>
        ) : (
          <div className={styles.formContainer}>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              <a href="#">Forgot your password?</a>
              <button type="submit">Log In</button>
            </form>
            <p>
              New here?{' '}
              <button className={styles.linkButton} onClick={() => setIsSignUp(true)}>
                Sign Up
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

