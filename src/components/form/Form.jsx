import "./form.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Input from "../input/Input";
import Assigned from "../dropdowns/Assigned";
import Priority from "../dropdowns/Priority";

const defaultTask = {
  id: "",
  status: "tasksBacklog",
  title: "",
  description: "",
  assigned: "",
  priority: "",
  date: "",
};

const Form = ({ isForm, taskToEdit, setTaskToEdit, backlog, setBacklog }) => {
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
    isForm();
    const updatedStorage = [
      ...backlog,
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
    setBacklog(JSON.parse(localStorage.getItem("tasksBacklog")) || []);
  }

  function updateTask(e) {
    e.preventDefault();

    const taskIndex = backlog.findIndex(
      (innerTask) => innerTask.id === task.id
    );

    setBacklog([
      ...backlog.slice(0, taskIndex),
      task,
      ...backlog.slice(taskIndex + 1, backlog.length),
    ]);

    localStorage.setItem("tasksBacklog", JSON.stringify(backlog));
    isForm();
    setTaskToEdit();
  }

  function closeForm(e) {
    e.preventDefault();
    isForm();
  }

  return (
    <div className="add-form-wrapper">
      <form className="add-form">
        <h2 className="add-form-title">Add a New Task</h2>
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

        <Assigned value={task.assigned} setValue={updateTaskField} />

        <Priority value={task.priority} setValue={updateTaskField} />

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
