let closebtn = document.querySelector(".closebtn");
let openbtn = document.querySelector(".btn1");
let modal = document.querySelector(".modal");
let links = document.querySelector(".alinks");
openbtn.addEventListener("click", function () {
  modal.classList.add("appear");
});
closebtn.addEventListener("click", function () {
  modal.classList.remove("appear");
});
links.forEach(function (params) {
  params.addEventListener("click", function () {
    modal.classList.remove("appear");
  });
});
