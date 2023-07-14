import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFormValue } from "../../store/formSelectors";
import { addTask, updateTask } from "../../store/tasksSlice";
import { isFormOpened, updateFormValue } from "../../store/formSlice";
import Input from "../Input/Input";
import Assignee from "../Dropdowns/Assignee";
import Priority from "../Dropdowns/Priority";
import "./Form.css";

const Form = () => {
  const defaultTask = useMemo(
    () => ({
      id: "",
      status: "backlog",
      title: "",
      description: "",
      assigned: "",
      priority: "",
      date: "",
    }),
    []
  );

  const formValue = useSelector(getFormValue);

  const [task, setTask] = useState(formValue || defaultTask);

  const dispatch = useDispatch();

  const updateTaskField = (fieldName, value) => {
    setTask({ ...task, [fieldName]: value });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(addTask({ task }));
    setTask(defaultTask);
    closeForm(e);
  };

  const closeForm = (e) => {
    e.preventDefault();
    dispatch(isFormOpened());
    dispatch(updateFormValue(false));
  };

  const handleUpdateTask = (e) => {
    e.preventDefault();
    dispatch(isFormOpened());
    dispatch(updateFormValue(false));
    dispatch(updateTask({ task }));
  };

  return (
    <div className="add-form-wrapper">
      <form className="add-form">
        {formValue ? (
          <h2 className="add-form-title">Update Task</h2>
        ) : (
          <h2 className="add-form-title">Add a New Task</h2>
        )}

        <button className="button-delete form-btn-close">
          <i className="fa-solid fa-xmark" onClick={closeForm}></i>
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

          {formValue ? (
            <button className="all-btn add-button" onClick={handleUpdateTask}>
              Update
            </button>
          ) : (
            <button className="all-btn add-button" onClick={handleAddTask}>
              Add
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
