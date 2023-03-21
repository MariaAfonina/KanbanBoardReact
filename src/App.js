import { useState } from "react";
import Header from "./components/header/Header";
import Form from "./components/form/Form";
import MainBlock from "./components/main/MainBlock";

function App() {
  const [backlog, setBacklog] = useState(
    JSON.parse(localStorage.getItem("tasksBacklog")) || []
  );
  localStorage.setItem("tasksBacklog", JSON.stringify(backlog));

  const [inProgress, setInProgress] = useState(
    JSON.parse(localStorage.getItem("tasksInProgress")) || []
  );
  localStorage.setItem("tasksInProgress", JSON.stringify(inProgress));

  const [done, setDone] = useState(
    JSON.parse(localStorage.getItem("tasksDone")) || []
  );
  localStorage.setItem("tasksDone", JSON.stringify(done));

  const [openForm, setOpenForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState();

  function isOpenForm() {
    setOpenForm(!openForm);
  }

  function findEditId(id) {
    const task = backlog[backlog.findIndex((task) => task.id === id)];
    setTaskToEdit(task);
  }

  function onTaskDelete(taskId) {
    setBacklog(backlog.filter((task) => task.id !== taskId));
    setInProgress(inProgress.filter((task) => task.id !== taskId));
    setDone(done.filter((task) => task.id !== taskId));
  }

  return (
    <div>
      <Header isForm={isOpenForm} />
      {openForm && (
        <Form
          isForm={isOpenForm}
          taskToEdit={taskToEdit}
          setTaskToEdit={setTaskToEdit}
          backlog={backlog}
          setBacklog={setBacklog}
        />
      )}
      <MainBlock
        backlog={backlog}
        inProgress={inProgress}
        done={done}
        isForm={isOpenForm}
        editTask={findEditId}
        onTaskDelete={onTaskDelete}
      />
    </div>
  );
}

export default App;
