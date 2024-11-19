import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; // Corrected to reference the Login.jsx file
import HomePage from './Components/HomePage/HomePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Ensure path matches the initial route */}
                <Route path="/home" element={<HomePage />} /> {/* Ensure path matches the initial route */}
                
            </Routes>
        </Router>
    );
};

export default App;
