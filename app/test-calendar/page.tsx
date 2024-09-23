"use client";
import { useState } from 'react';
import ReactDatePicker from "react-datepicker";
import Test from '../../components/Test';

const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date | null, event?: React.SyntheticEvent) => {
    setStartDate(date); // Handle null for clearing the date
  };
  // Function to generate custom class names for days
  const getDayClassName = (date: Date): string => {
    const day = date.getDay();

    // Add a custom class for weekends
    if (day === 0 || day === 6) {
      return 'weekend-day';
    }

    // Add a special class for a specific date (e.g., December 25)
    if (date.getDate() === 25 && date.getMonth() === 11) {
      return 'holiday';
    }

    // Default class for other days
    return 'normal-day';
  };
  return (
    <div>   
      <h1>DATE HERE</h1> 
      <Test/>
      <ReactDatePicker
              
              onChange={handleDateChange}
              timeInputLabel="Time:"
              dateFormat={ "MM/dd/yyyy"}
              wrapperClassName="date-picker"
            />
  </div>
  )
}

export default Calendar