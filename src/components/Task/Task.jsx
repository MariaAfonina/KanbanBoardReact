import { useDispatch } from "react-redux";
import FormTag from "../FormTag/FormTag";
import { deleteTask } from "../../store/tasksSlice";
import { isFormOpened, updateFormValue } from "../../store/formSlice";
import "./Task.css";

const Task = ({ task, setTaskId, setTaskStatus }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = (e) => {
    e.preventDefault();
    dispatch(deleteTask({ id: task.id, status: task.status }));
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    dispatch(isFormOpened());
    dispatch(updateFormValue({ task }));
  };

  const onDragStart = () => {
    setTaskId(task.id);
    setTaskStatus(task.status);
  };

  return (
    <div
      onDragStart={onDragStart}
      id={task.id}
      className="task"
      draggable={true}
    >
      <div className="btn-close-wrapper">
        <div className="task-name">{task.title}</div>
        <button className="button-delete">
          <i className="fa-solid fa-xmark" onClick={handleDeleteTask}></i>
        </button>
      </div>

      <div className="task-description">{task.description}</div>
      <div className="task-wrapper">
        <div className="task-parameter">Assigned:</div>
        <div className="assigned-value">{task.assigned}</div>
      </div>

      <div className="task-wrapper">
        <div className="task-parameter">Priority:</div>
        <div
          className={`priority-value priority-value-${task.priority.toLowerCase()}`}
        >
          {task.priority}
        </div>
      </div>

      <div className="task-wrapper">
        <div className="task-parameter">Due Date:</div>
        <div className="date-value">{task.date}</div>
      </div>

      <div className="tag-edit-wrapper">
        <button className="btn-add-tag">+Tag</button>

        <button className="btn-edit">
          <i className="fa-solid fa-pen" onClick={handleEditTask}></i>
        </button>
      </div>
      <div className="tags-wrapper"></div>

      <FormTag />
    </div>
  );
};

export default Task;
