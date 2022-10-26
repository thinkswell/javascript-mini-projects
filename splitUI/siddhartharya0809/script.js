document.addEventListener("DOMContentLoaded", function () {
	var parent = document.querySelector(".splitview"),
		topPanel = parent.querySelector(".top"),
		handle = parent.querySelector(".handle"),
		skewHack = 0,
		delta = 0;
	if (parent.className.indexOf("skewed") != -1) {
		skewHack = 1000;
	}

	// The `mousemove` event is triggered when the mouse moves.
	parent.addEventListener("mousemove", function (event) {
		/*
			Get the delta between the mouse and position and center point.
			The `event.clientX` property contains the x - coordinate of the mouse.
			The `window.innerWidth` property contains the width of the browser window.
		*/
		delta = (event.clientX - window.innerWidth / 2) * 0.5;

		/*
			The `delta` variable is used to store the difference between the mouse position and the center of the browser window.
			The `handle` element is moved to the new mouse position.
		*/
		handle.style.left = event.clientX + delta + "px";

		// The `topPanel` element is resized to match the new mouse position.
		topPanel.style.width = event.clientX + skewHack + delta + "px";
	});
});
