const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Mock user credentials for login
const users = {
    username: 'password123'  // Example credentials
};

// Handle POST request from login form
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if credentials match
    if (users[username] && users[username] === password) {
        res.redirect('/dashboard');  // Successful login
    } else {
        res.status(403).send('Invalid credentials');  // Login failed
    }
});

// Serve the dashboard (after login page)
app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/after_signup.html');  // Serve the after-login page
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
