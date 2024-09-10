document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();

    const tableBody = document.querySelector('#tasksTable tbody');

    tasks.forEach(task => {
      const row = document.createElement('tr');

      // Check if all subtasks are completed
      const allSubtasksCompleted = task.completedSubtasks.every(subtaskCompleted => subtaskCompleted);

      row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.time}</td>
        <td>
          <ul>
            ${task.subtasks.map((subtask, index) => `
              <li>
                <input type="checkbox" ${task.completedSubtasks[index] ? 'checked' : ''} data-id="${task._id}" data-index="${index}">
                ${subtask}
              </li>
            `).join('')}
          </ul>
        </td>
        <td>
          <button class="edit" data-id="${task._id}">Edit</button>
          <button class="delete" data-id="${task._id}">Delete</button>
          <button class="view-details" data-id="${task._id}">View</button>
        </td>
        <td class="completion-status">
          ${allSubtasksCompleted ? '<img src="./images/check.png" alt="Completed" width="30px" height="30px">' : 'Not Completed'}
        </td>
      `;

      tableBody.appendChild(row);
    });

    // Handle Edit, Delete, and View Details button clicks
    tableBody.addEventListener('click', (event) => {
      const button = event.target;

      const taskId = button.getAttribute('data-id');

      if (button.classList.contains('edit')) {
        // Redirect to edit page with task ID
        window.location.href = `edit-task.html?id=${taskId}`;
      } else if (button.classList.contains('delete')) {
        // Handle delete logic here
        fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'DELETE'
        })
        .then(() => button.closest('tr').remove())
        .catch(error => console.error('Error deleting task:', error));
      } else if (button.classList.contains('view-details')) {
        // Redirect to task detail page with task ID
        window.location.href = `task-detail.html?id=${taskId}`;
      }
    });

    // Handle subtask checkbox changes
    tableBody.addEventListener('change', async (event) => {
      if (event.target.type === 'checkbox') {
        const checkbox = event.target;
        const taskId = checkbox.getAttribute('data-id');
        const subtaskIndex = checkbox.getAttribute('data-index');

        try {
          const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
          const task = await response.json();

          task.completedSubtasks[subtaskIndex] = checkbox.checked;

          await fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completedSubtasks: task.completedSubtasks })
          });

          // Update the completion status based on checkbox change
          const allSubtasksCompleted = task.completedSubtasks.every(subtaskCompleted => subtaskCompleted);
          const row = checkbox.closest('tr');
          const completionStatusCell = row.querySelector('.completion-status');

          if (allSubtasksCompleted) {
            completionStatusCell.innerHTML = '<img src="../images/check.png" alt="Completed" width="30px" height="30px">';
          } else {
            completionStatusCell.textContent = 'Not Completed';
          }
        } catch (error) {
          console.error('Error updating subtask completion:', error);
        }
      }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
});
