const Value = ({ name, styleName, chooseValue }) => {
  return (
    <li
      data-name={name}
      className={styleName}
      onClick={() => chooseValue(name)}
    >
      {name}
    </li>
  );
};

export default Value;
