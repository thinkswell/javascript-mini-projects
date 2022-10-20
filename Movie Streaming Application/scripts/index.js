"use strict";

const resultWrapper = document.getElementById("result-wrapper");
const detailsWrapper = document.getElementById("id-details-wrapper");
const searchInput = document.getElementById("search");
const searchTrendSpan = document.getElementById("search-trend");
const pageNumberSpan = document.getElementById("page-number");
const nextBtn = document.getElementById("next-btn");

let SEARCH_DEBOUNCE_FLAG = null;
let CURRENT_PAGE = 1;

window.onload = function onLoadDone() {
    document.body.classList.add("loaded");
};

document.addEventListener("DOMContentLoaded", () => {

    if (!resultWrapper)
        throw new Error("Result wrapper is not exist");

    if (!detailsWrapper)
        throw new Error("Details wrapper is not exist");

    // init movies list
    initialMovieList();

    initListeners();
});

window.onresize = function () {
    calcItemsSize();
};

function initialMovieList() {
    getMovies("Lovely")
        .then(({movies = [], totalResult = 0}) => {
            movies.map(generateMovieItem)
        });

}

function initListeners() {
    detailsWrapper.querySelector(".movie-details__close")
        .addEventListener("click", closeDetailsSection);

    searchInput.addEventListener("input", searchInMovies);

    nextBtn.addEventListener("click", nextBtnClickHandler)
}

function searchInMovies(e) {
    if (SEARCH_DEBOUNCE_FLAG)
        clearTimeout(SEARCH_DEBOUNCE_FLAG);
    SEARCH_DEBOUNCE_FLAG = setTimeout(() => {

        let trend = e.target.value;
        if (!trend) trend = "Lovely";

        // search with a trend less than 3 chars cause an error on omdbapi
        if (trend.length < 3)
            return;

        // reset page number on each search
        CURRENT_PAGE = 1;

        trend = trend.trim()

        getMoviesAndParse(trend, CURRENT_PAGE)

    }, 300)
}

function nextBtnClickHandler() {

    let trend = searchInput.value;
    if (!trend) trend = "Lovely";

    // search with a trend less than 3 chars cause an error on omdbapi
    if (trend.length < 3)
        return;

    getMoviesAndParse(trend, ++CURRENT_PAGE)
}

function getMoviesAndParse(trend, page) {

    resultWrapper.innerHTML = '';

    // update search-trend span
    searchTrendSpan.innerText = trend.length < 10 ? trend : trend.substr(0, 8) + '...';
    nextBtn.style.display = "none";
    pageNumberSpan.innerText = '';

    // handle search
    getMovies(trend, page)
        .then(({movies = [], totalResults = 0}) => {

            if ((page * 10) < +totalResults) {
                pageNumberSpan.innerText = `| Page: ${page}`;
                nextBtn.style.display = "inline-block";
            }

            if (movies.length)
                movies.map(generateMovieItem);
            else
                generateNoContentPlaceholder();

            // scroll to top after fetch
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        });
}

function generateMovieItem(item) {
    let movieElm = document.createElement("div");
    movieElm.setAttribute("data-imdbid", item.imdbID);
    movieElm.classList.add("movie-item");

    movieElm.addEventListener("click", handleMovieItemClick);

    movieElm.innerHTML = `
            <figure class="movie-item__poster"
                style="background-image: url('${item.Poster}')"></figure>
            <h2 class="movie-item__title">${item.Title}</h2>
            <div class="movie-item__meta">
                <span class="movie-item__meta__year">${item.Year}</span>
                <span class="movie-item__meta__divider">&nbsp;-&nbsp;</span>
                <span class="movie-item__meta__imdb-link">
                    <a href="https://www.imdb.com/title/${item.imdbID}" target="_blank">IMDB</a></span>
            </div>`;

    resultWrapper.append(movieElm)
}

function generateNoContentPlaceholder() {
    let placeholderElm = document.createElement("p");
    placeholderElm.classList.add("no-content-placeholder");

    placeholderElm.innerText = `Movies not found.`;

    resultWrapper.append(placeholderElm)
}

function handleMovieItemClick(e) {
    const movieItem = e.target.closest(".movie-item");
    const movieItemID = movieItem.getAttribute("data-imdbid");

    // handle class toggle
    removeDetailsClassFromItems();
    movieItem.classList.add("--in-details");

    // get movie from api
    getSingleMovie(movieItemID)
        .then(movieObj => {
            showMovieInDetails(movieObj, movieItem)
        })
}

function calcItemsSize() {
    let columnsCount = Math.floor(resultWrapper.offsetWidth / 200) || 1;
    document.body.style.setProperty("--poster-height", (resultWrapper.offsetWidth / columnsCount) + "px");
    document.body.style.setProperty("--result-grid-column", columnsCount.toString());
}

function removeDetailsClassFromItems() {
    document.querySelectorAll(".movie-item").forEach(mi => {
        mi.classList.remove("--in-details");
    });
}

function closeDetailsSection() {
    detailsWrapper.classList.remove("--visible");
    removeDetailsClassFromItems();
    calcItemsSize();
}

function showMovieInDetails(movieObj, targetItem) {
    if (!detailsWrapper.classList.contains("--visible")) {
        detailsWrapper.classList.add("--visible");
    }

    calcItemsSize();

    // scroll to target movie element
    setTimeout(() => {
        window.scrollTo({
            top: targetItem.offsetTop - 20,
            behavior: 'smooth'
        })
    }, 50);

    let detailsElm = detailsWrapper.querySelector(".movie-details__inner");
    if (!detailsElm)
        detailsElm = document.createElement("div");

    detailsElm.classList.add("movie-details__inner");

    if (!movieObj.Poster || movieObj.Poster === "N/A")
        detailsElm.classList.add("--no-poster");
    else
        detailsElm.classList.remove("--no-poster");

    detailsElm.innerHTML = `
                    <span class="loader"></span>
                    <figure class="movie-details__poster"
                        style="background-image: url('${movieObj.Poster}')"></figure>
                    <div class="movie-details__title">
                        <h2>${movieObj.Title}</h2>
                        <span class="movie-details__rating">${movieObj.imdbRating} / 10</span>
                    </div>
                    <div class="movie-details__meta">
                        <span><span class="--label">Released:</span>${movieObj.Released}</span>&nbsp;-&nbsp;
                        <span><span class="--label">Runtime:</span>${movieObj.Runtime}</span>
                    </div>
                    <div class="movie-details__meta"><span class="--label">Genre:</span>${movieObj.Genre}</div>
                    <div class="movie-details__meta">
                        <span><span class="--label">Director:</span>${movieObj.Director}</span>&nbsp;-&nbsp;
                        <span><span class="--label">Writer:</span>${movieObj.Writer}</span>
                    </div>
                    <div class="movie-details__meta">
                        <span><span class="--label">Country:</span>${movieObj.Country}</span>&nbsp;-&nbsp;
                        <span><span class="--label">Language:</span>${movieObj.Language}</span>
                    </div>
                    <div class="movie-details__meta">
                        <span class="--label">Actors:</span>${movieObj.Actors}
                    </div>
                    <div class="movie-details__meta">
                        <span class="--label">Summary:</span>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
                    </div>`;

    detailsWrapper.append(detailsElm);
}
