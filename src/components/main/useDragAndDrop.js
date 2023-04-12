const useDragAndDrop = (
  taskId,
  taskStatus,
  mapStatusToTasksList,
  mapStatusToTasksSetter
) => {
  function onDragOver(event) {
    event.preventDefault();
  }

  function onDropTask(event) {
    const nextGroupName = event.currentTarget.dataset.taskGroupStatus;

    if (taskStatus !== nextGroupName) {
      const tasksFromStatus = mapStatusToTasksList[taskStatus];
      const setterFromStatus = mapStatusToTasksSetter[taskStatus];

      const tasksFromNextGroupName = mapStatusToTasksList[nextGroupName];
      const setterFromNextGroupName = mapStatusToTasksSetter[nextGroupName];

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
