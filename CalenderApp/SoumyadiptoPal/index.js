document.addEventListener("DOMContentLoaded", function () {
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");
    const currentMonth = document.getElementById("currentMonth");
    const calendarBody = document.getElementById("calendar-body");

    const dropdownList = document.getElementById('list-2');

    for (let year = 1994; year <= 2030; year++) {
        const li = document.createElement('li');
        li.textContent = year;
        dropdownList.appendChild(li);
    }

    let currentDate = new Date();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        currentMonth.textContent = new Date(year, month, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        let date = new Date(firstDay);
        calendarBody.innerHTML = '';

        for(let i=date.getDay();i>0;i--)
        {
            const cell = document.createElement("td");
            calendarBody.appendChild(cell);
        }
        while (date <= lastDay) {
            const cell = document.createElement("td");
            cell.textContent = date.getDate();
            calendarBody.appendChild(cell);

            if (date.getDay() === 6) {
                calendarBody.appendChild(document.createElement("tr"));
            }

            date.setDate(date.getDate() + 1);
        }
        if(date.getDay()!=0){
        for(let i=date.getDay();i<=6;i++)
        {
            const cell = document.createElement("td");
            calendarBody.appendChild(cell);
        }
    }
    }

    prevMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();

    const dropdownButtons = document.querySelectorAll(".dropdown-button");
    const dropdownLists = document.querySelectorAll(".dropdown-list");

    // Show/hide the dropdown list when a button is clicked
    dropdownButtons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            const list = dropdownLists[index];
            list.style.display = list.style.display === "block" ? "none" : "block";
        });
    });

    // Close the dropdowns when clicking outside of them
    document.addEventListener("click", function (event) {
        dropdownButtons.forEach(function (button, index) {
            const list = dropdownLists[index];
            if (!button.contains(event.target)) {
                list.style.display = "none";
            }
        });
    });

    // Handle option selection for each dropdown
    dropdownLists.forEach(function (list, index) {
        list.addEventListener("click", function (event) {
            if (event.target.tagName === "LI") {
                dropdownButtons[index].textContent = event.target.textContent;
                if(isNaN(event.target.textContent)){
                const monthString = event.target.textContent;
                currentDate.setMonth(new Date(monthString + " 1, 2000").getMonth());
                renderCalendar();
                }
                else
                {
                    const yearString = event.target.textContent;
                    currentDate.setFullYear(parseInt(yearString, 10));
                    renderCalendar();
                }
                list.style.display = "none";
            }
        });
    });
});