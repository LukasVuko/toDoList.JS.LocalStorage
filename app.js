const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');

loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', addTaskToCollection);

  taskList.addEventListener('click', removeTask);

  clearBtn.addEventListener('click', clearTasks);

  filter.addEventListener('keyup', filterTasks);
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
    taskInput.value = '';
  }
}

function removeTask(e) {
  if (e.target.classList.contains('fa-remove')) {
    if (confirm('Are you sure')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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
