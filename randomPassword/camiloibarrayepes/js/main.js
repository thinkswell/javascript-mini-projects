function generatePassword() {
	var long = document.getElementById("longitude").value
	var withNumbersID = document.getElementById("withNumbers")
	var withSymbolsID = document.getElementById("withSymbols")

	var charsetOpNumbers = withNumbersID.checked ? "0123456789" : ""
	var charsetOpUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var charsetOpLower = "abcdefghijklmnopqrstuvwxyz"
	var charsetSymbols = withSymbolsID.checked ? "!@#$%^&*()_+:;?." : ""

    var length = long,
        charset = charsetOpUpper + charsetOpLower + charsetOpNumbers + charsetSymbols,
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n))
    }
    document.getElementById("newPasswordTextField").value = retVal
    return retVal
}