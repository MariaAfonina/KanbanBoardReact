import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import MainBlock from "./components/Main/MainBlock";

function App() {
  const backlogTasks = useSelector((state) => state.tasks.backlog);
  const inProgressTasks = useSelector((state) => state.tasks.inProgress);
  const doneTasks = useSelector((state) => state.tasks.done);
  const isFormOpened = useSelector((state) => state.form.isForm);

  useEffect(() => {
    localStorage.setItem("backlog", JSON.stringify(backlogTasks));
  }, [backlogTasks]);

  useEffect(() => {
    localStorage.setItem("inProgress", JSON.stringify(inProgressTasks));
  }, [inProgressTasks]);

  useEffect(() => {
    localStorage.setItem("done", JSON.stringify(doneTasks));
  }, [doneTasks]);

  return (
    <div>
      <Header />
      <MainBlock />
      {isFormOpened && <Form />}
    </div>
  );
}

export default App;
