import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Form from "./components/form/Form";
import MainBlock from "./components/main/MainBlock";

function App() {
  const [backlogTasks, setBacklogTasks] = useState(
    JSON.parse(localStorage.getItem("tasksBacklog")) || []
  );

  const [inProgressTasks, setInProgressTasks] = useState(
    JSON.parse(localStorage.getItem("tasksInProgress")) || []
  );

  const [doneTasks, setDoneTasks] = useState(
    JSON.parse(localStorage.getItem("tasksDone")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasksBacklog", JSON.stringify(backlogTasks));
  }, [backlogTasks]);

  useEffect(() => {
    localStorage.setItem("tasksInProgress", JSON.stringify(inProgressTasks));
  }, [inProgressTasks]);

  useEffect(() => {
    localStorage.setItem("tasksDone", JSON.stringify(doneTasks));
  }, [doneTasks]);

  const [isFormOpened, setIsFormOpened] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState();

  function toggleForm() {
    setIsFormOpened(!isFormOpened);
  }

  function handleEditTask(id, status) {
    if (status === "backlog") {
      const taskFromBacklog =
        backlogTasks[backlogTasks.findIndex((task) => task.id === id)];
      setTaskToEdit(taskFromBacklog);
    }

    if (status === "inProgress") {
      const taskFromInProgress =
        inProgressTasks[inProgressTasks.findIndex((task) => task.id === id)];
      setTaskToEdit(taskFromInProgress);
    }

    if (status === "done") {
      const taskFromDone =
        doneTasks[doneTasks.findIndex((task) => task.id === id)];
      setTaskToEdit(taskFromDone);
    }
  }

  function onTaskDelete(taskId, status) {
    if (status === "backlog") {
      setBacklogTasks(backlogTasks.filter((task) => task.id !== taskId));
    }

    if (status === "inProgress") {
      setInProgressTasks(inProgressTasks.filter((task) => task.id !== taskId));
    }

    if (status === "done") {
      setDoneTasks(doneTasks.filter((task) => task.id !== taskId));
    }
  }

  return (
    <div>
      <Header toggleForm={toggleForm} />
      {isFormOpened && (
        <Form
          toggleForm={toggleForm}
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
          backlogTasks={backlogTasks}
          setBacklogTasks={setBacklogTasks}
          inProgressTasks={inProgressTasks}
          setInProgressTasks={setInProgressTasks}
          doneTasks={doneTasks}
          setDoneTasks={setDoneTasks}
        />
      )}
      <MainBlock
        backlogTasks={backlogTasks}
        setBacklogTasks={setBacklogTasks}
        inProgressTasks={inProgressTasks}
        setInProgressTasks={setInProgressTasks}
        doneTasks={doneTasks}
        setDoneTasks={setDoneTasks}
        toggleForm={toggleForm}
        handleEditTask={handleEditTask}
        onTaskDelete={onTaskDelete}
      />
    </div>
  );
}

export default App;
