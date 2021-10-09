const Notes = require('./model');
const chalk = require('chalk');

const addNote = (title,body) =>{
    Notes.findOne({title:title})
    .then((note)=>{
        if(note != null){
            console.log(chalk.red("note already present"));
        }
        else{
            const note = {title : title,body : body};
            Notes.create(note)
            .then((note)=>{
                console.log(chalk.green("note added successfully"));
                console.log(chalk.blue.inverse(note.title));
                console.log(chalk.white(note.body));
            }).catch((err)=>{
                console.log(chalk.red('failed to post note',err.message));
            })
        }
    })
    .catch((err)=>{
        console.log(chalk.red('failed to post note',err.message));
    })
};

const getNotes = () => {
    Notes.find()
    .then((notes)=>{
        console.log(chalk.green('fetched notes successfully'));
        console.log(chalk.blue(notes));
    })
    .catch((err)=>{
        console.log(chalk.red('failed to fetch notes',err.message));
    });
};

const updateNote = (title,body) => {
    const update = {body : body};
    Notes.findOneAndUpdate({title:title},update,{new:true})
    .then((note)=>{
        if(note != null){
            console.log(chalk.green('updated note successfully'));
            console.log(chalk.blue.inverse(note.title));
            console.log(chalk.white(note.body));
        }
        else{
            console.log(chalk.red('note not found'));
        }
    })
    .catch((err)=>{
        console.log(chalk.red('failed to update note',err.message));
    })
};

const removeNote = (title) => {
    Notes.findOneAndRemove({title:title})
    .then((note)=>{
        if(note == null){
            console.log(chalk.red('note not found'));
            return ;
        }
        console.log(chalk.green('removed note successfully'));
        console.log(chalk.blue.inverse(note.title));
        console.log(chalk.white(note.body));
    })
    .catch((err)=>{
        console.log(chalk.red('failed to update note',err.message));
    })
};

const getNote = (title) => {
    Notes.findOne({title : title})
    .then((note)=>{
        if(note == null){
            console.log(chalk.red('note not found'));
            return ;
        }
        console.log(chalk.green('found note successfully'));
        console.log(chalk.blue.inverse(note.title));
        console.log(chalk.white(note.body));
    })
    .catch((err)=>{
        console.log(chalk.red('failed to find specific note',err.message));
    })
}

module.exports = {
    getNotes : getNotes,
    getNote : getNote,
    addNote : addNote,
    removeNote : removeNote,
    updateNote : updateNote
}