function reverseString() {
    let str = document.getElementById("reverse").value;
    let output = document.getElementById("output");
    let reversedStr = "";
    for(let j=str.length-1; j>=0; j--) {
        reversedStr += str[j];
    }
    output.value = reversedStr;
}