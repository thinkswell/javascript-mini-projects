const colorPicker = document.getElementById('colorPicker');
const colorCode = document.getElementById('colorCode');
const colorPreview = document.getElementById('colorPreview');

// Update the color preview and text input when the color changes
colorPicker.addEventListener('input', () => {
  const selectedColor = colorPicker.value;
  colorCode.value = selectedColor;
  colorPreview.style.backgroundColor = selectedColor;
});
