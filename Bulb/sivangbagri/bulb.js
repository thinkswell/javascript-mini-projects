const BULB_ON_URL = "https://i.postimg.cc/6QyTynzr/bulb-on.png";
const BULB_OFF_URL = "https://i.postimg.cc/KjK1wL3c/bulb-off.png";

function lightSwitch() {
  const checkbox = document.getElementById("flexSwitchCheckChecked");
  if (checkbox.checked) {
    bulb_on();
  } else {
    bulb_off();
  }
}

function bulb_on() {
  const bulb = document.getElementById("bulb");
  bulb.src = BULB_ON_URL;
}

function bulb_off() {
  const bulb = document.getElementById("bulb");
  bulb.src = BULB_OFF_URL;
}
