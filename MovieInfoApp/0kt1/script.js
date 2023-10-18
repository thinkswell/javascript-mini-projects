const apiKey = '76d079f0'; // Get an API key from http://www.omdbapi.com/apikey.aspx

const movieInput = document.getElementById('movieInput');
const searchButton = document.getElementById('searchButton');
const movieDetails = document.getElementById('movieDetails');

searchButton.addEventListener('click', () => {
    const movieName = movieInput.value.trim();

    if (movieName !== '') {
        fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.Response === 'True') {
                    // Display movie details
                    movieDetails.innerHTML = `
                        <div class = "float-container">
                          <div class= "float-child">
                            <img src="${data.Poster}" alt="${data.Title} poster">
                          </div>
                          <div class= "float-child">
                            <h2>${data.Title}</h2>
                            <h4 style="display: inline">Year:</h4> <p style="display: inline">${data.Year} </p><br>
                            <h4 style="display: inline">Director:</h4> <p style="display: inline">${data.Director} </p><br>
                            <h4 style="display: inline">Genre:</h4> <p style="display: inline">${data.Genre} </p><br>
                            <h4 style="display: inline">Actors:</h4> <p style="display: inline">${data.Actors} </p><br>
                            <h4 style="display: inline">PLot:</h4> <p style="display: inline">${data.Plot} </p><br>
                          </div>
                        </div>
                        
                        
                       
                    `;
                } else {
                    movieDetails.innerHTML = 'Movie not found.';
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                movieDetails.innerHTML = 'An error occurred while fetching data.';
            });
    }
});
