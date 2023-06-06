import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasksSlice";
import formReducer from "./formSlice";

export default configureStore({
  reducer: { tasks: taskReducer, form: formReducer },
});
