const measurements = {
  tsp: 1,
  tbsp: 3,
  cup: 48,
  pint: 96,
  quart: 192,
  gallon: 768,
};

document
  .querySelector("#calculate-button")
  .addEventListener("click", function () {
    const beforeSelect = document.querySelector("#initial");
    const beforeAmount = document.querySelector("#before input").value;
    const beforeUnit = beforeSelect.options[beforeSelect.selectedIndex].value;
    const before = beforeAmount * measurements[beforeUnit];

    const afterDisplay = document.querySelector("#after div");
    const afterSelect = document.querySelector("#final");
    const afterUnit = afterSelect.options[afterSelect.selectedIndex].value;

    console.log(before / measurements[afterUnit]);
    afterDisplay.innerHTML = `${before / measurements[afterUnit]} ${afterUnit}`;
  });
