import { useDispatch } from "react-redux";
import { deleteTag } from "../../store/tasksSlice";

const Tag = ({ tag, taskId }) => {
  const dispatch = useDispatch();

  const handleDeleteTag = () => {
    dispatch(
      deleteTag({
        tag: tag,
        id: taskId,
      })
    );
  };
  return (
    <div className="tag">
      <span>{tag}</span>
      <button className="btn-delete-tag" onClick={handleDeleteTag}>
        &times;
      </button>
    </div>
  );
};

export default Tag;
