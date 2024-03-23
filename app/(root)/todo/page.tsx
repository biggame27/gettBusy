"use client"
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from 'react';
import mongoose from 'mongoose';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { createTask, getTasks } from '@/lib/actions/task.actions';
import { checkUser } from '@/app/api/checkUser';
import { takeCoverage } from 'v8';
import { handleError } from '@/lib/utils';

const ToDo = () => {
  const userId = checkUser();

  const [currentDate, setCurrentDate] = useState(new Date());
  const year1 = currentDate.getFullYear();
  const month1 = currentDate.getMonth();
  const date1 = currentDate.getDay();

  const [name, setName] = useState("poop");
  const [month, setMonth] = useState(month1);
  const [day, setDay] = useState(date1);
  const [year, setYear] = useState(year1);

  // const [tasks, setTasks] = useState<TaskType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'yourClerkId', 'yourMonth', and 'yourYear' with actual values
        const fetchedTasks = await getTasks(String(userId), month, year);
        //setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues:{
      name: '',
      date: 27,
      month: 3,
      year:2023
    }
  })

  const changeName = (e: any) => {
    setName(e.target.value);
  };
  const changeMonth = (e: any) => {
    setMonth(e.target.value);
  };
  const changeDay = (e: any) => {
    setDay(e.target.value);
  };
  const changeYear= (e: any) => {
    setYear(e.target.value);
  };

  const onSubmit: SubmitHandler<FieldValues> = async(values) => {
    try {

      console.log('please')

      const task = {
        // taskId: String(Date.now()),
        // clerkId: userId,
        // name: String(values.name?.[0]),
        // date: Number(values.date?.[0]),
        // month: Number(values.month?.[0]),
        // year: Number(values.year?.[0]),
        // recurring: false,
        taskId: String(Date.now()),
        clerkId: String(userId),
        name: name,
        date: day,
        month: month,
        year: year,
        recurring: false,
      }
      console.log(task)
      const newTask = await createTask(task);
    } catch (error) {
      console.log('bruh');
    } 
  }


  return (
    <>
    <div>
      <form  className="form flex flex-col" onSubmit={onSubmit}>
        <input  className="input border-2 my-2" placeholder="task name" id="name" {...register('name', {required: true})} onChange={(event) => {changeName(event);}} />
        <input type="number" className="input border-2 my-2" placeholder="day" id="date" {...register('date', {required: true})} onChange={(event) => {changeDay(event);}} />
        <input type="number" className="input border-2 my-2" placeholder="month" id="month" {...register('month', {required: true})} onChange={(event) => {changeMonth(event);}} />
        <input type="number" className="input border-2 my-2" placeholder="year" id="year" {...register('year', {required: true})} onChange={(event) => {changeYear(event);}} />
        
        <button type="submit" className="border-2">submit!</button>
      </form>

      {/* {tasks.length > 0 ? (
        {tasks}
        // <ul className="collection-list">
        //   {tasks.map((task) => (
        //     <div key={task}>
        //       {task.id}
        //     </div>
        //   ))}
        // </ul>
      ) : (
        <div className="collection-empty">
          <p className="p-20-semibold">Empty List</p>
        </div>
      )} */}

      
    </div>
    

    </>
    
    
  )
}

export default ToDo;