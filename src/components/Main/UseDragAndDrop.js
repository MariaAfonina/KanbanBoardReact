import { useContext } from "react";
import { TaskContext } from "../../App";

const useDragAndDrop = (taskId, taskStatus) => {
  const useTaskContext = useContext(TaskContext);

  function onDragOver(event) {
    event.preventDefault();
  }

  function onDropTask(event) {
    const nextGroupName = event.currentTarget.dataset.taskGroupStatus;

    if (taskStatus !== nextGroupName) {
      const tasksFromStatus = useTaskContext.mapStatusToTasksList[taskStatus];
      const setterFromStatus =
        useTaskContext.mapStatusToTasksSetter[taskStatus];

      const tasksFromNextGroupName =
        useTaskContext.mapStatusToTasksList[nextGroupName];
      const setterFromNextGroupName =
        useTaskContext.mapStatusToTasksSetter[nextGroupName];

      const tasksGroup =
        tasksFromStatus[
          tasksFromStatus.findIndex((task) => task.id === taskId)
        ];

      tasksGroup.status = nextGroupName;

      setterFromNextGroupName([...tasksFromNextGroupName, tasksGroup]);

      setterFromStatus(tasksFromStatus.filter((task) => task.id !== taskId));
    }
  }

  return { onDragOver, onDropTask };
};

export default useDragAndDrop;
