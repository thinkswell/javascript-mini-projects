const diceContainer = document.querySelector(".dice-container");
const btnRollDice = document.querySelector(".btn-roll-dice");
const reset = document.querySelector(".reset");
const total = document.querySelector(".total");


//Initial set of all 0 dice
function initialize() {
    diceContainer.innerHTML = "";
    const dice4 = createDice('R');
    dice4.classList.add("d4")
    diceContainer.appendChild(dice4);
    const dice6 = createDice('O');
    dice6.classList.add("d6")
    diceContainer.appendChild(dice6);
    const dice8 = createDice("L");
    dice8.classList.add("d8")
    diceContainer.appendChild(dice8);
    const dice10 = createDice("L");
    dice10.classList.add("d10")
    diceContainer.appendChild(dice10);
    const dice12 = createDice("E");
    dice12.classList.add("d12")
    diceContainer.appendChild(dice12);
    const dice20 = createDice("M");
    dice20.classList.add("d20")
    diceContainer.appendChild(dice20);
    total.innerText = 0
}

initialize()



function createDice(number) {
    const die = document.createElement("div");
    die.classList.add("die")
    die.innerText = number;

    return die;
}

function randomizeDice(diceContainer, numberOfDice, size) {
    diceContainer.innerHTML = "";
    total.innerText = null;
    let diceTotal = 0
    const modifier = parseInt(document.querySelector(".modifier").value);
    for (let i = 0; i < numberOfDice; i++) {
        let faces = size.split("d")[1]
        if (faces == 100) {
            let random = Math.round((Math.random() * (100 - 10) + 10) / 10) * 10;
            let dice = createDice(random);
            faces = 10;
            dice.classList.add(`d${faces}`)
            diceContainer.appendChild(dice);
            diceTotal += random;
        } else {
            let random = Math.floor((Math.random() * faces) + 1);
            let dice = createDice(random);
            dice.classList.add(`d${faces}`)
            diceContainer.appendChild(dice);
            diceTotal += random;
        }
    }
    if (modifier > -1) {
        const die = document.createElement("div");
        die.classList.add("die")
        die.innerText = `+${modifier}`;
        diceContainer.appendChild(die);
    } else {
        diceContainer.appendChild(createDice(modifier))
    }
    diceTotal += modifier
    total.innerText = diceTotal
}

btnRollDice.addEventListener("click", () => {
    if (document.querySelector(".numberOfDice").value) {
        let numberOfDice = document.querySelector(".numberOfDice").value
        let dieSize = document.getElementById("dieSize").value;
        randomizeDice(diceContainer, numberOfDice, dieSize);
    } else {
        alert("Please enter the number of dice you wish to roll.")
    }
})

reset.addEventListener("click", () => {
    initialize()
    document.querySelector(".numberOfDice").value = null;
    document.getElementById("dieSize").value = "d4";
    document.querySelector(".modifier").value = null;
})