// Define the Uno card deck
const colors = ["Red", "Green", "Blue", "Yellow"];
const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Skip", "Reverse", "Draw Two"];
const specialCards = ["Wild", "Wild Draw Four"];

const deck = [];
colors.forEach(color => {
  values.forEach(value => {
    deck.push({ color, value });
    deck.push({ color, value });
  });
  specialCards.forEach(special => {
    deck.push({ color, value: special });
  });
});

// Function to shuffle the Uno deck
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Function to deal cards to players
function dealCards(numPlayers, numCards) {
  const playerHands = new Array(numPlayers).fill([]).map(_ => []);
  for (let i = 0; i < numCards; i++) {
    for (let player = 0; player < numPlayers; player++) {
      const card = deck.pop();
      playerHands[player].push(card);
    }
  }
  return playerHands;
}

// Function to check if a card can be played
function canPlay(card, topCard) {
  return card.color === topCard.color || card.value === topCard.value;
}

// Function to simulate a basic Uno game
function unoGame(numPlayers) {
  shuffleDeck(deck);
  const playerHands = dealCards(numPlayers, numCards = 7);
  let currentPlayer = 0;
  let topCard = deck.pop();

  // Determine the initial player (e.g., the one with a matching card)
  for (let i = 0; i < playerHands.length; i++) {
    if (playerHands[i].some(card => canPlay(card, topCard))) {
      currentPlayer = i;
      break;
    }
  }

  while (true) {
   
const playerHand = playerHands[currentPlayer];
    console.log(`Top card: ${topCard.color} ${topCard.value}`);
    console.log(`Player ${currentPlayer + 1}'s turn`);
    console.log("Your hand:");
    playerHand.forEach((card, index) => {
      console.log(`${index + 1}: ${card.color} ${card.value}`);
    });

    const playableIndices = playerHand.reduce((indices, card, index) => {
      if (canPlay(card, topCard)) {
        indices.push(index);
      }
      return indices;
    }, []);

    if (playableIndices.length > 0) {
      const cardIndex = prompt("Enter the number of the card you want to play: ") - 1;
      if (playableIndices.includes(cardIndex)) {
        const playedCard = playerHand.splice(cardIndex, 1)[0];
        topCard = playedCard;

        // Handle special cards (Skip, Reverse, Draw Two, Wild Draw Four)
        switch (playedCard.value) {
          case "Reverse":
            currentPlayer = (currentPlayer - 1 + numPlayers) % numPlayers;
            break;
          case "Skip":
            currentPlayer = (currentPlayer + 2) % numPlayers;
            break;
          case "Draw Two":
            currentPlayer = (currentPlayer + 1) % numPlayers;
            playerHands[currentPlayer].push(...deck.splice(0, 2));
            break;
          case "Wild Draw Four":
            currentPlayer = (currentPlayer + 1) % numPlayers;
            playerHands[currentPlayer].push(...deck.splice(0, 4));
            break;
        }
      } else {
        console.log("You can't play that card.");
      }
    } else {
      console.log("No playable cards. Drawing a card.");
      playerHand.push(deck.pop());
    }

    if (playerHand.length === 0) {
      console.log(`Player ${currentPlayer + 1} wins!`);
      break;
    }

    currentPlayer = (currentPlayer + 1) % numPlayers;
  }
}

// Start the Uno game with 3 players
const numPlayers = 3;
unoGame(numPlayers);




