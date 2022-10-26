const firstCols = document.querySelectorAll(
  ".first div, .second div, .third div"
);

let firstPlayer = [];
let secondPlayer = [];
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let click = 0;
firstCols.forEach((item) => {
  item.addEventListener("click", (tar) => {
    tar.preventDefault();
    if (click % 2 === 0) {
      item.style.borderRadius = "50%";
      item.style.background = "#1c92d2";
      click++;
      firstPlayer.push(Number(item.className));
    } else {
      click++;
      item.style.borderRadius = "50%";
      item.style.background = "#2948ff";
      secondPlayer.push(Number(item.className));
    }

    if (click >= 3) {
      alert(firstPlayer);
      if (checkWinner(firstPlayer)) alert("first Winner");
      else if (checkWinner(secondPlayer)) alert("Second Player");
    }
  });
});

function checkWinner(firstPlayer) {
  return winningCombinations.some((rows) => {
    return JSON.stringify(rows) === JSON.stringify(firstPlayer);
  });
}
