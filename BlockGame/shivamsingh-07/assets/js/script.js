// Main Variables
var ID = 0;
var initialID = null,
    finalID = null,
    initialOBJ = null,
    finalOBJ = null;
var user = "";
var mode = "";
var matches = 0;

// Main Function
function check(obj, id) {
    obj.style.opacity = "0";
    obj.style.transform = "scale(1.2)";
    if (ID == 0) {
        initialID = id;
        initialOBJ = obj;
        ID = setTimeout(function () {
            clearTimeout(ID);
            ID = 0;
            initial = null;
            initialOBJ.style.opacity = "1";
            initialOBJ.style.transform = "scale(1)";
        }, 3000);
    } else {
        finalID = id;
        finalOBJ = obj;
        if (initialID === finalID) {
            matches += 1;
            var y = setTimeout(function () {
                initialOBJ.style.display = "none";
                finalOBJ.style.display = "none";
                initialID = finalID = initialOBJ = finalOBJ = null;
                clearTimeout(ID);
                ID = 0;
                clearTimeout(y);
            }, 500);
        } else {
            var x = setTimeout(function () {
                initialOBJ.style.opacity = "1";
                initialOBJ.style.transform = "scale(1)";
                finalOBJ.style.opacity = "1";
                finalOBJ.style.transform = "scale(1)";
                clearTimeout(x);
                clearTimeout(ID);
                ID = 0;
                initialID = finalID = initialOBJ = finalOBJ = null;
            }, 500);
        }
    }
}

// Timer Function
function startGame() {
    user = document.getElementById("username").value;
    mode = document.getElementById("getmode").value;

    if (user === "" || mode === "" || mode === "null") {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "No Field can remain Empty!",
        });
    } else {
        // Render Section
        document.getElementById("detail").style.display = "none";
        document.getElementById("game").style.display = "flex";

        // Setting Variables
        document.getElementById("user").innerHTML = user;
        switch (mode) {
            case "0":
                document.getElementById("mode").innerHTML = "Easy";
                document.getElementById("0").style.display = "flex";
                break;
            case "1":
                document.getElementById("mode").innerHTML = "Medium";
                document.getElementById("1").style.display = "flex";
                break;
            case "2":
                document.getElementById("mode").innerHTML = "Hard";
                document.getElementById("2").style.display = "flex";
                break;
        }

        // Start Timer
        var start = new Date().getTime();

        var T = setInterval(function () {
            var now = new Date().getTime();
            var distance = now - start;
            var min =
                Math.floor(distance / (1000 * 60)) > 9
                    ? Math.floor(distance / (1000 * 60))
                    : Math.floor(distance / (1000 * 60)) > 0
                    ? "0" + Math.floor(distance / (1000 * 60))
                    : "00";
            var sec =
                Math.floor((distance % (1000 * 60)) / 1000) > 9
                    ? Math.floor((distance % (1000 * 60)) / 1000)
                    : Math.floor((distance % (1000 * 60)) / 1000) > 0
                    ? "0" + Math.floor((distance % (1000 * 60)) / 1000)
                    : "00";

            document.getElementById("time").innerHTML = min + ":" + sec;

            switch (mode) {
                case "0":
                    if (matches === 2) {
                        clearInterval(T);
                        getScore(min + ":" + sec);
                    }
                    break;
                case "1":
                    if (matches === 8) {
                        clearInterval(T);
                        getScore(min + ":" + sec);
                    }
                    break;
                case "2":
                    if (matches === 18) {
                        clearInterval(T);
                        getScore(min + ":" + sec);
                    }
                    break;
            }
        }, 1000);
    }
}
// Render Result
function getScore(time_taken) {
    document.getElementById("game").style.display = "none";
    document.getElementById("result").style.display = "flex";

    // Setting Values
    document.getElementById("player").innerHTML = user;
    switch (mode) {
        case "0":
            document.getElementById("mode_selected").innerHTML = "Easy";
            break;
        case "1":
            document.getElementById("mode_selected").innerHTML = "Medium";
            break;
        case "2":
            document.getElementById("mode_selected").innerHTML = "Hard";
            break;
    }
    document.getElementById("time_taken").innerHTML = time_taken;
}

// Get Detail Function
function getDetail() {
    document.getElementById("main").style.display = "none";
    document.getElementById("detail").style.display = "flex";
}

// Restart Game
function restart() {
    window.location.reload();
}
