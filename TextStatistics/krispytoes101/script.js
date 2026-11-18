
const textInput = document.getElementById("textInput");
const clearButton = document.getElementById("clearButton");

function analyzeText() {
    const text = textInput.value;

    const words = text.trim() === ""
        ? []
        : text.trim().split(/\s+/);

    const characters = text.length;

    const noSpaces = text.replace(/\s/g, "").length;

    const sentences = text.trim() === ""
        ? 0
        : (text.match(/[.!?]+(?=\s|$)/g) || []).length;

    const paragraphs = text.trim() === ""
        ? 0
        : text.trim().split(/\n\s*\n/).length;

    const readingTime = Math.ceil(words.length / 200);

    document.getElementById("words").textContent = words.length;
    document.getElementById("characters").textContent = characters;
    document.getElementById("noSpaces").textContent = noSpaces;
    document.getElementById("sentences").textContent = sentences;
    document.getElementById("paragraphs").textContent = paragraphs;
    document.getElementById("readingTime").textContent = readingTime;
}

textInput.addEventListener("input", analyzeText);

clearButton.addEventListener("click", function() {
    textInput.value = "";
    analyzeText();
});

analyzeText();
