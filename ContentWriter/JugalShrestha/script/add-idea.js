const addIdea = document.querySelector('.input-section')

const title = document.querySelector('.title input')
const genre = document.querySelector('.genre input')
const characters = document.querySelector('.characters input')
const summary = document.querySelector('.summary input')
const script = document.querySelector('.script textarea')

var ID = ideas.length || 0

addIdea.addEventListener('submit',(e)=>{
    e.preventDefault()
    const idea = {
        title: title.value,
        genre: genre.value,
        characters: characters.value,
        summary: summary.value,
        script: script.value,
        id: ID++,
    }
    ideas.push(idea)
    const div = document.createElement('div')
    div.classList.add('idea')
    const header = document.createElement('div')
    header.classList.add('title')
    header.textContent = idea.title
    const id = document.createElement('div')
    id.classList.add('id')
    id.textContent = idea.id
    div.appendChild(id)
    div.appendChild(header)
    ideaField.appendChild(div)
    
    localStorage.setItem('ideas',JSON.stringify(ideas))

    addIdea.reset()
    CloseAllPage()
    
})


ideas.forEach((idea,index)=>{
    idea.id = index
    localStorage.setItem('ideas',JSON.stringify(ideas))
    const div = document.createElement('div')
    div.classList.add('idea')
    const header = document.createElement('div')
    header.classList.add('title')
    const id = document.createElement('div')
    id.classList.add('id')
    id.textContent = idea.id
    div.appendChild(id)
    header.textContent = idea.title
    div.setAttribute('onclick','OpenIdeaPage("'+idea.id+'")')
    div.appendChild(header)
    ideaField.appendChild(div)
})
