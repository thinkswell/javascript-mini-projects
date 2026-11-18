const dobInput = document.getElementById("dob");
const calcBtn = document.getElementById("calc");
const errorEl = document.getElementById("error");
const resultEl = document.getElementById("result");

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Parse "YYYY-MM-DD" as a local date (avoids timezone shifts)
function parseDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Exact age in years, months and days
function calculateAge(dob, today) {
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    // days in the previous month
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

function daysUntilNextBirthday(dob, today) {
  const next = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (next < today) next.setFullYear(today.getFullYear() + 1);
  return Math.round((next - today) / MS_PER_DAY);
}

function showError(message) {
  errorEl.textContent = message;
  resultEl.classList.add("hidden");
}

function handleCalculate() {
  errorEl.textContent = "";

  if (!dobInput.value) {
    showError("Please select your date of birth.");
    return;
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dob = parseDate(dobInput.value);

  if (dob > today) {
    showError("Date of birth cannot be in the future.");
    return;
  }

  const { years, months, days } = calculateAge(dob, today);

  document.getElementById("years").textContent = years;
  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days;
  document.getElementById("totalDays").textContent = Math.floor(
    (today - dob) / MS_PER_DAY
  ).toLocaleString();
  document.getElementById("nextBday").textContent = daysUntilNextBirthday(dob, today);

  resultEl.classList.remove("hidden");
}

// Block future dates in the picker
dobInput.max = new Date().toISOString().split("T")[0];

calcBtn.addEventListener("click", handleCalculate);
dobInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleCalculate();
});
