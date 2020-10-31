var button = document.querySelector('.button');

button.onclick = function () {
 let x = Math.floor(Math.random() * 256);
 let y = Math.floor(Math.random() * 256);
 let z = Math.floor(Math.random() * 256);

 this.style.backgroundColor = "rgb(" + x + "," + y + "," + z + ")";
};

