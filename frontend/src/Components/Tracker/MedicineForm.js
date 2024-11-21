import React, { useState } from 'react';
import { addMedicine } from '../services/api';

const MedicineForm = ({ selectedDate, setMedicines }) => {
    const [name, setName] = useState('');
    const [dosage, setDosage] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const newMedicine = await addMedicine({ name, dosage, time, date: formattedDate });
        setMedicines((prev) => [...prev, newMedicine]);
        setName('');
        setDosage('');
        setTime('');
    };

    return (
        <form onSubmit={handleSubmit} className="medicine-form">
            <input
                type="text"
                placeholder="Medicine Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            />
            <button type="submit">Add Medicine</button>
        </form>
    );
};

export default MedicineForm;
