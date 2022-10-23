function animatedForm() {
  const arrows = document.querySelectorAll(".fa-arrow-down");
  const text = document.querySelector('.text');

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const input = arrow.previousElementSibling;
      const parent = arrow.parentElement;
      const nextForm = parent.nextElementSibling;

      // Check for user validation
      if (input.type === "text" && validateUser(input)) {
        nextSlide(parent, nextForm);
      } else if (input.type === "email" && validateEmail(input)) {
        nextSlide(parent, nextForm);
      } else if (input.type === "password" && validateUser(input)) {
        nextSlide(parent, nextForm);
      } else {
        parent.style.animation = "shake 0.3s ease";
      }

      parent.addEventListener("animationend", () => {
        parent.style.animation = "";
      });
    });
  });
}

function validateUser(user) {
  if (user.value.length < 6) {
    // console.log("Not enough characters");
    error("rgb(245, 50, 50)");
  } else {
    error("rgb(87, 180, 130)");
    return true;
  }
}

function validateEmail(email) {
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (validation.test(email.value)) {
    error("rgb(87, 180, 130)");
    return true;
  } else {
    error("rgb(245, 50, 50)");
  }
}

function nextSlide(parent, nextForm) {
  parent.classList.add("inactive");
  parent.classList.remove("active");
  nextForm.classList.add("active");
}

function error(color) {
  document.body.style.backgroundColor = color;
}

animatedForm();
