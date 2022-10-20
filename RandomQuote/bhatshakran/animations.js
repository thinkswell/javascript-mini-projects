var textWrapper = document.querySelector(".qod");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);
anime
  .timeline({ loop: false })
  .add({
    targets: ".qod .letter",
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70 * i,
  })
  .add({
    targets: ".qod",
    opacity: 1,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });
anime({
  targets: ".qod__box",
  opacity: [0, 1],
  easing: "easeInExpo",
  delay: 1200,
  width: [0, "24rem"],
});

anime({
  targets: ".right__icon",
  translateY: [-10000, 0],
  easing: "easeInExpo",
  delay: 1500,
});
