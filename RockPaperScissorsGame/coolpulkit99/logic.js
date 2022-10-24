// alert("");
function reload(){
    location.reload();
}

function generateRandom(){
   return Math.floor((Math.random() * 3) + 1);
}

function userAction(choice){
document.getElementById("verdict").style.display="flex";
document.getElementById("gamearea").style.display="none";

let computer=generateRandom();
if(computer==choice)
tie();

switch(choice){
    case 1:
        switch(computer){
            case 2:
                lost();
                break;
            case 3:
                win();
                break;
        }
        break;

    case 2:
        switch(computer){
            case 1:
                win();
                break;
            case 3:
                lost();
                break;
        }
        break;

    case 3:
        switch(computer){
            case 2:
                win();
                break;
            case 1:
                lost();
                break;
        }
        break;
}

}

function tie(){
document.getElementById("verdictmessage").innerHTML="It's a tie.";
document.getElementById("verdictmessage").style.color="black";
}
function win(){
    document.getElementById("verdictmessage").innerHTML="You win.";
    document.getElementById("verdictmessage").style.color="green";
}
function lost(){
    document.getElementById("verdictmessage").innerHTML="You lost.";
    document.getElementById("verdictmessage").style.color="red";
}