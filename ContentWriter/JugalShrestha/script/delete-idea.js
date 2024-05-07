
DeleteIdeaBtn.addEventListener('click',()=>{
    
    let ToBeDeletedId = IdeaTitle.innerHTML.split('.')
    let ToBeDeleted = ToBeDeletedId[0]
    if(confirm('Are you sure to delete '+ToBeDeletedId[1]+'?'))
    {
        ideas.splice(ToBeDeleted,1)
        localStorage.setItem('ideas',JSON.stringify(ideas))
    }
    else{
        return 
    }
})