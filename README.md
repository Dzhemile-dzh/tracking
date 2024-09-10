
Task Tracking Extension
This project is a task tracking application that runs on a Node.js server and can be used as a Google Chrome extension. It allows you to create tasks, manage subtasks, track task completion, and monitor progress. Tasks are updated dynamically through a REST API served by the Node.js backend.

Features
Task Management: Create, edit, and delete tasks.
Subtask Management: Track progress of individual subtasks.
Progress Tracking: Automatically update task progress based on subtask completion.
Timer: Start and pause a timer for each task.
Mark Task as Complete: Easily mark all subtasks as completed with one click.
Getting Started
Prerequisites
Project Setup
Clone the repository:

git clone https://github.com/your-repo/task-tracking-extension.git
cd task-tracking-extension
Install the dependencies:
npm install
Run the project:

To start the server, simply run:
node server.js
The server will start at http://localhost:3000.

API Endpoints:

GET /tasks: Fetch all tasks.
GET /tasks/:id: Fetch a specific task.
PUT /tasks/:id: Update a task (for marking subtasks as complete, etc.).
DELETE /tasks/:id: Delete a task.
Using the Extension
Load the Extension into Google Chrome:

Key Components
Task List: Displays all tasks and allows you to view, edit, or delete them.


Subtask Management: Each task contains subtasks with checkboxes. When all subtasks are checked, the task is marked as complete.


Task Timer: You can start or pause a timer for each task, and track the remaining time.


Mark Task as Complete: Click the "Complete Task" button to check all subtasks and automatically complete the task.


