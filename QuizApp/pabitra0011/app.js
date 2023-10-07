
const questions = [
  {
    number: 1,
    que: "What is the capital of Cuba ?",
    ans1: "Colombia",
    ans2: "Jordan",
    ans3: "Havana",
    ans4: "Austria",
    ans: "3"
  },
  {
    number: 2,
    que: "What is the number of cuntry in the world ?",
    ans1: "197",
    ans2: "194",
    ans3: "196",
    ans4: "195",
    ans: "4"
  },
  {
    number: 3,
    que: "What is the distance between earth to sun ?",
    ans1: "170 million KM",
    ans2: "158 million KM",
    ans3: "150 million KM",
    ans4: "200 million KM",
    ans: "3"
  },
  {
    number: 4,
    que: "The great Victoria Desert is located in?",
    ans1: "Canada",
    ans2: "West Africa",
    ans3: "Australia",
    ans4: "North America",
    ans: "3"
  },
  {
    number: 5,
    que: "Which one of the five is least like the other four? BEAR - SNAKE - COW - DOG - TIGER",
    ans1: "Bear",
    ans2: "Snake",
    ans3: "Cow",
    ans4: "Dog",
    ans: "1"
  },
  {
    number: 6,
    que: " Entomology is the science that studies?",
    ans1: "Behavior of human beings",
    ans2: "Insects",
    ans3: "The origin and history of technical and scientific terms",
    ans4: "The formation of rocks",
    ans: "2",
  },
  {
    number: 7,
    que: "Golf player Vijay Singh belongs to which country?",
    ans1: "USA",
    ans2: "Fiji",
    ans3: "India",
    ans4: "UK",
    ans: "2"
  },
  {
    number: 8,
    que: "Capital of Australia?",
    ans1: "Sydney",
    ans2: "Melbourne",
    ans3: "Canberra",
    ans4: "Victoria",
    ans: "3"
  },
  {
    number: 9,
    que: "Capital of USA?",
    ans1: "New Yourk",
    ans2: "Chicago",
    ans3: "Washington,D.C.",
    ans4: "San Francisco",
    ans: "3"
  },
  {
    number: 10,
    que: "World's Richest City?",
    ans1: "New York",
    ans2: "Tokyo",
    ans3: "Hong Kong",
    ans4: "London",
    ans: "1"
  },



]

const liveScore = document.querySelector(".live-score");
const time = document.querySelector(".time");
const userName = document.querySelector(".user-name");
const massageArea = document.querySelector(".display-massage");

// buttons......
const preBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const submitBtn = document.querySelector(".submit-btn");
const cirtificateHideBtn = document.querySelector(".cancel-btn");
let question = document.querySelector(".question-section")

const cirtificate = document.querySelector(".complete");

const nameBtn = document.querySelector(".name-btn");
let name = prompt("enter your name", "");
nameBtn.addEventListener('click', () => {
  document.querySelector(".collect-name").value = name;
  nameBtn.remove();
})

let currentScore = 0;

let i = 0;

function worngansalert(msg) {
  massageArea.textContent = "OHH! Worng Answer😥";
  massageArea.style.color = "red";
}
function rightansalert() {
  massageArea.textContent = "HURRY! Correct Answer😍"
  massageArea.style.color = "green";
}


userName.textContent = `" ${name} "`;

const startUsername = document.querySelector(".start-username")
startUsername.textContent = ` Welcome ! ${name}`

const startBtn = document.querySelector(".start-btn");
const startPage = document.querySelector(".start-section");

startBtn.addEventListener('click', () => {
  startPage.classList.add("start-section-hide");
  Createquestion(questions[0].number, questions[0].que, questions[0].ans1, questions[0].ans2, questions[0].ans3, questions[0].ans4);
  console.log(name)

})


function Createquestion(number, que, ans1, ans2, ans3, ans4) {

  const newquestin = document.createElement('div');
  // console.log(newquestin)
  // newquestin.classList.add("question-section");
  newquestin.innerHTML = ` <!-- <div class="question-title"> -->
    <p class="question-title-no">${number}</p>
    <h1 class="question">👉${que}</h1>
<!-- </div> -->
<form class="answers">
   <div class="ans" id="1">
    <input class="check" type="checkbox" value="1" name="" id="">
    <label for="">${ans1}</label>
   </div>
   <div class="ans" id="2">
    <input class="check" type="checkbox" value="2" name="" id="">
    <label for="">${ans2}</label>
   </div>
   <div class="ans" id="2">
    <input class="check" type="checkbox" value="3" name="" id="">
    <label for="">${ans3}</label>
   </div>
   <div class="ans" id="2">
    <input class="check" type="checkbox" value="4" name="" id="">
    <label for="">${ans4}</label>
   </div>
</form>`

  question.appendChild(newquestin);

}

function Removequestion() {
  document.querySelector(".question-section").innerHTML = "";
}


let ansi = 0;

function Calculatescore() {
  let inputvalue;
  // let userAns =[];
  const checkip = document.getElementsByClassName('check');
  for (let i = 0; checkip[i]; i++) {
    if (checkip[i].checked) {
      inputvalue = checkip[i].value;
      break;
    }
  }
  //  console.log(inputvalue)
  let actualAns = questions[ansi++].ans;
  console.log({ actualAns, inputvalue })
  if (actualAns === inputvalue) {
    currentScore += 10;
    rightansalert();
    setTimeout(() => {
      massageArea.textContent = "";
    }, 1500);
  }
  else if (actualAns !== inputvalue) {
    worngansalert("OH! Worng Answer");
    setTimeout(() => {
      massageArea.textContent = "";
    }, 1500);
  }
  document.querySelector(".current-score").textContent = currentScore + "%";
}

//  function for citrificate showing .)))))))))))))))))))))))))))))))))))))))))))))))000000

function generateCirtificate() {

  const date = new Date();
  const yr = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const dateSec = document.querySelector(".current-date");
  const scoreSec = document.querySelector(".cirtificate-score");
  const nameSec = document.querySelector(".cirtificate-name");
  const idSec = document.querySelector(".cirtificate-id");

  // assigning values ... to cirtificate ..........
  scoreSec.textContent = currentScore + "% ";
  nameSec.textContent = name;
  idSec.textContent = " Cirtificate No: 0027ACR77290";
  dateSec.textContent = day + "/" + month + "/" + yr;

  // hide cirtificate.....
  cirtificateHideBtn.addEventListener('click', () => {
    hideCirtificate();
    restartQuiz();
  })


}

function hideCirtificate() {
  cirtificate.classList.add("complete-hide");

}
function restartQuiz() {
  currentScore = 0;
  i = 0;
}


nextBtn.addEventListener('click', () => {
  Calculatescore();


  Removequestion();
  if (i === questions.length - 1) {
    cirtificate.classList.remove("complete-hide");
    generateCirtificate();
    // console.log("ses");

  }
  i++;
  Createquestion(questions[i].number, questions[i].que, questions[i].ans1, questions[i].ans2, questions[i].ans3, questions[i].ans4);

})







