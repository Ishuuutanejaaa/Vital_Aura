import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; // Corrected to reference the Login.jsx file

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Ensure path matches the initial route */}
            </Routes>
        </Router>
    );
};

export default App;
