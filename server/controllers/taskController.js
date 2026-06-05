const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, '../data/tasks.json');

function readTasks() {
  return JSON.parse(fs.readFileSync(tasksFilePath, 'utf-8'));
}

function saveTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

function getTasks(req, res) {
  const tasks = readTasks();
  const newestFirst = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(newestFirst);
}

function addTask(req, res) {
  const { title, description, dueDate } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const tasks = readTasks();

  const newTask = {
    id: Date.now().toString(),
    title: title.trim(),
    description: description ? description.trim() : '',
    dueDate: dueDate || '',
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json(newTask);
}

function updateTask(req, res) {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const tasks = readTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title.trim(),
    description: description ? description.trim() : '',
    dueDate: dueDate || ''
  };

  saveTasks(tasks);

  res.json(tasks[taskIndex]);
}

function deleteTask(req, res) {
  const { id } = req.params;
  const tasks = readTasks();
  const taskExists = tasks.some((task) => task.id === id);

  if (!taskExists) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const updatedTasks = tasks.filter((task) => task.id !== id);
  saveTasks(updatedTasks);

  res.json({ message: 'Task deleted successfully' });
}

function toggleTask(req, res) {
  const { id } = req.params;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  saveTasks(tasks);

  res.json(tasks[taskIndex]);
}

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTask
};
