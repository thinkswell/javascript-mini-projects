function generateNewPassword() {

	let numbers = "0123456789"
	let uppperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	let lowerAlphabet = "abcdefghijklmnopqrstuvwxyz"
	let charsetSymbols = "!@#$*()+:;?."
	let generatedPassword = ""

	let totalCharacters = numbers + uppperAlphabet + lowerAlphabet + charsetSymbols
	let pwdLen = 10;
	generatedPassword = Array(pwdLen).fill(totalCharacters).map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');


	var output = document.getElementById('output')
	if (output.childNodes.length > 0) {
		output.removeChild(output.childNodes[0])
	}

	var child = document.createElement('p');
	child.innerHTML = generatedPassword;
	child = child.firstChild;
	output.appendChild(child);

	console.log(generatedPassword);
}