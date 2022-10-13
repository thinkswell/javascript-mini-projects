// Card trick by Stian Martinsen - 2021

// button to toggle if the start button should be a reset-button instead.
let buttonIsStart = true;
// arrays to be used for each pile
let pile1 = [];
let pile2 = [];
let pile3 = [];
// Variable to keep track of the number of selections. (correct card is found at min 3)
let pileSelectionCounter = 0;
// store the cards from the API in this array:
let cards;

// HTML-elements to use.
const correctCardHTML =
  document.documentElement.querySelector(".correctCardArea");
const mainheaderHTML = document.documentElement.querySelector(".mainheader");
const allCardsHTML = document.documentElement.querySelector(".allcards");
const startButton = document.documentElement.querySelector(".startButton");
const changeCardsButton =
  document.documentElement.querySelector(".changeCardsButton");
const continueButton =
  document.documentElement.querySelector(".continueButton");
const pile1placement = document.documentElement.querySelector(".pile1cards");
const pile2placement = document.documentElement.querySelector(".pile2cards");
const pile3placement = document.documentElement.querySelector(".pile3cards");

const pileSelectionButtons =
  document.documentElement.querySelectorAll(".pileselection");

// getNewCards() fetches a new deck, and retrieves 21 cards from the deck.
const getNewCards = async function () {
  // empties the array to avoid adding more to previously fetched decks.
  cards = [];
  // Get the deck_id
  let response = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  let post = await response.json();
  // use the deck_id fetched in the previous call and get the cards in the deck.
  let cardResponse = await fetch(
    `https://deckofcardsapi.com/api/deck/${post.deck_id}/draw/?count=21`
  );
  //stores the result in a temp variable because it needs further processing.
  let tempCards = await cardResponse.json();
  //reassigning cards to only store the cards info.
  tempCards = tempCards.cards;

  // iterating through tempCards to create a new Array to store only the image-urls.
  tempCards.forEach((card) => {
    cards.push(card.image);
  });
};
// Runs the getNewCards on page load, so the initial deck is already loaded when the Start-button is clicked.
getNewCards();

// User needs to click the start-button to start.
startButton.onclick = async function () {
  // makes the change cards button visible.
  if (buttonIsStart === true) {
    // toggles the function of this button.
    buttonIsStart = false;
    // changes the Text of the button.
    startButton.innerHTML = "Reset Game";
    // makes the ChangeCards-button visible. (already loaded in the HTML, but hidden by CSS)
    changeCardsButton.style.setProperty(`display`, "inline-flex");
    // presents the deck.
    presentDeck();
  } else {
    // When the button is a ResetButton, the following happens.
    // Text on the button is changed back.
    startButton.innerHTML = "Start Game";
    // Hides buttons and html-sections
    changeCardsButton.style.setProperty(`display`, `none`);
    mainheaderHTML.innerHTML = ``;
    continueButton.style.setProperty(`display`, `none`);
    correctCardHTML.innerHTML = ``;
    allCardsHTML.innerHTML = ``;
    // toggles the function of this button.
    buttonIsStart = true;
    // Resets the pileSelectionCounter which might have been increased before reset.
    pileSelectionCounter = 0;
    // Clears the piles.
    ClearPiles();
    // Hides the PileButtons.
    showPileButtons(0);
    // Grabs a ned deck of cards.
    await getNewCards();
  }
};

// The ChangeCards-button simply calls the API for new cards and presents them in the current view.
changeCardsButton.onclick = async function () {
  await getNewCards();
  presentDeck();
};

// The presentDeck() displays the deck loaded from the API for verification by the user.
function presentDeck() {
  // Makes the mainheader-element visible and sets the H2.
  mainheaderHTML.innerHTML = `Remember one of these cards before you click "Continue".`;
  // Empties the "allCards". Without this the cards presented will accumulate when changing cards.
  allCardsHTML.innerHTML = ``;
  // Create the HTML-element for each card.
  for (i = 0; i < cards.length; i++) {
    allCardsHTML.innerHTML += `<img src="${cards[i]}" class="card">`;
  }
  // Makes the ContinueButton-visible.
  continueButton.style.setProperty(`display`, `flex`);
}

// The onClick-function for the Continue-button.
continueButton.onclick = function () {
  // Hides the buttons which are now obsolete.
  changeCardsButton.style.setProperty(`display`, `none`);
  continueButton.style.setProperty(`display`, `none`);
  allCardsHTML.innerHTML = ``;
  //Present the piles...
  presentPiles(cards);
};

