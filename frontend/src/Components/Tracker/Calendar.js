// import React from 'react';
// import './Calendar.css';

// const Calendar = ({ selectedDate, onSelectDate }) => {
//   const dates = ['25 Fri', '26 Sat', '27 Sun', '28 Mon', '29 Tue', '30 Wed'];

//   return (
//     <div className="calendar">
//       <h2>April</h2>
//       <div className="dates">
//         {dates.map((date, index) => (
//           <div 
//             key={index} 
//             className={`date ${selectedDate === date ? 'active' : ''}`} 
//             onClick={() => onSelectDate(date)}
//           >
//             {date}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Calendar;



import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ selectedDate, onSelectDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateDates = (month, year) => {
    const totalDays = daysInMonth(month, year);
    let dates = [];
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(year, month, i);
      dates.push(date);
    }
    return dates;
  };

  const handleMonthChange = (direction) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const dates = generateDates(currentMonth, currentYear);

  return (
    <div className="calendar">
      <div className="month-navigation">
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <h2>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</h2>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>
      <div className="dates">
        {dates.map((date, index) => (
          <div
            key={index}
            className={`date ${selectedDate === date.toDateString() ? 'active' : ''}`}
            onClick={() => onSelectDate(date.toDateString())}
          >
            {date.getDate()} {date.toLocaleString('default', { weekday: 'short' })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
