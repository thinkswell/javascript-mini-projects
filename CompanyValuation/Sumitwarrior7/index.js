document.addEventListener("DOMContentLoaded", function () {
  const calculateBtn = document.getElementById("calculateBtn");
  const result = document.getElementById("result");

  calculateBtn.addEventListener("click", function () {
    const companyName = document.getElementById("companyName").value;
    const teamSize = parseInt(document.getElementById("teamSize").value);
    const revenue = parseFloat(document.getElementById("revenue").value);
    const profitMargin =
      parseFloat(document.getElementById("profitMargin").value) / 100;
    const growthRate =
      parseFloat(document.getElementById("growthRate").value) / 100;

    // Input validation
    if (
      !companyName ||
      isNaN(teamSize) ||
      isNaN(revenue) ||
      isNaN(profitMargin) ||
      isNaN(growthRate)
    ) {
      result.innerHTML = "Please enter valid data for all fields.";
      return;
    }

    // Sample company valuation formula (replace with your own model)
    const valuation = (revenue * (1 + growthRate)) / (1 - profitMargin);

    result.innerHTML = `Company Name: ${companyName}<br>Valuation: $${valuation.toFixed(
      2
    )}`;
  });
});
