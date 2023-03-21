import "./mainBlock.css";
import Task from "../task/Task";

const MainBlock = ({
  backlog,
  inProgress,
  done,
  isForm,
  editTask,
  onTaskDelete,
}) => {
  return (
    <main className="tasks-block">
      <div>
        <h2 className="task-title">Backlog</h2>
        {backlog.map((task) => (
          <Task
            task={task}
            key={task.id}
            isForm={isForm}
            editTask={editTask}
            onTaskDelete={onTaskDelete}
            backlog={backlog}
            inProgress={inProgress}
            done={done}
          />
        ))}
      </div>
      <div>
        <h2 className="task-title">In progress</h2>
        {inProgress.map((task) => (
          <Task
            task={task}
            key={task.id}
            isForm={isForm}
            editTask={editTask}
            backlog={backlog}
            inProgress={inProgress}
            done={done}
          />
        ))}
      </div>
      <div>
        <h2 className="task-title">Done</h2>
        {done.map((task) => (
          <Task
            task={task}
            key={task.id}
            isForm={isForm}
            editTask={editTask}
            backlog={backlog}
            inProgress={inProgress}
            done={done}
          />
        ))}
      </div>
    </main>
  );
};

export default MainBlock;
