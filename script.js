const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const filterOption = document.querySelector(".filter-todo");

document.getElementById("year").textContent = new Date().getFullYear();

// Event Listeners
document.addEventListener("DOMContentLoaded", loadTodosFromLocal);
addButton.addEventListener("click", addTodo);
todoList.addEventListener("click", handleTodoAction);
filterOption.addEventListener("change", filterTodos);

// Add a new todo
function addTodo(event) {
  event.preventDefault();

  if (todoInput.value.trim() === "") return; // Prevent adding empty todos

  const todoDiv = createTodoElement(todoInput.value);
  todoList.appendChild(todoDiv);

  saveTodoToLocal(todoInput.value);
  todoInput.value = ""; // Clear input field
}

// Create a todo element
function createTodoElement(text) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.textContent = text;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = "✔";
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = "✖";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  return todoDiv;
}

// Handle complete and delete actions
function handleTodoAction(event) {
  const item = event.target;

  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    todo.classList.add("slide");
    removeTodoFromLocal(todo.children[0].innerText);
    todo.addEventListener("transitionend", () => todo.remove());
  }

  if (item.classList.contains("complete-btn")) {
    item.parentElement.classList.toggle("completed");
  }
}

// Filter todos based on selection
function filterTodos(event) {
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    if (todo.nodeType === 1) { // Ensure it's an element node
      switch (event.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          todo.style.display = todo.classList.contains("completed") ? "flex" : "none";
          break;
        case "uncompleted":
          todo.style.display = !todo.classList.contains("completed") ? "flex" : "none";
          break;
      }
    }
  });
}

// Save todo to local storage
function saveTodoToLocal(todo) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos from local storage
function loadTodosFromLocal() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todoText => {
    const todoDiv = createTodoElement(todoText);
    todoList.appendChild(todoDiv);
  });
}

// Remove todo from local storage
function removeTodoFromLocal(todoText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter(todo => todo !== todoText);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}
