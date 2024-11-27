import React, { useState } from 'react';
import axios from 'axios';
import './Newsletter.css'; // Optional CSS for styling

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/newsletter/subscribe', { email });
            setMessage(response.data.message);
            setEmail('');
        } catch (error) {
            setMessage("Error subscribing. Please try again.");
        }
    };

    return (
        <div className="newsletter-container">
            <h2>Subscribe to our Newsletter</h2>
            <form onSubmit={handleSubscribe}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit">Subscribe</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Newsletter;