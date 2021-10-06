const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
   return "Your Notes...";
}

const addNote = (title,body) => {
   const notes = loadNotes();
   // const check_for_duplicates = notes.filter((note) => (note.title === title));
   const check_duplicate_Note = notes.find((note) => (note.title === title));
   if(!check_duplicate_Note){
      notes.push({
         title: title,
         body: body
      });
      saveNotes(notes);
      console.log(chalk.green('Success : Note Added!'));
   }else{
      console.log(chalk.red('Error : Note Already Present!'));
   }
}


const saveNotes = (notes) => {
   const notesJSON = JSON.stringify(notes);
   fs.writeFileSync('notes.json',notesJSON);
}

const loadNotes = () => {
   try{
      const dataBuffer = fs.readFileSync('notes.json');
      const dataJSON = dataBuffer.toString();
      return JSON.parse(dataJSON);
   }catch(e){
      return [];
   }
}


const listNote = () => {
   const notes = loadNotes();
   console.log(chalk.inverse('Your Notes Below :'));
   notes.forEach((note) => console.log(note.title));
}


const removeNote = (title) => {
   try{
      const notes = loadNotes();
      const notes_to_keep = notes.filter((note) => (note.title !== title));
      saveNotes(notes_to_keep);
      console.log(chalk.green('Success : Note deleted!'));
   }catch(e){
      console.log(chalk.red('Error : Note Cannot be deleted!'));
   }
}

const readNote = (title) => {
   const notes = loadNotes();
   const note = notes.find((note) => (note.title === title));
   if(note){
      console.log(chalk.blue.inverse(note.title));
      console.log(chalk.white(note.body));
   }else{
      console.log(chalk.red('Error : Note not found!'));
   }
}

module.exports = {
   getNotes : getNotes,
   addNote : addNote,
   removeNote : removeNote,
   listNote : listNote,
   readNote : readNote
}