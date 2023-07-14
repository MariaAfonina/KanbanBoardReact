import { useContext } from "react";
import { TaskContext } from "../../App";
import "./Header.css";

const Header = () => {
  const useTaskContext = useContext(TaskContext);

  return (
    <header>
      <h1 className="title">Kanban Board</h1>
      <button
        className="all-btn new-task-button"
        onClick={useTaskContext.toggleForm}
      >
        Create a New Task
      </button>
    </header>
  );
};

export default Header;
