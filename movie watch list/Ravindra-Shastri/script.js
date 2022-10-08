let form = document.querySelector('form');
let allLists = document.querySelector('ul');
let h1 =  document.querySelector('h1');
    h1.innerText = "Movie Watch List"
    

function handleSubmit(event){
    event.preventDefault()
    let movie = (event.target.elements.movie.value);
    let list = document.createElement("li");
    list.classList.add("list");

    let checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
  
    let movieName = document.createElement("h3");
    movieName.classList.add("movieName");
    movieName.innerText = movie;
  
    let cross = document.createElement("p");
    cross.classList.add("cross");
    cross.innerHTML = "❌";
   let hr = document.createElement('hr');
    cross.addEventListener("click", () => {
      list.innerText = "";
  });

    allLists.append(list,hr);
    list.append(checkbox, movieName, cross);
  
    movie = ""; 

}

form.addEventListener('submit',handleSubmit);




