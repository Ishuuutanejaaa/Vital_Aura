// import React from 'react';

// const MedicineItem = ({ medicine, onDelete, onUpdate }) => {
//   return (
//     <div className="medicine-item">
//       <div>
//         <span>{medicine.name}</span>
//         <span>{medicine.dosage}</span>
//         <span>{medicine.time}</span>
//       </div>
//       <button onClick={() => onUpdate(medicine._id)}>Edit</button>
//       <button onClick={() => onDelete(medicine._id)}>Delete</button>
//     </div>
//   );
// };

// export default MedicineItem;






import React from 'react';
import './MedicineItem.css';

const MedicineItem = ({ medicine, index, onEdit, onDelete }) => {
  return (
    <div className="medicine-item">
      <div className="medicine-info">
        <p><strong>{medicine.name}</strong></p>
        <p>{medicine.dosage}</p>
        <p>{medicine.time}</p>
      </div>
      <div className="medicine-actions">
        <button onClick={() => onEdit(index)}>Edit</button>
        <button onClick={() => onDelete(index)}>Delete</button>
      </div>
    </div>
  );
};

export default MedicineItem;
