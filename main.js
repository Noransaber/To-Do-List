var taskInput = document.getElementById('editor');
var addButton = document.getElementsByClassName('add-task')[0]; // Access the first element in the collection
var TaskContainer = document.getElementsByClassName('task-card')[0]; // Access the first element in the collection

// var incompleteTasksHolder = document.getElementById('incomplete-tasks'); //incomplete-tasks
//var completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks
//var pinnedTasksHolder = document.getElementById('pinned-tasks'); //pinned-tasks

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

  row.appendChild(card);
  card.appendChild(cardParagraph);
  card.appendChild(cardIcons);
  card.appendChild(deleteButton);
  card.appendChild(editButton);
  card.appendChild(deleteButton);
  card.appendChild(favButton);
  card.appendChild(checkButton);
  return row;
};

addButton.onclick = function () {
  console.log('Add task...');
  var mode = addButton.getAttribute('data-mode');
  modal.style.display = 'none';
  var taskContent = document.querySelector('.ql-editor').innerHTML;
  var row = createNewTaskElement(taskContent);
  TaskContainer.appendChild(row);
  quill.setText('');
};
