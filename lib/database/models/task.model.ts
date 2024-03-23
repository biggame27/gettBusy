import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  taskId: {
    type: String,
    required: true,
    unique: true,
  },
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  }, 
  date: {
    type: Number,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  recurring: {
    type: Boolean,
  },
})

const Task = models?.Task || model("Task", TaskSchema);

export default Task;