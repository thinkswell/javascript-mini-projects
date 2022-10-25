// alert("You are getting tricked!!")
const startButton = document.querySelector("#startButton")
const pauseButton = document.querySelector("#pauseButton")
const durationInput = document.querySelector("#durationInput")
const circle = document.querySelector('circle')

const perimeter = circle.getAttribute('r') * 2 * Math.PI
circle.setAttribute('stroke-dasharray', perimeter)

let currentOffset =  0;

let duration;
const newTimer = new Timer(durationInput,startButton, pauseButton,{
    onStart(totalDuration)
    {
        duration = totalDuration
        console.log('Timer started!!');
    },
    onTick(timeRemaining)
    {
        
        circle.setAttribute('stroke-dashoffset', perimeter*timeRemaining /duration - perimeter)
        // currentOffset = currentOffset - 1;
        console.log('Timer ticked!!')
    },
    onPause()
    {
        console.log('Timer stopped!!')
    }
});