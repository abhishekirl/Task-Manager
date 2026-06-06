function TaskItem({ task, onEditTask, onDeleteTask, onToggleTask }) {
  const today = new Date().toISOString().split('T')[0];
  const isOverdue = task.dueDate && task.dueDate < today && !task.completed;

  return (
    <div className={`card task ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />

        <div>
          <h3>{task.title}</h3>
          {task.description && <p>{task.description}</p>}
          {task.dueDate && (
            <small>
              Due: {task.dueDate}
              {isOverdue && ' (Overdue)'}
            </small>
          )}
        </div>
      </div>

      <div className="button-row">
        <button onClick={() => onEditTask(task)}>Edit</button>
        <button className="red-button" onClick={() => onDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
