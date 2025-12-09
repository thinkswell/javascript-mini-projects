function colors() {
  const red = document.getElementById("red").value;
  const green = document.getElementById("green").value;
  const blue = document.getElementById("blue").value;

  const rgbColor = `rgb(${red}, ${green}, ${blue})`;
  applyColor(rgbColor);
}


function myFunction() {
  document.getElementById("myDIV").style.backgroundColor = "lightblue";
}

document.querySelectorAll(".pallet").forEach((pallet) => {
  pallet.addEventListener("click", () => {
    applyColor(pallet.getAttribute("data-color"));
  });
});


function applyCustomColor() {
  const colorInput = document.getElementById("customColor").value.trim();
  const error = document.getElementById("error");

  // Test if browser accepts the color
  const test = new Option().style;
  test.color = colorInput;

  if (test.color === "") {
    error.textContent = "Invalid color format!";
    return;
  }

  error.textContent = "";
  applyColor(colorInput);

}
function applyColor(color) {
  document.body.style.backgroundColor = color;
  document.body.classList.remove("pulse");

  // force reflow to restart animation
  void document.body.offsetWidth;

  document.body.classList.add("pulse");
  document.getElementById("output").innerHTML = color;
}

function downloadColor() {
  const color = document.getElementById("output").innerText;

  const content = `Your Color Scheme\n\nColor Value: ${color}`;
  const blob = new Blob([content], { type: "text/plain" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "color-scheme.txt";
  link.click();

  URL.revokeObjectURL(link.href);
}

function shareColor() {
  const color = document.getElementById("output").innerText;

  if (navigator.share) {
    navigator.share({
      title: "My Color Scheme",
      text: `Check out this color: ${color}`,
    });
  } else {
    navigator.clipboard.writeText(color);
    alert("Color copied to clipboard!");
  }
}
