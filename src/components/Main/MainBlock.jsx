import "./MainBlock.css";
import Task from "../Task/Task";
import { useState } from "react";
import useDragAndDrop from "./UseDragAndDrop";

const MainBlock = ({
  backlogTasks,
  inProgressTasks,
  doneTasks,
  mapStatusToTasksList,
  mapStatusToTasksSetter,
}) => {
  const [taskId, setTaskId] = useState();
  const [taskStatus, setTaskStatus] = useState();

  const { onDragOver, onDropTask } = useDragAndDrop(
    taskId,
    taskStatus,
    mapStatusToTasksList,
    mapStatusToTasksSetter
  );

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
