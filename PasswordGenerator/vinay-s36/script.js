function generateStrongPassword(length) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialCharacters = '!@#$%^&*()_+';

    let password = [
        lowercase[Math.floor(Math.random() * lowercase.length)],
        uppercase[Math.floor(Math.random() * uppercase.length)],
        digits[Math.floor(Math.random() * digits.length)],
        specialCharacters[Math.floor(Math.random() * specialCharacters.length)]
    ];

    const allCharacters = lowercase + uppercase + digits + specialCharacters;
    
    for (let i = 0; i < length - 4; i++) {
        password.push(allCharacters[Math.floor(Math.random() * allCharacters.length)]);
    }

    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [password[i], password[j]] = [password[j], password[i]];
    }

    return password.join('');
}

function passwordgenerate() {
    var passwordLength = 12;
    var result = generateStrongPassword(passwordLength);
    // document.getElementById('result').innerHTML = 'Your password: '+result;
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = 'Your password: ' + result;

    // Create a "Copy" button
    var copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';
    copyButton.style.marginLeft='25px';
    copyButton.style.cursor='pointer';
    copyButton.style.padding='7px';
    copyButton.style.fontSize='15px';
    copyButton.onclick = function() {
        copyToClipboard(result,copyButton);
    };

    // Append the "Copy" button to the result paragraph
    resultElement.appendChild(copyButton);
}


function copyToClipboard(text, copyButton) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    // Update the "Copy" button text to show "Copied"
    copyButton.textContent = 'Copied!';
    setTimeout(function() {
        copyButton.textContent = 'Copy'; // Reset the button text after a delay
    }, 1500); // Reset after 1.5 seconds (adjust as needed)
}