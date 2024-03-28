import MonthTasks from '@/components/MonthTasks';
import TaskForm from '@/components/TaskForm';

const ToDo = () => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  return (
    <div className="flex flex-col">
      <MonthTasks month={month} year={year} />
      <TaskForm />
      
    </div>
  )
  
}

export default ToDo;