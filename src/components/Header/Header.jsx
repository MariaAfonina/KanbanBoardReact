import { useDispatch } from "react-redux";
import { isFormOpened } from "../../store/formSlice";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();

  const toggleForm = (e) => {
    e.preventDefault();
    dispatch(isFormOpened());
  };

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
