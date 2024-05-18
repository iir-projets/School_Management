import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../src/AuthContext';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { handleLogin } = useContext(AuthContext);

    const handleRegister = async (e) => {
        e.preventDefault();

        // Reset error and success messages
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:8099/user/register', {
                firstName,
                lastName,
                username,
                password,
            });

            // Handle successful registration
            console.log('Registered user:', response.data);
            setSuccess('Registration successful!');
            handleLogin(); // Update user's login state after successful registration
            // You can perform additional actions here, such as clearing the form fields or redirecting the user
        } catch (error) {
            // Handle registration error
            console.error('Registration error:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterPage;