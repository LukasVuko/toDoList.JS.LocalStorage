const taskInput = document.querySelector('#task');
const form = document.querySelector('#task-form');
const clearBtn = document.querySelector('clear-tasks');
const filter = document.querySelector('filter');
const taskList = document.querySelector('.collection');

form.addEventListener('submit', addTaskToCollection);

function addTaskToCollection(e) {
  e.preventDefault();

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  taskList.appendChild(li);
  taskInput.value = '';
  e.preventDefault();
}
