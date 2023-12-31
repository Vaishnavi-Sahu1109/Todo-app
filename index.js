const inputElement = document.getElementById("todo-input");
const button = document.getElementsByTagName("button")[0];
const list = document.getElementById("list");
const todoBottom = document.getElementById("todo-bottom");

const isEditing = false;
const editedTodo = "";

let todos = [];

const localTodos = JSON.parse(localStorage.getItem("todos"));

todos = localTodos || [];

todos?.forEach((element) => {
  insertTodo(element);
});

function insertTodo(element) {
  const li = document.createElement("li");
  li.innerText = element;
  li.className =
    "bg-gray-200 px-3 py-2 font-semibold rounded mb-2 flex justify-between items-center";

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML =
    "<img src='./delete.png' alt='Delete' class='w-8 h-8' />";
  deleteButton.className = "";
  deleteButton.addEventListener("click", (e) => {
    const localTodos = JSON.parse(localStorage.getItem("todos"));
    const filteredTodos = localTodos.filter((ele) => {
      return ele !== element;
    });

    localStorage.setItem("todos", JSON.stringify(filteredTodos));

    li.remove();
    updateTodoBottom();
  });
  li.appendChild(deleteButton);

  list.appendChild(li);
  inputElement.value = "";
  inputElement.focus();

  updateTodoBottom();
}

function handleSubmit(event) {
  event.preventDefault();

  const text = inputElement.value;
  if (!text) {
    return;
  }

  todos.push(text);
  localStorage.setItem("todos", JSON.stringify(todos));

  insertTodo(text);
}

function updateTodoBottom() {
  const numberOfTodos = list.childNodes.length;

  const pendingTask = `You have ${numberOfTodos} pending task.`;

  const p = document.createElement("p");
  p.innerText = pendingTask;

  const clearButton = document.createElement("button");
  clearButton.className =
    "px-4 py-2  flex justify-center items-center bg-purple-500 text-white rounded-md";
  clearButton.innerText = "Clear All";
  clearButton.addEventListener("click", () => {
    localStorage.removeItem("todos");
    list.innerHTML = "";
    todoBottom.classList.add("hidden");
  });

  todoBottom.innerHTML = "";
  todoBottom.classList.remove("hidden");
  todoBottom.appendChild(p);
  todoBottom.appendChild(clearButton);
}
