// get the elements from the DOM
const quoteBtn = document.getElementById("quote-btn");
const quoteContainer = document.getElementById("quote-container");

// add event listener to the button. getQuote function is called whenever quoteBtn is 'clicked'
quoteBtn.addEventListener("click", getQuote);

// to force an error and test the try-catch block -  uncomment the line below and comment the line above 
// quoteBtn.addEventListener("click", getError);

async function getQuote() {
    // try catch block so that if there is an error, it will be caught and logged to the console
    try {
        // set the innerHTML of the quoteContainer to 'Loading...' while the data is being fetched
        quoteContainer.innerHTML = "Loading...";

        // fetch the data from the api. We use await keyword so that the data is fetched before the next line of code is executed
        const data = await fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes");
        const quote = await data.json();

        // set HTML content to retrieved data
        quoteContainer.innerHTML = quote[0];

    } catch (error) {
        // executed if there was any error in the try block
        quoteContainer.innerHTML = "<b>ERROR: " + error.message + "</b>";
        console.log(error)
    }
}


async function getError() {
    // try catch block so that if there is an error, it will be caught and logged to the console
    try {
        // set the innerHTML of the quoteContainer to 'Loading...' while the data is being fetched
        quoteContainer.innerHTML = "Loading...";

        // here the URL entered is incorrect, so the fetch will fail and the error will be caught in the catch block
        await fetch("https://ron-swanson-quotes.herokuapp./v2/quotes");

    } catch (error) {
        // executed if there was any error in the try block
        quoteContainer.innerHTML = "<b>ERROR: " + error.message + "</b>";
        console.log(error)
    }
}