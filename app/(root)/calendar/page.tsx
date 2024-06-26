import { getTask2 } from "@/app/api/checkUser";
import CalendarComponent from "@/components/CalendarComponent"
import MonthTasks from "@/components/MonthTasks";
import TaskForm from "@/components/TaskForm";

const Calendar = async () => {
  const now = new Date();
  const tasks = await getTask2(0, 0);

  return (
    <div className="flex flex-row gap-4">
      <CalendarComponent tasks={tasks} />
      <div className="flex flex-col">
        <MonthTasks tasks={tasks} />
        <TaskForm />
      </div>
      
      
    </div>
  )
}

export default Calendar;