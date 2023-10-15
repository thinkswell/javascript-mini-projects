
class SimpleTimer {

    constructor(duration, timerContainer, originalText) {
        this.functionsToExecuteAtTimerEnd = function() {};
        this._everySecond = 1000;
        this._duration = duration;
        this._timeLeft = duration;
        this._timerContainer = timerContainer;
        this._originalText = originalText;
    }

 
    startTimer() {
        this._timerFunction = setInterval(this._updateTimerDisplay.bind(this), this._everySecond);
    }


    endTimer() {
        clearInterval(this._timerFunction);
        this._timeLeft = this._duration;
        this._changeContainerText(this._timerContainer, this._originalText);
        this.functionsToExecuteAtTimerEnd();
    }

    _updateTimerDisplay() {
        this._changeContainerText(this._timerContainer, this._formatTimer(--this._timeLeft));

        var isTimerCompleted = this._timeLeft == 0;
        if (isTimerCompleted) {
            this.endTimer();
        }
    }

    _changeContainerText(container, text) {
        var container = document.getElementsByClassName(container)[0];
        container.innerHTML = text;
    }
    _formatTimer(secondsInput) {
        var minutes = Math.floor(secondsInput / 60);
        var seconds = secondsInput % 60;
        var formattedTimer = (minutes < 10 ? "0" : "" ) + minutes + ":" + (seconds < 10 ? "0" : "" ) + seconds;
        return formattedTimer;
    }
}
