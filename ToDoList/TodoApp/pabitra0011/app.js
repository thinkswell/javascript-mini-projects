
const AddBtn = document.querySelector(".add-btn");
const DeleteBtns = document.querySelectorAll(".delete-icon");
const EditBtn = document.querySelectorAll(".edit-icon");
const AllClear = document.querySelector(".clr-btn");

const Alert = document.querySelector(".alert");
const TaskList = document.querySelector(".task-list");
const inputTxt = document.getElementById("text-input");
const taskContain = document.querySelectorAll(".task-container");


let rowId = 0;

let taskItems = [];
let id = 1;

function createElement() {

  const ipVal = inputTxt.value

  let element = document.createElement('article');
  element.classList.add("task-container");

  element.innerHTML = `  <div class="task-content">
     <input onClick="completedTask(this)" type="checkbox" value="check">
       <p> ${ipVal} </p>
      </div>
     <div class="icons">
     <span onClick="editPost(this)" class=" edit-icon material-symbols-outlined">
         border_color
       </span>
        <span onClick="deletePost(this)" class=" delete-icon material-symbols-outlined">
         delete
      </span>
       </div> `;
  if (ipVal === "") {
    warningAlert("Please Enter a Value 🤦‍♂️🤦‍♀️!");
    return;
  }


  TaskList.appendChild(element);
  if (AddBtn.textContent === "Add") {
    successAlert("Task Added Sucessfully 😍!")
  } else {
    successAlert("Task Edited Success!😎")
  }

  inputTxt.value = "";
  AddBtn.textContent = "Add"
}

let deletePost = (e) => {
  if (confirm("Are you Sure about it!!!") === false) {
    return;
  }
  else {
    e.parentElement.parentElement.remove();
    warningAlert("Task Deleted sucessfully⛔")
  }

}
let editPost = (e) => {
  inputTxt.value = e.parentElement.previousElementSibling.lastElementChild.innerHTML;
  AddBtn.innerHTML = "Edit";
  e.parentElement.parentElement.remove();
};

let completedTask = (e) => {
  e.parentElement.parentElement.classList.toggle("complete");
  e.parentElement.classList.toggle("txt-line");
  if (e.parentElement.classList.contains("txt-line") === true) {
    successAlert("Hurry! You complete your task!🎉")
  }

}

AllClear.addEventListener('click', (e) => {
  let val = e.currentTarget.previousElementSibling.innerHTML;
  if (val === "") {
    warningAlert("there is nothis in the list!")
  }
  else {
    e.currentTarget.previousElementSibling.innerHTML = "";
    successAlert("all tasks Clear sucessfully!");
  }
})
function successAlert(txt) {
  Alert.textContent = txt;
  Alert.style.color = "green";
  setTimeout(function () {
    Alert.textContent = "";
  }, 1500)
}
function warningAlert(txt) {
  Alert.textContent = txt;
  Alert.style.color = "red";
  setTimeout(function () {
    Alert.textContent = "";
  }, 2000)
}

AddBtn.addEventListener('click', createElement);

const profile = document.querySelector(".profile");

setInterval(setprofile, 1000);
function setprofile() {
  profile.classList.toggle("profile-hide")
}
