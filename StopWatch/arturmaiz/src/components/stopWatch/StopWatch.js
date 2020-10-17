import React, { useState } from 'react';
import './StopWatch.scss';

const StopWatch = props => {
	let [seconds, setSeconds] = useState(0);
	let [minutes, setMinutes] = useState(0);
	let [hours, setHours] = useState(0);
	let [status, setStatus] = useState('stoppped');
	let [intervalId, setIntervalid] = useState(null);

	const renderStopWatch = () => {
		setSeconds((seconds = seconds + 1));

		if (seconds / 60 === 1) {
			setSeconds((seconds = 0));
			setMinutes((minutes = minutes + 1));
		}

		if (minutes / 60 === 1) {
			setMinutes((minutes = 0));
			setHours((hours = hours + 1));
		}
	};

	const startStop = () => {
		if (status === 'stoppped') {
			setIntervalid(setInterval(renderStopWatch, 100));
			setStatus('started');
		} else {
			clearInterval(intervalId);
			setStatus('stoppped');
		}
	};

	const resetWatch = () => {
		setSeconds(0);
		setMinutes(0);
		setHours(0);
		clearInterval(intervalId);
		setStatus('stoppped');
	};

	return (
		<div className="stopWatchWrapper">
			<div className="github">
				<a href="https://github.com/arturmaiz/StopWatch">
					<i class="fab fa-github"></i> github
				</a>
			</div>
			<div id="stopWatch">
				{hours < 10 ? '0' + hours.toString() : hours}:{minutes < 10 ? '0' + minutes.toString() : minutes}:
				{seconds < 10 ? '0' + seconds.toString() : seconds}
			</div>
			<div className="stopWatchBtns">
				<button onClick={() => startStop()} id="startStop">
					{status === 'stoppped' ? 'start' : 'stop'}
				</button>
				<button onClick={() => resetWatch()} id="reset">
					reset
				</button>
			</div>
		</div>
	);
};

export default StopWatch;
