// Middleware to ensure the user is logged in
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'You must be logged in to access this page!' });
    }
    next();
};

module.exports = requireLogin;