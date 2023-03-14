const Value = ({ name, styleName, chooseValue }) => {
  function value() {
    chooseValue(name);
  }
  return (
    <li data-name={name} className={styleName} onClick={value}>
      {name}
    </li>
  );
};

export default Value;
