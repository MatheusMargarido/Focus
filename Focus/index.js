document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul.nav-list');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Adicionando evento de clique para fechar o menu ao clicar em um item de navegação
    const navLinks = document.querySelectorAll('nav ul.nav-list li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // Initialize Google Sign-In
    google.accounts.id.initialize({
        client_id: 'SEU_CLIENT_ID',
        callback: handleCredentialResponse
    });

    // Render the Google Sign-In button
    google.accounts.id.renderButton(
        document.getElementById('google-login'),
        { theme: 'outline', size: 'large' }
    );

    // Function to handle the response from Google Sign-In
    function handleCredentialResponse(response) {
        const token = response.credential;
        // Send the token to your backend for verification
        verifyToken(token);
    }

    // Example function to send the token to your backend
    function verifyToken(token) {
        fetch('/verify-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Successfully logged in
                alert('Login successful');
            } else {
                // Failed to log in
                alert('Login failed');
            }
        });
    }
});
