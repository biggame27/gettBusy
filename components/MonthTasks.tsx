"use client"

import { getTask2 } from "@/app/api/checkUser"
import { Button } from "./ui/button";
import { TiDelete } from "react-icons/ti";
import { TiDeleteOutline } from "react-icons/ti";
import { deleteTask } from "@/lib/actions/task.actions";
import { useRouter } from "next/navigation";


const MonthTasks = ({month, year, tasks} : {month: Number, year: Number, tasks:[]}) => {

  const router = useRouter();

  const handleSubmit = async (e: any, taskId: string) => {
    e.preventDefault();
    await deleteTask(taskId);
    router.refresh();

  }

  return (
    <div>
      
      {tasks &&  tasks.map((task : any) => (
        // onSubmit={(event) => handleSubmit(event, task._id)}
        <form key={task._id} className="flex flex-row justify-center items-center" onSubmit={(event) => handleSubmit(event, task._id)} >
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
          <Button type="submit"  variant="outline" size="icon" className="bg-red-500 hover:bg-red-600 h-5/6">
            <TiDeleteOutline size={28} />
          </Button>
        </form>
      ))}
    </div>
  )
}

export default MonthTasks