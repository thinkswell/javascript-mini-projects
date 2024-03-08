function changeColor() {
    var selectedElement = document.getElementById('elementSelector').value;
    var newColor = document.getElementById('colorPicker').value;

    var elementToChange = document.body; 
    if (selectedElement === 'background') {
        elementToChange = document.body;
    } else if (selectedElement === 'text') {
        elementToChange = document.getElementById('colorChangerApp');
    }

    elementToChange.style.backgroundColor = newColor;
}
