document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get('id');
  let timerInterval = null; // To store the timer interval
  let remainingTime = 0; // To track remaining time in milliseconds

  try {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
    const task = await response.json();

    document.getElementById('task-title').innerText = task.title;
    document.getElementById('task-description').innerText = task.description;

    const subtaskList = document.getElementById('subtask-list');
    subtaskList.innerHTML = task.subtasks.map((subtask, index) => `
      <li>
        <input type="checkbox" ${task.completedSubtasks[index] ? 'checked' : ''} data-index="${index}">
        ${subtask}
      </li>
    `).join('');

    const progress = calculateProgress(task);
    document.getElementById('task-progress').value = progress;
    
    // Initial time setup
    remainingTime = task.time * 60 * 60 * 1000; // Convert hours to milliseconds
    document.getElementById('time-remaining').innerText = formatTime(remainingTime);

    document.getElementById('start-pause-btn').addEventListener('click', () => handleStartPause(taskId));
    document.getElementById('complete-task-btn').addEventListener('click', () => markTaskComplete(task, taskId));

    // Back button event listener
    document.getElementById('back-btn').addEventListener('click', () => {
      history.back();
    });

    // Handle subtask checkbox changes
    subtaskList.addEventListener('change', async (event) => {
      if (event.target.type === 'checkbox') {
        const checkbox = event.target;
        const subtaskIndex = checkbox.getAttribute('data-index');
        task.completedSubtasks[subtaskIndex] = checkbox.checked;

        await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completedSubtasks: task.completedSubtasks })
        });

        // Update progress
        const newProgress = calculateProgress(task);
        document.getElementById('task-progress').value = newProgress;
      }
    });

  } catch (error) {
    console.error('Error fetching task:', error);
  }

  // Function to format time in hours, minutes, and seconds
  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  // Start/Pause time management
  function handleStartPause(taskId) {
    const btn = document.getElementById('start-pause-btn');

    if (btn.innerText === 'Start') {
      btn.innerText = 'Pause';
      startTimer();
    } else {
      btn.innerText = 'Start';
      pauseTimer();
    }
  }

  // Start the timer and decrement the remaining time
  function startTimer() {
    if (!timerInterval) {
      const startTime = Date.now();
      timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        remainingTime -= elapsed;

        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          remainingTime = 0;
          document.getElementById('time-remaining').innerText = 'Time is up!';
        } else {
          document.getElementById('time-remaining').innerText = formatTime(remainingTime);
        }
      }, 1000);
    }
  }

  // Pause the timer
  function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

// Calculate completion percentage based on subtasks
function calculateProgress(task) {
  const completed = task.completedSubtasks.filter(Boolean).length;
  const total = task.subtasks.length;
  return total === 0 ? 0 : (completed / total) * 100;
}

// Mark task as complete
async function markTaskComplete(task, taskId) {
  // Check all unchecked subtasks
  task.completedSubtasks = task.subtasks.map(() => true);

  try {
    // Update the task's completed subtasks on the server
    await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completedSubtasks: task.completedSubtasks })
    });

    // Redirect to tasks.html after marking the task as complete
    window.location.href = 'tasks.html';
  } catch (error) {
    console.error('Error marking task as complete:', error);
  }
}
