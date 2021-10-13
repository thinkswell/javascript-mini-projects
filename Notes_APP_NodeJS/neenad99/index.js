const mongoose = require('mongoose');
const yargs = require('yargs');
const dotenv = require('dotenv').config();
const notes = require('./controller');




mongoose.connect(process.env.CLOUD_MONGO_URL,()=>{
    console.log("mongodb connected");
});


yargs.command({
    command: "add",
    description: "Add notes",
    builder:{
        title : {
            describe : "Title of note",
            type:"String",
            demandOption:true
        },
        body : {
            describe : "Body of note",
            type:"String",
            demandOption:true
        }
    },
    handler: function(argv){
        notes.addNote(argv.title,argv.body);
    }
    })
yargs.command({
    command: "remove",
    description: "Removes a note",
    builder:{
        title : {
            describe : "Title of note",
            type:"String",
            demandOption:true
        }
    },
    handler: function(argv){
        notes.removeNote(argv.title);
    }
})
yargs.command({
    command: "update",
    description: "Update a body of a note",
    builder:{
        title : {
            describe : "Title of note",
            type:"String",
            demandOption:true
        },
        body : {
            describe : "Body of note",
            type:"String",
            demandOption:true
        }
    },
    handler: function(argv){
        notes.updateNote(argv.title,argv.body);
    }
})
yargs.command({
    command: "read",
    description: "Read specific note for a given title",
    builder:{
        title : {
            describe : "Title of note",
            type:"String",
            demandOption:true
        }
    },
    handler: function(argv){
        notes.getNote(argv.title);
    }
})
yargs.command({
    command: "list",
    description: "Read All Notes",
    handler: function(){
        notes.getNotes();
    }
}).parse();

