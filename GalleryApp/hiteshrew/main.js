const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');
let count = 0;
/* Looping through images */


for (var i = 1 ; i < 6 ; i++) {

const newImage = document.createElement('img');
var imgSrc = "images/pic"  + i + ".jpg";
newImage.setAttribute('src', imgSrc.toString());
thumbBar.appendChild(newImage);

 newImage.onclick = function(e) {
    displayedImage.src = e.target.src;
  }
}



/* Wiring up the Darken/Lighten button */

btn.onclick = function(){

	if (count%2 === 0) {
		overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
	}
	else{
		overlay.style.backgroundColor = 'rgba(0,0,0,0)';
	}
	count++;

}