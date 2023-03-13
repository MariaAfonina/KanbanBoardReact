import "./form.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Form = ({ isForm, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function addTask(e) {
    e.preventDefault();
    onSubmit();
    const storage = JSON.parse(localStorage.getItem("tasksBacklog")) || [];
    const updatedStorage = [
      ...storage,
      { id: uuidv4(), title: title, description: description },
    ];
    localStorage.setItem("tasksBacklog", JSON.stringify(updatedStorage));
  }

  function cancel(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    isForm && (
      <div id="form" className="add-form-wrapper">
        <form className="add-form">
          <h2 className="add-form-title">Add a New Task</h2>
          <button id="close-modal" className="button-close form-btn-close">
            <i className="fa-solid fa-xmark"></i>
          </button>

          <label className="add-form-parameter" htmlFor="title">
            Task title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <label className="add-form-parameter" htmlFor="description">
            Task description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <label className="add-form-parameter">Assignee</label>
          <div
            data-field-name="assigned"
            id="assigned-wrapper"
            className="dropdown-wrapper"
          >
            <button className="btn-icon-arrow">
              <i className="icon-arrow fa-solid fa-caret-down"></i>
            </button>
            <ul className="dropdown-value">
              <li data-name="Jane Doe" className="name-value">
                Jane Doe
              </li>
              <li data-name="John Doe" className="name-value">
                John Doe
              </li>
            </ul>
          </div>

          <label className="add-form-parameter">Priority</label>
          <div
            data-field-name="priority"
            id="priority-wrapper"
            className="dropdown-wrapper"
          >
            <button className="btn-icon-arrow">
              <i className="fa-solid fa-caret-down"></i>
            </button>
            <ul className="dropdown-value">
              <li data-name="High" className="high priority">
                High
              </li>
              <li data-name="Medium" className="medium priority">
                Medium
              </li>
              <li data-name="Low" className="low priority">
                Low
              </li>
            </ul>
          </div>

          <label className="add-form-parameter" htmlFor="date">
            Due Date
          </label>
          <input type="date" id="date" className="add-form-date" />

          <div className="form-button-wrapper">
            <button className="all-btn cancel-button" onClick={cancel}>
              Cancel
            </button>
            <button className="all-btn add-button" onClick={addTask}>
              Add
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default Form;
