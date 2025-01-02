// Select elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// function to add

function addTask() {
    const taskText = taskInput.value.trim();

    if (tasktext !== '') {
        
        // Create new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Add a button to mark as done
        const doneButton = document.createElement('button');
        doneButton.textContent = 'Done';
        doneButton.onclick = function () {
            li.classList.toggle('done');
        };

        // Add button to delete the task
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'delete';
        deleteButton.onclick = function () {
            taskList.removeChild(li);
        };

        //Append button to the list item
        li.appendChild(doneButton);
        li.appendChild(deleteButton);


        // Add task to the list
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = '';
    
    }

}

// add event listener to the add task button
addButton.addEventListener(click, addTask)

// Allow pressing enter to add the task
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
    
});