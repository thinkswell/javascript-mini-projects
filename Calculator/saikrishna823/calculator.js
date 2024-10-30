let inputBtn=document.getElementById("inputBtn")
let buttons=document.querySelectorAll(".button");
const evalButton=document.getElementById("evalButton");
const clearBtn=document.querySelector(".clearBtn");
buttons.forEach((button)=>{
 button.onclick=()=>{
        inputBtn.value+=button.textContent;
    }
    })
;
evalButton.onclick=()=>{
    inputBtn.value=eval(inputBtn.value);
}
clearBtn.onclick=()=>{
    inputBtn.value=" ";
}