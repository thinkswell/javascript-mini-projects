var userGuess = document.querySelector(".guess-number");
var btn = document.querySelector(".btn");
var output = document.querySelector(".otp");

btn.addEventListener("click", ()=>{
    var guessedNumber = Number(userGuess.value);
    if((guessedNumber >= 1) && (guessedNumber <= 100)){
         var generatedRandomNumber = Math.floor((Math.random() * 100) + 1);
         if(guessedNumber === generatedRandomNumber){
             output.innerHTML = "Hurray!You guessed it right.🎉";
         }else{
             if(generatedRandomNumber > guessedNumber){
                 output.innerHTML = "Oops!You missed it. Your guess is too low.";
             }else{
                 if(generatedRandomNumber < guessedNumber){
                     output.innerHTML = "Ooops!You missed it. Your guess is too high.";
                 }
             }
         }
    }else
    {
    output.innerHTML = "Make a guess between 1 to 100";
    }
});