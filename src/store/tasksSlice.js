import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    backlog: JSON.parse(localStorage.getItem("backlog")) || [],
    inProgress: JSON.parse(localStorage.getItem("inProgress")) || [],
    done: JSON.parse(localStorage.getItem("done")) || [],
  },
  reducers: {
    addTask(state, action) {
      state.backlog.push({
        id: uuidv4(),
        status: "backlog",
        title: action.payload.task.title,
        description: action.payload.task.description,
        assigned: action.payload.task.assigned,
        priority: action.payload.task.priority,
        date: action.payload.task.date,
      });
    },
    deleteTask(state, action) {
      const taskStatus = action.payload.status;
      state[taskStatus] = state[taskStatus].filter(
        (task) => task.id !== action.payload.id
      );
    },
    updateTask(state, action) {
      const taskStatus = action.payload.task.status;
      const taskIndex = state[taskStatus].findIndex(
        (task) => task.id === action.payload.task.id
      );
      state[taskStatus] = [
        ...state[taskStatus].slice(0, taskIndex),
        action.payload.task,
        ...state[taskStatus].slice(taskIndex + 1, state[taskStatus].length),
      ];
    },
    dragAndDrop(state, action) {
      const previousStatus = action.payload.status;
      const nextStatus = action.payload.newStatus;
      if (previousStatus !== nextStatus) {
        const taskIndex = state[previousStatus].findIndex(
          (task) => task.id === action.payload.id
        );
        const previousState = state[previousStatus];
        previousState[taskIndex].status = nextStatus;
        state[nextStatus].push(previousState[taskIndex]);
        state[previousStatus] = state[previousStatus].filter(
          (task) => task.id !== action.payload.id
        );
      }
    },
  },
});

export const { addTask, deleteTask, updateTask, dragAndDrop } =
  tasksSlice.actions;

export default tasksSlice.reducer;
