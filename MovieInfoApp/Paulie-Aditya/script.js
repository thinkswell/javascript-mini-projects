function fun(e)
{
    var search=document.getElementById("name").value;
    fetch(`https://www.omdbapi.com/?t=${search}&apikey=16ba5256`)
      .then(response => response.json())
      .then(data => {
        var s = `<table border="2">
        <thead>
          <h2 align="center">Movie Data</h2>
        </thead>
        <tbody>
          <tr>
            <td>Movie Name</td>
            <td>${data.Title}</td>
          </tr>
          <tr>
            <td>Released date</td>
            <td>${data.Released}</td>
          </tr>
          <tr>
            <td>Genre</td>
            <td>${data.Genre}</td>
          </tr>
          <tr>
            <td>Actors</td>
            <td>${data.Actors}</td>
          </tr>
          <tr>
            <td>Director</td>
            <td>${data.Director}</td>
          </tr>
          <tr>
            <td>Short Note</td>
            <td>${data.Plot}</td>
          </tr>
          <tr>
            <td>Poster</td>
            <td>
              <img src=${data.Poster} alt=${data.Title} />
            </td>
          </tr>
          <tr>
            <td>IMDb Rating</td>
            <td>${data.imdbRating}</td>
          </tr>
        </tbody>
      </table>`;
      document.getElementById("container_1").innerHTML = s;
      })
      .catch(error => console.log('error', error));
    e.preventDefault();
}