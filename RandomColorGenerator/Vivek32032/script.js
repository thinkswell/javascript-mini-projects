let firstBox = document.querySelector(`.first`);
let secondBox = document.querySelector(`.second`);
let color1 = document.querySelector('.color-1');
let color2 = document.querySelector('.color-2');


let getRandomColor=() => {
    let letters = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];

    let color = '#';
    for (let i = 0; i < 6; i++) {
        let randomColor = Math.floor(Math.random() * 16);   
        color+= letters[randomColor];
    }
    return color;
}

firstBox.addEventListener("click", function(){
    let color = getRandomColor();
    firstBox.style.backgroundColor = color;
    color1.innerText = color;

});

secondBox.addEventListener("mousemove", function(){
    color = getRandomColor();
    secondBox.style.backgroundColor = color;
    color2.innerText = color;
}); 