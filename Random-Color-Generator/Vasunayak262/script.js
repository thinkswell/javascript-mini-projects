const generateColorButton = document.getElementById("generate-color");
const hexValue = document.getElementById("hex-value");
const rgbValue = document.getElementById("rgb-value");
const hslValue = document.getElementById("hsl-value");
const copyButton = document.getElementById("copy-button");
const colorBox = document.querySelector(".color-box");
const colorHistory = document.querySelector(".color-history");

generateColorButton.addEventListener("click", generateRandomColor);
copyButton.addEventListener("click", copyToClipboard);

function generateRandomColor() {
    // Generate a random color
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

    // Update color values
    hexValue.textContent = randomColor;
    const rgbColor = hexToRgb(randomColor);
    rgbValue.textContent = `rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})`;
    const hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);
    hslValue.textContent = `hsl(${hslColor.h}, ${hslColor.s}%, ${hslColor.l}%)`;

    // Update color preview
    colorBox.style.backgroundColor = randomColor;

    // Add the generated color to the history panel
    const colorHistoryItem = document.createElement("div");
    colorHistoryItem.classList.add("color-history-item");
    colorHistoryItem.style.backgroundColor = randomColor;
    colorHistory.appendChild(colorHistoryItem);
}

function copyToClipboard() {
    const textToCopy = hexValue.textContent;

    // Create a text area element, set its value, and select it for copying
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    // Provide user feedback (e.g., change the button text temporarily)
    copyButton.textContent = "Copied!";
    setTimeout(() => {
        copyButton.textContent = "Copy to Clipboard";
    }, 2000);
}

// Helper functions for color conversion
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // grayscale
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
