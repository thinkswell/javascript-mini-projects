const crypto = require('crypto');

// Salted scrypt (Node built-in, no extra dependency). Stored as "scrypt$<salt>$<hash>".
// shortcut: scryptSync blocks the event loop ~50ms per call, switch to async crypto.scrypt if traffic grows.
const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    return `scrypt$${salt}$${crypto.scryptSync(password, salt, 64).toString('hex')}`;
};

const verifyPassword = (password, stored) => {
    const [scheme, salt, hash] = String(stored).split('$');
    const expected = Buffer.from(hash || '', 'hex');
    if (scheme !== 'scrypt' || !salt || expected.length !== 64) return false;
    return crypto.timingSafeEqual(crypto.scryptSync(password, salt, 64), expected);
};

module.exports = { hashPassword, verifyPassword };
