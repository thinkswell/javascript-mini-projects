
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let maxX = canvas.width;
let maxY = canvas.height;

let paddleWidth = 10;
let paddleHeight = 35;
let maxPaddleSpeed = .75;
// All paddles need to store is y position
let paddle1 = Math.floor(maxY / 2);
let paddle2 = paddle1;
let points1 = 0;
let points2 = 0;
let ballX = Math.floor(maxX / 2);
let ballY = Math.floor(maxY / 2);
let ballVx = 1;
let ballVy = 1;

function render() {
	ctx.fillStyle = "#444444";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#cccccc";
	ctx.fillRect(ballX-5, ballY-5, 10, 10);

	ctx.fillRect(10, paddle1 - paddleHeight/2, 10, paddleHeight);
	ctx.fillRect(280, paddle2 - paddleHeight/2, 10, paddleHeight);

	ctx.fillText(points1, 5, 10);
	ctx.fillText(points2, 285, 10);
}

function reset(full) {
	paddle2 = Math.floor(maxY / 2);
	ballX = Math.floor(maxX / 2);
	ballY = Math.floor(maxY / 2);
	ballVx = Math.random() > .5 ? 1 : -1;
	ballVy = 1;
	if (full) {
		points1 = 0;
		points2 = 0;
	}
}

function clamp(val, min, max) {
	return Math.min(Math.max(val, min), max);
}

function handleMouseMove(e) {
	let targetY = (e.pageY - canvas.offsetTop) * canvas.height / canvas.offsetHeight;
	paddle1 = targetY;
}

function main() {
	paddle2 += clamp(ballY - paddle2, -maxPaddleSpeed, maxPaddleSpeed);

	let nextX = ballX + ballVx;
	let nextY = ballY + ballVy;
	if (nextX < 0) {
		points2++;
		reset();
	} else if (nextX > maxX) {
		points1++;
		reset();
	} else if (nextY < 0 || nextY > maxY) {
		ballVy = -ballVy;
	}
	if (ballX < 20 && ballX > 10 && Math.abs(ballY - paddle1) < paddleHeight / 2) {
		ballVx = -ballVx * 1.1;
		ballVy += (Math.random()-0.5) * .1;
	}
	if (ballX < 290 && ballX > 280 && Math.abs(ballY - paddle2) < paddleHeight / 2) {
		ballVx = -ballVx * 1.1;
		ballVy += (Math.random()-0.5) * .1;
	}

	ballX += ballVx;
	ballY += ballVy;

	render();


	requestAnimationFrame(main);
}

document.onmousemove = handleMouseMove;
reset(true);
main();
