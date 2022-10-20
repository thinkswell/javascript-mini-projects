let firstBox = document.querySelector(`.first`);
let secondBox = document.querySelector(`.second`);

function getRandomColor() {
    let letters = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];

    let color = '#';
    for (let i = 0; i < 6; i++) {
        let randomColor = Math.floor(Math.random() * 16);   
        color+= letters[randomColor];
    }
    return color;
}

firstBox.addEventListener("click", function(){
    firstBox.style.backgroundColor = getRandomColor();
});

secondBox.addEventListener("mousemove", function(){
    secondBox.style.backgroundColor = getRandomColor();
});