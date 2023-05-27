//create schema of task tracker
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      default: () => `HCTSK${Math.floor(10000 + Math.random() * 90000)}`,
      unique: true,
    },
    empId: { type: String, required: true },
    emp_name: { type: String, required: true },
    
    task_status: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
      required: true,
    },
    task_type: {
      type: String,
      enum: ["Bug", "Feature", "Improvement"],
      required: false,
    },
    task_priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
      required: true,
    },
   task:[{
    task_name: { type: String, required: true },
    task_description: { type: String, required: false },
    task_end_date: { type: Date, required: false },
    task_assigned_to: { type: String, required: false },
    task_assigned_by: { type: String, required: false },
    task_assigned_on: {
      type: String,
      default: () => `${new Date().toLocaleString()}`,
    },
   }]
  },

  { timeseries: true }
);
module.exports = mongoose.model("task", taskSchema);
