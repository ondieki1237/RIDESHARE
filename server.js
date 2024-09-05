app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password_hash = ?';

    db.query(sql, [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            req.session.user = results[0];
            res.redirect('/dashboard.html');
        } else {
            res.send('Invalid email or password.');
        }
    });
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const sql = 'INSERT INTO users (full_name, email, password_hash) VALUES (?, ?, ?)';

    db.query(sql, [name, email, password], (err, result) => {
        if (err) throw err;
        res.redirect('/login.html'); // Redirect to the login page after successful registration
    });
});
const session = require('express-session');

// Session middleware setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to protect routes
function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    next();
}

// Protect the dashboard route
app.get('/dashboard.html', requireLogin, (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

// Logout functionality
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/dashboard.html');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login.html');
    });
});

