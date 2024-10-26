// src/components/GoogleLoginComponent.jsx

import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginComponent = () => {
    const responseGoogle = (response) => {
        console.log(response);

        // You can also send the response token to your backend for verification
        const { tokenId } = response;

        // Example of sending tokenId to your backend
        fetch('http://localhost:5000/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken: tokenId }),
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
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} // Your client ID from .env
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    );
};

export default GoogleLoginComponent;
