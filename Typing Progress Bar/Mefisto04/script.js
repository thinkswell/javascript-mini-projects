const wordDisplay = document.getElementById('word-display');
const wordInput = document.getElementById('word-input');
const progressBar = document.getElementById('progress-bar');
const wordsToType = "The quick brown fox jumps over the lazy dog";
const wordsArray = wordsToType.split(' ');
let currentWordIndex = 0;

function updateProgressBar() {
    const percentage = (currentWordIndex / wordsArray.length) * 100;
    progressBar.style.width = percentage + '%';
}

wordDisplay.textContent = wordsToType;

wordInput.addEventListener('input', function () {
    const inputText = wordInput.value;
    const expectedWord = wordsArray[currentWordIndex];

    if (inputText === expectedWord) {
        currentWordIndex++;
        wordInput.value = '';
        updateProgressBar();

        if (currentWordIndex === wordsArray.length) {
            alert('Congratulations! You typed all the words correctly.');
        } else {
            wordDisplay.textContent = wordsArray[currentWordIndex];
        }
    }
});