



import React, { useState } from 'react';
import './AddMedicine.css';

const AddMedicine = ({ medicine, onChange, onSave }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!medicine.name) newErrors.name = 'Medicine Name is required';
    if (!medicine.dosage) newErrors.dosage = 'Dosage is required';
    if (!medicine.time) newErrors.time = 'Time is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave();
    }
  };

  return (
    <div className="medicine-form">
      <input
        type="text"
        name="name"
        placeholder="Medicine Name"
        value={medicine.name}
        onChange={onChange}
      />
      {errors.name && <div className="error">{errors.name}</div>}
      
      <input
        type="text"
        name="dosage"
        placeholder="Dosage"
        value={medicine.dosage}
        onChange={onChange}
      />
      {errors.dosage && <div className="error">{errors.dosage}</div>}
      
      <input
        type="text"
        name="time"
        placeholder="Time"
        value={medicine.time}
        onChange={onChange}
      />
      {errors.time && <div className="error">{errors.time}</div>}
      
      <button onClick={handleSave}>
        {medicine.id != null ? 'Update Medicine' : 'Add Medicine'}
      </button>
    </div>
  );
};

export default AddMedicine;
