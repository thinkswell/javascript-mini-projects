// selecting each element
var rangeValue = document.querySelector('.form-control-range');
var checkCapitalLetters = document.querySelector('#defaultCheck2');
var checkSymbols = document.querySelector('#defaultCheck3');
var checkNumbers = document.querySelector('#defaultCheck4');
var textDiv = document.querySelector('.showPassword');



//click-event in submit btn
document.querySelector('.submit').addEventListener('click',generatePasswords);



// function to generate password
function generatePasswords() {

    textDiv.innerHTML = "Your brand-new password: ";

    var passwordArr = [];
    var smletter = 'abcdefghijklmnpqrstuvwxyz';
    var capletter = 'ABCDEFGHIJKLMNPQRSTUVWXYZ';
    var sym = '!@#$%^&*()';
    var num = '0123456789';
    var sumOfall = smletter + capletter + sym + num;

    
    // getting a random set for the password array
    for(i=0; i<= rangeValue.value/4; i++)
    {

    passwordArr.push(smletter.charAt(Math.floor((Math.random() * 26) + 1)));

    if(checkCapitalLetters.checked) 
    {
        passwordArr.push(capletter.charAt(Math.floor((Math.random() * 26) + 1)));
    };

    if(checkNumbers.checked) {
        passwordArr.push(num.charAt(Math.floor((Math.random() * 10) + 1)));
    }

    if(checkSymbols.checked) {
        passwordArr.push(sym.charAt(Math.floor((Math.random() *10) + 1)));
    }
    };


    // getting the leftover elements
    if(passwordArr.length !== rangeValue.value) {
        for(i=0; i<(rangeValue.value-passwordArr.length); i++) {

        passwordArr.push(sumOfall.charAt(Math.floor((Math.random() * 26) + 1))); 

        }

    }

    
    // to shuffle the array's element - Fisher-Yates algorithm.
    for(i=passwordArr.length - 1; i>0; i--){

        var j = Math.floor(Math.random() * i);

        var temp = passwordArr[i];  

        passwordArr[i] = passwordArr[j];

        passwordArr[j] = temp;

    };

    passwordArr.forEach(cur => textDiv.innerHTML += cur);

};