const cards = document.querySelectorAll(".memoryCard")
var cardFlipped = false;
var firstCard, secondCard
var lockBorad=false

function flipcard() {
    if(lockBorad) return
    if(this===firstCard) return
    this.classList.add("flip")
    if (!cardFlipped) {
        firstCard = this
        cardFlipped = true

    }
    else {
        secondCard = this
        cardFlipped = false
        match()
    }

}

function match() {
    if (firstCard.dataset.name == secondCard.dataset.name) {
        firstCard.removeEventListener("click", flipcard)
        secondCard.removeEventListener("click", flipcard)
    }
    else {
        lockBorad=true
        setTimeout(() => {
            lockBorad=true
            firstCard.classList.remove("flip")
            secondCard.classList.remove("flip")
            lockBorad=false
        }, 500);
        
    }
}
cards.forEach(element=>{
    var pos=Math.floor(Math.random()*11)
    element.style.order=pos
})

cards.forEach(element => {
    element.addEventListener("click", flipcard)
});
