import "./arrow.css";

const Arrow = () => {
  function openDropdown(e) {
    e.preventDefault();
  }
  return (
    <button className="btn-icon-arrow" onClick={openDropdown}>
      <i className="icon-arrow fa-solid fa-caret-down"></i>
    </button>
  );
};

export default Arrow;
