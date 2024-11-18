// import React from 'react';
// import MedicineItem from './MedicineItem';

// const MedicineList = ({ medicines, onDelete, onUpdate }) => {
//   return (
//     <div className="medicine-list">
//       {medicines.map((medicine) => (
//         <MedicineItem
//           key={medicine._id}
//           medicine={medicine}
//           onDelete={onDelete}
//           onUpdate={onUpdate}
//         />
//       ))}
//     </div>
//   );
// };

// export default MedicineList;





import React from 'react';
import MedicineItem from './MedicineItem';
import './MedicineList.css';

const MedicineList = ({ medicines, onEdit, onDelete }) => {
  return (
    <div className="medicine-list">
      {medicines.map((medicine, index) => (
        <MedicineItem 
          key={index}
          index={index}
          medicine={medicine}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default MedicineList;
