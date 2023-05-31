import "./Header.css";
import { useContext } from "react";
import { TaskContext } from "../../App";

const Header = () => {
  const { toggleForm } = useContext(TaskContext);

  return (
    <header>
      <h1 className="title">Kanban Board</h1>
      <button className="all-btn new-task-button" onClick={toggleForm}>
        Create a New Task
      </button>
    </header>
  );
};

export default Header;
