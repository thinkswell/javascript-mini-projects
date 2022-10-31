const express = require('express');

const router = express.Router();

module.exports = (params) => {
    const { speakersService } = params;

    // speaker list
    router.get('/', async (request, response, next) => {
        try {
            const speakers = await speakersService.getList();
            const artworks = await speakersService.getAllArtwork();

            const context = {
                pageTitle: 'Speakers',
                template: 'speakers',
                speakers,
                artworks
            }

            return response.render(
                'layouts',
                context
            );
        } catch (error) {
            return next(error);
        }

    });

    // speaker by name
    router.get('/:shortname', async (request, response, next) => {
        try {
            const speaker = await speakersService.getSpeaker(request.params.shortname);
            const artworks = await speakersService.getArtworkForSpeaker(request.params.shortname);

            const context = {
                pageTitle: 'Speakers',
                template: 'speakers-detail',
                speaker,
                artworks
            };

            return response.render(
                'layouts',
                context
            );
        } catch (error) {
            return next(error);
        }

    });

    return router;
}
