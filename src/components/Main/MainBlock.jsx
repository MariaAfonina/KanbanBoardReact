import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { dragAndDrop } from "../../store/tasksSlice";
import Task from "../Task/Task";
import "./MainBlock.css";

const MainBlock = () => {
  const backlogTasks = useSelector((state) => state.tasks.backlog);
  const inProgressTasks = useSelector((state) => state.tasks.inProgress);
  const doneTasks = useSelector((state) => state.tasks.done);

  const [taskId, setTaskId] = useState();
  const [taskStatus, setTaskStatus] = useState();

  const dispatch = useDispatch();

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDropTask = (e) => {
    const nextGroupName = e.currentTarget.dataset.taskGroupStatus;
    dispatch(
      dragAndDrop({ id: taskId, status: taskStatus, newStatus: nextGroupName })
    );
    setTaskId("");
    setTaskStatus("");
  };

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
