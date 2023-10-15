function convertToDecimal() {
    const binaryInput = document.getElementById("binaryInput").value;
    const decimalResult = document.getElementById("decimalResult");
    
    if (/^[0-1]+$/.test(binaryInput)) {
        const decimalValue = parseInt(binaryInput, 2);
        decimalResult.textContent = decimalValue;
    } else {
        decimalResult.textContent = "Invalid binary input";
    }
}

function convertToBinary() {
    const decimalInput = document.getElementById("decimalInput").value;
    const binaryResult = document.getElementById("binaryResult");
    
    if (!isNaN(decimalInput) && decimalInput.trim() !== "") {
        const binaryValue = (+decimalInput).toString(2);
        binaryResult.textContent = binaryValue;
    } else {
        binaryResult.textContent = "Invalid decimal input";
    }
}
