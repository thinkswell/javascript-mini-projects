// Collect all interactive elements and attach relevant event listeners
document.addEventListener('DOMContentLoaded', function() {
    const colorPicker = document.getElementById('colorPicker');
    const colorInput = document.getElementById('colorInput');
    const elementSelector = document.getElementById('elementSelector');
    const presetButtons = document.querySelectorAll('.preset');

    // Handle color changes from color picker and text input
    colorPicker.addEventListener('change', event => applyColor(event.target.value));
    colorInput.addEventListener('input', event => applyColor(event.target.value));

    // Populate dropdown with selectable elements and set up preset buttons
    populateElementSelector(elementSelector);
    setupPresetButtons(presetButtons);
});

<<<<<<< HEAD
// JavaScript for handling color changes based on knob interactions

// Object to track the currently selected element
let selectedElement = null;

// Function to set the selected element
function selectElement(elementType) {
    selectedElement = document.getElementById(elementType);
    console.log('Selected element:', selectedElement); // Debugging to see which element is selected
}

// Initialize event listeners on color input changes
document.addEventListener('DOMContentLoaded', function () {
    const colorPicker = document.getElementById('colorPicker');
    const colorTextInput = document.getElementById('colorInput');

    // Handle color picker changes
    colorPicker.addEventListener('input', function () {
        if (selectedElement) {
            selectedElement.style.color = colorPicker.value;
        }
    });

    // Handle text input for color codes
    colorTextInput.addEventListener('input', function () {
        if (selectedElement) {
            selectedElement.style.color = colorTextInput.value;
        }
    });
});


=======
>>>>>>> 04379e150083dc4d6f509b73dba0ab7a61cd45e2
document.addEventListener('DOMContentLoaded', function() {
    const presetButtons = document.querySelectorAll('.preset');
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            applyColor(this.style.backgroundColor);
        });
    });
});

function applyColor(color) {
    const selectedElementId = document.getElementById('elementSelector').value;
    const selectedElement = selectedElementId === 'background' ? document.body : document.getElementById(selectedElementId);

    if (selectedElementId === 'image') {
        selectedElement.style.borderColor = color;
    } else if (selectedElementId === 'background') {
        selectedElement.style.backgroundColor = color; // Setting the background color
    } else {
        selectedElement.style.color = color;
    }
}


// Define and apply seasonal color palettes
const colorPalettes = {
    Summer: {header: '#F08080', button: '#FFD700', image: '#FF6347', background: '#FFDEAD'},
    Winter: {header: '#00BFFF', button: '#4682B4', image: '#5F9EA0', background: '#F0F8FF'},
    Autumn: {header: '#8B4513', button: '#B22222', image: '#8B4513', background: '#DEB887'},
    Spring: {header: '#FF69B4', button: '#BA55D3', image: '#00FF7F', background: '#F0FFF0'}
};

function applySeasonalPalette(palette) {
    Object.entries(palette).forEach(([elementId, color]) => {
        const element = document.getElementById(elementId) || document.body;
        const styleProperty = elementId === 'image' ? 'borderColor' : (elementId === 'background' ? 'backgroundColor' : 'color');
        element.style[styleProperty] = color;
    });
    highlightButton(event.currentTarget);
}

// Populate selector with elements that can be colored
function populateElementSelector(selector) {
    document.querySelectorAll('.colorable').forEach(elem => {
        const option = new Option(elem.tagName.toLowerCase() + ' (' + elem.id + ')', elem.id);
        selector.add(option);
    });
}

// Setup buttons for applying preset palettes
function setupPresetButtons(buttons) {
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            applySeasonalPalette(colorPalettes[button.textContent]);
            highlightButton(button);
        });
    });
}

// Highlight the active button
function highlightButton(button) {
    document.querySelectorAll('#seasonalPalettes button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

