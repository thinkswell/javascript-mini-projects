const express = require('express');
const db = require('../config/db');
const { verifyPassword } = require('../services/password');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
        return res.status(400).json({ success: false, error: 'Username and password are required.' });
    }

    try {
        // Query the database for the user
        const results = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });

        const user = results[0];

        // Check the password first, so the account status is only revealed to someone who knows it
        if (!user || !verifyPassword(password, user.password)) {
            return res.status(401).json({ success: false, error: 'Invalid username or password.' });
        }

        // Check if user is active
        if (!user.active) {
            return res.status(403).json({ success: false, error: 'Your account is deactivated. Please contact the administrator.' });
        }

        // Check if user is verified
        if (!user.verified) {
            return res.status(403).json({ success: false, error: 'Please verify your email before logging in.' });
        }

        const sessionUser = {
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            middlename: user.middlename,
            lastname: user.lastname,
            email: user.email,
            mobile_no: user.mobile_no,
            isAdmin: user.isAdmin,
        };

        // New session id on login, so a session id planted before login can't be reused
        req.session.regenerate((err) => {
            if (err) {
                console.error('Session error:', err);
                return res.status(500).json({ success: false, error: 'Session error.' });
            }
            req.session.user = sessionUser;
            res.json({ success: true, user: sessionUser });
        });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ success: false, error: 'Database error.' });
    }
});

module.exports = router;
