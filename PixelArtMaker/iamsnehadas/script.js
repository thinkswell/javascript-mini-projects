// Get the grid element
var grid = document.getElementById("grid");

// Get all the squares in the grid
var squares = grid.getElementsByTagName("td");

// Declare a variable to store the current color
var currentColor = "white";

// Get the create-grid button element
var createGrid = document.getElementById("create-grid");

// Add an event listener to the create-grid button
createGrid.addEventListener("click", function() {
  // Clear the previous grid
  grid.innerHTML = "";

  // Get the user's input values for rows and columns
  var rows = document.getElementById("rows").value;
  var cols = document.getElementById("cols").value;

  // Loop through the rows
  for (var i = 0; i < rows; i++) {
    // Create a new row element
    var row = document.createElement("tr");

    // Loop through the columns
    for (var j = 0; j < cols; j++) {
      // Create a new cell element
      var cell = document.createElement("td");

      // Append the cell to the row
      row.appendChild(cell);
    }

    // Append the row to the grid
    grid.appendChild(row);
  }

  // Update the squares variable to include the new squares
  squares = grid.getElementsByTagName("td");

  // Loop through all the squares in the grid
  for (var k = 0; k < squares.length; k++) {
    // Add an event listener to each square
    squares[k].addEventListener("click", function() {
      // Change the square's background color to the currentColor
      this.style.backgroundColor = currentColor;

      // Log the square's color for debugging purposes
      console.log(this.style.backgroundColor);
    });
  }
});

// Get the color picker element
var colorPicker = document.getElementById("color-picker");

// Add an event listener to the color picker
colorPicker.addEventListener("change", function() {
  // Store the color picker's value in the currentColor variable
  currentColor = colorPicker.value;

  // Log the currentColor for debugging purposes
  console.log(currentColor);
});
// Get the clear button element
var clear = document.getElementById("clear");

// Add an event listener to the clear button
var clear = document.getElementById("clear");

// Add an event listener to the clear button
clear.addEventListener("click", function() {
  // Loop through all the squares in the grid
  for (var i = 0; i < squares.length; i++) {
    // Change the square's background color to white
    squares[i].style.backgroundColor = "white";
  }
});