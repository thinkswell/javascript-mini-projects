let INITIAL_DATA = [
  {
    id: 1,
    title: "Happy Hacktoberfest",
    description: "hacktoberfest is for everyone.",
    type: "🎨 Design",
  },
  {
    id: 2,
    title: "My first blog",
    description: "My first blog is on react fundamentals",
    type: "💰 Marketing",
  },
];

let todoList = document.querySelector(".todo-list");
const btnAdd = document.querySelector(".todo-add-task-btn");
const textArea = document.querySelector(".todo-add-box");
const inputTextArea = document.querySelector(".todo-textarea--input");
const todoBtnAdd = document.querySelector(".todo-btn--add");
const todoTitle = document.querySelector(".todo-add-title");
const todoBadge = document.querySelector(".todo-add-select-badge");
const todoBtnCancel = document.querySelector(".todo-btn--cancel");
const todoBtnDelete = document.querySelector(".todo-delete-task-btn");

btnAdd.addEventListener("click", function (e) {
  textArea.style.display = "block";
});
todoList.innerHTML = `<div>
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" stroke="#fff">
        <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
                <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
                <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>
                </path>
            </g>
</g>
</svg></div>`;
//load todolist
const loadData = function () {
  let renderHTML = "";
  INITIAL_DATA.forEach((todo) => {
    renderHTML += `<div class="todo-list--item" data-id=${todo.id}>
                            <div class="todo-list-checkbox">
                                <input type="checkbox" id="checkbox" class="todo-list--item-checkbox" value="1" unchecked >
                            </div>
                             <div>   
                                <h4 class="todo-list--item-title">${todo.title}</h4>
                                <p class="todo-list--item-description">${todo.description}</p>
                                <span class="todo-list--item-badge">${todo.type}</span>
                            </div>
                        </div>`;
  });
  todoList.innerHTML = renderHTML;
};

loadData();

//enable/disable add button
textArea.addEventListener("keyup", function (e) {
  if (inputTextArea.value.length > 10 && todoTitle.value)
    todoBtnAdd.removeAttribute("disabled");
  else {
    todoBtnAdd.setAttribute("disabled", true);
  }
});

//add new todo
let id = 3;
todoBtnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  const newTask = {
    id: id,
    title: todoTitle.value,
    description: inputTextArea.value,
    type: todoBadge.value,
  };
  //INITIAL_DATA.push(newTask);
  INITIAL_DATA = [newTask, ...INITIAL_DATA];
  console.log(INITIAL_DATA);
  textArea.style.display = "none";
  todoTitle.value = "";
  inputTextArea.value = "";
  loadData();
  id++;
});

//button Cancel
todoBtnCancel.addEventListener("click", function (e) {
  textArea.style.display = "none";
  todoTitle.value = "";
  inputTextArea.value = "";
});

//checkbox
todoList = document.querySelector(".todo-list");
todoList.addEventListener("click", function (e) {
  const listAllChecked = document.querySelectorAll(".todo-list--item-checkbox");

  // const elements = Object.values(listAllChecked).map((item) => {
  //   return item;
  // })
  // console.log(elements)
  let flag = false;
  flag = Object.values(listAllChecked).some((element) => {
    return element.checked;
  });
  // console.log(value);

  if (flag) {
    console.log(e.target.checked);
    todoBtnDelete.removeAttribute("disabled");
  }
  if (!flag) {
    todoBtnDelete.setAttribute("disabled", true);
  }
});

//delete todo
todoBtnDelete.addEventListener("click", function (e) {
  const listAllChcecked = document.querySelectorAll(
    ".todo-list--item-checkbox:checked"
  );

  listAllChcecked.forEach((e) => {
    const itemTodelete = e.closest(".todo-list--item");
    const id = itemTodelete.dataset.id;
    itemTodelete.remove();
    let index = INITIAL_DATA.map((x) => {
      return x.id;
    }).indexOf(id);

    INITIAL_DATA.splice(index, 1);
    console.log(INITIAL_DATA);
  });
  todoBtnDelete.setAttribute("disabled", true);
});
