document.getElementById("get-joke").addEventListener("click", () => {
    fetch("https://api.chucknorris.io/jokes/random")
        .then(response => response.json())
        .then(data => {
            const jokeContainer = document.getElementById("joke-container");
            jokeContainer.innerHTML = `
                <p>${data.value}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching joke:", error);
        });
});

const toggleModeButton = document.getElementById("toggle-mode");
toggleModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        document.body.style.backgroundColor = "#000"; // Set background to black
        document.getElementById("joke-container").style.backgroundColor = "#333"; // Set joke container to dark gray
    } else {
        document.body.style.backgroundColor = "#f4f4f4"; // Set background to light gray
        document.getElementById("joke-container").style.backgroundColor = "white"; // Set joke container to white
    }
});
