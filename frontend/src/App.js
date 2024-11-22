import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; // Corrected to reference the Login.jsx file
import HomePage from './Components/HomePage/HomePage';
import ProtectedRoute from './Components/ProtectedRoute'; // Import the ProtectedRoute
import RandomAffirmations from './Components/RandomAffirmations/RandomAffirmations';
import Quiz from './Components/Quiz/Quiz';
import ReportPage from './Components/ReportPage/ReportPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Ensure path matches the initial route */}
                
                {/* Protect the /home route */}
                <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
                <Route path="/random-affirmations" element={<RandomAffirmations />} /> 
                <Route path="/quiz" element={<Quiz />} /> 
                <Route path="/reports" element={<ReportPage />} /> 
            </Routes>
        </Router>
    );
};

export default App;

