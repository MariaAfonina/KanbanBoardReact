import "./FormTag.css";

const FormTag = () => {
  return (
    <form className="add-tag-form">
      <div className="input-close-wrapper">
        <label htmlFor="tag"></label>
        <input
          id="tag"
          type="text"
          placeholder="Tag"
          className="add-tag-input"
        />
        <button className="btn-close">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </form>
  );
};

export default FormTag;
