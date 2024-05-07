const canvas = document.getElementById("canvas");

let n = 20;
let arr = [];
function init(){
    for(let i=0;i<n;i++){
    arr[i] = Math.random();
    }
    LineDraw(-1,"cyan");
}
function LineDraw(index, color){
    canvas.innerHTML = "";
    for(let i = 0; i< arr.length; i++){
    let bar = document.createElement("div");
    bar.style.height = arr[i]*100 + "%";
    bar.classList.add("bar");
    canvas.appendChild(bar);
    if(index != -1 && (index === i || index === i-1)){
    bar.style.backgroundColor = color;
    }
    else {
        bar.style.backgroundColor= "#03a9f4";
    }
    }
}

init();
 async function checker(i){
    if(arr[i]>arr[i+1]){
        [arr[i],arr[i+1]] = [arr[i+1], arr[i]];
        LineDraw(i,"purple");
    }
    else{
        LineDraw(i,"purple");
    }    
}
async function BubbleSort(n){
    if(n===1){
        return;
    }
    
    for(let i = 0; i< arr.length ; i++){
        setTimeout(async ()=>{  
        const result = await checker(i);
        },300);
    }

    BubbleSort(n-1);
    
}
function sort(){
   BubbleSort(arr.length);
   LineDraw(-1,"cyan");
}

