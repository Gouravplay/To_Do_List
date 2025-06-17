document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  // Load from localStorage
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach(todo => createTodoElement(todo.text, todo.completed));

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = todoInput.value.trim();
    if (task) {
      createTodoElement(task);
      saveTodo(task, false);
      todoInput.value = "";
    }
  });

  function createTodoElement(task, isCompleted = false) {
    const li = document.createElement("li");
    li.textContent = task;
    if (isCompleted) li.classList.add("completed");

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.classList.add("complete");
    completeBtn.onclick = () => {
      li.classList.toggle("completed");
      updateLocalStorage();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = () => {
      li.remove();
      updateLocalStorage();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(actions);
    todoList.appendChild(li);
  }

  function saveTodo(text, completed) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push({ text, completed });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function updateLocalStorage() {
    const todos = [];
    document.querySelectorAll("#todo-list li").forEach(li => {
      todos.push({
        text: li.childNodes[0].textContent,
        completed: li.classList.contains("completed")
      });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
});
