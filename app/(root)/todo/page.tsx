import { getTask2 } from '@/app/api/checkUser';
import MonthTasks from '@/components/MonthTasks';
import TaskForm from '@/components/TaskForm';

const ToDo = async () => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const tasks = await getTask2(0,0);
  return (
    <div className="flex flex-col">
      <MonthTasks month={month} year={year} tasks={tasks} />
      <TaskForm />
      
    </div>
  )
  
}

export default ToDo;