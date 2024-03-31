"use server"
import { createTask, deleteTask, getTasks } from "@/lib/actions/task.actions";
import { handleError } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export async function checkUser() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in')
  return userId;
}

export async function sendTask(name: string, date: Date) {
  try {

    // console.log(String(userId));

    const task = await {
      // taskId: String(Date.now()),
      // clerkId: userId,
      // name: String(values.name?.[0]),
      // date: Number(values.date?.[0]),
      // month: Number(values.month?.[0]),
      // year: Number(values.year?.[0]),
      // recurring: false,
      taskId: String(Date.now()),
      clerkId: await checkUser(),
      name: name,
      // actual date object
      date: date,
      recurring: false,
    }
    console.log(task)
    const newTask = await createTask(task);
  } catch (error) {
    console.log('bruh');
  } 
}

export async function getTask2 (month: Number, year: Number) {
  try{
    const id = await checkUser();
    const tasks = await getTasks(id, month, year);
    return tasks
  } catch (error) {
    console.log('bruh1')
  }
}

export async function deleteTask2 (taskId: string) {
  try {
    await deleteTask(taskId);
  } catch(error) {
    handleError(error);
  }
}