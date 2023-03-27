import "./dropdowns.css";
import Arrow from "../arrow/Arrow";
import Value from "./Value";
import { useState } from "react";

const Priority = ({ fieldName, value, setValue }) => {
  const [selectedPriority, setSelectedPriority] = useState(value);

  function chooseValue(name) {
    setSelectedPriority(name);
    setValue(fieldName, name);
  }

  return (
    <div className="add-form-parameter">
      <label>Priority</label>
      <div className="dropdown-wrapper">
        {selectedPriority}
        <Arrow />
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
      </div>
    </div>
  );
};

export default Priority;
