"use client"
import DateObj from '@/components/DateObj';
import React, { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const [changeableYear, setChangeableYear] = useState(year);
  const [changeableMonth, setChangeableMonth] = useState(month);
  const months = ["January", "February", "March", "April", "May" ,"June", "July", "August", "September", "October", "November", "December"];

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(changeableYear, changeableMonth, 1);
    const lastDayOfMonth = new Date(changeableYear, changeableMonth + 1, 0);
    const lastDayOfLastMonth = new Date(changeableYear, changeableMonth, 0);
    // gives numeric day (monday is 1)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const lastDateOfMonth = lastDayOfMonth.getDate();

    const numRows = Math.ceil((lastDateOfMonth + firstDayOfWeek) / 7);

    let days = [];
    let dayCounter = 1;
    let daysAfter = 1;

    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfWeek)) {
          const dateRender = lastDayOfLastMonth.getDate()-firstDayOfWeek+j+1;
          row.push(<DateObj key={`${i}-${j}`} value={dateRender} isCurrentMonth={false} isSelected={false}/>)
          //row.push(<td key={`${i}-${j}`} className="dark:text-gray-400">{lastDayOfLastMonth.getDate()-firstDayOfWeek+j+1}</td>);
        } else if (dayCounter > lastDateOfMonth) {
          row.push(<DateObj key={`${i}-${j}`} value={daysAfter} isCurrentMonth={false} isSelected={false}/>);
          daysAfter++;
        }
        else {
          row.push(<DateObj key={`${i}-${j}`} value={dayCounter} isCurrentMonth={true} isSelected={false} />)
          dayCounter++;
        }
      }
      // days.push(<tr key={i}>{row}</tr>);
      days.push(row);
    }

    return (
      <div>
        {/* <table className="w-full h-96 text-sm text-left rtl:text-right table-fixed">
          <thead>
            <tr>
              <th>Sunday</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
              <th>Saturday</th>
            </tr>
          </thead>
          <tbody >{days}</tbody>
        </table> */}

        <div className="flex-1 grid grid-cols-7 grid-rows-5 w-screen">
          {days.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((day, index) => (
                <div key={index} className="border">
                  {day}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      
    );
  };

  const handlePrevMonth = () => {
    let newChange = 0;
    if (changeableMonth == 0){
      newChange = 11;
      setChangeableYear(changeableYear-1);
    } else {
      newChange = changeableMonth - 1;
    }

    setChangeableMonth(newChange);
  };

  const handleNextMonth = () => {
    let newChange = 0;
    if (changeableMonth == 11){
      newChange = 0;
      setChangeableYear(changeableYear+1);
    } else {
      newChange = changeableMonth + 1;
    }

    setChangeableMonth(newChange);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        {/* <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2> */}
        <h2>{months[changeableMonth]}, {changeableYear}</h2>
        <div className="flex justify-between">
          <button onClick={handlePrevMonth}>Previous Month</button>
          <button onClick={handleNextMonth}>Next Month</button>
        </div>
        
      </div>
      {renderCalendar()}
    </div>
  );
}

export default Calendar;