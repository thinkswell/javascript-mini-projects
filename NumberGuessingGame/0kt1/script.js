$(document).ready(function () {
    
    let guessCount = 0;
    const guessedNumbers = [];

    
    function updateGuessDisplay() {
        $('#guessCount').text(guessCount);
        $('#guessedNumbers').text(guessedNumbers.join(', '));
    }

    
    $('#submitGuess').click(function () {
        
        const guess = parseInt($('#guessInput').val());

        if (guess === randomNumber) {
            $('#feedback').text('Congratulations! You guessed the correct number.');
            $('#feedback').addClass('green-feedback'); 
            $('#guessInput').prop('disabled', true); 
            $('#submitGuess').prop('disabled', true); 
        } else if (guess < randomNumber) {
            document.getElementById("feedback").innerHTML = "Too low. Try again.";
            document.getElementById("feedback").style.color = "red";
        } else {
            document.getElementById("feedback").innerHTML = "Too high. Try again.";
            document.getElementById("feedback").style.color = "red";
        }

        guessedNumbers.push(guess);

        guessCount++;
        updateGuessDisplay();

        
    });


    const randomNumber = Math.floor(Math.random() * 100) + 1;


});
