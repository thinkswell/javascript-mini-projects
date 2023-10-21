const endDate = "01 October 2024 12:00 AM"


document.getElementById("end-date").innerText = endDate;
const inputs = document.querySelectorAll("input");




const clock = () => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = Math.abs(end - now);

    if (diffTime < 0) {
        return;
    }

    inputs[0].value = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    inputs[1].value = Math.ceil(diffTime / (1000 * 60 * 60)) % 24;
    inputs[2].value = Math.ceil(diffTime / (1000 * 60)) % 60;
    inputs[3].value = Math.ceil(diffTime / (1000)) % 60;


    // console.log(diffDays + " days");
}


clock();

setInterval(
    () => {
        clock()
    },
    1000)