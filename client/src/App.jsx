import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import API_URL from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    axios
      .get(API_URL)
      .then((response) => setTasks(response.data))
      .catch(() => alert('Could not load tasks'));
  }

  function handleSaveTask(taskData) {
    if (editingTask) {
      axios
        .put(`${API_URL}/${editingTask.id}`, taskData)
        .then(() => {
          setEditingTask(null);
          fetchTasks();
        })
        .catch(() => alert('Could not update task'));
    } else {
      axios
        .post(API_URL, taskData)
        .then(() => fetchTasks())
        .catch(() => alert('Could not add task'));
    }
  }

  function handleDeleteTask(id) {
    const shouldDelete = window.confirm('Are you sure you want to delete this task?');

    if (!shouldDelete) {
      return;
    }

    axios
      .delete(`${API_URL}/${id}`)
      .then(() => fetchTasks())
      .catch(() => alert('Could not delete task'));
  }

  function handleToggleTask(id) {
    axios
      .patch(`${API_URL}/${id}/toggle`)
      .then(() => fetchTasks())
      .catch(() => alert('Could not update task status'));
  }

  const activeCount = tasks.filter((task) => !task.completed).length;
  const completedCount = tasks.filter((task) => task.completed).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    }

    if (filter === 'completed') {
      return task.completed;
    }

    return true;
  });

  return (
    <div className="container">
      <header>
        <h1>Personal Task Manager</h1>
        <p>Keep track of your daily work and deadlines.</p>
      </header>

      <main>
        <section>
          <TaskForm
            onSaveTask={handleSaveTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
          />
        </section>

        <section>
          <div className="stats">
            <p>Active: {activeCount}</p>
            <p>Completed: {completedCount}</p>
          </div>

          <div className="filters">
            <button
              className={filter === 'all' ? 'selected' : ''}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={filter === 'active' ? 'selected' : ''}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button
              className={filter === 'completed' ? 'selected' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>

          <TaskList
            tasks={filteredTasks}
            onEditTask={setEditingTask}
            onDeleteTask={handleDeleteTask}
            onToggleTask={handleToggleTask}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
