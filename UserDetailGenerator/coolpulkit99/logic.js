
function callApi() {
    let info = document.getElementById("info")
    info.innerHTML = "Generating..."
    
    const options = {
        method: 'GET',
        mode: 'no-cors'
      };
    
      // alert(input);
    
      fetch("https://randomuser.me/api/")
        .then(response => {
            // console.log(response)
            return response.json();
        })
        .then((data) => {
            console.log(data);
            let results = data["results"][0]
            let gender = results.gender;
            let name=results.name;
            // console.log(name);
            let nameTitle = (name.title)?name.title:"";
            let nameSecond = (name.last) ? name.last : "" ;
            let namefirst = (name.first)?name.first:"";
            let email = results.email;
            let picture = results.picture.thumbnail;
            let location = results.location;
            info.innerHTML = 
            `<div><b>Name: </b>`+nameTitle+" "+namefirst+" "+nameSecond+`</div>
            <div><b>Gender: </b>`+gender+`</div>
            <div><b>Email: </b>`+email+`</div>`+
            // `<img src=`+picture+`/>`
            `<div><b>Address: </b>`+location.street.number+"<br>"+location.street.name+"<br>"+location.city+"<br>"+location.state+"<br>"+location.country+" - "+location.postcode+`</div>`

        });

}