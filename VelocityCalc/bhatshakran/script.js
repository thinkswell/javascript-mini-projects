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

  let notGivenVal;

  Object.keys(valuesArr).forEach((el) => {
    if (valuesArr[el] === false) {
      notGivenVal = el;
      console.log(notGivenVal);
      return notGivenVal;
    }
  });

  // get measurement units
  let finalUnit;

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
  console.log(finalUnit);

  if (notGivenVal === "final_vel") {
    let v;
    // using v = u + at
    v = parseInt(valuesArr.init_vel) + parseInt(valuesArr.acc * valuesArr.time);
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
      parseInt(valuesArr.final_vel) - parseInt(valuesArr.acc * valuesArr.time);
    init_vel.value = i;
  }
}
