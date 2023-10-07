const questions = [
  {
    question: "What is (2 + 2)/2*2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "How many days do we have in a week?",
    options: ["1", "4", "7", "10"],
    answer: "7",
  },
  {
    question: "How many letters are there in the English alphabet?",
    options: ["20", "26", "100", "0"],
    answer: "26",
  },
  {
    question: "Which month of the year has the least number of days?",
    options: ["January", "March", "February", "December"],
    answer: "February",
  },
  {
    question: "Which animal is called King of Jungle?",
    options: ["Lion", "Mars", "Dog", "Elephant"],
    answer: "Lion",
  },
  {
    question: "Which is the tallest animal on the earth?",
    options: ["Giraffe", "Lion", "Monkey", "My Dad"],
    answer: "Giraffe",
  },
  {
    question: "Which festival is known as the festival of colors?",
    options: ["Diwali", "Christmas", "Holi", "New year"],
    answer: "Holi",
  },
  {
    question: "What is the top color in a rainbow?",
    options: ["Orange", "Pink", "Blue", "Red"],
    answer: "Red",
  },
  {
    question: "How many zeros are there in one hundred thousand?",
    options: ["ten", "one", "seven", "five"],
    answer: "five",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const nextButton = document.getElementById("next-button");
const resultText = document.getElementById("result-text");

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = `Question ${currentQuestionIndex + 1}: ${
    currentQuestion.question
  }`;

  optionsList.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<input type="radio" name="answer" value="${option}"> Option ${String.fromCharCode(
      65 + index
    )}: ${option}`;
    optionsList.appendChild(listItem);
  });

  nextButton.disabled = true;
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!selectedAnswer) {
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer.value === currentQuestion.answer) {
    score++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionText.textContent = "Quiz Completed!";
  optionsList.innerHTML = "";
  nextButton.style.display = "none";
  resultText.textContent = `Your Score: ${score} out of ${questions.length}`;
}

nextButton.addEventListener("click", checkAnswer);
optionsList.addEventListener("change", () => {
  nextButton.disabled = false;
});

showQuestion();
