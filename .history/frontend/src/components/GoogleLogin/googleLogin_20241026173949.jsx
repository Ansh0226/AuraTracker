// src/components/GoogleLoginComponent.jsx

import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// GoogleLoginComponent function
const GoogleLoginComponent = () => {
    const responseGoogle = (response) => {
        console.log(response);

        // You can also send the response token to your backend for verification
        const { credential } = response;

        // Example of sending credential to your backend
        fetch('http://localhost:5000/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken: credential }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // Handle successful authentication
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleFailure = (error) => {
        console.error('Google Login Failed:', error);
    };

    return (
        <div>
            <h2>Login with Google</h2>
            <GoogleLogin
                onSuccess={responseGoogle}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

// Wrap your application with GoogleOAuthProvider in your main file (e.g., index.js or App.js)
const App = () => (
    <GoogleOAuthProvider clientId={609766100196 - o8c3cgk5pt0p2emi2ktmgc9u09qunu5k.apps.googleusercontent.com}>
        <GoogleLoginComponent />
    </GoogleOAuthProvider>
);

export default App;
