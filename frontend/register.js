/**
 * Handles user registration by submitting form data to the backend.
 */

import { BASE_URL } from './apiConfig.js'; // Import API base URL

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm'); // Select the form

    // Listen for form submission
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Send registration data to backend
            const response = await fetch(`${BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Registration failed. Please try again.');
            }

            alert('Registration successful! You can now log in.');
            window.location.href = 'Log.html'; // Redirect to login page
        } catch (error) {
            console.error('Error registering user:', error.message);
            alert(error.message || 'An error occurred during registration.');
        }
    });
});
