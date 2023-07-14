import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { getTasks } from "../../store/tasksSelectors";
import { dragAndDrop } from "../../store/tasksSlice";
import Task from "../Task/Task";
import "./MainBlock.css";

const MainBlock = () => {
  const tasks = useSelector(getTasks);
  const backlogTasks = tasks.filter((task) => task.status === "backlog");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  const [taskId, setTaskId] = useState();

  const dispatch = useDispatch();

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDropTask = (e) => {
    const nextGroupName = e.currentTarget.dataset.taskGroupStatus;
    dispatch(dragAndDrop({ id: taskId, newStatus: nextGroupName }));
    setTaskId("");
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
          <Task task={task} key={task.id} setTaskId={setTaskId} />
        ))}
      </div>
      <div
        data-task-group-status="inProgress"
        onDragOver={onDragOver}
        onDrop={onDropTask}
      >
        <h2 className="task-title">In progress</h2>
        {inProgressTasks.map((task) => (
          <Task task={task} key={task.id} setTaskId={setTaskId} />
        ))}
      </div>
      <div
        data-task-group-status="done"
        onDragOver={onDragOver}
        onDrop={onDropTask}
      >
        <h2 className="task-title">Done</h2>
        {doneTasks.map((task) => (
          <Task task={task} key={task.id} setTaskId={setTaskId} />
        ))}
      </div>
    </main>
  );
};

export default MainBlock;
