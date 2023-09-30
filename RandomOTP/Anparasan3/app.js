function generateOTP(charactersLength) {
    let result = '';
    const characters = '0123456789';
    for (let i = 0; i < charactersLength; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};



function handleClick(e) {
    const digits = document.getElementById('max-digit').value

    let num;
    const defaultValue = 5;
    if (!Number(digits)) {
        digits.value = defaultValue.toString();
        num = defaultValue;
    } else {
        num = Number(digits)
    }

    console.log(num)
    const otp = this.generateOTP(num)
    console.log(e, otp)
    const otpField = document.getElementById("otp-field")
    otpField.innerHTML = otp
}