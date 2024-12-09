const mongoose = require('mongoose');
const ChatbotMedicine = require('./model/ChatbotMedicine'); // Adjust the path as necessary

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Vital_Aura', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log('Connected to MongoDB');

        // Define the initial data
        const medicines = [
            { name: 'Aspirin', dosage: '500mg', sideEffects: ['Nausea', 'Stomach pain'], interactions: ['Warfarin'], uses: ['Pain relief'], notes: 'Take with food.' },
            { name: 'Ibuprofen', dosage: '200mg', sideEffects: ['Dizziness', 'Nausea'], interactions: ['Aspirin'], uses: ['Pain relief', 'Anti-inflammatory'], notes: 'Do not exceed 1200mg per day.' },
            { name: 'Paracetamol', dosage: '500mg', sideEffects: ['Liver damage if overdosed'], interactions: ['Alcohol'], uses: ['Pain relief', 'Fever reducer'], notes: 'Do not exceed 4000mg per day.' },
            { name: 'Amoxicillin', dosage: '250mg', sideEffects: ['Nausea', 'Diarrhea'], interactions: ['Warfarin'], uses: ['Bacterial infections'], notes: 'Complete the full course.' },
            // Add more medicines as needed
        ];

        // Insert the data into the database
        await ChatbotMedicine.insertMany(medicines);
        console.log('Data seeded successfully');

        // Close the connection
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        mongoose.connection.close();
    });