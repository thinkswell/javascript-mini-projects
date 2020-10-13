<script>
	let canvas;
	let width = 600;
	let height = 600;

	let today = new Date();
	$: hours = today.getHours();
	$: minutes = today.getMinutes();
	$: seconds = today.getSeconds();

	setInterval(() => {
		today = new Date();
	}, 1000);

	$: {
		if(canvas) {
			const ctx = canvas.getContext('2d');
			ctx.clearRect(0, 0, width, height);
			const center = {
				x: Math.floor(width / 2),
				y: Math.floor(height / 2)
			}
			const getHand = (padding, value, maxValue) => {
				const angle = (value / maxValue) * (2 * Math.PI) - (.5 * Math.PI);
				const x = center.x + (center.x - padding) * Math.cos(angle);
				const y = center.y + (center.y - padding) * Math.sin(angle);
				return {x, y};
			}
			// Seconds
			ctx.beginPath();
			ctx.moveTo(center.x, center.y);
			ctx.strokeStyle = 'rgb(255, 0, 0)';
			ctx.lineWidth = 3;
			const secondsHand = getHand(30, seconds, 60);
			ctx.lineTo(secondsHand.x, secondsHand.y);
			ctx.stroke();
			// Minutes
			ctx.beginPath();
			ctx.moveTo(center.x, center.y);
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 6;
			const minutesHand = getHand(60, minutes, 60);
			ctx.lineTo(minutesHand.x, minutesHand.y);
			ctx.stroke();
			// Hours
			ctx.beginPath();
			ctx.moveTo(center.x, center.y);
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 8;
			const hoursHand = getHand(120, hours%12, 12);
			ctx.lineTo(hoursHand.x, hoursHand.y);
			ctx.stroke();
			// Circle in the center
			ctx.beginPath();
			ctx.moveTo(center.x, center.y);
			ctx.arc(center.x, center.y, 10, 0, Math.PI * 2);
			ctx.fill();
			// Border circle
			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.arc(center.x, center.y, center.x - 15, 0, Math.PI * 2);
			ctx.stroke();
		}
	}

</script>

<canvas bind:this={canvas} width={width} height={height} style='width: {width}px; height: {height}px'></canvas>

<style>
</style>