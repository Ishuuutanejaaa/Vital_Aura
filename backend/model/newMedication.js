// const mongoose = require('mongoose')

// const MedicationSchema = new mongoose.Schema({
//     name: String,
//     totalQuantity: String,
//     dosage: String,
//     frequency: String,
//     startDate: Date,
//     time: [],
//     reminder: [Number],
//     notes: String,
//     taken: [{ date: Date, status: Boolean }], // Ensure this is defined
//     owner: {
//         type: String,
//         ref: 'User ',
//         required: true
//     }

//     // owner: {
//     //     type: String,
//     //     ref: 'User',
//     //     required: true
//     // }
// });

// module.exports = mongoose.model('Medication', MedicationSchema)



const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalQuantity: { type: Number, required: true },
    dosage: { type: String, required: true },
    startDate: { type: Date, required: true },
    frequency: { type: String, required: true },
    time: { type: [String], required: true },
    reminder: { type: [Number], required: true },
    notes: { type: String },
    owner: { type: String, required: true } // Ensure this field is included
});

const Medication = mongoose.model('Medication', MedicationSchema);
module.exports = Medication;