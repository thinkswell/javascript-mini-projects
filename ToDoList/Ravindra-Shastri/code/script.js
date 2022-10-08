
let input = document.querySelector(".input-area");

let ul = document.querySelector(".ul");

let all = document.querySelector(".all");

let active = document.querySelector(".active");

let completed = document.querySelector(".completed");

let clear = document.querySelector(".clear");


let byDefault = all;

let allToDo = JSON.parse(localStorage.getItem("todo")) || [];

function handleDelete(event) {
  let id = event.target.dataset.id;
  allToDo.splice(id, 1);
  localStorage.setItem("todo", JSON.stringify(allToDo));
  createUI();
}

function handleToggle(event) {
  let id = event.target.dataset.id;
  allToDo[id].isDone = !allToDo[id].isDone;
  localStorage.setItem("todo", JSON.stringify(allToDo));
  createUI();
}

function createUI() {
  ul.innerHTML = "";
  allToDo.forEach((todo, index) => {
    let li = document.createElement("li");
    let input = document.createElement("input");
    input.type = "checkbox";
    input.addEventListener("input", handleToggle);
    input.setAttribute("data-id", index);
    input.checked = todo.isDone;

    let p = document.createElement("p");
    p.innerText = todo.eventName;
    
    p.addEventListener("dblclick", (event) => {
      let input2 = document.createElement("input");
      input2.value = p.innerText;
      input.style.display = "none";
      span.style.display = "none";
      p.style.display = "none";
      input2.style.padding = "0.5rem 0rem";
      input2.style.fontSize = "1.25rem";
      
      
      li.append(input2);

      let submit = document.createElement("button");
      submit.innerText = "Submit";
      submit.style.padding = "0.75rem 1rem";
      submit.style.fontWeight = "700";
      li.append(submit);

      submit.addEventListener("click", (event) => {
        p.innerText = input2.value;

        li.prepend(input);
        li.append(p);
        li.append(span)
        input.style.display = "block";
        p.style.display = "block";
        span.style.display = "block";
        todo.eventName = input2.value;

        input2.style.display = "none";
        submit.style.display = "none";
      })
    })

    if (input.checked === true) {
      p.style.textDecoration = "line-through";
    } else {
      p.style.textDecoration = "none";
    }

    active.addEventListener("click", (event) => {
      if (input.checked === false) {
        li.style.display = "flex";
      } else {
        li.style.display = "none";
      }
      byDefault = "active";
      updateActiveButton();
    });

    completed.addEventListener("click", (event) => {
      if (input.checked === false) {
        li.style.display = "none";
      } else {
        li.style.display = "flex";
      }
      byDefault = "completed";
      updateActiveButton();
    });

    let span = document.createElement("span");
    span.innerText = "❌ ";
    span.setAttribute("data-id", index);
    span.addEventListener("click", handleDelete);

    li.append(input, p, span);
    ul.append(li);
  });
}

input.addEventListener("keyup", (event) => {
  let value = event.target.value;
  if (event.keyCode === 13 && value !== "") {
    let todo = {
      eventName: value,
      isDone: false,
    };
    allToDo.push(todo);
    event.target.value = "";
    createUI();
    localStorage.setItem("allToDo", JSON.stringify(allToDo));
  }
  
});

all.addEventListener("click", (event) => {
  allToDo.forEach((elm) => {
    createUI(elm);
  });
  byDefault = "all";
  updateActiveButton();
});

clear.addEventListener("click", () => {
  allToDo = allToDo.filter((todo) => !todo.isDone);
  createUI();
  byDefault = "clear";
  updateActiveButton();
  localStorage.setItem("todo", JSON.stringify(allToDo));

});

function updateActiveButton(btn = byDefault) {
  all.classList.remove("selected");
  active.classList.remove("selected");
  completed.classList.remove("selected");
  clear.classList.remove("selected");

  if (btn === "all") {
    all.classList.add("selected")
  }
  
 if (btn === "active") {
    active.classList.add("selected");
  }
  
  if (btn === "completed") {
    completed.classList.add("selected");
  }
 if(btn === "clear") {
    clear.classList.add("selected");
  } 

}
updateActiveButton();
//----------------------------------------// 

let timer = document.querySelector('.timer');

setInterval(showTime, 1000);
function showTime() {
	let time = new Date();
	let hour = time.getHours();
	let min = time.getMinutes();
	let sec = time.getSeconds();
	am_pm = "AM";

	if (hour > 12) {
		hour -= 12;
		am_pm = "PM";
	}
	if (hour == 0) {
		hr = 12;
		am_pm = "AM";
	}

	hour = hour < 10 ? "0" + hour : hour;
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;

	let currentTime = hour + ":"
			+ min + ":" + sec + am_pm;

  timer.innerText  = currentTime;
}

showTime();


let key = document.querySelector(".command");

let description = document.querySelector(".para-cheet");

let button = document.querySelector(".cheet-btn");

function generateRandonNumber(max){
    return Math.floor(Math.random() * max);
    
}

function handleClick(){

    let randomIndex = generateRandonNumber(data.length);

    let randomShortcut = data[randomIndex] ;

    key.innerText = randomShortcut.shortcut;

    description.innerText = randomShortcut.description;
}

handleClick();


button.addEventListener("click" , handleClick)

