import { useState } from "react";
import Header from "./components/header/Header";
import Form from "./components/form/Form";
import MainBlock from "./components/main/MainBlock";

function App() {
  const [openForm, setOpenForm] = useState(false);

  const backlog = JSON.parse(localStorage.getItem("tasksBacklog")) || [];
  const inProgress = JSON.parse(localStorage.getItem("tasksInProgress")) || [];
  const done = JSON.parse(localStorage.getItem("tasksDone")) || [];

  function isOpenForm() {
    setOpenForm(!openForm);
  }

  return (
    <div>
      <Header onSubmit={isOpenForm} />
      <Form isForm={openForm} onSubmit={isOpenForm} />
      <MainBlock backlog={backlog} inProgress={inProgress} done={done} />
    </div>
  );
}

export default App;
