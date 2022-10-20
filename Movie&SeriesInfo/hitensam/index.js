var res,child,remove;
MovieSearch = async (TitleSearch) =>
{
    const getData = await axios.get('https://www.omdbapi.com/', {
        params : 
        {
            apiKey : '1d56cf35',
            s : TitleSearch
        }
    })


    if(getData.data.Response === "False")
    {
        res = 'Movie not Found!'
        return 'False'
    }

    // console.log(getData.data.Search)
    else{res = getData.data.Search
    return getData.data.Search}

}
let timeOutId;
const inputSearch = document.querySelector('#inputSearch')
inputSearch.addEventListener('input', (event) =>{
    if (timeOutId){clearInterval(timeOutId)}
    timeOutId = setTimeout(async () =>{
    var results = await MovieSearch(event.target.value)
    .catch((error)=>(console.log("error is : ", error)))
    if (results === 'False'){
        if(document.querySelector('#appendChild').children)
        {
            const list = document.getElementById("appendChild");
            while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
            }
        } 
        // console.log('if ran')
        const createElement = document.createElement('div')
        createElement.innerHTML = `
        <br>
        <p>No results for the search Term<p>
        `
        document.querySelector('#appendChild').appendChild(createElement)
    }
    else
    {
        // console.log("else block ran")
        if(document.querySelector('#appendChild').children)
        {
            // remove = document.querySelector('#appendChild')
            // child = document.querySelector('#appendChild').children
            // for(let k = 0; k<=child.length; k++)
            // {
            //     const ele = document.getElementsByTagName('div')
            //     document.querySelector('#appendChild').removeChild(ele)
            // }
            const list = document.getElementById("appendChild");

            while (list.hasChildNodes()) {
            list.removeChild(list.firstChild);
            }
        } 
        // const br = document.createElement('br')
        // document.querySelector('#appendChild').appendChild(br)
        const createElement = document.createElement('div')
        createElement.innerHTML = `
        <div class = "dropdown is-active" id='to-be-removed'>
        <div class = "dropdown-menu">
        <div class = "dropdown-content results">
        </div>
        </div>
        </div>
        `
        document.querySelector('#appendChild').appendChild(createElement)
        // var value = -1;
        for (let result of results)
        {
            // value++;
            if(result.Poster === "N/A")
            {result.Poster=""}
        const  createAnchor = document.createElement('a')
        createAnchor.classList.add('dropdown-item');
        createAnchor.innerHTML = `
        <img src = "${result.Poster}"></img>
        ${result.Title}
        `
        createAnchor.addEventListener('click', (event) =>
        {
            // console.log(event.path[0])
            const remove = document.querySelector("#to-be-removed")
            remove.classList.remove('is-active')
            inputSearch.value = event.target.innerText.trim()
            // console.log(result)
            getAdditional(result)
        })
        document.querySelector('.dropdown-content').appendChild(createAnchor)
        }

        // child = document.querySelector('#appendChild').children
        // console.log(`The Child of div are ${document.querySelector('#appendChild').children}`)   
    }
    }, 1000)
    
})

document.addEventListener('click', (event) =>
{
    // console.log(event.target.classList.value)
    if(event.target.innerHTML !== `<input id="inputSearch" type="text">` && event.target.classList.value !== `dropdown-item`) 
    {
        const removeElements = document.getElementById("appendChild");
        while (removeElements.hasChildNodes()) {
        removeElements.removeChild(removeElements.firstChild);
        }   
    }
})


const getAdditional = async function (extractInfo)
{
    // console.log(extractInfo)
    var ImdbIDSearch = await axios.get('https://www.omdbapi.com', {
        params :
        {
            apiKey : '1d56cf35',
            i : extractInfo.imdbID
        }
    })
    const searchResult = document.createElement('div')
            searchResult.innerHTML = ( (renderTemplate(ImdbIDSearch)))
            document.querySelector('#appendChild').appendChild(searchResult) 

   
    
  }
  
  
function renderTemplate(ImdbIDSearch)
{
    return `
      <article class="media">
        <figure class="media-left">
          <p class="image">
            <img src="${ImdbIDSearch.data.Poster}" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h1>${ImdbIDSearch.data.Title}</h1>
            <h4>${ImdbIDSearch.data.Genre}</h4>
            <p>${ImdbIDSearch.data.Plot}</p>
          </div>
        </div>
      </article>
    `;
}
