function playSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) return;
    
    audio.currentTime = 0; //rewinds to start after hit to allow multiple succesive hits
    
    audio.play();
    key.classList.add('playing');
}

function removeTransition(e){
    if (e.propertyName !== 'transform') return; //so that only transform is used to make changes
    this.classList.remove('playing');
}


window.addEventListener('keydown', playSound);

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
