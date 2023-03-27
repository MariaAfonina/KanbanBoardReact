import "./header.css";

const Header = ({ toggleForm }) => {
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
