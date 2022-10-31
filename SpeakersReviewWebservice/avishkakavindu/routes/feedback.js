const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const validations = [
    check('name')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('A name is required'),
    check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .escape()
        .withMessage('A valid email is required'),
    check('title')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('A title is required'),
    check('message')
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage('A message is required')
];

module.exports = (params) => {
    const { feedbackService } = params;

    // feedback list
    router.get('/', async (request, response, next) => {
        try {
            const feedbacks = await feedbackService.getList();
            // ? means if the request.session.feedback exists then: else
            const validationErrors = request.session.feedback ? request.session.feedback.errors : false;
            const successMessage = request.session.feedback ? request.session.feedback.message : false;
            request.session.feedback = {};

            const context = {
                pageTitle: 'Feedbacks',
                template: 'feedback',
                feedbacks,
                validationErrors,
                successMessage
            }
            return response.render('layouts', context);
        } catch (error) {
            return next(error);
        }

    });

    // one feedback 
    router.post('/', validations,
        async (request, response, next) => {
            try {
                const validationErrors = validationResult(request);

                if (!validationErrors.isEmpty()) {
                    request.session.feedback = {
                        errors: validationErrors.array()
                    };

                    return response.redirect('/feedback');
                }

                const { name, email, title, message } = request.body;

                await feedbackService.addEntry(name, email, title, message);
                request.session.feedback = {
                    message: 'Thankyou for your feedback!'
                }
                return response.redirect('/feedback')
            } catch (error) {
                return next(error);
            }

        });

    router.post('/api', validations, async (request, response, next) => {
        try {
            const validationErrors = validationResult(request);

            if (!validationErrors.isEmpty()) {
                const context = {
                    errors: validationErrors.array()
                }
                return response.json(context)
            }

            const { name, email, title, message } = request.body;

            await feedbackService.addEntry(name, email, title, message);

            const feedback = await feedbackService.getList();

            return response.json({ feedback, successMessage: 'Thankyou for your feedback!' });

        } catch (error) {
            return next(error);
        }
    });

    return router;
}
