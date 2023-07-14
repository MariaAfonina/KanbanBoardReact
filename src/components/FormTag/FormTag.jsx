import { useState } from "react";
import "./FormTag.css";

const FormTag = ({ toggleFormTag, addTag, currentTag, updateTag }) => {
  const [tagValue, setTagValue] = useState(currentTag || "");

  function onTagInputChange(e) {
    setTagValue(e.target.value);
  }

  function onTagAdd(e) {
    e.preventDefault();
    addTag(tagValue);
  }

  function onEditTag(e) {
    e.preventDefault();
    updateTag(tagValue);
  }

  return (
    <form className="add-tag-form">
      <div className="input-close-wrapper">
        <label htmlFor="tag"></label>
        <input
          id="tag"
          type="text"
          placeholder="Tag"
          className="add-tag-input"
          value={tagValue}
          onChange={onTagInputChange}
        />
        <button className="btn-close" onClick={toggleFormTag}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      {currentTag ? (
        <button className="all-btn tag-button" onClick={onEditTag}>
          Update
        </button>
      ) : (
        <button className="all-btn tag-button" onClick={onTagAdd}>
          Add
        </button>
      )}
    </form>
  );
};

export default FormTag;
