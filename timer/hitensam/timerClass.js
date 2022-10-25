class Timer
{
    constructor(durationInput,startButton, pauseButton, callbacks)
    {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.startButton.addEventListener('click', this.start)
        this.pauseButton.addEventListener('click', this.pause)
        if (callbacks)
        {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onPause = callbacks.onPause;
        }
    }
    start=()=>
    {
        if(this.onStart)
        {this.onStart(this.timeRemaining)}
        this.tick()
        this.paused = setInterval(this.tick, 20)
    }
    pause=()=>
    {
        if(this.onPause)
        {this.onPause()}
        clearInterval(this.paused)
    }
    tick=()=>
    {
        if(this.onTick)
        {this.onTick(this.timeRemaining)}
        if(this.timeRemaining<=0){this.pause()}
        else
        this.timeRemaining = this.timeRemaining  - 0.02;
    }
    get timeRemaining()
    {
        return parseFloat(this.durationInput.value)
    }
    set timeRemaining(time)
    {
        this.durationInput.value = time.toFixed(2)
    }
}