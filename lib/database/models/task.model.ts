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
    type: Date,
  },
  recurring: {
    type: Boolean,
  },
})

const Task = models?.Task || model("Task", TaskSchema);

export default Task;