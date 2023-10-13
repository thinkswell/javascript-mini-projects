const popup = document.getElementsByClassName("popupbackground");
        const input = document.getElementsByClassName("popupinput");
        const mainBody = document.getElementsByTagName("body");
        
        // Load existing todos from local storage on page load
        document.addEventListener("DOMContentLoaded", function () {
          loadTodos();
        });
        
        function displayPopup() {
          popup[0].classList.remove("noneDisplay");
        }
        
        function removePopup() {
          popup[0].classList.add("noneDisplay");
        }
        
        function addTodo() {
          if (input[0].value === "") {
            alert("Please enter something");
          } else {
            const todoText = input[0].value;
            const uniqueId = Date.now(); // Generate a unique ID
            const todoItem = { id: uniqueId, text: todoText };
            addTodoToLocalStorage(todoItem); // Add to local storage
            createTodoElement(todoItem); // Create a new todo element on the page
            input[0].value = "";
            removePopup();
          }
        }
        
        mainBody[0].addEventListener("click", function (e) {
          if (e.target.classList.value === "deletebutton") {
            const todoDiv = e.target.parentElement;
            const todoId = todoDiv.dataset.id; // Get the unique ID from the data attribute
            removeTodoFromLocalStorage(todoId); // Remove from local storage
            todoDiv.remove();
          }
        });
        
        function addTodoToLocalStorage(todoItem) {
          let todos = getTodosFromLocalStorage();
          todos.push(todoItem);
          localStorage.setItem("todos", JSON.stringify(todos));
        }
        
        function removeTodoFromLocalStorage(todoId) {
          let todos = getTodosFromLocalStorage();
          todos = todos.filter((todo) => todo.id !== parseInt(todoId)); // Convert to integer for comparison
          localStorage.setItem("todos", JSON.stringify(todos));
        }
        
        function loadTodos() {
          const todos = getTodosFromLocalStorage();
          todos.forEach((todoItem) => {
            createTodoElement(todoItem);
          });
        }
        
        function getTodosFromLocalStorage() {
          const todosJSON = localStorage.getItem("todos");
          return todosJSON ? JSON.parse(todosJSON) : [];
        }
        
        function createTodoElement(todoItem) {
          const div = document.createElement("div");
          const button = document.createElement("button");
          button.classList.add("deletebutton");
          button.innerHTML = "X";
          div.classList.add("EachTodo");
          div.dataset.id = todoItem.id; // Set the unique ID as a data attribute
          div.innerHTML = todoItem.text;
          div.appendChild(button);
          mainBody[0].appendChild(div);
        }