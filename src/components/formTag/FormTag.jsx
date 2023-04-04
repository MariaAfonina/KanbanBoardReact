import "./formTag.css";
import { useState } from "react";

const FormTag = ({ toggleFormTag, addTag }) => {
  const [tagValue, setTagValue] = useState();

  function onTagInputChange(e) {
    setTagValue(e.target.value);
  }

  function onTag(e) {
    e.preventDefault();
    addTag(tagValue);
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
          onChange={onTagInputChange}
        />
        <button className="btn-close" onClick={() => toggleFormTag()}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <button className="all-btn add-tag-button" onClick={onTag}>
        Add
      </button>
    </form>
  );
};

export default FormTag;
