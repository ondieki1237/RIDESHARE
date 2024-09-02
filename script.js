document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Collect form data
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Basic validation (example)
    if (!name || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Send data to backend (example)
    console.log('User signed up with:', { name, email, password });

    alert('Sign-up successful!');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Collect form data
    const email = event.target.email.value;
    const password = event.target.password.value;

    // Basic validation (example)
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Send data to backend (example)
    console.log('User logged in with:', { email, password });

    alert('Login successful!');
});


