document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/tasks');
        const tasks = await response.json();

        const tableBody = document.querySelector('#tasksTable tbody');

        tasks.forEach(task => {
            const row = document.createElement('tr');

            row.innerHTML = `
          <td>${task.title}</td>
          <td>${task.description}</td>
          <td>${task.time}</td>
        `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
});

document.getElementById('openOptions').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('login.html') });
});
