import "./mainBlock.css";
import Task from "../task/Task";

const MainBlock = ({ backlog, inProgress, done }) => {
  return (
    <main className="tasks-block">
      <div>
        <h2 className="task-title">Backlog</h2>
        {backlog.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
      <div>
        <h2 className="task-title">In progress</h2>
        {inProgress.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
      <div>
        <h2 className="task-title">Done</h2>
        {done.map((task) => (
          <Task task={task} key={task.id} />
        ))}
      </div>
    </main>
  );
};

export default MainBlock;
