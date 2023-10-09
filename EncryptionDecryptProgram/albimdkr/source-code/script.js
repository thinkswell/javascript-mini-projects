//proses encrypt
function encrypt(message, key) {
  let encryptedMessage = '';
  for (let i = 0; i < message.length; i++) {
    let charCode = message.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    encryptedMessage += String.fromCharCode(charCode);
  }
  return encryptedMessage;
}

//proses decrypt
function decrypt(encryptedMessage, key) {
  let decryptedMessage = '';
  for (let i = 0; i < encryptedMessage.length; i++) {
    let charCode = encryptedMessage.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    decryptedMessage += String.fromCharCode(charCode);
  }
  return decryptedMessage;
}

// get input elements
const messageInput = document.getElementById('enter-message');
const keyInput = document.getElementById('enter-key');
const encryptButton = document.getElementById('btn-encrypt');
const decryptButton = document.getElementById('btn-decrypt');
const resultDisplayEncrypt = document.getElementById('result-encrypt');
const errorDisplayEncrypt = document.getElementById('result-encrypt');
const resultDisplayDecrypt = document.getElementById('result-decrypt');
const errorDisplayDecrypt = document.getElementById('result-decrypt');

// add event listener for encryption button
encryptButton.addEventListener('click', function() {
  const message = messageInput.value;
  const key = keyInput.value;
  const encryptedMessage = encrypt(message, key);
  resultDisplayEncrypt.value = encryptedMessage;
  if (message.trim() === '' || key.trim() === '') {
    errorDisplayEncrypt.placeholder = 'Please Input Your Plain Text and Key!';
    errorDisplayEncrypt.style.borderColor = "red";
    errorDisplayEncrypt.value = '';
    return;
  }
});

// add event listener for decryption button
decryptButton.addEventListener('click', function() {
  const encryptedMessage = resultDisplayEncrypt.value;
  const key = keyInput.value;
  const decryptedMessage = decrypt(encryptedMessage, key);
  resultDisplayDecrypt.value = decryptedMessage;
  if (encryptedMessage.trim() === '' || key.trim() === '') {
    resultDisplayDecrypt.placeholder = 'Please Input Your Chiper Text and keys!';
    errorDisplayDecrypt.style.borderColor = "red";
    errorDisplayDecrypt.value = '';
    return;
  }
});
