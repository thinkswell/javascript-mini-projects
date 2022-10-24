
let txtMin = document.getElementById("minutes");
let txtSec = document.getElementById("seconds");
let minInput = document.getElementById("minInput");
let secInput = document.getElementById("secInput");
let add = document.getElementById("add");
let xx = document.getElementById("minInput");
xx.addEventListener("blur",()=>{
    console.log(xx.value) 
})
add.addEventListener("click",()=>{  
    
    console.log(minInput.value) ;
    let numbb = parseInt(minInput.value)
    console.log(typeof(numbb) )
}) ;
 
let x = 5;
let numbb = parseInt(minInput.value);


var secs;
let mins ; 

function countdown() {
    mins = minInput.value;
    secs = mins * 60;
    setTimeout('Decrement()', 60);
}


function Decrement() {
    
    if (document.getElementById) {

        if (seconds < 59) {
            txtSec.innerText = secs;
        }

       
        else {
            txtMin.innerText = getminutes();
            txtSec.innerText = getseconds();
        }
        

        if (mins < 1) {
            txtMin.style.color = "red";
            txtSec.style.color = "red";
        }
       
        if (mins < 0) {
            alert('time up');
            txtMin.innerText = 0;
            txtSec.innerText = 0;
        }
        else {
            secs--;
            setTimeout('Decrement()', 1000);
        }
    }
}

function getminutes() {
    mins = Math.floor(secs / 60);
    return mins;
}

function getseconds() {
    return secs - Math.round(mins * 60);
}