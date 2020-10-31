window.onload=fun;

function fun(){
  const sound=document.querySelectorAll(".sound");
const visual=document.querySelector(".visual");
const pads=document.querySelectorAll(".play");
const pause=document.querySelectorAll(".pla");
var color=[
"#60d394","#c060d3","#d36060","#d3d160","#c060d3"
];

pads.forEach((v,index)=>{
console.log(index);
v.addEventListener('click',function(){
sound[index].currentTime=0;
sound[index].play();
v.classList.toggle('pow');
bubbles(index);
  });

});
function bubbles(index){
  const vis=document.createElement("div");
  visual.appendChild(vis);

  vis.style.backgroundColor=color[index];
  vis.style.animation="jump 1s infinite";
  vis.addEventListener("animationend",function(){
visual.removeChild(this);

    });
}
pause.forEach((v,index)=>{
v.addEventListener('click',function(){

sound[index].pause();

v.classList.toggle('add');
  });


  });
}
