
function callApi() {
    let input = document.getElementById("input").value
    let info = document.getElementById("info")
    if (!input) {
        info.innerHTML = "Please enter a name and try again."
        return;
    }
    info.innerHTML = "Calculating..."

    // alert(input);
    fetch("https://api.genderize.io/?name=" + input)
        .then(response => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data.gender == null)
                info.innerHTML = "We are not so sure.";
            else
                info.innerHTML = "You are a " + data.gender;
        });

}