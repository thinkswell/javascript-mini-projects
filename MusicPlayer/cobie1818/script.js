"use strict";

const audio = document.getElementById("audio");
const filesInput = document.getElementById("files");
const title = document.getElementById("now-playing");
const status = document.getElementById("status");
const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const seek = document.getElementById("seek");
const volume = document.getElementById("volume");
const elapsed = document.getElementById("elapsed");
const duration = document.getElementById("duration");
const playlist = document.getElementById("playlist");
const empty = document.getElementById("empty");

let tracks = [];
let currentIndex = -1;
let playbackRequest = 0;

audio.volume = Number(volume.value);

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function updateTimeline() {
  const hasDuration = Number.isFinite(audio.duration)
    && audio.duration > 0;

  seek.disabled = !hasDuration;
  seek.max = hasDuration ? audio.duration : 100;
  seek.value = hasDuration ? audio.currentTime : 0;
  elapsed.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
  seek.setAttribute(
    "aria-valuetext",
    `${formatTime(audio.currentTime)} of ${formatTime(audio.duration)}`
  );
}

function highlightTrack() {
  const buttons = playlist.querySelectorAll("button");

  buttons.forEach((button, index) => {
    if (index === currentIndex) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

async function startPlayback() {
  if (currentIndex < 0) return;

  const request = ++playbackRequest;

  try {
    await audio.play();
  } catch (error) {
    // Ignore a request interrupted by changing or pausing a track.
    if (request !== playbackRequest || error.name === "AbortError") {
      return;
    }

    status.textContent =
      "Unable to play this file. Try another audio file.";
  }
}

function selectTrack(index, autoplay = false) {
  if (!tracks.length) return;

  playbackRequest++;
  audio.pause();

  // Wrap around when moving beyond either end of the playlist.
  currentIndex = (index + tracks.length) % tracks.length;
  audio.src = tracks[currentIndex].url;
  audio.load();

  title.textContent = tracks[currentIndex].name;
  status.textContent = "Ready to play.";
  playButton.textContent = "Play";
  playButton.disabled = false;
  previousButton.disabled = tracks.length < 2;
  nextButton.disabled = tracks.length < 2;

  updateTimeline();
  highlightTrack();

  if (autoplay) startPlayback();
}

filesInput.addEventListener("change", () => {
  const selectedFiles = Array.from(filesInput.files);
  if (!selectedFiles.length) return;

  playbackRequest++;
  audio.pause();
  audio.removeAttribute("src");
  audio.load();

  // Release the old file references before replacing the playlist.
  tracks.forEach((track) => URL.revokeObjectURL(track.url));

  tracks = selectedFiles.map((file) => ({
    name: file.name,
    url: URL.createObjectURL(file)
  }));

  playlist.replaceChildren();
  empty.hidden = true;

  tracks.forEach((track, index) => {
    const item = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = track.name;
    button.addEventListener("click", () => selectTrack(index, true));

    item.appendChild(button);
    playlist.appendChild(item);
  });

  selectTrack(0);
  filesInput.value = "";
});

playButton.addEventListener("click", () => {
  if (audio.paused) {
    startPlayback();
  } else {
    playbackRequest++;
    audio.pause();
  }
});

previousButton.addEventListener("click", () => {
  selectTrack(currentIndex - 1, true);
});

nextButton.addEventListener("click", () => {
  selectTrack(currentIndex + 1, true);
});

audio.addEventListener("play", () => {
  playButton.textContent = "Pause";
  status.textContent = "Playing.";
});

audio.addEventListener("pause", () => {
  playButton.textContent = "Play";
  if (currentIndex >= 0) status.textContent = "Paused.";
});

audio.addEventListener("ended", () => {
  if (currentIndex < tracks.length - 1) {
    selectTrack(currentIndex + 1, true);
  } else {
    status.textContent = "Playlist finished.";
  }
});

audio.addEventListener("error", () => {
  if (!audio.getAttribute("src")) return;

  playButton.textContent = "Play";
  status.textContent =
    "This file could not be loaded. Choose another track or file.";
});

audio.addEventListener("loadedmetadata", updateTimeline);
audio.addEventListener("durationchange", updateTimeline);
audio.addEventListener("timeupdate", updateTimeline);

seek.addEventListener("input", () => {
  if (Number.isFinite(audio.duration) && audio.duration > 0) {
    audio.currentTime = Number(seek.value);
    updateTimeline();
  }
});

volume.addEventListener("input", () => {
  audio.volume = Number(volume.value);
});