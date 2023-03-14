import "./buttons.css";

const DeleteTask = ({ taskId }) => {
  function deleteTask(e) {
    e.preventDefault();
    const tasks = JSON.parse(localStorage.getItem("tasksBacklog"));
    tasks.findIndex((task) => task.id === taskId);
    tasks.splice(taskId, 1);
    localStorage.setItem("tasksBacklog", JSON.stringify(tasks));
  }
  return (
    <button className="button-delete" onClick={deleteTask}>
      <i className="fa-solid fa-xmark"></i>
    </button>
  );
};

export default DeleteTask;
