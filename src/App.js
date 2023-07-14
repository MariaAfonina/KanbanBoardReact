import { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Form from "./components/Form/Form";
import MainBlock from "./components/Main/MainBlock";

function App() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const isFormOpened = useSelector((state) => state.form.isForm);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <Header />
      <MainBlock />
      {isFormOpened && <Form />}
    </div>
  );
}

export default App;
