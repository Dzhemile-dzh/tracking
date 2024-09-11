document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    try {  
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, rememberMe }),
            credentials: 'include' 
        });

        const result = await response.json();
        document.getElementById('message').innerText = result.message;

        if (response.ok) {
            // Redirect or handle successful login
            window.location.href = '/tasks.html'; 
        } else {
            // Handle login failure
            document.getElementById('message').style.color = 'red';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again.';
        document.getElementById('message').style.color = 'red';
    }
});