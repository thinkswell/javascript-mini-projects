const api = "https://api.quotable.io/random"

let quote = document.querySelector(".quote")
let author = document.querySelector(".author")
let btn = document.querySelector("#new-quote")

let getQuote = () => {
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      quote.innerHTML = `"${data.content}"`
      author.innerHTML = `- ${data.author}`
    })
}

btn.addEventListener("click", getQuote)
