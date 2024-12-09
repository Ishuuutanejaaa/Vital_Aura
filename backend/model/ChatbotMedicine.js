const mongoose = require('mongoose');

const ChatbotMedicineSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    dosage: { type: String },
    sideEffects: { type: [String] },
    interactions: { type: [String] },
    uses: { type: [String] },
    notes: { type: String },
});

module.exports = mongoose.model('ChatbotMedicine', ChatbotMedicineSchema);