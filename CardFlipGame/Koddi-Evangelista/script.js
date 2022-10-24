// Get All DOM Elements for Functionality
// Cards Container
const cardContainer = document.getElementById('card-container')
// Navigation
const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')
const currentCard = document.getElementById('current-card')
// Add Card Container
const addCardContainer = document.getElementById('add-card-container')
const addCardBtn = document.getElementById('add-card')
const closeCardBtn = document.getElementById('close-card')
const question = document.getElementById('question')
const answer = document.getElementById('answer')
const addNewCardBtn = document.getElementById('add-card-btn')
// Clear Cards
const clearBtn = document.getElementById('clear-btn')

// Track current card
let currentActiveCard = 0

// Collection of card DOM elements
const cardElements = []

// Collection of card data
const cardsData = getCardsData()

// Functions
// 1. Function to create all cards
function createCards () {
  cardsData.forEach((data, index) => createCard(data, index))
}

// 2. Function to create a card
function createCard (data, index) {
  // Create the div for the card
  const card = document.createElement('div')
  // Assign the card class
  card.classList.add('card')
  // Check for first card and assign active class
  if (index === 0) {
    card.classList.add('active')
  }
  // Create the innerHTML for a card
  card.innerHTML = `
        <div class="inner-card">
            <div class="card-front">
                <p>${data.question}</p>
            </div>
            <div class="card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `
  // Event Listener to flip the card on click
  card.addEventListener('click', () => card.classList.toggle('show-answer'))
  // Add the newly created card to the collection of card DOM elements
  cardElements.push(card)
  // Add the card to the DOM
  cardContainer.appendChild(card)
  // Display the current card / total card value
  updateCurrentCardText()
}

// 3. Function to show the current card / total number of cards in navigation
function updateCurrentCardText () {
  currentCard.innerHTML = `<p>${currentActiveCard + 1}/${
    cardElements.length
  }</p>`
}

// 4. Function to get card data from local storage
function getCardsData () {
  const cards = JSON.parse(localStorage.getItem('cards'))
  return cards === null ? [] : cards
}

// 5. Function to save card data to local storage
function saveCardData (cards) {
  // Save card data to local storage
  localStorage.setItem('cards', JSON.stringify(cards))
  // Reload window
  window.location.reload()
}

createCards()

// Event Listeners
// 1. Event listener for next button
nextBtn.addEventListener('click', () => {
  // Hide the current card and move to left
  cardElements[currentActiveCard].className = 'card left'
  // Increment the current active card tracker to next card
  currentActiveCard++
  // Check if last card
  if (currentActiveCard > cardElements.length - 1) {
    currentActiveCard = cardElements.length - 1
  }
  // Display the new card
  cardElements[currentActiveCard].className = 'card active'
  // Update the current card number
  updateCurrentCardText()
})

// 2. Event listener for previous button
prevBtn.addEventListener('click', () => {
  // Hide the current card and move to right
  cardElements[currentActiveCard].className = 'card right'
  // Increment the current active card tracker to next card
  currentActiveCard--
  // Check if last card
  if (currentActiveCard < 0) {
    currentActiveCard = 0
  }
  // Display the new card
  cardElements[currentActiveCard].className = 'card active'
  // Update the current card number
  updateCurrentCardText()
})

// 3. Create event listener for the Add New Card button
addCardBtn.addEventListener('click', () => {
  addCardContainer.classList.add('show')
})

// 4. Close the Add New Card form
closeCardBtn.addEventListener('click', () => {
  addCardContainer.classList.remove('show')
})

// 5. Event Listener for creating a new card
addNewCardBtn.addEventListener('click', () => {
  // Get the user inputs from the text fields
  const questionInput = question.value
  const answerInput = answer.value
  // Check to make sure inputs are not null
  if (questionInput.trim() && answerInput.trim()) {
    // Create a new object using the user inputs
    const newCard = { question: questionInput, answer: answerInput }
    // Using the newCard object, create a card element using the createCard function
    createCard(newCard)
    // Reset form fields
    question.value = ''
    answer.value = ''
    // Hide form after submit
    addCardContainer.classList.remove('show')
    // Add the new card object to the cardsData array
    cardsData.push(newCard)
    // Save data to local storage and reload page
    saveCardData(cardsData)
  }
})

// 6. Event listener to clear all cards
clearBtn.addEventListener('click', () => {
  // Remove data from local storage
  localStorage.clear()
  // Clear the card container of all contents
  cardContainer.innerHTML = ''
  // Reload the window
  window.location.reload
  // Update the current card number
  currentCard.innerHTML = `<p></p>`
})
