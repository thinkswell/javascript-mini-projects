    'use strict';

    const btnAgain = document.querySelector(".again");
    const randNum = document.querySelector(".number");
    const guessNum = document.querySelector(".guess");
    const btnCheck = document.querySelector(".check");
    const score = document.querySelector(".score");
    const highscore = document.querySelector(".highscore");
    const message = document.querySelector(".message");

    btnAgain.addEventListener('click',resetAll);
    btnCheck.addEventListener('click',checkTwo);

    function genRandom() {
        return  Math.floor((Math.random() * 20) + 1);   
    }

    function compare(a,b){
        if(a === b){
            return 'yes';
        }else if(a > b){
            if(a-b > 5){
                return 'low';
            }else{
                return 'close';
            }
        }else{
            if(b-a > 5){
                return 'high';
            }else{
                return 'close';
            }
        }
    }

    var randGen = Number(genRandom());
    score.innerText = 20;
    highscore.innerText = 0;

    function checkTwo(){
        var guessed = Number(guessNum.value);  
        
        var result = compare(randGen,guessed);
        
        if(result === 'yes' ){
            message.innerText = "You legend";
            randNum.innerText = randGen;
            if(Number(highscore.innerText) < Number(score.innerText)){
                highscore.innerText = score.innerText;
            }
            
            
        }else{
            message.innerText = result;
            score.innerText = Number(score.innerText) - 1;
        }
    }

    function resetAll(){
        score.innerText = 20;
        randGen = Number(genRandom());
        message.innerText = "Start guessing...";
        guessNum.value = ''
        randNum.innerText = '?'
    }













