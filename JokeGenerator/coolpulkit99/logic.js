
function callApi() {
    let info = document.getElementById("info")
    info.innerHTML = "Generating..."

    // alert(input);
    fetch("https://v2.jokeapi.dev/joke/Any")
        .then(response => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            let setup=data["setup"]
            , delivery=data["delivery"];
          let innerHTML=`
          <div>
          <div class="setup">` + setup + `</div>
          <div> `+delivery+` </div>
          </div>
          `
          info.innerHTML = innerHTML ;
        });

}