//Game values
let  min = 1,
     max = 10,
     winningNum = Math.abs(getWinningNumRandom(min,max)),
    guessesLeft = 3;
     
if (winningNum % 2 == 0)
    var isEven= "Even";
else var isEven = "Odd";
        
//UI Elements
const UIgame = document.querySelector('#game'),
      UIminNum = document.querySelector('.min-num'),
      UImaxNum = document.querySelector('.max-num'),
      UIguessBtn = document.querySelector('#guess-btn'),
      UIguessInput = document.querySelector('#guess-input'),
      UImessage = document.querySelector('.message');
      UIhint = document.querySelector('.hint');

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

    //Absolute Difference
    var diff = Math.abs(guess-winningNum);

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
            UIguessInput.value = '';
            
            //game continues -  answer wrong 
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red'); 
            
            //Giving Hints
            if (diff >= 5)
                var diffHint = "User has chosen too big number";
            else
                var diffHint = "User is close to the number";
            setHint(`HINT : Correct number is a ${isEven} number. ${diffHint}`,'green');   
            
        }
    }

});

//Set Message
function setMessage(msg, color){
    UImessage.style.color = color;
    UImessage.textContent = msg; 
}
function setHint(msg, color){
    UIhint.style.color = color;
    UIhint.textContent = msg; 
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



