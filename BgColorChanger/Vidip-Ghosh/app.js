// const button = document.querySelector('button');
// const bge = document.querySelector('section');

// button.addEventListener('click',() => {
//     let col = "#";
//     col+=Math.random().toString(16).slice(2,8);
//     bge.style.backgroundColor = col;
// })

var btn = document.getElementById('btn');
random = (number) =>{
    return Math.floor(Math.random() * (number+1));  //The function 'random' randomly generates a number
}
btn.onclick = () =>{
    document.body.style.backgroundColor = `rgb(${random(255)},${random(255)},${random(255)})`
}