let btn = document.querySelector(".hambtn");
let mobilenav = document.querySelector(".header2");
let links = document.querySelectorAll("alinks");
btn.addEventListener("click", function () {
  mobilenav.classList.toggle("appear");
});
links.addEventListener("click", function () {
  mobilenav.classList.remove("appear");
});
document.body.addEventListener("click", function () {
  mobilenav.classList.remove("appear");
});
