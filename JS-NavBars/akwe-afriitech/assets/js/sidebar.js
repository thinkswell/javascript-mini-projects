let btn = document.querySelector(".btn1");
let sidebar = document.querySelector(".sidebar");
let closebtn = document.querySelector(".closebtn");
let sidelinks = document.querySelectorAll(".sidelinks");
let body = document.querySelector(".body");
btn.addEventListener("click", function () {
  sidebar.classList.toggle("appear");
});
closebtn.addEventListener("click", function () {
  sidebar.classList.remove("appear");
});
sidelinks.forEach(function (params) {
  params.addEventListener("click", function () {
    sidebar.classList.remove("appear");
  });
});
body.addEventListener("click", function () {
  sidebar.classList.remove("appear");
});
