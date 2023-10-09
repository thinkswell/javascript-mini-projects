const notesContainer=document.getElementById("app");
const addNoteButton=notesContainer.querySelector(".add-note");

getNotes().forEach((note)=>{
    const noteElement=createNotes(note.id,note.content);
    notesContainer.insertBefore(noteElement,addNoteButton);
})

addNoteButton.addEventListener("click",()=>addNote());

function getNotes()//This function is to get notes when needed or when web page is refreshed
{
    return JSON.parse(localStorage.getItem("stickynotes-notes")||"[]");
}
function saveNotes(notes)//This function is to save all the notes written and should appear on screen when web page is refreshed
{
    localStorage.setItem("stickynotes-notes",JSON.stringify(notes));
}
function createNotes(id,content){
    const element=document.createElement("textarea");
    element.classList.add("note");
    element.value=content;
    element.placeholder="Empty Sticky Note";
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString();

    // Add the creation time to the note's content
    element.value = `${formattedTime}\n${content}`;
   
    

    
    element.addEventListener("change",()=>{
        updateNote(id,element.value);
    });
    element.addEventListener("dblclick",()=>{
        const doDelete=confirm("Are you sure you want to delete the Sticky note??");

        if(doDelete){
            deleteNote(id,element);
        }
    });


    return element;
}
function addNote()
{
    const existingNotes=getNotes();
    const noteObject={
        id:Math.floor(Math.random()*10000),
        content:""
    };

    const noteElement=createNotes(noteObject.id,noteObject.content);
    notesContainer.insertBefore(noteElement,addNoteButton);
    existingNotes.push(noteObject);
    saveNotes(existingNotes);
}
function updateNote(id,newContent){
    const notes=getNotes();
    const targetNote=notes.filter((note)=>note.id==id)[0];
    targetNote.content=newContent;
    saveNotes(notes);
}
function deleteNote(id,element){
    const notes=getNotes().filter((note)=>note.id!=id);

    saveNotes(notes);
    notesContainer.removeChild(element);
}