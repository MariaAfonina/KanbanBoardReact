import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  },
  reducers: {
    addTask(state, action) {
      state.tasks.push({
        id: uuidv4(),
        status: "backlog",
        title: action.payload.task.title,
        description: action.payload.task.description,
        assigned: action.payload.task.assigned,
        priority: action.payload.task.priority,
        date: action.payload.task.date,
        tags: [],
      });
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.task.id
      );
      state.tasks = [
        ...state.tasks.slice(0, taskIndex),
        action.payload.task,
        ...state.tasks.slice(taskIndex + 1, state.tasks.length),
      ];
    },
    dragAndDrop(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[taskIndex].status = action.payload.newStatus;
    },
    addTag(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[taskIndex].tags.push(action.payload.tag);
    },
    deleteTag(state, action) {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[taskIndex].tags = state.tasks[taskIndex].tags.filter(
        (tag) => tag !== action.payload.tag
      );
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  dragAndDrop,
  addTag,
  deleteTag,
} = tasksSlice.actions;

export default tasksSlice.reducer;
