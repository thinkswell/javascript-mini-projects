let boxOne = document.querySelector('.first');
let boxTwo = document.querySelector('.second');
function randomColor(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
return `rgb(${r},${g},${b})`
}
function firstBox(){
    boxOne.style.backgroundColor = randomColor();
}

boxOne.addEventListener('click',firstBox);

function secondBox(){
    boxTwo.style.backgroundColor = randomColor();
}

boxTwo.addEventListener('mousemove',secondBox);