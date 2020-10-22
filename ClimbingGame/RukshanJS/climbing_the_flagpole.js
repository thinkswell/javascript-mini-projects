var myGamePiece;
var pole = new Image();
pole.src = "poleDone.png";
var climberMan = new Image();
climberMan.src = "man.png";
//var climberMan=document.getElementById("image");
var background = new Image();
background.src = "back.jpeg";
var isGameOver=false;
const gameWidth=window.screen.availWidth*0.9;
const gameHeight=window.screen.availHeight*0.9;
var mySpriteWidth;
var mySpriteHeight;
var siteWidth = 1920;
var scale = screen.width /siteWidth;


//screen size setting. not working I guess
var siteWidth = 1920;
var scale = screen.width /siteWidth

document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'');

function startGame() {
    var HW_RATIO = gameHeight/gameWidth;
    mySpriteWidth=100*HW_RATIO;
    mySpriteHeight=100*HW_RATIO;
    myGamePiece = new mySprite(mySpriteWidth, mySpriteHeight, climberMan, gameWidth/5, gameHeight);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.getElementById("game"),
    start : function() {
        this.canvas.position="absolute";
        this.canvas.width = gameWidth;
        this.canvas.height = gameHeight;
        this.context = this.canvas.getContext("2d");
        
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        if (!isGameOver){
            this.interval = setInterval( function() { updateGameArea(); }, 20);
        }
        else{
            this.interval.clear();
        }
        
    },
    stop : function() {
        clearInterval(this.interval);
        stopAnimate();
    },   
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, 
}

function mySprite(width, height, img, x, y, type){
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = 0.1;
    this.gravitySpeed = 0;    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.drawImage(background, 0, 0, gameWidth, gameHeight);
        ctx.drawImage(pole, gameWidth/4, 0, gameWidth/2, gameHeight);
        //ctx.drawImage(img, this.x, this.y, this.width, this.height);


        //to stop animation when falling.
        if (this.gravitySpeed < 0){
            console.log("CLIMBING");
        }

        else if (this.gravitySpeed > 0 && !isAtStart){
            console.log("FALLING");
            stopAnimate();
        }
        console.log(String(this.gravitySpeed));
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        //y=this.y;
        isAtStart = false;
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y >= rockbottom) {
            myGamePiece.gravity=0;
            myGamePiece.gravitySpeed=0;
            isAtStart = true;
            this.y = rockbottom;            
            stopAnimate();
        }
    }
    this.hitTop = function() {
        var winTop = 30;//bad to hardcode. need some way to get it automatically.
        if (this.y-170 < winTop) {
            //this.y = winTop;
            alert("CONGRATULATIONS!!! YOU HAVE COMPLETED THE 'CLIMB THE FLAG POLE' CHALLENGE!!!");//exit the program.
            isGameOver=true;           
            myGameArea.stop();
        }
    }
}

function updateGameArea() {
    var x=gameWidth/2+30;
    var y=gameHeight-256;
    

    //myGameArea.clear();
    myGamePiece.newPos();
    var d = document.getElementById('image');
    d.style.position = "absolute";
    d.style.left = x+'px';
    d.style.top = myGamePiece.y-200+'px';
    d.style.height=256*scale+'px';
    d.style.width=142*scale+'px';
    /*height: 256px;
    width: 142px;*/
    myGamePiece.update();
    console.log("UPDATED GAME AREA");
}

function accelerate(n) {
    
    isClimbingUp = true;
    //animateScript();
    if (isAtStart){
        myGamePiece.gravity = -1.0;
        animateScript();
    }
    else{
        myGamePiece.gravity = n;
    }    

    //myGamePiece.gravity = n;
    var delayInMilliseconds = 50.0; //48.0 milisecond. decrease to increase difficulty. got by trial and error.
    setTimeout(function() {
        //your code to be executed after 1 second
        myGamePiece.gravity = 0.1;//initial gravity value
    }, delayInMilliseconds);  
}

//sprite animation
var tID; //we will use this variable to clear the setInterval()

function stopAnimate() {
  clearInterval(tID);
} //end of stopAnimate()

function animateScript() {
    
    var tmpWidthOfSprite = 256;
    var tmpWidthOfOneImage = 144;

    var    position = tmpWidthOfOneImage; //start position for the image slicer //width of one image
    const  interval = 200; //100 ms of interval for the setInterval()
    tID = setInterval ( () => {;
        document.getElementById("image").style.backgroundPosition = 
            `-${position}px 0px`;
        
        //we use the ES6 template literal to insert the variable "position"
        if (position < tmpWidthOfSprite)//width of sprite image
            { position = position + tmpWidthOfOneImage;}
            //we increment the position by 256 each time
        else
            { position = tmpWidthOfOneImage; }//width of one image
            //reset the position to 256px, once position exceeds 1536px
        }
    , interval ); //end of setInterval
}   //end of animateScript()













