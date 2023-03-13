import "./task.css";
import ButtonDelete from "../buttons/ButtonDelete";

const Task = ({ task }) => {
  return (
    task && (
      <div id={task.id} className="task" draggable="true">
        <div className="btn-close-wrapper">
          <div className="task-name">{task.title}</div>
          <ButtonDelete taskId={task.id} />
        </div>

        <div className="task-description">{task.description}</div>
        <div className="task-wrapper">
          <div className="task-parameter">Assigned:</div>
          <div className="assigned-value">{task.assigned}</div>
        </div>

        <div className="task-wrapper">
          <div className="task-parameter">Priority:</div>
          <div className="priority-value">{task.priority}</div>
        </div>

        <div className="task-wrapper">
          <div className="task-parameter">Due Date:</div>
          <div className="date-value">{task.date}</div>
        </div>

        <div className="tag-edit-wrapper">
          <button className="btn-tag">+Tag</button>
          <button className="btn-edit">
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
      </div>
    )
  );
};

export default Task;
