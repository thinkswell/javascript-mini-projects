const express = require('express');
const crypto = require('crypto');
const db = require('../config/db');
const { sendVerificationEmail } = require('../services/emailService');
const { hashPassword } = require('../services/password');
require('dotenv').config();

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

router.post('/', (req, res) => {
    const { firstname, middlename, lastname, username, password, verify_password, mobile_no, email } = req.body;

    // Validate input
    const required = [firstname, lastname, username, password, mobile_no, email];
    if (required.some((value) => typeof value !== 'string' || !value.trim())) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Check if passwords match
    if (password !== verify_password) {
        return res.status(400).json({ message: "Passwords don't match." });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters.' });
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile_no)) {
        return res.status(400).json({ message: 'Mobile number must be 10 digits.' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    // Hash the password before storing it
    const hashedPassword = hashPassword(password);

    // Check if the username or email already exists
    db.query('SELECT id FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ message: 'Database error.' });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists.' });
        }

        // Generate a verification token, saved together with the user so no half-created account is left behind
        const token = crypto.randomBytes(20).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

        db.query(
            'INSERT INTO users (firstname, middlename, lastname, username, password, mobile_no, email, active, token, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [firstname, middlename || null, lastname, username, hashedPassword, mobile_no, email, true, token, expiresAt],
            (err) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({ message: 'Error occurred during registration.' });
                }

                // Send verification email
                sendVerificationEmail(email, token, firstname);

                return res.status(201).json({
                    message: 'Registration successful! Please check your email for verification.',
                });
            }
        );
    });
});

// Verification route (user clicks the link in the email), then back to the login page with the result
router.get('/verify-email', (req, res) => {
    const { token } = req.query;
    const done = (result) => res.redirect(`${FRONTEND_URL}/login?verified=${result}`);

    if (typeof token !== 'string' || !token) {
        return done('invalid');
    }

    db.query('SELECT id, expires_at FROM users WHERE token = ?', [token], (err, results) => {
        if (err || results.length === 0) {
            console.error('Token lookup error:', err || 'No results');
            return done('invalid');
        }

        if (new Date() > results[0].expires_at) {
            return done('expired');
        }

        db.query('UPDATE users SET verified = 1, token = NULL, expires_at = NULL WHERE id = ?', [results[0].id], (err) => {
            if (err) {
                console.error('Error updating user verification:', err);
                return done('invalid');
            }
            done('success');
        });
    });
});

module.exports = router;
