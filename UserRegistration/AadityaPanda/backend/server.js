require('dotenv').config({ path: require('path').join(__dirname, '.env') }); // works from any folder

// Fail fast with a clear message; without these the DB login fails with a confusing auth error
const missing = ['DB_HOST', 'DB_USER', 'DB_NAME', 'SESSION_SECRET'].filter((key) => !process.env[key]);
if (missing.length) {
    console.error(`Missing ${missing.join(', ')} in backend/.env (copy .env.example to .env and fill it in).`);
    process.exit(1);
}

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const homeRoutes = require('./routes/home');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const dashboardRoutes = require('./routes/dashboard');
const adminRoutes = require('./routes/admin');
const logoutRoutes = require('./routes/logout');

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware setup
app.use(helmet()); // standard security headers, hides X-Powered-By
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(session({
    key: 'connect.sid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // no session until someone logs in
    cookie: { 
        httpOnly: true,
        secure: false, 
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: 'lax', 
    }
}));

// Per-IP limit on login and signup to stop password guessing and signup spam
const authLimiter = () => rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: 'Too many attempts. Please try again in 15 minutes.', message: 'Too many attempts. Please try again in 15 minutes.' },
});

// Routes
app.use('/', homeRoutes); 
app.use('/login', authLimiter(), loginRoutes); 
app.use('/signup', authLimiter(), signupRoutes); 
app.use('/dashboard', dashboardRoutes); 
app.use('/admin', adminRoutes);
app.use('/logout', logoutRoutes); 

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});