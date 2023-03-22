import "./input.css";

const Input = ({
  name,
  label,
  type,
  className,
  placeholder,
  value,
  setValue,
}) => {
  function onInputChange(e) {
    setValue(name, e.target.value);
  }
  return (
    <div className="add-form-parameter">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onInputChange}
      />
    </div>
  );
};

export default Input;
