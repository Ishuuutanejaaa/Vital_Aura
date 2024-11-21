import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ selectedDate, setSelectedDate }) => {
    return (
        <div className="calendar-container">
            <Calendar 
                onChange={setSelectedDate} 
                value={selectedDate} 
                tileClassName={({ date }) => 
                    date.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0]
                        ? 'selected-date'
                        : ''
                }
            />
        </div>
    );
};

export default CalendarComponent;
