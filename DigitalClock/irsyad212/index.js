setInterval(loop, 1); //run the function "loop" with delay of 1 millisecond

function loop(){ 
	let tm = new Date(); //get the Date object

	let sc = tm.getSeconds(); //get the second (0-59)
	let mn = tm.getMinutes(); //get the minute (0-59)
	let hr = tm.getHours(); //get the hour (0-23)

	let day = tm.getDate(); //get the day of the month (1-31)
	let month = tm.getMonth() + 1; //get the month (0-11). So add 1 to display the normal month (1-12)
	let year = tm.getYear() + 1900; //get the year (current_year - 1900). So add 1900 to display the normal year

	document.getElementById("time").innerHTML = hr + ":" + mn + ":" + sc; 
	document.getElementById("date").innerHTML = year + "/" + month + "/" + day;
}
