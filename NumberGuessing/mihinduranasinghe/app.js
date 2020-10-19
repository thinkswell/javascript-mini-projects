//Game values
let  min = 1,
     max = 10,
     winningNum = getWinningNumRandom(min,max),
     guessesLeft = 3;

//UI Elements
const UIgame = document.querySelector('#game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');

//Assign UI min and max
UIminNum.textContent = min;
UImaxNum.textContent = max;

//Play again event listener
UIgame.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for guess
UIguessBtn.addEventListener('click', function(){
    let guess = parseInt(UIguessInput.value);
    //console.log(guess);

    //Validate
    if(isNaN(guess) || guess < min || guess >max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        UIguessInput.style.borderColor = 'red'; 
    }

    //Check if won
    if(guess === winningNum){
        // //Disable input
        // UIguessInput.disabled = true;
        // //Change border color
        // UIguessInput.style.borderColor = 'green';
        // //Set message
        // setMessage(`${winningNum} is correct, you win`,'green');
        gameOver(true,`${winningNum} is correct, you win`);

    }else{
        //Wrong Number
        guessesLeft = guessesLeft-1;
        if(guessesLeft===0){
            //Game Over - Lost
                //  //Disable input
                // UIguessInput.disabled = true;
                // //Change border color
                // UIguessInput.style.borderColor = 'red';
                // //Set message
                // setMessage(`${winningNum} is correct, you Lost`,'red');
                gameOver(false,`${winningNum} is correct, you Lost`);

        }else{
            //Change border color
            UIguessInput.style.borderColor = 'red';
            //clear input
            UIguessInput.value='';
            //game continues -  answer wrong 
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,'red');   
            
        }
    }

});

//Set Message
function setMessage(msg, color){
    UImessage.style.color = color;
    UImessage.textContent = msg; 
}

//game over
function gameOver(won,msg){
    let color;
    won === true ? color = 'green' : color='red';

    //Disable input
    UIguessInput.disabled = true;
    //Change border color
    UIguessInput.style.borderColor = color;
    //set text color
    UImessage.style.color=color;
    //Set message
    setMessage(msg);


    //Play again
    UIguessBtn.value = 'Play Again';
    UIguessBtn.className += 'play-again';
    
}


//get winning number randomly
function getWinningNumRandom(min,max){
    return Math.floor(Math.random()*(min-max+1)+min);
}



