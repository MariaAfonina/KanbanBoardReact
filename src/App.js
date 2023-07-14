import {
  useEffect,
  useState,
  useMemo,
  createContext,
  useCallback,
} from "react";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import MainBlock from "./components/Main/MainBlock";

export const TaskContext = createContext();

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

  const [isFormOpened, setIsFormOpened] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState();

  useEffect(() => {
    localStorage.setItem("backlog", JSON.stringify(backlogTasks));
  }, [backlogTasks]);

  useEffect(() => {
    localStorage.setItem("inProgress", JSON.stringify(inProgressTasks));
  }, [inProgressTasks]);

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(doneTasks));
  }, [doneTasks]);

  const toggleForm = useCallback(() => {
    setIsFormOpened(!isFormOpened);
  }, [isFormOpened]);

  const handleEditTask = useCallback(
    (id, status) => {
      const tasksFromStatus = mapStatusToTasksList[status];

      setTaskToEdit(
        tasksFromStatus[tasksFromStatus.findIndex((task) => task.id === id)]
      );
    },
    [mapStatusToTasksList, setTaskToEdit]
  );

  const onTaskDelete = useCallback(
    (taskId, status) => {
      mapStatusToTasksSetter[status](
        mapStatusToTasksList[status].filter((task) => task.id !== taskId)
      );
    },
    [mapStatusToTasksSetter, mapStatusToTasksList]
  );

  return (
    <TaskContext.Provider
      value={{
        toggleForm,
        handleEditTask,
        onTaskDelete,
        mapStatusToTasksList,
        mapStatusToTasksSetter,
      }}
    >
      <div>
        <Header />
        {isFormOpened && (
          <Form
            taskToEdit={taskToEdit}
            setTaskToEdit={setTaskToEdit}
            backlogTasks={backlogTasks}
            setBacklogTasks={setBacklogTasks}
          />
        )}

        <MainBlock
          backlogTasks={backlogTasks}
          inProgressTasks={inProgressTasks}
          doneTasks={doneTasks}
        />
      </div>
    </TaskContext.Provider>
  );
}

export default App;
