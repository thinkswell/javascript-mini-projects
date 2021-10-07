let arr = [];
const par = document.getElementById("main-content");
function submit() {
  let date = document.getElementById("deadline").value;
  let time = document.getElementById("time").value;
  let task = document.getElementById("taskName").value;
  let item = { date: date, time: time, task: task };
  arr = [...arr, item];
  console.log(arr);
  let dbox = document.createElement("div");
  dbox.setAttribute("class", "dbox row text-center rounded");
  let dboxp = document.createElement("p");
  dboxp.setAttribute("class", "dboxp col-12");
  let dboxt = document.createElement("span");
  dboxt.setAttribute("class", "dboxt col-lg-7");
  let dboxc = document.createElement("span");
  dboxc.setAttribute("class", "dboxc col-lg-5");
  let remove = document.createElement("div");
  let removeBtn = document.createElement("button");
  remove.setAttribute("class", "text-end");
  removeBtn.setAttribute("class", "removeBtn btn");
  par.appendChild(dbox);
  dbox.appendChild(dboxp);
  dbox.appendChild(dboxt);
  dbox.appendChild(dboxc);
  dbox.appendChild(remove);
  remove.appendChild(removeBtn);
  dboxp.textContent = `Task : ${task}`;
  dboxt.textContent = `Deadline : ${date}`;
  dboxc.textContent = `Time : ${time}`;
  removeBtn.textContent = "Remove";
  function removeTask() {
    dbox.remove();
  }
  removeBtn.addEventListener("click", removeTask);
  document.getElementById("taskName").value =document.getElementById("taskName").defaultValue;
  document.getElementById("deadline").value=document.getElementById("deadline").defaultValue;
  document.getElementById("time").value=document.getElementById("time").defaultValue;
}

const btn = document.getElementById("submitBtn");
btn.addEventListener("click", submit);
