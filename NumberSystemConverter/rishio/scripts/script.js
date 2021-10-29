const alertBox = document.getElementById("alert");
const alertText = alertBox.lastElementChild;
const errorImg = document.getElementById("error-img");
const infoImg = document.getElementById("info-img");

function closealertBox() {
    alertBox.style.opacity = "0";
    setTimeout(() => {
        alertBox.setAttribute("hidden", "");
        errorImg.setAttribute("hidden", "");
        infoImg.setAttribute("hidden", "");
    }, 500);
}

let timeout = 0;
function handleInvalidCharacter(character, base) {
    infoImg.setAttribute("hidden", "");
    errorImg.removeAttribute("hidden");
    alertBox.removeAttribute("hidden");
    clearTimeout(timeout);
    setTimeout(() => {
        alertBox.style.opacity = "1";
        navigator.vibrate(250);
    }, 15);
    alertText.textContent = `"${character}" is not allowed in ${base}.`;
    timeout = setTimeout(closealertBox, 2000);
}

const charactersAllowed = {
    binary: "01",
    octal: "01234567",
    decimal: "0123456789",
    hexaDecimal: "0123456789abcdefABCDEF",
};

let inputs = [];
Object.keys(charactersAllowed).forEach((base) => {
    inputs.push(document.getElementById(base));
});

inputs.forEach((input) => {
    input.value = "0";

    input.parentElement.querySelector(".copy").onclick = () => {
        let curpos = input.selectionStart;
        input.select();
        document.execCommand("copy");
        navigator.vibrate([70, 40, 40]);
        input.focus();
        input.setSelectionRange(curpos, curpos);
        errorImg.setAttribute("hidden", "");
        infoImg.removeAttribute("hidden");
        alertBox.removeAttribute("hidden");
        clearTimeout(timeout);
        setTimeout(() => {
            alertBox.style.opacity = "1";
            navigator.vibrate(250);
        }, 15);
        alertText.textContent = "Copied!";
        timeout = setTimeout(closealertBox, 2000);
    };

    input.onfocus = () => {
        input.parentElement.querySelector(".explain").setAttribute("hidden", "true");
    };
    input.onblur = () => {
        input.parentElement.querySelector(".explain").removeAttribute("hidden");
    };

    input.oninput = (inputEvent) => {
        console.log(inputEvent);
        let character = inputEvent.data;
        let cursorPosition = inputEvent.target.selectionStart;
        let data = input.value;

        if (
            charactersAllowed[input.id].includes(character) ||
            inputEvent.inputType === "deleteContentBackward" ||
            inputEvent.inputType === "deleteContentForward" ||
            inputEvent.inputType === "insertFromPaste" ||
            inputEvent.inputType === "deleteWordBackward" ||
            inputEvent.inputType === "deleteWordForward"
        ) {
            if (data.startsWith("0")) input.value = removeLeadingZeros(data);
            remove(inputs, input).forEach((el) => {
                el.value = window[input.id][el.id](data);
            });
        } else {
            if (character != " ") handleInvalidCharacter(character, input.id);
            if (character) {
                input.value = input.value.replaceAll(character, "");
                inputEvent.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
            }
        }

        if (data === "" || data === "0") {
            inputs.forEach((input) => {
                input.value = "0";
            });
            inputEvent.target.setSelectionRange(1, 1);
        }
    };
});

onload = onresize = function () {
    document.body.style.backgroundImage = new Trianglify({
        x_gradient: Trianglify.colorbrewer,
        noiseIntensity: 0,
        cellsize: 80,
    }).generate(window.innerWidth, window.innerHeight).dataUrl;
};
