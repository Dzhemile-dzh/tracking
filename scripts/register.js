// register.js

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');

    // Handle form submission
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Get form values
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Validate passwords
        if (password !== confirmPassword) {
            displayMessage('Passwords do not match.', 'error');
            return;
        }

        // Create user object
        const user = {
            username: username,
            email: email,
            password: password
        };

        try {
            // Send POST request to the server
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            // Handle response
            if (response.ok) {
                const result = await response.json();
                displayMessage('Registration successful! Redirecting to login...', 'success');
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                const error = await response.json();
                displayMessage(error.message || 'Registration failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            displayMessage('An unexpected error occurred. Please try again later.', 'error');
        }
    });

    // Function to display messages
    function displayMessage(message, type) {
        const messageDiv = document.getElementById('message');
        messageDiv.textContent = message;
        messageDiv.className = type;
    }
});
