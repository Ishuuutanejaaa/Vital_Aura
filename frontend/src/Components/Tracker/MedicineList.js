import React from 'react';
import { updateMedicineStatus, deleteMedicine } from '../services/api';

const MedicineList = ({ medicines, setMedicines }) => {
    const toggleStatus = async (id, status) => {
        const updatedMedicine = await updateMedicineStatus(id, { status: !status });
        setMedicines((prev) =>
            prev.map((med) => (med._id === id ? updatedMedicine : med))
        );
    };

    const handleDelete = async (id) => {
        await deleteMedicine(id);
        setMedicines((prev) => prev.filter((med) => med._id !== id));
    };

    return (
        <div className="medicine-list">
            {medicines.length > 0 ? (
                medicines.map((medicine) => (
                    <div key={medicine._id} className="medicine-item">
                        <p>
                            <strong>{medicine.name}</strong> - {medicine.dosage} - {medicine.time}
                        </p>
                        <button onClick={() => toggleStatus(medicine._id, medicine.status)}>
                            {medicine.status ? 'Taken' : 'Not Taken'}
                        </button>
                        <button onClick={() => handleDelete(medicine._id)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No medicines for this date.</p>
            )}
        </div>
    );
};

export default MedicineList;
