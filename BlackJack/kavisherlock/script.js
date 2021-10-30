var suits = ['♠', '♣', '♥', '♦'];
var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
var deck = [];
var dealer = {};
var players = [];
var showDealerHand = false;
var playerWins = 0;

function createDeck() {
  deck = [];
  for (var suit of suits) {
    for (var value of values) {
      var card = {
        suit, value, weight: isNaN(parseInt(value, 10)) ? (value === 'A' ? 11 : 10) : parseInt(value, 10)
      }
      deck.push(card);
    }
  }
}

function setHand(card) {
  this.hand.push(card);
  if (card.value === 'A') this.unusedAces += 1
  this.points += card.weight;
  if ((this.unusedAces > 0 || (this.id === 'dealer' && this.unusedAces > 1)) && this.points > 21) {
    this.unusedAces -= 1;
    this.points -= 10;
  }
  var el = document.createElement('div');
  var elText = document.createElement('div');
  el.className = 'card';
  if (card.suit === '♥' || card.suit === '♦') el.classList.add('card-red');
  elText.innerHTML = card.suit + ' ' + card.value;
  if (this.id === 'dealer' && !showDealerHand && this.hand.length > 1) {
    elText.style.visibility = 'hidden';
    elText.id = 'hidden-card';
  } 
  if (this.id !== 'dealer' || showDealerHand) {
    document.getElementById('points_' + this.id).innerHTML = this.points;
  }
  el.appendChild(elText);
  document.getElementById('hand_' + this.id).appendChild(el);
}

function createPlayers() {
  var player = {
    id: 1,
    unusedAces: 0,
    name: 'Player',
    hand: [],
    points: 0,
    setHand,
  };
  dealer = {
    id: 'dealer',
    unusedAces: 0,
    name: 'Dealer',
    hand: [],
    points: 0,
    setHand,
  };
  players = [player];
}

// Fisher–Yates shuffle
function shuffle() {
  var cardInd = deck.length, swapInd;
  // While there remain elements to shuffle
  while (cardInd) {
    // Pick a remaining element
    swapInd = Math.floor(Math.random() * cardInd);
    cardInd -= 1;
    // And swap it with the current element
    var temp = deck[cardInd];
    deck[cardInd] = deck[swapInd];
    deck[swapInd] = temp;
  }
}

function createPlayersUI() {
  document.getElementById('hand_dealer').innerHTML = '';
  document.getElementById('players').innerHTML = '';
  for(var player of players) {
    var divPlayer = document.createElement('div');
    var divPlayerName = document.createElement('div');
    var divHand = document.createElement('div');
    var divPoints = document.createElement('div');
    var divWins = document.createElement('div');

    divPoints.className = 'points';
    divPoints.id = 'points_' + player.id;
    divWins.className = 'wins';
    divWins.id = 'wins_' + player.id;
    divPlayer.className = 'player';
    divPlayer.id = 'player_' + player.id;
    divHand.id = 'hand_' + player.id;

    divPlayerName.innerHTML = player.name;
    divPlayer.appendChild(divPlayerName);
    divPlayer.appendChild(divHand);
    divPlayer.appendChild(divPoints);
    document.getElementById('players').appendChild(divPlayer);
    divWins.innerHTML = 'Wins: ' + playerWins;
    document.getElementById('players').appendChild(divWins);
  }
}

function resetElements() {
  document.getElementById('game').classList.add("game-started");
  document.getElementById('status').innerHTML = '';
  document.getElementById('dealer').classList.remove("dealer-asleep");
  var hitBtn = document.getElementById('hit-btn');
  hitBtn.classList.remove('btn-disabled');
  hitBtn.disabled = false;
  var stayBtn = document.getElementById('stay-btn');
  stayBtn.classList.remove('btn-disabled');
  stayBtn.disabled = false;
  document.getElementById('status').style.display = 'none';
  document.getElementById('points_dealer').innerHTML = '';
  showDealerHand = false;
}

function dealHands() {
  for (var i = 0; i < 2; i += 1) {
    for (var p = 0; p < players.length; p += 1) {
      players[p].setHand(deck.pop());
    }
    dealer.setHand(deck.pop());
  }
  if (players[0].points === 21) {
    endGame(true)
  }
}

function startGame(isReset) {
  console.log(deck.length);
  if (isReset || deck.length < 10) {
    createDeck();
    shuffle();
    playerWins = 0;
  }
  var dealButton = document.getElementById('deal-btn');
  dealButton.classList.add('btn-disabled');
  dealButton.disabled = true;
  createPlayers();
  createPlayersUI();
  resetElements();
  dealHands();
}

function hit() {
  console.log('hit', players[0]);
  players[0].setHand(deck.pop());
  if (players[0].points > 21) {
    endGame();
  }
}

function stay() { 
  showDealerHand = true;
  document.getElementById('hidden-card').style.visibility = 'visible';
  console.log(dealer);
  document.getElementById('points_dealer').innerHTML = dealer.points;

  while (dealer.points < 17) {
    dealer.setHand(deck.pop());
  }
  endGame()
}

function endGame(isBlackJack) {
  const player = players[0];
  var hitBtn = document.getElementById('hit-btn');
  hitBtn.classList.add('btn-disabled');
  hitBtn.disabled = true;

  var stayBtn = document.getElementById('stay-btn');
  stayBtn.classList.add('btn-disabled');
  stayBtn.disabled = true;

  var dealButton = document.getElementById('deal-btn');
  dealButton.classList.remove('btn-disabled');
  dealButton.disabled = false;

  document.getElementById('status').style.display = 'inline-block';

  if (isBlackJack) {
    document.getElementById('status').innerHTML = 'BLACKJACK. YA WON';
    playerWins += 1
  } else if (player.points > 21) {
    document.getElementById('status').innerHTML = 'BUSTED';
  } else if (dealer.points > 21 || dealer.points < player.points) {
    document.getElementById('status').innerHTML = 'YA WON';
    playerWins += 1
  } else if (dealer.points > player.points) {
    document.getElementById('status').innerHTML = 'YA LOST';
  } else {
    document.getElementById('status').innerHTML = 'TIED';
  }
  document.getElementById('wins_' + player.id).innerHTML = 'Wins: ' + playerWins;
}
