// Middleware to ensure the user is an admin
const isAdmin = (req, res, next) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.status(403).json({ success: false, error: 'Forbidden: admin only' });
    }
    next();
};

module.exports = isAdmin;