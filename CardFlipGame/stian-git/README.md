# Cardtrick - [https://cardtrick.tekniskpotet.no](https://cardtrick.tekniskpotet.no)

## by [Stian Martinsen](https://www.linkedin.com/in/stian-martinsen-1662a515/), 2021

**Screenshots:**

![Instructions](img/1-Instructions.jpg "Instructions")
![Choose pile](img/2-Choosepile.jpg "Choose pile")
![Reveal card](img/3-Revealcard.jpg "Reveal card")

---

**Intro:**
My first own JavaScript-project. Created before I have had any classes of JavaScript, so there is probably some rookie-mistakes.
The idea came up when one of my teachers (https://codepen.io/mjphillip) introduced me to the deckofcards API, when he showed how to make a BlackJack-game:

**Goals:**

- Use JavaScript to create a card trick.
- Get some experience on async functions.
- Use the API from http://deckofcardsapi.com/.

**Why this trick?**

- I selected this trick because it is easy, and there is no cheating. In theory you could use your own deck and follow along during the trick.
- By adding animations on dealing and undealing of the cards, I probably could have improved the user experience even more, but the trick is still the same.

---

**Some comments and questions after creating the project:**

_How much info should be put in the HTML?_

_I probably should have added some error handling when the API-call fails?_

During the API-call I get a result of "arrays in arrays" (see below) and I can easily grab the array of "cards", but doing the same with the inner array to get the "image" did not work as expected. I expect there to be a simpler way to store the correct value directly in the cards-variable, but I used a workaround that iterates a push of each value and did not bother to look more into it.

_Is there a better way to fetch the image-property directly into a new array?_

---

```{
"success": true,
"deck_id": "bvswbt1xf380",
"cards": [
	{"code": "0D", "image": "https://deckofcardsapi.com/static/img/0D.png", "images": {"svg": "https://deckofcardsapi.com/static/img/0D.svg", "png": "https://deckofcardsapi.com/static/img/0D.png"}, "value": "10", "suit": "DIAMONDS"},
	{"code": "KS", "image": "https://deckofcardsapi.com/static/img/KS.png", "images": {"svg": "https://deckofcardsapi.com/static/img/KS.svg", "png": "https://deckofcardsapi.com/static/img/KS.png"}, "value": "KING", "suit": "SPADES"},
	{"code": "0S", "image": "https://deckofcardsapi.com/static/img/0S.png", "images": {"svg": "https://deckofcardsapi.com/static/img/0S.svg", "png": "https://deckofcardsapi.com/static/img/0S.png"}, "value": "10", "suit": "SPADES"},
"remaining": 31
}
```

_Each pile got its own array of cards. Maybe there is a simpler way than I have used to define these?_

```
pile1 = [
    CardDeck[0],
    CardDeck[3],
    CardDeck[6],
    CardDeck[9],
    CardDeck[12],
    CardDeck[15],
    CardDeck[18],
];
```
