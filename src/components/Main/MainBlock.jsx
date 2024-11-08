import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Task from "../Task/Task";
import UseDragAndDrop from "./UseDragAndDrop";
import "./MainBlock.css";

const MainBlock = () => {
  const [backlogTasks, inProgressTasks, doneTasks] = useOutletContext();
  const [taskId, setTaskId] = useState();
  const [taskStatus, setTaskStatus] = useState();

  const { onDragOver, onDropTask } = UseDragAndDrop(taskId, taskStatus);

  return (
    <main className="main-container">
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
