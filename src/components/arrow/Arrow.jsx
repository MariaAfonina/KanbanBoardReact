import "./arrow.css";

const Arrow = ({ toggleDropdown }) => {
  function handleClick(e) {
    e.preventDefault();
    toggleDropdown();
  }
  return (
    <button className="btn-icon-arrow" onClick={handleClick}>
      <i className="icon-arrow fa-solid fa-caret-down"></i>
    </button>
  );
};

export default Arrow;
