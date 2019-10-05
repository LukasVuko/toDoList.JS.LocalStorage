const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');

loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasks);

  form.addEventListener('submit', addTaskToCollection);

  taskList.addEventListener('click', removeTask);

  clearBtn.addEventListener('click', clearTasks);

  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(item => {
    task = document.createElement('li');
    task.className = 'collection-item';
    task.appendChild(document.createTextNode(item));
    // Create <a>
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    task.appendChild(link);
    taskList.appendChild(task);
  });
}

function addTaskToCollection(e) {
  e.preventDefault();
  if (taskInput.value === '') {
    return;
  } else {
    // Create <li>
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    // Create <a>
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  }
  storeTaskInLocalStorage();
  taskInput.value = '';
}

function storeTaskInLocalStorage() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(taskInput.value);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.classList.contains('fa-remove')) {
    if (confirm('Are you sure')) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    console.log(taskItem.textContent);
    console.log(task);
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const input = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(task => {
    const liText = task.innerText.toLowerCase();
    if (liText.indexOf(input) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
