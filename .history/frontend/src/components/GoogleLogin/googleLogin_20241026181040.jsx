// googleLogin.jsx
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../";

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

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div>
                <h1>Login</h1>
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onError={() => console.log("Login Failed")}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
