const express = require('express');
const createError = require('http-errors');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json')

const routes = require('./routes/index');

// instance of express
const app = express();

app.set('trust proxy', 1);

app.use(cookieSession({
    name: 'session',
    keys: ['Dkjvnsblu', 'HBbdhbbj'],
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

// set view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX Meetups';

// Middlewares
// - static file paths
app.use(express.static(path.join(__dirname, './static')));

// global template variable
app.use(async (request, response, next) => {
    try {
        const names = await speakersService.getNames();
        response.locals.speakerNames = names;

        return next();
    } catch (error) {
        return next(error);
    }
});
app.use('/', routes({
    feedbackService,
    speakersService
}));

// if no route match return error message
app.use((request, response, next) => next(createError(404, 'Page not found!')));

// catches the error and renser error template
app.use((err, request, response, next) => {
    response.locals.message = err.message;
    console.error('here\n\n\n\n', err);
    const status = err.status || 500;
    response.locals.status = status;
    // response status code
    response.status(status);
    // render error template error.ejs
    response.render('error');

});



const PORT = 3000;

// // speakers page
// app.get('/speakers', (request, response) => {
//     response.sendFile(path.join(__dirname, './static/speakers.html'));
// });

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
