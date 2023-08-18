let userInput = document.getElementById("userInput");
userInput.addEventListener("input", () => {
    let userValue = userInput.value.toLowerCase();
    let count = 0;
    for (let x = 0; x < userValue.length; x++) {
        if (userValue[x] == 'a' || userValue[x] == 'e' || userValue[x] == 'o' || userValue[x] == 'i' || userValue[x] == 'u') {
            count++;
        }
    }
    document.getElementById("count").innerText = `Total Vowels: ${count}`;
});