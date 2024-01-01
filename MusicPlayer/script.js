var myVid = document.getElementById("myVideo");
var pl = document.getElementById("pl");
var pr = document.getElementById("pr");
var seek = document.getElementById("slide");
var nx = document.getElementById("nx");
var volDown = document.getElementById("volDown");
var volUp = document.getElementById("volUp");
var vid1 = document.getElementById("vid1");
var vid2 = document.getElementById("vid2");
var vid3 = document.getElementById("vid3");

var sources = ["https://mainline.i3s.unice.fr/mooc/mi5.mp4", 
               "https://mainline.i3s.unice.fr/mooc/ff7.mp4", 
               "https://mainline.i3s.unice.fr/mooc/jbs.mp4"];

var num = 0;
myVid.src = sources[num];
myVid.volume = 0.5;

// start playing
function cinema() {
    function playPause() {
        if (myVid.paused === true) {
            myVid.play();
            pl.innerHTML = "Pause";
        } else {
            myVid.pause();
            pl.innerHTML = "Play";
        }
    }

    function prevVid() {
        if (num === 0) {
            num = 0;
        } else {
            num--;
            seek.value = 0;
            myVid.src = sources[num];
            myVid.play();
        }
    }

    function vidSeek() {
        var vidTime = myVid.duration * (seek.value / 100);
        myVid.currentTime = vidTime;
    }

    function vidTime() {
        var nt = myVid.currentTime * (100 / myVid.duration);
        seek.value = nt;
    }

    function nextVid() {
        if (num === 2) {
            if (seek.value < 100) {
                num = 2;
            } else {
                num = 0;
                myVid.src = sources[num];
                seek.value = 0;
                myVid.pause();
                pl.innerHTML = "Play";
            }
        } else {
            num++;
            seek.value = 0;
            myVid.src = sources[num];
            myVid.play();
        }
    }

    function volChangeDown() {
        if (myVid.volume > 0) {
            myVid.volume -= 0.1;
        }
    }

    function volChangeUp() {
        if (myVid.volume < 1) {
            myVid.volume += 0.1;
        }
    }

    function vidChoice1() {
        num = 0;
        myVid.src = sources[num];
        playPause();
    }

    function vidChoice2() {
        num = 1;
        myVid.src = sources[num];
        playPause();
    }

    function vidChoice3() {
        num = 2;
        myVid.src = sources[num];
        playPause();
    }

    // Add all event listeners
    pl.addEventListener("click", playPause, false);
    pr.addEventListener("click", prevVid, false);
    seek.addEventListener("mousedown", function () {
        myVid.pause();
        pl.innerHTML = "Play";
    });
    seek.addEventListener("mouseup", function () {
        myVid.play();
        pl.innerHTML = "Pause";
    });
    seek.addEventListener("input", vidSeek, false);
    myVid.addEventListener("timeupdate", vidTime, false);
    myVid.addEventListener("ended", nextVid, false);
    nx.addEventListener("click", nextVid, false);
    volDown.addEventListener("mousedown", volChangeDown, false);
    volUp.addEventListener("mousedown", volChangeUp, false);
    vid1.addEventListener("click", vidChoice1);
    vid2.addEventListener("click", vidChoice2);
    vid3.addEventListener("click", vidChoice3);
}

cinema();