import CalendarComponent from "@/components/CalendarComponent"
import MonthTasks from "@/components/MonthTasks";
import TaskForm from "@/components/TaskForm";

const Calendar = () => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  return (
    <div className="flex flex-row gap-4">
      <CalendarComponent />
      <div className="flex flex-col">
        <MonthTasks month={month} year={year} />
        <TaskForm />
      </div>
      
      
    </div>
  )
}

export default Calendar;