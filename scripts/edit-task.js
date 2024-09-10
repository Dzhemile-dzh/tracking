document.addEventListener('DOMContentLoaded', async () => {
  // Get the task ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get('id');

  console.log('Task ID:', taskId); // Debugging: Check if taskId is correct

  const form = document.getElementById('editTaskForm');
  const subtasksContainer = document.getElementById('subtasks');

  if (!taskId) {
    alert('No task ID provided.');
    return;
  }

  try {
    // Fetch the task data based on the task ID
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
    const task = await response.json();

    console.log('Fetched Task:', task); // Debugging: Check the fetched task

    // Populate the form fields with the task data
    document.getElementById('taskTitle').value = task.title || '';
    document.getElementById('taskDescription').value = task.description || '';
    document.getElementById('taskTime').value = task.time || '';

    subtasksContainer.innerHTML = task.subtasks.map((subtask, index) => `
      <div class="subtask-container">
        <label>Subtask ${index + 1}: <input type="text" class="subtask" value="${subtask || ''}"></label>
        <input type="hidden" class="completedSubtask" value="${task.completedSubtasks[index] || false}">
      </div>
    `).join('');

    // Add new subtask functionality
    document.getElementById('addSubtask').addEventListener('click', () => {
      const subtaskDiv = document.createElement('div');
      subtaskDiv.classList.add('subtask-container');
      subtaskDiv.innerHTML = `
        <label>Subtask: <input type="text" class="subtask"></label>
        <input type="hidden" class="completedSubtask" value="false">
      `;
      subtasksContainer.appendChild(subtaskDiv);
    });

    // Handle form submission and update the task
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Collect updated task data from the form
      const title = document.getElementById('taskTitle').value;
      const description = document.getElementById('taskDescription').value;
      const time = document.getElementById('taskTime').value;

      const subtasks = Array.from(document.querySelectorAll('.subtask')).map(input => input.value).filter(value => value.trim() !== '');
      const completedSubtasks = Array.from(document.querySelectorAll('.completedSubtask')).map(input => input.value === 'true');

      try {
        // Send PUT request to update the task
        const updateResponse = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, description, time, subtasks, completedSubtasks })
          
        });

        if (updateResponse.ok) {
          alert('Task updated successfully!');
          window.location.href = 'tasks.html'; // Redirect to tasks list after success
        } else {
          throw new Error('Failed to update task');
        }
      } catch (error) {
        console.error('Error updating task:', error);
      }
    });
  } catch (error) {
    console.error('Error fetching task:', error);
  }
});
