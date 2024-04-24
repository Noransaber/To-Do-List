var taskInput = document.getElementById('editor');
var addButton = document.getElementsByClassName('add-task')[0]; // Access the first element in the collection
var TaskContainer = document.getElementsByClassName('task-card')[0]; // Access the first element in the collection
var editButton = document.getElementsByClassName('fa-pen-to-square');
var span = document.getElementsByClassName('no-tasks')[0];
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote'],
  ['link', 'image'],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ direction: 'rtl' }], // text direction
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

const quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions,
  },
  theme: 'snow',
});

// Code for popup
let modalBtn = document.getElementById('modal-btn');
let modal = document.querySelector('.modal');
let closeBtn = document.querySelector('.close-btn');
modalBtn.onclick = function () {
  modal.style.display = 'block';
};
closeBtn.onclick = function () {
  modal.style.display = 'none';
};
window.onclick = function (e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
};

// end of popup code

//New Task List Item
var createNewTaskElement = function (taskString) {
  //Create List Item
  var row = document.createElement('div');
  var card = document.createElement('div'); // checkbox
  var cardParagraph = document.createElement('p'); // text
  var cardIcons = document.createElement('div');
  var deleteButton = document.createElement('i');
  var editButton = document.createElement('i');
  var favButton = document.createElement('i');
  var checkButton = document.createElement('i');
  var createdSpan = document.createElement('span'); // Created time span

  // Set created time
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  createdSpan.innerText = 'Created at ' + hours + ':' + minutes;
  //Each element needs modifying;

  row.className = 'row';
  card.className = 'card';
  cardParagraph.className = 'card-paragraph';
  cardParagraph.innerHTML = taskString;
  cardIcons.className = 'icons';
  deleteButton.className = 'fa-solid fa-eraser';
  editButton.className = 'fa-regular fa-pen-to-square';
  favButton.className = 'fa-regular fa-star';
  checkButton.className = 'fa-solid fa-check';
  createdSpan.className = 'created-time';

  row.appendChild(card);
  card.appendChild(cardParagraph);
  card.appendChild(cardIcons);
  card.appendChild(deleteButton);
  card.appendChild(editButton);
  card.appendChild(deleteButton);
  card.appendChild(favButton);
  card.appendChild(checkButton);
  card.appendChild(createdSpan); // Append created time span
  return row;
};

// Handler clicking on add button
addButton.onclick = function () {
  console.log('Add task...');
  var mode = addButton.getAttribute('data-mode');
  var spanToHide = document.querySelector('.no-tasks');
  spanToHide.style.display = 'none'; // Change display property to 'none' to hide the span
  modal.style.display = 'none';
  var taskContent = document.querySelector('.ql-editor').innerHTML;
  var row = createNewTaskElement(taskContent);
  TaskContainer.appendChild(row);
  quill.setText('');
};
// Handle clicking on delte button
TaskContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-eraser')) {
    var row = e.target.parentElement.parentElement;
    TaskContainer.removeChild(row);
  }
});

// Handle clicking on check button
TaskContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-check')) {
    console.log('Task completed');
    var row = e.target.parentElement.parentElement;
    var completed = document.createElement('span');
    var card = document.querySelector('.card');
    completed.className = 'completed';
    completed.innerText = 'Completed';
    row.appendChild(completed);
  }
});

// Handle clicking on edit button
TaskContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-pen-to-square')) {
    var row = e.target.parentElement;
    var text = row.querySelector('.card-paragraph').innerText;
    var addTaskButton = document.getElementById('modal-btn');
    quill.setText(text);
    modal.style.display = 'block';
    addTaskButton.setAttribute('data-mode', 'edit');
    addTaskButton.setAttribute('data-task-id', row.id); // Store the ID of the task being edited
  }
});

// Handle clicking on favorite button
TaskContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-star')) {
    var row = e.target.parentElement.parentElement;
    var card = row.querySelector('.card');
    card.style.backgroundColor = '#59c0c6';
  }
});
