const binary = () => {
  let i = document.getElementById("input").value;
  let binary = parseInt(i)
    .toString(2)
    .toUpperCase();
  let output = (document.getElementById("answer").innerHTML = binary);
};
const octal = () => {
  let i = document.getElementById("input").value;
  let octal = parseInt(i)
    .toString(8)
    .toUpperCase();
  let output = (document.getElementById("answer").innerHTML = octal);
};
const hexa = () => {
  let i = document.getElementById("input").value;
  let hex = parseInt(i)
    .toString(16)
    .toUpperCase();
  let output = (document.getElementById("answer").innerHTML = hex);
};