// presentPiles() takes the current deck of 21 cards and simulates the dealing of cards in 3 piles.
function presentPiles(CardDeck) {
  // change the instructions
  mainheaderHTML.innerHTML = `2. Click the pile-button below the pile where you see your card, round: ${
    pileSelectionCounter + 1
  }`;
  // resetting a variable to identify where the card in each pile is. Currently used for styling.
  let cardPileIndex1 = 0,
    cardPileIndex2 = 0,
    cardPileIndex3 = 0;
  // ordering each card in each pile like a human would deal the cards.
  pile1 = [
    CardDeck[0],
    CardDeck[3],
    CardDeck[6],
    CardDeck[9],
    CardDeck[12],
    CardDeck[15],
    CardDeck[18],
  ];
  pile2 = [
    CardDeck[1],
    CardDeck[4],
    CardDeck[7],
    CardDeck[10],
    CardDeck[13],
    CardDeck[16],
    CardDeck[19],
  ];
  pile3 = [
    CardDeck[2],
    CardDeck[5],
    CardDeck[8],
    CardDeck[11],
    CardDeck[14],
    CardDeck[17],
    CardDeck[20],
  ];

  // adding the HTML requires for each card in each pile.
  pile1.forEach((card) => {
    // setting the pileIndex for each card.
    cardPileIndex1++;
    // addubg the card.
    pile1placement.innerHTML += `<img src="${card}" class="cardpiles">`;
    // adding a lineshift-component. Only used for styling.
    if (cardPileIndex1 === 2 || cardPileIndex1 === 5) {
      pile1placement.innerHTML += `<br class="newCardLine">`;
    }
  });
  pile2.forEach((card) => {
    cardPileIndex2++;
    pile2placement.innerHTML += `<img src="${card}" class="cardpiles">`;
    if (cardPileIndex2 === 2 || cardPileIndex2 === 5) {
      pile2placement.innerHTML += `<br class="newCardLine">`;
    }
  });
  pile3.forEach((card) => {
    cardPileIndex3++;
    pile3placement.innerHTML += `<img src="${card}" class="cardpiles">`;
    if (cardPileIndex3 === 2 || cardPileIndex3 === 5) {
      pile3placement.innerHTML += `<br class="newCardLine">`;
    }
  });
  // Display the pileSelection-buttons.
  showPileButtons(1);
}

// onClick-functions for all the 3 pileSelection-buttons.
pileSelectionButtons.forEach(function (button) {
  button.addEventListener("click", () => {
    // increase the pileSelectionCounter to identify which round we are in.
    pileSelectionCounter++;
    // If we are not ready to present the correct card, we do the following;
    if (pileSelectionCounter < 3) {
      //buttonClass is defined to identify which of the 3 buttons that are clicked.
      let buttonClass = button.parentElement.className;
      // if pile 1 is clicked:
      if (buttonClass === "pile1") {
        //clear the piles.
        ClearPiles();
        //Retrieve the next array of cards, buy providing getNextCardArray with the selected pile (1), and then presents it using presentPiles().
        presentPiles(getNextCardArray(1));
      } else if (buttonClass === "pile2") {
        ClearPiles();
        presentPiles(getNextCardArray(2));
      } else if (buttonClass === "pile3") {
        ClearPiles();
        presentPiles(getNextCardArray(3));
      }
    } else {
      // When we are ready to present the correct card:
      // Extracts the pile number from the button-name selected.
      let CorrectPile = getNextCardArray(
        button.parentElement.className.replace("pile", "")
      );
      // Calls the function to present the card and provdes the 11th. card (index 10), which is the right one.
      presentCorrectCard(CorrectPile[10]);
    }
  });
});

// Created this ClearPiles-function to just empty the piles, because it`s needed more than one place.
// I concidered to add more functionality to the visual "undealing" of cards, which could improve the user experience.

function ClearPiles() {
  pile1placement.innerHTML = ``;
  pile2placement.innerHTML = ``;
  pile3placement.innerHTML = ``;
}

// showPileButtons just shows or hides the 3 PileSelectionButtons.
function showPileButtons(boolean) {
  if (boolean === 1) {
    pileSelectionButtons.forEach(function (button) {
      button.style.setProperty(`display`, `inline-block`);
    });
  } else {
    pileSelectionButtons.forEach(function (button) {
      button.style.setProperty(`display`, `none`);
    });
  }
}

// getNextCardArray takes the selectedPile, puts it in the middle of the next cardDeck to deal.
function getNextCardArray(selectedPile) {
  // Defines 3 piles.
  let piles = [1, 2, 3];
  // removes the selectedPile from the pileArray.
  piles.splice(selectedPile - 1, 1);
  // The below "if" was concidered to be used as a visual "trick" to randomize which order the stacks are undealt.
  // if (Math.round(Math.random()) === 1) {
  //   piles.reverse();
  // }
  // Adds the selectedPile to the middle of the array.
  piles.splice(1, 0, selectedPile);
  // Reassigns the pilenames to be used in the next function. (these results are already defines variables)
  firstPile = "pile" + piles[0];
  selectedPile = "pile" + piles[1];
  LastPile = "pile" + piles[2];
  // creates the variable to be returned by this function. It contains the values of 3 existing variables, which is why I use the eval().
  let nextDeck = eval(firstPile).concat(eval(selectedPile), eval(LastPile));
  // Returns the variable with the new order of cardPiles.
  return nextDeck;
}

// presentCorrectCards is triggered when we are ready to present the card.
function presentCorrectCard(correctCard) {
  // remove the card piles.
  ClearPiles();
  // Hides the pilebuttons.
  showPileButtons(0);
  // Reveals the card along with the text presented.
  mainheaderHTML.innerHTML = `According to my intelligence this is your card...`;
  mainheaderHTML.style.setProperty(`display`, `flex`);
  correctCardHTML.innerHTML += `<img src="${correctCard}" class="correctCard">`;
}
