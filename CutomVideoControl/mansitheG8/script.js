const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullscreen = player.querySelector(".fullscreen");

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  toggle.textContent = icon;
}

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

function skip(e) {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(skipbutton => skipbutton.addEventListener("click", skip));

function handleRangeUpdate() {
  video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

video.addEventListener("timeupdate", handleProgress);

function scrub(e) {
  if (!mousedown) return;
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

function fullMode() {
  player.classList.toggle("fullPlayer");
}

fullscreen.addEventListener("click", fullMode);
