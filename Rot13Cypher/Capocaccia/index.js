function rot13(){
    const message = document.querySelector('#myInput').value
    var t = message.split('')
    var key = 'abcdefghijklmnopqrstuvwxyz'
    var word = ''
    t.forEach((letter)=>{
      idx = key.indexOf(letter.toLowerCase());
      if(idx !== -1){
        idx < key.length / 2 ?
        letter == letter.toUpperCase() ?
        word += key[idx + 13].toUpperCase() :
        word += key[idx + 13] :
        letter == letter.toUpperCase() ?
        word += key[idx - (key.length / 2)].toUpperCase() :
        word += key[idx - (key.length / 2)];
      } else {
        idx === -1 ? word += letter : '';
      }
    });
    document.querySelector('#myMessage').innerText = word
  }


  function decryptMe(){
    var t = document.querySelector('#toDecrypt').value.split('')
    var key = 'abcdefghijklmnopqrstuvwxyz'
    var word = ''
    t.forEach((letter)=>{
        idx = key.indexOf(letter.toLowerCase());
        if(idx !== -1){
          idx >= key.length / 2 ?
          letter == letter.toUpperCase() ?
          word += key[13-(key.length - idx)].toUpperCase() :
          word += key[13-(key.length - idx)] :
          letter == letter.toUpperCase() ?
          word += key[idx + 13].toUpperCase() :
          word += key[idx + 13];
        } else {
          idx === -1 ? word += letter : '';
        }
    });
    document.querySelector('#myDecryptedMessage').innerText = word
  }