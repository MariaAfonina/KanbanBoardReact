import "./form.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import CloseModal from "../buttons/CloseModal";
import Input from "../input/Input";
import Assigned from "../dropdowns/Assigned";
import Priority from "../dropdowns/Priority";

const Form = ({ isForm, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assigned, setAssigned] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  function addTask(e) {
    e.preventDefault();
    onSubmit();
    const storage = JSON.parse(localStorage.getItem("tasksBacklog")) || [];
    const updatedStorage = [
      ...storage,
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
    setTitle("");
    setDescription("");
    setAssigned("");
    setPriority("");
    setDate("");
  }

  function cancel(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    isForm && (
      <div className="add-form-wrapper">
        <form className="add-form">
          <h2 className="add-form-title">Add a New Task</h2>
          <CloseModal onSubmit={onSubmit} />

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

          <Assigned setValue={setAssigned} />

          <Priority setValue={setPriority} />

          <Input
            name="date"
            label="Due Date"
            type="date"
            className="add-form-date"
            value={date}
            setValue={setDate}
          />

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
