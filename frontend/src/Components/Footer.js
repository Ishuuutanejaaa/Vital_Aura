// Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"; // Make sure to create this CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/tracker">Tracker</Link>
          <Link to="/reminders">Reminders</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/products">Products</Link>
        </div>
        <div className="footer-socials">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
        <p className="footer-text">© 2023 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;