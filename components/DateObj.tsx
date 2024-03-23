// Date.tsx
import React, {useState} from 'react';
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

interface DateObjProps {
  value: number; // The numerical value of the date (e.g., 1, 2, ..., 31)
  isCurrentMonth: boolean; // Indicates if the date belongs to the current month
  isSelected: boolean; // Indicates if the date is selected
}

const DateObj: React.FC<DateObjProps> = ({ value, isCurrentMonth, isSelected}) => {

  const [events, setEvents] = useState([""]);

  const onClick = () => {
    setEvents(prevEvents => [...prevEvents, "busy"]);
  }

  return (
      <div className= {`flex flex-col h-36 ${isCurrentMonth ? 'dark:text-gray-700' : 'dark:text-gray-400 overflow-y-auto'}`} >
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-x-2">
              <p className="font-medium text-md">
                {value}
              </p>
            </div>
            <AiOutlinePlus 
              size={20} 
              onClick={onClick}
              className="
                text-neutral-400 
                cursor-pointer 
                hover:text-white 
                transition
              "
            />
          </div>
          <div className="flex flex-col gap-y-2 mt-4 px-3">
            {events.map((event, index) => (
              <p key={index}>{event}</p>
            ))}
          </div>
        </div>
      </div>
  );

};

export default DateObj;
