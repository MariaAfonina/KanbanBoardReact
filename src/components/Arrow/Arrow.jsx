import "./Arrow.css";

const Arrow = ({ toggleDropdown }) => {
  const handleClick = (e) => {
    e.preventDefault();
    toggleDropdown();
  };

  return (
    <button className="btn-icon-arrow" onClick={handleClick}>
      <i className="icon-arrow fa-solid fa-caret-down"></i>
    </button>
  );
};

export default Arrow;
