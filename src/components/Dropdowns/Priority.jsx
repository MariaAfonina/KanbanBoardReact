import "./Dropdowns.css";
import Arrow from "../Arrow/Arrow";
import Value from "./Value";
import { useState } from "react";

const Priority = ({ fieldName, value, setValue }) => {
  const [selectedPriority, setSelectedPriority] = useState(value);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  function chooseValue(name) {
    setSelectedPriority(name);
    setValue(fieldName, name);
    toggleDropdown();
  }

  function toggleDropdown() {
    setIsDropdownOpened(!isDropdownOpened);
  }

  return (
    <div className="add-form-parameter">
      <label>Priority</label>
      <div className="dropdown-wrapper">
        {selectedPriority}
        <Arrow toggleDropdown={toggleDropdown} />
        {isDropdownOpened && (
          <ul className="dropdown-value">
            <Value
              name="High"
              styleName="high priority"
              chooseValue={chooseValue}
            />
            <Value
              name="Medium"
              styleName="medium priority"
              chooseValue={chooseValue}
            />
            <Value
              name="Low"
              styleName="low priority"
              chooseValue={chooseValue}
            />
          </ul>
        )}
      </div>
    </div>
  );
};

export default Priority;
