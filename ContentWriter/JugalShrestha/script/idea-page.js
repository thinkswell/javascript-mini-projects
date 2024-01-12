const IdeaTitle = document.querySelector('.idea-title')
const IdeaGenre = document.querySelector('.idea-genre')
const IdeaCharacters = document.querySelector('.idea-characters')
const IdeaSummary = document.querySelector('.idea-summary')
const IdeaScript = document.querySelector('.idea-script')

function OpenIdeaPage(id){
    ideas.forEach(idea=>{
        if(idea.id == id)
        {
            IdeaPage.style.display = "flex"
            IdeaTitle.innerHTML = idea.id+'.'+idea.title
            IdeaGenre.innerHTML = idea.genre
            IdeaCharacters.innerHTML = idea.characters
            IdeaSummary.innerHTML = idea.summary
            IdeaScript.innerHTML = idea.script           
        }
    })
}
