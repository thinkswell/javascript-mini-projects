async function fetchData(quiz, id) {
  let response = await fetch("data/db.json");
  let data = await response.json();
  // console.log(data)
  let quizQuestions = data?.[quiz];
  let question = quizQuestions.find((ele) => ele.id == id);
  // console.log(quizQuestions)
  return question;
}
// fetchData('Physics',1)
// .then((msg)=>console.log(msg))

function renderScoreBoard() {
  let scores = JSON.parse(localStorage.getItem("scores")) ?? [];
  table = document.getElementById("scoreTable");
  scores.forEach((score) => {
    let row = table.insertRow();
    let quizCell = row.insertCell(0);
    let scoreCell = row.insertCell(1);
    let difficultyCell = row.insertCell(2);
    quizCell.innerText = score.quizName;
    scoreCell.innerText = score.score;quizName
    difficultyCell.innerText = innerText = score.difficulty;
  });
}
function addToScoreBoard(quizName, score, difficulty) {
  let scores = JSON.parse(localStorage.getItem("scores")) ?? [];
  scores.push({ quizName, score, difficulty });
  localStorage.setItem("scores", JSON.stringify(scores));
}
