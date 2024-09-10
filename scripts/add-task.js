document.getElementById('taskForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;
  const time = document.getElementById('taskTime').value;

  const subtasks = Array.from(document.querySelectorAll('.subtask')).map(input => input.value).filter(value => value.trim() !== '');
  const completedSubtasks = new Array(subtasks.length).fill(false); // Default to all subtasks incomplete

  // Send task data to your backend
  try {
    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, time, subtasks, completedSubtasks })
    });

    // Redirect to tasks.html after successful task addition
    window.location.href = 'tasks.html';
  } catch (error) {
    console.error('Error adding task:', error);
  }
});

document.getElementById('addSubtask').addEventListener('click', function() {
  const subtaskDiv = document.getElementById('subtasks');
  const subtaskInput = document.createElement('input');
  subtaskInput.type = 'text';
  subtaskInput.className = 'subtask';
  subtaskDiv.appendChild(document.createElement('br'));
  subtaskDiv.appendChild(subtaskInput);
});
document.getElementById('openLogin').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'openLogin' });
});

document.getElementById('openRegister').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'openRegister' });
});