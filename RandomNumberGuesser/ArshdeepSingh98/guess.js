let target = Math.round(Math.random() === 0 ? 1 : Math.random()  * 1000)
let count = 1;
let won = false;

function check(event) {
    event.preventDefault();

    const guessElm = document.getElementById('user-guess')
    const history = document.getElementById('guess-history')
    const guessValue = guessElm && guessElm.value
    const textNode = document.createElement('span')
    const highNode = document.createElement('span')
    const lowNode = document.createElement('span')

    console.log('target', target)
    
    textNode.innerHTML = guessValue;
    textNode.classList.add('float-left');
    highNode.innerHTML = 'Too high!! guess smaller number';
    highNode.classList.add('float-right-red');
    lowNode.innerHTML = 'Too low!! guess bigger number';
    lowNode.classList.add('float-right-yellow');

    if (guessValue > target) {
        history.append(highNode);
        won = false;
    } else if (guessValue < target) {
        history.append(lowNode);
        won = false;
    } else {
        target = Math.round(Math.random() === 0 ? 1 : Math.random()  * 1000)
        alert(`YOU WON!!! in ${count} tries`)
        won = true;
    }

    history.append(textNode);
    history.scrollTop = history.scrollHeight;
    count++;
    guessElm.value = null;

    if (won) {
        history.innerHTML = ''    
        count = 0;
    }

    return false;
}
