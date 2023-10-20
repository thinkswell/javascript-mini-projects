let inputText = document.getElementById("input-text");
let textResult = document.getElementById("text-result");
textResult.style.display = "none";
function toUpper() {
  let word = inputText.value;
  textResult.style.display = "block";
  textResult.innerHTML = `<p>The uppercase conversion is:</p>${word.toUpperCase()}`;
}
function toLower() {
  let word = inputText.value;
  textResult.style.display = "block";
  textResult.innerHTML = `<p>The lowercase conversion is:</p>${word.toLowerCase()}`;
}

function removePunc() {
  let word = inputText.value;
  let newWord = [];
  textResult.style.display = "block";
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    if (/\w|s/.test(char) && char !== "_") {
      newWord.push(char);
    }
  }
  textResult.innerHTML = `<p>The text after removing punctuations is:</p>${newWord.join(
    ""
  )}`;
}

function removeSpaces() {
  let word = inputText.value;
  let newWord = [];
  textResult.style.display = "block";
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    if (!/\s/.test(char)) {
      newWord.push(char);
    }
  }
  textResult.innerHTML = `<p>The text after removing spaces is:</p>${newWord.join(
    ""
  )}`;
}

function countWords() {
  let word = inputText.value;
  let wordArr = word.split(" ").filter((item) => item != "");
  textResult.style.display = "block";
  textResult.innerHTML = `<p>The number of words in the text is:</p>${wordArr.length}`;
}

function countCharacters() {
  let word = inputText.value;
  textResult.style.display = "block";
  textResult.innerHTML = `<p>The number of characters in the text is:</p>${word.length}`;
}

function textReverse() {
  let word = inputText.value;
  let reverseWord = word.split("").reverse().join("");
  textResult.style.display = "block";
  textResult.innerHTML = `<p>The number of characters in the text is:</p>${reverseWord}`;
}

function checkPalindrome() {
  let word = inputText.value;
  let reverseWord = word.split("").reverse().join("");
  if (word === reverseWord ? true : false) {
    textResult.style.display = "block";
    textResult.innerHTML = `<p>The input text is palindrome</p>`;
  } else {
    textResult.style.display = "block";
    textResult.innerHTML = `<p>The input text is not a palindrome</p>`;
  }
}
