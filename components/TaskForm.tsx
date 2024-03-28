"use client"
import { z } from 'zod';
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useEffect, useState, useTransition } from 'react';
import { getTask2, sendTask } from '@/app/api/checkUser';
import { useRouter } from 'next/navigation';

const TaskForm = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year1 = currentDate.getFullYear();
  const month1 = currentDate.getMonth();
  const date1 = currentDate.getDay();

  const [name, setName] = useState("poop");
  const [month, setMonth] = useState(month1);
  const [day, setDay] = useState(date1);
  const [year, setYear] = useState(year1);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit= (e:any) => {
    e.preventDefault();
    sendTask(String(name), Number(day), Number(month), Number(year))
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
    <>
    {}
    <div>
      <form  className="form flex flex-col" onSubmit={onSubmit}>
        <input  className="input border-2 my-2" placeholder="task name" id="name" onChange={(e:any) => setName(e.target.value)} />
        <input type="number" className="input border-2 my-2" placeholder="day" id="date" onChange={(e:any) => setDay(e.target.value)} />
        <input type="number" className="input border-2 my-2" placeholder="month" id="month" onChange={(e:any) => setMonth(e.target.value)} />
        <input type="number" className="input border-2 my-2" placeholder="year" id="year" onChange={(e:any) => setYear(e.target.value)} />
        
        <button type="submit" className="border-2">submit!</button>
      </form>

      {/* <MonthTasks month={month} year={year} /> */}
    </div>
    

    </>
    
    
  )
}

export default TaskForm