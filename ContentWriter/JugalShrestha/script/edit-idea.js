//Edit page things
const EditTitle = document.querySelector('.edit-page .title input')
const EditGenre = document.querySelector('.edit-page .genre input')
const EditCharacters = document.querySelector('.edit-page .characters input')
const EditSummary = document.querySelector('.edit-page .summary input')
const EditScript = document.querySelector('.edit-page .script textarea')

const EditPage = document.querySelector('.edit-input-section')

var ToBeEditedRealId = 0

function EditIdea(id){
    ToBeEditedRealId = id
    EditTitle.value = ideas[ToBeEditedRealId].title
    EditGenre.value = ideas[ToBeEditedRealId].genre
    EditCharacters.value = ideas[ToBeEditedRealId].characters
    EditSummary.value = ideas[ToBeEditedRealId].summary
    EditScript.textContent = ideas[ToBeEditedRealId].script
}

EditPage.addEventListener('submit',(e)=>{

    e.preventDefault()

    const EditedIdea = {
        title: EditTitle.value,
        genre: EditGenre.value,
        characters: EditCharacters.value,
        summary: EditSummary.value,
        script: EditScript.value,
        id: ToBeEditedRealId,
    }
    ideas[ToBeEditedRealId] = EditedIdea

    localStorage.setItem('ideas',JSON.stringify(ideas))

    EditPage.reset()
    CloseAllPage()
})