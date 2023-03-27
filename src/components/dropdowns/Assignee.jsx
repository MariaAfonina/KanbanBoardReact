import Arrow from "../arrow/Arrow";
import "./dropdowns.css";
import Value from "./Value";
import { useState } from "react";

const Assignee = ({ fieldName, value, setValue }) => {
  const [assignee, setAssignee] = useState(value);

  function chooseValue(name) {
    setAssignee(name);
    setValue(fieldName, name);
  }

  return (
    <div className="add-form-parameter">
      <label>Assignee</label>
      <div className="dropdown-wrapper">
        {assignee}
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

export default Assignee;
