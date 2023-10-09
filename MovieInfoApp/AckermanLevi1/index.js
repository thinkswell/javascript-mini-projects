document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const movieNameInput = document.getElementById("movieName");
    const movieInfo = document.getElementById("movieInfo");

    searchButton.addEventListener("click", () => {
        const movieName = movieNameInput.value.trim();
        if (movieName === "") {
            alert("Please enter a movie name.");
            return;
        }

        // You can replace 'YOUR_OMDB_API_KEY' with your actual OMDB API key
        const apiKey = "adff2bf8";
        const apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    const movieTitle = data.Title;
                    const movieYear = data.Year;
                    const moviePlot = data.Plot;

                    movieInfo.innerHTML = `
                        <h2>${movieTitle} (${movieYear})</h2>
                        <p>${moviePlot}</p>
                    `;
                } else {
                    movieInfo.innerHTML = "<p>Movie not found.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    });
});
