// sidebar.js

export function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarTitle = document.getElementById('sidebarTitle');
    const sidebarDescription = document.getElementById('sidebarDescription');
    const subtasksList = document.getElementById('subtasksList');
    const taskProgress = document.getElementById('taskProgress');
    const timeEstimate = document.getElementById('timeEstimate');
    const startPauseBtn = document.getElementById('startPauseBtn');
    const closeSidebar = document.getElementById('closeSidebar');
    let timer = null;

    // Function to populate sidebar with task details
    function showTaskDetails(task) {
        sidebarTitle.textContent = task.title;
        sidebarDescription.textContent = task.description;
        timeEstimate.textContent = `${task.time} minutes`;

        // Populate progress bar
        const completedSubtasks = task.completedSubtasks.filter(Boolean).length;
        const totalSubtasks = task.subtasks.length;
        const completionPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
        taskProgress.value = completionPercentage;

        // Populate subtasks
        subtasksList.innerHTML = '';
        task.subtasks.forEach((subtask, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${task.completedSubtasks[index] ? 'checked' : ''} data-id="${task._id}" data-index="${index}">
                ${subtask}
            `;
            subtasksList.appendChild(li);
        });

        sidebar.style.display = 'block';
    }

    // Handle closing the sidebar
    closeSidebar.addEventListener('click', () => {
        sidebar.style.display = 'none';
    });

    // Handle Start/Pause button logic
    startPauseBtn.addEventListener('click', () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
            startPauseBtn.textContent = 'Start';
        } else {
            timer = setInterval(() => {
                console.log('Timer running...');
            }, 1000);
            startPauseBtn.textContent = 'Pause';
        }
    });

    return { showTaskDetails };
}
