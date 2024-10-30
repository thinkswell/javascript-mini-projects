const palette = document.querySelector('.palette');
const generateButton = document.getElementById('generateButton');

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createColorCard() {
    const colorCard = document.createElement('div');
    colorCard.classList.add('color-card');
    const hexCode = getRandomColor();
    colorCard.style.backgroundColor = hexCode;
    colorCard.innerHTML = `
        <div class="hex-code">${hexCode}</div>
    `;
    palette.appendChild(colorCard);
    
    colorCard.addEventListener('click', () => {
        const tempInput = document.createElement('input');
        tempInput.value = hexCode;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert(`Hex code ${hexCode} copied to clipboard!`);
    });
}

function generatePalette(numColors) {
    palette.innerHTML = '';
    for (let i = 0; i < numColors; i++) {
        createColorCard();
    }
}

generateButton.addEventListener('click', () => {
    const numColors = Math.floor(Math.random() * 4 + 1) * 2 * 2; // 10, 12, 14, or 16 colors
    generatePalette(numColors);
});

generatePalette(10); 
