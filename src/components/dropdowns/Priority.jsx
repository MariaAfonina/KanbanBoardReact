import "./dropdowns.css";
import Arrow from "../arrow/Arrow";
import Value from "./Value";
import { useState } from "react";

const Priority = ({ value, setValue }) => {
  const [priority, setPriority] = useState(value);

  function chooseValue(name) {
    setPriority(name);
    setValue(name);
  }

  return (
    <div className="add-form-parameter">
      <label>Priority</label>
      <div className="dropdown-wrapper">
        {priority}
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
