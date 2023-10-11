"use strict";

const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const answerFeedback = document.getElementById("answer-feedback");
const nextButton = document.getElementById("next-button");
const scoreValue = document.getElementById("score-value");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20; // Initial time in seconds

const questions = [
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
    explanation: "2 + 2 equals 4.",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
    explanation: "Mars is often referred to as the Red Planet due to its reddish appearance.",
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
    explanation: "The capital of France is Paris."
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Carbon Dioxide",
    explanation: "Plants absorb carbon dioxide from the atmosphere during photosynthesis."
  },
  {
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    answer: "7",
    explanation: "There are seven continents on Earth: Asia, Africa, North America, South America, Antarctica, Europe, and Australia."
  },
  {
    question: "What is the largest mammal on Earth?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Lion"],
    answer: "Blue Whale",
    explanation: "The blue whale is the largest mammal on Earth."
  },
  {
    question: "Which element has the chemical symbol 'H'?",
    options: ["Helium", "Hydrogen", "Oxygen", "Nitrogen"],
    answer: "Hydrogen",
    explanation: "The chemical symbol 'H' stands for hydrogen."
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Korea", "Thailand"],
    answer: "Japan",
    explanation: "Japan is known as the Land of the Rising Sun."
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Jupiter",
    explanation: "Jupiter is the largest planet in our solar system."
  },
  {
    question: "Which gas makes up the majority of the Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Nitrogen",
    explanation: "Nitrogen is the most abundant gas in the Earth's atmosphere, making up about 78% of the air we breathe."
  },
  // Add more questions here
];


function startGame() {
    nextButton.style.display = "none";
    scoreValue.textContent = "0";
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionText.textContent = question.question;
    optionsContainer.innerHTML = "";

    question.options.forEach((option) => {
        const optionButton = document.createElement("button");
        optionButton.textContent = option;
        optionButton.classList.add("option-button");
        optionButton.addEventListener("click", () => checkAnswer(option, question.answer, question.explanation));
        optionsContainer.appendChild(optionButton);
    });
}

function checkAnswer(selectedOption, correctAnswer, explanation) {
    clearInterval(timer);
    if (selectedOption === correctAnswer) {
        score++;
        answerFeedback.textContent = "Correct! " + explanation;
        answerFeedback.style.color = "green";
    } else {
        answerFeedback.textContent = "Wrong! " + explanation;
        answerFeedback.style.color = "red";
    }
    scoreValue.textContent = score;
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        setTimeout(() => {
            showQuestion(questions[currentQuestionIndex]);
            startTimer();
            answerFeedback.textContent = "";
        }, 2000); // Delay before showing the next question
    } else {
        answerFeedback.textContent = `Quiz complete! Your score: ${score} / ${questions.length}`;
        nextButton.style.display = "none";
        timerElement.style.display = "none";
    }
}

function startTimer() {
    timeLeft = 20; // Reset the timer
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 0) {
            clearInterval(timer);
            checkAnswer(null, questions[currentQuestionIndex].answer, questions[currentQuestionIndex].explanation);
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerElement.textContent = `Time Left: ${timeLeft} seconds`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
    answerFeedback.textContent = "";
});

startGame();
