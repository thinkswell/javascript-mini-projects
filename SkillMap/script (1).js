// Game state
const gameState = {
  currentPage: "landing-page",
  currentSkill: null,
  currentQuestion: 0,
  userXP: 0,
  completedSkills: [],
  quizData: {
    html: [
      {
        type: "multiple-choice",
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language",
        ],
        correctAnswer: 0,
      },
      {
        type: "multiple-choice",
        question: "Which tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<hyperlink>"],
        correctAnswer: 1,
      },
      {
        type: "coding",
        question: 'Create a simple HTML page with a heading that says "Hello, World!"',
        starterCode: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  \n</body>\n</html>",
        validate: function (code) { 
          return (
            code.includes("<h1>Hello, World!</h1>") || 
            code.includes("<h2>Hello, World!</h2>") || 
            code.includes("<h3>Hello, World!</h3>")
          ); 
        }
      }
    ],
    css: [
      {
        type: "multiple-choice",
        question: "What does CSS stand for?",
        options: [
          "Computer Style Sheets",
          "Creative Style System",
          "Cascading Style Sheets",
          "Colorful Style Sheets",
        ],
        correctAnswer: 2,
      },
      {
        type: "multiple-choice",
        question: "Which property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "background"],
        correctAnswer: 2,
      },
      {
        type: "coding",
        question: "Write CSS to make all paragraphs have blue text and 20px font size",
        starterCode: "/* Write your CSS here */",
        validate: function(code) {
          return code.includes('color: blue') && 
                 code.includes('font-size: 20px');
        }
      }
    ],
    js: [
      {
        type: "multiple-choice",
        question: "Which of the following is a JavaScript data type?",
        options: ["String", "Boolean", "Number", "All of the above"],
        correctAnswer: 3,
      },
      {
        type: "coding",
        question: "Write a function that returns the sum of two numbers",
        starterCode: "function sum(a, b) {\n  // Write your code here\n}",
        validate: function(code) {
          return code.includes('return') && 
                 (code.includes('a + b') || code.includes('a+b'));
        }
      }
    ],
    python: [
      {
        type: "multiple-choice",
        question: "Which of these is used to define a function in Python?",
        options: ["function", "def", "define", "func"],
        correctAnswer: 1,
      }
    ],
    react: [
      {
        type: "multiple-choice",
        question: "What is JSX?",
        options: [
          "A JavaScript library",
          "A syntax extension for JavaScript",
          "A CSS framework",
          "A database technology",
        ],
        correctAnswer: 1,
      }
    ],
    node: [
      {
        type: "multiple-choice",
        question: "Node.js is built on which JavaScript engine?",
        options: ["SpiderMonkey", "V8", "Chakra", "JavaScriptCore"],
        correctAnswer: 1,
      }
    ]
  },
  userAnswers: {}
};

// DOM Elements
const pages = {
  landing: document.getElementById("landing-page"),
  skillMap: document.getElementById("skill-map-page"),
  learningLevel: document.getElementById("learning-level-page"),
  completion: document.getElementById("completion-page")
};

// Navigation functions
function showPage(pageId) {
  // Hide all pages
  Object.values(pages).forEach(page => {
    page.classList.remove("active");
  });
  
  // Show the requested page
  document.getElementById(pageId).classList.add("active");
  gameState.currentPage = pageId;
  
  // Update UI based on page
  if (pageId === "skill-map-page") {
    updateSkillMap();
  }
}

// Initialize event listeners
function initializeEventListeners() {
  // Start button
  document.getElementById("start-btn").addEventListener("click", () => {
    showPage("skill-map-page");
  });

  // Back to landing button
  document.getElementById("back-to-landing").addEventListener("click", () => {
    showPage("landing-page");
  });

  // Continue learning button
  document.getElementById("continue-learning").addEventListener("click", () => {
    showPage("skill-map-page");
  });

  // Skill nodes
  document.querySelectorAll(".skill-node").forEach(node => {
    node.addEventListener("click", function() {
      if (this.classList.contains("locked")) return;
      
      const skill = this.getAttribute("data-skill");
      gameState.currentSkill = skill;
      gameState.currentQuestion = 0;
      gameState.userAnswers[skill] = [];
      
      showPage("learning-level-page");
      loadQuestion();
    });
  });

  // Quiz navigation
  document.getElementById("next-question").addEventListener("click", nextQuestion);
  document.getElementById("prev-question").addEventListener("click", prevQuestion);
  document.getElementById("submit-quiz").addEventListener("click", submitQuiz);
  document.getElementById("run-code").addEventListener("click", runCode);
}

