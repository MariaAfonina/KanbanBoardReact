import "./form.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Input from "../input/Input";
import Assignee from "../dropdowns/Assignee";
import Priority from "../dropdowns/Priority";

const defaultTask = {
  id: "",
  status: "backlog",
  title: "",
  description: "",
  assigned: "",
  priority: "",
  date: "",
};

const Form = ({
  toggleForm,
  taskToEdit,
  setTaskToEdit,
  backlogTasks,
  setBacklogTasks,
  inProgressTasks,
  setInProgressTasks,
  doneTasks,
  setDoneTasks,
}) => {
  const [task, setTask] = useState({
    id: taskToEdit ? taskToEdit.id : "",
    status: taskToEdit ? taskToEdit.status : "backlog",
    title: taskToEdit ? taskToEdit.title : "",
    description: taskToEdit ? taskToEdit.description : "",
    assigned: taskToEdit ? taskToEdit.assigned : "",
    priority: taskToEdit ? taskToEdit.priority : "",
    date: taskToEdit ? taskToEdit.date : "",
  });

  function updateTaskField(fieldName, value) {
    setTask({ ...task, [fieldName]: value });
  }

  function addTask(e) {
    e.preventDefault();
    toggleForm();
    const updatedStorage = [
      ...backlogTasks,
      {
        id: uuidv4(),
        status: task.status,
        title: task.title,
        description: task.description,
        assigned: task.assigned,
        priority: task.priority,
        date: task.date,
      },
    ];
    localStorage.setItem("tasksBacklog", JSON.stringify(updatedStorage));
    setTask(defaultTask);
    setBacklogTasks(JSON.parse(localStorage.getItem("tasksBacklog")) || []);
  }

  function updateTask(e) {
    e.preventDefault();

    if (task.status === "backlog") {
      const taskIndex = backlogTasks.findIndex(
        (innerTask) => innerTask.id === task.id
      );

      setBacklogTasks([
        ...backlogTasks.slice(0, taskIndex),
        task,
        ...backlogTasks.slice(taskIndex + 1, backlogTasks.length),
      ]);

      localStorage.setItem("tasksBacklog", JSON.stringify(backlogTasks));
    }

    if (task.status === "inProgress") {
      const taskIndex = inProgressTasks.findIndex(
        (innerTask) => innerTask.id === task.id
      );

      setInProgressTasks([
        ...inProgressTasks.slice(0, taskIndex),
        task,
        ...inProgressTasks.slice(taskIndex + 1, inProgressTasks.length),
      ]);

      localStorage.setItem("tasksInProgress", JSON.stringify(inProgressTasks));
    }

    if (task.status === "done") {
      const taskIndex = doneTasks.findIndex(
        (innerTask) => innerTask.id === task.id
      );

      setDoneTasks([
        ...doneTasks.slice(0, taskIndex),
        task,
        ...doneTasks.slice(taskIndex + 1, doneTasks.length),
      ]);

      localStorage.setItem("tasksDone", JSON.stringify(doneTasks));
    }
    toggleForm();
    setTaskToEdit();
  }

  function closeForm(e) {
    e.preventDefault();
    toggleForm();
    setTaskToEdit();
  }

  return (
    <div className="add-form-wrapper">
      <form className="add-form">
        {taskToEdit ? (
          <h2 className="add-form-title">Update task</h2>
        ) : (
          <h2 className="add-form-title">Add a New Task</h2>
        )}
        <button className="button-delete form-btn-close" onClick={closeForm}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <Input
          name="title"
          label="Task title"
          type="text"
          className="add-form-input"
          placeholder="Title"
          value={task.title}
          setValue={updateTaskField}
        />

        <Input
          name="description"
          label="Task description"
          type="text"
          className="add-form-input"
          placeholder="Description"
          value={task.description}
          setValue={updateTaskField}
        />

        <Assignee
          fieldName="assigned"
          value={task.assigned}
          setValue={updateTaskField}
        />

        <Priority
          fieldName="priority"
          value={task.priority}
          setValue={updateTaskField}
        />

        <Input
          name="date"
          label="Due Date"
          type="date"
          className="add-form-date"
          value={task.date}
          setValue={updateTaskField}
        />

        <div className="form-button-wrapper">
          <button className="all-btn cancel-button" onClick={closeForm}>
            Cancel
          </button>
          {taskToEdit ? (
            <button className="all-btn add-button" onClick={updateTask}>
              Update
            </button>
          ) : (
            <button className="all-btn add-button" onClick={addTask}>
              Add
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
