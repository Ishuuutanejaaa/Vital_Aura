import React, { useState } from 'react';
import '../Newsletter/Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous message

    try {
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Successfully subscribed to the newsletter!');
        setEmail(''); // Clear input field
      } else {
        setMessage(result.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setMessage('Error: Could not subscribe. Please check your server.');
    }
  };

  return (
    <div className="newsletter-container">
      <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="newsletter-input"
        />
        <button type="submit" className="newsletter-button">
          Subscribe
        </button>
      </form>
      {message && <p className="newsletter-message">{message}</p>}
    </div>
  );
};

export default Newsletter;
