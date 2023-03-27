import "./arrow.css";

const Arrow = () => {
  function handleClick(e) {
    e.preventDefault();
  }
  return (
    <button className="btn-icon-arrow" onClick={handleClick}>
      <i className="icon-arrow fa-solid fa-caret-down"></i>
    </button>
  );
};

export default Arrow;
