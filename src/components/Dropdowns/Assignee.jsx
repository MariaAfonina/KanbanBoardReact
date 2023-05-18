import Arrow from "../arrow/Arrow";
import "./dropdowns.css";
import Value from "./Value";
import { useState } from "react";

const Assignee = ({ fieldName, value, setValue }) => {
  const [assignee, setAssignee] = useState(value);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  function chooseValue(name) {
    setAssignee(name);
    setValue(fieldName, name);
    toggleDropdown();
  }

  function toggleDropdown() {
    setIsDropdownOpened(!isDropdownOpened);
  }

  return (
    <div className="add-form-parameter">
      <label>Assignee</label>
      <div className="dropdown-wrapper">
        {assignee}
        <Arrow toggleDropdown={toggleDropdown} />
        {isDropdownOpened && (
          <ul className="dropdown-value">
            <Value
              name="Jane Doe"
              styleName="name-value"
              chooseValue={chooseValue}
            />
            <Value
              name="John Doe"
              styleName="name-value"
              chooseValue={chooseValue}
            />
          </ul>
        )}
      </div>
    </div>
  );
};

export default Assignee;