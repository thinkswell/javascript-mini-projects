var arr = [], neighbourArray = [], cnt = 0, interval;
const side = 80;
const rate = 100;

// Creating 2-D arrays
for (var i = 0; i < side; i++) {
    var temp = [];
    for (var j = 0; j < side; j++) {
        temp.push(0);
    }
    arr.push(temp);
}
for (var i = 0; i < side; i++) {
    var temp = [];
    for (var j = 0; j < side; j++) {
        temp.push(0);
    }
    neighbourArray.push(temp);
}

// Creating grid and adding event listeners for setting initial state
for (var i = 0; i < side; i++) {
    var row = document.createElement("tr");
    document.getElementById("game-area").appendChild(row);
    row = document.getElementById("game-area").lastChild;
    for (var j = 0; j < side; j++) {
        var col = document.createElement("td");
        col.setAttribute("class", "border bg-success");
        col.setAttribute("id", cnt);
        col.addEventListener("click", onClick);
        row.append(col);
        cnt++;
    }
}

// Action on click
function onClick() {
    var id = this.id;
    $("#" + id).toggleClass("bg-success");
    id = Number(id);
    var r = Math.floor(id / side), c = id % side;
    if (arr[r][c] === 1) {
        arr[r][c] = 0;
    } else {
        arr[r][c] = 1;
    }
}

// Event listener to start
$("#start").click(beginGame);

// Starts the game
function beginGame() {
    // Calls for a new state at given rate
    interval = setInterval(nextState, rate);
}

// Handles the array manipulation
function nextState() {
    fillNeighbourArray();
    for (var i = 0; i < side; i++) {
        for (var j = 0; j < side; j++) {
            var changeID = i * side + j;
            // If Alive
            if (arr[i][j]) {
                if (neighbourArray[i][j] < 2 || neighbourArray[i][j] > 3) {
                    // Now Dead
                    arr[i][j] = 0;
                    $("#" + changeID).toggleClass("bg-success");
                }
            }
            // If Dead
            else {
                if (neighbourArray[i][j] === 3) {
                    // Now Alive
                    arr[i][j] = 1;
                    $("#" + changeID).toggleClass("bg-success");
                }
            }
        }
    }
}

// Fills the neighbourArray with no. of neighbours for each cell
function fillNeighbourArray() {
    for (var i = 0; i < side; i++) {
        for (var j = 0; j < side; j++) {
            neighbourArray[i][j] = aliveNeighbours(i, j);
        }
    }
}

// Returns no. of alive neighbours
function aliveNeighbours(i, j) {
    var cnt = 0;
    // Padded middle
    if (i >= 1 && i <= side - 2 && j >= 1 && j <= side - 2) {
        // Top left
        if (arr[i - 1][j - 1] === 1)
            cnt++;
        // Top
        if (arr[i - 1][j] === 1)
            cnt++;
        // Top right
        if (arr[i - 1][j + 1] === 1)
            cnt++;
        // Right
        if (arr[i][j + 1] === 1)
            cnt++;
        // Bottom right
        if (arr[i + 1][j + 1] === 1)
            cnt++;
        // Bottom
        if (arr[i + 1][j] === 1)
            cnt++;
        // Bottom left
        if (arr[i + 1][j - 1] === 1)
            cnt++;
        // Left
        if (arr[i][j - 1] === 1)
            cnt++;
        return cnt;
    } else {
        // Top
        if (i === 0) {
            if (j === 0) {
                // Right
                if (arr[i][j + 1] === 1)
                    cnt++;
                // Bottom right
                if (arr[i + 1][j + 1] === 1)
                    cnt++;
                // Bottom
                if (arr[i + 1][j] === 1)
                    cnt++;
            } else if (j === 11) {
                // Left
                if (arr[i][j - 1] === 1)
                    cnt++;
                // Bottom left
                if (arr[i + 1][j - 1] === 1)
                    cnt++;
                // Bottom
                if (arr[i + 1][j] === 1)
                    cnt++;
            } else {
                // Right
                if (arr[i][j + 1] === 1)
                    cnt++;
                // Bottom right
                if (arr[i + 1][j + 1] === 1)
                    cnt++;
                // Bottom
                if (arr[i + 1][j] === 1)
                    cnt++;
                // Bottom left
                if (arr[i + 1][j - 1] === 1)
                    cnt++;
                // Left
                if (arr[i][j - 1] === 1)
                    cnt++;
            }
        }
        // Bottom
        else if (i === 11) {
            if (j === 0) {
                // Top
                if (arr[i - 1][j] === 1)
                    cnt++;
                // Top right
                if (arr[i - 1][j + 1] === 1)
                    cnt++;
                // Right
                if (arr[i][j + 1] === 1)
                    cnt++;
            } else if (j === 11) {
                // Left
                if (arr[i][j - 1] === 1)
                    cnt++;
                // Top left
                if (arr[i - 1][j - 1] === 1)
                    cnt++;
                // Top
                if (arr[i - 1][j] === 1)
                    cnt++;
            } else {
                // Left
                if (arr[i][j - 1] === 1)
                    cnt++;
                // Top left
                if (arr[i - 1][j - 1] === 1)
                    cnt++;
                // Top
                if (arr[i - 1][j] === 1)
                    cnt++;
                // Top right
                if (arr[i - 1][j + 1] === 1)
                    cnt++;
                // Right
                if (arr[i][j + 1] === 1)
                    cnt++;
            }
        }
        return cnt;
    }
}

// Event listener for stopping the game
$("#stop").click(function () {
    clearInterval(interval);
})