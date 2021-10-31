

    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;
    var buttonColors = ["red","blue","green","yellow"];
    var started = false;

    function nextSequence(){
        level++;
        $("#level-title").text("Level "+level);
        var randomNumber = Math.floor(Math.random()*4);
        var randomChosenColor = buttonColors[randomNumber];

        gamePattern.push(randomChosenColor);

        var randomButton = $("#"+randomChosenColor);
        playSound(randomChosenColor);
        animatePress(randomChosenColor);
        randomButton.animate({opacity:0.1});
        setTimeout(function(){
            randomButton.animate({opacity:1});
        },100);
        userClickedPattern = [];
        
        
    }
    
    
    

    function playSound(name){
        var audio = new Audio("sounds/"+name+".mp3");
        audio.play();
    }
    
    function animatePress(currentColor){
        $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");
        },100);

    }

    $(document).keypress(function() {
        if (!started) {
          $("#level-title").text("Level " + level);
          nextSequence();
          started = true;
        }
      });
    
    $("#start").click(function() {
      if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
      }
    }); 
            
    
        
    $(".btn").click(function(){
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    });

            
    
    

    function checkAnswer(currentLevel) {

        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
          if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
        } else {
          playSound("wrong");
          $("body").addClass("game-over");
          $("#level-title").text("Game Over, Click on 'Start' to Restart");
    
          setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
    
          startOver();
        }
    }


    function startOver(){
        gamePattern = [];
        level = 0;
        started = false;
    }
