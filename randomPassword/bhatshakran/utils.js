export let capitals = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
export const lowers = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
export const spec = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "+",
  ":",
  ";",
  "?",
  ".",
];

export const btn = document.getElementById("gt-pass");
export const capital_inp = document.getElementById("capitallett");
export const specchars_inp = document.getElementById("specchars");
export const numbers_inp = document.getElementById("numbers");
export const len_inp = document.getElementById("lengthofpass");
export const result = document.querySelector(".result");

export const buttonHandler = () => {
  let values = {};

  capital_inp.checked ? (values.capitals = true) : (values.capitals = false);
  specchars_inp.checked
    ? (values.specchars = true)
    : (values.specchars = false);
  numbers_inp.checked ? (values.numbers = true) : (values.numbers = false);
  len_inp.value > 10 ? (values.length = len_inp.value) : (values.length = 10);

  return values;
};
