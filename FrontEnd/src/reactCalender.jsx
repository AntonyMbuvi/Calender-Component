import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';

function ReactCalendar() {
    const [value, onChange] = useState(new Date());

    const handleChange = (newValue) => {
        // Format the date in "dd/mm/yyyy" format
        const formattedDate = format(newValue, 'dd/MM/yyyy');
        onChange(formattedDate);
        console.log(value)
    };

    return (
        <>
            <Calendar onChange={handleChange} value={value} />
        </>
    );
}

export default ReactCalendar;
