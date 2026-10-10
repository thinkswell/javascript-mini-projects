require('dotenv').config();
const mysql = require('mysql2');

// A pool reconnects on its own; a single connection dies after MySQL's idle timeout and never comes back.
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    stringifyObjects: true, // a JSON object sent as a field value must never become SQL `key = value` pairs
});

db.query('SELECT 1', (err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});

module.exports = db;
