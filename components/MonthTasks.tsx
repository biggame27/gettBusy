"use server"

import { getTask2 } from "@/app/api/checkUser"


const MonthTasks = async ({month, year} : {month: Number, year: Number}) => {
  const tasks = await getTask2(month, year);
  return (
    <div>
      {tasks.map((task : any) => (
        <div key={task._id} className="flex flex-row">
          <p className="w-36 overflow-hidden border-r border-t">
          {task.name}
          </p>
          <p className="w-12 overflow-hidden border-r border-t">
          {task.month+1}
          </p>
          <p className="w-12 overflow-hidden border-r border-t">
          {task.date}
          </p>
          <p className="w-12 overflow-hidden border-t">
          {task.year}
          </p>
        
        </div>
      ))}
    </div>
  )
}

export default MonthTasks