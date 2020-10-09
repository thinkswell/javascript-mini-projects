let time;
let sound=document.getElementById("clicksound");
let butt=document.createElement("button");
let lbe=[],lbh=[];

function Move() {
  let elem = document.querySelectorAll(".button");
  let pos =[0,0,0,0,0,0,0,0,0,0,0,0];
  let id = setInterval(frame,20);
  function frame() {
   for(let i=0;i<=11;i++)
  { if(i>=4&&i<=7)
   { let j=i%4;
     if (pos[i]==(-66*(j+1))){
       pos[i]=66*(4-j-1);
     } else {
       pos[i]--;
       elem[i].style.left = pos[i] + 'px';
    }
  }
   else
  {  let j=i%4;
    if (pos[i]==(264-66*j)) {
      pos[i]=-(66*j);
    } else {
      pos[i]++;
      elem[i].style.left = pos[i] + 'px';
    }
  }
}
}
}

function changeValue() {
  let x=(++value/100)
  document.getElementById("demo").innerHTML =(Number.parseFloat(x).toFixed(2))+"s";
  time=Number.parseFloat(x).toFixed(2);
}

let timerInterval = null;

function start() {
  stop();
  value = 0;
  timerInterval = setInterval(changeValue,10);
}

let stop = function() {
  clearInterval(timerInterval);
  value=0;
}

function btcolor(button){

  if(document.getElementById("easy").checked)
  {
    button.style.opacity=(1-((13-button.innerHTML)*0.02));
  }
  else {
    button.style.opacity=(1-((25-button.innerHTML)*0.01));
  }
}

for (let btno=12; btno>1; btno--)
  {    let index = (Math.floor(Math.random()*btno)+1);
    let a = document.getElementById("b"+index).innerHTML;
    document.getElementById("b"+index).innerHTML= document.getElementById("b"+btno).innerHTML;
    document.getElementById("b"+btno).innerHTML = a;
  }

for(let i=1;i<=12;i++)
{
  btcolor(document.getElementById("b"+i));
}

function toeasy(){
  if(time==undefined)
  {document.getElementById("easy").checked=true;
    for(let i=1;i<6;i++)
     document.getElementById("p"+i).innerHTML=localStorage.getItem("e"+i);
     document.getElementById("lbsign").innerHTML="Leaderboard-Easy Mode";
     document.getElementById("lbsign").style.textDecoration="underline";
     for(let i=1;i<=12;i++)
        btcolor(document.getElementById("b"+i));
   }
  else {
    window.location.reload();
  }
}

Move();

function tohard(){
  if(time==undefined)
  {document.getElementById("hard").checked=true;
    for(let i=1;i<6;i++)
     document.getElementById("p"+i).innerHTML=localStorage.getItem("h"+i);
     document.getElementById("lbsign").innerHTML="Leaderboard-Hard Mode";
     document.getElementById("lbsign").style.textDecoration="underline";
     for(let i=1;i<=12;i++)
        btcolor(document.getElementById("b"+i));
   }
   else {
     window.location.reload();
   }
}

let clickcheck=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let newnum=[13,14,15,16,17,18,19,20,21,22,23,24];

for(let k=11;k>-1;k--)
{
  let t=Math.floor((Math.random()*k));
  let a=newnum[t];
  newnum[t]=newnum[k];
  newnum[k]=a;
}

function updatelbe(){
  for(let i=1;i<6;i++)
     if(localStorage.getItem("e"+i)!="null"&&localStorage.getItem("e"+i)!="undefined")
        lbe[i-1]=localStorage.getItem("e"+i);
   lbe.push(time);
   lbe.sort(function(a, b){return a - b});
   lbe.splice(5);
   for(let i=1;i<6;i++)
      window.localStorage.setItem("e"+i,lbe[i-1]);
  for(let i=1;i<6;i++)
      document.getElementById("p"+i).innerHTML=localStorage.getItem("e"+i);
}

function updatelbh(){
  for(let i=1;i<6;i++)
     if(localStorage.getItem("h"+i)!="null"&&localStorage.getItem("h"+i)!="undefined")
        lbh[i-1]=localStorage.getItem("h"+i);
   lbh.push(time);
   lbh.sort(function(a, b){return a - b});
   lbh.splice(5);
   for(let i=1;i<6;i++)
      window.localStorage.setItem("h"+i,lbh[i-1]);
   for(let i=1;i<6;i++)
      document.getElementById("p"+i).innerHTML=localStorage.getItem("h"+i);
}

function btclick(button){
if(document.getElementById("easy").checked)
{  sound.currentTime=0;
  sound.play();

  if(button.innerHTML==1)
  {    start();
    clickcheck[button.innerHTML]=1;
    button.innerHTML="";
  }

  else if(button.innerHTML==12)
  {      if(clickcheck[button.innerHTML-1]==1)
      {
        updatelbe();
        stop();
        clickcheck[button.innerHTML]=1;
        button.innerHTML="";
      }
  }
  else
    {       if(clickcheck[button.innerHTML-1]==1)
       {
         clickcheck[button.innerHTML]=1;
         button.innerHTML="";
       }
    }
  }

else if(document.getElementById("hard").checked){
{
  sound.currentTime=0;
  sound.play();
  if(button.innerHTML==1)
  {
    start();
    clickcheck[button.innerHTML]=1;
    button.innerHTML=newnum[button.innerHTML-1];
    btcolor(button);
  }
  else if(button.innerHTML==24)
  {
    if(clickcheck[button.innerHTML-1]==2)
    { updatelbh();
      stop();
    clickcheck[button.innerHTML]=2;
    button.innerHTML="";
        }
  }

  else if(button.innerHTML==12)
  {
    if(clickcheck[button.innerHTML-1]==1)
    {clickcheck[button.innerHTML]=2;
    button.innerHTML=newnum[button.innerHTML-1];
    btcolor(button);
    }
  }
  else {
      if(clickcheck[button.innerHTML-1]==1)
      {
        clickcheck[button.innerHTML]=1;
        button.innerHTML=newnum[button.innerHTML-1];
        btcolor(button);
      }
      else if(clickcheck[button.innerHTML-1]==2)
      {
        clickcheck[button.innerHTML]=2;
        button.innerHTML="";
      }
  }
}
}

else{
  alert("Please select a difficulty!")
}
}
