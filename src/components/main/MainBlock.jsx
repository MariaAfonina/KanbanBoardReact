import "./mainBlock.css";
import Task from "../task/Task";
import { useCallback, useState } from "react";

const MainBlock = ({
  backlogTasks,
  inProgressTasks,
  doneTasks,
  mapStatusToTasksList,
  mapStatusToTasksSetter,
}) => {
  const [taskId, setTaskId] = useState();
  const [taskStatus, setTaskStatus] = useState();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  function onDropTask(event) {
    const nextGroupName = event.currentTarget.dataset.taskGroupStatus;

    if (taskStatus !== nextGroupName) {
      const tasksFromStatus = mapStatusToTasksList[taskStatus];
      const setterFromStatus = mapStatusToTasksSetter[taskStatus];

      const tasksFromNextGroupName = mapStatusToTasksList[nextGroupName];
      const setterFromNextGroupName = mapStatusToTasksSetter[nextGroupName];

      const tasksGroup =
        tasksFromStatus[
          tasksFromStatus.findIndex((task) => task.id === taskId)
        ];

      tasksGroup.status = nextGroupName;

      setterFromNextGroupName([...tasksFromNextGroupName, tasksGroup]);

      setterFromStatus(tasksFromStatus.filter((task) => task.id !== taskId));
    }
  }
  return (
    <main className="tasks-block">
      <div
        data-task-group-status="backlog"
        onDragOver={onDragOver}
        onDrop={onDropTask}
      >
        <h2 className="task-title">Backlog</h2>
        {backlogTasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            setTaskId={setTaskId}
            setTaskStatus={setTaskStatus}
            mapStatusToTasksList={mapStatusToTasksList}
            mapStatusToTasksSetter={mapStatusToTasksSetter}
          />
        ))}
      </div>
      <div
        data-task-group-status="inProgress"
        onDragOver={onDragOver}
        onDrop={onDropTask}
      >
        <h2 className="task-title">In progress</h2>
        {inProgressTasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            setTaskId={setTaskId}
            setTaskStatus={setTaskStatus}
            mapStatusToTasksList={mapStatusToTasksList}
            mapStatusToTasksSetter={mapStatusToTasksSetter}
          />
        ))}
      </div>
      <div
        data-task-group-status="done"
        onDragOver={onDragOver}
        onDrop={onDropTask}
      >
        <h2 className="task-title">Done</h2>
        {doneTasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            setTaskId={setTaskId}
            setTaskStatus={setTaskStatus}
            mapStatusToTasksList={mapStatusToTasksList}
            mapStatusToTasksSetter={mapStatusToTasksSetter}
          />
        ))}
      </div>
    </main>
  );
};

export default MainBlock;
