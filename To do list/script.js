const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodos);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodos);

function addTodos(event) {
    event.preventDefault(); // Prevent form from submitting

    const todoDiv = document.createElement('div'); // Create a div
    todoDiv.classList.add('todo'); // Add a class to the div

    const newTodo = document.createElement('li'); // Create a list item
    newTodo.innerText = todoInput.value; // Add the value of the input to the list item
    newTodo.classList.add('todo-item'); // Add a class to the list item
    todoDiv.appendChild(newTodo); // Append the list item to the div

    // ADDING TO LOCL STROAGE
    saveLocalTodos(todoInput.value); // Save the todo to local storage

    const completedButton = document.createElement('button');
    completedButton.innerHTML = 'add'; // Add text to the completed button
    completedButton.classList.add('complete-btn');  // Add a class to the completed button
    todoDiv.appendChild(completedButton);   // Append the completed button to the todoDiv 

    const trashButton = document.createElement('button'); // Create a button
    trashButton.innerHTML = 'delete'; // Add text to the trash button
    trashButton.classList.add('trash-btn'); // Add a class to the trash button
    todoDiv.appendChild(trashButton); // Append the trash button to the todoDiv

    todoList.appendChild(todoDiv); // Append the todoDiv to the todoList
    todoInput.value = ''; // Clear the input value
}

function deleteCheck(e) {
    const item = e.target; // Get the target of the event

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement; // Get the parent element
        todo.classList.add('slide'); // Animation // CSS class (slide) is added to the todo
        removeLocalTodos(todo); // Remove from local storage
        todo.addEventListener('transitionend', function () {
            todo.remove(); // Remove the todo from the list
        });
    }

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement; // Get the parent element
        todo.classList.toggle('completed'); // Toggle the class
    }
}

function filterTodos() {
    const todos = todoList.childNodes; // Get all the todos
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
            todo.style.display = 'flex';
            break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex'; // Show the todo
                } else {
                    todo.style.display = 'none'; 
                }
                break;
            case 'uncompleted':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex'; 
                } else {
                    todo.style.display = 'none'; // Hide the todo
                }
                break; // Same as above but with different logic
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []; // If there are no todos, create an empty array
    } else {
        todos = JSON.parse(localStorage.getItem('todos')); // Parse the JSON string to an object
    }

    todos.push(todo); // Add the todo to the array
    localStorage.setItem('todos', JSON.stringify(todos)); // Set the array back to local storage
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos')=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div'); // Create a div
        todoDiv.classList.add('todo'); // Add a class to the div

        const newTodo = document.createElement('li'); // Create a list item
        newTodo.innerText = todo; // Add the value of the input to the list item
        newTodo.classList.add('todo-item'); // Add a class to the list item
        todoDiv.appendChild(newTodo); // Append the list item to the div

        const completedButton = document.createElement('button');
        completedButton.innerHTML = 'add';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button'); // Create a button
        trashButton.innerHTML = 'delete'; // Add text to the trash button
        trashButton.classList.add('trash-btn'); // Add a class to the trash button
        todoDiv.appendChild(trashButton); // Append the trash button to the todoDiv

        todoList.appendChild(todoDiv); // Append the todoDiv to the todoList
    });

    function removeLocalTodos(todo) {
        let todos;
        if(localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        const todoIndex = todo.children[0].innerText; // Get the text of the todo
        todos.splice(todos.indexOf(todoIndex), 1);  // Remove the todo from the array
        localStorage.setItem('todos', JSON.stringify(todos));   // Set the array back to local storage
    }
}