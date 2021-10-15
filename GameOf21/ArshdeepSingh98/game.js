var firstTurn = Math.random() < 0.5

const startElm = document.getElementById('start')
const infoElm = document.getElementById('info-container')
const optionsElm = document.getElementById('options')
const resultElm = document.getElementById('result')
const history = document.getElementById('guess-history')
const option1 = document.getElementById('option-1')
const option2 = document.getElementById('option-2')


function start() {
    const responseNode = document.createElement('span')

    startElm.classList.add('hidden')
    infoElm.classList.add('hidden')
    optionsElm.classList.remove('hidden')

    responseNode.innerHTML = 1;
    responseNode.classList.add('float-left');

    history.style.display = 'flex'; 

    if (firstTurn === 0) {
        history.append(responseNode)

        option1.innerHTML = 2;
        option2.innerHTML = 3;
    }
}

function getOptimumValue(value) {
    return Number(value)+Number(1);
}

function resetState() {
    const responseNode = document.createElement('span')
    firstTurn = Math.random() < 0.5;
    setTimeout(function() {
        history.innerHTML = '';
    }, 500)

    if (firstTurn === 0) {
        responseNode.innerHTML = 1;
        responseNode.classList.add('float-left');
        history.append(responseNode)

        option1.innerHTML = 2;
        option2.innerHTML = 3;
    } else {
        option1.innerHTML = 1;
        option2.innerHTML = 2;
    }

    setTimeout(function() {
        resultElm.style.display = 'none';
    }, 4000)
}

function check(e) {
    e.preventDefault();

    const textNode = document.createElement('span')
    const responseNode = document.createElement('span')

    const value1 = option1.innerHTML;
    const value2 = option2.innerHTML;
    let selected = 'option1'

    const activeElement = document.activeElement;
    if(activeElement.type === 'submit') {
        selected = activeElement.name
    }

    if (selected === 'option1') {
        textNode.innerHTML = value1;
        textNode.classList.add('float-right');
        
        let responseValue = getOptimumValue(value1);
        responseNode.innerHTML = responseValue;
        responseNode.classList.add('float-left');

        setTimeout(function() {
            history.append(textNode)    
        }, 100);

        if (Number(value1) === 21) {
            resultElm.style.display = 'flex';
            resultElm.style.background = '#0088ff';
            resultElm.innerHTML = 'YOU WON';
            resetState();
            return false;
        } else if (Number(value1) > 21) {
            resultElm.style.display = 'flex';
            resultElm.style.background = 'red';
            resultElm.innerHTML = 'YOU LOOSE';
            resetState();
            return false;
        }

        setTimeout(function() {
            history.append(responseNode)
        }, 500)

        if (Number(responseValue) === 21) {
            resultElm.style.display = 'flex';
            resultElm.style.background = 'red';
            resultElm.innerHTML = 'YOU LOOSE';
            resetState();
            return false;
        } else if (Number(responseValue) > 21) {
            resultElm.style.display = 'flex';
            resultElm.style.background = '#0088ff';
            resultElm.innerHTML = 'YOU WON';
            resetState();
            return false;
        }

        option1.innerHTML = responseValue + 1;
        option2.innerHTML = responseValue + 2;
    } else {
        textNode.innerHTML = value2;
        textNode.classList.add('float-right')
 
        let responseValue = getOptimumValue(value2);
        responseNode.innerHTML = responseValue;
        responseNode.classList.add('float-left');

        setTimeout(function() {
            history.append(textNode)
        }, 100);

        if (Number(value2) === 21) {
            resultElm.style.display = 'flex';
            resultElm.style.background = '#0088ff';
            resultElm.innerHTML = 'YOU WON';
            resetState();
            return false;
        } else if (Number(value2) > 21) {
            resultElm.style.display = 'flex';
            resultElm.style.background = 'red';
            resultElm.innerHTML = 'YOU LOOSE';
            resetState();
            return false;
        }

        setTimeout(function() {
            history.append(responseNode)
        }, 500)

        if (Number(responseValue) === 21) {
            resultElm.style.display = 'flex';
            resultElm.style.background = 'red';
            resultElm.innerHTML = 'YOU LOOSE';
            resetState();
            return false;
        } else if (Number(responseValue) > 21) {
            resultElm.style.display = 'flex';
            resultElm.style.background = '#0088ff';
            resultElm.innerHTML = 'YOU WON';
            resetState();
            return false;
        }

        option1.innerHTML = responseValue + 1;
        option2.innerHTML = responseValue + 2;
    }
    setTimeout(function() {
        history.scrollTop = history.scrollHeight;
    }, 500)
}