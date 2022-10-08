const container = document.querySelector(".container");
const cricleArr = [];
const row = 15;
const col = 15;

for (let i = 0; i < row; i++) {
  cricleArr[i] = [];
  for (let j = 0; j < col; j++) {
    const cricle = document.createElement("div");
    cricle.classList.add("cricle");
    container.appendChild(cricle);
    cricleArr[i].push(cricle);
  }
}
cricleArr.forEach((col, i) => {
  col.forEach((cricle, j) => {
    cricle.addEventListener("click", () => {
      growCricle(i, j);
    });
  });
});

function growCricle(i, j) {
  if (cricleArr[i] && cricleArr[i][j]) {
    if (!cricleArr[i][j].classList.contains("grow")) {
      cricleArr[i][j].classList.add("grow");
      setTimeout(() => {
        growCricle(i - 1, j);
        growCricle(i + 1, j);
        growCricle(i, j + 1);
        growCricle(i, j - 1);
      }, 100);
      setTimeout(() => {
        cricleArr[i][j].classList.remove("grow");
      }, 300);
    }
  }
}
