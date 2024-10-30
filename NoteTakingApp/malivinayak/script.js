let notes = [];

function showNotes() {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '<h3>Notes</h3>';

    for (let i = 0; i < notes.length; i++) {
        const noteItem = document.createElement('div');
        noteItem.classList.add('note-item');
        noteItem.innerHTML = `
            <p><a href="#" onclick="showNoteDetails(${i})">${notes[i].title}</a></p>
            <button onclick="deleteNote(${i})">Delete</button>
        `;
        noteList.appendChild(noteItem);
    }
}

function showNoteDetails(index) {
    const noteDetails = document.getElementById('noteDetails');
    const selectedNote = notes[index];

    if (selectedNote) {
        noteDetails.innerHTML = `
            <h3>${selectedNote.title}</h3>
            <p>${selectedNote.content}</p>
        `;
    }
}

function showAddNoteForm() {
    const addNoteForm = document.getElementById('addNoteForm');
    addNoteForm.style.display = 'block';
}

function addNote() {
    const noteTitle = document.getElementById('noteTitle').value;
    const noteContent = document.getElementById('noteContent').value;

    if (noteTitle && noteContent) {
        notes.push({ title: noteTitle, content: noteContent });
        showNotes();
        resetAddNoteForm();
    }
}

function resetAddNoteForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('addNoteForm').style.display = 'none';
}

function deleteNote(index) {
    notes.splice(index, 1);
    showNotes();
}

showNotes();
