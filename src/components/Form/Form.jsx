import { useState, useMemo, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Input from "../Input/Input";
import Assignee from "../Dropdowns/Assignee";
import Priority from "../Dropdowns/Priority";
import { TaskContext } from "../../AppContainer";
import "./Form.css";

const Form = () => {
  const params = useParams();
  const navigate = useNavigate();
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

  const {
    taskToEdit,
    backlogTasks,
    setBacklogTasks,
    mapStatusToTasksList,
    mapStatusToTasksSetter,
    setTaskToEdit,
  } = useContext(TaskContext);

  const [task, setTask] = useState(taskToEdit || defaultTask);

  function updateTaskField(fieldName, value) {
    setTask({ ...task, [fieldName]: value });
  }

  function addTask(e) {
    e.preventDefault();
    const updatedStorage = [
      ...backlogTasks,
      {
        id: uuidv4(),
        status: "backlog",
        title: task.title,
        description: task.description,
        assigned: task.assigned,
        priority: task.priority,
        date: task.date,
      },
    ];

    navigate(-1);
    setTask(defaultTask);
    setBacklogTasks(updatedStorage);
    alert("You added new task! Good job!");
  }

  function updateTask(e) {
    e.preventDefault();

    const tasksFromStatus = mapStatusToTasksList[task.status];
    const setterFromStatus = mapStatusToTasksSetter[task.status];

    const taskIndex = tasksFromStatus.findIndex(
      (innerTask) => innerTask.id === task.id
    );

    setterFromStatus([
      ...tasksFromStatus.slice(0, taskIndex),
      task,
      ...tasksFromStatus.slice(taskIndex + 1, tasksFromStatus.length),
    ]);

    navigate(-1);
    setTaskToEdit();
  }

  function closeForm(e) {
    e.preventDefault();
    navigate(-1);
    setTaskToEdit();
  }

  return (
    <div className="add-form-wrapper">
      <form className="add-form">
        {taskToEdit ? (
          <h2 className="add-form-title">Update {params.title} task</h2>
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
