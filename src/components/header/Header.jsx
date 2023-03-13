import "./header.css";

const Header = ({ onSubmit }) => {
  function openForm() {
    onSubmit();
  }

  return (
    <header>
      <h1 className="title">Kanban Board</h1>
      <button className="all-btn new-task-button" onClick={openForm}>
        Create a New Task
      </button>
    </header>
  );
};

export default Header;
