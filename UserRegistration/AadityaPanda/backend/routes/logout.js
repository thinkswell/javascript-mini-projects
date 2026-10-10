const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out.');
        }
        res.json({ success: true });
    });
});

module.exports = router;