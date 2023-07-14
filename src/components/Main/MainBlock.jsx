import { useState } from "react";
import Task from "../Task/Task";
import useDragAndDrop from "./useDragAndDrop";
import "./MainBlock.css";

const MainBlock = ({ backlogTasks, inProgressTasks, doneTasks }) => {
  const [taskId, setTaskId] = useState();
  const [taskStatus, setTaskStatus] = useState();

  const { onDragOver, onDropTask } = useDragAndDrop(taskId, taskStatus);

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
          />
        ))}
      </div>
    </main>
  );
};

export default MainBlock;
