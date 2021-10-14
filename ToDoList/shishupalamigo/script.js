function main() {
    const main = document.querySelector(".main");
    let todoInput = document.querySelector("#input");
    let rootElm = document.querySelector(".list");
  
    let allItems = document.querySelector(".all-items");
    let activeItems = document.querySelector(".active-items");
    let completedItems = document.querySelector(".completed-items");
    let clearCompleted = document.querySelector(".clear-completed");
    let leftItemsCount = document.querySelector(".count");
  
    let allTodos = JSON.parse(localStorage.getItem("todos")) || [];
  
    let buttonMode = 'allItems';
    function updateActiveButton(btn = "allItems") {
      allItems.classList.remove("selected");
      activeItems.classList.remove("selected");
      completedItems.classList.remove("selected");
  
      buttonMode = btn;
      if (btn === "allItems") {
        allItems.classList.add("selected");
      } else if (btn === "activeItems") {
        activeItems.classList.add("selected");
      } else if (btn === "completedItems") {
        completedItems.classList.add("selected");
      }
    }
    updateActiveButton();
  
    function filterActive() {
      let allTodoLeft = [];
      allTodos.filter((todo) => {
        if (todo.isDone === false) {
          allTodoLeft.push(todo);
        }
      });
      updateActiveButton("activeItems");
      return createUI(allTodoLeft);
    }
  
    function count() {
      let allTodoLeft = [];
  
      allTodos.filter((todo) => {
          if (todo.isDone === false) {
            allTodoLeft.push(todo);
          }
        });
      
      return allTodoLeft.length;
    }
  
    leftItemsCount.innerText =
      count() + ` ${+count() < 2 ? "item" : "items"} left`;
  
    function filterCompleted() {
      let completedTodos = [];
      allTodos.filter((todo) => {
        if (todo.isDone === true) {
          completedTodos.push(todo);
        }
      });
      updateActiveButton("completedItems");
      return createUI(completedTodos);
    }
  
    function allTodosFilter() {
      updateActiveButton();
      createUI(allTodos);
    }
  
    function inputHandler(event) {
      event.preventDefault();
      let todo = {
        name: event.target.value,
        time: Date.now(),
        isDone: false,
      };
      if (event.keyCode === 13 && event.target.value !== "") {
        allTodos.push(todo);
        createUI(allTodos);
        todoInput.value = "";
        let leftTodoCount = allTodos.filter(todo => !todo.isDone).length;
        leftItemsCount.innerText = `${
          leftTodoCount + ` ${+leftTodoCount < 2 ? "item" : "items"} left`
        } `;
        localStorage.setItem("todos", JSON.stringify(allTodos));
      }
    }
    function deleteTodo(id) {
      const remainingTodo = allTodos.filter(todo => todo.time !== id);
      createUI(remainingTodo);
      allTodos = remainingTodo;
      leftItemsCount.innerText =
        count() + ` ${+count() < 2 ? "item" : "items"} left`;
  
      localStorage.setItem("todos", JSON.stringify(remainingTodo));
      updateActiveButton();
      createUI(allTodos);
    }
    function deleteCompletedTodo() {
      allTodos = allTodos.filter((todo) => !todo.isDone);
      createUI(allTodos);
      leftItemsCount.innerText =
        count() + ` ${+count() < 2 ? "item" : "items"} left`;
      localStorage.setItem("todos", JSON.stringify(allTodos));
      updateActiveButton();
      createUI(allTodos);
    }
  
    function handleChange(event) {
      let todoId = event.target.id;
      const currentTodo = allTodos.find(todo => todo.time === +todoId);
      currentTodo.isDone = !currentTodo.isDone;
  
      leftItemsCount.innerText =
        count() + ` ${+count() < 2 ? "item" : "items"} left`;
  
      localStorage.setItem("todos", JSON.stringify(allTodos));
      createUI(allTodos);
    }
  
    todoInput.addEventListener("keyup", inputHandler);
  
    function createUI(allTodos = []) {
      rootElm.innerHTML = "";
      let allTodoLeft = [];
  
      if(buttonMode === 'allItems') {
          allTodoLeft = allTodos;
      } else if(buttonMode === 'activeItems') {
          allTodos.filter(todo => !todo.isDone && allTodoLeft.push(todo));
      } else if(buttonMode === 'completedItems') {
          allTodos.filter(todo => todo.isDone && allTodoLeft.push(todo));
      }
  
      allTodoLeft.forEach((todo, i) => {
          let li = document.createElement("li");
          li.classList.add("list-items");
          let label = document.createElement("label");
          label.for = todo.time;
          let checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = todo.time;
          checkbox.checked = todo.isDone;
          checkbox.classList.add("checkbox");
          checkbox.addEventListener("change", handleChange);
          label.append(checkbox);
  
          let span = document.createElement("span");
          span.classList.add("todo-name");
          span.innerText = todo.name;
          span.id = todo.time;
          let editBtn = document.createElement("span");
          editBtn.innerHTML = `<i class="fas fa-pen"></i>`;
          editBtn.classList.add("edit");
          span.append(editBtn);
                    
          todo.isDone ? li.style.borderBottom = "2px dotted green" : "";

          todo.isDone ? span.style.color = "lightgreen" : "";
          todo.isDone ? span.style.textDecoration = "line-through 1px rgb(2, 32, 37)" : "";
          
          editBtn.addEventListener("click", (event) => {
            let updateInput = document.createElement("input");
            updateInput.classList.add("update-box");

            todo.isDone ? li.style.borderBottom = "2px dotted green" : "";
            todo.isDone ? updateInput.style.color = "lightgreen" : "";
            todo.isDone ? span.style.textDecoration = "line-through 1px rgb(2, 32, 37)" : "";
            updateInput.type = "text";
            updateInput.value = span.innerText;
            span.style.display = "none";
            label.append(updateInput);
            updateInput.addEventListener("keyup", (event) => {
              if (event.keyCode === 13) {
                if (event.target.value !== "") {
                    span.innerText = event.target.value;
                    span.style.display = "inline";
                    updateInput.style.display = "none";
                    todo.name = event.target.value;
                    createUI(allTodos);
                    localStorage.setItem("todos", JSON.stringify(allTodos));
                } else {
                    alert("TODO can not be Empty!");
                } 
             }
            });
          });
  
         
          let closeSpan = document.createElement("span");
          closeSpan.innerText = "❌";
          closeSpan.classList.add("close");
          closeSpan.setAttribute("data-id", todo.time);
  
          li.append(label, span, closeSpan);
          rootElm.append(li);
  
          closeSpan.addEventListener("click", () => deleteTodo(todo.time));
        });
    }
  
    createUI(allTodos);
  
    allItems.addEventListener("click", allTodosFilter);
    activeItems.addEventListener("click", filterActive);
    clearCompleted.addEventListener("click", deleteCompletedTodo);
    completedItems.addEventListener("click", filterCompleted);
  
  }
  
  main();
  