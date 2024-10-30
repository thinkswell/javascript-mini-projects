var videoGallery = document.getElementById('video-gallery');

// List of video file names in the "sample-videos" folder
var videoFiles = [
    'video1.mp4',
    
];

// Loop through the video files and create video players
videoFiles.forEach(function (fileName) {
    var videoPlayer = document.createElement('video');
    videoPlayer.className = 'video-js';
    videoPlayer.controls = true;
    videoPlayer.preload = 'auto';
    videoPlayer.width = 640;
    videoPlayer.height = 360;

    var source = document.createElement('source');
    source.src =  fileName;
    source.type = 'video/mp4';

    videoPlayer.appendChild(source);
    videoGallery.appendChild(videoPlayer);

    // Initialize the Video.js player for each video
    videojs(videoPlayer, {}, function () {
        // This function is called when the player is ready
        // You can customize the player's appearance and behavior here
    });
});