var express = require("express");
var todocontroller = require("./todocontroller");
var Todo = require("./model");


var app = express();

app.set("view engine", 'ejs');


//listening to port 3000
app.listen(3000, () => console.log("Listening to port 3000...."));


todocontroller(app);


//taking data from mongodb and passing it to home view
app.get('/home', function(req, res){
    Todo.find().then((data) => res.render('home', {todos: data}))
})
