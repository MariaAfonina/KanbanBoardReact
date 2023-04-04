import { useEffect, useState, useMemo } from "react";
import Header from "./components/header/Header";
import Form from "./components/form/Form";
import MainBlock from "./components/main/MainBlock";

function App() {
  const [backlogTasks, setBacklogTasks] = useState(
    JSON.parse(localStorage.getItem("backlog")) || []
  );

  const [inProgressTasks, setInProgressTasks] = useState(
    JSON.parse(localStorage.getItem("inProgress")) || []
  );

  const [doneTasks, setDoneTasks] = useState(
    JSON.parse(localStorage.getItem("done")) || []
  );

  const mapStatusToTasksList = useMemo(
    () => ({
      backlog: backlogTasks,
      inProgress: inProgressTasks,
      done: doneTasks,
    }),
    [backlogTasks, inProgressTasks, doneTasks]
  );

  const mapStatusToTasksSetter = useMemo(
    () => ({
      backlog: setBacklogTasks,
      inProgress: setInProgressTasks,
      done: setDoneTasks,
    }),
    []
  );

  useEffect(() => {
    localStorage.setItem("backlog", JSON.stringify(backlogTasks));
  }, [backlogTasks]);

  useEffect(() => {
    localStorage.setItem("inProgress", JSON.stringify(inProgressTasks));
  }, [inProgressTasks]);

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(doneTasks));
  }, [doneTasks]);

  const [isFormOpened, setIsFormOpened] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState();

  function toggleForm() {
    setIsFormOpened(!isFormOpened);
  }

  function handleEditTask(id, status) {
    const tasksFromStatus = mapStatusToTasksList[status];

    setTaskToEdit(
      tasksFromStatus[tasksFromStatus.findIndex((task) => task.id === id)]
    );
  }

  function onTaskDelete(taskId, status) {
    mapStatusToTasksSetter[status](
      mapStatusToTasksList[status].filter((task) => task.id !== taskId)
    );
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
          mapStatusToTasksList={mapStatusToTasksList}
          mapStatusToTasksSetter={mapStatusToTasksSetter}
        />
      )}

      <MainBlock
        backlogTasks={backlogTasks}
        inProgressTasks={inProgressTasks}
        doneTasks={doneTasks}
        toggleForm={toggleForm}
        handleEditTask={handleEditTask}
        onTaskDelete={onTaskDelete}
        mapStatusToTasksList={mapStatusToTasksList}
        mapStatusToTasksSetter={mapStatusToTasksSetter}
      />
    </div>
  );
}

export default App;
