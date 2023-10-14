const button =document.getElementsByClassName('btn')[0]
const text =document.getElementsByClassName('text')[0]
const container = document.getElementsByClassName('container')[0]

async function displayDate(){ 
console.log(1)
    let colours =[];
let m = Math.floor(Math.random()*6)+2;
for(let i =0; i<m ; i++){
    let colour=`rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
    colours.push(colour)
}
console.log(colours)
let value =container.style.background =`linear-gradient(${Math.floor(Math.random() * 360)}deg, ${colours.join(',')})`;
text.innerHTML =value
await navigator.clipboard.writeText(value).then(()=>{
    alert("Gradient added in ClipBoard")
});

}

console.log(2);
button.addEventListener("click", displayDate);