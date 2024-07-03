const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const deleteAllTasksButton = document.getElementById('deleteAllTasks');
const unfinishedTasksCount = document.getElementById('unfinishedTasks');
const taskCompleteNotification = document.getElementById('taskCompleteNotification');

let tasks = [];

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        updateTasks();
        taskInput.value = '';
    }
});

function updateTasks() {
    taskList.innerHTML = '';
    let unfinishedCount = 0;
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        taskItem.innerHTML = `
${task.name}
<div>
<input type="checkbox" data-index="${index}" ${task.completed ? 'checked' : ''}>
<button class="btn btn-sm btn-danger" data-index="${index}">Delete</button>
</div>
`;
        taskItem.querySelector('input').addEventListener('change', function () {
            tasks[index].completed = this.checked;
            updateTasks();
        });

        taskItem.querySelector('button').addEventListener('click', function () {
            tasks.splice(index, 1);
            updateTasks();
        });

        taskList.appendChild(taskItem);
        if (!task.completed) {
            unfinishedCount++;
        }
    });
    unfinishedTasksCount.innerText = unfinishedCount;
    checkTaskCompletion(unfinishedCount);
}

deleteAllTasksButton.addEventListener('click', function () {
    tasks = [];
    updateTasks();
});

function checkTaskCompletion(unfinishedCount) {
    if (unfinishedCount === 0) {
        taskCompleteNotification.innerText = 'Congratulations! You have completed all tasks.';
    } else {
        taskCompleteNotification.innerText = '';
    }
}

updateTasks();