const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

addBtn.addEventListener("click",
    function() {
        addNote()
    }
);

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);
        }
       
    );

    if(data.length === 0){
        localStorage.removeItem("notes");
    }else{
        localStorage.setItem("notes", JSON.stringify(data));
    }  
}

const addNote = (text="") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
                <i class="save fa-solid fa-floppy-disk"></i>
                <i class="trash fa-solid fa-trash"></i>
            </div>    
            <textarea>${text}</textarea>
    `;

    note.querySelector(".trash").addEventListener("click",
        function() {
            note.remove()
            saveNotes()
        }
    );
    note.querySelector(".save").addEventListener("click",
        function() {
            saveNotes() 
        }
    );
    note.querySelector("textarea").addEventListener(
        "focusout", () => {
            saveNotes();
        }
    );
    


    main.appendChild(note);
    saveNotes();
}

(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if(lsNotes === null){
            addNote();
        }else{
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }
    }
)();



