import "./ButtonDelete";

const ButtonDelete = ({ taskId }) => {
  function deleteTask(e) {
    e.preventDefault();
    const tasks = JSON.parse(localStorage.getItem("tasksBacklog"));
    console.log(tasks);
    tasks.findIndex((task) => task.id === taskId);
    tasks.splice(taskId, 1);
    localStorage.setItem("tasksBacklog", JSON.stringify(tasks));
  }
  return (
    <button className="button-close" onClick={deleteTask}>
      <i className="fa-solid fa-xmark"></i>
    </button>
  );
};

export default ButtonDelete;
