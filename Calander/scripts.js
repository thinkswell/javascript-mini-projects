const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const selectYear = document.getElementById("year");
const selectMonth = document.getElementById("month");
const monthAndYear = document.getElementById("monthAndYear");
const calendarBody = document.getElementById("calendar-body");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

document.addEventListener("DOMContentLoaded", () => {
  showCalendar(currentMonth, currentYear);
});

function next() {
  currentMonth = (currentMonth + 1) % 12;
  if (currentMonth === 0) currentYear++;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  if (currentMonth === 11) currentYear--;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  const selectedYear = parseInt(selectYear.value);
  const selectedMonth = parseInt(selectMonth.value);

  if (!isNaN(selectedYear) && !isNaN(selectedMonth)) {
    currentYear = selectedYear;
    currentMonth = selectedMonth;
    showCalendar(currentMonth, currentYear);
  }
}

function showCalendar(month, year) {
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  // Clear previous calendar
  calendarBody.innerHTML = "";

  // Set month and year
  monthAndYear.textContent = `${months[month]} ${year}`;
  selectYear.value = year;
  selectMonth.value = month;

  let date = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");

      if (i === 0 && j < firstDay) {
        cell.textContent = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        cell.textContent = date;

        // Highlight today
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("bg-info");
        }

        date++;
      }

      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
}
