"use client"

import { getTask2 } from "@/app/api/checkUser"
import { Button } from "./ui/button";
import { TiDelete } from "react-icons/ti";
import { TiDeleteOutline } from "react-icons/ti";
import { deleteTask } from "@/lib/actions/task.actions";
import { useRouter } from "next/navigation";

const taskRender = (task: any) => {
  const date = new Date(task.date);
  return (
    <div className="flex flex-row justify-center items-center">
      <p className="w-36 overflow-hidden border-r border-t">
      {task.name}
      </p>
      <p className="w-12 overflow-hidden border-r border-t">
      {date.getDate()}
      </p>
      <p className="w-12 overflow-hidden border-r border-t">
      {date.getMonth()+1}
      </p>
      <p className="w-12 overflow-hidden border-t">
      {date.getFullYear()}
      </p>
    </div>
  )
    
}


const MonthTasks = ({tasks} : {tasks:any}) => {

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
          {taskRender(task)}
          <Button type="submit"  variant="outline" size="icon" className="bg-red-500 hover:bg-red-600 h-5/6">
            <TiDeleteOutline size={28} />
          </Button>
        </form>
      ))}
    </div>
  )
}

export default MonthTasks