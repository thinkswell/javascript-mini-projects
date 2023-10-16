function playSounds(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key.classList.add("playing");
  }
  
  function soundsTap(e) {
    var el = this.id;
  
    const audio = document.querySelector(`audio[data-key="${el}"]`);
  
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  }
  
  function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
  }
  
  const key_btn = document.querySelectorAll(".key");
  
  key_btn.forEach((key) =>
    key.addEventListener("transitionend", removeTransition)
  );
  
  key_btn.forEach((el) => el.addEventListener("click", soundsTap));
  
  window.addEventListener("keydown", playSounds);
  