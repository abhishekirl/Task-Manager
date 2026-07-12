# Personal Task Manager

## Project Title & Brief Description

A full-stack task manager for creating, updating, completing, filtering, and deleting personal tasks.

## Live Demo Links

Frontend: https://task-manager-frontend1.netlify.app

Backend: https://task-manager-backend-kft4.onrender.com

## Tech Stack

- React: I used this for the frontend because it makes it easier to split the page into components like the form, list, and task item.
- Vite: I used this to set up and build the React app without too much extra configuration.
- JavaScript: used for both the frontend and backend.
- CSS: used for the layout, buttons, filters, completed task style, and overdue task style.
- Axios: used to call the backend API from the React app.
- Node.js: used to run the backend.
- Express: used to create the API routes.
- JSON file storage: used to store tasks in `server/data/tasks.json`. I used this instead of a database to keep the project simple.

## How To Run Locally

These commands assume Node.js is installed.

Start the backend first:

```bash
git clone https://github.com/abhishekirl/Task-Manager.git
cd Task-Manager/server
npm install
npm start
```

The backend should run on http://localhost:5001.

Then open a second terminal and start the frontend:

```bash
cd Task-Manager/client
npm install
npm run dev
```

The frontend should run on http://localhost:5173.

For local development, the frontend uses the Vite proxy to send `/tasks` requests to the backend.

## API Documentation

### Get all tasks

```text
Method: GET
Path: /tasks
Request body: none
```

Response shape:

```json
[
  {
    "id": "1717600000000",
    "title": "Complete assignment",
    "description": "Finish task manager project",
    "dueDate": "2026-06-10",
    "completed": false,
    "createdAt": "2026-06-05T09:00:00.000Z"
  }
]
```

### Create a task

```text
Method: POST
Path: /tasks
```

Request body:

```json
{
  "title": "Complete assignment",
  "description": "Finish task manager project",
  "dueDate": "2026-06-10"
}
```

Response shape:

```json
{
  "id": "1717600000000",
  "title": "Complete assignment",
  "description": "Finish task manager project",
  "dueDate": "2026-06-10",
  "completed": false,
  "createdAt": "2026-06-05T09:00:00.000Z"
}
```

### Update a task

```text
Method: PUT
Path: /tasks/:id
```

Request body:

```json
{
  "title": "Updated task title",
  "description": "Updated task details",
  "dueDate": "2026-06-12"
}
```

Response shape:

```json
{
  "id": "1717600000000",
  "title": "Updated task title",
  "description": "Updated task details",
  "dueDate": "2026-06-12",
  "completed": false,
  "createdAt": "2026-06-05T09:00:00.000Z"
}
```

### Delete a task

```text
Method: DELETE
Path: /tasks/:id
Request body: none
```

Response shape:

```json
{
  "message": "Task deleted successfully"
}
```

### Toggle complete or incomplete

```text
Method: PATCH
Path: /tasks/:id/toggle
Request body: none
```

Response shape:

```json
{
  "id": "1717600000000",
  "title": "Complete assignment",
  "description": "Finish task manager project",
  "dueDate": "2026-06-10",
  "completed": true,
  "createdAt": "2026-06-05T09:00:00.000Z"
}
```

Error response examples:

```json
{
  "message": "Task not found"
}
```

```json
{
  "message": "Title is required"
}
```

## Project Structure

```text
Task-Manager/
|-- client/
|   |-- src/
|   |   |-- components/       form, list, and single task components
|   |   |-- api.js            frontend API URL
|   |   |-- App.jsx           main React logic
|   |   |-- App.css           styling
|   |-- index.html
|   |-- package.json
|   |-- vite.config.js
|
|-- server/
|   |-- controllers/          task logic
|   |-- routes/               API route definitions
|   |-- data/                 tasks.json storage
|   |-- server.js             Express server
|   |-- package.json
|
|-- README.md
|-- .gitignore
```

## Next Steps

I did not add login, search, priority levels, tests, or a real database in this version. I wanted the project to stay focused on the basic full stack task flow first. If I worked on it more, I would add user accounts, move the tasks into a database, add search and priority filters, and write tests for the main API routes.
