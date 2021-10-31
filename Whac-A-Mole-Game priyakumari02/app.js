const squares= document.querySelectorAll('.square');
const start= document.querySelector('.startt');
const startOver= document.querySelector('.start-over');
const timeLeft= document.querySelector('.time');
const score= document.querySelector('.your-score');

let hitPosition;
let result=0;
let currentTime=60;
let timerID;
let countDownTimerId;
let temp=0;

start.addEventListener('click',startGame);
startOver.addEventListener('click',startAgain);

function startAgain(){
   $('.overlay').hide(); 
   document.body.classList.remove('overlay-is-open');
   $('.startt').show(); 
   timeLeft.textContent=60;
   score.textContent= 0;
   result=0; currentTime=60;temp=0;
}

function startGame(){
    currentTime=60;
    result=0;
    start.style.display="none";
    temp++;
    moveMole();
}

function randomSquare(){
    if(currentTime<=0){
        hitPosition=null;
        clearInterval(timerID);
        document.querySelector('#final-score').innerHTML=result;
        $('.overlay').show();
        document.body.classList.add('overlay-is-open'); 
    }
    squares.forEach(square=>{
        square.classList.remove('mole');
    })
    let randomSquare= squares[Math.floor(Math.random()*9)];
    randomSquare.classList.add('mole');

    hitPosition= randomSquare.id;
}

squares.forEach(square=>{
    square.addEventListener('mousedown',()=>{
        if(square.id==hitPosition){
            if(temp!=0)
           { result++;
            score.textContent= result;}
            hitPosition= null
        }
    })
})

function moveMole(){
    timerID= setInterval(randomSquare,500);
    countDownTimerId= setInterval(countDown,1000);
}

function countDown(){
    currentTime--;
    timeLeft.textContent= currentTime;

    if(currentTime<=0){
        clearInterval(countDownTimerId);
    }
}

