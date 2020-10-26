
function generateQuote() {

    fetch("https://type.fit/api/quotes")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let items=data;
            var item = items[Math.floor(Math.random() * items.length)];
            let author=item.author==null?"Unknown":item.author;
            document.getElementById("quote").innerHTML="'"+item.text+"'<br>- "+author;
        });

}