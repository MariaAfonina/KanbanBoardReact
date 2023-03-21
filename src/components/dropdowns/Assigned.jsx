import Arrow from "../arrow/Arrow";
import "./dropdowns.css";
import Value from "./Value";
import { useState } from "react";

const Assigned = ({ value, setValue }) => {
  const [assigned, setAssigned] = useState(value);

  function chooseValue(name) {
    setAssigned(name);
    setValue(name);
  }

  return (
    <div className="add-form-parameter">
      <label>Assignee</label>
      <div className="dropdown-wrapper">
        {assigned}
        <Arrow />
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
      </div>
    </div>
  );
};

export default Assigned;