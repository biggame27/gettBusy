"use server";

import { revalidatePath } from "next/cache";

import Task from "../database/models/task.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import User from "../database/models/user.model";
import { getUserById } from "./user.actions";

// CREATE
export async function createTask(task: CreateTaskParams) {
  try {
    await connectToDatabase();

    const newTask = await Task.create(task);

    return JSON.parse(JSON.stringify(newTask));
  } catch (error) {
    handleError(error);
  }
}

export async function getTasks(clerkId: string, month: Number, year: Number) {
  try {
    await connectToDatabase();
    const id = await getUserById(clerkId);
    const author = await User.findById(id);

    if (!author) {
      throw new Error("user not found");
    }
    let monthTasks;
    if (month == 0 && year == 0){
      monthTasks = await Task.find({ "clerkId": clerkId }).sort({year: 1, month: 1, day: 1});
    }else {
      monthTasks = await Task.find({ "clerkId": clerkId, "month": month, "year": year }).sort({year: 1, month: 1, day: 1});
    }
    return JSON.parse(JSON.stringify(monthTasks));
  } catch(error) {
    handleError(error);
  }
}


// UPDATE
export async function updateTask(clerkId: string, task: UpdateTaskParams) {
  try {
    await connectToDatabase();

    const updatedTask = await Task.findOneAndUpdate({ clerkId }, task, {
      new: true,
    });

    if (!updatedTask) throw new Error("User update failed");
    
    return JSON.parse(JSON.stringify(updatedTask));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deleteTask(taskId: string) {
  try {
    await connectToDatabase();

    // Find task to delete
    // const taskToDelete = await Task.findOne({ taskId });

    // if (!taskToDelete) {
    //   throw new Error("User not found");
    // }

    // Delete task
    const deletedTask = await Task.findByIdAndDelete(taskId);
    revalidatePath("/");

    return deletedTask ? JSON.parse(JSON.stringify(deletedTask)) : null;
  } catch (error) {
    handleError(error);
  }
}