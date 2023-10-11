function convert() {
    var value = document.getElementById("paragraph_text").value;
    var output = document.getElementById("binary");
    var total = '';
    var i = 0;
    var totalDigit = 0;

    for (; i < value.length; i++) {
        var binary = '';
        var characther = value.charCodeAt(i);

        while (characther > 0) {
            var mod = characther % 2;
            characther = Math.floor(characther / 2)
            binary = String(mod) + String(binary)
        }

        while (binary.length < 8) {
            binary = "0" + binary;
        }

        total += binary;
        totalDigit += binary.length;
    }

    // Clear the previous content
    //output.textContent = '';

    var count = document.getElementById("binary_digit");
    count.innerHTML = totalDigit;
}
function frequance(arr) {
    var fr = document.getElementById("freq");
    var new_arr = Object.entries(arr);
    fr.innerHTML = ''; // Clear the contents of the element

    for (var q = 0; q < new_arr.length; q++) {
        var a = new_arr[q][0];
        if (a == " ") {
            a = "Space(SC)";
        } else if (a == "\n") {
            a = "New Line(NL)";
        }
        fr.innerHTML += a + ": " + new_arr[q][1] + " ";
    }

    // Remove the trailing space from the last entry
    fr.innerHTML = fr.innerHTML.trim();
}


function result() {
    var binary_digit = document.getElementById("binary_digit").innerHTML;
    var encoded_digit = document.getElementById("encoded_digit").innerHTML;
    var result = document.getElementById("result");

    var subt = binary_digit - encoded_digit;
    if (subt == binary_digit) {
        result.innerHTML = 0;
    } else {
        result.innerHTML = ((subt * 100) / binary_digit).toFixed(2) + "%";

    }


}

function main() {
    var text = String(document.getElementById("paragraph_text").value);
    var array = {};
    document.getElementById("text_digit").innerHTML = text.length;

    for (var i = 0; i < text.length; i++) {
        var current = text.charAt(i);

        if (current in array) {
            array[current] = array[current] + 1;
        } else {
            array[current] = 1;
        }
    }

    remove();
    createNodes(array);
    frequance(array);
    result();
}

function remove() {
    var coded = document.getElementById("coded");
    coded.innerHTML = "";
    var graph = document.querySelector('svg');
    if (graph) {
        graph.parentElement.removeChild(graph);
    }
}

// Rest of the code remains the same


var huffman = document.getElementById("huffman");
var starty, startx, scrleft, scrtop, isdown;

huffman.addEventListener('mousedown', e => MouseDown(e));
huffman.addEventListener('mouseup', e => mouseUp(e))
huffman.addEventListener('mouseleave', e => mouseLeave(e));
huffman.addEventListener('mousemove', e => mouseMove(e));

function MouseDown(e) {
    isdown = true;
    startx = e.pageX - huffman.offsetLeft;
    starty = e.pageY - huffman.offsetTop;
    scrleft = huffman.scrollLeft;
    scrtop = huffman.scrollTop;
}

function mouseUp(e) {
    isdown = false;
}

function mouseLeave(e) {
    isdown = false;
}

function mouseMove(e) {
    if (isdown) {
        e.preventDefault();

        var y = e.pageY - huffman.offsetTop;
        var goY = y - starty;
        huffman.scrollTop = scrtop - goY;

        var x = e.pageX - huffman.offsetLeft;
        var goX = x - startx;
        huffman.scrollLeft = scrleft - goX;
    }
}

var binary_btn = document.getElementById("bin_click");
var dig = document.getElementById("binary_digit");
var bin = document.getElementById("binary");


binary_btn.onclick = function () {

    if (binary_btn.innerHTML == "Show") {
        var cw = document.documentElement.clientWidth;
        if (cw < 700) {
            bin.style.width = "165%";

        } else {
            bin.style.width = "90%";
        }


        bin.style.height = "30%";
        dig.style.visibility = "visible";
        binary_btn.innerHTML = "Hide";
        bin.style.overflow = "auto";

    } else {
        bin.style.height = "45px";
        bin.style.width = "95px";
        bin.style.overflow = "hidden";
        dig.style.visibility = "hidden";
        binary_btn.innerHTML = "Show";

    }

}

var code_btn = document.getElementById("code_click");
var code_dig = document.getElementById("encoded_digit");
var res = document.getElementById("result");
var cod = document.getElementById("coded");

code_btn.onclick = function () {

    if (code_btn.innerHTML == "Show") {
        var cw = document.documentElement.clientWidth;

        if (cw < 700) {
            cod.style.width = "165%";

        } else {
            cod.style.width = "90%";
        }


        cod.style.height = "30%";
        code_dig.style.visibility = "visible";
        res.style.visibility = "visible";
        code_btn.innerHTML = "Hide";
        cod.style.overflow = "auto";
    } else {
        cod.style.height = "45px";
        cod.style.width = "95px";
        cod.style.overflow = "hidden";
        code_dig.style.visibility = "hidden";
        res.style.visibility = "hidden";
        code_btn.innerHTML = "Show";

    }

}

var freq_btn = document.getElementById("freq_btn");
var fr = document.getElementById("freq");

freq_btn.onclick = function () {
    var cw = document.documentElement.clientWidth;

    if (freq_btn.innerHTML == "Show") {
        if (1150 > cw && cw > 700) {
            fr.style.width = "80%";
            fr.style.height = "100px";

        } else if (cw < 700) {
            fr.style.width = "140%";
            fr.style.height = "100px";
        }

        else {
            fr.style.width = "40%";
            fr.style.height = "10%";

        }


        freq_btn.innerHTML = "Hide";
    } else {
        fr.style.width = "75px";
        fr.style.height = "35px";
        freq_btn.innerHTML = "Show";

    }





}
