// Date.tsx
import React, {useState} from 'react';
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import TaskComponent from './TaskComponent';

interface DateObjProps {
  value: number; // The numerical value of the date (e.g., 1, 2, ..., 31)
  isCurrentMonth: boolean; // Indicates if the date belongs to the current month
  isSelected: boolean; // Indicates if the date is selected
  tasks: any;
  date: Date;
}

const DateObj: React.FC<DateObjProps> = ({ value, isCurrentMonth, isSelected, tasks, date}) => {

  const [events, setEvents] = useState([""]);

  const onClick = () => {
    setEvents(prevEvents => [...prevEvents, "busy"]);
  }

  let toRender = []
  for (let i = 0; i < tasks.length; i++)
  {
    const taskDate = new Date(tasks[i].date)
    if (taskDate.getFullYear() == date.getFullYear() && taskDate.getMonth()-1 == date.getMonth() && taskDate.getDate() == date.getDate())
      toRender.push(tasks[i]);
  }

  return (
      <div className= {`flex flex-col h-36 overflow-auto ${isCurrentMonth ? 'text-gray-700' : 'text-gray-400'}`} >
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
              className={`
                text-neutral-400 
                cursor-pointer 
                hover:opacity-50 
                transition
                ${isCurrentMonth ? 'text-gray-700' : 'text-gray-400'}
              `}
            />
          </div>
          <div className="flex flex-col gap-y-1 text-black">
            {toRender.map((task:any) => (
              <TaskComponent key={task._id} name={task.name} tag={"tag"} />
            ))}
          </div>
        </div>
      </div>
  );

};

export default DateObj;
