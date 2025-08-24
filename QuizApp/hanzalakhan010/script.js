var user = {};
var currentQuiz = "";
var currentQuestionNo = 0;
var host = "http://localhost:3000";
var maxQuestion = 10;
var score = 0;
var quizDifficulty = "";
var difficulty = {
  Easy: 10 * 60 * 1000,
  Medium: 10 * 60 * 1000,
  Hard: 5 * 60 * 1000,
  Challenge: 4 * 60 * 1000,
};

function submitQuiz() {
  document.getElementById("quizBoard").style.display = "none";
  document.getElementById("scoreBoard").style.display = "block";
  document.getElementById("uname").innerText = user.username;
  document.getElementById("quizName").innerText = `${currentQuiz} quiz`;
  document.getElementById("quizScore").innerText = `Score ${score}`;
  addToScoreBoard(currentQuiz, score, quizDifficulty);
  if (score > 7) {
    document.getElementById("advice").innerText = `Good job ${user.name}`;
  } else {
    document.getElementById("advice").innerText = "You can do better";
  }
}
function checkQuestion(userAns, correctAns) {
  if (typeof correctAns == "object") {
    for (let ans of userAns) {
      let ans_text = ans.id;
      let option = correctAns.find((matching) => matching.text == ans_text);
      let checked = ans.checked;
      if (option["isCorrect"] == checked && checked) {
        score += 1;
        break;
      }
    }
  } else {
    if (userAns == correctAns) {
      score += 1;
    }
  }
}

async function renderQuestion() {
  try {
    let res = await fetch(`${host}/${currentQuiz}/${currentQuestionNo}`);
    var data = await res.json();
  } catch {
    // fetchData().then((msg) => console.log(msg));
    var data = await fetchData(currentQuiz, currentQuestionNo);
  } finally {
    if (data) {
      document.getElementById(
        "currentQuestionNo"
      ).innerText = `Que # ${currentQuestionNo}`;
      document.getElementById("currentQuestion").innerText = data.question;
      document.getElementById("choices").innerHTML = "";
      switch (data.type) {
        case "text": {
          document.getElementById(
            "choices"
          ).innerHTML = `<input class = 'ans' id = 'ans' type = 'text'/>`;
          document.getElementById("nextQueBtn").onclick = () => {
            userAns = document.getElementById("ans").value;
            checkQuestion(userAns, data.correctAnswer);
            loadNextQuestion();
          };
          break;
        }
        case "list":
        case "radio": {
          data.options.map((option) => {
            document.getElementById("choices").innerHTML += `
              <input  id = '${option.text}' name = 'ans' type = 'radio' />
              <label for = '${option.text}' name = 'ans'>${option.text}</label>
              <br>
              `;
          });
          document.getElementById("nextQueBtn").onclick = () => {
            userAns = [...document.querySelectorAll("#choices input")];
            checkQuestion(userAns, data.options);
            loadNextQuestion();
          };
          break;
        }
        case "checkbox": {
          data.options.map((option) => {
            document.getElementById("choices").innerHTML += `
                <input  id = '${option.text}' name = 'ans' type = 'checkbox' />
                <label for = '${option.text}' name = 'ans'>${option.text}</label>
                <br>
                `;
          });
          document.getElementById("nextQueBtn").onclick = () => {
            userAns = [...document.querySelectorAll("#choices input")];
            checkQuestion(userAns, data.options);
            loadNextQuestion();
          };
          break;
        }
      }
    }
  }
}

function loadNextQuestion() {
  if (currentQuestionNo < maxQuestion) {
    // checkQuestion()
    currentQuestionNo += 1;
    renderQuestion();
  } else {
    document.getElementById("nextQueBtn").textContent = "Submit";
    document.getElementById("nextQueBtn").style.backgroundColor = "chartreuse";
    document.getElementById("nextQueBtn").onclick = () => {
      submitQuiz();
    };
  }
}

function startTImer() {
  let timerSeconds = difficulty[quizDifficulty];
  let timer = document.getElementById("timer");
  let timing = setInterval(() => {
    let deltaMinute = Math.floor(timerSeconds / (60 * 1000));
    let deltaSeconds = Math.round((timerSeconds % (60 * 1000)) / 1000);
    if (timerSeconds <= 0) {
      submitQuiz();
      clearInterval(timing);
    }
    timer.innerHTML = `${deltaMinute} : ${deltaSeconds}`;
    timerSeconds -= 1000;
  }, 1000);
}

function selectQuiz(event) {
  event.preventDefault();
  user["username"] = event.target.uname.value;
  user["name"] = event.target.name.value;
  currentQuiz = event.target.quizSelect.value;
  quizDifficulty = event.target.difficulty.value;
  if (user.username && user.name && currentQuiz) {
    document.getElementById("userDetails").style.display = "none";
    document.getElementById("quizBoard").style.display = "block";
    document.getElementById("quizTitle").textContent = currentQuiz;
    startTImer();
    loadNextQuestion();
  } else {
    alert("Please fill the form first");
  }
}

document.getElementById("choicesForm").addEventListener("submit", (event) => {
  event.preventDefault();
});
document
  .querySelector("#userDetails form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    selectQuiz(event);
  });

document.getElementById("playAgainBtn").onclick = () =>
  window.location.reload();
