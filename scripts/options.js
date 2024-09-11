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

document.getElementById('openOptions').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/check-session', {
            credentials: 'include'
        });

        if (response.ok) {
            // User is logged in, redirect to tasks.html
            chrome.tabs.create({ url: chrome.runtime.getURL('tasks.html') });
        } else {
            // User is not logged in, redirect to login.html
            chrome.tabs.create({ url: chrome.runtime.getURL('login.html') });
        }
    } catch (error) {
        console.error('Error checking session:', error);
        chrome.tabs.create({ url: chrome.runtime.getURL('login.html') });
    }
});
