// All global variables
let STORE = []; // Array to store quiz questions and answers
let questionNumber = 1; // Current question number
let correctAnswers = 0; // Number of correct answers
let incorrectAnswers = 0; // Number of incorrect answers
let currentQuestion = 0; // Index of the current question
let correctMessage; // Message to display for correct answers
let incorrectMessage; // Message to display for incorrect answers

// Runs when the window is loaded
window.onload = function() {
    buttons(); // Attach event handlers to buttons
    $('.scoreboard').html(scores()); // Initialize the scoreboard
};

// All of the button press options
function buttons() {
    // Event handler for the "Begin" button
    $('.box').on('click', '#begin', function() {
        event.preventDefault(); // Prevent page reload
        let numQ = $('#numQ').val(); // Get the number of questions from the input
        let diff;
        let cat;

        // Check if difficulty is specified and construct URL
        if ($('#difficulty').val() === 'any') {
            diff = '';
        } else {
            diff = `&difficulty=${$('#difficulty').val()}`;
        }

        // Check if category is specified and construct URL
        if ($('#category').val() === 'any') {
            cat = '';
        } else {
            cat = `&category=${$('#category').val()}`;
        }

        // Display loading message and prevent multiple clicks
        $('#begin').replaceWith(`<p>Loading...</p>`);
        createQuestions(numQ, diff, cat);
    });

    // Event handler for the "Next" button
    $('.box').on('click', '#next', function() {
        event.preventDefault();
        handleNext();
    });

    // Event handler for the "Submit" button (when guessing)
    $('.box').on('click', '#guess', function() {
        event.preventDefault();
        handleGuess();
    });

    // Event handler for the "New Quiz" button (restart)
    $('.box').on('click', '#restart', function() {
        event.preventDefault();
        STORE = []; // Clear questions before starting a new game
        restartQuiz();
    });
}

// Uses fetch to utilize the API and sends the JSON data to the testData function
function createQuestions(numQ, diff, cat) {
    let url = `https://opentdb.com/api.php?amount=${numQ}&type=multiple${diff}${cat}`;
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => testData(responseJson, numQ, diff, cat))
        .catch((error) => alert(error));
}

// This makes sure the API has enough questions for requested specifications
function testData(data, numQ, diff, cat) {
    if (data.response_code === 0) {
        createArr(data); // If enough questions are available, create an array of questions
    } else {
        numQ--;
        createQuestions(numQ, diff, cat); // Try again with fewer questions
    }
}

// creates the array of questions using the JSON data
function createArr(data) {
    for (let question in data.results) {
        let arr = [];

        // Create an array of potential answers
        arr.push(data.results[question].correct_answer);
        arr.push(data.results[question].incorrect_answers[0]);
        arr.push(data.results[question].incorrect_answers[1]);
        arr.push(data.results[question].incorrect_answers[2]);

        // Shuffle the order of the answers
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        // Create an object containing the question, array of potential answers, and actual answer
        let newObj = {
            question: data.results[question].question,
            answers: arr,
            rightAnswer: data.results[question].correct_answer
        };
        STORE.push(newObj);
    }
    renderQuestion(); // Display the first question
}

// Renders the question form
function renderQuestion() {
    $('.box').html(
        `
        <form>
        <fieldset name="question">
            <legend>Question ${questionNumber} of ${STORE.length}</legend>
            ${STORE[currentQuestion].question}
        </fieldset>
        <fieldset name="answers">
            <legend>Answers</legend>
            <input type="radio" name="answer" class="posAnswer" value="${STORE[currentQuestion]
        .answers[0]}" data-value= "${STORE[currentQuestion].answers[0]}"> ${STORE[currentQuestion]
        .answers[0]}<br>
            <input type="radio" name="answer" class="posAnswer" value="${STORE[currentQuestion]
        .answers[1]}" data-value= "${STORE[currentQuestion].answers[1]}"> ${STORE[currentQuestion]
        .answers[1]}<br>
            <input type="radio" name="answer" class="posAnswer" value="${STORE[currentQuestion]
        .answers[2]}" data-value= "${STORE[currentQuestion].answers[2]}"> ${STORE[currentQuestion]
        .answers[2]}<br>
            <input type="radio" name="answer" class="posAnswer" value="${STORE[currentQuestion]
        .answers[3]}" data-value= "${STORE[currentQuestion].answers[3]}"> ${STORE[currentQuestion]
        .answers[3]}<br>
            <button name="answer" id="guess">Submit</button>
            <button name="answer" id="next" class="hidden">Next</button>
        </fieldset>
        </form>
        <p class="hidden" id="message">Test</p>
        <p class="hidden wrong" id="error">"Please select an answer."</p>
    `
    );
}

