var form = document.querySelector("#form");
var input = document.querySelector("#input");
var todos = document.querySelector("#todos");
var allTodos = JSON.parse(localStorage.getItem("allTodos"));

if (allTodos) {
  allTodos.forEach(function loopEachToDo(todo) {
    addTodo(todo);
  });
}

form.addEventListener("submit", function handleSubmit(e) {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  var todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    var todoElement = document.createElement("li");

    if (todo && todo.completed) {
      todoElement.classList.add("completed");
    }

    todoElement.innerText = todoText;

    todoElement.addEventListener("click", function handleClick() {
      todoElement.classList.toggle("completed");
      updateLocalStorage();
    });

    todoElement.addEventListener("contextmenu", function handleRightClick(e) {
      e.preventDefault();
      todoElement.remove();
      updateLocalStorage();
    });

    todos.appendChild(todoElement);

    input.value = "";

    updateLocalStorage();
  }
}

function updateLocalStorage() {
  var todosElement = document.querySelectorAll("li");
  var allTodos = [];
  todosElement.forEach(function loopTodosElement(todoElement) {
    allTodos.push({
      text: todoElement.innerText,
      completed: todoElement.classList.contains("completed"),
    });
  });
  localStorage.setItem("allTodos", JSON.stringify(allTodos));
}
