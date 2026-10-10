const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');

router.use(requireLogin);

router.get('/', (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    req.session.message = { type: 'success', text: 'Welcome to your dashboard!' };
    res.json({ user: req.session.user, message: req.session.message });
    delete req.session.message;
});

module.exports = router;