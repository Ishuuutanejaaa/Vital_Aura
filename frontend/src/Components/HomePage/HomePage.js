import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "../HomePage/HomePage.css"; // Import your CSS file

const HomePage = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div>
      {/* First Section */}
      <section id="FirstSection">
        {/* Navigation */}
        <nav className="navbar">
          <div className="container">
            <img src="logo.jpeg" alt="Logo" />
            <div className="navbar-ul">
              <ul className="list">
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/tracker">TRACKER</Link></li>
                <li> <Link to="/reminders">REMINDERS</Link></li>
                <li><Link to="/reports">REPORTS</Link>
                </li>
                <li><Link to="/products">PRODUCTS</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="first-section-content">
          {/* Text Content */}
          <div className="first-section-content-text">
            <h1>Feel Better About Finding HealthCare</h1>
            <p>Get the best health care for your child with our expert advice and tips.</p>
            <img src="main_page-removebg-preview.png" alt="Main" />

            {/* Buttons */}
            <div className="first-section-content-btns">
              <Link to="/quiz" style={{ textDecoration: "none", color: "inherit" }}>
                <a>
                  <i className="fa-solid fa-question"></i> Quiz
                </a>
              </Link>
              <Link to="/random-affirmations" style={{ textDecoration: "none", color: "inherit" }}>
                <a>
                  <i className="fa-solid fa-heart"></i> Random Affirmations
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
