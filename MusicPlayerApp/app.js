const songs = [
    'assets/Apna Bana Le - Arijit Singh, Sachin-Jigar.m4a',
    'assets/Raah Mein Unse Mulaqat - Kumar Sanu, Alka Yagnik.m4a',
    'assets/Sab Tera - Armaan Malik, Shraddha Kapoor.m4a'
    // Add more songs as needed
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audioPlayer');
const durationDisplay = document.getElementById('duration');
const seekbar = document.getElementById('seekbar');

function loadSong() {
    audioPlayer.src = songs[currentSongIndex];
    audioPlayer.load();
    updateUI();
}

function updateUI() {
    durationDisplay.textContent = formatTime(0);
    seekbar.value = 0;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong();
    playPause();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong();
    playPause();
}

function seek() {
    const seekValue = seekbar.value;
    const seekTime = (seekValue / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
}

audioPlayer.addEventListener('timeupdate', () => {
    durationDisplay.textContent = formatTime(audioPlayer.currentTime);
    seekbar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

audioPlayer.addEventListener('ended', nextSong);

loadSong();
