const btn = document.querySelector(".getBtn");
const init_vel = document.querySelector(".init_vel");
const acc = document.querySelector(".acc");
const final_vel = document.querySelector(".final_vel");
const time = document.querySelector(".time");
// ---------------------
const init_vel_select = document.querySelector(".init_vel_select");
const acc_select = document.querySelector(".acc_select");
const final_vel_select = document.querySelector(".final_vel_select");
const time_select = document.querySelector(".time_select");

btn.addEventListener("click", () => getValue());


let finalUnit;
let notGivenVal;
var errors;

function checkIfSameUnits() {
  // check if all units are in the finalUnit unit
  errors = 0;
  if (finalUnit === "m/s" || finalUnit === "s" || finalUnit === "m/s^2") {
    if (final_vel_select !== notGivenVal) {
      final_vel_select.options[final_vel_select.selectedIndex].value !== "m/s"
        ? errors++
        : null;
    }
    if (time_select !== notGivenVal) {
      time_select.options[time_select.selectedIndex].value !== "s"
        ? errors++
        : null;
    }
    if (init_vel_select !== notGivenVal) {
      init_vel_select.options[init_vel_select.selectedIndex].value !== "m/s"
        ? errors++
        : null;
    }
    if (acc_select !== notGivenVal) {
      acc_select.options[acc_select.selectedIndex].value !== "m/s^2"
        ? errors++
        : null;
    }
  } else {
    if (final_vel_select !== notGivenVal) {
      final_vel_select.options[final_vel_select.selectedIndex].value !== "km/hr"
        ? errors++
        : null;
    }
    if (time_select !== notGivenVal) {
      time_select.options[time_select.selectedIndex].value !== "hr"
        ? errors++
        : null;
    }
    if (init_vel_select !== notGivenVal) {
      init_vel_select.options[init_vel_select.selectedIndex].value !== "km/hr"
        ? errors++
        : null;
    }
    if (acc_select !== notGivenVal) {
      acc_select.options[acc_select.selectedIndex].value !== "km/hr^2"
        ? errors++
        : null;
    }
  }

  return errors;
}

function getValue() {
  let valuesArr = {};
  init_vel.value
    ? (valuesArr.init_vel = init_vel.value)
    : (valuesArr.init_vel = false);
  acc.value ? (valuesArr.acc = acc.value) : (valuesArr.acc = false);
  final_vel.value
    ? (valuesArr.final_vel = final_vel.value)
    : (valuesArr.final_vel = false);
  time.value ? (valuesArr.time = time.value) : (valuesArr.time = false);

  Object.keys(valuesArr).forEach((el) => {
    if (valuesArr[el] === false) {
      notGivenVal = el;
      console.log(notGivenVal);
      return notGivenVal;
    }
  });

  // get measurement units

  switch (notGivenVal) {
    case "final_vel":
      finalUnit =
        final_vel_select.options[final_vel_select.selectedIndex].value;
      break;
    case "time":
      finalUnit = time_select.options[time_select.selectedIndex].value;
      break;
    case "acc":
      finalUnit = acc_select.options[acc_select.selectedIndex].value;
      break;
    case "init_vel":
      finalUnit = init_vel_select.options[init_vel_select.selectedIndex].value;
      break;
    default:
      break;
  }

  checkIfSameUnits();

  console.log(errors);

  if (!errors) {
    if (notGivenVal === "final_vel") {
      let v;
      v =
        parseInt(valuesArr.init_vel) + parseInt(valuesArr.acc * valuesArr.time);
      final_vel.value = v;
    } else if (notGivenVal === "time") {
      let t;
      if (valuesArr.final_vel < valuesArr.init_vel) {
        t =
          -(parseInt(valuesArr.final_vel) - parseInt(valuesArr.init_vel)) /
          valuesArr.acc;
      } else {
        t =
          (parseInt(valuesArr.final_vel) - parseInt(valuesArr.init_vel)) /
          valuesArr.acc;
      }
      time.value = Math.abs(t);
    } else if (notGivenVal === "acc") {
      let a;
      a =
        (parseInt(valuesArr.final_vel) - parseInt(valuesArr.init_vel)) /
        valuesArr.time;
      acc.value = a;
    } else {
      let i;
      i =
        parseInt(valuesArr.final_vel) -
        parseInt(valuesArr.acc * valuesArr.time);
      init_vel.value = i;
    }
    errors = 0;
  } else {
    alert("Check if all the units are same, either in s or in hrs.");
  }
}
