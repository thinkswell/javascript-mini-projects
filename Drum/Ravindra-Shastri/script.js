let boxC = document.querySelector('.box-container');

function randomColor(){
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    return `rgb(${r},${g},${b})`
}

function randomNumber(){
    let num = Math.floor(Math.random() * 500);
    return num
}

function number1(){
    boxC.innerHTML='';
    for(let i = 1;i < 500; i++){
        const box = document.createElement('div');
        box.setAttribute('class','box');
        box.style.background = randomColor();
        box.innerText = randomNumber();
        boxC.append(box);
    }
}
boxC.addEventListener("mousemove",number1);
number1();



