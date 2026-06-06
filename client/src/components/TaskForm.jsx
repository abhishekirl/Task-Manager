import { useEffect, useState } from 'react';

function TaskForm({ onSaveTask, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate);
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [editingTask]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      alert('Task title is required');
      return;
    }

    onSaveTask({
      title,
      description,
      dueDate
    });

    if (!editingTask) {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }

  return (
    <div className="card">
      <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Optional details"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <label htmlFor="dueDate">Due Date</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />

        <div className="button-row">
          <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
          {editingTask && (
            <button type="button" className="gray-button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
