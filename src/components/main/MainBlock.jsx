import "./mainBlock.css";
import Task from "../task/Task";

const MainBlock = ({
  backlog,
  setBacklog,
  inProgress,
  setInProgress,
  done,
  setDone,
  isForm,
  editTask,
  onTaskDelete,
}) => {
  return (
    <main className="tasks-block">
      <div
        data-task-group-status="backlog"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          const itemId = event.dataTransfer.getData("id");
          const previousGroupName = event.dataTransfer.getData(
            "data-task-group-status"
          );
          const nextGroupName = event.target.dataset.taskGroupStatus;

          if (previousGroupName === "inProgress") {
            const inProgressGroup =
              inProgress[inProgress.findIndex((task) => task.id === itemId)];
            inProgressGroup.status = nextGroupName;
            setBacklog([...backlog, inProgressGroup]);
            setInProgress(inProgress.filter((task) => task.id !== itemId));
          }

          if (previousGroupName === "done") {
            const doneGroup =
              done[done.findIndex((task) => task.id === itemId)];
            doneGroup.status = nextGroupName;
            setBacklog([...backlog, doneGroup]);
            setDone(done.filter((task) => task.id !== itemId));
          }
        }}
      >
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
      <div
        data-task-group-status="inProgress"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          const itemId = event.dataTransfer.getData("id");
          const previousGroupName = event.dataTransfer.getData(
            "data-task-group-status"
          );
          const nextGroupName = event.target.dataset.taskGroupStatus;
          console.log(previousGroupName);

          if (previousGroupName === "backlog") {
            const backlogGroup =
              backlog[backlog.findIndex((task) => task.id === itemId)];
            backlogGroup.status = nextGroupName;
            setInProgress([...inProgress, backlogGroup]);
            setBacklog(backlog.filter((task) => task.id !== itemId));
          }

          if (previousGroupName === "done") {
            const doneGroup =
              done[done.findIndex((task) => task.id === itemId)];
            doneGroup.status = nextGroupName;
            setInProgress([...inProgress, doneGroup]);
            setDone(done.filter((task) => task.id !== itemId));
          }
        }}
      >
        <h2 className="task-title">In progress</h2>
        {inProgress.map((task) => (
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
      <div
        data-task-group-status="done"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          const itemId = event.dataTransfer.getData("id");
          const previousGroupName = event.dataTransfer.getData(
            "data-task-group-status"
          );
          const nextGroupName = event.target.dataset.taskGroupStatus;

          if (previousGroupName === "backlog") {
            const backlogGroup =
              backlog[backlog.findIndex((task) => task.id === itemId)];
            backlogGroup.status = nextGroupName;
            setDone([...done, backlogGroup]);
            setBacklog(backlog.filter((task) => task.id !== itemId));
          }

          if (previousGroupName === "inProgress") {
            const inProgressGroup =
              inProgress[inProgress.findIndex((task) => task.id === itemId)];
            inProgressGroup.status = nextGroupName;
            setDone([...done, inProgressGroup]);
            setInProgress(inProgress.filter((task) => task.id !== itemId));
          }
        }}
      >
        <h2 className="task-title">Done</h2>
        {done.map((task) => (
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
    </main>
  );
};

export default MainBlock;
