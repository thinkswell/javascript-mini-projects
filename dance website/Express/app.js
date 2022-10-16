const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;

//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))      // For serving static files
app.use(express.urlencoded())


//PUG SPECIFIC STUFF
app.set('view engine','pug')                    //set the template engine as pug
app.set('views',path.join(__dirname,'views'))   //Set the views directory

// //pug demo endpoint
// app.get('/', (req, res) => {
//     res.render('demo', { title: 'Hey', message: 'Hello there!' })
//   })

// app.get("/", (req,res)=>{
//     res.status(200).send("this is home page of my first express app")
// });

// app.get("/about", (req,res)=>{
//     res.send("this is about page my first express app ")
// });

// app.post("/about", (req,res)=>{
//     res.send("this is a post  about page of my first express app ")
// })


//ENDPOINTS
app.get('/',(req,res)=>{
    const con = "best content"
    const params = {'title':'pung is best game','content':con}
    res.status(200).render('index.pug',params);
})

app.post('/',(req,res)=>{
    name = req.body.name
    age = req.body.age
    gender = req.body.gender
    address = req.body.address
    more = req.body.more
    let outputToWrite = `name of client id ${name}, ${age} years old,${gender},lives ${address}.
    more about him/her ${more}`
    fs.writeFileSync('output.txt',outputToWrite)
    const params = {'title':'SUBMITTED'}
    res.status(200).render('index.pug',params);
})

//START THE SERVER
app.listen(port ,()=>{
    console.log(`the application started successfully on port ${port}`)
})