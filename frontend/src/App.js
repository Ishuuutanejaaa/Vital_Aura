import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; // Correct path for Login.jsx
import HomePage from './Components/HomePage/HomePage';
import ProtectedRoute from './Components/ProtectedRoute'; // Protect routes
import RandomAffirmations from './Components/RandomAffirmations/RandomAffirmations';
import Quiz from './Components/Quiz/Quiz';
import ReportPage from './Components/ReportPage/ReportPage';
import ProductList from './Components/Product/ProductList'; // Path to ProductList
import ProductCart from './Components/Product/ProductCart'; // Path to ProductCart
import { CartProvider } from './Components/Product/CartContext'; // Path to CartContext
import Feedback from './Components/Feedback/Feedback';

const App = () => {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    {/* Existing Main Website Routes */}
                    <Route path="/" element={<Login />} /> 
                    <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
                    <Route path="/random-affirmations" element={<RandomAffirmations />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/reports" element={<ReportPage />} />
                    <Route path="/feedback" element={<Feedback />} />

                    {/* Product App Routes */}
                    <Route path="/products" element={<ProductList />} /> 
                    <Route path="/cart" element={<ProductCart />} /> 
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;
