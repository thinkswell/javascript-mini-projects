function playAgain() {
    window.location.reload();
  }
  function generateBombIndicies(pCount, pMin, pMax) {
    let min = pMin < pMax ? pMin : pMax;
    let max = pMax > pMin ? pMax : pMin;
    let resultArr = [],
      randNumber;
    while (pCount > 0) {
      randNumber = Math.round(min + Math.random() * (max - min));
      if (resultArr.indexOf(randNumber) === -1) {
        resultArr.push(randNumber);
        pCount--;
      }
    }
    return resultArr;
  }
  function findNeighbourBombs(bombIndices, index, colCount, rowCount) {
    let bombs = 0;
    // positions
    // |1|2|3|
    // |4|x|5|
    // |6|7|8|
    if (index % colCount !== 1 && bombIndices.includes(index - colCount - 1)) {
      bombs++;
    }
    if (index > colCount && bombIndices.includes(index - colCount)) {
      bombs++;
    }
    if (index % colCount !== 0 && bombIndices.includes(index - colCount + 1)) {
      bombs++;
    }
  
    if (index % colCount !== 1 && bombIndices.includes(index - 1)) {
      bombs++;
    }
    if (index % colCount !== 0 && bombIndices.includes(index + 1)) {
      bombs++;
    }
    if (index % colCount !== 1 && bombIndices.includes(index + colCount - 1)) {
      bombs++;
    }
    if (
      index <= colCount * (rowCount - 1) &&
      bombIndices.includes(index + colCount)
    ) {
      bombs++;
    }
    if (index % colCount !== 0 && bombIndices.includes(index + colCount + 1)) {
      bombs++;
    }
    return bombs;
  }
  function render() {
    const rowCount = 9;
    const colCount = 9;
    const MIN = 1;
    let bi = 0;
    let points = 0;
    let gameover = false;
    let visited = [];
    let bombIndices = generateBombIndicies(  
      rowCount,
      MIN,
      rowCount * colCount);
    let grid = document.querySelector(".grid");
    let pointer = document.querySelector(".points");
    pointer.innerHTML = points;
    // grid creation
    for (let j = 0; j < rowCount; j++) {
      let row = document.createElement("div");
      row.classList.add("row");
      grid.appendChild(row);
      for (let i = 1; i <= colCount; i++) {
        let col = document.createElement("div");
        col.classList.add("col");
        col.setAttribute("id", i + j * 9);
        //listener for bomb and safe buttons
        col.addEventListener("click", () => {
          if (bombIndices.indexOf(i + j * 9) !== -1) {
            while (bi < bombIndices.length) {
              let bombcol = document.getElementById(bombIndices[bi]);
              bombcol.classList.add("bomb");
              bombcol.innerHTML = "💣";
              bi++;
            }
            gameover = true;
          } else {
            if (!gameover && !visited.includes(i + j * 9)) {
              visited.push(i + j * 9);
              let safeCol = document.getElementById(i + j * 9);
              safeCol.classList.add("safe");
              const neighbouringBombs = findNeighbourBombs(
                bombIndices,
                i + j * rowCount,
                colCount,
                rowCount
              );
              safeCol.innerHTML = neighbouringBombs;
              points++;
              pointer.innerHTML = points;
            }
          }
        });
        row.appendChild(col);
      }
    }
  }
  render();