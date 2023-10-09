var bodyParser = require('body-parser');

var mongoose = require("mongoose");

var Todo = require("./model");

const url = "mongodb://127.0.0.1:27017/todo";
//connection to mongodb
mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

var urlencodedParser = bodyParser.urlencoded({extended: false})



module.exports = function(app){

    //adding new task to mongodb
    app.post("/add/task", urlencodedParser, (req, res) => {
      var newTodo = Todo(req.body).save()
      .then(
        () => {
          
          res.redirect("/home");
        }
      ).catch((err) => console.log('error'))
    })
  
    //deleting the requested task from mongodb
    app.get('/delete/:task', urlencodedParser,function(req, res){
      Todo.find({task: req.params.task.replace(/\-/g, "")}).deleteMany().then(() => {res.redirect("/home")}).catch((err) => console.log('error'))
    })
  
}