const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
    const { speakersService } = params;

    router.get('/', async (request, response, next) => {
        try {
            const topSpeakers = await speakersService.getList();
            const artworks = await speakersService.getAllArtwork();

            const context = {
                pageTitle: 'Welcome',
                template: 'index',
                topSpeakers,
                artworks
            }

            return response.render('layouts', context);
        } catch (error) {
            return next(error);
        }
    });

    router.use('/speakers', speakersRoute(params));
    router.use('/feedback', feedbackRoute(params));

    return router;
}
