var taskInput = document.getElementById('new-task'); //new-task
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); //incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks
const pinnedTasksHolder = document.getElementById('pinned-tasks'); //pinned-tasks

// For glowing text
const glowingText = (() => {
  const textElement = document.getElementById('glowing_text');
  let coloredText;
  let index = 0;

  const startGlowing = () => {
    setInterval(() => {
      const letters = textElement.textContent.split('');
      if (letters[index] == ' ') {
        index++;
      }
      letters[index] = `<span style="color: var(--glowColor); text-shadow: var(--shadowColor);">${letters[index]}</span>`;
      coloredText = letters.join('');
      textElement.innerHTML = coloredText;
      index = (index + 1) % letters.length;
    }, 500);
  };

  return startGlowing;
})();

window.addEventListener('load', glowingText, false);
// End of glowing text

//New Task List Item
var createNewTaskElement = function (taskString) {
  //Create List Item
  var listItem = document.createElement('li');

  //input (checkbox)
  var checkBox = document.createElement('input'); // checkbox
  //label
  var label = document.createElement('label');
  //input (text)
  var editInput = document.createElement('input'); // text
  //button.edit
  var editButton = document.createElement('button');
  //button.delete
  var deleteButton = document.createElement('button');
  // Creeate the pin icone
  var pinButton = document.createElement('button');

  //Each element needs modifying

  checkBox.type = 'checkbox';
  editInput.type = 'text';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';
  // pinButton.innerText = 'Pin';
  pinButton.className = 'pin fa-solid fa-map-pin';

  label.innerText = taskString;

  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  listItem.appendChild(pinButton);

  return listItem;
};

//Add a new task
var addTask = function () {
  console.log('Add task...');
  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTasksHolder
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

//Edit an existing task
var editTask = function () {
  console.log('Edit task...');

  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text');
  var label = listItem.querySelector('label');

  var containsClass = listItem.classList.contains('editMode');

  //if the class of the parent is .editMode
  if (containsClass) {
    //Switch from .editMode
    //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //Switch to .editMode
    //input value becomes the label's text
    editInput.value = label.innerText;
  }

  //Toggle .editMode on the list item
  listItem.classList.toggle('editMode');
};

// Pin a task

// Function to pin or unpin a task
function togglePinTask() {
  const listItem = this.parentNode;
  const isPinned = listItem.classList.contains('pinned-task');

  if (isPinned) {
    // If the task is already pinned, unpin it and move it
    // to the appropriate section based on completion status
    listItem.classList.remove('pinned-task');
    if (listItem.parentNode === completedTasksHolder) {
      completedTasksHolder.appendChild(listItem);
    }
  } else {
    // If the task is not pinned, pin it and move it to the top of incomplete tasks
    listItem.classList.add('pinned-task');
    incompleteTasksHolder.prepend(listItem);
  }
}

//Delete an existing task
var deleteTask = function () {
  console.log('Delete task...');
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //Remove the parent list item from the ul
  ul.removeChild(listItem);
};

//Mark a task as complete
var taskCompleted = function () {
  console.log('Task complete...');
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

//Mark a task as incomplete
var taskIncomplete = function () {
  console.log('Task incomplete...');
  //Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log('Bind list item events');
  //select taskListItem's children
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');
  var pinButton = taskListItem.querySelector('button.pin');

  //bind editTask to edit button
  editButton.onclick = editTask;

  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

  //bind pinTask to pin button
  pinButton.onclick = togglePinTask;

  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
};

//Set the click handler to the addTask function
addButton.addEventListener('click', addTask);
//addButton.addEventListener("click", ajaxRequest);

//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Bind events to existing pinned tasks
for (let i = 0; i < pinnedTasksHolder.children.length; i++) {
  bindTaskEvents(pinnedTasksHolder.children[i], taskCompleted); // Assuming pinned tasks start as completed
}
