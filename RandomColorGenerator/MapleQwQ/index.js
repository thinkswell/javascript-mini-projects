const redSlider = document.getElementById('red');
const greenSlider = document.getElementById('green');
const blueSlider = document.getElementById('blue');
const redValue = document.getElementById('red-value');
const greenValue = document.getElementById('green-value');
const blueValue = document.getElementById('blue-value');
const generateBtn = document.getElementById("b1");

redSlider.addEventListener('input', updateColor);
greenSlider.addEventListener('input', updateColor);
blueSlider.addEventListener('input', updateColor);
generateBtn.addEventListener('click', generateColor);

function updateColor() {
    const red = redSlider.value;
    const green = greenSlider.value;
    const blue = blueSlider.value;
    
    redValue.textContent = red;
    greenValue.textContent = green;
    blueValue.textContent = blue;

    appleColor = 'RGB(' + red + ',' + green + ',' + blue + ')';
    document.getElementById("Color").style.backgroundColor 
    = appleColor;
    document.getElementById("color-text").innerHTML=
    appleColor;
    var hex = "#" + rgbToHex(red) + rgbToHex(green) + rgbToHex(blue);
    document.getElementById("color-value").textContent = hex;
    colorBox.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  }

function rgbToHex(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}

function generateColor() {
    const randomRed = Math.floor(Math.random() * 256);
    const randomGreen = Math.floor(Math.random() * 256);
    const randomBlue = Math.floor(Math.random() * 256);
    
    redSlider.value = randomRed;
    greenSlider.value = randomGreen;
    blueSlider.value = randomBlue;
    
    updateColor();
  }