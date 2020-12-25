// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();
// Load all event listeners
function loadEventListeners() {
  // add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);

  // Clear all tasks
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Add Task
function addTask(e) {
  if (!taskInput.value) {
    alert('Add Task');
  } else {
    // Create li element
    const li = document.createElement('li');
    // Add class 'collection-item'
    li.className = 'collection-item';
    // Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html class="fa fa-remove"
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li
    li.appendChild(link);

    // Append the li to the ul
    taskList.appendChild(li);

    // Clear input
    taskInput.value = '';
  }

  e.preventDefault();
}
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }

  e.preventDefault();
}

// Clear all tasks
function clearTasks() {
  // taskList.innerHTML = '';
  // Faster way
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  //  other way to clear tasks
  // let lis = document.querySelectorAll('.collection-item');
  // lis.forEach((li) => {
  //   taskList.removeChild(li);
  // });
}
// Filter Tasks
function filterTasks(e) {
  let text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
