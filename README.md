# Task Tracking Extension

<a name="project-description"></a>
## Project Description
This project is a task tracking application that runs on a Node.js server and is used as a Google Chrome extension. It allows users to manage tasks, track subtasks, and monitor completion progress.

<a name="features"></a>
## Features
- Task Management
- Subtask Management
- Progress Tracking
- Task Timer
- Mark Task as Complete

<a name="getting-started"></a>
## Getting Started

<a name="prerequisites"></a>
### Prerequisites
- Node.js installed.
- MONGO DB Atlas Cloud used as a DB 

<a name="project-setup"></a>
### Project Setup

1. Clone the repository:
   git clone https://github.com/your-repo/task-tracking-extension.git
   cd task-tracking-extension

2. Install dependencies:
   npm install

3. Run the project:
   node server.js

<a name="api-endpoints"></a>
### API Endpoints

- GET /tasks: Fetch all tasks.
- GET /tasks/:id: Fetch a specific task.
- PUT /tasks/:id: Update a task.
- DELETE /tasks/:id: Delete a task.
- /login
- /register
- /logout

<a name="using-extension"></a>
### Using the Extension

1. Load the Extension in Chrome:
   - Open Chrome and navigate to chrome://extensions/.
   - Enable Developer mode.
   - Click Load unpacked and select the project folder.

2. Interact with the Extension:
   - Click the extension icon in the toolbar to open the task tracker.

<a name="project"></a>
## Project
![Alt text](project-images/6-login.png)
![Alt text](project-images/7-register.png)
![Alt text](project-images/1-extension.png)
![Alt text](project-images/2-all-tasks.png)
![Alt text](project-images/3-detailed-view.png)
![Alt text](project-images/4-edit-task.png)
![Alt text](project-images/5-add-task.png)

<a name="author"></a>
## Author
- Dzhemile Ahmed - <a href="https://github.com/Dzhemile-dzh">GitHub Profile</a>
