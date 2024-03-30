"use client"
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState, useTransition } from 'react';
import { getTask2, sendTask } from '@/app/api/checkUser';
import { useRouter } from 'next/navigation';

// fields
type FormFields = {
  name: string,
  month: number,
  day: number,
  year: number,
}

const TaskForm = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year1 = currentDate.getFullYear();
  const month1 = currentDate.getMonth();
  const date1 = currentDate.getDay();

  // register is fields, handleSubmit makes it to where page doesn't refresh
  const { register, handleSubmit } = useForm<FormFields>();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<FormFields> = (data:any) => {
    sendTask(String(data.name), Number(data.day), Number(data.month), Number(data.year))
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
    <div>
      <form  className="form flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {/* onChange={(e:any) => setName(e.target.value)} */}
        <input {...register("name")} className="input border-2 my-2" placeholder="task name" />
        <input {...register("day")} type="number" className="input border-2 my-2" placeholder="day" />
        <input {...register("month")} type="number" className="input border-2 my-2" placeholder="month" />
        <input {...register("year")} type="number" className="input border-2 my-2" placeholder="year" />
        
        <button type="submit" className="border-2">submit!</button>
      </form>
    </div>
  )
}

export default TaskForm