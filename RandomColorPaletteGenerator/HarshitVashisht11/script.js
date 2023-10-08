const palette = document.querySelector('.palette');
const generateButton = document.getElementById('generateButton');

// Generate a random color in hex format (#RRGGBB)
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Create and append a color card to the palette
function createColorCard() {
    const colorCard = document.createElement('div');
    colorCard.classList.add('color-card');
    const hexCode = getRandomColor();
    colorCard.style.backgroundColor = hexCode;
    colorCard.innerHTML = `
        <div class="hex-code">${hexCode}</div>
    `;
    palette.appendChild(colorCard);

    // Add click event to copy hex code to clipboard
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

// Generate a random color palette with a specified number of colors
function generatePalette(numColors) {
    palette.innerHTML = ''; // Clear existing colors
    for (let i = 0; i < numColors; i++) {
        createColorCard();
    }
}

// Event listener for the "Generate Colors" button
generateButton.addEventListener('click', () => {
    const numColors = Math.floor(Math.random() * 4 + 1) * 2 * 2; // 10, 12, 14, or 16 colors
    generatePalette(numColors);
});

// Initial palette generation
generatePalette(10); // You can start with any initial number of colors
