// Get references to HTML elements
const textInput = document.getElementById("text-input");
const wordCount = document.getElementById("word-count");
const charCount = document.getElementById("char-count");
const paraCount = document.getElementById("para-count");
const countButton = document.getElementById("count-button");
const clearButton = document.getElementById("clear-button");
const charLimitInput = document.getElementById("char-limit");
const highlightButton = document.getElementById("highlight-button");
const highlightWordInput = document.getElementById("highlight-word");

// Add an event listener to the count button
countButton.addEventListener("click", countWords);

// Add an event listener to the clear button
clearButton.addEventListener("click", clearText);

// Add an event listener to the highlight button
highlightButton.addEventListener("click", highlightWords);

// Add an event listener to the character limit input
charLimitInput.addEventListener("input", checkCharacterLimit);

// Save the text input and counts to local storage
function saveData() {
  localStorage.setItem("text", textInput.value);
  localStorage.setItem("words", wordCount.textContent);
  localStorage.setItem("chars", charCount.textContent);
  localStorage.setItem("paras", paraCount.textContent);
}

// Load the saved data from local storage
function loadData() {
  textInput.value = localStorage.getItem("text") || "";
  wordCount.textContent = localStorage.getItem("words") || "Words: 0";
  charCount.textContent = localStorage.getItem("chars") || "Characters: 0";
  paraCount.textContent = localStorage.getItem("paras") || "Paragraphs: 0";
}

// Function to count words, characters, and paragraphs
function countWords() {
  const text = textInput.value;
  const words = text.split(/\s+/).filter((word) => word !== "");
  const characters = text.length;
  const paragraphs = text
    .split("\n")
    .filter((para) => para.trim() !== "").length;

  wordCount.textContent = `Words: ${words.length}`;
  charCount.textContent = `Characters: ${characters}`;
  paraCount.textContent = `Paragraphs: ${paragraphs}`;

  saveData();
}

// Function to clear the textarea and counts
function clearText() {
  textInput.value = "";
  wordCount.textContent = "Words: 0";
  charCount.textContent = "Characters: 0";
  paraCount.textContent = "Paragraphs: 0";

  saveData();
}

// Function to highlight specific words in the text
function highlightWords() {
  const text = textInput.value;
  const wordToHighlight = highlightWordInput.value;
  const highlightedText = text.replace(
    new RegExp(wordToHighlight, "g"),
    '<span class="highlighted">$&</span>'
  );

  // Display the highlighted text in the textarea
  textInput.innerHTML = highlightedText;

  saveData();
}

// Function to check character limit
function checkCharacterLimit() {
  const charLimit = parseInt(charLimitInput.value);
  const text = textInput.value;
  const characters = text.length;

  if (charLimit && characters > charLimit) {
    charCount.style.color = "red";
    charCount.textContent = `Characters: ${characters} (Exceeding limit)`;
  } else {
    charCount.style.color = "black";
    charCount.textContent = `Characters: ${characters}`;
  }

  saveData();
}

// Load saved data when the page loads
window.addEventListener("load", loadData);
