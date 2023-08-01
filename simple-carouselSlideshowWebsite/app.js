let slideCount = 0;
countFunction();
const next = document.querySelector(".next");
const cont = document.querySelectorAll(".image_slder");
const prev = document.querySelector(".previous");
function countFunction() {
  const dots = document.querySelectorAll(".dots");
  const cont = document.querySelectorAll(".image_slder");
  for (i = 0; i < cont.length; i++) {
    cont[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    if (dots[i].classList.contains("current")) {
      dots[i].classList.remove("current");
    }
  }

  cont[slideCount].style.display = "block";
  dots[slideCount].classList.add("current");
}
next.addEventListener("click", nextSlide);
prev.addEventListener("click", prevSlide);

function nextSlide() {
  slideCount++;
  slideCount >= cont.length && (slideCount = 0);
  countFunction();
}
function prevSlide() {
  slideCount--;
  slideCount < 0 && (slideCount = cont.length - 1);
  countFunction();
}
setInterval(nextSlide, 5000);
