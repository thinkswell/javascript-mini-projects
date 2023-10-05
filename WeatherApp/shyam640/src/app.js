// Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
// checkout more app methods at https://expressjs.com/en/5x/api.html#app


const express = require('express');
const chalk = require('chalk');
const path = require('path');
const hbs = require('hbs');
const app = express();
const port = 3000

// Get current file and file's directory path
// console.log(__dirname);
// console.log(__filename);

// Defining path for express use
const pathToPublicDir = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// setting up static directory to serve
app.use(express.static(pathToPublicDir));

// setting up handler bar engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
   res.render('index', {
       title: 'Weather',
       name: 'its_shyam640'
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
       title: 'About Me',
       name: 'its_shyam640',
       age : 18
   });
});

app.get('/help', (req, res) => {
   res.render('help', {
       helpText: 'This is some helpful text.',
       title: 'Help',
       name: 'its_shyam640',
       body: 'What are you looking for?'
   });
});

// for checking
// app.get('/weather', (req, res) => {
   
// });
 
// app.get('/products', (req, res) => {
//    if (!req.query.search) {
//        return res.send({
//            error: 'You must provide a search term'
//        })
//    }

//    console.log(req.query.search)
//    res.send({
//        products: []
//    })
// })

app.get('/help/*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'its_shyam640',
       errorMessage: 'Page you are searching for is not available !'
   })
})

app.get('*', (req, res) => {
   res.render('404', {
       title: '404',
       name: 'its_shyam640',
       errorMessage: 'Page not found!'
   })
})



// starting server
app.listen(port, () => {
   console.log(chalk.green('Server is running on port'+port));
});