import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  useEffect,
  useState,
  useMemo,
  createContext,
  useCallback,
} from "react";
import Footer from "./components/Footer/Footer";
import "./AppContainer.css";

export const TaskContext = createContext();

function AppContainer() {
  const navigate = useNavigate();
  const [backlogTasks, setBacklogTasks] = useState(
    JSON.parse(localStorage.getItem("backlog")) || []
  );
  const [inProgressTasks, setInProgressTasks] = useState(
    JSON.parse(localStorage.getItem("inProgress")) || []
  );
  const [doneTasks, setDoneTasks] = useState(
    JSON.parse(localStorage.getItem("done")) || []
  );
  const [pageParams, setPageParams] = useState(
    `${window.innerHeight} * ${window.innerWidth}`
  );
  const [taskToEdit, setTaskToEdit] = useState();

  const activeClass = ({ isActive }) =>
    isActive ? "active-link" : "not-active-link";

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
    window.addEventListener("resize", () => {
      setPageParams(`${window.innerHeight} * ${window.innerWidth}`);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("backlog", JSON.stringify(backlogTasks));
  }, [backlogTasks]);

  useEffect(() => {
    localStorage.setItem("inProgress", JSON.stringify(inProgressTasks));
  }, [inProgressTasks]);

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(doneTasks));
  }, [doneTasks]);

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
    (taskId, status, title) => {
      if (
        window.confirm(`Are you sure you want to delete task '${title}'?`) ===
        true
      ) {
        mapStatusToTasksSetter[status](
          mapStatusToTasksList[status].filter((task) => task.id !== taskId)
        );
      }
    },
    [mapStatusToTasksSetter, mapStatusToTasksList]
  );

  useEffect(() => {
    const name = prompt("Hello! What is you name?");
    if (name !== null) {
      document.getElementById("user-name").innerText =
        "Hello " + name + "! How are you today?";
    }
  }, []);

  return (
    <TaskContext.Provider
      value={{
        handleEditTask,
        onTaskDelete,
        mapStatusToTasksList,
        mapStatusToTasksSetter,
        taskToEdit,
        setTaskToEdit,
        backlogTasks,
        setBacklogTasks,
      }}
    >
      <>
        <header>
          <p>{pageParams}</p>
          <h1 className="title">Kanban Board</h1>
          <div>
            <div id="user-name" className="hello-text" />
            <nav className="nav-bar">
              <NavLink to="/" className={activeClass}>
                Home
              </NavLink>
              <NavLink to="/about" className={activeClass}>
                About
              </NavLink>
              <NavLink to="/notes" className={activeClass}>
                Notes
              </NavLink>
            </nav>
          </div>
          <div>
            <button
              className="all-btn new-button"
              onClick={() => navigate("/task/create")}
            >
              Create a New Task
            </button>
            <button
              className="all-btn new-button"
              onClick={() => navigate("/non-exist")}
            >
              Create a Note
            </button>
          </div>
        </header>
        <Outlet context={[backlogTasks, inProgressTasks, doneTasks]} />
      </>

      <Footer />
    </TaskContext.Provider>
  );
}

export default AppContainer;
