const user_input = document.getElementById('user-inp');
const result = document.getElementById('display-result');
const cchoice=document.getElementById('comp-choice');
const uchoice=document.getElementById('user-choice'); 

let arr1=['Snake','Water','Gun']
let arr=['S','W','G'];
let message;

function checkEnter(event) {
    let num=Math.floor(Math.random() * arr.length);
    let comp_choice = arr[num];
    if (event.keyCode === 13) {
        cchoice.innerHTML='Computer choice: '+arr1[num];
        
        var inputValue = user_input.value;
        let num1=0;
        switch(inputValue.toUpperCase()){
            case 'S':
                num1=0;
                break;
            case 'W':
                num1=1;
                break;
            case 'G':
                num1=2;
                break;
            default:
                num1=-1;
        }
        uchoice.innerHTML = 'User choice: '+arr1[num1];
    }
    if (inputValue.toUpperCase() == comp_choice) {
        message='Match Tied!!';
        result.style.color = 'orange';
    } else if (inputValue.toUpperCase() == "S" && comp_choice == "G") {
        message='Computer won!!';
        result.style.color = 'green';
    } else if (inputValue.toUpperCase() == "S" && comp_choice == "W") {
        message='User won!!';
        result.style.color = 'blue';
    } else if (inputValue.toUpperCase() == "W" && comp_choice == "G") {
        message='User won!!';
        result.style.color = 'blue';
    } else if (inputValue.toUpperCase() == "W" && comp_choice == "S") {
        message='Computer won!!';
        result.style.color = 'green';
    } else if (inputValue.toUpperCase() == "G" && comp_choice == "W") {
        message='Computer won!!';
        result.style.color = 'green';
    } else if (inputValue.toUpperCase() == "G" && comp_choice == "S") {
        message='User won!!';
        result.style.color = 'blue';
    } else {
        message='Invalid Input!!'
        result.style.color = 'red';
    }
    user_input.value = "";
    result.innerHTML=message;
}