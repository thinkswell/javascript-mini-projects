"use strict";

let questions = [];
let answers = [];
let questionDisplayed = [];
let hidden = [];
let answersMode;

let answerColor = "#bf415d";
let questionColor = "#4089be";

let cards;

function turn(id) {
  questionDisplayed[id] = !questionDisplayed[id];

  if(questionDisplayed[id]) {
    cards[id].style.backgroundColor = questionColor;
    cards[id].querySelector("p").innerHTML = questions[id];
  } else {
    cards[id].style.backgroundColor = answerColor;
    cards[id].querySelector("p").innerHTML = answers[id];
  }
}

function generate() {
  document.querySelector("#content").innerHTML = "";

  cards = 0;
  questionDisplayed = [];

  for(let i = 0; i < questions.length; i++) {
    if(hidden[i]) {
      continue;
    }

    if(!answersMode) {
      document.querySelector("#content").innerHTML += `<div class="flashcard" onclick="turn(` + i + `);">
                                                       <p>` + questions[i]  + `</p>
                                                       </div>`;
      questionDisplayed[i] = true;
    } else {
      document.querySelector("#content").innerHTML += `<div class="flashcard" onclick="turn(` + i + `);" style="background-color:` + answerColor + `;">
                                                       <p>` + answers[i]  + `</p>
                                                       </div>`;
      questionDisplayed[i] = false;
    }
  }

  cards = document.querySelectorAll(".flashcard");
}

function switchTab(tab) {
  if(tab == 0) {
    let checkBoxes = document.querySelectorAll(".hidden");

    for(let i = 0; i < checkBoxes.length; i++) {
      hidden[i] = checkBoxes[i].checked;
    }

    answersMode = document.querySelector("#mode").checked;
    generate();
  } else {
    showManageTable();
  }
}

function deleteFlashcard(id) {
  questions.splice(id, 1);
  answers.splice(id, 1);
  questionDisplayed.splice(id, 1);
  hidden.splice(id, 1);

  showManageTable();
}

function showManageTable() {
  document.querySelector("#content").innerHTML = `<h1>Active flashcards</h1>`;

  let theadLabels = ["Questions", "Answers", "Hidden", "", ""]

  let table = document.createElement("table");
  let thead = table.createTHead();
  let row = thead.insertRow();
  theadLabels.forEach(label => {
    let th = document.createElement("th");
    let text = document.createTextNode(label);
    th.appendChild(text);
    row.appendChild(th);
  });

  let tbody = table.createTBody();

  row = tbody.insertRow("tr");

  let td = document.createElement("td");
  td.setAttribute("colspan", 5);
  let button = document.createElement("button");
  button.setAttribute("onclick", "showAddWindow();");
  let text = document.createTextNode("Add");
  button.appendChild(text);
  td.appendChild(button);
  row.appendChild(td);

  for(let i = questions.length - 1; i >= 0; i--) {
    let row = tbody.insertRow("tr");

    let td = document.createElement("td");
    let text = document.createTextNode(questions[i]);
    td.appendChild(text);
    row.appendChild(td);

    td = document.createElement("td");
    text = document.createTextNode(answers[i]);
    td.appendChild(text);
    row.appendChild(td);

    td = document.createElement("td");
    let checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("class", "hidden");
    if(hidden[i]) {
      checkBox.setAttribute("checked", "");
    }
    td.appendChild(checkBox);
    row.appendChild(td);

    td = document.createElement("td");
    let button = document.createElement("button");
    text = document.createTextNode("Edit");
    button.setAttribute("onclick", "showEditWindow(" + i + ");");
    button.appendChild(text);
    td.appendChild(button);
    row.appendChild(td);

    td = document.createElement("td");
    button = document.createElement("button");
    button.setAttribute("onclick", "deleteFlashcard(" + i + ");")
    text = document.createTextNode("Delete");
    button.appendChild(text);
    td.appendChild(button);
    row.appendChild(td);
  }

  document.querySelector("#content").appendChild(table);

  if(answersMode) {
    document.querySelector("#content").innerHTML += `<input type="checkbox" id="mode" checked><label>Reverse mode</label>`;
  } else {
    document.querySelector("#content").innerHTML += `<input type="checkbox" id="mode"><label>Reverse mode</label>`;
  }
}

function showEditWindow(id) {
  document.querySelector("#window").innerHTML = `<label>Question</label><input type="text" id="question" value="` + questions[id] + `"><br>
                                                 <label>Answer</label><input type="text" id="answer" value="` + answers[id] + `"><br>
                                                 <button onclick="editFlashcard(` + id + `); hideWindow();">Edit</button>`;

  document.querySelector("#shade").style.visibility = "visible";
  document.querySelector("#window").style.visibility = "visible";
}

function showAddWindow() {
  document.querySelector("#window").innerHTML = `<label>Question</label><input type="text" id="question"><br>
                                                 <label>Answer</label><input type="text" id="answer"><br>
                                                 <button onclick="addFlashcard(); hideWindow();">Add</button>`;

  document.querySelector("#shade").style.visibility = "visible";
  document.querySelector("#window").style.visibility = "visible";
}

function hideWindow() {
  document.querySelector("#shade").style.visibility = "hidden";
  document.querySelector("#window").style.visibility = "hidden";
  showManageTable();
}

function addFlashcard() {
  questions.push(document.querySelector("#question").value);
  answers.push(document.querySelector("#answer").value);
  questionDisplayed.push(true);
  hidden.push(false);
}

function editFlashcard(id) {
  questions[id] = document.querySelector("#question").value;
  answers[id] = document.querySelector("#answer").value;
  questionDisplayed[id] = true;
  hidden[id] = false;
}
