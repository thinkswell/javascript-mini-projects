let gameSeq=[];
let userSeq=[];
let btns=["grey","pastel","red","blue"];
let started=false;
let level=0;
let h2=document.querySelector("h2");
document.addEventListener("keypress",function(){
    if(started==false)
    {
        console.log("Game stared");
        started=true;
        levelUp();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add("user");
    setTimeout(function(){
        btn.classList.remove("user");
    },250);
}
function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`LEVEL ${level}`;
    let randIndx=Math.floor(Math.random()*3);
    let randomColor=btns[randIndx];
    let randBtn=document.querySelector(`.${randomColor}`);
    // console.log(randIndx);
    // console.log(randomColor);
    // console.log(randBtn);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}
function checkAns(idx){
   // console.log("Curretnt level ",level);
  
   if(userSeq[idx]==gameSeq[idx])
   {
    if(userSeq.length==gameSeq.length)
    {
        setTimeout(levelUp,1000);
    }
   }
else{
    h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
    },150)
   reset();
}
}


function btnPress()
{
    
    
   let butn=this;
  userFlash(butn);
  userColor=butn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}
function reset()
{
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0; 
}