// Handles when someone guesses an answer
function handleGuess() {
    // Checks to see if an option is checked
    if ($("input[name='answer']:checked").data('value')) {
        guess();
    } else {
        // Shows the error message if nothing is checked
        if ($('#error').hasClass('hidden')) {
            $('#error').toggleClass('hidden');
        }
    }
}

// Checks whether answer is correct or not
function guess() {
    if (!$('#error').hasClass('hidden')) {
        $('#error').toggleClass('hidden');
    }

    // Disables ability to guess again on the current question
    $('input[type=radio]').attr('disabled', true);

    // Handle special characters in answers
    let encodedStr = STORE[currentQuestion].rightAnswer;
    let parser = new DOMParser();
    let dom = parser.parseFromString('<!doctype html><body>' + encodedStr, 'text/html');
    let decodedString = dom.body.textContent;

    correctMessage = `That is correct! Way to go!`;
    incorrectMessage = `That is incorrect. The correct answer is: ${decodedString}.`;

    if ($("input[name='answer']:checked").data('value') == decodedString) {
        $('#message').text(`${correctMessage}`);
        correctAnswers++;
    } else {
        $('#message').text(`${incorrectMessage}`);
        incorrectAnswers++;
    }
    toggleClasses(); // Toggle messages for correct/incorrect and update the score
}

// Toggles the messages for correct/incorrect and shows the new score
function toggleClasses() {
    $('#message').toggleClass('hidden');
    $('#guess').toggleClass('hidden');
    $('#next').toggleClass('hidden');
    $('.scoreboard').html(scores()); // Update the scoreboard
}

// Handles when someone presses the next button
function handleNext() {
    if (questionNumber != STORE.length) {
        currentQuestion++;
        questionNumber++;
        renderQuestion(); // Display the next question
    } else {
        $('.box').html(results()); // Display the results when all questions are answered
    }
}

// This is the display for the results page.
function results() {
    // Messages given based on the score
    let goodScore = ' You really know your trivia!';
    let okayScore = ' Try again and see if you can do better!';
    let badScore = ' Better Luck Next Time.';

    let scoreMessage;

    if (correctAnswers > STORE.length * 0.7) {
        scoreMessage = ' 😎👌' + goodScore;
    } else if (correctAnswers > STORE.length * 0.4) {
        scoreMessage = ' 😉' + okayScore;
    } else {
        scoreMessage = ' 😵' + badScore;
    }

    const resultBox = `
      <div class='results'>
        <h2>Results</h2>
        <p>
          You got ${correctAnswers} out of ${STORE.length} questions correct. ${scoreMessage}
        </p>
        <button name="answer" id="restart" class="resultBtn">New Quiz</button>
      </div>
    `;
    return resultBox;
}

// Resets everything and starts fresh
function restartQuiz() {
    questionNumber = 1;
    correctAnswers = 0;
    incorrectAnswers = 0;
    currentQuestion = 0;
    $('.box').html(`
        <form>
            <fieldset name="intro">
                <legend>Try It Out</legend>
                Test your knowledge with a random quiz!
            </fieldset>
            <fieldset name="options">
            <label for="numQ">Number of Questions</label>
            <input type="number" placeholder="10" id="numQ" s min="1" max="50" value="10" />
            <br>
            <label for="difficulty">Choose a difficulty</label>
            <select name="difficulty" id="difficulty">
                <option value="any">Mixed Difficulty</option>
                <option value="easy">Easy Questions</option>
                <option value="medium">Medium Questions</option>
                <option value="hard">Hard Questions</option>
            </select>
            <br>
            <label for="category">Select a Category: </label>
            <select name="category" id="category">
                <!-- Categories options here -->
            </select>
            </fieldset>
            <button id="begin">Begin</button>
        </form>
    `);
    $('.scoreboard').html(scores()); // Update the scoreboard
}

// Handles the display of the scores
function scores() {
    const scoreMake = `
          <li class="scores">✅ Correct: ${correctAnswers}</li>
          <li class="scores">❌ Incorrect: ${incorrectAnswers}</li>
      `;
    return scoreMake;
}
