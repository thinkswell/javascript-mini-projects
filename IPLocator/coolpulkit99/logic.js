
function callApi() {
    let info = document.getElementById("info")
    info.innerHTML = "Calculating..."

    // alert(input);
    fetch("https://freegeoip.app/json/")
        .then(response => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            let ip = data["ip"]
            , country = data["country_name"]
            , region = data["region_name"]
            , city = data["city"];
            let innerHtml=`
            <div>
                <label class="titletext"><b> IP Address </b></label>
                <div> `+ip+` </div>
                <label class="titletext"><b> Country </b></label>
                <div> `+country+` </div>
                <label class="titletext"><b> Region </b></label>
                <div> `+region+` </div>
                <label class="titletext"><b> City </b></label>
                <div> `+city+` </div>
            </div>
            `

            info.innerHTML=innerHtml;
            
        });

}