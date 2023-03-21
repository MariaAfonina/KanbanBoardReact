import "./form.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Input from "../input/Input";
import Assigned from "../dropdowns/Assigned";
import Priority from "../dropdowns/Priority";

const Form = ({ isForm, taskToEdit, setTaskToEdit, backlog, setBacklog }) => {
  const [id, setId] = useState(taskToEdit ? taskToEdit.id : "");
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ""
  );
  const [assigned, setAssigned] = useState(
    taskToEdit ? taskToEdit.assigned : ""
  );
  const [priority, setPriority] = useState(
    taskToEdit ? taskToEdit.priority : ""
  );
  const [date, setDate] = useState(taskToEdit ? taskToEdit.date : "");

  function addTask(e) {
    e.preventDefault();
    isForm();
    const updatedStorage = [
      ...backlog,
      {
        id: uuidv4(),
        title: title,
        description: description,
        assigned: assigned,
        priority: priority,
        date: date,
      },
    ];
    localStorage.setItem("tasksBacklog", JSON.stringify(updatedStorage));
    setId("");
    setTitle("");
    setDescription("");
    setAssigned("");
    setPriority("");
    setDate("");
    setBacklog(JSON.parse(localStorage.getItem("tasksBacklog")) || []);
  }

  function updateTask(e) {
    e.preventDefault();
    const task = backlog[backlog.findIndex((task) => task.id === id)];

    task.id = id;
    task.title = title;
    task.description = description;
    task.assigned = assigned;
    task.priority = priority;
    task.date = date;

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
          value={title}
          setValue={setTitle}
        />

        <Input
          name="description"
          label="Task description"
          type="text"
          className="add-form-input"
          placeholder="Description"
          value={description}
          setValue={setDescription}
        />

        <Assigned value={assigned} setValue={setAssigned} />

        <Priority value={priority} setValue={setPriority} />

        <Input
          name="date"
          label="Due Date"
          type="date"
          className="add-form-date"
          value={date}
          setValue={setDate}
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
