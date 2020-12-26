// Define DOM vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

// Load all event listeners
loadEventListeners();

// DOM load event
document.addEventListener('DOMContentLoaded', getTasks);

function loadEventListeners() {
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  filter.addEventListener('keyup', filterTasks);
  clearBtn.addEventListener('click', clearTasks);
}
// Tasks checker
function checkTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

// Get existing tasks
function getTasks() {
  checkTasks().forEach((task) => {
    createTaskLi(task);
  });
}

// Create HTML Node (li element for task) and append it to the taskList
function createTaskLi(task) {
  // Create li element
  const li = document.createElement('li');
  // Add class 'collection-item'
  li.className = 'collection-item';
  // Create text node and append it to the li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class 'delete-item secondary-content'
  link.className = 'delete-item secondary-content';
  // Add icon html class="fa fa-remove"
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to the li
  li.appendChild(link);

  // Append li to the ul (taskList)
  taskList.appendChild(li);
}
// Add task
function addTask(e) {
  const taskItem = taskInput.value;
  if (!taskItem || taskItem == 0) {
    alert('Create Task');
    return;
  }

  createTaskLi(taskItem);
  // Add task to LS
  addTaskToLocalStorage(taskItem);
  // Clear input
  taskInput.value = '';

  e.preventDefault();
}
// Remove Task
function removeTask(e) {
  let task = e.target.parentElement.parentElement.textContent;
  console.log('task:', task);
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }

  removeTaskFromLS(task);
  // Clear LS
  checkTasks().length === 0 ? clearLS() : checkTasks().length;

  e.preventDefault();
}
// Filter Tasks
function filterTasks(e) {
  let text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
// Clear all tasks
function clearTasks() {
  if (confirm('Are you sure you want to remove all tasks permanently?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    clearLS();
  }
}
// Add task to the local storage
function addTaskToLocalStorage(task) {
  let tasks = checkTasks();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove task from the local storage
function removeTaskFromLS(taskItem) {
  let tasks = checkTasks();
  tasks.forEach((task, index) => {
    if (taskItem === task) {
      tasks.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
}
// Clear LS
function clearLS() {
  localStorage.clear();
}
