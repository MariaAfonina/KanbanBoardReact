import { useState } from "react";
import Arrow from "../Arrow/Arrow";
import Value from "./Value";
import "./Dropdowns.css";

const Assignee = ({ fieldName, value, setValue }) => {
  const [assignee, setAssignee] = useState(value);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const chooseValue = (name) => {
    setAssignee(name);
    setValue(fieldName, name);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsDropdownOpened(!isDropdownOpened);
  };

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
