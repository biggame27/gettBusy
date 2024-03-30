"use client"
import DateObj from '@/components/DateObj';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const CalendarComponent = ({tasks} : {tasks:any}) => {
  const currentDate = new Date();
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

    let taskThing = [];
    // somehow gotta check for year swaps
    for (let i = 0; i < tasks.length; i++)
      if  ((tasks[i].year == changeableYear && Math.abs(changeableMonth-tasks[i].month) <= 1) || (tasks[i].year < changeableYear && tasks[i].month == 11 && changeableMonth == 0) ||
      (tasks[i].year > changeableYear && tasks[i].month == 0 && changeableMonth == 11))
        taskThing.push(tasks[i]);
    let cnt = 0;
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfWeek)) {
          const dateRender = lastDayOfLastMonth.getDate()-firstDayOfWeek+j+1;
          let stuffToRender = []
          // check for december and jan edge cases
          if (changeableMonth == 0) {
            while (cnt < taskThing.length && taskThing[cnt].year < changeableYear && taskThing[cnt].date < dateRender-j)
              cnt++;
            while (cnt < taskThing.length && taskThing[cnt].year < changeableYear && taskThing[cnt].date == dateRender){
              stuffToRender.push(taskThing[cnt])
              cnt++;
            }
          } else {
            while (cnt < taskThing.length && taskThing[cnt].month < changeableMonth && taskThing[cnt].date < dateRender-j){
              cnt++;
            }
            while (cnt < taskThing.length && taskThing[cnt].month == changeableMonth-1 && taskThing[cnt].date == dateRender) {
              stuffToRender.push(taskThing[cnt])
              cnt++;
            }
          }
          row.push(<DateObj key={`${i}-${j}`} value={dateRender} isCurrentMonth={false} isSelected={false} render={stuffToRender} />)

        } else if (dayCounter > lastDateOfMonth) {
          let stuffToRender = []
          // another check for december and jan :///
          
          while (cnt < taskThing.length && ((taskThing[cnt].month == changeableMonth+1 && taskThing[cnt].date == daysAfter) || 
          (taskThing[cnt].year == changeableYear+1 && taskThing[cnt].month == 0 && taskThing[cnt].date == daysAfter))){
            stuffToRender.push(taskThing[cnt])
            cnt++;
          }
          row.push(<DateObj key={`${i}-${j}`} value={daysAfter} isCurrentMonth={false} isSelected={false} render={stuffToRender}/>);
          daysAfter++;
        }
        else {
          let stuffToRender = []
          while (cnt < taskThing.length && taskThing[cnt].month == changeableMonth && taskThing[cnt].date == dayCounter) {
            stuffToRender.push(taskThing[cnt])
            cnt++;
          }

          row.push(<DateObj key={`${i}-${j}`} value={dayCounter} isCurrentMonth={true} isSelected={false} render={stuffToRender} />)
          dayCounter++;
        }
      }
      // days.push(<tr key={i}>{row}</tr>);
      days.push(row);
    }

    return (
      <div>
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
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
    <div className="calendar w-4/6">
      <div className="calendar-header">
        {/* <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2> */}
        <h2>{months[changeableMonth]}, {changeableYear}</h2>
        <div className="flex justify-between">
          <Button onClick={handlePrevMonth}>Previous Month</Button>
          <Button onClick={handleNextMonth}>Next Month</Button>
        </div>
        
      </div>
      {renderCalendar()}
    </div>
  );
}

export default CalendarComponent;