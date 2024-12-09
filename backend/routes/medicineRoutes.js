const express = require('express');
const router = express.Router();
const ChatbotMedicine = require('../model/ChatbotMedicine'); // Ensure this model is correct

// Get medicine information for the chatbot
router.get('/chatbot/medicines', async (req, res) => {
    try {
        const medicines = await ChatbotMedicine.find(); // Fetch all medicines
        res.json(medicines); // Send the medicines as a response
    } catch (error) {
        console.error('Error fetching medicines:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;