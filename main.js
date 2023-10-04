document.addEventListener('DOMContentLoaded', function () {
    // Replace 'YOUR_NASA_API_KEY' with your actual NASA API key
    const nasaApiKey = 'YOUR_NASA_API_KEY';

    const apodImage = document.getElementById('apod-image');
    const apodTitle = document.getElementById('apod-title');
    const apodExplanation = document.getElementById('apod-explanation');

    function getAstronomyPicture() {
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasaApiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.url;
                const title = data.title;
                const explanation = data.explanation;

                apodImage.src = imageUrl;
                apodTitle.textContent = title;
                apodExplanation.textContent = explanation;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    getAstronomyPicture();
});
