import TaskItem from './TaskItem';

function TaskList({ tasks, onEditTask, onDeleteTask, onToggleTask }) {
  if (tasks.length === 0) {
    return (
      <div className="card empty">
        <h3>No tasks found</h3>
        <p>Add a new task or change the selected filter.</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
