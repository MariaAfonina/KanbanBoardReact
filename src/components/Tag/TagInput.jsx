import { useDispatch } from "react-redux";
import { addTag } from "../../store/tasksSlice";
import { isTagInputOpened } from "../../store/formSlice";
import "./Tag.css";

const TagInput = ({ taskId, taskStatus }) => {
  const dispatch = useDispatch();

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value.trim();
    if (!value.trim()) return;
    dispatch(addTag({ id: taskId, status: taskStatus, tag: value }));
    dispatch(isTagInputOpened());
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
