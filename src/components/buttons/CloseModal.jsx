import "./buttons.css";

const CloseModal = ({ onSubmit }) => {
  function closeForm(e) {
    e.preventDefault();
    onSubmit();
  }
  return (
    <button className="button-delete form-btn-close" onClick={closeForm}>
      <i className="fa-solid fa-xmark"></i>
    </button>
  );
};

export default CloseModal;
