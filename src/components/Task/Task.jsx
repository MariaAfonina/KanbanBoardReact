import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../store/tasksSlice";
import {
  isFormOpened,
  isTagInputOpened,
  updateFormValue,
} from "../../store/formSlice";
import TagInput from "../Tag/TagInput";
import Tag from "../Tag/Tag";
import "./Task.css";

const Task = ({ task, setTaskId, setTaskStatus }) => {
  const tagInput = useSelector((state) => state.form.isTagInput);

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

  const handleTagInput = (e) => {
    e.preventDefault();
    dispatch(isTagInputOpened());
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
      <div className="btn-delete-wrapper">
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
        <button className="btn-add-tag" onClick={handleTagInput}>
          +Tag
        </button>

        <button className="btn-edit-task">
          <i className="fa-solid fa-pen" onClick={handleEditTask}></i>
        </button>
      </div>

      {tagInput && <TagInput taskId={task.id} taskStatus={task.status} />}
      {task.tags.map((tag, index) => (
        <Tag key={index} tag={tag} taskId={task.id} taskStatus={task.status} />
      ))}
    </div>
  );
};

export default Task;
