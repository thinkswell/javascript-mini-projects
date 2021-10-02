const game = document.getElementById('game');
const block = document.getElementById('block');
const blank = document.getElementById('blank');
const img = document.getElementById('img');
const bird = document.getElementById('bird');
let colors = [
    'green','red' ,'blue','purple','orange','black',
]
let jumping =0;
let counter = 0;
blank.addEventListener('animationiteration',() =>{
    let randomno = -((Math.random()*300)+150) ;
     blank.style.top = randomno + 'px';
     let randcol = Math.floor(Math.random()*6);
     block.style.backgroundColor = colors[randcol];
     document.body.style.backgroundColor = colors[randcol];
     counter++;
})
setInterval(function(){
    let birdTop =parseInt(window.getComputedStyle(bird).getPropertyValue('top'));
    if(jumping==0){
        img.classList.add('transform');
    bird.style.top = (birdTop +3) +'px';  }
    let blockleft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    let blanktop = parseInt(window.getComputedStyle(blank).getPropertyValue('top'));
    // let birdTop =parseInt(window.getComputedStyle(bird).getPropertyValue('top'));

    let bTop = -(500-birdTop);
    if((birdTop>475)||((blockleft<25)&&(blockleft>-50)&&((bTop<blanktop)||(bTop>blanktop+125)))){
        alert('Game Over.Score:' +  counter )
        bird.style.top = 100 + 'px';
        counter=0;
    }
},10);
game.addEventListener('click',jump);
function jump(){
    jumping = 1;
    let jumpcnt=0;
    let jumpinterval = setInterval(() => {
        let birdTop =parseInt(window.getComputedStyle(bird).getPropertyValue('top'));  
            if((birdTop>6)&&(jumpcnt<15)){
        img.classList.remove('transform');
        bird.style.top = (birdTop -5) +'px';
   } 
    if(jumpcnt>20){
        clearInterval(jumpinterval);
        jumping=0;
        jumpcnt=0;
    }
    jumpcnt++;
}, 10)
}