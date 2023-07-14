import { useDispatch } from "react-redux";
import { addTag } from "../../store/tasksSlice";
import "./Tag.css";

const TagInput = ({ taskId, setIsTagInputOpened }) => {
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value.trim();
    if (!value.trim()) return;
    dispatch(addTag({ id: taskId, tag: value }));
    setIsTagInputOpened(false);
    e.target.value = "";
  };

  return (
    <div>
      <input
        className="add-tag-input"
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="type tag"
      />
    </div>
  );
};

export default TagInput;
