let userscore = 0;
let compscore = 0;
const userscore_div = document.getElementById("userscorebox");
const compscore_div = document.getElementById("computerscorebox");
const rock_div = document.querySelector(".buttonR");
const paper_div = document.querySelector(".buttonP");
const scissors_div = document.querySelector(".buttonS");

function getcomputerchoice() {
    const choices = ['r', 'p', "s"];
    const randomnumber = Math.floor(Math.random() * 3);
    return(choices[randomnumber]);
}
function win(userchoice,computerchoice) {
    userscore++;
    userscore_div.innerHTML = userscore;
    compscore_div.innerHTML = compscore;
    document.getElementById("resultmessage").innerHTML = "YOU WIN!... you got "+convert(userchoice)+" and the computer got "+convert(computerchoice);
}
function lose(userchoice,computerchoice) {
    compscore++;
    userscore_div.innerHTML = userscore;
    compscore_div.innerHTML = compscore;
    document.getElementById("resultmessage").innerHTML = "YOU LOSE!... you got "+convert(userchoice)+" and the computer got "+convert(computerchoice);
}
function tied(userchoice,computerchoice) {
    document.getElementById("resultmessage").innerHTML = "MATCH TIED!... you got "+convert(userchoice)+" and the computer got "+convert(computerchoice);
}

function convert(userchoice,computerchoice) {
    if(userchoice === "r"){
        return("ROCK");
    }
    else if(userchoice === "p"){
        return("PAPER");
    }
    else{
        return("SCISSORS");
    }
    if(computerchoice === "r"){
        return("ROCK");
    }
    else if(computerchoice === "p"){
        return("PAPER");
    }
    else{
        return("SCISSROS");
    }
}




function game(userchoice) {
    const computerchoice = getcomputerchoice();
    switch(userchoice + computerchoice) {
        case "rs":
        case "sp":
        case "pr": win(userchoice,computerchoice);
                 break;
        case "rp":
        case "ps":
        case "sr": lose(userchoice,computerchoice);
                 break;
        case "rr":
        case "pp":
        case "ss": tied(userchoice,computerchoice);
                 break;                                   
    }
}

function main() {
    rock_div.addEventListener('click', function() {
        game("r");
    })
    paper_div.addEventListener('click', function() {
        game("p")
    })
    scissors_div.addEventListener('click' , function() {
        game("s")
    })
}

main();



























