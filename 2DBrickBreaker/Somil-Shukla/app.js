//Create variables to reference and store canvas 
let canvas = document.getElementById('mycanvas');
let ctx = canvas.getContext('2d');
let ballRadius = 10;
let x = canvas.width/2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
//create the paddle
let paddleHeight = 12;
let paddleWidth = 72;
//specify starting point of paddle
let paddleX = (canvas.width-paddleWidth)/2;
//holding variables for right and left arrows on keyboard
let rightPressed=false;
let leftPressed=false;
//holding variables for bricks
let brickRowCount = 4;
let brickColumnCount = 7;
let brickWidth = 72;
let brickHeight = 24;
let brickPadding = 12;
let brickOffsetTop = 32;
let brickOffsetLeft = 32;
//Create variables to take score
let score = 0;

//Creating arrays for the bricks
let bricks = [];
for (c =0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++){
        //set the x and y position of the bricks
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//Anchor paddle movement to mouse movement
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function keyDownHandler(e){
    if(e.keyCode === 39){
        rightPressed = true;
    }
    else if (e.keyCode === 37){
        leftPressed = true;
    }
}
function keyUpHandler(e){
    if(e.keyCode === 39){
        rightPressed = false;
    }
    else if (e.keyCode === 37){
        leftPressed = false;
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2); //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}
//Create a function to create the paddle
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight); //centered at (x,y) position with radius r = ballRadius starting at 0 = startAngle, ending at Math.PI*2 = endAngle (in Radians)
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
}
//Create a function to draw the bricks
function drawBricks(){
    for(c=0; c < brickColumnCount; c++){
        for(r=0; r < brickRowCount; r++){
            if(bricks[c][r].status === 1){
                let brickX = (c* (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r* (brickHeight+brickPadding)) + brickOffsetTop;
                bricks[c][r].x=brickX;
                bricks[c][r].y=brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = '#6600cc';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//Create function to keep track of score
function drawScore(){
    ctx.font = '18px Arial';
    ctx.fillStyle = 'brown';
    ctx.fillText('score: '+ score, 8, 20); //position score at 8,20 on the x,y axis of the canvas
}

//Collision dections for the bricks
function collisionDetection(){
    for(c=0; c<brickColumnCount;c++){
        for(r=0; r<brickRowCount; r++){
            let b = bricks[c][r];
            if(b.status === 1){
                if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount*brickColumnCount){
                        alert('Congratulations!! You\'ve won!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}
function draw(){
    //clear each instance of the canvas so a new circle can be drawn
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawScore();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    //Calculate collision detections
    //left and right walls
    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //top walls
    if(y + dy < ballRadius){
        dy = -dy;
    }
    else if (y + dy > canvas.height-ballRadius){
        //detect paddle hits
        if(x > paddleX && x < paddleX + paddleWidth){
            dy=-dy;
        }
        //if no paddle hit, body of canvas is hit ==> game over
        else {
            alert('GAME OVER!!');
            document.location.reload();
        }
    }
    //bottom wall
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }
    //Make paddle move
    if(rightPressed && paddleX <canvas.width-paddleWidth){
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    //Making the ball move
    x +=dx; //update x movement every frame
    y +=dy; //update y movement every frame
}

//Create an infinite loop that creates the ball
//paints the ball on the canvas every 10 milliseconds.
setInterval(draw, 10) 


//Notes
//Using HTML Canvas
//Understanding HTML Coordinates 
//Web APIs - https://developer.mozilla.org/en-US/docs/Web/API
// Drawing shapes with Canvas: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
//MDN BrickerBreaker Tutorial  https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript



