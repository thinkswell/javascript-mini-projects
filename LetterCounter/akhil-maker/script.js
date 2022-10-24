let len = document.getElementById("input").value.length;
document.getElementById("charcount").innerHTML = 'Letters: ' + len;
function charCount(str) {
	var inp = str.length;
	document.getElementById("charcount").innerHTML = 'Letters: ' + inp;
}