// Quiz functions
function loadQuestion() {
  const skill = gameState.currentSkill;
  const questionIndex = gameState.currentQuestion;
  const questionData = gameState.quizData[skill][questionIndex];
  
  // Update question counter
  document.getElementById("current-question").textContent = questionIndex + 1;
  document.getElementById("total-questions").textContent = gameState.quizData[skill].length;
  document.getElementById("current-skill").textContent = 
    skill.charAt(0).toUpperCase() + skill.slice(1) + (skill === "html" ? " Basics" : "");
  
  // Show/hide navigation buttons
  document.getElementById("prev-question").style.display = 
    questionIndex > 0 ? "block" : "none";
  
  document.getElementById("next-question").style.display = 
    questionIndex < gameState.quizData[skill].length - 1 ? "block" : "none";
  
  document.getElementById("submit-quiz").style.display = 
    questionIndex === gameState.quizData[skill].length - 1 ? "block" : "none";
  
  // Load question based on type
  if (questionData.type === "multiple-choice") {
    document.getElementById("code-editor").style.display = "none";
    document.getElementById("question-text").textContent = questionData.question;
    
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    
    questionData.options.forEach((option, index) => {
      const optionElement = document.createElement("div");
      optionElement.className = "option";
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => selectOption(index));
      
      // Check if already selected
      if (gameState.userAnswers[skill][questionIndex] === index) {
        optionElement.classList.add("selected");
      }
      
      optionsContainer.appendChild(optionElement);
    });
  } else if (questionData.type === "coding") {
    document.getElementById("code-editor").style.display = "block";
    document.getElementById("question-text").textContent = questionData.question;
    document.getElementById("code-area").value = 
      gameState.userAnswers[skill][questionIndex] || questionData.starterCode;
  }
}

function selectOption(optionIndex) {
  const skill = gameState.currentSkill;
  const questionIndex = gameState.currentQuestion;
  
  // Update user answer
  gameState.userAnswers[skill][questionIndex] = optionIndex;
  
  // Update UI
  document.querySelectorAll(".option").forEach((option, index) => {
    if (index === optionIndex) {
      option.classList.add("selected");
    } else {
      option.classList.remove("selected");
    }
  });
}

function nextQuestion() {
  gameState.currentQuestion++;
  loadQuestion();
}

function prevQuestion() {
  gameState.currentQuestion--;
  loadQuestion();
}

function runCode() {
  const skill = gameState.currentSkill;
  const questionIndex = gameState.currentQuestion;
  const code = document.getElementById("code-area").value;
  
  // Save code as answer
  gameState.userAnswers[skill][questionIndex] = code;
  
  // Simple code execution simulation
  const output = document.getElementById("output");
  output.textContent = "Running your code... (This is a simulation)";
  
  // In a real app, you would execute the code safely
  setTimeout(() => {
    output.textContent = "Code executed successfully!";
  }, 1000);
}

function submitQuiz() {
  const skill = gameState.currentSkill;
  let correctAnswers = 0;
  
  // Calculate score
  gameState.quizData[skill].forEach((question, index) => {
    if (question.type === "multiple-choice") {
      if (gameState.userAnswers[skill][index] === question.correctAnswer) {
        correctAnswers++;
      }
    } else if (question.type === "coding") {
      if (question.validate(gameState.userAnswers[skill][index])) {
        correctAnswers++;
      }
    }
  });
  
  // Calculate XP earned (50 XP per correct answer)
  const earnedXP = correctAnswers * 50;
  gameState.userXP += earnedXP;
  
  // Mark skill as completed
  if (!gameState.completedSkills.includes(skill)) {
    gameState.completedSkills.push(skill);
  }
  
  // Update completion message
  document.getElementById("completion-message").textContent = 
    `Congratulations! You've completed ${skill.toUpperCase()} Basics with ${correctAnswers} out of ${gameState.quizData[skill].length} correct answers.`;
  document.getElementById("earned-xp").textContent = earnedXP;
  
  showPage("completion-page");
}

function updateSkillMap() {
  // Update XP display
  document.getElementById("xp-count").textContent = gameState.userXP;
  
  // Update progress bar
  const totalSkills = document.querySelectorAll(".skill-node").length;
  const completedSkills = gameState.completedSkills.length;
  const progress = (completedSkills / totalSkills) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;
  
  // Update skill nodes
  document.querySelectorAll(".skill-node").forEach(node => {
    const skill = node.getAttribute("data-skill");
    
    // Mark completed skills
    if (gameState.completedSkills.includes(skill)) {
      node.classList.add("completed");
      node.classList.remove("locked");
    }
    
    // Unlock next skill if previous is completed
    const allSkills = Array.from(document.querySelectorAll(".skill-node")).map(n => n.getAttribute("data-skill"));
    const currentIndex = allSkills.indexOf(skill);
    
    if (currentIndex > 0) {
      const prevSkill = allSkills[currentIndex - 1];
      if (gameState.completedSkills.includes(prevSkill)) {
        node.classList.remove("locked");
      }
    }
  });
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  initializeEventListeners();
  updateSkillMap();
});