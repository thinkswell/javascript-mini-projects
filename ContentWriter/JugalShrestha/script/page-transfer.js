const AddIdeaPage = document.querySelector('.add-idea-page')
const AddIdeaBtn = document.querySelector('.add-idea')
const EditIdeaPage = document.querySelector('.edit-page')
const EditIdeaBtn = document.querySelector('.edit-page-btn')
const DeleteIdeaBtn = document.querySelector('.delete-page-btn')

const IdeaPage = document.querySelector('.idea-page')

const ideaField = document.querySelector('.ideas')

const ideas = JSON.parse(localStorage.getItem('ideas')) || []

const CloseBtn = document.querySelectorAll('.close-page')

AddIdeaBtn.addEventListener('click',()=>{
    AddIdeaPage.style.display = 'flex'
})

EditIdeaBtn.addEventListener('click',()=>{
    EditIdeaPage.style.display = "flex"
    let ToBeEditedId = IdeaTitle.innerHTML.split('.')
    let ToBeEdited = ToBeEditedId[0]
    EditIdea(ToBeEdited)
})

CloseBtn.forEach(CloseBtn=>{
    CloseBtn.addEventListener('click',CloseAllPage)
})

function CloseAllPage()
{
    AddIdeaPage.style.display = 'none'
    IdeaPage.style.display = "none"
    EditIdeaPage.style.display = "none"
}
