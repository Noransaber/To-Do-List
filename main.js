// Global Variables
const taskInput = document.getElementById('editor');
const addButton = document.querySelector('.add-task');
const TaskContainer = document.querySelector('.task-card');
const span = document.querySelector('.no-tasks');
const modalBtn = document.getElementById('modal-btn');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
const editButtom = document.querySelector('#edit-task');

// Quill Toolbar Options
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

// Initialize Quill
const quill = new Quill('#editor', {
  modules: { toolbar: toolbarOptions },
  theme: 'snow',
});

// Function to create a new task element
function createNewTaskElement(taskString) {
  const row = document.createElement('div');
  const card = document.createElement('div');
  const cardParagraph = document.createElement('p');
  const cardIcons = document.createElement('div');
  const deleteButton = document.createElement('i');
  const editButton = document.createElement('i');
  const favButton = document.createElement('i');
  const checkButton = document.createElement('i');
  const createdSpan = document.createElement('span');

  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  createdSpan.innerText = `Created at ${hours}:${minutes}`;

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
  card.appendChild(createdSpan);

  return row;
}

// Event Handlers
addButton.addEventListener('click', function () {
  console.log('Add task...');
  const spanToHide = document.querySelector('.no-tasks');
  spanToHide.style.display = 'none';
  modal.style.display = 'none';
  const taskContent = document.querySelector('.ql-editor').innerHTML;
  const row = createNewTaskElement(taskContent);
  TaskContainer.appendChild(row);
  quill.setText('');
});

TaskContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-eraser')) {
    const row = e.target.parentElement.parentElement;
    TaskContainer.removeChild(row);
  }
});

TaskContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-check')) {
    console.log('Task completed');
    const row = e.target.parentElement.parentElement;
    const completed = document.createElement('span');
    const card = row.querySelector('.card');
    completed.className = 'completed';
    completed.innerText = 'Completed';
    row.appendChild(completed);
  }
});

TaskContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-star')) {
    const row = e.target.parentElement.parentElement;
    const card = row.querySelector('.card');
    const star = row.querySelector('.fa-star');
    star.style.color = 'yellow';
    card.style.backgroundColor = '#59c0c6';
  }
});

TaskContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-pen-to-square')) {
    let edited = false;
    const row = e.target.parentElement;
    const text = row.querySelector('.card-paragraph').innerText;
    const addTaskButton = document.querySelector('.add-task');
    const taskContent = document.querySelector('.ql-editor');
    const p = row.querySelector('p');

    editButtom.onclick = function () {
      if (edited) {
        p.innerHTML = taskContent.innerHTML;
        quill.setText('');
        modal.style.display = 'none';
        addTaskButton.style.display = 'block';
        editButtom.style.display = 'none';
        edited = false;
      }
    };

    if (!edited) {
      quill.setText(text);
      modal.style.display = 'block';
      editButtom.style.display = 'block';
      addTaskButton.style.display = 'none';
      taskContent.innerHTML = p.innerHTML;
      taskContent.focus();
      addTaskButton.setAttribute('data-mode', 'edit');
      edited = true;
    }
  }
});

// Event listeners for modal
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
