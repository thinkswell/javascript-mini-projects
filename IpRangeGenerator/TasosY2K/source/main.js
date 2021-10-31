var rangeStart1 = 0;
var rangeStart2 = 0;
var rangeStart3 = 0;
var rangeStart4 = 0;

var rangeEnd1 = 255;
var rangeEnd2 = 255;
var rangeEnd3 = 255;
var rangeEnd4 = 255;

var ipAmount = 1;

function alertBox(type, text) {
	if (type === true) {
		document.getElementById('log').innerHTML = text;
		document.getElementById('log').className = "alert-success";
	} else if (type === false) {
		document.getElementById('log').innerHTML = text;
		document.getElementById('log').className = "alert-danger";
	}
}

function rangeSet() {
	rangeStart1 = document.getElementById('rangeStart1').value;
	rangeStart2 = document.getElementById('rangeStart2').value;
	rangeStart3 = document.getElementById('rangeStart3').value;
	rangeStart4 = document.getElementById('rangeStart4').value;

	rangeEnd1 = document.getElementById('rangeEnd1').value;
	rangeEnd2 = document.getElementById('rangeEnd2').value;
	rangeEnd3 = document.getElementById('rangeEnd3').value;
	rangeEnd4 = document.getElementById('rangeEnd4').value;
}

function amountSet() {
	ipAmount = document.getElementById('ipAmount').value;
}

function ipGen() {

	if (ipAmount > 256) return(alertBox(false, "You cannot generate more than 256 IP's at a time"));

	document.getElementById('ipOut').innerHTML = '';

	for (var i = 0; i < ipAmount; i++) {
		var out1 = Math.floor(Math.random() * (parseFloat(rangeEnd1) - parseFloat(rangeStart1) + 1)) + parseFloat(rangeStart1);
		var out2 = Math.floor(Math.random() * (parseFloat(rangeEnd2) - parseFloat(rangeStart2) + 1)) + parseFloat(rangeStart2);
		var out3 = Math.floor(Math.random() * (parseFloat(rangeEnd3) - parseFloat(rangeStart3) + 1)) + parseFloat(rangeStart3);
		var out4 = Math.floor(Math.random() * (parseFloat(rangeEnd4) - parseFloat(rangeStart4) + 1)) + parseFloat(rangeStart4);
		document.getElementById('ipOut').innerHTML += out1 + "." + out2 + "." + out3 + "." + out4 + "&#10;";
	}
	alertBox(true, ipAmount + " IP's generated successfuly");
}

function autoCopy() {
	var text = document.getElementById("ipOut");
	text.select();
	document.execCommand("copy");
	alertBox(true, ipAmount + " IP's copied to clipboard")
}

function downloadText() {
	var text = document.getElementById("ipOut").value;
	if (!text) return(alertBox(false, "There are no generated IP's to download"));
  text = text.replace(/\n/g, "\r\n");
  var blob = new Blob([text], { type: "text/plain"});
  var anchor = document.createElement("a");
  anchor.download = `${ipAmount}-IP-list.txt`;
  anchor.href = window.URL.createObjectURL(blob);
  anchor.target ="_blank";
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
	alertBox(true, ipAmount + " IP's downloaded successfuly")
}

var EventUtil = {

	addHandler: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},

	removeHandler: function (element, type, handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type, handler, false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type, handler);
		} else {
			element["on" + type] = null;
		}
	},

	getEvent: function (event) {
		return event ? event : window.event;
	},

	getTarget: function (event) {
		return event.target || event.srcElement;
	},

	getWheelDelta: function (event) {
		if (event.wheelDelta) {
			return event.wheelDelta;
		} else {
			return -event.detail * 40;
		}
	},

	preventDefault: function (event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}

};

function onWheel(event) {

	event = EventUtil.getEvent(event);
	var curElem = EventUtil.getTarget(event);
	var curVal = parseInt(curElem.value);
	var delta = EventUtil.getWheelDelta(event);

	if (delta > 0) {
		curElem.value = curVal + 1;
		rangeSet();
		amountSet();
	} else {
		curElem.value = curVal - 1;
		rangeSet();
		amountSet();
	}

	if (curElem.value > 255) {
		curElem.value = 255;
	} else if (curElem.value < 0) {
		curElem.value = 0;
	}

	EventUtil.preventDefault(event);

}

$(function () {

	$(".wheelable").hover(function () {
			EventUtil.addHandler(document, 'mousewheel', onWheel);
			EventUtil.addHandler(document, 'DOMMouseScroll', onWheel);
		},
		function () {
			EventUtil.removeHandler(document, 'mousewheel', onWheel);
			EventUtil.removeHandler(document, 'DOMMouseScroll', onWheel);
		});

});
