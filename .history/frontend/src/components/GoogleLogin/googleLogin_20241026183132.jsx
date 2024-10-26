// googleLogin.jsx
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../api"; // Ensure this points to your API call for Google login

const Login = () => {
    const handleSuccess = async (credentialResponse) => {
        const { credential } = credentialResponse;

        try {
            const userData = await googleLogin(credential);
            console.log("User data:", userData);
            // Handle successful login (e.g., store user data, redirect)
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleError = () => {
        console.log("Login Failed");
    };

    return (
        <div>
            <h1>Login</h1>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
            />
        </div>
    );
};

export default Login;
