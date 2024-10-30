var cur = document.querySelector("#cursor");
var blur = document.querySelector("#cursor-blur");

document.addEventListener("mousemove", function (dets) {
  cur.style.left = dets.x + "px";
  cur.style.top = dets.y + "px";
  blur.style.left = dets.x - 150 + "px";
  blur.style.top = dets.y - 150 + "px";
});

const drums = new Howl({
  src: ["./drums/drums.webm", "./drums/drums.mp3"],
  sprite: {
    clap: [0, 734.2630385487529],
    closedhihat: [2000, 445.94104308390035],
    crash: [4000, 1978.6848072562354],
    kick: [7000, 553.0839002267571],
    openhihat: [9000, 962.7664399092968],
    snare: [11000, 354.48979591836684],
  },
});

const drumkit = document.querySelector(".drumkit");

function playDrum(key) {
  const keyName = key.toLowerCase();
  const pad = document.querySelector(`[data-sound-key="${keyName}"]`);
  if (pad) {
    const soundToPlay = pad.dataset.sound;
    drums.play(soundToPlay);
  }
}

function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  console.log(vh);
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setViewportHeight();
window.addEventListener("resize", () => {
  setTimeout(setViewportHeight, 100);
});

drumkit.addEventListener("click", function (event) {
  if (event.target.classList.contains("pad")) {
    event.preventDefault();
    const soundToPlay = event.target.dataset.sound;
    drums.play(soundToPlay);
  }
});

document.addEventListener("keydown", function (event) {
  playDrum(event.key);
});
