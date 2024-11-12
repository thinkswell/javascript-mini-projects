// Elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const clearTasksButton = document.getElementById('clearTasksButton');

// load tasks from local as it loads
document.addEventListener('DOMContentLoaded', loadTasks);

// event listener for new task
addTaskButton.addEventListener('click', addTask);

// event listener for clearing tasks
clearTasksButton.addEventListener('click', clearTasks);

// Add Task Function
function addTask() {
    const taskText = taskInput.value;

    if (taskText.trim() === '') {
        alert('Enter task');
        return;
    }

    const task = document.createElement('li');
    task.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteTask);
    task.appendChild(deleteButton);

    // Add event listener to mark task as completed
    task.addEventListener('click', completeTask);

    taskList.appendChild(task);
    saveTaskToLocalStorage(taskText);

    taskInput.value = '';
}

// Mark tasks completed Function
function completeTask(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    }
}

// Delete Task Function
function deleteTask(e) {
    const task = e.target.parentElement;
    task.remove();
    removeTaskFromLocalStorage(task.textContent.replace('Delete', '').trim());
}

// Clear Task Function
function clearTasks() {
    taskList.innerHTML = '';
    localStorage.clear();
}

// Save tasks to Local Storage
function saveTaskToLocalStorage(task) {
    let tasks = localStorage.getItem('tasks')
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from Local Storage
function removeTaskFromLocalStorage(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter((task) => task !== taskToRemove);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks and display
function loadTasks() {
    const tasks = localStorage.getItem('tasks')
        ? JSON.parse(localStorage.getItem('tasks'))
        : [];

    tasks.forEach((taskText) => {
        const task = document.createElement('li');
        task.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', deleteTask);
        task.appendChild(deleteButton);

        task.addEventListener('click', completeTask);

        taskList.appendChild(task);
    });
}
