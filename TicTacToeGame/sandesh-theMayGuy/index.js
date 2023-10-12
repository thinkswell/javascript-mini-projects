

let aalusMove = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

let crossMove = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];

let winner;

const winningMessage = document.getElementById("winningMessage");

const popupMessage = document.getElementById("popupMessage");
const popupCloseButton = document.getElementById("popupCloseButton");

const winningAudio = document.getElementById("winningAudio");
const stepMadeAudio = document.getElementById("stepMadeAudio");







const buttons = document.querySelectorAll("button");
console.log(buttons);

for(let button of buttons){
    button.style.color="#0e283a";
}
let counter=1;

const aalu = document.createElement("div");
aalu.innerHTML = "&#9675;";
aalu.setAttribute("id","aalu");


const cross=document.createElement("div");
cross.innerHTML = "&#10005;";
cross.setAttribute("id","cross");

console.log(aalu);

for(let button of buttons){
button.addEventListener("click",function(e){

    const eventTriggeredButton = e.target;

    console.log(eventTriggeredButton);


    const aaluClone = aalu.cloneNode(true); // Create a clone of the "aalu" element
    const crossClone = cross.cloneNode(true);

    stepMadeAudio.play();

    if(counter%2){
       
        if(eventTriggeredButton.innerText=="." && eventTriggeredButton.innerText=="."){
            counter++;

        button.appendChild(aaluClone);

        const row = button.getAttribute("row");
        const column = button.getAttribute("column")

        aalusMove[row][column] = 1;

        console.log(aalusMove);



        
        }
    
    }else{

      if(eventTriggeredButton.innerText=="." && eventTriggeredButton.innerText=="."){

     
        counter++;
     
   
    button.appendChild(crossClone);

    const row = button.getAttribute("row");
    const column = button.getAttribute("column")

    crossMove[row][column] = 1;

    
        
    





      }




    }

    checkWinningCondition();

});
}



function checkWinningCondition(){
        if(aalusMove[0][0]&&aalusMove[0][1]&&aalusMove[0][2]){
            winner="aalu"
        }else if(aalusMove[1][0]&&aalusMove[1][1]&&aalusMove[1][2]){
            winner="aalu"
        }else if(aalusMove[2][0]&&aalusMove[2][1]&&aalusMove[2][2]){
            winner="aalu"
        }else if(aalusMove[0][0]&&aalusMove[1][1]&&aalusMove[2][2]){
            winner="aalu"
        }else if(aalusMove[0][2]&&aalusMove[1][1]&&aalusMove[2][0]){
            winner="aalu"
        }else if(aalusMove[0][0]&&aalusMove[1][0]&&aalusMove[2][0]){
            winner="aalu"
        }else if(aalusMove[0][1]&&aalusMove[1][1]&&aalusMove[2][1]){
            winner="aalu"
        }else if(aalusMove[0][2]&&aalusMove[1][2]&&aalusMove[2][2]){
            winner="aalu"
        }


        if(crossMove[0][0]&&crossMove[0][1]&&crossMove[0][2]){
            winner="cross"
        }else if(crossMove[1][0]&&crossMove[1][1]&&crossMove[1][2]){
            winner="cross"
        }else if(crossMove[2][0]&&crossMove[2][1]&&crossMove[2][2]){
            winner="cross"
        }else if(crossMove[0][0]&&crossMove[1][1]&&crossMove[2][2]){
            winner="cross"
        }else if(crossMove[0][2]&&crossMove[1][1]&&crossMove[2][0]){
            winner="cross"
        }else if(crossMove[0][0]&&crossMove[1][0]&&crossMove[2][0]){
            winner="cross"
        }else if(crossMove[0][1]&&crossMove[1][1]&&crossMove[2][1]){
            winner="cross"
        }else if(crossMove[0][2]&&crossMove[1][2]&&crossMove[2][2]){
            winner="cross"
        }

   

        if(winner=="aalu"){
            popupMessage.style.display = "block";
            winningMessage.innerText="Aalu Wins";
            winningAudio.play();



            
        }else if(winner=="cross"){
        popupMessage.style.display = "block";
        winningMessage.innerText="Cross Wins";
        winningAudio.play();



        }else{
            checkDraw();
        }

}

function checkDraw(){
    let counter=0;
        for(let button of buttons){
            if(button.innerText!='.'){
                counter++;
            }
        }

    if(counter==9){
        popupMessage.style.display = "block";
        winningMessage.innerText="Draw";
        winningAudio.play();
    }
}




const showPopupButton = document.getElementById("showPopupButton");




popupCloseButton.addEventListener("click", () => {
    popupMessage.style.display = "none";
    reset();

});


function reset(){
   location.reload();
}