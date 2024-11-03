import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormTag from "../FormTag/FormTag";
import { TaskContext } from "../../AppContainer";
import "./Task.css";

const Task = ({ task, setTaskId, setTaskStatus }) => {
  const navigate = useNavigate();
  const [isFormTagOpened, setIsFormTagOpened] = useState(false);
  const [taskTags, setTaskTags] = useState(task.tags || []);
  const [isEditTag, setIsEditTag] = useState(false);
  const [currentTag, setCurrentTag] = useState();
  const useTaskContext = useContext(TaskContext);

  function toggleFormTag() {
    setIsFormTagOpened(!isFormTagOpened);
    setCurrentTag();
    setIsEditTag(false);
  }

  function handleTaskTag(tagValue) {
    const tasksFromStatus = useTaskContext.mapStatusToTasksList[task.status];
    const tasksSetter = useTaskContext.mapStatusToTasksSetter[task.status];

    const taskIndex = tasksFromStatus.findIndex((t) => t.id === task.id);
    const taskForTags = tasksFromStatus[taskIndex];
    taskForTags.tags = [...taskTags, tagValue];

    tasksSetter([
      ...tasksFromStatus.slice(0, taskIndex),
      taskForTags,
      ...tasksFromStatus.slice(taskIndex + 1, tasksFromStatus.length),
    ]);
  }

  function addTag(tagValue) {
    const tags = [...taskTags, tagValue];
    setTaskTags(tags);
    toggleFormTag();
    handleTaskTag(tagValue);
  }

  function deleteTag(tagIndex) {
    const tasksFromStatus = useTaskContext.mapStatusToTasksList[task.status];
    const tasksSetter = useTaskContext.mapStatusToTasksSetter[task.status];

    const taskIndex = tasksFromStatus.findIndex((t) => t.id === task.id);
    const tagsFromTaskIndex = tasksFromStatus[taskIndex].tags;
    const tagFromIndex = tagsFromTaskIndex[tagIndex];
    const tagsArray = tagsFromTaskIndex.filter((tag) => tag !== tagFromIndex);
    tasksFromStatus[taskIndex].tags = tagsArray;

    setTaskTags(tagsArray);

    tasksSetter([
      ...tasksFromStatus.slice(0, taskIndex),
      tasksFromStatus[taskIndex],
      ...tasksFromStatus.slice(taskIndex + 1, tasksFromStatus.length),
    ]);
  }

  function handleFormToEditTag(tag) {
    setCurrentTag(tag);
    setIsFormTagOpened(!isFormTagOpened);
  }

  function updateTag(editedTag) {
    const tasksFromStatus = useTaskContext.mapStatusToTasksList[task.status];
    const tasksSetter = useTaskContext.mapStatusToTasksSetter[task.status];
    const taskIndex = tasksFromStatus.findIndex((t) => t.id === task.id);
    const tagIndex = taskTags.findIndex((t) => t === currentTag);
    taskTags[tagIndex] = editedTag;
    setTaskTags(taskTags);
    setCurrentTag();

    tasksFromStatus[taskIndex].tags = taskTags;

    tasksSetter([
      ...tasksFromStatus.slice(0, taskIndex),
      tasksFromStatus[taskIndex],
      ...tasksFromStatus.slice(taskIndex + 1, tasksFromStatus.length),
    ]);

    setIsFormTagOpened(!isFormTagOpened);
  }

  function editTask(e) {
    e.preventDefault();
    navigate(`/task/edit/${task.title}`);
    useTaskContext.handleEditTask(task.id, task.status);
  }

  return (
    task && (
      <div
        onDragStart={() => {
          setTaskId(task.id);
          setTaskStatus(task.status);
        }}
        id={task.id}
        className="task"
        draggable={true}
      >
        <div className="btn-close-wrapper">
          <div className="task-name">{task.title}</div>
          <button
            className="button-delete"
            onClick={() => {
              useTaskContext.onTaskDelete(task.id, task.status, task.title);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
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
          <button className="btn-add-tag" onClick={toggleFormTag}>
            +Tag
          </button>

          <button className="btn-edit" onClick={editTask}>
            <i className="fa-solid fa-pen"></i>
          </button>
        </div>
        <div className="tags-wrapper">
          {task.tags &&
            task.tags.map((tag) => (
              <div
                key={taskTags.indexOf(tag)}
                className="tag"
                onClick={() => setIsEditTag(!isEditTag)}
              >
                # {tag}
                {isEditTag && (
                  <div className="btn-tag-wrapper">
                    <button
                      className="btn-delete-tag"
                      onClick={() => deleteTag(taskTags.indexOf(tag))}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                    <button
                      className="btn-edit-tag btn-edit"
                      onClick={() => handleFormToEditTag(tag)}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>
        {isFormTagOpened && (
          <FormTag
            currentTag={currentTag}
            updateTag={updateTag}
            addTag={addTag}
            toggleFormTag={toggleFormTag}
          />
        )}
      </div>
    )
  );
};

export default Task;
