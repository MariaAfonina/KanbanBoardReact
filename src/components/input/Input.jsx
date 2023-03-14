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
  return (
    <div className="add-form-parameter">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
