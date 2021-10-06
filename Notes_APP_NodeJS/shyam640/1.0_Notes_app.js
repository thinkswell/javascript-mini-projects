const yargs = require('yargs');
const notes = require('./1.1_Notes_app.js');

yargs.command({
   command : 'add',
   describe : 'Add a new Note',
   builder : {
      title : {
         describe : 'Note Title',
         demandOption : true,
         type : 'string'
      },
      body : {
         describe : 'Note Body',
         demandOption : true,
         type : 'string'
      }
   },
   // handler : function(argv){
   //    notes.addNote(argv.title,argv.body);
   // }
   handler(argv){
      notes.addNote(argv.title,argv.body);
   }
});

yargs.command({
   command : 'remove',
   describe : 'Delete a Note',
   builder : {
      title : {
         describe : 'Note title to be deleted!',
         demandOption : true,
         type : 'string'
      }
   },
   // handler : function(argv){
   //    notes.removeNote(argv.title);
   // }
   handler(argv){
      notes.removeNote(argv.title);
   }
});


yargs.command({
   command : 'list',
   describe : 'List of Notes',
   // handler : function(){
   //    notes.listNote();
   // }
   handler(){
      notes.listNote();
   }
});


yargs.command({
   command : 'read',
   describe : 'Read Notes',
   builder : {
      title : {
         describe : 'Note title',
         demandOption : true,
         type : 'string'
      }
   },
   // handler : function(argv){
   //    notes.readNote(argv.title);
   // }
   handler(argv){
      notes.readNote(argv.title);
   }
});


yargs.parse();