import "./mainBlock.css";
import Task from "../task/Task";

const MainBlock = ({
  backlogTasks,
  setBacklogTasks,
  inProgressTasks,
  setInProgressTasks,
  doneTasks,
  setDoneTasks,
  toggleForm,
  handleEditTask,
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
          const nextGroupName = event.currentTarget.dataset.taskGroupStatus;

          if (previousGroupName === "inProgress") {
            const inProgressGroup =
              inProgressTasks[
                inProgressTasks.findIndex((task) => task.id === itemId)
              ];
            inProgressGroup.status = nextGroupName;
            setBacklogTasks([...backlogTasks, inProgressGroup]);
            setInProgressTasks(
              inProgressTasks.filter((task) => task.id !== itemId)
            );
          }

          if (previousGroupName === "done") {
            const doneGroup =
              doneTasks[doneTasks.findIndex((task) => task.id === itemId)];
            doneGroup.status = nextGroupName;
            setBacklogTasks([...backlogTasks, doneGroup]);
            setDoneTasks(doneTasks.filter((task) => task.id !== itemId));
          }
        }}
      >
        <h2 className="task-title">Backlog</h2>
        {backlogTasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            toggleForm={toggleForm}
            handleEditTask={handleEditTask}
            onTaskDelete={onTaskDelete}
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

          if (previousGroupName === "backlog") {
            const backlogGroup =
              backlogTasks[
                backlogTasks.findIndex((task) => task.id === itemId)
              ];
            backlogGroup.status = nextGroupName;
            setInProgressTasks([...inProgressTasks, backlogGroup]);
            setBacklogTasks(backlogTasks.filter((task) => task.id !== itemId));
          }

          if (previousGroupName === "done") {
            const doneGroup =
              doneTasks[doneTasks.findIndex((task) => task.id === itemId)];
            doneGroup.status = nextGroupName;
            setInProgressTasks([...inProgressTasks, doneGroup]);
            setDoneTasks(doneTasks.filter((task) => task.id !== itemId));
          }
        }}
      >
        <h2 className="task-title">In progress</h2>
        {inProgressTasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            toggleForm={toggleForm}
            handleEditTask={handleEditTask}
            onTaskDelete={onTaskDelete}
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
              backlogTasks[
                backlogTasks.findIndex((task) => task.id === itemId)
              ];
            backlogGroup.status = nextGroupName;
            setDoneTasks([...doneTasks, backlogGroup]);
            setBacklogTasks(backlogTasks.filter((task) => task.id !== itemId));
          }

          if (previousGroupName === "inProgress") {
            const inProgressGroup =
              inProgressTasks[
                inProgressTasks.findIndex((task) => task.id === itemId)
              ];
            inProgressGroup.status = nextGroupName;
            setDoneTasks([...doneTasks, inProgressGroup]);
            setInProgressTasks(
              inProgressTasks.filter((task) => task.id !== itemId)
            );
          }
        }}
      >
        <h2 className="task-title">Done</h2>
        {doneTasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            toggleForm={toggleForm}
            handleEditTask={handleEditTask}
            onTaskDelete={onTaskDelete}
          />
        ))}
      </div>
    </main>
  );
};

export default MainBlock;
