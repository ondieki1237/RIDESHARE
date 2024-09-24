const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Database connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'ridesharedb'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        throw err;
    }
    console.log('Connected to the database');
});

// Session middleware setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password_hash = ?';

    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Login query error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        
        if (results.length > 0) {
            req.session.user = results[0];
            res.redirect('/dashboard.html');
        } else {
            res.send('Invalid email or password.');
        }
    });
});

// Signup endpoint
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)';

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.error('Signup query error:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.redirect('/login.html'); // Redirect to the login page after successful registration
    });
});

// Middleware to protect routes
function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    next();
}

// Dashboard route (protected)
app.get('/dashboard.html', requireLogin, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/dashboard.html'));
});

// Logout endpoint
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Session destroy error:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login.html');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
