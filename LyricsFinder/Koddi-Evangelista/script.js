// Get DOM elements
// Get the search form
const form = document.getElementById('form')
// Get the Input text field
const search = document.getElementById('search')
// Get the results container
const results = document.getElementById('results')
// Get the pagination container
const pagination = document.getElementById('pagination')

// Base URL for API fetch
const api = 'https://api.lyrics.ovh'

// Functions
// 1. Function to search song title and artist
async function searchSongs (term) {
  const res = await fetch(`${api}/suggest/${term}`)
  const data = await res.json()

  showData(data)
}

// 2. Function to display data from search in the DOM
function showData (data) {
  // Display the first set of songs in the DOM
  results.innerHTML = `
        <ul class="songs">
            ${data.data
              .map(
                song => `
                        <li>
                            <span>${song.artist.name} - ${song.title}</span>
                            <button class="btn" data-artist="${song.artist.name}" data-title="${song.title}">Get Lyrics</button>
                        </li>
                    `
              )
              .join('')}
        </ul>
    `

  // Add Pagination if required
  if (data.prev || data.next) {
    pagination.innerHTML = `
            ${
              data.prev
                ? `<button class="btn" onClick="getMoreSongs('${data.prev}')">Prev</button>`
                : ''
            }
            ${
              data.next
                ? `<button class="btn" onClick="getMoreSongs('${data.next}')">Next</button>`
                : ''
            }
        `
  } else {
    pagination.innerHTML = ''
  }
}

// 3. Function to get the previous or next songs from API
async function getMoreSongs (url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
  const data = await res.json()

  showData(data)
}

// 4. Function to get the lyrics of a song
async function getLyrics (artist, title) {
  const res = await fetch(`${api}/v1/${artist}/${title}`)
  const data = await res.json()

  console.log(data.lyrics)

  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '</br>')

  results.innerHTML = `
        <h2>${artist} - ${title}</h2>
        <p>${lyrics}</p>
    `

  pagination.innerHTML = ''
}

// Event Listeners
// 1. Event Listener for search form
form.addEventListener('submit', e => {
  // Prevent the reload of page on submit
  e.preventDefault()
  // Get the search term from the input field
  const searchTerm = search.value.trim()
  // Check if search term is valid
  if (searchTerm) {
    searchSongs(searchTerm)
  } else {
    alert('Please enter a valid search')
  }
})

// 2. Event Listener to Get Lyrics to a Song on Click of Button
results.addEventListener('click', e => {
  // Find out what was clicked
  const clickedElement = e.target
  // Check if clicked element is a button
  if (clickedElement.tagName === 'BUTTON') {
    // Get artist name and song title from HTML5 custom properties on button
    const artist = clickedElement.getAttribute('data-artist')
    const title = clickedElement.getAttribute('data-title')
    // Now fetch the lyrics
    getLyrics(artist, title)
  }
})
