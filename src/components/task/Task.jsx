import "./task.css";
import DeleteTask from "../buttons/DeleteTask";

const Task = ({ task }) => {
  function editTask(e) {
    e.preventDefault();
  }

  let priorityStyle;

  if (task.priority === "High") {
    priorityStyle = "priority-value priority-value-high";
  }
  if (task.priority === "Medium") {
    priorityStyle = "priority-value priority-value-medium";
  }
  if (task.priority === "Low") {
    priorityStyle = "priority-value priority-value-low";
  }

  return (
    task && (
      <div id={task.id} className="task" draggable="true">
        <div className="btn-close-wrapper">
          <div className="task-name">{task.title}</div>
          <DeleteTask taskId={task.id} />
        </div>

        <div className="task-description">{task.description}</div>
        <div className="task-wrapper">
          <div className="task-parameter">Assigned:</div>
          <div className="assigned-value">{task.assigned}</div>
        </div>

        <div className="task-wrapper">
          <div className="task-parameter">Priority:</div>
          <div className={priorityStyle}>{task.priority}</div>
        </div>

        <div className="task-wrapper">
          <div className="task-parameter">Due Date:</div>
          <div className="date-value">{task.date}</div>
        </div>

        <div className="tag-edit-wrapper">
          <button className="btn-tag">+Tag</button>
          <button className="btn-edit" onClick={editTask}>
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
      </div>
    )
  );
};

export default Task;
